"""Shared drawing kit for the motorcycle type plates T07-T09 (side elevations, facing left)."""
import sys, math
sys.path.insert(0, '/home/claude/mc/figs/web/src')
import svglib
from svglib import *
from wheels_common import *

svglib.OUT = '/home/claude/mc/figs/types'
GROUND = 770


def new_plate(pid, title, desc):
    P = Plate(pid, 1600, 900, title, desc)
    top = Col(48, 'T', ymin=40, pitch=22)
    bot = Col(860, 'B', ymin=40, pitch=22)
    return P, top, bot


def ground(P, x0=70, x1=1530):
    P.line((x0, GROUND), (x1, GROUND), 'i')
    for x in range(int(x0), int(x1), 16):
        P.line((x, GROUND + 1), (x - 7, GROUND + 9), 'f')


def smooth(P, pts, cls, closed=True):
    P.path(cr(pts, closed=closed), cls)


def band(a, b, w):
    """quad of width w along segment a-b"""
    ang = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0])) + 90
    o = pol(0, 0, w / 2, ang)
    return [(a[0] + o[0], a[1] + o[1]), (b[0] + o[0], b[1] + o[1]), (b[0] - o[0], b[1] - o[1]), (a[0] - o[0], a[1] - o[1])]


def along(a, b, t):
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)


# ---------------------------------------------------------------- wheels
def cast_wheel(P, cx, cy, ro, rim, style='Y3', tyre='road', phase=-90):
    """Low-profile road tyre on a cast rim. style: 'Y3' split three-spoke, 'S6' six-spoke, 'S5' five twin."""
    if tyre == 'road':
        road_tyre(P, cx, cy, ro, rim, step=6)
    P.path(ring_d(cx, cy, rim, rim - 14), 't o', 'fill-rule="evenodd"')
    P.circ(cx, cy, rim - 5, 'n f')
    ri = rim - 14
    hub = 30
    if style == 'Y3':
        for k in range(3):
            a = phase + k * 120
            pts = [pol(cx, cy, hub, a - 13), pol(cx, cy, ri * 0.55, a - 5), pol(cx, cy, ri + 2, a - 23),
                   pol(cx, cy, ri + 2, a - 12), pol(cx, cy, ri * 0.66, a), pol(cx, cy, ri + 2, a + 12),
                   pol(cx, cy, ri + 2, a + 23), pol(cx, cy, ri * 0.55, a + 5), pol(cx, cy, hub, a + 13)]
            P.path(poly(pts), 't o')
            P.line(pol(cx, cy, hub + 6, a), pol(cx, cy, ri * 0.6, a), 'f')
            P.line(pol(cx, cy, ri * 0.72, a - 9), pol(cx, cy, ri - 4, a - 17), 'f')
            P.line(pol(cx, cy, ri * 0.72, a + 9), pol(cx, cy, ri - 4, a + 17), 'f')
    else:
        n = 6 if style == 'S6' else 5
        for k in range(n):
            a = phase + k * 360.0 / n
            for off in ((0,) if style == 'S6' else (-6, 6)):
                o = [pol(cx, cy, ri + 2, a + off - 3.4), pol(cx, cy, hub + 8, a + off - 9), pol(cx, cy, hub + 8, a + off + 9), pol(cx, cy, ri + 2, a + off + 3.4)]
                P.path(poly(o), 't o')
                P.line(pol(cx, cy, hub + 14, a + off), pol(cx, cy, ri - 6, a + off), 'f')
    P.circ(cx, cy, hub + 2, 't o')
    P.circ(cx, cy, hub - 9, 't2 i')
    P.bolt(cx, cy, 11, rot0=8)


def wire_wheel(P, cx, cy, ro, rim, tyre='dual', n=40, cross_rim=True):
    """Spoked tubeless wheel (spokes anchored at rim flange) with dual-purpose block tyre."""
    if tyre == 'dual':
        dual_tyre(P, cx, cy, ro, rim)
    else:
        road_tyre(P, cx, cy, ro, rim, step=6)
    P.path(ring_d(cx, cy, rim, rim - 12), 't o', 'fill-rule="evenodd"')
    P.circ(cx, cy, rim - 6, 'n f')
    ri = rim - 12
    hub_r = 40
    # tubeless cross-spoked: spokes run from hub flange to rim shoulder, crossing pattern
    pts_b = spokes(P, cx, cy, hub_r - 6, ri - 2, n, 38, phase=3, front=False, cls='f')
    P.circ(cx, cy, hub_r, 't o')
    P.circ(cx, cy, hub_r - 10, 'n f')
    pts_f = spokes(P, cx, cy, hub_r - 6, ri - 2, n, 38, phase=3, front=True, cls='i')
    for (x, y) in pts_f + pts_b:
        P.circ(x, y, 2.2, 't2 f')
    P.circ(cx, cy, 18, 't2 i')
    P.bolt(cx, cy, 10)


def dual_tyre(P, cx, cy, ro, ri, n=34):
    body = ro - 8
    P.path(ring_d(cx, cy, body, ri), 't2 o', 'fill-rule="evenodd"')
    P.circ(cx, cy, ri + (body - ri) * 0.55, 'n f')
    pa = 360.0 / n
    for k in range(n):
        a = k * pa
        w = pa * (0.56 if k % 2 == 0 else 0.42)
        h1 = ro if k % 2 == 0 else ro - 2
        pts = [pol(cx, cy, body - 1, a - w * 0.55), pol(cx, cy, h1, a - w / 2), pol(cx, cy, h1, a + w / 2), pol(cx, cy, body - 1, a + w * 0.55)]
        P.path(poly(pts), 't2 i')
        # shoulder blocks on sidewall
        q = [pol(cx, cy, body - 4, a - w * 0.35), pol(cx, cy, body - 12, a - w * 0.25), pol(cx, cy, body - 12, a + w * 0.15), pol(cx, cy, body - 4, a + w * 0.3)]
        P.path(poly(q), 'n f')


def disc(P, cx, cy, r, r_in, holes=True, wave=False, buttons=8):
    if wave:
        N = 360
        o = [pol(cx, cy, r + 3.5 * math.cos(math.radians(a * 12)), a) for a in range(N + 1)]
        P.path(poly(o) + ' ' + circle_d(cx, cy, r_in), 't2 o', 'fill-rule="evenodd"')
    else:
        P.path(ring_d(cx, cy, r, r_in), 't2 o', 'fill-rule="evenodd"')
    if holes:
        k = 0
        for j in range(36):
            a = j * 10
            P.circ(*pol(cx, cy, r_in + (r - r_in) * (0.35 if j % 2 else 0.7), a), 2.2, 'w f')
    # floating carrier
    P.path(ring_d(cx, cy, r_in - 1, r_in - 10), 't i', 'fill-rule="evenodd"')
    for j in range(buttons):
        p = pol(cx, cy, r_in - 1, j * 360.0 / buttons + 10)
        P.circ(p[0], p[1], 4.2, 'w i')
    for j in range(5):
        a = 18 + j * 72
        P.path(sector_d(cx, cy, 26, r_in - 9, a - 7, a + 7), 't i')


def radial_caliper(P, cx, cy, r, ang, span=42):
    """Monobloc radial caliper hugging the disc at angle ang (deg)."""
    body = sector_d(cx, cy, r - 18, r + 9, ang - span / 2, ang + span / 2)
    P.path(body, 't2 o')
    P.path(sector_d(cx, cy, r - 12, r + 3, ang - span / 2 + 4, ang + span / 2 - 4), 'n f')
    for o in (-span / 4, span / 4):
        P.circ(*pol(cx, cy, r - 4, ang + o), 6, 't i')
    # radial mount bolts (pointing at axle)
    for o in (-span / 2 + 2, span / 2 - 2):
        b = pol(cx, cy, r + 14, ang + o)
        P.bolt(b[0], b[1], 5, rot0=ang)
    P.circ(*pol(cx, cy, r + 4, ang), 2.6, 'w f')  # bleed nipple


def usd_fork(P, axle, top, w_out=30, w_in=20, outer_len=0.62):
    """Upside-down fork: thick outer tube at top, thin inner tube + axle foot below."""
    split = along(top, axle, outer_len)
    P.path(poly(band(split, along(top, axle, 0.94), w_in)), 't i')
    P.line(along(split, axle, 0.05), along(top, axle, 0.92), 'f')
    # axle foot
    ft = along(top, axle, 0.9)
    P.path(poly(band(ft, (axle[0] + 4, axle[1] + 10), w_in + 10)), 't2 o')
    P.circ(axle[0], axle[1], 12, 't o')
    P.bolt(axle[0], axle[1], 7)
    P.path(poly(band(top, split, w_out)), 't o')
    seal = along(top, axle, outer_len - 0.02)
    P.path(poly(band(seal, split, w_out + 2)), 't2 i')
    for t in (0.12, 0.3, 0.45):
        P.line(*band(along(top, axle, t), along(top, axle, t + 0.001), w_out)[:2], cls='f') if False else None
    P.line(along(top, split, 0.08), along(top, split, 0.95), 'f')
    cap = along(top, axle, -0.03)
    P.circ(cap[0], cap[1], w_out * 0.38, 't2 i')


def tele_fork(P, axle, top, w=26, slider_len=0.42):
    """Conventional fork: thin stanchion above, fat slider below."""
    s = along(top, axle, 1 - slider_len)
    P.path(poly(band(top, along(top, axle, 0.62), w * 0.72)), 't i')
    P.line(along(top, axle, 0.04), along(top, axle, 0.6), 'f')
    P.path(poly(band(s, (axle[0] + 2, axle[1] + 6), w)), 't o')
    P.path(poly(band(s, along(s, axle, 0.07), w + 3)), 't2 i')
    P.circ(axle[0], axle[1], 12, 't o')
    P.bolt(axle[0], axle[1], 7)


def chain(P, c1, r1, c2, r2):
    """Upper and lower runs of a chain (left side), with plate ticks."""
    for s in (-1, 1):
        a = math.atan2(c2[1] - c1[1], c2[0] - c1[0])
        d = math.hypot(c2[0] - c1[0], c2[1] - c1[1])
        b = math.asin((r2 - r1) / d)
        ang = a + s * (math.pi / 2 + b)
        p1 = (c1[0] + r1 * math.cos(ang), c1[1] + r1 * math.sin(ang))
        p2 = (c2[0] + r2 * math.cos(ang), c2[1] + r2 * math.sin(ang))
        P.path(poly(band(p1, p2, 9)), 't2 i')
        n = int(math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 9)
        for k in range(1, n):
            q = along(p1, p2, k / n)
            P.circ(q[0], q[1], 1.6, 'w f')


def sprocket(P, cx, cy, rp, n, carrier=True):
    P.path(sprocket_d(cx, cy, rp, n, roller=4.2), 't2 i')
    if carrier:
        for k in range(5):
            P.path(sector_d(cx, cy, rp * 0.45, rp * 0.8, k * 72 + 14, k * 72 + 52), 'w f')
    P.circ(cx, cy, rp * 0.4, 't i')


def shock(P, a, b, w=22, coils=9, reservoir=False):
    """coil-over shock between eye a (top) and eye b (bottom)."""
    P.path(poly(band(a, along(a, b, 0.55), w * 0.6)), 't2 i')
    P.path(poly(band(along(a, b, 0.5), b, w * 0.35)), 't i')
    ang = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0])) + 90
    for k in range(coils):
        t0 = 0.12 + 0.72 * k / coils; t1 = t0 + 0.72 / coils
        p0 = along(a, b, t0); p1 = along(a, b, t1)
        u = pol(0, 0, w / 2, ang)
        P.path('M%s L%s' % (pt((p0[0] - u[0], p0[1] - u[1])), pt((p1[0] + u[0], p1[1] + u[1]))), 'i n', 'style="stroke-width:3.4;stroke:#1E2B5E"')
        P.path('M%s L%s' % (pt((p0[0] - u[0], p0[1] - u[1])), pt((p1[0] + u[0], p1[1] + u[1]))), 'n', 'style="stroke-width:1.6;stroke:#B9C7E3"')
    for e in (a, b):
        P.circ(e[0], e[1], 7, 't i'); P.circ(e[0], e[1], 3, 'w f')
    for t in (0.1, 0.86):
        P.path(poly(band(along(a, b, t - 0.02), along(a, b, t + 0.02), w + 6)), 't2 i')


def mirror(P, base, head, rx=26, ry=15, ang=-8):
    P.line(base, head, 'o')
    P.add('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" transform="rotate(%s %s %s)" class="t o"/>' % (f(head[0]), f(head[1]), f(rx), f(ry), f(ang), f(head[0]), f(head[1])))
    P.add('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" transform="rotate(%s %s %s)" class="w f"/>' % (f(head[0] + 3), f(head[1]), f(rx - 6), f(ry - 5), f(ang), f(head[0]), f(head[1])))


def fins(P, a, b, n, length, ang_off=90, cls='f'):
    """parallel cooling fin lines along a-b, each of given length normal to it"""
    ang = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0])) + ang_off
    for k in range(n):
        p = along(a, b, (k + 0.5) / n)
        q = pol(p[0], p[1], length, ang)
        P.line(p, q, cls)
