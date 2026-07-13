/**
 * FOINWI Context Engine — route and signal resolution maps.
 * Deterministic only. No advice language. No browser APIs.
 */

import { FINANCIAL_CONCEPTS } from "../knowledge/financialConcepts.js";
import {
  CALCULATOR_CONCEPT_MAP,
  HEALTH_TOPIC_CONCEPTS,
  JOURNEY_CONCEPT_MAP as RECOMMENDATION_JOURNEY_MAP,
  LESSON_CONCEPT_MAP as RECOMMENDATION_LESSON_MAP,
} from "../recommendation/recommendationRules.js";

/** Context-engine learn slug → primary concept (Day 3 route rules) */
export const CONTEXT_LESSON_CONCEPT_MAP = {
  ...RECOMMENDATION_LESSON_MAP,
  "mutual-funds-sip": "mutual-funds",
};

/** Context-engine journey slug → primary concept (Day 3 route rules) */
export const CONTEXT_JOURNEY_CONCEPT_MAP = {
  ...RECOMMENDATION_JOURNEY_MAP,
  "build-wealth": "goal-planning",
};

/** Guide explore goal id → primary concept */
export const GUIDE_GOAL_CONCEPT_MAP = {
  "build-wealth": "sip",
  "buy-a-home": "debt",
  retirement: "retirement",
  "manage-debt": "debt",
  "family-planning": "emergency-fund",
  "taxes-salary": "tax",
};

/** Static page path → source type */
export const STATIC_ROUTE_SOURCE_MAP = {
  "/": "home",
  "/calculators": "calculators-hub",
  "/learn": "learn-hub",
  "/ai-tools": "guide",
  "/financial-health-score": "health-score",
  "/about": "about",
  "/privacy-policy": "legal",
  "/terms-and-conditions": "legal",
  "/disclaimer": "legal",
};

export { CALCULATOR_CONCEPT_MAP, HEALTH_TOPIC_CONCEPTS, FINANCIAL_CONCEPTS };

/**
 * Normalize a pathname: trim, drop query/hash, ensure leading slash, no trailing slash (except root).
 * @param {string} [pathname]
 * @returns {string}
 */
export function normalizePathname(pathname = "") {
  if (typeof pathname !== "string" || !pathname.trim()) return "";

  let path = pathname.trim();
  const queryIndex = path.indexOf("?");
  if (queryIndex >= 0) path = path.slice(0, queryIndex);
  const hashIndex = path.indexOf("#");
  if (hashIndex >= 0) path = path.slice(0, hashIndex);

  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  return path.toLowerCase();
}

/**
 * Parse known FOINWI route patterns into typed segments.
 * @param {string} pathname
 * @returns {{ kind: string, path: string, slug?: string, calculatorPath?: string }}
 */
export function parseRoute(pathname) {
  const path = normalizePathname(pathname);
  if (!path) return { kind: "empty", path: "" };

  if (STATIC_ROUTE_SOURCE_MAP[path]) {
    return { kind: STATIC_ROUTE_SOURCE_MAP[path], path };
  }

  if (CALCULATOR_CONCEPT_MAP[path]) {
    return { kind: "calculator", path, calculatorPath: path };
  }

  const learnMatch = path.match(/^\/learn\/([a-z0-9-]+)$/);
  if (learnMatch) {
    return { kind: "lesson", path, slug: learnMatch[1] };
  }

  const journeyMatch = path.match(/^\/journeys\/([a-z0-9-]+)$/);
  if (journeyMatch) {
    return { kind: "journey", path, slug: journeyMatch[1] };
  }

  return { kind: "unknown", path };
}

/**
 * Resolve primary concept id from a parsed route.
 * @param {{ kind: string, path: string, slug?: string, calculatorPath?: string }} route
 * @returns {string|null}
 */
export function resolveConceptFromParsedRoute(route) {
  if (!route) return null;

  if (route.kind === "calculator" && route.calculatorPath) {
    return CALCULATOR_CONCEPT_MAP[route.calculatorPath] ?? null;
  }

  if (route.kind === "lesson" && route.slug) {
    return CONTEXT_LESSON_CONCEPT_MAP[route.slug] ?? null;
  }

  if (route.kind === "journey" && route.slug) {
    return CONTEXT_JOURNEY_CONCEPT_MAP[route.slug] ?? null;
  }

  if (route.kind === "health-score") {
    return HEALTH_TOPIC_CONCEPTS.savings?.[0] ?? "emergency-fund";
  }

  if (route.kind === "guide" || route.kind === "home") {
    return "savings";
  }

  if (route.kind === "learn-hub") {
    return "savings";
  }

  if (route.kind === "calculators-hub") {
    return "goal-planning";
  }

  return null;
}

/**
 * Resolve source type string from a parsed route.
 * @param {{ kind: string }} route
 * @returns {string}
 */
export function resolveSourceTypeFromParsedRoute(route) {
  if (!route || route.kind === "empty") return "unknown";
  if (route.kind === "lesson") return "lesson";
  if (route.kind === "journey") return "journey";
  return route.kind;
}

/**
 * Resolve concept from guide goal id.
 * @param {string} [guideGoal]
 * @returns {string|null}
 */
export function resolveConceptFromGuideGoal(guideGoal) {
  if (!guideGoal) return null;
  return GUIDE_GOAL_CONCEPT_MAP[guideGoal] ?? null;
}

/**
 * Resolve concept from health topic.
 * @param {string} [healthTopic]
 * @returns {string|null}
 */
export function resolveConceptFromHealthTopic(healthTopic) {
  if (!healthTopic) return null;
  // Prefer topic maps so categories like "savings" resolve to action concepts
  if (HEALTH_TOPIC_CONCEPTS[healthTopic]?.[0]) {
    return HEALTH_TOPIC_CONCEPTS[healthTopic][0];
  }
  if (FINANCIAL_CONCEPTS[healthTopic]) return healthTopic;
  return null;
}
