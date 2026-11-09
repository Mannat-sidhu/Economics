/* Real-life layer for Level 4: Perfect Competition. Story first, plain-English steps, everyday spot-it questions. */
/* Tomato numbers: 40 stalls; stall MC = 0.2q + 1; fixed cost 10/day -> AC min = €3 at 10 kg. Heatwave adds 300 kg of demand at every price. */
const tomato = (() => {
  const AC = q => 0.1 * q + 1 + 10 / q;
  const market = () => DG.chart({
    xmax: 800, ymax: 10, xlabel: 'Kilos of tomatoes per day (whole market)', ylabel: 'Price (€ per kg)', alt: 'tomato market with numbers',
    lines: [{ p: [[0, 1], [800, 5]], label: 'S', c: 1, lx: 800, ly: 5 }, { p: [[100, 0], [800, 3.5]], label: 'S2', c: 3, lx: 800, ly: 3.5 }, { p: [[0, 7], [700, 0]], label: 'D1', c: 0, lx: 700, ly: 0.4 }, { p: [[0, 10], [800, 2]], label: 'D2', c: 2, lx: 800, ly: 2 }],
    pts: [{ x: 400, y: 3, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 600, y: 4, label: 'E2', xt: 'Q2', yt: 'P2' }, { x: 700, y: 3, label: 'E3', xt: 'Q3', g: 'x' }]
  });
  const stall = () => DG.chart({
    xmax: 20, ymax: 6, xlabel: 'Kilos per day (Priya\'s stall)', ylabel: 'Price / cost per kg (€)', alt: 'one tomato stall with numbers',
    polys: [{ p: [[0, AC(15)], [15, AC(15)], [15, 4], [0, 4]], c: 3, label: 'Profit €12.50', lx: 7.5, ly: 3.6 }],
    lines: [{ p: [[0, 1], [20, 5]], label: 'MC', c: 2, lx: 20, ly: 5 }, { p: Array.from({ length: 36 }, (_, i) => [3 + i * 0.5, AC(3 + i * 0.5)]), label: 'AC', c: 0, lx: 20, ly: 3.5 }, { p: [[0, 3], [20, 3]], label: '', c: 4, dash: true }, { p: [[0, 4], [20, 4]], label: '', c: 4, dash: true }],
    pts: [{ x: 10, y: 3, xt: 'q', g: 'x', label: '' }, { x: 15, y: 4, xt: 'q', g: 'x', label: '' }]
  });
  return { market, stall };
})();

RL.lv.comp = {
  story: {
    title: 'Saturday at the Elm Street market',
    html: `<p>Every Saturday, forty stalls line up on Elm Street selling tomatoes. They all look the same, taste the same, and cost <b>€3 a kilo</b>.</p>
      <p>Priya runs one stall. One morning she thinks, <i>"I'll charge €3.50 and make more per kilo."</i> Within ten minutes she has sold nothing: shoppers just walk ten steps to the next stall. So Priya goes back to €3. <b>She has no power over the price.</b> The crowd of sellers sets it.</p>
      <p>Then a heatwave hits. Everyone wants salad. Tomatoes sell out fast, shoppers start offering a bit more, and the price at <i>every</i> stall drifts up to €4. Priya's phone buzzes with orders, she brings extra crates, and she earns a lot more than usual.</p>
      <p>Next month there are seventy stalls. Newcomers saw the money being made. With more tomatoes around, the price slides back to €3 and Priya earns a normal living again.</p>
      <p>That whole story <i>is</i> perfect competition: price set by the crowd, profits that attract newcomers, and newcomers that wipe the extra profit out.</p>`,
    tip: 'Perfect competition is the "ideal" market every other level is compared against. If you can retell the tomato story in your own words, you can answer most questions in this level.'
  },
  gloss: [
    ['Price taker', 'A seller who must accept the going price because they are too small to move it.', 'Priya selling tomatoes'],
    ['Economic profit', 'Profit left after counting ALL costs, including what you could have earned doing something else.', 'Priya earns more than a normal wage from her stall'],
    ['Entry / exit', 'New sellers joining a market, or old ones leaving.', 'new tomato stalls opening after a hot summer'],
    ['Deadweight loss', 'Value that disappears because some trades that would have helped both sides never happen.', 'a shopper who would happily pay €3 gets no tomato because a cap blocked the sale']
  ],
  hints: {
    'comp-b1.0': 'Think of the cocoa story like Priya\'s tomatoes. Floods mean less cocoa gets picked. If there is less on the shelves, does the price go up or down? Draw supply and demand, then move ONE curve and say why.',
    'comp-b1.1': 'Retell the tomato heatwave story backwards. Fewer customers: what happens to the price at every stall? Is one stall now earning above or below normal? Then what do owners do next month?',
    'comp-b1.2': 'Imagine the council says "only 50 delivery riders allowed in the city". Who pays more? Who now earns more than before? Who misses out on rides that would have made both sides happy?'
  },
  card: {
    'comp-c1': {
      plain: 'Perfect competition means so many near-identical sellers that nobody can charge more than anyone else.',
      icon: '🍅', stitle: 'Picture this',
      story: `<p>You need a kilo of potatoes. Fifty stalls sell identical potatoes for €2. If one stall asks for €2.50 you simply walk to the next one. That stall is a <b>price taker</b>: it takes the price the crowd sets.</p><p>Now think of a brand like Apple. You can't get an identical iPhone elsewhere, so Apple <i>can</i> pick its price. That is the opposite world, which the next level covers.</p>`,
      simple: `<ol><li><b>Lots of buyers and sellers.</b> No single one is big enough to matter.</li><li><b>Identical product.</b> Customers can't tell stalls apart, so they only care about price.</li><li><b>Everyone knows the prices.</b> Shoppers can see every stall, so nobody can hide a high price.</li><li><b>Cheap to trade.</b> No big hassle or fee to buy or sell.</li><li><b>Anyone can join or leave.</b> No licence, no patent, no big start-up cost.</li></ol><p>Result: every seller is a <b>price taker</b>. For one stall, selling one more kilo adds exactly the going price to its income, so <b>marginal revenue (MR) = price (P)</b>.</p>`,
      jargon: [['Price taker', 'must accept the market price', 'a tomato stall'], ['Homogeneous', 'identical, no way to tell products apart', 'a kilo of wheat'], ['Marginal revenue (MR)', 'extra money from selling ONE more unit', 'one more kilo sold at €3 adds €3']]
    },
    'comp-c2': {
      plain: 'A seller keeps making more as long as each extra item earns more than it costs, and stops when it doesn\'t.',
      icon: '☕', stitle: 'Picture this',
      story: `<p>You run a café. Today you have already sold 100 coffees. Should you make the 101st? Ask: <i>"Does it bring in more than it costs me to make?"</i> A coffee sells for €3 and costs €1.20 in beans, milk and your time, so yes. You keep going until the next coffee would cost you more than it earns (say, paying overtime for one last cup).</p><p>Your rent is a different thing: you owe it whether you sell 0 or 500 coffees. So rent shouldn't change how many coffees you make today.</p>`,
      simple: `<ol><li><b>Marginal cost (MC)</b> is the extra cost of making one more item.</li><li><b>Rule:</b> if one more item earns more than it costs (MR &gt; MC) make it. If it earns less (MR &lt; MC), don't. Profit is biggest where <b>MR = MC</b>.</li><li>For a price taker MR = price, so the rule becomes <b>"make items until the extra cost reaches the price: P = MC."</b></li><li><b>Should I close today?</b> Ignore rent (already owed). If each coffee still covers its own variable cost (P ≥ AVC) stay open, because every coffee helps pay the rent. If not (P &lt; AVC) shut.</li><li>In the <b>long run</b> rent isn't fixed: leave the market if the price can't even cover average cost (P &lt; AC).</li></ol>`,
      jargon: [['Marginal cost (MC)', 'the extra cost of ONE more unit', 'beans and milk for one more latte'], ['AVC (average variable cost)', 'running cost per item, excluding rent', 'ingredients + wages per coffee'], ['AC (average cost)', 'everything (rent too) divided by items made', '€500 rent + €2,000 running ÷ 1,000 coffees'], ['Fixed cost', 'bill you pay whatever you sell', 'monthly shop rent'], ['Shutdown', 'stopping production in the short run when P is below AVC']]
    },
    'comp-c3': {
      plain: 'When customers suddenly want more, the whole market price goes up, one stall copies the price and sells more, but extra profit attracts new stalls and the price drifts back.',
      icon: '🌡️', stitle: 'Picture this: the heatwave',
      story: `<p>Elm Street market: 40 tomato stalls, €3 a kilo. A heatwave arrives and everyone wants salad.</p><p><b>The market</b> (the whole street) sees shoppers hunting for tomatoes, so prices at every stall creep to €4 and more kilos are sold in total.</p><p><b>One stall (Priya)</b> can't say "I charge €5". She just takes the new €4 price, buys extra crates and sells more. Since €4 is now above her usual cost per kilo, she makes <b>extra profit</b> for now.</p><p><b>A few weeks later</b> newcomers set up stalls to grab the profit. More tomatoes on the street pushes the price back to €3. Priya's profit shrinks back to "normal".</p>`,
      simple: `<p><b>Two views of the same event.</b> "Market" = the whole street. "Firm" = one stall (Priya). Here are the real numbers for the tomato heatwave.</p>
        <table class="t"><tr><th></th><th>Before</th><th>Heatwave (short run)</th><th>A few weeks later (long run)</th></tr>
        <tr><td>Price per kg</td><td>€3</td><td>€4</td><td>€3</td></tr>
        <tr><td>Stalls on the street</td><td>40</td><td>40</td><td>70</td></tr>
        <tr><td>Whole market sells</td><td>400 kg</td><td>600 kg</td><td>700 kg</td></tr>
        <tr><td>Priya sells</td><td>10 kg</td><td>15 kg</td><td>10 kg</td></tr>
        <tr><td>Priya\'s extra profit</td><td>€0</td><td>€12.50 a day</td><td>€0</td></tr></table>
        <ol><li><b>Event:</b> demand rises by 300 kg at every price (D1 → D2 on the market picture: at €3 shoppers now want 700 kg instead of 400).</li><li><b>Market, short run:</b> there aren\'t enough tomatoes at €3, so the price climbs along supply S until buyers and sellers balance at <b>€4 and 600 kg</b> (E1 → E2).</li><li><b>One stall, short run:</b> Priya can\'t set the price, she takes €4. Her extra kilo costs 0.2×q + 1 euros (MC), so she keeps going until that reaches €4: <b>q = 15 kg</b>. Her average cost there is only about €3.17, so each kilo earns about 83c profit: 15 × 0.83 ≈ <b>€12.50 a day</b> (the green box).</li><li><b>Long run:</b> other people see her profit and open 30 more stalls (supply moves right, S → S2). Price slides back to <b>€3</b>; Priya is back to 10 kg and no extra profit, but the market sells more (<b>700 kg</b>).</li></ol>
        ${tomato.market()}<div class="eqs">D1: demand before · D2: demand after the heatwave · S: supply · S2: supply once the new stalls have opened</div>${tomato.stall()}<div class="eqs">Dashed lines: the €3 and €4 prices. The stall produces where price meets MC.</div>
        <p class="muted">If demand fell instead, run it backwards: price drops, stalls lose money, some close, supply shifts left, price recovers.</p>`,
      jargon: [['Demand shifts right', 'at every price, more people want the product', 'heatwave and tomatoes'], ['Short run', 'time too short for new firms to arrive', 'this week'], ['Long run', 'time long enough for firms to enter or leave', 'next season'], ['Economic profit', 'profit above what you could earn elsewhere']]
    },
    'comp-c4': {
      plain: 'Surplus is the "bargain feeling": what buyers would have paid minus what they paid, plus what sellers got minus the least they would have accepted.',
      icon: '🎟️', stitle: 'Picture this',
      story: `<p>You would pay up to €60 for a concert ticket. You buy it for €40. You walked away €20 happier: that's your <b>consumer surplus</b>.</p><p>The organiser would have sold it for as little as €25 but got €40. That €15 extra is their <b>producer surplus</b>.</p><p>Together: €35 of "good feeling" created by one sale. Add this up across every sale in the market and you have <b>welfare</b>. A good market is one where all the worthwhile sales happen.</p>`,
      simple: `<ol><li>The <b>demand curve</b> shows the most each buyer would pay. The <b>supply curve</b> shows the least each seller would accept.</li><li><b>Consumer surplus (CS)</b> = the triangle <i>between the demand curve and the price</i> (above the price line).</li><li><b>Producer surplus (PS)</b> = the triangle <i>between the price and the supply curve</i> (below the price line).</li><li><b>Welfare</b> = CS + PS. <b>Deadweight loss</b> = a missing slice of welfare from sales that never happened.</li><li><b>Calculator trick:</b> a straight-line triangle = ½ × base × height. Base = quantity traded; height = the gap between the price and the top (demand) or bottom (supply) of the line.</li></ol>`,
      jargon: [['Consumer surplus', 'what buyers would have paid minus what they did pay', 'ticket worth €60, paid €40 → €20'], ['Producer surplus', 'what sellers received minus the least they would accept', 'sold for €40, would take €25 → €15'], ['Welfare', 'consumer surplus + producer surplus'], ['Willingness to pay (WTP)', 'the most a buyer would hand over', 'a thirsty hiker pays €5 for water']]
    },
    'comp-c5': {
      plain: 'If the government caps how many sellers can operate, the price rises, fewer trades happen and those who hold a licence win while everyone else loses.',
      icon: '🚕', stitle: 'Picture this: Dublin taxis',
      story: `<p>Imagine only 100 taxi plates are allowed in a town, though 300 drivers would happily drive. Rides become scarce, so fares rise and the 100 plate holders earn extra. A plate becomes a very valuable asset. People who want a taxi at a normal fare get no ride.</p><p>Ireland actually lived this: until 2000, taxi plates were capped. They traded for large sums. Once the cap was lifted, anyone could drive a taxi and the plates lost most of their value.</p>`,
      simple: `<ol><li><b>Before the cap:</b> anyone can enter, so the fare falls to the lowest cost of driving. Lots of rides.</li><li><b>After the cap:</b> the number of taxis is fixed (a vertical supply line). Fewer rides, higher fare.</li><li><b>Passengers lose</b> (they pay more for fewer rides).</li><li><b>Licence holders win</b> (they get the higher fare).</li><li><b>Society loses a triangle</b> (deadweight loss): rides that would have helped both driver and passenger never happen.</li></ol>`,
      jargon: [['Licence cap / quota', 'a legal limit on how many sellers or units are allowed', 'taxi plates'], ['Deadweight loss', 'the triangle of benefit nobody gets']]
    },
    'comp-c6': {
      plain: 'A market fails when it leaves value on the table, usually because someone has power, someone else pays a cost they never agreed to, or one side is kept in the dark.',
      icon: '🏭', stitle: 'Picture this',
      story: `<p>A factory makes cheap shirts and dumps dye into the river. Fishermen downstream lose their catch. The shirt price doesn\'t include that damage, so too many shirts get made. That\'s an <b>externality</b>.</p><p>Street lights help everyone, but if you pay for one, your neighbours enjoy it free. So nobody wants to pay and there are too few lights (a <b>public good</b>).</p><p>A used-car seller knows the car is a dud; you can\'t tell. Fear of buying a "lemon" drags down what buyers will pay for all cars (<b>asymmetric information</b>).</p>`,
      simple: `<p>Say "market failure" in the exam, then give three examples. A quick template:</p><ol><li><b>Definition:</b> the market doesn\'t deliver the efficient amount, often because price is above marginal cost.</li><li><b>Market power</b> (a monopoly or cartel restricts output).</li><li><b>Externality</b> (a cost or benefit lands on bystanders, like pollution).</li><li><b>Public good</b> (nobody can be excluded, so nobody pays, like street lights).</li><li><b>Asymmetric information</b> (one side knows more, like used cars).</li></ol>`,
      jargon: [['Externality', 'a side-effect on people who weren\'t part of the deal', 'noise from a nightclub'], ['Public good', 'something everyone can use and nobody can be blocked from using', 'street lights'], ['Free rider', 'someone who benefits without paying', 'the neighbour using your street light'], ['Asymmetric information', 'one side knows more than the other', 'used-car seller vs buyer']]
    }
  },
  extra: [
    { id: 'comp-r1', sub: 'cond', type: 'mcq', scn: 'You want some eggs. A farmers\' market has 30 stalls selling identical free-range eggs, and a pop-up Netflix kiosk, a single water utility and an airline with the only flight to Kerry are nearby.', q: 'Which of these is closest to a perfectly competitive market?', opts: ['The only airline flying to Kerry', 'Netflix subscriptions', 'Identical eggs from 30 market stalls', 'The single water utility'], a: 2, why: 'Many sellers of an identical product with easy entry: no seller can set the price. The airline and the water utility have no close rivals; Netflix has a unique product.' },
    { id: 'comp-r2', sub: 'cond', type: 'mcq', scn: 'Forty stalls sell identical tomatoes at €3 a kilo. Priya (one stall) tries charging €3.60 for the same tomatoes.', q: 'What most likely happens to Priya\'s sales?', opts: ['They stay the same, because shoppers don\'t check prices', 'They rise, because a higher price signals quality', 'They fall to roughly zero, because shoppers buy the identical tomato next door', 'They fall by exactly 20%'], a: 2, why: 'Identical product + many sellers + visible prices means her demand curve is flat at €3. Anything above it loses every customer.' },
    { id: 'comp-r3', sub: 'pm', type: 'num', scn: 'An ice-cream van pays €100 for its pitch on a rainy Saturday (owed whether it opens or not). If it opens, it sells €80 of ice cream and spends €50 on ingredients and helper wages.', q: 'How many euros better off is the van if it OPENS than if it stays closed?', ans: 30, unit: '€', calc: () => 80 - 50, why: 'Open: 80 − 50 − 100 = −70. Closed: −100. Opening loses €30 less. Revenue (80) covers variable cost (50), so open: the extra 30 helps pay the pitch fee.', steps: ['Open: revenue 80 − running costs 50 − pitch 100 = −70', 'Closed: just the pitch fee = −100', 'Difference: 30 (= revenue 80 − running costs 50)'] },
    { id: 'comp-r4', sub: 'shift', type: 'mcq', scn: 'A hot summer makes salads trendy. Tomato prices rise and the first stalls to expand make big profits. A year later, tomato prices are back near their old level.', q: 'What best explains the price falling back?', opts: ['The government set a price ceiling', 'New stalls entered because of the profits, so supply increased', 'Demand for tomatoes disappeared forever', 'Existing stalls agreed to lower prices'], a: 1, why: 'Free entry means profit attracts new sellers, supply shifts right, price drops until economic profit is back to zero.' },
    { id: 'comp-r5', sub: 'cs', type: 'num', scn: 'You\'d happily pay up to €5.00 for your morning flat white. The café charges €3.50 and every other café nearby charges the same.', q: 'What is your consumer surplus on that coffee (in €)?', ans: 1.5, unit: '€', calc: () => 5 - 3.5, why: 'Consumer surplus = what you\'d pay − what you paid = 5.00 − 3.50 = 1.50.', steps: ['Willingness to pay = 5.00', 'Price paid = 3.50', 'Surplus = 1.50'] },
    { id: 'comp-r6', sub: 'cap', type: 'mcq', scn: 'Before 2000 Ireland capped taxi licences, and plates traded for large sums. After the cap was lifted, anyone meeting the rules could drive a taxi.', q: 'Using the licence-cap model, why did plate values fall after the cap was lifted?', opts: ['Fares rose, so plates became less useful', 'Entry removed the extra profit earned by licence holders, so the right to operate was worth less', 'Passengers started to value taxis less', 'The government taxed taxis heavily'], a: 1, why: 'The cap created extra profit (producer surplus B). Once anyone could enter, fares fell back towards cost and the licence stopped being scarce, so it lost value. Passengers benefitted.' },
    { id: 'comp-r7', sub: 'fail', type: 'mcq', scn: 'A nightclub next to flats is loud until 4am. The club earns good money and the neighbours lose sleep, but nobody pays them for it.', q: 'Which market failure is this?', opts: ['Public good', 'Negative externality', 'Asymmetric information', 'Price ceiling'], a: 1, why: 'The club\'s activity imposes a cost on third parties who aren\'t compensated. Because the club ignores that cost, it produces more noise than society would want.' }
  ]
};
