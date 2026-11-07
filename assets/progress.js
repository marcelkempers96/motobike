/* ==========================================================================
   Motopedia: learner progress, kept only in this browser (localStorage).
   No login and nothing is sent anywhere. Export/import lets a learner move
   their progress to another device.
   ========================================================================== */
const KEY = 'mz-progress-v1';

function blank() { return { v: 1, started: Date.now(), chapters: {}, checks: {}, quiz: {}, tools: {} }; }

export function load() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); return d && d.v === 1 ? d : blank(); } catch (e) { return blank(); }
}
function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* private mode */ } window.dispatchEvent(new CustomEvent('mz-progress')); }

export function chapterSeen(id) { const d = load(); const c = d.chapters[id] || {}; if (!c.seen) c.seen = Date.now(); c.last = Date.now(); d.chapters[id] = c; save(d); }
export function chapterDone(id, done = true) { const d = load(); const c = d.chapters[id] || { seen: Date.now() }; if (done) c.done = c.done || Date.now(); else delete c.done; d.chapters[id] = c; save(d); }
export function isDone(id) { const c = load().chapters[id]; return !!(c && c.done); }
export function isSeen(id) { return !!load().chapters[id]; }

export function recordCheck(qid, right) { const d = load(); if (!(qid in d.checks) || right) d.checks[qid] = !!right; save(d); }

/** topic: module slug or 'all'; level: 'easy' | 'hard' | 'mixed' */
export function recordQuiz(topic, level, right, total) {
  const d = load(); const k = `${topic}|${level}`;
  const q = d.quiz[k] || { attempts: 0, best: 0, bestRight: 0, total };
  const pct = Math.round(right / total * 100);
  q.attempts++; q.last = pct; q.lastAt = Date.now(); q.total = total;
  if (pct >= q.best) { q.best = pct; q.bestRight = right; }
  d.quiz[k] = q; save(d);
}

export function recordTool(name, data = {}) { const d = load(); d.tools[name] = Object.assign(d.tools[name] || {}, data, { at: Date.now() }); save(d); }

export function reset() { try { localStorage.removeItem(KEY); } catch (e) { /* noop */ } window.dispatchEvent(new CustomEvent('mz-progress')); }
export function exportText() { return btoa(unescape(encodeURIComponent(JSON.stringify(load())))); }
export function importText(t) { const d = JSON.parse(decodeURIComponent(escape(atob(t.trim())))); if (!d || d.v !== 1) throw new Error('Not a Motopedia progress code'); save(d); }

/** Summary per module: chapters done / total, quiz bests. */
export function summary(MODULES) {
  const d = load();
  return MODULES.map((m) => {
    const ids = m.chapters.map((c) => c.id);
    const done = ids.filter((id) => d.chapters[id] && d.chapters[id].done).length;
    const seen = ids.filter((id) => d.chapters[id]).length;
    const q = ['easy', 'hard', 'mixed'].map((l) => [l, d.quiz[`${m.id}|${l}`]]);
    return { id: m.id, num: m.num, title: m.title, total: ids.length, done, seen, quiz: Object.fromEntries(q) };
  });
}
