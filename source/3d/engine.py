"""Horizontal single-cylinder commuter engine (Cub / Mahindra type) with a wet multiplate clutch.
MODE: exterior | xray | exploded   (python3 engine.py -- out.png MODE)"""
import sys, math, bpy, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
args = sys.argv[sys.argv.index('--') + 1:]
OUT = args[0]; MODE = args[1] if len(args) > 1 else 'exterior'
sc = reset()

def Y(v): return -v          # the clutch side faces the camera on -Y
V = mathutils.Vector

black = mat('blackpaint', (0.018, 0.018, 0.02), 0.0, 0.34, coat=0.35)
black_n = noisy_mat('blackcast', (0.02, 0.02, 0.022), 0.0, 0.42, 0.08, 90, 0.10)
chrome = mat('chrome', (0.93, 0.93, 0.94), 1.0, 0.05)
alu = noisy_mat('alu', (0.80, 0.80, 0.80), 1.0, 0.30, 0.06, 150, 0.04)
alu_m = brushed(mat('alum', (0.86, 0.86, 0.87), 1.0, 0.16), 'Y', 0.6)
steel = brushed(mat('steel', (0.62, 0.62, 0.64), 1.0, 0.2), 'Y', 0.7)
rubber = mat('rubber', (0.02, 0.02, 0.02), 0.0, 0.6)
friction = noisy_mat('friction', (0.32, 0.18, 0.08), 0.0, 0.75, 0.1, 400, 0.15)
spring_m = mat('spring', (0.55, 0.56, 0.58), 1.0, 0.25)
bronze = mat('bronze', (0.72, 0.5, 0.3), 1.0, 0.28)
glass = bpy.data.materials.new('ghost'); glass.use_nodes = True
gb = glass.node_tree.nodes['Principled BSDF']
gb.inputs['Base Color'].default_value = (0.75, 0.82, 0.95, 1); gb.inputs['Transmission Weight'].default_value = 1.0
gb.inputs['Roughness'].default_value = 0.08; gb.inputs['IOR'].default_value = 1.12
gb.inputs['Alpha'].default_value = 0.35

RY = (math.radians(90), 0, 0)   # cylinder axis along Y
RXa = (0, math.radians(90), 0)  # along X
CL = V((-6.2, 0, 0.4))          # clutch / mainshaft centre (x, -, z)

# ---------------- crankcase ----------------
case = box((19, 12, 14), (-4.8, 0, -0.2), name='crankcase'); finish(case, 2.6, 6, m=black_n)
sump = box((14, 10, 4), (-4, 0, -6.4), name='sump'); finish(sump, 1.8, 5, m=black_n)
rear = cyl(5.2, 11.5, (-12.5, 0, -1.2), RY, 96, 'rearlobe'); finish(rear, 0.8, 4, m=black_n)
ribs = []
for k in range(5):
    pass
# left (far side) generator cover
gen = spin([(0, 0), (6.2, 0), (6.2, 1.6), (5.4, 2.6), (0, 2.8)], 'gencover', 'Y', (0.4, 6.0, 0.3), 96, black)
gen.rotation_euler = (math.radians(-90), 0, 0)

# ---------------- clutch cover (right side, faces camera) ----------------
cov_prof = [(0, 0), (8.6, 0), (8.6, 1.4), (8.3, 2.6), (7.5, 3.5), (6.0, 4.0), (4.5, 4.15), (0, 4.15)]
cover = spin(cov_prof, 'clutchcover', 'Z', (0, 0, 0), 160, glass if MODE == 'xray' else black)
cover.scale = (1.12, 0.96, 1.0)
cover.rotation_euler = (math.radians(90), 0, 0)
cover.location = (CL.x - 1.2, Y(6.0), CL.z)
if MODE == 'exploded': cover.hide_render = True
if MODE == 'exterior':
    badge = spin([(0, 0), (3.9, 0), (3.9, 0.25), (3.7, 0.4), (0, 0.4)], 'badge', 'Z', (0, 0, 0), 128, black)
    badge.rotation_euler = (math.radians(90), 0, 0); badge.location = (CL.x - 0.6, cover.location.y + Y(4.1), CL.z)
    rim = torus(4.05, 0.12, (CL.x - 0.6, cover.location.y + Y(4.2), CL.z), RY, 'badgerim', 128, 12); rim.data.materials.append(black)
    oilcap = cyl(1.1, 1.2, (CL.x + 7.8, Y(6.4), CL.z + 4.2), RY, 48, 'oilfiller'); finish(oilcap, 0.25, 3, m=black)
# perimeter cap screws
for k in range(11):
    a = k * math.tau / 11 + 0.2
    p = (CL.x - 1.2 + 9.4 * math.cos(a), cover.location.y + Y(0.9), CL.z + 8.4 * math.sin(a))
    if MODE == 'exploded': continue
    if MODE == 'xray':
        p = (p[0], Y(6.9), p[2])
    s = cyl(0.42, 0.5, p, RY, 6, 'capscrew'); finish(s, 0.06, 2, m=chrome)
    w = cyl(0.55, 0.12, (p[0], p[1] + Y(-0.3), p[2]), RY, 32, 'washer'); w.data.materials.append(chrome)

# ---------------- cylinder, head ----------------
barrel = cyl(3.3, 10.5, (8.6, 0, 1.8), RXa, 96, 'barrel'); barrel.data.materials.append(black_n)
for k in range(12):
    x = 4.4 + k * 0.82
    h = 5.6 + 0.25 * math.sin(k * 0.6)
    f = box((0.38, 10.6, 10.0), (x, 0, 1.8), name='fin'); finish(f, 0.16, 3, m=black_n)
head = box((5.6, 11.2, 10.6), (17.2, 0, 1.8), name='head'); finish(head, 1.2, 5, m=black_n)
for k in range(3):
    f = box((0.38, 11.8, 11.2), (14.8 + k * 0.9, 0, 1.8), name='headfin'); finish(f, 0.16, 3, m=black_n)
hc = box((1.6, 9.6, 9.0), (20.6, 0, 1.8), name='headcover'); finish(hc, 0.7, 4, m=black)
for dz in (-3.0, 3.6):
    vc = cyl(1.25, 0.9, (21.6, Y(1.2), 1.8 + dz), RXa, 48, 'tappetcap'); finish(vc, 0.2, 3, m=alu)
    nut = cyl(0.7, 0.5, (22.2, Y(1.2), 1.8 + dz), RXa, 6, 'tappetnut'); finish(nut, 0.06, 2, m=alu)
for dy in (-3.6, 3.6):
    for dz in (-3.4, 3.8):
        an = spin([(0, 0), (0.55, 0), (0.55, 0.45), (0.3, 0.8), (0, 0.85)], 'acorn', 'X', (21.4, dy, 1.8 + dz), 32, chrome)
plug = cyl(0.9, 0.7, (17.5, Y(5.9), -0.6), RY, 6, 'plughex'); finish(plug, 0.06, 2, m=steel)
cap = cyl(0.75, 2.6, (17.5, Y(7.5), -0.6), RY, 32, 'plugcap'); finish(cap, 0.25, 3, m=rubber)
# exhaust stub downward
ex = spin([(0, 0), (1.5, 0), (1.5, 1.0), (1.3, 1.0), (1.3, 3.8), (0, 3.8)], 'exhaust', 'Z', (17.4, 0, -6.6), 64, chrome)
fl = box((1.0, 4.6, 2.6), (17.4, 0, -3.6), name='exflange'); finish(fl, 0.3, 3, m=alu)

# ---------------- intake and carburettor ----------------
cu = bpy.data.curves.new('intake', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 1.25; cu.bevel_resolution = 8
sp = cu.splines.new('BEZIER'); sp.bezier_points.add(2)
pts = [(16.6, 0.2, 7.0), (15.6, 0.2, 12.4), (11.2, 0.2, 13.4)]
for bp, p in zip(sp.bezier_points, pts): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
io = bpy.data.objects.new('intake', cu); bpy.context.collection.objects.link(io); io.data.materials.append(alu_m)
carb = cyl(1.9, 4.2, (9.0, 0.2, 13.6), RXa, 64, 'carbbody'); finish(carb, 0.3, 3, m=alu)
bowl = cyl(1.8, 2.2, (9.2, 0.2, 11.6), (0, 0, 0), 48, 'floatbowl'); finish(bowl, 0.35, 3, m=alu)
top = cyl(1.0, 2.4, (9.4, 0.2, 15.7), (0, 0, 0), 48, 'slidetop'); finish(top, 0.2, 3, m=alu)
lev = box((3.2, 0.25, 1.0), (10.2, Y(2.2), 13.9), (0, math.radians(-25), 0), 'throttlelever'); finish(lev, 0.08, 2, m=chrome)
chk = box((2.6, 0.25, 0.8), (8.4, Y(2.3), 14.6), (0, math.radians(20), 0), 'chokelever'); finish(chk, 0.08, 2, m=chrome)
cu2 = bpy.data.curves.new('airhose', 'CURVE'); cu2.dimensions = '3D'; cu2.bevel_depth = 0.9; cu2.bevel_resolution = 6
sp2 = cu2.splines.new('BEZIER'); sp2.bezier_points.add(2)
for bp, p in zip(sp2.bezier_points, [(6.8, 0.2, 13.6), (4.6, 0.2, 16.0), (5.6, 0.2, 19.5)]): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
ho = bpy.data.objects.new('airhose', cu2); bpy.context.collection.objects.link(ho); ho.data.materials.append(rubber)

# ---------------- starter motor ----------------
st = cyl(2.3, 6.6, (2.2, Y(1.8), 9.0), RY, 64, 'starter'); finish(st, 0.3, 3, m=alu_m)
stc = spin([(0, 0), (2.3, 0), (2.1, 0.8), (0, 1.0)], 'startercap', 'Y', (2.2, Y(5.1), 9.0), 64, alu)
stc.rotation_euler = (math.radians(90), 0, 0)
stn = cyl(0.55, 0.6, (2.2, Y(6.3), 9.0), RY, 6, 'starternut'); finish(stn, 0.05, 2, m=steel)
mnt = box((3.6, 3.0, 2.6), (2.0, Y(0.6), 7.0), name='startermount'); finish(mnt, 0.6, 3, m=black_n)

# ---------------- external oil pipe ----------------
cu3 = bpy.data.curves.new('oilpipe', 'CURVE'); cu3.dimensions = '3D'; cu3.bevel_depth = 0.3; cu3.bevel_resolution = 6
sp3 = cu3.splines.new('POLY'); P = [(5.0, Y(6.8), 6.4), (6.0, Y(7.0), 6.0), (11.5, Y(6.9), -3.4), (16.0, Y(6.6), -3.6)]
sp3.points.add(len(P) - 1)
for i, p in enumerate(P): sp3.points[i].co = (*p, 1)
sp3.use_smooth = True


# ---------------- kickstart and shift ----------------
cu4 = bpy.data.curves.new('kick', 'CURVE'); cu4.dimensions = '3D'; cu4.bevel_depth = 0.5; cu4.bevel_resolution = 6
sp4 = cu4.splines.new('POLY'); K = [(-12.2, Y(7.8), -3.0), (-13.0, Y(8.6), -2.4), (-19.0, Y(9.0), 3.0), (-26.0, Y(9.0), 9.2), (-26.4, Y(9.0), 9.6)]
sp4.points.add(len(K) - 1)
for i, p in enumerate(K): sp4.points[i].co = (*p, 1)
ko = bpy.data.objects.new('kick', cu4); bpy.context.collection.objects.link(ko); ko.data.materials.append(chrome)
boss = cyl(1.0, 2.2, (-12.2, Y(7.6), -3.0), RY, 32, 'kickboss'); finish(boss, 0.2, 3, m=chrome)
bolt = cyl(0.5, 0.6, (-12.2, Y(8.9), -3.0), RY, 6, 'kickbolt'); finish(bolt, 0.05, 2, m=chrome)
ped = cyl(0.85, 4.2, (-26.4, Y(7.4), 9.6), RY, 48, 'pedal'); finish(ped, 0.3, 3, m=rubber)
for k in range(6):
    t = torus(0.86, 0.09, (-26.4, Y(5.8 + k * 0.6), 9.6), RY, 'grip', 48, 8); t.data.materials.append(rubber)
pc = spin([(0, 0), (0.86, 0), (0.86, 0.3), (0, 0.45)], 'pedalcap', 'Y', (-26.4, Y(9.5), 9.6), 48, chrome); pc.rotation_euler = (math.radians(90), 0, 0)
# small cable bracket on rear
br = box((0.25, 3.0, 4.0), (-16.5, Y(4.0), 5.6), (0, math.radians(-35), 0), 'bracket'); finish(br, 0.08, 2, m=chrome)
drain = cyl(0.55, 1.0, (-4.0, 0, -8.8), (0, 0, 0), 6, 'drainplug'); finish(drain, 0.05, 2, m=chrome)

# ---------------- primary drive and clutch (inside the cover) ----------------
def clutch(off=0.0, ex=False):
    """Build the clutch along the mainshaft. ex=True spaces the parts apart along the axis."""
    g = (lambda i: (i * 2.4 if ex else 0.0))
    yb = 6.3 + off
    parts = []
    # primary drive gear on crankshaft
    pg = cyl(1.55, 0.9, (0.0, Y(6.6 + off * 0), 0.0), RY, 64, 'primarygear'); finish(pg, 0.05, 2, m=steel); parts.append(pg)
    for i in range(17):
        a = i * math.tau / 17
        t = box((0.32, 0.9, 0.42), (0.0 + 1.7 * math.cos(a), Y(6.6), 0.0 + 1.7 * math.sin(a)), (0, -a, 0), 'pgt'); finish(t, 0.05, 2, m=steel)
    # basket with integral driven gear
    bk = cyl(4.15, 2.6, (CL.x, Y(yb + 1.5 + g(0)), CL.z), RY, 128, 'basket'); cut(bk, cyl(3.75, 2.4, (CL.x, Y(yb + 1.8 + g(0)), CL.z), RY, 128, 'bi'))
    for i in range(6):
        a = i * math.tau / 6
        cut(bk, box((1.2, 2.0, 1.2), (CL.x + 4.0 * math.cos(a), Y(yb + 2.0 + g(0)), CL.z + 4.0 * math.sin(a)), (0, -a, 0), 'slot'))
    finish(bk, 0.05, 2, m=alu)
    rg = cyl(4.35, 0.7, (CL.x, Y(yb + g(0)), CL.z), RY, 128, 'drivengear'); finish(rg, 0.04, 2, m=steel)
    for i in range(46):
        a = i * math.tau / 46
        t = box((0.3, 0.7, 0.42), (CL.x + 4.5 * math.cos(a), Y(yb + g(0)), CL.z + 4.5 * math.sin(a)), (0, -a, 0), 'rgt'); finish(t, 0.05, 2, m=steel)
    for i in range(6):  # damper springs on the gear
        a = i * math.tau / 6 + 0.5
        d = cyl(0.42, 0.75, (CL.x + 3.0 * math.cos(a), Y(yb - 0.05 + g(0)), CL.z + 3.0 * math.sin(a)), RY, 24, 'damper'); d.data.materials.append(spring_m)
    # plates: friction (tabs to basket) and steel (teeth to hub)
    for k in range(9):
        fr = (k % 2 == 0)
        yy = yb + 1.0 + k * 0.32 + g(1 + k * 0.45)
        if fr:
            p = cyl(3.6, 0.26, (CL.x, Y(yy), CL.z), RY, 128, 'friction'); cut(p, cyl(2.55, 1, (CL.x, Y(yy), CL.z), RY, 96, 'fi'))
            finish(p, 0.03, 2, m=friction)
            for i in range(6):
                a = i * math.tau / 6
                t = box((0.95, 0.26, 0.6), (CL.x + 3.85 * math.cos(a), Y(yy), CL.z + 3.85 * math.sin(a)), (0, -a, 0), 'tab'); t.data.materials.append(steel)
        else:
            p = cyl(3.45, 0.16, (CL.x, Y(yy), CL.z), RY, 128, 'steelplate'); cut(p, cyl(2.35, 1, (CL.x, Y(yy), CL.z), RY, 96, 'si'))
            finish(p, 0.02, 2, m=steel)
    # hub
    hb = cyl(2.45, 3.0, (CL.x, Y(yb + 2.0 + g(5)), CL.z), RY, 96, 'hub'); cut(hb, cyl(0.9, 4, (CL.x, Y(yb + 2.0 + g(5)), CL.z), RY, 48, 'hi'))
    finish(hb, 0.06, 2, m=alu)
    for i in range(24):
        a = i * math.tau / 24
        t = box((0.22, 3.0, 0.2), (CL.x + 2.45 * math.cos(a), Y(yb + 2.0 + g(5)), CL.z + 2.45 * math.sin(a)), (0, -a, 0), 'spline'); t.data.materials.append(alu)
    # pressure plate, springs, bolts, lifter
    pp = cyl(3.5, 0.45, (CL.x, Y(yb + 4.25 + g(7)), CL.z), RY, 128, 'pressureplate'); finish(pp, 0.1, 3, m=alu)
    for i in range(4):
        a = i * math.tau / 4 + math.pi / 4
        x, z = CL.x + 1.7 * math.cos(a), CL.z + 1.7 * math.sin(a)
        s = helix(0.45, 0.32, 6.5, 0.07, (0, 0, 0), spring_m, 'clutchspring')
        s.rotation_euler = (math.radians(90), 0, 0); s.location = (x, Y(yb + 4.45 + g(8)), z)
        b = cyl(0.42, 0.3, (x, Y(yb + 6.7 + g(8.8)), z), RY, 6, 'springbolt'); finish(b, 0.04, 2, m=chrome)
    lf = cyl(0.75, 0.9, (CL.x, Y(yb + 4.9 + g(9.6)), CL.z), RY, 48, 'releasebearing'); finish(lf, 0.05, 2, m=chrome)
    rod = cyl(0.28, 3.0, (CL.x, Y(yb + 6.6 + g(10.3)), CL.z), RY, 24, 'liftrod'); rod.data.materials.append(steel)
    ms = cyl(0.88, 2.0, (CL.x, Y(yb + 0.2), CL.z), RY, 48, 'mainshaft'); finish(ms, 0.04, m=steel)

if MODE in ('xray', 'exploded'):
    clutch(0.0, MODE == 'exploded')

studio(sc, bg=(0.97, 0.97, 0.96), key=3000)
bpy.data.objects['Plane'].location.z = -10.2
if MODE == 'exploded':
    camera(sc, (48, -82, 30), (-4.0, -14.0, 2.0), lens=52, res=(1800, 1200))
else:
    camera(sc, (-34, -92, 34), (-0.5, -2.0, 3.0), lens=55, res=(1800, 1200))
sc.cycles.transparent_max_bounces = 16
sc.camera.data.dof.aperture_fstop = 32
render(sc, OUT)
