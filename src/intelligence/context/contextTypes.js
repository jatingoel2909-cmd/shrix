/**
 * FOINWI Context Engine — type definitions and factories.
 * Educational context only. No personal profiling or persistence.
 */

export const USER_INTENTS = [
  "learn",
  "calculate",
  "improve",
  "explore",
  "plan",
  "compare",
  "continue",
];

export const LIFECYCLE_STAGES = [
  "discover",
  "understand",
  "practice",
  "plan",
  "progress",
  "continue",
];

export const CONTEXT_SOURCE_TYPES = [
  "home",
  "calculator",
  "lesson",
  "learn-hub",
  "journey",
  "mission",
  "health-score",
  "guide",
  "calculators-hub",
  "about",
  "legal",
  "concept",
  "unknown",
];

export const DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"];

/**
 * @typedef {Object} ContextInput
 * @property {string} [pathname]
 * @property {string} [sourceType]
 * @property {string} [sourceId]
 * @property {string} [calculatorPath]
 * @property {string} [lessonSlug]
 * @property {string} [journeySlug]
 * @property {string} [missionSlug]
 * @property {string} [healthTopic]
 * @property {string} [guideGoal]
 * @property {string} [difficulty]
 * @property {string[]} [completedItems]
 * @property {string[]} [recentItems]
 * @property {string[]} [recentRoutes]
 * @property {string[]} [recentConcepts]
 */

/**
 * @typedef {Object} IntelligenceContext
 * @property {{ type: string, id: string|null, path: string }} source
 * @property {string|null} primaryConceptId
 * @property {string[]} relatedConceptIds
 * @property {string} userIntent
 * @property {string} lifecycleStage
 * @property {string|null} difficulty
 * @property {string[]} completedItems
 * @property {string[]} recentItems
 * @property {string[]} recentRoutes
 * @property {Object} recommendationContext
 * @property {Object} metadata
 */

export function createEmptyHistory() {
  return {
    recentRoutes: [],
    recentItems: [],
    completedItems: [],
    recentConcepts: [],
  };
}

export function createFallbackIntelligenceContext(overrides = {}) {
  return {
    source: {
      type: "unknown",
      id: null,
      path: "/",
    },
    primaryConceptId: null,
    relatedConceptIds: [],
    userIntent: "explore",
    lifecycleStage: "discover",
    difficulty: null,
    completedItems: [],
    recentItems: [],
    recentRoutes: [],
    recommendationContext: {},
    metadata: {
      confidence: "fallback",
      resolvedBy: ["fallback"],
      createdAt: new Date().toISOString(),
    },
    ...overrides,
  };
}
