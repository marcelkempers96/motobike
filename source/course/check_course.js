// Check the course modules: JSON parses, every equation and inline maths renders in KaTeX, eq blocks are complete.
// Usage: node source/course/check_course.js [m1 m2 ...]
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const katex = require(path.join(ROOT, 'assets/vendor/katex/katex.min.js'));
const mods = process.argv.slice(2).length ? process.argv.slice(2) : ['m1', 'm2', 'm3', 'm4', 'm5'];
let bad = 0;
const tex = (t, display, where) => {
  try { katex.renderToString(t, { displayMode: display, throwOnError: true, strict: 'error' }); }
  catch (e) { bad++; console.log(`MATH ${where}: ${e.message.split('\n')[0]}  in  ${t.slice(0, 120)}`); }
};
const scan = (s, where) => {
  if (typeof s !== 'string') return;
  for (const m of s.matchAll(/\\\((.+?)\\\)/gs)) tex(m[1], false, where);
  for (const m of s.matchAll(/\\\[(.+?)\\\]/gs)) tex(m[1], true, where);
};
const walk = (o, where) => {
  if (typeof o === 'string') return scan(o, where);
  if (Array.isArray(o)) return o.forEach((x) => walk(x, where));
  if (o && typeof o === 'object') Object.values(o).forEach((x) => walk(x, where));
};
const ids = new Set();
for (const m of mods) {
  const s = fs.readFileSync(path.join(ROOT, `assets/content/modules/${m}.js`), 'utf8');
  let o;
  try { o = JSON.parse(s.slice(s.indexOf('export default ') + 15).trim().replace(/;\s*$/, '')); }
  catch (e) { console.log(`JSON ${m}: ${e.message}`); bad++; continue; }
  let words = 0, eqs = 0;
  for (const c of o.chapters) {
    for (const b of c.blocks) {
      const where = `${c.id}/${b.type}`;
      words += JSON.stringify(b).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
      if (b.type === 'eq') {
        eqs++;
        for (const k of ['id', 'name', 'tex', 'where', 'why']) if (!b[k]) { bad++; console.log(`EQ ${where} ${b.id || '?'}: missing ${k}`); }
        if (ids.has(b.id)) { bad++; console.log(`EQ duplicate id ${b.id}`); }
        ids.add(b.id);
        if (b.tex) tex(b.tex, true, `${where} ${b.id}`);
        (b.where || []).forEach(([t]) => tex(t, false, `${where} ${b.id} symbol`));
        scan(b.why, where); scan(b.example, where);
      } else walk(b, where);
    }
  }
  console.log(`${m}: ${o.chapters.length} chapters, about ${words} words, ${eqs} equations`);
}
console.log(bad ? `${bad} problems` : 'all good');
process.exit(bad ? 1 : 0);
