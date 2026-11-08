TOPICS.push((() => {
  // Monopoly diagram: D: P=a-Q, MR=a-2Q, constant MC=c. Shows CS (blue), profit (amber), DWL (red).
  const mono = (a, c, o) => {
    o = o || {}; const qm = (a - c) / 2, pm = a - qm, qc = a - c;
    return DG.chart({
      xmax: a * 1.05, ymax: a * 1.08, xlabel: 'Quantity', ylabel: 'Price', alt: 'monopoly diagram',
      polys: [{ p: [[0, a], [0, pm], [qm, pm]], c: 0, label: 'CS', lx: qm * 0.3, ly: pm + (a - pm) * 0.3 }, { p: [[0, pm], [qm, pm], [qm, c], [0, c]], c: 1, label: 'Profit', lx: qm / 2, ly: (pm + c) / 2 }, { p: [[qm, pm], [qm, c], [qc, c]], c: 2, label: 'DWL', lx: qm + (qc - qm) * 0.25, ly: c + (pm - c) * 0.25 }],
      lines: [{ p: [[0, a], [a, 0]], label: 'D', c: 0, lx: a * 0.93, ly: a * 0.1 }, { p: [[0, a], [a / 2, 0]], label: 'MR', c: 3, lx: a / 2, ly: a * 0.04 }, { p: [[0, c], [a, c]], label: 'MC', c: 2, lx: a, ly: c, anchor: 'end' }],
      pts: [{ x: qm, y: pm, label: 'Em', xt: 'Qm', yt: 'Pm' }, { x: qc, y: c, label: 'Ec', xt: 'Qc', yt: 'Pc = MC', g: 'x', dx: 7, dy: -7 }].concat(o.extra || [])
    });
  };
  const cartel = () => {
    const pts = (fn, a, b, n) => { const r = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; r.push([x, fn(x)]); } return r; };
    return DG.chart({ xmax: 10, ymax: 12, w: 330, h: 300, xlabel: 'Market quantity', ylabel: 'Price', alt: 'cartel market', lines: [{ p: [[0, 11], [10, 1]], label: 'D', c: 0, lx: 9.5, ly: 1.7 }, { p: [[0, 11], [5.5, 0]], label: 'MR', c: 3, lx: 5.5, ly: 0.4 }, { p: [[0, 1], [10, 11]], label: 'S = ΣMC', c: 2, lx: 9.3, ly: 10.7 }], pts: [{ x: 5, y: 6, label: 'ec', xt: 'Qc', yt: 'pc', g: 'xy' }, { x: 3.3, y: 7.7, label: 'em', xt: 'Qm', yt: 'pm' }] })
      + DG.chart({ xmax: 10, ymax: 12, w: 330, h: 300, xlabel: 'One member\'s output', ylabel: 'Price / cost', alt: 'cartel member', lines: [{ p: pts(q => 1.5 + 0.05 * q * q + 0.5 * q, 0.2, 9.5, 30), label: 'MC', c: 2, lx: 9.5, ly: 10.9 }, { p: [[0, 6], [10, 6]], label: 'pc', c: 4, dash: true, lx: 10, ly: 6, anchor: 'end' }, { p: [[0, 7.7], [10, 7.7]], label: 'pm', c: 3, dash: true, lx: 10, ly: 7.7, anchor: 'end' }], pts: [{ x: 3.3, y: 7.7, label: '', xt: 'qm', g: 'x' }, { x: 5.1, y: 7.7, label: 'q*', xt: 'q*', g: 'x' }] });
  };

  return {
    id: 'imp', n: 5, emoji: '🏭', title: 'Imperfect Competition', blurb: 'Monopoly, welfare loss, HHI, monopolistic competition, oligopoly, cartels and OPEC.',
    subs: { mono: 'Monopoly: conditions & MR < P', welfare: 'Monopoly vs competition (CS, DWL)', hhi: 'Measuring concentration (HHI)', mc: 'Monopolistic competition', oligo: 'Oligopoly, Cournot & Bertrand', cartel: 'Cartels & OPEC' },
    cards: [
      {
        id: 'imp-c1', sub: 'mono', title: 'Monopoly: one seller who sets the price',
        html: `<p>Once a firm can influence its price, it produces <b>less</b> and charges <b>more</b> than a competitive market would. Market structures, most to least competitive: <b>perfect competition → monopolistic competition → oligopoly → monopoly</b>.</p>
        <p><b>Key conditions for a monopoly:</b></p><ol><li><b>One supplier</b> of the good.</li><li><b>Price maker</b>: faces the whole downward-sloping market demand curve.</li><li><b>Barriers to entry</b>: patents, licences, control of a key resource, huge set-up costs, network effects.</li><li><b>No close substitutes</b>.</li></ol>
        <div class="ex"><b>Natural monopoly:</b> economies of scale so large that one firm supplies the whole market more cheaply than two (water pipes, electricity grid, rail track). <b>Industrial monopoly:</b> power built through patents, acquisitions or licences (De Beers diamonds, Google Search, Microsoft).</div>`,
        tip: '"Using a suitable example, discuss the key conditions for a market to be a monopoly": give the four conditions, then tie EACH one to one real example (e.g. Irish Water pipes: single supplier, barrier = huge cost, no substitute for piped water).',
        check: { type: 'mcq', q: 'Which feature is most essential for a monopoly to KEEP earning above-normal profit in the long run?', opts: ['Many close substitutes', 'Barriers to entry', 'Free entry and exit', 'Zero fixed costs'], a: 1, why: 'Without barriers, profit attracts entrants and the monopoly disappears. Patents, licences, resource control, big sunk costs or network effects keep rivals out.' }
      },
      {
        id: 'imp-c2', sub: 'mono', title: 'Why MR is below price',
        html: `<p>A perfectly competitive firm sells every unit at the same market price, so MR = P. A monopolist faces the <b>whole</b> demand curve: to sell one more unit it must <b>cut the price on all units</b>. So <b>MR &lt; P</b>.</p>
        <div class="formula">Linear demand P = a − bQ  →  MR = a − 2bQ  (same intercept, twice as steep)</div>
        <p>The monopolist still follows the universal rule <b>MR = MC</b>, then reads the price off the <b>demand curve</b>. Example: D: P = 12 − Q → MR = 12 − 2Q. With MC = 2: 12 − 2Q = 2 → <b>Qm = 5</b>, Pm = 12 − 5 = <b>7</b> (not 2!). A competitive market would have P = MC = 2 and Qc = 10.</p>${mono(12, 2)}
        <p class="muted">Reading the diagram: blue = consumer surplus left, amber = monopoly profit (rectangle between Pm and MC up to Qm), red = deadweight loss.</p>
        <div class="note"><b>Deeper:</b> a monopolist never operates on the <i>inelastic</i> part of demand. There MR is negative: raising price would raise revenue <i>and</i> cut costs. It always ends up where demand is elastic (|e| &gt; 1). A monopolist also has no supply curve: output depends on the shape of demand.</div>`,
        tip: 'Method for ANY monopoly number question: (1) MR from demand, (2) MR = MC → Q, (3) put Q into DEMAND for price, (4) profit = (P − AC) × Q.',
        check: { type: 'num', q: 'A monopolist faces P = 50 − Q and has constant MC = 10. What price does it charge?', ans: 30, calc: () => { const Q = (50 - 10) / 2; return 50 - Q; }, why: 'MR = 50 − 2Q = 10 → Q = 20. Price from demand: P = 50 − 20 = 30.', steps: ['MR = 50 − 2Q', 'MR = MC: 50 − 2Q = 10 → Q = 20', 'P = 50 − 20 = 30 (read from demand, not from MC)'] }
      },
      {
        id: 'imp-c3', sub: 'welfare', title: 'Monopoly vs competition: surplus and DWL',
        html: `<p>This is a classic 10–20 mark answer. Compare the two market structures on the SAME demand and cost curves (the diagram above).</p>
        <table class="t"><tr><th></th><th>Perfect competition</th><th>Monopoly</th></tr><tr><td>Rule</td><td>P = MC</td><td>MR = MC, P &gt; MC</td></tr><tr><td>Quantity</td><td>Qc = 10</td><td>Qm = 5 (lower)</td></tr><tr><td>Price</td><td>Pc = 2</td><td>Pm = 7 (higher)</td></tr><tr><td>Consumer surplus</td><td>½ × 10 × 10 = 50</td><td>½ × 5 × 5 = 12.5</td></tr><tr><td>Profit / producer surplus</td><td>0 (constant MC)</td><td>5 × 5 = 25</td></tr><tr><td>Deadweight loss</td><td>0</td><td>½ × 5 × 5 = 12.5</td></tr></table>
        <p>Check: 50 = 12.5 + 25 + 12.5. Consumers lose 37.5: <b>25 is transferred to the firm</b> as profit and <b>12.5 is destroyed</b> (DWL). That's the market failure: units worth more to buyers than they cost to make go unproduced.</p>
        <p><b>Structure of a full-marks answer:</b> define CS → draw PC diagram and shade CS → draw monopoly diagram (D, MR, MC, Qm, Pm, Qc) and shade the smaller CS → say what happened to the lost surplus (transfer + DWL) → conclude monopoly is inefficient (P &gt; MC).</p>`,
        tip: 'Always say WHERE the lost consumer surplus went: part becomes monopoly profit (a transfer), part is deadweight loss (gone for everyone).',
        check: { type: 'num', q: 'Demand P = 40 − Q, constant MC = 10. Compute the monopoly deadweight loss.', ans: 112.5, calc: () => { const qm = 15, pm = 25, qc = 30; return 0.5 * (qc - qm) * (pm - 10); }, why: 'Monopoly: MR = 40 − 2Q = 10 → Qm = 15, Pm = 25. Competition: Qc = 30. DWL = ½ × (Qc − Qm) × (Pm − MC) = ½ × 15 × 15 = 112.5.', steps: ['Qm = 15, Pm = 25 (MR = MC)', 'Qc = 30 (P = MC)', 'DWL = ½ × 15 × 15 = 112.5'] }
      },
      {
        id: 'imp-c4', sub: 'hhi', title: 'Measuring concentration: HHI',
        html: `<div class="formula">HHI = s₁² + s₂² + … + sₙ²   (shares as decimals)</div>
        <ul><li>10 equal firms: 10 × 0.1² = <b>0.10</b>. Monopoly: 1² = <b>1</b>. Perfect competition → close to 0.</li><li>Squaring gives big firms extra weight. Two markets can both have a 4-firm share of 80% but different HHIs: (0.2, 0.2, 0.2, 0.2) → 0.16, but (0.65, 0.05, 0.05, 0.05) → 0.43.</li></ul>
        <div class="note">Often quoted in percentage units (0 to 10,000). A market over about 1,800 is "highly concentrated" under US merger guidelines. Regulators look hard at mergers that push HHI up sharply.</div>`,
        tip: 'A merger of two firms with shares a and b raises HHI by 2ab (decimals). Quick check for merger questions.',
        check: { type: 'num', q: 'Four firms have market shares 40%, 30%, 20% and 10%. What is the HHI (as a decimal)?', ans: 0.3, calc: () => 0.16 + 0.09 + 0.04 + 0.01, why: '0.4² + 0.3² + 0.2² + 0.1² = 0.16 + 0.09 + 0.04 + 0.01 = 0.30.', steps: ['0.40² = 0.16', '0.30² = 0.09', '0.20² = 0.04, 0.10² = 0.01', 'Sum = 0.30'] }
      },
      {
        id: 'imp-c5', sub: 'mc', title: 'Monopolistic competition',
        html: `<p><b>Many firms, differentiated products, free entry</b>: restaurants, cafés, hairdressers, shoe shops. Each firm faces its <i>own</i> downward-sloping (fairly elastic) demand.</p>
        <ul><li><b>Short run:</b> an attractive firm sets MR = MC like a mini-monopolist and earns profit.</li><li><b>Long run:</b> profit attracts entrants; each firm's demand shifts left until <b>profit = 0 (P = AC)</b>.</li><li><b>Not efficient</b> in either run: P &gt; MC and output is left of minimum AC (<b>excess capacity</b>). The trade-off is <b>variety</b>.</li><li><b>Limiting entry:</b> branding, advertising, loyalty schemes, prime locations, patents and secret recipes.</li></ul>
        <div class="ex">Dublin pizza: dozens of places, each different enough to charge a bit above cost. A new fancy pizzeria earns profit at first, then more open and the queue shrinks until profits vanish.</div>`,
        tip: 'Contrast table for the exam: PC (identical, P = MC, min AC) | Mono. comp. (differentiated, P > MC, excess capacity, zero LR profit) | Oligopoly (few firms, interdependence) | Monopoly (one firm, barriers).',
        check: { type: 'mcq', q: 'In the LONG run, a typical monopolistically competitive firm…', opts: ['earns positive economic profit because of product differentiation', 'earns zero economic profit and has excess capacity (P = AC, P > MC)', 'produces at minimum AC with P = MC', 'is a price taker'], a: 1, why: 'Free entry removes profit (P = AC), but differentiation means a downward-sloping demand so P > MC and the firm operates left of minimum AC.' }
      },
      {
        id: 'imp-c6', sub: 'oligo', title: 'Oligopoly: a few firms who watch each other',
        html: `<p><b>A few firms, limited entry</b>: Ryanair vs easyJet, Apple vs Samsung, Coke vs Pepsi, the Big Four auditors. Each firm's best move depends on its rivals (game theory next level!).</p>
        <ul><li><b>Collusion / cartel:</b> firms jointly fix price and output and act like one monopoly. Illegal in the EU, US, China, India.</li><li><b>Tacit collusion:</b> behave as if they had agreed, with no communication (petrol stations matching prices).</li><li><b>Cournot</b> = compete on quantity: price and quantity land between monopoly and perfect competition; more firms → closer to competition.</li><li><b>Bertrand</b> = compete on price with identical products: undercutting until <b>P = MC</b>. Two firms are enough for the competitive price (the "Bertrand paradox"). Real firms escape via differentiation, capacity limits or tacit collusion.</li></ul>
        <div class="note">Your slide only names Cournot and Bertrand; the predictions are the standard textbook ones.</div>`,
        tip: 'Oligopoly questions usually end in "…which is why we need game theory". Mention that the outcome depends on rivals\' reactions.',
        check: { type: 'mcq', q: 'Two firms sell identical products and compete by setting prices (Bertrand). What is the predicted equilibrium price?', opts: ['The monopoly price', 'Marginal cost', 'Halfway between monopoly price and MC', 'Zero'], a: 1, why: 'Each firm can steal the whole market by undercutting, so prices are driven down to P = MC. This is the Bertrand paradox: two firms suffice for competitive pricing.' }
      },
      {
        id: 'imp-c7', sub: 'cartel', title: 'Cartels and OPEC',
        html: `<p>A cartel acts like one monopolist: it picks the market quantity where <b>MR = MC</b> (Qm, pm) instead of the competitive Qc, pc. In the diagram each member must cut back from qc to its <b>quota qm</b> but now receives the higher price pm.</p>${cartel()}
        <p><b>Incentive to cheat:</b> at pm, a member's own MC curve says it would like to produce <b>q*</b> where pm = MC. Every unit between qm and q* sells for more than it costs. If everyone cheats, output rises, price falls, and the cartel collapses. It's a <b>prisoner's dilemma</b>.</p>
        <p><b>OPEC:</b> 12 members produce ~40% of world oil (OPEC+ ~50%) with monthly quotas. Saudi Arabia is the biggest producer and enforcer; it can flood the market to punish cheaters. Short-run oil demand is <b>inelastic</b>, so small output cuts produce large price rises, which makes the cartel worth keeping together.</p>
        <p class="muted">Your tutorial slide (Tutorial Topic 3, slide 2):</p><img class="slide" src="img/t3-tutorial-cartel.png" alt="Slide: perfect competition versus a cartel">`,
        tip: 'The "why cartels collapse" answer = P > MC for every member → each gains by secretly producing more → prisoner\'s dilemma. Repeated play (tit-for-tat punishment) explains why some hold.',
        check: { type: 'mcq', q: 'Why does OPEC succeed in raising revenue by cutting output (in the short run)?', opts: ['Oil demand is inelastic, so the price rises by more than quantity falls', 'Oil demand is perfectly elastic', 'Supply is perfectly elastic', 'OPEC members have no marginal cost'], a: 0, why: 'Inelastic demand: %ΔQ < %ΔP, so total revenue rises when quantity is cut and price jumps. That is why restricting output is profitable.' }
      }
    ],
    questions: [
      { id: 'imp-q1', sub: 'mono', skip: true, type: 'mcq', q: 'Which of the following is NOT one of the standard conditions for a monopoly?', opts: ['A single seller', 'Barriers to entry', 'Many close substitutes available', 'Price-making power'], a: 2, why: 'If many close substitutes exist, buyers can switch and the seller has little market power. A monopoly sells a product with no close substitutes.' },
      { id: 'imp-q2', sub: 'mono', skip: true, type: 'mcq', q: 'A water utility with one set of pipes serves a whole city more cheaply than two competing networks could. This is an example of…', opts: ['an industrial monopoly built on a patent', 'a natural monopoly', 'monopolistic competition', 'a cartel'], a: 1, why: 'Huge economies of scale (fixed network cost) make one supplier cheapest: a natural monopoly (like electricity grids and rail track).' },
      { id: 'imp-q3', sub: 'mono', skip: true, type: 'mcq', q: 'Why is a monopolist\'s marginal revenue below its price?', opts: ['Because its costs are rising', 'Because to sell an extra unit it must lower the price on all units sold', 'Because it faces a horizontal demand curve', 'Because the government regulates its price'], a: 1, why: 'Facing the downward-sloping market demand, selling more requires a lower price on every unit, so the extra revenue (MR) is less than the price.' },
      { id: 'imp-q4', sub: 'mono', skip: true, type: 'num', q: 'A monopolist faces demand P = 100 − 2Q. What is marginal revenue when Q = 10?', ans: 60, calc: () => 100 - 4 * 10, why: 'MR has the same intercept and twice the slope: MR = 100 − 4Q = 100 − 40 = 60 (compare P = 80 at Q = 10).', steps: ['P = 100 − 2Q → TR = 100Q − 2Q²', 'MR = dTR/dQ = 100 − 4Q', 'At Q = 10: 60'] },
      { id: 'imp-q5', sub: 'mono', skip: true, type: 'num', q: 'Demand is P = 60 − Q and MC is a constant €12. What price does the profit-maximising monopolist charge (€)?', ans: 36, calc: () => 60 - (60 - 12) / 2, why: 'MR = 60 − 2Q = 12 → Q = 24. Price from demand: 60 − 24 = 36.', steps: ['MR = 60 − 2Q', 'MR = MC → Q = 24', 'P = 60 − 24 = 36'] },
      { id: 'imp-q6', sub: 'welfare', skip: true, type: 'num', q: 'Same market (P = 60 − Q, MC = 12). Calculate the monopoly deadweight loss (€).', ans: 288, calc: () => 0.5 * ((60 - 12) - 24) * (36 - 12), why: 'Competitive Qc: P = MC → 60 − Q = 12 → 48. Monopoly Qm = 24, Pm = 36. DWL = ½ × (48 − 24) × (36 − 12) = ½ × 24 × 24 = 288.', steps: ['Qc = 48, Qm = 24', 'Height = Pm − MC = 24', 'DWL = ½ × 24 × 24 = 288'] },
      { id: 'imp-q7', sub: 'welfare', skip: true, type: 'mcq', q: 'Compared with perfect competition (same costs), a monopoly…', opts: ['produces more at a lower price', 'produces less at a higher price, with a deadweight loss', 'produces the same quantity at a higher price', 'produces less at a lower price'], a: 1, why: 'Setting MR = MC (not P = MC) restricts output, raising price above MC. Part of lost consumer surplus becomes profit, part is DWL.' },
      { id: 'imp-q8', sub: 'hhi', skip: true, type: 'num', q: 'A market has four firms with shares 40%, 30%, 20%, 10%. Their HHI (decimal) is…', ans: 0.3, calc: () => 0.4 ** 2 + 0.3 ** 2 + 0.2 ** 2 + 0.1 ** 2, why: '0.16 + 0.09 + 0.04 + 0.01 = 0.30.', steps: ['Square each share and add'] },
      { id: 'imp-q9', sub: 'mc', skip: true, type: 'mcq', q: 'Which statement about long-run monopolistic competition is TRUE?', opts: ['Firms earn positive profit because products are differentiated', 'Firms earn zero economic profit but operate with excess capacity', 'Firms produce at minimum average cost', 'There is a single seller'], a: 1, why: 'Free entry competes profits away (P = AC), but downward-sloping demand means P > MC and output below the efficient scale.' },
      { id: 'imp-q10', sub: 'cartel', skip: true, type: 'mcq', q: 'The main reason cartels tend to break down is that…', opts: ['demand for their product is perfectly elastic', 'at the cartel price P > MC, so each member gains by secretly producing more', 'governments always subsidise cartels', 'costs rise when firms cooperate'], a: 1, why: 'Each member is tempted to exceed its quota (extra units sell above MC). If all cheat, output rises, price falls and the cartel collapses: a prisoner\'s dilemma.' },
      { id: 'imp-q11', sub: 'mono', type: 'tf', q: 'True or false (and why): a monopolist always earns positive economic profit.', a: false, why: 'False. A monopoly can make losses if demand is so weak (or fixed costs so high) that price never reaches average cost. Market power gives the ability to set price, not a guaranteed profit.' },
      { id: 'imp-q12', sub: 'oligo', type: 'mcq', q: 'In a Bertrand model with identical goods and constant marginal cost, two firms setting prices will end up charging…', opts: ['the monopoly price', 'P = MC', 'above P = MC but below monopoly', 'whatever their costs are, plus 50%'], a: 1, why: 'Undercutting a rival by a cent captures the whole market, so each keeps undercutting until P = MC.' },
      { id: 'imp-q13', sub: 'hhi', type: 'num', q: 'Five firms have shares 25%, 25%, 20%, 20%, 10%. The two 20% firms merge. By how much does HHI (decimal) rise?', ans: 0.08, calc: () => 2 * 0.2 * 0.2, why: 'Merger of shares a and b raises HHI by 2ab = 2 × 0.2 × 0.2 = 0.08 (0.215 → 0.295).', steps: ['Before: 2×0.0625 + 2×0.04 + 0.01 = 0.215', 'After: 2×0.0625 + 0.4² + 0.01 = 0.295', 'Increase = 0.08'] },
      { id: 'imp-q14', sub: 'mono', type: 'mcq', q: 'A monopolist is producing where demand is inelastic (|e| < 1). It should…', opts: ['raise price: revenue rises and cost falls as quantity falls', 'cut price: revenue rises', 'stay put: it is already profit-maximising', 'shut down'], a: 0, why: 'Where demand is inelastic MR < 0: raising price raises revenue while producing less lowers cost, so profit rises. A monopolist therefore always operates on the elastic part of demand.' },
      { id: 'imp-q15', sub: 'cartel', type: 'tf', q: 'True or false (and why): OPEC\'s output cuts can raise its members\' revenue because short-run oil demand is inelastic.', a: true, why: 'True. With inelastic demand, price rises by a larger percentage than quantity falls, so total revenue P × Q increases.' },
      { id: 'imp-q16', sub: 'mc', type: 'mcq', q: 'Which of these is closest to monopolistic competition?', opts: ['Wheat farming', 'Dublin cafés and restaurants', 'Irish Water', 'Airbus and Boeing'], a: 1, why: 'Many sellers, differentiated products, free entry. Wheat = perfect competition; Irish Water = natural monopoly; Airbus/Boeing = oligopoly.' }
    ],
    boss: {
      title: 'The Market Power Boss', minutes: 36,
      briefing: 'A 30-mark question mixing a definition + example, a diagram explanation, and a numerical monopoly problem.',
      questions: [{
        id: 'imp-b1', title: 'Question: Imperfect competition',
        parts: [
          {
            label: 'a', marks: 8, q: 'Using a suitable example, discuss the key characteristics of an oligopoly and explain why oligopolists often struggle to keep a cartel together.',
            model: '<ul><li><b>Characteristics:</b> a few large firms; barriers to entry (scale, brands, regulation); products identical or differentiated; <b>strategic interdependence</b>: each firm\'s best price/output depends on rivals\' reactions.</li><li><b>Example:</b> the Big Four audit firms (or Ryanair/easyJet, Coke/Pepsi).</li><li><b>Cartel:</b> firms agree on prices/quotas to act as one monopoly (illegal in EU/US; OPEC is the real-world case).</li><li><b>Why it collapses:</b> at the cartel price P &gt; MC, so each member gains by secretly overproducing; if all do, output rises and price falls; a prisoner\'s dilemma. Cartels survive only with monitoring, punishment (e.g. Saudi flooding) or repeated-game incentives.</li></ul>',
            rubric: [['Few firms + barriers to entry', 2], ['Interdependence / reaction of rivals', 1], ['Relevant example (named, applied)', 2], ['Cartel definition (joint price/quota, acts like monopoly)', 1], ['Incentive to cheat explained (P > MC → produce more)', 2]]
          },
          {
            label: 'b', marks: 12, q: 'A monopolist faces demand P = 90 − Q and has constant marginal cost €30 (no fixed cost). (i) Find its profit-maximising quantity, price and profit. (ii) Compare consumer surplus with perfect competition and calculate the deadweight loss. Illustrate with a diagram.',
            model: '<ul><li><b>MR:</b> 90 − 2Q. <b>MR = MC:</b> 90 − 2Q = 30 → <b>Qm = 30</b>; <b>Pm = 90 − 30 = 60</b>. <b>Profit</b> = (60 − 30) × 30 = <b>€900</b>.</li><li><b>Competition:</b> P = MC → 90 − Q = 30 → Qc = 60, Pc = 30. CS<sub>PC</sub> = ½ × 60 × 60 = <b>1800</b>. CS<sub>monopoly</sub> = ½ × 30 × 30 = <b>450</b>.</li><li>Consumers lose 1350: <b>900 is transferred</b> to the firm as profit, <b>450 is DWL</b> = ½ × (60 − 30) × (60 − 30).</li><li>Diagram: D, MR, flat MC at 30; Qm, Pm, Qc; shade CS, profit rectangle, DWL triangle.</li></ul>',
            mdg: () => mono(90, 30),
            rubric: [['MR = 90 − 2Q (correct derivation)', 2], ['Qm = 30, Pm = 60', 3], ['Profit = 900', 1], ['CS under competition 1800 and monopoly 450', 2], ['DWL = 450 (and transfer 900)', 2], ['Labelled diagram: D, MR, MC, Qm, Pm, Qc', 2]]
          },
          {
            label: 'c', marks: 10, q: 'Use a diagram of a market and of one member firm to explain OPEC\'s incentive to cheat on its quota.',
            model: '<ul><li><b>Market (left):</b> competitive outcome ec (Qc, pc) where S = ΣMC meets D. A cartel acts like a monopolist: MR = MC gives Qm &lt; Qc at higher price pm.</li><li><b>Member firm (right):</b> must cut from qc to quota qm but now gets price pm.</li><li>At pm the member\'s own MC says produce q* where pm = MC. Units between qm and q* earn pm &gt; MC, so each member gains by exceeding its quota.</li><li>If all cheat, total output rises, price falls back towards pc: cartel collapses (prisoner\'s dilemma). Saudi Arabia punishes cheaters by flooding the market; OPEC survives partly because oil demand is inelastic and play is repeated.</li></ul>',
            mdg: cartel,
            rubric: [['Market diagram: D, MR, S/MC, Qm, pm vs Qc, pc', 3], ['Firm diagram: quota qm, price pm, q* where pm = MC', 3], ['Explains gain from extra units (pm > MC)', 2], ['Everyone cheats → price falls → cartel collapses / prisoner\'s dilemma', 2]]
          }
        ]
      }]
    }
  };
})());
