/* Real-life layer for Level 3: Firms, production & costs. */
RL.lv.firms = {
  story: {
    title: 'Maya\'s coffee cart',
    html: `<p>Maya quits her office job (she earned €40,000 a year) and starts a coffee cart. Day one: just Maya, one machine. She makes 40 coffees an hour.</p>
      <p>She hires a helper: one takes orders, one makes coffee. Output rises to 70 an hour (+30). A third person: 90 (+20). A fourth: 100 (+10). A fifth: 105 (+5). The cart is tiny, so extra people mostly bump elbows. <b>Each extra worker adds less than the last</b>: that's <b>diminishing returns</b>, and it only happens because something (the cart size) is fixed.</p>
      <p>Next year Maya rents a bigger stall with three machines and doubles her staff. Output <i>more</i> than doubles because workers can specialise. That's <b>increasing returns to scale</b>: the "long run", when everything can change.</p>
      <p>Meanwhile her costs: rent for the pitch (paid even on rainy days), plus milk and beans (more coffees, more milk). Her <b>average cost per coffee</b> falls as she makes more (the rent is shared across more cups), and then rises if the stall gets too crowded.</p>
      <p>At the end of year one: revenue €250,000, costs €200,000, so "profit" of €50,000? Economists subtract the €40,000 salary Maya gave up, leaving only €10,000 <b>economic profit</b>.</p>`,
    tip: 'Every box in the cost table (fixed, variable, average, marginal) comes from one rule: add one more cup and see how much the bill goes up.'
  },
  gloss: [
    ['Production function', 'a recipe: how much output you get from given amounts of inputs.', '1 worker + 1 machine → 40 coffees an hour'],
    ['Inputs', 'what you use to make things: labour, machines, ingredients.']
  ],
  hints: {
    'firms-b1.0': 'Diminishing returns = the cart stays the same size but you keep adding workers (one thing fixed). Returns to scale = Maya doubles EVERYTHING (cart, machines, workers). Invent a small table of numbers for each.',
    'firms-b1.1': 'Marginal cost = how much the total bill rises when you make one more coffee. Average cost = total bill ÷ number of coffees. AC is lowest exactly where MC crosses it, like a grade average that stops falling when new marks match it.',
    'firms-b1.2': 'Accounting profit ignores what Maya gave up. Subtract the €60,000 job she turned down from the bakery\'s profit to get economic profit. Is it positive or negative, and what does that say about her choice?'
  },
  card: {
    'firms-c1': {
      plain: 'The short run is "I can change some things but not everything"; the long run is "I can change anything".',
      icon: '☕', stitle: 'Picture this',
      story: `<p>Today Maya can hire an extra barista or buy more milk. She <i>can\'t</i> suddenly build a bigger café. Next year she can. "Short run" and "long run" aren\'t fixed lengths of time; they mean <b>"some inputs are stuck"</b> vs <b>"nothing is stuck"</b>.</p>`,
      simple: `<ol><li><b>Production function:</b> inputs (workers, machines) → output.</li><li><b>Short run:</b> at least one input is fixed (the building). Add more of the variable input (workers) and extra output eventually shrinks: <b>diminishing marginal returns</b>.</li><li><b>Long run:</b> every input can change (new building, more machines).</li><li>Profit = revenue − cost. A firm wants the biggest gap.</li></ol>`,
      jargon: [['Short run', 'some inputs are fixed', 'you can hire staff but not build a bigger shop'], ['Long run', 'all inputs can change', 'a new factory'], ['Marginal product', 'extra output from one more worker', 'the 4th helper adds only 10 coffees an hour']]
    },
    'firms-c2': {
      plain: 'Diminishing returns: more workers in the same space. Returns to scale: grow the whole business.',
      icon: '🍕', stitle: 'Picture this',
      story: `<p>Two different questions about a pizza shop. (1) "What if I add more cooks to my <i>one</i> kitchen?" Each extra cook adds less because they get in each other\'s way: <b>diminishing returns</b>. (2) "What if I open a second kitchen with the same number of ovens and cooks as the first?" If sales exactly double: <b>constant returns to scale</b>. If more than double: <b>increasing</b>. Less: <b>decreasing</b>.</p>`,
      simple: `<ol><li><b>Diminishing returns:</b> ONE input changes, the others fixed (short run).</li><li><b>Returns to scale:</b> ALL inputs scale by the same factor (long run).</li><li>Double all inputs: output more than doubles → <b>increasing</b>; exactly doubles → <b>constant</b>; less than doubles → <b>decreasing</b>.</li><li>Memory trick: "diminishing = one thing changes; scale = everything changes."</li></ol>`,
      jargon: [['Diminishing marginal returns', 'each extra unit of ONE input adds less than the last', 'more cooks, same oven'], ['Returns to scale', 'what happens to output when you scale up EVERYTHING', 'doubling kitchens, staff and ovens']]
    },
    'firms-c3': {
      plain: 'Total cost = bills that don\'t change with output + bills that do; "average" divides by how many you make.',
      icon: '🧾', stitle: 'Picture this',
      story: `<p>Maya pays €200 a day for her pitch whether she sells 0 or 300 coffees (<b>fixed cost</b>). Beans and milk cost €1 a cup, so they rise with sales (<b>variable cost</b>). If she makes 100 cups, total cost = 200 + 100 = €300. <b>Average cost</b> = 300 ÷ 100 = €3 a cup. At 200 cups: (200 + 200) ÷ 200 = €2 a cup: cheaper per cup because the pitch fee is spread thinner.</p>`,
      simple: `<ol><li><b>FC</b> (fixed cost): doesn\'t change with output (rent).</li><li><b>VC</b> (variable cost): grows with output (beans).</li><li><b>TC = FC + VC.</b></li><li><b>AC = TC ÷ q</b> (cost per unit). <b>AVC = VC ÷ q</b>. <b>AFC = FC ÷ q</b> (always falling).</li><li><b>MC</b> = extra cost of ONE more unit = change in TC when q rises by 1.</li></ol>`,
      jargon: [['Fixed cost (FC)', 'does not depend on how much you make', 'pitch rental'], ['Variable cost (VC)', 'rises as you make more', 'milk and beans'], ['Average cost (AC)', 'total cost ÷ quantity', '€300 for 100 cups = €3'], ['Marginal cost (MC)', 'cost of one more unit', 'the 101st coffee costs €1 extra']]
    },
    'firms-c4': {
      plain: 'The cost of the next unit tugs the average up or down, like a new grade pulling your average.',
      icon: '📝', stitle: 'Picture this',
      story: `<p>Your exam average is 60. Your next result is 40: your average falls. Your next result is 80: your average rises. Same for costs: if the cost of the <i>next</i> coffee (MC) is below the average (AC), average falls; if above, average rises. The average is at its lowest exactly where the next unit costs the same as the average.</p>`,
      simple: `<ol><li>If <b>MC &lt; AC</b>, adding a unit drags AC <b>down</b>.</li><li>If <b>MC &gt; AC</b>, adding a unit drags AC <b>up</b>.</li><li>So <b>MC crosses AC at AC\'s lowest point</b> (and AVC at its lowest point).</li><li>AFC always falls, so AC and AVC get closer as output grows.</li></ol>`,
      jargon: [['Minimum AC', 'the output where cost per unit is lowest', 'the sweet spot for the cart']]
    },
    'firms-c5': {
      plain: 'Getting bigger can make each unit cheaper or dearer; and "profit" depends on whether you count the job you gave up.',
      icon: '📦', stitle: 'Picture this',
      story: `<p>A big pizza chain buys cheese in bulk, so it pays less per kilo: <b>economies of scale</b>. A 5,000-person firm with endless meetings loses efficiency: <b>diseconomies of scale</b>. Amazon uses one warehouse for books and groceries, sharing costs: <b>economies of scope</b>.</p><p>And profit: if you quit a €40k job to run a café that nets €30k after bills, an accountant says "profit €30k". An economist says "you\'re €10k worse off than before".</p>`,
      simple: `<ol><li><b>Economies of scale:</b> average cost falls as the firm gets bigger (bulk buying, specialisation).</li><li><b>Diseconomies of scale:</b> average cost rises if the firm gets too big (coordination problems).</li><li><b>Economies of scope:</b> cost saving from making several products with shared resources.</li><li><b>Accounting profit</b> = revenue − explicit costs. <b>Economic profit</b> = accounting profit − implicit costs (like the salary given up).</li></ol>`,
      jargon: [['Economies of scale', 'cost per unit falls as you grow', 'bulk-buying cheese'], ['Economies of scope', 'cost saving from making several things together', 'Amazon\'s shared warehouses'], ['Implicit cost', 'value of what you forgo, no bill attached', 'the salary you didn\'t earn']]
    }
  },
  extra: [
    { id: 'firms-r1', sub: 'sr', type: 'mcq', scn: 'A pizza kitchen has one oven. The 3rd cook adds 20 pizzas an hour, the 4th adds 12, the 5th adds only 5 as cooks queue for the oven.', q: 'What is this called?', opts: ['Increasing returns to scale', 'Diminishing marginal returns', 'Constant returns to scale', 'Economies of scope'], a: 1, why: 'One input (cooks) increases while another (the oven) stays fixed, and the extra output gets smaller: diminishing marginal returns.' },
    { id: 'firms-r2', sub: 'rts', type: 'mcq', scn: 'A bakery doubles everything: premises, ovens, bakers and delivery vans. Output exactly doubles.', q: 'Which term describes this?', opts: ['Diminishing marginal returns', 'Constant returns to scale', 'Increasing returns to scale', 'Diseconomies of scope'], a: 1, why: 'All inputs doubled and output doubled: constant returns to scale.' },
    { id: 'firms-r3', sub: 'costs', type: 'num', scn: 'A food truck pays €200 a day to park on the pitch. Each burger costs €2 in ingredients. It sells 50 burgers.', q: 'What is the average cost per burger (€)?', ans: 6, unit: '€', calc: () => (200 + 2 * 50) / 50, why: 'TC = 200 + 2×50 = 300. AC = 300 ÷ 50 = €6.', steps: ['FC = 200, VC = 2 × 50 = 100', 'TC = 300', 'AC = 300 ÷ 50 = 6'] },
    { id: 'firms-r4', sub: 'costs', type: 'mcq', scn: 'The same food truck: fixed pitch fee €200 a day, burgers €2 in ingredients each.', q: 'Which of these is a FIXED cost?', opts: ['Buns and beef', 'The €200 pitch fee', 'The gas used per burger', 'The cheese slice on each burger'], a: 1, why: 'The pitch fee is paid regardless of burgers sold. The others rise with each burger.' },
    { id: 'firms-r5', sub: 'mcac', type: 'mcq', scn: 'At 50 burgers, average cost is €6. The 51st burger adds only €2 to total cost.', q: 'What happens to average cost when the 51st burger is made?', opts: ['It rises', 'It falls, because MC (2) is below AC (6)', 'It stays exactly the same', 'It doubles'], a: 1, why: 'Whenever MC is below AC, the new unit drags the average down.' },
    { id: 'firms-r6', sub: 'profit', type: 'num', scn: 'Maya quits a €40,000 job to run a café. In year one, revenue is €120,000 and bills (staff, ingredients, rent) are €95,000.', q: 'What is her ECONOMIC profit (€)? Use a negative number if it is a loss.', ans: -15000, unit: '€', calc: () => 120000 - 95000 - 40000, why: 'Accounting profit = 120,000 − 95,000 = 25,000. Subtract the salary given up (40,000): economic profit = −15,000. She is €15,000 worse off than if she had stayed.', steps: ['Accounting profit = 120,000 − 95,000 = 25,000', 'Implicit cost = 40,000', 'Economic profit = 25,000 − 40,000 = −15,000'] },
    { id: 'firms-r7', sub: 'profit', type: 'mcq', scn: 'A supermarket chain pays less per tin because it buys millions; another chain uses the same lorries to deliver groceries and electronics.', q: 'Which pair of terms fits (in order)?', opts: ['Economies of scope, then economies of scale', 'Economies of scale, then economies of scope', 'Diminishing returns, then constant returns', 'Diseconomies of scale both times'], a: 1, why: 'Buying in bulk lowers cost per unit as you grow: economies of scale. Sharing resources across different products: economies of scope.' }
  ]
};

/* Extra card: why cost curves are U-shaped (real numbers), and why D and S can be straight lines. */
RL.lv.firms.extraCards = [{
  after: 'firms-c4',
  card: (() => {
    const FC = 8, VC = q => q ** 3 - 6 * q ** 2 + 14 * q, MCf = q => 3 * q * q - 12 * q + 14, ACf = q => q * q - 6 * q + 14 + FC / q;
    const f1 = n => (Math.round(n * 100) / 100).toString();
    const rows = [1, 2, 3, 4, 5, 6].map(q => ({ q, vc: VC(q), tc: VC(q) + FC, mc: VC(q) - VC(q - 1), ac: (VC(q) + FC) / q }));
    const best = rows.reduce((a, b) => (b.ac < a.ac ? b : a));
    const pts = (fn, a, b, n) => { const o = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; o.push([x, fn(x)]); } return o; };
    const chart = () => DG.chart({
      xmax: 7, ymax: 24, xlabel: 'Output (batches of 10 cups per hour)', ylabel: 'Cost per batch (€)', alt: 'U-shaped MC and AC with numbers',
      lines: [{ p: pts(MCf, 0.2, 4.7, 40), label: 'MC', c: 2, lx: 4.7, ly: MCf(4.7) }, { p: pts(ACf, 0.7, 5.6, 40), label: 'AC', c: 0, lx: 5.6, ly: ACf(5.6) }],
      pts: [{ x: 3.3, y: ACf(3.3), label: '', xt: '3.3', yt: '€7.51', g: 'xy' }],
      caption: 'Table values: MC (€) 9 → 3 → 3 → 9 → 21 → 39 &nbsp;·&nbsp; AC (€) 17 → 10 → 7.67 → 8 → 10.6 → 15.3.<br>The curves are the smooth version of the same table. The lowest point of AC is at about 3.3 batches (€7.51), exactly where MC crosses it.'
    });
    const table = `<table class="t"><tr><th>Batches q</th><th>Variable cost</th><th>Total cost (FC = €8)</th><th>MC (extra cost of this batch)</th><th>AC (TC ÷ q)</th></tr>${rows.map(r => `<tr><td>${r.q}</td><td>€${r.vc}</td><td>€${r.tc}</td><td><b>€${r.mc}</b></td><td>€${f1(r.ac)}</td></tr>`).join('')}</table>`;
    const wtp = `<table class="t"><tr><th>Friend</th><th>Most they would pay for a gig ticket</th><th>If the price is €40, do they buy?</th></tr><tr><td>Ana</td><td>€50</td><td>yes</td></tr><tr><td>Ben</td><td>€45</td><td>yes</td></tr><tr><td>Cal</td><td>€40</td><td>yes</td></tr><tr><td>Dee</td><td>€35</td><td>no</td></tr><tr><td>Eli</td><td>€30</td><td>no</td></tr></table>`;
    return {
      id: 'firms-c4b', sub: 'mcac', title: 'Why are cost curves U-shaped (but demand and supply straight)?',
      html: `<p><b>Maya\'s cart in real numbers.</b> Output is in batches of 10 cups an hour. Her fixed cost is €8 an hour, and the extra (variable) cost of each batch is below.</p>${table}
        <p>Look at the <b>MC column</b>: €9, €3, €3, €9, €21, €39. It <b>falls first</b> (Maya alone is slow at everything; with a second and third person each does one job, so extra batches are cheap), then <b>rises</b> (the cart is tiny, people queue for the one machine, overtime kicks in). That is diminishing returns.</p>
        <p>Now the <b>AC column</b>: €17, €10, €7.67, €8, €10.6, €15.3. Two forces fight:</p>
        <ul><li><b>Pulling AC down:</b> the €8 fixed cost is shared across more cups (€8 ÷ 1 = €8, but €8 ÷ 4 = €2 per batch). And while MC is below AC, each new batch is cheaper than the average, so the average falls.</li><li><b>Pushing AC up:</b> once MC climbs above AC (from the 4th batch on, MC €9 &gt; AC €7.67), every new batch drags the average up.</li></ul>
        <p>That tug-of-war is what makes the average cost curve a <b>U</b>, with its bottom (about €${f1(best.ac)} at 3 batches here) exactly where MC crosses AC.</p>${chart()}
        <p><b>So why are demand and supply lines straight?</b> They mostly aren\'t. Straight lines are a <b>simplification</b> so that the maths stays easy (one slope, one intercept). Real curves are curved. Two good reasons they look like downward lines anyway:</p>
        <ul><li><b>Demand</b> adds up lots of different people, each with their own "most I would pay". Line up five friends and you get a staircase; with thousands of people the steps blur into a smooth downward line.</li></ul>${wtp}
        <ul><li><b>Supply</b> is built from many firms\' marginal cost curves (a firm\'s supply curve is its MC curve above AVC). Each of those curves is U-shaped at the bottom and rises steeply at the top, so the market supply line slopes upward too. We draw it straight to keep the maths simple.</li></ul>
        <div class="note">The key difference: <b>demand and supply describe a whole market</b> (many people, one price). <b>AC and MC describe one firm</b> producing more and more with a fixed setup (cart, kitchen, machine). One firm\'s costs have a U-shape because of fixed costs and diminishing returns; a whole market doesn\'t need one.</div>`,
      tip: 'If asked "why is AC U-shaped?", write two lines: (1) at low output fixed cost is spread over more units and MC &lt; AC, so AC falls; (2) at high output diminishing returns push MC above AC, so AC rises. MC cuts AC at its lowest point.',
      check: { type: 'mcq', q: 'At 4 batches Maya\'s average cost is €8. The 5th batch has a marginal cost of €21. What happens to her average cost when she makes the 5th batch?', opts: ['It falls, because fixed cost is spread thinner', 'It rises, because the new batch costs more (€21) than the current average (€8)', 'It stays at €8', 'It becomes €21'], a: 1, why: 'Whenever MC is above AC the average is pulled up. Her AC goes from €8 (4 batches) to €10.6 (5 batches): total cost €53 ÷ 5.' }
    };
  })()
}];
