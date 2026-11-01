"""Wheel building blocks (helper, not an asset). Wheels are built with the axle on local Z
(local +Z = bike's left side) and placed upright at the end with place_wheel()."""
import bpy, bmesh, math
from mathutils import Vector as V, Matrix
from _kit_wbe import *

class Section:
    """Tyre cross-section as a superellipse. phi=0 is the crown, +phi towards local +Z."""
    def __init__(self, bead_r, rim_half, W, OD, p=2.0, phimax=118):
        H = OD - bead_r
        self.bead_r, self.rim_half, self.OD = bead_r, rim_half, OD
        self.rc = bead_r + 0.42 * H; self.a = OD - self.rc; self.b = W / 2; self.e = 2.0 / p
        self.phimax = math.radians(phimax)
    def pt(self, phi):
        c, s = math.cos(phi), math.sin(phi)
        return self.rc + self.a * math.copysign(abs(c) ** self.e, c), self.b * math.copysign(abs(s) ** self.e, s)
    def nrm(self, phi):
        h = 1e-4; r1, z1 = self.pt(phi - h); r2, z2 = self.pt(phi + h)
        dr, dz = r2 - r1, z2 - z1; L = math.hypot(dr, dz)
        return dz / L, -dr / L
    def world(self, u, phi, off=0.0):
        r, z = self.pt(phi); nr, nz = self.nrm(phi)
        r += nr * off; z += nz * off
        p = V((r * math.cos(u), r * math.sin(u), z)); n = V((nr * math.cos(u), nr * math.sin(u), nz))
        return p, n

def tyre(name, S, grooves=(), segs=160, n=40, m=None):
    """Lathe a closed tyre section; grooves = [(phi_deg, width_deg, depth)] circumferential."""
    phis = [(-S.phimax + 2 * S.phimax * i / n) for i in range(n + 1)]
    for c, w, d in grooves:
        c, w = math.radians(c), math.radians(w); e = w * 0.22
        phis += [c - w / 2 - e * 0.3, c - w / 2, c - w / 2 + e, c - w / 4, c, c + w / 4, c + w / 2 - e, c + w / 2, c + w / 2 + e * 0.3]
    phis = sorted(set(round(p, 6) for p in phis))
    def depth(phi):
        dd = 0.0
        for c, w, d in grooves:
            c, w = math.radians(c), math.radians(w); e = w * 0.22
            x = abs(phi - c)
            if x < w / 2: dd = max(dd, d * min(1.0, (w / 2 - x) / e))
        return dd
    prof = []
    rh = S.rim_half
    prof.append((S.bead_r + 0.1, -(rh - 0.45)))
    prof.append((S.bead_r + 1.25, -(rh + 0.12)))
    for p in phis:
        r, z = S.pt(p); nr, nz = S.nrm(p); d = depth(p)
        prof.append((r - nr * d, z - nz * d))
    prof.append((S.bead_r + 1.25, rh + 0.12))
    prof.append((S.bead_r + 0.1, rh - 0.45))
    prof.append(prof[0])
    return lathe(prof, name, m, segs)

def groove_cutters(S, paths, w, d, name='_grooves', per=2, sides=8):
    """paths: list of [(u, phi_deg), ...] on the tyre surface; returns one joined cutter object."""
    objs = []
    for path in paths:
        P, N = [], []
        dense = []
        for i in range(len(path) - 1):
            (u0, f0), (u1, f1) = path[i], path[i + 1]
            for k in range(per):
                t = k / per; dense.append((u0 + (u1 - u0) * t, f0 + (f1 - f0) * t))
        dense.append(path[-1])
        for u, f in dense:
            p, nn = S.world(u, math.radians(f)); P.append(p); N.append(nn)
        objs.append(sweep(P, 1.0, 'gc', None, sides, normals=N, ell=(d, w / 2),
                          rfun=lambda t, s: 0.35 + 0.65 * min(1.0, t * 6, (1 - t) * 6)))
    o = join(objs, name); return o

def knobs(name, S, items, m=None, sink=0.25):
    """items: (u, phi_deg, L_along_u, W_across, H, rot_deg, taper). One mesh."""
    verts, faces = [], []
    for u, f, L, W, H, rot, tp in items:
        p, n = S.world(u, math.radians(f))
        tu = V((-math.sin(u), math.cos(u), 0)); tf = n.cross(tu).normalized()
        ca, sa = math.cos(math.radians(rot)), math.sin(math.radians(rot))
        a1 = tu * ca + tf * sa; a2 = -tu * sa + tf * ca
        o = len(verts)
        for h, sc in ((-sink, 1.0), (H, tp)):
            for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
                verts.append(p + n * h + a1 * (sx * L / 2 * sc) + a2 * (sy * W / 2 * sc))
        faces += [(o + 3, o + 2, o + 1, o + 0), (o + 4, o + 5, o + 6, o + 7)]
        for k in range(4):
            k2 = (k + 1) % 4; faces.append((o + k, o + k2, o + 4 + k2, o + 4 + k))
    ob = mesh_obj(name, verts, faces, m, smooth=False)
    finish(ob, 0.16, 1)
    return ob

def rim_profile(b, wr, depth=1.7, wall=0.32):
    """Closed (r, z) section of a drop-centre rim, b = bead seat radius, wr = half width at flanges."""
    top = [(b + 1.0, -wr - 0.02), (b + 0.95, -wr + 0.32), (b + 0.05, -wr + 0.45), (b, -wr + 1.3),
           (b - depth + 0.55, -min(1.1, wr * 0.45)), (b - depth + 0.55, min(1.1, wr * 0.45)), (b, wr - 1.3),
           (b + 0.05, wr - 0.45), (b + 0.95, wr - 0.32), (b + 1.0, wr + 0.02)]
    bot = [(b + 0.6, wr + 0.12), (b - 0.2, wr - 0.05), (b - 0.75, wr - 0.7),
           (b - depth, min(1.3, wr * 0.55)), (b - depth, -min(1.3, wr * 0.55)),
           (b - 0.75, -wr + 0.7), (b - 0.2, -wr + 0.05), (b + 0.6, -wr - 0.12)]
    return top + bot + [top[0]]

def rim(name, b, wr, m, depth=1.7, segs=128):
    o = lathe(rim_profile(b, wr, depth), name, m, segs)
    finish(o, 0.06, 2); return o

def spoke_set(prefix, n, rim_r, flanges, cross, m_spoke, m_nip, rim_dz=0.55, phase=0.0, spoke_r=0.2):
    """flanges = {+1: (r, z), -1: (r, z)}; returns spokes object and nipples object."""
    pairs, heads, nips = [], [], []
    step = TAU / n
    for k in range(n):
        side = 1 if k % 2 == 0 else -1
        ar = phase + k * step
        d = 1 if (k // 2) % 2 == 0 else -1
        ah = ar - d * cross * 2 * step
        rf, zf = flanges[side]
        hin = (k // 2) % 2 == 0
        zh = zf + (0.25 if hin else -0.25) * side
        H = V((rf * math.cos(ah), rf * math.sin(ah), zh))
        R = V((rim_r * math.cos(ar), rim_r * math.sin(ar), side * rim_dz))
        dirv = (H - R).normalized()
        nip_end = R + dirv * 1.3
        pairs.append((H, nip_end + dirv * -0.2))
        heads.append((H - V((0, 0, 0.45 * side * (1 if hin else -1))), H + V((0, 0, 0.12 * side * (1 if hin else -1)))))
        nips.append((R + dirv * -0.15, nip_end))
    sp = rods(pairs + heads, spoke_r, prefix + 'spokes', m_spoke, 8)
    for p in sp.data.polygons: p.use_smooth = True
    for i in range(len(heads)): pass
    nip = rods(nips, spoke_r * 1.55, prefix + 'nipples', m_nip, 6)
    finish(nip, 0.02, 1, smooth=False)
    return sp, nip

def sprocket(name, N, pitch, thick, m, bore=4.0, holes=None, bolt_r=None, nbolts=6, win=None):
    R = pitch / (2 * math.sin(math.pi / N)); rr = 0.42
    pts = []
    for k in range(N):
        c = k * TAU / N; h = math.pi / N
        # roller seat arc centred at the seat angle c
        for j in range(5):
            a = c - 0.55 * h + 1.1 * h * j / 4
            ang = math.radians(-70 + 140 * j / 4)
            pr = R - rr * math.cos(ang)
            pts.append((pr * math.cos(a), pr * math.sin(a)))
        # tooth between seats
        for a_off, rad in ((0.72, R + 0.28), (0.92, R + 0.55), (1.08, R + 0.55), (1.28, R + 0.28)):
            a = c + a_off * h
            pts.append((rad * math.cos(a), rad * math.sin(a)))
    o = prism(pts, thick, name, m)
    cutters = [cyl(bore, thick * 4, (0, 0, 0), (0, 0, 0), 64, '_c')]
    if win:
        wr_, wn, wrad = win
        for i in range(wn):
            a = i * TAU / wn + TAU / (2 * wn)
            cutters.append(cyl(wrad, thick * 4, (wr_ * math.cos(a), wr_ * math.sin(a), 0), (0, 0, 0), 48, '_c'))
    if bolt_r:
        for i in range(nbolts):
            a = i * TAU / nbolts
            cutters.append(cyl(0.45, thick * 4, (bolt_r * math.cos(a), bolt_r * math.sin(a), 0), (0, 0, 0), 24, '_c'))
    cut(o, join(cutters, '_' + name + '_cut')); bake(o)
    finish(o, 0.05, 1, smooth=False)
    smooth_sharp(o, 30)
    return o, R

def nuts_ring(name, n, r, z, m, size=0.65, h=0.5, phase=0.0, stud=True):
    objs = []
    for i in range(n):
        a = phase + i * TAU / n
        nt = cyl(size, h, (r * math.cos(a), r * math.sin(a), z), (0, 0, 0), 6, 'n'); objs.append(nt)
        if stud:
            st = cyl(size * 0.55, h * 0.9, (r * math.cos(a), r * math.sin(a), z + math.copysign(h * 0.7, z)), (0, 0, 0), 16, 's'); objs.append(st)
    o = join(objs, name); finish(o, 0.05, 1, m=m); smooth_sharp(o, 40); return o

def valve_stem(name, r_rim, ang, m_stem, m_cap, length=2.6):
    c, s = math.cos(ang), math.sin(ang)
    stem = cyl(0.32, length, (0, 0, 0), (0, math.radians(90), 0), 32, 'vs')
    nut = cyl(0.55, 0.35, (-length / 2 + 0.3, 0, 0), (0, math.radians(90), 0), 6, 'vn')
    cap = cyl(0.36, 1.1, (-length / 2 - 0.4, 0, 0), (0, math.radians(90), 0), 24, 'vc')
    for o in (stem, nut): o.data.materials.append(m_stem)
    cap.data.materials.append(m_cap)
    o = join([stem, nut, cap], name); finish(o, 0.04, 1)
    o.location = ((r_rim - length / 2 + 0.2) * c, (r_rim - length / 2 + 0.2) * s, 0); o.rotation_euler = (0, 0, ang)
    return o

def place_wheel(before, OD):
    objs = new_objs(before)
    xform(objs, Matrix.Translation((0, 0, OD)) @ Matrix.Rotation(math.radians(90), 4, 'X'))
    return objs

def mx_knob_items(S, n, front=True):
    """Typical motocross knob layout: alternating centre / pair rows with shoulder and side knobs."""
    it = []
    for i in range(n):
        u = i * TAU / n; u2 = u + TAU / n / 2
        if front:
            it.append((u, 0, 2.0, 2.4, 1.3, 0, 0.88))
            for s in (-1, 1):
                it.append((u, 37 * s, 2.1, 1.9, 1.3, 14 * s, 0.86))
                it.append((u2, 17 * s, 1.8, 1.9, 1.3, 0, 0.88))
                it.append((u2, 58 * s, 2.0, 1.7, 1.15, -10 * s, 0.86))
        else:
            it.append((u, 0, 2.3, 4.6, 1.75, 0, 0.9))
            for s in (-1, 1):
                it.append((u, 40 * s, 2.4, 2.4, 1.7, 12 * s, 0.88))
                it.append((u2, 20 * s, 2.3, 2.6, 1.75, 0, 0.9))
                it.append((u2, 60 * s, 2.3, 2.1, 1.5, -10 * s, 0.86))
    return it

def mx_hub(A, front):
    w = 4.3 if front else 5.6
    fr = 4.4 if front else 5.0
    prof = [(1.0, -w - 1.6), (2.2, -w - 1.6), (2.4, -w - 0.9), (2.9, -w - 0.7), (fr, -w - 0.35), (fr + 0.2, -w), (fr + 0.2, -w + 0.35),
            (fr - 0.3, -w + 0.7), (2.9, -w + 1.4), (2.6, -w + 2.6), (2.6, w - 2.6), (2.9, w - 1.4), (fr - 0.3, w - 0.7),
            (fr + 0.2, w - 0.35), (fr + 0.2, w), (fr, w + 0.35)]
    if front:  # disc mount boss on +Z
        prof += [(5.0, w + 0.6), (5.0, w + 1.5), (2.4, w + 1.7), (2.2, w + 2.0), (1.0, w + 2.0), (1.0, -w - 1.6)]
    else:  # sprocket carrier boss on +Z, disc boss on -Z handled by bolts
        prof += [(5.6, w + 0.6), (5.6, w + 1.4), (2.4, w + 1.6), (2.2, w + 2.0), (1.0, w + 2.0), (1.0, -w - 1.6)]
    hub = lathe(prof, A + '__hub', M('alu_machined'), 72); finish(hub, 0.06, 2)
    bolts = nuts_ring(A + '__disc_bolts', 6, 3.9 if front else 4.4, (w + 1.75) if front else -(w + 0.6), M('steel'), 0.55, 0.45)
    ax = cyl(1.0, 2 * w + 7.5, (0, 0, 0.2), (0, 0, 0), 48, A + '__axle'); finish(ax, 0.05, 2, m=M('steel'))
    sp = []
    for z in (-w - 2.2, w + 2.6):
        sp.append(cyl(1.6, 1.2, (0, 0, z), (0, 0, 0), 48, 'sp'))
    spc = join(sp, A + '__spacers'); finish(spc, 0.1, 2, m=M('anod_black'))
    return (fr - 0.1, w - 0.15), (fr - 0.1, -w + 0.15), w

def mx_wheel(A, front):
    before = set(bpy.context.scene.objects)
    if front: b, wr, W, OD, n, kh = 26.67, 2.05, 8.2, 34.7, 40, 1.3
    else: b, wr, W, OD, n, kh = 24.13, 2.75, 11.0, 34.0, 36, 1.75
    S = Section(b, wr, W, OD - kh, p=2.7, phimax=112)
    tyre(A + '__tyre', S, grooves=[(-88, 3, 0.15), (88, 3, 0.15)], segs=128, m=M('rubber'))
    knobs(A + '__knobs', S, mx_knob_items(S, n, front), M('rubber'))
    rim(A + '__rim', b, wr, M('anod_black'))
    fl, fr_, w = mx_hub(A, front)
    spoke_set(A + '__', 36, b - 1.7, {1: fl, -1: fr_}, 3, M('steel'), M('alu_machined'), rim_dz=0.6 if front else 0.8)
    valve_stem(A + '__valve', b - 1.7, math.radians(-90 + 5), M('brass'), M('plastic_black'))
    # rim lock: clamp nut on a stem through the rim well, opposite the valve
    ang = math.radians(90 + 5); r0 = b - 1.7
    st = cyl(0.45, 2.6, (0, 0, 0), (0, math.radians(90), 0), 32, 'rl_stem')
    nt = cyl(0.85, 0.7, (-0.9, 0, 0), (0, math.radians(90), 0), 6, 'rl_nut')
    wsh = cyl(1.0, 0.15, (-0.45, 0, 0), (0, math.radians(90), 0), 32, 'rl_wash')
    rl = join([st, nt, wsh], A + '__rim_lock'); finish(rl, 0.05, 2, m=M('zinc'))
    rl.location = ((r0 - 1.2) * math.cos(ang), (r0 - 1.2) * math.sin(ang), 0); rl.rotation_euler = (0, 0, ang)
    if not front:
        spr, R = sprocket(A + '__sprocket', 50, 1.5875, 0.55, M('alu_machined'), bore=3.6, bolt_r=4.4, nbolts=6, win=(8.0, 6, 2.2))
        spr.location.z = w + 1.75
        nuts_ring(A + '__sprocket_bolts', 6, 4.4, w + 2.35, M('zinc'), 0.6, 0.5)
    place_wheel(before, OD)

def window_cutters(n, r_in, r_out, hw_in, hw_out, sweep_a=0.10, round_r=1.1, depth=14.0, name='_win'):
    objs = []
    def ang(r): return sweep_a * (r - r_in) / (r_out - r_in)
    def hw(r): return hw_in + (hw_out - hw_in) * (r - r_in) / (r_out - r_in)
    def edge(a0, r, sgn):
        a = a0 + ang(r); d = V((math.cos(a), math.sin(a))); p = V((-math.sin(a), math.cos(a)))
        q = d * r + p * hw(r) * sgn; return (q.x, q.y)
    for k in range(n):
        a0, a1 = k * TAU / n, (k + 1) * TAU / n
        L = [edge(a0, r_in + (r_out - r_in) * j / 6, 1) for j in range(7)]
        Rr = [edge(a1, r_out - (r_out - r_in) * j / 6, -1) for j in range(7)]
        oa0 = math.atan2(L[-1][1], L[-1][0]); oa1 = math.atan2(Rr[0][1], Rr[0][0])
        if oa1 < oa0: oa1 += TAU
        rr_o = math.hypot(*L[-1])
        outer = [(rr_o * math.cos(oa0 + (oa1 - oa0) * j / 10), rr_o * math.sin(oa0 + (oa1 - oa0) * j / 10)) for j in range(1, 10)]
        ia0 = math.atan2(Rr[-1][1], Rr[-1][0]); ia1 = math.atan2(L[0][1], L[0][0])
        if ia0 < ia1: ia0 += TAU
        rr_i = math.hypot(*L[0])
        inner = [(rr_i * math.cos(ia0 + (ia1 - ia0) * j / 6), rr_i * math.sin(ia0 + (ia1 - ia0) * j / 6)) for j in range(1, 6)]
        poly = L + outer + Rr + inner
        corners = [0, len(L) - 1, len(L) + len(outer), len(L) + len(outer) + len(Rr) - 1]
        objs.append(prism(poly, depth, 'w', None, round_r, corners, 6))
    return join(objs, name)

def sport_paths(n, phi_in=5, phi_out=46, du=0.32):
    paths = []
    for i in range(n):
        u = i * TAU / n
        for s, off in ((1, 0.0), (-1, TAU / n / 2)):
            u0 = u + off
            paths.append([(u0, s * phi_in), (u0 + du * 0.35, s * (phi_in + (phi_out - phi_in) * 0.45)), (u0 + du * 0.75, s * (phi_out - 6)), (u0 + du, s * phi_out)])
            paths.append([(u0 + du * 0.55, s * 22), (u0 + du * 0.85, s * 34), (u0 + du * 1.05, s * 41)])
    return paths

def cast_wheel(A, front):
    before = set(bpy.context.scene.objects)
    if front: b, wr, W, OD, p = 21.6, 4.45, 12.0, 30.0, 2.0
    else: b, wr, W, OD, p = 21.6, 7.0, 18.0, 31.5, 2.25
    S = Section(b, wr, W, OD, p=p, phimax=112)
    ty = tyre(A + '__tyre', S, grooves=[(-84, 2.0, 0.12), (84, 2.0, 0.12)], segs=144, m=M('rubber'))
    cut(ty, groove_cutters(S, sport_paths(11 if front else 12), 0.5, 0.36, per=3))
    finish(ty, 0)
    rimo = rim(A + '__rim', b, wr, M('alu_paint'), depth=1.9)
    # cast web with six spoke windows
    r_out = b - 1.2
    web = lathe([(4.4, -2.2), (7.0, -1.7), (12.0, -1.15), (r_out, -1.0), (r_out, 1.3), (12.0, 1.7), (7.0, 2.4), (4.4, 3.0), (4.4, -2.2)],
                A + '__spokes', M('alu_paint'), 128)
    cut(web, window_cutters(6, 7.6, b - 2.6, 1.45, 0.95, 0.12, 1.15, 14.0)); bake(web)
    finish(web, 0.28, 2); smooth_sharp(web, 40)
    if front:
        hp = [(1.1, -7.0), (3.2, -7.0), (3.4, -6.4), (5.8, -6.2), (5.8, -5.3), (4.6, -4.9), (4.3, -2.0), (4.3, 2.0), (4.6, 4.9), (5.8, 5.3),
              (5.8, 6.2), (3.4, 6.4), (3.2, 7.0), (1.1, 7.0), (1.1, -7.0)]
        hub = lathe(hp, A + '__hub', M('alu_paint'), 72); finish(hub, 0.08, 2)
        nuts_ring(A + '__disc_bolts', 6, 5.0, 6.45, M('steel'), 0.55, 0.45, stud=False)
        nb = nuts_ring('_tmp', 6, 5.0, -6.45, M('steel'), 0.55, 0.45, stud=False); nb.name = A + '__disc_bolts_right'
        ax = cyl(1.1, 19.0, (0, 0, 0), (0, 0, 0), 48, A + '__axle'); finish(ax, 0.05, 2, m=M('steel'))
        cap = cyl(1.7, 1.0, (0, 0, 7.4), (0, 0, 0), 48, 'c1'); cap2 = cyl(1.7, 1.0, (0, 0, -7.4), (0, 0, 0), 48, 'c2')
        cc = join([cap, cap2], A + '__axle_spacers'); finish(cc, 0.1, 2, m=M('anod_black'))
    else:
        hp = [(1.2, -7.2), (3.4, -7.2), (3.6, -6.6), (6.4, -6.4), (6.4, -5.6), (4.8, -5.2), (4.6, -1.5), (5.0, 2.5), (9.2, 3.0), (9.5, 3.6),
              (9.5, 6.3), (9.1, 6.5), (8.8, 6.2), (8.8, 3.9), (2.2, 3.9), (1.2, 3.9), (1.2, -7.2)]
        hub = lathe(hp, A + '__hub', M('alu_paint'), 96); finish(hub, 0.08, 2)
        nuts_ring(A + '__disc_bolts', 5, 5.4, -6.65, M('steel'), 0.55, 0.45, stud=False)
        # cush-drive rubbers in the hub cup
        dm = []
        for i in range(6):
            a = i * TAU / 6
            d = box((2.6, 2.2, 1.9), (7.0 * math.cos(a), 7.0 * math.sin(a), 4.9), (0, 0, a), 'd'); dm.append(d)
        dmp = join(dm, A + '__cush_rubbers'); finish(dmp, 0.4, 2, m=M('rubber_soft'))
        # sprocket carrier with lugs between the rubbers and five windows
        car = lathe([(2.0, 5.85), (8.5, 5.85), (8.65, 6.1), (8.65, 7.0), (6.2, 7.25), (5.4, 7.8), (5.4, 8.5), (2.0, 8.5), (2.0, 5.85)],
                    A + '__sprocket_carrier', M('alu_machined'), 96)
        wins = [cyl(1.05, 5, (4.6 * math.cos(i * TAU / 5 + 0.6), 4.6 * math.sin(i * TAU / 5 + 0.6), 7), (0, 0, 0), 32, '_cw') for i in range(5)]
        cut(car, join(wins, '_carwin')); finish(car, 0.06, 2)
        lugs = [box((1.4, 1.6, 2.0), (7.0 * math.cos(i * TAU / 6 + TAU / 12), 7.0 * math.sin(i * TAU / 6 + TAU / 12), 4.9), (0, 0, i * TAU / 6 + TAU / 12), 'l') for i in range(6)]
        lg = join(lugs, A + '__carrier_lugs'); finish(lg, 0.2, 2, m=M('alu_cast'))
        spr, R = sprocket(A + '__sprocket', 43, 1.5875, 0.6, M('darksteel'), bore=5.5, bolt_r=7.0, nbolts=5, win=(8.9, 5, 0.75))
        spr.location.z = 7.55
        nuts_ring(A + '__sprocket_nuts', 5, 7.0, 8.15, M('zinc'), 0.62, 0.55)
        ax = cyl(1.25, 23.0, (0, 0, 0.6), (0, 0, 0), 48, A + '__axle'); finish(ax, 0.05, 2, m=M('steel'))
        cap = cyl(2.0, 1.2, (0, 0, 9.1), (0, 0, 0), 48, 'c1'); cap2 = cyl(2.0, 1.2, (0, 0, -7.8), (0, 0, 0), 48, 'c2')
        cc = join([cap, cap2], A + '__axle_spacers'); finish(cc, 0.1, 2, m=M('anod_black'))
    valve_stem(A + '__valve', b - 1.9, math.radians(-90 + 5), M('alu_machined'), M('plastic_black'), 2.2)
    place_wheel(before, OD)

def drum_hub(A, side=1, drum_r=10.8, small=(5.0, -5.6), m_hub=None, m_plate=None):
    """Classic single-leading-shoe drum hub. side=+1 puts the drum on local +Z."""
    s = side
    prof = [(1.3, -7.6), (2.1, -7.6), (2.1, -6.7), (3.0, -6.5), (small[0], small[1] - 0.6), (small[0] + 0.35, small[1] - 0.3),
            (small[0] + 0.35, small[1] + 0.45), (small[0], small[1] + 0.7), (3.1, -4.4), (3.0, -2.6), (4.6, -1.4),
            (8.0, -0.3), (drum_r - 0.6, 0.35), (drum_r, 0.9), (drum_r + 0.1, 1.4)]
    z = 1.4
    for k in range(4):  # cooling fins on the drum barrel
        prof += [(drum_r + 0.75, z + 0.15), (drum_r + 0.75, z + 0.45), (drum_r + 0.1, z + 0.6)]
        z += 0.7
    prof += [(drum_r + 0.1, z + 0.4), (drum_r - 0.3, z + 0.6), (1.3, z + 0.6), (1.3, -7.6)]
    prof = [(r, zz * s) for r, zz in prof]
    hub = lathe(prof, A + '__hub', m_hub, 64); finish(hub, 0.08, 2)
    zp = (z + 0.6) * s
    plate_prof = [(1.2, zp - 0.1 * s), (drum_r + 0.05, zp - 0.1 * s), (drum_r + 0.25, zp + 0.3 * s), (drum_r - 0.2, zp + 0.9 * s),
                  (6.5, zp + 1.5 * s), (3.4, zp + 1.9 * s), (3.0, zp + 2.6 * s), (1.2, zp + 2.6 * s), (1.2, zp - 0.1 * s)]
    plate = lathe(plate_prof, A + '__brake_plate', m_plate, 72); finish(plate, 0.06, 2)
    # brake cam boss, lever arm, cable stop and anchor lug
    cam_a = math.radians(95)
    cx, cy = 6.6 * math.cos(cam_a), 6.6 * math.sin(cam_a)
    boss = cyl(1.1, 1.6, (cx, cy, zp + 1.6 * s), (0, 0, 0), 48, 'boss')
    arm = box((1.0, 9.0, 0.6), (cx - 0.5, cy + 4.0, zp + 2.5 * s), (0, 0, math.radians(-8)), 'arm')
    pin = cyl(0.35, 1.6, (cx - 1.1, cy + 8.0, zp + 2.5 * s), (0, 0, 0), 24, 'pin')
    stop = box((1.6, 1.2, 1.6), (-4.4, 8.4, zp + 2.0 * s), (0, 0, 0), 'stop')
    lug = box((6.0, 2.0, 0.8), (-7.6, -0.6, zp + 1.5 * s), (0, 0, math.radians(-6)), 'lug')
    scoop = box((3.8, 2.6, 1.2), (8.0, 1.0, zp + 1.25 * s), (0, 0, math.radians(8)), 'scoop')
    mesh = box((3.0, 1.8, 0.2), (8.0, 1.0, zp + 1.9 * s), (0, 0, math.radians(8)), 'mesh')
    for o in (boss, arm, pin, stop, lug, scoop): finish(o, 0.18, 2, m=m_plate)
    mesh.data.materials.append(M('satin_black'))
    br = join([boss, arm, pin, stop, lug, scoop, mesh], A + '__brake_arm')
    # cable: from stop up and away
    P = spline([(-4.4, 8.4, zp + 2.0 * s), (-2.0, 9.3, zp + 2.4 * s), (cx - 1.1, cy + 8.0, zp + 2.5 * s)], 8)
    cab = sweep(P, 0.22, A + '__brake_cable', M('steel'), 10)
    P2 = spline([(-4.4, 8.4, zp + 2.0 * s), (-6.0, 10.5, zp + 2.6 * s), (-6.5, 15.0, zp + 3.5 * s), (-5.0, 22.0, zp + 4.5 * s)], 8)
    outer = sweep(P2, 0.38, 'outer', M('satin_black'), 12)
    cab = join([cab, outer], A + '__brake_cable')
    # spindle + nuts
    ax = cyl(0.9, 21.0, (0, 0, 0), (0, 0, 0), 48, A + '__axle'); finish(ax, 0.05, 2, m=M('steel'))
    n1 = cyl(1.3, 1.0, (0, 0, (zp + 3.1 * s)), (0, 0, 0), 6, 'nut1'); n2 = cyl(1.3, 1.0, (0, 0, -8.1 * s), (0, 0, 0), 6, 'nut2')
    nt = join([n1, n2], A + '__axle_nuts'); finish(nt, 0.08, 2, m=M('zinc'))
    return hub, (drum_r - 0.2, 0.9 * s), (small[0] + 0.1, small[1] * s)

