"""520 O-ring roller chain over a 15T front (countershaft) and 42T rear sprocket. Chain plane = XZ (y=0), +X forward."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
import rear_sprocket as RS

META = {"title": "Chain and sprockets (15T / 42T)", "category": "transmission", "kind": "part", "view": (-22, 20)}
A = 'chain_sprockets'
P = RS.P520

def chain_path(cr, rr, cf, rf):
    D = cf[0] - cr[0]; nx = (rr - rf) / D; nz = math.sqrt(1 - nx * nx)
    th = math.atan2(nz, nx)
    dr = TAU * 1 / round(TAU * rr / (2 * rr * math.asin(P / (2 * rr))))  # 2pi/N
    Nr = round(TAU / (2 * math.asin(P / (2 * rr)))); Nf = round(TAU / (2 * math.asin(P / (2 * rf))))
    dr = TAU / Nr; df = TAU / Nf
    rear = []; a = th
    while a <= TAU - th + 1e-6:
        rear.append((cr[0] + rr * math.cos(a), cr[1] + rr * math.sin(a))); a += dr
    front = []; a = -th
    while a <= th + 1e-6:
        front.append((cf[0] + rf * math.cos(a), cf[1] + rf * math.sin(a))); a += df
    def span(p, q, extra=0):
        L = math.dist(p, q); n = max(1, round(L / P) + extra)
        return [(p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n) for i in range(1, n)]
    bot = span(rear[-1], front[0]); top = span(front[-1], rear[0])
    if (len(rear) + len(front) + len(bot) + len(top)) % 2: top = span(front[-1], rear[0], 1)
    return rear + bot + front + top, th

def plate_poly(re=0.74, waist=0.6, n=10):
    pts = []
    a0 = math.radians(62)
    for i in range(n + 1):  # right end arc
        a = -math.pi + a0 + (TAU - 2 * a0) * i / n
        a = -(math.pi - a0) + (2 * (math.pi - a0)) * i / n
        pts.append((P + re * math.cos(a), re * math.sin(a)))
    xs, xe = P + re * math.cos(math.pi - a0), re * math.cos(a0)
    for i in range(1, 5):
        t = i / 5; x = xs + (xe - xs) * t; z = re * math.sin(a0) - (re * math.sin(a0) - waist) * math.sin(math.pi * t)
        pts.append((x, z))
    for i in range(n + 1):  # left end arc
        a = a0 + (TAU - 2 * a0) * i / n
        pts.append((re * math.cos(a), re * math.sin(a)))
    for i in range(1, 5):
        t = i / 5; x = xe + (xs - xe) * t; z = -(re * math.sin(a0) - (re * math.sin(a0) - waist) * math.sin(math.pi * t))
        pts.append((x, z))
    return pts

def build():
    cr = (-24.0, 0.0); cf = (22.0, 0.0)
    Nr, Nf = 42, 15
    rr = P / (2 * math.sin(math.pi / Nr)); rf = P / (2 * math.sin(math.pi / Nf))
    path, th = chain_path(cr, rr, cf, rf)
    # sprockets
    smat = RS.sprocket_mat()
    RS.make(A + '__rear_sprocket', (cr[0], 0, cr[1]), Nr, th, 0.62, m=smat, seg=1)
    pts, _ = sprocket_poly(Nf, P, 1.02, phase=-th)
    pts = [(x + cf[0], z + cf[1]) for x, z in pts]
    spl = [(cf[0] + (1.45 if i % 2 else 1.3) * math.cos(i * TAU / 36), cf[1] + (1.45 if i % 2 else 1.3) * math.sin(i * TAU / 36)) for i in range(36)]
    fs = prism(pts, -0.36, 0.36, A + '__front_sprocket', 'Y', holes=[spl])
    finish(fs, 0.07, 1, m=brushed(noisy_mat('front_sprocket', (0.40, 0.40, 0.42), 1.0, 0.3, 0.06, 200, 0.03), 'Y', 0.7))
    boss = spin([(1.45, 0.36), (2.6, 0.36), (2.6, 1.6), (1.45, 1.6), (1.45, 0.36)], A + '__front_sprocket_boss', 'Z', (cf[0], 0, cf[1]), 64)
    boss.rotation_euler = (math.radians(-90), 0, 0); finish(boss, 0.08, 2, m=M('steel_dark'))
    shaft = cyl(1.35, 4.0, (cf[0], 0.6, cf[1]), RY, 36, A + '__countershaft'); finish(shaft, 0.05, 2, m=M('steel'))
    plate = prism(rrect(4.6, 2.6, 1.2, 6, cf[0], cf[1]), -0.62, -0.36, A + '__retainer_plate', 'Y', holes=[circle(1.0, 24, cf[0], cf[1])])
    finish(plate, 0.05, 2, m=M('zinc'))
    bl = [cyl(0.42, 0.42, (cf[0] + s * 1.6, -0.8, cf[1]), RY, 6, 'b') for s in (-1, 1)]
    bo = joinn(bl, A + '__retainer_bolts'); finish(bo, 0.04, 2, m=M('zinc'))
    nut = cyl(1.05, 0.7, (cf[0], -0.95, cf[1]), RY, 6, A + '__countershaft_nut'); finish(nut, 0.07, 2, m=M('zinc'))

    # chain
    tpl = prism(plate_poly(), -0.09, 0.09, '_plate_tpl', 'Y')
    tpl_o = prism(plate_poly(0.76, 0.62), -0.09, 0.09, '_plate_tpl_o', 'Y')
    rol = cyl(0.508, 0.62, (0, 0, 0), RY, 14, '_roller_tpl')
    pin = cyl(0.254, 1.66, (0, 0, 0), RY, 12, '_pin_tpl')
    head = joinn([cyl(0.30, 0.08, (0, s * 0.85, 0), RY, 14, 'h') for s in (-1, 1)], '_head_tpl')
    for t in (tpl, tpl_o, rol, pin, head): bake(t)
    inner, outer, rolls, pins, heads, orings = [], [], [], [], [], []
    n = len(path)
    for i in range(n):
        p = path[i]; q = path[(i + 1) % n]
        ang = math.atan2(q[1] - p[1], q[0] - p[0])
        T = mathutils.Matrix.Translation((p[0], 0, p[1])) @ mathutils.Matrix.Rotation(-ang, 4, 'Y')
        sc = math.dist(p, q) / P
        S = mathutils.Matrix.Diagonal((sc, 1, 1, 1))
        if i % 2 == 0:
            for y in (-0.41, 0.41): inner.append(T @ mathutils.Matrix.Translation((0, y, 0)) @ S)
        else:
            for y in (-0.66, 0.66): outer.append(T @ mathutils.Matrix.Translation((0, y, 0)) @ S)
        Tp = mathutils.Matrix.Translation((p[0], 0, p[1]))
        rolls.append(Tp); pins.append(Tp); heads.append(Tp)
    ci = instances(tpl, inner, A + '__chain_inner_plates'); finish(ci, 0, m=noisy_mat('chain_plate', (0.16, 0.165, 0.18), 1.0, 0.30, 0.06, 150, 0.03))
    co = instances(tpl_o, outer, A + '__chain_outer_plates'); finish(co, 0, m=noisy_mat('chain_gold', (0.80, 0.60, 0.28), 1.0, 0.24, 0.04, 150, 0.02))
    ro = instances(rol, rolls, A + '__chain_rollers'); finish(ro, 0, m=M('steel'))
    pi = instances(pin, pins, A + '__chain_pins'); finish(pi, 0, m=mat('chain_pin', (0.75, 0.75, 0.77), 1.0, 0.18))
    he = instances(head, heads, A + '__chain_rivets'); finish(he, 0, m=mat('chain_pin2', (0.78, 0.78, 0.8), 1.0, 0.18))
    for t in (tpl, tpl_o, rol, pin, head): hide(t)
