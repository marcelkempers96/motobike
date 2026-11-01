/* Moto Zero — Learn page: course home + one module at a time, teaching style. */
import { MODULES, QBYID, TOPIC_ALIAS } from './content/index.js';
import { mountFigure } from './figures.js';
import { questionCard } from './quizkit.js';

const $ = (s, r = document) => r.querySelector(s);
const main = $('#learn-main');
const toc = $('#learn-toc');
const ROOT = '../';

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
      ${active && active.id === m.id ? `<ol class="ute-toc-sub">${m.chapters.map((c) => `<li><a href="#${c.id}" data-chap="${c.id}">${c.title}</a></li>`).join('')}</ol>` : ''}</li>`).join('')}</ol>
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

function block(b, mod) {
  switch (b.type) {
    case 'p': return `<p>${b.html}</p>`;
    case 'h3': return `<h3>${b.text}</h3>`;
    case 'keys': return `<div class="ute-keys">${b.items.map((k) => `<div class="k"><div class="l">${k.l}</div><div class="v">${k.v}</div>${k.p ? `<p>${k.p}</p>` : ''}</div>`).join('')}</div>`;
    case 'steps': return `<div class="ute-steps">${b.items.map((s, i) => `<div class="ute-step"><b>${i + 1}</b><div><strong>${s.title}</strong><p>${s.html}</p></div></div>`).join('')}</div>`;
    case 'table': return `<div class="ute-table-wrap"><table class="ute-table"><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'callout': return `<div class="ute-callbox is-${b.tone || 'warm'}"><h4>${b.title || ''}</h4><p>${b.html}</p></div>`;
    case 'figure': return `<figure class="ute-figure" data-fig="${b.fig}"></figure>${b.caption ? `<p class="ute-figure-note"><span class="ute-label">Try it</span> ${b.caption}</p>` : ''}`;
    case 'illus': return `<figure class="ute-figure ute-illus"><div class="ute-figure-stage"><img class="ute-figure-img" src="${ROOT}assets/illustrations/${b.file}" alt="${(b.caption || '').replace(/"/g, '')}" loading="lazy" onerror="this.closest('figure').remove()"></div>${b.caption ? `<figcaption class="ute-figure-cap">${b.caption}</figcaption>` : ''}</figure>`;
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
    <section class="ute-hero">
      <span class="ute-label">Module ${mod.num}</span>
      <h1>${mod.title}</h1>
      <p>${mod.intro}</p>
      <div class="ute-chapter-foot">
        <a class="ute-linkbtn" href="${ROOT}assets/pdf/${mod.pdf}" target="_blank" rel="noopener">Download PDF</a>
        <a class="ute-linkbtn is-warm" href="${ROOT}quiz/?topic=${mod.id}">Quiz this module →</a>
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
    <nav class="ute-chapter ute-pager">
      ${prev ? `<a class="ute-linkbtn" href="#${prev.id}">← ${prev.num} ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="ute-linkbtn is-warm" href="#${next.id}">${next.num} ${next.title} →</a>` : `<a class="ute-linkbtn is-warm" href="${ROOT}quiz/">Take the full quiz →</a>`}
    </nav>`;
  main.querySelectorAll('[data-fig]').forEach((f) => mountFigure(f.dataset.fig, f));
  main.querySelectorAll('.ute-check').forEach((c) => {
    const q = QBYID[c.dataset.q];
    if (!q) { c.remove(); return; }
    c.appendChild(questionCard(q, { meta: 'Check yourself' }));
  });
  if (chap) requestAnimationFrame(() => document.getElementById(chap.id)?.scrollIntoView());
  else window.scrollTo(0, 0);
  observeChapters();
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
