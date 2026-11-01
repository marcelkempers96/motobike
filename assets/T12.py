import sys; sys.path.insert(0, '/home/claude/mc/figs/types/src')
from kit_t3 import *

P = Plate('T12', 1600, 900, 'T12 Electric moped, left side elevation with battery bay cut away',
          'Battery-electric moped: rear hub motor with no chain or belt, swappable lithium battery under the seat shown cut away with its handle, '
          'motor controller and DC-DC converter under the floor, charge socket, LED headlight with ring DRL, digital display, '
          'front disc and rear drum with regenerative braking, step-through floor, twin rear shocks, under-seat storage and 14 in cast wheels.')
GY = 760
S = 0.56
X0 = 413
def M(x, h):
    return (X0 + x * S, GY - h * S)
def MP(pts):
    return [M(*p) for p in pts]
TO, TI, RIN = 257 * S, 178 * S, 158 * S
FX, FY = M(0, 257)
RX, RY = M(1320, 257)
RAKE = 26
top = Col(42, 'T', ymin=60, pitch=34)
bot = Col(842, 'B', ymin=60, pitch=34)
labels = []
def L(g, a, col, t, want=None):
    P.label(g, a, col, t, want=want); labels.append(t)

ground(P, 70, 1560, GY)
ux, uy = math.sin(math.radians(RAKE)), -math.cos(math.radians(RAKE))
def F(t, off=0):
    return (FX + ux * t + (-uy) * off, FY + uy * t + ux * off)

# ------------------------------------------------ rear wheel with hub motor
with P.part('Rear wheel', 'wheels', 'rwheel') as g_rw:
    cast_wheel(P, RX, RY, TO, TI, RIN, nspoke=5, split=True, phase=54, step=7)
with P.part('Hub motor', 'powertrain', 'hubmotor') as g_hm:
    P.circ(RX, RY, 64, 't2 o'); P.circ(RX, RY, 58, 'n f')
    for k in range(30):
        a = k * 12
        P.line(pol(RX, RY, 47, a), pol(RX, RY, 57, a), 'f')
    P.circ(RX, RY, 46, 't o')
    for k in range(6):
        p = pol(RX, RY, 37, 30 + k * 60); P.bolt(p[0], p[1], 3.6)
    P.circ(RX, RY, 19, 't2 i'); P.bolt(RX, RY, 8)
    cab = cr([(RX - 14, RY - 18), (RX - 60, RY - 42), (RX - 140, RY - 46), (RX - 200, RY - 30)])
    P.path(cab, 'n o', 'stroke-width="6"'); P.path(cab, 'n', 'stroke-width="3" stroke="#C8502A"')
with P.part('Regenerative braking', 'chassis', 'regen') as g_rg:
    P.path(sector_d(RX, RY, 46, 54, 140, 220), 'w i')
    P.path(quad(pol(RX, RY, 50, 180), (RX - 110, RY + 22), 5), 't i')
    P.circ(*pol(RX, RY, 50, 180), 4, 't2 f')

# ------------------------------------------------ swingarm + shocks
PIV = M(1000, 300)
with P.part('Swingarm', 'chassis', 'swingarm') as g_sa:
    P.path(poly([(PIV[0] - 10, PIV[1] - 15), (RX - 26, RY - 17), (RX + 10, RY - 12), (RX + 10, RY + 12), (RX - 26, RY + 17), (PIV[0] - 10, PIV[1] + 15)]), 't o')
    P.path(quad((PIV[0] + 30, PIV[1] + 2), (RX - 60, RY), 5), 'n f')
    P.circ(PIV[0], PIV[1], 13, 't2 o'); P.bolt(PIV[0], PIV[1], 6)
with P.part('Twin rear shocks', 'chassis', 'shocks') as g_sh:
    shock(P, M(1235, 590), M(1290, 290), body_w=17, spring_r=13, turns=6)

# ------------------------------------------------ rear body, seat, battery bay
with P.part('Rear body', 'frame_body', 'body') as g_bd:
    bd = MP([(890, 330), (905, 620), (950, 705), (1150, 712), (1400, 722), (1570, 712), (1650, 690), (1640, 640), (1520, 610),
             (1380, 590), (1240, 572), (1120, 470), (1060, 350), (980, 300)])
    P.path(cr(bd, closed=True), 't o')
    P.path(cr(MP([(925, 640), (1150, 650), (1400, 660), (1600, 664)])), 'n f')
    tl = MP([(1600, 700), (1652, 684), (1648, 656), (1598, 664)])
    P.path(poly(tl), 'w i')
    for k in range(3):
        a = along(tl[0], tl[3], 0.2 + k * 0.3); b = along(tl[1], tl[2], 0.2 + k * 0.3); P.line(a, b, 'acct')
    gr = cr(MP([(1360, 760), (1500, 790), (1590, 772)]))
    P.path(gr, 'n o', 'stroke-width="7"'); P.path(gr, 'n', 'stroke-width="3.5" stroke="#DCE4F2"')
with P.part('Seat', 'frame_body', 'seat') as g_se:
    se = MP([(900, 712), (980, 760), (1200, 778), (1440, 786), (1530, 776), (1540, 742), (1300, 726), (1000, 716)])
    P.path(cr(se, closed=True), 't2 o')
    P.path(cr(MP([(960, 736), (1200, 752), (1500, 760)])), 'n f', 'stroke-dasharray="3 3"')
with P.part('Swappable battery', 'electrical', 'battery') as g_bt:
    win = MP([(930, 660), (1210, 666), (1220, 420), (1100, 360), (940, 380)])
    P.path(poly(win), 'w o', 'stroke-dasharray="7 4"')
    bat = MP([(950, 640), (1196, 644), (1200, 430), (954, 426)])
    P.path(poly(bat), 't2 o')
    for r in range(3):
        for c_ in range(6):
            x, y = M(985 + c_ * 38, 605 - r * 44)
            P.circ(x, y, 9, 't i'); P.circ(x, y, 3.5, 'n f')
    a, b = M(1185, 610), M(1192, 470)
    P.path(poly([(a[0] - 3, a[1]), (a[0] + 3, a[1]), (b[0] + 3, b[1]), (b[0] - 3, b[1])]), 'af f')
    P.text(*M(1075, 446), 'Li-ion 48 V', 'm', 'middle')
with P.part('Battery handle', 'electrical', 'handle') as g_bh:
    h0, h1 = M(1020, 642), M(1130, 642)
    hd = 'M%s C%s %s %s' % (pt(h0), pt((h0[0], h0[1] - 34)), pt((h1[0], h1[1] - 34)), pt(h1))
    P.path(hd, 'n o', 'stroke-width="9"'); P.path(hd, 'n', 'stroke-width="5" stroke="#FFFFFF"')
with P.part('Under-seat storage', 'frame_body', 'storage') as g_us:
    P.path(poly(MP([(1235, 700), (1520, 706), (1500, 620), (1260, 590)])), 'n h')
    P.path(cr(MP([(1290, 640), (1380, 668), (1470, 664)])), 'n f')
with P.part('Charge socket', 'electrical', 'socket') as g_cs:
    cs = M(915, 520)
    P.circ(cs[0], cs[1], 13, 't2 o'); P.circ(cs[0], cs[1], 8, 'w i')
    for a in (0, 120, 240):
        P.circ(*pol(cs[0], cs[1], 4, a + 90), 1.6, 'k')

# ------------------------------------------------ floor and under-floor electronics
with P.part('Step-through floor', 'frame_body', 'floor') as g_fl:
    fl = MP([(370, 340), (900, 340), (915, 310), (890, 220), (420, 214), (370, 270)])
    P.path(poly(fl), 't o')
    a, b = M(390, 340), M(890, 340)
    for k in range(16):
        x = a[0] + 10 + k * (b[0] - a[0] - 20) / 15.0; P.line((x - 4, a[1] - 3), (x + 4, a[1] - 3), 'o')
with P.part('Motor controller', 'electrical', 'controller') as g_ct:
    P.path(poly(MP([(450, 300), (660, 300), (662, 236), (452, 234)])), 'n h')
    for k in range(7):
        x, y = M(470 + k * 28, 296); P.line((x, y), (x, y + 30), 'f')
with P.part('DC-DC converter', 'electrical', 'dcdc') as g_dd:
    P.path(poly(MP([(690, 300), (800, 300), (800, 238), (690, 236)])), 'n h')
    P.text(*M(745, 262), 'DC-DC', 'm', 'middle', 'style="font-size:11px"')
with P.part('Centre stand', 'chassis', 'stand') as g_st:
    P.path(quad(M(1000, 250), (M(960, 6)[0], GY - 4), 6, 5), 't o')
    P.path(quad((M(930, 0)[0], GY - 5), (M(1000, 0)[0], GY - 5), 3.5), 't2 i')

# ------------------------------------------------ front wheel, fork, cowl
with P.part('14 in cast wheel', 'wheels', 'fwheel') as g_fw:
    cast_wheel(P, FX, FY, TO, TI, RIN, nspoke=5, split=True, phase=90, step=7)
    valve_side(P, FX, FY, RIN, 140, 14)
with P.part('Front disc brake', 'chassis', 'disc') as g_dc:
    wave_disc(P, FX, FY, 56, 38, n=10, holes=True, petal=True)
    disc_carrier(P, FX, FY, 38, 18, n=5, buttons=False)
    hub_centre(P, FX, FY, 15)
with P.part('Front mudguard', 'frame_body', 'fender') as g_fd:
    P.path(arc_d(FX, FY, TO + 11, 210, 320) + ' ' + arc_d(FX, FY, TO + 4, 320, 210, move=False) + ' Z', 't o')
with P.part('Telescopic fork', 'chassis', 'fork') as g_fk:
    conv_fork(P, (FX, FY), F(330), slider_w=22, stan_w=16, split=0.45)
    foot = [(FX - 13, FY - 10), (FX + 13, FY - 14), (FX + 16, FY + 9), (FX - 10, FY + 13)]
    P.path(poly(foot), 't o'); P.bolt(FX, FY, 6)
    sliding_caliper(P, pol(FX, FY, 50, -28), 62, L=36, W=20)
with P.part('Front cowl and legshield', 'frame_body', 'cowl') as g_cw:
    cw = MP([(205, 1000), (290, 1010), (360, 960), (380, 820), (395, 640), (405, 440), (400, 340), (360, 300), (330, 360),
             (300, 520), (240, 640), (160, 760), (128, 860), (150, 960)])
    P.path(cr(cw, closed=True), 't o')
    P.path(cr(MP([(330, 960), (350, 800), (360, 600), (370, 380)])), 'n f')
with P.part('LED headlight with ring DRL', 'electrical', 'headlight') as g_hl:
    hc = M(185, 860)
    for rx, ry, cls in ((20, 40, 'w o'), (15, 31, 'n acc'), (8, 16, 't2 i')):
        P.add('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" class="%s" transform="rotate(-22 %s %s)"/>' % (f(hc[0]), f(hc[1]), rx, ry, cls, f(hc[0]), f(hc[1])))
    ip = M(258, 620)
    P.path(poly([(ip[0] - 6, ip[1] - 12), (ip[0] + 8, ip[1] - 14), (ip[0] + 8, ip[1] + 8), (ip[0] - 4, ip[1] + 9)]), 't2 i')
with P.part('Handlebar', 'chassis', 'bar') as g_bar:
    b0 = M(270, 1065)
    P.path(quad(M(300, 990), (b0[0] + 4, b0[1] + 10), 9), 't o')   # steering stem
    P.path(cr([(b0[0] - 50, b0[1] + 14), (b0[0] - 26, b0[1] - 8), (b0[0] + 30, b0[1] - 12), (b0[0] + 50, b0[1] + 6), (b0[0] + 26, b0[1] + 24), (b0[0] - 34, b0[1] + 26)], closed=True), 't o')
    P.path(quad((b0[0] + 38, b0[1]), (b0[0] + 92, b0[1] + 4), 9), 't2 o')
    for k in range(7):
        x = b0[0] + 44 + k * 7; P.line((x, b0[1] - 8), (x, b0[1] + 12), 'f')
    P.path(cr([(b0[0] + 30, b0[1] - 6), (b0[0] - 6, b0[1] - 2), (b0[0] - 24, b0[1] + 14)]), 'n o', 'stroke-width="5"')
    P.path(cr([(b0[0] + 12, b0[1] - 10), (b0[0] + 6, b0[1] - 50), (b0[0] + 16, b0[1] - 74)]), 'n o', 'stroke-width="4"')
    P.path('M%s a20 9 -14 1 0 40 -9 a20 9 -14 1 0 -40 9 Z' % pt((b0[0] - 2, b0[1] - 74)), 't o')
with P.part('Digital display', 'electrical', 'display') as g_ds:
    d0 = (b0[0] - 38, b0[1] - 4)
    P.path(poly([(d0[0] - 8, d0[1]), (d0[0] + 32, d0[1] - 14), (d0[0] + 38, d0[1] - 2), (d0[0] - 2, d0[1] + 12)]), 'w o')
    P.path(poly([(d0[0], d0[1] - 1), (d0[0] + 28, d0[1] - 11), (d0[0] + 32, d0[1] - 3), (d0[0] + 4, d0[1] + 7)]), 't2 f')

# ------------------------------------------------ labels
L(g_hl, (hc[0], hc[1] - 10), top, 'LED headlight and DRL')
L(g_ds, (d0[0] + 14, d0[1] - 4), top, 'Digital display')
L(g_bt, M(1000, 520), top, 'Swappable battery')
L(g_bh, M(1075, 666), top, 'Battery handle')
L(g_us, M(1400, 660), top, 'Under-seat storage')
L(g_sh, M(1262, 440), top, 'Twin rear shocks')
L(g_fw, pol(FX, FY, TO - 5, 210), bot, '14 in cast wheel')
L(g_ct, M(560, 268), bot, 'Motor controller')
L(g_fl, M(640, 340), bot, 'Step-through floor')
L(g_cs, cs, bot, 'Charge socket')
L(g_rg, pol(RX, RY, 50, 172), bot, 'Regenerative braking')
L(g_hm, pol(RX, RY, 60, 60), bot, 'Hub motor')
finish(P, labels)
