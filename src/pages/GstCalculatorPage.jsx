import Navbar from "../components/Navbar";
import GstCalculator from "../components/GstCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function GstCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <GstCalculator />
      <Footer />
    </div>
  );
}

export default GstCalculatorPage;
