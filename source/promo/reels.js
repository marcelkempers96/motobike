// Instagram Reels: portrait 1080x1920, 30 fps, frame-stepped, phone layout of the site (432x768 CSS px at 2.5x).
// Usage: PROMO_OUT=dir node source/promo/reels.js [scene ...]
const { chromium } = require('playwright');
const { VCLOCK, stepper, recordFrames, orbit, hide, center } = require('./step.js');
const BASE = 'http://localhost:8765/';
const real = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(p, url, wait = 4000, settleS = 2) {
  await p.goto(BASE + url, { waitUntil: 'load' }); await hide(p);
  const { settle } = await stepper(p); await real(wait); await settle(settleS); return settle;
}
// scroll smoothly by `px` over `frames`, one frame at a time
async function scroll(p, frame, px, frames) {
  const y0 = await p.evaluate(() => scrollY);
  for (let i = 1; i <= frames; i++) { const k = i / frames, e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; await p.evaluate((y) => scrollTo(0, y), y0 + px * e); await frame(); }
}
const hold = async (frame, n) => { for (let i = 0; i < n; i++) await frame(); };
async function tap(p, frame, sel, after = 10) { const e = await p.$(sel); if (e) { await e.scrollIntoViewIfNeeded(); await e.click(); } await hold(frame, after); }
async function bike(p, mode, name, secs = 5, dx = 330) {
  await open(p, 'overview/?mode=' + mode, 5000, 3); await center(p, '#ute-moto-stage', 70);
  await recordFrames(p, name, secs, async (f) => { await hold(f, 6); await orbit(p, f, '#ute-moto-stage', Math.round(secs * 30) - 12, dx, -10, [0.2, 0.5]); });
}
async function page(p, url, name, secs, px, startSel, wait = 2500) {
  await open(p, url, wait, 1); if (startSel) await center(p, startSel, 80);
  await recordFrames(p, name, secs, async (f) => { await hold(f, 10); await scroll(p, f, px, Math.round(secs * 30) - 20); });
}

async function tapbike(p, mode, part, name) {
  await open(p, 'overview/?mode=' + mode, 5000, 3); await center(p, '#ute-moto-stage', 70);
  await recordFrames(p, name, 7, async (f) => {
    await orbit(p, f, '#ute-moto-stage', 95, 300, -10, [0.2, 0.5]);                 // turntable
    await p.click(`.mz-part[data-part="${part}"]`).catch(() => {});
    for (let i = 0; i < 8; i++) { await f(); await real(300); }
    await center(p, '#mz-cv3d', 90); await hold(f, 6);
    const v = await p.$('#mz-cv3d'); if (v) await orbit(p, f, '#mz-cv3d', 50, 160, -10, [0.3, 0.5]);
    await hold(f, 25);
  });
}
const jsClick = (p, sel) => p.evaluate((s) => { const e = document.querySelector(s); if (e) e.click(); }, sel);
async function eng(p, name, cam, act, { start = true, ts = '0.2', secs = 7 } = {}) {
  await open(p, 'engine/', 6000, 2); await center(p, '#view', 70);
  await jsClick(p, `[data-ts="${ts}"]`);
  if (start) { await jsClick(p, '#bElec'); const { settle } = await stepper(p); await settle(2.5); }
  if (cam) { await jsClick(p, `[data-cam="${cam}"]`); const { settle } = await stepper(p); await settle(1.5); }
  await recordFrames(p, name, secs, async (f) => { await act(f); });
}
const shiftUp = async (p, f, n, gap) => { for (let i = 0; i < n; i++) { await jsClick(p, '#bUp'); await hold(f, gap); } };
const E = {
  e01_valvetrain: (p) => eng(p, 'e01_valvetrain', 'top', async (f) => { await orbit(p, f, '#view', 200, 120, -10, [0.35, 0.5]); }),
  e02_gearbox: (p) => eng(p, 'e02_gearbox', 'gearbox', async (f) => { await hold(f, 20); await shiftUp(p, f, 5, 36); }),
  e03_clutch: (p) => eng(p, 'e03_clutch', 'clutch', async (f) => { await jsClick(p, '#bUp'); await hold(f, 50); await p.dispatchEvent('#bClutch', 'pointerdown'); await hold(f, 60); await p.dispatchEvent('#bClutch', 'pointerup'); await hold(f, 60); }),
  e04_shift_drum: (p) => eng(p, 'e04_shift_drum', 'shift', async (f) => { await hold(f, 15); await shiftUp(p, f, 5, 32); await jsClick(p, '#bDown'); await hold(f, 30); }),
  e05_generator: (p) => eng(p, 'e05_generator', 'gen', async (f) => { await orbit(p, f, '#view', 200, 140, 0, [0.35, 0.5]); }),
  e06_starting: (p) => eng(p, 'e06_starting', 'start', async (f) => { await hold(f, 20); await jsClick(p, '#bElec'); await hold(f, 160); }, { start: false }),
  e07_final_drive: (p) => eng(p, 'e07_final_drive', 'final', async (f) => { await hold(f, 60); await orbit(p, f, '#view', 140, 120, 0, [0.35, 0.5]); }),
  e08_kick: (p) => eng(p, 'e08_kick', 'start', async (f) => { await hold(f, 15); await jsClick(p, '#bKick'); await hold(f, 180); }, { start: false, ts: '1' }),
  e09_explode: (p) => eng(p, 'e09_explode', null, async (f) => {
    const s = await p.$('#explode');
    for (let v = 0; v <= 100; v += 1) { await s.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await f(); }
    await orbit(p, f, '#view', 110, 200, -10, [0.3, 0.5]);
  }),
  e10_whole: (p) => eng(p, 'e10_whole', null, async (f) => { await orbit(p, f, '#view', 210, 420, -20, [0.2, 0.5]); }),
};
const S = {
  ...E,
  t01_motocross: (p) => tapbike(p, '2t', 'engine', 't01_motocross'),
  t02_step_through: (p) => tapbike(p, 'st', 'clutch', 't02_step_through'),
  t03_boda: (p) => tapbike(p, 'bb', 'chain', 't03_boda'),
  t04_pioneer: (p) => tapbike(p, 'pi', 'engine', 't04_pioneer'),
  t05_electric_motor: (p) => tapbike(p, 'elec', 'motor', 't05_electric_motor'),
  t06_superbike_brake: (p) => tapbike(p, 'sb', 'brake', 't06_superbike_brake'),
  t07_cruiser_engine: (p) => tapbike(p, 'cu', 'engine', 't07_cruiser_engine'),
  t08_vintage_carb: (p) => tapbike(p, 'vt', 'carb', 't08_vintage_carb'),
  t09_scooter_cvt: (p) => tapbike(p, 'sc', 'cvt', 't09_scooter_cvt'),
  r01_classic: (p) => bike(p, '4t', 'r01_classic'),
  r02_superbike: (p) => bike(p, 'sb', 'r02_superbike'),
  r03_vintage: (p) => bike(p, 'vt', 'r03_vintage'),
  r04_cruiser: (p) => bike(p, 'cu', 'r04_cruiser'),
  r05_electric: (p) => bike(p, 'elec', 'r05_electric'),
  r06_scooter: (p) => bike(p, 'sc', 'r06_scooter'),
  r07_cafe: (p) => bike(p, 'cr', 'r07_cafe'),
  async r08_tap_part(p) {
    await open(p, 'overview/?mode=4t', 5000, 3); await center(p, '#ute-moto-stage', 90);
    await recordFrames(p, 'r08_tap_part', 6, async (f) => {
      await orbit(p, f, '#ute-moto-stage', 40, 140, 0, [0.3, 0.5]);
      await p.click('.mz-part[data-part="clutch"]'); for (let i = 0; i < 12; i++) { await f(); await real(250); }
      await center(p, '#mz-cv3d', 120); await hold(f, 60);
    });
  },
  r09_engine: (p) => eng(p, 'r09_engine', null, async (f) => {
    await orbit(p, f, '#view', 90, 200, -10, [0.3, 0.5]);
    const s = await p.$('#explode'); for (let v = 0; v <= 90; v += 1.5) { await s.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await f(); }
  }),
  async r10_carb(p) {
    await open(p, 'learn/#m3-mixture', 2500, 1); await center(p, '.mz-learn-model', 150); await real(4000); const { settle } = await stepper(p); await settle(2);
    await recordFrames(p, 'r10_carb', 5, async (f) => { await orbit(p, f, '.mz-learn-model canvas', 140, 260, -30, [0.25, 0.55]); });
  },
  async r11_builder(p) { await open(p, 'build/?bike=4t', 4500, 2); await center(p, '#bb-stage', 70); await recordFrames(p, 'r11_builder', 6, async () => { await p.click('#bb-auto'); }); },
  async r12_cockpit(p) {
    await open(p, 'cockpit/', 5000, 2);
    await p.keyboard.press('k'); await p.keyboard.down('c'); await p.keyboard.down('s'); const { settle } = await stepper(p); await settle(2.5); await p.keyboard.up('s'); await settle(1);
    await p.keyboard.down('t'); await settle(0.5); await p.keyboard.up('c'); await settle(1); await p.keyboard.up('t'); await settle(0.8); await p.keyboard.press('g');
    await recordFrames(p, 'r12_cockpit', 7, async (f) => {
      await p.keyboard.down('t'); await hold(f, 40);
      const y = await p.evaluate(() => document.querySelector('.mz-ck-dyno').getBoundingClientRect().top + scrollY - 70);
      await scroll(p, f, y - (await p.evaluate(() => scrollY)), 30); await p.keyboard.press('ArrowUp'); await hold(f, 50); await p.keyboard.press('ArrowUp'); await hold(f, 50); await p.keyboard.up('t');
    });
  },
  async r13_wiring(p) {
    await open(p, 'wiring/#starting', 3000, 1); await center(p, '#mz-wiring', 60);
    await recordFrames(p, 'r13_wiring', 6, async (f) => { await hold(f, 60); const fr = await (await p.$('#mz-wiring')).contentFrame(); const t = await fr.$('button:has-text("Charging"), [data-tab="charging"]'); if (t) await t.click(); await hold(f, 90); });
  },
  async r14_circuit(p) {
    await open(p, 'wiring/#build=relay-horn', 2500, 1); await center(p, '#builder', 60);
    await recordFrames(p, 'r14_circuit', 5, async (f) => { await hold(f, 20); await p.click('#builder button:has-text("Test")').catch(() => {}); await hold(f, 120); });
  },
  async r15_diagnose(p) {
    await open(p, 'repair/diagnose/', 1500, 1);
    await recordFrames(p, 'r15_diagnose', 8, async (f) => {
      await hold(f, 15); await tap(p, f, '[data-bike="petrol"]', 20); await tap(p, f, '[data-sys="brakes"]', 25);
      await tap(p, f, '.dg-opts [data-p]', 35); await tap(p, f, '.dg-go', 30);
      await scroll(p, f, 900, 70);
    });
  },
  r16_home: (p) => page(p, '', 'r16_home', 6, 1400),
  r17_problems: (p) => page(p, 'repair/problems/', 'r17_problems', 6, 2200),
  r18_parts: (p) => page(p, 'repair/parts/', 'r18_parts', 6, 2400),
  r19_repair_photos: (p) => page(p, 'repair/repairs/chain-adjust/', 'r19_repair_photos', 6, 2000),
  r20_equations: (p) => page(p, 'learn/#equations', 'r20_equations', 6, 2600, null, 3500),
  r21_course: (p) => page(p, 'learn/#m1-physics', 'r21_course', 6, 2400, null, 3500),
  r22_plates: (p) => page(p, 'downloads/', 'r22_plates', 6, 2600, '.mz-plate-card'),
  r23_models: (p) => page(p, 'models/', 'r23_models', 6, 2600),
  r24_invercargill: (p) => page(p, 'articles/invercargill-classic-motorcycle-mecca/', 'r24_invercargill', 7, 4200),
  r25_types: (p) => page(p, 'types/', 'r25_types', 6, 2200),
};

(async () => {
  const which = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(S);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
  for (const s of which) {
    const ctx = await b.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2.5, isMobile: true, hasTouch: false });
    await ctx.addInitScript(VCLOCK);
    const p = await ctx.newPage();
    try { await S[s](p); } catch (e) { console.log(s, 'FAILED', e.message.split('\n')[0]); }
    await ctx.close();
  }
  await b.close();
})();
