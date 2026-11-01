/* ==========================================================================
   Moto Zero — shared three.js GLB viewer
   Based on the reference implementation in assets/interactive/viewer.html.
   Models are meshopt-compressed GLBs in assets/models/<name>.glb whose mesh
   names follow <category>__<component>[__sub] (bikes) or <part>__<sub> (parts).
   Pages must declare an importmap for "three" and "three/addons/".
   ========================================================================== */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const HL = new THREE.Color('#C8502A');
const CAT = new THREE.Color('#E07A4F');
const BLACK = new THREE.Color(0);
/* Keep at most a few parsed models in memory; old ones are released. */
const cache = new Map();
const CACHE_MAX = 3;
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);

export function webglOK() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
}

/* Rendered stills (assets/renders/*.webp) — bikes use their side view */
export const renderFor = (base, name) => `${base}${name.startsWith('bike_') ? name + '_side' : name}.webp`;

export const humanize = (s) => s.replace(/(\d{2,}|\.\d+)(?=$|\s|_)/g, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b12v\b/i, '12 V').replace(/\bhv\b/i, 'HV').replace(/\bdc dc\b/i, 'DC-DC').replace(/\btft\b/i, 'TFT').replace(/\bcdi\b/i, 'CDI').replace(/\blv\b/i, 'LV').replace(/^./, (c) => c.toUpperCase());

function loadGLB(url) {
  if (!cache.has(url)) {
    cache.set(url, new Promise((res, rej) => loader.load(url, res, undefined, rej)));
    while (cache.size > CACHE_MAX) {
      const [k, pr] = cache.entries().next().value;
      cache.delete(k);
      pr.then((g) => disposeTree(g.scene)).catch(() => {});
    }
  } else { const v = cache.get(url); cache.delete(url); cache.set(url, v); }
  return cache.get(url).then((g) => g.scene.clone(true));
}

function disposeTree(obj) {
  obj.traverse((m) => {
    if (m.geometry) m.geometry.dispose();
    const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
    mats.forEach((mat) => { for (const k in mat) { const v = mat[k]; if (v && v.isTexture) v.dispose(); } mat.dispose(); });
  });
}

/**
 * createViewer(el, opts)
 *  opts.base      — folder with GLBs (default 'assets/models/')
 *  opts.onPick(mesh|null, name)   — click on a mesh
 *  opts.onHover(mesh|null, name, event)
 *  opts.view      — 'side' | 'threeq' camera preset
 *  opts.autoRotate
 */
export function createViewer(el, opts = {}) {
  const base = opts.base || 'assets/models/';
  const canvas = document.createElement('canvas');
  canvas.className = 'mz3d-canvas';
  canvas.setAttribute('aria-label', '3D model: drag to orbit, scroll or pinch to zoom');
  el.appendChild(canvas);
  const status = document.createElement('div');
  status.className = 'mz3d-status';
  status.textContent = 'Loading 3D model…';
  el.appendChild(status);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(3, 5, 4); scene.add(key);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = !!opts.autoRotate;
  controls.autoRotateSpeed = 0.8;
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.035, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  scene.add(shadow);

  let root = null, meshes = [], dirty = true, visible = true, raf = 0, disposed = false;
  let picked = null, hovered = null, category = null, highlightFn = null, wheels = [];
  const api = { el, scene, camera, controls, renderer, meshes: () => meshes, root: () => root };

  function resize() {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    dirty = true; loop();
  }
  const ro = new ResizeObserver(resize); ro.observe(el);
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) loop(); }, { rootMargin: '100px' });
  io.observe(el);
  controls.addEventListener('change', () => { dirty = true; loop(); });
  controls.addEventListener('start', () => loop());

  /* Highlight model: a picked part or highlighted set glows orange and everything
     else turns to faint glass (x-ray), so hidden inner parts such as brake pads,
     pistons or valves can be seen. A category fades all other systems. */
  function paint() {
    const focus = !!(picked || highlightFn);
    for (const m of meshes) {
      const n = m.name;
      const isPick = picked && (picked === m);
      const isHl = highlightFn ? highlightFn(n, m) : false;
      const on = isPick || isHl;
      const inCat = category ? n.startsWith(category + '__') : true;
      const mat = m.material;
      if (mat.emissive) {
        mat.emissive.copy(on ? HL : (category && inCat ? CAT : BLACK));
        mat.emissiveIntensity = on ? 0.75 : (category && inCat ? 0.25 : 0);
      }
      let fade = 1;
      if (focus && !on) fade = 0.07;
      else if (category && !inCat && !on) fade = 0.14;
      const faded = fade < 1;
      mat.transparent = faded || m.userData.origTransparent;
      mat.opacity = faded ? fade : m.userData.origOpacity;
      mat.depthWrite = !faded && m.userData.origDepthWrite;
      m.renderOrder = on ? 2 : 0;
    }
    dirty = true; loop();
  }

  function frame(dist, view) {
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const d = dist || size.length() * (view === 'side' ? 1.02 : 1.45);
    // Bikes are modelled along X; side view looks along Z.
    const dir = view === 'side' ? new THREE.Vector3(0, 0.12, 1) : view === 'front' ? new THREE.Vector3(1, 0.25, 0.2) : new THREE.Vector3(-0.62, 0.34, 0.85);
    camera.position.copy(c).add(dir.normalize().multiplyScalar(d));
    camera.near = d / 100; camera.far = d * 20; camera.updateProjectionMatrix();
    controls.target.copy(c); controls.update();
    shadow.position.set(c.x, box.min.y + 0.001, c.z);
    shadow.scale.setScalar(Math.max(size.x, size.z) * 0.62);
    dirty = true; loop();
  }

  /* Spinning groups. Each spec: { prefixes, axis: 'thin'|'long', centerFrom?: prefix, rate?: number }.
     The pivot sits at the centre of the group (or of the centerFrom meshes) and turns
     about the group's thinnest or longest dimension. */
  function setupWheels(groups) {
    wheels = [];
    if (!groups) return;
    for (const g of groups) {
      const ms = meshes.filter((m) => g.prefixes.some((p) => m.name.startsWith(p)));
      if (!ms.length) continue;
      const ref = g.centerFrom ? meshes.filter((m) => m.name.startsWith(g.centerFrom)) : ms;
      const box = new THREE.Box3();
      (ref.length ? ref : ms).forEach((m) => box.expandByObject(m));
      const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
      const dims = [['x', size.x], ['y', size.y], ['z', size.z]].sort((a, b) => a[1] - b[1]);
      const axis = g.axis === 'long' ? dims[2][0] : dims[0][0];
      const pivot = new THREE.Group();
      pivot.position.copy(c);
      root.add(pivot);
      pivot.updateMatrixWorld();
      const spinners = ms.filter((m) => !g.static || !g.static.some((s) => m.name.startsWith(s)));
      spinners.forEach((m) => pivot.attach(m));
      wheels.push({ pivot, axis, rate: g.rate || 1 });
    }
  }

  const poster = document.createElement('img');
  poster.className = 'mz3d-poster';
  poster.alt = '';
  poster.hidden = true;
  el.appendChild(poster);
  api.load = async function load(name, o = {}) {
    status.textContent = 'Loading 3D model…';
    status.hidden = false;
    const psrc = opts.poster ? opts.poster(name) : null;
    if (psrc) { poster.src = psrc; poster.hidden = false; poster.onerror = () => { poster.hidden = true; }; }
    let obj;
    try { obj = await loadGLB(base + name + '.glb'); } catch (e) { status.textContent = `Could not load ${name}.glb`; return null; }
    if (disposed) return null;
    if (root) { scene.remove(root); root.traverse((m) => { if (m.isMesh && m.material) m.material.dispose(); }); }
    root = obj;
    scene.add(root);
    meshes = [];
    root.traverse((m) => {
      if (!m.isMesh) return;
      m.material = m.material.clone();
      // Transmission (glass) forces a second render pass every frame: use plain transparency instead.
      if (m.material.transmission) { m.material.transmission = 0; m.material.transparent = true; m.material.opacity = Math.min(m.material.opacity, 0.35); }
      m.userData.origOpacity = m.material.opacity;
      m.userData.origTransparent = m.material.transparent;
      m.userData.origDepthWrite = m.material.depthWrite;
      if (!m.name && m.parent) m.name = m.parent.name;
      meshes.push(m);
    });
    picked = null;
    frame(o.dist, o.view || opts.view);
    setupWheels(o.wheels || (opts.spin ? opts.spin(name) : null));
    paint();
    status.hidden = true;
    poster.hidden = true;
    resize();
    loop();
    return root;
  };

  api.setCategory = (c) => { category = c && c !== 'all' ? c : null; paint(); };
  api.setHighlight = (fn) => { highlightFn = fn; paint(); };
  api.pick = (mesh) => { picked = mesh; paint(); };
  api.view = (v) => { if (root) frame(null, v); };
  api.focus = (pred) => {
    const ms = meshes.filter((m) => pred(m.name));
    if (!ms.length) return;
    const box = new THREE.Box3();
    ms.forEach((m) => box.expandByObject(m));
    const c = box.getCenter(new THREE.Vector3());
    const d = Math.max(box.getSize(new THREE.Vector3()).length() * 2.2, 0.35);
    const dir = camera.position.clone().sub(controls.target).normalize();
    controls.target.copy(c);
    camera.position.copy(c).add(dir.multiplyScalar(d));
    controls.update();
    dirty = true; loop();
  };
  api.spin = (deg) => {
    if (!wheels.length || !deg) return;
    for (const w of wheels) w.pivot.rotation[w.axis] -= deg * w.rate * Math.PI / 180;
    dirty = true; loop();
  };
  api.render = () => { dirty = true; loop(); };

  // Picking
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function hit(ev) {
    if (!root) return null;
    const r = canvas.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(meshes, false).filter((h) => !(category && !h.object.name.startsWith(category + '__')) || true);
    const visibleHit = hits.find((h) => h.object.material.opacity > 0.5) || hits[0];
    return visibleHit ? visibleHit.object : null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', (e) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
    down = null;
    if (moved > 5) return;
    const m = hit(e);
    if (opts.onPick) opts.onPick(m, m ? m.name : null);
  });
  let lastMove = 0;
  canvas.addEventListener('pointermove', (e) => {
    if (!opts.onHover || e.buttons) return;
    const now = performance.now();
    if (now - lastMove < 40) return;
    lastMove = now;
    const m = hit(e);
    if (m !== hovered) { hovered = m; canvas.style.cursor = m ? 'pointer' : 'grab'; }
    opts.onHover(m, m ? m.name : null, e);
  });
  canvas.addEventListener('pointerleave', () => { hovered = null; if (opts.onHover) opts.onHover(null, null); });

  let idle = 0;
  function loop() {
    idle = 0;
    if (raf || disposed) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (disposed || !visible) return;
      const changed = controls.update();
      if (dirty || changed || controls.autoRotate) { renderer.render(scene, camera); dirty = false; idle = 0; }
      else idle++;
      if (idle < 45 || controls.autoRotate) loop(); // sleep when nothing moves; woken by input or changes

    });
  }

  api.dispose = () => {
    disposed = true;
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    controls.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
    el.innerHTML = '';
  };
  resize();
  loop();
  return api;
}
