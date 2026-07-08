import { useState } from "react";
import CalculatorLayout from "./ui/CalculatorLayout";
import CurrencyInput from "./ui/CurrencyInput";
import InputField from "./ui/InputField";
import ResultCard from "./ui/ResultCard";

const CAGR_LIMITS = {
  initial: { min: 10000, max: 10000000, step: 10000 },
  final: { min: 10000, max: 50000000, step: 10000 },
  years: { min: 1, max: 40, step: 1 },
};

function formatPercent(value) {
  return `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value)}%`;
}

function calculateCagr(initial, finalValue, years) {
  if (initial <= 0 || finalValue <= 0 || years <= 0) return 0;
  return (Math.pow(finalValue / initial, 1 / years) - 1) * 100;
}

function CagrCalculator({
  defaultInitial = 100000,
  defaultFinal = 250000,
  defaultYears = 5,
  className = "",
  showHeader = true,
}) {
  const [initial, setInitial] = useState(defaultInitial);
  const [finalValue, setFinalValue] = useState(defaultFinal);
  const [years, setYears] = useState(defaultYears);

  const cagr = calculateCagr(initial, finalValue, years);

  return (
    <CalculatorLayout
      label="CAGR Calculator"
      title="Measure your annualized return"
      description="Calculate Compound Annual Growth Rate based on initial investment, final value, and investment period."
      showHeader={showHeader}
      variant="default"
      className={className}
      calculatorId="/cagr-calculator"
      form={
        <>
          <CurrencyInput
            id="cagr-initial"
            label="Initial Investment"
            value={initial}
            onChange={setInitial}
            limits={CAGR_LIMITS.initial}
          />
          <CurrencyInput
            id="cagr-final"
            label="Final Value"
            value={finalValue}
            onChange={setFinalValue}
            limits={CAGR_LIMITS.final}
          />
          <InputField
            id="cagr-years"
            label="Time Period (Years)"
            value={years}
            onChange={setYears}
            format="years"
            limits={CAGR_LIMITS.years}
          />
        </>
      }
      results={
        <ResultCard
          key={formatPercent(cagr)}
          label="CAGR"
          value={formatPercent(cagr)}
          highlight
        />
      }
    />
  );
}

export default CagrCalculator;
