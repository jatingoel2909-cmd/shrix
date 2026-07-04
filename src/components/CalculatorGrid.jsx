function CalculatorGrid() {
  const calculators = [
    ["📈", "SIP Calculator", "Estimate SIP returns and future wealth."],
    ["🏦", "FD Calculator", "Calculate fixed deposit maturity value."],
    ["💳", "EMI Calculator", "Plan loan EMI and repayment."],
    ["💰", "PPF Calculator", "Estimate long-term PPF growth."],
    ["📊", "CAGR Calculator", "Measure annualized investment return."],
    ["🎯", "Goal Planner", "Plan financial goals with clarity."],
    ["🏖️", "Retirement", "Estimate retirement corpus needs."],
    ["🔁", "SWP Calculator", "Plan systematic withdrawals."],
  ];

  return (
    <section className="shrix-calculators">
      <p className="shrix-section-label">Powerful Tools</p>
      <h2>Popular Financial Calculators</h2>

      <div className="shrix-grid">
        {calculators.map(([icon, title, desc]) => (
          <div className="shrix-card" key={title}>
            <div className="shrix-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <button>Calculate →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalculatorGrid;