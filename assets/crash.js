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
