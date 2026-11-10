#!/usr/bin/env python3
"""Compose the "viral" Reels (1080x1920, 30 fps) from clean 3D clips recorded by viral.js.
Each reel is a list of segments; each segment shows a slice of a clip on a card with its own text.
Usage: python3 source/promo/viral_make.py <frames dir> <out dir> [reel id ...]
Needs <frames dir>/../end.mp4 (the 1.6 s motopedia.org end card) or END=path."""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FR, OUT = sys.argv[1], sys.argv[2]
END = os.environ.get('END') or os.path.join(os.path.dirname(FR.rstrip('/')), 'reels', 'end.mp4')
ONLY = sys.argv[3:]
W, H, CARD_W, CARD_Y = 1080, 1920, 1000, 560
BOLD = '/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf'
XBOLD = '/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf'
ORANGE, WHITE = (240, 122, 85), (255, 255, 255)
LOGO = os.path.join(ROOT, 'assets/brand/motopedia-logo-white.png')
REELS = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'viral.json')))


def wrap(d, text, font, maxw):
    lines, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


def text_block(d, text, font, y, fill, maxw=960, gap=1.12, shadow=True):
    for ln in wrap(d, text, font, maxw):
        w = d.textlength(ln, font=font); x = (W - w) / 2
        if shadow: d.text((x + 3, y + 4), ln, font=font, fill=(0, 0, 0, 150))
        d.text((x, y), ln, font=font, fill=fill)
        y += int(font.size * gap)
    return y


def background():
    bg = Image.new('RGB', (W, H))
    top, bot = (22, 24, 30), (58, 30, 20)
    px = bg.load()
    for y in range(H):
        k = y / H; c = tuple(int(top[i] + (bot[i] - top[i]) * k) for i in range(3))
        for x in range(W): px[x, y] = c
    glow = Image.new('L', (W, H), 0); ImageDraw.Draw(glow).ellipse((-200, 300, W + 200, 1500), fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    return Image.composite(Image.new('RGB', (W, H), (240, 122, 85)), bg, glow.point(lambda v: v // 2))


BG = None


def overlay(seg, title, card_h, path):
    """Full-frame PNG: background + text, with a transparent rounded hole where the clip shows."""
    global BG
    if BG is None: BG = background()
    im = BG.copy().convert('RGBA'); d = ImageDraw.Draw(im)
    logo = Image.open(LOGO).convert('RGBA'); logo = logo.resize((250, round(logo.height * 250 / logo.width)))
    im.alpha_composite(logo, ((W - logo.width) // 2, 110))
    tf = ImageFont.truetype(XBOLD, seg.get('title_size', 80))
    if title: text_block(d, title.upper() if seg.get('caps', True) else title, tf, 270, WHITE, maxw=980, gap=1.08)
    x0, y0 = (W - CARD_W) // 2, CARD_Y
    hole = Image.new('L', (W, H), 255); ImageDraw.Draw(hole).rounded_rectangle((x0, y0, x0 + CARD_W, y0 + card_h), 38, fill=0)
    im.putalpha(hole)
    d = ImageDraw.Draw(im)
    if seg.get('badge'):
        bf = ImageFont.truetype(XBOLD, 64); b = seg['badge']; bw = max(110, int(d.textlength(b, font=bf)) + 56)
        d.rounded_rectangle((x0 + 26, y0 + 26, x0 + 26 + bw, y0 + 136), 55, fill=ORANGE + (255,))
        d.text((x0 + 26 + bw / 2, y0 + 81), b, font=bf, fill=WHITE, anchor='mm')
    y = y0 + card_h + 44
    if seg.get('l1'): y = text_block(d, seg['l1'], ImageFont.truetype(XBOLD, seg.get('l1_size', 76)), y, ORANGE + (255,))
    if seg.get('l2'): text_block(d, seg['l2'], ImageFont.truetype(BOLD, 46), y + 6, WHITE + (255,), maxw=940)
    im.save(path)


def clip_size(src):
    im = Image.open(os.path.join(FR, src, '00000.jpg')); w, h = im.size
    ch = round(h * CARD_W / w)
    return min(ch, 900), ch


def render(reel, tmp):
    parts = []
    for i, seg in enumerate(reel['segments']):
        card_h, full_h = clip_size(seg['src'])
        png = os.path.join(tmp, f'o{i}.png'); overlay(seg, seg.get('title', reel.get('title', '')), card_h, png)
        mp4 = os.path.join(tmp, f's{i}.mp4'); n = seg['n']
        speed = seg.get('speed', 1)
        vf = (f"[0:v]setpts=PTS/{speed},scale={CARD_W}:{full_h},crop={CARD_W}:{card_h},setsar=1[c];"
              f"color=c=0x16181e:s={W}x{H}:r=30[bg];[bg][c]overlay=({W}-{CARD_W})/2:{CARD_Y}:shortest=1[m];"
              f"[m][1:v]overlay=0:0,format=yuv420p,fps=30[o]")
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '30', '-start_number', str(seg.get('start', 0)),
                        '-i', os.path.join(FR, seg['src'], '%05d.jpg'), '-loop', '1', '-i', png, '-filter_complex', vf,
                        '-map', '[o]', '-frames:v', str(round(n / speed)), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', mp4], check=True)
        parts.append(mp4)
    ins, fl = [], ''
    for k, p in enumerate(parts + [END]):
        ins += ['-i', p]; fl += f'[{k}:v]fps=30,scale={W}:{H},setsar=1,format=yuv420p[v{k}];'
    fl += ''.join(f'[v{k}]' for k in range(len(parts) + 1)) + f'concat=n={len(parts) + 1}:v=1[o]'
    out = os.path.join(OUT, reel['id'] + '.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', fl, '-map', '[o]', '-c:v', 'libx264',
                    '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out], check=True)
    dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout.strip()
    print(reel['id'], dur + 's')


os.makedirs(OUT, exist_ok=True)
for r in REELS:
    if ONLY and r['id'] not in ONLY: continue
    with tempfile.TemporaryDirectory() as t: render(r, t)
