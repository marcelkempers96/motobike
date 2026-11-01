import sys, math, bpy
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
OUT = sys.argv[sys.argv.index('--') + 1]
sc = reset()
wrap = mat('wrap', (0.05, 0.36, 0.42), 0.0, 0.25); wrap.node_tree.nodes['Principled BSDF'].inputs['Coat Weight'].default_value = 0.5
can = brushed(mat('can', (0.80, 0.80, 0.82), 1.0, 0.18), 'Z', 0.6)
ins = mat('insring', (0.92, 0.92, 0.9), 0.0, 0.4)
nick = noisy_mat('nickel', (0.78, 0.77, 0.74), 1.0, 0.26, 0.06, 300, 0.02)
holder = noisy_mat('holder', (0.05, 0.05, 0.055), 0.0, 0.48, 0.05, 120, 0.03)
red = mat('red', (0.6, 0.03, 0.02), 0.0, 0.4); blk = mat('blk', (0.02, 0.02, 0.02), 0.0, 0.4); wht = mat('wht', (0.85, 0.85, 0.82), 0.0, 0.45)
copper = mat('cu', (0.85, 0.48, 0.30), 1.0, 0.22)
pcb = mat('pcb', (0.03, 0.22, 0.10), 0.2, 0.35)
R = 1.05; H = 7.0
def cell(x, y, z0=0.3, upright=True, lie=False):
    objs = []
    objs.append(spin([(0, 0), (R - 0.04, 0), (R, 0.04), (R, H - 0.04), (R - 0.04, H), (0.75, H), (0.75, H - 0.02), (0, H - 0.02)], 'wrap', 'Z', (0, 0, 0), 96, wrap))
    objs.append(spin([(0, H - 0.01), (0.72, H - 0.01), (0.72, H + 0.005), (0.5, H + 0.01), (0, H + 0.01)], 'ins', 'Z', (0, 0, 0), 64, ins))
    objs.append(spin([(0, H + 0.0), (0.45, H + 0.0), (0.45, H + 0.08), (0.3, H + 0.1), (0, H + 0.1)], 'cap', 'Z', (0, 0, 0), 64, can))
    objs.append(spin([(0, -0.01), (R - 0.12, -0.01), (R - 0.12, 0.0), (0, 0.0)], 'bottom', 'Z', (0, 0, 0), 64, can))
    o = join(objs, 'cell'); o.location = (x, y, z0)
    if lie: o.rotation_euler = (math.radians(90), 0, math.radians(30))
    return o
# module 5 x 4 cells, holders top and bottom, nickel strips on top
nx, ny = 6, 4; P = 2.25
x0 = -P * (nx - 1) / 2; y0 = -P * (ny - 1) / 2
for i in range(nx):
    for j in range(ny):
        cell(x0 + i * P, y0 + j * P, 0.6)
for zc in (0.25, H - 0.5):
    hb = box((nx * P + 0.5, ny * P + 0.5, 1.1), (0, 0, zc + 0.3), name='holder')
    holes = [cyl(R + 0.03, 3, (x0 + i * P, y0 + j * P, zc + 0.3), (0, 0, 0), 64, 'hh') for i in range(nx) for j in range(ny)]
    cut(hb, join(holes, 'hj')); finish(hb, 0.12, 3, m=holder)
    for i in range(nx):
        for j in range(ny):
            ring = torus(R + 0.03, 0.06, (x0 + i * P, y0 + j * P, zc + 0.85), (0, 0, 0), 'lip', 64, 8); ring.data.materials.append(holder)
# nickel strips: one strip per row pair (parallel groups), with weld dimples
for j in range(ny):
    st = box((nx * P - 0.6, 1.5, 0.03), (0, y0 + j * P, H + 0.66), name='strip'); finish(st, 0.01, 1, m=nick)
    for i in range(nx):
        for dx in (-0.35, 0.35):
            for dy in (-0.25, 0.25):
                d = cyl(0.07, 0.02, (x0 + i * P + dx, y0 + j * P + dy, H + 0.68), (0, 0, 0), 16, 'weld'); d.data.materials.append(nick)
# busbar and terminal
bb = box((0.9, ny * P - 0.4, 0.08), (x0 - 1.0, 0, H + 0.7), name='busbar'); finish(bb, 0.02, 2, m=copper)
term = cyl(0.45, 0.5, (x0 - 1.0, -2.8, H + 0.95), (0, 0, 0), 6, 'terminal'); finish(term, 0.04, 2, m=copper)
# balance leads to a small BMS board
pcbo = box((5.5, 3.2, 0.12), (x0 + P * (nx - 1) + 4.2, 0, H + 0.4), name='bms'); finish(pcbo, 0.02, 1, m=pcb)
for k in range(8):
    chip = box((0.5, 0.5, 0.12), (x0 + P * (nx - 1) + 2.6 + (k % 4) * 1.1, -0.8 + (k // 4) * 1.4, H + 0.52), name='chip'); chip.data.materials.append(blk)
for j in range(ny):
    cu = bpy.data.curves.new('lead', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.06; cu.bevel_resolution = 4
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(1)
    a = (x0 + P * (nx - 1) + 0.6, y0 + j * P, H + 0.72); b = (x0 + P * (nx - 1) + 1.9, -1.2 + j * 0.8, H + 0.5)
    for bp, p in zip(sp.bezier_points, (a, b)): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    sp.bezier_points[0].handle_right = (a[0] + 0.6, a[1], a[2] + 0.8); sp.bezier_points[1].handle_left = (b[0] - 0.6, b[1], b[2] + 0.8)
    ob = bpy.data.objects.new('lead', cu); bpy.context.collection.objects.link(ob); ob.data.materials.append([red, blk, wht, red][j])
# loose cells in front
cell(-3.0, -8.5, 1.05, lie=True)
cell(2.6, -8.8, 0.0)
studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-22, -42, 30), (0.8, -1.8, 3.6), lens=80)
render(sc, OUT)
