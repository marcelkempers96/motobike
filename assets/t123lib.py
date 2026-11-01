"""Helpers for plates T01-T03 (pioneer, vintage V-twin, step-through)."""
import sys, math, os, subprocess, json
sys.path.insert(0, '/home/claude/mc/figs/web/src')
import svglib
from svglib import *
from wheels_common import *

svglib.OUT = '/home/claude/mc/figs/types'
GROUND = 800


def new_plate(pid, title, desc):
    P = Plate(pid, 1600, 900, title, desc)
    P.extra_defs.append('<style>#%s .l{font-size:17px;font-weight:600}</style>' % pid)
    return P


def finish(P, labels):
    P.line((150, GROUND), (1450, GROUND), 'i')
    P.save(render=False)
    json.dump({'id': P.id, 'labels': labels}, open('/home/claude/mc/figs/types/%s.parts.json' % P.id, 'w'), indent=1)
    subprocess.run(['node', '/home/claude/mc/tools/raster.js', '/home/claude/mc/figs/types/png', '2400',
                    '/home/claude/mc/figs/types/%s.svg' % P.id], check=True, cwd='/home/claude/mc/tools')


def ext_tangents(c1, r1, c2, r2):
    dx, dy = c2[0] - c1[0], c2[1] - c1[1]
    d = math.hypot(dx, dy); th = math.atan2(dy, dx); a = math.acos((r1 - r2) / d)
    out = []
    for s in (-1, 1):
        g = th + s * a
        out.append(((c1[0] + r1 * math.cos(g), c1[1] + r1 * math.sin(g)), (c2[0] + r2 * math.cos(g), c2[1] + r2 * math.sin(g))))
    return out


def quad(p0, p1, w0, w1=None):
    w1 = w0 if w1 is None else w1
    L = math.hypot(p1[0] - p0[0], p1[1] - p0[1]) or 1
    ux, uy = (p1[0] - p0[0]) / L, (p1[1] - p0[1]) / L
    nx, ny = -uy, ux
    return poly([(p0[0] + nx * w0 / 2, p0[1] + ny * w0 / 2), (p1[0] + nx * w1 / 2, p1[1] + ny * w1 / 2),
                 (p1[0] - nx * w1 / 2, p1[1] - ny * w1 / 2), (p0[0] - nx * w0 / 2, p0[1] - ny * w0 / 2)])


def chain_run(P, c1, r1, c2, r2, pitch=9.0, w=7):
    for (p1, p2) in ext_tangents(c1, r1, c2, r2):
        L = math.hypot(p2[0] - p1[0], p2[1] - p1[1])
        ux, uy = (p2[0] - p1[0]) / L, (p2[1] - p1[1]) / L
        P.path(quad(p1, p2, w), 't2 i')
        for k in range(int(L / pitch) + 1):
            q = (p1[0] + ux * k * pitch, p1[1] + uy * k * pitch)
            P.circ(q[0], q[1], 1.5, 'w f')


def flat_belt(P, c1, r1, c2, r2, w=5):
    for (p1, p2) in ext_tangents(c1, r1, c2, r2):
        P.path(quad(p1, p2, w), 't2 i')


def coil_spring(P, p0, p1, w, n):
    L = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
    ux, uy = (p1[0] - p0[0]) / L, (p1[1] - p0[1]) / L
    nx, ny = -uy, ux
    st = L / n; df = ''; db = ''
    for k in range(n):
        s0 = k * st
        A = (p0[0] + ux * s0 + nx * w / 2, p0[1] + uy * s0 + ny * w / 2)
        B = (p0[0] + ux * (s0 + st / 2) - nx * w / 2, p0[1] + uy * (s0 + st / 2) - ny * w / 2)
        Cc = (p0[0] + ux * (s0 + st) + nx * w / 2, p0[1] + uy * (s0 + st) + ny * w / 2)
        df += 'M%s L%s ' % (pt(A), pt(B)); db += 'M%s L%s ' % (pt(B), pt(Cc))
    P.path(db, 'n f')
    P.path(df, 'n i', 'style="stroke-width:2.4"')


def fins(P, base, axis_deg, length, n, w0, w1, cls='t o'):
    ux, uy = math.cos(math.radians(axis_deg)), math.sin(math.radians(axis_deg))
    nx, ny = -uy, ux
    pitch = length / n; th = pitch * 0.45
    for k in range(n):
        s = k * pitch + pitch * 0.3
        w = w0 + (w1 - w0) * k / max(1, n - 1)
        c = (base[0] + ux * s, base[1] + uy * s)
        P.path(poly([(c[0] - nx * w / 2, c[1] - ny * w / 2), (c[0] + nx * w / 2, c[1] + ny * w / 2),
                     (c[0] + nx * w / 2 + ux * th, c[1] + ny * w / 2 + uy * th), (c[0] - nx * w / 2 + ux * th, c[1] - ny * w / 2 + uy * th)]), cls)


def wire_wheel(P, cx, cy, ro, ri, rim_in, hub_r, n=36, cross=48, tread='road', step=7, phase=3):
    if tread == 'road':
        road_tyre(P, cx, cy, ro, ri, groove=True, step=step)
    else:
        P.path(ring_d(cx, cy, ro, ri), 't2 o', 'fill-rule="evenodd"')
        P.circ(cx, cy, ri + (ro - ri) * 0.55, 'n f')
        if tread == 'rib':
            P.circ(cx, cy, ro - 4, 'n f', 'stroke-dasharray="1.5 3"')
    rim_side(P, cx, cy, ri, rim_in, well=(ri + rim_in) / 2)
    back = spokes(P, cx, cy, hub_r - 6, rim_in, n, cross, phase=phase, front=False, cls='f')
    P.circ(cx, cy, hub_r, 't o')
    front = spokes(P, cx, cy, hub_r - 6, rim_in, n, cross, phase=phase, front=True, cls='i')
    nipples(P, cx, cy, rim_in - 3, front + back)


def drum_plate(P, cx, cy, r, lever_ang=-60, lever_len=40):
    P.circ(cx, cy, r, 't2 o'); P.circ(cx, cy, r - 6, 'n f')
    for a in range(0, 360, 45):
        P.line(pol(cx, cy, r * 0.42, a), pol(cx, cy, r - 7, a), 'f')
    c0 = pol(cx, cy, r * 0.62, lever_ang)
    tip = pol(c0[0], c0[1], lever_len, lever_ang - 80)
    P.path(quad(c0, tip, 9, 6), 't i')
    P.circ(c0[0], c0[1], 6, 't2 i'); P.circ(c0[0], c0[1], 2.4, 'w f')
    P.circ(tip[0], tip[1], 3, 'w i')
    P.bolt(cx, cy, 9)
    return tip
