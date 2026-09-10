export const AttemptStatus = Object.freeze({
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  EVALUATING: "EVALUATING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
});

export class Attempt {
  constructor({ id, learnerId, problemId, submission, status = AttemptStatus.DRAFT, feedback = null, createdAt = new Date().toISOString(), updatedAt = new Date().toISOString() }) {
    this.id = id;
    this.learnerId = learnerId;
    this.problemId = problemId;
    this.submission = submission || {};
    this.status = status;
    this.feedback = feedback;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validateSubmission() {
    const s = this.submission;
    if (!s.understanding?.trim() && !s.classes?.trim() && !s.relationships?.trim() && !s.code?.trim()) {
      throw new Error("A solution cannot be empty.");
    }
  }

  submit() {
    this.validateSubmission();
    if (![AttemptStatus.DRAFT, AttemptStatus.FAILED].includes(this.status)) {
      throw new Error(`Cannot submit an attempt from ${this.status}.`);
    }
    this.status = AttemptStatus.SUBMITTED;
    this.touch();
  }

  startEvaluation() {
    if (this.status !== AttemptStatus.SUBMITTED) throw new Error("Only submitted attempts can be evaluated.");
    this.status = AttemptStatus.EVALUATING;
    this.touch();
  }

  complete(feedback) {
    if (this.status !== AttemptStatus.EVALUATING) throw new Error("Attempt is not being evaluated.");
    this.feedback = feedback;
    this.status = AttemptStatus.COMPLETED;
    this.touch();
  }

  fail(reason) {
    this.status = AttemptStatus.FAILED;
    this.feedback = { error: reason };
    this.touch();
  }

  touch() { this.updatedAt = new Date().toISOString(); }
}
