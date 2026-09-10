export class InMemoryAttemptRepository {
  constructor() { this.attempts = new Map(); }

  async save(attempt) {
    this.attempts.set(attempt.id, attempt);
    return attempt;
  }

  async findById(id) { return this.attempts.get(id) || null; }

  async findByLearner(learnerId) {
    return [...this.attempts.values()]
      .filter(a => a.learnerId === learnerId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}
