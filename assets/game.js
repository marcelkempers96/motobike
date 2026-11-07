/* ==========================================================================
   Motopedia: Build a bike. A drag-and-drop game on the course plates.
   Pick up each part (shown as its 3D render) and drop it where it belongs.
   ========================================================================== */
import { HOTSPOTS, OVERVIEW_PLATE, PLATE_RATIO } from './content/assets-map.js';
import { recordTool } from './progress.js';

const R = '../assets/';
const BIKES = {
  '4t': { name: 'Classic four-stroke', render: 'bike_classic_4t_side', ride: '../cockpit/?mode=4t' },
  '2t': { name: 'Two-stroke motocross', render: 'bike_mx_2t_side', ride: '../cockpit/?mode=2t' },
  elec: { name: 'Electric scrambler', render: 'bike_electric_side', ride: '../cockpit/?mode=elec' },
};
/* [part key, render, name, what it does (one friendly sentence)] */
const PARTS = {
  '4t': [
    ['front_wheel', 'front_wheel_spoked', 'Front wheel', 'Steers the bike and carries the front tyre.'],
    ['rear_wheel', 'rear_wheel_spoked', 'Rear wheel', 'The engine turns this wheel to push the bike along.'],
    ['engine', 'engine_4t', 'Engine', 'Burns petrol and air to make the power.'],
    ['fuel_tank', 'fuel_tank', 'Fuel tank', 'Holds the petrol, above the engine.'],
    ['seat', 'seat_bench', 'Seat', 'Where the rider sits.'],
    ['headlight', 'headlight_round', 'Headlight', 'Lights the road and lets others see you.'],
    ['forks', 'forks', 'Front fork', 'Springy tubes that hold the front wheel and soak up bumps.'],
    ['exhaust', 'exhaust_4t', 'Exhaust', 'Carries the hot burnt gas away and makes the engine quieter.'],
    ['brake', 'brake', 'Front brake', 'Squeezes the disc to slow the bike down.'],
    ['rear_shock', 'rear_shock_twin', 'Rear shocks', 'Springs that let the back wheel move over bumps.'],
    ['swingarm', 'swingarm', 'Swingarm', 'The arm that holds the rear wheel and swings up and down.'],
    ['chain', 'chain_sprockets', 'Chain', 'Carries the turning force from the engine to the back wheel.'],
    ['carb', 'throttle_body', 'Throttle body', 'Lets air in when you twist the throttle.'],
    ['instruments', 'instruments_analogue', 'Instruments', 'Show how fast you go and how hard the engine spins.'],
    ['tail_light', 'tail_light', 'Tail light', 'A red light at the back that glows brighter when you brake.'],
    ['frame', 'frame_cradle', 'Frame', 'The skeleton that holds every other part.'],
  ],
  '2t': [
    ['front_wheel', 'front_wheel_mx', 'Front wheel', 'A big 21 inch wheel with knobbly tyre for dirt.'],
    ['rear_wheel', 'rear_wheel_mx', 'Rear wheel', 'Knobbly tyre that digs into mud to push the bike.'],
    ['engine', 'engine_2t', 'Engine', 'A two-stroke: it fires every time the crank goes round.'],
    ['forks', 'forks_usd', 'Upside-down fork', 'Long, strong springs for big jumps.'],
    ['exhaust', 'exhaust_2t', 'Expansion chamber', 'The fat pipe that helps a two-stroke make more power.'],
    ['seat', 'seat_mx', 'Seat', 'Long and flat so the rider can move around.'],
    ['rear_shock', 'rear_shock', 'Monoshock', 'One big spring and damper for the back wheel.'],
    ['swingarm', 'swingarm', 'Swingarm', 'Holds the rear wheel and swings up and down.'],
    ['carb', 'carb', 'Carburettor', 'Mixes petrol into the air going to the engine.'],
    ['brake', 'brake', 'Front brake', 'Squeezes the disc to stop.'],
    ['headlight', 'headlight_mx', 'Number plate', 'Shows the rider number, with a small lamp.'],
    ['frame', 'frame', 'Frame', 'The skeleton that holds everything together.'],
  ],
  elec: [
    ['front_wheel', 'front_wheel_cast', 'Front wheel', 'A cast wheel that steers the bike.'],
    ['rear_wheel', 'rear_wheel_cast', 'Rear wheel', 'The motor turns this wheel through a belt.'],
    ['battery', 'battery_hv', 'Battery pack', 'Stores the electricity, like a fuel tank for an electric bike.'],
    ['motor', 'motor', 'Electric motor', 'Uses magnets to turn electricity into spinning.'],
    ['controller', 'controller', 'Controller', 'Sends the right amount of power to the motor when you twist the throttle.'],
    ['charge_port', 'charge_port', 'Charge port', 'Where you plug in to charge the battery.'],
    ['forks', 'forks', 'Front fork', 'Springy tubes that hold the front wheel.'],
    ['headlight', 'headlight_led', 'LED headlight', 'A bright light that uses very little power.'],
    ['seat', 'seat_tracker', 'Seat', 'Where the rider sits.'],
    ['instruments', 'instruments_tft', 'Screen', 'Shows speed and how much battery is left.'],
    ['rear_shock', 'rear_shock_twin', 'Rear shocks', 'Springs for the back wheel.'],
    ['swingarm', 'swingarm', 'Swingarm', 'Holds the rear wheel and swings up and down.'],
    ['brake', 'brake', 'Front brake', 'Squeezes the disc to stop.'],
    ['chain', 'chain_sprockets', 'Belt drive', 'Carries the turning force from the motor to the back wheel.'],
  ],
};
const EASY = { '4t': 8, '2t': 7, elec: 8 };

const $ = (s, r = document) => r.querySelector(s);
const root = $('#bg');
let st = { bike: '4t', level: 'easy', placed: 0, tries: 0, start: 0, picked: null, done: false };
try { const q = new URLSearchParams(location.search); if (BIKES[q.get('bike')]) st.bike = q.get('bike'); } catch (e) { /* noop */ }

const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
/* A few drop spots moved apart so the targets never overlap */
const MOVE = { '4t': { chain: [62, 58.5], swingarm: [72, 64.5] }, elec: { seat: [72.5, 32.4], front_wheel: [26, 48] } };
const spot = (key) => {
  const m = MOVE[st.bike] && MOVE[st.bike][key];
  if (m) return [key, m[0], m[1]];
  return (HOTSPOTS[st.bike] || []).find((h) => h[0] === key);
};

function parts() {
  const all = PARTS[st.bike].filter(([k]) => spot(k));
  return st.level === 'easy' ? all.slice(0, EASY[st.bike]) : all;
}

function render() {
  const ps = parts();
  st = { ...st, placed: 0, tries: 0, start: performance.now(), picked: null, done: false };
  root.innerHTML = `
    <div class="bg-head">
      <div>
        <span class="ute-label">Kids game · ages 6 and up</span>
        <h1>Build a bike</h1>
        <p>Pick up a part and drop it where it belongs on the motorcycle. Get them all to finish the bike. Not sure? The dashed circles show where parts go.</p>
      </div>
      <div class="bg-tools">
        <div class="ute-seg" role="group" aria-label="Bike">${Object.entries(BIKES).map(([k, b]) => `<button type="button" data-bike="${k}" class="${st.bike === k ? 'is-on' : ''}">${b.name}</button>`).join('')}</div>
        <div class="ute-seg" role="group" aria-label="Level"><button type="button" data-level="easy" class="${st.level === 'easy' ? 'is-on' : ''}">Easy</button><button type="button" data-level="expert" class="${st.level === 'expert' ? 'is-on' : ''}">Expert</button></div>
        <button type="button" class="ute-btn" data-restart>Start again</button>
      </div>
    </div>
    <div class="bg-score">
      <div><div class="l">Parts placed</div><div class="v" id="bg-placed">0 / ${ps.length}</div></div>
      <div><div class="l">Tries</div><div class="v" id="bg-tries">0</div></div>
      <div><div class="l">Time</div><div class="v" id="bg-time">0 s</div></div>
    </div>
    <div class="bg-game">
      <div>
        <div class="bg-board ${st.level === 'expert' ? 'is-expert' : ''}" id="bg-board" style="aspect-ratio:${PLATE_RATIO[st.bike]}">
          <img class="bg-plate" src="${R}illustrations/${OVERVIEW_PLATE[st.bike]}" alt="Outline of the ${BIKES[st.bike].name.toLowerCase()}">
          ${ps.map(([k, , name]) => { const h = spot(k); return `<button type="button" class="bg-slot" data-slot="${k}" style="left:${h[1]}%;top:${h[2]}%" aria-label="Place for the ${name.toLowerCase()}"><span>${name}</span></button>`; }).join('')}
        </div>
        <div class="bg-msg" id="bg-msg" aria-live="polite"><b>Ready?</b> Drag a part from the box onto the bike, or tap a part and then tap its place.</div>
        <div class="bg-win" id="bg-win">
          <img src="${R}renders/${BIKES[st.bike].render}.webp" alt="The finished ${BIKES[st.bike].name.toLowerCase()}">
          <div>
            <span class="ute-label">Well done</span>
            <h2>You built the bike!</h2>
            <p id="bg-win-text"></p>
            <div class="ute-btnrow"><a class="ute-linkbtn is-warm" href="${BIKES[st.bike].ride}">Ride it in the Cockpit →</a><button type="button" class="ute-btn" data-next>Build another</button><a class="ute-linkbtn" href="../learn/#m1-anatomy">Learn the parts</a></div>
          </div>
        </div>
      </div>
      <div class="bg-tray" id="bg-tray" aria-label="Parts box">
        <h2>Parts box</h2>
        ${shuffle(ps).map(([k, r, name]) => `<button type="button" class="bg-card" data-part="${k}"><img src="${R}renders/${r}.webp" alt="" draggable="false"><span>${name}</span></button>`).join('')}
      </div>
    </div>`;
  wire();
}

function info(k) { return PARTS[st.bike].find((p) => p[0] === k); }
function say(html, tone) { const m = $('#bg-msg'); m.innerHTML = html; m.className = 'bg-msg' + (tone ? ' is-' + tone : ''); }

function place(k, slot) {
  if (st.done || !slot || slot.classList.contains('is-filled')) return false;
  st.tries++;
  $('#bg-tries').textContent = st.tries;
  const [, r, name, what] = info(k);
  if (slot.dataset.slot === k) {
    slot.classList.add('is-filled');
    slot.innerHTML = `<img src="${R}renders/${r}.webp" alt="${name}"><span>${name}</span>`;
    const card = $(`.bg-card[data-part="${k}"]`);
    if (card) { card.classList.add('is-used'); card.disabled = true; }
    st.placed++;
    $('#bg-placed').textContent = `${st.placed} / ${parts().length}`;
    say(`<b>Yes! The ${name.toLowerCase()}.</b> ${what}`, 'good');
    if (st.placed === parts().length) win();
    return true;
  }
  const other = info(slot.dataset.slot);
  slot.classList.remove('is-wrong'); void slot.offsetWidth; slot.classList.add('is-wrong');
  say(`<b>Not quite.</b> That place is for the ${other ? other[2].toLowerCase() : 'another part'}. The ${name.toLowerCase()}: ${what.charAt(0).toLowerCase() + what.slice(1)}`, 'bad');
  return false;
}

function win() {
  st.done = true;
  const secs = Math.round((performance.now() - st.start) / 1000);
  $('#bg-board').classList.add('is-done');
  recordTool('kids', { [`${st.bike}-${st.level}`]: secs });
  $('#bg-win').classList.add('is-on');
  const perfect = st.tries === parts().length;
  $('#bg-win-text').textContent = `${parts().length} parts in ${secs} seconds with ${st.tries} tries${perfect ? ': perfect, not a single mistake!' : '.'} Now see it move: start the engine in the Overview.`;
  say('<b>Finished!</b> Every part is in its place.', 'good');
  try { const best = JSON.parse(localStorage.getItem('mz-build') || '{}'); const key = st.bike + '-' + st.level; if (!best[key] || secs < best[key]) { best[key] = secs; localStorage.setItem('mz-build', JSON.stringify(best)); } } catch (e) { /* private mode */ }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const c = document.createElement('div');
    c.className = 'bg-confetti';
    const cols = ['#C8502A', '#1E2B5E', '#2BB76E', '#E2A93B', '#3E6FB7'];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = cols[i % cols.length];
      p.style.animationDuration = 1.8 + Math.random() * 1.8 + 's';
      p.style.animationDelay = Math.random() * 0.6 + 's';
      c.appendChild(p);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4200);
  }
  $('#bg-win').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function slotAt(x, y) {
  let best = null, bd = Infinity;
  document.querySelectorAll('.bg-slot:not(.is-filled)').forEach((s) => {
    const r = s.getBoundingClientRect();
    const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
    if (d < bd) { bd = d; best = s; }
  });
  return bd < 70 ? best : null;
}

function wire() {
  root.querySelectorAll('[data-bike]').forEach((b) => b.addEventListener('click', () => { st.bike = b.dataset.bike; render(); }));
  root.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => { st.level = b.dataset.level; render(); }));
  $('[data-restart]').addEventListener('click', render);
  $('[data-next]').addEventListener('click', () => { const ks = Object.keys(BIKES); st.bike = ks[(ks.indexOf(st.bike) + 1) % ks.length]; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Tap/click a card, then tap a slot (also keyboard: Enter on card, then Enter on slot)
  root.querySelectorAll('.bg-card').forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset.dragged) { delete card.dataset.dragged; return; }
      root.querySelectorAll('.bg-card.is-picked').forEach((c) => c !== card && c.classList.remove('is-picked'));
      card.classList.toggle('is-picked');
      st.picked = card.classList.contains('is-picked') ? card.dataset.part : null;
      if (st.picked) say(`<b>You picked the ${info(st.picked)[2].toLowerCase()}.</b> Now tap where it goes on the bike.`);
    });
    card.addEventListener('pointerdown', (e) => startDrag(e, card));
  });
  root.querySelectorAll('.bg-slot').forEach((s) => s.addEventListener('click', () => {
    if (!st.picked) { say('<b>First pick a part</b> from the parts box.'); return; }
    if (place(st.picked, s)) st.picked = null;
  }));
  const t0 = st.start;
  const timer = setInterval(() => {
    if (st.start !== t0 || !document.getElementById('bg-time')) { clearInterval(timer); return; }
    if (!st.done) $('#bg-time').textContent = Math.round((performance.now() - st.start) / 1000) + ' s';
  }, 500);
}

function startDrag(e, card) {
  if (e.button !== 0 || card.disabled) return;
  const sx = e.clientX, sy = e.clientY;
  let ghost = null, hot = null;
  const move = (ev) => {
    if (!ghost) {
      if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
      ghost = document.createElement('div');
      ghost.className = 'bg-drag';
      ghost.innerHTML = card.innerHTML;
      document.body.appendChild(ghost);
      card.style.opacity = '.35';
      card.dataset.dragged = '1';
      say(`<b>Carrying the ${info(card.dataset.part)[2].toLowerCase()}.</b> Drop it on the right place.`);
    }
    ghost.style.left = ev.clientX + 'px';
    ghost.style.top = ev.clientY + 'px';
    const s = slotAt(ev.clientX, ev.clientY);
    if (s !== hot) { if (hot) hot.classList.remove('is-hot'); hot = s; if (hot) hot.classList.add('is-hot'); }
  };
  const up = (ev) => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    if (!ghost) return;
    ghost.remove();
    card.style.opacity = '';
    if (hot) hot.classList.remove('is-hot');
    const s = slotAt(ev.clientX, ev.clientY);
    if (s) place(card.dataset.part, s);
    else say('<b>Missed.</b> Drop the part on one of the dashed circles.');
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
}

render();
