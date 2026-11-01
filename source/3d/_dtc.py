"""Shared helpers for the drivetrain / transmission / chassis part modules (not an asset)."""
import sys, math, bpy, bmesh, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *

V = mathutils.Vector
RX = (0, math.radians(90), 0)   # cylinder axis along X
RY = (math.radians(90), 0, 0)   # cylinder axis along Y
TAU = math.tau

_M = {}

def M(key):
    """Cached material palette."""
    if key in _M:
        try:
            if _M[key].name in bpy.data.materials: return _M[key]
        except ReferenceError: pass
    f = {
        'alu_cast':  lambda: noisy_mat('alu_cast', (0.78, 0.78, 0.79), 1.0, 0.36, 0.08, 140, 0.10),
        'alu_brush': lambda: brushed(mat('alu_brush', (0.86, 0.86, 0.87), 1.0, 0.18), 'Y', 0.6),
        'alu_satin': lambda: noisy_mat('alu_satin', (0.82, 0.82, 0.83), 1.0, 0.26, 0.05, 200, 0.03),
        'black_satin': lambda: mat('black_satin', (0.02, 0.02, 0.022), 0.0, 0.36, coat=0.3),
        'black_cast': lambda: noisy_mat('black_cast', (0.022, 0.022, 0.025), 0.0, 0.45, 0.08, 90, 0.10),
        'black_anod': lambda: noisy_mat('black_anod', (0.03, 0.03, 0.035), 0.6, 0.32, 0.05, 200, 0.02),
        'gunmetal': lambda: noisy_mat('gunmetal', (0.16, 0.165, 0.18), 1.0, 0.30, 0.05, 200, 0.02),
        'gold_anod': lambda: noisy_mat('gold_anod', (0.78, 0.55, 0.20), 1.0, 0.28, 0.05, 200, 0.02),
        'red_anod': lambda: noisy_mat('red_anod', (0.60, 0.05, 0.04), 1.0, 0.30, 0.05, 200, 0.02),
        'blue_anod': lambda: noisy_mat('blue_anod', (0.08, 0.22, 0.60), 1.0, 0.30, 0.05, 200, 0.02),
        'chrome': lambda: mat('chrome', (0.93, 0.93, 0.94), 1.0, 0.05),
        'steel': lambda: brushed(mat('steel', (0.66, 0.66, 0.68), 1.0, 0.22), 'Y', 0.6),
        'steel_dark': lambda: noisy_mat('steel_dark', (0.30, 0.30, 0.32), 1.0, 0.32, 0.06, 200, 0.03),
        'zinc': lambda: noisy_mat('zinc', (0.70, 0.71, 0.73), 1.0, 0.30, 0.06, 200, 0.02),
        'rubber': lambda: mat('rubber', (0.025, 0.025, 0.025), 0.0, 0.6),
        'plastic': lambda: noisy_mat('plastic', (0.03, 0.03, 0.033), 0.0, 0.42, 0.06, 150, 0.03),
        'copper': lambda: mat('copper', (0.86, 0.47, 0.28), 1.0, 0.24),
        'brass': lambda: mat('brass', (0.80, 0.62, 0.32), 1.0, 0.25),
        'orange': lambda: mat('orange_hv', (0.95, 0.30, 0.02), 0.0, 0.42),
        'pcb': lambda: mat('pcb', (0.02, 0.20, 0.09), 0.1, 0.32, coat=0.3),
        'chip': lambda: mat('chip', (0.03, 0.03, 0.03), 0.0, 0.35),
        'pad': lambda: noisy_mat('pad', (0.20, 0.17, 0.14), 0.0, 0.8, 0.1, 500, 0.2),
        'disc': lambda: brushed(noisy_mat('disc', (0.66, 0.66, 0.67), 1.0, 0.2, 0.05, 400, 0.02), 'Y', 0.9),
        'red_paint': lambda: mat('red_paint', (0.55, 0.035, 0.03), 0.0, 0.3, coat=0.6),
        'black_paint': lambda: mat('black_paint', (0.015, 0.015, 0.017), 0.0, 0.25, coat=0.7),
        'weld': lambda: noisy_mat('weld', (0.50, 0.04, 0.035), 0.0, 0.45, 0.1, 30, 0.6),
        'white': lambda: mat('white', (0.85, 0.85, 0.83), 0.0, 0.45),
        'red_plast': lambda: mat('red_plast', (0.6, 0.03, 0.02), 0.0, 0.4),
    }[key]
    _M[key] = f(); return _M[key]

def nm(o, name):
    o.name = name
    if o.data is not None: o.data.name = name
    return o

def hide(o):
    if not o.name.startswith('_'): o.name = '_' + o.name
    o.hide_render = True; o.hide_viewport = True; return o

def cutw(target, cutter, op='DIFFERENCE', self_=False, fast=False):
    md = target.modifiers.new('bool', 'BOOLEAN'); md.object = cutter; md.operation = op
    md.solver = 'FLOAT' if fast else 'EXACT'
    if self_ and not fast: md.use_self = True
    hide(cutter); return md

def apply_mods(o, types=None):
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    for m in list(o.modifiers):
        if types is None or m.type in types:
            try: bpy.ops.object.modifier_apply(modifier=m.name)
            except Exception as e: print('apply fail', o.name, m.name, e)
    return o

def to_mesh(o):
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); return bpy.context.active_object

def joinn(objs, name):
    objs = [o for o in objs if o is not None]
    o = join(objs, name); return nm(o, name)

def mesh_obj(name, verts, faces, m=None, smooth=True):
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in verts], [], faces); me.update()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    if m: o.data.materials.append(m)
    if smooth:
        for p in o.data.polygons: p.use_smooth = True
    return o

def prism(poly, d0, d1, name, axis='Y', m=None, holes=()):
    """Extrude a 2D polygon. axis='Y': poly is (x,z), extruded y=d0..d1. axis='Z': poly (x,y), z=d0..d1.
    axis='X': poly (y,z), x=d0..d1. Optional holes (list of 2D polys) are bridged via bmesh triangulation."""
    def P(u, v, d):
        if axis == 'Y': return (u, d, v)
        if axis == 'Z': return (u, v, d)
        return (d, u, v)
    bm = bmesh.new()
    loops = [poly] + list(holes)
    edges_all = []
    for lp in loops:
        vs = [bm.verts.new(P(u, v, d0)) for u, v in lp]
        for i in range(len(vs)): edges_all.append(bm.edges.new((vs[i], vs[(i + 1) % len(vs)])))
    if holes:
        bmesh.ops.triangle_fill(bm, use_beauty=True, use_dissolve=False, edges=edges_all, normal=P(0, 0, 1) if axis != 'Y' else (0, 1, 0))
    else:
        bm.faces.new(bm.verts[:])
    faces = bm.faces[:]
    r = bmesh.ops.extrude_face_region(bm, geom=faces)
    dv = {'Y': (0, d1 - d0, 0), 'Z': (0, 0, d1 - d0), 'X': (d1 - d0, 0, 0)}[axis]
    bmesh.ops.translate(bm, vec=dv, verts=[e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    if m: o.data.materials.append(m)
    return o

def rrect(w, h, r, n=6, cx=0, cy=0):
    """Rounded rectangle polygon (CCW)."""
    r = min(r, w / 2 - 1e-4, h / 2 - 1e-4); pts = []
    for (sx, sy, a0) in ((1, 1, 0), (-1, 1, 90), (-1, -1, 180), (1, -1, 270)):
        c = (cx + sx * (w / 2 - r), cy + sy * (h / 2 - r))
        for i in range(n + 1):
            a = math.radians(a0 + 90 * i / n); pts.append((c[0] + r * math.cos(a), c[1] + r * math.sin(a)))
    return pts

def circle(r, n=32, cx=0, cy=0, a0=0):
    return [(cx + r * math.cos(a0 + TAU * i / n), cy + r * math.sin(a0 + TAU * i / n)) for i in range(n)]

def sector(r0, r1, a0, a1, n=24, cx=0, cy=0):
    pts = [(cx + r1 * math.cos(a0 + (a1 - a0) * i / n), cy + r1 * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]
    pts += [(cx + r0 * math.cos(a1 - (a1 - a0) * i / n), cy + r0 * math.sin(a1 - (a1 - a0) * i / n)) for i in range(n + 1)]
    return pts

def loft(sections, name, m=None, cap=True, closed_path=False):
    """Skin a list of equal-length closed 3D point loops."""
    n = len(sections[0]); verts = [v for s in sections for v in s]; faces = []
    K = len(sections)
    for k in range(K - 1 + (1 if closed_path else 0)):
        a = k * n; b = ((k + 1) % K) * n
        for i in range(n):
            faces.append((a + i, a + (i + 1) % n, b + (i + 1) % n, b + i))
    if cap and not closed_path:
        faces.append(tuple(reversed(range(n)))); faces.append(tuple(range((K - 1) * n, K * n)))
    o = mesh_obj(name, verts, faces, m)
    bm = bmesh.new(); bm.from_mesh(o.data); bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:]); bm.to_mesh(o.data); bm.free()
    return o

def tube(pts, r, name, m=None, bezier=True, res=10, caps=True, sides=None, handles=None):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r
    cu.bevel_resolution = sides if sides is not None else 4; cu.use_fill_caps = caps; cu.resolution_u = res
    if bezier:
        sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
        for bp, p in zip(sp.bezier_points, pts):
            bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
        if handles:
            for i, (hl, hr) in handles.items():
                bp = sp.bezier_points[i]; bp.handle_left_type = bp.handle_right_type = 'FREE'
                if hl is not None: bp.handle_left = hl
                if hr is not None: bp.handle_right = hr
    else:
        sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
        for q, p in zip(sp.points, pts): q.co = (*p, 1)
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o)
    if m: o.data.materials.append(m)
    return o

def rod(a, b, r, name, m=None, verts=32):
    """Cylinder from point a to point b."""
    a = V(a); b = V(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d.length, location=(a + b) / 2, vertices=verts)
    o = bpy.context.active_object
    o.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); nm(o, name)
    if m: o.data.materials.append(m)
    return o

def orient(o, origin, axis_to):
    """Rotate object so its local +Z goes to axis_to, then place at origin."""
    o.rotation_euler = V(axis_to).to_track_quat('Z', 'Y').to_euler(); o.location = origin; return o

def bake(o):
    """Apply all modifiers and transforms (so the result can be duplicated/joined cheaply)."""
    if o.type == 'CURVE': o = to_mesh(o)
    apply_mods(o)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o

def instances(template, mats, name, m=None):
    """Create one object containing copies of a (baked) template mesh at each matrix."""
    bm = bmesh.new(); src = template.data
    for mx in mats:
        tmp = src.copy(); tmp.transform(mx)
        bm.from_mesh(tmp); bpy.data.meshes.remove(tmp)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    for s in template.data.materials: o.data.materials.append(s)
    if m and not o.data.materials: o.data.materials.append(m)
    return o

def hexnut(r, h, loc, rot, name, m=None):
    o = cyl(r, h, loc, rot, 6, name); finish(o, min(0.08, r * 0.12), 2, m=m or M('zinc')); return o

def capscrew(r, h, loc, rot, name, m=None, socket=True):
    o = cyl(r, h, loc, rot, 32, name)
    if socket:
        s = cyl(r * 0.45, h, loc, rot, 6, '_sock'); s.location = V(loc) + (mathutils.Euler(rot).to_matrix() @ V((0, 0, h * 0.6)))
        cutw(o, s, fast=True)
    finish(o, r * 0.18, 2, m=m or M('black_anod')); return o

def sprocket_poly(N, P, roller_d=1.02, tip_extra=None, phase=0.0, seat_pts=7):
    """2D tooth outline for a roller-chain sprocket centred on the origin. A seat (roller) sits at angle phase + k*2pi/N."""
    R = P / (2 * math.sin(math.pi / N)); rs = roller_d / 2 * 1.02
    Ro = R + (tip_extra if tip_extra is not None else 0.30 * P)
    phi = math.radians(62); pts = []
    for k in range(N):
        a = phase + k * TAU / N
        cx, cy = R * math.cos(a), R * math.sin(a)
        for i in range(seat_pts):
            t = a + math.pi + phi - 2 * phi * i / (seat_pts - 1)
            pts.append((cx + rs * math.cos(t), cy + rs * math.sin(t)))
        # flank to tooth tip (slightly rounded tip)
        at = a + math.pi / N; dw = 0.05 * P / Ro
        mid = (R + 0.5 * (Ro - R))
        pts.append((mid * math.cos(at - math.pi / N * 0.42), mid * math.sin(at - math.pi / N * 0.42)))
        pts.append((Ro * math.cos(at - dw), Ro * math.sin(at - dw)))
        pts.append((Ro * math.cos(at + dw), Ro * math.sin(at + dw)))
        pts.append((mid * math.cos(at + math.pi / N * 0.42), mid * math.sin(at + math.pi / N * 0.42)))
    return pts, R

def check(prefix):
    """Report object names not following the convention and triangle totals."""
    dg = bpy.context.evaluated_depsgraph_get(); tri = 0; n = 0; bad = []
    for o in bpy.context.scene.objects:
        if o.name.startswith('_') or o.type not in ('MESH', 'CURVE'): continue
        if o.hide_render: bad.append('HIDDEN:' + o.name)
        n += 1
        if not o.name.startswith(prefix + '__'): bad.append(o.name)
        oe = o.evaluated_get(dg)
        try:
            me = oe.to_mesh(); tri += sum(len(p.vertices) - 2 for p in me.polygons); oe.to_mesh_clear()
        except Exception: pass
    print(f'CHECK {prefix}: objects={n} tris={tri} bad={bad[:20]}')

def transform_all(mx, only=None):
    """Apply a world-space matrix to every object in the scene (or the given list)."""
    bpy.context.view_layer.update()
    for o in (only if only is not None else list(bpy.context.scene.objects)):
        if o.parent is None: o.matrix_world = mx @ o.matrix_world
