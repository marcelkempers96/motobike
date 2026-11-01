/* Shared multiple-choice question card (Learn "check yourself" + Quiz page). */
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const esc = (s) => String(s);

export function questionCard(q, { meta = '', onAnswer, order } = {}) {
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
  let done = false;
  el.querySelectorAll('.ute-opt').forEach((b) => b.addEventListener('click', () => {
    if (done) return;
    done = true;
    const pick = +b.dataset.oi, right = pick === q.answer;
    el.querySelectorAll('.ute-opt').forEach((o) => {
      const oi = +o.dataset.oi;
      o.disabled = true;
      if (oi === q.answer) { o.classList.add('is-right'); o.querySelector('.mark').textContent = 'Correct'; }
      else if (oi === pick) { o.classList.add('is-wrong'); o.querySelector('.mark').textContent = 'Your pick'; }
      else o.classList.add('is-dim');
    });
    const ex = el.querySelector('.ute-q-explain');
    ex.innerHTML = `<b>${right ? 'Right.' : 'Not quite.'}</b> ${esc(q.explain || '')}`;
    ex.classList.add('is-on');
    ex.classList.toggle('is-wrong', !right);
    if (onAnswer) onAnswer(right, pick);
  }));
  return el;
}

export function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
