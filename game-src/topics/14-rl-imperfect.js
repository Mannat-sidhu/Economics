/* Real-life layer for Level 5: Imperfect competition. */
RL.lv.imp = {
  story: {
    title: 'The only bakery in Ballyfoot',
    html: `<p>Ballyfoot is a village with <b>one bakery</b>. Nobody else is allowed to open one nearby (lease, planning rules, tiny market). Elm Street\'s stall holder, Priya, had to take whatever price the crowd set. The Ballyfoot baker is different: <b>she sets the price</b>.</p>
      <p>She sells 10 cakes at €10 each: €100 revenue. She wonders about a price of €9.50. At that price she\'d sell 11 cakes, but <i>all</i> 11 must go for €9.50, so revenue is €104.50. The extra cake brought in just <b>€4.50</b>, even though it sold for €9.50, because she gave a 50-cent discount on the first ten. That\'s why a monopolist\'s extra revenue is always below its price.</p>
      <p>So she stops growing sooner than a competitive firm would, produces less and charges more. Villagers who\'d pay €8 for a cake but not €10 simply go without. Trades that would have helped both sides never happen: <b>deadweight loss</b>.</p>
      <p>Now imagine Ballyfoot has three bakeries. They could quietly agree to charge €10 together (a <b>cartel</b>, illegal in the EU). But each baker has a temptation to cut the price a little and steal customers. Cartels are fragile for exactly that reason. OPEC, which controls a big chunk of the world\'s oil, is the famous real-life example, and has the same cheating problem.</p>`,
    tip: 'This level is one question asked five times: "what changes when a seller has some control over price?" Fewer units, higher price, less welfare.'
  },
  gloss: [
    ['Price maker', 'a seller who chooses its price rather than accepting one.', 'the only bakery in the village'],
    ['Cartel', 'sellers who agree to restrict output and keep prices high.', 'OPEC'],
    ['Concentration', 'how much of a market is held by a few firms.', 'four supermarkets with 80% of grocery sales']
  ],
  hints: {
    'imp-b1.0': 'Think of three village bakeries that agree to charge €10. What do they have in common? Then ask: what is each baker\'s temptation once the others stick to the deal?',
    'imp-b1.1': 'Revenue-wise, selling an extra unit means cutting the price on ALL units. So for P = 90 − Q, MR = 90 − 2Q. Set MR equal to the extra cost of one more unit (30), find Q, then read the price off the demand curve.',
    'imp-b1.2': 'Replace OPEC with the three village bakers. Everyone agreed to a lower output to keep prices high. Why is it tempting for ONE baker to bake extra and sell it at the high price while the others stick to quota?'
  },
  card: {
    'imp-c1': {
      plain: 'A monopolist is the only seller, so it chooses its price: it sells fewer items at a higher price than a competitive market would.',
      icon: '💊', stitle: 'Picture this',
      story: `<p>A drug company has a 20-year patent on a heart pill. Only it can legally sell that pill. It can charge €50 even if it costs €2 to make, because patients have nowhere else to go. In a competitive market, rivals would undercut it until the price approached €2.</p>`,
      simple: `<ol><li><b>One seller</b> of a product with no close substitutes.</li><li><b>Entry is blocked</b> (patent, licence, huge start-up cost, owning the key resource).</li><li>It is a <b>price maker</b>: it faces the whole downward-sloping market demand.</li><li>It follows the universal profit rule: produce where <b>MR = MC</b>, then charge what demand allows at that quantity.</li><li>Result: <b>price &gt; MC</b>.</li></ol>`,
      jargon: [['Monopoly', 'only one seller', 'a national rail line'], ['Price maker', 'sets its own price'], ['Entry barrier', 'obstacle that keeps rivals out', 'a patent']]
    },
    'imp-c2': {
      plain: 'To sell one more item, a monopolist has to cut the price on every item, so the extra revenue is less than the price.',
      icon: '🎂', stitle: 'Picture this',
      story: `<p>The Ballyfoot baker sells 10 cakes at €10 (revenue €100). To sell 11 she must drop the price to €9.50 for every cake: revenue €104.50. The 11th cake brought in only €4.50. The rest was lost on the first ten. That €4.50 is <b>marginal revenue</b>.</p>`,
      simple: `<ol><li>A price taker sells at a fixed price: MR = P.</li><li>A monopolist must cut the price to sell more: <b>MR &lt; P</b>.</li><li>For a straight-line demand P = a − bQ, MR = a − 2bQ (same start, twice as steep).</li><li>Set <b>MR = MC</b> to find the quantity. Then plug that quantity into demand to find the price.</li><li>Profit = (P − AC) × Q.</li></ol>`,
      jargon: [['Marginal revenue (MR)', 'extra revenue from selling ONE more unit', 'the €4.50 from the 11th cake'], ['Profit-maximising rule', 'make units until MR = MC']]
    },
    'imp-c3': {
      plain: 'Compared with competition, a monopoly produces less, charges more, and wastes some potential gains from trade.',
      icon: '⚖️', stitle: 'Picture this',
      story: `<p>Say a cake costs €2 to make. In a competitive village, cakes sell for €2 and everyone who values a cake at €2 or more buys one. With a monopoly baker, cakes sell for €7. Someone who values a cake at €5 would have bought at €2 but won\'t at €7. That lost trade helps nobody. The baker also doesn\'t gain it, because she could only sell it by lowering the price for others. Summed up, that is the <b>deadweight loss</b>.</p>`,
      simple: `<ol><li><b>Competition:</b> P = MC, larger quantity, lower price, big consumer surplus.</li><li><b>Monopoly:</b> MR = MC, P &gt; MC, smaller quantity, higher price.</li><li><b>Consumer surplus falls</b> (higher price, fewer buyers).</li><li><b>Profit rises</b> (a transfer from consumers).</li><li><b>Deadweight loss</b> = the triangle of surplus lost because trades that were worth it didn\'t happen.</li><li>Exam recipe: draw D, MR, MC; mark Qm and Pm, then Qc and Pc; shade CS, profit and DWL.</li></ol>`,
      jargon: [['Consumer surplus', 'buyers\' gain: what they\'d pay minus what they pay'], ['Deadweight loss', 'welfare nobody gets, because trades are blocked'], ['Transfer', 'money moving from one group to another without being lost', 'consumers → monopolist']]
    },
    'imp-c4': {
      plain: 'HHI is one number telling you how concentrated a market is: closer to 1 means a few firms dominate.',
      icon: '📊', stitle: 'Picture this',
      story: `<p>Compare two supermarket markets. In market A, 10 chains each have a 10% share. In market B, one chain has 70% and three small ones have 10% each. Both have four or more players, but market B is obviously more dominated. HHI squares each share, so big players count a lot: A: 10 × 0.1² = 0.10; B: 0.7² + 3 × 0.1² = 0.52.</p>`,
      simple: `<ol><li>Write each firm\'s share as a decimal (40% = 0.4).</li><li>Square each share.</li><li>Add them up. That is the <b>HHI</b>.</li><li>Pure monopoly = 1. Many tiny firms ≈ 0.</li><li>With a calculator in the exam: write the working, as marks are for the method.</li></ol><div class="formula">HHI = s₁² + s₂² + … + sₙ²</div>`,
      jargon: [['HHI (Herfindahl-Hirschman Index)', 'sum of squared market shares', '0.4² + 0.6² = 0.52'], ['Market share', 'a firm\'s slice of total sales', '40%']]
    },
    'imp-c5': {
      plain: 'Many sellers, each a little different: each has a bit of pricing power, but profit gets competed away.',
      icon: '🍕', stitle: 'Picture this',
      story: `<p>Your street has 12 pizza places. Each has its own recipe, vibe, delivery speed, so each can charge a bit more than cost, as you may prefer "your" pizza place. If pizza seems very profitable, someone opens a 13th. Each place loses a few customers. Eventually profits fall to normal and everyone is back to scraping by.</p>`,
      simple: `<ol><li>Many firms, <b>differentiated</b> products, <b>free entry</b>.</li><li>Each firm has a downward demand curve (a bit of price-setting power).</li><li><b>Short run:</b> set MR = MC, may earn profit.</li><li><b>Long run:</b> profit attracts entry; each firm\'s demand shifts left until profit = 0 (price = AC).</li><li>Price is still above MC and firms use a bit too little capacity: a small inefficiency.</li></ol>`,
      jargon: [['Differentiated product', 'similar but not identical', 'two pizzerias on one street'], ['Free entry', 'anyone can join']]
    },
    'imp-c6': {
      plain: 'In an oligopoly a few big firms watch and react to each other; that\'s why game theory is next.',
      icon: '✈️', stitle: 'Picture this',
      story: `<p>Two airlines fly Dublin–Faro. If one cuts fares, it gains passengers until the other follows. If both cut, both earn less. Neither can decide its price without guessing what the other will do. They\'d both be better off if they quietly kept prices high: that\'s <b>collusion</b> (illegal when explicitly agreed). Sometimes they just follow each other without talking: <b>tacit collusion</b>.</p>`,
      simple: `<ol><li><b>A few big firms</b>, hard entry.</li><li><b>Interdependence:</b> my best move depends on yours.</li><li>They could cooperate (act like one monopoly) but each has an incentive to undercut.</li><li><b>Explicit collusion</b> (cartel): formal agreement, illegal in the EU.</li><li><b>Tacit collusion:</b> prices stay high without any agreement.</li></ol>`,
      jargon: [['Interdependence', 'each firm\'s result depends on rivals\' choices', 'two airlines pricing the same route'], ['Collusion', 'firms cooperating to keep prices high', 'a price-fixing deal'], ['Tacit collusion', 'unspoken coordination', 'rivals copy each other\'s price rises']]
    },
    'imp-c7': {
      plain: 'A cartel tries to act like one monopolist, but each member is tempted to secretly produce more.',
      icon: '🛢️', stitle: 'Picture this',
      story: `<p>Four petrol stations in a town agree each to sell only 1,000 litres a day to keep prices high. Each makes good money. But if one of them quietly sells 1,500 litres at the high price, it pockets an extra profit while others keep to the deal. If everyone thinks like that, the cartel collapses. OPEC faces this: members regularly produce more than their quota.</p>`,
      simple: `<ol><li>A cartel picks the output that maximises <b>joint</b> profit (where MR = MC, like a monopolist), then splits it into quotas.</li><li>Price rises because total output falls.</li><li><b>Cheating incentive:</b> at the high cartel price, one member\'s own MC says it would like to produce MORE. Extra units earn more than they cost.</li><li>If everyone cheats, output rises, price falls, the cartel breaks.</li></ol>`,
      jargon: [['Quota', 'the limit each member agrees to produce', '1,000 litres a day'], ['Cheating', 'secretly producing above your quota'], ['OPEC', 'a group of oil-producing countries that coordinate output']]
    }
  },
  extra: [
    { id: 'imp-r1', sub: 'mono', type: 'mcq', scn: 'A drug company holds a 20-year patent on a heart pill. Nobody else may legally sell it, and patients have no equivalent alternative.', q: 'What can the company do that a competitive firm cannot?', opts: ['Nothing: all firms are price takers', 'Set a price well above its cost of making the pill', 'Sell unlimited quantities at any price', 'Avoid all costs'], a: 1, why: 'A patent blocks entry and leaves the firm as a price maker: it faces the whole demand and chooses a price above marginal cost.' },
    { id: 'imp-r2', sub: 'mono', type: 'num', scn: 'A baker sells 20 loaves at €5 each (revenue €100). To sell 21 she must cut the price to €4.90 on ALL loaves.', q: 'What is the marginal revenue of the 21st loaf (€)?', ans: 2.9, unit: '€', calc: () => 21 * 4.9 - 20 * 5, why: 'New revenue = 21 × 4.90 = 102.90. Old revenue = 100. MR = 2.90, far below the 4.90 price, because the price fell on all the other loaves too.', steps: ['New revenue = 21 × 4.90 = 102.90', 'Old revenue = 20 × 5 = 100', 'MR = 2.90'] },
    { id: 'imp-r3', sub: 'welfare', type: 'mcq', scn: 'A pill costs €2 to make. The patent holder charges €50. Some patients would happily pay €10 but not €50.', q: 'What is the economic problem with those patients going without?', opts: ['Producer surplus is too high', 'A deadweight loss: trades worth doing (value €10 > cost €2) do not happen', 'It is efficient, because the firm earns profit', 'Consumer surplus rises'], a: 1, why: 'The pill would cost €2 and the patient values it at €10. Both could gain if it sold at about €6, but the high price blocks the sale. That unrealised gain is the deadweight loss.' },
    { id: 'imp-r4', sub: 'hhi', type: 'num', scn: 'Four mobile-phone networks share the market: 40%, 30%, 20% and 10%.', q: 'Calculate the HHI as a decimal (e.g. 0.25).', ans: 0.3, calc: () => 0.4 ** 2 + 0.3 ** 2 + 0.2 ** 2 + 0.1 ** 2, why: 'HHI = 0.4² + 0.3² + 0.2² + 0.1² = 0.16 + 0.09 + 0.04 + 0.01 = 0.30.', steps: ['0.4² = 0.16', '0.3² = 0.09', '0.2² = 0.04, 0.1² = 0.01', 'Sum = 0.30'] },
    { id: 'imp-r5', sub: 'mc', type: 'mcq', scn: 'A shopping street has 15 hair salons. Each has its own style, price and loyal customers. Anyone can open a salon.', q: 'What do you expect in the long run?', opts: ['Huge profits for ever', 'Entry until economic profit is about zero', 'One salon driving out all others', 'Prices equal to marginal cost exactly'], a: 1, why: 'Monopolistic competition has free entry: profits attract newcomers who take customers from existing firms until profits are zero (P = AC).' },
    { id: 'imp-r6', sub: 'oligo', type: 'mcq', scn: 'Two petrol stations sit on opposite sides of a junction. When one cuts its price by 3c, the other matches within the hour.', q: 'What is the key feature of this market?', opts: ['Free entry', 'Interdependence: each firm\'s results depend on its rival\'s reaction', 'Identical products and thousands of sellers', 'A price ceiling'], a: 1, why: 'With few sellers, each must consider what the other will do. That strategic interdependence is the hallmark of oligopoly.' },
    { id: 'imp-r7', sub: 'cartel', type: 'mcq', scn: 'Four village petrol stations secretly agree to each sell 1,000 litres a day and keep the price at €1.90. One of them quietly sells 1,400 litres at €1.90.', q: 'Why do cartels like this tend to break down?', opts: ['Because each member gains by secretly producing more while the others stick to the deal', 'Because governments always subsidise cartels', 'Because consumers refuse to buy', 'Because quantities cannot be measured'], a: 0, why: 'At the cartel price, extra units earn more than their marginal cost, so every member is tempted to cheat. If everyone cheats, output rises and the price collapses.' }
  ]
};
