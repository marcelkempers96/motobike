import sys, math, bpy
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
OUT = sys.argv[sys.argv.index('--') + 1]
sc = reset()
cer = mat('ceramic', (0.93, 0.90, 0.84), 0.0, 0.18); cer.node_tree.nodes['Principled BSDF'].inputs['Coat Weight'].default_value = 0.6
zinc = noisy_mat('zinc', (0.82, 0.82, 0.80), 1.0, 0.22, 0.05, 200, 0.02)
nickel = mat('nickel', (0.80, 0.80, 0.82), 1.0, 0.12)
dark = noisy_mat('ground', (0.35, 0.33, 0.30), 1.0, 0.4, 0.1, 80, 0.05)
def plug(x, y, rz, tilt):
    objs = []
    th = spin([(0, 0), (0.58, 0), (0.58, 1.9), (0, 1.9)], 'thread', 'Z', (0, 0, 0), 96, zinc); objs.append(th)
    for i in range(14):
        t = torus(0.6, 0.055, (0, 0, 0.2 + i * 0.125), (0, 0, 0), 'thr', 64, 8); t.data.materials.append(zinc); objs.append(t)
    gas = spin([(0.6, 1.92), (0.9, 1.92), (0.9, 2.12), (0.6, 2.12), (0.6, 1.92)], 'gasket', 'Z', (0, 0, 0), 96, nickel); objs.append(gas)
    hx = cyl(1.0, 0.95, (0, 0, 2.62), (0, 0, 0), 6, 'hex'); finish(hx, 0.06, 3, m=zinc); objs.append(hx)
    cr = spin([(0.8, 3.08), (0.95, 3.12), (0.95, 3.35), (0.62, 3.6), (0, 3.6)], 'crimp', 'Z', (0, 0, 0), 96, zinc); objs.append(cr)
    ins = [(0, 3.5), (0.55, 3.5)]
    z = 3.6
    for k in range(5):
        ins += [(0.56, z + 0.06), (0.56, z + 0.16), (0.46, z + 0.24), (0.46, z + 0.3)]; z += 0.36
    ins += [(0.5, z + 0.5), (0.42, z + 0.9), (0.30, z + 1.0), (0, z + 1.0)]
    ins_o = spin(ins, 'insulator', 'Z', (0, 0, 0), 96, cer); objs.append(ins_o)
    tn = spin([(0, z + 0.95), (0.3, z + 0.95), (0.3, z + 1.25), (0.38, z + 1.3), (0.38, z + 1.6), (0.25, z + 1.75), (0, z + 1.78)], 'terminal', 'Z', (0, 0, 0), 64, nickel); objs.append(tn)
    tip = spin([(0, -0.2), (0.22, -0.2), (0.25, 0.1), (0.25, 0.4), (0, 0.4)], 'tip', 'Z', (0, 0, 0), 48, cer); objs.append(tip)
    ce = cyl(0.08, 0.3, (0, 0, -0.32), (0, 0, 0), 24, 'centre'); ce.data.materials.append(nickel); objs.append(ce)
    ge = box((0.18, 0.35, 0.95), (0.42, 0, -0.35), name='groundA'); finish(ge, 0.05, 3, m=dark); objs.append(ge)
    gb = box((0.62, 0.35, 0.16), (0.16, 0, -0.75), name='groundB'); finish(gb, 0.05, 3, m=dark); objs.append(gb)
    o = join(objs, 'plug'); o.location = (x, y, 0); o.rotation_euler = (0, tilt, rz)
    return o
p1 = plug(0, 0, 0.3, 0); p1.location.z = 1.0
p2 = plug(4.2, 3.0, 0.9, math.radians(90)); p2.location.z = 1.0
studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-14, -26, 9), (1.8, 1.2, 3.6), lens=85)
render(sc, OUT)
