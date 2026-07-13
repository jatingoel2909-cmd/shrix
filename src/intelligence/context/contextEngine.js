/**
 * FOINWI Context Engine — main API.
 * Translates location/activity into intelligence context for recommendations.
 * No browser APIs. No persistence. Educational guidance only.
 */

import {
  buildRecommendationContext,
  getContextConfidence,
  getRelatedConceptsForContext,
  mergeContextHistory,
  resolveLifecycleStage,
  resolvePrimaryConcept,
  resolveSourceType,
  resolveUserIntent,
  sanitizeContextInput,
} from "./contextHelpers.js";
import { parseRoute } from "./contextResolvers.js";
import { createFallbackIntelligenceContext } from "./contextTypes.js";

function resolveSourceDescriptor(clean, sourceType) {
  const route = parseRoute(clean.pathname || clean.calculatorPath || "");
  const path =
    clean.pathname ||
    clean.calculatorPath ||
    (clean.lessonSlug ? `/learn/${clean.lessonSlug}` : "") ||
    (clean.journeySlug ? `/journeys/${clean.journeySlug}` : "") ||
    (clean.missionSlug ? `/journeys/${clean.missionSlug}` : "") ||
    (sourceType === "health-score" ? "/financial-health-score" : "") ||
    (sourceType === "guide" ? "/ai-tools" : "") ||
    route.path ||
    "/";

  const id =
    clean.sourceId ||
    clean.calculatorPath ||
    clean.lessonSlug ||
    clean.journeySlug ||
    clean.missionSlug ||
    clean.healthTopic ||
    clean.guideGoal ||
    (route.slug ?? null) ||
    (route.calculatorPath ?? null) ||
    null;

  return {
    type: clean.sourceType || sourceType,
    id,
    path,
  };
}

/**
 * Build a clean intelligence context from optional location/activity signals.
 * @param {import('./contextTypes.js').ContextInput} [input]
 * @returns {import('./contextTypes.js').IntelligenceContext}
 */
export function buildIntelligenceContext(input = {}) {
  const clean = sanitizeContextInput(input);
  const history = mergeContextHistory(clean, {
    recentRoutes: clean.recentRoutes,
    recentItems: clean.recentItems,
    completedItems: clean.completedItems,
    recentConcepts: clean.recentConcepts,
  });

  const { conceptId, resolvedBy } = resolvePrimaryConcept(clean);
  const routeSourceType = clean.pathname
    ? resolveSourceType(clean.pathname)
    : clean.calculatorPath
      ? "calculator"
      : clean.lessonSlug
        ? "lesson"
        : clean.journeySlug
          ? "journey"
          : clean.missionSlug
            ? "mission"
            : clean.healthTopic
              ? "health-score"
              : clean.guideGoal
                ? "guide"
                : "unknown";

  const sourceType = clean.sourceType || routeSourceType;
  const userIntent = resolveUserIntent(clean);
  const lifecycleStage = resolveLifecycleStage(clean);
  const confidence = getContextConfidence(clean);
  const relatedConceptIds = getRelatedConceptsForContext(conceptId);

  const recommendationContext = buildRecommendationContext(clean, {
    conceptId,
    sourceType,
  });

  if (!conceptId && confidence === "fallback" && !clean.pathname && !clean.calculatorPath) {
    const fallback = createFallbackIntelligenceContext({
      completedItems: history.completedItems,
      recentItems: history.recentItems,
      recentRoutes: history.recentRoutes,
      recommendationContext: {},
      metadata: {
        confidence: "fallback",
        resolvedBy,
        createdAt: new Date().toISOString(),
      },
    });
    return fallback;
  }

  return {
    source: resolveSourceDescriptor(clean, sourceType),
    primaryConceptId: conceptId,
    relatedConceptIds,
    userIntent,
    lifecycleStage,
    difficulty: clean.difficulty ?? null,
    completedItems: history.completedItems,
    recentItems: history.recentItems,
    recentRoutes: history.recentRoutes,
    recommendationContext,
    metadata: {
      confidence,
      resolvedBy,
      createdAt: new Date().toISOString(),
    },
  };
}

export {
  resolveConceptFromRoute,
  resolveSourceType,
  resolveUserIntent,
  resolveLifecycleStage,
  mergeContextHistory,
  sanitizeContextInput,
  getContextConfidence,
} from "./contextHelpers.js";

export {
  USER_INTENTS,
  LIFECYCLE_STAGES,
  CONTEXT_SOURCE_TYPES,
  createEmptyHistory,
} from "./contextTypes.js";
