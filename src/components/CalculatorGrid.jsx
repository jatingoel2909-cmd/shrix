import { Link } from "react-router-dom";
import "./CalculatorGrid.css";

function CalculatorGrid() {
  const calculators = [
    { icon: "📈", title: "SIP Calculator", desc: "Estimate SIP returns and future wealth.", path: "/sip-calculator" },
    { icon: "🏦", title: "FD Calculator", desc: "Calculate fixed deposit maturity value.", path: "/fd-calculator" },
    { icon: "💳", title: "EMI Calculator", desc: "Plan loan EMI and repayment.", path: "/emi-calculator" },
    { icon: "💰", title: "PPF Calculator", desc: "Estimate long-term PPF growth.", path: "/ppf-calculator" },
    { icon: "📊", title: "CAGR Calculator", desc: "Measure annualized investment return.", path: "/cagr-calculator" },
    { icon: "💵", title: "Lumpsum Calculator", desc: "Project one-time investment growth.", path: "/lumpsum-calculator" },
    { icon: "🏖️", title: "RD Calculator", desc: "Calculate recurring deposit maturity.", path: "/rd-calculator" },
    { icon: "🔁", title: "SWP Calculator", desc: "Plan systematic withdrawals.", path: "/swp-calculator" },
  ];

  return (
    <section className="shrix-calculators">
      <p className="shrix-section-label">Powerful Tools</p>
      <h2>Popular Financial Calculators</h2>

      <div className="shrix-grid">
        {calculators.map(({ icon, title, desc, path }) => (
          <div className="shrix-card" key={title}>
            <div className="shrix-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            {path ? (
              <Link to={path} className="shrix-card-link">Calculate →</Link>
            ) : (
              <button>Calculate →</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalculatorGrid;
