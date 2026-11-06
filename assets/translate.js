/* ==========================================================================
   Language picker: machine translation of any page with Google Translate.
   The chosen language is remembered; English pages are the original.
   If the Google script cannot load, the page opens through Google's
   translation proxy instead (translate.goog), which works for any public page.
   ========================================================================== */
export const LANGS = [
  ['en', 'English'], ['nl', 'Nederlands'], ['de', 'Deutsch'], ['fr', 'Français'], ['es', 'Español'], ['pt', 'Português'],
  ['it', 'Italiano'], ['sw', 'Kiswahili'], ['hi', 'हिन्दी'], ['id', 'Bahasa Indonesia'], ['vi', 'Tiếng Việt'], ['th', 'ไทย'],
  ['tr', 'Türkçe'], ['pl', 'Polski'], ['ar', 'العربية'], ['zh-CN', '中文'], ['ja', '日本語'],
];
const KEY = 'mz-lang';
const get = () => { try { return localStorage.getItem(KEY) || 'en'; } catch (e) { return 'en'; } };
const put = (v) => { try { localStorage.setItem(KEY, v); } catch (e) { /* noop */ } };

function setCookie(v) {
  const host = location.hostname;
  const val = v === 'en' ? '' : `/en/${v}`;
  const exp = v === 'en' ? '; expires=Thu, 01 Jan 1970 00:00:00 GMT' : '';
  document.cookie = `googtrans=${val}; path=/${exp}`;
  if (host.includes('.')) document.cookie = `googtrans=${val}; path=/; domain=.${host.split('.').slice(-2).join('.')}${exp}`;
}
let loading = null;
function loadGoogle() {
  if (loading) return loading;
  loading = new Promise((res, rej) => {
    window.mzTranslateInit = () => {
      try { new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'mz-gt'); res(); } catch (e) { rej(e); }
    };
    const holder = document.createElement('div'); holder.id = 'mz-gt'; holder.hidden = true; document.body.appendChild(holder);
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=mzTranslateInit';
    s.onerror = rej;
    document.head.appendChild(s);
    setTimeout(() => rej(new Error('timeout')), 8000);
  });
  return loading;
}
function proxy(v) {
  const host = location.hostname.replace(/-/g, '--').replace(/\./g, '-');
  location.href = `https://${host}.translate.goog${location.pathname}?_x_tr_sl=en&_x_tr_tl=${v}&_x_tr_hl=${v}&_x_tr_pto=wapp${location.hash}`;
}
export function choose(v) {
  put(v); setCookie(v);
  if (v === 'en') { location.reload(); return; }
  loadGoogle().then(() => {
    const sel = document.querySelector('#mz-gt select.goog-te-combo');
    if (sel) { sel.value = v; sel.dispatchEvent(new Event('change')); } else location.reload();
  }).catch(() => proxy(v));
}
export function pickerHTML(id) {
  const cur = get();
  return `<label class="mz-lang" title="Translate this page"><span aria-hidden="true">🌐</span><span class="mz-sr">Language</span>
    <select id="${id}" aria-label="Language">${LANGS.map(([k, n]) => `<option value="${k}" ${k === cur ? 'selected' : ''}>${n}</option>`).join('')}</select></label>`;
}
export function wire(sel) { sel.addEventListener('change', () => choose(sel.value)); }
// Pages open in the remembered language.
if (get() !== 'en' && !/translate\.goog$/.test(location.hostname)) { setCookie(get()); loadGoogle().catch(() => {}); }
