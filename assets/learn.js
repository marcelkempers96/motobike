/* Motopedia — Learn page: course home + one module at a time, teaching style. */
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
const CHAPTER_IMG = {
  'm1-history-systems': 'photos/curtiss-1907.jpg', 'm1-types': 'renders/ch-types.webp', 'm1-anatomy': 'renders/ch-anatomy.webp',
  'm1-physics': 'renders/ch-physics.webp', 'm1-workshop': 'photos/workshop-garage.jpg', 'm1-fasteners': 'repair-photos/039_if_torqueing_bolt_engine_feel_yield.jpg',
  'm2-fundamentals': 'photos/engine-closeup.jpg', 'm2-four-stroke': 'renders/photo/render-engine-xray.jpg', 'm2-two-stroke': 'renders/engine_2t.webp',
  'm2-top-end': 'renders/photo/render-valve.jpg', 'm2-bottom-end': 'renders/photo/render-crank.jpg', 'm2-lubrication-cooling': 'illustrations/powertrain/F11.png',
  'm2-diagnosis': 'photos/carburettor-work.jpg',
  'm3-mixture': 'photos/carburettor-fitting.jpg', 'm3-fuel-supply': 'renders/fuel_tank.webp', 'm3-carburettor': 'renders/carb.webp', 'm3-intake-exhaust': 'renders/exhaust_4t.webp', 'm3-fuel-diagnosis': 'repair-photos/060_however_good_take_moisture_water_out.jpg', 'm3-efi': 'renders/throttle_body.webp', 'm3-ignition': 'renders/photo/render-plug.jpg',
  'm3-electrical-basics': 'repair-photos/086_simplest_wiring_system.jpg', 'm3-starting': 'interactive/wiring/preview/starting-cranking.png',
  'm3-battery-charging': 'renders/battery_12v.webp', 'm3-lighting-wiring': 'interactive/wiring/preview/harness.png', 'm3-diagnosis': 'interactive/wiring/preview/starting-noearth.png',
  'm4-clutch': 'renders/clutch_exploded.webp', 'm4-gearbox': 'illustrations/transmission/F14.png', 'm4-final-drive': 'renders/photo/render-chain.jpg',
  'm4-frame-steering': 'renders/frame_cradle.webp', 'm4-suspension': 'renders/forks_usd.webp', 'm4-wheels-tyres': 'renders/front_wheel_mx.webp',
  'm4-brakes': 'renders/photo/render-brake.jpg', 'm4-maintenance': 'photos/scooter-cvt-workshop.jpg',
  'm5-architecture': 'photos/electric-scrambler-render.jpg', 'm5-motors': 'renders/motor.webp', 'm5-controllers': 'renders/controller.webp',
  'm5-batteries': 'renders/photo/render-battery.jpg', 'm5-charging': 'renders/charge_port.webp', 'm5-safety': 'illustrations/electrical/F25.png',
};
const isPhoto = (p) => p.startsWith('photos/') || p.startsWith('renders/photo/') || p.startsWith('repair-photos/');

const COVER = { foundations: 'honda-air-cooled.jpg', engine: 'triumph-engine.jpg', fuel: 'carburettor-work.jpg', electrics: 'vintage-timing-cover.jpg', 'drivetrain-chassis': 'honda-cb650r-engine.jpg', electric: 'electric-scrambler-render.jpg' };

function renderTOC(active, page) {
  toc.innerHTML = `<span class="ute-label">Course</span>
    <ol>${MODULES.map((m) => `<li><a href="#${m.id}" class="${active && active.id === m.id ? 'is-on' : ''}">${m.title}</a>
      ${active && active.id === m.id ? `<ol class="ute-toc-sub">${m.chapters.map((c) => `<li><a href="#${c.id}" data-chap="${c.id}" class="${page === c.id ? 'is-on' : ''} ${PG.isDone(c.id) ? 'is-done' : ''}">${c.title}</a></li>`).join('')}<li><a href="#${m.id}-glossary" data-chap="${m.id}-glossary" class="${page === m.id + '-glossary' ? 'is-on' : ''}">Glossary and further reading</a></li></ol>` : ''}</li>`).join('')}</ol>
    <div class="ute-toc-foot"><a class="ute-linkbtn${page === 'equations' ? ' is-warm' : ''}" href="#equations">Equations summary</a><a class="ute-linkbtn" href="${ROOT}quiz/">Take the quiz →</a></div>`;
}

function home() {
  document.title = 'Motopedia · Learn';
  renderTOC(null);
  main.innerHTML = `
    <section class="ute-hero">
      <span class="ute-label">Open course · CC BY-SA 4.0</span>
      <h1>How motorcycles work, from the first combustion stroke to the BMS of an electric bike.</h1>
      <p>Six modules, re-told for the screen: short explanations, live figures you can drive, and a quick check at the end of every chapter. Reference values come from a fuel-injected 125 cc single, the K-Light 125.</p>
      <div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="#${MODULES[0].id}">Start with Module ${MODULES[0].num} →</a><a class="ute-linkbtn" href="#equations">Equations summary</a><a class="ute-linkbtn" href="${ROOT}overview/">Open the Overview</a><a class="ute-linkbtn" href="${ROOT}quiz/">Quiz</a><a class="ute-linkbtn" href="${ROOT}types/">Motorcycle types</a><a class="ute-linkbtn" href="${ROOT}build/">Bike builder</a><a class="ute-linkbtn" href="${ROOT}kids/">Kids: Build a bike</a></div>
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
        ['Module 1', 'For everyone. Then explore the bike in the Overview.'],
        ['Modules 2, 3 and 4', 'For combustion machines, in that order.'],
        ['Module 5', 'For every machine, combustion or electric.'],
        ['Module 6', 'After Module 4, Electrical systems.'],
      ].map(([t, h], i) => `<div class="ute-step"><b>${i + 1}</b><div><strong>${t}</strong><p>${h}</p></div></div>`).join('')}</div>
    </section>`;
}

function glossaryHTML(mod) {
  const g = GLOSSARY[mod.gkey || 'm' + (MODULES.indexOf(mod) + 1)];
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

// consecutive photo blocks render side by side
function photoRuns(blocks) {
  const out = [];
  for (const b of blocks) {
    const last = out[out.length - 1];
    if (b.type === 'photo' && last && (last.type === 'photo' || last.type === 'photos')) {
      if (last.type === 'photo') out[out.length - 1] = { type: 'photos', items: [last, b] };
      else last.items.push(b);
    } else out.push(b);
  }
  return out;
}
/* "Compare the types": one card per variant, with its render linking to the 3D library */
const VAR_ROWS = [['what', 'What it is'], ['good_for', 'Good for'], ['conditions', 'Ideal conditions'], ['watch', 'Watch for']];
const attr = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
function variantsHTML(b) {
  const items = (b.items || []).filter((it) => MODELS[it.model]);
  if (!items.length) return '';
  const img = (k) => `${ROOT}assets/renders/${k.startsWith('bike_') && !k.includes('__') ? k + '_side' : k}.webp`;
  return `<section class="mz-vt"><div class="mz-vt-head"><span class="ute-label">Compare the types</span>${b.title ? `<h4>${b.title}</h4>` : ''}${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <div class="mz-vt-grid">${items.map((it) => `<article class="mz-vt-card">
      <a class="mz-vt-img" href="${ROOT}models/#${it.model}" aria-label="View ${attr(it.name)} in 3D"><img src="${img(it.model)}" alt="${attr(MODELS[it.model][1])}" loading="lazy" width="640" height="480"><span class="mz-vt-3d">View in 3D</span></a>
      <div class="mz-vt-body"><h5>${it.name}</h5><dl>${VAR_ROWS.filter(([k]) => it[k]).map(([k, l]) => `<div><dt>${l}</dt><dd>${it[k]}</dd></div>`).join('')}</dl></div>
    </article>`).join('')}</div></section>`;
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
    case 'videos': return `<section class="mz-learn-videos"><h3>${b.title || 'Watch'}</h3><div class="mz-yts">${b.items.map((v) => `<div class="mz-yt" data-id="${v.id}" data-title="${(v.title || '').replace(/"/g, '&quot;')}"><div class="mz-yt-stage"><button type="button" class="mz-yt-play" aria-label="Play video: ${(v.title || '').replace(/"/g, '&quot;')}"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><i></i></button></div><div class="mz-yt-info">${v.role ? `<span class="mz-yt-role">${v.role}</span>` : ''}<b>${v.title}</b><span><a href="${v.channel_url}" target="_blank" rel="noopener">${v.channel}</a> · ${v.duration}</span><p>${v.note}</p></div></div>`).join('')}</div><p class="mz-credit">Videos by their creators on YouTube. They play only when you press play.</p></section>`;
    case 'photo': return `<figure class="ute-figure mz-learn-photo"><div class="ute-figure-stage"><img src="${ROOT}assets/${b.src.includes('/') ? '' : b.src.startsWith('render-') ? 'renders/photo/' : 'photos/'}${b.src}" alt="${(b.caption || '').replace(/"/g, '&quot;')}" loading="lazy"></div>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">${/render/.test(b.src) ? 'Render' : 'Photograph'}</span> ${b.caption}${b.credit ? ` <span class="mz-credit">${b.credit}</span>` : ''}</figcaption>` : ''}</figure>`;
    case 'wiring': {
      const TAB = { harness: ['harness', 'WR01 · Main harness'], starting: ['starting-cranking', 'F23 · Starting circuit'], charging: ['charging', 'F21 · Charging circuit'], ignition: ['ignition-spark', 'F22 · Ignition circuits'] };
      const t = TAB[b.tab] || TAB.harness;
      const img = b.preview || t[0];
      return `<figure class="ute-figure mz-learn-wiring"><a class="mz-wiring-card" href="${ROOT}wiring/#${b.tab || 'harness'}"><img src="${ROOT}assets/interactive/wiring/preview/${img}.png" alt="Wiring Lab: ${t[1]}" loading="lazy"><span class="ute-linkbtn is-warm">Open the Wiring Lab: ${t[1]} →</span></a>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">Interactive</span> ${b.caption}</figcaption>` : ''}</figure>`;
    }
    case 'animation': return `<figure class="ute-figure mz-learn-anim"><iframe data-src="${ROOT}overview/?embed=1&mode=${b.mode || '4t'}&part=${b.part}" title="Interactive animation: ${b.part}" loading="lazy"></iframe>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">Try it</span> ${b.caption}</figcaption>` : ''}</figure>`;
    case 'variants': return variantsHTML(b);
    case 'eq': return eqHTML(b, false);
    case 'check': return `<div class="ute-check" data-q="${b.q}"></div>`;
    case 'exercise': return `<section class="mz-exercise"><div class="mz-ex-head"><span class="ute-label">Exercise · Circuit Builder</span><h4>${b.title}</h4></div><dl class="mz-ex-list"><div><dt>Task</dt><dd>${b.task}</dd></div><div><dt>Measure</dt><dd>${b.measure}</dd></div><div><dt>Expect</dt><dd>${b.expect}</dd></div>${b.why ? `<div><dt>Why</dt><dd>${b.why}</dd></div>` : ''}</dl><a class="ute-linkbtn is-warm" href="${ROOT}wiring/#build=${encodeURIComponent(b.preset)}">Open the circuit in the Circuit Builder →</a></section>`;
    case 'engine': return `<figure class="ute-figure mz-eng-shot"><a href="${ROOT}engine/#${b.view || 'overview'}"><img src="${ROOT}assets/engine/shots/${b.shot}.webp" alt="${(b.alt || b.caption || '').replace(/"/g, '&quot;')}" loading="lazy"><span class="mz-eng-go">Open in Under the Engine →</span></a>${b.caption ? `<figcaption class="ute-figure-cap"><span class="ute-label">Try it</span> ${b.caption}</figcaption>` : ''}</figure>`;
    case 'gearing': return `<figure class="ute-figure mz-gear" data-gearing><div class="mz-gear-ctl"><label>Front sprocket <input type="range" min="13" max="17" step="1" value="15" data-g="f"><output>15</output></label><label>Rear sprocket <input type="range" min="36" max="52" step="1" value="44" data-g="r"><output>44</output></label></div><svg viewBox="0 0 640 300" role="img" aria-label="Road speed against engine speed in each gear"></svg><p class="mz-gear-out"></p><figcaption class="ute-figure-cap"><span class="ute-label">Try it</span> ${b.caption || 'Change the sprockets and watch the speed in each gear move. The same chart, with torque, top speed and wheel size, is in the <a href="' + ROOT + 'build/">Bike builder</a>.'}</figcaption></figure>`;
    default: void mod; return '';
  }
}


/* ---------- Equations: typeset with KaTeX (maths fonts), and the course summary of every equation ----------
   Block: { "type": "eq", "id": "torque", "name": "Torque", "tex": "T = F\\,r",
            "where": [["T", "torque", "N·m"], ["F", "force", "N"], ["r", "radius", "m"]],
            "why": "What it is for", "example": "optional worked line, may use \\( \\) maths" }
   Inline maths anywhere in course text: \( ... \); display maths: \[ ... \]. */
const KATEX = ROOT + 'assets/vendor/katex/'; // KaTeX 0.16.11, MIT licence
let katexReady = null;
function loadKatex() {
  if (katexReady) return katexReady;
  const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = KATEX + 'katex.min.css'; document.head.appendChild(css);
  const js = (src) => new Promise((ok, no) => { const t = document.createElement('script'); t.src = src; t.defer = true; t.onload = ok; t.onerror = no; document.head.appendChild(t); });
  katexReady = js(KATEX + 'katex.min.js').then(() => js(KATEX + 'contrib/auto-render.min.js'));
  return katexReady;
}
function typeset(root) {
  if (!/\\\(|\\\[/.test(root.innerHTML)) return;
  loadKatex().then(() => window.renderMathInElement(root, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false, ignoredClasses: ['mz-no-math'] })).catch(() => {});
}
function eqHTML(b, summary, where) {
  const sym = (b.where || []).map(([t, m, u]) => `<div><dt>\\(${t}\\)</dt><dd>${m}${u ? ` <span class="mz-eq-unit">${u}</span>` : ''}</dd></div>`).join('');
  return `<figure class="mz-eq${summary ? ' is-summary' : ''}" id="eq-${b.id}">
    <figcaption><span class="ute-label">${summary ? where : 'Equation'}</span><b>${b.name}</b></figcaption>
    <div class="mz-eq-tex">\\[${b.tex}\\]</div>
    ${sym ? `<dl class="mz-eq-where"><span class="mz-eq-wh">where</span>${sym}</dl>` : ''}
    ${b.why ? `<p class="mz-eq-why"><b>${summary ? 'Why it matters' : 'What it is for'}:</b> ${b.why}</p>` : ''}
    ${b.example && !summary ? `<p class="mz-eq-ex"><b>Example:</b> ${b.example}</p>` : ''}
  </figure>`;
}
function allEquations() {
  const out = [];
  MODULES.forEach((m) => m.chapters.forEach((c, ci) => c.blocks.forEach((b) => { if (b.type === 'eq') out.push({ m, c, ci, b }); })));
  return out;
}
function renderEquations() {
  document.title = 'Motopedia · Course summary: every equation';
  renderTOC(null, 'equations');
  const eqs = allEquations();
  main.innerHTML = `<div class="mz-page">
    <nav class="mz-crumbs" aria-label="Breadcrumb"><a href="#">Learn</a><span>/</span><b>Equations summary</b></nav>
    <article class="ute-chapter mz-chapter mz-eqsum">
      <div class="ute-chapter-kicker"><span class="ute-label">Course summary</span></div>
      <h2>Every equation in the course</h2>
      <p class="lead">${eqs.length} equations, in the order the course teaches them. Each one shows what the symbols mean, why it matters on a real motorcycle, and the chapter where it is explained with a worked example.</p>
      <nav class="mz-eqsum-jump">${MODULES.filter((m) => eqs.some((e) => e.m === m)).map((m) => `<a href="#equations" data-jump="eqm-${m.id}">Module ${m.num}</a>`).join('')}</nav>
      ${MODULES.map((m) => { const l = eqs.filter((e) => e.m === m); return l.length ? `<section class="mz-eqsum-mod" id="eqm-${m.id}"><h3>Module ${m.num} · ${m.title}</h3>${l.map((e) => eqHTML(e.b, true, `Chapter ${m.num}.${e.ci + 1} · <a href="#${e.c.id}">${e.c.title} →</a>`)).join('')}</section>` : ''; }).join('')}
    </article>
    <nav class="mz-pager" aria-label="Chapter navigation"><a class="mz-pager-prev" href="#${MODULES[MODULES.length - 1].id}-glossary"><span class="ute-label">← Previous</span><b>Module ${MODULES[MODULES.length - 1].num} glossary</b></a><a class="mz-pager-next" href="${ROOT}quiz/"><span class="ute-label">Finished →</span><b>Take the full quiz</b></a></nav>
  </div>`;
  main.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth' }); }));
  typeset(main);
  window.scrollTo(0, 0);
}

/* ---------- One page per chapter: module overview, chapter pages, glossary page ---------- */
const FLAT = MODULES.flatMap((m) => [...m.chapters.map((c) => ({ mod: m, chap: c })), { mod: m, chap: null, gloss: true }]);
const pageHash = (p) => (p.gloss ? `${p.mod.id}-glossary` : p.chap.id);
const pageTitle = (p) => (p.gloss ? 'Glossary and further reading' : p.chap.title);

/* Gearing chart: road speed against engine speed in each gear, for the course's
   125 cc roadster (primary 3.35, five gears, 1.95 m rolling circumference, 10,000 r/min). */
function mountGearing(fig) {
  const G = [2.77, 1.88, 1.40, 1.13, 0.96], PRI = 3.35, CIRC = 1.95, RED = 10000;
  const svg = fig.querySelector('svg'), out = fig.querySelector('.mz-gear-out');
  const W = 640, H = 300, L = 46, B = 34, T = 12, R = 14;
  const draw = () => {
    const f = +fig.querySelector('[data-g="f"]').value, r = +fig.querySelector('[data-g="r"]').value;
    fig.querySelectorAll('label output').forEach((o) => { o.textContent = o.previousElementSibling.value; });
    const fd = r / f, sp = (g, n) => n / (PRI * g * fd) * CIRC * 60 / 1000;
    const vmax = 160, x = (n) => L + n / RED * (W - L - R), y = (v) => H - B - v / vmax * (H - B - T);
    let h = '';
    for (let v = 0; v <= vmax; v += 40) h += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#ECECEC"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#5F6166">${v}</text>`;
    for (let n = 0; n <= RED; n += 2000) h += `<text x="${x(n)}" y="${H - B + 16}" text-anchor="middle" font-size="11" fill="#5F6166">${n / 1000}k</text>`;
    h += `<text x="${(L + W) / 2}" y="${H - 4}" text-anchor="middle" font-size="11" fill="#5F6166">engine speed, r/min</text><text x="${L + 8}" y="${T + 14}" font-size="11" fill="#5F6166">road speed, km/h</text>`;
    G.forEach((g, i) => { const v = sp(g, RED); h += `<line x1="${x(0)}" y1="${y(0)}" x2="${x(RED)}" y2="${y(Math.min(v, vmax))}" stroke="${i === 4 ? '#C2502A' : '#0A0A0A'}" stroke-width="${i === 4 ? 3 : 1.6}"/><text x="${x(RED) - 4}" y="${y(Math.min(v, vmax)) - 5}" text-anchor="end" font-size="12" font-weight="700" fill="${i === 4 ? '#C2502A' : '#0A0A0A'}">${i + 1}</text>`; });
    svg.innerHTML = h;
    const top = sp(G[4], RED), first = PRI * G[0] * fd;
    out.innerHTML = `Final drive <b>${fd.toFixed(2)} : 1</b> · overall in 1st <b>${first.toFixed(1)} : 1</b> · top gear at 10,000 r/min <b>${top.toFixed(0)} km/h</b> (drag usually stops a 125 well before this)`;
  };
  fig.querySelectorAll('input').forEach((i) => i.addEventListener('input', draw));
  draw();
}

function wireContent() {
  main.querySelectorAll('[data-fig]').forEach((f) => mountFigure(f.dataset.fig, f));
  main.querySelectorAll('[data-plate]').forEach((f) => {
    const open = () => openPlate(f.dataset.plate);
    f.addEventListener('click', open);
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  setupModels();
  setupAnims();
  main.querySelectorAll('[data-gearing]').forEach(mountGearing);
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
  document.title = `Motopedia · ${mod.title}`;
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
          <a class="ute-linkbtn" href="${ROOT}assets/pdf/${mod.pdf}" target="_blank" rel="noopener" title="Earlier, shorter edition. Sign in to download.">Download the PDF (older edition)</a>
          <a class="ute-linkbtn" href="${ROOT}quiz/?topic=${mod.id}">Quiz this module</a>
        </div>
        <p class="mz-pdf-note-small">The PDF is the earlier, shorter edition of this module; the chapters on this page are the current, fuller version. Sign in with a free account to download it.</p>
      </div>
    </section>
    <section class="ute-chapter">
      <h2>Chapters</h2>
      <ol class="mz-chaplist">${mod.chapters.map((c, ci) => {
        const ci_img = CHAPTER_IMG[c.id];
        let img = ci_img ? `${ROOT}assets/${ci_img}` : '';
        const photo = ci_img && isPhoto(ci_img);
        if (!img) {
          const pic = c.blocks.find((b) => b.type === 'plate') || c.blocks.find((b) => b.type === 'model' || b.type === 'models');
          if (pic && pic.type === 'plate') img = `${ROOT}assets/illustrations/${plateSrc(pic.id)}`;
          else if (pic) { const f = pic.file || pic.files[0]; img = `${ROOT}assets/renders/${f.startsWith('bike_') ? f + '_side' : f}.webp`; }
        }
        return `<li><a href="#${c.id}">${img ? `<img src="${img}" alt="" loading="lazy" class="${photo ? 'is-photo' : ''}">` : '<span></span>'}<div><span class="ute-chapter-num">${mod.num}.${ci + 1}</span>${PG.isDone(c.id) ? '<span class="mz-done-tag">✓ Completed</span>' : PG.isSeen(c.id) ? '<span class="mz-seen-tag">Started</span>' : ''}<h3>${c.title}</h3><p>${c.lead || ''}</p></div></a></li>`;
      }).join('')}
      <li><a href="#${mod.id}-glossary"><span class="mz-az">A–Z</span><div><span class="ute-chapter-num">${mod.num}</span><h3>Glossary and further reading</h3><p>Every term used in the module, and where to read more.</p></div></a></li></ol>
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
  document.title = `Motopedia · ${pageTitle(p)}`;
  renderTOC(mod, pageHash(p));
  const pager = `<nav class="mz-pager" aria-label="Chapter navigation">
      ${prev ? `<a class="mz-pager-prev" href="#${pageHash(prev)}"><span class="ute-label">← Previous</span><b>${pageTitle(prev)}</b></a>` : '<span></span>'}
      ${next ? `<a class="mz-pager-next" href="#${pageHash(next)}"><span class="ute-label">Next →</span><b>${pageTitle(next)}</b></a>` : `<a class="mz-pager-next" href="#equations"><span class="ute-label">Course summary →</span><b>Every equation in the course</b></a>`}
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
          <div class="prose">${photoRuns(chap.blocks).map((b) => b.type === 'photos' ? `<div class="mz-photo-row">${b.items.map((x) => block(x, mod)).join('')}</div>` : block(b, mod)).join('')}</div>
          ${chap.lab ? `<div class="ute-chapter-foot"><a class="ute-linkbtn is-warm" href="${ROOT}${chap.lab.startsWith('?') ? 'overview/' + chap.lab : chap.lab}">Try it in the Overview →</a></div>` : ''}
          <div class="mz-complete"><button type="button" class="ute-btn ${PG.isDone(chap.id) ? '' : 'is-primary'}" data-complete="${chap.id}">${PG.isDone(chap.id) ? '✓ Chapter completed' : 'Mark this chapter as complete'}</button><a href="${ROOT}progress/">My progress</a></div>
        </article>
        ${pager}
      </div>`;
  }
  wireContent();
  typeset(main);
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
  if (h === 'equations') { renderEquations(); return; }
  const slug = TOPIC_ALIAS[h] || h;
  const mod = MODULES.find((m) => m.id === slug);
  if (mod) { renderModuleIndex(mod); return; }
  const p = FLAT.find((x) => pageHash(x) === h);
  if (p) { renderPage(p); return; }
  home();
}
window.addEventListener('hashchange', route);
route();
