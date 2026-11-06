/* ==========================================================================
   Moto Zero: Brand a bike (/brand/). Pick one of the eight bikes, add up to
   three logos as decals (three.js DecalGeometry) at preset spots or where the
   visitor taps, recolour the bodywork, download a PNG and send a branding
   request (Supabase storage + table, then a FormSubmit email).
   ========================================================================== */
import * as THREE from 'three';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { createViewer, webglOK } from './viewer3d.js';
import { BIKE_MODEL, MODES } from './content/assets-map.js';
import { MODE_INFO } from './content/parts.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './community-config.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MAX_LOGOS = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/svg+xml': 'svg', 'image/webp': 'webp' };
const EXT_TYPE = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml', webp: 'image/webp' };
const BUCKET = 'brand-requests';
const FORM_EMAIL = 'https://formsubmit.co/ajax/marcel@transitionslab.org';
const TEAM_EMAIL = 'marcel@transitionslab.org';
/* Real length of each bike in cm, to show logo sizes in centimetres. */
const REAL_LEN = { '4t': 205, '2t': 215, sc: 185, st: 190, bb: 200, cr: 205, sb: 205, vt: 220, pi: 180, elec: 200 };

/* Bodywork that takes the paint colour, and the frame that takes the frame colour. */
const BODY = /^frame_body__(fuel_tank|tank_cover|side_panels|side_covers|side_scoops|fairing|tail_unit|tail_cowl|leg_shield|front_shield|front_lower_cover|handlebar_cowl|front_mudguard|rear_mudguard|rear_hugger|radiator_shrouds|rear_body|rear_undercover|flyscreen)(__|$)/;
const FRAME = /^frame_body__(frame|subframe)(__|$)/;
const SKIP = /(filler|knee_pad|fastener|stay|bracket|flap|screen|mirror|glass|louvre|number_background|key_knob|glovebox|garnish|stripe|lock|inner_panel|mats|riser|piping|seam|grille|trim|hanger|bolt|plate)/;
const subOf = (n) => n.split('__').slice(2).join('__');
/* Nested GLB nodes carry a _1 suffix (frame_body__fuel_tank_1): compare names without it. */
const nm = (x) => (x.name || '').replace(/_\d+$/, '');
const comp2 = (x) => nm(x).split('__').slice(0, 2).join('__');

/* Preset spots. comps are tried in order; {s} becomes left or right. */
const SPOTS = [
  { key: 'tank_l', side: 'left', pair: 'tank_r', size: 18, comps: ['fuel_tank', 'tank_cover'], v: [0.62, 0.5, 0.74, 0.38] },
  { key: 'tank_r', side: 'right', pair: 'tank_l', size: 18, comps: ['fuel_tank', 'tank_cover'], v: [0.62, 0.5, 0.74, 0.38] },
  { key: 'panel_l', side: 'left', pair: 'panel_r', size: 16, comps: ['fairing__side_{s}', 'side_scoops__{s}', 'side_panels__{s}', 'side_covers__{s}', 'side_panels', 'radiator_shrouds__{s}', 'leg_shield'] },
  { key: 'panel_r', side: 'right', pair: 'panel_l', size: 16, comps: ['fairing__side_{s}', 'side_scoops__{s}', 'side_panels__{s}', 'side_covers__{s}', 'side_panels', 'radiator_shrouds__{s}', 'leg_shield'] },
  { key: 'mudguard', dir: 'mudguard', size: 9, comps: ['front_mudguard'] },
  { key: 'shield', dir: 'front', size: 20, comps: ['front_shield', 'leg_shield', 'fairing__upper'] },
  { key: 'tail_l', side: 'left', pair: 'tail_r', size: 14, comps: ['tail_unit', 'tail_cowl', 'rear_body', 'rear_mudguard'], u: [0.4, 0.55, 0.3, 0.7] },
  { key: 'tail_r', side: 'right', pair: 'tail_l', size: 14, comps: ['tail_unit', 'tail_cowl', 'rear_body', 'rear_mudguard'], u: [0.4, 0.55, 0.3, 0.7] },
  { key: 'rear', dir: 'mudguard', fx: -1, size: 10, comps: ['rear_mudguard', 'rear_hugger'] },
];
const NAMES = { fuel_tank: 'Tank', tank_cover: 'Tank', fairing: 'Fairing', side_scoops: 'Side scoop', side_panels: 'Side panel', side_covers: 'Side cover', radiator_shrouds: 'Shroud', leg_shield: 'Leg shield', front_mudguard: 'Front mudguard', front_shield: 'Front shield', tail_unit: 'Tail', tail_cowl: 'Tail', rear_body: 'Tail', rear_mudguard: 'Rear mudguard', rear_hugger: 'Rear hugger' };
const DEFAULT_SPOTS = [['tank_l', 'panel_l', 'shield'], ['panel_l', 'tail_l', 'tank_l'], ['tail_l', 'mudguard', 'rear', 'panel_l']];

const SCHEMES = [
  { name: 'Delivery orange', body: '#e8641b', frame: '#1a1a1a' },
  { name: 'Taxi yellow', body: '#f2c230', frame: '#1a1a1a' },
  { name: 'Fleet white', body: '#f2f2ef', frame: '#2a2a2a' },
  { name: 'Racing red', body: '#c8202a', frame: '#111111' },
  { name: 'Deep blue', body: '#1e3f8f', frame: '#c9ccd1' },
  { name: 'Green', body: '#1d6b55', frame: '#1a1a1a' },
  { name: 'Black', body: '#1f2023', frame: '#1f2023' },
];

const stage = $('mzb-stage');
const state = { mode: '4t', view: 'left', logos: [], active: null, placing: false, body: null, frame: null, loading: false };
let viewer = null, decals = null, info = null, nextId = 1, rebuildRaf = 0;

/* ---------- Bike picker ---------- */
const bikesEl = $('mzb-bikes');
bikesEl.innerHTML = MODES.map((m) => `<button type="button" role="radio" data-mode="${m}" aria-checked="${m === state.mode}">${esc(MODE_INFO[m].short)}<small>${esc(MODE_INFO[m].name)}</small></button>`).join('');
bikesEl.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-mode]');
  if (!b || state.loading || b.dataset.mode === state.mode) return;
  loadBike(b.dataset.mode);
});

/* ---------- Viewer ---------- */
const meshes = () => (viewer ? viewer.meshes() : []);
const solid = (m) => m.visible && m.material && !(m.material.transparent && m.material.opacity < 0.5);

if (!webglOK()) {
  stage.innerHTML = '<p class="mz3d-status">Your browser cannot show 3D here. Try another browser or device.</p>';
} else {
  viewer = createViewer(stage, { base: new URL('models/', import.meta.url).href, view: 'side' });
  decals = new THREE.Group();
  decals.name = 'brand_decals';
  viewer.scene.add(decals);
  setupTap();
  loadBike(state.mode);
}

async function loadBike(m) {
  state.mode = m;
  state.loading = true;
  state.placing = false;
  syncPlacing();
  bikesEl.querySelectorAll('button').forEach((b) => { b.setAttribute('aria-checked', String(b.dataset.mode === m)); b.disabled = true; });
  stage.dataset.ready = '0';
  clearDecals();
  const root = await viewer.load(BIKE_MODEL[m], { view: 'side' });
  state.loading = false;
  bikesEl.querySelectorAll('button').forEach((b) => { b.disabled = false; });
  if (!root || m !== state.mode) return;
  root.updateMatrixWorld(true);
  meshes().forEach((x) => {
    const mat = x.material;
    if (mat && mat.color) x.userData.mzbColor = mat.color.clone();
  });
  analyse();
  applyColours();
  state.logos.forEach((l, i) => { if (l.spot === 'custom' || !info.spots[l.spot]) l.spot = defaultSpot(i); });
  setView(state.view);
  rebuild();
  renderEditor();
  stage.dataset.bike = m;
  stage.dataset.ready = '1';
}

/* Work out the bike's size, which side is left, and where each preset spot is. */
function analyse() {
  const box = new THREE.Box3().setFromObject(viewer.root());
  const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
  const L = size.x;
  let leftSign = 1;
  const lefts = meshes().filter((x) => /__left$/.test(nm(x)));
  if (lefts.length) {
    const b = new THREE.Box3(); lefts.forEach((x) => b.expandByObject(x));
    leftSign = b.getCenter(new THREE.Vector3()).z >= center.z ? 1 : -1;
  }
  info = { box, size, center, L, leftSign, k: L / (REAL_LEN[state.mode] || 200), spots: {} };
  for (const spec of SPOTS) {
    const sp = findSpot(spec);
    if (sp) info.spots[spec.key] = sp;
  }
  fillSpotSelect();
}

const ray = new THREE.Raycaster();
function firstHit(origin, dir) {
  ray.set(origin, dir.clone().normalize());
  ray.near = 0; ray.far = Infinity;
  const hits = ray.intersectObjects(meshes().filter(solid), false);
  return hits[0] || null;
}
function worldNormal(hit, dir) {
  const n = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : dir.clone().negate();
  if (n.dot(dir) > 0) n.negate();
  return n.normalize();
}

function findSpot(spec) {
  const all = meshes();
  for (const c0 of spec.comps) {
    const comp = c0.replace('{s}', spec.side || '');
    const prefix = 'frame_body__' + comp;
    const ms = all.filter((x) => (nm(x) === prefix || nm(x).startsWith(prefix + '__')) && solid(x));
    if (!ms.length) continue;
    const box = new THREE.Box3(); ms.forEach((x) => box.expandByObject(x));
    const c = box.getCenter(new THREE.Vector3()), sz = box.getSize(new THREE.Vector3());
    const tries = [];
    const L = info.L;
    if (spec.side) {
      const s = spec.side === 'left' ? info.leftSign : -info.leftSign;
      for (const v of spec.v || [0.55, 0.45, 0.68, 0.35]) for (const u of spec.u || [0.5, 0.38, 0.62]) {
        const p = new THREE.Vector3(box.min.x + sz.x * u, box.min.y + sz.y * v, info.center.z + s * L);
        tries.push([p, new THREE.Vector3(0, 0, -s)]);
      }
    } else if (spec.dir === 'mudguard') {
      for (const a of [[0.75, 0.6], [0.9, 0.35], [0.5, 0.85], [0.2, 1]]) {
        const d = new THREE.Vector3(a[0] * (spec.fx || 1), a[1], 0).normalize();
        tries.push([c.clone().add(d.clone().multiplyScalar(L)), d.clone().negate(), c]);
      }
    } else {
      for (const v of [0.55, 0.7, 0.4]) {
        const p = new THREE.Vector3(info.center.x + L, box.min.y + sz.y * v, c.z);
        tries.push([p, new THREE.Vector3(-1, 0.08, 0)]);
      }
    }
    for (const [o, d] of tries) {
      const h = firstHit(o, d);
      if (!h || !(nm(h.object) === prefix || nm(h.object).startsWith(prefix + '__'))) continue;
      const base = comp.split('__')[0];
      let label = NAMES[base] || 'Bodywork';
      if (comp === 'fairing__upper') label = 'Fairing, front';
      if (spec.side) label += spec.side === 'left' ? ', left' : ', right';
      return { key: spec.key, label, point: h.point.clone(), normal: worldNormal(h, d), prefix, meshName: h.object.name, pair: spec.pair || null, size: spec.size };
    }
  }
  return null;
}

function defaultSpot(i) {
  const keys = DEFAULT_SPOTS[i % DEFAULT_SPOTS.length];
  return keys.find((k) => info && info.spots[k]) || (info && Object.keys(info.spots)[0]) || 'custom';
}

/* ---------- Decals ---------- */
function clearDecals() {
  if (!decals) return;
  decals.children.slice().forEach((d) => { decals.remove(d); d.geometry.dispose(); });
  stage.dataset.decals = '0';
}
function scheduleRebuild() {
  if (rebuildRaf) return;
  rebuildRaf = requestAnimationFrame(() => { rebuildRaf = 0; rebuild(); });
}
function placeOf(logo) {
  if (logo.spot === 'custom') return logo.custom || null;
  return info && info.spots[logo.spot] || null;
}
function twinOf(logo, place) {
  if (place.pair && info.spots[place.pair]) return info.spots[place.pair];
  if (!place.pair && logo.spot !== 'custom') return null; // centre spots (mudguard, front) have no twin
  // Reflect across the bike's centre plane, then find the surface there.
  const dz = place.point.z - info.center.z;
  if (Math.abs(dz) < info.L * 0.02) return null;
  const p = place.point.clone(); p.z = info.center.z - dz;
  const n = place.normal.clone(); n.z = -n.z;
  const h = firstHit(p.clone().add(n.clone().multiplyScalar(info.L * 0.15)), n.clone().negate());
  if (!h || h.point.distanceTo(p) > info.L * 0.08) return null;
  return { point: h.point.clone(), normal: worldNormal(h, n.clone().negate()), prefix: comp2(h.object), meshName: h.object.name };
}

function decalOn(logo, place, rotDeg) {
  const k = info.k;
  const cm = logo.size;
  const w = logo.aspect >= 1 ? cm : cm * logo.aspect;
  const h = logo.aspect >= 1 ? cm / logo.aspect : cm;
  const depth = Math.min(12, Math.max(4, Math.max(w, h) * 0.6)) * k;
  const dims = new THREE.Vector3(w * k, h * k, depth);
  const helper = new THREE.Object3D();
  helper.position.copy(place.point);
  if (Math.abs(place.normal.y) > 0.92) helper.up.set(1, 0, 0);
  helper.lookAt(place.point.clone().add(place.normal));
  helper.rotateZ(THREE.MathUtils.degToRad(rotDeg));
  helper.updateMatrixWorld();
  const reach = dims.length() / 2;
  const sphere = new THREE.Sphere(place.point, reach);
  const targets = meshes().filter((x) => solid(x) && (x.name === place.meshName || nm(x) === place.prefix || nm(x).startsWith(place.prefix + '__')));
  let n = 0;
  for (const t of targets) {
    if (!new THREE.Box3().setFromObject(t).intersectsSphere(sphere)) continue;
    const g = facing(new DecalGeometry(t, place.point, helper.rotation, dims), place.normal);
    if (!g) continue;
    const d = new THREE.Mesh(g, logo.material);
    d.renderOrder = 5;
    d.userData.logoId = logo.id;
    decals.add(d);
    n++;
  }
  return n;
}
/* DecalGeometry also paints faces that point away (the inside of a shell): drop them. */
function facing(g, n) {
  const pos = g.getAttribute('position'), nor = g.getAttribute('normal'), uv = g.getAttribute('uv');
  if (!pos || !pos.count) { g.dispose(); return null; }
  const P = [], N = [], U = [];
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    v.set(0, 0, 0);
    for (let j = 0; j < 3; j++) v.x += nor.getX(i + j), v.y += nor.getY(i + j), v.z += nor.getZ(i + j);
    if (v.normalize().dot(n) < 0.15) continue;
    for (let j = 0; j < 3; j++) {
      P.push(pos.getX(i + j), pos.getY(i + j), pos.getZ(i + j));
      N.push(nor.getX(i + j), nor.getY(i + j), nor.getZ(i + j));
      U.push(uv.getX(i + j), uv.getY(i + j));
    }
  }
  g.dispose();
  if (!P.length) return null;
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3));
  out.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
  return out;
}

function rebuild() {
  if (!viewer || !info) return;
  clearDecals();
  for (const logo of state.logos) {
    logo.shown = 0;
    const place = placeOf(logo);
    if (!place) continue;
    logo.shown += decalOn(logo, place, logo.rot);
    if (logo.mirror) {
      const twin = twinOf(logo, place);
      if (twin) logo.shown += decalOn(logo, twin, -logo.rot);
    }
  }
  stage.dataset.decals = String(decals.children.length);
  viewer.render();
  renderList();
}

/* ---------- Tap to place (or tap a logo to select it) ---------- */
function setupTap() {
  const canvas = stage.querySelector('canvas');
  let down = null;
  canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', (e) => {
    if (!down || !info) return;
    const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
    down = null;
    if (moved > 6) return;
    const r = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, viewer.camera);
    const logo = activeLogo();
    if (state.placing && logo) {
      const h = ray.intersectObjects(meshes().filter(solid), false)[0];
      if (!h) return;
      logo.spot = 'custom';
      logo.custom = { key: 'custom', label: 'Where you tapped', point: h.point.clone(), normal: worldNormal(h, ray.ray.direction), prefix: comp2(h.object), meshName: h.object.name, pair: null };
      state.placing = false;
      syncPlacing();
      rebuild();
      renderEditor();
      return;
    }
    const hd = ray.intersectObjects(decals.children, false)[0];
    if (hd) { state.active = hd.object.userData.logoId; renderList(); renderEditor(); }
  });
}
function syncPlacing() {
  const b = $('mzb-place');
  b.setAttribute('aria-pressed', String(state.placing));
  b.textContent = state.placing ? 'Tap the bike now (cancel)' : 'Tap the bike to place';
  $('mzb-tip').hidden = !state.placing;
  stage.classList.toggle('is-placing', state.placing);
}
$('mzb-place').addEventListener('click', () => { if (!activeLogo()) return; state.placing = !state.placing; syncPlacing(); });

/* ---------- Logos ---------- */
const activeLogo = () => state.logos.find((l) => l.id === state.active) || null;
const fileErr = $('mzb-file-err');
function showFileErr(msg) { fileErr.textContent = msg; fileErr.hidden = !msg; }

$('mzb-file').addEventListener('change', async (e) => {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (f) await addLogoFile(f);
});
$('mzb-sample').addEventListener('click', async () => {
  try {
    const res = await fetch(new URL('brand-sample-logo.svg', import.meta.url));
    const blob = await res.blob();
    await addLogoFile(new File([blob], 'sample-logo.svg', { type: 'image/svg+xml' }));
  } catch (err) { showFileErr('Could not load the sample logo.'); }
});

async function addLogoFile(file) {
  showFileErr('');
  if (state.logos.length >= MAX_LOGOS) { showFileErr('You can add up to 3 logos. Remove one first.'); return; }
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const type = TYPES[file.type] ? file.type : EXT_TYPE[ext];
  if (!type) { showFileErr('Please choose a PNG, JPG, SVG or WebP file.'); return; }
  if (file.size > MAX_BYTES) { showFileErr('That file is larger than 5 MB. Please choose a smaller file.'); return; }
  let img, url;
  try {
    url = await readFile(file, type);
    img = await loadImage(url);
  } catch (err) { showFileErr('Could not read that image. Please try another file.'); return; }
  const w0 = img.naturalWidth || 512, h0 = img.naturalHeight || 512;
  const s = 1024 / Math.max(w0, h0);
  const cv = document.createElement('canvas');
  cv.width = Math.max(2, Math.round(w0 * s)); cv.height = Math.max(2, Math.round(h0 * s));
  cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = viewer ? viewer.renderer.capabilities.getMaxAnisotropy() : 1;
  const material = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.03, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, roughness: 0.42, metalness: 0 });
  const i = state.logos.length;
  const logo = { id: nextId++, name: file.name, file, type, ext: TYPES[type], thumb: url, aspect: cv.width / cv.height, material, spot: defaultSpot(i), custom: null, size: 18, rot: 0, mirror: true, shown: 0 };
  const sp = info && info.spots[logo.spot];
  if (sp) logo.size = sp.size;
  state.logos.push(logo);
  state.active = logo.id;
  rebuild();
  renderEditor();
}
function readFile(file, type) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onerror = () => rej(r.error);
    if (type === 'image/svg+xml') {
      r.onload = () => {
        let t = String(r.result);
        // SVGs without width and height draw at 0 or 150 px: give them their viewBox size.
        const tag = t.match(/<svg\b[^>]*>/i);
        if (tag && !/\swidth=/.test(tag[0]) && !/\sheight=/.test(tag[0])) {
          const vb = tag[0].match(/viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
          const W = vb ? +vb[1] : 512, H = vb ? +vb[2] : 512, f = 1024 / Math.max(W, H);
          t = t.replace(/<svg\b/i, `<svg width="${Math.round(W * f)}" height="${Math.round(H * f)}"`);
        }
        res('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t));
      };
      r.readAsText(file);
    } else {
      r.onload = () => res(String(r.result));
      r.readAsDataURL(file);
    }
  });
}
function loadImage(src) {
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}
function removeLogo(id) {
  const i = state.logos.findIndex((l) => l.id === id);
  if (i < 0) return;
  const [l] = state.logos.splice(i, 1);
  l.material.map.dispose(); l.material.dispose();
  state.active = state.logos.length ? state.logos[Math.min(i, state.logos.length - 1)].id : null;
  state.placing = false; syncPlacing();
  rebuild();
  renderEditor();
}

const listEl = $('mzb-logos');
function spotLabel(l) {
  const p = placeOf(l);
  if (!p) return 'Not placed';
  return l.spot === 'custom' ? 'Where you tapped' : p.label;
}
function renderList() {
  listEl.innerHTML = state.logos.map((l) => `<li><button type="button" data-id="${l.id}" aria-pressed="${l.id === state.active}"><img src="${esc(l.thumb)}" alt=""><span>${esc(l.name)}</span><em>${esc(spotLabel(l))}</em></button></li>`).join('');
  const n = state.logos.length;
  $('mzb-sample').hidden = n >= MAX_LOGOS;
  $('mzb-file').disabled = n >= MAX_LOGOS;
  const first = state.logos[0];
  $('mzb-attach').textContent = !first ? 'No logo added yet. You can still send a request; the picture of the bike is attached.'
    : `Attached: ${first.name}${n > 1 ? ' (the first of your logos)' : ''} and the picture of the bike.`;
}
listEl.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-id]');
  if (!b) return;
  state.active = +b.dataset.id;
  state.placing = false; syncPlacing();
  renderList(); renderEditor();
});

const spotSel = $('mzb-spot');
function fillSpotSelect() {
  const keys = SPOTS.map((s) => s.key).filter((k) => info.spots[k]);
  spotSel.innerHTML = keys.map((k) => `<option value="${k}">${esc(info.spots[k].label)}</option>`).join('') + '<option value="custom">Where you tapped</option>';
}
function renderEditor() {
  const l = activeLogo();
  $('mzb-edit').hidden = !l;
  renderList();
  if (!l) return;
  spotSel.value = l.spot;
  spotSel.querySelector('option[value="custom"]').disabled = !l.custom;
  $('mzb-size').value = l.size; $('mzb-size-out').textContent = `${l.size} cm`;
  $('mzb-rot').value = l.rot; $('mzb-rot-out').textContent = `${l.rot}°`;
  const p = placeOf(l);
  const canMirror = !!p && (l.spot === 'custom' || !!p.pair);
  $('mzb-mirror').checked = l.mirror && canMirror;
  $('mzb-mirror').disabled = !canMirror;
}
spotSel.addEventListener('change', () => {
  const l = activeLogo(); if (!l) return;
  l.spot = spotSel.value;
  const sp = info.spots[l.spot];
  if (sp) l.size = sp.size;
  rebuild(); renderEditor();
});
$('mzb-size').addEventListener('input', (e) => { const l = activeLogo(); if (!l) return; l.size = +e.target.value; $('mzb-size-out').textContent = `${l.size} cm`; scheduleRebuild(); });
$('mzb-rot').addEventListener('input', (e) => { const l = activeLogo(); if (!l) return; l.rot = +e.target.value; $('mzb-rot-out').textContent = `${l.rot}°`; scheduleRebuild(); });
$('mzb-mirror').addEventListener('change', (e) => { const l = activeLogo(); if (!l) return; l.mirror = e.target.checked; rebuild(); });
$('mzb-remove').addEventListener('click', () => { if (state.active != null) removeLogo(state.active); });

/* ---------- Colours ---------- */
function applyColours() {
  for (const m of meshes()) {
    const mat = m.material, orig = m.userData.mzbColor;
    if (!mat || !mat.color || !orig) continue;
    const n = nm(m), sub = subOf(n);
    let c = null;
    if (BODY.test(n) && !SKIP.test(sub)) c = state.body;
    else if (FRAME.test(n) && !SKIP.test(sub)) c = state.frame;
    if (c) mat.color.set(c); else mat.color.copy(orig);
  }
  if (viewer) viewer.render();
  stage.dataset.body = state.body || '';
}
$('mzb-schemes').innerHTML = SCHEMES.map((s, i) => `<button type="button" data-i="${i}"><i style="background:${s.body}"></i><i style="background:${s.frame}"></i>${esc(s.name)}</button>`).join('');
$('mzb-schemes').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-i]'); if (!b) return;
  const s = SCHEMES[+b.dataset.i];
  state.body = s.body; state.frame = s.frame;
  $('mzb-body').value = s.body; $('mzb-frame').value = s.frame;
  applyColours();
});
$('mzb-body').addEventListener('input', (e) => { state.body = e.target.value; applyColours(); });
$('mzb-frame').addEventListener('input', (e) => { state.frame = e.target.value; applyColours(); });
$('mzb-reset').addEventListener('click', () => { state.body = null; state.frame = null; $('mzb-body').value = '#c2502a'; $('mzb-frame').value = '#0a0a0a'; applyColours(); });

/* ---------- Camera and background ---------- */
function setView(v) {
  state.view = v;
  document.querySelectorAll('.mzb-viewbar [data-view]').forEach((b) => b.classList.toggle('is-on', b.dataset.view === v));
  if (!viewer || !viewer.root()) return;
  viewer.view(v === 'left' || v === 'right' ? 'side' : v);
  const cam = viewer.camera, t = viewer.controls.target;
  const leftSign = info ? info.leftSign : 1;
  if (v === 'threeq') cam.position.x = 2 * t.x - cam.position.x; // from the front, not the rear
  if (v !== 'front') {
    const want = v === 'right' ? -leftSign : leftSign;
    if (Math.sign(cam.position.z - t.z) !== want) cam.position.z = 2 * t.z - cam.position.z;
  }
  viewer.controls.update();
  viewer.render();
}
document.querySelectorAll('.mzb-viewbar [data-view]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
document.querySelectorAll('.mzb-viewbar [data-bg]').forEach((b) => b.addEventListener('click', () => {
  const dark = b.dataset.bg === 'dark';
  stage.classList.toggle('is-dark', dark); stage.classList.toggle('is-light', !dark);
  document.querySelectorAll('.mzb-viewbar [data-bg]').forEach((x) => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
}));

/* ---------- Picture ---------- */
/* Render once at a higher pixel ratio and read the canvas in the same frame. */
function snapshot(scale, bg) {
  if (!viewer || !viewer.root()) return null;
  const r = viewer.renderer, sc = viewer.scene;
  const pr = r.getPixelRatio(), sz = r.getSize(new THREE.Vector2());
  const prevBg = sc.background;
  sc.background = bg === 'white' ? new THREE.Color(0xffffff) : null;
  r.setPixelRatio(scale);
  r.setSize(sz.x, sz.y, false);
  r.render(sc, viewer.camera);
  const url = r.domElement.toDataURL('image/png');
  sc.background = prevBg;
  r.setPixelRatio(pr);
  r.setSize(sz.x, sz.y, false);
  viewer.render();
  return url;
}
function dataURLBlob(url) {
  const [head, b64] = url.split(',');
  const bin = atob(b64), arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: head.slice(5).split(';')[0] });
}
const shotBg = () => (document.querySelector('input[name="mzb-shot-bg"]:checked') || {}).value || 'white';
/* A real link with a download attribute, so gate.js can ask visitors who are not signed in to make an account first. */
$('mzb-download').addEventListener('click', (e) => {
  e.preventDefault();
  const url = snapshot(2, shotBg());
  if (!url) return;
  const href = URL.createObjectURL(dataURLBlob(url));
  const a = document.createElement('a');
  a.href = href;
  a.download = `moto-zero-${BIKE_MODEL[state.mode].replace('bike_', '').replace(/_/g, '-')}-brand.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 10000);
});

/* ---------- Advertise with us ---------- */
const form = $('mzb-form');
const msg = $('mzb-form-msg');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function say(kind, html) { msg.className = `mzb-msg is-${kind}`; msg.innerHTML = html; msg.hidden = false; }
function fieldErr(el, text) {
  const wrap = el.closest('.mzb-field');
  let span = wrap && wrap.querySelector('.mzb-err');
  if (wrap && !span && text) { span = document.createElement('span'); span.className = 'mzb-err'; span.id = 'err-' + el.name; wrap.appendChild(span); }
  if (span) { span.textContent = text || ''; span.hidden = !text; }
  el.setAttribute('aria-invalid', String(!!text));
  if (text && span) el.setAttribute('aria-describedby', span.id); else el.removeAttribute('aria-describedby');
}
function validate() {
  const f = form.elements;
  const errs = [];
  const need = { company: 'Please enter your company or group.', name: 'Please enter your name.', country: 'Please enter your country.' };
  for (const k of ['company', 'name', 'email', 'country']) {
    const v = f[k].value.trim();
    let t = '';
    if (!v) t = need[k] || 'Please enter your email.';
    else if (k === 'email' && !EMAIL.test(v)) t = 'Please enter a valid email address, like name@example.com.';
    fieldErr(f[k], t);
    if (t) errs.push(f[k]);
  }
  const consent = f.consent;
  consent.closest('.mzb-check').classList.toggle('is-invalid', !consent.checked);
  if (!consent.checked) errs.push(consent);
  return errs;
}
form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') validate(); });
form.addEventListener('change', (e) => { if (e.target.name === 'consent') e.target.closest('.mzb-check').classList.toggle('is-invalid', !e.target.checked); });

const pub = (path) => `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
async function upload(path, blob, type) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, { method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': type, 'x-upsert': 'false' }, body: blob });
  if (!res.ok) throw new Error(`file upload failed (${res.status})`);
}
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errs = validate();
  if (errs.length) {
    say('err', 'Please fill in the marked fields' + (form.elements.consent.checked ? '.' : ' and tick the consent box.'));
    errs[0].focus();
    return;
  }
  const f = form.elements;
  const data = { company: f.company.value.trim(), name: f.name.value.trim(), email: f.email.value.trim(), country: f.country.value.trim(), fleet: f.fleet.value, message: f.message.value.trim() };
  const btn = $('mzb-submit');
  btn.disabled = true;
  say('busy', 'Sending your request…');
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('requests are not set up yet');
    const id = uuid();
    let shot = snapshot(1.5, 'white');
    if (shot && shot.length * 0.75 > MAX_BYTES * 0.95) shot = snapshot(1, 'white');
    const logo = state.logos[0] || null;
    const logo_path = logo ? `${id}/logo.${logo.ext}` : null;
    const preview_path = shot ? `${id}/preview.png` : null;
    if (logo) await upload(logo_path, logo.file, logo.type);
    if (shot) await upload(preview_path, dataURLBlob(shot), 'image/png');
    const row = { id, ...data, fleet: data.fleet || null, message: data.message || null, logo_path, preview_path, consent: true };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${'brand_requests'}`, { method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) });
    if (!res.ok) throw new Error(`saving the request failed (${res.status})`);
    const mail = {
      _subject: `Brand request: ${data.company}`, _template: 'table', _replyto: data.email,
      request_id: id, ...data,
      bike: MODE_INFO[state.mode].name,
      bodywork_colour: state.body || 'original', frame_colour: state.frame || 'original',
      logos: state.logos.map((l) => `${l.name} (${spotLabel(l)}, ${l.size} cm)`).join('; ') || 'none',
      logo_url: logo_path ? pub(logo_path) : '', preview_url: preview_path ? pub(preview_path) : '',
    };
    // The request is saved; the email is a copy for the team, so a failure here is not shown as an error.
    try {
      await fetch(FORM_EMAIL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(mail) });
    } catch (err) { /* stored in Supabase all the same */ }
    say('ok', `Thank you, ${esc(data.name)}. We have your request and reply to ${esc(data.email)} within a few working days.`);
    form.reset();
  } catch (err) {
    say('err', `Sorry, your request could not be sent: ${esc(err.message)}. Your details are still here, so please try again. Or email <a href="mailto:${TEAM_EMAIL}">${TEAM_EMAIL}</a>.`);
  } finally {
    btn.disabled = false;
  }
});

renderList();
