import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Spark plug", "category": "powertrain", "kind": "part", "view": (-40, 16)}
A = 'spark_plug'


def build():
    M = mats()
    nickel = mat('nickel', (0.70, 0.70, 0.72), 1.0, 0.14)
    zinc = noisy_mat('zincplate', (0.58, 0.58, 0.56), 1.0, 0.28, 0.06, 200, 0.02)
    M.zinc = zinc
    cer = mat('ceramic', (0.80, 0.78, 0.73), 0.0, 0.2, coat=0.7)
    elec = noisy_mat('electrode', (0.42, 0.40, 0.37), 1.0, 0.38, 0.08, 120, 0.04)
    Z0 = 1.04          # hex apothem: the plug lies on a hex flat, axis along X, electrode end at -X
    L = (0, 0, Z0)
    def n(s): return f'{A}__{s}'
    # threaded body (zig-zag lathe), hollow so the insulator nose sits inside
    prof = [(0.5, -1.9), (0.66, -1.9)]
    z = -1.84
    while z < -0.06:
        prof += [(0.70, z), (0.62, z + 0.062)]; z += 0.125
    prof += [(0.66, 0.0), (0.5, 0.0), (0.5, -1.9)]
    th = lathe(prof, n('thread'), M.zinc, L, 'X', 64)
    gas = lathe([(0.66, 0.0), (1.02, 0.0), (1.05, 0.1), (1.02, 0.2), (0.66, 0.2), (0.66, 0.0)], n('gasket'), nickel, L, 'X', 64)
    # shell: waist, hex, crimp
    hexpts = [(1.2 * math.cos(i * PI / 3), 1.2 * math.sin(i * PI / 3)) for i in range(6)]
    hx = slab(hexpts, 0.95, n('shell'), M.zinc, 'YZ', 0.0)
    hx.location = (0.35 + 0.475 + 0.0, 0, Z0)
    finish(hx, 0.07, 2)
    waist = lathe([(0.6, 0.2), (0.96, 0.2), (0.96, 0.36), (0.6, 0.36)], 'waist', M.zinc, L, 'X', 64)
    crimp = lathe([(0.6, 1.29), (0.98, 1.29), (0.98, 1.42), (0.82, 1.62), (0.66, 1.72), (0.6, 1.72)], 'crimp', M.zinc, L, 'X', 64)
    shell = J([hx, waist, crimp], n('shell'))
    # insulator with five ribs, glazed ceramic, plus nose inside the shell
    ins = [(0, 1.4), (0.64, 1.4), (0.64, 1.75)]
    z = 1.8
    for k in range(5):
        ins += [(0.6, z), (0.6, z + 0.16), (0.5, z + 0.3), (0.5, z + 0.38)]; z += 0.46
    ins += [(0.52, z + 0.2), (0.46, z + 0.9), (0.36, z + 1.05), (0, z + 1.05)]
    top = z + 1.05
    ins_o = lathe(ins, 'ins', cer, L, 'X', 96, sharp=60)
    nose = lathe([(0, -1.55), (0.2, -1.55), (0.26, -1.2), (0.42, -0.2), (0.48, 1.45), (0, 1.45)], 'nose', cer, L, 'X', 64, sharp=60)
    insul = J([ins_o, nose], n('insulator'))
    term = lathe([(0, top - 0.1), (0.25, top - 0.1), (0.25, top + 0.2), (0.36, top + 0.25), (0.36, top + 0.62), (0.28, top + 0.66),
                  (0.24, top + 0.7), (0.24, top + 0.78), (0.3, top + 0.82), (0.3, top + 1.0), (0.2, top + 1.06), (0, top + 1.07)],
                 n('terminal'), nickel, L, 'X', 48)
    ce = lathe([(0, -2.07), (0.06, -2.07), (0.06, -1.5), (0, -1.5)], n('centre_electrode'), nickel, L, 'X', 24)
    # J-shaped ground electrode welded to the shell end face
    gA = box((0.38, 0.30, 0.14), (-2.05, 0, Z0 - 0.57), name='gA')
    gB = box((0.14, 0.30, 0.66), (-2.2, 0, Z0 - 0.3), name='gB')
    for o in (gA, gB): finish(o, 0.04, 2, m=elec)
    J([gA, gB], n('ground_electrode'))
    finalize(A)
