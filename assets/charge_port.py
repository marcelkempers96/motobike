"""Generic Type 2 / CCS2-style vehicle charging inlet with hinged caps (open), mounting flange, rear housing and HV cables.
Built facing local +Z, then turned to face the bike's left side (-Y)."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
from rear_sprocket import chaikin

META = {"title": "Charging inlet (Type 2 / CCS2 style)", "category": "electrical", "kind": "part", "view": (-24, 16)}
A = 'charge_port'
AC = (0.0, 2.6)      # centre of the AC (Type 2) part on the face (x, y)
DC = (0.0, -4.0)     # centre of the DC pair

def type2_outline(R, flat, cx, cy, n=72):
    """Circle with the top flattened (Type 2 profile)."""
    pts = []
    for i in range(n):
        a = -math.pi / 2 + TAU * i / n
        x, y = R * math.cos(a), R * math.sin(a)
        if y > flat: y = flat
        pts.append((cx + x, cy + y))
    # drop duplicates on the flat
    out = [pts[0]]
    for p in pts[1:]:
        if abs(p[0] - out[-1][0]) > 1e-4 or abs(p[1] - out[-1][1]) > 1e-4: out.append(p)
    return chaikin(out, 1)

def stadium(w, h, cx, cy, n=16):
    r = h / 2; pts = []
    for i in range(n + 1):
        a = -math.pi / 2 + math.pi * i / n; pts.append((cx + w / 2 - r + r * math.cos(a), cy + r * math.sin(a)))
    for i in range(n + 1):
        a = math.pi / 2 + math.pi * i / n; pts.append((cx - w / 2 + r + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def build():
    shell = noisy_mat('inlet_plastic', (0.03, 0.03, 0.032), 0.0, 0.40, 0.06, 150, 0.03)
    insul = mat('insulator', (0.06, 0.06, 0.065), 0.0, 0.5)
    contact = mat('contact_silver', (0.86, 0.86, 0.84), 1.0, 0.16)
    rub = M('rubber'); orange = M('orange'); zinc = M('zinc')
    objs = []
    # ---------- flange + rear body ----------
    fl = prism(rrect(11.6, 16.0, 1.6, 6), 0.0, 0.5, 'flange', 'Z',
               holes=[circle(0.32, 16, sx * 4.6, sy * 6.8) for sx in (-1, 1) for sy in (-1, 1)])
    finish(fl, 0.15, 2, m=shell); nm(fl, A + '__mounting_flange')
    scr = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            s = cyl(0.55, 0.3, (sx * 4.6, sy * 6.8, 0.65), (0, 0, 0), 32, 'scr'); finish(s, 0.08, 2); apply_mods(s)
            cutw(s, cyl(0.25, 1, (sx * 4.6, sy * 6.8, 0.9), (0, 0, 0), 6, '_sk'), fast=True); scr.append(s)
    so = joinn(scr, A + '__flange_screws'); finish(so, 0, m=zinc)
    body = prism(rrect(9.2, 13.4, 1.6, 6), -5.5, 0.01, 'body', 'Z'); finish(body, 0.4, 3, m=shell); nm(body, A + '__rear_housing')
    # ---------- AC (Type 2) socket ----------
    o_out = type2_outline(3.75, 2.75, *AC); o_in = type2_outline(3.15, 2.2, *AC)
    rim = prism(o_out, 0.45, 2.6, 'acrim', 'Z', holes=[o_in]); finish(rim, 0.12, 2, m=shell); nm(rim, A + '__ac_socket_shroud')
    floor = prism(o_in, 0.45, 0.8, 'acfloor', 'Z'); finish(floor, 0, m=insul); nm(floor, A + '__ac_socket_face')
    big = [(-1.95, 0.15), (1.95, 0.15), (0.0, -0.35), (-1.2, -1.75), (1.2, -1.75)]
    small = [(-1.05, 1.5), (1.05, 1.5)]
    sleeves = []; pins = []
    for (dx, dy) in big + small:
        r = 0.62 if (dx, dy) in big else 0.42; rp = 0.24 if (dx, dy) in big else 0.15
        if (dx, dy) == (0.0, -0.35): r, rp = 0.7, 0.28    # protective earth
        x, y = AC[0] + dx, AC[1] + dy
        s = prism(circle(r, 32, x, y), 0.79, 2.05, 'sl', 'Z', holes=[circle(r * 0.62, 24, x, y)])
        sleeves.append(s)
        p = spin([(0.001, 0.8), (rp, 0.8), (rp, 1.75), (rp * 0.7, 1.9), (0.001, 1.92)], 'pin', 'Z', (x, y, 0), 24); pins.append(p)
    sl = joinn(sleeves, A + '__ac_pin_sleeves'); finish(sl, 0.04, 2, m=insul)
    pn = joinn(pins, A + '__ac_contacts'); finish(pn, 0, m=contact)
    # ---------- DC (CCS2) pair ----------
    d_out = stadium(7.4, 3.6, *DC)
    d_holes = [circle(1.15, 48, DC[0] + sx * 1.75, DC[1]) for sx in (-1, 1)]
    dshell = prism(d_out, 0.45, 2.4, 'dcshell', 'Z', holes=d_holes); finish(dshell, 0.12, 2, m=shell); nm(dshell, A + '__dc_socket_shroud')
    dsl = []; dpn = []
    for sx in (-1, 1):
        x, y = DC[0] + sx * 1.75, DC[1]
        dsl.append(prism(circle(1.16, 40, x, y), 0.45, 0.9, 'dfl', 'Z'))
        dsl.append(prism(circle(0.82, 32, x, y), 0.85, 1.85, 'dsl', 'Z', holes=[circle(0.55, 24, x, y)]))
        dpn.append(spin([(0.001, 0.85), (0.45, 0.85), (0.45, 1.6), (0.32, 1.78), (0.001, 1.8)], 'dpin', 'Z', (x, y, 0), 32))
    ds = joinn(dsl, A + '__dc_pin_sleeves'); finish(ds, 0.04, 2, m=insul)
    dp = joinn(dpn, A + '__dc_contacts'); finish(dp, 0, m=contact)
    # ---------- hinged caps (open) ----------
    def cap(name, outline, hinge_y, hinge_z, open_deg, sign):
        lid = prism(outline, 0.0, 0.7, 'lid', 'Z'); finish(lid, 0.3, 3); apply_mods(lid)
        cx = sum(p[0] for p in outline) / len(outline); cy = sum(p[1] for p in outline) / len(outline)
        seal = prism(outline, -0.25, 0.01, 'seal', 'Z', holes=[[(cx + (x - cx) * 0.88, cy + (y - cy) * 0.88) for x, y in outline]])
        arm = box((2.2, 2.2, 0.5), (0, hinge_y - 0.75 if hinge_y > cy else hinge_y + 0.75, 0.35), name='arm'); finish(arm, 0.2, 2); apply_mods(arm)
        o = joinn([lid, arm], name)
        o.data.materials.clear(); o.data.materials.append(shell)
        seal.data.materials.append(rub); nm(seal, name + '_seal')
        barrel = cyl(0.45, 3.0, (0, hinge_y, hinge_z), RX, 32, name + '_hinge'); finish(barrel, 0.08, 2, m=shell)
        pinr = cyl(0.18, 3.4, (0, hinge_y, hinge_z), RX, 16, name + '_hinge_pin'); finish(pinr, 0.02, 1, m=zinc)
        # position closed then rotate open about the hinge axis (X)
        for ob in (o, seal):
            ob.location = (0, 0, 2.65); bpy.context.view_layer.update()
            T = mathutils.Matrix.Translation((0, hinge_y, hinge_z)) @ mathutils.Matrix.Rotation(math.radians(open_deg) * sign, 4, 'X') @ mathutils.Matrix.Translation((0, -hinge_y, -hinge_z))
            ob.matrix_world = T @ ob.matrix_world
        return o
    ac_out = [(x, y) for x, y in type2_outline(3.85, 2.85, *AC)]
    cap(A + '__ac_cap', ac_out, AC[1] + 4.1, 2.9, 118, -1)
    cap(A + '__dc_cap', stadium(7.6, 3.8, *DC), DC[1] - 2.5, 2.7, 118, 1)
    # hinge brackets on the flange
    hb = [box((0.5, 1.4, 2.6), (sx * 1.75, AC[1] + 4.1, 1.6), name='hb') for sx in (-1, 1)] + \
         [box((0.5, 1.4, 2.4), (sx * 1.75, DC[1] - 2.5, 1.5), name='hb') for sx in (-1, 1)]
    for b in hb: finish(b, 0.2, 2); apply_mods(b)
    hbo = joinn(hb, A + '__hinge_brackets'); finish(hbo, 0, m=shell)
    # ---------- lock actuator + status LED ----------
    act = cyl(1.2, 3.6, (5.6, 1.0, -2.6), RY, 40, 'act'); finish(act, 0.2, 2, m=shell); nm(act, A + '__lock_actuator')
    led = prism(stadium(2.2, 0.5, 0, AC[1] - 4.15 + 0.0), 0.45, 0.7, 'led', 'Z'); nm(led, A + '__status_led')
    lm = mat('led', (0.1, 0.55, 0.9), 0.0, 0.2); lm.node_tree.nodes['Principled BSDF'].inputs['Emission Color'].default_value = (0.2, 0.6, 1, 1)
    lm.node_tree.nodes['Principled BSDF'].inputs['Emission Strength'].default_value = 3.0
    finish(led, 0.05, 1, m=lm)
    # ---------- cables out of the back ----------
    cbl = []
    for (x, r, m_) in ((-2.2, 0.85, orange), (2.2, 0.85, orange), (0.0, 0.55, orange)):
        p = [(x, -3.0 if r > 0.6 else 3.0, -5.4), (x, -3.0 if r > 0.6 else 3.0, -9.0), (x * 1.3, -6.0, -14.0), (x * 1.5, -11.0, -16.0)]
        cbl.append(to_mesh(tube(p, r, 'c', m_, res=10, sides=3)))
    co = joinn(cbl, A + '__hv_cables')
    sig = to_mesh(tube([(3.0, 4.5, -5.4), (3.2, 4.5, -8.0), (4.0, 1.0, -13.0), (4.5, -6.0, -15.5)], 0.3, 's', M('chip'), res=10, sides=2))
    nm(sig, A + '__signal_cable')
    boots = [cyl(r + 0.25, 2.0, (x, -3.0 if r > 0.6 else 3.0, -6.3), (0, 0, 0), 32, 'b') for (x, r) in ((-2.2, 0.85), (2.2, 0.85), (0.0, 0.55))]
    bo = joinn(boots, A + '__cable_boots'); finish(bo, 0.15, 2, m=rub)
    # turn to face the bike's left side (-Y)
    transform_all(mathutils.Matrix.Rotation(math.radians(90), 4, 'X'))
