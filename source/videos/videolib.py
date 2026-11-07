"""Shared helpers for YouTube videos on Motopedia pages.

videos.json      100 researched videos (parse_videos.py)
video-map.json   which pages each video belongs on, with a role and a note (editorial)
"""
import html, json, os, re

H = os.path.dirname(os.path.abspath(__file__))
e = lambda s: html.escape(str(s or ''), quote=True)
ROLE = {'tutorial': 'How-to', 'explainer': 'How it works', 'case-study': 'Case study'}

def load():
  vids = {v['id']: v for v in json.load(open(os.path.join(H, 'videos.json'), encoding='utf-8'))}
  mp = {}
  f = os.path.join(H, 'video-map.json')
  if os.path.exists(f):
    mp = {k: v for k, v in json.load(open(f, encoding='utf-8')).items() if k in vids and v.get('role') != 'skip'}
  by = {'repairs': {}, 'problems': {}, 'parts': {}, 'course': {}}
  order = {'tutorial': 0, 'explainer': 1, 'case-study': 2}
  for vid, m in mp.items():
    for k in by:
      for pid in m.get(k, []) or []:
        by[k].setdefault(pid, []).append(vid)
  for k in by:
    for pid, l in by[k].items():
      l.sort(key=lambda v: (order.get(mp[v]['role'], 3), -vids[v]['views']))
      by[k][pid] = l[:3]
  return vids, mp, by

def iso_duration(d):
  p = [int(x) for x in re.findall(r'\d+', d or '')]
  if not p: return None
  while len(p) < 3: p.insert(0, 0)
  h, m, s = p[-3:]
  return f'PT{h}H{m}M{s}S' if h else f'PT{m}M{s}S'

def card(v, m):
  note = (m or {}).get('note') or v.get('learning') or v.get('description')
  role = ROLE.get((m or {}).get('role'), '')
  return (f'<div class="mz-yt" data-id="{e(v["id"])}" data-title="{e(v["title"])}">'
          f'<div class="mz-yt-stage"><button type="button" class="mz-yt-play" aria-label="Play video: {e(v["title"])}">'
          f'<img src="https://i.ytimg.com/vi/{e(v["id"])}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><i></i></button></div>'
          f'<div class="mz-yt-info">{f"<span class=mz-yt-role>{role}</span>" if role else ""}<b>{e(v["title"])}</b>'
          f'<span><a href="{e(v["channel_url"])}" target="_blank" rel="noopener">{e(v["channel"])}</a> · {e(v["duration"])} · '
          f'<a href="https://www.youtube.com/watch?v={e(v["id"])}" target="_blank" rel="noopener">YouTube</a></span>'
          f'<p>{e(note)}</p></div></div>')

def section(ids, vids, mp, title='Videos'):
  if not ids: return ''
  return (f'<section class="r-sec mz-videos"><h2>{e(title)}</h2><div class="mz-yts">{"".join(card(vids[i], mp.get(i)) for i in ids)}</div>'
          '<p class="r-note">Videos by their creators on YouTube, chosen because they show this clearly. Values in a video are for the bike shown; use your own bike\'s manual.</p></section>')

def ld(v, m=None):
  d = {"@context": "https://schema.org", "@type": "VideoObject", "name": v['title'],
       "description": (m or {}).get('note') or v.get('description') or v['title'],
       "thumbnailUrl": [f"https://i.ytimg.com/vi/{v['id']}/hqdefault.jpg"],
       "embedUrl": f"https://www.youtube-nocookie.com/embed/{v['id']}", "contentUrl": f"https://www.youtube.com/watch?v={v['id']}"}
  if v.get('published'): d["uploadDate"] = v['published'] + 'T00:00:00Z'
  dur = iso_duration(v.get('duration'))
  if dur: d["duration"] = dur
  if v.get('views'): d["interactionStatistic"] = {"@type": "InteractionCounter", "interactionType": {"@type": "WatchAction"}, "userInteractionCount": v['views']}
  return d
