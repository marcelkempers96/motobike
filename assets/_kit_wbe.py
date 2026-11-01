"""Shared helpers for the wheels / body / electrical / rider-view part modules (helper, not an asset).
Units cm, Z up, +X forward, bike's left = -Y."""
import bpy, bmesh, math, os
from mathutils import Vector as V, Matrix
from lib3d import mat, noisy_mat, finish, cyl, box, torus, cut, join, brushed, spin, helix

TAU = math.tau
TEX = '/home/claude/mc/assets/textures'
os.makedirs(TEX, exist_ok=True)

# ---------------------------------------------------------------- materials (cached)
_M = {}
def M(key):
    if key in _M: return _M[key]
    f = {
        'chrome': lambda: mat('chrome', (0.80, 0.81, 0.83), 1.0, 0.06),
        'steel': lambda: mat('steel', (0.78, 0.78, 0.80), 1.0, 0.16),
        'darksteel': lambda: noisy_mat('darksteel', (0.22, 0.22, 0.23), 1.0, 0.32, 0.06, 150, 0.02),
        'zinc': lambda: noisy_mat('zinc', (0.80, 0.78, 0.68), 1.0, 0.25, 0.05, 200, 0.02),
        'alu_cast': lambda: noisy_mat('alu_cast', (0.80, 0.80, 0.81), 1.0, 0.36, 0.10, 120, 0.10),
        'alu_machined': lambda: brushed(noisy_mat('alu_mach', (0.86, 0.86, 0.87), 1.0, 0.18, 0.04, 300, 0.01), 'Z', 0.7),
        'alu_paint': lambda: mat('alu_paint', (0.60, 0.61, 0.63), 0.85, 0.30, coat=0.6),
        'anod_black': lambda: noisy_mat('anod_black', (0.035, 0.035, 0.04), 0.7, 0.30, 0.05, 200, 0.02),
        'satin_black': lambda: noisy_mat('satin_black', (0.025, 0.025, 0.027), 0.0, 0.42, 0.06, 90, 0.02),
        'gloss_black': lambda: mat('gloss_black', (0.015, 0.015, 0.017), 0.0, 0.12, coat=1.0),
        'rubber': lambda: noisy_mat('rubber', (0.028, 0.028, 0.03), 0.0, 0.62, 0.08, 220, 0.05),
        'rubber_soft': lambda: noisy_mat('rubber_soft', (0.045, 0.045, 0.047), 0.0, 0.72, 0.06, 400, 0.12),
        'plastic_black': lambda: noisy_mat('plastic_black', (0.03, 0.03, 0.032), 0.0, 0.48, 0.05, 300, 0.02),
        'plastic_grey': lambda: noisy_mat('plastic_grey', (0.22, 0.22, 0.23), 0.0, 0.5, 0.05, 300, 0.02),
        'plastic_white': lambda: noisy_mat('plastic_white', (0.82, 0.82, 0.80), 0.0, 0.38, 0.05, 300, 0.02),
        'brass': lambda: mat('brass', (0.80, 0.62, 0.32), 1.0, 0.25),
        'copper': lambda: mat('copper', (0.88, 0.50, 0.32), 1.0, 0.22),
        'lead': lambda: noisy_mat('lead', (0.42, 0.43, 0.45), 1.0, 0.45, 0.08, 200, 0.04),
        'glass': lambda: _glass('glass', (1, 1, 1), 0.0),
        'glass_red': lambda: _glass('glass_red', (0.85, 0.05, 0.04), 0.03),
        'glass_amber': lambda: _glass('glass_amber', (1.0, 0.45, 0.05), 0.03),
        'glass_smoke': lambda: _glass('glass_smoke', (0.35, 0.36, 0.38), 0.02),
        'orange': lambda: mat('hv_orange', (0.95, 0.30, 0.02), 0.0, 0.38),
        'red': lambda: mat('red', (0.60, 0.03, 0.02), 0.0, 0.38),
        'blue': lambda: mat('blue', (0.04, 0.12, 0.45), 0.0, 0.40),
        'yellow': lambda: mat('yellow', (0.85, 0.65, 0.02), 0.0, 0.40),
        'green': lambda: mat('green', (0.05, 0.40, 0.08), 0.0, 0.40),
        'white': lambda: mat('white', (0.85, 0.85, 0.83), 0.0, 0.40),
        'leather': lambda: _leather('leather', (0.028, 0.026, 0.025)),
        'leather_brown': lambda: _leather('leather_brown', (0.16, 0.075, 0.035)),
        'vinyl_grip': lambda: _leather('vinyl_grip', (0.03, 0.03, 0.032), 0.55),
        'reflector': lambda: mat('reflector', (0.95, 0.95, 0.96), 1.0, 0.02),
        'led_white': lambda: _emit('led_white', (1.0, 0.98, 0.95), 6.0),
        'led_red': lambda: _emit('led_red', (1.0, 0.05, 0.02), 4.0),
        'led_green': lambda: _emit('led_green', (0.1, 1.0, 0.2), 4.0),
        'led_amber': lambda: _emit('led_amber', (1.0, 0.5, 0.05), 4.0),
        'led_blue': lambda: _emit('led_blue', (0.1, 0.3, 1.0), 4.0),
        'led_off': lambda: mat('led_off', (0.35, 0.33, 0.30), 0.0, 0.2),
    }[key]
    _M[key] = f(); return _M[key]

def _glass(name, col, rough):
    m = mat(name, col, 0.0, rough)
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Transmission Weight'].default_value = 1.0
    b.inputs['IOR'].default_value = 1.5
    return m

def _emit(name, col, s):
    m = mat(name, col, 0.0, 0.3)
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Emission Color'].default_value = (*col, 1); b.inputs['Emission Strength'].default_value = s
    return m

def _leather(name, col, rough=0.5):
    m = mat(name, col, 0.0, rough)
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    vt = nt.nodes.new('ShaderNodeTexVoronoi'); vt.inputs['Scale'].default_value = 900.0
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.25; bp.inputs['Distance'].default_value = 0.01
    nt.links.new(vt.outputs['Distance'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    b.inputs['Coat Weight'].default_value = 0.15
    return m

def img_mat(name, path, rough=0.35, emit=0.0, metallic=0.0):
    m = mat(name, (1, 1, 1), metallic, rough)
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(path)
    nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    if emit:
        nt.links.new(t.outputs['Color'], b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = emit
    return m

# ---------------------------------------------------------------- mesh helpers
def mesh_obj(name, verts, faces, m=None, smooth=True, recalc=True, sharp=None):
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in verts], [], faces); me.update()
    if recalc:
        bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    if m: me.materials.append(m)
    if smooth:
        for p in me.polygons: p.use_smooth = True
        if sharp: me.set_sharp_from_angle(angle=math.radians(sharp))
    return o

def spline(ctrl, per=10, closed=False):
    """Catmull-Rom through control points -> dense list of Vectors."""
    P = [V(c) for c in ctrl]; out = []
    n = len(P); segs = n if closed else n - 1
    for i in range(segs):
        p0 = P[(i - 1) % n] if (closed or i > 0) else P[0] * 2 - P[1]
        p1 = P[i]; p2 = P[(i + 1) % n]
        p3 = P[(i + 2) % n] if (closed or i + 2 < n) else P[-1] * 2 - P[-2]
        for k in range(per):
            t = k / per; t2 = t * t; t3 = t2 * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    if not closed: out.append(P[-1].copy())
    return out

def frames(P, up=(0, 0, 1)):
    n = len(P); T = []
    for i in range(n):
        T.append((P[min(i + 1, n - 1)] - P[max(i - 1, 0)]).normalized())
    ref = V(up)
    if abs(T[0].dot(ref)) > 0.95: ref = V((1, 0, 0)) if abs(T[0].x) < 0.9 else V((0, 1, 0))
    Ns = [(ref - T[0] * ref.dot(T[0])).normalized()]
    for i in range(1, n):
        Nn = T[i - 1].rotation_difference(T[i]) @ Ns[-1]
        Ns.append((Nn - T[i] * Nn.dot(T[i])).normalized())
    return T, Ns, [T[i].cross(Ns[i]) for i in range(n)]

def sweep(P, r, name, m=None, sides=12, rfun=None, caps=True, normals=None, ell=(1.0, 1.0), up=(0, 0, 1), closed=False):
    """Tube along polyline P. rfun(t, s)->radius multiplier (t 0..1, s arc length). ell scales the N/B axes."""
    P = [V(p) for p in P]; n = len(P)
    T, N, B = frames(P, up)
    if normals:
        N = [(V(q) - T[i] * V(q).dot(T[i])).normalized() for i, q in enumerate(normals)]
        B = [T[i].cross(N[i]) for i in range(n)]
    s = [0.0]
    for i in range(1, n): s.append(s[-1] + (P[i] - P[i - 1]).length)
    verts = []
    for i, p in enumerate(P):
        rr = r * (rfun(i / (n - 1), s[i]) if rfun else 1.0)
        for k in range(sides):
            a = k * TAU / sides
            verts.append(p + N[i] * (math.cos(a) * rr * ell[0]) + B[i] * (math.sin(a) * rr * ell[1]))
    faces = []
    rng = n if closed else n - 1
    for i in range(rng):
        j = (i + 1) % n
        for k in range(sides):
            faces.append((i * sides + k, i * sides + (k + 1) % sides, j * sides + (k + 1) % sides, j * sides + k))
    if caps and not closed:
        faces.append(tuple(reversed(range(sides)))); faces.append(tuple(range((n - 1) * sides, n * sides)))
    return mesh_obj(name, verts, faces, m)

def rods(pairs, r, name, m=None, sides=8):
    """Many straight rods (spokes) in one mesh."""
    verts, faces = [], []
    for a, b in pairs:
        a, b = V(a), V(b); d = (b - a).normalized()
        ref = V((0, 0, 1)) if abs(d.z) < 0.9 else V((1, 0, 0))
        u = d.cross(ref).normalized(); w = d.cross(u)
        o = len(verts)
        for p in (a, b):
            for k in range(sides):
                an = k * TAU / sides; verts.append(p + (u * math.cos(an) + w * math.sin(an)) * r)
        for k in range(sides):
            faces.append((o + k, o + (k + 1) % sides, o + sides + (k + 1) % sides, o + sides + k))
        faces.append(tuple(o + k for k in reversed(range(sides)))); faces.append(tuple(o + sides + k for k in range(sides)))
    return mesh_obj(name, verts, faces, m)

def loft(sections, name, m=None, closed=True, caps=True):
    """Sections: lists of points with equal count. closed: each section is a closed loop."""
    k = len(sections[0]); verts = [V(p) for s in sections for p in s]; faces = []
    for i in range(len(sections) - 1):
        for j in range(k if closed else k - 1):
            j2 = (j + 1) % k
            faces.append((i * k + j, i * k + j2, (i + 1) * k + j2, (i + 1) * k + j))
    if caps and closed:
        faces.append(tuple(reversed(range(k)))); n = len(sections) - 1
        faces.append(tuple(range(n * k, n * k + k)))
    return mesh_obj(name, verts, faces, m)

def prism(poly, depth, name, m=None, round_r=0.0, round_idx=None, segs=4, z0=None):
    """Extrude 2D polygon (XY) along +Z by depth (centered unless z0 given). Optional corner rounding."""
    bm = bmesh.new()
    zb = -depth / 2 if z0 is None else z0
    vs = [bm.verts.new((x, y, zb)) for x, y in poly]
    f = bm.faces.new(vs)
    if round_r:
        sel = vs if round_idx is None else [vs[i] for i in round_idx]
        bmesh.ops.bevel(bm, geom=sel, offset=round_r, segments=segs, affect='VERTICES', offset_type='OFFSET')
    bm.faces.ensure_lookup_table(); f = max(bm.faces, key=lambda q: q.calc_area())
    bm.normal_update()
    if f.normal.z < 0: f.normal_flip()
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, depth), verts=[e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    if m: me.materials.append(m)
    return o

def rrect(w, h, r, n=6):
    """Rounded rectangle polygon centred at origin."""
    pts = []
    for cx, cy, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for k in range(n + 1):
            a = math.radians(a0 + 90 * k / n); pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def xform(objs, Mx):
    for o in objs: o.matrix_world = Mx @ o.matrix_world

def new_objs(before):
    return [o for o in bpy.context.scene.objects if o not in before]

def tex_plane(name, w, h, loc, rot, m):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=rot); o = bpy.context.active_object
    o.scale = (w, h, 1); bpy.ops.object.transform_apply(scale=True); o.name = name; o.data.materials.append(m); return o

def font(size, bold=True):
    from PIL import ImageFont
    for p in (['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'] if bold else ['/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']):
        if os.path.exists(p): return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def fix_normals(o):
    bm = bmesh.new(); bm.from_mesh(o.data); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(o.data); bm.free(); return o

def lathe(profile, name, m=None, segs=96):
    return fix_normals(spin(profile, name, 'Z', (0, 0, 0), segs, m))

def smooth_sharp(o, ang=35):
    for p in o.data.polygons: p.use_smooth = True
    o.data.set_sharp_from_angle(angle=math.radians(ang))
    return o

def cut(target, cutter, op='DIFFERENCE', self_=True):
    md = target.modifiers.new('bool', 'BOOLEAN'); md.object = cutter; md.operation = op; md.solver = 'EXACT'
    md.use_self = self_; md.use_hole_tolerant = True
    cutter.hide_render = True; cutter.hide_viewport = True
    return md

def bake(o):
    """Apply all current modifiers (call before finish()) and delete boolean cutters."""
    cutters = [md.object for md in o.modifiers if md.type == 'BOOLEAN' and md.object]
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
    o.modifiers.clear(); old = o.data; o.data = me
    for c in cutters:
        if c.name in bpy.data.objects: bpy.data.objects.remove(c)
    return o

def _sq(v, e): return math.copysign(abs(v) ** e, v)

def pad_loft(name, x0, x1, W, Ztop, Zbot, m=None, n=48, nx=60, ends_p=4.0, e=0.45, crown=0.0, top_mod=None, xs=None):
    """Upholstered pad as a loft along X. W(x), Ztop(x), Zbot(x) callables. Plan shape rounded with a superellipse.
    top_mod(x, yfrac) -> dz added to upper half. Returns (obj, sections)."""
    if xs is None:
        xs = [x0 + (x1 - x0) * (0.5 - 0.5 * math.cos(math.pi * i / nx)) for i in range(nx + 1)]
    secs = []
    for x in xs:
        u = (2 * (x - x0) / (x1 - x0) - 1) * 0.997
        s = (1 - abs(u) ** ends_p) ** (1 / ends_p)
        w = W(x) * s; zt, zb = Ztop(x), Zbot(x)
        zt = zb + (zt - zb) * (0.35 + 0.65 * s ** 0.5)
        zc, hh = (zt + zb) / 2, (zt - zb) / 2
        sec = []
        for k in range(n):
            th = k * TAU / n
            y = w / 2 * _sq(math.cos(th), e)
            sn = math.sin(th)
            z = zc + hh * _sq(sn, e)
            if sn > 0:
                yf = y / max(w / 2, 1e-6)
                z += crown * s * (1 - yf * yf) * sn
                if top_mod: z += top_mod(x, yf) * min(1.0, sn * 3)
            sec.append((x, y, z))
        secs.append(sec)
    return loft(secs, name, m), secs

# local (x, y, z) -> world (z, x, y): builds made "facing +Z" end up facing +X (forward)
TOFRONT = Matrix(((0, 0, 1, 0), (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 0, 1)))
TOREAR = Matrix(((0, 0, -1, 0), (-1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 0, 1)))

def grid_surface(name, nx, ny, x0, x1, y0, y1, fz, m=None, clip=None):
    """Height-field surface z=fz(x,y) on a grid; clip(x,y)->(x,y) to pull verts onto an outline."""
    verts, faces = [], []
    for j in range(ny + 1):
        for i in range(nx + 1):
            x = x0 + (x1 - x0) * i / nx; y = y0 + (y1 - y0) * j / ny
            if clip: x, y = clip(x, y)
            verts.append((x, y, fz(x, y)))
    for j in range(ny):
        for i in range(nx):
            a = j * (nx + 1) + i; faces.append((a, a + 1, a + nx + 2, a + nx + 1))
    return mesh_obj(name, verts, faces, m, recalc=False)
