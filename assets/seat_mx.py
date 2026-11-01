import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'seat_mx'
META = {"title": "Motocross seat, long and narrow", "category": "frame_body", "kind": "part", "view": (-38, 22)}

X0, X1 = -46.0, 34.0
def W(x):
    if x < -20: return 20.5 + 2.0 * (x + 46) / 26
    return 22.5 - 12.0 * ((x + 20) / 54) ** 1.3
def ZB(x): return 2.0 + 0.26 * max(0.0, x - 4.0)
def ZT(x): return 12.0 + 0.17 * max(0.0, x - 2.0) + 0.004 * max(0.0, x - 2.0) ** 2
RP = 1.5
def top_mod(x, yf):
    if x < -42 or x > 24: return 0.0
    side = max(0.0, min(1.0, (0.78 - abs(yf)) / 0.1))
    ph = ((x - X0) / RP) % 1.0
    return 0.16 * side * (1.0 if 0.25 < ph < 0.75 else 0.0)

def build():
    xs = [X0 + (X1 - X0) * (0.5 - 0.5 * math.cos(math.pi * i / 40)) for i in range(41)]
    x = X0
    while x < 24:
        xs += [x + RP * 0.25 - 0.05, x + RP * 0.25 + 0.05, x + RP * 0.75 - 0.05, x + RP * 0.75 + 0.05]; x += RP
    xs = sorted(set(round(v, 4) for v in xs))
    cov, secs = pad_loft(A + '__cover', X0, X1, W, ZT, ZB, M('vinyl_grip'), n=48, xs=xs, crown=1.0, top_mod=top_mod, ends_p=2.6, e=0.5)
    cov.data.materials.append(M('plastic_grey'))
    # two-tone: grippy top panel in a lighter compound
    for p in cov.data.polygons:
        if p.normal.z > 0.6 and p.center.x < 27: p.material_index = 1
    finish(cov, 0)
    pan, _ = pad_loft(A + '__base_pan', X0 + 0.6, X1 - 0.4, lambda x: W(x) + 0.5, lambda x: ZB(x) + 2.0, lambda x: ZB(x) - 1.6,
                      M('plastic_black'), n=40, nx=40, ends_p=2.6, e=0.3)
    finish(pan, 0)
    # front mounting tab with bolt, rear hooks
    tab = box((5.0, 3.0, 0.6), (X1 + 1.0, 0, ZB(X1) - 1.2), (0, math.radians(-25), 0), 'tab'); finish(tab, 0.2, 2, m=M('plastic_black'))
    bolt = cyl(0.75, 0.6, (X1 + 2.0, 0, ZB(X1) - 0.6), (0, math.radians(-25), 0), 6, 'bolt'); finish(bolt, 0.06, 2, m=M('zinc'))
    hooks = [box((3.0, 1.2, 2.4), (X0 + 12, y, ZB(X0) - 2.6), (0, 0, 0), 'hk') for y in (-7, 7)]
    for h in hooks: finish(h, 0.3, 2, m=M('plastic_black'))
    join([tab, bolt] + hooks, A + '__mounts')
