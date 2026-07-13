/**
 * Internal validation for the FOINWI Daily Intelligence Engine.
 * Run: node scripts/validateInsightEngine.js
 */
/* global process */

import {
  getDailyInsight,
  getInsightById,
  getInsightsByConcept,
  getInsightCatalogCount,
  getRotatingDailyInsight,
} from "../src/intelligence/insight/insightEngine.js";
import { getSearchIndexCounts, searchFOINWI } from "../src/intelligence/search/searchEngine.js";
import { resetSearchIndexCache } from "../src/intelligence/search/searchIndex.js";

function assertInsightShape(insight, errors, label) {
  if (!insight) {
    errors.push(`${label}: missing insight`);
    return;
  }
  const required = [
    "id",
    "title",
    "summary",
    "explanation",
    "conceptId",
    "category",
    "difficulty",
    "readingTime",
    "tags",
    "relatedCalculatorPaths",
    "relatedLessonSlugs",
    "relatedJourneySlugs",
    "relatedMissionSlugs",
    "educationalNotice",
  ];
  required.forEach((field) => {
    if (insight[field] === undefined || insight[field] === null) {
      errors.push(`${label}: missing field ${field}`);
    }
  });
  if (
    typeof insight.educationalNotice === "string" &&
    /best investment|guaranteed return|buy this|invest now/i.test(insight.educationalNotice + insight.summary + insight.explanation)
  ) {
    errors.push(`${label}: unsafe advice-like language detected`);
  }
}

const SCENARIOS = [
  {
    name: "general daily insight",
    run: () => getDailyInsight({ date: "2026-07-13" }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "general");
      if (!result.metadata.dateKey) errors.push("missing dateKey");
      if (!result.relatedRecommendations) errors.push("missing relatedRecommendations");
    },
  },
  {
    name: "SIP calculator context",
    run: () =>
      getDailyInsight({
        date: "2026-07-13",
        pathname: "/sip-calculator",
      }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "sip");
      if (!["sip", "compounding", "mutual-funds", "goal-planning"].includes(result.insight.conceptId)) {
        errors.push(`expected SIP-related concept, got ${result.insight.conceptId}`);
      }
      if (result.context?.primaryConceptId !== "sip") {
        errors.push(`expected context sip, got ${result.context?.primaryConceptId}`);
      }
    },
  },
  {
    name: "EMI calculator context",
    run: () =>
      getDailyInsight({
        date: "2026-07-13",
        pathname: "/emi-calculator",
      }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "emi");
      if (!["emi", "debt", "credit-score", "budgeting"].includes(result.insight.conceptId)) {
        errors.push(`expected debt/emi-related concept, got ${result.insight.conceptId}`);
      }
    },
  },
  {
    name: "retirement context",
    run: () =>
      getDailyInsight({
        date: "2026-07-13",
        pathname: "/learn/retirement-planning",
      }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "retirement");
      if (!["retirement", "inflation", "nps", "epf", "compounding"].includes(result.insight.conceptId)) {
        errors.push(`expected retirement-related concept, got ${result.insight.conceptId}`);
      }
    },
  },
  {
    name: "health savings context",
    run: () =>
      getDailyInsight({
        date: "2026-07-13",
        pathname: "/financial-health-score",
        healthTopic: "savings",
      }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "health");
      if (
        !["emergency-fund", "budgeting", "savings", "goal-planning"].includes(result.insight.conceptId)
      ) {
        errors.push(`expected savings-health concept, got ${result.insight.conceptId}`);
      }
    },
  },
  {
    name: "unknown route fallback",
    run: () =>
      getDailyInsight({
        date: "2026-07-13",
        pathname: "/not-a-real-page",
      }),
    assert: (result, errors) => {
      assertInsightShape(result.insight, errors, "unknown");
      if (!result.insight) errors.push("fallback should still return an insight");
    },
  },
  {
    name: "same date determinism",
    run: () => {
      const a = getDailyInsight({ date: "2026-03-01", pathname: "/sip-calculator" });
      const b = getRotatingDailyInsight("2026-03-01", { pathname: "/sip-calculator" });
      return { a, b };
    },
    assert: (pair, errors) => {
      if (pair.a.insight.id !== pair.b.insight.id) {
        errors.push(
          `determinism failed: ${pair.a.insight.id} !== ${pair.b.insight.id}`,
        );
      }
      if (pair.a.metadata.dateKey !== "2026-03-01") {
        errors.push(`expected dateKey 2026-03-01, got ${pair.a.metadata.dateKey}`);
      }
    },
  },
  {
    name: "excluded insight behavior",
    run: () => {
      const first = getDailyInsight({ date: "2026-07-13", pathname: "/sip-calculator" });
      const second = getDailyInsight({
        date: "2026-07-13",
        pathname: "/sip-calculator",
        excludeIds: [first.insight.id],
      });
      return { first, second };
    },
    assert: (pair, errors) => {
      if (pair.first.insight.id === pair.second.insight.id) {
        errors.push("excluded insight was selected again");
      }
    },
  },
  {
    name: "search indexing of new insights",
    run: () => {
      resetSearchIndexCache();
      const counts = getSearchIndexCounts();
      const search = searchFOINWI("emergency buffer");
      return { counts, search };
    },
    assert: (data, errors) => {
      const catalogCount = getInsightCatalogCount();
      if ((data.counts.insight ?? 0) < catalogCount) {
        errors.push(
          `search insight count ${data.counts.insight} < catalog ${catalogCount}`,
        );
      }
      if (data.counts.insight < 30) {
        errors.push(`expected at least 30 indexed insights, got ${data.counts.insight}`);
      }
      const found =
        data.search.results.some((item) => item.type === "insight") ||
        data.search.groupedResults.insights.length > 0 ||
        data.search.results.some((item) => item.conceptId === "emergency-fund");
      if (!found) errors.push("search did not surface insight/emergency-fund content");
    },
  },
  {
    name: "lookup helpers",
    run: () => ({
      byId: getInsightById("insight-sip-regular"),
      byConcept: getInsightsByConcept("sip"),
      count: getInsightCatalogCount(),
    }),
    assert: (data, errors) => {
      if (!data.byId) errors.push("getInsightById failed");
      if (!data.byConcept.length) errors.push("getInsightsByConcept(sip) empty");
      if (data.count < 30) errors.push(`expected >=30 insights, got ${data.count}`);
    },
  },
];

console.log("FOINWI Daily Intelligence Engine — validation\n");
console.log(`Catalog size: ${getInsightCatalogCount()}\n`);

let failed = 0;

SCENARIOS.forEach((scenario) => {
  const result = scenario.run();
  const errors = [];
  scenario.assert(result, errors);
  const passed = errors.length === 0;
  console.log(`[${passed ? "PASS" : "FAIL"}] ${scenario.name}`);
  if (result?.insight?.id) {
    console.log(
      `  insight=${result.insight.id} concept=${result.insight.conceptId} confidence=${result.metadata?.confidence}`,
    );
  }
  if (result?.a?.insight?.id) {
    console.log(`  ids=${result.a.insight.id} / ${result.b.insight.id}`);
  }
  if (result?.first?.insight?.id) {
    console.log(`  first=${result.first.insight.id} second=${result.second.insight.id}`);
  }
  if (result?.counts) {
    console.log(`  index insights=${result.counts.insight} total=${result.counts.total}`);
  }
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

console.log("All insight scenarios passed.");
