/**
 * FOINWI Knowledge Graph — query helpers.
 * Read-only accessors for concept data and relationships. No UI coupling.
 */

import { ALL_CALCULATORS } from "../../data/calculators.js";
import { FINANCIAL_JOURNEYS } from "../../data/journeys.js";
import { getLearningPathBySlug } from "../../data/learnAcademy.js";
import {
  FINANCIAL_CONCEPTS,
  getConceptById,
  getAllConcepts,
} from "./financialConcepts.js";
import {
  CONCEPT_ADJACENCY,
  CATEGORY_LEARNING_ORDER,
  getCategoryLearningOrder,
  getLearningPathById,
  getLearningPathsForConcept,
  LEARNING_PATHS,
} from "./conceptGraph.js";

function resolveCalculators(paths = []) {
  return paths
    .map((path) => ALL_CALCULATORS.find((calc) => calc.path === path))
    .filter(Boolean);
}

function resolveJourneys(slugs = []) {
  return slugs
    .map((slug) => FINANCIAL_JOURNEYS.find((journey) => journey.slug === slug))
    .filter(Boolean)
    .map((journey) => ({
      slug: journey.slug,
      title: journey.title,
      icon: journey.icon,
      description: journey.description,
    }));
}

function resolveLessons(slugs = []) {
  return slugs
    .map((slug) => getLearningPathBySlug(slug))
    .filter(Boolean)
    .map((path) => ({
      slug: path.slug,
      title: path.title,
      icon: path.icon,
      duration: path.duration,
      difficulty: path.difficulty,
    }));
}

/**
 * Get a single concept by id.
 * @param {string} id
 * @returns {object|null}
 */
export function getConcept(id) {
  return getConceptById(id);
}

/**
 * Get directly and adjacency-listed related concepts.
 * @param {string} id
 * @param {{ includeTransitive?: boolean }} [options]
 * @returns {object[]}
 */
export function getRelatedConcepts(id, { includeTransitive = false } = {}) {
  const concept = getConceptById(id);
  if (!concept) return [];

  const directIds = new Set([
    ...concept.relatedConcepts,
    ...(CONCEPT_ADJACENCY[id] ?? []),
  ]);
  directIds.delete(id);

  if (includeTransitive) {
    (CONCEPT_ADJACENCY[id] ?? []).forEach((neighborId) => {
      (CONCEPT_ADJACENCY[neighborId] ?? []).forEach((secondId) => {
        if (secondId !== id) directIds.add(secondId);
      });
    });
  }

  return [...directIds]
    .map((conceptId) => getConceptById(conceptId))
    .filter(Boolean)
    .sort((a, b) => a.learningOrder - b.learningOrder);
}

/**
 * Get a learning path for a concept.
 * Returns the best-matching registered path, or a category-ordered fallback.
 * @param {string} id
 * @param {string} [pathId] - optional explicit path id
 * @returns {{ pathId: string, title: string, description: string, concepts: object[] }|null}
 */
export function getLearningPath(id, pathId) {
  const concept = getConceptById(id);
  if (!concept) return null;

  const resolvedPath = pathId
    ? getLearningPathById(pathId)
    : (getLearningPathsForConcept(id)[0] ?? null);

  if (resolvedPath) {
    const concepts = resolvedPath.conceptIds
      .map((conceptId) => getConceptById(conceptId))
      .filter(Boolean);

    return {
      pathId: resolvedPath.id,
      title: resolvedPath.title,
      description: resolvedPath.description,
      concepts,
    };
  }

  const categoryOrder = getCategoryLearningOrder(concept.category);
  const orderedIds = categoryOrder.length
    ? categoryOrder
    : getAllConcepts()
        .filter((item) => item.category === concept.category)
        .sort((a, b) => a.learningOrder - b.learningOrder)
        .map((item) => item.id);

  const concepts = orderedIds.map((conceptId) => getConceptById(conceptId)).filter(Boolean);

  return {
    pathId: `category-${concept.category}`,
    title: `${concept.category.charAt(0).toUpperCase()}${concept.category.slice(1)} Learning Path`,
    description: `Category-ordered learning sequence for ${concept.category}.`,
    concepts,
  };
}

/**
 * Get calculators related to a concept (resolved from platform registry).
 * @param {string} id
 * @returns {object[]}
 */
export function getRelatedCalculators(id) {
  const concept = getConceptById(id);
  if (!concept) return [];
  return resolveCalculators(concept.relatedCalculators);
}

/**
 * Get journeys related to a concept (resolved from platform registry).
 * @param {string} id
 * @returns {object[]}
 */
export function getRelatedJourneys(id) {
  const concept = getConceptById(id);
  if (!concept) return [];
  return resolveJourneys(concept.relatedJourneys);
}

/**
 * Get learn academy paths related to a concept.
 * @param {string} id
 * @returns {object[]}
 */
export function getRelatedLessons(id) {
  const concept = getConceptById(id);
  if (!concept) return [];
  return resolveLessons(concept.relatedLessons);
}

/**
 * List all registered learning paths.
 * @returns {object[]}
 */
export function getAllLearningPaths() {
  return Object.values(LEARNING_PATHS);
}

/**
 * Get concepts by category.
 * @param {string} category
 * @returns {object[]}
 */
export function getConceptsByCategory(category) {
  return getAllConcepts()
    .filter((concept) => concept.category === category)
    .sort((a, b) => a.learningOrder - b.learningOrder);
}

/**
 * Get concepts linked to a health score topic.
 * @param {string} healthTopicId - savings | investments | protection | debt | planning
 * @returns {object[]}
 */
export function getConceptsByHealthTopic(healthTopicId) {
  return getAllConcepts()
    .filter((concept) => concept.relatedHealthTopics.includes(healthTopicId))
    .sort((a, b) => a.learningOrder - b.learningOrder);
}

export { FINANCIAL_CONCEPTS, LEARNING_PATHS, CATEGORY_LEARNING_ORDER };
