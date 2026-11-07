// Build Motopedia module PDFs.  usage: node build.js 1 2 3 4 5
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const MarkdownIt = require('markdown-it'), container = require('markdown-it-container');
const { chromium } = require('playwright');
const ROOT = '/home/claude/mc';
const COVER = { 1: 'honda-air-cooled', 2: 'triumph-engine', 3: 'vintage-timing-cover', 4: 'honda-cb650r-engine', 5: 'electric-scrambler-render' };
const SLUG = { 1: 'foundations', 2: 'engine', 3: 'fuel-ignition-electrical', 4: 'drivetrain-chassis', 5: 'electric' };
const CALLOUT = { NOTE: 'Note', WARNING: 'Safety', SPEC: 'Reference data', TRY: 'Explorer exercise', OBJECTIVES: 'Learning objectives' };

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function loadSvg(id, prefix) {
  const f = path.join(ROOT, 'figs', id + '.svg');
  if (!fs.existsSync(f)) return `<div class="missing">[${id} missing]</div>`;
  let s = fs.readFileSync(f, 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<!DOCTYPE[^>]*>/i, '');
  const p = prefix + '-';
  s = s.replace(/\sid="([^"]+)"/g, (m, i) => ` id="${p}${i}"`)
       .replace(/url\(#([^)]+)\)/g, (m, i) => `url(#${p}${i})`)
       .replace(/(xlink:href|href)="#([^"]+)"/g, (m, a, i) => `${a}="#${p}${i}"`);
  s = s.replace(/<svg([^>]*?)\s(width|height)="[^"]*"/g, '<svg$1').replace(/<svg([^>]*?)\s(width|height)="[^"]*"/g, '<svg$1');
  return s;
}

function preprocess(md) {
  // callouts: > [!TYPE] title  -> ::: callout TYPE title
  const lines = md.split('\n'); const out = []; let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^>\s*\[!(\w+)\]\s*(.*)$/);
    if (m) {
      const body = []; i++;
      while (i < lines.length && /^>/.test(lines[i])) { body.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`::: callout ${m[1].toUpperCase()} ${m[2]}`, '', ...body, '', ':::', '');
      continue;
    }
    out.push(lines[i]); i++;
  }
  return out.join('\n');
}

function build(n) {
  let raw = fs.readFileSync(path.join(ROOT, 'content', `m${n}.md`), 'utf8').replace(/\r/g, '');
  const head = []; raw = raw.replace(/^(%.*\n)+/, m => { m.trim().split('\n').forEach(l => head.push(l.replace(/^%\s*/, ''))); return ''; });
  const [modLabel, title, subtitle] = head;
  const md = new MarkdownIt({ html: false, typographer: false, linkify: true });
  md.use(container, 'callout', {
    validate: p => /^callout\s+\w+/.test(p.trim()),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        const m = tokens[idx].info.trim().match(/^callout\s+(\w+)\s*(.*)$/);
        const t = m[1], label = CALLOUT[t] || t, ttl = m[2];
        return `<aside class="callout c-${t.toLowerCase()}"><div class="c-head"><span class="c-tag">${label}</span>${ttl ? `<span class="c-title">${md.renderInline(ttl)}</span>` : ''}</div>`;
      }
      return '</aside>\n';
    }
  });
  let figNo = 0; const figs = [];
  md.renderer.rules.image = (tokens, idx) => {
    const t = tokens[idx], src = t.attrGet('src') || '';
    const cap = md.renderInline(t.content || '');
    const ph = src.match(/^photo:(.+)$/);
    if (ph) { figNo++; const credit = t.attrGet('title') || 'Photograph: Transitions Lab collection';
      return `<figure class="photo"><span class="mk">FIGTOP${n}.${figNo}</span><img src="file://${ROOT}/photos/${ph[1]}"><figcaption><span class="fn">Figure ${n}.${figNo}</span> ${cap} <span class="credit">${esc(credit)}</span></figcaption></figure>`; }
    const m = src.match(/^fig:([A-Z]+\d+)/);
    if (!m) return '';
    figNo++; figs.push(m[1]);
    return `<figure class="plate" id="fig-${m[1]}"><span class="mk">FIGTOP${n}.${figNo}</span><div class="art"><img src="file://${ROOT}/figs/png/${m[1]}.png" alt=""></div><figcaption><span class="fn">Figure ${n}.${figNo}</span> ${cap}</figcaption></figure>`;
  };
  // images inside paragraphs: unwrap
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, o, e, s) => {
    const t = tokens[idx];
    if (t.info.trim() === 'eq') return `<div class="eq">${t.content.trim().split('\n').map(l => `<div>${esc(l)}</div>`).join('')}</div>`;
    return fence(tokens, idx, o, e, s);
  };
  let body = md.render(preprocess(raw));
  body = body.replace(/<p>\s*(<figure[\s\S]*?<\/figure>)\s*<\/p>/g, '$1');
  const cover = `<img src="file://${ROOT}/photos/${COVER[n] || "honda-air-cooled"}.jpg">`;
  const logo = fs.readFileSync(path.join(ROOT, 'brand/lockup.svg'), 'utf8');
  const mark = fs.readFileSync(path.join(ROOT, 'brand/mark.svg'), 'utf8');
  const css = fs.readFileSync(path.join(ROOT, 'tools/book.css'), 'utf8');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Motopedia · ${esc(modLabel)} · ${esc(title)}</title>
<link rel="stylesheet" href="file://${ROOT}/fonts/fonts.css"><style>${css}
@page { @top-left { content: "${esc(modLabel)}  ·  ${esc(title).replace(/"/g, '')}"; } @top-right { content: "Motopedia"; } }
</style></head><body>
<section class="cover">
  <div class="cv-panel">
    <div class="cv-logo">${logo}</div>
    <div class="cv-mid">
      <div class="cv-num">${String(n).padStart(2,'0')}</div>
      <div class="cv-mod">${esc(modLabel)}</div>
      <h1 class="cv-title">${esc(title)}</h1>
      <p class="cv-sub">${esc(subtitle || '')}</p>
    </div>
    <div class="cv-foot">A technical course on how motorcycles work<br>Transitions Lab · Edition 1.0 · November 2026<br>Open licence CC BY-SA 4.0</div>
  </div>
  <div class="cv-photo">${cover}</div>
</section>
<section class="toc"><h2 class="toc-h">Contents</h2><ol id="toc"></ol>
<div class="series"><h3>The series</h3><ol class="series-list">
<li${n == 1 ? ' class="cur"' : ''}><b>01</b> Foundations: the machine, its anatomy and the workshop</li>
<li${n == 2 ? ' class="cur"' : ''}><b>02</b> The engine: four-stroke and two-stroke</li>
<li${n == 3 ? ' class="cur"' : ''}><b>03</b> Fuel, ignition and electrical systems</li>
<li${n == 4 ? ' class="cur"' : ''}><b>04</b> Drivetrain and chassis</li>
<li${n == 5 ? ' class="cur"' : ''}><b>05</b> Electric motorcycles</li></ol>
<p class="howto">Each chapter opens with learning objectives and closes with review questions and worked answers. Reference data comes from the K-Light 125 maintenance manual unless stated otherwise; always use the manual for the machine in front of you. Explorer exercises refer to the interactive anatomy explorer at transitionslab.org/motorcycle-anatomy.</p></div>
</section>
<main>${body}</main>
<section class="colophon"><div class="col-mark">${mark}</div><p><b>Motopedia</b> is an open course of Transitions Lab. Text and illustrations are released under the Creative Commons Attribution-ShareAlike 4.0 International licence (CC BY-SA 4.0): you may copy, translate, adapt and redistribute them, including commercially, provided you credit Transitions Lab and share adaptations under the same licence.</p><p>Workshop procedures are general guidance. Specifications differ between machines: always confirm values and torque settings in the manufacturer's service manual, and observe the safety notes in Module 1 and Module 5.</p></section>
</body></html>`;
  const htmlPath = path.join(ROOT, 'build', `m${n}.html`);
  fs.writeFileSync(htmlPath, html);
  return { htmlPath, title, modLabel, figs };
}

const POST = (shifts) => {
  const main = document.querySelector('main');
  // move figures later to fill page gaps
  document.querySelectorAll('figure').forEach(f => {
    const num = (f.querySelector('.fn') || {}).textContent; const k = shifts[num] || 0;
    let ref = f;
    for (let i = 0; i < k; i++) { let nx = ref.nextElementSibling; if (!nx) break; if (/^H[1]$/.test(nx.tagName)) break; ref = nx; if (/^H[2-4]$/.test(nx.tagName) && nx.nextElementSibling) ref = nx.nextElementSibling; }
    if (ref !== f) ref.after(f);
  });
  const kids = [...main.children]; let sec = null; const secs = [];
  for (const el of kids) {
    if (el.tagName === 'H1') { sec = document.createElement('section'); sec.className = 'chapter'; main.insertBefore(sec, el); secs.push(sec); }
    if (sec) sec.appendChild(el);
  }
  secs.forEach(s => {
    const h = s.querySelector('h1'); const t = h.textContent.trim();
    const m = t.match(/^(\d+\.\d+)\s+(.*)$/);
    if (m) { h.innerHTML = `<span class="ch-no">${m[1]}</span><span class="ch-t">${m[2]}</span>`; s.dataset.no = m[1]; }
    else s.classList.add('back', t.toLowerCase().startsWith('gloss') ? 'glossary' : 'reading');
    s.dataset.title = t;
    let blk = null;
    [...s.children].forEach(el => {
      if (el.tagName === 'H2') {
        const ht = el.textContent.trim().toLowerCase();
        blk = null;
        if (ht.startsWith('job sheet')) { blk = document.createElement('div'); blk.className = 'jobsheet'; }
        else if (ht === 'review questions') { blk = document.createElement('div'); blk.className = 'review'; }
        else if (ht === 'answers') { blk = document.createElement('div'); blk.className = 'answers'; }
        if (blk) { s.insertBefore(blk, el); blk.appendChild(el); return; }
      } else if (el.tagName === 'H1') { blk = null; return; }
      if (blk) blk.appendChild(el);
    });
  });
  document.querySelectorAll('table').forEach(t => { const w = document.createElement('div'); w.className = 'tw'; t.parentNode.insertBefore(w, t); w.appendChild(t); });
  // keep headings with the next block
  document.querySelectorAll('main h1, main h2, main h3, main h4').forEach(h => {
    const nx = h.nextElementSibling; if (!nx || nx.tagName === 'FIGURE' || nx.classList.contains('tw') && nx.offsetHeight > 300) return;
    if (nx.offsetHeight > 150 && !(nx.tagName === 'P')) return; if (nx.offsetHeight > 220) return;
    const k = document.createElement('div'); k.className = 'keep'; h.before(k); k.appendChild(h); k.appendChild(nx);
  });
  document.querySelectorAll('.glossary').forEach(g => { const d = document.createElement('div'); d.className = 'glcols'; const ps = [...g.querySelectorAll(':scope > p')]; if (ps.length) { g.insertBefore(d, ps[0]); ps.forEach(p => { p.classList.add('gl'); d.appendChild(p); }); } });
  return secs.map(s => ({ no: s.dataset.no || '', title: s.dataset.title }));
};

const sh = c => execSync(c, { maxBuffer: 1 << 26 }).toString();
function analyse(pdf) {
  const np = parseInt(sh(`pdfinfo ${pdf} | grep Pages | awk '{print $2}'`));
  const texts = []; for (let p = 1; p <= np; p++) texts.push(sh(`pdftotext -f ${p} -l ${p} ${pdf} -`).replace(/\s+/g, ' '));
  // bottom whitespace per page
  const dir = `/tmp/claude-0/an`; sh(`rm -rf ${dir} && mkdir -p ${dir} && pdftoppm -r 20 -gray ${pdf} ${dir}/p`);
  const gaps = sh(`python3 -c "
import glob
from PIL import Image
for f in sorted(glob.glob('${dir}/p-*.pgm')):
    im=Image.open(f);w,h=im.size;px=im.load();top=int(h*0.085);bot=int(h*0.915);last=top
    for y in range(top,bot):
        if any(px[x,y]<235 for x in range(int(w*0.08),int(w*0.92),2)): last=y
    print(round((bot-last)/(bot-top),3))
"`).trim().split('\n').map(Number);
  return { np, texts, gaps };
}

(async () => {
  const mods = process.argv.slice(2).map(Number);
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  for (const n of mods) {
    const { htmlPath } = build(n);
    const shifts = {};
    const tmp = `/tmp/claude-0/ute-m${n}.pdf`;
    let page, chapters, A;
    const render = async (pages) => {
      if (page) await page.close();
      page = await browser.newPage({ viewport: { width: 650, height: 900 } });
      await page.goto('file://' + htmlPath, { waitUntil: 'load' });
      await page.evaluate(async () => { await document.fonts.ready; });
      chapters = await page.evaluate(POST, shifts);
      await page.evaluate(({ chapters, pages }) => {
        const ol = document.getElementById('toc'); ol.innerHTML = '';
        chapters.forEach((c, i) => { const li = document.createElement('li'); if (!c.no) li.className = 'bk';
          li.innerHTML = `<span class="tn">${c.no}</span><span class="tt">${c.no ? c.title.replace(/^\S+\s+/, '') : c.title}</span><span class="dots"></span><span class="tp">${pages ? pages[i] : '00'}</span>`; ol.appendChild(li); });
      }, { chapters, pages });
      await page.pdf({ path: tmp, preferCSSPageSize: true, printBackground: true });
      A = analyse(tmp);
    };
    await render(null);
    for (let it = 0; it < 8; it++) {
      let changed = false;
      for (let p = 3; p < A.np - 2; p++) {           // p is 1-based page with gap
        if (A.gaps[p - 1] < 0.18) continue;
        const nxt = A.texts[p];                       // next page text
        const m = nxt.match(/FIGTOP(\d+\.\d+)/);
        if (!m) continue;
        const before = nxt.slice(0, nxt.indexOf(m[0])).split(' ').length;
        if (before > 30) continue;                    // figure is not at top of next page
        if (A.texts[p - 1].includes('Further reading') || A.texts[p - 1].includes('Glossary')) continue;
        shifts['Figure ' + m[1]] = (shifts['Figure ' + m[1]] || 0) + 1; changed = true;
      }
      if (!changed) break;
      await render(null);
    }
    const pages = chapters.map(c => {
      const key = (c.no ? c.title.replace(/^\S+\s+/, '') : c.title).slice(0, 30).replace(/\s+/g, ' ');
      for (let p = 3; p <= A.np; p++) if (A.texts[p - 1].includes(key) && (!c.no || A.texts[p - 1].includes(c.no))) return p;
      return '';
    });
    await render(pages);
    const out = path.join(ROOT, 'out', `motopedia-module-${n}-${SLUG[n]}.pdf`);
    fs.copyFileSync(tmp, out);
    const big = A.gaps.map((g, i) => [i + 1, g]).filter(([i, g]) => g > 0.18 && i > 2);
    console.log(out, A.np, 'pages; gaps>18%:', JSON.stringify(big), 'shifts', JSON.stringify(shifts));
    await page.close(); page = null;
  }
  await browser.close();
})();
