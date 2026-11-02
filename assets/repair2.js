/* Moto Zero Repair: search, tick-off steps, and redirects for old links. */
const ROOT = new URL('../', import.meta.url).pathname;
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Old links like /repair/parts/#battery or /repair/problems/#chain-noise go to the new pages.
const h = decodeURIComponent(location.hash.slice(1));
if (h && /\/repair\/(parts|problems|repairs)\/$/.test(location.pathname) && /^[a-z0-9_-]+$/.test(h) && !document.getElementById(h)) {
  const kind = location.pathname.match(/\/repair\/(\w+)\/$/)[1];
  fetch(`${ROOT}repair/${kind}/${h}/`, { method: 'HEAD' }).then((r) => { if (r.ok) location.replace(`${ROOT}repair/${kind}/${h}/`); }).catch(() => {});
}

const box = $('.r-search');
if (box) {
  import('./content/repair-index.js').then(({ default: D }) => {
    const U = { 'ok-to-ride': 'OK to ride', 'ride-with-care': 'Ride with care', 'do-not-ride': 'Do not ride', 'stop-now': 'Stop now' };
    const L = { rider: 'Rider job', home: 'Home workshop', workshop: 'Workshop job' };
    const items = [
      ...D.p.map(([id, t, also, sys, u]) => ({ k: 'Problem', t, d: `${sys} · ${U[u] || ''}`, h: `repair/problems/${id}/`, s: `${t} ${also} ${sys}`.toLowerCase() })),
      ...D.r.map(([id, t, l]) => ({ k: 'Repair', t, d: L[l] || '', h: `repair/repairs/${id}/`, s: t.toLowerCase() })),
      ...D.t.map(([id, t, al]) => ({ k: 'Part', t, d: 'Part', h: `repair/parts/${id}/`, s: `${t} ${al} ${id.replace(/_/g, ' ')}`.toLowerCase() })),
    ];
    const input = $('input', box), list = $('.r-results', box);
    const run = () => {
      const w = input.value.toLowerCase().split(/\s+/).filter((x) => x.length > 1);
      list.hidden = !w.length;
      if (!w.length) return;
      const r = items.map((x) => ({ x, n: w.filter((q) => x.s.includes(q)).length })).filter((o) => o.n === w.length || (w.length > 2 && o.n >= w.length - 1))
        .sort((a, b) => b.n - a.n || (a.x.k === 'Problem' ? -1 : 1)).slice(0, 25).map((o) => o.x);
      list.innerHTML = r.length ? r.map((x) => `<li><a href="${ROOT}${x.h}"><span>${x.k}</span><b>${esc(x.t)}</b><em>${esc(x.d)}</em></a></li>`).join('')
        : '<li class="none">Nothing found. Try a simpler word, for example “start”, “brake” or “chain”.</li>';
    };
    input.addEventListener('input', run);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const a = $('a', list); if (a) location.href = a.href; } });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) list.hidden = true; });
  });
}

// Repair pages: tick off the numbered steps as you work (saved in this browser).
const art = $('[data-steps]');
if (art) {
  const h2 = [...art.querySelectorAll('h2')].find((x) => /^steps/i.test(x.textContent.trim()));
  let ol = h2 && h2.nextElementSibling;
  while (ol && ol.tagName !== 'OL' && ol.tagName !== 'H2') ol = ol.nextElementSibling;
  if (ol && ol.tagName === 'OL') {
    const key = 'mz-rep-' + art.dataset.steps;
    let done = [];
    try { done = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { /* ignore */ }
    [...ol.children].forEach((li, i) => {
      const inner = document.createElement('div');
      while (li.firstChild) inner.appendChild(li.firstChild);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tick'; b.textContent = i + 1; b.setAttribute('aria-label', `Mark step ${i + 1} done`);
      li.append(b, inner);
      const set = (on) => { li.classList.toggle('is-done', on); b.textContent = on ? '✓' : String(i + 1); b.setAttribute('aria-pressed', String(on)); };
      set(done.includes(i));
      b.addEventListener('click', () => {
        const on = !done.includes(i);
        done = on ? [...done, i] : done.filter((x) => x !== i);
        set(on);
        try { localStorage.setItem(key, JSON.stringify(done)); } catch (e) { /* ignore */ }
      });
    });
  }
}
