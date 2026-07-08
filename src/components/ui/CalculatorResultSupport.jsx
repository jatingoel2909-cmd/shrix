import { Link } from "react-router-dom";
import { CALCULATOR_DISCLAIMER } from "../../data/calculatorInsights";

function CalculatorResultSupport({ howCalculated, meaning, relatedTools }) {
  return (
    <aside className="calc-result-support" aria-label="Calculator result guidance">
      <div className="calc-result-support__grid">
        <article className="calc-result-support__card">
          <h3>How was this calculated?</h3>
          {howCalculated.formula && (
            <p className="calc-result-support__formula">{howCalculated.formula}</p>
          )}
          <p>{howCalculated.summary}</p>
          {howCalculated.inputs?.length > 0 && (
            <>
              <p className="calc-result-support__label">Key inputs</p>
              <ul>
                {howCalculated.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </>
          )}
          <p className="calc-result-support__note">
            Results depend on your inputs and assumptions. Actual outcomes may differ.
          </p>
        </article>

        <article className="calc-result-support__card">
          <h3>What this result means</h3>
          <p>{meaning}</p>
        </article>
      </div>

      {relatedTools?.length > 0 && (
        <article className="calc-result-support__card calc-result-support__card--wide">
          <h3>Next useful tools</h3>
          <div className="calc-result-support__links">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className="calc-result-support__link">
                {tool.title} →
              </Link>
            ))}
          </div>
        </article>
      )}

      <p className="calc-result-support__disclaimer">{CALCULATOR_DISCLAIMER}</p>
    </aside>
  );
}

export default CalculatorResultSupport;
