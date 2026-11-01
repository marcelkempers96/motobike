#!/usr/bin/env python3
"""Build the Moto Zero Wiring Lab: interactive SVGs, data JSON and the HTML page."""
import json, re, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import data as D

ROOT = "/home/claude/mc"
OUT = f"{ROOT}/web/wiring"
os.makedirs(f"{OUT}/svg", exist_ok=True)

def rd(p): return open(p, encoding="utf-8").read()

def mark(svg, d, seg, n=1, extra_cls="seg", cls_new=None):
    """Tag the n-th path whose d equals `d` with class seg + data-seg."""
    key = f'd="{d}"'
    idx = -1
    for _ in range(n):
        idx = svg.find(key, idx + 1)
        if idx < 0:
            raise SystemExit(f"not found: {d} ({seg})")
    start = svg.rfind("<path", 0, idx)
    end = svg.find(">", idx)
    tag = svg[start:end + 1]
    m = re.search(r'class="([^"]*)"', tag)
    cls = (cls_new or (m.group(1) if m else "")) + " " + extra_cls
    if m:
        new = tag.replace(m.group(0), f'class="{cls.strip()}" data-seg="{seg}"', 1)
    else:
        new = tag.replace("<path", f'<path class="{cls.strip()}" data-seg="{seg}"', 1)
    return svg[:start] + new + svg[end + 1:]

def rep(svg, old, new, n=1):
    if svg.count(old) < n:
        raise SystemExit(f"missing: {old[:80]}")
    return svg.replace(old, new, n)

def hot_rect(k, x, y, w, h, sw=None):
    a = f' data-sw="{sw}"' if sw else ""
    return f'<rect class="hot" data-k="{k}"{a} x="{x}" y="{y}" width="{w}" height="{h}" rx="6"/>'

def hot_circ(k, cx, cy, r):
    return f'<circle class="hot" data-k="{k}" cx="{cx}" cy="{cy}" r="{r}"/>'

def drop_arrows(svg, pfx):
    return re.sub(rf'<use xlink:href="#{pfx}-arr"[^>]*/>\n?', "", svg)

# ------------------------------------------------------------------ F23 starting
def build_f23():
    L = rd(f"{ROOT}/figs/F23.svg").split("\n")
    # 1-indexed line wraps (done before any other edit)
    def wrap(a, b, open_tag):
        L[a - 1] = open_tag + L[a - 1]
        L[b - 1] = L[b - 1] + "</g>"
    wrap(75, 77, '<g id="relayArm">')
    wrap(195, 196, '<g class="gear" id="gRedA">')
    wrap(197, 203, '<g class="gear" id="gDrv">')
    wrap(204, 205, '<g class="gear" id="gRedB">')
    wrap(206, 207, '<g class="gear" id="gPin">')
    s = "\n".join(L)
    s = rep(s, '<path class="d" d="M1140,228 V292', '<path class="d" id="armHatch" d="M1140,228 V292')
    s = drop_arrows(s, "f23")
    s = mark(s, "M100,286 V120 H300", "feed")
    s = mark(s, "M300,120 H360", "feed")
    s = rep(s, '<path class="hv" d="M360,120 H760 V158"/>',
            '<path class="hv seg" data-seg="feed" d="M360,120 H420"/><path class="hv seg" data-seg="heavyB" d="M420,120 H760 V158"/>')
    s = mark(s, "M880,158 V120 H1180 V160", "heavyM")
    s = mark(s, "M192,286 V270 H270 V470", "earthB")
    s = mark(s, "M1083,350 V380", "earthM")
    for d, k in [("M420,120 V520 H440", "ctl1"), ("M484,520 H510", "ctl2"), ("M556,520 H590", "ctl3"),
                 ("M634,520 H660", "ctl4"), ("M704,520 H785 V422", "ctl5"), ("M855,422 V620", "coilret"),
                 ("M855,620 H900", "neu1"), ("M921,620 H960", "neu2"), ("M1004,620 H1040 V650", "neu3"),
                 ("M855,620 V740 H880", "cl1"), ("M924,740 H960", "cl2"), ("M1004,740 H1040 V770", "cl3")]:
        s = mark(s, d, k)
    # switches become live groups
    def sw(x, y, key):
        return (f'<g class="swg" data-sw="{key}" transform="translate({x},{y})">'
                f'<circle cx="4" cy="0" r="4"/><circle cx="40" cy="0" r="4"/>'
                f'<path class="blade" d="M7,-3 L38,-20"/></g>')
    for x, y, k in [(440, 520, "ign"), (590, 520, "stop"), (960, 620, "neutral"), (880, 740, "clutch"), (960, 740, "stand")]:
        s = rep(s, f'<use xlink:href="#f23-sw" x="{x}" y="{y}"/>', sw(x, y, k))
    s = rep(s, '<use xlink:href="#f23-pb" x="660" y="520"/>',
            '<g class="swg" data-sw="start" transform="translate(660,520)"><circle cx="4" cy="0" r="4"/><circle cx="40" cy="0" r="4"/>'
            '<g class="pbcap"><path d="M2,-12 H42 M22,-12 V-28 M14,-28 H30" fill="none"/></g></g>')
    s = rep(s, '<use xlink:href="#f23-fuse" x="510" y="520"/>', '<rect id="fuse10" x="510" y="510" width="46" height="20" rx="2" fill="#FFFFFF" stroke="#1E2B5E" stroke-width="2"/>')
    hots = [hot_rect("battery", 46, 280, 200, 166), hot_rect("mainfuse", 294, 100, 72, 40),
            hot_rect("relay", 696, 140, 250, 290), hot_rect("motor", 1008, 160, 424, 196),
            hot_rect("ign", 432, 488, 60, 44, "ign"), hot_rect("fuse10", 504, 504, 58, 32),
            hot_rect("stop", 582, 488, 60, 44, "stop"), hot_rect("start", 652, 484, 60, 48, "start"),
            hot_rect("diode", 894, 600, 34, 40), hot_rect("neutral", 952, 588, 60, 44, "neutral"),
            hot_rect("clutch", 872, 708, 60, 44, "clutch"), hot_rect("stand", 952, 708, 60, 44, "stand"),
            hot_rect("sclutch", 1236, 570, 330, 290)]
    s = rep(s, "</svg>", '<g class="hots">' + "".join(hots) + "</g>\n</svg>")
    return s

# ------------------------------------------------------------------ F21 charging
def build_f21():
    L = rd(f"{ROOT}/figs/F21.svg").split("\n")
    a = next(i for i, l in enumerate(L) if l.strip() == '<circle class="o" r="180"/>')
    b = next(i for i, l in enumerate(L) if 'f21-magn" transform="rotate(330)"' in l)
    L[a] = '<g id="rotor21">' + L[a]
    L[b] = L[b] + "</g>"
    s = "\n".join(L)
    s = drop_arrows(s, "f21")
    s = rep(s, '<path class="wa" d="M1300,740 H1350"/>', "")
    s = rep(s, '<text x="1366" y="745">Charging current (DC)</text>', "")
    for d, k in [("M560,394 H580 V340 H794 a6,6 0 0 1 12,0 H904 a6,6 0 0 1 12,0 H1020", "phU"),
                 ("M568,400 H794 a6,6 0 0 1 12,0 H910", "phV"), ("M560,406 H580 V460 H800", "phW"),
                 ("M800,250 H1234", "posRail"), ("M800,584 H1234", "negRail"),
                 ("M800,250 V275 M800,305 V334 M800,346 V394 M800,406 V530 M800,560 V584", "col1"),
                 ("M910,250 V275 M910,305 V334 M910,346 V530 M910,560 V584", "col2"),
                 ("M1020,250 V275 M1020,305 V530 M1020,560 V584", "col3"),
                 ("M800,500 H846 V530 M846,560 V584", "shunt1"), ("M910,500 H956 V530 M956,560 V584", "shunt2"),
                 ("M1020,500 H1066 V530 M1066,560 V584", "shunt3"), ("M1150,250 V340 M1150,440 V584", "sense"),
                 ("M1234,584 H1290 V660", "regE"), ("M1234,250 H1300", "out1"), ("M1300,250 H1354", "out2"),
                 ("M1354,250 H1400", "out3"), ("M1400,250 V470", "batt"), ("M1504,466 V446 H1590 V660", "batE"),
                 ("M1400,250 H1440", "load1"), ("M1494,250 H1590 V318", "load2"), ("M1590,362 V446", "load3")]:
        s = mark(s, d, k)
    s = rep(s, '<path class="w" d="M1448,248 L1486,228"/>', '<path class="w blade" data-blade="ignsw" d="M1448,248 L1486,228"/>')
    s = rep(s, '<circle class="p" cx="1590" cy="340" r="22"/>', '<circle class="p" id="lamp" cx="1590" cy="340" r="22"/>')
    s = rep(s, '<rect class="p" x="1300" y="238" width="54" height="24" rx="2"/>', '<rect class="p" id="fuse15" x="1300" y="238" width="54" height="24" rx="2"/>')
    hots = [hot_circ("rotor", 330, 400, 180), hot_circ("stator", 330, 400, 150), hot_rect("leads", 368, 384, 204, 32),
            hot_rect("regrec", 604, 146, 640, 506), hot_rect("bridge", 772, 266, 272, 50),
            hot_rect("bridge", 782, 526, 36, 38), hot_rect("bridge", 892, 526, 36, 38), hot_rect("bridge", 1002, 526, 36, 38),
            hot_rect("scr", 828, 526, 36, 38), hot_rect("scr", 938, 526, 36, 38), hot_rect("scr", 1048, 526, 36, 38),
            hot_rect("sense", 1100, 334, 102, 112), hot_rect("fuse", 1294, 232, 66, 36),
            hot_rect("battery", 1348, 460, 210, 174), hot_rect("ignsw", 1432, 220, 66, 40, "ignsw"),
            hot_rect("loads", 1562, 312, 56, 56)]
    s = rep(s, "</svg>", '<g class="hots">' + "".join(hots) + "</g>\n</svg>")
    return s

# ------------------------------------------------------------------ F22 ignition
def build_f22():
    s = rd(f"{ROOT}/figs/F22.svg")
    s = re.sub(r'<use xlink:href="#f22-arr"[^>]*/>\n?', "", s)
    s = rep(s, '<use xlink:href="#f22-fly" x="220" y="290"/>', '<use xlink:href="#f22-fly" x="220" y="290" id="flyA"/>')
    s = rep(s, '<use xlink:href="#f22-lobe" transform="translate(220,290) rotate(35)"/>', '<use xlink:href="#f22-lobe" id="lobeA" transform="translate(220,290) rotate(35)"/>')
    s = rep(s, '<use xlink:href="#f22-fly" x="220" y="350"/>', '<use xlink:href="#f22-fly" x="220" y="350" id="flyB"/>')
    s = rep(s, '<use xlink:href="#f22-lobe" transform="translate(220,350) rotate(-30)"/>', '<use xlink:href="#f22-lobe" id="lobeB" transform="translate(220,350) rotate(-30)"/>')
    s = rep(s, '<path class="w" d="M220,186 V120 H600 V200 H640"/>',
            '<path class="w seg" data-seg="srcA1" d="M220,186 V120 H480"/><path class="w seg" data-seg="srcA2" d="M480,120 H600 V200 H640"/>')
    s = mark(s, "M480,120 V140", "stopA1"); s = mark(s, "M480,190 V204", "stopA2")
    s = rep(s, '<path class="w" d="M482,148 L498,180"/>', '<path class="w blade" data-blade="stopA" d="M482,148 L498,180"/>')
    s = mark(s, "M393,284 H560 V330 H640", "pulA"); s = mark(s, "M393,296 H410 V372", "pulgA")
    s = mark(s, "M640,200 H720", "srcA3")
    s = rep(s, '<path class="wa" d="M741,200 H820 H880 M880,180 V220 M892,180 V220 M892,200 H1010"/>',
            '<path class="wa seg" data-seg="chgA" d="M741,200 H880"/><path class="w" style="stroke-width:3" d="M880,180 V220 M892,180 V220"/><path class="wa seg" data-seg="outA1" d="M892,200 H1010"/>')
    s = mark(s, "M820,200 V320 M820,342 V392", "scrA")
    s = mark(s, "M640,330 H702", "pcA")
    s = mark(s, "M742,362 V392 H900 V440 V452", "gndA")
    s = mark(s, "M1010,200 H1040 V150 H1120 V172", "outA2", 1)
    s = mark(s, "M1010,200 H1040 V150 H1120 V172", "igB", 2)  # second occurrence is panel B
    s = mark(s, "M1170,172 V150 H1220 V152", "coilgA")
    # panel B
    s = mark(s, "M160,88 V80 H230 V140", "batgB")
    s = mark(s, "M70,88 V66 H250", "supB1")
    s = mark(s, "M250,66 H296 M296,66 H340", "supB2")
    s = rep(s, '<path class="w" d="M347,63 L380,46"/>', '<path class="w blade" data-blade="ignB" d="M347,63 L380,46"/>')
    s = mark(s, "M388,66 H440", "supB3")
    s = rep(s, '<path class="w" d="M447,63 L480,46"/>', '<path class="w blade" data-blade="stopB" d="M447,63 L480,46"/>')
    s = rep(s, '<path class="wa" d="M488,66 H1170 V172"/>',
            '<path class="wa seg" data-seg="supB4a" d="M488,66 H600"/><path class="wa seg" data-seg="supB4b" d="M600,66 H1170 V172"/>')
    s = mark(s, "M600,66 V200 H720", "ecuFeed")
    s = mark(s, "M393,344 H560 V330 H640", "pulB"); s = mark(s, "M393,356 H410 V420", "pulgB")
    s = mark(s, "M640,330 H720", "pcB")
    s = mark(s, "M830,330 H876", "gateB")
    s = rep(s, '<path class="w" d="M884,316 L904,302 V200 H1010 M884,344 L904,358 V400"/>',
            '<path class="w seg" data-seg="igbtC" d="M884,316 L904,302 V200 H1010"/><path class="w seg" data-seg="igbtE" d="M884,344 L904,358 V400"/>')
    s = mark(s, "M860,400 V452", "ecuG")
    # HT lead inner strokes and sparks
    inner = '<path d="M1332,235 H1380 V100 H1470 V146" fill="none" stroke="#DCE4F2" stroke-width="5.6"/>'
    s = rep(s, inner, inner.replace("<path ", '<path id="htA" class="ht" '), 1)
    s = rep(s, inner, inner.replace("<path ", '<path id="htB" class="ht" '), 1)
    spark = '<use xlink:href="#f22-spark" x="1462" y="388"/>'
    def sp(i):
        return (f'<g class="spark" id="spark{i}"><circle cx="1470" cy="391" r="16" class="glow"/>'
                f'<use xlink:href="#f22-spark" transform="translate(1470,391) scale(1.8) translate(-8,-3)"/></g>')
    s = rep(s, spark, sp("A"), 1); s = rep(s, spark, sp("B"), 1)
    B = 510
    hots = [hot_circ("flyA", 220, 290, 112), hot_rect("srcA", 186, 196, 68, 70), hot_rect("pulserA", 326, 268, 74, 44),
            hot_rect("stopA", 462, 132, 48, 64, "stopA"), hot_rect("cdi", 624, 86, 390, 358),
            hot_rect("coilA", 1076, 168, 258, 112), hot_rect("plugA", 1436, 96, 70, 330),
            hot_rect("batB", 36, 84 + B, 158, 104), hot_rect("fuseB", 246, 52 + B, 54, 28),
            hot_rect("ignB", 334, 36 + B, 58, 40, "ignB"), hot_rect("stopB", 434, 36 + B, 58, 40, "stopB"),
            hot_rect("ecu", 624, 112 + B, 390, 332), hot_circ("flyB", 220, 350 + B, 112),
            hot_rect("pulserB", 326, 328 + B, 74, 44), hot_rect("coilB", 1076, 168 + B, 258, 112),
            hot_rect("plugB", 1436, 96 + B, 70, 330)]
    s = rep(s, "</svg>", '<g class="hots">' + "".join(hots) + "</g>\n</svg>")
    return s

# ------------------------------------------------------------------ WR01 harness
def build_wr01():
    s = rd(f"{ROOT}/figs/web/WR01.svg")
    return s

def strip_head(svg):
    return re.sub(r"^<\?xml[^>]*>\s*", "", svg)

svgs = {"starting": build_f23(), "charging": build_f21(), "ignition": build_f22(), "harness": build_wr01()}
names = {"harness": "WR01-harness", "starting": "F23-starting", "charging": "F21-charging", "ignition": "F22-ignition"}
for k, v in svgs.items():
    open(f"{OUT}/svg/{names[k]}-interactive.svg", "w").write(v)

data = {"systems": D.SYSTEMS, "colours": {k: {"name": n, "hex": x} for k, (n, x) in D.COLOURS.items()},
        "harness": D.H, "starting": D.STARTING, "charging": D.CHARGING, "ignition": D.IGNITION}
open(f"{OUT}/wiring-data.json", "w").write(json.dumps(data, indent=1, ensure_ascii=False))

tpl = rd(f"{OUT}/src/template.html")
page = (tpl.replace("/*DATA*/", json.dumps(data, ensure_ascii=False))
           .replace("<!--SVG_harness-->", strip_head(svgs["harness"]))
           .replace("<!--SVG_starting-->", strip_head(svgs["starting"]))
           .replace("<!--SVG_charging-->", strip_head(svgs["charging"]))
           .replace("<!--SVG_ignition-->", strip_head(svgs["ignition"])))
open(f"{OUT}/wiring-lab.artifact.html", "w").write(page)
site = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + page.replace("<!--BODY-->", "</head>\n<body>", 1) + "\n</body>\n</html>\n")
open(f"{OUT}/wiring.html", "w").write(site)
print("ok", len(page))
