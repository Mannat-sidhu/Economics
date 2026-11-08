TOPICS.push((() => {
  const spectrum = '<table class="t"><tr><th>Structure</th><th>Sellers</th><th>Product</th><th>Entry</th><th>Example</th></tr><tr><td>Perfect competition</td><td>very many</td><td>identical</td><td>free</td><td>Wheat, eBay-style markets</td></tr><tr><td>Monopolistic competition</td><td>many</td><td>differentiated</td><td>free</td><td>Dublin pizza, cafés</td></tr><tr><td>Oligopoly</td><td>few</td><td>identical or differentiated</td><td>barriers</td><td>Airbus & Boeing, Big Four auditors</td></tr><tr><td>Monopoly</td><td>one</td><td>no close substitute</td><td>blocked</td><td>Indian Railways, De Beers</td></tr></table>';
  return {
    id: 'intro', n: 1, emoji: '🧭', title: 'Introduction: Scarcity & Choice', blurb: 'Scarcity, trade-offs, opportunity cost, incentives, markets, market structures and platforms in one paragraph.',
    subs: { scarcity: 'Scarcity, trade-offs & incentives', oppcost: 'Opportunity cost', market: 'Markets & market structures', plat: 'Matching & platforms' },
    cards: [
      {
        id: 'intro-c1', sub: 'scarcity', title: 'Economics = choices under scarcity',
        html: `<p>Economics is the study of choices under <b>scarcity</b>: you can't have everything, so every choice costs you something.</p>
        <ul><li><b>Scarcity:</b> wants are unlimited, resources (money, time, oil, attention) are limited. Scarcity is why we face <b>trade-offs</b>.</li><li><b>Incentives:</b> rewards and penalties that change behaviour.</li><li><b>Efficient allocation:</b> any further reallocation would harm at least one person.</li><li><b>Market:</b> where buyers and sellers exchange goods or services for money.</li></ul>`,
        tip: 'If a question asks why people face trade-offs, the answer is scarcity (not regulation, bureaucrats or profits).',
        check: { type: 'mcq', q: 'Individuals face trade-offs fundamentally because of…', opts: ['government regulation', 'scarcity', 'profits', 'competition'], a: 1, why: 'Limited resources against unlimited wants force choices; giving up one thing for another is the trade-off.' }
      },
      {
        id: 'intro-c2', sub: 'oppcost', title: 'Opportunity cost',
        html: `<p><b>Opportunity cost</b> = the value of the <b>best alternative given up</b>. It includes <b>explicit costs</b> (cash paid) and <b>implicit costs</b> (forgone income). "There is no such thing as a free lunch."</p>
        <div class="ex">The true cost of your MSc = fees + living costs (explicit) + the salary you'd earn working full-time instead (implicit). An accountant sees the first two; an economist sees all three.</div>`,
        tip: 'Always ask: "what is the NEXT-BEST use of this time or money?" That is the opportunity cost.',
        check: { type: 'num', q: 'You spend a year on an MSc: fees €22,000, books €1,000. You turned down a job paying €40,000. What is the economic (opportunity) cost in € thousand?', ans: 63, calc: () => 22 + 1 + 40, why: 'Explicit costs 22 + 1 = 23. Implicit cost = forgone salary 40. Total = 63.', steps: ['Explicit: 22 + 1 = 23', 'Implicit: 40', 'Total: 63'] }
      },
      {
        id: 'intro-c3', sub: 'market', title: 'Market structures: from most to least competitive',
        html: `<p>Perfect competition (wheat) → monopolistic competition (Dublin pizza) → oligopoly (Airbus & Boeing) → monopoly (Indian Railways).</p>${spectrum}<p>Topics 2–3 of your course study these in detail; the rest of the module (networks, game theory, platforms) shows how connected markets and strategic behaviour change the picture.</p>`,
        tip: 'Memorise the four rows: number of sellers, product type, entry, and one example each. This table is the skeleton of Section A-style answers.',
        check: { type: 'mcq', q: 'Which structure is characterised by a few firms, barriers to entry and strategic interdependence?', opts: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Natural monopoly'], a: 2, why: 'Oligopoly: a handful of firms whose decisions depend on rivals\' reactions (Airbus/Boeing, Big Four).' }
      },
      {
        id: 'intro-c4', sub: 'plat', title: 'Platforms in one paragraph',
        html: `<p>A traditional firm makes the product inside the firm (a bakery). A <b>multi-sided platform</b> makes nothing itself; it <b>connects groups who need each other</b>: Uber (riders and drivers), Visa (shoppers and merchants), OpenTable (diners and restaurants). Uber owns no cars; Airbnb owns no property; Facebook creates no content; Alibaba holds no stock.</p>
        <p><b>Do the giants win forever?</b> No: leaders can be temporary (Friendster → MySpace → Facebook). Level 8 covers this in depth.</p>`,
        tip: 'Matching is the core economic function: bringing the right buyers and sellers together at low search and transaction costs.',
        check: { type: 'mcq', q: 'Which statement best describes Uber as a business?', opts: ['It owns taxis and employs drivers', 'It connects riders and drivers, owning almost none of the cars', 'It is a monopoly by law', 'It sells rides at marginal cost to each side'], a: 1, why: 'Uber is a matchmaker: its value comes from connecting the two sides rather than owning the capital.' }
      }
    ],
    questions: [
      { id: 'intro-q1', sub: 'scarcity', skip: true, type: 'mcq', q: 'What is the fundamental cause of trade-offs?', opts: ['Scarcity', 'Greed', 'Taxation', 'Competition'], a: 0, why: 'Resources are limited relative to wants, so choosing one thing means giving up another.' },
      { id: 'intro-q2', sub: 'oppcost', skip: true, type: 'mcq', q: 'Opportunity cost is best defined as…', opts: ['the cash price paid', 'the value of the best alternative given up', 'the cost of the opportunity to the seller', 'the total of all alternatives given up'], a: 1, why: 'Only the BEST alternative forgone counts, not all alternatives.' },
      { id: 'intro-q3', sub: 'oppcost', skip: true, type: 'num', q: 'Fees €18,000, books €1,500, you turned down a €35,000 job. Opportunity cost of the degree (€)?', ans: 54500, calc: () => 18000 + 1500 + 35000, why: 'Explicit 19,500 + implicit 35,000 = 54,500.' },
      { id: 'intro-q4', sub: 'oppcost', skip: true, type: 'mcq', q: 'Which is an IMPLICIT cost of running your own café?', opts: ['The rent paid', 'The wages paid to staff', 'The salary you could have earned elsewhere', 'The cost of coffee beans'], a: 2, why: 'Implicit costs are forgone earnings or returns; the others are explicit cash payments.' },
      { id: 'intro-q5', sub: 'scarcity', skip: true, type: 'mcq', q: 'A congestion charge is introduced in a city centre and fewer people drive in. This illustrates…', opts: ['incentives changing behaviour', 'perfect competition', 'a natural monopoly', 'economies of scale'], a: 0, why: 'A penalty (the charge) changes the cost of an action and so behaviour: an incentive.' },
      { id: 'intro-q6', sub: 'scarcity', skip: true, type: 'mcq', q: 'An allocation is efficient if…', opts: ['everyone gets an equal share', 'reallocating resources cannot make anyone better off without making someone worse off', 'the government controls it', 'prices are as low as possible'], a: 1, why: 'Efficiency (Pareto) means no further reallocation can help someone without harming another.' },
      { id: 'intro-q7', sub: 'market', skip: true, type: 'mcq', q: 'Order from MOST to LEAST competitive:', opts: ['monopoly, oligopoly, monopolistic competition, perfect competition', 'perfect competition, monopolistic competition, oligopoly, monopoly', 'perfect competition, oligopoly, monopolistic competition, monopoly', 'monopolistic competition, perfect competition, oligopoly, monopoly'], a: 1, why: 'Fewer sellers and more barriers means less competition: PC → MC → oligopoly → monopoly.' },
      { id: 'intro-q8', sub: 'plat', skip: true, type: 'mcq', q: 'Airbnb owns no property. Why is it still a successful firm?', opts: ['It is a monopoly by law', 'It matches hosts and guests: its value is the connection', 'It sells below cost to everyone', 'It is a cartel'], a: 1, why: 'Platforms create value by matching groups who need each other.' },
      { id: 'intro-q9', sub: 'scarcity', skip: true, type: 'tf', q: 'True or false (and why): "There is no such thing as a free lunch."', a: true, why: 'True: every choice has an opportunity cost; even a free meal costs you the time/alternatives you gave up.' },
      { id: 'intro-q10', sub: 'market', skip: true, type: 'mcq', q: 'Dublin has dozens of restaurants, each with a different menu, and entry is easy. This market is…', opts: ['perfectly competitive', 'monopolistically competitive', 'an oligopoly', 'a monopoly'], a: 1, why: 'Many sellers, differentiated products, free entry = monopolistic competition.' },
      { id: 'intro-q11', sub: 'plat', type: 'mcq', q: 'Friendster → MySpace → Facebook suggests that…', opts: ['first movers always dominate', 'platform leadership can be temporary', 'social media isn\'t a market', 'network effects don\'t exist'], a: 1, why: 'Successive leaders were displaced; being first doesn\'t guarantee permanent dominance.' },
      { id: 'intro-q12', sub: 'oppcost', type: 'num', q: 'You spend Saturday at a €50 concert instead of tutoring (€60) or a shift (€45). Counting the ticket and the best alternative forgone, total opportunity cost (€)?', ans: 110, calc: () => 50 + 60, why: 'Ticket 50 + best alternative given up (tutoring, 60) = 110. The €45 shift is not added: only the BEST alternative counts.' },
      { id: 'intro-q13', sub: 'market', type: 'mcq', q: 'Which market structure features a single seller and barriers to entry?', opts: ['Oligopoly', 'Monopoly', 'Monopolistic competition', 'Perfect competition'], a: 1, why: 'One supplier protected by barriers (patents, licences, scale) = monopoly.' },
      { id: 'intro-q14', sub: 'scarcity', type: 'tf', q: 'True or false (and why): scarcity exists only in poor countries.', a: false, why: 'False. Scarcity is universal: wants exceed resources (time, money, attention) for everyone.' },
      { id: 'intro-q15', sub: 'plat', type: 'mcq', q: 'Which of these is a multi-sided platform?', opts: ['A flour mill', 'OpenTable', 'A single-shop bookseller', 'A steelworks'], a: 1, why: 'OpenTable connects diners and restaurants.' },
      { id: 'intro-q16', sub: 'market', type: 'mcq', q: 'A market is best defined as…', opts: ['a physical building', 'a place or system where buyers and sellers exchange goods and services', 'any government-run shop', 'a stock exchange only'], a: 1, why: 'Markets can be physical or online; what matters is that buyers and sellers exchange.' }
    ],
    boss: {
      title: 'The Foundations Boss', minutes: 36,
      briefing: 'A 30-mark warm-up covering scarcity, market structures and platforms: the building blocks of every longer answer.',
      questions: [{
        id: 'intro-b1', title: 'Question: Foundations',
        parts: [
          {
            label: 'a', marks: 10, q: 'Define scarcity and opportunity cost. A student is deciding between a €25,000 MSc (and giving up a €38,000 job) and working. Calculate and explain the economic cost of the MSc.',
            model: '<ul><li><b>Scarcity:</b> unlimited wants vs limited resources; hence trade-offs.</li><li><b>Opportunity cost:</b> the value of the best alternative forgone; includes explicit (cash) and implicit (forgone income) costs.</li><li><b>Calculation:</b> explicit = €25,000 fees; implicit = €38,000 forgone salary; economic cost = <b>€63,000</b> (an accountant would count only €25,000).</li><li>Interpretation: the degree is worthwhile only if expected lifetime benefits exceed €63,000.</li></ul>',
            rubric: [['Scarcity defined', 2], ['Opportunity cost defined (best alternative)', 2], ['Explicit vs implicit distinguished', 2], ['€63,000 computed', 2], ['Interpretation / accountant vs economist', 2]]
          },
          {
            label: 'b', marks: 10, q: 'Compare the four market structures: perfect competition, monopolistic competition, oligopoly and monopoly. Give an example of each.',
            model: '<ul><li><b>Perfect competition:</b> very many sellers, identical product, free entry, price takers (wheat; eBay-like markets).</li><li><b>Monopolistic competition:</b> many sellers, differentiated products, free entry, some pricing power, zero long-run profit (restaurants, hairdressers).</li><li><b>Oligopoly:</b> few firms, barriers, strategic interdependence, possible collusion (Airbus/Boeing, Big Four).</li><li><b>Monopoly:</b> one seller, barriers, no close substitutes, price maker (Indian Railways, water utility).</li><li>Moving along the spectrum: market power ↑, competition ↓, output ↓, price ↑ relative to MC.</li></ul>',
            rubric: [['Perfect competition correct + example', 2], ['Monopolistic competition correct + example', 2], ['Oligopoly correct + example', 2], ['Monopoly correct + example', 2], ['Ordered by competitiveness / market power link', 2]]
          },
          {
            label: 'c', marks: 10, q: 'Explain what a multi-sided platform is and why platforms such as OpenTable face a "chicken-and-egg" problem. How can they solve it?',
            model: '<ul><li><b>MSP:</b> connects distinct groups who need each other (diners and restaurants); makes nothing itself; value comes from the connection.</li><li><b>Chicken-and-egg:</b> diners won\'t join without restaurants and restaurants won\'t join without diners.</li><li><b>Solutions:</b> concentrate on a few cities to reach critical mass; sign up the side that is easier first (restaurants); subsidise or reward the magnet side (diners); charge the other side (restaurants).</li><li>Link to price structure: the price to the subsidised side is below cost because its presence raises the value to the paying side.</li></ul>',
            rubric: [['MSP defined (two or more distinct groups)', 3], ['Chicken-and-egg explained', 3], ['Concrete solution(s) (focus, subsidise, charge other side)', 3], ['Links to indirect network effects / price structure', 1]]
          }
        ]
      }]
    }
  };
})());
