import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

const lifeStages = [
  {
    title: "Kids & Teens",
    text: "Build early money habits with simple, age-appropriate concepts that make finance feel approachable.",
    topics: ["Money basics", "Saving", "Needs vs wants", "Simple interest"],
  },
  {
    title: "Students",
    text: "Prepare for financial independence with practical skills for everyday money decisions and first investments.",
    topics: ["Banking", "UPI", "Budgeting", "Credit score", "First SIP"],
  },
  {
    title: "Young Professionals",
    text: "Turn your first salary into a strong foundation with structured planning for savings, protection, and growth.",
    topics: [
      "Salary planning",
      "Emergency fund",
      "SIP",
      "Tax saving",
      "Insurance",
    ],
  },
  {
    title: "Families",
    text: "Balance multiple goals — home, education, health, and retirement — with clarity and confidence.",
    topics: [
      "Home loan",
      "Child education",
      "Retirement",
      "Health insurance",
      "Goal planning",
    ],
  },
  {
    title: "50+ & Retirement",
    text: "Understand post-work income, corpus planning, and how to manage wealth through retirement years.",
    topics: ["EPF", "NPS", "Gratuity", "SWP", "Pension", "Passive income"],
  },
];

const learningPaths = [
  {
    title: "Investing Basics",
    text: "Learn compounding, risk and return, SIP, lumpsum, and how to evaluate investment choices step by step.",
  },
  {
    title: "Loans & EMI",
    text: "Understand borrowing costs, EMI structure, prepayment impact, and how to compare loan options wisely.",
  },
  {
    title: "Tax & Salary Planning",
    text: "Explore salary components, deductions, tax-saving concepts, and how choices affect your take-home pay.",
  },
  {
    title: "Retirement Planning",
    text: "Estimate retirement needs, plan long-term corpus targets, and explore EPF, NPS, and SWP concepts.",
  },
  {
    title: "Financial Calculators",
    text: "Use FOINWI calculators to model SIP, EMI, FD, PPF, and goal scenarios with instant, clear results.",
  },
];

function LearnPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="Learn"
        title="Learn Money Your Way"
        subtitle="Structured education for every life stage — from first savings to retirement planning, built for Indian users."
      >
        <section className="shrix-info-section">
          <h2 className="shrix-info-section__title">Learn by Life Stage</h2>
          <p className="shrix-info-section__intro">
            Pick the stage that fits you today. Each path covers the topics that
            matter most at that point in life.
          </p>
          <div className="shrix-info-grid shrix-info-grid--wide">
            {lifeStages.map((stage) => (
              <article className="shrix-info-card" key={stage.title}>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <ul className="shrix-info-tags">
                  {stage.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="shrix-info-section">
          <h2 className="shrix-info-section__title">Learning Paths</h2>
          <p className="shrix-info-section__intro">
            Follow focused tracks to build confidence in investing, borrowing,
            taxes, retirement, and using calculators effectively.
          </p>
          <div className="shrix-info-grid">
            {learningPaths.map((path) => (
              <article className="shrix-info-card" key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </article>
            ))}
          </div>
        </section>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default LearnPage;
