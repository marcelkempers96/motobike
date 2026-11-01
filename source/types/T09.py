from tk import *

P, top, bot = new_plate('T09', 'T09 Adventure motorcycle, left side elevation',
                        'Large adventure tourer: beak front mudguard and high mudguard, adjustable screen, hand guards, Telelever front suspension, '
                        'boxer twin with cylinder guards, crash bars and sump guard, shaft drive in a single-sided Paralever swingarm, '
                        'aluminium panniers on a luggage rack, 19/17 in spoked tubeless wheels with dual-purpose tyres.')
C = 'adventure'
F = (330, 591); RF, RIMF = 179, 133
R = (1170, 595); RR, RIMR = 175, 119
TOPC = (512, 216)
PIV = (836, 548)

ground(P)

# ---------------- rear wheel and Paralever
with P.part('Rear wheel', C, 'rwheel') as g_rw:
    wire_wheel(P, R[0], R[1], RR, RIMR, 'dual', n=40)
with P.part('Rear shock', C, 'rshock') as g_rs:
    shock(P, (930, 372), (970, 556), w=24, coils=9)
with P.part('Shaft drive in Paralever swingarm', C, 'shaft') as g_sh:
    sa = [(PIV[0], PIV[1] - 24), (1000, 560), (1132, 572), (1150, 610), (1000, 600), (PIV[0], PIV[1] + 22)]
    P.path(cr(sa, True), 't o')
    P.path(cr([(860, 548), (1000, 578), (1120, 590)], closed=False), 'n f')
    for x in (930, 1000, 1070):
        P.circ(x, 578 + (x - 930) * 0.08, 3, 'w f')
    # torque strut (parallelogram link)
    P.path(poly(band((870, 600), (1110, 640), 12)), 't2 o')
    P.circ(870, 600, 6, 'w i'); P.circ(1110, 640, 6, 'w i')
    # final drive housing
    P.circ(R[0], R[1], 56, 't o'); P.circ(R[0], R[1], 44, 'n f')
    for k in range(7):
        p = pol(R[0], R[1], 50, k * 51 + 20); P.bolt(p[0], p[1], 3.4)
    P.path(cr([(1110, 618), (1130, 650), (1170, 656), (1200, 640)], closed=False), 'n i')
    P.bolt(R[0], R[1], 14)
    P.circ(PIV[0], PIV[1], 18, 't o'); P.bolt(PIV[0], PIV[1], 8)

# ---------------- exhaust header under engine (silencer on far side)
with P.part('Exhaust header', C, 'header') as g:
    for o in (0, 10):
        P.path(cr([(500, 600 + o), (520, 680 + o), (620, 712), (760, 708 - o), (840, 690)], closed=False), 'n o', 'style="stroke-width:12;stroke:#1E2B5E"')
        P.path(cr([(500, 600 + o), (520, 680 + o), (620, 712), (760, 708 - o), (840, 690)], closed=False), 'n', 'style="stroke-width:8;stroke:#B9C7E3"')

# ---------------- engine: boxer twin
with P.part('Boxer twin', C, 'engine') as g_en:
    case = [(580, 470), (700, 452), (790, 470), (840, 520), (846, 600), (800, 660), (690, 676), (600, 660), (570, 600)]
    P.path(cr(case, True), 't o')
    P.path(cr([(600, 620), (700, 636), (820, 610)], closed=False), 'n f')
    P.circ(700, 560, 46, 't2 i'); P.circ(700, 560, 36, 'n f')
    for k in range(6):
        p = pol(700, 560, 41, k * 60); P.circ(p[0], p[1], 2.4, 'w f')
    P.path(cr([(760, 470), (830, 500), (846, 560)], closed=False), 'n f')  # gearbox joint
    # left cylinder and head sticking out sideways, seen end-on
    cyl = [(530, 506), (632, 498), (644, 520), (640, 610), (624, 624), (532, 628), (516, 610), (516, 520)]
    P.path(cr(cyl, True), 't o')
    for k in range(6):
        P.line((524, 530 + k * 14), (636, 526 + k * 14), 'f')
    P.circ(580, 566, 22, 't2 i')            # spark plug well
    P.circ(580, 566, 8, 'w i')
    for p in ((538, 518), (622, 514), (538, 614), (622, 612)):
        P.bolt(p[0], p[1], 3.6)
    # intake trumpet on top of head
    P.path(poly([(604, 498), (616, 450), (648, 448), (644, 500)]), 't2 i')

# ---------------- cylinder guard, crash bars, sump guard
with P.part('Cylinder guard', C, 'cylguard') as g_cg:
    cg = [(514, 512), (506, 566), (516, 624), (550, 640), (564, 636), (538, 612), (532, 566), (538, 520)]
    P.path(cr(cg, True), 't2 o')
    for y in (540, 570, 600):
        P.bolt(522, y, 3)
with P.part('Sump guard', C, 'sump') as g_sg:
    sg = [(560, 684), (700, 694), (840, 680), (860, 664), (850, 704), (700, 724), (570, 712)]
    P.path(cr(sg, True), 't o')
    for x in range(600, 840, 34):
        P.circ(x, 704 - abs(x - 700) * 0.04, 6, 'w f')

# ---------------- frame, airbox area, tank
with P.part('Frame', C, 'frame') as g_fr:
    for a, b in (((540, 300), (840, 470)), ((600, 330), (836, 530)), ((840, 430), (1100, 320)), ((840, 470), (1120, 352))):
        P.path(poly(band(a, b, 14)), 't i')
    P.path(cr([(816, 446), (858, 440), (872, 520), (866, 600), (822, 604), (812, 520)], True), 't2 o')  # pivot plate
    P.circ(842, 470, 4, 'w f'); P.circ(846, 600, 4, 'w f')
with P.part('Fuel tank', C, 'tank') as g_tk:
    tk_ = [(530, 262), (600, 236), (700, 236), (780, 262), (796, 302), (760, 330), (650, 336), (556, 330), (522, 298)]
    P.path(cr(tk_, True), 't o')
    P.path(cr([(560, 268), (680, 256), (770, 280)], closed=False), 'n f')
    P.path(poly([(600, 300), (740, 300), (760, 326)], close=False), 'n f')
    P.add('<ellipse cx="660" cy="240" rx="18" ry="5" class="t2 i"/>')
    # side radiator beneath tank front
    P.path(cr([(520, 330), (600, 340), (610, 440), (540, 450), (500, 400)], closed=True), 'x o')

# ---------------- seat, tail, luggage rack
with P.part('Seat', C, 'seat') as g_se:
    P.path(cr([(760, 292), (850, 302), (900, 300), (890, 318), (800, 324), (766, 314)], closed=True), 't2 o')
    P.path(cr([(890, 290), (960, 280), (1030, 278), (1036, 296), (960, 304), (896, 310)], closed=True), 't2 o')
with P.part('Luggage rack', C, 'rack') as g_lr:
    P.path(poly([(1020, 286), (1210, 280), (1214, 296), (1024, 302)]), 't o')
    for x in range(1040, 1210, 30):
        P.rect(x, 286, 16, 9, 'w f', rx=2)
    P.path(poly(band((1180, 296), (1180, 330), 8)), 't2 i')
    P.path(poly([(1212, 290), (1236, 292), (1234, 306), (1212, 304)]), 'af i')

# ---------------- aluminium pannier
with P.part('Aluminium pannier', C, 'pannier') as g_pn:
    P.path(poly([(1046, 330), (1284, 326), (1290, 548), (1050, 552)]), 't o')
    P.path(poly([(1046, 330), (1284, 326), (1286, 368), (1048, 372)]), 't2 i')
    for c_ in ((1046, 330), (1284, 326), (1290, 548), (1050, 552)):
        P.rect(c_[0] - 10, c_[1] - 10, 20, 20, 'k', rx=4)
    for y in (380, 540):
        for x in range(1066, 1280, 18):
            P.circ(x, y - (x - 1066) * 0.017, 1.4, 'k')
    P.rect(1080, 356, 18, 24, 't2 i', rx=3); P.rect(1236, 354, 18, 24, 't2 i', rx=3)
    P.path(poly([(1060, 470), (1276, 466)], close=False), 'n f')
    # pannier frame mount
    P.path(poly(band((1040, 360), (1040, 540), 8)), 't2 i')

# ---------------- front wheel and brakes
with P.part('Spoked tubeless wheel', C, 'fwheel') as g_fw:
    wire_wheel(P, F[0], F[1], RF, RIMF, 'dual', n=40)
with P.part('Front disc', C, 'disc') as g_dc:
    disc(P, F[0], F[1], 84, 60)
with P.part('Radial caliper', C, 'caliper') as g_ca:
    radial_caliper(P, F[0], F[1], 84, -24)
with P.part('High front mudguard', C, 'mudguard') as g_mg:
    P.path(sector_d(F[0], F[1], RF + 4, RF + 14, -150, -70), 't o')

# ---------------- Telelever front suspension
with P.part('Telelever front suspension', C, 'telelever') as g_tl:
    tele_fork(P, F, TOPC, w=32, slider_len=0.5)
    br = along(TOPC, F, 0.56)
    # longitudinal A-arm from engine to fork bridge
    P.path(poly([(br[0] + 8, br[1] - 12), (612, 470), (616, 494), (br[0] + 10, br[1] + 12)]), 't2 o')
    P.circ(br[0] + 8, br[1], 8, 't i'); P.circ(612, 482, 8, 't i'); P.circ(612, 482, 3, 'w f')
    # central shock from A-arm to frame
    shock(P, (560, 360), (520, br[1] - 4), w=20, coils=7)
    for t in (0.0, 0.2):
        c_ = along(TOPC, F, t)
        P.path(poly(band((c_[0] - 18, c_[1] - 6), (c_[0] + 34, c_[1] + 16), 14)), 't2 o')

# ---------------- beak, headlight, screen
with P.part('Beak mudguard', C, 'beak') as g_bk:
    bk = [(520, 330), (470, 340), (404, 358), (376, 372), (392, 380), (470, 372), (520, 366)]
    P.path(cr(bk, True), 't o')
    P.path(cr([(400, 370), (470, 360), (516, 350)], closed=False), 'n f')
    for k in range(3):
        P.path(poly(band((444 + k * 18, 360 - k * 2), (456 + k * 18, 368 - k * 2), 4)), 'w f')
with P.part('Headlight', C, 'headlight') as g_hl:
    hl = [(452, 268), (490, 252), (530, 262), (534, 318), (494, 334), (456, 320)]
    P.path(cr(hl, True), 't o')
    P.path(cr([(464, 278), (494, 266), (522, 274), (524, 310), (494, 322), (466, 310)], closed=True), 'w i')
    P.path('M478 284 L512 280 M478 300 L512 298', 'n f')
    P.circ(495, 290, 7, 't2 f')
with P.part('Adjustable screen', C, 'screen') as g_ws:
    ws = [(466, 258), (474, 200), (500, 152), (566, 136), (578, 152), (550, 214), (532, 262)]
    P.path(cr(ws, True), 'w o')
    P.path(cr([(494, 236), (508, 180), (536, 156)], closed=False), 'n f')
    P.circ(528, 200, 6, 't2 i')  # adjuster knob

with P.part('Crash bars', C, 'crash') as g_cb:
    for pts in ([(640, 452), (548, 470), (512, 556), (522, 646), (600, 680)], [(612, 330), (546, 348), (520, 420), (556, 462)]):
        P.path(cr(pts, closed=False), 'n o', 'style="stroke-width:12;stroke:#1E2B5E"')
        P.path(cr(pts, closed=False), 'n', 'style="stroke-width:8;stroke:#DCE4F2"')
    for p in ((640, 452), (600, 680), (612, 330), (556, 462)):
        P.circ(p[0], p[1], 5, 't2 i')

# ---------------- bars and hand guards
with P.part('Hand guards', C, 'handguards') as g_hg:
    P.path(poly(band((540, 220), (620, 214), 10)), 't2 i')
    P.rect(596, 206, 40, 16, 't o', rx=6)
    hg = [(616, 184), (586, 188), (560, 204), (566, 224), (600, 218), (624, 212), (640, 200)]
    P.path(cr(hg, True), 't o')
    P.path(poly(band((584, 220), (540, 236), 6)), 't i')
    mirror(P, (560, 210), (540, 152), 22, 14, -12)

# ---------------- labels
P.label(g_ws, (512, 190), top, 'Adjustable screen')
P.label(g_hg, (600, 202), top, 'Hand guards')
P.label(g_bk, (430, 366), top, 'Beak mudguard')
P.label(g_cb, (524, 404), top, 'Crash bars')
P.label(g_lr, (1110, 290), top, 'Luggage rack')
P.label(g_pn, (1170, 430), top, 'Aluminium pannier')
P.label(g_tl, along(TOPC, F, 0.72), bot, 'Telelever front suspension')
P.label(g_fw, pol(F[0], F[1], RIMF - 30, 130), bot, 'Spoked tubeless wheel')
P.label(g_fw, pol(F[0], F[1], RF - 4, 95), bot, 'Dual-purpose tyre')
P.label(g_cg, (510, 590), bot, 'Cylinder guard')
P.label(g_en, (584, 604), bot, 'Boxer twin')
P.label(g_sg, (700, 712), bot, 'Sump guard')
P.label(g_sh, (1010, 590), bot, 'Shaft drive, Paralever')

P.save(render=False)
import json
json.dump({'id': 'T09', 'labels': ['Adjustable screen', 'Hand guards', 'Beak mudguard', 'Crash bars', 'Luggage rack', 'Aluminium pannier',
                                   'Telelever front suspension', 'Spoked tubeless wheel', 'Dual-purpose tyre', 'Cylinder guard', 'Boxer twin',
                                   'Sump guard', 'Shaft drive, Paralever']},
          open('/home/claude/mc/figs/types/T09.parts.json', 'w'), indent=1)
