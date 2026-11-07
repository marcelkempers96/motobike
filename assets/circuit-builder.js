/* Motopedia · Circuit Builder.
   Place parts on a grid, wire terminals together and test the circuit. The DC circuit is solved by
   modified nodal analysis: batteries as EMF with internal resistance (Norton form), diodes and LEDs as
   piecewise-linear parts iterated to a consistent on/off state, relays switched by coil current with
   pull-in and drop-out thresholds. Wires are copper: R = rho L / A with rho = 1.68e-8 ohm m.
   Typical part values are examples, labelled as such in the panel. */

const RHO = 1.68e-8;               // copper resistivity, ohm m
const COLS = 14, ROWS = 9, CELL = 50;
const GMIN = 1e-9;                 // tiny leak to the reference so floating nodes stay defined
const R_SWITCH = 0.002, R_CONTACT = 0.003, R_AMMETER = 0.001, R_VMETER = 10e6, R_DMM_A = 0.01;
const R_LED_ON = 12, R_DIODE_ON = 0.03;
const OHM_TEST_I = 1e-3;           // multimeter ohm range test current
const FUSES = [1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30];
const SIZES = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25];
/* Example current ratings for PVC-insulated wire in a loom, same table as the workbench above. */
const AMPACITY = { 0.5: 7, 0.75: 10, 1: 13, 1.5: 16, 2.5: 22, 4: 30, 6: 38, 10: 52, 16: 70, 25: 94 };
const LEDS = { red: [2.0, '#E0312B'], amber: [2.1, '#F29A1F'], green: [2.2, '#2EA44F'], white: [3.1, '#F4F1DE'], blue: [3.1, '#2F6FE0'] };
const STORE = 'mz-circuit-builder-v1';

const TYPES = {
  battery: { label: 'Battery 12 V', pre: 'B', props: { emf: 12.6, rint: 0.02 } },
  fuse: { label: 'Fuse', pre: 'F', props: { rating: 10 } },
  switch: { label: 'Switch', pre: 'S', props: { closed: true } },
  button: { label: 'Push button', pre: 'P', props: {} },
  resistor: { label: 'Resistor', pre: 'R', props: { ohms: 470 } },
  pot: { label: 'Variable resistor', pre: 'VR', props: { max: 2000, pos: 50 } },
  bulb: { label: 'Bulb', pre: 'L', props: { watts: 21, broken: false } },
  led: { label: 'LED', pre: 'LED', props: { colour: 'red', imax: 20 } },
  diode: { label: 'Diode', pre: 'D', props: { vf: 0.7 } },
  relay: { label: 'Relay', pre: 'K', props: { coil: 85, pull: 7.5, drop: 3.5 } },
  horn: { label: 'Horn', pre: 'H', props: { watts: 36 } },
  motor: { label: 'Motor', pre: 'M', props: { watts: 60 } },
  earth: { label: 'Earth point', pre: 'E', props: { ohms: 0.002 } },
  ammeter: { label: 'Ammeter', pre: 'A', props: {} },
  voltmeter: { label: 'Voltmeter', pre: 'V', props: {} },
  meter: { label: 'Multimeter', pre: 'DMM', props: { mode: 'V' } },
};
const PALETTE = ['wire', 'battery', 'fuse', 'switch', 'button', 'resistor', 'pot', 'bulb', 'led', 'diode', 'relay', 'horn', 'motor', 'earth', 'ammeter', 'voltmeter', 'meter'];
const INSTR = ['ammeter', 'voltmeter', 'meter'];

/* ---------------- geometry ---------------- */
const key = (x, y) => x + ',' + y;
const px = (g) => (g + 0.5) * CELL;
function rotv(dx, dy, rot) { for (let i = 0; i < (rot & 3); i++) [dx, dy] = [-dy, dx]; return [dx, dy]; }
function localTerms(type) {
  if (type === 'relay') return [[0, 0], [0, 2], [2, 0], [2, 2]];
  if (type === 'earth') return [[0, 0]];
  return [[0, 0], [2, 0]];
}
function localBody(type) {
  if (type === 'relay') return [[1, 1], [1, 0], [1, 2], [0, 1], [2, 1]];
  if (type === 'earth') return [];
  return [[1, 0]];
}
const termPts = (p) => localTerms(p.type).map(([dx, dy]) => { const [a, b] = rotv(dx, dy, p.rot); return [p.x + a, p.y + b]; });
const bodyPts = (p) => localBody(p.type).map(([dx, dy]) => { const [a, b] = rotv(dx, dy, p.rot); return [p.x + a, p.y + b]; });
const termKeys = (p) => termPts(p).map(([x, y]) => key(x, y));
const inBoard = ([x, y]) => x >= 0 && y >= 0 && x < COLS && y < ROWS;

/* ---------------- formatting ---------------- */
function fmt(v, unit, dig = 3) {
  if (!isFinite(v)) return '–';
  const a = Math.abs(v);
  if (unit === 'Ω') {
    if (a >= 1e6) return (v / 1e6).toPrecision(3) + ' MΩ';
    if (a >= 1e3) return (v / 1e3).toPrecision(3) + ' kΩ';
    if (a < 1) return (v * 1000).toPrecision(3) + ' mΩ';
    return v.toPrecision(3) + ' Ω';
  }
  if (a !== 0 && a < 1 && (unit === 'A' || unit === 'V' || unit === 'W')) {
    if (a < 0.0005) return '0.000 ' + unit;
    return (v * 1000).toPrecision(dig) + ' m' + unit;
  }
  return (a >= 100 ? v.toFixed(0) : a >= 10 ? v.toFixed(1) : v.toFixed(2)) + ' ' + unit;
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const r2 = (v, d = 3) => (isFinite(v) ? +v.toFixed(d) : '');

/* ---------------- part physics helpers ---------------- */
const bulbR = (p) => (12 * 12) / Math.max(0.1, p.props.watts);   // hot resistance from the 12 V rating
const loadR = (p) => (12 * 12) / Math.max(0.1, p.props.watts);
const potR = (p) => Math.max(0.5, p.props.max * p.props.pos / 100);
const wireR = (w) => RHO * w.len / (w.mm2 * 1e-6);
const fuseR = (p) => 0.06 / p.props.rating;                      // a blade fuse is a few milliohms
const ledVf = (p) => (LEDS[p.props.colour] || LEDS.red)[0];

/* ---------------- state ---------------- */
let S = blankState();
function blankState() { return { parts: [], wires: [], seq: 1, power: false, name: 'Blank board' }; }
function newPart(type, x, y, rot = 0, props = {}, name) {
  const p = { id: 'p' + S.seq++, type, x, y, rot, props: { ...TYPES[type].props, ...props }, st: {} };
  p.name = name || nextName(type);
  return p;
}
function nextName(type) {
  const pre = TYPES[type].pre;
  let n = 1;
  while (S.parts.some((p) => p.name === pre + n)) n++;
  return pre + n;
}
function newWire(a, b, len = 0.3, mm2 = 1) { return { id: 'w' + S.seq++, a, b, len, mm2 }; }

/* ---------------- netlist ---------------- */
/* Element kinds: R (conductance g between a and b), SRC (EMF e with conductance g, + at a),
   D (diode a = anode, b = cathode, vf, g when on), CS (current i pushed into a, taken from b). */
function buildNet(opt) {
  const els = [];
  const { power, ohm, fix } = opt;
  for (const p of S.parts) {
    const t = termKeys(p), st = opt.state[p.id] || {};
    const R = (a, b, ohms, role) => els.push({ k: 'R', a, b, g: 1 / ohms, own: p.id, role });
    switch (p.type) {
      case 'battery': if (power) els.push({ k: 'SRC', a: t[0], b: t[1], e: p.props.emf, g: 1 / Math.max(0.001, p.props.rint), own: p.id }); break;
      case 'fuse': if (!p.st.blown) R(t[0], t[1], fuseR(p)); break;
      case 'switch': if (p.props.closed) R(t[0], t[1], R_SWITCH); break;
      case 'button': if (p.st.down) R(t[0], t[1], R_SWITCH); break;
      case 'resistor': R(t[0], t[1], Math.max(0.01, p.props.ohms)); break;
      case 'pot': R(t[0], t[1], potR(p)); break;
      case 'bulb': if (!p.props.broken || fix === p.id) R(t[0], t[1], power ? bulbR(p) : bulbR(p) / 10); break; // cold filament reads about a tenth
      case 'horn': case 'motor': R(t[0], t[1], loadR(p)); break;
      case 'led': if (!p.st.burnt) els.push({ k: 'D', a: t[0], b: t[1], vf: ledVf(p), g: 1 / R_LED_ON, on: !!st.on, own: p.id }); break;
      case 'diode': els.push({ k: 'D', a: t[0], b: t[1], vf: p.props.vf, g: 1 / R_DIODE_ON, on: !!st.on, own: p.id }); break;
      case 'relay':
        R(t[0], t[1], Math.max(1, p.props.coil), 'coil');
        els.push({ k: 'K', a: t[2], b: t[3], g: 1 / R_CONTACT, on: !!st.on, own: p.id, coil: els[els.length - 1], pull: p.props.pull / p.props.coil, drop: p.props.drop / p.props.coil });
        break;
      case 'earth': R(t[0], 'GND', Math.max(0.0005, p.props.ohms)); break;
      case 'ammeter': R(t[0], t[1], R_AMMETER); break;
      case 'voltmeter': R(t[0], t[1], R_VMETER); break;
      case 'meter': {
        const m = p.props.mode;
        if (m === 'A') { if (!p.st.blown) R(t[0], t[1], R_DMM_A); }
        else if (m === 'V') R(t[0], t[1], R_VMETER);
        else if (m === 'O' && ohm === p.id) els.push({ k: 'CS', a: t[0], b: t[1], i: OHM_TEST_I, own: p.id });
        break;
      }
    }
  }
  for (const w of S.wires) els.push({ k: 'R', a: key(...w.a), b: key(...w.b), g: 1 / Math.max(1e-5, wireR(w)), wire: w.id });
  return els;
}

function gauss(A, z) {
  const n = z.length;
  for (let c = 0; c < n; c++) {
    let piv = c, best = Math.abs(A[c][c]);
    for (let r = c + 1; r < n; r++) { const v = Math.abs(A[r][c]); if (v > best) { best = v; piv = r; } }
    if (best < 1e-30) continue;
    if (piv !== c) { [A[c], A[piv]] = [A[piv], A[c]]; [z[c], z[piv]] = [z[piv], z[c]]; }
    const rc = A[c], d = rc[c];
    for (let r = c + 1; r < n; r++) {
      const row = A[r], f = row[c] / d;
      if (f === 0) continue;
      for (let k = c; k < n; k++) row[k] -= f * rc[k];
      z[r] -= f * z[c];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = z[r];
    for (let k = r + 1; k < n; k++) s -= A[r][k] * x[k];
    x[r] = Math.abs(A[r][r]) < 1e-30 ? 0 : s / A[r][r];
  }
  return x;
}

/* Solve one netlist. Returns node voltages (relative to the reference) and the element list with
   currents filled in. Nonlinear parts are iterated until their assumed states agree with the result. */
function solveNet(els, refHint) {
  const nodes = new Set();
  els.forEach((e) => { nodes.add(e.a); nodes.add(e.b); });
  let ref = nodes.has('GND') ? 'GND' : (refHint && nodes.has(refHint) ? refHint : nodes.values().next().value);
  const idx = new Map(); let n = 0;
  nodes.forEach((k) => { if (k !== ref) idx.set(k, n++); });
  let V = {}, chatter = false, it = 0;
  for (it = 0; it < 60; it++) {
    const A = Array.from({ length: n }, () => new Float64Array(n)), z = new Float64Array(n);
    const G = (a, b, g) => {
      const i = idx.get(a), j = idx.get(b);
      if (i !== undefined) A[i][i] += g;
      if (j !== undefined) A[j][j] += g;
      if (i !== undefined && j !== undefined) { A[i][j] -= g; A[j][i] -= g; }
    };
    const I = (a, b, cur) => { const i = idx.get(a), j = idx.get(b); if (i !== undefined) z[i] += cur; if (j !== undefined) z[j] -= cur; };
    for (let i = 0; i < n; i++) A[i][i] += GMIN;
    for (const e of els) {
      if (e.k === 'R') G(e.a, e.b, e.g);
      else if (e.k === 'SRC') { G(e.a, e.b, e.g); I(e.a, e.b, e.g * e.e); }
      else if (e.k === 'D') { if (e.on) { G(e.a, e.b, e.g); I(e.a, e.b, e.g * e.vf); } else G(e.a, e.b, GMIN); }
      else if (e.k === 'K') { if (e.on) G(e.a, e.b, e.g); }
      else if (e.k === 'CS') I(e.a, e.b, e.i);
    }
    const x = gauss(A.map((r) => Array.from(r)), Array.from(z));
    V = { [ref]: 0 };
    idx.forEach((i, k) => { V[k] = x[i]; });
    let changed = false;
    for (const e of els) {
      const vab = V[e.a] - V[e.b];
      if (e.k === 'D') {
        const cur = e.on ? (vab - e.vf) * e.g : vab * GMIN;
        if (e.on && cur < 0) { e.on = false; changed = true; }
        else if (!e.on && vab > e.vf + 1e-9) { e.on = true; changed = true; }
      } else if (e.k === 'K') {
        const ic = Math.abs((V[e.coil.a] - V[e.coil.b]) * e.coil.g);
        const want = e.on ? ic >= e.drop : ic >= e.pull;
        if (want !== e.on) { e.on = want; changed = true; }
      }
    }
    if (!changed) break;
  }
  if (it >= 60) chatter = true;
  for (const e of els) {
    const vab = V[e.a] - V[e.b];
    e.v = vab;
    if (e.k === 'R') e.i = vab * e.g;
    else if (e.k === 'SRC') e.i = (e.e - vab) * e.g;           // current out of the + terminal into the circuit
    else if (e.k === 'D') e.i = e.on ? (vab - e.vf) * e.g : vab * GMIN;
    else if (e.k === 'K') e.i = e.on ? vab * e.g : 0;
    else if (e.k === 'CS') e.i = e.i;
  }
  return { V, els, ref, chatter };
}

/* Full solve: the powered circuit, plus a separate dead-circuit solve for each multimeter on ohms. */
let SIM = null;
const memState = {};   // diode and relay states carried between solves (relay hysteresis)
function simulate() {
  const power = S.power;
  const els = buildNet({ power, state: memState });
  const firstBat = S.parts.find((p) => p.type === 'battery');
  const refHint = firstBat ? termKeys(firstBat)[1] : null;
  const out = els.length ? solveNet(els, refHint) : { V: {}, els: [], ref: null, chatter: false };
  const res = {}, wires = {};
  for (const p of S.parts) res[p.id] = { I: 0, V: 0, P: 0 };
  for (const e of out.els) {
    if (e.wire) { wires[e.wire] = { I: e.i, V: e.v, P: e.i * e.v, R: 1 / e.g }; continue; }
    const r = res[e.own];
    if (!r) continue;
    if (e.k === 'D' || e.k === 'K') memState[e.own] = { on: e.on };
    if (e.role === 'coil') { r.Ic = e.i; r.Vc = e.v; r.P += e.i * e.v; continue; }
    if (e.k === 'K') { r.Ik = e.i; r.Vk = e.v; r.on = e.on; r.P += e.i * e.v; continue; }
    if (e.k === 'SRC') { r.I = e.i; r.V = e.v; r.P = e.i * e.v; r.loss = e.i * e.i / e.g; continue; }
    r.I = e.i; r.V = e.v; r.P = e.i * e.v;
    if (e.k === 'D') r.on = e.on;
  }
  // parts with no element (open switch, blown fuse, broken bulb): voltage across their terminals
  for (const p of S.parts) {
    const t = termKeys(p), r = res[p.id];
    const va = out.V[t[0]], vb = out.V[t[1]];
    if (p.type === 'relay') { r.Vk = (out.V[t[2]] || 0) - (out.V[t[3]] || 0); r.on = !!(memState[p.id] && memState[p.id].on) && power; }
    if (p.type !== 'earth' && p.type !== 'relay' && t[1] && !els.some((e) => e.own === p.id)) r.V = (va || 0) - (vb || 0);
    if (p.type === 'earth') { r.V = va || 0; }
  }
  if (!power) for (const p of S.parts) if (p.type === 'relay') { memState[p.id] = { on: false }; res[p.id].on = false; }
  // ohm readings, battery treated as disconnected
  const ohm = {};
  for (const p of S.parts) {
    if (p.type !== 'meter' || p.props.mode !== 'O') continue;
    ohm[p.id] = power ? null : ohmReading(p.id);
  }
  SIM = { ...out, res, wires, ohm, power };
  return SIM;
}
function ohmReading(meterId, fix) {
  const st = {};
  const els = buildNet({ power: false, ohm: meterId, fix, state: st });
  const m = S.parts.find((p) => p.id === meterId);
  const [a, b] = termKeys(m);
  if (a === b) return 0;
  const sol = solveNet(els, b);
  const r = ((sol.V[a] || 0) - (sol.V[b] || 0)) / OHM_TEST_I;
  return r;
}
const OL = 40e6;
function instrReading(p) {
  const r = SIM && SIM.res[p.id];
  if (!r) return { txt: '–', val: NaN, unit: '' };
  if (p.type === 'ammeter') return { txt: fmt(r.I, 'A'), val: r.I, unit: 'A' };
  if (p.type === 'voltmeter') return { txt: fmt(r.V, 'V'), val: r.V, unit: 'V' };
  const m = p.props.mode;
  if (m === 'A') return p.st.blown ? { txt: 'fuse blown', val: NaN, unit: 'A' } : { txt: fmt(r.I, 'A'), val: r.I, unit: 'A' };
  if (m === 'V') return { txt: fmt(r.V, 'V'), val: r.V, unit: 'V' };
  const o = SIM.ohm[p.id];
  if (o === null || o === undefined) return { txt: 'power on', val: NaN, unit: 'Ω' };
  if (o > OL || o < -1) return { txt: 'OL', val: Infinity, unit: 'Ω' };
  return { txt: fmt(Math.max(0, o), 'Ω'), val: Math.max(0, o), unit: 'Ω' };
}
const bright = (p, r) => (p.props.broken || !SIM.power ? 0 : Math.pow(Math.max(0, Math.abs(r.V)) / 12, 3.4)); // tungsten light output, roughly V^3.4

/* ---------------- time step: fuses, LED burn-out ---------------- */
let EVENT = null;
function setEvent(text, kind = 'warn') { EVENT = { text, kind, t: performance.now() }; }
function step(dt) {
  if (!SIM || !S.power) return false;
  let dirty = false;
  for (const p of S.parts) {
    const r = SIM.res[p.id];
    if (!r) continue;
    const fuseLike = (p.type === 'fuse' && !p.st.blown) ? p.props.rating : (p.type === 'meter' && p.props.mode === 'A' && !p.st.blown) ? 10 : 0;
    if (fuseLike) {
      // simplified time-current curve: holds 110 % indefinitely, about 0.3 s at twice the rating, near instant on a short
      const k = Math.abs(r.I) / fuseLike;
      if (k > 1.1) p.st.heat = (p.st.heat || 0) + dt * (k * k - 1);
      else p.st.heat = Math.max(0, (p.st.heat || 0) - dt * 0.3);
      if (p.st.heat >= 1) {
        p.st.blown = true; p.st.heat = 0; p.st.blewAt = Math.abs(r.I); dirty = true;
        setEvent(p.type === 'fuse' ? `Fuse ${p.name} (${p.props.rating} A) blew at ${fmt(Math.abs(r.I), 'A')}. Find the cause, then replace it in the part panel.` : `The 10 A fuse inside ${p.name} blew: ${fmt(Math.abs(r.I), 'A')} through the meter. On the amps range a meter must go in series, never across a supply.`);
      }
    }
    if (p.type === 'led' && !p.st.burnt) {
      const lim = 3 * p.props.imax / 1000;
      if (Math.abs(r.I) > lim) p.st.burn = (p.st.burn || 0) + dt * Math.abs(r.I) / lim;
      if ((p.st.burn || 0) > 0.25) { p.st.burnt = true; dirty = true; setEvent(`${p.name} burnt out: ${(Math.abs(r.I) * 1000).toFixed(0)} mA is far above its ${p.props.imax} mA rating. An LED needs a series resistor to set its current.`); }
    }
  }
  return dirty;
}

/* ---------------- presets ---------------- */
function P(type, x, y, rot, props, name) { const p = newPart(type, x, y, rot, props, name); S.parts.push(p); return p; }
function W(x1, y1, x2, y2, len, mm2) { S.wires.push(newWire([x1, y1], [x2, y2], len, mm2)); }
function feed(fuse = 10) { P('battery', 1, 3, 1, {}, 'B1'); P('earth', 1, 5, 0, {}, 'E1'); W(1, 3, 1, 1); W(1, 1, 2, 1); P('fuse', 2, 1, 0, { rating: fuse }, 'F1'); }
const PRESETS = {
  blank: ['Blank board', () => { P('battery', 1, 3, 1, {}, 'B1'); P('earth', 1, 5, 0, {}, 'E1'); }],
  bulb: ['One 21 W bulb', () => {
    feed(3); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1);
    P('bulb', 9, 1, 1, { watts: 21 }, 'L1'); P('earth', 9, 3, 0, {}, 'E2');
  }],
  'parallel-bulbs': ['Two 21 W bulbs in parallel', () => {
    feed(5); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1); W(9, 1, 11, 1);
    P('bulb', 9, 1, 1, { watts: 21 }, 'L1'); P('earth', 9, 3, 0, {}, 'E2');
    P('bulb', 11, 1, 1, { watts: 21 }, 'L2'); P('earth', 11, 3, 0, {}, 'E3');
  }],
  'series-bulbs': ['Two 21 W bulbs in series', () => {
    feed(5); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1);
    P('bulb', 9, 1, 1, { watts: 21 }, 'L1'); P('bulb', 9, 3, 1, { watts: 21 }, 'L2'); P('earth', 9, 5, 0, {}, 'E2');
    P('voltmeter', 11, 3, 1, {}, 'V1'); W(9, 3, 11, 3); W(9, 5, 11, 5);
  }],
  lights: ['Headlight and tail light', () => {
    feed(3); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1); W(9, 1, 11, 1);
    P('bulb', 9, 1, 1, { watts: 55 }, 'L1'); P('earth', 9, 3, 0, {}, 'E2');
    P('bulb', 11, 1, 1, { watts: 5 }, 'L2'); P('earth', 11, 3, 0, {}, 'E3');
  }],
  led: ['LED with a variable resistor', () => {
    P('battery', 1, 3, 1, {}, 'B1'); P('earth', 1, 5, 0, {}, 'E1'); W(1, 3, 1, 1); W(1, 1, 2, 1);
    P('switch', 2, 1, 0, {}, 'S1'); P('pot', 4, 1, 0, { max: 2000, pos: 50 }, 'VR1'); P('ammeter', 6, 1, 0, {}, 'A1'); W(8, 1, 9, 1);
    P('led', 9, 1, 1, { colour: 'red' }, 'LED1'); P('earth', 9, 3, 0, {}, 'E2');
  }],
  'led-bare': ['LED with no resistor', () => {
    P('battery', 1, 3, 1, {}, 'B1'); P('earth', 1, 5, 0, {}, 'E1'); W(1, 3, 1, 1); W(1, 1, 2, 1);
    P('switch', 2, 1, 0, { closed: false }, 'S1'); W(4, 1, 6, 1); P('led', 6, 1, 1, { colour: 'red' }, 'LED1'); P('earth', 6, 3, 0, {}, 'E2');
    P('led', 9, 1, 1, { colour: 'red' }, 'LED2'); P('resistor', 9, 3, 1, { ohms: 560 }, 'R1'); P('earth', 9, 5, 0, {}, 'E3'); W(6, 1, 9, 1);
  }],
  'relay-parts': ['Relay and horn, not yet wired', () => {
    feed(15); P('button', 3, 6, 0, {}, 'P1'); P('relay', 6, 3, 0, {}, 'K1');
    P('horn', 10, 4, 0, { watts: 36 }, 'H1'); P('earth', 12, 6, 0, {}, 'E2'); P('earth', 6, 7, 0, {}, 'E3');
  }],
  'relay-horn': ['Relay drives the horn', () => {
    feed(15); W(4, 1, 8, 1); W(8, 1, 8, 3);
    P('button', 4, 1, 1, {}, 'P1'); P('ammeter', 4, 3, 0, {}, 'A2');
    P('relay', 6, 3, 0, {}, 'K1'); P('earth', 6, 5, 0, {}, 'E2');
    P('ammeter', 8, 5, 0, {}, 'A1'); P('horn', 10, 5, 0, { watts: 36 }, 'H1'); P('earth', 12, 5, 0, {}, 'E3');
  }],
  'bad-earth': ['Headlight with a corroded earth', () => {
    feed(15); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1);
    P('bulb', 9, 1, 1, { watts: 55 }, 'L1'); P('earth', 9, 3, 0, { ohms: 0.5 }, 'E2');
  }],
  'long-wire': ['Headlight on a long thin wire', () => {
    feed(15); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 10, 1, 3, 0.5);
    P('bulb', 10, 1, 1, { watts: 55 }, 'L1'); P('earth', 10, 3, 0, {}, 'E2');
  }],
  'open-bulb': ['Three lamps, one does not light', () => {
    feed(10); W(4, 1, 6, 1); W(6, 1, 9, 1); W(9, 1, 12, 1);
    [6, 9, 12].forEach((x, i) => { P('switch', x, 1, 1, {}, 'S' + (i + 1)); P('bulb', x, 3, 1, { watts: 21, broken: i === 1, secret: i === 1 }, 'L' + (i + 1)); P('earth', x, 5, 0, {}, 'E' + (i + 2)); });
    P('meter', 2, 7, 0, { mode: 'O' }, 'DMM1');
  }],
  short: ['Short circuit after the fuse', () => {
    feed(10); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1);
    P('bulb', 9, 1, 1, { watts: 21 }, 'L1'); P('earth', 9, 3, 0, {}, 'E2');
    W(7, 1, 7, 2); P('switch', 7, 2, 1, { closed: false }, 'S2'); P('earth', 7, 4, 0, {}, 'E3');
  }],
  diode: ['Diode: one way only', () => {
    feed(5); P('switch', 5, 1, 0, {}, 'S1'); W(4, 1, 5, 1); W(7, 1, 9, 1); W(9, 1, 11, 1);
    P('diode', 9, 1, 1, {}, 'D1'); P('bulb', 9, 3, 1, { watts: 5 }, 'L1'); P('earth', 9, 5, 0, {}, 'E2');
    P('diode', 11, 3, 3, {}, 'D2'); P('bulb', 11, 3, 1, { watts: 5 }, 'L2'); P('earth', 11, 5, 0, {}, 'E3');
  }],
  'battery-load': ['Battery under load', () => {
    P('battery', 1, 3, 1, {}, 'B1'); P('earth', 1, 5, 0, {}, 'E1'); P('voltmeter', 3, 3, 1, {}, 'V1'); W(1, 3, 3, 3); W(1, 5, 3, 5);
    W(1, 3, 1, 1); W(1, 1, 4, 1); P('ammeter', 4, 1, 0, {}, 'A1'); P('switch', 6, 1, 0, { closed: false }, 'S1'); W(8, 1, 9, 1); W(9, 1, 11, 1);
    P('bulb', 9, 1, 1, { watts: 55 }, 'L1'); P('earth', 9, 3, 0, {}, 'E2'); P('horn', 11, 1, 1, { watts: 36 }, 'H1'); P('earth', 11, 3, 0, {}, 'E3');
  }],
  drain: ['Parasitic drain test', () => {
    P('battery', 1, 1, 1, {}, 'B1'); P('ammeter', 1, 5, 3, {}, 'A1'); P('earth', 1, 5, 0, {}, 'E1');
    W(1, 1, 2, 1); P('fuse', 2, 1, 0, { rating: 10 }, 'F1'); W(4, 1, 6, 1); W(6, 1, 10, 1);
    P('switch', 6, 1, 1, { closed: false }, 'S1'); P('bulb', 6, 3, 1, { watts: 55 }, 'L1'); P('earth', 6, 5, 0, {}, 'E2');
    P('resistor', 10, 1, 1, { ohms: 1200 }, 'R1'); P('earth', 10, 3, 0, {}, 'E3');
  }],
};

function loadPreset(name, keepPower) {
  const pr = PRESETS[name];
  if (!pr) return false;
  const power = keepPower ? S.power : false;
  S = blankState();
  for (const k in memState) delete memState[k];
  pr[1]();
  S.name = pr[0]; S.preset = name; S.power = power;
  sel = null; pending = null; armed = null; EVENT = null;
  return true;
}

/* ---------------- challenges ---------------- */
const bulbsOf = (w) => S.parts.filter((p) => p.type === 'bulb' && (w === undefined || p.props.watts === w));
const readersOf = (unit) => S.parts.filter((p) => (unit === 'V' ? p.type === 'voltmeter' : p.type === 'ammeter') || (p.type === 'meter' && p.props.mode === unit));
const ok = (b) => !!b;
const MEM = {};
const CHALLENGES = [
  { id: 'parallel21', title: 'Two 21 W bulbs in parallel on one fuse', start: 'bulb',
    goal: 'Light two 21 W bulbs in parallel from one fuse without blowing it. Both bulbs must get close to full battery voltage.',
    hint: 'Add a second bulb from the switch output to its own earth point. Each 21 W bulb takes about 21 / 12 = 1.75 A, so the fuse carries about 3.5 A. A 3 A fuse will blow; pick the next size up.',
    check() {
      const bs = bulbsOf(21).map((p) => [p, SIM.res[p.id]]).filter(([p, r]) => !p.props.broken && Math.abs(r.V) >= 11);
      const sum = bs.slice(0, 2).reduce((a, [, r]) => a + Math.abs(r.I), 0);
      const fuses = S.parts.filter((p) => p.type === 'fuse' && !p.st.blown);
      const f = fuses.find((p) => Math.abs(SIM.res[p.id].I) >= 0.95 * sum && sum > 0);
      const anyBlown = S.parts.some((p) => p.type === 'fuse' && p.st.blown);
      return { pass: SIM.power && bs.length >= 2 && !!f && !anyBlown, ind: [
        ['21 W bulbs at 11 V or more', bs.length + ' of 2', bs.length >= 2],
        ['Total bulb current', fmt(sum, 'A'), sum > 3],
        ['Fuse carrying both bulbs', f ? `${f.name}, ${fmt(Math.abs(SIM.res[f.id].I), 'A')} on ${f.props.rating} A` : 'none', !!f],
        ['Fuses intact', anyBlown ? 'a fuse has blown' : 'yes', !anyBlown]] };
    } },
  { id: 'led15', title: 'Set an LED to 15 mA', start: 'led',
    goal: 'Find the series resistance that sets a red LED to 15 mA (14 to 16 mA) without burning it out.',
    hint: 'R = (supply voltage minus LED forward voltage) / current. With 12.6 V and a 2.0 V red LED: 10.6 / 0.015 ≈ 700 Ω, a little less because the LED has its own small resistance. Move the variable resistor slider or fit a fixed resistor.',
    check() {
      const leds = S.parts.filter((p) => p.type === 'led');
      const l = leds.find((p) => !p.st.burnt && SIM.res[p.id].on) || leds[0];
      const i = l ? Math.abs(SIM.res[l.id].I) : 0;
      const rs = S.parts.filter((p) => (p.type === 'resistor' || p.type === 'pot') && Math.abs(Math.abs(SIM.res[p.id].I) - i) < 0.001 && i > 0.001);
      const rv = rs.length ? (rs[0].type === 'pot' ? potR(rs[0]) : rs[0].props.ohms) : NaN;
      const inRange = i >= 0.014 && i <= 0.016;
      return { pass: SIM.power && !!l && !l.st.burnt && inRange && rs.length > 0, ind: [
        ['LED current', fmt(i, 'A'), inRange],
        ['Series resistor', rs.length ? `${rs[0].name}, ${fmt(rv, 'Ω')}` : 'none in series', rs.length > 0],
        ['LED condition', !l ? 'no LED' : l.st.burnt ? 'burnt out' : 'OK', !!l && !l.st.burnt]] };
    } },
  { id: 'relayhorn', title: 'A small switch drives the horn through a relay', start: 'relay-parts',
    goal: 'Wire the relay so the push button carries only the small coil current while the relay contact carries the horn current. Hold the button to test.',
    hint: 'Coil: fused feed, through the button, to 85; 86 to earth. Contact: fused feed to 30; 87 to the horn; the other horn terminal to earth. Hold the button (press and hold on the drawing or in the part panel).',
    check() {
      const k = S.parts.find((p) => p.type === 'relay' && SIM.res[p.id].on);
      const h = S.parts.find((p) => p.type === 'horn') || null;
      const hr = h ? SIM.res[h.id] : null;
      const hornOK = hr && Math.abs(hr.I) >= 0.8 * h.props.watts / 12;
      const viaK = k && hr && Math.abs(SIM.res[k.id].Ik) >= 0.9 * Math.abs(hr.I);
      const sws = S.parts.filter((p) => (p.type === 'switch' && p.props.closed) || (p.type === 'button' && p.st.down));
      const swI = sws.reduce((m, p) => Math.max(m, Math.abs(SIM.res[p.id].I)), 0);
      const swOK = sws.length > 0 && swI >= 0.05 && swI < 0.5;
      return { pass: SIM.power && !!k && hornOK && viaK && swOK, ind: [
        ['Relay', k ? `${k.name} pulled in, coil ${fmt(Math.abs(SIM.res[k.id].Ic), 'A')}` : 'not energised', !!k],
        ['Horn current', hr ? fmt(Math.abs(hr.I), 'A') : 'no horn', !!hornOK],
        ['Horn current through the relay contact', viaK ? 'yes' : 'no', !!viaK],
        ['Current in the switch or button', sws.length ? fmt(swI, 'A') : 'none closed', swOK]] };
    } },
  { id: 'earthdrop', title: 'Measure the drop across a bad earth', start: 'bad-earth',
    goal: 'With the headlight on, use a voltmeter to measure the voltage lost across the corroded earth E2.',
    hint: 'Place a voltmeter. Wire one lead to the lamp side of E2 (the lamp\'s lower terminal) and the other to a clean earth point or to the battery negative. A good earth shows under 0.1 V; this one shows much more.',
    check() {
      const es = S.parts.filter((p) => p.type === 'earth' && p.props.ohms >= 0.1 && Math.abs(SIM.res[p.id].I) >= 0.5);
      const drops = es.map((p) => Math.abs(SIM.res[p.id].I) * p.props.ohms);
      const vs = readersOf('V').map((p) => Math.abs(SIM.res[p.id].V));
      const hit = vs.find((v) => drops.some((d) => Math.abs(v - d) <= Math.max(0.05, 0.15 * d)));
      return { pass: SIM.power && hit !== undefined && hit >= 0.3, ind: [
        ['Corroded earth carrying current', es.length ? `${es[0].name}, ${fmt(Math.abs(SIM.res[es[0].id].I), 'A')}` : 'none', es.length > 0],
        ['Drop across it (I × R)', drops.length ? fmt(drops[0], 'V') : '–', drops.length > 0],
        ['Voltmeter reading', vs.length ? vs.map((v) => fmt(v, 'V')).join(', ') : 'no voltmeter', hit !== undefined]] };
    } },
  { id: 'dimclean', title: 'Why cleaning the earth brightens a dim headlight', start: 'bad-earth',
    goal: 'Show a headlight dim (under 70 % light output) on a corroded earth, then clean that earth (select it and pick Clean) and see it reach over 90 %.',
    hint: 'The corroded earth is in series with the lamp. Lamp current makes a voltage across it (V = I × R), which the lamp no longer gets. Light output of a filament falls roughly with voltage to the power 3.4, so a small loss of voltage dims it a lot.',
    check() {
      const m = MEM.dimclean || (MEM.dimclean = {});
      const bad = S.parts.some((p) => p.type === 'earth' && p.props.ohms >= 0.3 && Math.abs(SIM.res[p.id].I) >= 0.5);
      const allClean = !S.parts.some((p) => p.type === 'earth' && p.props.ohms > 0.05 && Math.abs(SIM.res[p.id].I) > 0.1);
      if (SIM.power) for (const b of bulbsOf()) {
        const br = bright(b, SIM.res[b.id]);
        if (bad && br < 0.7 && br > 0.05) { m.dim = { id: b.id, br }; m.bright = null; }
        if (m.dim && m.dim.id === b.id && allClean && br >= 0.9) m.bright = br;
      }
      return { pass: !!(m.dim && m.bright), ind: [
        ['Light output on the corroded earth', m.dim ? Math.round(m.dim.br * 100) + ' %' : 'not seen yet', !!m.dim],
        ['Light output after cleaning', m.bright ? Math.round(m.bright * 100) + ' %' : 'not seen yet', !!m.bright]] };
    } },
  { id: 'fusesize', title: 'Pick the fuse for the lighting circuit', start: 'lights',
    goal: 'Light the 55 W headlight and the 5 W tail light from one fuse rated between 1.25 and 2 times the normal current, with the fuse intact.',
    hint: 'Current = power / voltage: 60 W / 12 V ≈ 5 A. A 3 A fuse blows at once; a 5 A fuse is too close to the running current. Choose a rating about 25 % to 100 % above the current. Replace the blown fuse in its panel.',
    check() {
      const h = bulbsOf(55).find((p) => Math.abs(SIM.res[p.id].V) >= 11), t = bulbsOf(5).find((p) => Math.abs(SIM.res[p.id].V) >= 11);
      const sum = (h ? Math.abs(SIM.res[h.id].I) : 0) + (t ? Math.abs(SIM.res[t.id].I) : 0);
      const f = S.parts.find((p) => p.type === 'fuse' && !p.st.blown && sum > 0 && Math.abs(SIM.res[p.id].I) >= 0.95 * sum);
      const ratio = f ? f.props.rating / Math.abs(SIM.res[f.id].I) : NaN;
      const good = ratio >= 1.25 && ratio <= 2;
      return { pass: SIM.power && !!h && !!t && !!f && good, ind: [
        ['Headlight and tail light lit', `${h ? 'head yes' : 'head no'}, ${t ? 'tail yes' : 'tail no'}`, !!h && !!t],
        ['Circuit current', fmt(sum, 'A'), sum > 0],
        ['Fuse rating / current', f ? `${f.props.rating} A / ${fmt(Math.abs(SIM.res[f.id].I), 'A')} = ${ratio.toFixed(2)}` : 'no intact fuse in the feed', good]] };
    } },
  { id: 'ohmcheck', title: 'Find the open filament with the ohm meter', start: 'open-bulb',
    goal: 'One of the three lamps does not light. With the power off, use the multimeter on ohms to prove which filament is open (reads OL).',
    hint: 'Press Stop first: an ohm meter must never see a live circuit. Wire the meter leads across one bulb. Open that bulb\'s switch so the meter does not read the other lamps through the feed. A good cold 21 W filament reads under 1 Ω; an open one reads OL.',
    check() {
      const broken = bulbsOf().filter((b) => b.props.broken);
      const meters = S.parts.filter((p) => p.type === 'meter' && p.props.mode === 'O');
      let found = null, rd = '–';
      if (!SIM.power) for (const m of meters) {
        const r = SIM.ohm[m.id];
        rd = r > OL ? 'OL' : fmt(Math.max(0, r), 'Ω');
        for (const b of broken) if (r > OL && ohmReading(m.id, b.id) < 50) found = b;
      }
      return { pass: !SIM.power && !!found, ind: [
        ['Power off (dead circuit)', SIM.power ? 'no, press Stop' : 'yes', !SIM.power],
        ['Multimeter on Ω', meters.length ? rd : 'set a multimeter to Ω', meters.length > 0],
        ['Open filament found', found ? found.name : 'not yet', !!found]] };
    } },
  { id: 'wiredrop', title: 'Voltage drop along a long thin wire', start: 'long-wire',
    goal: 'Measure the voltage lost along the 3 m, 0.5 mm² feed wire with a voltmeter while the headlight is on.',
    hint: 'Put a voltmeter with one lead on each end of the long wire (the switch output and the lamp input). The reading equals the wire current times its resistance: R = 1.68e-8 × 3 / 0.5e-6 ≈ 0.10 Ω.',
    check() {
      const ws = S.wires.filter((w) => SIM.wires[w.id] && Math.abs(SIM.wires[w.id].I) >= 1 && Math.abs(SIM.wires[w.id].V) >= 0.2);
      const vs = readersOf('V').map((p) => Math.abs(SIM.res[p.id].V));
      let hit;
      for (const w of ws) { const d = Math.abs(SIM.wires[w.id].V); const v = vs.find((x) => Math.abs(x - d) <= Math.max(0.02, 0.15 * d)); if (v !== undefined) hit = [w, v, d]; }
      const w0 = ws[0];
      return { pass: SIM.power && !!hit, ind: [
        ['Wire with a drop over 0.2 V', w0 ? `${w0.len} m of ${w0.mm2} mm², ${fmt(wireR(w0), 'Ω')}, ${fmt(Math.abs(SIM.wires[w0.id].I), 'A')}` : 'none', !!w0],
        ['Drop along it (I × R)', w0 ? fmt(Math.abs(SIM.wires[w0.id].V), 'V') : '–', !!w0],
        ['Voltmeter reading', vs.length ? vs.map((v) => fmt(v, 'V')).join(', ') : 'no voltmeter', !!hit]] };
    } },
  { id: 'series21', title: 'Two bulbs in series share the voltage', start: 'bulb',
    goal: 'Wire two 21 W bulbs in series and measure the voltage across one of them with a voltmeter.',
    hint: 'Series means one path: battery, fuse, switch, bulb 1, bulb 2, earth. The same current flows in both, and each identical bulb gets half the battery voltage. Both glow dimly: a quarter of the power each.',
    check() {
      const bs = bulbsOf(21).filter((p) => !p.props.broken).map((p) => [p, SIM.res[p.id]]);
      let pair = null;
      for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
        const [a, ra] = bs[i], [b, rb] = bs[j], ia = Math.abs(ra.I), ib = Math.abs(rb.I);
        if (ia > 0.5 && Math.abs(ia - ib) / ia < 0.02 && Math.abs(ra.V) > 4.5 && Math.abs(ra.V) < 7.5 && Math.abs(rb.V) > 4.5 && Math.abs(rb.V) < 7.5) pair = [a, b, ra, rb];
      }
      const vs = readersOf('V').map((p) => Math.abs(SIM.res[p.id].V));
      const hit = pair && vs.find((v) => Math.abs(v - Math.abs(pair[2].V)) < 0.15 || Math.abs(v - Math.abs(pair[3].V)) < 0.15);
      return { pass: SIM.power && !!pair && hit !== undefined && hit !== null, ind: [
        ['Two 21 W bulbs in series', pair ? `${pair[0].name} and ${pair[1].name}, ${fmt(Math.abs(pair[2].I), 'A')} each` : 'not found', !!pair],
        ['Voltage across each', pair ? `${fmt(Math.abs(pair[2].V), 'V')} and ${fmt(Math.abs(pair[3].V), 'V')}` : '–', !!pair],
        ['Voltmeter reading', vs.length ? vs.map((v) => fmt(v, 'V')).join(', ') : 'no voltmeter', hit !== undefined && hit !== null]] };
    } },
  { id: 'ammeter21', title: 'Measure a bulb current with the ammeter', start: 'bulb',
    goal: 'Put an ammeter in series with a lit 21 W bulb and read its current. Expect about 21 / 12 = 1.75 A.',
    hint: 'An ammeter goes in the path of the current, so break the circuit and let the meter close the gap, for example between the switch and the bulb. Wired across a part or the battery it is nearly a dead short.',
    check() {
      const b = bulbsOf(21).find((p) => Math.abs(SIM.res[p.id].V) >= 10);
      const bi = b ? Math.abs(SIM.res[b.id].I) : 0;
      const as = readersOf('A').map((p) => Math.abs(SIM.res[p.id].I));
      const hit = b && as.find((a) => Math.abs(a - bi) <= 0.03 * bi);
      return { pass: SIM.power && !!b && hit !== undefined && hit !== null, ind: [
        ['21 W bulb lit', b ? `${b.name}, ${fmt(bi, 'A')}` : 'no', !!b],
        ['Ammeter reading', as.length ? as.map((a) => fmt(a, 'A')).join(', ') : 'no ammeter', hit !== undefined && hit !== null]] };
    } },
];

/* ---------------- persistence ---------------- */
let LOG = [], PASSED = {}, ACTIVE = null;
function save() {
  try {
    localStorage.setItem(STORE, JSON.stringify({
      v: 1, circuit: { parts: S.parts.map(({ id, type, x, y, rot, props, name, st }) => ({ id, type, x, y, rot, props, name, st: { blown: st.blown, burnt: st.burnt } })), wires: S.wires, seq: S.seq, name: S.name, preset: S.preset },
      log: LOG, passed: PASSED, active: ACTIVE,
    }));
  } catch (e) { /* storage unavailable */ }
}
function restore() {
  try {
    const d = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (!d || d.v !== 1) return false;
    LOG = Array.isArray(d.log) ? d.log : [];
    PASSED = d.passed || {};
    ACTIVE = d.active || null;
    if (d.circuit && Array.isArray(d.circuit.parts)) {
      S = blankState();
      S.parts = d.circuit.parts.filter((p) => TYPES[p.type]).map((p) => ({ ...p, props: { ...TYPES[p.type].props, ...p.props }, st: p.st || {} }));
      S.wires = (d.circuit.wires || []).filter((w) => Array.isArray(w.a) && Array.isArray(w.b));
      S.seq = d.circuit.seq || 1000; S.name = d.circuit.name || 'Saved circuit'; S.preset = d.circuit.preset;
      return true;
    }
  } catch (e) { /* ignore broken storage */ }
  return false;
}

/* ---------------- drawing ---------------- */
const ICON_BOX = { relay: '-22 -12 144 124', earth: '-22 -6 44 36' };
function sym(p, live) {
  const r = live || {};
  const T = (x, y, s, cls = 'cb-tx') => `<text x="${x}" y="${y}" class="${cls}" transform="rotate(${-p.rot * 90} ${x} ${y})">${s}</text>`;
  const L = (x1, x2) => `<line x1="${x1}" y1="0" x2="${x2}" y2="0" class="cb-lead"/>`;
  const hit = '<rect x="6" y="-22" width="88" height="44" class="cb-hit"/>';
  switch (p.type) {
    case 'battery': return hit + L(0, 44) + '<line x1="44" y1="-18" x2="44" y2="18" class="cb-plate"/><line x1="56" y1="-10" x2="56" y2="10" class="cb-plate cb-thick"/>' + L(56, 100) + T(30, -9, '+', 'cb-tx cb-pol') + T(70, -9, '−', 'cb-tx cb-pol');
    case 'fuse': return hit + L(0, 30) + `<rect x="30" y="-8" width="40" height="16" class="cb-box${p.st.blown ? ' cb-blown' : ''}"/>` + (p.st.blown ? '<path d="M30,0 L46,0 L50,-5 M54,5 L54,0 L70,0" class="cb-lead"/>' : '<line x1="30" y1="0" x2="70" y2="0" class="cb-lead"/>') + L(70, 100);
    case 'switch': return hit + L(0, 30) + L(70, 100) + `<path d="${p.props.closed ? 'M30,0 L67,0' : 'M30,0 L64,-22'}" class="cb-blade${p.props.closed ? ' is-closed' : ''}"/><circle cx="30" cy="0" r="4" class="cb-pin"/><circle cx="70" cy="0" r="4" class="cb-pin"/>`;
    case 'button': { const d = p.st.down; return hit + L(0, 30) + L(70, 100) + `<path d="${d ? 'M26,-4 L74,-4 M50,-4 L50,-18 M42,-18 L58,-18' : 'M26,-14 L74,-14 M50,-14 L50,-28 M42,-28 L58,-28'}" class="cb-blade${d ? ' is-closed' : ''}"/><circle cx="30" cy="0" r="4" class="cb-pin"/><circle cx="70" cy="0" r="4" class="cb-pin"/>`; }
    case 'resistor': return hit + L(0, 28) + '<rect x="28" y="-9" width="44" height="18" class="cb-box"/>' + L(72, 100);
    case 'pot': return hit + L(0, 28) + '<rect x="28" y="-9" width="44" height="18" class="cb-box"/><path d="M34,15 L66,-15 M66,-15 l-9,2 M66,-15 l-2,9" class="cb-arrow"/>' + L(72, 100);
    case 'bulb': {
      const b = r.br || 0, f = b > 0.01 ? `rgba(255,${Math.round(190 + 50 * Math.min(1, b))},${Math.round(60 + 80 * Math.min(1, b))},${(0.15 + 0.85 * Math.min(1, b)).toFixed(2)})` : 'var(--cb-paper)';
      return hit + (b > 0.05 ? `<circle cx="50" cy="0" r="${(17 + 14 * Math.min(1.2, b)).toFixed(1)}" class="cb-halo" style="opacity:${Math.min(0.7, b * 0.6).toFixed(2)}"/>` : '') + L(0, 34) + L(66, 100) + `<circle cx="50" cy="0" r="16" class="cb-lamp" style="fill:${f}"/>` + (p.props.broken && !p.props.secret ? '<path d="M39,-11 L47,-3 M53,3 L61,11 M39,11 L61,-11" class="cb-lead"/>' : '<path d="M39,-11 L61,11 M39,11 L61,-11" class="cb-lead"/>');
    }
    case 'led': case 'diode': {
      const col = p.type === 'led' ? (LEDS[p.props.colour] || LEDS.red)[1] : null, on = r.on && SIM && SIM.power;
      const lit = p.type === 'led' && on && !p.st.burnt ? Math.min(1, Math.abs(r.I) / (p.props.imax / 1000)) : 0;
      return hit + (lit > 0.05 ? `<circle cx="50" cy="0" r="${(14 + 12 * lit).toFixed(1)}" style="fill:${col};opacity:${(0.25 * lit + 0.1).toFixed(2)}"/>` : '') + L(0, 39) + L(61, 100) + `<path d="M39,-12 L39,12 L61,0 Z" class="cb-tri" style="${lit > 0.05 ? `fill:${col}` : ''}"/><line x1="61" y1="-12" x2="61" y2="12" class="cb-plate"/>` +
        (p.type === 'led' ? '<path d="M50,-16 L58,-26 M54,-26 L58,-26 L58,-22 M58,-12 L66,-22 M62,-22 L66,-22 L66,-18" class="cb-arrow"/>' : '') + (p.st.burnt ? '<path d="M36,-16 L64,16 M36,16 L64,-16" class="cb-burnt"/>' : '');
    }
    case 'horn': return hit + L(0, 34) + L(66, 100) + `<path d="M34,-8 L44,-8 L64,-20 L64,20 L44,8 L34,8 Z" class="cb-box${r.on ? ' cb-buzz' : ''}"/>`;
    case 'motor': return hit + L(0, 34) + L(66, 100) + `<g${r.spin ? ` class="cb-spin" style="animation-duration:${r.spin}s"` : ''}><circle cx="50" cy="0" r="16" class="cb-box"/><path d="M50,-16 L50,-9 M50,16 L50,9" class="cb-lead"/></g>` + T(50, 5, 'M', 'cb-tx cb-sym');
    case 'ammeter': case 'voltmeter': return hit + L(0, 34) + L(66, 100) + '<circle cx="50" cy="0" r="16" class="cb-meter"/>' + T(50, 5, p.type === 'ammeter' ? 'A' : 'V', 'cb-tx cb-sym') + T(18, -9, '+', 'cb-tx cb-pol');
    case 'meter': return hit + L(0, 32) + L(68, 100) + `<rect x="32" y="-18" width="36" height="36" rx="4" class="cb-meter${p.st.blown ? ' cb-blown' : ''}"/>` + T(50, 5, p.props.mode === 'O' ? 'Ω' : p.props.mode, 'cb-tx cb-sym') + T(18, -9, '+', 'cb-tx cb-pol');
    case 'earth': {
      const bad = p.props.ohms > 0.05;
      return '<rect x="-16" y="2" width="32" height="28" class="cb-hit"/><line x1="0" y1="0" x2="0" y2="14" class="cb-lead"/>' + `<path d="M-12,14 L12,14 M-8,19 L8,19 M-4,24 L4,24" class="cb-lead${bad ? ' cb-corr' : ''}"/>` + (bad ? '<circle cx="0" cy="14" r="9" class="cb-rust"/>' : '');
    }
    case 'relay': {
      const on = r.on && SIM && SIM.power;
      return '<rect x="-16" y="6" width="132" height="88" class="cb-hit"/><rect x="-16" y="6" width="132" height="88" class="cb-relaybox"/>' +
        '<line x1="0" y1="0" x2="0" y2="30" class="cb-lead"/><rect x="-10" y="30" width="20" height="40" class="cb-box' + (on ? ' cb-energised' : '') + '"/><line x1="0" y1="70" x2="0" y2="100" class="cb-lead"/>' +
        '<line x1="100" y1="0" x2="100" y2="30" class="cb-lead"/><line x1="100" y1="70" x2="100" y2="100" class="cb-lead"/>' +
        `<path d="${on ? 'M100,30 L100,68' : 'M100,30 L84,64'}" class="cb-blade${on ? ' is-closed' : ''}"/><circle cx="100" cy="30" r="4" class="cb-pin"/><circle cx="100" cy="70" r="4" class="cb-pin"/>` +
        '<line x1="10" y1="50" x2="88" y2="50" class="cb-link"/>' + T(-6, 12, '85', 'cb-tx cb-tn cb-end') + T(-6, 96, '86', 'cb-tx cb-tn cb-end') + T(106, 12, '30', 'cb-tx cb-tn') + T(106, 96, '87', 'cb-tx cb-tn');
    }
  }
  return '';
}
function wirePath(w) {
  const [x1, y1] = w.a, [x2, y2] = w.b;
  const pts = [[px(x1), px(y1)]];
  if (x1 !== x2 && y1 !== y2) pts.push([px(x2), px(y1)]);
  pts.push([px(x2), px(y2)]);
  return pts;
}
const ptsD = (pts) => 'M' + pts.map((p) => p.join(',')).join(' L');

/* ---------------- UI ---------------- */
let root, svg, sel = null, pending = null, armed = null, drag = null, hoverPt = null;
const $ = (s, r = root) => r.querySelector(s);
const $$ = (s, r = root) => Array.from(r.querySelectorAll(s));

function iconSVG(type) {
  if (type === 'wire') return '<svg viewBox="-6 -30 112 60" aria-hidden="true"><path d="M0,10 L50,10 L50,-10 L100,-10" class="cb-wireicon"/><circle cx="0" cy="10" r="6" class="cb-pin"/><circle cx="100" cy="-10" r="6" class="cb-pin"/></svg>';
  const p = { type, rot: 0, props: { ...TYPES[type].props }, st: {} };
  return `<svg viewBox="${ICON_BOX[type] || '-6 -30 112 60'}" aria-hidden="true">${sym(p, {})}</svg>`;
}

function shell() {
  root.innerHTML = `
  <div class="cb-bar">
    <button type="button" class="cb-btn cb-power" data-act="power" aria-pressed="false">Test: connect battery</button>
    <button type="button" class="cb-btn" data-act="note">Note reading</button>
    <label class="cb-sel">Circuit <select data-act="preset" aria-label="Load a preset circuit"><option value="">Load a preset…</option>${Object.entries(PRESETS).map(([k, v]) => `<option value="${k}">${v[0]}</option>`).join('')}</select></label>
    <span class="cb-gap"></span>
    <button type="button" class="cb-btn" data-act="rotate" disabled>Rotate</button>
    <button type="button" class="cb-btn" data-act="delete" disabled>Delete</button>
    <button type="button" class="cb-btn" data-act="clear">Clear board</button>
  </div>
  <div class="cb-main">
    <div class="cb-palette" role="toolbar" aria-label="Parts">${PALETTE.map((t) => `<button type="button" data-pal="${t}" aria-pressed="false" title="${t === 'wire' ? 'Wire' : TYPES[t].label}">${iconSVG(t)}<span>${t === 'wire' ? 'Wire' : TYPES[t].label}</span></button>`).join('')}</div>
    <div class="cb-stage">
      <div class="cb-boardwrap"><div class="cb-board">
        <svg viewBox="0 0 ${COLS * CELL} ${ROWS * CELL}" role="application" aria-label="Breadboard: place parts and wire their terminals">
          <g class="cb-grid">${Array.from({ length: COLS * ROWS }, (_, i) => `<circle cx="${px(i % COLS)}" cy="${px(Math.floor(i / COLS))}" r="1.6"/>`).join('')}</g>
          <g class="cb-wires"></g><g class="cb-parts"></g><g class="cb-dots"></g><g class="cb-labels"></g><g class="cb-terms"></g><g class="cb-ghost"></g>
        </svg>
        <div class="cb-tip" hidden></div>
      </div></div>
      <p class="cb-swipe">Swipe sideways on the board background to see all of it.</p>
      <p class="cb-status" aria-live="polite"></p>
      <p class="cb-help"></p>
    </div>
    <aside class="cb-side" aria-label="Selected part"><div class="cb-props"></div><div class="cb-live"></div></aside>
  </div>
  <div class="cb-lower">
    <section class="cb-chal" aria-labelledby="cb-chal-h"><h3 id="cb-chal-h">Challenges <small class="cb-score"></small></h3><ol class="cb-chal-list"></ol><div class="cb-chal-card"></div></section>
    <section class="cb-log" aria-labelledby="cb-log-h"><h3 id="cb-log-h">Readings log</h3>
      <p class="cb-note-row"><input type="text" class="cb-note" placeholder="Note for the next reading, for example: earth corroded" aria-label="Note for the next reading" maxlength="80"></p>
      <div class="cb-log-wrap"></div>
      <div class="cb-btnrow"><button type="button" class="cb-btn" data-act="csv">Export CSV</button><button type="button" class="cb-btn" data-act="clearlog">Clear log</button></div>
    </section>
  </div>`;
  svg = $('.cb-board svg');
}

function render() {
  const live = SIM || { res: {}, wires: {} };
  // wires
  $('.cb-wires', svg).innerHTML = S.wires.map((w) => {
    const r = live.wires[w.id], i = r ? Math.abs(r.I) : 0, amp = AMPACITY[w.mm2] || 10;
    const cls = !S.power || i < 5e-4 ? '' : i > amp ? ' is-over' : i > 0.75 * amp ? ' is-warm' : ' is-live';
    const d = ptsD(wirePath(w));
    return `<g data-wire="${w.id}" class="cb-wire${cls}${sel === w.id ? ' is-sel' : ''}"><path d="${d}" class="cb-whit"/><path d="${d}" class="cb-wline" style="stroke-width:${(2 + Math.sqrt(w.mm2) * 1.4).toFixed(1)}"/></g>`;
  }).join('');
  // parts
  $('.cb-parts', svg).innerHTML = S.parts.map((p) => {
    const r = live.res[p.id] || {};
    const extra = { on: r.on };
    if (p.type === 'bulb') extra.br = SIM ? bright(p, r) : 0;
    if (p.type === 'horn') extra.on = S.power && Math.abs(r.I) > 0.4 * p.props.watts / 12;
    if (p.type === 'motor') { const f = Math.abs(r.V) / 12; extra.spin = S.power && f > 0.15 ? (0.6 / f).toFixed(2) : 0; }
    return `<g data-part="${p.id}" class="cb-part cb-${p.type}${sel === p.id ? ' is-sel' : ''}" transform="translate(${px(p.x)},${px(p.y)}) rotate(${p.rot * 90})">${sym(p, extra)}</g>`;
  }).join('');
  // labels
  $('.cb-labels', svg).innerHTML = S.parts.map((p) => {
    const t = termPts(p), r = live.res[p.id] || {};
    let cx, cy, anchor = 'middle';
    if (p.type === 'earth') { cx = px(t[0][0]) + 15; cy = px(t[0][1]) + 26; anchor = 'start'; }
    else if (p.type === 'relay') { cx = (px(t[0][0]) + px(t[3][0])) / 2; cy = (px(t[0][1]) + px(t[3][1])) / 2 + 4; }
    else {
      const horiz = t[0][1] === t[1][1];
      cx = (px(t[0][0]) + px(t[1][0])) / 2; cy = (px(t[0][1]) + px(t[1][1])) / 2;
      if (horiz) cy -= 25; else { cx += 23; cy += 4; anchor = 'start'; }
    }
    let txt = esc(p.name), cls = 'cb-lab';
    if (INSTR.includes(p.type)) { txt = `${esc(p.name)} <tspan class="cb-read">${esc(instrReading(p).txt)}</tspan>`; cls += ' is-instr'; }
    else if (S.power && SIM && ['bulb', 'led', 'horn', 'motor', 'resistor', 'pot'].includes(p.type) && Math.abs(r.I) > 5e-4) txt += ` <tspan class="cb-sub">${fmt(Math.abs(r.I), 'A')}</tspan>`;
    else if (p.type === 'fuse' && p.st.blown) txt += ' <tspan class="cb-sub is-bad">blown</tspan>';
    else if (p.type === 'led' && p.st.burnt) txt += ' <tspan class="cb-sub is-bad">burnt</tspan>';
    return `<text x="${cx}" y="${cy}" text-anchor="${anchor}" class="${cls}">${txt}</text>`;
  }).join('');
  // terminals
  const pts = new Map();
  S.parts.forEach((p) => termPts(p).forEach((q) => pts.set(key(...q), q)));
  S.wires.forEach((w) => { pts.set(key(...w.a), w.a); pts.set(key(...w.b), w.b); });
  $('.cb-terms', svg).innerHTML = [...pts.values()].map(([x, y]) => `<g class="cb-term${pending && pending[0] === x && pending[1] === y ? ' is-pend' : ''}" data-pt="${x},${y}"><circle cx="${px(x)}" cy="${px(y)}" r="16" class="cb-thit"/><circle cx="${px(x)}" cy="${px(y)}" r="4.5" class="cb-tdot"/></g>`).join('');
  buildDots();
  $('[data-act="rotate"]').disabled = !(sel && sel[0] === 'p');
  $('[data-act="delete"]').disabled = !sel;
  const pw = $('[data-act="power"]');
  pw.textContent = S.power ? 'Stop: disconnect battery' : 'Test: connect battery';
  pw.setAttribute('aria-pressed', String(S.power));
  pw.classList.toggle('is-on', S.power);
  root.classList.toggle('is-live', S.power);
  $$('[data-pal]').forEach((b) => b.setAttribute('aria-pressed', String(armed === b.dataset.pal)));
  status();
  renderLive();
  renderChallenge();
}

/* current dots */
let DOTS = [];
function buildDots() {
  const g = $('.cb-dots', svg);
  DOTS = [];
  let h = '';
  if (S.power && SIM) for (const w of S.wires) {
    const r = SIM.wires[w.id];
    if (!r || Math.abs(r.I) < 5e-4) continue;
    const pts = wirePath(w);
    let L = 0; const seg = [];
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
    if (L < 1) continue;
    const n = Math.max(1, Math.round(L / 18));
    const speed = 16 * Math.log10(1 + Math.abs(r.I) / 1e-3) * Math.sign(r.I);   // px/s, grows with log of current
    const d = { pts, seg, L, n, speed, ph: (DOTS.length * 7) % 18, els: [] };
    for (let i = 0; i < n; i++) h += `<circle r="3" class="cb-dot" data-d="${DOTS.length}"/>`;
    DOTS.push(d);
  }
  g.innerHTML = h;
  const cs = Array.from(g.children); let c = 0;
  DOTS.forEach((d) => { for (let i = 0; i < d.n; i++) d.els.push(cs[c++]); });
  moveDots(0);
}
const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
function moveDots(dt) {
  for (const d of DOTS) {
    if (!REDUCED) d.ph = ((d.ph + d.speed * dt) % d.L + d.L) % d.L;
    const gap = d.L / d.n;
    d.els.forEach((el, i) => {
      let s = (d.ph + i * gap) % d.L, k = 0;
      while (k < d.seg.length - 1 && s > d.seg[k]) { s -= d.seg[k]; k++; }
      const a = d.pts[k], b = d.pts[k + 1], f = d.seg[k] ? s / d.seg[k] : 0;
      el.setAttribute('cx', (a[0] + (b[0] - a[0]) * f).toFixed(1));
      el.setAttribute('cy', (a[1] + (b[1] - a[1]) * f).toFixed(1));
    });
  }
}

/* status line */
function status() {
  const el = $('.cb-status');
  let m = '', k = '';
  const bats = S.parts.filter((p) => p.type === 'battery');
  if (EVENT && performance.now() - EVENT.t < 6000) { m = EVENT.text; k = EVENT.kind; }
  else if (!bats.length) m = 'Place a battery to power the circuit.';
  else if (!S.power) m = 'Battery disconnected: the circuit is dead. Press Test to connect it. With the power off, a multimeter on Ω can check resistance and continuity.';
  else {
    const br = SIM.res[bats[0].id], I = Math.abs(br.I);
    const maxI = bats[0].props.emf / Math.max(0.001, bats[0].props.rint);
    const loads = S.parts.some((p) => ['bulb', 'led', 'horn', 'motor', 'resistor', 'pot', 'relay'].includes(p.type));
    const hotW = S.wires.find((w) => SIM.wires[w.id] && Math.abs(SIM.wires[w.id].I) > (AMPACITY[w.mm2] || 10));
    const ledHigh = S.parts.find((p) => p.type === 'led' && !p.st.burnt && Math.abs(SIM.res[p.id].I) > 1.2 * p.props.imax / 1000);
    const openSw = S.parts.filter((p) => (p.type === 'switch' && !p.props.closed) || (p.type === 'button' && !p.st.down));
    const ledRev = S.parts.find((p) => p.type === 'led' && SIM.res[p.id].V < -5);
    if (I > 30 || I > 0.4 * maxI) { m = `Short circuit: ${fmt(I, 'A')} from ${bats[0].name}, terminal voltage down to ${fmt(br.V, 'V')}. Wires and battery overheat; a fuse close to the battery is what protects the loom.`; k = 'warn'; }
    else if (hotW) { m = `A ${hotW.mm2} mm² wire carries ${fmt(Math.abs(SIM.wires[hotW.id].I), 'A')}, above the example rating of ${AMPACITY[hotW.mm2]} A for that size. It will overheat: use a thicker wire.`; k = 'warn'; }
    else if (ledHigh) { m = `${ledHigh.name} carries ${(Math.abs(SIM.res[ledHigh.id].I) * 1000).toFixed(0)} mA, above its ${ledHigh.props.imax} mA rating. It will burn out without more series resistance.`; k = 'warn'; }
    else if (ledRev) { m = `${ledRev.name} sees ${fmt(-SIM.res[ledRev.id].V, 'V')} in reverse. Most LEDs are rated for only about 5 V reverse: fit a diode or turn it round.`; k = 'warn'; }
    else if (!loads && I < 5e-4) m = 'Battery connected. Add a load (bulb, horn, LED, resistor) and wire it from + back to an earth or the − terminal.';
    else if (I < 5e-4 && openSw.length) { m = `No current: ${openSw.map((p) => p.name).join(', ')} ${openSw.length > 1 ? 'are' : 'is'} open. Close a switch or hold a push button to complete the circuit.`; }
    else if (I < 5e-4 && loads) { m = 'Open circuit: no complete path from the battery + terminal back to its − terminal. Check switches, fuses, wires and earth points. Hover a terminal to read its voltage.'; k = 'warn'; }
    else if (SIM.chatter) { m = 'The relay chatters: when it pulls in, the voltage at its coil falls below the drop-out value, it releases, and the cycle repeats.'; k = 'warn'; }
    else { const P = S.parts.filter((p) => p.type === 'battery').reduce((a, p) => a + SIM.res[p.id].P, 0); m = `Working: ${bats[0].name} delivers ${fmt(I, 'A')} at ${fmt(br.V, 'V')} terminal voltage, ${fmt(P, 'W')} in total. Hover a terminal or wire for its voltage.`; k = 'ok'; }
  }
  if (el.textContent !== m) el.textContent = m;
  el.className = 'cb-status' + (k ? ' is-' + k : '');
  const help = armed === 'wire' ? 'Wire: tap a terminal or grid point, then tap where the wire should end. Tap the same point again to stop.'
    : armed ? `Tap a free spot on the board to place the ${TYPES[armed].label.toLowerCase()}. Press Esc or tap the palette button again to stop.`
    : pending ? 'Now tap the terminal or grid point where the wire should end. Tap the start point again to cancel.'
    : 'Pick a part, then tap the board to place it. Tap one terminal, then another, to wire them. Drag a part to move it; tap it to edit. Switches toggle when tapped; hold a push button.';
  $('.cb-help').textContent = help;
}

/* side panel: selected part or overview */
function propsPanel() {
  const box = $('.cb-props');
  if (!sel) {
    box.innerHTML = `<p class="cb-eyebrow">${esc(S.name || 'Circuit')}</p><h3>All parts</h3><p class="cb-small">Tap a part or wire to edit it. Values in the table update while the circuit runs.</p>`;
    return;
  }
  if (sel[0] === 'w') {
    const w = S.wires.find((x) => x.id === sel);
    if (!w) { sel = null; return propsPanel(); }
    box.innerHTML = `<p class="cb-eyebrow">Wire</p><h3>Copper wire</h3>
      <label class="cb-f">Length <output>${w.len} m</output><input type="range" min="0.05" max="5" step="0.05" value="${w.len}" data-w="len"></label>
      <label class="cb-f">Cross-section <select data-w="mm2">${SIZES.map((s) => `<option value="${s}"${s === w.mm2 ? ' selected' : ''}>${s} mm²</option>`).join('')}</select></label>
      <p class="cb-small">R = ρ L / A = 1.68e-8 × ${w.len} / (${w.mm2} × 10⁻⁶) = <b data-wr>${fmt(wireR(w), 'Ω')}</b>. Example rating for this size: ${AMPACITY[w.mm2]} A.</p>
      <div class="cb-btnrow"><button type="button" class="cb-btn" data-act="delete">Delete wire</button></div>`;
    return;
  }
  const p = S.parts.find((x) => x.id === sel);
  if (!p) { sel = null; return propsPanel(); }
  const f = [];
  const num = (k, lab, min, max, step, unit) => f.push(`<label class="cb-f">${lab} <output>${p.props[k]} ${unit}</output><input type="range" min="${min}" max="${max}" step="${step}" value="${p.props[k]}" data-p="${k}"></label>`);
  const pick = (k, lab, opts, unit = '') => f.push(`<label class="cb-f">${lab} <select data-p="${k}">${opts.map((o) => `<option value="${Array.isArray(o) ? o[0] : o}"${String(Array.isArray(o) ? o[0] : o) === String(p.props[k]) ? ' selected' : ''}>${Array.isArray(o) ? o[1] : o + unit}</option>`).join('')}</select></label>`);
  let note = '';
  switch (p.type) {
    case 'battery': num('emf', 'EMF (open-circuit voltage)', 0, 15, 0.1, 'V'); f.push(`<label class="cb-f">Internal resistance <output>${(p.props.rint * 1000).toFixed(0)} mΩ</output><input type="range" min="1" max="500" step="1" value="${Math.round(p.props.rint * 1000)}" data-p="rint" data-scale="0.001"></label>`);
      note = 'Terminal voltage = EMF − I × internal resistance. Examples: about 12.7 V charged, 12.2 V half charged, 14.2 V with the engine charging. A healthy small bike battery is a few tens of milliohms; a worn or very cold one can be several times that.'; break;
    case 'fuse': pick('rating', 'Rating', FUSES, ' A'); if (p.st.blown) f.push(`<p class="cb-warn">Blown at ${fmt(p.st.blewAt || 0, 'A')}.</p><div class="cb-btnrow"><button type="button" class="cb-btn" data-act="refuse">Fit a new fuse</button></div>`);
      note = 'Simplified fuse model: carries 110 % of its rating indefinitely, blows in under a second at twice the rating and at once on a short.'; break;
    case 'switch': f.push(`<div class="cb-btnrow"><button type="button" class="cb-btn" data-act="toggle">${p.props.closed ? 'Open the switch' : 'Close the switch'}</button></div>`); break;
    case 'button': f.push('<div class="cb-btnrow"><button type="button" class="cb-btn cb-hold" data-act="hold">Hold to press</button></div>'); note = 'Momentary: closed only while held. You can also press and hold it on the board.'; break;
    case 'resistor': f.push(`<label class="cb-f">Resistance (Ω) <input type="number" min="0.1" max="1000000" step="any" value="${p.props.ohms}" data-p="ohms" inputmode="decimal"></label><div class="cb-chips">${[10, 47, 100, 220, 470, 560, 680, 820, 1000, 2200, 4700, 10000].map((v) => `<button type="button" class="cb-chip" data-ohms="${v}">${v >= 1000 ? v / 1000 + 'k' : v}</button>`).join('')}</div>`); break;
    case 'pot': f.push(`<label class="cb-f">Maximum (Ω) <input type="number" min="10" max="1000000" step="any" value="${p.props.max}" data-p="max" inputmode="decimal"></label>`); num('pos', 'Slider position', 0, 100, 1, '%'); f.push(`<p class="cb-small">Resistance now: <b data-potr>${fmt(potR(p), 'Ω')}</b></p>`); break;
    case 'bulb': pick('watts', 'Rated power at 12 V', [1.2, 3, 5, 10, 21, 35, 55, 60], ' W'); if (!p.props.secret) f.push(`<label class="cb-f cb-check"><input type="checkbox" data-p="broken"${p.props.broken ? ' checked' : ''}> Broken filament (fault)</label>`);
      note = `Hot resistance R = V² / P = 144 / ${p.props.watts} = ${fmt(bulbR(p), 'Ω')}. Cold, a tungsten filament reads about a tenth of that on an ohm meter.`; break;
    case 'led': pick('colour', 'Colour (typical forward voltage)', Object.entries(LEDS).map(([k, v]) => [k, `${k}, ${v[0]} V`])); num('imax', 'Rated current', 5, 50, 1, 'mA');
      if (p.st.burnt) f.push('<p class="cb-warn">Burnt out: open circuit.</p><div class="cb-btnrow"><button type="button" class="cb-btn" data-act="reled">Fit a new LED</button></div>');
      note = 'Long leg (anode) on the left terminal before rotating. Modelled as its forward voltage plus about 12 Ω.'; break;
    case 'diode': num('vf', 'Forward voltage', 0.2, 1.2, 0.05, 'V'); note = 'Conducts from anode (left, triangle) to cathode (bar). Modelled as the forward voltage plus 30 mΩ.'; break;
    case 'relay': num('coil', 'Coil resistance', 40, 400, 5, 'Ω'); num('pull', 'Pull-in voltage', 3, 10, 0.5, 'V'); num('drop', 'Drop-out voltage', 1, 8, 0.5, 'V');
      note = `Pulls in at ${(p.props.pull / p.props.coil * 1000).toFixed(0)} mA coil current, drops out below ${(p.props.drop / p.props.coil * 1000).toFixed(0)} mA. 85 and 86: coil. 30 and 87: normally open contact. Example values for a small 12 V relay.`; break;
    case 'horn': case 'motor': pick('watts', 'Rated power at 12 V', p.type === 'horn' ? [12, 24, 36, 48, 60] : [6, 12, 24, 60, 120], ' W'); note = `Modelled as a resistance: 144 / ${p.props.watts} = ${fmt(loadR(p), 'Ω')}. A real motor draws far more while stalled or starting.`; break;
    case 'earth': f.push(`<label class="cb-f">Contact resistance <output>${fmt(p.props.ohms, 'Ω')}</output><input type="range" min="0" max="100" step="1" value="${earthSlider(p.props.ohms)}" data-earth></label><div class="cb-chips"><button type="button" class="cb-chip" data-eo="0.002">Clean</button><button type="button" class="cb-chip" data-eo="0.1">Slightly corroded</button><button type="button" class="cb-chip" data-eo="0.5">Corroded</button><button type="button" class="cb-chip" data-eo="2">Badly corroded</button></div>`);
      note = 'All earth points connect through the frame (chassis). The contact resistance is in series with whatever earths here.'; break;
    case 'ammeter': note = 'Goes in series: the current must pass through it. Internal resistance 1 mΩ. + lead on the left.'; break;
    case 'voltmeter': note = 'Goes across a part or between two points. Internal resistance 10 MΩ, so it draws almost no current. + lead on the left.'; break;
    case 'meter': pick('mode', 'Range', [['V', 'Volts DC'], ['A', 'Amps DC (10 A fuse)'], ['O', 'Ohms (dead circuit only)']]);
      if (p.st.blown) f.push('<p class="cb-warn">Internal 10 A fuse blown.</p><div class="cb-btnrow"><button type="button" class="cb-btn" data-act="refuse">Replace the meter fuse</button></div>');
      note = 'On ohms the meter pushes a 1 mA test current and shows V / I. It needs the battery disconnected, and the part isolated from parallel paths.'; break;
  }
  box.innerHTML = `<p class="cb-eyebrow">${TYPES[p.type].label}</p><h3><input class="cb-name" value="${esc(p.name)}" aria-label="Part name" maxlength="8"></h3>${f.join('')}${note ? `<p class="cb-small">${note}</p>` : ''}
    <div class="cb-btnrow"><button type="button" class="cb-btn" data-act="rotate">Rotate</button><button type="button" class="cb-btn" data-act="delete">Delete</button></div>`;
}
const EARTH_MIN = 0.001, EARTH_MAX = 3;
const earthSlider = (o) => Math.round(Math.log(Math.max(EARTH_MIN, o) / EARTH_MIN) / Math.log(EARTH_MAX / EARTH_MIN) * 100);
const earthOhms = (s) => +(EARTH_MIN * Math.pow(EARTH_MAX / EARTH_MIN, s / 100)).toPrecision(2);

function renderLive() {
  const box = $('.cb-live');
  if (!SIM) { box.innerHTML = ''; return; }
  const row = (p) => {
    const r = SIM.res[p.id];
    let I = r.I, V = r.V, Pw = r.P, extra = '';
    if (p.type === 'relay') { I = r.Ic || 0; V = r.Vc || 0; extra = r.on ? 'pulled in' : 'released'; }
    if (p.type === 'bulb') extra = Math.round(bright(p, r) * 100) + ' % light';
    if (p.type === 'led') extra = p.st.burnt ? 'burnt' : r.on && S.power ? 'on' : 'off';
    if (p.type === 'earth') { V = r.V; extra = fmt(p.props.ohms, 'Ω'); }
    if (INSTR.includes(p.type)) return `<tr><th>${esc(p.name)}</th><td colspan="3"><b>${esc(instrReading(p).txt)}</b></td></tr>`;
    return `<tr><th>${esc(p.name)}</th><td>${fmt(Math.abs(I), 'A')}</td><td>${fmt(V, 'V')}</td><td>${p.type === 'battery' ? fmt(Pw, 'W') + ' out' : fmt(Math.abs(Pw), 'W')}${extra ? `<small>${extra}</small>` : ''}</td></tr>`;
  };
  if (sel && sel[0] === 'p') {
    const p = S.parts.find((x) => x.id === sel);
    if (!p) { box.innerHTML = ''; return; }
    const r = SIM.res[p.id], t = termKeys(p);
    const nv = t.map((k, i) => `${localName(p, i)}: ${S.power && SIM.V[k] !== undefined ? fmt(SIM.V[k], 'V') : '–'}`).join(' · ');
    let lines = '';
    if (p.type === 'relay') lines = `<tr><th>Coil</th><td>${fmt(Math.abs(r.Ic || 0), 'A')}</td><td>${fmt(r.Vc || 0, 'V')}</td></tr><tr><th>Contact</th><td>${fmt(Math.abs(r.Ik || 0), 'A')}</td><td>${fmt(r.Vk || 0, 'V')}</td></tr><tr><th>State</th><td colspan="2">${r.on ? 'pulled in' : 'released'}</td></tr>`;
    else if (INSTR.includes(p.type)) lines = `<tr><th>Reading</th><td colspan="2"><b>${esc(instrReading(p).txt)}</b></td></tr>`;
    else {
      lines = `<tr><th>Current</th><td colspan="2">${fmt(Math.abs(r.I), 'A')}</td></tr><tr><th>Voltage across</th><td colspan="2">${p.type === 'earth' ? fmt(r.V, 'V') + ' to frame' : fmt(r.V, 'V')}</td></tr><tr><th>${p.type === 'battery' ? 'Power out' : 'Power'}</th><td colspan="2">${fmt(Math.abs(r.P), 'W')}</td></tr>`;
      if (p.type === 'battery') lines += `<tr><th>Lost inside</th><td colspan="2">${fmt(r.loss || 0, 'W')}</td></tr>`;
      if (p.type === 'bulb') lines += `<tr><th>Light output</th><td colspan="2">${Math.round(bright(p, r) * 100)} % of rated</td></tr>`;
    }
    box.innerHTML = `<table class="cb-tab">${lines}</table><p class="cb-small">Node voltages: ${nv}</p>`;
    return;
  }
  box.innerHTML = S.parts.length ? `<table class="cb-tab cb-all"><thead><tr><th>Part</th><th>I</th><th>V</th><th>P</th></tr></thead><tbody>${S.parts.filter((p) => p.type !== 'earth' || Math.abs(SIM.res[p.id].I) > 1e-3).map(row).join('')}</tbody></table>` : '';
}
function localName(p, i) {
  if (p.type === 'relay') return ['85', '86', '30', '87'][i];
  if (p.type === 'battery') return ['+', '−'][i];
  if (p.type === 'led' || p.type === 'diode') return ['anode', 'cathode'][i];
  if (INSTR.includes(p.type)) return ['+', 'COM'][i];
  if (p.type === 'earth') return 'terminal';
  return ['a', 'b'][i];
}

/* challenges */
function renderChallengeList() {
  $('.cb-chal-list').innerHTML = CHALLENGES.map((c, i) => `<li><button type="button" data-chal="${c.id}" class="${ACTIVE === c.id ? 'is-on' : ''}${PASSED[c.id] ? ' is-done' : ''}"><b>${i + 1}</b><span>${esc(c.title)}</span>${PASSED[c.id] ? '<i>Passed</i>' : ''}</button></li>`).join('');
  $('.cb-score').textContent = `${Object.keys(PASSED).filter((k) => CHALLENGES.some((c) => c.id === k)).length} of ${CHALLENGES.length} passed`;
}
let chalKey = '';
function renderChallenge() {
  const box = $('.cb-chal-card');
  const c = CHALLENGES.find((x) => x.id === ACTIVE);
  if (!c) { if (chalKey !== 'none') { box.innerHTML = '<p class="cb-small">Pick a challenge. Each one checks the circuit live and shows the measured values against the target.</p>'; chalKey = 'none'; } return; }
  let r;
  try { r = SIM ? c.check() : { pass: false, ind: [] }; } catch (e) { r = { pass: false, ind: [] }; }
  if (r.pass && !PASSED[c.id]) { PASSED[c.id] = new Date().toISOString(); save(); renderChallengeList(); }
  const h = `<div class="cb-card${r.pass ? ' is-pass' : ''}"><p class="cb-eyebrow">Challenge ${CHALLENGES.indexOf(c) + 1}</p><h4>${esc(c.title)}</h4><p>${esc(c.goal)}</p>
    <table class="cb-tab cb-ind">${r.ind.map(([l, v, g]) => `<tr class="${g ? 'is-ok' : 'is-no'}"><th>${esc(l)}</th><td>${esc(v)}</td><td aria-label="${g ? 'met' : 'not met'}">${g ? '✓' : '✗'}</td></tr>`).join('')}</table>
    <p class="cb-verdict ${r.pass ? 'is-pass' : 'is-fail'}">${r.pass ? 'Pass: target met with the values above.' : PASSED[c.id] ? 'Not met right now (passed before).' : 'Not met yet.'}</p>
    <details class="cb-hint"><summary>Hint</summary><p>${esc(c.hint)}</p></details>
    <div class="cb-btnrow"><button type="button" class="cb-btn" data-act="chalstart">Load the start circuit</button></div></div>`;
  if (h !== chalKey) { const open = box.querySelector('details[open]'); box.innerHTML = h; if (open) box.querySelector('details').open = true; chalKey = h; }
}

/* readings log */
function noteReading() {
  if (!SIM) simulate();
  const vals = {};
  S.parts.filter((p) => INSTR.includes(p.type)).forEach((p) => { const r = instrReading(p); vals[`${p.name} (${r.unit})`] = isFinite(r.val) ? r2(r.val, 4) : r.txt; });
  S.parts.filter((p) => p.type === 'battery').forEach((p) => { vals[`${p.name} terminal (V)`] = S.power ? r2(SIM.res[p.id].V, 3) : 'off'; vals[`${p.name} current (A)`] = S.power ? r2(SIM.res[p.id].I, 4) : 'off'; });
  const state = [S.power ? 'power on' : 'power off'];
  S.parts.forEach((p) => {
    if (p.type === 'fuse' && p.st.blown) state.push(p.name + ' blown');
    if (p.type === 'switch') state.push(p.name + (p.props.closed ? ' closed' : ' open'));
    if (p.type === 'button' && p.st.down) state.push(p.name + ' pressed');
    if (p.type === 'relay' && SIM.res[p.id].on) state.push(p.name + ' pulled in');
    if (p.type === 'earth' && p.props.ohms > 0.05) state.push(`${p.name} ${fmt(p.props.ohms, 'Ω')}`);
    if (p.type === 'led' && p.st.burnt) state.push(p.name + ' burnt');
    if (p.type === 'bulb' && S.power) state.push(`${p.name} ${Math.round(bright(p, SIM.res[p.id]) * 100)} %`);
  });
  const inp = $('.cb-note');
  LOG.push({ n: (LOG.length ? LOG[LOG.length - 1].n : 0) + 1, t: new Date().toISOString(), note: inp.value.trim() || S.name || '', state: state.join(', '), vals });
  inp.value = '';
  save(); renderLog();
}
function logCols() { const cols = []; LOG.forEach((r) => Object.keys(r.vals).forEach((k) => { if (!cols.includes(k)) cols.push(k); })); return cols; }
function renderLog() {
  const box = $('.cb-log-wrap');
  if (!LOG.length) { box.innerHTML = '<p class="cb-small">No readings yet. Set up a measurement, then press Note reading. Each row keeps the instrument values and the circuit state, so two set-ups can be compared side by side.</p>'; return; }
  const cols = logCols();
  const prev = {};
  box.innerHTML = `<table class="cb-tab cb-logtab"><thead><tr><th>#</th><th>Time</th><th>Note</th>${cols.map((c) => `<th>${esc(c)}</th>`).join('')}<th>State</th><th></th></tr></thead><tbody>${LOG.map((r, i) => {
    const cells = cols.map((c) => {
      const v = r.vals[c];
      let d = '';
      if (typeof v === 'number' && typeof prev[c] === 'number' && v !== prev[c]) d = `<small>${v - prev[c] > 0 ? '+' : ''}${r2(v - prev[c], 3)}</small>`;
      if (v !== undefined) prev[c] = v;
      return `<td>${v === undefined ? '' : esc(v)}${d}</td>`;
    }).join('');
    return `<tr><td>${r.n}</td><td>${new Date(r.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td><td>${esc(r.note)}</td>${cells}<td class="cb-state">${esc(r.state)}</td><td><button type="button" class="cb-x" data-dellog="${i}" aria-label="Delete row ${r.n}">✕</button></td></tr>`;
  }).join('')}</tbody></table><p class="cb-small">Small numbers show the change from the row above.</p>`;
}
function exportCSV() {
  const cols = logCols();
  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const lines = [['#', 'time', 'note', ...cols, 'state'].map(q).join(',')];
  LOG.forEach((r) => lines.push([r.n, r.t, r.note, ...cols.map((c) => (r.vals[c] === undefined ? '' : r.vals[c])), r.state].map(q).join(',')));
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'circuit-readings.csv';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ---------------- editing ---------------- */
function occupied(except) {
  const body = new Set(), terms = new Set();
  S.parts.forEach((p) => { if (p.id === except) return; bodyPts(p).forEach((q) => body.add(key(...q))); termPts(p).forEach((q) => terms.add(key(...q))); });
  return { body, terms };
}
function fits(p) {
  if (!termPts(p).every(inBoard) || !bodyPts(p).every(inBoard)) return false;
  if (p.type === 'relay' && termPts(p).some(([x, y]) => x < 0 || x >= COLS)) return false;
  const { body, terms } = occupied(p.id);
  return !bodyPts(p).some((q) => body.has(key(...q)) || terms.has(key(...q))) && !termPts(p).some((q) => body.has(key(...q)));
}
function changed(resolve = true) {
  if (resolve) simulate();
  render();
  save();
}
function place(type, x, y) {
  const p = newPart(type, x, y, 0);
  if (!fits(p)) { p.rot = 1; if (!fits(p)) { p.rot = 0; p.x = x - 2; if (!fits(p)) { setEvent('No room there: parts cannot overlap. Try another spot.', ''); render(); return; } } }
  S.parts.push(p); sel = p.id; armed = null;
  propsPanel(); changed();
}
function addWire(a, b) {
  if (a[0] === b[0] && a[1] === b[1]) return;
  if (S.wires.some((w) => (key(...w.a) === key(...a) && key(...w.b) === key(...b)) || (key(...w.a) === key(...b) && key(...w.b) === key(...a)))) return;
  const w = newWire(a, b);
  const g = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  w.len = Math.max(0.1, +(g * 0.1).toFixed(2));     // 10 cm per grid step, as on a bench
  S.wires.push(w);
  changed();
}
function del() {
  if (!sel) return;
  if (sel[0] === 'w') S.wires = S.wires.filter((w) => w.id !== sel);
  else { S.parts = S.parts.filter((p) => p.id !== sel); delete memState[sel]; }
  sel = null; propsPanel(); changed();
}
function rotate() {
  const p = S.parts.find((x) => x.id === sel);
  if (!p) return;
  const old = p.rot;
  for (let i = 1; i <= 4; i++) { p.rot = (old + i) & 3; if (fits(p)) break; }
  if (!fits(p)) p.rot = old;
  changed();
}
function setPower(on) {
  S.power = on;
  if (!on) S.parts.forEach((p) => { if (p.type === 'button') p.st.down = false; p.st.heat = 0; p.st.burn = 0; });
  EVENT = null;
  changed();
}

/* ---------------- pointer handling ---------------- */
function svgPt(e) {
  const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
  const q = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: q.x, y: q.y, gx: Math.round(q.x / CELL - 0.5), gy: Math.round(q.y / CELL - 0.5) };
}
function nearGrid(q) {
  const d = Math.hypot(q.x - px(q.gx), q.y - px(q.gy));
  return d < CELL * 0.42 && inBoard([q.gx, q.gy]) ? [q.gx, q.gy] : null;
}
function onDown(e) {
  if (e.button !== undefined && e.button > 0) return;
  const q = svgPt(e);
  const term = e.target.closest('[data-pt]');
  const partEl = e.target.closest('[data-part]');
  const wireEl = e.target.closest('[data-wire]');
  hideTip();
  if (armed && armed !== 'wire') {
    if (inBoard([q.gx, q.gy])) place(armed, q.gx, q.gy);
    return;
  }
  if (term || (pending && nearGrid(q)) || (armed === 'wire' && nearGrid(q))) {
    const pt = term ? term.dataset.pt.split(',').map(Number) : nearGrid(q);
    e.preventDefault();
    if (pending) {
      if (pt[0] === pending[0] && pt[1] === pending[1]) { pending = null; render(); return; }
      const a = pending; pending = armed === 'wire' ? pt : null;
      addWire(a, pt);
      return;
    }
    pending = pt;
    drag = { kind: 'wire', from: pt, sx: e.clientX, sy: e.clientY, moved: false };
    try { svg.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
    showNodeTip(pt, q);
    render();
    return;
  }
  if (pending) { pending = null; render(); return; }
  if (partEl) {
    e.preventDefault();
    const p = S.parts.find((x) => x.id === partEl.dataset.part);
    drag = { kind: 'part', p, ox: p.x - q.gx, oy: p.y - q.gy, x0: p.x, y0: p.y, sx: e.clientX, sy: e.clientY, moved: false };
    if (p.type === 'button') { p.st.down = true; drag.press = true; simulate(); render(); }
    try { svg.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
    return;
  }
  if (wireEl) { sel = wireEl.dataset.wire; propsPanel(); render(); return; }
  if (sel) { sel = null; propsPanel(); render(); }
}
function onMove(e) {
  const q = svgPt(e);
  if (drag && drag.kind === 'part') {
    if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 8) return;
    if (!drag.moved && drag.press) { drag.p.st.down = false; drag.press = false; }
    drag.moved = true;
    const nx = q.gx + drag.ox, ny = q.gy + drag.oy;
    if (nx !== drag.p.x || ny !== drag.p.y) {
      const ox = drag.p.x, oy = drag.p.y, before = termPts(drag.p);
      drag.p.x = nx; drag.p.y = ny;
      if (!fits(drag.p)) { drag.p.x = ox; drag.p.y = oy; }
      else {
        // wires attached only to this part follow it
        const after = termPts(drag.p);
        const shared = new Set();
        S.parts.forEach((q) => { if (q !== drag.p) termPts(q).forEach((t) => shared.add(key(...t))); });
        before.forEach((t, i) => {
          const k = key(...t);
          if (shared.has(k)) return;
          S.wires.forEach((w) => { if (key(...w.a) === k) w.a = after[i].slice(); if (key(...w.b) === k) w.b = after[i].slice(); });
        });
        S.wires = S.wires.filter((w) => key(...w.a) !== key(...w.b));
        simulate(); render();
      }
    }
    return;
  }
  if (drag && drag.kind === 'wire') {
    if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 8) drag.moved = true;
  }
  if (pending) {
    const g = nearGrid(q);
    const end = g ? [px(g[0]), px(g[1])] : [q.x, q.y];
    const a = [px(pending[0]), px(pending[1])];
    $('.cb-ghost', svg).innerHTML = `<path d="M${a.join(',')} L${end[0]},${a[1]} L${end.join(',')}" class="cb-rubber"/>`;
  } else $('.cb-ghost', svg).innerHTML = '';
  if (e.pointerType === 'mouse' && !drag) hoverTip(e, q);
}
function onUp(e) {
  const d = drag; drag = null;
  if (!d) return;
  if (d.kind === 'wire') {
    if (d.moved) {
      const g = nearGrid(svgPt(e));
      if (g && (g[0] !== d.from[0] || g[1] !== d.from[1])) { pending = armed === 'wire' ? g : null; addWire(d.from, g); }
    }
    return;
  }
  if (d.kind === 'part') {
    const p = d.p;
    if (p.type === 'button' && p.st.down) { p.st.down = false; simulate(); }
    if (!d.moved) {
      if (p.type === 'switch') p.props.closed = !p.props.closed;
      sel = p.id; propsPanel();
    }
    changed();
  }
}

/* tooltips: node voltages on hover */
function hideTip() { const t = $('.cb-tip'); if (t) t.hidden = true; }
function placeTip(html, q) {
  const t = $('.cb-tip'), box = $('.cb-board');
  t.innerHTML = html; t.hidden = false;
  const m = svg.getScreenCTM(), bb = box.getBoundingClientRect();
  const sx = q.x * m.a + m.e - bb.left, sy = q.y * m.d + m.f - bb.top;
  t.style.left = Math.min(bb.width - 150, Math.max(4, sx + 12)) + 'px';
  t.style.top = Math.max(4, sy - 40) + 'px';
}
function nodeV(k) { return SIM && S.power && SIM.V[k] !== undefined ? SIM.V[k] : null; }
function showNodeTip(pt, q) {
  const v = nodeV(key(...pt));
  if (v === null) { hideTip(); return; }
  placeTip(`<b>${fmt(v, 'V')}</b> to ${SIM.ref === 'GND' ? 'frame' : 'battery −'}`, q);
}
function hoverTip(e, q) {
  const term = e.target.closest('[data-pt]');
  const wireEl = e.target.closest('[data-wire]');
  if (term) { const pt = term.dataset.pt.split(',').map(Number); if (hoverPt !== term.dataset.pt) { hoverPt = term.dataset.pt; } showNodeTip(pt, q); return; }
  hoverPt = null;
  if (wireEl && SIM && S.power) {
    const w = S.wires.find((x) => x.id === wireEl.dataset.wire), r = SIM.wires[w.id];
    if (r) { placeTip(`Wire: <b>${fmt(Math.abs(r.I), 'A')}</b>, drop ${fmt(Math.abs(r.V), 'V')}<br>ends ${fmt(nodeV(key(...w.a)) || 0, 'V')} and ${fmt(nodeV(key(...w.b)) || 0, 'V')}`, q); return; }
  }
  const partEl = e.target.closest('[data-part]');
  if (partEl && SIM && S.power) {
    const p = S.parts.find((x) => x.id === partEl.dataset.part), r = SIM.res[p.id];
    if (p && r && !INSTR.includes(p.type)) { placeTip(`${esc(p.name)}: ${fmt(Math.abs(p.type === 'relay' ? r.Ic || 0 : r.I), 'A')}, ${fmt(Math.abs(p.type === 'relay' ? r.Vc || 0 : r.V), 'V')}, ${fmt(Math.abs(r.P), 'W')}`, q); return; }
  }
  hideTip();
}

/* ---------------- panel events ---------------- */
function wire() {
  root.addEventListener('click', (e) => {
    const pal = e.target.closest('[data-pal]');
    if (pal) { armed = armed === pal.dataset.pal ? null : pal.dataset.pal; pending = null; render(); return; }
    const chal = e.target.closest('[data-chal]');
    if (chal) { ACTIVE = ACTIVE === chal.dataset.chal ? null : chal.dataset.chal; chalKey = ''; save(); renderChallengeList(); renderChallenge(); return; }
    const ohm = e.target.closest('[data-ohms]');
    if (ohm) { const p = S.parts.find((x) => x.id === sel); if (p) { p.props.ohms = +ohm.dataset.ohms; propsPanel(); changed(); } return; }
    const eo = e.target.closest('[data-eo]');
    if (eo) { const p = S.parts.find((x) => x.id === sel); if (p) { p.props.ohms = +eo.dataset.eo; propsPanel(); changed(); } return; }
    const dl = e.target.closest('[data-dellog]');
    if (dl) { LOG.splice(+dl.dataset.dellog, 1); save(); renderLog(); return; }
    const b = e.target.closest('[data-act]');
    if (!b || b.tagName === 'SELECT') return;
    const p = S.parts.find((x) => x.id === sel);
    switch (b.dataset.act) {
      case 'power': setPower(!S.power); break;
      case 'note': noteReading(); break;
      case 'rotate': rotate(); break;
      case 'delete': del(); break;
      case 'clear': S = blankState(); S.name = 'Blank board'; sel = null; pending = null; for (const k in memState) delete memState[k]; propsPanel(); changed(); break;
      case 'toggle': if (p) { p.props.closed = !p.props.closed; propsPanel(); changed(); } break;
      case 'refuse': if (p) { p.st.blown = false; p.st.heat = 0; EVENT = null; propsPanel(); changed(); } break;
      case 'reled': if (p) { p.st.burnt = false; p.st.burn = 0; EVENT = null; propsPanel(); changed(); } break;
      case 'csv': exportCSV(); break;
      case 'clearlog': if (!LOG.length || confirm('Clear all readings from the log?')) { LOG = []; save(); renderLog(); } break;
      case 'chalstart': { const c = CHALLENGES.find((x) => x.id === ACTIVE); if (c) { loadPreset(c.start); delete MEM[c.id]; propsPanel(); changed(); } break; }
    }
  });
  const hold = (down) => (e) => {
    const b = e.target.closest('[data-act="hold"]'); if (!b) return;
    const p = S.parts.find((x) => x.id === sel); if (!p) return;
    if (down) e.preventDefault();
    if (p.st.down === down) return;
    p.st.down = down; b.classList.toggle('is-down', !!p.st.down); changed();
  };
  root.addEventListener('pointerdown', hold(true));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => root.addEventListener(ev, (e) => { if (e.target.closest && e.target.closest('[data-act="hold"]')) hold(false)(e); }, true));
  root.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.act === 'preset') { if (t.value) { loadPreset(t.value); try { history.replaceState(null, '', '#build=' + t.value); } catch (_) { /* noop */ } propsPanel(); changed(); } t.value = ''; return; }
    onField(t, true);
  });
  root.addEventListener('input', (e) => onField(e.target, false));
  svg.addEventListener('pointerdown', onDown);
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerup', onUp);
  svg.addEventListener('pointercancel', onUp);
  svg.addEventListener('pointerleave', () => { if (!drag) hideTip(); });
  document.addEventListener('keydown', (e) => {
    if (!root.contains(document.activeElement) && document.activeElement !== document.body) return;
    if (/INPUT|SELECT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) return;
    if (e.key === 'Escape') { armed = null; pending = null; render(); }
    else if ((e.key === 'Delete' || e.key === 'Backspace') && sel) { e.preventDefault(); del(); }
    else if ((e.key === 'r' || e.key === 'R') && sel) rotate();
  });
}
function onField(t, commit) {
  if (t.classList.contains('cb-name')) { const p = S.parts.find((x) => x.id === sel); if (p && t.value.trim()) { p.name = t.value.trim().slice(0, 8); changed(false); } return; }
  if (t.dataset.w) {
    const w = S.wires.find((x) => x.id === sel); if (!w) return;
    w[t.dataset.w] = +t.value;
    const o = t.parentElement.querySelector('output'); if (o) o.textContent = w.len + ' m';
    const wr = root.querySelector('[data-wr]'); if (wr) wr.textContent = fmt(wireR(w), 'Ω');
    if (commit && t.tagName === 'SELECT') propsPanel();
    changed(); return;
  }
  const p = S.parts.find((x) => x.id === sel);
  if (!p) return;
  if (t.dataset.earth !== undefined) {
    p.props.ohms = earthOhms(+t.value);
    const o = t.parentElement.querySelector('output'); if (o) o.textContent = fmt(p.props.ohms, 'Ω');
    changed(); return;
  }
  const k = t.dataset.p; if (!k) return;
  if (t.type === 'checkbox') p.props[k] = t.checked;
  else if (t.tagName === 'SELECT') p.props[k] = isNaN(+t.value) ? t.value : +t.value;
  else {
    let v = +t.value * (t.dataset.scale ? +t.dataset.scale : 1);
    if (!isFinite(v)) return;
    if (t.type === 'number') { if (v <= 0) return; }
    p.props[k] = v;
    const o = t.parentElement.querySelector('output');
    if (o) o.textContent = k === 'rint' ? `${Math.round(v * 1000)} mΩ` : `${p.props[k]} ${o.textContent.split(' ').pop()}`;
    const pr = root.querySelector('[data-potr]'); if (pr) pr.textContent = fmt(potR(p), 'Ω');
  }
  if (p.type === 'meter' && k === 'mode') p.st.blown = p.st.blown && p.props.mode === 'A';
  if (t.tagName === 'SELECT' || t.type === 'checkbox') propsPanel();
  changed();
}

/* ---------------- loop ---------------- */
let lastT = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - (lastT || now)) / 1000); lastT = now;
  if (S.power && SIM) {
    if (step(dt)) { simulate(); render(); save(); if (sel) propsPanel(); }
    moveDots(dt);
    if (EVENT && now - EVENT.t > 6000) { EVENT = null; status(); }
  }
  requestAnimationFrame(frame);
}

function fromHash() {
  const m = /(?:^#|&)build=([\w-]+)/.exec(location.hash || '');
  if (m && PRESETS[m[1]]) { loadPreset(m[1]); return true; }
  return false;
}

export function mountCircuitBuilder(el) {
  root = el;
  root.classList.add('cb-root');
  const hadSaved = restore();
  if (!fromHash() && !hadSaved) loadPreset('bulb');
  shell();
  wire();
  propsPanel();
  simulate();
  render();
  renderChallengeList();
  renderLog();
  window.addEventListener('hashchange', () => { if (fromHash()) { propsPanel(); changed(); } });
  requestAnimationFrame(frame);
  // test hook for automated checks
  window.__circuitBuilder = { get state() { return S; }, get sim() { return SIM; }, simulate, render, loadPreset: (n) => { loadPreset(n); propsPanel(); changed(); }, setPower, challenges: CHALLENGES, check: (id) => { simulate(); return CHALLENGES.find((c) => c.id === id).check(); }, newPart, newWire, changed, termPts, ohmReading, passed: () => PASSED, step };
}
