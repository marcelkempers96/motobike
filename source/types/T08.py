from tk import *

P, top, bot = new_plate('T08', 'T08 Touring motorcycle, left side elevation',
                        'Luxury tourer: frame-mounted fairing with adjustable windscreen and twin headlights, flat-six engine low in the frame, '
                        'shaft final drive in a single-sided swingarm, integrated hard panniers and top box with backrest, stepped two-up seat, '
                        'engine guards and rider footboards.')
C = 'touring'
F = (320, 612); RF, RIMF = 160, 114
R = (1170, 614); RR, RIMR = 156, 101
TOPC = (500, 300)
PIV = (880, 590)

ground(P)

# ---------------- rear wheel
with P.part('Rear wheel', C, 'rwheel') as g_rw:
    cast_wheel(P, R[0], R[1], RR, RIMR, 'S5', phase=-90)

# ---------------- swingarm with shaft drive
with P.part('Shaft drive', C, 'shaft') as g_sh:
    P.path(poly([(PIV[0], PIV[1] - 22), (1150, 594), (1150, 640), (PIV[0], PIV[1] + 22)]), 't o')
    P.path(poly(band((PIV[0] + 20, PIV[1] + 4), (1130, 618), 14)), 't2 i')
    P.circ(PIV[0], PIV[1], 18, 't o'); P.bolt(PIV[0], PIV[1], 9)
    # boot over universal joint
    for k in range(5):
        P.add('<ellipse cx="%s" cy="%s" rx="5" ry="16" class="t2 i"/>' % (f(905 + k * 9), f(PIV[1] + 2 + k * 0.5)))
    # final drive bevel case
    P.circ(R[0], R[1], 52, 't o')
    P.circ(R[0], R[1], 42, 'n f')
    for k in range(8):
        p = pol(R[0], R[1], 46, k * 45 + 10); P.bolt(p[0], p[1], 3.4)
    P.path(poly([(1110, 600), (1150, 590), (1150, 640), (1110, 636)]), 't2 i')
    P.bolt(R[0], R[1], 14)

# ---------------- exhaust mufflers (behind panniers, ahead of wheel)
with P.part('Twin silencers', C, 'silencer') as g_ex:
    P.path(cr([(700, 690), (800, 704), (900, 690), (960, 640)], closed=False), 'n o', 'style="stroke-width:16;stroke:#1E2B5E"')
    P.path(cr([(700, 690), (800, 704), (900, 690), (960, 640)], closed=False), 'n', 'style="stroke-width:12;stroke:#B9C7E3"')
    muf = [(950, 606), (1222, 576), (1266, 582), (1272, 608), (1228, 620), (960, 656), (940, 636)]
    P.path(poly(muf), 't o')
    P.path(poly([(1222, 576), (1266, 582), (1272, 608), (1228, 620)]), 't2 i')
    P.add('<ellipse cx="1266" cy="596" rx="5" ry="12" class="k"/>')
    P.path(poly([(972, 620), (1210, 594)], close=False), 'n f')
    P.path(poly([(976, 642), (1212, 610)], close=False), 'n f')
    for x in (1010, 1150):
        P.path(poly(band((x, 560), (x + 4, 616 - (x - 1010) * 0.1), 8)), 't2 i')

# ---------------- engine
with P.part('Flat-six engine', C, 'engine') as g_en:
    case = [(530, 600), (820, 596), (842, 640), (820, 690), (700, 704), (560, 696), (524, 650)]
    P.path(cr(case, True), 't o')
    P.path(cr([(540, 664), (700, 676), (830, 662)], closed=False), 'n f')
    # left cylinder bank head cover
    hc = [(508, 548), (800, 540), (828, 560), (826, 604), (800, 616), (510, 620), (494, 600), (494, 566)]
    P.path(cr(hc, True), 't o')
    P.path(cr([(512, 560), (800, 552), (814, 584), (800, 604), (512, 608)], closed=False), 'n f')
    for x in (580, 670, 760):
        P.circ(x, 584, 14, 't2 i'); P.circ(x, 584, 6, 'w f')
    for x in (530, 620, 712, 800):
        P.bolt(x, 568, 3.4); P.bolt(x, 602, 3.4)
    P.rect(640, 640, 64, 34, 't2 i', rx=8)   # alternator cover
    P.circ(800, 650, 22, 't2 i')            # clutch / reverse cover
    P.circ(800, 650, 8, 'w f')

# ---------------- engine guard
with P.part('Engine guard', C, 'guard') as g_eg:
    gd = [(560, 548), (500, 560), (478, 620), (500, 690), (560, 712)]
    P.path(cr(gd, closed=False), 'n o', 'style="stroke-width:12;stroke:#1E2B5E"')
    P.path(cr(gd, closed=False), 'n', 'style="stroke-width:8;stroke:#FFFFFF"')
    P.path(cr([(500, 690), (540, 700), (600, 704)], closed=False), 'n o', 'style="stroke-width:10;stroke:#1E2B5E"')
    P.path(cr([(500, 690), (540, 700), (600, 704)], closed=False), 'n', 'style="stroke-width:6;stroke:#FFFFFF"')

# ---------------- footboards
with P.part('Footboards', C, 'boards') as g_fb:
    P.path(poly([(730, 640), (842, 632), (848, 646), (736, 656)]), 't2 o')
    for x in range(742, 840, 12):
        P.line((x, 642), (x + 4, 650), 'f')
    P.path(poly(band((842, 640), (870, 624), 8)), 't i')
    P.path(poly([(890, 560), (930, 556), (932, 566), (892, 570)]), 't2 i')  # pillion peg

# ---------------- front wheel, brakes
with P.part('Front wheel', C, 'fwheel') as g_fw:
    cast_wheel(P, F[0], F[1], RF, RIMF, 'S5', phase=-90)
with P.part('Front disc', C, 'disc') as g_dc:
    disc(P, F[0], F[1], 80, 56, holes=False)
with P.part('Linked brakes', C, 'brakes') as g_br:
    radial_caliper(P, F[0], F[1], 80, -28, span=46)
    P.path(cr([pol(F[0], F[1], 98, -28), (430, 520), (450, 460), (470, 420)], closed=False), 'n i', 'style="stroke-width:3"')
    # linking valve / delay valve near fork
    P.rect(442, 470, 18, 26, 't2 i', rx=3)
with P.part('Front fork', C, 'fork') as g_fk:
    tele_fork(P, F, TOPC, w=30, slider_len=0.45)
with P.part('Front mudguard', C, 'mudguard') as g_mg:
    P.path(sector_d(F[0], F[1], RF + 4, RF + 20, -178, -40), 't o')
    P.path(arc_d(F[0], F[1], RF + 12, -170, -48), 'n f')
    P.path(poly(band(pol(F[0], F[1], RF + 12, -60), (F[0] + 20, F[1] - 40), 6)), 't2 i')

# ---------------- body: side covers and rear body
with P.part('Side cover', C, 'sidecover') as g_sc:
    sc = [(600, 330), (700, 352), (740, 412), (836, 432), (870, 520), (850, 560), (612, 556), (588, 470)]
    P.path(cr(sc, True), 't o')
    P.path(cr([(640, 380), (720, 420), (820, 450), (850, 520)], closed=False), 'n f')
    P.add('<ellipse cx="760" cy="500" rx="40" ry="16" class="t2 i"/>')
    P.path(poly([(800, 470), (848, 470), (860, 500)], close=False), 'n f')
with P.part('Rear body', C, 'rearbody') as g_rb:
    rb = [(852, 440), (930, 400), (1000, 398), (1004, 470), (996, 560), (900, 566), (858, 530)]
    P.path(cr(rb, True), 't o')
    P.path(cr([(880, 450), (960, 420), (996, 430)], closed=False), 'n f')
    P.path(sector_d(R[0], R[1], RR + 4, RR + 16, -175, -120), 't o')

# ---------------- hard panniers
with P.part('Hard pannier', C, 'pannier') as g_pn:
    pn = [(990, 400), (1250, 392), (1290, 412), (1300, 460), (1286, 548), (1240, 562), (1010, 566), (980, 540), (976, 440)]
    P.path(cr(pn, True), 't o')
    P.path(cr([(990, 440), (1150, 432), (1294, 440)], closed=False), 'n i')
    P.path(cr([(1000, 520), (1150, 530), (1290, 512)], closed=False), 'n f')
    P.rect(1200, 446, 26, 12, 't2 i', rx=3)
    P.rect(1270, 470, 16, 46, 'af f', rx=3)

# ---------------- seat and backrest
with P.part('Wide two-up seat', C, 'seat') as g_se:
    seat = [(640, 360), (700, 370), (760, 396), (820, 400), (880, 384), (920, 362), (1040, 354), (1060, 380), (980, 396), (900, 412), (820, 428), (720, 418), (650, 396)]
    P.path(cr(seat, True), 't2 o')
    P.path(cr([(700, 384), (800, 412), (880, 398)], closed=False), 'n f')
    P.path(cr([(920, 374), (1000, 370), (1050, 372)], closed=False), 'n f')
with P.part('Backrest', C, 'backrest') as g_bk:
    bk = [(1036, 276), (1066, 262), (1084, 280), (1080, 360), (1056, 372), (1040, 350)]
    P.path(cr(bk, True), 't2 o')
    P.path(cr([(1052, 290), (1068, 330), (1062, 360)], closed=False), 'n f')

# ---------------- top box
with P.part('Top box', C, 'topbox') as g_tb:
    tb = [(1070, 240), (1150, 214), (1250, 216), (1290, 244), (1296, 320), (1284, 380), (1100, 384), (1080, 350)]
    P.path(cr(tb, True), 't o')
    P.path(cr([(1076, 290), (1180, 280), (1294, 288)], closed=False), 'n i')
    P.rect(1250, 326, 40, 16, 'af f', rx=4)
    P.path(cr([(1110, 240), (1190, 226), (1260, 236)], closed=False), 'n f')
    P.rect(1180, 300, 22, 10, 't2 i', rx=2)

# ---------------- fairing
with P.part('Fairing with mirrors', C, 'fairing') as g_fa:
    fa = [(286, 438), (294, 390), (322, 336), (370, 292), (420, 272), (474, 268), (560, 296), (626, 320), (642, 380), (624, 470),
          (606, 548), (566, 566), (520, 548), (498, 470), (440, 446), (360, 440)]
    P.path(cr(fa, True), 't o')
    P.path(cr([(300, 420), (360, 410), (440, 420), (500, 450)], closed=False), 'n f')
    P.path(cr([(474, 268), (520, 340), (560, 440), (580, 540)], closed=False), 'n i')
    # radiator side vents in lower fairing
    for k in range(5):
        P.path(poly(band((540 + k * 10, 452 + k * 2), (556 + k * 10, 520 + k * 2), 5)), 'w f')
    # mirror pods with indicators
    pod = [(388, 286), (430, 250), (470, 252), (470, 274), (420, 292)]
    P.path(cr(pod, True), 't o')
    P.path(poly([(398, 284), (430, 262), (456, 262)], close=False), 'af', 'style="stroke:#C8502A;stroke-width:4;fill:none"')
with P.part('Twin headlights', C, 'headlights') as g_hl:
    for y0 in (0, 36):
        hl = [(298, 372 + y0), (322, 344 + y0), (360, 336 + y0), (362, 352 + y0), (326, 364 + y0), (304, 384 + y0)]
        P.path(poly(hl), 'w o')
        for k in range(3):
            P.circ(318 + k * 14, 360 + y0 - k * 5, 4, 't2 f')

# ---------------- windscreen
with P.part('Adjustable windscreen', C, 'screen') as g_ws:
    ws = [(372, 288), (394, 196), (430, 136), (488, 128), (500, 146), (474, 210), (468, 268)]
    P.path(cr(ws, True), 'w o')
    P.path(cr([(400, 250), (424, 180), (460, 146)], closed=False), 'n f')
    # height adjuster rails (hidden)
    P.path('M440 270 L470 170', 'h'); P.path('M452 272 L480 176', 'h')

# ---------------- handlebar
with P.part('Handlebar', C, 'bar') as g_hb:
    P.path(poly(band((520, 296), (590, 300), 10)), 't2 i')
    P.rect(570, 290, 42, 16, 't o', rx=6)
    P.path(poly(band((574, 306), (532, 318), 6)), 't i')

# ---------------- labels
P.label(g_ws, (440, 180), top, 'Adjustable windscreen')
P.label(g_fa, (430, 262), top, 'Fairing with mirrors')
P.label(g_hl, (330, 356), top, 'Twin headlights')
P.label(g_se, (800, 410), top, 'Wide two-up seat')
P.label(g_bk, (1060, 300), top, 'Backrest')
P.label(g_tb, (1190, 250), top, 'Top box')
P.label(g_br, pol(F[0], F[1], 86, -28), bot, 'Linked brakes')
P.label(g_eg, (482, 640), bot, 'Engine guard')
P.label(g_en, (670, 584), bot, 'Flat-six engine')
P.label(g_fb, (790, 646), bot, 'Footboards')
P.label(g_sh, (918, 592), bot, 'Shaft drive')
P.label(g_ex, (1100, 590), bot, 'Twin silencers')
P.label(g_pn, (1150, 480), bot, 'Hard pannier')

P.save(render=False)
import json
json.dump({'id': 'T08', 'labels': ['Adjustable windscreen', 'Fairing with mirrors', 'Twin headlights', 'Wide two-up seat', 'Backrest', 'Top box',
                                   'Linked brakes', 'Engine guard', 'Flat-six engine', 'Footboards', 'Shaft drive', 'Twin silencers', 'Hard pannier']},
          open('/home/claude/mc/figs/types/T08.parts.json', 'w'), indent=1)
