/* ==========================================================================
   Moto Zero — interactive teaching figures for the Learn page.
   mountFigure(key, el) builds a figure inside `el` (an .ute-figure).
   ========================================================================== */
import { ns, txt, defsPackMetals, buildEngine, buildTimingStrip, displacementCC, approxTorqueNm, clamp, fmt } from './core.js';


function scaffold(el, { viewBox, controls = '', stats = null }) {
  el.innerHTML = `
    <div class="ute-figure-stage"><svg viewBox="${viewBox}" role="img"></svg></div>
    ${stats ? `<div class="ute-stats ute-fig-stats">${stats.map(([k, l, u]) => `<div class="stat"><div class="stat-l">${l}</div><div class="stat-v"><span data-k="${k}">–</span><small>${u || ''}</small></div></div>`).join('')}</div>` : ''}
    ${controls ? `<div class="ute-figure-controls">${controls}</div>` : ''}
    <div class="ute-figure-cap" data-cap></div>`;
  const svg = el.querySelector('svg');
  const set = (k, v) => { const s = el.querySelector(`[data-k="${k}"]`); if (s) s.textContent = v; };
  const cap = (h) => { el.querySelector('[data-cap]').innerHTML = h; };
  return { svg, set, cap };
}
function sl(k, label, min, max, step, val, unit = '') {
  return `<div class="ute-slider"><label>${label}<b data-out="${k}">${val}${unit}</b></label><input type="range" data-in="${k}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${label}"></div>`;
}
function bindSliders(el, fmtMap, onChange) {
  const read = () => {
    const v = {};
    el.querySelectorAll('[data-in]').forEach((i) => { v[i.dataset.in] = parseFloat(i.value); });
    el.querySelectorAll('[data-out]').forEach((o) => { const k = o.dataset.out; o.textContent = (fmtMap[k] || ((x) => x))(v[k]); });
    return v;
  };
  el.querySelectorAll('[data-in]').forEach((i) => i.addEventListener('input', () => onChange(read())));
  onChange(read());
}
const visible = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

/* ---------- Engine cycles ---------- */
const DESC = {
  '4t': {
    intake: '<b>Intake.</b> The piston moves down with the intake valve open, drawing in fresh air-fuel mixture.',
    compression: '<b>Compression.</b> Both valves closed. The piston rises and squeezes the charge into the combustion chamber.',
    power: '<b>Power.</b> The spark ignites the charge near TDC; expanding gas forces the piston down. The only stroke that does work.',
    exhaust: '<b>Exhaust.</b> The exhaust valve opens and the rising piston pushes the burnt gas out. Then the cycle repeats.',
  },
  '2t': {
    power: '<b>Power.</b> The charge fires at TDC and drives the piston down. Below it, the crankcase charge is being compressed.',
    blowdown: '<b>Blowdown.</b> The piston uncovers the exhaust port first; the high-pressure gas rushes out.',
    scavenge: '<b>Scavenging.</b> The transfer ports open; fresh charge from the crankcase flows up and sweeps out the rest of the exhaust.',
    compression: '<b>Compression.</b> Ports covered, the piston rises and compresses the charge while new mixture is drawn into the crankcase.',
  },
};
function cycleFig(el, mode) {
  defsPackMetals();
  const strokes = mode === '2t' ? ['power', 'blowdown', 'scavenge', 'compression'] : ['intake', 'compression', 'power', 'exhaust'];
  const total = mode === '2t' ? 360 : 720;
  const { svg, cap } = scaffold(el, {
    viewBox: '0 0 600 480',
    controls: `<div class="ute-btnrow">${strokes.map((s) => `<button class="ute-btn" type="button" data-go="${s}">${s}</button>`).join('')}</div>
      <button class="ute-btn is-primary" type="button" data-play>Pause</button>
      ${sl('deg', 'Crank angle', 0, total - 1, 1, 0, '°')}`,
  });
  const eng = buildEngine(svg, { mode });
  const strip = buildTimingStrip(mode);
  el.querySelector('.ute-figure-stage').appendChild(strip.el);
  strip.el.style.marginTop = '10px';
  let deg = mode === '2t' ? 300 : 20, playing = true, last = performance.now();
  const range = el.querySelector('[data-in="deg"]'), out = el.querySelector('[data-out="deg"]');
  const draw = () => {
    const r = eng.update({ mode, crank_deg: deg, bore_mm: 72, stroke_mm: 58, compression: 10.5 });
    strip.set(deg);
    range.value = Math.round(deg);
    out.textContent = `${Math.round(deg)}°`;
    cap(DESC[mode][r.stroke.k] + (r.spark ? ' <b>⚡ Spark!</b>' : ''));
    el.querySelectorAll('[data-go]').forEach((b) => b.classList.toggle('is-primary', b.dataset.go === r.stroke.k));
  };
  const loop = (now) => {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (playing && visible(el)) { deg = (deg + 70 * dt) % total; draw(); }
    if (el.isConnected) requestAnimationFrame(loop);
  };
  el.querySelector('[data-play]').addEventListener('click', (e) => { playing = !playing; e.target.textContent = playing ? 'Pause' : 'Play'; });
  range.addEventListener('input', () => { deg = parseFloat(range.value); playing = false; el.querySelector('[data-play]').textContent = 'Play'; draw(); });
  el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
    const list = mode === '2t' ? [[0, 105], [105, 128], [128, 232], [232, 360]] : [[0, 180], [180, 360], [360, 540], [540, 720]];
    const [a, z] = list[strokes.indexOf(b.dataset.go)];
    deg = (a + z) / 2;
    playing = false;
    el.querySelector('[data-play]').textContent = 'Play';
    draw();
  }));
  draw();
  requestAnimationFrame(loop);
}

/* ---------- Engine parameters ---------- */
function engineParams(el) {
  defsPackMetals();
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 480',
    stats: [['disp', 'Displacement', 'cc'], ['cr', 'Compression', ':1'], ['tq', 'Torque', 'Nm'], ['kw', 'Power', 'kW'], ['ps', 'Mean piston speed', 'm/s']],
    controls: sl('bore', 'Bore', 40, 100, 0.5, 57, ' mm') + sl('stroke', 'Stroke', 40, 90, 0.5, 48.8, ' mm') + sl('cr', 'Compression ratio', 7, 14, 0.1, 10.5, ':1') + sl('rpm', 'Engine speed', 1000, 12000, 100, 9000, ' rpm'),
  });
  const eng = buildEngine(svg, { mode: '4t' });
  let p = { bore: 57, stroke: 48.8, cr: 10.5, rpm: 9000 }, deg = 0, last = performance.now();
  bindSliders(el, { bore: (v) => `${v} mm`, stroke: (v) => `${v} mm`, cr: (v) => `${v.toFixed(1)}:1`, rpm: (v) => `${v} rpm` }, (v) => {
    p = v;
    const disp = displacementCC(v.bore, v.stroke);
    const tq = approxTorqueNm(disp, '4t', v.cr);
    set('disp', fmt(disp, 1)); set('cr', fmt(v.cr, 1)); set('tq', fmt(tq, 1)); set('kw', fmt(tq * v.rpm / 9549, 1));
    const ps = 2 * v.stroke / 1000 * v.rpm / 60;
    set('ps', fmt(ps, 1));
    cap(`Displacement = π/4 × bore² × stroke = <b>${fmt(disp, 1)} cc</b>. ${v.bore > v.stroke ? 'Bore &gt; stroke: <b>over-square</b>, revs freely.' : v.bore < v.stroke ? 'Stroke &gt; bore: <b>under-square</b>, strong low-down torque.' : '<b>Square</b> engine.'} ${ps > 20 ? 'Mean piston speed above 20 m/s: highly stressed.' : ''}`);
  });
  const loop = (now) => {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (visible(el)) { deg = (deg + p.rpm / 60 * 360 * dt / 80) % 720; eng.update({ mode: '4t', crank_deg: deg, bore_mm: p.bore, stroke_mm: p.stroke, compression: p.cr }); }
    if (el.isConnected) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ---------- Air-fuel ratio ---------- */
function afr(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 260',
    stats: [['afr', 'Air : fuel', ':1'], ['lam', 'Lambda λ', ''], ['state', 'Mixture', '']],
    controls: sl('afr', 'Air-fuel ratio', 9, 20, 0.1, 14.7, ':1'),
  });
  const air = ns('g'), fuel = ns('g');
  svg.appendChild(txt(20, 30, 'AIR (BY MASS)', 'start', 10, '#3E6FB7'));
  svg.appendChild(txt(20, 150, 'FUEL', 'start', 10, '#B8862A'));
  svg.append(air, fuel);
  const flame = ns('ellipse', { cx: 500, cy: 160, rx: 50, ry: 70, fill: '#3E6FB7', opacity: 0.6 });
  svg.appendChild(flame);
  svg.appendChild(txt(500, 250, 'FLAME', 'middle', 10));
  // scale
  svg.appendChild(ns('rect', { x: 20, y: 200, width: 400, height: 10, fill: 'url(#afr-grad)' }));
  const defs = ns('defs');
  const g = ns('linearGradient', { id: 'afr-grad' });
  [[0, '#C2502A'], [0.45, '#2BB76E'], [1, '#3E6FB7']].forEach(([o, c]) => g.appendChild(ns('stop', { offset: o, 'stop-color': c })));
  defs.appendChild(g); svg.appendChild(defs);
  svg.appendChild(txt(20, 232, 'RICH', 'start', 10, '#C2502A'));
  svg.appendChild(txt(420, 232, 'LEAN', 'end', 10, '#3E6FB7'));
  const needle = ns('path', { d: 'M 0 192 L 6 182 L -6 182 Z', fill: '#0A0A0A' });
  svg.appendChild(needle);
  bindSliders(el, { afr: (v) => `${v.toFixed(1)}:1` }, ({ afr: a }) => {
    air.innerHTML = ''; fuel.innerHTML = '';
    for (let i = 0; i < Math.round(a); i++) air.appendChild(ns('rect', { x: 20 + (i % 10) * 22, y: 40 + Math.floor(i / 10) * 22, width: 18, height: 18, fill: '#BCD0EE', stroke: '#3E6FB7' }));
    fuel.appendChild(ns('rect', { x: 20, y: 160, width: 18, height: 18, fill: '#F3D9A0', stroke: '#B8862A' }));
    const lam = a / 14.7;
    needle.setAttribute('transform', `translate(${20 + (a - 9) / 11 * 400} 0)`);
    flame.setAttribute('fill', lam < 0.9 ? '#E2A93B' : lam > 1.1 ? '#7FA3DB' : '#3E6FB7');
    flame.setAttribute('rx', 30 + 30 * clamp(1.4 - Math.abs(lam - 0.88) * 2, 0.2, 1));
    const state = lam < 0.97 ? 'Rich' : lam > 1.03 ? 'Lean' : 'Stoichiometric';
    set('afr', a.toFixed(1)); set('lam', lam.toFixed(2)); set('state', state);
    cap(lam < 0.85 ? '<b>Very rich.</b> Unburnt fuel: black smoke, sooty plug, high CO and HC, wasted fuel.'
      : lam < 0.97 ? '<b>Slightly rich (λ ≈ 0.86–0.95).</b> Best power, and the extra fuel cools the chamber.'
      : lam <= 1.03 ? '<b>λ = 1, 14.7 : 1.</b> Exactly enough air to burn all the fuel. The catalytic converter works best here, so closed-loop injection holds this at cruise.'
      : lam < 1.15 ? '<b>Slightly lean.</b> Best economy, but combustion runs hotter and NOx rises.'
      : '<b>Too lean.</b> Hesitation, popping, overheating, and in the worst case a holed piston.');
  });
}

/* ---------- Ignition coil ---------- */
function ignitionCoil(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 260',
    stats: [['ratio', 'Turns ratio', ':1'], ['kv', 'Secondary peak', 'kV'], ['need', 'Gap needs', 'kV']],
    controls: sl('vp', 'Primary peak (collapse)', 100, 400, 10, 250, ' V') + sl('np', 'Primary turns', 100, 400, 10, 200) + sl('ns', 'Secondary turns', 5000, 30000, 500, 20000) + sl('gap', 'Plug gap', 0.4, 1.4, 0.05, 0.7, ' mm'),
  });
  svg.appendChild(ns('rect', { x: 230, y: 30, width: 24, height: 200, fill: '#8F959C', stroke: '#0A0A0A' }));
  const prim = ns('g'), sec = ns('g');
  svg.append(prim, sec);
  svg.appendChild(txt(150, 250, 'PRIMARY', 'middle', 10, '#C2703F'));
  svg.appendChild(txt(330, 250, 'SECONDARY', 'middle', 10, '#8A4520'));
  const arc = ns('path', { fill: 'none', stroke: '#E2A93B', 'stroke-width': 3 });
  svg.appendChild(ns('rect', { x: 500, y: 60, width: 14, height: 70, fill: '#FFFFFF', stroke: '#0A0A0A' }));
  svg.appendChild(ns('rect', { x: 504, y: 130, width: 6, height: 30, fill: '#8F959C', stroke: '#0A0A0A' }));
  const ground = ns('path', { fill: 'none', stroke: '#5E646A', 'stroke-width': 5 });
  svg.append(ground, arc);
  svg.appendChild(txt(507, 50, 'PLUG', 'middle', 10));
  bindSliders(el, { vp: (v) => `${v} V`, np: (v) => `${v}`, ns: (v) => `${v}`, gap: (v) => `${v.toFixed(2)} mm` }, (v) => {
    prim.innerHTML = ''; sec.innerHTML = '';
    const np = Math.round(v.np / 40), nss = Math.round(v.ns / 1000);
    for (let i = 0; i < np; i++) prim.appendChild(ns('ellipse', { cx: 200, cy: 50 + i * (160 / np), rx: 26, ry: 6, fill: 'none', stroke: '#C2703F', 'stroke-width': 4 }));
    for (let i = 0; i < nss; i++) sec.appendChild(ns('ellipse', { cx: 290, cy: 40 + i * (180 / nss), rx: 30, ry: 4, fill: 'none', stroke: '#8A4520', 'stroke-width': 1.2 }));
    const ratio = v.ns / v.np, kv = v.vp * ratio / 1000;
    const need = 3 + v.gap * 12;
    const gapPx = v.gap * 20;
    ground.setAttribute('d', `M 520 120 L 520 ${160 + gapPx} L 500 ${160 + gapPx}`);
    const ok = kv >= need;
    arc.setAttribute('d', ok ? `M 507 160 l -5 ${gapPx / 3} l 8 ${gapPx / 3} l -5 ${gapPx / 3}` : '');
    set('ratio', fmt(ratio)); set('kv', fmt(kv, 1)); set('need', `~${fmt(need, 1)}`);
    cap(ok ? `<b>Spark.</b> ${v.vp} V × ${fmt(ratio)} = <b>${fmt(kv, 1)} kV</b>, enough to ionise a ${v.gap.toFixed(2)} mm gap under compression.`
      : `<b>Misfire.</b> ${fmt(kv, 1)} kV is not enough for a ${v.gap.toFixed(2)} mm gap. A worn, wide gap demands more voltage than the coil can deliver.`);
  });
}

/* ---------- Ohm's law ---------- */
const LOADS = [['Headlight', 55], ['Tail light', 5], ['Brake light', 21], ['Indicators (2)', 20], ['Horn', 36], ['Instruments', 6], ['Fuel pump', 40], ['ECU + injector', 30], ['Heated grips', 36], ['Starter motor', 1200]];
function ohmsLaw(el) {
  el.innerHTML = `
    <div class="ute-figure-stage" style="padding:12px 16px"><div class="ute-loads">${LOADS.map(([n, w], i) => `<label class="ute-load"><input type="checkbox" data-load="${i}" ${i < 3 ? 'checked' : ''}><span>${n}</span><b>${w} W</b></label>`).join('')}</div></div>
    <div class="ute-stats ute-fig-stats">${[['w', 'Total power', 'W'], ['a', 'Current @ 12 V', 'A'], ['r', 'Equivalent resistance', 'Ω'], ['f', 'Suggested fuse', 'A']].map(([k, l, u]) => `<div class="stat"><div class="stat-l">${l}</div><div class="stat-v"><span data-k="${k}">–</span><small>${u}</small></div></div>`).join('')}</div>
    <div class="ute-figure-cap" data-cap></div>`;
  const FUSES = [5, 7.5, 10, 15, 20, 25, 30, 40, 60, 100, 150];
  const upd = () => {
    const sel = [...el.querySelectorAll('[data-load]')].filter((c) => c.checked).map((c) => LOADS[+c.dataset.load]);
    const W = sel.reduce((a, [, w]) => a + w, 0), A = W / 12, R = A ? 12 / A : Infinity;
    const fuse = FUSES.find((f) => f >= A * 1.25) || '>150';
    el.querySelector('[data-k="w"]').textContent = W;
    el.querySelector('[data-k="a"]').textContent = A.toFixed(1);
    el.querySelector('[data-k="r"]').textContent = A ? R.toFixed(2) : '∞';
    el.querySelector('[data-k="f"]').textContent = A ? fuse : '–';
    el.querySelector('[data-cap]').innerHTML = `<b>I = P / V</b> = ${W} W ÷ 12 V = <b>${A.toFixed(1)} A</b>. <b>R = V / I</b> = ${A ? R.toFixed(2) : '∞'} Ω. ${sel.some(([n]) => n === 'Starter motor') ? 'The starter alone pulls ~100 A, which is why it has its own relay and heavy cable and is not on the fused accessory circuit.' : 'A fuse is sized about 25 % above the normal current so it blows on a short, not in normal use.'}`;
  };
  el.querySelectorAll('[data-load]').forEach((c) => c.addEventListener('change', upd));
  upd();
}

/* ---------- Gearing ---------- */
function gearPath(cx, cy, r, teeth, depth) {
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const P = (k, rr) => { const a = (i + k) / teeth * Math.PI * 2; return `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; };
    d += `${i ? 'L' : 'M'} ${P(0, r - depth)} L ${P(0.25, r)} L ${P(0.5, r)} L ${P(0.75, r - depth)} `;
  }
  return d + 'Z';
}
function gearing(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 260',
    stats: [['fr', 'Final ratio', ':1'], ['wr', 'Wheel speed', 'rpm'], ['kmh', 'Road speed', 'km/h'], ['k1000', 'Per 1000 rpm', 'km/h']],
    controls: sl('f', 'Front sprocket', 12, 18, 1, 14, 'T') + sl('r', 'Rear sprocket', 35, 56, 1, 42, 'T') + sl('rpm', 'Engine speed', 2000, 10000, 100, 8000, ' rpm'),
  });
  const g = ns('g'); svg.appendChild(g);
  let ang = 0, last = performance.now(), cur = { f: 14, r: 42, rpm: 8000 };
  // Reference: K-Light style primary 3.35, top gear ~0.96, 17" wheel r = 0.29 m (illustrative)
  const PRIMARY = 3.35, TOP = 0.96, RW = 0.29;
  const drawStatic = (v) => {
    g.innerHTML = '';
    const rf = v.f * 2.6, rr = v.r * 2.6;
    const F = [130, 130], R = [400, 130];
    g.appendChild(ns('path', { d: `M ${F[0]} ${F[1] - rf} L ${R[0]} ${R[1] - rr} A ${rr} ${rr} 0 0 1 ${R[0]} ${R[1] + rr} L ${F[0]} ${F[1] + rf} A ${rf} ${rf} 0 0 1 ${F[0]} ${F[1] - rf}`, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 6 }));
    const fg = ns('g', { 'data-g': 'f' }); fg.appendChild(ns('path', { d: gearPath(F[0], F[1], rf, v.f, 4), fill: '#8F959C', stroke: '#0A0A0A' })); fg.appendChild(ns('rect', { x: F[0] - 2, y: F[1] - rf + 6, width: 4, height: 10, fill: '#C2502A' }));
    const rg = ns('g', { 'data-g': 'r' }); rg.appendChild(ns('path', { d: gearPath(R[0], R[1], rr, v.r, 4), fill: '#E8E8E8', stroke: '#0A0A0A' })); rg.appendChild(ns('rect', { x: R[0] - 2, y: R[1] - rr + 6, width: 4, height: 14, fill: '#C2502A' }));
    g.append(fg, rg);
    g.appendChild(txt(F[0], 250, `${v.f}T`, 'middle', 11));
    g.appendChild(txt(R[0], 250, `${v.r}T`, 'middle', 11));
  };
  bindSliders(el, { f: (v) => `${v}T`, r: (v) => `${v}T`, rpm: (v) => `${v} rpm` }, (v) => {
    if (v.f !== cur.f || v.r !== cur.r || !g.childNodes.length) drawStatic(v);
    cur = v;
    const fr = v.r / v.f;
    const wr = v.rpm / PRIMARY / TOP / fr;
    const kmh = wr / 60 * 2 * Math.PI * RW * 3.6;
    set('fr', fr.toFixed(2)); set('wr', Math.round(wr)); set('kmh', Math.round(kmh)); set('k1000', (kmh / v.rpm * 1000).toFixed(1));
    cap(`Final ratio = rear ÷ front = ${v.r} ÷ ${v.f} = <b>${fr.toFixed(2)}</b>. In top gear at ${v.rpm} rpm that gives <b>${Math.round(kmh)} km/h</b>. Bigger rear or smaller front → stronger acceleration, lower top speed.`);
  });
  const loop = (now) => {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (visible(el)) {
      ang += cur.rpm / PRIMARY / TOP / 60 * 360 * dt / 20;
      const f = g.querySelector('[data-g="f"]'), r = g.querySelector('[data-g="r"]');
      if (f) f.setAttribute('transform', `rotate(${ang} 130 130)`);
      if (r) r.setAttribute('transform', `rotate(${ang * cur.f / cur.r} 400 130)`);
    }
    if (el.isConnected) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ---------- Brake hydraulics ---------- */
function brakeHydraulics(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 240',
    stats: [['p', 'Line pressure', 'bar'], ['clamp', 'Clamp force', 'kN'], ['mult', 'Force multiplied', '×']],
    controls: sl('hand', 'Hand force on lever', 50, 250, 5, 120, ' N') + sl('lr', 'Lever ratio', 3, 7, 0.1, 5, ':1') + sl('dm', 'Master piston Ø', 10, 16, 0.5, 12.7, ' mm') + sl('dc', 'Caliper piston Ø', 22, 36, 1, 32, ' mm') + sl('n', 'Caliper pistons', 1, 4, 1, 2),
  });
  const g = ns('g'); svg.appendChild(g);
  bindSliders(el, { hand: (v) => `${v} N`, lr: (v) => `${v.toFixed(1)}:1`, dm: (v) => `${v} mm`, dc: (v) => `${v} mm`, n: (v) => `${v}` }, (v) => {
    const Am = Math.PI / 4 * (v.dm / 1000) ** 2;
    const Ac = Math.PI / 4 * (v.dc / 1000) ** 2;
    const F = v.hand * v.lr;
    const p = F / Am;
    const pairs = Math.max(1, Math.round(v.n / 2) || 1);
    const clampF = p * Ac * (v.n >= 2 ? v.n / 2 : 1);
    set('p', fmt(p / 1e5, 1)); set('clamp', fmt(clampF / 1000, 1)); set('mult', fmt(clampF / v.hand));
    void pairs;
    g.innerHTML = '';
    const mh = v.dm * 3, ch = v.dc * 3;
    g.appendChild(ns('rect', { x: 40, y: 120 - mh / 2, width: 120, height: mh, fill: '#F3D9A0', stroke: '#0A0A0A', 'stroke-width': 2 }));
    g.appendChild(ns('rect', { x: 40, y: 120 - mh / 2, width: 30, height: mh, fill: '#8F959C', stroke: '#0A0A0A' }));
    g.appendChild(ns('path', { d: `M 160 120 L 380 120`, stroke: '#E2A93B', 'stroke-width': 6 }));
    g.appendChild(ns('rect', { x: 380, y: 120 - ch / 2, width: 140, height: ch, fill: '#F3D9A0', stroke: '#0A0A0A', 'stroke-width': 2 }));
    g.appendChild(ns('rect', { x: 470, y: 120 - ch / 2, width: 50, height: ch, fill: '#8F959C', stroke: '#0A0A0A' }));
    g.appendChild(ns('path', { d: 'M 10 120 L 38 120 M 30 112 L 38 120 L 30 128', fill: 'none', stroke: '#C2502A', 'stroke-width': 3 }));
    g.appendChild(ns('path', { d: 'M 524 120 L 580 120 M 572 108 L 584 120 L 572 132', fill: 'none', stroke: '#C2502A', 'stroke-width': 5 }));
    g.appendChild(txt(100, 120 - mh / 2 - 10, 'MASTER CYLINDER', 'middle', 10));
    g.appendChild(txt(450, 120 - ch / 2 - 10, `CALIPER PISTON${v.n > 1 ? 'S' : ''}`, 'middle', 10));
    g.appendChild(txt(270, 110, 'BRAKE FLUID', 'middle', 10, '#B8862A'));
    cap(`Pressure is the same everywhere in the fluid (Pascal). p = F ÷ A<sub>master</sub> = ${fmt(F)} N ÷ ${(Am * 1e6).toFixed(0)} mm² = <b>${fmt(p / 1e5, 1)} bar</b>. The caliper piston area is ${(Ac / Am).toFixed(1)}× larger, so each piston pushes ${(Ac / Am).toFixed(1)}× harder than the master.`);
  });
}

/* ---------- Suspension sag ---------- */
function sag(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 240',
    stats: [['sag', 'Rider sag', 'mm'], ['pct', 'Of travel', '%'], ['target', 'Target', 'mm']],
    controls: sl('rider', 'Rider + gear', 50, 130, 1, 80, ' kg') + sl('pre', 'Spring preload', 0, 20, 0.5, 6, ' mm') + sl('k', 'Spring rate', 40, 120, 1, 75, ' N/mm'),
  });
  const g = ns('g'); svg.appendChild(g);
  const TRAVEL = 120;
  bindSliders(el, { rider: (v) => `${v} kg`, pre: (v) => `${v} mm`, k: (v) => `${v} N/mm` }, (v) => {
    // Rear wheel load from rider (lever ratio ~2.5 at shock, ~60 % on rear), illustrative.
    const load = (v.rider * 9.81 * 0.6 + 900) * 2.5; // N at shock incl. bike share
    const comp = Math.max(0, load / v.k - v.pre * 1.0);
    const sagMM = clamp(comp / 2.5 * 1.0, 0, TRAVEL);
    const pct = sagMM / TRAVEL * 100;
    set('sag', fmt(sagMM)); set('pct', fmt(pct)); set('target', `${Math.round(TRAVEL * 0.3)}–${Math.round(TRAVEL * 0.35)}`);
    g.innerHTML = '';
    g.appendChild(ns('rect', { x: 60, y: 100, width: 480, height: 26, fill: '#FFFFFF', stroke: '#0A0A0A' }));
    g.appendChild(ns('rect', { x: 60 + 480 * 0.3, y: 100, width: 480 * 0.05, height: 26, fill: '#2BB76E', opacity: 0.4 }));
    g.appendChild(ns('rect', { x: 60, y: 100, width: 480 * clamp(pct / 100, 0, 1), height: 26, fill: pct < 25 ? '#3E6FB7' : pct > 40 ? '#C2502A' : '#2BB76E', opacity: 0.75 }));
    g.appendChild(txt(60, 90, '0 mm', 'start', 10));
    g.appendChild(txt(540, 90, `${TRAVEL} mm TRAVEL`, 'end', 10));
    g.appendChild(txt(60 + 480 * 0.325, 150, 'TARGET 30–35 %', 'middle', 10, '#1D6B55'));
    cap(pct < 25 ? '<b>Too little sag.</b> The suspension is topped out: harsh, and the wheel can lift over dips. Reduce preload or fit a softer spring.'
      : pct > 40 ? '<b>Too much sag.</b> Little travel left for bumps; it will bottom out and steer lazily. Add preload, or fit a stiffer spring if preload runs out.'
      : '<b>Good sag.</b> About a third of travel used just sitting on it, leaving room to extend into dips and compress over bumps.');
  });
}

/* ---------- Steering geometry ---------- */
function steering(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 340',
    stats: [['trail', 'Trail', 'mm'], ['rake', 'Rake', '°'], ['off', 'Offset', 'mm']],
    controls: sl('rake', 'Rake (caster angle)', 18, 35, 0.5, 26, '°') + sl('off', 'Fork offset', 0, 70, 1, 30, ' mm') + sl('r', 'Wheel radius', 280, 360, 5, 300, ' mm'),
  });
  const g = ns('g'); svg.appendChild(g);
  bindSliders(el, { rake: (v) => `${v}°`, off: (v) => `${v} mm`, r: (v) => `${v} mm` }, (v) => {
    const a = v.rake * Math.PI / 180;
    const trail = (v.r * Math.sin(a) - v.off) / Math.cos(a);
    set('trail', fmt(trail)); set('rake', v.rake); set('off', v.off);
    const s = 0.42, G = 300, AX = 300;
    const R = v.r * s;
    const hub = [AX, G - R];
    // Steering axis passes at offset (perpendicular) ahead of the hub; with bike facing left, axis is to the left
    const ux = -Math.sin(a), uy = -Math.cos(a); // up along axis (toward rider at left-top)
    const nx = -Math.cos(a), ny = Math.sin(a);   // perpendicular, forward (left)
    const p0 = [hub[0] + nx * v.off * s, hub[1] + ny * v.off * s];
    const tG = (G - p0[1]) / -uy; // reach ground going "down" the axis
    const ground = [p0[0] - ux * tG, G];
    g.innerHTML = '';
    g.appendChild(ns('line', { x1: 20, y1: G, x2: 580, y2: G, stroke: '#0A0A0A', 'stroke-width': 2 }));
    g.appendChild(ns('circle', { cx: hub[0], cy: hub[1], r: R, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 10, opacity: 0.85 }));
    g.appendChild(ns('circle', { cx: hub[0], cy: hub[1], r: 6, fill: '#0A0A0A' }));
    g.appendChild(ns('line', { x1: ground[0], y1: ground[1], x2: p0[0] + ux * 260, y2: p0[1] + uy * 260, stroke: '#C2502A', 'stroke-width': 2, 'stroke-dasharray': '8 5' }));
    g.appendChild(ns('line', { x1: hub[0], y1: hub[1], x2: hub[0] + ux * 200, y2: hub[1] + uy * 200, stroke: '#8F959C', 'stroke-width': 12 }));
    g.appendChild(ns('line', { x1: hub[0], y1: G, x2: hub[0], y2: G - 40, stroke: '#3E6FB7', 'stroke-width': 1.5, 'stroke-dasharray': '3 3' }));
    g.appendChild(ns('line', { x1: ground[0], y1: G + 14, x2: hub[0], y2: G + 14, stroke: '#1D6B55', 'stroke-width': 4 }));
    g.appendChild(txt((ground[0] + hub[0]) / 2, G + 30, `TRAIL ${fmt(trail)} MM`, 'middle', 10, '#1D6B55'));
    g.appendChild(txt(p0[0] + ux * 260 - 10, p0[1] + uy * 260 + 4, 'STEERING AXIS', 'end', 10, '#C2502A'));
    cap(`Trail = (R·sin rake − offset) ÷ cos rake = <b>${fmt(trail)} mm</b>. The contact patch trails behind where the steering axis meets the road, so the wheel self-centres like a shopping-trolley caster. ${trail < 70 ? 'Short trail: quick, light steering.' : trail > 110 ? 'Long trail: very stable, heavy steering.' : 'A typical road-bike value (about 80–110 mm).'}`);
  });
}

/* ---------- Torque curves ---------- */
function torqueCurves(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 300',
    stats: [['ice_t', 'Petrol torque', 'Nm'], ['ev_t', 'Electric torque', 'Nm'], ['ice_p', 'Petrol power', 'kW'], ['ev_p', 'Electric power', 'kW']],
    controls: sl('rpm', 'Speed', 0, 10000, 100, 3000, ' rpm'),
  });
  const X = (r) => 50 + r / 10000 * 520, Y = (t) => 260 - t / 60 * 220;
  const ice = (r) => r < 1500 ? 0 : 38 * Math.exp(-(((r - 6500) / 3800) ** 2));
  const BASE = 4500, EVT = 50;
  const ev = (r) => r <= BASE ? EVT : EVT * BASE / r;
  svg.appendChild(ns('path', { d: 'M 50 40 L 50 260 L 570 260', fill: 'none', stroke: '#C9C9C9' }));
  [10, 20, 30, 40, 50].forEach((t) => { svg.appendChild(ns('line', { x1: 50, x2: 570, y1: Y(t), y2: Y(t), stroke: '#E6E6E6' })); svg.appendChild(txt(44, Y(t) + 3, t, 'end', 9)); });
  [0, 2500, 5000, 7500, 10000].forEach((r) => svg.appendChild(txt(X(r), 276, r, 'middle', 9)));
  svg.appendChild(txt(50, 30, 'TORQUE NM', 'start', 9));
  const path = (f, from = 0) => { let d = ''; for (let r = from; r <= 10000; r += 100) d += `${d ? 'L' : 'M'} ${X(r).toFixed(1)} ${Y(f(r)).toFixed(1)} `; return d; };
  svg.appendChild(ns('path', { d: path(ice, 1500), fill: 'none', stroke: '#C2502A', 'stroke-width': 3 }));
  svg.appendChild(ns('path', { d: path(ev), fill: 'none', stroke: '#1D6B55', 'stroke-width': 3 }));
  svg.appendChild(txt(X(8000), Y(ice(8000)) - 10, 'PETROL', 'middle', 10, '#C2502A'));
  svg.appendChild(txt(X(1500), Y(EVT) - 10, 'ELECTRIC', 'middle', 10, '#1D6B55'));
  const cur = ns('line', { y1: 40, y2: 260, stroke: '#0A0A0A', 'stroke-width': 1.5, 'stroke-dasharray': '4 3' });
  const d1 = ns('circle', { r: 5, fill: '#C2502A' }), d2 = ns('circle', { r: 5, fill: '#1D6B55' });
  svg.append(cur, d1, d2);
  bindSliders(el, { rpm: (v) => `${v} rpm` }, ({ rpm }) => {
    const ti = ice(rpm), te = ev(rpm);
    cur.setAttribute('x1', X(rpm)); cur.setAttribute('x2', X(rpm));
    d1.setAttribute('cx', X(rpm)); d1.setAttribute('cy', Y(ti));
    d2.setAttribute('cx', X(rpm)); d2.setAttribute('cy', Y(te));
    set('ice_t', fmt(ti, 1)); set('ev_t', fmt(te, 1)); set('ice_p', fmt(ti * rpm / 9549, 1)); set('ev_p', fmt(te * rpm / 9549, 1));
    cap(rpm < 1500 ? '<b>Standstill to idle.</b> The petrol engine makes nothing useful yet and needs a clutch to pull away. The motor gives full torque from 0 rpm.'
      : rpm <= BASE ? `<b>Constant-torque region.</b> Below its base speed (${BASE} rpm here) the motor is limited by current, so torque is flat and power rises in a straight line.`
      : '<b>Constant-power region.</b> Above base speed the battery voltage limits the motor; torque falls as 1/rpm so power stays flat. The petrol engine is near its peak here, which is why it needs a gearbox.');
  });
}

/* ---------- Battery pack ---------- */
function batteryPack(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 260',
    stats: [['v', 'Pack voltage', 'V'], ['ah', 'Capacity', 'Ah'], ['kwh', 'Energy', 'kWh'], ['n', 'Cells', ''], ['kg', 'Cell mass', 'kg']],
    controls: sl('s', 'Cells in series (S)', 4, 120, 1, 20, 'S') + sl('p', 'Cells in parallel (P)', 1, 14, 1, 10, 'P') + sl('cah', 'Cell capacity (21700)', 3, 5.5, 0.1, 5, ' Ah'),
  });
  const g = ns('g'); svg.appendChild(g);
  bindSliders(el, { s: (v) => `${v}S`, p: (v) => `${v}P`, cah: (v) => `${v.toFixed(1)} Ah` }, (v) => {
    const V = v.s * 3.6, Ah = v.p * v.cah, kWh = V * Ah / 1000, n = v.s * v.p;
    set('v', fmt(V, 0)); set('ah', fmt(Ah, 0)); set('kwh', fmt(kWh, 2)); set('n', n); set('kg', fmt(n * 0.07, 1));
    g.innerHTML = '';
    const cols = Math.min(v.s, 30), rows = Math.min(v.p, 8);
    const cw = Math.min(17, 540 / cols), r = Math.min(7.5, cw / 2 - 1, 180 / rows / 2 - 1);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) g.appendChild(ns('circle', { cx: 40 + i * cw, cy: 40 + j * (r * 2 + 3), r, fill: '#1D6B55', stroke: '#0A0A0A', 'stroke-width': 0.8 }));
    g.appendChild(txt(40, 240, `${v.s > cols ? `showing ${cols} of ${v.s}` : v.s} series groups →   ↓ ${v.p > rows ? `showing ${rows} of ${v.p}` : v.p} in parallel`, 'start', 10));
    cap(`<b>Series adds voltage</b> (${v.s} × 3.6 V = ${fmt(V)} V). <b>Parallel adds capacity</b> (${v.p} × ${v.cah.toFixed(1)} Ah = ${fmt(Ah)} Ah). Energy = V × Ah = <b>${fmt(kWh, 2)} kWh</b>. ${V > 60 ? 'Above 60 V DC this is a <b>high-voltage</b> system: orange cables, isolation monitoring, trained staff only.' : 'Below 60 V DC: low-voltage class, as used on most scooters and light motorcycles.'}`);
  });
}

/* ---------- Power = torque × speed ---------- */
function powerTorque(el) {
  const { set, cap } = scaffold(el, {
    viewBox: '0 0 600 120',
    stats: [['kw', 'Power', 'kW'], ['hp', 'Power', 'hp'], ['w', 'Angular speed', 'rad/s']],
    controls: sl('t', 'Torque', 1, 120, 0.5, 10.5, ' Nm') + sl('rpm', 'Speed', 500, 12000, 100, 8000, ' rpm'),
  });
  const svg = el.querySelector('svg');
  const bar = ns('rect', { x: 20, y: 40, height: 40, fill: '#C2502A' });
  svg.appendChild(ns('rect', { x: 20, y: 40, width: 560, height: 40, fill: '#FFFFFF', stroke: '#0A0A0A' }));
  svg.appendChild(bar);
  svg.appendChild(txt(20, 30, 'POWER (0–100 KW)', 'start', 10));
  bindSliders(el, { t: (v) => `${v} Nm`, rpm: (v) => `${v} rpm` }, ({ t, rpm }) => {
    const w = rpm * 2 * Math.PI / 60, kw = t * w / 1000;
    bar.setAttribute('width', clamp(kw / 100, 0, 1) * 560);
    set('kw', fmt(kw, 2)); set('hp', fmt(kw * 1.341, 1)); set('w', fmt(w));
    cap(`P = T × ω = ${t} Nm × ${fmt(w)} rad/s = <b>${fmt(kw, 2)} kW</b>. Shortcut: <b>kW = Nm × rpm ÷ 9549</b>. The same power can come from high torque at low rpm or low torque at high rpm.`);
  });
}

/* ---------- Weight transfer ---------- */
function weightTransfer(el) {
  const { svg, set, cap } = scaffold(el, {
    viewBox: '0 0 600 260',
    stats: [['front', 'Front load', '%'], ['rear', 'Rear load', '%'], ['dw', 'Transferred', 'N']],
    controls: sl('g', 'Deceleration', 0, 1.2, 0.01, 0.6, ' g') + sl('h', 'CoG height', 450, 800, 10, 650, ' mm') + sl('L', 'Wheelbase', 1200, 1600, 10, 1350, ' mm'),
  });
  const g = ns('g'); svg.appendChild(g);
  const M = 250;
  bindSliders(el, { g: (v) => `${v.toFixed(2)} g`, h: (v) => `${v} mm`, L: (v) => `${v} mm` }, (v) => {
    const W = M * 9.81, dW = M * v.g * 9.81 * v.h / v.L;
    const front = clamp((W * 0.5 + dW) / W, 0, 1), rear = 1 - front;
    set('front', fmt(front * 100)); set('rear', fmt(rear * 100)); set('dw', fmt(dW));
    const pitch = clamp(v.g * 6, 0, 9);
    g.innerHTML = '';
    g.appendChild(ns('line', { x1: 40, y1: 220, x2: 560, y2: 220, stroke: '#0A0A0A', 'stroke-width': 2 }));
    const bike = ns('g', { transform: `rotate(${-pitch} 180 190)` });
    bike.appendChild(ns('circle', { cx: 180, cy: 180, r: 40, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 8 }));
    bike.appendChild(ns('circle', { cx: 420, cy: 180, r: 40, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 8 }));
    bike.appendChild(ns('path', { d: 'M 180 180 L 230 100 L 380 110 L 420 180 M 230 100 L 300 160 L 380 110', fill: 'none', stroke: '#0A0A0A', 'stroke-width': 4 }));
    bike.appendChild(ns('circle', { cx: 300, cy: 220 - v.h / 6, r: 9, fill: '#C2502A', stroke: '#0A0A0A' }));
    bike.appendChild(txt(314, 220 - v.h / 6 + 4, 'CoG', 'start', 9, '#C2502A'));
    g.appendChild(bike);
    g.appendChild(ns('rect', { x: 165, y: 228, width: 30, height: front * 30, fill: '#C2502A' }));
    g.appendChild(ns('rect', { x: 405, y: 228, width: 30, height: rear * 30, fill: '#3E6FB7' }));
    cap(rear <= 0.01 ? '<b>Stoppie!</b> All the weight is on the front; the rear wheel lifts. This is the braking limit of a short, tall motorcycle.'
      : `Braking shifts <b>m·a·h ÷ L = ${fmt(dW)} N</b> onto the front. With ${fmt(front * 100)} % of the load up front, the front tyre can provide most of the grip, which is why the front brake does most of the stopping.`);
  });
}

const FIGS = {
  'cycle-4t': (el) => cycleFig(el, '4t'),
  'cycle-2t': (el) => cycleFig(el, '2t'),
  'engine-params': engineParams,
  afr,
  'ignition-coil': ignitionCoil,
  'ohms-law': ohmsLaw,
  gearing,
  'brake-hydraulics': brakeHydraulics,
  sag,
  'steering-geometry': steering,
  'torque-curves': torqueCurves,
  'battery-pack': batteryPack,
  'power-torque': powerTorque,
  'weight-transfer': weightTransfer,
};
export const FIGURE_KEYS = Object.keys(FIGS);

export function mountFigure(key, el) {
  const f = FIGS[key];
  if (!f) { el.remove(); return; }
  try { f(el); } catch (e) { console.error('figure', key, e); el.remove(); }
}
