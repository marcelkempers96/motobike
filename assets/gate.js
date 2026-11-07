/* ==========================================================================
   Downloads for account holders. Pages look the same for everyone; when a
   visitor who is not signed in clicks a download (any link with a download
   attribute, or a .pdf / .glb / .zip / .stl / .xlsx link), a short dialog
   invites them to create a free account and brings them back afterwards.
   Active only once Supabase keys are set in community-config.js.
   Note: this is a sign-up prompt, not access control; the files stay public.
   ========================================================================== */
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './community-config.js';

const ROOT = new URL('../', import.meta.url);
const ON = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const FILE = /\.(pdf|glb|gltf|zip|stl|step|xlsx|csv)(\?|#|$)/i;

export function signedIn() {
  try { return Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k) && localStorage.getItem(k)); } catch (e) { return false; }
}
function isDownload(a) {
  if (!a || !a.getAttribute) return false;
  const h = a.getAttribute('href') || '';
  if (!h || h.startsWith('#') || h.startsWith('mailto:')) return false;
  return a.hasAttribute('download') || FILE.test(h);
}
let dlg = null;
function ask(a) {
  if (!dlg) {
    dlg = document.createElement('div');
    dlg.className = 'mz-gate';
    dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'mz-gate-h');
    dlg.innerHTML = `<div class="mz-gate-box">
      <h2 id="mz-gate-h">Downloads are for account holders</h2>
      <p>Create a free Motopedia account to download 3D models, illustrations and the course PDFs. It takes a minute: just your email, no password.</p>
      <p class="mz-gate-what"></p>
      <div class="mz-gate-btns"><a class="mz-gate-go" href="#">Create a free account or sign in</a><button type="button" class="mz-gate-no">Not now</button></div>
    </div>`;
    document.body.appendChild(dlg);
    const close = () => { dlg.classList.remove('is-open'); };
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    dlg.querySelector('.mz-gate-no').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }
  const name = a.getAttribute('download') || decodeURIComponent((a.getAttribute('href') || '').split('/').pop().split('?')[0]);
  dlg.querySelector('.mz-gate-what').textContent = name ? `You chose: ${name}` : '';
  const back = location.pathname + location.search + location.hash;
  dlg.querySelector('.mz-gate-go').href = new URL('account/', ROOT).pathname + '?next=' + encodeURIComponent(back);
  dlg.classList.add('is-open');
  dlg.querySelector('.mz-gate-go').focus();
}

if (ON) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (!isDownload(a) || signedIn()) return;
    e.preventDefault(); e.stopPropagation();
    ask(a);
  }, true);
}
