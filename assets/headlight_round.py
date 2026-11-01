import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'headlight_round'
META = {"title": "Headlight, round chrome bucket (7 in)", "category": "electrical", "kind": "part", "view": (58, 14)}

def build():
    before = set(bpy.context.scene.objects)
    R = 8.9
    bucket = lathe([(0, -12.0), (2.5, -11.9), (5.2, -11.0), (7.4, -9.0), (8.9, -6.0), (9.5, -2.5), (9.55, -0.4), (9.2, -0.2), (0, -0.2), (0, -12.0)],
                   A + '__bucket', M('chrome'), 96)
    finish(bucket, 0.1, 2)
    rimo = lathe([(8.55, 0.45), (8.9, 1.05), (9.45, 1.1), (9.85, 0.75), (9.95, 0.1), (9.75, -0.45), (9.35, -0.5), (9.2, 0.0), (8.75, 0.1), (8.55, 0.45)],
                 A + '__rim', M('chrome'), 128)
    finish(rimo, 0.04, 2)
    f = 3.4
    refl = lathe([(r, -7.4 + r * r / (4 * f)) for r in [0.9 + 7.9 * i / 24 for i in range(25)]] + [(8.8, 0.0), (8.8, -0.15)] +
                 [(r, -7.6 + r * r / (4 * f)) for r in [8.8 - 7.9 * i / 24 for i in range(25)]], A + '__reflector', M('reflector'), 28)
    for p in refl.data.polygons: p.use_smooth = False
    bulb = lathe([(0, -4.6), (0.6, -4.55), (1.15, -4.1), (1.2, -3.4), (0.9, -2.7), (0.3, -2.45), (0, -2.45)], A + '__bulb', M('glass'), 48)
    base = lathe([(0, -6.8), (1.4, -6.8), (1.4, -5.2), (0.9, -4.6), (0, -4.6)], 'bb', M('steel'), 48)
    shield = lathe([(0, -2.25), (0.75, -2.3), (0.95, -2.7), (0.9, -2.8), (0, -2.55)], 'sh', M('chrome'), 48)
    fil = cyl(0.12, 1.0, (0, 0, -3.5), (0, math.radians(90), 0), 12, 'fil'); fil.data.materials.append(M('steel'))
    join([base, shield, fil], A + '__bulb_holder')
    # block-pattern glass lens, gently domed
    LR = 8.75
    def clip(x, y):
        r = math.hypot(x, y)
        return (x, y) if r <= LR else (x * LR / r, y * LR / r)
    def fz(x, y):
        r = min(math.hypot(x, y), LR) / LR
        dome = 0.2 + 0.85 * (1 - r * r)
        band = abs(y) < 3.2
        rib = 0.16 * abs(math.sin(math.pi * x / 0.95)) if band else 0.11 * (abs(math.sin(math.pi * x / 1.3)) + abs(math.sin(math.pi * y / 0.9)))
        return dome + rib * (1 - r ** 6)
    lf = grid_surface('lens_front', 88, 88, -LR, LR, -LR, LR, fz, None, clip)
    sol = lf.modifiers.new('sol', 'SOLIDIFY'); sol.thickness = 0.25; sol.offset = -1
    lf.name = A + '__lens'; lf.data.materials.append(M('glass'))
    for p in lf.data.polygons: p.use_smooth = True
    # mounting bolts (acorn nuts) on the bucket sides and rear cable grommet
    ears = []
    for s in (-1, 1):
        ears.append(lathe([(0, 0), (1.0, 0), (1.0, 0.25), (0.75, 0.9), (0.6, 1.35), (0.3, 1.6), (0, 1.65)], 'acorn', M('chrome'), 48))
        ears[-1].location = (s * 9.45, 0, -4.2); ears[-1].rotation_euler = (0, math.radians(90 * s), 0)
        w = cyl(1.35, 0.25, (s * 9.42, 0, -4.2), (0, math.radians(90), 0), 48, 'washer'); w.data.materials.append(M('chrome')); ears.append(w)
    join(ears, A + '__mount_bolts')
    gr = lathe([(0, -12.6), (1.5, -12.6), (1.6, -12.0), (1.2, -11.7), (0, -11.7)], A + '__grommet', M('rubber'), 48)
    cab = sweep(spline([(0, -0.5, -12.4), (0, -2.5, -14.5), (0, -7.0, -16.0)], 8), 0.65, A + '__cable', M('plastic_black'), 16)
    xform(new_objs(before), TOFRONT)
