import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from typeslib import *

P = new_plate('T05', 'T05 Cafe racer, 1960s Britain, left side elevation',
              'British 650 cc parallel-twin cafe racer of the Rocker era: featherbed duplex frame, long alloy tank, clip-on bars, '
              'flyscreen, humped single seat, rear-set footrests, swept-back exhausts with megaphones and a twin-leading-shoe front drum.')
GY = 712
fa = (432, 566); ra = (1086, 566)
R, TH = 146, 30
T1 = Col(46, 'T', ymin=40, pitch=26); T2 = Col(86, 'T', ymin=40, pitch=26)
B1 = Col(808, 'B', ymin=40, pitch=26); B2 = Col(848, 'B', ymin=40, pitch=26)
labels = []
def L(g, a, col, t, sub=None):
    P.label(g, a, col, t, sub); labels.append(t)

ground(P, GY)

# rear wheel + drum
with P.part('Wire wheel', 'wheels', 'rear-wheel') as g_rw:
    wire_wheel(P, *ra, R, TH, nsp=40, hub=40, cross=44)
with P.part('Rear drum brake', 'chassis', 'rear-drum') as g_rd:
    drum_hub(P, *ra, 46, arm_ang=60, arm_len=38)
    sprocket(P, ra[0], ra[1], 58, 46, 't2 i')
    drum_hub(P, *ra, 46, arm_ang=60, arm_len=38)

piv = (900, 552)
with P.part('Swingarm', 'chassis', 'swingarm') as g_sa:
    F = Frame(piv, ang(piv, ra)); Ls = dist(piv, ra)
    P.path(F.poly([(-10, -9), (Ls + 8, -8), (Ls + 8, 8), (-10, 9)]), 't o')
    P.circ(*piv, 12, 't2 o'); P.bolt(piv[0], piv[1], 5.5)
    P.path(F.poly([(Ls - 24, -9), (Ls + 12, -9), (Ls + 12, 9), (Ls - 24, 9)]), 't2 i')
fs = (872, 600)
with P.part('Rear chain', 'transmission', 'chain') as g_ch:
    chain(P, fs, 20, ra, 58)
    sprocket(P, fs[0], fs[1], 20, 18, 't2 i')

# front wheel + TLS drum
with P.part('Wire wheel', 'wheels', 'front-wheel') as g_fw:
    wire_wheel(P, *fa, R, TH, nsp=40, hub=40, cross=44)
with P.part('Twin-leading-shoe drum brake', 'chassis', 'front-drum') as g_fd:
    drum_hub(P, *fa, 56, arm_ang=-80, arm_len=40, tls=True)

# frame (featherbed duplex)
FF = Frame(fa, -62)
head_b = FF(318, 24); head_t = FF(388, 24)
P.underlay('u')
with P.part('Featherbed frame', 'frame_body', 'frame') as g_fr:
    P.tube(cr([head_b, (640, 420), (648, 560), (676, 634), (800, 646), (888, 630), (912, 560), (904, 420), (896, 300),
               (860, 284), (740, 270), head_t]), 15)
    P.tube(cr([(896, 300), (1000, 296), (1120, 298)]), 11)                    # seat rails
    P.tube(cr([(906, 470), (990, 400), (1060, 330)]), 10)                     # rear loop stay
    P.path(Frame(head_b, ang(head_b, head_t)).poly([(-8, -13), (dist(head_b, head_t) + 8, -13), (dist(head_b, head_t) + 8, 13), (-8, 13)]), 't o')
    for p in ((646, 548), (904, 430), (896, 300)):
        P.circ(*p, 6, 't2 i')

# engine: parallel twin, primary chaincase on the left
cc = (730, 590)
with P.part('Parallel twin, 650 cc', 'powertrain', 'engine') as g_en:
    crankcase(P, [(660, 560), (720, 540), (800, 546), (870, 560), (888, 600), (868, 628), (780, 640), (690, 638), (656, 610)])
    Fc = single_cyl(P, (700, 548), -96, h_barrel=92, h_head=58, w=90, fin_ext=12, nb=8, nh=5)
    plug_cap(P, Fc(128, -48), -178, 22)
    # pushrod tube
    P.line(Fc(0, 52), Fc(140, 52), 'i')
with P.part('Primary chaincase', 'transmission', 'primary') as g_pc:
    pc = cr([(674, 584), (700, 552), (760, 548), (850, 566), (878, 604), (856, 634), (760, 640), (692, 632)], closed=True)
    P.path(pc, 't o')
    P.path(cr([(684, 586), (706, 560), (760, 556), (844, 572), (866, 604), (850, 626), (760, 632), (698, 624)], closed=True), 'n i')
    for t in range(0, 360, 30):
        q = (782 + 92 * math.cos(math.radians(t)), 596 + 36 * math.sin(math.radians(t)))
        P.circ(*q, 2.6, 't2 f')
    P.circ(842, 600, 14, 't2 i'); P.circ(842, 600, 6, 'w f')

with P.part('Twin carburettors', 'powertrain', 'carbs') as g_cb:
    for k, dy in ((0, 0), (1, -10)):
        Fi = Frame(Fc(108, 50 + k * 4), -4)
        P.path(Fi.poly([(0, -9), (14, -9), (14, 9), (0, 9)]), 't2 i')
        P.path(Fi.poly([(14, -14), (44, -14), (44, 14), (14, 14)]), 't o')
        P.circ(*Fi(29, -20), 7, 't2 i')                         # float chamber tickler
        P.path(Fi.poly([(44, -10), (66, -15), (66, 15), (44, 10)]), 'w o')   # velocity stack
with P.part('Swept-back exhaust', 'powertrain', 'exhaust') as g_ex:
    hp = Fc(118, -46)
    d = cr([hp, (628, 480), (618, 560), (650, 660), (760, 672), (900, 664), (980, 650)])
    P.path(d, 'n', 'stroke="#1E2B5E" stroke-width="20"')
    P.path(d, 'n', 'stroke="#FFFFFF" stroke-width="15.6"')
    P.path(cr([hp, (628, 480), (618, 560), (650, 660), (760, 672), (900, 664)]), 'n f')
with P.part('Megaphone silencer', 'powertrain', 'megaphone') as g_mg:
    M = Frame((972, 650), -7)
    P.path(M.poly([(0, -10), (190, -22), (196, -21), (196, 21), (190, 22), (0, 10)]), 'w o')
    P.path(M.poly([(186, -22), (196, -21), (196, 21), (186, 22)]), 't2 i')
    for u in (40, 120):
        P.path(M.poly([(u, -12 - u * 0.06), (u + 5, -12 - u * 0.06), (u + 5, 12 + u * 0.06), (u, 12 + u * 0.06)]), 't f')

with P.part('Rear-sets', 'chassis', 'rearsets') as g_rs:
    P.path(poly([(906, 560), (948, 548), (962, 576), (918, 590)]), 't o')     # alloy hanger plate
    for p in ((916, 566), (948, 560)):
        P.bolt(p[0], p[1], 3.6)
    P.rect(944, 566, 44, 12, 't2 o', rx=6)
    for x in range(950, 986, 6):
        P.line((x, 568), (x, 576), 'f')
    P.path(poly([(918, 582), (884, 606), (888, 612), (922, 590)]), 't i')    # reversed gear linkage
    P.circ(886, 610, 4, 'w i')

with P.part('Rear shock', 'chassis', 'shocks') as g_sh:
    coil_shock(P, (1062, 552), (1050, 330), w=17, coils=10)

with P.part('Battery and oil box', 'frame_body', 'sidebox') as g_sb:
    P.path(cr([(912, 330), (1000, 330), (1006, 380), (980, 420), (916, 416)], closed=True), 't o')
    P.circ(958, 372, 16, 'w i'); P.circ(958, 372, 6, 't2 f')

with P.part('Rear mudguard', 'frame_body', 'rear-mudguard') as g_rm:
    P.path(arc_d(ra[0], ra[1], R + 10, 228, 322) + ' ' + arc_d(ra[0], ra[1], R + 5, 322, 228, move=False) + ' Z', 't o')

with P.part('Humped seat with cowl', 'frame_body', 'seat') as g_se:
    base = cr([(900, 286), (1000, 288), (1100, 290), (1170, 286), (1196, 296), (1180, 312), (1100, 312), (1000, 308), (906, 306)], closed=True)
    P.path(base, 't o')
    pad = cr([(906, 288), (920, 270), (1000, 266), (1040, 270), (1046, 288)], closed=False) + ' Z'
    P.path(pad, 't2 o')
    seat_stitch(P, [(918, 276), (1000, 272), (1038, 276)])
    hump = cr([(1046, 288), (1062, 252), (1110, 238), (1170, 250), (1196, 280), (1196, 296), (1046, 292)], closed=True)
    P.path(hump, 't o')
    P.path(cr([(1064, 270), (1110, 256), (1168, 264)]), 'n f')
    P.circ(1120, 272, 10, 'w i'); P.text(1120, 277, '3', 'num', 'middle')    # race number roundel
with P.part('Tail light', 'electrical', 'tail') as g_tl:
    P.path(cr([(1196, 280), (1214, 278), (1218, 292), (1198, 296)], closed=True), 'w o')

with P.part('Long alloy tank', 'frame_body', 'tank') as g_tk:
    tk = cr([(636, 270), (664, 230), (760, 214), (860, 222), (906, 252), (902, 286), (820, 292), (700, 290)], closed=True)
    P.path(tk, 't o')
    P.path(cr([(690, 236), (780, 222), (880, 232)]), 'n w', 'stroke="#FFFFFF" stroke-width="4"')
    P.path(cr([(790, 286), (812, 250), (868, 246), (890, 270), (884, 286)], closed=True), 't2 i')     # knee dent
    P.line((744, 216), (752, 290), 'i'); P.line((754, 216), (762, 290), 'i')                       # tank strap
    P.circ(716, 224, 13, 'w o'); P.circ(716, 224, 7, 't2 i')                                       # quick-release cap
    P.path(cr([(664, 286), (720, 288), (790, 290)]), 'n f', 'stroke-dasharray="3 3"')

with P.part('Short alloy mudguard', 'frame_body', 'front-mudguard') as g_fm:
    P.path(arc_d(fa[0], fa[1], R + 12, 214, 300) + ' ' + arc_d(fa[0], fa[1], R + 6, 300, 214, move=False) + ' Z', 'w o')
    P.line(pol(fa[0], fa[1], R + 9, 260), pol(fa[0], fa[1], 70, 270), 'i')

with P.part('Telescopic fork', 'chassis', 'fork') as g_fk:
    tele_fork(P, fa, FF(396, 0), w=20, slider_frac=0.42)
    for u, wd in ((318, 30), (390, 26)):
        P.path(FF.poly([(u - 8, -wd * 0.6), (u + 8, -wd * 0.6), (u + 8, 40), (u - 8, 40)]), 't o')
        P.bolt(*FF(u, 30), 3.4)

with P.part('Headlamp', 'electrical', 'headlamp') as g_hl:
    hc = FF(300, -46)
    headlight_round(P, hc, 46)
    P.line(FF(300, -6), (hc[0] + 18, hc[1]), 'o')
with P.part('Flyscreen', 'frame_body', 'flyscreen') as g_fs:
    a0 = (hc[0] - 8, hc[1] - 44)
    scr = cr([a0, (hc[0] - 6, hc[1] - 92), (hc[0] + 22, hc[1] - 112), (hc[0] + 40, hc[1] - 100), (hc[0] + 22, hc[1] - 44)], closed=True)
    P.path(scr, 'w o', 'fill-opacity="0.75"')
    P.path(cr([(hc[0] + 2, hc[1] - 54), (hc[0] + 6, hc[1] - 92), (hc[0] + 26, hc[1] - 104)]), 'n f')
    for p in ((hc[0] - 4, hc[1] - 52), (hc[0] + 18, hc[1] - 54)):
        P.bolt(p[0], p[1], 2.6)

with P.part('Clip-on bars', 'chassis', 'clipons') as g_co:
    c0 = FF(352, 0)
    P.path(FF.poly([(340, -14), (364, -14), (364, 14), (340, 14)]), 't2 o')      # clamp on the fork leg
    P.bolt(*FF(352, 14), 3.2)
    tip = (c0[0] + 96, c0[1] + 18)
    bar(P, c0, tip, 9, 't o')
    grip(P, (tip[0] - 46, tip[1] - 8), 11, 50)
    lever(P, (c0[0] + 34, c0[1] + 2), 14, 66)
    cable(P, [(c0[0] + 30, c0[1] + 6), (c0[0] + 70, c0[1] + 50), (c0[0] + 130, c0[1] + 90), (700, 420), (690, 540)])
    P.circ(c0[0] + 10, c0[1] - 28, 18, 't o'); P.circ(c0[0] + 10, c0[1] - 28, 12, 'w i')     # rev counter
    P.line((c0[0] + 10, c0[1] - 28), pol(c0[0] + 10, c0[1] - 28, 9, -130), 'i')

L(g_fs, (hc[0] + 20, hc[1] - 100), T1, 'Flyscreen')
L(g_hl, (hc[0] - 24, hc[1] + 14), B2, 'Round headlamp')
L(g_co, (c0[0] + 70, c0[1] + 14), T2, 'Clip-on bars')
L(g_tk, (840, 226), T1, 'Long alloy tank')
L(g_se, (1110, 240), T1, 'Humped seat with cowl')
L(g_fr, (904, 420), T2, 'Featherbed frame')
L(g_cb, Fc(108, 92), T2, 'Twin carburettors')
L(g_en, Fc(60, -30), B1, 'Air-cooled parallel twin')
L(g_pc, (810, 620), B2, 'Primary chaincase')
L(g_rs, (968, 572), B1, 'Rear-sets')
L(g_ex, (760, 672), B2, 'Swept-back exhaust')
L(g_mg, (1120, 640), B1, 'Megaphone silencer')
L(g_fd, (fa[0] + 30, fa[1] + 20), B1, 'Twin-leading-shoe drum brake')
L(g_rw, pol(ra[0], ra[1], 100, 300), T2, 'Wire wheels')
L(g_sh, (1056, 430), T1, 'Twin rear shocks')

finish(P, labels)
