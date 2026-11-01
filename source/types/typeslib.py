"""Building blocks for the Types-of-motorcycle plates (T04-T06), in the F01-F04 blueprint style."""
import sys, os, math, json, subprocess
sys.path.insert(0, '/home/claude/mc/figs/web/src')
import svglib
from svglib import *
from wheels_common import road_tyre, knobby_tyre, rim_side, spokes, nipples, valve_side

svglib.OUT = '/home/claude/mc/figs/types'
EXTRA_STYLE = ('<style>#{id} .l{{font-size:17px;font-weight:600}} '
               '#{id} .ls{{font-size:14px}}</style>')


def new_plate(pid, title, desc):
    P = Plate(pid, 1600, 900, title, desc)
    P.extra_defs.append(EXTRA_STYLE.format(id=pid))
    return P


def finish(P, labels):
    P.save(render=False)
    json.dump({'id': P.id, 'labels': labels}, open('/home/claude/mc/figs/types/%s.parts.json' % P.id, 'w'), indent=1)
    subprocess.run(['node', 'raster.js', '/home/claude/mc/figs/types/png', '2400', '/home/claude/mc/figs/types/%s.svg' % P.id],
                   cwd='/home/claude/mc/tools', check=True)


def ground(P, y, x0=60, x1=1540):
    P.line((x0, y), (x1, y), 'i')


# ------------------------------------------------------------------ local frames
class Frame:
    """local (u, v) -> global; u along `ang` (deg, svg), v perpendicular (+ to the right of u)."""
    def __init__(self, o, ang):
        self.o = o; self.a = math.radians(ang)

    def __call__(self, u, v=0):
        ca, sa = math.cos(self.a), math.sin(self.a)
        return (self.o[0] + u * ca - v * sa, self.o[1] + u * sa + v * ca)

    def poly(self, pts, close=True):
        return poly([self(u, v) for u, v in pts], close)


def lerp(a, b, t):
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)


def ang(a, b):
    return math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))


def dist(a, b):
    return math.hypot(b[0] - a[0], b[1] - a[1])


def bar(P, a, b, w, cls='t o'):
    """straight bar of width w between a and b with round ends"""
    F = Frame(a, ang(a, b)); L = dist(a, b)
    P.path(F.poly([(0, -w / 2), (L, -w / 2), (L, w / 2), (0, w / 2)]), cls)


# ------------------------------------------------------------------ wheels
def wire_wheel(P, cx, cy, R, th, nsp=36, hub=30, cross=48, tyre='road', fat=False):
    """tyre outer R, tyre height th; returns rim inner radius"""
    ri = R - th
    if tyre == 'road':
        road_tyre(P, cx, cy, R, ri, step=6)
    else:
        knobby_tyre(P, cx, cy, R, ri)
    rim_side(P, cx, cy, ri, ri - 13, well=ri - 6)
    rr = ri - 13
    bk = spokes(P, cx, cy, hub, rr, nsp, cross, phase=3, front=False, cls='f')
    fr = spokes(P, cx, cy, hub, rr, nsp, cross, phase=3, front=True, cls='i')
    nipples(P, cx, cy, rr - 3, bk + fr)
    valve_side(P, cx, cy, rr, 128, 20)
    return rr


def drum_hub(P, cx, cy, r, arm_ang=-60, arm_len=46, tls=False):
    P.circ(cx, cy, r + 9, 't o')
    for k in range(18):
        h = pol(cx, cy, r + 3, k * 20)
        P.circ(h[0], h[1], 2.0, 'w f')
    P.circ(cx, cy, r, 't2 o')
    for a in range(0, 360, 30):
        P.line(pol(cx, cy, r * 0.42, a), pol(cx, cy, r * 0.9, a), 'f')
    P.circ(cx, cy, r * 0.92, 'n f')
    # brake cam lever(s)
    cams = [arm_ang] if not tls else [arm_ang, arm_ang + 150]
    for a in cams:
        c0 = pol(cx, cy, r * 0.62, a)
        tip = pol(c0[0], c0[1], arm_len, a - 70)
        bar(P, c0, tip, 7, 't i')
        P.circ(c0[0], c0[1], 6, 't2 i'); P.circ(c0[0], c0[1], 2.2, 'w f')
        P.circ(tip[0], tip[1], 3.2, 'w i')
    if tls:
        a0 = pol(cx, cy, r * 0.62, cams[0]); a1 = pol(cx, cy, r * 0.62, cams[1])
        t0 = pol(a0[0], a0[1], arm_len, cams[0] - 70); t1 = pol(a1[0], a1[1], arm_len, cams[1] - 70)
        P.line(t0, t1, 'i')
        # air scoop
        sc = [pol(cx, cy, r * 0.55, 160), pol(cx, cy, r * 0.88, 160), pol(cx, cy, r * 0.88, 200), pol(cx, cy, r * 0.55, 200)]
        P.path(poly(sc), 'w i')
        for t in (0.3, 0.5, 0.7):
            P.line(lerp(sc[0], sc[3], t), lerp(sc[1], sc[2], t), 'f')
    P.bolt(cx, cy, 9)


def disc(P, cx, cy, r, ri, holes=True):
    P.path(ring_d(cx, cy, r, ri), 't2 o', 'fill-rule="evenodd"')
    if holes:
        for ring, n, off in ((r - 9, 24, 0), (r - 17, 24, 7.5)):
            for k in range(n):
                q = pol(cx, cy, ring, off + k * 360.0 / n)
                P.circ(q[0], q[1], 1.9, 'w f')
    P.circ(cx, cy, ri, 't o')
    for k in range(6):
        q = pol(cx, cy, ri - 8, 15 + k * 60)
        P.bolt(q[0], q[1], 3.6)


def sprocket(P, cx, cy, rp, n, cls='t2 i', hub=None):
    P.path(sprocket_d(cx, cy, rp, n, roller=4.2), cls)
    if hub:
        P.circ(cx, cy, hub, 't i')
        for k in range(5):
            q = pol(cx, cy, hub * 0.68, k * 72 + 10)
            P.bolt(q[0], q[1], 3.4)


def chain(P, c1, r1, c2, r2, pitch=9.5):
    """open chain run (top + bottom straights) with link plates."""
    a = ang(c1, c2); d = dist(c1, c2)
    beta = math.degrees(math.asin((r2 - r1) / d))
    for sgn in (-1, 1):
        n = a - sgn * (90 + beta)
        p1 = pol(c1[0], c1[1], r1, n); p2 = pol(c2[0], c2[1], r2, n)
        L = dist(p1, p2); k = int(L // pitch)
        F = Frame(p1, ang(p1, p2))
        for i in range(k):
            u = i * pitch
            cls = 't2 f' if i % 2 else 't f'
            P.path(F.poly([(u, -3.4), (u + pitch, -3.4), (u + pitch, 3.4), (u, 3.4)]), cls)
            P.circ(*F(u, 0), 1.4, 'k')


# ------------------------------------------------------------------ suspension
def coil_shock(P, bot, top, w=15, coils=9, body_frac=0.42, chrome=True, cover=False):
    F = Frame(bot, ang(bot, top)); L = dist(bot, top)
    # eyes
    P.circ(*bot, 8, 't o'); P.circ(*bot, 3, 'w f')
    P.circ(*top, 8, 't o'); P.circ(*top, 3, 'w f')
    # damper body (lower) and shaft
    P.path(F.poly([(9, -w * 0.45), (L * body_frac, -w * 0.45), (L * body_frac, w * 0.45), (9, w * 0.45)]), 't2 o')
    P.path(F.poly([(L * body_frac, -3), (L - 10, -3), (L - 10, 3), (L * body_frac, 3)]), 'w i')
    s0, s1 = L * 0.18, L * 0.86
    P.path(F.poly([(s0 - 4, -w * 0.8), (s0, -w * 0.8), (s0, w * 0.8), (s0 - 4, w * 0.8)]), 't i')
    P.path(F.poly([(s1, -w * 0.8), (s1 + 5, -w * 0.8), (s1 + 5, w * 0.8), (s1, w * 0.8)]), 't i')
    if cover:
        P.path(F.poly([(s1 - L * 0.35, -w * 0.75), (s1, -w * 0.75), (s1, w * 0.75), (s1 - L * 0.35, w * 0.75)]), 't o')
    # coil: zigzag front strands
    step = (s1 - s0) / coils
    pts = []
    for i in range(coils * 2 + 1):
        u = s0 + i * step / 2
        v = (w * 0.72) * (1 if i % 2 else -1)
        pts.append(F(u, v))
    d = 'M' + ' L'.join(pt(p) for p in pts)
    P.path(d, 'n', 'stroke="#1E2B5E" stroke-width="6.4"')
    P.path(d, 'n', 'stroke="#DCE4F2" stroke-width="3.4"')


def tele_fork(P, axle, top, w=17, slider_frac=0.42, gaiter=False, chrome=True, foot=True):
    """telescopic fork leg from axle to top clamp."""
    F = Frame(axle, ang(axle, top)); L = dist(axle, top)
    sl = L * slider_frac
    # stanchion
    P.path(F.poly([(sl - 6, -w * 0.42), (L, -w * 0.42), (L, w * 0.42), (sl - 6, w * 0.42)]), 'w o')
    P.line(F(sl, -w * 0.18), F(L - 6, -w * 0.18), 'f')
    if gaiter:
        g0, g1 = sl - 2, sl + L * 0.24
        P.path(F.poly([(g0, -w * 0.62), (g1, -w * 0.5), (g1, w * 0.5), (g0, w * 0.62)]), 't2 o')
        n = 9
        for i in range(1, n):
            u = g0 + (g1 - g0) * i / n
            P.line(F(u, -w * 0.6), F(u, w * 0.6), 'i')
    # slider
    P.path(F.poly([(-14, -w * 0.62), (sl, -w * 0.6), (sl, w * 0.6), (-14, w * 0.62)]), 't o')
    P.path(F.poly([(sl - 8, -w * 0.62), (sl, -w * 0.62), (sl, w * 0.62), (sl - 8, w * 0.62)]), 't2 i')
    if foot:
        P.circ(*axle, w * 0.75, 't o')
    P.bolt(axle[0], axle[1], 7)
    return F


# ------------------------------------------------------------------ engines
def fins(P, F, u0, u1, n, half_w, ext, rounded=True, cls='t i'):
    """horizontal cooling fins along local u (cylinder axis), each fin thin plate extending ext beyond half_w"""
    step = (u1 - u0) / n
    for i in range(n):
        u = u0 + i * step
        t = step * 0.45
        P.path(F.poly([(u, -half_w - ext), (u + t, -half_w - ext), (u + t, half_w + ext), (u, half_w + ext)]), cls)


def single_cyl(P, base, axis_ang, h_barrel=95, h_head=70, w=74, fin_ext=14, nb=8, nh=6, rocker=True):
    """inclined air-cooled cylinder and head, base at crankcase. axis_ang: svg angle of the cylinder axis (upwards ~ -90)."""
    F = Frame(base, axis_ang)
    hw = w / 2
    # barrel core
    P.path(F.poly([(0, -hw), (h_barrel, -hw), (h_barrel, hw), (0, hw)]), 't2 o')
    fins(P, F, 6, h_barrel - 4, nb, hw - 6, fin_ext)
    # head core with fins
    P.path(F.poly([(h_barrel, -hw - 4), (h_barrel + h_head, -hw - 2), (h_barrel + h_head, hw + 2), (h_barrel, hw + 4)]), 't2 o')
    fins(P, F, h_barrel + 3, h_barrel + h_head - 6, nh, hw - 2, fin_ext + 3)
    # rocker cover
    if rocker:
        P.path(F.poly([(h_barrel + h_head - 2, -hw + 6), (h_barrel + h_head + 20, -hw + 12), (h_barrel + h_head + 20, hw - 12), (h_barrel + h_head - 2, hw - 6)]), 't o')
        for v in (-hw + 16, hw - 16):
            P.bolt(*F(h_barrel + h_head + 10, v), 3.4)
    # base nuts
    for v in (-hw + 6, hw - 6):
        P.bolt(*F(h_barrel + h_head - 8, v + (6 if v < 0 else -6)), 3.2)
    return F


def plug_cap(P, at, a, L=34):
    F = Frame(at, a)
    P.path(F.poly([(0, -5), (L, -7), (L, 7), (0, 5)]), 't o')
    P.path(F.poly([(L, -2.5), (L + 30, -2.5), (L + 30, 2.5), (L, 2.5)]), 'k')


def crankcase(P, pts, cover_c=None, cover_r=50):
    P.path(cr(pts, closed=True), 't o')
    if cover_c:
        P.circ(*cover_c, cover_r, 't o')
        P.circ(*cover_c, cover_r - 8, 'n i')
        P.circ(*cover_c, cover_r * 0.36, 't2 i')
        for k in range(8):
            q = pol(cover_c[0], cover_c[1], cover_r - 4, 22.5 + k * 45)
            P.bolt(q[0], q[1], 2.8)


def headlight_round(P, c, r, visor=False, facing=-1, rim=True):
    """round headlamp seen from the side: bucket + rim, lens at the front (facing -1 = left)."""
    cx, cy = c
    # bucket shell (a half-ellipse behind the rim)
    d = cr([(cx, cy - r), (cx - facing * r * 0.7, cy - r * 0.62), (cx - facing * r * 0.95, cy), (cx - facing * r * 0.7, cy + r * 0.62), (cx, cy + r)])
    P.path(d + ' Z', 't o')
    P.path('M%s L%s' % (pt((cx - facing * r * 0.28, cy - r * 0.95)), pt((cx - facing * r * 0.28, cy + r * 0.95))), 'f')
    # rim + lens (seen nearly edge-on)
    lens = cr([(cx, cy - r), (cx + facing * r * 0.24, cy - r * 0.55), (cx + facing * r * 0.3, cy), (cx + facing * r * 0.24, cy + r * 0.55), (cx, cy + r)])
    P.path(lens + ' Z', 'w o')
    P.path('M%s L%s' % (pt((cx, cy - r)), pt((cx, cy + r))), 'i')
    if visor:
        v = [(cx + 2 * facing, cy - r - 2), (cx + facing * r * 0.5, cy - r * 0.88), (cx + facing * r * 0.62, cy - r * 0.55),
             (cx + facing * r * 0.45, cy - r * 0.62), (cx + 2 * facing, cy - r + 6)]
        P.path(cr(v) + ' Z', 't2 o')


def indicator(P, base, facing=-1, L=26):
    tip = (base[0] + facing * L, base[1])
    P.line(base, tip, 'i')
    P.path(cr([(tip[0], tip[1] - 6), (tip[0] + facing * 10, tip[1] - 5), (tip[0] + facing * 14, tip[1]), (tip[0] + facing * 10, tip[1] + 5), (tip[0], tip[1] + 6)]) + ' Z', 'w o')


def mirror(P, base, top, rx=13, ry=19):
    P.line(base, top, 'o')
    P.add('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" class="t o"/>' % (f(top[0]), f(top[1] - ry + 3), f(rx), f(ry)))
    P.add('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" class="w f"/>' % (f(top[0] - 2), f(top[1] - ry + 3), f(rx - 5), f(ry - 5)))


def grip(P, at, a, L=46):
    F = Frame(at, a)
    P.path(F.poly([(0, -7), (L, -7), (L, 7), (0, 7)]), 't2 o')
    for i in range(1, 9):
        u = L * i / 9
        P.line(F(u, -7), F(u, 7), 'f')


def lever(P, pivot, a, L=70):
    F = Frame(pivot, a)
    P.path(F.poly([(0, -5), (L, -2.5), (L + 6, 0), (L, 2.5), (0, 5)]), 't o')
    P.circ(*pivot, 7, 't2 i')


def cable(P, pts, cls='i n'):
    P.path(cr(pts), cls)


def seat_stitch(P, pts):
    P.path(cr(pts), 'n f', 'stroke-dasharray="3 3"')
