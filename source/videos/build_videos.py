"""Build /videos/ (the video library) and add the course 'videos' blocks.

Run after editing video-map.json:  python3 source/videos/build_videos.py
"""
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(H, '..', '..'))
sys.path.insert(0, H)
import videolib as vl
from videolib import e
SITE = 'https://motobike-five.vercel.app'
VIDS, MP, BY = vl.load()
idx = open(os.path.join(ROOT, 'assets/content/repair-index.js'), encoding='utf-8').read()
D = json.loads(idx[idx.index('{'):idx.rstrip().rstrip(';').rindex('}') + 1])
TITLE = {('problems', p[0]): p[1] for p in D['p']}
TITLE.update({('repairs', r[0]): r[1] for r in D['r']}); TITLE.update({('parts', t[0]): t[1] for t in D['t']})

# ---------- course: one 'videos' block per chapter, at the end ----------
chap_videos = BY['course']
for m in ['m1', 'm2', 'm3', 'm4', 'm5']:
  p = os.path.join(ROOT, f'assets/content/modules/{m}.js'); s = open(p, encoding='utf-8').read(); i = s.index('export default ')
  o = json.loads(s[i + 15:].strip().rstrip(';'))
  for c in o['chapters']:
    c['blocks'] = [b for b in c['blocks'] if b.get('type') != 'videos']
    ids = chap_videos.get(c['id'], [])
    if ids:
      c['blocks'].append({'type': 'videos', 'title': 'Watch', 'items': [{'id': v, 'title': VIDS[v]['title'], 'channel': VIDS[v]['channel'], 'channel_url': VIDS[v]['channel_url'],
        'duration': VIDS[v]['duration'], 'role': vl.ROLE.get(MP[v]['role'], ''), 'note': MP[v].get('note') or VIDS[v]['learning']} for v in ids]})
  open(p, 'w', encoding='utf-8').write(s[:i + 15] + json.dumps(o, ensure_ascii=False, indent=2) + ';\n')

# ---------- /videos/ page ----------
def used_on(vid):
  m = MP.get(vid, {}); out = []
  for k, path in (('repairs', 'repair/repairs/'), ('problems', 'repair/problems/'), ('parts', 'repair/parts/')):
    for pid in m.get(k, []) or []:
      if vid in BY[k].get(pid, []) and (k, pid) in TITLE: out.append(f'<a href="../{path}{pid}/">{e(TITLE[(k, pid)])}</a>')
  for ch in m.get('course', []) or []:
    if vid in BY['course'].get(ch, []): out.append(f'<a href="../learn/#{ch}">Course: {e(ch)}</a>')
  return out
cats = {}
for v in sorted(VIDS.values(), key=lambda x: x['rank']):
  if v['id'] in MP: cats.setdefault(v['category'], []).append(v)
def vcard(v):
  u = used_on(v['id'])
  c = vl.card(v, MP.get(v['id']))
  extra = f'<p class="mz-yt-used"><b>On Motopedia:</b> {" · ".join(u)}</p>' if u else ''
  return c.replace('</div></div>', f'{extra}</div></div>', 1) if extra else c
body = ''.join(f'<section class="ute-chapter" id="{re.sub(r"[^a-z]+", "-", c.lower())}"><h2>{e(c)} <small>{len(vs)}</small></h2><div class="mz-yts">{"".join(vcard(v) for v in vs)}</div></section>' for c, vs in cats.items())
n = sum(len(v) for v in cats.values())
ld = {"@context": "https://schema.org", "@type": "ItemList", "name": "Motorcycle repair and how-it-works videos",
      "itemListElement": [{"@type": "ListItem", "position": k + 1, "item": vl.ld(v, MP.get(v['id']))} for k, v in enumerate([x for vs in cats.values() for x in vs])]}
page = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Motorcycle Repair & How-It-Works Videos | Motopedia</title>
  <link rel="canonical" href="{SITE}/videos/">
  <meta name="description" content="{n} of the most watched motorcycle videos, sorted by topic: maintenance, how engines work, diagnosis and restoration, each linked to a Motopedia guide.">
  <meta property="og:title" content="Motorcycle Repair & How-It-Works Videos | Motopedia"><meta property="og:url" content="{SITE}/videos/">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/assets/brand/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#141414"><meta name="apple-mobile-web-app-title" content="Motopedia">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/styles.css?v=20261106b">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
  <style>
.ute-hero {{ padding: 64px 40px 40px; border-bottom: 1px solid var(--line); }}
.ute-hero p {{ max-width: 760px; line-height: 1.6; }}
.ute-chapter {{ padding: 40px; border-bottom: 1px solid var(--line); }}
.ute-chapter h2 small {{ font-size: 15px; color: var(--mute); font-weight: 400; }}
.mz-yt-used {{ font-size: 13.5px; margin-top: 8px !important; }}
.mz-vjump {{ display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }}
.mz-vjump a {{ padding: 8px 10px; border: 1px solid var(--line); text-decoration: none; color: var(--ink); font: 700 13.5px/1 var(--sans); }}
@media (max-width: 720px) {{ .ute-hero {{ padding: 40px 16px 28px; }} .ute-chapter {{ padding: 32px 16px; }} }}
  </style>
</head>
<body>
<div class="ute-page">
  <header class="ute-top">
    <a class="ute-brand" href="../" aria-label="Motopedia home"><img class="ute-brand-logo" src="../assets/brand/motopedia-logo-tagline-600.webp" alt="Motopedia, the open motorcycle encyclopedia" width="600" height="178"></a>
    <nav data-mz-nav></nav>
  </header>
  <section class="ute-hero">
    <span class="ute-label">Library · Videos</span>
    <h1>Motorcycle repair and how-it-works videos</h1>
    <p>{n} of the most watched motorcycle videos on YouTube, sorted by topic. Each card says what the video teaches and links to the Motopedia guide to read next. Videos play only when you press play. Popular is not the same as correct: for values, use your bike's manual.</p>
    <nav class="mz-vjump" aria-label="Topics">{"".join(f'<a href="#{re.sub(r"[^a-z]+", "-", c.lower())}">{e(c)}</a>' for c in cats)}</nav>
  </section>
  {body}
  <section data-mz-signup data-title="Get new guides and videos by email"></section>
  <footer data-mz-footer></footer>
</div>
<script type="module" src="../assets/site.js"></script>
<script type="module" src="../assets/videos.js"></script>
</body>
</html>
'''
os.makedirs(os.path.join(ROOT, 'videos'), exist_ok=True)
open(os.path.join(ROOT, 'videos/index.html'), 'w', encoding='utf-8').write(page)
print('videos page', n, 'videos;', 'course chapters with videos', len(chap_videos))
