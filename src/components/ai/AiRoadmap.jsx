import { Link } from "react-router-dom";
import { AI_ROADMAP } from "../../data/aiGuide";

const PHASES = [
  AI_ROADMAP.availableToday,
  AI_ROADMAP.comingNext,
  AI_ROADMAP.futureVision,
];

function RoadmapItem({ item }) {
  return (
    <article className="ai-roadmap__item">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      {item.link && (
        <Link to={item.link.to} className="ai-roadmap__link">
          {item.link.label} →
        </Link>
      )}
    </article>
  );
}

function AiRoadmap() {
  return (
    <div className="ai-roadmap">
      {PHASES.map((phase, phaseIndex) => (
        <section
          key={phase.label}
          className={`ai-roadmap__phase ai-roadmap__phase--${phase.status}`}
          aria-labelledby={`ai-roadmap-${phase.status}`}
        >
          <div className="ai-roadmap__phase-marker">
            <span className={`ai-roadmap__dot ai-roadmap__dot--${phase.status}`} aria-hidden="true" />
            {phaseIndex < PHASES.length - 1 && (
              <span className="ai-roadmap__line" aria-hidden="true" />
            )}
          </div>
          <div className="ai-roadmap__phase-body">
            <h3 id={`ai-roadmap-${phase.status}`}>{phase.label}</h3>
            <div className="ai-roadmap__items">
              {phase.items.map((item) => (
                <RoadmapItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default AiRoadmap;
