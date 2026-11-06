"""Bike records for the Repair > By bike pages.

Merges, per model id:
  bikes.json            the 500 profiles from the Global Motorcycle Bible (identity, category, links)
  research/batch-*.json facts and specs researched with a source URL per value
  wiki/<id>.json        Wikipedia infobox (fetched slowly by fetch_wiki.py), parsed here
  photos/<id>.jpg       a licensed photo, with photos/<id>.json for its credit (optional)
Never invents a number: a spec appears only when one of these sources gives it.
"""
import glob, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))

SPEC_ORDER = [  # key, label, unit
  ('displacement_cc', 'Engine', 'cc'), ('power_hp', 'Power', 'hp'), ('torque_nm', 'Torque', 'Nm'),
  ('weight_kg', 'Weight', 'kg'), ('fuel_l', 'Fuel tank', 'litres'), ('seat_mm', 'Seat height', 'mm'),
  ('top_speed_kmh', 'Top speed', 'km/h'), ('battery_kwh', 'Battery', 'kWh'), ('range_km', 'Range', 'km'),
]
TEXT_SPECS = [('years', 'Built'), ('engine', 'Engine type'), ('gearbox', 'Gearbox'), ('final_drive', 'Final drive'),
              ('fuel_system', 'Fuel system'), ('starting', 'Starting'), ('brakes', 'Brakes')]

CATEGORY = {  # editorial category -> (label, plural, generic render)
  'commuter': ('Commuter', 'Commuter motorcycles', 'bike_boda_boda'), 'street': ('Street', 'Street and naked bikes', 'bike_classic_4t'),
  'sport': ('Sport', 'Sport bikes', 'bike_superbike'), 'adventure': ('Adventure', 'Adventure and dual-sport bikes', 'bike_classic_4t'),
  'touring': ('Touring', 'Touring bikes', 'bike_classic_4t'), 'cruiser': ('Cruiser', 'Cruisers', 'bike_cafe_racer'),
  'scooter': ('Scooter', 'Scooters', 'bike_scooter'), 'underbone': ('Underbone', 'Underbones and step-throughs', 'bike_step_through'),
  'supermoto': ('Supermoto', 'Supermotos', 'bike_mx_2t'), 'electric': ('Electric', 'Electric motorcycles and scooters', 'bike_electric'),
  'offroad4': ('Off-road four-stroke', 'Off-road four-strokes', 'bike_mx_2t'), 'offroad2': ('Off-road two-stroke', 'Off-road two-strokes', 'bike_mx_2t'),
}
COUNTRY = {'AR': 'Argentina', 'AT': 'Austria', 'AU': 'Australia', 'BE': 'Belgium', 'BR': 'Brazil', 'CA': 'Canada', 'CH': 'Switzerland', 'CO': 'Colombia',
  'DE': 'Germany', 'DK': 'Denmark', 'ES': 'Spain', 'FI': 'Finland', 'FR': 'France', 'GB': 'United Kingdom', 'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel',
  'IN': 'India', 'IT': 'Italy', 'JP': 'Japan', 'KE': 'Kenya', 'LU': 'Luxembourg', 'MX': 'Mexico', 'MY': 'Malaysia', 'NG': 'Nigeria', 'NL': 'Netherlands',
  'NO': 'Norway', 'NZ': 'New Zealand', 'PH': 'Philippines', 'PL': 'Poland', 'PT': 'Portugal', 'SE': 'Sweden', 'TH': 'Thailand', 'TZ': 'Tanzania',
  'UA': 'Ukraine', 'UG': 'Uganda', 'US': 'United States', 'VN': 'Vietnam', 'ZA': 'South Africa'}

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

# ---------- Wikipedia infobox (light parser: only clear numbers with units) ----------
def _clean(v):
  v = re.sub(r'<ref[^>]*/>|<ref[^>]*>.*?</ref>', '', v, flags=re.S)
  v = re.sub(r'\{\{(?:convert|cvt)\|([\d.,]+)\|([^|}]+)[^}]*\}\}', r'\1 \2', v, flags=re.I)
  for _ in range(3): v = re.sub(r'\{\{[^{}]*\}\}', '', v)
  v = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]+)\]\]', r'\1', v)
  v = re.sub(r'<br\s*/?>', '; ', v); v = re.sub(r'<[^>]+>', '', v)
  return re.sub(r"'{2,}|&nbsp;", ' ', v).replace(' ', ' ').strip(' ;,')
def _num(s): return float(s.replace(',', ''))
def parse_wiki(rec):
  t = rec.get('wikitext') or ''
  m = re.search(r'\{\{\s*Infobox (?:motorcycle|automobile|motorcycle model)', t, re.I)
  if not m: return {}
  box = {}
  for line in t[m.start():].split('\n|')[1:]:
    if '=' not in line: continue
    k, v = line.split('=', 1); k = k.strip().lower().replace(' ', '_'); v = _clean(v.split('\n}}')[0])
    if v: box[k] = v
  src = rec.get('url') or ''
  out = {}
  def put(k, v): out[k] = {'value': v, 'source': src}
  if box.get('production'): put('years', re.sub(r'\s*[–—-]\s*', ' to ', box['production'].split(';')[0])[:40])
  eng = box.get('engine', '')
  mm = re.search(r'([\d,.]+)\s*(?:cc|cm3|cm³|cubic centimet)', eng, re.I)
  if mm and 40 <= _num(mm.group(1)) <= 2500: put('displacement_cc', round(_num(mm.group(1))))
  kind = re.search(r'((?:air|liquid|oil|water|air-oil)[- ]cooled[^;,(]*)', eng, re.I)
  if kind: put('engine', kind.group(1).strip()[:60])
  pw = box.get('power', '')
  hp = re.search(r'([\d.]+)\s*(?:hp|bhp|PS)\b', pw)
  kw = re.search(r'([\d.]+)\s*kW', pw)
  if hp: put('power_hp', _num(hp.group(1)))
  elif kw: put('power_hp', round(_num(kw.group(1)) * 1.341, 1))
  rp = re.search(r'@\s*([\d,]+)\s*rpm|at\s*([\d,]+)\s*rpm', pw)
  if rp and 'power_hp' in out: put('power_rpm', int(_num(rp.group(1) or rp.group(2))))
  tq = re.search(r'([\d.]+)\s*(?:N[·⋅.]?m|Nm|newton)', box.get('torque', ''), re.I)
  if tq: put('torque_nm', _num(tq.group(1)))
  for key in ('wet_weight', 'weight', 'dry_weight'):
    w = re.search(r'([\d.]+)\s*kg', box.get(key, ''))
    if w: put('weight_kg', _num(w.group(1))); out['weight_type'] = {'value': 'wet' if key == 'wet_weight' else 'dry' if key == 'dry_weight' else '', 'source': src}; break
  fu = re.search(r'([\d.]+)\s*(?:L|l|litres?|liters?)\b', box.get('fuel_capacity', ''))
  if fu: put('fuel_l', _num(fu.group(1)))
  se = re.search(r'([\d,]+)\s*mm', box.get('seat_height', ''))
  if se: put('seat_mm', int(_num(se.group(1))))
  ts = re.search(r'([\d,]+)\s*km/h', box.get('top_speed', ''))
  if ts: put('top_speed_kmh', int(_num(ts.group(1))))
  tr = box.get('transmission', '')
  g = re.search(r'(\d)[- ]speed', tr, re.I)
  if g: put('gearbox', f'{g.group(1)}-speed')
  if re.search(r'\bchain\b', tr, re.I): put('final_drive', 'chain')
  elif re.search(r'\bshaft\b', tr, re.I): put('final_drive', 'shaft')
  elif re.search(r'\bbelt\b', tr, re.I): put('final_drive', 'belt')
  if re.search(r'\bCVT\b|continuously variable', tr, re.I): put('gearbox', 'CVT automatic')
  return out

def load():
  bikes = json.load(open(os.path.join(HERE, 'bikes.json'), encoding='utf-8'))
  research = {}
  for f in sorted(glob.glob(os.path.join(HERE, 'research', 'batch-*.json'))):
    try:
      for r in json.load(open(f, encoding='utf-8')):
        if r.get('found'): research[r['id']] = r
    except Exception: pass
  for b in bikes:
    b['make_slug'] = slug(b['make'])
    r = research.get(b['id'], {})
    w = {}
    wf = os.path.join(HERE, 'wiki', b['id'] + '.json')
    if os.path.exists(wf):
      try: wrec = json.load(open(wf, encoding='utf-8')); w = parse_wiki(wrec); b['wikipedia'] = wrec.get('url') if w else None
      except Exception: w = {}
    specs = dict(w); specs.update({k: v for k, v in (r.get('specs') or {}).items() if isinstance(v, dict) and v.get('value') not in (None, '')})
    b['specs'] = specs
    b['spec_scope'] = r.get('spec_scope') or ''
    b['summary'] = r.get('summary') or ''
    b['highlights'] = [h for h in (r.get('highlights') or []) if isinstance(h, dict) and h.get('text')]
    b['notes'] = r.get('notes') or ''
    b['wikipedia'] = r.get('wikipedia') or b.get('wikipedia')
    b['ref_urls'] = [u for u in (r.get('sources') or []) if isinstance(u, str)]
    ph = os.path.join(HERE, 'photos', b['id'] + '.jpg')
    b['photo'] = None
    if os.path.exists(ph):
      meta = {}
      mf = os.path.join(HERE, 'photos', b['id'] + '.json')
      if os.path.exists(mf): meta = json.load(open(mf, encoding='utf-8'))
      b['photo'] = {'file': ph, **meta}
    b['cat_label'], b['cat_plural'], b['render'] = CATEGORY.get(b['category'], (b['category'].capitalize(), b['category'].capitalize(), 'bike_classic_4t'))
    b['rich'] = bool(b['summary'] or len([k for k, _, _ in SPEC_ORDER if k in specs]) >= 2 or b['facts'])
  return bikes
