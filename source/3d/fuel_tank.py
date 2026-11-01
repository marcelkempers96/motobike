import sys, os, math, bpy, bmesh
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Steel teardrop fuel tank", "category": "frame_body", "kind": "part", "view": (-30, 24)}
A = 'fuel_tank'


def shape(v):
    x, y, z = v
    u = x                      # -1 rear .. +1 front
    X = 23.0 * u
    f = (u + 1) / 2
    W = 8.0 + 6.8 * f ** 0.7
    Hh = 4.6 + 6.2 * f ** 0.8
    zc = 8.6 + 1.2 * u
    if z < 0: Hh *= 0.38
    elif z > 0.6: Hh *= 1.0 - 0.10 * (z - 0.6)
    knee = 1.0 - 0.13 * math.exp(-((X + 7.0) / 7.5) ** 2) * max(0.0, 1 - abs(z - 0.05) * 1.6)
    return (X, y * W * knee, zc + z * Hh)


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    paint = mat('tank_paint', (0.42, 0.015, 0.02), 0.25, 0.22, coat=1.0)
    paint.node_tree.nodes['Principled BSDF'].inputs['Coat Roughness'].default_value = 0.03
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=28, radius=1.0, rotation=(0, PI / 2, 0))
    t = bpy.context.active_object; t.name = 'tank'
    bpy.ops.object.transform_apply(rotation=True)
    for v in t.data.vertices:
        v.co = shape(v.co)
    t.data.materials.append(paint)
    ss = t.modifiers.new('ss', 'SUBSURF'); ss.levels = 2; ss.render_levels = 2
    t = bake(t)
    zmin = min(v.co.z for v in t.data.vertices)
    tun = tube([(-30, 0, zmin - 2.0), (30, 0, zmin - 2.0)], 1.0, '_tunnel', None, 8, poly=True)
    tun = bake(tun)
    for vv in tun.data.vertices:
        vv.co.y *= 4.2; vv.co.z = zmin - 2.0 + (vv.co.z - (zmin - 2.0)) * 8.5
    bcut(t, tun)
    t = bake(t); reshade(t, 50); t.name = n('shell')
    dg = bpy.context.evaluated_depsgraph_get()
    def top_at(x, y):
        hit, loc, nor, *_ = bpy.context.scene.ray_cast(dg, (x, y, 60), (0, 0, -1)); return loc, nor
    def bot_at(x, y):
        hit, loc, nor, *_ = bpy.context.scene.ray_cast(dg, (x, y, -20), (0, 0, 1)); return loc, nor
    # ---- filler cap with hinged lid and lock barrel
    p, nr = top_at(6.0, 0.0)
    q = nr.to_track_quat('Z', 'Y').to_euler()
    ring = lathe([(0, -0.6), (3.7, -0.6), (3.7, 0.15), (3.55, 0.3), (0, 0.3)], 'capring', M.chrome, tuple(p), 'Z', 96)
    lid = lathe([(0, 0.3), (3.05, 0.3), (3.1, 0.55), (2.8, 0.95), (1.8, 1.15), (0, 1.2)], 'lid', M.chrome, tuple(p), 'Z', 96)
    lock = lathe([(0, 1.0), (0.55, 1.0), (0.55, 1.35), (0.45, 1.42), (0, 1.42)], 'lock', M.alu_mach, tuple(p + V((-1.3, 0, 0))), 'Z', 32)
    slot = box((0.65, 0.12, 0.3), tuple(p + V((-1.3, 0, 1.4))), name='keyslot'); slot.data.materials.append(M.black)
    hinge = cyl(0.3, 1.8, tuple(p + V((3.2, 0, 0.45))), RY, 24, 'hinge'); finish(hinge, 0.04, 2, m=M.chrome)
    for o in (ring, lid, lock): o.rotation_euler = q
    J([ring, lid, lock, slot, hinge], n('filler_cap'))
    # ---- fuel tap (petcock) under the rear left, with lever and hose
    b, bn = bot_at(-11.0, -6.0)
    tp = V(b)
    body = box((2.2, 1.6, 2.4), tuple(tp + V((0, 0, -1.1))), name='tap'); finish(body, 0.25, 3, m=M.alu)
    nutp = cyl(1.0, 0.6, tuple(tp + V((0, 0, -0.15))), (0, 0, 0), 6, 'tapnut'); finish(nutp, 0.05, 2, m=M.alu)
    plate = cyl(0.55, 0.4, tuple(tp + V((0, -0.95, -1.2))), RY, 24, 'leverboss'); finish(plate, 0.05, 2, m=M.alu)
    lever = box((2.6, 0.3, 0.7), tuple(tp + V((-0.9, -1.2, -1.2))), (0, rad(20), 0), 'lever'); finish(lever, 0.12, 2, m=M.plastic)
    out = lathe([(0, 0), (0.32, 0), (0.32, 1.6), (0.4, 1.7), (0.32, 1.8), (0.32, 2.0), (0, 2.0)], 'spout', M.brass, tuple(tp + V((0.4, 0, -2.2))), (0, 0, -1), 24)
    J([body, nutp, plate, lever, out], n('fuel_tap'))
    hose = mat('fuel_hose', (0.03, 0.03, 0.03), 0.0, 0.42)
    h0 = tp + V((0.4, 0, -3.6))
    fh = tube([tuple(h0), tuple(h0 + V((0.4, 0, -1.6))), tuple(h0 + V((3.2, 0.8, -2.6))), tuple(h0 + V((8.0, 1.6, -2.4)))], 0.45, 'hose', hose, 6)
    fh = bake(fh)
    clip = torus(0.52, 0.09, tuple(h0 + V((0.08, 0, -0.5))), (0, 0, 0), 'hclip', 32, 8); clip.data.materials.append(M.zinc)
    J([fh, clip], n('fuel_line'))
    # ---- mounting brackets with rubber grommets
    mts = []
    for sy in (-1, 1):
        b2, _ = bot_at(16.0, sy * 3.2)
        br = box((2.4, 0.35, 3.0), tuple(V(b2) + V((0, sy * 0.0, -1.0))), name='bracket'); finish(br, 0.08, 2, m=M.black); mts.append(br)
    J(mts, n('front_mounts'))
    gr = [torus(0.55, 0.28, tuple(V(bot_at(16.0, sy * 3.2)[0]) + V((0, 0, -1.6))), RY, 'grom', 32, 12) for sy in (-1, 1)]
    for g in gr: g.data.materials.append(M.rubber)
    J(gr, n('grommets'))
    rb, _ = bot_at(-20.0, 0.0)
    rt = box((3.0, 2.2, 0.35), tuple(V(rb) + V((-1.4, 0, 0.0))), name='rtab'); finish(rt, 0.08, 2, m=M.black)
    rbolt = hexbolt(tuple(V(rb) + V((-2.0, 0, 0.18))), (0, 0, 1), 0.5, M.chrome, 'rbolt')
    J([rt] + rbolt, n('rear_mount'))
    finalize(A)
