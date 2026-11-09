import json, re, html, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from arts7 import ARTICLES
import arts_stories  # appends the stories to the same ARTICLES list

ROOT = '/home/user/motobike'
BASE = 'https://www.motopedia.org'
DATE = '2026-11-02'      # default publication date; an article may set its own 'date'
CSSV = '20261107a'      # assets/articles.css
STYLESV = '20261102b'   # assets/styles.css (bumped by the coordinator; keep in sync)
BY = {a['slug']: a for a in ARTICLES}

FONTS = '''  <link rel="icon" href="{up}assets/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/assets/brand/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#141414"><meta name="apple-mobile-web-app-title" content="Motopedia">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{up}assets/styles.css?v={sv}">
  <link rel="stylesheet" href="{up}assets/articles.css?v={v}">'''

HEADER = '''  <header class="ute-top">
    <a class="ute-brand" href="{up}" aria-label="Motopedia home"><img class="ute-brand-logo" src="{up}assets/brand/motopedia-logo-tagline-600.webp" alt="Motopedia, the open motorcycle encyclopedia" width="600" height="178"></a>
    <nav data-mz-nav></nav>
  </header>'''

def text_of(h):
    t = re.sub(r'<[^>]+>', ' ', h)
    return html.unescape(re.sub(r'\s+', ' ', t)).strip()

def words(a):
    t = ' '.join([a['lead'], text_of(a['body'])] + [q + ' ' + x for q, x in a['faq']])
    return len(t.split())

def abs_img(src):
    # src relative to /articles/<slug>/
    return BASE + '/' + src.replace('../../', '')

def esc(s):
    return html.escape(s, quote=True)

def jsonld(obj):
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=1) + '\n</script>'

ORG = {"@type": "Organization", "name": "Transitions Lab", "url": "https://www.transitionslab.org"}

def human_date(d):
    y, m, dd = d.split('-')
    return f"{int(dd)} {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][int(m) - 1]} {y}"

def article_page(a):
    DATE = a.get('date', globals()['DATE'])
    url = f'{BASE}/articles/{a["slug"]}/'
    w = words(a)
    mins = max(1, round(w / 220))
    a['mins'] = mins; a['words'] = w
    img = abs_img(a['hero']['src'])
    art_ld = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": a['h1'], "description": a['desc'], "image": [img],
        "author": ORG, "publisher": {**ORG, "logo": {"@type": "ImageObject", "url": BASE + "/assets/brand-mark.svg"}},
        "datePublished": DATE, "dateModified": DATE,
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
        "inLanguage": "en-GB", "wordCount": w,
        "isPartOf": {"@type": "WebSite", "name": "Motopedia", "url": BASE + "/"},
    }
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": x}} for q, x in a['faq']]}
    crumb_ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Articles", "item": BASE + "/articles/"},
        {"@type": "ListItem", "position": 3, "name": a['h1'], "item": url}]}
    up = '../../'
    h = a['hero']
    cta = a['cta']
    cta_links = '\n      '.join(f'<a class="ute-linkbtn{" is-warm" if warm else ""}" href="{href}">{esc(t)}</a>' for href, t, warm in cta['links'])
    faq = '\n'.join(f'''    <div class="q">
      <h3>{esc(q)}</h3>
      <p>{esc(x)}</p>
    </div>''' for q, x in a['faq'])
    rel = '\n'.join(f'      <li><a href="../{s}/">{esc(BY[s]["h1"])}<span>{esc(BY[s]["summary"])}</span></a></li>' for s in a['related'])
    return f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{esc(a['title'])}</title>
  <meta name="description" content="{esc(a['desc'])}">
  <link rel="canonical" href="{url}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Motopedia">
  <meta property="og:title" content="{esc(a['title'])}">
  <meta property="og:description" content="{esc(a['desc'])}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{img}">
  <meta property="og:image:alt" content="{esc(h['alt'])}">
  <meta property="og:locale" content="en_GB">
  <meta property="article:published_time" content="{DATE}">
  <meta property="article:author" content="Transitions Lab">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(a['title'])}">
  <meta name="twitter:description" content="{esc(a['desc'])}">
  <meta name="twitter:image" content="{img}">
{FONTS.format(up=up, v=CSSV, sv=STYLESV)}
  {jsonld(art_ld)}
  {jsonld(faq_ld)}
  {jsonld(crumb_ld)}
</head>
<body>
<div class="ute-page">
{HEADER.format(up=up)}

  <main class="mz-art-wrap">
    <nav class="mz-crumbs" aria-label="Breadcrumb"><ol><li><a href="../../">Home</a></li><li><a href="../">Articles</a></li><li aria-current="page">{esc(a['h1'])}</li></ol></nav>
    <header class="mz-art-head">
      <span class="ute-label">{esc(a['label'])}</span>
      <h1>{esc(a['h1'])}</h1>
      <p class="mz-art-lead">{esc(a['lead'])}</p>
      <div class="mz-art-meta"><span>By <b>Transitions Lab</b></span><span>Published <time datetime="{DATE}">{human_date(DATE)}</time></span><span>{mins} min read</span></div>
    </header>
    <article class="mz-art">
      <figure class="is-hero">
        <img src="{h['src']}" alt="{esc(h['alt'])}" width="{h['w']}" height="{h['h']}" fetchpriority="high">
        <figcaption>{esc(h['cap'])}</figcaption>
      </figure>
{a['body']}
      <aside class="mz-art-cta" aria-labelledby="cta-h">
        <span class="ute-label">{esc(cta['label'])}</span>
        <h2 id="cta-h">{esc(cta['h'])}</h2>
        <p>{esc(cta['p'])}</p>
        <div class="mz-art-cta-links">
      {cta_links}
        </div>
      </aside>

      <section class="mz-art-faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Frequently asked questions</h2>
{faq}
      </section>

      <nav class="mz-art-related" aria-labelledby="rel-h">
        <h2 id="rel-h">Related articles</h2>
        <ul>
{rel}
        </ul>
      </nav>

      <p class="mz-art-licence">Written by Transitions Lab for the Motopedia open motorcycle course. Text and illustrations are licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license noopener" target="_blank">CC BY-SA 4.0</a>. Figures and values come from the course modules; see <a href="../../sources/">sources and credits</a>.</p>
    </article>
  </main>

  <footer data-mz-footer></footer>
</div>
<script type="module" src="../../assets/site.js"></script>
</body>
</html>
'''

GROUPS = [
    ('stories', 'Stories', 'Visits, collections and people, told through the engineering of their motorcycles.',
     ['invercargill-classic-motorcycle-mecca']),
    ('how-it-works', 'How it works', 'How engines, clutches, gearboxes, brakes, suspension, fuel systems, cooling, wiring and electric drives work, and the main types of motorcycle.',
     ['how-a-motorcycle-engine-works', 'two-stroke-vs-four-stroke', 'how-a-motorcycle-clutch-works', 'how-a-motorcycle-gearbox-works', 'how-motorcycle-brakes-work', 'how-motorcycle-suspension-works', 'carburettor-vs-fuel-injection', 'air-oil-and-liquid-cooling', 'motorcycle-wiring-basics', 'how-electric-motorcycles-work', 'types-of-motorcycles']),
    ('maintenance-and-repair', 'Maintenance and repair', 'Checks, diagnosis and routine jobs you can do yourself, with the values to test against. For fault finding by symptom or by part, use the <a href="../repair/">Repair section</a>.',
     ['motorcycle-will-not-start', 'motorcycle-battery-keeps-dying', 'how-to-change-motorcycle-oil', 'how-to-check-motorcycle-brake-pads', 'motorcycle-tyre-pressure-and-wear', 'spark-plug-reading', 'carburettor-cleaning-basics', 'motorcycle-chain-maintenance', 'electric-motorcycle-battery-care', 'boda-boda-maintenance-checklist']),
]

def card(a):
    return f'''    <li><a href="{a['slug']}/">
      <img src="{a['thumb'].replace('../../', '../')}" alt="{esc(a['hero']['alt'] if a['thumb'] == a['hero']['src'] else a['h1'])}" width="{a['hero']['w'] if a['thumb'] == a['hero']['src'] else 720}" height="{a['hero']['h'] if a['thumb'] == a['hero']['src'] else 405}" loading="lazy">
      <div class="body"><span class="ute-label">{esc(a['label'])}</span><h2>{esc(a['h1'])}</h2><p>{esc(a['summary'])}</p><span class="time">{a['mins']} min read</span></div>
    </a></li>'''

def listing_page():
    up = '../'
    url = BASE + '/articles/'
    title = 'Motorcycle articles: how it works, maintenance and repair | Motopedia'
    desc = 'Plain-English guides to how motorcycles work and how to maintain and repair them: engines, starting faults, batteries, oil, brakes, tyres and electric drives.'
    grouped = [s for _, _, _, sl in GROUPS for s in sl]
    assert sorted(grouped) == sorted(BY), 'every article must be in exactly one group'
    ordered = [BY[s] for s in grouped]
    sections = '\n'.join(f'''    <section class="mz-arts-group" aria-labelledby="g-{gid}">
      <h2 id="g-{gid}">{esc(gt)}</h2>
      <p>{gp}</p>
    </section>
    <ul class="mz-arts">
''' + '\n'.join(card(BY[s]) for s in sl) + '''
    </ul>''' for gid, gt, gp, sl in GROUPS)
    ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Motopedia articles", "description": desc, "url": url,
          "publisher": ORG, "license": "https://creativecommons.org/licenses/by-sa/4.0/",
          "mainEntity": {"@type": "ItemList", "itemListElement": [
              {"@type": "ListItem", "position": i + 1, "url": f'{BASE}/articles/{a["slug"]}/', "name": a['h1']} for i, a in enumerate(ordered)]}}
    img = BASE + '/assets/renders/bike_classic_4t_side.webp'
    return f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Motopedia">
  <meta property="og:title" content="Motorcycle articles from Motopedia">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{img}">
  <meta property="og:locale" content="en_GB">
  <meta name="twitter:card" content="summary_large_image">
{FONTS.format(up=up, v=CSSV, sv=STYLESV)}
  {jsonld(ld)}
  {jsonld({'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE + '/'}, {'@type': 'ListItem', 'position': 2, 'name': 'Articles', 'item': url}]})}
  <style>
    .mz-arts-group {{ max-width: 1160px; margin: 0 auto; padding: 30px 0 0; border-top: 2px solid var(--ink); }}
    .mz-arts-head + .mz-arts-group {{ margin-top: 18px; }}
    .mz-arts-group h2 {{ font-size: 28px; line-height: 1.25; margin: 0 0 8px; }}
    .mz-arts-group p {{ font-size: 17px; line-height: 1.55; max-width: 720px; margin: 0; color: var(--ink-soft); }}
    .mz-arts-group a {{ color: var(--ink); text-decoration-color: var(--warm); text-underline-offset: 3px; }}
    @media (max-width: 720px) {{ .mz-arts-group h2 {{ font-size: 24px; }} }}
  </style>
</head>
<body>
<div class="ute-page">
{HEADER.format(up=up)}

  <main class="mz-art-wrap">
    <header class="mz-arts-head">
      <span class="ute-label">Articles</span>
      <h1>Motorcycle articles</h1>
      <p>Short, accurate guides to how motorcycles work and how to look after and repair them, written from the Motopedia course. Each one links into the interactive tools, the Repair section and the full course chapters.</p>
    </header>
{sections}
  </main>

  <footer data-mz-footer></footer>
</div>
<script type="module" src="../assets/site.js"></script>
</body>
</html>
'''

for a in ARTICLES:
    d = f'{ROOT}/articles/{a["slug"]}'
    os.makedirs(d, exist_ok=True)
    open(f'{d}/index.html', 'w').write(article_page(a))
    print(f'{a["slug"]:40s} words={a["words"]:5d} title={len(a["title"])} desc={len(a["desc"])} mins={a["mins"]}')
open(f'{ROOT}/articles/index.html', 'w').write(listing_page())

pages = ['', 'overview/', 'cockpit/', 'learn/', 'quiz/', 'history/', 'types/', 'wiring/', 'models/', 'build/', 'kids/',
         'downloads/', 'sources/', 'updates/', 'about/', 'contact/', 'privacy/', 'cookies/', 'terms/', 'articles/'] + [f'articles/{a["slug"]}/' for a in ARTICLES]
# repair/ and parts/ URLs are written by their own builders; progress/ and account/ are private (noindex) and stay out
NOT_IN_SITEMAP = {f'{BASE}/{p}' for p in ('progress/', 'account/', 'repair/fix/')}
for p in pages:
    assert os.path.exists(f'{ROOT}/{p}index.html'), p
LASTMOD = {f'articles/{a["slug"]}/': a.get('date', DATE) for a in ARTICLES}
LASTMOD['articles/'] = max(LASTMOD.values())
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for p in pages:
    lm = f'\n    <lastmod>{LASTMOD.get(p, DATE)}</lastmod>' if p.startswith('articles/') else ''
    sm += f'  <url>\n    <loc>{BASE}/{p}</loc>{lm}\n  </url>\n'
# keep any URL other pages added to the sitemap (e.g. crash-course/) that this generator does not own
ours = {f'{BASE}/{p}' for p in pages}
try:
    old = open(f'{ROOT}/sitemap.xml').read()
except FileNotFoundError:
    old = ''
for blk in re.findall(r'[ \t]*<url>.*?</url>\n?', old, re.S):
    loc = re.search(r'<loc>(.*?)</loc>', blk).group(1)
    if loc not in ours and loc not in NOT_IN_SITEMAP:
        sm += blk if blk.endswith('\n') else blk + '\n'
sm += '</urlset>\n'
open(f'{ROOT}/sitemap.xml', 'w').write(sm)
# robots.txt is maintained outside this generator (it already points to the sitemap).
