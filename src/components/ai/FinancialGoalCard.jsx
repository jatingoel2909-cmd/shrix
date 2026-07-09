import { Link } from "react-router-dom";

function FinancialGoalCard({ goal }) {
  return (
    <article className="ai-goal-card">
      <span className="ai-goal-card__icon" aria-hidden="true">
        {goal.icon}
      </span>
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <div className="ai-goal-card__links">
        <Link to={`/learn/${goal.learnSlug}`} className="ai-chip">
          Learn →
        </Link>
        <Link to={`/journeys/${goal.missionSlug}`} className="ai-chip">
          Mission →
        </Link>
      </div>
    </article>
  );
}

export default FinancialGoalCard;
