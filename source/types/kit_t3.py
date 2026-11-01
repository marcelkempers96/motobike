"""Shared drawing kit for the Types of motorcycles plates (T10-T12).
Builds on svglib / wheels_common from the web plates. Machines face left."""
import sys, os, json, re, subprocess
sys.path.insert(0, '/home/claude/mc/figs/web/src')
import svglib
from svglib import *
from wheels_common import road_tyre, knobby_tyre, rim_side, spokes, nipples, valve_side

OUTDIR = '/home/claude/mc/figs/types'
svglib.OUT = OUTDIR


def unit(a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy) or 1
    return dx / L, dy / L, L


def along(a, b, t):
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)


def quad(a, b, w0, w1=None):
    """Strip between a and b with half-widths w0 at a, w1 at b."""
    w1 = w0 if w1 is None else w1
    ux, uy, _ = unit(a, b)
    nx, ny = -uy, ux
    return poly([(a[0] + nx * w0, a[1] + ny * w0), (b[0] + nx * w1, b[1] + ny * w1),
                 (b[0] - nx * w1, b[1] - ny * w1), (a[0] - nx * w0, a[1] - ny * w0)])


def tubes(P, items, fill=TINT, ow=2.2):
    """items: list of (d, width). Outlines first, then fills, so joints read as welded."""
    for d, w in items:
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"/>' % (d, INK, f(w + 2 * ow)))
    for d, w in items:
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"/>' % (d, fill, f(w)))


def seg(a, b):
    return 'M%s L%s' % (pt(a), pt(b))


def coil(P, a, b, r, n, cls='i n', wire=None):
    """Coil spring between a and b, radius r, n turns, drawn as front loops over back loops."""
    ux, uy, L = unit(a, b)
    nx, ny = -uy, ux
    back = []; front = []
    step = L / n
    for k in range(n):
        s0 = a[0] + ux * step * k, a[1] + uy * step * k
        p_l = (s0[0] + nx * r, s0[1] + ny * r)
        p_r = (s0[0] + ux * step * 0.5 - nx * r, s0[1] + uy * step * 0.5 - ny * r)
        p_n = (s0[0] + ux * step + nx * r, s0[1] + uy * step + ny * r)
        back.append('M%s L%s' % (pt(p_l), pt(p_r)))
        front.append('M%s L%s' % (pt(p_r), pt(p_n)))
    w = wire or 4.4
    for d in back:
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (d, INK, f(w + 2)))
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (d, TINT2, f(w - 1)))
    for d in front:
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (d, INK, f(w + 2.4)))
        P.add('<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (d, TINT, f(w)))


def wave_disc(P, cx, cy, r, ri, n=12, holes=True, petal=True):
    if petal:
        pts = []
        for k in range(n * 8):
            a = k * 360.0 / (n * 8)
            rr = r - 5 * (0.5 + 0.5 * math.cos(math.radians(a * n)))
            pts.append(pol(cx, cy, rr, a))
        P.path(poly(pts) + ' ' + circle_d(cx, cy, ri), 't2 o', 'fill-rule="evenodd"')
    else:
        P.path(ring_d(cx, cy, r, ri), 't2 o', 'fill-rule="evenodd"')
    if holes:
        for k in range(n * 3):
            a = k * 360.0 / (n * 3)
            P.circ(*pol(cx, cy, ri + (r - ri) * (0.38 if k % 2 else 0.66), a), 2.4, 'w f')
    P.circ(cx, cy, ri + 2, 'n f')


def disc_carrier(P, cx, cy, ri, rh, n=6, buttons=True):
    P.path(ring_d(cx, cy, ri, ri - 7), 't i', 'fill-rule="evenodd"')
    for k in range(n):
        a = 15 + k * 360.0 / n
        P.path(sector_d(cx, cy, rh, ri - 6, a - 7, a + 7), 't i')
        if buttons:
            b = pol(cx, cy, ri - 2, a)
            P.circ(b[0], b[1], 4.2, 't2 f'); P.circ(b[0], b[1], 1.7, 'w f')


def cast_wheel(P, cx, cy, TO, TI, RIM_IN, nspoke=6, split=False, phase=90, step=8, tyre=True):
    if tyre:
        road_tyre(P, cx, cy, TO, TI, step=step)
    P.path(ring_d(cx, cy, TI, RIM_IN), 't o', 'fill-rule="evenodd"')
    P.circ(cx, cy, TI - 5, 'n f'); P.circ(cx, cy, RIM_IN + 5, 'n f')
    k_all = nspoke
    for k in range(k_all):
        a = phase + k * 360.0 / k_all
        def sp(r, w):
            return pol(cx, cy, r, a + w)
        if split:
            # Y spoke: two thin arms joining into one near the hub
            for s in (-1, 1):
                o = [sp(RIM_IN + 1, s * 9 - 3.2), sp(RIM_IN * 0.62, s * 4 - 3), sp(RIM_IN * 0.62, s * 4 + 3), sp(RIM_IN + 1, s * 9 + 3.2)]
                P.path(poly(o), 't o')
            o = [sp(RIM_IN * 0.64, -6.5), sp(RIM_IN * 0.32, -11), sp(RIM_IN * 0.32, 11), sp(RIM_IN * 0.64, 6.5)]
            P.path(poly(o), 't o')
        else:
            o = [sp(RIM_IN + 1, -4.4), sp(RIM_IN * 0.75, -4.8), sp(RIM_IN * 0.42, -9.5), sp(RIM_IN * 0.3, -18),
                 sp(RIM_IN * 0.3, 18), sp(RIM_IN * 0.42, 9.5), sp(RIM_IN * 0.75, 4.8), sp(RIM_IN + 1, 4.4)]
            P.path(poly(o), 't o')
            P.line(sp(RIM_IN - 8, 0), sp(RIM_IN * 0.47, 0), 'f')
    P.circ(cx, cy, RIM_IN * 0.32, 't o')


def hub_centre(P, cx, cy, r):
    P.circ(cx, cy, r, 't2 i'); P.circ(cx, cy, r * 0.62, 'w i')
    P.bolt(cx, cy, r * 0.48, rot0=10)


def radial_caliper(P, c, ang, L=74, W=34):
    """Caliper body centred at c, long axis at angle ang (deg), with two radial mount bolts."""
    def R(p):
        return rot((c[0] + p[0], c[1] + p[1]), c, ang)
    body = [R((-L / 2, -W / 2)), R((L / 2, -W / 2)), R((L / 2 + 6, -W / 2 + 8)), R((L / 2 + 6, W / 2 - 6)),
            R((L / 2 - 4, W / 2)), R((-L / 2 + 4, W / 2)), R((-L / 2 - 6, W / 2 - 6)), R((-L / 2 - 6, -W / 2 + 8))]
    P.path(poly(body), 't2 o')
    P.path(poly([R((-L / 2 + 8, -W / 2 + 6)), R((L / 2 - 8, -W / 2 + 6)), R((L / 2 - 8, W / 2 - 8)), R((-L / 2 + 8, W / 2 - 8))]), 't i')
    for x in (-L / 4, L / 4):
        p = R((x, 2)); P.circ(p[0], p[1], 7.5, 'w i'); P.circ(p[0], p[1], 3, 't f')
    # radial mount lugs on the fork side
    for x in (-L / 2 + 6, L / 2 - 6):
        p = R((x, -W / 2 - 8)); P.path(poly([R((x - 8, -W / 2)), R((x - 7, -W / 2 - 14)), R((x + 7, -W / 2 - 14)), R((x + 8, -W / 2))]), 't i')
        P.bolt(p[0], p[1], 5, rot0=ang)
    b = R((L / 2 - 2, W / 2 - 10)); P.circ(b[0], b[1], 3.4, 't2 f')  # bleed nipple


def sliding_caliper(P, c, ang, L=58, W=30):
    def R(p):
        return rot((c[0] + p[0], c[1] + p[1]), c, ang)
    P.path(poly([R((-L / 2, -W / 2)), R((L / 2, -W / 2)), R((L / 2 + 4, 0)), R((L / 2, W / 2)), R((-L / 2, W / 2)), R((-L / 2 - 4, 0))]), 't2 o')
    P.path(poly([R((-L / 2 + 7, -W / 2 + 5)), R((L / 2 - 7, -W / 2 + 5)), R((L / 2 - 7, W / 2 - 5)), R((-L / 2 + 7, W / 2 - 5))]), 't i')
    p = R((0, 0)); P.circ(p[0], p[1], 6, 'w i')


def usd_fork(P, axle, top, outer_w=34, inner_w=24, split=0.52, cap=True, gold=True):
    """USD fork leg from axle up to top (above upper clamp). Returns direction tuple."""
    ux, uy, L = unit(axle, top)
    m = along(axle, top, split)
    # inner tube (lower), slider is the inner, chromed: white with highlight
    P.path(quad(along(axle, top, 0.06), along(axle, top, split + 0.04), inner_w / 2), 'w o')
    P.line(along(along(axle, top, 0.08), (axle[0] - uy * 6, axle[1] + ux * 6), 0), along(axle, top, split), 'f')
    # outer tube
    P.path(quad(m, top, outer_w / 2, outer_w / 2 - 1), 't2 o' if gold else 't o')
    P.path(quad(m, along(m, top, 0.06), outer_w / 2 + 1.5), 't i')
    P.line(along(m, top, 0.1), along(m, top, 0.95), 'f')
    if cap:
        tc = along(axle, top, 1.0)
        P.path(quad(tc, (tc[0] + ux * 9, tc[1] + uy * 9), outer_w / 2 - 4), 't i')
        P.circ(tc[0] + ux * 9, tc[1] + uy * 9, 5, 't2 f')
    # axle clamp foot
    foot = [(axle[0] - 20, axle[1] - 16), (axle[0] + 18, axle[1] - 22), (axle[0] + 26, axle[1] + 8), (axle[0] - 8, axle[1] + 22), (axle[0] - 24, axle[1] + 8)]
    foot = [rot(p, axle, math.degrees(math.atan2(uy, ux)) + 90) for p in foot]
    P.path(poly(foot), 't o')
    return ux, uy


def conv_fork(P, axle, top, slider_w=30, stan_w=22, split=0.5, gaiter=False):
    ux, uy, L = unit(axle, top)
    m = along(axle, top, split)
    P.path(quad(m, top, stan_w / 2), 'w o')
    P.line(along(m, top, 0.05), along(m, top, 0.97), 'f')
    P.path(quad(along(axle, top, -0.02), along(m, top, 0.06), slider_w / 2, slider_w / 2 - 2), 't o')
    P.path(quad(along(m, top, 0.02), along(m, top, 0.07), stan_w / 2 + 3), 't2 i')
    return ux, uy


def triple_clamp(P, a, b, w=22):
    P.path(quad(a, b, w / 2), 't o')
    P.bolt(*along(a, b, 0.75), 4.2)


def chain_run(P, c1, r1, c2, r2, pitch=10.5):
    """Upper and lower chain runs tangent to two sprockets (same side). Draws links."""
    dx, dy = c2[0] - c1[0], c2[1] - c1[1]
    d = math.hypot(dx, dy)
    base = math.atan2(dy, dx)
    beta = math.asin((r1 - r2) / d)
    out = []
    for sgn in (1, -1):
        a = base + sgn * (math.pi / 2 + beta)
        p1 = (c1[0] + r1 * math.cos(a), c1[1] + r1 * math.sin(a))
        p2 = (c2[0] + r2 * math.cos(a), c2[1] + r2 * math.sin(a))
        out.append((p1, p2))
        ux, uy, L = unit(p1, p2)
        nx, ny = -uy, ux
        P.path(quad(p1, p2, 5.2), 't2 i')
        n = int(L / pitch)
        for k in range(n + 1):
            q = (p1[0] + ux * k * L / n, p1[1] + uy * k * L / n)
            P.circ(q[0], q[1], 2.0, 'w f')
    return out


def sprocket(P, cx, cy, rp, n, inner=None, bolts=5):
    P.path(sprocket_d(cx, cy, rp, n, roller=5.2), 't2 o')
    P.circ(cx, cy, rp - 6, 'n f')
    if inner:
        for k in range(bolts):
            a = k * 360.0 / bolts + 20
            P.path(sector_d(cx, cy, inner * 0.5, inner, a - 22, a + 22), 'w i')
    for k in range(bolts):
        p = pol(cx, cy, (inner or rp * 0.5) * 0.42, k * 360.0 / bolts)
        P.bolt(p[0], p[1], 4.2)


def shock(P, top, bot, body_w=26, spring_r=19, turns=7, reservoir=False):
    """Coil-over shock between top (frame) and bot (swingarm) eyes."""
    ux, uy, L = unit(top, bot)
    # damper body near top, shaft lower
    b0 = along(top, bot, 0.08); b1 = along(top, bot, 0.62)
    P.path(quad(b0, b1, body_w / 2), 't o')
    P.path(quad(b1, along(top, bot, 0.9), 5), 'w i')
    if reservoir:
        r0 = (b0[0] - uy * 24, b0[1] + ux * 24)
        P.path(quad(r0, (r0[0] + ux * 70, r0[1] + uy * 70), 11), 't2 o')
    coil(P, along(top, bot, 0.14), along(top, bot, 0.82), spring_r, turns)
    # seats and eyes
    for t, w in ((0.13, spring_r + 5), (0.83, spring_r + 4)):
        c = along(top, bot, t); P.path(quad(along(top, bot, t - 0.015), along(top, bot, t + 0.015), w), 't2 i')
    for p in (top, bot):
        P.circ(p[0], p[1], 10, 't o'); P.circ(p[0], p[1], 4.5, 'w i')


def ground(P, x0, x1, y):
    P.line((x0, y), (x1, y), 'o')


def finish(P, labels):
    """Save, upgrade label weight, write parts json, rasterise."""
    P.save(render=False)
    fn = os.path.join(OUTDIR, P.id + '.svg')
    s = open(fn).read()
    s = s.replace("font-size:16px;font-weight:500}", "font-size:17px;font-weight:600}", 1)
    open(fn, 'w').write(s)
    json.dump({'id': P.id, 'labels': labels}, open(os.path.join(OUTDIR, P.id + '.parts.json'), 'w'), indent=1)
    subprocess.run(['node', '/home/claude/mc/figs/types/src/raster_t3.js', os.path.join(OUTDIR, 'png'), '2400', fn], check=True)
