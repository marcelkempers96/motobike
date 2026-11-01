"""Two-stroke 250 motocross bike (generic modern European MX idiom).
Wheelbase 148.5 cm, rake 26.5 deg, 21in front / 19in rear, seat height ~95 cm, USD fork, linkage monoshock."""
import sys, math
sys.path.insert(0, '/home/claude/mc/lib3d/parts')
import importlib, _bikekit; importlib.reload(_bikekit)
from _bikekit import *

META = {"title": "Two-stroke motocross bike", "category": "bike", "kind": "bike", "view": (40, 14)}

A = V((74.0, 0, 34.67))
RA = V((-74.5, 0, 34.0))
PIV = V((-15.5, 0, 45.5))
CRANK = V((2.0, 0, 42.0))
RAKE, OFF = 26.5, 2.2
CHAIN_Y = -9.0
FS = V((-8.5, 0, 43.5))      # front sprocket (gearbox output)

def build():
    init()
    red = paint('mx_red', (0.78, 0.02, 0.015), 0.32, 0.25)
    white = paint('mx_white', (0.93, 0.93, 0.92), 0.35, 0.2)
    black_rim = noisy_mat('rim_black', (0.02, 0.02, 0.022), 1.0, 0.3, 0.05, 200, 0.02)
    yellow = paint('rimlock_yellow', (0.95, 0.72, 0.02), 0.3, 0.3)
    frame_m = M['alu_frame']

    # ---------------- wheels
    fw = wheel(nm('wheels', 'front_wheel'), A, 21, 8.0, 8.4, 4.6, 'spoked', 'knobby', 36, hub_w=10.0, rim_m=black_rim, hub_m=M['alu'],
               spoke_m=M['steel'], flange_r=4.6, hub_r=4.0, rimlock_m=yellow)
    rw = wheel(nm('wheels', 'rear_wheel'), RA, 19, 9.9, 11.0, 6.0, 'spoked', 'knobby', 36, hub_w=12.0, rim_m=black_rim, hub_m=M['alu'],
               spoke_m=M['steel'], flange_r=5.4, hub_r=4.6, rimlock_m=yellow)
    axle(nm('wheels', 'rear_wheel', 'axle'), RA, 13.8)

    # ---------------- USD fork
    fk = fork(A, RAKE, OFF, 84.0, 10.3, 65.5, 80.0, usd=True, stan_r=2.4, outer_r=2.95, outer_len=50.0,
              stan_m=M['kashima'], slider_m=M['gold'], clamp_m=M['alu'], cap_m=M['alu_dark'], guard_m=M['plastic_black'], clamp_h=(4.6, 3.2))
    d, n, S, Lg = fk['d'], fk['n'], fk['S'], fk['Lg']
    hl, hh = fk['head_lo'], fk['head_hi']

    # ---------------- aluminium twin-spar frame
    fb = MB()
    fb.cyl(hl - d * 0.3, hh + d * 0.3, 3.0, 32)
    spar = [hh + V((-1.0, -2.6, -1.0)), V((24.0, -9.8, 98.5)), V((6.0, -12.3, 91.0)), V((-8.0, -12.0, 80.0)), V((-14.5, -11.6, 66.0)),
            V((-16.0, -11.0, 54.0)), V((-15.5, -10.6, 44.0))]
    rad_ = [(3.0, 7.5), (3.0, 7.0), (3.0, 6.4), (3.0, 6.4), (3.0, 7.0), (3.2, 8.0), (3.2, 9.0)]
    for s in (-1, 1):
        pts = [p if s < 0 else ym(p) for p in spar]
        fb.sweep(pts, prof=rect_prof(1.0, 1.0, 0.18, 2), radii=rad_, res=8, up=Y)
        # pivot boss and lower engine mount web
        fb.cyl(V((PIV.x, s * 9.2, PIV.z)), V((PIV.x, s * 12.6, PIV.z)), 3.3, 32)
        fb.panel(smooth_outline([(-19, 40), (-11, 39.5), (-9.5, 50), (-13, 60), (-19, 56)], 3), s * 10.6 - 0.6, s * 10.6 + 0.6)
    # downtube (single cast/extruded) with engine mount
    down = [hl + V((0.5, 0, 1.0)), V((37.0, 0, 82.0)), V((32.5, 0, 62.0)), V((28.0, 0, 46.0))]
    fb.sweep(down, prof=rect_prof(1.0, 1.0, 0.25, 2), radii=[(4.0, 4.4), (3.6, 4.0), (3.2, 3.6), (3.2, 3.6)], res=8, up=Y)
    for s in (-1, 1): fb.panel([(24.0, 41), (30.0, 43), (30.0, 49), (22, 50)], s * 4.0 - 0.35, s * 4.0 + 0.35)
    fb.cyl(V((-15.0, -11, 80.0)), V((-15.0, 11, 80.0)), 1.6, 16)      # shock top cross-member
    for s in (-1, 1): fb.panel([(-19.5, 78), (-13, 77.5), (-12.5, 83), (-19, 84)], s * 2.2 - 0.4, s * 2.2 + 0.4)
    fb.emit(nm('frame_body', 'frame', 'main_spars'), frame_m, 0.25, 2)
    sf = MB()
    for s in (-1, 1):
        sf.sweep([V((-6.0, s * 10.8, 84.5)), V((-35, s * 9.2, 86.0)), V((-70, s * 7.8, 88.5))], r=1.25, n=16, res=6)
        sf.sweep([V((-15.5, s * 11.0, 58.0)), V((-40, s * 9.6, 72.0)), V((-66, s * 8.2, 87.8))], r=1.1, n=16, res=6)
    sf.cyl(V((-66, -8.2, 88.0)), V((-66, 8.2, 88.0)), 1.0, 12)
    sf.emit(nm('frame_body', 'subframe'), M['alu_brushed'], 0.0)

    # ---------------- two-stroke engine
    dc = V((math.sin(rad(8)), 0, math.cos(rad(8)))); ncf = V((math.cos(rad(8)), 0, -math.sin(rad(8))))
    Rc = basis(ncf, Y, dc)
    cc = MB()
    cc.loft_x([(-14.5, 44.5, 6.5, 6.0, 6.0, 3.0), (-10, 43.0, 8.0, 9.0, 8.0, 3.5), (-2, 42.0, 8.6, 10.5, 8.6, 3.6), (8, 42.0, 8.4, 9.5, 8.4, 3.6),
               (14, 42.5, 7.0, 7.0, 7.0, 3.2), (16.5, 42.5, 3.5, 4.0, 4.0, 2.6)], n=44, res=3)
    cc.emit(nm('powertrain', 'engine', 'crankcase'), M['alu_dark'], 0.35, 2)
    cv = MB()
    cv.lathe([(0, -12.0), (4.0, -11.9), (6.0, -11.2), (6.8, -9.6), (6.8, -7.5)], CRANK + V((0, 0, -0.5)), Y, 64)
    cv.emit(nm('electrical', 'stator', 'ignition_cover'), M['alu_dark'], 0.2, 2)
    cl = MB(); cl.lathe([(0, 12.6), (5.5, 12.5), (8.0, 11.6), (9.0, 9.6), (9.0, 7.5)], V((-4.0, 0, 41.5)), Y, 64)
    cl.lathe([(0, 11.5), (3.0, 11.4), (3.6, 10.5), (3.6, 8.0)], CRANK + V((9.0, 0, -4.0)), Y, 40)
    cl.emit(nm('powertrain', 'clutch', 'cover'), M['alu_dark'], 0.2, 2)
    scr = MB()
    for k in range(8):
        a = TAU * k / 8
        scr.cyl(CRANK + V((6.2 * math.cos(a), -10.0, -0.5 + 6.2 * math.sin(a))), CRANK + V((6.2 * math.cos(a), -10.6, -0.5 + 6.2 * math.sin(a))), 0.35, 6)
    scr.emit(nm('powertrain', 'engine', 'cover_screws'), M['steel'])
    cy = MB()
    cy.plate(CRANK + dc * 15.5, Rc, 6.4, 6.6, 13.0, 3.6, 40)
    cy.plate(CRANK + dc * 9.6, Rc, 7.0, 7.4, 1.4, 3.6, 40)
    # exhaust port flange and power-valve housing (left)
    cy.cyl(CRANK + dc * 15.5 + ncf * 5.0, CRANK + dc * 15.5 + ncf * 8.4, 3.2, 32)
    cy.box(CRANK + dc * 17.0 + ncf * 3.2 + Y * -6.6, (6.5, 2.4, 5.0), Rc)
    cy.cyl(CRANK + dc * 17.0 + ncf * 3.2 + Y * -7.5, CRANK + dc * 17.0 + ncf * 3.2 + Y * -9.0, 2.0, 24)
    cy.emit(nm('powertrain', 'engine', 'cylinder'), M['black_cast'], 0.3, 2)
    hd = MB()
    hd.plate(CRANK + dc * 23.6, Rc, 6.2, 6.4, 3.4, 3.6, 40)
    hd.lathe([(0, 26.4), (3.0, 26.2), (5.2, 25.6), (5.9, 25.0)], CRANK, dc, 48)
    for k in range(10):
        a = TAU * k / 10; p = CRANK + dc * 25.4 + Rc @ V((4.4 * math.cos(a), 4.4 * math.sin(a), 0))
        hd.box(p, (4.0, 0.3, 1.4), Rc @ Mx.Rotation(a, 3, 'Z'))
    hd.emit(nm('powertrain', 'engine', 'cylinder_head'), M['alu'], 0.12, 2)
    hb = MB()
    for k in range(8):
        a = TAU * (k + 0.5) / 8; p = CRANK + dc * 25.4 + Rc @ V((5.6 * math.cos(a), 5.6 * math.sin(a), 0))
        hb.cyl(p, p + dc * 0.8, 0.45, 6)
    hb.emit(nm('powertrain', 'engine', 'head_bolts'), M['steel'])
    pl = MB(); pl.cyl(CRANK + dc * 26.3, CRANK + dc * 27.4, 0.75, 6)
    pl.emit(nm('electrical', 'spark_plug'), M['steel'], 0.05)
    pc = MB(); pc.sweep([CRANK + dc * 27.2, CRANK + dc * 30.0 - ncf * 0.6, CRANK + dc * 31.5 - ncf * 3.5], r=1.0, n=16, res=6)
    pc.emit(nm('electrical', 'spark_plug', 'cap'), M['rubber'])
    # reed block, carburettor, intake boot, airbox
    ib = MB(); cb = MB()
    reed = CRANK + dc * 11.5 - ncf * 6.8
    cdir = V((-0.9, 0, 0.42)).normalized()
    ib.cyl(reed, reed + cdir * 2.4, 3.0, 24)
    c0 = reed + cdir * 2.4; c1 = c0 + cdir * 7.5
    cb.cyl(c0, c1, 3.0, 32)
    cb.lathe([(0, -6.2), (2.8, -6.2), (3.2, -5.0), (3.0, -3.0)], (c0 + c1) / 2, Z, 32)
    cb.lathe([(1.6, 2.4), (2.4, 2.6), (2.4, 5.6), (1.6, 6.0), (0, 6.0)], (c0 + c1) / 2, Z, 32)
    cb.box((c0 + c1) / 2 + Y * 3.2, (3.0, 1.0, 3.0))
    cb.emit(nm('powertrain', 'intake', 'carburettor'), M['alu'], 0.15, 2)
    ib.sweep([c1, c1 + cdir * 3.0 + Y * 2.0, V((-22.0, 6.5, 68.0)), V((-26.5, 6.5, 70.0))], r=2.6, n=20, res=6)
    ib.emit(nm('powertrain', 'intake', 'boot_and_reed'), M['rubber'], 0.1)
    ab = MB(); ab.box(V((-38, 0, 75.5)), (24, 15, 19)); ab.box(V((-26.5, 0, 72)), (4, 13, 10))
    ab.emit(nm('frame_body', 'airbox'), M['plastic_black'], 1.2, 3)
    # coolant: radiators, hoses
    rc = MB(); rt = MB(); hs = MB()
    for s in (-1, 1):
        R = Mx.Rotation(rad(-8 * s), 3, 'Z') @ basis(X, Y, Z)
        R = R @ roty(rad(-12))
        c = V((22.5, s * 8.6, 79.0))
        rc.box(c, (13.0, 3.2, 25.0), R)
        rt.box(c + R @ V((0, 0, 13.4)), (13.6, 3.8, 2.2), R); rt.box(c + R @ V((0, 0, -13.4)), (13.6, 3.8, 2.2), R)
        rt.box(c + R @ V((-7.0, 0, 0)), (1.2, 3.8, 28.0), R); rt.box(c + R @ V((7.0, 0, 0)), (1.2, 3.8, 28.0), R)
        top = c + R @ V((-4.0, -s * 1.4, 13.6)); bot = c + R @ V((-4.0, -s * 1.4, -13.6))
        hs.sweep([top, top + V((-3, -s * 2.5, 2.0)), CRANK + dc * 24.0 + Y * s * 3.0 + ncf * 2.0], r=1.15, n=14, res=6)
        hs.sweep([bot, bot + V((-3, -s * 1.5, -3.0)), CRANK + V((10.0, s * 6.0, 2.0))], r=1.15, n=14, res=6)
    rc.emit(nm('powertrain', 'cooling', 'radiator_cores'), M['radiator'], 0.0)
    rt.emit(nm('powertrain', 'cooling', 'radiator_tanks'), M['alu'], 0.2, 2)
    hs.emit(nm('powertrain', 'cooling', 'hoses'), M['rubber'])
    # expansion chamber (right side, curls forward then back) and silencer
    port = CRANK + dc * 15.5 + ncf * 8.4
    ep = [port, port + ncf * 4.0 + Y * 0.4, V((22.5, 1.6, 53.0)), V((27.5, 3.6, 44.0)), V((26.5, 6.8, 35.0)), V((18.0, 10.4, 30.8)),
          V((5.0, 13.4, 32.0)), V((-6.0, 15.6, 41.0)), V((-16.0, 16.4, 53.0)), V((-26.0, 15.8, 62.0)), V((-34.0, 15.4, 67.5))]
    er = [2.0, 2.3, 2.9, 3.8, 4.8, 5.4, 5.6, 5.2, 4.0, 2.4, 1.6]
    ex = MB(); ex.sweep(ep, r=1.0, radii=er, n=32, res=10)
    for t, p in ((2, ep[2]), (8, ep[8])):
        pass
    ex.emit(nm('powertrain', 'exhaust', 'expansion_chamber'), M['bronze'])
    sl = MB(); s0 = V((-35.5, 15.4, 68.4)); s1 = V((-74.0, 13.8, 86.0)); dv = (s1 - s0).normalized(); Ls = (s1 - s0).length
    sl.lathe([(1.5, -2.5), (1.6, 0), (2.4, 2.0), (4.4, 6.0), (4.6, Ls - 4.0), (4.2, Ls - 1.0), (1.2, Ls - 0.4), (1.2, Ls + 1.2), (0.9, Ls + 1.2), (0.9, Ls - 1.0)], s0, dv, 48)
    sl.emit(nm('powertrain', 'exhaust', 'silencer'), M['alu_brushed'], 0.06)
    sk = MB()
    for t in (4.0, Ls - 2.5):
        sk.lathe([(4.65, t - 0.6), (4.75, t), (4.65, t + 0.6)], s0, dv, 48)
    sk.lathe([(4.7, 5.0), (4.7, Ls - 3.0), (4.72, Ls - 3.0)], s0, dv, 48, a0=rad(60), a1=rad(160), u=-Z, w=Y)
    sk.emit(nm('powertrain', 'exhaust', 'silencer_bands'), M['black_satin'])
    spr = MB()
    for p in (ep[2], ep[7]):
        spr.box(p + V((0, 0, 5.0)), (1.2, 0.6, 2.0))
    spr.emit(nm('powertrain', 'exhaust', 'mount_springs'), M['steel'])
    # skid plate
    skp = MB(); ushell(skp, [(-12.0, 37.0, 9.0, 1.0), (0, 34.0, 9.5, 2.0), (14, 34.0, 9.5, 2.0), (24, 40.0, 7.0, 1.0)], n=14, thick=0.5)
    skp.box(V((-12, 0, 33.0)), (3, 16, 0.5))
    skp.emit(nm('frame_body', 'skid_plate'), M['plastic_black'], 0.0)

    # ---------------- transmission
    fsk, frp = sprocket(nm('transmission', 'front_sprocket'), FS, 13, CHAIN_Y)
    rsk, rrp = sprocket(nm('transmission', 'rear_sprocket'), RA, 50, CHAIN_Y, m=M['alu_dark'], holes=6, inner=5.0)
    chain(nm('transmission', 'chain'), FS, frp + 0.15, RA, rrp + 0.15, CHAIN_Y, plate_m=M['steel_dark'], roller_m=M['brass'])
    cg = MB()
    cg.sweep([V((-60.0, CHAIN_Y, 22.5)), V((-50, CHAIN_Y, 26.5))], prof=rect_prof(3.6, 3.0, 0.4, 2), res=2, up=Y)
    cg.panel([(-60, 22.0), (-50, 25.5), (-49.5, 35.5), (-56, 34.0)], CHAIN_Y - 2.6, CHAIN_Y - 2.0)
    cg.emit(nm('transmission', 'chain_guide'), M['plastic_black'], 0.15)
    csl = MB(); csl.sweep([V((-12.0, -9.5, 49.0)), V((-24, -10.4, 48.3)), V((-34, -11.0, 47.0))], prof=rect_prof(2.6, 1.0, 0.3, 2), res=4, up=Y)
    csl.emit(nm('transmission', 'chain_slider'), M['plastic_black'], 0.0)
    scv = MB(); scv.lathe([(0, -12.0), (3.5, -11.9), (5.0, -11.2), (5.4, -9.8)], FS + V((0.5, 0, 0.5)), Y, 40)
    scv.emit(nm('transmission', 'sprocket_cover'), M['alu_dark'], 0.1)
    gl = MB(); gl.sweep([V((-8.0, -11.8, 47.5)), V((-2.0, -13.5, 44.0)), V((5.5, -14.0, 40.5))], r=0.65, n=10, res=6)
    gl.cyl(V((5.5, -13.5, 40.5)), V((5.5, -17.0, 40.5)), 0.85, 6)
    gl.emit(nm('transmission', 'gear_lever'), M['steel'], 0.05)

    # ---------------- swingarm and linkage monoshock
    sa = MB()
    for s in (-1, 1):
        sa.sweep([V((PIV.x, s * 10.6, PIV.z)), V((-30, s * 11.6, 43.0)), V((-55, s * 12.6, 38.0)), V((-75.5, s * 12.9, 34.0))],
                 prof=rect_prof(1.0, 1.0, 0.25, 2), radii=[(3.2, 8.4), (3.2, 7.6), (3.0, 6.0), (2.8, 5.0)], res=6, up=Y)
        sa.panel(smooth_outline([(-79, 31), (-70, 30.5), (-70, 37.5), (-79, 37.5)], 3), s * 12.9 - 1.6, s * 12.9 + 1.6)
    sa.cyl(V((PIV.x, -10.6, PIV.z)), V((PIV.x, 10.6, PIV.z)), 3.0, 32)
    sa.sweep([V((-44, -11.6, 40.0)), V((-44, 0, 41.5)), V((-44, 11.6, 40.0))], prof=rect_prof(1.0, 1.0, 0.25, 2), radii=[(2.4, 4.0)] * 3, res=4, up=X)
    sa.box(V((-31.5, 0, 39.0)), (5.0, 7.0, 3.0))
    sa.emit(nm('chassis', 'swingarm'), M['alu_frame'], 0.25, 2)
    pv = MB(); pv.cyl(V((PIV.x, -13.4, PIV.z)), V((PIV.x, 13.4, PIV.z)), 1.0, 16)
    for s in (-1, 1): pv.cyl(V((PIV.x, s * 12.8, PIV.z)), V((PIV.x, s * 13.6, PIV.z)), 1.6, 6)
    pv.emit(nm('chassis', 'swingarm', 'pivot_bolt'), M['steel'], 0.05)
    sp0 = V((-25.5, 0, 35.5)); sp1 = V((-17.0, 0, 80.5))
    shock(nm('chassis', 'rear_shock'), sp0, sp1, 2.3, 3.5, 0.78, 7.5, red, M['alu'], res_pt=sp1 + V((-1.6, -5.0, -16.0)), eye_len=3.2)
    lk = MB()
    lk.panel(smooth_outline([(-29.5, 33.5), (-21.5, 33.0), (-24.0, 39.5)], 2), -3.2, 3.2)
    for s in (-1, 1):
        lk.sweep([V((-22.0, s * 3.6, 34.0)), V((-14.0, s * 3.6, 37.5))], prof=rect_prof(1.0, 1.0, 0.2, 2), radii=[(0.8, 2.4), (0.8, 2.4)], res=2, up=Y)
    for p in (V((-29.0, 0, 34.0)), V((-22.0, 0, 34.0)), V((-14.0, 0, 37.5)), V((-31.5, 0, 38.5))):
        lk.cyl(p - Y * 4.2, p + Y * 4.2, 0.8, 12)
    lk.emit(nm('chassis', 'rear_suspension_linkage'), M['alu_dark'], 0.15)

    # ---------------- brakes (wave discs)
    disc(nm('chassis', 'front_brake', 'disc'), A, 13.0, 9.0, -6.6, 0.4, wave=0.8, holes=True, carrier_m=M['alu_dark'], arms=5, boss_to=-5.4)
    mount = Lg(-1, 3.0) - n * 3.4 + Y * 2.0
    caliper(nm('chassis', 'front_brake', 'caliper'), A, 11.0, rad(156), -6.6, 0.4, (7.5, 4.2), mount=mount, m=M['alu_dark'])
    hose = MB(); cp = A + (X * math.cos(rad(156)) + Z * math.sin(rad(156))) * 13.4 + Y * -8.5
    hose.sweep([cp, Lg(-1, 14) - n * 4.0 + Y * 1.0, Lg(-1, 40) - n * 3.8 + Y * 0.6, S(66) + n * 5 + Y * -9, S(80) + n * 6.0 + Y * 2.0,
                V((32.0, 26.0, 118.0))], r=0.42, n=10, res=8)
    hose.emit(nm('chassis', 'front_brake', 'hose'), M['rubber'])
    disc(nm('chassis', 'rear_brake', 'disc'), RA, 11.0, 7.6, 7.4, 0.4, wave=0.6, holes=True, carrier_m=M['alu_dark'], arms=5, boss_to=6.0)
    caliper(nm('chassis', 'rear_brake', 'caliper'), RA, 9.4, rad(205), 7.4, 0.4, (6.4, 3.8), mount=RA + V((-2, 11.0, -3.0)), m=M['alu_dark'], pistons=1)
    rbk = MB(); rbk.sweep([V((-10, 13.4, 39.5)), V((-2, 15.0, 37.5)), V((6.0, 15.6, 35.5))], prof=rect_prof(1.6, 0.8, 0.3, 2), res=6, up=Y)
    rbk.cyl(V((6.0, 15.0, 35.6)), V((6.0, 18.5, 35.6)), 1.0, 8)
    rbk.emit(nm('chassis', 'rear_brake', 'pedal'), M['steel'], 0.05)

    # ---------------- bodywork (red plastics)
    tk = MB(); tk.loft_x([(-7, 86.0, 6.5, 4.0, 3.0, 2.5), (2, 88.5, 10.5, 8.5, 6.0, 2.6), (14, 90.5, 11.6, 9.5, 8.0, 2.6),
                          (26, 92.0, 9.5, 8.0, 9.0, 2.6), (33, 93.0, 5.0, 4.5, 6.0, 2.5)], n=40, res=3)
    tk.emit(nm('frame_body', 'fuel_tank'), paint('tank_natural', (0.80, 0.78, 0.70), 0.35, 0.0))
    cap = MB(); cap.lathe([(0, 0), (2.4, 0), (2.5, 0.8), (2.0, 1.4), (0, 1.5)], V((15.0, 0, 99.0)), Z, 32)
    cap.emit(nm('frame_body', 'fuel_tank', 'filler_cap'), M['plastic_black'], 0.05)
    se = MB()
    se.loft_x([(21.0, 99.6, 3.4, 1.4, 2.0, 3.0), (14, 98.4, 6.4, 2.0, 3.0, 3.5), (2, 96.0, 8.6, 2.6, 4.0, 4.0), (-12, 93.8, 10.2, 3.0, 4.5, 4.5),
               (-30, 92.8, 11.0, 3.0, 5.0, 4.5), (-55, 93.0, 11.0, 3.0, 5.0, 4.5), (-72, 93.6, 9.5, 2.8, 4.5, 4.0), (-79, 94.0, 5.5, 2.2, 3.5, 3.0)], n=48, res=4)
    se.emit(nm('frame_body', 'seat'), M['vinyl'])
    sr = MB()
    for k in range(18):
        x = 10 - k * 4.6
        sr.box(V((x, 0, 96.5 - max(0, x) * 0.15 + (0 if x < 10 else 0))), (0.2, 4.0, 0.2))
    # shrouds
    lv = MB()
    for s, side in ((-1, 'left'), (1, 'right')):
        ol = smooth_outline([(33.5, 97.0), (31.0, 85.0), (27.5, 68.0), (17.0, 63.5), (7.0, 71.0), (-2.0, 86.0), (2.0, 94.5), (17.0, 99.5)], 5)
        wf = (lambda s: (lambda p: V((p.x, p.y - s * (0.0018 * (p.z - 92.0) ** 2 + 0.03 * max(0.0, 10.0 - p.x)), p.z))))(s)
        sheet(nm('frame_body', 'radiator_shrouds', side), ol, V((0, s * 13.2, 0)), X, Z, Y * s, 0.45, red, wf)
        for k in range(5):
            z = 79.0 - k * 1.3; x = 26.0 - k * 2.2
            lv.box(V((x, s * (13.25 - 0.0018 * (z - 92) ** 2), z)), (0.7, 0.3, 9.0), Mx.Rotation(rad(24), 3, 'Y'))
    lv.emit(nm('frame_body', 'radiator_shrouds', 'louvres'), M['plastic_black'], 0.05)
    # side number boards
    sp = MB(); np_ = MB()
    for s in (-1, 1):
        ol = smooth_outline([(-22.0, 89.5), (-62.0, 92.0), (-70.0, 88.0), (-60.0, 75.0), (-38.0, 66.5), (-24.0, 70.0)], 5)
        sheet(nm('frame_body', 'side_panels', 'left' if s < 0 else 'right'), ol, V((0, s * 12.4, 0)), X, Z, Y * s, 0.45, red,
              (lambda s: (lambda p: V((p.x, p.y - s * 0.004 * (p.z - 82.0) ** 2, p.z))))(s))
        ol2 = smooth_outline([(-30.0, 86.5), (-58.0, 88.5), (-60.5, 84.0), (-52.0, 76.0), (-37.0, 72.5), (-29.0, 75.0)], 4)
        o0 = len(np_.v); panel_local(np_, ol2, V((0, s * 12.55, 0)), X, Z, Y, 0.3)
        for i in range(o0, len(np_.v)): np_.v[i].y -= s * 0.004 * (np_.v[i].z - 82.0) ** 2
    np_.emit(nm('frame_body', 'side_panels', 'number_backgrounds'), white, 0.1, 2)
    # mudguards
    ff = MB(); ushell(ff, [(17.0, 84.1, 5.0, 3.0), (26, 87.2, 6.8, 4.2), (36, 88.8, 7.4, 4.8), (46, 88.6, 7.6, 5.0), (56, 86.6, 7.4, 4.8),
                           (66, 83.0, 6.8, 4.4), (74, 79.2, 5.6, 3.6), (80.5, 75.6, 3.6, 2.4)], n=18, thick=0.4)
    ff.emit(nm('frame_body', 'front_mudguard'), red, 0.0)
    rf = MB(); ushell(rf, [(-44.0, 87.0, 8.0, 2.5), (-58, 89.0, 10.0, 4.0), (-76, 90.8, 10.5, 4.6), (-92, 94.0, 8.8, 4.2),
                           (-106, 97.5, 6.2, 3.0), (-113, 99.5, 4.0, 1.8)], n=18, thick=0.4)
    rf.emit(nm('frame_body', 'rear_mudguard'), red, 0.0)
    # front number plate (headlight shroud without light)
    pn = MB(); ctr = S(73.5) + n * 7.6
    ol = smooth_outline([(-11.5, 10.5), (11.5, 10.5), (12.5, 2.0), (8.5, -9.0), (3.5, -13.0), (-3.5, -13.0), (-8.5, -9.0), (-12.5, 2.0)], 5)
    sheet(nm('frame_body', 'number_plate'), ol, ctr, Y, d, n, 0.45, red, lambda p: p - n * 0.012 * ((p - ctr).dot(Y)) ** 2)
    pw = MB(); ol = smooth_outline([(-8.5, 7.5), (8.5, 7.5), (9.0, -2.0), (5.0, -7.5), (-5.0, -7.5), (-9.0, -2.0)], 4)
    o0 = len(pw.v); panel_local(pw, ol, ctr + n * 0.14, Y, d, n, 0.25)
    for i in range(o0, len(pw.v)): pw.v[i] -= n * 0.012 * ((pw.v[i] - ctr).dot(Y)) ** 2
    pw.emit(nm('frame_body', 'number_plate', 'background'), white, 0.08)
    # fork-guard style straps from plate to legs
    strap = MB()
    for s in (-1, 1): strap.cyl(ctr + Y * s * 9.0 - d * 9.0, Lg(s, 60.0) + n * 2.6, 0.6, 10)
    strap.emit(nm('frame_body', 'number_plate', 'straps'), M['rubber'])

    # ---------------- controls, electrical, wiring
    top = fk['top']
    bc = MB()
    for s in (-1, 1):
        bc.cyl(top + Y * s * 3.4, top + Y * s * 3.4 + d * 4.0, 1.9, 24)
        bc.box(top + Y * s * 3.4 + d * 4.6, (4.0, 3.6, 2.6), frame_from(d, Y))
    bc.box(top + d * 5.4 - n * 0.2, (4.5, 11.5, 3.0), frame_from(d, Y))
    bc.emit(nm('chassis', 'handlebar', 'clamps'), M['alu_dark'], 0.4, 2)
    pad = MB(); pad.box(top + d * 7.2 - n * 0.2, (4.8, 13.0, 2.4), frame_from(d, Y))
    pad.emit(nm('chassis', 'handlebar', 'pad'), M['plastic_black'], 0.8, 3)
    handlebar(nm('chassis', 'handlebar'), top + d * 5.0, 81, 9.0, 6.0, r=1.4, bar_m=M['alu_brushed'], mx=True)
    ks = MB(); ks.box(V((30.0, -11.5 + 34.5, 0)) if False else top + V((-6.0, -22.0, 8.6)), (2.4, 2.4, 2.0))
    ks.emit(nm('electrical', 'kill_switch'), M['plastic_black'], 0.3)
    ic = MB(); ic.box(V((24.0, 0, 88.5)), (5.5, 4.0, 3.5)); ic.cyl(V((21.0, 0, 88.5)), V((19.0, 0, 88.5)), 1.0, 12)
    ic.emit(nm('electrical', 'ignition_coil'), M['black_satin'], 0.3)
    cdi = MB(); cdi.box(V((-14.0, 0, 86.0)), (6.5, 6.0, 2.5))
    cdi.emit(nm('electrical', 'cdi_unit'), M['plastic_black'], 0.3)
    rg = MB(); rg.box(V((-24.0, -9.6, 82.0)), (5.5, 1.4, 4.5))
    for k in range(5): rg.box(V((-26 + k * 1.0, -10.4, 82.0)), (0.3, 0.6, 4.2))
    rg.emit(nm('electrical', 'voltage_regulator'), M['alu_dark'], 0.05)
    wh = MB()
    wh.sweep([V((24.0, -2.0, 88.0)), V((18.0, -7.0, 86.0)), V((6.0, -9.6, 84.0)), V((-8.0, -9.6, 76.5)), V((-12.5, -9.0, 66.0)),
              V((-10.0, -9.0, 56.0)), CRANK + V((-4.0, -9.4, 5.0))], r=0.55, n=10, res=8)
    wh.sweep([V((6.0, -9.6, 84.0)), V((-10.0, -5.0, 86.0)), V((-14.0, -2.0, 86.0))], r=0.45, n=10, res=6)
    wh.sweep([V((-8.0, -9.6, 76.5)), V((-20, -10.2, 80.0)), V((-24.0, -9.8, 82.0))], r=0.4, n=10, res=6)
    wh.sweep([V((24.0, 2.0, 88.0)), S(76) + n * 3.0 + Y * -5.0, top + V((-6.0, -22.0, 8.0))], r=0.35, n=8, res=6)
    wh.emit(nm('wiring', 'harness_main'), M['wire_black'])
    tie = MB()
    for p in (V((12.0, -8.5, 85.0)), V((-2.0, -9.8, 81.0)), V((-11.0, -9.4, 61.0))):
        tie.cyl(p - V((0.3, 0, 0)), p + V((0.3, 0, 0)), 0.9, 10)
    tie.emit(nm('wiring', 'harness_main', 'clips'), M['plastic_black'])
    footpegs(nm('chassis', 'footpegs'), V((-13.0, 10.6, 39.0)), m=M['steel'], mx=True)
