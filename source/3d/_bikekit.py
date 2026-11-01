"""Shared builders for the full-motorcycle hero models (bike_classic_4t, bike_mx_2t, bike_electric).

Units 1 = 1 cm, Z up, +X forward, bike's left side faces -Y.  Wheel axles run along Y.
Geometry is accumulated in MB (mesh buffer) objects so that many small pieces of one
component become one mesh (keeps the object count low) without bpy.ops overhead.
"""
import sys, math, bpy, bmesh, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import mat, noisy_mat, brushed

V = mathutils.Vector
Mx = mathutils.Matrix
TAU = math.tau
X, Y, Z = V((1, 0, 0)), V((0, 1, 0)), V((0, 0, 1))
I3 = Mx.Identity(3)

def rad(d): return math.radians(d)
def basis(x, y, z): return Mx((tuple(x), tuple(y), tuple(z))).transposed()
def roty(a):
    c, s = math.cos(a), math.sin(a)
    return basis((c, 0, s), (0, 1, 0), (-s, 0, c))   # rotates +X towards +Z by a
def frame_from(z, hint=Y):
    z = V(z).normalized(); h = V(hint)
    x = h.cross(z)
    if x.length < 1e-5: x = X.cross(z) if abs(z.x) < 0.9 else Z.cross(z)
    x.normalize(); y = z.cross(x)
    return basis(x, y, z)
def T4(R=I3, t=(0, 0, 0)):
    m = R.to_4x4(); m.translation = V(t); return m
def xz(p, y=0.0): return V((p[0], y, p[1]))
def ym(p): return V((p[0], -p[1], p[2]))     # mirror left/right

# ------------------------------------------------------------------ materials
M = {}
def paint(name, rgb, rough=0.22, coat=0.8, metallic=0.0):
    if name in M: return M[name]
    m = mat(name, rgb, metallic, rough, coat=coat); M[name] = m; return m

def init():
    M.clear()
    M['chrome'] = mat('chrome', (0.94, 0.94, 0.95), 1.0, 0.04)
    M['polished'] = mat('polished', (0.90, 0.90, 0.91), 1.0, 0.12)
    M['alu'] = noisy_mat('alu_cast', (0.78, 0.78, 0.79), 1.0, 0.34, 0.08, 140, 0.05)
    M['alu_brushed'] = brushed(mat('alu_brushed', (0.85, 0.85, 0.86), 1.0, 0.18), 'Y', 0.6)
    M['alu_dark'] = noisy_mat('alu_dark', (0.18, 0.18, 0.19), 1.0, 0.32, 0.05, 140, 0.03)
    M['alu_frame'] = noisy_mat('alu_frame', (0.72, 0.73, 0.74), 1.0, 0.28, 0.05, 220, 0.02)
    M['steel'] = mat('steel', (0.62, 0.62, 0.64), 1.0, 0.24)
    M['steel_dark'] = mat('steel_dark', (0.16, 0.16, 0.17), 1.0, 0.32)
    M['disc'] = brushed(noisy_mat('disc', (0.66, 0.66, 0.67), 1.0, 0.2, 0.05, 400, 0.02), 'Y', 0.9)
    M['black_gloss'] = mat('black_gloss', (0.012, 0.012, 0.014), 0.0, 0.18, coat=0.9)
    M['black_satin'] = mat('black_satin', (0.02, 0.02, 0.022), 0.0, 0.42, coat=0.2)
    M['black_cast'] = noisy_mat('black_cast', (0.025, 0.025, 0.027), 0.0, 0.45, 0.08, 90, 0.10)
    M['plastic_black'] = noisy_mat('plastic_black', (0.018, 0.018, 0.019), 0.0, 0.5, 0.05, 300, 0.02)
    M['rubber'] = mat('rubber', (0.022, 0.022, 0.022), 0.0, 0.62)
    M['tyre'] = noisy_mat('tyre', (0.03, 0.03, 0.03), 0.0, 0.72, 0.08, 260, 0.25)
    M['vinyl'] = noisy_mat('vinyl', (0.025, 0.022, 0.02), 0.0, 0.5, 0.1, 500, 0.12)
    M['knee'] = noisy_mat('kneepad', (0.03, 0.03, 0.03), 0.0, 0.7, 0.1, 50, 0.4)
    g = bpy.data.materials.new('glass'); g.use_nodes = True; b = g.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.95, 0.96, 0.98, 1); b.inputs['Transmission Weight'].default_value = 1.0
    b.inputs['Roughness'].default_value = 0.02; b.inputs['IOR'].default_value = 1.45; M['glass'] = g
    for nm, col in (('lens_red', (0.75, 0.02, 0.01)), ('lens_amber', (0.95, 0.42, 0.02))):
        l = bpy.data.materials.new(nm); l.use_nodes = True; b = l.node_tree.nodes['Principled BSDF']
        b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Transmission Weight'].default_value = 0.85
        b.inputs['Roughness'].default_value = 0.12; b.inputs['Emission Color'].default_value = (*col, 1)
        b.inputs['Emission Strength'].default_value = 0.6; M[nm] = l
    e = bpy.data.materials.new('led'); e.use_nodes = True; b = e.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (1, 1, 1, 1); b.inputs['Emission Color'].default_value = (0.92, 0.96, 1.0, 1)
    b.inputs['Emission Strength'].default_value = 3.0; M['led'] = e
    s = bpy.data.materials.new('screen'); s.use_nodes = True; b = s.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.01, 0.012, 0.015, 1); b.inputs['Roughness'].default_value = 0.05
    b.inputs['Coat Weight'].default_value = 1.0; b.inputs['Emission Color'].default_value = (0.05, 0.25, 0.45, 1)
    b.inputs['Emission Strength'].default_value = 0.6; M['screen'] = s
    M['dial'] = mat('dial', (0.85, 0.85, 0.82), 0.0, 0.35)
    M['dial_black'] = mat('dial_black', (0.02, 0.02, 0.025), 0.0, 0.3)
    M['needle'] = mat('needle', (0.9, 0.25, 0.05), 0.0, 0.3)
    M['copper'] = mat('copper', (0.85, 0.45, 0.25), 1.0, 0.25)
    M['brass'] = mat('brass', (0.78, 0.6, 0.3), 1.0, 0.25)
    M['gold'] = noisy_mat('gold_anod', (0.86, 0.62, 0.20), 1.0, 0.24, 0.04, 200, 0.01)
    M['kashima'] = mat('kashima', (0.72, 0.55, 0.26), 1.0, 0.12)
    M['bronze'] = noisy_mat('bronze_pipe', (0.52, 0.31, 0.16), 1.0, 0.33, 0.1, 30, 0.03)
    M['orange_hv'] = mat('orange_hv', (0.95, 0.30, 0.02), 0.0, 0.42)
    M['wire_black'] = noisy_mat('wire_black', (0.015, 0.015, 0.015), 0.0, 0.5, 0.08, 400, 0.05)
    M['friction'] = mat('pad', (0.16, 0.14, 0.12), 0.0, 0.8)
    M['radiator'] = noisy_mat('radcore', (0.12, 0.12, 0.13), 1.0, 0.45, 0.1, 900, 0.5)
    M['white'] = paint('white_plastic', (0.85, 0.85, 0.84), 0.38, 0.2)
    return M

def nm(cat, comp, sub=None):
    assert cat in ('electrical', 'powertrain', 'chassis', 'transmission', 'frame_body', 'wheels', 'wiring'), cat
    return f'{cat}__{comp}' + (f'__{sub}' if sub else '')

# ------------------------------------------------------------------ mesh buffer
def cr_sample(pts, res, closed=False):
    """Catmull-Rom through pts; returns (points, params) where param = control index + t."""
    P = [V(p) for p in pts]; n = len(P)
    if n < 3 or res <= 1:
        out, par = [], []
        segs = n if closed else n - 1
        for i in range(segs):
            for k in range(max(res, 1)):
                t = k / max(res, 1); out.append(P[i].lerp(P[(i + 1) % n], t)); par.append(i + t)
        if not closed: out.append(P[-1]); par.append(n - 1)
        return out, par
    out, par = [], []
    segs = n if closed else n - 1
    for i in range(segs):
        p1 = P[i]; p2 = P[(i + 1) % n]
        p0 = P[(i - 1) % n] if (closed or i > 0) else 2 * P[0] - P[1]
        p3 = P[(i + 2) % n] if (closed or i + 2 < n) else 2 * P[-1] - P[-2]
        for k in range(res):
            t = k / res; t2 = t * t; t3 = t2 * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
            par.append(i + t)
    if not closed: out.append(P[-1]); par.append(n - 1)
    return out, par

def circle_prof(r=1.0, n=16):
    return [(r * math.cos(TAU * i / n), r * math.sin(TAU * i / n)) for i in range(n)]
def rect_prof(w, h, rr=0.0, n=4):
    """rounded rectangle, w along local N (first axis), h along B."""
    if rr <= 0: return [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]
    pts = []
    for cx, cy, a0 in ((w / 2 - rr, -h / 2 + rr, -90), (w / 2 - rr, h / 2 - rr, 0), (-w / 2 + rr, h / 2 - rr, 90), (-w / 2 + rr, -h / 2 + rr, 180)):
        for k in range(n + 1):
            a = rad(a0 + 90 * k / n); pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return pts
def sell_prof(a, b, e=2.0, n=32):
    out = []
    for i in range(n):
        t = TAU * i / n; c, s = math.cos(t), math.sin(t)
        out.append((a * math.copysign(abs(c) ** (2 / e), c), b * math.copysign(abs(s) ** (2 / e), s)))
    return out

class MB:
    def __init__(s, T=None):
        s.v = []; s.f = []; s.sm = []; s.mi = []; s.T = T if T is not None else Mx.Identity(4)
    def _p(s, p): return s.T @ V(p)
    def add(s, verts, faces, smooth=True, mi=0):
        o = len(s.v); s.v.extend(s._p(p) for p in verts)
        for f in faces:
            s.f.append(tuple(i + o for i in f)); s.sm.append(smooth); s.mi.append(mi)
        return s
    def box(s, c, size, R=I3, mi=0):
        c = V(c); hx, hy, hz = size[0] / 2, size[1] / 2, size[2] / 2
        vs = [c + R @ V((x, y, z)) for x in (-hx, hx) for y in (-hy, hy) for z in (-hz, hz)]
        fs = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
        return s.add(vs, fs, False, mi)
    def cyl(s, p0, p1, r, n=16, r1=None, caps=True, mi=0, hint=None):
        p0, p1 = V(p0), V(p1); ax = p1 - p0
        R = frame_from(ax, hint if hint is not None else (Y if abs(ax.normalized().y) < 0.9 else X))
        r1 = r if r1 is None else r1; vs = []
        for rr, pp in ((r, p0), (r1, p1)):
            for i in range(n):
                a = TAU * i / n; vs.append(pp + R @ V((rr * math.cos(a), rr * math.sin(a), 0)))
        fs = [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
        s.add(vs, fs, True, mi)
        if caps:
            o = len(s.v) - 2 * n
            s.f.append(tuple(o + i for i in reversed(range(n)))); s.sm.append(False); s.mi.append(mi)
            s.f.append(tuple(o + n + i for i in range(n))); s.sm.append(False); s.mi.append(mi)
        return s
    def lathe(s, prof, origin=(0, 0, 0), axis=Z, n=64, closed=False, a0=0.0, a1=TAU, u=None, w=None, mi=0, smooth=True):
        """profile (r, z) revolved around axis through origin. u,w = in-plane basis (angle 0 along u, 90 along w)."""
        ax = V(axis).normalized(); o = V(origin)
        if u is None:
            ref = X if abs(ax.x) < 0.9 else Z; u = (ref - ref.dot(ax) * ax).normalized()
        u = V(u)
        w = V(w) if w is not None else ax.cross(u)
        full = abs((a1 - a0) - TAU) < 1e-6
        steps = n if full else n + 1; m = len(prof); vs = []
        for k in range(steps):
            th = a0 + (a1 - a0) * k / n; d = u * math.cos(th) + w * math.sin(th)
            for r, z in prof: vs.append(o + d * r + ax * z)
        fs = []; pe = m if closed else m - 1
        for k in range(n if full else n):
            k2 = (k + 1) % steps
            for j in range(pe):
                j2 = (j + 1) % m
                fs.append((k * m + j, k * m + j2, k2 * m + j2, k2 * m + j))
        return s.add(vs, fs, smooth, mi)
    def sweep(s, pts, r=1.0, prof=None, n=16, radii=None, res=8, closed=False, caps=True, up=None, smooth_path=True, mi=0, open_prof=False):
        if smooth_path: P, par = cr_sample(pts, res, closed)
        else: P, par = [V(p) for p in pts], list(range(len(pts)))
        if closed and (P[0] - P[-1]).length < 1e-6: P = P[:-1]; par = par[:-1]
        N = len(P)
        prof = prof or circle_prof(1.0, n); m = len(prof)
        Tg = []
        for i in range(N):
            if closed: a = P[(i + 1) % N] - P[i - 1]
            else: a = P[min(i + 1, N - 1)] - P[max(i - 1, 0)]
            Tg.append(a.normalized())
        Nn = []
        if up is not None:
            uu = V(up)
            for t in Tg:
                q = uu - uu.dot(t) * t
                if q.length < 1e-4: q = (Z if abs(t.z) < 0.9 else X); q = q - q.dot(t) * t
                Nn.append(q.normalized())
        else:
            t0 = Tg[0]; ref = Z if abs(t0.z) < 0.9 else X
            Nn.append((ref - ref.dot(t0) * t0).normalized())
            for i in range(1, N):
                b = Tg[i - 1].cross(Tg[i])
                if b.length < 1e-7: Nn.append(Nn[-1].copy()); continue
                q = mathutils.Quaternion(b.normalized(), Tg[i - 1].angle(Tg[i]))
                Nn.append((q @ Nn[-1]).normalized())
        vs = []
        for i in range(N):
            if radii is None: sx = sy = r
            else:
                pi = par[i]; i0 = int(math.floor(pi)); t = pi - i0
                ra = radii[i0 % len(radii)]; rb = radii[min(i0 + 1, len(radii) - 1)] if not closed else radii[(i0 + 1) % len(radii)]
                ra = ra if isinstance(ra, (tuple, list)) else (ra, ra); rb = rb if isinstance(rb, (tuple, list)) else (rb, rb)
                sx = ra[0] + (rb[0] - ra[0]) * t; sy = ra[1] + (rb[1] - ra[1]) * t
            B = Tg[i].cross(Nn[i])
            for px, py in prof: vs.append(P[i] + Nn[i] * px * sx + B * py * sy)
        fs = []; pe = m - 1 if open_prof else m
        for i in range(N if closed else N - 1):
            i2 = (i + 1) % N
            for j in range(pe):
                j2 = (j + 1) % m
                fs.append((i * m + j, i * m + j2, i2 * m + j2, i2 * m + j))
        s.add(vs, fs, True, mi)
        if caps and not closed and not open_prof:
            o = len(s.v) - N * m
            s.f.append(tuple(o + j for j in reversed(range(m)))); s.sm.append(False); s.mi.append(mi)
            s.f.append(tuple(o + (N - 1) * m + j for j in range(m))); s.sm.append(False); s.mi.append(mi)
        return s
    def loft(s, rings, caps=True, closed_ring=True, mi=0, smooth=True):
        m = len(rings[0]); vs = [p for r in rings for p in r]; fs = []
        pe = m if closed_ring else m - 1
        for i in range(len(rings) - 1):
            for j in range(pe):
                j2 = (j + 1) % m
                fs.append((i * m + j, i * m + j2, (i + 1) * m + j2, (i + 1) * m + j))
        s.add(vs, fs, smooth, mi)
        if caps:
            o = len(s.v) - len(vs)
            s.f.append(tuple(o + j for j in reversed(range(m)))); s.sm.append(False); s.mi.append(mi)
            s.f.append(tuple(o + (len(rings) - 1) * m + j for j in range(m))); s.sm.append(False); s.mi.append(mi)
        return s
    def loft_x(s, secs, cy=0.0, n=40, caps=True, mi=0, res=1):
        """secs: (x, cz, half_width, top, bottom, exponent) cross-sections in the YZ plane, interpolated."""
        if res > 1:
            cols = list(zip(*secs)); dense = []
            sp = [cr_sample([(c[i], 0, 0) for i in range(len(secs))], res)[0] for c in cols]
            secs = [tuple(sp[k][i].x for k in range(len(cols))) for i in range(len(sp[0]))]
        rings = []
        for x, cz, hw, tp, bt, e in secs:
            ring = []
            for j in range(n):
                t = TAU * j / n; c, sn = math.cos(t), math.sin(t)
                yy = cy + hw * math.copysign(abs(c) ** (2 / e), c)
                zz = cz + (tp if sn > 0 else bt) * math.copysign(abs(sn) ** (2 / e), sn)
                ring.append(V((x, yy, zz)))
            rings.append(ring)
        return s.loft(rings, caps, True, mi)
    def plate(s, c, R, hx, hy, thick, e=4.0, n=32, mi=0):
        """superellipse plate: footprint in local XY of R, thickness along local Z."""
        c = V(c); prof = sell_prof(hx, hy, e, n); vs = []
        for z in (-thick / 2, thick / 2):
            for px, py in prof: vs.append(c + R @ V((px, py, z)))
        fs = [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
        fs.append(tuple(reversed(range(n)))); fs.append(tuple(n + i for i in range(n)))
        return s.add(vs, fs, False, mi)
    def panel(s, outline, y0, y1, mi=0, plane='xz'):
        """flat extruded polygon: outline (a,b) in the XZ plane, extruded from y0 to y1."""
        m = len(outline); vs = []
        for y in (y0, y1):
            for a, b in outline: vs.append(V((a, y, b)) if plane == 'xz' else V((a, b, y)))
        fs = [(i, (i + 1) % m, m + (i + 1) % m, m + i) for i in range(m)]
        fs.append(tuple(reversed(range(m)))); fs.append(tuple(m + i for i in range(m)))
        return s.add(vs, fs, False, mi)
    def annulus(s, C, ax, u, w, rout, rin, z0, z1, n=96, mi=0):
        """flat ring in plane (u,w) around axis ax at C; rout may be a function of angle."""
        C = V(C); ro = rout if callable(rout) else (lambda t: rout); vs = []
        for z in (z0, z1):
            for i in range(n):
                t = TAU * i / n; d = u * math.cos(t) + w * math.sin(t)
                vs.append(C + d * ro(t) + ax * z); vs.append(C + d * rin + ax * z)
        fs = []
        for i in range(n):
            a, b = 2 * i, 2 * ((i + 1) % n); q = 2 * n
            fs += [(a, b, b + 1, a + 1), (q + a, q + a + 1, q + b + 1, q + b), (a, q + a, q + b, b), (a + 1, b + 1, q + b + 1, q + a + 1)]
        return s.add(vs, fs, False, mi)
    def emit(s, name, mats, bevel=0.0, seg=2, angle=50, harden=True, weld=True):
        me = bpy.data.meshes.new(name)
        me.from_pydata([tuple(p) for p in s.v], [], s.f)
        me.polygons.foreach_set('use_smooth', s.sm)
        me.polygons.foreach_set('material_index', s.mi)
        bm = bmesh.new(); bm.from_mesh(me)
        if weld: bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
        bmesh.ops.dissolve_degenerate(bm, dist=1e-5, edges=bm.edges)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(me); bm.free()
        o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
        for m in (mats if isinstance(mats, (list, tuple)) else [mats]): me.materials.append(m)
        if bevel:
            bv = o.modifiers.new('bevel', 'BEVEL'); bv.width = bevel; bv.segments = seg
            bv.limit_method = 'ANGLE'; bv.angle_limit = rad(angle)
            try: bv.harden_normals = harden
            except Exception: pass
        return o

def one(name, m, fn, bevel=0.0, seg=2, **kw):
    b = MB(); fn(b); return b.emit(name, m, bevel, seg, **kw)

# ------------------------------------------------------------------ geometry helpers
def fork_axes(rake):
    d = V((-math.sin(rad(rake)), 0, math.cos(rad(rake))))   # up the steering axis
    n = V((math.cos(rad(rake)), 0, math.sin(rad(rake))))    # forward, perpendicular
    return d, n

def tyre_profile(rr, h, w, e=2.4, npts=96, grooves=(), gdepth=0.35, gw=0.3):
    """closed (r, a) loop of the tyre section; grooves = list of axial positions of circumferential grooves."""
    rc = rr + h * 0.46; B = h * 0.54; A = w / 2; rb = rr + 0.25
    k = (rc - rb) / B; k = min(k, 0.999)
    s0 = -(k ** (e / 2)); p0 = math.asin(s0)
    pts = []
    for i in range(npts + 1):
        p = p0 + (math.pi - 2 * p0) * i / npts
        c, s = math.cos(p), math.sin(p)
        r = rc + B * math.copysign(abs(s) ** (2 / e), s); a = A * math.copysign(abs(c) ** (2 / e), c)
        for g in grooves:
            if abs(a - g) < gw and r > rc + B * 0.6: r -= gdepth
        pts.append((r, a))
    pts[0] = (rb, pts[0][1]); pts[-1] = (rb, pts[-1][1])
    pts.append((rb - 0.6, -A * 0.45)); pts.append((rb - 0.6, A * 0.45))
    return pts, (rc, A, B, e, p0)

def tyre_point(geom, f):
    """surface point (r, a) and outward normal (nr, na) at lateral fraction f (-1..1) of the crown arc."""
    rc, A, B, e, p0 = geom
    p = math.pi / 2 - f * (math.pi / 2 - p0) * 0.98
    def P(q):
        c, s = math.cos(q), math.sin(q)
        return V((rc + B * math.copysign(abs(s) ** (2 / e), s), A * math.copysign(abs(c) ** (2 / e), c)))
    a, b = P(p - 1e-3), P(p + 1e-3); t = (b - a).normalized(); nrm = V((-t.y, t.x))
    if nrm.x < 0: nrm = -nrm
    return P(p), nrm

def wheel(cat_comp, C, rim_in, tyre_h, tyre_w, rim_w, kind='spoked', tread='ribbed', spokes=36, hub_w=10.0,
          rim_m=None, hub_m=None, spoke_m=None, hub_r=5.0, flange_r=5.5, drum=None, rimlock_m=None, cast_spokes=5):
    """Builds tyre/rim/spokes/hub objects. rim_in = rim diameter in inches. Returns dict of objects + radii."""
    C = V(C); rr = rim_in * 2.54 / 2; R = rr + tyre_h; out = {}
    rim_m = rim_m or M['alu']; hub_m = hub_m or M['alu']; spoke_m = spoke_m or M['chrome']
    U, W = X, Z   # angle 0 forward, 90 up
    # --- tyre
    grooves = ()
    if tread == 'ribbed': grooves = (-tyre_w * 0.28, -tyre_w * 0.1, tyre_w * 0.1, tyre_w * 0.28)
    if tread == 'road': grooves = (-tyre_w * 0.18, tyre_w * 0.18)
    prof, geom = tyre_profile(rr, tyre_h - (0.0 if tread in ('ribbed', 'road') else (1.1 if tread == 'knobby' else 0.55)), tyre_w * (0.92 if tread == 'knobby' else 1.0),
                              2.6 if tread != 'knobby' else 2.2, 110, grooves, 0.4, 0.32)
    tb = MB(); tb.lathe(prof, C, Y, 128 if tread in ('ribbed', 'road') else 96, closed=True, u=U, w=W)
    if tread in ('block', 'knobby', 'dual'):
        if tread == 'knobby':
            nA = 34; hgt = 1.25
            rows = [(-0.05, 0, 2.2, 2.0), (0.0, 0.5, 2.0, 2.4),   # (f, phase, len, width)
                    (-0.42, 0.25, 2.0, 1.8), (0.42, 0.25, 2.0, 1.8), (-0.78, 0.0, 2.2, 1.7), (0.78, 0.0, 2.2, 1.7), (-0.95, 0.5, 1.8, 1.4), (0.95, 0.5, 1.8, 1.4)]
            rows = [r for r in rows if not (r[0] == -0.05)]
        elif tread == 'dual':
            nA = 40; hgt = 0.6
            rows = [(-0.18, 0, 2.6, 2.6), (0.18, 0.5, 2.6, 2.6), (-0.55, 0.25, 2.4, 2.2), (0.55, 0.75, 2.4, 2.2), (-0.86, 0.0, 2.6, 1.8), (0.86, 0.5, 2.6, 1.8)]
        else:
            nA = 60; hgt = 0.34
            rows = [(-0.12, 0.0, 2.2, 2.2), (0.12, 0.5, 2.2, 2.2), (-0.45, 0.25, 2.0, 2.4), (0.45, 0.75, 2.0, 2.4), (-0.74, 0.0, 2.0, 1.8), (0.74, 0.5, 2.0, 1.8)]
        kb = MB()
        for k in range(nA):
            for f, ph, ln, wd in rows:
                th = TAU * (k + ph) / nA
                (r0, a0), (nr, na) = tyre_point(geom, f)
                rho = U * math.cos(th) + W * math.sin(th); tau = -U * math.sin(th) + W * math.cos(th)
                nrm = (rho * nr + Y * na).normalized(); b = nrm.cross(tau).normalized()
                Rk = basis(tau, b, nrm)
                cen = C + rho * r0 + Y * a0 + nrm * (hgt / 2 - 0.25)
                if tread == 'knobby' and abs(f) > 0.6: Rk = Rk @ Mx.Rotation(rad(20 if f > 0 else -20), 3, 'Z')
                kb.box(cen, (ln, wd, hgt + 0.5), Rk)
        tb.v += kb.v; o0 = len(tb.v) - len(kb.v)
        tb.f += [tuple(i + o0 for i in f) for f in kb.f]; tb.sm += kb.sm; tb.mi += kb.mi
    out['tyre'] = tb.emit(cat_comp + '__tyre', M['tyre'], 0.18 if tread in ('block', 'knobby', 'dual') else 0.0, 2, angle=60)
    # --- rim
    rimp = [(rr + 1.0, -rim_w / 2 - 0.25), (rr + 1.1, -rim_w / 2 + 0.15), (rr + 0.25, -rim_w / 2 + 0.35), (rr - 0.5, -rim_w * 0.18),
            (rr - 0.5, rim_w * 0.18), (rr + 0.25, rim_w / 2 - 0.35), (rr + 1.1, rim_w / 2 - 0.15), (rr + 1.0, rim_w / 2 + 0.25),
            (rr - 0.3, rim_w / 2 + 0.05), (rr - 1.6, rim_w * 0.32), (rr - 1.8, 0), (rr - 1.6, -rim_w * 0.32), (rr - 0.3, -rim_w / 2 - 0.05)]
    rb = MB(); rb.lathe(rimp, C, Y, 128, closed=True, u=U, w=W)
    if rimlock_m is not None:
        rl = MB(); th = rad(200); rho = U * math.cos(th) + W * math.sin(th)
        rl.cyl(C + rho * (rr - 1.7), C + rho * (rr - 4.2), 0.55, 12); rl.cyl(C + rho * (rr - 3.0), C + rho * (rr - 3.6), 0.9, 6)
        out['rimlock'] = rl.emit(cat_comp + '__rim_lock', rimlock_m, 0.05)
    out['rim'] = rb.emit(cat_comp + '__rim', rim_m, 0.12, 2)
    # --- spokes / cast spokes
    if kind == 'spoked':
        sb = MB(); nb = MB()
        fy = hub_w / 2 - 0.4
        for i in range(spokes):
            side = 1 if i % 2 == 0 else -1
            al = TAU * i / spokes
            lead = 1 if (i // 2) % 2 == 0 else -1
            be = al + lead * rad(3 * 720 / spokes) * 0.75
            hp = C + (U * math.cos(al) + W * math.sin(al)) * (flange_r - 0.5) + Y * side * fy
            rp = C + (U * math.cos(be) + W * math.sin(be)) * (rr - 1.5) + Y * side * 0.4
            sb.cyl(hp, rp, 0.18, 6, caps=False)
            dirv = (rp - hp).normalized()
            nb.cyl(rp - dirv * 1.1, rp + dirv * 0.2, 0.3, 8)
        out['spokes'] = sb.emit(cat_comp + '__spokes', spoke_m)
        out['nipples'] = nb.emit(cat_comp + '__nipples', M['chrome'])
        # hub: lathe along Y
        hp_ = [(1.2, -hub_w / 2 - 1.0), (2.2, -hub_w / 2 - 1.0), (2.4, -hub_w / 2), (flange_r + 0.5, -hub_w / 2 + 0.1), (flange_r + 0.5, -hub_w / 2 + 0.9),
               (hub_r, -hub_w / 2 + 1.4), (hub_r * 0.8, -hub_w * 0.2), (hub_r * 0.8, hub_w * 0.2), (hub_r, hub_w / 2 - 1.4),
               (flange_r + 0.5, hub_w / 2 - 0.9), (flange_r + 0.5, hub_w / 2 - 0.1), (2.4, hub_w / 2), (2.2, hub_w / 2 + 1.0), (1.2, hub_w / 2 + 1.0)]
        hb = MB(); hb.lathe(hp_, C, Y, 64, closed=True, u=U, w=W)
        if drum:   # (side, radius, width) brake drum on the hub
            sd, dr, dw = drum
            y0 = sd * (hub_w / 2 - 0.3)
            dp = [(2.4, y0), (dr, y0), (dr + 0.15, y0 + sd * dw * 0.3), (dr, y0 + sd * dw), (2.4, y0 + sd * dw)]
            hb.lathe(dp, C, Y, 72, closed=True, u=U, w=W)
            for k in range(14):
                th = TAU * k / 14; rho = U * math.cos(th) + W * math.sin(th)
                hb.box(C + rho * (dr + 0.2) + Y * (y0 + sd * dw * 0.55), (0.35, dw * 0.8, 0.5), basis(-U * math.sin(th) + W * math.cos(th), Y, rho))
        out['hub'] = hb.emit(cat_comp + '__hub', hub_m, 0.12, 2)
    else:
        sb = MB()
        hub_rr = 7.0
        for i in range(cast_spokes):
            for side in (-1, 1):
                al = TAU * i / cast_spokes + side * rad(7)
                rim_al = al + side * rad(9)
                d0 = U * math.cos(al) + W * math.sin(al); d1 = U * math.cos(rim_al) + W * math.sin(rim_al)
                mid = (d0 + d1).normalized()
                pts = [C + d0 * (hub_rr - 1.0), C + mid * ((hub_rr + rr) / 2) + Y * 0.2, C + d1 * (rr - 1.2)]
                sb.sweep(pts, prof=sell_prof(1.0, 1.0, 3.0, 16), radii=[(1.5, 1.6), (1.15, 1.0), (1.4, 0.9)], res=8, up=Y)
        hp_ = [(1.4, -hub_w / 2 - 0.6), (3.2, -hub_w / 2 - 0.6), (hub_rr, -hub_w / 2 + 1.5), (hub_rr + 0.6, 0), (hub_rr, hub_w / 2 - 1.5),
               (3.2, hub_w / 2 + 0.6), (1.4, hub_w / 2 + 0.6)]
        sb.lathe(hp_, C, Y, 64, closed=True, u=U, w=W)
        out['spokes'] = sb.emit(cat_comp + '__cast_spokes', rim_m, 0.1, 2, angle=40)
    out['R'] = R; out['rr'] = rr
    return out

def axle(name, C, half, r=1.0, m=None):
    def f(b):
        C_ = V(C); b.cyl(C_ - Y * half, C_ + Y * half, r, 24)
        for s in (-1, 1): b.cyl(C_ + Y * s * half, C_ + Y * s * (half + 0.9), r * 1.7, 6)
    return one(name, m or M['steel'], f, 0.06)

def disc(name, C, ro, ri, y, thick=0.5, wave=0.0, holes=True, carrier_m=None, arms=6, inner=None, boss_to=None):
    C = V(C); U, W = X, Z
    if wave:
        k = 12; rof = lambda t: ro - wave * (0.5 - 0.5 * math.cos(k * t)) ** 0.8
    else: rof = ro
    b = MB(); b.annulus(C, Y, U, W, rof, ri, y - thick / 2, y + thick / 2, 192 if wave else 128)
    if holes:
        band = (ro - ri) - wave
        for row, f in enumerate((0.3, 0.55, 0.8)):
            nh = 18
            for i in range(nh):
                t = TAU * (i + row * 0.33) / nh; d = U * math.cos(t) + W * math.sin(t)
                p = C + d * (ri + band * f)
                b.cyl(p + Y * (y - thick / 2 - 0.02), p + Y * (y + thick / 2 + 0.02), 0.32, 10, mi=1)
    o = b.emit(name, [M['disc'], M['black_satin']], 0.04, 2)
    # carrier
    cm = carrier_m or M['alu_dark']; inner = inner or 3.5
    cb = MB(); cb.annulus(C, Y, U, W, ri + 0.15, ri - 1.1, y - 0.35, y + 0.35, 96)
    cb.annulus(C, Y, U, W, inner + 1.6, inner, y - 0.45, y + 0.45, 64)
    for i in range(arms):
        t = TAU * (i + 0.5) / arms; d = U * math.cos(t) + W * math.sin(t); tg = -U * math.sin(t) + W * math.cos(t)
        cb.box(C + d * ((ri + inner) / 2) + Y * y, (ri - inner - 0.6, 0.7, 1.4), basis(d, Y, tg))
    for i in range(arms * 2):
        t = TAU * i / (arms * 2); d = U * math.cos(t) + W * math.sin(t)
        cb.cyl(C + d * (ri - 0.3) + Y * (y - thick / 2 - 0.2), C + d * (ri - 0.3) + Y * (y + thick / 2 + 0.2), 0.42, 12, mi=1)
    if boss_to is not None:
        cb.cyl(C + Y * y, C + Y * boss_to, inner + 1.3, 32)
    co = cb.emit(name + '_carrier', [cm, M['chrome']], 0.05, 2)
    return o, co

def caliper(name, C, r_eff, theta, y, thick=0.5, size=(9.0, 4.5), mount=None, m=None, pistons=2):
    """caliper straddling a disc at angle theta (radians, 0=forward, 90=up) around wheel centre C."""
    C = V(C); rho = X * math.cos(theta) + Z * math.sin(theta); tau = -X * math.sin(theta) + Z * math.cos(theta)
    R = basis(tau, Y, rho); c0 = C + rho * r_eff + Y * y
    b = MB(); L, H = size
    for s in (-1, 1):
        b.box(c0 + Y * s * (thick / 2 + 1.0), (L, 1.7, H), R)
        for k in range(pistons):
            xx = (k - (pistons - 1) / 2) * (L / pistons)
            b.cyl(c0 + tau * xx + Y * s * (thick / 2 + 1.8), c0 + tau * xx + Y * s * (thick / 2 + 2.5), H * 0.36, 24, r1=H * 0.3)
    b.box(c0 + rho * (H / 2 - 0.4), (L * 0.9, thick + 3.4, 1.2), R)
    if mount is not None:
        for s in (-1, 1):
            b.cyl(c0 + tau * s * L * 0.38 - rho * H * 0.3 + Y * (-(thick / 2 + 1.0) if y < 0 else (thick / 2 + 1.0)), V(mount) + tau * s * 2.4, 0.9, 12)
    o = b.emit(name, m or M['alu'], 0.35, 2)
    pb = MB()
    for s in (-1, 1): pb.box(c0 + Y * s * (thick / 2 + 0.25), (L * 0.8, 0.45, H * 0.7), R)
    return o, pb.emit(name + '_pads', M['friction'], 0.04)

def sprocket(name, C, teeth, y, thick=0.6, pitch=1.5875, m=None, holes=0, inner=None):
    C = V(C); rp = pitch / (2 * math.sin(math.pi / teeth)); U, W = X, Z
    def rof(t):
        ph = (t * teeth / TAU) % 1.0
        return rp + 0.55 - 0.85 * (1 - abs(ph - 0.5) * 2) ** 2 if True else rp
    b = MB(); b.annulus(C, Y, U, W, rof, inner or rp * 0.35, y - thick / 2, y + thick / 2, teeth * 8)
    for i in range(holes):
        t = TAU * i / holes; d = U * math.cos(t) + W * math.sin(t)
        b.cyl(C + d * rp * 0.62 + Y * (y - thick / 2 - 0.03), C + d * rp * 0.62 + Y * (y + thick / 2 + 0.03), rp * 0.18, 20, mi=1)
    return b.emit(name, [m or M['steel'], M['black_satin']], 0.05, 2), rp

def chain_path(C1, r1, C2, r2, n=400):
    """closed 2D loop (x,z) around two circles: C1 front sprocket, C2 rear sprocket."""
    c1, c2 = mathutils.Vector((C1[0], C1[2])), mathutils.Vector((C2[0], C2[2]))
    D = c2 - c1; L = D.length; u = D / L; p = mathutils.Vector((-u.y, u.x)); k = (r1 - r2) / L; q = math.sqrt(1 - k * k)
    na, nb = k * u + q * p, k * u - q * p
    def ang(v): return math.atan2(v.y, v.x)
    def arc(c, r, A, B, Mid, steps):
        span = (B - A) % TAU; mo = (Mid - A) % TAU
        if mo > span: span = span - TAU
        return [c + r * mathutils.Vector((math.cos(A + span * i / steps), math.sin(A + span * i / steps))) for i in range(steps + 1)]
    pts = []
    pts += [c1 + r1 * na, c2 + r2 * na]
    pts += arc(c2, r2, ang(na), ang(nb), ang(u), 60)[1:-1]
    pts += [c2 + r2 * nb, c1 + r1 * nb]
    pts += arc(c1, r1, ang(nb), ang(na), ang(-u), 40)[1:-1]
    # resample at uniform arc length
    segl = [(pts[(i + 1) % len(pts)] - pts[i]).length for i in range(len(pts))]
    tot = sum(segl)
    return pts, segl, tot

def resample(pts, segl, tot, step):
    nlinks = max(4, int(round(tot / step))); st = tot / nlinks; out = []; i = 0; acc = 0.0
    for k in range(nlinks):
        s = k * st
        while acc + segl[i] < s: acc += segl[i]; i += 1
        t = (s - acc) / segl[i]; a, b = pts[i], pts[(i + 1) % len(pts)]
        out.append(a.lerp(b, t))
    return out

def chain(name, C1, r1, C2, r2, y, pitch=1.5875, plate_m=None, roller_m=None):
    pts, segl, tot = chain_path(C1, r1, C2, r2)
    P = resample(pts, segl, tot, pitch); n = len(P)
    pb = MB(); rb = MB()
    for i in range(n):
        a, b = P[i], P[(i + 1) % n]; d = (b - a); L = d.length; d = d / L
        R = basis((d.x, 0, d.y), Y, (-d.y, 0, d.x))
        mid = V(((a.x + b.x) / 2, y, (a.y + b.y) / 2))
        outer = (i % 2 == 0); off = 0.62 if outer else 0.44
        for s in (-1, 1):
            pb.box(mid + Y * s * off, (L + 0.95, 0.13, 1.25 if outer else 1.15), R)
        A3 = V((a.x, y, a.y))
        rb.cyl(A3 - Y * 0.38, A3 + Y * 0.38, 0.5, 10)
        rb.cyl(A3 - Y * 0.78, A3 + Y * 0.78, 0.2, 6)
    return pb.emit(name + '__plates', plate_m or M['steel_dark'], 0.04, 2), rb.emit(name + '__rollers', roller_m or M['steel'], 0.0)

def belt(name, C1, r1, C2, r2, y, width=2.6, m=None):
    pts, segl, tot = chain_path(C1, r1, C2, r2)
    P = resample(pts, segl, tot, 0.8)
    b = MB(); P3 = [V((p.x, y, p.y)) for p in P]
    b.sweep(P3, prof=rect_prof(width, 0.55, 0.1, 2), closed=True, smooth_path=False, up=Y)
    return b.emit(name, m or M['rubber'], 0.0)

def helix_pts(p0, p1, r, turns, per=20):
    p0, p1 = V(p0), V(p1); R = frame_from(p1 - p0, X); n = int(turns * per); out = []
    for i in range(n + 1):
        t = i / n; a = TAU * turns * t
        out.append(p0.lerp(p1, t) + R @ V((r * math.cos(a), r * math.sin(a), 0)))
    return out

def shock(name, p0, p1, body_r=2.2, spring_r=3.0, wire=0.55, turns=8, spring_m=None, body_m=None, res_pt=None, eye_len=3.0, top_m=None):
    """coil-over damper between eye p0 (bottom) and eye p1 (top). Returns (body obj, spring obj)."""
    p0, p1 = V(p0), V(p1); ax = (p1 - p0); L = ax.length; a = ax.normalized()
    b = MB(); cm = MB()
    for p in (p0, p1):
        b.cyl(p - Y * eye_len / 2, p + Y * eye_len / 2, 1.3, 20)
    b.cyl(p0, p0 + a * 3.0, 1.0, 16)
    cm.cyl(p0 + a * 2.0, p0 + a * L * 0.55, 0.7, 16)                       # chrome shaft
    b.cyl(p0 + a * 3.0, p0 + a * 4.0, spring_r + 0.5, 32, r1=spring_r + 0.3)  # lower collar
    b.cyl(p0 + a * L * 0.42, p1 - a * 3.0, body_r, 32)                     # damper body
    b.cyl(p1 - a * 5.4, p1 - a * 4.4, spring_r + 0.6, 32)                  # upper collar
    b.cyl(p1 - a * 4.4, p1 - a * 1.0, body_r + 0.4, 32)
    if res_pt is not None:
        rp = V(res_pt); top = p1 - a * 6.0
        b.cyl(rp, rp + a * (L * 0.45), 2.0, 24); b.cyl(top, rp + a * 2.0, 0.9, 12)
    sp = MB(); hp = helix_pts(p0 + a * 4.0, p1 - a * 5.4, spring_r, turns, 18)
    sp.sweep(hp, r=wire, n=10, smooth_path=False)
    o = b.emit(name + '__body', body_m or M['black_satin'], 0.15, 2)
    c = cm.emit(name + '__shaft', M['chrome'])
    s = sp.emit(name + '__spring', spring_m or M['chrome'])
    return o, s, c

def round_headlight(name, C, dirv, r=9.0, depth=9.0, shell_m=None, rim_m=None):
    C = V(C); d = V(dirv).normalized()
    prof = [(0.0, -depth), (r * 0.55, -depth * 0.96), (r * 0.88, -depth * 0.7), (r, -depth * 0.3), (r * 1.02, 0.0), (r * 0.94, 0.05)]
    b = MB(); b.lathe(prof, C, d, 64)
    sh = b.emit(name + '__shell', shell_m or M['chrome'], 0.0)
    rb = MB(); rb.lathe([(r * 0.93, 0.0), (r * 1.06, 0.1), (r * 1.06, 0.7), (r * 0.98, 1.1), (r * 0.9, 0.9)], C, d, 64, closed=True)
    rim = rb.emit(name + '__rim', rim_m or M['chrome'], 0.05)
    lb = MB(); lb.lathe([(0, 1.6), (r * 0.5, 1.4), (r * 0.92, 0.7)], C, d, 64)
    lens = lb.emit(name + '__lens', M['glass'])
    fb = MB(); fb.lathe([(0, -depth * 0.6), (r * 0.3, -depth * 0.55), (r * 0.85, -0.6), (r * 0.9, 0.2)], C, d, 64)
    fb.cyl(C + d * (-depth * 0.55), C + d * (-depth * 0.2), 1.0, 16, mi=1)
    refl = fb.emit(name + '__reflector', [M['chrome'], M['led']])
    return [sh, rim, lens, refl]

def grip_lathe(b, p_in, p_out, r=1.6, mi=0):
    p_in, p_out = V(p_in), V(p_out); a = (p_out - p_in); L = a.length; a.normalize()
    prof = [(1.05, 0)]
    for k in range(13):
        z = 0.8 + k * (L - 1.6) / 12; prof.append((r if k % 2 == 0 else r - 0.12, z))
    prof += [(r + 0.3, L - 0.6), (r + 0.3, L), (0.0, L)]
    prof = [(r * 1.1, 0.0)] + [(r + 0.25, 0.5)] + prof[1:]
    b.lathe(prof, p_in, a, 32, mi=mi)

def handlebar(prefix, C, width=78, rise=8, pull=10, r=1.11, bar_m=None, levers=True, mirrors=False, clutch=True, mx=False, crossbar=False):
    """C = centre of the bar clamp. Returns list of objects (bar, grips, controls, mirrors)."""
    C = V(C); hw = width / 2
    pts = []
    for s in (-1, 1):
        pass
    L = [C + V((-pull, -hw, rise)), C + V((-pull * 0.75, -hw + 4, rise)), C + V((-pull * 0.2, -hw * 0.55, rise * 0.75)),
         C + V((0, -12, 0.6)), C + V((0, 0, 0))]
    path = L + [ym(p) for p in reversed(L[:-1])]
    b = MB(); b.sweep(path, r=r, n=20, res=8)
    if crossbar:
        b.sweep([C + V((-0.5, -10, 5.5)), C + V((0, 0, 6.2)), C + V((-0.5, 10, 5.5))], r=0.9, n=16, res=6)
        b.box(C + V((0, 0, 6.2)), (4, 12, 3.2), I3, mi=1)
    objs = [b.emit(prefix + '__bar', [bar_m or M['chrome'], M['plastic_black']], 0.0)]
    gb = MB(); grips = []
    for s in (-1, 1):
        end = C + V((-pull, s * hw, rise)); inner = end + V((0, -s * 12.5, 0))
        grip_lathe(gb, inner, end + V((0, s * 0.3, 0)), 1.6)
    objs.append(gb.emit(prefix + '__grips', M['rubber'], 0.0))
    if levers:
        lb = MB(); hb = MB()
        for s in (-1, 1):
            if s < 0 and not clutch: continue
            perch = C + V((-pull * 0.97, s * (hw - 14.5), rise))
            hb.cyl(perch + V((0, -s * 1.6, 0)), perch + V((0, s * 1.6, 0)), 1.9, 20)
            hb.box(perch + V((1.6, 0, 0.3)), (2.8, 3.0, 2.4))
            if s > 0 and not mx:
                hb.box(perch + V((-0.3, 0, 3.2)), (4.4, 3.2, 3.0))   # master cylinder reservoir
            pivot = perch + V((3.3, 0, 0))
            lp = [pivot, pivot + V((2.4, s * 3.5, -0.6)), pivot + V((1.6, s * 10.0, -1.6)), pivot + V((0.2, s * 17.0, -2.4))]
            lb.sweep(lp, prof=rect_prof(1.6, 0.6, 0.25, 2), radii=[1.0, 1.0, 0.8, 0.75], res=6, up=Z)
            # switch housings
            hb.box(C + V((-pull * 0.95, s * (hw - 17.0), rise - 0.2)), (4.4, 3.4, 4.0), I3)
        objs.append(lb.emit(prefix + '__levers', M['alu'], 0.0))
        objs.append(hb.emit(prefix + '__controls', M['black_satin'], 0.4, 2))
    if mirrors:
        mb = MB(); hb = MB()
        for s in (-1, 1):
            base = C + V((-pull * 0.97, s * (hw - 14.5), rise + 1.5))
            top = base + V((-1.0, s * 9.0, 11.0))
            mb.sweep([base, base + V((-0.5, s * 2.5, 6.0)), top], r=0.42, n=10, res=6)
            hb.lathe([(0, -1.8), (4.0, -1.3), (4.6, 0.0), (4.3, 0.35)], top + V((-0.8, 0, 0)), V((-1, 0, 0.12)), 40)
            hb.lathe([(0, 0.3), (4.3, 0.33)], top + V((-0.8, 0, 0)), V((-1, 0, 0.12)), 40, mi=1)
        objs.append(mb.emit(prefix + '__mirror_stems', M['chrome']))
        objs.append(hb.emit(prefix + '__mirrors', [M['chrome'], M['chrome']], 0.0))
    return objs

def fender(name, C, R_in, width, a0, a1, depth=1.6, thick=0.25, m=None, n=64):
    """partial-lathe mudguard around wheel centre C from angle a0 to a1 (deg, 0=forward, 90=up)."""
    prof = []
    k = 9
    for i in range(k + 1):
        t = -1 + 2 * i / k; prof.append((R_in + depth * (1 - t * t), t * width / 2))
    prof += [(r + thick, a) for r, a in reversed(prof)]
    b = MB(); b.lathe(prof, C, Y, n, closed=True, a0=rad(a0), a1=rad(a1), u=X, w=Z)
    return b.emit(name, m or M['chrome'], 0.08, 2)

def tube_frame(name, paths, r=1.4, m=None, res=8, mirror=True, n=20, radii=None, prof=None, up=None):
    b = MB()
    for item in paths:
        if isinstance(item, tuple) and len(item) == 2 and isinstance(item[1], (int, float)):
            pts, rr = item
        else: pts, rr = item, r
        pts = [V(p) for p in pts]
        b.sweep(pts, r=rr, n=n, res=res, prof=prof, up=up)
        if mirror and any(abs(p.y) > 1e-3 for p in pts): b.sweep([ym(p) for p in pts], r=rr, n=n, res=res, prof=prof, up=up)
    return b, (lambda bev=0.0: b.emit(name, m or M['black_gloss'], bev))

def footpegs(name, p, m=None, rubber=True, mx=False):
    b = MB(); rb = MB()
    for s in (-1, 1):
        q = V((p[0], s * p[1], p[2]))
        if mx:
            b.box(q + V((0, s * 4.0, 0)), (5.5, 8.5, 1.4))
            for k in range(5): b.box(q + V((-2.2 + k * 1.1, s * 4.0, 0.9)), (0.25, 8.5, 0.6))
        else:
            b.cyl(q, q + Y * s * 3.0, 1.0, 16)
            rb.cyl(q + Y * s * 3.0, q + Y * s * 12.5, 1.6, 20)
        b.box(q + V((0, -s * 1.0, 1.5)), (4.0, 2.0, 5.0))
    out = [b.emit(name, m or M['alu'], 0.15)]
    if not mx: out.append(rb.emit(name + '__rubbers', M['rubber'], 0.3))
    return out

def plate_boss(b, p, r=1.6, l=1.0, axis=Y, n=16):
    p = V(p); a = V(axis).normalized(); b.cyl(p - a * l / 2, p + a * l / 2, r, n)

def count_report():
    objs = [o for o in bpy.context.scene.objects if o.type in ('MESH', 'CURVE') and not o.name.startswith('_')]
    dg = bpy.context.evaluated_depsgraph_get(); tris = 0
    for o in objs:
        if o.type != 'MESH': continue
        me = o.evaluated_get(dg).to_mesh(); me.calc_loop_triangles(); tris += len(me.loop_triangles); o.evaluated_get(dg).to_mesh_clear()
    return len(objs), tris

def fork(A, rake, off, L, spread, t_lo, t_up, usd=False, stan_r=2.05, slider_r=2.9, slider_len=34.0, outer_r=2.9, outer_len=48.0,
         gaiters=False, stan_m=None, slider_m=None, clamp_m=None, cap_m=None, guard_m=None, clamp_h=(3.2, 2.6), cat='chassis'):
    """Telescopic (usd=False) or upside-down fork. Legs pass through the axle A; steering axis is offset
    `off` behind the legs. t measured along the leg axis from the axle. Returns dict of objects + helpers."""
    A = V(A); d, n = fork_axes(rake)
    S = lambda t: A - n * off + d * t
    Lg = lambda s, t: A + Y * s * spread + d * t
    stan_m = stan_m or M['chrome']; slider_m = slider_m or M['alu']; clamp_m = clamp_m or M['alu']; cap_m = cap_m or M['chrome']
    o = {}; P = nm(cat, 'front_fork')
    for s, side in ((-1, 'left'), (1, 'right')):
        if not usd:
            sl = MB()
            prof = [(0, -4.2), (slider_r * 0.9, -4.0), (slider_r, -1.5), (slider_r, slider_len - 3.0), (slider_r + 0.25, slider_len - 1.8),
                    (slider_r + 0.25, slider_len - 0.6), (stan_r + 0.35, slider_len), (stan_r + 0.1, slider_len + 0.3)]
            sl.lathe(prof, Lg(s, 0), d, 48)
            sl.cyl(Lg(s, 0) - Y * 2.4, Lg(s, 0) + Y * 2.4, 2.1, 24)   # axle boss
            if s < 0: sl.box(Lg(s, 4.0) - n * 2.8, (3.0, 2.0, 7.0), frame_from(d, Y))  # caliper / mudguard lug
            sl.box(Lg(s, 12.0) + n * 2.4, (2.0, 1.4, 3.0), frame_from(d, Y))
            o['slider_' + side] = sl.emit(f'{P}__{side}_slider', slider_m, 0.12, 2)
            st = MB(); st.cyl(Lg(s, slider_len - 2.0), Lg(s, L), stan_r, 40)
            o['stanchion_' + side] = st.emit(f'{P}__{side}_stanchion', stan_m)
            if gaiters:
                gb = MB(); g0, g1 = slider_len - 0.2, t_lo - clamp_h[0] / 2 - 0.4; prof = [(stan_r + 0.1, g0)]
                nr = 9
                for k in range(nr * 2 + 1):
                    z = g0 + 1.0 + (g1 - g0 - 2.0) * k / (nr * 2)
                    prof.append(((stan_r + 1.25) if k % 2 == 0 else (stan_r + 0.55), z))
                prof += [(stan_r + 0.3, g1), (stan_r + 0.1, g1 + 0.2)]
                gb.lathe(prof, Lg(s, 0), d, 40)
                o['gaiter_' + side] = gb.emit(f'{P}__{side}_gaiter', M['rubber'])
        else:
            ot = MB(); top = L; bot = L - outer_len
            prof = [(0, top + 0.6), (outer_r - 0.6, top + 0.6), (outer_r - 0.4, top), (outer_r, top - 1.2), (outer_r, bot + 2.5),
                    (outer_r + 0.35, bot + 2.0), (outer_r + 0.35, bot + 0.6), (stan_r + 0.4, bot)]
            ot.lathe(prof, Lg(s, 0), d, 48)
            o['outer_' + side] = ot.emit(f'{P}__{side}_outer_tube', slider_m, 0.08, 2)
            it = MB(); it.cyl(Lg(s, 5.0), Lg(s, bot + 2.0), stan_r, 40)
            o['inner_' + side] = it.emit(f'{P}__{side}_inner_tube', stan_m)
            ft = MB()
            prof = [(0, -3.6), (stan_r + 0.7, -3.4), (stan_r + 0.9, 0), (stan_r + 0.8, 7.5), (stan_r + 0.2, 8.6), (stan_r + 0.05, 8.8)]
            ft.lathe(prof, Lg(s, 0), d, 40)
            ft.cyl(Lg(s, 0) - Y * 2.6, Lg(s, 0) + Y * 2.6, 2.3, 24)
            if s < 0: ft.box(Lg(s, 3.0) - n * 3.4, (3.4, 2.2, 7.5), frame_from(d, Y))
            o['foot_' + side] = ft.emit(f'{P}__{side}_axle_foot', M['alu_dark'], 0.12, 2)
            if guard_m is not None:
                gd = MB(); prof = [(stan_r + 0.9, 7.0), (stan_r + 0.9, bot + 1.0), (stan_r + 1.25, bot + 1.0), (stan_r + 1.25, 7.0)]
                gd.lathe(prof, Lg(s, 0), d, 24, closed=True, a0=rad(-80), a1=rad(80), u=n, w=Y * (-s) if s < 0 else Y)
                gd.box(Lg(s, 9.0) - n * 0.2 + Y * s * 2.6, (2.4, 1.0, 4.0), frame_from(d, Y))
                o['guard_' + side] = gd.emit(f'{P}__{side}_guard', guard_m, 0.15, 2)
        cp = MB(); cp.lathe([(0, L + 1.6), (stan_r * 0.8, L + 1.5), (stan_r * 0.85, L), (stan_r * 0.85, L - 0.2)], Lg(s, 0), d, 6 if not usd else 24)
        o['cap_' + side] = cp.emit(f'{P}__{side}_cap', cap_m, 0.06)
    # triple clamps
    lr = (outer_r if usd else stan_r) + 1.0
    for key, t, h in (('lower', t_lo, clamp_h[0]), ('upper', t_up, clamp_h[1])):
        R = basis(n, Y, d); b = MB(T4(R, S(t)))
        for s in (-1, 1):
            b.cyl((off, s * spread, -h / 2), (off, s * spread, h / 2), lr, 32)
            b.box((off + lr * 0.55, s * spread, 0), (lr * 1.2, 1.4, h))   # pinch slot boss
        b.cyl((0, 0, -h / 2), (0, 0, h / 2 + (0.8 if key == 'upper' else 0)), 3.0, 32)
        b.box((off * 0.45, 0, 0), (off * 0.9 + 3.0, spread * 2, h * 0.85))
        o[key + '_clamp'] = b.emit(nm(cat, 'steering', key + '_triple_clamp'), clamp_m, 0.4, 2)
    sn = MB(); sn.cyl(S(t_up + clamp_h[1] / 2 + 0.6), S(t_up + clamp_h[1] / 2 + 1.8), 1.8, 6)
    o['stem_nut'] = sn.emit(nm(cat, 'steering', 'stem_nut'), M['chrome'], 0.08)
    o['axle'] = axle(nm('wheels', 'front_wheel', 'axle'), A, spread + 1.0)
    o['S'] = S; o['Lg'] = Lg; o['d'] = d; o['n'] = n
    o['head_lo'] = S(t_lo + clamp_h[0] / 2 + 0.2); o['head_hi'] = S(t_up - clamp_h[1] / 2 - 0.2)
    o['top'] = S(t_up + clamp_h[1] / 2)
    return o

def ushell(b, secs, n=18, thick=0.35, res=3, mi=0):
    """thin inverted-U shell lofted along X: secs = (x, top_z, half_width, side_drop)."""
    if res > 1:
        cols = list(zip(*secs)); sp = [cr_sample([(c[i], 0, 0) for i in range(len(secs))], res)[0] for c in cols]
        secs = [tuple(sp[k][i].x for k in range(len(cols))) for i in range(len(sp[0]))]
    rings = []
    for x, cz, hw, drop in secs:
        top = []
        for i in range(n + 1):
            t = -1 + 2 * i / n; top.append(V((x, t * hw, cz - drop * abs(t) ** 2.6)))
        bot = [V((p.x, p.y * (1 - thick / max(hw, 0.1)), p.z - thick)) for p in reversed(top)]
        rings.append(top + bot)
    return b.loft(rings, True, True, mi)

def smooth_outline(pts, res=5):
    return [(p.x, p.y) for p in cr_sample([(a, c, 0) for a, c in pts], res, True)[0]]

def panel_local(b, outline, origin, ex, ez, normal, thick, mi=0):
    """flat polygon panel in an arbitrary plane: outline (u, v) along ex, ez; thickness along normal."""
    T_old = b.T; b.T = T4(basis(V(ex).normalized(), V(normal).normalized(), V(ez).normalized()), origin)
    b.panel(outline, -thick / 2, thick / 2, mi); b.T = T_old
    return b

def sheet(name, outline, origin, ex, ez, nrm, thick, m, warp=None, cuts=3, bevel=0.15):
    """smooth curved panel: planar outline (u,v) mapped by origin + u*ex + v*ez, optionally warped
    (warp(p) -> p, world space), given thickness with Solidify. Good for shrouds, side covers, plates."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    ex, ez, o = V(ex).normalized(), V(ez).normalized(), V(origin)
    vs = [bm.verts.new(o + ex * a + ez * b) for a, b in outline]
    f = bm.faces.new(vs)
    bmesh.ops.triangulate(bm, faces=[f], quad_method='BEAUTY', ngon_method='BEAUTY')
    for _ in range(cuts):
        bmesh.ops.subdivide_edges(bm, edges=[e for e in bm.edges if not e.is_boundary], cuts=1, use_grid_fill=False)
        bmesh.ops.beautify_fill(bm, faces=bm.faces[:], edges=bm.edges[:])
    if warp:
        for v in bm.verts: v.co = warp(V(v.co))
    for fc in bm.faces: fc.smooth = True
    bm.normal_update()
    nn = V(nrm)
    for fc in bm.faces:
        if fc.normal.dot(nn) < 0: fc.normal_flip()
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob); me.materials.append(m)
    so = ob.modifiers.new('solid', 'SOLIDIFY'); so.thickness = thick; so.offset = -1.0; so.use_even_offset = True
    if bevel:
        bv = ob.modifiers.new('bevel', 'BEVEL'); bv.width = bevel; bv.segments = 2; bv.limit_method = 'ANGLE'; bv.angle_limit = rad(50)
        try: bv.harden_normals = True
        except Exception: pass
    return ob
