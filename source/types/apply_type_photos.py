#!/usr/bin/env python3
"""Put reviewed Commons photos on the motorcycle types page.

Reads source/types/photos/manifest.csv (from download_type_photos.py) and a
selection in source/types/photos/selected.json: {"superbike": [3, 1, 5, ...], ...}
(1-based numbers from the contact sheet, best first). Copies the chosen files to
types/photos/<type>/ and writes them as the `photos` list of each type in
types/motorcycle-types.json, with author, licence and file page for the credit.
"""
import csv, json, os, re, shutil
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'source/types/photos')
rows = list(csv.DictReader(open(os.path.join(SRC, 'manifest.csv'), encoding='utf-8')))
sel = json.load(open(os.path.join(SRC, 'selected.json')))
data_p = os.path.join(ROOT, 'types/motorcycle-types.json')
data = json.load(open(data_p, encoding='utf-8'))
by = {}
for r in rows: by.setdefault(r['type'], []).append(r)
clean = lambda s: re.sub(r'\s+', ' ', s or '').strip()
for t in data['types']:
  picks = sel.get(t['id'])
  if not picks: continue
  dest = os.path.join(ROOT, 'types/photos', t['id'])
  if os.path.isdir(dest): shutil.rmtree(dest)
  os.makedirs(dest)
  out = []
  for n in picks:
    r = by[t['id']][n - 1]
    src = os.path.join(ROOT, r['local_file']) if not os.path.isabs(r['local_file']) else r['local_file']
    name = f"{t['id']}-{len(out) + 1}{os.path.splitext(src)[1]}"
    shutil.copy(src, os.path.join(dest, name))
    subj = clean(r['file_title'][5:].rsplit('.', 1)[0].replace('_', ' '))
    out.append({'file': f'photos/{t["id"]}/{name}', 'subject': subj, 'page': r['file_page_url'],
                'author': clean(r['author'])[:120] or 'unknown author', 'licence': r['licence'], 'licence_url': r['licence_url'] or r['file_page_url'],
                'verified': True})
  t['photos'] = out
json.dump(data, open(data_p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print({k: len(v) for k, v in sel.items()})
