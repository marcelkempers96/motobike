import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Intake valve and spring assembly", "category": "powertrain", "kind": "part", "view": (-55, 18)}
A = 'valve_in'


def valve_profile(rh=1.3):
    k = rh / 1.3
    return [(0, 0), (rh, 0), (rh, 0.12), (rh - 0.06, 0.2), (1.02 * k, 0.42), (0.78 * k, 0.62), (0.55 * k, 0.95), (0.40, 1.35), (0.31, 1.9),
            (0.275, 2.4), (0.275, 8.55), (0.23, 8.6), (0.23, 8.8), (0.275, 8.85), (0.275, 9.38), (0.24, 9.45), (0, 9.45)]


def build():
    M = mats()
    vm = brushed(noisy_mat('valve', (0.72, 0.72, 0.74), 1.0, 0.16, 0.04, 300, 0.01), 'Z', 0.5)
    face_m = noisy_mat('seatface', (0.55, 0.53, 0.50), 1.0, 0.3, 0.08, 200, 0.03)
    def n(s): return f'{A}__{s}'
    Z0 = 0.09
    v = lathe(valve_profile(), 'valve', vm, (0, 0, Z0), 'Z', 128)
    face = lathe([(1.0, 0.0), (1.302, 0.0), (1.302, 0.13), (1.0, 0.13)], 'face', face_m, (0, 0, Z0 - 0.002), 'Z', 128)
    J([v, face], n('valve'))
    lathe([(0.32, 0), (1.25, 0), (1.25, 0.1), (0.32, 0.1), (0.32, 0)], n('seat_washer'), M.chrome, (0, 0, Z0 + 2.6), 'Z', 96)
    seal = lathe([(0.276, 0), (0.52, 0), (0.55, 0.15), (0.45, 0.55), (0.30, 0.6), (0.276, 0.6), (0.276, 0)], 'seal', M.rubber, (0, 0, Z0 + 2.7), 'Z', 64)
    gs = torus(0.47, 0.04, (0, 0, Z0 + 3.05), (0, 0, 0), 'garter', 48, 8); gs.data.materials.append(M.chrome)
    J([seal, gs], n('stem_seal'))
    rz = Z0 + 8.2          # retainer bottom
    base = Z0 + 2.7
    Lo = rz + 0.32 - base - 0.21; Li = rz - 0.02 - base - 0.15
    so = coil(1.02, (Lo - 4.2 * 0.105) / 7.0, 9.0, 0.105, (0, 0, base + 0.105), M.spring, n('spring_outer'), 36, 3, ground_ends=True)
    si = coil(0.70, (Li - 4.2 * 0.075) / 8.0, 10.0, 0.075, (0, 0, base + 0.075), M.spring, n('spring_inner'), 32, 2, ground_ends=True, left=True)
    bpy.context.view_layer.update()
    lathe([(0.40, 0), (0.80, 0), (0.80, 0.32), (1.20, 0.32), (1.20, 0.5), (1.05, 0.62), (0.50, 0.7), (0.40, 0.7), (0.40, 0)],
          n('retainer'), M.chrome, (0, 0, rz), 'Z', 96)
    halves = []
    for side in (-1, 1):
        k = lathe([(0.235, 0), (0.40, 0), (0.48, 0.62), (0.235, 0.62), (0.235, 0)], 'collet', M.brass, (0, 0, rz + 0.08), 'Z', 48)
        c = box((1.2, 2, 1.2), (-side * 0.6 - side * 0.03, 0, rz + 0.38), name='_half'); bcut(k, c)
        halves.append(k)
    J(halves, n('collets'))
    turn_all((0, PI / 2, 0))     # lie the assembly along X, head towards the rear (camera side)
    finalize(A)
