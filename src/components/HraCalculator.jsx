import { useState } from "react";
import CalculatorLayout from "./ui/CalculatorLayout";
import CalculatorFormula from "./ui/CalculatorFormula";
import CurrencyInput from "./ui/CurrencyInput";
import ResultCard from "./ui/ResultCard";
import { formatCurrency } from "../utils/calculatorFormat";

const LIMITS = {
  basic: { min: 10000, max: 500000, step: 1000 },
  hra: { min: 0, max: 200000, step: 1000 },
  rent: { min: 0, max: 200000, step: 1000 },
};

const CITY_TYPES = [
  { value: "metro", label: "Metro" },
  { value: "non-metro", label: "Non-Metro" },
];

function calculateHra(basicSalary, hraReceived, rentPaid, cityType) {
  const rentMinusBasic = Math.max(0, rentPaid - basicSalary * 0.1);
  const percentOfBasic = cityType === "metro" ? basicSalary * 0.5 : basicSalary * 0.4;
  const exemption = Math.min(hraReceived, rentMinusBasic, percentOfBasic);
  const taxableHra = Math.max(0, hraReceived - exemption);

  return { exemption, taxableHra };
}

function HraCalculator({
  defaultBasic = 50000,
  defaultHra = 20000,
  defaultRent = 18000,
  defaultCity = "metro",
  className = "",
  showHeader = true,
}) {
  const [basicSalary, setBasicSalary] = useState(defaultBasic);
  const [hraReceived, setHraReceived] = useState(defaultHra);
  const [rentPaid, setRentPaid] = useState(defaultRent);
  const [cityType, setCityType] = useState(defaultCity);

  const { exemption, taxableHra } = calculateHra(
    basicSalary,
    hraReceived,
    rentPaid,
    cityType
  );

  return (
    <CalculatorLayout
      label="HRA Calculator"
      title="Calculate your HRA tax exemption"
      description="Estimate exempt and taxable HRA based on salary, rent paid, and city type under common Indian tax rules."
      showHeader={showHeader}
      variant="default"
      className={className}
      form={
        <>
          <CurrencyInput
            id="hra-basic"
            label="Basic Salary"
            value={basicSalary}
            onChange={setBasicSalary}
            limits={LIMITS.basic}
          />
          <CurrencyInput
            id="hra-received"
            label="HRA Received"
            value={hraReceived}
            onChange={setHraReceived}
            limits={LIMITS.hra}
          />
          <CurrencyInput
            id="hra-rent"
            label="Rent Paid"
            value={rentPaid}
            onChange={setRentPaid}
            limits={LIMITS.rent}
          />
          <div className="calc-field">
            <label className="calc-field__label" htmlFor="hra-city">
              City Type
            </label>
            <select
              id="hra-city"
              className="calc-field__select"
              value={cityType}
              onChange={(e) => setCityType(e.target.value)}
            >
              {CITY_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      results={
        <>
          <ResultCard
            key={formatCurrency(exemption)}
            label="HRA Exemption"
            value={formatCurrency(exemption)}
            highlight
          />
          <ResultCard
            key={formatCurrency(taxableHra)}
            label="Taxable HRA"
            value={formatCurrency(taxableHra)}
          />
        </>
      }
      formula={
        <CalculatorFormula
          formula="Exemption = Minimum of (Actual HRA, Rent − 10% of Basic, 50%/40% of Basic)"
          explanation="Metro cities use 50% of basic salary; non-metro cities use 40%. The lowest of the three eligible amounts is exempt from tax."
        />
      }
    />
  );
}

export default HraCalculator;
