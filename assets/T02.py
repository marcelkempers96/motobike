from t123lib import *

P = new_plate('T02', 'T02 Vintage V-twin, c. 1915 to 1930, left side elevation',
              'Loop-frame V-twin of the Harley-Davidson J and Indian Powerplus era: inlet-over-exhaust 45 degree twin, magneto ignition, '
              'springer front fork, rigid rear, flat-sided tank with hand gear shift, foot clutch, footboards, acetylene headlamp and chain drive.')
C = 'vintage'
F = (430, 615); R = (1212, 615)
RO, RI, RIM = 186, 150, 142
top = Col(58, 'T', ymin=250, pitch=30)
bot = Col(860, 'B', ymin=240, pitch=30)
L = Col(196, 'L', ymin=120, ymax=780, pitch=44)
Rc = Col(1412, 'R', ymin=120, ymax=780, pitch=44)
labels = []
def lab(g, a, col, t, sub=None, want=None):
    P.label(g, a, col, t, sub, want); labels.append(t)

# ---------------- mudguards and rack ----------------
with P.part('Valanced mudguards', C, 'guards') as g_mg:
    for (c, a0, a1) in ((F, 196, 338), (R, 186, 352)):
        P.path(arc_d(c[0], c[1], RO + 22, a0, a1) + ' ' + arc_d(c[0], c[1], RO + 9, a1, a0, move=False) + ' Z', 't o')
        P.path(arc_d(c[0], c[1], RO + 15, a0 + 3, a1 - 3), 'n f')
    for a in (300, 250):
        P.line(pol(F[0], F[1], RO + 16, a), pol(F[0], F[1], 30, a + 8 if a == 300 else a - 4), 'f')
with P.part('Luggage rack', C, 'rack') as g_rk:
    P.path(quad((1010, 402), (1300, 420), 6), 't i')
    for x in (1050, 1100, 1150, 1200, 1250):
        P.line((x, 404), (x + 2, 416), 'f')
    P.line((1290, 420), (1330, 520), 'i'); P.line((1060, 404), (1040, 470), 'i')

# ---------------- wheels ----------------
with P.part('Clincher wheels', C, 'wheels') as g_wh:
    for c, hub in ((F, 26), (R, 34)):
        wire_wheel(P, c[0], c[1], RO, RI, RIM, hub, n=40, cross=44, tread='rib')
    P.bolt(F[0], F[1], 9)
with P.part('Rear brake drum', C, 'rbrake') as g_rb:
    tip = drum_plate(P, R[0], R[1], 54, lever_ang=-30, lever_len=46)
    P.line(tip, (1060, 690), 'i')
lab(g_wh, pol(F[0], F[1], RO - 10, 205), L, 'Clincher tyres', '28 x 3 in, beaded edge')

# ---------------- frame ----------------
Hb, Ht = (566, 384), (598, 302)
SP = (936, 332); BB = (918, 712)
with P.part('Rigid loop frame', C, 'frame') as g_fr:
    P.tube('M%s L%s' % (pt(Ht), pt(SP)), 11)                                         # upper rail
    P.tube('M%s L%s' % (pt((Hb[0] + 2, Hb[1] - 26)), pt((924, 432))), 10)              # lower rail
    P.tube(cr([(Hb[0] + 2, Hb[1] - 4), (610, 520), (650, 700), (700, 730), (860, 734), (BB[0], BB[1])]), 12)  # loop
    P.tube('M%s L%s' % (pt(BB), pt(SP)), 12)                                          # seat tube
    P.tube('M%s L%s' % (pt(SP), pt(R)), 9)                                            # seat stays
    P.tube('M%s L%s' % (pt(BB), pt(R)), 10)                                           # chain stays
    P.underlay('u')
    P.path(quad(Hb, Ht, 18), 't o')
    for c in (Ht, Hb, SP, BB, (924, 432)):
        P.circ(c[0], c[1], 10, 't i')
    P.circ(R[0], R[1], 16, 't i'); P.bolt(R[0], R[1], 9)
lab(g_fr, (1080, 480), Rc, 'Rigid frame', 'hardtail, no rear springs')

# ---------------- springer fork ----------------
crown = (556, 396)
with P.part('Springer fork', C, 'fork') as g_fk:
    d = (F[0] + 22 - crown[0], F[1] - 8 - crown[1])
    rl0 = crown; rl1 = (F[0] + 22, F[1] - 8)                                  # rigid rear legs
    P.path(quad(rl0, rl1, 12, 9), 't o')
    fl0 = (crown[0] - 26, crown[1] - 30); fl1 = (F[0] - 4, F[1] - 4)          # sprung front legs
    P.path(quad(fl0, fl1, 9, 8), 't o')
    P.path(quad((F[0] + 22, F[1] - 8), (F[0] - 6, F[1] + 2), 12, 10), 't2 o')   # rocker
    P.circ(F[0] + 22, F[1] - 8, 5, 'w i'); P.circ(F[0] - 4, F[1] - 4, 4, 'w i')
    # crown and handlebar bracket
    P.path(quad((crown[0] - 34, crown[1] - 34), (crown[0] + 12, crown[1] + 6), 14), 't o')
    P.path(quad((Ht[0] - 44, Ht[1] - 18), (Ht[0] + 10, Ht[1] + 8), 14), 't o')
    # springs between upper bracket and front legs
    coil_spring(P, (Ht[0] - 40, Ht[1] - 8), (fl0[0] + 6, fl0[1] + 6), 18, 8)
    coil_spring(P, (Ht[0] - 26, Ht[1] - 2), (fl0[0] + 20, fl0[1] + 12), 14, 7)
    P.bolt(F[0] - 4, F[1] - 4, 9)
lab(g_fk, (532, 362), L, 'Springer fork', 'coil springs, rocker at axle')

# ---------------- handlebar ----------------
with P.part('Handlebar and twist grips', C, 'bars') as g_hb:
    stem = (604, 284)
    P.tube(cr([(Ht[0], Ht[1]), stem, (628, 246), (690, 238), (744, 254)]), 8, key='bar')
    P.underlay('bar')
    P.path(quad((712, 246), (764, 258), 15), 't2 o')
    for k in range(1, 6):
        q = (712 + 8.5 * k, 246 + 2 * k)
        P.line((q[0], q[1] - 7), (q[0], q[1] + 7), 'f')
    P.path(cr([(732, 262), (700, 300), (660, 350), (640, 420)]), 'n i')
with P.part('Acetylene headlamp', C, 'lamp') as g_lp:
    lc = (488, 352)
    P.path(cr([(lc[0] + 6, lc[1] - 44), (lc[0] + 40, lc[1] - 30), (lc[0] + 46, lc[1] + 10), (lc[0] + 30, lc[1] + 40), (lc[0] - 2, lc[1] + 40)], closed=True), 't o')
    P.circ(lc[0], lc[1], 40, 't o'); P.circ(lc[0], lc[1], 33, 'w i'); P.circ(lc[0], lc[1], 12, 'n f')
    P.path('M%s l10 -22 h18 l8 22' % pt((lc[0] + 4, lc[1] - 40)), 't2 i')
    P.path(quad((lc[0] + 40, lc[1] + 6), (crown[0] - 20, crown[1] - 18), 8), 't i')
    # gas generator canister on the fork
    P.rect(574, 300 + 40, 26, 54, 't2 o', rx=6)
    P.path(cr([(587, 340), (560, 320), (lc[0] + 30, lc[1] - 36)]), 'n i')
lab(g_lp, (lc[0] - 22, lc[1]), L, 'Acetylene headlamp', 'carbide gas generator')

# ---------------- tank and hand shift ----------------
with P.part('Tank, fuel and oil', C, 'tank') as g_tk:
    tk = cr([(612, 306), (760, 304), (920, 322), (926, 380), (918, 420), (760, 424), (620, 406), (606, 360)], closed=True)
    P.path(tk, 't o')
    P.path(cr([(626, 318), (760, 316), (906, 332), (912, 410), (760, 414), (630, 398)], closed=True), 'n f')
    P.line((790, 314), (788, 418), 'i', 'stroke-dasharray="5 4"')
    for x in (660, 860):
        P.rect(x - 9, 296, 18, 10, 't2 i', rx=3)
    P.rect(812, 290, 10, 18, 'w i', rx=2); P.circ(817, 288, 6, 't2 i')        # hand oil pump
    P.text(650, 374, 'FUEL', 'm', 'middle', 'style="font-size:11px"'); P.text(850, 374, 'OIL', 'm', 'middle', 'style="font-size:11px"')
lab(g_tk, (700, 330), top, 'Tank, fuel and oil', want=560)
with P.part('Hand gear shift', C, 'shift') as g_hs:
    gate = [(690, 396), (744, 396), (744, 412), (690, 412)]
    P.path(poly(gate), 't2 i')
    for x in (700, 716, 732):
        P.circ(x, 404, 3, 'w f')
    piv = (720, 452)
    P.path(quad(piv, (704, 344), 8, 6), 't o')
    P.circ(702, 338, 9, 't2 o')
    P.circ(piv[0], piv[1], 6, 't2 i')
    P.line(piv, (790, 560), 'i')
lab(g_hs, (702, 338), top, 'Hand gear shift', 'three speeds, gate on the tank', want=440)

# ---------------- engine ----------------
Ce = (770, 640)
def cyl(ax, front):
    b0 = pol(Ce[0], Ce[1], 48, ax); b1 = pol(Ce[0], Ce[1], 150, ax)
    P.path(quad(b0, b1, 62), 't o')
    fins(P, pol(Ce[0], Ce[1], 54, ax), ax, 92, 10, 88, 76, cls='t i')
    h0 = b1; h1 = pol(Ce[0], Ce[1], 178, ax)
    P.path(quad(h0, h1, 72, 66), 't o')
    fins(P, h0, ax, 26, 3, 80, 74, cls='t2 i')
    # inlet valve cage on top with rocker and exposed pushrod
    c0 = h1; c1 = pol(Ce[0], Ce[1], 200, ax)
    P.path(quad(c0, c1, 28, 22), 't2 o')
    coil_spring(P, pol(Ce[0], Ce[1], 198, ax), pol(Ce[0], Ce[1], 216, ax), 14, 3)
    rk0 = pol(Ce[0], Ce[1], 218, ax); side = 1 if front else -1
    rk1 = pol(rk0[0], rk0[1], 40, ax + 90 * side)
    P.path(quad(rk0, rk1, 7, 5), 't i'); P.circ(rk0[0], rk0[1], 4, 'w i')
    pr0 = rk1; pr1 = pol(Ce[0], Ce[1], 56, ax + 22 * side)
    P.line(pr0, pr1, 'i')
    # exhaust valve pocket on the side
    ep = pol(Ce[0], Ce[1], 148, ax - 30 * side)
    P.circ(ep[0], ep[1], 15, 't2 o'); P.circ(ep[0], ep[1], 6, 'n f')
    # spark plug
    sp = pol(Ce[0], Ce[1], 172, ax + 22 * side)
    P.path(quad(sp, pol(sp[0], sp[1], 20, ax + 90 * side), 7), 'w i')
    return ep, sp
with P.part('F-head V-twin', C, 'engine') as g_en:
    epF, spF = cyl(-112.5, True)
    epR, spR = cyl(-67.5, False)
    # crankcase and gearbox casing
    P.path(cr([(706, 600), (770, 584), (836, 600), (900, 618), (930, 660), (912, 712), (840, 728), (744, 724), (700, 690), (692, 640)], closed=True), 't o')
    P.circ(Ce[0], Ce[1] + 18, 42, 'n i')
    for k in range(10):
        b = pol(Ce[0], Ce[1] + 18, 50, k * 36 + 6)
        P.bolt(b[0], b[1], 3.2, hexa=False)
    P.circ(880, 676, 26, 'n i')
P.label(g_en, pol(Ce[0], Ce[1], 120, -90), top, 'F-head V-twin', '45 degree, inlet over exhaust', want=980)
labels.append('F-head V-twin')

with P.part('Magneto', C, 'magneto') as g_mg2:
    P.path('M668 584 H720 a16 16 0 0 1 0 32 H668 a16 16 0 0 1 0 -32 Z', 't2 o')
    P.circ(668, 600, 16, 't o'); P.circ(668, 600, 7, 'w i')
    P.path('M678 568 l12 -12 h18 l12 12', 't i')
    for spx in (spF, spR):
        P.path(cr([(690, 558), (700, 520), (spx[0] - 2, spx[1] + 2)]) if spx is spF else cr([(704, 558), (760, 470), (spx[0] - 6, spx[1] - 4)]), 'n i')
lab(g_mg2, (690, 600), bot, 'Magneto', 'ignition with no battery', want=380)

with P.part('Carburettor', C, 'carb') as g_cb:
    cc = (772, 520)
    P.rect(cc[0] - 16, cc[1] - 18, 32, 40, 't2 o', rx=4)
    P.path(cr([(cc[0], cc[1] - 18), (cc[0] - 20, cc[1] - 50), pol(Ce[0], Ce[1], 196, -112.5)]), 'n o', 'style="stroke-width:6"')
    P.path(cr([(cc[0], cc[1] - 18), (cc[0] + 20, cc[1] - 50), pol(Ce[0], Ce[1], 196, -67.5)]), 'n o', 'style="stroke-width:6"')
    P.path('M%s q-30 4 -36 26' % pt((cc[0] - 16, cc[1] + 10)), 'n o', 'style="stroke-width:7"')
    P.circ(cc[0] - 52, cc[1] + 38, 9, 't i')
lab(g_cb, (cc[0], cc[1] + 4), bot, 'Carburettor', 'one, feeding both cylinders', want=560)

with P.part('Exhaust and silencer', C, 'exhaust') as g_ex:
    P.tube(cr([epF, (epF[0] - 40, epF[1] + 40), (648, 690), (700, 752), (800, 760)]), 11, key='ex')
    P.tube(cr([epR, (epR[0] + 30, epR[1] + 50), (930, 720), (900, 752), (820, 760)]), 11, key='ex')
    P.underlay('ex')
    P.path('M800 744 H990 a16 16 0 0 1 0 32 H800 a16 16 0 0 1 0 -32 Z', 't o')
    for x in range(816, 990, 20):
        P.line((x, 746), (x, 774), 'f')
    P.path(quad((1004, 760), (1066, 768), 8), 't i')

# primary chain case and final drive
with P.part('Drive chain', C, 'chain') as g_ch:
    P.path(cr([(744, 676), (800, 650), (880, 650), (912, 676), (880, 704), (800, 704)], closed=True), 't2 o')
    P.text(830, 683, 'PRIMARY', 'm', 'middle', 'style="font-size:10px"')
    cs = (906, 700)
    P.path(sprocket_d(cs[0], cs[1], 20, 17, 3.2), 't i')
    P.path(sprocket_d(R[0], R[1], 66, 44, 3.4), 't2 i')
    chain_run(P, cs, 22, R, 68)
lab(g_ch, (1060, 650), bot, 'Drive chain', 'primary in a case, final drive open', want=1180)

# ---------------- footboard and foot clutch ----------------
with P.part('Footboard', C, 'board') as g_fb:
    P.path(poly([(560, 712), (720, 708), (726, 722), (566, 726)]), 't o')
    for x in range(572, 716, 12):
        P.line((x, 711), (x, 723), 'f')
    P.line((600, 726), (626, 742), 'i'); P.line((690, 722), (700, 740), 'i')
lab(g_fb, (640, 716), bot, 'Footboard', want=740)
with P.part('Foot clutch', C, 'clutch') as g_fc:
    piv = (588, 704)
    P.path(cr([(piv[0] - 16, piv[1] - 34), (piv[0], piv[1]), (piv[0] + 40, piv[1] - 8)]), 'n o', 'style="stroke-width:9"')
    P.path(cr([(piv[0] - 16, piv[1] - 34), (piv[0], piv[1]), (piv[0] + 40, piv[1] - 8)]), 'n', 'style="stroke:#DCE4F2;stroke-width:5"')
    P.circ(piv[0], piv[1], 6, 't2 i')
    P.line((piv[0] + 40, piv[1] - 8), (744, 690), 'i')
lab(g_fc, (piv[0] - 14, piv[1] - 30), L, 'Foot clutch', 'rocker pedal: heel in, toe out')

# ---------------- saddle ----------------
with P.part('Sprung solo saddle', C, 'saddle') as g_sd:
    P.path(quad(SP, (944, 270), 9), 't o')
    P.path(cr([(888, 254), (932, 240), (1004, 244), (1036, 256), (1030, 270), (950, 272), (894, 266)], closed=True), 't2 o')
    P.line((900, 258), (1026, 260), 'f', 'stroke-dasharray="2 4"')
    coil_spring(P, (1004, 272), (1004, 300), 16, 5); coil_spring(P, (1024, 270), (1024, 298), 16, 5)
    P.path(quad((938, 300), (1032, 302), 6), 't i')
    coil_spring(P, (940, 274), (940, 330), 10, 8)   # seat-post spring visible through the slot
lab(g_sd, (960, 252), top, 'Sprung saddle', 'spring in the seat post', want=1180)

# ---------------- rear stand ----------------
with P.part('Rear stand', C, 'stand') as g_st:
    P.path(quad((R[0] + 6, R[1] - 4), (1338, 470), 9), 't o')
    P.circ(1338, 470, 6, 't2 i')
    P.path('M1332 466 q14 -10 18 6', 'n i')
lab(g_st, (1300, 520), Rc, 'Rear stand', 'folded up for riding')

P.line((F[0] - RO - 18, F[1]), (F[0] + RO + 18, F[1]), 'c')
P.line((R[0] - RO - 18, R[1]), (R[0] + RO + 18, R[1]), 'c')
finish(P, labels)
