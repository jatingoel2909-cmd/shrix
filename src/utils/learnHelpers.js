import { ALL_CALCULATORS } from "../data/calculators";

export function getCalculatorsByPaths(paths = []) {
  return paths
    .map((path) => ALL_CALCULATORS.find((calc) => calc.path === path))
    .filter(Boolean);
}

export function getUniqueCalculatorsFromLessons(lessons = []) {
  const paths = [...new Set(lessons.flatMap((lesson) => lesson.calculators))];
  return getCalculatorsByPaths(paths);
}
