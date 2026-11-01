import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'handlebar'
META = {"title": "Handlebar and controls, rider's view", "category": "chassis", "kind": "part", "view": (-90, 46)}

P3 = (-4.2, 22.0, 4.4)
AZ, EL = math.radians(15.04), math.radians(5.5)

def side_frame(s):
    return Matrix.Translation((P3[0], P3[1] * s, P3[2])) @ Matrix.Rotation(AZ * s, 4, 'Z') @ Matrix.Rotation(EL * s, 4, 'X')

def disc_uv(name, R, m, z=0.0, segs=72):
    verts = [(0, 0, z)] + [(R * math.cos(k * TAU / segs), R * math.sin(k * TAU / segs), z) for k in range(segs)]
    o = mesh_obj(name, verts, [(0, 1 + k, 1 + (k + 1) % segs) for k in range(segs)], m, recalc=False)
    uv = o.data.uv_layers.new(name='UVMap')
    for poly in o.data.polygons:
        for li in poly.loop_indices:
            v = o.data.vertices[o.data.loops[li].vertex_index].co
            uv.data[li].uv = (v.x / (2 * R) + 0.5, v.y / (2 * R) + 0.5)
    return o

def rib(t, sd): return 1.0 + (0.07 if (sd / 0.45) % 1.0 < 0.5 else 0.0)

def side(s):
    before = set(bpy.context.scene.objects)
    nm = 'right' if s > 0 else 'left'
    # grip with flange, bar end weight
    g = sweep([(0, 4.9 * s, 0), (0, 16.3 * s, 0)][:1] + [(0, (4.9 + (16.3 - 4.9) * k / 60) * s, 0) for k in range(1, 61)], 1.65,
              f'{A}__grip_{nm}', M('rubber_soft'), 24, rfun=rib)
    fl = cyl(2.05, 0.55, (0, 4.95 * s, 0), (math.radians(90), 0, 0), 48, 'fl'); finish(fl, 0.15, 2, m=M('rubber_soft'))
    g = join([g, fl], f'{A}__grip_{nm}')
    be = lathe([(0, 0), (1.5, 0), (1.75, 0.3), (1.75, 1.2), (1.4, 1.6), (0, 1.65)], f'{A}__bar_end_{nm}', M('chrome'), 48)
    be.rotation_euler = (-math.radians(90) * s, 0, 0); be.location = (0, 16.35 * s, 0)
    # switch housing (left: dip / indicator / horn; right: kill / starter, with throttle housing)
    sh = box((4.8, 2.3, 4.6), (0.3, 3.5 * s, -0.2), (0, 0, 0), 'sh'); finish(sh, 0.9, 4, m=M('plastic_black'))
    sh.name = f'{A}__switch_{nm}'
    btn = []
    if s > 0:
        k = box((1.0, 1.6, 0.9), (-0.6, 3.5, 2.3), (0, math.radians(-20), 0), 'kill'); finish(k, 0.25, 3, m=M('red')); btn.append(k)
        st = cyl(0.75, 0.6, (-2.25, 3.5, -0.9), (0, math.radians(90), 0), 32, 'start'); finish(st, 0.2, 3, m=M('plastic_grey')); btn.append(st)
        th = lathe([(1.15, -1.0), (2.0, -1.0), (2.2, -0.6), (2.2, 0.6), (2.0, 1.0), (1.15, 1.0), (1.15, -1.0)], 'thr', M('plastic_black'), 48)
        th.rotation_euler = (math.radians(90), 0, 0); th.location = (0, 5.8, 0); finish(th, 0.1, 2)
        boss = box((2.4, 1.6, 2.0), (1.8, 5.8, -0.6), (0, 0, 0), 'tb'); finish(boss, 0.4, 3, m=M('plastic_black'))
        join([th, boss], f'{A}__throttle_housing')
        g.location.y += 1.3 * 0  # grip starts outboard of the throttle housing
        cabs = []
        for dz in (-0.4, -1.2):
            P = spline([(2.9, 5.6, dz), (6.0, 5.0, dz - 2.0), (8.0, 3.0, dz - 9.0), (8.5, 1.0, dz - 16.0)], 8)
            cabs.append(sweep(P, 0.32, 'tc', M('satin_black'), 12))
        join(cabs, f'{A}__throttle_cables')
    else:
        dip = box((1.4, 0.9, 0.7), (-1.5, -3.5, 1.5), (0, math.radians(15), 0), 'dip'); finish(dip, 0.2, 3, m=M('plastic_grey')); btn.append(dip)
        ind = box((0.8, 1.6, 0.6), (-2.35, -3.5, 0.0), (0, math.radians(90), 0), 'ind'); finish(ind, 0.2, 3, m=M('plastic_grey')); btn.append(ind)
        hn = cyl(0.8, 0.5, (-2.3, -3.5, -1.5), (0, math.radians(90), 0), 32, 'horn'); finish(hn, 0.2, 3, m=M('plastic_grey')); btn.append(hn)
    join(btn, f'{A}__switch_{nm}_buttons')
    # lever perch, lever blade with ball end
    pc = lathe([(1.12, -0.9), (1.8, -0.9), (1.9, -0.6), (1.9, 0.6), (1.8, 0.9), (1.12, 0.9), (1.12, -0.9)], 'pc', M('alu_cast'), 48)
    pc.rotation_euler = (math.radians(90), 0, 0); pc.location = (0, 1.3 * s, 0)
    arm = box((3.2, 1.6, 1.4), (2.0, 1.4 * s, 0.1), (0, 0, 0), 'pa')
    piv = cyl(0.75, 2.2, (3.5, 1.5 * s, 0.1), (0, 0, 0), 32, 'piv')
    perch = [pc, arm, piv]
    for o in (arm, piv): finish(o, 0.3, 3, m=M('alu_cast'))
    if s > 0:
        mc = cyl(1.15, 4.6, (1.4, -1.0, 0.6), (math.radians(90), 0, 0), 40, 'mc'); finish(mc, 0.3, 3, m=M('alu_cast'))
        cl = cyl(1.7, 1.6, (0, -0.3, 0), (math.radians(90), 0, 0), 40, 'cl'); finish(cl, 0.2, 3, m=M('alu_cast'))
        perch += [mc, cl]
        res = prism(rrect(3.6, 3.0, 0.8), 2.0, 'res', None, z0=2.0); res.location = (0.9, -1.2, 0); finish(res, 0.3, 3, m=M('glass_smoke'))
        lid = prism(rrect(3.8, 3.2, 0.8), 0.5, 'lid', None, z0=4.0); lid.location = (0.9, -1.2, 0); finish(lid, 0.2, 3, m=M('anod_black'))
        scr = [cyl(0.25, 0.2, (0.9 + dx, -1.2 + dy, 4.55), (0, 0, 0), 12, 'sc') for dx, dy in ((-1.4, -1.1), (1.4, 1.1), (-1.4, 1.1), (1.4, -1.1))]
        sj = join(scr, 'scr'); sj.data.materials.append(M('steel'))
        fluid = prism(rrect(3.3, 2.7, 0.7), 1.3, 'fluid', mat('dot4', (0.55, 0.45, 0.15), 0.0, 0.1), z0=2.2); fluid.location = (0.9, -1.2, 0)
        join([res, lid, sj, fluid], f'{A}__brake_reservoir')
        hose = sweep(spline([(2.6, -2.8, 0.6), (4.5, -3.5, -1.0), (6.5, -4.0, -8.0), (7.0, -3.0, -18.0)], 8), 0.42, f'{A}__brake_hose', M('satin_black'), 14)
        bj = cyl(0.6, 1.2, (2.4, -2.7, 0.6), (0, math.radians(90), 0), 6, 'banjo'); finish(bj, 0.06, 2, m=M('steel'))
        hose = join([hose, bj], f'{A}__brake_hose')
    else:
        adj = cyl(0.55, 2.4, (2.6, -0.4, 0.1), (math.radians(90), 0, 0), 24, 'adj'); finish(adj, 0.05, 2, m=M('steel')); perch.append(adj)
        lk = cyl(0.8, 0.6, (2.6, 0.4, 0.1), (math.radians(90), 0, 0), 24, 'lk'); finish(lk, 0.1, 2, m=M('steel'))
        lk.data.materials.clear(); lk.data.materials.append(M('alu_cast')); perch.append(lk)
        cc = sweep(spline([(2.6, -1.6, 0.1), (4.0, -3.0, -0.8), (7.0, -2.0, -8.0), (8.0, 0.0, -18.0)], 8), 0.36, f'{A}__clutch_cable', M('satin_black'), 12)
    join(perch, f'{A}__{"brake" if s > 0 else "clutch"}_perch')
    lev = sweep(spline([(3.5, 1.4 * s, 0.1), (5.0, 4.5 * s, -0.2), (5.4, 9.0 * s, -0.55), (5.0, 13.0 * s, -0.8), (4.3, 15.4 * s, -0.9)], 8), 1.0,
                'lev', M('alu_machined'), 16, ell=(0.62, 0.32), rfun=lambda t, sd: 1.0 - 0.25 * t)
    ball = lathe([(0, -0.6), (0.55, -0.45), (0.6, 0), (0.55, 0.45), (0, 0.6)], 'ball', M('alu_machined'), 24); ball.location = (4.25, 15.6 * s, -0.9)
    join([lev, ball], f'{A}__{"brake" if s > 0 else "clutch"}_lever')
    # mirror: stalk from the perch, oval head facing the rider
    stalk = sweep(spline([(0.6, 1.6 * s, 1.6), (0.9, 2.6 * s, 6.0), (2.0, 5.6 * s, 14.0), (2.9, 7.2 * s, 18.5)], 8), 0.42, 'stalk', M('chrome'), 14)
    nut = cyl(0.7, 0.8, (0.6, 1.6 * s, 1.7), (0, 0, 0), 6, 'mn'); finish(nut, 0.06, 2, m=M('chrome'))
    join([stalk, nut], f'{A}__mirror_{nm}_stalk')
    head = prism(rrect(8.0, 13.5, 3.8), 2.2, 'mh', None, z0=0.0); finish(head, 0.6, 4, m=M('plastic_black'))
    for v in head.data.vertices:
        if v.co.z < 1.0: v.co.x *= 0.85; v.co.y *= 0.88
    glass = prism(rrect(7.2, 12.7, 3.4), 0.12, 'mg', M('reflector'), z0=2.15)
    for o in (head, glass):
        o.matrix_world = Matrix.Translation((3.4, 9.2 * s, 21.5)) @ Matrix.Rotation(-AZ * s * 0.6, 4, 'Z') @ Matrix.Rotation(math.radians(-90), 4, 'Y') @ \
            Matrix.Rotation(math.radians(180), 4, 'Z') @ o.matrix_world
    head.name = f'{A}__mirror_{nm}'; glass.name = f'{A}__mirror_{nm}_glass'
    xform(new_objs(before), side_frame(s))

def gauge(kind, y, val, vmax, R=4.6):
    before = set(bpy.context.scene.objects)
    path = _dash.dial(f'{TEX}/dial_{kind}.png', kind)
    cup = lathe([(0, -4.6), (3.2, -4.4), (R - 0.1, -3.4), (R + 0.4, -1.6), (R + 0.45, -0.2), (0, -0.2), (0, -4.6)], 'cup', M('satin_black'), 64)
    bez = lathe([(R - 0.05, -0.5), (R - 0.05, 0.3), (R + 0.2, 0.65), (R + 0.65, 0.6), (R + 0.8, 0.1), (R + 0.6, -0.6), (R - 0.05, -0.5)], 'bez', M('chrome'), 72)
    finish(bez, 0.03, 2)
    hs = join([cup, bez], f'{A}__{kind}_housing')
    face = disc_uv(f'{A}__{kind}_dial', R - 0.05, img_mat('dial_' + kind, path, 0.5), -0.15)
    gl = lathe([(0, 0.5), (2.4, 0.42), (R - 0.3, 0.2), (R, 0.1), (R, 0.0), (0, 0.4)], f'{A}__{kind}_glass', M('glass'), 64)
    a = math.radians(225 + (-45 - 225) * val / vmax)
    nd = prism([(-0.8, -0.08), (3.6, -0.03), (3.6, 0.03), (-0.8, 0.08)], 0.08, 'nd', mat('needle', (1.0, 0.32, 0.05), 0.0, 0.35), z0=0.0)
    nd.rotation_euler = (0, 0, a)
    hc = lathe([(0, 0.0), (0.45, 0.0), (0.4, 0.15), (0, 0.22)], 'hc', M('satin_black'), 24)
    join([nd, hc], f'{A}__{kind}_needle')
    # dial faces the rider (-X), tilted back 40 degrees; text upright
    xform(new_objs(before), Matrix.Translation((7.5, y, 9.0)) @ Matrix.Rotation(math.radians(40), 4, 'Y') @ TOREAR)

def build():
    # bars
    ctrl = [(-8.5, -38, 6.0), (-6.35, -30, 5.2), (-4.2, -22, 4.4), (-1.5, -15, 2.3), (0, -8, 0.4), (0, 0, 0), (0, 8, 0.4), (-1.5, 15, 2.3),
            (-4.2, 22, 4.4), (-6.35, 30, 5.2), (-8.5, 38, 6.0)]
    bars = sweep(spline(ctrl, 10), 1.11, A + '__bars', M('chrome'), 24)
    for s in (-1, 1): side(s)
    # bar clamps on risers, top yoke, fork caps, ignition
    cl = []
    for s in (-1, 1):
        r = lathe([(1.12, -1.6), (2.0, -1.6), (2.2, -1.2), (2.2, 1.2), (2.0, 1.6), (1.12, 1.6), (1.12, -1.6)], 'cl', M('alu_machined'), 48)
        r.rotation_euler = (math.radians(90), 0, 0); r.location = (0, 5.0 * s, 0.1)
        rs = cyl(1.4, 4.2, (0, 5.0 * s, -3.0), (0, 0, 0), 32, 'riser'); finish(rs, 0.15, 2, m=M('alu_machined'))
        bolts = [cyl(0.42, 0.6, (dx, 5.0 * s + dy, 2.2), (0, 0, 0), 6, 'b') for dx in (-1.2, 1.2) for dy in (-1.0, 1.0)]
        bj = join(bolts, 'bolts'); bj.data.materials.append(M('steel'))
        cl += [r, rs, bj]
    clj = join(cl, A + '__bar_clamps'); finish(clj, 0.08, 2)
    yoke_poly = [(-4.0, -6.0), (2.0, -13.5), (7.5, -13.5), (9.5, -9.0), (9.5, 9.0), (7.5, 13.5), (2.0, 13.5), (-4.0, 6.0)]
    yk = prism(yoke_poly, 2.2, A + '__top_yoke', M('alu_cast'), round_r=2.0, segs=4, z0=-7.2)
    cut(yk, join([cyl(2.0, 6, (6.0, sy * 10.0, -6), (0, 0, 0), 48, '_fh') for sy in (-1, 1)], '_fhs')); bake(yk); finish(yk, 0.3, 3)
    caps = []
    for sy in (-1, 1):
        t = cyl(2.05, 3.6, (6.0, sy * 10.0, -6.6), (0, 0, 0), 48, 'tube'); finish(t, 0.1, 2, m=M('chrome')); caps.append(t)
        c = cyl(1.75, 0.9, (6.0, sy * 10.0, -4.5), (0, 0, 0), 6, 'cap'); finish(c, 0.12, 2, m=M('alu_machined')); caps.append(c)
    join(caps, A + '__fork_caps')
    stem = cyl(1.9, 0.9, (2.8, 0, -4.6), (0, 0, 0), 6, 'stem'); finish(stem, 0.1, 2, m=M('steel')); stem.name = A + '__stem_nut'
    # gauge pod and gauges
    gauge('speed', -5.6, 62, 160); gauge('tacho', 5.6, 4.2, 10)
    pod = prism([(-12, -3.5), (12, -3.5), (10, 3.5), (-10, 3.5)], 0.5, 'pod', M('satin_black'), round_r=2.0, z0=0)
    pod.matrix_world = Matrix.Translation((10.0, 0, 6.2)) @ Matrix.Rotation(math.radians(40), 4, 'Y') @ TOREAR @ pod.matrix_world
    st = box((1.2, 5.0, 7.0), (9.5, 0, 1.5), (0, math.radians(-15), 0), 'pst'); finish(st, 0.2, 2, m=M('satin_black'))
    pj = join([pod, st], A + '__gauge_bracket'); finish(pj, 0.15, 2)
    ign = lathe([(0, 0), (1.5, 0), (1.6, 0.4), (1.3, 0.8), (0.9, 0.85), (0, 0.85)], A + '__ignition', M('chrome'), 48)
    ign.location = (4.2, 0, -4.6)
    face = cyl(0.85, 0.1, (4.2, 0, -3.72), (0, 0, 0), 32, 'if'); face.data.materials.append(M('satin_black'))
    ign = join([ign, face], A + '__ignition')
    blade = box((0.18, 0.8, 2.4), (4.2, 0, -2.6), (0, 0, 0), 'kb'); finish(blade, 0.05, 2, m=M('steel'))
    head = prism(rrect(2.6, 2.4, 0.9), 0.55, 'kh', M('plastic_black'), z0=-0.275)
    head.matrix_world = Matrix.Translation((4.2, 0, -0.5)) @ Matrix.Rotation(math.radians(90), 4, 'Y') @ head.matrix_world; finish(head, 0.15, 2)
    ring = torus(0.45, 0.12, (4.2, 0, 0.9), (0, math.radians(90), 0), 'kr', 32, 8); ring.data.materials.append(M('steel'))
    join([blade, head, ring], A + '__key')
