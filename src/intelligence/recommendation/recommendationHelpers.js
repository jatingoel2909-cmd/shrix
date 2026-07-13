/**
 * FOINWI Recommendation Engine — ranking, deduplication, and category accessors.
 */

import { ALL_CALCULATORS } from "../../data/calculators.js";
import { FINANCIAL_JOURNEYS } from "../../data/journeys.js";
import { getLearningPathBySlug } from "../../data/learnAcademy.js";
import {
  getConcept,
  getConceptsByHealthTopic,
  getRelatedConcepts,
  getRelatedCalculators,
  getRelatedJourneys,
  getRelatedLessons,
} from "../knowledge/knowledgeHelpers.js";
import {
  buildDailyInsightRecommendation,
  FALLBACK_RECOMMENDATIONS,
  getConceptRuleBoosts,
  getHealthTopicConceptIds,
  getRelatedConceptIds,
  resolveContextConceptId,
  resolveSourceType,
} from "./recommendationRules.js";
import {
  createRecommendationItem,
  DIFFICULTY_ORDER,
} from "./recommendationTypes.js";

const TOOL_TYPES = new Set(["nextCalculator"]);
const LEARNING_TYPES = new Set(["nextLesson", "continueLearning", "relatedConcepts"]);
const JOURNEY_TYPES = new Set(["nextJourney", "nextMission"]);
const HEALTH_TYPES = new Set(["nextHealthAction"]);
const INSIGHT_TYPES = new Set(["dailyInsight"]);

function isExcluded(item, context) {
  const completed = context.completedItems ?? [];

  if (completed.includes(item.id)) return true;
  if (completed.includes(item.path)) return true;

  if (context.calculatorPath && item.path === context.calculatorPath) return true;
  if (context.lessonSlug && item.path === `/learn/${context.lessonSlug}`) return true;

  const journeySlug = context.journeySlug ?? context.missionSlug;
  if (journeySlug && item.path === `/journeys/${journeySlug}`) return true;

  return false;
}

function applyRecentPenalty(score, item, context) {
  const recent = context.recentItems ?? [];
  if (recent.includes(item.id) || recent.includes(item.path)) {
    return score - 20;
  }
  return score;
}

function applyDifficultyAdjustment(score, item, context) {
  if (!context.difficulty || !item.difficulty) return score;

  const current = DIFFICULTY_ORDER[context.difficulty] ?? 2;
  const target = DIFFICULTY_ORDER[item.difficulty] ?? 2;
  const gap = target - current;

  if (gap === 0) return score + 10;
  if (gap === 1) return score + 5;
  if (gap > 1) return score - 15;
  return score + 3;
}

/**
 * Deterministic ranking — no machine learning.
 * Factors: direct match, related distance, source relevance, learning order, difficulty, recency.
 */
export function rankRecommendations(items, context = {}) {
  const conceptId = resolveContextConceptId(context);
  const relatedIds = conceptId ? getRelatedConceptIds(conceptId, 2) : [];
  const directRelated = conceptId ? getRelatedConceptIds(conceptId, 1) : [];

  return items
    .map((item) => {
      let score = item.score ?? item.priority ?? 50;

      if (conceptId && item.conceptId === conceptId) score += 40;
      else if (directRelated.includes(item.conceptId)) score += 25;
      else if (relatedIds.includes(item.conceptId)) score += 10;

      if (context.healthTopic && getConcept(item.conceptId)?.relatedHealthTopics?.includes(context.healthTopic)) {
        score += 20;
      }

      const concept = item.conceptId ? getConcept(item.conceptId) : null;
      if (concept && conceptId) {
        const anchor = getConcept(conceptId);
        if (anchor) {
          const orderGap = Math.abs(concept.learningOrder - anchor.learningOrder);
          if (orderGap === 1) score += 12;
          else if (orderGap <= 3) score += 6;
        }
      }

      score = applyDifficultyAdjustment(score, item, context);
      score = applyRecentPenalty(score, item, context);

      return {
        ...item,
        score,
        priority: Math.min(100, Math.max(0, Math.round(score))),
      };
    })
    .filter((item) => !isExcluded(item, context))
    .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));
}

export function deduplicateRecommendations(items) {
  const seenIds = new Set();

  return items.filter((item) => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });
}

function lessonToItem(lesson, type, conceptId, baseScore, reason) {
  return createRecommendationItem({
    id: `lesson:${lesson.slug}`,
    type,
    title: lesson.title,
    description: `Estimated reading time · ${lesson.duration}. ${lesson.difficulty} level.`,
    path: `/learn/${lesson.slug}`,
    reason,
    priority: baseScore,
    conceptId,
    tags: ["learn", lesson.difficulty?.toLowerCase()],
    score: baseScore,
    difficulty: lesson.difficulty?.toLowerCase(),
  });
}

function calculatorToItem(calc, type, conceptId, baseScore, reason) {
  return createRecommendationItem({
    id: `calculator:${calc.path}`,
    type,
    title: calc.title,
    description: calc.desc,
    path: calc.path,
    reason,
    priority: baseScore,
    conceptId,
    tags: ["calculator", "tool"],
    score: baseScore,
  });
}

function journeyToItem(journey, type, conceptId, baseScore, reason) {
  return createRecommendationItem({
    id: `${type === "nextMission" ? "mission" : "journey"}:${journey.slug}`,
    type,
    title: journey.title,
    description: journey.description,
    path: `/journeys/${journey.slug}`,
    reason,
    priority: baseScore,
    conceptId,
    tags: [type === "nextMission" ? "mission" : "journey"],
    score: baseScore,
  });
}

function conceptToItem(concept, type, baseScore, reason) {
  return createRecommendationItem({
    id: `concept:${concept.id}`,
    type,
    title: concept.title,
    description: concept.description,
    path: `/learn/${concept.relatedLessons[0] ?? "money-basics"}`,
    reason,
    priority: baseScore,
    conceptId: concept.id,
    tags: concept.tags,
    score: baseScore,
    difficulty: concept.difficulty,
  });
}

function healthActionToItem(concept, baseScore, reason) {
  const lessonPath = concept.relatedLessons[0]
    ? `/learn/${concept.relatedLessons[0]}`
    : "/financial-health-score";

  return createRecommendationItem({
    id: `health:${concept.id}`,
    type: "nextHealthAction",
    title: `Reflect on ${concept.title}`,
    description: concept.description,
    path: lessonPath,
    reason,
    priority: baseScore,
    conceptId: concept.id,
    tags: ["health", ...concept.tags],
    score: baseScore,
    difficulty: concept.difficulty,
  });
}

export function buildCandidatesFromConcept(conceptId) {
  if (!conceptId) return [];

  const concept = getConcept(conceptId);
  if (!concept) return [];

  const candidates = [];
  const boosts = getConceptRuleBoosts(conceptId);
  const boostedPaths = new Set();
  const boostedSlugs = new Set();

  boosts.forEach((boost) => {
    if (boost.type === "nextLesson" && boost.slug) {
      boostedSlugs.add(boost.slug);
      const lesson = getLearningPathBySlug(boost.slug);
      if (lesson) {
        candidates.push(lessonToItem(lesson, "nextLesson", conceptId, boost.baseScore, boost.reason));
      }
    }
    if (boost.type === "nextCalculator" && boost.path) {
      boostedPaths.add(boost.path);
      const calc = ALL_CALCULATORS.find((item) => item.path === boost.path);
      if (calc) {
        candidates.push(calculatorToItem(calc, "nextCalculator", conceptId, boost.baseScore, boost.reason));
      }
    }
    if ((boost.type === "nextJourney" || boost.type === "nextMission") && boost.slug) {
      const journey = FINANCIAL_JOURNEYS.find((item) => item.slug === boost.slug);
      if (journey) {
        candidates.push(journeyToItem(journey, boost.type, conceptId, boost.baseScore, boost.reason));
      }
    }
    if (boost.type === "relatedConcepts" && boost.conceptId) {
      const related = getConcept(boost.conceptId);
      if (related) {
        candidates.push(conceptToItem(related, "relatedConcepts", boost.baseScore, boost.reason));
      }
    }
  });

  getRelatedLessons(conceptId).forEach((lesson, index) => {
    if (boostedSlugs.has(lesson.slug)) return;
    candidates.push(
      lessonToItem(
        lesson,
        index === 0 ? "continueLearning" : "nextLesson",
        conceptId,
        70 - index * 5,
        `Connected to ${concept.title} in the FOINWI knowledge graph.`,
      ),
    );
  });

  getRelatedCalculators(conceptId).forEach((calc, index) => {
    if (boostedPaths.has(calc.path)) return;
    candidates.push(
      calculatorToItem(
        calc,
        "nextCalculator",
        conceptId,
        68 - index * 4,
        `Practice ${concept.title} concepts with an educational calculator.`,
      ),
    );
  });

  getRelatedJourneys(conceptId).forEach((journey, index) => {
    const fullJourney = FINANCIAL_JOURNEYS.find((item) => item.slug === journey.slug);
    if (!fullJourney) return;
    const type = index === 0 ? "nextJourney" : "nextMission";
    candidates.push(
      journeyToItem(
        fullJourney,
        type,
        conceptId,
        66 - index * 4,
        `Explore a guided path related to ${concept.title}.`,
      ),
    );
  });

  getRelatedConcepts(conceptId).forEach((related, index) => {
    if (boosts.some((b) => b.conceptId === related.id)) return;
    candidates.push(
      conceptToItem(
        related,
        "relatedConcepts",
        58 - index * 3,
        `${related.title} is a related concept that may deepen your understanding.`,
      ),
    );
  });

  return candidates;
}

export function buildHealthCandidates(healthTopic) {
  if (!healthTopic) return [];

  const conceptIds = getHealthTopicConceptIds(healthTopic);
  const concepts = getConceptsByHealthTopic(healthTopic);

  const orderedConcepts = [
    ...conceptIds.map((id) => getConcept(id)).filter(Boolean),
    ...concepts.filter((c) => !conceptIds.includes(c.id)),
  ];

  const unique = [];
  const seen = new Set();
  orderedConcepts.forEach((concept) => {
    if (seen.has(concept.id)) return;
    seen.add(concept.id);
    unique.push(concept);
  });

  return unique.map((concept, index) =>
    healthActionToItem(
      concept,
      85 - index * 6,
      `This area connects to your ${healthTopic} health score reflection.`,
    ),
  );
}

export function getPrimaryRecommendation(context) {
  const result = getRecommendationsInternal(context, { limit: 1 });
  return result.primary[0] ?? result.secondary[0] ?? null;
}

export function getLearningRecommendations(context) {
  const result = getRecommendationsInternal(context);
  return deduplicateRecommendations([...result.learning, ...result.primary.filter((i) => LEARNING_TYPES.has(i.type))]);
}

export function getToolRecommendations(context) {
  const result = getRecommendationsInternal(context);
  return deduplicateRecommendations([...result.tools, ...result.primary.filter((i) => TOOL_TYPES.has(i.type))]);
}

export function getJourneyRecommendations(context) {
  const result = getRecommendationsInternal(context);
  return deduplicateRecommendations([...result.journeys, ...result.primary.filter((i) => JOURNEY_TYPES.has(i.type))]);
}

export function getHealthRecommendations(context) {
  const result = getRecommendationsInternal(context);
  return deduplicateRecommendations(result.health);
}

function bucketItems(items) {
  const primary = [];
  const secondary = [];
  const learning = [];
  const tools = [];
  const journeys = [];
  const health = [];
  const insights = [];

  items.forEach((item) => {
    if (item.priority >= 75) primary.push(item);
    else if (item.priority >= 50) secondary.push(item);

    if (LEARNING_TYPES.has(item.type)) learning.push(item);
    if (TOOL_TYPES.has(item.type)) tools.push(item);
    if (JOURNEY_TYPES.has(item.type)) journeys.push(item);
    if (HEALTH_TYPES.has(item.type)) health.push(item);
    if (INSIGHT_TYPES.has(item.type)) insights.push(item);
  });

  return {
    primary: primary.slice(0, 5),
    secondary: secondary.slice(0, 8),
    learning: learning.slice(0, 8),
    tools: tools.slice(0, 8),
    journeys: journeys.slice(0, 6),
    health: health.slice(0, 6),
    insights: insights.slice(0, 3),
  };
}

function computeConfidence(conceptId, sourceType) {
  if (conceptId && sourceType !== "unknown") return "high";
  if (conceptId) return "medium";
  if (sourceType !== "unknown") return "low";
  return "fallback";
}

/** Internal shared pipeline — imported by engine to avoid circular deps */
export function getRecommendationsInternal(context = {}, options = {}) {
  const { limit } = options;
  const conceptId = resolveContextConceptId(context);

  let candidates = [];

  if (conceptId) {
    candidates.push(...buildCandidatesFromConcept(conceptId, context));
  }

  if (context.healthTopic) {
    candidates.push(...buildHealthCandidates(context.healthTopic));
  }

  if (conceptId || context.healthTopic) {
    const insight = buildDailyInsightRecommendation(conceptId);
    if (insight) candidates.push(insight);
  }

  if (!conceptId && !context.healthTopic) {
    candidates.push(...FALLBACK_RECOMMENDATIONS);
  } else if (!candidates.length) {
    candidates.push(...FALLBACK_RECOMMENDATIONS);
  }

  let ranked = rankRecommendations(candidates, { ...context, conceptId: conceptId ?? context.conceptId });
  ranked = deduplicateRecommendations(ranked);

  if (limit) ranked = ranked.slice(0, limit);

  const buckets = bucketItems(ranked);
  const sourceType = resolveSourceType(context, conceptId);

  return {
    ...buckets,
    metadata: {
      sourceType,
      conceptId: conceptId ?? null,
      generatedAt: new Date().toISOString(),
      confidence: computeConfidence(conceptId, sourceType),
    },
    _all: ranked,
  };
}
