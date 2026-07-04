import Navbar from "../components/Navbar";
import CagrCalculator from "../components/CagrCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function CagrCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <CagrCalculator />
      <Footer />
    </div>
  );
}

export default CagrCalculatorPage;
