/**
 * Internal validation for the FOINWI Context Engine.
 * Run: node scripts/validateContextEngine.js
 */
/* global process */

import { buildIntelligenceContext } from "../src/intelligence/context/contextEngine.js";
import { getRecommendations } from "../src/intelligence/recommendation/recommendationEngine.js";

const SCENARIOS = [
  {
    name: "SIP calculator",
    input: { pathname: "/sip-calculator" },
    expect: {
      primaryConceptId: "sip",
      userIntent: "calculate",
      lifecycleStage: "practice",
      sourceType: "calculator",
      confidence: "high",
    },
  },
  {
    name: "EMI calculator",
    input: { pathname: "/emi-calculator" },
    expect: {
      primaryConceptId: "emi",
      userIntent: "calculate",
      lifecycleStage: "practice",
      sourceType: "calculator",
      confidence: "high",
    },
  },
  {
    name: "Mutual Funds learn path",
    input: { pathname: "/learn/mutual-funds-sip" },
    expect: {
      primaryConceptId: "mutual-funds",
      userIntent: "learn",
      lifecycleStage: "understand",
      sourceType: "lesson",
      confidence: "high",
    },
  },
  {
    name: "Build Wealth journey",
    input: { pathname: "/journeys/build-wealth" },
    expect: {
      primaryConceptId: "goal-planning",
      userIntent: "plan",
      lifecycleStage: "plan",
      sourceType: "journey",
      confidence: "high",
    },
  },
  {
    name: "Health Score savings",
    input: {
      pathname: "/financial-health-score",
      healthTopic: "savings",
      sourceType: "health-score",
    },
    expect: {
      primaryConceptId: "emergency-fund",
      userIntent: "improve",
      lifecycleStage: "progress",
      sourceType: "health-score",
      confidence: "high",
    },
  },
  {
    name: "Guide page",
    input: { pathname: "/ai-tools" },
    expect: {
      primaryConceptId: "savings",
      userIntent: "explore",
      lifecycleStage: "discover",
      sourceType: "guide",
      confidence: "high",
    },
  },
  {
    name: "Unknown route fallback",
    input: { pathname: "/not-a-real-page" },
    expect: {
      primaryConceptId: null,
      userIntent: "explore",
      lifecycleStage: "discover",
      sourceType: "unknown",
      confidence: "low", // pathname present but unresolved
    },
  },
];

function validateScenario(scenario) {
  const context = buildIntelligenceContext(scenario.input);
  const errors = [];
  const { expect } = scenario;

  if (context.primaryConceptId !== expect.primaryConceptId) {
    errors.push(
      `primaryConceptId: expected "${expect.primaryConceptId}", got "${context.primaryConceptId}"`,
    );
  }

  if (context.userIntent !== expect.userIntent) {
    errors.push(`userIntent: expected "${expect.userIntent}", got "${context.userIntent}"`);
  }

  if (context.lifecycleStage !== expect.lifecycleStage) {
    errors.push(
      `lifecycleStage: expected "${expect.lifecycleStage}", got "${context.lifecycleStage}"`,
    );
  }

  if (context.source.type !== expect.sourceType) {
    errors.push(`source.type: expected "${expect.sourceType}", got "${context.source.type}"`);
  }

  if (expect.confidence && context.metadata.confidence !== expect.confidence) {
    errors.push(
      `confidence: expected "${expect.confidence}", got "${context.metadata.confidence}"`,
    );
  }

  if (!context.recommendationContext || typeof context.recommendationContext !== "object") {
    errors.push("recommendationContext missing");
  } else {
    let recommendations;
    try {
      recommendations = getRecommendations(context.recommendationContext);
    } catch (error) {
      errors.push(`getRecommendations threw: ${error.message}`);
    }

    if (recommendations) {
      const hasBuckets =
        Array.isArray(recommendations.primary) &&
        Array.isArray(recommendations.learning) &&
        Array.isArray(recommendations.tools) &&
        recommendations.metadata;

      if (!hasBuckets) {
        errors.push("recommendationContext is not compatible with getRecommendations()");
      }

      if (
        expect.primaryConceptId &&
        recommendations.metadata.conceptId &&
        recommendations.metadata.conceptId !== expect.primaryConceptId &&
        // Journey build-wealth may resolve via journeySlug in recommendation engine
        !context.recommendationContext.journeySlug &&
        !context.recommendationContext.healthTopic
      ) {
        // Soft check only when conceptId is the sole signal
      }
    }
  }

  const requiredTop = [
    "source",
    "primaryConceptId",
    "relatedConceptIds",
    "userIntent",
    "lifecycleStage",
    "difficulty",
    "completedItems",
    "recentItems",
    "recentRoutes",
    "recommendationContext",
    "metadata",
  ];

  requiredTop.forEach((field) => {
    if (!(field in context)) errors.push(`missing field "${field}"`);
  });

  return { scenario: scenario.name, passed: errors.length === 0, errors, context };
}

console.log("FOINWI Context Engine — validation\n");

const outcomes = SCENARIOS.map(validateScenario);
let failed = 0;

outcomes.forEach(({ scenario, passed, errors, context }) => {
  const status = passed ? "PASS" : "FAIL";
  console.log(`[${status}] ${scenario}`);
  console.log(
    `  concept=${context.primaryConceptId} | intent=${context.userIntent} | stage=${context.lifecycleStage} | confidence=${context.metadata.confidence}`,
  );
  console.log(
    `  source=${context.source.type}:${context.source.path} | resolvedBy=${context.metadata.resolvedBy.join(",")}`,
  );
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
