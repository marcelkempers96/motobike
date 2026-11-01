import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Connecting rod", "category": "powertrain", "kind": "part", "view": (-30, 34)}
A = 'conrod'
L = 9.6


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    forged = noisy_mat('forged_rod', (0.44, 0.45, 0.47), 1.0, 0.40, 0.12, 30, 0.22)
    mach = brushed(mat('rod_machined', (0.80, 0.80, 0.82), 1.0, 0.14), 'Y', 0.7)
    T = 1.5
    beam = slab(hull(circ(0, 1.2, 1.05, 32) + circ(0, L - 0.5, 0.6, 32)), 1.3, 'rod', forged, 'XZ')
    be = cyl(2.0, T, (0, 0, 0), RY, 96, '_bigeye'); bcut(beam, be, 'UNION')
    se = cyl(1.08, 1.4, (0, 0, L), RY, 64, '_smalleye'); bcut(beam, se, 'UNION')
    for sy in (-1, 1):
        pk = slab(hull(circ(0, 2.6, 0.62, 24) + circ(0, L - 1.75, 0.28, 24)), 1.0, '_pocket', None, 'XZ', sy * 0.72); bcut(beam, pk)
    bcut(beam, cyl(1.42, 4, (0, 0, 0), RY, 96, '_bigbore'))
    bcut(beam, cyl(0.72, 4, (0, 0, L), RY, 64, '_smallbore'))
    bcut(beam, cyl(0.12, 2, (0, 0, L + 0.9), (0, 0, 0), 16, '_oilhole'))
    for sx in (-1, 1):   # oil slots on the big-end eye
        bcut(beam, box((0.3, 0.5, 1.4), (sx * 1.75, 0, 0.2), (0, sx * rad(25), 0), '_slot'))
    finish(beam, 0.07, 3)
    # machined thrust faces on the eyes: thin bright rings sitting just proud of the forged faces
    for sy in (-1, 1):
        f = lathe([(1.43, 0), (1.9, 0), (1.9, 0.012), (1.43, 0.012)], 'face', mach, (0, sy * (T / 2) - (0.0 if sy > 0 else 0.012), 0), 'Y', 96)
        f2 = lathe([(0.73, 0), (1.0, 0), (1.0, 0.012), (0.73, 0.012)], 'face', mach, (0, sy * 0.7 - (0.0 if sy > 0 else 0.012), L), 'Y', 64)
    beam.name = n('rod')
    faces = [o for o in bpy.context.scene.objects if o.name.startswith('face')]
    J(faces, n('machined_faces'))
    cage_m = mat('cage', (0.70, 0.52, 0.30), 1.0, 0.3)
    cage = lathe([(1.06, -0.62), (1.32, -0.62), (1.32, 0.62), (1.06, 0.62), (1.06, -0.62)], 'cage', cage_m, (0, 0, 0), 'Y', 96)
    N = 15
    for k in range(N):
        a = k * math.tau / N
        bcut(cage, box((0.42, 1.0, 0.44), (1.19 * math.cos(a), 0, 1.19 * math.sin(a)), (0, -a, 0), '_win'))
    finish(cage, 0.01, 1); cage.name = n('needle_cage')
    nd = []
    for k in range(N):
        a = k * math.tau / N
        o = lathe([(0, 0), (0.17, 0), (0.19, 0.03), (0.19, 0.97), (0.17, 1.0), (0, 1.0)], 'needle', M.ground, (1.19 * math.cos(a), 0.5, 1.19 * math.sin(a)), '-Y', 16)
        nd.append(o)
    J(nd, n('needles'))
    lathe([(0.6, -0.7), (0.721, -0.7), (0.721, 0.7), (0.6, 0.7), (0.6, -0.7)], n('small_end_bush'), M.bronze, (0, 0, L), 'Y', 64)
    turn_all((PI / 2, 0, PI / 2))   # lie the rod flat, length along +X
    finalize(A)
