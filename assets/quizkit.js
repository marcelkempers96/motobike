/* Shared multiple-choice question card (Learn "check yourself" + Quiz page). */
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const esc = (s) => String(s);

export function questionCard(q, { meta = '', onAnswer, order, retry = false } = {}) {
  const idx = order || q.options.map((_, i) => i);
  const el = document.createElement('div');
  el.className = 'ute-q';
  el.innerHTML = `
    <div class="ute-q-meta"><span class="ute-label">${meta}</span><span class="ute-label">${esc(q.kind || '')}</span></div>
    <div class="ute-q-text">${esc(q.q)}</div>
    <div class="ute-q-opts" role="group" aria-label="Answers">
      ${idx.map((oi, n) => `<button type="button" class="ute-opt" data-oi="${oi}"><span class="letter">${LETTERS[n]}</span><span>${esc(q.options[oi])}</span><span class="mark"></span></button>`).join('')}
    </div>
    <div class="ute-q-explain" aria-live="polite"></div>`;
  let done = false, tries = 0;
  const finish = (pick) => {
    done = true;
    const right = pick === q.answer;
    el.querySelectorAll('.ute-opt').forEach((o) => {
      const oi = +o.dataset.oi;
      o.disabled = true;
      if (oi === q.answer) { o.classList.add('is-right'); o.querySelector('.mark').textContent = 'Correct'; }
      else if (oi === pick) { o.classList.add('is-wrong'); o.querySelector('.mark').textContent = 'Your pick'; }
      else if (!o.classList.contains('is-wrong')) o.classList.add('is-dim');
    });
    const ex = el.querySelector('.ute-q-explain');
    ex.innerHTML = `<b>${pick === -1 ? 'Time is up.' : right ? (tries > 1 ? 'Right, on the second try.' : 'Right.') : 'Not quite.'}</b> ${esc(q.explain || '')}`;
    ex.classList.add('is-on');
    ex.classList.toggle('is-wrong', !right);
    if (onAnswer) onAnswer(right && tries === 1, pick, tries);
  };
  el.querySelectorAll('.ute-opt').forEach((b) => b.addEventListener('click', () => {
    if (done || b.disabled) return;
    tries++;
    const pick = +b.dataset.oi;
    if (pick !== q.answer && retry && tries === 1) {
      b.disabled = true;
      b.classList.add('is-wrong');
      b.querySelector('.mark').textContent = 'Try again';
      const ex = el.querySelector('.ute-q-explain');
      ex.innerHTML = '<b>Not quite.</b> Have another look and pick again.';
      ex.classList.add('is-on', 'is-wrong');
      return;
    }
    finish(pick);
  }));
  el.reveal = () => { if (!done) { tries = Math.max(tries, 1); finish(-1); } };
  return el;
}

export function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
