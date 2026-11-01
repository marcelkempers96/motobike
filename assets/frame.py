"""Bare tubular steel trellis frame: welded tube triangles, steering head, cast swingarm pivot plates and a bolt-on subframe.
Swingarm pivot axis at the origin (axis Y), +X forward."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *
from rear_sprocket import chaikin

META = {"title": "Trellis frame (tubular steel)", "category": "frame_body", "kind": "part", "view": (-40, 20)}
A = 'frame'
RAKE = math.radians(25)

def segs_curve(segs, r, name, m, res=3):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r; cu.bevel_resolution = res; cu.use_fill_caps = True
    for a, b in segs:
        a = V(a); b = V(b); d = (b - a).normalized()
        a2 = a - d * r * 0.6; b2 = b + d * r * 0.6
        sp = cu.splines.new('POLY'); sp.points.add(1)
        sp.points[0].co = (*a2, 1); sp.points[1].co = (*b2, 1)
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o); o.data.materials.append(m)
    return o

def bent_curve(paths, r, name, m, res=3):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r; cu.bevel_resolution = res; cu.use_fill_caps = True
    cu.resolution_u = 12
    for pts in paths:
        sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
        for bp, p in zip(sp.bezier_points, pts): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o); o.data.materials.append(m)
    return o

def weld_rings(segs, r, m, name):
    """Fillet weld beads near both ends of each straight tube."""
    tpl = torus(1.0, 0.16, (0, 0, 0), (0, 0, 0), '_weld_tpl', 24, 6); bake(tpl)
    mats = []
    for a, b in segs:
        a = V(a); b = V(b); d = (b - a); L = d.length; d.normalize()
        q = d.to_track_quat('Z', 'Y').to_matrix().to_4x4()
        for p in (a + d * r * 1.3, b - d * r * 1.3):
            mats.append(mathutils.Matrix.Translation(p) @ q @ mathutils.Matrix.Diagonal((r + 0.08, r + 0.08, 1.4, 1)))
    o = instances(tpl, mats, name); finish(o, 0, m=m); hide(tpl); return o

def build():
    paint = M('red_paint'); weld = M('weld'); alu = noisy_mat('pivot_cast', (0.74, 0.74, 0.75), 1.0, 0.34, 0.08, 120, 0.08)
    # ---------- steering head ----------
    d = V((-math.sin(RAKE), 0, math.cos(RAKE)))
    Hc = V((54.0, 0, 44.0))
    ht = spin([(1.9, -8.0), (2.75, -8.0), (2.75, -7.2), (2.55, -6.6), (2.55, 6.6), (2.75, 7.2), (2.75, 8.0), (1.9, 8.0), (1.9, -8.0)], A + '__steering_head', 'Z', (0, 0, 0), 64)
    ht.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); ht.location = Hc
    finish(ht, 0.06, 2, m=paint)
    cups = []
    for s in (-1, 1):
        c = spin([(1.55, 0), (2.0, 0), (2.0, 0.35), (1.55, 0.35), (1.55, 0)], 'cup', 'Z', (0, 0, 0), 48)
        c.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); c.location = Hc + d * s * 8.0 - (d * 0.35 if s > 0 else V((0, 0, 0)))
        cups.append(c)
    cj = joinn(cups, A + '__head_bearing_cups'); finish(cj, 0.03, 1, m=M('chrome'))
    # gusset between head tube and the rails
    gus = []
    for s in (-1, 1):
        g = prism(chaikin([(50.5, 47.5), (56.2, 38.0), (51.0, 33.0), (46.5, 42.5)], 2), s * 1.6 - 0.2, s * 1.6 + 0.2, 'gus', 'Y'); gus.append(g)
    gj = joinn(gus, A + '__head_gussets'); finish(gj, 0.08, 2, m=paint)

    # ---------- trellis ----------
    allsegs = []
    for s, side in ((-1, 'left'), (1, 'right')):
        U = [V((51.0, s * 2.6, 48.5)), V((36.0, s * 8.6, 46.0)), V((20.0, s * 10.6, 41.0)), V((6.0, s * 11.0, 17.0))]
        L = [V((55.5, s * 2.6, 37.5)), V((40.0, s * 9.0, 29.0)), V((24.0, s * 10.6, 21.0)), V((8.0, s * 11.0, 5.5))]
        segs = [(U[i], U[i + 1]) for i in range(3)] + [(L[i], L[i + 1]) for i in range(3)]
        segs += [(U[1], L[1]), (U[2], L[2])] + [(U[i], L[i + 1]) for i in range(3)]
        c = segs_curve(segs, 1.3, A + f'__trellis_{side}', paint); allsegs += segs
        # engine mount tabs on the lower rail
        tabs = []
        for p, dz in ((L[1], -2.4), (L[2], -2.4)):
            t = prism(chaikin([(p.x - 1.6, p.z), (p.x + 1.6, p.z), (p.x + 1.1, p.z + dz - 0.9), (p.x - 1.1, p.z + dz - 0.9)], 2),
                      p.y - s * 0.6 - 0.25, p.y - s * 0.6 + 0.25, 'tab', 'Y')
            cutw(t, cyl(0.45, 3, (p.x, p.y, p.z + dz - 0.3), RY, 20, '_th'), fast=True); tabs.append(t)
        tj = joinn(tabs, A + f'__engine_mounts_{side}'); finish(tj, 0.06, 2, m=paint)
        # cast swingarm pivot plate
        pp = chaikin([(-4.8, -6.0), (4.5, -7.0), (9.5, -1.0), (10.5, 8.0), (8.5, 19.0), (2.0, 20.0), (-2.5, 13.0), (-5.8, 4.0)], 3)
        plate = prism(pp, s * 11.0 - 0.9, s * 11.0 + 0.9, A + f'__pivot_plate_{side}', 'Y', holes=[circle(1.6, 40, 0, 0)])
        pockets = prism(chaikin([(-1.0, 5.0), (5.5, 3.5), (7.2, 10.0), (4.8, 15.0), (1.0, 12.5)], 3), s * 11.0 + s * 0.5, s * 11.0 + s * 2.0, '_pk', 'Y')
        cutw(plate, pockets)
        finish(plate, 0.3, 3, m=alu)
        boss = spin([(1.6, -1.6), (3.0, -1.6), (3.0, 1.6), (1.6, 1.6), (1.6, -1.6)], A + f'__pivot_boss_{side}', 'Z', (0, 0, 0), 48)
        boss.rotation_euler = (math.radians(-90), 0, 0); boss.location = (0, s * 11.0, 0); finish(boss, 0.2, 2, m=alu)
        # footrest hanger bosses
        fb = cyl(1.2, 2.4, (-4.5, s * 11.9, -6.0), RY, 32, A + f'__footrest_boss_{side}'); finish(fb, 0.15, 2, m=alu)
    welds = weld_rings(allsegs, 1.3, weld, A + '__welds')
    # cross tubes (top of pivot plates, below pivot)
    xt = segs_curve([(V((4.0, -10.2, 16.0)), V((4.0, 10.2, 16.0))), (V((-3.0, -10.2, -5.5)), V((-3.0, 10.2, -5.5))),
                     (V((22.0, -10.0, 39.0)), V((22.0, 10.0, 39.0)))], 1.0, A + '__cross_tubes', paint)

    # ---------- subframe (bolt-on, smaller tube) ----------
    sub_top = []; sub_low = []
    for s in (-1, 1):
        sub_top.append([(20.0, s * 10.6, 41.0), (-5.0, s * 10.0, 45.0), (-30.0, s * 8.8, 48.5), (-55.0, s * 7.4, 52.0), (-62.0, s * 4.0, 53.0)])
        sub_low.append([(5.0, s * 11.0, 17.5), (-15.0, s * 10.0, 38.0), (-34.0, s * 8.8, 47.0)])
    loop = [(-62.0, -4.0, 53.0), (-64.5, 0.0, 53.2), (-62.0, 4.0, 53.0)]
    st = bent_curve(sub_top + [loop], 1.0, A + '__subframe_rails', paint)
    sl = bent_curve(sub_low, 0.85, A + '__subframe_stays', paint)
    sx = segs_curve([(V((-30.0, -8.8, 48.5)), V((-30.0, 8.8, 48.5))), (V((-48.0, -7.8, 51.0)), V((-48.0, 7.8, 51.0)))], 0.7, A + '__subframe_cross', paint)
    # seat / tail mounting tabs
    tabs = []
    for x in (-12.0, -45.0):
        for s in (-1, 1):
            y = s * (10.0 if x > -20 else 8.0)
            t = prism(chaikin([(x - 1.4, 0), (x + 1.4, 0), (x + 1.0, 2.2), (x - 1.0, 2.2)], 2), y - 0.2, y + 0.2, 'st', 'Y')
            t.location.z = 46.5 if x > -20 else 50.6
            tabs.append(t)
    tj = joinn(tabs, A + '__seat_tabs'); finish(tj, 0.05, 2, m=paint)
    # subframe mounting bolts at the trellis
    bb = []
    for s in (-1, 1):
        for p in ((20.0, s * 11.9, 41.0), (5.0, s * 12.2, 17.5)):
            bb.append(cyl(0.65, 0.7, p, RY, 6, 'sb'))
    bj = joinn(bb, A + '__subframe_bolts'); finish(bj, 0.05, 2, m=M('zinc'))
