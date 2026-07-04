import { useState } from "react";
import "./SipCalculator.css";

const SIP_LIMITS = {
  monthly: { min: 500, max: 1000000, step: 500 },
  rate: { min: 1, max: 30, step: 0.5 },
  years: { min: 1, max: 40, step: 1 },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDisplayValue(value, format) {
  if (format === "currency") return formatCurrency(value);
  if (format === "percent") {
    return `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(value)}%`;
  }
  return `${value} ${value === 1 ? "year" : "years"}`;
}

function parseIntegerInput(str) {
  const digits = str.replace(/[^\d]/g, "");
  if (digits === "") return null;
  return parseInt(digits, 10);
}

function parseDecimalInput(str) {
  const cleaned = str.replace(/[^\d.]/g, "");
  const dotIndex = cleaned.indexOf(".");
  const normalized =
    dotIndex === -1
      ? cleaned
      : cleaned.slice(0, dotIndex + 1) + cleaned.slice(dotIndex + 1).replace(/\./g, "");
  if (normalized === "" || normalized === ".") return null;
  return parseFloat(normalized);
}

function getValidationError(value, limits, format) {
  if (value < limits.min) {
    if (format === "currency") return `Minimum is ${formatCurrency(limits.min)}`;
    if (format === "percent") return `Minimum is ${limits.min}%`;
    return `Minimum is ${limits.min} year${limits.min === 1 ? "" : "s"}`;
  }
  if (value > limits.max) {
    if (format === "currency") return `Maximum is ${formatCurrency(limits.max)}`;
    if (format === "percent") return `Maximum is ${limits.max}%`;
    return `Maximum is ${limits.max} years`;
  }
  return "";
}

function SipInputField({ id, label, value, onChange, format, limits }) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(String(value));
  const [error, setError] = useState("");

  const inputMode = format === "percent" ? "decimal" : "numeric";

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(String(value));
    setError("");
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    const parsed =
      format === "percent" ? parseDecimalInput(raw) : parseIntegerInput(raw);

    if (parsed === null) return;

    onChange(clamp(parsed, limits.min, limits.max));
    setError(getValidationError(parsed, limits, format));
  };

  const handleBlur = () => {
    setIsFocused(false);

    const parsed =
      format === "percent"
        ? parseDecimalInput(displayValue)
        : parseIntegerInput(displayValue);

    const finalValue = parsed === null ? limits.min : clamp(parsed, limits.min, limits.max);
    onChange(finalValue);
    setDisplayValue(formatDisplayValue(finalValue, format));
    setError(getValidationError(finalValue, limits, format));
  };

  const handleSliderChange = (e) => {
    const nextValue = Number(e.target.value);
    onChange(nextValue);
    setDisplayValue(isFocused ? String(nextValue) : formatDisplayValue(nextValue, format));
    setError(getValidationError(nextValue, limits, format));
  };

  const shownValue = isFocused ? displayValue : formatDisplayValue(value, format);

  return (
    <div className="sip-field">
      <label className="sip-field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`sip-field-input${error ? " sip-field-input--error" : ""}`}
        type="text"
        inputMode={inputMode}
        value={shownValue}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <input
        className="sip-range"
        type="range"
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={value}
        onChange={handleSliderChange}
        aria-label={`${label} slider`}
      />
      {error && (
        <p className="sip-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SipResultCard({ label, value, highlight = false }) {
  return (
    <div className={`sip-result-card${highlight ? " sip-result-card--highlight" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SipCalculator({
  defaultMonthly = 10000,
  defaultRate = 12,
  defaultYears = 15,
  className = "",
  showHeader = true,
}) {
  const [monthly, setMonthly] = useState(defaultMonthly);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  const months = years * 12;
  const monthlyRate = rate / 12 / 100;

  const futureValue =
    monthlyRate === 0
      ? monthly * months
      : monthly *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));

  const invested = monthly * months;
  const returns = futureValue - invested;

  return (
    <section className={`sip-calculator sip-section${className ? ` ${className}` : ""}`}>
      {showHeader && (
        <div className="sip-left">
          <p className="shrix-section-label">SIP Calculator</p>
          <h2>Plan your wealth with clarity</h2>
          <p>
            Calculate estimated SIP returns based on monthly investment, expected
            annual return and investment period.
          </p>
        </div>
      )}

      <div className="sip-body">
        <div className="sip-form">
          <SipInputField
            id="sip-monthly"
            label="Monthly Investment"
            value={monthly}
            onChange={setMonthly}
            format="currency"
            limits={SIP_LIMITS.monthly}
          />
          <SipInputField
            id="sip-rate"
            label="Expected Return (% yearly)"
            value={rate}
            onChange={setRate}
            format="percent"
            limits={SIP_LIMITS.rate}
          />
          <SipInputField
            id="sip-years"
            label="Time Period (Years)"
            value={years}
            onChange={setYears}
            format="years"
            limits={SIP_LIMITS.years}
          />
        </div>

        <div className="sip-results">
          <SipResultCard
            key={formatCurrency(invested)}
            label="Total Invested"
            value={formatCurrency(invested)}
          />
          <SipResultCard
            key={formatCurrency(returns)}
            label="Estimated Returns"
            value={formatCurrency(returns)}
          />
          <SipResultCard
            key={formatCurrency(futureValue)}
            label="Future Value"
            value={formatCurrency(futureValue)}
            highlight
          />
        </div>
      </div>
    </section>
  );
}

export default SipCalculator;
