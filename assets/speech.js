/* ==========================================================================
   Listen: reads the main text of a page aloud with the best voice the
   device has (natural/neural voices first), in the page's current language
   (also after translation). Play, pause, stop and speed; the paragraph being
   read is highlighted. Uses the browser's speech synthesis: no data leaves
   the device except where the browser's own voices are online voices.
   ========================================================================== */
const synth = window.speechSynthesis;
const MAIN = ['.r-main', '.sp-main', 'main', 'article', '.ute-page'];
const SKIP = 'nav, header.ute-top, footer, script, style, noscript, button, select, input, textarea, svg, canvas, .mzc, .mz-signup, .r-crumb, .sp-crumb, .r-photos, figure, .mz-listen, [aria-hidden="true"], .r-search, .bk-filter, .r-jump, details.rsrc, .mz3d, .ute-modal, .mz-gate';
const BLOCKS = 'h1, h2, h3, h4, p, li, td, th, dt, dd, blockquote, figcaption';
const SPEEDS = [0.85, 1, 1.15, 1.3];
let queue = [], idx = 0, state = 'idle', rate = 1, box = null, current = null;

function lang() {
  const l = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  const gt = (document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z-]+)/) || [])[1];
  return (gt || l).toLowerCase();
}
function bestVoice() {
  const all = synth.getVoices();
  if (!all.length) return null;
  const want = lang().split('-')[0];
  const pool = all.filter((v) => v.lang.toLowerCase().startsWith(want));
  const list = pool.length ? pool : all.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const score = (v) => (/natural|neural|online|premium|enhanced/i.test(v.name) ? 4 : 0) + (/google/i.test(v.name) ? 2 : 0)
    + (/en-gb|en-us/i.test(v.lang) && want === 'en' ? 1 : 0) + (v.localService ? 0 : 1);
  return list.sort((a, b) => score(b) - score(a))[0] || null;
}
function collect() {
  const root = MAIN.map((s) => document.querySelector(s)).find(Boolean) || document.body;
  const out = [];
  root.querySelectorAll(BLOCKS).forEach((el) => {
    if (el.closest(SKIP)) return;
    if (el.querySelector(BLOCKS)) return;           // read the innermost block only
    const t = (el.innerText || '').replace(/\s+/g, ' ').trim();
    if (t.length < 2) return;
    // split long blocks into sentences of a manageable size (long utterances stop in some browsers)
    const parts = t.match(/[^.!?;:]+[.!?;:]*\s*/g) || [t];
    let buf = '';
    for (const s of parts) {
      if ((buf + s).length > 220 && buf) { out.push([el, buf.trim()]); buf = ''; }
      buf += s;
    }
    if (buf.trim()) out.push([el, buf.trim()]);
  });
  return out;
}
function mark(el) {
  if (current) current.classList.remove('mz-reading');
  current = el;
  if (el) { el.classList.add('mz-reading'); const r = el.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight - 90) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
}
function speakNext() {
  if (state !== 'playing') return;
  if (idx >= queue.length) { stop(); return; }
  const [el, text] = queue[idx];
  mark(el);
  const u = new SpeechSynthesisUtterance(text);
  const v = bestVoice();
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lang();
  u.rate = rate;
  u.onend = () => { if (state === 'playing') { idx += 1; speakNext(); } };
  u.onerror = () => { if (state === 'playing') { idx += 1; speakNext(); } };
  synth.speak(u);
}
function play() {
  if (state === 'paused') { state = 'playing'; synth.resume(); ui(); return; }
  synth.cancel();
  queue = collect(); idx = 0; state = 'playing'; ui(); speakNext();
}
function pause() { if (state !== 'playing') return; state = 'paused'; synth.pause(); ui(); }
function stop() { state = 'idle'; synth.cancel(); mark(null); ui(); }
function ui() {
  if (!box) return;
  box.dataset.state = state;
  box.querySelector('.mz-listen-play').textContent = state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : 'Listen to this page';
  box.querySelector('.mz-listen-play').setAttribute('aria-pressed', String(state === 'playing'));
  box.querySelector('.mz-listen-stop').hidden = state === 'idle';
  box.querySelector('.mz-listen-rate').hidden = state === 'idle';
}
function mount() {
  if (!synth || document.querySelector('.mz-listen') || document.documentElement.classList.contains('mz-embed')) return;
  if (box && !box.isConnected) { stop(); box = null; }
  if (/^\/(account|privacy|terms|cookies)\//.test(location.pathname)) return;
  const h1 = document.querySelector('.r-main h1, .sp-main h1, main h1, .ute-hero h1, h1') || document.querySelector('main h2, .ute-chapter h2');
  if (!h1) return;
  box = document.createElement('div');
  box.className = 'mz-listen';
  box.innerHTML = `<button type="button" class="mz-listen-play" aria-pressed="false"><span aria-hidden="true">🔊</span> Listen to this page</button>
    <button type="button" class="mz-listen-stop" hidden>Stop</button>
    <button type="button" class="mz-listen-rate" hidden title="Reading speed">1×</button>`;
  h1.insertAdjacentElement('afterend', box);
  box.querySelector('.mz-listen-play').addEventListener('click', () => (state === 'playing' ? pause() : play()));
  box.querySelector('.mz-listen-stop').addEventListener('click', stop);
  const rb = box.querySelector('.mz-listen-rate');
  rb.addEventListener('click', () => {
    rate = SPEEDS[(SPEEDS.indexOf(rate) + 1) % SPEEDS.length]; rb.textContent = rate + '×';
    if (state === 'playing') { synth.cancel(); speakNext(); }
  });
  synth.getVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {};
  addEventListener('pagehide', () => synth.cancel());
  ui();
}
// Pages that draw their content later or redraw it (course, Overview) get the button back.
function start() {
  mount();
  let t = null;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => { if (!box || !box.isConnected) { box = null; mount(); } }, 250); })
    .observe(document.body, { childList: true, subtree: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
