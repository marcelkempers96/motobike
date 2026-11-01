"""Electric naked scrambler (generic mid-power EV idiom, no branding).
Wheelbase 145 cm, rake 25 deg, 19in front / 17in rear cast wheels with dual-sport tyres, seat height ~84 cm.
Steel trellis frame around a finned traction battery, mid-mounted PMSM with belt final drive."""
import sys, math
sys.path.insert(0, '/home/claude/mc/lib3d/parts')
import importlib, _bikekit; importlib.reload(_bikekit)
from _bikekit import *

META = {"title": "Electric scrambler", "category": "bike", "kind": "bike", "view": (40, 14)}

A = V((71.5, 0, 32.9))
RA = V((-73.5, 0, 32.1))
PIV = V((-25.0, 0, 37.5))
MC = V((-9.5, 0, 32.5))        # motor centre
RAKE, OFF = 25.0, 3.0
BELT_Y = -11.8

def build():
    init()
    body = paint('ev_body', (0.10, 0.20, 0.22), 0.38, 0.35)
    frame_m = paint('ev_frame', (0.025, 0.025, 0.028), 0.36, 0.3)
    rim_m = noisy_mat('ev_wheel', (0.05, 0.05, 0.055), 0.6, 0.32, 0.05, 200, 0.02)

    # ---------------- wheels
    fw = wheel(nm('wheels', 'front_wheel'), A, 19, 8.8, 11.0, 7.0, 'cast', 'dual', hub_w=10.0, rim_m=rim_m, cast_spokes=5)
    rw = wheel(nm('wheels', 'rear_wheel'), RA, 17, 10.5, 15.0, 10.5, 'cast', 'dual', hub_w=14.0, rim_m=rim_m, cast_spokes=5)
    axle(nm('wheels', 'rear_wheel', 'axle'), RA, 16.0)

    # ---------------- USD fork
    fk = fork(A, RAKE, OFF, 77.0, 10.0, 60.0, 72.0, usd=True, stan_r=2.25, outer_r=2.9, outer_len=46.0,
              stan_m=M['chrome'], slider_m=M['black_satin'], clamp_m=M['alu_dark'], cap_m=M['alu'], clamp_h=(4.2, 3.0))
    d, n, S, Lg = fk['d'], fk['n'], fk['S'], fk['Lg']
    hl, hh = fk['head_lo'], fk['head_hi']

    # ---------------- steel trellis frame
    upper = [hh + V((-0.5, -2.2, 0.0)), V((30.0, -10.0, 89.5)), V((18.0, -15.2, 84.5)), V((0.0, -15.2, 80.5)), V((-16.0, -15.2, 77.0)),
             V((-24.5, -14.6, 70.0)), V((-27.5, -13.8, 55.0)), V((-26.8, -13.2, 44.0)), V((-25.0, -13.0, 37.5))]
    lower = [hl + V((0.5, -2.2, -0.5)), V((37.5, -10.0, 78.0)), V((34.0, -15.2, 62.0)), V((31.0, -15.2, 46.0)), V((25.0, -14.9, 36.6)),
             V((5.0, -14.9, 35.8)), V((-14.0, -14.4, 36.4)), V((-24.0, -13.2, 37.8))]
    diag = []
    U = lambda x: V((x, -15.2, 84.5 + (x - 18) * 0.2)) if x > 0 else V((x, -15.2, 80.5 + x * 0.22))
    for a, b in ((22, 10), (10, -2), (-2, -12), (-12, -21)):
        pa = U(a) if a in (22, -2, -21) else V((a, -14.9, 36.0)); pb = U(b) if b in (22, -2, -21) else V((b, -14.9, 36.0))
        diag.append(([pa, pb], 1.0))
    fb, femit = tube_frame(nm('frame_body', 'frame', 'trellis'), [(upper, 1.3), (lower, 1.3)] + diag, m=frame_m, res=8)
    fb.cyl(hl - d * 0.4, hh + d * 0.4, 2.8, 32)
    fb.cyl(V((-24.5, -14.6, 70.0)), V((-24.5, 14.6, 70.0)), 1.1, 16)
    fb.cyl(V((25.0, -14.9, 36.6)), V((25.0, 14.9, 36.6)), 1.0, 16)
    fb.box(V((-27.0, 0, 70.0)), (4.0, 3.0, 3.0))
    for s in (-1, 1):
        fb.panel(smooth_outline([(-31.0, 31.5), (-19.5, 31.0), (-17.5, 43.5), (-24.0, 50.0), (-30.5, 46.0)], 3), s * 13.4 - 0.5, s * 13.4 + 0.5)
        fb.panel(smooth_outline([(-2.5, 28.0), (8.0, 31.0), (6.0, 38.5), (-3.0, 38.0)], 2), s * 12.6 - 0.4, s * 12.6 + 0.4)   # motor hangers
    femit(0.06)
    sf = MB()
    for s in (-1, 1):
        sf.sweep([V((-20.0, s * 14.9, 76.0)), V((-45.0, s * 9.8, 77.8)), V((-80.0, s * 7.2, 80.5))], r=1.0, n=14, res=6)
        sf.sweep([V((-27.6, s * 13.8, 53.0)), V((-50.0, s * 9.8, 66.0)), V((-74.0, s * 7.4, 79.6))], r=0.95, n=14, res=6)
    sf.cyl(V((-78, -7.3, 80.4)), V((-78, 7.3, 80.4)), 0.9, 12)
    sf.emit(nm('frame_body', 'subframe'), frame_m, 0.0)

    # ---------------- traction battery with cooling fins
    bt = MB()
    bt.loft_x([(-21.5, 60.5, 12.4, 14.6, 14.6, 9.0), (-20.5, 60.5, 12.5, 15.0, 15.0, 9.0), (27.0, 60.5, 12.5, 15.0, 15.0, 9.0),
               (31.5, 61.0, 12.0, 12.6, 13.0, 7.0), (33.0, 61.5, 11.0, 10.5, 11.0, 6.0)], n=56)
    bt.emit(nm('powertrain', 'traction_battery', 'case'), M['black_cast'], 0.3, 2)
    bf = MB()
    for s in (-1, 1):
        for k in range(8):
            z = 49.0 + k * 3.3; L = 46.0 - (2.0 if k in (0, 7) else 0)
            bf.box(V((3.5, s * 13.05, z)), (L, 1.3, 0.55))
        bf.box(V((3.5, s * 12.7, 46.4)), (49.0, 0.6, 1.4)); bf.box(V((3.5, s * 12.7, 74.4)), (49.0, 0.6, 1.4))
    for k in range(7):
        bf.box(V((32.6, -9 + k * 3.0, 61.0)), (1.6, 0.5, 20.0), roty(rad(-8)))
    bf.emit(nm('powertrain', 'traction_battery', 'cooling_fins'), M['alu'], 0.08, 2)
    bb = MB()
    for s in (-1, 1):
        for x in (-17, -3, 11, 25):
            for z in (47.6, 73.2): bb.cyl(V((x, s * 13.3, z)), V((x, s * 13.9, z)), 0.45, 6)
    bb.emit(nm('powertrain', 'traction_battery', 'bolts'), M['steel'])
    term = MB()
    for s in (-1, 1):
        term.cyl(V((-21.5, s * 4.0, 66.0)), V((-24.0, s * 4.0, 66.0)), 1.6, 20)
    term.box(V((-22.2, 0, 59.0)), (2.0, 6.0, 4.0))
    term.emit(nm('powertrain', 'traction_battery', 'hv_connectors'), [M['orange_hv']], 0.2)

    # ---------------- motor (PMSM), controller, DC-DC
    mo = MB()
    mo.lathe([(0, -10.4), (6.0, -10.4), (9.8, -10.0), (10.6, -9.0), (11.5, -8.4), (11.5, 8.4), (10.6, 9.0), (9.8, 10.0), (0, 10.2)], MC, Y, 72)
    mo.emit(nm('powertrain', 'motor', 'housing'), M['alu'], 0.25, 2)
    mf = MB()
    for k in range(30):
        a = TAU * k / 30; rho = X * math.cos(a) + Z * math.sin(a)
        mf.box(MC + rho * 12.0, (0.55, 16.0, 1.3), basis(-X * math.sin(a) + Z * math.cos(a), Y, rho))
    mf.emit(nm('powertrain', 'motor', 'cooling_fins'), M['alu'], 0.1, 2)
    mc = MB()
    mc.lathe([(0, -11.2), (7.0, -11.1), (8.2, -10.4)], MC, Y, 48)
    for k in range(8):
        a = TAU * k / 8; p = MC + (X * math.cos(a) + Z * math.sin(a)) * 9.0
        mc.cyl(p + Y * -10.3, p + Y * -11.0, 0.5, 6)
    mc.emit(nm('powertrain', 'motor', 'end_cover'), M['black_satin'], 0.1)
    tb = MB(); tbc = MC + V((-10.5, -2.5, 6.5))
    tb.box(tbc, (3.4, 9.0, 7.0))
    for k in range(3): tb.cyl(tbc + V((-1.6, -3.0 + k * 3.0, 1.5)), tbc + V((-3.0, -3.0 + k * 3.0, 2.2)), 1.0, 16)
    tb.emit(nm('powertrain', 'motor', 'terminal_box'), M['black_cast'], 0.25)
    ct = MB(); cc = V((-40.0, 0, 63.0)); Rr = roty(rad(-10))
    ct.box(cc, (15.0, 15.0, 6.5), Rr)
    for k in range(9): ct.box(cc + Rr @ V((0, -6.4 + k * 1.6, 4.0)), (14.0, 0.45, 2.0), Rr)
    for s in (-1, 1):
        for k in range(5): ct.box(cc + Rr @ V((-6.0 + k * 3.0, s * 8.1, 0)), (0.5, 1.4, 5.5), Rr)
    ct.emit(nm('powertrain', 'motor_controller'), M['alu_dark'], 0.1, 2)
    dd = MB(); dcc = V((-33.5, -9.8, 49.5))
    dd.box(dcc, (8.0, 3.2, 6.5))
    for k in range(5): dd.box(dcc + V((-3.2 + k * 1.6, -1.9, 0)), (0.4, 1.0, 6.0))
    dd.emit(nm('electrical', 'dc_dc_converter'), M['alu'], 0.08)
    ab = MB(); ab.box(V((-56.0, 0, 70.5)), (9.0, 8.0, 7.0))
    ab.emit(nm('electrical', 'aux_battery_12v'), M['plastic_black'], 0.3)

    # ---------------- belt final drive
    fp = MB(); fp.lathe([(2.0, -1.6), (6.6, -1.6), (6.6, -1.3), (6.0, -1.2), (6.0, 1.2), (6.6, 1.3), (6.6, 1.6), (2.0, 1.6)], MC + Y * BELT_Y, Y, 64, closed=True)
    fp.emit(nm('transmission', 'front_pulley'), M['steel'], 0.05)
    rp = MB(); rp.lathe([(5.0, -1.5), (13.6, -1.5), (13.6, 1.5), (5.0, 1.5)], RA + Y * BELT_Y, Y, 128, closed=True)
    for k in range(6):
        a = TAU * (k + 0.5) / 6; p = RA + (X * math.cos(a) + Z * math.sin(a)) * 9.0
        rp.cyl(p + Y * (BELT_Y - 1.55), p + Y * (BELT_Y + 1.55), 2.3, 24, mi=1)
    rp.lathe([(4.0, BELT_Y + 1.5), (5.4, BELT_Y + 1.5), (5.4, -7.0), (4.0, -7.0)], RA, Y, 48, closed=True)
    rp.emit(nm('transmission', 'rear_pulley'), [M['alu_dark'], M['black_satin']], 0.08)
    belt(nm('transmission', 'belt'), MC, 6.3, RA, 13.9, BELT_Y, 2.6, M['rubber'])
    bg = MB(); p0 = MC + V((-6.0, BELT_Y - 1.0, 8.0)); p1 = RA + V((10.0, BELT_Y - 1.0, 18.0))
    dv = (p1 - p0).normalized(); Rg = basis(dv, Y, V((-dv.z, 0, dv.x)))
    bg.box((p0 + p1) / 2, ((p1 - p0).length, 0.35, 4.0), Rg)
    bg.box((p0 + p1) / 2 + Rg @ V((0, 1.7, 2.0)), ((p1 - p0).length, 3.6, 0.35), Rg)
    bg.emit(nm('transmission', 'belt_guard'), M['plastic_black'], 0.1)

    # ---------------- swingarm + monoshock
    sa = MB()
    for s in (-1, 1):
        sa.sweep([V((PIV.x, s * 11.6, PIV.z)), V((-45.0, s * 13.6, 35.5)), V((-76.0, s * 15.0, 32.1))],
                 prof=rect_prof(1.0, 1.0, 0.3, 2), radii=[(2.8, 7.0), (2.8, 6.0), (2.6, 4.6)], res=6, up=Y)
        sa.panel(smooth_outline([(-79, 29.5), (-69, 29.0), (-69, 35.0), (-79, 35.0)], 3), s * 15.0 - 1.4, s * 15.0 + 1.4)
    sa.cyl(V((PIV.x, -11.6, PIV.z)), V((PIV.x, 11.6, PIV.z)), 2.6, 32)
    sa.sweep([V((-40.0, -13.2, 36.5)), V((-40.0, 0, 38.0)), V((-40.0, 13.2, 36.5))], prof=rect_prof(1.0, 1.0, 0.25, 2), radii=[(2.4, 4.0)] * 3, res=4, up=X)
    sa.box(V((-40.0, 0, 41.0)), (4.0, 4.0, 3.0))
    sa.emit(nm('chassis', 'swingarm'), frame_m, 0.2, 2)
    pv = MB(); pv.cyl(V((PIV.x, -14.6, PIV.z)), V((PIV.x, 14.6, PIV.z)), 1.0, 16)
    for s in (-1, 1): pv.cyl(V((PIV.x, s * 13.9, PIV.z)), V((PIV.x, s * 14.8, PIV.z)), 1.6, 6)
    pv.emit(nm('chassis', 'swingarm', 'pivot_bolt'), M['steel'], 0.05)
    shock(nm('chassis', 'rear_shock'), V((-40.0, 0, 42.0)), V((-27.0, 0, 70.0)), 2.1, 3.2, 0.66, 7.0, M['gold'], M['alu'],
          res_pt=V((-27.0, 0, 70.0)) + V((-1.5, -4.6, -12.0)) * 1.0, eye_len=3.0)

    # ---------------- brakes
    disc(nm('chassis', 'front_brake', 'disc'), A, 15.0, 11.0, -7.0, 0.5, holes=True, carrier_m=M['alu_dark'], arms=5, boss_to=-5.2)
    caliper(nm('chassis', 'front_brake', 'caliper'), A, 13.0, rad(150), -7.0, 0.5, (9.0, 4.6), mount=Lg(-1, 3.5) - n * 3.4 + Y * 2.0, m=M['alu_dark'], pistons=2)
    hose = MB(); cp = A + (X * math.cos(rad(150)) + Z * math.sin(rad(150))) * 15.4 + Y * -9.0
    hose.sweep([cp, Lg(-1, 14) - n * 4.0 + Y * 0.8, Lg(-1, 36) - n * 3.8 + Y * 0.6, S(58) + n * 4 + Y * -8, S(70) + n * 6.0 + Y * 2.0,
                V((30.0, 26.0, 106.0))], r=0.42, n=10, res=8)
    hose.emit(nm('chassis', 'front_brake', 'hose'), M['rubber'])
    disc(nm('chassis', 'rear_brake', 'disc'), RA, 11.5, 8.0, 9.0, 0.45, holes=True, carrier_m=M['alu_dark'], arms=5, boss_to=7.0)
    caliper(nm('chassis', 'rear_brake', 'caliper'), RA, 10.0, rad(215), 9.0, 0.45, (6.4, 3.8), mount=RA + V((-2.0, 12.0, -3.0)), m=M['alu_dark'], pistons=1)

    # ---------------- bodywork
    tc = MB()
    tc.loft_x([(-19.0, 79.0, 8.5, 3.0, 3.0, 3.0), (-12, 81.0, 12.4, 7.0, 4.5, 3.2), (4, 84.0, 13.4, 8.8, 6.5, 3.4), (20, 85.6, 12.8, 8.2, 7.6, 3.4),
               (31, 87.0, 10.0, 6.4, 7.0, 3.2), (36.5, 88.0, 5.5, 4.0, 4.4, 2.6), (38.0, 88.4, 2.0, 1.6, 1.6, 2.4)], n=56, res=4)
    tc.emit(nm('frame_body', 'tank_cover'), body)
    for s in (-1, 1):
        ol = smooth_outline([(31.5, 88.5), (34.0, 80.5), (31.5, 76.5), (22.0, 80.0), (16.0, 85.5)], 4)
        sheet(nm('frame_body', 'side_scoops', 'left' if s < 0 else 'right'), ol, V((0, s * 13.6, 0)), X, Z, Y * s, 0.4, body,
              (lambda s: (lambda p: V((p.x, p.y - s * 0.012 * (p.z - 83.0) ** 2, p.z))))(s), bevel=0.12)
    se = MB()
    se.loft_x([(-15.5, 81.0, 6.5, 2.0, 2.0, 3.0), (-21, 80.6, 11.6, 3.2, 3.0, 4.0), (-38, 80.8, 12.2, 3.4, 3.2, 4.5), (-58, 81.4, 10.6, 3.2, 3.0, 4.5),
               (-68, 82.0, 9.0, 3.0, 3.0, 4.0), (-71, 82.4, 7.0, 2.6, 2.6, 3.5)], n=48, res=4)
    se.emit(nm('frame_body', 'seat'), M['vinyl'])
    tl_ = MB()
    tl_.loft_x([(-66.0, 80.8, 9.6, 4.5, 2.5, 3.5), (-74, 81.4, 9.4, 6.4, 2.6, 3.6), (-82, 82.0, 8.6, 6.6, 2.6, 3.6), (-88, 82.4, 7.0, 5.6, 2.4, 3.2),
                (-91.5, 82.6, 4.0, 4.0, 2.0, 2.6)], n=48, res=4)
    tl_.emit(nm('frame_body', 'tail_cowl'), body)
    fender(nm('frame_body', 'front_mudguard'), A, fw['R'] + 1.6, 13.0, 28, 172, 1.4, 0.3, M['plastic_black'])
    fs = MB()
    for s in (-1, 1):
        th = rad(112); p = A + (X * math.cos(th) + Z * math.sin(th)) * (fw['R'] + 2.4) + Y * s * 6.6
        fs.sweep([p, Lg(s, 7.0) + Y * -s * 2.6 + n * 0.0], prof=rect_prof(1.2, 2.6, 0.3, 2), res=2, up=d)
    fs.emit(nm('frame_body', 'front_mudguard', 'brackets'), M['alu_dark'], 0.1)
    hug = MB(); hug.lathe([(rw['R'] + 1.8, -8.5), (rw['R'] + 3.2, -7.0), (rw['R'] + 3.6, 0), (rw['R'] + 3.2, 7.0), (rw['R'] + 1.8, 8.5),
                           (rw['R'] + 2.1, 8.5), (rw['R'] + 3.5, 7.0), (rw['R'] + 3.9, 0), (rw['R'] + 3.5, -7.0), (rw['R'] + 2.1, -8.5)],
                          RA, Y, 48, closed=True, a0=rad(62), a1=rad(128), u=X, w=Z)
    for s in (-1, 1):
        hug.sweep([V((-58.0, s * 13.4, 37.0)), V((-60.0, s * 11.5, 55.0)), V((-62.0, s * 8.6, 64.5))], prof=rect_prof(2.4, 0.6, 0.2, 2), res=4, up=Y)
    hug.emit(nm('frame_body', 'rear_hugger'), M['plastic_black'], 0.1)
    lpb = MB(); lpb.sweep([V((-84.0, 0, 79.0)), V((-94.0, 0, 70.0)), V((-97.0, 0, 64.0))], prof=rect_prof(8.0, 0.6, 0.3, 2), res=4, up=Y)
    lpb.box(V((-98.0, 0, 57.5)), (0.5, 17.0, 11.0), roty(rad(-12)))
    lpb.emit(nm('frame_body', 'number_plate_bracket'), M['plastic_black'], 0.1)

    # ---------------- electrical: lights, dash, charge port
    hc = Lg(0, 49.0) + n * 9.0
    hb = MB(); ax = (n * 1.0 - d * 0.05).normalized()
    hprof = [(-1.0, -0.45), (-0.55, -1.0), (0.55, -1.0), (1.0, -0.45), (1.0, 0.35), (0.62, 0.95), (-0.62, 0.95), (-1.0, 0.35)]
    hb.sweep([hc - ax * 7.5, hc - ax * 3.0, hc], prof=hprof, radii=[(6.0, 5.0), (8.6, 7.2), (9.4, 7.8)], res=3, up=Y, smooth_path=False)
    hb.emit(nm('electrical', 'headlight', 'housing'), M['black_satin'], 0.25, 2)
    lb = MB(); lb.sweep([hc - ax * 0.4, hc + ax * 0.5], prof=hprof, radii=[(9.0, 7.4), (8.8, 7.2)], res=1, up=Y, smooth_path=False)
    lb.emit(nm('electrical', 'headlight', 'lens'), M['glass'])
    led = MB()
    pj = MB()
    for s in (-1, 1):
        pj.lathe([(0, 0), (2.6, 0), (2.8, -0.6), (2.8, -3.0)], hc + Y * s * 3.6 - ax * 0.6, ax, 32)
        pj.lathe([(0, 0.25), (2.4, 0.0)], hc + Y * s * 3.6 - ax * 0.6, ax, 32, mi=1)
        led.box(hc + Y * s * 7.4 - ax * 0.7, (1.0, 0.7, 9.0), basis(Y, ax, Z))
    led.box(hc + Z * -6.6 - ax * 0.7, (11.0, 0.7, 0.8), basis(Y, ax, Z))
    pj.emit(nm('electrical', 'headlight', 'projectors'), [M['chrome'], M['led']])
    led.emit(nm('electrical', 'headlight', 'drl'), M['led'])
    br = MB()
    for s in (-1, 1):
        a0 = hc - ax * 5.5 + Y * s * 6.5; a1 = Lg(s, 51.0) + Y * -s * 2.8
        br.sweep([a0, (a0 + a1) / 2 + Y * s * 0.6, a1], prof=rect_prof(0.6, 3.0, 0.2, 2), res=4, up=Y)
    br.emit(nm('electrical', 'headlight', 'brackets'), M['alu_dark'], 0.06)
    top = fk['top']
    bc = MB()
    for s in (-1, 1):
        bc.cyl(top + Y * s * 3.4, top + Y * s * 3.4 + d * 3.6, 1.8, 24)
    bc.emit(nm('chassis', 'handlebar', 'risers'), M['alu_dark'], 0.08)
    handlebar(nm('chassis', 'handlebar'), top + d * 4.4, 82, 7.5, 8.0, r=1.4, bar_m=M['black_satin'], mirrors=True)
    dsh = MB(); dn = V((-0.55, 0, 0.84)).normalized(); dctr = top + n * 6.5 + d * 9.5
    Rd = frame_from(dn, Y)
    dsh.box(dctr, (12.0, 9.0, 2.6), Rd @ Mx.Rotation(rad(90), 3, 'Z'))
    dsh.cyl(dctr - dn * 1.0, top + n * 2.0 + d * 1.0, 0.9, 12)
    dsh.emit(nm('electrical', 'tft_dash'), M['black_satin'], 0.4, 2)
    scr = MB(); scr.box(dctr + dn * 1.32, (10.4, 7.2, 0.1), Rd @ Mx.Rotation(rad(90), 3, 'Z'))
    scr.emit(nm('electrical', 'tft_dash', 'screen'), M['screen'])
    # indicators
    ind = MB(); lens = MB()
    for s in (-1, 1):
        for base, dx in ((hc - ax * 6.0 + Y * s * 11.5 + Z * 1.0, 1), (V((-90.0, s * 9.5, 74.0)), -1)):
            ind.cyl(base - Y * s * 3.0, base, 0.5, 12)
            ind.box(base + X * dx * 0.2, (2.4, 1.4, 1.2))
            lens.box(base + X * dx * 1.5, (0.4, 1.4, 1.1))
    ind.emit(nm('electrical', 'indicators'), M['black_satin'], 0.2)
    lens.emit(nm('electrical', 'indicators', 'lenses'), M['lens_amber'], 0.05)
    tll = MB(); tll.sweep([V((-91.4, -3.6, 82.0)), V((-92.0, 0, 82.4)), V((-91.4, 3.6, 82.0))], prof=rect_prof(1.4, 1.2, 0.3, 2), res=4, up=X)
    tll.emit(nm('electrical', 'tail_light'), M['lens_red'], 0.05)
    # charge port: open flap on the left of the tank cover
    port_c = V((22.0, -12.55, 89.0))
    cp = MB(); cp.lathe([(0, 0), (2.4, 0), (2.6, 0.6), (3.2, 0.7), (3.2, 1.0), (0, 1.0)], port_c, -Y, 40)
    for k in range(5):
        a = TAU * k / 5; cp.cyl(port_c + V((1.2 * math.cos(a), -0.95, 1.2 * math.sin(a))), port_c + V((1.2 * math.cos(a), -1.05, 1.2 * math.sin(a))), 0.38, 10, mi=1)
    cp.emit(nm('electrical', 'charge_port'), [M['plastic_black'], M['orange_hv']], 0.05)
    fl = MB(); hinge = port_c + V((3.6, -0.9, 0))
    Rf = Mx.Rotation(rad(-70), 3, 'Z')
    fl.plate(hinge + Rf @ V((-3.5, 0, 0)), Rf @ basis(X, Z, -Y), 3.4, 3.2, 0.4, 3.0, 32)
    fl.cyl(hinge - Z * 2.0, hinge + Z * 2.0, 0.35, 10)
    fl.emit(nm('electrical', 'charge_port', 'flap'), body, 0.1)

    # ---------------- wiring
    hv = MB()
    for s in (-1, 1):
        hv.sweep([V((-24.0, s * 4.0, 66.0)), V((-28.0, s * 4.0, 66.5)), V((-31.5, s * 4.0, 65.5)), V((-33.0, s * 4.0, 64.5))], r=0.95, n=14, res=6)
    hv.sweep([V((-22.0, -3.2, 60.0)), V((-27.0, -8.0, 55.0)), V((-31.0, -9.8, 52.0))], r=0.55, n=10, res=6)
    hv.sweep([port_c + V((0, 1.0, 0)), port_c + V((-2.0, 4.0, -4.0)), V((18.0, -6.0, 76.0))], r=0.6, n=10, res=6)
    hv.emit(nm('wiring', 'hv_cables'), M['orange_hv'])
    ph = MB()
    for k, yy in enumerate((-4.2, -6.0, -7.8)):
        ph.sweep([V((-35.0, yy + 2.0, 59.0)), V((-33.0, yy, 56.0)), V((-24.0, yy - 0.6, 46.0)), tbc + V((-3.0, -3.0 + (2 - k) * 3.0, 2.2))],
                 r=0.75, n=12, res=6)
    ph.emit(nm('wiring', 'hv_cables', 'phase'), M['orange_hv'])
    gl = MB()
    for p in (V((-35.0, -4.2 + 2.0, 59.2)), V((-35.0, -6.0 + 2.0, 59.2)), V((-35.0, -7.8 + 2.0, 59.2))):
        gl.cyl(p + Z * 0.5, p + Z * -1.2, 1.15, 16)
    gl.emit(nm('wiring', 'hv_cables', 'glands'), M['plastic_black'], 0.05)
    lv = MB()
    lv.sweep([dcc + V((2.0, -1.0, 3.0)), V((-27.0, -12.6, 57.0)), V((-25.5, -13.4, 69.0)), V((-14.0, -13.6, 76.5)), V((2.0, -13.6, 79.2)),
              V((18.0, -13.6, 82.4)), V((30.5, -9.0, 87.4)), V((38.0, -3.6, 88.5)), hc - ax * 7.5 + V((0, -1.5, 1.0))], r=0.5, n=10, res=8)
    lv.sweep([V((-25.5, -13.4, 69.0)), V((-45.0, -8.6, 76.0)), V((-56.0, -3.0, 74.5))], r=0.45, n=10, res=6)
    lv.sweep([V((-45.0, -8.6, 76.0)), V((-80.0, -6.0, 79.2)), V((-89.0, -3.0, 80.0))], r=0.4, n=8, res=6)
    lv.sweep([V((38.0, -3.6, 88.5)), top + V((-2.0, -4.0, 4.0)), dctr - dn * 1.0 + Y * -2.0], r=0.4, n=8, res=6)
    lv.emit(nm('wiring', 'harness_lv'), M['wire_black'])
    cl = MB()
    for p in (V((-14.0, -13.6, 76.5)), V((2.0, -13.6, 79.2)), V((18.0, -13.6, 82.4))):
        cl.cyl(p - X * 0.3, p + X * 0.3, 1.0, 10)
    cl.emit(nm('wiring', 'harness_lv', 'clips'), M['plastic_black'])

    footpegs(nm('chassis', 'footpegs'), V((-17.0, 12.5, 36.0)), m=M['alu_dark'])
    ss = MB(); ss.sweep([V((-12.0, -14.6, 36.5)), V((-22.0, -16.5, 31.0)), V((-34.0, -17.2, 29.5))], r=0.9, n=12, res=4)
    ss.box(V((-34.5, -17.4, 28.8)), (3.0, 2.4, 0.6))
    ss.emit(nm('chassis', 'side_stand'), frame_m, 0.08)
    rbp = MB(); rbp.sweep([V((-18.0, 14.0, 40.0)), V((-8.0, 15.5, 37.0)), V((2.0, 16.0, 34.5))], prof=rect_prof(1.6, 0.8, 0.3, 2), res=6, up=Y)
    rbp.cyl(V((2.0, 15.5, 34.6)), V((2.0, 19.0, 34.6)), 1.0, 12)
    rbp.emit(nm('chassis', 'rear_brake', 'pedal'), M['alu_dark'], 0.05)
