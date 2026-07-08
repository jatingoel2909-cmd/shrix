import { Link } from "react-router-dom";
import { FINANCIAL_JOURNEYS } from "../../data/journeys";
import { enrichMission } from "../../utils/missionHelpers";
import "../../styles/journey-home.css";

function FinancialJourneysSection() {
  return (
    <section className="shrix-journey-section" id="journeys">
      <p className="shrix-section-label">Financial Missions</p>
      <h2>Choose Your Financial Mission</h2>
      <p className="shrix-journey-section__subtitle">
        Guided missions with calculators, learning modules, checklists, and planning
        steps for every major money goal.
      </p>

      <div className="shrix-journey-grid">
        {FINANCIAL_JOURNEYS.map((journey, index) => {
          const mission = enrichMission(journey);
          return (
            <article
              className="shrix-journey-card"
              key={journey.slug}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="shrix-journey-card__icon" aria-hidden="true">
                <span>{journey.icon}</span>
              </div>
              <h3>{journey.title}</h3>
              <p>{journey.description}</p>
              <div className="shrix-journey-card__meta">
                <span className="shrix-journey-card__duration">{journey.duration}</span>
                <span className="shrix-journey-card__difficulty">{mission.difficulty}</span>
              </div>
              <Link to={`/journeys/${journey.slug}`} className="shrix-journey-card__cta">
                Start Mission →
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FinancialJourneysSection;
