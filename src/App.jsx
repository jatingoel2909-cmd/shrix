import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SipCalculatorPage from "./pages/SipCalculatorPage";
import EmiCalculatorPage from "./pages/EmiCalculatorPage";
import FdCalculatorPage from "./pages/FdCalculatorPage";
import PpfCalculatorPage from "./pages/PpfCalculatorPage";
import CagrCalculatorPage from "./pages/CagrCalculatorPage";
import LumpsumCalculatorPage from "./pages/LumpsumCalculatorPage";
import SwpCalculatorPage from "./pages/SwpCalculatorPage";
import RdCalculatorPage from "./pages/RdCalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sip-calculator" element={<SipCalculatorPage />} />
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/fd-calculator" element={<FdCalculatorPage />} />
        <Route path="/ppf-calculator" element={<PpfCalculatorPage />} />
        <Route path="/cagr-calculator" element={<CagrCalculatorPage />} />
        <Route path="/lumpsum-calculator" element={<LumpsumCalculatorPage />} />
        <Route path="/swp-calculator" element={<SwpCalculatorPage />} />
        <Route path="/rd-calculator" element={<RdCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
