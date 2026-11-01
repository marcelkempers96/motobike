import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Exhaust valve (sodium-filled)", "category": "powertrain", "kind": "part", "view": (-55, 24)}
A = 'valve_ex'


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    # heat-tinted valve steel: blued/purple head fading through straw into bright stem
    vm = noisy_mat('exvalve', (0.7, 0.7, 0.72), 1.0, 0.2, 0.05, 250, 0.015)
    tint_ramp(vm, [(0.0, (0.20, 0.17, 0.24)), (0.05, (0.18, 0.26, 0.48)), (0.12, (0.42, 0.30, 0.42)),
                   (0.2, (0.66, 0.48, 0.26)), (0.3, (0.70, 0.66, 0.58)), (0.42, (0.72, 0.72, 0.74))], 'Z', 0.0, 9.3)
    face_m = noisy_mat('stellite', (0.62, 0.60, 0.57), 1.0, 0.22, 0.05, 300, 0.02)
    sodium = noisy_mat('sodium', (0.52, 0.52, 0.50), 1.0, 0.55, 0.10, 40, 0.2)
    rh = 1.1
    prof = [(0, 0), (rh, 0), (rh, 0.11), (rh - 0.06, 0.18), (0.88, 0.36), (0.66, 0.55), (0.48, 0.88), (0.37, 1.3), (0.31, 1.8),
            (0.33, 2.3), (0.33, 8.45), (0.27, 8.5), (0.27, 8.7), (0.33, 8.75), (0.33, 9.23), (0.29, 9.3), (0, 9.3)]
    v = lathe(prof, 'valve', vm, (0, 0, 0), 'Z', 128)
    bore = cyl(0.19, 7.6, (0, 0, 0.75 + 3.8), (0, 0, 0), 32, '_bore'); bcut(v, bore)
    v = bake(v)
    # quarter window cut into the stem facing the camera
    win = box((1.0, 1.0, 4.6), (0, -0.5, 5.0), name='_window')
    v = section(v, win, M.section)
    v.name = n('valve')
    face = lathe([(0.86, 0.0), (rh + 0.002, 0.0), (rh + 0.002, 0.12), (0.86, 0.12)], n('seat_face'), face_m, (0, 0, -0.002), 'Z', 128)
    na = cyl(0.189, 4.7, (0, 0, 0.8 + 2.35), (0, 0, 0), 32, 'na')
    men = lathe([(0, 0), (0.189, 0), (0.189, 0.05), (0.12, 0.02), (0, 0.0)], 'meniscus', sodium, (0, 0, 5.5), 'Z', 32)
    na.data.materials.append(sodium)
    na = J([na, men], 'na')
    w2 = box((1.0, 1.0, 4.6), (0, -0.5, 5.0), name='_window2'); bcut(na, w2)
    na = bake(na); reshade(na); na.name = n('sodium')
    turn_all((0, PI / 2, 0))
    finalize(A)
