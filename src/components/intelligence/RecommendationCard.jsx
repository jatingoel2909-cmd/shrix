/**
 * FOINWI Recommendation Card — single next-step item from getRecommendations().
 */

import { Link } from "react-router-dom";

const TYPE_ICONS = {
  nextLesson: "📚",
  continueLearning: "📖",
  relatedConcepts: "💡",
  nextCalculator: "🧮",
  nextJourney: "🗺️",
  nextMission: "🎯",
  nextHealthAction: "❤️",
  dailyInsight: "✨",
};

function RecommendationCard({ item }) {
  if (!item?.path) return null;

  const icon = TYPE_ICONS[item.type] ?? "➡️";
  const explanation = item.description || item.reason || "";
  const reason = item.reason && item.reason !== explanation ? item.reason : null;

  return (
    <article className="fi-rec-card">
      <span className="fi-rec-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="fi-rec-card__body">
        <h4 className="fi-rec-card__title">{item.title}</h4>
        {explanation ? <p className="fi-rec-card__explanation">{explanation}</p> : null}
        {reason ? <p className="fi-rec-card__reason">{reason}</p> : null}
        <Link to={item.path} className="fi-rec-card__cta">
          Continue →
        </Link>
      </div>
    </article>
  );
}

export default RecommendationCard;
