import Navbar from "../components/Navbar";
import RdCalculator from "../components/RdCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function RdCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <RdCalculator />
      <Footer />
    </div>
  );
}

export default RdCalculatorPage;
