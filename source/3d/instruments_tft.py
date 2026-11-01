import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'instruments_tft'
META = {"title": "Instruments, 5 in colour TFT dash", "category": "electrical", "kind": "part", "view": (-128, 26)}

def build():
    before = set(bpy.context.scene.objects)
    path = _dash.tft(f'{TEX}/tft_dash.png')
    W, H = 17.6, 11.4
    hs = prism(rrect(W, H, 1.6), 3.4, A + '__housing', M('plastic_black'), z0=-3.4)
    rec = prism(rrect(15.0, 8.9, 0.6), 2.0, '_rec', None, z0=-0.5); cut(hs, rec); bake(hs)
    for v in hs.data.vertices:
        if v.co.z < -3.0: v.co.x *= 0.88; v.co.y *= 0.85
    finish(hs, 0.2, 3)
    scr = tex_plane(A + '__screen', 14.9, 8.38, (0, 0, -0.45), (0, 0, 0), img_mat('tft_screen', path, 0.3, emit=1.4))
    gl = prism(rrect(15.0, 8.9, 0.6), 0.2, A + '__glass', M('glass'), z0=-0.22)
    # anti-glare visor along the top edge
    pts = []
    for k in range(13):
        t = k / 12; x = -W / 2 + 0.4 + (W - 0.8) * t
        pts.append((x, H / 2 - 0.2 + 0.25 * math.sin(math.pi * t), 0.0))
    vs = loft([[(x, y, 0.0), (x, y + 0.05, 1.8), (x, y - 0.5, 2.8)] for x, y, _ in pts], A + '__visor', M('plastic_black'), closed=False, caps=False)
    sol = vs.modifiers.new('sol', 'SOLIDIFY'); sol.thickness = 0.3
    # warning LED strip under the visor, ambient light sensor
    leds = []
    for i, key in enumerate(('led_green', 'led_off', 'led_blue', 'led_off', 'led_amber', 'led_off', 'led_off', 'led_green')):
        x = -5.6 + i * 1.6
        l = cyl(0.25, 0.2, (x, 5.0, 0.0), (0, 0, 0), 16, 'l'); l.data.materials.append(M(key)); leds.append(l)
    join(leds, A + '__warning_leds')
    # rear cover with ribs, mounting bracket with grommets, connector
    ribs = [box((0.3, 7.0, 0.6), (-4.5 + i * 1.5, 0, -3.6), (0, 0, 0), 'r') for i in range(7)]
    rb = join(ribs, A + '__rear_ribs'); finish(rb, 0.1, 2, m=M('plastic_black'))
    br = prism([(-7, -3), (7, -3), (5, 2), (-5, 2)], 0.4, 'br', M('anod_black'), round_r=1.0, z0=-4.6)
    gs = [lathe([(0.35, 0), (1.0, 0), (1.05, 0.7), (0.35, 0.7), (0.35, 0)], 'g', M('rubber_soft'), 32) for _ in range(3)]
    for g, (x, y) in zip(gs, ((-5.5, -2.0), (5.5, -2.0), (0, 1.5))): g.location = (x, y, -4.3)
    stay = box((2.0, 0.5, 6.0), (0, -3.2, -6.5), (math.radians(20), 0, 0), 'stay')
    bk = join([br, stay] + gs, A + '__bracket'); finish(bk, 0.1, 2)
    con = box((3.2, 1.6, 2.0), (3.0, -3.0, -4.4), (0, 0, 0), 'con'); finish(con, 0.15, 2, m=M('plastic_grey'))
    cab = sweep(spline([(3.0, -3.8, -4.4), (3.5, -5.5, -6.0), (5.5, -9.0, -8.0)], 6), 0.4, 'cab', M('plastic_black'), 12)
    join([con, cab], A + '__connector')
    xform(new_objs(before), Matrix.Translation((0, 0, 9)) @ Matrix.Rotation(math.radians(28), 4, 'Y') @ TOREAR)
