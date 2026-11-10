/* ==========================================================================
   Motopedia — shared three.js GLB viewer
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
export const renderFor = (base, name) => `${base}${name.startsWith('bike_') && !name.includes('__') ? name + '_side' : name}.webp`;

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
  renderer.toneMappingExposure = 1.15;
  // Key light, plus a fill from the opposite side and a soft sky/ground light, so the far side
  // of a bike is lit enough to read its details (no near-black half).
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.75); fill.position.set(-4, 3, -4); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(0, 2, -6); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9a9a9a, 0.85));
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = !!opts.autoRotate;
  controls.autoRotateSpeed = 0.8;
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.035, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  scene.add(shadow);
  // Studio look (Brand a bike): soft, even light from a blurred room, no hard lights, no shadow
  if (opts.studio) {
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.12).texture;
    renderer.toneMappingExposure = 1.0;
    key.intensity = 0.45; fill.intensity = 0.4; rim.intensity = 0.3;
    scene.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = 0.55; });
    shadow.visible = false;
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  }

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
      // A highlighted part is drawn on top of everything, so parts hidden inside
      // (an R clip in a caliper, a piston in a cylinder) always show through.
      mat.depthTest = !(on && focus);
      m.renderOrder = on ? 10 : 0;
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
  /* A chain that runs round two sprockets. Every vertex of the chain meshes is mapped once to
     (position along the loop, distance from the loop, distance across it); each spin moves the
     whole chain along the loop, so links travel round the sprockets like a real chain. */
  function setupChain(g) {
    const ms = meshes.filter((m) => g.chain.some((p) => m.name.startsWith(p)));
    const fr = meshes.filter((m) => m.name.startsWith(g.front)), rr = meshes.filter((m) => m.name.startsWith(g.rear));
    if (!ms.length || !fr.length || !rr.length) return null;
    root.updateMatrixWorld(true);
    const bc = (list) => { const b = new THREE.Box3(); list.forEach((m) => b.expandByObject(m)); return b; };
    const b1 = bc(fr), b2 = bc(rr);
    const C1 = b1.getCenter(new THREE.Vector3()), C2 = b2.getCenter(new THREE.Vector3());
    const sz = b2.getSize(new THREE.Vector3());
    const ax = sz.x <= sz.y && sz.x <= sz.z ? 'x' : sz.y <= sz.z ? 'y' : 'z';
    const W = new THREE.Vector3(); W[ax] = 1;                       // sprocket axis = across the chain
    const U = C2.clone().sub(C1); U.sub(W.clone().multiplyScalar(U.dot(W))); const D = U.length(); U.normalize();
    const V = new THREE.Vector3().crossVectors(W, U);
    const tmp = new THREE.Vector3();
    const verts = [];
    let s1 = 0, n1 = 0, s2 = 0, n2 = 0;
    for (const m of ms) {
      m.geometry = m.geometry.clone();
      // models are quantised (16-bit positions); moving vertices needs full-precision floats
      const q = m.geometry.attributes.position, f = new Float32Array(q.count * 3);
      for (let i = 0; i < q.count; i++) { f[i * 3] = q.getX(i); f[i * 3 + 1] = q.getY(i); f[i * 3 + 2] = q.getZ(i); }
      m.geometry.setAttribute('position', new THREE.BufferAttribute(f, 3));
      const pos = m.geometry.attributes.position, wp = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        tmp.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
        const d = tmp.clone().sub(C1), u = d.dot(U), v = d.dot(V);
        wp[i * 3] = u; wp[i * 3 + 1] = v; wp[i * 3 + 2] = d.dot(W);
        if (u < 0) { s1 += Math.hypot(u, v); n1++; } else if (u > D) { s2 += Math.hypot(u - D, v); n2++; }
      }
      verts.push({ m, wp, inv: m.matrixWorld.clone().invert() });
    }
    const r1 = n1 ? s1 / n1 : D * 0.1, r2 = n2 ? s2 / n2 : D * 0.2;
    const phi = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / D)));
    const T1u = [r1 * Math.cos(phi), r1 * Math.sin(phi)], T2u = [D + r2 * Math.cos(phi), r2 * Math.sin(phi)];
    const T1l = [T1u[0], -T1u[1]], T2l = [T2u[0], -T2u[1]];
    const Ls = Math.hypot(T2u[0] - T1u[0], T2u[1] - T1u[1]), La2 = r2 * 2 * phi, La1 = r1 * (2 * Math.PI - 2 * phi);
    const L = 2 * Ls + La1 + La2;
    const nTop = [Math.cos(phi), Math.sin(phi)], nBot = [Math.cos(phi), -Math.sin(phi)];
    const tTop = [(T2u[0] - T1u[0]) / Ls, (T2u[1] - T1u[1]) / Ls];
    // point and outward normal at loop position s (top run, rear arc, bottom run, front arc)
    const at = (s) => {
      s = ((s % L) + L) % L;
      if (s < Ls) return [T1u[0] + tTop[0] * s, T1u[1] + tTop[1] * s, nTop[0], nTop[1]];
      s -= Ls;
      if (s < La2) { const a = phi - s / r2; return [D + r2 * Math.cos(a), r2 * Math.sin(a), Math.cos(a), Math.sin(a)]; }
      s -= La2;
      if (s < Ls) return [T2l[0] - tTop[0] * s, T2l[1] + tTop[1] * s, nBot[0], nBot[1]];
      s -= Ls; const a = -phi - s / r1; return [r1 * Math.cos(a), r1 * Math.sin(a), Math.cos(a), Math.sin(a)];
    };
    const norm = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a <= -Math.PI) a += 2 * Math.PI; return a; };
    const project = (u, v) => {
      let best = null;
      const cand = (s, x, y) => { const [px, py, nx, ny] = at(s); const dd = Math.hypot(u - px, v - py); if (!best || dd < best[0]) best = [dd, s, (u - px) * nx + (v - py) * ny]; };
      let t = Math.max(0, Math.min(Ls, (u - T1u[0]) * tTop[0] + (v - T1u[1]) * tTop[1])); cand(t);
      t = Math.max(0, Math.min(Ls, (u - T2l[0]) * -tTop[0] + (v - T2l[1]) * tTop[1])); cand(Ls + La2 + t);
      let a = Math.atan2(v, u - D); let k = norm(phi - a); if (k < 0) k += 2 * Math.PI; if (k <= 2 * phi) cand(Ls + k * r2);
      a = Math.atan2(v, u); k = norm(-phi - a); if (k < 0) k += 2 * Math.PI; if (k <= 2 * Math.PI - 2 * phi) cand(2 * Ls + La2 + k * r1);
      return best;
    };
    for (const c of verts) {
      const n = c.wp.length / 3, map = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { const b = project(c.wp[i * 3], c.wp[i * 3 + 1]); map[i * 3] = b[1]; map[i * 3 + 1] = b[2]; map[i * 3 + 2] = c.wp[i * 3 + 2]; }
      c.map = map;
    }
    // which way the chain runs when the front sprocket turns: test a point on the front sprocket
    const q = new THREE.Vector3(-r1, 0, 0), qa = C1.clone().add(U.clone().multiplyScalar(q.x));
    const axisW = new THREE.Vector3(); axisW[g.axis || ax] = 1; axisW.transformDirection(root.matrixWorld);
    const qb = qa.clone().sub(C1).applyAxisAngle(axisW, -0.01).add(C1);
    const mv = qb.sub(qa); const tan = at(2 * Ls + La2 + Math.PI * r1 - phi * r1 + 1e-6);
    const tv = U.clone().multiplyScalar(-tan[3]).add(V.clone().multiplyScalar(tan[2]));  // tangent of decreasing angle
    const dir = Math.sign(mv.dot(tv)) || 1;
    let off = 0;
    const apply = () => {
      for (const c of verts) {
        const pos = c.m.geometry.attributes.position, n = c.map.length / 3;
        for (let i = 0; i < n; i++) {
          const [px, py, nx, ny] = at(c.map[i * 3] + off), o = c.map[i * 3 + 1];
          tmp.copy(C1).addScaledVector(U, px + nx * o).addScaledVector(V, py + ny * o).addScaledVector(W, c.map[i * 3 + 2]).applyMatrix4(c.inv);
          pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
        }
        pos.needsUpdate = true; c.m.geometry.computeBoundingSphere();
      }
    };
    return { advance: (deg) => { off += dir * deg * (g.rate || 1) * Math.PI / 180 * r1; off %= L; apply(); } };
  }
  let chainMover = null;
  function setupWheels(groups) {
    wheels = [];
    chainMover = null;
    if (!groups) return;
    for (const g of groups) {
      if (g.chain) { chainMover = setupChain(g); continue; }
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
      if (!m.name || !m.name.includes('__')) { let a = m.parent; while (a && !(a.name && a.name.includes('__'))) a = a.parent; if (a) m.name = a.name; else if (!m.name && m.parent) m.name = m.parent.name; }
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
  api.focus = (pred, smooth = true) => {
    const ms = meshes.filter((m) => pred(m.name));
    if (!ms.length) return;
    const box = new THREE.Box3();
    ms.forEach((m) => box.expandByObject(m));
    const c = box.getCenter(new THREE.Vector3());
    const whole = new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3()).length();
    const d = Math.max(box.getSize(new THREE.Vector3()).length() * 3.2, whole * 0.55);
    const dir = camera.position.clone().sub(controls.target).normalize();
    const toT = c, toP = c.clone().add(dir.multiplyScalar(d));
    if (!smooth) { controls.target.copy(toT); camera.position.copy(toP); controls.update(); dirty = true; loop(); return; }
    const fromT = controls.target.clone(), fromP = camera.position.clone(), t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / 600), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      controls.target.lerpVectors(fromT, toT, e); camera.position.lerpVectors(fromP, toP, e); controls.update(); dirty = true;
      if (k < 1) requestAnimationFrame(step); else loop();
    };
    step(); loop();
  };
  /* Show only the meshes that match pred (a part cut out of a whole bike) and frame them closely. */
  api.isolate = (pred, view = 'threeq') => {
    if (!root) return 0;
    const ms = meshes.filter((m) => pred(m.name));
    meshes.forEach((m) => { m.visible = !ms.length || ms.includes(m); });
    if (!ms.length) return 0;
    const box = new THREE.Box3();
    ms.forEach((m) => box.expandByObject(m));
    const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const d = Math.max(size.length() * (view === 'side' ? 1.25 : 1.6), 0.05);
    const dir = view === 'side' ? new THREE.Vector3(0, 0.12, 1) : view === 'front' ? new THREE.Vector3(1, 0.25, 0.2) : new THREE.Vector3(-0.62, 0.34, 0.85);
    camera.position.copy(c).add(dir.normalize().multiplyScalar(d));
    camera.near = d / 100; camera.far = d * 40; camera.updateProjectionMatrix();
    controls.target.copy(c); controls.update();
    shadow.position.set(c.x, box.min.y + 0.001, c.z);
    shadow.scale.setScalar(Math.max(size.x, size.z) * 0.9);
    dirty = true; loop();
    return ms.length;
  };
  api.reframe = (view) => { if (root) frame(null, view || opts.view); };
  api.spin = (deg) => {
    if ((!wheels.length && !chainMover) || !deg) return;
    for (const w of wheels) w.pivot.rotation[w.axis] -= deg * w.rate * Math.PI / 180;
    if (chainMover) chainMover.advance(deg);
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
    const hits = ray.intersectObjects(meshes.filter((m) => m.visible), false).filter((h) => !(category && !h.object.name.startsWith(category + '__')) || true);
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
