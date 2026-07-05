import Navbar from "../components/Navbar";
import HomeLoanEligibilityCalculator from "../components/HomeLoanEligibilityCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function HomeLoanEligibilityCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <HomeLoanEligibilityCalculator />
      <Footer />
    </div>
  );
}

export default HomeLoanEligibilityCalculatorPage;
