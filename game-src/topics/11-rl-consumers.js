/* Real-life layer for Level 2: Consumers, demand & supply. */
/* Bakery numbers: D1: P = 7 - 0.05Q, D2: P = 8 - 0.05Q (+20 loaves at every price), S: P = 1 + 0.05Q, S2: P = 2.5 + 0.05Q (flour shortage). */
const bakery = () => DG.chart({
  xmax: 160, ymax: 8, xlabel: 'Loaves per day', ylabel: 'Price (€ per loaf)', alt: 'bakery demand and supply with numbers',
  lines: [{ p: [[0, 1], [140, 8]], label: 'S', c: 1, lx: 140, ly: 8 }, { p: [[0, 2.5], [110, 8]], label: 'S2', c: 3, lx: 110, ly: 8 }, { p: [[0, 7], [140, 0]], label: 'D1', c: 0, lx: 140, ly: 0.5 }, { p: [[0, 8], [160, 0]], label: 'D2', c: 2, lx: 160, ly: 0.5 }],
  pts: [{ x: 60, y: 4, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 70, y: 4.5, label: 'E2', xt: 'Q2', yt: 'P2' }, { x: 55, y: 5.25, label: 'E3', xt: 'Q3', yt: 'P3' }]
});

RL.lv.cons = {
  story: {
    title: 'The bakery on Elm Street',
    html: `<p>The Elm Street bakery sells sourdough at <b>€4 a loaf</b> and sells out most mornings around 10am.</p>
      <p>One day a food blogger raves about it. By 7am there's a queue. Twenty more people want a loaf at every price, so the baker nudges the price to <b>€4.50</b> and sells <b>70</b> loaves. That's a <b>demand shift</b>.</p>
      <p>Then a flour shortage hits and every loaf costs more to make. Fewer loaves get baked (<b>55</b>) and the price creeps to <b>€5.25</b>. That's a <b>supply shift</b>.</p>
      <p>The mayor, worried about "bread prices", caps loaves at €3. At €3 the bakery would only bake <b>10</b> loaves while <b>100</b> people want one: a shortage of 90, the queue starts at 5am, and people who'd happily pay €5 go home with nothing. A price cap doesn't create bread; it creates a queue.</p>
      <p>Meanwhile, nobody cuts back on salt when it goes up 20%: they need it. But if cinema tickets go up 20%, many stay home. How strongly people react to price changes is called <b>elasticity</b>.</p>`,
    tip: 'This level\'s four big ideas are all in the bakery: demand and supply shifts, price caps, elasticity, and how a shopper decides what to buy.'
  },
  gloss: [
    ['Demand', 'how much people would buy at each possible price.', 'at €4 you sell 100 loaves, at €6 only 60'],
    ['Supply', 'how much sellers would offer at each possible price.', 'the bakery makes more at €6 than at €3'],
    ['Equilibrium', 'the price where buyers want exactly what sellers offer.', 'the price at which the bakery just sells out']
  ],
  hints: {
    'cons-b1.0': 'Two things happen to wine: more tourists want it (demand) and a poor harvest means less is made (supply). Draw both shifts. Which way does price go for sure? Which way does quantity go: is it certain?',
    'cons-b1.1': 'Think of the bakery with a €3 cap on bread, but this time it\'s a rent cap on flats. Will landlords offer more or fewer flats? Will more or fewer people want to rent? What is left over?',
    'cons-b1.2': 'Elasticity answers: "If the price moves by 1%, by what percentage does the number of customers move?" Plug the numbers into the formula, then compare with 1 to decide if revenue rises or falls when price drops.'
  },
  card: {
    'cons-c1': {
      plain: 'When the price of a thing goes up, people buy less and sellers offer more; other changes (like taste or income) move the whole curve.',
      icon: '☕', stitle: 'Picture this',
      story: `<p>Your usual latte costs €4. If it rises to €6 you'd probably buy fewer: you <b>slide along</b> your demand curve. But if you get a pay rise, or everybody starts talking about how lattes make you productive, you'd buy more at <i>every</i> price: the <b>whole curve shifts</b>.</p><p>Rule of thumb: <b>a change in the product\'s own price slides along the curve; anything else shifts it.</b></p>`,
      simple: `<ol><li><b>Law of demand:</b> price up → people buy less (the demand curve slopes down).</li><li><b>Supply:</b> price up → sellers offer more (supply slopes up).</li><li>Own price changes → <b>slide along</b> the curve.</li><li>Anything else (income, tastes, price of substitutes, number of buyers) → <b>shift</b> the whole demand curve.</li><li>For supply, shifters are costs (flour, wages), technology, number of sellers.</li></ol>`,
      jargon: [['Substitute', 'a product you swap for another', 'tea when coffee gets expensive'], ['Complement', 'a product used together with another', 'milk with cereal'], ['Normal good', 'you buy more as income rises', 'restaurant meals'], ['Inferior good', 'you buy less as income rises', 'instant noodles']]
    },
    'cons-c2': {
      plain: 'The market price settles where the amount people want equals the amount sellers offer; shocks move it.',
      icon: '🎟️', stitle: 'Picture this',
      story: `<p>A band sells 5,000 tickets at €50 and 20,000 people want one. Too many buyers chasing too few tickets: scalpers start reselling at €200. In a market without a price cap, the price would climb until the number of people willing to pay matches the number of tickets.</p>`,
      simple: `<p><b>The bakery in real numbers.</b> At €4 the baker sells 60 loaves and sells out; that is the equilibrium (E1).</p>
        <table class="t"><tr><th></th><th>Start (E1)</th><th>Blogger raves: demand +20 (E2)</th><th>Then flour shortage: supply falls (E3)</th></tr><tr><td>Price of a loaf</td><td>€4</td><td>€4.50</td><td>€5.25</td></tr><tr><td>Loaves sold</td><td>60</td><td>70</td><td>55</td></tr></table>
        <ol><li><b>Equilibrium:</b> where demand and supply cross. Quantity wanted = quantity offered.</li><li><b>Too cheap?</b> At €3, demand D1 wants 80 loaves but the bakery offers only 40: excess demand of 40, so the price rises.</li><li><b>Too dear?</b> At €5, shoppers want 40 loaves but the bakery offers 80: excess supply, so the price falls.</li><li><b>Demand shift (blogger):</b> D1 → D2. Price AND quantity both rise (€4 → €4.50, 60 → 70).</li><li><b>Supply shift (flour):</b> S → S2. Price rises but quantity falls (€4.50 → €5.25, 70 → 55).</li><li>Both shifts at once: here price rose for sure; quantity could have gone either way (it depended on which shift was bigger).</li></ol>${bakery()}<div class="eqs">D1: demand before · D2: after the blogger · S: supply · S2: after the flour shortage</div>`,
      jargon: [['Equilibrium', 'balance point of buyers and sellers'], ['Excess demand (shortage)', 'more wanted than available', 'sold-out concert tickets'], ['Excess supply (surplus)', 'more available than wanted', 'unsold sale stock'], ['Shock', 'an unexpected event that shifts a curve', 'frost wiping out a coffee harvest']]
    },
    'cons-c3': {
      plain: 'A price ceiling is a "max price" law and creates shortages; a price floor is a "min price" law and creates surpluses.',
      icon: '🏠', stitle: 'Picture this',
      story: `<p>A city caps student rents at €600 when the natural price is €900. Lots more students want flats at €600, but fewer landlords want to rent at that price. Result: queues of 40 applicants per flat, "key money" paid under the table, and some landlords converting flats to holiday lets.</p><p>The reverse: a minimum wage above the natural wage means more people want to work than firms want to hire: a surplus of labour (unemployment for some).</p>`,
      simple: `<ol><li><b>Price ceiling</b> (maximum price) below equilibrium → buyers want more, sellers offer less → <b>shortage</b> (queues, black markets).</li><li><b>Price floor</b> (minimum price) above equilibrium → sellers offer more, buyers want less → <b>surplus</b>.</li><li>Only a <b>binding</b> price control matters. A cap above the natural price does nothing.</li><li>Some people win (those who get a flat at €600) and some lose (those who can\'t find one). Total welfare falls: a <b>deadweight loss</b>.</li></ol>`,
      jargon: [['Price ceiling', 'legal maximum price', 'rent control'], ['Price floor', 'legal minimum price', 'minimum wage'], ['Binding', 'actually changes what happens because it is set on the "wrong" side of equilibrium'], ['Shortage', 'quantity demanded exceeds quantity supplied']]
    },
    'cons-c4': {
      plain: 'Elasticity tells you how strongly people react when the price changes.',
      icon: '⛽', stitle: 'Picture this',
      story: `<p>Petrol goes up 10%. Most people still need to drive to work, so they cut maybe 2%. That's <b>inelastic</b> (a weak reaction). A cinema raises prices 10% and a third of the audience switches to streaming: <b>elastic</b> (a strong reaction).</p><p>Why it matters: if demand is inelastic, raising the price <i>raises</i> total revenue. If it\'s elastic, raising the price <i>lowers</i> revenue.</p>`,
      simple: `<ol><li><b>Formula:</b> elasticity = % change in quantity ÷ % change in price.</li><li>Ignore the minus sign for sizing: bigger than 1 = <b>elastic</b>, smaller than 1 = <b>inelastic</b>, exactly 1 = <b>unit elastic</b>.</li><li><b>What makes demand elastic?</b> Many substitutes, luxury goods, easy to delay buying, long time to adjust, big share of your budget.</li><li><b>Revenue test:</b> elastic → cutting the price raises revenue. Inelastic → raising the price raises revenue.</li><li>For a straight-line demand Q = a − bP at a given price: e = −b × P/Q.</li></ol>`,
      jargon: [['Elastic', 'quantity reacts a lot to price', 'holidays'], ['Inelastic', 'quantity barely reacts to price', 'insulin, petrol'], ['Total revenue', 'price × quantity sold', '€5 × 100 = €500'], ['% change', 'change divided by the starting value', 'from 50 to 60 is +20%']]
    },
    'cons-c5': {
      plain: 'You keep buying something until the extra enjoyment from one more is worth about what it costs.',
      icon: '🍕', stitle: 'Picture this',
      story: `<p>The first slice of pizza when you\'re hungry is amazing. The second is great. By the fourth, you barely want it. This <b>falling extra enjoyment</b> is why you stop buying at some point rather than buying pizza forever. With a fixed budget, you also compare: is the 3rd slice better value than a cinema ticket?</p>`,
      simple: `<ol><li><b>Utility</b> = your satisfaction (a score).</li><li><b>Marginal utility (MU)</b> = the extra satisfaction from one more unit. It usually falls as you have more.</li><li>With a budget, you pick the bundle that gives the highest utility you can afford.</li><li>An <b>indifference curve</b> joins all bundles that make you equally happy. Curves further from the origin are better.</li><li><b>Budget line</b>: what you can afford. Best choice = where the highest indifference curve just touches the budget line.</li></ol>`,
      jargon: [['Utility', 'a measure of satisfaction', 'how much you enjoy a pizza'], ['Marginal utility', 'extra satisfaction from one more unit', 'the 4th slice'], ['Indifference curve', 'all bundles that make you equally happy', 'pizza + cinema mixes you rate the same'], ['Budget line', 'all combinations you can afford', '€30 split between pizza and cinema']]
    }
  },
  extra: [
    { id: 'cons-r1', sub: 'ds', type: 'mcq', scn: 'Coffee costs €4 a cup. A famous study says coffee improves memory, and sales jump at every price.', q: 'What kind of change is this?', opts: ['A movement along the demand curve', 'A shift of the demand curve to the right', 'A shift of supply to the left', 'A price ceiling'], a: 1, why: 'The cause is a change in tastes/information, not the coffee\'s own price, so the whole demand curve shifts right.' },
    { id: 'cons-r2', sub: 'ds', type: 'mcq', scn: 'Your favourite sushi place raises prices from €12 to €15, so you go less often.', q: 'What happened to your demand?', opts: ['It shifted left', 'It shifted right', 'You moved up along the same demand curve (quantity demanded fell)', 'Nothing changed'], a: 2, why: 'A change in the product\'s own price moves you along the demand curve. The curve itself hasn\'t shifted.' },
    { id: 'cons-r3', sub: 'eq', type: 'mcq', scn: 'A band sells 5,000 tickets at €50, and 20,000 fans want one. Reseller sites show tickets at €200.', q: 'What does the gap between the €50 ticket and the €200 resale price tell you?', opts: ['Demand is lower than supply at €50', 'At €50 there is excess demand: the true market-clearing price is higher', 'The band set the price too high', 'Fans are irrational'], a: 1, why: 'More people want tickets than exist at €50 (excess demand). The resale price shows where demand and supply would balance without a cap.' },
    { id: 'cons-r4', sub: 'int', type: 'mcq', scn: 'A city caps flat rents at €600/month. Without the cap the market rent would be €900.', q: 'What is the most likely result?', opts: ['More flats are available, and rents fall everywhere', 'A shortage: more people want flats than landlords offer, so queues form', 'A surplus of flats', 'No change, because rents are already €900'], a: 1, why: 'A binding ceiling below equilibrium raises quantity demanded and lowers quantity supplied: a shortage, which is typically met with queues, favouritism or black-market payments.' },
    { id: 'cons-r5', sub: 'int', type: 'mcq', scn: 'A government sets a minimum price for milk above the market price to help farmers.', q: 'What does this create, and who benefits?', opts: ['A shortage; shoppers benefit', 'A surplus of milk; farmers who can sell at the higher price benefit but shoppers pay more and some milk goes unsold', 'No effect', 'A shortage; farmers benefit'], a: 1, why: 'A price floor above equilibrium means sellers want to sell more than buyers want to buy: a surplus. Some farmers gain, consumers lose, and there is a deadweight loss.' },
    { id: 'cons-r6', sub: 'elas', type: 'num', scn: 'A cinema raises its ticket price from €10 to €12 (+20%). Weekly attendance drops from 500 to 350 (−30%).', q: 'What is the price elasticity of demand? (give the negative number)', ans: -1.5, calc: () => ((350 - 500) / 500) / ((12 - 10) / 10), why: 'Elasticity = %ΔQ ÷ %ΔP = −30% ÷ 20% = −1.5. Since |−1.5| > 1, demand is elastic: revenue falls when the price rises.', steps: ['%ΔQ = (350 − 500)/500 = −30%', '%ΔP = (12 − 10)/10 = +20%', 'e = −30 ÷ 20 = −1.5'] },
    { id: 'cons-r7', sub: 'elas', type: 'mcq', scn: 'Three products all rise in price by 10%: (1) insulin for diabetics, (2) one specific brand of crisps, (3) a weekend city-break.', q: 'For which would quantity demanded most likely fall the LEAST?', opts: ['The brand of crisps, it is cheap', 'The weekend city-break, it is optional', 'Insulin, there is no substitute and it is a necessity', 'They would all fall the same'], a: 2, why: 'Few substitutes and a necessity make demand inelastic. Crisps have many substitutes; holidays can be postponed.' },
    { id: 'cons-r8', sub: 'elas', type: 'mcq', scn: 'A bus company finds demand for its service is elastic. It wants to raise total revenue.', q: 'What should it do to the fare?', opts: ['Raise it', 'Cut it, because quantity rises by a larger percentage than price falls', 'Keep it the same', 'Impossible to say'], a: 1, why: 'With elastic demand, a 1% price cut raises quantity by more than 1%, so revenue (P × Q) goes up.' },
    { id: 'cons-r9', sub: 'util', type: 'mcq', scn: 'You love pizza, but with each extra slice you enjoy it a little less. Slices cost €3 each.', q: 'Why do you stop buying at some point?', opts: ['The pizza gets more expensive', 'Marginal utility falls, until an extra slice isn\'t worth the €3 to you', 'You become poorer', 'Utility rises forever'], a: 1, why: 'Diminishing marginal utility: the extra enjoyment shrinks. You stop where the extra enjoyment is no longer worth what you pay.' }
  ]
};
