/**
 * FOINWI Knowledge Graph — relationship graph and learning paths.
 * Describes how concepts connect to each other and suggested learning sequences.
 */

import { FINANCIAL_CONCEPTS, CONCEPT_IDS } from "./financialConcepts.js";

/** Directed learning paths keyed by entry concept or goal area. */
export const LEARNING_PATHS = {
  "wealth-foundation": {
    id: "wealth-foundation",
    title: "Wealth Foundation",
    description: "Core habits and concepts before long-term investing.",
    conceptIds: [
      "savings",
      "budgeting",
      "emergency-fund",
      "inflation",
      "compounding",
      "goal-planning",
    ],
  },
  "investing-core": {
    id: "investing-core",
    title: "Investing Core",
    description: "From compounding basics to SIP and portfolio thinking.",
    conceptIds: [
      "compounding",
      "sip",
      "mutual-funds",
      "asset-allocation",
      "goal-planning",
    ],
  },
  "retirement-stack": {
    id: "retirement-stack",
    title: "Retirement Stack",
    description: "Government and voluntary retirement building blocks.",
    conceptIds: ["epf", "ppf", "nps", "retirement", "inflation"],
  },
  "debt-management": {
    id: "debt-management",
    title: "Debt Management",
    description: "Borrowing, repayment, and credit health.",
    conceptIds: ["budgeting", "debt", "emi", "credit-score"],
  },
  "protection-first": {
    id: "protection-first",
    title: "Protection First",
    description: "Safety nets before aggressive wealth goals.",
    conceptIds: ["savings", "emergency-fund", "insurance", "goal-planning"],
  },
  "tax-planning": {
    id: "tax-planning",
    title: "Tax Planning",
    description: "Income tax concepts and common deduction instruments.",
    conceptIds: ["tax", "ppf", "epf", "nps", "budgeting"],
  },
};

/** Category → default concept learning order within that domain. */
export const CATEGORY_LEARNING_ORDER = {
  savings: ["savings", "budgeting", "emergency-fund", "fd", "rd"],
  investing: ["compounding", "sip", "mutual-funds", "asset-allocation", "ppf"],
  debt: ["budgeting", "debt", "emi", "credit-score"],
  protection: ["emergency-fund", "insurance", "goal-planning"],
  planning: ["inflation", "goal-planning", "retirement", "epf", "nps"],
  tax: ["tax", "ppf", "epf"],
};

/** Concept → learning path ids that include this concept. */
function buildConceptPathIndex() {
  const index = Object.fromEntries(CONCEPT_IDS.map((id) => [id, []]));

  Object.values(LEARNING_PATHS).forEach((path) => {
    path.conceptIds.forEach((conceptId) => {
      if (index[conceptId]) {
        index[conceptId].push(path.id);
      }
    });
  });

  return index;
}

export const CONCEPT_PATH_INDEX = buildConceptPathIndex();

/** Undirected adjacency derived from relatedConcepts for graph traversal. */
export function buildAdjacencyList() {
  const adjacency = Object.fromEntries(CONCEPT_IDS.map((id) => [id, new Set()]));

  Object.values(FINANCIAL_CONCEPTS).forEach((concept) => {
    concept.relatedConcepts.forEach((relatedId) => {
      if (adjacency[concept.id] && adjacency[relatedId]) {
        adjacency[concept.id].add(relatedId);
        adjacency[relatedId].add(concept.id);
      }
    });
  });

  return Object.fromEntries(
    Object.entries(adjacency).map(([id, set]) => [id, [...set]]),
  );
}

export const CONCEPT_ADJACENCY = buildAdjacencyList();

export function getLearningPathById(pathId) {
  return LEARNING_PATHS[pathId] ?? null;
}

export function getLearningPathsForConcept(conceptId) {
  const pathIds = CONCEPT_PATH_INDEX[conceptId] ?? [];
  return pathIds.map((id) => LEARNING_PATHS[id]).filter(Boolean);
}

export function getCategoryLearningOrder(category) {
  return CATEGORY_LEARNING_ORDER[category] ?? [];
}
