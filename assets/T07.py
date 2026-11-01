from tk import *

P, top, bot = new_plate('T07', 'T07 Superbike, left side elevation, fairing cut away over the radiator and cylinder head',
                        'Litre-class sport bike: full fairing with ram-air intake, twin-spar aluminium frame, liquid-cooled inline-four, '
                        'upside-down fork, radial calipers on twin discs, aluminium swingarm with monoshock linkage, short side silencer.')
C = 'superbike'
F = (330, 596); RF, RIMF = 174, 125
R = (1145, 584); RR, RIMR = 186, 125
PIV = (812, 552)
TOPC = (495, 226)
CR = (720, 604)

ground(P)

# ---------------- rear wheel, sprocket, chain
with P.part('Rear wheel', C, 'rwheel') as g_rw:
    cast_wheel(P, R[0], R[1], RR, RIMR, 'Y3', phase=-80)
with P.part('Rear hugger', C, 'hugger') as g:
    P.path(sector_d(R[0], R[1], RR + 3, RR + 13, -160, -100), 't o')
with P.part('Drive chain', C, 'chain') as g_ch:
    sprocket(P, R[0], R[1], 66, 42)
    chain(P, (772, 578), 21, R, 66)
    sprocket(P, 772, 578, 21, 16, carrier=False)

# ---------------- swingarm
with P.part('Aluminium swingarm', C, 'swingarm') as g_sa:
    sa = [(PIV[0] - 8, 528), (900, 528), (1010, 548), (1110, 566), (1162, 572), (1162, 598), (1110, 602), (1000, 598), (900, 590), (PIV[0] - 8, 578)]
    smooth(P, sa, 't o')
    # underslung brace
    P.path(cr([(850, 586), (930, 640), (1010, 646), (1090, 604)], closed=False), 'n o', 'style="stroke-width:9;stroke:#1E2B5E"')
    P.path(cr([(850, 586), (930, 640), (1010, 646), (1090, 604)], closed=False), 'n', 'style="stroke-width:5;stroke:#DCE4F2"')
    for x in (930, 1010):
        P.line((x, 600), (x, 638), 'i')
    P.path(cr([(845, 540), (950, 542), (1100, 576)], closed=False), 'n f')
    P.rect(1124, 572, 30, 22, 't2 i', rx=3)  # chain adjuster
    P.line((1128, 583), (1150, 583), 'f')
    P.circ(PIV[0], PIV[1], 17, 't o'); P.bolt(PIV[0], PIV[1], 9)

# ---------------- monoshock + linkage
with P.part('Monoshock and linkage', C, 'shock') as g_sh:
    shock(P, (838, 438), (868, 592), w=28, coils=8)
    P.path(poly([(866, 592), (912, 622), (858, 640)]), 't2 o')
    P.circ(866, 592, 5, 'w i'); P.circ(912, 622, 5, 'w i'); P.circ(858, 640, 5, 'w i')
    P.path(poly(band((858, 640), (812, 610), 10)), 't i')
    P.circ(*pol(870, 620, 0, 0), 0.1, 'n')

# ---------------- exhaust headers (behind fairing)
with P.part('Exhaust headers', C, 'headers') as g_hd:
    for o in (0, 9):
        P.path(cr([(588 + o, 432), (566 + o, 520), (585 + o, 640), (640 + o, 696), (770, 704 + o * 0.4)], closed=False), 'n o', 'style="stroke-width:13;stroke:#1E2B5E"')
        P.path(cr([(588 + o, 432), (566 + o, 520), (585 + o, 640), (640 + o, 696), (770, 704 + o * 0.4)], closed=False), 'n', 'style="stroke-width:9;stroke:#B9C7E3"')

# ---------------- engine
with P.part('Inline-four engine', C, 'engine') as g_en:
    case = [(612, 566), (660, 534), (765, 526), (806, 560), (808, 646), (770, 694), (650, 696), (606, 652)]
    smooth(P, case, 't o')
    P.path(cr([(616, 640), (700, 652), (800, 640)], closed=False), 'n f')
    # generator cover and starter clutch cover
    P.circ(CR[0], CR[1], 46, 't o'); P.circ(CR[0], CR[1], 38, 'n f')
    for k in range(6):
        p = pol(CR[0], CR[1], 41, k * 60 + 15); P.circ(p[0], p[1], 2.4, 't2 f')
    P.path(cr([(640, 600), (660, 580), (676, 600), (660, 622)], closed=True), 't2 i')
    # oil filter and sump
    P.rect(628, 652, 34, 30, 't2 i', rx=4)
    for y in (658, 664, 670, 676):
        P.line((630, y), (660, y), 'f')
    # cylinder block, inclined 30 deg forward
    u = (-0.5, -0.866); n_ = (0.866, -0.5)
    def ax(t, s):
        return (CR[0] + u[0] * t + n_[0] * s, CR[1] + u[1] * t + n_[1] * s)
    blk = [ax(62, -46), ax(150, -46), ax(150, 46), ax(62, 46)]
    P.path(poly(blk), 't o')
    for t in range(72, 148, 9):
        P.line(ax(t, -40), ax(t, 40), 'f')
    head = [ax(150, -54), ax(200, -54), ax(206, -40), ax(206, 44), ax(150, 50)]
    P.path(poly(head), 't o')
    cam = [ax(206, -46), ax(232, -42), ax(236, -20), ax(236, 30), ax(206, 40)]
    P.path(poly(cam), 't2 o')
    for s in (-28, -8, 12, 28):
        P.bolt(*ax(226, s), r=3.4)
    # throttle bodies and injector into airbox
    tb = [ax(172, 52), ax(172, 84), ax(196, 84), ax(196, 50)]
    P.path(poly(tb), 't2 i')
    P.circ(*ax(184, 92), 7, 't i')

# ---------------- airbox, throttle bodies, gearbox (seen between frame and fairing)
with P.part('Airbox', C, 'airbox') as g_ab:
    ab = [(596, 300), (700, 300), (772, 312), (804, 360), (800, 420), (760, 430), (690, 410), (640, 388), (606, 350)]
    P.path(poly(ab), 't2 o')
    P.path(poly([(620, 330), (700, 322), (780, 336)], close=False), 'n f')
    for k in range(4):
        x = 650 + k * 30
        P.rect(x, 404 + k * 6, 20, 44, 't i', rx=3, extra='transform="rotate(-25 %s %s)"' % (x + 10, 426 + k * 6))
        P.circ(x + 6, 404 + k * 6, 4, 'w f')
    P.path(cr([(700, 470), (760, 452), (800, 470), (810, 540), (790, 566), (730, 540)], closed=True), 't o')
    P.circ(772, 506, 16, 't2 i'); P.circ(772, 506, 6, 'w f')
    P.path(cr([(700, 470), (740, 520), (800, 540)], closed=False), 'n f')
    P.path(cr([(610, 360), (640, 420), (700, 470)], closed=False), 'n o', 'style="stroke-width:10;stroke:#1E2B5E"')
    P.path(cr([(610, 360), (640, 420), (700, 470)], closed=False), 'n', 'style="stroke-width:6;stroke:#DCE4F2"')

# ---------------- radiator
with P.part('Radiator', C, 'radiator') as g_rad:
    rad = [(547, 336), (575, 330), (598, 420), (606, 520), (592, 572), (566, 570), (566, 470), (552, 400)]
    smooth(P, rad, 'x o')
    P.path(cr([(560, 345), (582, 430), (588, 560)], closed=False), 'n i')
    P.circ(600, 336, 7, 't i')  # filler neck

# ---------------- frame
with P.part('Twin-spar aluminium frame', C, 'frame') as g_fr:
    spar = [(512, 280), (580, 284), (650, 298), (720, 326), (782, 372), (826, 440), (846, 520), (846, 606), (806, 610), (808, 520), (796, 470), (762, 418), (708, 374), (640, 340), (574, 322), (512, 318)]
    smooth(P, spar, 't o')
    P.path(cr([(530, 302), (640, 320), (735, 362), (800, 430), (822, 500), (822, 600)], closed=False), 'n f')
    P.path(cr([(560, 290), (650, 306), (730, 342)], closed=False), 'n f')
    for p in ((690, 340), (760, 390), (812, 470), (826, 560)):
        P.circ(p[0], p[1], 3.2, 'w f')
    # steering head
    hs = [(TOPC[0] + 8, TOPC[1] + 18), (TOPC[0] + 52, TOPC[1] + 36), (TOPC[0] + 20, TOPC[1] + 118), (TOPC[0] - 20, TOPC[1] + 100)]
    P.path(poly(hs), 't2 o')
    # subframe
    for a, b in (((830, 410), (1100, 300)), ((842, 470), (1060, 320))):
        P.path(poly(band(a, b, 12)), 't i')

# ---------------- fuel tank
with P.part('Fuel tank', C, 'tank') as g_tk:
    tank = [(538, 264), (560, 216), (604, 194), (700, 190), (764, 210), (800, 250), (796, 264), (720, 280), (630, 292), (556, 294)]
    P.path(poly(tank), 't o')
    P.path(poly([(576, 222), (612, 204), (700, 202), (756, 220), (784, 252)], close=False), 'n f')
    P.path(poly([(620, 270), (690, 256), (752, 262)], close=False), 'n f')
    P.path(poly([(690, 256), (712, 230), (760, 236)], close=False), 'n f')
    P.add('<ellipse cx="650" cy="196" rx="16" ry="5" class="t2 i"/>')

# ---------------- seat and tail
with P.part('Rider seat', C, 'seat') as g_se:
    P.path(cr([(790, 258), (840, 262), (920, 270), (956, 280), (944, 292), (860, 290), (798, 284), (784, 272)], closed=True), 't2 o')
with P.part('Tail and pillion seat cowl', C, 'tail') as g_tl:
    tail = [(944, 280), (1060, 250), (1236, 226), (1244, 240), (1236, 252), (1150, 270), (1040, 302), (960, 328), (896, 336), (870, 314), (900, 294)]
    P.path(poly(tail), 't o')
    cowl = [(986, 266), (1020, 244), (1112, 230), (1122, 240), (1060, 254)]
    P.path(poly(cowl), 't2 i')
    P.path(poly([(930, 314), (1040, 286), (1170, 258)], close=False), 'n f')
    for k in range(3):
        P.line((1000 + k * 22, 300 - k * 6), (1014 + k * 22, 286 - k * 6), 'f')
    P.path(poly([(1232, 234), (1250, 236), (1246, 252), (1232, 250)]), 'af i')
    # licence plate hanger
    P.path(poly(band((1170, 284), (1222, 360), 8)), 't2 i')
    P.rect(1206, 356, 34, 52, 'w i', rx=3)
    P.path(poly(band((1196, 330), (1236, 318), 5)), 't i')
    P.add('<ellipse cx="1240" cy="317" rx="8" ry="5" class="af i"/>')

# ---------------- rear-sets
with P.part('Rear-sets', C, 'rearsets') as g_rs:
    hanger = [(842, 506), (898, 520), (906, 552), (870, 572), (840, 556)]
    smooth(P, hanger, 't2 o')
    for p in ((852, 520), (888, 534), (862, 558)):
        P.circ(p[0], p[1], 3.6, 'w f')
    P.rect(872, 528, 44, 14, 't i', rx=7)
    for x in range(878, 914, 6):
        P.line((x, 530), (x, 540), 'f')
    # gear lever and linkage rod
    P.path(poly(band((870, 552), (812, 538), 8)), 't i')
    P.path(poly(band((812, 538), (812, 524), 6)), 't2 i')
    P.path(poly(band((842, 558), (786, 572), 4)), 't2 f')

# ---------------- front wheel, disc, caliper
with P.part('Front wheel', C, 'fwheel') as g_fw:
    cast_wheel(P, F[0], F[1], RF, RIMF, 'Y3', phase=-100)
with P.part('Twin floating discs', C, 'disc') as g_dc:
    disc(P, F[0], F[1], 93, 66)
with P.part('Radial caliper', C, 'caliper') as g_cal:
    radial_caliper(P, F[0], F[1], 93, -22)
    P.path(cr([pol(F[0], F[1], 112, -22), (470, 470), (486, 380), (500, 300)], closed=False), 'n i', 'style="stroke-width:3"')
with P.part('Front mudguard', C, 'mudguard') as g:
    P.path(sector_d(F[0], F[1], RF + 4, RF + 15, -150, -62), 't o')
    P.path(arc_d(F[0], F[1], RF + 9, -140, -70), 'n f')

# ---------------- USD fork
with P.part('Upside-down fork', C, 'fork') as g_fk:
    usd_fork(P, F, TOPC, w_out=34, w_in=22, outer_len=0.6)
    for t in (0.0, 0.2):
        c = along(TOPC, F, t)
        P.path(poly(band((c[0] - 22, c[1] - 8), (c[0] + 46, c[1] + 22), 18)), 't2 o')
        P.bolt(c[0] + 26, c[1] + 12, 4)

# ---------------- fairing (with cut-away window)
with P.part('Full fairing', C, 'fairing') as g_fa:
    outer = [(350, 356), (372, 318), (416, 292), (456, 270), (540, 280), (570, 302), (612, 352), (652, 422), (702, 502), (760, 590), (812, 674),
             (798, 706), (662, 714), (602, 688), (558, 612), (532, 528), (502, 456), (440, 420), (382, 398)]
    hole = [(548, 336), (582, 338), (616, 398), (634, 470), (614, 544), (570, 556), (548, 470)]
    P.path(poly(outer) + ' ' + cr(hole, True), 't o', 'fill-rule="evenodd"')
    P.path(cr(hole, True), 'h')
    # panel seams and vents
    P.path(poly([(424, 300), (470, 352), (520, 410), (560, 470)], close=False), 'n i')
    P.path(poly([(612, 352), (590, 330)], close=False), 'n f')
    P.path(poly([(560, 600), (640, 600), (720, 560), (770, 600)], close=False), 'n i')
    for k in range(4):
        P.path(poly(band((664 + k * 20, 618 + k * 2), (690 + k * 20, 660 + k * 2), 6)), 'w f')
    P.path(poly([(610, 690), (700, 700), (796, 694)], close=False), 'n f')
    for p in ((470, 300), (640, 700), (760, 700), (545, 520)):
        P.circ(p[0], p[1], 2.6, 't2 f')
    # headlight and position light
    hl = [(358, 348), (374, 322), (414, 298), (426, 306), (390, 336), (366, 356)]
    P.path(poly(hl), 'w o')
    P.path(poly([(372, 334), (412, 306)], close=False), 'n f')
    P.path(poly([(398, 346), (436, 318), (444, 328), (404, 354)]), 't2 i')
    # ram-air intake
    intake = [(358, 364), (372, 358), (394, 382), (380, 390)]
    P.path(poly(intake), 'k')
    for k in range(3):
        P.line((364 + k * 6, 366 + k * 6), (376 + k * 6, 360 + k * 6), 'n', 'style="stroke:#B9C7E3;stroke-width:1"')
    # ram-air duct (hidden)
    P.path(cr([(388, 380), (440, 352), (510, 310), (560, 294), (630, 300)], closed=False), 'h')
    # mirror with integrated indicator
    mirror(P, (452, 272), (432, 244), 24, 13, -10)
    P.add('<ellipse cx="420" cy="250" rx="7" ry="3.5" class="af f"/>')

# ---------------- windscreen
with P.part('Windscreen', C, 'screen') as g_ws:
    scr = [(438, 278), (470, 222), (506, 196), (546, 206), (528, 262), (480, 270)]
    smooth(P, scr, 'w o')
    P.path(cr([(470, 250), (500, 214), (530, 208)], closed=False), 'n f')

# ---------------- clip-ons
with P.part('Clip-on bars', C, 'clipons') as g_co:
    P.path(poly(band((506, 236), (582, 252), 10)), 't2 i')
    P.rect(546, 238, 40, 16, 't o', rx=6, extra='transform="rotate(12 566 246)"')
    for x in range(552, 584, 5):
        P.line((x, 241 + (x - 546) * 0.21), (x - 1, 254 + (x - 546) * 0.21), 'f')
    P.path(poly(band((546, 252), (494, 270), 6)), 't i')
    P.circ(512, 236, 9, 't2 i')

# ---------------- short side silencer
with P.part('Short side silencer', C, 'silencer') as g_ex:
    P.path(cr([(770, 704), (812, 694), (842, 676)], closed=False), 'n o', 'style="stroke-width:14;stroke:#1E2B5E"')
    P.path(cr([(770, 704), (812, 694), (842, 676)], closed=False), 'n', 'style="stroke-width:10;stroke:#B9C7E3"')
    sil = [(832, 664), (940, 612), (966, 616), (980, 646), (872, 700), (842, 698)]
    P.path(poly(sil), 't o')
    P.path(poly([(940, 612), (966, 616), (980, 646), (958, 642)]), 't2 i')
    P.path(poly([(862, 652), (930, 622), (940, 640), (872, 672)]), 't2 f')
    P.circ(964, 640, 7, 'k')
    P.path(poly(band((850, 676), (958, 628), 2)), 'n f')
    for p in ((870, 668), (930, 640)):
        P.bolt(p[0], p[1], 3.5)

# ---------------- side stand
with P.part('Side stand', C, 'stand') as g:
    P.path(poly(band((790, 700), (748, 766), 10)), 't2 i')
    P.rect(732, 762, 30, 7, 't2 i', rx=2)

# ---------------- labels
P.label(g_ws, (500, 214), top, 'Windscreen')
P.label(g_co, (566, 246), top, 'Clip-ons')
P.label(g_fa, (420, 330), top, 'Full fairing')
P.label(g_fa, (376, 374), top, 'Ram-air intake')
P.label(g_rad, (566, 460), top, 'Radiator')
P.label(g_en, (612, 420), top, 'Inline-four (cut-away)')
P.label(g_fr, (720, 340), top, 'Twin-spar frame')
P.label(g_tl, (1060, 244), top, 'Pillion seat cowl')
P.label(g_fk, along(TOPC, F, 0.45), bot, 'USD fork')
P.label(g_dc, pol(F[0], F[1], 84, 120), bot, 'Twin floating discs')
P.label(g_cal, pol(F[0], F[1], 100, -22), bot, 'Radial caliper')
P.label(g_rs, (900, 535), bot, 'Rear-sets')
P.label(g_ex, (900, 650), bot, 'Short side silencer')
P.label(g_sh, (856, 520), bot, 'Monoshock and linkage')
P.label(g_sa, (1040, 590), bot, 'Aluminium swingarm')

P.save(render=False)
import json
json.dump({'id': 'T07', 'labels': ['Windscreen', 'Clip-ons', 'Full fairing', 'Ram-air intake', 'Radiator', 'Inline-four (cut-away)', 'Twin-spar frame',
                                   'Pillion seat cowl', 'USD fork', 'Twin floating discs', 'Radial caliper', 'Rear-sets', 'Short side silencer',
                                   'Monoshock and linkage', 'Aluminium swingarm']},
          open('/home/claude/mc/figs/types/T07.parts.json', 'w'), indent=1)
