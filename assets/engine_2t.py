import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "125 cc two-stroke single engine", "category": "powertrain", "kind": "part", "view": (158, 14)}
A = 'engine_2t'
LEAN = rad(25)                        # cylinder leans forward
CD = V((math.sin(LEAN), 0, math.cos(LEAN)))


def cyl_place(objs):
    """Objects built in the cylinder frame (+z along the bore, +x forward/exhaust, +y right) -> world."""
    R = mathutils.Matrix.Rotation(LEAN, 4, 'Y')
    bpy.context.view_layer.update()
    for o in objs: o.matrix_world = R @ o.matrix_world
    return objs


def W(p):
    return mathutils.Matrix.Rotation(LEAN, 3, 'Y') @ V(p)


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    case_m = noisy_mat('case_alu', (0.66, 0.66, 0.67), 1.0, 0.42, 0.08, 110, 0.10)
    mag = noisy_mat('cover_mag', (0.22, 0.22, 0.23), 0.6, 0.45, 0.08, 120, 0.08)
    cyl_m = noisy_mat('cyl_black', (0.03, 0.03, 0.034), 0.1, 0.42, 0.06, 80, 0.06)
    cyl_m.node_tree.nodes['Principled BSDF'].inputs['Coat Weight'].default_value = 0.3
    head_m = brushed(mat('head_mach', (0.80, 0.80, 0.82), 1.0, 0.22), 'Z', 0.6)
    hose_m = mat('hose', (0.025, 0.025, 0.025), 0.0, 0.5)
    # ================= crankcase
    outl = hull(circ(0, 0, 8.4, 48) + circ(-11.5, -1.0, 7.4, 48) + circ(-17.5, 1.0, 5.6, 32) + circ(-5.0, -6.6, 5.4, 32))
    case = slab(outl, 14.0, 'case', case_m, 'XZ'); finish(case, 1.4, 4)
    fl = slab(hull(circ(0, 0, 8.65, 48) + circ(-11.5, -1.0, 7.65, 48) + circ(-17.5, 1.0, 5.85, 32) + circ(-5.0, -6.6, 5.65, 32)), 0.45, 'pfl', case_m, 'XZ')
    finish(fl, 0.12, 2)
    lugs = []
    for (x, z) in ((-21.5, 3.5), (-14.0, -8.5), (4.0, -7.0)):
        lg = slab(hull(circ(x, z, 1.4, 24) + circ(x * 0.8, z * 0.8, 2.0, 24)), 2.6, 'lug', case_m, 'XZ'); finish(lg, 0.3, 2)
        lg = bake(lg); bcut(lg, cyl(0.6, 5, (x, 0, z), RY, 24, '_lh')); lugs.append(bake(lg))
    J([case, fl] + lugs, n('crankcase'))
    J(hexbolt((-5.0, 0, -12.0), (0, 0, -1), 0.65, M.chrome, 'drain'), n('drain_plug'))
    # ================= right: clutch cover with inspection cap and water pump
    rco = hull(circ(-11.0, -0.8, 7.0, 48) + circ(-17.0, 1.0, 4.8, 32) + circ(-2.5, -3.5, 4.6, 32) + circ(-6.0, -6.0, 4.0, 24))
    rc = slab(rco, 3.0, 'rcover', mag, 'XZ', 7.0 + 1.5); finish(rc, 1.3, 5)
    dome = lathe([(0, 0), (5.2, 0), (5.2, 0.5), (4.6, 1.3), (0, 1.5)], 'cdome', mag, (-11.0, 9.9, -0.8), 'Y', 96)
    pump = lathe([(0, 0), (2.6, 0), (2.6, 0.9), (2.2, 1.5), (0, 1.6)], 'pump', mag, (-1.8, 9.9, -4.0), 'Y', 64)
    J([rc, dome, pump], n('clutch_cover'))
    ic = lathe([(0, 0), (2.3, 0), (2.3, 0.5), (2.1, 0.7), (0, 0.7)], 'insp', M.alu_mach, (-11.0, 11.35, -0.8), 'Y', 64)
    slot = box((2.6, 0.3, 0.5), (-11.0, 12.05, -0.8), name='slot'); slot.data.materials.append(M.black)
    J([ic, slot], n('inspection_cap'))
    bl = []
    for i in range(12):
        x, z = rco[int(i * len(rco) / 12)]
        cx, cz = -9.0, -1.5; dx, dz = x - cx, z - cz; L = math.hypot(dx, dz)
        bl += hexbolt((cx + dx * (L - 0.9) / L, 10.0, cz + dz * (L - 0.9) / L), (0, 1, 0), 0.38, M.chrome, 'rcb')
    for a in range(4):
        aa = a * math.tau / 4 + 0.4
        bl += hexbolt((-1.8 + 1.9 * math.cos(aa), 11.5, -4.0 + 1.9 * math.sin(aa)), (0, 1, 0), 0.3, M.chrome, 'pb')
    J(bl, n('cover_bolts'))
    # ================= left: ignition cover, sprocket, gear lever
    lc = lathe([(0, 0), (7.6, 0), (7.6, 0.8), (7.0, 2.0), (5.4, 2.8), (0, 3.0)], 'igncover', mag, (0.3, -7.0, 0.0), '-Y', 96)
    lb = []
    for k in range(6):
        a = k * math.tau / 6 + 0.3
        lb += hexbolt((0.3 + 7.0 * math.cos(a), -7.8, 7.0 * math.sin(a)), (0, -1, 0), 0.36, M.chrome, 'lcb')
    J([lc] + lb, n('ignition_cover'))
    spr = toothed('spr', (2.2, 2.6, 13, 0.18, 0.40), 0.8, 0.6, M.steel, (-12.5, -7.6, -3.2), 'Y', per=10); finish(spr, 0.03, 1)
    sn = cyl(0.95, 0.5, (-12.5, -8.1, -3.2), RY, 6, 'snut'); finish(sn, 0.05, 2, m=M.chrome)
    J([spr, sn], n('output_sprocket'))
    gl = [cyl(0.8, 1.6, (-8.0, -8.2, -5.0), RY, 24, 'gb')]; finish(gl[0], 0.1, 2, m=M.steel)
    gl.append(bake(tube([(-8.0, -9.0, -5.0), (-3.0, -10.0, -5.6), (3.0, -11.2, -5.2)], 0.4, 'garm', M.steel, 4)))
    tip = lathe([(0, 0), (0.6, 0), (0.6, 2.4), (0, 2.4)], 'gtip', M.steel, (3.0, -11.2, -5.2), (0, -1, 0), 24); gl.append(tip)
    J(gl, n('gear_lever'))
    # ================= cylinder (liquid-cooled block), power-valve housing, exhaust flange, reed block
    bl0 = slab(rrect(10.6, 10.0, 2.2, 5), 9.4, 'block', cyl_m, 'XY', 12.2); finish(bl0, 0.5, 3)
    base = slab(rrect(11.6, 11.0, 2.4, 5), 0.8, 'cbase', cyl_m, 'XY', 7.9); finish(base, 0.2, 2)
    exs = lathe([(0, 0), (2.4, 0), (2.4, 2.4), (0, 2.4)], 'exstub', cyl_m, (4.6, 0, 11.4), 'X', 64)
    exf = slab(rrect(5.2, 4.2, 1.2, 4), 0.8, 'exf', cyl_m, 'YZ', 7.3); exf.location.z = 11.4
    pvh = slab(rrect(3.2, 8.2, 1.0, 4), 3.0, 'pvh', cyl_m, 'XZ'); pvh.location = (5.6, 0, 14.6)
    rb = slab(rrect(6.0, 4.8, 1.2, 4), 1.6, 'reedblock', cyl_m, 'YZ', -6.1); rb.location.z = 10.0
    for o in (exs, exf, pvh, rb): finish(o, 0.25, 3)
    cylo = J([bl0, base, exs, exf, pvh, rb], 'cyl')
    bcut(cylo, cyl(1.5, 4, (7.4, 0, 11.4), RX, 48, '_exhole')); cylo = bake(cylo); reshade(cylo, 40); cylo.name = n('cylinder')
    pv = lathe([(0, 0), (2.0, 0), (2.0, 0.7), (1.6, 1.2), (0, 1.3)], 'pvcap', M.alu_mach, (5.0, 4.1, 14.6), 'Y', 64)
    pvb = []
    for k in range(3):
        a = k * math.tau / 3 + 0.5
        pvb += hexbolt((5.0 + 1.6 * math.cos(a), 5.4, 14.6 + 1.6 * math.sin(a)), (0, 1, 0), 0.26, M.chrome, 'pvb')
    link = box((0.3, 0.3, 3.2), (5.0, 5.6, 12.8), (0, rad(10), 0), 'pvlink'); finish(link, 0.06, 2, m=M.steel)
    pvo = J([pv, link] + pvb, n('power_valve_cover'))
    exstuds = []
    for sy in (-1, 1):
        exstuds += hexbolt((7.7, sy * 2.0, 11.4), (1, 0, 0), 0.45, M.chrome, 'exn')
    exo = J(exstuds, n('exhaust_studs'))
    # reed petals visible through the intake boot mouth are hidden; boot + carb
    boot = lathe([(0, -0.2), (2.2, -0.2), (2.2, 0.6), (2.0, 1.0), (2.05, 1.6), (1.85, 2.2), (1.9, 2.8), (1.8, 3.6), (0, 3.6)], 'boot', M.rubber, (-6.9, 0, 10.0), '-X', 64)
    bootc = lathe([(1.95, 0), (2.15, 0), (2.15, 0.5), (1.95, 0.5)], 'bclamp', M.zinc, (-9.6, 0, 10.0), '-X', 64)
    carb = [lathe([(0, 0), (1.9, 0), (1.9, 4.8), (0, 4.8)], 'cb', M.alu, (-10.5, 0, 10.0), '-X', 48),
            lathe([(0, 0), (1.8, 0), (1.8, 2.6), (1.4, 3.0), (0, 3.0)], 'ct', M.alu, (-12.6, 0, 11.2), (0, 0, 1), 48),
            lathe([(0, 0), (1.9, 0), (2.2, 1.4), (2.2, 1.9), (0, 1.9)], 'bell', M.alu, (-15.3, 0, 10.0), '-X', 48)]
    bwl = slab(rrect(3.6, 3.4, 1.0, 4), 2.8, 'cbowl', M.alu, 'XY', 0); bwl.location = (-12.6, 0, 7.4); finish(bwl, 0.35, 3); carb.append(bwl)
    for o in carb[:3]: finish(o, 0.12, 2)
    cylp = [cylo, pvo, exo, boot, bootc] + carb
    reed_carb = None
    # ================= head (machined alloy) with plug, coolant neck, nuts
    hd = slab(rrect(10.4, 9.8, 2.3, 5), 2.4, 'head', head_m, 'XY', 18.1); finish(hd, 0.6, 3)
    dm = lathe([(0, 0), (3.6, 0), (3.0, 1.0), (1.4, 1.5), (0, 1.55)], 'hdome', head_m, (0, 0, 19.3), 'Z', 64)
    neck = lathe([(0, 0), (0.95, 0), (0.95, 2.6), (1.1, 2.7), (1.1, 3.0), (0.95, 3.1), (0.95, 3.6), (0, 3.6)], 'neck', head_m, (-3.4, 0, 19.0), (-1, 0, 0.6), 32)
    hn = []
    for k in range(6):
        a = k * math.tau / 6 + PI / 6
        hn += [lathe([(0, 0), (0.55, 0), (0.55, 0.45), (0.3, 0.8), (0, 0.85)], 'hnut', M.chrome, (4.1 * math.cos(a), 4.1 * math.sin(a), 19.3), 'Z', 24)]
    ho = J([hd, dm, neck], n('head')); hno = J(hn, n('head_nuts'))
    pl = [lathe([(0, 0), (0.85, 0), (0.85, 0.7), (0, 0.7)], 'ph', M.zinc, (0, 0, 20.8), 'Z', 6),
          lathe([(0, 0), (0.8, 0), (0.9, 1.0), (0.75, 3.2), (0.5, 3.6), (0, 3.6)], 'pc', M.rubber, (0, 0, 21.4), (-0.3, 0, 1), 32)]
    plo = J(pl, n('spark_plug_cap'))
    cyl_place(cylp + [ho, hno, plo])
    for o in carb[:1]: pass
    J(carb, n('carburettor')); J([boot, bootc], n('intake_boot'))
    # ================= coolant hoses, HT lead, kickstart
    nk = W((-3.4, 0, 19.0)) + W(V((-1, 0, 0.6)).normalized() * 3.4)
    hz = tube([tuple(nk), tuple(nk + V((-3.0, 0, 1.4))), tuple(nk + V((-7.0, 0.5, 1.0)))], 1.0, 'hose1', hose_m, 6)
    pump_out = V((-1.8, 11.3, -4.0))
    cin = W((4.6, 5.0, 9.0))
    hz2 = tube([tuple(pump_out), tuple(pump_out + V((2.5, 0.6, 1.0))), tuple(cin + V((0, 1.6, -1.0))), tuple(cin)], 0.75, 'hose2', hose_m, 6)
    spig = lathe([(0, 0), (0.75, 0), (0.75, 1.4), (0, 1.4)], 'spig', cyl_m, tuple(cin + V((0, -1.2, 0))), 'Y', 24)
    J([bake(hz), bake(hz2), spig], n('coolant_hoses'))
    pe = W((0, 0, 21.4)) + W(V((-0.3, 0, 1)).normalized() * 3.6)
    J([bake(tube([tuple(pe), tuple(pe + V((-1.5, 0, 2.0))), tuple(pe + V((-6.0, 1.0, 1.5))), tuple(pe + V((-10.0, 2.0, 1.0)))], 0.3, 'ht', M.rubber, 4))], n('ht_lead'))
    kb = V((-16.5, 10.6, -1.5))
    kick = [lathe([(0, 0), (1.1, 0), (1.1, 2.0), (0, 2.0)], 'kboss', M.steel, tuple(kb + V((0, -1.0, 0))), 'Y', 32)]
    kick.append(bake(tube([tuple(kb + V((0, 1.0, 0))), tuple(kb + V((-3.5, 1.4, 2.5))), tuple(kb + V((-7.5, 1.8, 6.0)))], 0.5, 'karm', M.steel, 6)))
    kp = lathe([(0, 0), (0.9, 0), (0.9, 3.2), (0, 3.2)], 'kpeg', M.rubber, tuple(kb + V((-7.7, 1.4, 6.2))), (0, 1, 0), 32)
    kick += [kp] + hexbolt(tuple(kb + V((0, 1.05, 0))), (0, 1, 0), 0.5, M.chrome, 'kbb')
    J(kick, n('kickstart'))
    finalize(A)
