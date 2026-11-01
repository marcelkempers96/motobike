import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "EFI throttle body", "category": "powertrain", "kind": "part", "view": (-40, 20)}
A = 'throttle_body'
RB = 1.6
SX = -0.4      # butterfly shaft position along the bore


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    body_m = noisy_mat('tb_cast', (0.70, 0.70, 0.71), 1.0, 0.36, 0.07, 140, 0.07)
    green = mat('oring', (0.05, 0.22, 0.10), 0.0, 0.5)
    hose = M.rubber
    # ---- body
    tb = lathe([(0, -3.0), (2.3, -3.0), (2.45, -3.4), (2.3, -3.7), (2.2, -3.75), (2.2, -4.2), (0, -4.2)], 'tube', body_m, (0, 0, 0), 'X', 96)
    tb2 = lathe([(0, -3.05), (2.25, -3.05), (2.25, 2.8), (0, 2.8)], 'tube2', body_m, (0, 0, 0), 'X', 96)
    fl = slab(rrect(6.4, 5.4, 1.2, 5), 0.6, 'flange', body_m, 'YZ', 3.1)
    boss = lathe([(0, -3.0), (0.75, -3.0), (0.75, 3.0), (0, 3.0)], 'shaftboss', body_m, (SX, 0, 0), 'Y', 48)
    ib = lathe([(0, 0), (0.95, 0), (0.95, 2.4), (0, 2.4)], 'injboss', body_m, (1.2, 0, 1.2), (math.sin(rad(-28)), 0, math.cos(rad(-28))), 48)
    tp = slab(rrect(3.4, 3.6, 0.8, 5), 0.5, 'tpspad', body_m, 'XZ', -3.0); tp.location = (SX, 0, -0.2)
    ib2 = lathe([(0, 0), (0.55, 0), (0.55, 2.7), (0, 2.7)], 'idleboss', body_m, (-1.8, 0, 0), 'Z', 32)
    for o in (tb, tb2, fl, boss, ib, tp, ib2): finish(o, 0.08, 2)
    body = bake(tb2)
    bmulti(body, [bake(o) for o in (tb, fl, boss, ib, tp, ib2)], 'UNION'); body = bake(body)
    cuts = [lathe([(0, -5.0), (1.75, -5.0), (RB, -2.0), (RB, 4.0), (0, 4.0)], '_bore', None, (0, 0, 0), 'X', 96),
            cyl(0.21, 7, (SX, 0, 0), RY, 24, '_shafthole'),
            cyl(0.42, 4, (1.2 + 1.2 * math.sin(rad(-28)) * 0, 0, 1.2), (0, rad(-28), 0), 32, '_injhole')]
    cuts[-1].location = V((1.2, 0, 1.2)) + V((math.sin(rad(-28)), 0, math.cos(rad(-28)))) * 1.6
    for dy in (-1, 1):
        cuts.append(cyl(0.36, 3, (3.1, dy * 2.4, -1.6 * 0 + 1.6 * dy * 0 + (1.7 if dy > 0 else -1.7)), RX, 24, '_flhole'))
    bmulti(body, cuts); finish(body, 0.0, 1); body.name = n('body')
    # ---- butterfly on its shaft (part open)
    bf = cyl(RB - 0.02, 0.1, (SX, 0, 0), (0, PI / 2 - rad(28), 0), 96, 'butterfly'); finish(bf, 0.02, 2, m=M.alu_mach)
    sc = []
    for dz in (-0.55, 0.55):
        sc.append(cyl(0.16, 0.12, (SX + 0.07 * math.cos(rad(28)) + dz * math.sin(rad(28)) * 0, -0.0, 0), (0, 0, 0), 16, 'scr'))
    for o in sc: bpy.data.objects.remove(o)
    J([bf], n('butterfly'))
    sh = lathe([(0, -3.6), (0.2, -3.6), (0.2, 3.8), (0, 3.8)], n('shaft'), M.steel, (SX, 0, 0), 'Y', 24)
    # ---- throttle position sensor (left, -Y)
    ts = slab(rrect(3.0, 3.2, 0.7, 5), 1.0, 'tps', M.plastic, 'XZ', -3.75); ts.location = (SX, 0, -0.2); finish(ts, 0.12, 3)
    con = box((1.3, 1.1, 1.5), (SX - 1.2, -3.85, -1.9), (rad(15), 0, 0), 'conn'); finish(con, 0.08, 2, m=M.plastic)
    bcut(con, box((0.95, 0.75, 1.2), (SX - 1.2, -3.85, -2.4), (rad(15), 0, 0), '_connin'))
    scr = []
    for dx, dz in ((-1.05, 1.0), (1.05, -1.25)):
        scr += hexbolt((SX + dx, -4.25, -0.2 + dz), (0, -1, 0), 0.22, M.zinc, 'tpss', washer=False)
    J([ts, con] + scr, n('tps'))
    # ---- throttle pulley/cam with return spring and idle stop (right, +Y)
    cam = slab(hull(circ(0, 0, 0.9, 24) + circ(0, 0, 2.0, 36, rad(-20), rad(160))), 0.5, 'pulley', M.alu, 'XZ', 3.45); cam.location = (SX, 0, 0)
    finish(cam, 0.06, 2); cam = bake(cam)
    grv = J([torus(2.0, 0.12, (SX, 3.45, 0), RY, 'g', 64, 8)], '_groove'); bcut(cam, grv)
    nipple = cyl(0.22, 0.5, (SX + 2.0 * math.cos(rad(160)), 3.45, 2.0 * math.sin(rad(160))), RY, 16, 'nipple'); nipple.data.materials.append(M.brass)
    nut = cyl(0.42, 0.3, (SX, 3.85, 0), RY, 6, 'pnut'); finish(nut, 0.04, 2, m=M.zinc)
    J([cam, nipple, nut], n('pulley'))
    rs = coil(1.0, 0.13, 3.5, 0.06, (SX, 3.0, 0), M.spring, n('return_spring'), 24, 1); rs.rotation_euler = (-PI / 2, 0, 0)
    ss = lathe([(0, 0), (0.18, 0), (0.18, 1.8), (0.3, 1.8), (0.3, 2.2), (0, 2.2)], 'stop', M.zinc, (SX + 1.3, 3.45, 1.4), (0, 0, 1), 16)
    J([ss], n('idle_stop_screw'))
    # ---- injector with fuel cap and hose
    d = V((math.sin(rad(-28)), 0, math.cos(rad(-28)))); p0 = V((1.2, 0, 1.2)) + d * 1.0
    q = d.to_track_quat('Z', 'Y').to_euler()
    parts = [lathe([(0, 0), (0.38, 0), (0.42, 1.4), (0.5, 1.5), (0.5, 2.1), (0, 2.1)], 'injmetal', M.steel, tuple(p0), 'Z', 32),
             lathe([(0, 2.1), (0.62, 2.1), (0.62, 3.6), (0.45, 3.9), (0, 3.9)], 'injplastic', M.plastic, tuple(p0), 'Z', 32),
             lathe([(0.38, 1.6), (0.56, 1.6), (0.56, 1.8), (0.38, 1.8)], 'oring', green, tuple(p0), 'Z', 32)]
    for o in parts: o.rotation_euler = q
    cn = box((1.4, 1.0, 0.9), tuple(p0 + d * 3.0 + V((0, -0.9, 0))), q, 'injconn'); finish(cn, 0.08, 2, m=M.plastic)
    J(parts + [cn], n('injector'))
    cap = lathe([(0, 3.4), (0.8, 3.4), (0.8, 4.6), (0.6, 4.75), (0, 4.75)], 'fcap', M.alu, tuple(p0), 'Z', 48); cap.rotation_euler = q
    sp = lathe([(0, 0), (0.28, 0), (0.28, 1.6), (0.36, 1.7), (0.3, 1.8), (0, 1.8)], 'fsp', M.alu, tuple(p0 + d * 4.1), (1, 0, 0.2), 24)
    J([cap, sp], n('fuel_cap'))
    h0 = p0 + d * 4.1 + V((1.6, 0, 0.32))
    fh = tube([tuple(h0), tuple(h0 + V((1.6, 0, 0.4))), tuple(h0 + V((2.8, 0.6, 2.0)))], 0.42, n('fuel_hose'), hose, 6)
    il = lathe([(0, 0), (0.25, 0), (0.25, 0.6), (0.4, 0.6), (0.4, 1.2), (0, 1.2)], n('idle_air_screw'), M.brass, (-1.8, 0, 2.6), 'Z', 24)
    finalize(A)
