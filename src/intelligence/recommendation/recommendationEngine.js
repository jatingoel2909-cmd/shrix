/**
 * FOINWI Recommendation Engine — main API.
 * Educational guidance only. No product or provider recommendations.
 */

import { getRecommendationsInternal } from "./recommendationHelpers.js";

function sanitizeItem(item) {
  // eslint-disable-next-line no-unused-vars -- strip internal ranking fields from public API
  const { score, difficulty, ...publicItem } = item;
  return publicItem;
}

function sanitizeResult(result) {
  const sanitizeList = (items) => items.map(sanitizeItem);

  return {
    primary: sanitizeList(result.primary),
    secondary: sanitizeList(result.secondary),
    learning: sanitizeList(result.learning),
    tools: sanitizeList(result.tools),
    journeys: sanitizeList(result.journeys),
    health: sanitizeList(result.health),
    insights: sanitizeList(result.insights),
    metadata: result.metadata,
  };
}

/**
 * Generate ranked recommendations from optional context.
 * @param {import('./recommendationTypes.js').RecommendationContext} [context]
 * @param {{ limit?: number }} [options]
 * @returns {import('./recommendationTypes.js').RecommendationResult}
 */
export function getRecommendations(context = {}, options = {}) {
  const result = getRecommendationsInternal(context, options);
  return sanitizeResult(result);
}

export {
  getPrimaryRecommendation,
  getLearningRecommendations,
  getToolRecommendations,
  getJourneyRecommendations,
  getHealthRecommendations,
  deduplicateRecommendations,
  rankRecommendations,
} from "./recommendationHelpers.js";

export { RECOMMENDATION_TYPES, SOURCE_TYPES, createRecommendationItem, createEmptyResult } from "./recommendationTypes.js";
