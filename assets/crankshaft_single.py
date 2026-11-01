import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Single-cylinder built-up crankshaft", "category": "powertrain", "kind": "part", "view": (-38, 18)}
A = 'crankshaft_single'
CZ = 5.62; THR = 2.475; TH = math.radians(38)


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    forged = noisy_mat('forged', (0.42, 0.43, 0.45), 1.0, 0.42, 0.10, 40, 0.15)
    ground = brushed(mat('ground', (0.80, 0.80, 0.81), 1.0, 0.13), 'X', 0.6)
    pin = (0, THR * math.sin(TH), CZ + THR * math.cos(TH))
    # flywheel webs: full discs with lightening holes opposite the pin and chamfered rims
    for sx, nm in ((-1, 'web_left'), (1, 'web_right')):
        w = lathe([(0, -0.75), (5.35, -0.75), (5.6, -0.5), (5.6, 0.5), (5.35, 0.75), (2.6, 0.75), (2.4, 0.95), (0, 0.95)][::1 if sx > 0 else 1],
                  nm, forged, (sx * 1.85, 0, CZ), 'X' if sx > 0 else '-X', 128)
        hs = []
        for a in (-0.55, 0, 0.55):
            ang = TH + PI + a
            hs.append(cyl(0.55 if a else 0.75, 3.0, (sx * 1.85, 3.6 * math.sin(ang), CZ + 3.6 * math.cos(ang)), RX, 40, '_hole'))
        bcut(w, J(hs, '_holes')); finish(w, 0.04, 2)
        w.name = n(nm)
    cp = lathe([(0, 0), (1.25, 0), (1.3, 0.05), (1.3, 4.85), (1.25, 4.9), (0, 4.9)], n('crankpin'), ground, (-2.45, pin[1], pin[2]), 'X', 64)
    # shafts: drive side (spline + primary gear) and timing side (cam sprocket, taper, thread)
    parts = []
    for sx in (-1, 1):
        parts.append(lathe([(0, 0), (1.55, 0), (1.55, 1.6), (0, 1.6)], 'journal', ground, (sx * 2.65 - (1.6 if sx < 0 else 0), 0, CZ), 'X', 64))
    parts.append(lathe([(0, 0), (1.15, 0), (1.15, 4.0), (1.05, 4.1), (0, 4.1)], 'shaftL', ground, (-5.5, 0, CZ), '-X', 64))
    parts.append(toothed('spl', (1.05, 1.17, 16, 0.4, 0.5), 0.6, 2.4, ground, (-8.4, 0, CZ), 'X', per=6))
    parts.append(lathe([(0, 0), (1.2, 0), (0.95, 2.6), (0, 2.6)], 'taper', ground, (5.0, 0, CZ), 'X', 64))
    th = lathe([(0, 0), (0.62, 0), (0.62, 1.8), (0.5, 1.9), (0, 1.9)], 'thread', ground, (7.5, 0, CZ), 'X', 48)
    rings = [torus(0.62, 0.05, (7.7 + i * 0.12, 0, CZ), RX, 'thr', 48, 6) for i in range(13)]
    for r_ in rings: r_.data.materials.append(ground)
    J(parts + [th] + rings, n('shafts'))
    g = toothed('pg', (2.3, 2.6, 38, 0.22, 0.36), 1.1, 1.1, ground, (-5.0, 0, CZ), 'X', per=8); finish(g, 0.02, 1); g.name = n('primary_gear')
    sp = toothed('cs', (1.62, 1.92, 18, 0.18, 0.40), 1.1, 0.6, ground, (4.7, 0, CZ), 'X', per=10); finish(sp, 0.02, 1); sp.name = n('cam_sprocket')
    k = box((1.2, 0.22, 0.25), (6.0, 0, CZ + 1.02), (0, rad(-5), 0), 'key'); finish(k, 0.03, 2, m=forged); k.name = n('key')
    finalize(A)
