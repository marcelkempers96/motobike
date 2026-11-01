"""Front brake: floating drilled disc with a radial-mount 4-piston monoblock caliper. Disc axis along Y."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
from rear_sprocket import chaikin

META = {"title": "Disc brake (floating disc, 4-piston radial caliper)", "category": "chassis", "kind": "part", "view": (-30, 16)}
A = 'brake'

def pol(r, a, y=0.0): return V((r * math.cos(a), y, r * math.sin(a)))

def build():
    disc_m = M('disc'); car_m = M('black_anod'); cal_m = noisy_mat('caliper_cast', (0.80, 0.56, 0.20), 1.0, 0.32, 0.06, 150, 0.05)
    steel = M('steel'); zinc = M('zinc'); rub = M('rubber')
    RO, RI, RB = 16.0, 11.5, 11.45   # disc outer, disc inner, button radius

    # ---------- disc ----------
    holes = []
    for row, (rr, off) in enumerate(((12.6, 0.0), (13.75, 0.33), (14.9, 0.66))):
        for i in range(20):
            a = (i + off) * TAU / 20
            holes.append(circle(0.30, 10, rr * math.cos(a), rr * math.sin(a)))
    # inner edge with half-moon notches for the floating buttons
    inner = []
    NB = 10
    for i in range(NB):
        a0 = i * TAU / NB
        for j in range(10):
            t = a0 + math.radians(4.5) + (TAU / NB - math.radians(9)) * j / 9
            inner.append((RI * math.cos(t), RI * math.sin(t)))
        ab = a0 + TAU / NB
        c = pol(RB, ab)
        for j in range(7):  # notch: arc around button centre, bulging outward
            t = ab - math.pi / 2 - math.radians(5) + (math.pi + math.radians(10)) * j / 6
            inner.append((c.x + 0.62 * math.cos(t + 0), c.z + 0.62 * math.sin(t)))
    # fix notch direction: arc around button centre on the outer side of the inner edge
    inner2 = []
    for i in range(NB):
        a0 = i * TAU / NB
        for j in range(10):
            t = a0 + math.radians(4.0) + (TAU / NB - math.radians(8.0)) * j / 9
            inner2.append((RI * math.cos(t), RI * math.sin(t)))
        ab = a0 + TAU / NB; c = pol(RB, ab)
        for j in range(7):
            t = ab - math.pi / 2 + math.pi * j / 6     # from the trailing tangent side over the outer side
            inner2.append((c.x + 0.6 * math.cos(t), c.z + 0.6 * math.sin(t)))
    disc = prism(circle(RO, 192), -0.25, 0.25, A + '__disc', 'Y', holes=holes + [inner2])
    finish(disc, 0.04, 1, m=disc_m)

    # ---------- carrier ----------
    wins = []
    NS = 6
    for k in range(NS):
        a0 = k * TAU / NS + math.pi / NS; a1 = a0 + TAU / NS
        r0, r1, sw = 6.4, 10.2, 1.05
        da0 = math.asin(sw / r0); da1 = math.asin(sw / r1); w = []
        for i in range(13):
            t = a0 + da1 + (a1 - a0 - 2 * da1) * i / 12; w.append((r1 * math.cos(t), r1 * math.sin(t)))
        for i in range(9):
            t = a1 - da0 - (a1 - a0 - 2 * da0) * i / 8; w.append((r0 * math.cos(t), r0 * math.sin(t)))
        wins.append(chaikin(w, 3))
    bolth = [circle(0.45, 16, 4.9 * math.cos(k * TAU / 6), 4.9 * math.sin(k * TAU / 6)) for k in range(6)]
    # carrier outer edge with matching half-moon notches
    outer = []
    for i in range(NB):
        a0 = i * TAU / NB
        for j in range(10):
            t = a0 + math.radians(4.0) + (TAU / NB - math.radians(8.0)) * j / 9
            outer.append(((RI - 0.12) * math.cos(t), (RI - 0.12) * math.sin(t)))
        ab = a0 + TAU / NB; c = pol(RB, ab)
        for j in range(7):
            t = ab - math.pi / 2 - math.pi * j / 6
            outer.append((c.x + 0.6 * math.cos(t), c.z + 0.6 * math.sin(t)))
    car = prism(outer, -0.3, 0.3, A + '__carrier', 'Y', holes=wins + bolth + [circle(3.3, 64)])
    finish(car, 0.08, 1, m=car_m)
    # floating buttons (bobbins) + wave washers
    bs = []
    for i in range(NB):
        c = pol(RB, (i + 1) * TAU / NB)
        b = spin([(0.001, -0.42), (0.78, -0.42), (0.78, -0.3), (0.6, -0.28), (0.6, 0.28), (0.78, 0.3), (0.78, 0.42), (0.001, 0.42)],
                 'btn', 'Z', tuple(c), 32)
        b.rotation_euler = (math.radians(-90), 0, 0); bs.append(b)
    bo = joinn(bs, A + '__float_buttons'); finish(bo, 0.03, 2, m=M('alu_satin'))
    # hub bolts
    hb = []
    for k in range(6):
        p = pol(4.9, k * TAU / 6, -0.55)
        hb.append(cyl(0.62, 0.5, tuple(p), RY, 32, 'bh'))
        hb.append(cyl(0.3, 0.2, tuple(p + V((0, -0.3, 0))), RY, 6, 'bh2'))
    hbo = joinn(hb, A + '__disc_bolts'); finish(hbo, 0.05, 2, m=zinc)
    # wheel hub stub behind (+Y)
    hub = spin([(1.0, 0.3), (5.8, 0.3), (5.8, 1.2), (4.2, 1.8), (3.6, 6.0), (1.0, 6.0), (1.0, 0.3)], A + '__hub', 'Z', (0, 0, 0), 96)
    hub.rotation_euler = (math.radians(-90), 0, 0); finish(hub, 0.12, 2, m=M('black_cast'))
    ax = cyl(1.0, 9.0, (0, 2.5, 0), RY, 48, A + '__axle'); finish(ax, 0.05, m=steel)
    an = cyl(1.4, 0.8, (0, -2.0, 0), RY, 6, A + '__axle_nut')
    finish(an, 0.08, 2, m=zinc)
    ax.location.y = 1.8; ax.scale.z = 1.0
    ax2 = cyl(1.0, 1.8, (0, -1.0, 0), RY, 48, '_ax'); finish(ax2, 0.05, m=steel); ax = joinn([ax, ax2], A + '__axle')

    # ---------- caliper (radial mount, 4 piston monoblock) ----------
    CA = math.radians(152); SPAN = math.radians(23)
    body = prism(chaikin(sector(12.4, 17.5, CA - SPAN, CA + SPAN, 24), 2), -2.55, 2.55, A + '__caliper', 'Y')
    finish(body, 0.32, 2, m=cal_m); body.modifiers.remove(body.modifiers['wn']) if 'wn' in body.modifiers else None
    apply_mods(body)
    slot = prism(sector(0.5, 16.55, CA - SPAN - 0.3, CA + SPAN + 0.3, 40), -0.95, 0.95, '_slot', 'Y')
    cutw(body, slot)
    win = prism(sector(15.9, 19.0, CA - math.radians(12), CA + math.radians(12), 24), -1.55, 1.55, '_win', 'Y')
    cutw(body, win)
    apply_mods(body)
    # side piston bulges (both halves)
    bul = []
    for s in (-1, 1):
        for k in (-1, 1):
            c = pol(14.7, CA + k * math.radians(10.5), s * 2.45)
            b = cyl(1.95, 1.1, tuple(c), RY, 48, 'bulge'); finish(b, 0.5, 4, m=cal_m); apply_mods(b); bul.append(b)
    body = joinn([body] + bul, A + '__caliper')
    finish(body, 0.06, 1)
    # radial mounting lugs on the inboard (+Y) half, bolt axes radial
    lugs = []; bolts = []
    for k in (-1, 1):
        a = CA + k * math.radians(17.5)
        c = pol(11.9, a, 1.55)
        lug = box((1.7, 1.9, 2.0), tuple(c), (0, -a + math.pi / 2, 0), 'lug'); lugs.append(lug)
        u = pol(1, a)
        hb_ = cyl(0.72, 0.65, tuple(pol(10.55, a, 1.55)), (0, 0, 0), 32, 'boltcap'); orient(hb_, tuple(pol(10.55, a, 1.55)), u)
        sk = cyl(0.35, 0.8, tuple(pol(10.3, a, 1.55)), (0, 0, 0), 6, '_sk'); orient(sk, tuple(pol(10.3, a, 1.55)), u)
        cutw(hb_, sk, fast=True)
        bolts.append(hb_)
    lj = joinn(lugs, A + '__caliper_lugs'); finish(lj, 0.3, 3, m=cal_m)
    bj = joinn(bolts, A + '__mount_bolts'); finish(bj, 0.06, 2, m=M('black_anod'))
    # pads (friction material + steel backing) visible through the window
    pads = []; backs = []
    for s in (-1, 1):
        pads.append(prism(sector(12.6, 16.25, CA - math.radians(14.5), CA + math.radians(14.5), 24), s * 0.27, s * 0.72, 'pad', 'Y'))
        backs.append(prism(sector(12.5, 16.5, CA - math.radians(15.5), CA + math.radians(15.5), 24), s * 0.72, s * 0.95, 'back', 'Y'))
    for o in pads + backs:
        if o.data.polygons[0].normal.y * 0 == 0: pass
    pj = joinn(pads, A + '__pads'); finish(pj, 0.06, 2, m=M('pad'))
    bk = joinn(backs, A + '__pad_backing'); finish(bk, 0.04, 2, m=M('steel_dark'))
    # pistons (visible through window edge)
    pis = []
    for s in (-1, 1):
        for k in (-1, 1):
            c = pol(14.6, CA + k * math.radians(10.5), s * 1.35)
            pis.append(cyl(1.55, 0.8, tuple(c), RY, 40, 'piston'))
    pij = joinn(pis, A + '__pistons'); finish(pij, 0.08, 2, m=M('chrome'))
    # pad retaining pin + R-clip + anti-rattle spring
    pin = rod(pol(16.75, CA, -2.9), pol(16.75, CA, 2.9), 0.22, A + '__pad_pin', M('steel'), 24); finish(pin, 0.03, 1)
    clip = tube([tuple(pol(16.75, CA, -3.0) + V((0, 0, 0))), tuple(pol(17.6, CA + 0.04, -3.05)), tuple(pol(17.9, CA + 0.14, -2.9)),
                 tuple(pol(17.2, CA + 0.16, -2.6))], 0.07, A + '__r_clip', M('steel'), sides=2)
    spr = prism(sector(16.55, 16.7, CA - math.radians(9), CA + math.radians(9), 16), -1.4, 1.4, A + '__antirattle_spring', 'Y')
    finish(spr, 0.03, 1, m=M('steel'))
    # bleed nipple (outboard half, upper end) with rubber cap
    ba = CA - math.radians(17); ub = pol(1, ba)
    p0 = pol(17.3, ba, -1.7)
    hx = cyl(0.42, 0.6, (0, 0, 0), (0, 0, 0), 6, 'bhex'); orient(hx, tuple(p0 + ub * 0.35), ub)
    nb = cyl(0.25, 0.8, (0, 0, 0), (0, 0, 0), 24, 'bnip'); orient(nb, tuple(p0 + ub * 1.0), ub)
    bl = joinn([hx, nb], A + '__bleed_nipple'); finish(bl, 0.04, 2, m=M('zinc'))
    cap = cyl(0.33, 0.6, (0, 0, 0), (0, 0, 0), 24, 'bcap'); orient(cap, tuple(p0 + ub * 1.5), ub); finish(cap, 0.12, 2, m=rub)
    nm(cap, A + '__bleed_cap')
    # banjo fitting on the upper end + hose
    bA = CA - math.radians(19.5); ua = pol(1, bA); ta = V((-math.sin(bA), 0, math.cos(bA)))
    bpos = pol(16.6, bA, 1.2)
    bjb = cyl(0.62, 1.3, (0, 0, 0), (0, 0, 0), 32, 'banjo'); orient(bjb, tuple(bpos), ta)
    bjh = cyl(0.62, 0.45, (0, 0, 0), (0, 0, 0), 6, 'banjohead'); orient(bjh, tuple(bpos - ta * 0.95), ta)
    bje = cyl(0.4, 1.6, (0, 0, 0), (0, 0, 0), 24, 'banjoeye'); orient(bje, tuple(bpos + ua * 0.9), ua)
    bjj = joinn([bjb, bjh, bje], A + '__banjo'); finish(bjj, 0.06, 2, m=M('zinc'))
    hstart = bpos + ua * 1.6
    hose = tube([tuple(hstart), tuple(hstart + ua * 3.5 + V((0, 0.4, 2.5))), tuple(V((-11.0, 2.6, 21.0))), tuple(V((-5.0, 3.2, 24.5)))],
                0.42, A + '__hose', mat('hose_braid', (0.07, 0.07, 0.075), 0.3, 0.32), res=16, sides=4)
    ferr = cyl(0.55, 1.6, (0, 0, 0), (0, 0, 0), 32, 'ferrule'); orient(ferr, tuple(hstart + ua * 0.6), ua)
    finish(ferr, 0.05, 2, m=M('chrome')); nm(ferr, A + '__hose_ferrule')
