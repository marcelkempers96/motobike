// Motopedia promo clips: scripted screen recordings of the site, 4 to 7 seconds each.
// Usage: node source/promo/record.js [scene ...]   (server on http://localhost:8765)
// Frames are captured with the Chrome screencast at full quality, then promo/make.sh turns them
// into 1080x1080 MP4s with a caption and the logo.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = process.env.PROMO_OUT || '/tmp/promo';
const BASE = 'http://localhost:8765/';
const W = 1080, H = 1080;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let K = 1;                                   // page clock speed during a scene (0.25 = four times slower)
const ws = (ms) => sleep(ms / K);            // wait an amount of page time
// Slow the page clock so heavy 3D renders more frames per page-second; the video is sped up again.
const SLOWCLOCK = (k) => { const pn = performance.now.bind(performance), dn = Date.now, t0 = pn(), d0 = dn();
  performance.now = () => t0 + (pn() - t0) * k; Date.now = () => d0 + (dn() - d0) * k;
  const raf = window.requestAnimationFrame.bind(window); window.requestAnimationFrame = (cb) => raf(() => cb(performance.now()));
  const st = window.setTimeout.bind(window), si = window.setInterval.bind(window);
  window.setTimeout = (f, d, ...a) => st(f, (d || 0) / k, ...a); window.setInterval = (f, d, ...a) => si(f, (d || 0) / k, ...a); };

async function record(page, name, seconds, act) {
  seconds = seconds / K;
  const dir = path.join(OUT, name);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', async (f) => {
    const n = String(frames.length).padStart(5, '0');
    fs.writeFileSync(path.join(dir, n + '.jpg'), Buffer.from(f.data, 'base64'));
    frames.push([n, f.metadata.timestamp]);
    try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) { /* closed */ }
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  const t0 = Date.now();
  const done = act();
  await Promise.race([done, sleep(seconds * 1000 + 4000)]);
  const left = seconds * 1000 - (Date.now() - t0);
  if (left > 0) await sleep(left);
  await cdp.send('Page.stopScreencast');
  await sleep(300);
  // concat list with real frame durations (the screencast is variable-rate)
  let list = '';
  for (let i = 0; i < frames.length; i++) {
    const d = (i + 1 < frames.length ? frames[i + 1][1] - frames[i][1] : 1 / 30 / K) * K;
    list += `file '${frames[i][0]}.jpg'\nduration ${Math.max(0.01, d).toFixed(4)}\n`;
  }
  if (frames.length) list += `file '${frames[frames.length - 1][0]}.jpg'\n`;
  fs.writeFileSync(path.join(dir, 'list.txt'), list);
  console.log(name, frames.length, 'frames', ((Date.now() - t0) / 1000).toFixed(1) + 's');
}

const hideChrome = (p) => p.addStyleTag({ content: '.mz-cookie,.mz-gate,[data-mz-cookie],.mz-lang{display:none!important} ::-webkit-scrollbar{display:none} html{scrollbar-width:none}' });
async function smoothScroll(p, to, ms) {
  await p.evaluate(async ([to, ms]) => {
    const from = scrollY, t0 = performance.now();
    await new Promise((res) => { const step = (t) => { const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; scrollTo(0, from + (to - from) * e); k < 1 ? requestAnimationFrame(step) : res(); }; requestAnimationFrame(step); });
  }, [to, ms]);
}
let MX = 540, MY = 540;
async function glide(p, x, y, ms) {          // move the mouse over ms of page time
  const n = Math.max(6, Math.round(ms / 33));
  for (let i = 1; i <= n; i++) { const e = i / n, k = e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2; await p.mouse.move(MX + (x - MX) * k, MY + (y - MY) * k); await ws(ms / n); }
  MX = x; MY = y;
}
async function moveClick(p, sel, ms = 500) {
  const el = typeof sel === 'string' ? await p.$(sel) : sel; if (!el) return;
  const b = await el.boundingBox(); if (!b) return;
  await glide(p, b.x + b.width / 2, b.y + b.height / 2, ms);
  await p.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
}
async function cursor(p) {   // a visible pointer, since screen captures do not include the OS cursor
  await p.addStyleTag({ content: '#mzc{position:fixed;z-index:99999;width:26px;height:26px;margin:-4px 0 0 -4px;pointer-events:none;background:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M3 2l7 19 2.6-7.6L20 11z%27 fill=%27%23111%27 stroke=%27%23fff%27 stroke-width=%271.5%27/%3E%3C/svg%3E") no-repeat;transition:transform .12s} #mzc.dn{transform:scale(.85)}' });
  await p.evaluate(() => { const c = document.createElement('div'); c.id = 'mzc'; c.style.left = '-50px'; document.body.appendChild(c);
    addEventListener('mousemove', (e) => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
    addEventListener('mousedown', () => c.classList.add('dn'), true); addEventListener('mouseup', () => c.classList.remove('dn'), true); });
}

const SCENES = {
  // 1. 3D Overview: the bike turning, then a part is selected
  async overview(p) {
    await p.goto(BASE + 'overview/?mode=4t', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(5000);
    await p.evaluate(() => { const e = document.querySelector('#ute-moto-stage'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 120); });
    await record(p, 'overview', 6, async () => {
      await moveClick(p, 'button:has-text("3/4")', 600); await ws(900);
      const eng = await p.$('.ute-moto-wrap ~ * button:has-text("Engine"), button:text-is("Engine")'); if (eng) { await moveClick(p, eng, 700); await ws(1300); }
      await moveClick(p, 'button:has-text("Run the bike")', 700); await ws(1800);
    });
  },
  // 2. Chain and sprockets running
  async chain(p) {
    await p.addInitScript(() => { try { localStorage.setItem('mz-split', '80'); } catch (e) {} });
    await p.goto(BASE + 'overview/?part=chain', { waitUntil: 'networkidle' }); await hideChrome(p); await ws(6000);
    await p.evaluate(() => { const e = document.querySelector('#mz-cv3d'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 150); });
    await record(p, 'chain', 5, async () => { await ws(5000); });
  },
  // 3. Bike builder fitting the parts
  async builder(p) {
    await p.goto(BASE + 'build/?bike=4t', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(4500);
    await record(p, 'builder', 6, async () => { await moveClick(p, '#bb-auto', 700); await ws(4800); });
  },
  // 4. Wiring Lab: starting circuit, then the charging circuit
  async wiring(p) {
    await p.goto(BASE + 'wiring/#starting', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(3000);
    const fr = await p.$('#mz-wiring'); if (fr) await fr.scrollIntoViewIfNeeded();
    await record(p, 'wiring', 6, async () => {
      const f = await fr.contentFrame(); await ws(1200);
      const tab = await f.$('[data-tab="charging"], a[href="#charging"], button:has-text("Charging")');
      if (tab) { const b = await tab.boundingBox(), o = await fr.boundingBox(); await p.mouse.move(o.x + b.x + b.width / 2, o.y + b.y + b.height / 2, { steps: 30 }); await tab.click(); }
      await ws(3500);
    });
  },
  // 5. Circuit Builder: a relay drives the horn
  async circuit(p) {
    await p.goto(BASE + 'wiring/#build=relay-horn', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(2500);
    await p.evaluate(() => document.querySelector('#builder').scrollIntoView({ block: 'start' })); await p.evaluate(() => scrollBy(0, -70));
    await record(p, 'circuit', 5, async () => { await ws(600); await moveClick(p, '#builder button:has-text("Test")', 700); await ws(3200); });
  },
  // 6. Under the Engine: running, then exploded
  async engine(p) {
    await p.goto(BASE + 'engine/', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(6000);
    const ts = await p.$('[data-ts="0.2"]'); if (ts) await ts.click();
    const k = await p.$('#bElec'); if (k) { await k.dispatchEvent('pointerdown'); await ws(1500); await k.dispatchEvent('pointerup'); }
    await record(p, 'engine', 7, async () => {
      await ws(1500);
      const s = await p.$('#explode'); if (s) { for (let v = 0; v <= 85; v += 3) { await s.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await ws(70); } }
      await ws(2500);
    });
  },
  // 7. Cockpit: engine running, revving, dyno graph drawing
  async cockpit(p) {
    await p.goto(BASE + 'cockpit/', { waitUntil: 'networkidle' }); await hideChrome(p); await ws(5000);
    await p.keyboard.press('k'); await ws(300); await p.keyboard.down('s'); await ws(1800); await p.keyboard.up('s'); await ws(800);
    await p.keyboard.down('c'); await p.keyboard.press('ArrowDown'); await ws(300); await p.keyboard.up('c'); await ws(400);
    await p.keyboard.press('g'); await ws(300);
    await record(p, 'cockpit', 7, async () => { await p.keyboard.down('t'); await ws(4200); await p.keyboard.up('t'); await ws(2000); });
  },
  // 8. Repair: diagnose a problem, then the problem page with photos
  async repair(p) {
    await p.goto(BASE + 'repair/diagnose/', { waitUntil: 'networkidle' }); await hideChrome(p); await cursor(p); await ws(1200);
    await record(p, 'repair', 7, async () => {
      await moveClick(p, '[data-bike="petrol"]', 600); await ws(700);
      await moveClick(p, '[data-sys="brakes"]', 600); await ws(800);
      await moveClick(p, '.dg-opts [data-p]', 600); await ws(1000);
      await moveClick(p, '.dg-go', 600); await ws(900);
      await smoothScroll(p, await p.evaluate(() => (document.querySelector('.r-photos')?.getBoundingClientRect().top || 600) + scrollY - 120), 900); await ws(800);
    });
  },
  // 9. The course: a chapter with equations and a 3D model
  async course(p) {
    await p.goto(BASE + 'learn/#m1-physics', { waitUntil: 'networkidle' }); await hideChrome(p); await ws(2500);
    await record(p, 'course', 6, async () => { await ws(500); await smoothScroll(p, await p.evaluate(() => document.querySelector('.mz-eq').getBoundingClientRect().top + scrollY - 140), 1800); await ws(800); await smoothScroll(p, await p.evaluate(() => scrollY + 700), 1600); await ws(800); });
  },
  // 10. Home page: logo, tools and the repair section
  async home(p) {
    await p.goto(BASE, { waitUntil: 'networkidle' }); await hideChrome(p); await ws(1500);
    await record(p, 'home', 6, async () => { await ws(1200); await smoothScroll(p, await p.evaluate(() => document.querySelector('.hm-tools').getBoundingClientRect().top + scrollY - 260), 1400); await ws(700); await smoothScroll(p, await p.evaluate(() => document.querySelector('.hm-fix-common').getBoundingClientRect().top + scrollY - 300), 1800); await ws(800); });
  },
};

(async () => {
  const which = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SCENES);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
  const SLOW = { overview: 0.1, chain: 0.2, builder: 0.25, engine: 0.25, cockpit: 0.3, wiring: 0.5 };
  for (const s of which) {
    K = SLOW[s] || 1;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    if (K !== 1) await ctx.addInitScript(SLOWCLOCK, K);
    await ctx.addInitScript(() => { try { localStorage.setItem('mz-cookie', 'ok'); localStorage.setItem('mz-consent', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    try { await SCENES[s](p); } catch (e) { console.log(s, 'FAILED', e.message.split('\n')[0]); }
    await ctx.close();
  }
  await b.close();
})();
