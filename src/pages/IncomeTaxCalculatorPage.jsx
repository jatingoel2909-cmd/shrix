import Navbar from "../components/Navbar";
import IncomeTaxCalculator from "../components/IncomeTaxCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function IncomeTaxCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <IncomeTaxCalculator />
      <Footer />
    </div>
  );
}

export default IncomeTaxCalculatorPage;
