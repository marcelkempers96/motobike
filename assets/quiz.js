/* Moto Zero — Quiz page. No login; best scores kept in this browser only. */
import { MODULES, QUESTIONS, TOPIC_ALIAS } from './content/index.js';
import { questionCard, shuffle } from './quizkit.js';

const $ = (s, r = document) => r.querySelector(s);
const wrap = $('#quiz-main');
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};

const params = new URLSearchParams(location.search);
const rawTopic = params.get('topic') || '';
const mnum = rawTopic.match(/^m(\d)-/);
let topic = TOPIC_ALIAS[rawTopic] || (mnum && MODULES[+mnum[1] - 1] ? MODULES[+mnum[1] - 1].id : 'all');
let length = 10;
let run = null;

const pool = () => QUESTIONS.filter((q) => topic === 'all' || q.module === topic);
const modTitle = (id) => (MODULES.find((m) => m.id === id) || {}).title || 'All modules';

function setup() {
  const best = store.get('mz-best') || {};
  wrap.innerHTML = `
    <span class="ute-label">Quiz · no login</span>
    <h1 class="ute-quiz-title">Test yourself</h1>
    <p class="ute-sub">Pick a module and a length. Choose an answer to see instantly if you were right and why.</p>
    <h4 class="ute-quiz-h">Topic</h4>
    <div class="ute-chips" data-topics>
      <button type="button" class="ute-chip ${topic === 'all' ? 'is-on' : ''}" data-t="all">All modules · ${QUESTIONS.length}</button>
      ${MODULES.map((m) => `<button type="button" class="ute-chip ${topic === m.id ? 'is-on' : ''}" data-t="${m.id}">${m.num} ${m.title.split(':')[0]} · ${QUESTIONS.filter((q) => q.module === m.id).length}</button>`).join('')}
    </div>
    <h4 class="ute-quiz-h">Length</h4>
    <div class="ute-seg" data-len>${[5, 10, 20, 0].map((n) => `<button type="button" data-n="${n}" class="${length === n ? 'is-on' : ''}">${n || 'All'}</button>`).join('')}</div>
    <div class="ute-chapter-foot"><button type="button" class="ute-btn is-primary ute-btn-lg" data-start>Start quiz →</button></div>
    ${Object.keys(best).length ? `<h4 class="ute-quiz-h">Your best scores (this browser)</h4><div class="ute-keys">${Object.entries(best).map(([k, v]) => `<div class="k"><div class="l">${modTitle(k)}</div><div class="v">${v.pct} %</div><p>${v.right} / ${v.total}</p></div>`).join('')}</div>` : ''}`;
  wrap.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => { topic = b.dataset.t; setup(); }));
  wrap.querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => { length = +b.dataset.n; setup(); }));
  $('[data-start]').addEventListener('click', start);
}

function start() {
  const qs = shuffle(pool());
  run = { qs: length ? qs.slice(0, length) : qs, i: 0, right: 0, log: [] };
  ask();
}

function ask() {
  const { qs, i } = run;
  const q = qs[i];
  wrap.innerHTML = `
    <div class="ute-scoreline"><span class="ute-label">${modTitle(topic)}</span><span class="ute-label">Question ${i + 1} / ${qs.length} · Score ${run.right}</span></div>
    <div class="ute-progress"><i style="width:${i / qs.length * 100}%"></i></div>
    <div data-slot></div>
    <div class="ute-chapter-foot" style="justify-content:space-between"><button type="button" class="ute-btn" data-quit>Quit</button><button type="button" class="ute-btn is-primary" data-next disabled>${i + 1 === qs.length ? 'See results →' : 'Next →'}</button></div>`;
  const mod = MODULES.find((m) => m.id === q.module);
  const card = questionCard(q, {
    meta: mod ? `Module ${mod.num}` : '',
    order: shuffle(q.options.map((_, k) => k)),
    onAnswer: (ok, pick) => {
      if (ok) run.right++;
      run.log.push({ q, ok, pick });
      const n = $('[data-next]');
      n.disabled = false;
      n.focus();
      $('.ute-scoreline .ute-label:last-child').textContent = `Question ${i + 1} / ${qs.length} · Score ${run.right}`;
    },
  });
  $('[data-slot]').appendChild(card);
  $('[data-next]').addEventListener('click', () => { run.i++; if (run.i < run.qs.length) ask(); else results(); });
  $('[data-quit]').addEventListener('click', setup);
  window.scrollTo(0, 0);
}

function results() {
  const total = run.qs.length, pct = Math.round(run.right / total * 100);
  const best = store.get('mz-best') || {};
  if (!best[topic] || pct > best[topic].pct) { best[topic] = { pct, right: run.right, total }; store.set('mz-best', best); }
  const wrong = run.log.filter((l) => !l.ok);
  wrap.innerHTML = `
    <div class="ute-progress"><i style="width:100%"></i></div>
    <div class="ute-result">
      <span class="ute-label">${modTitle(topic)} · result</span>
      <div class="big">${run.right} / ${total}</div>
      <p>${pct >= 90 ? 'Workshop-ready. Excellent.' : pct >= 70 ? 'Solid. Review the ones you missed below.' : pct >= 50 ? 'Getting there. Re-read the chapters linked below and try again.' : 'Worth another pass through the Learn pages first.'}</p>
      <div class="ute-chapter-foot"><button type="button" class="ute-btn is-primary" data-again>Try again</button>${wrong.length ? '<button type="button" class="ute-btn" data-retry>Retry the ones I missed</button>' : ''}<button type="button" class="ute-btn" data-setup>Change topic</button></div>
    </div>
    <h4 class="ute-quiz-h">Review</h4>
    <div class="ute-review">${run.log.map((l) => `
      <div class="ute-review-item ${l.ok ? 'is-right' : 'is-wrong'}">
        <b>${l.ok ? '✓' : '✗'} ${l.q.q}</b><br>
        Answer: <b>${l.q.options[l.q.answer]}</b>${l.ok ? '' : ` · You chose: ${l.q.options[l.pick]}`}<br>
        <span>${l.q.explain || ''}</span>
        <div><a href="../learn/#${l.q.chapter}">Read the chapter →</a></div>
      </div>`).join('')}</div>`;
  $('[data-again]').addEventListener('click', start);
  $('[data-setup]').addEventListener('click', setup);
  const r = $('[data-retry]');
  if (r) r.addEventListener('click', () => { run = { qs: shuffle(wrong.map((w) => w.q)), i: 0, right: 0, log: [] }; ask(); });
  window.scrollTo(0, 0);
}

setup();
