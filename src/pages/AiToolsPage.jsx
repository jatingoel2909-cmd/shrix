import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AiGuideHero from "../components/ai/AiGuideHero";
import FinancialGoalCard from "../components/ai/FinancialGoalCard";
import AiGuideCard from "../components/ai/AiGuideCard";
import DailyAiInsight from "../components/ai/DailyAiInsight";
import AiRoadmap from "../components/ai/AiRoadmap";
import AiContinueLearning from "../components/ai/AiContinueLearning";
import AiVisionSection from "../components/ai/AiVisionSection";
import {
  AI_GUIDE_DISCLAIMER,
  AI_GUIDES,
  AI_VISION,
  CONTINUE_LEARNING,
  DAILY_AI_INSIGHT,
  FINANCIAL_GOALS,
} from "../data/aiGuide";
import "../styles/global.css";
import "../styles/ai-guide.css";

function AiToolsPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <AiGuideHero />

      <main className="ai-main">
        <section className="ai-section" id="ai-goals" aria-labelledby="ai-goals-title">
          <div className="ai-section__head">
            <p className="shrix-section-label">Your Goals</p>
            <h2 id="ai-goals-title">Financial Goals</h2>
            <p>
              Choose a goal and FOINWI AI will connect learning paths, calculators,
              missions, and financial understanding into one guided experience.
            </p>
          </div>
          <div className="ai-goals-grid">
            {FINANCIAL_GOALS.map((goal) => (
              <FinancialGoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>

        <section className="ai-section" aria-labelledby="ai-guides-title">
          <div className="ai-section__head">
            <p className="shrix-section-label">Guided Learning</p>
            <h2 id="ai-guides-title">AI Guides</h2>
            <p>
              Structured educational guides that explain concepts, link to lessons,
              and point you toward the right calculators and missions.
            </p>
          </div>
          <div className="ai-guides-grid">
            {AI_GUIDES.map((guide) => (
              <AiGuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        <section className="ai-section ai-section--flush" aria-label="Daily insight">
          <DailyAiInsight insight={DAILY_AI_INSIGHT} />
        </section>

        <section className="ai-section" aria-labelledby="ai-roadmap-title">
          <div className="ai-section__head">
            <p className="shrix-section-label">Product Roadmap</p>
            <h2 id="ai-roadmap-title">AI Roadmap</h2>
            <p>
              See what you can use today, what is being built next, and where
              FOINWI AI is heading over time.
            </p>
          </div>
          <AiRoadmap />
        </section>

        <AiContinueLearning config={CONTINUE_LEARNING} />

        <AiVisionSection vision={AI_VISION} />
      </main>

      <p className="ai-notice">{AI_GUIDE_DISCLAIMER}</p>
      <Footer />
    </div>
  );
}

export default AiToolsPage;
