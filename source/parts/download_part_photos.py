#!/usr/bin/env python3
"""Moto Zero part photo harvester (Wikimedia Commons, reusable licences only).

Searches Wikimedia Commons for every part type in the Moto Zero parts catalogue,
reads each file's licence, author and description from the Commons API, keeps
only CC0 / public domain / CC BY / CC BY-SA images, downloads a 1200 px web copy
(and optionally the original), and writes:

    images/<part_id>/<part_id>-<nn>.<ext>        web copy (or original with --originals)
    images/<part_id>/<part_id>-<nn>.json         full metadata + required credit line
    images/manifest.csv  (+ manifest.xlsx)       one row per photo, for Sheets / the site build
    images/ATTRIBUTIONS.md                       credit lines grouped by part
    images/contact_sheet.html                    visual review page, open in a browser

Usage (from Claude Code or any terminal):
    pip install requests openpyxl
    python download_part_photos.py --contact you@example.org
    python download_part_photos.py --contact you@example.org --parts brake-pads,drive-belt --max-per-part 40
    python download_part_photos.py --contact you@example.org --dry-run      # metadata only, no images
"""
import argparse, csv, html, json, re, sys, time
from pathlib import Path

import requests

API = "https://commons.wikimedia.org/w/api.php"

# part_id -> (repair guide slug, search queries, words that must appear in title/description/categories)
PARTS = {
 "chain-sprocket-kit": ("chain-and-sprocket-replacement",
    ["motorcycle chain sprocket", "motorcycle drive chain", "motorcycle rear sprocket", "Motorradkette Kettenrad"],
    ["chain", "sprocket", "kette", "ritzel", "kettenrad"]),
 "drive-belt": ("cvt-drive-belt-replacement",
    ["scooter CVT belt", "scooter variator belt", "scooter drive belt", "continuously variable transmission scooter"],
    ["belt", "cvt", "variator", "keilriemen", "variomatic"]),
 "roller-weights": ("cvt-variator-service",
    ["scooter variator rollers", "variator roller weights", "scooter variator", "Variomatik Rollen"],
    ["variator", "roller", "variomatik", "rollen"]),
 "cvt-clutch-shoes": ("cvt-clutch-service",
    ["scooter centrifugal clutch", "scooter clutch shoes", "Fliehkraftkupplung Roller"],
    ["clutch", "fliehkraft", "kupplung"]),
 "gear-oil": ("scooter-gear-oil-change",
    ["scooter final drive gear", "scooter transmission oil", "scooter rear hub gearbox"],
    ["gear", "oil", "transmission", "getriebe"]),
 "clutch-plates": ("clutch-plate-replacement",
    ["motorcycle clutch plates", "motorcycle clutch", "clutch friction plates", "Motorrad Kupplung Lamellen"],
    ["clutch", "kupplung", "lamelle"]),
 "brake-pads": ("brake-pad-replacement",
    ["motorcycle brake pads", "motorcycle brake caliper", "motorcycle disc brake", "Motorrad Bremsbeläge"],
    ["brake", "caliper", "pad", "brems"]),
 "brake-shoes": ("drum-brake-shoe-replacement",
    ["drum brake shoes", "motorcycle drum brake", "drum brake", "Trommelbremse Motorrad"],
    ["drum", "shoe", "trommel", "brake"]),
 "brake-disc": ("brake-disc-replacement",
    ["motorcycle brake disc", "motorcycle brake rotor", "wave brake disc motorcycle", "Bremsscheibe Motorrad"],
    ["disc", "disk", "rotor", "scheibe"]),
 "spark-plug": ("spark-plug-replacement",
    ["spark plug", "spark plugs", "used spark plug", "Zündkerze"],
    ["spark", "plug", "zündkerze", "zuendkerze"]),
 "air-filter": ("air-filter-service",
    ["motorcycle air filter", "air filter element", "motorcycle air box", "Luftfilter Motorrad"],
    ["air filter", "air cleaner", "airbox", "air box", "luftfilter"]),
 "oil-filter": ("oil-and-filter-change",
    ["motorcycle oil filter", "oil filter", "Ölfilter Motorrad"],
    ["oil filter", "ölfilter", "oelfilter"]),
 "engine-oil": ("oil-and-filter-change",
    ["motorcycle oil change", "motorcycle engine oil", "oil sight glass motorcycle", "Ölwechsel Motorrad"],
    ["oil", "öl", "oel"]),
 "battery": ("battery-replacement",
    ["motorcycle battery", "12V motorcycle battery", "Motorradbatterie"],
    ["battery", "batterie", "akku"]),
 "tyres": ("tyre-and-tube-replacement",
    ["motorcycle tyre", "motorcycle tire tread", "motorcycle inner tube", "Motorradreifen"],
    ["tyre", "tire", "tube", "reifen", "tread"]),
 "clutch-cable": ("cable-replacement",
    ["motorcycle clutch cable", "motorcycle clutch lever cable", "Kupplungszug"],
    ["clutch", "cable", "kupplungszug"]),
 "throttle-cable": ("cable-replacement",
    ["motorcycle throttle cable", "motorcycle twist grip throttle", "Gaszug Motorrad"],
    ["throttle", "twist grip", "gaszug", "cable"]),
 "levers": ("lever-replacement",
    ["motorcycle brake lever", "motorcycle clutch lever", "motorcycle handlebar controls"],
    ["lever", "hebel", "handlebar"]),
 "mirrors": ("mirror-replacement",
    ["motorcycle mirror", "motorcycle rear view mirror", "scooter mirror"],
    ["mirror", "spiegel"]),
 "headlight": ("headlight-bulb-replacement",
    ["motorcycle headlight", "motorcycle headlamp", "H4 bulb", "Motorrad Scheinwerfer"],
    ["headlight", "headlamp", "bulb", "scheinwerfer", "lamp"]),
 "fork-seals": ("fork-seal-replacement",
    ["motorcycle front fork", "motorcycle fork seal", "telescopic fork motorcycle", "Gabel Motorrad"],
    ["fork", "gabel", "seal", "stanchion"]),
 "rear-shock": ("rear-shock-replacement",
    ["motorcycle rear shock absorber", "motorcycle monoshock", "motorcycle rear suspension", "Federbein Motorrad"],
    ["shock", "suspension", "federbein", "damper"]),
 "wheel-bearings": ("wheel-bearing-replacement",
    ["motorcycle wheel bearing", "ball bearing", "motorcycle wheel hub"],
    ["bearing", "hub", "lager", "nabe"]),
 "regulator-rectifier": ("charging-system-diagnosis",
    ["motorcycle regulator rectifier", "motorcycle voltage regulator", "motorcycle stator"],
    ["regulator", "rectifier", "stator", "regler"]),
 "final-drive-belt": ("final-drive-belt-replacement",
    ["motorcycle belt drive", "Harley-Davidson belt drive", "motorcycle toothed belt"],
    ["belt", "zahnriemen"]),
 "final-drive-oil": ("shaft-final-drive-service",
    ["motorcycle shaft drive", "BMW motorcycle final drive", "Kardan Motorrad"],
    ["shaft", "final drive", "kardan", "drive"]),
 "ev-controller": ("ev-controller-diagnosis",
    ["electric scooter motor controller", "electric motorcycle controller", "e-bike controller"],
    ["controller", "inverter", "steuer"]),
 "ev-charger": ("ev-charging-system",
    ["electric motorcycle charging", "electric scooter charger", "battery swap station motorcycle"],
    ["charg", "swap", "lade"]),
}

CONTEXT = ["motorcycle", "motorbike", "motor bike", "scooter", "moped", "motorrad", "roller",
           "boda", "honda", "yamaha", "suzuki", "kawasaki", "bajaj", "tvs", "hero", "vespa",
           "harley", "bmw", "ducati", "ktm", "triumph", "royal enfield", "electric"]

FREE = re.compile(r"^(cc0|public domain|pd\b|cc[ -]by(-sa)?([ -]\d(\.\d)?)?|attribution|gfdl)", re.I)
NONFREE = re.compile(r"\b(nc|nd|non-?commercial|no ?deriv|fair use)\b", re.I)


def strip(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def meta_val(em, key):
    return strip((em.get(key) or {}).get("value", ""))


def licence_ok(lic):
    return bool(lic) and bool(FREE.match(lic)) and not NONFREE.search(lic)


def relevance(part_id, title, desc, cats):
    text = f"{title} {desc} {cats}".lower()
    keys = PARTS[part_id][2]
    hit = sum(1 for k in keys if k in text)
    ctx = sum(1 for k in CONTEXT if k in text)
    return hit, ctx


def credit_line(r):
    if re.match(r"^(cc0|public domain|pd\b)", r["licence"], re.I):
        return f"Photo: {r['author'] or 'unknown author'}, {r['licence']}, via Wikimedia Commons ({r['file_page_url']})"
    return (f"Photo: {r['author'] or 'unknown author'}, {r['licence']} ({r['licence_url']}), "
            f"via Wikimedia Commons ({r['file_page_url']})")


def search(session, query, width, limit, delay):
    params = {"action": "query", "format": "json", "formatversion": "2", "maxlag": "5",
              "generator": "search", "gsrsearch": f"{query} filetype:bitmap", "gsrnamespace": "6",
              "gsrlimit": str(limit), "prop": "imageinfo",
              "iiprop": "url|size|mime|extmetadata", "iiurlwidth": str(width)}
    for attempt in range(8):
        r = session.get(API, params=params, timeout=60)
        if r.status_code == 429 or "maxlag" in r.text[:200]:
            wait = int(r.headers.get("Retry-After", "0") or 0) or 30 * (attempt + 1)
            print(f"rate limited, waiting {wait}s", flush=True); time.sleep(wait); continue
        r.raise_for_status()
        time.sleep(delay)
        return r.json().get("query", {}).get("pages", [])
    return []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--contact", required=True, help="email or URL for the User-Agent (Wikimedia policy)")
    ap.add_argument("--out", default="images")
    ap.add_argument("--parts", default="", help="comma-separated part IDs; default all")
    ap.add_argument("--max-per-part", type=int, default=25)
    ap.add_argument("--min-width", type=int, default=800)
    ap.add_argument("--width", type=int, default=1200, help="web copy width")
    ap.add_argument("--originals", action="store_true", help="also download full-resolution originals")
    ap.add_argument("--loose", action="store_true", help="keep images without motorcycle context words")
    ap.add_argument("--dry-run", action="store_true", help="metadata and manifest only")
    ap.add_argument("--delay", type=float, default=1.0)
    a = ap.parse_args()

    s = requests.Session()
    s.headers["User-Agent"] = f"MotoZeroPartPhotos/1.1 (https://transitionslab.org; {a.contact})"
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    wanted = [p for p in (a.parts.split(",") if a.parts else PARTS) if p in PARTS]
    seen, rows = set(), []

    for pid in wanted:
        repair, queries, _ = PARTS[pid]
        cands = {}
        for q in queries:
            try:
                pages = search(s, q, a.width, 50, a.delay)
            except Exception as e:
                print(f"search failed '{q}': {e}"); continue
            for pg in pages:
                t = pg.get("title")
                if not t or t in seen or t in cands or not pg.get("imageinfo"):
                    continue
                ii = pg["imageinfo"][0]; em = ii.get("extmetadata", {})
                lic = meta_val(em, "LicenseShortName")
                if not licence_ok(lic) or ii.get("width", 0) < a.min_width:
                    continue
                desc = meta_val(em, "ImageDescription")[:300]
                cats = meta_val(em, "Categories")
                hit, ctx = relevance(pid, t, desc, cats)
                if hit == 0 or (ctx == 0 and not a.loose):
                    continue
                cands[t] = {
                    "part_id": pid, "repair_slug": repair, "file_title": t,
                    "file_page_url": ii.get("descriptionurl", ""),
                    "original_url": ii.get("url", ""), "web_url": ii.get("thumburl", ""),
                    "width": ii.get("width"), "height": ii.get("height"), "mime": ii.get("mime", ""),
                    "licence": lic, "licence_url": meta_val(em, "LicenseUrl"),
                    "author": meta_val(em, "Artist")[:200], "credit": meta_val(em, "Credit")[:200],
                    "description": desc, "date": meta_val(em, "DateTimeOriginal")[:40],
                    "categories": cats[:300], "restrictions": meta_val(em, "Restrictions"),
                    "relevance": hit * 2 + min(ctx, 3), "search_query": q,
                }
        best = sorted(cands.values(), key=lambda r: (-r["relevance"], -(r["width"] or 0)))[:a.max_per_part]
        for n, r in enumerate(best, 1):
            seen.add(r["file_title"])
            r["credit_line"] = credit_line(r)
            r["alt_text"] = f"{pid.replace('-', ' ')}: {r['description'][:110] or r['file_title'][5:]}"
            base = out / pid / f"{pid}-{n:02d}"
            base.parent.mkdir(parents=True, exist_ok=True)
            ext = Path(r["web_url"].split("?")[0]).suffix.lower() or ".jpg"
            r["local_file"] = str(base.with_suffix(ext))
            if not a.dry_run:
                try:
                    img = s.get(r["web_url"] or r["original_url"], timeout=60); img.raise_for_status()
                    base.with_suffix(ext).write_bytes(img.content)
                    if a.originals and r["original_url"]:
                        o = s.get(r["original_url"], timeout=120); o.raise_for_status()
                        osuf = Path(r["original_url"]).suffix.lower()
                        (base.parent / f"{base.name}-original{osuf}").write_bytes(o.content)
                    time.sleep(a.delay)
                except Exception as e:
                    print(f"download failed {r['file_title']}: {e}"); r["local_file"] = ""
            base.with_suffix(".json").write_text(json.dumps(r, indent=2, ensure_ascii=False), encoding="utf-8")
            rows.append(r)
        print(f"{pid}: {len(best)} photos")

    if not rows:
        print("No photos found."); sys.exit(1)
    cols = list(rows[0].keys())
    with open(out / "manifest.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=cols); w.writeheader(); w.writerows(rows)
    try:
        import openpyxl
        wb = openpyxl.Workbook(); ws = wb.active; ws.title = "Photos"
        ws.append(cols)
        for r in rows:
            ws.append([r.get(c) for c in cols])
        ws.freeze_panes = "A2"; wb.save(out / "manifest.xlsx")
    except ImportError:
        pass

    by_part = {}
    for r in rows:
        by_part.setdefault(r["part_id"], []).append(r)
    md = ["# Photo attributions", "",
          "Show the credit line next to each photo (caption, hover or a linked credits page). "
          "Edited CC BY-SA photos must be shared under CC BY-SA.", ""]
    page = ["<!doctype html><meta charset='utf-8'><title>Part photos</title>",
            "<style>body{font-family:Arial;margin:16px}div.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}"
            "figure{margin:0;border:1px solid #ddd;padding:6px}img{width:100%;height:160px;object-fit:cover}"
            "figcaption{font-size:11px;line-height:1.3}</style>"]
    for pid, rs in by_part.items():
        md += [f"## {pid}", ""] + [f"- `{Path(r['local_file']).name or r['file_title']}`: {r['credit_line']}" for r in rs] + [""]
        page.append(f"<h2>{pid} ({len(rs)})</h2><div class='g'>")
        for r in rs:
            src = Path(r["local_file"]).relative_to(out).as_posix() if r["local_file"] else r["web_url"]
            page.append(f"<figure><a href='{html.escape(r['file_page_url'])}'><img src='{html.escape(src)}' loading='lazy'></a>"
                        f"<figcaption><b>{html.escape(r['file_title'][5:])}</b><br>{html.escape(r['licence'])} · "
                        f"{html.escape(r['author'][:60])}<br>{html.escape(r['description'][:120])}</figcaption></figure>")
        page.append("</div>")
    (out / "ATTRIBUTIONS.md").write_text("\n".join(md), encoding="utf-8")
    (out / "contact_sheet.html").write_text("\n".join(page), encoding="utf-8")
    print(f"\n{len(rows)} photos across {len(by_part)} parts. Review {out/'contact_sheet.html'}")


if __name__ == "__main__":
    main()
