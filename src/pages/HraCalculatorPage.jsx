import Navbar from "../components/Navbar";
import HraCalculator from "../components/HraCalculator";
import Footer from "../components/Footer";
import "../styles/global.css";

function HraCalculatorPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <HraCalculator />
      <Footer />
    </div>
  );
}

export default HraCalculatorPage;
