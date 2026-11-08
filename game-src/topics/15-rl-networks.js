/* Real-life layer for Level 6: Networks. */
RL.lv.net = (() => {
  // Six friends on WhatsApp: Ana-Ben, Ana-Cal, Ana-Dee, Cal-Dee, Dee-Eli, Dee-Fay
  const N = { Ana: [90, 60], Ben: [30, 30], Cal: [90, 150], Dee: [190, 105], Eli: [280, 50], Fay: [280, 160] };
  const E = [['Ana', 'Ben'], ['Ana', 'Cal'], ['Ana', 'Dee'], ['Cal', 'Dee'], ['Dee', 'Eli'], ['Dee', 'Fay']];
  const friends = () => DG.graph({ nodes: N, edges: E.map(e => [e[0], e[1], 'e']), w: 340, h: 210 });
  // Balance triangle: Anna-Ben friends, Ben-Carl friends, Anna-Carl enemies
  const tri = () => DG.graph({ nodes: { Anna: [60, 140], Ben: [170, 30], Carl: [280, 140] }, edges: [['Anna', 'Ben', '+'], ['Ben', 'Carl', '+'], ['Anna', 'Carl', '-']], w: 340, h: 190, legend: true });
  return {
    story: {
      title: 'Who do you know?',
      html: `<p>Aoife has been job-hunting for two months. She tells her five closest friends. They all say "I\'ll keep an eye out", but they all work in the same industry, read the same websites and know the same jobs. Nothing new turns up.</p>
        <p>Then, at a hiking club, she chats to Tomás, someone she\'s met only a few times. He mentions his cousin\'s company is hiring. She applies, and she gets the job.</p>
        <p>Why did the acquaintance beat the close friends? Because close friends travel in the same circles; <b>acquaintances link you to different worlds</b>. That is the <b>strength of weak ties</b>.</p>
        <p>Networks also explain why two of your friends who've never met are likely to meet through you (<b>triadic closure</b>), why "everyone is six steps from everyone" (<b>small world</b>), and why a family like the Medici in Renaissance Florence got powerful by sitting <i>between</i> groups rather than by being the richest.</p>
        <p>The rest of the level is the maths of "who is connected to whom".</p>`,
      tip: 'In the exam you are drawing and labelling small graphs. Slow down: list each node\'s neighbours first, then answer.'
    },
    gloss: [
      ['Node', 'one item in a network (a person, firm, country).', 'you in a friend group'],
      ['Edge', 'a link between two nodes.', 'a friendship'],
      ['Bridge', 'a link that is the only connection between two parts of a network.', 'the one friend who knows people from both your school and your work']
    ],
    hints: {
      'net-b1.0': 'Aoife\'s story: close friends know the same jobs; acquaintances like Tomás connect you to NEW information. Now: if A is strong-tied to both B and C, STCP says B and C must at least be connected. How does that make any "bridge" a weak tie?',
      'net-b1.1': 'For each node, list its strong ties. If it has two strong ties, those two people must know each other (be linked). If not, that node breaks the rule. Which edges would you add to fix it?',
      'net-b1.2': 'Treat each triangle of three countries like three people in a group: either everyone is friends, or two friends share an enemy. What is unstable about "two friends, but they hate each other\'s friend"?'
    },
    card: {
      'net-c1': {
        plain: 'A network is just dots (people) and lines (who is linked to whom).',
        icon: '📱', stitle: 'Picture this',
        story: `<p>Draw each of your friends as a dot and join two dots if they know each other: that is a network. A <b>path</b> is a chain of people you could pass a message along. The <b>distance</b> between two people is the shortest such chain. If everyone can reach everyone, the network is one <b>connected</b> piece; if there are separate friend groups with no links between them, there are several <b>components</b>.</p>`,
        simple: `<ol><li><b>Node</b> = a person (dot). <b>Edge</b> = a link (line).</li><li><b>Path</b> = a chain of edges from one node to another; its length is the number of edges.</li><li><b>Distance</b> = the shortest path length.</li><li><b>Connected</b> = there is a path between every pair. <b>Component</b> = a separate connected chunk.</li></ol>`,
        jargon: [['Node', 'a dot in the network'], ['Edge', 'a link between two nodes'], ['Path', 'a chain of linked nodes', 'A → B → C'], ['Component', 'a connected piece of the network', 'two friend groups with nobody in common']]
      },
      'net-c2': {
        plain: 'Centrality asks: "who is most important in this network?", and there are three ways to answer.',
        icon: '👑', stitle: 'Picture this',
        story: `<p>In a friend group, one person has the most friends (<b>degree</b>). Another is the one everyone else is close to in a few steps (<b>closeness</b>). A third is the person who is the link between two cliques: if she leaves, the cliques stop talking (<b>betweenness</b>). They could be three different people.</p>`,
        simple: `<ol><li><b>Degree:</b> how many direct links you have.</li><li><b>Closeness:</b> how short your paths are to everyone else (sum of distances is small).</li><li><b>Betweenness:</b> how often you sit on the shortest path between two other people.</li><li>List neighbours first. Then count. Don\'t guess from the picture.</li></ol>`,
        jargon: [['Degree', 'number of direct links', 'how many people are in your phonebook'], ['Closeness', 'how near you are to everyone else'], ['Betweenness', 'how often you sit between other people', 'the friend who links two cliques']]
      },
      'net-c3': {
        plain: 'Your acquaintances are more likely than your close friends to bring you news you haven\'t heard.',
        icon: '🥾', stitle: 'Picture this',
        story: `<p>Aoife\'s close friends all knew the same job openings. Tomás, a weak tie, was part of a different world and brought something new. Sociologist Mark Granovetter found people more often heard about jobs through <b>weak ties</b>.</p>`,
        simple: `<ol><li><b>Strong ties:</b> close friends. <b>Weak ties:</b> acquaintances.</li><li>Close friends overlap in what they know; acquaintances open new circles.</li><li>A <b>bridge</b> is an edge whose removal splits the network. In real social networks, bridges are almost always weak ties.</li><li>Takeaway for careers: nurture a wide net of acquaintances, not just close friends.</li></ol>`,
        jargon: [['Strong tie', 'a close friendship'], ['Weak tie', 'an acquaintance'], ['Bridge', 'a link whose removal disconnects the network']]
      },
      'net-c4': {
        plain: 'If two of your friends don\'t know each other, they are likely to meet and befriend each other sooner or later.',
        icon: '🥂', stitle: 'Picture this',
        story: `<p>You introduce two friends at your birthday. A few weeks later they\'re friends. Why? They both spend time with you (<b>opportunity</b>), both trust you (<b>trust</b>), and you\'d be happier if your friends got along (<b>incentive</b>). Networks fill in triangles over time: <b>triadic closure</b>.</p>`,
        simple: `<ol><li><b>Triadic closure:</b> A–B and A–C exist → B–C is likely to appear.</li><li>Three reasons: <b>opportunity, trust, incentive</b>.</li><li><b>Strong Triadic Closure Property (STCP):</b> if A has strong ties to both B and C, then B and C must have at least a weak tie.</li><li>A node <b>violates</b> STCP if it has two strong ties to people who aren\'t linked at all. To fix: add the missing edge, or make a tie weak.</li></ol>`,
        jargon: [['Triadic closure', 'two friends of a person become friends'], ['STCP', 'strong ties to both → those two are at least acquainted'], ['Violation', 'a node with two strong ties whose owners have no link']]
      },
      'net-c5': {
        plain: 'In a group, "my friend\'s enemy is my enemy" tends to hold; triangles that break that pattern are stressful.',
        icon: '🥊', stitle: 'Picture this',
        story: `<p>Anna and Ben are friends. Ben and Carl are friends. But Anna and Carl hate each other. Ben is stuck in the middle: pressure builds until either Anna and Carl make up, or Ben picks a side. A stable group is one where friends of friends are friends and enemies of enemies are friends.</p>${tri()}`,
        simple: `<ol><li>Label each link <b>+</b> (friends) or <b>−</b> (enemies).</li><li>A triangle is <b>balanced</b> if it has three + or exactly one + (two −).</li><li>It is <b>unbalanced</b> with two + and one −, or three −.</li><li>Unbalanced triangles are unstable: relationships will shift.</li><li>Europe before WW1 split into two hostile alliance blocks: a very balanced network.</li></ol>`,
        jargon: [['Balanced', 'a stable pattern of friends and enemies'], ['Unbalanced', 'a stressful pattern likely to change', 'two friends who hate each other\'s friend']]
      },
      'net-c6': {
        plain: 'Even in huge networks, any two people are connected through only a handful of introductions.',
        icon: '🌍', stitle: 'Picture this',
        story: `<p>In the 1960s, Stanley Milgram asked people in the US Midwest to get a letter to a stranger in Boston by sending it to someone they knew who might know them. Letters that arrived took about six steps. That is the "six degrees of separation" idea (like the Kevin Bacon game).</p>`,
        simple: `<ol><li>Milgram\'s experiment: forward a letter via acquaintances to reach a stranger.</li><li>The letters that arrived needed about <b>six</b> steps.</li><li>Two lessons: <b>short paths exist</b>, and people can <b>find</b> them with only local knowledge.</li><li>Caveat: many letters never arrived, so the average is biased towards short paths.</li></ol>`,
        jargon: [['Small world', 'a large network in which everyone is only a few steps from everyone else'], ['Six degrees', 'the idea that anyone is about six introductions from anyone else']]
      },
      'net-c7': {
        plain: 'Power comes from where you sit in the network, not only from how rich or popular you are.',
        icon: '🏛️', stitle: 'Picture this',
        story: `<p>Imagine two groups at a school: old money families and a new crowd of entrepreneurs. They don\'t mix. One family is friends with both groups and trades favours between them. That family becomes the go-to for everything. In 15th-century Florence the Medici did exactly this: they weren\'t the richest family, but they were the connectors between rival groups.</p>`,
        simple: `<ol><li>The Medici were not the richest or most politically seated Florentine family.</li><li>But they linked two otherwise separate groups of elite families (old patricians and new money).</li><li>Anyone needing to move between the groups had to go through them: high <b>betweenness</b>.</li><li>Lesson: <b>structural position</b> (brokerage) can matter more than raw wealth.</li></ol>`,
        jargon: [['Broker', 'someone who links groups that otherwise don\'t connect'], ['Structural position', 'where you sit in the network']]
      }
    },
    extra: [
      { id: 'net-r1', sub: 'vocab', type: 'mcq', scn: 'In a WhatsApp group of six friends: Ana knows Ben, Cal and Dee. Cal also knows Dee. Dee also knows Eli and Fay. (See the picture.)', svg: friends, q: 'Who has the highest degree (most direct links)?', opts: ['Ana (3)', 'Dee (4)', 'Cal (2)', 'Ben (1)'], a: 1, why: 'Dee is linked to Ana, Cal, Eli and Fay: degree 4. Ana has 3, Cal 2, and Ben, Eli and Fay 1 each.' },
      { id: 'net-r2', sub: 'central', type: 'mcq', scn: 'Same six friends: Ana–Ben, Ana–Cal, Ana–Dee, Cal–Dee, Dee–Eli, Dee–Fay.', svg: friends, q: 'If Dee left the group, who would be cut off from the others?', opts: ['Nobody', 'Eli and Fay', 'Ben', 'Ana and Cal'], a: 1, why: 'Eli and Fay are only linked to Dee. This shows Dee has very high betweenness: all paths from Eli or Fay go through her.' },
      { id: 'net-r3', sub: 'ties', type: 'mcq', scn: 'You want to hear about jobs you don\'t know about yet. Option 1: ask your flatmate and best friend, who work in the same industry. Option 2: ask a woman you met once at a hiking club who works in a completely different field.', q: 'According to Granovetter, who is more likely to help?', opts: ['The flatmate: strong ties are more helpful', 'The hiking-club acquaintance: weak ties connect you to different circles and new information', 'Neither', 'Both equally'], a: 1, why: 'Close friends overlap with what you already know. Weak ties reach different circles and are more likely to bring new job information.' },
      { id: 'net-r4', sub: 'triadic', type: 'mcq', scn: 'At your birthday you introduce two friends who didn\'t know each other. Three months later they\'re close friends.', q: 'Which idea best describes this?', opts: ['Structural balance', 'Triadic closure', 'Winner\'s curse', 'Deadweight loss'], a: 1, why: 'Two people with a common friend (you) are likely to become friends: the triangle gets "closed".' },
      { id: 'net-r5', sub: 'balance', type: 'mcq', scn: 'Anna and Ben are friends. Ben and Carl are friends. Anna and Carl cannot stand each other.', svg: tri, q: 'In structural-balance terms, this triangle is…', opts: ['Balanced: two friendships keep it stable', 'Unbalanced: Ben is caught between two enemies, so something will have to change', 'Balanced because it has two + edges', 'Impossible'], a: 1, why: 'Two + and one − is unbalanced. Pressure builds until Anna and Carl make up or Ben picks a side.' },
      { id: 'net-r6', sub: 'small', type: 'mcq', scn: 'A newspaper claims "everyone is six steps from everyone". Milgram\'s letters mostly never reached the stranger.', q: 'What is a fair criticism of the claim?', opts: ['Letters that arrived were the short chains; many chains never completed, so average length may be understated', 'Six steps is too many', 'It is not possible to forward letters', 'The experiment had too many participants'], a: 0, why: 'Only the completed chains (the shorter ones) were counted. Still, the lesson holds: short paths exist and people can find them.' },
      { id: 'net-r7', sub: 'medici', type: 'tf', scn: 'A classmate says: "The richest person in a network is always the most powerful."', q: 'True or false (and why)?', a: false, why: 'False. In Florence the Medici were not the richest family, but their position linking different groups gave them influence. Brokerage between groups can matter more than wealth.' }
    ]
  };
})();
