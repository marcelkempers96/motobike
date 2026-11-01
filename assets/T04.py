import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from typeslib import *

P = new_plate('T04', 'T04 Boda boda commuter motorcycle, East Africa, left side elevation',
              '125 to 150 cc air-cooled single-cylinder commuter as used for motorcycle taxis in East Africa: long dual seat, '
              'rear carrier, crash guards, dress guard, mudflaps, drum brakes and full chain case.')
C = 'type'
GY = 712
fa = (430, 562); ra = (1062, 562)
R, TH = 150, 34

# label rows (two staggered rows top and bottom, like F01)
T1 = Col(46, 'T', ymin=40, pitch=26); T2 = Col(86, 'T', ymin=40, pitch=26)
B1 = Col(808, 'B', ymin=40, pitch=26); B2 = Col(848, 'B', ymin=40, pitch=26)
labels = []
def L(g, a, col, t, sub=None):
    P.label(g, a, col, t, sub); labels.append(t)

ground(P, GY)

# ---------------------------------------------------------------- rear wheel
with P.part('Rear wheel', 'wheels', 'rear-wheel') as g_rw:
    wire_wheel(P, *ra, R, TH, nsp=36, hub=40, cross=46)
with P.part('Rear drum brake', 'chassis', 'rear-drum') as g_rd:
    drum_hub(P, *ra, 44, arm_ang=-40, arm_len=40)

# ---------------------------------------------------------------- swingarm, chain case
piv = (872, 548)
with P.part('Swingarm', 'chassis', 'swingarm') as g_sa:
    F = Frame(piv, ang(piv, ra)); Ls = dist(piv, ra)
    P.path(F.poly([(-12, -11), (Ls + 6, -9), (Ls + 6, 9), (-12, 11)]), 't o')
    P.line(F(10, -4), F(Ls - 30, -3), 'f')
    P.circ(*piv, 13, 't2 o'); P.bolt(piv[0], piv[1], 6)
    # chain adjuster at axle
    P.path(F.poly([(Ls - 28, -10), (Ls + 14, -10), (Ls + 14, 10), (Ls - 28, 10)]), 't2 i')
    P.line(F(Ls - 22, 0), F(Ls - 8, 0), 'i')

fs = (848, 590)   # front sprocket
with P.part('Full chain case', 'transmission', 'chain-case') as g_cc:
    rr, rf = 50, 22
    top = [(fs[0] - 8, fs[1] - rf - 8), (ra[0] - 20, ra[1] - rr - 10)]
    case = cr([(fs[0] - 30, fs[1] + 2), (fs[0] - 18, fs[1] - rf - 8), (fs[0] + 60, fs[1] - rf - 16), (ra[0] - 40, ra[1] - rr - 12),
               (ra[0] + 20, ra[1] - rr - 8), (ra[0] + rr + 12, ra[1] - 6), (ra[0] + rr - 4, ra[1] + rr + 6), (ra[0] - 20, ra[1] + rr + 12),
               (ra[0] - 90, ra[1] + rr + 2), (fs[0] + 60, fs[1] + rf + 14), (fs[0] - 18, fs[1] + rf + 10)], closed=True)
    P.path(case, 't o')
    # pressed ribs and seam
    P.path(cr([(fs[0] + 10, fs[1] - rf - 2), (fs[0] + 80, fs[1] - rf - 8), (ra[0] - 40, ra[1] - rr - 3)]), 'n f')
    P.path(cr([(fs[0] + 10, fs[1] + rf + 2), (fs[0] + 80, fs[1] + rf + 2), (ra[0] - 40, ra[1] + rr - 3)]), 'n f')
    P.circ(ra[0], ra[1], rr + 1, 'n f', 'stroke-dasharray="4 3"')
    P.circ(ra[0] + 10, ra[1] - 6, 9, 'w i'); P.circ(ra[0] + 10, ra[1] - 6, 4, 't2 f')   # inspection plug
    for t in (0.25, 0.55):
        q = lerp((fs[0] + 40, fs[1] - rf - 12), (ra[0] - 40, ra[1] - rr - 10), t)
        P.bolt(q[0], q[1] + 6, 3.2)
    P.bolt(ra[0], ra[1], 9)

# ---------------------------------------------------------------- front wheel
with P.part('Front wheel', 'wheels', 'front-wheel') as g_fw:
    wire_wheel(P, *fa, R, TH, nsp=36, hub=34, cross=50)
with P.part('Front drum brake', 'chassis', 'front-drum') as g_fd:
    drum_hub(P, *fa, 38, arm_ang=-110, arm_len=36)
    c0 = pol(fa[0], fa[1], 38 * 0.62, -110); tip = pol(c0[0], c0[1], 36, -180)
    cable(P, [tip, (tip[0] + 14, tip[1] - 50), Frame(fa, -63)(230, -24), Frame(fa, -63)(330, -30), (610, 196), (628, 188)])

# ---------------------------------------------------------------- frame
fork_a = -63
FF = Frame(fa, fork_a)
head_b = FF(300, 22); head_t = FF(372, 22)
sub_top = (1150, 352)
P.underlay('u')
with P.part('Frame', 'frame_body', 'frame') as g_fr:
    P.tube(cr([head_b, (630, 400), (648, 470), (660, 520)]), 15)            # single downtube
    P.tube(cr([head_t, (700, 268), (790, 292), (850, 320), (870, 380), (878, 470), (872, 548)]), 18)   # backbone to pivot
    P.tube(cr([(850, 322), (980, 330), (1100, 345), sub_top]), 11)        # seat rail
    P.tube(cr([(876, 470), (960, 420), (1040, 372)]), 10)                 # rear stay
    P.path(F and Frame(head_b, ang(head_b, head_t)).poly([(-8, -13), (dist(head_b, head_t) + 8, -13), (dist(head_b, head_t) + 8, 13), (-8, 13)]), 't o')
    for p in ((658, 520), (872, 470)):
        P.circ(*p, 7, 't2 i'); P.bolt(p[0], p[1], 3.4)
    # gusset at head
    P.path(poly([(head_b[0] + 4, head_b[1] - 26), (head_b[0] + 40, head_b[1] - 14), (head_b[0] + 18, head_b[1] + 8)]), 't i')

# ---------------------------------------------------------------- engine
cc = (705, 594)
with P.part('Air-cooled single', 'powertrain', 'engine') as g_en:
    crankcase(P, [(640, 560), (690, 540), (770, 545), (850, 560), (872, 600), (850, 628), (760, 642), (680, 640), (640, 610)],
              cover_c=cc, cover_r=46)
    P.path(cr([(770, 548), (842, 562), (858, 598), (838, 620), (782, 626)]) , 'n i')     # gearbox cover line
    Fc = single_cyl(P, (688, 546), -104, h_barrel=82, h_head=60, w=64, fin_ext=13, nb=7, nh=5)
    plug_cap(P, Fc(132, -36), -170, 22)
    # carburettor, intake and air box
    ip = Fc(104, 34)
    Fi = Frame(ip, -8)
    P.path(Fi.poly([(0, -9), (16, -9), (16, 9), (0, 9)]), 't2 i')
    P.path(Fi.poly([(16, -15), (52, -15), (52, 15), (16, 15)]), 't o')
    P.rect(*Fi(26, 15), 14, 20, 't2 i', rx=3)
    P.circ(*Fi(34, -2), 5, 'w f')
    P.path(Fi.poly([(52, -11), (86, -12), (86, 12), (52, 11)]), 't2 o')
    for u in range(58, 84, 6):
        P.line(Fi(u, -11), Fi(u, 11), 'f')
    ab = Fi(86, 0)
    P.path(cr([(ab[0], ab[1] - 30), (ab[0] + 50, ab[1] - 34), (ab[0] + 58, ab[1] + 10), (ab[0] + 40, ab[1] + 32), (ab[0], ab[1] + 28)], closed=True), 't o')
    P.circ(ab[0] + 28, ab[1] - 2, 4, 'w f')
    # exhaust header leaving forward (exhaust runs on the right side)
    P.path(cr([Fc(118, 0), (618, 440), (606, 500), (620, 590), (660, 652)]), 'n h')
    # gear lever and footpeg
    P.path(poly([(812, 628), (782, 640), (742, 648), (742, 656), (786, 650), (816, 636)]), 't i')
    P.rect(732, 646, 18, 10, 't2 i', rx=3)
with P.part('Rider footrest', 'chassis', 'footrest') as g_fp:
    P.rect(770, 640, 54, 13, 't2 o', rx=6)
    for x in range(778, 822, 7):
        P.line((x, 642), (x, 651), 'f')
with P.part('Kick start', 'powertrain', 'kick') as g_ks:
    P.path(poly([(870, 590), (938, 618), (942, 610), (874, 582)]), 'n h')
    P.path(poly([(936, 612), (952, 640)], False), 'n h')
    P.circ(870, 586, 9, 'n h')

# ---------------------------------------------------------------- centre / side stand
with P.part('Centre stand', 'chassis', 'centre-stand') as g_cs:
    a0 = (870, 612)
    P.path(poly([(a0[0] - 6, a0[1]), (a0[0] + 6, a0[1]), (958, 672), (950, 680)]), 't o')
    P.rect(944, 672, 34, 9, 't2 o', rx=3)
    P.circ(*a0, 7, 't2 i')
    P.path(poly([(925, 655), (950, 642), (954, 650), (930, 662)]), 't i')   # foot tang
with P.part('Side stand', 'chassis', 'side-stand') as g_ss:
    P.path(poly([(800, 636), (812, 640), (742, 690), (734, 684)]), 't o')
    P.rect(722, 684, 24, 8, 't2 i', rx=3)

# ---------------------------------------------------------------- shocks
with P.part('Twin shocks', 'chassis', 'shocks') as g_sh:
    coil_shock(P, (1048, 548), (1030, 350), w=17, coils=9)

# ---------------------------------------------------------------- side panel, air box
with P.part('Side panel', 'frame_body', 'side-panel') as g_sp:
    sp = cr([(884, 348), (972, 352), (976, 400), (946, 436), (890, 434)], closed=True)
    P.path(sp, 't o')
    P.rect(898, 378, 64, 22, 'w i', rx=4)
    P.text(930, 394, 'BOXER', 'm', 'middle', 'style="font-size:12px"')

# ---------------------------------------------------------------- rear mudguard, carrier, tail
with P.part('Rear mudguard', 'frame_body', 'rear-mudguard') as g_rm:
    P.path(arc_d(ra[0], ra[1], R + 12, 206, 352) + ' ' + arc_d(ra[0], ra[1], R + 6, 352, 206, move=False) + ' Z', 't o')
with P.part('Mudflap', 'frame_body', 'mudflap-r') as g_mf:
    e = pol(ra[0], ra[1], R + 9, 352)
    P.path(poly([(e[0] - 4, e[1] - 4), (e[0] + 12, e[1] - 6), (e[0] + 18, e[1] + 92), (e[0] - 2, e[1] + 96)]), 't2 o')
    for k in range(4):
        P.line((e[0] + 1 + k * 4, e[1] + 6), (e[0] + 3 + k * 4.5, e[1] + 86), 'f')

P.underlay('c')
with P.part('Rear carrier', 'frame_body', 'carrier') as g_rc:
    y0 = 326
    P.tube(cr([(1000, y0 + 4), (1120, y0), (1250, y0 - 4)]), 9, key='c')
    P.tube(cr([(1000, y0 + 22), (1120, y0 + 20), (1252, y0 + 14)]), 7, key='c')
    for x in range(1020, 1256, 26):
        P.line((x, y0 + 1), (x, y0 + 19), 'o')
    P.tube(cr([(1238, y0 + 16), (1236, 380), (1200, 430), (1150, 470)]), 8, key='c')   # stay
    P.tube(cr([(1105, y0 + 20), (1110, 390), (1080, 430)]), 7, key='c')
    P.tube(cr([(1250, y0 - 4), (1258, y0 + 6), (1252, y0 + 14)]), 9, key='c')
with P.part('Tail light', 'electrical', 'tail') as g_tl:
    P.path(cr([(1208, 356), (1246, 352), (1252, 372), (1214, 378)], closed=True), 'w o')
    P.path(cr([(1214, 360), (1242, 358), (1246, 368), (1218, 372)], closed=True), 't2 f')
    P.rect(1196, 384, 52, 38, 't o', rx=3)       # number plate
    P.rect(1201, 389, 42, 28, 'w f', rx=2)
    indicator(P, (1192, 368), facing=1, L=20)

# ---------------------------------------------------------------- seat
P.underlay('s')
with P.part('Long dual seat', 'frame_body', 'seat') as g_se:
    s = cr([(780, 300), (800, 282), (900, 280), (1040, 290), (1150, 300), (1166, 312), (1160, 334), (1100, 336), (900, 330), (800, 324)], closed=True)
    P.path(s, 't2 o')
    seat_stitch(P, [(806, 290), (900, 288), (1040, 297), (1148, 306)])
    P.path(cr([(800, 324), (900, 330), (1100, 336), (1160, 334)]), 'n i')

# ---------------------------------------------------------------- dress guard
with P.part('Dress guard', 'frame_body', 'dress-guard') as g_dg:
    d = sector_d(ra[0], ra[1], 58, R - 8, 186, 262)
    P.path(d, 'xr o', 'fill-opacity="0.92"')
    P.path(arc_d(ra[0], ra[1], R - 8, 186, 262), 'n', 'stroke="#1E2B5E" stroke-width="5"')
    P.path(arc_d(ra[0], ra[1], R - 8, 186, 262), 'n', 'stroke="#DCE4F2" stroke-width="2.2"')
    for a in (200, 230, 258):
        P.line(pol(ra[0], ra[1], 60, a), pol(ra[0], ra[1], R - 10, a), 'i')
    P.bolt(*pol(ra[0], ra[1], 70, 262), 3.4)

# ---------------------------------------------------------------- rear crash guard
P.underlay('g')
with P.part('Rear crash guard', 'frame_body', 'rear-guard') as g_rg:
    P.tube(cr([(872, 352), (866, 420), (884, 458), (930, 460), (968, 428), (982, 356)]), 9, key='g')

# ---------------------------------------------------------------- fuel tank
with P.part('Fuel tank', 'frame_body', 'tank') as g_tk:
    tk = cr([(618, 284), (650, 246), (720, 234), (800, 246), (850, 284), (846, 318), (760, 322), (660, 314)], closed=True)
    P.path(tk, 't o')
    P.path(cr([(690, 300), (700, 266), (760, 262), (800, 282), (790, 306), (720, 310)], closed=True), 't2 i')   # knee pad
    for x in range(706, 790, 9):
        P.line((x, 272), (x - 4, 302), 'f')
    P.rect(706, 228, 34, 9, 't2 i', rx=4)   # filler cap
    P.path(cr([(650, 252), (720, 242), (800, 252)]), 'n f')

# ---------------------------------------------------------------- front mudguard + flap
with P.part('Front mudguard', 'frame_body', 'front-mudguard') as g_fm:
    P.path(arc_d(fa[0], fa[1], R + 14, 196, 318) + ' ' + arc_d(fa[0], fa[1], R + 7, 318, 196, move=False) + ' Z', 't o')
    for a in (232, 290):
        P.line(pol(fa[0], fa[1], R + 10, a), pol(fa[0], fa[1], 60, a + (6 if a < 260 else -6)), 'i')
with P.part('Mudflap', 'frame_body', 'mudflap-f') as g_mf2:
    e = pol(fa[0], fa[1], R + 10, 196)
    P.path(poly([(e[0] - 4, e[1] - 2), (e[0] + 10, e[1]), (e[0] + 8, e[1] + 82), (e[0] - 10, e[1] + 80)]), 't2 o')

# ---------------------------------------------------------------- fork
with P.part('Telescopic fork with gaiters', 'chassis', 'fork') as g_fk:
    tele_fork(P, fa, FF(380, 0), w=20, slider_frac=0.36, gaiter=True)
    # triple clamps
    for u, wd in ((300, 34), (372, 30)):
        P.path(FF.poly([(u - 9, -wd * 0.6), (u + 9, -wd * 0.6), (u + 9, 40), (u - 9, 40)]), 't o')
        P.bolt(*FF(u, 30), 3.4)

# ---------------------------------------------------------------- front crash guard
P.underlay('f')
with P.part('Front crash guard', 'frame_body', 'front-guard') as g_fg:
    P.tube(cr([(634, 372), (600, 430), (594, 510), (612, 556), (652, 560)]), 12, key='f')
    P.circ(634, 372, 7, 't2 i'); P.circ(652, 560, 7, 't2 i')

# ---------------------------------------------------------------- headlight, cockpit
with P.part('Round headlight with visor', 'electrical', 'headlight') as g_hl:
    headlight_round(P, (548, 268), 42, visor=True)
    indicator(P, (540, 312), facing=-1, L=22)
P.underlay('b')
with P.part('Handlebar and controls', 'chassis', 'bars') as g_hb:
    top = FF(380, 0)
    P.circ(top[0] + 8, top[1] - 18, 20, 't o')          # speedometer pod
    P.circ(top[0] + 8, top[1] - 18, 13, 'w i')
    P.line((top[0] + 8, top[1] - 18), pol(top[0] + 8, top[1] - 18, 10, -40), 'i')
    P.tube(cr([(top[0] - 4, top[1] - 6), (top[0] + 18, top[1] - 34), (top[0] + 62, top[1] - 44)]), 8, key='b')
    grip(P, (top[0] + 54, top[1] - 44), -6, 40)
    lever(P, (top[0] + 30, top[1] - 40), -14, 62)
    mirror(P, (top[0] + 14, top[1] - 34), (top[0] - 6, top[1] - 118))

# ---------------------------------------------------------------- labels
L(g_hl, (526, 246), T1, 'Round headlight with visor')
L(g_fk, FF(180, -10), T2, 'Fork gaiters')
L(g_fg, (596, 480), B2, 'Front crash guard')
L(g_fd, (fa[0] + 18, fa[1] + 20), B1, 'Drum brakes')
L(g_mf2, (pol(fa[0], fa[1], R + 10, 196)[0], 620), B2, 'Mudflaps')
L(g_en, (676, 470), T1, 'Air-cooled single, 125 to 150 cc')
L(g_tk, (760, 238), T2, 'Fuel tank with knee pads')
L(g_ks, (936, 614), B1, 'Kick start, right side')
L(g_cs, (958, 676), B2, 'Centre stand')
L(g_se, (1000, 286), T1, 'Long dual seat')
L(g_rc, (1180, 324), T2, 'Rear carrier rack')
L(g_dg, pol(ra[0], ra[1], 110, 215), B1, 'Dress guard')
L(g_sh, (1036, 420), T1, 'Twin rear shocks')
L(g_cc, (980, 548), B2, 'Full chain case')
L(g_rg, (930, 460), B1, 'Rear crash guard')

finish(P, labels)
