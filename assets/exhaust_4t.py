import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Four-stroke exhaust: header, heat shield, muffler", "category": "powertrain", "kind": "part", "view": (-150, 20)}
A = 'exhaust_4t'
CTRL = [(18, 0, 13), (18.6, 0.3, 9.0), (17.0, 1.6, 4.0), (12.0, 4.0, 2.0), (4.0, 6.6, 2.6), (-4.0, 8.2, 4.4), (-7.5, 8.6, 5.1)]


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    chrome_h = mat('header_chrome', (0.9, 0.9, 0.92), 1.0, 0.07)
    tint_ramp(chrome_h, [(0.0, (0.92, 0.92, 0.94)), (0.45, (0.90, 0.88, 0.82)), (0.65, (0.86, 0.66, 0.38)), (0.82, (0.42, 0.34, 0.62)),
                         (1.0, (0.36, 0.48, 0.78))], 'X', 4.0, 19.0, 'World')
    endcap_m = mat('endcap', (0.08, 0.08, 0.09), 1.0, 0.3)
    shield_m = noisy_mat('shield_black', (0.03, 0.03, 0.033), 0.2, 0.45, 0.06, 200, 0.04)
    pts = cr_path(CTRL, 10)
    hdr = tube([tuple(p) for p in pts], 1.4, 'header', chrome_h, 6, poly=True)
    hdr = bake(hdr); reshade(hdr, 70); hdr.name = n('header')
    # flange at the port: collar + two-bolt plate + studs and nuts
    d0 = (pts[1] - pts[0]).normalized()
    col = lathe([(1.35, -0.2), (1.85, -0.2), (1.85, 0.8), (1.5, 1.1), (1.35, 1.1)], 'collar', M.chrome, (0, 0, 0), 'Z', 48)
    pl = slab(hull(circ(-2.6, 0, 0.75, 16) + circ(2.6, 0, 0.75, 16) + circ(0, 0, 2.0, 32)), 0.5, 'plate', M.chrome, 'XY', -0.45)
    finish(pl, 0.1, 2); pl = bake(pl)
    bcut(pl, J([cyl(0.4, 2, (sx * 2.6, 0, -0.45), (0, 0, 0), 16, '_h') for sx in (-1, 1)], '_hs')); pl = bake(pl)
    nuts = []
    for sx in (-1, 1):
        nuts += hexbolt((sx * 2.6, 0, -0.2), (0, 0, 1), 0.55, M.chrome, 'fnut')
        st = cyl(0.3, 1.6, (sx * 2.6, 0, -0.4), (0, 0, 0), 16, 'stud'); st.data.materials.append(M.steel); nuts.append(st)
    fl = J([col, pl] + nuts, n('port_flange'))
    place([fl], pts[0] - d0 * 0.6, d0 * -1, roll=PI / 2)
    # heat shield: perforated half-shell over the header's last straight run
    i0, i1 = int(len(pts) * 0.52), int(len(pts) * 0.9)
    arc = bpy.data.curves.new('_arc', 'CURVE'); arc.dimensions = '2D'
    sp = arc.splines.new('POLY'); K = 24; sp.points.add(K)
    for k in range(K + 1):
        a = rad(-20) + rad(220) * k / K
        sp.points[k].co = (2.05 * math.cos(a), 2.05 * math.sin(a), 0, 1)
    arco = bpy.data.objects.new('_arc', arc); bpy.context.collection.objects.link(arco); arco.hide_render = True
    sc = bpy.data.curves.new('shield', 'CURVE'); sc.dimensions = '3D'; sc.bevel_mode = 'OBJECT'; sc.bevel_object = arco
    sc.twist_mode = 'Z_UP'; sc.use_fill_caps = False
    s2 = sc.splines.new('POLY'); s2.points.add(i1 - i0)
    for k, p in enumerate(pts[i0:i1 + 1]): s2.points[k].co = (*p, 1)
    sh = bpy.data.objects.new('shield', sc); bpy.context.collection.objects.link(sh); sh.data.materials.append(shield_m)
    sh = bake(sh)
    so = sh.modifiers.new('solid', 'SOLIDIFY'); so.thickness = 0.1; sh = bake(sh); reshade(sh, 50)
    sh.name = n('heat_shield')
    cl = []
    for t in (0.2, 0.8):
        k = i0 + int((i1 - i0) * t); dd = (pts[k + 1] - pts[k - 1]).normalized()
        c = lathe([(2.1, -0.4), (2.25, -0.4), (2.25, 0.4), (2.1, 0.4)], 'clamp', M.zinc, (0, 0, 0), 'Z', 48)
        place([c], pts[k], dd); cl.append(c)
    J(cl, n('shield_clamps'))
    # muffler: cone, body, slash-cut tail with dark end cap and tailpipe
    m0 = pts[-1]; dm = V((-1, 0.04, 0.17)).normalized()
    body = lathe([(0, -0.6), (1.45, -0.6), (1.6, 1.0), (3.6, 4.5), (4.9, 7.5), (5.0, 9.0), (5.0, 33.0), (4.85, 35.0), (4.85, 40.0), (0, 40.0)],
                 'muffler', M.chrome, (0, 0, 0), 'Z', 96, sharp=60)
    slash = box((30, 30, 30), (0, 0, 33.5 + 15), (rad(-38), 0, 0), '_slash')
    body = section(body, slash, endcap_m, 60); body.name = n('muffler')
    tp = lathe([(1.15, 28.0), (1.4, 28.0), (1.4, 34.6), (1.15, 34.6)], 'tailpipe', M.chrome, (0, 0, 0), 'Z', 48)
    tp = bake(tp); bcut(tp, box((30, 30, 30), (0, 0, 34.9 + 15), (rad(-38), 0, 0), '_slash2')); tp = bake(tp); tp.name = n('tailpipe')
    seam = torus(5.0, 0.12, (0, 0, 9.0), (0, 0, 0), 'seam', 96, 8); seam.data.materials.append(M.chrome)
    seam.name = n('weld_seam')
    br = slab(hull(circ(0, 0, 1.2, 16) + circ(-4, 0, 1.6, 16)), 0.4, 'bracket', M.black, 'XZ'); br.location = (0, 5.4, 22.0)
    br.rotation_euler = (0, 0, 0); finish(br, 0.08, 2)
    br = bake(br); bcut(br, cyl(0.45, 2, (0, 5.4, 22.0), RY, 16, '_bh')); br = bake(br)
    br2 = slab(rrect(6.0, 0.4, 0.15, 2), 1.4, 'bfoot', M.black, 'XZ'); br2.location = (-2, 4.95, 22.0); finish(br2, 0.05, 2)
    br = J([br, br2], n('mount_bracket'))
    place([body, tp, seam, br], m0 - dm * 0.0, dm, roll=-PI / 2)
    finalize(A)
