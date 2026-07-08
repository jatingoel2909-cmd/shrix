export const CALCULATOR_DISCLAIMER =
  "FOINWI provides educational financial tools only. Results are estimates based on user inputs and assumptions. This is not financial, investment, tax, loan, or legal advice. Please consult qualified professionals before making financial decisions.";

export const CALCULATOR_INSIGHTS = {
  "/sip-calculator": {
    howCalculated: {
      formula: "Future Value = Monthly SIP × [((1 + r)^n − 1) / r] × (1 + r)",
      summary:
        "This calculator projects SIP maturity value using your monthly contribution, expected annual return, and investment period. Returns are compounded monthly.",
      inputs: [
        "Monthly investment amount",
        "Expected annual return (assumed constant)",
        "Investment period in years",
      ],
    },
    meaning:
      "This can help you understand how regular monthly investing may grow over time and how much of the final value comes from contributions versus estimated returns.",
    relatedTools: [
      { title: "Lumpsum Calculator", path: "/lumpsum-calculator" },
      { title: "CAGR Calculator", path: "/cagr-calculator" },
      { title: "Goal Planner", path: "/goal-planner" },
      { title: "SWP Calculator", path: "/swp-calculator" },
    ],
  },
  "/emi-calculator": {
    howCalculated: {
      formula: "EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]",
      summary:
        "This calculator estimates equated monthly instalment (EMI) from loan amount, annual interest rate, and tenure. It assumes a standard reducing-balance loan structure.",
      inputs: ["Loan amount", "Annual interest rate", "Loan tenure in years"],
    },
    meaning:
      "This can help you understand monthly repayment size and how interest rate or tenure changes may affect total loan cost.",
    relatedTools: [
      { title: "Home Loan Eligibility", path: "/home-loan-eligibility-calculator" },
      { title: "Loan Prepayment", path: "/loan-prepayment-calculator" },
      { title: "Compound Interest", path: "/compound-interest-calculator" },
      { title: "Goal Planner", path: "/goal-planner" },
    ],
  },
  "/fd-calculator": {
    howCalculated: {
      formula: "Maturity = Principal × (1 + r/n)^(n × t)",
      summary:
        "This calculator estimates fixed deposit maturity using deposit amount, annual interest rate, tenure, and compounding frequency.",
      inputs: [
        "Deposit amount",
        "Annual interest rate",
        "Tenure in years",
        "Compounding frequency",
      ],
    },
    meaning:
      "This can help you understand estimated FD maturity value and how much interest may be earned over the selected period.",
    relatedTools: [
      { title: "RD Calculator", path: "/rd-calculator" },
      { title: "PPF Calculator", path: "/ppf-calculator" },
      { title: "Compound Interest", path: "/compound-interest-calculator" },
    ],
  },
  "/ppf-calculator": {
    howCalculated: {
      formula: "Maturity ≈ FV of annual contributions at assumed PPF rate",
      summary:
        "This calculator projects PPF balance growth from annual contributions, expected interest rate, and investment duration.",
      inputs: [
        "Yearly contribution",
        "Expected annual interest rate",
        "Investment period in years",
      ],
    },
    meaning:
      "This can help you understand long-term PPF corpus growth under steady contribution and rate assumptions.",
    relatedTools: [
      { title: "FD Calculator", path: "/fd-calculator" },
      { title: "RD Calculator", path: "/rd-calculator" },
      { title: "Retirement Calculator", path: "/retirement-calculator" },
    ],
  },
  "/retirement-calculator": {
    howCalculated: {
      formula: "Corpus Needed = Inflated Monthly Expense × 12 × 25",
      summary:
        "This calculator estimates retirement corpus using the 25× annual expense rule of thumb, inflation until retirement, current savings, and monthly SIP.",
      inputs: [
        "Current age and retirement age",
        "Current monthly expenses",
        "Expected inflation and return rates",
        "Current savings and monthly SIP",
      ],
    },
    meaning:
      "This can help you understand a simplified retirement target, projected savings, and the estimated gap that may remain.",
    relatedTools: [
      { title: "NPS Calculator", path: "/nps-calculator" },
      { title: "EPF Calculator", path: "/epf-calculator" },
      { title: "Inflation Calculator", path: "/inflation-calculator" },
      { title: "SWP Calculator", path: "/swp-calculator" },
    ],
  },
  "/goal-planner": {
    howCalculated: {
      formula: "Projected = FV(Current Savings) + FV(Monthly SIP) | Gap = Goal − Projected",
      summary:
        "This calculator combines future value of current savings and monthly SIP to compare against your target goal amount and timeline.",
      inputs: [
        "Goal amount and target years",
        "Current savings",
        "Monthly SIP contribution",
        "Expected annual return",
      ],
    },
    meaning:
      "This can help you understand whether your current plan may reach a goal and how much shortfall or surplus the estimate shows.",
    relatedTools: [
      { title: "SIP Calculator", path: "/sip-calculator" },
      { title: "Lumpsum Calculator", path: "/lumpsum-calculator" },
      { title: "Inflation Calculator", path: "/inflation-calculator" },
    ],
  },
  "/cagr-calculator": {
    howCalculated: {
      formula: "CAGR = (Ending Value / Beginning Value)^(1 / Years) − 1",
      summary:
        "This calculator measures compound annual growth rate between a starting value, ending value, and number of years.",
      inputs: ["Beginning value", "Ending value", "Number of years"],
    },
    meaning:
      "This can help you understand average annualised growth between two values without assuming every year grew evenly.",
    relatedTools: [
      { title: "SIP Calculator", path: "/sip-calculator" },
      { title: "Lumpsum Calculator", path: "/lumpsum-calculator" },
      { title: "Compound Interest", path: "/compound-interest-calculator" },
    ],
  },
  "/lumpsum-calculator": {
    howCalculated: {
      formula: "Future Value = Principal × (1 + r)^t",
      summary:
        "This calculator projects one-time investment growth using principal, expected annual return, and investment period.",
      inputs: ["Investment amount", "Expected annual return", "Time period in years"],
    },
    meaning:
      "This can help you understand how a single investment may compound over time under constant return assumptions.",
    relatedTools: [
      { title: "SIP Calculator", path: "/sip-calculator" },
      { title: "CAGR Calculator", path: "/cagr-calculator" },
      { title: "Goal Planner", path: "/goal-planner" },
    ],
  },
  "/rd-calculator": {
    howCalculated: {
      formula: "Maturity = sum of monthly deposits compounded at quarterly rests",
      summary:
        "This calculator estimates recurring deposit maturity from monthly deposit, interest rate, and tenure using standard RD compounding logic.",
      inputs: ["Monthly deposit", "Annual interest rate", "Tenure in years"],
    },
    meaning:
      "This can help you understand how regular monthly deposits may accumulate into a maturity value over time.",
    relatedTools: [
      { title: "FD Calculator", path: "/fd-calculator" },
      { title: "PPF Calculator", path: "/ppf-calculator" },
      { title: "Compound Interest", path: "/compound-interest-calculator" },
    ],
  },
  "/swp-calculator": {
    howCalculated: {
      formula: "Corpus depletes with monthly withdrawals and remaining balance earns return",
      summary:
        "This calculator estimates how long a corpus may last or what remains after periodic withdrawals at an assumed return rate.",
      inputs: [
        "Starting corpus",
        "Monthly withdrawal amount",
        "Expected annual return",
        "Withdrawal period",
      ],
    },
    meaning:
      "This can help you understand how systematic withdrawals may affect corpus longevity in a simplified scenario.",
    relatedTools: [
      { title: "Retirement Calculator", path: "/retirement-calculator" },
      { title: "SIP Calculator", path: "/sip-calculator" },
      { title: "Inflation Calculator", path: "/inflation-calculator" },
    ],
  },
  "/inflation-calculator": {
    howCalculated: {
      formula: "Future Cost = Current Amount × (1 + Inflation Rate)^Years",
      summary:
        "This calculator shows how today's amount may translate into future purchasing power at a given inflation rate.",
      inputs: ["Current amount", "Expected inflation rate", "Number of years"],
    },
    meaning:
      "This can help you understand why future expenses may be higher than today's prices even without changing lifestyle.",
    relatedTools: [
      { title: "Retirement Calculator", path: "/retirement-calculator" },
      { title: "Goal Planner", path: "/goal-planner" },
      { title: "SIP Calculator", path: "/sip-calculator" },
    ],
  },
  "/gratuity-calculator": {
    howCalculated: {
      formula: "Gratuity = (Monthly Salary × 15 × Years of Service) / 26",
      summary:
        "This calculator applies the commonly used gratuity formula for eligible employees under the Payment of Gratuity Act framework.",
      inputs: ["Last drawn monthly salary (basic + DA)", "Years of service"],
    },
    meaning:
      "This can help you understand an estimated gratuity payout based on salary and service length under standard assumptions.",
    relatedTools: [
      { title: "EPF Calculator", path: "/epf-calculator" },
      { title: "Retirement Calculator", path: "/retirement-calculator" },
      { title: "NPS Calculator", path: "/nps-calculator" },
    ],
  },
  "/epf-calculator": {
    howCalculated: {
      formula: "Monthly EPF = Basic × (12% + 3.67%). Corpus = FV of balance + monthly contributions",
      summary:
        "This calculator projects EPF corpus using employee and employer EPF contributions with monthly compounding.",
      inputs: [
        "Current monthly basic salary",
        "Current EPF balance",
        "Years until retirement",
        "Expected EPF interest rate",
      ],
    },
    meaning:
      "This can help you understand how salary-linked EPF contributions may build toward retirement corpus over time.",
    relatedTools: [
      { title: "NPS Calculator", path: "/nps-calculator" },
      { title: "Retirement Calculator", path: "/retirement-calculator" },
      { title: "Gratuity Calculator", path: "/gratuity-calculator" },
    ],
  },
  "/nps-calculator": {
    howCalculated: {
      formula: "Corpus = Monthly SIP FV. Pension ≈ 40% of corpus × 6% annuity / 12",
      summary:
        "This calculator projects NPS corpus from monthly contributions and estimates annuity pension using simplified assumptions.",
      inputs: [
        "Monthly NPS contribution",
        "Current age and retirement age",
        "Expected annual return",
      ],
    },
    meaning:
      "This can help you understand estimated NPS accumulation and a simplified view of potential annuity income after retirement.",
    relatedTools: [
      { title: "EPF Calculator", path: "/epf-calculator" },
      { title: "Retirement Calculator", path: "/retirement-calculator" },
      { title: "SWP Calculator", path: "/swp-calculator" },
    ],
  },
  "/home-loan-eligibility-calculator": {
    howCalculated: {
      formula: "Eligible EMI = (Income × 50%) − Existing EMI | Loan from EMI, rate, tenure",
      summary:
        "This calculator estimates eligible loan amount using income, existing EMIs, interest rate, and tenure with a common 50% obligation ratio.",
      inputs: [
        "Monthly income",
        "Existing monthly EMIs",
        "Interest rate and loan tenure",
      ],
    },
    meaning:
      "This can help you understand a rough borrowing range before property search. Actual lender eligibility may differ.",
    relatedTools: [
      { title: "EMI Calculator", path: "/emi-calculator" },
      { title: "Loan Prepayment", path: "/loan-prepayment-calculator" },
      { title: "Goal Planner", path: "/goal-planner" },
    ],
  },
  "/loan-prepayment-calculator": {
    howCalculated: {
      formula: "Interest Saved = Original Total Interest − New Total Interest",
      summary:
        "This calculator compares total interest under the original schedule versus after a prepayment, assuming EMI stays unchanged and tenure reduces.",
      inputs: [
        "Outstanding loan amount",
        "Interest rate and remaining tenure",
        "Prepayment amount",
      ],
    },
    meaning:
      "This can help you understand how a prepayment may reduce interest cost and loan duration under simplified assumptions.",
    relatedTools: [
      { title: "EMI Calculator", path: "/emi-calculator" },
      { title: "Home Loan Eligibility", path: "/home-loan-eligibility-calculator" },
      { title: "Compound Interest", path: "/compound-interest-calculator" },
    ],
  },
  "/gst-calculator": {
    howCalculated: {
      formula: "Add GST: GST = Amount × Rate / 100 | Remove GST: Base = Amount / (1 + Rate / 100)",
      summary:
        "This calculator adds GST to a base amount or removes GST from a tax-inclusive amount using the selected GST rate.",
      inputs: ["Amount", "GST rate", "Add or remove GST mode"],
    },
    meaning:
      "This can help you understand tax-inclusive and tax-exclusive amounts for invoices, purchases, or basic GST checks.",
    relatedTools: [
      { title: "Income Tax Calculator", path: "/income-tax-calculator" },
      { title: "HRA Calculator", path: "/hra-calculator" },
    ],
  },
  "/income-tax-calculator": {
    howCalculated: {
      formula: "Taxable Income = Income − Deductions (Old) or − Standard Deduction (New) | Tax = Slabs + 4% cess",
      summary:
        "This calculator estimates income tax under Old or New regime using progressive slabs and simplified deduction inputs.",
      inputs: [
        "Annual income",
        "Tax regime selection",
        "Deductions (Old regime) or standard deduction (New regime)",
      ],
    },
    meaning:
      "This can help you compare approximate tax liability across regimes for educational planning. It is not a filing tool.",
    relatedTools: [
      { title: "HRA Calculator", path: "/hra-calculator" },
      { title: "GST Calculator", path: "/gst-calculator" },
      { title: "PPF Calculator", path: "/ppf-calculator" },
    ],
  },
  "/hra-calculator": {
    howCalculated: {
      formula: "Exemption = Minimum of (Actual HRA, Rent − 10% of Basic, 50%/40% of Basic)",
      summary:
        "This calculator estimates HRA exemption using salary components, rent paid, and metro or non-metro city rules.",
      inputs: [
        "Basic salary and HRA received",
        "Rent paid",
        "Metro or non-metro city",
      ],
    },
    meaning:
      "This can help you understand how much HRA may be exempt versus taxable under common salary structures.",
    relatedTools: [
      { title: "Income Tax Calculator", path: "/income-tax-calculator" },
      { title: "GST Calculator", path: "/gst-calculator" },
    ],
  },
  "/compound-interest-calculator": {
    howCalculated: {
      formula: "A = P × (1 + r / n)^(n × t)",
      summary:
        "This calculator projects compound growth using principal, annual rate, compounding frequency, and time period.",
      inputs: [
        "Principal amount",
        "Annual interest rate",
        "Compounding frequency per year",
        "Time period in years",
      ],
    },
    meaning:
      "This can help you understand how compounding frequency and time may affect final value compared with simple interest.",
    relatedTools: [
      { title: "FD Calculator", path: "/fd-calculator" },
      { title: "RD Calculator", path: "/rd-calculator" },
      { title: "Lumpsum Calculator", path: "/lumpsum-calculator" },
    ],
  },
};

export function getCalculatorInsights(calculatorId) {
  return CALCULATOR_INSIGHTS[calculatorId] || null;
}
