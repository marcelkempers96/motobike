import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Cylinder and head (quarter cutaway)", "category": "powertrain", "kind": "part", "view": (-40, 22)}
A = 'cylinder'
B = 2.6          # bore radius
ZH = 9.0         # head gasket plane
VI = rad(20)     # valve included half-angle


def finned_block(core_pts, z0, z1, fin_w, fin_h, fin_r, fz0, fz1, pitch, th, m, name):
    core = slab(core_pts, z1 - z0, name, m, 'XY', (z0 + z1) / 2)
    fins = []
    z = fz0
    while z <= fz1 + 1e-6:
        f = slab(rrect(fin_w, fin_h, fin_r, 5), th, 'fin', m, 'XY', z)
        finish(f, th * 0.45, 2); fins.append(bake(f)); z += pitch
    finish(core, 0.15, 2); core = bake(core)
    bcut(core, J(fins, '_fins'), 'UNION')
    return bake(core)


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    cast = noisy_mat('cyl_cast', (0.50, 0.50, 0.51), 1.0, 0.48, 0.08, 90, 0.14)
    liner_m = noisy_mat('liner_iron', (0.30, 0.30, 0.31), 1.0, 0.30, 0.05, 300, 0.03)
    guide_m = M.bronze
    cutq = box((40, 40, 60), (-20, -20, 10), name='_quarter')
    # ---------------- barrel
    bar = finned_block(rrect(8.2, 8.2, 3.2, 6), 0.0, ZH, 12.0, 11.0, 2.4, 1.6, 8.3, 0.85, 0.32, cast, 'barrel')
    base = slab(rrect(9.6, 9.0, 1.6, 4), 0.9, '_base', cast, 'XY', 0.45); finish(base, 0.12, 2); base = bake(base)
    bcut(bar, base, 'UNION'); bar = bake(bar)
    bore = cyl(B + 0.35, 30, (0, 0, 5), (0, 0, 0), 96, '_bore')
    st = J([cyl(0.42, 30, (sx * 3.75, sy * 3.5, 5), (0, 0, 0), 24, '_stud') for sx in (-1, 1) for sy in (-1, 1)], '_studs')
    tun = box((2.6, 1.6, 30), (0, 4.4, 5), name='_chaintunnel')
    bcut(bar, bore); bcut(bar, st); bcut(bar, tun)
    bar = section(bar, cutq, M.section); bar.name = n('barrel')
    liner = lathe([(B, -1.0), (B + 0.35, -1.0), (B + 0.35, ZH), (B, ZH)] + [(B, -1.0)], 'liner', liner_m, (0, 0, 0), 'Z', 96)
    liner = section(liner, cutq, M.section); liner.name = n('liner')
    studs = [lathe([(0, -1.0), (0.4, -1.0), (0.4, 16.2), (0.3, 16.4), (0, 16.4)], 'stud', M.steel, (sx * 3.75, sy * 3.5, 0), 'Z', 24) for sx in (-1, 1) for sy in (-1, 1)]
    studs = J(studs, 'studs'); studs = section(studs, cutq, M.section); studs.name = n('studs')
    nuts = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            if sx < 0 and sy < 0: continue
            nuts += hexbolt((sx * 3.75, sy * 3.5, 15.55), (0, 0, 1), 0.62, M.chrome, 'nut')
    J(nuts, n('head_nuts'))
    # ---------------- head with combustion chamber, ports, guides
    head = finned_block(rrect(9.2, 9.0, 2.0, 5), ZH, 15.5, 12.4, 11.4, 2.4, ZH + 0.7, 13.0, 0.85, 0.32, cast, 'head')
    cham = lathe([(0, 0), (B + 0.02, 0), (B - 0.25, 0.3), (2.0, 0.85), (1.2, 1.25), (0, 1.4)], '_chamber', None, (0, 0, ZH - 0.001), 'Z', 64)
    cuts = [cham]
    vin = V((-math.sin(VI), 0, math.cos(VI))); vex = V((math.sin(VI), 0, math.cos(VI)))
    pin_ = V((-1.15, 0, ZH + 0.95)); pex = V((1.2, 0, ZH + 0.92))
    ip = tube([tuple(pin_ + vin * 0.2), tuple(pin_ + vin * 1.6 + V((-0.4, 0, 0))), (-6.8, 0, ZH + 3.2)], 0.92, '_inport', None, 6)
    ep = tube([tuple(pex + vex * 0.2), tuple(pex + vex * 1.2 + V((0.6, 0, 0))), (6.9, 0, ZH + 1.6)], 0.82, '_export', None, 6)
    cuts += [bake(ip), bake(ep)]
    for p, v, rh in ((pin_, vin, 0.98), (pex, vex, 0.85)):
        cuts.append(cyl(0.33, 6.0, tuple(p + v * 3.0), (0, 0, 0), 24, '_guidebore'))
        cuts[-1].rotation_euler = v.to_track_quat('Z', 'Y').to_euler()
    cav = box((8.0, 6.6, 1.9), (0, 0, 14.35), name='_rockerbox'); cuts.append(cav)
    sp_dir = V((0.25, -1, 0.7)).normalized(); sp_p = V((0.3, -1.2, ZH + 1.0))
    spb = cyl(0.62, 9, tuple(sp_p + sp_dir * 4.4), (0, 0, 0), 32, '_plughole'); spb.rotation_euler = sp_dir.to_track_quat('Z', 'Y').to_euler(); cuts.append(spb)
    bcut(head, cyl(B + 0.02, 0.6, (0, 0, ZH - 0.3 + 0.001), (0, 0, 0), 96, '_deck'))
    for c in cuts: bcut(head, c)
    bcut(head, st)
    head = section(head, cutq, M.section); head.name = n('head')
    # intake / exhaust stub flanges
    inf = slab(rrect(1.0, 3.2, 0.4, 4), 1.0, 'inflange', cast, 'YZ', -6.6, (0, 0, 0)); inf.location = (0, 0, ZH + 3.2)
    exf = slab(rrect(3.6, 2.6, 0.6, 4), 0.8, 'exflange', cast, 'YZ', 6.4); exf.location = (0, 0, ZH + 1.6)
    for f in (inf, exf): finish(f, 0.1, 2)
    exf = bake(exf); inf = bake(inf)
    bcut(exf, cyl(0.85, 4, (6.4, 0, ZH + 1.6), RX, 48, '_exh')); bcut(inf, cyl(0.95, 4, (-6.6, 0, ZH + 3.2), RX, 48, '_inh'))
    fl = J([inf, exf], 'flanges'); fl = section(fl, cutq, M.section, selfi=True); fl.name = n('port_flanges')
    # cover on the rocker box
    cv = slab(rrect(8.6, 7.0, 1.6, 5), 0.9, 'cover', M.black, 'XY', 15.9); finish(cv, 0.3, 3); cv = section(cv, cutq, M.section)
    cv.name = n('rocker_cover')
    # valve guides (bronze), seats, valves, springs, retainers (moving parts left whole)
    gd, seats, valves, springs, rets = [], [], [], [], []
    for p, v, rh in ((pin_, vin, 0.98), (pex, vex, 0.85)):
        q = v.to_track_quat('Z', 'Y').to_euler()
        g = lathe([(0.17, 0), (0.33, 0), (0.33, 2.9), (0.28, 3.0), (0.17, 3.0)] + [(0.17, 0)], 'guide', guide_m, tuple(p + v * 1.7), 'Z', 32)
        g.rotation_euler = q; gd.append(g)
        s = lathe([(rh - 0.08, 0), (rh + 0.12, 0), (rh + 0.12, 0.25), (rh - 0.02, 0.25), (rh - 0.08, 0.1)] + [(rh - 0.08, 0)], 'seat', M.iron, tuple(p - v * 0.08), 'Z', 64)
        s.rotation_euler = q; seats.append(s)
        k = rh / 1.3
        vp = [(0, -0.1), (rh, -0.1), (rh, 0.0), (rh - 0.06, 0.08), (1.0 * k, 0.28), (0.7 * k, 0.5), (0.4, 0.9), (0.18, 1.6), (0.17, 5.1), (0.14, 5.2), (0, 5.2)]
        vv = lathe(vp, 'valve', M.steel, tuple(p), 'Z', 64); vv.rotation_euler = q; valves.append(vv)
        sp = coil(0.6, 0.36, 6.5, 0.07, tuple(p + v * 2.65), M.spring, 'vspring', 20, 1, ground_ends=True); sp.rotation_euler = q; springs.append(sp)
        rt = lathe([(0.17, 0), (0.75, 0), (0.75, 0.12), (0.4, 0.32), (0.17, 0.32)] + [(0.17, 0)], 'ret', M.chrome, tuple(p + v * 4.62), 'Z', 32)
        rt.rotation_euler = q; rets.append(rt)
    g = J(gd, 'guides'); g = section(g, cutq, M.section, selfi=True); g.name = n('valve_guides')
    s = J(seats, 'seats'); s = section(s, cutq, M.section); s.name = n('valve_seats')
    vv = J(valves[:1], n('valve_intake')); J(valves[1:], n('valve_exhaust'))
    J(springs, n('valve_springs')); J(rets, n('spring_retainers'))
    # camshaft and rockers in the rocker box
    cs = [lathe([(0, -3.0), (0.42, -3.0), (0.42, 3.0), (0, 3.0)], 'camshaft', M.ground, (0, 0, 14.3), 'Y', 32)]
    for yy in (-0.6, 0.6):
        lobe = slab(hull(circ(0, 0, 0.62, 32) + circ(0.0, 0.42, 0.35, 16)), 0.55, 'lobe', M.ground, 'XZ', yy); lobe.location = (0, 0, 14.3)
        cs.append(lobe)
    for o in cs[1:]: finish(o, 0.03, 2)
    J(cs, n('camshaft'))
    rk = []
    for p, v, sgn in ((pin_, vin, -1), (pex, vex, 1)):
        tip = p + v * 5.2
        rk.append(tube([(sgn * 0.35, 0, 14.95), tuple((V((sgn * 0.35, 0, 14.95)) + tip) / 2 + V((0, 0, 0.35))), tuple(tip + V((0, 0, 0.15)))], 0.22, 'rocker', M.forged, 4))
    rk = [bake(r_) for r_ in rk]
    J(rk, n('rockers'))
    # spark plug in its boss
    pl = lathe([(0, 0), (0.55, 0), (0.55, 1.4), (0.75, 1.4), (0.75, 1.7), (0, 1.7)], 'plugbody', M.zinc, tuple(sp_p + sp_dir * 1.6), 'Z', 32)
    pl.rotation_euler = sp_dir.to_track_quat('Z', 'Y').to_euler()
    hx = cyl(0.9, 0.8, tuple(sp_p + sp_dir * 3.75), (0, 0, 0), 6, 'plughex'); hx.rotation_euler = pl.rotation_euler; finish(hx, 0.05, 2, m=M.zinc)
    cer = mat('ceramic', (0.85, 0.83, 0.78), 0.0, 0.2, coat=0.6)
    ins = lathe([(0, 0), (0.5, 0), (0.48, 2.0), (0.35, 2.4), (0, 2.45)], 'plugins', cer, tuple(sp_p + sp_dir * 4.15), 'Z', 32); ins.rotation_euler = pl.rotation_euler
    J([pl, hx, ins], n('spark_plug'))
    finalize(A)
