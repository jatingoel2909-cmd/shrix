import { Link } from "react-router-dom";

function AiGuideCard({ guide }) {
  return (
    <article className="ai-guide-card">
      <div className="ai-guide-card__top">
        <span className="ai-guide-card__icon" aria-hidden="true">
          {guide.icon}
        </span>
        <span className="ai-guide-card__type">Educational guide</span>
      </div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      {guide.topics?.length > 0 && (
        <ul className="ai-guide-card__topics">
          {guide.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
      <div className="ai-guide-card__actions">
        <Link to={`/learn/${guide.learnSlug}`} className="ai-btn ai-btn--primary ai-btn--sm">
          Start Guide →
        </Link>
        <Link to={`/journeys/${guide.missionSlug}`} className="ai-btn ai-btn--ghost ai-btn--sm">
          View Mission
        </Link>
      </div>
    </article>
  );
}

export default AiGuideCard;
