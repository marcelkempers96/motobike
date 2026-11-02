/* Moto Zero crash course: systems explorer, power calculator, animations on demand,
   reading progress. Progress is saved in this browser (assets/progress.js). */
import { recordTool, load } from './progress.js';

const $ = (s, r = document) => r.querySelector(s);
const R = '../assets/renders/';
const SYSTEMS = {
  power: { t: 'Power unit', d: 'Turns stored energy into turning force at the crankshaft.', parts: [['engine', 'Engine', 'engine_4t'], ['piston', 'Piston', 'piston'], ['conrod', 'Connecting rod', 'conrod'], ['crankshaft', 'Crankshaft', 'crankshaft_single'], ['valve_in', 'Valves', 'valve_in'], ['motor', 'Electric motor', 'motor']] },
  fuel: { t: 'Fuel and air', d: 'Stores fuel, mixes it with clean air and carries the exhaust away.', parts: [['fuel_tank', 'Fuel tank', 'fuel_tank'], ['air_filter', 'Air filter', 'air_filter'], ['carb', 'Carburettor', 'carb'], ['exhaust', 'Exhaust', 'exhaust_4t'], ['battery', 'Battery pack (electric)', 'battery_hv']] },
  elec: { t: 'Ignition and electrics', d: 'Fires the spark at the right moment and powers lights, starter and instruments.', parts: [['spark_plug', 'Spark plug', 'spark_plug'], ['battery', '12 V battery', 'battery_12v'], ['wiring', 'Wiring loom', 'wiring_harness'], ['headlight', 'Headlight', 'headlight_round'], ['controller', 'Controller (electric)', 'controller'], ['charge_port', 'Charge port (electric)', 'charge_port']] },
  trans: { t: 'Transmission', d: 'Connects the engine to the wheel and picks the right ratio.', parts: [['clutch', 'Clutch', 'clutch'], ['gearbox', 'Gearbox', 'clutch_exploded'], ['chain', 'Chain and sprockets', 'chain_sprockets'], ['rear_sprocket', 'Rear sprocket', 'rear_sprocket']] },
  chassis: { t: 'Chassis', d: 'Carries the load, steers, soaks up bumps, grips and stops.', parts: [['frame', 'Frame', 'frame'], ['forks', 'Front fork', 'forks'], ['swingarm', 'Swingarm', 'swingarm'], ['rear_shock', 'Rear shocks', 'rear_shock_twin'], ['front_wheel', 'Wheels and tyres', 'front_wheel_spoked'], ['brake', 'Brakes', 'brake']] },
  controls: { t: 'Controls and instruments', d: 'Let the rider command the bike and see what it is doing.', parts: [['handlebar', 'Handlebar and levers', 'handlebar'], ['instruments', 'Instruments', 'instruments_analogue'], ['seat', 'Seat', 'seat_bench'], ['tail_light', 'Tail light', 'tail_light']] },
};
const ELEC = new Set(['motor', 'controller', 'charge_port']);
const ov = (p, label) => `../overview/?${ELEC.has(p) || label.includes('electric') ? 'mode=elec&' : ''}part=${p}`;

function systems() {
  const box = $('#cc-systems'), panel = $('#cc-sys-panel');
  const show = (k) => {
    const s = SYSTEMS[k];
    box.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === k)));
    panel.innerHTML = `<p><b>${s.t}.</b> ${s.d}</p><div class="cc-sys-parts">${s.parts.map(([p, n, img]) => `<a href="${ov(p, n.toLowerCase())}"><img src="${R}${img}.webp" alt="" loading="lazy"><span>${n}</span></a>`).join('')}</div><p class="cc-sys-hint">Select a part to see it in 3D.</p>`;
  };
  box.addEventListener('click', (e) => { const b = e.target.closest('button[data-s]'); if (b) show(b.dataset.s); });
  show('power');
}

function calc() {
  const t = $('#cc-t'), n = $('#cc-n');
  const run = () => {
    const T = +t.value, N = +n.value, P = T * 2 * Math.PI * N / 60 / 1000;
    $('#cc-to').textContent = `${T.toFixed(1)} N·m`;
    $('#cc-no').textContent = `${N.toLocaleString('en-GB')} rpm`;
    $('#cc-p').textContent = `${P.toFixed(1)} kW`;
    $('#cc-ps').textContent = `(${(P / 0.7355).toFixed(1)} PS)`;
  };
  t.addEventListener('input', run); n.addEventListener('input', run); run();
}

function anims() {
  // Inline: replace the picture with the live animation when asked (keeps the page light).
  document.querySelectorAll('.cc-anim').forEach((a) => $('button', a).addEventListener('click', () => {
    a.innerHTML = `<iframe src="${a.dataset.src}" title="Interactive animation" allow="autoplay"></iframe>`;
    a.classList.add('is-live');
  }));
  // Small buttons open the animation in a pop-up.
  const modal = $('#cc-modal'), frame = $('iframe', modal);
  const close = () => { modal.hidden = true; frame.src = 'about:blank'; document.documentElement.classList.remove('mz-locked'); };
  document.querySelectorAll('[data-anim]').forEach((b) => b.addEventListener('click', () => {
    frame.src = b.dataset.anim; modal.hidden = false; document.documentElement.classList.add('mz-locked');
  }));
  $('.cc-x', modal).addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });
}

function progress() {
  const bar = $('#cc-bar'), parts = [...document.querySelectorAll('.cc-part')];
  let done = new Set();
  try { (load().tools?.crash?.parts || []).forEach((p) => done.add(p)); } catch (e) { /* ignore */ }
  const mark = () => {
    document.querySelectorAll('#cc-parts li').forEach((li, i) => li.classList.toggle('is-done', done.has(i + 1)));
  };
  const onScroll = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = `${max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0}%`;
    parts.forEach((p) => {
      const r = p.getBoundingClientRect();
      if (r.bottom < innerHeight * 0.9 && r.top < 0 && !done.has(+p.dataset.part)) {
        done.add(+p.dataset.part);
        try { recordTool('crash', { parts: [...done].sort() }); } catch (e) { /* ignore */ }
        mark();
      }
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  mark(); onScroll();
}

systems(); calc(); anims(); progress();

/* Gear pair: the small (driving) gear turns at a steady speed; the big one follows at speed ÷ ratio. */
function gears() {
  const box = document.getElementById('cc-gears');
  if (!box) return;
  const G = [[13, 36], [17, 32], [20, 29], [23, 26], [25, 24]];   // same tooth counts as Under the Engine
  const PRI = 67 / 18, FD = 43 / 14, CIRC = 1.95, T = 8.9;
  const NOTE = ['Low gear: lots of force for pulling away and climbing, but the wheel turns slowly.', 'Still strong, a little faster.', 'The middle: town riding.', 'Close to 1 : 1: both gears turn at nearly the same speed.', 'Top gear: the driven gear is smaller, so it turns faster than the driver. Least force, most speed.'];
  const gearPath = (teeth, r) => {
    const out = r + 7, inn = r - 6, step = (Math.PI * 2) / teeth; let d = '';
    for (let i = 0; i < teeth; i++) {
      const a = i * step, pts = [[inn, a], [out, a + step * 0.2], [out, a + step * 0.5], [inn, a + step * 0.7]];
      pts.forEach(([rr, aa], k) => { d += `${i === 0 && k === 0 ? 'M' : 'L'}${(rr * Math.cos(aa)).toFixed(1)},${(rr * Math.sin(aa)).toFixed(1)}`; });
    }
    return d + 'Z';
  };
  const g1 = document.getElementById('cc-g1'), g2 = document.getElementById('cc-g2');
  let cur = 0, a1 = 0, a2 = 0, r1 = 0, r2 = 0, x1 = 0, x2 = 0, last = 0;
  const draw = (k) => {
    cur = k;
    const [m, c] = G[k], scale = 2.6, CD = 49 * scale;   // pitch radii in proportion to the teeth, same centre distance
    r1 = m / 49 * CD; r2 = c / 49 * CD; x1 = 260 - (r1 + r2 + 3) / 2; x2 = x1 + r1 + r2 + 3;
    g1.innerHTML = `<path d="${gearPath(m, r1)}" fill="#C2502A"/><circle r="8" fill="#FFF"/>`;
    g2.innerHTML = `<path d="${gearPath(c, r2)}" fill="#0A0A0A"/><circle r="10" fill="#FFF"/><line x1="0" y1="0" x2="${r2 - 14}" y2="0" stroke="#FFF" stroke-width="4"/>`;
    document.getElementById('cc-gl').innerHTML = `<text x="${x1 + r1 * 0.3}" y="232" text-anchor="end" font-size="14" font-weight="700" fill="#C2502A">${m} teeth (engine side)</text><text x="${x2 - r2 * 0.6}" y="232" text-anchor="start" font-size="14" font-weight="700" fill="#0A0A0A">${c} teeth (to the wheel)</text>`;
    box.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.g === k)));
    const gr = c / m, ov = PRI * gr * FD, tq = T * ov * 0.9, kmh = 8000 / ov * CIRC * 60 / 1000;
    document.getElementById('cc-gt').textContent = `${m} : ${c}`;
    document.getElementById('cc-gr').textContent = `${gr.toFixed(2)} : 1`;
    document.getElementById('cc-gf').textContent = `${Math.round(tq)} N·m`;
    document.getElementById('cc-gs').textContent = `${Math.round(kmh)} km/h`;
    document.getElementById('cc-gfb').style.width = `${Math.min(100, tq / 240 * 100)}%`;
    document.getElementById('cc-gsb').style.width = `${Math.min(100, kmh / 90 * 100)}%`;
    document.getElementById('cc-gn').textContent = NOTE[k];
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tick = (t) => {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
    const w = reduce ? 0 : 1.6;                 // driving gear, radians per second
    const [m, c] = G[cur];
    a1 += w * dt; a2 -= w * dt * m / c;
    g1.setAttribute('transform', `translate(${x1},110) rotate(${a1 * 57.3})`);
    g2.setAttribute('transform', `translate(${x2},110) rotate(${a2 * 57.3 + 180 / c})`);
    requestAnimationFrame(tick);
  };
  box.querySelector('.cc-gears-ctl').addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (b) draw(+b.dataset.g); });
  draw(0); requestAnimationFrame(tick);
}
gears();
