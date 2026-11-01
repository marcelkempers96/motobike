/* ==========================================================================
   Under the Engine — shared core
   SVG helpers, metal gradients, physics formulas and the engine cross-section
   builder. Used by the Lab (app.js) and the Learn page (learn.js).
   ========================================================================== */

export const SVGNS = 'http://www.w3.org/2000/svg';

export function ns(tag, attrs) {
  const el = document.createElementNS(SVGNS, tag);
  if (attrs) for (const k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
  return el;
}

export function txt(x, y, s, anchor, size, fill) {
  const t = ns('text', {
    x, y,
    fill: fill || '#6B6963',
    'font-family': 'Barlow Semi Condensed, Barlow, sans-serif',
    'font-size': size || 11,
    'letter-spacing': '0.08em',
    'text-anchor': anchor || 'start',
  });
  t.textContent = s;
  return t;
}

export function iso3DBox(x, y, w, h, d, colors) {
  const g = ns('g');
  const dx = d * 0.5, dy = d * 0.4;
  g.appendChild(ns('polygon', { points: `${x},${y + h} ${x + w},${y + h} ${x + w + dx},${y + h - dy} ${x + dx},${y + h - dy}`, fill: colors.bottom || colors.right || colors.front, opacity: 0.8 }));
  g.appendChild(ns('rect', { x, y, width: w, height: h, fill: colors.front, stroke: '#0A0A0A', 'stroke-width': 2 }));
  g.appendChild(ns('polygon', { points: `${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}`, fill: colors.top, stroke: '#0A0A0A', 'stroke-width': 2 }));
  g.appendChild(ns('polygon', { points: `${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}`, fill: colors.right, stroke: '#0A0A0A', 'stroke-width': 2 }));
  return g;
}

export function hexBolt(cx, cy, size) {
  const g = ns('g');
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 2 * Math.PI + Math.PI / 6;
    pts.push(`${cx + Math.cos(a) * size},${cy + Math.sin(a) * size}`);
  }
  g.appendChild(ns('polygon', { points: pts.join(' '), fill: '#8E867A', stroke: '#0A0A0A', 'stroke-width': 0.7 }));
  g.appendChild(ns('circle', { cx: cx - size * 0.25, cy: cy - size * 0.25, r: size * 0.4, fill: '#F2EEE4', opacity: 0.4 }));
  g.appendChild(ns('circle', { cx, cy, r: size * 0.3, fill: '#1A1816' }));
  return g;
}

/* Shared gradient palette. Lives in one hidden <svg> in <body> so every
   drawing on the page can reference url(#m-chrome) etc. and ids stay unique. */
export function defsPackMetals() {
  if (document.getElementById('ute-global-defs')) return;
  const svg = ns('svg', { id: 'ute-global-defs', width: 0, height: 0, 'aria-hidden': 'true' });
  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';
  const defs = ns('defs');
  const lin = (id, stops, x2 = 0, y2 = 1) => {
    const g = ns('linearGradient', { id, x1: 0, y1: 0, x2, y2 });
    stops.forEach(([o, c]) => g.appendChild(ns('stop', { offset: o, 'stop-color': c })));
    defs.appendChild(g);
  };
  const rad = (id, stops) => {
    const g = ns('radialGradient', { id, cx: '38%', cy: '35%', r: '70%' });
    stops.forEach(([o, c]) => g.appendChild(ns('stop', { offset: o, 'stop-color': c })));
    defs.appendChild(g);
  };
  lin('m-chrome',   [[0, '#FFFFFF'], [0.45, '#C9CDD2'], [0.55, '#8F959C'], [1, '#E6E8EA']]);
  lin('m-alu',      [[0, '#F1F1EE'], [0.5, '#C8C6BF'], [1, '#9C998F']]);
  lin('m-copper',   [[0, '#F0B488'], [0.5, '#C2703F'], [1, '#8A4520']]);
  lin('m-steel',    [[0, '#9AA0A6'], [0.5, '#5E646A'], [1, '#3A3E43']]);
  lin('m-case',     [[0, '#B8B2A6'], [1, '#7E776B']]);
  lin('m-cover',    [[0, '#E9E5DC'], [1, '#B9B3A4']]);
  lin('m-piston',   [[0, '#E4E1DA'], [0.5, '#BDB8AD'], [1, '#8E887C']], 1, 0);
  lin('m-rod',      [[0, '#7D838A'], [0.5, '#C5C9CE'], [1, '#6A7076']], 1, 0);
  lin('m-tank-4t',  [[0, '#E0785A'], [0.5, '#C2502A'], [1, '#7E2F15']]);
  lin('m-tank-2t',  [[0, '#F6F5F2'], [0.6, '#DDD9CF'], [1, '#9F998B']]);
  lin('m-tank-el',  [[0, '#4BA88A'], [0.5, '#1D6B55'], [1, '#0E3A2E']]);
  lin('m-rubber',   [[0, '#3A3835'], [1, '#141312']]);
  lin('m-seat',     [[0, '#4A4642'], [1, '#1E1C1A']]);
  lin('m-pack',     [[0, '#3C4146'], [1, '#1A1D20']]);
  rad('m-tyre',     [[0, '#4A4744'], [0.75, '#2A2826'], [1, '#121110']]);
  rad('m-lamp',     [[0, '#FFFBEA'], [0.6, '#F3E2A6'], [1, '#C9B77A']]);
  rad('m-lamp-led', [[0, '#F2FFFA'], [0.6, '#BFEBDC'], [1, '#6FB79E']]);
  rad('m-flash',    [[0, '#FFF6D6'], [0.4, '#E2A93B'], [1, 'rgba(194,80,42,0)']]);
  svg.appendChild(defs);
  document.body.appendChild(svg);
}

/* ---------- Physics (illustrative, not spec-sheet) ---------- */
export const GEAR = { primary: 2.1, final: 2.6, gear3: 1.3, wheel_r_m: 0.30 };

export function displacementCC(bore_mm, stroke_mm) {
  return (Math.PI / 4) * bore_mm * bore_mm * stroke_mm / 1000;
}
export function approxTorqueNm(disp_cc, mode, cr) {
  const base = (mode === '4t') ? 10 : (mode === '2t') ? 8 : 10;
  const bmep_bar = base * (1 + 0.03 * (cr - 10));
  const V = disp_cc * 1e-6;
  const nR = (mode === '4t') ? 2 : 1;
  return bmep_bar * 1e5 * V / (2 * Math.PI * nR);
}
export function wheelRPMFromEngine(rpm) { return rpm / GEAR.primary / GEAR.gear3 / GEAR.final; }
export function kmhFromWheelRPM(wrpm) { return (wrpm / 60) * (2 * Math.PI * GEAR.wheel_r_m) * 3.6; }

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const fmt = (v, d = 0) => (Number.isFinite(v) ? v.toFixed(d) : '–');

/* ---------- Stroke maps ---------- */
export const STROKES_4T = [
  { k: 'intake',      label: 'Intake',      from: 0,   to: 180, color: '#BCD0EE', gas: '#3E6FB7' },
  { k: 'compression', label: 'Compression', from: 180, to: 360, color: '#EFE6CF', gas: '#D9C99A' },
  { k: 'power',       label: 'Power',       from: 360, to: 540, color: '#F1B79C', gas: '#C2502A' },
  { k: 'exhaust',     label: 'Exhaust',     from: 540, to: 720, color: '#CFC7BB', gas: '#7A6E60' },
];
export const STROKES_2T = [
  { k: 'power',       label: 'Power',       from: 0,   to: 105, color: '#F1B79C', gas: '#C2502A' },
  { k: 'blowdown',    label: 'Blowdown',    from: 105, to: 128, color: '#CFC7BB', gas: '#7A6E60' },
  { k: 'scavenge',    label: 'Scavenge',    from: 128, to: 232, color: '#BCD0EE', gas: '#3E6FB7' },
  { k: 'compression', label: 'Compression', from: 232, to: 360, color: '#EFE6CF', gas: '#D9C99A' },
];
export function strokeAt(mode, deg) {
  const list = mode === '2t' ? STROKES_2T : STROKES_4T;
  return list.find((s) => deg >= s.from && deg < s.to) || list[0];
}

/* Builds a timing strip element. Returns { el, set(deg) }. */
export function buildTimingStrip(mode) {
  const list = mode === '2t' ? STROKES_2T : STROKES_4T;
  const total = mode === '2t' ? 360 : 720;
  const el = document.createElement('div');
  el.className = 'ute-timing';
  list.forEach((s) => {
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.style.width = ((s.to - s.from) / total * 100) + '%';
    seg.style.background = s.color;
    seg.textContent = s.label;
    el.appendChild(seg);
  });
  const needle = document.createElement('div');
  needle.className = 'needle';
  el.appendChild(needle);
  return { el, set(deg) { needle.style.left = `calc(${(deg % total) / total * 100}% - 1px)`; } };
}

/* ==========================================================================
   Engine cross-section
   buildEngine(svg, { mode }) draws into an <svg viewBox="0 0 600 480"> and
   returns { update({ mode, crank_deg, bore_mm, stroke_mm, compression }) }.
   ========================================================================== */
export function buildEngine(svg, opts = {}) {
  defsPackMetals();
  const mode = opts.mode || '4t';
  svg.setAttribute('viewBox', '0 0 600 480');
  svg.innerHTML = '';
  const CX = 300, CY = 392;

  const L = {};
  const root = ns('g');
  svg.appendChild(root);

  // Back layers
  L.port_left = ns('g'); L.port_right = ns('g');
  L.liner = ns('g');
  L.gas = ns('rect', { fill: '#3E6FB7', opacity: 0.55 });
  L.flash = ns('circle', { r: 60, fill: 'url(#m-flash)', opacity: 0 });
  L.head = ns('g');
  L.valves = ns('g');
  L.plug = ns('g');
  L.crankcase = ns('path', { fill: 'url(#m-case)', stroke: '#0A0A0A', 'stroke-width': 2 });
  L.crankWeb = ns('g');
  L.rod = ns('g');
  L.piston = ns('g');
  L.labels = ns('g');

  root.append(L.crankcase, L.port_left, L.port_right, L.liner, L.gas, L.flash, L.head, L.valves, L.plug,
    L.crankWeb, L.rod, L.piston, L.labels);

  // Static-ish pieces that are rebuilt when geometry params change
  let geomKey = '';
  const refs = {};

  function rebuild(p) {
    const st = p.stroke_mm, bore = p.bore_mm, cr = p.compression;
    const k = Math.min(1.6, 250 / (2.25 * st));
    const r = st * k / 2;
    const Lr = 1.75 * st * k;
    const w = bore * k;
    const pinOff = 30, pistonH = 58;
    const crownTDC = CY - (r + Lr) - pinOff;
    const crownBDC = CY - (Lr - r) - pinOff;
    const clear = (st * k) / (cr - 1);
    const headY = crownTDC - clear;
    const linerBottom = crownBDC + pistonH + 6;
    const xl = CX - w / 2, xr = CX + w / 2;
    const G = { k, r, Lr, w, pinOff, pistonH, crownTDC, crownBDC, clear, headY, linerBottom, xl, xr };
    Object.assign(refs, { G });

    // Crankcase: rounded box around the crank
    const cr2 = r + 46;
    L.crankcase.setAttribute('d',
      `M ${xl - 22} ${linerBottom - 6} L ${xl - 22} ${CY - cr2 * 0.6} ` +
      `Q ${CX - cr2 - 14} ${CY - cr2 * 0.6} ${CX - cr2 - 14} ${CY} ` +
      `A ${cr2 + 14} ${cr2 + 4} 0 0 0 ${CX + cr2 + 14} ${CY} ` +
      `Q ${CX + cr2 + 14} ${CY - cr2 * 0.6} ${xr + 22} ${CY - cr2 * 0.6} L ${xr + 22} ${linerBottom - 6} Z`);

    // Liner walls
    L.liner.innerHTML = '';
    const wallT = 18;
    const top = headY;
    L.liner.appendChild(ns('rect', { x: xl - wallT, y: top, width: wallT, height: linerBottom - top, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    L.liner.appendChild(ns('rect', { x: xr, y: top, width: wallT, height: linerBottom - top, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    // Cooling fins
    for (let y = top + 14; y < crownBDC + 20; y += 16) {
      L.liner.appendChild(ns('rect', { x: xl - wallT - 26, y, width: 26, height: 7, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1 }));
      L.liner.appendChild(ns('rect', { x: xr + wallT, y, width: 26, height: 7, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1 }));
    }
    // Cylinder interior background
    L.liner.insertBefore(ns('rect', { x: xl, y: top, width: w, height: linerBottom - top, fill: '#FBFAF7' }), L.liner.firstChild);

    // Ports (2T)
    L.port_left.innerHTML = ''; L.port_right.innerHTML = '';
    refs.ports = null;
    if (p.mode === '2t') {
      const sp = st * k;
      const exTop = crownBDC - sp * 0.36;
      const trTop = crownBDC - sp * 0.22;
      const ex = ns('g');
      ex.appendChild(ns('rect', { x: xr - 1, y: exTop, width: wallT + 30, height: crownBDC + 4 - exTop, fill: '#CFC7BB', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      ex.appendChild(ns('path', { d: `M ${xr + wallT + 29} ${exTop} q 40 -6 70 -30 l 0 ${crownBDC + 4 - exTop + 22} q -30 8 -70 8 Z`, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      const tr = ns('g');
      tr.appendChild(ns('rect', { x: xl - wallT - 30, y: trTop, width: wallT + 31, height: crownBDC + 4 - trTop, fill: '#BCD0EE', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      tr.appendChild(ns('rect', { x: xl - wallT - 30, y: trTop, width: 16, height: linerBottom + 30 - trTop, fill: '#BCD0EE', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      // Reed intake into crankcase
      const reed = ns('g');
      reed.appendChild(ns('rect', { x: xl - 110, y: linerBottom + 10, width: 90, height: 26, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
      reed.appendChild(ns('path', { d: `M ${xl - 22} ${linerBottom + 12} l 14 12 l -14 12`, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 2 }));
      L.port_right.appendChild(ex);
      L.port_left.append(tr, reed);
      refs.ports = { ex, tr, exTop, trTop };
      L.labels.innerHTML = '';
      L.labels.append(
        txt(xr + wallT + 104, exTop - 34, 'EXHAUST PORT', 'middle', 10),
        txt(xl - wallT - 40, trTop - 8, 'TRANSFER', 'end', 10),
        txt(xl - 66, linerBottom + 52, 'REED INTAKE', 'middle', 10),
      );
    } else {
      L.labels.innerHTML = '';
    }

    // Head
    L.head.innerHTML = '';
    const headH = p.mode === '4t' ? 56 : 40;
    const hTop = headY - headH;
    L.head.appendChild(ns('path', {
      d: `M ${xl - wallT - 8} ${headY} L ${xl - wallT - 8} ${hTop + 10} Q ${CX} ${hTop - 14} ${xr + wallT + 8} ${hTop + 10} L ${xr + wallT + 8} ${headY} ` +
         `L ${xr} ${headY} Q ${CX} ${headY - (p.mode === '2t' ? 18 : 10)} ${xl} ${headY} Z`,
      fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 2,
    }));
    for (let i = 0; i < 3; i++) {
      L.head.appendChild(ns('rect', { x: xl - wallT - 14, y: hTop + 14 + i * 14, width: 8, height: 6, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1 }));
      L.head.appendChild(ns('rect', { x: xr + wallT + 6, y: hTop + 14 + i * 14, width: 8, height: 6, fill: 'url(#m-alu)', stroke: '#0A0A0A', 'stroke-width': 1 }));
    }

    // Valves (4T)
    L.valves.innerHTML = '';
    refs.valves = null;
    if (p.mode === '4t') {
      const vx1 = CX - w * 0.26, vx2 = CX + w * 0.26, vw = w * 0.32;
      // ports
      L.head.appendChild(ns('path', { d: `M ${vx1 - vw / 2} ${headY - 4} L ${xl - wallT - 8} ${hTop + 18} L ${xl - wallT - 8} ${hTop + 40} L ${vx1 + vw / 2} ${headY - 4} Z`, fill: '#BCD0EE', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
      L.head.appendChild(ns('path', { d: `M ${vx2 + vw / 2} ${headY - 4} L ${xr + wallT + 8} ${hTop + 18} L ${xr + wallT + 8} ${hTop + 40} L ${vx2 - vw / 2} ${headY - 4} Z`, fill: '#CFC7BB', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
      const mkValve = (x, color) => {
        const g = ns('g');
        g.appendChild(ns('rect', { x: x - 3, y: hTop - 30, width: 6, height: headY - hTop + 26, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1 }));
        g.appendChild(ns('path', { d: `M ${x - vw / 2} ${headY - 1} L ${x + vw / 2} ${headY - 1} L ${x + 5} ${headY - 10} L ${x - 5} ${headY - 10} Z`, fill: color, stroke: '#0A0A0A', 'stroke-width': 1.5 }));
        // spring
        let d = `M ${x - 9} ${hTop - 26}`;
        for (let i = 0; i < 6; i++) d += ` L ${x + 9} ${hTop - 22 + i * 4} L ${x - 9} ${hTop - 20 + i * 4}`;
        g.appendChild(ns('path', { d, fill: 'none', stroke: '#6B6963', 'stroke-width': 1.2 }));
        L.valves.appendChild(g);
        return g;
      };
      refs.valves = { vin: mkValve(vx1, '#3E6FB7'), vex: mkValve(vx2, '#7A6E60') };
      L.labels.append(
        txt(xl - wallT - 14, hTop + 2, 'INTAKE', 'end', 10, '#3E6FB7'),
        txt(xr + wallT + 14, hTop + 2, 'EXHAUST', 'start', 10, '#7A6E60'),
      );
    }

    // Spark plug
    L.plug.innerHTML = '';
    const px = CX + (p.mode === '4t' ? 0 : 0);
    L.plug.appendChild(ns('rect', { x: px - 7, y: hTop - 62, width: 14, height: 40, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5, rx: 3 }));
    L.plug.appendChild(ns('rect', { x: px - 10, y: hTop - 24, width: 20, height: 12, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1.2 }));
    L.plug.appendChild(ns('rect', { x: px - 4, y: hTop - 12, width: 8, height: headY - hTop + 8, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 1 }));
    L.plug.appendChild(ns('rect', { x: px - 3, y: hTop - 72, width: 6, height: 12, fill: '#6B6963' }));
    L.flash.setAttribute('cx', px);
    L.flash.setAttribute('cy', headY + 6);
    L.labels.appendChild(txt(px + 18, hTop - 50, 'SPARK PLUG', 'start', 10));

    // Crank web + rod + piston: built once per geometry
    L.crankWeb.innerHTML = '';
    const web = ns('g');
    web.appendChild(ns('path', { d: `M ${CX - r - 26} ${CY} A ${r + 26} ${r + 26} 0 0 0 ${CX + r + 26} ${CY} Z`, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    web.appendChild(ns('circle', { cx: CX, cy: CY, r: r * 0.7 + 10, fill: 'url(#m-steel)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    web.appendChild(ns('circle', { cx: CX, cy: CY - r, r: 10, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    L.crankWeb.appendChild(web);
    L.crankWeb.appendChild(ns('circle', { cx: CX, cy: CY, r: 9, fill: '#1A1816' }));
    refs.web = web;

    L.rod.innerHTML = '';
    refs.rodBody = ns('path', { fill: 'url(#m-rod)', stroke: '#0A0A0A', 'stroke-width': 1.5 });
    refs.rodBig = ns('circle', { r: 15, fill: 'none', stroke: '#0A0A0A', 'stroke-width': 2 });
    refs.rodSmall = ns('circle', { r: 8, fill: '#F6F5F2', stroke: '#0A0A0A', 'stroke-width': 1.5 });
    L.rod.append(refs.rodBody, refs.rodBig, refs.rodSmall);

    L.piston.innerHTML = '';
    const pg = ns('g');
    pg.appendChild(ns('rect', { x: xl + 1, y: 0, width: w - 2, height: pistonH, fill: 'url(#m-piston)', stroke: '#0A0A0A', 'stroke-width': 2 }));
    for (let i = 0; i < 3; i++) pg.appendChild(ns('line', { x1: xl + 1, x2: xr - 1, y1: 7 + i * 6, y2: 7 + i * 6, stroke: '#0A0A0A', 'stroke-width': i === 2 ? 1.6 : 1 }));
    pg.appendChild(ns('circle', { cx: CX, cy: pinOff, r: 9, fill: 'url(#m-chrome)', stroke: '#0A0A0A', 'stroke-width': 1.5 }));
    L.piston.appendChild(pg);
    refs.piston = pg;
  }

  function update(p) {
    const key = [p.mode, p.bore_mm, p.stroke_mm, p.compression].join('|');
    if (key !== geomKey) { geomKey = key; rebuild(p); }
    const G = refs.G;
    const cycle = p.mode === '2t' ? 360 : 720;
    const deg = ((p.crank_deg % cycle) + cycle) % cycle;
    const th = (deg % 360) * Math.PI / 180;
    const pinY = CY - (G.r * Math.cos(th) + Math.sqrt(G.Lr * G.Lr - (G.r * Math.sin(th)) ** 2));
    const crownY = pinY - G.pinOff;
    const cpx = CX + G.r * Math.sin(th), cpy = CY - G.r * Math.cos(th);

    refs.piston.setAttribute('transform', `translate(0 ${crownY})`);
    refs.web.setAttribute('transform', `rotate(${deg % 360} ${CX} ${CY})`);
    // Rod: tapered body from big end to small end
    const ang = Math.atan2(pinY - cpy, CX - cpx);
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    const wb = 11, ws = 6;
    refs.rodBody.setAttribute('d',
      `M ${cpx + nx * wb} ${cpy + ny * wb} L ${CX + nx * ws} ${pinY + ny * ws} L ${CX - nx * ws} ${pinY - ny * ws} L ${cpx - nx * wb} ${cpy - ny * wb} Z`);
    refs.rodBig.setAttribute('cx', cpx); refs.rodBig.setAttribute('cy', cpy);
    refs.rodSmall.setAttribute('cx', CX); refs.rodSmall.setAttribute('cy', pinY);

    // Gas pocket
    const s = strokeAt(p.mode, deg);
    let gasColor = s.gas;
    if (p.mode === '2t' && refs.ports) {
      const exOpen = crownY > refs.ports.exTop, trOpen = crownY > refs.ports.trTop;
      refs.ports.ex.setAttribute('opacity', exOpen ? 1 : 0.35);
      refs.ports.tr.setAttribute('opacity', trOpen ? 1 : 0.35);
      gasColor = trOpen ? '#3E6FB7' : exOpen ? '#7A6E60' : (deg < 180 ? '#C2502A' : '#D9C99A');
    }
    L.gas.setAttribute('x', G.xl);
    L.gas.setAttribute('width', G.w);
    L.gas.setAttribute('y', G.headY - 2);
    L.gas.setAttribute('height', Math.max(0, crownY - G.headY + 2));
    L.gas.setAttribute('fill', gasColor);

    // Valves
    if (refs.valves) {
      // Intake opens ~20° before TDC, closes ~40° after BDC; exhaust mirrors it.
      const lift = (openAt, dur) => {
        const ph = ((deg - openAt) % 720 + 720) % 720;
        return ph <= dur ? Math.sin(ph / dur * Math.PI) : 0;
      };
      refs.valves.vin.setAttribute('transform', `translate(0 ${lift(700, 240) * 14})`);
      refs.valves.vex.setAttribute('transform', `translate(0 ${lift(500, 240) * 14})`);
    }

    // Spark
    const sparkWin = p.mode === '2t' ? (deg > 345 || deg < 12) : (deg > 345 && deg < 375);
    let fl = 0;
    if (sparkWin) fl = 1;
    else if (p.mode === '4t' && deg >= 375 && deg < 420) fl = 1 - (deg - 375) / 45;
    else if (p.mode === '2t' && deg >= 12 && deg < 50) fl = 1 - (deg - 12) / 38;
    L.flash.setAttribute('opacity', fl * 0.9);
    return { stroke: s, deg, crownY, spark: sparkWin };
  }

  return { update };
}
