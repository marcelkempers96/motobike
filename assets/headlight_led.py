import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'headlight_led'
META = {"title": "Headlight, angular LED unit with DRL", "category": "electrical", "kind": "part", "view": (52, 12)}

OUT = [(-11.0, 1.2), (-7.4, 5.6), (7.4, 5.6), (11.0, 1.2), (9.2, -3.4), (3.4, -5.6), (-3.4, -5.6), (-9.2, -3.4)]
def sc(poly, s, dy=0.0): return [(x * s, y * s + dy) for x, y in poly]

def build():
    before = set(bpy.context.scene.objects)
    hs = prism(OUT, 8.0, A + '__housing', M('plastic_black'), round_r=1.2, segs=4, z0=-8.6)
    for v in hs.data.vertices:
        if v.co.z < -8.0: v.co.x *= 0.80; v.co.y *= 0.78
    cut(hs, prism(sc(OUT, 0.93), 4.0, '_rc', None, round_r=1.0, segs=4, z0=-3.6)); bake(hs)
    finish(hs, 0.3, 3)
    inner = prism(sc(OUT, 0.92), 0.4, A + '__inner_face', M('satin_black'), round_r=1.0, segs=4, z0=-3.7); finish(inner, 0.08, 2)
    lens = prism(sc(OUT, 0.915), 0.3, A + '__lens', M('glass'), round_r=0.9, segs=4, z0=-0.95)
    for v in lens.data.vertices:
        v.co.z += 0.5 * (1 - (v.co.x / 11.5) ** 2)
    finish(lens, 0.12, 2)
    # projector modules: chrome cup, ball lens, black trim ring
    mods = []
    for sx in (-1, 1):
        cx, cy = sx * 4.6, 0.2
        cup = lathe([(0.6, -2.0), (2.7, -0.8), (2.9, -0.6), (2.75, -0.5), (0.6, -1.8)], 'cup', M('reflector'), 64); cup.location = (cx, cy, -1.4)
        ring = lathe([(2.0, 0), (2.4, 0), (2.5, 0.5), (2.1, 0.6), (2.0, 0)], 'ring', M('gloss_black'), 64); ring.location = (cx, cy, -2.3)
        ball = lathe([(0, -1.0), (1.2, -0.85), (1.85, -0.2), (2.0, 0.4), (1.7, 1.0), (1.0, 1.35), (0, 1.45)], 'ball', M('glass'), 64)
        ball.location = (cx, cy, -2.5)
        led = cyl(0.55, 0.2, (cx, cy, -3.25), (0, 0, 0), 24, 'led'); led.data.materials.append(M('led_white'))
        mods += [cup, ring, ball, led]
    join(mods, A + '__projectors')
    # DRL light guide following the upper brow and down the outer flanks
    brow = [(-9.6, -2.6), (-10.0, 0.9), (-7.0, 4.6), (-2.5, 4.7)]
    for side in (-1, 1):
        pts = [(x * side * -1 * 0.84, y * 0.84, -1.6) for x, y in brow]
        o = sweep(spline(pts, 8), 0.42, 'drl', M('led_white'), 12, ell=(1.0, 1.0))
    drl = [o for o in bpy.context.scene.objects if o.name.startswith('drl')]
    join(drl, A + '__drl')
    # aluminium heat sink on the back, mounting ears, connector
    fins = [box((0.35, 6.5, 3.4), (-4.2 + 1.05 * i, 0, -10.2), (0, 0, 0), 'f') for i in range(9)]
    base = box((10.0, 7.2, 0.6), (0, 0, -8.7), (0, 0, 0), 'fb')
    hsk = join(fins + [base], A + '__heatsink'); finish(hsk, 0.08, 2, m=M('alu_cast'))
    ears = []
    for sx in (-1, 1):
        e = prism(rrect(3.0, 3.0, 1.0), 0.8, 'ear', M('plastic_black'), z0=-6.0); e.location = (sx * 11.2, 0.5, 0)
        g = lathe([(0.4, -0.6), (1.0, -0.6), (1.05, 0.6), (0.4, 0.6), (0.4, -0.6)], 'grom', M('rubber_soft'), 32); g.location = (sx * 11.6, 0.5, -5.6)
        b = cyl(0.55, 0.5, (sx * 11.6, 0.5, -4.6), (0, 0, 0), 6, 'bolt'); b.data.materials.append(M('zinc'))
        ears += [e, g, b]
    ea = join(ears, A + '__mounts'); finish(ea, 0.15, 2)
    con = box((3.0, 1.8, 2.4), (2.5, -4.5, -9.0), (0, 0, 0), 'con'); finish(con, 0.2, 2, m=M('plastic_grey'))
    cab = sweep(spline([(2.5, -4.5, -10.2), (2.5, -5.5, -12.5), (1.0, -9.0, -14.5)], 6), 0.45, 'cab', M('plastic_black'), 12)
    join([con, cab], A + '__connector')
    xform(new_objs(before), TOFRONT)
