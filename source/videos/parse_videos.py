"""Parse the YouTube research document into videos.json (one record per video)."""
import re, json, os
H = os.path.dirname(os.path.abspath(__file__))
t = open(os.path.join(H, 'Moto_Zero_Top_100_YouTube_Research.md'), encoding='utf-8').read()
body = t[t.index('## Detailed records'):]
rec = re.split(r'\n### (\d{3})\. ', body)[1:]
first12 = re.findall(r'watch\?v=([\w-]{11})\)\s*\|\s*([^|]+)\|', t[t.index('## Recommended first 12'):t.index('## Ranked master list')])
best = {v: u.strip() for v, u in first12}
out = []
def f(c, name):
  m = re.search(r'\*\*' + re.escape(name) + r':\*\*\s*(.*?)(?=\s*(?:·\s*\*\*|\n|$))', c)
  return m.group(1).strip() if m else ''
for i in range(0, len(rec), 2):
  n, c = int(rec[i]), rec[i + 1]
  title = c.split('\n', 1)[0].strip()
  vid = re.search(r'watch\?v=([\w-]{11})', c).group(1)
  ch = re.search(r'\]\((?:https?://www\.youtube\.com/watch\?v=[\w-]+)\)\s*·\s*\[([^\]]+)\]\(([^)]+)\)', c)
  cat = f(c, 'Category / topic')
  cat_main, _, topic = cat.rstrip('.').partition(' — ')
  views = int(re.sub(r'[^\d]', '', f(c, 'Views')) or 0)
  meta = re.search(r'caption language codes:\s*([^.]*)\.', c)
  kw = f(c, 'Uploader keyword sample').rstrip('.')
  out.append({'rank': n, 'id': vid, 'title': title, 'channel': ch.group(1) if ch else '', 'channel_url': ch.group(2) if ch else '',
              'views': views, 'published': f(c, 'Published'), 'duration': f(c, 'Duration'), 'likes': f(c, 'Likes'),
              'category': cat_main.strip(), 'topic': topic.strip(), 'description': f(c, 'Description'), 'learning': f(c, 'Learning / Moto Zero use'),
              'keywords': [k.strip() for k in kw.split(',') if k.strip()], 'captions': (meta.group(1).strip() if meta else ''),
              'best_use': best.get(vid, '')})
# second collection: V101 to V300
t2 = open(os.path.join(H, 'Moto_Zero_200_More_YouTube_Videos.md'), encoding='utf-8').read()
best2 = {v: u.strip() for v, u in re.findall(r'watch\?v=([\w-]{11})\)\s*\|\s*([^|]+)\|', t2[t2.index('## Suggested first 15'):t2.index('## Ranked list')])}
rec2 = re.split(r'\n### V(\d{3})\. ', t2[t2.index('## Detailed records'):])[1:]
seen = {x['id'] for x in out}
for i in range(0, len(rec2), 2):
  n, c = int(rec2[i]), rec2[i + 1]
  vid = re.search(r'watch\?v=([\w-]{11})', c).group(1)
  if vid in seen: continue
  seen.add(vid)
  ch = re.search(r'\]\((?:https?://www\.youtube\.com/watch\?v=[\w-]+)\)\s*·\s*\[([^\]]+)\]\(([^)]+)\)', c)
  cat_main, _, topic = f(c, 'Category / topic').rstrip('.').partition(' — ')
  meta = re.search(r'caption-track codes:\s*([^.]*)\.', c)
  kw = f(c, 'Uploader keyword sample').rstrip('.')
  out.append({'rank': n, 'id': vid, 'title': c.split('\n', 1)[0].strip(), 'channel': ch.group(1) if ch else '', 'channel_url': ch.group(2) if ch else '',
              'views': int(re.sub(r'[^\d]', '', f(c, 'Views')) or 0), 'published': f(c, 'Published'), 'duration': f(c, 'Duration'), 'likes': f(c, 'Likes exposed'),
              'category': cat_main.strip(), 'topic': topic.strip(), 'description': f(c, 'Description'), 'learning': f(c, 'Learning / suggested use'),
              'keywords': [k.strip() for k in kw.split(',') if k.strip()], 'captions': (meta.group(1).strip() if meta else ''),
              'best_use': best2.get(vid, '')})
json.dump(out, open(os.path.join(H, 'videos.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), sum(1 for x in out if x['best_use']), 'first-12')
