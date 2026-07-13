/**
 * FOINWI Recommendation Engine — type definitions and item factory.
 */

export const RECOMMENDATION_TYPES = [
  "nextLesson",
  "nextCalculator",
  "nextJourney",
  "nextMission",
  "nextHealthAction",
  "relatedConcepts",
  "dailyInsight",
  "continueLearning",
];

export const SOURCE_TYPES = [
  "calculator",
  "lesson",
  "journey",
  "mission",
  "health-score",
  "concept",
  "guide",
  "unknown",
];

export const DIFFICULTY_ORDER = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/**
 * @typedef {Object} RecommendationContext
 * @property {string} [sourceType]
 * @property {string} [sourceId]
 * @property {string} [conceptId]
 * @property {string} [calculatorPath]
 * @property {string} [lessonSlug]
 * @property {string} [journeySlug]
 * @property {string} [missionSlug]
 * @property {string} [healthTopic]
 * @property {string} [difficulty]
 * @property {string[]} [completedItems]
 * @property {string[]} [recentItems]
 */

/**
 * @typedef {Object} RecommendationItem
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} path
 * @property {string} reason
 * @property {number} priority
 * @property {string} [conceptId]
 * @property {string[]} [tags]
 * @property {number} [score] - internal ranking score
 */

/**
 * @typedef {Object} RecommendationResult
 * @property {RecommendationItem[]} primary
 * @property {RecommendationItem[]} secondary
 * @property {RecommendationItem[]} learning
 * @property {RecommendationItem[]} tools
 * @property {RecommendationItem[]} journeys
 * @property {RecommendationItem[]} health
 * @property {RecommendationItem[]} insights
 * @property {Object} metadata
 */

export function createRecommendationItem({
  id,
  type,
  title,
  description,
  path,
  reason,
  priority = 50,
  conceptId,
  tags = [],
  score,
  difficulty,
}) {
  return {
    id,
    type,
    title,
    description,
    reason,
    path: path ?? "",
    priority: Math.min(100, Math.max(0, Math.round(priority))),
    conceptId: conceptId ?? undefined,
    tags,
    score: score ?? priority,
    difficulty,
  };
}

export function createEmptyResult(metadata = {}) {
  return {
    primary: [],
    secondary: [],
    learning: [],
    tools: [],
    journeys: [],
    health: [],
    insights: [],
    metadata,
  };
}
