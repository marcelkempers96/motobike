#!/usr/bin/env python3
"""Collect reusable photographs for the motorcycle types page from Wikimedia Commons.

For each type, searches Commons for its landmark models and typical examples, keeps
only CC0 / public domain / CC BY / CC BY-SA images of usable size, prefers side
views, and writes up to N candidates per type to source/types/photos/<type>/ with a
JSON metadata file each, plus manifest.csv and contact_sheet.html for review.

    python3 source/types/download_type_photos.py --contact you@example.org [--types superbike,touring] [--max 12]
"""
import argparse, csv, html, json, re, time
from pathlib import Path
import requests

API = "https://commons.wikimedia.org/w/api.php"
Q = {
  'pioneer': ['Hildebrand Wolfmüller motorcycle', 'Werner motocyclette', 'Daimler Reitwagen replica', 'De Dion-Bouton motor tricycle', 'veteran motorcycle 1903'],
  'vintage-vtwin': ['Indian Powerplus', 'Harley-Davidson Model J', 'Brough Superior SS100', 'Excelsior motorcycle 1915', 'vintage V-twin motorcycle 1920s'],
  'scooter': ['Vespa 98', 'Lambretta LD', 'Vespa scooter side view', 'Lambretta scooter', 'Honda PCX'],
  'step-through': ['Honda Super Cub C100', 'Honda Super Cub', 'Honda Wave 110', 'Yamaha Mate V50', 'underbone motorcycle'],
  'standard': ['Triumph Bonneville T120', 'Honda CB750 Four', 'Yamaha SR400', 'Honda CB125F', 'standard motorcycle side view'],
  'cafe-racer': ['Triton motorcycle', 'Norton Dominator 650SS', 'Triumph Thruxton', 'cafe racer motorcycle', 'café racer'],
  'motocross': ['CZ 250 motocross', 'Yamaha YZ250', 'KTM 250 SX', 'motocross bike side', 'Honda CR250'],
  'trials': ['Bultaco Sherpa', 'Montesa Cota 4RT', 'Beta Evo trial', 'trials motorcycle', 'Gas Gas TXT'],
  'cruiser': ['Harley-Davidson Panhead', 'Harley-Davidson Softail', 'Royal Enfield Meteor 350', 'chopper motorcycle', 'cruiser motorcycle side view'],
  'superbike': ['Honda CBR900RR', 'Suzuki GSX-R750', 'Honda CBR1000RR Fireblade', 'Yamaha YZF-R1', 'sport bike side view'],
  'touring': ['Honda Gold Wing GL1000', 'BMW R100RT', 'Honda Gold Wing GL1500', 'touring motorcycle', 'Harley-Davidson Electra Glide'],
  'adventure': ['BMW R80G/S', 'Honda XRV650 Africa Twin', 'BMW R 1250 GS', 'adventure motorcycle', 'KTM 790 Adventure'],
  'boda-boda': ['boda boda', 'boda boda Uganda', 'Bajaj Boxer', 'TVS HLX', 'motorcycle taxi Kenya'],
  'naked': ['Ducati Monster M900', 'Ducati Monster', 'Triumph Speed Triple', 'Kawasaki Z900', 'naked motorcycle'],
  'electric-motorcycle': ['Zero S electric motorcycle', 'Energica Ego', 'Harley-Davidson LiveWire', 'Zero Motorcycles', 'electric motorcycle'],
  'electric-scooter': ['NIU NQi', 'Gogoro Smartscooter', 'Gogoro', 'electric scooter moped', 'Ampersand electric motorcycle Rwanda'],
}
FREE = re.compile(r"^(cc0|public domain|pd\b|cc[ -]by(-sa)?([ -]\d(\.\d)?)?|attribution)", re.I)
NONFREE = re.compile(r"\b(nc|nd|non-?commercial|no ?deriv|fair use)\b", re.I)
BAD = re.compile(r"(engine|logo|badge|dashboard|interior|museum interior|poster|advert|map|diagram|drawing|stamp|crash|accident|detail|close-?up|cockpit|speedometer|tank emblem)", re.I)
SIDE = re.compile(r"(side|profile|left|right|seitenansicht|lateral)", re.I)

def strip(s): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()
def mv(em, k): return strip((em.get(k) or {}).get("value", ""))

def search(s, q, width, delay):
  p = {"action": "query", "format": "json", "formatversion": "2", "maxlag": "5", "generator": "search",
       "gsrsearch": f"{q} filetype:bitmap", "gsrnamespace": "6", "gsrlimit": "40", "prop": "imageinfo",
       "iiprop": "url|size|mime|extmetadata", "iiurlwidth": str(width)}
  for k in range(4):
    r = s.get(API, params=p, timeout=60)
    if r.status_code == 429 or "maxlag" in r.text[:200]: time.sleep(5 * (k + 1)); continue
    r.raise_for_status(); time.sleep(delay)
    return r.json().get("query", {}).get("pages", [])
  return []

def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("--contact", required=True); ap.add_argument("--out", default="source/types/photos")
  ap.add_argument("--types", default=""); ap.add_argument("--max", type=int, default=12)
  ap.add_argument("--width", type=int, default=1400); ap.add_argument("--delay", type=float, default=1.0)
  a = ap.parse_args()
  s = requests.Session(); s.headers["User-Agent"] = f"MotoZeroTypePhotos/1.0 (https://transitionslab.org; {a.contact})"
  out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
  rows = []
  for tid in [t for t in (a.types.split(",") if a.types else Q) if t in Q]:
    cands = {}
    for qi, q in enumerate(Q[tid]):
      try: pages = search(s, q, a.width, a.delay)
      except Exception as e: print("search failed", q, e); continue
      for pg in pages:
        t = pg.get("title"); ii = (pg.get("imageinfo") or [None])[0]
        if not t or not ii or t in cands: continue
        em = ii.get("extmetadata", {}); lic = mv(em, "LicenseShortName")
        if not lic or not FREE.match(lic) or NONFREE.search(lic): continue
        w, h = ii.get("width", 0), ii.get("height", 0)
        if w < 1000 or h == 0 or w / h < 1.15: continue           # landscape, usable size
        desc = mv(em, "ImageDescription")[:300]; cats = mv(em, "Categories")[:400]
        text = f"{t} {desc} {cats}"
        if BAD.search(t): continue
        words = [x.lower() for x in re.findall(r"[A-Za-z0-9]+", q) if len(x) > 2]
        hit = sum(1 for x in words if x in text.lower())
        if hit < max(1, len(words) - 1): continue
        score = hit * 2 + (3 if SIDE.search(text) else 0) + (2 if qi < 3 else 0) - (2 if mv(em, "Restrictions") else 0)
        cands[t] = {"type": tid, "file_title": t, "file_page_url": ii.get("descriptionurl", ""), "web_url": ii.get("thumburl", ""),
                    "width": w, "height": h, "licence": lic, "licence_url": mv(em, "LicenseUrl"), "author": mv(em, "Artist")[:160],
                    "description": desc, "restrictions": mv(em, "Restrictions"), "query": q, "score": score}
    best = sorted(cands.values(), key=lambda r: (-r["score"], -r["width"]))[:a.max]
    for n, r in enumerate(best, 1):
      ext = Path(r["web_url"].split("?")[0]).suffix.lower() or ".jpg"
      f = out / tid / f"{tid}-{n:02d}{ext}"; f.parent.mkdir(parents=True, exist_ok=True)
      try:
        im = s.get(r["web_url"], timeout=60); im.raise_for_status(); f.write_bytes(im.content); time.sleep(a.delay)
        r["local_file"] = f.as_posix()
      except Exception as e:
        print("download failed", r["file_title"], e); r["local_file"] = ""
      f.with_suffix(".json").write_text(json.dumps(r, indent=1, ensure_ascii=False), encoding="utf-8")
      rows.append(r)
    print(f"{tid}: {len(best)}", flush=True)
  if rows:
    with open(out / "manifest.csv", "w", newline="", encoding="utf-8") as fh:
      w = csv.DictWriter(fh, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
    page = ["<!doctype html><meta charset='utf-8'><style>body{font-family:Arial;margin:10px}div{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}figure{margin:0}img{width:100%;height:120px;object-fit:cover}figcaption{font-size:10px}</style>"]
    for tid in dict.fromkeys(r["type"] for r in rows):
      page.append(f"<h3>{tid}</h3><div>")
      for i, r in enumerate([x for x in rows if x["type"] == tid], 1):
        page.append(f"<figure><img src='{html.escape(Path(r['local_file']).relative_to(out).as_posix())}'><figcaption><b>{i}</b> {html.escape(r['file_title'][5:60])}</figcaption></figure>")
      page.append("</div>")
    (out / "contact_sheet.html").write_text("\n".join(page), encoding="utf-8")

if __name__ == "__main__":
  main()
