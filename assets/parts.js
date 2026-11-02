/* Moto Zero spare parts: search on the parts hub. */
const box = document.querySelector('.sp-search');
if (box) {
  const ROOT = new URL('../', import.meta.url).pathname;
  const { default: D } = await import('./content/spare-parts.js');
  const M = Object.fromEntries(D.models.map((m) => [m.id, m]));
  const PT = Object.fromEntries(D.parts.map((p) => [p.id, p]));
  const items = [
    ...D.parts.map((p) => ({ t: p.name, d: p.cat, h: p.url, s: `${p.name} ${p.syn} ${p.cat}`.toLowerCase(), k: 'Part' })),
    ...D.models.map((m) => ({ t: `${m.brand} ${m.model}`, d: 'All parts', h: m.url, s: `${m.brand} ${m.model}`.toLowerCase(), k: 'Bike' })),
    ...D.pages.map(([mid, pid, u]) => ({ t: `${M[mid].brand} ${M[mid].model}: ${PT[pid].name}`, d: PT[pid].cat, h: u, s: `${M[mid].brand} ${M[mid].model} ${PT[pid].name} ${PT[pid].syn}`.toLowerCase(), k: 'Part for bike' })),
  ];
  const input = box.querySelector('input'), list = box.querySelector('.sp-results');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const run = () => {
    const w = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    list.hidden = !w.length;
    if (!w.length) return;
    const r = items.filter((x) => w.every((q) => x.s.includes(q))).slice(0, 25);
    list.innerHTML = r.length ? r.map((x) => `<li><a href="${ROOT}${x.h.replace(/^\//, '')}"><span>${x.k}</span><b>${esc(x.t)}</b><em>${esc(x.d)}</em></a></li>`).join('') : '<li class="sp-none">Nothing found. Try one word, for example “chain” or “Boxer”.</li>';
  };
  input.addEventListener('input', run);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const a = list.querySelector('a'); if (a) location.href = a.href; } });
}
