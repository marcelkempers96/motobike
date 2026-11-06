#!/usr/bin/env python3
"""Build the Moto Zero Repair section from the writers' Markdown.

Input:  source/repair/md/{problems,repairs,parts,systems}/*.md and source/repair/repair-data.json
Output: static pages under /repair/ (home, problems, repairs, parts, systems), the
        search index assets/content/repair-index.js, and sitemap entries.

Pages are rendered from the Markdown body; the cross-link sections (repairs for a
problem, parts with shop links, related problems, sources) are generated from
repair-data.json so they are the same on every page. Pages that have not been
uploaded yet get a short holding page so no link breaks.

    pip install markdown
    python3 source/repair/build_repair.py
"""
import html, json, os, re, shutil
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'source/repair')
OUT = os.path.join(ROOT, 'repair')
SITE = 'https://motobike-five.vercel.app'
CSSV = '20261106b'
e = lambda s: html.escape(str(s if s is not None else ''), quote=True)

D = json.load(open(os.path.join(SRC, 'repair-data.json'), encoding='utf-8'))
PROB = {x['id']: x for x in D['problems']}
REP = {x['id']: x for x in D['repairs']}
PART = {x['id']: x for x in D['parts']}
import glob as _glob
NEW_MD = {}   # (kind, id) -> path of a page written from the repair course
for _ix in sorted(_glob.glob(os.path.join(SRC, 'new', '*', 'index.json'))):
  _sec = os.path.dirname(_ix)
  _d = json.load(open(_ix, encoding='utf-8'))
  for _k, _store in (('repairs', REP), ('problems', PROB), ('parts', PART)):
    for _x in _d.get(_k, []):
      _f = os.path.join(_sec, _k, _x['id'] + '.md')
      if _x['id'] in _store or not os.path.exists(_f): continue
      _store[_x['id']] = _x; NEW_MD[(_k, _x['id'])] = _f
# back-links: new repairs appear on the parts and problems they name
for _k, _x in list(NEW_MD):
  if _k != 'repairs': continue
  _r = REP[_x]
  for _pt in _r.get('parts', []):
    if _pt in PART and _x not in PART[_pt].setdefault('repairs', []): PART[_pt]['repairs'].append(_x)
  for _pb in _r.get('fixes', []):
    if _pb in PROB and _x not in PROB[_pb].setdefault('repairs', []): PROB[_pb]['repairs'].append(_x)
for _k, _x in list(NEW_MD):
  if _k != 'parts': continue
  _p = PART[_x]; _p.setdefault('category', 'engine'); _p.setdefault('aliases', [])
  for _r in _p.get('repairs', []):
    if _r in REP and _x not in REP[_r].setdefault('parts', []): REP[_r]['parts'].append(_x)
  for _pb in _p.get('problems', []):
    if _pb in PROB and _x not in PROB[_pb].setdefault('parts', []): PROB[_pb]['parts'].append(_x)
# repairs and problems that name a new part show on its page
for _k, _x in list(NEW_MD):
  if _k != 'parts': continue
  for _r, _rv in REP.items():
    if _x in _rv.get('parts', []) and _r not in PART[_x].setdefault('repairs', []): PART[_x]['repairs'].append(_r)
  for _pb, _pv in PROB.items():
    if _x in _pv.get('parts', []) and _pb not in PART[_x].setdefault('problems', []): PART[_x]['problems'].append(_pb)
for _k, _x in list(NEW_MD):
  if _k != 'problems': continue
  for _pt in PROB[_x].get('parts', []):
    if _pt in PART and _x not in PART[_pt].setdefault('problems', []): PART[_pt]['problems'].append(_x)

# bikes (Repair > By bike): source/bikes/bikedata.py merges the bible, research and Wikipedia
import sys as _sys
_sys.path.insert(0, os.path.join(ROOT, 'source', 'bikes'))
import bikedata as _bd
_sys.path.insert(0, os.path.join(ROOT, 'source', 'videos'))
import videolib as _vl
VIDS, VMAP, VBY = _vl.load()
def videos_html(kind, i, title='Videos'):
  return _vl.section(VBY[kind].get(i, []), VIDS, VMAP, title)
def videos_ld(kind, i):
  return [_vl.ld(VIDS[v], VMAP.get(v)) for v in VBY[kind].get(i, [])]
BIKES = [b for b in _bd.load()]
for _b in BIKES:
  _b['repairs'] = [x for x in _b['repairs'] if x in REP]; _b['problems'] = [x for x in _b['problems'] if x in PROB]; _b['parts'] = [x for x in _b['parts'] if x in PART]
BIKES_BY = {'repairs': {}, 'problems': {}}
for _b in sorted(BIKES, key=lambda b: (not b['rich'], b['n'])):
  for _k in ('repairs', 'problems'):
    for _x in _b[_k]: BIKES_BY[_k].setdefault(_x, []).append(_b)
def bikes_html(kind, i, rel, limit=12):
  bs = BIKES_BY[kind].get(i, [])
  if not bs: return ''
  li = ''.join(f'<li><a href="{rel}repair/bikes/{b["make_slug"]}/{b["id"]}/">{e(b["title"])}</a></li>' for b in bs[:limit])
  return f'<section class="r-sec"><h2>Bikes this {"job" if kind == "repairs" else "problem"} often comes up on</h2><ul class="r-bikelinks">{li}</ul><p class="r-note">{len(bs)} bikes in the <a href="{rel}repair/bikes/">bike directory</a> list this. Check your own bike\'s manual for its values.</p></section>'

# photos from the repair course (used with permission): photo-map.json for existing pages,
# `photos:` frontmatter for new pages. Copied as web-size JPEGs to assets/repair-photos/.
from PIL import Image as _Image
PHOTO_DIR = os.path.join(ROOT, 'assets', 'repair-photos')
PHOTO_CREDIT = "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission"
PHOTOS = {'parts': {}, 'repairs': {}, 'problems': {}, 'systems': {}}
# photo-map.json (pass 1), then photos2/*.json (pass 2) appended in order, no repeats per page
for _pm in [os.path.join(SRC, 'photo-map.json')] + sorted(_glob.glob(os.path.join(SRC, 'photos2', '*.json'))):
  if not os.path.exists(_pm): continue
  _m = json.load(open(_pm, encoding='utf-8'))
  for _k in PHOTOS:
    for _i, _l in (_m.get(_k) or {}).items():
      _cur = PHOTOS[_k].setdefault(_i, [])
      for _ph in _l:
        if _ph.get('file') and all(_ph['file'] != _c['file'] for _c in _cur): _cur.append(_ph)
def _apply_order():
  # photos2/*.json may hold "order": {kind: {id: [file, ...]}}: listed photos first, in that order (job order)
  for _pm in sorted(_glob.glob(os.path.join(SRC, 'photos2', '*.json'))):
    _o = (json.load(open(_pm, encoding='utf-8')).get('order') or {})
    for _k, _ids in _o.items():
      if _k not in PHOTOS: continue
      for _i, _files in (_ids or {}).items():
        cur = PHOTOS[_k].get(_i)
        if not cur: continue
        rank = {f: n for n, f in enumerate(_files)}
        PHOTOS[_k][_i] = sorted(cur, key=lambda x: (rank.get(x['file'], len(rank)), cur.index(x)))
def _fm_photos(path):
  t = open(path, encoding='utf-8').read()
  if not t.startswith('---'): return []
  fm = t[3:t.index('\n---', 3)]
  out = []
  for m in re.finditer(r'\{\s*"?file"?:\s*"([^"]+)"\s*,\s*"?caption"?:\s*"([^"]*)"\s*\}', fm): out.append({'file': m.group(1), 'caption': m.group(2)})
  if not out:
    for m in re.finditer(r'-\s*file:\s*"?([^"\n]+?)"?\s*\n\s*caption:\s*"?([^"\n]*)"?\s*(?:\n|$)', fm): out.append({'file': m.group(1).strip(), 'caption': m.group(2).strip()})
  return out
for (_k, _i), _f in NEW_MD.items():
  _ph = _fm_photos(_f)
  if _ph: PHOTOS[_k][_i] = _ph + [x for x in PHOTOS[_k].get(_i, []) if all(x['file'] != y['file'] for y in _ph)]
_apply_order()
_done = {}
MIN_PHOTO_PX = 320
def photo_src(src):
  if src in _done: return _done[src]
  full = os.path.join(ROOT, src)
  if not os.path.exists(full): _done[src] = None; return None
  # skip photos too small to show sharply (they appear up to ~600 px wide on the page)
  try:
    if max(_Image.open(full).size) < MIN_PHOTO_PX: _done[src] = None; return None
  except Exception: _done[src] = None; return None
  name = re.sub(r'[^a-z0-9_-]+', '-', os.path.splitext(os.path.basename(src))[0].lower()) + '.jpg'
  out = os.path.join(PHOTO_DIR, name)
  if not os.path.exists(out):
    os.makedirs(PHOTO_DIR, exist_ok=True)
    try:
      im = _Image.open(full); im = im.convert('RGB'); im.thumbnail((1200, 1200)); im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    except Exception: _done[src] = None; return None
  _done[src] = 'assets/repair-photos/' + name
  return _done[src]
_AH = {}
def _ahash(src):
  # 8x8 average hash of a converted photo, to drop near-duplicates (same photo at two sizes) on one page
  if src not in _AH:
    try:
      im = _Image.open(os.path.join(ROOT, src)).convert('L').resize((8, 8))
      px = list(im.getdata()); m = sum(px) / 64; _AH[src] = sum(1 << n for n, v in enumerate(px) if v > m)
    except Exception: _AH[src] = None
  return _AH[src]
def _near(a, b): return a is not None and b is not None and bin(a ^ b).count('1') <= 6
def photos_html(kind, i, rel, limit=4, skip=None):
  items = []; hashes = [_ahash(skip)] if skip else []
  for ph in PHOTOS[kind].get(i, [])[:limit + (1 if skip else 0)]:
    src = photo_src(ph['file'])
    if src == skip: continue
    if src:
      h = _ahash(src)
      if any(_near(h, x) for x in hashes): continue
      hashes.append(h)
    if src and len(items) < limit: items.append(f'<figure><a href="{rel}{src}" target="_blank" rel="noopener"><img src="{rel}{src}" alt="{e(ph.get("caption", ""))}" loading="lazy"></a><figcaption>{e(ph.get("caption", ""))}</figcaption></figure>')
  if not items: return ''
  return f'<section class="r-photos" aria-label="Photos"><div class="r-photos-grid">{"".join(items)}</div></section>'

SYS = D['systems']
def sys_icon(name, rel, size=40):
  # icon file named after the system's title, e.g. "Battery and charging" -> battery-and-charging.svg
  sl = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
  return f'<img class="r-ico" src="{rel}assets/icons/{sl}.svg" alt="" width="{size}" height="{size}">' if os.path.exists(os.path.join(ROOT, 'assets/icons', sl + '.svg')) else ''

URG = {'ok-to-ride': ('OK to ride', 'ok'), 'ride-with-care': ('Ride with care', 'care'), 'do-not-ride': ('Do not ride', 'stop'), 'stop-now': ('Stop now', 'now')}
LEVEL = {'rider': ('Rider job', 'No special tools'), 'home': ('Home workshop', 'Basic tools and some experience'), 'workshop': ('Workshop job', 'Check safely, then hand it to a workshop')}
CAT = {}
for p in D['parts']: CAT.setdefault(p['category'], []).append(p['id'])
CATNAME = {'engine': 'Engine', 'fuel': 'Fuel and air', 'fuel-air': 'Fuel and air', 'exhaust': 'Exhaust', 'cooling': 'Cooling', 'ignition': 'Ignition', 'electrical': 'Electrical',
           'drivetrain': 'Clutch, gearbox and final drive', 'brakes': 'Brakes', 'chassis': 'Chassis, steering and suspension', 'wheels': 'Wheels and tyres', 'body': 'Frame, stands and bodywork', 'electric': 'Electric drive and battery', 'ev': 'Electric drive and battery'}

# Spare parts shop (part type pages from the shop workbook) for "Find this part"
SHOP = {'brake_pads': 'brake-pads', 'drum_brake': 'brake-shoes', 'brake_disc': 'brake-disc', 'spark_plug': 'spark-plug', 'air_filter': 'air-filter',
        'oil_filter': 'oil-filter', 'engine_oil': 'engine-oil', 'battery': 'battery', 'aux_battery': 'battery', 'front_tyre': 'tyres', 'rear_tyre': 'tyres', 'inner_tube': 'tyres',
        'clutch_cable': 'clutch-cable', 'throttle_cable': 'throttle-cable', 'levers': 'levers', 'mirrors': 'mirrors', 'headlight': 'headlight', 'fork_seals': 'fork-seals',
        'fork_oil': 'fork-seals', 'rear_shock': 'rear-shock', 'wheel_bearing': 'wheel-bearings', 'regulator': 'regulator-rectifier', 'controller': 'ev-controller', 'charger': 'ev-charger',
        'chain': 'chain-sprocket-kit', 'front_sprocket': 'chain-sprocket-kit', 'rear_sprocket': 'chain-sprocket-kit', 'cvt_belt': 'drive-belt', 'cvt_rollers': 'roller-weights',
        'cvt_clutch': 'cvt-clutch-shoes', 'gear_oil': 'gear-oil', 'clutch_plates': 'clutch-plates'}
def shop_url(pid): return f'parts/part/{SHOP[pid]}/' if pid in SHOP else 'parts/'

# Picture per part: shop photo if downloaded, else a course render or plate
IMG = {'engine': 'renders/engine_4t.webp', 'cylinder': 'renders/cylinder.webp', 'cylinder_head': 'renders/cylinder.webp', 'piston': 'renders/piston.webp', 'piston_rings': 'renders/piston.webp',
       'crankshaft': 'renders/crankshaft_single.webp', 'camshaft': 'illustrations/powertrain/F10.png', 'valves': 'renders/valve_in.webp', 'valve_springs': 'renders/valve_ex.webp',
       'rocker_arms': 'illustrations/powertrain/F10.png', 'pushrods': 'illustrations/powertrain/F10.png', 'cam_chain': 'illustrations/powertrain/F09.png', 'cam_tensioner': 'illustrations/powertrain/F09.png',
       'oil_pump': 'illustrations/powertrain/F11.png', 'oil_filter': 'illustrations/powertrain/F11.png', 'engine_oil': 'photos/honda-air-cooled.jpg', 'drain_plug': 'illustrations/powertrain/F11.png',
       'crankcase_breather': 'illustrations/powertrain/F11.png', 'engine_mounts': 'renders/engine_4t.webp', 'two_stroke_oil_pump': 'renders/engine_2t.webp', 'gaskets': 'photos/engine-closeup.jpg', 'oil_seals': 'photos/engine-closeup.jpg',
       'air_filter': 'renders/air_filter.webp', 'fuel_tank': 'renders/fuel_tank.webp', 'fuel_cap': 'renders/fuel_tank.webp', 'fuel_tap': 'renders/fuel_tank.webp', 'fuel_filter': 'illustrations/powertrain/F12.png',
       'fuel_line': 'illustrations/powertrain/F12.png', 'fuel_pump': 'illustrations/powertrain/F12.png', 'fuel_sender': 'renders/fuel_tank.webp', 'injector': 'illustrations/powertrain/F12.png',
       'throttle_body': 'renders/throttle_body.webp', 'carb': 'photos/carburettor-work.jpg', 'intake_manifold': 'renders/carb.webp', 'efi_sensors': 'illustrations/powertrain/F12.png', 'o2_sensor': 'renders/exhaust_4t.webp',
       'exhaust': 'renders/exhaust_4t.webp', 'exhaust_gasket': 'renders/exhaust_4t.webp', 'spark_plug': 'renders/photo/render-plug.jpg', 'ignition_coil': 'illustrations/wiring/F22.png', 'pickup': 'illustrations/wiring/F22.png',
       'cdi': 'illustrations/wiring/F22.png', 'ecu': 'illustrations/powertrain/F12.png', 'ignition_switch': 'renders/instruments_analogue.webp', 'battery': 'renders/battery_12v.webp', 'regulator': 'illustrations/wiring/F21.png',
       'stator': 'illustrations/wiring/F21.png', 'starter': 'illustrations/wiring/F23.png', 'starter_relay': 'illustrations/wiring/F23.png', 'starter_clutch': 'illustrations/wiring/F23.png', 'fuse': 'illustrations/wiring/WR01.png',
       'wiring': 'renders/wiring_harness.webp', 'earth_strap': 'illustrations/wiring/WR01.png', 'flasher': 'illustrations/electrical/EL01.png', 'interlock_switches': 'illustrations/wiring/F23.png',
       'handlebar_switches': 'illustrations/electrical/EL01.png', 'headlight': 'renders/headlight_round.webp', 'tail_light': 'renders/tail_light.webp', 'indicators': 'illustrations/electrical/EL01.png', 'horn': 'illustrations/electrical/EL01.png',
       'instruments': 'renders/instruments_analogue.webp', 'speed_sensor': 'renders/instruments_tft.webp', 'brake_light_switch': 'illustrations/electrical/EL02.png', 'clutch': 'renders/clutch_exploded.webp',
       'clutch_plates': 'renders/clutch_exploded.webp', 'clutch_cable': 'illustrations/controls/F05.png', 'gearbox': 'illustrations/transmission/F14.png', 'shift_mechanism': 'illustrations/transmission/TR01.png',
       'gear_lever': 'illustrations/transmission/TR01.png', 'kickstarter': 'renders/engine_4t.webp', 'chain': 'renders/photo/render-chain.jpg', 'front_sprocket': 'renders/chain_sprockets.webp', 'rear_sprocket': 'renders/rear_sprocket.webp',
       'cush_drive': 'renders/rear_sprocket.webp', 'chain_guide': 'illustrations/transmission/F15.png', 'cvt_belt': 'photos/scooter-cvt-workshop.jpg', 'cvt_rollers': 'illustrations/transmission/F16.png', 'cvt_clutch': 'photos/scooter-cvt-workshop.jpg',
       'gear_oil': 'illustrations/transmission/F16.png', 'brake': 'renders/brake.webp', 'brake_pads': 'renders/photo/render-brake.jpg', 'brake_disc': 'renders/brake.webp', 'brake_caliper': 'renders/brake.webp', 'brake_fluid': 'illustrations/chassis/F19.png',
       'brake_hose': 'illustrations/chassis/F19.png', 'master_cylinder': 'illustrations/chassis/F19.png', 'rear_brake': 'illustrations/chassis/F19.png', 'drum_brake': 'illustrations/chassis/F19.png', 'brake_cable': 'illustrations/chassis/F19.png',
       'cbs_unit': 'illustrations/chassis/F19.png', 'abs': 'renders/brake.webp', 'frame': 'renders/frame.webp', 'forks': 'renders/forks.webp', 'fork_seals': 'illustrations/chassis/F18.png', 'fork_oil': 'illustrations/chassis/F18.png',
       'steering_bearings': 'illustrations/chassis/F17.png', 'handlebar': 'renders/handlebar.webp', 'levers': 'renders/handlebar.webp', 'throttle_cable': 'illustrations/controls/F05.png', 'choke_cable': 'illustrations/controls/F05.png',
       'speedo_cable': 'renders/instruments_analogue.webp', 'swingarm': 'renders/swingarm.webp', 'rear_shock': 'renders/rear_shock_twin.webp', 'front_wheel': 'renders/front_wheel_spoked.webp', 'rear_wheel': 'renders/rear_wheel_spoked.webp',
       'wheel_bearing': 'illustrations/wheels/W02.png', 'front_tyre': 'illustrations/wheels/F20.png', 'rear_tyre': 'illustrations/wheels/F20.png', 'inner_tube': 'illustrations/wheels/F20.png', 'tyre_valve': 'illustrations/wheels/F20.png',
       'spokes': 'renders/front_wheel_spoked.webp', 'axle': 'illustrations/wheels/W02.png', 'footpegs': 'illustrations/frame_body/FB02.png', 'side_stand': 'illustrations/frame_body/FB02.png', 'centre_stand': 'illustrations/frame_body/FB02.png',
       'seat': 'renders/seat_bench.webp', 'bodywork': 'illustrations/frame_body/FB02.png', 'mirrors': 'renders/handlebar.webp', 'traction_battery': 'renders/battery_hv.webp', 'bms': 'illustrations/electrical/F26.png',
       'aux_battery': 'renders/battery_12v.webp', 'charger': 'renders/charge_port.webp', 'charge_port': 'renders/charge_port.webp', 'motor': 'renders/motor.webp', 'controller': 'renders/controller.webp',
       'contactor': 'illustrations/electrical/F25.png', 'dc_dc': 'illustrations/electrical/F25.png', 'throttle_sensor': 'renders/controller.webp', 'motor_sensor': 'illustrations/electrical/F24.png',
       'radiator': 'renders/engine_2t.webp', 'coolant': 'renders/engine_2t.webp', 'cooling_fan': 'renders/engine_2t.webp', 'thermostat': 'renders/engine_2t.webp', 'water_pump': 'renders/engine_2t.webp'}
# Under the Engine renders for engine-internal parts, with the view to open
ENG_SHOT = {'engine': ('01-whole-engine', 'overview'), 'crankshaft': ('01-whole-engine', 'overview'), 'piston': ('07-valvetrain', 'top'), 'piston_rings': ('07-valvetrain', 'top'),
  'camshaft': ('07-valvetrain', 'top'), 'valves': ('07-valvetrain', 'top'), 'valve_springs': ('07-valvetrain', 'top'), 'rocker_arms': ('07-valvetrain', 'top'), 'pushrods': ('07-valvetrain', 'top'),
  'cam_chain': ('07-valvetrain', 'top'), 'cam_tensioner': ('07-valvetrain', 'top'), 'clutch': ('03-clutch-cutaway-pulled', 'clutch'), 'clutch_plates': ('03-clutch-cutaway-pulled', 'clutch'),
  'clutch_cable': ('03-clutch-cutaway-pulled', 'clutch'), 'gearbox': ('02-gearbox-function-colours', 'gearbox'), 'shift_mechanism': ('04-shift-drum-star-detent', 'shift'), 'gear_lever': ('04-shift-drum-star-detent', 'shift'),
  'kickstarter': ('06-kickstart', 'start'), 'starter': ('05-generator-electric-start', 'start'), 'starter_clutch': ('05-generator-electric-start', 'start'), 'stator': ('05-generator-electric-start', 'gen'),
  'pickup': ('05-generator-electric-start', 'gen'), 'cdi': ('05-generator-electric-start', 'gen'), 'ignition_coil': ('05-generator-electric-start', 'gen'), 'front_sprocket': ('01-whole-engine', 'final')}
for _k, (_f, _v) in ENG_SHOT.items(): IMG[_k] = f'engine/shots/{_f}.webp'
SP = {}
try:
  sp = open(os.path.join(ROOT, 'assets/content/spare-parts.js'), encoding='utf-8').read()
  for x in json.loads(sp[sp.index('{'):sp.rindex('}') + 1])['parts']:
    if x.get('photos'): SP[x['id']] = x['photos'][0]
except Exception: pass
def part_img(pid):
  if pid in SHOP and SHOP[pid] in SP: return SP[SHOP[pid]]['src'], SP[SHOP[pid]]
  if os.path.exists(os.path.join(ROOT, 'assets/parts-svg', pid + '.svg')): return f'assets/parts-svg/{pid}.svg', None
  if pid not in IMG:
    for _ph in PHOTOS['parts'].get(pid, []):
      _s = photo_src(_ph['file'])
      if _s: return _s, None
  return 'assets/' + IMG.get(pid, 'renders/engine_4t.webp'), None
for v in IMG.values(): assert os.path.exists(os.path.join(ROOT, 'assets', v)), v

ELEC_OV = {'motor', 'controller', 'charge_port'}
def overview_url(pid):
  ov = (PART.get(pid) or {}).get('overview') or ''
  m = re.search(r'part=([a-z_]+)', ov)
  if not m: return None
  p = m.group(1)
  return f'overview/?{"mode=elec&" if p in ELEC_OV or pid in ("traction_battery", "bms", "contactor", "dc_dc", "charger", "aux_battery", "motor_sensor", "throttle_sensor") else ""}part={p}'

# ---------------------------------------------------------------------------
def read_md(kind, i):
  f = NEW_MD.get((kind, i)) or os.path.join(SRC, 'md', kind, i + '.md')
  if not os.path.exists(f): return None, None
  t = open(f, encoding='utf-8').read()
  fm = {}
  if t.startswith('---'):
    end = t.index('\n---', 3); t = t[end + 4:]
  return t, fm

GENERATED = re.compile(r'^## (Problems this repair helps with|Parts for this job|Sources|Repairs for this problem|Parts you may need|Related problems|Problems|Repairs|Parts|Repairs in this system|Parts in this system|Problems and repairs)\s*$', re.M)
def clean_body(t):
  t = re.sub(r'^# [^\n]*\n', '', t.lstrip(), count=1)               # title rendered separately
  t = re.sub(r'^\*\*(Rider job|Home workshop|Workshop job|Home job)[^\n]*\n', '', t.lstrip(), count=1)
  # Markdown needs a blank line before a list that follows a paragraph line
  out = []
  for line in t.split('\n'):
    if re.match(r'^\s*([-*]|\d+\.) ', line) and out and out[-1].strip() and not re.match(r'^\s*([-*]|\d+\.) ', out[-1]) and not out[-1].startswith('|'):
      out.append('')
    out.append(line)
  t = '\n'.join(out)
  m = GENERATED.search(t)
  if m: t = t[:m.start()]
  return t.strip()

def link_rewrite(h, rel):
  h = re.sub(r'href="/moto-zero/repair/(problems|repairs|parts|systems)/([A-Za-z0-9_-]+)"', lambda m: f'href="{rel}repair/{m.group(1)}/{m.group(2)}/"', h)
  h = re.sub(r'href="/moto-zero/repair/?"', f'href="{rel}repair/"', h)
  h = re.sub(r'href="/moto-zero/repair/(problems|repairs|parts)"', lambda m: f'href="{rel}repair/{m.group(1)}/"', h)
  h = re.sub(r'href="/spare-parts/([a-z0-9-]+)"', lambda m: f'href="{rel}{shop_url(m.group(1).replace("-", "_"))}"', h)
  h = re.sub(r'href="/overview/', f'href="{rel}overview/', h)
  h = re.sub(r'href="/(engine|wiring|crash-course|learn|cockpit|build|parts)/', lambda m: f'href="{rel}{m.group(1)}/', h)
  h = re.sub(r'href="(https?://[^"]+)"', r'href="\1" target="_blank" rel="noopener"', h)
  return h

def md_html(t, rel):
  h = markdown.markdown(t, extensions=['tables', 'sane_lists'])
  h = link_rewrite(h, rel)
  h = re.sub(r'<p><strong>(\d+)\. (.*?)</strong></p>', r'<p class="rq"><b>\1</b><span>\2</span></p>', h)   # diagnosis questions
  h = h.replace('<table>', '<div class="rtab"><table>').replace('</table>', '</table></div>')
  return h

def sources_html(srcs):
  if not srcs: return ''
  li = []
  for s in srcs:
    if s.get('url'): li.append(f'<li><a href="{e(s["url"])}" target="_blank" rel="noopener">{e(s["doc"])}</a></li>')
    else: li.append(f'<li>{e(s["doc"])}{", PDF page " + e(s["page"]) if s.get("page") else ""}</li>')
  # merge pages of the same document
  merged = {}
  for s in srcs:
    if s.get('url'): continue
    merged.setdefault(s['doc'], []).append(str(s.get('page', '')))
  out = [f'<li>{e(d)}{", PDF pages " if len(p) > 1 else ", PDF page "}{e(", ".join(x for x in p if x))}</li>' for d, p in merged.items()]
  out += [x for s, x in zip(srcs, li) if s.get('url')]
  return f'<details class="rsrc"><summary>Sources</summary><ul>{"".join(out)}</ul></details>'

def plink(i, rel):
  p = PROB[i]; u = URG.get(p.get('urgency'), ('', ''))
  return f'<li class="ru-li is-{u[1]}"><a href="{rel}repair/problems/{i}/" title="{u[0]}"><b>{e(p["title"])}</b><i class="ru-sr">{u[0]}</i></a></li>'
LEGEND = '<div class="ru-legend" aria-hidden="true"><span class="is-ok">OK to ride</span><span class="is-care">Ride with care</span><span class="is-stop">Do not ride</span><span class="is-now">Stop now</span></div>'
def add_legend(html):
  # one colour key per page, next to the first heading that sits above a list of problems
  if 'ru-li' not in html or 'ru-legend' in html: return html
  m = re.search(r'<h2>((?:(?!</h2>).)*)</h2>(\s*<ul class="r-list[^"]*"><li class="ru-li)', html)
  if m: return html[:m.start()] + f'<div class="ru-h2row"><h2>{m.group(1)}</h2>{LEGEND}</div>' + html[m.start() + len(m.group(0)) - len(m.group(2)):]
  return html
def tm(r): return re.sub(r'\s*\((editorial )?estimate\)', '', r.get('time') or '')
def rlink(i, rel):
  r = REP[i]; l = LEVEL.get(r.get('level'), ('', ''))
  return f'<li><a href="{rel}repair/repairs/{i}/"><b>{e(r["title"])}</b><span>{l[0]}{" · " + e(tm(r)) if tm(r) else ""}</span></a></li>'
def part_thumb(pid):
  # cards prefer a real photo: shop photo, then a repair-course photo of the part, then the drawing
  if pid in SHOP and SHOP[pid] in SP: return SP[SHOP[pid]]['src']
  for _ph in PHOTOS['parts'].get(pid, []):
    _s = photo_src(_ph['file'])
    if _s: return _s
  return part_img(pid)[0]
def partcard(i, rel):
  p = PART[i]; src = part_thumb(i)
  return f'<div class="rpc"><a class="rpc-main" href="{rel}repair/parts/{i}/"><span class="rpc-img{' is-photo' if src.endswith(('.jpg', '.jpeg', '.webp')) and '/renders/' not in src else ''}"><img src="{rel}{src}" alt="" loading="lazy"></span><b>{e(p["name"])}</b></a><a class="rpc-shop" href="{rel}{shop_url(i)}">Find this part</a></div>'

SIGNUP = {p: '<section data-mz-signup data-title="Get new repair guides by email"></section>' for p in ('repair/', 'repair/problems/', 'repair/repairs/', 'repair/parts/', 'repair/bikes/', 'repair/diagnose/')}
SEO = {
  'repair/': ('Motorcycle Troubleshooting & Repair Guides | Moto Zero', 'Motorcycle troubleshooting and repair guides', None),
  'repair/parts/': ('Motorcycle Parts: Names & Functions | Moto Zero', 'Motorcycle parts: names, functions and common faults', 'Explore motorcycle parts by system. Learn what each part does, signs of failure and the related diagnostic and repair guides.'),
  'repair/problems/': ('Motorcycle Problems & Diagnostic Guides | Moto Zero', 'Find a motorcycle problem by symptom', None),
  'repair/repairs/': ('Motorcycle Maintenance & Repair Tutorials | Moto Zero', 'Motorcycle maintenance and repair tutorials', None),
  'repair/problems/cranks-no-start/': ('Motorcycle Cranks but Won’t Start? | Moto Zero', 'Motorcycle cranks but won’t start: what to check', 'Motorcycle cranks but won’t start? Follow a structured guide to starting checks, fuel, ignition and compression, with model-specific cautions.'),
  'repair/problems/ev-wont-charge/': ('Electric Motorcycle Won’t Charge? | Moto Zero', 'Electric motorcycle won’t charge: checks and next steps', 'Electric motorcycle not charging? Check external connections and manufacturer guidance, and learn when a qualified technician is needed.'),
  'repair/repairs/chain-adjust/': ('How to Adjust Motorcycle Chain Slack | Moto Zero', 'How to check and adjust motorcycle chain slack', 'Learn how to check motorcycle chain slack and understand adjustment, alignment and wear checks. Use your model’s manual for specifications.'),
  'repair/repairs/engine-oil-service/': ('How to Change Motorcycle Engine Oil | Moto Zero', 'How to change motorcycle engine oil', 'Follow a motorcycle oil-change guide covering preparation, draining, strainers and filters, with clear notes on model-specific requirements.'),
  'repair/parts/brake_pads/': ('Motorcycle Brake Pads Explained | Moto Zero', 'Motorcycle brake pads: function, wear and replacement', None),
}
def page(path, title, desc, body, crumbs, rel, extra_ld=None, noindex=False):
  body = add_legend(body)
  ld = [{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": n + 1, "name": c, "item": SITE + '/' + u} for n, (c, u) in enumerate(crumbs)]}]
  if extra_ld: ld.extend(extra_ld if isinstance(extra_ld, list) else [extra_ld])
  cr = ' / '.join(f'<a href="{rel}{u}">{e(c)}</a>' if n < len(crumbs) - 1 else e(c) for n, (c, u) in enumerate(crumbs))
  doc = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc)}">
  <link rel="canonical" href="{SITE}/{path}">{'<meta name="robots" content="noindex, follow">' if noindex else ''}
  <meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{SITE}/{path}">
  <link rel="icon" href="{rel}assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{rel}assets/styles.css?v={CSSV}">
  <link rel="stylesheet" href="{rel}assets/repair2.css?v=7">
  {''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)}
</head>
<body>
<div class="ute-page rp2">
  <header class="ute-top">
    <a class="ute-brand" href="{rel}" aria-label="Motopedia home"><img class="ute-brand-logo" src="{rel}assets/brand/motopedia-logo-600.webp" alt="Motopedia" width="600" height="114"></a>
    <nav data-mz-nav></nav>
  </header>
  <main class="r-main">
    <p class="r-crumb">{cr}</p>
{body}
  </main>
  {SIGNUP.get(path, '')}
  <footer data-mz-footer></footer>
</div>
<script type="module" src="{rel}assets/site.js"></script>
<script type="module" src="{rel}assets/repair2.js?v=5"></script>
<script type="module" src="{rel}assets/videos.js"></script>
</body>
</html>
'''
  if path in SEO:  # titles, headings and descriptions from the SEO plan (source/Moto_Zero_SEO_Keyword_and_Growth_Plan.md)
    t2, h2_, d2 = SEO[path]
    doc = re.sub(r'<title>.*?</title>', f'<title>{e(t2)}</title>', doc, count=1)
    doc = doc.replace(f'<meta property="og:title" content="{e(title)}">', f'<meta property="og:title" content="{e(t2)}">')
    if d2: doc = doc.replace(f'content="{e(desc)}"', f'content="{e(d2)}"')
    if h2_: doc = re.sub(r'<h1>.*?</h1>', f'<h1>{e(h2_)}</h1>', doc, count=1, flags=re.S)
  d = os.path.join(ROOT, path)
  os.makedirs(d, exist_ok=True)
  open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(doc)

def search_box(ph='What is wrong? For example: will not start'):
  return f'<div class="r-search"><label class="r-sr" for="r-q">Search repair</label><input id="r-q" type="search" placeholder="{e(ph)}" autocomplete="off"><ul class="r-results" hidden></ul></div>'

def holding(kind):
  return f'<p class="r-hold">The full page for this {kind} is being finished. The links below already work.</p>'

# ---------------------------------------------------------------------------
keep = {'fix'}   # /repair/fix/ stays as a redirect for old links
if os.path.isdir(OUT):
  for n in os.listdir(OUT):
    pth = os.path.join(OUT, n)
    if n not in keep:
      shutil.rmtree(pth) if os.path.isdir(pth) else os.remove(pth)
urls = []
missing = {'problems': [], 'repairs': [], 'parts': [], 'systems': []}

# problems
for i, p in PROB.items():
  rel = '../../../'
  t, _ = read_md('problems', i)
  u = URG.get(p.get('urgency'), ('', ''))
  body = md_html(clean_body(t), rel) if t else holding('problem')
  if not t: missing['problems'].append(i)
  reps = ''.join(rlink(x, rel) for x in p.get('repairs', []) if x in REP)
  parts = ''.join(partcard(x, rel) for x in p.get('parts', []) if x in PART)
  rel_p = ''.join(plink(x, rel) for x in p.get('related', []) if x in PROB)
  also = ', '.join(p.get('also_called', [])[:4])
  html_ = f'''    <header class="r-head">
      <span class="ute-label">{e(SYS.get(p["system"], p["system"]))}</span>
      <h1>{e(p["title"])}</h1>
      <p class="r-meta"><i class="ru is-{u[1]}">{u[0]}</i>{f'<span>Also called: {e(also)}</span>' if also else ''}</p>
    </header>
    <div class="r-grid">
      <article class="r-body is-problem">{photos_html('problems', i, rel, 6)}{body}</article>
      <aside class="r-side">
        {f'<section><h2>Repairs for this problem</h2><ul class="r-list">{reps}</ul></section>' if reps else ''}
        {f'<section><h2>Parts you may need</h2><div class="rpcs">{parts}</div></section>' if parts else ''}
      </aside>
    </div>
    {videos_html('problems', i, 'Videos that help with this problem')}
    {f'<section class="r-sec"><h2>Related problems</h2><ul class="r-list is-cols">{rel_p}</ul></section>' if rel_p else ''}
    {bikes_html('problems', i, rel)}
    <section class="r-sec">{sources_html(p.get("sources"))}<p class="r-note">Values marked K-Light 125 are for that reference bike. Use your own bike's manual for its values. Text CC BY-SA 4.0, Transitions Lab.</p></section>'''
  path = f'repair/problems/{i}/'
  page(path, f'{p["title"]}: causes and step-by-step checks | Moto Zero', f'{p["title"]} on a motorcycle or scooter: is it safe to ride, quick checks, step-by-step diagnosis, likely causes and the repair for each.',
       html_, [('Repair', 'repair/'), ('Problems', 'repair/problems/'), (SYS.get(p['system'], ''), f'repair/systems/{p["system"]}/'), (p['title'], path)], rel, extra_ld=videos_ld('problems', i) or None)
  urls.append(path)

# repairs
for i, r in REP.items():
  rel = '../../../'
  t, _ = read_md('repairs', i)
  body = md_html(clean_body(t), rel) if t else holding('repair')
  if not t: missing['repairs'].append(i)
  l = LEVEL.get(r.get('level'), ('', ''))
  fixes = ''.join(plink(x, rel) for x in r.get('fixes', []) if x in PROB)
  parts = ''.join(partcard(x, rel) for x in r.get('parts', []) if x in PART)
  tools = ''.join(f'<li>{e(x)}</li>' for x in r.get('tools', []))
  cons = ''.join(f'<li>{e(x)}</li>' for x in r.get('consumables', []))
  html_ = f'''    <header class="r-head">
      <span class="ute-label">Repair</span>
      <h1>{e(r["title"])}</h1>
      <p class="r-meta"><i class="rl is-{e(r.get("level"))}">{l[0]}</i><span>{l[1]}</span>{f'<span>Time: {e(tm(r))} (estimate)</span>' if tm(r) else ''}</p>
    </header>
    <div class="r-grid">
      <article class="r-body is-repair" data-steps="{i}">{photos_html('repairs', i, rel, 8)}{body}</article>
      <aside class="r-side">
        {f'<section><h2>Tools</h2><ul class="r-plain">{tools}</ul></section>' if tools else ''}
        {f'<section><h2>Consumables</h2><ul class="r-plain">{cons}</ul></section>' if cons else ''}
        {f'<section><h2>Parts for this job</h2><div class="rpcs">{parts}</div></section>' if parts else ''}
      </aside>
    </div>
    {videos_html('repairs', i, 'Watch it done')}
    {f'<section class="r-sec"><h2>Problems this repair helps with</h2><ul class="r-list is-cols">{fixes}</ul></section>' if fixes else ''}
    {bikes_html('repairs', i, rel)}
    <section class="r-sec">{sources_html(r.get("sources"))}<p class="r-note">Values marked K-Light 125 are for that reference bike. Use your own bike's manual for its values. Text CC BY-SA 4.0, Transitions Lab.</p></section>'''
  path = f'repair/repairs/{i}/'
  page(path, f'{r["title"]}: step by step | Moto Zero', f'{r["title"]}: safety, tools, step-by-step instructions, how to check your work and what to do if it did not fix the problem.',
       html_, [('Repair', 'repair/'), ('Repairs', 'repair/repairs/'), (r['title'], path)], rel, extra_ld=videos_ld('repairs', i) or None)
  urls.append(path)

# parts
for i, p in PART.items():
  rel = '../../../'
  t, _ = read_md('parts', i)
  body = md_html(clean_body(t), rel) if t else holding('part')
  if not t: missing['parts'].append(i)
  src, ph = part_img(i)
  cap = f'<figcaption>Typical {e(p["name"].lower())}. Photo: {e(ph["author"])}, <a href="{e(ph["page"])}" target="_blank" rel="noopener">{e(ph["licence"])}</a></figcaption>' if ph else ''
  probs = ''.join(plink(x, rel) for x in p.get('problems', []) if x in PROB)
  reps = ''.join(rlink(x, rel) for x in p.get('repairs', []) if x in REP)
  ov = overview_url(i)
  html_ = f'''    <header class="r-head is-part">
      <div>
        <span class="ute-label">{e(CATNAME.get(p["category"], p["category"].replace("-", " ").capitalize()))}</span>
        <h1>{e(p["name"])}</h1>
        {f'<p class="r-meta"><span>Also called: {e(", ".join(p["aliases"]))}</span></p>' if p.get("aliases") else ''}
        <p class="r-btns"><a class="r-btn is-shop" href="{rel}{shop_url(i)}">Find this part →</a>{f'<a class="r-btn is-3d" href="{rel}{ov}">See it in 3D</a>' if ov else ''}{f'<a class="r-btn is-3d" href="{rel}engine/#{ENG_SHOT[i][1]}">See it in Under the Engine</a>' if i in ENG_SHOT else ''}</p>
      </div>
      <figure class="r-fig"><img src="{rel}{src}" alt="{e(p["name"])}">{cap}</figure>
    </header>
    <div class="r-grid">
      <article class="r-body is-part">{photos_html('parts', i, rel, 6, src)}{body}</article>
      <aside class="r-side">
        {f'<section><h2>Problems it can cause</h2><ul class="r-list">{probs}</ul></section>' if probs else ''}
        {f'<section><h2>Repairs</h2><ul class="r-list">{reps}</ul></section>' if reps else ''}
      </aside>
    </div>
    {videos_html('parts', i, 'Videos: how it works')}
    <section class="r-sec">{sources_html(p.get("sources"))}</section>'''
  path = f'repair/parts/{i}/'
  page(path, f'{p["name"]}: what it does, how it fails, what to buy | Moto Zero', f'{p["name"]} on a motorcycle or scooter: what it does, signs it is failing, when to replace it, what to match when buying, and the repairs.',
       html_, [('Repair', 'repair/'), ('Parts', 'repair/parts/'), (p['name'], path)], rel, extra_ld=videos_ld('parts', i) or None)
  urls.append(path)

# systems
for sid, name in SYS.items():
  rel = '../../../'
  probs = [x for x in PROB.values() if x['system'] == sid]
  t, _ = read_md('systems', sid)
  rep_ids, part_ids = [], []
  if t:
    rep_ids = [m for m in re.findall(r'/repair/repairs/([a-z0-9-]+)', t.split('## Repairs')[1] if '## Repairs' in t else '') if m in REP]
    part_ids = [m for m in re.findall(r'/repair/parts/([a-z0-9_]+)', t.split('## Parts')[1] if '## Parts' in t else '') if m in PART]
  if not rep_ids:
    seen = []
    for x in probs:
      for y in x.get('repairs', []):
        if y not in seen: seen.append(y)
    rep_ids = seen
  if not part_ids:
    seen = []
    for x in probs:
      for y in x.get('parts', []):
        if y not in seen: seen.append(y)
    part_ids = seen
  html_ = f'''    <header class="r-head"><span class="ute-label">System</span><h1 class="r-h1-ico">{sys_icon(name, rel, 56)}{e(name)}</h1><p class="r-lead">Problems, repairs and parts for the {e(name.lower())}.</p></header>
    {photos_html('systems', sid, rel, 6)}
    <section class="r-sec"><h2>Problems</h2><ul class="r-list is-cols">{''.join(plink(x['id'], rel) for x in probs)}</ul></section>
    <section class="r-sec"><h2>Repairs</h2><ul class="r-list is-cols">{''.join(rlink(x, rel) for x in rep_ids)}</ul></section>
    <section class="r-sec"><h2>Parts</h2><div class="rpcs is-grid">{''.join(partcard(x, rel) for x in part_ids)}</div></section>'''
  path = f'repair/systems/{sid}/'
  page(path, f'{name}: motorcycle problems and repairs | Moto Zero', f'Motorcycle {name.lower()} problems, step-by-step repairs and parts, from rider checks to workshop jobs.', html_,
       [('Repair', 'repair/'), (name, path)], rel)
  urls.append(path)

# index pages
rel = '../../'
html_ = f'''    <header class="r-head"><span class="ute-label">Repair</span><h1>By problem</h1><p class="r-lead">Start from what you notice. Each page tells you if it is safe to ride, then walks you through the checks.</p>{search_box()}</header>
    {LEGEND}<nav class="r-jump">{''.join(f'<a href="#{s}">{sys_icon(n, rel, 22)}{e(n)}</a>' for s, n in SYS.items() if any(x["system"] == s for x in PROB.values()))}</nav>
    {''.join(f'<section class="r-sec" id="{s}"><h2 class="r-h2-ico">{sys_icon(n, rel, 32)}{e(n)}</h2><ul class="r-list is-cols">' + ''.join(plink(x["id"], rel) for x in PROB.values() if x["system"] == s) + '</ul></section>' for s, n in SYS.items() if any(x["system"] == s for x in PROB.values()))}'''
page('repair/problems/', 'Motorcycle problems: find the fault step by step | Moto Zero', f'{len(PROB)} motorcycle, scooter and electric bike problems, each with safety advice, quick checks and a step-by-step diagnosis.', html_, [('Repair', 'repair/'), ('Problems', 'repair/problems/')], rel)
html_ = f'''    <header class="r-head"><span class="ute-label">Repair</span><h1>By repair</h1><p class="r-lead">Every job, grouped by who can do it. Workshop jobs explain what to check safely and what to ask the workshop for.</p>{search_box("Search repairs, for example: chain")}</header>
    {''.join(f'<section class="r-sec"><h2>{LEVEL[l][0]} <small>{LEVEL[l][1]}</small></h2><ul class="r-list is-cols">' + ''.join(rlink(x["id"], rel) for x in sorted(REP.values(), key=lambda r: r["title"]) if x.get("level") == l) + '</ul></section>' for l in LEVEL)}'''
page('repair/repairs/', 'Motorcycle repairs step by step | Moto Zero', f'{len(REP)} motorcycle repair and service jobs, from rider checks to home workshop jobs and workshop hand-offs.', html_, [('Repair', 'repair/'), ('Repairs', 'repair/repairs/')], rel)
cats = {}
for p in PART.values(): cats.setdefault(p['category'], []).append(p['id'])
html_ = f'''    <header class="r-head"><span class="ute-label">Repair</span><h1>By part</h1><p class="r-lead">What each part does, how it fails, what to match when you buy one, and where to find it.</p>{search_box("Search parts, for example: brake pads")}</header>
    {''.join(f'<section class="r-sec"><h2>{e(CATNAME.get(c, c.replace("-", " ").capitalize()))}</h2><div class="rpcs is-grid">' + ''.join(partcard(x, rel) for x in ids) + '</div></section>' for c, ids in cats.items())}'''
page('repair/parts/', 'Motorcycle parts: what they do and how they fail | Moto Zero', f'{len(PART)} motorcycle parts explained: what each does, signs of wear, what to match when buying, and the repairs.', html_, [('Repair', 'repair/'), ('Parts', 'repair/parts/')], rel)

# repair home
rel = '../'
start = [x for x in ('pre-ride-check', 'service-schedule', 'road-test', 'pre-delivery-inspection') if x in REP]
common = [x for x in ('cranks-no-start', 'battery-flat', 'spongy-brake', 'chain-noise', 'overheating-air', 'sudden-power-loss', 'puncture-tube', 'ev-wont-charge', 'white-smoke', 'brake-squeal') if x in PROB]
html_ = f'''    <header class="r-head is-home">
      <span class="ute-label">Repair</span>
      <h1>Find the fault. Fix it. Get the part.</h1>
      <p class="r-lead">For commuter motorcycles, scooters and electric bikes: {len(PROB)} problems, {len(REP)} repairs and {len(PART)} parts.</p>
      {search_box()}
      <div class="r-ways">
        <a href="{rel}repair/diagnose/" class="is-main"><b>Diagnose it</b><span>Three questions to the likely fault</span></a>
        <a href="{rel}repair/problems/"><b>By problem</b><span>Start from what you see, hear or feel</span></a>
        <a href="{rel}repair/repairs/"><b>By repair</b><span>Step-by-step jobs, rider to workshop</span></a>
        <a href="{rel}repair/parts/"><b>By part</b><span>What each part does and how it fails</span></a>
        <a href="{rel}parts/"><b>Spare parts</b><span>Prices, intervals and shops for 41 bikes</span></a>
      </div>
    </header>
    <section class="r-sec r-two">
      <div><h2>Start here</h2><ul class="r-list">{''.join(rlink(x, rel) for x in start)}</ul></div>
      <div><h2>Common problems</h2><ul class="r-list">{''.join(plink(x, rel) for x in common)}</ul></div>
    </section>
    <section class="r-sec"><h2>Systems</h2><div class="r-systems">{''.join(f'<a href="{rel}repair/systems/{s}/">{sys_icon(n, rel)}<b>{e(n)}</b><span>{sum(1 for x in PROB.values() if x["system"] == s)} problems</span></a>' for s, n in SYS.items())}</div></section>
    <section class="r-sec r-safe"><h2>Before you work on a bike</h2><ul>
      <li>Work on a stable, level surface with the engine off and cool, unless a step says otherwise.</li>
      <li>Keep fuel away from sparks and flames. Battery acid, brake fluid and coolant harm skin, eyes and paint.</li>
      <li>Brakes, steering, tyres and electric high-voltage systems are safety-critical. If you are unsure, use a workshop.</li>
      <li>Values marked K-Light 125 are for that reference bike. Use your own bike's manual for its values.</li>
    </ul></section>'''
page('repair/', 'Motorcycle repair: find the fault, fix it, get the part | Moto Zero', f'Diagnose {len(PROB)} motorcycle, scooter and electric bike problems, follow {len(REP)} step-by-step repairs and find the right parts.', html_, [('Repair', 'repair/')], rel)
urls = ['repair/', 'repair/problems/', 'repair/repairs/', 'repair/parts/'] + urls

# diagnostics tool
rel = '../../'
html_ = f'''    <header class="r-head is-home">
      <span class="ute-label">Repair · Diagnostics</span>
      <h1>Motorcycle diagnostics: what is wrong with your bike?</h1>
      <p class="r-lead">Answer three quick questions to find the likely fault, whether it is safe to ride, and the step-by-step fix. Free, no login, for petrol motorcycles, scooters and electric bikes.</p>
    </header>
    <section class="r-sec dg" id="dg" aria-live="polite"><p>Loading…</p></section>
    <section class="r-sec r-safe"><h2>How this works</h2><ul>
      <li>Pick your bike, where the problem is, and what you notice. The tool lists the {len(PROB)} problems in this guide, sorted by system.</li>
      <li>Each answer opens a full diagnosis: is it safe to ride, two-minute checks, then yes/no steps that end at a repair, a part or a workshop.</li>
      <li>Brakes, steering, tyres, fuel leaks and high-voltage faults are marked Do not ride or Stop now. Fix them before riding.</li>
    </ul><p class="r-note">Prefer to browse? <a href="{rel}repair/problems/">All problems</a> · <a href="{rel}repair/repairs/">All repairs</a> · <a href="{rel}repair/parts/">All parts</a> · <a href="{rel}parts/">Spare parts</a></p></section>'''
ld = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Moto Zero motorcycle diagnostics", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any (web browser)",
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "url": SITE + '/repair/diagnose/', "publisher": {"@type": "Organization", "name": "Transitions Lab"},
      "description": f"Free motorcycle diagnostics: find the fault from {len(PROB)} symptoms, check if it is safe to ride and follow the step-by-step repair."}
page('repair/diagnose/', 'Motorcycle diagnostics tool: find what is wrong with your bike | Moto Zero', f'Free motorcycle diagnostics tool. Pick your bike and the symptom to find the likely fault, whether it is safe to ride and the step-by-step repair. {len(PROB)} problems covered.', html_,
     [('Repair', 'repair/'), ('Diagnostics', 'repair/diagnose/')], rel, extra_ld=ld)
urls.insert(1, 'repair/diagnose/')

# ---------- By bike: directory, make pages and one page per model ----------
from PIL import Image as _Img
SPARE_MODELS = []
for _d in _glob.glob(os.path.join(ROOT, 'parts', '*', '*', 'index.html')):
  _b, _m = _d.split(os.sep)[-3:-1]
  if _b != 'part': SPARE_MODELS.append((_b, _m))
def spare_for(b):
  toks = [t for t in re.split(r'[^a-z0-9]+', b['model'].lower()) if len(t) >= 3 and not t.isdigit()]
  for br, m in SPARE_MODELS:
    if br == b['make_slug'] and any(t in m.split('-') for t in toks): return f'parts/{br}/{m}/'
  return None
def bike_img(b, rel):
  if b.get('photo'):
    name = b['id'] + '.jpg'; out = os.path.join(ROOT, 'assets', 'bike-photos', name)
    if not os.path.exists(out):
      os.makedirs(os.path.dirname(out), exist_ok=True)
      im = _Img.open(b['photo']['file']).convert('RGB'); im.thumbnail((1200, 1200)); im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    return f'{rel}assets/bike-photos/{name}', True
  return f'{rel}assets/renders/{b["render"]}_side.webp', False
def fmt(v):
  if isinstance(v, float) and v.is_integer(): v = int(v)
  return f'{v:,}' if isinstance(v, int) and v >= 10000 else str(v)
def bike_stats(b):
  sp = b['specs']; out = []
  for k, label, unit in _bd.SPEC_ORDER:
    if k not in sp: continue
    sub = ''
    if k == 'power_hp' and sp.get('power_rpm'): sub = f'at {fmt(sp["power_rpm"]["value"])} rpm'
    if k == 'torque_nm' and sp.get('torque_rpm'): sub = f'at {fmt(sp["torque_rpm"]["value"])} rpm'
    if k == 'weight_kg' and sp.get('weight_type') and sp['weight_type'].get('value'): sub = str(sp['weight_type']['value'])
    out.append(f'<div class="bk-stat"><span>{label}</span><b>{e(fmt(sp[k]["value"]))}<small> {unit}</small></b>{f"<i>{e(sub)}</i>" if sub else ""}</div>')
  return ''.join(out)
def bike_li(b, rel):
  cc = b['specs'].get('displacement_cc'); kwh = b['specs'].get('battery_kwh')
  meta = f'{fmt(cc["value"])} cc' if cc else (f'{fmt(kwh["value"])} kWh' if kwh else '')
  return (f'<li data-cat="{b["category"]}" data-q="{e((b["title"] + " " + " ".join(b["aliases"])).lower())}"><a href="{rel}repair/bikes/{b["make_slug"]}/{b["id"]}/">{e(b["title"])}</a>'
          f'{f" <span>{meta}</span>" if meta else ""}</li>')
def bike_list(bs, rel):
  return '<ul class="bk-list">' + ''.join(bike_li(b, rel) for b in sorted(bs, key=lambda x: x['title'].lower())) + '</ul>'
def bike_card(b, rel):
  src, real = bike_img(b, rel)
  cc = b['specs'].get('displacement_cc'); kwh = b['specs'].get('battery_kwh')
  meta = f'{fmt(cc["value"])} cc' if cc else (f'{fmt(kwh["value"])} kWh' if kwh else '')
  return (f'<a class="bk-card" href="{rel}repair/bikes/{b["make_slug"]}/{b["id"]}/" data-cat="{b["category"]}" data-q="{e((b["title"] + " " + " ".join(b["aliases"])).lower())}">'
          f'<span class="bk-img{" is-photo" if real else ""}"><img src="{src}" alt="" loading="lazy"></span><b>{e(b["title"])}</b><span>{e(b["cat_label"])}{" · " + meta if meta else ""}</span></a>')

MAKES = {}
for b in BIKES: MAKES.setdefault(b['make'], []).append(b)
cats_used = [c for c in _bd.CATEGORY if any(b['category'] == c for b in BIKES)]
bike_urls = []
for b in BIKES:
  rel = '../../../../'
  path = f'repair/bikes/{b["make_slug"]}/{b["id"]}/'
  src, real = bike_img(b, rel)
  sp = b['specs']
  stats = bike_stats(b)
  textspecs = ''.join(f'<tr><th>{lab}</th><td>{e(fmt(sp[k]["value"]))}</td></tr>' for k, lab in _bd.TEXT_SPECS if k in sp)
  facts = ''.join(f'<li>{e(f["text"].replace(" Specification source", ""))} <span class="r-note">({e(f["scope"])})</span></li>' for f in b['facts'])
  highs = ''.join(f'<li>{e(h["text"])}</li>' for h in b['highlights'])
  countries = ', '.join(_bd.COUNTRY.get(c, c) for c in b['countries'])
  reps = ''.join(rlink(x, rel) for x in b['repairs'])
  probs = ''.join(plink(x, rel) for x in b['problems'])
  parts = ''.join(partcard(x, rel) for x in b['parts'][:12])
  spare = spare_for(b)
  same_make = [x for x in MAKES[b['make']] if x['id'] != b['id']][:8]
  same_cat = [x for x in BIKES if x['category'] == b['category'] and x['make'] != b['make'] and x['rich']][:8]
  srcs = [{'doc': 'Wikipedia: ' + b['title'], 'url': b['wikipedia']}] if b.get('wikipedia') else []
  seen = set()
  for v in sp.values():
    u = v.get('source') if isinstance(v, dict) else None
    if u and u not in seen and u != b.get('wikipedia'): seen.add(u); srcs.append({'doc': re.sub(r'^https?://(www\.)?', '', u).split('/')[0], 'url': u})
  for f in b['facts']:
    for u in f['sources']:
      if u not in seen: seen.add(u); srcs.append({'doc': 'Manufacturer: ' + re.sub(r'^https?://(www\.)?', '', u).split('/')[0], 'url': u})
  srcs += [{'doc': 'VehiclesDB motorcycle catalogue (identity)', 'url': x['url']} for x in b['sources'] if 'vehiclesdb' in x['url']][:1]
  cap = 'Photo: ' + e(b['photo'].get('credit', '')) if real and b['photo'].get('credit') else f'Illustration of a typical {e(b["cat_label"].lower())} motorcycle, not this exact model.'
  intro = e(b['summary']) if b['summary'] else f'The {e(b["title"])} is a {e(b["cat_label"].lower())} {"scooter" if b["category"] == "scooter" else "motorcycle"}. This page collects the checks, repairs and parts that matter most for this type of bike, with links to step-by-step guides.'
  html_ = f"""    <header class="r-head{' bk-head' if real else ''}">
      <div>
        <span class="ute-label">{e(b["make"])} · {e(b["cat_label"])}</span>
        <h1>{e(b["title"])}: repairs, problems and specs</h1>
        <p class="r-lead">{intro}</p>
        {f'<p class="r-meta"><span>Also called: {e(", ".join(b["aliases"]))}</span></p>' if b["aliases"] else ''}
        <p class="r-btns"><a class="r-btn" href="#top-repairs">Top repairs</a>{f'<a class="r-btn is-shop" href="{rel}{spare}">Spare parts for this bike →</a>' if spare else f'<a class="r-btn is-shop" href="{rel}parts/">Spare parts →</a>'}</p>
      </div>
      {f'<figure class="r-fig bk-fig"><img src="{src}" alt="{e(b["title"])}"><figcaption>{cap}</figcaption></figure>' if real else ''}
    </header>
    {f'<section class="bk-stats" aria-label="Key numbers">{stats}</section>' if stats else ''}
    {f'<p class="r-note bk-scope">Figures for the {e(b["spec_scope"])}. Other years and markets can differ; check your bike\'s manual.</p>' if stats and b["spec_scope"] else (f'<p class="r-note bk-scope">Figures for one version; other years and markets can differ. Check your bike\'s manual.</p>' if stats else '')}
    <div class="r-grid">
      <article class="r-body">
        {f'<h2>Good to know</h2><ul>{highs}</ul>' if highs else ''}
        {f'<h2>Manufacturer facts</h2><ul>{facts}</ul>' if facts else ''}
        {f'<h2>Specifications</h2><table class="bk-spec">{textspecs}</table>' if textspecs else ''}
        {f'<p><b>For repairs:</b> {e(b["notes"])}</p>' if b["notes"] else ''}
        <h2 id="top-repairs">Top repairs for the {e(b["title"])}</h2>
        <p>The jobs that keep a {e(b["cat_label"].lower())} bike like this safe and running, from rider checks to workshop jobs. These are routine maintenance and common checks for this type of bike, not a ranking of faults.</p>
        <ul class="r-list is-cols">{reps}</ul>
        <div class="r-callout"><b>Check your version first.</b> {e(b["check_first"].replace("These are not model-specific “most common failures”.", "").strip())} Use the values in your bike's manual.</div>
        {f'<h2>Problems to check on the {e(b["title"])}</h2><ul class="r-list">{probs}</ul>' if probs else ''}
        <p><a href="{rel}repair/diagnose/">Something else is wrong? Use the diagnostics tool →</a></p>
      </article>
      <aside class="r-side">
        <section><h2>Parts to know</h2><div class="rpcs">{parts}</div></section>
        {f'<section><h2>Where it is found</h2><p class="r-note">Registered in: {e(countries)}. From public registers; not a complete list of markets.</p></section>' if countries else ''}
      </aside>
    </div>
    {f'<section class="r-sec"><h2>More {e(b["make"])} bikes</h2>{bike_list(same_make, rel)}<p><a href="{rel}repair/bikes/{b["make_slug"]}/">All {e(b["make"])} bikes →</a></p></section>' if same_make else ''}
    {f'<section class="r-sec"><h2>Other {e(b["cat_plural"].lower())}</h2>{bike_list(same_cat, rel)}</section>' if same_cat else ''}
    <section class="r-sec">{sources_html(srcs)}<p class="r-note">Repair and part links are general guides for this type of bike; exact fitment is not verified. Text CC BY-SA 4.0, Transitions Lab.</p></section>"""
  desc = f'{b["title"]} repairs, common problems and key specs: {", ".join(REP[x]["title"].lower() for x in b["repairs"][:3])} and more, with step-by-step guides and parts.'
  ld = {"@context": "https://schema.org", "@type": "Thing", "name": b['title'], "description": b['summary'] or desc}
  page(path, f'{b["title"]}: repairs, problems and specs | Moto Zero', desc[:300], html_,
       [('Repair', 'repair/'), ('By bike', 'repair/bikes/'), (b['make'], f'repair/bikes/{b["make_slug"]}/'), (b['title'], path)], rel, extra_ld=ld, noindex=not b['rich'])
  if b['rich']: bike_urls.append(path)

for mk, bs in MAKES.items():
  rel = '../../../'
  path = f'repair/bikes/{bs[0]["make_slug"]}/'
  html_ = f"""    <header class="r-head"><span class="ute-label">Repair · By bike</span><h1>{e(mk)} motorcycle repairs and problems</h1>
      <p class="r-lead">{len(bs)} {e(mk)} models with their key numbers, top repairs and the problems to check. Pick your bike.</p></header>
    {''.join(f'<section class="r-sec"><h2>{e(_bd.CATEGORY[c][1])}</h2>{bike_list([b for b in bs if b["category"] == c], rel)}</section>' for c in cats_used if any(b["category"] == c for b in bs))}"""
  page(path, f'{mk} motorcycle repairs, problems and specs | Moto Zero', f'Repairs, common problems and key specs for {len(bs)} {mk} motorcycles and scooters, with step-by-step guides and parts.', html_,
       [('Repair', 'repair/'), ('By bike', 'repair/bikes/'), (mk, path)], rel)
  bike_urls.append(path)

rel = '../../'
html_ = f"""    <header class="r-head"><span class="ute-label">Repair · By bike</span><h1>Motorcycle repairs by bike model</h1>
      <p class="r-lead">{len(BIKES)} motorcycles and scooters from {len(MAKES)} makes. Find your bike for its key numbers, the top repairs for it and the problems to check first.</p>
      <div class="r-search bk-search"><input type="search" id="bk-q" placeholder="Search a bike, for example: Boxer, Activa, Duke" aria-label="Search bikes" autocomplete="off"></div>
      <div class="bk-filter" role="group" aria-label="Type of bike"><button type="button" class="is-on" data-c="">All</button>{''.join(f'<button type="button" data-c="{c}">{e(_bd.CATEGORY[c][0])}</button>' for c in cats_used)}</div>
    </header>
    <nav class="r-jump" aria-label="Makes">{''.join(f'<a href="{rel}repair/bikes/{bs[0]["make_slug"]}/">{e(mk)}</a>' for mk, bs in sorted(MAKES.items()))}</nav>
    {''.join(f'<section class="r-sec bk-mk" id="cat-{c}"><h2>{e(_bd.CATEGORY[c][1])} <small>{sum(1 for b in BIKES if b["category"] == c)}</small></h2>{bike_list([b for b in BIKES if b["category"] == c], rel)}</section>' for c in cats_used)}
    <p class="r-note bk-none" hidden>No bike matches. Try the make or a shorter name.</p>
    <script>
    (() => {{ const q = document.getElementById('bk-q'); let cat = '';
      const run = () => {{ const v = q.value.trim().toLowerCase(); let any = false;
        document.querySelectorAll('.bk-mk').forEach((s) => {{ let n = 0; s.querySelectorAll('.bk-list li').forEach((c) => {{ const ok = (!cat || c.dataset.cat === cat) && (!v || c.dataset.q.includes(v)); c.hidden = !ok; if (ok) n++; }}); s.hidden = !n; if (n) any = true; }});
        const none = document.querySelector('.bk-none'); if (none) none.hidden = any; }};
      q.addEventListener('input', run);
      document.querySelectorAll('.bk-filter button').forEach((b) => b.addEventListener('click', () => {{ cat = b.dataset.c; document.querySelectorAll('.bk-filter button').forEach((x) => x.classList.toggle('is-on', x === b)); run(); }}));
    }})();
    </script>"""
page('repair/bikes/', 'Motorcycle repairs by bike model: 500 bikes | Moto Zero', f'Find your motorcycle or scooter: key specs, top repairs and the problems to check for {len(BIKES)} models from {len(MAKES)} makes, with step-by-step guides.', html_,
     [('Repair', 'repair/'), ('By bike', 'repair/bikes/')], rel)
urls += ['repair/bikes/'] + bike_urls

# search index
idx = {'p': [[x['id'], x['title'], ' '.join(x.get('also_called', [])), SYS.get(x['system'], ''), x.get('urgency', ''), x['system'], x.get('repairs', [])[:3], x.get('parts', [])[:4]] for x in PROB.values()],
       's': SYS,
       'r': [[x['id'], x['title'], x.get('level', '')] for x in REP.values()],
       't': [[x['id'], x['name'], ' '.join(x.get('aliases', []))] for x in PART.values()]}
open(os.path.join(ROOT, 'assets/content/repair-index.js'), 'w', encoding='utf-8').write('/* Generated by source/repair/build_repair.py. */\nexport default ' + json.dumps(idx, ensure_ascii=False) + ';\n')

# sitemap
sm = os.path.join(ROOT, 'sitemap.xml'); s = open(sm, encoding='utf-8').read()
s = re.sub(r'\s*<url><loc>https://motobike-five\.vercel\.app/repair/[^<]*</loc>[^\n]*</url>', '', s)
s = s.replace('</urlset>', ''.join(f'\n  <url><loc>{SITE}/{u}</loc><lastmod>2026-11-02</lastmod></url>' for u in urls).lstrip('\n') + '\n</urlset>')
open(sm, 'w', encoding='utf-8').write(s)
print(f'problems {len(PROB)}, repairs {len(REP)}, parts {len(PART)}, systems {len(SYS)}; holding pages: ' + ', '.join(f'{k} {len(v)}' for k, v in missing.items() if v))
print('missing:', {k: v for k, v in missing.items() if v})
