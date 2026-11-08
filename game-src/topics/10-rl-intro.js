/* Real-life layer for Level 1: Scarcity & choice. */
RL.lv.intro = {
  story: {
    title: 'Sam\'s Saturday',
    html: `<p>Sam has one free Saturday afternoon and three options: <b>babysit</b> for €60, <b>go to a concert</b> a friend has offered a free ticket for, or <b>sleep</b> after a hard week.</p>
      <p>Sam can't do all three. There are only so many hours in the afternoon, and that is the whole of economics in one sentence: <b>we want more than we can have, so we have to choose</b>.</p>
      <p>Sam picks the concert. "It was free!" says a friend. But Sam gave up €60 of babysitting money. <b>That €60 is the real price of the concert.</b> Nothing is truly free, because the time (or money) could have been used elsewhere.</p>
      <p>Later Sam needs a taxi home. Hundreds of drivers, one app, an unknown driver arriving in four minutes. The app doesn't own a single car. It simply connects riders and drivers. Different games, different shops, different rules: the rest of this course explains how these markets behave.</p>`,
    tip: 'Every later level is built on two ideas from this story: choices cost something (opportunity cost), and the way a market is organised (one seller? many? a platform?) decides how it behaves.'
  },
  gloss: [
    ['Trade-off', 'getting more of one thing means getting less of another.', 'more sleep, less study'],
    ['Incentive', 'a reward or penalty that nudges you to act differently.', 'a parking fine'],
    ['Efficient', 'nobody can be made better off without someone else being made worse off.', 'no slice of pizza left unshared while someone is hungry']
  ],
  hints: {
    'intro-b1.0': 'Sam\'s concert was "free" but cost €60 of babysitting. For the MSc, add up what you pay AND what you give up by not working for the year. Which of these would an accountant ignore?',
    'intro-b1.1': 'Go from "many similar sellers, easy entry" (a farmers\' market) to "one seller" (the only train line). Think of one real-life example for each of the four steps in between.',
    'intro-b1.2': 'Think of a food-delivery app launching in your town. Restaurants want customers; customers want restaurants. Neither wants to join first. How would you get one side to show up?'
  },
  card: {
    'intro-c1': {
      plain: 'We want more than there is, so every choice means giving something else up.',
      icon: '⏰', stitle: 'Picture this',
      story: `<p>You get 24 hours a day, same as everyone. You can't study, work, sleep, and see friends all at once. Money works the same way: €100 can go on a jacket <i>or</i> concert tickets, not both. That limit is called <b>scarcity</b>, and the choices it forces are <b>trade-offs</b>.</p>`,
      simple: `<ol><li><b>Scarcity:</b> we want more than there is (of time, money, oil, attention).</li><li><b>Trade-off:</b> because of scarcity, choosing X means giving up Y.</li><li><b>Incentives:</b> people respond to rewards and penalties (a discount, a fine).</li><li><b>Efficient:</b> things are efficient when nothing can be rearranged to make someone better off without hurting someone else.</li></ol>`,
      jargon: [['Scarcity', 'not enough to satisfy everyone\'s wants', 'only 24 hours in a day'], ['Trade-off', 'giving up one thing to get another', 'sleep vs. studying'], ['Incentive', 'a reason to change behaviour', 'a bus discount for students']]
    },
    'intro-c2': {
      plain: 'The real cost of something is the best thing you give up to get it, not just the price tag.',
      icon: '🎓', stitle: 'Picture this',
      story: `<p>Your friend says her degree costs "€10,000 in fees". But she also turned down a €30,000 job to study. Her <b>real</b> cost is closer to €40,000 plus living costs. Cash you pay is the <b>explicit</b> cost. Income you give up is the <b>implicit</b> cost. An accountant counts only the first; an economist counts both.</p>`,
      simple: `<ol><li>List what you pay in cash (the explicit cost).</li><li>Add what you could have earned instead (the implicit cost).</li><li>Add them up. That total is the <b>opportunity cost</b>.</li><li>Check: "free" things still have an opportunity cost (your time).</li></ol><div class="formula">Opportunity cost = cash costs + forgone income</div>`,
      jargon: [['Opportunity cost', 'the value of the best option you gave up', 'a babysitting shift missed for a concert'], ['Explicit cost', 'cost you actually pay in cash', 'fees, books'], ['Implicit cost', 'income or value you give up without paying a bill', 'the salary you don\'t earn']]
    },
    'intro-c3': {
      plain: 'Markets sit on a ladder from "lots of sellers, no power" to "one seller, all the power".',
      icon: '🛒', stitle: 'Picture this',
      story: `<p>Imagine four ways to buy lunch. A <b>farmers\' market</b> with 40 identical stalls (no stall can charge more). A street with <b>20 different cafés</b>, each slightly different. <b>Two airlines</b> on your route, each watching the other. And a <b>single railway</b> with no rival. Same you, same lunch, very different amount of control for the seller.</p>`,
      simple: `<ol><li><b>Perfect competition:</b> very many sellers, identical product, free entry. Example: wheat.</li><li><b>Monopolistic competition:</b> many sellers, each slightly different, free entry. Example: cafés and pizza places.</li><li><b>Oligopoly:</b> just a few big sellers who watch each other. Example: Airbus and Boeing.</li><li><b>Monopoly:</b> one seller, entry blocked. Example: a national railway.</li></ol><p>The fewer the sellers, the more power over price.</p>`,
      jargon: [['Market power', 'the ability to set a price above cost', 'a monopoly water company'], ['Entry barrier', 'something that stops new sellers joining', 'a patent or a licence'], ['Differentiated', 'products that are similar but not identical', 'different brands of pizza']]
    },
    'intro-c4': {
      plain: 'A platform is a go-between: it makes nothing itself and just connects two groups who need each other.',
      icon: '📱', stitle: 'Picture this',
      story: `<p>A bakery bakes bread and sells it. Uber doesn\'t bake anything: it owns no cars. It simply introduces riders to drivers. More riders makes the app more attractive to drivers, and more drivers makes it more attractive to riders. The "product" is the connection.</p>`,
      simple: `<ol><li>A <b>normal firm</b> makes a product inside the company.</li><li>A <b>platform</b> makes nothing; it connects groups (riders and drivers, shoppers and sellers).</li><li>It has two or more "sides" that each want the other side to be big.</li><li>Starting one is hard: the <b>chicken-and-egg problem</b>. Nobody joins an empty platform.</li></ol>`,
      jargon: [['Multi-sided platform', 'a business that connects two or more groups', 'Uber, Airbnb'], ['Chicken-and-egg problem', 'each side waits for the other to join first', 'restaurants won\'t join an app with no customers']]
    }
  },
  extra: [
    { id: 'intro-r1', sub: 'oppcost', type: 'num', scn: 'Sam has a free Saturday afternoon. Options: babysit for €60, tutor for €45 or sleep. A friend offers a free concert ticket.', q: 'Sam goes to the free concert. What is the opportunity cost of that afternoon (in €)? (Hint: the best alternative given up.)', ans: 60, unit: '€', calc: () => Math.max(60, 45), why: 'Opportunity cost is the value of the BEST alternative given up. Babysitting (€60) beats tutoring (€45), so the concert "costs" €60 even though the ticket was free.', steps: ['Alternatives: babysit 60, tutor 45, sleep (no cash)', 'Best alternative = 60', 'Opportunity cost = €60'] },
    { id: 'intro-r2', sub: 'oppcost', type: 'tf', scn: 'A friend says: "I got free tickets to the match, so going costs me nothing."', q: 'True or false (and why): going to a free match has no opportunity cost.', a: false, why: 'False. Your afternoon could have been used for something else (work, study, rest). The best alternative you give up is the opportunity cost, even when no money changes hands.' },
    { id: 'intro-r3', sub: 'scarcity', type: 'mcq', scn: 'It is the night before two exams. You have 6 hours. Revising for economics for 4 hours leaves 2 for statistics.', q: 'What does this situation illustrate?', opts: ['A trade-off caused by scarcity of time', 'A surplus of time', 'A free lunch', 'Perfect competition'], a: 0, why: 'Time is scarce, so more hours for one subject mean fewer for the other: a trade-off.' },
    { id: 'intro-r4', sub: 'market', type: 'mcq', scn: 'Dublin has hundreds of cafés. Each has its own style, menu and atmosphere, and anyone can open a new one.', q: 'Which market structure is this closest to?', opts: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'], a: 1, why: 'Many sellers with differentiated products and free entry: monopolistic competition. (Perfect competition needs identical products.)' },
    { id: 'intro-r5', sub: 'market', type: 'mcq', scn: 'Three supermarket chains sell most of a country\'s groceries. Opening a new national chain would be extremely expensive. If one chain cuts prices, the others usually follow.', q: 'Which structure does this describe?', opts: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'], a: 2, why: 'A few large firms, hard entry and strong interdependence (each reacts to the others) mean oligopoly.' },
    { id: 'intro-r6', sub: 'plat', type: 'mcq', scn: 'A taxi app, a car factory and a bakery all want to make money.', q: 'Which one is a multi-sided platform?', opts: ['The car factory', 'The bakery', 'The taxi app that connects riders with drivers', 'None of them'], a: 2, why: 'The app makes nothing itself: it connects two groups (riders and drivers), each of which benefits from the other being there.' },
    { id: 'intro-r7', sub: 'plat', type: 'mcq', scn: 'A start-up launches a food-delivery app in a small town. Restaurants say, "We\'ll join once you have customers." Customers say, "We\'ll download it once there are restaurants."', q: 'What is this problem called, and what is a typical fix?', opts: ['Chicken-and-egg problem; subsidise or recruit one side first (e.g. free sign-up or discounts)', 'Winner\'s curse; bid lower', 'Prisoner\'s dilemma; confess', 'Deadweight loss; cap prices'], a: 0, why: 'Neither side joins first. Platforms solve it by subsidising one side (discounts, free listings, signing up a few big restaurants) so the other side has a reason to join.' }
  ]
};
