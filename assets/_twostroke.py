"""Shared two-stroke cylinder (air-cooled 125 cc, Schnurle-scavenged) for port_ex and port_tr cutaways."""
import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *

B = 2.7           # bore radius
LO, LI = 3.02, 2.7
ZT = 9.6          # barrel top / head gasket
WIN_BOT = 4.0     # piston crown at BDC
EX_TOP = 7.0
TR_TOP = 5.6
TRANSFERS = [(100, 1.7), (-100, 1.7), (138, 1.3), (-138, 1.3)]   # (angle from exhaust, window width)


def radial_box(ang, r0, r1, width, z0, z1, name, tilt=0.0):
    a = rad(ang); rc = (r0 + r1) / 2
    return box((r1 - r0, width, z1 - z0), (rc * math.cos(a), rc * math.sin(a), (z0 + z1) / 2), (0, tilt, a), name)


def build_cylinder(prefix, cutter, M, piston_z=None):
    def n(s): return f'{prefix}__{s}'
    cast = noisy_mat('cyl2t_cast', (0.40, 0.40, 0.41), 1.0, 0.5, 0.08, 90, 0.14)
    liner_m = noisy_mat('nikasil', (0.62, 0.62, 0.63), 1.0, 0.22, 0.04, 400, 0.02)
    # barrel: round core with square fins, base flange, exhaust and intake bosses
    core = lathe([(0, 0), (4.5, 0), (4.5, ZT), (0, ZT)], 'barrel', cast, (0, 0, 0), 'Z', 96)
    fins = []
    z = 1.3
    while z < ZT - 0.3:
        f = slab(rrect(12.6, 12.0, 2.8, 5), 0.3, 'fin', cast, 'XY', z); finish(f, 0.13, 2); fins.append(bake(f)); z += 0.82
    base = slab(rrect(10.4, 10.0, 1.6, 4), 0.9, 'base', cast, 'XY', 0.45); finish(base, 0.12, 2)
    exb = lathe([(0, 0), (2.25, 0), (2.25, 3.8), (0, 3.8)], 'exboss', cast, (3.0, 0, 5.9), 'X', 64)
    exf = slab(rrect(5.8, 4.6, 0.9, 4), 1.0, 'exflange', cast, 'YZ', 7.0); exf.location.z = 5.9
    inb = lathe([(0, 0), (2.0, 0), (2.0, 2.6), (0, 2.6)], 'inboss', cast, (-3.6, 0, 1.9), '-X', 64)
    inf = slab(rrect(5.0, 4.0, 0.9, 4), 0.8, 'inflange', cast, 'YZ', -6.2); inf.location.z = 1.9
    for o in (core, base, exb, exf, inb, inf): finish(o, 0.12, 2)
    parts = [bake(o) for o in (base, exb, exf, inb, inf)] + fins
    core = bake(core)
    bmulti(core, parts, 'UNION'); core = bake(core)
    # bore, ducts, transfer channels, studs
    cuts = [cyl(LO - 0.002, 30, (0, 0, 5), (0, 0, 0), 96, '_bore')]
    ex = tube([(2.0, 0, (WIN_BOT + EX_TOP) / 2), (4.4, 0, 6.0), (7.8, 0, 5.9)], 1.25, '_exduct', None, 6)
    cuts.append(bake(ex))
    cuts.append(radial_box(0, 2.0, 4.6, 3.3, WIN_BOT, EX_TOP, '_exwin'))
    it = tube([(-2.0, 0, 1.4), (-4.2, 0, 1.8), (-7.0, 0, 1.9)], 1.25, '_induct', None, 6)
    cuts.append(bake(it))
    cuts.append(radial_box(180, 2.0, 4.3, 3.2, 0.5, 2.6, '_inwin'))
    for ang, w in TRANSFERS:
        cuts.append(radial_box(ang, LO - 0.05, LO + 1.1, w, -0.5, TR_TOP - 0.25, '_chan'))
        cuts.append(radial_box(ang, LO - 0.05, LO + 0.65, w, TR_TOP - 0.6, TR_TOP, '_chantop', 0.0))
    for sx in (-1, 1):
        for sy in (-1, 1):
            cuts.append(cyl(0.42, 30, (sx * 3.9, sy * 3.9, 5), (0, 0, 0), 24, '_stud'))
    bmulti(core, cuts)
    core = section(core, cutter, M.section); core.name = n('barrel')
    # liner with windows
    lin = lathe([(LI, -1.2), (LO, -1.2), (LO, ZT), (LI, ZT)], 'liner', liner_m, (0, 0, 0), 'Z', 128)
    lw = [radial_box(0, 2.3, 3.4, 3.3, WIN_BOT, EX_TOP, '_w'), radial_box(180, 2.3, 3.4, 3.2, 0.5, 2.6, '_w')]
    lw += [radial_box(a, 2.3, 3.4, w, WIN_BOT, TR_TOP, '_w', 0.0) for a, w in TRANSFERS]
    bmulti(lin, lw); finish(lin, 0.02, 1)
    lin = section(lin, cutter, M.section); lin.name = n('liner')
    # bridge-less exhaust window gets chamfered edge look via a thin bevel already; head
    head = lathe([(0, ZT), (4.6, ZT), (4.6, ZT + 2.2), (3.6, ZT + 2.9), (1.0, ZT + 3.1), (0, ZT + 3.1)], 'head', cast, (0, 0, 0), 'Z', 96)
    hf = []
    for k in range(4):
        zz = ZT + 0.55 + k * 0.62
        f = slab(rrect(12.6 - k * 0.9, 12.0 - k * 0.9, 2.6, 5), 0.3, 'hfin', cast, 'XY', zz); finish(f, 0.13, 2); hf.append(bake(f))
    hb = slab(rrect(10.4, 10.0, 1.6, 4), 0.7, 'hbase', cast, 'XY', ZT + 0.35); finish(hb, 0.1, 2); hf.append(bake(hb))
    finish(head, 0.1, 2); head = bake(head); bmulti(head, hf, 'UNION'); head = bake(head)
    ch = lathe([(0, ZT - 0.01), (B + 0.01, ZT - 0.01), (B, ZT + 0.05), (1.7, ZT + 0.22), (1.2, ZT + 0.75), (0, ZT + 0.95)], '_chamber', None, (0, 0, 0), 'Z', 64)
    hc = [ch, cyl(0.62, 6, (0, 0, ZT + 3), (0, 0, 0), 32, '_plug')] + [cyl(0.42, 30, (sx * 3.9, sy * 3.9, 5), (0, 0, 0), 24, '_hs') for sx in (-1, 1) for sy in (-1, 1)]
    bmulti(head, hc)
    head = section(head, cutter, M.section); head.name = n('head')
    # spark plug, studs and nuts, exhaust studs
    cer = mat('ceramic', (0.85, 0.83, 0.78), 0.0, 0.2, coat=0.6)
    pl = [lathe([(0, ZT + 0.6), (0.6, ZT + 0.6), (0.6, ZT + 3.2), (0, ZT + 3.2)], 'pb', M.zinc, (0, 0, 0), 'Z', 32)]
    h = cyl(0.95, 0.85, (0, 0, ZT + 3.55), (0, 0, 0), 6, 'ph'); finish(h, 0.06, 2, m=M.zinc); pl.append(h)
    pl.append(lathe([(0, ZT + 3.9), (0.52, ZT + 3.9), (0.5, ZT + 5.6), (0.35, ZT + 6.0), (0, ZT + 6.05)], 'pi', cer, (0, 0, 0), 'Z', 32))
    pl.append(lathe([(0, ZT + 6.0), (0.3, ZT + 6.0), (0.3, ZT + 6.6), (0, ZT + 6.7)], 'pt', M.chrome, (0, 0, 0), 'Z', 24))
    pl = J(pl, 'plug'); pl = section(pl, cutter, M.section, selfi=True); pl.name = n('spark_plug')
    st = J([lathe([(0, -1.0), (0.4, -1.0), (0.4, ZT + 3.2), (0.3, ZT + 3.4), (0, ZT + 3.4)], 'stud', M.steel, (sx * 3.9, sy * 3.9, 0), 'Z', 24)
            for sx in (-1, 1) for sy in (-1, 1)], 'studs')
    st = section(st, cutter, M.section); st.name = n('studs')
    nuts = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            nuts += hexbolt((sx * 3.9, sy * 3.9, ZT + 2.25), (0, 0, 1), 0.62, M.chrome, 'nut')
    nuts = J(nuts, 'nuts'); nuts = section(nuts, cutter, M.section); nuts.name = n('head_nuts')
    pist = None
    if piston_z is not None:
        pm = noisy_mat('piston2t', (0.80, 0.80, 0.80), 1.0, 0.26, 0.06, 220, 0.03)
        pist = lathe([(0, piston_z + 0.25), (2.0, piston_z + 0.18), (B - 0.01, piston_z), (B - 0.01, piston_z - 0.35), (B - 0.09, piston_z - 0.35),
                      (B - 0.09, piston_z - 0.5), (B - 0.01, piston_z - 0.5), (B - 0.01, piston_z - 5.2), (B - 0.25, piston_z - 5.2), (B - 0.25, piston_z - 0.9), (0, piston_z - 0.7)],
                     'piston', pm, (0, 0, 0), 'Z', 96)
        rg = lathe([(B - 0.15, piston_z - 0.36), (B, piston_z - 0.36), (B, piston_z - 0.49), (B - 0.15, piston_z - 0.49)], 'ring', M.iron, (0, 0, 0), 'Z', 96)
        pist = J([pist, rg], 'pist'); pist = section(pist, cutter, M.section, selfi=True); pist.name = n('piston')
    return core
