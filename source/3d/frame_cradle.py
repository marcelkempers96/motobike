"""Classic double-cradle steel frame: backbone, twin down tubes looping under the engine, rear uprights with swingarm pivot,
seat rails with twin-shock top mounts. Swingarm pivot at the origin (axis Y), +X forward."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
from rear_sprocket import chaikin
from frame import segs_curve, bent_curve, weld_rings

META = {"title": "Double-cradle frame (tubular steel)", "category": "frame_body", "kind": "part", "view": (-40, 18)}
A = 'frame_cradle'
RAKE = math.radians(27)

def ring_at(p, d, r, tpl_mats):
    q = V(d).normalized().to_track_quat('Z', 'Y').to_matrix().to_4x4()
    tpl_mats.append(mathutils.Matrix.Translation(p) @ q @ mathutils.Matrix.Diagonal((r + 0.08, r + 0.08, 1.4, 1)))

def build():
    paint = M('black_paint'); steel = M('zinc')
    d = V((-math.sin(RAKE), 0, math.cos(RAKE))); Hc = V((56.0, 0, 45.0))
    ht = spin([(1.9, -7.5), (2.7, -7.5), (2.7, -6.8), (2.5, -6.2), (2.5, 6.2), (2.7, 6.8), (2.7, 7.5), (1.9, 7.5), (1.9, -7.5)], A + '__steering_head', 'Z', (0, 0, 0), 64)
    ht.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); ht.location = Hc; finish(ht, 0.06, 2, m=paint)
    Ht = Hc + d * 5.5; Hb = Hc - d * 5.5
    # backbone (single large tube) and its split to the seat rails
    bb = bent_curve([[tuple(Ht + V((-1.5, 0, 0))), (32.0, 0, 50.0), (10.0, 0, 46.5), (2.0, 0, 44.0)]], 1.6, A + '__backbone', paint, res=4)
    br = segs_curve([(V((2.5, 0, 44.0)), V((-1.0, -9.0, 43.0))), (V((2.5, 0, 44.0)), V((-1.0, 9.0, 43.0)))], 1.2, A + '__backbone_branches', paint)
    # down tubes + cradle + rear uprights (one continuous bent tube per side)
    loops = []; seat = []; struts = []
    for s in (-1, 1):
        loops.append([tuple(Hb + V((0.5, s * 2.4, 0.5))), (54.0, s * 5.0, 26.0), (50.0, s * 7.5, 8.0), (45.0, s * 8.0, -6.0), (36.0, s * 8.0, -10.5),
                      (18.0, s * 8.2, -11.0), (6.0, s * 8.6, -9.5), (1.0, s * 9.6, -4.0), (0.0, s * 10.0, 4.0), (0.0, s * 10.0, 24.0), (-1.0, s * 9.0, 43.0)])
        seat.append([(-1.0, s * 9.0, 43.0), (-20.0, s * 10.5, 44.5), (-45.0, s * 10.0, 47.0), (-58.0, s * 6.5, 48.5)])
        struts.append((V((-40.0, s * 10.3, 46.2)), V((-0.5, s * 10.0, 9.0))))
    cr = bent_curve(loops, 1.4, A + '__cradle_tubes', paint, res=4)
    tail = [(-58.0, -6.5, 48.5), (-62.0, 0.0, 49.0), (-58.0, 6.5, 48.5)]
    se = bent_curve(seat + [tail], 1.1, A + '__seat_rails', paint)
    stc = segs_curve(struts, 1.0, A + '__rear_struts', paint)
    # cross tubes: front cradle, under engine, behind pivot (top), under seat
    xs = [(V((45.0, -8.0, -6.0)), V((45.0, 8.0, -6.0))), (V((6.0, -8.6, -9.5)), V((6.0, 8.6, -9.5))),
          (V((0.0, -10.0, 22.0)), V((0.0, 10.0, 22.0))), (V((-24.0, -10.4, 44.7)), V((-24.0, 10.4, 44.7)))]
    xc = segs_curve(xs, 1.0, A + '__cross_tubes', paint)
    welds = weld_rings(struts + xs + [(V((2.5, 0, 44.0)), V((-1.0, -9.0, 43.0))), (V((2.5, 0, 44.0)), V((-1.0, 9.0, 43.0)))], 1.15, M('black_paint'), A + '__welds')
    # head gussets
    gus = []
    for s in (-1, 1):
        g = prism(chaikin([(Ht.x - 1.0, Ht.z - 0.5), (Hb.x + 1.0, Hb.z + 0.5), (Hb.x - 2.0, Hb.z - 6.0), (40.0, 47.0)], 2),
                  s * 1.9 - 0.18, s * 1.9 + 0.18, 'gus', 'Y'); gus.append(g)
    gj = joinn(gus, A + '__head_gussets'); finish(gj, 0.06, 2, m=paint)
    # swingarm pivot bosses on the uprights
    pbs = [cyl(2.2, 3.0, (0, s * 10.6, 0), RY, 48, 'pb') for s in (-1, 1)]
    pj = joinn(pbs, A + '__pivot_bosses'); cutw(pj, cyl(1.2, 30, (0, 0, 0), RY, 32, '_ph'), fast=True); finish(pj, 0.15, 2, m=paint)
    # shock top mounts (studs) and engine mount plates
    sm = []
    for s in (-1, 1):
        sm.append(cyl(1.1, 1.6, (-40.0, s * 11.6, 45.8), RY, 32, 'boss'))
        sm.append(cyl(0.6, 2.2, (-40.0, s * 12.9, 45.8), RY, 24, 'stud'))
    smo = joinn(sm, A + '__shock_mounts'); finish(smo, 0.06, 2, m=steel)
    em = []
    for (x, z) in ((47.0, -2.0), (24.0, -9.6), (2.0, 14.0)):
        for s in (-1, 1):
            y = s * (8.0 if x > 10 else 9.4)
            p = prism(chaikin([(x - 2.0, z - 1.0), (x + 2.0, z - 1.0), (x + 1.6, z + 2.8), (x - 1.6, z + 2.8)], 2), y - s * 1.3 - 0.2, y - s * 1.3 + 0.2, 'em', 'Y')
            cutw(p, cyl(0.5, 4, (x, y, z + 1.6), RY, 20, '_emh'), fast=True); em.append(p)
    emo = joinn(em, A + '__engine_mounts'); finish(emo, 0.05, 2, m=paint)
    # side stand and footrest lugs
    lugs = [box((3.0, 1.4, 2.0), (8.0, -9.4, -11.2), name='ss'), box((2.4, 1.4, 1.8), (-4.0, -10.6, -2.0), name='fl'), box((2.4, 1.4, 1.8), (-4.0, 10.6, -2.0), name='fr')]
    for l in lugs: finish(l, 0.3, 2); apply_mods(l)
    lo = joinn(lugs, A + '__footrest_and_stand_lugs'); finish(lo, 0, m=paint)
