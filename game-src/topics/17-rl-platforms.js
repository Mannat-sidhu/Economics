/* Real-life layer for Level 8: Multi-sided platforms. */
RL.lv.msp = {
  story: {
    title: 'A food-delivery app comes to town',
    html: `<p>Dev launches "QuickBite", a food-delivery app in a small town. He faces an awkward problem on day one.</p>
      <p>Restaurants say, <i>"We\'ll join when there are customers."</i> Customers say, <i>"We\'ll download it when there are restaurants."</i> Each side waits for the other. This is the <b>chicken-and-egg problem</b>.</p>
      <p>Dev solves it by giving customers €10 off their first order (subsidising one side), and signing up the three best-known restaurants for free. Soon more people want the app, so more restaurants want to be on it, which draws more customers: a <b>virtuous circle</b> called <b>network effects</b>.</p>
      <p>How does he earn money? Not from the side he subsidised. QuickBite charges restaurants a commission on each order. He may even lose money on customers and make it back from restaurants. Normal shops never price below cost for long; platforms do, because customers are worth more as a <b>magnet</b> than as a source of profit.</p>
      <p>And will the first big platform win forever? Friendster was early, MySpace overtook it, and Facebook overtook MySpace. Being first isn\'t enough.</p>`,
    tip: 'Platform economics is ordinary economics with two twists: each side\'s value depends on the other side, and the price you charge one side may be below cost.'
  },
  gloss: [
    ['Network effect', 'a product becomes more valuable as more people use it.', 'a messaging app is useless if none of your friends use it'],
    ['Subsidise', 'charge less than it costs you (or nothing) to attract someone.', 'free sign-up for diners'],
    ['Commission', 'a cut taken from each transaction.', '20% of every delivery order']
  ],
  hints: {
    'msp-b1.0': 'Use QuickBite. Direct effect: more users of the SAME kind make the app better for them. Indirect (cross-side) effect: more restaurants make it better for diners and vice versa. Why would Dev give diners a discount?',
    'msp-b1.1': 'In a "generalised second-price" auction, each winner pays the NEXT advertiser\'s bid per click, multiplied by the clicks on their slot. Work through slot 1 then slot 2, then compute the engine\'s total earnings and each advertiser\'s profit (value − price).',
    'msp-b1.2': 'Name platforms that were first but lost (Friendster, MySpace) and say why entry is easy (software, cloud, low switching costs). Then give one reason the claim has a grain of truth (network effects).'
  },
  card: {
    'msp-c1': {
      plain: 'A platform makes nothing itself; it connects two groups, each of which wants the other to be bigger.',
      icon: '🍽️', stitle: 'Picture this',
      story: `<p>A restaurant cooks food and sells it. The delivery app QuickBite cooks nothing and owns no bikes. It just introduces diners and restaurants. More restaurants make the app better for diners; more diners make it better for restaurants. That cross-side pull is an <b>indirect network effect</b>. When more users of the same type make it better for each other (like friends on a messaging app) it\'s a <b>direct network effect</b>.</p>`,
      simple: `<ol><li>A <b>normal firm</b> makes a product and sells it.</li><li>A <b>multi-sided platform</b> connects groups who need each other.</li><li><b>Direct network effect:</b> more users of the same kind → more value for each user (WhatsApp).</li><li><b>Indirect (cross-side) network effect:</b> more of side A → more value for side B (more drivers → shorter waits for riders).</li><li>Examples: Uber, Visa, OpenTable, Airbnb.</li></ol>`,
      jargon: [['Direct network effect', 'each extra user of the same kind makes the product better for the others', 'messaging apps'], ['Indirect network effect', 'more users on one side make it better for the other side', 'more restaurants attract more diners'], ['Side', 'one of the groups the platform connects', 'riders / drivers']]
    },
    'msp-c2': {
      plain: 'Platforms often charge one side nothing, or even pay them, because that side attracts the side that pays.',
      icon: '🎁', stitle: 'Picture this',
      story: `<p>Google Search is free for you. Facebook is free to use. Credit cards sometimes pay you cashback. Why give things away? Because one side (you) attracts the other (advertisers or merchants), which pays. The free side is a <b>magnet</b>, worth more as a crowd than as a payer. Ordinary firms selling below cost lose money; platforms can win by getting the <b>split</b> of prices right.</p>`,
      simple: `<ol><li>Standard economics: never price below marginal cost (except short-term loss leaders).</li><li>A platform asks: "Which side is more price sensitive? Which side values the other more?"</li><li>It charges less (even zero) to the side that attracts the other, and more to the side that gains most.</li><li>Pricing below cost on one side can raise <b>total</b> profit because it grows the whole platform.</li></ol>`,
      jargon: [['Below-cost pricing', 'charging less than it costs to serve', 'free social network accounts'], ['Magnet side', 'the group that attracts the paying group', 'users on a free site']]
    },
    'msp-c3': {
      plain: 'Platforms fall into four families depending on what they connect.',
      icon: '🧩', stitle: 'Picture this',
      story: `<p>A dating app or eBay connects buyers with sellers (an <b>exchange</b>). A free newspaper site attracts readers and sells their attention to advertisers (<b>advertiser-supported media</b>). Visa connects cardholders with shops (<b>transaction system</b>). The iPhone operating system connects app developers with users (<b>software platform</b>).</p>`,
      simple: `<ol><li><b>Exchanges:</b> match buyers and sellers (eBay, dating apps, stock exchanges).</li><li><b>Advertiser-supported media:</b> content attracts viewers; viewers attract advertisers (newspapers, Google Search).</li><li><b>Transaction systems:</b> connect payers and payees (Visa, PayPal).</li><li><b>Software platforms:</b> connect users and developers (iOS, Android, game consoles).</li></ol>`,
      jargon: [['Exchange', 'a place where buyers and sellers meet', 'eBay'], ['Transaction system', 'a payment network', 'Visa'], ['Software platform', 'an operating system with apps built on top', 'iOS']]
    },
    'msp-c4': {
      plain: 'A platform picks both how much to charge in total and how to split that charge between its sides.',
      icon: '🍰', stitle: 'Picture this',
      story: `<p>QuickBite earns about €5 per order in total. It could charge the diner €5 and the restaurant nothing, or the diner nothing and the restaurant €5, or €2/€3. The <b>total</b> (price level) matters, but so does the <b>split</b> (price structure). If diners will leave over a 50c fee, but restaurants barely notice a 20% commission, the platform loads the cost on restaurants.</p>`,
      simple: `<ol><li><b>Price level:</b> P_total = P_A + P_B.</li><li><b>Price structure:</b> how that total is split across the sides.</li><li>Charge more to the side that is <b>less price-sensitive</b> and values the other side <b>more</b>.</li><li>Charge less to the side that is a strong magnet for the other side.</li><li>Four questions to answer: how price-sensitive is A, how price-sensitive is B, how much does A need B, how much does B need A.</li></ol>`,
      jargon: [['Price level', 'total price across all sides'], ['Price structure', 'how the total is divided between sides'], ['Price-sensitive', 'quick to leave when the price goes up']]
    },
    'msp-c5': {
      plain: 'Free media earns money by selling its audience\'s attention to advertisers; search engines sell clicks by auction.',
      icon: '🔎', stitle: 'Picture this',
      story: `<p>A free news site doesn\'t charge you because you aren\'t the customer; the advertiser is, and you are the product (your attention). On a search engine, advertisers bid on the words you type. When you search "pizza near me", pizza places bid to appear at the top, and the winner pays only when you click.</p>`,
      simple: `<ol><li>Advertiser-supported media sells <b>audience attention</b>. Content is cheap or free to the audience.</li><li>Too many ads can drive the audience away (a <b>negative</b> cross-side effect).</li><li><b>Sponsored search:</b> ads tied to the search query, paid per click.</li><li><b>Generalised second-price (GSP) auction:</b> slots are ranked by bid; each winner pays the next-highest bid per click, times the clicks on their slot.</li></ol>`,
      jargon: [['Click-through', 'a user clicking an ad'], ['GSP auction', 'each winner pays the next-highest advertiser\'s bid per click'], ['Negative cross-side effect', 'more of one side makes the other less happy', 'more ads annoy viewers']]
    },
    'msp-c6': {
      plain: 'Being first helps because of network effects, but it does not guarantee you stay on top.',
      icon: '🏁', stitle: 'Picture this',
      story: `<p>Friendster was early. MySpace beat it. Facebook beat MySpace. Each time a better product or a clever move overturned the leader. Network effects give early leaders a head start, but cheap entry, easy switching, and constant innovation mean the crown can change hands.</p>`,
      simple: `<ol><li>The popular story: first mover → network effects → winner takes all for ever.</li><li>Evans &amp; Schmalensee: little evidence of durable winner-takes-all.</li><li>Why? Entry is cheap (software, cloud), sunk costs are low, switching is easy, users use several platforms (multi-homing), and innovation keeps disrupting.</li><li>Network effects are real but don\'t make the leader invincible.</li></ol>`,
      jargon: [['Winner-takes-all', 'one firm captures nearly the whole market'], ['Multi-homing', 'using several platforms at once', 'a driver using both Uber and Bolt'], ['Switching cost', 'the effort or loss of moving to a rival']]
    }
  },
  extra: [
    { id: 'msp-r1', sub: 'ne', type: 'mcq', scn: 'WhatsApp becomes more useful to you each time another friend of yours installs it.', q: 'This is an example of…', opts: ['An indirect (cross-side) network effect', 'A direct network effect', 'A negative externality', 'Economies of scope'], a: 1, why: 'More users of the SAME kind make the product more valuable to each user: a direct network effect.' },
    { id: 'msp-r2', sub: 'ne', type: 'mcq', scn: 'A ride-hailing app: when more drivers sign up, passengers wait less. When more passengers sign up, drivers earn more per hour.', q: 'What kind of effect is this?', opts: ['Direct network effect', 'Indirect (cross-side) network effect', 'Diminishing returns', 'Winner\'s curse'], a: 1, why: 'Growth on one side improves the product for the OTHER side: an indirect network effect, which is the core of a multi-sided platform.' },
    { id: 'msp-r3', sub: 'rules', type: 'mcq', scn: 'A new dating app gives women free membership but charges men €10 a month.', q: 'Why might the app do this?', opts: ['It\'s a mistake: pricing should always be equal', 'Women are the "magnet" side that attracts men, so subsidising them raises the value of the platform to the paying side', 'It is illegal', 'It reduces the number of users'], a: 1, why: 'If one side is more valuable to the other and more price-sensitive, it makes sense to subsidise it and earn from the other side. The price structure matters as much as the total.' },
    { id: 'msp-r4', sub: 'types', type: 'mcq', scn: 'Visa links cardholders with shops. iOS links iPhone users with app developers. A free newspaper site links readers with advertisers.', q: 'Match them in order.', opts: ['Transaction system; software platform; advertiser-supported media', 'Exchange; transaction system; software platform', 'Software platform; exchange; media', 'All three are exchanges'], a: 0, why: 'Payments network = transaction system. Operating system with apps = software platform. Content attracting audiences for advertisers = advertiser-supported media.' },
    { id: 'msp-r5', sub: 'price', type: 'mcq', scn: 'A card network charges merchants a fee and pays cardholders 1% cashback, but keeps the total it collects the same as before.', q: 'What has changed?', opts: ['The price level', 'The price structure (how the total is split between the two sides)', 'Neither', 'The number of sides'], a: 1, why: 'The total collected (level) stays the same, but who pays and who gets paid changes: that is the price structure.' },
    { id: 'msp-r6', sub: 'ads', type: 'num', scn: 'A search engine sells two ad slots. Slot 1 gets 100 clicks an hour; slot 2 gets 50. Three advertisers bid per click: €8, €5 and €3. It uses a generalised second-price auction.', q: 'How much does the winner of slot 1 pay per hour (€)?', ans: 500, unit: '€', calc: () => 5 * 100, why: 'The slot-1 winner (bid 8) pays the NEXT bid (5) per click: 5 × 100 clicks = €500 an hour. The slot-2 winner (bid 5) pays 3 per click: 3 × 50 = €150.', steps: ['Rank bids: 8, 5, 3', 'Slot 1 winner pays the next bid: €5 per click', '5 × 100 clicks = 500'] },
    { id: 'msp-r7', sub: 'wta', type: 'mcq', scn: 'Friendster was an early social network. MySpace overtook it, then Facebook overtook MySpace.', q: 'What does this history suggest?', opts: ['Network effects always guarantee the first mover wins', 'Network effects help early leaders but don\'t guarantee they stay on top: entry is easy, switching is easy and innovation disrupts', 'Platforms never make money', 'Social networks are impossible to compete in'], a: 1, why: 'Evans & Schmalensee argue winner-takes-all is overstated: low entry costs and easy switching allow challengers to win.' }
  ]
};
