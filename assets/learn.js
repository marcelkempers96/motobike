/* Moto Zero — Learn page: course home + one module at a time, teaching style. */
import { MODULES, QBYID, TOPIC_ALIAS } from './content/index.js';
import { mountFigure } from './figures.js';
import { questionCard } from './quizkit.js';
import { PLATES, plateSrc, MODELS } from './content/assets-map.js';
import GLOSSARY from './content/glossary.js';

const $ = (s, r = document) => r.querySelector(s);
const main = $('#learn-main');
const toc = $('#learn-toc');
const ROOT = '../';
const COVER = { foundations: 'honda-air-cooled.jpg', engine: 'triumph-engine.jpg', 'fuel-ignition': 'vintage-timing-cover.jpg', 'drivetrain-chassis': 'honda-cb650r-engine.jpg', electric: 'hybrid-power-unit-portrait.jpg' };

function moduleOf(hash) {
  const h = decodeURIComponent(hash.replace(/^#/, ''));
  if (!h) return { mod: null };
  const slug = TOPIC_ALIAS[h] || h;
  let mod = MODULES.find((m) => m.id === slug);
  let chap = null;
  if (!mod) {
    for (const m of MODULES) { const c = m.chapters.find((x) => x.id === h); if (c) { mod = m; chap = c; break; } }
  }
  return { mod, chap };
}

function renderTOC(active) {
  toc.innerHTML = `<span class="ute-label">Course</span>
    <ol>${MODULES.map((m) => `<li><a href="#${m.id}" class="${active && active.id === m.id ? 'is-on' : ''}">${m.title}</a>
      ${active && active.id === m.id ? `<ol class="ute-toc-sub">${m.chapters.map((c) => `<li><a href="#${c.id}" data-chap="${c.id}">${c.title}</a></li>`).join('')}<li><a href="#${m.id}-glossary" data-chap="${m.id}-glossary">Glossary and further reading</a></li></ol>` : ''}</li>`).join('')}</ol>
    <div class="ute-toc-foot"><a class="ute-linkbtn" href="${ROOT}quiz/">Take the quiz →</a></div>`;
}

function home() {
  document.title = 'Moto Zero · Learn';
  renderTOC(null);
  main.innerHTML = `
    <section class="ute-hero">
      <span class="ute-label">Open course · CC BY-SA 4.0</span>
      <h1>How motorcycles work, from the first combustion stroke to the BMS of an electric bike.</h1>
      <p>Five modules, re-told for the screen: short explanations, live figures you can drive, and a quick check at the end of every chapter. Reference values come from a fuel-injected 125 cc single, the K-Light 125.</p>
      <div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="#${MODULES[0].id}">Start with Module ${MODULES[0].num} →</a><a class="ute-linkbtn" href="${ROOT}">Open the Lab</a><a class="ute-linkbtn" href="${ROOT}quiz/">Quiz</a></div>
    </section>
    <section class="ute-chapter">
      <h2>Modules</h2>
      <div class="ute-modcards">${MODULES.map((m) => `
        <a class="ute-modcard" href="#${m.id}">
          <img class="mz-modcard-img" src="${ROOT}assets/photos/${COVER[m.id]}" alt="" loading="lazy">
          <span class="ute-chapter-num">${m.num}</span>
          <h3>${m.title}</h3>
          <p>${m.intro}</p>
          <span class="ute-label">${m.chapters.length} chapters</span>
        </a>`).join('')}</div>
      <h3>Suggested path</h3>
      <div class="ute-steps">${[
        ['Module 01', 'For everyone. Then explore the bike in the Lab.'],
        ['Modules 02 and 03', 'For combustion machines, in that order.'],
        ['Module 04', 'For every machine, combustion or electric.'],
        ['Module 05', 'After the battery, charging and electrical-diagnosis chapters of Module 03.'],
      ].map(([t, h], i) => `<div class="ute-step"><b>${i + 1}</b><div><strong>${t}</strong><p>${h}</p></div></div>`).join('')}</div>
    </section>`;
}

function glossaryHTML(mod) {
  const g = GLOSSARY['m' + (MODULES.indexOf(mod) + 1)];
  if (!g) return '';
  return `<article class="ute-chapter" id="${mod.id}-glossary">
    <div class="ute-chapter-kicker"><span class="ute-chapter-num">${mod.num}</span><span class="ute-label">Reference</span></div>
    <h2>Glossary</h2>
    <input class="mz-gloss-filter" type="search" placeholder="Filter ${g.terms.length} terms…" aria-label="Filter glossary terms">
    <dl class="mz-gloss">${g.terms.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
    <h2 style="margin-top:28px">Further reading</h2>
    ${g.reading.map((grp) => `${grp.title ? `<h3>${grp.title}</h3>` : ''}<ul class="mz-reading">${grp.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
  </article>`;
}

function block(b, mod) {
  switch (b.type) {
    case 'p': return `<p>${b.html}</p>`;
    case 'h3': return `<h3>${b.text}</h3>`;
    case 'keys': return `<div class="ute-keys">${b.items.map((k) => `<div class="k"><div class="l">${k.l}</div><div class="v">${k.v}</div>${k.p ? `<p>${k.p}</p>` : ''}</div>`).join('')}</div>`;
    case 'steps': return `<div class="ute-steps">${b.items.map((s, i) => `<div class="ute-step"><b>${i + 1}</b><div><strong>${s.title}</strong><p>${s.html}</p></div></div>`).join('')}</div>`;
    case 'table': return `<div class="ute-table-wrap"><table class="ute-table"><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'callout': return `<div class="ute-callbox is-${b.tone || 'warm'}"><h4>${b.title || ''}</h4><p>${b.html}</p></div>`;
    case 'figure': return `<figure class="ute-figure" data-fig="${b.fig}"></figure>${b.caption ? `<p class="ute-figure-note"><span class="ute-label">Try it</span> ${b.caption}</p>` : ''}`;
    case 'plate': return PLATES[b.id] ? `<figure class="ute-figure mz-learn-plate" data-plate="${b.id}" tabindex="0" role="button" aria-label="Enlarge plate ${b.id}"><div class="ute-figure-stage"><img class="ute-figure-img" src="${ROOT}assets/illustrations/${plateSrc(b.id)}" alt="${PLATES[b.id][1]}" loading="lazy"></div><figcaption class="ute-figure-cap"><b>${b.id}</b> · ${b.caption || PLATES[b.id][1]}</figcaption></figure>` : '';
    case 'model': case 'models': {
      const files = (b.files || [b.file]).filter((f) => MODELS[f]);
      return files.length ? `<figure class="ute-figure mz-learn-model" data-models="${files.join(',')}"><div class="mz-variants">${files.length > 1 ? `<div class="ute-seg" role="group" aria-label="Models">${files.map((f) => `<button type="button" data-model="${f}">${MODELS[f][1].split(/[,(]/)[0].trim()}</button>`).join('')}</div>` : ''}</div><div class="ute-figure-stage"><div class="mz3d mz3d-part"><p class="mz3d-status">3D model · ${MODELS[files[0]][1]}</p></div></div><p class="mz3d-cap"></p><div class="mz-subparts"></div><figcaption class="ute-figure-cap"><span class="ute-label">3D · drag to rotate</span> ${b.caption || ''}</figcaption></figure>` : '';
    }
    case 'photo': return `<figure class="ute-figure mz-learn-photo"><div class="ute-figure-stage"><img src="${ROOT}assets/${b.src.startsWith('render-') ? 'renders/photo' : 'photos'}/${b.src}" alt="${(b.caption || '').replace(/"/g, '&quot;')}" loading="lazy"></div>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">${b.src.startsWith('render-') ? 'Render' : 'Photograph'}</span> ${b.caption}</figcaption>` : ''}</figure>`;
    case 'check': return `<div class="ute-check" data-q="${b.q}"></div>`;
    default: void mod; return '';
  }
}

function renderModule(mod, chap) {
  document.title = `Moto Zero · ${mod.title}`;
  renderTOC(mod);
  const i = MODULES.indexOf(mod);
  const prev = MODULES[i - 1], next = MODULES[i + 1];
  main.innerHTML = `
    <section class="ute-hero mz-hero-cover">
      <img class="mz-cover" src="${ROOT}assets/photos/${COVER[mod.id]}" alt="" loading="eager">
      <div>
      <span class="ute-label">Module ${mod.num}</span>
      <h1>${mod.title}</h1>
      <p>${mod.intro}</p>
      <div class="ute-chapter-foot">
        <a class="ute-linkbtn" href="${ROOT}assets/pdf/${mod.pdf}" target="_blank" rel="noopener">Download PDF</a>
        <a class="ute-linkbtn is-warm" href="${ROOT}quiz/?topic=${mod.id}">Quiz this module →</a>
      </div>
      </div>
    </section>
    ${mod.chapters.map((c, ci) => `
      <article class="ute-chapter" id="${c.id}">
        <div class="ute-chapter-kicker"><span class="ute-chapter-num">${mod.num}.${ci + 1}</span><span class="ute-label">${mod.title}</span></div>
        <h2>${c.title}</h2>
        ${c.lead ? `<p class="lead">${c.lead}</p>` : ''}
        <div class="prose">${c.blocks.map((b) => block(b, mod)).join('')}</div>
        ${c.lab ? `<div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="${ROOT}${c.lab}">Try it in the Lab →</a></div>` : ''}
      </article>`).join('')}
    ${glossaryHTML(mod)}
    <nav class="ute-chapter ute-pager">
      ${prev ? `<a class="ute-linkbtn" href="#${prev.id}">← ${prev.num} ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="ute-linkbtn is-warm" href="#${next.id}">${next.num} ${next.title} →</a>` : `<a class="ute-linkbtn is-warm" href="${ROOT}quiz/">Take the full quiz →</a>`}
    </nav>`;
  main.querySelectorAll('[data-fig]').forEach((f) => mountFigure(f.dataset.fig, f));
  main.querySelectorAll('[data-plate]').forEach((f) => {
    const open = () => openPlate(f.dataset.plate);
    f.addEventListener('click', open);
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  setupModels();
  main.querySelectorAll('.mz-gloss-filter').forEach((inp) => inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    inp.nextElementSibling.querySelectorAll('div').forEach((d) => { d.hidden = q && !d.textContent.toLowerCase().includes(q); });
  }));
  main.querySelectorAll('.ute-check').forEach((c) => {
    const q = QBYID[c.dataset.q];
    if (!q) { c.remove(); return; }
    c.appendChild(questionCard(q, { meta: 'Check yourself' }));
  });
  if (chap) requestAnimationFrame(() => document.getElementById(chap.id)?.scrollIntoView());
  else window.scrollTo(0, 0);
  observeChapters();
}

/* ---------- Plates lightbox ---------- */
const lb = document.createElement('div');
lb.className = 'mz-lightbox';
lb.setAttribute('role', 'dialog');
lb.setAttribute('aria-modal', 'true');
lb.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure><button type="button" class="ute-btn is-primary">Close ✕</button>';
document.body.appendChild(lb);
function openPlate(id) {
  lb.querySelector('img').src = `${ROOT}assets/illustrations/${plateSrc(id)}`;
  lb.querySelector('figcaption').innerHTML = `<b>${id}</b> · ${PLATES[id][1]}`;
  lb.classList.add('is-open');
  lb.querySelector('button').focus();
}
const closePlate = () => lb.classList.remove('is-open');
lb.addEventListener('click', (e) => { if (e.target === lb || e.target.tagName === 'BUTTON') closePlate(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlate(); });

/* ---------- 3D model blocks: created when near the viewport, disposed when far ---------- */
let v3;
const live = new Map();
function setupModels() {
  live.forEach((v) => v.dispose()); live.clear();
  const figs = main.querySelectorAll('[data-models]');
  if (!figs.length) return;
  const io3 = new IntersectionObserver((ents) => ents.forEach((e) => (e.isIntersecting ? wake(e.target) : sleep(e.target))), { rootMargin: '300px 0px' });
  figs.forEach((f) => io3.observe(f));
}
async function wake(fig) {
  if (live.has(fig)) return;
  live.set(fig, { dispose() {} });
  v3 = v3 || import('./viewer3d.js');
  const mod = await v3;
  const box = fig.querySelector('.mz3d');
  if (!mod.webglOK()) { box.innerHTML = `<img class="mz3d-poster" src="${mod.renderFor(`${ROOT}assets/renders/`, fig.dataset.models.split(',')[0])}" alt="">`; return; }
  if (!live.has(fig)) return;
  box.innerHTML = '';
  const cap = fig.querySelector('.mz3d-cap'), subs = fig.querySelector('.mz-subparts');
  const viewer = mod.createViewer(box, { base: `${ROOT}assets/models/`, poster: (n) => mod.renderFor(`${ROOT}assets/renders/`, n), onPick: (m, n) => { if (!m) return; viewer.setHighlight((x) => x === n); cap.textContent = mod.humanize(n.split('__').slice(1).join(' · ')); } });
  live.set(fig, viewer);
  const files = fig.dataset.models.split(',');
  const load = async (f) => {
    fig.querySelectorAll('[data-model]').forEach((b) => b.classList.toggle('is-on', b.dataset.model === f));
    await viewer.load(f, { view: f.startsWith('bike_') ? 'side' : 'threeq' });
    cap.textContent = MODELS[f][1];
    const groups = new Map();
    viewer.meshes().forEach((m) => {
      const p = m.name.split('__');
      const l = mod.humanize(f.startsWith('bike_') ? p[1] || m.name : p.slice(1).join(' ') || m.name);
      if (!groups.has(l)) groups.set(l, []);
      groups.get(l).push(m.name);
    });
    subs.innerHTML = [...groups.keys()].map((l) => `<button type="button" class="mz-sub">${l}</button>`).join('');
    subs.querySelectorAll('.mz-sub').forEach((b) => {
      const names = new Set(groups.get(b.textContent));
      const on = () => { subs.querySelectorAll('.is-on').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); viewer.setHighlight((n) => names.has(n)); };
      b.addEventListener('mouseenter', on); b.addEventListener('focus', on); b.addEventListener('click', on);
    });
  };
  fig.querySelectorAll('[data-model]').forEach((b) => { b.onclick = () => load(b.dataset.model); });
  load(files[0]);
}
function sleep(fig) {
  const v = live.get(fig);
  if (!v) return;
  v.dispose();
  live.delete(fig);
  const box = fig.querySelector('.mz3d');
  if (box) box.innerHTML = '<p class="mz3d-status">3D model</p>';
}

let io;
function observeChapters() {
  if (io) io.disconnect();
  io = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      toc.querySelectorAll('[data-chap]').forEach((a) => a.classList.toggle('is-on', a.dataset.chap === e.target.id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  main.querySelectorAll('.ute-chapter[id]').forEach((c) => io.observe(c));
}

let current = null;
function route() {
  const { mod, chap } = moduleOf(location.hash);
  if (!mod) { current = null; home(); window.scrollTo(0, 0); return; }
  if (current === mod && chap) { document.getElementById(chap.id)?.scrollIntoView(); return; }
  current = mod;
  renderModule(mod, chap);
}
window.addEventListener('hashchange', route);
route();
