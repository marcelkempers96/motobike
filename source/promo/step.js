// Frame-stepped recording for heavy 3D scenes: a virtual clock advances exactly 1/30 s per frame and each
// frame is captured, so the clip plays at a steady 30 fps however slowly the machine renders.
// Usage: node source/promo/step.js [scene ...]   (server on http://localhost:8765)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = process.env.PROMO_OUT || '/tmp/promo';
const BASE = 'http://localhost:8765/';
const FPS = 30, W = 1080, H = 1080;

// Installed before any page script: time only moves when the recorder says so.
function VCLOCK() {
  let vt = 0; const d0 = Date.now(); let rafs = []; let timers = []; let tid = 1;
  const realST = window.setTimeout.bind(window);
  performance.now = () => vt; Date.now = () => d0 + vt;
  window.requestAnimationFrame = (cb) => { rafs.push([tid, cb]); return tid++; };
  window.cancelAnimationFrame = (id) => { rafs = rafs.filter((r) => r[0] !== id); };
  window.setTimeout = (f, d, ...a) => { const id = tid++; timers.push({ id, due: vt + (d || 0), f: typeof f === 'function' ? () => f(...a) : () => {} }); return id; };
  window.clearTimeout = (id) => { timers = timers.filter((t) => t.id !== id); };
  window.setInterval = (f, d, ...a) => { const id = tid++; const iv = { id, due: vt + (d || 0), every: Math.max(1, d || 0), f: () => f(...a) }; timers.push(iv); return id; };
  window.clearInterval = window.clearTimeout;
  window.__step = (ms) => {
    const end = vt + ms;
    for (;;) {   // fire timers in order up to the end of this frame
      timers.sort((a, b) => a.due - b.due);
      const t = timers[0]; if (!t || t.due > end) break;
      vt = Math.max(vt, t.due);
      if (t.every) t.due += t.every; else timers.shift();
      try { t.f(); } catch (e) { console.error(e); }
    }
    vt = end;
    const now = rafs; rafs = [];
    for (const [, cb] of now) { try { cb(vt); } catch (e) { console.error(e); } }
  };
  window.__realTimeout = realST;
}

async function stepper(p) {
  const step = async (n = 1) => { for (let i = 0; i < n; i++) await p.evaluate((ms) => window.__step(ms), 1000 / FPS); };
  const settle = async (seconds) => { const n = Math.round(seconds * FPS); for (let i = 0; i < n; i++) { await p.evaluate((ms) => window.__step(ms), 1000 / FPS); if (i % 10 === 0) await new Promise((r) => setTimeout(r, 15)); } };
  return { step, settle };
}

async function recordFrames(p, name, seconds, act) {
  const OUT = process.env.PROMO_OUT || '/tmp/promo';
  const dir = path.join(OUT, name);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(seconds * FPS); let k = 0;
  const frame = async () => {
    await p.evaluate((ms) => window.__step(ms), 1000 / FPS);
    await p.screenshot({ path: path.join(dir, String(k++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
  };
  await act(frame, n);
  while (k < n) await frame();
  let list = '';
  for (let i = 0; i < k; i++) list += `file '${String(i).padStart(5, '0')}.jpg'\nduration ${(1 / FPS).toFixed(5)}\n`;
  list += `file '${String(k - 1).padStart(5, '0')}.jpg'\n`;
  fs.writeFileSync(path.join(dir, 'list.txt'), list);
  console.log(name, k, 'frames');
}

const hide = (p) => p.addStyleTag({ content: '.mz-cookie,.mz-gate,.mz-lang,.mz3d-tip,#tip{display:none!important} ::-webkit-scrollbar{display:none}' });
const center = async (p, sel, off) => { await p.evaluate(([s, o]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - o); }, [sel, off]); };
// drag across an element over a number of frames (orbits the 3D view)
async function orbit(p, frame, sel, frames, dx, dy = 0, from = [0.3, 0.55]) {
  const b = await (await p.$(sel)).boundingBox();
  let x = b.x + b.width * from[0], y = b.y + b.height * from[1];
  await p.mouse.move(x, y); await p.mouse.down();
  for (let i = 0; i < frames; i++) { x += dx / frames; y += dy / frames; await p.mouse.move(x, y); await frame(); }
  await p.mouse.up();
}

const SCENES = {
  // the bike turns slowly all the way round, then a part is selected
  async bike(p, mode, name) {
    await p.goto(BASE + 'overview/?mode=' + mode, { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 5000)); await settle(3);
    await center(p, '#ute-moto-stage', 120); await settle(0.5);
    await recordFrames(p, name, 5, async (frame) => {
      for (let i = 0; i < 8; i++) await frame();
      await orbit(p, frame, '#ute-moto-stage', 120, 300, -20, [0.3, 0.5]);
      for (let i = 0; i < 12; i++) await frame();
    });
  },
  // classic bike: tap a part in the list, the part opens on the right and turns
  async overview_click(p) {
    await p.goto(BASE + 'overview/?mode=4t', { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 5000)); await settle(3);
    await center(p, '#ute-moto-stage', 120); await settle(0.5);
    await recordFrames(p, 'overview_click', 5.5, async (frame) => {
      await orbit(p, frame, '#ute-moto-stage', 30, 120, 0, [0.35, 0.5]);
      await p.click('.mz-part[data-part="clutch"]');
      for (let i = 0; i < 8; i++) { await frame(); await new Promise((r) => setTimeout(r, 300)); }   // let the clutch model load
      await orbit(p, frame, '#mz-cv3d', 55, 160, -20, [0.3, 0.5]);                                     // turn the clutch
      const sub = await p.$('#mz-subparts .mz-sub:nth-child(3)') || await p.$('#mz-subparts .mz-sub');
      if (sub) await sub.click();                                                                       // select one part: it highlights and the view zooms in
      for (let i = 0; i < 40; i++) await frame();
    });
  },
  // three bikes in quick succession, each spinning fast
  async fast(p, mode, name) {
    await p.goto(BASE + 'overview/?mode=' + mode, { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 5000)); await settle(3);
    await center(p, '#ute-moto-stage', 120); await settle(0.5);
    await recordFrames(p, name, 2.2, async (frame) => { await orbit(p, frame, '#ute-moto-stage', 62, 420, -10, [0.25, 0.5]); });
  },
  async fast_sb(p) { await SCENES.fast(p, 'sb', 'fast_sb'); },
  async fast_vt(p) { await SCENES.fast(p, 'vt', 'fast_vt'); },
  async fast_cu(p) { await SCENES.fast(p, 'cu', 'fast_cu'); },
  async overview(p) { await SCENES.bike(p, '4t', 'overview'); },
  async bikes_sb(p) { await SCENES.bike(p, 'sb', 'bikes_sb'); },
  async bikes_vt(p) { await SCENES.bike(p, 'vt', 'bikes_vt'); },
  // engine already running when the clip starts; orbit round it, then explode it
  async engine(p) {
    await p.goto(BASE + 'engine/', { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 6000)); await settle(2);
    await center(p, '#view', 70);
    await p.click('[data-ts="0.2"]'); await p.click('#bElec').catch(() => {});
    await p.dispatchEvent('#bElec', 'pointerdown').catch(() => {}); await settle(2.5); await p.dispatchEvent('#bElec', 'pointerup').catch(() => {});
    await p.click('#bKick').catch(() => {}); await settle(3);
    await recordFrames(p, 'engine', 6, async (frame) => {
      await orbit(p, frame, '#view', 75, 260, -10, [0.3, 0.5]); { const b = await (await p.$('#view')).boundingBox(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2); }
      const s = await p.$('#explode');
      for (let v = 0; v <= 90; v += 1.5) { await s.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.mouse.wheel(0, 14); await frame(); }
    });
  },
  // the carburettor turned by hand inside course chapter 3.1
  async carb(p) {
    await p.goto(BASE + 'learn/#m3-mixture', { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 2500)); await settle(1);
    await center(p, '.mz-learn-model', 160); await new Promise((r) => setTimeout(r, 4000)); await settle(2);
    await recordFrames(p, 'carb', 3.5, async (frame) => { await orbit(p, frame, '.mz-learn-model canvas', 95, 420, -40, [0.3, 0.55]); });
  },
  // the bike builder fitting its parts
  async builder(p) {
    await p.goto(BASE + 'build/?bike=4t', { waitUntil: 'load' }); await hide(p);
    const { settle } = await stepper(p); await new Promise((r) => setTimeout(r, 4500)); await settle(2);
    await recordFrames(p, 'builder', 5, async (frame) => { await p.click('#bb-auto'); });
  },
};

module.exports = { VCLOCK, stepper, recordFrames, orbit, hide, center };
if (require.main === module) (async () => {
  const which = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
  for (const s of which) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await ctx.addInitScript(VCLOCK);
    await ctx.addInitScript(() => { try { localStorage.setItem('mz-split', '40'); } catch (e) {} });
    const p = await ctx.newPage();
    try { await SCENES[s](p); } catch (e) { console.log(s, 'FAILED', e.message.split('\n')[0]); }
    await ctx.close();
  }
  await b.close();
})();
