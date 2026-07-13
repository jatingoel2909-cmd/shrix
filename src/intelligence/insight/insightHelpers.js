/**
 * FOINWI Daily Intelligence — selection, scoring, and recommendation helpers.
 * Deterministic only. No persistence. No browser APIs.
 */

import { buildIntelligenceContext } from "../context/contextEngine.js";
import { getConcept } from "../knowledge/knowledgeHelpers.js";
import { getRecommendations } from "../recommendation/recommendationEngine.js";
import { HEALTH_TOPIC_CONCEPTS } from "../recommendation/recommendationRules.js";
import { getAllDailyInsights, INSIGHT_BY_ID } from "./dailyInsights.js";
import { EDUCATIONAL_NOTICE } from "./insightTypes.js";

const DIFFICULTY_ORDER = { beginner: 1, intermediate: 2, advanced: 3 };

/**
 * Stable date key YYYY-MM-DD for deterministic rotation.
 * @param {string|Date|number} [date]
 * @returns {string}
 */
export function getDateKey(date) {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
    return date.trim();
  }

  const d = date instanceof Date ? date : date ? new Date(date) : new Date();
  if (Number.isNaN(d.getTime())) {
    const fallback = new Date();
    return fallback.toISOString().slice(0, 10);
  }

  // Use UTC date components for stability across environments
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Simple stable hash for date + seed strings.
 * @param {string} input
 * @returns {number}
 */
export function hashString(input = "") {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Normalize optional getDailyInsight inputs.
 * @param {Object} [options]
 * @returns {Object}
 */
export function normalizeInsightOptions(options = {}) {
  const raw = options && typeof options === "object" ? options : {};

  const difficulty =
    typeof raw.difficulty === "string" && DIFFICULTY_ORDER[raw.difficulty.toLowerCase()]
      ? raw.difficulty.toLowerCase()
      : undefined;

  const toList = (value) =>
    Array.isArray(value)
      ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
      : [];

  return {
    date: raw.date,
    pathname: typeof raw.pathname === "string" ? raw.pathname.trim() : undefined,
    conceptId: typeof raw.conceptId === "string" ? raw.conceptId.trim() : undefined,
    healthTopic: typeof raw.healthTopic === "string" ? raw.healthTopic.trim() : undefined,
    difficulty,
    completedItems: toList(raw.completedItems),
    recentItems: toList(raw.recentItems),
    recentRoutes: toList(raw.recentRoutes),
    excludeIds: toList(raw.excludeIds),
    sourceType: typeof raw.sourceType === "string" ? raw.sourceType.trim() : undefined,
    calculatorPath: typeof raw.calculatorPath === "string" ? raw.calculatorPath.trim() : undefined,
    lessonSlug: typeof raw.lessonSlug === "string" ? raw.lessonSlug.trim() : undefined,
    journeySlug: typeof raw.journeySlug === "string" ? raw.journeySlug.trim() : undefined,
  };
}

/**
 * Score an insight against resolved context signals.
 * @param {Object} insight
 * @param {Object} signals
 * @returns {{ score: number, reasons: string[] }}
 */
export function scoreInsightForContext(insight, signals = {}) {
  if (!insight) return { score: 0, reasons: [] };

  let score = 10; // base so every insight is selectable
  const reasons = [];

  if (signals.conceptId && insight.conceptId === signals.conceptId) {
    score += 100;
    reasons.push("direct-concept");
  }

  if (signals.relatedConceptIds?.includes(insight.conceptId)) {
    score += 40;
    reasons.push("related-concept");
  }

  if (signals.healthTopic) {
    const topicConcepts = HEALTH_TOPIC_CONCEPTS[signals.healthTopic] ?? [];
    if (topicConcepts.includes(insight.conceptId)) {
      score += 70;
      reasons.push("health-topic");
    }
    if (insight.category === "habits" && signals.healthTopic === "savings") {
      score += 15;
      reasons.push("health-habits");
    }
  }

  if (signals.lifecycleStage === "practice" && ["investing", "debt", "planning"].includes(insight.category)) {
    score += 12;
    reasons.push("lifecycle-practice");
  } else if (signals.lifecycleStage === "understand" && insight.difficulty === "beginner") {
    score += 10;
    reasons.push("lifecycle-understand");
  } else if (signals.lifecycleStage === "plan" && insight.category === "planning") {
    score += 14;
    reasons.push("lifecycle-plan");
  } else if (signals.lifecycleStage === "progress" && ["protection", "savings", "habits"].includes(insight.category)) {
    score += 16;
    reasons.push("lifecycle-progress");
  } else if (signals.lifecycleStage === "discover" && insight.category === "habits") {
    score += 20;
    reasons.push("lifecycle-discover");
  }

  if (signals.userIntent === "calculate" && insight.relatedCalculatorPaths?.length) {
    score += 8;
  } else if (signals.userIntent === "learn" && insight.relatedLessonSlugs?.length) {
    score += 8;
  } else if (signals.userIntent === "improve" && ["protection", "savings", "habits"].includes(insight.category)) {
    score += 10;
  } else if (signals.userIntent === "explore" && insight.category === "habits") {
    score += 12;
  }

  if (signals.difficulty && insight.difficulty) {
    const gap =
      (DIFFICULTY_ORDER[insight.difficulty] ?? 2) - (DIFFICULTY_ORDER[signals.difficulty] ?? 2);
    if (gap === 0) {
      score += 15;
      reasons.push("difficulty-match");
    } else if (Math.abs(gap) === 1) {
      score += 6;
    } else if (gap > 1) {
      score -= 12;
    }
  }

  const excluded = new Set([
    ...(signals.excludeIds ?? []),
    ...(signals.completedItems ?? []),
    ...(signals.recentItems ?? []),
  ]);

  if (excluded.has(insight.id)) {
    score -= 1000;
    reasons.push("excluded");
  }

  // Mild category diversity for general days
  if (!signals.conceptId && !signals.healthTopic && insight.category === "habits") {
    score += 5;
  }

  return { score: Math.round(score), reasons };
}

/**
 * Deterministic pick among candidates using date key.
 * @param {Object[]} candidates
 * @param {string} dateKey
 * @param {string} [seed]
 * @returns {Object|null}
 */
export function selectInsightForDate(candidates = [], dateKey, seed = "") {
  if (!candidates.length) return null;
  const key = getDateKey(dateKey);
  const index = hashString(`${key}|${seed}|${candidates.length}`) % candidates.length;
  return candidates[index];
}

/**
 * Remove recommendation links already listed on the insight itself.
 * @param {Object[]} items
 * @param {Object} insight
 * @returns {Object[]}
 */
export function deduplicateInsightLinks(items = [], insight) {
  if (!insight) return items;

  const blocked = new Set([
    ...(insight.relatedCalculatorPaths ?? []),
    ...(insight.relatedLessonSlugs ?? []).map((slug) => `/learn/${slug}`),
    ...(insight.relatedJourneySlugs ?? []).map((slug) => `/journeys/${slug}`),
    ...(insight.relatedMissionSlugs ?? []).map((slug) => `/journeys/${slug}`),
  ]);

  return items.filter((item) => {
    if (!item?.path) return true;
    if (blocked.has(item.path)) return false;
    return true;
  });
}

/**
 * Build compact related recommendations for a selected insight.
 * @param {Object} insight
 * @param {Object} [context]
 * @returns {Object}
 */
export function buildInsightRecommendations(insight, context = {}) {
  if (!insight) {
    return { lesson: null, calculator: null, journey: null, concept: null, items: [] };
  }

  const recContext = {
    ...(context.recommendationContext ?? {}),
    conceptId: insight.conceptId,
    sourceType: "insight",
    completedItems: context.completedItems ?? [],
    recentItems: context.recentItems ?? [],
  };

  const result = getRecommendations(recContext);
  const pool = deduplicateInsightLinks(
    [...result.primary, ...result.secondary, ...result.learning, ...result.tools, ...result.journeys],
    insight,
  );

  const pick = (predicate) => pool.find(predicate) ?? null;

  let lesson =
    pick((item) => item.type === "nextLesson" || item.type === "continueLearning") ?? null;
  let calculator = pick((item) => item.type === "nextCalculator") ?? null;
  let journey =
    pick((item) => item.type === "nextJourney" || item.type === "nextMission") ?? null;
  let concept = pick((item) => item.type === "relatedConcepts") ?? null;

  // Fallback to insight's own related links when recommendation pool is thin
  if (!lesson && insight.relatedLessonSlugs?.[0]) {
    lesson = {
      id: `lesson:${insight.relatedLessonSlugs[0]}`,
      type: "nextLesson",
      title: insight.relatedLessonSlugs[0].replace(/-/g, " "),
      description: "Related Learn Academy path.",
      path: `/learn/${insight.relatedLessonSlugs[0]}`,
      reason: "Linked from this educational insight.",
      priority: 50,
      conceptId: insight.conceptId,
      tags: ["learn"],
    };
  }

  if (!calculator && insight.relatedCalculatorPaths?.[0]) {
    calculator = {
      id: `calculator:${insight.relatedCalculatorPaths[0]}`,
      type: "nextCalculator",
      title: insight.relatedCalculatorPaths[0].replace(/\//g, "").replace(/-/g, " "),
      description: "Related educational calculator.",
      path: insight.relatedCalculatorPaths[0],
      reason: "Linked from this educational insight.",
      priority: 50,
      conceptId: insight.conceptId,
      tags: ["calculator"],
    };
  }

  if (!journey && insight.relatedJourneySlugs?.[0]) {
    journey = {
      id: `journey:${insight.relatedJourneySlugs[0]}`,
      type: "nextJourney",
      title: insight.relatedJourneySlugs[0].replace(/-/g, " "),
      description: "Related guided journey.",
      path: `/journeys/${insight.relatedJourneySlugs[0]}`,
      reason: "Linked from this educational insight.",
      priority: 50,
      conceptId: insight.conceptId,
      tags: ["journey"],
    };
  }

  if (!concept) {
    const relatedId = getConcept(insight.conceptId)?.relatedConcepts?.[0];
    const related = relatedId ? getConcept(relatedId) : null;
    if (related) {
      concept = {
        id: `concept:${related.id}`,
        type: "relatedConcepts",
        title: related.title,
        description: related.description,
        path: `/learn/${related.relatedLessons?.[0] ?? "money-basics"}`,
        reason: "A related concept that may deepen understanding.",
        priority: 50,
        conceptId: related.id,
        tags: related.tags ?? [],
      };
    }
  }

  const items = [lesson, calculator, journey, concept].filter(Boolean);

  return { lesson, calculator, journey, concept, items };
}

/**
 * Resolve intelligence context + selection signals from options.
 * @param {Object} options
 * @returns {{ clean: Object, intelligence: Object, signals: Object, dateKey: string }}
 */
export function resolveInsightSelectionState(options = {}) {
  const clean = normalizeInsightOptions(options);
  const dateKey = getDateKey(clean.date);

  const intelligence = buildIntelligenceContext({
    pathname: clean.pathname,
    conceptId: clean.conceptId,
    healthTopic: clean.healthTopic,
    difficulty: clean.difficulty,
    completedItems: clean.completedItems,
    recentItems: clean.recentItems,
    recentRoutes: clean.recentRoutes,
    sourceType: clean.sourceType,
    calculatorPath: clean.calculatorPath,
    lessonSlug: clean.lessonSlug,
    journeySlug: clean.journeySlug,
  });

  const signals = {
    conceptId: clean.conceptId || intelligence.primaryConceptId,
    relatedConceptIds: intelligence.relatedConceptIds ?? [],
    healthTopic: clean.healthTopic,
    lifecycleStage: intelligence.lifecycleStage,
    userIntent: intelligence.userIntent,
    difficulty: clean.difficulty || intelligence.difficulty,
    excludeIds: clean.excludeIds,
    completedItems: clean.completedItems,
    recentItems: clean.recentItems,
  };

  return { clean, intelligence, signals, dateKey };
}

/**
 * Core deterministic selection pipeline.
 * @param {Object} [options]
 * @returns {{ insight: Object, selectedBy: string[], confidence: string, dateKey: string, intelligence: Object }}
 */
export function selectDailyInsight(options = {}) {
  const { intelligence, signals, dateKey } = resolveInsightSelectionState(options);
  const catalog = getAllDailyInsights();

  const scored = catalog
    .map((insight) => {
      const { score, reasons } = scoreInsightForContext(insight, signals);
      return { insight, score, reasons };
    })
    .filter((entry) => entry.score > -500)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.insight.id.localeCompare(b.insight.id),
    );

  const topScore = scored[0]?.score ?? 0;
  const band = Math.max(20, Math.floor(topScore * 0.15));
  const topBand = scored.filter((entry) => entry.score >= topScore - band);

  const seedParts = [
    signals.conceptId ?? "",
    signals.healthTopic ?? "",
    intelligence.source?.type ?? "",
    intelligence.lifecycleStage ?? "",
  ].join("|");

  const selectedEntry =
    selectInsightForDate(topBand, dateKey, seedParts) ??
    selectInsightForDate(scored, dateKey, seedParts) ??
    scored[0];

  const fallback =
    catalog.find((insight) => insight.id === "insight-habits-review") ?? catalog[0];

  const chosen = selectedEntry?.insight ?? fallback;
  const selectedBy = selectedEntry?.reasons?.length
    ? selectedEntry.reasons
    : ["date-rotation", "fallback"];

  if (!selectedEntry?.reasons?.includes("direct-concept") && signals.conceptId) {
    // keep date-rotation visible when band selection used
    if (!selectedBy.includes("date-rotation")) selectedBy.push("date-rotation");
  } else if (!signals.conceptId && !signals.healthTopic) {
    if (!selectedBy.includes("date-rotation")) selectedBy.push("date-rotation");
  }

  let confidence = "medium";
  if (selectedBy.includes("direct-concept") || selectedBy.includes("health-topic")) {
    confidence = "high";
  } else if (selectedBy.includes("fallback") && !signals.conceptId) {
    confidence = scored.length ? "medium" : "fallback";
  } else if (intelligence.metadata?.confidence === "low" || intelligence.metadata?.confidence === "fallback") {
    confidence = "low";
  }

  return {
    insight: {
      ...chosen,
      educationalNotice: EDUCATIONAL_NOTICE,
    },
    selectedBy: [...new Set(selectedBy)],
    confidence,
    dateKey,
    intelligence,
  };
}

export function findInsightById(id) {
  if (!id) return null;
  return INSIGHT_BY_ID[id] ?? null;
}

export function findInsightsByConcept(conceptId) {
  if (!conceptId) return [];
  return getAllDailyInsights().filter((insight) => insight.conceptId === conceptId);
}

export function findInsightsByCategory(category) {
  if (!category) return [];
  return getAllDailyInsights().filter(
    (insight) => insight.category.toLowerCase() === String(category).toLowerCase(),
  );
}
