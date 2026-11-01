import sys, math, bpy, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
from lib3d import *
OUT = sys.argv[sys.argv.index('--') + 1]
sc = reset()
spm = brushed(noisy_mat('sprocket', (0.62, 0.62, 0.64), 1.0, 0.24, 0.06, 200, 0.03), 'X', 0.7)
plate_m = noisy_mat('plate', (0.20, 0.21, 0.23), 1.0, 0.30, 0.06, 150, 0.03)
gold = noisy_mat('goldplate', (0.80, 0.62, 0.30), 1.0, 0.22, 0.04, 150, 0.02)
roller_m = mat('roller', (0.55, 0.55, 0.57), 1.0, 0.2)
pin_m = mat('pin', (0.75, 0.75, 0.77), 1.0, 0.15)
oring = mat('oring', (0.02, 0.02, 0.02), 0.0, 0.45)
RX = (0, math.radians(90), 0)
N = 42; P = 1.27; R = P / (2 * math.sin(math.pi / N)); C = mathutils.Vector((0, 0, 11.0))
def pt(r, a, x=0.0): return mathutils.Vector((x, r * math.sin(a), r * math.cos(a))) + C

# sprocket: disc with roller seats cut, hub, lightening windows, bolt holes
sp = cyl(R + 0.36, 0.62, C, RX, 256, 'sprocket')
seats = [cyl(0.445, 2, pt(R, i * math.tau / N), RX, 32, 's') for i in range(N)]
cut(sp, join(seats, 'seats'))
wins = []
for i in range(6):
    a = i * math.tau / 6
    w = cyl(1.55, 2, pt(5.0, a), RX, 64, 'win'); wins.append(w)
cut(sp, join(wins, 'wins'))
cut(sp, cyl(2.6, 2, C, RX, 128, 'bore'))
bolts = [cyl(0.42, 2, pt(3.35, i * math.tau / 6 + math.tau / 12), RX, 32, 'bh') for i in range(6)]
cut(sp, join(bolts, 'bolts'))
finish(sp, 0.08, 3, m=spm)
for i in range(6):
    nut = cyl(0.68, 0.45, pt(3.35, i * math.tau / 6 + math.tau / 12, -0.5), RX, 6, 'nut'); finish(nut, 0.05, 2, m=pin_m)
    st = cyl(0.36, 0.6, pt(3.35, i * math.tau / 6 + math.tau / 12, -0.8), RX, 24, 'stud'); finish(st, 0.03, m=pin_m)
hubr = cyl(2.75, 1.4, C, RX, 128, 'hubring'); cut(hubr, cyl(2.1, 3, C, RX, 96, 'hb')); finish(hubr, 0.06, 3, m=plate_m)

# chain path: top straight run to the left, wrap clockwise round the back, bottom straight run to the left
pts = []
a0 = 0.0
k = 0
# wrap from top (a=0) going towards +y over the far side to bottom (a=pi): seat angles
for i in range(int(N / 2) + 1):
    pts.append(pt(R, i * math.tau / N + math.pi / N * 0))
top = [pt(R, 0) + mathutils.Vector((0, -P * (j + 1), 0)) for j in range(30)]
bot = [pt(R, math.pi) + mathutils.Vector((0, -P * (j + 1), 0)) for j in range(30)]
path = list(reversed(top)) + pts + bot

def link_plate(a, b, x, thick, m, wide=0.62):
    mid = (a + b) / 2; d = b - a; ang = math.atan2(d.y, d.z)
    objs = [cyl(wide * 0.86, thick, (mid.x + x, a.y, a.z), RX, 32, 'pe'), cyl(wide * 0.86, thick, (mid.x + x, b.y, b.z), RX, 32, 'pe')]
    bx = box((thick, wide * 1.2, d.length), (mid.x + x, mid.y, mid.z), (-ang, 0, 0), 'pb')
    o = join(objs + [bx], 'plate'); finish(o, 0.03, 2, m=m); return o

for i, p in enumerate(path):
    r = cyl(0.425, 0.76, p, RX, 40, 'roller'); finish(r, 0.03, 2, m=roller_m)
    pn = cyl(0.2, 1.62, p, RX, 24, 'pin'); finish(pn, 0.02, m=pin_m)
    for sx in (-1, 1):
        h = cyl(0.26, 0.06, (p.x + sx * 0.84, p.y, p.z), RX, 24, 'rivet'); finish(h, 0.02, m=pin_m)
    if i + 1 < len(path):
        q = path[i + 1]
        if i % 2 == 0:
            for sx in (-1, 1): link_plate(p, q, sx * 0.47, 0.15, plate_m, 0.56)
        else:
            for sx in (-1, 1):
                link_plate(p, q, sx * 0.70, 0.15, gold, 0.6)
                o = torus(0.33, 0.05, (p.x + sx * 0.58, p.y, p.z), RX, 'or', 32, 8); finish(o, 0, m=oring)
                o = torus(0.33, 0.05, (q.x + sx * 0.58, q.y, q.z), RX, 'or', 32, 8); finish(o, 0, m=oring)

studio(sc, bg=(0.97, 0.97, 0.96), key=2600)
camera(sc, (-58, -50, 36), (0, -5.0, 10.4), lens=80)
render(sc, OUT)
