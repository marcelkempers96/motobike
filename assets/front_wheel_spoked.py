import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _wheelkit import *

A = 'front_wheel_spoked'
META = {"title": "Front wheel, wire-spoked (19 in)", "category": "wheels", "kind": "part", "view": (-30, 18)}

def build():
    before = set(bpy.context.scene.objects)
    b, wr = 24.13, 2.35
    S = Section(b, wr, 8.6, 32.5, p=2.0)
    ty = tyre(A + '__tyre', S, grooves=[(0, 4.5, 0.42), (-17, 4.0, 0.42), (17, 4.0, 0.42), (-36, 4.0, 0.4), (36, 4.0, 0.4)],
              segs=128, m=M('rubber'))
    # zig-zag sipes in the shoulder ribs
    paths = []
    n = 40
    for i in range(n):
        u = i * TAU / n
        for sgn in (-1, 1):
            paths.append([(u, sgn * 21), (u + 0.035, sgn * 26), (u + 0.01, sgn * 31)])
            paths.append([(u + TAU / n / 2, sgn * 6), (u + TAU / n / 2 + 0.025, sgn * 12.5)])
    cut(ty, groove_cutters(S, paths, 0.34, 0.4))
    finish(ty, 0, smooth=True)
    rim(A + '__rim', b, wr, M('chrome'))
    hub, fl_drum, fl_small = drum_hub(A, 1, drum_r=9.2, m_hub=M('alu_cast'), m_plate=M('alu_machined'))
    spoke_set(A + '__', 36, b - 1.7, {1: fl_drum, -1: fl_small}, 2, M('chrome'), M('steel'), rim_dz=0.6)
    valve_stem(A + '__valve', b - 1.7, math.radians(-90 + 5), M('brass'), M('plastic_black'))
    place_wheel(before, S.OD)
