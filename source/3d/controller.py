"""Motor controller / traction inverter with the lid removed: finned cast housing, 6 power modules, DC-link capacitors,
copper phase busbars, gate-driver PCB, current sensors, connectors and cable glands. Long axis along X."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Motor controller (inverter), lid removed", "category": "electrical", "kind": "part", "view": (-28, 52)}
A = 'controller'
LX, LY, H, FL = 22.0, 15.0, 7.0, 1.2   # housing size, height, floor thickness

def build():
    alu = M('alu_cast'); cu = M('copper'); blk = M('plastic'); orange = M('orange'); zinc = M('zinc')
    # ---------- housing ----------
    outer = rrect(LX, LY, 1.4, 6); inner = rrect(LX - 1.4, LY - 1.4, 0.8, 6)
    walls = prism(outer, FL - 0.01, H, 'walls', 'Z', holes=[inner])
    floor = prism(outer, 0.0, FL, 'floor', 'Z')
    ears = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            e = prism(rrect(3.2, 2.6, 1.0, 4, sx * (LX / 2 + 0.8), sy * (LY / 2 - 2.0)), 0.0, 0.9, 'ear', 'Z',
                      holes=[circle(0.45, 20, sx * (LX / 2 + 1.3), sy * (LY / 2 - 2.0))])
            ears.append(e)
    hs = joinn([walls, floor] + ears, A + '__housing')
    # lid screw holes in the wall top
    sh = []
    for (x, y) in [(-LX / 2 + 0.35, -4.0), (-LX / 2 + 0.35, 4.0), (LX / 2 - 0.35, -4.0), (LX / 2 - 0.35, 4.0),
                   (-6.0, -LY / 2 + 0.35), (2.0, -LY / 2 + 0.35), (-6.0, LY / 2 - 0.35), (2.0, LY / 2 - 0.35)]:
        sh.append(cyl(0.22, 2.0, (x, y, H), (0, 0, 0), 16, 'sh'))
    cutw(hs, joinn(sh, '_screwholes'), self_=True)
    finish(hs, 0.18, 2, m=alu)
    fins = [box((LX - 1.0, 0.32, 2.6), (0, -LY / 2 + 0.9 + k * (LY - 1.8) / 13, -1.3), name='fin') for k in range(14)]
    fo = joinn(fins, A + '__heat_sink_fins'); finish(fo, 0.1, 2, m=alu)
    # gasket in a groove on top of the walls
    g = []
    pts = rrect(LX - 0.7, LY - 0.7, 1.05, 6)
    gk = tube([(x, y, H + 0.02) for x, y in pts] + [(pts[0][0], pts[0][1], H + 0.02)], 0.16, A + '__lid_gasket', M('rubber'), bezier=False, sides=2)
    gk.data.splines[0].use_cyclic_u = True

    z0 = FL
    # ---------- power modules (2 rows x 3 phases) on thermal pads ----------
    cols = [-6.6, -2.6, 1.4]
    mods = []; tabs = []; screws = []; pads = []
    for i, x in enumerate(cols):
        for j, y in enumerate((-5.0, -2.2)):
            pads.append(box((3.0, 2.3, 0.08), (x, y, z0 + 0.04), name='pad'))
            m_ = box((2.7, 2.0, 0.65), (x, y, z0 + 0.08 + 0.325), name='mod'); finish(m_, 0.08, 2); apply_mods(m_); mods.append(m_)
            for dx in (-0.85, 0.85):
                tabs.append(box((0.6, 0.9, 0.08), (x + dx, y + (0.95 if j == 0 else -0.95), z0 + 0.78), name='tab'))
            for dx in (-1.55, 1.55):
                screws.append(cyl(0.28, 0.25, (x + dx, y, z0 + 0.45), (0, 0, 0), 16, 'scr'))
            # gate pins
            for k in range(3):
                tabs.append(box((0.08, 0.08, 0.7), (x - 0.4 + k * 0.4, y + (-1.05 if j == 0 else 1.05), z0 + 0.7), name='pin'))
    mo = joinn(mods, A + '__power_modules'); finish(mo, 0, m=mat('epoxy', (0.025, 0.025, 0.028), 0.0, 0.35))
    po = joinn(pads, A + '__thermal_pads'); finish(po, 0, m=mat('tpad', (0.55, 0.35, 0.65), 0.0, 0.7))
    to = joinn(tabs, A + '__module_terminals'); finish(to, 0, m=cu)
    so = joinn(screws, A + '__module_screws'); finish(so, 0.03, 1, m=zinc)

    # ---------- phase busbars to the output terminals (+X wall) ----------
    bars = []; studs = []; sensors = []
    yb = [-6.0, -3.6, -1.2]
    for i, x in enumerate(cols):
        y = yb[i]; zb = z0 + 2.4 + i * 0.0
        bars.append(box((0.9, 0.18, 1.6), (x, -3.6, z0 + 1.4), name='riser'))       # riser between the two module rows
        bars.append(box((0.9, abs(-3.6 - y) + 0.9, 0.18), (x, (-3.6 + y) / 2, z0 + 2.2), name='jog'))
        bars.append(box((LX / 2 - 0.7 - x, 0.9, 0.18), ((x + LX / 2 - 0.7) / 2, y, z0 + 2.2), name='run'))
        bars.append(box((0.18, 0.9, 1.6), (LX / 2 - 0.8, y, z0 + 2.95), name='up'))
        studs.append(cyl(0.38, 2.4, (LX / 2 - 0.2, y, z0 + 3.4), RX, 6, 'stud'))
        sensors.append(prism(rrect(1.8, 1.6, 0.4, 4), 6.6, 7.6, 'cs', 'X', holes=[rrect(1.1, 0.5, 0.1, 2)]))
        sensors[-1].location = (0, y, z0 + 2.2)
    bo = joinn(bars, A + '__phase_busbars'); finish(bo, 0.05, 2, m=cu)
    st = joinn(studs, A + '__phase_terminals'); finish(st, 0.04, 2, m=M('brass'))
    se = joinn(sensors, A + '__current_sensors'); finish(se, 0.12, 2, m=blk)

    # ---------- DC-link capacitor bank + laminated DC busbar ----------
    caps = []; tops = []
    for x in (-7.2, -4.6, -2.0):
        for y in (2.3, 4.9):
            caps.append(spin([(0.001, z0), (1.15, z0), (1.18, z0 + 0.1), (1.18, z0 + 4.1), (1.1, z0 + 4.2), (0.001, z0 + 4.2)], 'cap', 'Z', (x, y, 0), 48))
            tops.append(cyl(1.0, 0.06, (x, y, z0 + 4.22), (0, 0, 0), 40, 'top'))
            for a in (0, math.pi / 2):
                tops.append(box((1.6, 0.06, 0.05), (x, y, z0 + 4.26), (0, 0, a), 'vent'))
    co = joinn(caps, A + '__dc_link_capacitors'); finish(co, 0.0, m=mat('cap_sleeve', (0.05, 0.12, 0.35), 0.0, 0.3, coat=0.4))
    tp = joinn(tops, A + '__capacitor_tops'); finish(tp, 0, m=M('alu_satin'))
    dcp = box((7.6, 4.6, 0.16), (-4.6, 3.6, z0 + 4.55), name=A + '__dc_busbar_positive'); finish(dcp, 0.04, 1, m=cu)
    ins = box((7.9, 4.9, 0.08), (-4.6, 3.6, z0 + 4.67), name=A + '__dc_busbar_insulation'); finish(ins, 0.02, 1, m=mat('kapton', (0.75, 0.42, 0.06), 0.0, 0.3, coat=0.5))
    dcn = box((7.6, 4.6, 0.16), (-4.6, 3.6, z0 + 4.79), name=A + '__dc_busbar_negative'); finish(dcn, 0.04, 1, m=cu)
    # DC bus link down to the modules
    lk = [box((0.9, 2.0, 0.16), (x, 0.4, z0 + 1.05), name='l') for x in cols] + [box((0.9, 0.16, 3.6), (-7.2 + 0.0, 1.2, z0 + 2.9), name='v')]
    lko = joinn(lk, A + '__dc_links'); finish(lko, 0.04, 1, m=cu)
    # DC input terminals at the -X wall
    dct = [cyl(0.5, 2.6, (-LX / 2 + 0.6, y, z0 + 4.7), RX, 6, 'dct') for y in (2.6, 4.8)]
    dco = joinn(dct, A + '__dc_terminals'); finish(dco, 0.04, 2, m=M('brass'))

    # ---------- gate-driver / control PCB on standoffs ----------
    pcb = box((8.4, 6.0, 0.16), (5.4, 3.4, z0 + 3.4), name=A + '__gate_driver_pcb'); finish(pcb, 0.03, 1, m=M('pcb'))
    stdf = [cyl(0.25, 3.3, (5.4 + sx * 3.8, 3.4 + sy * 2.6, z0 + 1.65), (0, 0, 0), 6, 'so') for sx in (-1, 1) for sy in (-1, 1)]
    sd = joinn(stdf, A + '__pcb_standoffs'); finish(sd, 0.02, 1, m=M('brass'))
    chips = []
    import random; rnd = random.Random(4)
    for (x, y, w, d_, h) in [(3.0, 2.0, 1.4, 1.4, 0.18), (5.6, 2.0, 1.0, 1.0, 0.15), (7.8, 1.6, 0.8, 1.2, 0.18), (3.0, 4.6, 0.9, 0.6, 0.15),
                             (4.6, 5.4, 0.6, 0.6, 0.15), (6.2, 4.8, 1.6, 0.8, 0.2), (8.4, 4.8, 0.7, 0.7, 0.15), (2.4, 5.8, 0.5, 0.9, 0.12)]:
        chips.append(box((w, d_, h), (x, y, z0 + 3.48 + h / 2), name='chip'))
    for k in range(10):
        chips.append(box((0.3, 0.16, 0.12), (2.0 + rnd.random() * 7.0, 0.8 + rnd.random() * 5.0, z0 + 3.54), name='smd'))
    cp = joinn(chips, A + '__pcb_components'); finish(cp, 0.02, 1, m=M('chip'))
    xf = [box((1.1, 1.1, 0.9), (4.4 + k * 1.6, 3.4, z0 + 3.93), name='xf') for k in range(3)]
    xo = joinn(xf, A + '__isolation_transformers'); finish(xo, 0.06, 2, m=mat('xfmr', (0.85, 0.82, 0.70), 0.0, 0.45))
    ecaps = [cyl(0.32, 0.8, (8.6, 2.6 + k * 0.8, z0 + 3.88), (0, 0, 0), 20, 'ec') for k in range(3)]
    eo = joinn(ecaps, A + '__pcb_capacitors'); finish(eo, 0.03, 1, m=mat('ecap', (0.05, 0.05, 0.06), 0.2, 0.3))
    hdr = box((3.2, 0.9, 0.9), (5.8, 6.2, z0 + 3.93), name=A + '__pcb_header'); finish(hdr, 0.05, 1, m=mat('hdr_white', (0.85, 0.85, 0.8), 0.0, 0.4))
    # gate wires from PCB to modules (twisted pairs, simplified)
    wires = []
    for i, x in enumerate(cols):
        p0 = (x + 0.0, -1.1, z0 + 1.2); p1 = (x + 1.2, 0.2, z0 + 3.0); p2 = (3.0 + i * 1.8, 0.7, z0 + 3.5)
        wires.append(to_mesh(tube([p0, p1, p2], 0.07, 'w', M('white'), res=8, sides=1)))
        p0 = (x - 0.4, -4.0 + 2.9, z0 + 1.0)
    wo = joinn(wires, A + '__gate_wires')
    # ---------- connectors and glands ----------
    sig = box((4.2, 2.0, 2.2), (2.4, LY / 2 + 0.9, z0 + 2.6), name='sig')
    lever = box((3.6, 0.3, 1.8), (2.4, LY / 2 + 2.0, z0 + 2.8), name='lever')
    so = joinn([sig, lever], A + '__signal_connector'); finish(so, 0.12, 2, m=blk)
    glands = []; cables = []
    for y in yb:      # 3 phase outputs (+X)
        g1 = cyl(0.95, 0.6, (LX / 2 + 0.3, y, z0 + 3.4), RX, 6, 'g'); g2 = cyl(0.8, 1.3, (LX / 2 + 1.2, y, z0 + 3.4), RX, 32, 'g2')
        glands += [g1, g2]
        cables.append(to_mesh(tube([(LX / 2 + 1.6, y, z0 + 3.4), (LX / 2 + 5.0, y, z0 + 3.4), (LX / 2 + 8.0, y * 1.1, z0 + 0.5), (LX / 2 + 9.0, y * 1.2, -2.5)],
                                   0.5, 'c', orange, res=10, sides=3)))
    for y in (2.6, 4.8):  # DC input (-X)
        g1 = cyl(1.1, 0.6, (-LX / 2 - 0.3, y, z0 + 4.7), RX, 6, 'g'); g2 = cyl(0.95, 1.3, (-LX / 2 - 1.2, y, z0 + 4.7), RX, 32, 'g2')
        glands += [g1, g2]
        cables.append(to_mesh(tube([(-LX / 2 - 1.6, y, z0 + 4.7), (-LX / 2 - 5.0, y, z0 + 4.7), (-LX / 2 - 8.0, y, z0 + 1.5), (-LX / 2 - 9.0, y, -2.5)],
                                   0.62, 'c', orange, res=10, sides=3)))
    gl = joinn(glands, A + '__cable_glands'); finish(gl, 0.06, 2, m=blk)
    cb = joinn(cables, A + '__power_cables')
    # red / black polarity sleeves on the DC cables
    rings = [cyl(0.7, 1.0, (-LX / 2 - 3.2, y, z0 + 4.7), RX, 32, 'r') for y in (2.6, 4.8)]
    rings[0].data.materials.append(M('red_plast')); rings[1].data.materials.append(M('chip'))
    ro = joinn(rings, A + '__polarity_sleeves'); finish(ro, 0.05, 1)
