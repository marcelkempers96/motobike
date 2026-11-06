"""Parse the Global Motorcycle Bible (500 model profiles) into source/bikes/bikes.json.
Keeps only what the document states; specs stay empty unless a manufacturer fact is given."""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
t = open(os.path.join(HERE, 'Moto_Zero_Global_Motorcycle_Bible.md'), encoding='utf-8').read()
body = t[t.index('## 500 model profiles'):t.index('## All 134 parts and reverse model index')]
chunks = re.split(r'\n### (\d{3})\. ', body)[1:]
out = []
link = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
def field(c, name):
  m = re.search(r'\*\*' + re.escape(name) + r'[^*]*:\*\*\s*(.*)', c)
  return m.group(1).strip() if m else ''
for n in range(0, len(chunks), 2):
  num, c = chunks[n], chunks[n + 1]
  title = c.split('\n', 1)[0].strip()
  head = field(c, 'ID')
  mid = re.search(r'`([^`]+)`', head).group(1)
  cat = re.search(r'\*\*Category:\*\*\s*([^·]+)', head).group(1).strip()
  ident = re.search(r'\*\*Identity:\*\*\s*(.*)', head).group(1).strip()
  ids = lambda s, kind: [u.rstrip('/').split('/')[-1] for _, u in link.findall(s) if f'/repair/{kind}/' in u]
  cat_facts = field(c, 'Catalogue facts')
  countries = re.search(r'documented country evidence:\s*([A-Z, ]+)', cat_facts)
  aliases = re.search(r'Aliases:\s*([^.]*)\.?', cat_facts)
  facts = [{'scope': m.group(1).strip(), 'text': link.sub(r'\1', m.group(2)).strip(), 'sources': [u for _, u in link.findall(m.group(2))]}
           for m in re.finditer(r'\*\*Manufacturer facts\s*[—-]\s*([^:*]+):\*\*\s*(.*)', c)]
  make = title.split(' ')[0]
  for mk in ('Harley-Davidson', 'Royal Enfield', 'Moto Guzzi'):
    if title.startswith(mk): make = mk
  out.append({
    'n': int(num), 'id': mid.replace('mz-', ''), 'title': title, 'make': make, 'model': title[len(make):].strip(),
    'category': cat, 'identity': ident,
    'description': field(c, 'Description (editorial)'),
    'countries': [x.strip() for x in countries.group(1).split(',')] if countries else [],
    'aliases': [] if not aliases or aliases.group(1).strip().startswith('None') else [a.strip() for a in aliases.group(1).split(';') if a.strip()],
    'facts': facts,
    'parts': ids(field(c, 'Proposed part-guide links'), 'parts'),
    'repairs': ids(field(c, 'Maintenance/troubleshooting topics to review'), 'repairs'),
    'problems': ids(field(c, 'Symptom entry points'), 'problems'),
    'check_first': field(c, 'Before applying these links'),
    'sources': [{'label': l, 'url': u} for l, u in link.findall(field(c, 'Sources'))],
  })
json.dump(out, open(os.path.join(HERE, 'bikes.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), sum(1 for x in out if x['facts']), 'with facts')
