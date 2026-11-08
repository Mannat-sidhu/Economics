TOPICS.push((() => {
  const pts = (fn, a, b, n) => { const o = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; o.push([x, fn(x)]); } return o; };
  const MC = q => 3 * q * q - 12 * q + 14, AVC = q => q * q - 6 * q + 14, AC = q => AVC(q) + 8 / q;
  const curves = () => DG.chart({ xmax: 5, ymax: 20, xlabel: 'Quantity', ylabel: 'Cost per unit (€)', alt: 'MC, AC, AVC', lines: [{ p: pts(MC, 0.3, 4.4, 40), label: 'MC', c: 2, lx: 4.4, ly: 19.3 }, { p: pts(AC, 1.0, 4.9, 40), label: 'AC', c: 0, lx: 4.9, ly: AC(4.9) }, { p: pts(AVC, 0.2, 4.9, 40), label: 'AVC', c: 3, lx: 4.9, ly: AVC(4.9) }], pts: [{ x: 3.35, y: 7.5, label: 'min AC', g: 'x', dx: -50, dy: 18 }, { x: 3, y: 5, label: 'min AVC', g: '', dx: -50, dy: 16 }] });
  const rts = () => DG.chart({ xmax: 10, ymax: 12, xlabel: 'Output', ylabel: 'Long-run AC', alt: 'economies of scale', lines: [{ p: pts(q => 2 + 0.25 * (q - 5) ** 2 * (q < 5 ? 1 : 0.9), 0.8, 9.5, 40), label: 'LRAC', c: 0, lx: 9.5, ly: 2 + 0.25 * 4.5 ** 2 * 0.9 }], texts: [{ x: 2, y: 3.6, t: 'economies of scale', cls: 'small' }, { x: 5, y: 1.2, t: 'min efficient scale', cls: 'small' }, { x: 8.2, y: 4.8, t: 'diseconomies', cls: 'small' }] });
  const costTable = '<table class="t"><tr><th>Output q</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><th>Total cost (€)</th><td>20</td><td>30</td><td>38</td><td>44</td><td>52</td><td>65</td><td>82</td></tr></table>';

  return {
    id: 'firms', n: 3, emoji: '🏗️', title: 'Firms: Production & Costs', blurb: 'Short vs long run, diminishing returns, returns to scale, the cost family and MC vs AC.',
    subs: { sr: 'Short run, MP/AP & diminishing returns', rts: 'Returns to scale', costs: 'The cost family', mcac: 'MC vs AC', profit: 'Profit & scale' },
    cards: [
      {
        id: 'firms-c1', sub: 'sr', title: 'Production: short run vs long run',
        html: `<p>A firm is a machine that turns inputs into outputs; it wants the biggest gap between revenue and cost. <b>Profit π = R − C</b>, and the <b>production function q = f(L, K)</b> gives the maximum output from given inputs.</p>
        <ul><li><b>Short run:</b> at least one input is fixed (you can hire more baristas today but can't build a bigger café).</li><li><b>Long run:</b> all inputs can change.</li><li><b>Marginal product</b> MP<sub>L</sub> = Δq/ΔL. <b>Average product</b> AP<sub>L</sub> = q/L. When MP &gt; AP, AP rises; when MP &lt; AP, AP falls.</li><li><b>Diminishing marginal returns (short run):</b> keep adding workers to a fixed kitchen and each one eventually adds <i>less</i>. Output still rises, but at a decreasing rate.</li></ul>`,
        tip: 'Careful wording: diminishing returns means output rises at a DIMINISHING RATE, not that output falls.',
        check: { type: 'mcq', q: 'In the short run, as a firm hires more labour with capital fixed, diminishing marginal returns means…', opts: ['output eventually falls to zero', 'each extra worker eventually adds less extra output than the previous one', 'average cost always rises', 'the long run gets shorter'], a: 1, why: 'Output still increases (while MP > 0) but by smaller and smaller amounts, because workers share fixed capital.' }
      },
      {
        id: 'firms-c2', sub: 'rts', title: 'Returns to scale: scale up EVERYTHING',
        html: `<p>Returns to scale is a <b>long-run</b> idea: multiply <i>all</i> inputs by the same factor.</p>
        <ul><li>Double all inputs → output <b>more</b> than doubles: <b>increasing</b> returns.</li><li>… output <b>exactly</b> doubles: <b>constant</b> returns.</li><li>… output <b>less</b> than doubles: <b>decreasing</b> returns.</li></ul>
        <div class="note"><b>Don't mix them up.</b> Diminishing returns: ONE input varies, the rest fixed (short run). Returns to scale: ALL inputs vary together (long run).</div>
        <div class="ex">A bakery doubles ovens, staff and floor space and output goes up 2.4×: increasing returns to scale. Adding a third baker to the same one oven and getting less extra bread: diminishing marginal returns.</div>`,
        tip: 'Test: put numbers in. If all inputs ×2 and output ×1.7 → decreasing returns to scale.',
        check: { type: 'mcq', q: 'A farm uses 10 acres and 1 tractor to produce 1,000 bushels. With 30 acres and 3 tractors it produces 2,700 bushels. This shows…', opts: ['constant returns to scale', 'increasing returns to scale', 'decreasing returns to scale', 'diminishing marginal returns'], a: 2, why: 'All inputs ×3 but output only ×2.7: decreasing returns to scale. (Be careful: if only acres had increased, it would be about diminishing marginal returns.)' }
      },
      {
        id: 'firms-c3', sub: 'costs', title: 'The cost family',
        html: `<table class="t"><tr><th>Cost</th><th>Formula</th><th>In plain English</th></tr>
        <tr><td>Fixed cost FC</td><td>does not vary with q</td><td>Rent: you pay it even if you sell nothing</td></tr>
        <tr><td>Variable cost VC</td><td>rises with q</td><td>Flour, hourly wages</td></tr>
        <tr><td>Total cost TC</td><td>FC + VC</td><td>Everything</td></tr>
        <tr><td>Average fixed cost AFC</td><td>FC / q</td><td>Falls for ever as q grows</td></tr>
        <tr><td>Average variable cost AVC</td><td>VC / q</td><td>U-shaped</td></tr>
        <tr><td>Average cost AC</td><td>TC / q = AFC + AVC</td><td>Cost per unit, U-shaped</td></tr>
        <tr><td>Marginal cost MC</td><td>ΔTC/Δq = ΔVC/Δq</td><td>Cost of the NEXT unit</td></tr></table>
        <div class="ex"><b>Example:</b> TC = 50 + 2q. FC = 50, VC = 2q, MC = 2 (constant), AC at q = 10 is (50 + 20)/10 = 7. Since FC doesn't change with output, <b>a rise in rent raises AC but leaves MC unchanged</b>.</div>`,
        tip: 'MC = slope of TC = slope of VC. Fixed costs never appear in MC.',
        check: { type: 'num', q: 'TC = 100 + 5q + q². What is the marginal cost of producing the 10th unit, i.e. TC(10) − TC(9)?', ans: 24, calc: () => (100 + 50 + 100) - (100 + 45 + 81), why: 'TC(10) = 100 + 50 + 100 = 250; TC(9) = 100 + 45 + 81 = 226. MC = 24. (Calculus approximation at q = 10: 5 + 2×10 = 25.)', steps: ['TC(10) = 250', 'TC(9) = 226', 'MC = 250 − 226 = 24'] }
      },
      {
        id: 'firms-c4', sub: 'mcac', title: 'MC pulls the averages',
        html: `<p>The marginal cost curve <b>cuts AVC and AC at their lowest points</b>. When MC is below the average, the average falls; when MC is above, the average rises (a low new mark drags your grade average down).</p>${curves()}
        <ul><li>If <b>AC is falling</b>, MC &lt; AC.</li><li>At <b>minimum AC</b>, MC = AC.</li><li>If <b>AC is rising</b>, MC &gt; AC.</li></ul>
        <p>AFC falls forever, which is why AC and AVC converge as q grows. The gap between AC and AVC is AFC.</p>`,
        tip: 'Whenever you draw cost curves: MC crosses AC and AVC at their minimum points. Examiners look for this.',
        check: { type: 'mcq', q: 'If average cost is falling as output rises, then marginal cost must be…', opts: ['above average cost', 'below average cost', 'equal to average cost', 'zero'], a: 1, why: 'The average falls only when each new unit costs less than the current average. MC is below AC until AC\'s minimum, where MC = AC.' }
      },
      {
        id: 'firms-c5', sub: 'profit', title: 'Scale, scope and "real" profit',
        html: `<ul><li><b>Economies of scale:</b> long-run AC falls as output grows (specialisation, bulk buying). <b>Diseconomies:</b> AC rises when a firm is too big (coordination fails). <b>Economies of scope:</b> AC falls from making several products with shared resources (Amazon's warehouses for books, groceries, electronics).</li></ul>${rts()}
        <p><b>Economic vs accounting profit:</b> economic cost = explicit + implicit. A business with revenue €100k and explicit costs €40k looks like €60k profit. If the owner gave up a €50k job, <b>economic profit = €10k</b>.</p>
        <div class="formula">Economic profit = revenue − explicit costs − implicit costs (opportunity cost of owner's time & money)</div>
        <p><b>Profit rule:</b> if MR &gt; MC produce more; if MR &lt; MC produce less; profit is maximised at <b>MR = MC</b>.</p>`,
        tip: 'Zero economic profit ≠ failure: owners earn exactly their next-best alternative, so they stay.',
        check: { type: 'num', q: 'A café has revenue €300k and explicit costs €180k. The owner gave up a €70k salary to run it. What is the economic profit (€k)?', ans: 50, calc: () => 300 - 180 - 70, why: 'Accounting profit = 300 − 180 = 120. Subtract the implicit cost (70): economic profit = 50.', steps: ['Accounting profit: 300 − 180 = 120', 'Minus implicit cost 70', 'Economic profit = 50'] }
      }
    ],
    questions: [
      { id: 'firms-q1', sub: 'sr', skip: true, type: 'mcq', q: 'The law of diminishing marginal returns says that in the short run, as more labour is hired…', opts: ['total output falls', 'output increases at a decreasing rate', 'the firm moves into the long run', 'labour costs fall'], a: 1, why: 'Fixed capital is shared by more workers, so each extra worker adds less than the last.' },
      { id: 'firms-q2', sub: 'sr', skip: true, type: 'mcq', q: 'In the long run, a firm\'s inputs are…', opts: ['all fixed', 'all variable', 'only capital is variable', 'only labour is variable'], a: 1, why: 'The long run is defined as the period over which ALL inputs can be changed.' },
      { id: 'firms-q3', sub: 'rts', skip: true, type: 'mcq', q: 'A firm triples all inputs and output rises by a factor of 2.5. The firm has…', opts: ['increasing returns to scale', 'constant returns to scale', 'decreasing returns to scale', 'diminishing marginal returns'], a: 2, why: 'Inputs ×3, output ×2.5 (< 3): decreasing returns to scale. It is a statement about scaling ALL inputs.' },
      { id: 'firms-q4', sub: 'costs', skip: true, type: 'num', q: 'TC = 80 + 3q. What is average cost at q = 10 (€)?', ans: 11, calc: () => (80 + 30) / 10, why: 'TC(10) = 110, so AC = 110/10 = 11.', steps: ['TC = 80 + 30 = 110', 'AC = 110 / 10 = 11'] },
      { id: 'firms-q5', sub: 'costs', skip: true, type: 'num', q: 'TC = 100 + 4q + q². Marginal cost of the 10th unit, TC(10) − TC(9)?', ans: 23, calc: () => (100 + 40 + 100) - (100 + 36 + 81), why: 'TC(10) = 240, TC(9) = 217 → MC = 23.' },
      { id: 'firms-q6', sub: 'mcac', skip: true, type: 'mcq', q: 'If average cost is rising, marginal cost is…', opts: ['below average cost', 'above average cost', 'equal to average cost', 'zero'], a: 1, why: 'A rising average requires the marginal (new) unit to cost more than the average.' },
      { id: 'firms-q7', sub: 'costs', skip: true, type: 'mcq', q: 'A yoga studio\'s monthly rent rises by €200 (a fixed cost). Its marginal cost of one more class…', opts: ['rises by €200', 'is unchanged', 'rises by €200 divided by the number of classes', 'falls'], a: 1, why: 'Fixed costs don\'t depend on output so they don\'t enter MC. AC rises, MC doesn\'t.' },
      { id: 'firms-q8', sub: 'profit', skip: true, type: 'num', q: 'Revenue is €420k, explicit costs €250k, and the owner forgoes a €90k salary. Economic profit (€k)?', ans: 80, calc: () => 420 - 250 - 90, why: '420 − 250 − 90 = 80.' },
      { id: 'firms-q9', sub: 'costs', skip: true, type: 'mcq', q: 'Average fixed cost…', opts: ['is U-shaped', 'rises as output rises', 'falls continuously as output rises', 'equals marginal cost'], a: 2, why: 'AFC = FC/q: the same rent is spread over more units.' },
      { id: 'firms-q10', sub: 'sr', skip: true, type: 'mcq', q: 'When marginal product of labour is above average product, average product…', opts: ['rises', 'falls', 'is unchanged', 'is zero'], a: 0, why: 'The marginal worker adds more than the average, so the average rises (same logic as MC vs AC).' },
      { id: 'firms-q11', sub: 'profit', type: 'mcq', q: 'Which is an example of economies of SCOPE?', opts: ['A brewery doubling output of one beer and lowering unit cost', 'Amazon using its warehouses and delivery network for books, groceries and electronics', 'A bakery adding a second oven and getting the same output per oven', 'A firm facing rising unit costs as it grows'], a: 1, why: 'Scope = lower cost from producing several products using shared resources. Scale = lower cost from producing more of one.' },
      { id: 'firms-q12', sub: 'sr', type: 'tf', q: 'True or false (and why): in the long run a firm has no fixed costs.', a: true, why: 'True. In the long run all inputs (including plant and leases) can be adjusted, so no cost is fixed.' },
      { id: 'firms-q13', sub: 'costs', type: 'num', q: 'TC = 60 + 4q + q². What is average VARIABLE cost at q = 6 (€)?', ans: 10, calc: () => (4 * 6 + 36) / 6, why: 'VC = 4q + q² = 24 + 36 = 60. AVC = 60/6 = 10.' },
      { id: 'firms-q14', sub: 'sr', type: 'num', q: 'A workshop with 4 workers produces 60 units. What is the average product of labour?', ans: 15, calc: () => 60 / 4, why: 'AP = q / L = 60 / 4 = 15 units per worker.' },
      { id: 'firms-q15', sub: 'profit', type: 'mcq', q: 'MR > MC at the current output. A profit-maximising firm should…', opts: ['increase output', 'decrease output', 'shut down', 'keep output unchanged'], a: 0, why: 'The next unit adds more revenue than cost, so profit rises by producing it. Keep expanding until MR = MC.' },
      { id: 'firms-q16', sub: 'mcac', type: 'mcq', q: 'At the output where AC is at its minimum…', opts: ['MC > AC', 'MC < AC', 'MC = AC', 'AFC = 0'], a: 2, why: 'MC cuts AC from below at AC\'s lowest point.' },
      { id: 'firms-q17', sub: 'costs', type: 'num', q: 'TC = 50 + 2Q. What is average cost at Q = 25 (€)?', ans: 4, calc: () => (50 + 50) / 25, why: 'TC(25) = 100; AC = 4. (MC is a constant 2 so AC falls towards 2 as Q grows.)' }
    ],
    boss: {
      title: 'The Cost Curve Boss', minutes: 36,
      briefing: 'A 30-mark question: theory contrasts, a cost table to complete and interpret, and economic profit.',
      questions: [{
        id: 'firms-b1', title: 'Question: Production and costs',
        parts: [
          {
            label: 'a', marks: 10, q: 'Distinguish between diminishing marginal returns and returns to scale. Use a numerical example for each.',
            model: '<ul><li><b>Diminishing marginal returns (short run):</b> at least one input fixed; adding more of a variable input (labour) eventually adds less and less extra output. Example: a kitchen with 1 oven: 1st chef adds 10 pizzas/hr, 2nd adds 8, 3rd adds 4, 4th adds 1: output still rises but at a diminishing rate.</li><li><b>Returns to scale (long run):</b> ALL inputs scaled by the same factor. Example: double ovens, chefs and space; output goes 100 → 230 (increasing), → 200 (constant) or → 170 (decreasing).</li><li><b>Key difference:</b> one factor varies vs all; short vs long run. They can coexist (a firm can have diminishing marginal returns to labour and constant returns to scale).</li><li>Economies of scale relate to returns to scale: with increasing returns, LRAC falls.</li></ul>',
            rubric: [['Diminishing returns defined (short run, fixed input, smaller extra output)', 2], ['Numerical/real example of diminishing returns', 2], ['Returns to scale defined (all inputs, long run, 3 types)', 2], ['Numerical/real example of returns to scale', 2], ['Clear statement of the difference / link to cost curves', 2]]
          },
          {
            label: 'b', marks: 12, q: 'A firm\'s total cost is: q = 0: €20, 1: €30, 2: €38, 3: €44, 4: €52, 5: €65, 6: €82. (i) State fixed cost and compute MC and AC for q = 1 to 6. (ii) At what output is AC lowest and what is the relationship between MC and AC there? (iii) Explain why AC falls initially and then rises.',
            svg: () => costTable,
            model: '<ul><li><b>(i)</b> FC = €20 (cost at q = 0). MC: 10, 8, 6, 8, 13, 17. AC: 30, 19, 14.67, 13, 13, 13.67.</li><li><b>(ii)</b> AC is lowest (€13) at q = 4–5. MC(5) = 13 = AC: MC cuts AC at its minimum. Before that, MC &lt; AC (AC falling); after (q = 6), MC = 17 &gt; AC = 13.67 (AC rising).</li><li><b>(iii)</b> AC = AFC + AVC. Initially AFC falls fast (fixed cost spread over more units) and MC is low (specialisation), so AC falls. Eventually diminishing marginal returns push MC up; when MC exceeds AC the average rises.</li></ul>',
            mdg: () => '<div class="legend">Check: MC = TC(q) − TC(q−1); AC = TC/q</div>' + curves(),
            rubric: [['FC = 20', 1], ['MC values correct (10, 8, 6, 8, 13, 17)', 3], ['AC values correct (30, 19, 14.67, 13, 13, 13.67)', 3], ['Min AC at q = 4/5 with MC = AC there', 2], ['AFC spreading + diminishing returns explanation', 3]]
          },
          {
            label: 'c', marks: 8, q: 'Maya quits a €60,000 job to open a bakery. In year one revenue is €250,000, wages €110,000, ingredients €60,000, rent €30,000. (i) Compute accounting profit and economic profit. (ii) Should Maya continue? Explain using opportunity cost.',
            model: '<ul><li><b>(i)</b> Accounting profit = 250 − (110 + 60 + 30) = <b>€50,000</b>. Economic profit = 50 − 60 (forgone salary) = <b>−€10,000</b>.</li><li><b>(ii)</b> Economic profit is negative: she earns €10k less than her best alternative. Based on this year alone, she would be better off back in the job (ignoring non-monetary benefits and the chance that profit improves as the bakery grows / start-up costs fade). Economic cost includes implicit costs; a firm with zero economic profit is earning a normal return, and negative means exit in the long run.</li></ul>',
            rubric: [['Accounting profit €50k', 2], ['Economic profit −€10k (subtract implicit €60k)', 3], ['Interprets: below next-best alternative', 2], ['Reasoned recommendation (+ caveat)', 1]]
          }
        ]
      }]
    }
  };
})());
