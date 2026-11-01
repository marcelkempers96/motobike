import sys, os, math, bpy, bmesh
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
META = {"title": "Pleated panel air filter in airbox", "category": "powertrain", "kind": "part", "view": (-32, 38)}
A = 'air_filter'
LX, LY, H = 24.0, 15.0, 7.0


def pleats(name, x0, x1, y0, y1, zlo, zhi, n_pleats, m):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    N = n_pleats * 2
    cols = []
    for i in range(N + 1):
        x = x0 + (x1 - x0) * i / N
        z = zhi if i % 2 else zlo
        cols.append([bm.verts.new((x, y, z)) for y in (y0, y1)])
    for i in range(N):
        bm.faces.new((cols[i][0], cols[i + 1][0], cols[i + 1][1], cols[i][1]))
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    sd = o.modifiers.new('solid', 'SOLIDIFY'); sd.thickness = 0.05; sd.offset = 0
    o.data.materials.append(m)
    return o


def build():
    M = mats()
    def n(s): return f'{A}__{s}'
    box_m = noisy_mat('airbox_pp', (0.035, 0.035, 0.038), 0.0, 0.55, 0.06, 500, 0.06)
    paper = noisy_mat('filter_paper', (0.86, 0.79, 0.60), 0.0, 0.8, 0.08, 900, 0.3)
    frame_m = noisy_mat('urethane', (0.72, 0.30, 0.07), 0.0, 0.55, 0.05, 300, 0.04)
    # ---- airbox lower half
    shell = slab(rrect(LX, LY, 2.6, 6), H, 'airbox', box_m, 'XY', H / 2); finish(shell, 0.5, 3); shell = bake(shell)
    lip = slab(rrect(LX + 1.6, LY + 1.6, 3.2, 6), 0.45, 'lip', box_m, 'XY', H - 0.22); finish(lip, 0.12, 2); lip = bake(lip)
    sn = slab(rrect(6.4, 3.2, 1.0, 4), 5.0, 'snorkel', box_m, 'YZ', -LX / 2 - 2.0); sn.location.z = 3.6; finish(sn, 0.25, 2); sn = bake(sn)
    sp = lathe([(0, 0), (2.4, 0), (2.4, 2.4), (2.6, 2.5), (2.6, 2.9), (0, 2.9)], 'spigot', box_m, (LX / 2 - 0.6, 0, 3.6), 'X', 64)
    tabs = []
    for sx in (-1, 1):
        t = slab(rrect(3.0, 2.4, 0.8, 4), 0.5, 'tab', box_m, 'XZ', sy := 0); t.location = (sx * 6, -LY / 2 - 0.9, 5.0)
        tabs.append(t)
    for t in tabs: finish(t, 0.08, 2)
    bosses = [cyl(0.6, 1.6, (sx * (LX / 2 + 0.3), sy * (LY / 2 + 0.3), H - 0.8), (0, 0, 0), 24, 'boss') for sx in (-1, 1) for sy in (-1, 1)]
    for b in bosses: finish(b, 0.08, 2)
    bmulti(shell, [lip, sn, bake(sp)] + [bake(t) for t in tabs] + [bake(b) for b in bosses], 'UNION'); shell = bake(shell)
    cuts = [slab(rrect(LX - 0.6, LY - 0.6, 2.3, 6), H + 1, '_cavity', None, 'XY', H / 2 + 0.3 + 0.0),
            slab(rrect(5.6, 2.4, 0.7, 4), 6.0, '_snin', None, 'YZ', -LX / 2 - 2.0),
            cyl(2.1, 6, (LX / 2, 0, 3.6), RX, 64, '_spin'),
            slab(rrect(LX + 0.4, LY + 0.4, 2.8, 6), 0.6, '_seat', None, 'XY', H - 0.1)]
    cuts[1].location.z = 3.6
    cuts[0].location.z = 0.6
    for sx in (-1, 1):
        cuts.append(cyl(0.45, 1.2, (sx * 6, -LY / 2 - 0.9, 5.0), RY, 24, '_tabhole'))
        for sy in (-1, 1):
            cuts.append(cyl(0.22, 2.0, (sx * (LX / 2 + 0.3), sy * (LY / 2 + 0.3), H), (0, 0, 0), 16, '_bosshole'))
    bmulti(shell, cuts)
    shell = bake(shell); reshade(shell, 40); shell.name = n('airbox')
    gr = [lathe([(0.25, -0.4), (0.62, -0.4), (0.62, -0.25), (0.45, -0.2), (0.45, 0.2), (0.62, 0.25), (0.62, 0.4), (0.25, 0.4)], 'grommet', M.rubber,
                (sx * 6, -LY / 2 - 0.9, 5.0), 'Y', 32) for sx in (-1, 1)]
    J(gr, n('grommets'))
    # rubber boot and clamp on the outlet spigot
    bp = [(2.45, 0), (2.75, 0)]
    for k in range(4):
        bp += [(2.75, 0.4 + k * 0.7), (2.95, 0.65 + k * 0.7), (2.75, 0.9 + k * 0.7)]
    bp += [(2.6, 3.6), (2.6, 4.2), (2.3, 4.2), (2.3, 3.4), (2.45, 3.0)]
    bt = lathe(bp, n('outlet_boot'), M.rubber, (LX / 2 + 2.0, 0, 3.6), 'X', 64)
    cl = lathe([(2.74, 0), (2.9, 0), (2.9, 0.55), (2.74, 0.55)], 'clamp', M.zinc, (LX / 2 + 2.15, 0, 3.6), 'X', 64)
    cs = cyl(0.25, 0.9, (LX / 2 + 2.42, -0.4, 3.6 + 2.95), (0, 0, 0), 6, 'clampscrew'); finish(cs, 0.03, 2, m=M.zinc)
    J([cl, cs], n('boot_clamp'))
    dt = lathe([(0, 0), (0.35, 0), (0.35, 1.2), (0.45, 1.3), (0.45, 1.6), (0, 1.6)], n('drain_tube'), M.rubber, (-6, 3, 0.2), '-Z' if False else (0, 0, -1), 24)
    # ---- filter panel: urethane frame + pleated paper
    fw, fh = LX - 1.0, LY - 1.0
    fr = slab(rrect(fw, fh, 2.2, 6), 1.2, 'frame', frame_m, 'XY', H + 0.1); finish(fr, 0.15, 2); fr = bake(fr)
    bcut(fr, slab(rrect(fw - 2.0, fh - 2.0, 1.2, 6), 3, '_fin', None, 'XY', H + 0.1))
    fr = bake(fr); reshade(fr, 40); fr.name = n('frame')
    pl = pleats(n('pleats'), -fw / 2 + 1.05, fw / 2 - 1.05, -fh / 2 + 1.05, fh / 2 - 1.05, H - 1.6, H + 1.3, 30, paper)
    # glued end strips closing the pleat pack
    es = [box((fw - 2.0, 0.3, 2.9), (0, sy * (fh / 2 - 1.2), H - 0.15), name='strip') for sy in (-1, 1)]
    for e in es: finish(e, 0.05, 2, m=frame_m)
    J(es, n('end_strips'))
    finalize(A)
