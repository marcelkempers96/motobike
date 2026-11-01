import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Two-stroke expansion chamber and silencer", "category": "powertrain", "kind": "part", "view": (-150, 26)}
A = 'exhaust_2t'
# polyline of the chamber: each straight run is one rolled cone segment
PTS = [(14.0, 0, 13.0), (16.6, 0.3, 11.4), (18.4, 0.8, 8.8), (18.6, 1.5, 5.6), (16.6, 2.5, 2.6), (12.0, 3.6, 0.4), (5.0, 4.8, -0.6),
       (-3.5, 5.8, 0.0), (-12.0, 6.6, 1.8), (-19.5, 7.2, 4.2), (-25.5, 7.6, 6.4), (-30.5, 7.9, 8.0), (-35.0, 8.1, 9.3)]
RAD = [1.45, 1.5, 1.58, 1.7, 1.95, 2.6, 3.6, 4.5, 4.6, 4.3, 2.8, 1.25, 1.15]


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    steel = noisy_mat('chamber_steel', (0.5, 0.5, 0.52), 1.0, 0.32, 0.08, 60, 0.06)
    tint_ramp(steel, [(0.0, (0.46, 0.46, 0.48)), (0.55, (0.47, 0.46, 0.45)), (0.72, (0.62, 0.48, 0.30)), (0.86, (0.34, 0.30, 0.52)),
                      (1.0, (0.28, 0.36, 0.58))], 'X', -36.0, 19.0, 'World')
    weld_m = noisy_mat('weld', (0.30, 0.28, 0.27), 1.0, 0.45, 0.1, 400, 0.4)
    can_m = brushed(mat('silencer_alu', (0.82, 0.82, 0.84), 1.0, 0.22), 'Z', 0.7)
    segs, welds = [], []
    P = [V(p) for p in PTS]
    for i in range(len(P) - 1):
        segs.append(frustum(P[i], P[i + 1], RAD[i], RAD[i + 1], 'seg', steel, 64))
    for i in range(1, len(P) - 1):
        d = ((P[i] - P[i - 1]).normalized() + (P[i + 1] - P[i]).normalized()).normalized()
        w = torus(RAD[i] + 0.02, 0.11, (0, 0, 0), (0, 0, 0), 'weld', 72, 8); w.data.materials.append(weld_m)
        place([w], P[i], d); welds.append(w)
    J(segs, n('chamber'))
    J(welds, n('weld_beads'))
    # port flange with spring hooks
    d0 = (P[1] - P[0]).normalized()
    fl = lathe([(1.3, 0), (2.2, 0), (2.2, 0.35), (1.7, 0.6), (1.3, 0.7)], 'flange', M.steel, (0, 0, 0), 'Z', 64)
    hooks = []
    for a in (PI / 2, -PI / 2):
        h = torus(0.35, 0.09, (1.9 * math.cos(a), 1.9 * math.sin(a), 0.9), (PI / 2, 0, a), 'hook', 24, 8); h.data.materials.append(M.steel); hooks.append(h)
    f = J([fl] + hooks, n('port_flange'))
    place([f], P[0] - d0 * 0.05, d0)
    # mounting tab on the belly
    mid = (P[7] + P[8]) / 2
    tab = slab(hull(circ(0, 0, 1.0, 16) + circ(0, -2.0, 1.4, 16)), 0.35, 'tab', steel, 'XZ'); finish(tab, 0.06, 2)
    tab = bake(tab); bcut(tab, cyl(0.45, 2, (0, 0, 0), RY, 16, '_th')); tab = bake(tab)
    tab.location = mid + V((0, 0.0, RAD[7] + 1.2))
    gr = torus(0.5, 0.22, tuple(mid + V((0, 0, RAD[7] + 1.2))), RY, 'grommet', 24, 10); gr.data.materials.append(M.rubber)
    J([tab, gr], n('mount_tab'))
    # silencer can on the stinger: front cone, body, riveted end caps, outlet
    s0 = P[-1]; ds = (P[-1] - P[-2]).normalized()
    stg = frustum(s0 - ds * 0.2, s0 + ds * 6.0, 1.15, 1.15, 'stinger', steel, 32)
    can = lathe([(0, 0), (1.3, 0), (2.4, 1.8), (3.2, 3.2), (3.4, 4.0), (3.4, 26.0), (3.2, 26.6), (0, 26.6)], 'can', can_m, (0, 0, 0), 'Z', 96, sharp=50)
    cap1 = lathe([(1.25, -0.1), (3.0, 2.9), (3.48, 3.6), (3.48, 4.4), (3.38, 4.4), (3.3, 3.8), (2.9, 3.0), (1.25, 0.05)], 'capf', M.alu, (0, 0, 0), 'Z', 96)
    cap2 = lathe([(0, 27.4), (2.6, 27.3), (3.3, 26.8), (3.48, 26.2), (3.48, 25.4), (3.38, 25.4), (3.3, 26.0), (0, 26.65)], 'capr', M.alu, (0, 0, 0), 'Z', 96)
    outp = lathe([(0.75, 26.0), (0.95, 26.0), (0.95, 28.9), (1.1, 29.0), (0.75, 29.0)], 'outlet', M.chrome, (0, 0, 0), 'Z', 48)
    rv = []
    for z in (4.0, 25.8):
        for k in range(8):
            a = k * math.tau / 8
            r = lathe([(0, 0), (0.18, 0), (0.15, 0.08), (0, 0.1)], 'rivet', M.chrome, (3.47 * math.cos(a), 3.47 * math.sin(a), z), (math.cos(a), math.sin(a), 0), 12)
            rv.append(r)
    strap = lathe([(3.4, 13.0), (3.55, 13.0), (3.55, 15.0), (3.4, 15.0)], 'strap', M.black, (0, 0, 0), 'Z', 96)
    lug = slab(hull(circ(0, 0, 0.8, 16) + circ(0, -1.6, 1.0, 16)), 0.4, 'lug', M.black, 'YZ'); lug.location = (0, 0, 14.0)
    lug.rotation_euler = (0, 0, 0)
    sil = [can, cap1, cap2, outp, strap]
    place(sil + rv, s0 + ds * 1.0, ds, roll=0)
    J([can], n('silencer'))
    J([cap1, cap2] + rv, n('end_caps'))
    J([outp], n('outlet'))
    J([strap], n('silencer_strap'))
    stg.name = n('stinger')
    bpy.data.objects.remove(lug)
    finalize(A)
