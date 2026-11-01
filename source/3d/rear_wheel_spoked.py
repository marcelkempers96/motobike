import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _wheelkit import *

A = 'rear_wheel_spoked'
META = {"title": "Rear wheel, wire-spoked (18 in)", "category": "wheels", "kind": "part", "view": (-30, 18)}

def build():
    before = set(bpy.context.scene.objects)
    b, wr = 22.86, 2.7
    S = Section(b, wr, 10.2, 32.9, p=2.15)
    ty = tyre(A + '__tyre', S, grooves=[(-13, 4.0, 0.5), (13, 4.0, 0.5), (-80, 2.0, 0.12), (80, 2.0, 0.12)], segs=112, m=M('rubber'))
    # universal block pattern: angled lateral grooves alternating left/right plus centre notches
    paths, n = [], 30
    for i in range(n):
        u = i * TAU / n
        for s, off in ((1, 0.0), (-1, TAU / n / 2)):
            u0 = u + off
            paths.append([(u0, s * 15), (u0 + 0.05, s * 30), (u0 + 0.07, s * 48)])
            paths.append([(u0 + 0.045, s * 2), (u0 + 0.07, s * 11)])
    cut(ty, groove_cutters(S, paths, 0.55, 0.5))
    finish(ty, 0)
    rim(A + '__rim', b, wr, M('chrome'))
    hub, fl_drum, fl_small = drum_hub(A, -1, drum_r=9.0, small=(5.4, -5.8), m_hub=M('alu_cast'), m_plate=M('alu_machined'))
    spoke_set(A + '__', 36, b - 1.7, {-1: fl_drum, 1: fl_small}, 2, M('chrome'), M('steel'), rim_dz=0.7)
    # sprocket carrier boss and sprocket on the left (+Z)
    boss = lathe([(2.2, 6.4), (6.6, 6.4), (6.8, 6.7), (6.8, 7.1), (2.2, 7.1), (2.2, 6.4)], A + '__sprocket_boss', M('alu_cast'), 72)
    finish(boss, 0.06, 2)
    spr, R = sprocket(A + '__sprocket', 46, 1.905, 0.6, M('darksteel'), bore=4.0, bolt_r=5.6, nbolts=6, win=(8.3, 6, 1.5))
    spr.location.z = 7.45
    nuts_ring(A + '__sprocket_nuts', 6, 5.6, 8.0, M('zinc'), 0.6, 0.5)
    valve_stem(A + '__valve', b - 1.7, math.radians(-90 + 5), M('brass'), M('plastic_black'))
    place_wheel(before, S.OD)
