TOPICS.push((() => {
  // ---- small network toolkit so every numeric answer is computed, not typed ----
  const adj = es => { const a = {}; es.forEach(e => { (a[e[0]] = a[e[0]] || []).push(e[1]); (a[e[1]] = a[e[1]] || []).push(e[0]); }); return a; };
  const dist = (a, s) => { const d = { [s]: 0 }, q = [s]; while (q.length) { const u = q.shift(); (a[u] || []).forEach(v => { if (!(v in d)) { d[v] = d[u] + 1; q.push(v); } }); } return d; };
  const degree = (es, n) => adj(es)[n].length;
  const farness = (es, n) => Object.values(dist(adj(es), n)).reduce((x, y) => x + y, 0);
  const closeness = (es, n) => 1 / farness(es, n);
  const density = (es, N) => es.length / (N * (N - 1) / 2);
  // betweenness (count of node pairs whose unique/shared shortest paths run through n; equal split if several)
  const between = (es, n) => {
    const a = adj(es), nodes = Object.keys(a); let tot = 0;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const s = nodes[i], t = nodes[j]; if (s === n || t === n) continue;
      const ds = dist(a, s), dt = dist(a, t), D = ds[t];
      const count = (x, y, d) => { // number of shortest paths from x to y
        const m = {}; const dd = dist(a, x); const order = nodes.slice().sort((p, q) => dd[p] - dd[q]); m[x] = 1;
        order.forEach(u => { if (u === x) return; m[u] = (a[u] || []).filter(v => dd[v] === dd[u] - 1).reduce((s2, v) => s2 + (m[v] || 0), 0); });
        return m[y];
      };
      if (ds[n] + dt[n] === D) tot += count(s, n) * count(n, t) / count(s, t);
    }
    return tot;
  };
  // ---- graphs ----
  const G1n = { A: [8, 22], B: [8, 78], C: [34, 50], D: [66, 50], E: [92, 22], F: [92, 78] };
  const G1e = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['D', 'F'], ['E', 'F']];
  const g1 = () => DG.graph({ nodes: G1n, edges: G1e.map(e => [e[0], e[1], 'e']), w: 420, h: 220 });
  const LECn = { A: [50, 50], B: [50, 8], C: [8, 50], D: [30, 92], E: [92, 50] };
  const LECe = [['A', 'B'], ['A', 'C'], ['A', 'D'], ['A', 'E'], ['C', 'D']];
  const lec = () => DG.graph({ nodes: LECn, edges: LECe.map(e => [e[0], e[1], 'e']), w: 380, h: 240, hl: ['A'] });
  const G2n = { A: [8, 30], B: [30, 8], C: [30, 72], D: [58, 50], E: [90, 20], F: [90, 80] };
  const G2e = [['A', 'B', 's'], ['A', 'C', 's'], ['B', 'C', 'w'], ['C', 'D', 'w'], ['D', 'E', 's'], ['D', 'F', 's']];
  const g2 = () => DG.graph({ nodes: G2n, edges: G2e, w: 420, h: 240, legend: true });
  const Hn = { A: [6, 50], B: [24, 10], C: [24, 90], D: [50, 50], E: [74, 12], F: [74, 78], G: [94, 90] };
  const He = [['A', 'B', 's'], ['A', 'C', 's'], ['B', 'C', 'w'], ['A', 'D', 'w'], ['D', 'E', 's'], ['D', 'F', 's'], ['F', 'G', 's']];
  const gH = () => DG.graph({ nodes: Hn, edges: He, w: 460, h: 260, legend: true });
  const WWn = { GB: [10, 15], Fr: [10, 50], Ru: [10, 85], Ge: [90, 15], AH: [90, 50], It: [90, 85] };
  const WWe = [['GB', 'Fr', '+'], ['GB', 'Ru', '+'], ['Fr', 'Ru', '+'], ['Ge', 'AH', '+'], ['Ge', 'It', '+'], ['AH', 'It', '+'],
    ['GB', 'Ge', '-'], ['GB', 'AH', '-'], ['GB', 'It', '-'], ['Fr', 'Ge', '-'], ['Fr', 'AH', '-'], ['Fr', 'It', '-'], ['Ru', 'Ge', '-'], ['Ru', 'AH', '-'], ['Ru', 'It', '-']];
  const ww = () => DG.graph({ nodes: WWn, edges: WWe, w: 440, h: 270, legend: true, kind: 'sign' });
  const comps = DG.graph({ nodes: { A: [10, 25], B: [30, 70], C: [48, 25], D: [66, 50], E: [90, 20], F: [90, 80] }, edges: [['A', 'B', 'e'], ['B', 'C', 'e'], ['A', 'C', 'e'], ['D', 'E', 'e'], ['E', 'F', 'e'], ['D', 'F', 'e']], w: 420, h: 200 });
  const tri = (a, b, c) => DG.graph({ nodes: { X: [50, 8], Y: [14, 85], Z: [86, 85] }, edges: [['X', 'Y', a], ['X', 'Z', b], ['Y', 'Z', c]], w: 260, h: 190, legend: true, kind: 'sign' });

  return {
    id: 'net', n: 6, emoji: '🕸️', title: 'Networks', blurb: 'Nodes & paths, centrality, strong/weak ties, triadic closure, balance, small worlds and the Medici.',
    subs: { vocab: 'Graph vocabulary', central: 'Centrality & density', ties: 'Strong & weak ties', triadic: 'Triadic closure & STCP', balance: 'Structural balance', small: 'Small world', medici: 'The Medici' },
    cards: [
      {
        id: 'net-c1', sub: 'vocab', title: 'Graphs: nodes, edges, paths, components',
        html: `<p>Who you are connected to, and where you sit in the web, shapes what you know, what you earn and how much power you have. A <b>graph</b> is a set of <b>nodes</b> (people, firms, countries) with some pairs joined by <b>edges</b> (links).</p>
        <ul><li><b>Path:</b> a sequence of nodes where each is joined to the next. <b>Length</b> = number of edges.</li><li><b>Distance:</b> length of the <i>shortest</i> path (in steps, not km).</li><li><b>Connected:</b> every node can reach every other. A <b>connected component</b> is a group that's internally connected with no edges to the rest.</li></ul>${comps}
        <p class="muted">This network has <b>two</b> components ({A,B,C} and {D,E,F}). Add one edge between them and it becomes one component.</p>`,
        tip: 'Define each term in one line and give a social example (nodes = people, edges = friendships, component = a friend group with no links to another group).',
        check: { type: 'mcq', q: 'In the picture, what is the distance between node A and node C if A–C is a direct edge and A–B–C is also a path?', opts: ['2 (the longer path)', '1 (distance is the shortest path)', '3', 'It cannot be defined'], a: 1, why: 'Distance = length of the SHORTEST path. The direct edge has length 1.' }
      },
      {
        id: 'net-c2', sub: 'central', title: 'Centrality: who matters most?',
        html: `<p>Lecture example: node A is connected to B, C, D, E; C and D are also linked. (5 nodes, 5 edges.)</p>${lec()}
        <table class="t"><tr><th>Measure</th><th>Asks</th><th>How</th><th>A</th></tr>
        <tr><td><b>Degree</b></td><td>How many direct friends?</td><td>Count edges</td><td>4 (B has 1)</td></tr>
        <tr><td><b>Betweenness</b></td><td>How often are you the middle-man?</td><td>For every pair of other nodes, does the shortest path pass through you? Count (n(n−1)/2 pairs in total)</td><td>5 of 10 pairs</td></tr>
        <tr><td><b>Closeness</b></td><td>How quickly can you reach everyone?</td><td>Farness = sum of distances to all others; closeness = 1 / farness</td><td>1/4 = 0.25 (B: 1/7 = 0.143)</td></tr>
        <tr><td><b>Density</b></td><td>How tightly knit is the whole network?</td><td>Actual edges ÷ possible n(n−1)/2</td><td>5/10 = 0.5</td></tr></table>
        <p><b>In words:</b> degree = popularity; betweenness = brokerage power; closeness = how fast information reaches you; density = cohesion of the group. In the WW1 tutorial, Germany and Austria-Hungary scored highest in 1882 and brokered the Triple Alliance.</p>`,
        tip: 'Show a tiny calculation (e.g. "A to B,C,D,E = 1+1+1+1 = farness 4, closeness 0.25") and then say what it MEANS. Interpretation earns the marks.',
        check: { type: 'num', q: 'In the lecture network above, what is the closeness of node B? (Give 1/farness as a decimal.)', ans: 0.143, tol: 0.002, calc: () => closeness(LECe, 'B'), why: 'B is 1 step from A and 2 steps from C, D, E: farness = 1 + 2 + 2 + 2 = 7, closeness = 1/7 ≈ 0.143.', steps: ['d(B,A)=1, d(B,C)=2, d(B,D)=2, d(B,E)=2', 'Farness = 7', 'Closeness = 1/7 = 0.143'] }
      },
      {
        id: 'net-c3', sub: 'ties', title: 'Strong ties, weak ties, and finding a job',
        html: `<p><b>Strong ties</b> = close friends. <b>Weak ties</b> = acquaintances. <b>Granovetter</b>: people more often hear about jobs through <b>weak</b> ties. Close friends move in the same circles and know what you already know; acquaintances connect you to <i>other</i> social worlds and bring new information.</p>
        <p><b>Bridges (deeper):</b> a <b>bridge</b> is an edge whose removal splits a component in two. A <b>local bridge</b> is an edge A–B where A and B have <i>no friends in common</i> (deleting it makes them far apart). The edges that reach far-off parts of the network, carrying new information, are typically weak ties.</p>
        <p><b>Clustering coefficient:</b> the share of a node's friend-pairs who are themselves friends.</p>`,
        tip: 'Don\'t just state Granovetter\'s result; explain WHY (strong ties overlap in information; weak ties are bridges to new clusters).',
        check: { type: 'mcq', q: 'According to Granovetter, why are weak ties especially useful in a job search?', opts: ['Acquaintances are more willing to lend money', 'They link you to other social circles with information your close friends already share with you', 'Weak ties always lead directly to employers', 'They have higher betweenness than strong ties by definition'], a: 1, why: 'Close friends overlap with you in what they know. Weak ties often span different clusters (local bridges), delivering novel information such as job openings.' }
      },
      {
        id: 'net-c4', sub: 'triadic', title: 'Triadic closure & the Strong Triadic Closure Property',
        html: `<p><b>Triadic closure:</b> if B and C share a friend A, it becomes more likely that B and C will become friends, <i>closing the triangle</i>. Networks grow triangles over time. Three reasons:</p>
        <ol><li><b>Opportunity:</b> B and C both spend time with A, so they're likely to meet.</li><li><b>Trust:</b> each trusts A, giving them a basis to trust each other.</li><li><b>Incentive:</b> A gains if B and C get along (it's stressful to have friends who clash), so A brings them together.</li></ol>
        <p><b>Strong Triadic Closure Property (STCP):</b> node A <b>violates</b> it if A has strong ties to both B and C, but there is <b>no edge at all</b> (strong or weak) between B and C.</p>
        <p><b>Method:</b> for each node with ≥ 2 strong ties, check every pair of its strong friends is linked.</p>${g2()}
        <p>Here D has strong ties to E and F, but E–F is missing: <b>D violates STCP</b> (the "missing" link is E–F). A has strong ties to B and C, and B–C is present (weakly), so A is fine.</p>
        <div class="note"><b>Key result (Easley &amp; Kleinberg ch. 3):</b> if a node satisfies STCP and has ≥ 2 strong ties, any local bridge it is part of must be a <b>weak</b> tie. This links the maths to Granovetter.</div>`,
        tip: 'In a "which nodes violate STCP?" graph question: list each node\'s STRONG ties only, check each pair is joined by any line, name the node and the missing pair, and explain in one sentence.',
        check: { type: 'mcq', q: 'In the graph above, which node(s) violate the Strong Triadic Closure Property?', opts: ['A only', 'C only', 'D only (E and F are not linked)', 'A, C and D'], a: 2, why: 'Only D has two strong ties (E, F) whose endpoints are not linked. A\'s strong friends B and C are linked (weak tie is enough). C has just one strong tie (A).' }
      },
      {
        id: 'net-c5', sub: 'balance', title: 'Structural balance: friends and enemies',
        html: `<p>Label each edge <b>+</b> (friend) or <b>−</b> (enemy). A triangle is <b>balanced</b> if it has <b>all three +</b> or <b>exactly one +</b>. It is <b>unbalanced</b> with <b>two +</b> and one − (two friends of mine hate each other) or <b>three −</b> (three mutual enemies: two will team up).</p>
        <table class="t"><tr><th>Signs</th><th>Story</th><th>Balanced?</th></tr><tr><td>+ + +</td><td>everyone friends</td><td>Yes</td></tr><tr><td>+ − −</td><td>two friends share an enemy</td><td>Yes</td></tr><tr><td>+ + −</td><td>my two friends are enemies</td><td>No</td></tr><tr><td>− − −</td><td>mutual enemies</td><td>No</td></tr></table>
        <p><b>Balance theorem (deeper):</b> if every triangle in a complete network is balanced, then either everyone is friends or the network splits into <b>two camps</b>, friendly inside and hostile across.</p>${ww()}
        <p class="muted">WW1 1907: Britain, France, Russia (Triple Entente) vs Germany, Austria-Hungary, Italy (Triple Alliance): two camps, every triangle balanced. Alliances shifted 1872 → 1907 until Europe settled there.</p>`,
        tip: 'Remember: balanced = product of the three signs is positive. (+,+,+) and (+,−,−) are positive; (+,+,−) and (−,−,−) are negative.',
        check: { type: 'mcq', q: 'A triangle has two friendly edges and one hostile edge (+, +, −). It is…', opts: ['balanced, because it has at least one friendship', 'unbalanced: two of my friends are enemies, so pressure builds to change something', 'balanced, because most edges are positive', 'impossible in a real network'], a: 1, why: 'Balanced triangles have 3 positive or exactly 1 positive edge. (+,+,−) is a classic unbalanced case.' }
      },
      {
        id: 'net-c6', sub: 'small', title: 'The small-world phenomenon',
        html: `<p><b>Milgram (1960s):</b> people in the US Midwest forwarded a letter via acquaintances towards a stranger in Boston. The letters that arrived took about <b>six steps</b> ("six degrees of separation", cf. Kevin Bacon). Two lessons: <b>short paths exist</b>, and people can find them using only local knowledge.</p>
        <p><b>Limitation:</b> very high attrition: most letters never arrived, so the average of ~6 comes only from the successful chains and the result is hard to replicate.</p>`,
        tip: 'Always mention both the finding (about six steps) and the caveat (most chains were never completed).',
        check: { type: 'mcq', q: 'What is the main weakness of Milgram\'s small-world experiment?', opts: ['The letters were sent by email', 'Most letter chains were never completed, so the six-step average rests on the successes', 'It only used strong ties', 'It ignored paths of length one'], a: 1, why: 'Attrition: a large share of the letters never reached the target. The ~6 steps comes only from the chains that did arrive.' }
      },
      {
        id: 'net-c7', sub: 'medici', title: 'The Medici: power from network position',
        html: `<p>In 15th-century Florence the Medici were <b>not</b> the richest family (the Strozzi were wealthier), nor the one with the most political seats. Yet Cosimo de' Medici dominated the city. Padgett &amp; Ansell mapped marriage and business ties among elite families:</p>
        <ul><li>The Medici married into old patrician families <i>and</i> did business with "new money" families. Those groups were barely linked to each other, so their ties ran <b>through the Medici</b>.</li><li>The Medici had by far the highest <b>betweenness centrality</b> (roughly double the next family): the network's <b>broker</b>.</li><li>Brokerage meant information, favours and the ability to play groups against each other, while rivals couldn't coordinate without them. The Medici Bank's branches and the Pope as a client extended the reach.</li></ul>
        <p><b>Lesson:</b> power comes from network <i>position</i>, not just wealth or size.</p>
        <div class="note">Not in your slides: from the syllabus podcast (BBC In Our Time, "The Medici") and Jackson's <i>The Human Network</i>.</div>`,
        tip: 'The "role of networks in the rise of …" answer = (1) who they connected, (2) betweenness/broker position, (3) what the position gave them (information, control, coordination of rivals), (4) the lesson.',
        check: { type: 'mcq', q: 'Which network measure best explains the rise of the Medici?', opts: ['Highest degree, by a huge margin', 'Highest betweenness: they brokered links between otherwise disconnected elite groups', 'Highest density of the whole network', 'Fewest strong ties'], a: 1, why: 'They sat between the old patrician and new-money clusters; most connections between the groups passed through them, giving them information and control.' }
      }
    ],
    questions: [
      { id: 'net-q1', sub: 'vocab', skip: true, type: 'num', q: 'In the network below, what is the distance between A and F (number of edges on the shortest path)?', svg: g1, ans: 3, calc: () => dist(adj(G1e), 'A')['F'], why: 'Shortest path A–C–D–F has 3 edges (no shortcut: C–D is the only link between the left and right clusters).', steps: ['A→C (1)', 'C→D (2)', 'D→F (3)'] },
      { id: 'net-q2', sub: 'vocab', skip: true, type: 'mcq', q: 'In the network shown, if the edge C–D is removed, the network…', svg: g1, opts: ['stays connected: every node can still reach every other', 'splits into two connected components ({A,B,C} and {D,E,F})', 'splits into three components', 'loses node D'], a: 1, why: 'C–D is a bridge: its removal separates the left triangle from the right triangle.' },
      { id: 'net-q3', sub: 'central', skip: true, type: 'num', q: 'In the network shown, what is the degree of node D?', svg: g1, ans: 3, calc: () => degree(G1e, 'D'), why: 'D is joined to C, E and F: degree 3.' },
      { id: 'net-q4', sub: 'central', skip: true, type: 'num', q: 'In the network shown, what is the closeness of node C (= 1 / farness; give a decimal).', svg: g1, ans: 0.143, tol: 0.002, calc: () => closeness(G1e, 'C'), why: 'Distances from C: A 1, B 1, D 1, E 2, F 2 → farness 7 → closeness 1/7 ≈ 0.143.', steps: ['d(C,A)=1, d(C,B)=1, d(C,D)=1, d(C,E)=2, d(C,F)=2', 'Farness = 7', 'Closeness = 0.143'] },
      { id: 'net-q5', sub: 'central', skip: true, type: 'num', q: 'In the network shown, what is the betweenness of node C: for how many pairs of OTHER nodes does their shortest path pass through C?', svg: g1, ans: 6, calc: () => between(G1e, 'C'), why: 'Any path from {A, B} to {D, E, F} must go through C: 2 × 3 = 6 pairs. (A–B is direct, and C is not between any other pair.) By symmetry D also scores 6.', steps: ['Left cluster {A,B} × right cluster {D,E,F} = 6 pairs', 'All their shortest paths use C', 'Betweenness(C) = 6'] },
      { id: 'net-q6', sub: 'ties', skip: true, type: 'mcq', q: 'Granovetter\'s "strength of weak ties" says that people most often find jobs through…', opts: ['close friends, who trust them most', 'acquaintances, who bridge to different social circles', 'family members only', 'recruitment agencies only'], a: 1, why: 'Weak ties give access to non-overlapping information; strong ties know the same things you do.' },
      { id: 'net-q7', sub: 'triadic', skip: true, type: 'mcq', q: 'Which of these is NOT one of the three classic reasons for triadic closure?', opts: ['Opportunity: B and C both spend time with A', 'Trust: B and C each trust A', 'Incentive: A benefits if B and C get along', 'Geography: B and C live in the same city as each other'], a: 3, why: 'The three are opportunity, trust and incentive, all working through the common friend A.' },
      { id: 'net-q8', sub: 'triadic', skip: true, type: 'mcq', q: 'Solid lines are strong ties, dashed lines are weak ties. Which node violates Strong Triadic Closure?', svg: () => DG.graph({ nodes: { P: [10, 50], Q: [38, 14], R: [38, 86], S: [70, 50], T: [92, 14], U: [92, 86] }, edges: [['P', 'Q', 's'], ['P', 'R', 's'], ['Q', 'R', 's'], ['P', 'S', 'w'], ['S', 'T', 's'], ['S', 'U', 's'], ['T', 'U', 'w']], w: 420, h: 230, legend: true }), opts: ['P', 'Q', 'S', 'No node violates it'], a: 3, why: 'P has strong ties to Q and R and Q–R exists. S has strong ties to T and U, and T–U exists (weak is enough). Q and R each have strong ties only to P and each other, all linked. So no node violates STCP.' },
      { id: 'net-q9', sub: 'balance', skip: true, type: 'mcq', q: 'Which triangle is UNBALANCED (+ = friends, − = enemies)?', opts: ['+, +, +', '+, −, −', '+, +, −', 'All of them are balanced'], a: 2, why: 'Balanced = three + or exactly one +. Two + and one − means two of my friends are enemies.' },
      { id: 'net-q10', sub: 'medici', skip: true, type: 'mcq', q: 'The Medici dominated Renaissance Florence mainly because…', opts: ['they were the richest family in the city', 'they held the most political offices', 'they sat between otherwise disconnected elite groups, giving them the highest betweenness', 'they were the oldest family'], a: 2, why: 'Padgett & Ansell: the Strozzi were richer, but the Medici were the broker between old patricians and new money.' },
      { id: 'net-q11', sub: 'central', type: 'num', q: 'Using the 6-node network below (A–B, A–C, B–C, C–D, D–E, D–F, E–F), what is the density?', svg: g1, ans: 0.467, tol: 0.003, calc: () => density(G1e, 6), why: '7 edges out of 6 × 5 / 2 = 15 possible: 7/15 ≈ 0.467.', steps: ['Possible edges = 6×5/2 = 15', 'Actual = 7', 'Density = 7/15 = 0.467'] },
      { id: 'net-q12', sub: 'ties', type: 'tf', q: 'True or false (and why): if a node satisfies Strong Triadic Closure and has at least two strong ties, any local bridge it belongs to must be a weak tie.', a: true, why: 'True. A strong local bridge A–B would, together with another strong tie of A, force a triangle with B (STCP), contradicting "no common friends" for a local bridge.' },
      { id: 'net-q13', sub: 'triadic', type: 'tf', q: 'True or false (and why): A has strong ties to B and to C. STCP requires B and C to also be connected by a STRONG tie.', a: false, why: 'False. STCP requires only that B and C have SOME tie (strong or weak). A violation needs no edge at all between B and C.' },
      { id: 'net-q14', sub: 'small', type: 'mcq', q: 'The Milgram experiment suggests about…', opts: ['one degree of separation', 'six steps between random strangers (for the chains that arrived)', 'twenty steps', 'no short paths exist'], a: 1, why: 'Completed chains took about six steps on average: the "six degrees of separation". Most letters never arrived, so interpret with care.' },
      { id: 'net-q15', sub: 'triadic', type: 'num', q: 'Node X has 4 friends. Among the 6 possible pairs of those friends, 3 pairs are themselves friends. What is X\'s clustering coefficient?', ans: 0.5, calc: () => 3 / 6, why: 'Clustering coefficient = linked friend-pairs / possible friend-pairs = 3/6 = 0.5.' },
      { id: 'net-q16', sub: 'balance', type: 'mcq', q: 'If every triangle in a complete signed network is balanced, the balance theorem says the network is…', opts: ['always all friends', 'either all friends or split into two mutually hostile camps', 'split into three camps', 'random'], a: 1, why: 'Balanced complete networks have either everyone friendly or exactly two camps (friends inside, enemies across), like the Triple Entente vs the Triple Alliance.' },
      { id: 'net-q17', sub: 'central', type: 'mcq', q: 'Which measure captures a node\'s brokerage power over information flowing between OTHER nodes?', opts: ['Degree', 'Betweenness', 'Closeness', 'Density'], a: 1, why: 'Betweenness counts how often a node lies on shortest paths between other pairs: the go-between. (Density is a property of the whole network, not a node.)' }
    ],
    boss: {
      title: 'The Network Boss', minutes: 36,
      briefing: 'A 30-mark question: explanation of theory, a labelled-graph STCP problem, and a structural-balance application.',
      questions: [{
        id: 'net-b1', title: 'Question: Networks',
        parts: [
          {
            label: 'a', marks: 10, q: 'Explain Granovetter\'s "strength of weak ties" argument. How does the Strong Triadic Closure Property link to it?',
            model: '<ul><li><b>Definitions:</b> strong tie = close friend; weak tie = acquaintance.</li><li><b>Granovetter\'s finding:</b> jobs more often come via weak ties. Strong ties overlap in what they know (friends of friends are friends); weak ties connect you to <i>other</i> clusters with new information.</li><li><b>Bridges:</b> a local bridge joins two people with no common friends; deleting it makes them far apart. Such edges carry information across clusters.</li><li><b>STCP:</b> if A has strong ties to B and C, then B and C must be linked (strong or weak). Reason: triadic closure through opportunity, trust, incentive.</li><li><b>Link:</b> if every node satisfies STCP (with ≥ 2 strong ties), a local bridge can\'t be strong: a strong local bridge A–B would, with another strong tie A–C, force a B–C edge, so A and B would have a common friend. Hence local bridges are weak, and so the edges bringing in new information are weak ties.</li></ul>',
            rubric: [['Defines strong vs weak ties', 1], ['Granovetter: jobs via weak ties and why (new information)', 3], ['Bridge / local bridge explained', 2], ['STCP stated correctly', 2], ['Link: local bridges must be weak under STCP', 2]]
          },
          {
            label: 'b', marks: 12, q: 'In the network below, solid edges are strong ties and dashed edges are weak ties. (i) Which nodes violate the Strong Triadic Closure Property? Explain, naming the missing edges. (ii) Which single edges could be added so that no node violates STCP? (iii) Which edge connects the {A, B, C} cluster to the rest, what type of tie is it, and what does this tell you about information flow?',
            svg: gH,
            model: '<ul><li><b>(i)</b> <b>D</b> has strong ties to E and F, but E–F is missing → violation. <b>F</b> has strong ties to D and G, but D–G is missing → violation. A is fine (strong ties B and C are linked by a weak tie). E and G have only one strong tie each.</li><li><b>(ii)</b> Add <b>E–F</b> (any tie) to fix D, and <b>D–G</b> to fix F. (Adding D–G creates new strong-pair checks: D would then have strong ties E, F and, if D–G is strong, G; keep it weak so no new violation arises.)</li><li><b>(iii)</b> <b>A–D</b> is the only link between the left cluster and the rest: a bridge, and a <b>weak</b> tie. It carries all information between the two clusters; so people in {A,B,C} get news from the other side only through this acquaintance link (Granovetter), and A and D have high betweenness.</li></ul>',
            rubric: [['Method: only strong ties are checked; every pair of strong friends', 2], ['Identifies D and its missing pair E–F', 2], ['Identifies F and its missing pair D–G', 2], ['Does not wrongly flag A', 1], ['Suggests valid added edges (E–F, D–G)', 2], ['Identifies A–D as a weak bridge and explains its information role', 3]]
          },
          {
            label: 'c', marks: 8, q: 'Explain structural balance using the alliances of Europe before WW1 (1907) as an illustration.',
            svg: ww,
            model: '<ul><li><b>Setup:</b> edges are friends (+) or enemies (−). A triangle is balanced if all three edges are + or exactly one is + (my friends share an enemy or we are all friends). Unbalanced: (+,+,−) and (−,−,−).</li><li><b>WW1:</b> by 1907 the network had two camps: Britain, France, Russia (Triple Entente) vs Germany, Austria-Hungary, Italy (Triple Alliance). Within each camp the triangles are (+,+,+); across camps, triangles are (+,−,−): all balanced.</li><li><b>Balance theorem:</b> a complete network with all triangles balanced is either all friends or splits into two hostile camps. Earlier periods (1872–1890) contained unbalanced triangles; alliance shifts (e.g. German–Russian lapse in 1890, Entente Cordiale 1904, British–Russian alliance 1907) resolved the tension until the system settled in two blocs.</li></ul>',
            rubric: [['Defines +/− edges and balanced triangles (3 + or 1 +)', 2], ['Names unbalanced types and why they are unstable', 2], ['Applies to WW1: two camps, who is in each', 2], ['States balance theorem / two-camp result', 2]]
          }
        ]
      }]
    }
  };
})());
