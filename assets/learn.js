/* Moto Zero — Learn page: course home + one module at a time, teaching style. */
import { MODULES, QBYID, TOPIC_ALIAS } from './content/index.js';
import { mountFigure } from './figures.js';
import { questionCard } from './quizkit.js';
import { PLATES, plateSrc, MODELS } from './content/assets-map.js';
import GLOSSARY from './content/glossary.js';
import * as PG from './progress.js';

const $ = (s, r = document) => r.querySelector(s);
const main = $('#learn-main');
const toc = $('#learn-toc');
const ROOT = '../';
const COVER = { foundations: 'honda-air-cooled.jpg', engine: 'triumph-engine.jpg', 'fuel-ignition': 'vintage-timing-cover.jpg', 'drivetrain-chassis': 'honda-cb650r-engine.jpg', electric: 'hybrid-power-unit-portrait.jpg' };

function renderTOC(active, page) {
  toc.innerHTML = `<span class="ute-label">Course</span>
    <ol>${MODULES.map((m) => `<li><a href="#${m.id}" class="${active && active.id === m.id ? 'is-on' : ''}">${m.title}</a>
      ${active && active.id === m.id ? `<ol class="ute-toc-sub">${m.chapters.map((c) => `<li><a href="#${c.id}" data-chap="${c.id}" class="${page === c.id ? 'is-on' : ''} ${PG.isDone(c.id) ? 'is-done' : ''}">${c.title}</a></li>`).join('')}<li><a href="#${m.id}-glossary" data-chap="${m.id}-glossary" class="${page === m.id + '-glossary' ? 'is-on' : ''}">Glossary and further reading</a></li></ol>` : ''}</li>`).join('')}</ol>
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
      <div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="#${MODULES[0].id}">Start with Module ${MODULES[0].num} →</a><a class="ute-linkbtn" href="${ROOT}">Open the Overview</a><a class="ute-linkbtn" href="${ROOT}quiz/">Quiz</a><a class="ute-linkbtn" href="${ROOT}build/">Bike builder</a><a class="ute-linkbtn" href="${ROOT}kids/">Kids: Build a bike</a></div>
    </section>
    ${(() => {
      const d = PG.load();
      const recent = Object.entries(d.chapters).sort((a, b) => (b[1].last || 0) - (a[1].last || 0))[0];
      const all = MODULES.flatMap((m) => m.chapters);
      const done = all.filter((c) => d.chapters[c.id] && d.chapters[c.id].done).length;
      if (!recent) return '';
      const ch = all.find((c) => c.id === recent[0]);
      return ch ? `<section class="ute-chapter mz-resume"><div><span class="ute-label">Your progress · ${done} of ${all.length} chapters completed</span><h2>Continue where you left off</h2><p>${ch.title}</p></div><div class="ute-btnrow"><a class="ute-btn is-primary" href="#${ch.id}">Continue →</a><a class="ute-linkbtn" href="${ROOT}progress/">My progress</a></div></section>` : '';
    })()}
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
        ['Module 01', 'For everyone. Then explore the bike in the Overview.'],
        ['Modules 02 and 03', 'For combustion machines, in that order.'],
        ['Module 04', 'For every machine, combustion or electric.'],
        ['Module 05', 'After the battery, charging and electrical-diagnosis chapters of Module 03.'],
      ].map(([t, h], i) => `<div class="ute-step"><b>${i + 1}</b><div><strong>${t}</strong><p>${h}</p></div></div>`).join('')}</div>
    </section>`;
}

function glossaryHTML(mod) {
  const g = GLOSSARY['m' + (MODULES.indexOf(mod) + 1)];
  if (!g) return '';
  return `<article class="ute-chapter mz-chapter" data-chapter="${mod.id}-glossary">
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
    case 'wiring': {
      const TAB = { harness: ['harness', 'WR01 · Main harness'], starting: ['starting-cranking', 'F23 · Starting circuit'], charging: ['charging', 'F21 · Charging circuit'], ignition: ['ignition-spark', 'F22 · Ignition circuits'] };
      const t = TAB[b.tab] || TAB.harness;
      const img = b.preview || t[0];
      return `<figure class="ute-figure mz-learn-wiring"><a class="mz-wiring-card" href="${ROOT}wiring/#${b.tab || 'harness'}"><img src="${ROOT}assets/interactive/wiring/preview/${img}.png" alt="Wiring Lab: ${t[1]}" loading="lazy"><span class="ute-linkbtn is-warm">Open the Wiring Lab: ${t[1]} →</span></a>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">Interactive</span> ${b.caption}</figcaption>` : ''}</figure>`;
    }
    case 'animation': return `<figure class="ute-figure mz-learn-anim"><iframe data-src="${ROOT}overview/?embed=1&mode=${b.mode || '4t'}&part=${b.part}" title="Interactive animation: ${b.part}" loading="lazy"></iframe>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">Try it</span> ${b.caption}</figcaption>` : ''}</figure>`;
    case 'check': return `<div class="ute-check" data-q="${b.q}"></div>`;
    default: void mod; return '';
  }
}

/* ---------- One page per chapter: module overview, chapter pages, glossary page ---------- */
const FLAT = MODULES.flatMap((m) => [...m.chapters.map((c) => ({ mod: m, chap: c })), { mod: m, chap: null, gloss: true }]);
const pageHash = (p) => (p.gloss ? `${p.mod.id}-glossary` : p.chap.id);
const pageTitle = (p) => (p.gloss ? 'Glossary and further reading' : p.chap.title);

function wireContent() {
  main.querySelectorAll('[data-fig]').forEach((f) => mountFigure(f.dataset.fig, f));
  main.querySelectorAll('[data-plate]').forEach((f) => {
    const open = () => openPlate(f.dataset.plate);
    f.addEventListener('click', open);
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  setupModels();
  setupAnims();
  main.querySelectorAll('.mz-gloss-filter').forEach((inp) => inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    inp.nextElementSibling.querySelectorAll('div').forEach((d) => { d.hidden = q && !d.textContent.toLowerCase().includes(q); });
  }));
  main.querySelectorAll('.ute-check').forEach((c) => {
    const q = QBYID[c.dataset.q];
    if (!q) { c.remove(); return; }
    c.appendChild(questionCard(q, { meta: 'Check yourself', retry: true, onAnswer: (ok) => PG.recordCheck(q.id, ok) }));
  });
}

function crumbs(mod, here) {
  return `<nav class="mz-crumbs" aria-label="Breadcrumb"><a href="#">Learn</a><span>/</span><a href="#${mod.id}">Module ${mod.num}</a>${here ? `<span>/</span><b>${here}</b>` : ''}</nav>`;
}

function renderModuleIndex(mod) {
  document.title = `Moto Zero · ${mod.title}`;
  renderTOC(mod, null);
  main.innerHTML = `
    <section class="ute-hero mz-hero-cover">
      <img class="mz-cover" src="${ROOT}assets/photos/${COVER[mod.id]}" alt="" loading="eager">
      <div>
        ${crumbs(mod)}
        <span class="ute-label">Module ${mod.num} · ${mod.chapters.length} chapters</span>
        <h1>${mod.title}</h1>
        <p>${mod.intro}</p>
        <div class="ute-chapter-foot">
          <a class="ute-linkbtn is-warm" href="#${mod.chapters[0].id}">Start chapter ${mod.num}.1 →</a>
          <a class="ute-linkbtn" href="${ROOT}assets/pdf/${mod.pdf}" target="_blank" rel="noopener">Download the PDF</a>
          <a class="ute-linkbtn" href="${ROOT}quiz/?topic=${mod.id}">Quiz this module</a>
        </div>
      </div>
    </section>
    <section class="ute-chapter">
      <h2>Chapters</h2>
      <ol class="mz-chaplist">${mod.chapters.map((c, ci) => {
        const pic = c.blocks.find((b) => b.type === 'plate') || c.blocks.find((b) => b.type === 'photo') || c.blocks.find((b) => b.type === 'model' || b.type === 'models');
        let img = '';
        if (pic && pic.type === 'plate') img = `${ROOT}assets/illustrations/${plateSrc(pic.id)}`;
        else if (pic && pic.type === 'photo') img = `${ROOT}assets/${pic.src.startsWith('render-') ? 'renders/photo' : 'photos'}/${pic.src}`;
        else if (pic) { const f = pic.file || pic.files[0]; img = `${ROOT}assets/renders/${f.startsWith('bike_') ? f + '_side' : f}.webp`; }
        return `<li><a href="#${c.id}">${img ? `<img src="${img}" alt="" loading="lazy">` : '<span></span>'}<div><span class="ute-chapter-num">${mod.num}.${ci + 1}</span>${PG.isDone(c.id) ? '<span class="mz-done-tag">✓ Completed</span>' : PG.isSeen(c.id) ? '<span class="mz-seen-tag">Started</span>' : ''}<h3>${c.title}</h3><p>${c.lead || ''}</p></div></a></li>`;
      }).join('')}
      <li><a href="#${mod.id}-glossary"><span></span><div><span class="ute-chapter-num">${mod.num}</span><h3>Glossary and further reading</h3><p>Every term used in the module, and where to read more.</p></div></a></li></ol>
    </section>`;
  window.scrollTo(0, 0);
}

function tocToCurrent() {
  requestAnimationFrame(() => { const a = toc.querySelector('.ute-toc-sub a.is-on') || toc.querySelector('a.is-on'); if (a) toc.scrollTop = Math.max(0, a.offsetTop - toc.offsetTop - 40); });
}

function renderPage(p) {
  const { mod, chap } = p;
  const i = FLAT.indexOf(p);
  const prev = FLAT[i - 1], next = FLAT[i + 1];
  const ci = chap ? mod.chapters.indexOf(chap) : mod.chapters.length;
  document.title = `Moto Zero · ${pageTitle(p)}`;
  renderTOC(mod, pageHash(p));
  const pager = `<nav class="mz-pager" aria-label="Chapter navigation">
      ${prev ? `<a class="mz-pager-prev" href="#${pageHash(prev)}"><span class="ute-label">← Previous</span><b>${pageTitle(prev)}</b></a>` : '<span></span>'}
      ${next ? `<a class="mz-pager-next" href="#${pageHash(next)}"><span class="ute-label">Next →</span><b>${pageTitle(next)}</b></a>` : `<a class="mz-pager-next" href="${ROOT}quiz/"><span class="ute-label">Finished →</span><b>Take the full quiz</b></a>`}
    </nav>`;
  const progress = `<div class="mz-progress" aria-label="Progress in this module"><i style="width:${Math.round((ci + 1) / (mod.chapters.length + 1) * 100)}%"></i></div>`;
  if (p.gloss) {
    main.innerHTML = `<div class="mz-page">${crumbs(mod, 'Glossary')}${progress}${glossaryHTML(mod)}${pager}</div>`;
  } else {
    main.innerHTML = `
      <div class="mz-page">
        ${crumbs(mod, `Chapter ${mod.num}.${ci + 1}`)}
        ${progress}
        <article class="ute-chapter mz-chapter" data-chapter="${chap.id}">
          <div class="ute-chapter-kicker"><span class="ute-chapter-num">${mod.num}.${ci + 1}</span><span class="ute-label">${mod.title} · chapter ${ci + 1} of ${mod.chapters.length}</span></div>
          <h2>${chap.title}</h2>
          ${chap.lead ? `<p class="lead">${chap.lead}</p>` : ''}
          <div class="prose">${chap.blocks.map((b) => block(b, mod)).join('')}</div>
          ${chap.lab ? `<div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="${ROOT}${chap.lab.startsWith('?') ? 'overview/' + chap.lab : chap.lab}">Try it in the Overview →</a></div>` : ''}
          <div class="mz-complete"><button type="button" class="ute-btn ${PG.isDone(chap.id) ? '' : 'is-primary'}" data-complete="${chap.id}">${PG.isDone(chap.id) ? '✓ Chapter completed' : 'Mark this chapter as complete'}</button><a href="${ROOT}progress/">My progress</a></div>
        </article>
        ${pager}
      </div>`;
  }
  wireContent();
  if (chap) {
    PG.chapterSeen(chap.id);
    const btn = main.querySelector('[data-complete]');
    if (btn) btn.addEventListener('click', () => {
      const now = !PG.isDone(chap.id);
      PG.chapterDone(chap.id, now);
      btn.textContent = now ? '✓ Chapter completed' : 'Mark this chapter as complete';
      btn.classList.toggle('is-primary', !now);
      renderTOC(mod, pageHash(p));
    });
    const nx = main.querySelector('.mz-pager-next');
    if (nx) nx.addEventListener('click', () => PG.chapterDone(chap.id, true));
  }
  tocToCurrent();
  window.scrollTo(0, 0);
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
/* Interactive animations from the Overview, loaded when scrolled near */
function setupAnims() {
  const frames = main.querySelectorAll('.mz-learn-anim iframe[data-src]');
  if (!frames.length) return;
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting) return;
    const f = e.target; io.unobserve(f);
    f.src = f.dataset.src;
    f.addEventListener('load', () => {
      const fit = () => { try { f.style.height = Math.ceil(f.contentDocument.documentElement.scrollHeight) + 'px'; } catch (err) { /* noop */ } };
      fit();
      try { new ResizeObserver(fit).observe(f.contentDocument.documentElement); } catch (err) { setInterval(fit, 1000); }
    });
  }), { rootMargin: '400px 0px' });
  frames.forEach((f) => io.observe(f));
}

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

function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!h) { home(); window.scrollTo(0, 0); return; }
  const slug = TOPIC_ALIAS[h] || h;
  const mod = MODULES.find((m) => m.id === slug);
  if (mod) { renderModuleIndex(mod); return; }
  const p = FLAT.find((x) => pageHash(x) === h);
  if (p) { renderPage(p); return; }
  home();
}
window.addEventListener('hashchange', route);
route();
