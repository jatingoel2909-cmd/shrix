/**
 * FOINWI Search Engine — main API.
 * Educational discovery across concepts, tools, learning, journeys, and guide.
 * No AI APIs. No browser APIs. No UI coupling.
 */

import {
  buildSearchSuggestions,
  deduplicateSearchResults,
  expandSynonyms,
  filterSearchIndex,
  getDefaultIndex,
  groupSearchResults,
  highlightMatch,
  normalizeSearchQuery,
  resolveSearchContextBoost,
  scoreSearchResult,
} from "./searchHelpers.js";
import {
  STRONG_MATCH_THRESHOLD,
  createEmptySearchResponse,
  toPublicSearchResult,
} from "./searchTypes.js";

function computeConfidence(results, query) {
  if (!normalizeSearchQuery(query)) return "fallback";
  if (!results.length) return "fallback";
  if (results[0].score >= 90) return "high";
  if (results[0].score >= STRONG_MATCH_THRESHOLD) return "medium";
  return "low";
}

/**
 * Search FOINWI educational content.
 * @param {string|Object} queryOrOptions - query string or options object with query field
 * @param {import('./searchTypes.js').SearchOptions} [options]
 * @returns {Object}
 */
export function searchFOINWI(queryOrOptions = "", options = {}) {
  const opts =
    typeof queryOrOptions === "object" && queryOrOptions !== null
      ? { ...queryOrOptions, ...options }
      : { ...options, query: queryOrOptions };

  const query = typeof opts.query === "string" ? opts.query : "";
  const normalized = normalizeSearchQuery(query);
  const limit = Math.min(Math.max(Number(opts.limit) || 20, 1), 50);

  if (!normalized) {
    const empty = createEmptySearchResponse(query);
    empty.suggestions = buildSearchSuggestions("", [], {});
    return empty;
  }

  const queryInfo = expandSynonyms(normalized);
  const boost = resolveSearchContextBoost(opts.context);
  if (opts.recentItems) {
    boost.recentItems = [...boost.recentItems, ...opts.recentItems];
  }

  const index = filterSearchIndex(getDefaultIndex(), {
    types: opts.types,
    category: opts.category,
    difficulty: opts.difficulty,
  });

  const scored = index
    .map((item) => {
      const { score, matchedOn } = scoreSearchResult(item, queryInfo, boost);
      if (score <= 0) return null;

      return {
        ...item,
        score,
        matchedOn,
        highlight: highlightMatch(item.title, normalized),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const deduped = deduplicateSearchResults(scored);
  const limited = deduped.slice(0, limit);
  const publicResults = limited.map(toPublicSearchResult);
  const groupedResults = groupSearchResults(limited);
  const suggestions = buildSearchSuggestions(normalized, limited, {
    synonymHits: queryInfo.synonymHits,
    primaryConceptId: boost.primaryConceptId,
  });

  return {
    query,
    results: publicResults,
    groupedResults,
    suggestions,
    metadata: {
      total: publicResults.length,
      confidence: computeConfidence(publicResults, query),
      generatedAt: new Date().toISOString(),
      synonymHits: queryInfo.synonymHits,
      contextConceptId: boost.primaryConceptId,
    },
  };
}

export {
  normalizeSearchQuery,
  tokenizeQuery,
  expandSynonyms,
  scoreSearchResult,
  groupSearchResults,
  deduplicateSearchResults,
  buildSearchSuggestions,
  highlightMatch,
} from "./searchHelpers.js";

export { buildSearchIndex, getSearchIndexCounts, resetSearchIndexCache } from "./searchIndex.js";

export { SEARCH_RESULT_TYPES, SEARCH_GROUP_KEYS, STRONG_MATCH_THRESHOLD } from "./searchTypes.js";
