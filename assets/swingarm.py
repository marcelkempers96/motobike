"""Tapered aluminium box-section swingarm with pivot, cross-brace, linkage mounts and chain adjusters. Pivot at origin, axis Y."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Swingarm (aluminium box-section)", "category": "chassis", "kind": "part", "view": (-42, 22)}
A = 'swingarm'
AX = -56.0; AZ = -4.0; YA = 11.6

def arm_section(x, y):
    t = (x - (-2.0)) / (AX - 2.5 - (-2.0))
    t = min(max(t, 0), 1)
    h = 10.0 + (5.2 - 10.0) * t ** 0.85
    w = 3.6 + (3.0 - 3.6) * t
    zc = AZ * (x / AX) + 0.6 * math.sin(math.pi * t)
    # arms flare slightly outward to the rear to clear the tyre
    yc = y + math.copysign(0.6 * t, y)
    pts = rrect(w, h, 0.9, 4)
    return [V((x, yc + u, zc + v)) for u, v in pts], zc, h

def build():
    alu = noisy_mat('swingarm_alu', (0.80, 0.80, 0.81), 1.0, 0.28, 0.06, 160, 0.04)
    black = M('black_anod'); zinc = M('zinc'); plast = M('plastic')
    pmat = noisy_mat('swingarm_panel', (0.42, 0.43, 0.45), 1.0, 0.22, 0.04, 200, 0.02)
    # ---------- arms ----------
    for s, side in ((-1, 'left'), (1, 'right')):
        y = s * YA
        xs = [-1.5 - i * (AX - 3.0 + 1.5) / 18 * -1 for i in range(19)]
        xs = [-1.5 + (AX - 3.2 + 1.5) * i / 18 for i in range(19)]
        secs = [arm_section(x, y)[0] for x in xs]
        arm = loft(secs, A + f'__{side}_arm')
        # axle slot
        _, zc, h = arm_section(AX, y)
        yc = y + s * 0.6
        slot = prism(rrect(5.4, 2.6, 1.29, 6, AX + 0.3, zc), yc - 3, yc + 3, '_slot', 'Y')
        slot.data.transform(mathutils.Matrix.Identity(4))
        # prism 'Y' expects (x,z) polys: rrect gives (x,z) pairs centred at (AX, zc)
        cutw(arm, slot)
        # hollow end for the adjuster block
        endp = box((3.2, 1.4, 3.2), (AX - 2.6, yc, zc), name='_endpocket'); cutw(arm, endp)
        # recessed side panel on the outer face (box-section look)
        pk = []
        for x in [-6.0 + (AX + 11.0 + 6.0) * i / 12 for i in range(13)]:
            tt = min(max((x + 2.0) / (AX - 4.5), 0), 1)
            _, zc2, h2 = arm_section(x, y)
            w2 = 3.6 + (3.0 - 3.6) * tt; yo = y + s * 0.6 * tt + s * w2 / 2
            hh = max(h2 / 2 - 1.35, 0.6)
            pk.append([V((x, yo - s * 0.55, zc2 - hh)), V((x, yo + s * 2, zc2 - hh)), V((x, yo + s * 2, zc2 + hh)), V((x, yo - s * 0.55, zc2 + hh))])
        pko = loft(pk, '_panel'); pko.data.materials.append(pmat); arm.data.materials.append(alu)
        md = cutw(arm, pko); md.material_mode = 'TRANSFER'
        finish(arm, 0.25, 3)
        # pivot boss
        pb = cyl(3.7, 4.2, (0, y + s * 0.0, 0), RY, 64, 'pboss'); finish(pb, 0.35, 3); apply_mods(pb)
        pb.data.materials.append(alu)
        nm(pb, A + f'__{side}_pivot_boss')
        # chain adjuster: block in the slot, end plate, adjuster bolt + lock nut
        blk = box((2.6, 3.4, 2.4), (AX + 0.8, yc, zc), name=A + f'__{side}_adjuster_block'); finish(blk, 0.2, 2, m=M('alu_satin'))
        ep = box((0.6, 3.6, 3.6), (AX - 3.5, yc, zc), name=A + f'__{side}_adjuster_endcap'); finish(ep, 0.18, 2, m=black)
        bolt = cyl(0.42, 6.0, (AX - 1.8, yc, zc), RX, 16, 'ab')
        hd = cyl(0.62, 0.6, (AX - 4.1, yc, zc), RX, 6, 'ah')
        ln = cyl(0.66, 0.45, (AX - 3.0, yc, zc), RX, 6, 'aln')
        nm(joinn([bolt, hd, ln], 'x'), A + f'__{side}_adjuster_bolt'); finish(bpy.data.objects[A + f'__{side}_adjuster_bolt'], 0.05, 2, m=zinc)
        # alignment marks on the outer face
        marks = [box((0.05, 0.08, 0.7), (AX + 2.5 + k * 0.5, yc + s * 1.52, zc + 1.5), name='mk') for k in range(5)]
        nm(joinn(marks, 'x'), A + f'__{side}_alignment_marks'); bpy.data.objects[A + f'__{side}_alignment_marks'].data.materials.append(black)
        # stand spool
        sp = spin([(0.001, 0.0), (0.9, 0.0), (0.9, 0.3), (0.55, 0.5), (0.55, 1.1), (0.9, 1.3), (0.9, 1.6), (0.001, 1.6)], A + f'__{side}_stand_spool',
                  'Z', (AX + 8.0, yc + s * 1.45, zc + 0.2), 32)
        sp.rotation_euler = (math.radians(90) * s, 0, 0); finish(sp, 0.04, 2, m=M('red_anod'))
    # ---------- pivot tube + cross brace ----------
    pt = cyl(2.6, 2 * YA, (0, 0, 0), RY, 64, A + '__pivot_tube'); finish(pt, 0.1, 2, m=alu)
    secs = []
    for i, yy in enumerate([-YA + 0.4 + (2 * YA - 0.8) * k / 10 for k in range(11)]):
        bow = 1.2 * math.cos(math.pi * yy / (2 * YA))   # arched brace
        x0, z0 = -10.0 - bow * 0.8, -0.9 + bow * 0.6
        secs.append([V((x0 + u, yy, z0 + v)) for u, v in rrect(5.6, 5.0, 1.2, 4)])
    br = loft([[V((p.x, p.y, p.z)) for p in s] for s in secs], A + '__cross_brace')
    # loft built in (x,z) per section but loft expects consistent orientation: sections share point order
    finish(br, 0.2, 2, m=alu)
    # linkage mounts under the brace
    lugs = []
    for s in (-1, 1):
        pl = prism(chaikin_poly([(-12.8, -2.8), (-7.4, -2.8), (-8.6, -8.8), (-11.0, -9.4), (-12.6, -7.6)]), s * 2.0 - 0.45, s * 2.0 + 0.45, 'lug', 'Y')
        lugs.append(pl)
    lj = joinn(lugs, A + '__linkage_mounts')
    cutw(lj, cyl(0.62, 8, (-10.2, 0, -7.6), RY, 24, 'lh'), fast=True)
    finish(lj, 0.15, 2, m=alu)
    lb = cyl(0.6, 6.0, (-10.2, 0, -7.6), RY, 24, 'lbolt'); lbh = cyl(0.9, 0.5, (-10.2, -2.75, -7.6), RY, 6, 'lbh')
    nm(joinn([lb, lbh], 'x'), A + '__linkage_bolt'); finish(bpy.data.objects[A + '__linkage_bolt'], 0.05, 2, m=zinc)
    # pivot shaft, nut and dust caps
    ps = cyl(1.1, 2 * YA + 7.0, (0, 0, 0), RY, 32, A + '__pivot_shaft'); finish(ps, 0.04, 2, m=M('steel'))
    pn = cyl(1.55, 0.9, (0, YA + 2.6 + 0.45, 0), RY, 6, A + '__pivot_nut'); finish(pn, 0.08, 2, m=zinc)
    caps = [cyl(2.9, 0.4, (0, s * (YA + 2.1 + 0.2), 0), RY, 48, 'dc') for s in (-1, 1)]
    nm(joinn(caps, 'x'), A + '__pivot_dust_caps'); finish(bpy.data.objects[A + '__pivot_dust_caps'], 0.12, 2, m=black)
    # chain slider on the left arm, caliper torque stop on the right arm
    xs = [-3.0 + (-17.0) * i / 8 for i in range(9)]
    cs = []
    for x in xs:
        sec, zc, h = arm_section(x, -YA)
        yc = -YA - 0.6 * min(max((x + 2) / (AX - 4.5), 0), 1)
        cs.append([V((x, yc + u, zc + h / 2 + 0.05 + v)) for u, v in rrect(4.2, 1.2, 0.45, 4, 0, 0.25)])
    sl = loft(cs, A + '__chain_slider'); finish(sl, 0.1, 2, m=plast)
    ts = box((2.2, 1.6, 1.6), (-40.0, YA - 2.2, -3.4), name=A + '__caliper_stop'); finish(ts, 0.4, 3, m=alu)
    # rear axle (for reference)
    ax = cyl(1.25, 2 * YA + 9.0, (AX, 0, AZ), RY, 48, A + '__rear_axle'); finish(ax, 0.05, 2, m=M('steel'))
    an = cyl(1.6, 1.0, (AX, YA + 3.2, AZ), RY, 6, A + '__axle_nut'); finish(an, 0.08, 2, m=zinc)

def chaikin_poly(p, it=3):
    from rear_sprocket import chaikin
    return chaikin(p, it)
