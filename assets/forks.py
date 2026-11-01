"""Telescopic front fork pair with triple clamps. forks = conventional (stanchions up), forks_usd imports build_fork(usd=True)."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Front forks (conventional telescopic)", "category": "chassis", "kind": "part", "view": (40, 14)}
A = 'forks'
RAKE = math.radians(25)
TRACK = 10.0   # half distance between fork legs (cm)

def hull(pts):
    pts = sorted(set(pts))
    def cr(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) >= 2 and cr(lo[-2], lo[-1], p) <= 0: lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) >= 2 and cr(up[-2], up[-1], p) <= 0: up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]

def lathe_z(prof, name, loc, m=None, segs=64):
    o = spin(list(prof) + [prof[0]], name, 'Z', loc, segs, m); return o

def clamp(name, z0, z1, leg_r, stem_x, m, top=False):
    pts = []
    for y in (-TRACK, TRACK):
        pts += circle(leg_r + 1.35, 48, 0, y)
    pts += circle(3.1, 32, stem_x, 0)
    pts += [(stem_x - 1.0, s * 6.5) for s in (-1, 1)]
    outline = hull([(round(x, 5), round(y, 5)) for x, y in pts])
    holes = [circle(leg_r + 0.02, 48, 0, y) for y in (-TRACK, TRACK)] + [circle(1.55, 32, stem_x, 0)]
    o = prism(outline, z0, z1, name, 'Z', holes=holes)
    # lightening pockets
    pk = []
    for s in (-1, 1):
        poly = hull(circle(1.2, 16, stem_x * 0.45 + 0.9, s * 5.3) + circle(0.9, 16, stem_x * 0.6 + 0.3, s * 3.3))
        pk.append(prism(poly, z1 - 0.9 if top else z0 - 1, z1 + 1 if top else z0 + 0.9, 'pk', 'Z'))
    cutw(o, joinn(pk, '_pockets'))
    finish(o, 0.22, 3, m=m); apply_mods(o)
    # pinch ears with bolts (axis X) on the outer side of each leg
    bolts = []
    for s in (-1, 1):
        for dz in ((0.0,) if top else (-0.7, 0.7)):
            p = (0.0, s * (TRACK + leg_r + 1.0), (z0 + z1) / 2 + dz)
            bolts.append(cyl(0.45, 0.5, (1.45, p[1], p[2]), RX, 24, 'pb'))
    b = joinn(bolts, name + '_pinch_bolts'); finish(b, 0.05, 2, m=M('black_anod'))
    ears = [box((2.4, 1.6, z1 - z0), (0, s * (TRACK + leg_r + 1.0), (z0 + z1) / 2), name='ear') for s in (-1, 1)]
    for e in ears: finish(e, 0.3, 3, m=m); apply_mods(e)
    o2 = joinn([o] + ears, name)
    return o2

def build_fork(A, usd=False):
    alu = M('alu_cast'); chrome = M('chrome'); blk = M('black_anod'); rub = M('rubber')
    clamp_m = noisy_mat('clamp_alu', (0.62, 0.62, 0.64), 1.0, 0.3, 0.05, 150, 0.04) if not usd else M('black_anod')
    stem_x = -3.4
    objs = []
    if not usd:
        LR = 2.05   # 41 mm stanchions
        for s, side in ((-1, 'left'), (1, 'right')):
            y = s * TRACK
            st = cyl(LR, 58.0, (0, y, 20.0 + 29.0), (0, 0, 0), 64, A + f'__{side}_stanchion'); finish(st, 0.05, 2, m=chrome)
            sl = lathe_z([(0.001, -1.6), (2.0, -1.6), (2.7, 2.4), (2.75, 6.0), (2.62, 30.5), (2.95, 31.2), (2.95, 34.2), (2.08, 34.2), (2.08, 33.0), (0.001, 33.0)],
                         A + f'__{side}_slider', (0, y, 0), segs=72)
            boss = cyl(2.35, 5.6, (0, y, 0), RY, 48, 'boss')
            parts = [sl, boss]
            if s < 0:  # radial caliper lugs (rear) on the left slider
                for z in (5.5, 15.5):
                    lug = box((4.4, 2.0, 2.4), (-3.4, y + 0.6, z), name='lug'); finish(lug, 0.6, 3); apply_mods(lug); parts.append(lug)
            for z in (13.0, 22.0):   # fender bosses, inner side
                fb = cyl(0.75, 1.6, (0.6, y - s * 2.4, z), RY, 24, 'fb'); parts.append(fb)
            so = joinn(parts, A + f'__{side}_slider'); finish(so, 0.12, 2, m=M('black_paint'))
            if s < 0:
                hl = joinn([cyl(0.5, 4, (-4.9, y + 0.6, z), (0, 0, 0), 24, 'h') for z in (5.5, 15.5)], '_lugholes'); cutw(so, hl, fast=True)
            ds = lathe_z([(2.07, 34.1), (2.75, 34.1), (2.75, 34.9), (2.4, 35.5), (2.45, 35.9), (2.2, 36.5), (2.07, 36.5)], A + f'__{side}_dust_seal', (0, y, 0), segs=64)
            finish(ds, 0.03, 2, m=rub)
            cap = lathe_z([(0.001, 77.9), (1.95, 77.9), (2.0, 78.6), (1.75, 79.3), (0.9, 79.4), (0.9, 80.1), (0.001, 80.1)], 'cap', (0, y, 0), segs=6 * 8)
            hx = cyl(1.75, 0.8, (0, y, 78.3), (0, 0, 0), 6, 'hex')
            capo = joinn([cap, hx], A + f'__{side}_fork_cap'); finish(capo, 0.06, 2, m=M('zinc'))
            adj = cyl(0.7, 0.6, (0, y, 80.2), (0, 0, 0), 24, A + f'__{side}_preload_adjuster'); finish(adj, 0.08, 2, m=M('gold_anod'))
            # axle pinch bolts under the boss
            pbs = [cyl(0.42, 0.6, (dx, y + s * 1.6, -2.55), (0, 0, 0), 6, 'apb') for dx in (-0.9, 0.9)]
            nm(joinn(pbs, 'x'), A + f'__{side}_axle_pinch_bolts'); finish(bpy.data.objects[A + f'__{side}_axle_pinch_bolts'], 0.05, 2, m=M('zinc'))
        LRc = LR
    else:
        OR, IR = 2.8, 2.4   # 56 mm outer tubes, 48 mm inner tubes (USD)
        anod = M('gold_anod')
        for s, side in ((-1, 'left'), (1, 'right')):
            y = s * TRACK
            ot = lathe_z([(0.001, 30.0), (3.05, 30.0), (3.05, 33.2), (2.8, 33.6), (2.8, 79.2), (2.55, 79.6), (0.001, 79.6)],
                         A + f'__{side}_outer_tube', (0, y, 0), segs=72)
            finish(ot, 0.06, 2, m=anod)
            ring = lathe_z([(2.42, 29.0), (3.0, 29.0), (3.0, 30.05), (2.42, 30.05)], A + f'__{side}_seal_ring', (0, y, 0), segs=64)
            finish(ring, 0.05, 2, m=rub)
            it = cyl(IR, 30.0, (0, y, 4.0 + 15.0), (0, 0, 0), 64, A + f'__{side}_inner_tube')
            finish(it, 0.05, 2, m=mat('dlc', (0.35, 0.33, 0.30), 1.0, 0.12))
            ft = lathe_z([(0.001, -2.8), (1.6, -2.8), (2.9, 1.0), (2.9, 7.6), (2.45, 8.4), (0.001, 8.4)], 'foot', (0, y, 0), segs=64)
            boss = cyl(2.6, 6.0, (0, y, 0), RY, 48, 'boss')
            parts = [ft, boss]
            if s < 0:
                for z in (1.0, 11.0):
                    lug = box((4.6, 2.0, 2.4), (-3.5, y + 0.6, z), name='lug'); finish(lug, 0.6, 3); apply_mods(lug); parts.append(lug)
            fo = joinn(parts, A + f'__{side}_axle_foot'); finish(fo, 0.12, 2, m=M('black_cast'))
            if s < 0:
                hl = joinn([cyl(0.5, 4, (-5.0, y + 0.6, z), (0, 0, 0), 24, 'h') for z in (1.0, 11.0)], '_lugholes'); cutw(fo, hl, fast=True)
            pbs = [cyl(0.42, 0.6, (2.9, y + s * 1.5 + dy, 0.0), RX, 6, 'apb') for dy in (-1.0, 1.0)]
            nm(joinn(pbs, 'x'), A + f'__{side}_axle_pinch_bolts'); finish(bpy.data.objects[A + f'__{side}_axle_pinch_bolts'], 0.05, 2, m=M('zinc'))
            cap = lathe_z([(0.001, 79.4), (2.5, 79.4), (2.55, 80.0), (2.2, 80.6), (0.001, 80.6)], 'cap', (0, y, 0), segs=48)
            hx = cyl(2.25, 0.7, (0, y, 79.8), (0, 0, 0), 6, 'hex')
            capo = joinn([cap, hx], A + f'__{side}_fork_cap'); finish(capo, 0.06, 2, m=M('gunmetal'))
            adj = lathe_z([(0.001, 80.5), (1.1, 80.5), (1.1, 81.3), (0.8, 81.5), (0.001, 81.5)], A + f'__{side}_' + ('compression_adjuster' if s < 0 else 'rebound_adjuster'),
                          (0, y, 0), segs=24)
            finish(adj, 0.05, 2, m=M('gold_anod') if s < 0 else M('red_anod'))
        LRc = OR
    # triple clamps and steering stem
    clamp(A + '__lower_triple_clamp', 60.0, 63.5, LRc, stem_x, clamp_m)
    clamp(A + '__top_triple_clamp', 75.0, 77.4, LRc, stem_x, clamp_m, top=True)
    stem = cyl(1.55, 19.5, (stem_x, 0, 67.75), (0, 0, 0), 48, A + '__steering_stem'); finish(stem, 0.05, 2, m=M('steel'))
    brg = lathe_z([(1.55, 63.5), (2.9, 63.5), (2.6, 64.6), (1.55, 64.6)], A + '__head_bearing', (stem_x, 0, 0), segs=48); finish(brg, 0.04, 2, m=M('chrome'))
    sn = cyl(2.2, 1.2, (stem_x, 0, 78.0), (0, 0, 0), 6, A + '__stem_nut'); finish(sn, 0.08, 2, m=chrome)
    wsh = cyl(2.5, 0.2, (stem_x, 0, 77.5), (0, 0, 0), 48, A + '__stem_washer'); finish(wsh, 0.03, 1, m=M('zinc'))
    # axle
    ax = cyl(1.25, 2 * TRACK + 7.5, (0, 0, 0), RY, 48, A + '__axle'); finish(ax, 0.05, 2, m=M('steel'))
    hd = cyl(1.65, 0.9, (0, -(TRACK + 3.9), 0), RY, 6, A + '__axle_head'); finish(hd, 0.08, 2, m=M('zinc'))
    # apply rake around the axle (top leans back)
    transform_all(mathutils.Matrix.Rotation(-RAKE, 4, 'Y'))

def build():
    build_fork(A, usd=False)
