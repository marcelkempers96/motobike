import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'tail_light'
META = {"title": "LED tail light with plate light", "category": "electrical", "kind": "part", "view": (-130, 16)}

def build():
    before = set(bpy.context.scene.objects)
    outline = [(-6.2, 2.2), (6.2, 2.2), (5.2, -2.3), (-5.2, -2.3)]
    hs = prism(outline, 3.6, A + '__housing', M('plastic_black'), round_r=1.0, segs=4, z0=-3.8)
    for v in hs.data.vertices:
        if v.co.z < -3.5: v.co.x *= 0.82; v.co.y *= 0.8
    cut(hs, prism([(x * 0.9, y * 0.86) for x, y in outline], 3.0, '_r', None, round_r=0.8, segs=4, z0=-1.4)); bake(hs)
    finish(hs, 0.2, 3)
    lens = prism([(x * 0.9, y * 0.86) for x, y in outline], 0.35, A + '__lens', M('glass_red'), round_r=0.8, segs=4, z0=-0.45)
    for v in lens.data.vertices:
        if v.co.z > -0.2: v.co.z += 0.3 * (1 - (v.co.x / 6.0) ** 2)
    finish(lens, 0.2, 3)
    pcb = prism([(x * 0.88, y * 0.82) for x, y in outline], 0.2, 'pcb', M('satin_black'), round_r=0.7, z0=-1.45)
    leds = []
    for row, yy in enumerate((0.9, -0.9)):
        n = 7 if row == 0 else 6
        for i in range(n):
            x = (i - (n - 1) / 2) * 1.45
            leds.append(cyl(0.38, 0.3, (x, yy, -1.1), (0, 0, 0), 16, 'l'))
    lj = join(leds, 'leds'); lj.data.materials.append(M('led_red'))
    join([pcb, lj], A + '__leds')
    # plate light pod under the cluster, lens facing down
    pod = prism(rrect(4.4, 2.0, 0.8), 2.6, A + '__plate_light', M('plastic_black'), z0=-3.4); pod.location = (0, -3.4, 0); finish(pod, 0.2, 2)
    pl = box((3.4, 0.35, 1.6), (0, -4.45, -2.0), (0, 0, 0), 'pll'); finish(pl, 0.08, 2, m=M('glass'))
    pled = box((2.2, 0.15, 0.6), (0, -4.2, -2.0), (0, 0, 0), 'ple'); pled.data.materials.append(M('led_white'))
    join([pl, pled], A + '__plate_light_lens')
    # mounting stalk and bracket going forward (local -Z) into the tail
    st = sweep(spline([(0, -0.5, -3.6), (0, -0.8, -6.0), (0, -0.4, -9.0)], 6), 0.75, A + '__stalk', M('alu_cast'), 24)
    plate = prism(rrect(5.0, 3.6, 0.6), 0.5, 'br', M('anod_black'), z0=-9.5); finish(plate, 0.1, 2)
    nut = cyl(0.8, 0.6, (0, -0.4, -10.2), (0, 0, 0), 6, 'n'); finish(nut, 0.06, 2, m=M('zinc'))
    join([plate, nut], A + '__bracket')
    w = sweep(spline([(0.8, -0.9, -9.6), (1.2, -1.6, -12.0), (3.0, -2.5, -15.0)], 6), 0.3, A + '__wire', M('plastic_black'), 10)
    xform(new_objs(before), TOREAR)
