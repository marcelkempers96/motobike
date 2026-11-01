import sys, math, bpy, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
OUT = sys.argv[sys.argv.index('--') + 1]
sc = reset()
disc_m = brushed(noisy_mat('disc', (0.66, 0.66, 0.67), 1.0, 0.2, 0.05, 400, 0.02), 'X', 0.9)
carrier_m = noisy_mat('carrier', (0.06, 0.065, 0.07), 0.3, 0.28, 0.05, 80, 0.03)
cast = noisy_mat('cast', (0.80, 0.80, 0.80), 1.0, 0.38, 0.10, 120, 0.12)
chrome = mat('chrome', (0.93, 0.93, 0.94), 1.0, 0.05)
rubber = mat('rubber', (0.03, 0.03, 0.03), 0.0, 0.55)
steel = mat('steel', (0.7, 0.7, 0.72), 1.0, 0.2)
brass = mat('brass', (0.78, 0.6, 0.3), 1.0, 0.25)
RX = (0, math.radians(90), 0)
C = (0, 0, 15.5)

def at(r, a, x=0.0):  # point on disc plane (y,z) at radius r, angle a from top
    return (C[0] + x, C[1] + r * math.sin(a), C[2] + r * math.cos(a))

# disc ring with drilled holes and a petal-free round edge
disc = cyl(14.0, 0.45, C, RX, 256, 'disc')
holes = []
for ring, n, rr, off in ((10.9, 18, 0.32, 0), (11.9, 18, 0.32, 0.5), (12.9, 18, 0.32, 0.25)):
    for i in range(n):
        a = (i + off) * math.tau / n
        holes.append(cyl(rr, 1.2, at(ring, a), RX, 24, 'h'))
hj = join(holes, 'holes'); cut(disc, hj)
cut(disc, cyl(9.6, 2, C, RX, 192, 'inner'))
finish(disc, 0.04, 2, m=disc_m)
# carrier: outer ring, 5 spokes, hub
cr = cyl(9.75, 0.6, C, RX, 192, 'carrier'); cut(cr, cyl(8.7, 2, C, RX, 192, 'ci'))
finish(cr, 0.05, 3, m=carrier_m)
for i in range(5):
    a = i * math.tau / 5
    mid = at(6.7, a)
    sp = box((0.6, 1.5, 4.6), mid, (-a, 0, 0), 'spoke'); finish(sp, 0.28, 6, m=carrier_m)
hub = cyl(4.6, 0.7, C, RX, 160, 'hub'); cut(hub, cyl(2.6, 2, C, RX, 96, 'hb'))
bh = join([cyl(0.42, 2, at(3.6, i * math.tau / 5 + math.tau / 10), RX, 32, 'b') for i in range(5)], 'bh'); cut(hub, bh)
finish(hub, 0.06, 3, m=carrier_m)
for i in range(5):
    bo = cyl(0.62, 0.35, at(3.6, i * math.tau / 5 + math.tau / 10, -0.45), RX, 6, 'bolt'); finish(bo, 0.05, 2, m=steel)
# floating buttons
for i in range(10):
    a = i * math.tau / 10
    for x in (-0.32, 0.32):
        bt = cyl(0.42, 0.18, at(9.65, a, x), RX, 48, 'button'); finish(bt, 0.04, 2, m=chrome)

# caliper: two-piston sliding caliper at the rear-top of the disc
A = math.radians(-58)
def tang_rot():
    return (-A, 0, 0)
body_c = at(12.25, A)
body = box((3.4, 7.8, 3.6), body_c, tang_rot(), 'caliper'); finish(body, 0.75, 6, m=cast)
slot = box((0.9, 9, 3.0), at(12.6, A), tang_rot(), 'slot'); cut(body, slot)
for k in (-1.8, 1.8):
    p = cyl(1.25, 1.2, at(12.1, A + k / 12.1, -1.9), RX, 64, 'pistonbore'); finish(p, 0.25, 4, m=cast)
fins = []
for j in range(4):
    f = box((0.25, 6.2, 2.0), at(12.0, A, -1.75 - 0.0), tang_rot(), 'rib'); f.location.x = -1.3 - j * 0.0
    fins.append(f)
for f in fins: f.hide_render = True
# mounting bracket lugs and bolts
for k in (-4.2, 4.2):
    lug = cyl(0.95, 1.6, at(10.6, A + k / 12.0, -1.1), RX, 48, 'lug'); finish(lug, 0.15, 3, m=cast)
    hx = cyl(0.62, 0.5, at(10.6, A + k / 12.0, -2.15), RX, 6, 'hexbolt'); finish(hx, 0.05, 2, m=steel)
    bt = cyl(0.36, 0.8, at(10.6, A + k / 12.0, -2.7), RX, 6, 'socket'); finish(bt, 0.04, 2, m=steel)
# bleed nipple and banjo with hose
bn = cyl(0.32, 1.2, at(14.6, A + 0.2, -1.4), (0, 0, 0), 6, 'bleed'); finish(bn, 0.03, 2, m=brass)
bc = cyl(0.18, 0.6, at(14.6, A + 0.2, -1.4), (0, 0, 0), 24, 'bleedcap'); bc.location.z += 0.8; finish(bc, 0.02, m=rubber)
bj = cyl(0.65, 1.2, at(13.2, A - 0.22, -2.6), RX, 48, 'banjo'); finish(bj, 0.08, 2, m=steel)
bb = cyl(0.55, 0.5, at(13.2, A - 0.22, -3.35), RX, 6, 'banjobolt'); finish(bb, 0.05, 2, m=steel)
# brake hose: bezier tube
cu = bpy.data.curves.new('hose', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.32; cu.bevel_resolution = 6
sp = cu.splines.new('BEZIER'); sp.bezier_points.add(2)
pts = [at(13.2, A - 0.22, -2.6), at(16.5, A - 0.35, -3.2), at(20.5, A - 0.3, -2.5)]
for bp, p in zip(sp.bezier_points, pts):
    bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
ho = bpy.data.objects.new('hose', cu); bpy.context.collection.objects.link(ho); ho.data.materials.append(rubber)
# pads visible in the slot (friction material edge)
padm = mat('pad', (0.16, 0.14, 0.12), 0.0, 0.8)
for x in (-0.6, 0.6):
    pd = box((0.45, 6.0, 2.6), at(12.2, A, x), tang_rot(), 'pad'); finish(pd, 0.05, 2, m=padm)
# axle stub
ax = cyl(1.0, 6, C, RX, 64, 'axle'); finish(ax, 0.05, m=steel)

studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-78, -52, 40), (0, 0.8, 15.2), lens=80)
render(sc, OUT)
