"""Assemble the website package: /home/claude/mc/web-package (+ zip)."""
import os, re, shutil, glob, subprocess, json
R = '/home/claude/mc'; P = f'{R}/web-package'
shutil.rmtree(P, ignore_errors=True)
def cp(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy2(src, dst)

FIGCAT = {'F01': 'overview', 'F02': 'overview', 'F03': 'overview', 'F04': 'overview', 'F05': 'controls', 'F06': 'overview',
          'F07': 'powertrain', 'F08': 'powertrain', 'F09': 'powertrain', 'F10': 'powertrain', 'F11': 'powertrain', 'F12': 'powertrain',
          'F13': 'transmission', 'F14': 'transmission', 'F15': 'transmission', 'F16': 'transmission',
          'F17': 'chassis', 'F18': 'chassis', 'F19': 'chassis', 'F20': 'wheels',
          'F21': 'wiring', 'F22': 'wiring', 'F23': 'wiring', 'F24': 'electrical', 'F25': 'electrical', 'F26': 'electrical'}
WEBCAT = {'W01': 'wheels', 'W02': 'wheels', 'FB01': 'frame_body', 'FB02': 'frame_body', 'EL01': 'electrical', 'EL02': 'electrical',
          'WR01': 'wiring', 'PT01': 'powertrain', 'PT02': 'powertrain', 'PT03': 'powertrain', 'TR01': 'transmission', 'TR02': 'transmission'}
rows = []
def title_of(svg):
    m = re.search(r'<title>(.*?)</title>', open(svg, encoding='utf8').read(), re.S); return (m.group(1).strip() if m else '').replace('\n', ' ')

# PDFs and page
for f in sorted(glob.glob(f'{R}/out/motopedia-module-*.pdf')):
    cp(f, f'{P}/pdf/{os.path.basename(f)}'); rows.append(('pdf', 'course', os.path.basename(f), 'Course module PDF'))
cp(f'{R}/out/motopedia-all-modules.zip', f'{P}/pdf/motopedia-all-modules.zip')
cp(f'{R}/web/moto-zero.md', f'{P}/pages/moto-zero.md')
# brand
for f in glob.glob(f'{R}/brand/*.svg') + glob.glob(f'{R}/brand/*.png'):
    cp(f, f'{P}/brand/{os.path.basename(f)}'); rows.append(('brand', 'brand', os.path.basename(f), 'Logo'))
# course plates
for f in sorted(glob.glob(f'{R}/figs/F*.svg')):
    fid = os.path.basename(f)[:3]; cat = FIGCAT.get(fid, 'other')
    cp(f, f'{P}/illustrations/{cat}/{os.path.basename(f)}')
    pv = f'{R}/figs/preview/{fid}.png'
    if os.path.exists(pv): cp(pv, f'{P}/illustrations/{cat}/png/{fid}.png')
    rows.append(('svg', cat, f'illustrations/{cat}/{os.path.basename(f)}', title_of(f)))
# web plates and layered bikes
for f in sorted(glob.glob(f'{R}/figs/web/*.svg')):
    b = os.path.basename(f); fid = b.split('.')[0].split('-')[0]
    cat = WEBCAT.get(fid, 'overview' if fid in FIGCAT else 'other')
    cp(f, f'{P}/illustrations/{cat}/{b}')
    pv = f'{R}/figs/web/preview/{b[:-4]}.png'
    if os.path.exists(pv): cp(pv, f'{P}/illustrations/{cat}/png/{b[:-4]}.png')
    rows.append(('svg', cat, f'illustrations/{cat}/{b}', title_of(f)))
# 3D assets
for mod in sorted(glob.glob(f'{R}/lib3d/parts/[!_]*.py')):
    aid = os.path.basename(mod)[:-3]; src = open(mod, encoding='utf8').read()
    m = re.search(r'META\s*=\s*(\{.*?\})', src, re.S)
    meta = {}
    if m:
        try: meta = eval(m.group(1))
        except Exception: pass
    cat = meta.get('category', 'other'); kind = meta.get('kind', 'part'); title = meta.get('title', aid)
    if kind == 'bike': cat = 'bikes'
    g = f'{R}/assets/models/{aid}.glb'
    if os.path.exists(g): cp(g, f'{P}/models/{cat}/{aid}.glb'); rows.append(('glb', cat, f'models/{cat}/{aid}.glb', title))
    gw = f'{R}/assets/models_web/{aid}.glb'
    if os.path.exists(gw): cp(gw, f'{P}/models-compressed/{aid}.glb')
    for png in sorted(glob.glob(f'{R}/assets/renders/{aid}.png') + glob.glob(f'{R}/assets/renders/{aid}_*.png')):
        cp(png, f'{P}/renders/{cat}/{os.path.basename(png)}'); rows.append(('png', cat, f'renders/{cat}/{os.path.basename(png)}', title))
    cp(mod, f'{P}/source/3d/{os.path.basename(mod)}')
for f in glob.glob(f'{R}/lib3d/parts/_bikekit.py') + [f'{R}/lib3d/runner.py', f'{R}/render3d/lib3d.py']:
    if os.path.exists(f): cp(f, f'{P}/source/3d/{os.path.basename(f)}')
# course photo renders
for f in sorted(glob.glob(f'{R}/photos/render-*.jpg')):
    cp(f, f'{P}/renders/course/{os.path.basename(f)}'); rows.append(('jpg', 'course', f'renders/course/{os.path.basename(f)}', 'Course render'))
# viewer
cp(f'{R}/web/viewer/viewer.html', f'{P}/interactive/viewer.html'); rows.append(('html', 'controls', 'interactive/viewer.html', 'Reference three.js viewer with category and part highlighting'))
# interactive
for f in glob.glob(f'{R}/web/controls/*'):
    if f.endswith(('.html', '.svg')): cp(f, f'{P}/interactive/{os.path.basename(f)}'); rows.append(('html' if f.endswith('html') else 'svg', 'controls', f'interactive/{os.path.basename(f)}', 'Interactive controls'))

# manifest
cats = ['bikes', 'overview', 'powertrain', 'transmission', 'chassis', 'frame_body', 'wheels', 'electrical', 'wiring', 'controls', 'brand', 'course']
out = ['# Motopedia: website asset package', '',
       'Every file for the Transitions Lab motorcycle anatomy pages, grouped by category. Text, illustrations, 3D models and renders are CC BY-SA 4.0 (Transitions Lab); photographs from the Transitions Lab collection are excluded from that licence.', '',
       '**Folders.** `pdf/` course modules · `pages/` download-page Markdown · `illustrations/<category>/` SVG plates (layered files carry `data-part` and `data-category` on each component group; `png/` holds previews) · `models/<category>/` GLB files for three.js, `models-compressed/` the same files with meshopt compression (about a quarter of the size; load with three.js GLTFLoader plus MeshoptDecoder, as in `interactive/viewer.html`) (object names follow `<category>__<component>` on bikes and `<part>__<subpart>` on parts, so click-to-highlight can match by name) · `renders/<category>/` transparent PNG renders of the same models · `interactive/` the controls simulator · `brand/` logo · `source/3d/` the Blender scripts that generate every model.', '']
for c in cats:
    rs = [r for r in rows if r[1] == c]
    if not rs: continue
    out += [f'## {c.replace("_", " ").title()}', '', '| Type | File | Description |', '|---|---|---|']
    out += [f'| {r[0].upper()} | `{r[2]}` | {r[3]} |' for r in rs]
    out.append('')
rest = [r for r in rows if r[1] not in cats]
if rest:
    out += ['## Other', '', '| Type | File | Description |', '|---|---|---|'] + [f'| {r[0].upper()} | `{r[2]}` | {r[3]} |' for r in rest]
open(f'{P}/README.md', 'w').write('\n'.join(out) + '\n')
subprocess.run(f'cd {R} && rm -f moto-zero-web-package.zip && zip -q -r moto-zero-web-package.zip web-package', shell=True)
print(len(rows), 'files;', subprocess.check_output(['du', '-sh', P]).decode().split()[0])
