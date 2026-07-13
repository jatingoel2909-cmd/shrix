/**
 * FOINWI Daily Insight Card — wires getDailyInsight() into the UI.
 * Educational display only. No advice language. No persistence.
 */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getDailyInsight } from "../../intelligence/insight/insightEngine.js";
import "./intelligence-ui.css";

function DailyInsightCard({
  pathname,
  conceptId,
  healthTopic,
  difficulty,
  compact = false,
  title = "Today's Financial Insight",
}) {
  const result = useMemo(
    () =>
      getDailyInsight({
        pathname,
        conceptId,
        healthTopic,
        difficulty,
      }),
    [pathname, conceptId, healthTopic, difficulty],
  );

  const insight = result?.insight;
  if (!insight) return null;

  const recs = result.relatedRecommendations ?? {};
  const lesson = recs.lesson?.path && recs.lesson.path !== pathname ? recs.lesson : null;
  const calculator =
    recs.calculator?.path && recs.calculator.path !== pathname ? recs.calculator : null;
  const journey = recs.journey?.path && recs.journey.path !== pathname ? recs.journey : null;
  const headingId = `fi-insight-title-${insight.id}`;

  return (
    <article
      className={`fi-daily-insight${compact ? " fi-daily-insight--compact" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="fi-daily-insight__header">
        <p className="shrix-section-label">{title}</p>
        {insight.readingTime && (
          <span className="fi-daily-insight__time">{insight.readingTime}</span>
        )}
      </div>

      <h3 id={headingId}>{insight.title}</h3>
      <p className="fi-daily-insight__summary">{insight.summary}</p>

      <div className="fi-daily-insight__actions">
        {lesson?.path && (
          <Link to={lesson.path} className="fi-daily-insight__cta">
            Related lesson →
          </Link>
        )}
        {calculator?.path && (
          <Link to={calculator.path} className="fi-daily-insight__cta">
            Related calculator →
          </Link>
        )}
        {journey?.path && (
          <Link to={journey.path} className="fi-daily-insight__cta">
            Related journey →
          </Link>
        )}
      </div>

      {!compact && insight.educationalNotice && (
        <p className="fi-daily-insight__notice">{insight.educationalNotice}</p>
      )}
    </article>
  );
}

export default DailyInsightCard;
