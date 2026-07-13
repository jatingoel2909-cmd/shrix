/**
 * FOINWI Phase 4 Sprint 1 — full intelligence layer integration validation.
 *
 * Flow: route → buildIntelligenceContext → getRecommendations → searchFOINWI → getDailyInsight
 *
 * Run: node scripts/validateIntelligenceLayer.js
 */
/* global process */

import { buildIntelligenceContext } from "../src/intelligence/context/contextEngine.js";
import { getRecommendations } from "../src/intelligence/recommendation/recommendationEngine.js";
import { searchFOINWI, getSearchIndexCounts } from "../src/intelligence/search/searchEngine.js";
import { getDailyInsight, getInsightCatalogCount } from "../src/intelligence/insight/insightEngine.js";
import { getAllConcepts } from "../src/intelligence/knowledge/financialConcepts.js";

const FLOWS = [
  {
    name: "SIP",
    pathname: "/sip-calculator",
    searchQuery: "SIP",
    expectConcept: "sip",
    expectIntent: "calculate",
    expectStage: "practice",
  },
  {
    name: "EMI",
    pathname: "/emi-calculator",
    searchQuery: "EMI",
    expectConcept: "emi",
    expectIntent: "calculate",
    expectStage: "practice",
  },
  {
    name: "Retirement",
    pathname: "/learn/retirement-planning",
    searchQuery: "retirement",
    expectConcept: "retirement",
    expectIntent: "learn",
    expectStage: "understand",
  },
  {
    name: "Health savings",
    pathname: "/financial-health-score",
    healthTopic: "savings",
    searchQuery: "emergency fund",
    expectConcept: "emergency-fund",
    expectIntent: "improve",
    expectStage: "progress",
  },
  {
    name: "Unknown route",
    pathname: "/not-a-real-page",
    searchQuery: "money basics",
    expectConcept: null,
    expectIntent: "explore",
    expectStage: "discover",
  },
];

function runFlow(flow) {
  const errors = [];

  const context = buildIntelligenceContext({
    pathname: flow.pathname,
    healthTopic: flow.healthTopic,
  });

  if (context.primaryConceptId !== flow.expectConcept) {
    errors.push(
      `context concept: expected ${flow.expectConcept}, got ${context.primaryConceptId}`,
    );
  }
  if (context.userIntent !== flow.expectIntent) {
    errors.push(`intent: expected ${flow.expectIntent}, got ${context.userIntent}`);
  }
  if (context.lifecycleStage !== flow.expectStage) {
    errors.push(`stage: expected ${flow.expectStage}, got ${context.lifecycleStage}`);
  }

  let recommendations;
  try {
    recommendations = getRecommendations(context.recommendationContext);
  } catch (error) {
    errors.push(`getRecommendations threw: ${error.message}`);
  }

  if (recommendations) {
    const hasShape =
      Array.isArray(recommendations.primary) &&
      Array.isArray(recommendations.learning) &&
      recommendations.metadata;
    if (!hasShape) errors.push("recommendations shape invalid");
  }

  let search;
  try {
    search = searchFOINWI(flow.searchQuery, {
      context,
      limit: 10,
    });
  } catch (error) {
    errors.push(`searchFOINWI threw: ${error.message}`);
  }

  if (search && flow.expectConcept && search.metadata.total === 0) {
    errors.push("search returned no results for known query");
  }

  let insight;
  try {
    insight = getDailyInsight({
      date: "2026-07-13",
      pathname: flow.pathname,
      healthTopic: flow.healthTopic,
    });
  } catch (error) {
    errors.push(`getDailyInsight threw: ${error.message}`);
  }

  if (!insight?.insight?.id) {
    errors.push("daily insight missing");
  } else if (!insight.insight.educationalNotice) {
    errors.push("insight missing educationalNotice");
  }

  if (insight && !insight.relatedRecommendations) {
    errors.push("insight missing relatedRecommendations");
  }

  return {
    name: flow.name,
    passed: errors.length === 0,
    errors,
    summary: {
      concept: context.primaryConceptId,
      intent: context.userIntent,
      stage: context.lifecycleStage,
      recTotal:
        (recommendations?.primary?.length ?? 0) + (recommendations?.secondary?.length ?? 0),
      searchTotal: search?.metadata?.total ?? 0,
      insightId: insight?.insight?.id ?? null,
      insightConcept: insight?.insight?.conceptId ?? null,
    },
  };
}

console.log("FOINWI Intelligence Layer — Sprint 1 integration\n");

const conceptCount = getAllConcepts().length;
const insightCount = getInsightCatalogCount();
const indexCounts = getSearchIndexCounts();

console.log(`Knowledge concepts: ${conceptCount}`);
console.log(`Daily insights: ${insightCount}`);
console.log(`Search index total: ${indexCounts.total} (insights: ${indexCounts.insight})`);
console.log("");

const outcomes = FLOWS.map(runFlow);
let failed = 0;

outcomes.forEach((outcome) => {
  console.log(`[${outcome.passed ? "PASS" : "FAIL"}] ${outcome.name}`);
  console.log(
    `  context=${outcome.summary.concept} | ${outcome.summary.intent}/${outcome.summary.stage}`,
  );
  console.log(
    `  recs≈${outcome.summary.recTotal} | search=${outcome.summary.searchTotal} | insight=${outcome.summary.insightId} (${outcome.summary.insightConcept})`,
  );
  if (!outcome.passed) {
    outcome.errors.forEach((error) => console.log(`  ✗ ${error}`));
    failed += 1;
  }
  console.log("");
});

if (failed > 0) {
  console.error(`${failed} flow(s) failed.`);
  process.exit(1);
}

console.log("All intelligence layer flows passed.");
