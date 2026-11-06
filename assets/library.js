/* Moto Zero: model library. A light gallery of renders first; the 3D viewer
   only starts when a model is opened, and is released when you go back. */
import { MODELS } from './content/assets-map.js';
import SIZES from './content/model-sizes.js';
import { BIKE_PART_GROUPS } from './content/bike-part-models.js';
const DL = (k) => `../assets/models-download/${k}.glb`;
import { createViewer, webglOK, humanize, renderFor } from './viewer3d.js';
import { recordTool } from './progress.js';
recordTool('models', { visited: true });

const $ = (s) => document.querySelector(s);
const root = $('#lib');
const RB = '../assets/renders/';
const CATS = { bikes: 'Complete motorcycles', powertrain: 'Powertrain', transmission: 'Transmission', chassis: 'Chassis', frame_body: 'Frame and body', wheels: 'Wheels', electrical: 'Electrical', wiring: 'Wiring' };
Object.entries(BIKE_PART_GROUPS).forEach(([b, n]) => { CATS['from_' + b] = `Parts of the ${n.toLowerCase()}`; });
const BIKE_CATS = ['powertrain', 'transmission', 'chassis', 'frame_body', 'wheels', 'electrical', 'wiring'];
const KEYS = Object.keys(MODELS);
let viewer = null;

function gallery() {
  if (viewer) { viewer.dispose(); viewer = null; }
  document.title = 'Moto Zero · Models';
  root.innerHTML = `
    <section class="ute-hero"><span class="ute-label">Model library · ${KEYS.length} models</span><h1>Every part, in 3D</h1>
      <p>${KEYS.filter((k) => MODELS[k][0] === 'bikes').length} complete motorcycles and scooters and ${KEYS.filter((k) => MODELS[k][0] !== 'bikes').length} components, modelled for the course. Open any model to rotate it, zoom in and highlight each sub-part, or download it as a GLB file for Blender, three.js or any glTF viewer (CC BY-SA 4.0).</p>
      <div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="https://sketchfab.com/motorbikemodel" target="_blank" rel="noopener">Download the models on Sketchfab ↗</a><a class="ute-linkbtn" href="../sources/#download">Need another model? Get in touch</a></div></section>
    ${Object.entries(CATS).map(([c, label]) => {
      const items = KEYS.filter((k) => MODELS[k][0] === c);
      return items.length ? `<section class="ute-chapter"><h2>${label}</h2><div class="mz-gal">${items.map((k) => `<div class="mz-gal-item"><a class="mz-gal-card" href="#${k}"><img src="${renderFor(RB, k)}" alt="" loading="lazy"><span>${MODELS[k][1]}</span></a><a class="mz-gal-dl" href="${DL(k)}" download="${k}.glb" aria-label="Download ${MODELS[k][1]} (GLB, ${SIZES[k] || '?'} MB)">↓ Download GLB · ${SIZES[k] || '?'} MB</a></div>`).join('')}</div></section>` : '';
    }).join('')}`;
  window.scrollTo(0, 0);
}

async function detail(key) {
  const [cat, title] = MODELS[key];
  const i = KEYS.indexOf(key), prev = KEYS[i - 1], next = KEYS[i + 1];
  const bike = cat === 'bikes';
  document.title = `Moto Zero · ${title}`;
  root.innerHTML = `
    <div class="mz-lib-detail">
      <nav class="mz-crumbs"><a href="#">Models</a><span>/</span><a href="#">${CATS[cat]}</a><span>/</span><b>${title}</b></nav>
      <div class="ute-section-head">
        <div><h1 class="mz-lib-title">${title}</h1><p class="ute-sub">Drag to rotate, scroll or pinch to zoom, click a sub-part to highlight it. ← → for the previous or next model.</p></div>
        <div class="ute-btnrow"><a class="ute-btn is-primary" href="${DL(key)}" download="${key}.glb">↓ Download GLB · ${SIZES[key] || '?'} MB</a><a class="ute-linkbtn" href="https://sketchfab.com/motorbikemodel" target="_blank" rel="noopener">Sketchfab ↗</a>${prev ? `<a class="ute-linkbtn" href="#${prev}">← Previous</a>` : ''}${next ? `<a class="ute-linkbtn" href="#${next}">Next →</a>` : ''}<a class="ute-linkbtn" href="#">All models</a></div>
      </div>
      ${bike ? `<div class="ute-chips" id="lib-cats">${['all', ...BIKE_CATS].map((c) => `<button type="button" class="ute-chip ${c === 'all' ? 'is-on' : ''}" data-c="${c}">${c === 'all' ? 'All' : CATS[c]}</button>`).join('')}</div>` : ''}
      <div class="mz3d mz3d-part mz-lib-3d" id="lib-3d"></div>
      <p class="mz3d-cap" id="lib-cap"></p>
      <div class="mz-subparts" id="lib-subs"></div>
    </div>`;
  window.scrollTo(0, 0);
  const box = $('#lib-3d');
  if (!webglOK()) { box.innerHTML = `<img class="mz3d-poster" src="${renderFor(RB, key)}" alt="${title}">`; return; }
  if (viewer) { viewer.dispose(); viewer = null; }
  const v = createViewer(box, {
    base: '../assets/models/',
    poster: (n) => renderFor(RB, n),
    onPick: (m, name) => { if (!m) return; v.setHighlight((n) => n === name); $('#lib-cap').textContent = humanize(name.split('__').slice(1).join(' · ')); },
  });
  viewer = v;
  document.querySelectorAll('#lib-cats [data-c]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('#lib-cats [data-c]').forEach((x) => x.classList.toggle('is-on', x === b));
    v.setCategory(b.dataset.c);
  }));
  await v.load(key, { view: bike ? 'side' : 'threeq' });
  if (viewer !== v) return;
  $('#lib-cap').textContent = `${v.meshes().length} meshes · ${title}`;
  const groups = new Map();
  v.meshes().forEach((m) => {
    const p = m.name.split('__');
    const label = humanize(bike ? p.slice(0, 2).join(' · ').replace('frame_body', 'frame & body') : p.slice(1).join(' ') || m.name);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(m.name);
  });
  $('#lib-subs').innerHTML = [...groups.keys()].map((l) => `<button type="button" class="mz-sub">${l}</button>`).join('');
  $('#lib-subs').querySelectorAll('.mz-sub').forEach((b) => {
    const names = new Set(groups.get(b.textContent));
    const on = () => { $('#lib-subs').querySelectorAll('.is-on').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); v.setHighlight((n) => names.has(n)); $('#lib-cap').textContent = b.textContent; };
    b.addEventListener('mouseenter', on); b.addEventListener('focus', on); b.addEventListener('click', () => { on(); v.focus((n) => names.has(n)); });
  });
}

function route() {
  const k = decodeURIComponent(location.hash.slice(1));
  if (MODELS[k]) detail(k); else gallery();
}
document.addEventListener('keydown', (e) => {
  const k = decodeURIComponent(location.hash.slice(1));
  if (!MODELS[k] || (e.target.tagName || '') === 'INPUT') return;
  const i = KEYS.indexOf(k);
  if (e.key === 'ArrowRight' && KEYS[i + 1]) location.hash = KEYS[i + 1];
  else if (e.key === 'ArrowLeft' && KEYS[i - 1]) location.hash = KEYS[i - 1];
  else if (e.key === 'Escape') location.hash = '';
});
window.addEventListener('hashchange', route);
route();
