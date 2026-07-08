import { useState } from "react";
import CalculatorLayout from "./ui/CalculatorLayout";
import CurrencyInput from "./ui/CurrencyInput";
import InputField from "./ui/InputField";
import ResultCard from "./ui/ResultCard";
import { formatCurrency } from "../utils/calculatorFormat";

const LUMPSUM_LIMITS = {
  amount: { min: 10000, max: 10000000, step: 10000 },
  rate: { min: 1, max: 30, step: 0.5 },
  years: { min: 1, max: 40, step: 1 },
};

function calculateLumpsumFutureValue(amount, annualRate, years) {
  const rate = annualRate / 100;
  return amount * Math.pow(1 + rate, years);
}

function LumpsumCalculator({
  defaultAmount = 500000,
  defaultRate = 12,
  defaultYears = 10,
  className = "",
  showHeader = true,
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  const futureValue = calculateLumpsumFutureValue(amount, rate, years);
  const estimatedReturns = futureValue - amount;

  return (
    <CalculatorLayout
      label="Lumpsum Calculator"
      title="Project one-time investment growth"
      description="Estimate future value of a lumpsum investment based on expected return and investment period."
      showHeader={showHeader}
      variant="alt"
      className={className}
      calculatorId="/lumpsum-calculator"
      form={
        <>
          <CurrencyInput
            id="lumpsum-amount"
            label="Investment Amount"
            value={amount}
            onChange={setAmount}
            limits={LUMPSUM_LIMITS.amount}
          />
          <InputField
            id="lumpsum-rate"
            label="Expected Return (%)"
            value={rate}
            onChange={setRate}
            format="percent"
            limits={LUMPSUM_LIMITS.rate}
          />
          <InputField
            id="lumpsum-years"
            label="Time Period (Years)"
            value={years}
            onChange={setYears}
            format="years"
            limits={LUMPSUM_LIMITS.years}
          />
        </>
      }
      results={
        <>
          <ResultCard
            key={formatCurrency(amount)}
            label="Invested Amount"
            value={formatCurrency(amount)}
          />
          <ResultCard
            key={formatCurrency(estimatedReturns)}
            label="Estimated Returns"
            value={formatCurrency(estimatedReturns)}
          />
          <ResultCard
            key={formatCurrency(futureValue)}
            label="Future Value"
            value={formatCurrency(futureValue)}
            highlight
          />
        </>
      }
    />
  );
}

export default LumpsumCalculator;
