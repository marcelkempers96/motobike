#!/usr/bin/env python3
"""List the largest images in assets/ that the site uses (referenced from a page, script, stylesheet or data file).
python3 source/seo/images.py [N]  -> prints JSON list of {path, kb, w, h, refs}"""
import os, re, sys, json
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SKIP = {'source', 'node_modules', '.git', 'promo-clips', 'inbox', 'docs', 'moto-spec'}
text = []
for d, dirs, files in os.walk(ROOT):
    rel = os.path.relpath(d, ROOT).split(os.sep)[0]
    if rel in SKIP: dirs[:] = []; continue
    for f in files:
        if f.endswith(('.html', '.js', '.css', '.json', '.webmanifest')) and 'vendor' not in d:
            try: text.append(open(os.path.join(d, f), encoding='utf-8', errors='ignore').read())
            except Exception: pass
blob = '\n'.join(text)
names = {}
for m in re.finditer(r'([\w./-]+\.(?:jpe?g|png|webp|gif|avif))', blob, re.I):
    b = os.path.basename(m.group(1)); names[b] = names.get(b, 0) + 1
imgs = []
for d, dirs, files in os.walk(os.path.join(ROOT, 'assets')):
    if 'vendor' in d: continue
    for f in files:
        if re.search(r'\.(jpe?g|png|webp|gif)$', f, re.I) and f in names:
            p = os.path.join(d, f); sz = os.path.getsize(p)
            try: w, h = Image.open(p).size
            except Exception: w = h = 0
            imgs.append({'path': os.path.relpath(p, ROOT), 'kb': round(sz / 1024), 'w': w, 'h': h, 'refs': names[f]})
imgs.sort(key=lambda x: -x['kb'])
n = int(sys.argv[1]) if len(sys.argv) > 1 else 30
print(json.dumps(imgs[:n], indent=0))
print('used images:', len(imgs), 'over 400 KB:', sum(1 for x in imgs if x['kb'] > 400), 'total MB:', round(sum(x['kb'] for x in imgs) / 1024, 1), file=sys.stderr)
