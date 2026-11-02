#!/usr/bin/env python3
"""Build the Moto Zero spare parts section from motorcycle-spare-parts-research.xlsx.

Writes static pages under /parts/ (hub, part types, model hubs, model-part pages),
assets/content/spare-parts.js (index for search and the Repair cross-links) and
adds the indexed pages to sitemap.xml. Run from the repo root:

    python3 source/parts/build_parts.py

The workbook is the single source of truth: edit it, run this, commit.
Priority >= 12 pages are indexed; the rest are noindex until reviewed.
"""
import html, json, os, re, shutil
import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
XLSX = os.path.join(ROOT, 'source/parts/motorcycle-spare-parts-research.xlsx')
OUT = os.path.join(ROOT, 'parts')
SITE = 'https://motobike-five.vercel.app'
INDEX_FROM = 12          # priority score from which model-part pages are indexed
CSSV = '20261102b'

e = lambda s: html.escape(str(s if s is not None else ''), quote=True)
slug = lambda s: re.sub(r'[^a-z0-9]+', '-', str(s).lower()).strip('-')

# ---------------------------------------------------------------------------
# Links into the rest of the site, per part type: Repair jobs, 3D Overview part,
# course chapter and the best image we have (real photo first, then render).
# ---------------------------------------------------------------------------
P = {
  'chain-sprocket-kit': (['chain-sprocket-replace', 'chain-wear-check', 'chain-adjust', 'chain-clean-lube'], 'chain', 'm4-final-drive', 'assets/renders/photo/render-chain.jpg'),
  'drive-belt': ([], None, 'm4-final-drive', 'assets/photos/scooter-cvt-workshop.jpg'),
  'roller-weights': ([], None, 'm4-final-drive', 'assets/photos/scooter-cvt-workshop.jpg'),
  'cvt-clutch-shoes': ([], None, 'm4-final-drive', 'assets/photos/scooter-cvt-workshop.jpg'),
  'gear-oil': ([], None, 'm4-final-drive', 'assets/illustrations/transmission/F16.png'),
  'clutch-plates': (['clutch-plates', 'clutch-cable-adjust'], 'clutch', 'm4-clutch', 'assets/renders/clutch_exploded.webp'),
  'brake-pads': (['brake-pads', 'brake-disc-check', 'brake-fluid-check'], 'brake', 'm4-brakes', 'assets/renders/photo/render-brake.jpg'),
  'brake-shoes': (['drum-brake-shoes', 'brake-free-play'], 'rear_brake', 'm4-brakes', 'assets/illustrations/chassis/F19.png'),
  'brake-disc': (['brake-disc-check', 'brake-pads'], 'brake', 'm4-brakes', 'assets/renders/brake.webp'),
  'spark-plug': (['spark-plug-service', 'ignition-test', 'smoke-diagnosis'], 'spark_plug', 'm3-ignition', 'assets/renders/photo/render-plug.jpg'),
  'air-filter': (['air-filter-service'], 'air_filter', 'm3-mixture', 'assets/renders/air_filter.webp'),
  'oil-filter': (['engine-oil-change'], 'engine', 'm2-lubrication-cooling', 'assets/illustrations/powertrain/F11.png'),
  'engine-oil': (['engine-oil-change', 'engine-oil-level'], 'engine', 'm2-lubrication-cooling', 'assets/photos/honda-air-cooled.jpg'),
  'battery': (['battery-test-charge', 'parasitic-drain-test', 'charging-system-test'], 'battery', 'm3-battery-charging', 'assets/renders/battery_12v.webp'),
  'tyres': (['tyre-check', 'tyre-replace'], 'front_wheel', 'm4-wheels-tyres', 'assets/renders/rear_wheel_spoked.webp'),
  'clutch-cable': (['clutch-cable-adjust'], 'clutch', 'm4-clutch', 'assets/illustrations/controls/F05.png'),
  'throttle-cable': (['throttle-cable-free-play'], 'handlebar', 'm3-mixture', 'assets/illustrations/controls/F05.png'),
  'levers': (['brake-free-play', 'clutch-cable-adjust'], 'handlebar', 'm1-anatomy', 'assets/renders/handlebar.webp'),
  'mirrors': ([], 'handlebar', 'm1-anatomy', 'assets/renders/handlebar.webp'),
  'headlight': (['bulb-replace', 'fuse-relay-check'], 'headlight', 'm3-lighting-wiring', 'assets/renders/headlight_round.webp'),
  'fork-seals': (['fork-oil-seals', 'suspension-check'], 'forks', 'm4-suspension', 'assets/renders/forks.webp'),
  'rear-shock': (['rear-shock-replace', 'suspension-check'], 'rear_shock', 'm4-suspension', 'assets/renders/rear_shock_twin.webp'),
  'wheel-bearings': (['wheel-bearing-check'], 'front_wheel', 'm4-wheels-tyres', 'assets/illustrations/wheels/W02.png'),
  'regulator-rectifier': (['charging-system-test', 'battery-test-charge'], 'charging', 'm3-battery-charging', 'assets/illustrations/wiring/F21.png'),
  'final-drive-belt': ([], None, 'm4-final-drive', 'assets/illustrations/transmission/TR02.png'),
  'final-drive-oil': ([], None, 'm4-final-drive', 'assets/illustrations/transmission/TR02.png'),
  'ev-controller': (['ev-fault-codes', 'ev-throttle-interlocks'], 'controller', 'm5-controllers', 'assets/renders/controller.webp'),
  'ev-charger': (['ev-charge-fault'], 'charge_port', 'm5-charging', 'assets/renders/charge_port.webp'),
}
REAL = {'assets/photos/scooter-cvt-workshop.jpg', 'assets/photos/honda-air-cooled.jpg'}
ELEC = {'controller', 'charge_port', 'motor'}

# Shops by market (from the Shops sheet). Marketplaces with per-page search links
# (Google Shopping, eBay, AliExpress, Amazon, local) come from each row instead.
MARKET_SHOPS = {
  'IN': ['Boodmo', 'Hero Genuine Parts (hgpmart)', 'Bajaj Genuine Parts', 'TVS Genuine Parts'],
  'ID': ['Tokopedia / Shopee / Lazada', 'Wemoto'],
  'SEA': ['Tokopedia / Shopee / Lazada', 'Wemoto'],
  'KE': ['Jumia Kenya', 'Muthuri Motoparts', 'Car & General (TVS Kenya)', 'Bajaj Genuine Parts'],
  'Africa': ['Jumia Kenya', 'Bajaj Genuine Parts', 'TVS Genuine Parts'],
  'US': ['Partzilla', 'RevZilla', 'Twisted Throttle'],
  'EU': ['FC-Moto', 'Louis', 'CMSNL', 'Wemoto'],
  'UK': ['SportsBikeShop', 'Wemoto', 'CMSNL'],
}
BRAND_OEM = {'Hero': 'Hero Genuine Parts (hgpmart)', 'Bajaj': 'Bajaj Genuine Parts', 'TVS': 'TVS Genuine Parts'}
CONSUMER_URL = {  # consumer pages, not affiliate sign-up pages
  'Bajaj Genuine Parts': 'https://www.bajajauto.com/spares/distributor-locator',
  'Car & General (TVS Kenya)': 'https://cargen.com/',
}

# ---------------------------------------------------------------------------
wb = openpyxl.load_workbook(XLSX, data_only=True)
def rows(name):
  ws = wb[name]; head = [c.value for c in ws[1]]; out = []
  for r in ws.iter_rows(min_row=2):
    if r[0].value is None: continue
    rec = {}
    for h, c in zip(head, r):
      rec[h] = c.value
      if c.hyperlink: rec[h + ' link'] = c.hyperlink.target
    out.append(rec)
  return out
MODELS = {m['Model ID']: m for m in rows('Models')}
PARTS = {p['Part ID']: p for p in rows('Parts')}
PAGES = rows('Model x Part')
SHOPS = {s['Shop']: s for s in rows('Shops')}

import subprocess
PROCS = json.loads(subprocess.check_output(['node', '-e', "import('./assets/content/repair/procedures.js').then(m=>console.log(JSON.stringify(m.PROCEDURES.map(p=>({id:p.id,title:p.title,level:p.level,time:p.time})))))"], cwd=ROOT))
PROC = {p['id']: p for p in PROCS}
LEVEL = {'basic': 'Basic', 'intermediate': 'Intermediate', 'advanced': 'Workshop'}
for pid, (procs, *_rest) in P.items():
  for x in procs: assert x in PROC, (pid, x)
  assert pid in PARTS, pid
for pid, v in P.items(): assert os.path.exists(os.path.join(ROOT, v[3])), v[3]

brand_slug = lambda m: slug(m['Brand'])
def url_model(m): return f"/parts/{brand_slug(m)}/{m['Model ID']}/"
def url_mp(m, pid): return f"/parts/{brand_slug(m)}/{m['Model ID']}/{pid}/"
def url_part(pid): return f"/parts/part/{pid}/"
def pname(p): return p['Part']
def lc_part(p): n = p['Part']; return n[0].lower() + n[1:] if not n.startswith(('CVT', 'Variator')) and not n[:2].isupper() else n
def verify(m): return 'verify' in str(m.get('Model', '')).lower() or m['Model ID'] in ('roam-air', 'spiro-ekon')

def page(path, title, desc, body, *, crumbs, noindex=False, extra_ld=None):
  depth = path.strip('/').count('/') + 1
  rel = '../' * depth
  ld = [{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(crumbs)]}]
  if extra_ld: ld.append(extra_ld)
  crumb_html = ' / '.join(f'<a href="{rel}{u.lstrip("/")}">{e(n)}</a>' if i < len(crumbs) - 1 else e(n) for i, (n, u) in enumerate(crumbs))
  doc = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc)}">
  <link rel="canonical" href="{SITE}{path}">
  {'<meta name="robots" content="noindex, follow">' if noindex else ''}
  <meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="{SITE}{path}">
  <link rel="icon" href="{rel}assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{rel}assets/styles.css?v={CSSV}">
  <link rel="stylesheet" href="{rel}assets/parts.css?v=1">
  {''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)}
</head>
<body>
<div class="ute-page sp">
  <header class="ute-top">
    <a class="ute-brand" href="{rel}" aria-label="Moto Zero home"><img class="ute-brand-mark" src="{rel}assets/brand-mark.svg" alt=""><span class="ute-brand-word">moto zero</span><span class="ute-brand-sub">Transitions Lab</span></a>
    <nav data-mz-nav></nav>
  </header>
  <main class="sp-main">
    <p class="sp-crumb">{crumb_html}</p>
{body.replace('{R}', rel)}
  </main>
  <footer data-mz-footer></footer>
</div>
<script type="module" src="{rel}assets/site.js"></script>
<script type="module" src="{rel}assets/parts.js?v=1"></script>
</body>
</html>
'''
  d = os.path.join(ROOT, path.strip('/'))
  os.makedirs(d, exist_ok=True)
  open(os.path.join(d, 'index.html'), 'w').write(doc)

def img(pid, alt, cls='sp-img'):
  src = P[pid][3]
  tag = '<span class="sp-imgtag">Photo</span>' if src in REAL else ('<span class="sp-imgtag">Plate</span>' if '/illustrations/' in src else '<span class="sp-imgtag">3D render</span>')
  return f'<figure class="{cls}"><img src="{{R}}{src}" alt="{e(alt)}" loading="lazy">{tag}</figure>'

def facts(p):
  dif = p['DIY difficulty (1-5)']
  return f'''<div class="sp-facts">
      <div><span>Replace</span><b>{e(p['Typical interval (indicative)'])}</b></div>
      <div><span>Typical price</span><b>US$ {e(p['Price range USD (indicative)']).replace('-', ' to ')}</b></div>
      <div><span>Difficulty</span><b>{dif} of 5</b><i class="sp-dots">{''.join('<i class="on"></i>' if k < dif else '<i></i>' for k in range(5))}</i></div>
      <div><span>Safety-critical</span><b class="{'sp-yes' if p['Safety-critical'] == 'Yes' else ''}">{e(p['Safety-critical'])}</b></div>
    </div>'''

def repair_cards(pid, model_label=None):
  procs, ov, learn, _ = P[pid]
  cards = ''.join(f'<a class="sp-job" href="{{R}}repair/fix/#{x}"><b>{e(PROC[x]["title"])}</b><span>{LEVEL.get(PROC[x]["level"], "")}{" · " + e(PROC[x]["time"]) if PROC[x].get("time") else ""}</span></a>' for x in procs)
  if not cards:
    cards = f'<p class="sp-soon">A step-by-step guide for this job is being written. Until then, <a href="{{R}}learn/#{learn}">read how it works in the course</a> and check the service manual for your model.</p>'
  links = []
  if ov: links.append(f'<a class="sp-btn is-3d" href="{{R}}overview/?{"mode=elec&" if ov in ELEC else ""}part={ov}">See it working in 3D →</a>')
  links.append(f'<a class="sp-btn" href="{{R}}learn/#{learn}">How it works</a>')
  return f'<div class="sp-jobs">{cards}</div><div class="sp-links">{"".join(links)}</div>'

def shop_rows(row, m):
  out = []
  for col, label in (('Google Shopping', 'Google Shopping'), ('eBay', 'eBay'), ('AliExpress', 'AliExpress'), ('Amazon (regional)', 'Amazon'), ('Local marketplace', 'Local marketplace')):
    u = row.get(col + ' link')
    if u:
      host = re.sub(r'^https?://(www\.)?', '', u).split('/')[0]
      if col == 'Local marketplace': label = host.split('.')[0].capitalize()
      out.append((label, u, 'Search results for this part', host))
  names = []
  if m['Brand'] in BRAND_OEM: names.append(BRAND_OEM[m['Brand']])
  for code in re.split(r'[/ ,]+', str(m['Primary markets'])):
    names += MARKET_SHOPS.get(code, [])
  seen = set()
  for n in names:
    if n in seen or n not in SHOPS: continue
    seen.add(n); s = SHOPS[n]
    u = CONSUMER_URL.get(n, s['URL'])
    out.append((n, u, s['Type'] + ': ' + str(s['Strengths for this project']).split(';')[0], re.sub(r'^https?://(www\.)?', '', u).split('/')[0]))
  return out[:9]

def buy_html(row, m, p):
  rows_ = shop_rows(row, m)
  li = ''.join(f'<li><a href="{e(u)}" target="_blank" rel="nofollow noopener" data-shop="{e(n)}"><b>{e(n)}</b><span>{e(d)}</span><em>{e(h)} ↗</em></a></li>' for n, u, d, h in rows_)
  return f'''<ul class="sp-shops">{li}</ul>
    <p class="sp-note">Check the part number for your model year before you buy. Genuine (OEM) parts first; good aftermarket parts are fine for wear items. Links open shop searches; Moto Zero earns nothing from them today and will say so here if that changes.</p>'''

def faq(m, p, row):
  name = f"{m['Brand']} {m['Model']}"
  part = lc_part(p)
  qs = [
    (f"How often should I replace the {part} on a {name}?", f"As a guide, {p['Typical interval (indicative)']}. The owner's manual for your model wins, and riding on dusty roads, with a passenger or with heavy loads shortens it."),
    (f"How much does a {name} {part} cost?", f"Typically US$ {str(p['Price range USD (indicative)']).replace('-', ' to ')}, depending on genuine or aftermarket and the shop. Prices are indicative."),
    (f"Can I replace the {part} myself?", f"The job is rated {p['DIY difficulty (1-5)']} of 5 for difficulty." + (" It is safety-critical: if you are not sure, have a mechanic check your work before you ride." if p['Safety-critical'] == 'Yes' else " Follow the step-by-step guide and the values for your model.")),
  ]
  ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qs]}
  h = '<div class="sp-faq">' + ''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in qs) + '</div>'
  return h, ld

# ---------------------------------------------------------------------------
if os.path.isdir(OUT): shutil.rmtree(OUT)
by_model = {}
for r in PAGES: by_model.setdefault(r['Model ID'], []).append(r)
indexed = []

# model-part pages
for r in PAGES:
  m = MODELS[r['Model ID']]; p = PARTS[r['Part ID']]; pid = r['Part ID']
  name = f"{m['Brand']} {m['Model']}"
  path = url_mp(m, pid)
  score = int(r['Priority score'] or 0)
  related = sorted([x for x in by_model[m['Model ID']] if x['Part ID'] != pid], key=lambda x: -int(x['Priority score'] or 0))[:6]
  fq, fq_ld = faq(m, p, r)
  body = f'''
    <section class="sp-head">
      <div>
        <span class="ute-label">{e(p['Category'])} · {e(name)}</span>
        <h1>{e(name)} {e(lc_part(p))}</h1>
        <p class="sp-lead">{e(p['Part'])} for the {e(name)}: when to replace it, what it costs, where to buy it and how to fit it.</p>
        {facts(p)}
      </div>
      {img(pid, f"{p['Part']} for the {name}")}
    </section>
    {'<p class="sp-warn"><b>Check the specification.</b> Brake and drive details for this model vary by market; confirm yours before you buy.</p>' if verify(m) else ''}
    <section class="sp-sec sp-cols">
      <div>
        <h2>Where to buy</h2>
        {buy_html(r, m, p)}
      </div>
      <div>
        <h2>Fit it yourself</h2>
        {repair_cards(pid)}
        <h2 class="sp-h2b">Fitment</h2>
        <table class="sp-spec"><tr><td>Model</td><td>{e(name)}</td></tr><tr><td>Type</td><td>{e(m['Segment'])}</td></tr><tr><td>Engine</td><td>{e(m['Engine (cc)'])}{'' if str(m['Engine (cc)']) == 'EV' else ' cc'}</td></tr><tr><td>Final drive</td><td>{e(str(m['Drivetrain']).upper() if m['Drivetrain'] in ('cvt', 'ev') else str(m['Drivetrain']).capitalize())}</td></tr><tr><td>Brakes</td><td>{'Disc' if m['Disc brake'] == 'Yes' else ''}{' and ' if m['Disc brake'] == 'Yes' and m['Drum brake'] == 'Yes' else ''}{'Drum' if m['Drum brake'] == 'Yes' else ''}</td></tr><tr><td>Main markets</td><td>{e(m['Primary markets'])}</td></tr></table>
      </div>
    </section>
    <section class="sp-sec">
      <h2>Questions</h2>
      {fq}
    </section>
    <section class="sp-sec">
      <h2>More parts for the {e(name)}</h2>
      <div class="sp-grid">{''.join(f'<a href="{{R}}{url_mp(m, x["Part ID"]).lstrip("/")}">{img(x["Part ID"], "", "sp-thumb")}<b>{e(PARTS[x["Part ID"]]["Part"])}</b></a>' for x in related)}</div>
      <p><a class="sp-btn" href="{{R}}{url_model(m).lstrip('/')}">All parts for the {e(name)} →</a> <a class="sp-btn" href="{{R}}{url_part(pid).lstrip('/')}">{e(p['Part'])} for other bikes →</a></p>
    </section>'''
  title = f"{name} {lc_part(p)}: price, interval, where to buy"
  if len(title) > 70: title = f"{name} {lc_part(p)} | Moto Zero"
  desc = f"{p['Part']} for the {name}: replace {p['Typical interval (indicative)']}, typical price US$ {str(p['Price range USD (indicative)']).replace('-', ' to ')}, shops and how to fit it yourself."[:300]
  page(path, title, desc, body, crumbs=[('Spare parts', '/parts/'), (m['Brand'], url_model(m)), (m['Model'], url_model(m)), (p['Part'], path)],
       noindex=score < INDEX_FROM, extra_ld=fq_ld)
  if score >= INDEX_FROM: indexed.append(path)

# model hubs
for mid, m in MODELS.items():
  name = f"{m['Brand']} {m['Model']}"
  rs = by_model.get(mid, [])
  cats = {}
  for r in rs: cats.setdefault(PARTS[r['Part ID']]['Category'], []).append(r)
  sched = ''.join(f'<tr><td><a href="{{R}}{url_mp(m, r["Part ID"]).lstrip("/")}">{e(PARTS[r["Part ID"]]["Part"])}</a></td><td>{e(PARTS[r["Part ID"]]["Typical interval (indicative)"])}</td><td>{"".join(f"""<a href="{{R}}repair/fix/#{x}">{e(PROC[x]["title"])}</a>""" for x in P[r["Part ID"]][0][:1]) or "–"}</td></tr>' for r in sorted(rs, key=lambda x: -int(x['Priority score'] or 0)))
  body = f'''
    <section class="sp-head is-model">
      <div>
        <span class="ute-label">{e(m['Segment'])} · {e(m['Primary markets'])}</span>
        <h1>{e(name)} spare parts</h1>
        <p class="sp-lead">{len(rs)} parts for the {e(name)}: what wears, when to replace it, where to buy it and how to fit it.</p>
        <p class="sp-chips"><span>{e(m['Engine (cc)'])}{'' if str(m['Engine (cc)']) == 'EV' else ' cc'}</span><span>{e(str(m['Drivetrain']).upper() if m['Drivetrain'] in ('cvt', 'ev') else str(m['Drivetrain']).capitalize())} drive</span><span>{'Disc' if m['Disc brake'] == 'Yes' else ''}{' + ' if m['Disc brake'] == 'Yes' and m['Drum brake'] == 'Yes' else ''}{'Drum' if m['Drum brake'] == 'Yes' else ''} brakes</span><span>{e(str(m['Fuel']).capitalize())}</span></p>
      </div>
    </section>
    {'<p class="sp-warn"><b>Check the specification.</b> Details for this model vary by market; confirm yours before you buy.</p>' if verify(m) else ''}
    <section class="sp-sec">{''.join(f'<h2 class="sp-cat">{e(c)}</h2><div class="sp-grid">' + ''.join(f'<a href="{{R}}{url_mp(m, r["Part ID"]).lstrip("/")}">{img(r["Part ID"], "", "sp-thumb")}<b>{e(PARTS[r["Part ID"]]["Part"])}</b><span>{e(PARTS[r["Part ID"]]["Typical interval (indicative)"])}</span></a>' for r in sorted(lst, key=lambda x: -int(x['Priority score'] or 0))) + '</div>' for c, lst in cats.items())}</section>
    <section class="sp-sec">
      <h2>Service schedule for the {e(name)}</h2>
      <div class="sp-tablewrap"><table class="sp-sched"><thead><tr><th>Part</th><th>Replace</th><th>Guide</th></tr></thead><tbody>{sched}</tbody></table></div>
      <p class="sp-note">Indicative intervals. The owner's manual for your model wins.</p>
    </section>'''
  path = url_model(m)
  page(path, f"{name} spare parts and service schedule | Moto Zero", f"All wear parts for the {name}: replacement intervals, typical prices, where to buy and step-by-step repair guides.", body,
       crumbs=[('Spare parts', '/parts/'), (m['Brand'], path), (m['Model'], path)])
  indexed.append(path)

# part type pages
for pid, p in PARTS.items():
  rs = [r for r in PAGES if r['Part ID'] == pid]
  brands = {}
  for r in rs: brands.setdefault(MODELS[r['Model ID']]['Brand'], []).append(MODELS[r['Model ID']])
  syn = str(p.get('Synonyms (keyword variants)') or '')
  body = f'''
    <section class="sp-head">
      <div>
        <span class="ute-label">{e(p['Category'])}</span>
        <h1>{e(p['Part'])}</h1>
        <p class="sp-lead">Fits: {e(p['Applies when']).lower()}.{(' Also called ' + e(syn.replace(';', ',')) + '.') if syn and syn != 'None' else ''}</p>
        {facts(p)}
      </div>
      {img(pid, p['Part'])}
    </section>
    <section class="sp-sec sp-cols">
      <div>
        <h2>Pick your bike</h2>
        {''.join(f'<h3 class="sp-brand">{e(b)}</h3><ul class="sp-models">' + ''.join(f'<li><a href="{{R}}{url_mp(mm, pid).lstrip("/")}">{e(mm["Model"])}</a></li>' for mm in ms) + '</ul>' for b, ms in sorted(brands.items()))}
      </div>
      <div>
        <h2>Fit it yourself</h2>
        {repair_cards(pid)}
      </div>
    </section>'''
  path = url_part(pid)
  page(path, f"{p['Part']}: when to replace, price and how to fit | Moto Zero", f"{p['Part']} for {len(rs)} popular motorcycles and scooters: replacement interval, typical price, where to buy and how to fit it yourself.", body,
       crumbs=[('Spare parts', '/parts/'), (p['Part'], path)])
  indexed.append(path)

# hub
cats = {}
for pid, p in PARTS.items(): cats.setdefault(p['Category'], []).append(pid)
brands = {}
for m in MODELS.values(): brands.setdefault(m['Brand'], []).append(m)
body = f'''
    <section class="sp-head is-hub">
      <div>
        <span class="ute-label">Repair · Spare parts</span>
        <h1>Spare parts</h1>
        <p class="sp-lead">The parts that wear out on {len(MODELS)} of the world's best-selling motorcycles and scooters: when to replace them, what they cost, where to buy them and how to fit them.</p>
        <div class="sp-search"><label class="sp-sr" for="sp-q">Search parts</label><input id="sp-q" type="search" placeholder="Your bike and part, for example: Boxer brake shoes" autocomplete="off"><ul class="sp-results" hidden></ul></div>
      </div>
    </section>
    <section class="sp-sec">
      <h2>By part</h2>
      {''.join(f'<h3 class="sp-cat">{e(c)}</h3><div class="sp-grid">' + ''.join(f'<a href="{{R}}{url_part(pid).lstrip("/")}">{img(pid, "", "sp-thumb")}<b>{e(PARTS[pid]["Part"])}</b><span>{e(PARTS[pid]["Typical interval (indicative)"])}</span></a>' for pid in lst) + '</div>' for c, lst in cats.items())}
    </section>
    <section class="sp-sec">
      <h2>By bike</h2>
      <div class="sp-brands">{''.join(f'<div><h3>{e(b)}</h3><ul>' + ''.join(f'<li><a href="{{R}}{url_model(m).lstrip("/")}">{e(m["Model"])}</a></li>' for m in ms) + '</ul></div>' for b, ms in sorted(brands.items()))}</div>
    </section>
    <section class="sp-sec">
      <p class="sp-note">Intervals and prices are indicative, compiled from service schedules and shop listings. Shop links open searches; check the part number for your model year before you buy. Coming later: a full shop with parts chosen and checked by Transitions Lab.</p>
    </section>'''
page('/parts/', 'Motorcycle spare parts: intervals, prices, where to buy | Moto Zero', f'Wear parts for {len(MODELS)} best-selling motorcycles and scooters: replacement intervals, typical prices, where to buy and step-by-step repair guides.', body,
     crumbs=[('Spare parts', '/parts/')])
indexed.insert(0, '/parts/')

# index for search and for Repair cross-links
idx = {
  'parts': [{'id': pid, 'name': p['Part'], 'cat': p['Category'], 'img': P[pid][3], 'procs': P[pid][0], 'url': url_part(pid), 'syn': str(p.get('Synonyms (keyword variants)') or '')} for pid, p in PARTS.items()],
  'models': [{'id': mid, 'brand': m['Brand'], 'model': m['Model'], 'url': url_model(m)} for mid, m in MODELS.items()],
  'pages': [[r['Model ID'], r['Part ID'], url_mp(MODELS[r['Model ID']], r['Part ID'])] for r in PAGES],
}
open(os.path.join(ROOT, 'assets/content/spare-parts.js'), 'w').write('/* Generated by source/parts/build_parts.py from the spare parts workbook. Do not edit by hand. */\nexport default ' + json.dumps(idx, ensure_ascii=False) + ';\n')

# sitemap
sm = os.path.join(ROOT, 'sitemap.xml'); s = open(sm).read()
s = re.sub(r'\s*<url><loc>https://motobike-five\.vercel\.app/parts/[^<]*</loc>[^\n]*</url>', '', s)
add = ''.join(f'\n  <url><loc>{SITE}{u}</loc><lastmod>2026-11-02</lastmod></url>' for u in indexed)
s = s.replace('</urlset>', add.lstrip('\n') + '\n</urlset>') if '</urlset>' in s else s
open(sm, 'w').write(s)
print(f'{len(PAGES)} model-part pages, {len(MODELS)} model hubs, {len(PARTS)} part pages; {len(indexed)} indexed')
