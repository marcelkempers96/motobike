import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'wiring_harness'
META = {"title": "Main wiring harness with fuse box and relays", "category": "wiring", "kind": "part", "view": (-30, 34)}

def corr(t, s): return 1.0 + 0.09 * (1 if (s / 0.55) % 1.0 < 0.5 else -0.2)
def tape(t, s): return 1.0 + 0.035 * ((s / 1.6) % 1.0)

WIRE_COLS = [(0.6, 0.03, 0.02), (0.02, 0.02, 0.02), (0.05, 0.25, 0.6), (0.85, 0.7, 0.05), (0.05, 0.4, 0.1), (0.8, 0.8, 0.78), (0.45, 0.2, 0.05)]
def wmat(i): return mat(f'wire{i}', WIRE_COLS[i % len(WIRE_COLS)], 0.0, 0.35)

def connector(name, p, d, pins=(2, 3), size=(2.6, 2.0, 2.8), col='plastic_black', wires_from=None, wires=4, wr=0.12):
    """Multi-pin connector at p facing direction d (mating face at +d), fan of single wires behind it."""
    d = V(d).normalized(); up = V((0, 0, 1)) if abs(d.z) < 0.9 else V((1, 0, 0))
    u = d.cross(up).normalized(); w = u.cross(d)
    R = Matrix((u, w, d)).transposed().to_4x4(); R.translation = V(p)
    bx, by, bz = size
    sh = box((bx, by, bz), (0, 0, 0), (0, 0, 0), 'sh')
    rec = box((bx - 0.5, by - 0.5, bz), (0, 0, bz * 0.62), (0, 0, 0), '_rec'); cut(sh, rec); bake(sh)
    latch = box((bx * 0.5, 0.35, bz * 0.55), (0, by / 2 + 0.15, bz * 0.1), (0, 0, 0), 'la')
    objs = [sh, latch]
    nx, ny = pins
    for i in range(nx):
        for j in range(ny):
            x = (i - (nx - 1) / 2) * (bx - 0.9) / max(nx - 1, 1) * (1 if nx > 1 else 0)
            y = (j - (ny - 1) / 2) * (by - 0.9) / max(ny - 1, 1) * (1 if ny > 1 else 0)
            pc = cyl(0.17, 0.6, (x, y, bz * 0.12), (0, 0, 0), 12, 'pin'); pc.data.materials.append(M('brass')); objs.append(pc)
    for o in (sh, latch):
        finish(o, 0.12, 2, m=M(col))
    c = join(objs, name)
    c.matrix_world = R @ c.matrix_world
    ws = []
    if wires_from is not None:
        a = V(wires_from)
        for k in range(wires):
            off = u * ((k - (wires - 1) / 2) * 0.45) + w * (0.25 * ((k % 2) - 0.5))
            pe = V(p) - d * (bz / 2) + off * 0.9
            P = spline([a + off * 0.25, (a + pe) / 2 + off * 0.8, pe - d * 0.8, pe], 6)
            ws.append(sweep(P, wr, 'w', wmat(k + len(name)), 8))
    return c, ws

def build():
    # main trunk from the tail (−X) to the headstock (+X), corrugated sleeve front, taped rear
    trunk_pts = [(-34, 0, 6), (-22, 1.0, 7.5), (-8, 0.0, 8.5), (6, -1.0, 9.5), (18, 0.0, 12), (28, 1.0, 16), (34, 0.0, 20)]
    Pt = spline(trunk_pts, 18)
    n = len(Pt); k = int(n * 0.42)
    taped = sweep(Pt[:k + 1], 0.85, A + '__trunk_taped', M('plastic_black'), 16, rfun=tape)
    cs = sweep(Pt[k:], 1.05, A + '__trunk_corrugated', M('plastic_black'), 16, rfun=corr)
    def on(t): return Pt[min(n - 1, int(t * (n - 1)))]
    allw = []
    conns = []
    # branches: (start t, control points rel, end connector dir, pins, sleeve kind)
    branches = [
        (0.04, [(-38, -5, 5), (-42, -6, 3)], (-1, -0.3, -0.3), (2, 2), 'tape', 'tail_light'),
        (0.20, [(-20, -8, 4), (-18, -14, 2.5)], (0, -1, 0), (1, 2), 'tape', 'battery_leads'),
        (0.34, [(-4, -7, 10.5), (-2, -12, 13)], (0, -1, 0.3), (3, 2), 'tape', 'regulator'),
        (0.60, [(12, 6, 13), (14, 11, 16)], (0.2, 1, 0.3), (2, 2), 'corr', 'ignition'),
        (0.82, [(30, -5, 21), (33, -12, 26)], (0, -1, 0.4), (3, 2), 'corr', 'left_switch'),
        (0.82, [(30, 5, 21), (33, 12, 26)], (0, 1, 0.4), (3, 2), 'corr', 'right_switch'),
        (0.99, [(38, 0, 21), (42, 0, 20)], (1, 0, 0), (3, 3), 'corr', 'headlight'),
    ]
    for t0, ctrl, d, pins, kind, nm in branches:
        p0 = on(t0)
        P = spline([p0] + [V(c) for c in ctrl], 12)
        end = P[-1]
        # sleeve stops 3 cm short of the connector, then single wires fan in
        L = 0.0; cutoff = len(P) - 1
        for i in range(len(P) - 1, 0, -1):
            L += (P[i] - P[i - 1]).length
            if L > 3.0: cutoff = i; break
        Pb = P[:cutoff + 1]
        if kind == 'corr': sweep(Pb, 0.6, f'{A}__branch_{nm}', M('plastic_black'), 12, rfun=corr)
        else: sweep(Pb, 0.5, f'{A}__branch_{nm}', M('plastic_black'), 12, rfun=tape)
        dd = (V(d)).normalized()
        cpos = end + dd * 1.4
        c, ws = connector(f'{A}__conn_{nm}', cpos, dd, pins, wires_from=Pb[-1], wires=pins[0] * pins[1] if pins[0] * pins[1] <= 6 else 6,
                          col='plastic_grey' if nm in ('ignition', 'regulator') else 'plastic_black')
        allw += ws
    # battery ring terminals (red +, black -) on the battery branch
    rt = []
    for i, (col, dy) in enumerate((('red', -1.2), ('plastic_black', 1.2))):
        a = V((-18, -14, 2.5)); b = V((-20 + dy, -22, 1.5))
        rt.append(sweep(spline([a, (a + b) / 2 + V((0, 0, 1.5)), b], 6), 0.32, 'bl', M(col), 10))
        ring = torus(0.65, 0.2, tuple(b + V((0, -0.8, 0))), (0, 0, 0), 'ring', 32, 8); ring.data.materials.append(M('copper')); rt.append(ring)
        boot = cyl(0.5, 1.4, tuple(b + V((0, 0.4, 0))), (math.radians(90), 0, 0), 16, 'bt'); finish(boot, 0.15, 2, m=M(col)); rt.append(boot)
    join(rt, A + '__battery_terminals')
    # fuse box with blade fuses under a smoked lid, two relays, all on a rubber-mounted tray
    fx, fy, fz = -12.0, 6.5, 10.5
    fb = box((7.0, 4.4, 2.6), (fx, fy, fz), (0, 0, 0), 'fb')
    cut(fb, box((6.2, 3.6, 2.0), (fx, fy, fz + 0.9), (0, 0, 0), '_fbc')); bake(fb); finish(fb, 0.2, 2, m=M('plastic_black'))
    fuses = []
    cols = [(0.7, 0.05, 0.03), (0.05, 0.25, 0.75), (0.9, 0.75, 0.05), (0.7, 0.05, 0.03), (0.05, 0.55, 0.15), (0.9, 0.75, 0.05)]
    for i in range(6):
        f = box((0.5, 1.9, 1.5), (fx - 2.5 + i * 1.0, fy, fz + 0.75), (0, 0, 0), 'fu'); finish(f, 0.08, 2, m=mat(f'fuse{i}', cols[i], 0.0, 0.25))
        fuses.append(f)
    fuse_obj = join(fuses, A + '__fuses')
    lid = box((7.0, 4.4, 0.5), (fx - 0.3, fy + 2.9, fz + 2.6), (math.radians(-65), 0, 0), 'lid'); finish(lid, 0.15, 2, m=M('glass_smoke'))
    hinge = cyl(0.25, 6.6, (fx, fy + 2.2, fz + 1.3), (0, math.radians(90), 0), 16, 'h'); hinge.data.materials.append(M('plastic_black'))
    join([fb, lid, hinge], A + '__fuse_box')
    rel = []
    for i, x in enumerate((-4.5, -1.2)):
        r = box((2.6, 2.6, 2.8), (x, fy + 0.5, fz + 0.3), (0, 0, 0), 'rl'); finish(r, 0.2, 2, m=M('plastic_black'))
        tab = box((0.3, 4.2, 1.2), (x, fy + 0.5, fz - 0.6), (0, 0, 0), 'rt'); finish(tab, 0.1, 2, m=M('plastic_black'))
        rel += [r, tab]
    join(rel, A + '__relays')
    tray = box((14.0, 6.2, 0.4), (fx + 4.5, fy + 0.3, fz - 1.5), (0, 0, 0), 'tray'); finish(tray, 0.15, 2, m=M('anod_black'))
    tray.name = A + '__tray'
    # short stubs of wire from fuse box and relays back into the trunk
    for i, sx in enumerate((fx + 3.6, -4.5, -1.2)):
        a = V((sx, fy - 1.6, fz - 0.5)); b = on(0.40 + 0.04 * i)
        allw.append(sweep(spline([a, (a + b) / 2 + V((0, 0, -1.0)), b], 8), 0.35, 'stub', M('plastic_black'), 10, rfun=tape))
    join(allw, A + '__wires')
    # cable ties along the trunk
    ties = []
    for t in (0.12, 0.28, 0.5, 0.7, 0.9):
        p = on(t); q = on(min(1, t + 0.01)); d = (q - p).normalized()
        tr = torus(1.15 if t > 0.42 else 0.95, 0.12, tuple(p), (0, 0, 0), 'tie', 32, 6)
        tr.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); tr.data.materials.append(M('plastic_black')); ties.append(tr)
        hd = box((0.6, 0.5, 0.5), tuple(p + V((0, 0, 1.2 if t > 0.42 else 1.0))), (0, 0, 0), 'th'); hd.data.materials.append(M('plastic_black')); ties.append(hd)
    join(ties, A + '__cable_ties')
