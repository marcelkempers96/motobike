/* ==========================================================================
   Moto Zero community: Share, About this tool, and Comments with photos
   at the end of every page; accounts and saved course progress (Supabase).
   Loaded by site.js. Supabase is only fetched when the section comes into
   view, so pages stay fast. With no keys in community-config.js the section
   shows Share (and tool notes) and says comments are coming soon.
   ========================================================================== */
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './community-config.js';

const ROOT = new URL('../', import.meta.url);
const href = (p) => new URL(p, ROOT).pathname;
const ON = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const SKIP = /^\/(privacy|terms|cookies|account|kids)\//;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function pageKey(path = location.pathname) {
  let p = path.replace(/index\.html$/, '');
  const base = ROOT.pathname;
  if (p.startsWith(base)) p = '/' + p.slice(base.length);
  if (!p.endsWith('/')) p += '/';
  return p;
}

/* ---------- Supabase client (lazy) ---------- */
let sbPromise = null;
export function supabase() {
  if (!ON) return Promise.resolve(null);
  if (!sbPromise) sbPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/+esm')
    .then((m) => m.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, detectSessionInUrl: true } }))
    .catch(() => null);
  return sbPromise;
}
export const photoURL = (path) => `${SUPABASE_URL}/storage/v1/object/public/uploads/${path}`;

/* ---------- Tool notes: what the tool does, how to use it, its limits ---------- */
const TOOLS = {
  '/overview/': ['3D Overview', 'An x-ray of complete motorcycles: eight bikes from a classic four-stroke to a superbike, a scooter, a boda boda and an electric scrambler.', [
    'Pick a bike from the list, then a category (Powertrain, Chassis, Electrical...) to see where those parts sit.',
    'Tap any part on the bike or in the list below it for a close-up, how it works and links to its repairs and spare parts.',
    'The models are generic, unbranded types. Use your own bike\'s manual for its exact parts and values.']],
  '/cockpit/': ['Cockpit', 'Ride a bike from the saddle: key, choke, clutch, gears, throttle and brakes, with live engine data and a dyno.', [
    'Follow the start steps, then use the keys or the on-screen controls to ride.',
    'The engine model is a teaching simulation; numbers show trends, not a specific bike\'s figures.']],
  '/engine/': ['Under the Engine', 'A 3D engine you can open: crank, piston, valves, clutch, gearbox and starter systems, each animated.', [
    'Choose a system, then turn the engine slowly to follow each part.',
    'Use it with the Module 2 chapters and the engine repair pages.']],
  '/wiring/': ['Wiring Lab and Circuit Builder', 'The course wiring plates made live, plus a breadboard to build and measure 12 V circuits.', [
    'Change battery, cable and load values to see voltage drop and current change.',
    'In the Circuit Builder, place parts, wire them, press Test and note readings to compare. The challenges have a checker.',
    'Circuits are solved with Ohm\'s law and nodal analysis. Part values are typical examples, not a specific bike.']],
  '/build/': ['Bike builder', 'Assemble a bike from parts and change its specification to see the effect on weight, power and handling.', [
    'Swap parts between models, then compare the graphs.',
    'Results are simplified models for learning, not design data.']],
  '/repair/diagnose/': ['Diagnose a problem', 'Three questions lead to the most likely problem pages for what you notice.', [
    'Answer from what you see, hear or feel, then follow the checks on the problem page.',
    'If a page says Do not ride, stop and get help first.']],
  '/models/': ['3D model library', 'Every 3D model used on the site, to rotate, inspect and download (CC BY-SA 4.0).', [
    'Open a model, tap its sub-parts, or download the GLB for Blender or any glTF viewer.']],
  '/quiz/': ['Quiz', 'Questions for every module, at three levels.', ['Your scores are saved with your progress, and to your account when you sign in.']],
};

/* ---------- Section ---------- */
function shareHTML(title, url) {
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const links = [
    ['WhatsApp', `https://wa.me/?text=${t}%20${u}`], ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['X', `https://twitter.com/intent/tweet?text=${t}&url=${u}`], ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['Telegram', `https://t.me/share/url?url=${u}&text=${t}`], ['Email', `mailto:?subject=${t}&body=${u}`],
  ];
  return `<div class="mzc-share"><h2>Share this page</h2><div class="mzc-btns">
    <button type="button" class="mzc-btn is-main" data-share>Share…</button>
    ${links.map(([n, l]) => `<a class="mzc-btn" href="${l}" target="_blank" rel="noopener">${n}</a>`).join('')}
    <button type="button" class="mzc-btn" data-copy>Copy link</button></div><p class="mzc-msg" aria-live="polite"></p></div>`;
}
function toolHTML(key) {
  const t = TOOLS[key];
  if (!t) return '';
  return `<div class="mzc-tool"><h2>About this tool</h2><p><b>${esc(t[0])}.</b> ${esc(t[1])}</p><ul>${t[2].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <p class="mzc-small">Found a mistake or have an idea for this tool? Leave a comment below or <a href="${href('contact/')}">contact the team</a>.</p></div>`;
}
function commentsShell() {
  return `<div class="mzc-comments" id="comments"><h2>Comments and photos</h2>
    <p class="mzc-small">Ask a question, add what worked on your bike, or share a photo of the job. Be kind and keep it about motorcycles.</p>
    <div class="mzc-form-slot">${ON ? '<p class="mzc-small">Loading…</p>' : '<p class="mzc-soon">Comments and photo uploads are coming soon.</p>'}</div>
    <ol class="mzc-list"></ol></div>`;
}

function mountSection() {
  const key = pageKey();
  if (SKIP.test(key) || document.documentElement.classList.contains('mz-embed') || document.querySelector('.mzc')) return;
  const foot = document.querySelector('footer[data-mz-footer], footer.mz-footer');
  const slot = document.querySelector('[data-mz-community]');
  if (!foot && !slot) return;
  const title = document.title.replace(/\s*\|\s*Moto Zero\s*$/, '');
  const sec = document.createElement('section');
  sec.className = 'mzc';
  sec.setAttribute('aria-label', 'Share and comments');
  sec.innerHTML = `<div class="mzc-in">${toolHTML(key)}${shareHTML(title, location.origin + location.pathname)}${commentsShell()}</div>`;
  if (slot) slot.replaceWith(sec); else foot.parentNode.insertBefore(sec, foot);
  wireShare(sec, title);
  if (!ON) return;
  const io = new IntersectionObserver((ents) => { if (ents.some((x) => x.isIntersecting)) { io.disconnect(); loadComments(sec, key); } }, { rootMargin: '400px' });
  io.observe(sec);
}

function wireShare(sec, title) {
  const msg = sec.querySelector('.mzc-msg');
  const url = location.origin + location.pathname;
  const share = sec.querySelector('[data-share]');
  if (!navigator.share) share.hidden = true;
  share.addEventListener('click', () => navigator.share({ title, url }).catch(() => {}));
  sec.querySelector('[data-copy]').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(url); msg.textContent = 'Link copied.'; } catch (e) { msg.textContent = url; }
  });
}

/* ---------- Comments ---------- */
async function loadComments(sec, key) {
  const sb = await supabase();
  const slot = sec.querySelector('.mzc-form-slot'), list = sec.querySelector('.mzc-list');
  if (!sb) { slot.innerHTML = '<p class="mzc-soon">Comments could not load. Please try again later.</p>'; return; }
  const { data: { session } } = await sb.auth.getSession();
  const me = session && session.user;
  let admin = false;
  if (me) { const { data } = await sb.from('profiles').select('is_admin').eq('id', me.id).maybeSingle(); admin = !!(data && data.is_admin); }
  slot.innerHTML = me ? formHTML() : `<p><a class="mzc-btn is-main" href="${href('account/')}?next=${encodeURIComponent(location.pathname + '#comments')}">Sign in to comment or add a photo</a> <span class="mzc-small">Free, with just your email.</span></p>`;
  const render = async () => {
    const { data, error } = await sb.from('comments').select('id, body, photo_path, created_at, user_id, hidden, profiles(display_name)').eq('page', key).order('created_at', { ascending: false }).limit(100);
    if (error) { list.innerHTML = '<li class="mzc-small">Comments could not load.</li>'; return; }
    list.innerHTML = data.length ? data.map((c) => `<li class="mzc-c${c.hidden ? ' is-hidden' : ''}">
      <div class="mzc-meta"><b>${esc(c.profiles ? c.profiles.display_name : 'Rider')}</b> · <time datetime="${c.created_at}">${new Date(c.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</time>${c.hidden ? ' · hidden' : ''}
      ${me && (me.id === c.user_id || admin) ? `<button type="button" class="mzc-del" data-del="${c.id}">Delete</button>` : ''}${admin && !c.hidden ? `<button type="button" class="mzc-del" data-hide="${c.id}">Hide</button>` : ''}</div>
      <p>${esc(c.body).replace(/\n/g, '<br>')}</p>
      ${c.photo_path ? `<a href="${photoURL(c.photo_path)}" target="_blank" rel="noopener"><img src="${photoURL(c.photo_path)}" alt="Photo added by ${esc(c.profiles ? c.profiles.display_name : 'a rider')}" loading="lazy"></a>` : ''}</li>`).join('') : '<li class="mzc-small">No comments yet. Be the first.</li>';
    list.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', async () => {
      if (!confirm('Delete this comment?')) return;
      await sb.from('comments').delete().eq('id', b.dataset.del); render();
    }));
    list.querySelectorAll('[data-hide]').forEach((b) => b.addEventListener('click', async () => { await sb.from('comments').update({ hidden: true }).eq('id', b.dataset.hide); render(); }));
  };
  render();
  const form = slot.querySelector('form');
  if (!form) return;
  const out = form.querySelector('.mzc-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = form.body.value.trim();
    if (!body) { out.textContent = 'Write something first.'; return; }
    const btn = form.querySelector('button[type=submit]'); btn.disabled = true; out.textContent = 'Posting…';
    try {
      let photo_path = null;
      const file = form.photo.files[0];
      if (file) {
        const blob = await shrink(file);
        photo_path = `${me.id}/${Date.now()}.jpg`;
        const up = await sb.storage.from('uploads').upload(photo_path, blob, { contentType: 'image/jpeg', upsert: false });
        if (up.error) throw up.error;
      }
      const { error } = await sb.from('comments').insert({ page: key, body, photo_path });
      if (error) throw error;
      form.reset(); out.textContent = 'Posted. Thank you.'; render();
    } catch (err) { out.textContent = 'That did not work: ' + (err.message || 'please try again.'); }
    btn.disabled = false;
  });
}
function formHTML() {
  return `<form class="mzc-form"><label class="mzc-l" for="mzc-body">Your comment</label>
    <textarea id="mzc-body" name="body" rows="4" maxlength="4000" required placeholder="What did you find? Which bike? What fixed it?"></textarea>
    <div class="mzc-row"><label class="mzc-file">Add a photo (optional) <input type="file" name="photo" accept="image/jpeg,image/png,image/webp"></label>
    <button type="submit" class="mzc-btn is-main">Post</button></div><p class="mzc-msg" aria-live="polite"></p></form>`;
}
/* Resize a photo in the browser to at most 1600 px and re-encode as JPEG (smaller upload, no GPS data). */
async function shrink(file) {
  const img = await createImageBitmap(file).catch(() => null);
  if (!img) throw new Error('This file is not an image we can read.');
  const k = Math.min(1, 1600 / Math.max(img.width, img.height));
  const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return new Promise((res) => c.toBlob(res, 'image/jpeg', 0.82));
}

/* ---------- Progress sync (signed-in learners) ---------- */
const PKEY = 'mz-progress-v1';
function merge(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) return [...new Set([...(a || []), ...(b || [])])];
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const o = { ...a };
    for (const k of Object.keys(b)) o[k] = k in a ? merge(a[k], b[k]) : b[k];
    return o;
  }
  if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b);
  if (typeof a === 'boolean' || typeof b === 'boolean') return !!(a || b);
  return b ?? a;
}
export async function syncProgress() {
  const sb = await supabase();
  if (!sb) return;
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return;
  let local = null;
  try { local = JSON.parse(localStorage.getItem(PKEY)); } catch (e) { /* noop */ }
  const { data } = await sb.from('progress').select('data').eq('user_id', session.user.id).maybeSingle();
  const remote = data && data.data && data.data.v === 1 ? data.data : null;
  const both = remote && local ? merge(remote, local) : (local || remote);
  if (!both) return;
  try { localStorage.setItem(PKEY, JSON.stringify(both)); } catch (e) { /* noop */ }
  await sb.from('progress').upsert({ user_id: session.user.id, data: both, updated_at: new Date().toISOString() });
  let t = null;
  window.addEventListener('mz-progress', () => {
    clearTimeout(t);
    t = setTimeout(async () => {
      let d = null; try { d = JSON.parse(localStorage.getItem(PKEY)); } catch (e) { /* noop */ }
      if (d) await sb.from('progress').upsert({ user_id: session.user.id, data: d, updated_at: new Date().toISOString() });
    }, 1500);
  });
}

/* ---------- Start ---------- */
function start() {
  mountSection();
  // Apps (Overview, Cockpit) draw their footer later and may redraw the page: keep the section in place.
  let t = null;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => { if (!document.querySelector('.mzc')) mountSection(); }, 200); })
    .observe(document.body, { childList: true, subtree: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
// Sync quietly on pages where progress changes, once the browser is idle.
if (ON) setTimeout(() => {
  let signed = false;
  try { signed = Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k)); } catch (e) { /* noop */ }
  if (signed && !/^\/account\//.test(pageKey())) syncProgress();
}, 2500);
