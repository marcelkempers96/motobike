"""Under the Engine 3D asset runner.

Every asset is a module in /home/claude/mc/lib3d/parts/<asset_id>.py that defines

    META = {"title": "...", "category": "powertrain", "kind": "part" | "bike",
            "view": (azimuth_deg, elevation_deg)  # optional; default (-35, 18) for parts
           }
    def build(): ...   # creates the objects in the current scene (units: 1 = 1 cm, Z up, X forward)

Naming rule for objects created in build(): "<category>__<part>[__<sub>]" for bikes
(e.g. "powertrain__engine__cylinder", "wheels__front_wheel__tyre") and "<part>__<sub>" for parts
(e.g. "piston__crown", "piston__ring_top"). The website highlights by these names.

Categories (exact strings): electrical, powertrain, chassis, transmission, frame_body, wheels, wiring.

Usage:
    python3 runner.py <asset_id> [--draft] [--views side,threeq] [--no-glb]
Outputs:
    /home/claude/mc/assets/models/<asset_id>.glb
    /home/claude/mc/assets/renders/<asset_id>[_<view>].png   (transparent background)
"""
import sys, os, math, importlib.util, bpy, mathutils
sys.path.insert(0, '/home/claude/mc/render3d')
sys.path.insert(0, '/home/claude/mc/lib3d')
from lib3d import reset

ROOT = '/home/claude/mc/assets'
os.makedirs(ROOT + '/models', exist_ok=True); os.makedirs(ROOT + '/renders', exist_ok=True); os.makedirs(ROOT + '/drafts', exist_ok=True)

def load(asset):
    spec = importlib.util.spec_from_file_location(asset, f'/home/claude/mc/lib3d/parts/{asset}.py')
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

def scene_bounds():
    lo = mathutils.Vector((1e9, 1e9, 1e9)); hi = -lo
    dg = bpy.context.evaluated_depsgraph_get()
    for o in bpy.context.scene.objects:
        if o.type not in ('MESH', 'CURVE') or o.hide_render: continue
        oe = o.evaluated_get(dg)
        for c in oe.bound_box:
            w = oe.matrix_world @ mathutils.Vector(c)
            lo = mathutils.Vector(map(min, lo, w)); hi = mathutils.Vector(map(max, hi, w))
    return lo, hi

def lights(center, size, strength=1.0):
    w = bpy.data.worlds.new('w'); bpy.context.scene.world = w; w.use_nodes = True
    bg = w.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (0.95, 0.95, 0.95, 1); bg.inputs['Strength'].default_value = 0.55
    def area(d, e, s, col=(1, 1, 1)):
        loc = center + mathutils.Vector(d) * size
        bpy.ops.object.light_add(type='AREA', location=loc); L = bpy.context.active_object
        L.data.energy = e * size * size * strength; L.data.size = s * size; L.data.color = col
        L.rotation_euler = (center - loc).to_track_quat('-Z', 'Y').to_euler(); return L
    area((-1.2, -1.6, 1.8), 2.2, 1.6)
    area((1.8, -0.6, 0.9), 0.9, 1.2, (0.95, 0.97, 1.0))
    area((0.2, 1.8, 1.6), 1.8, 1.0)
    area((0, -2.4, 0.2), 0.35, 2.0)

def shadow_catcher(z):
    bpy.ops.mesh.primitive_plane_add(size=5000, location=(0, 0, z)); p = bpy.context.active_object
    p.is_shadow_catcher = True; p.name = '_shadowcatcher'; return p

def camera(center, size, az, el, lens, res):
    sc = bpy.context.scene
    d = size * 1.0 / math.tan(math.atan(18.0 / lens)) * 1.18
    a, e = math.radians(az), math.radians(el)
    # azimuth measured from -Y (camera on the left/-Y side when az=0), positive towards +X (front)
    off = mathutils.Vector((math.cos(e) * math.sin(a), -math.cos(e) * math.cos(a), math.sin(e)))
    loc = center + off * d
    bpy.ops.object.camera_add(location=loc); c = bpy.context.active_object
    c.rotation_euler = (center - loc).to_track_quat('-Z', 'Y').to_euler(); c.data.lens = lens
    sc.camera = c; sc.render.resolution_x, sc.render.resolution_y = res
    return c

def export_glb(path):
    # convert curves to meshes, apply modifiers, drop helpers, then export
    for o in list(bpy.context.scene.objects):
        if o.type == 'CURVE':
            bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
            bpy.ops.object.convert(target='MESH')
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.context.scene.objects:
        if o.type == 'MESH' and not o.hide_render and not o.name.startswith('_'):
            o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_apply=True,
                              export_yup=True, export_draco_mesh_compression_enable=False)

def main():
    args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
    asset = args[0]; draft = '--draft' in args; noglb = '--no-glb' in args
    views = None
    if '--views' in args: views = args[args.index('--views') + 1].split(',')
    sc = reset()
    sc.render.film_transparent = True
    sc.cycles.samples = 10 if draft else int(os.environ.get('SAMPLES', '48'))
    sc.view_settings.exposure = 0.0
    m = load(asset); meta = getattr(m, 'META', {})
    m.build()
    lo, hi = scene_bounds(); center = (lo + hi) / 2; size = (hi - lo).length / 2
    shadow_catcher(lo.z - 0.01)
    lights(center, size)
    kind = meta.get('kind', 'part')
    if views is None: views = ['side', 'threeq'] if kind == 'bike' else ['threeq']
    res = (1600, 1200) if kind == 'bike' else (1000, 800)
    if draft: res = (res[0] // 2, res[1] // 2)
    for v in views:
        if v == 'side': az, el = 0, 4
        elif v == 'front': az, el = 90, 6
        elif v == 'top': az, el = 0, 89
        else: az, el = meta.get('view', (-35, 18) if kind == 'part' else (40, 14))
        cam = camera(center, size * (0.82 if kind == 'bike' else 1.0), az, el, 60 if kind == 'part' else 50, res)
        out = f"{ROOT}/{'drafts' if draft else 'renders'}/{asset}{'' if len(views) == 1 else '_' + v}.png"
        sc.render.filepath = out; sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
        bpy.ops.render.render(write_still=True)
        bpy.data.objects.remove(cam)
        print('RENDERED', out)
    if not noglb and not draft:
        export_glb(f'{ROOT}/models/{asset}.glb'); print('GLB', asset)

main()
