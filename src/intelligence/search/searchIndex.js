/**
 * FOINWI Search Engine — searchable entity index.
 * Built from Knowledge Graph + platform registries. No UI coupling.
 */

import { ALL_CALCULATORS } from "../../data/calculators.js";
import { EXPLORE_GOALS } from "../../data/foinwiGuide.js";
import { FINANCIAL_JOURNEYS } from "../../data/journeys.js";
import { LEARNING_PATHS } from "../../data/learnAcademy.js";
import { getAllConcepts } from "../knowledge/financialConcepts.js";
import { getAllDailyInsights } from "../insight/dailyInsights.js";
import {
  CALCULATOR_CONCEPT_MAP,
  HEALTH_TOPIC_CONCEPTS,
  JOURNEY_CONCEPT_MAP,
  LESSON_CONCEPT_MAP,
} from "../recommendation/recommendationRules.js";
import { GUIDE_GOAL_CONCEPT_MAP } from "../context/contextResolvers.js";
import { createSearchResult } from "./searchTypes.js";

/** Concept / topic synonym expansions for educational search */
export const SEARCH_SYNONYMS = {
  sip: [
    "systematic investment plan",
    "monthly investment",
    "mutual fund investment",
    "sip investment",
    "regular investing",
  ],
  emi: [
    "loan payment",
    "monthly instalment",
    "monthly installment",
    "repayment",
    "loan emi",
  ],
  retirement: [
    "pension",
    "old age planning",
    "retirement corpus",
    "retire",
    "post retirement",
  ],
  tax: [
    "income tax",
    "hra",
    "deductions",
    "tax saving",
    "tax planning",
    "80c",
  ],
  "emergency-fund": [
    "rainy day fund",
    "financial safety buffer",
    "emergency buffer",
    "contingency fund",
  ],
  debt: ["loan", "borrowing", "liability", "owe"],
  compounding: ["compound interest", "power of compounding", "compound growth"],
  inflation: ["rising prices", "cost of living", "purchasing power"],
  budgeting: ["budget", "expense tracking", "spend plan"],
  savings: ["save money", "saving habit", "set aside"],
  "mutual-funds": ["mutual fund", "mf", "equity fund", "debt fund"],
  "goal-planning": ["financial goal", "goal planner", "target corpus"],
  "home-loan": ["home loan", "housing loan", "house loan", "mortgage"],
  nps: ["national pension system", "pension scheme"],
  epf: ["provident fund", "employee provident fund", "pf"],
  ppf: ["public provident fund"],
};

const HEALTH_TOPIC_META = {
  savings: {
    title: "Savings Health",
    description: "Reflect on emergency buffers, budgeting habits, and saving consistency.",
    tags: ["savings", "emergency-fund", "budgeting"],
  },
  investments: {
    title: "Investments Health",
    description: "Reflect on SIP habits, mutual funds, compounding, and allocation basics.",
    tags: ["investments", "sip", "mutual-funds"],
  },
  protection: {
    title: "Protection Health",
    description: "Reflect on emergency funds, insurance coverage, and family protection.",
    tags: ["protection", "insurance", "emergency-fund"],
  },
  debt: {
    title: "Debt Health",
    description: "Reflect on EMI burden, credit habits, and repayment progress.",
    tags: ["debt", "emi", "credit-score"],
  },
  planning: {
    title: "Planning Health",
    description: "Reflect on goals, retirement readiness, tax awareness, and inflation.",
    tags: ["planning", "goals", "retirement", "tax"],
  },
};

function joinSearchText(parts = []) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function buildConceptEntries() {
  return getAllConcepts().map((concept) =>
    createSearchResult({
      id: `concept:${concept.id}`,
      type: "concept",
      title: concept.title,
      description: concept.description,
      path: `/learn/${concept.relatedLessons?.[0] ?? "money-basics"}`,
      conceptId: concept.id,
      category: concept.category,
      tags: concept.tags ?? [],
      difficulty: concept.difficulty,
      synonyms: SEARCH_SYNONYMS[concept.id] ?? [],
      searchText: joinSearchText([
        concept.title,
        concept.description,
        concept.id,
        ...(concept.tags ?? []),
        ...(SEARCH_SYNONYMS[concept.id] ?? []),
      ]),
      metadata: {
        learningOrder: concept.learningOrder,
        relatedCalculators: concept.relatedCalculators,
      },
    }),
  );
}

function buildCalculatorEntries() {
  return ALL_CALCULATORS.map((calc) => {
    const conceptId = CALCULATOR_CONCEPT_MAP[calc.path] ?? null;
    const synonymKey =
      calc.path.includes("home-loan") ? "home-loan" : conceptId;
    const synonyms = synonymKey ? SEARCH_SYNONYMS[synonymKey] ?? [] : [];

    return createSearchResult({
      id: `calculator:${calc.path}`,
      type: "calculator",
      title: calc.title,
      description: calc.desc,
      path: calc.path,
      conceptId: conceptId ?? undefined,
      category: "tools",
      tags: ["calculator", "tool", conceptId].filter(Boolean),
      synonyms,
      searchText: joinSearchText([
        calc.title,
        calc.desc,
        calc.path,
        conceptId,
        ...synonyms,
      ]),
      metadata: { icon: calc.icon },
    });
  });
}

function buildLearningEntries() {
  return LEARNING_PATHS.map((path) => {
    const conceptId = LESSON_CONCEPT_MAP[path.slug] ?? null;
    const synonyms = conceptId ? SEARCH_SYNONYMS[conceptId] ?? [] : [];
    const lessonTitles = (path.lessons ?? []).map((lesson) => lesson.title);

    return createSearchResult({
      id: `learning:${path.slug}`,
      type: "learning",
      title: path.title,
      description: path.description,
      path: `/learn/${path.slug}`,
      conceptId: conceptId ?? undefined,
      category: "learn",
      tags: ["learn", path.difficulty?.toLowerCase(), conceptId].filter(Boolean),
      difficulty: path.difficulty?.toLowerCase(),
      synonyms,
      searchText: joinSearchText([
        path.title,
        path.description,
        path.slug,
        ...lessonTitles,
        ...synonyms,
      ]),
      metadata: {
        duration: path.duration,
        lessonCount: path.lessons?.length ?? 0,
      },
    });
  });
}

function buildJourneyEntries() {
  return FINANCIAL_JOURNEYS.map((journey) => {
    const conceptId = JOURNEY_CONCEPT_MAP[journey.slug] ?? null;
    const synonyms = conceptId ? SEARCH_SYNONYMS[conceptId] ?? [] : [];
    const extra =
      journey.slug === "buy-dream-home" ? SEARCH_SYNONYMS["home-loan"] ?? [] : [];

    return createSearchResult({
      id: `journey:${journey.slug}`,
      type: "journey",
      title: journey.title,
      description: journey.description,
      path: `/journeys/${journey.slug}`,
      conceptId: conceptId ?? undefined,
      category: "journey",
      tags: ["journey", conceptId].filter(Boolean),
      synonyms: [...synonyms, ...extra],
      searchText: joinSearchText([
        journey.title,
        journey.description,
        journey.overview,
        journey.slug,
        ...synonyms,
        ...extra,
      ]),
      metadata: { duration: journey.duration, icon: journey.icon },
    });
  });
}

function buildMissionEntries() {
  // Missions share journey destinations; indexed separately for type filtering/grouping.
  return FINANCIAL_JOURNEYS.map((journey) => {
    const conceptId = JOURNEY_CONCEPT_MAP[journey.slug] ?? null;
    const synonyms = conceptId ? SEARCH_SYNONYMS[conceptId] ?? [] : [];
    const extra =
      journey.slug === "buy-dream-home" ? SEARCH_SYNONYMS["home-loan"] ?? [] : [];

    return createSearchResult({
      id: `mission:${journey.slug}`,
      type: "mission",
      title: `${journey.title} Mission`,
      description: journey.description,
      path: `/journeys/${journey.slug}`,
      conceptId: conceptId ?? undefined,
      category: "mission",
      tags: ["mission", conceptId].filter(Boolean),
      synonyms: [...synonyms, ...extra],
      searchText: joinSearchText([
        journey.title,
        "mission",
        journey.description,
        journey.slug,
        ...synonyms,
        ...extra,
      ]),
      metadata: { duration: journey.duration, icon: journey.icon },
    });
  });
}

function buildHealthEntries() {
  return Object.keys(HEALTH_TOPIC_CONCEPTS).map((topicId) => {
    const meta = HEALTH_TOPIC_META[topicId] ?? {
      title: topicId,
      description: `Educational health score topic: ${topicId}.`,
      tags: [topicId],
    };
    const primaryConcept = HEALTH_TOPIC_CONCEPTS[topicId]?.[0];
    const synonyms = primaryConcept ? SEARCH_SYNONYMS[primaryConcept] ?? [] : [];

    return createSearchResult({
      id: `health:${topicId}`,
      type: "health",
      title: meta.title,
      description: meta.description,
      path: "/financial-health-score",
      conceptId: primaryConcept,
      category: "health",
      tags: meta.tags,
      synonyms,
      searchText: joinSearchText([
        meta.title,
        meta.description,
        topicId,
        "health score",
        ...(meta.tags ?? []),
        ...synonyms,
      ]),
      metadata: { healthTopic: topicId, relatedConcepts: HEALTH_TOPIC_CONCEPTS[topicId] },
    });
  });
}

function buildGuideEntries() {
  return EXPLORE_GOALS.map((goal) => {
    const conceptId = GUIDE_GOAL_CONCEPT_MAP[goal.id] ?? null;
    const synonyms = conceptId ? SEARCH_SYNONYMS[conceptId] ?? [] : [];

    return createSearchResult({
      id: `guide:${goal.id}`,
      type: "guide",
      title: goal.title,
      description: goal.description,
      path: "/ai-tools",
      conceptId: conceptId ?? undefined,
      category: "guide",
      tags: ["guide", "explore", goal.id, conceptId].filter(Boolean),
      synonyms,
      searchText: joinSearchText([
        goal.title,
        goal.description,
        goal.id,
        goal.missionSlug,
        "foinwi guide",
        ...synonyms,
      ]),
      metadata: { guideGoal: goal.id, missionSlug: goal.missionSlug, icon: goal.icon },
    });
  });
}

function buildInsightEntries() {
  return getAllDailyInsights().map((insight) => {
    const synonyms = SEARCH_SYNONYMS[insight.conceptId] ?? [];
    const lessonPath = insight.relatedLessonSlugs?.[0]
      ? `/learn/${insight.relatedLessonSlugs[0]}`
      : "/learn";

    return createSearchResult({
      id: `insight:${insight.id}`,
      type: "insight",
      title: insight.title,
      description: insight.summary,
      path: lessonPath,
      conceptId: insight.conceptId,
      category: insight.category,
      tags: ["insight", "daily", ...(insight.tags ?? [])],
      difficulty: insight.difficulty,
      synonyms,
      searchText: joinSearchText([
        insight.title,
        insight.summary,
        insight.explanation,
        insight.conceptId,
        insight.category,
        ...(insight.tags ?? []),
        ...synonyms,
      ]),
      metadata: {
        readingTime: insight.readingTime,
        insightId: insight.id,
        relatedLessonSlugs: insight.relatedLessonSlugs,
      },
    });
  });
}

let cachedIndex = null;

/**
 * Build (or return cached) full search index.
 * @returns {import('./searchTypes.js').SearchResult[]}
 */
export function buildSearchIndex() {
  if (cachedIndex) return cachedIndex;

  cachedIndex = [
    ...buildConceptEntries(),
    ...buildCalculatorEntries(),
    ...buildLearningEntries(),
    ...buildJourneyEntries(),
    ...buildMissionEntries(),
    ...buildHealthEntries(),
    ...buildGuideEntries(),
    ...buildInsightEntries(),
  ];

  return cachedIndex;
}

/**
 * Count indexed entities by type.
 * @returns {Record<string, number>}
 */
export function getSearchIndexCounts() {
  const index = buildSearchIndex();
  return index.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    acc.total = (acc.total ?? 0) + 1;
    return acc;
  }, {});
}

/**
 * Reset cache — useful for tests.
 */
export function resetSearchIndexCache() {
  cachedIndex = null;
}

export { SEARCH_SYNONYMS as SYNONYM_MAP };
