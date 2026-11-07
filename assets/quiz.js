/* Motopedia: Quiz. Easy, mixed or hard; no login; scores saved in this browser. */
import { MODULES, QUESTIONS, TOPIC_ALIAS } from './content/index.js';
import { questionCard, shuffle } from './quizkit.js';
import * as PG from './progress.js';

const $ = (s, r = document) => r.querySelector(s);
const wrap = $('#quiz-main');

const LEVELS = {
  easy: { label: 'Easy', blurb: 'Recall and fault-finding questions, three answers to choose from, and a second try if you miss.', kinds: ['recall', 'diagnosis'], options: 3, retry: true, timer: 0 },
  mixed: { label: 'Mixed', blurb: 'Every kind of question with four answers and one try.', kinds: ['recall', 'diagnosis', 'calc'], options: 4, retry: false, timer: 0 },
  hard: { label: 'Hard', blurb: 'Calculations and fault-finding, four answers, one try and 60 seconds per question. Keep a calculator handy.', kinds: ['calc', 'diagnosis'], options: 4, retry: false, timer: 60 },
};

const params = new URLSearchParams(location.search);
const rawTopic = params.get('topic') || '';
const mnum = rawTopic.match(/^m(\d)-/);
let topic = TOPIC_ALIAS[rawTopic] || (mnum && MODULES[+mnum[1] - 1] ? MODULES[+mnum[1] - 1].id : 'all');
let level = LEVELS[params.get('level')] ? params.get('level') : 'mixed';
let length = 10;
let run = null;
let timer = 0;

const pool = () => QUESTIONS.filter((q) => (topic === 'all' || q.module === topic) && LEVELS[level].kinds.includes(q.kind));
const modTitle = (id) => (MODULES.find((m) => m.id === id) || {}).title || 'All modules';

function bestsHTML() {
  const d = PG.load().quiz;
  const rows = [['all', 'All modules'], ...MODULES.map((m) => [m.id, `${m.num} ${m.title.split(':')[0]}`])]
    .map(([id, t]) => {
      const cells = ['easy', 'mixed', 'hard'].map((l) => { const b = d[`${id}|${l}`]; return `<td>${b ? `<b>${b.best} %</b><small>${b.attempts}×</small>` : '<span>–</span>'}</td>`; }).join('');
      return Object.keys(d).some((k) => k.startsWith(id + '|')) ? `<tr><th>${t}</th>${cells}</tr>` : '';
    }).join('');
  return rows ? `<h4 class="ute-quiz-h">Your best scores (saved in this browser)</h4><div class="ute-table-wrap"><table class="ute-table mz-best"><thead><tr><th>Topic</th><th>Easy</th><th>Mixed</th><th>Hard</th></tr></thead><tbody>${rows}</tbody></table></div><p><a href="../progress/">See all your progress →</a></p>` : '';
}

function setup() {
  clearInterval(timer);
  const n = pool().length;
  wrap.innerHTML = `
    <span class="ute-label">Quiz · no login</span>
    <h1 class="ute-quiz-title">Test yourself</h1>
    <p class="ute-sub">Choose a level, a module and a length. You see straight away whether you were right, and why.</p>
    <h4 class="ute-quiz-h">Level</h4>
    <div class="mz-levels" role="group" aria-label="Level">${Object.entries(LEVELS).map(([k, L]) => `
      <button type="button" class="mz-level ${level === k ? 'is-on' : ''}" data-level="${k}"><b>${L.label}</b><span>${L.blurb}</span></button>`).join('')}</div>
    <h4 class="ute-quiz-h">Topic</h4>
    <div class="ute-chips" data-topics>
      <button type="button" class="ute-chip ${topic === 'all' ? 'is-on' : ''}" data-t="all">All modules</button>
      ${MODULES.map((m) => `<button type="button" class="ute-chip ${topic === m.id ? 'is-on' : ''}" data-t="${m.id}">${m.num} ${m.title.split(':')[0]}</button>`).join('')}
    </div>
    <h4 class="ute-quiz-h">Length</h4>
    <div class="ute-seg" data-len>${[5, 10, 20, 0].map((k) => `<button type="button" data-n="${k}" class="${length === k ? 'is-on' : ''}">${k || 'All'}</button>`).join('')}</div>
    <p class="ute-sub" style="margin-top:10px">${n} questions available for this choice.</p>
    <div class="ute-chapter-foot"><button type="button" class="ute-btn is-primary ute-btn-lg" data-start ${n ? '' : 'disabled'}>Start the ${LEVELS[level].label.toLowerCase()} quiz →</button></div>
    ${bestsHTML()}`;
  wrap.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => { level = b.dataset.level; setup(); }));
  wrap.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => { topic = b.dataset.t; setup(); }));
  wrap.querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => { length = +b.dataset.n; setup(); }));
  $('[data-start]').addEventListener('click', () => start());
}

function start(list) {
  const qs = list || shuffle(pool());
  run = { qs: list ? qs : (length ? qs.slice(0, length) : qs), i: 0, right: 0, log: [], retry: !!list };
  ask();
}

function ask() {
  clearInterval(timer);
  const L = LEVELS[level];
  const { qs, i } = run;
  const q = qs[i];
  wrap.innerHTML = `
    <div class="ute-scoreline"><span class="ute-label">${modTitle(topic)} · ${L.label}</span><span class="ute-label" data-score>Question ${i + 1} of ${qs.length} · Score ${run.right}</span></div>
    <div class="ute-progress"><i style="width:${i / qs.length * 100}%"></i></div>
    ${L.timer ? `<div class="mz-timer" aria-live="off"><i></i><span data-time>${L.timer} s</span></div>` : ''}
    <div data-slot></div>
    <div class="ute-chapter-foot" style="justify-content:space-between"><button type="button" class="ute-btn" data-quit>Quit</button><button type="button" class="ute-btn is-primary" data-next disabled>${i + 1 === qs.length ? 'See results →' : 'Next →'}</button></div>`;
  const mod = MODULES.find((m) => m.id === q.module);
  // Easy: drop one wrong answer so three remain
  let order = shuffle(q.options.map((_, k) => k));
  if (L.options === 3) { const wrong = order.filter((k) => k !== q.answer); order = order.filter((k) => k !== wrong[0]); }
  let answered = false;
  const card = questionCard(q, {
    meta: mod ? `Module ${mod.num} · ${q.kind}` : q.kind,
    order,
    retry: L.retry,
    onAnswer: (ok, pick) => {
      answered = true;
      clearInterval(timer);
      if (ok) run.right++;
      run.log.push({ q, ok, pick });
      const n = $('[data-next]');
      n.disabled = false;
      n.focus();
      $('[data-score]').textContent = `Question ${i + 1} of ${qs.length} · Score ${run.right}`;
    },
  });
  $('[data-slot]').appendChild(card);
  if (L.timer) {
    let left = L.timer;
    const bar = $('.mz-timer i'), lab = $('[data-time]');
    timer = setInterval(() => {
      left -= 1;
      if (lab) lab.textContent = `${left} s`;
      if (bar) bar.style.width = `${left / L.timer * 100}%`;
      if (left <= 10 && bar) bar.classList.add('is-low');
      if (left <= 0) { clearInterval(timer); if (!answered) card.reveal(); }
    }, 1000);
  }
  $('[data-next]').addEventListener('click', () => { run.i++; if (run.i < run.qs.length) ask(); else results(); });
  $('[data-quit]').addEventListener('click', setup);
  window.scrollTo(0, 0);
}

function results() {
  clearInterval(timer);
  const total = run.qs.length, pct = Math.round(run.right / total * 100);
  if (!run.retry) PG.recordQuiz(topic, level, run.right, total);
  const wrong = run.log.filter((l) => !l.ok);
  wrap.innerHTML = `
    <div class="ute-progress"><i style="width:100%"></i></div>
    <div class="ute-result">
      <span class="ute-label">${modTitle(topic)} · ${LEVELS[level].label} · result</span>
      <div class="big">${run.right} / ${total}</div>
      <p>${pct >= 90 ? 'Workshop-ready. Excellent.' : pct >= 70 ? 'Solid. Review the ones you missed below.' : pct >= 50 ? 'Getting there. Re-read the chapters linked below and try again.' : 'Worth another pass through the course pages first.'}${level !== 'hard' && pct >= 80 ? ' Ready for the hard level?' : ''}</p>
      <div class="ute-chapter-foot"><button type="button" class="ute-btn is-primary" data-again>Try again</button>${wrong.length ? '<button type="button" class="ute-btn" data-retry>Retry the ones I missed</button>' : ''}${level !== 'hard' ? '<button type="button" class="ute-btn" data-harder>Try the hard level</button>' : ''}<button type="button" class="ute-btn" data-setup>Change topic or level</button></div>
    </div>
    <h4 class="ute-quiz-h">Review</h4>
    <div class="ute-review">${run.log.map((l) => `
      <div class="ute-review-item ${l.ok ? 'is-right' : 'is-wrong'}">
        <b>${l.ok ? '✓' : '✗'} ${l.q.q}</b><br>
        Answer: <b>${l.q.options[l.q.answer]}</b>${l.ok ? '' : l.pick >= 0 ? ` · You chose: ${l.q.options[l.pick]}` : ' · No answer in time'}<br>
        <span>${l.q.explain || ''}</span>
        <div><a href="../learn/#${l.q.chapter}">Read the chapter →</a></div>
      </div>`).join('')}</div>`;
  $('[data-again]').addEventListener('click', () => start());
  $('[data-setup]').addEventListener('click', setup);
  const h = $('[data-harder]');
  if (h) h.addEventListener('click', () => { level = 'hard'; setup(); });
  const r = $('[data-retry]');
  if (r) r.addEventListener('click', () => start(shuffle(wrong.map((w) => w.q))));
  window.scrollTo(0, 0);
}

setup();
