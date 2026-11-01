from t123lib import *

P = new_plate('T01', 'T01 Pioneer motor-bicycle, c. 1894 to 1905, left side elevation',
              'A bicycle-derived diamond frame with a small air-cooled single-cylinder engine mounted low in the frame, '
              'surface carburettor and fuel tank under the top tube, flat leather belt to a rim on the rear wheel, pedals, sprung saddle and spoon brake.')
C = 'pioneer'
F = (430, 595); R = (1150, 595)
RO, RI, RIM = 205, 184, 174
top = Col(62, 'T', ymin=230, pitch=26)
bot = Col(858, 'B', ymin=230, pitch=26)
L = Col(196, 'L', ymin=120, ymax=780, pitch=40)
Rc = Col(1404, 'R', ymin=120, ymax=780, pitch=40)
labels = []
def lab(g, a, col, t, sub=None, want=None):
    P.label(g, a, col, t, sub, want); labels.append(t)

# ---------------- mudguards (behind wheels) ----------------
with P.part('Mudguards', C, 'guards') as g_mg:
    for (c, a0, a1) in ((F, 200, 330), (R, 195, 345)):
        P.path(arc_d(c[0], c[1], RO + 14, a0, a1) + ' ' + arc_d(c[0], c[1], RO + 8, a1, a0, move=False) + ' Z', 't i')
    P.line(pol(F[0], F[1], RO + 11, 330), (512, 400), 'f')
    P.line(pol(R[0], R[1], RO + 11, 200), (1090, 470), 'f')

# ---------------- wheels ----------------
with P.part('Clincher tyre', C, 'wheels') as g_wh:
    for c in (F, R):
        wire_wheel(P, c[0], c[1], RO, RI, RIM, 20, n=32, cross=40, tread='smooth')
        P.bolt(c[0], c[1], 8)
lab(g_wh, pol(F[0], F[1], RO - 8, 200), L, 'Clincher tyre', '28 x 1⅝ in, beaded edge')

# rear belt rim (V/flat-belt pulley clipped to the spokes)
with P.part('Belt rim', C, 'beltrim') as g_br:
    P.path(ring_d(R[0], R[1], 152, 140), 't2 o', 'fill-rule="evenodd"')
    P.circ(R[0], R[1], 146, 'n f')
    for k in range(10):
        a = k * 36 + 8
        p0 = pol(R[0], R[1], 140, a); p1 = pol(R[0], R[1], 128, a)
        P.path(quad(p0, p1, 6), 't i')
        P.circ(p1[0], p1[1], 2.2, 'w f')
lab(g_br, pol(R[0], R[1], 150, -30), Rc, 'Belt rim', 'pulley clipped to the spokes')

# ---------------- frame ----------------
Ht, Hb = (545, 300), (518, 378)
S = (880, 318); BB = (838, 672); E = (735, 640)
DTe = (700, 598)
with P.part('Diamond frame', C, 'frame') as g_fr:
    P.underlay('frame')
    P.tube('M%s L%s' % (pt(Ht), pt(S)), 9)                    # top tube
    P.tube('M%s L%s' % (pt((Hb[0] + 4, Hb[1] - 6)), pt(DTe)), 10)   # down tube
    P.tube('M%s L%s' % (pt(BB), pt((S[0] + 2, S[1] + 6))), 10)   # seat tube
    P.tube('M%s L%s' % (pt(BB), pt(R)), 8)                    # chain stay
    P.tube('M%s L%s' % (pt(S), pt(R)), 7)                     # seat stay
    P.tube('M%s L%s' % (pt(Ht), pt(Hb)), 15)                  # head tube
    # engine cradle plates joining down tube, crankcase and bottom bracket
    P.path(cr([(694, 590), (768, 608), (842, 650), (846, 690), (790, 694), (722, 690), (690, 640)], closed=True), 't o')
    for p in ((706, 612), (760, 622), (828, 664), (806, 684), (722, 676)):
        P.circ(p[0], p[1], 3.2, 'w f')
    # brazed lugs
    for c in (Ht, Hb, S):
        P.circ(c[0], c[1], 9, 't i')
    P.circ(R[0], R[1], 13, 't i')
lab(g_fr, (720, 312), top, 'Diamond frame', want=760)

# ---------------- fork ----------------
crown = (512, 392)
with P.part('Rigid fork', C, 'fork') as g_fk:
    for dx in (5, -3):
        P.tube(cr([(crown[0] + dx, crown[1]), (crown[0] - 18 + dx, 470), (F[0] + 28 + dx, 550), (F[0] + dx, F[1])]), 7, key='fork')
    P.underlay('fork')
    P.path(quad((crown[0] - 18, crown[1] - 2), (crown[0] + 22, crown[1] - 10), 12), 't o')
    P.bolt(F[0], F[1], 8)
lab(g_fk, (468, 500), L, 'Rigid fork', 'no suspension at all')

# ---------------- handlebar and spoon brake ----------------
with P.part('Handlebar', C, 'bars') as g_hb:
    stem = (552, 268)
    P.tube('M%s L%s' % (pt(Ht), pt(stem)), 7, key='bar')
    P.tube(cr([(512, 278), (stem[0], stem[1]), (615, 262), (668, 250)]), 6, key='bar')
    P.underlay('bar')
    P.path(quad((640, 256), (690, 246), 14), 't2 o')  # cork grip
    for k in range(1, 5):
        a = (640 + 10 * k, 256 - 2 * k)
        P.line((a[0], a[1] - 7), (a[0], a[1] + 7), 'f')
with P.part('Spoon brake', C, 'spoon') as g_sb:
    piv = (612, 268)
    P.path(quad(piv, (668, 276), 6, 3), 't i')          # lever under bar
    P.circ(piv[0], piv[1], 4, 'w i')
    P.line((614, 272), (548, 352), 'i')                 # pull rod down the head tube
    P.line((548, 352), (500, 382), 'i')
    P.circ(548, 352, 3.5, 'w i')
    sp = pol(F[0], F[1], RO + 4, -66)
    P.path(cr([(500, 382), (sp[0] + 8, sp[1] - 8), sp]), 'n o')
    shoe = [pol(F[0], F[1], RO + 2, -84), pol(F[0], F[1], RO + 12, -84), pol(F[0], F[1], RO + 12, -54), pol(F[0], F[1], RO + 2, -54)]
    P.path(poly(shoe), 't2 o')
lab(g_sb, pol(F[0], F[1], RO + 8, -70), L, 'Spoon brake', 'shoe rubs on the tyre tread')

# oil lamp on fork crown
with P.part('Oil lamp', C, 'lamp') as g_lp:
    P.path(cr([(468, 382), (462, 360), (474, 344), (494, 346), (502, 366), (496, 386)], closed=True), 't o')
    P.circ(470, 366, 10, 'w i'); P.circ(470, 366, 6, 'n f')
    P.path('M478 344 l4 -12 h10 l4 12', 't2 i')
    P.line((496, 378), (crown[0] - 6, crown[1] - 4), 'i')
lab(g_lp, (470, 366), L, 'Oil lamp')

# ---------------- fuel tank and surface carburettor ----------------
with P.part('Fuel tank', C, 'tank') as g_tk:
    tk = cr([(590, 322), (790, 316), (800, 340), (792, 392), (600, 404), (582, 380)], closed=True)
    P.path(tk, 't o')
    P.line((600, 336), (788, 330), 'f'); P.line((604, 392), (786, 382), 'f')
    P.line((700, 330), (700, 396), 'i', 'stroke-dasharray="5 4"')
    for x in (628, 742):
        P.rect(x - 7, 309, 14, 9, 't2 i', rx=2)
    for x in (612, 668, 726, 780):
        P.path(quad((x, 316), (x, 304), 5), 't2 f')
    P.text(646, 370, 'PETROL', 'm', 'middle', 'style="font-size:10px"')
    P.text(748, 365, 'OIL', 'm', 'middle', 'style="font-size:10px"')
lab(g_tk, (660, 336), top, 'Fuel tank, petrol and oil')

with P.part('Surface carburettor', C, 'carb') as g_cb:
    P.path(cr([(604, 410), (662, 408), (668, 440), (660, 462), (608, 462), (600, 440)], closed=True), 't2 o')
    P.line((606, 432), (664, 432), 'f', 'stroke-dasharray="3 3"')     # fuel level
    P.circ(616, 420, 4, 'w i')                                         # air inlet
    P.path(quad((616, 420), (600, 400), 6), 't i')
    P.path(cr([(664, 446), (692, 452), (712, 466), (718, 478)]), 'n o', 'style="stroke-width:5"')
    P.path(cr([(664, 446), (692, 452), (712, 466), (718, 478)]), 'n', 'style="stroke:#DCE4F2;stroke-width:2"')
lab(g_cb, (632, 446), L, 'Surface carburettor', 'air drawn over the petrol')

# ---------------- engine ----------------
ax = -98  # cylinder axis, nearly upright
base = pol(E[0], E[1], 30, ax)
with P.part('Air-cooled single', C, 'engine') as g_en:
    # crankcase
    P.circ(E[0], E[1], 50, 't o')
    P.circ(E[0], E[1], 42, 'n f')
    for k in range(8):
        b = pol(E[0], E[1], 45, k * 45 + 10)
        P.bolt(b[0], b[1], 3.4, hexa=False)
    # barrel
    top_ = pol(E[0], E[1], 150, ax)
    P.path(quad(base, top_, 44), 't o')
    fins(P, pol(E[0], E[1], 52, ax), ax, 92, 9, 80, 66, cls='t i')
    # head
    hb = pol(E[0], E[1], 150, ax); ht = pol(E[0], E[1], 176, ax)
    P.path(quad(hb, ht, 62), 't o')
    fins(P, hb, ax, 26, 3, 70, 66, cls='t2 i')
    # exhaust valve chest on the front with pushrod
    ch = pol(E[0], E[1], 140, ax - 24)
    P.rect(ch[0] - 30, ch[1] - 12, 30, 26, 't2 o', rx=3)
    P.line((ch[0] - 16, ch[1] + 14), (E[0] - 34, E[1] - 30), 'i')
    P.circ(E[0] - 34, E[1] - 30, 6, 't2 i')
    # spark plug / igniter
    sp = pol(E[0], E[1], 158, ax + 11)
    P.path(quad(sp, pol(sp[0], sp[1], 18, -8), 7), 'w i')
P.label(g_en, pol(E[0], E[1], 100, ax + 14), bot, 'Air-cooled single', 'about 1¾ hp, 1500 rpm', want=610)
labels.append('Air-cooled single')

with P.part('Atmospheric inlet valve', C, 'inlet') as g_iv:
    t0 = pol(E[0], E[1], 176, ax); t1 = pol(E[0], E[1], 202, ax)
    P.path(quad(t0, t1, 30, 26), 't2 o')
    P.line(pol(t0[0], t0[1], 0, 0), t1, 'f')
    coil_spring(P, pol(E[0], E[1], 202, ax), pol(E[0], E[1], 226, ax), 14, 4)
    cap = pol(E[0], E[1], 228, ax)
    P.path(quad(cap, pol(E[0], E[1], 234, ax), 22), 't i')
lab(g_iv, pol(E[0], E[1], 214, ax), top, 'Atmospheric inlet valve')

with P.part('Exhaust silencer', C, 'exhaust') as g_ex:
    ch = pol(E[0], E[1], 140, ax - 24)
    P.tube(cr([(ch[0] - 30, ch[1]), (ch[0] - 52, ch[1] + 60), (ch[0] - 50, 700), (660, 726)]), 9, key='ex')
    P.underlay('ex')
    P.path('M650 712 H786 a14 14 0 0 1 0 28 H650 a14 14 0 0 1 0 -28 Z', 't o')
    for x in range(668, 784, 18):
        P.line((x, 714), (x, 738), 'f')
    P.path(quad((800, 726), (840, 734), 6), 't i')
lab(g_ex, (720, 740), bot, 'Exhaust silencer')

# ---------------- ignition box ----------------
with P.part('Battery and coil box', C, 'coilbox') as g_cx:
    P.rect(810, 392, 52, 74, 't o', rx=4)
    P.rect(816, 400, 40, 22, 't2 i', rx=2)
    P.line((816, 432), (856, 432), 'f'); P.line((816, 444), (856, 444), 'f')
    P.circ(836, 456, 4, 'w i')
    P.line((862, 410), (870, 398), 'i')
    sp = pol(E[0], E[1], 158, ax + 11); tipp = pol(sp[0], sp[1], 18, -8)
    P.path(cr([(812, 452), (790, 462), (tipp[0] + 4, tipp[1] - 2)]), 'n i')
lab(g_cx, (836, 412), top, 'Battery and coil box')

# ---------------- drive belt ----------------
with P.part('Drive belt', C, 'belt') as g_bt:
    P.circ(E[0], E[1], 26, 't2 o'); P.circ(E[0], E[1], 20, 'n f'); P.bolt(E[0], E[1], 6)
    flat_belt(P, E, 28, R, 154, w=6)
lab(g_bt, (980, 552), bot, 'Flat leather drive belt', 'slips in the wet', want=1000)

# ---------------- pedals ----------------
with P.part('Pedals and cranks', C, 'pedals') as g_pd:
    P.circ(BB[0], BB[1], 28, 't2 o'); P.path(sprocket_d(BB[0], BB[1], 26, 22, 3.6), 't2 i')
    P.circ(BB[0], BB[1], 10, 't i')
    p1 = pol(BB[0], BB[1], 92, 118); p2 = pol(BB[0], BB[1], 92, -62)
    P.path(quad(pol(BB[0], BB[1], 8, -62), p2, 9, 7), 't i', 'style="opacity:.55"')
    P.path(quad(BB, p1, 11, 8), 't o')
    for p in (p1,):
        P.rect(p[0] - 26, p[1] - 7, 52, 14, 't2 o', rx=3)
        for k in range(4):
            P.line((p[0] - 20 + 13 * k, p[1] - 7), (p[0] - 20 + 13 * k, p[1] + 7), 'f')
    P.circ(BB[0], BB[1], 6, 'w i')
lab(g_pd, p1, bot, 'Pedals and cranks', 'to start and to help on hills')

# ---------------- saddle ----------------
with P.part('Sprung saddle', C, 'saddle') as g_sd:
    post = (S[0] + 4, 270)
    P.tube('M%s L%s' % (pt(S), pt(post)), 7, key='post'); P.underlay('post')
    P.path(cr([(842, 256), (880, 246), (936, 246), (966, 256), (962, 266), (900, 266), (848, 264)], closed=True), 't2 o')
    P.line((852, 258), (958, 258), 'f', 'stroke-dasharray="2 4"')
    P.path(quad((870, 270), (950, 272), 5), 't i')
    coil_spring(P, (930, 268), (930, 290), 14, 4)
    coil_spring(P, (952, 268), (952, 290), 14, 4)
    P.path(quad((post[0] - 14, 290), (960, 292), 5), 't i')
    P.circ(post[0], 288, 5, 't2 i')
lab(g_sd, (900, 252), top, 'Sprung leather saddle', want=930)

P.line((F[0] - RO - 18, F[1]), (F[0] + RO + 18, F[1]), 'c')
P.line((R[0] - RO - 18, R[1]), (R[0] + RO + 18, R[1]), 'c')
finish(P, labels)
