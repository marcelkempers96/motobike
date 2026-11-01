import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'headlight_mx'
META = {"title": "Headlight, motocross number-plate shroud", "category": "electrical", "kind": "part", "view": (55, 12)}

H = 32.0
def hw(z):
    u = (z - H / 2) / (H / 2 + 0.15)
    return 12.5 * (1 - abs(u) ** 4) ** 0.25 * (0.58 + 0.42 * min(1.0, z / 14.0))
def X(y, z): return 2.0 - 0.02 * y * y - 0.20 * z + 0.9 * math.sin(math.pi * z / H)

def place(o, x, y, z):
    o.matrix_world = Matrix.Translation((x, y, z)) @ TOFRONT @ o.matrix_world; return o

def build():
    secs = []
    nz, ny = 44, 36
    for i in range(nz + 1):
        z = H * (0.5 - 0.5 * math.cos(math.pi * i / nz))
        w = hw(z)
        secs.append([(X(-w + 2 * w * j / ny, z), -w + 2 * w * j / ny, z) for j in range(ny + 1)])
    pl = loft(secs, A + '__plate', M('plastic_white'), closed=False, caps=False)
    sol = pl.modifiers.new('sol', 'SOLIDIFY'); sol.thickness = 0.35; sol.offset = -1
    bv = pl.modifiers.new('bv', 'BEVEL'); bv.width = 0.12; bv.segments = 2; bv.limit_method = 'ANGLE'
    # lamp unit set into the lower half
    zc = 10.5; xc = X(0, zc)
    bez = prism(rrect(13.5, 8.8, 3.6), 2.2, A + '__bezel', M('plastic_black'), z0=-1.0)
    cut(bez, prism(rrect(12.2, 7.6, 3.0), 2.0, '_bc', None, z0=0.0)); bake(bez); finish(bez, 0.25, 3)
    refl = prism(rrect(12.0, 7.4, 2.9), 0.3, A + '__reflector', M('reflector'), z0=-0.1); finish(refl, 0.08, 2)
    lens = prism(rrect(12.2, 7.6, 3.0), 0.35, A + '__lens', M('glass'), z0=0.75); finish(lens, 0.2, 3)
    bulb = cyl(1.2, 1.2, (0, 0.3, 1.0), (0, 0, 0), 32, 'b'); finish(bulb, 0.3, 3, m=M('glass'))
    cap = cyl(0.8, 0.4, (0, 0.3, 1.65), (0, 0, 0), 32, 'c'); finish(cap, 0.1, 2, m=M('chrome'))
    leds = join([cyl(0.35, 0.3, (sx * 3.6, -2.0, 0.75), (0, 0, 0), 16, 'l') for sx in (-1, 1)], 'leds'); leds.data.materials.append(M('led_white'))
    bl = join([bulb, cap, leds], A + '__bulb')
    for o in (bez, refl, lens, bl): place(o, xc - 0.6, 0, zc)
    # rubber fork straps (two each side) looping round the fork tubes behind the plate
    straps = []
    for sy in (-1, 1):
        for zs in (7.0, 24.0):
            yp = sy * (hw(zs) - 1.6); xp = X(yp, zs) - 0.4
            c = V((xp - 6.0, sy * 8.6, zs)); rr = 2.6
            a0 = math.atan2(yp - c.y, xp - c.x)
            pts = [V((xp, yp, zs))]
            for k in range(17):
                ang = a0 + sy * math.radians(40 + 280 * k / 16)
                pts.append(c + V((math.cos(ang) * rr, math.sin(ang) * rr, 0)))
            pts.append(V((xp, yp + sy * 1.2, zs)))
            pts = spline(pts, 2)
            nr = [V((p.x - c.x, p.y - c.y, 0)).normalized() for p in pts]
            straps.append(sweep(pts, 1.0, 's', M('rubber_soft'), 10, normals=nr, ell=(0.22, 1.1)))
            hook = cyl(0.55, 1.4, (xp - 0.3, yp + sy * 0.6, zs), (0, math.radians(90), 0), 16, 'hk'); hook.data.materials.append(M('plastic_black')); straps.append(hook)
    # number background panel (matte) on the upper plate
    secs2 = []
    for i in range(13):
        z = 16.0 + 13.0 * i / 12; w = hw(z) - 2.2
        secs2.append([(X(-w + 2 * w * j / 20, z) + 0.06, -w + 2 * w * j / 20, z) for j in range(21)])
    nb = loft(secs2, A + '__number_panel', mat('np_black', (0.02, 0.02, 0.025), 0.0, 0.6), closed=False, caps=False)
    join(straps, A + '__fork_straps')
    # cable exiting the back
    sweep(spline([(xc - 2.0, 0, zc), (xc - 5.0, 0.0, zc - 1.0), (xc - 9.0, 2.5, zc + 3.0), (xc - 12.0, 3.0, zc + 9.0)], 6), 0.4,
          A + '__cable', M('plastic_black'), 12)
