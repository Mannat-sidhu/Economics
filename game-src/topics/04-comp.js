TOPICS.push((() => {
  // ---- shared diagram pieces (cost curves: VC=q^3-6q^2+14q, FC=8) ----
  const pts = (fn, a, b, n) => { const o = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; o.push([x, fn(x)]); } return o; };
  const MC = q => 3 * q * q - 12 * q + 14, AVC = q => q * q - 6 * q + 14, AC = q => AVC(q) + 8 / q;
  const firm = (prices, extra) => DG.chart({
    xmax: 5, ymax: 20, xlabel: 'Quantity (firm)', ylabel: 'Price / cost (€)', alt: 'firm cost curves',
    lines: [{ p: pts(MC, 0.3, 4.4, 40), label: 'MC', c: 2, lx: 4.4, ly: 19.3 }, { p: pts(AC, 1.0, 4.9, 40), label: 'AC', c: 0, lx: 4.9, ly: AC(4.9) }].concat(prices.map(p => ({ p: [[0, p[0]], [5, p[0]]], label: p[1], c: p[2], lx: 5, ly: p[0], anchor: 'end', dash: true }))),
    pts: extra || []
  });
  const market = (d2, lbl) => DG.chart({
    xmax: 10, ymax: 18, xlabel: 'Quantity (market)', ylabel: 'Price (€)', alt: 'market supply and demand',
    lines: [{ p: [[0, 2.5], [9, 11.5]], label: 'S', c: 1 }, { p: [[0, 12.5], [10, 2.5]], label: 'D1', c: 0, lx: 9.6, ly: 2.9 }].concat(d2 ? [{ p: [[0.5, 17], [10, 7.5]], label: 'D2', c: 3, lx: 9.8, ly: 7.9 }] : []),
    pts: d2 ? [{ x: 5, y: 7.5, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 7.5, y: 10, label: 'E2', xt: 'Q2', yt: 'P2' }] : [{ x: 5, y: 7.5, label: 'E', xt: 'Q*', yt: 'P*' }]
  });
  const csps = () => DG.chart({
    xmax: 12, ymax: 13, xlabel: 'Quantity', ylabel: 'Price (€)', alt: 'consumer and producer surplus',
    polys: [{ p: [[0, 12], [0, 7], [5, 7]], c: 0, label: 'CS', lx: 1.6, ly: 8.6 }, { p: [[0, 2], [0, 7], [5, 7]], c: 1, label: 'PS', lx: 1.6, ly: 5.4 }],
    lines: [{ p: [[0, 12], [12, 0]], label: 'D', c: 0, lx: 11.3, ly: 0.9 }, { p: [[0, 2], [10, 12]], label: 'S', c: 1, lx: 9.5, ly: 11.6 }],
    pts: [{ x: 5, y: 7, label: 'E', xt: 'Q*', yt: 'P*' }]
  });
  const capD = () => DG.chart({
    xmax: 12, ymax: 14, xlabel: 'Number of rides', ylabel: 'Fare (€)', alt: 'licence cap diagram',
    polys: [{ p: [[0, 12], [0, 8], [4, 8]], c: 0, label: 'A', lx: 1.0, ly: 9.7 }, { p: [[0, 8], [4, 8], [4, 5], [0, 5]], c: 3, label: 'B', lx: 2, ly: 6.4 }, { p: [[4, 8], [4, 5], [7, 5]], c: 2, label: 'C', lx: 4.5, ly: 5.9 }],
    lines: [{ p: [[0, 12], [12, 0]], label: 'D', c: 0, lx: 11.3, ly: 0.9 }, { p: [[0, 5], [12, 5]], label: 'S1 (no cap)', c: 1, lx: 12, ly: 5, anchor: 'end' }, { p: [[4, 0], [4, 13]], label: 'S2 (cap)', c: 2, lx: 4, ly: 13.2 }],
    pts: [{ x: 7, y: 5, label: 'E1', xt: 'Q1', yt: 'p1' }, { x: 4, y: 8, label: 'E2', xt: 'Q2', yt: 'p2' }]
  });
  const marketFall = () => DG.chart({
    xmax: 10, ymax: 18, xlabel: 'Quantity (market)', ylabel: 'Price (€)', alt: 'demand falls',
    lines: [{ p: [[0, 2.5], [9, 11.5]], label: 'S', c: 1 }, { p: [[0.5, 17], [10, 7.5]], label: 'D1', c: 0, lx: 9.8, ly: 7.9 }, { p: [[0, 12.5], [10, 2.5]], label: 'D2', c: 2, lx: 9.6, ly: 2.9 }],
    pts: [{ x: 7.5, y: 10, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 5, y: 7.5, label: 'E2', xt: 'Q2', yt: 'P2' }]
  });

  return {
    id: 'comp', n: 4, emoji: '🏪', title: 'Perfect Competition', blurb: 'Five conditions, price takers, firm vs market, surplus, licence caps and market failure.',
    subs: { cond: 'The five conditions & price takers', pm: 'Profit maximisation & shutdown', shift: 'Demand shifts: firm vs market', cs: 'Consumer & producer surplus', cap: 'Restricting entry (taxi licences)', fail: 'Market failure' },
    cards: [
      {
        id: 'comp-c1', sub: 'cond', title: 'Why perfect competition is the "benchmark"',
        html: `<p>With many tiny identical sellers, <b>nobody controls the price</b>. That forces the market to produce exactly the welfare-maximising amount, so everything else (monopoly, cartels, platforms) is judged against it.</p>
        <p><b>The five conditions</b></p><ol><li>Large number of buyers and sellers</li><li>Identical (homogeneous) products</li><li>Full information for buyers and sellers</li><li>Negligible transaction costs</li><li>Free entry and exit</li></ol>
        <div class="ex"><b>Real life:</b> eBay is the favourite near-example: millions of buyers and sellers, super-low search and transaction costs. A wheat farmer is the classic case: you can't charge more than the going price because buyers will simply buy identical wheat from the next farmer.</div>
        <p>Each firm is a <b>price taker</b>: it faces a <b>horizontal</b> demand curve at the market price. So its extra revenue from one more unit (MR) <i>equals the price</i>: <b>P = MR</b>.</p>`,
        tip: 'Mock-style parts often start "discuss the key conditions…". List all five, then link each to price-taking with one sentence of explanation or an example. That is how you reach full marks.',
        check: { type: 'mcq', q: 'A single wheat farmer cannot raise her price above the market price because…', opts: ['she has a patent on her wheat', 'buyers can buy identical wheat from many other sellers at the market price', 'the government fixes the price', 'her costs are zero'], a: 1, why: 'Many sellers + identical product means any seller who charges more loses all her buyers. Her demand curve is horizontal at the market price.' }
      },
      {
        id: 'comp-c2', sub: 'pm', title: 'The firm: where to stop producing',
        html: `<p>Every firm, in any market, follows one rule: <b>if MR &gt; MC, make more; if MR &lt; MC, make less</b>. Profit is highest where <b>MR = MC</b>. A price taker has MR = P, so it produces where <b>P = MC</b>.</p>
        <div class="formula">Profit π = TR − TC     Price taker: MR = P → produce where P = MC</div>
        <p>Cost recap: <b>MC cuts AC and AVC at their lowest points</b> (new unit below the average pulls it down, above pulls it up). In the picture, at price €12 the firm produces about 3.8 units (where the dashed price line meets MC), and since that price is above AC, it earns a profit.</p>${firm([[12, 'P = MR', 3]], [{ x: 3.83, y: 12, label: 'q*', xt: 'q*', g: 'x' }])}
        <p><b>Shutdown rule (short run):</b> keep operating while <b>P ≥ AVC</b>: even at a loss, revenue covers variable costs and helps pay rent you owe anyway. If <b>P &lt; AVC</b>, shut down. In the long run, exit if P &lt; AC.</p>
        <div class="ex"><b>Café logic:</b> your café loses money after rent, but each coffee sells for more than the beans, milk and barista time. Closing today would make the loss <i>bigger</i> (you'd still owe the rent). You'd close only if each coffee failed to cover its own variable cost.</div>`,
        tip: 'A rise in fixed cost (rent) raises AC but NOT MC, so it does not change how much a profit-maximiser produces in the short run.',
        check: { type: 'mcq', q: 'A price-taking firm sells at €10. Its AVC at its best output is €8 and its AC is €11. In the short run it should…', opts: ['shut down immediately, because it makes a loss', 'keep producing, because P covers AVC', 'raise its price to €11', 'double its output regardless of MC'], a: 1, why: 'Loss per unit = 11 − 10 = €1, but P (10) ≥ AVC (8), so it covers variable costs and contributes €2 per unit towards fixed costs. Shutting down would lose the whole fixed cost. In the long run (P < AC) it would exit.' }
      },
      {
        id: 'comp-c3', sub: 'shift', title: 'Demand rises: market vs firm',
        html: `<p>The <b>market</b> has an upward supply curve and a downward demand curve. The <b>firm</b> just sees a flat price line. When market demand shifts <b>right</b> (D1 → D2):</p>${market(true)}
        <ol><li><b>Market:</b> price rises (P1 → P2) and quantity rises (Q1 → Q2).</li><li><b>Firm (short run):</b> its horizontal line moves up. It can't set prices, but it produces more (q1 → q2, where P = MC), and P2 &gt; AC so it earns <b>economic profit</b>.</li></ol>${firm([[7.5, 'P1', 4], [10, 'P2', 3]], [{ x: 3.35, y: 7.5, label: 'q1', xt: 'q1', g: 'x' }, { x: 3.63, y: 10, label: 'q2', xt: 'q2', g: 'x' }])}
        <p><b>Long run:</b> profit is a signal. New firms <b>enter</b>, market supply shifts right, price falls back until <b>P = minimum AC</b> and economic profit is zero again. A demand <i>fall</i> works in reverse: losses → exit → supply shifts left → price recovers.</p>
        <div class="note">Zero economic profit is not "bad": the owners earn exactly what they'd earn in their next-best use of their money and time, because that opportunity cost is already inside "cost".</div>`,
        tip: 'The exam wording: "compare the impact … for the case of the firm and the market". Draw TWO side-by-side panels (market left, firm right) and say what happens in the short run AND the long run.',
        check: { type: 'mcq', q: 'After a rise in demand in a perfectly competitive market, what brings the firm\'s economic profit back to zero in the long run?', opts: ['The government taxes the profit away', 'Entry of new firms shifts market supply right and pushes price back down to minimum AC', 'Existing firms raise their prices', 'Demand shifts back by itself'], a: 1, why: 'Free entry is the key condition: profits attract entrants, supply rises, price falls until P = min AC and there is no more reason to enter.' }
      },
      {
        id: 'comp-c4', sub: 'cs', title: 'Surplus: who gains from trade',
        html: `<p>The <b>demand curve</b> is willingness to pay (WTP); the <b>supply curve</b> is the lowest price sellers will accept (marginal cost).</p>
        <ul><li><b>Consumer surplus (CS)</b> = WTP − price paid = area <i>under demand, above price</i>.</li><li><b>Producer surplus (PS)</b> = price received − minimum acceptable = area <i>above supply, below price</i>. PS = revenue − variable cost.</li><li><b>Welfare = CS + PS.</b> <b>Deadweight loss (DWL)</b> = surplus that no one gets, from trades that should have happened but didn't.</li></ul>${csps()}
        <p>Here D: P = 12 − Q and S: P = 2 + Q, so E = (5, 7). With straight lines each area is a triangle: <b>CS = ½ × 5 × (12 − 7) = 12.5</b>, <b>PS = ½ × 5 × (7 − 2) = 12.5</b>, welfare = 25. Competition maximises welfare because <b>P = MC</b>: every unit worth more to a buyer than it costs to make gets produced.</p>
        <div class="formula">PS = π + FC   (so PS = profit only when fixed cost is zero)</div>
        <div class="note"><b>Trap:</b> "I bought three identical hats at €10 each because that's what each is worth to me" is false. The first hat was worth <i>more</i> than €10 (surplus); you buy until the marginal hat is worth about €10.</div>`,
        tip: '"Define the term producer surplus and use a diagram" = one sentence definition + shaded area labelled PS above S below P + a line saying PS = revenue − variable cost (= profit + fixed cost).',
        check: { type: 'num', q: 'Demand is Qd = 60 − 3P. At a price of €10, what is consumer surplus in euros? (Hint: find the choke price where Q = 0.)', ans: 150, calc: () => { const Q = 60 - 3 * 10, choke = 60 / 3; return 0.5 * Q * (choke - 10); }, why: 'At P = 10, Q = 30. Choke price (Q = 0) is 20. CS = ½ × 30 × (20 − 10) = 150.', steps: ['Q at P = 10: 60 − 30 = 30', 'Choke price: 60 ÷ 3 = 20', 'CS = ½ × base 30 × height (20 − 10) = 150'] }
      },
      {
        id: 'comp-c5', sub: 'cap', title: 'Capping the number of taxis',
        html: `<p>Suppose a city limits taxi licences. With free entry and identical firms, long-run supply is flat at minimum AC (S1). The cap makes supply vertical at the licence limit (S2): <b>fewer rides, higher fare</b>.</p>${capD()}
        <table class="t"><tr><th></th><th>No cap</th><th>Cap</th><th>Change</th></tr><tr><td>Consumer surplus</td><td>A + B + C</td><td>A</td><td>−B − C</td></tr><tr><td>Producer surplus</td><td>0</td><td>B</td><td>+B</td></tr><tr><td>Welfare</td><td>A + B + C</td><td>A + B</td><td>−C = DWL</td></tr></table>
        <p>Consumers lose B + C. Licence holders gain B, which is why medallions became valuable assets. Society loses C. <b>Uber</b> effectively broke these caps, which is why economists love it.</p>
        <p class="muted">Your lecture slide (taxi cap, Topic 2 Part 3, slide 16):</p><img class="slide" src="img/t2-comp-s16-taxi-cap.png" alt="Slide: effect of a restriction on number of cabs">`,
        tip: 'Always finish a cap/quota/tax diagram with: who gains, who loses, and the DWL triangle. Examiners award marks for the welfare accounting, not just the shifted curve.',
        check: { type: 'mcq', q: 'In the licence-cap diagram, the deadweight loss is…', opts: ['the rectangle B: money transferred to licence holders', 'the triangle C: trades that no longer happen although buyers value them above cost', 'area A: the remaining consumer surplus', 'the fall in price'], a: 1, why: 'B is a transfer (consumers → licence holders). C is lost for everybody: those rides would have been worth more than they cost, but are not provided.' }
      },
      {
        id: 'comp-c6', sub: 'fail', title: 'Market failure',
        html: `<p><b>Definition:</b> a market failure is when the market delivers <b>inefficient</b> production or consumption (welfare is not maximised), often because <b>price exceeds marginal cost</b>.</p>
        <table class="t"><tr><th>Cause</th><th>Example</th><th>Why it fails</th></tr>
        <tr><td>Market power</td><td>Monopoly, cartel (OPEC)</td><td>Output restricted so P &gt; MC</td></tr>
        <tr><td>Externalities</td><td>Factory pollution; vaccines</td><td>Costs/benefits fall on third parties: over- / under-production</td></tr>
        <tr><td>Public goods</td><td>Street lighting, defence</td><td>Free-riding: nobody can be excluded so the market under-supplies</td></tr>
        <tr><td>Asymmetric information</td><td>Used cars ("lemons")</td><td>Sellers know more than buyers; good cars leave the market</td></tr>
        <tr><td>Government restriction</td><td>Taxi caps, binding price controls</td><td>Fewer trades than efficient: DWL</td></tr></table>
        <div class="note">Externalities, public goods and information problems are standard textbook examples, not spelled out in your slides. Use them freely as "three examples".</div>`,
        tip: 'Definition (1–2 marks) + three examples each with ONE sentence on why it is a failure (about 1.5 marks each).',
        check: { type: 'mcq', q: 'Which of these is a market failure caused by an externality?', opts: ['A factory dumps waste in a river and does not pay for the damage', 'A shop raises prices after a supplier raises its cost', 'Tea gets cheaper when more tea is harvested', 'A café goes out of business because customers prefer another café'], a: 0, why: 'The factory\'s decisions impose a cost on third parties that it does not bear, so it overproduces relative to the social optimum. The other options are ordinary market responses.' }
      }
    ],
    questions: [
      { id: 'comp-q1', sub: 'cond', skip: true, type: 'mcq', q: 'Which scenario best describes a price taker?', opts: ['A pharmaceutical firm with a 20-year patent', 'A single potato farmer selling identical potatoes at a market with thousands of other farmers', 'Apple setting the price of a new iPhone', 'Ryanair deciding fares on a route where only easyJet competes'], a: 1, why: 'Many identical sellers means no individual seller can influence the price: the farmer faces a flat demand curve at the market price.' },
      { id: 'comp-q2', sub: 'cond', skip: true, type: 'mcq', q: 'Dublin has hundreds of sandwich shops, free entry and exit, but each shop\'s sandwiches are different (branding, recipes). Which condition of perfect competition is violated?', opts: ['Many buyers and sellers', 'Free entry and exit', 'Identical products', 'There is no condition violated: this is perfect competition'], a: 2, why: 'Differentiated products give each shop some pricing power (its own downward-sloping demand). This is monopolistic competition, not perfect competition.' },
      { id: 'comp-q3', sub: 'pm', skip: true, type: 'mcq', q: 'For a firm in perfect competition, marginal revenue is…', opts: ['equal to the market price', 'less than the market price', 'greater than the market price', 'zero in the short run'], a: 0, why: 'Selling one more unit does not force the price down on the others, so each extra unit earns exactly P: MR = P. (A monopolist is different: MR < P.)' },
      { id: 'comp-q4', sub: 'pm', skip: true, type: 'num', q: 'A price-taking firm has total cost TC = 50 + 2q + q². The market price is €14. How many units maximise its profit? (Use P = MC.)', ans: 6, calc: () => (14 - 2) / 2, why: 'MC = dTC/dq = 2 + 2q. Set P = MC: 14 = 2 + 2q → q = 6.', steps: ['MC = 2 + 2q', 'P = MC → 14 = 2 + 2q', 'q = 6'] },
      { id: 'comp-q5', sub: 'pm', skip: true, type: 'mcq', q: 'Same firm (TC = 50 + 2q + q², P = €14, produces q = 6). Its profit is −€14. What should it do in the SHORT run?', opts: ['Shut down, because profit is negative', 'Keep producing, because P (14) exceeds AVC (8)', 'Raise output until profit is positive', 'Exit the industry permanently'], a: 1, why: 'Revenue = 84; VC = 2·6 + 36 = 48, so AVC = 8 < P. Revenue covers all variable cost (84 − 48 = 36 towards the 50 fixed cost), so losing 14 is better than losing the full 50 by shutting down. Long run it would exit (P < AC = 16.3).' },
      { id: 'comp-q6', sub: 'shift', skip: true, type: 'mcq', q: 'Demand for a good in a perfectly competitive market rises. In the SHORT run a typical firm…', opts: ['earns zero economic profit', 'produces more and earns economic profit, because P rises above AC', 'produces less because the price is higher', 'cannot change output because it is a price taker'], a: 1, why: 'The firm takes the new higher price, expands to where P = MC, and with P > AC earns economic profit. Entry will erode it in the long run.' },
      { id: 'comp-q7', sub: 'shift', skip: true, type: 'mcq', q: 'In the long run, after the demand rise and entry of new firms in a constant-cost industry, price returns to…', opts: ['the original high price caused by the demand rise', 'minimum average cost, with zero economic profit', 'marginal cost of the least efficient firm', 'zero'], a: 1, why: 'Entry continues until economic profit is zero: P = min AC. In a constant-cost industry the long-run supply curve is flat at that level.' },
      { id: 'comp-q8', sub: 'cs', skip: true, type: 'num', q: 'Demand is Qd = 80 − 4P. The market price is €12. Calculate consumer surplus (€).', ans: 128, calc: () => 0.5 * (80 - 4 * 12) * (80 / 4 - 12), why: 'At P = 12, Q = 32. Choke price = 80/4 = 20. CS = ½ × 32 × (20 − 12) = 128.', steps: ['Q = 80 − 48 = 32', 'Choke price = 80 ÷ 4 = 20', 'CS = ½ × 32 × 8 = 128'] },
      { id: 'comp-q9', sub: 'cs', skip: true, type: 'tf', q: 'True or false (and why): a bakery has fixed costs of €500 and producer surplus of €800. Its profit is also €800.', a: false, why: 'False. PS = π + FC, so π = PS − FC = 800 − 500 = €300. Producer surplus equals profit only when fixed costs are zero.' },
      { id: 'comp-q10', sub: 'cap', skip: true, type: 'mcq', q: 'A city caps the number of taxi licences in a competitive market. Compared with no cap…', opts: ['fares fall and more rides are provided', 'fares rise, rides fall, licence holders gain and a deadweight loss appears', 'only consumers are affected, producers are unchanged', 'welfare rises because taxis are less congested'], a: 1, why: 'Supply restricted → higher price, lower quantity. Consumers lose; licence holders gain a transfer; the trades that no longer happen create DWL.' },
      { id: 'comp-q11', sub: 'cap', type: 'num', q: 'Demand for cakes is Qd = 400 − 10p and unrestricted supply is Qs = 100 + 10p. A baker\'s licence cuts supply to Qs′ = 10p. What is the new equilibrium price (€)?', ans: 20, calc: () => 400 / 20, why: 'Before: 400 − 10p = 100 + 10p → p = 15, Q = 250. After: 400 − 10p = 10p → p = 20, Q = 200. Price up €5, quantity down 50.', steps: ['Set Qd = Qs′: 400 − 10p = 10p', '400 = 20p → p = 20', 'Q = 10 × 20 = 200 (down from 250)'] },
      { id: 'comp-q12', sub: 'cs', type: 'tf', q: 'True or false (and why): "I paid €25 for this concert ticket, so it is worth exactly €25 to me."', a: false, why: 'Almost certainly false. You buy if WTP ≥ price, so the ticket is worth at least €25 to you; the gap is your consumer surplus.' },
      { id: 'comp-q13', sub: 'fail', type: 'mcq', q: 'Which pair is a correct match of market failure and cause?', opts: ['Street lighting: externality of a competitive firm', 'A cartel restricting oil output: market power (P > MC)', 'Falling tea prices after a good harvest: asymmetric information', 'Free entry into a market: public good'], a: 1, why: 'A cartel acts like a monopolist: it cuts output so price exceeds marginal cost. Street lighting is a public good (non-excludable), not a firm externality.' },
      { id: 'comp-q14', sub: 'pm', type: 'mcq', q: 'A price-taking firm\'s landlord raises the monthly rent (a fixed cost). In the SHORT run its profit-maximising output…', opts: ['rises, because it needs more revenue', 'falls, because costs are higher', 'is unchanged, because MC is unchanged', 'becomes zero'], a: 2, why: 'Fixed costs shift AC but not MC. The firm still produces where P = MC, so output is unchanged; profit just falls by the rent increase. (It would exit only if P fell below AVC, or in the long run below AC.)' },
      { id: 'comp-q15', sub: 'shift', type: 'mcq', q: 'Market demand FALLS in a perfectly competitive industry with identical firms. Which sequence is correct?', opts: ['Price falls → firms earn losses → firms exit → supply shifts left → price recovers to min AC', 'Price falls → firms earn profit → firms enter → price falls further', 'Price rises → firms exit → price rises further', 'Nothing changes because firms are price takers'], a: 0, why: 'Lower demand cuts price below AC; losses drive exit; market supply shifts left; price rises until P = min AC and economic profit is zero again.' },
      { id: 'comp-q16', sub: 'cs', type: 'num', q: 'Demand: P = 40 − Q. Supply: P = 10 + 2Q. Find total welfare (CS + PS) at the competitive equilibrium (€).', ans: 150, calc: () => { const Q = (40 - 10) / 3, P = 40 - Q; return 0.5 * Q * (40 - P) + 0.5 * Q * (P - 10); }, why: 'Equate 40 − Q = 10 + 2Q → Q = 10, P = 30. CS = ½ × 10 × (40 − 30) = 50; PS = ½ × 10 × (30 − 10) = 100. Welfare = 50 + 100 = 150.', steps: ['40 − Q = 10 + 2Q → 3Q = 30 → Q = 10, P = 30', 'CS = ½ × 10 × (40 − 30) = 50', 'PS = ½ × 10 × (30 − 10) = 100', 'Welfare = 150'] }
    ],
    boss: {
      title: 'The Cocoa Crunch', minutes: 36,
      briefing: 'A 30-mark Section-B-style question. Expect a news headline to analyse, a firm-vs-market diagram, and a policy diagram.',
      questions: [{
        id: 'comp-b1', title: 'Question: Competitive markets', intro: null,
        parts: [
          {
            label: 'a', marks: 10, q: 'Consider the headline: <i>"Cocoa prices surge as floods wipe out West African harvest."</i> Use a clearly labelled market model to show and explain this headline on the cocoa market.',
            model: '<p>Treat cocoa as a competitive market: many growers and buyers, near-identical beans, price set by supply and demand.</p><ul><li><b>Diagram:</b> axes Price (€/tonne) and Quantity (tonnes); downward demand D, upward supply S1, initial equilibrium E1 (P1, Q1).</li><li><b>Shock:</b> floods destroy crops → <b>supply shifts left</b> (S1 → S2) because fewer tonnes are available at every price (a supply shifter: weather/harvest).</li><li><b>Result:</b> new equilibrium E2 with <b>higher price P2 and lower quantity Q2</b>. The "surge" in the headline is P1 → P2.</li><li><b>Explain:</b> at P1 there is now excess demand; competition among buyers bids the price up until quantity demanded equals the reduced quantity supplied. Movement is <i>along</i> demand (quantity demanded falls), not a shift of demand.</li><li>Elasticity point: cocoa demand is probably inelastic in the short run (few substitutes for chocolate makers), so price rises by a lot for a small fall in quantity.</li></ul>',
            mdg: () => DG.chart({ xmax: 10, ymax: 12, xlabel: 'Quantity of cocoa', ylabel: 'Price', lines: [{ p: [[0.5, 11], [10, 1]], label: 'D', c: 0, lx: 9.5, ly: 1.7 }, { p: [[0, 1], [8, 9]], label: 'S1', c: 1 }, { p: [[2, 1], [10, 9]], label: 'S2', c: 2 }], pts: [{ x: 5, y: 6, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 3.9, y: 7.7, label: 'E2', xt: 'Q2', yt: 'P2' }] }),
            rubric: [['Labelled axes, D, S1 and initial equilibrium', 2], ['Supply shifts LEFT (S2) with the reason (floods / harvest)', 3], ['New equilibrium: P up, Q down, correctly labelled', 2], ['Explains adjustment (excess demand bids price up; movement along D)', 2], ['Extra insight (inelastic demand / substitutes / other)', 1]]
          },
          {
            label: 'b', marks: 10, q: 'In a perfectly competitive market, demand for a product FALLS. Using diagrams for the market and a representative firm, explain what happens in the short run and the long run.',
            model: '<p>Two panels: market (left), firm (right).</p><ul><li><b>Market, short run:</b> D shifts left (D1 → D2); price falls P1 → P2 and quantity falls Q1 → Q2.</li><li><b>Firm, short run:</b> price taker, so its horizontal price line drops from P1 to P2. It cuts output to where <b>P2 = MC</b> (q2 &lt; q1). If P2 &lt; AC the firm makes an <b>economic loss</b>; it keeps operating while P2 ≥ AVC, and shuts down if P2 &lt; AVC.</li><li><b>Long run:</b> losses → firms <b>exit</b> (free exit) → market supply shifts left → price rises back towards <b>minimum AC</b> → economic profit returns to zero; the remaining firms produce at the efficient scale.</li><li>Market ends with a lower quantity but (constant-cost industry) the original price.</li></ul>',
            mdg: () => marketFall() + firm([[10, 'P (before)', 3], [7.5, 'P (after)', 4]]),
            rubric: [['Market diagram: D shifts left, P and Q both fall (labelled)', 2], ['Firm diagram with horizontal price line falling and output where P = MC', 2], ['Firm makes loss when P < AC but continues if P ≥ AVC (shutdown rule)', 2], ['Long run: exit → supply shifts left → price rises to min AC', 3], ['Ends with zero economic profit / says short-run vs long-run clearly', 1]]
          },
          {
            label: 'c', marks: 10, q: 'A city limits the number of food-delivery licences. Using a diagram, explain the effect on price, quantity, consumer surplus, producer surplus and deadweight loss.',
            model: '<ul><li>Before the cap, free entry makes long-run supply flat at minimum AC (S1): price p1, quantity Q1. Consumer surplus = A + B + C; producer surplus = 0.</li><li>The cap makes supply vertical at Q2 (S2): <b>price rises to p2, quantity falls to Q2</b>.</li><li><b>Consumer surplus falls</b> to A (loses B + C).</li><li><b>Licence holders gain</b> producer surplus B (a transfer from consumers): this is why licences become valuable assets.</li><li><b>Deadweight loss = C</b>: deliveries that customers value above their cost are no longer made. Total welfare falls from A + B + C to A + B.</li><li>Market failure from government restriction; entrants such as Uber undermine such caps.</li></ul>',
            mdg: capD,
            rubric: [['Diagram: S1 flat, S2 vertical (cap), D, E1 and E2 labelled', 2], ['Higher price and lower quantity', 2], ['Consumer surplus falls (A + B + C → A)', 2], ['Producer surplus rises (0 → B) and licence holders gain', 2], ['Deadweight loss identified (C) and welfare falls', 2]]
          }
        ]
      }]
    }
  };
})());
