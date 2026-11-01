import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from typeslib import *

P = new_plate('T06', 'T06 Cruiser and chopper, left side elevation',
              'Custom cruiser in the chopper tradition: long raked fork, pull-back bars, 45 degree air-cooled V-twin, teardrop tank with '
              'dash console, low stepped seat with sissy bar, forward controls, softail frame, belt final drive, fat rear tyre and shotgun exhaust.')
GY = 712
Rf, THf = 142, 28
Rr, THr = 136, 50
fa = (318, GY - Rf); ra = (1130, GY - Rr)
T1 = Col(46, 'T', ymin=40, pitch=26); T2 = Col(86, 'T', ymin=40, pitch=26)
B1 = Col(808, 'B', ymin=40, pitch=26); B2 = Col(848, 'B', ymin=40, pitch=26)
labels = []
def L(g, a, col, t, sub=None):
    P.label(g, a, col, t, sub); labels.append(t)

ground(P, GY)

# ---------------------------------------------------------------- rear wheel, fat tyre, belt pulley
with P.part('Fat rear tyre', 'wheels', 'rear-wheel') as g_rw:
    road_tyre(P, ra[0], ra[1], Rr, Rr - THr, step=5)
    P.circ(ra[0], ra[1], Rr - 18, 'n f')
    rim_side(P, ra[0], ra[1], Rr - THr, Rr - THr - 12, well=Rr - THr - 6)
    rr = Rr - THr - 12
    for fr_, cls in ((False, 'f'), (True, 'i')):
        sp = spokes(P, ra[0], ra[1], 36, rr, 40, 40, phase=2, front=fr_, cls=cls)
        nipples(P, ra[0], ra[1], rr - 3, sp)
    P.circ(ra[0], ra[1], 40, 't o')
with P.part('Belt final drive', 'transmission', 'belt') as g_bt:
    P.path(gear_d(ra[0], ra[1], 64, 68, 66), 't2 o')
    P.circ(ra[0], ra[1], 56, 'n i')
    for k in range(5):
        a = k * 72 + 18
        P.path(sector_d(ra[0], ra[1], 22, 50, a - 20, a + 20), 'w i')
    P.bolt(ra[0], ra[1], 10)
    fp = (928, 612)
    # belt run (thick band) between front and rear pulleys
    for sgn in (-1, 1):
        a = ang(fp, ra); d = dist(fp, ra)
        beta = math.degrees(math.asin((68 - 26) / d))
        n = a - sgn * (90 + beta)
        p1 = pol(fp[0], fp[1], 28, n); p2 = pol(ra[0], ra[1], 70, n)
        F = Frame(p1, ang(p1, p2)); Lb = dist(p1, p2)
        P.path(F.poly([(0, -6), (Lb, -6), (Lb, 6), (0, 6)]), 't2 o')
        for i in range(0, int(Lb), 8):
            P.line(F(i, -sgn * 6), F(i, -sgn * 2), 'f')
    P.path(gear_d(fp[0], fp[1], 24, 28, 30), 't2 o')
    P.bolt(fp[0], fp[1], 7)

# ---------------------------------------------------------------- front wheel, disc
with P.part('21 in front wheel', 'wheels', 'front-wheel') as g_fw:
    wire_wheel(P, *fa, Rf, THf, nsp=40, hub=26, cross=46)
with P.part('Front disc brake', 'chassis', 'front-disc') as g_fd:
    disc(P, fa[0], fa[1], 62, 28)
    cal = Frame(fa, -20)
    P.path(cal.poly([(42, -18), (68, -20), (68, 20), (42, 18)]), 't o')

# ---------------------------------------------------------------- softail frame
FF = Frame(fa, -54)
head_b = FF(380, 26); head_t = FF(446, 26)
piv = (972, 606)
P.underlay('u')
with P.part('Softail frame', 'frame_body', 'frame') as g_fr:
    P.tube(cr([head_b, (640, 420), (660, 560), (700, 652), (820, 664), (960, 656), piv]), 15)        # downtube and cradle
    P.tube(cr([head_t, (700, 236), (820, 270), (930, 330), (980, 380), (990, 470), piv]), 18)       # backbone to seat post
    P.path(Frame(head_b, ang(head_b, head_t)).poly([(-10, -14), (dist(head_b, head_t) + 10, -14), (dist(head_b, head_t) + 10, 14), (-10, 14)]), 't o')
    P.path(poly([(head_b[0] + 6, head_b[1] - 40), (head_b[0] + 58, head_b[1] - 12), (head_b[0] + 14, head_b[1] + 10)]), 't i')
P.underlay('s')
with P.part('Hidden softail swingarm', 'chassis', 'swingarm') as g_sa:
    # triangulated rear section that looks like a hardtail; shocks hide under the gearbox
    P.tube(cr([piv, ra]), 14, key='s')
    P.tube(cr([(990, 420), (1060, 470), ra]), 12, key='s')
    P.circ(*piv, 12, 't2 o'); P.bolt(piv[0], piv[1], 5)
    P.path(poly([(ra[0] - 32, ra[1] - 12), (ra[0] + 10, ra[1] - 12), (ra[0] + 10, ra[1] + 12), (ra[0] - 32, ra[1] + 12)]), 't2 i')
    # shocks under transmission (hidden)
    P.path(poly([(840, 650), (968, 640)], False), 'n h')
    P.path(poly([(840, 660), (968, 650)], False), 'n h')

# ---------------------------------------------------------------- V-twin
crank = (800, 604)
with P.part('45° V-twin', 'powertrain', 'engine') as g_en:
    crankcase(P, [(722, 576), (770, 556), (836, 558), (900, 578), (920, 620), (890, 650), (800, 662), (730, 650), (712, 614)])
    Fr = single_cyl(P, (822, 560), -67.5, h_barrel=82, h_head=54, w=68, fin_ext=12, nb=8, nh=5)
    Ff = single_cyl(P, (778, 560), -112.5, h_barrel=82, h_head=54, w=68, fin_ext=12, nb=8, nh=5)
    plug_cap(P, Ff(118, -40), -200, 22); plug_cap(P, Fr(118, 40), 20, 22)
    # cam cover
    P.path(cr([(840, 604), (868, 586), (896, 606), (880, 632), (850, 630)], closed=True), 't i')
with P.part('Pushrod tubes', 'powertrain', 'pushrods') as g_pr:
    for F_ in (Ff, Fr):
        a0 = (848, 600); b0 = F_(148, 0)
        bar(P, a0, b0, 6, 'w i')
        bar(P, (a0[0] + 8, a0[1] + 4), (b0[0] + 7, b0[1] + 6), 6, 'w i')
with P.part('Air cleaner', 'powertrain', 'air-cleaner') as g_ac:
    acc = (842, 452)
    P.circ(*acc, 40, 't o'); P.circ(*acc, 32, 'w i'); P.circ(*acc, 7, 't2 i')
    for k in range(12):
        P.line(pol(acc[0], acc[1], 12, k * 30), pol(acc[0], acc[1], 28, k * 30), 'f')
with P.part('Primary cover', 'transmission', 'primary') as g_pc:
    pc = cr([(756, 620), (800, 590), (880, 594), (942, 610), (952, 640), (900, 662), (800, 664), (760, 650)], closed=True)
    P.path(pc, 't o')
    P.path(cr([(766, 624), (802, 600), (878, 604), (934, 616), (942, 638), (898, 654), (802, 656), (770, 646)], closed=True), 'n i')
    P.circ(800, 628, 20, 'w o'); P.circ(800, 628, 12, 't2 i')        # derby cover
    for k in range(5):
        P.bolt(*pol(800, 628, 16, k * 72), 2.2)

# ---------------------------------------------------------------- shotgun exhaust
with P.part('Shotgun exhaust', 'powertrain', 'exhaust') as g_ex:
    h1 = Ff(110, -36); h2 = Fr(110, 36)
    for d_, endx, endy in ((cr([h1, (700, 520), (690, 600), (730, 668), (900, 682), (1100, 672), (1210, 660)]), 1210, 660),
                           (cr([h2, (930, 470), (960, 540), (944, 600), (980, 640), (1100, 640), (1230, 628)]), 1230, 628)):
        P.path(d_, 'n', 'stroke="#1E2B5E" stroke-width="18"')
        P.path(d_, 'n', 'stroke="#FFFFFF" stroke-width="13.6"')
        P.path(poly([(endx - 2, endy - 9), (endx + 10, endy - 10), (endx + 2, endy + 9), (endx - 4, endy + 9)]), 't2 i')
    for x in (840, 900):
        P.path(poly([(x, 668), (x + 30, 668), (x + 32, 694), (x + 2, 694)]), 't i')     # heat shield clamps

# ---------------------------------------------------------------- forward controls
with P.part('Forward controls', 'chassis', 'fwd-controls') as g_fc:
    peg = (624, 612)
    P.rect(peg[0] - 26, peg[1] - 7, 52, 14, 't2 o', rx=7)
    for x in range(peg[0] - 20, peg[0] + 22, 6):
        P.line((x, peg[1] - 5), (x, peg[1] + 5), 'f')
    P.path(poly([(peg[0] + 6, peg[1] - 2), (peg[0] + 58, peg[1] - 34), (peg[0] + 62, peg[1] - 28), (peg[0] + 10, peg[1] + 4)]), 't i')   # shift lever
    P.rect(peg[0] + 52, peg[1] - 40, 16, 9, 't2 i', rx=3)
    P.line((peg[0] + 30, peg[1] - 18), (800, 586), 'i')         # long shift rod
    P.line((peg[0] + 31, peg[1] - 14), (801, 590), 'f')
    P.circ(800, 588, 4, 'w i')

# ---------------------------------------------------------------- oil tank, rear fender, seat, sissy bar
with P.part('Oil tank', 'powertrain', 'oil-tank') as g_ot:
    P.path(cr([(990, 470), (1040, 466), (1046, 520), (1000, 528)], closed=True), 't o')
    P.circ(1018, 478, 6, 'w i')
with P.part('Rear fender', 'frame_body', 'rear-fender') as g_rf:
    P.path(arc_d(ra[0], ra[1], Rr + 12, 200, 340) + ' ' + arc_d(ra[0], ra[1], Rr + 4, 340, 200, move=False) + ' Z', 't o')
    tl = pol(ra[0], ra[1], Rr + 10, 336)
    P.path(cr([(tl[0] - 4, tl[1] - 10), (tl[0] + 18, tl[1] - 8), (tl[0] + 20, tl[1] + 6), (tl[0] - 2, tl[1] + 6)], closed=True), 'w o')
with P.part('Low stepped seat', 'frame_body', 'seat') as g_se:
    s = cr([(870, 330), (900, 356), (960, 374), (1010, 372), (1040, 350), (1090, 334), (1140, 336), (1150, 352), (1100, 362),
            (1040, 382), (980, 398), (900, 388), (868, 360)], closed=True)
    P.path(s, 't2 o')
    seat_stitch(P, [(898, 366), (960, 382), (1010, 380)])
    seat_stitch(P, [(1048, 358), (1096, 344), (1138, 344)])
P.underlay('b')
with P.part('Sissy bar', 'frame_body', 'sissy') as g_sb:
    P.tube(cr([(1128, 450), (1140, 340), (1150, 240), (1176, 214), (1196, 236), (1186, 340), (1172, 450)]), 9, key='b')
    P.path(cr([(1146, 260), (1180, 250), (1186, 316), (1150, 318)], closed=True), 't2 o')   # backrest pad

# ---------------------------------------------------------------- teardrop tank + dash
with P.part('Teardrop tank', 'frame_body', 'tank') as g_tk:
    tk = cr([(668, 246), (700, 214), (780, 206), (870, 236), (900, 286), (870, 318), (780, 314), (700, 290)], closed=True)
    P.path(tk, 't o')
    P.path(cr([(706, 226), (780, 216), (858, 240)]), 'n w', 'stroke="#FFFFFF" stroke-width="4"')
    # dash console with speedometer
    P.path(cr([(720, 210), (760, 196), (840, 204), (870, 222)]), 'n', 'stroke="#1E2B5E" stroke-width="12"')
    P.path(cr([(720, 210), (760, 196), (840, 204), (870, 222)]), 'n', 'stroke="#B9C7E3" stroke-width="7.6"')
    P.add('<ellipse cx="786" cy="196" rx="22" ry="7" class="w o"/>')
    P.path(cr([(740, 260), (790, 250), (840, 270), (820, 296), (760, 292)], closed=True), 'n i')   # tank badge panel

# ---------------------------------------------------------------- raked fork, headlight, bars
with P.part('Raked fork', 'chassis', 'fork') as g_fk:
    tele_fork(P, fa, FF(452, 0), w=22, slider_frac=0.3)
    for u, wd in ((380, 34), (446, 30)):
        P.path(FF.poly([(u - 9, -wd * 0.6), (u + 9, -wd * 0.6), (u + 9, 42), (u - 9, 42)]), 't o')
        P.bolt(*FF(u, 32), 3.4)
with P.part('Front mudguard', 'frame_body', 'front-mudguard') as g_fm:
    P.path(arc_d(fa[0], fa[1], Rf + 10, 228, 300) + ' ' + arc_d(fa[0], fa[1], Rf + 5, 300, 228, move=False) + ' Z', 'w o')
with P.part('Headlight', 'electrical', 'headlight') as g_hl:
    hc = FF(362, -48)
    headlight_round(P, hc, 40)
    P.line(FF(362, -10), (hc[0] + 16, hc[1]), 'o')
P.underlay('h')
with P.part('Pull-back bars', 'chassis', 'bars') as g_hb:
    top = FF(452, 0)
    P.tube(cr([(top[0] + 6, top[1] - 4), (top[0] + 2, top[1] - 40), (top[0] + 20, top[1] - 70), (top[0] + 70, top[1] - 82), (top[0] + 104, top[1] - 74)]), 9, key='h')
    grip(P, (top[0] + 96, top[1] - 78), 14, 48)
    lever(P, (top[0] + 66, top[1] - 80), 8, 64)
    mirror(P, (top[0] + 30, top[1] - 74), (top[0] + 46, top[1] - 104), rx=11, ry=15)
    cable(P, [(top[0] + 62, top[1] - 76), (top[0] + 30, top[1] - 40), (top[0] + 50, top[1] + 40), (660, 400), (710, 520)])

L(g_hb, (top[0] + 84, top[1] - 76), T2, 'Pull-back bars')
L(g_hl, (hc[0] - 14, hc[1] - 10), T1, 'Headlight')
L(g_fk, FF(250, -11), T1, 'Long raked fork')
L(g_tk, (860, 246), T1, 'Teardrop tank with dash')
L(g_ac, (850, 430), T2, 'Air cleaner')
L(g_pr, lerp((848, 600), Fr(148, 0), 0.5), T2, 'Pushrod tubes')
L(g_se, (1100, 340), T1, 'Low stepped seat')
L(g_sb, (1170, 230), T2, 'Sissy bar')
L(g_fd, (fa[0] - 30, fa[1] + 50), B1, '21 in front wheel and disc')
L(g_fc, (600, 612), B2, 'Forward controls')
L(g_en, Ff(40, -36), B1, '45° air-cooled V-twin')
L(g_pc, (900, 650), B2, 'Primary cover')
L(g_bt, (1010, 640), B1, 'Belt final drive')
L(g_ex, (1100, 672), B2, 'Shotgun exhaust')
L(g_rw, pol(ra[0], ra[1], Rr - 10, 320), B1, 'Fat rear tyre')

finish(P, labels)
