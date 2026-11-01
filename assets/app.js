/* ==========================================================================
   Moto Zero: Overview and components (index.html) and Cockpit (cockpit/index.html)
   One page, one app. See moto-spec/01-SPEC.md, 02-DESIGN.md, 03-FUNCTIONS.md.
   ========================================================================== */
import {
  ns, txt, iso3DBox, hexBolt, defsPackMetals, GEAR, displacementCC, approxTorqueNm,
  wheelRPMFromEngine, kmhFromWheelRPM, clamp, fmt, buildEngine, buildTimingStrip, strokeAt,
} from './core.js';
import { mountSite } from './site.js';
import { recordTool } from './progress.js';
import { PARTS, PART_CATEGORY, CATEGORIES, INTERACTIVE_PARTS, MODE_INFO } from './content/parts.js';
import {
  BIKE_MODEL, PLATES, plateSrc, MODELS, modelsFor, platesFor, PART_CHAPTER,
  partForMesh, BIKE_WHEELS, HOTSPOTS,
} from './content/assets-map.js';

/* ---------- 1. State ---------- */
const S = {
  mode: '4t',
  category: 'all',
  selected_part: null,

  running: true,
  rpm: 2400,
  base_rpm: 2400,
  bore_mm: 72,
  stroke_mm: 58,
  compression: 10.5,
  crank_deg: 0,
  speed: 0,

  elec: { rpm: 0, torque: 0, motor_temp: 60, controller_temp: 50, battery_soc: 85 },

  rider: { throttle: 0, brake: 0, clutch: 0, horn: 0, kill: false, throttle_hold: false, brake_hold: false, clutch_hold: false },

  cv: {
    charge: 0, charge_was: false, charge_fire_t: -1, misfire_t: -1, fire_kv: 0,
    brake_pct: 0, brake_hold: false, disc_temp: 40,
    fork_pct: 0,
    gear_rpm: 0, gear_hold: false,
    particles: [],
    carb_pct: 0, carb_hold: false,
    spark_hold: false,
    throttle_hold: false,
  },

  dyno: null,

  assets: {},
  last_tick_ms: 0,
  last_dyno_sample_ms: 0,
  _dynoFrame: 0,
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const partName = (k) => (PARTS[k] && PARTS[k].name) || 'Component';

/* ---------- Icons ---------- */
const ICON = {
  play: '<svg viewBox="0 0 16 16"><path d="M4 2.5 L13 8 L4 13.5 Z" fill="#0A0A0A"/></svg>',
  pause: '<svg viewBox="0 0 16 16"><rect x="3.5" y="2.5" width="3" height="11" fill="#0A0A0A"/><rect x="9.5" y="2.5" width="3" height="11" fill="#0A0A0A"/></svg>',
  help: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="#0A0A0A" stroke-width="1.4"/><path d="M6.2 6.3 a1.9 1.9 0 1 1 2.6 1.8 c-.6.3-.8.6-.8 1.3" fill="none" stroke="#0A0A0A" stroke-width="1.4"/><circle cx="8" cy="11.4" r=".9" fill="#0A0A0A"/></svg>',
};

/* ==========================================================================
   2. Shell render
   ========================================================================== */
function render() {
  const root = $('#ute-root');
  const PAGE = root.dataset.page || 'overview';
  const info = MODE_INFO[S.mode];
  root.innerHTML = `
    <header class="ute-top">
      <a class="ute-brand" href="./" aria-label="Moto Zero home">
        <img class="ute-brand-mark" src="assets/brand-mark.svg" alt="">
        <span class="ute-brand-word">moto zero</span>
        <span class="ute-brand-sub">Transitions Lab</span>
      </a>
      <nav data-mz-nav></nav>
      <span class="ute-top-spacer"></span>
      <div class="ute-seg ute-mode-switch" role="group" aria-label="Mode">
        ${['4t', '2t', 'elec'].map((m) => `<button type="button" data-mode="${m}" class="${S.mode === m ? 'is-on' : ''}" aria-pressed="${S.mode === m}">${MODE_INFO[m].short}</button>`).join('')}
      </div>
      <div class="ute-top-actions">
        <button class="ute-iconbtn" type="button" data-run aria-label="Play / pause animation (Space)">${S.running ? ICON.pause : ICON.play}</button>
        <button class="ute-iconbtn" type="button" data-help aria-label="Help (?)">${ICON.help}</button>
      </div>
    </header>

${PAGE === 'overview' ? `
    <div class="mz-split" id="mz-split" data-open="0">
    <section class="ute-section ute-overview mz-split-left" aria-labelledby="ov-h">
      <div class="ute-section-head">
        <div>
          <h2 id="ov-h">${info.name}</h2>
          <p class="ute-sub">${info.blurb}</p>
        </div>
        <div class="ute-head-tools">
          <span class="ute-legend"><i></i>= interactive close-up</span>
        </div>
      </div>
      <div class="ute-chips" role="group" aria-label="System categories">
        ${CATEGORIES.map((c) => `<button type="button" class="ute-chip ${S.category === c.k ? 'is-on' : ''}" data-cat="${c.k}">${c.label}</button>`).join('')}
        <button type="button" class="ute-chip is-action" data-open-cv="wiring">Wiring diagram →</button>
      </div>
      <div class="ute-moto-wrap is-3d">
        <div id="ute-moto-stage" class="ute-moto-stage" aria-label="${info.name}: 3D model, select a part"></div>
      </div>
      <div class="mz-part-index" id="ute-part-index"></div>
    </section>
    <div class="mz-split-handle" id="mz-split-handle" role="separator" aria-orientation="vertical" aria-label="Resize the component panel" tabindex="0"></div>
    <aside class="mz-panel" id="mz-panel" aria-live="polite"></aside>
    </div>

    <section class="ute-cview" id="ute-cview-slot"></section>

` : ''}
${PAGE === 'cockpit' ? `
    <section class="ute-section ute-rider" aria-labelledby="ride-h">
      <div class="ute-section-head">
        <div>
          <h2 id="ride-h">Cockpit</h2>
          <p class="ute-sub">The rider’s-eye cockpit: every control works and it drives the 3D bike, the close-ups and the dyno.${S.mode === 'elec' ? ' Electric mode: no starter, clutch or gears.' : ''}</p>
        </div>
        <a class="ute-linkbtn" href="${cockpitSrc().replace('embed=1&', '').replace('?embed=1', '')}" target="_blank" rel="noopener">Open full screen ↗</a>
      </div>
      ${rideHowtoHTML()}
      <iframe id="mz-cockpit" class="mz-cockpit" src="${cockpitSrc()}" title="Interactive motorcycle cockpit" loading="eager"></iframe>
    </section>

    <section class="ute-section ute-dyno" aria-labelledby="dyno-h">
      <div class="ute-section-head">
        <div>
          <h2 id="dyno-h">Dyno</h2>
          <p class="ute-sub">Records a run from the cockpit: press Start test (or G), ride, then stop. Speed, rpm, throttle, brake${S.mode === 'elec' ? '' : ', gear, clutch'} and power at 20 samples a second, with every event marked. Hover a chart to read values.</p>
        </div>
        <div class="ute-btnrow">
          <button type="button" class="ute-btn ${S.dyno.recording ? 'is-rec' : 'is-primary'}" data-dyno="start" aria-pressed="${S.dyno.recording}">${S.dyno.recording ? '■ Stop test (G)' : '● Start test (G)'}</button>
          <button type="button" class="ute-btn" data-dyno="reset">Reset</button>
          <button type="button" class="ute-btn" data-dyno="csv" ${S.dyno.samples.length ? '' : 'disabled'}>Export CSV</button>
        </div>
      </div>
      <div class="ute-findings" id="ute-findings"></div>
      <div class="ute-dyno-body">
        <div class="ute-dyno-charts" id="ute-dyno-charts"></div>
        <div class="ute-dyno-logbox"><span class="ute-label">Session log</span><ol class="ute-dyno-log" id="ute-dyno-log" aria-live="off"></ol>
          <div class="ute-dyno-legend">${Object.entries({ engine: 'Engine', gear: 'Gear', clutch: 'Clutch', brake: 'Brake', key: 'Key', test: 'Test' }).filter(([k]) => S.mode !== 'elec' || (k !== 'gear' && k !== 'clutch')).map(([k, l]) => `<span><i style="background:${C_EV[k]}"></i>${l}</span>`).join('')}</div>
        </div>
      </div>
    </section>

` : ''}
    <footer data-mz-footer></footer>

    <div class="ute-modal" id="ute-help" role="dialog" aria-modal="true" aria-labelledby="help-h">
      <div class="ute-modal-box">
        <h3 id="help-h">How to use this page</h3>
        <p>Pick a bike at the top. Drag the 3D model to look around (one finger on a phone, pinch to zoom) and click or tap any part: it lights up orange and its close-up opens below with a working animation, the part’s own 3D model and its course plates. Tap it again or press Esc to clear. A system chip (Powertrain, Wheels…) fades everything else. Parts marked <b style="color:var(--warm)">●</b> are interactive: hold the big green button to drive them.</p>
        <div class="ute-kbd">
          <kbd>Space</kbd><span>Pause / resume the engine animation</span>
          <kbd>Esc</kbd><span>Close the close-up, a plate or this help</span>
          <kbd>?</kbd><span>Open this help</span>
          <kbd>1 2 3</kbd><span>Four-stroke · two-stroke · electric</span>
          <kbd>G</kbd><span>Start / stop a dyno test</span>
        </div>
        <p><b>Cockpit</b> (keys work anywhere on the page; hold several at once):</p>
        <div class="ute-kbd">
          <kbd>K</kbd><span>Ignition key</span>
          <kbd>X</kbd><span>Stop switch</span>
          <kbd>S</kbd><span>Starter (hold)</span>
          <kbd>C</kbd><span>Clutch (hold)</span>
          <kbd>T</kbd><span>Throttle (hold), or the mouse wheel over the cockpit</span>
          <kbd>↑ ↓</kbd><span>Shift up / down (hold C)</span>
          <kbd>F / R</kbd><span>Front / rear brake (hold)</span>
          <kbd>H</kbd><span>Horn (hold)</span>
          <kbd>Q / E</kbd><span>Indicate left / right</span>
          <kbd>B · V</kbd><span>High beam · choke</span>
        </div>
        <p>Ride the bike and record runs on the dyno in the <a href="cockpit/">Cockpit</a>. Want the theory first? Head to <a href="learn/">Learn</a>, then try the <a href="quiz/">Quiz</a>.</p>
        <div class="ute-btnrow" style="justify-content:flex-end"><button class="ute-btn is-primary" type="button" data-help-close>Got it</button></div>
      </div>
    </div>
    <div class="mz-lightbox" id="mz-lightbox" role="dialog" aria-modal="true" aria-label="Course plate">
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="ute-btn is-primary" data-lb-close>Close ✕</button>
    </div>
  `;
  wireChrome();
  mountSite(root);
  if (!EMBED) mountOverview();
  renderComponentView();
  mountRider();
  mountDyno();
}

/* Draggable divider between the overview and the component panel */
function wireSplit() {
  const split = $('#mz-split'), h = $('#mz-split-handle');
  if (!split || !h) return;
  let pct = 40;
  try { pct = +localStorage.getItem('mz-split') || 40; } catch (e) { /* noop */ }
  const apply = (v) => { pct = Math.min(65, Math.max(25, v)); split.style.setProperty('--mz-right', pct + '%'); };
  apply(pct);
  const move = (e) => { const r = split.getBoundingClientRect(); apply((r.right - e.clientX) / r.width * 100); };
  h.addEventListener('pointerdown', (e) => {
    e.preventDefault(); h.setPointerCapture(e.pointerId); split.classList.add('is-dragging');
    h.addEventListener('pointermove', move);
    const up = () => { h.removeEventListener('pointermove', move); split.classList.remove('is-dragging'); try { localStorage.setItem('mz-split', String(Math.round(pct))); } catch (err) { /* noop */ } };
    h.addEventListener('pointerup', up, { once: true });
    h.addEventListener('pointercancel', up, { once: true });
  });
  h.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { apply(pct + 3); e.preventDefault(); }
    if (e.key === 'ArrowRight') { apply(pct - 3); e.preventDefault(); }
  });
}

function wireChrome() {
  wireSplit();
  $$('.ute-mode-switch button').forEach((b) => b.addEventListener('click', () => switchMode(b.dataset.mode)));
  $$('.ute-chips [data-cat]').forEach((b) => b.addEventListener('click', () => {
    S.category = b.dataset.cat;
    $$('.ute-chips [data-cat]').forEach((x) => x.classList.toggle('is-on', x.dataset.cat === S.category));
    applyMotoCategory();
  }));
  $('[data-open-cv="wiring"]')?.addEventListener('click', () => selectPart('wiring', true));
  $('[data-run]').addEventListener('click', toggleRun);
  $('[data-help]').addEventListener('click', openHelp);
  $('[data-help-close]').addEventListener('click', closeHelp);
  $('#ute-help').addEventListener('click', (e) => { if (e.target.id === 'ute-help') closeHelp(); });
  $('[data-dyno="start"]')?.addEventListener('click', toggleDyno);
  $('[data-dyno="reset"]')?.addEventListener('click', resetDyno);
  $('[data-dyno="csv"]')?.addEventListener('click', exportDynoCSV);
  $('#mz-lightbox').addEventListener('click', (e) => { if (e.target.id === 'mz-lightbox' || e.target.closest('[data-lb-close]')) closePlate(); });
}

function toggleRun() {
  S.running = !S.running;
  const b = $('[data-run]');
  if (b) b.innerHTML = S.running ? ICON.pause : ICON.play;
  const rb = $('[data-cv-run]');
  if (rb) rb.textContent = S.running ? 'Pause' : 'Run';
}
function openHelp() { $('#ute-help').classList.add('is-open'); $('[data-help-close]').focus(); }
function closeHelp() { $('#ute-help').classList.remove('is-open'); }

/* ---------- Mode switching ---------- */
function switchMode(mode) {
  if (!['4t', '2t', 'elec'].includes(mode) || mode === S.mode) return;
  S.mode = mode;
  S.crank_deg = 0;
  S.selected_part = null;
  render();
  syncURL();
}

function syncURL() {
  try {
    const u = new URL(location.href);
    u.searchParams.set('mode', S.mode);
    u.searchParams.delete('view');
    if (S.selected_part) u.searchParams.set('part', S.selected_part); else u.searchParams.delete('part');
    history.replaceState(null, '', u);
  } catch (e) { /* file:// or sandboxed */ }
}

/* ==========================================================================
   3-4. Overview: the real 3D bike (GLB)
   ========================================================================== */
let V3 = null;
let v3mod = null;
let mountToken = 0;
const load3D = () => v3mod || (v3mod = import('./viewer3d.js'));

function overviewParts() {
  const keys = [...new Set(HOTSPOTS[S.mode].map((h) => h[0]))];
  if (!keys.includes('wiring')) keys.push('wiring');
  return keys;
}

function mountOverview() {
  const wrap = $('#ute-moto-stage');
  if (!wrap) return;
  const token = ++mountToken;
  if (V3) { V3.dispose(); V3 = null; }
  wrap.innerHTML = '';
  mount3D(wrap, token);
  renderPartIndex();
}

/* No WebGL: show the bike's side render; the parts list below stays the way in. */
function mountStill(wrap) {
  const name = BIKE_MODEL[S.mode];
  wrap.innerHTML = `<div class="mz3d mz3d-bike mz3d-still"><img src="assets/renders/${name}_side.webp" alt="${MODE_INFO[S.mode].name}, side view" draggable="false"><p class="mz3d-note">3D needs WebGL, which this browser has turned off. Pick a part from the list below.</p></div>`;
}

async function mount3D(wrap, token) {
  wrap.innerHTML = `
    <div class="mz3d mz3d-bike" id="mz3d-bike"></div>
    <div class="mz3d-tip" id="mz3d-tip" hidden></div>
    <div class="mz3d-bar">
      <span class="mz3d-hint">Drag to orbit · scroll or pinch to zoom · tap a part</span>
      <div class="ute-seg ute-cam" role="group" aria-label="Camera">
        <button type="button" data-cam="side" class="is-on">Side</button><button type="button" data-cam="threeq">3/4</button><button type="button" data-cam="front">Front</button>
      </div>
    </div>`;
  let mod;
  try { mod = await load3D(); } catch (e) { mod = null; }
  if (token !== mountToken) return;
  if (!mod || !mod.webglOK()) { mountStill(wrap); return; }
  const tip = $('#mz3d-tip');
  V3 = mod.createViewer($('#mz3d-bike'), {
    view: 'side',
    poster: (n) => mod.renderFor('assets/renders/', n),
    onPick: (m, name) => { const k = partForMesh(name); if (k) selectPart(k, false, true); },
    onHover: (m, name, e) => {
      const k = partForMesh(name);
      if (!k || !e) { tip.hidden = true; return; }
      const r = wrap.getBoundingClientRect();
      tip.hidden = false;
      const sub = mod.humanize(name.split('__').slice(1).join(' · '));
      tip.innerHTML = `${partName(k)}${INTERACTIVE_PARTS.has(k) ? ' <i>interactive</i>' : ''}${sub.toLowerCase() !== partName(k).toLowerCase() ? `<small>${sub}</small>` : ''}`;
      tip.style.left = Math.min(r.width - 180, e.clientX - r.left + 14) + 'px';
      tip.style.top = (e.clientY - r.top + 16) + 'px';
    },
  });
  await V3.load(BIKE_MODEL[S.mode], { view: 'side', wheels: BIKE_WHEELS });
  if (token !== mountToken) return;
  applyMotoHighlight();
  applyMotoCategory();
  wrap.querySelectorAll('[data-cam]').forEach((b) => b.addEventListener('click', () => {
    wrap.querySelectorAll('[data-cam]').forEach((x) => x.classList.toggle('is-on', x === b));
    V3.view(b.dataset.cam);
  }));
}

function renderPartIndex() {
  const box = $('#ute-part-index');
  if (!box) return;
  box.innerHTML = `<span class="ute-label">Parts on this bike</span>` + overviewParts().map((k) =>
    `<button type="button" class="mz-part ${INTERACTIVE_PARTS.has(k) ? 'is-ix' : ''}" data-part="${k}" data-cat="${PART_CATEGORY[k] || ''}">${partName(k)}</button>`).join('');
  box.querySelectorAll('[data-part]').forEach((b) => b.addEventListener('click', () => selectPart(b.dataset.part)));
  applyMotoHighlight();
  applyMotoCategory();
}

function applyMotoHighlight() {
  const k = S.selected_part;
  $$('.mz-part').forEach((el) => { el.classList.toggle('is-hl', !!k && el.dataset.part === k); el.setAttribute('aria-pressed', String(!!k && el.dataset.part === k)); });
  if (V3) V3.setHighlight(k ? (n) => partForMesh(n) === k : null);
}

function applyMotoCategory() {
  const c = S.category;
  $$('.mz-part').forEach((el) => el.classList.toggle('in-cat', c !== 'all' && el.dataset.cat === c));
  const idx = $('#ute-part-index');
  if (idx) idx.dataset.cat = c;
  if (V3) V3.setCategory(c);
}

function updateOverviewTick(dt) {
  if (!V3 || S.speed < 0.3) return;
  const wheelRPM = S.speed / 3.6 / (2 * Math.PI * GEAR.wheel_r_m) * 60;
  V3.spin(wheelRPM / 60 * 360 * dt / 10); // 10x slow-motion so the spokes stay readable
}


/* ==========================================================================
   5. Component view
   ========================================================================== */
function selectPart(key, force, fromModel) {
  const was = S.selected_part;
  S.selected_part = (!force && (S.selected_part === key || key == null)) ? null : key;
  if (key == null) S.selected_part = null;
  if (S.selected_part === was && force) return;
  applyMotoHighlight();
  renderComponentView();
  syncURL();
  // Desktop: the panel opens beside the bike, no scrolling. Phones: scroll to the panel.
  const panel = $('#mz-panel');
  if (S.selected_part && panel && window.matchMedia('(max-width: 960px)').matches) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  void fromModel;
}

function emptyCViewHTML() {
  return '<div class="ute-cview-empty">No part selected · click one above</div>';
}

let CV3 = null;
const EMBED = /[?&]embed=1/.test(location.search);
if (EMBED) document.documentElement.classList.add('mz-embed');
let animOpen = EMBED;
try { if (!EMBED) animOpen = localStorage.getItem('mz-anim-open') === '1'; } catch (e) { /* noop */ }
function renderComponentView() {
  const slot = $('#ute-cview-slot');
  const panel = $('#mz-panel');
  const split = $('#mz-split');
  if (!slot || !panel) return;
  if (CV3) { CV3.dispose(); CV3 = null; }
  CV3_MODEL = null; S._brakeSpin = null;
  Object.assign(S.cv, { carb_hold: false, spark_hold: false, gear_hold: false, brake_hold: false, throttle_hold: false, particles: [] });
  if (!S.selected_part) {
    panel.innerHTML = ''; slot.innerHTML = '';
    split.dataset.open = '0';
    return;
  }
  split.dataset.open = '1';
  const key = S.selected_part;
  const cfg = COMPONENT_VIEWS[key] || basicCard(key);
  const P = PARTS[key] || {};
  const hasAnim = !cfg.basic && !cfg.wide;
  panel.innerHTML = `
    <div class="mz-panel-head">
      <div><span class="ute-label">${cfg.kind || 'Component'}</span><h2>${cfg.title}</h2></div>
      <div class="mz-panel-actions">
        ${hasAnim ? `<button type="button" class="mz-anim-btn" data-anim aria-expanded="${animOpen}">${animOpen ? 'Hide animation' : '▶ See animation'}</button>` : ''}
        <button class="ute-cview-close" type="button" data-cv-close aria-label="Close the component panel">✕</button>
      </div>
    </div>
    ${hasAnim ? `<div class="mz-anim" id="mz-anim" ${animOpen ? '' : 'hidden'}>
      <div class="ute-cview-stage ${cfg.hold ? '' : 'no-action'}" id="ute-cview-stage">${cfg.html()}${cfg.hold ? holdHTML(cfg.hold) : ''}</div>
      ${cfg.under ? cfg.under() : ''}
      ${cfg.sideHTML ? `<div class="ute-cview-side">${cfg.sideHTML()}</div>` : ''}
    </div>` : ''}
    <div class="mz-panel-model">${cfg.basic ? '' : ''}${viewer3dHTML(false)}</div>
    ${cfg.basic ? `<p class="mz-panel-lead">${P.desc || ''}</p>` : ''}
  `;
  slot.innerHTML = `
    ${cfg.wide ? `<div class="ute-cview-stage no-action mz-wide-stage" id="ute-cview-stage">${cfg.html()}</div>${cfg.sideHTML ? `<div class="ute-cview-side">${cfg.sideHTML()}</div>` : ''}` : ''}
    <div class="mz-cv-below">
      ${cfg.graphs ? `<div class="mz-cv-graphs">${cfg.graphs()}</div>` : ''}
      <div class="mz-cv-banner">
        <div class="mz-cv-banner-info"><span class="mz-cv-tag">About this part</span><p>${P.desc || ''}</p>${P.notes ? `<p><b>Workshop note.</b> ${P.notes}</p>` : ''}</div>
        <div class="mz-cv-banner-plates"><span class="mz-cv-tag">Related diagrams</span>${platesHTML(key)}</div>
        <div class="mz-cv-banner-links"><span class="mz-cv-tag">Learn more</span>${deeperHTML(key)}</div>
      </div>
    </div>
  `;
  S._activeCfg = cfg;
  if (cfg.mount) cfg.mount();
  if (cfg.graphsUpdate) cfg.graphsUpdate();
  mountAssetsPanel(key);
  if (cfg.hold) wireHold($('.ute-hold', panel), cfg.hold.flag);
  const ab = panel.querySelector('[data-anim]');
  if (ab) ab.addEventListener('click', () => {
    animOpen = !animOpen;
    try { localStorage.setItem('mz-anim-open', animOpen ? '1' : '0'); } catch (e) { /* noop */ }
    $('#mz-anim').hidden = !animOpen;
    ab.setAttribute('aria-expanded', String(animOpen));
    ab.textContent = animOpen ? 'Hide animation' : '▶ See animation';
  });
  panel.querySelector('[data-cv-close]').addEventListener('click', () => selectPart(null));
}

function holdHTML(h) {
  return `<div class="ute-hold-wrap"><button type="button" class="ute-hold">${h.label}</button><div class="ute-hold-hint">${h.hint || 'Press and hold'}</div></div>`;
}

function wireHold(btn, flag) {
  if (!btn) return;
  const set = (v) => {
    if (flag === 'rider_throttle') S.rider.throttle_hold = v;
    else S.cv[flag] = v;
    btn.classList.toggle('is-holding', v);
  };
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (_) { /* noop */ } set(true); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => btn.addEventListener(ev, () => set(false)));
  btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); set(true); } });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') set(false); });
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
}

function statusHTML(title, desc, num) {
  return `<div class="ute-status"><span class="ute-status-dot"></span><div><div class="ute-status-title" data-st="title">${title}</div><div class="ute-status-desc" data-st="desc">${desc}</div></div><div class="ute-status-num" data-st="num">${num}</div></div>`;
}
function setStatus(title, desc, num) {
  const st = $('#ute-cview-stage');
  if (!st) return;
  const t = st.querySelector('[data-st="title"]'), d = st.querySelector('[data-st="desc"]'), n = st.querySelector('[data-st="num"]');
  if (t && title != null && t.textContent !== title) t.textContent = title;
  if (d && desc != null && d.textContent !== desc) d.textContent = desc;
  if (n && num != null) n.textContent = num;
}
function statsHTML(items) {
  return `<div class="ute-stats">${items.map(([k, l, u]) => `<div class="stat"><div class="stat-l">${l}</div><div class="stat-v"><span data-sv="${k}">–</span><small>${u || ''}</small></div></div>`).join('')}</div>`;
}
function setStat(k, v) {
  const el = document.querySelector(`[data-sv="${k}"]`);
  if (el && el.textContent !== String(v)) el.textContent = v;
}
function card(title, body) { return `<div class="ute-card"><h4>${title}</h4>${body}</div>`; }
function list(items) { return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`; }

/* ---------- Assets panel: the part's own 3D model + course plates ---------- */
const chapterFor = (key) => PART_CHAPTER[key] || (PARTS[key] && PARTS[key].chapter) || 'm1-anatomy';

function platesHTML(key) {
  const ids = platesFor(key, S.mode);
  if (!ids.length) return '<p>No course plate for this part yet.</p>';
  return `<div class="mz-plate-thumbs">${ids.map((id) => `<button type="button" class="mz-plate-thumb" data-plate="${id}" aria-label="Enlarge plate ${id}: ${PLATES[id][1]}"><img src="assets/illustrations/${plateSrc(id)}" alt="" loading="lazy"><span><b>${id}</b> ${PLATES[id][1]}</span></button>`).join('')}</div>`;
}
function deeperHTML(key) {
  const ch = chapterFor(key);
  return `<p>Read the theory, then test yourself.</p><div class="ute-btnrow"><a class="ute-linkbtn is-warm" href="learn/#${ch}">Learn →</a><a class="ute-linkbtn" href="quiz/?topic=${ch}">Quiz →</a><a class="ute-linkbtn" href="models/#${modelsFor(key, S.mode)[0] || BIKE_MODEL[S.mode]}">Model library</a></div>`;
}
function viewer3dHTML(stage) {
  return `<div class="mz-variants" id="mz-variants"></div>
    <div class="mz3d ${stage ? 'mz3d-stage' : 'mz3d-part'}" id="mz-cv3d"></div>
    <p class="mz3d-cap" id="mz-cv3d-cap"></p>
    <div class="mz-subparts" id="mz-subparts" aria-label="Sub-parts"></div>`;
}
function assetsPanelHTML(key) {
  return `<div class="mz-assets">
    <div class="ute-card mz-asset-3d"><h4>3D model · drag to rotate</h4>${viewer3dHTML(false)}</div>
    <div class="mz-asset-side">
      <div class="ute-card"><h4>Course plates</h4>${platesHTML(key)}</div>
      <div class="ute-card"><h4>Go deeper</h4>${deeperHTML(key)}</div>
    </div>
  </div>`;
}

/* Moving parts of the component models, driven by the live simulation */
const MOVING = {
  brake: { kind: 'brake', groups: [{ prefixes: ['brake__disc', 'brake__carrier', 'brake__float_buttons', 'brake__hub'] }] },
  motor: { kind: 'motor', groups: [{ prefixes: ['motor__rotor', 'motor__magnets', 'motor__shaft', 'motor__sprocket', 'motor__lock_washer'], centerFrom: 'motor__shaft', axis: 'long' }] },
  crankshaft_single: { kind: 'engine', groups: [{ prefixes: ['crankshaft_single__'], centerFrom: 'crankshaft_single__shafts', axis: 'long' }] },
  crankshaft: { kind: 'engine', groups: [{ prefixes: ['crankshaft__'], centerFrom: 'crankshaft__main_journal', axis: 'long' }] },
  chain_sprockets: { kind: 'engine', groups: [{ prefixes: ['chain_sprockets__front_sprocket', 'chain_sprockets__countershaft', 'chain_sprockets__retainer'], centerFrom: 'chain_sprockets__front_sprocket', rate: 1 }, { prefixes: ['chain_sprockets__rear_sprocket'], rate: 15 / 42 }] },
  rear_sprocket: { kind: 'wheel', groups: [{ prefixes: ['rear_sprocket__'] }] },
  clutch: { kind: 'engine', groups: [{ prefixes: ['clutch__basket', 'clutch__hub', 'clutch__friction_plates', 'clutch__steel_plates', 'clutch__pressure_plate', 'clutch__springs', 'clutch__spring_bolts', 'clutch__mainshaft'], centerFrom: 'clutch__mainshaft', axis: 'long', rate: 0.3 }] },
};
['front_wheel_spoked', 'front_wheel_cast', 'front_wheel_mx', 'rear_wheel_spoked', 'rear_wheel_cast', 'rear_wheel_mx'].forEach((w) => {
  MOVING[w] = { kind: 'wheel', groups: [{ prefixes: [w + '__'], static: [w + '__brake_arm', w + '__brake_cable', w + '__brake_plate', w + '__axle'] }] };
});
let CV3_MODEL = null;
function updateComponentModelTick(dt) {
  if (!CV3 || !CV3_MODEL || !MOVING[CV3_MODEL]) return;
  const k = MOVING[CV3_MODEL].kind;
  const wheelRPM = S.speed / 3.6 / (2 * Math.PI * GEAR.wheel_r_m) * 60;
  let degPerSec = 0;
  if (k === 'wheel') degPerSec = Math.max(wheelRPM, 25) * 6 / 10;
  else if (k === 'brake') degPerSec = S._brakeSpin != null ? S._brakeSpin : Math.max(wheelRPM, 25) * 6 / 10;
  else if (k === 'engine') degPerSec = S.running ? S.rpm * 6 / 60 : 0;
  else if (k === 'motor') degPerSec = Math.max(S.elec.rpm, S.rider.throttle * 10000) * 6 / 60;
  if (degPerSec) CV3.spin(degPerSec * dt);
}

async function mountAssetsPanel(key) {
  $$('#ute-cview-slot [data-plate]').forEach((b) => b.addEventListener('click', () => openPlate(b.dataset.plate)));
  const el = $('#mz-cv3d');
  if (!el) return;
  let mod;
  try { mod = await load3D(); } catch (e) { mod = null; }
  if (S.selected_part !== key || !el.isConnected) return;
  if (!mod || !mod.webglOK()) {
    const m = modelsFor(key, S.mode)[0];
    el.innerHTML = m ? `<img class="mz3d-poster" src="assets/renders/${m}.webp" alt="${MODELS[m] ? MODELS[m][1] : ''}"><p class="mz3d-status" style="align-items:end">Render · 3D needs WebGL</p>` : '<p class="mz3d-status">3D view needs WebGL, which this browser has turned off.</p>';
    return;
  }
  const cap = $('#mz-cv3d-cap'), subs = $('#mz-subparts'), vbox = $('#mz-variants');
  const viewer = mod.createViewer(el, {
    view: 'threeq',
    spin: (n) => (MOVING[n] ? MOVING[n].groups : null),
    poster: (n) => mod.renderFor('assets/renders/', n),
    onPick: (m, name) => { if (!m) { viewer.setHighlight(null); return; } viewer.setHighlight((n) => n === name); viewer.focus((n) => n === name); cap.textContent = mod.humanize(name.split('__').slice(-1)[0]); },
  });
  CV3 = viewer;
  const listSubs = (filter, strip) => {
    const groups = new Map();
    viewer.meshes().filter((m) => filter(m.name)).forEach((m) => {
      const label = mod.humanize(m.name.split('__').slice(strip).join(' ') || m.name);
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label).push(m.name);
    });
    subs.innerHTML = [...groups.keys()].map((l) => `<button type="button" class="mz-sub" data-sub="${l}">${l}</button>`).join('');
    subs.querySelectorAll('[data-sub]').forEach((b) => {
      const names = new Set(groups.get(b.dataset.sub));
      const on = (e) => { subs.querySelectorAll('.is-on').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); viewer.setHighlight((n) => names.has(n)); if (e && e.type === 'click') viewer.focus((n) => names.has(n)); };
      b.addEventListener('mouseenter', on); b.addEventListener('focus', on); b.addEventListener('click', on);
    });
  };
  const models = modelsFor(key, S.mode);
  const loadModel = async (name) => {
    vbox.querySelectorAll('button').forEach((b) => b.classList.toggle('is-on', b.dataset.model === name));
    await viewer.load(name, { view: 'threeq' });
    if (CV3 !== viewer) return;
    CV3_MODEL = name;
    cap.textContent = MODELS[name] ? MODELS[name][1] : name;
    listSubs(() => true, 1);
  };
  if (models.length) {
    vbox.innerHTML = models.length > 1 ? `<div class="ute-seg" role="group" aria-label="Model variants">${models.map((m) => `<button type="button" data-model="${m}">${MODELS[m] ? MODELS[m][1].split(/[,(]/)[0].trim() : m}</button>`).join('')}</div>` : '';
    vbox.querySelectorAll('[data-model]').forEach((b) => b.addEventListener('click', () => loadModel(b.dataset.model)));
    loadModel(models[0]);
  } else {
    const match = (n) => partForMesh(n) === key;
    await viewer.load(BIKE_MODEL[S.mode], { view: 'side' });
    if (CV3 !== viewer) return;
    viewer.setHighlight(match);
    viewer.focus(match);
    cap.textContent = `Shown in place on the ${MODE_INFO[S.mode].name.toLowerCase()}.`;
    listSubs(match, 2);
  }
}

function openPlate(id) {
  const m = $('#mz-lightbox');
  if (!m) return;
  m.querySelector('img').src = `assets/illustrations/${plateSrc(id)}`;
  m.querySelector('img').alt = `${id}: ${PLATES[id][1]}`;
  m.querySelector('figcaption').innerHTML = `<b>${id}</b> · ${PLATES[id][1]}`;
  m.classList.add('is-open');
  m.querySelector('button').focus();
}
function closePlate() { const m = $('#mz-lightbox'); if (m) m.classList.remove('is-open'); }

/* ---------- Basic card: parts without an animation get a big 3D stage ---------- */
function basicCard(key) {
  const P = PARTS[key] || { name: 'Component', tag: 'Component', desc: '', notes: '' };
  return {
    basic: true,
    title: P.name,
    kind: `${P.tag || 'Component'} · 3D model`,
    html: () => `${statusHTML(P.name, P.desc ? P.desc.split('. ')[0] + '.' : '', (CATEGORIES.find((c) => c.k === PART_CATEGORY[key]) || { label: '' }).label.toUpperCase())}${viewer3dHTML(true)}`,

  };
}


/* ==========================================================================
   8. Interactive component views
   ========================================================================== */
const COMPONENT_VIEWS = {};

/* ---------- Engine ---------- */
function engineView(title, focus) {
  return {
    title,
    kind: 'Combustion · Interactive',
    html: () => `${statusHTML('Intake', 'Piston falls, intake valve open, fresh charge drawn in.', 'θ 0°')}
      <svg class="ute-cv-svg" id="cv-engine" role="img" aria-label="Engine cross-section"></svg>
      <div class="ute-under" id="cv-engine-under"><span class="ute-stroke-badge" id="cv-badge"><i></i><span>Intake</span></span></div>`,
    sideHTML: () => card('Parameters', `<div class="ute-sliders">
        ${slider('base_rpm', 'Demo RPM (cockpit engine off)', 600, 10000, 100, S.base_rpm)}
        ${slider('bore_mm', 'Bore', 50, 100, 1, S.bore_mm, 'mm')}
        ${slider('stroke_mm', 'Stroke', 40, 90, 1, S.stroke_mm, 'mm')}
        ${slider('compression', 'Compression ratio', 7, 14, 0.1, S.compression, ':1')}
      </div>`) +
      card('Outputs', statsHTML([['disp', 'Displacement', 'cc'], ['cr', 'Compression', ':1'], ['tq', 'Torque', 'Nm'], ['kw', 'Power', 'kW']])) +
      card('Run', `<p>${focus || 'Animation runs at 60× slow-motion so you can follow each stroke.'}</p>
        <div class="ute-btnrow"><button class="ute-btn is-primary" type="button" data-cv-run>${S.running ? 'Pause' : 'Run'}</button><button class="ute-btn" type="button" data-cv-step>Step +30°</button></div>
        <p style="margin-top:10px" class="mz-live" id="cv-live"></p>`),
    mount: () => {
      const svg = $('#cv-engine');
      const eng = buildEngine(svg, { mode: S.mode });
      const strip = buildTimingStrip(S.mode);
      $('#cv-engine-under').appendChild(strip.el);
      S._eng = { eng, strip };
      $$('[data-slider]').forEach((inp) => inp.addEventListener('input', () => {
        const k = inp.dataset.slider;
        S[k] = parseFloat(inp.value);
        inp.closest('.ute-slider').querySelector('b').textContent = fmtSlider(k, S[k]);
        updateEngineOutputs();
      }));
      $('[data-cv-run]').addEventListener('click', toggleRun);
      $('[data-cv-step]').addEventListener('click', () => {
        const cyc = S.mode === '2t' ? 360 : 720;
        S.crank_deg = (S.crank_deg + 30) % cyc;
        if (S.running) toggleRun();
      });
      updateEngineOutputs();
      COMPONENT_VIEWS.engine.update(0);
    },
    update: () => {
      if (!S._eng || !$('#cv-engine')) return;
      const r = S._eng.eng.update({ mode: S.mode, crank_deg: S.crank_deg, bore_mm: S.bore_mm, stroke_mm: S.stroke_mm, compression: S.compression });
      S._eng.strip.set(S.crank_deg);
      const s = r.stroke;
      const badge = $('#cv-badge');
      if (badge && badge.dataset.k !== s.k) {
        badge.dataset.k = s.k;
        badge.querySelector('i').style.background = s.color;
        badge.querySelector('span').textContent = s.label;
      }
      setStatus(r.spark ? 'Spark!' : s.label, STROKE_DESC[S.mode][s.k], `θ ${Math.round(S.crank_deg)}° · ${Math.round(S.rpm)} rpm${S.live ? '' : ' (demo)'}`);
      const lv = $('#cv-live');
      if (lv) { const t = S.live ? 'Live from the Cockpit: the engine is running.' : 'Demo idle. Start the engine in the Cockpit and this follows its rpm.'; if (lv.textContent !== t) { lv.textContent = t; lv.classList.toggle('is-live', !!S.live); } }
    },
  };
}
const STROKE_DESC = {
  '4t': {
    intake: 'Piston falls, intake valve open, fresh air-fuel charge drawn in.',
    compression: 'Both valves shut. Piston rises and squeezes the charge.',
    power: 'Spark ignites the charge. Expanding gas drives the piston down.',
    exhaust: 'Exhaust valve open. Piston rises and pushes spent gas out.',
  },
  '2t': {
    power: 'Charge ignited at TDC. Gas pushes the piston down.',
    blowdown: 'Piston uncovers the exhaust port and the pressure blows out.',
    scavenge: 'Transfer ports open. Fresh charge from the crankcase sweeps the cylinder.',
    compression: 'Ports covered. Piston rises and compresses; crankcase draws in new charge.',
  },
};
function slider(k, label, min, max, step, val) {
  return `<div class="ute-slider"><label for="sl-${k}">${label}<b>${fmtSlider(k, val)}</b></label><input id="sl-${k}" type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-slider="${k}"></div>`;
}
function fmtSlider(k, v) {
  if (k === 'compression') return v.toFixed(1) + ':1';
  if (k === 'base_rpm') return Math.round(v) + ' rpm';
  return Math.round(v) + ' mm';
}
function updateEngineOutputs() {
  const disp = displacementCC(S.bore_mm, S.stroke_mm);
  const tq = approxTorqueNm(disp, S.mode, S.compression);
  setStat('disp', fmt(disp));
  setStat('cr', fmt(S.compression, 1));
  setStat('tq', fmt(tq, 1));
  setStat('kw', fmt(tq * S.rpm / 9549, 1));
}
COMPONENT_VIEWS.engine = engineView('Engine', null);
['cylinder', 'piston', 'conrod', 'crankshaft'].forEach((k) => {
  COMPONENT_VIEWS[k] = engineView(PARTS[k].name, `${PARTS[k].desc} Watch it inside the running engine.`);
  COMPONENT_VIEWS[k].update = (dt) => { COMPONENT_VIEWS.engine.update(dt); };
});
// Engine variants' tick goes through the same update; engine.update reads S._eng.
const _engUpdate = COMPONENT_VIEWS.engine.update;
COMPONENT_VIEWS.engine.update = (dt) => { _engUpdate(dt); if (Math.random() < 0.1) updateEngineOutputs(); };

/* ---------- Electric motor ---------- */
COMPONENT_VIEWS.motor = {
  title: 'Electric motor',
  kind: 'Electric · Interactive',
  hold: { label: 'Throttle', flag: 'rider_throttle', hint: 'Press and hold' },
  html: () => `${statusHTML('Idle', 'Rotor at rest. Hold THROTTLE to energise the stator.', '0 rpm')}<svg class="ute-cv-svg" id="cv-motor" viewBox="0 0 600 440" role="img" aria-label="PMAC motor cutaway"></svg>`,
  sideHTML: () => card('Live state', statsHTML([['m_rpm', 'RPM', 'rpm'], ['m_tq', 'Torque', 'Nm'], ['m_temp', 'Motor temp', '°C'], ['m_soc', 'Battery', '%']])) +
    card('Why it beats ICE', list(['Peak torque from 0 rpm: no clutch, no revving.', 'About 90 % efficient, against about 30 % for a petrol engine.', 'One moving part: the rotor.'])) +
    card('How it spins', '<p>The controller feeds three phases of AC into the stator windings in turn. That makes a rotating magnetic field. The rotor\'s permanent magnets chase it (N pulled to S) and the shaft turns.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-motor');
    const C = [300, 220];
    // Cables
    [['#C2702F', 0], ['#1D6B55', 1], ['#0A0A0A', 2]].forEach(([c, i]) => {
      svg.appendChild(ns('path', { d: `M ${430 + i * 14} ${90 + i * 6} C ${480 + i * 10} 40, 540 40, 590 ${30 + i * 14}`, fill: 'none', stroke: c, 'stroke-width': 7, 'stroke-linecap': 'round' }));
    });
    // Housing + fins
    for (let i = 0; i < 36; i++) {
      const a = i / 36 * Math.PI * 2;
      svg.appendChild(ns('line', { x1: C[0] + Math.cos(a) * 192, y1: C[1] + Math.sin(a) * 192, x2: C[0] + Math.cos(a) * 208, y2: C[1] + Math.sin(a) * 208, stroke: '#0A0A0A', 'stroke-width': 4 }));
    }
    svg.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 194, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 172, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    // Stator teeth with windings
    const windings = [];
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * 360;
      const g = ns('g', { transform: `rotate(${a} ${C[0]} ${C[1]})` });
      g.appendChild(ns('rect', { x: C[0] - 12, y: C[1] - 172, width: 24, height: 52, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1 }));
      g.appendChild(ns('rect', { x: C[0] - 16, y: C[1] - 122, width: 32, height: 6, fill: '#5E646A', stroke: '#0A0A0A', 'stroke-width': 1 }));
      const w = ns('rect', { x: C[0] - 22, y: C[1] - 166, width: 44, height: 38, fill: 'url(#m-copper)', stroke: '#0A0A0A', 'stroke-width': 1, rx: 4 });
      g.appendChild(w);
      const glow = ns('rect', { x: C[0] - 22, y: C[1] - 166, width: 44, height: 38, fill: ['#C2502A', '#1D6B55', '#3E6FB7'][i % 3], opacity: 0, rx: 4 });
      g.appendChild(glow);
      windings.push(glow);
      svg.appendChild(g);
    }
    // Air gap
    svg.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 114, fill: '#FFFFFF', stroke: '#C9C9C9', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
    // Rotor
    const rotor = ns('g');
    rotor.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 110, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    for (let i = 0; i < 8; i++) {
      const g = ns('g', { transform: `rotate(${i * 45} ${C[0]} ${C[1]})` });
      const north = i % 2 === 0;
      g.appendChild(ns('path', { d: `M ${C[0] - 38} ${C[1] - 106} A 110 110 0 0 1 ${C[0] + 38} ${C[1] - 106} L ${C[0] + 30} ${C[1] - 84} A 90 90 0 0 0 ${C[0] - 30} ${C[1] - 84} Z`, fill: north ? '#C2502A' : '#3E6FB7', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
      g.appendChild(txt(C[0], C[1] - 90, north ? 'N' : 'S', 'middle', 12, '#FFFFFF'));
      rotor.appendChild(g);
    }
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      rotor.appendChild(ns('circle', { cx: C[0] + Math.cos(a) * 55, cy: C[1] + Math.sin(a) * 55, r: 12, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1 }));
    }
    rotor.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 24, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    rotor.appendChild(ns('rect', { x: C[0] - 4, y: C[1] - 24, width: 8, height: 10, fill: '#0A0A0A' }));
    svg.appendChild(rotor);
    svg.appendChild(txt(20, 430, 'STATOR · 12 TEETH', 'start', 10));
    svg.appendChild(txt(580, 430, 'ROTOR · 8 POLES', 'end', 10));
    S._motor = { rotor, windings, deg: 0, C };
  },
  update: (dt) => {
    const m = S._motor;
    if (!m || !$('#cv-motor')) return;
    if (S.mode !== 'elec') {
      // Demo: drive a local rpm from the throttle when not in elec mode
      const target = S.rider.throttle * 10000;
      S.elec.rpm += (target - S.elec.rpm) * Math.min(1, 3 * dt);
    }
    if (S.running) m.deg = (m.deg + S.elec.rpm / 60 * 360 * dt / 60) % 360;
    m.rotor.setAttribute('transform', `rotate(${m.deg} ${m.C[0]} ${m.C[1]})`);
    const elecDeg = m.deg * 4;
    m.windings.forEach((w, i) => {
      const ph = (i % 3) * 120;
      const v = Math.max(0, Math.sin((elecDeg - ph) * Math.PI / 180));
      w.setAttribute('opacity', S.elec.rpm > 20 ? (v * 0.55).toFixed(2) : 0);
    });
    setStatus(S.elec.rpm > 20 ? 'Spinning' : 'Idle', S.elec.rpm > 20 ? 'Three-phase field rotates; magnets chase it.' : 'Rotor at rest. Hold THROTTLE to energise the stator.', `${Math.round(S.elec.rpm)} rpm`);
    setStat('m_rpm', Math.round(S.elec.rpm));
    setStat('m_tq', fmt(S.mode === 'elec' ? S.elec.torque : S.rider.throttle * 60));
    setStat('m_temp', fmt(S.elec.motor_temp));
    setStat('m_soc', fmt(S.elec.battery_soc, 1));
  },
};

/* ---------- Carburettor ---------- */
COMPONENT_VIEWS.carb = {
  title: 'Carburettor',
  kind: 'Fuel · Interactive',
  hold: { label: 'Gas', flag: 'carb_hold', hint: 'Press and hold' },
  html: () => `${statusHTML('Idle', 'Butterfly nearly closed. Air trickles past.', '900 rpm')}<svg class="ute-cv-svg" id="cv-carb" viewBox="0 0 600 340" role="img" aria-label="Carburettor cross-section"></svg>`,
  sideHTML: () => card('Live state', statsHTML([['c_thr', 'Throttle', '%'], ['c_air', 'Air', 'g/s'], ['c_fuel', 'Fuel', 'g/s']])) +
    card('Parts', list(['Venturi: narrow throat speeds air up, drops pressure.', 'Main jet: fuel is pulled up by that low pressure.', 'Float bowl: keeps the fuel level constant.', 'Butterfly: the throttle plate you open with your wrist.'])) +
    card('Target 14.7 : 1 AFR', '<p>Petrol burns completely at about <b>14.7 g of air per 1 g of fuel</b>. Richer (less air) is cooler and safer at full power; leaner saves fuel but runs hot.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-carb');
    const wall = (d) => svg.appendChild(ns('path', { d, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    wall('M 30 90 L 220 90 Q 300 126 380 90 L 570 90 L 570 106 L 380 106 Q 300 142 220 106 L 30 106 Z');
    wall('M 30 234 L 220 234 Q 300 198 380 234 L 570 234 L 570 250 L 380 250 Q 300 214 220 250 L 30 250 Z');
    svg.appendChild(ns('rect', { x: 30, y: 106, width: 540, height: 128, fill: 'none' }));
    // Bowl + jet
    svg.appendChild(ns('rect', { x: 240, y: 250, width: 120, height: 70, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('rect', { x: 246, y: 274, width: 108, height: 40, fill: '#E2A93B', opacity: 0.55 }));
    svg.appendChild(ns('rect', { x: 268, y: 266, width: 40, height: 14, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
    svg.appendChild(ns('rect', { x: 296, y: 200, width: 8, height: 74, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1 }));
    // Flow area labels
    svg.appendChild(txt(40, 76, 'AIR IN →', 'start', 10, '#3E6FB7'));
    svg.appendChild(txt(560, 76, 'TO ENGINE →', 'end', 10));
    svg.appendChild(txt(300, 336, 'FLOAT BOWL', 'middle', 10));
    svg.appendChild(txt(300, 160, 'VENTURI', 'middle', 10));
    svg.appendChild(txt(318, 196, 'JET', 'start', 9));
    const pg = ns('g');
    svg.appendChild(pg);
    // Butterfly
    const plate = ns('g');
    plate.appendChild(ns('line', { x1: 450, y1: 112, x2: 450, y2: 228, stroke: '#0A0A0A', 'stroke-width': 6, 'stroke-linecap': 'round' }));
    plate.appendChild(ns('circle', { cx: 450, cy: 170, r: 6, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    svg.appendChild(plate);
    svg.appendChild(txt(450, 76, 'BUTTERFLY', 'middle', 10, '#C2502A'));
    S._carb = { pg, plate, spawn: 0, fspawn: 0 };
  },
  update: (dt) => {
    const c = S._carb;
    if (!c || !$('#cv-carb')) return;
    S.cv.carb_pct = S.cv.carb_hold ? Math.min(1, S.cv.carb_pct + 1.6 * dt) : Math.max(0, S.cv.carb_pct - 1.2 * dt);
    const pct = Math.max(S.cv.carb_pct, S.rider.throttle);
    c.plate.setAttribute('transform', `rotate(${-8 - pct * 78} 450 170)`);
    const rate = 6 + pct * 70;
    c.spawn += rate * dt;
    while (c.spawn > 1) { c.spawn -= 1; S.cv.particles.push({ x: 34, y: 112 + Math.random() * 116, fuel: false, el: null }); }
    if (pct > 0.04) {
      c.fspawn += pct * 25 * dt;
      while (c.fspawn > 1) { c.fspawn -= 1; S.cv.particles.push({ x: 300, y: 196, fuel: true, el: null }); }
    }
    const speed = 50 + pct * 360;
    S.cv.particles.forEach((pt) => {
      let v = speed;
      if (pt.x > 418 && pt.x < 452) v *= (0.04 + pct);
      if (pt.x > 452) v = speed;
      pt.x += v * dt;
      // Squeeze toward the centreline through the venturi
      const vent = Math.max(0, 1 - Math.abs(pt.x - 300) / 90);
      pt.y += (170 - pt.y) * vent * 1.2 * dt * (pct + 0.3);
      if (pt.fuel) pt.y += (170 - pt.y) * 2 * dt;
      if (!pt.el) {
        pt.el = ns('circle', { r: pt.fuel ? 2.4 : 3, fill: pt.fuel ? '#E2A93B' : '#3E6FB7', opacity: 0.8 });
        c.pg.appendChild(pt.el);
      }
      pt.el.setAttribute('cx', pt.x.toFixed(1));
      pt.el.setAttribute('cy', pt.y.toFixed(1));
    });
    S.cv.particles = S.cv.particles.filter((pt) => {
      const keep = pt.x < 566 && S.cv.particles.length < 400;
      if (!keep && pt.el) pt.el.remove();
      return keep;
    });
    const air = 0.4 + pct * 11.6;
    const rpm = 900 + pct * 7000;
    setStatus(pct > 0.6 ? 'Wide open' : pct > 0.05 ? 'Opening' : 'Idle', pct > 0.05 ? 'Low pressure in the venturi pulls fuel up the jet.' : 'Butterfly nearly closed. Air trickles past.', `${Math.round(rpm)} rpm`);
    setStat('c_thr', Math.round(pct * 100));
    setStat('c_air', fmt(air, 1));
    setStat('c_fuel', fmt(air / 14.7, 2));
  },
};

/* ---------- Spark plug / ignition ---------- */
COMPONENT_VIEWS.spark_plug = {
  title: 'Spark plug & ignition',
  kind: 'Ignition · Interactive',
  hold: { label: 'Ignite', flag: 'spark_hold', hint: 'Hold to charge · release to fire' },
  html: () => `${statusHTML('Ready', 'Hold IGNITE to charge the coil, release to fire.', '0 %')}<svg class="ute-cv-svg" id="cv-spark" viewBox="0 0 640 380" role="img" aria-label="Ignition circuit"></svg>`,
  sideHTML: () => card('How', '<p>The coil is a transformer. 12 V flows through a few hundred primary turns and builds a magnetic field. Cut it, and the field collapses through ~20 000 secondary turns, and <b>~25 000 V</b> jumps the plug gap.</p>') +
    card('Parts', list(['Battery: 12 V supply', 'Coil: primary + secondary windings', 'HT lead: insulated high-tension wire', 'Plug: centre and earth electrodes, about 0.7 mm gap'])) +
    card('Timing', `<p>${S.mode === '2t' ? 'A two-stroke fires <b>every revolution</b>.' : 'A four-stroke fires <b>once every two revolutions</b>, just before TDC on the compression stroke.'}</p>` + statsHTML([['s_kv', 'Last spark', 'kV'], ['s_n', 'Sparks', '']])),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-spark');
    svg.appendChild(iso3DBox(40, 250, 90, 60, 30, { front: '#2A2826', top: '#4A4642', right: '#1A1816' }));
    svg.appendChild(txt(85, 286, '12 V', 'middle', 13, '#FFFFFF'));
    svg.appendChild(ns('rect', { x: 52, y: 236, width: 14, height: 8, fill: '#C2502A', stroke: '#0A0A0A' }));
    svg.appendChild(ns('path', { d: 'M 59 236 L 59 200 L 190 200', fill: 'none', stroke: '#C2502A', 'stroke-width': 3 }));
    // Coil
    svg.appendChild(ns('rect', { x: 180, y: 120, width: 100, height: 160, fill: 'url(#m-case)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('rect', { x: 222, y: 128, width: 16, height: 144, fill: 'url(#m-steel)', stroke: '#0A0A0A' }));
    for (let i = 0; i < 6; i++) svg.appendChild(ns('ellipse', { cx: 230, cy: 150 + i * 22, rx: 30, ry: 7, fill: 'none', stroke: '#C2703F', 'stroke-width': 4 }));
    for (let i = 0; i < 24; i++) svg.appendChild(ns('ellipse', { cx: 230, cy: 138 + i * 5.5, rx: 42, ry: 4, fill: 'none', stroke: '#8A4520', 'stroke-width': 1 }));
    svg.appendChild(txt(230, 110, 'COIL', 'middle', 10));
    svg.appendChild(txt(230, 300, 'PRIMARY ▪ SECONDARY', 'middle', 9));
    const bar = ns('rect', { x: 180, y: 314, width: 0, height: 12, fill: '#C2502A' });
    svg.appendChild(ns('rect', { x: 180, y: 314, width: 100, height: 12, fill: '#FFFFFF', stroke: '#0A0A0A' }));
    svg.appendChild(bar);
    svg.appendChild(txt(230, 344, 'CHARGE', 'middle', 9));
    // HT lead
    svg.appendChild(ns('path', { d: 'M 280 140 C 360 120, 360 40, 470 46', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 8, 'stroke-linecap': 'round' }));
    svg.appendChild(ns('path', { d: 'M 280 140 C 360 120, 360 40, 470 46', fill: 'none', stroke: '#C2502A', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    // Plug
    const X = 490;
    svg.appendChild(ns('rect', { x: X - 18, y: 36, width: 36, height: 22, fill: '#2A2826', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    svg.appendChild(ns('rect', { x: X - 14, y: 58, width: 28, height: 70, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    for (let i = 0; i < 4; i++) svg.appendChild(ns('line', { x1: X - 14, x2: X + 14, y1: 66 + i * 12, y2: 66 + i * 12, stroke: '#C9C9C9' }));
    svg.appendChild(hexBolt(X, 140, 22));
    svg.appendChild(ns('rect', { x: X - 16, y: 154, width: 32, height: 40, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    for (let i = 0; i < 6; i++) svg.appendChild(ns('line', { x1: X - 16, x2: X + 16, y1: 158 + i * 6, y2: 162 + i * 6, stroke: '#0A0A0A', 'stroke-width': 0.8 }));
    svg.appendChild(ns('rect', { x: X - 3, y: 194, width: 6, height: 20, fill: 'url(#m-chrome)', stroke: '#0A0A0A' }));
    svg.appendChild(ns('path', { d: `M ${X + 16} 194 L ${X + 16} 228 L ${X - 4} 228`, fill: 'none', stroke: '#5E646A', 'stroke-width': 5 }));
    // Chamber
    svg.appendChild(ns('path', { d: `M 400 194 L ${X - 16} 194 M ${X + 16} 194 L 580 194 M 400 194 L 400 340 M 580 194 L 580 340`, stroke: '#0A0A0A', 'stroke-width': 3, fill: 'none' }));
    const gas = ns('rect', { x: 402, y: 196, width: 176, height: 96, fill: '#D9C99A', opacity: 0.6 });
    const flash = ns('rect', { x: 402, y: 196, width: 176, height: 96, fill: '#C2502A', opacity: 0 });
    svg.appendChild(gas); svg.appendChild(flash);
    svg.appendChild(ns('rect', { x: 404, y: 292, width: 172, height: 46, fill: 'url(#m-piston)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    const arc = ns('path', { d: `M ${X} 214 l -6 4 l 8 3 l -7 3 l 5 4`, fill: 'none', stroke: '#E2A93B', 'stroke-width': 3, opacity: 0, 'stroke-linejoin': 'round' });
    const glow = ns('circle', { cx: X, cy: 221, r: 26, fill: 'url(#m-flash)', opacity: 0 });
    svg.appendChild(glow); svg.appendChild(arc);
    svg.appendChild(txt(X + 30, 30, 'SPARK PLUG', 'start', 10));
    svg.appendChild(txt(590, 250, 'CHAMBER', 'start', 10));
    S._spark = { bar, arc, glow, flash, n: 0 };
  },
  update: () => {
    const sp = S._spark;
    if (!sp || !$('#cv-spark')) return;
    const now = performance.now();
    const dt = S._dt || 0.016;
    if (S.cv.spark_hold) {
      S.cv.charge = Math.min(100, S.cv.charge + 85 * dt);
      S.cv.charge_was = true;
      setStatus('Charging', 'Current builds a magnetic field in the primary winding.', `${Math.round(S.cv.charge)} %`);
    } else if (S.cv.charge_was) {
      S.cv.charge_was = false;
      if (S.cv.charge >= 50) {
        S.cv.charge_fire_t = now;
        S.cv.fire_kv = 12 + S.cv.charge / 100 * 13;
        sp.n++;
        setStat('s_kv', fmt(S.cv.fire_kv, 1));
        setStat('s_n', sp.n);
        setStatus('Fired!', 'Field collapses: ~25 kV jumps the gap and lights the charge.', `${fmt(S.cv.fire_kv, 1)} kV`);
      } else {
        S.cv.misfire_t = now;
        setStatus('Misfire', 'Not enough charge (< 50 %). The spark was too weak to jump the gap.', `${Math.round(S.cv.charge)} %`);
      }
      S.cv.charge = 0;
    }
    sp.bar.setAttribute('width', S.cv.charge);
    const since = now - S.cv.charge_fire_t;
    const f = S.cv.charge_fire_t > 0 && since < 400 ? 1 - since / 400 : 0;
    sp.arc.setAttribute('opacity', f > 0 ? 1 : 0);
    if (f > 0) sp.arc.setAttribute('d', `M 490 214 l ${-4 - Math.random() * 6} 4 l ${6 + Math.random() * 6} 3 l ${-5 - Math.random() * 5} 3 l 5 4`);
    sp.glow.setAttribute('opacity', f);
    sp.flash.setAttribute('opacity', f * 0.75);
    if (!S.cv.spark_hold && since > 1500 && now - S.cv.misfire_t > 1500 && S.cv.charge === 0) setStatus('Ready', 'Hold IGNITE to charge the coil, release to fire.', '0 %');
  },
};

/* ---------- Chain + gearing ---------- */
function gearPath(cx, cy, r, teeth, depth) {
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a0 = i / teeth * Math.PI * 2, a1 = (i + 0.25) / teeth * Math.PI * 2, a2 = (i + 0.5) / teeth * Math.PI * 2, a3 = (i + 0.75) / teeth * Math.PI * 2;
    const P = (a, rr) => `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
    d += `${i === 0 ? 'M' : 'L'} ${P(a0, r - depth)} L ${P(a1, r)} L ${P(a2, r)} L ${P(a3, r - depth)} `;
  }
  return d + 'Z';
}
COMPONENT_VIEWS.chain = {
  title: 'Chain & final drive',
  kind: 'Transmission · Interactive',
  hold: { label: 'Rev', flag: 'gear_hold', hint: 'Press and hold' },
  html: () => `${statusHTML('Stopped', 'Hold REV to spin the engine and drive the rear wheel.', '0 rpm')}<svg class="ute-cv-svg" id="cv-chain" viewBox="0 0 700 360" role="img" aria-label="Chain drive"></svg>`,
  sideHTML: () => card('Live gearing', statsHTML([['g_eng', 'Engine', 'rpm'], ['g_whl', 'Wheel', 'rpm'], ['g_ms', 'Chain', 'm/s'], ['g_kmh', 'Speed', 'km/h'], ['g_ratio', 'Final ratio', ':1']])) +
    card('Parts', list(['Front (output) sprocket: 15 teeth', 'Chain: 428 pitch, as on the K-Light 125', 'Rear sprocket: 39 teeth', 'Primary drive + gearbox before it'])) +
    card('Rule', '<p><b>Smaller rear sprocket</b> = higher top speed, softer pull. <b>Bigger rear sprocket</b> = quicker acceleration, lower top speed. One tooth at the front ≈ three at the back.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-chain');
    const FR = [230, 180], RR = [520, 180];
    svg.appendChild(iso3DBox(20, 110, 150, 140, 40, { front: '#BDBDBD', top: '#E8E8E8', right: '#7A7A7A' }));
    svg.appendChild(txt(95, 186, 'ENGINE', 'middle', 11, '#0A0A0A'));
    svg.appendChild(txt(95, 202, '+ GEARBOX', 'middle', 9, '#2A2826'));
    // Wheel
    const wheelG = ns('g');
    wheelG.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 160, fill: 'url(#m-tyre)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    wheelG.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 138, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    const spokes = ns('g');
    for (let i = 0; i < 24; i++) {
      const a = i / 24 * Math.PI * 2;
      spokes.appendChild(ns('line', { x1: RR[0] + Math.cos(a) * 20, y1: RR[1] + Math.sin(a) * 20, x2: RR[0] + Math.cos(a + 0.4) * 132, y2: RR[1] + Math.sin(a + 0.4) * 132, stroke: '#8E867A', 'stroke-width': 1.2 }));
    }
    spokes.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 132, fill: 'none', stroke: 'url(#m-chrome)', 'stroke-width': 6 }));
    wheelG.appendChild(spokes);
    svg.appendChild(wheelG);
    // Rear sprocket
    const rs = ns('g');
    rs.appendChild(ns('path', { d: gearPath(RR[0], RR[1], 70, 39, 6), fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      rs.appendChild(ns('circle', { cx: RR[0] + Math.cos(a) * 40, cy: RR[1] + Math.sin(a) * 40, r: 13, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
    }
    rs.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 14, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    svg.appendChild(rs);
    // Chain
    const chainD = `M ${FR[0]} ${FR[1] - 28} L ${RR[0]} ${RR[1] - 70} A 70 70 0 0 1 ${RR[0]} ${RR[1] + 70} L ${FR[0]} ${FR[1] + 28} A 28 28 0 0 1 ${FR[0]} ${FR[1] - 28} Z`;
    svg.appendChild(ns('path', { d: chainD, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 9 }));
    const hatch = ns('path', { d: chainD, fill: 'none', stroke: '#C9C9C9', 'stroke-width': 5, 'stroke-dasharray': '6 4' });
    svg.appendChild(hatch);
    // Front sprocket
    const fs = ns('g');
    fs.appendChild(ns('path', { d: gearPath(FR[0], FR[1], 28, 15, 5), fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    fs.appendChild(ns('circle', { cx: FR[0], cy: FR[1], r: 8, fill: '#1A1816' }));
    fs.appendChild(ns('rect', { x: FR[0] - 2, y: FR[1] - 22, width: 4, height: 10, fill: '#C2502A' }));
    svg.appendChild(fs);
    svg.appendChild(txt(FR[0], 240, '15T', 'middle', 10));
    svg.appendChild(txt(RR[0], RR[1] + 96, '39T', 'middle', 10));
    S._chain = { fs, rs, spokes, hatch, FR, RR, fdeg: 0, rdeg: 0, off: 0 };
  },
  update: (dt) => {
    const c = S._chain;
    if (!c || !$('#cv-chain')) return;
    S.cv.gear_rpm = S.cv.gear_hold ? Math.min(8000, S.cv.gear_rpm + (8000 - S.cv.gear_rpm) * 1.2 * dt + 600 * dt) : Math.max(0, S.cv.gear_rpm - 2600 * dt);
    const ratio = 39 / 15;
    // Live: the rear wheel turns with the cockpit's road speed; otherwise REV drives it through third gear.
    const liveWhl = S.speed / 3.6 / (2 * Math.PI * GEAR.wheel_r_m) * 60;
    const demoSpr = S.cv.gear_rpm / (GEAR.primary * GEAR.gear3);
    const useLive = liveWhl * ratio >= demoSpr;
    const sprRPM = useLive ? liveWhl * ratio : demoSpr;
    const whlRPM = sprRPM / ratio;
    const eng = useLive ? (S.mode === 'elec' ? S.elec.rpm : (S.live ? S.rpm : 0)) : S.cv.gear_rpm;
    const fstep = sprRPM / 60 * 360 * dt / 30;
    c.fdeg = (c.fdeg + fstep) % 360;
    c.rdeg = (c.rdeg + fstep / ratio) % 360;
    c.off = (c.off - fstep * Math.PI / 180 * 28) % 1000;
    c.fs.setAttribute('transform', `rotate(${c.fdeg} ${c.FR[0]} ${c.FR[1]})`);
    c.rs.setAttribute('transform', `rotate(${c.rdeg} ${c.RR[0]} ${c.RR[1]})`);
    c.spokes.setAttribute('transform', `rotate(${c.rdeg} ${c.RR[0]} ${c.RR[1]})`);
    c.hatch.setAttribute('stroke-dashoffset', c.off.toFixed(1));
    const chainMS = sprRPM / 60 * 15 * 0.015875;
    const kmh = kmhFromWheelRPM(whlRPM);
    setStatus(whlRPM > 1 ? (useLive && liveWhl > 1 ? 'Riding' : 'Driving') : 'Stopped', whlRPM > 1 ? 'Front sprocket pulls the chain; the big rear sprocket turns 2.6× slower.' : 'Hold REV, or ride in the cockpit below, to drive the rear wheel.', `${Math.round(whlRPM)} wheel rpm`);
    setStat('g_eng', Math.round(eng));
    setStat('g_whl', Math.round(whlRPM));
    setStat('g_ms', fmt(chainMS, 1));
    setStat('g_kmh', fmt(kmh));
    setStat('g_ratio', fmt(ratio, 2));
  },
};
COMPONENT_VIEWS.rear_sprocket = Object.assign({}, COMPONENT_VIEWS.chain, { title: 'Rear sprocket & chain' });

/* ---------- Brake ---------- */
COMPONENT_VIEWS.brake = {
  title: 'Front disc brake',
  kind: 'Chassis · Interactive',
  hold: { label: 'Brake', flag: 'brake_hold', hint: 'Press and hold' },
  html: () => `${statusHTML('Rolling', 'Disc spins with the wheel. Hold BRAKE to squeeze the pads.', '0 bar')}<svg class="ute-cv-svg" id="cv-brake" viewBox="0 0 660 400" role="img" aria-label="Disc brake and caliper section"></svg>`,
  sideHTML: () => card('Live state', statsHTML([['b_bar', 'Line pressure', 'bar'], ['b_sq', 'Pad squeeze', '%'], ['b_t', 'Disc temp', '°C'], ['b_pad', 'Pad left', 'mm']])) +
    card('Parts', list(['Lever + master cylinder: your hand makes pressure', 'Brake line: carries incompressible fluid', 'Caliper pistons: push pads onto the disc', 'Disc: turns motion into heat'])) +
    card('How', '<p>Hydraulics multiply force: a small master piston pushes fluid into bigger caliper pistons, so a 2-finger pull becomes a clamp of over <b>10 kN</b>. Friction converts the bike\'s kinetic energy into heat in the disc.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-brake');
    const C = [230, 200];
    const disc = ns('g');
    disc.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 160, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    disc.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 92, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    for (let ring = 0; ring < 2; ring++) {
      for (let i = 0; i < 24; i++) {
        const a = (i + ring * 0.5) / 24 * Math.PI * 2;
        const rr = 112 + ring * 24;
        disc.appendChild(ns('circle', { cx: C[0] + Math.cos(a) * rr, cy: C[1] + Math.sin(a) * rr, r: 4, fill: '#2A2826' }));
      }
    }
    // Carrier
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      disc.appendChild(ns('path', { d: `M ${C[0] + Math.cos(a) * 30} ${C[1] + Math.sin(a) * 30} L ${C[0] + Math.cos(a) * 92} ${C[1] + Math.sin(a) * 92}`, stroke: '#8E867A', 'stroke-width': 12, 'stroke-linecap': 'round' }));
      disc.appendChild(hexBolt(C[0] + Math.cos(a) * 92, C[1] + Math.sin(a) * 92, 6));
    }
    disc.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 30, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    disc.appendChild(ns('rect', { x: C[0] - 3, y: C[1] - 160, width: 6, height: 20, fill: '#C2502A' }));
    const heat = ns('circle', { cx: C[0], cy: C[1], r: 140, fill: 'none', stroke: '#C2502A', 'stroke-width': 40, opacity: 0 });
    svg.appendChild(disc);
    svg.appendChild(heat);
    // Caliper on disc (side view)
    svg.appendChild(ns('path', { d: `M ${C[0] + 112} ${C[1] - 70} Q ${C[0] + 190} ${C[1] - 60} ${C[0] + 190} ${C[1]} Q ${C[0] + 190} ${C[1] + 60} ${C[0] + 112} ${C[1] + 70} L ${C[0] + 128} ${C[1]} Z`, fill: '#B8322A', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(txt(C[0] + 160, C[1] + 100, 'CALIPER', 'middle', 10));
    // Section A-A
    const SX = 540;
    svg.appendChild(txt(SX, 60, 'SECTION A-A', 'middle', 10, '#0A0A0A'));
    svg.appendChild(ns('path', { d: `M ${SX - 80} 90 L ${SX + 80} 90 L ${SX + 80} 320 L ${SX - 80} 320 Z`, fill: '#F2F2F2', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('rect', { x: SX - 6, y: 70, width: 12, height: 270, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    const mk = (side) => {
      const g = ns('g');
      const x = side < 0 ? SX - 70 : SX + 22;
      g.appendChild(ns('rect', { x, y: 130, width: 48, height: 40, fill: '#E8E8E8', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      g.appendChild(ns('rect', { x, y: 240, width: 48, height: 40, fill: '#E8E8E8', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      g.appendChild(ns('rect', { x: side < 0 ? SX - 22 : SX + 6, y: 120, width: 16, height: 170, fill: '#5E646A', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
      svg.appendChild(g);
      return g;
    };
    const L = mk(-1), Rr = mk(1);
    // Fluid
    const fluid = ns('rect', { x: SX - 78, y: 92, width: 156, height: 10, fill: '#E2A93B', opacity: 0.3 });
    svg.appendChild(fluid);
    svg.appendChild(txt(SX - 48, 352, 'PISTON + PAD', 'middle', 9));
    svg.appendChild(txt(SX + 48, 352, 'PISTON + PAD', 'middle', 9));
    svg.appendChild(txt(SX, 372, 'DISC', 'middle', 9));
    S._brake = { disc, heat, L, Rr, C, deg: 0 };
  },
  update: (dt) => {
    const b = S._brake;
    if (!b || !$('#cv-brake')) return;
    S.cv.brake_pct = S.cv.brake_hold ? Math.min(1, S.cv.brake_pct + 3 * dt) : Math.max(0, S.cv.brake_pct - 2.5 * dt);
    const pct = Math.max(S.cv.brake_pct, S.rider.brake);
    // The disc turns with the front wheel (shown 10x slower); parked, it idles slowly so the squeeze reads.
    const wheelDeg = S.speed / 3.6 / (2 * Math.PI * GEAR.wheel_r_m) * 360 / 10;
    const spin = S.speed > 0.5 ? wheelDeg : 90 * (1 - pct * 0.97);
    b.deg = (b.deg + spin * dt) % 360;
    b.disc.setAttribute('transform', `rotate(${b.deg} ${b.C[0]} ${b.C[1]})`);
    S._brakeSpin = spin;
    b.L.setAttribute('transform', `translate(${pct * 10} 0)`);
    b.Rr.setAttribute('transform', `translate(${-pct * 10} 0)`);
    S.cv.disc_temp += (pct * (S.speed > 0.5 ? S.speed * 6 : spin * 1.4) - (S.cv.disc_temp - 40) * 0.15) * dt;
    S.cv.disc_temp = clamp(S.cv.disc_temp, 40, 650);
    S.cv.brakeT += dt;
    const tr = S.cv.brakeTrace; if (!tr.length || S.cv.brakeT - tr[tr.length - 1][0] > 0.2) { tr.push([S.cv.brakeT, S.cv.disc_temp]); while (tr.length && tr[0][0] < S.cv.brakeT - 30) tr.shift(); }
    S.cv.pad_mm = Math.max(1, S.cv.pad_mm - pct * spin * 0.00002 * dt);
    b.heat.setAttribute('opacity', clamp((S.cv.disc_temp - 80) / 500, 0, 0.45).toFixed(2));
    setStatus(pct > 0.05 ? 'Braking' : 'Rolling', pct > 0.05 ? 'Pistons squeeze the pads; friction turns speed into heat.' : 'Disc spins with the wheel. Hold BRAKE to squeeze the pads.', `${fmt(pct * 25, 1)} bar`);
    setStat('b_bar', fmt(pct * 25, 1));
    setStat('b_sq', Math.round(pct * 100));
    setStat('b_t', Math.round(S.cv.disc_temp));
    setStat('b_pad', fmt(S.cv.pad_mm, 2));
  },
};

/* ---------- Battery ---------- */
COMPONENT_VIEWS.battery = {
  get title() { return S.mode === 'elec' ? 'High-voltage battery pack' : '12 V battery'; },
  kind: 'Electrical · Static',
  html: () => {
    const el = S.mode === 'elec';
    return `${statusHTML(el ? 'HV pack' : 'Starter battery', el ? '400 V · ~12 kWh · ~96 cells in series' : '12 V · 8–14 Ah · 120 A cold crank', el ? `${fmt(S.elec.battery_soc, 1)} %` : '12.6 V')}<svg class="ute-cv-svg" id="cv-batt" viewBox="0 0 640 380" role="img" aria-label="Battery"></svg>`;
  },
  sideHTML: () => {
    const el = S.mode === 'elec';
    return card('Spec', statsHTML(el ? [['bt_v', 'Voltage', 'V'], ['bt_e', 'Energy', 'kWh'], ['bt_c', 'Cells', 's']] : [['bt_v', 'Voltage', 'V'], ['bt_e', 'Capacity', 'Ah'], ['bt_c', 'Cold crank', 'A']])) +
      card('Role', el ? '<p>The fuel tank of an EV. Lithium-ion cells in series add up their voltage; a BMS watches each cell\'s voltage and temperature.</p>' : '<p>Only needed to crank the starter and run electrics when the engine is off. Once running, the alternator takes over and recharges it.</p>') +
      card('Charge', el ? '<p><b>DC fast:</b> ~30 min to 80 %.<br><b>Home AC:</b> 4–8 h overnight.</p>' : '<p>The alternator charges it while riding. Over winter, keep it on a <b>trickle charger</b>.</p>');
  },
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-batt');
    const el = S.mode === 'elec';
    if (el) {
      svg.appendChild(iso3DBox(90, 90, 400, 220, 80, { front: '#2B2F33', top: '#4A5056', right: '#1A1D20' }));
      for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) svg.appendChild(ns('circle', { cx: 112 + c * 32, cy: 124 + r * 34, r: 12, fill: '#1D6B55', stroke: '#0A0A0A', 'stroke-width': 1, opacity: 0.85 }));
      svg.appendChild(ns('rect', { x: 200, y: 262, width: 180, height: 36, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      svg.appendChild(txt(290, 285, 'HV PACK · 400 V', 'middle', 12, '#1D6B55'));
      for (let i = 0; i < 7; i++) svg.appendChild(ns('line', { x1: 500 + i * 8, y1: 120 - i * 4, x2: 500 + i * 8, y2: 280 - i * 4, stroke: '#5A5F66', 'stroke-width': 2 }));
      svg.appendChild(ns('rect', { x: 130, y: 50, width: 30, height: 20, fill: '#C2502A', stroke: '#0A0A0A' }));
      svg.appendChild(ns('rect', { x: 200, y: 50, width: 30, height: 20, fill: '#0A0A0A', stroke: '#0A0A0A' }));
      setStat('bt_v', 400); setStat('bt_e', 12); setStat('bt_c', 96);
    } else {
      svg.appendChild(iso3DBox(170, 120, 260, 180, 80, { front: '#2A2826', top: '#4A4642', right: '#1A1816' }));
      svg.appendChild(ns('rect', { x: 200, y: 70, width: 34, height: 26, fill: '#C2502A', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      svg.appendChild(ns('rect', { x: 360, y: 70, width: 34, height: 26, fill: '#6B6963', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      svg.appendChild(txt(217, 64, '+', 'middle', 16, '#C2502A'));
      svg.appendChild(txt(377, 64, '−', 'middle', 16, '#0A0A0A'));
      svg.appendChild(ns('rect', { x: 210, y: 180, width: 180, height: 60, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      svg.appendChild(txt(300, 208, '12 V', 'middle', 18, '#0A0A0A'));
      svg.appendChild(txt(300, 228, '6 CELLS × 2.1 V', 'middle', 10));
      setStat('bt_v', 12.6); setStat('bt_e', 12); setStat('bt_c', 120);
    }
  },
  update: () => { if (S.mode === 'elec') setStatus(null, null, `${fmt(S.elec.battery_soc, 1)} %`); },
};

/* ---------- Controller ---------- */
COMPONENT_VIEWS.controller = {
  title: 'Motor controller (inverter)',
  kind: 'Electric · Interactive',
  hold: { label: 'Throttle', flag: 'rider_throttle', hint: 'Press and hold' },
  html: () => `${statusHTML('Standby', 'DC bus live. MOSFETs off until you ask for torque.', '8–20 kHz')}<svg class="ute-cv-svg" id="cv-ctrl" viewBox="0 0 640 380" role="img" aria-label="Controller internals"></svg>`,
  sideHTML: () => card('Live state', statsHTML([['k_t', 'Temp', '°C'], ['k_v', 'DC input', 'V'], ['k_l', 'Load', '%'], ['k_f', 'Switching', 'kHz']])) +
    card('Parts', list(['6 SiC MOSFETs: 2 per phase', 'Gate driver: flips them on/off', 'DC-link capacitor: smooths the bus', 'MCU: reads throttle + rotor angle', 'Cold plate: carries heat away'])) +
    card('How', '<p>It <b>chops DC into three-phase AC</b> by switching the MOSFETs thousands of times a second (typically 8 to 20 kHz). Longer "on" pulses mean more current, more torque. The pattern\'s rhythm sets motor speed.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-ctrl');
    svg.appendChild(ns('rect', { x: 60, y: 260, width: 520, height: 40, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    for (let i = 0; i < 26; i++) svg.appendChild(ns('rect', { x: 66 + i * 20, y: 300, width: 8, height: 50, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1 }));
    svg.appendChild(ns('rect', { x: 80, y: 60, width: 480, height: 200, fill: '#1D3B33', stroke: '#0A0A0A', 'stroke-width': 2 }));
    const fets = [];
    const colors = ['#C2502A', '#1D6B55', '#2A2826'];
    for (let ph = 0; ph < 3; ph++) {
      for (let hl = 0; hl < 2; hl++) {
        const x = 110 + ph * 150, y = 90 + hl * 80;
        svg.appendChild(ns('rect', { x, y, width: 80, height: 50, fill: '#2A2826', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
        svg.appendChild(ns('rect', { x: x + 6, y: y + 6, width: 68, height: 8, fill: colors[ph], stroke: '#0A0A0A', 'stroke-width': 1 }));
        for (let l = 0; l < 3; l++) svg.appendChild(ns('rect', { x: x + 14 + l * 22, y: y + 50, width: 6, height: 12, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 0.8 }));
        const glow = ns('rect', { x, y, width: 80, height: 50, fill: '#E2A93B', opacity: 0 });
        svg.appendChild(glow);
        fets.push({ glow, ph, hl });
        svg.appendChild(txt(x + 40, y + 34, `${'UVW'[ph]}${hl ? '−' : '+'}`, 'middle', 11, '#FFFFFF'));
      }
    }
    svg.appendChild(ns('rect', { x: 100, y: 236, width: 440, height: 8, fill: '#C2502A', stroke: '#0A0A0A' }));
    svg.appendChild(ns('rect', { x: 100, y: 248, width: 440, height: 8, fill: '#0A0A0A' }));
    svg.appendChild(txt(320, 30, 'DC IN (400 V) → 3-PHASE AC OUT', 'middle', 11, '#0A0A0A'));
    svg.appendChild(txt(320, 374, 'COLD PLATE · FINS', 'middle', 9));
    S._ctrl = { fets, t: 0 };
  },
  update: (dt) => {
    const c = S._ctrl;
    if (!c || !$('#cv-ctrl')) return;
    if (S.mode !== 'elec') {
      const target = S.rider.throttle * 10000;
      S.elec.rpm += (target - S.elec.rpm) * Math.min(1, 3 * dt);
      S.elec.controller_temp += (50 + S.rider.throttle * 40 - S.elec.controller_temp) * 0.3 * dt;
    }
    c.t += dt * (S.elec.rpm / 1000 + 0.0001);
    c.fets.forEach((f) => {
      const v = Math.sin(c.t * 2 * Math.PI - f.ph * 2 * Math.PI / 3);
      const on = f.hl === 0 ? v > 0.3 : v < -0.3;
      f.glow.setAttribute('opacity', S.elec.rpm > 30 && on ? 0.5 : 0);
    });
    const load = S.rider.throttle;
    setStatus(load > 0.03 ? 'Switching' : 'Standby', load > 0.03 ? 'High-side and low-side MOSFETs alternate per phase.' : 'DC bus live. MOSFETs off until you ask for torque.', '8–20 kHz');
    setStat('k_t', fmt(S.elec.controller_temp));
    setStat('k_v', Math.round(400 - load * 18));
    setStat('k_l', Math.round(load * 100));
    setStat('k_f', 16);
  },
};

/* ---------- Wiring + electrical ---------- */
const WIRE_COLORS = {
  v12: { stroke: '#D23C2C', dash: null, w: 3, label: '+12 V' },
  gnd: { stroke: '#0A0A0A', dash: null, w: 2.5, label: 'Ground' },
  hv:  { stroke: '#1D6B55', dash: '9 5', w: 4, label: 'HV DC' },
  ac:  { stroke: '#E2A93B', dash: null, w: 3.5, label: 'AC phase' },
  sig: { stroke: '#3E6FB7', dash: '4 4', w: 1.8, label: 'Signal' },
};
const WIRING = {
  ice: {
    nodes: [
      { k: 'alt', x: 40, y: 40, t: 'Alternator', s: '~14 V AC', specs: [['Output', '3-phase AC'], ['Power', '~250 W'], ['Driven by', 'Crankshaft']] },
      { k: 'reg', x: 220, y: 40, t: 'Rectifier / reg.', s: '14.4 V DC', specs: [['In', 'AC from stator'], ['Out', '13.8–14.6 V DC'], ['Job', 'AC→DC + caps voltage']] },
      { k: 'bat', x: 40, y: 180, t: 'Battery', s: '12 V', specs: [['Voltage', '12.6 V rested'], ['Capacity', '8–14 Ah'], ['Cold crank', '120 A']] },
      { k: 'fuse', x: 220, y: 180, t: 'Main fuse', s: '30 A', specs: [['Rating', '30 A'], ['Job', 'Blows before wires burn']] },
      { k: 'ign', x: 400, y: 180, t: 'Ignition switch', s: 'key', specs: [['Positions', 'OFF / ON'], ['Feeds', 'All switched circuits']] },
      { k: 'ecu', x: 580, y: 180, t: 'ECU', s: '5 V logic', specs: [['Reads', 'Crank, throttle, temp'], ['Controls', 'Spark + injector'], ['Supply', '12 V → 5 V']] },
      { k: 'coil', x: 760, y: 180, t: 'Ignition coil', s: '25 000 V', specs: [['Primary', '12 V · ~4 A'], ['Secondary', '~25 kV'], ['Ratio', '~1:100']] },
      { k: 'plug', x: 760, y: 320, t: 'Spark plug', s: '0.7 mm gap', specs: [['Voltage', '~25 kV'], ['Gap', '0.6–0.8 mm']] },
      { k: 'start', x: 40, y: 320, t: 'Starter motor', s: '~100 A', specs: [['Current', '80–150 A'], ['Power', '~0.6 kW'], ['Via', 'Starter relay']] },
      { k: 'head', x: 400, y: 320, t: 'Headlight', s: '55 W', specs: [['Power', '55 W'], ['Current', '4.6 A @ 12 V'], ['Resistance', '~2.6 Ω hot']] },
      { k: 'tail', x: 580, y: 320, t: 'Tail / brake', s: '5 / 21 W', specs: [['Tail', '5 W · 0.4 A'], ['Brake', '21 W · 1.75 A']] },
      { k: 'horn', x: 400, y: 440, t: 'Horn', s: '~3 A', specs: [['Current', '2–4 A'], ['Sound', '~110 dB']] },
      { k: 'inst', x: 580, y: 440, t: 'Instruments', s: '< 1 A', specs: [['Shows', 'Speed, rpm, lamps'], ['Current', '< 1 A']] },
      { k: 'gnd', x: 220, y: 440, t: 'Frame earth', s: '0 V', specs: [['Voltage', '0 V'], ['Job', 'Return path for every circuit']] },
    ],
    links: [
      ['alt', 'reg', 'ac'], ['reg', 'bat', 'v12'], ['bat', 'fuse', 'v12'], ['fuse', 'ign', 'v12'], ['ign', 'ecu', 'v12'],
      ['ecu', 'coil', 'sig'], ['coil', 'plug', 'v12'], ['bat', 'start', 'v12'], ['ign', 'head', 'v12'], ['ign', 'tail', 'v12'],
      ['ign', 'horn', 'v12'], ['ecu', 'inst', 'sig'], ['bat', 'gnd', 'gnd'], ['head', 'gnd', 'gnd'], ['horn', 'gnd', 'gnd'],
    ],
  },
  elec: {
    nodes: [
      { k: 'cp', x: 40, y: 40, t: 'Charge port', s: 'AC / DC', specs: [['Home AC', '3.3–6.6 kW'], ['DC fast', 'up to ~50 kW'], ['Plug', 'Type 2 / CCS2']] },
      { k: 'bms', x: 220, y: 40, t: 'BMS', s: 'monitor', specs: [['Watches', 'Each cell V + temp'], ['Balances', 'Cells to match'], ['Can open', 'Main contactor']] },
      { k: 'pack', x: 40, y: 180, t: 'HV battery pack', s: '400 V', specs: [['Voltage', '~400 V'], ['Energy', '~12 kWh'], ['Cells', '~96 in series']] },
      { k: 'ctrl', x: 400, y: 180, t: 'Controller', s: 'DC → 3φ AC', specs: [['In', '400 V DC'], ['Out', '3-phase AC'], ['Switching', '8–20 kHz']] },
      { k: 'mot', x: 580, y: 180, t: 'Motor', s: '~40 kW', specs: [['Type', 'PMAC / PMSM'], ['Peak torque', '~95 Nm from 0 rpm'], ['Efficiency', '~90 %']] },
      { k: 'dcdc', x: 220, y: 320, t: 'DC-DC', s: '400 → 12 V', specs: [['In', '400 V'], ['Out', '13.8 V'], ['Power', '~500 W']] },
      { k: 'aux', x: 40, y: 320, t: '12 V aux battery', s: '12 V', specs: [['Voltage', '12 V'], ['Feeds', 'Lights, dash, contactor coil']] },
      { k: 'head', x: 400, y: 320, t: 'Headlight (LED)', s: '25 W', specs: [['Power', '25 W'], ['Current', '2 A @ 12 V']] },
      { k: 'inst', x: 580, y: 320, t: 'Instruments', s: 'TFT', specs: [['Shows', 'SoC, range, power'], ['Bus', 'CAN']] },
      { k: 'tail', x: 400, y: 440, t: 'Tail / brake', s: 'LED', specs: [['Power', '3 / 8 W'], ['Current', '< 1 A']] },
      { k: 'gnd', x: 220, y: 440, t: 'Chassis earth', s: '0 V (12 V side)', specs: [['Note', 'HV is isolated from frame'], ['12 V side', 'Frame return']] },
    ],
    links: [
      ['cp', 'pack', 'hv'], ['bms', 'pack', 'sig'], ['pack', 'ctrl', 'hv'], ['ctrl', 'mot', 'ac'], ['pack', 'dcdc', 'hv'],
      ['dcdc', 'aux', 'v12'], ['aux', 'head', 'v12'], ['aux', 'gnd', 'gnd'], ['head', 'inst', 'v12'], ['head', 'tail', 'v12'],
      ['bms', 'ctrl', 'sig'], ['ctrl', 'inst', 'sig'], ['tail', 'gnd', 'gnd'],
    ],
  },
};
COMPONENT_VIEWS.wiring = {
  title: 'Wiring & electrical',
  kind: 'Electrical · Interactive diagram',
  html: () => `${statusHTML('Hover a node', 'Each box is a component. Wire colour shows what flows through it.', S.mode === 'elec' ? '400 V + 12 V' : '12 V')}
    <svg class="ute-cv-svg" id="cv-wiring" viewBox="0 0 900 500" role="img" aria-label="Wiring schematic"></svg>
    <div class="ute-wire-legend">${Object.values(WIRE_COLORS).map((c) => `<span><svg viewBox="0 0 26 6"><line x1="0" y1="3" x2="26" y2="3" stroke="${c.stroke}" stroke-width="3" ${c.dash ? `stroke-dasharray="${c.dash.split(' ').map((n) => n / 2).join(' ')}"` : ''}/></svg>${c.label}</span>`).join('')}</div>
    <div class="ute-wire-pop" id="cv-wire-pop"><h5></h5><dl></dl></div>`,
  sideHTML: () => card('How to read', '<p><b style="color:#D23C2C">Red</b> is +12 V, <b>black</b> is earth, <b style="color:#1D6B55">green dashed</b> is high-voltage DC, <b style="color:#B8862A">amber</b> is AC, <b style="color:#3E6FB7">blue dashed</b> is a low-current signal.</p>') +
    card('Key laws', '<p><b>V = I · R</b>: voltage pushes current through resistance.<br><b>P = V · I</b>: power is voltage times current.<br>A 55 W bulb at 12 V draws <b>4.6 A</b>.</p>') +
    (S.mode === 'elec'
      ? card('Why two bus voltages', '<p>400 V moves big power with small current (thin cables, low loss). Lights and dash still run on safe 12 V, made by the DC-DC converter.</p>')
      : card('Why a battery AND an alternator', '<p>The battery starts the engine. Once running, the alternator makes all the power and recharges the battery. A dead alternator lets you ride only until the battery runs flat.</p>')),
  mount: () => {
    const svg = $('#cv-wiring');
    const data = WIRING[S.mode === 'elec' ? 'elec' : 'ice'];
    const W = 120, H = 46;
    const byK = Object.fromEntries(data.nodes.map((n) => [n.k, n]));
    const lg = ns('g');
    svg.appendChild(lg);
    data.links.forEach(([a, b, type]) => {
      const A = byK[a], B = byK[b], c = WIRE_COLORS[type];
      const ac = [A.x + W / 2, A.y + H / 2], bc = [B.x + W / 2, B.y + H / 2];
      let d;
      if (Math.abs(ac[0] - bc[0]) >= Math.abs(ac[1] - bc[1])) {
        const sx = ac[0] < bc[0] ? A.x + W : A.x, ex = ac[0] < bc[0] ? B.x : B.x + W;
        const mx = (sx + ex) / 2;
        d = `M ${sx} ${ac[1]} L ${mx} ${ac[1]} L ${mx} ${bc[1]} L ${ex} ${bc[1]}`;
      } else {
        const sy = ac[1] < bc[1] ? A.y + H : A.y, ey = ac[1] < bc[1] ? B.y : B.y + H;
        const my = (sy + ey) / 2;
        d = `M ${ac[0]} ${sy} L ${ac[0]} ${my} L ${bc[0]} ${my} L ${bc[0]} ${ey}`;
      }
      lg.appendChild(ns('path', { d, fill: 'none', stroke: c.stroke, 'stroke-width': c.w, 'stroke-dasharray': c.dash, 'stroke-linejoin': 'round' }));
    });
    const pop = $('#cv-wire-pop');
    data.nodes.forEach((n) => {
      const g = ns('g', { class: 'ute-wire-node', tabindex: 0, role: 'button', 'aria-label': `${n.t}, ${n.s}` });
      g.appendChild(ns('rect', { x: n.x, y: n.y, width: W, height: H, fill: '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5, rx: 3 }));
      const t = ns('text', { x: n.x + 10, y: n.y + 19, 'font-family': 'Lato, sans-serif', 'font-size': 12.5, 'font-weight': 700, fill: '#0A0A0A' });
      t.textContent = n.t;
      g.appendChild(t);
      g.appendChild(txt(n.x + 10, n.y + 36, n.s.toUpperCase(), 'start', 10));
      const show = () => {
        pop.querySelector('h5').textContent = n.t;
        pop.querySelector('dl').innerHTML = n.specs.map(([l, v]) => `<dt>${l}</dt><dd>${v}</dd>`).join('');
        pop.classList.add('is-on');
        setStatus(n.t, n.specs.map((s) => s.join(': ')).join(' · '), n.s);
      };
      g.addEventListener('pointerenter', show);
      g.addEventListener('focus', show);
      g.addEventListener('click', show);
      g.addEventListener('pointerleave', () => pop.classList.remove('is-on'));
      g.addEventListener('blur', () => pop.classList.remove('is-on'));
      svg.appendChild(g);
    });
  },
};


/* ==========================================================================
   Output graphs for the interactive views. Each graph shows a reference
   curve (what you should get with the default settings) and the live value.
   ========================================================================== */
const GW = 360, GH = 210, GP = { l: 44, r: 12, t: 14, b: 34 };
function graphCard(id, title, note) {
  return `<div class="ute-card mz-graph"><h4>${title}</h4><svg viewBox="0 0 ${GW} ${GH}" id="${id}" role="img" aria-label="${title}"></svg>${note ? `<p class="mz-graph-note">${note}</p>` : ''}</div>`;
}
/* opts: { xMax, yMax, xLabel, yLabel, series:[{pts,color,dash,label,width}], dots:[{x,y,color}], hlines:[{y,label,color}], vlines:[{x,label}] } */
function drawGraph(id, o) {
  const svg = document.getElementById(id);
  if (!svg) return;
  const X = (x) => GP.l + (x / o.xMax) * (GW - GP.l - GP.r);
  const Y = (y) => GH - GP.b - (Math.min(y, o.yMax) / o.yMax) * (GH - GP.t - GP.b);
  let h = '';
  for (let i = 0; i <= 4; i++) {
    const y = o.yMax * i / 4;
    h += `<line x1="${GP.l}" x2="${GW - GP.r}" y1="${Y(y)}" y2="${Y(y)}" stroke="#EDEDED"/><text x="${GP.l - 6}" y="${Y(y) + 3.5}" text-anchor="end" font-size="9.5" fill="#6B6B6B" font-family="Lato, sans-serif">${+y.toFixed(y < 10 ? 1 : 0)}</text>`;
  }
  for (let i = 0; i <= 4; i++) {
    const x = o.xMax * i / 4;
    h += `<text x="${X(x)}" y="${GH - GP.b + 13}" text-anchor="middle" font-size="9.5" fill="#6B6B6B" font-family="Lato, sans-serif">${+x.toFixed(0)}</text>`;
  }
  h += `<line x1="${GP.l}" x2="${GP.l}" y1="${GP.t}" y2="${GH - GP.b}" stroke="#BDBDBD"/><line x1="${GP.l}" x2="${GW - GP.r}" y1="${GH - GP.b}" y2="${GH - GP.b}" stroke="#BDBDBD"/>`;
  h += `<text x="${(GP.l + GW - GP.r) / 2}" y="${GH - 4}" text-anchor="middle" font-size="10" fill="#444" font-family="Lato, sans-serif">${o.xLabel}</text>`;
  h += `<text x="10" y="${GP.t + 2}" font-size="10" fill="#444" font-family="Lato, sans-serif" transform="rotate(-90 10 ${GP.t + 2})" text-anchor="end">${o.yLabel}</text>`;
  (o.hlines || []).forEach((l) => { h += `<line x1="${GP.l}" x2="${GW - GP.r}" y1="${Y(l.y)}" y2="${Y(l.y)}" stroke="${l.color || '#C2502A'}" stroke-dasharray="4 3"/><text x="${GW - GP.r - 2}" y="${Y(l.y) - 4}" text-anchor="end" font-size="9.5" fill="${l.color || '#C2502A'}" font-family="Lato, sans-serif">${l.label}</text>`; });
  (o.vlines || []).forEach((l) => { h += `<line x1="${X(l.x)}" x2="${X(l.x)}" y1="${GP.t}" y2="${GH - GP.b}" stroke="#9A9A9A" stroke-dasharray="3 3"/><text x="${X(l.x) + 3}" y="${GP.t + 9}" font-size="9.5" fill="#6B6B6B" font-family="Lato, sans-serif">${l.label}</text>`; });
  (o.series || []).forEach((s) => {
    if (!s.pts.length) return;
    h += `<polyline fill="none" stroke="${s.color}" stroke-width="${s.width || 2}" ${s.dash ? `stroke-dasharray="${s.dash}"` : ''} points="${s.pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')}"/>`;
  });
  let ly = GP.t + 4;
  (o.series || []).filter((s) => s.label).forEach((s) => { h += `<line x1="${GP.l + 8}" x2="${GP.l + 24}" y1="${ly + 4}" y2="${ly + 4}" stroke="${s.color}" stroke-width="2" ${s.dash ? `stroke-dasharray="${s.dash}"` : ''}/><text x="${GP.l + 28}" y="${ly + 7.5}" font-size="9.5" fill="#333" font-family="Lato, sans-serif">${s.label}</text>`; ly += 13; });
  (o.dots || []).forEach((d) => { if (d.x == null || d.y == null) return; h += `<circle cx="${X(Math.min(d.x, o.xMax))}" cy="${Y(d.y)}" r="5" fill="${d.color || '#C2502A'}" stroke="#FFF" stroke-width="1.5"/>`; });
  svg.innerHTML = h;
}
const range = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);

/* ---------- Engine: torque/power curves and piston motion ---------- */
const STOCK = { bore: 57, stroke: 48.8, cr: 10.5 }; // K-Light-like 124.5 cc single
function engineCurves(bore, stroke, cr, mode) {
  const Tpk = approxTorqueNm(displacementCC(bore, stroke), mode === '2t' ? '2t' : '4t', cr);
  const shape = (r) => 0.55 + 0.45 * Math.exp(-(((r - 7000) / 3800) ** 2));
  const T = range(1000, 10000, 45).map((r) => [r, Tpk * shape(r)]);
  return { T, P: T.map(([r, t]) => [r, t * r / 9549]), shape, Tpk };
}
function engineGraphs() {
  return graphCard('g-eng-tp', 'Torque and power against engine speed', 'Solid: your bore, stroke and compression. Dashed: the 125 cc reference engine. The dot is the engine now.')
    + graphCard('g-eng-pist', 'Piston position and speed over one turn', 'Position from top dead centre (mm) and speed (m/s) against crank angle. Peak speed comes before 90°, because the con-rod is angled.');
}
function engineGraphsUpdate() {
  const cur = engineCurves(S.bore_mm, S.stroke_mm, S.compression, S.mode);
  const ref = engineCurves(STOCK.bore, STOCK.stroke, STOCK.cr, S.mode);
  const yMax = Math.max(12, Math.ceil(Math.max(...cur.P.map((p) => p[1]), ...cur.T.map((t) => t[1])) / 5) * 5);
  const r = clamp(S.rpm, 0, 10000);
  drawGraph('g-eng-tp', { xMax: 10000, yMax, xLabel: 'Engine speed (rpm)', yLabel: 'Nm · kW', series: [
    { pts: ref.T, color: '#3E6FB7', dash: '5 4', width: 1.5 }, { pts: ref.P, color: '#C2502A', dash: '5 4', width: 1.5 },
    { pts: cur.T, color: '#3E6FB7', label: 'Torque (Nm)' }, { pts: cur.P, color: '#C2502A', label: 'Power (kW)' }],
    dots: [{ x: r, y: cur.Tpk * cur.shape(r), color: '#3E6FB7' }, { x: r, y: cur.Tpk * cur.shape(r) * r / 9549 }] });
  // slider-crank kinematics
  const R = S.stroke_mm / 2, Lr = 1.75 * S.stroke_mm, w = 2 * Math.PI * Math.max(S.rpm, 1) / 60;
  const pos = (a) => { const t = a * Math.PI / 180; return R + Lr - (R * Math.cos(t) + Math.sqrt(Lr * Lr - (R * Math.sin(t)) ** 2)); };
  const vel = (a) => { const t = a * Math.PI / 180; return Math.abs(R * w * (Math.sin(t) + R * Math.sin(2 * t) / (2 * Math.sqrt(Lr * Lr - (R * Math.sin(t)) ** 2)))) / 1000; };
  const ang = range(0, 360, 72);
  const vMax = Math.max(...ang.map(vel));
  const yM = Math.max(S.stroke_mm, Math.ceil(vMax / 5) * 5, 10);
  const a = S.crank_deg % 360;
  drawGraph('g-eng-pist', { xMax: 360, yMax: yM, xLabel: 'Crank angle (°)', yLabel: 'mm · m/s', vlines: [{ x: 180, label: 'BDC' }], series: [
    { pts: ang.map((x) => [x, pos(x)]), color: '#111111', label: 'Position (mm)' }, { pts: ang.map((x) => [x, vel(x)]), color: '#1D6B55', label: `Speed (m/s) at ${Math.round(S.rpm)} rpm` }],
    dots: [{ x: a, y: pos(a), color: '#111111' }, { x: a, y: vel(a), color: '#1D6B55' }] });
}

/* ---------- Brake: temperature trace and pad wear ---------- */
S.cv.pad_mm = 6.0; S.cv.brakeTrace = []; S.cv.brakeT = 0;
function brakeGraphs() {
  return graphCard('g-brk-temp', 'Disc temperature over the last 30 s', 'Each stop heats the disc; it cools between stops. Organic pads begin to fade above about 300 °C.')
    + graphCard('g-brk-pad', 'Pad friction material', 'New pads have 6.0 mm of material; replace them at 3 mm (K-Light 125 manual). Wear here is speeded up so you can see it.');
}
function brakeGraphsUpdate() {
  const tr = S.cv.brakeTrace;
  drawGraph('g-brk-temp', { xMax: 30, yMax: 500, xLabel: 'Time (s)', yLabel: 'Disc °C', hlines: [{ y: 300, label: 'Fade risk (organic pads)' }],
    series: [{ pts: tr.map(([t, v]) => [t - Math.max(0, S.cv.brakeT - 30), v]), color: '#C2502A', label: 'Disc temperature' }],
    dots: tr.length ? [{ x: Math.min(30, S.cv.brakeT), y: tr[tr.length - 1][1] }] : [] });
  const used = 6 - S.cv.pad_mm;
  drawGraph('g-brk-pad', { xMax: 6, yMax: 6, xLabel: 'Material worn away (mm)', yLabel: 'Pad left (mm)', hlines: [{ y: 3, label: 'Service limit 3 mm' }],
    series: [{ pts: [[0, 6], [6, 0]], color: '#BDBDBD', dash: '4 4' }], dots: [{ x: used, y: S.cv.pad_mm, color: S.cv.pad_mm <= 3 ? '#C2502A' : '#1D6B55' }] });
}

/* ---------- Chain: road speed per gear ---------- */
const CK_RATIO = { 1: 2.77, 2: 1.88, 3: 1.40, 4: 1.13, 5: 0.96 }, CK_PRIMARY = 3.35, CK_CIRC = 1.95;
function chainGraphs() {
  return graphCard('g-chain', 'Road speed against engine speed, gears 1 to 5', 'Each line is one gear with 15/39 sprockets. A bigger rear sprocket would tilt every line down: more pull, less top speed.');
}
function chainGraphsUpdate() {
  const fin = 39 / 15, kmh = (rpm, g) => rpm / (CK_PRIMARY * CK_RATIO[g] * fin) * CK_CIRC * 60 / 1000;
  const cols = ['#111111', '#3E6FB7', '#1D6B55', '#E2A93B', '#C2502A'];
  const eng = Math.max(S.cv.gear_rpm || 0, S.rider.throttle > 0.05 ? S.rpm : 0);
  drawGraph('g-chain', { xMax: 10000, yMax: 140, xLabel: 'Engine speed (rpm)', yLabel: 'Road speed (km/h)',
    series: [1, 2, 3, 4, 5].map((g, i) => ({ pts: [[0, 0], [10000, kmh(10000, g)]], color: cols[i], label: `Gear ${g}` })),
    dots: [{ x: eng, y: kmh(eng, 3), color: '#E2A93B' }] });
}

/* ---------- Carburettor: airflow, fuel and mixture ---------- */
function carbGraphs() {
  return graphCard('g-carb', 'Air and fuel flow against throttle', 'Fuel follows air so the ratio stays near 14.7 : 1. The dot is your throttle now.');
}
function carbGraphsUpdate() {
  const pct = Math.max(S.cv.carb_pct || 0, S.rider.throttle);
  const air = (p) => 0.4 + p * 11.6;
  const th = range(0, 100, 20);
  drawGraph('g-carb', { xMax: 100, yMax: 12, xLabel: 'Throttle (%)', yLabel: 'g/s', series: [
    { pts: th.map((t) => [t, air(t / 100)]), color: '#3E6FB7', label: 'Air (g/s)' }, { pts: th.map((t) => [t, air(t / 100) / 14.7 * 5]), color: '#E2A93B', label: 'Fuel (g/s × 5)' }],
    dots: [{ x: pct * 100, y: air(pct), color: '#3E6FB7' }, { x: pct * 100, y: air(pct) / 14.7 * 5, color: '#E2A93B' }] });
}

/* ---------- Spark: voltage needed against gap ---------- */
function sparkGraphs() {
  return graphCard('g-spark', 'Voltage needed to jump the plug gap', 'A wider or worn gap needs more voltage. The coil can supply up to about 35 kV; the margin is the ignition reserve.');
}
function sparkGraphsUpdate() {
  drawGraph('g-spark', { xMax: 1.4, yMax: 40, xLabel: 'Plug gap (mm)', yLabel: 'kV', hlines: [{ y: 35, label: 'Coil maximum ~35 kV' }], vlines: [{ x: 0.7, label: '0.7 mm spec' }],
    series: [{ pts: range(0.3, 1.4, 22).map((g) => [g, 3 + 12 * g]), color: '#111111', label: 'Needed at idle' }, { pts: range(0.3, 1.4, 22).map((g) => [g, 6 + 18 * g]), color: '#C2502A', dash: '5 4', label: 'Needed at full load' }],
    dots: S.cv.fire_kv ? [{ x: 0.7, y: S.cv.fire_kv }] : [] });
}

/* ---------- Electric motor: torque and power against speed ---------- */
function motorGraphs() {
  return graphCard('g-motor', 'Motor torque and power against speed', 'Flat torque up to the base speed, then constant power as the battery voltage limits it. The dot is the motor now.');
}
function motorGraphsUpdate() {
  const BASE = 4500, Tm = 95, T = (r) => (r <= BASE ? Tm : Tm * BASE / r);
  const rr = range(0, 10000, 50);
  const r = Math.max(S.elec.rpm, 0);
  drawGraph('g-motor', { xMax: 10000, yMax: 100, xLabel: 'Motor speed (rpm)', yLabel: 'Nm · kW', vlines: [{ x: BASE, label: 'Base speed' }], series: [
    { pts: rr.map((x) => [x, T(x)]), color: '#3E6FB7', label: 'Torque (Nm)' }, { pts: rr.map((x) => [x, T(x) * x / 9549]), color: '#1D6B55', label: 'Power (kW)' }],
    dots: [{ x: r, y: T(r) * S.rider.throttle, color: '#3E6FB7' }, { x: r, y: T(r) * S.rider.throttle * r / 9549, color: '#1D6B55' }] });
}

function attachGraphs(keys, graphs, update) { keys.forEach((k) => { const v = COMPONENT_VIEWS[k]; if (v) { v.graphs = graphs; v.graphsUpdate = update; } }); }
attachGraphs(['engine', 'cylinder', 'piston', 'conrod', 'crankshaft'], engineGraphs, engineGraphsUpdate);
attachGraphs(['brake'], brakeGraphs, brakeGraphsUpdate);
attachGraphs(['chain', 'rear_sprocket'], chainGraphs, chainGraphsUpdate);
attachGraphs(['carb'], carbGraphs, carbGraphsUpdate);
attachGraphs(['spark_plug'], sparkGraphs, sparkGraphsUpdate);
attachGraphs(['motor', 'controller'], motorGraphs, motorGraphsUpdate);
let graphClock = 0;
function updateGraphsTick(dt) {
  graphClock += dt;
  if (graphClock < 0.12) return;
  graphClock = 0;
  const cfg = S.selected_part && COMPONENT_VIEWS[S.selected_part];
  if (cfg && cfg.graphsUpdate && document.querySelector('.mz-graph')) cfg.graphsUpdate();
}

/* ---------- Wiring Lab (petrol bikes): the course's interactive harness and circuits ---------- */
const WIRING_HV = Object.assign(COMPONENT_VIEWS.wiring, { wide: true });
const WL_TABS = [['harness', 'WR01 Main harness'], ['starting', 'F23 Starting'], ['charging', 'F21 Charging'], ['ignition', 'F22 Ignition']];
function wiringLab(title, tab) {
  return {
    wide: true,
    title,
    kind: 'Electrical · Wiring Lab',
    html: () => `${statusHTML('Wiring Lab', 'Trace the harness, work the switches and trigger faults to see exactly which wire goes dead.', tab.toUpperCase())}
      <div class="ute-btnrow mz-wl-tabs" role="group" aria-label="Wiring views">${WL_TABS.map(([k, l]) => `<button type="button" class="ute-btn ${k === tab ? 'is-primary' : ''}" data-wl="${k}">${l}</button>`).join('')}<a class="ute-linkbtn" href="wiring/#${tab}" target="_blank" rel="noopener">Open full page ↗</a></div>
      <iframe class="mz-wl" id="mz-wl" title="Wiring Lab" src="assets/interactive/wiring/wiring.html#${tab}"></iframe>`,
    mount: () => {
      const f = $('#mz-wl');
      const fit = () => { try { f.style.height = Math.ceil(f.contentDocument.documentElement.scrollHeight) + 'px'; } catch (e) { /* noop */ } };
      f.addEventListener('load', () => { fit(); try { new ResizeObserver(fit).observe(f.contentDocument.documentElement); } catch (e) { /* noop */ } });
      $$('[data-wl]').forEach((b) => b.addEventListener('click', () => {
        $$('[data-wl]').forEach((x) => x.classList.toggle('is-primary', x === b));
        try { f.contentWindow.location.hash = b.dataset.wl; } catch (e) { f.src = 'assets/interactive/wiring/wiring.html#' + b.dataset.wl; }
        const a = $('.mz-wl-tabs a'); if (a) a.href = 'wiring/#' + b.dataset.wl;
        setStatus(null, null, b.dataset.wl.toUpperCase());
      }));
    },
  };
}
Object.defineProperty(COMPONENT_VIEWS, 'wiring', { get: () => (S.mode === 'elec' ? WIRING_HV : wiringLab('Wiring and electrical', 'harness')), configurable: true });
Object.defineProperty(COMPONENT_VIEWS, 'charging', { get: () => (S.mode === 'elec' ? undefined : wiringLab('Charging system', 'charging')), configurable: true });
Object.defineProperty(COMPONENT_VIEWS, 'starter', { get: () => (S.mode === 'elec' ? undefined : wiringLab('Starter motor and starting circuit', 'starting')), configurable: true });

/* ==========================================================================
   9. Ride: the Moto Zero cockpit simulator (assets/interactive/controls.html)
   embedded same-origin. Its live state is the single source of truth for
   rpm, road speed, throttle, brakes, clutch and gear: it drives the 3D wheels,
   the close-ups and the dyno, in all three modes.
   ========================================================================== */
const COCKPIT_KEYS = new Set(['k', 'x', 's', 'c', 't', 'f', 'r', 'h', 'v', 'b', 'q', 'e', 'm', 'ArrowUp', 'ArrowDown']);
/* Browsers only allow sound after a user gesture on this page, so the page makes the
   audio context on the first click or key and hands it to the cockpit. */
let mzAudio = null;
function unlockCockpitAudio() {
  const f = document.querySelector('#mz-cockpit');
  if (!f) return;
  try {
    if (!mzAudio) mzAudio = new (window.AudioContext || window.webkitAudioContext)();
    if (mzAudio.state === 'suspended') mzAudio.resume();
    if (f.contentWindow && f.contentWindow.__moto && f.contentWindow.__moto.setAudio) f.contentWindow.__moto.setAudio(mzAudio);
  } catch (e) { /* no audio */ }
}
['pointerdown', 'keydown'].forEach((ev) => document.addEventListener(ev, unlockCockpitAudio, { capture: true }));
const heldKeys = new Set();   // cockpit keys currently held (from this page or from inside the cockpit)
const cockpitSrc = () => `assets/interactive/controls.html?embed=1${S.mode === 'elec' ? '&mode=elec' : ''}`;

const KEY_LABEL = { ArrowUp: '↑', ArrowDown: '↓' };
function kbd(k, label) { return `<kbd data-k="${k}">${label || KEY_LABEL[k] || k.toUpperCase()}</kbd>`; }

function rideStepsICE() {
  return [
    ['K', 'Key ON', (c) => c.key],
    ['X', 'Stop switch at RUN', (c) => c.kill],
    ['↓ ↑ / C', 'Neutral (green N) or hold the clutch', (c) => c.running || c.gi === 1 || c.clutchP > 0.7],
    ['S', 'Hold the starter until it runs', (c) => c.running],
    ['C + ↓', 'Hold the clutch, press ↓ for first gear', (c) => c.running && c.gi !== 1],
    ['T', 'Hold T (or scroll up), then let C go slowly', (c) => c.running && c.v > 1.5],
  ];
}
function rideStepsElec() {
  return [
    ['K', 'Key ON', (c) => c.key],
    ['X', 'Stop switch at RUN: the bike is READY', (c) => c.key && c.kill],
    ['T', 'Hold T or scroll up over the cockpit to ride', (c) => c.v > 1.5],
    ['F / R', 'Brake; closing the throttle also regenerates', (c) => c.v > 1.5 && (c.frontP > 0.3 || c.rearP > 0.3)],
  ];
}
function rideHowtoHTML() {
  const elec = S.mode === 'elec';
  const steps = elec ? rideStepsElec() : rideStepsICE();
  const keys = elec
    ? [['k', 'Key'], ['x', 'Stop switch'], ['t', 'Throttle (hold)'], ['f', 'Front brake'], ['r', 'Rear brake'], ['h', 'Horn'], ['q', 'Indicate left'], ['e', 'Indicate right'], ['b', 'Beam'], ['m', 'Sound on/off']]
    : [['k', 'Key'], ['x', 'Stop switch'], ['s', 'Starter (hold)'], ['c', 'Clutch (hold)'], ['t', 'Throttle (hold)'], ['ArrowDown', 'Shift down'], ['ArrowUp', 'Shift up'], ['f', 'Front brake'], ['r', 'Rear brake'], ['h', 'Horn'], ['q', 'Indicate left'], ['e', 'Indicate right'], ['b', 'Beam'], ['v', 'Choke'], ['m', 'Sound on/off']];
  return `<div class="mz-howto" aria-label="How to ride">
    <div class="mz-howto-head"><span class="ute-label">How to ride</span><span class="mz-howto-note">Keys work anywhere on this page: no need to click into the cockpit. Hold several at once${elec ? '' : ', for example <b>C + T</b>'}.</span></div>
    <ol class="mz-steps">${steps.map(([k, t], i) => `<li data-step="${i}"><b>${k}</b><span>${t}</span></li>`).join('')}</ol>
    <div class="mz-keymap">${keys.map(([k, l]) => `<span>${kbd(k)}${l}</span>`).join('')}<span><kbd class="is-wide">Wheel</kbd>Throttle over the cockpit</span><span>${kbd('g', 'G')}Dyno start / stop</span></div>
  </div>`;
}
function updateHowto(c) {
  const box = $('.mz-steps');
  if (!box || !c) return;
  const steps = S.mode === 'elec' ? rideStepsElec() : rideStepsICE();
  let now = -1;
  steps.forEach(([, , done], i) => {
    const li = box.children[i];
    if (!li) return;
    const d = !!done(c);
    li.classList.toggle('is-done', d);
    if (!d && now < 0) now = i;
  });
  [...box.children].forEach((li, i) => li.classList.toggle('is-now', i === now));
}
function markKey(k, on) {
  $$(`.mz-keymap kbd[data-k="${k}"]`).forEach((el) => el.classList.toggle('is-held', on));
}

function mountRider() {
  const f = $('#mz-cockpit');
  if (!f) return;
  heldKeys.clear();
  const fit = () => {
    try {
      const d = f.contentDocument;
      if (!d || !d.body) return;
      const h = Math.ceil(d.querySelector('main') ? d.querySelector('main').getBoundingClientRect().bottom + d.defaultView.scrollY : d.documentElement.scrollHeight);
      if (h > 50 && Math.abs(f.offsetHeight - h) > 1) f.style.height = h + 'px';
    } catch (e) { /* noop */ }
  };
  f.addEventListener('load', () => {
    fit();
    try { new ResizeObserver(fit).observe(f.contentDocument.body); } catch (e) { setInterval(fit, 1000); }
  });
  window.addEventListener('resize', fit);
}

// Keys pressed while the cockpit itself has focus arrive here as messages.
window.addEventListener('message', (e) => {
  const f = $('#mz-cockpit');
  if (!f || e.source !== f.contentWindow || !e.data || e.data.mz !== 'key') return;
  const { key, type } = e.data;
  if (COCKPIT_KEYS.has(key)) {
    if (type === 'down') heldKeys.add(key); else heldKeys.delete(key);
    markKey(key, type === 'down');
    return;
  }
  if (type === 'down') pageShortcut(key, !!e.data.repeat);
});

function cockpit() {
  const f = $('#mz-cockpit');
  try { return f && f.contentWindow && f.contentWindow.__moto ? f.contentWindow.__moto : null; } catch (e) { return null; }
}
function cockpitState() { const m = cockpit(); return m ? m.state() : null; }

function sendKey(type, key, repeat) {
  const f = $('#mz-cockpit');
  try { f.contentDocument.dispatchEvent(new KeyboardEvent(type, { key, repeat: !!repeat, bubbles: true })); return true; } catch (err) { return false; }
}
function releaseHeldKeys() {
  heldKeys.forEach((k) => { sendKey('keyup', k); markKey(k, false); });
  heldKeys.clear();
  const m = cockpit();
  if (m && m.releaseAll) m.releaseAll();
}

function updateRiderTick(dt) {
  const r = S.rider;
  // Hold buttons in the close-ups (motor, controller) open the same throttle the cockpit uses.
  S._localThr = r.throttle_hold ? Math.min(1, (S._localThr || 0) + 1.8 * dt) : Math.max(0, (S._localThr || 0) - 1.2 * dt);
  const m = cockpit();
  const c = m ? m.state() : null;
  if (m && m.setExtThr && c && c.extThr !== S._localThr) m.setExtThr(S._localThr);
  S.ck = c;
  if (c) {
    r.throttle = Math.max(c.thr, S._localThr);
    r.brake = Math.max(c.frontP, c.rearP * 0.6);
    r.clutch = c.clutchP;
    r.kill = !c.kill;
    S.gear = c.elec ? 'D' : ['1', 'N', '2', '3', '4', '5'][c.gi];
    updateHowto(c);
  } else {
    r.throttle = S._localThr;
  }
}


/* ==========================================================================
   11. Dyno: records a run from the cockpit, with timing and event markers
   ========================================================================== */
const DYNO_HZ = 20, DYNO_MAX_S = 600;
const C_EV = { engine: '#0A0A0A', gear: '#1E2B5E', clutch: '#3E6FB7', brake: '#B8322A', key: '#6B6963', test: '#1D6B55' };
function dynoCharts() {
  const elec = S.mode === 'elec';
  const list = [
    { k: 'speed', label: 'Road speed', unit: 'km/h', series: [['speed', 'Speed', '#C2502A']], auto: 60 },
    { k: 'rpm', label: elec ? 'Motor speed' : 'Engine speed', unit: 'rpm', series: [['rpm', 'RPM', '#1D6B55']], max: elec ? 10000 : 12000, red: elec ? null : 10000 },
    { k: 'pedal', label: 'Throttle and brake', unit: '%', series: [['thr', 'Throttle', '#3E6FB7'], ['brake', 'Brake', '#B8322A']], max: 100 },
    { k: 'power', label: elec ? 'Motor power' : 'Power at the clutch', unit: 'kW', series: [['kw', 'Power', '#B8862A']], auto: 5 },
  ];
  if (!elec) list.push({ k: 'gear', label: 'Gear and clutch', unit: '', series: [['gear', 'Gear', '#1E2B5E'], ['clutch', 'Clutch pulled', '#3E6FB7']], max: 5, wide: true });
  return list;
}
const niceCeil = (v) => { const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; };
const fmtT = (t) => (t >= 60 ? `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, '0')}` : `${t.toFixed(1)} s`);
const gearName = (g) => (g === 0 ? 'N' : String(g));

function freshDyno() {
  return { recording: false, t0: 0, elapsed: 0, samples: [], events: [], peak_speed: 0, peak_rpm: 0, peak_power: 0, t50: null, t100: null, restT: 0, dist: 0, shifts: 0, cursorT: null, prev: null };
}

function mountDyno() {
  const box = $('#ute-dyno-charts');
  if (!box) return;
  box.innerHTML = dynoCharts().map((c) => `
    <div class="ute-dyno-cell ${c.wide ? 'is-wide' : ''}" data-chart="${c.k}">
      <header><span class="ute-label">${c.label}${c.unit ? ` <small>(${c.unit})</small>` : ''}</span><span class="dy-vals">${c.series.map(([k, l, col]) => `<span class="dy-val" title="${l}"><i style="background:${col}"></i>${c.series.length > 1 ? `<em>${l}</em>` : ''}<b data-dv="${k}">0</b></span>`).join('')}</span></header>
      <div class="ute-dyno-plot" data-plot="${c.k}"><div class="dy-y"></div><div class="dy-area"><svg viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true"></svg><div class="dy-ev"></div></div><div class="dy-x"></div></div>
    </div>`).join('');
  $$('.ute-dyno-plot .dy-area', box).forEach((a) => {
    const set = (e) => {
      const r = a.getBoundingClientRect();
      const span = dynoSpan();
      S.dyno.cursorT = clamp((e.clientX - r.left) / r.width, 0, 1) * span;
      renderDyno(true);
    };
    a.addEventListener('pointermove', set);
    a.addEventListener('pointerdown', set);
    a.addEventListener('pointerleave', () => { S.dyno.cursorT = null; renderDyno(true); });
  });
  renderDyno(true);
}

function setDynoButtons() {
  const d = S.dyno;
  const b = $('[data-dyno="start"]');
  if (b) {
    b.classList.toggle('is-rec', d.recording);
    b.classList.toggle('is-primary', !d.recording);
    b.textContent = d.recording ? '■ Stop test (G)' : '● Start test (G)';
    b.setAttribute('aria-pressed', String(d.recording));
  }
  const x = $('[data-dyno="csv"]');
  if (x) x.disabled = !d.samples.length;
}
function dynoEvent(type, label) {
  const d = S.dyno;
  if (!d.recording) return;
  d.events.push({ t: (performance.now() - d.t0) / 1000, type, label });
}
function toggleDyno() {
  const d = S.dyno;
  if (!d.recording) {
    Object.assign(d, freshDyno(), { recording: true, t0: performance.now() });
    d.prev = S.ck ? snapCk(S.ck) : null;
    d.restT = 0;
    dynoEvent('test', 'Test started');
    if (S.ck) dynoEvent('key', describeStart(S.ck));
  } else {
    dynoEvent('test', 'Test stopped');
    d.recording = false;
  }
  setDynoButtons();
  renderDyno(true);
}
function resetDyno() {
  S.dyno = freshDyno();
  setDynoButtons();
  renderDyno(true);
}
function describeStart(c) {
  if (c.elec) return `${c.key && c.kill ? 'Ready' : 'Not ready'} · ${(c.v * 3.6).toFixed(0)} km/h`;
  return `${c.running ? 'Engine running' : 'Engine off'} · gear ${['1', 'N', '2', '3', '4', '5'][c.gi]} · ${(c.v * 3.6).toFixed(0)} km/h`;
}
const snapCk = (c) => ({ key: c.key, kill: c.kill, running: c.running, gi: c.gi, clutch: c.clutchP > 0.7, brake: Math.max(c.frontP, c.rearP) > 0.3, front: c.frontP > 0.3, rear: c.rearP > 0.3 });

function detectEvents(c) {
  const d = S.dyno;
  if (!c) return;
  const n = snapCk(c), p = d.prev;
  d.prev = n;
  if (!p) return;
  if (n.key !== p.key) dynoEvent('key', n.key ? 'Key ON' : 'Key OFF');
  if (n.running !== p.running) {
    if (c.elec) dynoEvent('engine', n.running ? 'Motor ready' : 'Motor off');
    else if (n.running) dynoEvent('engine', 'Engine started');
    else dynoEvent('engine', c.key && c.kill ? 'Stalled' : (c.key ? 'Stop switch OFF' : 'Engine stopped'));
  }
  if (!c.elec && n.gi !== p.gi) { d.shifts++; dynoEvent('gear', `Gear ${['1', 'N', '2', '3', '4', '5'][n.gi]}`); }
  if (!c.elec && n.clutch !== p.clutch) dynoEvent('clutch', n.clutch ? 'Clutch in' : 'Clutch out');
  if (n.brake !== p.brake) dynoEvent('brake', n.brake ? `Brake on (${n.front && n.rear ? 'both' : n.front ? 'front' : 'rear'})` : 'Brake off');
}

function recordDynoSample(now) {
  const d = S.dyno;
  if (now - S.last_dyno_sample_ms < 1000 / DYNO_HZ) return;
  const dtS = S.last_dyno_sample_ms ? Math.min(0.2, (now - S.last_dyno_sample_ms) / 1000) : 0;
  S.last_dyno_sample_ms = now;
  const c = S.ck;
  const t = (now - d.t0) / 1000;
  d.elapsed = t;
  const kmh = S.speed;
  const rpm = S.mode === 'elec' ? S.elec.rpm : S.rpm;
  let kw;
  if (c && typeof c.Pw === 'number') kw = c.Pw / 1000;
  else {
    const tq = approxTorqueNm(displacementCC(S.bore_mm, S.stroke_mm), S.mode === 'elec' ? '4t' : S.mode, S.compression);
    kw = S.mode === 'elec' ? S.elec.torque * S.elec.rpm / 9549 : tq * S.rpm / 9549 * S.rider.throttle;
  }
  const gear = c ? (c.elec ? 1 : [1, 0, 2, 3, 4, 5][c.gi]) : 0;
  const clutch = c ? c.clutchP * 100 : 0;
  d.samples.push({ t, speed: kmh, rpm, thr: S.rider.throttle * 100, brake: S.rider.brake * 100, gear, clutch, kw });
  d.peak_speed = Math.max(d.peak_speed, kmh);
  d.peak_rpm = Math.max(d.peak_rpm, rpm);
  d.peak_power = Math.max(d.peak_power, kw);
  d.dist += kmh / 3.6 * dtS;
  // Standing-start times: measured from the last moment the bike was at rest.
  if (kmh < 1) d.restT = t;
  else if (d.restT != null) {
    if (kmh >= 50 && d._run50 !== d.restT) { d._run50 = d.restT; const v = t - d.restT; if (d.t50 == null || v < d.t50) { d.t50 = v; dynoEvent('test', `0 to 50 km/h in ${v.toFixed(1)} s`); } }
    if (kmh >= 100 && d._run100 !== d.restT) { d._run100 = d.restT; const v = t - d.restT; if (d.t100 == null || v < d.t100) { d.t100 = v; dynoEvent('test', `0 to 100 km/h in ${v.toFixed(1)} s`); } }
  }
  if (t >= DYNO_MAX_S) { dynoEvent('test', `Stopped at the ${DYNO_MAX_S / 60} min limit`); d.recording = false; setDynoButtons(); }
}

const dynoSpan = () => {
  const e = S.dyno.elapsed;
  return e <= 10 ? 10 : e <= 30 ? 30 : niceCeil(e * 1.0001) <= e * 1.25 ? niceCeil(e * 1.0001) : Math.ceil(e / 10) * 10 + 10;
};
function tickStep(span) {
  for (const s of [1, 2, 5, 10, 15, 30, 60, 120]) if (span / s <= 8) return s;
  return 300;
}
function sampleAt(t) {
  const s = S.dyno.samples;
  if (!s.length) return null;
  if (t == null) return s[s.length - 1];
  let lo = 0, hi = s.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (s[mid].t < t) lo = mid + 1; else hi = mid; }
  return s[lo];
}

function renderDyno(force) {
  const d = S.dyno;
  const s = d.samples;
  const span = dynoSpan();
  const X = (t) => (t / span * 1000).toFixed(1);
  const step = Math.max(1, Math.ceil(s.length / 900));
  const xt = tickStep(span);
  dynoCharts().forEach((c) => {
    const cell = document.querySelector(`[data-chart="${c.k}"]`);
    if (!cell) return;
    let max = c.max;
    if (c.auto) max = niceCeil(Math.max(c.auto, ...c.series.map(([k]) => (k === 'speed' ? d.peak_speed : k === 'kw' ? d.peak_power : 0)) ) * 1.05);
    const Y = (v) => (200 - clamp(v / max, 0, 1) * 192).toFixed(1);
    const yTicks = c.k === 'gear' ? [0, 1, 2, 3, 4, 5] : [0, max / 2, max];
    let svg = yTicks.map((v) => `<line x1="0" x2="1000" y1="${Y(v)}" y2="${Y(v)}" stroke="#E6E6E6" vector-effect="non-scaling-stroke"/>`).join('');
    for (let t = xt; t < span; t += xt) svg += `<line x1="${X(t)}" x2="${X(t)}" y1="0" y2="200" stroke="#EEEBE3" vector-effect="non-scaling-stroke"/>`;
    if (c.red) svg += `<rect x="0" y="0" width="1000" height="${Y(c.red)}" fill="#B8322A" fill-opacity="0.07"/>`;
    d.events.forEach((ev) => { if (ev.type !== 'test') svg += `<line x1="${X(ev.t)}" x2="${X(ev.t)}" y1="0" y2="200" stroke="${C_EV[ev.type]}" stroke-opacity=".35" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>`; });
    c.series.forEach(([k, , col], si) => {
      if (s.length < 2) return;
      const pts = [];
      for (let i = 0; i < s.length; i += step) {
        const p = s[i];
        const v = k === 'clutch' ? p.clutch / 100 * 5 : p[k];
        if (k === 'gear' && pts.length) pts.push(`${X(p.t)} ${pts[pts.length - 1].split(' ')[1]}`);
        pts.push(`${X(p.t)} ${Y(v)}`);
      }
      const last = s[s.length - 1];
      pts.push(`${X(last.t)} ${Y(k === 'clutch' ? last.clutch / 100 * 5 : last[k])}`);
      const fillArea = (k === 'clutch' || (c.series.length === 1));
      if (fillArea) svg += `<path d="M ${X(s[0].t)} 200 L ${pts.join(' L ')} L ${X(last.t)} 200 Z" fill="${col}" fill-opacity="${k === 'clutch' ? 0.16 : 0.08}"/>`;
      if (k !== 'clutch') svg += `<path d="M ${pts.join(' L ')}" fill="none" stroke="${col}" stroke-width="${si ? 1.6 : 2}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;
    });
    if (d.cursorT != null) svg += `<line x1="${X(d.cursorT)}" x2="${X(d.cursorT)}" y1="0" y2="200" stroke="#0A0A0A" vector-effect="non-scaling-stroke"/>`;
    cell.querySelector('svg').innerHTML = svg;
    // Axes (HTML, so text never stretches)
    const yLab = (v) => (c.k === 'gear' ? gearName(v) : v >= 1000 ? `${v / 1000}k` : String(+v.toFixed(1)));
    cell.querySelector('.dy-y').innerHTML = yTicks.map((v) => `<span style="top:${(Y(v) / 2).toFixed(1)}%">${yLab(v)}</span>`).join('');
    let xs = '';
    for (let t = 0; t <= span + 1e-6; t += xt) xs += `<span style="left:${(t / span * 100).toFixed(2)}%">${t >= 60 ? `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` : t}${t === 0 ? ' s' : ''}</span>`;
    cell.querySelector('.dy-x').innerHTML = xs;
    cell.querySelector('.dy-ev').innerHTML = c.k === 'speed' ? d.events.filter((ev) => ev.type !== 'test').map((ev) => `<i style="left:${(ev.t / span * 100).toFixed(2)}%;background:${C_EV[ev.type]}" title="${fmtT(ev.t)} · ${ev.label}"></i>`).join('') : '';
    // Values: live, or under the cursor
    const p = sampleAt(d.cursorT);
    c.series.forEach(([k]) => {
      const el = cell.querySelector(`[data-dv="${k}"]`);
      if (!el) return;
      let v = '–';
      if (p) v = k === 'gear' ? (S.mode === 'elec' ? 'D' : gearName(p.gear)) : k === 'clutch' ? `${Math.round(p.clutch)} %` : k === 'kw' ? p.kw.toFixed(1) : Math.round(p[k]).toLocaleString('en');
      if (k === 'thr' || k === 'brake') v = p ? `${Math.round(p[k])} %` : '–';
      el.textContent = v;
    });
  });
  renderDynoFindings();
  renderDynoLog(force);
}
function renderDynoFindings() {
  const box = $('#ute-findings');
  if (!box) return;
  const d = S.dyno;
  const s = d.samples;
  const avgThr = s.length ? s.reduce((a, p) => a + p.thr, 0) / s.length : 0;
  const cells = [
    ['Status', d.recording ? '● Recording' : (s.length ? 'Stopped' : 'Ready')],
    ['Elapsed', fmtT(d.elapsed)],
    ['0 to 50 km/h', d.t50 == null ? '–' : `${d.t50.toFixed(1)} s`],
    ['0 to 100 km/h', d.t100 == null ? '–' : `${d.t100.toFixed(1)} s`],
    ['Peak speed', `${Math.round(d.peak_speed)} km/h`],
    [S.mode === 'elec' ? 'Peak motor rpm' : 'Peak rpm', Math.round(d.peak_rpm).toLocaleString('en')],
    ['Peak power', `${d.peak_power.toFixed(1)} kW`],
    ['Distance', d.dist >= 1000 ? `${(d.dist / 1000).toFixed(2)} km` : `${Math.round(d.dist)} m`],
    ['Avg throttle', `${Math.round(avgThr)} %`],
    [S.mode === 'elec' ? 'Brake events' : 'Gear changes', S.mode === 'elec' ? d.events.filter((e) => e.label.startsWith('Brake on')).length : d.shifts],
  ];
  box.innerHTML = cells.map(([l, v], i) => `<div class="cell"><div class="l">${l}</div><div class="v ${i === 0 && d.recording ? 'is-rec' : ''}">${v}</div></div>`).join('');
}
let _logN = -1;
function renderDynoLog(force) {
  const box = $('#ute-dyno-log');
  if (!box) return;
  const ev = S.dyno.events;
  if (!force && ev.length === _logN) return;
  _logN = ev.length;
  box.innerHTML = ev.length
    ? ev.map((e) => `<li><time>${fmtT(e.t)}</time><i style="background:${C_EV[e.type]}"></i><span>${e.label}</span></li>`).join('')
    : '<li class="is-empty">No events yet. Start a test, then ride: engine start and stall, gear changes, clutch and brakes are logged here.</li>';
  box.scrollTop = box.scrollHeight;
}
function exportDynoCSV() {
  const d = S.dyno;
  if (!d.samples.length) return;
  const evAt = new Map();
  d.events.forEach((e) => {
    const p = sampleAt(e.t);
    if (p) evAt.set(p, (evAt.get(p) ? evAt.get(p) + '; ' : '') + e.label);
  });
  const rows = [['time_s', 'speed_kmh', S.mode === 'elec' ? 'motor_rpm' : 'engine_rpm', 'throttle_pct', 'brake_pct', 'gear', 'clutch_pulled_pct', 'power_kw', 'event']];
  d.samples.forEach((p) => rows.push([p.t.toFixed(2), p.speed.toFixed(1), Math.round(p.rpm), Math.round(p.thr), Math.round(p.brake), S.mode === 'elec' ? 'D' : gearName(p.gear), Math.round(p.clutch), p.kw.toFixed(2), `"${(evAt.get(p) || '').replace(/"/g, "'")}"`]));
  const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `moto-zero-dyno-${S.mode}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ==========================================================================
   10. Main loop
   ========================================================================== */
function startLoop() { S.last_tick_ms = performance.now(); requestAnimationFrame(tick); }

function tick(now) {
  const dt = Math.min(0.1, (now - S.last_tick_ms) / 1000);
  S.last_tick_ms = now;
  S._dt = dt;

  updateRiderTick(dt);            // reads the cockpit: throttle, brakes, clutch, gear
  const ck = S.ck;
  const ice = S.mode !== 'elec';

  S.live = !!(ck && (ck.running || ck.cranking));
  if (ice && S.live) {
    S.rpm = ck.rpm;               // the cockpit's engine model is the source of truth
  } else if (S.rider.throttle > 0.02 && !ck) {
    const target = Math.max(S.base_rpm, 900 + S.rider.throttle * 7000);
    S.rpm += (target - S.rpm) * Math.min(1, 2.0 * dt);
  } else {
    S.rpm += (S.base_rpm - S.rpm) * Math.min(1, 1.0 * dt);   // demo idle while the cockpit engine is off
  }

  if (S.running && S.rpm > 10) {
    const shaftDegPerSec = (360 * S.rpm / 60) / 60;
    const cycleDeg = S.mode === '2t' ? 360 : 720;
    S.crank_deg = (S.crank_deg + shaftDegPerSec * dt) % cycleDeg;
  }

  // Electric drive: the cockpit's motor when the bike is READY, else a local demo for the close-ups
  if (!ice) {
    const load = S.rider.throttle;
    if (ck && ck.running) {
      S.elec.rpm = ck.rpm;
      S.elec.torque = ck.Te || 0;
    } else {
      S.elec.rpm += (load * 10000 - S.elec.rpm) * Math.min(1, 3.0 * dt);
      S.elec.torque = load * 60;
    }
    const p = ck ? (ck.Pw || 0) / 30000 : load;
    S.elec.motor_temp += (60 + p * 60 - S.elec.motor_temp) * 0.3 * dt;
    S.elec.controller_temp += (50 + p * 40 - S.elec.controller_temp) * 0.3 * dt;
    S.elec.battery_soc = Math.max(0, S.elec.battery_soc - p * 0.05 * dt);
  }

  if (ck) {
    S.speed = ck.v * 3.6;
  } else {
    const drive = S.rider.throttle > 0.05;
    const target = drive ? (ice ? kmhFromWheelRPM(wheelRPMFromEngine(S.rpm)) : kmhFromWheelRPM(S.elec.rpm / 8.5)) : 0;
    const accel = target > S.speed ? 0.8 : 0.25 + S.rider.brake * 2.2;
    S.speed += (target - S.speed) * Math.min(1, accel * dt);
    S.speed = Math.max(0, S.speed - S.rider.brake * 40 * dt);
  }

  updateOverviewTick(dt);
  updateComponentModelTick(dt);
  updateGraphsTick(dt);
  const cfg = S.selected_part && (COMPONENT_VIEWS[S.selected_part]);
  if (cfg && cfg.update) cfg.update(dt);

  if (S.dyno.recording) {
    detectEvents(ck);
    recordDynoSample(now);
    if ((++S._dynoFrame) % 6 === 0) renderDyno();
  }
  requestAnimationFrame(tick);
}

/* ---------- Keyboard ---------- */
function pageShortcut(key, repeat) {
  const lb = $('#mz-lightbox');
  if (key === 'Escape') {
    if (lb && lb.classList.contains('is-open')) closePlate();
    else if ($('#ute-help').classList.contains('is-open')) closeHelp();
    else selectPart(null);
    return true;
  }
  if (key === '?' || key === '/') { openHelp(); return true; }
  if (key === ' ') { toggleRun(); return true; }
  if (repeat) return true;
  if (['1', '2', '3'].includes(key)) { switchMode(['4t', '2t', 'elec'][+key - 1]); return true; }
  if (key === 'g' || key === 'G') { toggleDyno(); return true; }
  return false;
}
function wireChromeGlobal() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target || {};
    const tag = t.tagName || '';
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const typing = tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable || (tag === 'INPUT' && !['range', 'checkbox', 'radio', 'button'].includes(t.type));
    if (typing) return;
    const modalOpen = $('#ute-help').classList.contains('is-open') || $('#mz-lightbox').classList.contains('is-open');
    if (e.key === 'Escape' || e.key === '?' || e.key === '/') { e.preventDefault(); pageShortcut(e.key); return; }
    if (modalOpen) return;
    if (e.key === ' ') {
      if (t.closest && t.closest('button, [role="button"], a, input, summary')) return;
      e.preventDefault(); pageShortcut(' '); return;
    }
    if (['1', '2', '3', 'g'].includes(k) && tag !== 'INPUT') { pageShortcut(k, e.repeat); return; }
    if (!COCKPIT_KEYS.has(k)) return;
    if (tag === 'INPUT' && t.type === 'range' && k.startsWith('Arrow')) return;   // arrows still move a focused slider
    e.preventDefault();
    if (!e.repeat) { heldKeys.add(k); markKey(k, true); }
    sendKey('keydown', e.key, e.repeat);
  });
  document.addEventListener('keyup', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (!COCKPIT_KEYS.has(k)) return;
    // Release even if a modifier is down or focus moved: a stuck throttle is worse than a spare keyup.
    sendKey('keyup', e.key);
    heldKeys.delete(k); markKey(k, false);
  });
  // Safety: anything that takes the keyboard away releases every hold.
  window.addEventListener('pointerup', () => { S.rider.throttle_hold = false; });
  window.addEventListener('blur', () => {
    // Focus moving into the cockpit is not a real blur: its keyups still arrive there.
    setTimeout(() => {
      if (document.hasFocus()) return;
      releaseHeldKeys();
      S.rider.throttle_hold = false;
      Object.assign(S.cv, { carb_hold: false, spark_hold: false, gear_hold: false, brake_hold: false });
    }, 0);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) releaseHeldKeys(); });
}


/* ==========================================================================
   15. Boot
   ========================================================================== */
if (document.getElementById('ute-root')) {
  try {
    const q = new URLSearchParams(location.search);
    if (['4t', '2t', 'elec'].includes(q.get('mode'))) S.mode = q.get('mode');
    // Engine size from the Bike builder: ?bore=mm&stroke=mm&cr=ratio
    const num = (k, lo, hi) => { const v = parseFloat(q.get(k)); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null; };
    const bore = num('bore', 40, 100), stroke = num('stroke', 40, 90), cr = num('cr', 7, 14);
    if (bore) S.bore_mm = bore;
    if (stroke) S.stroke_mm = stroke;
    if (cr) S.compression = cr;
    if (q.get('part') && (PARTS[q.get('part')] || COMPONENT_VIEWS[q.get('part')])) S.selected_part = q.get('part');
  } catch (e) { /* noop */ }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) S.base_rpm = S.rpm = 1200;
  S.dyno = freshDyno();
  defsPackMetals();
  render();
  if (!EMBED) recordTool(($('#ute-root').dataset.page || 'overview'), { visited: true });
  wireChromeGlobal();
  startLoop();
  if (S.selected_part) requestAnimationFrame(() => { applyMotoHighlight(); });
}
