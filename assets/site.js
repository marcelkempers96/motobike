/* ==========================================================================
   Moto Zero: shared site shell. One navigation (three columns: Explore,
   Course, More) and one footer for every page, so the site stays consistent.
   Pages add <header class="ute-top"><nav data-mz-nav></nav></header> and
   <footer data-mz-footer></footer>, then load this module.
   ========================================================================== */
const ROOT = new URL('../', import.meta.url);           // site root, wherever the page lives
const url = (p) => new URL(p, ROOT).pathname + (p.includes('#') ? '#' + p.split('#')[1] : '');

export const MAIN = [['overview/', 'Overview'], ['cockpit/', 'Cockpit']];
export const NAV = [
  { key: 'course', title: 'Course', blurb: 'Learn: five modules, quiz, history and types', items: [
    ['learn/', 'Course overview', 'How the course works, where to start'],
    ['learn/#foundations', '01 Foundations', 'Anatomy, physics, workshop'],
    ['learn/#engine', '02 The engine', 'Four-stroke and two-stroke'],
    ['learn/#fuel-ignition', '03 Fuel, ignition, electrics', 'Mixture, EFI, charging'],
    ['learn/#drivetrain-chassis', '04 Drivetrain and chassis', 'Clutch to brakes'],
    ['learn/#electric', '05 Electric motorcycles', 'Motors, packs, BMS'],
    ['quiz/', 'Quiz', 'Easy, mixed and hard, every module'],
    ['history/', 'History', 'From steam velocipede to battery swapping'],
    ['types/', 'Motorcycle types', 'Sixteen types, 1885 to today'],
    ['articles/', 'Articles', 'Guides to engines, chains, wiring and more'],
    ['progress/', 'My progress', 'Saved in this browser, no login'],
  ] },
  { key: 'tools', title: 'Tools', blurb: 'Interactive tools to explore and build', items: [
    ['wiring/', 'Wiring Lab', 'Harness, starting, charging and ignition circuits'],
    ['models/', '3D models', 'All 56 models, rotate and inspect'],
    ['build/', 'Bike builder', 'Assemble a bike and change its specification'],
  ] },
  { key: 'more', title: 'More', blurb: 'Files, sources and the project', items: [
    ['downloads/', 'Downloads', 'PDF modules, models, plates'],
    ['sources/', 'Sources and credits', 'Bibliography and licences'],
    ['updates/', 'Updates', 'What changed and when'],
    ['about/', 'About', 'Why this exists, who made it'],
    ['contact/', 'Contact', 'Collaborate or ask for a model'],
    ['kids/', 'Kids: build a bike', 'A simple game for younger learners'],
  ] },
];

function currentPath() {
  const p = location.pathname.replace(/index\.html$/, '');
  const rel = p.startsWith(ROOT.pathname) ? p.slice(ROOT.pathname.length) : p;
  return rel;
}

export function navHTML() {
  const cur = currentPath();
  const isCur = (href) => href.split('#')[0] === cur && !href.includes('#');
  const groupOf = NAV.find((g) => g.items.some(([h]) => h.split('#')[0] === cur));
  return `
    <button type="button" class="mz-menu-btn" aria-expanded="false" aria-controls="mz-menu"><span></span><span></span><span></span><b>Menu</b></button>
    <div class="mz-menu" id="mz-menu">
      ${MAIN.map(([h, t]) => `<a class="mz-menu-main" href="${url(h)}"${h === cur ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      ${NAV.map((g) => `
        <div class="mz-menu-group ${groupOf === g ? 'is-current' : ''}" data-group="${g.key}">
          <button type="button" class="mz-menu-top" aria-expanded="false">${g.title}<i aria-hidden="true"></i></button>
          <div class="mz-menu-panel">
            <p class="mz-menu-blurb">${g.blurb}</p>
            <ul>${g.items.map(([h, t, d]) => `<li><a href="${url(h)}"${isCur(h) ? ' aria-current="page"' : ''}><b>${t}</b><span>${d}</span></a></li>`).join('')}</ul>
          </div>
        </div>`).join('')}
      <a class="mz-menu-cta" href="${url('progress/')}">My progress</a>
    </div>`;
}

export function footerHTML() {
  const explore = { title: 'Explore', items: [['', 'Home'], ['overview/', 'Overview'], ['cockpit/', 'Cockpit'], ...NAV[1].items] };
  const col = (g) => `<div><h4>${g.title}</h4><ul>${g.items.map(([h, t]) => `<li><a href="${url(h)}">${t}</a></li>`).join('')}</ul></div>`;
  return `
    <div class="mz-foot">
      <div class="mz-foot-about">
        <a class="mz-foot-brand" href="${url('')}"><span>moto zero</span></a>
        <p>An open technical course on how motorcycles work, from the first combustion stroke to the battery management system of an electric bike. Built for technician trainees, students, researchers, fleet operators and riders.</p>
        <p>Created by <a href="https://www.transitionslab.org" target="_blank" rel="noopener">Transitions Lab</a> as an open educational programme. Text, plates and 3D models are CC BY-SA 4.0.</p>
      </div>
      ${[explore, NAV[0], NAV[2]].map(col).join('')}
    </div>
    <div class="mz-foot-bottom">
      <span>© ${new Date().getFullYear()} Transitions Lab · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a></span>
      <span><a href="${url('privacy/')}">Privacy</a> · <a href="${url('cookies/')}">Cookies and storage</a> · <a href="${url('terms/')}">Terms of use</a> · <a href="${url('contact/')}">Contact</a> · <a href="https://www.transitionslab.org" target="_blank" rel="noopener">transitionslab.org</a></span>
    </div>`;
}

function wireNav(nav) {
  const btn = nav.querySelector('.mz-menu-btn');
  const menu = nav.querySelector('.mz-menu');
  const close = () => {
    nav.querySelectorAll('.mz-menu-group.is-open').forEach((g) => { g.classList.remove('is-open'); g.querySelector('.mz-menu-top').setAttribute('aria-expanded', 'false'); });
  };
  btn.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('mz-menu-locked', open);
  });
  nav.querySelectorAll('.mz-menu-group').forEach((g) => {
    const top = g.querySelector('.mz-menu-top');
    top.addEventListener('click', (e) => {
      e.stopPropagation();
      const was = g.classList.contains('is-open');
      close();
      if (!was) { g.classList.add('is-open'); top.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('mz-menu-locked'); } });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { close(); menu.classList.remove('is-open'); document.documentElement.classList.remove('mz-menu-locked'); }));
}

export function mountSite(root = document) {
  root.querySelectorAll('[data-mz-nav]').forEach((nav) => {
    if (nav.dataset.mounted) return;
    nav.dataset.mounted = '1';
    nav.classList.add('mz-nav');
    nav.setAttribute('aria-label', 'Site');
    nav.innerHTML = navHTML();
    wireNav(nav);
  });
  root.querySelectorAll('[data-mz-footer]').forEach((f) => {
    if (f.dataset.mounted) return;
    f.dataset.mounted = '1';
    f.className = 'mz-footer';
    f.innerHTML = footerHTML();
  });
}

mountSite();
