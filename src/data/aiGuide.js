export const AI_GUIDE_DISCLAIMER =
  "FOINWI AI content is for educational purposes only and should not be considered financial, investment, tax, legal, or loan advice.";

export const FINANCIAL_GOALS = [
  {
    id: "build-wealth",
    icon: "📈",
    title: "Build Wealth",
    description:
      "FOINWI AI will walk you through investing fundamentals, SIP planning, and long-term wealth habits — connecting lessons, calculators, and your Build Wealth mission.",
    missionSlug: "build-wealth",
    learnSlug: "investing-fundamentals",
  },
  {
    id: "buy-a-home",
    icon: "🏠",
    title: "Buy a Home",
    description:
      "Understand affordability, down payment planning, loan eligibility, and EMI comfort with guided learning, home calculators, and the Buy Your Dream Home mission.",
    missionSlug: "buy-dream-home",
    learnSlug: "loans-emi",
  },
  {
    id: "child-education",
    icon: "🎓",
    title: "Child Education",
    description:
      "Plan education costs with inflation-aware thinking, goal-based savings, and structured guidance across learning paths, calculators, and the Child Education mission.",
    missionSlug: "child-education",
    learnSlug: "saving-budgeting",
  },
  {
    id: "retirement",
    icon: "🌅",
    title: "Retirement",
    description:
      "Explore retirement corpus needs, pension products, and withdrawal concepts through lessons, EPF and NPS calculators, and the Retirement Planning mission.",
    missionSlug: "retirement-planning",
    learnSlug: "retirement-planning",
  },
  {
    id: "manage-debt",
    icon: "💳",
    title: "Manage Debt",
    description:
      "Learn how EMIs, prepayment, and repayment strategies work — with loan calculators, debt-focused lessons, and the Become Debt Free mission.",
    missionSlug: "become-debt-free",
    learnSlug: "loans-emi",
  },
  {
    id: "learn-investing",
    icon: "💡",
    title: "Learn Investing",
    description:
      "Start with money basics and grow into mutual funds, SIP, and portfolio thinking — guided across Learn Academy paths and related calculators.",
    missionSlug: "build-wealth",
    learnSlug: "money-basics",
  },
];

export const AI_GUIDES = [
  {
    id: "wealth",
    icon: "💎",
    title: "Wealth Guide",
    description:
      "A structured educational guide covering SIP, lumpsum growth, goal planning, and long-term wealth building for Indian investors.",
    topics: ["SIP and compounding", "Goal-based investing", "Return assumptions"],
    missionSlug: "build-wealth",
    learnSlug: "mutual-funds-sip",
  },
  {
    id: "home",
    icon: "🏡",
    title: "Home Guide",
    description:
      "Learn home-buying steps — budget, down payment, loan eligibility, EMI scenarios, and affordability checks in plain language.",
    topics: ["Loan eligibility", "EMI planning", "Down payment savings"],
    missionSlug: "buy-dream-home",
    learnSlug: "loans-emi",
  },
  {
    id: "tax",
    icon: "🧾",
    title: "Tax Guide",
    description:
      "Understand salary tax, Old vs New regime concepts, HRA, and common deductions through guided lessons and calculator walkthroughs.",
    topics: ["Regime comparison", "HRA basics", "Deduction planning"],
    missionSlug: "save-tax",
    learnSlug: "income-tax-basics",
  },
  {
    id: "family",
    icon: "🛡️",
    title: "Family Guide",
    description:
      "Explore emergency funds, protection planning, and family financial readiness — linking insurance concepts to practical planning tools.",
    topics: ["Emergency funds", "Family protection", "Financial readiness"],
    missionSlug: "protect-your-family",
    learnSlug: "insurance-planning",
  },
  {
    id: "retirement",
    icon: "🌴",
    title: "Retirement Guide",
    description:
      "Walk through retirement corpus planning, EPF and NPS concepts, inflation impact, and income-from-corpus ideas for post-retirement life.",
    topics: ["Corpus planning", "EPF and NPS", "Withdrawal concepts"],
    missionSlug: "retirement-planning",
    learnSlug: "retirement-planning",
  },
];

export const DAILY_AI_INSIGHT = {
  eyebrow: "Daily AI Insight",
  title: "Why small SIP amounts compound into meaningful wealth",
  summary:
    "Regular monthly investing lets you benefit from rupee-cost averaging and compounding over time. Even modest contributions can grow significantly when given enough years — the key is consistency, not timing the market.",
  learnSlug: "mutual-funds-sip",
  readTime: "5 min",
};

export const AI_ROADMAP = {
  availableToday: {
    label: "Available Today",
    status: "live",
    items: [
      {
        title: "20 Financial Calculators",
        description: "SIP, EMI, tax, retirement, and more — with Explain My Result guidance on every tool.",
        link: { to: "/calculators", label: "Browse calculators" },
      },
      {
        title: "Learn Academy",
        description: "Eight structured learning paths from money basics to retirement planning.",
        link: { to: "/learn", label: "Explore paths" },
      },
      {
        title: "Financial Missions",
        description: "Goal-based journeys for home, wealth, tax, education, debt, and family planning.",
        link: { to: "/journeys/buy-dream-home", label: "View missions" },
      },
      {
        title: "Financial Health Score",
        description: "A 12-question wellness assessment across savings, protection, debt, and planning.",
        link: { to: "/financial-health-score", label: "Take assessment" },
      },
    ],
  },
  comingNext: {
    label: "Coming Next",
    status: "next",
    items: [
      {
        title: "AI Money Guide",
        description: "Conversational guidance that explains calculator results and money concepts step by step.",
      },
      {
        title: "AI SIP Planner",
        description: "Interactive planning that connects SIP amounts, tenure, and goal targets in one flow.",
      },
      {
        title: "AI Loan Guide",
        description: "Guided EMI comparisons, affordability checks, and prepayment scenario walkthroughs.",
      },
      {
        title: "AI Tax Helper",
        description: "Plain-language tax concept explanations linked to FOINWI salary and HRA calculators.",
      },
    ],
  },
  futureVision: {
    label: "Future Vision",
    status: "future",
    items: [
      {
        title: "Personalised learning journeys",
        description: "Adaptive paths that suggest the next lesson, calculator, or mission based on your goals.",
      },
      {
        title: "Cross-goal planning assistant",
        description: "See how home, education, retirement, and wealth goals interact in one educational view.",
      },
      {
        title: "Lifelong financial companion",
        description: "A continuous learning experience that grows with you from first salary to retirement.",
      },
    ],
  },
};

export const CONTINUE_LEARNING = {
  headline: "Continue Your Journey",
  description:
    "Pick up where structured learning meets practical tools — these paths and calculators are natural next steps after exploring FOINWI AI.",
  paths: [
    {
      slug: "money-basics",
      reason: "Foundation for every financial goal",
    },
    {
      slug: "mutual-funds-sip",
      reason: "Essential for wealth-building goals",
    },
    {
      slug: "loans-emi",
      reason: "Key for home and debt planning",
    },
  ],
  calculators: [
    { path: "/sip-calculator", reason: "Start with monthly investing" },
    { path: "/goal-planner", reason: "Map savings to a target" },
    { path: "/emi-calculator", reason: "Understand loan repayment" },
  ],
};

export const AI_VISION = {
  eyebrow: "Our Vision",
  title: "A lifelong financial learning companion",
  paragraphs: [
    "FOINWI AI is being designed to sit alongside calculators, lessons, and missions — helping you understand not just the numbers, but what they mean for your goals.",
    "Whether you are saving for a home, planning retirement, or learning to invest for the first time, the experience will guide you through concepts, tools, and next steps in clear, structured language.",
    "This is financial education built for India — patient, practical, and designed to grow with you at every stage of life.",
  ],
};
