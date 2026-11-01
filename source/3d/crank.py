import sys, math, bpy, bmesh
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '/home/claude/mc/render3d/out/crank.png'
sc = reset()
alu = noisy_mat('alu', (0.86, 0.86, 0.85), 1.0, 0.22, 0.06, 90, 0.03)
alu_m = noisy_mat('alu_mach', (0.9, 0.9, 0.9), 1.0, 0.12, 0.03, 300, 0.01)
forged = noisy_mat('forged', (0.42, 0.43, 0.45), 1.0, 0.42, 0.10, 40, 0.15)
ground = brushed(mat('ground', (0.78, 0.78, 0.79), 1.0, 0.14), 'X', 0.6)
ringm = mat('ring', (0.30, 0.30, 0.32), 1.0, 0.30)
chrome = mat('chrome', (0.92, 0.92, 0.93), 1.0, 0.05)
brass = mat('bronze', (0.72, 0.50, 0.30), 1.0, 0.28)

def spin(profile, name, axis='Z', loc=(0, 0, 0), segs=128, m=None):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new((r, 0, z)) for r, z in profile]
    es = [bm.edges.new((vs[i], vs[i + 1])) for i in range(len(vs) - 1)]
    bmesh.ops.spin(bm, geom=vs + es, cent=(0, 0, 0), axis=(0, 0, 1), angle=math.tau, steps=segs, use_duplicate=False)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); o.location = loc
    if axis == 'X': o.rotation_euler = (0, math.radians(90), 0)
    if m: o.data.materials.append(m)
    for p in o.data.polygons: p.use_smooth = True
    return o

CZ = 8.0; THR = 2.475; L = 10.0; TH = math.radians(38)
pin = (0, THR * math.sin(TH), CZ + THR * math.cos(TH))
phi = math.asin(THR * math.sin(TH) / L)
pz = pin[2] + L * math.cos(phi)

# ---------------- crankshaft ----------------
parts = []
for sx in (-1, 1):
    w = cyl(5.6, 1.5, (sx * 1.85, 0, CZ), (0, math.radians(90), 0), 160, 'web'); finish(w, 0.06, 4, m=forged)
    # crankpin side boss and lightening holes opposite the pin
    for a in (-0.55, 0, 0.55):
        ang = TH + math.pi + a
        h = cyl(0.55, 2.0, (sx * 1.85, 3.6 * math.sin(ang), CZ + 3.6 * math.cos(ang)), (0, math.radians(90), 0), 48, 'hole')
        cut(w, h)
    # chamfer ring on outer face
    ring = torus(5.35, 0.12, (sx * 2.62, 0, CZ), (0, math.radians(90), 0), 'web_edge'); finish(ring, 0, m=forged)
cp = cyl(1.3, 4.9, pin, (0, math.radians(90), 0), 96, 'crankpin'); finish(cp, 0.04, m=ground)
for sx in (-1, 1):
    hub = cyl(2.3, 0.3, (sx * 2.7, 0, CZ), (0, math.radians(90), 0), 128, 'hub'); finish(hub, 0.05, 3, m=forged)
    pe = cyl(1.3, 0.12, (sx * 2.58, pin[1], pin[2]), (0, math.radians(90), 0), 64, 'pinend'); finish(pe, 0.03, m=ground)
# main journals and shafts
for sx in (-1, 1):
    j = cyl(1.55, 1.6, (sx * 3.4, 0, CZ), (0, math.radians(90), 0), 96, 'journal'); finish(j, 0.05, m=ground)
# left: primary drive gear + spline
g = cyl(2.35, 1.1, (-5.0, 0, CZ), (0, math.radians(90), 0), 120, 'gear'); finish(g, 0.03, m=ground)
N = 38
for i in range(N):
    a = i * math.tau / N
    t = box((1.1, 0.26, 0.42), (-5.0, 2.55 * math.sin(a), CZ + 2.55 * math.cos(a)), (-a, 0, 0), 'tooth'); finish(t, 0.04, 2, m=ground)
sh = cyl(1.15, 4.2, (-7.6, 0, CZ), (0, math.radians(90), 0), 96, 'shaftL'); finish(sh, 0.05, m=ground)
for i in range(16):
    a = i * math.tau / 16
    s = box((2.4, 0.18, 0.16), (-8.4, 1.17 * math.sin(a), CZ + 1.17 * math.cos(a)), (-a, 0, 0), 'spline'); finish(s, 0.02, 2, m=ground)
# right: cam chain sprocket, taper, thread
sp = cyl(1.75, 0.6, (-0.0 + 4.7, 0, CZ), (0, math.radians(90), 0), 96, 'sprocket'); finish(sp, 0.02, m=ground)
for i in range(18):
    a = i * math.tau / 18
    t = box((0.6, 0.30, 0.42), (4.7, 1.85 * math.sin(a), CZ + 1.85 * math.cos(a)), (-a, 0, 0), 'stooth'); finish(t, 0.06, 2, m=ground)
tp = spin([(0, 0), (1.2, 0), (0.95, 2.6), (0, 2.6)], 'taper', 'X', (5.0, 0, CZ), m=ground)
key = box((1.2, 0.22, 0.25), (6.0, 0, CZ + 1.02), (0, math.radians(-5), 0), 'key'); finish(key, 0.03, 2, m=forged)
th = cyl(0.62, 1.8, (8.4, 0, CZ), (0, math.radians(90), 0), 64, 'thread'); finish(th, 0.02, m=ground)
for i in range(14):
    tt = torus(0.62, 0.06, (7.6 + i * 0.12, 0, CZ), (0, math.radians(90), 0), 'thr', 64, 8); finish(tt, 0, m=ground)

# ---------------- connecting rod ----------------
def rod():
    objs = []
    be = cyl(2.05, 1.5, (0, 0, 0), (0, math.radians(90), 0), 128, 'bigend')
    hb = cyl(1.32, 2, (0, 0, 0), (0, math.radians(90), 0), 96, 'h'); cut(be, hb); finish(be, 0.06, 4, m=forged)
    se = cyl(1.12, 1.5, (0, 0, L), (0, math.radians(90), 0), 96, 'smallend')
    hs = cyl(0.76, 2, (0, 0, L), (0, math.radians(90), 0), 64, 'h'); cut(se, hs); finish(se, 0.05, 4, m=forged)
    beam = box((1.5, 1.25, L - 2.6), (0, 0, L / 2 + 0.1), name='beam')
    for sx in (-1, 1):
        gcut = box((0.5, 0.75, L - 4.4), (sx * 0.75, 0, L / 2 + 0.1), name='ig'); cut(beam, gcut)
    finish(beam, 0.08, 4, m=forged)
    oil = cyl(0.18, 1, (0, 0, L + 1.1), (0, 0, 0), 24, 'oilhole'); cut(se, oil)
    bush = cyl(0.78, 1.52, (0, 0, L), (0, math.radians(90), 0), 64, 'bush'); hb2 = cyl(0.74, 2, (0, 0, L), (0, math.radians(90), 0), 64, 'h'); cut(bush, hb2); finish(bush, 0, m=brass)
    # needle roller cage in big end
    cage = cyl(1.31, 1.4, (0, 0, 0), (0, math.radians(90), 0), 96, 'cage'); hc = cyl(1.3, 2, (0, 0, 0), (0, math.radians(90), 0), 96, 'h'); cut(cage, hc); finish(cage, 0, m=brass)
    return [be, se, beam, bush, cage]
rp = rod()
import mathutils
for o in rp:
    M = mathutils.Matrix.Translation(pin) @ mathutils.Matrix.Rotation(phi, 4, 'X')
    o.matrix_world = M @ o.matrix_world

# ---------------- piston ----------------
R = 2.82; zc = 2.35  # compression height
prof = [(0, zc + 0.12), (1.6, zc + 0.10), (2.55, zc), (R - 0.04, zc - 0.03), (R, zc - 0.1),
        (R, zc - 0.32), (R - 0.18, zc - 0.32), (R - 0.18, zc - 0.47), (R, zc - 0.47),
        (R, zc - 0.70), (R - 0.18, zc - 0.70), (R - 0.18, zc - 0.85), (R, zc - 0.85),
        (R, zc - 1.08), (R - 0.22, zc - 1.08), (R - 0.22, zc - 1.36), (R, zc - 1.36),
        (R - 0.005, -1.9), (R - 0.03, -2.05), (0, -2.05)]
pst = spin(prof, 'piston', 'Z', (0, 0, pz), 160, alu)
inner = cyl(2.45, 3.6, (0, 0, pz - 2.05 + 1.75), (0, 0, 0), 96, 'inner'); cut(pst, inner)
for sx in (-1, 1):
    boss = cyl(1.15, 1.7, (sx * 1.55, 0, pz), (0, math.radians(90), 0), 64, 'boss'); finish(boss, 0.05, m=alu)
    cut(boss, cyl(0.76, 2.5, (sx * 1.55, 0, pz), (0, math.radians(90), 0), 64, 'h'))
    sk = box((2.0, 4.0, 1.7), (sx * 2.7, 0, pz - 1.25), name='skirtcut'); cut(pst, sk)
pinh = cyl(0.76, 7, (0, 0, pz), (0, math.radians(90), 0), 64, 'pinhole'); cut(pst, pinh)
for vx in (-1, 1):
    vr = cyl(1.05, 0.2, (0, vx * 0.95, pz + zc + 0.15), (0, 0, 0), 64, 'relief'); cut(pst, vr)
bv = pst.modifiers.new('bv', 'BEVEL'); bv.width = 0.02; bv.segments = 2; bv.limit_method = 'ANGLE'
# rings
for z0, z1, m in ((zc - 0.32, zc - 0.47, ringm), (zc - 0.70, zc - 0.85, ringm)):
    rr = spin([(R - 0.16, z0 - 0.005), (R - 0.004, z0 - 0.005), (R - 0.004, z1 + 0.005), (R - 0.16, z1 + 0.005), (R - 0.16, z0 - 0.005)], 'ring', 'Z', (0, 0, pz), 160, m)
oc = spin([(R - 0.2, zc - 1.085), (R - 0.006, zc - 1.085), (R - 0.006, zc - 1.355), (R - 0.2, zc - 1.355), (R - 0.2, zc - 1.085)], 'oilring', 'Z', (0, 0, pz), 160, ringm)
gp = cyl(0.745, 4.9, (0, 0, pz), (0, math.radians(90), 0), 64, 'gpin'); cut(gp, cyl(0.45, 6, (0, 0, pz), (0, math.radians(90), 0), 48, 'h')); finish(gp, 0.02, m=chrome)
for sx in (-1, 1):
    cl = torus(0.6, 0.05, (sx * 2.5, 0, pz), (0, math.radians(90), 0), 'circlip', 48, 8); finish(cl, 0, m=ringm)

studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-46, -52, 30), (0.3, 0, 12.6), lens=72)
render(sc, OUT)
