#!/usr/bin/env python3
"""SEO audit for the Motopedia static site.

Run from anywhere:  python3 source/seo/audit.py [--json out.json]
Measures the 20 checks of the 2026-11-09 SEO brief (the parts that can be
measured from the files) and prints a summary. Read-only.
"""
import json, os, re, sys, html
from collections import Counter, defaultdict
from urllib.parse import urlparse, unquote
from bs4 import BeautifulSoup

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SITE = 'https://motobike-five.vercel.app'
DOWNLOADS = {'types/standalone.html'}   # offline download copy, served with X-Robots-Tag noindex
SKIP_DIRS = {'source', 'node_modules', '.git', '.vercel', 'promo-clips', 'inbox', 'docs', 'moto-spec'}
PRIVATE = {'account/', 'progress/'}        # may carry noindex
PHOTO_DIRS = ('assets/photos', 'assets/renders', 'assets/repair-photos', 'assets/parts', 'assets/models', 'assets/uploads', 'assets/build-a-bike', 'assets/illustrations')


def pages():
    out = []
    for d, dirs, files in os.walk(ROOT):
        rel = os.path.relpath(d, ROOT)
        top = rel.split(os.sep)[0]
        if top in SKIP_DIRS or top == 'assets':
            dirs[:] = []
            continue
        for f in files:
            if f.endswith('.html'):
                p = os.path.relpath(os.path.join(d, f), ROOT).replace(os.sep, '/')
                if p not in DOWNLOADS:
                    out.append(p)
    return sorted(out)


def url_of(p):
    u = p[:-len('index.html')] if p.endswith('index.html') else p
    return u


def resolve(page, href):
    """Return repo-relative target path for an internal href, or None if external."""
    if not href or href.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:', '{', '$')):
        return None
    u = urlparse(href)
    if u.scheme in ('http', 'https'):
        if u.netloc not in ('motobike-five.vercel.app', 'www.motopedia.org', 'motopedia.org'):
            return None
        path = u.path
    elif u.scheme:
        return None
    else:
        path = u.path
    if not path:
        return None
    path = unquote(path)
    if path.startswith('/'):
        tgt = path.lstrip('/')
    else:
        base = os.path.dirname(page)
        tgt = os.path.normpath(os.path.join(base, path)).replace(os.sep, '/')
        if tgt == '.':
            tgt = ''
    return tgt


def exists(tgt):
    full = os.path.join(ROOT, tgt)
    if tgt in ('', '.') or os.path.isdir(full):
        return os.path.exists(os.path.join(full, 'index.html'))
    if os.path.exists(full):
        return True
    # cleanUrls: /foo -> foo.html
    return os.path.exists(full + '.html') or os.path.exists(os.path.join(full, 'index.html'))


def page_key(tgt):
    """Normalise a link target to a page path (…/index.html) if it is a page."""
    full = os.path.join(ROOT, tgt)
    if tgt in ('', '.'):
        return 'index.html'
    if os.path.isdir(full) and os.path.exists(os.path.join(full, 'index.html')):
        return tgt.rstrip('/') + '/index.html'
    if tgt.endswith('.html'):
        return tgt
    return None


def ld_types(obj, acc):
    if isinstance(obj, list):
        for x in obj:
            ld_types(x, acc)
    elif isinstance(obj, dict):
        t = obj.get('@type')
        if isinstance(t, list):
            acc.update(t)
        elif t:
            acc.add(t)
        for k, v in obj.items():
            if k in ('@graph', 'mainEntity', 'potentialAction', 'hasPart', 'itemListElement') or isinstance(v, (dict, list)):
                ld_types(v, acc)


def audit():
    P = pages()
    sm_txt = open(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8').read()
    sm_urls = re.findall(r'<loc>(.*?)</loc>', sm_txt)
    sm_set = set(sm_urls)
    robots = open(os.path.join(ROOT, 'robots.txt')).read() if os.path.exists(os.path.join(ROOT, 'robots.txt')) else ''
    vercel = open(os.path.join(ROOT, 'vercel.json')).read()

    info = {}
    inbound = defaultdict(set)
    broken = []
    http_own = []
    slug_bad = set()
    titles = defaultdict(list); descs = defaultdict(list)
    for p in P:
        raw = open(os.path.join(ROOT, p), encoding='utf-8', errors='replace').read()
        s = BeautifulSoup(raw, 'html.parser')
        robots_m = s.find('meta', attrs={'name': 'robots'})
        noindex = bool(robots_m and 'noindex' in (robots_m.get('content') or '').lower())
        refresh = bool(s.find('meta', attrs={'http-equiv': re.compile('refresh', re.I)}))
        if not refresh and noindex and re.search(r'location\.replace\(', raw) and len(raw) < 20000:
            refresh = True   # JS redirect stub
        base_el = s.find('base', href=True)
        lp = (os.path.normpath(os.path.join(os.path.dirname(p), base_el['href'])).replace(os.sep, '/') + '/x.html').lstrip('./') if base_el else p
        u = url_of(p)
        indexable = not noindex and not refresh and u not in PRIVATE
        can = s.find('link', rel='canonical')
        t = s.title.get_text().strip() if s.title else ''
        dm = s.find('meta', attrs={'name': 'description'})
        d = (dm.get('content') or '').strip() if dm else ''
        heads = [int(h.name[1]) for h in s.find_all(re.compile(r'^h[1-6]$'))]
        h_issue = []
        if 3 in heads and (2 not in heads or heads.index(3) < heads.index(2)):
            h_issue.append('h3-before-h2')
        prev = 1
        for lv in heads:
            if lv > prev + 1:
                h_issue.append(f'skip h{prev}->h{lv}'); break
            prev = lv
        imgs_noalt, photos_emptyalt, imgs_nolazy, imgs_nodim = [], [], 0, 0
        first = True   # the first content image (likely the LCP image) may load eagerly
        for i, im in enumerate(s.find_all('img')):
            if 'ute-brand-logo' in (im.get('class') or []):
                continue
            eager_ok, first = first, False
            src = im.get('src') or ''
            if not im.has_attr('alt'):
                imgs_noalt.append(src)
            elif not im['alt'].strip() and any(x in src for x in PHOTO_DIRS) and not im.has_attr('aria-hidden') and re.search(r'\.(jpe?g|webp|png)', src):
                photos_emptyalt.append(src)
            if not eager_ok and im.get('loading') != 'lazy' and im.get('fetchpriority') != 'high':
                imgs_nolazy += 1
            if not (im.has_attr('width') and im.has_attr('height')):
                imgs_nodim += 1
        types = set(); ld_err = 0
        for sc in s.find_all('script', type='application/ld+json'):
            try:
                ld_types(json.loads(sc.string or ''), types)
            except Exception:
                ld_err += 1
        scripts_block = [sc.get('src') for sc in s.find_all('script', src=True)
                         if not sc.has_attr('defer') and not sc.has_attr('async') and (sc.get('type') or '') != 'module' and sc.find_parent('head')]
        ogimg = bool(s.find('meta', property='og:image'))
        tw = bool(s.find('meta', attrs={'name': 'twitter:card'}))
        # links
        for tag, attr in (('a', 'href'), ('img', 'src'), ('link', 'href'), ('script', 'src'), ('source', 'src'), ('video', 'poster'), ('source', 'srcset')):
            for el in s.find_all(tag):
                v = el.get(attr)
                if not v:
                    continue
                if attr == 'srcset':
                    v = v.split(',')[0].split()[0]
                if v.startswith('http://') and ('motobike-five' in v or 'motopedia' in v):
                    http_own.append((p, v))
                if tag == 'link' and el.get('rel') and el['rel'][0] in ('canonical', 'alternate', 'preconnect', 'dns-prefetch'):
                    continue
                if el.get('id') == 'mzb-download':
                    continue   # brand.js builds this download on click
                tgt = resolve(lp, v)
                if tgt is None:
                    continue
                if not exists(tgt):
                    broken.append((p, v))
                elif tag == 'a':
                    k = page_key(tgt)
                    if k and k != p:
                        inbound[k].add(p)
        for seg in u.strip('/').split('/'):
            if seg and (seg != seg.lower() or '_' in seg):
                slug_bad.add(u); break
        info[p] = dict(url=u, indexable=indexable, noindex=noindex, refresh=refresh,
                       canonical=can.get('href') if can else None, title=t, desc=d, h1=heads.count(1),
                       h_issue=h_issue, noalt=imgs_noalt, photo_emptyalt=photos_emptyalt, nolazy=imgs_nolazy, nodim=imgs_nodim,
                       ld=sorted(types), ld_err=ld_err, faq=bool(s.find(re.compile(r'^h[23]$'), string=re.compile(r'FAQ|[Ff]requently asked|[Cc]ommon questions'))), block=scripts_block, og=ogimg, tw=tw)
        if indexable:
            titles[t].append(p); descs[d].append(p)

    idx = [p for p in P if info[p]['indexable']]
    R = {}
    full = {p: SITE + '/' + info[p]['url'] for p in P}
    in_sm_not_idx = [u for u in sm_urls if not any(full[p] == u for p in idx)]
    idx_not_sm = [p for p in idx if full[p] not in sm_set]
    R[1] = dict(sitemap_urls=len(sm_urls), dup=len(sm_urls) - len(sm_set), not_indexable_or_missing=len(in_sm_not_idx),
                indexable_missing=len(idx_not_sm), ex_bad=in_sm_not_idx[:5], ex_missing=idx_not_sm[:8])
    R[2] = dict(allow_all='Allow: /' in robots and not re.search(r'Disallow:\s*/\S*', robots), sitemap_line=('Sitemap: ' + SITE + '/sitemap.xml') in robots)
    stray = [p for p in P if info[p]['noindex'] and not info[p]['refresh'] and info[p]['url'] not in PRIVATE]
    R[3] = dict(noindex_pages=sum(info[p]['noindex'] for p in P), stray=len(stray), ex=stray[:5])
    badcan = [p for p in idx if info[p]['canonical'] != full[p]]
    R[4] = dict(missing_or_wrong=len(badcan), ex=[(p, info[p]['canonical']) for p in badcan[:5]])
    tlen = [p for p in idx if not 30 <= len(info[p]['title']) <= 70]
    tdup = sum(len(v) for v in titles.values() if len(v) > 1)
    R[5] = dict(bad_length=len(tlen), duplicates=tdup, ex=[(p, len(info[p]['title'])) for p in tlen[:5]],
                ex_dup=[v[:3] for v in titles.values() if len(v) > 1][:3])
    dlen = [p for p in idx if not 70 <= len(info[p]['desc']) <= 165]
    ddup = sum(len(v) for v in descs.values() if len(v) > 1)
    R[6] = dict(bad_length=len(dlen), duplicates=ddup, ex=[(p, len(info[p]['desc'])) for p in dlen[:5]],
                ex_dup=[v[:3] for v in descs.values() if len(v) > 1][:3])
    h1bad = [p for p in P if not info[p]['refresh'] and info[p]['h1'] != 1]
    R[7] = dict(not_one_h1=len(h1bad), ex=[(p, info[p]['h1']) for p in h1bad[:8]])
    hbad = [p for p in P if info[p]['h_issue']]
    R[8] = dict(bad_order=len(hbad), by_dir=Counter(p.split('/')[0] for p in hbad).most_common(8), ex=[(p, info[p]['h_issue']) for p in hbad[:8]])
    R[9] = dict(img_no_alt=sum(len(info[p]['noalt']) for p in P), photo_empty_alt=sum(len(info[p]['photo_emptyalt']) for p in P),
                ex=[(p, info[p]['noalt'][:2] + info[p]['photo_emptyalt'][:2]) for p in P if info[p]['noalt'] or info[p]['photo_emptyalt']][:8])
    home = info['index.html']['ld']
    rep = [p for p in idx if p.startswith('repair/') and p.count('/') >= 3]
    R[10] = dict(json_errors=sum(info[p]['ld_err'] for p in P), home=home,
                 articles_without_Article=[p for p in idx if re.match(r'articles/[^/]+/index.html', p) and 'Article' not in info[p]['ld']],
                 repair_detail_without_HowTo_or_TechArticle=sum(1 for p in idx if not {'HowTo', 'TechArticle'} & set(info[p]['ld']) and re.match(r'repair/(repairs|problems)/[^/]+/index.html', p)),
                 no_breadcrumb=sum(1 for p in idx if p != 'index.html' and 'BreadcrumbList' not in info[p]['ld']),
                 no_breadcrumb_ex=[p for p in idx if p != 'index.html' and 'BreadcrumbList' not in info[p]['ld']][:12],
                 faq_without_FAQPage=[p for p in idx if info[p]['faq'] and 'FAQPage' not in info[p]['ld']][:10],
                 learn=info['learn/index.html']['ld'], videos=info['videos/index.html']['ld'])
    orphans = [p for p in idx if p != 'index.html' and not inbound.get(p)]
    R[11] = dict(orphans=len(orphans), ex=orphans[:12])
    R[12] = dict(broken=len(broken), unique=len(set(v for _, v in broken)), ex=sorted(Counter(v for _, v in broken).items(), key=lambda x: -x[1])[:12],
                 pages=Counter(p for p, _ in broken).most_common(6))
    R[13] = dict(img_no_lazy=sum(info[p]['nolazy'] for p in P), img_no_dims=sum(info[p]['nodim'] for p in P))
    R[14] = dict(render_blocking_scripts=sum(len(info[p]['block']) for p in P), ex=[(p, info[p]['block']) for p in P if info[p]['block']][:5])
    R[16] = dict(http_own=len(http_own), hsts='Strict-Transport-Security' in vercel, ex=http_own[:5])
    R[17] = dict(bad_slugs=len(slug_bad), ex=sorted(slug_bad)[:6])
    nog = [p for p in idx if not (info[p]['og'] and info[p]['tw'])]
    R[18] = dict(missing=len(nog), ex=nog[:8])
    R[19] = dict(meta='google-site-verification' in open(os.path.join(ROOT, 'index.html')).read())
    R[20] = dict(llms=os.path.exists(os.path.join(ROOT, 'llms.txt')), llms_full=os.path.exists(os.path.join(ROOT, 'llms-full.txt')))
    R['pages'] = dict(total=len(P), indexable=len(idx))
    return R, info


if __name__ == '__main__':
    R, info = audit()
    for k, v in R.items():
        print(k, json.dumps(v, ensure_ascii=False, default=str)[:900])
    if '--json' in sys.argv:
        json.dump({str(k): v for k, v in R.items()}, open(sys.argv[sys.argv.index('--json') + 1], 'w'), indent=1, default=str)
