import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Four-cylinder crankshaft", "category": "powertrain", "kind": "part", "view": (-28, 24)}
A = 'crankshaft'
MW, PW, WT = 2.2, 2.2, 1.45
RJ, RP, THR = 1.65, 1.5, 2.1
PITCH = MW + 2 * WT + PW
THROWS = [30, 210, 210, 30]


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    forged = noisy_mat('forged_crank', (0.26, 0.27, 0.29), 1.0, 0.48, 0.12, 35, 0.25)
    ground = brushed(noisy_mat('journal', (0.86, 0.86, 0.87), 1.0, 0.08, 0.02, 400, 0.005), 'X', 0.75)
    mach = brushed(mat('flange_mach', (0.74, 0.74, 0.76), 1.0, 0.2), 'X', 0.6)
    webs = []
    def pinyz(th):
        t = rad(th); return THR * math.cos(t), THR * math.sin(t)
    for c in range(4):
        xm = c * PITCH; xp = xm + PITCH / 2
        py, pz = pinyz(THROWS[c])
        t = rad(THROWS[c]) + PI
        cw = [(4.7 * math.cos(t + d), 4.7 * math.sin(t + d)) for d in [rad(a) for a in range(-80, 81, 5)]]
        outline = hull(circ(py, pz, RP + 0.6, 40) + circ(0, 0, RJ + 0.25, 40) + cw)
        for xw in (xm + MW / 2 + WT / 2, xp + PW / 2 + WT / 2):
            w = slab(outline, WT, 'web', forged, 'YZ', xw)
            finish(w, 0.22, 3); webs.append(w)
    J(webs, n('webs'))
    def journal(r, w, name, m, loc, holes=None):
        o = lathe([(0, 0), (r - 0.12, 0), (r, 0.1), (r, w - 0.1), (r - 0.12, w), (0, w)], name, m, loc, 'X', 64)
        if holes:
            bcut(o, holes)
        return o
    for i in range(5):
        x = i * PITCH - MW / 2 - 0.02
        h = cyl(0.2, 0.8, (x + MW / 2 + 0.02, 0, RJ), (0, 0, 0), 16, '_oil')
        journal(RJ, MW + 0.04, n(f'main_journal_{i + 1}'), ground, (x, 0, 0), h)
    for c in range(4):
        py, pz = pinyz(THROWS[c]); xp = c * PITCH + PITCH / 2
        d = V((0, py, pz)).normalized()
        h = cyl(0.2, 0.8, (xp, py + d.y * RP, pz + d.z * RP), (0, 0, 0), 16, '_oil')
        h.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
        journal(RP, PW + 0.04, n(f'crankpin_{c + 1}'), ground, (xp - PW / 2 - 0.02, py, pz), h)
    # front: timing gear, snout with keyway, thread
    x0 = -MW / 2
    tg = toothed('tg', (2.05, 2.32, 28, 0.22, 0.36), 1.0, 1.2, ground, (x0 - 0.65, 0, 0), 'X', per=8)
    finish(tg, 0.03, 1); tg.name = n('timing_gear')
    sn = lathe([(0, 0), (1.25, 0), (1.25, 0.3), (1.12, 0.4), (1.12, 4.6), (0.95, 4.8), (0.85, 4.8), (0.85, 6.2), (0.7, 6.4), (0, 6.4)],
               'snout', ground, (x0 - 0.05, 0, 0), '-X', 64)
    bcut(sn, box((3.0, 0.32, 0.4), (x0 - 3.2, 0, 1.12), name='_keyway'))
    thr = []
    for i in range(9):
        thr.append(torus(0.86, 0.045, (x0 - 5.0 - i * 0.14, 0, 0), RX, 'thr', 48, 6))
    for t in thr: t.data.materials.append(ground)
    J([sn] + thr, n('snout'))
    k = box((2.4, 0.3, 0.42), (x0 - 3.2, 0, 1.18), name='key'); finish(k, 0.06, 2, m=forged); k.name = n('key')
    # rear: flywheel flange with bolt circle and dowel
    xr = 4 * PITCH + MW / 2
    fl = lathe([(0, 0), (1.9, 0), (1.9, 0.5), (4.3, 0.55), (4.4, 0.65), (4.4, 1.45), (4.3, 1.55), (1.6, 1.55), (1.5, 2.0), (0.7, 2.0), (0.7, 1.4), (0, 1.4)],
               'flange', mach, (xr - 0.02, 0, 0), 'X', 128)
    hs = [cyl(0.36, 3, (xr + 1.0, 3.25 * math.cos(a), 3.25 * math.sin(a)), RX, 24, '_bolt') for a in [i * math.tau / 6 + 0.25 for i in range(6)]]
    bcut(fl, J(hs, '_bolts')); finish(fl, 0.04, 2); fl.name = n('flywheel_flange')
    dw = cyl(0.22, 0.6, (xr + 1.75, 3.25 * math.cos(0.25 + PI / 6), 3.25 * math.sin(0.25 + PI / 6)), RX, 24, 'dowel')
    finish(dw, 0.04, 2, m=M.chrome); dw.name = n('dowel')
    finalize(A)
