import { EvaluationStrategy } from "./EvaluationStrategy.js";

export class RubricEvaluator extends EvaluationStrategy {
  async evaluate(attempt) {
    const s = attempt.submission;
    const combined = `${s.classes || ""} ${s.relationships || ""} ${s.code || ""}`.toLowerCase();

    const scores = {
      responsibilities: s.classes?.trim().length > 80 ? 8 : 5,
      abstractions: /interface|abstract|strategy|factory|polymorphism/.test(combined) ? 8 : 6,
      relationships: s.relationships?.trim().length > 50 ? 8 : 5,
      extensibility: /interface|strategy|factory|extend|pluggable/.test(combined) ? 8 : 6
    };

    const strengths = [];
    const concerns = [];
    const suggestions = [];

    if (s.classes?.trim().length > 80) strengths.push("Your class descriptions provide enough evidence to reason about responsibility boundaries.");
    else concerns.push("Responsibilities are too brief to confidently assess cohesion.");

    if (/strategy|interface|abstract/.test(combined)) {
      strengths.push("You considered an abstraction or extension boundary instead of coupling every behaviour to one concrete class.");
    } else {
      suggestions.push("If a behaviour is likely to vary, consider isolating that variation behind an interface rather than adding conditionals to a central class.");
    }

    if (/manager|service|controller/.test(combined) && /fee|payment|inventory|schedule/.test(combined)) {
      concerns.push("Check whether a central manager/service is accumulating unrelated responsibilities.");
      suggestions.push("Move independently changing policies toward dedicated collaborators when that improves cohesion.");
    }

    return {
      source: "RUBRIC",
      strengths, concerns, suggestions, scores,
      explanation: "This evaluator uses criteria rather than comparing your design with one reference solution, because multiple LLD designs can be valid."
    };
  }
}
