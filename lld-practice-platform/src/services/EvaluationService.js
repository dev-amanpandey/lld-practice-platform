export class EvaluationService {
  constructor(evaluators) { this.evaluators = evaluators; }

  async evaluate(attempt, problem) {
    const results = [];
    for (const evaluator of this.evaluators) {
      results.push(await evaluator.evaluate(attempt, problem));
    }

    const strengths = results.flatMap(r => r.strengths || []);
    const concerns = results.flatMap(r => r.concerns || []);
    const suggestions = results.flatMap(r => r.suggestions || []);
    const scoreSets = results.map(r => r.scores).filter(Boolean);
    const scores = Object.assign({}, ...scoreSets);
    const values = Object.values(scores);

    return {
      strengths: [...new Set(strengths)],
      concerns: [...new Set(concerns)],
      suggestions: [...new Set(suggestions)],
      scores,
      overallScore: values.length ? Math.round((values.reduce((a,b)=>a+b,0)/values.length)*10)/10 : null,
      evaluatorResults: results
    };
  }
}
