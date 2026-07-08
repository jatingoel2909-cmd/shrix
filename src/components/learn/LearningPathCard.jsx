import { Link } from "react-router-dom";
import { getCalculatorsByPaths } from "../../utils/learnHelpers";
import { getLessonCount } from "../../data/learnAcademy";

function LearningPathCard({ path }) {
  const calculators = getCalculatorsByPaths(path.relatedCalculators).slice(0, 3);
  const lessonCount = getLessonCount(path);

  return (
    <article className="la-path-card">
      <div className="la-path-card__top">
        <span className="la-path-card__icon" aria-hidden="true">
          {path.icon}
        </span>
        <div className="la-path-card__meta">
          <span className="la-badge la-badge--time">{path.duration}</span>
          <span className={`la-badge la-badge--${path.difficulty.toLowerCase()}`}>
            {path.difficulty}
          </span>
        </div>
      </div>

      <h3>{path.title}</h3>
      <p>{path.description}</p>

      <p className="la-path-card__lessons">
        {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
      </p>

      {calculators.length > 0 && (
        <div className="la-path-card__tools">
          <span className="la-path-card__tools-label">Related calculators</span>
          <div className="la-chip-row">
            {calculators.map((calc) => (
              <Link key={calc.path} to={calc.path} className="la-chip">
                {calc.icon} {calc.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link to={`/learn/${path.slug}`} className="la-btn la-btn--primary">
        Start Learning →
      </Link>
    </article>
  );
}

export default LearningPathCard;
