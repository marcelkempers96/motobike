"""Shared helpers for photoreal part renders (Blender bpy, Cycles). Units: 1 = 1 cm."""
import bpy, math, mathutils

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = int(__import__("os").environ.get("SAMPLES","96"))
    sc.cycles.use_denoising = True
    sc.render.film_transparent = False
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = float(__import__('os').environ.get('EXPO','0.0'))
    sc.cycles.max_bounces = 8
    return sc

def mat(name, base, metallic=1.0, rough=0.3, aniso=0.0, coat=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*base, 1)
    b.inputs['Metallic'].default_value = metallic
    b.inputs['Roughness'].default_value = rough
    if aniso: b.inputs['Anisotropic'].default_value = aniso
    if coat: b.inputs['Coat Weight'].default_value = coat
    return m

def noisy_mat(name, base, metallic=1.0, rough=0.35, rvar=0.12, scale=60.0, bump=0.08):
    """Metal with micro roughness variation and fine bump (cast/forged look)."""
    m = mat(name, base, metallic, rough)
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tex = nt.nodes.new('ShaderNodeTexNoise'); tex.inputs['Scale'].default_value = scale; tex.inputs['Detail'].default_value = 8
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = rough - rvar; mr.inputs['To Max'].default_value = rough + rvar
    nt.links.new(tex.outputs['Fac'], mr.inputs['Value']); nt.links.new(mr.outputs['Result'], b.inputs['Roughness'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = bump; bp.inputs['Distance'].default_value = 0.002
    nt.links.new(tex.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m

def finish(o, bevel=0.03, seg=3, smooth=True, m=None):
    if bevel:
        bv = o.modifiers.new('bevel', 'BEVEL'); bv.width = bevel; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(35)
    if smooth:
        for p in o.data.polygons: p.use_smooth = True
        try:
            o.modifiers.new('wn', 'WEIGHTED_NORMAL').keep_sharp = True
        except Exception: pass
    if m: o.data.materials.append(m)
    return o

def cyl(r, depth, loc=(0, 0, 0), rot=(0, 0, 0), verts=96, name='cyl'):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.active_object; o.name = name; return o

def box(size, loc=(0, 0, 0), rot=(0, 0, 0), name='box'):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.active_object; o.scale = size; o.name = name
    bpy.ops.object.transform_apply(scale=True)
    return o

def torus(R, r, loc=(0, 0, 0), rot=(0, 0, 0), name='torus', maj=128, mn=24):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, location=loc, rotation=rot, major_segments=maj, minor_segments=mn)
    o = bpy.context.active_object; o.name = name; return o

def cut(target, cutter, op='DIFFERENCE'):
    md = target.modifiers.new('bool', 'BOOLEAN'); md.object = cutter; md.operation = op; md.solver = 'EXACT'
    cutter.hide_render = True; cutter.hide_viewport = True
    return md

def apply_all(o):
    bpy.context.view_layer.objects.active = o
    for m in list(o.modifiers):
        if m.type in ('BOOLEAN',):
            bpy.ops.object.modifier_apply(modifier=m.name)

def join(objs, name):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join(); objs[0].name = name; return objs[0]

def studio(sc, bg=(0.93, 0.93, 0.92), floor=True, key=900, size=40):
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    bgn = w.node_tree.nodes['Background']; bgn.inputs['Color'].default_value = (*bg, 1); bgn.inputs['Strength'].default_value = 0.45
    if floor:
        bpy.ops.mesh.primitive_plane_add(size=600, location=(0, 0, 0)); fl = bpy.context.active_object
        # sweep: bend a backdrop up behind
        fm = mat('floor', bg, 0.0, 0.55); fl.data.materials.append(fm)
    def area(loc, energy, sz, color=(1, 1, 1)):
        bpy.ops.object.light_add(type='AREA', location=loc); L = bpy.context.active_object
        L.data.energy = energy; L.data.size = sz; L.data.color = color
        d = mathutils.Vector((0, 0, 4)) - mathutils.Vector(loc); L.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
        return L
    area((-30, -35, 45), key * 1.0, size)            # key, soft, from front-left above
    area((40, -10, 25), key * 0.45, size * 0.8, (0.95, 0.97, 1.0))  # fill right
    area((5, 45, 40), key * 0.9, size * 0.6)          # rim from behind
    area((0, -60, 6), key * 0.18, size * 1.5)         # low front kicker for metal reflections

def camera(sc, loc, target, lens=85, res=(1600, 1200)):
    bpy.ops.object.camera_add(location=loc); c = bpy.context.active_object
    d = mathutils.Vector(target) - mathutils.Vector(loc); c.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    c.data.lens = lens; sc.camera = c
    sc.render.resolution_x, sc.render.resolution_y = res
    c.data.dof.use_dof = True; c.data.dof.focus_distance = d.length; c.data.dof.aperture_fstop = 11
    return c

def render(sc, path):
    sc.render.filepath = path; sc.render.image_settings.file_format = 'PNG'
    bpy.ops.render.render(write_still=True)

def brushed(m, axis='X', aniso=0.85):
    """Concentric machined finish: radial tangent around axis."""
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tg = nt.nodes.new('ShaderNodeTangent'); tg.direction_type = 'RADIAL'; tg.axis = axis
    b.inputs['Anisotropic'].default_value = aniso
    nt.links.new(tg.outputs['Tangent'], b.inputs['Tangent'])
    return m

def spin(profile, name, axis='Z', loc=(0, 0, 0), segs=128, m=None):
    import bmesh
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new((r, 0, z)) for r, z in profile]
    es = [bm.edges.new((vs[i], vs[i + 1])) for i in range(len(vs) - 1)]
    bmesh.ops.spin(bm, geom=vs + es, cent=(0, 0, 0), axis=(0, 0, 1), angle=math.tau, steps=segs, use_duplicate=False)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); o.location = loc
    if axis == 'X': o.rotation_euler = (0, math.radians(90), 0)
    if axis == 'Y': o.rotation_euler = (math.radians(90), 0, 0)
    if m: o.data.materials.append(m)
    for p in o.data.polygons: p.use_smooth = True
    return o

def helix(r, pitch, turns, wire, loc=(0, 0, 0), m=None, name='spring', ground_ends=False):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = wire; cu.bevel_resolution = 6
    sp = cu.splines.new('POLY'); n = int(turns * 48); sp.points.add(n)
    for i in range(n + 1):
        t = i / 48.0; a = t * math.tau
        z = t * pitch
        if ground_ends:
            if t < 1: z = t * wire * 2.2
            elif t > turns - 1: z = (turns - 1) * pitch - pitch + wire * 2.2 + (t - (turns - 1)) * wire * 2.2
            else: z = wire * 2.2 + (t - 1) * (pitch * (turns - 1) - pitch) / (turns - 2)
        sp.points[i].co = (r * math.cos(a), r * math.sin(a), z, 1)
    o = bpy.data.objects.new(name, cu); bpy.context.collection.objects.link(o); o.location = loc
    if m: o.data.materials.append(m)
    return o
