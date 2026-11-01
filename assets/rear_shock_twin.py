"""Pair of classic chrome twin rear shocks with exposed springs, cam-type preload adjusters and rubber-bushed eyes."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
from rear_shock import lathe_z

META = {"title": "Twin rear shocks (classic chrome)", "category": "chassis", "kind": "part", "view": (-66, 18)}
A = 'rear_shock_twin'

def eye(name, z, chrome, rub, steel):
    e = cyl(1.65, 2.6, (0, 0, z), RY, 48, 'eye')
    cutw(e, cyl(1.12, 4, (0, 0, z), RY, 40, '_eh'), fast=True); finish(e, 0.12, 2, m=chrome); nm(e, name + '_eye')
    b = cyl(1.12, 2.7, (0, 0, z), RY, 40, 'bush'); cutw(b, cyl(0.62, 4, (0, 0, z), RY, 24, '_bh'), fast=True)
    finish(b, 0.15, 2, m=rub); nm(b, name + '_bush')
    s = cyl(0.62, 2.9, (0, 0, z), RY, 24, name + '_sleeve'); cutw(s, cyl(0.45, 4, (0, 0, z), RY, 24, '_sh'), fast=True); finish(s, 0.04, 1, m=steel)
    return e

def shock(P, x, y):
    chrome = M('chrome'); rub = M('rubber'); steel = M('steel')
    eye(P + '_lower', 0.0, chrome, rub, steel)
    body = lathe_z([(0.001, 1.4), (1.2, 1.4), (1.9, 2.4), (2.05, 3.2), (2.05, 17.0), (1.7, 17.6), (0.85, 17.8), (0.85, 18.0), (0.001, 18.0)],
                   P + '_damper_body', segs=72)
    finish(body, 0.06, 2, m=chrome)
    # 5-step cam preload adjuster: stepped ramp ring + spring seat
    cam = lathe_z([(2.07, 3.6), (3.0, 3.6), (3.0, 5.0), (2.07, 5.0)], 'cam', segs=72)
    steps = []
    for k in range(5):
        for j in range(2):
            a = (k + 0.5 * j) * TAU / 5 + j * math.pi
            steps.append(box((1.3, 0.9, 0.4 + 0.3 * k), (2.55 * math.cos(a), 2.55 * math.sin(a), 5.0 + (0.4 + 0.3 * k) / 2), (0, 0, a), 'st'))
    co = joinn([cam] + steps, P + '_preload_cam'); finish(co, 0.05, 2, m=chrome)
    seat = lathe_z([(2.07, 6.6), (3.45, 6.6), (3.45, 7.1), (2.07, 7.1)], P + '_lower_spring_seat', segs=72); finish(seat, 0.05, 2, m=chrome)
    shaft = cyl(0.62, 12, (0, 0, 22.0), (0, 0, 0), 32, P + '_shaft'); finish(shaft, 0.03, 1, m=chrome)
    top = lathe_z([(0.001, 26.0), (3.45, 26.0), (3.45, 26.6), (2.0, 27.2), (1.2, 28.8), (0.001, 28.8)], P + '_top_seat', segs=72)
    finish(top, 0.06, 2, m=chrome)
    eye(P + '_upper', 30.2, chrome, rub, steel)
    nk = cyl(0.95, 2.0, (0, 0, 29.0), (0, 0, 0), 32, P + '_upper_neck'); finish(nk, 0.05, 1, m=chrome)
    nk2 = cyl(0.95, 1.8, (0, 0, 1.0), (0, 0, 0), 32, P + '_lower_neck'); finish(nk2, 0.05, 1, m=chrome)
    z0, z1, wire, turns = 7.1, 26.0, 0.5, 10
    pitch = ((z1 - z0) - 4.4 * wire) / (turns - 2)
    sp = helix(2.85, pitch, turns, wire, (0, 0, z0), M('black_paint'), P + '_spring', ground_ends=True); sp.data.bevel_resolution = 3
    sp.rotation_euler.z = 0.0
    # lean the top forward (as mounted) and move into place
    mx = mathutils.Matrix.Translation((x, y, 0)) @ mathutils.Matrix.Rotation(math.radians(18), 4, 'Y')
    transform_all(mx, [o for o in bpy.context.scene.objects if not o.get('placed')])
    for o in bpy.context.scene.objects: o['placed'] = True

def build():
    shock(A + '__left', 0.0, -9.0)
    shock(A + '__right', 0.0, 9.0)
