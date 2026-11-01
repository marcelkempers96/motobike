"""Standalone 42T rear sprocket (520 pitch) with lightening windows, bolt holes and nuts. Axis along Y."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Rear sprocket (42T)", "category": "transmission", "kind": "part", "view": (-28, 22)}
A = 'rear_sprocket'
P520 = 1.5875

def chaikin(pts, it=2):
    for _ in range(it):
        q = []
        n = len(pts)
        for i in range(n):
            a = pts[i]; b = pts[(i + 1) % n]
            q.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
            q.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
        pts = q
    return pts

def sprocket_mat():
    return brushed(noisy_mat('sprocket_steel', (0.60, 0.60, 0.62), 1.0, 0.24, 0.06, 200, 0.03), 'Y', 0.75)

def make(name, center=(0, 0, 0), N=42, phase=0.0, thick=0.62, windows=6, m=None, nuts=True, seg=2):
    """Builds the sprocket in the XZ plane (axis Y) at center. Returns list of objects."""
    cx, cy, cz = center
    pts, R = sprocket_poly(N, P520, 1.02, phase=phase)
    pts = [(x + cx, z + cz) for x, z in pts]
    holes = [circle(4.05, 96, cx, cz)]
    sw = 1.25  # half-width of spokes (cm)
    for k in range(windows):
        a0 = k * TAU / windows + math.pi / windows * 0.0
        a1 = a0 + TAU / windows
        r0, r1 = 6.2, R - 1.85
        da0 = math.asin(sw / r0); da1 = math.asin(sw / r1)
        win = []
        for i in range(13):
            t = a0 + da1 + (a1 - a0 - 2 * da1) * i / 12; win.append((cx + r1 * math.cos(t), cz + r1 * math.sin(t)))
        for i in range(9):
            t = a1 - da0 - (a1 - a0 - 2 * da0) * i / 8; win.append((cx + r0 * math.cos(t), cz + r0 * math.sin(t)))
        holes.append(chaikin(win, 3))
    bc = []
    for k in range(6):
        a = k * TAU / 6 + math.pi / 6
        holes.append(circle(0.52, 20, cx + 5.15 * math.cos(a), cz + 5.15 * math.sin(a)))
        bc.append((cx + 5.15 * math.cos(a), cz + 5.15 * math.sin(a)))
    sp = prism(pts, cy - thick / 2, cy + thick / 2, name, 'Y', holes=holes)
    finish(sp, 0.07, seg, m=m or sprocket_mat())
    out = [sp]
    if nuts:
        ns = []
        for (x, z) in bc:
            ns.append(cyl(0.72, 0.55, (x, cy - thick / 2 - 0.55, z), RY, 6, 'nut'))
            ns.append(cyl(0.62, 0.12, (x, cy - thick / 2 - 0.06, z), RY, 24, 'washer'))
            ns.append(cyl(0.40, 1.5, (x, cy - thick / 2 - 0.4, z), RY, 20, 'stud'))
        no = joinn(ns, name + '_nuts'); finish(no, 0.05, 2, m=M('zinc')); out.append(no)
    return out

def build():
    objs = make(A + '__sprocket', (0, 0, 0), 42, math.pi / 2)
    nm(objs[1], A + '__nuts')
    # hub carrier stub behind it (cush-drive carrier ring, satin black)
    car = spin([(4.0, 0.31), (7.0, 0.31), (7.0, 1.8), (6.4, 2.6), (4.0, 2.6), (4.0, 0.31)], A + '__carrier', 'Z', (0, 0, 0), 128)
    car.rotation_euler = (math.radians(-90), 0, 0)
    finish(car, 0.12, 2, m=M('black_cast'))
