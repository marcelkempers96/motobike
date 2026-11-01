import sys, math, bpy
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
OUT = sys.argv[sys.argv.index('--') + 1]
sc = reset()
vm = brushed(noisy_mat('valve', (0.72, 0.72, 0.74), 1.0, 0.16, 0.04, 300, 0.01), 'Z', 0.5)
head = noisy_mat('head', (0.45, 0.42, 0.40), 1.0, 0.35, 0.08, 60, 0.05)
spring = noisy_mat('spring', (0.10, 0.11, 0.13), 1.0, 0.32, 0.05, 200, 0.02)
chrome = mat('chrome', (0.9, 0.9, 0.92), 1.0, 0.08)
rubber = mat('rubber', (0.03, 0.03, 0.03), 0.0, 0.5)
brass = mat('bronze', (0.72, 0.5, 0.3), 1.0, 0.28)
Z0 = 1.0
for X, expl in ((-3.2, False), (3.2, True)):
    prof = [(0, 0), (1.3, 0), (1.3, 0.12), (1.24, 0.2), (1.02, 0.42), (0.78, 0.62), (0.55, 0.95), (0.40, 1.35), (0.31, 1.9), (0.275, 2.4),
            (0.275, 8.55), (0.23, 8.6), (0.23, 8.8), (0.275, 8.85), (0.275, 9.38), (0.24, 9.45), (0, 9.45)]
    v = spin(prof, 'valve', 'Z', (X, 0, Z0), 128, vm)
    face = spin([(1.0, 0.08), (1.3, 0.08), (1.3, 0.13), (1.0, 0.13)], 'face', 'Z', (X, 0, Z0 - 0.081), 128, head)
    e = 2.0 if expl else 0.0
    seat = spin([(0.32, 0), (1.25, 0), (1.25, 0.1), (0.32, 0.1), (0.32, 0)], 'seatwasher', 'Z', (X, 0, Z0 + 2.6 - (0.6 if expl else 0)), 96, chrome)
    seal = spin([(0.28, 0), (0.52, 0), (0.55, 0.15), (0.45, 0.55), (0.30, 0.6), (0.28, 0.6), (0.28, 0)], 'seal', 'Z', (X, 0, Z0 + 2.75 + (0.2 if expl else 0)), 64, rubber)
    gs = torus(0.48, 0.04, (X, 0, Z0 + 3.1 + (0.2 if expl else 0)), (0, 0, 0), 'garter', 48, 8); gs.data.materials.append(chrome)
    hz = Z0 + 2.75 + (1.2 if expl else 0)
    sp1 = helix(1.02, 0.5, 8.0, 0.105, (X, 0, hz), spring, 'spring')
    sp2 = helix(0.74, 0.44, 9.0, 0.075, (X, 0, hz), spring, 'innerspring')
    rz = hz + 4.2 + (1.4 if expl else 0)
    ret = spin([(0.38, 0), (1.18, 0), (1.18, 0.12), (0.75, 0.3), (0.55, 0.55), (0.38, 0.55), (0.38, 0)], 'retainer', 'Z', (X, 0, rz), 96, chrome)
    cz = Z0 + 8.45 + (3.6 if expl else 0)
    for side in (-1, 1):
        k = spin([(0.24, 0), (0.42, 0), (0.48, 0.55), (0.24, 0.55), (0.24, 0)], 'collet', 'Z', (X + (side * 0.35 if expl else 0), 0, cz), 64, brass)
        c = box((1.2, 2, 1.2), (X + (side * 0.35 if expl else 0) - side * 0.6 - side * 0.03, 0, cz + 0.3), name='half'); cut(k, c)
studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-12, -40, 22), (0, 0, 7.4), lens=80, res=(1600, 1200))
render(sc, OUT)
