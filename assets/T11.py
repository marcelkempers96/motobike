import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from kit_t3 import *

P = Plate('T11', 1600, 900, 'T11 Trials motorcycle, left side elevation',
          'Observed-trials motorcycle: very high wide handlebar, minimal seat pad, fuel tank under the seat unit, aluminium twin-beam frame, '
          'small two-stroke single with bash plate, radiator and fan, footpegs placed for standing, long-travel fork, linkage monoshock, '
          '21 in front and 18 in rear spoked wheels with soft tubeless trials tyres.')
GY = 790
FX, FY, FR = 390, 585, 205      # 2.75-21
RX, RY, RR = 1208, 590, 200     # 4.00 R18
RAKE = 23
top = Col(42, 'T', ymin=60, pitch=34)
bot = Col(842, 'B', ymin=60, pitch=34)
labels = []
def L(g, a, col, t, want=None):
    P.label(g, a, col, t, want=want); labels.append(t)

ground(P, 70, 1560, GY)
ux, uy = math.sin(math.radians(RAKE)), -math.cos(math.radians(RAKE))
def F(t, off=0):
    return (FX + ux * t + (-uy) * off, FY + uy * t + ux * off)
H1, H2 = F(400, 22), F(478, 22)


def trials_tyre(P, cx, cy, ro, ri, n=40):
    body = ro - 9
    P.path(ring_d(cx, cy, body, ri), 't2 o', 'fill-rule="evenodd"')
    P.circ(cx, cy, ri + (body - ri) * 0.5, 'n f')
    pa = 360.0 / n
    for k in range(n):
        a = k * pa
        w = pa * (0.62 if k % 2 == 0 else 0.48)
        h1 = ro if k % 2 == 0 else ro - 2.5
        pts = [pol(cx, cy, body - 1, a - w * 0.55), pol(cx, cy, h1, a - w / 2), pol(cx, cy, h1, a + w / 2), pol(cx, cy, body - 1, a + w * 0.55)]
        P.path(poly(pts), 't2 i')
        P.line(pol(cx, cy, body - 6, a - w * 0.25), pol(cx, cy, body - 6, a + w * 0.25), 'f')


def spoked(P, cx, cy, rim_o, rim_i, hub_r, n=32, phase=4):
    rim_side(P, cx, cy, rim_o, rim_i, well=rim_i + 5)
    back = spokes(P, cx, cy, hub_r - 6, rim_i, n, 48, phase=phase, front=False, cls='f')
    P.circ(cx, cy, hub_r, 't o'); P.circ(cx, cy, hub_r - 9, 'n f')
    front = spokes(P, cx, cy, hub_r - 6, rim_i, n, 48, phase=phase, front=True, cls='i')
    nipples(P, cx, cy, rim_i - 4, front + back)


# ------------------------------------------------ rear wheel + chain
with P.part('Trials tyre', 'wheels', 'rtyre') as g_rt:
    trials_tyre(P, RX, RY, RR, 132, n=42)
with P.part('18 in rear wheel', 'wheels', 'rwheel') as g_rw:
    spoked(P, RX, RY, 132, 120, 34, n=32)
    valve_side(P, RX, RY, 120, 230, 20)
with P.part('Rear sprocket', 'transmission', 'rsprocket') as g:
    sprocket(P, RX, RY, 84, 42, inner=70, bolts=6)
    hub_centre(P, RX, RY, 18)

PIV = (872, 520)
FS = (858, 548)
with P.part('Drive chain', 'transmission', 'chain') as g_ch:
    chain_run(P, FS, 20, (RX, RY), 84, pitch=10)
with P.part('Aluminium swingarm', 'chassis', 'swingarm') as g_sa:
    pts = [(PIV[0] - 14, PIV[1] - 20), (PIV[0] + 70, PIV[1] - 26), (RX - 60, RY - 18), (RX + 20, RY - 12),
           (RX + 20, RY + 12), (RX - 60, RY + 16), (PIV[0] + 70, PIV[1] + 30), (PIV[0] - 14, PIV[1] + 20)]
    P.path(poly(pts), 't o')
    P.path(quad((PIV[0] + 90, PIV[1] - 2), (RX - 80, RY - 1), 6), 'n f')
    P.circ(PIV[0], PIV[1], 17, 't2 o'); P.bolt(PIV[0], PIV[1], 8)
    P.path(quad((RX - 40, RY - 4), (RX + 12, RY - 2), 9), 't2 i')      # adjuster block
    P.bolt(RX + 14, RY - 2, 4)
    P.path(quad((PIV[0] + 26, PIV[1] - 20), (PIV[0] + 130, PIV[1] - 14), 5), 'w i')   # chain slider

# ------------------------------------------------ silencer (right side, seen above wheel)
with P.part('Silencer', 'powertrain', 'silencer') as g_sl:
    P.path(quad((990, 382), (1200, 352), 22, 20), 't o')
    for t in (0.06, 0.94):
        P.path(quad(along((990, 382), (1200, 352), t - 0.02), along((990, 382), (1200, 352), t + 0.02), 23), 't2 i')
    P.path(quad((1200, 352), (1232, 348), 7), 't2 i')

# ------------------------------------------------ linkage monoshock
with P.part('Linkage monoshock', 'chassis', 'shock') as g_sh:
    shock(P, (900, 336), (930, 510), body_w=24, spring_r=17, turns=7, reservoir=True)
    # rocker and pull rods under the swingarm
    rk = [(915, 545), (990, 548), (968, 580)]
    P.path(poly(rk), 't o'); [P.bolt(p[0], p[1], 4.4) for p in rk]
    P.path(quad((930, 510), (930, 545), 6), 't i')
    P.path(quad((968, 580), (880, 556), 6), 't i')
    P.circ(880, 556, 7, 't2 i')

# ------------------------------------------------ seat unit with tank
with P.part('Fuel tank under seat unit', 'frame_body', 'tank') as g_tk:
    su = [(880, 332), (960, 322), (1050, 306), (1120, 290), (1150, 294), (1120, 330), (1000, 374), (900, 388)]
    P.path(cr(su, closed=True), 't o')
    tk = [(905, 342), (1030, 318), (1060, 330), (990, 366), (915, 376)]
    P.path(cr(tk, closed=True), 'n h')
    P.circ(980, 332, 9, 't2 i'); P.circ(980, 332, 4, 'n f')
with P.part('Minimal seat pad', 'frame_body', 'seat') as g_se:
    P.path(cr([(990, 314), (1050, 302), (1110, 290), (1132, 290), (1128, 300), (1060, 314), (995, 324)], closed=True), 't2 o')
    # rear mudguard
    P.path(cr([(1110, 318), (1200, 322), (1290, 344), (1330, 360), (1324, 370), (1240, 352), (1140, 340), (1100, 336)], closed=True), 't o')

# ------------------------------------------------ engine: two-stroke single
C = (760, 488)
with P.part('Two-stroke single, 280 cc', 'powertrain', 'engine') as g_en:
    cc = [(668, 470), (700, 440), (780, 428), (850, 448), (874, 490), (860, 548), (800, 572), (720, 572), (676, 540)]
    P.path(cr(cc, closed=True), 't o')
    P.circ(C[0], C[1], 46, 't2 o'); P.circ(C[0], C[1], 38, 'n f')
    for k in range(6):
        p = pol(C[0], C[1], 42, 15 + k * 60); P.bolt(p[0], p[1], 3.2)
    P.circ(C[0], C[1], 11, 't i')
    # inclined cylinder with fins on head
    a0 = pol(C[0], C[1], 40, 252); a1 = pol(C[0], C[1], 118, 252); a2 = pol(C[0], C[1], 160, 252)
    P.path(quad(a0, a1, 34, 32), 't o')
    for t in (0.3, 0.6):
        P.path(quad(along(a0, a1, t), along(a0, a1, t + 0.02), 34), 'n f')
    for k in range(5):
        q = along(a1, a2, 0.12 + k * 0.2)
        P.path(quad(q, along(q, a2, 0.05), 44 - k * 2), 't2 i')
    P.path(quad(a1, a2, 30), 't i')
    pl = along(a1, a2, 1.05)
    P.circ(pl[0], pl[1], 8, 't2 i'); P.path(quad(pl, (pl[0] + 34, pl[1] - 18), 3), 'n i')   # plug and HT lead
    # reed block, carburettor
    P.path(quad((806, 438), (842, 404), 15), 't2 o'); P.circ(846, 400, 12, 't i')
    # clutch actuation and kickstart
    P.path(cr([(850, 470), (880, 448), (900, 452)]), 'n o', 'stroke-width="6"')
with P.part('Bash plate', 'frame_body', 'bash') as g_bp:
    bp = [(650, 520), (680, 576), (860, 580), (880, 556), (872, 566), (690, 594), (646, 532)]
    P.path(poly([(646, 518), (686, 580), (866, 584), (890, 552), (896, 566), (870, 596), (680, 596), (636, 524)]), 't o')
    for x in (700, 760, 820):
        P.bolt(x, 588, 4)

# ------------------------------------------------ exhaust chamber (front loop)
with P.part('Expansion chamber', 'powertrain', 'pipe') as g_ex:
    port = pol(C[0], C[1], 95, 232)
    tubes(P, [(cr([port, (650, 410), (612, 460), (626, 530), (690, 548)]), 16),
              (cr([(690, 548), (760, 556)]), 12)])
    P.path(quad(port, along(port, (650, 410), 0.25), 12), 't2 i')
    P.circ(628, 500, 4, 'k')

# ------------------------------------------------ frame
with P.part('Aluminium frame', 'frame_body', 'frame') as g_fr:
    tubes(P, [(cr([H2, (680, 236), (790, 330), (866, 430), (884, 500)]), 24),
              (cr([H1, (600, 300), (624, 400), (640, 470)]), 16),
              (cr([(790, 330), (900, 330), (1000, 320)]), 10)], fill=TINT)
    P.path(cr([along(H2, (680, 236), 0.4), (740, 280), (820, 360)]), 'n f')
    P.path(cr([(660, 230), (720, 268), (790, 330)]), 'n f')
    # head tube
    P.path(quad(along(H1, H2, -0.15), along(H2, H1, -0.1), 15), 't2 o')
    # pivot plate
    pp = [(850, 450), (900, 460), (910, 540), (860, 560), (838, 520)]
    P.path(poly(pp), 't o'); P.bolt(872, 520, 6)
    P.bolt(640, 468, 5); P.bolt(866, 432, 5)

# ------------------------------------------------ radiator with fan
with P.part('Radiator and fan', 'powertrain', 'radiator') as g_rad:
    rc = [(612, 300), (660, 296), (672, 420), (624, 424)]
    P.path(poly(rc), 't2 o')
    for k in range(1, 13):
        t = k / 13.0; P.line(along(rc[0], rc[3], t), along(rc[1], rc[2], t), 'f')
    P.circ(642, 360, 26, 'w i'); P.circ(642, 360, 7, 't i')
    for k in range(5):
        a = k * 72
        P.path(cr([pol(642, 360, 8, a), pol(642, 360, 18, a + 20), pol(642, 360, 24, a + 50)]), 'n i')
    P.path(cr([(668, 418), (690, 432), (700, 456)]), 'n o', 'stroke-width="6"')

# ------------------------------------------------ front wheel, fork
with P.part('21 in front wheel', 'wheels', 'fwheel') as g_fw:
    trials_tyre(P, FX, FY, FR, 142, n=46)
    spoked(P, FX, FY, 142, 131, 30, n=32, phase=2)
with P.part('Small front disc', 'chassis', 'disc') as g_dc:
    wave_disc(P, FX, FY, 58, 40, n=10, holes=True, petal=True)
    P.path(ring_d(FX, FY, 40, 34), 't i', 'fill-rule="evenodd"')
    hub_centre(P, FX, FY, 16)
    sliding_caliper(P, pol(FX, FY, 50, -30), 60, L=48, W=26)
with P.part('Long-travel fork', 'chassis', 'fork') as g_fk:
    conv_fork(P, (FX, FY), F(500), slider_w=30, stan_w=22, split=0.46)
    foot = [(FX - 18, FY - 12), (FX + 16, FY - 20), (FX + 22, FY + 12), (FX - 14, FY + 18)]
    P.path(poly(foot), 't o'); P.bolt(FX, FY, 7)
    triple_clamp(P, F(400, -14), F(400, 44), 24)
    triple_clamp(P, F(478, -14), F(478, 44), 20)
    for k in range(4):
        P.path(quad(F(250 + k * 14, 0), F(256 + k * 14, 0), 14), 'n f')
with P.part('Front mudguard', 'frame_body', 'fender') as g_fd:
    P.path(arc_d(FX, FY, FR + 14, 215, 300) + ' ' + arc_d(FX, FY, FR + 6, 300, 215, move=False) + ' Z', 't o')
with P.part('Number plate', 'frame_body', 'plate') as g_np:
    npc = F(410, -46)
    P.path(poly([(npc[0] - 18, npc[1] - 44), (npc[0] + 8, npc[1] - 50), (npc[0] + 18, npc[1] + 40), (npc[0] - 8, npc[1] + 48)]), 'w o')
    P.add('<ellipse cx="%s" cy="%s" rx="5" ry="12" class="t2 i"/>' % (f(npc[0] - 12), f(npc[1] + 8)))
    P.path(quad((npc[0] + 12, npc[1] - 20), F(410, 0), 3), 't2 i'); P.path(quad((npc[0] + 14, npc[1] + 24), F(380, 0), 3), 't2 i')

# ------------------------------------------------ high wide handlebar
with P.part('High wide handlebar', 'chassis', 'bar') as g_bar:
    b0 = F(500, 18)
    P.path(quad(b0, (b0[0] + 4, b0[1] - 44), 9), 't o')       # tall riser
    P.bolt(b0[0] + 2, b0[1] - 30, 4)
    br = [(b0[0] + 2, b0[1] - 46), (b0[0] + 24, b0[1] - 56), (b0[0] + 64, b0[1] - 58)]
    P.path(quad(br[0], br[2], 7), 't o')
    P.path(quad((b0[0] + 30, b0[1] - 58), (b0[0] + 82, b0[1] - 60), 10), 't2 o')
    for k in range(7):
        x = b0[0] + 36 + k * 7; P.line((x, b0[1] - 69), (x, b0[1] - 49), 'f')
    P.path(cr([(b0[0] + 22, b0[1] - 64), (b0[0] - 14, b0[1] - 56), (b0[0] - 34, b0[1] - 40)]), 'n o', 'stroke-width="5"')
    P.path(cr([(b0[0] + 8, b0[1] - 60), (b0[0] - 20, b0[1] + 40), F(330, 40)]), 'n i')   # cable

# ------------------------------------------------ pegs
with P.part('Standing footpegs', 'chassis', 'pegs') as g_pg:
    P.path(poly([(824, 548), (868, 548), (870, 572), (826, 574)]), 't o')
    for k in range(6):
        x = 828 + k * 7.5
        P.path(poly([(x, 548), (x + 3, 540), (x + 6, 548)]), 'k')
    P.circ(846, 560, 5, 'w i')
    P.path(cr([(824, 562), (790, 574), (772, 590)]), 'n o', 'stroke-width="5"')   # gear lever

# ------------------------------------------------ labels
L(g_bar, (b0[0] + 60, b0[1] - 58), top, 'High wide handlebar')
L(g_rad, (650, 320), top, 'Radiator and fan')
L(g_fr, (720, 262), top, 'Aluminium frame')
L(g_se, (1100, 298), top, 'Minimal seat pad', want=1180)
L(g_tk, (1000, 345), top, 'Fuel tank under seat unit', want=980)
L(g_sh, (912, 400), top, 'Linkage monoshock', want=880)
L(g_fw, pol(FX, FY, 136, 200), bot, '21 in front wheel')
L(g_fk, F(170, 0), bot, 'Long-travel fork')
L(g_ex, (612, 470), bot, 'Expansion chamber')
L(g_en, pol(C[0], C[1], 80, 252), bot, 'Two-stroke single')
L(g_bp, (760, 592), bot, 'Bash plate')
L(g_pg, (846, 556), bot, 'Standing footpegs')
L(g_rt, pol(RX, RY, RR - 5, 60), bot, 'Soft trials tyre')
finish(P, labels)
