"""Rear monoshock: coil-over damper with preload collars, piggyback reservoir, clevis ends. Axis along Z (eye-to-eye ~32 cm)."""
import os, sys, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _dtc import *

META = {"title": "Rear shock absorber (monoshock with piggyback reservoir)", "category": "chassis", "kind": "part", "view": (-32, 12)}
A = 'rear_shock'

def lathe_z(prof, name, loc=(0, 0, 0), m=None, segs=64):
    return spin(list(prof) + [prof[0]], name, 'Z', loc, segs, m)

def thread_mat(name, base, metallic=1.0, rough=0.3, pitch_scale=9.0):
    m = mat(name, base, metallic, rough); nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); w = nt.nodes.new('ShaderNodeTexWave')
    w.wave_type = 'BANDS'; w.bands_direction = 'Z'; w.inputs['Scale'].default_value = pitch_scale; w.wave_profile = 'TRI'
    nt.links.new(tc.outputs['Object'], w.inputs['Vector'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.9; bp.inputs['Distance'].default_value = 0.03
    nt.links.new(w.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m

def clevis(name, z, up, m, bolt_m):
    """Forked clevis end with cross bolt (axis Y). up=+1: fork opens downward (bottom end)."""
    body = box((3.2, 3.4, 3.6), (0, 0, z), name='cl'); finish(body, 0.5, 3); apply_mods(body)
    cutw(body, box((5, 1.9, 3.0), (0, 0, z - up * 0.9), name='_slot'))
    cutw(body, cyl(0.62, 6, (0, 0, z - up * 0.5), RY, 32, '_hole'))
    neck = cyl(1.4, 2.0, (0, 0, z + up * 2.4), (0, 0, 0), 48, 'neck')
    o = joinn([body, neck], name); finish(o, 0.12, 2, m=m)
    b = cyl(0.6, 4.6, (0, 0, z - up * 0.5), RY, 24, 'bolt'); h = cyl(0.9, 0.55, (0, -2.0, z - up * 0.5), RY, 6, 'bh')
    n = cyl(0.9, 0.6, (0, 2.0, z - up * 0.5), RY, 6, 'bn')
    bo = joinn([b, h, n], name + '_bolt'); finish(bo, 0.05, 2, m=bolt_m)
    return o

def build():
    body_m = M('black_anod'); gold = M('gold_anod'); chrome = M('chrome'); zinc = M('zinc'); alu = M('alu_satin')
    spring_m = mat('spring_red', (0.62, 0.04, 0.03), 0.3, 0.28, coat=0.6)
    # bottom clevis + lower spring seat
    clevis(A + '__lower_clevis', 1.8, 1, M('alu_cast'), zinc)
    seat = lathe_z([(1.4, 4.4), (3.75, 4.4), (3.75, 4.9), (3.3, 5.3), (1.4, 5.3)], A + '__lower_spring_seat', m=alu); finish(seat, 0.06, 2)
    # rebound adjuster knob on the clevis side
    rk = cyl(0.75, 0.7, (1.95, 0, 1.6), RX, 24, A + '__rebound_adjuster'); finish(rk, 0.1, 2, m=M('red_anod'))
    # shaft + bump stop
    sh = cyl(0.8, 9.5, (0, 0, 9.0), (0, 0, 0), 32, A + '__shaft'); finish(sh, 0.03, 1, m=chrome)
    bs = lathe_z([(0.8, 11.9), (1.5, 11.9), (1.75, 12.8), (1.5, 13.4), (0.8, 13.4)], A + '__bump_stop', m=M('rubber')); finish(bs, 0.05, 2)
    # damper body: seal head, smooth section, threaded section, top cap
    bd = lathe_z([(0.81, 13.3), (2.2, 13.3), (2.35, 13.7), (2.35, 20.0), (2.3, 20.1), (0.81, 20.1)], A + '__damper_body', m=body_m, segs=72)
    finish(bd, 0.06, 2)
    th = lathe_z([(0.81, 20.0), (2.45, 20.0), (2.45, 27.6), (0.81, 27.6)], A + '__threaded_sleeve', m=thread_mat('thread_black', (0.05, 0.05, 0.055), 0.7, 0.3), segs=72)
    finish(th, 0.03, 1)
    top = lathe_z([(0.001, 27.5), (2.6, 27.5), (2.6, 29.2), (2.2, 29.8), (1.4, 30.1), (0.001, 30.1)], A + '__top_cap', m=M('alu_cast'), segs=72)
    finish(top, 0.08, 2)
    # top eye with spherical bearing (axis Y)
    eye = cyl(1.75, 2.4, (0, 0, 31.8), RY, 48, 'eye'); neck = cyl(1.2, 2.0, (0, 0, 30.3), (0, 0, 0), 32, 'eyeneck')
    ey = joinn([eye, neck], A + '__top_eye'); cutw(ey, cyl(1.0, 4, (0, 0, 31.8), RY, 32, '_eh')); finish(ey, 0.15, 2, m=M('alu_cast'))
    sb = lathe_y_ring(0.5, 1.02, 1.7, (0, 0, 31.8), A + '__spherical_bearing'); finish(sb, 0.05, 2, m=chrome)
    # preload collars (castellated) on the thread
    pc = cyl(3.75, 1.0, (0, 0, 22.4), (0, 0, 0), 72, 'pc')
    notches = joinn([box((1.2, 0.6, 0.7), (3.75 * math.cos(k * TAU / 8), 3.75 * math.sin(k * TAU / 8), 22.4), (0, 0, k * TAU / 8), 'n') for k in range(8)], '_notch')
    cutw(pc, notches); cutw(pc, cyl(2.46, 3, (0, 0, 22.4), (0, 0, 0), 72, '_pci'))
    finish(pc, 0.08, 2, m=gold); nm(pc, A + '__preload_collar')
    lc = cyl(3.2, 0.8, (0, 0, 23.4), (0, 0, 0), 72, 'lc')
    n2 = joinn([box((1.0, 0.5, 0.5), (3.2 * math.cos(k * TAU / 6), 3.2 * math.sin(k * TAU / 6), 23.4), (0, 0, k * TAU / 6), 'n') for k in range(6)], '_notch2')
    cutw(lc, n2); cutw(lc, cyl(2.46, 3, (0, 0, 23.4), (0, 0, 0), 72, '_lci'))
    finish(lc, 0.08, 2, m=gold); nm(lc, A + '__lock_ring')
    # spring (ground ends) between the seats
    z0, z1, wire, turns = 4.9, 21.9, 0.55, 7.5
    pitch = ((z1 - z0) - 4 * 2.2 * wire / 2) / (turns - 2)
    sp = helix(3.0, pitch, turns, wire, (0, 0, z0 + wire), spring_m, A + '__spring', ground_ends=True)
    sp.data.bevel_resolution = 3
    sp.scale.z = (z1 - z0 - 2 * wire) / max(1e-3, ((turns - 2) * pitch + 4.4 * wire - 2.2 * wire))
    # piggyback reservoir with bridge, end cap, compression adjuster and valve
    bridge = box((5.6, 3.2, 3.0), (2.8, 0, 28.4), name='br'); finish(bridge, 0.8, 3); apply_mods(bridge)
    rv = lathe_z([(0.001, 17.0), (1.7, 17.0), (2.0, 17.4), (2.0, 29.8), (1.8, 30.1), (0.001, 30.1)], 'res', (5.4, 0, 0), segs=64)
    ro = joinn([bridge, rv], A + '__reservoir'); finish(ro, 0.08, 2, m=body_m)
    ring = cyl(2.08, 0.5, (5.4, 0, 18.0), (0, 0, 0), 64, A + '__reservoir_ring'); finish(ring, 0.08, 2, m=gold)
    ck = lathe_z([(0.001, 15.6), (1.3, 15.6), (1.4, 16.0), (1.4, 16.9), (0.001, 16.9)], A + '__compression_adjuster', (5.4, 0, 0), segs=24)
    finish(ck, 0.08, 2, m=M('blue_anod'))
    vc = cyl(0.42, 1.2, (5.4 + 2.4, 0, 27.0), RX, 24, A + '__valve_cap'); finish(vc, 0.1, 2, m=M('plastic'))
    # installed attitude: leaned forward like a linkage monoshock
    transform_all(mathutils.Matrix.Rotation(math.radians(58), 4, 'Y'))

def lathe_y_ring(r0, r1, w, loc, name):
    o = spin([(r0, -w / 2), (r1, -w / 2 + 0.2), (r1, w / 2 - 0.2), (r0, w / 2), (r0, -w / 2)], name, 'Z', loc, 48)
    o.rotation_euler = (math.radians(90), 0, 0); return o
