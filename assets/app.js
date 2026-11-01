/* ==========================================================================
   Under the Engine — the Lab
   One page, one app. See moto-spec/01-SPEC.md, 02-DESIGN.md, 03-FUNCTIONS.md.
   ========================================================================== */
import {
  ns, txt, iso3DBox, hexBolt, defsPackMetals, GEAR, displacementCC, approxTorqueNm,
  wheelRPMFromEngine, kmhFromWheelRPM, clamp, fmt, buildEngine, buildTimingStrip, strokeAt,
} from './core.js';
import { PARTS, PART_CATEGORY, CATEGORIES, INTERACTIVE_PARTS, MODE_INFO } from './content/parts.js';

/* ---------- 1. State ---------- */
const S = {
  mode: '4t',
  view: 'diagram',
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

  dyno: { recording: false, start_ms: 0, samples: [], maxSamples: 600, peak_speed: 0, peak_rpm: 0, peak_power: 0, tto100: null, avg_throttle: 0 },

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
  const info = MODE_INFO[S.mode];
  root.innerHTML = `
    <header class="ute-top">
      <a class="ute-brand" href="./" aria-label="Moto Zero home">
        <img class="ute-brand-mark" src="assets/brand-mark.svg" alt="">
        <span class="ute-brand-word">moto zero</span>
        <span class="ute-brand-sub">Transitions Lab</span>
      </a>
      <nav class="ute-nav" aria-label="Sections">
        <a href="./" aria-current="page">Lab</a>
        <a href="learn/">Learn</a>
        <a href="quiz/">Quiz</a>
        <a href="sources/">Sources</a>
      </nav>
      <span class="ute-top-spacer"></span>
      <div class="ute-seg ute-mode-switch" role="group" aria-label="Mode">
        ${['4t', '2t', 'elec'].map((m) => `<button type="button" data-mode="${m}" class="${S.mode === m ? 'is-on' : ''}" aria-pressed="${S.mode === m}">${MODE_INFO[m].short}</button>`).join('')}
      </div>
      <div class="ute-top-actions">
        <button class="ute-iconbtn" type="button" data-run aria-label="Play / pause animation (Space)">${S.running ? ICON.pause : ICON.play}</button>
        <button class="ute-iconbtn" type="button" data-help aria-label="Help (?)">${ICON.help}</button>
      </div>
    </header>

    <section class="ute-section ute-overview" aria-labelledby="ov-h">
      <div class="ute-section-head">
        <div>
          <h2 id="ov-h">${info.name}</h2>
          <p class="ute-sub">${info.blurb}</p>
        </div>
        <div class="ute-head-tools">
          <div class="ute-seg ute-view-toggle" role="group" aria-label="View">
            <button type="button" data-view="diagram" class="${S.view === 'diagram' ? 'is-on' : ''}">Diagram</button>
            <button type="button" data-view="3d" class="${S.view === '3d' ? 'is-on' : ''}">3D</button>
          </div>
          <span class="ute-legend"><i></i>= interactive</span>
        </div>
      </div>
      <div class="ute-chips" role="group" aria-label="System categories">
        ${CATEGORIES.map((c) => `<button type="button" class="ute-chip ${S.category === c.k ? 'is-on' : ''}" data-cat="${c.k}">${c.label}</button>`).join('')}
        <button type="button" class="ute-chip is-action" data-open-cv="wiring">Wiring →</button>
      </div>
      <div class="ute-moto-wrap ${S.view === '3d' ? 'is-3d' : ''}">
        <div class="ute-moto-scroll">
          <svg id="ute-moto" class="ute-moto-svg" viewBox="0 0 1200 600" role="img" aria-label="${info.name} overview — click a part"></svg>
        </div>
      </div>
    </section>

    <section class="ute-cview" id="ute-cview-slot" aria-live="polite"></section>

    <section class="ute-section ute-rider" aria-labelledby="ride-h">
      <div class="ute-section-head">
        <div>
          <h2 id="ride-h">Ride</h2>
          <p class="ute-sub">Twist the throttle, pull the brake, honk the horn.</p>
        </div>
      </div>
      <div class="ute-rider-wrap">
        <svg id="ute-rider" viewBox="0 0 900 320" role="img" aria-label="Handlebar, top-down"></svg>
        <div class="ute-toast" id="ute-toast"></div>
      </div>
      <div class="ute-dash" id="ute-dash">
        <div class="cell"><div class="l">Throttle</div><div class="v" data-d="throttle">0 %</div></div>
        <div class="cell"><div class="l">Brake</div><div class="v" data-d="brake">0 %</div></div>
        <div class="cell"><div class="l">Clutch</div><div class="v" data-d="clutch">0 %</div></div>
        <div class="cell"><div class="l">${S.mode === 'elec' ? 'Motor rpm' : 'Engine rpm'}</div><div class="v" data-d="rpm">0</div></div>
        <div class="cell"><div class="l">Speed</div><div class="v" data-d="kmh">0 km/h</div></div>
      </div>
      <p class="ute-rider-hints">Press &amp; hold the right grip (throttle), the right lever (front brake) or the left lever (clutch). Tap horn, kill switch and starter.</p>
    </section>

    <section class="ute-section ute-dyno" aria-labelledby="dyno-h">
      <div class="ute-section-head">
        <div>
          <h2 id="dyno-h">Dyno</h2>
          <p class="ute-sub">Start a test, then ride above. Four channels at 20 Hz over a rolling 30 s window.</p>
        </div>
        <div class="ute-btnrow">
          <button type="button" class="ute-btn ${S.dyno.recording ? 'is-rec' : 'is-primary'}" data-dyno="start">${S.dyno.recording ? '■ Stop test' : '● Start test'}</button>
          <button type="button" class="ute-btn" data-dyno="reset">Reset</button>
        </div>
      </div>
      <div class="ute-dyno-charts" id="ute-dyno-charts"></div>
      <div class="ute-findings" id="ute-findings"></div>
    </section>

    <footer class="ute-footer">
      <span>Moto Zero · Transitions Lab · CC BY-SA 4.0 · numbers are illustrative</span>
      <span><a href="learn/">Learn the theory →</a> · <a href="quiz/">Test yourself →</a> · <a href="sources/">Sources &amp; credits</a></span>
    </footer>

    <div class="ute-modal" id="ute-help" role="dialog" aria-modal="true" aria-labelledby="help-h">
      <div class="ute-modal-box">
        <h3 id="help-h">How to use the Lab</h3>
        <p>Pick a mode at the top. Click any part of the motorcycle to open its close-up below. Parts with a pulsing <b style="color:var(--warm)">orange dot</b> are interactive — hold the big green button to drive them.</p>
        <div class="ute-kbd">
          <kbd>Space</kbd><span>Pause / resume the engine animation</span>
          <kbd>Esc</kbd><span>Close the component view</span>
          <kbd>?</kbd><span>Open this help</span>
        </div>
        <p>Use <b>Ride</b> to feel the bike and <b>Dyno</b> to record a run. Want the theory first? Head to <a href="learn/">Learn</a>, then try the <a href="quiz/">Quiz</a>.</p>
        <div class="ute-btnrow" style="justify-content:flex-end"><button class="ute-btn is-primary" type="button" data-help-close>Got it</button></div>
      </div>
    </div>
  `;
  wireChrome();
  mountOverviewSVG();
  renderComponentView();
  mountRider();
  mountDyno();
}

function wireChrome() {
  $$('.ute-mode-switch button').forEach((b) => b.addEventListener('click', () => switchMode(b.dataset.mode)));
  $$('.ute-view-toggle button').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.view;
    if (v === S.view) return;
    S.view = v;
    $$('.ute-view-toggle button').forEach((x) => x.classList.toggle('is-on', x.dataset.view === v));
    $('.ute-moto-wrap').classList.toggle('is-3d', v === '3d');
    mountOverviewSVG();
    syncURL();
  }));
  $$('.ute-chips [data-cat]').forEach((b) => b.addEventListener('click', () => {
    S.category = b.dataset.cat;
    $$('.ute-chips [data-cat]').forEach((x) => x.classList.toggle('is-on', x.dataset.cat === S.category));
    applyMotoCategory();
  }));
  $('[data-open-cv="wiring"]').addEventListener('click', () => selectPart('wiring', true));
  $('[data-run]').addEventListener('click', toggleRun);
  $('[data-help]').addEventListener('click', openHelp);
  $('[data-help-close]').addEventListener('click', closeHelp);
  $('#ute-help').addEventListener('click', (e) => { if (e.target.id === 'ute-help') closeHelp(); });
  $('[data-dyno="start"]').addEventListener('click', toggleDyno);
  $('[data-dyno="reset"]').addEventListener('click', resetDyno);
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
    if (S.view !== 'diagram') u.searchParams.set('view', S.view); else u.searchParams.delete('view');
    if (S.selected_part) u.searchParams.set('part', S.selected_part); else u.searchParams.delete('part');
    history.replaceState(null, '', u);
  } catch (e) { /* file:// or sandboxed */ }
}

/* ==========================================================================
   3-4. Overview drawing
   ========================================================================== */
const laneY = { 1: 28, 2: 70, 3: 530, 4: 570 };

function callout({ key, sx, sy, lx, lane, label }) {
  const ly = laneY[lane];
  const grp = ns('g', { class: 'ute-callout', 'data-part': key });
  const d = `M ${sx} ${sy} L ${lx} ${ly + (lane <= 2 ? 10 : -14)}`;
  grp.appendChild(ns('path', { class: 'ute-callout-leader', d }));
  grp.appendChild(ns('circle', { class: 'ute-callout-dot', cx: sx, cy: sy, r: 3 }));
  const t = ns('text', { class: 'ute-callout-label', x: lx, y: ly, 'text-anchor': 'middle' });
  t.textContent = (label || partName(key)).toUpperCase();
  grp.appendChild(t);
  return grp;
}

/* Palette per view */
function pal(shaded, mode) {
  if (!shaded) {
    return {
      tank: '#FFFFFF', alu: '#FFFFFF', case: '#EFEAE0', steel: '#FFFFFF', chrome: '#FFFFFF', tyre: '#FFFFFF',
      rim: '#F6F5F2', seat: '#EFEAE0', lamp: '#FFFFFF', pack: '#EFEAE0', copper: '#FFFFFF', frame: '#FFFFFF',
      frameW: 9, frameIn: '#F6F5F2', tail: '#F9DECB', fin: '#FFFFFF', disc: '#F6F5F2', dark: '#FFFFFF',
    };
  }
  return {
    tank: mode === '2t' ? 'url(#m-tank-2t)' : mode === 'elec' ? 'url(#m-tank-el)' : 'url(#m-tank-4t)',
    alu: 'url(#m-alu)', case: 'url(#m-case)', steel: 'url(#m-steel)', chrome: 'url(#m-chrome)', tyre: 'url(#m-tyre)',
    rim: '#E9E5DC', seat: 'url(#m-seat)', lamp: mode === 'elec' ? 'url(#m-lamp-led)' : 'url(#m-lamp)', pack: 'url(#m-pack)',
    copper: 'url(#m-copper)', frame: mode === '2t' ? '#2E5FA8' : mode === 'elec' ? '#2B2F33' : '#1A1816',
    frameW: 9, frameIn: mode === '2t' ? '#5B86C8' : '#5A5F66', tail: '#D2442E', fin: 'url(#m-alu)', disc: 'url(#m-chrome)', dark: '#2A2826',
  };
}

const E = (tag, attrs) => ns(tag, Object.assign({ stroke: '#0A0A0A', 'stroke-width': 2 }, attrs));

function shape(key, els) {
  const g = ns('g', { class: 'ute-shape', 'data-shape': key, tabindex: 0, role: 'button', 'aria-label': partName(key) });
  els.flat().forEach((e) => e && g.appendChild(e));
  return g;
}

function tube(d, p, w) {
  return [E('path', { d, fill: 'none', stroke: '#0A0A0A', 'stroke-width': (w || p.frameW), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    ns('path', { d, fill: 'none', stroke: p.frameIn, 'stroke-width': (w || p.frameW) - 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'no-hl' })];
}

function quad(T, B, w1, w2) {
  const dx = B[0] - T[0], dy = B[1] - T[1], len = Math.hypot(dx, dy);
  const nx = -dy / len, ny = dx / len;
  return `${T[0] + nx * w1 / 2},${T[1] + ny * w1 / 2} ${B[0] + nx * w2 / 2},${B[1] + ny * w2 / 2} ${B[0] - nx * w2 / 2},${B[1] - ny * w2 / 2} ${T[0] - nx * w1 / 2},${T[1] - ny * w1 / 2}`;
}

function wheel(key, cx, cy, R, p, opts = {}) {
  const els = [];
  els.push(E('circle', { cx, cy, r: R, fill: p.tyre, 'data-fillable': '' }));
  if (p.tyre === '#FFFFFF') els.push(ns('circle', { cx, cy, r: R - 5, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 0.8, 'stroke-dasharray': opts.knobby ? '3 5' : '1 6', class: 'no-hl' }));
  else if (opts.knobby) els.push(ns('circle', { cx, cy, r: R - 3, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 6, 'stroke-dasharray': '4 6', class: 'no-hl' }));
  els.push(E('circle', { cx, cy, r: R - 16, fill: p.rim, 'stroke-width': 1.5 }));
  const rot = ns('g', { 'data-wheel': key, 'data-cx': cx, 'data-cy': cy, transform: `rotate(0 ${cx} ${cy})` });
  rot.appendChild(ns('circle', { cx, cy, r: R - 22, fill: 'none', stroke: p.tyre === '#FFFFFF' ? '#0A0A0A' : '#8F959C', 'stroke-width': 3 }));
  if (opts.cast) {
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      rot.appendChild(ns('path', { d: `M ${cx + Math.cos(a) * 16} ${cy + Math.sin(a) * 16} L ${cx + Math.cos(a) * (R - 24)} ${cy + Math.sin(a) * (R - 24)}`, stroke: p.tyre === '#FFFFFF' ? '#0A0A0A' : '#3A3E43', 'stroke-width': 7, 'stroke-linecap': 'round' }));
    }
  } else {
    const n = opts.spokes || 18;
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, b = a + 0.35;
      rot.appendChild(ns('line', { x1: cx + Math.cos(a) * 12, y1: cy + Math.sin(a) * 12, x2: cx + Math.cos(b) * (R - 23), y2: cy + Math.sin(b) * (R - 23), stroke: '#6B6963', 'stroke-width': 0.9 }));
    }
  }
  rot.appendChild(ns('circle', { cx, cy, r: 16, fill: p.alu, stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  rot.appendChild(ns('circle', { cx, cy, r: 5, fill: '#1A1816' }));
  els.push(rot);
  return shape(key, els);
}

function brakeDisc(cx, cy, r, caliper, p) {
  const rot = ns('g', { 'data-wheel': 'brake', 'data-cx': cx, 'data-cy': cy, transform: `rotate(0 ${cx} ${cy})` });
  rot.appendChild(E('circle', { cx, cy, r, fill: p.disc, 'fill-opacity': 0.92, 'stroke-width': 1.5 }));
  rot.appendChild(ns('circle', { cx, cy, r: r * 0.55, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 1 }));
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2;
    rot.appendChild(ns('circle', { cx: cx + Math.cos(a) * r * 0.78, cy: cy + Math.sin(a) * r * 0.78, r: 2.6, fill: '#0A0A0A', opacity: 0.6 }));
  }
  rot.appendChild(ns('circle', { cx, cy, r: 16, fill: p.alu, stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  const cal = E('rect', { x: caliper[0] - 13, y: caliper[1] - 24, width: 26, height: 48, fill: p.tyre === '#FFFFFF' ? '#FFFFFF' : '#B8322A', 'data-fillable': '', transform: `rotate(${caliper[2] || 0} ${caliper[0]} ${caliper[1]})` });
  return shape('brake', [rot, cal]);
}

function chainDrive(O, ro, R, rr, p) {
  // Tangent points of an open belt between two circles
  const dx = R[0] - O[0], dy = R[1] - O[1], d = Math.hypot(dx, dy);
  const a = Math.atan2(dy, dx), b = Math.asin((rr - ro) / d);
  const t1 = a - Math.PI / 2 - b, t2 = a + Math.PI / 2 + b;
  const P = (c, r, t) => [c[0] + Math.cos(t) * r, c[1] + Math.sin(t) * r];
  const [o1, r1, o2, r2] = [P(O, ro, t1), P(R, rr, t1), P(O, ro, t2), P(R, rr, t2)];
  const dPath = `M ${o1[0]} ${o1[1]} L ${r1[0]} ${r1[1]} A ${rr} ${rr} 0 0 1 ${r2[0]} ${r2[1]} L ${o2[0]} ${o2[1]} A ${ro} ${ro} 0 0 1 ${o1[0]} ${o1[1]} Z`;
  const chain = shape('chain', [
    E('path', { d: dPath, fill: 'none', 'stroke-width': 5 }),
    ns('path', { d: dPath, fill: 'none', stroke: p.tyre === '#FFFFFF' ? '#FFFFFF' : '#8F959C', 'stroke-width': 2.4, 'stroke-dasharray': '3 3', class: 'no-hl ute-chain-hatch' }),
    E('circle', { cx: O[0], cy: O[1], r: ro, fill: p.steel, 'stroke-width': 1.5 }),
  ]);
  const teeth = ns('g', { 'data-wheel': 'rear_sprocket', 'data-cx': R[0], 'data-cy': R[1], transform: `rotate(0 ${R[0]} ${R[1]})` });
  teeth.appendChild(E('circle', { cx: R[0], cy: R[1], r: rr, fill: p.alu, 'stroke-width': 1.5, 'stroke-dasharray': '5 2.5' }));
  for (let i = 0; i < 5; i++) {
    const t = i / 5 * Math.PI * 2;
    teeth.appendChild(ns('circle', { cx: R[0] + Math.cos(t) * rr * 0.6, cy: R[1] + Math.sin(t) * rr * 0.6, r: rr * 0.18, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1 }));
  }
  teeth.appendChild(ns('circle', { cx: R[0], cy: R[1], r: 8, fill: '#1A1816' }));
  const sprocket = shape('rear_sprocket', [teeth]);
  return { chain, sprocket, mid: [(r1[0] + o1[0]) / 2, (r1[1] + o1[1]) / 2] };
}

function shock(top, bot, p, w = 12) {
  const dx = bot[0] - top[0], dy = bot[1] - top[1], len = Math.hypot(dx, dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI - 90;
  const g = ns('g', { transform: `translate(${top[0]} ${top[1]}) rotate(${ang})` });
  g.appendChild(E('rect', { x: -w / 2, y: 0, width: w, height: len * 0.55, fill: p.steel, 'stroke-width': 1.5, 'data-fillable': '' }));
  g.appendChild(E('rect', { x: -3, y: len * 0.5, width: 6, height: len * 0.5, fill: p.chrome, 'stroke-width': 1.2 }));
  let d = `M ${-w} ${len * 0.12}`;
  for (let i = 0; i < 9; i++) d += ` L ${w} ${len * 0.12 + i * len * 0.07 + len * 0.035} L ${-w} ${len * 0.12 + (i + 1) * len * 0.07}`;
  g.appendChild(ns('path', { d, fill: 'none', stroke: p.tyre === '#FFFFFF' ? '#0A0A0A' : '#C2502A', 'stroke-width': 2 }));
  g.appendChild(E('circle', { cx: 0, cy: 0, r: 5, fill: p.alu, 'stroke-width': 1.2 }));
  g.appendChild(E('circle', { cx: 0, cy: len, r: 5, fill: p.alu, 'stroke-width': 1.2 }));
  return g;
}

function forks(T, B, p, w = 18) {
  const M = [T[0] + (B[0] - T[0]) * 0.52, T[1] + (B[1] - T[1]) * 0.52];
  return shape('forks', [
    E('polygon', { points: quad(T, M, w - 6, w - 6), fill: p.chrome, 'stroke-width': 1.5 }),
    E('polygon', { points: quad(M, B, w + 2, w + 2), fill: p.alu, 'stroke-width': 1.5, 'data-fillable': '' }),
    E('rect', { x: T[0] - 20, y: T[1] - 4, width: 40, height: 10, fill: p.alu, 'stroke-width': 1.5, transform: `rotate(${Math.atan2(B[1] - T[1], B[0] - T[0]) * 180 / Math.PI - 90} ${T[0]} ${T[1]})` }),
  ]);
}

function fins(x1, x2, y1, y2, step, p) {
  const out = [];
  for (let y = y1; y <= y2; y += step) out.push(E('rect', { x: x1, y, width: x2 - x1, height: step * 0.45, fill: p.fin, 'stroke-width': 1 }));
  return out;
}

/* ---------------- Classic 4T ---------------- */
function drawClassic4T(svg, shaded = false) {
  const p = pal(shaded, '4t');
  const F = [254, 395], R = [900, 395], RT = 112;
  if (shaded) svg.appendChild(ns('ellipse', { cx: 577, cy: 512, rx: 470, ry: 14, fill: '#0A0A0A', opacity: 0.18 }));

  svg.appendChild(wheel('rear_wheel', R[0], R[1], RT, p, { spokes: 20 }));
  const cd = chainDrive([630, 372], 14, R, 36, p);
  svg.appendChild(cd.sprocket);
  svg.appendChild(shape('swingarm', [E('polygon', { points: '660,336 905,384 905,406 660,360', fill: p.steel, 'data-fillable': '' })]));
  svg.appendChild(cd.chain);
  svg.appendChild(shape('rear_shock', [shock([800, 222], [850, 384], p)]));

  // Frame
  svg.appendChild(shape('frame', [
    tube('M 372 175 L 620 195 L 760 205 L 852 214', p),
    tube('M 620 195 L 665 345', p),
    tube('M 372 175 L 430 330 L 468 420 L 622 420 L 665 345', p),
    tube('M 700 300 L 852 214', p, 7),
  ]));

  // Exhaust
  svg.appendChild(shape('exhaust', [
    ...tube('M 482 250 C 430 262 418 330 446 410 Q 460 438 520 436 L 690 424', { frameIn: shaded ? '#D9DDE1' : '#FFFFFF' }, 14),
    E('polygon', { points: '680,408 942,360 950,386 688,434', fill: p.chrome, 'data-fillable': '' }),
    ns('line', { x1: 690, y1: 414, x2: 940, y2: 368, stroke: '#FFFFFF', 'stroke-width': 2, opacity: shaded ? 0.8 : 0, class: 'no-hl' }),
  ]));

  // Engine
  svg.appendChild(shape('engine', [
    E('rect', { x: 456, y: 316, width: 190, height: 102, rx: 16, fill: p.case, 'data-fillable': '' }),
    E('circle', { cx: 512, cy: 368, r: 34, fill: p.alu, 'stroke-width': 1.5 }),
    E('circle', { cx: 598, cy: 376, r: 22, fill: p.alu, 'stroke-width': 1.5 }),
    hexBolt(512, 368, 6), hexBolt(598, 376, 5),
  ]));
  svg.appendChild(shape('cylinder', [
    E('rect', { x: 476, y: 222, width: 80, height: 96, fill: p.alu, 'data-fillable': '' }),
    ...fins(464, 568, 228, 306, 12, p),
    E('rect', { x: 470, y: 206, width: 92, height: 18, fill: p.alu }),
  ]));
  svg.appendChild(shape('spark_plug', [
    E('rect', { x: 509, y: 190, width: 12, height: 18, fill: '#F6F5F2', 'stroke-width': 1.5 }),
    E('rect', { x: 512, y: 182, width: 6, height: 9, fill: p.dark, 'stroke-width': 1 }),
  ]));
  svg.appendChild(shape('carb', [
    E('rect', { x: 562, y: 258, width: 34, height: 28, fill: p.alu, 'data-fillable': '' }),
    E('rect', { x: 570, y: 286, width: 18, height: 16, fill: p.alu, 'stroke-width': 1.5 }),
  ]));
  svg.appendChild(shape('air_filter', [
    E('path', { d: 'M 598 250 L 646 238 Q 662 270 646 302 L 598 292 Z', fill: p.case, 'data-fillable': '' }),
    ...[0, 1, 2, 3].map((i) => ns('line', { x1: 606 + i * 10, y1: 252 - i * 2, x2: 606 + i * 10, y2: 290 + i * 2, stroke: '#0A0A0A', 'stroke-width': 0.8, class: 'no-hl' })),
  ]));
  svg.appendChild(shape('battery', [
    E('rect', { x: 676, y: 214, width: 64, height: 58, fill: p.dark === '#FFFFFF' ? '#FFFFFF' : '#2A2826', 'data-fillable': '' }),
    E('rect', { x: 684, y: 206, width: 10, height: 8, fill: '#C2502A', 'stroke-width': 1 }),
    E('rect', { x: 722, y: 206, width: 10, height: 8, fill: '#0A0A0A', 'stroke-width': 1 }),
    txt(708, 248, '12V', 'middle', 11, shaded ? '#F6F5F2' : '#6B6963'),
  ]));
  svg.appendChild(shape('seat', [E('path', { d: 'M 594 190 Q 640 172 720 182 L 836 194 Q 858 200 850 214 L 602 212 Z', fill: p.seat, 'data-fillable': '' })]));
  svg.appendChild(shape('fuel_tank', [
    E('path', { d: 'M 398 186 Q 414 140 498 140 Q 580 142 612 192 L 594 210 Q 500 218 410 208 Z', fill: p.tank, 'data-fillable': '' }),
    E('circle', { cx: 470, cy: 143, r: 8, fill: p.chrome, 'stroke-width': 1.5 }),
    E('path', { d: 'M 446 172 Q 500 160 556 176 L 548 194 Q 500 184 452 192 Z', fill: shaded ? '#F2EEE4' : '#F6F5F2', 'stroke-width': 1, opacity: 0.9 }),
  ]));
  // Front end
  svg.appendChild(wheel('front_wheel', F[0], F[1], RT, p, { spokes: 20 }));
  svg.appendChild(ns('path', { d: 'M 156 344 Q 200 270 300 268 Q 330 270 348 282', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 2, 'pointer-events': 'none' }));
  svg.appendChild(brakeDisc(F[0], F[1], 56, [304, 352, 40], p));
  svg.appendChild(forks([366, 162], [262, 394], p));
  svg.appendChild(shape('headlight', [
    E('circle', { cx: 324, cy: 194, r: 28, fill: p.chrome, 'data-fillable': '' }),
    E('circle', { cx: 318, cy: 194, r: 20, fill: p.lamp, 'stroke-width': 1.2 }),
  ]));
  svg.appendChild(ns('path', { d: 'M 380 150 L 362 116 L 440 104', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 5, 'stroke-linecap': 'round', 'pointer-events': 'none' }));
  svg.appendChild(shape('instruments', [
    E('circle', { cx: 392, cy: 140, r: 14, fill: p.chrome }),
    E('circle', { cx: 392, cy: 140, r: 9, fill: '#FFFFFF', 'stroke-width': 1 }),
  ]));
  svg.appendChild(shape('tail_light', [E('rect', { x: 848, y: 198, width: 20, height: 13, fill: p.tail, 'data-fillable': '' })]));
  svg.appendChild(wiringShape('M 686 248 Q 560 228 440 196 L 352 194', null, shaded));

  [
    { key: 'headlight', sx: 312, sy: 186, lx: 170, lane: 1 },
    { key: 'instruments', sx: 392, sy: 130, lx: 330, lane: 1 },
    { key: 'fuel_tank', sx: 500, sy: 150, lx: 500, lane: 1 },
    { key: 'seat', sx: 720, sy: 186, lx: 700, lane: 1 },
    { key: 'tail_light', sx: 860, sy: 200, lx: 900, lane: 1 },
    { key: 'rear_shock', sx: 820, sy: 290, lx: 1060, lane: 1 },
    { key: 'forks', sx: 318, sy: 280, lx: 200, lane: 2 },
    { key: 'spark_plug', sx: 515, sy: 186, lx: 450, lane: 2 },
    { key: 'carb', sx: 578, sy: 270, lx: 590, lane: 2 },
    { key: 'air_filter', sx: 628, sy: 262, lx: 720, lane: 2 },
    { key: 'battery', sx: 708, sy: 230, lx: 860, lane: 2 },
    { key: 'wiring', sx: 600, sy: 230, lx: 1020, lane: 2 },
    { key: 'front_wheel', sx: 180, sy: 470, lx: 110, lane: 3 },
    { key: 'frame', sx: 440, sy: 350, lx: 360, lane: 3 },
    { key: 'cylinder', sx: 520, sy: 290, lx: 560, lane: 3 },
    { key: 'exhaust', sx: 800, sy: 398, lx: 760, lane: 3 },
    { key: 'rear_wheel', sx: 960, sy: 480, lx: 1090, lane: 3 },
    { key: 'brake', sx: 230, sy: 420, lx: 250, lane: 4 },
    { key: 'engine', sx: 560, sy: 400, lx: 470, lane: 4 },
    { key: 'chain', sx: cd.mid[0], sy: cd.mid[1], lx: 640, lane: 4 },
    { key: 'swingarm', sx: 760, sy: 362, lx: 800, lane: 4 },
    { key: 'rear_sprocket', sx: 900, sy: 372, lx: 960, lane: 4 },
  ].forEach((c) => svg.appendChild(callout(c)));
}

function wiringShape(d12, dHV, shaded) {
  const els = [];
  els.push(ns('path', { d: d12, fill: 'none', stroke: 'transparent', 'stroke-width': 14, class: 'no-hl' }));
  els.push(ns('path', { d: d12, fill: 'none', stroke: '#C2502A', 'stroke-width': 1.8, 'stroke-dasharray': '6 4' }));
  if (dHV) {
    els.push(ns('path', { d: dHV, fill: 'none', stroke: 'transparent', 'stroke-width': 14, class: 'no-hl' }));
    els.push(ns('path', { d: dHV, fill: 'none', stroke: '#1D6B55', 'stroke-width': 3, 'stroke-dasharray': '8 4' }));
  }
  void shaded;
  return shape('wiring', els);
}

/* ---------------- Motocross 2T ---------------- */
function drawMotocross2T(svg, shaded = false) {
  const p = pal(shaded, '2t');
  const F = [250, 392], R = [905, 400];
  if (shaded) svg.appendChild(ns('ellipse', { cx: 580, cy: 514, rx: 480, ry: 14, fill: '#0A0A0A', opacity: 0.18 }));

  svg.appendChild(wheel('rear_wheel', R[0], R[1], 110, p, { spokes: 24, knobby: true }));
  const cd = chainDrive([612, 330], 13, R, 34, p);
  svg.appendChild(cd.sprocket);
  svg.appendChild(shape('swingarm', [E('polygon', { points: '634,292 910,390 910,410 634,314', fill: p.alu, 'data-fillable': '' })]));
  svg.appendChild(cd.chain);
  svg.appendChild(shape('rear_shock', [shock([626, 200], [694, 322], p, 14)]));

  svg.appendChild(shape('frame', [
    tube('M 388 150 L 560 186 L 640 300', p, 10),
    tube('M 388 150 L 448 300 L 498 386 L 606 386 L 640 300', p),
    tube('M 560 186 L 872 172', p, 7),
    tube('M 640 300 L 772 180', p, 7),
  ]));
  // Rear fender (decor)
  svg.appendChild(ns('path', { d: 'M 836 170 L 1000 146 L 1004 156 L 860 184 Z', fill: shaded ? '#F6F5F2' : '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5, 'pointer-events': 'none' }));

  // Expansion chamber
  svg.appendChild(shape('exhaust', [
    E('path', { d: 'M 486 246 C 420 236 380 290 410 330 C 440 366 540 352 600 316 C 640 292 660 272 676 262', fill: 'none', 'stroke-width': 30, 'stroke-linecap': 'round', stroke: '#0A0A0A' }),
    ns('path', { d: 'M 486 246 C 420 236 380 290 410 330 C 440 366 540 352 600 316 C 640 292 660 272 676 262', fill: 'none', 'stroke-width': 25, 'stroke-linecap': 'round', stroke: shaded ? '#8F959C' : '#FFFFFF', class: 'no-hl' }),
    E('polygon', { points: '668,250 872,200 880,226 676,276', fill: p.alu, 'data-fillable': '' }),
  ]));

  svg.appendChild(shape('engine', [
    E('rect', { x: 478, y: 300, width: 140, height: 86, rx: 14, fill: p.case, 'data-fillable': '' }),
    E('circle', { cx: 530, cy: 346, r: 26, fill: p.alu, 'stroke-width': 1.5 }),
    hexBolt(530, 346, 5),
  ]));
  svg.appendChild(shape('cylinder', [
    E('polygon', { points: '494,300 574,300 566,226 486,226', fill: p.alu, 'data-fillable': '' }),
    ...fins(480, 582, 232, 292, 11, p),
    E('rect', { x: 480, y: 212, width: 92, height: 16, fill: p.alu }),
  ]));
  svg.appendChild(shape('spark_plug', [
    E('rect', { x: 520, y: 196, width: 12, height: 17, fill: '#F6F5F2', 'stroke-width': 1.5 }),
    E('rect', { x: 523, y: 188, width: 6, height: 9, fill: p.dark, 'stroke-width': 1 }),
  ]));
  svg.appendChild(shape('carb', [E('rect', { x: 580, y: 246, width: 30, height: 26, fill: p.alu, 'data-fillable': '' })]));
  svg.appendChild(shape('air_filter', [E('rect', { x: 640, y: 198, width: 70, height: 48, fill: p.case, 'data-fillable': '' })]));
  svg.appendChild(shape('battery', [
    E('rect', { x: 722, y: 206, width: 40, height: 30, fill: p.dark === '#FFFFFF' ? '#FFFFFF' : '#2A2826', 'data-fillable': '' }),
    E('rect', { x: 727, y: 200, width: 8, height: 6, fill: '#C2502A', 'stroke-width': 1 }),
  ]));
  svg.appendChild(shape('seat', [E('path', { d: 'M 520 160 L 862 166 Q 884 172 872 184 L 532 184 Z', fill: p.seat, 'data-fillable': '' })]));
  svg.appendChild(shape('fuel_tank', [
    E('path', { d: 'M 418 166 Q 456 138 540 148 L 574 188 L 440 206 Z', fill: p.tank, 'data-fillable': '' }),
    E('path', { d: 'M 446 176 L 556 166 L 566 182 L 452 196 Z', fill: shaded ? '#3E6FB7' : '#F6F5F2', 'stroke-width': 1 }),
  ]));
  svg.appendChild(wheel('front_wheel', F[0], F[1], 120, p, { spokes: 24, knobby: true }));
  svg.appendChild(ns('path', { d: 'M 168 214 L 330 178 L 340 190 L 190 226 Z', fill: shaded ? '#F6F5F2' : '#FFFFFF', stroke: '#0A0A0A', 'stroke-width': 1.5, 'pointer-events': 'none' }));
  svg.appendChild(brakeDisc(F[0], F[1], 48, [298, 352, 40], p));
  svg.appendChild(forks([382, 134], [258, 392], p, 22));
  svg.appendChild(shape('headlight', [
    E('path', { d: 'M 330 142 L 372 132 L 384 236 L 344 248 Z', fill: shaded ? '#F6F5F2' : '#FFFFFF', 'data-fillable': '' }),
    E('circle', { cx: 356, cy: 204, r: 13, fill: p.lamp, 'stroke-width': 1.2 }),
  ]));
  svg.appendChild(ns('path', { d: 'M 392 128 L 378 100 L 460 92', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 5, 'stroke-linecap': 'round', 'pointer-events': 'none' }));
  svg.appendChild(shape('instruments', [E('rect', { x: 394, y: 112, width: 20, height: 14, fill: p.dark === '#FFFFFF' ? '#FFFFFF' : '#2A2826' })]));
  svg.appendChild(shape('tail_light', [E('rect', { x: 976, y: 146, width: 16, height: 9, fill: p.tail, 'data-fillable': '' })]));
  svg.appendChild(wiringShape('M 730 222 Q 560 206 420 168 L 366 190', null, shaded));

  [
    { key: 'headlight', sx: 360, sy: 170, lx: 200, lane: 1 },
    { key: 'instruments', sx: 404, sy: 112, lx: 360, lane: 1 },
    { key: 'fuel_tank', sx: 492, sy: 156, lx: 500, lane: 1 },
    { key: 'seat', sx: 700, sy: 168, lx: 680, lane: 1 },
    { key: 'rear_shock', sx: 652, sy: 250, lx: 830, lane: 1 },
    { key: 'tail_light', sx: 984, sy: 146, lx: 1000, lane: 1 },
    { key: 'forks', sx: 330, sy: 250, lx: 140, lane: 2 },
    { key: 'spark_plug', sx: 526, sy: 190, lx: 420, lane: 2 },
    { key: 'carb', sx: 596, sy: 258, lx: 560, lane: 2 },
    { key: 'air_filter', sx: 676, sy: 222, lx: 680, lane: 2 },
    { key: 'battery', sx: 742, sy: 220, lx: 800, lane: 2 },
    { key: 'wiring', sx: 600, sy: 200, lx: 940, lane: 2 },
    { key: 'front_wheel', sx: 176, sy: 482, lx: 100, lane: 3 },
    { key: 'exhaust', sx: 420, sy: 336, lx: 320, lane: 3 },
    { key: 'engine', sx: 580, sy: 370, lx: 540, lane: 3 },
    { key: 'swingarm', sx: 780, sy: 354, lx: 760, lane: 3 },
    { key: 'rear_wheel', sx: 966, sy: 484, lx: 1090, lane: 3 },
    { key: 'brake', sx: 226, sy: 414, lx: 230, lane: 4 },
    { key: 'frame', sx: 470, sy: 330, lx: 400, lane: 4 },
    { key: 'cylinder', sx: 530, sy: 280, lx: 600, lane: 4 },
    { key: 'chain', sx: cd.mid[0], sy: cd.mid[1], lx: 780, lane: 4 },
    { key: 'rear_sprocket', sx: 905, sy: 380, lx: 950, lane: 4 },
  ].forEach((c) => svg.appendChild(callout(c)));
}

/* ---------------- Electric scrambler ---------------- */
function drawElectricBike(svg, shaded = false) {
  const p = pal(shaded, 'elec');
  const F = [254, 395], R = [900, 395], RT = 112;
  if (shaded) svg.appendChild(ns('ellipse', { cx: 577, cy: 512, rx: 470, ry: 14, fill: '#0A0A0A', opacity: 0.18 }));

  svg.appendChild(wheel('rear_wheel', R[0], R[1], RT, p, { cast: true, knobby: true }));
  const cd = chainDrive([652, 366], 16, R, 38, p);
  svg.appendChild(cd.sprocket);
  svg.appendChild(shape('swingarm', [E('polygon', { points: '680,338 905,384 905,406 680,360', fill: p.alu, 'data-fillable': '' })]));
  svg.appendChild(cd.chain);
  svg.appendChild(shape('rear_shock', [shock([800, 222], [850, 384], p)]));

  svg.appendChild(shape('frame', [
    tube('M 372 175 L 620 195 L 760 205 L 852 214', p),
    tube('M 620 195 L 680 345', p),
    tube('M 372 175 L 424 340 L 466 410 L 630 410 L 680 345', p),
    tube('M 712 296 L 852 214', p, 7),
  ]));

  svg.appendChild(shape('battery', [
    iso3DBox(438, 224, 190, 112, 22, shaded
      ? { front: '#2B2F33', top: '#4A5056', right: '#1A1D20' }
      : { front: '#FFFFFF', top: '#EFEAE0', right: '#DDD9CF' }),
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ns('line', { x1: 452 + i * 22, y1: 236, x2: 452 + i * 22, y2: 324, stroke: shaded ? '#5A5F66' : '#B9B3A4', 'stroke-width': 1, class: 'no-hl' })),
    E('rect', { x: 486, y: 266, width: 94, height: 22, fill: shaded ? '#1D6B55' : '#F6F5F2', 'stroke-width': 1.2 }),
    txt(533, 281, 'HV · 400 V', 'middle', 10, shaded ? '#F6F5F2' : '#1D6B55'),
  ]));
  svg.appendChild(shape('controller', [
    E('rect', { x: 662, y: 236, width: 78, height: 50, fill: p.alu, 'data-fillable': '' }),
    ...[0, 1, 2, 3, 4, 5].map((i) => E('rect', { x: 668 + i * 12, y: 228, width: 6, height: 8, fill: p.alu, 'stroke-width': 1 })),
  ]));
  svg.appendChild(shape('motor', [
    E('circle', { cx: 652, cy: 366, r: 44, fill: p.alu, 'data-fillable': '' }),
    ...Array.from({ length: 16 }, (_, i) => {
      const a = i / 16 * Math.PI * 2;
      return ns('line', { x1: 652 + Math.cos(a) * 30, y1: 366 + Math.sin(a) * 30, x2: 652 + Math.cos(a) * 42, y2: 366 + Math.sin(a) * 42, stroke: '#0A0A0A', 'stroke-width': 1, class: 'no-hl' });
    }),
    E('circle', { cx: 652, cy: 366, r: 24, fill: shaded ? '#1D6B55' : '#F6F5F2', 'stroke-width': 1.5 }),
    E('circle', { cx: 652, cy: 366, r: 7, fill: p.steel, 'stroke-width': 1.2 }),
  ]));
  svg.appendChild(shape('seat', [E('path', { d: 'M 594 190 Q 640 176 720 184 L 836 194 Q 858 200 850 214 L 602 212 Z', fill: p.seat, 'data-fillable': '' })]));
  // Tank cover (decor)
  svg.appendChild(ns('path', { d: 'M 398 186 Q 420 146 500 146 Q 576 150 606 192 L 590 210 Q 500 216 410 208 Z', fill: p.tank, stroke: '#0A0A0A', 'stroke-width': 2, 'pointer-events': 'none' }));
  svg.appendChild(shape('charge_port', [
    E('rect', { x: 504, y: 156, width: 30, height: 22, fill: p.alu, 'data-fillable': '' }),
    E('circle', { cx: 519, cy: 167, r: 6, fill: '#1D6B55', 'stroke-width': 1 }),
  ]));
  svg.appendChild(wheel('front_wheel', F[0], F[1], RT, p, { cast: true, knobby: true }));
  svg.appendChild(ns('path', { d: 'M 160 330 Q 210 270 300 270 Q 330 272 346 284', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 2, 'pointer-events': 'none' }));
  svg.appendChild(brakeDisc(F[0], F[1], 56, [304, 352, 40], p));
  svg.appendChild(forks([366, 162], [262, 394], p));
  svg.appendChild(shape('headlight', [
    E('circle', { cx: 324, cy: 194, r: 28, fill: shaded ? '#2B2F33' : '#FFFFFF', 'data-fillable': '' }),
    E('circle', { cx: 318, cy: 194, r: 20, fill: p.lamp, 'stroke-width': 1.2 }),
    ns('circle', { cx: 318, cy: 194, r: 12, fill: 'none', stroke: '#1D6B55', 'stroke-width': 2, class: 'no-hl' }),
  ]));
  svg.appendChild(ns('path', { d: 'M 380 150 L 362 116 L 440 104', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 5, 'stroke-linecap': 'round', 'pointer-events': 'none' }));
  svg.appendChild(shape('instruments', [E('rect', { x: 380, y: 128, width: 28, height: 20, fill: shaded ? '#1A1D20' : '#FFFFFF' })]));
  svg.appendChild(shape('tail_light', [E('rect', { x: 848, y: 198, width: 20, height: 13, fill: p.tail, 'data-fillable': '' })]));
  svg.appendChild(wiringShape('M 690 236 Q 560 220 440 196 L 352 194', 'M 628 300 L 662 276', shaded));

  [
    { key: 'headlight', sx: 312, sy: 186, lx: 170, lane: 1 },
    { key: 'instruments', sx: 394, sy: 128, lx: 330, lane: 1 },
    { key: 'charge_port', sx: 519, sy: 160, lx: 500, lane: 1 },
    { key: 'seat', sx: 720, sy: 186, lx: 700, lane: 1 },
    { key: 'tail_light', sx: 860, sy: 200, lx: 900, lane: 1 },
    { key: 'rear_shock', sx: 820, sy: 290, lx: 1060, lane: 1 },
    { key: 'forks', sx: 318, sy: 280, lx: 200, lane: 2 },
    { key: 'battery', sx: 560, sy: 236, lx: 480, lane: 2 },
    { key: 'controller', sx: 700, sy: 236, lx: 720, lane: 2 },
    { key: 'wiring', sx: 600, sy: 224, lx: 880, lane: 2 },
    { key: 'front_wheel', sx: 180, sy: 470, lx: 110, lane: 3 },
    { key: 'frame', sx: 440, sy: 360, lx: 380, lane: 3 },
    { key: 'swingarm', sx: 790, sy: 366, lx: 820, lane: 3 },
    { key: 'rear_wheel', sx: 960, sy: 480, lx: 1090, lane: 3 },
    { key: 'brake', sx: 230, sy: 420, lx: 250, lane: 4 },
    { key: 'motor', sx: 652, sy: 400, lx: 560, lane: 4 },
    { key: 'chain', sx: cd.mid[0], sy: cd.mid[1], lx: 740, lane: 4 },
    { key: 'rear_sprocket', sx: 900, sy: 372, lx: 940, lane: 4 },
  ].forEach((c) => svg.appendChild(callout(c)));
}

const drawClassic4T3D = (svg) => drawClassic4T(svg, true);
const drawMotocross2T3D = (svg) => drawMotocross2T(svg, true);
const drawElectricBike3D = (svg) => drawElectricBike(svg, true);

function mountOverviewSVG() {
  const svg = $('#ute-moto');
  if (!svg) return;
  svg.innerHTML = '';
  svg.classList.toggle('is-3d', S.view === '3d');
  if (S.view === '3d') {
    if (S.mode === '4t') drawClassic4T3D(svg);
    else if (S.mode === '2t') drawMotocross2T3D(svg);
    else drawElectricBike3D(svg);
  } else {
    if (S.mode === '4t') drawClassic4T(svg);
    else if (S.mode === '2t') drawMotocross2T(svg);
    else drawElectricBike(svg);
  }
  wireOverviewClicks(svg);
  applyMotoHighlight();
  applyMotoCategory();
  requestAnimationFrame(() => paintInteractiveDots());
}

function wireOverviewClicks(svg) {
  svg.addEventListener('click', (e) => {
    const el = e.target.closest('[data-shape], .ute-callout');
    if (!el) return;
    selectPart(el.getAttribute('data-shape') || el.getAttribute('data-part'));
  });
  svg.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest('[data-shape]');
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    selectPart(el.getAttribute('data-shape'));
  });
}

function applyMotoHighlight() {
  const svg = $('#ute-moto');
  if (!svg) return;
  svg.querySelectorAll('.is-hl').forEach((el) => el.classList.remove('is-hl'));
  if (!S.selected_part) return;
  const k = S.selected_part;
  svg.querySelectorAll(`[data-shape="${k}"], .ute-callout[data-part="${k}"]`).forEach((el) => el.classList.add('is-hl'));
}

function applyMotoCategory() {
  const svg = $('#ute-moto');
  if (!svg) return;
  svg.setAttribute('data-cat', S.category);
  svg.querySelectorAll('.ute-shape').forEach((el) => el.classList.remove('in-cat'));
  if (S.category === 'all') return;
  svg.querySelectorAll('[data-shape]').forEach((el) => {
    if (PART_CATEGORY[el.getAttribute('data-shape')] === S.category) el.classList.add('in-cat');
  });
}

function paintInteractiveDots() {
  const svg = $('#ute-moto');
  if (!svg) return;
  svg.querySelectorAll('.ute-ix-dot').forEach((el) => el.remove());
  const seen = new Set();
  svg.querySelectorAll('[data-shape]').forEach((el) => {
    const k = el.getAttribute('data-shape');
    if (!k || seen.has(k) || !INTERACTIVE_PARTS.has(k)) return;
    seen.add(k);
    try {
      const b = el.getBBox();
      if (!b.width) return;
      svg.appendChild(ns('circle', { class: 'ute-ix-dot', cx: b.x + b.width / 2, cy: b.y + b.height / 2, r: 5, 'data-ix': k }));
    } catch (e) { /* bbox not ready */ }
  });
}

function updateOverviewTick(dt) {
  const svg = $('#ute-moto');
  if (!svg) return;
  const wheelRPM = S.speed / 3.6 / (2 * Math.PI * GEAR.wheel_r_m) * 60;
  const degStep = wheelRPM / 60 * 360 * dt / 6; // 6x slow-mo so spokes stay readable
  if (!degStep) return;
  svg.querySelectorAll('[data-wheel]').forEach((g) => {
    const cur = (parseFloat(g.getAttribute('data-rot') || '0') - degStep) % 360; // bike faces left → wheels turn CCW
    g.setAttribute('data-rot', cur);
    g.setAttribute('transform', `rotate(${cur} ${g.getAttribute('data-cx')} ${g.getAttribute('data-cy')})`);
  });
  svg.querySelectorAll('.ute-chain-hatch').forEach((h) => {
    const o = (parseFloat(h.getAttribute('data-off') || '0') + degStep * 0.6) % 600;
    h.setAttribute('data-off', o);
    h.setAttribute('stroke-dashoffset', o);
  });
}

/* ==========================================================================
   5. Component view
   ========================================================================== */
function selectPart(key, force) {
  S.selected_part = (!force && (S.selected_part === key || key == null)) ? null : key;
  if (key == null) S.selected_part = null;
  applyMotoHighlight();
  renderComponentView();
  syncURL();
  if (S.selected_part && window.matchMedia('(max-width: 960px)').matches) {
    $('#ute-cview-slot').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function emptyCViewHTML() {
  return '<div class="ute-cview-empty">No part selected · click one above</div>';
}

function renderComponentView() {
  const slot = $('#ute-cview-slot');
  if (!slot) return;
  // Reset local holds so nothing sticks when switching views
  Object.assign(S.cv, { carb_hold: false, spark_hold: false, gear_hold: false, brake_hold: false, throttle_hold: false, particles: [] });
  if (!S.selected_part) { slot.innerHTML = emptyCViewHTML(); return; }
  const cfg = COMPONENT_VIEWS[S.selected_part] || basicCard(S.selected_part);
  slot.innerHTML = `
    <div class="ute-cview-head">
      <div><span class="ute-label">${cfg.kind || 'Component'}</span><h2>${cfg.title}</h2></div>
      <button class="ute-cview-close" type="button" data-cv-close>Close ✕</button>
    </div>
    <div class="ute-cview-stage ${cfg.hold ? '' : 'no-action'}" id="ute-cview-stage">${cfg.html()}${cfg.hold ? holdHTML(cfg.hold) : ''}</div>
    ${cfg.under ? cfg.under() : ''}
    ${cfg.sideHTML ? `<div class="ute-cview-side">${cfg.sideHTML()}</div>` : ''}
  `;
  S._activeCfg = cfg;
  if (cfg.mount) cfg.mount();
  if (cfg.hold) wireHold($('.ute-hold', slot), cfg.hold.flag);
  slot.querySelector('[data-cv-close]').addEventListener('click', () => selectPart(null));
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
  return `<div class="ute-stats">${items.map(([k, l, u]) => `<div class="stat"><div class="stat-l">${l}</div><div class="stat-v"><span data-sv="${k}">—</span><small>${u || ''}</small></div></div>`).join('')}</div>`;
}
function setStat(k, v) {
  const el = document.querySelector(`[data-sv="${k}"]`);
  if (el && el.textContent !== String(v)) el.textContent = v;
}
function card(title, body) { return `<div class="ute-card"><h4>${title}</h4>${body}</div>`; }
function list(items) { return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`; }
function renderImg(key) {
  const src = S.assets[key];
  return src ? `<img class="ute-render" src="${src}" alt="${partName(key)} render" loading="lazy">` : '';
}

/* ---------- Basic card (fallback) ---------- */
function basicCard(key) {
  const P = PARTS[key] || { name: 'Component', tag: 'Component', desc: '', notes: '' };
  return {
    title: P.name,
    kind: `${P.tag || 'Component'} · Overview`,
    html: () => `${statusHTML(P.name, P.desc ? P.desc.split('. ')[0] + '.' : 'Static view.', (PART_CATEGORY[key] || '').toUpperCase())}<svg class="ute-cv-svg" id="cv-basic" viewBox="0 0 400 240"></svg>`,
    sideHTML: () => card('Role', `${renderImg(key)}<p>${P.desc || '—'}</p>`) + card('Note', `<p>${P.notes || '—'}</p>`) +
      card('Learn more', `<p>Read the theory behind this part, then test yourself.</p><div class="ute-btnrow"><a class="ute-linkbtn" href="learn/#${P.chapter || 'anatomy'}">Learn →</a><a class="ute-linkbtn" href="quiz/?topic=${P.chapter || 'anatomy'}">Quiz →</a></div>`),
    mount: () => {
      const out = $('#cv-basic');
      const src = $(`#ute-moto [data-shape="${key}"]`);
      if (!out || !src) return;
      let b;
      try { b = src.getBBox(); } catch (e) { return; }
      const pad = Math.max(b.width, b.height) * 0.18 + 8;
      out.setAttribute('viewBox', `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`);
      const clone = src.cloneNode(true);
      clone.removeAttribute('class');
      clone.removeAttribute('tabindex');
      clone.removeAttribute('role');
      out.appendChild(clone);
    },
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
        ${slider('base_rpm', 'Idle / target RPM', 600, 10000, 100, S.base_rpm)}
        ${slider('bore_mm', 'Bore', 50, 100, 1, S.bore_mm, 'mm')}
        ${slider('stroke_mm', 'Stroke', 40, 90, 1, S.stroke_mm, 'mm')}
        ${slider('compression', 'Compression ratio', 7, 14, 0.1, S.compression, ':1')}
      </div>`) +
      card('Outputs', statsHTML([['disp', 'Displacement', 'cc'], ['cr', 'Compression', ':1'], ['tq', 'Torque', 'Nm'], ['kw', 'Power', 'kW']])) +
      card('Run', `<p>${focus || 'Animation runs at 60× slow-motion so you can follow each stroke.'}</p>
        <div class="ute-btnrow"><button class="ute-btn is-primary" type="button" data-cv-run>${S.running ? 'Pause' : 'Run'}</button><button class="ute-btn" type="button" data-cv-step>Step +30°</button></div>
        <p style="margin-top:10px">Hold the throttle in <b>Ride</b> to rev it up.</p>`),
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
      setStatus(r.spark ? 'Spark!' : s.label, STROKE_DESC[S.mode][s.k], `θ ${Math.round(S.crank_deg)}° · ${Math.round(S.rpm)} rpm`);
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
    blowdown: 'Piston uncovers the exhaust port — pressure blows out.',
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
    card('Why it beats ICE', list(['Peak torque from 0 rpm — no clutch, no revving.', '~90 % efficient vs ~30 % for a petrol engine.', 'One moving part: the rotor.'])) +
    card('How it spins', '<p>The controller feeds three phases of AC into the stator windings in turn. That makes a rotating magnetic field. The rotor\'s permanent magnets chase it — N pulled to S — and the shaft turns.</p>'),
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
    svg.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 114, fill: '#FBFAF7', stroke: '#B9B3A4', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
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
      rotor.appendChild(ns('circle', { cx: C[0] + Math.cos(a) * 55, cy: C[1] + Math.sin(a) * 55, r: 12, fill: '#FBFAF7', stroke: '#0A0A0A', 'stroke-width': 1 }));
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
    setStat('m_tq', fmt(S.rider.throttle * 95));
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
    card('Parts', list(['Venturi — narrow throat speeds air up, drops pressure.', 'Main jet — fuel is pulled up by that low pressure.', 'Float bowl — keeps the fuel level constant.', 'Butterfly — the throttle plate you open with your wrist.'])) +
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
    svg.appendChild(ns('rect', { x: 268, y: 266, width: 40, height: 14, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
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
  sideHTML: () => card('How', '<p>The coil is a transformer. 12 V flows through a few hundred primary turns and builds a magnetic field. Cut it, and the field collapses through ~20 000 secondary turns — <b>~25 000 V</b> jumps the plug gap.</p>') +
    card('Parts', list(['Battery — 12 V supply', 'Coil — primary + secondary windings', 'HT lead — insulated high-tension wire', 'Plug — centre + ground electrode, ~0.7 mm gap'])) +
    card('Timing', `<p>${S.mode === '2t' ? 'A two-stroke fires <b>every revolution</b>.' : 'A four-stroke fires <b>once every two revolutions</b>, just before TDC on the compression stroke.'}</p>` + statsHTML([['s_kv', 'Last spark', 'kV'], ['s_n', 'Sparks', '']])),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-spark');
    svg.appendChild(iso3DBox(40, 250, 90, 60, 30, { front: '#2A2826', top: '#4A4642', right: '#1A1816' }));
    svg.appendChild(txt(85, 286, '12 V', 'middle', 13, '#F6F5F2'));
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
    svg.appendChild(ns('rect', { x: X - 14, y: 58, width: 28, height: 70, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    for (let i = 0; i < 4; i++) svg.appendChild(ns('line', { x1: X - 14, x2: X + 14, y1: 66 + i * 12, y2: 66 + i * 12, stroke: '#B9B3A4' }));
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
        setStatus('Fired!', 'Field collapses — ~25 kV jumps the gap and lights the charge.', `${fmt(S.cv.fire_kv, 1)} kV`);
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
    card('Parts', list(['Front (output) sprocket — 15 teeth', 'Chain — 520 pitch, ~110 links', 'Rear sprocket — 39 teeth', 'Primary drive + gearbox before it'])) +
    card('Rule', '<p><b>Smaller rear sprocket</b> = higher top speed, softer pull. <b>Bigger rear sprocket</b> = quicker acceleration, lower top speed. One tooth at the front ≈ three at the back.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-chain');
    const FR = [230, 180], RR = [520, 180];
    svg.appendChild(iso3DBox(20, 110, 150, 140, 40, { front: '#B8B2A6', top: '#E9E5DC', right: '#7E776B' }));
    svg.appendChild(txt(95, 186, 'ENGINE', 'middle', 11, '#0A0A0A'));
    svg.appendChild(txt(95, 202, '+ GEARBOX', 'middle', 9, '#2A2826'));
    // Wheel
    const wheelG = ns('g');
    wheelG.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 160, fill: 'url(#m-tyre)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    wheelG.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 138, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
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
      rs.appendChild(ns('circle', { cx: RR[0] + Math.cos(a) * 40, cy: RR[1] + Math.sin(a) * 40, r: 13, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
    }
    rs.appendChild(ns('circle', { cx: RR[0], cy: RR[1], r: 14, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    svg.appendChild(rs);
    // Chain
    const chainD = `M ${FR[0]} ${FR[1] - 28} L ${RR[0]} ${RR[1] - 70} A 70 70 0 0 1 ${RR[0]} ${RR[1] + 70} L ${FR[0]} ${FR[1] + 28} A 28 28 0 0 1 ${FR[0]} ${FR[1] - 28} Z`;
    svg.appendChild(ns('path', { d: chainD, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 9 }));
    const hatch = ns('path', { d: chainD, fill: 'none', stroke: '#B9B3A4', 'stroke-width': 5, 'stroke-dasharray': '6 4' });
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
    const eng = Math.max(S.cv.gear_rpm, S.rider.throttle > 0.05 && S.mode !== 'elec' ? S.rpm : 0);
    const ratio = 39 / 15;
    const sprRPM = eng / (GEAR.primary * GEAR.gear3);
    const whlRPM = sprRPM / ratio;
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
    setStatus(eng > 50 ? 'Driving' : 'Stopped', eng > 50 ? 'Front sprocket pulls the chain; the big rear sprocket turns 2.6× slower.' : 'Hold REV to spin the engine and drive the rear wheel.', `${Math.round(eng)} rpm`);
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
  sideHTML: () => card('Live state', statsHTML([['b_bar', 'Line pressure', 'bar'], ['b_sq', 'Pad squeeze', '%'], ['b_t', 'Disc temp', '°C']])) +
    card('Parts', list(['Lever + master cylinder — your hand makes pressure', 'Brake line — carries incompressible fluid', 'Caliper pistons — push pads onto the disc', 'Disc — turns motion into heat'])) +
    card('How', '<p>Hydraulics multiply force: a small master piston pushes fluid into bigger caliper pistons, so a 2-finger pull becomes a clamp of over <b>10 kN</b>. Friction converts the bike\'s kinetic energy into heat in the disc.</p>'),
  mount: () => {
    defsPackMetals();
    const svg = $('#cv-brake');
    const C = [230, 200];
    const disc = ns('g');
    disc.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 160, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    disc.appendChild(ns('circle', { cx: C[0], cy: C[1], r: 92, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
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
    svg.appendChild(ns('path', { d: `M ${SX - 80} 90 L ${SX + 80} 90 L ${SX + 80} 320 L ${SX - 80} 320 Z`, fill: '#F2EEE4', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('rect', { x: SX - 6, y: 70, width: 12, height: 270, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    const mk = (side) => {
      const g = ns('g');
      const x = side < 0 ? SX - 70 : SX + 22;
      g.appendChild(ns('rect', { x, y: 130, width: 48, height: 40, fill: '#E9E5DC', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      g.appendChild(ns('rect', { x, y: 240, width: 48, height: 40, fill: '#E9E5DC', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
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
    const spin = (90 + S.speed * 4) * (1 - pct * 0.97);
    b.deg = (b.deg + spin * dt) % 360;
    b.disc.setAttribute('transform', `rotate(${b.deg} ${b.C[0]} ${b.C[1]})`);
    b.L.setAttribute('transform', `translate(${pct * 10} 0)`);
    b.Rr.setAttribute('transform', `translate(${-pct * 10} 0)`);
    S.cv.disc_temp += (pct * spin * 1.4 - (S.cv.disc_temp - 40) * 0.15) * dt;
    S.cv.disc_temp = clamp(S.cv.disc_temp, 40, 650);
    b.heat.setAttribute('opacity', clamp((S.cv.disc_temp - 80) / 500, 0, 0.45).toFixed(2));
    setStatus(pct > 0.05 ? 'Braking' : 'Rolling', pct > 0.05 ? 'Pistons squeeze the pads — friction turns speed into heat.' : 'Disc spins with the wheel. Hold BRAKE to squeeze the pads.', `${fmt(pct * 25, 1)} bar`);
    setStat('b_bar', fmt(pct * 25, 1));
    setStat('b_sq', Math.round(pct * 100));
    setStat('b_t', Math.round(S.cv.disc_temp));
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
      svg.appendChild(ns('rect', { x: 200, y: 262, width: 180, height: 36, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
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
      svg.appendChild(ns('rect', { x: 210, y: 180, width: 180, height: 60, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
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
  html: () => `${statusHTML('Standby', 'DC bus live. MOSFETs off until you ask for torque.', '16 kHz')}<svg class="ute-cv-svg" id="cv-ctrl" viewBox="0 0 640 380" role="img" aria-label="Controller internals"></svg>`,
  sideHTML: () => card('Live state', statsHTML([['k_t', 'Temp', '°C'], ['k_v', 'DC input', 'V'], ['k_l', 'Load', '%'], ['k_f', 'Switching', 'kHz']])) +
    card('Parts', list(['6 SiC MOSFETs — 2 per phase', 'Gate driver — flips them on/off', 'DC-link capacitor — smooths the bus', 'MCU — reads throttle + rotor angle', 'Cold plate — carries heat away'])) +
    card('How', '<p>It <b>chops DC into three-phase AC</b> by switching the MOSFETs 16 000 times a second. Longer "on" pulses mean more current, more torque. The pattern\'s rhythm sets motor speed.</p>'),
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
        svg.appendChild(txt(x + 40, y + 34, `${'UVW'[ph]}${hl ? '−' : '+'}`, 'middle', 11, '#F6F5F2'));
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
    setStatus(load > 0.03 ? 'Switching' : 'Standby', load > 0.03 ? 'High-side and low-side MOSFETs alternate per phase.' : 'DC bus live. MOSFETs off until you ask for torque.', '16 kHz');
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
      { k: 'gnd', x: 220, y: 440, t: 'Frame ground', s: '0 V', specs: [['Voltage', '0 V'], ['Job', 'Return path for every circuit']] },
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
      { k: 'ctrl', x: 400, y: 180, t: 'Controller', s: 'DC → 3φ AC', specs: [['In', '400 V DC'], ['Out', '3-phase AC'], ['Switching', '16 kHz']] },
      { k: 'mot', x: 580, y: 180, t: 'Motor', s: '~40 kW', specs: [['Type', 'PMAC / PMSM'], ['Peak torque', '~95 Nm from 0 rpm'], ['Efficiency', '~90 %']] },
      { k: 'dcdc', x: 220, y: 320, t: 'DC-DC', s: '400 → 12 V', specs: [['In', '400 V'], ['Out', '13.8 V'], ['Power', '~500 W']] },
      { k: 'aux', x: 40, y: 320, t: '12 V aux battery', s: '12 V', specs: [['Voltage', '12 V'], ['Feeds', 'Lights, dash, contactor coil']] },
      { k: 'head', x: 400, y: 320, t: 'Headlight (LED)', s: '25 W', specs: [['Power', '25 W'], ['Current', '2 A @ 12 V']] },
      { k: 'inst', x: 580, y: 320, t: 'Instruments', s: 'TFT', specs: [['Shows', 'SoC, range, power'], ['Bus', 'CAN']] },
      { k: 'tail', x: 400, y: 440, t: 'Tail / brake', s: 'LED', specs: [['Power', '3 / 8 W'], ['Current', '< 1 A']] },
      { k: 'gnd', x: 220, y: 440, t: 'Chassis ground', s: '0 V (12 V side)', specs: [['Note', 'HV is isolated from frame'], ['12 V side', 'Frame return']] },
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
  sideHTML: () => card('How to read', '<p><b style="color:#D23C2C">Red</b> is +12 V, <b>black</b> is ground, <b style="color:#1D6B55">green dashed</b> is high-voltage DC, <b style="color:#B8862A">amber</b> is AC, <b style="color:#3E6FB7">blue dashed</b> is a low-current signal.</p>') +
    card('Key laws', '<p><b>V = I · R</b> — voltage pushes current through resistance.<br><b>P = V · I</b> — power is voltage times current.<br>A 55 W bulb at 12 V draws <b>4.6 A</b>.</p>') +
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
      const t = ns('text', { x: n.x + 10, y: n.y + 19, 'font-family': 'IBM Plex Sans, sans-serif', 'font-size': 12.5, 'font-weight': 700, fill: '#0A0A0A' });
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
   9. Rider view
   ========================================================================== */
function mountRider() {
  defsPackMetals();
  const svg = $('#ute-rider');
  if (!svg) return;
  svg.innerHTML = '';
  const R = {};
  // Mirrors
  [[210, 112, 170, 40], [690, 112, 730, 40]].forEach(([x1, y1, x2, y2]) => {
    svg.appendChild(ns('line', { x1, y1, x2, y2, stroke: '#0A0A0A', 'stroke-width': 4 }));
    svg.appendChild(ns('ellipse', { cx: x2, cy: y2 - 6, rx: 36, ry: 16, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 2 }));
  });
  // Crossbar
  svg.appendChild(ns('path', { d: 'M 110 122 Q 450 96 790 122', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 14, 'stroke-linecap': 'round' }));
  svg.appendChild(ns('path', { d: 'M 110 122 Q 450 96 790 122', fill: 'none', stroke: 'url(#m-chrome)', 'stroke-width': 9, 'stroke-linecap': 'round' }));
  svg.appendChild(ns('rect', { x: 415, y: 96, width: 70, height: 22, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));

  // Clutch lever (left)
  R.clutch = ns('g', { class: 'ute-press', 'data-press': 'clutch' });
  R.clutchLever = ns('g');
  R.clutchLever.appendChild(ns('path', { d: 'M 190 104 L 60 78 L 56 88 L 186 116 Z', fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5, class: 'hit-outline' }));
  R.clutchLever.appendChild(ns('path', { d: 'M 50 70 L 210 70 L 210 120 L 50 120 Z', fill: 'transparent' }));
  R.clutch.appendChild(R.clutchLever);
  R.clutch.appendChild(ns('circle', { cx: 190, cy: 110, r: 8, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  svg.appendChild(R.clutch);
  // Brake lever (right)
  R.brake = ns('g', { class: 'ute-press', 'data-press': 'brake' });
  R.brakeLever = ns('g');
  R.brakeLever.appendChild(ns('path', { d: 'M 710 104 L 840 78 L 844 88 L 714 116 Z', fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5, class: 'hit-outline' }));
  R.brakeLever.appendChild(ns('path', { d: 'M 690 70 L 850 70 L 850 120 L 690 120 Z', fill: 'transparent' }));
  R.brake.appendChild(R.brakeLever);
  R.brake.appendChild(ns('rect', { x: 690, y: 98, width: 34, height: 22, fill: '#2A2826', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  svg.appendChild(R.brake);
  // Grips
  svg.appendChild(ns('rect', { x: 34, y: 108, width: 104, height: 30, rx: 6, fill: 'url(#m-rubber)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  R.throttle = ns('g', { class: 'ute-press', 'data-press': 'throttle' });
  R.throttle.appendChild(ns('rect', { x: 762, y: 108, width: 104, height: 30, rx: 6, fill: 'url(#m-rubber)', stroke: '#0A0A0A', 'stroke-width': 1.5, class: 'hit-outline' }));
  R.twist = ns('rect', { x: 808, y: 108, width: 6, height: 30, fill: '#C2502A' });
  R.throttle.appendChild(R.twist);
  R.throttle.appendChild(txt(814, 160, 'THROTTLE', 'middle', 9));
  svg.appendChild(R.throttle);
  svg.appendChild(txt(86, 160, 'GRIP', 'middle', 9));
  svg.appendChild(txt(120, 64, 'CLUTCH', 'middle', 9));
  svg.appendChild(txt(780, 64, 'FRONT BRAKE', 'middle', 9));

  // Switch cubes
  svg.appendChild(ns('rect', { x: 196, y: 132, width: 74, height: 50, rx: 5, fill: '#2A2826', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  R.horn = ns('circle', { cx: 218, cy: 157, r: 12, fill: '#C2502A', stroke: '#0A0A0A', 'stroke-width': 1.5, class: 'ute-press', 'data-press': 'horn' });
  svg.appendChild(R.horn);
  svg.appendChild(ns('rect', { x: 240, y: 148, width: 22, height: 18, fill: '#6B6963', stroke: '#0A0A0A' }));
  svg.appendChild(txt(232, 198, 'HORN · TURN', 'middle', 9));
  svg.appendChild(ns('rect', { x: 630, y: 132, width: 74, height: 50, rx: 5, fill: '#2A2826', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
  R.kill = ns('rect', { x: 640, y: 144, width: 24, height: 26, fill: '#C2502A', stroke: '#0A0A0A', 'stroke-width': 1.5, class: 'ute-press', 'data-press': 'kill' });
  svg.appendChild(R.kill);
  const st = ns('g', { class: 'ute-press', 'data-press': 'starter' });
  st.appendChild(ns('circle', { cx: 686, cy: 157, r: 12, fill: '#0A0A0A', stroke: '#6B6963', 'stroke-width': 1.5 }));
  st.appendChild(ns('path', { d: 'M 681 151 L 692 157 L 681 163 Z', fill: '#FFFFFF' }));
  svg.appendChild(st);
  svg.appendChild(txt(668, 198, 'KILL · START', 'middle', 9));

  // Gauges
  const gauge = (cx, label, max, ticks) => {
    svg.appendChild(ns('circle', { cx, cy: 220, r: 70, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    svg.appendChild(ns('circle', { cx, cy: 220, r: 60, fill: '#1A1816', stroke: '#0A0A0A' }));
    for (let i = 0; i <= ticks; i++) {
      const a = (-225 + i / ticks * 270) * Math.PI / 180;
      svg.appendChild(ns('line', { x1: cx + Math.cos(a) * 50, y1: 220 + Math.sin(a) * 50, x2: cx + Math.cos(a) * 57, y2: 220 + Math.sin(a) * 57, stroke: '#F6F5F2', 'stroke-width': 1.5 }));
      const tl = txt(cx + Math.cos(a) * 40, 223 + Math.sin(a) * 40, String(Math.round(i / ticks * max)), 'middle', 8, '#F6F5F2');
      tl.setAttribute('letter-spacing', '0');
      svg.appendChild(tl);
    }
    svg.appendChild(txt(cx, 262, label, 'middle', 8, '#B9B3A4'));
    const n = ns('line', { x1: cx, y1: 220, x2: cx + 46, y2: 220, stroke: '#C2502A', 'stroke-width': 3, 'stroke-linecap': 'round' });
    svg.appendChild(n);
    svg.appendChild(ns('circle', { cx, cy: 220, r: 5, fill: '#C2502A' }));
    return n;
  };
  R.speedo = gauge(375, 'KM/H', 240, 8);
  R.tacho = gauge(525, S.mode === 'elec' ? '×1000 RPM · MOTOR' : '×1000 RPM', 10, 10);
  S._rider = R;

  // Interaction
  const holdMap = { throttle: 'throttle_hold', brake: 'brake_hold', clutch: 'clutch_hold' };
  svg.querySelectorAll('[data-press]').forEach((el) => {
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const k = el.getAttribute('data-press');
      if (holdMap[k]) {
        S.rider[holdMap[k]] = true;
        try { svg.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
      } else if (k === 'horn') toast('BEEP!', 500);
      else if (k === 'kill') {
        S.rider.kill = !S.rider.kill;
        R.kill.setAttribute('fill', S.rider.kill ? '#0A0A0A' : '#C2502A');
        toast(S.rider.kill ? 'ENGINE KILLED' : 'ENGINE LIVE', 900);
      } else if (k === 'starter') {
        S.rider.kill = false;
        R.kill.setAttribute('fill', '#C2502A');
        toast('STARTED', 700);
      }
    });
  });
  const release = () => { S.rider.throttle_hold = false; S.rider.brake_hold = false; S.rider.clutch_hold = false; };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => svg.addEventListener(ev, release));
}

let toastTimer = 0;
function toast(msg, ms) {
  const t = $('#ute-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-on'), ms);
}

function updateRiderTick(dt) {
  const r = S.rider;
  r.throttle = r.throttle_hold ? Math.min(1, r.throttle + 1.8 * dt) : Math.max(0, r.throttle - 1.2 * dt);
  r.brake = r.brake_hold ? Math.min(1, r.brake + 3.0 * dt) : Math.max(0, r.brake - 2.5 * dt);
  r.clutch = r.clutch_hold ? Math.min(1, r.clutch + 3.0 * dt) : Math.max(0, r.clutch - 2.5 * dt);
  const R = S._rider;
  if (!R || !R.twist.isConnected) return;
  R.twist.setAttribute('transform', `translate(${-r.throttle * 26} 0)`);
  R.brakeLever.setAttribute('transform', `rotate(${r.brake * 9} 714 110)`);
  R.clutchLever.setAttribute('transform', `rotate(${-r.clutch * 9} 186 110)`);
  const shownRPM = S.mode === 'elec' ? S.elec.rpm : S.rpm;
  const needle = (el, v, max) => {
    const a = -225 + clamp(v / max, 0, 1) * 270;
    const cx = parseFloat(el.getAttribute('x1'));
    el.setAttribute('transform', `rotate(${a} ${cx} 220)`);
  };
  needle(R.speedo, S.speed, 240);
  needle(R.tacho, shownRPM, 10000);
  const set = (k, v) => { const el = document.querySelector(`[data-d="${k}"]`); if (el && el.textContent !== v) el.textContent = v; };
  set('throttle', `${Math.round(r.throttle * 100)} %`);
  set('brake', `${Math.round(r.brake * 100)} %`);
  set('clutch', `${Math.round(r.clutch * 100)} %`);
  set('rpm', `${Math.round(shownRPM)}`);
  set('kmh', `${Math.round(S.speed)} km/h`);
}

/* ==========================================================================
   11. Dyno
   ========================================================================== */
const DYNO_CHARTS = [
  { k: 'speed', label: 'Speed', unit: 'km/h', color: '#C2502A', max: 240 },
  { k: 'rpm', label: 'RPM', unit: 'rpm', color: '#1D6B55', max: 10000 },
  { k: 'throttle', label: 'Throttle', unit: '%', color: '#3E6FB7', max: 100 },
  { k: 'brake', label: 'Brake', unit: '%', color: '#E2A93B', max: 100 },
];
function mountDyno() {
  const box = $('#ute-dyno-charts');
  if (!box) return;
  box.innerHTML = DYNO_CHARTS.map((c) => `
    <div class="ute-dyno-cell">
      <header><span class="ute-label">${c.label}</span><b><span data-dv="${c.k}">0</span><small>${c.unit}</small></b></header>
      <div class="ute-dyno-plot">
        <svg viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden="true">
          ${[0.33, 0.5, 0.66].map((f) => `<line x1="0" x2="400" y1="${110 * f}" y2="${110 * f}" stroke="#DDD9CF" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('')}
          <path d="M0 0 L0 110 L400 110" fill="none" stroke="#B9B3A4" stroke-width="1" vector-effect="non-scaling-stroke"/>
          <path data-area="${c.k}" d="" fill="${c.color}" fill-opacity="0.08"/>
          <path data-line="${c.k}" d="" fill="none" stroke="${c.color}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
        </svg>
        <span class="lbl tl">${c.max.toLocaleString('en')}</span><span class="lbl bl">0</span><span class="lbl br" data-dt="${c.k}">0 s</span>
      </div>
    </div>`).join('');
  renderDynoCharts();
  renderDynoFindings();
}
function toggleDyno() {
  const d = S.dyno;
  if (!d.recording) {
    Object.assign(d, { recording: true, start_ms: performance.now(), samples: [], peak_speed: 0, peak_rpm: 0, peak_power: 0, tto100: null, avg_throttle: 0 });
  } else d.recording = false;
  const b = $('[data-dyno="start"]');
  b.classList.toggle('is-rec', d.recording);
  b.classList.toggle('is-primary', !d.recording);
  b.textContent = d.recording ? '■ Stop test' : '● Start test';
  renderDynoFindings();
}
function resetDyno() {
  Object.assign(S.dyno, { recording: false, samples: [], peak_speed: 0, peak_rpm: 0, peak_power: 0, tto100: null, avg_throttle: 0 });
  const b = $('[data-dyno="start"]');
  b.classList.remove('is-rec'); b.classList.add('is-primary'); b.textContent = '● Start test';
  renderDynoCharts();
  renderDynoFindings();
}
function recordDynoSample(now) {
  if (now - S.last_dyno_sample_ms < 50) return;
  S.last_dyno_sample_ms = now;
  const d = S.dyno;
  const kmh = S.speed;
  const disp = displacementCC(S.bore_mm, S.stroke_mm);
  const tq = approxTorqueNm(disp, S.mode === 'elec' ? '4t' : S.mode, S.compression);
  const nowRPM = S.mode === 'elec' ? S.elec.rpm : S.rpm;
  const kw = S.mode === 'elec' ? (S.elec.torque * S.elec.rpm / 9549) : (tq * S.rpm / 9549 * Math.max(0.15, S.rider.throttle));
  const t = (now - d.start_ms) / 1000;
  d.samples.push({ t, speed: kmh, rpm: nowRPM, throttle: S.rider.throttle * 100, brake: S.rider.brake * 100, power: kw });
  if (d.samples.length > d.maxSamples) d.samples.shift();
  d.peak_speed = Math.max(d.peak_speed, kmh);
  d.peak_rpm = Math.max(d.peak_rpm, nowRPM);
  d.peak_power = Math.max(d.peak_power, kw);
  if (d.tto100 == null && kmh >= 100) d.tto100 = t;
  d.avg_throttle = d.samples.reduce((a, s) => a + s.throttle, 0) / d.samples.length;
}
function renderDynoCharts() {
  const s = S.dyno.samples;
  const tEnd = s.length ? s[s.length - 1].t : 0;
  const tStart = Math.max(0, tEnd - 30);
  DYNO_CHARTS.forEach((c) => {
    const line = document.querySelector(`[data-line="${c.k}"]`);
    const area = document.querySelector(`[data-area="${c.k}"]`);
    if (!line) return;
    const win = s.filter((p) => p.t >= tStart);
    if (win.length < 2) { line.setAttribute('d', ''); area.setAttribute('d', ''); }
    else {
      const X = (t) => ((t - tStart) / 30 * 400).toFixed(1);
      const Y = (v) => (110 - clamp(v / c.max, 0, 1) * 106).toFixed(1);
      const pts = win.map((p) => `${X(p.t)} ${Y(p[c.k])}`);
      line.setAttribute('d', 'M ' + pts.join(' L '));
      area.setAttribute('d', `M ${X(win[0].t)} 110 L ${pts.join(' L ')} L ${X(win[win.length - 1].t)} 110 Z`);
    }
    const cur = s.length ? s[s.length - 1][c.k] : 0;
    const v = document.querySelector(`[data-dv="${c.k}"]`);
    if (v) v.textContent = Math.round(cur).toLocaleString('en');
    const dt = document.querySelector(`[data-dt="${c.k}"]`);
    if (dt) dt.textContent = `${tEnd.toFixed(1)} s`;
  });
}
function renderDynoFindings() {
  const box = $('#ute-findings');
  if (!box) return;
  const d = S.dyno;
  const s = d.samples;
  const run = s.length ? s[s.length - 1].t : 0;
  const cells = [
    ['Status', d.recording ? '● REC' : (s.length ? 'Stopped' : 'Idle')],
    ['Run time', `${run.toFixed(1)} s`],
    ['Peak speed', `${Math.round(d.peak_speed)} km/h`],
    ['Peak RPM', Math.round(d.peak_rpm).toLocaleString('en')],
    ['Peak power', `${d.peak_power.toFixed(1)} kW`],
    ['0 → 100 km/h', d.tto100 == null ? '—' : `${d.tto100.toFixed(1)} s`],
    ['Avg throttle', `${Math.round(d.avg_throttle)} %`],
    ['Samples', s.length],
  ];
  box.innerHTML = cells.map(([l, v]) => `<div class="cell"><div class="l">${l}</div><div class="v" ${l === 'Status' && d.recording ? 'style="color:var(--warm)"' : ''}>${v}</div></div>`).join('');
}

/* ==========================================================================
   10. Main loop
   ========================================================================== */
function startLoop() { S.last_tick_ms = performance.now(); requestAnimationFrame(tick); }

function tick(now) {
  const dt = Math.min(0.1, (now - S.last_tick_ms) / 1000);
  S.last_tick_ms = now;
  S._dt = dt;

  if (S.rider.kill) S.rpm = Math.max(0, S.rpm - 1200 * dt);
  else if (S.rider.throttle > 0.02) {
    const target = Math.max(S.base_rpm, 900 + S.rider.throttle * 7000);
    S.rpm += (target - S.rpm) * Math.min(1, 2.0 * dt);
  } else {
    S.rpm += (S.base_rpm - S.rpm) * Math.min(1, 1.0 * dt);
  }

  if (S.running && !S.rider.kill && S.rpm > 10) {
    const shaftDegPerSec = (360 * S.rpm / 60) / 60;
    const cycleDeg = S.mode === '2t' ? 360 : 720;
    S.crank_deg = (S.crank_deg + shaftDegPerSec * dt) % cycleDeg;
  }

  if (S.mode === 'elec') {
    const target = S.rider.kill ? 0 : S.rider.throttle * 10000;
    S.elec.rpm += (target - S.elec.rpm) * Math.min(1, 3.0 * dt);
    const load = S.rider.throttle;
    S.elec.motor_temp += (60 + load * 60 - S.elec.motor_temp) * 0.3 * dt;
    S.elec.controller_temp += (50 + load * 40 - S.elec.controller_temp) * 0.3 * dt;
    S.elec.battery_soc = Math.max(0, S.elec.battery_soc - load * 0.015 * dt);
    S.elec.torque = load * 95;
  }

  // Road speed: driven by throttle unless the clutch is in or the engine is dead
  const drive = S.rider.throttle > 0.05 && S.rider.clutch < 0.6 && !S.rider.kill;
  const target = drive
    ? (S.mode === 'elec' ? kmhFromWheelRPM(S.elec.rpm / 8.5) : kmhFromWheelRPM(wheelRPMFromEngine(S.rpm)))
    : 0;
  const accel = target > S.speed ? 0.8 : 0.25 + S.rider.brake * 2.2;
  S.speed += (target - S.speed) * Math.min(1, accel * dt);
  S.speed = Math.max(0, S.speed - S.rider.brake * 40 * dt);

  updateOverviewTick(dt);
  const cfg = S.selected_part && (COMPONENT_VIEWS[S.selected_part]);
  if (cfg && cfg.update) cfg.update(dt);
  updateRiderTick(dt);

  if (S.dyno.recording) {
    recordDynoSample(now);
    if ((++S._dynoFrame) % 3 === 0) { renderDynoCharts(); renderDynoFindings(); }
  }
  requestAnimationFrame(tick);
}

/* ---------- Keyboard ---------- */
function wireChromeGlobal() {
  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
    if (e.key === ' ' && !(e.target.closest && e.target.closest('button, [role="button"]'))) { e.preventDefault(); toggleRun(); }
    else if (e.key === 'Escape') { if ($('#ute-help').classList.contains('is-open')) closeHelp(); else selectPart(null); }
    else if (e.key === '?' || e.key === '/') { e.preventDefault(); openHelp(); }
  });
  // Safety: any pointer release anywhere ends rider holds.
  window.addEventListener('pointerup', () => { S.rider.throttle_hold = false; S.rider.brake_hold = false; S.rider.clutch_hold = false; });
  window.addEventListener('blur', () => { S.rider.throttle_hold = false; S.rider.brake_hold = false; S.rider.clutch_hold = false; Object.assign(S.cv, { carb_hold: false, spark_hold: false, gear_hold: false, brake_hold: false }); });
}

/* ---------- Assets manifest (renders supplied later) ---------- */
async function loadManifest() {
  try {
    const r = await fetch('assets/models/manifest.json', { cache: 'no-cache' });
    if (r.ok) S.assets = (await r.json()).renders || {};
  } catch (e) { /* optional */ }
}

/* ==========================================================================
   15. Boot
   ========================================================================== */
if (document.getElementById('ute-root')) {
  try {
    const q = new URLSearchParams(location.search);
    if (['4t', '2t', 'elec'].includes(q.get('mode'))) S.mode = q.get('mode');
    if (q.get('view') === '3d') S.view = '3d';
    if (q.get('part') && (PARTS[q.get('part')] || COMPONENT_VIEWS[q.get('part')])) S.selected_part = q.get('part');
  } catch (e) { /* noop */ }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) S.base_rpm = S.rpm = 1200;
  defsPackMetals();
  render();
  wireChromeGlobal();
  startLoop();
  loadManifest().then(() => { if (S.selected_part) renderComponentView(); });
  if (S.selected_part) requestAnimationFrame(() => { applyMotoHighlight(); renderComponentView(); });
}
