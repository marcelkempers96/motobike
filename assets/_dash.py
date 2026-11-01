"""Instrument dial / LCD / TFT textures drawn with PIL (helper, not an asset). Generic, no brand."""
import math, os
from PIL import Image, ImageDraw
from _kit_wbe import TEX, font

def dial(path, kind='speed', S=1024):
    im = Image.new('RGB', (S, S), (8, 8, 9)); d = ImageDraw.Draw(im)
    c = S / 2; R = S * 0.46
    a0, a1 = 225, -45   # degrees, clockwise sweep from lower-left to lower-right
    if kind == 'speed':
        vmax, major, minor, labels = 160, 20, 5, range(0, 161, 20)
        red = None
    else:
        vmax, major, minor, labels = 10, 1, 0.5, range(0, 11)
        red = 8.0
    def ang(v): return math.radians(a0 + (a1 - a0) * v / vmax)
    if red is not None:
        for k in range(200):
            v = red + (vmax - red) * k / 199; a = ang(v)
            for rr in range(int(R * 0.86), int(R * 0.95)):
                d.point((c + rr * math.cos(a), c - rr * math.sin(a)), fill=(200, 30, 20))
    n = int(vmax / minor)
    for i in range(n + 1):
        v = i * minor; a = ang(v); isM = abs(v / major - round(v / major)) < 1e-6
        r1 = R * (0.80 if isM else 0.87); r2 = R * 0.95
        col = (235, 235, 230) if (red is None or v < red) else (255, 80, 60)
        d.line([(c + r1 * math.cos(a), c - r1 * math.sin(a)), (c + r2 * math.cos(a), c - r2 * math.sin(a))], fill=col, width=9 if isM else 4)
    f = font(int(S * 0.075))
    for v in labels:
        a = ang(v); r = R * 0.66
        t = str(v); w = d.textlength(t, font=f)
        d.text((c + r * math.cos(a) - w / 2, c - r * math.sin(a) - S * 0.045), t, font=f, fill=(235, 235, 230))
    sf = font(int(S * 0.04), False)
    lab = 'km/h' if kind == 'speed' else 'x1000 r/min'
    w = d.textlength(lab, font=sf); d.text((c - w / 2, c - R * 0.42), lab, font=sf, fill=(190, 190, 185))
    if kind == 'speed':
        bx = (c - S * 0.13, c + R * 0.42, c + S * 0.13, c + R * 0.42 + S * 0.07)
        d.rectangle(bx, fill=(20, 20, 20), outline=(120, 120, 120), width=3)
        df = font(int(S * 0.05)); x = bx[0] + S * 0.012
        for ch in '012847':
            d.rectangle((x, bx[1] + 6, x + S * 0.036, bx[3] - 6), fill=(235, 235, 230) if ch != '7' else (20, 20, 20))
            d.text((x + S * 0.004, bx[1] + 4), ch, font=df, fill=(10, 10, 10) if ch != '7' else (235, 235, 230)); x += S * 0.04
    im.save(path); return path

SEG = {'0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcfgd', 'N': 'ecbaf'}
def seg7(d, x, y, w, h, ch, col, th=None):
    th = th or w * 0.18; g = th * 0.3
    P = {'a': (x + g, y, x + w - g, y + th), 'd': (x + g, y + h - th, x + w - g, y + h), 'g': (x + g, y + h / 2 - th / 2, x + w - g, y + h / 2 + th / 2),
         'f': (x, y + g, x + th, y + h / 2 - g), 'b': (x + w - th, y + g, x + w, y + h / 2 - g), 'e': (x, y + h / 2 + g, x + th, y + h - g), 'c': (x + w - th, y + h / 2 + g, x + w, y + h - g)}
    for s in SEG.get(ch, ''):
        x0, y0, x1, y1 = P[s]; sk = (y1 - y0) * 0.08
        d.polygon([(x0 + sk, y0), (x1 + sk, y0), (x1, y1), (x0, y1)], fill=col)

def lcd(path, W=900, H=520):
    bg = (150, 160, 140); ink = (22, 26, 22); ghost = (138, 148, 128)
    im = Image.new('RGB', (W, H), bg); d = ImageDraw.Draw(im)
    for i, ch in enumerate('88'):
        seg7(d, 60 + i * 190, 60, 160, 280, ch, ghost)
    for i, ch in enumerate('47'):
        seg7(d, 60 + i * 190, 60, 160, 280, ch, ink)
    f = font(46); d.text((450, 260), 'km/h', font=f, fill=ink)
    for i, ch in enumerate('01284'):
        seg7(d, 470 + i * 78, 70, 62, 110, '8', ghost, 11); seg7(d, 470 + i * 78, 70, 62, 110, ch, ink, 11)
    d.text((470, 190), 'ODO', font=font(34), fill=ink)
    for i, ch in enumerate('1247'):
        seg7(d, 60 + i * 80 + (30 if i > 1 else 0), 380, 62, 105, ch, ink, 11)
    d.ellipse((222, 405, 236, 419), fill=ink); d.ellipse((222, 450, 236, 464), fill=ink)
    d.rectangle((560, 400, 840, 470), outline=ink, width=6)
    for k in range(5): d.rectangle((572 + k * 54, 412, 610 + k * 54, 458), fill=ink if k < 3 else ghost)
    d.text((470, 405), 'F', font=font(52), fill=ink)
    im.save(path); return path

def tft(path, W=1280, H=720):
    im = Image.new('RGB', (W, H), (6, 8, 12)); d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H; d.line([(0, y), (W, y)], fill=(int(6 + 10 * t), int(9 + 12 * t), int(14 + 20 * t)))
    # rev arc bar across the top
    cx, cy, R = W / 2, H * 1.05, H * 0.95
    n = 64
    for i in range(n):
        a0 = math.radians(150 - 120 * i / n); a1 = math.radians(150 - 120 * (i + 0.8) / n)
        lit = i < 34
        col = (40, 200, 255) if i < 44 else (255, 170, 40) if i < 54 else (255, 60, 50)
        if not lit: col = tuple(int(c * 0.18) for c in col)
        r1, r2 = R, R * 0.90
        pts = [(cx + r1 * math.cos(a0), cy - r1 * math.sin(a0)), (cx + r1 * math.cos(a1), cy - r1 * math.sin(a1)),
               (cx + r2 * math.cos(a1), cy - r2 * math.sin(a1)), (cx + r2 * math.cos(a0), cy - r2 * math.sin(a0))]
        d.polygon(pts, fill=col)
    fs = font(30)
    for k in range(0, 13, 2):
        a = math.radians(150 - 120 * (k / 12)); r = R * 0.84
        t = str(k); w = d.textlength(t, font=fs); d.text((cx + r * math.cos(a) - w / 2, cy - r * math.sin(a) - 16), t, font=fs, fill=(170, 180, 190))
    big = font(260); t = '87'; w = d.textlength(t, font=big)
    d.text((W / 2 - w / 2 - 40, H * 0.28), t, font=big, fill=(245, 248, 250))
    d.text((W / 2 + w / 2 - 20, H * 0.58), 'km/h', font=font(44), fill=(150, 160, 170))
    # gear indicator box
    d.rounded_rectangle((W * 0.80, H * 0.30, W * 0.94, H * 0.62), 18, outline=(40, 200, 255), width=6)
    g = font(170); d.text((W * 0.835, H * 0.31), '3', font=g, fill=(40, 200, 255))
    d.text((W * 0.835, H * 0.63), 'GEAR', font=font(30), fill=(150, 160, 170))
    # left column: riding mode, traction, temperature
    lf = font(36); sm = font(28, False)
    d.rounded_rectangle((W * 0.05, H * 0.32, W * 0.24, H * 0.42), 12, fill=(30, 40, 52))
    d.text((W * 0.07, H * 0.34), 'MODE  ROAD', font=sm, fill=(230, 235, 240))
    d.text((W * 0.06, H * 0.47), 'TC  2', font=lf, fill=(230, 235, 240))
    d.text((W * 0.06, H * 0.56), '82 °C', font=lf, fill=(230, 235, 240))
    # bottom strip: fuel gauge, trip, odometer, clock
    d.line([(40, H * 0.80), (W - 40, H * 0.80)], fill=(50, 60, 75), width=3)
    for k in range(8):
        d.rectangle((60 + k * 34, H * 0.85, 86 + k * 34, H * 0.93), fill=(230, 235, 240) if k < 5 else (50, 60, 70))
    d.text((60, H * 0.935), 'E', font=sm, fill=(150, 160, 170)); d.text((310, H * 0.935), 'F', font=sm, fill=(150, 160, 170))
    d.text((W * 0.36, H * 0.84), 'TRIP A  128.4 km', font=lf, fill=(230, 235, 240))
    d.text((W * 0.36, H * 0.91), 'ODO  012847 km', font=sm, fill=(150, 160, 170))
    d.text((W * 0.80, H * 0.85), '14:32', font=font(56), fill=(230, 235, 240))
    # indicator icons along the top corners
    d.polygon([(40, 60), (90, 30), (90, 90)], fill=(40, 210, 80)); d.polygon([(W - 40, 60), (W - 90, 30), (W - 90, 90)], fill=(40, 60, 50))
    d.ellipse((130, 35, 180, 85), outline=(60, 120, 255), width=6)
    for k in range(4): d.line([(185, 42 + k * 12), (215, 42 + k * 12)], fill=(60, 120, 255), width=5)
    im.save(path); return path

def warn_tri(d, x, y, s, col=(250, 200, 0), bolt=False):
    d.polygon([(x, y + s), (x + s / 2, y), (x + s, y + s)], fill=(10, 10, 10))
    k = s * 0.12
    d.polygon([(x + k * 1.2, y + s - k * 0.6), (x + s / 2, y + k * 1.4), (x + s - k * 1.2, y + s - k * 0.6)], fill=col)
    if bolt:
        cx = x + s / 2; t = s
        d.polygon([(cx + 0.02 * t, y + 0.33 * t), (cx - 0.11 * t, y + 0.62 * t), (cx - 0.01 * t, y + 0.60 * t), (cx - 0.05 * t, y + 0.86 * t),
                   (cx + 0.11 * t, y + 0.55 * t), (cx + 0.01 * t, y + 0.57 * t), (cx + 0.07 * t, y + 0.33 * t)], fill=(10, 10, 10))
    else:
        d.rectangle((x + s / 2 - s * 0.04, y + s * 0.38, x + s / 2 + s * 0.04, y + s * 0.72), fill=(10, 10, 10))
        d.ellipse((x + s / 2 - s * 0.05, y + s * 0.77, x + s / 2 + s * 0.05, y + s * 0.87), fill=(10, 10, 10))

def label_12v(path, W=1200, H=900):
    im = Image.new('RGB', (W, H), (18, 18, 20)); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 150), fill=(200, 30, 30))
    d.text((40, 30), 'SEALED AGM', font=font(84), fill=(255, 255, 255))
    d.text((60, 210), '12V', font=font(260), fill=(240, 240, 240))
    d.text((660, 230), '12 Ah', font=font(96), fill=(240, 240, 240))
    d.text((660, 350), '200 A (EN)', font=font(72, False), fill=(200, 200, 200))
    d.line([(40, 540), (W - 40, 540)], fill=(90, 90, 90), width=4)
    d.text((40, 570), 'MAINTENANCE FREE  •  VRLA  •  DO NOT OPEN', font=font(44, False), fill=(200, 200, 200))
    for i in range(5):
        warn_tri(d, 40 + i * 150, 680, 120, (250, 200, 0))
    d.text((820, 690), 'Pb', font=font(90), fill=(200, 200, 200))
    d.ellipse((960, 680, 1120, 840), outline=(200, 200, 200), width=8); d.line([(975, 695), (1105, 825)], fill=(200, 200, 200), width=8)
    im.save(path); return path

def label_hv(path, W=1400, H=800):
    im = Image.new('RGB', (W, H), (250, 250, 248)); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 170), fill=(250, 200, 0)); d.rectangle((0, 160, W, 172), fill=(10, 10, 10))
    warn_tri(d, 30, 10, 150, (250, 200, 0), bolt=True)
    d.text((220, 35), 'DANGER  HIGH VOLTAGE', font=font(92), fill=(10, 10, 10))
    d.text((40, 210), 'LITHIUM-ION TRACTION BATTERY', font=font(64), fill=(20, 20, 20))
    rows = [('Nominal voltage', '72 V DC'), ('Capacity', '70 Ah'), ('Energy', '5.0 kWh'), ('Chemistry', 'NMC 20S7P'), ('Mass', '31 kg')]
    for i, (k, v) in enumerate(rows):
        d.text((40, 320 + i * 72), k, font=font(48, False), fill=(60, 60, 60)); d.text((560, 320 + i * 72), v, font=font(48), fill=(20, 20, 20))
    d.rectangle((900, 320, 1360, 680), outline=(20, 20, 20), width=5)
    d.text((925, 340), 'Disconnect service plug', font=font(30, False), fill=(20, 20, 20))
    d.text((925, 385), 'before any work.', font=font(30, False), fill=(20, 20, 20))
    d.text((925, 430), 'Qualified personnel only.', font=font(30, False), fill=(20, 20, 20))
    for i in range(3): warn_tri(d, 925 + i * 140, 500, 120, (250, 200, 0), bolt=(i == 0))
    d.text((40, 720), 'S/N  TL-72-05-000417', font=font(36, False), fill=(90, 90, 90))
    im.save(path); return path
