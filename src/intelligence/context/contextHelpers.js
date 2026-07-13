/**
 * FOINWI Context Engine — helpers for sanitization, intent, lifecycle, history.
 * Deterministic rules only. No browser APIs. No persistence.
 */

import { getRelatedConceptIds } from "../recommendation/recommendationRules.js";
import {
  CALCULATOR_CONCEPT_MAP,
  CONTEXT_JOURNEY_CONCEPT_MAP,
  CONTEXT_LESSON_CONCEPT_MAP,
  FINANCIAL_CONCEPTS,
  normalizePathname,
  parseRoute,
  resolveConceptFromGuideGoal,
  resolveConceptFromHealthTopic,
  resolveConceptFromParsedRoute,
  resolveSourceTypeFromParsedRoute,
} from "./contextResolvers.js";
import {
  DIFFICULTY_LEVELS,
  LIFECYCLE_STAGES,
  USER_INTENTS,
} from "./contextTypes.js";

const COMPARE_CALCULATOR_PATHS = new Set([
  "/income-tax-calculator",
  "/loan-prepayment-calculator",
  "/cagr-calculator",
  "/home-loan-eligibility-calculator",
]);

const MAX_HISTORY = 12;

function uniqueStrings(values = []) {
  const seen = new Set();
  const result = [];
  values.forEach((value) => {
    if (typeof value !== "string") return;
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    result.push(trimmed);
  });
  return result;
}

function clampHistory(values = [], limit = MAX_HISTORY) {
  return uniqueStrings(values).slice(0, limit);
}

/**
 * Strip unsafe / unexpected fields from raw input.
 * @param {import('./contextTypes.js').ContextInput} [input]
 * @returns {import('./contextTypes.js').ContextInput}
 */
export function sanitizeContextInput(input = {}) {
  const raw = input && typeof input === "object" ? input : {};

  const difficulty =
    typeof raw.difficulty === "string" && DIFFICULTY_LEVELS.includes(raw.difficulty.toLowerCase())
      ? raw.difficulty.toLowerCase()
      : undefined;

  return {
    pathname: typeof raw.pathname === "string" ? normalizePathname(raw.pathname) : undefined,
    sourceType: typeof raw.sourceType === "string" ? raw.sourceType.trim() : undefined,
    sourceId: typeof raw.sourceId === "string" ? raw.sourceId.trim() : undefined,
    calculatorPath:
      typeof raw.calculatorPath === "string" ? normalizePathname(raw.calculatorPath) : undefined,
    lessonSlug: typeof raw.lessonSlug === "string" ? raw.lessonSlug.trim() : undefined,
    journeySlug: typeof raw.journeySlug === "string" ? raw.journeySlug.trim() : undefined,
    missionSlug: typeof raw.missionSlug === "string" ? raw.missionSlug.trim() : undefined,
    healthTopic: typeof raw.healthTopic === "string" ? raw.healthTopic.trim() : undefined,
    guideGoal: typeof raw.guideGoal === "string" ? raw.guideGoal.trim() : undefined,
    difficulty,
    completedItems: clampHistory(raw.completedItems),
    recentItems: clampHistory(raw.recentItems),
    recentRoutes: clampHistory(raw.recentRoutes).map(normalizePathname).filter(Boolean),
    recentConcepts: clampHistory(raw.recentConcepts).filter((id) => FINANCIAL_CONCEPTS[id]),
  };
}

/**
 * Resolve primary concept id from a pathname.
 * @param {string} pathname
 * @returns {string|null}
 */
export function resolveConceptFromRoute(pathname) {
  const route = parseRoute(pathname);
  return resolveConceptFromParsedRoute(route);
}

/**
 * Resolve source type from a pathname.
 * @param {string} pathname
 * @returns {string}
 */
export function resolveSourceType(pathname) {
  return resolveSourceTypeFromParsedRoute(parseRoute(pathname));
}

/**
 * Infer user intent from sanitized context input.
 * @param {import('./contextTypes.js').ContextInput} input
 * @returns {string}
 */
export function resolveUserIntent(input = {}) {
  const clean = sanitizeContextInput(input);
  const route = parseRoute(clean.pathname || clean.calculatorPath || "");
  const recentRoutes = clean.recentRoutes ?? [];
  const currentPath = clean.pathname || clean.calculatorPath || route.path;

  if (currentPath && recentRoutes.includes(currentPath)) {
    return "continue";
  }

  if (clean.healthTopic || route.kind === "health-score") {
    return "improve";
  }

  if (clean.journeySlug || clean.missionSlug || route.kind === "journey") {
    return "plan";
  }

  if (clean.calculatorPath || route.kind === "calculator") {
    const calcPath = clean.calculatorPath || route.calculatorPath;
    if (COMPARE_CALCULATOR_PATHS.has(calcPath)) return "compare";
    return "calculate";
  }

  if (clean.lessonSlug || route.kind === "lesson" || route.kind === "learn-hub") {
    return "learn";
  }

  if (clean.guideGoal || route.kind === "guide" || route.kind === "home") {
    return "explore";
  }

  if (route.kind === "calculators-hub") {
    return "explore";
  }

  return "explore";
}

/**
 * Infer lifecycle stage from sanitized context input.
 * @param {import('./contextTypes.js').ContextInput} input
 * @returns {string}
 */
export function resolveLifecycleStage(input = {}) {
  const clean = sanitizeContextInput(input);
  const route = parseRoute(clean.pathname || clean.calculatorPath || "");
  const recentRoutes = clean.recentRoutes ?? [];
  const currentPath = clean.pathname || clean.calculatorPath || route.path;

  if (currentPath && recentRoutes.includes(currentPath)) {
    return "continue";
  }

  if (clean.healthTopic || route.kind === "health-score") {
    return "progress";
  }

  if (clean.journeySlug || clean.missionSlug || route.kind === "journey") {
    return "plan";
  }

  if (clean.calculatorPath || route.kind === "calculator") {
    return "practice";
  }

  if (clean.lessonSlug || route.kind === "lesson") {
    return "understand";
  }

  if (
    route.kind === "home" ||
    route.kind === "guide" ||
    route.kind === "learn-hub" ||
    route.kind === "calculators-hub" ||
    clean.guideGoal
  ) {
    return "discover";
  }

  return "discover";
}

/**
 * Merge current context history with prior history (in-memory only).
 * @param {Object} current
 * @param {Object} history
 * @returns {{ recentRoutes: string[], recentItems: string[], completedItems: string[], recentConcepts: string[] }}
 */
export function mergeContextHistory(current = {}, history = {}) {
  const currentClean = sanitizeContextInput(current);
  const historyClean = {
    recentRoutes: clampHistory(history.recentRoutes).map(normalizePathname).filter(Boolean),
    recentItems: clampHistory(history.recentItems),
    completedItems: clampHistory(history.completedItems),
    recentConcepts: clampHistory(history.recentConcepts).filter((id) => FINANCIAL_CONCEPTS[id]),
  };

  const currentPath = currentClean.pathname || currentClean.calculatorPath;
  const mergedRoutes = clampHistory([
    ...(currentPath ? [currentPath] : []),
    ...historyClean.recentRoutes,
    ...currentClean.recentRoutes,
  ]);

  return {
    recentRoutes: mergedRoutes,
    recentItems: clampHistory([...currentClean.recentItems, ...historyClean.recentItems]),
    completedItems: clampHistory([
      ...currentClean.completedItems,
      ...historyClean.completedItems,
    ]),
    recentConcepts: clampHistory([
      ...currentClean.recentConcepts,
      ...historyClean.recentConcepts,
    ]),
  };
}

/**
 * Confidence based on how strongly signals resolve to a concept.
 * @param {import('./contextTypes.js').ContextInput} input
 * @returns {"high"|"medium"|"low"|"fallback"}
 */
export function getContextConfidence(input = {}) {
  const clean = sanitizeContextInput(input);
  const route = parseRoute(clean.pathname || clean.calculatorPath || "");
  const { conceptId, resolvedBy } = resolvePrimaryConcept(clean);

  if (!conceptId) {
    if (clean.pathname || clean.sourceType || clean.sourceId) return "low";
    return "fallback";
  }

  const strong = new Set([
    "calculatorPath",
    "lessonSlug",
    "journeySlug",
    "missionSlug",
    "healthTopic",
    "pathname",
  ]);

  if (resolvedBy.some((key) => strong.has(key))) {
    const knownRoute =
      route.kind !== "unknown" &&
      route.kind !== "empty" &&
      route.kind !== "legal" &&
      route.kind !== "about";
    return knownRoute || clean.calculatorPath || clean.lessonSlug || clean.healthTopic
      ? "high"
      : "medium";
  }

  if (resolvedBy.includes("guideGoal") || resolvedBy.includes("sourceId")) return "medium";
  if (resolvedBy.includes("recentConcepts")) return "low";
  return "low";
}

/**
 * Resolve primary concept using precedence across all input signals.
 * @param {import('./contextTypes.js').ContextInput} input
 * @returns {{ conceptId: string|null, resolvedBy: string[] }}
 */
export function resolvePrimaryConcept(input = {}) {
  const clean = sanitizeContextInput(input);
  const resolvedBy = [];

  if (clean.sourceId && FINANCIAL_CONCEPTS[clean.sourceId] && clean.sourceType === "concept") {
    resolvedBy.push("sourceId");
    return { conceptId: clean.sourceId, resolvedBy };
  }

  if (clean.calculatorPath && CALCULATOR_CONCEPT_MAP[clean.calculatorPath]) {
    resolvedBy.push("calculatorPath");
    return { conceptId: CALCULATOR_CONCEPT_MAP[clean.calculatorPath], resolvedBy };
  }

  if (clean.lessonSlug && CONTEXT_LESSON_CONCEPT_MAP[clean.lessonSlug]) {
    resolvedBy.push("lessonSlug");
    return { conceptId: CONTEXT_LESSON_CONCEPT_MAP[clean.lessonSlug], resolvedBy };
  }

  if (clean.journeySlug && CONTEXT_JOURNEY_CONCEPT_MAP[clean.journeySlug]) {
    resolvedBy.push("journeySlug");
    return { conceptId: CONTEXT_JOURNEY_CONCEPT_MAP[clean.journeySlug], resolvedBy };
  }

  if (clean.missionSlug && CONTEXT_JOURNEY_CONCEPT_MAP[clean.missionSlug]) {
    resolvedBy.push("missionSlug");
    return { conceptId: CONTEXT_JOURNEY_CONCEPT_MAP[clean.missionSlug], resolvedBy };
  }

  const healthConcept = resolveConceptFromHealthTopic(clean.healthTopic);
  if (healthConcept) {
    resolvedBy.push("healthTopic");
    return { conceptId: healthConcept, resolvedBy };
  }

  const guideConcept = resolveConceptFromGuideGoal(clean.guideGoal);
  if (guideConcept) {
    resolvedBy.push("guideGoal");
    return { conceptId: guideConcept, resolvedBy };
  }

  if (clean.pathname) {
    const fromRoute = resolveConceptFromRoute(clean.pathname);
    if (fromRoute) {
      resolvedBy.push("pathname");
      return { conceptId: fromRoute, resolvedBy };
    }
  }

  if (clean.recentConcepts?.[0]) {
    resolvedBy.push("recentConcepts");
    return { conceptId: clean.recentConcepts[0], resolvedBy };
  }

  resolvedBy.push("fallback");
  return { conceptId: null, resolvedBy };
}

/**
 * Build recommendationContext payload for getRecommendations().
 * @param {import('./contextTypes.js').ContextInput} input
 * @param {{ conceptId: string|null, sourceType: string }} resolved
 * @returns {Object}
 */
export function buildRecommendationContext(input, resolved) {
  const clean = sanitizeContextInput(input);
  const route = parseRoute(clean.pathname || clean.calculatorPath || "");

  const calculatorPath =
    clean.calculatorPath ||
    (route.kind === "calculator" ? route.calculatorPath : undefined);

  const lessonSlug =
    clean.lessonSlug || (route.kind === "lesson" ? route.slug : undefined);

  const journeySlug =
    clean.journeySlug || (route.kind === "journey" ? route.slug : undefined);

  const missionSlug = clean.missionSlug;

  return {
    sourceType: resolved.sourceType,
    sourceId: clean.sourceId,
    conceptId: resolved.conceptId ?? undefined,
    calculatorPath,
    lessonSlug,
    journeySlug,
    missionSlug,
    healthTopic: clean.healthTopic,
    difficulty: clean.difficulty,
    completedItems: clean.completedItems,
    recentItems: clean.recentItems,
  };
}

export function getRelatedConceptsForContext(conceptId) {
  if (!conceptId) return [];
  return getRelatedConceptIds(conceptId, 1);
}

export { USER_INTENTS, LIFECYCLE_STAGES, DIFFICULTY_LEVELS };
