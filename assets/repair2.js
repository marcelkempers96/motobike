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

const box = $('.r-search:not(.bk-search)');
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

/* ---------- Diagnostics tool (/repair/diagnose/): bike, system, symptom, result.
   State lives in the URL hash so a result can be shared: #bike=petrol&sys=brakes&p=spongy-brake ---------- */
const dg = document.getElementById('dg');
if (dg) {
  import('./content/repair-index.js').then(({ default: D }) => {
    const U = { 'ok-to-ride': ['OK to ride', 'ok', 'You can ride carefully to a safe place or workshop, but fix it soon.'], 'ride-with-care': ['Ride with care', 'care', 'Ride gently and only as far as you need to. Check it before a long trip.'], 'do-not-ride': ['Do not ride', 'stop', 'Do not ride until this is fixed. It can cause a crash or serious damage.'], 'stop-now': ['Stop now', 'now', 'Stop as soon as it is safe and switch off. Riding on can be dangerous.'] };
    const R = Object.fromEntries(D.r.map(([id, t, l]) => [id, { t, l }]));
    const T = Object.fromEntries(D.t.map(([id, t]) => [id, t]));
    const P = D.p.map(([id, t, also, sysName, u, sys, reps, parts]) => ({ id, t, also, sysName, u, sys, reps, parts }));
    const BIKES = {
      petrol: { t: 'Petrol motorcycle', d: 'Manual gears and a clutch, chain drive', hide: ['cvt', 'ev-drive', 'ev-battery'] },
      scooter: { t: 'Petrol scooter', d: 'Twist and go, automatic drive', hide: ['clutch', 'gearbox', 'chain', 'ev-drive', 'ev-battery'] },
      electric: { t: 'Electric motorcycle or scooter', d: 'Battery, controller and motor', hide: ['starting', 'running', 'fuel', 'ignition', 'engine', 'smoke', 'oil', 'cooling', 'clutch', 'gearbox', 'cvt', 'power'] },
    };
    const L = { rider: 'Rider job', home: 'Home workshop', workshop: 'Workshop job' };
    const q = () => Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
    const go = (o) => { location.hash = new URLSearchParams(o).toString(); };
    const steps = (n) => `<div class="dg-steps">${['Your bike', 'Where', 'What you notice', 'Result'].map((x, i) => `<span class="${i === n ? 'is-on' : i < n ? 'is-done' : ''}">${i + 1}. ${x}</span>`).join('')}</div>`;
    const card = (p, st) => `<button type="button" class="ru-li is-${(U[p.u] || [])[1] || ''}" data-p="${p.id}" title="${(U[p.u] || [''])[0]}"><b>${esc(p.t)}</b><i class="ru-sr">${(U[p.u] || [''])[0]}</i></button>`;
    const LEGEND = '<div class="ru-legend" aria-hidden="true"><span class="is-ok">OK to ride</span><span class="is-care">Ride with care</span><span class="is-stop">Do not ride</span><span class="is-now">Stop now</span></div>';
    const render = () => {
      const s = q();
      if (s.p) {
        const p = P.find((x) => x.id === s.p); if (!p) return go({});
        const u = U[p.u] || ['', '', ''];
        dg.innerHTML = `${steps(3)}<button class="dg-back" data-back="sys">← Back</button><div class="dg-res">
          <span class="ute-label">${esc(p.sysName)}</span><h3>${esc(p.t)}</h3>
          <p class="dg-safe is-${u[1]}"><b>${u[0]}.</b> ${u[2]}</p>
          <div class="dg-cols">
            <div><h4>Most likely fixes</h4><ul class="r-list">${p.reps.filter((x) => R[x]).map((x) => `<li><a href="${ROOT}repair/repairs/${x}/"><b>${esc(R[x].t)}</b><span>${L[R[x].l] || ''}</span></a></li>`).join('')}</ul></div>
            <div><h4>Parts to check</h4><ul class="r-list">${p.parts.filter((x) => T[x]).map((x) => `<li><a href="${ROOT}repair/parts/${x}/"><b>${esc(T[x])}</b></a></li>`).join('')}</ul></div>
          </div>
          <a class="dg-go" href="${ROOT}repair/problems/${p.id}/">Start the step-by-step diagnosis →</a><button class="dg-again" data-again>Check another problem</button>
        </div>`;
      } else if (s.sys && s.bike) {
        const list = P.filter((x) => x.sys === s.sys);
        dg.innerHTML = `${steps(2)}<button class="dg-back" data-back="bike">← Back</button><div class="ru-h2row"><h2>What do you notice?</h2>${LEGEND}</div><div class="dg-opts">${list.map((p) => card(p)).join('')}</div>`;
      } else if (s.bike) {
        const B = BIKES[s.bike]; if (!B) return go({});
        const sys = Object.entries(D.s).filter(([k]) => !B.hide.includes(k)).map(([k, n]) => [k, n, P.filter((x) => x.sys === k).length]).filter((x) => x[2]);
        dg.innerHTML = `${steps(1)}<button class="dg-back" data-back="">← Back</button><h2>Where is the problem?</h2>
          <div class="dg-search r-search"><label class="r-sr" for="dg-q">Or describe it</label><input id="dg-q" type="search" placeholder="Or type it: for example, brakes squeal" autocomplete="off"><ul class="r-results" hidden></ul></div>
          <div class="dg-opts">${sys.map(([k, n, c]) => `<button type="button" data-sys="${k}"><b>${esc(n)}</b><span>${c} problems</span></button>`).join('')}</div>`;
        const inp = dg.querySelector('#dg-q'), ul = dg.querySelector('.r-results');
        inp.addEventListener('input', () => {
          const w = inp.value.toLowerCase().split(/\s+/).filter((x) => x.length > 1);
          ul.hidden = !w.length; if (!w.length) return;
          const r = P.filter((x) => !B.hide.includes(x.sys)).filter((x) => w.every((k) => `${x.t} ${x.also} ${x.sysName}`.toLowerCase().includes(k))).slice(0, 15);
          ul.innerHTML = r.length ? r.map((x) => `<li><a href="#bike=${s.bike}&sys=${x.sys}&p=${x.id}"><span>Problem</span><b>${esc(x.t)}</b><em>${esc(x.sysName)}</em></a></li>`).join('') : '<li class="none">Nothing found. Pick an area below.</li>';
        });
      } else {
        dg.innerHTML = `${steps(0)}<h2>What are you riding?</h2><div class="dg-opts is-big">${Object.entries(BIKES).map(([k, b]) => `<button type="button" data-bike="${k}"><b>${b.t}</b><span>${b.d}</span></button>`).join('')}</div>`;
      }
      dg.scrollIntoView({ block: 'nearest' });
    };
    dg.addEventListener('click', (e) => {
      const s = q(), b = e.target.closest('button'); if (!b) return;
      if (b.dataset.bike) go({ bike: b.dataset.bike });
      else if (b.dataset.sys) go({ bike: s.bike, sys: b.dataset.sys });
      else if (b.dataset.p) go({ bike: s.bike, sys: s.sys, p: b.dataset.p });
      else if (b.dataset.again !== undefined) go({ bike: s.bike });
      else if (b.dataset.back !== undefined) { const k = b.dataset.back; go(k === 'sys' ? { bike: s.bike, sys: s.sys } : k === 'bike' ? { bike: s.bike } : {}); }
    });
    window.addEventListener('hashchange', render);
    render();
  });
}

/* ?q= on the Repair home fills the search (used by the site search in Google results) */
const qq = new URLSearchParams(location.search).get('q');
if (qq && box) { const i = box.querySelector('input'); i.value = qq; setTimeout(() => i.dispatchEvent(new Event('input')), 400); }
