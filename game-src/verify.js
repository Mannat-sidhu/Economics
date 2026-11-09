// node study/game-src/verify.js  -> checks data integrity and recomputes every numerical answer.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = __dirname;
const files = ['diagrams.js', ...fs.readdirSync(path.join(dir, 'topics')).sort().map(f => 'topics/' + f)];
let code = 'const TOPICS=[];const RL={lv:{},card:{}};\n' + files.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') + '\n;({TOPICS, RL, FINAL: typeof FINAL!=="undefined"?FINAL:null})';
const { TOPICS, RL, FINAL } = vm.runInNewContext(code, { console });
let errs = 0; const bad = m => { errs++; console.log('✗', m); };
const ids = new Set(); const uniq = (id, w) => { if (!id) bad('missing id in ' + w); else if (ids.has(id)) bad('duplicate id ' + id); ids.add(id); };
function checkQ(q, w, subs) {
  uniq(q.id, w); if (!q.q) bad(w + ' no text'); if (!q.why) bad(w + ' no explanation');
  if (subs && q.sub && !subs[q.sub]) bad(w + ' unknown sub ' + q.sub);
  if (q.type === 'mcq') { if (!q.opts || q.opts.length < 3) bad(w + ' needs 3+ options'); if (!(q.a >= 0 && q.a < q.opts.length)) bad(w + ' bad a index'); }
  else if (q.type === 'tf') { if (typeof q.a !== 'boolean') bad(w + ' tf needs boolean a'); }
  else if (q.type === 'num') {
    if (typeof q.ans !== 'number') bad(w + ' num needs ans');
    if (typeof q.calc !== 'function') bad(w + ' num needs calc()');
    else { const c = q.calc(); if (Math.abs(c - q.ans) > Math.max(1e-6, Math.abs(q.ans) * 0.005)) bad(`${w} calc ${c} != ans ${q.ans}`); }
  } else bad(w + ' bad type ' + q.type);
}
function checkBoss(b, w) {
  b.questions.forEach(q => { uniq(q.id, w); q.parts.forEach((p, i) => {
    const s = p.rubric.reduce((a, r) => a + r[1], 0);
    if (s !== p.marks) bad(`${w} ${q.id}(${p.label}) rubric sums ${s} but marks ${p.marks}`);
    if (!p.model) bad(`${w} ${q.id}(${p.label}) no model`);
  }); });
}
TOPICS.forEach(t => {
  const rl = RL.lv[t.id];
  if (rl) { (rl.extraCards || []).forEach(x => { const i = t.cards.findIndex(c => c.id === x.after); if (i < 0) bad(t.id + ' extraCard anchor missing ' + x.after); t.cards.splice(i + 1, 0, x.card); }); Object.keys(rl.card || {}).forEach(k => { if (!t.cards.some(c => c.id === k)) bad(t.id + ' RL card id not found: ' + k); }); Object.keys(rl.hints || {}).forEach(k => { if (!t.boss.questions.some(q => q.parts.some((p, i) => q.id + '.' + i === k))) bad(t.id + ' hint key not found: ' + k); }); if (rl.story) t.cards.unshift({ id: t.id + '-story', title: rl.story.title, html: rl.story.html, check: rl.story.check }); (rl.extra || []).forEach(q => { if (q.skip) bad(t.id + ' extra Q must not be skip: ' + q.id); t.questions.push(q); }); }
  const w = t.id; if (!t.subs) bad(w + ' no subs');
  const nsk = t.questions.filter(q => q.skip).length; if (nsk !== 10) bad(`${w} has ${nsk} skip questions (need 10)`);
  if (t.questions.length < 14) bad(`${w} only ${t.questions.length} questions`);
  t.questions.forEach(q => checkQ(q, w + ':' + q.id, t.subs));
  t.cards.forEach(c => { uniq(c.id, w); if (c.check) { c.check.id = c.check.id || c.id + '-ck'; checkQ(c.check, w + ':' + c.id + ' check', null); } if (t.subs && c.sub && !t.subs[c.sub]) bad(w + ' card unknown sub ' + c.sub); if (typeof c.svg === 'function') c.svg(); });
  t.questions.forEach(q => { if (typeof q.svg === 'function') q.svg(); });
  checkBoss(t.boss, w + ' boss');
  t.boss.questions.forEach(q => q.parts.forEach(p => { if (typeof p.mdg === 'function') p.mdg(); if (typeof p.svg === 'function') p.svg(); }));
});
if (FINAL) checkBoss(FINAL, 'final');
console.log(`${TOPICS.length} topics, ${ids.size} ids checked, ${errs} problem(s)`);
process.exit(errs ? 1 : 0);
