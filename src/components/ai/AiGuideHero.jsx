import { Link } from "react-router-dom";

function AiGuideHero() {
  return (
    <header className="ai-hero">
      <div className="ai-hero__inner">
        <p className="shrix-section-label">FOINWI AI</p>
        <h1>FOINWI AI Financial Guide</h1>
        <p className="ai-hero__subtitle">
          Grow Beyond Numbers with AI.
          <br />
          Learn. Understand. Plan.
        </p>
        <div className="ai-hero__actions">
          <a href="#ai-goals" className="ai-btn ai-btn--primary">
            Start Your AI Journey
          </a>
          <Link to="/learn" className="ai-btn ai-btn--ghost">
            Explore Learning Paths
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AiGuideHero;
