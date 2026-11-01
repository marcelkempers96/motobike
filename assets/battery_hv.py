import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *
import _dash

A = 'battery_hv'
META = {"title": "HV lithium traction battery pack", "category": "electrical", "kind": "part", "view": (-38, 28)}

L, Wd, H = 46.0, 26.0, 17.0
def build():
    body = prism(rrect(L, Wd, 3.0), H - 2.0, 'body', None, z0=1.0)
    finish(body, 0.4, 3, m=M('alu_cast')); body.name = A + '__enclosure'
    # lid with perimeter flange and bolts
    fl = prism(rrect(L + 1.6, Wd + 1.6, 3.6), 0.6, A + '__flange', M('alu_cast'), z0=H - 1.0); finish(fl, 0.15, 2)
    lid = prism(rrect(L - 1.0, Wd - 1.0, 2.6), 1.6, 'lid', None, z0=H - 0.45)
    for v in lid.data.vertices:
        if v.co.z > H + 0.5: v.co.x *= 0.985; v.co.y *= 0.97
    finish(lid, 0.4, 3, m=mat('lid_paint', (0.10, 0.11, 0.12), 0.4, 0.35, coat=0.3)); lid.name = A + '__lid'
    bolts = []
    per = 2 * (L + Wd); n = 28
    for i in range(n):
        t = i / n * per
        if t < L: x, y = -L / 2 + t, -(Wd / 2 + 0.25)
        elif t < L + Wd: x, y = L / 2 + 0.25, -Wd / 2 + (t - L)
        elif t < 2 * L + Wd: x, y = L / 2 - (t - L - Wd), Wd / 2 + 0.25
        else: x, y = -(L / 2 + 0.25), Wd / 2 - (t - 2 * L - Wd)
        if abs(abs(x) - L / 2) < 1.5 and abs(abs(y) - Wd / 2) < 1.5: continue
        bolts.append(cyl(0.45, 0.35, (x, y, H - 0.25), (0, 0, 0), 6, 'b'))
    bj = join(bolts, A + '__lid_bolts'); finish(bj, 0.05, 1, m=M('steel'))
    # cooling fins along both long sides and underneath
    fins = []
    for sy in (-1, 1):
        for i in range(19):
            x = -L / 2 + 3.5 + i * 2.1
            fins.append(box((0.45, 1.8, H - 5.0), (x, sy * (Wd / 2 + 0.7), H / 2 - 0.5), (0, 0, 0), 'f'))
    for j in range(9):
        fins.append(box((L - 6.0, 0.45, 1.0), (0, -Wd / 2 + 3.5 + j * 2.4, 0.6), (0, 0, 0), 'bf'))
    fj = join(fins, A + '__cooling_fins'); finish(fj, 0.12, 2, m=M('alu_cast'))
    # mounting feet
    feet = [prism(rrect(5.0, 3.0, 1.0), 1.0, 'ft', None, z0=1.4) for _ in range(4)]
    for f, (sx, sy) in zip(feet, ((-1, -1), (1, -1), (-1, 1), (1, 1))):
        f.location = (sx * (L / 2 + 1.4), sy * (Wd / 2 - 4), 0)
    ftj = join(feet, A + '__mount_feet'); finish(ftj, 0.2, 2, m=M('alu_cast'))
    # HV connector on the front end: orange shell, locking lever, two orange cables
    cx = L / 2 + 0.2; cz = H * 0.48
    base = box((1.2, 9.0, 5.0), (cx + 0.3, -3.0, cz), (0, 0, 0), 'cb'); finish(base, 0.2, 2, m=M('anod_black'))
    shell = box((4.2, 8.0, 4.2), (cx + 2.8, -3.0, cz), (0, 0, 0), 'cs'); finish(shell, 0.6, 3, m=M('orange'))
    lever = box((0.6, 8.6, 1.0), (cx + 3.2, -3.0, cz + 2.4), (0, 0, 0), 'lv'); finish(lever, 0.2, 2, m=M('orange'))
    join([base, shell, lever], A + '__hv_connector')
    cabs = []
    for dy in (-1.6, 1.6):
        P = spline([(cx + 4.8, -3.0 + dy, cz), (cx + 9.0, -3.0 + dy * 1.2, cz - 1.0), (cx + 12.0, -3.0 + dy * 2.0, cz - 6.0), (cx + 13.0, -3.0 + dy * 3.0, cz - 14.0)], 10)
        cabs.append(sweep(P, 0.95, 'hvc', M('orange'), 20))
        ferr = cyl(1.15, 1.6, (cx + 5.4, -3.0 + dy, cz), (0, math.radians(90), 0), 32, 'boot'); finish(ferr, 0.3, 2, m=M('orange')); cabs.append(ferr)
    join(cabs, A + '__hv_cables')
    # manual service disconnect on the lid: base + orange handle plug
    mx, my = L / 2 - 9.0, 3.0
    msb = prism(rrect(7.0, 5.0, 1.0), 1.0, 'msb', None, z0=H + 1.0); msb.location = (mx, my, 0); finish(msb, 0.2, 2, m=M('anod_black'))
    plug = prism(rrect(5.6, 3.6, 0.8), 2.2, 'plug', None, z0=H + 1.9); plug.location = (mx, my, 0); finish(plug, 0.3, 3, m=M('orange'))
    hand = sweep(spline([(mx - 2.0, my, H + 4.0), (mx - 1.6, my, H + 5.8), (mx + 1.6, my, H + 5.8), (mx + 2.0, my, H + 4.0)], 6), 0.45, 'hd', M('orange'), 14)
    join([msb, plug, hand], A + '__service_disconnect')
    # LV signal connector (BMS comms) and pressure vent
    lv = box((1.2, 4.2, 2.4), (cx + 0.9, 6.5, cz + 1.0), (0, 0, 0), 'lv'); finish(lv, 0.2, 2, m=M('plastic_black'))
    lvc = sweep(spline([(cx + 1.6, 6.5, cz + 1.0), (cx + 5.0, 7.5, cz), (cx + 7.0, 9.0, cz - 8.0)], 8), 0.35, 'lvc', M('plastic_black'), 12)
    join([lv, lvc], A + '__lv_connector')
    vent = lathe([(0, 0), (1.6, 0), (1.6, 0.6), (1.2, 0.8), (0, 0.85)], A + '__pressure_vent', M('plastic_grey'), 48)
    vent.location = (-L / 2 + 6.0, -Wd / 2 + 6.0, H + 1.1)
    lab = tex_plane(A + '__label', 22.0, 12.6, (-4.0, 1.5, H + 1.17), (0, 0, 0), img_mat('labelhv', _dash.label_hv(f'{TEX}/label_hv.png'), 0.4))
