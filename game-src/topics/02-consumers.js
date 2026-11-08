TOPICS.push((() => {
  const supplyShock = () => DG.chart({ xmax: 12, ymax: 15, xlabel: 'Quantity of coffee', ylabel: 'Price', lines: [{ p: [[0, 14], [12, 2]], label: 'D', c: 0, lx: 11.2, ly: 2.7 }, { p: [[0, 1], [10, 11]], label: 'S1', c: 1, lx: 10, ly: 11 }, { p: [[2.5, 1], [12, 10.5]], label: 'S2', c: 2, lx: 12, ly: 10.5, anchor: 'end' }], pts: [{ x: 6.5, y: 7.5, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 5.0, y: 9, label: 'E2', xt: 'Q2', yt: 'P2' }] });
  const twoShocks = () => DG.chart({
    xmax: 12, ymax: 17, xlabel: 'Quantity', ylabel: 'Price', alt: 'two shocks',
    lines: [{ p: [[0, 12], [12, 0]], label: 'D1', c: 0, lx: 11.3, ly: 0.8 }, { p: [[0, 16], [12, 4]], label: 'D2', c: 3, lx: 11.5, ly: 4.6 }, { p: [[0, 2], [10, 12]], label: 'S1', c: 1, lx: 10, ly: 12 }, { p: [[0, 5], [10, 15]], label: 'S2', c: 2, lx: 10, ly: 15 }],
    pts: [{ x: 5, y: 7, label: 'E1', xt: 'Q1', yt: 'P1' }, { x: 5.5, y: 10.5, label: 'E2', xt: 'Q2', yt: 'P2', dx: 8 }]
  });
  const ceiling = () => DG.chart({ xmax: 12, ymax: 14, xlabel: 'Quantity of rental flats', ylabel: 'Rent', lines: [{ p: [[0, 12], [12, 0]], label: 'D', c: 0, lx: 11.3, ly: 0.8 }, { p: [[0, 2], [10, 12]], label: 'S', c: 1, lx: 10, ly: 12 }, { p: [[0, 4], [12, 4]], label: 'Ceiling', c: 2, dash: true, lx: 12, ly: 4, anchor: 'end' }], pts: [{ x: 5, y: 7, label: 'E', xt: 'Q*', yt: 'P*' }, { x: 2, y: 4, label: 'Qs', g: 'x', xt: 'Qs', dy: 14, dx: -4 }, { x: 8, y: 4, label: 'Qd', g: 'x', xt: 'Qd', dy: 14, dx: -4 }] });
  const opt = () => DG.chart({
    xmax: 10, ymax: 10, xlabel: 'Pizza', ylabel: 'Burritos', alt: 'consumer optimum',
    lines: [{ p: [[0, 8], [8, 0]], label: 'Budget', c: 1, lx: 8, ly: 0.4 }, { p: [1.8, 2.2, 2.8, 3.5, 4, 5, 6, 7.5, 9].map(x => [x, 16 / x]), label: 'U', c: 0, lx: 9, ly: 16 / 9 }],
    pts: [{ x: 4, y: 4, label: 'Optimum', xt: '4', yt: '4', dx: 8, dy: -8 }]
  });

  return {
    id: 'cons', n: 2, emoji: '🛒', title: 'Consumers: Demand & Supply', blurb: 'Demand and supply, shocks, price controls, elasticity and consumer choice.',
    subs: { ds: 'Demand, supply & shifters', eq: 'Equilibrium & shocks', int: 'Price ceilings & floors', elas: 'Elasticity', util: 'Consumer choice (MU, MRS, budget)' },
    cards: [
      {
        id: 'cons-c1', sub: 'ds', title: 'Demand and supply: slide ALONG vs SHIFT',
        html: `<p>Price is a messenger: it rises when people want more than is available and falls when there is more than people want.</p>
        <ul><li><b>Law of demand:</b> price ↑ → quantity demanded ↓ (demand slopes down). <b>Supply</b> slopes up: higher price → more supplied.</li><li><b>Demand shifters:</b> tastes/information, income (normal goods ↑, inferior goods ↓), prices of related goods (substitutes: tea ↔ coffee; complements: steak ↔ sauce), population, expectations, government rules.</li><li><b>Supply shifters:</b> input costs (wages, fuel), technology, weather/harvests, taxes/subsidies/regulation, number of sellers, prices of other goods the firm could make.</li></ul>
        <div class="tip"><b>Golden rule:</b> a change in the good's <i>own price</i> moves you <b>along</b> the curve. A change in <b>anything else</b> <b>shifts</b> the whole curve. "Quantity changes" is never a reason for a shift: quantity is always the response, not the cause.</div>`,
        tip: 'Lost marks happen when students say "demand increased because price fell". Price falling → quantity demanded rises (movement along). Say "shifts" only for non-price causes.',
        check: { type: 'mcq', q: 'The price of tea rises. What happens in the market for coffee (a substitute)?', opts: ['Coffee supply shifts right', 'Coffee demand shifts right', 'Quantity of coffee demanded falls along the demand curve', 'Nothing: they are different goods'], a: 1, why: 'Consumers switch to coffee at every coffee price: the demand curve shifts right. Coffee price and quantity both rise.' }
      },
      {
        id: 'cons-c2', sub: 'eq', title: 'Equilibrium and shocks',
        html: `<p>Equilibrium is where D meets S: buyers buy what they want and sellers sell what they want. Above it: excess supply (price falls); below: excess demand (price rises). It only moves when a shock shifts a curve.</p>${supplyShock()}
        <p class="muted">A supply shock. Frost ruins part of Brazil's coffee harvest: supply shifts left (S1 → S2), price rises (P1 → P2), quantity falls (Q1 → Q2).</p>
        <table class="t"><tr><th>Shock</th><th>Price</th><th>Quantity</th></tr><tr><td>Demand ↑</td><td>↑</td><td>↑</td></tr><tr><td>Demand ↓</td><td>↓</td><td>↓</td></tr><tr><td>Supply ↑</td><td>↓</td><td>↑</td></tr><tr><td>Supply ↓</td><td>↑</td><td>↓</td></tr></table>
        <p><b>Two shocks at once (deeper):</b> one variable is certain, the other is ambiguous. Incomes rise (D ↑) and wages fall (S ↑): Q rises for sure; P is uncertain (depends on which shift is bigger). Say "uncertain" and draw both cases.</p>${twoShocks()}<p class="muted">Demand ↑ and supply ↓: price rises for sure; quantity depends on the sizes.</p>`,
        tip: 'Diagram checklist: label axes, both curves (D, S1, S2), both equilibria (E1, E2), the direction of the shift, and state P and Q changes in words.',
        check: { type: 'mcq', q: 'Demand rises and supply rises at the same time. Which is certain?', opts: ['Price rises', 'Price falls', 'Quantity rises', 'Quantity falls'], a: 2, why: 'Both shifts push quantity up. Price: demand pushes it up, supply pushes it down, so it depends on relative sizes.' }
      },
      {
        id: 'cons-c3', sub: 'int', title: 'Price ceilings and floors',
        html: `<ul><li><b>Price ceiling</b> = legal maximum <i>below</i> equilibrium (rent control, capped apples). Buyers want lots, sellers offer little → <b>shortage</b> (queues, black markets, empty shelves).</li><li><b>Price floor</b> = legal minimum <i>above</i> equilibrium (minimum wage, farm supports). Sellers offer lots, buyers want little → <b>surplus</b>.</li></ul>${ceiling()}
        <p class="muted">Rent ceiling at €4 with equilibrium €7: at the ceiling quantity demanded (Qd) exceeds quantity supplied (Qs): excess demand.</p>
        <div class="note">Not in your slides: a tax on sellers shifts supply up/left (buyers pay more, sellers receive less, quantity falls). A ceiling set <i>above</i> equilibrium, or a floor <i>below</i> it, is non-binding and changes nothing.</div>
        <p class="muted">Your lecture slides (pictures only):</p><img class="slide" src="img/t2-cons-s8-price-ceiling.png" alt="price ceiling slide"><img class="slide" src="img/t2-cons-s8-price-floor.png" alt="price floor slide">`,
        tip: 'Always check whether the control is BINDING (ceiling below / floor above equilibrium) before describing effects.',
        check: { type: 'mcq', q: 'A price floor set BELOW the equilibrium price will…', opts: ['create a surplus', 'create a shortage', 'have no effect: it is non-binding', 'shift the supply curve'], a: 2, why: 'The market clears at a price above the floor, so the floor never bites.' }
      },
      {
        id: 'cons-c4', sub: 'elas', title: 'Elasticity: how sensitive are people?',
        html: `<div class="formula">e = %ΔQ / %ΔP = (ΔQ/ΔP) × (P/Q)   ·   Linear demand Q = a − bP → e = −b × P/Q</div>
        <table class="t"><tr><th>e</th><th>Name</th><th>Meaning</th></tr><tr><td>e &lt; −1</td><td>Elastic</td><td>Quantity reacts more than price</td></tr><tr><td>e = −1</td><td>Unitary</td><td>Spending constant</td></tr><tr><td>−1 &lt; e &lt; 0</td><td>Inelastic</td><td>Quantity reacts less than price (petrol, insulin)</td></tr><tr><td>0</td><td>Perfectly inelastic</td><td>Vertical demand</td></tr><tr><td>−∞</td><td>Perfectly elastic</td><td>Horizontal demand (one wheat farmer\'s demand)</td></tr></table>
        <div class="ex"><b>Lecture example:</b> bus fare falls from 80c to 70c (−12.5%), journeys rise 40,000 → 60,000 (+50%). e = 50 / −12.5 = −4: elastic. On a straight-line demand, elasticity changes: elastic at the top, unitary at the midpoint, inelastic at the bottom.</div>
        <p><b>Revenue link (deeper):</b> elastic → cutting price raises revenue; inelastic → raising price raises revenue (OPEC, cigarette taxes); unitary → no change. <b>Determinants:</b> substitutes, necessity vs luxury, budget share, time (more elastic in the long run). Other elasticities: income (+ normal, − inferior), cross-price (+ substitutes, − complements).</p>`,
        tip: 'Numerical recipe: find Q at the given P first, then e = (slope in Q per €1) × P/Q. The sign is negative for normal demand; quote the magnitude when comparing.',
        check: { type: 'num', q: 'Demand is Q = 120 − 4P. At P = 10, what is the price elasticity of demand?', ans: -0.5, tol: 0.01, calc: () => -4 * 10 / (120 - 40), why: 'Q = 120 − 40 = 80. e = −b × P/Q = −4 × 10/80 = −0.5: inelastic.', steps: ['Q at P = 10: 120 − 40 = 80', 'e = −4 × (10 / 80)', 'e = −0.5 (inelastic, |e| < 1)'] }
      },
      {
        id: 'cons-c5', sub: 'util', title: 'Consumer choice',
        html: `<ul><li><b>Utility:</b> a score for how much you like a bundle; consumers maximise utility subject to their budget. <b>More is better</b> (non-satiation).</li><li><b>Indifference curve:</b> all bundles you like equally. Further out = better. Curves slope down, never cross, and are convex.</li><li><b>Marginal utility (MU):</b> extra satisfaction from one more unit, usually falling.</li><li><b>MRS</b> = how much of one good you'd give up for one more of the other = slope of the indifference curve = ratio of marginal utilities. Falls as you move along (convexity).</li><li><b>Budget line:</b> P<sub>B</sub>·B + P<sub>Z</sub>·Z = Y, slope −P<sub>Z</sub>/P<sub>B</sub>. Income ↑ shifts it out in parallel; a price change rotates it.</li></ul>${opt()}
        <p><b>Optimum (deeper):</b> the budget line just touches the highest reachable indifference curve: <b>MRS = price ratio</b>, or <b>MU<sub>Z</sub>/P<sub>Z</sub> = MU<sub>B</sub>/P<sub>B</sub></b>: the last euro spent on each good gives the same happiness. If pizza gives 4 utils per € and burritos 2, shift spending to pizza until equal.</p>`,
        tip: 'Two bundles on the same indifference curve give the same utility. Higher curve = preferred.',
        check: { type: 'mcq', q: 'MU of good X = 12, price of X = €4; MU of good Y = 3, price of Y = €2. To raise utility the consumer should…', opts: ['buy more Y and less X', 'buy more X and less Y', 'change nothing', 'buy only Y'], a: 1, why: 'MU per euro: X = 12/4 = 3, Y = 3/2 = 1.5. X gives more happiness per euro, so shift spending to X until the ratios equalise (as MU of X falls).' }
      }
    ],
    questions: [
      { id: 'cons-q1', sub: 'ds', skip: true, type: 'mcq', q: 'The price of coffee falls. This causes…', opts: ['a rightward shift of the coffee demand curve', 'a movement along the demand curve to a higher quantity demanded', 'a leftward shift of the supply curve', 'no change in quantity demanded'], a: 1, why: 'Own-price changes move you along the curve. Only non-price factors shift it.' },
      { id: 'cons-q2', sub: 'ds', skip: true, type: 'mcq', q: 'Incomes fall. For an INFERIOR good such as instant noodles, demand will…', opts: ['fall', 'rise', 'be unchanged', 'become perfectly elastic'], a: 1, why: 'Inferior goods are bought more as income falls: demand shifts right.' },
      { id: 'cons-q3', sub: 'ds', skip: true, type: 'mcq', q: 'Which of these shifts the SUPPLY curve of bread to the left?', opts: ['A rise in the price of bread', 'A rise in the price of flour', 'A rise in consumer incomes', 'A fall in the price of butter'], a: 1, why: 'Input costs are supply shifters: dearer flour raises cost of production, reducing supply at every price. A change in bread\'s own price just moves along the curve.' },
      { id: 'cons-q4', sub: 'eq', skip: true, type: 'mcq', q: 'A storm destroys part of the olive harvest. In the olive-oil market…', opts: ['price rises, quantity falls', 'price falls, quantity rises', 'price and quantity both rise', 'price rises, quantity unchanged'], a: 0, why: 'Supply shifts left: higher price, lower quantity traded.' },
      { id: 'cons-q5', sub: 'eq', skip: true, type: 'num', q: 'Qd = 100 − 2P and Qs = 20 + 2P. What is the equilibrium price (€)?', ans: 20, calc: () => (100 - 20) / 4, why: 'Set Qd = Qs: 100 − 2P = 20 + 2P → 80 = 4P → P = 20 (Q = 60).', steps: ['100 − 2P = 20 + 2P', '80 = 4P', 'P = 20; Q = 60'] },
      { id: 'cons-q6', sub: 'eq', skip: true, type: 'mcq', q: 'Incomes rise (demand ↑) and a new technology lowers costs (supply ↑). What happens to price and quantity?', opts: ['Both rise for sure', 'Quantity rises; price is ambiguous', 'Price rises; quantity is ambiguous', 'Both fall'], a: 1, why: 'Both shifts raise quantity. Demand pushes price up, supply pushes it down, so price depends on which shift is larger.' },
      { id: 'cons-q7', sub: 'int', skip: true, type: 'mcq', q: 'A binding price ceiling (below equilibrium) in the rental market causes…', opts: ['a surplus of flats', 'a shortage of flats', 'higher rents', 'no change'], a: 1, why: 'At the capped price, quantity demanded exceeds quantity supplied: a shortage, with queues and black-market side payments.' },
      { id: 'cons-q8', sub: 'elas', skip: true, type: 'num', q: 'Demand is Q = 200 − 10P. At P = 12, what is the price elasticity of demand?', ans: -1.5, tol: 0.02, calc: () => -10 * 12 / (200 - 120), why: 'Q = 200 − 120 = 80. e = −10 × 12/80 = −1.5: elastic.', steps: ['Q = 80', 'e = −10 × (12/80) = −1.5'] },
      { id: 'cons-q9', sub: 'elas', skip: true, type: 'mcq', q: 'Demand for a product is elastic. A firm cuts its price. Total revenue will…', opts: ['fall', 'rise', 'stay constant', 'be zero'], a: 1, why: 'The % rise in quantity exceeds the % fall in price, so P × Q rises.' },
      { id: 'cons-q10', sub: 'util', skip: true, type: 'mcq', q: 'Two bundles lie on the same indifference curve. The consumer…', opts: ['prefers the one with more of good X', 'is indifferent between them', 'prefers the cheaper one', 'cannot compare them'], a: 1, why: 'An indifference curve is the set of bundles giving equal utility.' },
      { id: 'cons-q11', sub: 'elas', type: 'num', q: 'Price falls from €5.00 to €4.00 (−20%) and weekly quantity rises from 1,000 to 1,300 (+30%). What is the elasticity?', ans: -1.5, tol: 0.01, calc: () => 30 / -20, why: 'e = %ΔQ / %ΔP = 30 / −20 = −1.5: elastic.' },
      { id: 'cons-q12', sub: 'elas', type: 'mcq', q: 'Petrol has inelastic short-run demand. If a government raises the fuel tax, total tax-inclusive spending on petrol will most likely…', opts: ['fall sharply', 'rise or barely change, since quantity falls less than price rises', 'be unchanged exactly', 'become zero'], a: 1, why: 'Inelastic: %ΔQ < %ΔP, so spending (P × Q) rises. This is why governments love taxing inelastic goods.' },
      { id: 'cons-q13', sub: 'int', type: 'tf', q: 'True or false (and why): a price ceiling set ABOVE the equilibrium price causes a shortage.', a: false, why: 'False. A ceiling above equilibrium is non-binding: the market clears below it and nothing changes.' },
      { id: 'cons-q14', sub: 'eq', type: 'num', q: 'Supply is Qs = 20 + 2P. Demand rises from Qd = 100 − 2P to Qd = 120 − 2P. What is the new equilibrium price (€)?', ans: 25, calc: () => (120 - 20) / 4, why: '120 − 2P = 20 + 2P → 100 = 4P → P = 25 (up from 20).' },
      { id: 'cons-q15', sub: 'util', type: 'mcq', q: 'Why can\'t two indifference curves of the same consumer cross?', opts: ['Because prices differ', 'Because a crossing point would imply one bundle gives two different utility levels, contradicting "more is better"', 'Because budgets are fixed', 'They can cross'], a: 1, why: 'A crossing would put bundles with different amounts on the same curve, violating non-satiation/transitivity.' },
      { id: 'cons-q16', sub: 'elas', type: 'mcq', q: 'The cross-price elasticity between Uber rides and taxi rides is positive. They are…', opts: ['complements', 'substitutes', 'inferior goods', 'unrelated'], a: 1, why: 'When the price of one rises, demand for the other rises: substitutes (negative cross elasticity would mean complements).' },
      { id: 'cons-q17', sub: 'ds', type: 'tf', q: 'True or false (and why): a fall in the price of oil shifts the supply curve of oil to the left.', a: false, why: 'False. A change in the good\'s own price moves along the supply curve (lower quantity supplied). Shifts need non-price causes (costs, technology, etc.).' }
    ],
    boss: {
      title: 'The Price Signal Boss', minutes: 36,
      briefing: 'A 30-mark question: a two-shock headline, a price control diagram and an elasticity calculation with interpretation.',
      questions: [{
        id: 'cons-b1', title: 'Question: Consumers and markets',
        parts: [
          {
            label: 'a', marks: 10, q: 'Consider the headline: <i>"Wine prices climb as tourism rebounds and a poor harvest cuts output."</i> Use a clearly labelled market model to show and explain the headline. What can you say with certainty about price and quantity?',
            model: '<ul><li><b>Two shocks:</b> tourism rebounds → <b>demand shifts right</b> (D1 → D2: more consumers/tastes). Poor harvest → <b>supply shifts left</b> (S1 → S2: weather).</li><li><b>Price:</b> both shifts push price <b>up</b>: certain. Matches the headline.</li><li><b>Quantity:</b> demand pushes it up, supply pushes it down: <b>ambiguous</b>; depends on relative size. If supply shifts more → Q falls; if demand shifts more → Q rises.</li><li>Draw labelled axes, D1, D2, S1, S2, E1, E2 (ideally both cases or state the ambiguity).</li></ul>',
            mdg: twoShocks,
            rubric: [['Labelled diagram with D1, D2, S1, S2 and E1, E2', 3], ['Demand shift right with reason', 2], ['Supply shift left with reason', 2], ['Price certainly rises', 1], ['Quantity ambiguous and why', 2]]
          },
          {
            label: 'b', marks: 10, q: 'The government caps rents below the market level. Using a diagram, explain the effects on the quantity of flats rented, shortage, and who gains and loses.',
            model: '<ul><li>Diagram: D, S, equilibrium E (P*, Q*), ceiling P<sub>c</sub> &lt; P* (binding).</li><li>At P<sub>c</sub>: quantity supplied Qs &lt; Q* &lt; quantity demanded Qd → <b>shortage</b> (Qd − Qs). Only Qs flats are rented (fewer than before).</li><li><b>Winners:</b> tenants who get a flat at the lower rent. <b>Losers:</b> landlords (lower rents, less supply), tenants who can\'t find a flat (queues, black-market payments, lower quality, discrimination).</li><li>Deadweight loss: trades between Qs and Q* that would benefit both sides do not happen.</li></ul>',
            mdg: ceiling,
            rubric: [['Diagram: D, S, E, ceiling below P*', 3], ['Shortage identified (Qd > Qs) and rented quantity falls', 3], ['Gainers and losers', 2], ['DWL / black markets / quality effects', 2]]
          },
          {
            label: 'c', marks: 10, q: 'Demand for a streaming service is Q = 200 − 10P (thousand subscriptions, P in €). (i) Compute the elasticity at P = €12 and interpret it. (ii) If the firm cuts price to €10, what happens to total revenue? (iii) Give two factors that make demand more elastic.',
            model: '<ul><li><b>(i)</b> Q = 200 − 120 = 80. e = −10 × 12/80 = <b>−1.5</b> → <b>elastic</b>: quantity falls by 1.5% for every 1% price rise.</li><li><b>(ii)</b> At P = 12: R = 12 × 80 = €960k. At P = 10: Q = 100, R = €1,000k. <b>Revenue rises by €40k</b> (since demand is elastic, the quantity gain outweighs the price cut).</li><li><b>(iii)</b> More substitutes (other streamers); luxury rather than necessity; larger budget share; longer time horizon.</li></ul>',
            rubric: [['Q = 80 and e = −1.5 computed correctly', 3], ['Interpretation: elastic, |e| > 1', 2], ['Revenue 960 → 1000 with link to elasticity', 3], ['Two valid determinants', 2]]
          }
        ]
      }]
    }
  };
})());
