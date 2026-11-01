"""Classic air-cooled parallel-twin roadster (generic 1960s-70s British/Japanese idiom).
Wheelbase 145 cm, rake 27 deg, 19in front / 18in rear wire wheels, seat height ~79 cm."""
import sys, math
sys.path.insert(0, '/home/claude/mc/lib3d/parts')
import importlib, _bikekit; importlib.reload(_bikekit)
from _bikekit import *

META = {"title": "Classic air-cooled four-stroke roadster", "category": "bike", "kind": "bike", "view": (40, 14)}

A = V((73.0, 0, 33.13))       # front axle
RA = V((-72.0, 0, 33.26))     # rear axle
PIV = V((-21.0, 0, 37.5))     # swingarm pivot
CRANK = V((6.0, 0, 32.0))
RAKE, OFF = 27.0, 4.0
CHAIN_Y = -10.0

def build():
    init()
    red = paint('tank_paint', (0.30, 0.025, 0.03), 0.18, 1.0, 0.35)
    cream = paint('cream', (0.82, 0.76, 0.62), 0.25, 0.8)
    frame_m = M['black_gloss']

    # ---------------- wheels
    fw = wheel(nm('wheels', 'front_wheel'), A, 19, 9.0, 10.0, 7.0, 'spoked', 'ribbed', 36, hub_w=10.0, rim_m=M['chrome'], hub_m=M['alu'],
               flange_r=5.2, hub_r=4.6)
    rw = wheel(nm('wheels', 'rear_wheel'), RA, 18, 10.4, 13.0, 8.5, 'spoked', 'block', 36, hub_w=13.0, rim_m=M['chrome'], hub_m=M['alu'],
               flange_r=5.6, hub_r=5.2, drum=(1, 9.5, 4.0))
    axle(nm('wheels', 'rear_wheel', 'axle'), RA, 13.5)

    # ---------------- front fork, steering
    fk = fork(A, RAKE, OFF, 74.0, 10.0, 60.0, 70.0, usd=False, stan_r=2.05, slider_r=2.9, slider_len=31.0, gaiters=True,
              stan_m=M['chrome'], slider_m=M['polished'], clamp_m=M['black_satin'], cap_m=M['chrome'])
    d, n, S, Lg = fk['d'], fk['n'], fk['S'], fk['Lg']
    # head tube
    ht = MB(); ht.cyl(fk['head_lo'], fk['head_hi'], 2.7, 32)
    ht.cyl(fk['head_lo'] - d * 0.5, fk['head_lo'] + d * 0.6, 3.1, 32); ht.cyl(fk['head_hi'] - d * 0.6, fk['head_hi'] + d * 0.5, 3.1, 32)
    ht.emit(nm('frame_body', 'frame', 'head_tube'), frame_m, 0.1)

    # ---------------- frame: backbone, twin cradle, seat rails, rear struts
    hl, hh = fk['head_lo'], fk['head_hi']
    back = [hh + V((-1.5, 0, -0.5)), V((22, 0, 85.0)), V((0, 0, 79.5)), V((-16, 0, 75.0)), V((-22, 0, 72.0))]
    cradle = [hl + V((-0.5, -2.2, 0.6)), V((39.0, -5.5, 70)), V((36.0, -7.6, 50)), V((33.5, -8.2, 30)), V((29.0, -8.2, 19.8)),
              V((20, -8.2, 17.6)), V((-8, -8.2, 17.6)), V((-17, -8.4, 20.5)), V((-24.5, -8.6, 30)), V((-26.0, -8.6, 45)),
              V((-25.0, -8.0, 58)), V((-22.0, -5.0, 67)), V((-20.0, -1.5, 72.5))]
    rails = [V((-17, -3.0, 72.0)), V((-38, -10.6, 71.0)), V((-70, -11.0, 71.5)), V((-87, -9.0, 73.0)), V((-92.5, -4.0, 73.5)), V((-93.5, 0, 73.6))]
    strut = [V((-25.8, -8.6, 44)), V((-44, -10.4, 58)), V((-60.5, -11.0, 70.8))]
    gus = [V((-24.5, -8.6, 30)), V((-21, -9.2, 37.5))]
    fb, femit = tube_frame(nm('frame_body', 'frame', 'tubes'), [(back, 2.0), (cradle, 1.55), (rails, 1.4), (strut, 1.3)], m=frame_m)
    # cross tubes and pivot plates
    fb.cyl(V((-25.9, -8.6, 52)), V((-25.9, 8.6, 52)), 1.2, 16)
    fb.cyl(V((-12, -8.2, 17.6)), V((-12, 8.2, 17.6)), 1.2, 16)
    fb.cyl(V((-60.5, -11, 70.8)), V((-60.5, 11, 70.8)), 1.1, 16)
    for s in (-1, 1):
        pl = [(-28.5, 29), (-15.5, 30), (-14.5, 44), (-23, 49.5), (-28.5, 46)]
        fb.panel(pl, s * 8.6 - 0.45, s * 8.6 + 0.45)
        fb.cyl(V((-60.5, s * 11.0, 69.2)), V((-60.5, s * 13.6, 69.2)), 0.8, 12)     # shock top studs
        fb.box(V((-60.5, s * 11.3, 70.2)), (3.2, 1.0, 3.2))
        # engine mounts
        fb.panel([(31.5, 22), (34.5, 22), (34.5, 30), (27, 31)], s * 8.2 - 0.3, s * 8.2 + 0.3)
        fb.panel([(29, 48.5), (36.5, 46.5), (36.5, 51.5), (29, 53)], s * 7.6 - 0.3, s * 7.6 + 0.3)
        # footpeg hangers
        fb.panel([(-17, 20), (-11, 22), (-9, 36.5), (-14, 37), (-19, 28)], s * 8.8 - 0.35, s * 8.8 + 0.35)
    femit(0.08)

    # ---------------- engine: parallel twin, 12 deg forward
    dc = V((math.sin(rad(12)), 0, math.cos(rad(12)))); ncf = V((math.cos(rad(12)), 0, -math.sin(rad(12))))
    Rc = basis(ncf, Y, dc)
    cc = MB()
    cc.loft_x([(-21.5, 34.5, 7.6, 5.5, 6.0, 3.0), (-17, 34.0, 8.4, 9.0, 12.5, 3.5), (-7, 34.0, 10.6, 11.0, 14.3, 3.6),
               (6, 34.5, 11.2, 12.5, 15.0, 3.6), (18, 34.5, 10.8, 11.5, 14.6, 3.6), (24, 34.5, 9.0, 8.5, 12.0, 3.2), (26, 34.5, 5.0, 4.0, 7.0, 2.6)], n=48, res=3)
    # sump fins
    for k in range(6): cc.box(V((-6 + k * 4.5, 0, 19.8)), (0.5, 17, 1.6))
    cc.emit(nm('powertrain', 'engine', 'crankcase'), M['alu'], 0.4, 2)
    # cylinder barrels + fins
    cb = MB(); fins = MB()
    for s in (-1, 1): cb.cyl(CRANK + dc * 12.5 + Y * s * 4.7, CRANK + dc * 27.5 + Y * s * 4.7, 4.9, 40)
    for k in range(11):
        t = 14.0 + k * 1.25; fins.plate(CRANK + dc * t, Rc, 7.0 + 0.06 * k, 12.4 + 0.04 * k, 0.38, 4.5, 40)
    cb.plate(CRANK + dc * 13.3, Rc, 6.6, 11.6, 1.6, 4.0, 40)
    cb.emit(nm('powertrain', 'engine', 'cylinder_block'), M['alu'], 0.15, 2)
    fins.emit(nm('powertrain', 'engine', 'cylinder_fins'), M['alu'], 0.12, 2, angle=60)
    hd = MB(); hf = MB()
    hd.plate(CRANK + dc * 31.0, Rc, 6.8, 11.8, 6.2, 4.0, 40)
    for k in range(5):
        hf.plate(CRANK + dc * (28.4 + k * 1.3), Rc, 8.3 - abs(k - 2) * 0.25, 13.0, 0.4, 4.5, 40)
    hd.emit(nm('powertrain', 'engine', 'cylinder_head'), M['alu'], 0.4, 2)
    hf.emit(nm('powertrain', 'engine', 'head_fins'), M['alu'], 0.12, 2, angle=60)
    rk = MB(); acorn = MB()
    rk.plate(CRANK + dc * 35.2, Rc, 6.0, 11.0, 2.2, 3.4, 48)
    rk.plate(CRANK + dc * 36.4, Rc, 4.6, 9.8, 0.9, 3.0, 48)
    for s in (-1, 1):
        rk.cyl(CRANK + dc * 35.0 + Y * s * 10.6, CRANK + dc * 35.0 + Y * s * 12.6, 2.4, 32)   # rocker spindle caps
        for dx in (-4.2, 4.2):
            p = CRANK + dc * 36.4 + Rc @ V((dx, s * 7.8, 0))
            acorn.lathe([(0, 0), (0.55, 0), (0.55, 0.5), (0.3, 0.9), (0, 0.95)], p, dc, 16)
    rk.emit(nm('powertrain', 'engine', 'rocker_cover'), M['polished'], 0.3, 2)
    acorn.emit(nm('powertrain', 'engine', 'rocker_cover_nuts'), M['chrome'])
    # side covers: left alternator (round), left sprocket cover, right clutch + timing
    cv = MB()
    prof = [(0, -15.3), (5.2, -15.2), (7.6, -14.6), (8.9, -13.2), (9.3, -11.6), (9.3, -10.6)]
    cv.lathe(prof, CRANK + V((0, 0, 0.5)), Y, 72)
    cv.lathe([(0, -15.5), (2.4, -15.45), (2.6, -15.0)], CRANK + V((0, 0, 0.5)), Y, 32)
    cv.emit(nm('electrical', 'alternator', 'cover'), M['polished'], 0.2, 2)
    sc_ = MB(); sc_.lathe([(0, -13.3), (4.2, -13.2), (6.2, -12.6), (6.8, -11.6), (6.8, -9.0)], V((-14.5, 0, 36.5)), Y, 48)
    sc_.emit(nm('powertrain', 'engine', 'sprocket_cover'), M['alu'], 0.15, 2)
    cl = MB(); cl.lathe([(0, 15.6), (6.0, 15.5), (8.8, 14.8), (10.2, 13.2), (10.5, 11.2), (10.5, 10.4)], V((-7.5, 0, 33.5)), Y, 72)
    cl.lathe([(0, 13.5), (5, 13.5), (6.8, 12.0), (7.0, 10.6)], CRANK + V((10, 0, 1)), Y, 48)
    cl.emit(nm('powertrain', 'clutch', 'cover'), M['polished'], 0.2, 2)
    # cover screws
    scr = MB()
    for k in range(10):
        a = TAU * k / 10
        scr.cyl(CRANK + V((8.6 * math.cos(a), -11.4, 0.5 + 8.6 * math.sin(a))), CRANK + V((8.6 * math.cos(a), -12.1, 0.5 + 8.6 * math.sin(a))), 0.4, 6)
        scr.cyl(V((-7.5 + 9.8 * math.cos(a), 11.0, 33.5 + 9.8 * math.sin(a))), V((-7.5 + 9.8 * math.cos(a), 11.7, 33.5 + 9.8 * math.sin(a))), 0.4, 6)
    scr.emit(nm('powertrain', 'engine', 'cover_screws'), M['chrome'])
    # oil pipes, pushrod tubes
    ob = MB()
    ob.sweep([V((-20.5, -6.0, 40)), V((-17, -6.8, 50)), V((-6, -7.0, 62)), CRANK + dc * 33.5 - ncf * 6.5 + Y * -7.0], r=0.35, n=10, res=6)
    for s in (-1, 1):
        ob.cyl(CRANK + dc * 12.5 + ncf * 5.7 + Y * s * 9.4, CRANK + dc * 31.5 + ncf * 5.7 + Y * s * 9.4, 0.65, 12)
    ob.emit(nm('powertrain', 'engine', 'oil_lines'), M['chrome'])
    # spark plugs + caps + HT leads
    pl = MB(); pc = MB(); ht_ = MB()
    for s in (-1, 1):
        base = CRANK + dc * 31.0 - ncf * 5.6 + Y * s * 4.7 + dc * 2.2
        q = base - ncf * 1.5 + dc * 1.2
        pl.cyl(base, q, 0.75, 6)
        pc.cyl(q - ncf * 0.2 + dc * 0.1, q - ncf * 4.0 + dc * 2.8, 1.0, 16)
        ht_.sweep([q - ncf * 3.8 + dc * 2.8, q - ncf * 6 + dc * 6 + Y * s * 0.5, V((2.5, s * 4.0, 73.5))], r=0.35, n=8, res=6)
    pl.emit(nm('electrical', 'spark_plugs'), M['steel'], 0.05)
    pc.emit(nm('electrical', 'spark_plugs', 'caps'), M['rubber'], 0.2)
    # carburettors with bell-mouth filters
    cbm = MB(); ib = MB(); flt = MB()
    for s in (-1, 1):
        port = CRANK + dc * 30.5 - ncf * 6.8 + Y * s * 4.7
        dirv = (-ncf * 1.0 - dc * 0.12).normalized()
        ib.cyl(port, port + dirv * 3.2, 2.4, 24)
        c0 = port + dirv * 3.2; c1 = c0 + dirv * 7.0
        cbm.cyl(c0, c1, 2.6, 32)
        cbm.lathe([(0, -5.6), (2.6, -5.6), (2.8, -4.4), (2.6, -2.4), (1.4, -1.6)], (c0 + c1) / 2, Z, 32)
        cbm.lathe([(1.2, 2.0), (2.0, 2.2), (2.0, 4.6), (1.4, 5.0), (0, 5.1)], (c0 + c1) / 2, Z, 32)
        cbm.box((c0 + c1) / 2 + Y * s * 2.8 + Z * 0.5, (2.2, 1.2, 2.0))
        flt.lathe([(2.4, 0), (3.2, 1.2), (4.6, 2.8), (4.8, 6.5), (4.5, 7.2), (0, 7.4)], c1, dirv, 40)
        flt.lathe([(4.85, 3.2), (4.85, 6.0), (4.9, 6.0)], c1, dirv, 40, mi=1)
    ib.emit(nm('powertrain', 'intake', 'manifold_rubbers'), M['rubber'], 0.1)
    cbm.emit(nm('powertrain', 'intake', 'carburettors'), M['alu'], 0.2, 2)
    flt.emit(nm('powertrain', 'intake', 'air_filters'), [M['chrome'], M['black_satin']], 0.05)
    # exhaust: headers and peashooter silencers
    hdr = MB(); sil = MB()
    for s in (-1, 1):
        port = CRANK + dc * 30.0 + ncf * 6.9 + Y * s * 4.7
        P = [port, port + ncf * 3.2 - dc * 0.5 + Y * s * 0.6, V((28.5, s * 7.8, 47)), V((30.5, s * 10.0, 34)), V((27.0, s * 12.0, 24.0)),
             V((18, s * 13.4, 21.0)), V((0, s * 14.4, 21.0)), V((-16, s * 15.0, 22.8)), V((-27, s * 15.3, 25.0))]
        hdr.sweep(P, r=1.95, n=24, res=10)
        hdr.cyl(port - ncf * 0.2, port + ncf * 1.6, 2.6, 24)   # finned port nut
        s0 = V((-27, s * 15.3, 25.0)); s1 = V((-89, s * 15.8, 31.0)); dv = (s1 - s0).normalized(); Lz = (s1 - s0).length
        sil.lathe([(1.95, -1.5), (2.0, 0), (2.4, 2.5), (3.9, 9.0), (4.25, 12.0), (4.25, Lz - 6), (3.9, Lz - 2.0), (3.6, Lz - 0.6),
                   (1.4, Lz - 0.3), (1.25, Lz + 2.2), (1.05, Lz + 2.2), (1.05, Lz - 1.2)], s0, dv, 48)
    hdr.emit(nm('powertrain', 'exhaust', 'headers'), M['chrome'])
    sil.emit(nm('powertrain', 'exhaust', 'silencers'), M['chrome'], 0.05)
    # silencer hangers
    hg = MB()
    for s in (-1, 1):
        hg.panel([(-62, 31.0), (-58, 31.5), (-56.5, 58), (-60, 58)], s * 12.6 - 0.25, s * 12.6 + 0.25)
    hg.emit(nm('frame_body', 'frame', 'silencer_hangers'), M['chrome'], 0.08)

    # ---------------- transmission: sprockets, chain, guard, gear lever
    fsk, frp = sprocket(nm('transmission', 'front_sprocket'), V((-14.5, 0, 36.5)), 17, CHAIN_Y)
    rsk, rrp = sprocket(nm('transmission', 'rear_sprocket'), RA, 42, CHAIN_Y, holes=6, inner=5.0)
    chain(nm('transmission', 'chain'), V((-14.5, 0, 36.5)), frp + 0.15, RA, rrp + 0.15, CHAIN_Y)
    cg = MB(); p0 = V((-20, CHAIN_Y, 42.5)); p1 = V((-66, CHAIN_Y, 45.6))
    dv = (p1 - p0).normalized(); Rg = basis(dv, Y, Y.cross(dv) * -1 if False else V((-dv.z, 0, dv.x)))
    cg.box((p0 + p1) / 2 + Rg @ V((0, 0, 0.8)), ((p1 - p0).length, 3.4, 0.25), Rg)
    cg.box((p0 + p1) / 2 + Rg @ V((0, -1.7, -0.4)), ((p1 - p0).length, 0.25, 2.6), Rg)
    cg.box(V((-30, -9.5, 40.5)), (2.0, 1.0, 4.5))
    cg.emit(nm('transmission', 'chain_guard'), M['chrome'], 0.08)
    gl = MB(); gl.sweep([V((-14, -13.5, 41)), V((-8, -15.0, 38.5)), V((2, -15.5, 33.5))], r=0.6, n=10, res=6)
    gl.cyl(V((2, -15.0, 33.5)), V((2, -19.0, 33.5)), 0.9, 16)
    gl.emit(nm('transmission', 'gear_lever'), M['chrome'])

    # ---------------- swingarm and rear suspension
    sa = MB()
    for s in (-1, 1):
        sa.sweep([V((-21, s * 9.0, 37.5)), V((-35, s * 10.4, 36.6)), V((-60, s * 12.0, 34.6)), V((-70.5, s * 12.4, 33.6))], r=1.7, n=20, res=6)
        sa.panel([(-75.5, 31.4), (-68.5, 31.0), (-68.5, 36.2), (-75.5, 35.5)], s * 12.4 - 0.4, s * 12.4 + 0.4)   # axle plates
        sa.box(V((-64.0, s * 12.2, 36.4)), (2.6, 1.4, 2.6))
    sa.cyl(V((-21, -9.4, 37.5)), V((-21, 9.4, 37.5)), 2.4, 24)
    sa.cyl(V((-27, -9.8, 37.2)), V((-27, 9.8, 37.2)), 1.3, 16)
    sa.emit(nm('chassis', 'swingarm'), frame_m, 0.1)
    pb = MB(); pb.cyl(V((-21, -10.6, 37.5)), V((-21, 10.6, 37.5)), 1.0, 16)
    for s in (-1, 1): pb.cyl(V((-21, s * 10.4, 37.5)), V((-21, s * 11.2, 37.5)), 1.6, 6)
    pb.emit(nm('chassis', 'swingarm', 'pivot_bolt'), M['steel'], 0.06)
    for s, side in ((-1, 'left'), (1, 'right')):
        shock(nm('chassis', 'rear_shock_' + side), V((-64.0, s * 12.9, 37.6)), V((-60.5, s * 12.9, 69.2)), 1.9, 2.75, 0.5, 8.5,
              M['chrome'], M['black_satin'], eye_len=2.4)

    # ---------------- brakes
    disc(nm('chassis', 'front_brake', 'disc'), A, 15.0, 10.6, -7.6, 0.5, holes=True, carrier_m=M['alu'], arms=5, boss_to=-5.5)
    mount = Lg(-1, 4.0) - n * 2.8
    caliper(nm('chassis', 'front_brake', 'caliper'), A, 13.0, rad(160), -7.6, 0.5, (8.0, 4.4), mount=mount, m=M['polished'])
    hose = MB(); cp = A + (X * math.cos(rad(160)) + Z * math.sin(rad(160))) * 15.2 + Y * -9.2
    hose.sweep([cp, Lg(-1, 18) - n * 3.4 + Y * -0.4, Lg(-1, 42) - n * 3.8, S(59) + n * 1.0 + Y * -4, S(68) + n * 3 + Y * 6,
                V((26.5, 24.0, 103.0))], r=0.42, n=10, res=8)
    hose.emit(nm('chassis', 'front_brake', 'hose'), M['rubber'])
    # rear drum brake plate + torque arm (right side)
    bp = MB(); bp.lathe([(2.0, 7.4), (10.0, 7.6), (10.2, 8.6), (6.0, 9.6), (2.0, 9.8)], RA, Y, 64)
    bp.box(RA + V((-3.0, 10.0, 6.5)), (1.6, 1.4, 4.0))
    bp.sweep([RA + V((3.5, 9.2, 3.5)), RA + V((22, 10.4, 2.8)), RA + V((36, 10.6, 2.6))], r=0.5, n=10, res=4)
    bp.emit(nm('chassis', 'rear_brake', 'drum_plate'), M['alu'], 0.15, 2)
    bk = MB(); bk.sweep([V((-17, 13.6, 35.5)), V((-8, 15.0, 33.5)), V((4, 15.2, 30.5))], prof=rect_prof(1.6, 0.8, 0.3, 2), res=6, up=Y)
    bk.cyl(V((4, 15.0, 30.6)), V((4, 18.5, 30.6)), 1.0, 16)
    bk.sweep([V((-17, 13.6, 35.5)), V((-40, 12.6, 35.0)), RA + V((-0.5, 10.6, 9.0))], r=0.35, n=8, res=4)
    bk.emit(nm('chassis', 'rear_brake', 'pedal_and_rod'), M['chrome'])

    # ---------------- bodywork
    tk = MB()
    tk.loft_x([(-13.5, 78.5, 4.5, 1.8, 2.5, 2.6), (-11, 79.6, 9.5, 5.5, 4.5, 2.4), (-2, 82.2, 12.6, 10.0, 6.5, 2.3), (11, 84.5, 13.3, 11.8, 8.4, 2.25),
               (23, 85.6, 12.2, 10.4, 8.4, 2.3), (31.5, 86.6, 9.8, 7.8, 6.8, 2.4), (36.0, 87.4, 6.0, 4.4, 4.0, 2.6), (37.6, 87.8, 2.0, 1.5, 1.5, 2.5)],
              n=56, res=4)
    tk.emit(nm('frame_body', 'fuel_tank'), red)
    kp = MB()
    for s in (-1, 1):
        R = basis(X, Z * (-s), Y * s) if s < 0 else basis(X, -Z, -Y)
        R = basis(V((1, 0, 0.12)).normalized(), V((0, 0, 1)), V((0, s, 0)))
        kp.plate(V((-1.5, s * 12.75, 82.6)), R, 4.6, 3.0, 0.6, 3.0, 40)
        for k in range(6): kp.plate(V((-1.5 + (k - 2.5) * 1.35, s * 13.05, 82.6)), R, 0.28, 2.4, 0.3, 2.5, 12)
    kp.emit(nm('frame_body', 'fuel_tank', 'knee_pads'), M['knee'], 0.15)
    cap = MB(); cap.lathe([(0, 0.0), (3.4, 0.0), (3.6, 0.5), (3.3, 1.3), (2.2, 1.7), (0, 1.75)], V((15, 0, 96.0)), V((0.08, 0, 1)), 48)
    cap.box(V((15, 0, 97.6)), (0.7, 3.8, 0.8))
    cap.emit(nm('frame_body', 'fuel_tank', 'filler_cap'), M['chrome'], 0.06)
    # fuel tap and line
    ft = MB(); ft.box(V((-8.5, -5.2, 77.8)), (1.6, 1.8, 2.4)); ft.sweep([V((-8.5, -5.2, 76.6)), V((-6, -6, 70)), V((-3.6, -6.0, 63.5))], r=0.38, n=8, res=6, mi=1)
    ft.emit(nm('powertrain', 'fuel_system', 'tap_and_line'), [M['chrome'], paint('fuel_line', (0.6, 0.5, 0.35), 0.3, 0.0)])
    # seat
    se = MB()
    se.loft_x([(-11.5, 75.4, 5.0, 2.4, 2.4, 3.0), (-16, 75.4, 11.5, 3.6, 3.4, 4.0), (-32, 75.4, 13.4, 3.9, 3.7, 4.5), (-60, 75.8, 12.8, 4.0, 3.8, 4.5),
               (-80, 76.4, 12.2, 4.1, 3.9, 4.5), (-88, 76.9, 9.5, 3.4, 3.4, 3.6), (-90.5, 77.0, 4.5, 2.0, 2.0, 3.0)], n=56, res=4)
    se.emit(nm('frame_body', 'seat'), M['vinyl'])
    trim = MB(); trim.loft_x([(-12.5, 72.4, 5.6, 0.45, 0.45, 3.0), (-16, 72.4, 12.1, 0.5, 0.5, 4.0), (-32, 72.4, 14.0, 0.5, 0.5, 4.5),
                              (-60, 72.7, 13.4, 0.5, 0.5, 4.5), (-80, 73.2, 12.8, 0.5, 0.5, 4.5), (-88.5, 73.6, 10.0, 0.5, 0.5, 3.6), (-91, 73.7, 5.0, 0.45, 0.45, 3.0)], n=56, res=4)
    trim.emit(nm('frame_body', 'seat', 'trim'), M['chrome'])
    # side panels (cover battery box / airbox)
    sp = MB()
    for s in (-1, 1):
        pl = [(-17.5, 69.5), (-29, 70.0), (-40.5, 69.5), (-41.0, 64.0), (-37.0, 53.0), (-28, 50.5), (-20.0, 50.0), (-16.5, 54.0), (-16.5, 64)]
        pl = [(p.x, p.y) for p in cr_sample([(a, b, 0) for a, b in pl], 5, True)[0]]
        sheet(nm('frame_body', 'side_panels', 'left' if s < 0 else 'right'), pl, V((0, s * 12.0, 0)), X, Z, Y * s, 0.5, red,
              (lambda s: (lambda p: V((p.x, p.y + s * (0.9 - 0.0028 * ((p.x + 29) ** 2 + 1.6 * (p.z - 60) ** 2)), p.z))))(s), bevel=0.2)
    knob = MB()
    for s in (-1, 1): knob.cyl(V((-28, s * 12.4, 62)), V((-28, s * 13.2, 62)), 1.1, 24)
    knob.emit(nm('frame_body', 'side_panels', 'fasteners'), M['chrome'], 0.1)
    # mudguards + stays
    fender(nm('frame_body', 'front_mudguard'), A, fw['R'] + 1.8, 11.0, 32, 192, 1.3, 0.25, M['chrome'])
    fs = MB()
    for s in (-1, 1):
        for ang in (55, 170):
            th = rad(ang); p = A + (X * math.cos(th) + Z * math.sin(th)) * (fw['R'] + 2.6) + Y * s * 6.2
            fs.sweep([p, A + (X * math.cos(th) + Z * math.sin(th)) * 14 + Y * s * 8.0, A + Y * s * 8.3 + (X * math.cos(th) + Z * math.sin(th)) * 2.2], r=0.42, n=10, res=4)
        fs.box(Lg(s, 26.0) + Y * -s * 2.5, (3.0, 2.6, 2.0), frame_from(d, Y))
    fs.emit(nm('frame_body', 'front_mudguard', 'stays'), M['chrome'])
    fender(nm('frame_body', 'rear_mudguard'), RA, rw['R'] + 2.0, 14.5, 62, 172, 1.5, 0.25, M['chrome'])
    rs = MB()
    for s in (-1, 1):
        th = rad(132); p = RA + (X * math.cos(th) + Z * math.sin(th)) * (rw['R'] + 3.0) + Y * s * 7.2
        rs.sweep([V((-61.5, s * 13.6, 69.2)), V((-75, s * 12.0, 66.5)), V((-89, s * 9.6, 61.5)), p], r=0.55, n=10, res=6)
        th = rad(104); p = RA + (X * math.cos(th) + Z * math.sin(th)) * (rw['R'] + 3.4) + Y * s * 6.5
        rs.sweep([p, V((p.x + 0.5, s * 10.6, 71.0))], r=0.45, n=10, res=2)
    rs.cyl(V((-90, -9.5, 72.0)), V((-90, 9.5, 72.0)), 0.8, 12)
    rs.emit(nm('frame_body', 'rear_mudguard', 'stays'), M['chrome'])

    # ---------------- electrical
    hlc = Lg(0, 53.0) + n * 7.5
    hlo = round_headlight(nm('electrical', 'headlight'), hlc, V((1, 0, -0.04)), 9.0, 9.0)
    ears = MB()
    for s in (-1, 1):
        a0 = hlc - X * 4.5 + Y * s * 8.6; a1 = Lg(s, 55.5) + Y * -s * 2.2
        ears.sweep([a0, (a0 + a1) / 2 + Y * s * 0.8, a1], prof=rect_prof(0.5, 3.4, 0.2, 2), res=4, up=Y)
        ears.cyl(a0 + Y * s * 0.2, a0 + Y * s * 1.3, 0.8, 6)
    ears.emit(nm('electrical', 'headlight', 'brackets'), M['chrome'], 0.08)
    # indicators: front on the ears, rear on the fender stays
    ind = MB(); lens = MB()
    for s in (-1, 1):
        for base, dirx in ((hlc - X * 5.0 + Y * s * 11.5, 1), (V((-94, s * 11.5, 63)), -1)):
            stalk0 = base + Y * -s * 3.0
            ind.cyl(stalk0, base, 0.5, 12)
            ind.lathe([(0, -2.2), (1.7, -2.0), (2.0, 0)], base, V((dirx, 0, 0)), 32)
            lens.lathe([(2.0, 0), (1.9, 1.0), (1.1, 2.0), (0, 2.3)], base, V((dirx, 0, 0)), 32)
    ind.emit(nm('electrical', 'indicators'), M['chrome'])
    lens.emit(nm('electrical', 'indicators', 'lenses'), M['lens_amber'])
    # twin round clocks on the top clamp
    top = fk['top']
    ck = MB(); dial = MB(); gl_ = MB(); nd = MB()
    nrm = V((-0.42, 0, 0.91)).normalized()
    for s in (-1, 1):
        c = top + n * 4.2 + Y * s * 6.2 + d * 4.2
        ck.lathe([(0, -5.2), (3.0, -5.0), (4.3, -3.2), (4.6, 0), (4.6, 0.5), (4.1, 0.6)], c, nrm, 48)
        ck.cyl(c - nrm * 5.0, top + n * 1.2 + Y * s * 3.0, 0.7, 12)
        dial.lathe([(0, 0.1), (4.1, 0.1)], c, nrm, 48)
        Rn = frame_from(nrm, X)
        for k in range(11):
            a = rad(-135 + 27 * k) + math.pi / 2
            dial.box(c + nrm * 0.18 + Rn @ V((3.4 * math.cos(a), 3.4 * math.sin(a), 0)), (0.18, 0.18, 0.05), Rn @ Mx.Rotation(a, 3, 'Z'), mi=1)
        nd.box(c + nrm * 0.25 + Rn @ V((0.9, 1.0, 0)), (0.16, 3.0, 0.06), Rn @ Mx.Rotation(rad(-40), 3, 'Z'))
        gl_.lathe([(0, 0.9), (4.2, 0.6)], c, nrm, 48)
    ck.emit(nm('electrical', 'instruments'), M['chrome'])
    dial.emit(nm('electrical', 'instruments', 'dials'), [M['dial_black'], M['dial']])
    nd.emit(nm('electrical', 'instruments', 'needles'), M['needle'])
    gl_.emit(nm('electrical', 'instruments', 'glass'), M['glass'])
    # handlebar on risers
    rz = MB()
    for s in (-1, 1): rz.cyl(top + Y * s * 3.2, top + Y * s * 3.2 + d * 4.2, 1.6, 20)
    rz.emit(nm('chassis', 'handlebar', 'risers'), M['chrome'], 0.08)
    for o in handlebar(nm('chassis', 'handlebar'), top + d * 4.6 + n * -0.4, 76, 7.5, 12.0, mirrors=True):
        pass
    # tail light
    tl = MB(); tlens = MB()
    th = rad(140); tc = RA + (X * math.cos(th) + Z * math.sin(th)) * (rw['R'] + 4.4)
    tdir = V((-1, 0, 0.25)).normalized()
    tl.box(tc - tdir * 1.6, (3.6, 9.0, 6.4), frame_from(tdir, Y))
    tlens.lathe([(0, 0.4), (3.3, 0.2), (3.5, -0.8)], tc + tdir * 0.6, tdir, 40)
    tl.emit(nm('electrical', 'tail_light'), M['chrome'], 0.3)
    lp = MB(); lp.box(V((-101.5, 0, 44.5)), (0.4, 17.0, 11.0), roty(rad(-14)))
    lp.box(V((-99.5, 0, 50.5)), (4.0, 3.0, 1.0), roty(rad(-30)))
    lp.emit(nm('frame_body', 'number_plate_bracket'), M['black_satin'], 0.1)
    tlens.emit(nm('electrical', 'tail_light', 'lens'), M['lens_red'])
    # horn, coils, regulator, starter motor, battery box
    hn = MB(); hn.lathe([(0, -2.0), (3.6, -1.8), (4.2, 0), (3.8, 0.4), (0, 0.5)], V((37.5, 0, 63.5)), V((1, 0, -0.2)), 40)
    hn.box(V((35.8, 0, 63.8)), (2.0, 1.6, 4.0))
    hn.emit(nm('electrical', 'horn'), M['chrome'], 0.06)
    co = MB()
    for s in (-1, 1):
        co.cyl(V((-2, s * 4.0, 73.4)), V((9, s * 4.0, 74.6)), 2.2, 24)
        co.cyl(V((9, s * 4.0, 74.6)), V((10.5, s * 4.0, 74.8)), 1.0, 16)
    co.emit(nm('electrical', 'ignition_coils'), M['black_gloss'], 0.1)
    st = MB(); st.cyl(V((-4, -7.5, 50.5)), V((-4, 7.5, 50.5)), 3.4, 32); st.cyl(V((-4, -8.6, 50.5)), V((-4, -7.4, 50.5)), 2.8, 32)
    st.emit(nm('electrical', 'starter_motor'), M['alu_brushed'], 0.15)
    bb = MB(); bb.box(V((-29, 0, 58.5)), (12, 14, 14)); bb.box(V((-29, 0, 50.8)), (14, 16, 1.2))
    bb.emit(nm('electrical', 'battery'), M['black_cast'], 0.4)
    bt = MB()
    for s in (-1, 1): bt.cyl(V((-25.5, s * 4.0, 65.5)), V((-25.5, s * 4.0, 66.6)), 0.8, 12)
    bt.emit(nm('electrical', 'battery', 'terminals'), [M['brass']])
    rr_ = MB(); rr_.box(V((-46, 0, 66.0)), (6.5, 9.0, 1.4))
    for k in range(7): rr_.box(V((-46, -3.9 + k * 1.3, 64.6)), (6.0, 0.3, 1.6))
    rr_.emit(nm('electrical', 'regulator_rectifier'), M['alu_dark'], 0.06)

    # ---------------- wiring
    wh = MB()
    wh.sweep([hlc - X * 8.2 + V((0, -1.5, 0)), V((44.0, -3.6, 82.0)), V((39.0, -4.6, 78.6)), V((26, -5.4, 77.0)), V((10, -6.6, 75.4)),
              V((-6, -7.0, 73.0)), V((-17.5, -6.5, 70.2)), V((-24.0, -6.5, 66.2)), V((-26.0, -4.5, 65.2))], r=0.75, n=12, res=8)
    wh.sweep([V((-17.5, -6.5, 70.2)), V((-40, -9.4, 69.5)), V((-70, -9.6, 70.0)), V((-88, -7.0, 71.4)), V((-96, -3, 66))], r=0.45, n=10, res=6)
    wh.sweep([V((26, -5.4, 77.0)), V((10.5, -4.0, 75.0))], r=0.4, n=8, res=4)
    wh.sweep([V((39.0, -4.6, 78.6)), V((37.0, -2.5, 66.0))], r=0.35, n=8, res=4)
    wh.sweep([V((10, -6.6, 75.4)), V((2.0, -8.5, 60.0)), V((-1.5, -8.6, 52.0))], r=0.4, n=8, res=4)
    for p in (V((39.0, -4.6, 78.6)), V((-6, -7.0, 73.0))):
        wh.box(p, (2.2, 1.6, 1.6), mi=1)
    wh.emit(nm('wiring', 'harness_main'), [M['wire_black'], M['plastic_black']])
    tie = MB()
    for p in (V((30, -5.2, 77.4)), V((18, -6.0, 76.2)), V((2, -6.9, 74.2)), V((-52, -9.5, 69.8))):
        tie.cyl(p - X * 0.3, p + X * 0.3, 1.0, 12)
    tie.emit(nm('wiring', 'harness_main', 'clips'), M['plastic_black'])

    # ---------------- footpegs
    footpegs(nm('chassis', 'footpegs'), V((-12.0, 9.5, 35.0)))
    ss = MB(); ss.sweep([V((-16, -9.4, 22.5)), V((-26, -12.5, 18.5)), V((-36, -13.2, 17.5))], r=0.9, n=12, res=4)
    ss.box(V((-36.5, -13.4, 16.8)), (3.0, 2.4, 0.6))
    ss.emit(nm('chassis', 'side_stand'), frame_m, 0.08)
