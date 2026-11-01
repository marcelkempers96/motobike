import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Piston with rings and gudgeon pin", "category": "powertrain", "kind": "part", "view": (-35, 20)}
A = 'piston'
R = 2.5; ZC = 2.25; ZB = -2.1


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    pist = noisy_mat('piston_alu', (0.80, 0.80, 0.80), 1.0, 0.26, 0.06, 220, 0.03)
    crown_m = noisy_mat('piston_crown', (0.62, 0.61, 0.60), 1.0, 0.38, 0.1, 400, 0.05)
    ring_m = mat('ring', (0.32, 0.32, 0.34), 1.0, 0.28)
    ring_face = mat('ringface', (0.8, 0.8, 0.82), 1.0, 0.12)
    g1, g2, go = (ZC - 0.30, ZC - 0.42), (ZC - 0.62, ZC - 0.74), (ZC - 0.96, ZC - 1.24)
    zs = ZC - 1.40
    d = 0.18
    prof = [(0, ZC + 0.16), (1.1, ZC + 0.14), (1.9, ZC + 0.07), (2.3, ZC), (R - 0.03, ZC - 0.01), (R, ZC - 0.06),
            (R, g1[0]), (R - d, g1[0]), (R - d, g1[1]), (R, g1[1]),
            (R, g2[0]), (R - d, g2[0]), (R - d, g2[1]), (R, g2[1]),
            (R, go[0]), (R - 0.21, go[0]), (R - 0.21, go[1]), (R, go[1]),
            (R, zs), (2.18, zs), (2.18, ZC - 0.62), (1.6, ZC - 0.5), (0, ZC - 0.45)]
    crown = lathe(prof, 'crown', pist, (0, 0, 0), 'Z', 128, sharp=30)
    for sx in (-1, 1):   # valve reliefs on the crown, fore and aft
        vr = cyl(0.95, 0.6, (sx * 1.05, 0, ZC + 0.36), (0, sx * rad(14), 0), 64, '_relief'); bcut(crown, vr)
    hs = []
    for k in range(8):   # oil-return holes in the oil-ring groove
        a = k * math.tau / 8 + PI / 8
        hs.append(cyl(0.08, 1.2, (2.2 * math.cos(a), 2.2 * math.sin(a), (go[0] + go[1]) / 2), (0, PI / 2, a), 16, '_oilhole'))
    bcut(crown, J(hs, '_oilholes'))
    finish(crown, 0.015, 2)
    # top face slightly darker (carbon-free machined crown) via a thin disc is avoided; keep one material
    # skirt with pin bosses
    sk = lathe([(0, zs + 0.001), (R - 0.004, zs + 0.001), (R - 0.004, ZB + 0.25), (R - 0.04, ZB + 0.04), (R - 0.1, ZB), (0, ZB)],
               'skirt', pist, (0, 0, 0), 'Z', 128, sharp=30)
    cav = cyl(2.2, 4.0, (0, 0, zs - 2.0 + 0.0011), (0, 0, 0), 128, '_cavity')
    for sy in (-1, 1):   # keep the pin bosses and their webs when hollowing the skirt
        bcut(cav, cyl(1.0, 1.5, (0, sy * 1.5, 0), RY, 64, '_boss'))
        bcut(cav, box((0.6, 1.4, 1.6), (0, sy * 1.6, 0.8), name='_bweb'))
    bcut(sk, cav)
    for sy in (-1, 1):
        bcut(sk, box((3.0, 1.0, 1.9), (0, sy * (R + 0.5 - 0.12), -0.05), name='_recess'))
        bcut(sk, cyl(1.6, 2.0, (0, sy * (R - 0.2), ZB - 0.75), RY, 64, '_arch'))
        bcut(sk, cyl(0.74, 0.11, (0, sy * (R - 0.42), 0), RY, 48, '_clipgroove'))
    bcut(sk, cyl(0.65, 7, (0, 0, 0), RY, 64, '_pinbore'))
    finish(sk, 0.02, 2)
    crown.name = n('crown'); sk.name = n('skirt')
    # rings with visible end gaps (staggered)
    def ring(z0, z1, ri, name, m, gap_at, gap=0.05):
        return ringseg([(ri, z1 + 0.006), (R - 0.003, z1 + 0.006), (R - 0.003, z0 - 0.006), (ri, z0 - 0.006)], name,
                       gap_at + gap / 2, gap_at + math.tau - gap / 2, 128, m)
    cam = math.atan2(-0.82, -0.57)
    r1 = ring(g1[0], g1[1], R - 0.16, n('ring_top'), ring_m, cam + 0.45)
    face = ringseg([(R - 0.004, g1[1] + 0.03), (R + 0.0005, g1[1] + 0.03), (R + 0.0005, g1[0] - 0.03), (R - 0.004, g1[0] - 0.03)], 'rf',
                   cam + 0.45 + 0.025, cam + 0.45 + math.tau - 0.025, 128, ring_face)
    J([r1, face], n('ring_top'))
    r2 = ringseg([(R - 0.16, g2[1] + 0.006), (R - 0.003, g2[1] + 0.006), (R - 0.003, g2[0] - 0.035), (R - 0.03, g2[0] - 0.006), (R - 0.16, g2[0] - 0.006)],
                 n('ring_second'), cam - 0.6 + 0.025, cam - 0.6 + math.tau - 0.025, 128, ring_m)
    rails = []
    for zz in (go[0] - 0.006 - 0.025, go[1] + 0.006 + 0.025):
        rails.append(ringseg([(R - 0.17, zz - 0.025), (R - 0.003, zz - 0.025), (R - 0.003, zz + 0.025), (R - 0.17, zz + 0.025)], 'rail', cam - 1.4, cam - 1.4 + math.tau - 0.05, 128, ring_face))
    exp_m = mat('expander', (0.55, 0.36, 0.22), 1.0, 0.35)
    ex = ringseg([(R - 0.2, go[1] + 0.06), (R - 0.03, go[1] + 0.06), (R - 0.03, go[0] - 0.06), (R - 0.2, go[0] - 0.06)], 'exp', cam - 1.1, cam - 1.1 + math.tau - 0.04, 192, exp_m)
    cs = []
    for k in range(48):   # crimped spacer-expander segments
        a = k * math.tau / 48
        cs.append(box((0.06, 0.3, 0.18), ((R - 0.05) * math.cos(a), (R - 0.05) * math.sin(a), (go[0] + go[1]) / 2), (0, 0, a), '_crimp'))
    bcut(ex, J(cs, '_crimps'))
    J(rails + [ex], n('ring_oil'))
    # gudgeon pin and circlips lying beside the piston
    gp = lathe([(0.42, 0), (0.645, 0), (0.649, 0.04), (0.649, 4.24), (0.645, 4.28), (0.42, 4.28), (0.42, 0)], n('gudgeon_pin'),
               M.chrome, (0, 0, 0), 'Z', 64)
    gp.rotation_euler = (0, PI / 2, rad(28)); gp.location = (-4.9, -0.6, ZB + 0.649)
    bpy.context.view_layer.update()
    gp.location = V((-4.9, -0.6, ZB + 0.649)) - gp.matrix_world.to_3x3() @ V((0, 0, 2.14)) + V((0, 0, 0))
    gp.location.z = ZB + 0.649
    clips = []
    for (x, y, a) in ((-3.2, -3.9, 0.3), (-1.7, -4.4, 1.2)):
        t = ringseg([(0.62, -0.045), (0.71, -0.045), (0.71, 0.045), (0.62, 0.045)], 'clip', a + 0.35, a + math.tau - 0.35, 64, ring_m)
        t.location = (x, y, ZB + 0.045); clips.append(t)
        for s in (-1, 1):
            e = box((0.09, 0.16, 0.09), (x + 0.6 * math.cos(a + s * 0.35), y + 0.6 * math.sin(a + s * 0.35), ZB + 0.045), (0, 0, a + s * 0.35), 'eye')
            e.data.materials.append(ring_m); clips.append(e)
    J(clips, n('circlips'))
    finalize(A)
