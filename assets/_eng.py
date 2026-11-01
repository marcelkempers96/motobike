"""Shared helpers for the engine / fuel / air part modules (engine_4t, piston, carb, ...).
Not an asset itself (leading underscore). Units 1 = 1 cm, Z up, +X forward, bike's left = -Y."""
import sys, math, bpy, bmesh, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import mat, noisy_mat, brushed, finish, cyl, box, torus, spin, helix

V = mathutils.Vector
PI = math.pi
rad = math.radians
RX = (0, PI / 2, 0)    # local Z -> +X
RY = (PI / 2, 0, 0)    # local Z -> -Y (symmetric parts)


# ------------------------------------------------------------------ materials
class Mats:
    pass


def mats():
    M = Mats()
    M.black = mat('black_satin', (0.022, 0.022, 0.025), 0.0, 0.42, coat=0.25)
    M.black_cast = noisy_mat('black_cast', (0.026, 0.026, 0.029), 0.0, 0.52, 0.10, 70, 0.12)
    M.chrome = mat('chrome', (0.93, 0.93, 0.94), 1.0, 0.05)
    M.alu_cast = noisy_mat('alu_cast', (0.62, 0.62, 0.63), 1.0, 0.42, 0.08, 120, 0.10)
    M.alu = noisy_mat('alu', (0.80, 0.80, 0.81), 1.0, 0.30, 0.06, 150, 0.04)
    M.alu_mach = brushed(mat('alu_mach', (0.88, 0.88, 0.89), 1.0, 0.16), 'Z', 0.6)
    M.steel = brushed(mat('steel', (0.66, 0.66, 0.68), 1.0, 0.20), 'Z', 0.6)
    M.ground = noisy_mat('ground', (0.78, 0.78, 0.79), 1.0, 0.13, 0.03, 300, 0.01)
    M.forged = noisy_mat('forged', (0.40, 0.41, 0.43), 1.0, 0.45, 0.10, 40, 0.15)
    M.iron = noisy_mat('iron', (0.33, 0.33, 0.34), 1.0, 0.38, 0.08, 200, 0.05)
    M.rubber = noisy_mat('rubber', (0.025, 0.025, 0.025), 0.0, 0.62, 0.06, 300, 0.05)
    M.plastic = noisy_mat('plastic', (0.03, 0.03, 0.032), 0.0, 0.48, 0.05, 400, 0.03)
    M.bronze = mat('bronze', (0.74, 0.50, 0.30), 1.0, 0.28)
    M.brass = mat('brass', (0.86, 0.68, 0.36), 1.0, 0.22)
    M.copper = mat('copper', (0.92, 0.55, 0.40), 1.0, 0.25)
    M.spring = noisy_mat('spring', (0.12, 0.12, 0.14), 1.0, 0.30, 0.05, 200, 0.02)
    M.zinc = noisy_mat('zinc', (0.82, 0.82, 0.80), 1.0, 0.24, 0.05, 200, 0.02)
    # section faces of cutaways: bright fine-machined metal with a faint warm tint
    M.section = brushed(mat('section', (0.95, 0.78, 0.50), 1.0, 0.2), 'X', 0.5)
    return M


def tint_ramp(m, stops, axis='Z', lo=0.0, hi=1.0, space='Object'):
    """Drive base colour of material m from a colour ramp along an object-space axis (heat tint)."""
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    if space == 'World':
        g = nt.nodes.new('ShaderNodeNewGeometry'); nt.links.new(g.outputs['Position'], sep.inputs[0])
    else:
        tc = nt.nodes.new('ShaderNodeTexCoord'); nt.links.new(tc.outputs[space], sep.inputs[0])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = lo; mr.inputs['From Max'].default_value = hi
    nt.links.new(sep.outputs[axis], mr.inputs['Value'])
    cr = nt.nodes.new('ShaderNodeValToRGB'); el = cr.color_ramp.elements
    el[0].position, el[0].color = stops[0][0], (*stops[0][1], 1)
    el[1].position, el[1].color = stops[-1][0], (*stops[-1][1], 1)
    for p, c in stops[1:-1]:
        e = el.new(p); e.color = (*c, 1)
    nt.links.new(mr.outputs['Result'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    return m


# ------------------------------------------------------------------ 2D helpers
def circ(cx, cy, r, n=32, a0=0.0, a1=None):
    if a1 is None:
        return [(cx + r * math.cos(a0 + i * math.tau / n), cy + r * math.sin(a0 + i * math.tau / n)) for i in range(n)]
    return [(cx + r * math.cos(a0 + (a1 - a0) * i / n), cy + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]


def hull(pts):
    pts = sorted(set((round(x, 6), round(y, 6)) for x, y in pts))
    def cr(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) >= 2 and cr(lo[-2], lo[-1], p) <= 0: lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) >= 2 and cr(up[-2], up[-1], p) <= 0: up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]


def rrect(w, h, r, n=6, cx=0.0, cy=0.0):
    pts = []
    for (sx, sy, a0) in ((1, 1, 0), (-1, 1, PI / 2), (-1, -1, PI), (1, -1, 1.5 * PI)):
        ox, oy = cx + sx * (w / 2 - r), cy + sy * (h / 2 - r)
        for i in range(n + 1):
            a = a0 + (PI / 2) * i / n
            pts.append((ox + r * math.cos(a), oy + r * math.sin(a)))
    return pts


def slab(pts, depth, name, m=None, plane='XZ', off=0.0, loc=(0, 0, 0)):
    """Extrude a 2D polygon. plane 'XZ': (u,v)->(x,z), thickness along Y centred on off.
    'XY': (u,v)->(x,y), thickness along Z. 'YZ': (u,v)->(y,z), thickness along X."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new((u, v, off - depth / 2)) for u, v in pts]
    f = bm.faces.new(vs)
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    nv = [e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=(0, 0, depth))
    for v in bm.verts:
        x, y, z = v.co
        if plane == 'XZ': v.co = (x, z, y)
        elif plane == 'YZ': v.co = (z, x, y)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.calc_volume(signed=True) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); o.location = loc
    if m: o.data.materials.append(m)
    return o


def gear(r_root, r_tip, n, width, r_hole, name, m=None, loc=(0, 0, 0), axis='Z', phase=0.0, tw=0.24):
    """Spur gear (annulus with trapezoid teeth) along local Z, then oriented to axis."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    p = math.tau / n; outer = []
    for i in range(n):
        a = phase + i * p
        for da, r in ((-0.30, r_root), (-tw / 2, r_tip), (tw / 2, r_tip), (0.30, r_root), (0.5, r_root)):
            outer.append((r, a + da * p))
    O = [bm.verts.new((r * math.cos(a), r * math.sin(a), -width / 2)) for r, a in outer]
    I = [bm.verts.new((r_hole * math.cos(a), r_hole * math.sin(a), -width / 2)) for r, a in outer]
    k = len(O); fs = []
    for i in range(k):
        j = (i + 1) % k
        fs.append(bm.faces.new((O[i], O[j], I[j], I[i])))
    r = bmesh.ops.extrude_face_region(bm, geom=fs)
    nv = [e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=(0, 0, width))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.calc_volume(signed=True) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    o.location = loc; orient(o, axis)
    if m: o.data.materials.append(m)
    return o


def orient(o, axis):
    if axis == 'X': o.rotation_euler = (0, PI / 2, 0)
    elif axis == 'Y': o.rotation_euler = (-PI / 2, 0, 0)   # local +Z -> +Y
    elif axis == '-Y': o.rotation_euler = (PI / 2, 0, 0)
    elif axis == '-X': o.rotation_euler = (0, -PI / 2, 0)
    elif isinstance(axis, (tuple, list, V)):
        o.rotation_euler = V(axis).normalized().to_track_quat('Z', 'Y').to_euler()
    return o


def fix_normals(o):
    bm = bmesh.new(); bm.from_mesh(o.data)
    if bm.calc_volume(signed=True) < 0:
        bmesh.ops.reverse_faces(bm, faces=bm.faces); bm.to_mesh(o.data)
    bm.free()


def lathe(profile, name, m=None, loc=(0, 0, 0), axis='Z', segs=96, sharp=40):
    profile = list(profile)
    if profile[0][0] > 1e-6 and tuple(profile[-1]) != tuple(profile[0]):
        profile.append(profile[0])
    o = spin(profile, name, 'Z', (0, 0, 0), segs, m)
    fix_normals(o)
    o.data.set_sharp_from_angle(angle=rad(sharp))
    o.location = loc; orient(o, axis); return o


def tube(pts, r, name, m=None, res=6, poly=False, caps=True, handles='AUTO', twist=None):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r; cu.bevel_resolution = res
    cu.use_fill_caps = caps; cu.resolution_u = 12
    if poly:
        sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
        for i, p in enumerate(pts): sp.points[i].co = (*p, 1)
    else:
        sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
        for bp, p in zip(sp.bezier_points, pts):
            bp.co = p; bp.handle_left_type = bp.handle_right_type = handles
    sp.use_smooth = True
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o)
    if m: o.data.materials.append(m)
    return o


def cutter(o):
    o.hide_render = True; o.hide_viewport = True
    if not o.name.startswith('_'): o.name = '_' + o.name
    return o


def bcut(target, c, op='DIFFERENCE', transfer=False, selfi=False):
    md = target.modifiers.new('bool', 'BOOLEAN'); md.object = c; md.operation = op; md.solver = 'EXACT'
    md.use_self = selfi; md.use_hole_tolerant = selfi
    if transfer: md.material_mode = 'TRANSFER'
    cutter(c); return md


def bake(o):
    """Apply all modifiers (and convert curves) in place; returns the (possibly new) object."""
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    if o.type == 'MESH':
        o.modifiers.clear(); o.data = me; return o
    n = o.name; mw = o.matrix_world.copy()
    no = bpy.data.objects.new(n + '_m', me); bpy.context.collection.objects.link(no); no.matrix_world = mw
    if not me.materials and o.data.materials:
        for mm in o.data.materials: me.materials.append(mm)
    bpy.data.objects.remove(o); no.name = n
    return no


def J(objs, name):
    objs = [bake(o) for o in objs]
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join(); o = bpy.context.active_object; o.name = name
    return o


def reshade(o, angle=35):
    me = o.data
    if me.has_custom_normals:
        try:
            me.attributes.remove(me.attributes['custom_normal'])
        except Exception:
            pass
    for p in me.polygons: p.use_smooth = True
    me.set_sharp_from_angle(angle=rad(angle))
    wn = o.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True
    return o


def bmulti(target, cutters, op='DIFFERENCE'):
    """One exact boolean per cutter (cheaper and more robust than joining overlapping cutters)."""
    for c in cutters:
        bcut(target, c, op)
    return target


def section(o, c, secmat, angle=35, selfi=False):
    """Cut object o with cutter c; new faces get secmat (contrasting machined finish)."""
    o = bake(o)
    if not c.data.materials: c.data.materials.append(secmat)
    bcut(o, c, transfer=True, selfi=selfi)
    o = bake(o); reshade(o, angle)
    return o


def hexbolt(loc, direction, s=0.5, m=None, name='bolt', washer=True, flange=False):
    """Hex-head cap bolt at loc, head axis pointing along direction (outwards). Returns list of objects."""
    d = V(direction).normalized(); q = d.to_track_quat('Z', 'Y')
    out = []
    h = cyl(s, s * 0.75, (0, 0, s * 0.375 + (0.1 * s if washer else 0)), (0, 0, 0), 6, name)
    finish(h, s * 0.08, 2, m=m); out.append(h)
    top = spin([(0, 0), (s * 0.82, 0), (s * 0.7, s * 0.12), (0, s * 0.14)], name + 't', 'Z', (0, 0, s * 0.75 + (0.1 * s if washer else 0)), 32, m)
    out.append(top)
    if washer:
        w = spin([(s * 0.5, 0), (s * 1.25, 0), (s * 1.25, 0.1 * s), (s * 0.5, 0.1 * s)], name + 'w', 'Z', (0, 0, 0), 32, m); out.append(w)
    for o in out:
        o.location = V(loc) + q @ o.location
        o.rotation_euler = q.to_euler()
    return out


def capscrew(loc, direction, s=0.45, m=None, name='screw'):
    """Socket-head / dome cap screw used on covers."""
    d = V(direction).normalized(); q = d.to_track_quat('Z', 'Y')
    o = spin([(0, 0), (s, 0), (s, s * 0.5), (s * 0.85, s * 0.8), (s * 0.45, s * 0.9), (s * 0.45, s * 0.55), (0, s * 0.55)], name, 'Z', (0, 0, 0), 32, m)
    o.location = V(loc); o.rotation_euler = q.to_euler(); return [o]


def finalize(prefix):
    """Delete nothing, but hide helpers and check naming. Returns visible object list."""
    vis = []
    for o in bpy.context.scene.objects:
        if o.hide_render or o.name.startswith('_'):
            o.hide_render = True; o.hide_viewport = True
            if not o.name.startswith('_'): o.name = '_' + o.name
            continue
        if o.type in ('MESH', 'CURVE'):
            if not o.name.startswith(prefix + '__'):
                print('WARNING bad name', o.name)
            vis.append(o)
    return vis


def ringseg(profile, name, a0, a1, segs=96, m=None, loc=(0, 0, 0), axis='Z'):
    """Partial lathe of a CLOSED (r, z) profile from angle a0 to a1, with capped ends (piston rings with end gap)."""
    me = bpy.data.meshes.new(name); bm = bmesh.new(); n = len(profile); rows = []
    for i in range(segs + 1):
        a = a0 + (a1 - a0) * i / segs
        rows.append([bm.verts.new((r * math.cos(a), r * math.sin(a), z)) for r, z in profile])
    for i in range(segs):
        for k in range(n):
            j = (k + 1) % n
            bm.faces.new((rows[i][k], rows[i][j], rows[i + 1][j], rows[i + 1][k]))
    bm.faces.new(rows[0]); bm.faces.new(list(reversed(rows[-1])))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.calc_volume(signed=True) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    for p in o.data.polygons: p.use_smooth = True
    o.data.set_sharp_from_angle(angle=rad(40))
    o.location = loc; orient(o, axis)
    if m: o.data.materials.append(m)
    return o


def turn_all(rot_euler, move=(0, 0, 0)):
    """Rigidly rotate (about the origin) and move every object built so far."""
    R = mathutils.Euler(rot_euler).to_matrix().to_4x4()
    T = mathutils.Matrix.Translation(move)
    bpy.context.view_layer.update()
    for o in bpy.context.scene.objects:
        if o.parent is None:
            o.matrix_world = T @ R @ o.matrix_world


def _rfun(spec):
    if not isinstance(spec, (tuple, list)):
        return lambda th: spec, 0
    r_root, r_tip, n, tw, fl, phase = (list(spec) + [0.24, 0.30, 0.0][len(spec) - 3:])[:6] if len(spec) < 6 else spec
    p = math.tau / n
    def f(th):
        u = ((th - phase) / p) % 1.0; d = min(u, 1 - u)
        if d <= tw / 2: return r_tip
        if d >= fl: return r_root
        return r_tip + (r_root - r_tip) * (d - tw / 2) / (fl - tw / 2)
    return f, n


def toothed(name, outer, inner, width, m=None, loc=(0, 0, 0), axis='Z', per=10, segs=None):
    """Annulus whose outer and/or inner edge is toothed. outer/inner: radius or (r_root, r_tip, n[, tw, fl, phase]).
    tw = tooth-tip width and fl = flank end, both as fractions of the pitch from the tooth centre."""
    fo, no = _rfun(outer); fi, ni = _rfun(inner)
    S = segs or max(64, max(no, ni) * per)
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    O, I = [], []
    for i in range(S):
        th = i * math.tau / S
        ro, ri = fo(th), fi(th)
        O.append(bm.verts.new((ro * math.cos(th), ro * math.sin(th), -width / 2)))
        I.append(bm.verts.new((ri * math.cos(th), ri * math.sin(th), -width / 2)))
    fs = [bm.faces.new((O[i], O[(i + 1) % S], I[(i + 1) % S], I[i])) for i in range(S)]
    r = bmesh.ops.extrude_face_region(bm, geom=fs)
    nv = [e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=(0, 0, width))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.calc_volume(signed=True) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    o.location = loc; orient(o, axis)
    if m: o.data.materials.append(m)
    return o


def coil(r, pitch, turns, wire, loc=(0, 0, 0), m=None, name='spring', ppt=24, res=2, ground_ends=False, left=False):
    """Light-weight helix spring (curve) along local Z; ground_ends closes the first and last turn."""
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = wire; cu.bevel_resolution = res
    cu.resolution_u = 1; cu.use_fill_caps = True
    sp = cu.splines.new('POLY'); N = int(turns * ppt); sp.points.add(N)
    for i in range(N + 1):
        t = i / ppt; a = t * math.tau * (-1 if left else 1)
        if ground_ends:
            body = max(turns - 2, 0.5)
            if t < 1: z = t * wire * 2.1
            elif t > turns - 1: z = wire * 2.1 + body * pitch + (t - (turns - 1)) * wire * 2.1
            else: z = wire * 2.1 + (t - 1) * pitch
        else:
            z = t * pitch
        sp.points[i].co = (r * math.cos(a), r * math.sin(a), z, 1)
    sp.use_smooth = True
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o); o.location = loc
    if m: o.data.materials.append(m)
    return o


def cr_path(ctrl, per=8):
    """Centripetal-ish Catmull-Rom through control points; returns list of Vectors."""
    P = [V(p) for p in ctrl]
    P = [P[0] * 2 - P[1]] + P + [P[-1] * 2 - P[-2]]
    out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(per):
            t = k / per
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    out.append(P[-2])
    return out


def place(objs, origin, direction, roll=0.0):
    """Objects built along local +Z at the origin -> put them at origin pointing along direction."""
    R = V(direction).normalized().to_track_quat('Z', 'Y').to_matrix().to_4x4()
    if roll: R = R @ mathutils.Matrix.Rotation(roll, 4, 'Z')
    T = mathutils.Matrix.Translation(origin)
    bpy.context.view_layer.update()
    for o in objs:
        o.matrix_world = T @ R @ o.matrix_world
    return objs


def frustum(p0, p1, r0, r1, name, m=None, segs=48):
    d = V(p1) - V(p0)
    o = lathe([(0, 0), (r0, 0), (r1, d.length), (0, d.length)], name, m, (0, 0, 0), 'Z', segs, sharp=80)
    place([o], V(p0), d); return o
