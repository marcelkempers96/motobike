// Clean 3D clips for the "viral" Reels: only the 3D canvas is captured (no page around it), frame-stepped at 30 fps.
// Usage: PROMO_OUT=dir node source/promo/viral.js [clip ...]     (server on http://localhost:8765)
// Then: python3 source/promo/viral_make.py <frames dir> <out dir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { VCLOCK, stepper, hide, center } = require('./step.js');
const BASE = 'http://localhost:8765/';
const FPS = 30;
const ZOOM = +(process.env.ZOOM || 14);
const real = (ms) => new Promise((r) => setTimeout(r, ms));

async function rec(p, name, sel, seconds, act, zoomOut = 0) {
  const dir = path.join(process.env.PROMO_OUT || '/tmp/viral', name);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const n = Math.round((+process.env.SECS || seconds) * FPS); let k = 0;
  // show only the canvas: everything else on the page is hidden
  await p.addStyleTag({ content: `body *{visibility:hidden!important} ${sel}{visibility:visible!important}` });
  const clip = await (await p.$(sel)).boundingBox();
  if (zoomOut) { await p.mouse.move(clip.x + clip.width / 2, clip.y + clip.height / 2); for (let i = 0; i < zoomOut; i++) { await p.mouse.wheel(0, 100); await p.evaluate((ms) => window.__step(ms), 1000 / FPS); } for (let i = 0; i < 20; i++) await p.evaluate((ms) => window.__step(ms), 1000 / FPS); }
  const frame = async () => {
    await p.evaluate((ms) => window.__step(ms), 1000 / FPS);
    await p.screenshot({ path: path.join(dir, String(k++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 93, clip });
  };
  await act(frame, n, clip);
  while (k < n) await frame();
  console.log(name, k, 'frames');
}
// drag across the canvas, one step per frame
async function turn(p, frame, clip, frames, dx, dy = 0) {
  let x = clip.x + clip.width * 0.25, y = clip.y + clip.height * 0.55;
  await p.mouse.move(x, y); await p.mouse.down();
  for (let i = 0; i < frames; i++) { const e = 0.5 - 0.5 * Math.cos(Math.PI * (i + 1) / frames), e0 = 0.5 - 0.5 * Math.cos(Math.PI * i / frames); x += dx * (e - e0); y += dy * (e - e0); await p.mouse.move(x, y); await frame(); }
  await p.mouse.up();
}
async function open(p, url, wait) {
  await p.goto(BASE + url, { waitUntil: 'load' }); await hide(p);
  const { settle } = await stepper(p); await real(wait); await settle(2); return settle;
}
async function bike(p, mode, secs = 4, dx = 420) {
  await open(p, 'overview/?mode=' + mode, 6000); await center(p, '#ute-moto-stage', 60);
  await rec(p, 'b_' + mode, '.mz3d-bike canvas', secs, async (f, n, c) => { await turn(p, f, c, n, dx, -6); }, ZOOM);
}
async function part(p, mode, id, secs = 4) {
  await open(p, 'overview/?mode=' + mode, 6000);
  await p.click(`.mz-part[data-part="${id}"]`); await real(3500); const { settle } = await stepper(p); await settle(1.5);
  await rec(p, `p_${mode}_${id}`, '#mz-cv3d canvas', secs, async (f, n, c) => { await turn(p, f, c, n, 300, -20); });
}
const C = {
  async assemble(p) {
    await open(p, 'engine/', 7000); await center(p, '#view', 60);
    const s = await p.$('#explode');
    const set = (v) => s.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
    await set(100); const { settle } = await stepper(p); await settle(1.5);
    await rec(p, 'assemble', '#view canvas', 6, async (f) => {
      for (let i = 0; i < 20; i++) await f();
      for (let i = 0; i <= 120; i++) { const k = i / 120, e = 1 - Math.pow(1 - k, 3); await set(100 * (1 - e)); await f(); }
    });
  },
  async brand(p) {
    await p.goto(BASE + 'brand/', { waitUntil: 'load' }); await hide(p);
    await p.waitForSelector('#mzb-stage[data-ready="1"]', { timeout: 90000 }); await real(5000);
    await center(p, '#mzb-stage', 60); const { settle } = await stepper(p); await settle(1);
    await rec(p, 'brand', '#mzb-stage canvas', 6, async () => {});
  },
};
for (const m of ['4t', '2t', 'sc', 'st', 'bb', 'cr', 'sb', 'cu', 'vt', 'pi', 'elec']) C['b_' + m] = (p) => bike(p, m, m === 'cr' ? 6 : m === 'pi' ? 3 : 2.4, m === 'cr' ? 600 : 300);
for (const [m, id] of [['4t', 'chain'], ['4t', 'spark_plug'], ['4t', 'battery'], ['4t', 'carb'], ['4t', 'clutch'], ['4t', 'rear_shock'], ['sb', 'brake'], ['sc', 'cvt'], ['4t', 'rear_sprocket']]) C[`p_${m}_${id}`] = (p) => part(p, m, id);

(async () => {
  const which = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(C);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
  for (const s of which) {
    const ctx = await b.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: +(process.env.DSF || 2.5), isMobile: true });
    await ctx.addInitScript(VCLOCK);
    const p = await ctx.newPage();
    try { await C[s](p); } catch (e) { console.log(s, 'FAILED', e.message.split('\n')[0]); }
    await ctx.close();
  }
  await b.close();
})();
