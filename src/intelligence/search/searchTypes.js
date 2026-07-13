/**
 * FOINWI Search Engine — types, factories, and constants.
 * Educational discovery only. No advice language. No AI APIs.
 */

export const SEARCH_RESULT_TYPES = [
  "concept",
  "calculator",
  "learning",
  "journey",
  "mission",
  "health",
  "guide",
  "insight",
];

export const SEARCH_GROUP_KEYS = [
  "concepts",
  "calculators",
  "learning",
  "journeys",
  "missions",
  "health",
  "guide",
  "insights",
];

export const TYPE_TO_GROUP = {
  concept: "concepts",
  calculator: "calculators",
  learning: "learning",
  journey: "journeys",
  mission: "missions",
  health: "health",
  guide: "guide",
  insight: "insights",
};

/** Minimum score treated as a “strong” match for suggestion logic */
export const STRONG_MATCH_THRESHOLD = 55;

/**
 * @typedef {Object} SearchResult
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} path
 * @property {string} [conceptId]
 * @property {string} [category]
 * @property {string[]} tags
 * @property {number} score
 * @property {string[]} matchedOn
 * @property {string} highlight
 * @property {Object} metadata
 */

/**
 * @typedef {Object} SearchOptions
 * @property {string} [query]
 * @property {number} [limit]
 * @property {string[]} [types]
 * @property {string} [category]
 * @property {string} [difficulty]
 * @property {Object} [context]
 * @property {string[]} [recentItems]
 */

export function createEmptyGroupedResults() {
  return {
    concepts: [],
    calculators: [],
    learning: [],
    journeys: [],
    missions: [],
    health: [],
    guide: [],
    insights: [],
  };
}

export function createEmptySearchResponse(query = "") {
  return {
    query,
    results: [],
    groupedResults: createEmptyGroupedResults(),
    suggestions: [],
    metadata: {
      total: 0,
      confidence: "fallback",
      generatedAt: new Date().toISOString(),
    },
  };
}

export function createSearchResult({
  id,
  type,
  title,
  description,
  path,
  conceptId,
  category,
  tags = [],
  score = 0,
  matchedOn = [],
  highlight = "",
  metadata = {},
  difficulty,
  searchText,
  synonyms = [],
}) {
  return {
    id,
    type,
    title,
    description: description ?? "",
    path: path ?? "",
    conceptId: conceptId ?? undefined,
    category: category ?? undefined,
    tags,
    score,
    matchedOn,
    highlight: highlight || title,
    metadata,
    // Internal fields used while scoring; stripped from public API
    difficulty,
    searchText,
    synonyms,
  };
}

export function toPublicSearchResult(item) {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    path: item.path,
    conceptId: item.conceptId,
    category: item.category,
    tags: item.tags ?? [],
    score: item.score ?? 0,
    matchedOn: item.matchedOn ?? [],
    highlight: item.highlight || item.title,
    metadata: item.metadata ?? {},
  };
}
