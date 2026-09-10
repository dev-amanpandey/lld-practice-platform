import { EvaluationStrategy } from "./EvaluationStrategy.js";

export class RuleBasedEvaluator extends EvaluationStrategy {
  async evaluate(attempt, problem) {
    const text = Object.values(attempt.submission || {}).join(" ").toLowerCase();
    const covered = problem.concepts.filter(c => text.includes(c));
    const missing = problem.concepts.filter(c => !text.includes(c));

    const strengths = [];
    const concerns = [];
    const suggestions = [];

    if (attempt.submission.classes?.trim()) strengths.push("You explicitly described classes and responsibilities.");
    else concerns.push("Class and responsibility information is missing.");

    if (attempt.submission.relationships?.trim()) strengths.push("You documented relationships or design decisions.");
    else suggestions.push("Explain how important objects collaborate (composition, ownership, delegation or interfaces).");

    if (attempt.submission.understanding?.trim()) strengths.push("You recorded your interpretation of the problem before designing.");
    else suggestions.push("State assumptions and constraints before jumping into classes.");

    if (covered.length >= Math.ceil(problem.concepts.length * 0.6)) {
      strengths.push(`Your solution covers ${covered.length}/${problem.concepts.length} important domain concepts.`);
    } else {
      concerns.push(`Only ${covered.length}/${problem.concepts.length} important domain concepts were detected.`);
      if (missing.length) suggestions.push(`Consider whether these concepts need representation: ${missing.join(", ")}.`);
    }

    return {
      source: "RULES",
      strengths, concerns, suggestions,
      coverage: { covered, missing }
    };
  }
}
