import { Link } from "react-router-dom";
import { getLearningPathBySlug } from "../../data/learnAcademy";

function DailyAiInsight({ insight }) {
  const path = getLearningPathBySlug(insight.learnSlug);

  return (
    <article className="ai-insight" aria-labelledby="ai-daily-insight-title">
      <div className="ai-insight__copy">
        <p className="shrix-section-label">{insight.eyebrow}</p>
        <h2 id="ai-daily-insight-title">{insight.title}</h2>
        <p>{insight.summary}</p>
        {path && (
          <p className="ai-insight__meta">
            From <strong>{path.title}</strong> · {insight.readTime}
          </p>
        )}
        <Link to={`/learn/${insight.learnSlug}`} className="ai-btn ai-btn--primary">
          Start Learning →
        </Link>
      </div>
      <div className="ai-insight__visual" aria-hidden="true">
        <span className="ai-insight__glyph">✦</span>
        <p>One focused idea. Clear next step.</p>
      </div>
    </article>
  );
}

export default DailyAiInsight;
