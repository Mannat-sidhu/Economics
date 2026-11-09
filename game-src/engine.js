/* Market Quest engine: state, routing, quiz runner, lessons, boss fights, weak spots. */
(() => {
  const EXAM = new Date('2026-11-16T16:30:00');
  const KEY = 'mq_v1';
  const PASS_SKIP = 0.8, PASS_BOSS = 0.6;
  const RANKS = [[0, 'Freshman'], [300, 'Intern'], [800, 'Analyst'], [1600, 'Associate'], [2800, 'Economist'], [4500, 'Nobel Hopeful']];
  const $app = document.getElementById('app');
  let cleanups = [];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const val = v => typeof v === 'function' ? v() : (v || '');

  /* ---------- state ---------- */
  const def = () => ({ xp: 0, streak: { last: '', n: 0 }, lv: {}, review: [], stats: {}, badges: [], final: { best: null }, draft: {}, theme: '' });
  let mem = null;
  function load() {
    try { return Object.assign(def(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return mem || def(); }
  }
  let S = load();
  function save() { mem = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  const L = id => (S.lv[id] = S.lv[id] || { skip: false, skipBest: null, cards: [], weak: [], boss: { best: null, passed: false }, practice: { n: 0, right: 0 } });
  const topic = id => TOPICS.find(t => t.id === id);
  const cleared = t => { const l = L(t.id); return l.skip || l.boss.passed; };
  const helpers = () => S.helpers !== false;
  // Real-life layer (topics/1x-rl-*.js): a story card first, extra "spot it in real life" questions.
  TOPICS.forEach(t => {
    const r = RL.lv[t.id]; if (!r) return;
    Object.assign(RL.card, r.card || {});
    if (r.story) t.cards.unshift({ id: t.id + '-story', sub: null, title: r.story.title, story: true, html: r.story.html, tip: r.story.tip, check: r.story.check });
    (r.extraCards || []).forEach(x => { const i = t.cards.findIndex(c => c.id === x.after); t.cards.splice(i + 1, 0, x.card); });
    (r.extra || []).forEach(q => t.questions.push(Object.assign({ real: true }, q)));
  });
  const rank = () => { let r = RANKS[0][1]; RANKS.forEach(x => { if (S.xp >= x[0]) r = x[1]; }); return r; };
  const today = () => new Date().toISOString().slice(0, 10);
  function touch() {
    const t = today();
    if (S.streak.last !== t) {
      const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      S.streak.n = S.streak.last === y ? S.streak.n + 1 : 1; S.streak.last = t;
    }
  }
  function toast(m) {
    const d = document.createElement('div'); d.className = 'toast'; d.textContent = m; document.body.appendChild(d);
    setTimeout(() => d.remove(), 2200);
  }
  function addXP(n, why) { if (n <= 0) return; S.xp += n; touch(); save(); toast('+' + n + ' XP' + (why ? ' · ' + why : '')); }
  const BADGES = [
    ['first', '🩸 First blood', 'Answer a question correctly', () => Object.values(S.stats).some(s => s.right > 0)],
    ['skip', '⚡ Skipped it', 'Clear a level with the Skip Challenge', () => TOPICS.some(t => L(t.id).skip)],
    ['scholar', '📖 Scholar', 'Read every lesson card in a level', () => TOPICS.some(t => t.cards.length && L(t.id).cards.length >= t.cards.length)],
    ['slayer', '👹 Boss slayer', 'Beat a boss (60%+)', () => TOPICS.some(t => L(t.id).boss.passed)],
    ['flawless', '💎 Flawless', 'Score 90%+ on a boss', () => TOPICS.some(t => (L(t.id).boss.best || 0) >= 0.9)],
    ['streak3', '🔥 3-day streak', 'Study 3 days in a row', () => S.streak.n >= 3],
    ['allclear', '🏆 All clear', 'Clear every level', () => TOPICS.every(cleared)],
    ['final', '🎓 Exam ready', 'Pass the Final Boss (60%+)', () => (S.final.best || 0) >= PASS_BOSS],
  ];
  function checkBadges() {
    BADGES.forEach(b => { if (!S.badges.includes(b[0]) && b[3]()) { S.badges.push(b[0]); save(); toast('Badge unlocked: ' + b[1]); } });
  }
  function stat(qid, ok) {
    const s = S.stats[qid] = S.stats[qid] || { right: 0, wrong: 0 };
    const first = s.right === 0;
    if (ok) s.right++; else s.wrong++;
    if (ok) { S.review = S.review.filter(x => x !== qid); } else if (!S.review.includes(qid)) S.review.push(qid);
    return first;
  }
  const allQ = () => TOPICS.flatMap(t => t.questions.map(q => Object.assign({ topicId: t.id }, q)));

  /* ---------- helpers ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let cur = location.hash || '#/';
  const go = h => { cur = h; try { location.hash = h; } catch (e) { } route(); };
  function mount(html) { cleanups.forEach(f => f()); cleanups = []; $app.innerHTML = html; window.scrollTo(0, 0); }
  function topbar() {
    return `<div class="top"><a class="brand" href="#/">📈 Market Quest</a><div class="stats">
      <span class="pill">${rank()}</span><span class="pill hot">⭐ ${S.xp} XP</span><span class="pill">🔥 ${S.streak.n}d</span></div></div>`;
  }
  function countdown() {
    const ms = EXAM - new Date();
    if (ms <= 0) return '<div class="countdown"><b>Exam time — good luck!</b></div>';
    const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5);
    return `<div class="countdown"><div><div class="eyebrow">FIN42230 final exam</div><b>${d} days ${h} hours to go</b></div><div class="muted mono">Mon 16 Nov 2026 · 4:30pm · 2h</div></div>`;
  }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  const copy = txt => {
    const done = () => toast('Copied. Paste it into chat for marking.');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
    function fallback() { const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Copy failed'); } t.remove(); }
  };

  /* ---------- single question widget ---------- */
  function mountQ(el, q, cb, opt) {
    opt = opt || {};
    const isNum = q.type === 'num';
    let opts = null, order = null;
    if (!isNum) {
      opts = q.type === 'tf' ? ['True', 'False'] : q.opts;
      order = opts.map((_, i) => i);
      const fixed = q.type === 'tf' || opts.some(o => /above|both|neither|none of|all of/i.test(o));
      if (!fixed) order = shuffle(order);
    }
    const correctIdx = q.type === 'tf' ? (q.a ? 0 : 1) : q.a;
    el.innerHTML = `${opt.meta ? `<div class="qmeta"><span class="chip">${esc(opt.meta)}</span>${q.real ? '<span class="chip hot">real life</span>' : ''}<span class="chip no">${q.type === 'num' ? 'numerical' : q.type === 'tf' ? 'true / false' : 'multiple choice'}</span></div>` : ''}
      ${q.scn && helpers() ? `<div class="scn"><b>🏙 Picture this</b> ${q.scn}</div>` : ''}<div class="qtext">${q.q}</div>${val(q.svg)}
      ${isNum ? `<div class="row"><input class="numin" type="text" inputmode="decimal" placeholder="your answer"><span class="muted">${esc(q.unit || '')}</span><button class="btn small" data-chk>Check</button></div>`
        : order.map(i => `<button class="opt" data-i="${i}">${esc(opts[i])}</button>`).join('')}
      <div data-fb></div>`;
    let done = false;
    function finish(ok, userTxt) {
      if (done) return; done = true;
      const fb = el.querySelector('[data-fb]');
      const steps = q.steps ? `<div class="steps"><b>Working</b><ol>${q.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>` : '';
      const ansTxt = isNum ? `<b>Answer: ${q.ansText || q.ans}${q.unit ? ' ' + esc(q.unit) : ''}</b>. ` : '';
      fb.innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}"><b>${ok ? 'Correct.' : 'Not quite.'}</b> ${ansTxt}${q.why || ''}</div>${steps}`;
      cb(ok);
    }
    if (isNum) {
      const inp = el.querySelector('input'), run = () => {
        const v = parseFloat(inp.value.replace(/[,€$%\s]/g, ''));
        if (isNaN(v)) { toast('Type a number first'); return; }
        const tol = q.tol != null ? q.tol : Math.max(Math.abs(q.ans) * 0.01, 0.005);
        inp.disabled = true; el.querySelector('[data-chk]').disabled = true;
        finish(Math.abs(v - q.ans) <= tol);
      };
      el.querySelector('[data-chk]').onclick = run;
      inp.onkeydown = e => { if (e.key === 'Enter') run(); };
      if (!opt.noFocus) setTimeout(() => inp.focus(), 50);
    } else {
      el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (done) return;
        const i = +b.dataset.i, ok = i === correctIdx;
        el.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.i === correctIdx) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        finish(ok);
      });
    }
  }

  /* ---------- quiz runner (skip / practice / weak) ---------- */
  function runQuiz(o) {
    const items = o.items; let i = 0, right = 0; const missed = [];
    mount(`${topbar()}<div class="row"><a href="${o.back}" class="btn ghost small">← Leave</a><div class="sp"></div><span class="muted mono" id="qp"></span></div><h2 style="margin-top:12px">${o.title}</h2><div class="bar" style="margin:8px 0 14px"><i id="qbar"></i></div><div class="qbox" id="qa"></div><div class="row" style="margin-top:12px"><div class="sp"></div><button class="btn" id="nx" disabled>Next</button></div>`);
    const nx = document.getElementById('nx');
    function show() {
      document.getElementById('qp').textContent = `Question ${i + 1} of ${items.length} · ${right} correct`;
      document.getElementById('qbar').style.width = (100 * i / items.length) + '%';
      nx.disabled = true; nx.textContent = i === items.length - 1 ? 'See results' : 'Next';
      const q = items[i];
      mountQ(document.getElementById('qa'), q, ok => {
        if (ok) right++; else missed.push(q);
        const first = stat(q.id, ok);
        if (o.xp !== false) { if (ok) { S.xp += first ? 10 : 2; } }
        S.xp = Math.max(S.xp, 0); touch(); save();
        if (q.topicId) { const l = L(q.topicId); l.practice.n++; if (ok) l.practice.right++; }
        checkBadges(); nx.disabled = false; nx.focus();
      }, { meta: (topic(q.topicId) || {}).title });
    }
    nx.onclick = () => { if (++i < items.length) show(); else o.done({ right, total: items.length, missed }); };
    show();
  }
  function resultScreen(o) {
    const p = pct(o.right, o.total);
    mount(`${topbar()}<div class="card" style="text-align:center"><div class="eyebrow">${o.eyebrow}</div><div class="summary-big">${o.right} / ${o.total}</div><p>${p}% ${o.msg || ''}</p><div class="bar ${p >= 80 ? 'good' : ''}" style="margin:6px 0 14px"><i style="width:${p}%"></i></div>${o.extra || ''}<div class="row" style="justify-content:center">${o.buttons}</div></div>
      ${o.missed.length ? `<h3>Missed (now in your Weak Spots)</h3>${o.missed.map(q => `<div class="card"><div class="qtext">${q.q}</div>${val(q.svg)}<div class="fb no">${q.type === 'num' ? `<b>Answer: ${q.ansText || q.ans}${q.unit ? ' ' + esc(q.unit) : ''}</b>. ` : ''}${q.why || ''}</div></div>`).join('')}` : ''}`);
  }

  /* ---------- screens ---------- */
  function vHome() {
    const lv = TOPICS.map(t => {
      const l = L(t.id), c = cleared(t);
      return `<a class="lvl ${c ? 'cleared' : ''}" href="#/l/${t.id}"><span class="e">${t.emoji}</span><div class="n">LEVEL ${t.n}</div><div class="t">${t.title}</div><div class="muted" style="font-size:.88rem">${t.blurb}</div>
        <div class="st">${c ? `<span class="chip ok">✔ cleared${l.skip ? ' (skipped)' : ''}</span>` : '<span class="chip no">not cleared</span>'}
        <span class="chip">${l.cards.length}/${t.cards.length} lessons</span>${l.boss.best != null ? `<span class="chip ${l.boss.passed ? 'ok' : 'hot'}">boss ${Math.round(l.boss.best * 100)}%</span>` : ''}</div></a>`;
    }).join('');
    const nCl = TOPICS.filter(cleared).length;
    mount(`${topbar()}${countdown()}
      <div class="card"><h1>Choose your level</h1><p class="muted">Know a topic already? Take its <b>Skip Challenge</b> (8/10 to clear it). Not sure? <b>Learn</b> it, <b>Practice</b>, then beat the <b>Boss</b>. Cleared ${nCl} of ${TOPICS.length} levels.</p>
      <div class="bar good"><i style="width:${pct(nCl, TOPICS.length)}%"></i></div></div>
      <div class="levels">${lv}
        <a class="lvl final" href="#/final"><span class="e">🎓</span><div class="n">FINAL BOSS</div><div class="t">Full mock-format exam</div><div class="muted" style="font-size:.88rem">2 hours · Section A (40) + any 2 of 3 in Section B (60). All-new questions in the style of the real paper.</div><div class="st"><span class="chip ${S.final.best != null && S.final.best >= PASS_BOSS ? 'ok' : 'no'}">${S.final.best != null ? 'best ' + Math.round(S.final.best * 100) + '%' : 'not attempted'}</span></div></a>
        <a class="lvl" href="#/glossary"><span class="e">📚</span><div class="n">JARGON BUSTER</div><div class="t">Plain-English glossary</div><div class="muted" style="font-size:.88rem">${glossary().length} terms with everyday examples · searchable</div></a>
        <a class="lvl" href="#/weak"><span class="e">🎯</span><div class="n">WEAK SPOTS</div><div class="t">Review queue</div><div class="muted" style="font-size:.88rem">${S.review.length} question${S.review.length === 1 ? '' : 's'} to revisit</div></a>
        <a class="lvl" href="#/settings"><span class="e">🏅</span><div class="n">PROFILE</div><div class="t">Badges &amp; settings</div><div class="muted" style="font-size:.88rem">${S.badges.length}/${BADGES.length} badges · export / reset progress</div></a>
      </div>`);
  }

  function vLevel(id) {
    const t = topic(id); if (!t) return go('#/');
    const l = L(id), nq = t.questions.length, ns = t.questions.filter(q => q.skip).length;
    const weakTxt = l.weak.length ? `<div class="fb no"><b>Study these:</b> ${l.weak.map(s => t.subs[s] || s).join(' · ')}. Your Learn track puts them first.</div>` : '';
    mount(`${topbar()}<div class="row"><a href="#/" class="btn ghost small">← Map</a></div>
      <div class="card" style="margin-top:12px"><span style="font-size:2rem;float:right">${t.emoji}</span><div class="eyebrow">Level ${t.n}</div><h1>${t.title}</h1><p class="muted">${t.blurb}</p>
      ${cleared(t) ? '<span class="chip ok">✔ level cleared</span>' : '<span class="chip no">not cleared yet: skip it or beat the boss</span>'}${weakTxt}</div>
      <a class="stage" href="#/l/${id}/skip" style="color:inherit;text-decoration:none"><div class="ic">⚡</div><div class="sp"><div class="tt">Skip Challenge</div><div class="muted">${ns} questions · score ${Math.ceil(PASS_SKIP * ns)}+ to clear the whole level${l.skipBest != null ? ' · best ' + l.skipBest + '/' + ns : ''}</div></div><span class="btn small">Go</span></a>
      <a class="stage" href="#/l/${id}/learn" style="color:inherit;text-decoration:none"><div class="ic">📖</div><div class="sp"><div class="tt">Learn</div><div class="muted">${t.cards.length} bite-size cards: a real-life story first, then the economics · ${l.cards.length}/${t.cards.length} done</div></div><span class="btn small">Go</span></a>
      <a class="stage" href="#/l/${id}/practice" style="color:inherit;text-decoration:none"><div class="ic">🎯</div><div class="sp"><div class="tt">Practice</div><div class="muted">${nq} questions, slightly harder than the mock · accuracy ${l.practice.n ? pct(l.practice.right, l.practice.n) + '%' : '–'}</div></div><span class="btn small">Go</span></a>
      <a class="stage" href="#/l/${id}/boss" style="color:inherit;text-decoration:none;border-color:var(--bad)"><div class="ic">👹</div><div class="sp"><div class="tt">Boss Fight: ${t.boss.title}</div><div class="muted">Exam-style written question · ${t.boss.questions.reduce((a, q) => a + q.parts.reduce((b, p) => b + p.marks, 0), 0)} marks · ${bossMinutes(t.boss)} min${l.boss.best != null ? ' · best ' + Math.round(l.boss.best * 100) + '%' : ''}</div></div><span class="btn small warn">Fight</span></a>`);
  }

  function vSkip(id) {
    const t = topic(id), items = t.questions.filter(q => q.skip).map(q => Object.assign({ topicId: id }, q));
    runQuiz({
      title: '⚡ Skip Challenge: ' + t.title, items: shuffle(items), back: '#/l/' + id, xp: false,
      done: r => {
        const l = L(id), need = Math.ceil(PASS_SKIP * r.total), ok = r.right >= need;
        l.skipBest = Math.max(l.skipBest || 0, r.right);
        if (ok) { if (!l.skip) addXP(150, 'level skipped'); l.skip = true; l.weak = []; }
        else l.weak = [...new Set(r.missed.map(q => q.sub).filter(Boolean))];
        save(); checkBadges();
        resultScreen({
          eyebrow: ok ? 'Level cleared!' : 'Not yet', right: r.right, total: r.total, missed: r.missed,
          msg: ok ? '· you already know this. Lessons stay open if you want a refresher.' : `· you need ${need}. Study the flagged topics, then retry.`,
          extra: !ok && l.weak.length ? `<p><b>Focus on:</b> ${l.weak.map(s => t.subs[s] || s).join(' · ')}</p>` : '',
          buttons: ok ? `<a class="btn" href="#/">Back to map</a><a class="btn ghost" href="#/l/${id}/boss">Try the boss anyway</a>` : `<a class="btn" href="#/l/${id}/learn">Study weak topics</a><a class="btn ghost" href="#/l/${id}/skip">Retry</a>`
        });
      }
    });
  }

  function vPractice(id) {
    const t = topic(id), items = shuffle(t.questions.map(q => Object.assign({ topicId: id }, q)));
    runQuiz({
      title: '🎯 Practice: ' + t.title, items, back: '#/l/' + id,
      done: r => { checkBadges(); resultScreen({ eyebrow: 'Practice complete', right: r.right, total: r.total, missed: r.missed, msg: '· misses are saved in Weak Spots.', buttons: `<a class="btn" href="#/l/${id}/boss">On to the boss</a><a class="btn ghost" href="#/l/${id}/practice">Again</a><a class="btn ghost" href="#/l/${id}">Level page</a>` }); }
    });
  }

  function vWeak() {
    const qs = allQ().filter(q => S.review.includes(q.id));
    const byT = TOPICS.map(t => ({ t, n: qs.filter(q => q.topicId === t.id).length })).filter(x => x.n);
    const acc = TOPICS.map(t => { const l = L(t.id); return `<tr><td>${t.emoji} ${t.title}</td><td>${l.practice.n ? pct(l.practice.right, l.practice.n) + '%' : '–'}</td><td>${S.review.filter(r => t.questions.some(q => q.id === r)).length}</td></tr>`; }).join('');
    mount(`${topbar()}<div class="row"><a href="#/" class="btn ghost small">← Map</a></div><div class="card" style="margin-top:12px"><h1>🎯 Weak spots</h1>
      <p class="muted">Every question you miss lands here. Answer it correctly once to remove it.</p>
      ${qs.length ? `<p><b>${qs.length}</b> to review: ${byT.map(x => `${x.t.emoji} ${x.n}`).join(' · ')}</p><button class="btn" id="drill">Drill up to 12 weak questions</button>` : '<div class="fb ok">Nothing in the queue. Go practice some more!</div>'}</div>
      <div class="card"><h3 style="margin-top:0">Accuracy by level</h3><table class="t"><tr><th>Level</th><th>Practice accuracy</th><th>In review</th></tr>${acc}</table></div>`);
    const b = document.getElementById('drill');
    if (b) b.onclick = () => runQuiz({
      title: '🎯 Weak spots drill', items: shuffle(qs).slice(0, 12), back: '#/weak',
      done: r => { checkBadges(); resultScreen({ eyebrow: 'Drill complete', right: r.right, total: r.total, missed: r.missed, buttons: '<a class="btn" href="#/weak">Back</a>' }); }
    });
  }

  function vSettings() {
    mount(`${topbar()}<div class="row"><a href="#/" class="btn ghost small">← Map</a></div><div class="card" style="margin-top:12px"><h1>🏅 Profile</h1><p>${rank()} · ${S.xp} XP · ${S.streak.n}-day streak</p>
      <div>${BADGES.map(b => `<span class="badge ${S.badges.includes(b[0]) ? '' : 'off'}" title="${b[2]}">${b[1]}<br><span class="muted" style="font-size:.78rem">${b[2]}</span></span>`).join('')}</div></div>
      <div class="card"><h3 style="margin-top:0">Settings</h3><div class="row">
      <button class="btn ghost small" id="th">Toggle light / dark</button><button class="btn ghost small" id="hp">Everyday helpers: ${helpers() ? 'ON' : 'OFF'}</button><button class="btn ghost small" id="ex">Copy progress (backup)</button><button class="btn ghost small" id="im">Restore from backup</button><button class="btn warn small" id="rs">Reset everything</button></div>
      <p class="muted" style="margin-top:10px">Progress is saved in this browser only. Use the backup button before clearing browser data.</p></div>`);
    document.getElementById('th').onclick = () => { const d = document.documentElement, cur = d.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); d.dataset.theme = S.theme = cur === 'dark' ? 'light' : 'dark'; save(); };
    document.getElementById('hp').onclick = e => { S.helpers = !helpers(); save(); e.target.textContent = 'Everyday helpers: ' + (helpers() ? 'ON' : 'OFF'); };
    document.getElementById('ex').onclick = () => copy(JSON.stringify(S));
    document.getElementById('im').onclick = () => { const d = document.createElement('div'); d.className = 'card'; d.innerHTML = '<b>Paste your backup text</b><textarea class="ans" id="bk"></textarea><button class="btn small" id="bk2" style="margin-top:8px">Restore</button>'; $app.appendChild(d); document.getElementById('bk2').onclick = () => { try { S = Object.assign(def(), JSON.parse(document.getElementById('bk').value)); save(); toast('Restored'); vSettings(); } catch (e) { toast('That backup could not be read'); } }; };
    let sure = false; document.getElementById('rs').onclick = e => { if (!sure) { sure = true; e.target.textContent = 'Click again to delete ALL progress'; return; } S = def(); save(); toast('Reset'); go('#/'); };
  }

  /* ---------- lessons ---------- */
  const rlJargon = r => (r && r.jargon && r.jargon.length) ? `<div class="jargon"><div class="sh">🔤 Jargon buster</div><dl>${r.jargon.map(j => `<dt>${j[0]}</dt><dd>${j[1]}${j[2] ? ` <span class="muted">e.g. ${j[2]}</span>` : ''}</dd>`).join('')}</dl></div>` : '';
  function cardBody(c) {
    const full = c.html + val(c.svg) + (c.img ? `<img class="slide" src="${c.img}" alt="">` : '');
    if (c.story) return `<div class="story"><div class="sh">📖 The story</div>${c.html}</div>`;
    const r = RL.card[c.id];
    if (!r || !helpers()) return full;
    const top = (r.plain ? `<div class="plain"><b>In plain English:</b> ${r.plain}</div>` : '') + (r.story ? `<div class="story"><div class="sh">${r.icon || '🏠'} ${r.stitle || 'Picture this'}</div>${r.story}</div>` : '');
    if (r.simple) return `${top}<div class="simple"><div class="sh">🪜 Step by step</div>${r.simple}</div>${rlJargon(r)}<details class="full"><summary>Show the full exam-level version (with diagrams)</summary>${full}</details>`;
    return `${top}${full}${rlJargon(r)}`;
  }
  function glossary() {
    const out = [];
    TOPICS.forEach(t => {
      const seen = new Set();
      const add = j => { const k = j[0].toLowerCase(); if (seen.has(k)) return; seen.add(k); out.push({ t, term: j[0], plain: j[1], eg: j[2] || '' }); };
      t.cards.forEach(c => ((RL.card[c.id] || {}).jargon || []).forEach(add));
      ((RL.lv[t.id] || {}).gloss || []).forEach(add);
    });
    return out;
  }
  function vGloss() {
    const all = glossary();
    mount(`${topbar()}<div class="row"><a href="#/" class="btn ghost small">← Map</a></div><div class="card" style="margin-top:12px"><h1>📚 Jargon buster</h1>
      <p class="muted">${all.length} economics words in plain English, with an everyday example. Type to search.</p><input class="numin" id="gs" style="width:100%" type="text" placeholder="Search e.g. elasticity, Nash, deadweight…"></div><div id="gl"></div>`);
    const draw = () => {
      const f = document.getElementById('gs').value.trim().toLowerCase();
      const hit = all.filter(g => !f || g.term.toLowerCase().includes(f) || g.plain.toLowerCase().includes(f));
      document.getElementById('gl').innerHTML = TOPICS.map(t => { const xs = hit.filter(g => g.t === t); return xs.length ? `<div class="card jargon"><div class="sh">${t.emoji} ${t.title}</div><dl>${xs.map(g => `<dt>${g.term}</dt><dd>${g.plain}${g.eg ? ` <span class="muted">e.g. ${g.eg}</span>` : ''}</dd>`).join('')}</dl></div>` : ''; }).join('') || '<p class="muted">No match.</p>';
    };
    document.getElementById('gs').oninput = draw; draw();
  }

  function vLearn(id) {
    const t = topic(id), l = L(id);
    let cards = t.cards.slice();
    if (l.weak.length) cards.sort((a, b) => (l.weak.includes(b.sub) ? 1 : 0) - (l.weak.includes(a.sub) ? 1 : 0));
    let i = 0;
    function show() {
      const c = cards[i], recommended = l.weak.includes(c.sub);
      mount(`${topbar()}<div class="row"><a href="#/l/${id}" class="btn ghost small">← Level</a><div class="sp"></div><span class="muted mono">Card ${i + 1} / ${cards.length}</span></div>
        <div class="dots">${cards.map((x, k) => `<i class="${k === i ? 'on' : l.cards.includes(x.id) ? 'done' : ''}"></i>`).join('')}</div>
        <div class="card lesson"><div class="eyebrow">${t.title}${t.subs[c.sub] ? ' · ' + t.subs[c.sub] : ''}${recommended ? ' · <span class="chip hot">study this</span>' : ''}</div><h2>${c.title}</h2>${cardBody(c)}${c.tip ? `<div class="tip"><b>${c.story ? 'Why this matters' : 'Exam tip'}:</b> ${c.tip}</div>` : ''}</div>
        ${c.check ? '<div class="qbox" id="ck"></div>' : ''}
        <div class="row" style="margin-top:12px"><button class="btn ghost" id="pv" ${i === 0 ? 'disabled' : ''}>← Back</button><div class="sp"></div><button class="btn" id="nx">${i === cards.length - 1 ? 'Finish lesson' : 'Next card →'}</button></div>`);
      const seen = () => { if (!l.cards.includes(c.id)) { l.cards.push(c.id); save(); } };
      if (c.check) {
        mountQ(document.getElementById('ck'), c.check, ok => {
          const first = stat(c.check.id || (c.id + '-ck'), ok); if (ok && first) addXP(5); else save(); seen(); checkBadges();
        }, { meta: 'Check-in', noFocus: true });
      } else seen();
      document.getElementById('pv').onclick = () => { i--; show(); };
      document.getElementById('nx').onclick = () => {
        seen();
        if (i < cards.length - 1) { i++; show(); return; }
        if (!l.lessonXP) { l.lessonXP = true; addXP(30, 'lesson complete'); }
        l.weak = []; save(); checkBadges(); go('#/l/' + id + '/practice');
      };
    }
    show();
  }

  /* ---------- boss fights ---------- */
  const bossMarks = b => b.questions.reduce((a, q) => a + q.parts.reduce((x, p) => x + p.marks, 0), 0);
  const bossMinutes = b => b.minutes || Math.ceil(bossMarks(b) * 1.2);
  function bossText(b, chosen, ans, withAns) {
    let t = `Please mark my answers like a strict FIN42230 (UCD Economics & Markets) examiner. Give a mark per part, say what I missed, and list model-answer points.\n\n=== ${b.title} ===\n`;
    b.questions.filter(q => chosen.includes(q.id)).forEach(q => {
      t += `\n## ${q.title}${q.section ? ' (' + q.section + ')' : ''}\n${q.intro ? strip(q.intro) + '\n' : ''}`;
      q.parts.forEach((p, k) => { t += `\n(${p.label}) ${strip(p.q)} [${p.marks} marks]\nMY ANSWER: ${(ans[q.id + '.' + k] || '').trim() || '(blank)'}\n`; });
    });
    return t;
  }
  const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

  function vBoss(key) {
    const isFinal = key === 'final', b = isFinal ? FINAL : topic(key).boss, back = isFinal ? '#/' : '#/l/' + key;
    const dk = 'draft:' + key;
    const draft = S.draft[dk] = S.draft[dk] || { ans: {}, chosen: null };
    let phase = 'brief';
    const total = () => b.questions.filter(q => (draft.chosen || []).includes(q.id)).reduce((a, q) => a + q.parts.reduce((x, p) => x + p.marks, 0), 0);
    function brief() {
      const choose = b.choose;
      mount(`${topbar()}<div class="row"><a href="${back}" class="btn ghost small">← Leave</a></div>
        <div class="boss-hdr" style="margin-top:12px"><div class="eyebrow" style="color:var(--bad)">${isFinal ? 'Final boss' : 'Boss fight'}</div><h1>${b.title}</h1><p>${b.briefing || ''}</p>
        <p class="mono">Time: ${bossMinutes(b)} minutes (about 1.2 min per mark, like the real paper) · Pass: 60%</p>
        <p class="muted">Write your answers in the boxes (and draw every diagram on paper: the exam rewards labelled diagrams). Then reveal the model answer and mark yourself honestly against the checklist.</p></div>
        ${choose ? `<div class="card"><b>Section B: choose any ${choose.n} of ${choose.from.length}</b><div id="ch">${choose.from.map(id => { const q = b.questions.find(x => x.id === id); return `<label style="display:block;margin:6px 0"><input type="checkbox" value="${id}" ${(draft.chosen || []).includes(id) ? 'checked' : ''}> ${q.title}: ${q.topicLine || ''}</label>`; }).join('')}</div></div>` : ''}
        <button class="btn warn" id="go">Start the clock ⏱</button>`);
      document.getElementById('go').onclick = () => {
        let ch = b.questions.filter(q => !choose || !choose.from.includes(q.id)).map(q => q.id);
        if (choose) {
          const sel = [...document.querySelectorAll('#ch input:checked')].map(x => x.value);
          if (sel.length !== choose.n) { toast('Pick exactly ' + choose.n + ' Section B questions'); return; }
          ch = ch.concat(sel);
        }
        draft.chosen = ch; save(); fight(Date.now());
      };
    }
    function partsHtml(qs, revealed) {
      return qs.map(q => `<div class="card"><div class="eyebrow">${q.section || ''}</div><h2>${q.title}</h2>${q.intro ? `<div class="headline">${q.intro}</div>` : ''}${val(q.svg)}</div>
        ${q.parts.map((p, k) => { const kk = q.id + '.' + k; return `<div class="part"><div class="row"><span class="lab">(${p.label})</span><div class="sp"></div><span class="chip">${p.marks} marks</span></div><div class="qtext" style="margin-top:6px">${p.q}</div>${val(p.svg)}
          ${!revealed && !isFinal && helpers() && ((RL.lv[key] || {}).hints || {})[kk] ? `<div class="row" style="margin:8px 0 0"><button class="btn ghost small" data-hint="${kk}">💡 Stuck? Everyday hint</button></div><div class="hintbox" data-hb="${kk}" hidden>${RL.lv[key].hints[kk]}<div class="muted" style="margin-top:6px">There is no hint in the real exam, so try without it first.</div></div>` : ''}
          <textarea class="ans" data-k="${kk}" placeholder="Type your answer here. Aim for the number of distinct points that matches the marks." ${revealed ? 'readonly' : ''}>${esc(draft.ans[kk] || '')}</textarea>
          ${revealed ? `<div class="model"><b>Model answer</b>${p.model}${val(p.mdg)}</div><div class="rub"><b>Mark yourself</b> (tick what your answer clearly made):${p.rubric.map((r, m) => `<label><input type="checkbox" data-m="${r[1]}" data-p="${kk}"><span>${r[0]} <span class="muted">(${r[1]})</span></span></label>`).join('')}<div class="mono" data-sc="${kk}" data-max="${p.marks}"></div></div>` : ''}</div>`; }).join('')}`).join('');
    }
    function fight(t0) {
      phase = 'fight';
      const qs = b.questions.filter(q => draft.chosen.includes(q.id)), limit = bossMinutes(b) * 60;
      mount(`${topbar()}<div class="sticky row"><a href="${back}" class="btn ghost small">← Leave (draft saved)</a><div class="sp"></div><span class="timer" id="tm"></span><span class="chip">${total()} marks</span></div>${partsHtml(qs, false)}
        <div class="row"><button class="btn ghost" id="cp">Copy for Claude to mark</button><div class="sp"></div><button class="btn warn" id="rv">Reveal model answers &amp; mark ✔</button></div>`);
      const tm = document.getElementById('tm');
      const tick = () => { const s = Math.floor((Date.now() - t0) / 1000), r = limit - s, a = Math.abs(r); tm.textContent = (r < 0 ? '+' : '') + String(Math.floor(a / 60)).padStart(2, '0') + ':' + String(a % 60).padStart(2, '0'); tm.classList.toggle('over', r < 0); };
      tick(); const iv = setInterval(tick, 1000); cleanups.push(() => clearInterval(iv));
      document.querySelectorAll('[data-hint]').forEach(b => b.onclick = () => { const h = document.querySelector(`[data-hb="${b.dataset.hint}"]`); h.hidden = !h.hidden; });
      document.querySelectorAll('textarea.ans').forEach(ta => ta.oninput = () => { draft.ans[ta.dataset.k] = ta.value; save(); });
      document.getElementById('cp').onclick = () => copy(bossText(b, draft.chosen, draft.ans));
      let warned = false; document.getElementById('rv').onclick = () => { if (!Object.values(draft.ans).some(x => x.trim()) && !warned) { warned = true; toast('Answers are empty. Press again to reveal anyway.'); return; } mark(); };
    }
    function mark() {
      phase = 'mark';
      const qs = b.questions.filter(q => draft.chosen.includes(q.id));
      mount(`${topbar()}<div class="sticky row"><div class="eyebrow">Marking mode</div><div class="sp"></div><span class="pill hot" id="tot"></span></div>
        <p class="muted">Be honest: tick a point only if your answer clearly made it. Half-points don't exist in this checklist.</p>${partsHtml(qs, true)}
        <div class="row"><button class="btn ghost" id="cp">Copy for Claude to mark</button><div class="sp"></div><button class="btn" id="fin">Finish &amp; save score</button></div>`);
      const upd = () => {
        let sum = 0;
        document.querySelectorAll('[data-sc]').forEach(el => {
          let s = 0; document.querySelectorAll(`input[data-p="${el.dataset.sc}"]:checked`).forEach(c => s += +c.dataset.m);
          s = Math.min(s, +el.dataset.max); el.textContent = `Part score: ${s} / ${el.dataset.max}`; sum += s;
        });
        document.getElementById('tot').textContent = `${sum} / ${total()}`; return sum;
      };
      document.querySelectorAll('.rub input').forEach(c => c.onchange = upd); upd();
      document.getElementById('cp').onclick = () => copy(bossText(b, draft.chosen, draft.ans));
      document.getElementById('fin').onclick = () => result(upd());
    }
    function result(score) {
      const max = total(), p = max ? score / max : 0, pass = p >= PASS_BOSS;
      let prev = isFinal ? S.final.best : L(key).boss.best;
      const xp = Math.max(0, Math.round(p * 200) - Math.round((prev || 0) * 200));
      if (isFinal) S.final.best = Math.max(S.final.best || 0, p);
      else { const l = L(key); l.boss.best = Math.max(l.boss.best || 0, p); if (pass) l.boss.passed = true; }
      delete S.draft[dk]; save(); if (xp) addXP(xp, 'boss score'); checkBadges();
      mount(`${topbar()}<div class="boss-hdr" style="text-align:center"><div class="eyebrow" style="color:var(--bad)">${pass ? 'Boss defeated!' : 'The boss survives…'}</div><div class="summary-big">${score} / ${max}</div><p>${Math.round(p * 100)}% · ${pass ? 'that is a pass.' : 'pass mark is 60%. Re-read the model answers, then rematch.'}</p>
        <div class="bar boss"><i style="width:${Math.round(100 - p * 100)}%"></i></div><p class="mono muted">Boss HP ${Math.round(100 - p * 100)}%</p>
        <div class="row" style="justify-content:center"><a class="btn" href="${back}">Continue</a><a class="btn ghost" href="#/${isFinal ? 'final' : 'l/' + key + '/boss'}">Rematch</a></div></div>`);
    }
    if (draft.chosen && Object.values(draft.ans).some(x => x && x.trim())) {
      mount(`${topbar()}<div class="card"><h2>Resume your draft?</h2><p>You have unsaved answers for this boss.</p><div class="row"><button class="btn" id="rs1">Resume</button><button class="btn ghost" id="rs2">Start fresh</button></div></div>`);
      document.getElementById('rs1').onclick = () => fight(Date.now());
      document.getElementById('rs2').onclick = () => { draft.ans = {}; draft.chosen = null; save(); brief(); };
    } else brief();
  }

  /* ---------- router ---------- */
  function route() {
    const p = cur.replace(/^#\/?/, '').split('/');
    try {
      if (!p[0]) return vHome();
      if (p[0] === 'l') { if (!p[2]) return vLevel(p[1]); if (p[2] === 'skip') return vSkip(p[1]); if (p[2] === 'learn') return vLearn(p[1]); if (p[2] === 'practice') return vPractice(p[1]); if (p[2] === 'boss') return vBoss(p[1]); }
      if (p[0] === 'final') return vBoss('final');
      if (p[0] === 'weak') return vWeak();
      if (p[0] === 'settings') return vSettings();
      if (p[0] === 'glossary') return vGloss();
      vHome();
    } catch (e) { console.error(e); $app.innerHTML = '<div class="card"><h2>Something broke</h2><pre>' + esc(e.stack || e) + '</pre><a href="#/">Home</a></div>'; }
  }
  if (S.theme) document.documentElement.dataset.theme = S.theme;
  window.addEventListener('hashchange', () => { if (location.hash !== cur) { cur = location.hash || '#/'; route(); } });
  document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[href^="#/"]'); if (a) { e.preventDefault(); go(a.getAttribute('href')); } });
  route();
})();
