import Navbar from "../components/Navbar";
import LoanPrepaymentCalculator from "../components/LoanPrepaymentCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function LoanPrepaymentCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <LoanPrepaymentCalculator />
      <Footer />
    </div>
  );
}

export default LoanPrepaymentCalculatorPage;
