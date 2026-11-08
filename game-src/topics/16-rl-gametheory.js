/* Real-life layer for Level 7: Game theory & auctions. */
RL.lv.gt = (() => {
  const mx = (hl) => DG.matrix({ rowName: 'Café A', colName: 'Café B', rows: ['High price', 'Low price'], cols: ['High price', 'Low price'], cells: [[[100, 100], [30, 140]], [[140, 30], [60, 60]]], hl: hl || [], note: 'Daily profit in €, (Café A, Café B)' });
  const coord = () => DG.matrix({ rowName: 'You', colName: 'Friend', rows: ['Cinema', 'Football'], cols: ['Cinema', 'Football'], cells: [[[2, 2], [0, 0]], [[0, 0], [2, 2]]], hl: [[0, 0], [1, 1]], note: 'Happiness points, (You, Friend)' });
  const entry = () => DG.matrix({ rowName: 'Shop X', colName: 'Shop Y', rows: ['Open Sunday', 'Closed Sunday'], cols: ['Open Sunday', 'Closed Sunday'], cells: [[[3, 3], [8, 1]], [[1, 8], [5, 5]]], hl: [], note: 'Daily profit in €100s, (Shop X, Shop Y)' });
  return {
    story: {
      title: 'The two cafés across the street',
      html: `<p>Two cafés face each other on the same street. Each morning each owner secretly picks a price: <b>High</b> or <b>Low</b>.</p>
        <p>If both stay High, each earns €100 a day. If one cuts to Low, it steals the other\'s customers (€140 vs €30). If both cut, they split the street at low prices: €60 each.</p>
        ${mx([[1, 1]])}
        <p>Think as Café A. If B stays High, you earn 100 by staying High but 140 by going Low: go Low. If B goes Low, you earn 30 by staying High but 60 by going Low: go Low again. <b>Whatever B does, Low is better for you.</b> B reasons the same way. Both end up at Low/Low with €60 each: worse than the €100 each they could have had.</p>
        <p>This is the <b>prisoner\'s dilemma</b>: each person doing what is best for them individually makes both worse off. It explains price wars, arms races and why people can\'t agree to share chores.</p>
        <p>Auctions are the same sort of thinking: how much should you bid when others are bidding too?</p>`,
      tip: 'Game theory is "what\'s my best move given your best move?" Practise reading a payoff table by asking that for each cell.'
    },
    gloss: [
      ['Payoff', 'what each player gets (profit, utility, years in jail).', 'the €100 each café earns'],
      ['Dominant strategy', 'a move that is best for you whatever the other player does.', 'Low price in the café game'],
      ['Nash equilibrium', 'a situation where nobody can do better by changing their own move alone.', 'Low/Low in the café game']
    ],
    hints: {
      'gt-b1.0': 'Use the two cafés. Best response = your best move given what the OTHER one does. Dominant strategy = your best move whatever the other does. Nash equilibrium = both are playing a best response, so neither wants to change.',
      'gt-b1.1': 'Fill in the 2×2 table. For each of the other firm\'s choices, circle your better payoff. Cells where both are circled are Nash equilibria. If there are two, think about why they might end up in either.',
      'gt-b1.2': 'In a second-price auction you pay the second-highest bid, so bidding your true value can\'t hurt. In a first-price auction, if you bid your full value and win you gain nothing, so shade your bid below your value.'
    },
    card: {
      'gt-c1': {
        plain: 'A "game" is any situation where what is best for you depends on what someone else does.',
        icon: '🎲', stitle: 'Picture this',
        story: `<p>Picking what to eat for lunch alone is a <i>decision</i>. Picking what price to charge when a rival café sets its price at the same time is a <b>game</b>: your best price depends on theirs, and theirs on yours. Game theory predicts what sensible players will do, and why they sometimes end up worse off.</p>`,
        simple: `<ol><li><b>Players:</b> who is choosing (the two cafés).</li><li><b>Strategies:</b> their possible moves (High / Low).</li><li><b>Payoffs:</b> what each gets for each combination.</li><li><b>Strategic interdependence:</b> my payoff depends on your move too.</li></ol>`,
        jargon: [['Strategy', 'a complete plan of what you will do'], ['Payoff', 'what you get at the end'], ['Strategic interdependence', 'my result depends on your choice and vice versa']]
      },
      'gt-c2': {
        plain: 'Game theory assumes players are sensible, want the most for themselves, and know the rules.',
        icon: '🧠', stitle: 'Picture this',
        story: `<p>The two café owners aren\'t trying to be friends: each wants the biggest profit. Each knows the payoffs, knows the other knows them, and so on. Real people sometimes break these assumptions (they might be kind, or forget), but the model is a clean starting point.</p>`,
        simple: `<ol><li>Players are <b>rational</b>: they maximise their own payoff.</li><li>The <b>rules and payoffs</b> are clear.</li><li>Payoffs depend on <b>everyone\'s</b> choices.</li><li>Everything is <b>common knowledge</b>: all know the payoffs, and know that others know, and so on.</li><li>Players choose at the same time (in the simple games here).</li></ol>`,
        jargon: [['Rational', 'consistently chooses what gives the best payoff'], ['Common knowledge', 'everyone knows it, and knows that everyone knows it']]
      },
      'gt-c3': {
        plain: 'Each side\'s best move leaves both worse off than if they had cooperated.',
        icon: '🚔', stitle: 'Picture this',
        story: `<p>Two partners in crime are caught and questioned in separate rooms. Each can stay quiet or confess. Whatever the other does, confessing gets you a lighter sentence. But if both confess, both do worse than if both had stayed quiet. Same shape as the two cafés and their price war.</p>`,
        simple: `<ol><li>Look at one player\'s options against each choice of the other.</li><li>If the same option is best every time, it\'s a <b>dominant strategy</b>.</li><li>If both players have one, the outcome is predictable.</li><li>That outcome (the <b>Nash equilibrium</b>) can be worse for both than another cell: the dilemma.</li></ol>`,
        jargon: [['Prisoner\'s dilemma', 'a game where self-interest leaves both players worse off'], ['Dominant strategy', 'best whatever the other does']]
      },
      'gt-c4': {
        plain: 'To find the stable outcome, for each of the other player\'s options mark your best reply; a cell where both players\' marks meet is a Nash equilibrium.',
        icon: '✅', stitle: 'Picture this',
        story: `<p>You and a friend are deciding between cinema and football, and you both only care about being together. If you both go to the cinema, great. If you both go to football, also great. If you split up, nobody is happy. Both "Cinema/Cinema" and "Football/Football" are stable: neither of you wants to switch alone. A game can have more than one Nash equilibrium.</p>${coord()}`,
        simple: `<ol><li>Take the row player. For each COLUMN, find their best payoff and mark it.</li><li>Take the column player. For each ROW, find their best payoff and mark it.</li><li>A cell with <b>both</b> marks is a <b>Nash equilibrium</b>.</li><li>Check by asking: "can either player do better by switching alone?" If no, it\'s a NE.</li></ol>`,
        jargon: [['Best response', 'your best move given what the other does'], ['Nash equilibrium', 'nobody wants to change their move alone'], ['Coordination game', 'both gain if they choose the same thing']]
      },
      'gt-c5': {
        plain: 'An auction is a rulebook for how to sell something to the highest bidder; there are four main formats.',
        icon: '🔨', stitle: 'Picture this',
        story: `<p>At an art auction the auctioneer calls ever-higher prices until one person is left (<b>English</b>). In Dutch flower auctions a clock counts prices down from high; the first bidder to press the button wins (<b>Dutch</b>). When a company invites tenders for a building contract, each contractor submits one secret price (<b>sealed-bid</b>). In a second-price version, the winner pays the runner-up\'s bid (<b>Vickrey</b>).</p>`,
        simple: `<ol><li><b>English:</b> price rises, last bidder standing wins and pays their final bid. (Art, antiques)</li><li><b>Dutch:</b> price falls, first to accept wins and pays that price. (Flowers)</li><li><b>First-price sealed-bid:</b> one secret bid each; highest bid wins and pays it. (Tenders)</li><li><b>Second-price sealed-bid:</b> highest bid wins but pays the second-highest bid. (Close to eBay proxy bidding)</li></ol>`,
        jargon: [['English auction', 'prices go up, last bidder wins'], ['Dutch auction', 'prices go down, first taker wins'], ['Sealed bid', 'each person submits one secret bid']]
      },
      'gt-c6': {
        plain: 'How much to bid depends on the rules: in some auctions you should bid your true value, in others you should bid less.',
        icon: '💶', stitle: 'Picture this',
        story: `<p>You value a vintage guitar at €500. In an <b>eBay-style</b> auction (you pay just above the second-highest bidder), bid your honest €500: you\'ll only ever pay what the next person offered, and you win only when it\'s worth it. In a <b>sealed first-price</b> tender where you pay your own bid, bidding €500 gives you zero profit if you win, so you shade lower.</p><p>Beware the <b>winner\'s curse</b>: if everyone is guessing at the value (like an oil field), the winner is often the one who overestimated the most.</p>`,
        simple: `<ol><li><b>Second-price sealed bid:</b> bid your true value. Your bid decides whether you win, not what you pay.</li><li><b>English:</b> keep bidding until the price reaches your value, then stop. (Same logic.)</li><li><b>First-price sealed bid / Dutch:</b> shade your bid below your value; how far depends on how many rivals.</li><li><b>Winner\'s curse:</b> when the item\'s true value is uncertain and common to all, the winner is likely to have overpaid. Bid less to compensate.</li></ol>`,
        jargon: [['Bid shading', 'bidding below your true value'], ['Winner\'s curse', 'winning because you were the most over-optimistic'], ['Reserve price', 'the minimum the seller will accept']]
      }
    },
    extra: [
      { id: 'gt-r1', sub: 'terms', type: 'mcq', scn: 'Situation 1: you decide alone what to cook for dinner. Situation 2: two rival cafés pick their prices at the same time.', q: 'Which one is a game in the game-theory sense?', opts: ['Situation 1 only', 'Situation 2 only, because each café\'s best price depends on the other\'s choice', 'Both', 'Neither'], a: 1, why: 'A game needs strategic interdependence. Your dinner doesn\'t depend on anyone else\'s choice; the cafés\' profits do.' },
      { id: 'gt-r2', sub: 'pd', type: 'mcq', scn: 'Two cafés each choose High or Low prices. Payoffs: both High = €100 each; A Low & B High = €140 for A, €30 for B; both Low = €60 each. (See the table.)', svg: () => mx([]), q: 'What is the Nash equilibrium?', opts: ['Both High: (100, 100)', 'Both Low: (60, 60)', 'A Low, B High', 'There is none'], a: 1, why: 'Low is best for A whatever B does (140 > 100 and 60 > 30), and the same for B: Low is a dominant strategy for both. Both Low (60, 60) is the equilibrium, even though both High would pay more.' },
      { id: 'gt-r3', sub: 'pd', type: 'mcq', scn: 'Two flatmates would both prefer a clean kitchen, but cleaning costs effort. Each thinks, "If they clean, I can skip it; if they don\'t, I\'m not doing it alone."', q: 'What does this resemble?', opts: ['A prisoner\'s dilemma: each player\'s self-interest leads to a worse result for both', 'A Dutch auction', 'A price ceiling', 'Triadic closure'], a: 0, why: 'Not cleaning is each flatmate\'s best response whatever the other does, yet both would prefer the outcome where both clean.' },
      { id: 'gt-r4', sub: 'nash', type: 'mcq', scn: 'You and a friend each choose Cinema or Football. You both only care about being together (2 points each if you match, 0 if you don\'t). (See the table.)', svg: coord, q: 'How many pure-strategy Nash equilibria are there?', opts: ['0', '1', '2', '4'], a: 2, why: 'Cinema/Cinema and Football/Football: neither of you wants to switch alone. A game can have more than one equilibrium.' },
      { id: 'gt-r5', sub: 'nash', type: 'mcq', scn: 'Two shops can open on Sunday or stay closed. Payoffs (€100s): both open 3 each; one open, other closed 8 for the open one and 1 for the closed one; both closed 5 each. (See the table.)', svg: entry, q: 'Which cell is the Nash equilibrium?', opts: ['Both closed (5, 5)', 'Both open (3, 3)', 'X open, Y closed', 'There is none'], a: 1, why: 'Whatever the other does, opening is better (8 > 5 and 3 > 1). So both open is the equilibrium, even though both closed would pay more: another prisoner\'s dilemma.' },
      { id: 'gt-r6', sub: 'auct', type: 'mcq', scn: 'Three situations: (a) an auctioneer calls rising prices for a painting until one bidder is left; (b) a flower auction where a clock counts down and the first buyer to press wins; (c) a council asks contractors to submit one secret price each.', q: 'Match them in order.', opts: ['English; Dutch; sealed-bid', 'Dutch; English; sealed-bid', 'Sealed-bid; English; Dutch', 'English; sealed-bid; Dutch'], a: 0, why: 'Rising oral bids = English. Descending clock = Dutch. Secret one-shot bids = sealed-bid.' },
      { id: 'gt-r7', sub: 'bid', type: 'mcq', scn: 'You value a vintage guitar at €500 and bid on a site where the winner pays just above the SECOND-highest bid.', q: 'What should you bid?', opts: ['€500, your true value', '€300 to save money', '€800 to be sure to win', 'Whatever the first bid is'], a: 0, why: 'In a second-price auction, bidding your true value is a (weakly) dominant strategy. Bidding more risks winning at a loss; bidding less risks losing an item you value above the price.' },
      { id: 'gt-r8', sub: 'bid', type: 'mcq', scn: 'Several oil firms bid for drilling rights. Each firm estimates the oil\'s value with some error. The winner turns out to be the firm that was most optimistic, and the field is worth less than it bid.', q: 'What is this called?', opts: ['Winner\'s curse', 'Triadic closure', 'Deadweight loss', 'Price floor'], a: 0, why: 'When the item\'s true value is common and uncertain, the winning bid tends to come from the most over-optimistic estimate: the winner\'s curse. The advice is to shade your bid.' }
    ]
  };
})();
