#!/usr/bin/env python3
"""Build the Motopedia motorcycle types page, MD, JSON and asset folder."""
import base64, io, json, os, re, sys, urllib.parse, shutil
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from types_data import TYPES, FAMILIES

ROOT = "/home/claude/mc"
OUT = f"{ROOT}/web/types"
os.makedirs(f"{OUT}/plates", exist_ok=True)
os.makedirs(f"{OUT}/thumbs", exist_ok=True)
os.makedirs(f"{OUT}/media", exist_ok=True)

def plate_svg(pid):
    p = f"{ROOT}/figs/types/{pid}.svg" if pid.startswith("T") else f"{ROOT}/figs/{pid}.svg"
    return open(p, encoding="utf-8").read()

def plate_png(pid):
    return f"{ROOT}/figs/types/png/{pid}.png" if pid.startswith("T") else f"{ROOT}/figs/png/{pid}.png"

def flat(path, bg=(255, 255, 255)):
    im = Image.open(path).convert("RGBA")
    b = Image.new("RGBA", im.size, bg + (255,)); b.alpha_composite(im)
    return b.convert("RGB")

def jpeg_uri(im, w, q=82, save_as=None):
    im = im.copy(); im.thumbnail((w, w * 2))
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
    if save_as: open(save_as, "wb").write(buf.getvalue())
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

def filepath_url(title, width=1600):
    name = title.replace("File:", "", 1).replace(" ", "_")
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(name)}?width={width}"

photos = json.load(open(f"{OUT}/photos.json"))

def photo_entry(key, label=None):
    p = photos.get(key)
    if not p or not p.get("title"): return None
    return dict(src=filepath_url(p["title"]), page=p["file_page"], subject=p.get("subject") or p["title"],
                author=p.get("author") or "see file page", licence=p.get("licence") or "licence on file page",
                licence_url=p.get("licence_url") or p["file_page"], verified=bool(p.get("verified")), label=label,
                title=p["title"])

MEDIA, plates_html = {}, []
for t in TYPES:
    pid = t["plate"]
    m = {}
    m["thumb"] = jpeg_uri(flat(plate_png(pid)), 720, save_as=f"{OUT}/thumbs/{t['id']}.jpg")
    shutil.copy(plate_png(pid), f"{OUT}/plates/{pid}.png")
    svg = plate_svg(pid)
    open(f"{OUT}/plates/{pid}.svg", "w").write(svg)
    svg_inline = re.sub(r"^<\?xml[^>]*>\s*", "", svg)
    plates_html.append(f'<template id="plate-{pid}">{svg_inline}</template>')
    m["photo"] = photo_entry(t["id"])
    if t["id"] == "superbike":
        m["photo2"] = photo_entry("superbike-classic", "Honda CB750, 1969")
    if t.get("own_photo"):
        f, cap, cred = t["own_photo"]
        m["own"] = dict(src=jpeg_uri(flat(f"{ROOT}/photos/{f}"), 1400, save_as=f"{OUT}/media/{t['id']}-workshop.jpg"), caption=cap, credit=cred)
    if t.get("render"):
        f, cap = t["render"]
        m["render"] = dict(src=jpeg_uri(flat(f"{ROOT}/photos/{f}", (242, 241, 236)), 1400, save_as=f"{OUT}/media/{t['id']}-render.jpg"), caption=cap, credit="Render: Transitions Lab, CC BY-SA 4.0")
    MEDIA[t["id"]] = m

tpl = open(f"{OUT}/src/template.html", encoding="utf-8").read()
page = (tpl.replace("/*TYPES*/", json.dumps(TYPES, ensure_ascii=False))
           .replace("/*FAMILIES*/", json.dumps(FAMILIES, ensure_ascii=False))
           .replace("/*MEDIA*/", json.dumps(MEDIA, ensure_ascii=False))
           .replace("<!--PLATES-->", "\n".join(plates_html)))
open(f"{OUT}/motorcycle-types.artifact.html", "w").write(page)
site = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + page.replace("<!--BODY-->", "</head>\n<body>", 1) + "\n</body>\n</html>\n")
open(f"{OUT}/motorcycle-types.html", "w").write(site)

# data JSON for the site
out = []
for i, t in enumerate(TYPES):
    m = MEDIA[t["id"]]
    d = {k: v for k, v in t.items() if k not in ("own_photo", "render")}
    d["order"] = i + 1
    d["plate_svg"] = f"plates/{t['plate']}.svg"; d["plate_png"] = f"plates/{t['plate']}.png"
    d["thumb"] = f"thumbs/{t['id']}.jpg"
    for k in ("photo", "photo2"):
        if m.get(k): d[k] = {x: m[k][x] for x in ("title", "src", "page", "subject", "author", "licence", "licence_url", "verified")}
    if m.get("own"): d["workshop_photo"] = {"file": f"media/{t['id']}-workshop.jpg", "caption": m["own"]["caption"], "credit": m["own"]["credit"]}
    if m.get("render"): d["render"] = {"file": f"media/{t['id']}-render.jpg", "caption": m["render"]["caption"], "credit": m["render"]["credit"]}
    out.append(d)
json.dump({"families": FAMILIES, "types": out}, open(f"{OUT}/motorcycle-types.json", "w"), indent=1, ensure_ascii=False)

# ---------------- Markdown page
L = ["---", 'title: "Motorcycle types"',
     'description: "Sixteen kinds of motorcycle from the 1885 Reitwagen to the electric boda boda, with photographs, labelled plates, history and the parts that define each type. Part of Motopedia by Transitions Lab."',
     "---", "", "# Motorcycle types", "",
     "From Daimler's wooden **Reitwagen** of 1885 to the battery-swapping **e-boda**, motorcycles have been reshaped again and again by roads, money, sport and fuel. Each of the sixteen types below has a photograph, a labelled plate of the parts that define it, its typical figures and the story of how it came to be. The order follows the story rather than strict dates, and each entry ends with what came next.", "",
     "[Open the interactive version](/moto-zero/types) to browse the types on a timeline, filter by family and open each one full screen.", "",
     "## Timeline", "", "| Year | Type | Family | Era |", "|---|---|---|---|"]
for t in sorted(TYPES, key=lambda x: x["start"]):
    L.append(f"| {t['start']} | [{t['name']}](#{t['id']}) | {FAMILIES[t['family']]} | {t['era']} |")
L.append("")
for i, t in enumerate(TYPES):
    m = MEDIA[t["id"]]
    L += [f'<a id="{t["id"]}"></a>', f"## {i + 1:02d}. {t['name']}", "", f"*{t['era']} · {FAMILIES[t['family']]}*", "", f"**{t['tagline']}**", ""]
    if m.get("photo"):
        p = m["photo"]
        L += [f"![{p['subject']}]({p['src']})", f"*{p['subject']}. Photo via [Wikimedia Commons]({p['page']}); author and licence on the file page.*", ""]
    elif m.get("own"):
        L += [f"![{m['own']['caption']}](/moto-zero/types/media/{t['id']}-workshop.jpg)", f"*{m['own']['caption']} {m['own']['credit']}.*", ""]
    L += [f"![Plate {t['plate']}: {t['name']}, side elevation with the defining parts labelled](/moto-zero/types/plates/{t['plate']}.svg)",
          f"*Plate {t['plate']}. {t['name']}, side elevation with the defining parts labelled.*", ""]
    L += t["history"][:1] + [""] + t["history"][1:] + [""]
    if m.get("photo2"):
        p = m["photo2"]
        L += [f"![{p['subject']}]({p['src']})", f"*{p['subject']}. Photo via [Wikimedia Commons]({p['page']}); author and licence on the file page.*", ""]
    if m.get("render"):
        L += [f"![{m['render']['caption']}](/moto-zero/types/media/{t['id']}-render.jpg)", f"*{m['render']['caption']} {m['render']['credit']}.*", ""]
    if m.get("own") and m.get("photo"):
        L += [f"![{m['own']['caption']}](/moto-zero/types/media/{t['id']}-workshop.jpg)", f"*{m['own']['caption']} {m['own']['credit']}.*", ""]
    L += ["**What defines it**", ""] + [f"- {b}" for b in t["built"]] + [""]
    L += ["| Typical figures | |", "|---|---|"] + [f"| {k} | {v} |" for k, v in t["specs"].items()] + [""]
    L += [f"**Landmark models:** {', '.join(t['models'])}.", "", f"**Where you see it:** {t['where']}", ""]
    if t.get("module"): L += [f"**In the course:** {t['module']}.", ""]
    L += [f"**What came next.** {t['next']}", ""]
L += ["## About this page", "",
      "Plates F01 to F04 come from Module 1 of the course; plates T01 to T12 were drawn for this page in the same style. Figures are typical ranges for each type, not the specification of any one model. Text and plates are released under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) by **Transitions Lab, Motopedia**. Photographs are from Wikimedia Commons under the licence on each file page, or from the Transitions Lab collection.", "",
      "Download the course PDFs, 3D models and interactive tools at [transitionslab.org/motorcycle-anatomy](https://www.transitionslab.org/motorcycle-anatomy). Questions or corrections: marcel@transitionslab.org", ""]
open(f"{OUT}/motorcycle-types.md", "w").write("\n".join(L))
print("ok", len(page) // 1024, "KB")
