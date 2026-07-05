import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

const tools = [
  {
    title: "AI Money Coach",
    text: "Personalised guidance on budgeting, saving habits, and building a stronger financial foundation.",
  },
  {
    title: "AI SIP Planner",
    text: "Explore SIP amounts, tenures, and goal alignment with structured, educational prompts.",
  },
  {
    title: "AI Financial Explainer",
    text: "Get plain-language explanations of financial terms, products, and calculator results.",
  },
  {
    title: "AI Loan Advisor",
    text: "Understand loan options, EMI impact, and repayment scenarios with guided comparisons.",
  },
  {
    title: "AI Tax Helper",
    text: "Explore tax-related concepts and salary planning questions with clear, educational support.",
  },
  {
    title: "AI Retirement Planner",
    text: "Plan retirement milestones with structured insights tailored to Indian savings and pension products.",
  },
  {
    title: "AI Expense Analyzer",
    text: "Review spending patterns and identify opportunities to save without complex spreadsheets.",
  },
  {
    title: "AI Investment Comparator",
    text: "Compare investment scenarios side by side to understand risk, return, and trade-offs.",
  },
  {
    title: "AI Goal Planner",
    text: "Break down long-term goals — education, home, retirement — into actionable planning steps.",
  },
  {
    title: "AI Wealth Health Score",
    text: "Get a snapshot view of your financial readiness across savings, protection, and planning.",
  },
];

function AiToolsPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="AI Tools"
        title="The Shrix AI Roadmap"
        subtitle="Planned AI-powered tools to help you understand money decisions with clarity — built for education, not automation of advice."
        variant="alt"
      >
        <p className="shrix-info-disclaimer">
          These tools are planned for educational guidance and will not replace
          professional financial advice.
        </p>

        <div className="shrix-info-grid shrix-info-grid--wide">
          {tools.map((tool) => (
            <article className="shrix-info-card" key={tool.title}>
              <h3>{tool.title}</h3>
              <p>{tool.text}</p>
              <span className="shrix-info-card__badge">Coming Soon</span>
            </article>
          ))}
        </div>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default AiToolsPage;
