"""PMSM / PMAC traction motor with a quarter cutaway (axis along Y, output sprocket on the left/-Y side)."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Electric motor (PMSM) cutaway", "category": "powertrain", "kind": "part", "view": (-38, 24)}
A = 'motor'

def lam_mat(name, base):
    m = mat(name, base, 1.0, 0.34); nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); w = nt.nodes.new('ShaderNodeTexWave')
    w.wave_type = 'BANDS'; w.bands_direction = 'Y'; w.inputs['Scale'].default_value = 6.0; w.inputs['Distortion'].default_value = 0.0
    nt.links.new(tc.outputs['Object'], w.inputs['Vector'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.25; bp.inputs['Distance'].default_value = 0.01
    nt.links.new(w.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = 0.26; mr.inputs['To Max'].default_value = 0.42
    nt.links.new(w.outputs['Fac'], mr.inputs['Value']); nt.links.new(mr.outputs['Result'], b.inputs['Roughness'])
    return m

def wire_mat():
    m = mat('winding', (0.80, 0.40, 0.20), 1.0, 0.22, coat=0.5); nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'MULTIPLY'
    vm.inputs[1].default_value = (1, 0, 1)
    nt.links.new(tc.outputs['Object'], vm.inputs[0])
    w = nt.nodes.new('ShaderNodeTexWave'); w.wave_type = 'RINGS'; w.inputs['Scale'].default_value = 5.5; w.inputs['Distortion'].default_value = 0.0
    w.wave_profile = 'SIN'
    nt.links.new(vm.outputs['Vector'], w.inputs['Vector'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.6; bp.inputs['Distance'].default_value = 0.02
    nt.links.new(w.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m

def lathe_y(prof, name, m=None, segs=128, y=0.0):
    """prof = [(r, y)], closed automatically; axis = global Y."""
    pr = list(prof) + [prof[0]]
    o = spin(pr, name, 'Z', (0, y, 0), segs, m); o.rotation_euler = (math.radians(-90), 0, 0); return o

def build():
    alu = M('alu_cast'); dark = noisy_mat('powder_dark', (0.07, 0.072, 0.08), 0.2, 0.45, 0.08, 120, 0.08); blk = M('black_cast'); steel = M('steel'); chrome = M('chrome')
    lam = lam_mat('lamination', (0.30, 0.31, 0.34)); lam_r = lam_mat('lamination_rotor', (0.26, 0.27, 0.30))
    cu = wire_mat()
    magN = noisy_mat('magnet_N', (0.66, 0.26, 0.22), 0.85, 0.30, 0.05, 300, 0.02)
    magS = noisy_mat('magnet_S', (0.30, 0.38, 0.52), 0.85, 0.30, 0.05, 300, 0.02)
    paper = mat('slot_liner', (0.80, 0.68, 0.45), 0.0, 0.6)
    objs_cut = []

    # quarter cutaway cutter: removes upper-rear quadrant (x<0, z>0)
    cutter = box((30, 40, 30), (-15, 0, 15), name='_quarter'); hide(cutter)

    # ---------- housing ----------
    hs = lathe_y([(8.6, -5.6), (9.45, -5.6), (9.45, 5.6), (8.6, 5.6)], A + '__housing', segs=144)
    finish(hs, 0.08, 2, m=dark); objs_cut.append(hs)
    fins = []
    NF = 36
    for i in range(NF):
        a = i * TAU / NF + math.pi / NF
        deg = math.degrees(a) % 360
        if 245 < deg < 295: continue          # mounting foot
        if 35 < deg < 85: continue            # terminal box
        f = box((1.35, 10.4, 0.42), (10.0 * math.cos(a), 0, 10.0 * math.sin(a)), (0, -a, 0), 'fin')
        fins.append(f)
    fn = joinn(fins, A + '__cooling_fins'); finish(fn, 0.12, 1, m=dark); objs_cut.append(fn)

    # end shields (left/-Y with output, right/+Y)
    for s, nmx in ((-1, 'endcap_left'), (1, 'endcap_right')):
        pr = [(2.45, s * 5.6), (9.45, s * 5.6), (9.45, s * 6.3), (9.0, s * 6.9), (4.4, s * 7.2), (3.5, s * 8.0), (2.45, s * 8.0)]
        if s > 0: pr = list(reversed(pr))
        ec = lathe_y(pr, A + '__' + nmx, segs=144); finish(ec, 0.12, 3, m=alu); objs_cut.append(ec)
        # stiffening ribs on the shield face
        ribs = []
        for k in range(6):
            a = k * TAU / 6 + math.radians(15)
            r = box((4.4, 0.9, 0.6), (6.6 * math.cos(a), s * 7.25, 6.6 * math.sin(a)), (0, -a, 0), 'rib')
            r.rotation_euler = (0, -a, 0)
            r.scale = (1, 1, 1)
            ribs.append(r)
        rb = joinn(ribs, A + '__' + nmx + '_ribs'); finish(rb, 0.15, 2, m=alu); objs_cut.append(rb)
        # through bolts
        bl = []
        for k in range(6):
            a = k * TAU / 6
            b = cyl(0.45, 0.5, (8.75 * math.cos(a), s * 7.25, 8.75 * math.sin(a)), RY, 24, 'bolt'); bl.append(b)
            h = cyl(0.66, 0.2, (8.75 * math.cos(a), s * 7.0, 8.75 * math.sin(a)), RY, 32, 'washer'); bl.append(h)
        bo = joinn(bl, A + '__' + nmx + '_bolts'); finish(bo, 0.06, 2, m=M('black_anod')); objs_cut.append(bo)

    # ---------- stator ----------
    RY_, RS2, RB, WT, SH = 7.35, 6.0, 5.45, 1.35, math.radians(12.5)
    inner = []
    OFF = math.radians(15)
    for k in range(12):
        a = k * TAU / 12 + OFF
        hw = lambda r: math.asin(WT / 2 / r)
        def P(r, t): return (r * math.cos(t), r * math.sin(t))
        inner += [P(RY_, a - hw(RY_)), P(RS2, a - hw(RS2)), P(RS2, a - SH), P(RB + 0.18, a - SH)]
        for j in range(7): inner.append(P(RB, a - SH * 0.85 + 2 * SH * 0.85 * j / 6))
        inner += [P(RB + 0.18, a + SH), P(RS2, a + SH), P(RS2, a + hw(RS2)), P(RY_, a + hw(RY_))]
        a2 = a + TAU / 12
        for j in range(1, 6):
            t = a + hw(RY_) + (a2 - 2 * hw(RY_) - a) * j / 6; inner.append(P(RY_, t))
    outer = circle(8.62, 144)
    st = prism(outer, -3.6, 3.6, A + '__stator', 'Y', holes=[inner])
    finish(st, 0.04, 1, m=lam); objs_cut.append(st)

    # concentrated windings around each tooth + slot liners
    coils = []; liners = []
    for k in range(12):
        a = k * TAU / 12 + OFF
        t = V((-math.sin(a), 0, math.cos(a))); u = V((math.cos(a), 0, math.sin(a))); ax = V((0, -1, 0))
        mx = mathutils.Matrix((t, ax, u)).transposed().to_4x4()
        th = 0.86
        outerp = rrect(WT + 2 * th, 7.2 + 2 * th * 1.05, th * 0.95, 6)
        innerp = rrect(WT + 0.04, 7.24, 0.05, 1)
        c = prism(outerp, RS2 + 0.08, RY_ - 0.12, 'coil', 'Z', holes=[innerp])
        c.data.transform(mx); coils.append(c)
        ln = prism(rrect(WT + 0.16, 7.32, 0.06, 1), RS2 + 0.02, RY_ - 0.02, 'liner', 'Z', holes=[rrect(WT + 0.02, 7.2, 0.04, 1)])
        ln.data.transform(mx); liners.append(ln)
    co = joinn(coils, A + '__windings'); finish(co, 0.08, 1, m=cu); objs_cut.append(co)
    li = joinn(liners, A + '__slot_insulation'); finish(li, 0, smooth=False, m=paper); objs_cut.append(li)
    # winding end connections (phase ring) on the right side
    ring = lathe_y([(7.3, 4.55), (8.3, 4.55), (8.3, 5.2), (7.3, 5.2)], A + '__phase_ring', segs=96)
    finish(ring, 0.1, 2, m=M('plastic')); objs_cut.append(ring)

    # ---------- rotor ----------
    rc = lathe_y([(1.5, -3.6), (4.62, -3.6), (4.62, 3.6), (1.5, 3.6)], A + '__rotor_core', segs=96)
    finish(rc, 0.03, 1, m=lam_r)
    for pol, mm in ((0, magN), (1, magS)):
        ms = []
        for k in range(pol, 8, 2):
            a0 = k * TAU / 8 + math.radians(2.6); a1 = (k + 1) * TAU / 8 - math.radians(2.6)
            ms.append(prism(sector(4.62, 5.18, a0, a1, 16), -3.55, 3.55, 'mag', 'Y'))
        mo = joinn(ms, A + '__magnets_' + ('north' if pol == 0 else 'south')); finish(mo, 0.05, 2, m=mm)
    for s in (-1, 1):
        ep = lathe_y([(1.5, s * 3.6), (5.0, s * 3.6), (5.0, s * 4.0), (1.5, s * 4.0)] if s > 0 else
                     [(1.5, -4.0), (5.0, -4.0), (5.0, -3.6), (1.5, -3.6)], A + ('__rotor_endplate_left' if s < 0 else '__rotor_endplate_right'), segs=96)
        finish(ep, 0.05, 2, m=M('alu_satin'))

    # ---------- shaft ----------
    sh = lathe_y([(0.001, -12.6), (1.05, -12.6), (1.15, -12.4), (1.15, -9.0), (1.3, -8.8), (1.3, -5.2), (1.5, -5.0),
                  (1.5, 5.0), (1.3, 5.2), (1.3, 7.6), (1.2, 7.8), (0.001, 7.8)], A + '__shaft', segs=64)
    finish(sh, 0.0, m=steel)

    # ---------- bearings ----------
    for s, nmx in ((-1, 'bearing_left'), (1, 'bearing_right')):
        yc = s * 6.6
        races = [lathe_y([(1.3, yc - 0.7), (1.78, yc - 0.7), (1.72, yc), (1.78, yc + 0.7), (1.3, yc + 0.7)], 'ir', segs=64),
                 lathe_y([(2.12, yc - 0.7), (2.45, yc - 0.7), (2.45, yc + 0.7), (2.12, yc + 0.7), (2.18, yc)], 'or', segs=64)]
        rc_ = joinn(races, A + '__' + nmx + '_races'); finish(rc_, 0.04, 2, m=M('chrome')); objs_cut.append(rc_)
        balls = []
        for k in range(9):
            a = k * TAU / 9
            bpy.ops.mesh.primitive_uv_sphere_add(radius=0.3, location=(1.95 * math.cos(a), yc, 1.95 * math.sin(a)), segments=16, ring_count=8)
            balls.append(bpy.context.active_object)
        bb = joinn(balls, A + '__' + nmx + '_balls'); finish(bb, 0, m=M('chrome'))
        for p in bb.data.polygons: p.use_smooth = True

    # ---------- output sprocket (15T, 520) ----------
    pts, R = sprocket_poly(15, 1.5875, 1.02, phase=math.pi / 2)
    spk = prism(pts, -11.2, -10.6, A + '__sprocket', 'Y')
    cutw(spk, cyl(1.16, 3, (0, -11, 0), RY, 48, 'bore'), fast=True)
    finish(spk, 0.09, 2, m=brushed(noisy_mat('sprocket_steel', (0.55, 0.55, 0.57), 1.0, 0.26, 0.06, 200, 0.03), 'Y', 0.7))
    hub = lathe_y([(1.15, -10.55), (2.4, -10.55), (2.4, -9.0), (1.15, -9.0)], A + '__sprocket_hub', segs=64)
    finish(hub, 0.08, 2, m=M('steel_dark'))
    nut = cyl(1.75, 0.9, (0, -11.75, 0), RY, 6, 'nut'); cutw(nut, cyl(1.1, 3, (0, -11.75, 0), RY, 32, 'nb'), fast=True)
    finish(nut, 0.1, 2, m=M('zinc')); nm(nut, A + '__sprocket_nut')
    wsh = lathe_y([(1.15, -11.3), (2.3, -11.3), (2.3, -11.2), (1.15, -11.2)], A + '__lock_washer', segs=48); finish(wsh, 0.0, m=M('zinc'))

    # ---------- terminal box, cable glands, cables ----------
    ta = math.radians(60); u = V((math.cos(ta), 0, math.sin(ta))); t = V((-math.sin(ta), 0, math.cos(ta)))
    tb = box((3.2, 8.0, 5.4), tuple(u * 10.0), (0, -ta, 0), A + '__terminal_box'); finish(tb, 0.5, 3, m=dark)
    lid = box((0.35, 7.4, 4.8), tuple(u * 11.7), (0, -ta, 0), A + '__terminal_lid'); finish(lid, 0.15, 2, m=alu)
    lids = [cyl(0.32, 0.3, tuple(u * 11.95 + t * dt + V((0, dy, 0))), (0, math.pi / 2 - ta, 0), 24, 'ls')
            for dt in (-2.0, 2.0) for dy in (-3.3, 3.3)]
    for o in lids: o.rotation_euler = (0, math.radians(90) - ta, 0)
    ls = joinn(lids, A + '__terminal_lid_screws'); finish(ls, 0.05, 2, m=M('black_anod'))
    glands = []; cables = []
    gdir = (-t)
    for i, dy in enumerate((-2.4, 0, 2.4)):
        base = u * 10.4 + t * (-1.7) + V((0, dy, 0))
        g1 = cyl(0.95, 0.7, tuple(base + gdir * 0.35), (0, 0, 0), 6, 'gnut'); orient(g1, tuple(base + gdir * 0.35), gdir)
        g2 = cyl(0.78, 1.2, tuple(base + gdir * 1.2), (0, 0, 0), 32, 'gcap'); orient(g2, tuple(base + gdir * 1.2), gdir)
        glands += [g1, g2]
        p0 = base + gdir * 1.0
        pts_c = [tuple(p0), tuple(p0 + gdir * 3.0 + V((0, 0, 0.3))), tuple(p0 + gdir * 6 + V((3.0, dy * 0.6 - 1.0, -2.5))),
                 tuple(V((14.0, dy * 0.8 - 2.0, -4.0)))]
        cables.append(tube(pts_c, 0.48, 'cable', M('orange'), res=12, sides=3))
    gl = joinn(glands, A + '__cable_glands'); finish(gl, 0.06, 2, m=M('plastic'))
    cb = joinn([to_mesh(c) for c in cables], A + '__phase_cables')
    # hall sensor lead
    hp = u * 10.4 + t * 1.9 + V((0, -2.8, 0))
    hc = cyl(0.55, 1.4, tuple(hp + gdir * 0.0), (0, 0, 0), 24, 'hall'); orient(hc, tuple(hp + u * 2.6), u)
    finish(hc, 0.1, 2, m=M('plastic')); nm(hc, A + '__hall_connector')

    # ---------- mounting foot ----------
    foot = box((15.0, 9.0, 1.3), (0, 0, -10.6), name=A + '__mount_foot')
    web = box((11.0, 9.0, 2.4), (0, 0, -9.3), name='web'); foot = joinn([foot, web], A + '__mount_foot')
    cutw(foot, cyl(9.3, 12, (0, 0, 0), RY, 96, 'fc'), fast=True)
    holes = joinn([cyl(0.5, 5, (sx * 6.2, sy * 2.8, -10.6), (0, 0, 0), 24, 'h') for sx in (-1, 1) for sy in (-1, 1)], 'fh')
    cutw(foot, holes, fast=True)
    finish(foot, 0.25, 3, m=dark)

    for o in objs_cut:
        md = o.modifiers.new('quarter', 'BOOLEAN'); md.object = cutter; md.operation = 'DIFFERENCE'; md.solver = 'EXACT'
        if o.name.endswith(('fins', 'ribs', 'bolts', 'windings', 'insulation')): md.use_self = True
        # boolean must run before bevel: move it to the top
        o.modifiers.move(len(o.modifiers) - 1, 0)
