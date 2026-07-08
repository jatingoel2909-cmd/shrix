export const LEARN_ACADEMY_NOTICE =
  "Learning content is for educational purposes only and should not be considered financial, investment, tax, legal, or loan advice.";

export const LEARNING_PATHS = [
  {
    slug: "money-basics",
    icon: "💡",
    title: "Money Basics",
    description:
      "Build a clear foundation — what money is, how inflation erodes value, and why compounding and goals matter.",
    duration: "45 min",
    difficulty: "Beginner",
    relatedCalculators: [
      "/inflation-calculator",
      "/compound-interest-calculator",
      "/goal-planner",
    ],
    nextPath: "saving-budgeting",
    lessons: [
      {
        id: 1,
        title: "What is Money?",
        summary:
          "Money is a medium of exchange, a store of value, and a unit of account. Understanding these three roles helps explain why saving, spending, and planning all connect to everyday decisions.",
        calculators: [],
      },
      {
        id: 2,
        title: "Inflation",
        summary:
          "Inflation means prices rise over time, so the same amount of money buys less in the future. This is why long-term goals need to account for rising costs, not just today's prices.",
        calculators: ["/inflation-calculator"],
      },
      {
        id: 3,
        title: "Compounding",
        summary:
          "Compounding means earning returns on both your original amount and on accumulated returns. Over long periods, even modest rates can grow significantly — patience matters more than timing.",
        calculators: ["/compound-interest-calculator", "/sip-calculator"],
      },
      {
        id: 4,
        title: "Time Value of Money",
        summary:
          "A rupee today is worth more than a rupee later because it can be saved or invested. Time value of money is the idea behind interest, EMIs, and comparing options across different time horizons.",
        calculators: ["/compound-interest-calculator", "/fd-calculator"],
      },
      {
        id: 5,
        title: "Financial Goals",
        summary:
          "Goals give direction to saving and spending. Short-term goals (1–3 years), medium-term (3–7 years), and long-term (7+ years) often need different approaches and time horizons.",
        calculators: ["/goal-planner"],
      },
    ],
  },
  {
    slug: "saving-budgeting",
    icon: "💰",
    title: "Saving & Budgeting",
    description:
      "Learn practical habits for tracking income, controlling expenses, and building an emergency buffer before investing.",
    duration: "50 min",
    difficulty: "Beginner",
    relatedCalculators: ["/goal-planner", "/rd-calculator", "/fd-calculator"],
    nextPath: "investing-fundamentals",
    lessons: [
      {
        id: 1,
        title: "Needs vs Wants",
        summary:
          "Needs are essentials for living and working; wants improve comfort or lifestyle. Separating the two makes it easier to decide what to cut when income is limited.",
        calculators: [],
      },
      {
        id: 2,
        title: "Building a Monthly Budget",
        summary:
          "A budget maps income to categories — rent, food, transport, savings, and discretionary spending. The 50-30-20 rule is one common educational framework, though personal ratios vary.",
        calculators: ["/goal-planner"],
      },
      {
        id: 3,
        title: "Emergency Funds",
        summary:
          "An emergency fund covers unexpected expenses or income loss. Many educational guides suggest 3–6 months of essential expenses kept in accessible savings.",
        calculators: ["/goal-planner", "/fd-calculator"],
      },
      {
        id: 4,
        title: "Saving Strategies",
        summary:
          "Pay-yourself-first, automated transfers, and separate accounts for goals can make saving more consistent. Small, regular amounts often beat irregular large deposits.",
        calculators: ["/rd-calculator", "/fd-calculator"],
      },
      {
        id: 5,
        title: "Tracking Expenses",
        summary:
          "Reviewing spending monthly reveals patterns — subscriptions, dining, or impulse purchases. Awareness alone often helps redirect money toward priorities.",
        calculators: ["/goal-planner"],
      },
    ],
  },
  {
    slug: "investing-fundamentals",
    icon: "📊",
    title: "Investing Fundamentals",
    description:
      "Understand risk, return, asset classes, and how inflation affects real wealth over time.",
    duration: "55 min",
    difficulty: "Beginner",
    relatedCalculators: [
      "/cagr-calculator",
      "/inflation-calculator",
      "/compound-interest-calculator",
    ],
    nextPath: "mutual-funds-sip",
    lessons: [
      {
        id: 1,
        title: "Risk and Return",
        summary:
          "Higher potential returns usually come with higher uncertainty. Equity tends to be more volatile than fixed deposits, but may offer higher long-term growth — neither is guaranteed.",
        calculators: ["/cagr-calculator"],
      },
      {
        id: 2,
        title: "Asset Classes in India",
        summary:
          "Common asset classes include equity, debt, gold, and real estate. Each behaves differently across market cycles, which is why diversification is often discussed in educational material.",
        calculators: ["/fd-calculator", "/ppf-calculator"],
      },
      {
        id: 3,
        title: "Power of Compounding",
        summary:
          "Starting early gives your money more time to compound. Two investors with the same monthly amount can end up with very different outcomes based on duration and consistency.",
        calculators: ["/compound-interest-calculator", "/sip-calculator"],
      },
      {
        id: 4,
        title: "Inflation and Real Returns",
        summary:
          "Nominal returns look good on paper, but inflation reduces purchasing power. Real return is roughly nominal return minus inflation — a useful way to compare options.",
        calculators: ["/inflation-calculator", "/cagr-calculator"],
      },
      {
        id: 5,
        title: "Getting Started with Investing",
        summary:
          "Many beginners start with emergency savings, then explore SIP, PPF, or FD based on goals and comfort with risk. Understanding concepts before committing capital is a sensible first step.",
        calculators: ["/sip-calculator", "/lumpsum-calculator", "/goal-planner"],
      },
    ],
  },
  {
    slug: "mutual-funds-sip",
    icon: "📈",
    title: "Mutual Funds & SIP",
    description:
      "Explore how mutual funds pool money, how SIP automates investing, and how to compare growth scenarios.",
    duration: "60 min",
    difficulty: "Intermediate",
    relatedCalculators: [
      "/sip-calculator",
      "/lumpsum-calculator",
      "/cagr-calculator",
      "/goal-planner",
    ],
    nextPath: "loans-emi",
    lessons: [
      {
        id: 1,
        title: "What Are Mutual Funds?",
        summary:
          "Mutual funds collect money from many investors and invest in a portfolio of stocks, bonds, or other assets. A fund manager (or index rules) decides allocation based on the fund's objective.",
        calculators: [],
      },
      {
        id: 2,
        title: "How SIP Works",
        summary:
          "A Systematic Investment Plan (SIP) invests a fixed amount at regular intervals — often monthly. Rupee-cost averaging means you buy more units when prices are lower and fewer when higher.",
        calculators: ["/sip-calculator"],
      },
      {
        id: 3,
        title: "Lumpsum vs SIP",
        summary:
          "Lumpsum means investing a single amount at once; SIP spreads investments over time. Each approach has different timing and cash-flow implications worth modelling before deciding.",
        calculators: ["/sip-calculator", "/lumpsum-calculator"],
      },
      {
        id: 4,
        title: "Understanding CAGR",
        summary:
          "Compound Annual Growth Rate (CAGR) smooths returns into a single annualised figure. It helps compare investments over different periods, though past CAGR does not predict future results.",
        calculators: ["/cagr-calculator"],
      },
      {
        id: 5,
        title: "Reviewing Fund Performance",
        summary:
          "Performance should be viewed over full market cycles, not just recent months. Expense ratio, consistency, and alignment with your goal horizon matter alongside raw returns.",
        calculators: ["/cagr-calculator", "/goal-planner"],
      },
    ],
  },
  {
    slug: "loans-emi",
    icon: "💳",
    title: "Loans & EMI",
    description:
      "Understand borrowing costs, EMI structure, prepayment impact, and how to compare loan options.",
    duration: "45 min",
    difficulty: "Beginner",
    relatedCalculators: [
      "/emi-calculator",
      "/loan-prepayment-calculator",
      "/home-loan-eligibility-calculator",
    ],
    nextPath: "income-tax-basics",
    lessons: [
      {
        id: 1,
        title: "How Loans Work",
        summary:
          "A loan gives you money upfront; you repay principal plus interest over a tenure. The interest rate, tenure, and fees together determine total cost — not just the EMI amount.",
        calculators: ["/emi-calculator"],
      },
      {
        id: 2,
        title: "Understanding EMI",
        summary:
          "EMI (Equated Monthly Installment) splits repayment into equal monthly payments. Early EMIs include more interest; later ones include more principal — a pattern visible in amortisation schedules.",
        calculators: ["/emi-calculator"],
      },
      {
        id: 3,
        title: "Fixed vs Floating Rates",
        summary:
          "Fixed rates stay constant for a defined period; floating rates change with benchmark rates. Floating EMIs can rise or fall over time, affecting monthly cash flow planning.",
        calculators: ["/emi-calculator", "/home-loan-eligibility-calculator"],
      },
      {
        id: 4,
        title: "Prepayment Basics",
        summary:
          "Prepaying part of a loan reduces outstanding principal, which can lower total interest paid or shorten tenure. Lenders may have prepayment rules or charges worth checking.",
        calculators: ["/loan-prepayment-calculator"],
      },
      {
        id: 5,
        title: "Managing Debt Wisely",
        summary:
          "Keeping total EMIs within a comfortable share of income, avoiding unnecessary high-interest debt, and prioritising repayment order are common educational themes for debt management.",
        calculators: ["/emi-calculator", "/home-loan-eligibility-calculator"],
      },
    ],
  },
  {
    slug: "income-tax-basics",
    icon: "🧾",
    title: "Income Tax Basics",
    description:
      "Learn how Indian income tax works, regime choices, common deductions, and everyday GST.",
    duration: "50 min",
    difficulty: "Intermediate",
    relatedCalculators: [
      "/income-tax-calculator",
      "/hra-calculator",
      "/gst-calculator",
    ],
    nextPath: "insurance-planning",
    lessons: [
      {
        id: 1,
        title: "Income Tax Overview in India",
        summary:
          "Income tax applies to earnings above basic exemption limits, with progressive slab rates. Surcharges and cess may apply at higher income levels — rules change periodically.",
        calculators: ["/income-tax-calculator"],
      },
      {
        id: 2,
        title: "Old vs New Tax Regime",
        summary:
          "India offers two regimes: the old regime allows many deductions but has higher slab rates; the new regime has lower rates but fewer deductions. The better choice depends on your deductions.",
        calculators: ["/income-tax-calculator"],
      },
      {
        id: 3,
        title: "Section 80C Deductions",
        summary:
          "Section 80C allows deductions up to ₹1.5 lakh for eligible investments and expenses — PPF, ELSS, life insurance premiums, and others. This is one of the most discussed tax-saving areas.",
        calculators: ["/ppf-calculator", "/income-tax-calculator"],
      },
      {
        id: 4,
        title: "HRA Exemption Basics",
        summary:
          "House Rent Allowance (HRA) may be partially exempt if you pay rent and meet conditions. The exempt amount is the lowest of three calculated values — a common salary-planning topic.",
        calculators: ["/hra-calculator", "/income-tax-calculator"],
      },
      {
        id: 5,
        title: "GST in Everyday Purchases",
        summary:
          "Goods and Services Tax (GST) is included in many prices. Understanding whether a quoted price is inclusive or exclusive of GST helps compare costs and read invoices clearly.",
        calculators: ["/gst-calculator"],
      },
    ],
  },
  {
    slug: "insurance-planning",
    icon: "🛡️",
    title: "Insurance Planning",
    description:
      "Understand why insurance exists, how term and health cover work, and how to think about coverage needs.",
    duration: "40 min",
    difficulty: "Beginner",
    relatedCalculators: ["/goal-planner"],
    nextPath: "retirement-planning",
    lessons: [
      {
        id: 1,
        title: "Why Insurance Matters",
        summary:
          "Insurance transfers financial risk from you to an insurer for a premium. It protects against events that could otherwise wipe out savings — illness, accidents, or loss of income.",
        calculators: [],
      },
      {
        id: 2,
        title: "Term Life Insurance",
        summary:
          "Term insurance provides a death benefit for a fixed period at relatively low cost. It is often discussed as pure protection without an investment component.",
        calculators: ["/goal-planner"],
      },
      {
        id: 3,
        title: "Health Insurance",
        summary:
          "Health insurance covers hospitalisation and treatment costs. Medical inflation in India makes standalone health cover an important part of financial planning discussions.",
        calculators: ["/inflation-calculator"],
      },
      {
        id: 4,
        title: "Evaluating Coverage Needs",
        summary:
          "Coverage amounts depend on dependents, liabilities, income, and existing assets. Educational frameworks often suggest term cover as a multiple of annual income — actual needs vary.",
        calculators: ["/goal-planner"],
      },
    ],
  },
  {
    slug: "retirement-planning",
    icon: "🌅",
    title: "Retirement Planning",
    description:
      "Estimate retirement needs, explore EPF, NPS, SWP, and build a long-term corpus timeline.",
    duration: "55 min",
    difficulty: "Intermediate",
    relatedCalculators: [
      "/retirement-calculator",
      "/epf-calculator",
      "/nps-calculator",
      "/swp-calculator",
    ],
    nextPath: "money-basics",
    lessons: [
      {
        id: 1,
        title: "Retirement Corpus Basics",
        summary:
          "Retirement planning estimates how much you need when regular salary income stops. Expenses, inflation, and life expectancy all affect the corpus target — often modelled over decades.",
        calculators: ["/retirement-calculator", "/inflation-calculator"],
      },
      {
        id: 2,
        title: "EPF and Employer Benefits",
        summary:
          "Employee Provident Fund (EPF) is a mandatory retirement savings scheme for eligible salaried employees. Employer and employee contributions build a corpus with tax benefits on withdrawal.",
        calculators: ["/epf-calculator", "/gratuity-calculator"],
      },
      {
        id: 3,
        title: "NPS Overview",
        summary:
          "National Pension System (NPS) is a voluntary retirement scheme with market-linked returns. A portion of the corpus must be used to purchase an annuity at retirement under current rules.",
        calculators: ["/nps-calculator"],
      },
      {
        id: 4,
        title: "SWP for Retirement Income",
        summary:
          "Systematic Withdrawal Plan (SWP) allows regular withdrawals from mutual fund investments. It is one educational approach to generating post-retirement income from a corpus.",
        calculators: ["/swp-calculator", "/retirement-calculator"],
      },
      {
        id: 5,
        title: "Planning Your Retirement Timeline",
        summary:
          "Starting early, increasing contributions with salary growth, and reviewing assumptions every few years are common educational themes. Small changes in return or inflation assumptions can shift outcomes significantly.",
        calculators: ["/retirement-calculator", "/goal-planner"],
      },
    ],
  },
];

export function getLearningPathBySlug(slug) {
  return LEARNING_PATHS.find((path) => path.slug === slug) ?? null;
}

export function getLessonCount(path) {
  return path.lessons.length;
}
