import Navbar from "../components/Navbar";
import SwpCalculator from "../components/SwpCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function SwpCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <SwpCalculator />
      <Footer />
    </div>
  );
}

export default SwpCalculatorPage;
