import Navbar from "../components/Navbar";
import CompoundInterestCalculator from "../components/CompoundInterestCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function CompoundInterestCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <CompoundInterestCalculator />
      <Footer />
    </div>
  );
}

export default CompoundInterestCalculatorPage;
