/**
 * FOINWI Intelligence Section — page-level wrapper for DailyInsightCard.
 * Avoid placing more than once per page.
 */

import DailyInsightCard from "./DailyInsightCard";
import "./intelligence-ui.css";

function IntelligenceSection({
  pathname,
  conceptId,
  healthTopic,
  difficulty,
  compact = false,
  title,
  className = "",
  ariaLabel = "Daily financial insight",
}) {
  return (
    <section
      className={`fi-intelligence-section ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="fi-intelligence-section__inner">
        <DailyInsightCard
          pathname={pathname}
          conceptId={conceptId}
          healthTopic={healthTopic}
          difficulty={difficulty}
          compact={compact}
          title={title}
        />
      </div>
    </section>
  );
}

export default IntelligenceSection;
