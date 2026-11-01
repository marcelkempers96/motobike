import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from kit_t3 import *

P = Plate('T10', 1600, 900, 'T10 Naked streetfighter, left side elevation',
          'Unfaired road motorcycle with exposed steel trellis frame, liquid-cooled 90 degree L-twin, round headlight with flyscreen, '
          'wide flat handlebar, sculpted tank, short LED tail, USD fork with radial calipers, cast aluminium swingarm, monoshock and underbelly exhaust.')
GY = 790
FX, FY, FR = 360, 592, 198          # front axle, tyre radius (120/70 R17)
RX, RY, RR = 1320, 582, 208         # rear axle (180/55 R17)
RAKE = 24
top = Col(42, 'T', ymin=60, pitch=34)
bot = Col(842, 'B', ymin=60, pitch=34)
labels = []
def L(g, a, col, t, want=None):
    P.label(g, a, col, t, want=want); labels.append(t)

ground(P, 70, 1560, GY)
ux, uy = math.sin(math.radians(RAKE)), -math.cos(math.radians(RAKE))
def F(t, off=0):  # point on fork line, t in px from axle
    return (FX + ux * t + (-uy) * off, FY + uy * t + ux * off)
H1, H2 = F(392, 24), F(486, 24)       # head tube bottom/top on steering axis

# ------------------------------------------------ rear wheel
with P.part('Rear wheel', 'wheels', 'rwheel') as g_rw:
    cast_wheel(P, RX, RY, RR, 143, 128, nspoke=5, split=True, phase=72, step=7)
    hub_centre(P, RX, RY, 26)
    valve_side(P, RX, RY, 128, 300, 22)
with P.part('Rear sprocket', 'transmission', 'rsprocket') as g:
    sprocket(P, RX, RY, 70, 43, inner=58, bolts=5)
    hub_centre(P, RX, RY, 20)

# ------------------------------------------------ swingarm, chain
PIV = (928, 548)
FS = (900, 578)
with P.part('Drive chain', 'transmission', 'chain') as g_ch:
    chain_run(P, FS, 25, (RX, RY), 70)
with P.part('Cast aluminium swingarm', 'chassis', 'swingarm') as g_sa:
    ax, ay, Ls = unit(PIV, (RX, RY))
    nx, ny = -ay, ax
    pts = [(PIV[0] - 16, PIV[1] - 24), (PIV[0] + 60, PIV[1] - 30), (RX - 70, RY - 24), (RX + 22, RY - 16),
           (RX + 22, RY + 14), (RX - 70, RY + 18), (PIV[0] + 60, PIV[1] + 28), (PIV[0] - 16, PIV[1] + 24)]
    P.path(poly(pts), 't o', 'stroke-linejoin="round"')
    pk = [(PIV[0] + 80, PIV[1] - 16), (RX - 100, RY - 13), (RX - 100, RY + 8), (PIV[0] + 80, PIV[1] + 14)]
    P.path(poly(pk), 't2 i')
    for k in range(6):
        a_ = along(pk[0], pk[1], (k + 0.5) / 6); b_ = along(pk[3], pk[2], (k + 1) / 6)
        P.line(a_, b_, 'f')
    # chain adjuster eccentric
    P.circ(RX, RY, 30, 'n i'); P.circ(*pol(RX, RY, 24, 200), 3, 'k')
    P.circ(PIV[0], PIV[1], 20, 't2 o'); P.bolt(PIV[0], PIV[1], 9)
    # chain slider
    P.path(quad((PIV[0] + 30, PIV[1] - 22), (PIV[0] + 150, PIV[1] - 14), 5), 'w i')

# ------------------------------------------------ subframe + monoshock
with P.part('Rear subframe', 'frame_body', 'subframe') as g_sub:
    tubes(P, [(seg((905, 300), (1235, 228)), 9), (seg((960, 430), (1150, 258)), 8), (seg((1035, 352), (1110, 268)), 6),
              (seg((905, 300), (960, 430)), 9)])
with P.part('Monoshock', 'chassis', 'shock') as g_sh:
    shock(P, (968, 410), (1062, 534), body_w=24, spring_r=18, turns=7, reservoir=False)
    P.path(quad((1040, 520), (1092, 548), 10), 't i')   # swingarm lug

# ------------------------------------------------ engine: 90 deg L-twin
C = (820, 568)
with P.part('L-twin engine', 'powertrain', 'engine') as g_en:
    # crankcase
    cc = [(668, 560), (700, 520), (760, 505), (880, 498), (958, 520), (992, 560), (984, 620), (940, 660), (860, 676), (760, 672), (700, 650), (668, 610)]
    P.path(cr(cc, closed=True), 't o')
    P.path(cr([(690, 640), (760, 660), (860, 664), (930, 650)]), 'n f')
    # alternator cover
    P.circ(C[0], C[1], 66, 't2 o'); P.circ(C[0], C[1], 56, 'n f')
    for k in range(8):
        p = pol(C[0], C[1], 61, k * 45 + 10); P.bolt(p[0], p[1], 3.6)
    P.circ(C[0], C[1], 16, 't i'); P.bolt(C[0], C[1], 8)
    # oil filter and sump
    P.path(quad((700, 640), (725, 690), 18), 't2 o'); P.line((704, 652), (722, 686), 'f')
    # cylinders: front at 198 deg, rear at 288 deg from crank
    for ang, hl in ((198, 'front'), (288, 'rear')):
        a0 = pol(C[0], C[1], 66, ang); a1 = pol(C[0], C[1], 150, ang); a2 = pol(C[0], C[1], 214, ang)
        ux2, uy2, _ = unit(a0, a2); nx2, ny2 = -uy2, ux2
        def Q(t, w):
            b = along(a0, a2, t); return (b[0] + nx2 * w, b[1] + ny2 * w)
        P.path(quad(a0, a1, 46, 44), 't o')                       # water-jacketed barrel
        P.path(quad(along(a0, a1, 0.1), along(a0, a1, 0.9), 34), 'n f')
        head = [Q(0.56, -50), Q(0.56, 50), Q(0.8, 52), Q(0.93, 46), Q(1.0, 30), Q(1.0, -30), Q(0.93, -46), Q(0.8, -52)]
        P.path(cr(head, closed=True), 't o')
        P.path(cr([Q(0.66, -44), Q(0.66, 44)]), 'n f')
        cam = [Q(0.82, -42), Q(0.82, 42), Q(0.97, 26), Q(0.97, -26)]
        P.path(cr(cam, closed=True), 't2 i')
        for w in (-36, 36):
            q = Q(0.6, w); P.bolt(q[0], q[1], 3.6)
        cap0 = Q(0.74, -20 if hl == 'front' else 20)
        P.circ(cap0[0], cap0[1], 10, 't2 i'); P.circ(cap0[0], cap0[1], 4.5, 'k')
    # throttle bodies between cylinders + air intake
    tb = pol(C[0], C[1], 190, 243)
    P.path(quad(tb, (tb[0] + 30, tb[1] - 38), 20), 't2 o'); P.circ(tb[0] + 6, tb[1] - 6, 9, 'w i')
    # clutch slave and gear lever
    P.path(quad((955, 545), (980, 560), 12), 't2 i')
with P.part('Radiator', 'powertrain', 'radiator') as g_rad:
    rc = [(588, 318), (628, 312), (650, 470), (614, 480)]
    P.path(poly(rc), 't2 o')
    for k in range(1, 16):
        t = k / 16.0
        P.line(along(rc[0], rc[3], t), along(rc[1], rc[2], t), 'f')
    P.path(quad((600, 310), (640, 304), 6), 't i')
    # coolant hoses
    P.path(cr([(640, 470), (660, 500), (690, 512)]), 'n o', 'stroke-width="7" stroke="#1E2B5E"')
    P.path(cr([(640, 470), (660, 500), (690, 512)]), 'n', 'stroke-width="4" stroke="#DCE4F2"')

# ------------------------------------------------ exhaust
with P.part('Underbelly exhaust', 'powertrain', 'exhaust') as g_ex:
    hf = pol(C[0], C[1], 178, 208)
    tubes(P, [(cr([hf, (668, 600), (700, 676), (760, 690)]), 13),
              (cr([pol(C[0], C[1], 150, 300), (960, 455), (1000, 560), (975, 660), (940, 690)]), 13)])
    box = [(744, 668), (1000, 664), (1030, 682), (1022, 716), (760, 720), (734, 700)]
    P.path(poly(box), 't o')
    P.path(poly([(770, 680), (990, 677), (1006, 690), (998, 706), (776, 708)]), 'x i')
    P.path(quad((1024, 690), (1060, 700), 9), 't2 o')     # outlet
    P.circ(1062, 701, 6, 'k')

# ------------------------------------------------ trellis frame
with P.part('Steel trellis frame', 'frame_body', 'frame') as g_fr:
    U1, U2, U3 = (690, 212), (802, 258), (906, 300)
    L1, L2, L3 = (618, 340), (740, 360), (852, 372)
    tb_ = [(seg(H2, U1), 11), (seg(U1, U2), 11), (seg(U2, U3), 11),
           (seg(H1, L1), 11), (seg(L1, L2), 10), (seg(L2, L3), 10),
           (seg(H1, U1), 8), (seg(U1, L1), 8), (seg(L1, U2), 8), (seg(U2, L2), 8), (seg(L2, U3), 8), (seg(U3, L3), 8),
           (seg(L1, (640, 448)), 9), (seg(U3, (920, 360)), 9)]
    tubes(P, tb_, fill=TINT2)
    for p in (U1, U2, U3, L1, L2, L3):
        P.circ(p[0], p[1], 4.5, 'n f')
    # engine mount plates
    for p in ((640, 452), (920, 362)):
        P.circ(p[0], p[1], 13, 't o'); P.bolt(p[0], p[1], 6)
    # head tube
    P.path(quad(along(H1, H2, -0.12), along(H2, H1, -0.08), 17), 't2 o')

# ------------------------------------------------ tank, seat, tail
with P.part('Sculpted fuel tank', 'frame_body', 'tank') as g_tk:
    tk = [(596, 214), (640, 168), (720, 150), (810, 158), (884, 190), (930, 244), (918, 282), (850, 268), (760, 246), (660, 236)]
    P.path(cr(tk, closed=True), 't o')
    P.path(cr([(650, 200), (720, 176), (810, 182), (880, 222)]), 'n f')
    P.path(cr([(700, 236), (760, 224), (830, 236), (890, 262)]), 'n f')
    P.circ(760, 156, 13, 't2 i'); P.circ(760, 156, 6, 'n f')     # flush filler cap
with P.part('Seat', 'frame_body', 'seat') as g_se:
    se = [(900, 262), (960, 246), (1060, 240), (1150, 236), (1190, 226), (1196, 246), (1100, 262), (960, 276), (912, 284)]
    P.path(cr(se, closed=True), 't2 o')
    P.path(cr([(930, 262), (1040, 252), (1170, 238)]), 'n f', 'stroke-dasharray="3 3"')
with P.part('Short tail with LED light', 'frame_body', 'tail') as g_tl:
    tl = [(1150, 238), (1230, 205), (1300, 196), (1312, 206), (1290, 226), (1200, 262), (1120, 268)]
    P.path(cr(tl, closed=True), 't o')
    P.path(poly([(1280, 200), (1306, 199), (1304, 210), (1284, 216)]), 'w i')
    for k in range(4):
        P.line((1286 + k * 5, 202), (1285 + k * 5, 213), 'acct')
    # number plate hanger and indicator
    tubes(P, [(cr([(1240, 250), (1290, 268), (1320, 320)]), 6)])
    P.path(poly([(1300, 316), (1352, 300), (1360, 362), (1306, 376)]), 'w o')
    P.path(quad((1268, 252), (1300, 248), 4), 't2 i'); P.circ(1302, 248, 5, 't2 i')
    # hugger over rear tyre
    P.path(arc_d(RX, RY, RR + 12, 205, 262) + ' ' + arc_d(RX, RY, RR + 4, 262, 205, move=False) + ' Z', 't i')

# ------------------------------------------------ front wheel, brakes, fork
with P.part('17 in cast wheel', 'wheels', 'fwheel') as g_fw:
    cast_wheel(P, FX, FY, FR, 143, 128, nspoke=5, split=True, phase=90, step=7)
    valve_side(P, FX, FY, 128, 150, 22)
with P.part('Twin 320 mm discs', 'chassis', 'discs') as g_dc:
    wave_disc(P, FX, FY, 106, 80, n=12, holes=True, petal=False)
    disc_carrier(P, FX, FY, 80, 34, n=6)
    hub_centre(P, FX, FY, 24)
with P.part('Front mudguard', 'frame_body', 'fender') as g_fd:
    P.path(arc_d(FX, FY, FR + 14, 220, 318) + ' ' + arc_d(FX, FY, FR + 5, 318, 220, move=False) + ' Z', 't o')
    P.path(arc_d(FX, FY, FR + 10, 230, 308), 'n f')
with P.part('USD fork', 'chassis', 'fork') as g_fk:
    top_ = F(522)
    usd_fork(P, (FX, FY), top_, outer_w=38, inner_w=26, split=0.5)
    triple_clamp(P, F(400, -16), F(400, 46), 26)
    triple_clamp(P, F(480, -16), F(480, 46), 22)
with P.part('Radial caliper', 'chassis', 'caliper') as g_cl:
    c = pol(FX, FY, 93, -32)
    radial_caliper(P, c, 58, L=78, W=34)
    # brake line along fork
    P.path(cr([(c[0] + 20, c[1] - 40), F(200, 30), F(330, 34), F(470, 40)]), 'n i')

# ------------------------------------------------ headlight, bar, controls
with P.part('Round headlight and flyscreen', 'electrical', 'headlight') as g_hl:
    hc = F(388, -84)
    # brackets
    P.path(quad(hc, F(380, 0), 6), 't i')
    P.path(cr([(hc[0] + 40, hc[1] - 52), (hc[0] + 4, hc[1] - 64), (hc[0] - 42, hc[1] - 58), (hc[0] - 60, hc[1] - 40)]) , 'n o')
    shell = 'M%s C%s %s %s C%s %s %s Z' % (pt((hc[0] - 34, hc[1] - 54)), pt((hc[0] + 20, hc[1] - 56)), pt((hc[0] + 52, hc[1] - 26)), pt((hc[0] + 52, hc[1])),
                                          pt((hc[0] + 52, hc[1] + 26)), pt((hc[0] + 20, hc[1] + 56)), pt((hc[0] - 34, hc[1] + 54)))
    P.path(shell, 't o')
    P.path('M%s C%s %s %s' % (pt((hc[0] - 10, hc[1] - 50)), pt((hc[0] + 26, hc[1] - 44)), pt((hc[0] + 40, hc[1] - 20)), pt((hc[0] + 42, hc[1] + 4))), 'n f')
    P.add('<ellipse cx="%s" cy="%s" rx="15" ry="56" class="w o"/>' % (f(hc[0] - 36), f(hc[1])))
    P.add('<ellipse cx="%s" cy="%s" rx="10" ry="44" class="t2 i"/>' % (f(hc[0] - 37), f(hc[1])))
    P.add('<ellipse cx="%s" cy="%s" rx="5" ry="16" class="w i"/>' % (f(hc[0] - 38), f(hc[1])))
    # flyscreen with LCD behind
    P.path(quad((hc[0] + 34, hc[1] - 74), (hc[0] + 60, hc[1] - 64), 16), 't i')
    fs = [(hc[0] - 26, hc[1] - 58), (hc[0] + 4, hc[1] - 104), (hc[0] + 34, hc[1] - 112), (hc[0] + 28, hc[1] - 96), (hc[0] + 12, hc[1] - 60)]
    P.path(cr(fs, closed=True), 't2 o')

with P.part('Wide flat handlebar', 'chassis', 'bar') as g_bar:
    b0 = F(530, 14)
    P.path(quad(b0, (b0[0] + 6, b0[1] - 30), 9), 't o')                     # riser
    bar = [(b0[0] + 4, b0[1] - 30), (b0[0] + 40, b0[1] - 34), (b0[0] + 80, b0[1] - 30)]
    P.path(quad(bar[0], bar[2], 7), 't o')
    P.path(quad((b0[0] + 44, b0[1] - 32), (b0[0] + 96, b0[1] - 28), 10), 't2 o')   # grip
    for k in range(7):
        x = b0[0] + 50 + k * 7
        P.line((x, b0[1] - 41), (x, b0[1] - 21), 'f')
    # lever and master cylinder
    P.path(cr([(b0[0] + 34, b0[1] - 40), (b0[0] - 6, b0[1] - 30), (b0[0] - 30, b0[1] - 14)]), 'n o', 'stroke-width="5"')
    P.path(quad((b0[0] + 20, b0[1] - 44), (b0[0] + 36, b0[1] - 58), 9), 't2 i')

# ------------------------------------------------ pegs, stand
with P.part('Footpeg and gear lever', 'chassis', 'peg') as g_pg:
    P.path(poly([(880, 600), (930, 586), (946, 640), (900, 652)]), 't o')     # hanger plate
    for p in ((902, 602), (928, 630)):
        P.bolt(p[0], p[1], 4.4)
    P.path(quad((880, 640), (930, 646), 7), 't2 o')
    P.path(cr([(880, 600), (836, 612), (818, 626)]), 'n o', 'stroke-width="5"')
    P.path(quad((1020, 600), (1056, 606), 6), 't2 i')                        # pillion peg
with P.part('Side stand', 'chassis', 'stand') as g_st:
    P.path(quad((870, 680), (842, GY - 6), 8, 7), 't o'); P.path(quad((826, GY - 8), (862, GY - 8), 4), 't2 i')

# ------------------------------------------------ labels
L(g_hl, F(388, -126), top, 'Round headlight')
L(g_bar, (b0[0] + 70, b0[1] - 32), top, 'Wide flat handlebar')
L(g_tk, (840, 200), top, 'Sculpted fuel tank')
L(g_fr, along((618, 340), (802, 258), 0.5), top, 'Steel trellis frame')
L(g_se, (1020, 252), top, 'Seat')
L(g_tl, (1296, 205), top, 'Short tail, LED light')
L(g_fw, pol(FX, FY, FR - 8, 210), bot, '17 in cast wheel')
L(g_cl, pol(FX, FY, 93, -32), bot, 'Radial caliper')
L(g_fk, F(150, -10), bot, 'USD fork')
L(g_rad, (630, 420), bot, 'Radiator')
L(g_ex, (880, 700), bot, 'Underbelly exhaust')
L(g_en, pol(C[0], C[1], 120, 198), bot, '90 degree L-twin')
L(g_sh, (1015, 470), bot, 'Monoshock')
L(g_sa, (1150, 568), bot, 'Cast aluminium swingarm')
finish(P, labels)
