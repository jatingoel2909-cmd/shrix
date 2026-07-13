/**
 * FOINWI Daily Intelligence — insight types and factories.
 * Educational content only. No personal advice. No persistence.
 */

export const INSIGHT_CATEGORIES = [
  "savings",
  "investing",
  "debt",
  "protection",
  "planning",
  "tax",
  "habits",
];

export const INSIGHT_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export const EDUCATIONAL_NOTICE =
  "Educational content only. FOINWI does not provide financial, investment, tax, or loan advice.";

/**
 * @typedef {Object} DailyInsight
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} explanation
 * @property {string} conceptId
 * @property {string} category
 * @property {string} difficulty
 * @property {string} readingTime
 * @property {string[]} tags
 * @property {string[]} relatedCalculatorPaths
 * @property {string[]} relatedLessonSlugs
 * @property {string[]} relatedJourneySlugs
 * @property {string[]} relatedMissionSlugs
 * @property {string} educationalNotice
 */

export function createInsight(partial) {
  return {
    id: partial.id,
    title: partial.title,
    summary: partial.summary,
    explanation: partial.explanation,
    conceptId: partial.conceptId,
    category: partial.category,
    difficulty: partial.difficulty ?? "beginner",
    readingTime: partial.readingTime ?? "2 min",
    tags: partial.tags ?? [],
    relatedCalculatorPaths: partial.relatedCalculatorPaths ?? [],
    relatedLessonSlugs: partial.relatedLessonSlugs ?? [],
    relatedJourneySlugs: partial.relatedJourneySlugs ?? [],
    relatedMissionSlugs: partial.relatedMissionSlugs ?? [],
    educationalNotice: partial.educationalNotice ?? EDUCATIONAL_NOTICE,
  };
}

export function createEmptyInsightResult(metadata = {}) {
  return {
    insight: null,
    relatedRecommendations: {
      lesson: null,
      calculator: null,
      journey: null,
      concept: null,
      items: [],
    },
    context: null,
    metadata: {
      selectedBy: ["fallback"],
      dateKey: null,
      confidence: "fallback",
      generatedAt: new Date().toISOString(),
      ...metadata,
    },
  };
}
