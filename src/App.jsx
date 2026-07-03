import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">₹ Shrix</div>
        <div className="navlinks">
          <a>Calculators</a>
          <a>Learn</a>
          <a>AI Tools</a>
          <a>Contact</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="badge">India’s Smart Finance Platform</p>
          <h1>Grow Beyond Numbers.</h1>
          <p className="subtitle">
            Plan SIP, FD, EMI, PPF, retirement and financial goals with simple,
            powerful calculators built for Indian users.
          </p>
          <button>Start Calculating</button>
        </div>

        <div className="card">
          <h3>SIP Growth Example</h3>
          <p>₹10,000/month for 15 years at 12%</p>
          <h2>₹50.45 Lakh</h2>
          <span>Estimated future value</span>
        </div>
      </section>

      <section className="tools">
        <h2>Popular Calculators</h2>
        <div className="grid">
          {["SIP", "FD", "RD", "EMI", "PPF", "SWP", "CAGR", "Retirement"].map(
            (item) => (
              <div className="tool" key={item}>
                <h3>{item} Calculator</h3>
                <p>Calculate your {item} plan easily.</p>
              </div>
            )
          )}
        </div>
      </section>

      <footer>
        <b>Shrix.in</b>
        <p>Educational finance tools. Not financial advice.</p>
      </footer>
    </div>
  );
}

export default App;