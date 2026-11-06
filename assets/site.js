/* ==========================================================================
   Moto Zero: shared site shell. One navigation (three columns: Explore,
   Course, More) and one footer for every page, so the site stays consistent.
   Pages add <header class="ute-top"><nav data-mz-nav></nav></header> and
   <footer data-mz-footer></footer>, then load this module.
   ========================================================================== */
const ROOT = new URL('../', import.meta.url);           // site root, wherever the page lives
const url = (p) => new URL(p, ROOT).pathname + (p.includes('#') ? '#' + p.split('#')[1] : '');

/* Email updates. Paste a form endpoint (Formspree, Buttondown, Mailchimp...) here to collect
   sign-ups directly; while it is empty the form opens an email to the team instead. */
export const SUBSCRIBE_ENDPOINT = '';
const SUBSCRIBE_MAILTO = 'marcel@transitionslab.org';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './community-config.js';
import './gate.js';
import './speech.js';
import { pickerHTML, wire as wireLang } from './translate.js';

// Sign-in links from Supabase emails can land on any page: send them to the account page,
// which finishes the sign-in (the token stays in the hash, so nothing is lost).
if (/[#&](access_token|error_description)=|[?&]code=/.test(location.hash + location.search) && !/\/account\/$/.test(location.pathname)) {
  location.replace(new URL('account/', ROOT).pathname + location.search + location.hash);
}
export const MAIN = [['overview/', 'Overview']];
export const NAV = [
  { key: 'course', title: 'Course', blurb: 'Five modules, quizzes and your progress', items: [
    ['crash-course/', 'Crash course', 'The whole motorcycle in 15 minutes'],
    ['learn/', 'Course overview', 'How the course works, where to start'],
    ['learn/#foundations', '01 Foundations', 'Anatomy, physics, workshop'],
    ['learn/#engine', '02 The engine', 'Four-stroke and two-stroke'],
    ['learn/#fuel-ignition', '03 Fuel, ignition, electrics', 'Mixture, EFI, charging'],
    ['learn/#drivetrain-chassis', '04 Drivetrain and chassis', 'Clutch to brakes'],
    ['learn/#electric', '05 Electric motorcycles', 'Motors, packs, BMS'],
    ['quiz/', 'Quiz', 'Easy, mixed and hard, every module'],
    ['progress/', 'My progress', 'Saved in this browser, or to your account'],
    ['account/', 'Account', 'Sign in to comment, add photos, save progress'],
  ] },
  { key: 'repair', title: 'Repair', blurb: 'Find the fault, fix it, get the part', items: [
    ['repair/diagnose/', 'Diagnose a problem', 'Three questions to the likely fault'],
    ['repair/', 'Repair home', 'Search any problem, part or job'],
    ['repair/problems/', 'By problem', '274 problems, step-by-step checks'],
    ['repair/repairs/', 'By repair', '185 jobs, rider to workshop'],
    ['repair/parts/', 'By part', 'What each part does and how it fails'],
    ['repair/bikes/', 'By bike', '500 motorcycles: specs, top repairs, problems'],
    ['parts/', 'Spare parts', 'What wears, when, where to buy'],
  ] },
  { key: 'tools', title: 'Tools', blurb: 'Interactive tools to explore and build', items: [
    ['cockpit/', 'Cockpit', 'Ride the bike, start it, run the dyno'],
    ['engine/', 'Under the Engine', '3D engine: gearbox, clutch, starters, valves'],
    ['wiring/', 'Wiring Lab', 'Harness, starting, charging and ignition circuits'],
    ['build/', 'Bike builder', 'Assemble a bike and change its specification'],
    ['brand/', 'Brand a bike', 'Put your logo on a 3D motorcycle'],
  ] },
  { key: 'library', title: 'Library', blurb: 'Articles, models, illustrations and downloads', items: [
    ['articles/', 'Articles', 'Guides to engines, chains, wiring and more'],
    ['types/', 'Motorcycle types', 'Sixteen types, 1885 to today'],
    ['videos/', 'Videos', 'The best motorcycle videos, sorted by topic'],
    ['models/', '3D models', 'All 337 models: 8 bikes and every part'],
    ['downloads/#plates', 'Technical illustrations', '50+ labelled plates to download'],
    ['downloads/', 'Downloads', 'PDF modules, plates, data and offline tools'],
  ] },
  { key: 'more', title: 'More', blurb: 'Files, sources and the project', items: [
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
      ${pickerHTML('mz-lang-sel')}
      ${/\/(overview|cockpit)\/$/.test(location.pathname) ? '' : `<a class="mz-menu-cta" href="${url('progress/')}">My progress</a>`}
    </div>`;
}

export function footerHTML() {
  const G = (k) => NAV.find((g) => g.key === k);
  const explore = { title: 'Explore', items: [['', 'Home'], ['overview/', 'Overview'], ...G('tools').items, ['repair/', 'Repair']] };
  const col = (g) => `<div><h4>${g.title}</h4><ul>${g.items.map(([h, t]) => `<li><a href="${url(h)}">${t}</a></li>`).join('')}</ul></div>`;
  return `
    <form class="mz-sub" novalidate>
      <div><h4>Get updates</h4><p>New modules, repair guides and tools. At most one email a month.</p></div>
      <div class="mz-sub-row"><label class="mz-sub-l" for="mz-sub-email">Email address</label><input id="mz-sub-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required><button type="submit">Subscribe</button></div>
      <p class="mz-sub-msg" aria-live="polite"></p>
    </form>
    <div class="mz-foot">
      <div class="mz-foot-about">
        <a class="mz-foot-brand" href="${url('')}" aria-label="Motopedia home"><img src="${new URL('assets/brand/motopedia-logo-tagline-800.webp', ROOT).pathname}" alt="Motopedia, the open motorcycle encyclopedia" width="800" height="237"></a>
        <p>An open technical course on how motorcycles work, from the first combustion stroke to the battery management system of an electric bike. Built for technician trainees, students, researchers, fleet operators and riders.</p>
        <p>Created by <a href="https://www.transitionslab.org" target="_blank" rel="noopener">Transitions Lab</a> as an open educational programme. Text, plates and 3D models are CC BY-SA 4.0.</p>
      </div>
      ${[explore, G('course'), G('library'), G('more')].map(col).join('')}
    </div>
    <div class="mz-foot-bottom">
      <span>© ${new Date().getFullYear()} Transitions Lab · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a></span>
      <span><a href="${url('privacy/')}">Privacy</a> · <a href="${url('cookies/')}">Cookies and storage</a> · <a href="${url('terms/')}">Terms of use</a> · <a href="${url('contact/')}">Contact</a> · <a href="https://www.transitionslab.org" target="_blank" rel="noopener">transitionslab.org</a></span>
    </div>`;
}

function wireSubscribe(form) {
  const msg = form.querySelector('.mz-sub-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = 'Please enter a valid email address.'; return; }
    if (!SUBSCRIBE_ENDPOINT && SUPABASE_URL && SUPABASE_ANON_KEY) {
      // Save the address in the Supabase subscribers table (insert-only for visitors, see docs/supabase.sql)
      msg.textContent = 'Sending…';
      try {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, { method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ email, source: location.pathname }) });
        msg.textContent = r.ok || r.status === 409 ? 'Thank you. You are on the list.' : 'That did not work. Please try again later.';
        // a copy to the team inbox
        if (r.ok) fetch('https://formsubmit.co/ajax/marcel@transitionslab.org', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: 'New Moto Zero subscriber', email, page: location.href }) }).catch(() => {});
        if (r.ok || r.status === 409) form.reset();
      } catch (err) { msg.textContent = 'That did not work. Please check your connection.'; }
      return;
    }
    if (!SUBSCRIBE_ENDPOINT) {
      location.href = `mailto:${SUBSCRIBE_MAILTO}?subject=${encodeURIComponent('Subscribe me to Moto Zero updates')}&body=${encodeURIComponent('Please add ' + email + ' to the Moto Zero update list.')}`;
      msg.textContent = 'Your email app should open with the request ready to send.';
      return;
    }
    msg.textContent = 'Sending…';
    try {
      const r = await fetch(SUBSCRIBE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      msg.textContent = r.ok ? 'Thank you. You are on the list.' : 'That did not work. Please try again later.';
      if (r.ok) form.reset();
    } catch (err) { msg.textContent = 'That did not work. Please check your connection.'; }
  });
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
    const ls = nav.querySelector('#mz-lang-sel'); if (ls) wireLang(ls);
  });
  root.querySelectorAll('[data-mz-signup]').forEach((b) => {
    if (b.dataset.mounted) return;
    b.dataset.mounted = '1';
    b.classList.add('mz-signup');
    const t = b.dataset.title || 'Get new repair guides, bikes and tools by email';
    b.innerHTML = `<form class="mz-sub is-band" novalidate>
      <div><h4>${t}</h4><p>${b.dataset.text || 'New course modules, step-by-step repairs and interactive tools. Free, at most one email a month, unsubscribe any time.'}</p></div>
      <div class="mz-sub-row"><label class="mz-sub-l" for="mz-sub-b${Math.random().toString(36).slice(2, 7)}">Email address</label><input type="email" name="email" placeholder="you@example.com" autocomplete="email" required><button type="submit">Subscribe</button></div>
      <p class="mz-sub-msg" aria-live="polite"></p></form>`;
    const lab = b.querySelector('label'), inp = b.querySelector('input'); inp.id = lab.htmlFor;
    wireSubscribe(b.querySelector('form'));
  });
  root.querySelectorAll('[data-mz-footer]').forEach((f) => {
    if (f.dataset.mounted) return;
    f.dataset.mounted = '1';
    f.className = 'mz-footer';
    f.innerHTML = footerHTML();
    const sub = f.querySelector('.mz-sub'); if (sub) wireSubscribe(sub);
  });
}

mountSite();
// Share, tool notes and comments at the end of every page (accounts via Supabase, see docs/supabase.sql)
if (!document.documentElement.classList.contains('mz-embed') && !/[?&]embed=1/.test(location.search)) import('./community.js').catch(() => {});
