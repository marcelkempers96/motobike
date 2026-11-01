import sys, os, math, bpy, bmesh
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'instruments_analogue'
META = {"title": "Instruments, twin analogue clocks", "category": "electrical", "kind": "part", "view": (-125, 32)}

def disc_uv(name, R, m, z=0.0, segs=96):
    verts = [(0, 0, z)] + [(R * math.cos(k * TAU / segs), R * math.sin(k * TAU / segs), z) for k in range(segs)]
    faces = [(0, 1 + k, 1 + (k + 1) % segs) for k in range(segs)]
    o = mesh_obj(name, verts, faces, m, recalc=False)
    uv = o.data.uv_layers.new(name='UVMap')
    for poly in o.data.polygons:
        for li in poly.loop_indices:
            v = o.data.vertices[o.data.loops[li].vertex_index].co
            uv.data[li].uv = (v.x / (2 * R) + 0.5, v.y / (2 * R) + 0.5)
    return o

def clock(kind, cx, val, vmax):
    R = 5.0
    path = _dash.dial(f'{TEX}/dial_{kind}.png', kind)
    cup = lathe([(0, -5.2), (3.5, -5.0), (4.9, -4.0), (5.4, -2.0), (5.5, -0.2), (5.2, -0.2), (5.0, -0.5), (0, -0.5), (0, -5.2)], 'cup', M('satin_black'), 72)
    bez = lathe([(4.95, -0.6), (5.0, 0.35), (5.25, 0.75), (5.75, 0.7), (5.95, 0.2), (5.85, -0.6), (5.45, -0.9), (4.95, -0.6)], 'bez', M('chrome'), 96)
    face = disc_uv('face', R - 0.05, img_mat('dial_' + kind, path, 0.5), -0.45)
    glass = lathe([(0, 0.55), (2.5, 0.48), (4.6, 0.25), (5.05, 0.15), (5.05, 0.05), (0, 0.45)], 'glass', M('glass'), 72)
    a = math.radians(225 + (-45 - 225) * val / vmax)
    nd = prism([(-0.9, -0.09), (3.9, -0.03), (3.9, 0.03), (-0.9, 0.09)], 0.08, 'needle', mat('needle', (1.0, 0.32, 0.05), 0.0, 0.35), z0=-0.22)
    nd.rotation_euler = (0, 0, a)
    hubc = lathe([(0, -0.1), (0.5, -0.1), (0.45, 0.05), (0, 0.12)], 'hubc', M('satin_black'), 32)
    objs = []
    for o, nm in ((cup, 'housing'), (bez, 'bezel'), (face, 'dial'), (glass, 'glass'), (nd, 'needle'), (hubc, 'needle_cap')):
        o.location.x += cx; o.name = f'{A}__{kind}_{nm}'; objs.append(o)
    finish(cup, 0.06, 2); finish(bez, 0.03, 2)
    # mounting stud, rubber grommet and cable
    st = cyl(0.35, 2.5, (cx, 0, -6.3), (0, 0, 0), 16, 'st'); st.data.materials.append(M('zinc'))
    cb = sweep(spline([(cx + 1.2, 0.8, -5.0), (cx + 1.6, 1.2, -8.0), (cx + 1.0, 3.5, -12.0)], 6), 0.3, 'cb', M('plastic_black'), 10)
    join([st, cb], f'{A}__{kind}_cable')
    return objs

def build():
    before = set(bpy.context.scene.objects)
    clock('speed', -6.4, 62, 160); clock('tacho', 6.4, 4.2, 10)
    # warning-light console between and below the clocks
    con = prism(rrect(6.0, 3.6, 1.4), 2.4, A + '__warning_console', M('satin_black'), z0=-2.6); con.location = (0, -5.6, 0); finish(con, 0.25, 2)
    lamps = []
    for i, key in enumerate(('led_green', 'led_blue', 'led_amber', 'led_red')):
        x = -2.1 + i * 1.4
        l = lathe([(0, 0), (0.48, 0), (0.48, 0.18), (0.3, 0.35), (0, 0.38)], 'lamp', M(key), 32); l.location = (x, -5.6, -0.2); lamps.append(l)
        r = torus(0.55, 0.09, (x, -5.6, -0.15), (0, 0, 0), 'r', 32, 8); r.data.materials.append(M('chrome')); lamps.append(r)
    join(lamps, A + '__warning_lights')
    # black steel bracket holding both clocks (rubber mounted)
    br = prism([(-12.5, -1.6), (12.5, -1.6), (12.5, 1.6), (5.5, 2.4), (-5.5, 2.4), (-12.5, 1.6)], 0.35, 'br', M('satin_black'), round_r=1.2, z0=-6.0)
    gr = join([lathe([(0.35, 0), (1.0, 0), (1.05, 0.7), (0.35, 0.7), (0.35, 0)], 'g', M('rubber_soft'), 32) for _ in range(2)], 'grs')
    gr.location = (0, 0, 0)
    for o, x in ((gr, 0),):
        pass
    gs = []
    for x in (-6.4, 6.4):
        g = lathe([(0.35, 0), (1.0, 0), (1.05, 0.65), (0.35, 0.65), (0.35, 0)], 'g', M('rubber_soft'), 32); g.location = (x, 0, -5.7); gs.append(g)
    bpy.data.objects.remove(gr)
    bk = join([br] + gs, A + '__bracket'); finish(bk, 0.08, 2)
    # tilt: dial normal faces the rider (-X) and up 35 degrees
    xform(new_objs(before), Matrix.Translation((0, 0, 8)) @ Matrix.Rotation(math.radians(35), 4, 'Y') @ TOREAR)
