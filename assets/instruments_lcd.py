import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'instruments_lcd'
META = {"title": "Instruments, compact motocross LCD", "category": "electrical", "kind": "part", "view": (-125, 32)}

def build():
    before = set(bpy.context.scene.objects)
    path = _dash.lcd(f'{TEX}/lcd_mx.png')
    hs = prism(rrect(10.5, 6.6, 1.3), 2.6, A + '__housing', M('plastic_black'), z0=-2.6)
    rec = prism(rrect(8.2, 4.9, 0.5), 2.0, '_rec', None, z0=-0.45); cut(hs, rec); bake(hs)
    for v in hs.data.vertices:
        if v.co.z < -2.0: v.co.x *= 0.9; v.co.y *= 0.88
    finish(hs, 0.18, 3)
    scr = tex_plane(A + '__screen', 8.0, 4.7, (0, 0, -0.42), (0, 0, 0), img_mat('lcd_screen', path, 0.25))
    gl = prism(rrect(8.2, 4.9, 0.5), 0.15, A + '__glass', M('glass'), z0=-0.18)
    btns = []
    for x in (-2.2, 2.2):
        b = prism(rrect(2.6, 1.2, 0.5), 1.0, 'b', M('rubber_soft'), z0=0); b.rotation_euler = (math.radians(90), 0, 0); b.location = (x, -3.25, -1.3)
        finish(b, 0.2, 3); btns.append(b)
    join(btns, A + '__buttons')
    # bracket on a handlebar crossbar clamp
    br = box((4.0, 0.4, 4.2), (0, -1.0, -4.6), (math.radians(-10), 0, 0), 'br'); finish(br, 0.12, 2, m=M('anod_black'))
    cl = lathe([(1.25, -1.6), (1.75, -1.6), (1.75, 1.6), (1.25, 1.6), (1.25, -1.6)], 'cl', M('anod_black'), 48)
    cl.rotation_euler = (0, math.radians(90), 0); cl.location = (0, -1.4, -6.9); finish(cl, 0.1, 2)
    bolt = cyl(0.45, 1.2, (0, -3.2, -6.9), (math.radians(90), 0, 0), 6, 'bo'); finish(bolt, 0.05, 2, m=M('zinc'))
    join([br, cl, bolt], A + '__bracket')
    cab = sweep(spline([(2.5, -1.5, -2.7), (3.0, -2.5, -4.5), (5.0, -6.0, -7.0)], 6), 0.25, A + '__cable', M('plastic_black'), 10)
    xform(new_objs(before), Matrix.Translation((0, 0, 8)) @ Matrix.Rotation(math.radians(35), 4, 'Y') @ TOREAR)
