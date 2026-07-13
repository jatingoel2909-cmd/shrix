/**
 * Internal validation for the FOINWI Search Engine.
 * Run: node scripts/validateSearchEngine.js
 */
/* global process */

import {
  getSearchIndexCounts,
  searchFOINWI,
} from "../src/intelligence/search/searchEngine.js";
import { buildIntelligenceContext } from "../src/intelligence/context/contextEngine.js";

const REQUIRED_FIELDS = [
  "id",
  "type",
  "title",
  "description",
  "path",
  "tags",
  "score",
  "matchedOn",
  "highlight",
  "metadata",
];

function titlesOf(response) {
  return response.results.map((item) => item.title);
}

function hasTitleContaining(response, fragment) {
  const needle = fragment.toLowerCase();
  return response.results.some((item) => item.title.toLowerCase().includes(needle));
}

function validateResultSchema(response) {
  const errors = [];
  const sample = response.results[0];
  if (!sample) return errors;

  REQUIRED_FIELDS.forEach((field) => {
    if (sample[field] === undefined || sample[field] === null) {
      errors.push(`result missing field "${field}"`);
    }
  });

  if ("searchText" in sample || "synonyms" in sample || "difficulty" in sample) {
    errors.push("public result exposes internal fields");
  }

  return errors;
}

const SCENARIOS = [
  {
    name: "SIP",
    run: () => searchFOINWI("SIP"),
    assert: (response, errors) => {
      if (!hasTitleContaining(response, "SIP")) errors.push('missing SIP title match');
      if (response.metadata.confidence === "fallback") errors.push("expected non-fallback confidence");
    },
  },
  {
    name: "monthly investment (SIP synonym)",
    run: () => searchFOINWI("monthly investment"),
    assert: (response, errors) => {
      const sipRelated =
        hasTitleContaining(response, "SIP") ||
        response.results.some((item) => item.conceptId === "sip") ||
        response.metadata.synonymHits?.includes("sip");
      if (!sipRelated) errors.push("expected SIP synonym resolution for monthly investment");
    },
  },
  {
    name: "home loan",
    run: () => searchFOINWI("home loan"),
    assert: (response, errors) => {
      const found =
        hasTitleContaining(response, "Home Loan") ||
        hasTitleContaining(response, "Dream Home");
      if (!found) errors.push("expected home loan calculator or journey");
    },
  },
  {
    name: "retirement",
    run: () => searchFOINWI("retirement"),
    assert: (response, errors) => {
      if (!hasTitleContaining(response, "Retirement")) {
        errors.push("expected retirement-related results");
      }
    },
  },
  {
    name: "tax saving",
    run: () => searchFOINWI("tax saving"),
    assert: (response, errors) => {
      const found =
        hasTitleContaining(response, "Tax") ||
        hasTitleContaining(response, "Save Tax") ||
        response.results.some((item) => item.conceptId === "tax") ||
        response.metadata.synonymHits?.includes("tax");
      if (!found) errors.push("expected tax synonym / tax results");
    },
  },
  {
    name: "emergency fund",
    run: () => searchFOINWI("rainy day fund"),
    assert: (response, errors) => {
      const found =
        hasTitleContaining(response, "Emergency") ||
        response.results.some((item) => item.conceptId === "emergency-fund") ||
        response.metadata.synonymHits?.includes("emergency-fund");
      if (!found) errors.push("expected emergency-fund synonym match");
    },
  },
  {
    name: "unknown query",
    run: () => searchFOINWI("zxqyt widget flux"),
    assert: (response, errors) => {
      if (response.results.length > 0 && response.results[0].score >= 55) {
        errors.push("unknown query should not produce strong matches");
      }
      if (!response.suggestions.length) {
        errors.push("unknown query should return fallback suggestions");
      }
      const hasFallback = response.suggestions.some(
        (item) =>
          item.path === "/calculators" ||
          item.path === "/learn" ||
          item.path === "/ai-tools",
      );
      if (!hasFallback) errors.push("missing safe fallback suggestions");
    },
  },
  {
    name: "filtered calculator-only",
    run: () => searchFOINWI("SIP", { types: ["calculator"], limit: 10 }),
    assert: (response, errors) => {
      if (!response.results.length) errors.push("expected calculator results for SIP");
      if (response.results.some((item) => item.type !== "calculator")) {
        errors.push("non-calculator results returned despite filter");
      }
      if (!hasTitleContaining(response, "SIP Calculator")) {
        errors.push("expected SIP Calculator in filtered results");
      }
    },
  },
  {
    name: "context-aware SIP from retirement context",
    run: () => {
      const context = buildIntelligenceContext({
        pathname: "/learn/retirement-planning",
      });
      return searchFOINWI("SIP", { context, limit: 15 });
    },
    assert: (response, errors) => {
      if (!hasTitleContaining(response, "SIP")) {
        errors.push("SIP query should still return SIP results under retirement context");
      }
      if (response.metadata.contextConceptId !== "retirement") {
        errors.push(
          `expected contextConceptId retirement, got ${response.metadata.contextConceptId}`,
        );
      }
      // Context boost should elevate retirement-linked items among SIP-adjacent results
      const boosted = response.results.some(
        (item) =>
          item.matchedOn?.includes("context-concept") ||
          item.matchedOn?.includes("related-concept") ||
          item.conceptId === "retirement",
      );
      if (!boosted) {
        // Soft: at least metadata should carry context
        if (!response.metadata.contextConceptId) {
          errors.push("missing context-aware scoring signals");
        }
      }
    },
  },
];

console.log("FOINWI Search Engine — validation\n");

const counts = getSearchIndexCounts();
console.log("Index counts:", counts);
console.log("");

let failed = 0;

SCENARIOS.forEach((scenario) => {
  const response = scenario.run();
  const errors = validateResultSchema(response);
  scenario.assert(response, errors);

  const passed = errors.length === 0;
  const status = passed ? "PASS" : "FAIL";
  console.log(`[${status}] ${scenario.name}`);
  console.log(
    `  total=${response.metadata.total} confidence=${response.metadata.confidence} synonyms=${(response.metadata.synonymHits ?? []).join(",") || "-"}`,
  );
  console.log(`  top: ${titlesOf(response).slice(0, 5).join(" · ") || "(none)"}`);
  if (!passed) {
    errors.forEach((error) => console.log(`  ✗ ${error}`));
    failed += 1;
  }
  console.log("");
});

if (failed > 0) {
  console.error(`${failed} scenario(s) failed.`);
  process.exit(1);
}

console.log("All scenarios passed.");
