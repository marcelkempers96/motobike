/* ==========================================================================
   Moto Zero: motorcycle types. Timeline, family filters, card grid and a
   full view per type (deep links #boda-boda, #cafe-racer ...). Content comes
   from types/motorcycle-types.json; plates are inlined from types/plates/.
   ========================================================================== */
import { recordTool } from './progress.js';

const BASE = new URL('../types/', import.meta.url);
const at = (p) => new URL(p, BASE).href;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
const famVar = (f) => `var(--f-${f})`;
const pad = (n) => String(n).padStart(2, '0');

/* Where each type is taught in the course. */
const LEARN = {
  pioneer: ['m1-history-systems', 'Module 1, chapter 1.1'],
  'vintage-vtwin': ['m1-history-systems', 'Module 1, chapter 1.1'],
  scooter: ['m4-final-drive', 'Module 4, final drive and CVT'],
  'step-through': ['m1-types', 'Module 1, chapter 1.2'],
  standard: ['m1-types', 'Modules 01 to 04'],
  'cafe-racer': ['m1-types', 'Module 1, chapter 1.2'],
  motocross: ['m2-two-stroke', 'Modules 02 and 04'],
  trials: ['m4-frame-steering', 'Module 4, chassis'],
  cruiser: ['m1-types', 'Module 1, chapter 1.2'],
  superbike: ['m2-four-stroke', 'Modules 02 and 04'],
  touring: ['m4-final-drive', 'Module 4, drivetrain'],
  adventure: ['m4-suspension', 'Module 4, chassis'],
  'boda-boda': ['m1-types', 'Modules 01 and 05'],
  naked: ['m4-frame-steering', 'Module 4, chassis'],
  'electric-motorcycle': ['m5-architecture', 'Module 5'],
  'electric-scooter': ['m5-batteries', 'Module 5'],
};

let TYPES = [], FAMILIES = {}, filter = null, current = -1, view = 'plate', lastFocus = null, look = 'plate', photoIx = 0;
try { if (localStorage.getItem('mz-types-look') === 'photo') look = 'photo'; } catch (e) { /* ignore */ }

/* Photographs: a list per type (t.photos), or the older photo/photo2 fields.
   A photo may carry a local file (self-hosted copy) or a Wikimedia src. */
const photosOf = (t) => (t.photos && t.photos.length ? t.photos : [t.photo, t.photo2].filter(Boolean));
const photoSrc = (p, w = 1600) => (p.file ? at(p.file) : String(p.src || '').replace(/width=\d+/, 'width=' + w));
const lookSrc = (t, w) => { const p = photosOf(t)[0]; return look === 'photo' && p ? photoSrc(p, w) : at(t.thumb); };
const credit = (p) => (p.verified
  ? `${esc(p.subject)}. Photo: ${esc(p.author)}, <a href="${esc(p.licence_url)}" target="_blank" rel="noopener">${esc(p.licence)}</a>${p.page ? `, via <a href="${esc(p.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>` : ''}.`
  : `${esc(p.subject)}. Photo via <a href="${esc(p.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>; author and licence on the file page.`);
/* if a photograph cannot load, fall back to the plate thumbnail */
const fallbackImg = (img, t) => img.addEventListener('error', () => { if (!img.dataset.fb) { img.dataset.fb = '1'; img.src = at(t.thumb); img.closest('[data-i]')?.classList.add('no-photo'); } }, { once: false });

const plateCache = new Map();

function buildRail() {
  const rail = $('#rail');
  const draw = () => {
    const W = rail.clientWidth || 1200, y0 = 1880, y1 = 2030;
    const px = (y) => ((y - y0) / (y1 - y0)) * W;
    let h = '<div class="axis"></div>';
    for (let y = y0; y <= y1; y += 10) h += `<span class="tick" style="left:${px(y)}px">${y}</span>`;
    const rows = [];           // right edge (px) of the last item in each row
    const ROW = 94, ITEM = 112; // row height and item width, so nothing overlaps
    TYPES.map((t, i) => ({ t, i })).sort((a, b) => a.t.start - b.t.start).forEach(({ t, i }) => {
      const x = px(t.start), left = x - ITEM / 2;
      let r = 0;
      while (rows[r] !== undefined && left < rows[r] + 6) r++;
      rows[r] = left + ITEM;
      h += `<button type="button" data-i="${i}" style="left:${x}px;top:${r * ROW}px;bottom:24px;--fam:${famVar(t.family)}" aria-label="${esc(t.name)}, ${t.start}">
        <span class="th"><img src="${lookSrc(t, 240)}" alt="" loading="lazy"></span><span class="lb">${esc(t.name.replace(/ and .*/, ''))} · ${t.start}</span><i></i><span class="stem"></span></button>`;
    });
    const H = Math.max(rows.length, 1) * ROW + 60;
    rail.style.height = H + 'px';
    rail.innerHTML = h;
    rail.querySelectorAll('button[data-i] img').forEach((img) => fallbackImg(img, TYPES[+img.closest('[data-i]').dataset.i]));
    applyFilter();
  };
  draw();
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(draw, 150); });
  rail.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) open(+b.dataset.i); });
  /* hover a timeline item: light up its card, and the other way round */
  const hot = (i, on) => { $$(`[data-i="${i}"]`).forEach((x) => x.classList.toggle('is-hot', on)); };
  ['mouseover', 'focusin'].forEach((ev) => document.addEventListener(ev, (e) => { const b = e.target.closest?.('#rail button[data-i], .mz-ty-card'); if (b) hot(b.dataset.i, true); }));
  ['mouseout', 'focusout'].forEach((ev) => document.addEventListener(ev, (e) => { const b = e.target.closest?.('#rail button[data-i], .mz-ty-card'); if (b) hot(b.dataset.i, false); }));
  buildRail.redraw = draw;
}

function buildLook() {
  const box = $('#look');
  if (!box) return;
  box.innerHTML = `<span>Show</span><button type="button" data-l="plate">Diagrams</button><button type="button" data-l="photo">Photos</button>`;
  const set = (l) => {
    look = l;
    try { localStorage.setItem('mz-types-look', l); } catch (e) { /* ignore */ }
    box.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === l)));
    document.documentElement.classList.toggle('mz-look-photo', l === 'photo');
    $$('.mz-ty-card').forEach((c) => { const t = TYPES[+c.dataset.i], img = $('.pic img', c); c.classList.remove('no-photo'); delete img.dataset.fb; img.src = lookSrc(t, 720); });
    buildRail.redraw?.();
  };
  box.addEventListener('click', (e) => { const b = e.target.closest('button[data-l]'); if (b) set(b.dataset.l); });
  set(look);
}

function buildFilters() {
  const f = $('#filters');
  f.innerHTML = `<button type="button" data-f="" aria-pressed="true">All types</button>`
    + Object.entries(FAMILIES).map(([k, v]) => `<button type="button" data-f="${k}" aria-pressed="false" style="--fam:${famVar(k)}"><i></i>${esc(v)}</button>`).join('')
    + `<span class="count" id="count" aria-live="polite"></span>`;
  f.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.f || null;
    $$('#filters button').forEach((x) => x.setAttribute('aria-pressed', String((x.dataset.f || null) === filter)));
    applyFilter();
  });
}

function buildGrid() {
  const g = $('#grid');
  g.innerHTML = TYPES.map((t, i) => `
    <button type="button" class="mz-ty-card" data-i="${i}" data-f="${t.family}" style="--fam:${famVar(t.family)}" aria-label="${esc(t.name)}, ${esc(t.era)}. Open details">
      <span class="pic"><span class="no">${pad(i + 1)}</span><img src="${lookSrc(t, 720)}" alt="" loading="lazy" width="720" height="405"></span>
      <span class="body">
        <span class="mz-ty-era"><i></i>${esc(t.era)} · ${esc(FAMILIES[t.family])}</span>
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.tagline)}</p>
        <span class="more">Open →</span>
      </span>
    </button>`).join('');
  g.querySelectorAll('.mz-ty-card .pic img').forEach((img) => fallbackImg(img, TYPES[+img.closest('[data-i]').dataset.i]));
  g.addEventListener('click', (e) => { const c = e.target.closest('.mz-ty-card'); if (c) open(+c.dataset.i); });
}

function applyFilter() {
  let n = 0;
  $$('.mz-ty-card').forEach((c) => { const on = !filter || c.dataset.f === filter; c.hidden = !on; if (on) n++; });
  $$('#rail button').forEach((b) => b.classList.toggle('dim', !!filter && TYPES[+b.dataset.i].family !== filter));
  const cnt = $('#count'); if (cnt) cnt.textContent = `${n} of ${TYPES.length} types`;
}

function viewsFor(t) {
  const v = [['plate', 'Labelled plate']];
  const n = photosOf(t).length;
  if (n) v.push(['photos', n > 1 ? `Photos (${n})` : 'Photograph']);
  if (t.workshop_photo) v.push(['own', 'Workshop photograph']);
  if (t.render) v.push(['render', '3D render']);
  return v;
}

async function plateSVG(t) {
  if (!plateCache.has(t.plate)) {
    plateCache.set(t.plate, fetch(at(t.plate_svg)).then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((s) => s.replace(/^<\?xml[^>]*>\s*/, '')).catch(() => null));
  }
  return plateCache.get(t.plate);
}

async function renderStage(t) {
  const st = $('#lb-stage'), cr = $('#lb-credit');
  if (view === 'plate') {
    st.innerHTML = `<div class="plate"><img src="${at(t.plate_png)}" alt="Plate ${esc(t.plate)}: ${esc(t.name)} with the defining parts labelled"></div>`;
    cr.innerHTML = `Plate ${esc(t.plate)}, Moto Zero, CC BY-SA 4.0. <a href="${at(t.plate_svg)}" target="_blank" rel="noopener">Open full size (SVG)</a> · <a href="${at(t.plate_png)}" download>Download PNG</a>. On a phone, scroll the plate sideways.`;
    const svg = await plateSVG(t);
    if (svg && current >= 0 && TYPES[current] === t && view === 'plate') st.querySelector('.plate').innerHTML = svg;
  } else if (view === 'photos') {
    const ps = photosOf(t), k = Math.min(photoIx, ps.length - 1), p = ps[k];
    st.innerHTML = `<div class="photo"><img alt="${esc(p.subject)}" src="${esc(photoSrc(p))}"><div class="fallback" hidden>This photograph could not load here. <a href="${esc(p.page)}" target="_blank" rel="noopener">Open it on Wikimedia Commons</a>.</div>
      ${ps.length > 1 ? `<button type="button" class="gal-nav is-prev" aria-label="Previous photograph">←</button><button type="button" class="gal-nav is-next" aria-label="Next photograph">→</button>` : ''}</div>
      ${ps.length > 1 ? `<div class="gal-strip">${ps.map((q, j) => `<button type="button" data-p="${j}" aria-label="Photograph ${j + 1}: ${esc(q.subject)}" aria-pressed="${j === k}"><img src="${esc(photoSrc(q, 320))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}`;
    const img = st.querySelector('.photo img');
    img.addEventListener('error', () => { img.hidden = true; st.querySelector('.fallback').hidden = false; });
    st.querySelectorAll('.gal-strip img').forEach((im) => im.addEventListener('error', () => { im.closest('button').hidden = true; }));
    const go = (j) => { photoIx = (j + ps.length) % ps.length; renderStage(t); };
    st.querySelector('.is-prev')?.addEventListener('click', () => go(k - 1));
    st.querySelector('.is-next')?.addEventListener('click', () => go(k + 1));
    st.querySelector('.gal-strip')?.addEventListener('click', (e) => { const b = e.target.closest('button[data-p]'); if (b) go(+b.dataset.p); });
    cr.innerHTML = `${ps.length > 1 ? `${k + 1} of ${ps.length}. ` : ''}${credit(p)}`;
  } else {
    const p = view === 'own' ? t.workshop_photo : t.render;
    st.innerHTML = `<div class="photo"><img alt="${esc(p.caption)}" src="${at(p.file)}"></div>`;
    cr.innerHTML = `${esc(p.caption)} ${esc(p.credit)}.`;
  }
}

function open(i) {
  if (current < 0) lastFocus = document.activeElement;
  current = i;
  const t = TYPES[i];
  const vs = viewsFor(t);
  photoIx = 0;
  if (look === 'photo' && vs.some((v) => v[0] === 'photos')) view = 'photos';
  if (!vs.some((v) => v[0] === view)) view = 'plate';
  $('#lb-box').style.setProperty('--fam', famVar(t.family));
  $('#lb-era').innerHTML = `<i></i>${esc(t.era)} · ${esc(FAMILIES[t.family])} · ${pad(i + 1)} of ${TYPES.length}`;
  $('#lb-title').textContent = t.name;
  $('#lb-views').innerHTML = vs.map(([k, l]) => `<button type="button" data-v="${k}" aria-pressed="${k === view}">${esc(l)}</button>`).join('');
  renderStage(t);
  $('#lb-story').innerHTML = `<p class="tag">${esc(t.tagline)}</p>` + t.history.map((p) => `<p>${md(p)}</p>`).join('');
  const [ch, label] = LEARN[t.id] || [null, t.module];
  $('#lb-facts').innerHTML =
    `<div><h4>Typical figures</h4><table class="specs"><tbody>${Object.entries(t.specs).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>`
    + `<div><h4>What defines it</h4><ul>${t.built.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`
    + `<div><h4>Landmark models</h4><div class="chips">${t.models.map((x) => `<span>${esc(x)}</span>`).join('')}</div></div>`
    + `<div><h4>Where you see it</h4><p>${esc(t.where)}</p></div>`
    + (label ? `<p class="mod">In the course: ${ch ? `<a href="../learn/#${ch}">${esc(label)}</a>` : esc(label)}.</p>` : '');
  const nx = TYPES[(i + 1) % TYPES.length];
  $('#lb-nextbox').innerHTML = `<p><b>What came next.</b> ${esc(t.next)}</p><button type="button" id="lb-go">${esc(nx.name)} →</button>`;
  $('#lb-go').onclick = () => open((i + 1) % TYPES.length);
  const lb = $('#lb');
  if (lb.hidden) { lb.hidden = false; document.documentElement.classList.add('mz-locked'); }
  lb.scrollTop = 0;
  try { history.replaceState(null, '', '#' + t.id); } catch (_) { /* ignore */ }
  $('#lb-close').focus({ preventScroll: true });
  try { recordTool('types', { last: t.name }); } catch (_) { /* ignore */ }
}

function close() {
  $('#lb').hidden = true;
  document.documentElement.classList.remove('mz-locked');
  try { history.replaceState(null, '', location.pathname + location.search); } catch (_) { /* ignore */ }
  const c = $(`.mz-ty-card[data-i="${current}"]`);
  (c || lastFocus)?.focus?.({ preventScroll: true });
  current = -1;
}

function wire() {
  $('#lb-views').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-v]'); if (!b) return;
    view = b.dataset.v;
    $$('#lb-views button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderStage(TYPES[current]);
  });
  $('#lb-close').onclick = close;
  $('#lb-prev').onclick = () => open((current - 1 + TYPES.length) % TYPES.length);
  $('#lb-next').onclick = () => open((current + 1) % TYPES.length);
  $('#lb').addEventListener('click', (e) => { if (e.target.id === 'lb') close(); });
  document.addEventListener('keydown', (e) => {
    if ($('#lb').hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') $('#lb-next').click();
    else if (e.key === 'ArrowLeft') $('#lb-prev').click();
    else if (e.key === 'Tab') {   // keep focus inside the dialog
      const f = $$('#lb button, #lb a[href]').filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  $$('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); $('#grid').scrollIntoView({ behavior: 'smooth' }); }));
  const fromHash = () => { const k = TYPES.findIndex((t) => '#' + t.id === location.hash); if (k >= 0 && k !== current) open(k); };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}

async function init() {
  try {
    const data = await (await fetch(at('motorcycle-types.json'))).json();
    TYPES = data.types.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    FAMILIES = data.families;
  } catch (err) {
    $('#grid').innerHTML = '<p>The motorcycle types could not load. Please refresh the page.</p>';
    return;
  }
  buildFilters(); buildGrid(); buildRail(); buildLook(); applyFilter(); wire();
}
init();
