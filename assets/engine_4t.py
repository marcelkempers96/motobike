import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Four-stroke horizontal single engine", "category": "powertrain", "kind": "part", "view": (158, 16)}
A = 'engine_4t'
TILT = rad(10)
CD = V((math.cos(TILT), 0, math.sin(TILT)))      # cylinder axis (forward, slightly up)
CL = V((-12.5, 0, -1.0))                          # clutch / countershaft centre in side view


def P(t, up=0.0, side=0.0):
    """Point on the cylinder axis at distance t from the crank, offset up (perp, in XZ) and sideways (Y)."""
    upv = V((-math.sin(TILT), 0, math.cos(TILT)))
    return CD * t + upv * up + V((0, side, 0))


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    blk = noisy_mat('case_black', (0.03, 0.03, 0.033), 0.15, 0.44, 0.07, 60, 0.08)
    blk.node_tree.nodes['Principled BSDF'].inputs['Coat Weight'].default_value = 0.35
    fin_m = noisy_mat('fin_black', (0.028, 0.028, 0.03), 0.1, 0.5, 0.08, 90, 0.12)
    finedge = brushed(mat('fin_edge', (0.75, 0.75, 0.77), 1.0, 0.22), 'X', 0.4)
    silver = noisy_mat('intake_alu', (0.78, 0.78, 0.80), 1.0, 0.28, 0.05, 160, 0.04)
    starter_m = brushed(mat('starter_body', (0.80, 0.80, 0.82), 1.0, 0.18), 'Y', 0.7)
    # ================= crankcase halves with parting flange
    outline = hull(circ(0, 0, 10.2, 48) + circ(CL.x, CL.z, 9.0, 48) + circ(-5.5, -7.8, 6.2, 32) + circ(-7.0, 5.0, 7.5, 32))
    case = slab(outline, 16.0, 'case', blk, 'XZ'); finish(case, 1.6, 4)
    flange = slab(hull(circ(0, 0, 10.45, 48) + circ(CL.x, CL.z, 9.25, 48) + circ(-5.5, -7.8, 6.45, 32) + circ(-7.0, 5.0, 7.75, 32)), 0.5, 'flange', blk, 'XZ')
    finish(flange, 0.15, 2)
    # mounting lugs
    lugs = []
    for (x, z) in ((-3.0, 11.6), (-20.5, 5.5), (-19.0, -8.0)):
        lg = slab(hull(circ(x, z, 1.5, 24) + circ(x * 0.85, z * 0.85, 2.2, 24)), 3.0, 'lug', blk, 'XZ'); finish(lg, 0.3, 2)
        lg = bake(lg); bcut(lg, cyl(0.65, 5, (x, 0, z), RY, 24, '_lughole')); lugs.append(bake(lg))
    case = J([case, flange] + lugs, n('crankcase'))
    drain = hexbolt((-5.5, 0, -13.95), (0, 0, -1), 0.7, M.chrome, 'drain')
    J(drain, n('drain_plug'))
    # ================= right (clutch side, +Y) cover with round badge
    rco = hull(circ(0.6, 0, 9.4, 48) + circ(CL.x, CL.z, 8.4, 48) + circ(-4.5, -7.6, 5.3, 32))
    rc = slab(rco, 3.4, 'rcover', blk, 'XZ', 8.0 + 1.7); finish(rc, 1.5, 5)
    dome = lathe([(0, 0), (6.4, 0), (6.4, 0.6), (5.8, 1.5), (4.6, 1.9), (0, 2.0)], 'dome', blk, (-1.8, 11.3, -0.4), 'Y', 96)
    rcov = J([rc, dome], n('clutch_cover'))
    badge_m = mat('badge_black', (0.012, 0.012, 0.014), 0.3, 0.18, coat=0.8)
    bd = lathe([(0, 0), (4.0, 0), (4.0, 0.25), (3.8, 0.35), (0, 0.35)], 'badge', badge_m, (-1.8, 13.28, -0.4), 'Y', 96)
    br = lathe([(3.9, 0), (4.35, 0), (4.35, 0.3), (4.2, 0.48), (3.9, 0.42)], 'badgering', M.chrome, (-1.8, 13.25, -0.4), 'Y', 96)
    J([bd, br], n('badge'))
    oc = [lathe([(0, 0), (1.3, 0), (1.3, 0.9), (1.1, 1.1), (0, 1.1)], 'oilcap', blk, (6.2, 10.6, 5.6), (0, 1, 0.35), 48)]
    t = box((2.8, 0.7, 0.8), (0, 0, 0), name='tbar'); finish(t, 0.2, 3, m=blk); place([t], V((6.2, 10.6, 5.6)) + V((0, 1, 0.35)).normalized() * 1.4, (0, 1, 0.35)); oc.append(t)
    J(oc, n('oil_filler_cap'))
    scr = []
    for k in range(13):
        a = k * math.tau / 13
        # walk the cover outline: sample points slightly inside
        idx = int(k * len(rco) / 13)
        x, z = rco[idx]
        cx, cz = -5.0, -1.2
        dx, dz = x - cx, z - cz; L = math.hypot(dx, dz)
        x, z = cx + dx * (L - 1.0) / L, cz + dz * (L - 1.0) / L
        scr += hexbolt((x, 11.15, z), (0, 1, 0), 0.42, M.chrome, 'cs')
    J(scr, n('cover_bolts'))
    # ================= left (generator side, -Y) cover and output sprocket, gear pedal
    lc = lathe([(0, 0), (9.0, 0), (9.0, 1.0), (8.4, 2.2), (6.8, 3.0), (0, 3.2)], 'lcover', blk, (0.4, -8.0, 0.2), '-Y', 96)
    for k in range(8):
        a = k * math.tau / 8 + 0.2
        pass
    lsc = []
    for k in range(8):
        a = k * math.tau / 8 + 0.2
        lsc += hexbolt((0.4 + 8.4 * math.cos(a), -9.0, 0.2 + 8.4 * math.sin(a)), (0, -1, 0), 0.38, M.chrome, 'lcs')
    J([lc] + lsc, n('generator_cover'))
    spr = toothed('sprocket', (2.35, 2.75, 14, 0.18, 0.40), 0.8, 0.6, M.steel, (CL.x - 1.0, -8.6, CL.z - 2.5), 'Y', per=10)
    finish(spr, 0.03, 1)
    snut = cyl(1.0, 0.5, (CL.x - 1.0, -9.1, CL.z - 2.5), RY, 6, 'snut'); finish(snut, 0.05, 2, m=M.chrome)
    J([spr, snut], n('output_sprocket'))
    gp = [cyl(0.9, 2.0, (-6.5, -9.0, -7.5), RY, 32, 'gboss')]
    finish(gp[0], 0.1, 2, m=M.chrome)
    gp.append(tube([(-6.5, -10.0, -7.5), (-1.0, -11.2, -9.0), (5.0, -12.5, -10.0)], 0.42, 'garmf', M.chrome, 4))
    gp.append(tube([(-6.5, -10.0, -7.5), (-11.0, -11.2, -8.4), (-14.5, -12.5, -8.8)], 0.42, 'garmr', M.chrome, 4))
    for x, z in ((5.0, -10.0), (-14.5, -8.8)):
        pg = cyl(0.8, 2.6, (x, -13.6, z), RY, 32, 'gpeg'); finish(pg, 0.2, 3, m=M.rubber); gp.append(pg)
    J([bake(g) for g in gp], n('gear_pedal'))
    # ================= cylinder barrel and head (black, fins with machined edges)
    core = lathe([(0, 9.0), (4.2, 9.0), (4.2, 19.6), (0, 19.6)], 'barrel', fin_m, (0, 0, 0), 'Z', 64)
    fins, rims_o, rims_i = [], [], []
    z = 10.0
    while z < 19.2:
        f = slab(rrect(12.9, 11.8, 2.7, 5), 0.34, 'fin', fin_m, 'XY', z); finish(f, 0.12, 2); fins.append(bake(f))
        rims_o.append(slab(rrect(13.6, 12.5, 3.05, 5), 0.34, 'rim', finedge, 'XY', z))
        rims_i.append(slab(rrect(12.9, 11.8, 2.7, 5), 0.6, '_rimin', None, 'XY', z))
        z += 0.82
    tun = slab(rrect(3.4, 3.0, 1.2, 4), 10.4, 'chaintunnel', fin_m, 'XY', 14.4); tun.location = (-6.0, 0, 0); finish(tun, 0.5, 3)
    barrel = J([core] + fins + [bake(tun)], n('cylinder'))
    rim = J(rims_o, 'rims'); bcut(rim, J(rims_i, '_rimins'), selfi=False); finish(rim, 0.06, 2); rim.name = n('fin_edges')
    # head with fins, valve cover, tappet caps (local frame: +x = right side, +y = up, +z = along the cylinder)
    hd = slab(rrect(12.2, 11.4, 2.4, 5), 5.4, 'head', fin_m, 'XY', 22.4); finish(hd, 0.5, 3)
    hf = []
    for zz in (20.3, 21.15, 22.0, 22.85, 23.7):
        f = slab(rrect(14.4, 13.2, 3.2, 5), 0.36, 'hfin', fin_m, 'XY', zz); finish(f, 0.15, 2); hf.append(bake(f))
    cover = slab(rrect(10.4, 10.0, 2.6, 5), 1.6, 'vcover', blk, 'XY', 25.9); finish(cover, 0.6, 3)
    camc = lathe([(0, 0), (3.6, 0), (3.6, 0.8), (3.2, 1.3), (0, 1.4)], 'camcover', blk, (-6.9, 0, 22.4), '-X', 64)
    head = J([bake(hd)] + hf + [bake(cover), camc], n('head'))
    tap = []
    for up in (3.0, -3.0):
        tc = lathe([(0, 0), (1.7, 0), (1.7, 0.8), (1.5, 1.0), (0, 1.05)], 'tappet', M.alu, (0, up, 26.7), 'Z', 48)
        nut = cyl(0.8, 0.55, (0, up, 27.95), (0, 0, 0), 6, 'tnut'); finish(nut, 0.05, 2, m=M.alu)
        tap += [tc, nut]
    hn = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            hn += [lathe([(0, 0), (0.6, 0), (0.6, 0.5), (0.35, 0.85), (0, 0.9)], 'acorn', M.chrome, (sx * 3.9, sy * 3.7, 26.7), 'Z', 24)]
    tapo = J(tap, n('tappet_caps')); hno = J(hn, n('head_nuts'))
    pdir = V((1, 0.35, 0.15)).normalized()
    pl = lathe([(0, 0), (0.9, 0), (0.9, 0.7), (0, 0.7)], 'plughex', M.zinc, tuple(V((6.0, 0.6, 21.6))), tuple(pdir), 6)
    pc = lathe([(0, 0), (0.85, 0), (0.95, 1.0), (0.8, 3.2), (0.55, 3.6), (0, 3.6)], 'plugcap', M.rubber, tuple(V((6.0, 0.6, 21.6)) + pdir * 0.6), tuple(pdir), 32)
    plug = J([pl, pc], n('spark_plug_cap'))
    for o in [barrel, rim, head, tapo, hno, plug]:
        place([o], V((0, 0, 0)), CD)
    Rm = CD.to_track_quat('Z', 'Y').to_matrix()
    capend = Rm @ (V((6.0, 0.6, 21.6)) + pdir * 4.0)
    lead = tube([tuple(capend), tuple(capend + V((-1.0, 1.6, 1.2))), tuple(capend + V((-8.0, 1.5, -2.0))), tuple(capend + V((-16.0, -1.0, -5.0)))], 0.32, 'htlead', M.rubber, 4)
    J([bake(lead)], n('ht_lead'))
    # exhaust flange under the head, pipe curling down and back
    exf = slab(hull(circ(-2.4, 0, 0.75, 16) + circ(2.4, 0, 0.75, 16) + circ(0, 0, 1.9, 24)), 0.5, 'exfl', M.chrome, 'XY', 0)
    exn = hexbolt((-2.4, 0, 0.25), (0, 0, 1), 0.5, M.chrome, 'en') + hexbolt((2.4, 0, 0.25), (0, 0, 1), 0.5, M.chrome, 'en')
    exflange = J([exf] + exn, 'exflange')
    ef_pos = P(22.4, -6.4)
    place([exflange], ef_pos, V((math.sin(TILT), 0, -math.cos(TILT))))
    hp = cr_path([tuple(ef_pos), tuple(ef_pos + V((0.4, 0, -3.0))), tuple(ef_pos + V((-1.2, 1.5, -5.5))), tuple(ef_pos + V((-4.5, 2.5, -7.0)))], 8)
    pipe = tube([tuple(p) for p in hp], 1.4, 'expipe', M.chrome, 6, poly=True)
    J([exflange, bake(pipe)], n('exhaust_stub'))
    # ================= intake manifold (silver) and carburettor on top
    ip0 = P(22.0, 6.2)
    ipath = cr_path([tuple(ip0), tuple(ip0 + V((-0.6, 0, 3.0))), tuple(ip0 + V((-4.0, 0, 5.2))), tuple(ip0 + V((-8.6, 0, 5.6)))], 8)
    inlet = tube([tuple(p) for p in ipath], 1.25, 'intake', silver, 6, poly=True)
    ifl = lathe([(0, -0.3), (2.0, -0.3), (2.0, 0.3), (0, 0.3)], 'iflange', silver, (0, 0, 0), 'Z', 32)
    place([ifl], ip0, V((-math.sin(TILT), 0, math.cos(TILT))))
    J([bake(inlet), ifl], n('intake_manifold'))
    cpos = ipath[-1] + V((-2.4, 0, 0))
    carb = [lathe([(0, -2.6), (1.8, -2.6), (1.8, 2.6), (0, 2.6)], 'cbody', silver, tuple(cpos), 'X', 48),
            lathe([(0, 0), (1.7, 0), (1.7, 2.4), (1.4, 2.8), (0, 2.8)], 'ctop', silver, tuple(cpos + V((0.3, 0, 1.2))), 'Z', 48),
            lathe([(0, 0), (1.15, 0), (1.15, 0.8), (0.7, 1.1), (0, 1.1)], 'ccap', M.chrome, tuple(cpos + V((0.3, 0, 4.0))), 'Z', 32)]
    bowl = slab(rrect(3.6, 3.4, 0.9, 4), 2.6, 'cbowl', silver, 'XY', 0); bowl.location = cpos + V((0, 0, -2.6)); finish(bowl, 0.4, 3); carb.append(bowl)
    lev = box((3.0, 0.3, 0.9), tuple(cpos + V((0.6, 2.2, 0.9))), (0, rad(-25), 0), 'tlever'); finish(lev, 0.1, 2, m=M.chrome); carb.append(lev)
    ch = box((2.4, 0.3, 0.7), tuple(cpos + V((-1.2, -2.2, 1.0))), (0, rad(20), 0), 'choke'); finish(ch, 0.1, 2, m=M.chrome); carb.append(ch)
    for o in carb[:3]: finish(o, 0.15, 2)
    J(carb, n('carburettor'))
    cab = tube([tuple(cpos + V((0.3, 0, 5.0))), tuple(cpos + V((0.3, 0, 7.5))), tuple(cpos + V((-3.0, 0, 9.5)))], 0.3, 'tcable', M.rubber, 4)
    J([bake(cab)], n('throttle_cable'))
    ah0 = cpos + V((-2.6, 0, 0))
    ah = tube([tuple(ah0), tuple(ah0 + V((-3.0, 0, 0.6))), tuple(ah0 + V((-6.0, 0, 3.4)))], 1.8, 'airhose', M.rubber, 6)
    clamp = lathe([(1.82, -0.35), (2.0, -0.35), (2.0, 0.35), (1.82, 0.35)], 'hclamp', M.zinc, (0, 0, 0), 'Z', 48); place([clamp], ah0 + V((-0.8, 0, 0.1)), (-1, 0, 0.1))
    J([bake(ah), clamp], n('air_hose'))
    # ================= starter motor (behind the cylinder, on top of the case)
    so = V((-6.5, 0, 10.2))
    st = [lathe([(0, -4.2), (2.5, -4.2), (2.5, 3.4), (0, 3.4)], 'stbody', starter_m, tuple(so), 'Y', 64),
          lathe([(0, 3.4), (2.5, 3.4), (2.3, 4.2), (1.2, 4.6), (0, 4.6)], 'stcap', blk, tuple(so), 'Y', 64),
          lathe([(0, -4.9), (2.6, -4.9), (2.6, -4.2), (0, -4.2)], 'stflange', blk, tuple(so), 'Y', 64)]
    for k in (-1, 1):
        st.append(cyl(0.3, 9.6, tuple(so + V((0, 0.0, k * 2.15)) + V((0, -0.3, 0))), RY, 12, 'thru'))
        st[-1].data.materials.append(M.chrome)
    term = lathe([(0, 0), (0.7, 0), (0.7, 1.2), (0.4, 1.6), (0, 1.6)], 'stterm', M.rubber, tuple(so + V((0, 1.6, 2.3))), 'Z', 24)
    st.append(term)
    stc = tube([tuple(so + V((0, 1.6, 3.8))), tuple(so + V((-2.5, 2.5, 5.0))), tuple(so + V((-9.0, 4.0, 3.0)))], 0.35, 'stcable', M.rubber, 4)
    st.append(bake(stc))
    for o in st[:3]: finish(o, 0.12, 2)
    J(st, n('starter_motor'))
    # ================= kickstart lever (right rear)
    kb = V((CL.x - 1.5, 13.0, CL.z - 3.0))
    kick = [lathe([(0, 0), (1.2, 0), (1.2, 2.2), (1.0, 2.4), (0, 2.4)], 'kboss', M.chrome, tuple(kb + V((0, -2.0, 0))), 'Y', 32)]
    arm = tube([tuple(kb + V((0, 0.3, 0))), tuple(kb + V((-3.0, 0.8, 1.8))), tuple(kb + V((-9.0, 1.4, 6.0))), tuple(kb + V((-10.5, 1.4, 7.4)))], 0.55, 'karm', M.chrome, 6)
    kick.append(bake(arm))
    pe = kb + V((-10.6, 1.4, 7.5))
    ped = lathe([(0, 0), (0.95, 0), (0.95, 3.6), (0.7, 4.0), (0, 4.0)], 'kpedal', M.rubber, tuple(pe), (0, -1, 0), 32)
    rings = [torus(0.97, 0.1, tuple(pe + V((0, -0.6 - k * 0.55, 0))), RY, 'kgrip', 32, 6) for k in range(6)]
    for r_ in rings: r_.data.materials.append(M.rubber)
    pv = lathe([(0, 0), (0.6, 0), (0.6, 0.6), (0, 0.6)], 'kpivot', M.chrome, tuple(pe + V((0, 0.6, 0))), 'Y', 24)
    kbolt = hexbolt(tuple(kb + V((0, 0.55, 0))), (0, 1, 0), 0.55, M.chrome, 'kb')
    J(kick + [ped, pv] + rings + kbolt, n('kickstart'))
    # ================= external chrome oil pipe with banjo bolts (right side)
    o0 = V((5.5, 9.0, -5.2)); o1 = P(21.5, 1.6, 6.0)
    op = cr_path([tuple(o0), tuple(o0 + V((1.0, 0.6, 1.5))), tuple((o0 + o1) / 2 + V((0, 0.9, -2.0))), tuple(o1 + V((-1.5, 0.6, -1.0))), tuple(o1)], 8)
    pipe = tube([tuple(p) for p in op], 0.32, 'oilpipe', M.chrome, 4, poly=True)
    bj = hexbolt(tuple(o0 + V((0, 0.4, 0))), (0, 1, 0), 0.55, M.chrome, 'bj') + hexbolt(tuple(o1 + V((0, 0.4, 0))), (0, 1, 0), 0.55, M.chrome, 'bj')
    for p_ in (o0, o1):
        bb = cyl(0.65, 0.8, tuple(p_), RY, 24, 'banjo'); finish(bb, 0.1, 2, m=M.chrome); bj.append(bb)
    J([bake(pipe)] + bj, n('oil_pipe'))
    finalize(A)
