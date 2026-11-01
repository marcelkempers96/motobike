import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'battery_12v'
META = {"title": "12 V AGM service battery", "category": "electrical", "kind": "part", "view": (-32, 24)}

L, D, H = 15.0, 8.7, 13.0
def build():
    case = box((L, D, H), (0, 0, H / 2), (0, 0, 0), A + '__case'); finish(case, 0.35, 3, m=M('plastic_grey'))
    lid = box((L + 0.2, D + 0.2, 1.6), (0, 0, H + 0.6), (0, 0, 0), 'lid')
    cuts = [box((3.2, 3.0, 2.0), (sx * (L / 2 - 1.5), -D / 2 + 1.4, H + 1.3), (0, 0, 0), '_tc') for sx in (-1, 1)]
    cut(lid, join(cuts, '_tcuts')); bake(lid); finish(lid, 0.25, 2, m=M('plastic_black')); lid.name = A + '__lid'
    # sealed vent strip and moulded ribs on the lid
    strip = box((L - 8.5, 1.8, 0.25), (0, 1.6, H + 1.45), (0, 0, 0), A + '__vent_strip'); finish(strip, 0.08, 2, m=M('plastic_black'))
    ribs = [box((0.3, D - 1.0, 0.4), (-L / 2 + 1.0 + i * 0.9, 0, H + 1.55), (0, 0, 0), 'rb') for i in range(0)]
    # terminals: tinned lead L-blocks with M6 bolts, red cover on +
    terms = []
    for sx in (-1, 1):
        x = sx * (L / 2 - 1.5); y = -D / 2 + 1.4
        blk = box((1.9, 1.7, 1.9), (x, y, H + 1.25), (0, 0, 0), 'tb'); finish(blk, 0.12, 2, m=M('lead'))
        face = box((1.9, 0.35, 2.4), (x, y - 0.95, H + 1.6), (0, 0, 0), 'tf'); finish(face, 0.08, 2, m=M('lead'))
        bolt = cyl(0.62, 0.45, (x, y - 1.35, H + 1.7), (math.radians(90), 0, 0), 6, 'bh'); finish(bolt, 0.05, 2, m=M('zinc'))
        terms += [blk, face, bolt]
        mark = box((1.2, 0.04, 0.35 if sx < 0 else 1.2), (x, -D / 2 - 0.03, H - 1.2), (0, 0, 0), 'mk'); mark.data.materials.append(M('red' if sx > 0 else 'white'))
        if sx > 0:
            m2 = box((0.35, 0.04, 1.2), (x, -D / 2 - 0.03, H - 1.2), (0, 0, 0), 'mk'); m2.data.materials.append(M('red')); terms.append(m2)
        terms.append(mark)
    join(terms, A + '__terminals')
    cap = box((2.3, 2.6, 2.8), (L / 2 - 1.5, -D / 2 + 1.0, H + 1.9), (0, 0, 0), 'cap'); finish(cap, 0.5, 3, m=mat('red_rubber', (0.55, 0.03, 0.02), 0.0, 0.55))
    cap.name = A + '__positive_cover'
    lab = tex_plane(A + '__label', L - 1.6, H - 4.0, (0, -D / 2 - 0.02, H / 2 - 0.6), (math.radians(90), 0, 0),
                    img_mat('label12', _dash.label_12v(f'{TEX}/label_12v.png'), 0.35))
