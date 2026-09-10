import { randomUUID } from "node:crypto";
import { Attempt } from "../domain/Attempt.js";

export class AttemptService {
  constructor({ repository, evaluationService, problems }) {
    this.repository = repository;
    this.evaluationService = evaluationService;
    this.problems = problems;
  }

  getProblem(id) { return this.problems.find(p => p.id === id); }

  async createDraft({ learnerId, problemId, submission }) {
    if (!this.getProblem(problemId)) throw new Error("Problem not found.");
    const attempt = new Attempt({ id: randomUUID(), learnerId, problemId, submission });
    return this.repository.save(attempt);
  }

  async submit(id) {
    const attempt = await this.repository.findById(id);
    if (!attempt) throw new Error("Attempt not found.");
    const problem = this.getProblem(attempt.problemId);
    attempt.submit();
    await this.repository.save(attempt);
    attempt.startEvaluation();
    await this.repository.save(attempt);

    try {
      const feedback = await this.evaluationService.evaluate(attempt, problem);
      attempt.complete(feedback);
    } catch (error) {
      attempt.fail(error.message);
    }

    await this.repository.save(attempt);
    return attempt;
  }

  async listHistory(learnerId) { return this.repository.findByLearner(learnerId); }
}
