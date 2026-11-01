import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'seat_bench'
META = {"title": "Bench seat, classic ribbed", "category": "frame_body", "kind": "part", "view": (-35, 24)}

X0, X1 = -32.0, 30.0
def W(x): return 27.0 - 8.0 * max(0.0, (x - 2.0) / 28.0) ** 1.6
def ZT(x): return 10.0 + 1.1 * (x / 30.0) ** 2 + (0.6 if x < -24 else 0.0) * 0
def ZB(x): return 2.2
P = 4.6; G0, G1 = -24.0, 20.0
def groove(x):
    if x < G0 - 0.5 or x > G1 + 0.5: return 0.0
    d = min(abs(x - (G0 + P * round((x - G0) / P))), 99)
    return max(0.0, 1.0 - d / 0.55)
def top_mod(x, yf):
    side = max(0.0, min(1.0, (0.84 - abs(yf)) / 0.08))
    return -0.55 * groove(x) * side + 0.18 * side * (1 - groove(x))

def build():
    xs = [X0 + (X1 - X0) * (0.5 - 0.5 * math.cos(math.pi * i / 36)) for i in range(37)]
    k = 0
    while G0 + P * k <= G1 + 1e-6:
        g = G0 + P * k
        xs += [g - 0.6, g - 0.3, g, g + 0.3, g + 0.6]; k += 1
    xs = sorted(set(round(x, 4) for x in xs))
    cov, secs = pad_loft(A + '__cover', X0, X1, W, ZT, ZB, M('leather'), n=56, xs=xs, crown=0.8, top_mod=top_mod, ends_p=3.2, e=0.42)
    finish(cov, 0)
    n = 56; k1, k2 = 5, 23
    path = [s[k1] for s in secs[2:-2]] + [s[k2] for s in reversed(secs[2:-2])]
    pip = sweep(path, 0.32, A + '__piping', M('plastic_grey'), 10, closed=True)
    # chrome trim strip around the lower edge
    kb1, kb2 = n - 4, n // 2 + 4
    path2 = [V(s[kb1]) + V((0, 0.18, 0)) for s in secs[2:-2]] + [V(s[kb2]) + V((0, -0.18, 0)) for s in reversed(secs[2:-2])]
    trim = sweep(path2, 0.5, A + '__trim', M('chrome'), 10, closed=True, ell=(0.45, 1.0))
    pan, _ = pad_loft(A + '__base_pan', X0 + 0.8, X1 - 0.6, lambda x: W(x) - 1.2, lambda x: 2.6, lambda x: 0.6, M('plastic_black'), n=40, nx=30, ends_p=3.2, e=0.3)
    finish(pan, 0)
    # grab strap across the seat
    xi = min(range(len(secs)), key=lambda i: abs(secs[i][0][0] + 9.0))
    s = secs[xi]; zc = (ZT(-9) + ZB(-9)) / 2
    pts, nr = [], []
    for kk in list(range(n - 3, n)) + list(range(0, n // 2 + 4)):
        p = V(s[kk % n]); d = V((0, p.y, (p.z - zc) * 1.4)).normalized()
        pts.append(p + d * 0.28); nr.append(d)
    strap = sweep(pts, 1.0, A + '__grab_strap', M('leather'), 12, normals=nr, ell=(0.25, 1.6))
    # chrome rear grab handle bracket studs & front hinge
    studs = []
    hinge = cyl(0.55, 14.0, (X1 - 5.0, 0, 0.2), (math.radians(90), 0, 0), 32, 'hinge')
    hw = join(studs + [hinge], A + '__hinge'); finish(hw, 0.05, 2, m=M('chrome'))
