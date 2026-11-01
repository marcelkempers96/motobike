/* ==========================================================================
   Moto Zero: Repair. Search by problem, search by part, and step-by-step
   procedures. Data: assets/content/repair/{problems,procedures,parts}.js.
   Pages set <main id="rp" data-view="home|problems|parts|fix">.
   ========================================================================== */
import { PARTS } from './content/parts.js';

/* Load the repair data; if it is not there yet, say so instead of breaking. */
let SYSTEMS = [], PROBLEMS = [], PROCEDURES = [], REPAIR_PARTS = [];
try {
  [{ SYSTEMS, PROBLEMS }, { PROCEDURES }, { REPAIR_PARTS }] = await Promise.all([
    import('./content/repair/problems.js'), import('./content/repair/procedures.js'), import('./content/repair/parts.js')]);
} catch (e) {
  const m = document.getElementById('rp');
  if (m) m.innerHTML = '<section class="rp-hero"><span class="ute-label">Repair</span><h1>Repair guides are on their way.</h1><p class="rp-lead">Step-by-step fixes, searchable by problem and by part, are being written and checked now. Please come back soon.</p></section>';
  throw e;
}

const ROOT = new URL('../', import.meta.url);
const href = (p) => ROOT.pathname + p;
const asset = (p) => (p ? ROOT.pathname + p : '');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = (s, r = document) => r.querySelector(s);

const PROB = Object.fromEntries(PROBLEMS.map((p) => [p.id, p]));
const PROC = Object.fromEntries(PROCEDURES.map((p) => [p.id, p]));
const RPART = Object.fromEntries(REPAIR_PARTS.map((p) => [p.part, p]));
const SYS = Object.fromEntries(SYSTEMS.map((s) => [s.id, s.name]));
const partName = (id) => RPART[id]?.name || PARTS[id]?.name || id.replace(/_/g, ' ');
const ELEC = new Set(['motor', 'controller', 'charge_port']);
const TWO = new Set(['port_ex', 'port_tr']);
const overviewHref = (part) => href(`overview/?${ELEC.has(part) ? 'mode=elec&' : TWO.has(part) ? 'mode=2t&' : ''}part=${part}`);
const LIKELY = { common: 'Common', possible: 'Possible', rare: 'Rare' };
const LEVEL = { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Workshop' };
const srcLine = (s) => (s && s.length ? `<p class="rp-src">Source: ${s.map((x) => esc(x.doc) + (x.page ? `, p. ${esc(x.page)}` : '')).join('; ')}</p>` : '');

/* problems that point to a procedure / part */
const problemsForProc = (id) => PROBLEMS.filter((p) => p.causes.some((c) => c.procedure === id));
const problemsForPart = (part) => {
  const set = new Set(RPART[part]?.problems || []);
  PROBLEMS.forEach((p) => { if (p.causes.some((c) => (c.parts || []).includes(part))) set.add(p.id); });
  return [...set].map((id) => PROB[id]).filter(Boolean);
};
const procsForPart = (part) => {
  const set = new Set(RPART[part]?.procedures || []);
  PROCEDURES.forEach((p) => { if ((p.parts || []).includes(part)) set.add(p.id); });
  return [...set].map((id) => PROC[id]).filter(Boolean);
};

/* ---------- search across everything ---------- */
const norm = (s) => String(s || '').toLowerCase();
function search(q) {
  const w = norm(q).split(/\s+/).filter(Boolean);
  if (!w.length) return [];
  const hit = (text) => w.every((x) => text.includes(x));
  const out = [];
  PROBLEMS.forEach((p) => { const t = norm([p.title, ...(p.also || []), SYS[p.system], ...p.causes.map((c) => c.cause)].join(' ')); if (hit(t)) out.push({ k: 'Problem', t: p.title, h: href(`repair/problems/#${p.id}`), d: SYS[p.system], danger: p.danger }); });
  REPAIR_PARTS.forEach((p) => { const t = norm([p.name, ...(p.also || []), p.group].join(' ')); if (hit(t)) out.push({ k: 'Part', t: p.name, h: href(`repair/parts/#${p.part}`), d: p.group }); });
  PROCEDURES.forEach((p) => { const t = norm([p.title, ...(p.parts || []).map(partName)].join(' ')); if (hit(t)) out.push({ k: 'Fix', t: p.title, h: href(`repair/fix/#${p.id}`), d: `${LEVEL[p.level] || ''}${p.time ? ' · ' + p.time : ''}` }); });
  return out.slice(0, 30);
}
function wireSearch(box) {
  const input = $('input', box), list = $('.rp-results', box);
  const run = () => {
    const r = search(input.value);
    list.hidden = !input.value.trim();
    list.innerHTML = r.length
      ? r.map((x) => `<li><a href="${x.h}"><span class="rp-kind">${x.k}</span><b>${esc(x.t)}</b>${x.danger ? '<i class="rp-dot" title="Do not ride"></i>' : ''}<span class="rp-d">${esc(x.d || '')}</span></a></li>`).join('')
      : '<li class="rp-none">Nothing found. Try a simpler word, for example “start”, “chain” or “brake”.</li>';
  };
  input.addEventListener('input', run);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const a = $('a', list); if (a) location.href = a.href; } });
}
const searchHTML = (ph) => `<div class="rp-search"><label class="rp-sr" for="rp-q">Search repairs</label><input id="rp-q" type="search" placeholder="${ph}" autocomplete="off"><ul class="rp-results" hidden></ul></div>`;

const dangerHTML = '<p class="rp-danger"><b>Do not ride.</b> Fix this before the bike goes back on the road.</p>';

/* ---------- views ---------- */
function home(el) {
  const common = PROBLEMS.filter((p) => p.causes.some((c) => c.likely === 'common')).slice(0, 10);
  el.innerHTML = `
    <section class="rp-hero">
      <span class="ute-label">Repair</span>
      <h1>Find the fault. Fix it step by step.</h1>
      ${searchHTML('What is wrong? For example: will not start')}
      <div class="rp-ways">
        <a href="${href('repair/problems/')}"><b>By problem</b><span>Start from what you see, hear or feel</span><em>${PROBLEMS.length} problems</em></a>
        <a href="${href('repair/parts/')}"><b>By part</b><span>Start from the part you want to check</span><em>${REPAIR_PARTS.length} parts</em></a>
        <a href="${href('repair/fix/')}"><b>All repairs</b><span>Every step-by-step job in one list</span><em>${PROCEDURES.length} jobs</em></a>
      </div>
    </section>
    <section class="rp-sec">
      <h2>Common problems</h2>
      <ul class="rp-list">${common.map(probRow).join('')}</ul>
    </section>
    <section class="rp-sec rp-note">
      <p><b>Safety first.</b> Engine off, key out, bike on its stand before you start. Brakes, steering, tyres and fuel leaks: do not ride until fixed. Electric bikes: only trained people open high-voltage parts.</p>
      <p>Values marked K-Light 125 are for a 125 cc air-cooled single. For other bikes, check the service manual for your model.</p>
    </section>`;
  wireSearch($('.rp-search', el));
}

const probRow = (p) => `<li><a href="${href(`repair/problems/#${p.id}`)}"><b>${esc(p.title)}</b>${p.danger ? '<i class="rp-dot" title="Do not ride"></i>' : ''}<span>${esc(SYS[p.system] || '')}</span></a></li>`;

function problems(el) {
  const show = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (PROB[id]) return problemDetail(el, PROB[id]);
    let sys = '';
    el.innerHTML = `
      <section class="rp-hero is-small">
        <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / By problem</p>
        <h1>What is wrong?</h1>
        ${searchHTML('Search problems')}
        <div class="rp-chips" role="group" aria-label="Filter by system"><button type="button" data-s="" aria-pressed="true">All</button>${SYSTEMS.filter((s) => PROBLEMS.some((p) => p.system === s.id)).map((s) => `<button type="button" data-s="${s.id}" aria-pressed="false">${esc(s.name)}</button>`).join('')}</div>
      </section>
      <section class="rp-sec"><div id="rp-groups"></div></section>`;
    const draw = () => {
      $('#rp-groups', el).innerHTML = SYSTEMS.filter((s) => !sys || s.id === sys).map((s) => {
        const ps = PROBLEMS.filter((p) => p.system === s.id);
        return ps.length ? `<h2 class="rp-gh">${esc(s.name)}</h2><ul class="rp-list">${ps.map(probRow).join('')}</ul>` : '';
      }).join('');
    };
    $('.rp-chips', el).addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      sys = b.dataset.s;
      el.querySelectorAll('.rp-chips button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    });
    draw();
    wireSearch($('.rp-search', el));
  };
  window.addEventListener('hashchange', () => { show(); scrollTo(0, 0); });
  show();
}

function problemDetail(el, p) {
  document.title = `${p.title} · Repair · Moto Zero`;
  el.innerHTML = `
    <section class="rp-hero is-small">
      <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / <a href="${href('repair/problems/')}">By problem</a> / ${esc(SYS[p.system] || '')}</p>
      <h1>${esc(p.title)}</h1>
      ${p.danger ? dangerHTML : ''}
      ${p.safety ? `<p class="rp-safety">${esc(p.safety)}</p>` : ''}
      ${p.first ? `<p class="rp-first"><span>First check</span>${esc(p.first)}</p>` : ''}
    </section>
    <section class="rp-sec">
      <h2>Likely causes, most likely first</h2>
      <ol class="rp-causes">${p.causes.map((c) => {
        const pr = c.procedure && PROC[c.procedure];
        return `<li>
          <div class="rp-c-head"><b>${esc(c.cause)}</b><span class="rp-tag is-${c.likely}">${LIKELY[c.likely] || ''}</span></div>
          ${c.check ? `<p><span class="rp-k">Check</span>${esc(c.check)}</p>` : ''}
          <div class="rp-c-links">
            ${pr ? `<a class="rp-btn is-fix" href="${href(`repair/fix/#${pr.id}`)}">Fix: ${esc(pr.title)} →</a>` : ''}
            ${(c.parts || []).map((pt) => `<a class="rp-btn" href="${href(`repair/parts/#${pt}`)}">${esc(partName(pt))}</a>`).join('')}
            ${(c.parts || [])[0] ? `<a class="rp-btn is-3d" href="${overviewHref(c.parts[0])}">See it in 3D</a>` : ''}
          </div>
        </li>`;
      }).join('')}</ol>
      ${srcLine(p.sources)}
    </section>`;
}

function parts(el) {
  const show = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (RPART[id]) return partDetail(el, RPART[id]);
    document.title = 'Repair by part · Moto Zero';
    const groups = [...new Set(REPAIR_PARTS.map((p) => p.group))];
    el.innerHTML = `
      <section class="rp-hero is-small">
        <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / By part</p>
        <h1>Which part?</h1>
        ${searchHTML('Search parts')}
      </section>
      <section class="rp-sec">${groups.map((g) => `<h2 class="rp-gh">${esc(g)}</h2><div class="rp-parts">${REPAIR_PARTS.filter((p) => p.group === g).map((p) => `
        <a href="#${p.part}"><span class="rp-pimg">${p.img ? `<img src="${asset(p.img)}" alt="" loading="lazy">` : ''}</span><b>${esc(p.name)}</b><span>${procsForPart(p.part).length} repairs · ${problemsForPart(p.part).length} problems</span></a>`).join('')}</div>`).join('')}</section>`;
    wireSearch($('.rp-search', el));
  };
  window.addEventListener('hashchange', () => { show(); scrollTo(0, 0); });
  show();
}

function partDetail(el, p) {
  document.title = `${p.name} · Repair · Moto Zero`;
  const probs = problemsForPart(p.part), procs = procsForPart(p.part);
  const chapter = PARTS[p.part]?.chapter;
  el.innerHTML = `
    <section class="rp-hero is-small rp-part-hero">
      <div>
        <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / <a href="${href('repair/parts/')}">By part</a> / ${esc(p.group)}</p>
        <h1>${esc(p.name)}</h1>
        ${PARTS[p.part]?.desc ? `<p class="rp-lead">${esc(PARTS[p.part].desc)}</p>` : ''}
        <div class="rp-c-links">
          ${PARTS[p.part] ? `<a class="rp-btn is-3d" href="${overviewHref(p.part)}">See it working in 3D →</a>` : ''}
          ${chapter ? `<a class="rp-btn" href="${href(`learn/#${chapter}`)}">How it works</a>` : ''}
        </div>
      </div>
      ${p.img ? `<figure class="rp-part-img"><img src="${asset(p.img)}" alt="${esc(p.name)}"></figure>` : ''}
    </section>
    <section class="rp-sec rp-two">
      <div><h2>Repairs</h2>${procs.length ? `<ul class="rp-list">${procs.map(procRow).join('')}</ul>` : '<p>No step-by-step job for this part yet.</p>'}</div>
      <div><h2>Problems it can cause</h2>${probs.length ? `<ul class="rp-list">${probs.map(probRow).join('')}</ul>` : '<p>None listed yet.</p>'}</div>
    </section>`;
}

const procRow = (p) => `<li><a href="${href(`repair/fix/#${p.id}`)}"><b>${esc(p.title)}</b><span>${esc(LEVEL[p.level] || '')}${p.time ? ' · ' + esc(p.time) : ''}</span></a></li>`;

function fix(el) {
  const show = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (PROC[id]) return procDetail(el, PROC[id]);
    document.title = 'All repairs · Moto Zero';
    const lv = ['basic', 'intermediate', 'advanced'];
    el.innerHTML = `
      <section class="rp-hero is-small">
        <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / All repairs</p>
        <h1>All repairs</h1>
        ${searchHTML('Search repairs')}
      </section>
      <section class="rp-sec">${lv.map((l) => { const ps = PROCEDURES.filter((p) => p.level === l); return ps.length ? `<h2 class="rp-gh">${LEVEL[l]}</h2><ul class="rp-list">${ps.map(procRow).join('')}</ul>` : ''; }).join('')}</section>`;
    wireSearch($('.rp-search', el));
  };
  window.addEventListener('hashchange', () => { show(); scrollTo(0, 0); });
  show();
}

function procDetail(el, p) {
  document.title = `${p.title} · Repair · Moto Zero`;
  const key = 'mz-fix-' + p.id;
  let done = [];
  try { done = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { /* ignore */ }
  const probs = problemsForProc(p.id);
  const chapter = p.learn;
  el.innerHTML = `
    <section class="rp-hero is-small rp-part-hero">
      <div>
        <p class="rp-crumb"><a href="${href('repair/')}">Repair</a> / <a href="${href('repair/fix/')}">All repairs</a>${(p.parts || [])[0] ? ` / <a href="${href(`repair/parts/#${p.parts[0]}`)}">${esc(partName(p.parts[0]))}</a>` : ''}</p>
        <h1>${esc(p.title)}</h1>
        <p class="rp-meta"><span class="rp-tag is-${p.level}">${LEVEL[p.level] || ''}</span>${p.time ? `<span>${esc(p.time)}</span>` : ''}</p>
        <div class="rp-c-links">
          ${p.overview ? `<a class="rp-btn is-3d" href="${overviewHref(p.overview)}">See it working in 3D →</a>` : ''}
          ${chapter ? `<a class="rp-btn" href="${href(`learn/#${chapter}`)}">How it works</a>` : ''}
          <button type="button" class="rp-btn" onclick="window.print()">Print</button>
        </div>
      </div>
      ${p.img ? `<figure class="rp-part-img"><img src="${asset(p.img)}" alt="${esc(p.title)}"></figure>` : ''}
    </section>
    ${p.level === 'advanced' ? '<p class="rp-workshop"><b>Workshop job.</b> Needs special tools or training. Use these steps to understand the job, not as a substitute for training.</p>' : ''}
    <section class="rp-sec rp-prep">
      ${(p.safety || []).length ? `<div class="rp-box is-safety"><h2>Safety</h2><ul>${p.safety.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
      ${(p.tools || []).length ? `<div class="rp-box"><h2>Tools</h2><ul>${p.tools.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
      ${(p.supplies || []).length ? `<div class="rp-box"><h2>Parts and supplies</h2><ul>${p.supplies.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
      ${(p.specs || []).length ? `<div class="rp-box is-specs"><h2>Values</h2><table>${p.specs.map((s) => `<tr><td>${esc(s.label)}</td><td>${esc(s.value)}</td></tr>`).join('')}</table></div>` : ''}
    </section>
    <section class="rp-sec">
      <h2>Steps <span class="rp-count" id="rp-count"></span></h2>
      <ol class="rp-steps">${p.steps.map((s, i) => `
        <li class="${done.includes(i) ? 'is-done' : ''}" data-i="${i}">
          <button type="button" class="rp-tick" aria-pressed="${done.includes(i)}" aria-label="Mark step ${i + 1} done"><span>${i + 1}</span></button>
          <div><p>${esc(s.do)}</p>${s.spec ? `<p class="rp-spec">${esc(s.spec)}</p>` : ''}${s.img ? `<img src="${asset(s.img)}" alt="" loading="lazy">` : ''}</div>
        </li>`).join('')}</ol>
      ${p.done ? `<p class="rp-donebox"><span>Done when</span>${esc(p.done)}</p>` : ''}
      <p><button type="button" class="rp-btn" id="rp-reset">Clear ticks</button></p>
    </section>
    ${probs.length ? `<section class="rp-sec"><h2>Fixes these problems</h2><ul class="rp-list">${probs.map(probRow).join('')}</ul></section>` : ''}
    <section class="rp-sec">${srcLine(p.sources)}</section>`;
  const steps = el.querySelectorAll('.rp-steps li');
  const count = () => { $('#rp-count', el).textContent = `${done.length} of ${p.steps.length} done`; };
  const save = () => { try { localStorage.setItem(key, JSON.stringify(done)); } catch (e) { /* ignore */ } count(); };
  steps.forEach((li) => $('.rp-tick', li).addEventListener('click', () => {
    const i = +li.dataset.i; const on = !done.includes(i);
    done = on ? [...done, i] : done.filter((x) => x !== i);
    li.classList.toggle('is-done', on); $('.rp-tick', li).setAttribute('aria-pressed', String(on)); save();
  }));
  $('#rp-reset', el).addEventListener('click', () => { done = []; steps.forEach((li) => { li.classList.remove('is-done'); $('.rp-tick', li).setAttribute('aria-pressed', 'false'); }); save(); });
  count();
}

const el = document.getElementById('rp');
({ home, problems, parts, fix })[el.dataset.view]?.(el);
