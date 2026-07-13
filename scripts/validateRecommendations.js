/**
 * Internal validation for the FOINWI Recommendation Engine.
 * Run: node scripts/validateRecommendations.js
 */
/* global process */

import { getRecommendations } from "../src/intelligence/recommendation/recommendationEngine.js";

const SCENARIOS = [
  {
    name: "SIP",
    context: { sourceType: "calculator", calculatorPath: "/sip-calculator" },
    expectTitles: ["Build Wealth", "Mutual Funds & SIP", "Goal Planner"],
    expectConcept: "sip",
  },
  {
    name: "EMI",
    context: { sourceType: "calculator", calculatorPath: "/emi-calculator" },
    expectTitles: ["Loans & EMI", "Loan Prepayment Calculator", "Become Debt Free"],
    expectConcept: "emi",
  },
  {
    name: "Retirement",
    context: { sourceType: "lesson", lessonSlug: "retirement-planning" },
    expectTitles: ["Retirement Planning", "NPS Calculator", "Retirement Planning"],
    expectConcept: "retirement",
  },
  {
    name: "Health — Savings",
    context: { sourceType: "health-score", healthTopic: "savings" },
    expectTitles: ["Emergency Fund", "Budgeting", "Build Wealth"],
    expectConcept: "savings",
  },
  {
    name: "Tax",
    context: { sourceType: "calculator", calculatorPath: "/income-tax-calculator" },
    expectTitles: ["Income Tax Basics", "HRA Calculator", "Save Tax"],
    expectConcept: "tax",
  },
  {
    name: "Unknown fallback",
    context: {},
    expectTitles: ["Money Basics", "Goal Planner", "Build Wealth"],
    expectConcept: null,
    expectConfidence: "fallback",
  },
];

function collectTitles(result) {
  const buckets = ["primary", "secondary", "learning", "tools", "journeys", "health", "insights"];
  return buckets.flatMap((key) => result[key].map((item) => item.title));
}

function validateScenario(scenario) {
  const result = getRecommendations(scenario.context);
  const titles = collectTitles(result);
  const errors = [];

  if (scenario.expectConcept !== undefined && result.metadata.conceptId !== scenario.expectConcept) {
    errors.push(`expected conceptId "${scenario.expectConcept}", got "${result.metadata.conceptId}"`);
  }

  if (scenario.expectConfidence && result.metadata.confidence !== scenario.expectConfidence) {
    errors.push(`expected confidence "${scenario.expectConfidence}", got "${result.metadata.confidence}"`);
  }

  scenario.expectTitles.forEach((fragment) => {
    const found = titles.some((title) => title.includes(fragment));
    if (!found) {
      errors.push(`missing expected recommendation containing "${fragment}"`);
    }
  });

  const requiredFields = ["id", "type", "title", "description", "path", "reason", "priority"];
  const sample = result.primary[0] ?? result.secondary[0] ?? result.learning[0];
  if (sample) {
    requiredFields.forEach((field) => {
      if (sample[field] === undefined || sample[field] === null || sample[field] === "") {
        errors.push(`sample item missing required field "${field}"`);
      }
    });
    if (sample.score !== undefined) {
      errors.push("public item should not expose internal score field");
    }
  } else if (scenario.name !== "Unknown fallback") {
    errors.push("no recommendations returned");
  }

  return { scenario: scenario.name, passed: errors.length === 0, errors, result, titles };
}

console.log("FOINWI Recommendation Engine — validation\n");

const outcomes = SCENARIOS.map(validateScenario);
let failed = 0;

outcomes.forEach(({ scenario, passed, errors, result, titles }) => {
  const status = passed ? "PASS" : "FAIL";
  console.log(`[${status}] ${scenario}`);
  console.log(`  conceptId: ${result.metadata.conceptId} | confidence: ${result.metadata.confidence}`);
  console.log(`  primary: ${result.primary.map((i) => i.title).join(", ") || "(none)"}`);
  if (!passed) {
    errors.forEach((error) => console.log(`  ✗ ${error}`));
    failed += 1;
  }
  console.log(`  all titles: ${titles.slice(0, 8).join(" · ")}${titles.length > 8 ? " …" : ""}`);
  console.log("");
});

if (failed > 0) {
  console.error(`${failed} scenario(s) failed.`);
  process.exit(1);
}

console.log("All scenarios passed.");
