import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Wet multiplate clutch", "category": "transmission", "kind": "part", "view": (-38, 20)}
A = 'clutch'


def build(prefix=A, ex=False):
    M = mats()
    def n(s): return f'{prefix}__{s}'
    friction = noisy_mat('friction', (0.30, 0.20, 0.10), 0.0, 0.8, 0.1, 500, 0.25)
    plate = brushed(mat('plate_steel', (0.70, 0.70, 0.72), 1.0, 0.18), 'Y', 0.8)
    gear_m = noisy_mat('gear_steel', (0.62, 0.62, 0.64), 1.0, 0.22, 0.05, 300, 0.02)
    basket_m = noisy_mat('basket_alu', (0.70, 0.70, 0.71), 1.0, 0.34, 0.08, 150, 0.06)
    hub_m = noisy_mat('hub_alu', (0.78, 0.78, 0.79), 1.0, 0.26, 0.05, 200, 0.03)
    def E(v): return v if ex else 0.0
    # ---- basket with integral driven gear and damper springs
    cup = lathe([(1.2, 1.1), (4.05, 1.1), (4.05, -1.9), (3.68, -1.9), (3.68, 0.85), (1.2, 0.85)], 'cup', basket_m, (0, 0, 0), 'Y', 96)
    sl = []
    for i in range(6):
        a = i * math.tau / 6
        sl.append(box((1.0, 2.6, 0.95), (3.86 * math.cos(a), -0.68, 3.86 * math.sin(a)), (0, -a, 0), '_slot'))
    bcut(cup, J(sl, '_slots')); finish(cup, 0.04, 2)
    Nd, Np = 56, 19
    dg = toothed('dgear', (4.33, 4.6, Nd, 0.22, 0.36, rad(-20)), 1.15, 0.9, gear_m, (0, 1.5, 0), 'Y', per=6)
    finish(dg, 0.02, 1)
    win = []
    for i in range(6):
        a = i * math.tau / 6 + PI / 6
        win.append(box((1.1, 2, 0.55), (2.7 * math.cos(a), 1.5, 2.7 * math.sin(a)), (0, -a - PI / 2, 0), '_dwin'))
    bcut(dg, J(win, '_dwins'))
    basket = J([cup, dg], n('basket'))
    dsp = []
    for i in range(6):
        a = i * math.tau / 6 + PI / 6
        s = coil(0.22, 0.14, 7, 0.05, (0, 0, 0), M.spring, 'damper', 10, 1)
        s.location = (2.7 * math.cos(a) - 0.5 * math.sin(a) * 0, 1.5, 2.7 * math.sin(a))
        bpy.context.view_layer.update()
        s.rotation_euler = (0, -a - PI / 2 + PI / 2, 0)
        s.rotation_euler = V((-math.sin(a), 0, math.cos(a))).to_track_quat('Z', 'Y').to_euler()
        s.location = V((2.7 * math.cos(a), 1.5, 2.7 * math.sin(a))) - V((-math.sin(a), 0, math.cos(a))) * 0.5
        dsp.append(s)
    J(dsp, n('damper_springs'))
    # ---- primary drive gear on the crankshaft stub
    cx, cz = 5.99 * math.cos(rad(-20)), 5.99 * math.sin(rad(-20))
    pg = toothed('pgear', (1.38, 1.66, Np, 0.22, 0.36, rad(160) + PI / Np), 0.62, 0.9, gear_m, (cx, 1.5, cz), 'Y', per=12)
    finish(pg, 0.02, 1); pg.name = n('primary_gear')
    stub = lathe([(0, 0), (0.62, 0), (0.62, 3.2), (0.72, 3.25), (0.72, 4.6), (0, 4.6)], 'stub', M.ground, (cx, -0.4, cz), 'Y', 48)
    spl = toothed('stubspl', (0.5, 0.62, 14, 0.4, 0.5), 0.3, 1.5, M.ground, (cx, -0.25, cz), 'Y', per=6)
    nut = cyl(0.8, 0.5, (cx, 0.75, cz), RY, 6, 'stubnut'); finish(nut, 0.05, 2, m=M.steel)
    J([stub, spl, nut], n('crank_stub'))
    # ---- mainshaft
    ms = lathe([(0, -1.6), (0.85, -1.6), (0.85, 4.2), (0.7, 4.4), (0, 4.4)], 'ms', M.ground, (0, 0, 0), 'Y', 48)
    msp = toothed('msspl', (0.78, 0.9, 20, 0.4, 0.5), 0.5, 3.2, M.ground, (0, -0.1, 0), 'Y', per=6)
    J([ms, msp], n('mainshaft'))
    # ---- plates: 6 friction (tabs in basket slots) interleaved with 5 steel (teeth on hub)
    y = 0.75; fr_list, st_list = [], []
    for k in range(11):
        th = 0.28 if k % 2 == 0 else 0.16
        yc = y - th / 2 - E(5.0 + k * 1.15)
        if k % 2 == 0:
            p = toothed('fp', (3.55, 3.95, 6, 0.22, 0.25, 0.0), 2.62, th, friction, (0, yc, 0), 'Y', segs=192)
            finish(p, 0, 1); fr_list.append(p)
        else:
            p = toothed('sp', 3.5, (2.52, 2.39, 24, 0.4, 0.5), th, plate, (0, yc, 0), 'Y', per=5)
            finish(p, 0, 1); st_list.append(p)
        y -= th
    J(fr_list, n('friction_plates')); J(st_list, n('steel_plates'))
    # ---- clutch hub (centre) with spring towers
    hy = -E(3.2)
    hub = toothed('hub', (2.25, 2.37, 24, 0.4, 0.5), (0.9, 1.0, 20, 0.4, 0.5), 2.6, hub_m, (0, -0.5 + hy, 0), 'Y', per=8)
    back = lathe([(0.95, 0.8), (3.3, 0.8), (3.3, 0.55), (0.95, 0.55)], 'hubback', hub_m, (0, hy, 0), 'Y', 96)
    tw = []
    for i in range(4):
        a = i * math.tau / 4 + PI / 4
        tw.append(cyl(0.5, 1.1, (1.6 * math.cos(a), -1.95 + hy, 1.6 * math.sin(a)), RY, 32, 'tower'))
        tw[-1].data.materials.append(hub_m)
    for o in [hub, back] + tw: finish(o, 0.03, 2)
    J([hub, back] + tw, n('hub'))
    # ---- pressure plate
    py = -E(19.0)
    pp = lathe([(0.55, -1.8), (3.55, -1.8), (3.55, -2.15), (3.35, -2.32), (1.4, -2.32), (1.25, -2.7), (0.55, -2.7)], 'pp', hub_m, (0, py, 0), 'Y', 128)
    hs = []
    for i in range(4):
        a = i * math.tau / 4 + PI / 4
        hs.append(cyl(0.56, 3, (1.6 * math.cos(a), -2.0 + py, 1.6 * math.sin(a)), RY, 32, '_pph'))
        rib = box((1.4, 0.25, 0.3), (2.6 * math.cos(a + PI / 4), -2.4 + py, 2.6 * math.sin(a + PI / 4)), (0, -(a + PI / 4), 0), 'rib')
    bcut(pp, J(hs, '_pphs')); finish(pp, 0.03, 2)
    ribs = [o for o in bpy.context.scene.objects if o.name.startswith('rib')]
    for r_ in ribs: finish(r_, 0.08, 2, m=hub_m)
    J([pp] + ribs, n('pressure_plate'))
    # ---- springs, bolts, release bearing, lifter
    sy0 = -2.32 - E(21.5); by = -4.15 - E(24.5)
    sps, bls = [], []
    for i in range(4):
        a = i * math.tau / 4 + PI / 4
        x, z = 1.6 * math.cos(a), 1.6 * math.sin(a)
        s = coil(0.47, 0.3, 6.0, 0.08, (x, sy0, z), M.spring, 'cspring', 18, 1); s.rotation_euler = (PI / 2, 0, 0)
        sps.append(s)
        bls += hexbolt((x, by, z), (0, -1, 0), 0.42, M.chrome, 'cbolt')
        sh = cyl(0.25, 2.4, (x, by + 1.2, z), RY, 16, 'shank'); sh.data.materials.append(M.steel); bls.append(sh)
    J(sps, n('springs')); J(bls, n('spring_bolts'))
    ry = -E(26.5)
    brg = lathe([(0.45, -2.38), (1.08, -2.38), (1.08, -2.95), (0.45, -2.95), (0.45, -2.38)], 'brg', M.chrome, (0, ry, 0), 'Y', 64)
    race = lathe([(0.62, -2.37), (0.9, -2.37), (0.9, -2.96), (0.62, -2.96), (0.62, -2.37)], 'seal', M.plastic, (0, ry - 0.005, 0), 'Y', 64)
    J([brg, race], n('release_bearing'))
    ly = -E(28.5)
    lathe([(0, -2.6), (0.4, -2.6), (0.4, -4.3), (0.55, -4.4), (0.55, -4.9), (0, -4.9)], n('lifter'), M.ground, (0, ly, 0), 'Y', 32)
    finalize(prefix)
