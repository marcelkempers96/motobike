/* Moto Zero — model library: every GLB, grouped by category, with sub-parts. */
import { MODELS } from './content/assets-map.js';
import { createViewer, webglOK, humanize, renderFor } from './viewer3d.js';

const $ = (s) => document.querySelector(s);
const CATS = { bikes: 'Complete motorcycles', powertrain: 'Powertrain', transmission: 'Transmission', chassis: 'Chassis', frame_body: 'Frame and body', wheels: 'Wheels', electrical: 'Electrical', wiring: 'Wiring' };
const BIKE_CATS = ['powertrain', 'transmission', 'chassis', 'frame_body', 'wheels', 'electrical', 'wiring'];

$('#lib-list').innerHTML = `<span class="ute-label">${Object.keys(MODELS).length} models</span>` + Object.entries(CATS).map(([c, label]) => {
  const items = Object.entries(MODELS).filter(([, v]) => v[0] === c);
  return items.length ? `<h3>${label}</h3>${items.map(([k, v]) => `<button type="button" data-m="${k}" class="mz-lib-render"><img src="${renderFor('../assets/renders/', k)}" alt="" loading="lazy"><span>${v[1]}</span></button>`).join('')}` : '';
}).join('');

let viewer = null;
if (!webglOK()) { $('#lib-3d').innerHTML = '<img class="mz3d-poster" id="lib-poster" alt=""><p class="mz3d-status" style="align-items:end">Render · 3D needs WebGL</p>'; }
else viewer = createViewer($('#lib-3d'), {
  base: '../assets/models/',
  poster: (n) => renderFor('../assets/renders/', n),
  onPick: (m, name) => { if (!m) return; viewer.setHighlight((n) => n === name); $('#lib-cap').textContent = humanize(name.split('__').slice(1).join(' · ')); },
});

async function show(key) {
  if (!MODELS[key]) key = 'bike_classic_4t';
  document.querySelectorAll('[data-m]').forEach((b) => b.classList.toggle('is-on', b.dataset.m === key));
  const [cat, title] = MODELS[key];
  $('#lib-title').textContent = title;
  $('#lib-cat').textContent = CATS[cat];
  document.title = `Moto Zero · ${title}`;
  history.replaceState(null, '', '#' + key);
  if (!viewer) { const p = $('#lib-poster'); if (p) p.src = renderFor('../assets/renders/', key); return; }
  const bike = cat === 'bikes';
  $('#lib-tools').innerHTML = bike ? `<div class="ute-chips" style="margin:0">${['all', ...BIKE_CATS].map((c) => `<button type="button" class="ute-chip ${c === 'all' ? 'is-on' : ''}" data-c="${c}">${c === 'all' ? 'All' : CATS[c]}</button>`).join('')}</div>` : '';
  $('#lib-tools').querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => {
    $('#lib-tools').querySelectorAll('[data-c]').forEach((x) => x.classList.toggle('is-on', x === b));
    viewer.setCategory(b.dataset.c);
  }));
  await viewer.load(key, { view: bike ? 'side' : 'threeq' });
  $('#lib-cap').textContent = `${viewer.meshes().length} meshes · file assets/models/${key}.glb`;
  const groups = new Map();
  viewer.meshes().forEach((m) => {
    const parts = m.name.split('__');
    const label = humanize(bike ? parts.slice(0, 2).join(' · ').replace('frame_body', 'frame & body') : parts.slice(1).join(' ') || m.name);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(m.name);
  });
  $('#lib-subs').innerHTML = [...groups.keys()].map((l) => `<button type="button" class="mz-sub" data-sub="${l}">${l}</button>`).join('');
  $('#lib-subs').querySelectorAll('[data-sub]').forEach((b) => {
    const names = new Set(groups.get(b.dataset.sub));
    const on = () => { $('#lib-subs').querySelectorAll('.is-on').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); viewer.setHighlight((n) => names.has(n)); $('#lib-cap').textContent = b.dataset.sub; };
    b.addEventListener('mouseenter', on); b.addEventListener('focus', on); b.addEventListener('click', on);
  });
}
document.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { show(b.dataset.m); if (matchMedia('(max-width: 960px)').matches) $('#lib-3d').scrollIntoView({ behavior: 'smooth' }); }));
document.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  const btns = [...document.querySelectorAll('[data-m]')];
  const i = btns.findIndex((b) => b.classList.contains('is-on'));
  const n = btns[Math.max(0, Math.min(btns.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))];
  if (n) { e.preventDefault(); show(n.dataset.m); n.focus(); }
});
show(decodeURIComponent(location.hash.slice(1)));
