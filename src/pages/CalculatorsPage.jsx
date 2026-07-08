import Navbar from "../components/Navbar";
import CalculatorGrid from "../components/CalculatorGrid";
import Footer from "../components/Footer";
import "../styles/global.css";

function CalculatorsPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <CalculatorGrid
        sectionLabel="Complete Toolkit"
        title="All Financial Calculators"
        subtitle="Explore financial planning, investment, loan, retirement, and tax calculators for educational estimates."
        sectionId={null}
      />
      <p className="shrix-info-disclaimer shrix-calculators-disclaimer">
        Calculator results are estimates only and depend on your inputs and assumptions.
        For educational purposes only. Not financial, tax, investment, or loan advice.
      </p>
      <Footer />
    </div>
  );
}

export default CalculatorsPage;
