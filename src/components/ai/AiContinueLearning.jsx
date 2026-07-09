import { Link } from "react-router-dom";
import { getLearningPathBySlug } from "../../data/learnAcademy";
import { ALL_CALCULATORS } from "../../data/calculators";

function AiContinueLearning({ config }) {
  const paths = config.paths
    .map((entry) => {
      const path = getLearningPathBySlug(entry.slug);
      return path ? { ...path, reason: entry.reason } : null;
    })
    .filter(Boolean);

  const calculators = config.calculators
    .map((entry) => {
      const calc = ALL_CALCULATORS.find((item) => item.path === entry.path);
      return calc ? { ...calc, reason: entry.reason } : null;
    })
    .filter(Boolean);

  return (
    <section className="ai-continue" aria-labelledby="ai-continue-title">
      <div className="ai-continue__intro">
        <p className="shrix-section-label">Keep Going</p>
        <h2 id="ai-continue-title">{config.headline}</h2>
        <p>{config.description}</p>
      </div>

      <div className="ai-continue__grid">
        <div className="ai-continue__column">
          <h3>Learning paths</h3>
          <ul className="ai-continue__list">
            {paths.map((path) => (
              <li key={path.slug}>
                <Link to={`/learn/${path.slug}`} className="ai-continue__link-card">
                  <span aria-hidden="true">{path.icon}</span>
                  <div>
                    <strong>{path.title}</strong>
                    <p>{path.reason}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ai-continue__column">
          <h3>Calculators</h3>
          <ul className="ai-continue__list">
            {calculators.map((calc) => (
              <li key={calc.path}>
                <Link to={calc.path} className="ai-continue__link-card">
                  <span aria-hidden="true">{calc.icon}</span>
                  <div>
                    <strong>{calc.title}</strong>
                    <p>{calc.reason}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AiContinueLearning;
