// Simulated AI Content Moderation & NLP Classifier for Bengaluru Civic Issues

const INAPPROPRIATE_KEYWORDS = [
  'kill', 'hate', 'stupid idiots', 'bastard', 'scam', 'violence', 'weapon',
  'porn', 'nude', 'abuse', 'cheat', 'attack', 'fake', 'curse', 'threat'
];

const CIVIC_KEYWORDS = {
  BBMP: [
    'pothole', 'road', 'crater', 'tar', 'asphalt', 'footpath', 'sidewalk',
    'streetlight', 'light', 'lamp', 'bridge', 'underpass', 'flyover', 'divider',
    'encroachment', 'tree', 'branch', 'dog', 'stray dog', 'park'
  ],
  BBMP_SOLID_WASTE: [
    'garbage', 'waste', 'dump', 'trash', 'debris', 'litter', 'smell', 'stench',
    'cleaning', 'compost', 'black spot', 'bin', 'sweeper'
  ],
  BESCOM: [
    'power', 'electricity', 'current', 'transformer', 'blackout', 'wire',
    'cable', 'spark', 'electric pole', 'voltage', 'feeder', 'meter', 'shock'
  ],
  BWSSB: [
    'water', 'pipe', 'leak', 'burst', 'drainage', 'sewage', 'manhole',
    'tanker', 'cauvery', 'overflow', 'gutter', 'stink', 'drain', 'valve'
  ],
  BTP: [
    'traffic', 'signal', 'jam', 'parking', 'one way', 'junction',
    'speed breaker', 'barricade', 'challan', 'towing', 'gridlock'
  ],
  KSPCB: [
    'lake', 'foam', 'pollution', 'factory', 'chemical', 'noise', 'smoke',
    'burning', 'effluent', 'air quality'
  ]
};

export function analyzePostWithAI(title = '', body = '', image = null) {
  const combinedText = `${title} ${body}`.toLowerCase();
  
  // 1. Inappropriate & Hate Speech Detection
  const flaggedWords = INAPPROPRIATE_KEYWORDS.filter(word => combinedText.includes(word));
  const isInappropriate = flaggedWords.length > 0;
  
  if (isInappropriate) {
    return {
      isValid: false,
      safetyScore: Math.floor(Math.random() * 30) + 10,
      reason: `Flagged by AI Safety Guard: Contains potentially inappropriate or uncivil language (${flaggedWords.join(', ')}). Please rephrase politely to ensure constructive government resolution.`,
      suggestedDept: null,
      severity: 'Flagged',
      keywordsFound: flaggedWords
    };
  }

  // 2. Minimum content check
  if (combinedText.trim().length < 15) {
    return {
      isValid: false,
      safetyScore: 50,
      reason: 'AI Analysis: Description is too brief. Please describe the exact street location and the nature of the issue for BBMP/BESCOM/BWSSB officials to take action.',
      suggestedDept: null,
      severity: 'Low Detail',
      keywordsFound: []
    };
  }

  // 3. Civic Categorization & Department Auto-detection
  let bestDept = 'BBMP';
  let maxMatches = 0;
  let detectedKeywords = [];

  for (const [dept, keywords] of Object.entries(CIVIC_KEYWORDS)) {
    const matched = keywords.filter(kw => combinedText.includes(kw));
    if (matched.length > maxMatches) {
      maxMatches = matched.length;
      bestDept = dept;
      detectedKeywords = matched;
    }
  }

  // 4. Severity Assessment
  let severity = 'Moderate';
  if (
    combinedText.includes('emergency') ||
    combinedText.includes('accident') ||
    combinedText.includes('spark') ||
    combinedText.includes('live wire') ||
    combinedText.includes('flood') ||
    combinedText.includes('burst') ||
    combinedText.includes('crater') ||
    combinedText.includes('danger')
  ) {
    severity = 'High Hazard';
  } else if (combinedText.includes('burst') || combinedText.includes('stray dog') || combinedText.includes('stench')) {
    severity = 'Medium Priority';
  }

  // 5. Image Check Simulation
  let imageCheck = { valid: true, note: 'Photo attached & verified' };
  if (image) {
    imageCheck = {
      valid: true,
      label: 'Civic Infrastructure Imagery Confirmed',
      confidence: 96.4
    };
  }

  return {
    isValid: true,
    safetyScore: 95 + Math.floor(Math.random() * 5), // 95 - 99%
    suggestedDept: bestDept,
    severity,
    detectedKeywords,
    imageCheck,
    reason: 'AI Content Moderation Passed: Clean, constructive civic issue description verified. Suitable for official BBMP/Government routing.'
  };
}

// AI Civic Chatbot Knowledge Base & Matcher
export function getChatbotResponse(query, posts = []) {
  const q = query.toLowerCase().trim();

  // 1. Search for solved/unsolved problems in a locality
  const localities = ['koramangala', 'indiranagar', 'hsr', 'whitefield', 'jayanagar', 'malleshwaram', 'bellandur', 'btm', 'hebbal', 'rajajinagar'];
  const matchedLocality = localities.find(loc => q.includes(loc));

  if (q.includes('pothole') || q.includes('road') || q.includes('crater')) {
    const roadIssues = posts.filter(p => p.departmentId === 'BBMP');
    const localityMatches = matchedLocality ? roadIssues.filter(p => p.localityId.includes(matchedLocality)) : roadIssues;
    
    if (localityMatches.length > 0) {
      const resolved = localityMatches.filter(p => p.status === 'RESOLVED');
      const pending = localityMatches.filter(p => p.status !== 'RESOLVED');
      return {
        reply: `🔍 **AI Scan Results for Road & Pothole Issues${matchedLocality ? ` in ${matchedLocality.toUpperCase()}` : ''}:**\n\n` +
          `• **Total Reported:** ${localityMatches.length} issues\n` +
          `• **Status:** ${resolved.length} Resolved ✅, ${pending.length} Under Repair / In Progress ⏳\n\n` +
          `**Latest highlight:** "${localityMatches[0].title}" (Ticket #${localityMatches[0].ticketId} - ${localityMatches[0].status.replace('_', ' ')})\n\n` +
          `💡 *Tip: You can amplify existing tickets in the feed or click the '+' button to post a new crater with photo.*`,
        relatedPosts: localityMatches
      };
    }
  }

  if (q.includes('water') || q.includes('bwssb') || q.includes('pipe') || q.includes('drainage') || q.includes('tanker')) {
    const waterIssues = posts.filter(p => p.departmentId === 'BWSSB');
    return {
      reply: `💧 **BWSSB Water & Sewerage Status Scan:**\n\n` +
        `• Found **${waterIssues.length} active water alerts** across Bengaluru.\n` +
        `• Emergency Pipeline burst reported on **27th Main HSR Layout** (Ticket #BWSSB-2026-1092) - BWSSB emergency valve team is currently deployed.\n\n` +
        `📞 **Emergency BWSSB Water Tanker Helpline:** \`1916\` or \`080-22238888\`\n` +
        `Would you like to file a new low-pressure or sewage overflow grievance?`,
      relatedPosts: waterIssues
    };
  }

  if (q.includes('power') || q.includes('bescom') || q.includes('electricity') || q.includes('light') || q.includes('wire')) {
    const powerIssues = posts.filter(p => p.departmentId === 'BESCOM');
    return {
      reply: `⚡ **BESCOM Power & Safety Assistant:**\n\n` +
        `• **Active Electrical Tickets:** ${powerIssues.length}\n` +
        `• **Recent Resolution:** Dangling live cables on Indiranagar 12th Main was **RESOLVED** by BESCOM East team! ✅\n\n` +
        `📞 **BESCOM 24x7 Helpline:** Call \`1912\` or WhatsApp live photos to \`9483191212\`\n` +
        `⚠️ *Caution: Never approach fallen transformers or sparkling wires during Bengaluru rainstorms.*`,
      relatedPosts: powerIssues
    };
  }

  if (q.includes('garbage') || q.includes('waste') || q.includes('dump') || q.includes('trash')) {
    const wasteIssues = posts.filter(p => p.departmentId === 'BBMP_SOLID_WASTE');
    return {
      reply: `🗑️ **BBMP Solid Waste Management (Kasa Vilevaari):**\n\n` +
        `• BBMP marshals are monitoring commercial black-spots on ECC Road, Whitefield (Ticket #BBMP-2026-7734).\n` +
        `• You can report uncollected garbage, open debris, or illegal dumping directly with geo-tagged photos.\n\n` +
        `💡 *BBMP auto-schedules dry & wet waste collection trucks daily between 6:30 AM – 11:30 AM.*`,
      relatedPosts: wasteIssues
    };
  }

  if (q.includes('helpline') || q.includes('phone') || q.includes('contact') || q.includes('number')) {
    return {
      reply: `📞 **Official Bengaluru Civic Helplines Directory (24x7):**\n\n` +
        `• **BBMP Control Room:** \`1533\` / \`080-22660000\`\n` +
        `• **BESCOM Electricity:** \`1912\` (WhatsApp: 9483191212)\n` +
        `• **BWSSB Water & Sewage:** \`1916\` / \`080-22238888\`\n` +
        `• **Bengaluru Traffic Police (BTP):** \`1095\`\n` +
        `• **Emergency Citizen Response (Police):** \`112\`\n` +
        `• **BBMP Stray Dog & Animal Control:** \`080-22660000\`\n\n` +
        `All these agencies are directly integrated with Namma Bengaluru Civic Voice!`,
      relatedPosts: []
    };
  }

  if (q.includes('how to post') || q.includes('how it works') || q.includes('complaint')) {
    return {
      reply: `📋 **How Namma Bengaluru Civic Voice works (Simple 3 Steps):**\n\n` +
        `1️⃣ **Click the (+) Floating Action Button** to compose a civic tweet.\n` +
        `2️⃣ **Add Location & Photo** - Our AI Content Guard instantly checks the post for appropriateness and auto-tags the responsible department (BBMP/BESCOM/BWSSB).\n` +
        `3️⃣ **Amplify & Track** - Fellow Bengaluru citizens can upvote ("Amplify") your issue. High-upvoted issues trigger instant automated escalations to the Ward Corporator & Executive Engineers!\n\n` +
        `Are you ready to report an issue in your locality?`,
      relatedPosts: []
    };
  }

  // General search across posts title & body
  const queryWords = q.split(' ').filter(w => w.length > 2);
  const matched = posts.filter(post => {
    const text = `${post.title} ${post.body} ${post.localityName} ${post.ticketId}`.toLowerCase();
    return queryWords.some(word => text.includes(word));
  });

  if (matched.length > 0) {
    return {
      reply: `🔎 Found **${matched.length} related civic issue(s)** in Bengaluru matching "${query}":\n\n` +
        matched.map(p => `• **${p.title}** (${p.localityName} • #${p.ticketId} • *${p.status}*)`).join('\n') +
        `\n\nCheck the highlighted cards below to amplify or track their official resolution updates.`,
      relatedPosts: matched
    };
  }

  return {
    reply: `👋 **Namaskara! I am Namma Mitra AI**, your Bengaluru Civic Companion.\n\n` +
      `I couldn't find an existing open ticket for "${query}".\n\n` +
      `You can:\n` +
      `• Ask me about **potholes, water supply, BESCOM power outages, or garbage dumping**\n` +
      `• Check if an issue in **Koramangala, Indiranagar, HSR Layout, or Whitefield** is resolved\n` +
      `• Ask for **civic emergency helplines**\n` +
      `• Or post a new issue using the **New Complaint** button!`,
    relatedPosts: []
  };
}
