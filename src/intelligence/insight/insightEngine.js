/**
 * FOINWI Daily Intelligence Engine — main API.
 * Deterministic educational insights. No AI. No persistence.
 */

import {
  buildInsightRecommendations,
  findInsightById,
  findInsightsByCategory,
  findInsightsByConcept,
  getDateKey,
  selectDailyInsight,
} from "./insightHelpers.js";
import { createEmptyInsightResult } from "./insightTypes.js";

/**
 * Get today's (or a given date's) contextual daily insight.
 * @param {Object} [options]
 * @returns {Object}
 */
export function getDailyInsight(options = {}) {
  const selection = selectDailyInsight(options);
  if (!selection.insight) {
    return createEmptyInsightResult({
      dateKey: getDateKey(options.date),
      selectedBy: ["fallback"],
      confidence: "fallback",
    });
  }

  const relatedRecommendations = buildInsightRecommendations(
    selection.insight,
    selection.intelligence,
  );

  // Public context: omit raw recommendationContext bulk if empty; keep safe fields
  const publicContext = {
    source: selection.intelligence.source,
    primaryConceptId: selection.intelligence.primaryConceptId,
    userIntent: selection.intelligence.userIntent,
    lifecycleStage: selection.intelligence.lifecycleStage,
    difficulty: selection.intelligence.difficulty,
    metadata: {
      confidence: selection.intelligence.metadata?.confidence,
      resolvedBy: selection.intelligence.metadata?.resolvedBy,
    },
  };

  return {
    insight: selection.insight,
    relatedRecommendations,
    context: publicContext,
    metadata: {
      selectedBy: selection.selectedBy,
      dateKey: selection.dateKey,
      confidence: selection.confidence,
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * @param {string} id
 * @returns {Object|null}
 */
export function getInsightById(id) {
  return findInsightById(id);
}

/**
 * @param {string} conceptId
 * @returns {Object[]}
 */
export function getInsightsByConcept(conceptId) {
  return findInsightsByConcept(conceptId);
}

/**
 * @param {string} category
 * @returns {Object[]}
 */
export function getInsightsByCategory(category) {
  return findInsightsByCategory(category);
}

/**
 * Insight selection from a raw or built context object.
 * @param {Object} context
 * @returns {Object}
 */
export function getContextualInsight(context = {}) {
  if (!context || typeof context !== "object") {
    return getDailyInsight({});
  }

  // Accept intelligence context or loose signals
  return getDailyInsight({
    pathname: context.source?.path ?? context.pathname,
    conceptId: context.primaryConceptId ?? context.conceptId,
    healthTopic: context.healthTopic ?? context.recommendationContext?.healthTopic,
    difficulty: context.difficulty,
    completedItems: context.completedItems,
    recentItems: context.recentItems,
    recentRoutes: context.recentRoutes,
    sourceType: context.source?.type ?? context.sourceType,
    calculatorPath: context.recommendationContext?.calculatorPath ?? context.calculatorPath,
    lessonSlug: context.recommendationContext?.lessonSlug ?? context.lessonSlug,
    journeySlug: context.recommendationContext?.journeySlug ?? context.journeySlug,
    date: context.date,
    excludeIds: context.excludeIds,
  });
}

/**
 * Explicit date-based rotation with optional context filters.
 * @param {string|Date} date
 * @param {Object} [options]
 * @returns {Object}
 */
export function getRotatingDailyInsight(date, options = {}) {
  return getDailyInsight({ ...options, date });
}

export {
  getDateKey,
  selectInsightForDate,
  scoreInsightForContext,
  deduplicateInsightLinks,
  buildInsightRecommendations,
  normalizeInsightOptions,
} from "./insightHelpers.js";

export { getAllDailyInsights, getInsightCatalogCount } from "./dailyInsights.js";

export { EDUCATIONAL_NOTICE, INSIGHT_CATEGORIES, INSIGHT_DIFFICULTIES } from "./insightTypes.js";
