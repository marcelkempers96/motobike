import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Slide carburettor (half section)", "category": "powertrain", "kind": "part", "view": (-18, 16)}
A = 'carb'
RB = 1.2       # venturi radius at the slide
SZ = 0.25      # slide bottom height (part throttle)


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    body_m = noisy_mat('carb_body', (0.66, 0.66, 0.67), 1.0, 0.40, 0.08, 120, 0.08)
    float_m = mat('float_plastic', (0.78, 0.74, 0.58), 0.0, 0.38)
    viton = mat('viton', (0.05, 0.05, 0.05), 0.0, 0.5)
    sheath = mat('cable_sheath', (0.02, 0.02, 0.02), 0.0, 0.45, coat=0.3)
    half = box((40, 40, 40), (0, -20, 0), name='_half')
    # ---- body: venturi tube, slide tower, bowl flange, spigots
    tb = lathe([(0, -3.6), (1.72, -3.6), (1.72, -2.3), (1.95, -2.2), (1.95, 2.4), (1.75, 2.5), (1.6, 2.6), (1.6, 3.9), (1.7, 4.0), (1.7, 4.5), (0, 4.5)],
               'tube', body_m, (0, 0, 0), 'X', 96)
    tower = lathe([(0, -1.0), (1.85, -1.0), (1.85, 3.9), (2.05, 4.0), (2.05, 4.3), (0, 4.3)], 'tower', body_m, (0, 0, 0), 'Z', 96)
    fl = slab(rrect(4.6, 4.4, 1.0, 5), 0.5, 'bowlflange', body_m, 'XY', -1.35)
    jb = lathe([(0, -2.6), (0.55, -2.6), (0.6, -1.0), (0, -1.0)], 'jetboss', body_m, (0, 0, 0), 'Z', 48)
    pb = lathe([(0, -2.3), (0.4, -2.3), (0.45, -1.0), (0, -1.0)], 'pilotboss', body_m, (1.35, 0.6, 0), 'Z', 32)
    nb = lathe([(0, -2.0), (0.42, -2.0), (0.5, -1.0), (0, -1.0)], 'seatboss', body_m, (-1.25, 0.9, 0), 'Z', 32)
    fs = lathe([(0, 0), (0.42, 0), (0.42, 0.4), (0.3, 0.45), (0.3, 2.4), (0.36, 2.5), (0.36, 2.7), (0.26, 2.9), (0, 2.9)], 'fuelspigot', body_m, (-1.25, 0.9, -1.7), '-X', 32)
    for o in (tb, tower, fl): finish(o, 0.06, 2)
    body = bake(tb)
    bmulti(body, [bake(o) for o in (tower, fl, jb, pb, nb, fs)], 'UNION'); body = bake(body)
    venturi = lathe([(0, -4.0), (1.6, -4.0), (1.45, -2.6), (RB + 0.05, -1.3), (RB, 0), (RB + 0.03, 1.3), (1.4, 2.6), (1.4, 5.0), (0, 5.0)], '_venturi', None, (0, 0, 0), 'X', 96)
    cuts = [venturi,
            cyl(RB + 0.06, 6, (0, 0, 2.0), (0, 0, 0), 96, '_slidebore'),
            cyl(0.22, 2.0, (0, 0, -1.6), (0, 0, 0), 24, '_needlejet'),
            cyl(0.18, 1.6, (1.35, 0.6, -1.6), (0, 0, 0), 24, '_pilotjet'),
            cyl(0.06, 3.0, (1.35, 0.6, -0.3), (0, 0.4, 0), 12, '_pilotpass'),
            cyl(0.2, 1.2, (-1.25, 0.9, -1.6), (0, 0, 0), 24, '_seat'),
            cyl(0.12, 3.0, (-2.6, 0.9, -1.7), RX, 16, '_fuelin')]
    bmulti(body, cuts)
    body = section(body, half, M.section); body.name = n('body')
    # ---- float bowl
    bowl = slab(rrect(4.6, 4.4, 1.0, 5), 3.2, 'bowl', body_m, 'XY', -3.2); finish(bowl, 0.35, 3); bowl = bake(bowl)
    inner = slab(rrect(4.0, 3.8, 0.7, 5), 3.2, '_bowlin', None, 'XY', -2.85)
    bcut(bowl, inner)
    dr = lathe([(0, -4.85), (0.5, -4.85), (0.5, -4.8), (0, -4.8)], '_x', None, (0, 0, 0), 'Z', 8)
    bpy.data.objects.remove(dr)
    bowl = bake(bowl)
    drain = cyl(0.45, 0.5, (0, 0, -5.05), (0, 0, 0), 6, 'drainplug'); finish(drain, 0.05, 2, m=M.chrome)
    bowl = J([bowl, drain], 'bowl'); bowl = section(bowl, half, M.section, selfi=True); bowl.name = n('float_bowl')
    # ---- top cap, cable adjuster and throttle cable
    cap = lathe([(0, 4.3), (2.1, 4.3), (2.1, 4.9), (1.9, 5.15), (0.7, 5.3), (0.5, 5.3), (0.5, 5.6), (0, 5.6)], 'cap', M.alu, (0, 0, 0), 'Z', 96)
    bcut(cap, cyl(1.4, 0.8, (0, 0, 4.4), (0, 0, 0), 64, '_capin'))
    adj = lathe([(0.12, 5.4), (0.32, 5.4), (0.32, 6.9), (0.12, 6.9)], 'adjuster', M.chrome, (0, 0, 0), 'Z', 32)
    ln = cyl(0.5, 0.35, (0, 0, 6.0), (0, 0, 0), 6, 'locknut'); finish(ln, 0.04, 2, m=M.chrome)
    capo = J([cap, adj, ln], 'cap'); capo = section(capo, half, M.section, selfi=True); capo.name = n('top_cap')
    cab = tube([(0, 0, 6.9), (0, 0, 8.6), (-1.2, 0, 10.4), (-4.2, 0, 11.4)], 0.26, 'cable', sheath, 6)
    fer = lathe([(0.1, 6.85), (0.32, 6.85), (0.32, 7.5), (0.1, 7.5)], 'ferrule', M.chrome, (0, 0, 0), 'Z', 24)
    J([bake(cab), fer], n('throttle_cable'))
    inner_c = lathe([(0, 1.0), (0.07, 1.0), (0.07, 7.0), (0, 7.0)], n('inner_cable'), M.steel, (0, 0, 0), 'Z', 12)
    # ---- slide with intake-side cutaway, needle and clip, return spring
    sl = lathe([(0, SZ), (RB, SZ), (RB, SZ + 3.0), (0, SZ + 3.0)], 'slide', M.chrome, (0, 0, 0), 'Z', 96)
    bcut(sl, cyl(RB - 0.18, 3.0, (0, 0, SZ + 0.35 + 1.5 + 0.2), (0, 0, 0), 64, '_slidein'))
    bcut(sl, box((2.0, 3.0, 0.6), (-1.0 - 0.3, 0, SZ), (0, rad(-12), 0), '_cutaway'))
    bcut(sl, box((0.4, 3.0, 2.2), (0, -RB, SZ + 1.6), name='_groove'))
    sl = section(sl, half, M.section); sl.name = n('slide')
    nd = lathe([(0, -2.2), (0.04, -2.2), (0.06, -1.6), (0.1, -0.5), (0.125, 0.6), (0.125, SZ + 0.95), (0.2, SZ + 0.95), (0.2, SZ + 1.05), (0, SZ + 1.05)],
               'needle', M.steel, (0, 0, 0), 'Z', 24)
    clip = torus(0.2, 0.04, (0, 0, SZ + 0.7), (0, 0, 0), 'clip', 24, 6); clip.data.materials.append(M.brass)
    J([nd, clip], n('needle'))
    sp = coil(0.75, 0.38, 7.0, 0.06, (0, 0, SZ + 0.6), M.spring, n('return_spring'), 20, 1)
    # ---- jets: needle jet / emulsion tube, main jet, pilot jet
    em = lathe([(0.1, -3.4), (0.21, -3.4), (0.21, -0.9), (0.1, -0.9)], 'emulsion', M.brass, (0, 0, 0), 'Z', 32)
    hs = [cyl(0.06, 1.0, (0, 0, z), RX, 12, '_eh') for z in (-2.0, -2.4, -2.8)]
    bcut(em, J(hs, '_ehs')); em = section(em, half, M.section); em.name = n('needle_jet')
    mj = lathe([(0, -4.1), (0.38, -4.1), (0.38, -3.4), (0.2, -3.4), (0.2, -3.2), (0, -3.2)], 'mainjet', M.brass, (0, 0, 0), 'Z', 6)
    bcut(mj, cyl(0.07, 2, (0, 0, -3.6), (0, 0, 0), 12, '_orifice'))
    mj = section(mj, half, M.section); mj.name = n('main_jet')
    pj = lathe([(0, -3.2), (0.3, -3.2), (0.3, -2.7), (0.15, -2.7), (0.15, -1.2), (0, -1.2)], 'pilotjet', M.brass, (1.35, 0.6, 0), 'Z', 6)
    pj.name = n('pilot_jet')
    # ---- float (rear pontoon removed by the cut), hinge and float needle valve
    fpts = rrect(3.4, 1.9, 0.8, 6)
    fl1 = slab(fpts, 1.2, 'float', float_m, 'XZ', 1.15); fl1.location = (0.2, 0, -3.3); finish(fl1, 0.3, 3)
    arm = box((2.0, 1.7, 0.12), (-0.9, 0.85, -2.4), name='arm'); finish(arm, 0.03, 2, m=M.brass)
    tab = box((0.4, 0.3, 0.1), (-1.25, 0.9, -2.33), name='tab'); tab.data.materials.append(M.brass)
    J([fl1, arm, tab], n('float'))
    hp = cyl(0.08, 2.1, (-1.9, 1.05, -2.4), RY, 12, 'hinge'); hp.data.materials.append(M.steel); hp.name = n('float_hinge_pin')
    fn = lathe([(0, -2.3), (0.07, -2.3), (0.13, -2.05), (0.15, -1.95), (0.15, -1.2), (0, -1.2)], 'floatneedle', M.brass, (-1.25, 0.9, 0), 'Z', 24)
    tip = lathe([(0, -2.05), (0.13, -2.05), (0.13, -1.95), (0, -1.95)], 'viton', viton, (-1.25, 0.9, 0), 'Z', 24)
    J([fn, tip], n('float_needle'))
    finalize(A)
