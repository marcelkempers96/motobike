"""Slowly fetch the Wikipedia lead/infobox wikitext for each model in bikes.json into wiki/<id>.json.
Polite: one request every DELAY seconds, long back-off on rate limits, resumable (skips cached ids)."""
import json, os, time, urllib.parse, urllib.request, sys
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'wiki')
UA = 'MotoZeroBot/1.0 (https://www.motopedia.org; marcel@transitionslab.org) education project'
DELAY = float(sys.argv[1]) if len(sys.argv) > 1 else 15
def get(url):
  req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'application/json'})
  with urllib.request.urlopen(req, timeout=30) as r: return r.read().decode('utf-8')
def api(params):
  params.update({'format': 'json', 'formatversion': '2'})
  return 'https://en.wikipedia.org/w/api.php?' + urllib.parse.urlencode(params)
bikes = json.load(open(os.path.join(HERE, 'bikes.json')))
wait = 60
for b in bikes:
  f = os.path.join(OUT, b['id'] + '.json')
  if os.path.exists(f): continue
  while True:
    try:
      # search for the best article, then fetch section 0 (infobox + lead) and the lead image
      s = json.loads(get(api({'action': 'query', 'list': 'search', 'srsearch': b['title'] + ' motorcycle', 'srlimit': 3})))
      hits = [h['title'] for h in s['query']['search']]
      time.sleep(DELAY)
      page = None
      for h in hits:
        if b['make'].split('-')[0].lower() in h.lower(): page = h; break
      rec = {'id': b['id'], 'query': b['title'], 'hits': hits, 'page': page}
      if page:
        p = json.loads(get(api({'action': 'query', 'prop': 'revisions|pageimages|info', 'rvprop': 'content', 'rvslots': 'main', 'rvsection': 0,
                                 'piprop': 'original|name', 'inprop': 'url', 'titles': page, 'redirects': 1})))
        pg = p['query']['pages'][0]
        rec.update({'url': pg.get('fullurl'), 'image': pg.get('pageimage'), 'wikitext': pg['revisions'][0]['slots']['main']['content'] if pg.get('revisions') else ''})
        time.sleep(DELAY)
      json.dump(rec, open(f, 'w'), ensure_ascii=False)
      print(b['n'], b['title'], '->', page, flush=True); wait = 60
      break
    except Exception as e:
      print('wait', wait, b['title'], str(e)[:80], flush=True); time.sleep(wait); wait = min(wait * 2, 1800)
print('done', flush=True)
