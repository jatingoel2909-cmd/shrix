import Navbar from "../components/Navbar";
import LumpsumCalculator from "../components/LumpsumCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function LumpsumCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <LumpsumCalculator />
      <Footer />
    </div>
  );
}

export default LumpsumCalculatorPage;
