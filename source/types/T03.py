from t123lib import *

P = new_plate('T03', 'T03 Step-through underbone, 1958 onwards, left side elevation',
              'Super Cub type step-through: pressed-steel backbone, leg shield, horizontal single-cylinder four-stroke under the backbone, '
              'semi-automatic gearbox with centrifugal clutch, leading-link fork, enclosed chain, drum brakes, fuel tank under the seat and rear carrier.')
C = 'underbone'
F = (420, 610); R = (1220, 610)
RO, RI, RIM = 190, 150, 142
top = Col(58, 'T', ymin=260, pitch=30)
bot = Col(860, 'B', ymin=250, pitch=30)
L = Col(196, 'L', ymin=120, ymax=780, pitch=46)
Rc = Col(1424, 'R', ymin=120, ymax=780, pitch=46)
labels = []
def lab(g, a, col, t, sub=None, want=None):
    P.label(g, a, col, t, sub, want); labels.append(t)

# ---------------- wheels ----------------
with P.part('Spoked wheels', C, 'wheels') as g_wh:
    for c in (F, R):
        wire_wheel(P, c[0], c[1], RO, RI, RIM, 56, n=36, cross=36, tread='road', step=8)
with P.part('Drum brake', C, 'drums') as g_dr:
    tipF = drum_plate(P, F[0], F[1], 48, lever_ang=-40, lever_len=34)
    P.path(cr([tipF, (tipF[0] + 30, tipF[1] - 60), (520, 420), (560, 330)]), 'n i')
    tipR = drum_plate(P, R[0], R[1], 50, lever_ang=200, lever_len=36)
    P.line(tipR, (1060, 700), 'i')
lab(g_dr, pol(F[0], F[1], 40, 150), L, 'Drum brakes', '110 mm, cable front, rod rear')

# ---------------- front mudguard ----------------
with P.part('Front mudguard', C, 'fguard') as g_fg:
    P.path(arc_d(F[0], F[1], RO + 20, 188, 350) + ' ' + arc_d(F[0], F[1], RO + 8, 350, 188, move=False) + ' Z', 't o')
    P.path(arc_d(F[0], F[1], RO + 14, 192, 346), 'n f')

# ---------------- rear body, fender, carrier ----------------
with P.part('Rear body and fender', C, 'rbody') as g_rb:
    P.path(arc_d(R[0], R[1], RO + 18, 200, 330) + ' ' + arc_d(R[0], R[1], RO + 8, 330, 200, move=False) + ' Z', 't o')
    body = cr([(880, 430), (1000, 418), (1130, 420), (1200, 440), (1250, 470), (1240, 500), (1180, 492), (1080, 500), (960, 520), (890, 520)], closed=True)
    P.path(body, 't o')
    P.path(cr([(900, 446), (1120, 438), (1220, 470)]), 'n f')
    P.circ(940, 488, 9, 't2 i'); P.circ(940, 488, 3, 'w f')   # side cover knob
with P.part('Fuel tank under seat', C, 'tank') as g_tk:
    P.path(cr([(908, 432), (1060, 426), (1080, 450), (1066, 486), (920, 494), (902, 470)], closed=True), 'h')
    P.text(990, 470, 'FUEL 3 L', 'm', 'middle', 'style="font-size:10px"')
lab(g_tk, (1040, 450), top, 'Fuel tank under the seat', want=1040)

with P.part('Rear carrier', C, 'carrier') as g_ca:
    P.path(quad((1110, 380), (1350, 388), 7), 't o')
    P.path(quad((1130, 360), (1340, 368), 5), 't i')
    for x in (1150, 1200, 1250, 1300):
        P.line((x, 364), (x + 1, 384), 'f')
    P.line((1340, 388), (1300, 470), 'i'); P.line((1120, 384), (1110, 430), 'i')
    # tail light
    P.path(cr([(1300, 452), (1340, 448), (1346, 478), (1304, 484)], closed=True), 't2 o')
    P.line((1308, 466), (1340, 464), 'f')
lab(g_ca, (1300, 376), Rc, 'Rear carrier', 'built for loads')

with P.part('Dual seat', C, 'seat') as g_se:
    P.path(cr([(872, 404), (930, 388), (1060, 384), (1150, 392), (1190, 410), (1180, 428), (1040, 426), (900, 430)], closed=True), 't2 o')
    P.line((886, 414), (1176, 412), 'f', 'stroke-dasharray="2 4"')

# ---------------- twin shocks ----------------
with P.part('Twin rear shocks', C, 'shocks') as g_sh:
    bot_ = (R[0] - 10, R[1] - 32); top_ = (1150, 440)
    P.path(quad(bot_, top_, 16), 't i')
    shroud0 = pol(top_[0], top_[1], 0, 0)
    P.path(quad(top_, pol(top_[0], top_[1], 62, math.degrees(math.atan2(bot_[1] - top_[1], bot_[0] - top_[0]))), 26), 't o')
    mid = pol(top_[0], top_[1], 62, math.degrees(math.atan2(bot_[1] - top_[1], bot_[0] - top_[0])))
    coil_spring(P, mid, (bot_[0] - 6, bot_[1] - 24), 22, 7)
    P.circ(bot_[0], bot_[1], 7, 't2 i'); P.circ(top_[0], top_[1], 7, 't2 i')
lab(g_sh, (1180, 520), Rc, 'Twin rear shocks', 'covered upper spring')

# ---------------- enclosed chain case ----------------
CS = (872, 666); RS = (R[0], R[1])
with P.part('Enclosed chain case', C, 'chaincase') as g_cc:
    (u1, u2), (l1, l2) = ext_tangents(CS, 34, RS, 74)
    # order: upper tangent is the one with smaller y
    if u1[1] > l1[1]:
        (u1, u2), (l1, l2) = (l1, l2), (u1, u2)
    d = 'M%s L%s A74 74 0 0 1 %s L%s A34 34 0 0 1 %s Z' % (pt(u1), pt(u2), pt(l2), pt(l1), pt(u1))
    P.path(d, 't o')
    P.path('M%s L%s' % (pt(pol(u1[0], u1[1], 6, 90)), pt(pol(u2[0], u2[1], 6, 90))), 'n f')
    P.circ(RS[0], RS[1], 60, 'n i'); P.bolt(RS[0], RS[1], 10)
    for k in range(4):
        b = pol(RS[0], RS[1], 66, 30 + k * 80)
        P.circ(b[0], b[1], 3, 'w f')
    P.rect(1010, 640, 46, 16, 't2 i', rx=4)        # inspection cap
lab(g_cc, (1040, 664), bot, 'Enclosed chain case', 'chain runs in a dust-proof box', want=1080)

# ---------------- engine ----------------
Ck = (800, 640); ax = 188
with P.part('Horizontal single', C, 'engine') as g_en:
    b0 = pol(Ck[0], Ck[1], 40, ax); b1 = pol(Ck[0], Ck[1], 118, ax)
    P.path(quad(b0, b1, 58), 't o')
    fins(P, pol(Ck[0], Ck[1], 44, ax), ax, 72, 8, 86, 76, cls='t i')
    h1 = pol(Ck[0], Ck[1], 152, ax)
    P.path(quad(b1, h1, 70, 62), 't o')
    fins(P, b1, ax, 32, 4, 82, 74, cls='t2 i')
    # cam cover and spark plug on top of the head
    cc = pol(Ck[0], Ck[1], 140, ax)
    P.circ(cc[0], cc[1] + 4, 13, 't2 o'); P.circ(cc[0], cc[1] + 4, 5, 'w f')
    sp = (cc[0] + 16, cc[1] - 30)
    P.path(quad(sp, (sp[0] + 4, sp[1] - 22), 8), 'w i')
    P.path(cr([(sp[0] + 4, sp[1] - 22), (700, 540), (720, 500)]), 'n i')
    # crankcase
    P.path(cr([(744, 600), (800, 586), (870, 596), (902, 640), (890, 694), (830, 712), (760, 704), (734, 660)], closed=True), 't o')
    P.circ(806, 650, 46, 'n i')
    for k in range(9):
        b = pol(806, 650, 52, k * 40 + 12)
        P.bolt(b[0], b[1], 3.2, hexa=False)
    P.circ(806, 650, 18, 't2 i')
    P.text(806, 654, '50 cc', 'm', 'middle', 'style="font-size:10px"')
P.label(g_en, pol(Ck[0], Ck[1], 90, ax + 4), bot, 'Horizontal single', 'OHV four-stroke, 4.5 hp', want=640)
labels.append('Horizontal single')

with P.part('Centrifugal clutch', C, 'clutch') as g_cl:
    P.circ(842, 636, 40, 'h'); P.circ(842, 636, 26, 'h')
    for k in range(3):
        a = 30 + k * 120
        P.path(arc_d(842, 636, 33, a, a + 70), 'h')
lab(g_cl, pol(842, 636, 40, -40), top, 'Centrifugal clutch', 'far side, semi-automatic 3-speed', want=1230)

with P.part('Kick start', C, 'kick') as g_ks:
    P.path('M876 628 L930 690 L966 694', 'h', 'style="stroke-width:1.4"')
    P.rect(958, 686, 28, 12, 'n h', rx=3)
lab(g_ks, (944, 692), bot, 'Kick start', 'far side', want=1280)

with P.part('Exhaust', C, 'exhaust') as g_ex:
    e0 = pol(Ck[0], Ck[1], 142, ax + 12)
    P.tube(cr([(e0[0], e0[1] + 24), (e0[0] - 6, 712), (720, 740), (900, 744)]), 12, key='ex')
    P.underlay('ex')
    P.path('M890 728 H1130 q18 0 22 16 q-4 16 -22 16 H890 Z', 't o')
    P.path('M920 726 H1100 l-10 -8 H930 Z', 't2 i')
    for x in range(940, 1100, 16):
        P.circ(x, 722, 2, 'w f')

with P.part('Heel-and-toe gear pedal', C, 'gear') as g_gp:
    piv = (790, 708)
    P.path(cr([(738, 690), (piv[0], piv[1]), (842, 690)]), 'n o', 'style="stroke-width:8"')
    P.path(cr([(738, 690), (piv[0], piv[1]), (842, 690)]), 'n', 'style="stroke:#DCE4F2;stroke-width:4"')
    P.rect(728, 682, 22, 10, 't2 i', rx=3); P.rect(832, 682, 22, 10, 't2 i', rx=3)
    P.circ(piv[0], piv[1], 6, 't2 i')
    P.path(quad((760, 720), (850, 722), 10), 't2 o')     # footpeg bar
lab(g_gp, (740, 686), bot, 'Heel-and-toe gear pedal', 'no clutch lever on the bar', want=400)

# ---------------- pressed-steel backbone ----------------
with P.part('Pressed-steel backbone', C, 'backbone') as g_bb:
    bb = cr([(600, 336), (640, 330), (690, 440), (740, 540), (780, 566), (860, 548), (900, 470), (900, 432), (870, 434), (846, 520),
             (790, 540), (752, 522), (700, 420), (650, 340)], closed=True)
    P.path(bb, 't o')
    P.path(cr([(626, 344), (706, 470), (760, 532), (800, 548), (856, 528)]), 'n f')
    for p in ((700, 444), (812, 552)):
        P.circ(p[0], p[1], 4, 'w f')
lab(g_bb, (780, 552), top, 'Pressed-steel backbone', 'two stamped halves welded', want=760)

# ---------------- leading-link fork ----------------
stem_b = (594, 404)
with P.part('Leading-link fork', C, 'fork') as g_fk:
    piv = (464, 594)
    P.path(quad(stem_b, (piv[0] + 6, piv[1] - 6), 34, 24), 't o')
    P.path(quad((stem_b[0] - 4, stem_b[1] + 30), (piv[0] + 20, piv[1] - 44), 10), 'n h')
    coil_spring(P, (stem_b[0] - 22, stem_b[1] + 50), (piv[0] + 34, piv[1] - 70), 12, 7)
    P.path(quad(piv, (F[0], F[1]), 18, 14), 't2 o')       # leading link
    P.circ(piv[0], piv[1], 7, 't i'); P.circ(piv[0], piv[1], 3, 'w f')
    P.bolt(F[0], F[1], 10)
lab(g_fk, (530, 500), L, 'Leading-link fork', 'axle ahead of the pivot')

# ---------------- leg shield ----------------
with P.part('Leg shield', C, 'legshield') as g_ls:
    ls = cr([(600, 312), (640, 304), (676, 400), (704, 500), (714, 566), (680, 584), (630, 560), (612, 470), (596, 400), (586, 330)], closed=True)
    P.path(ls, 't o')
    P.path(cr([(612, 322), (652, 420), (680, 500), (694, 566)]), 'n f')
    P.path(cr([(600, 334), (624, 440), (642, 520), (650, 560)]), 'n f', 'stroke-dasharray="2 5"')
lab(g_ls, (672, 470), top, 'Leg shield', 'keeps rain and mud off the rider', want=560)

# ---------------- handlebar cowl and headlight ----------------
with P.part('Headlight and handlebar cowl', C, 'cowl') as g_cw:
    cw = cr([(532, 262), (600, 236), (700, 240), (726, 262), (712, 292), (620, 306), (548, 304)], closed=True)
    P.path(cw, 't o')
    P.path(cr([(544, 266), (530, 284), (546, 304)]), 'n i')
    P.path('M536 270 a14 22 0 0 0 0 40', 't2 o')            # headlight lens, side view
    P.path(quad((540, 290), (514, 294), 14), 't i')         # indicator stalk
    P.circ(510, 294, 8, 't2 i')
    P.path(cr([(624, 240), (650, 226), (688, 228), (700, 240)]), 't2 i')   # speedo hood
    P.path(quad((712, 268), (762, 276), 15), 't2 o')        # grip
    for k in range(1, 5):
        q = (714 + 10 * k, 268 + 1.6 * k)
        P.line((q[0], q[1] - 7), (q[0], q[1] + 7), 'f')
    P.path(quad((700, 262), (760, 252), 5, 3), 't i')        # brake lever
    P.path(quad(stem_b, (600, 300), 26), 't i')
lab(g_cw, (540, 290), L, 'Headlight cowl', 'lamp, speedo and bars in one')

# ---------------- centre stand ----------------
with P.part('Centre stand', C, 'stand') as g_cs:
    P.path(quad((930, 700), (1010, 712), 10), 't i')
    P.circ(930, 700, 6, 't2 i')

P.line((F[0] - RO - 18, F[1]), (F[0] + RO + 18, F[1]), 'c')
P.line((R[0] - RO - 18, R[1]), (R[0] + RO + 18, R[1]), 'c')
finish(P, labels)
