import test from "node:test";
import assert from "node:assert/strict";
import { Attempt, AttemptStatus } from "../src/domain/Attempt.js";
import { InMemoryAttemptRepository } from "../src/repositories/InMemoryAttemptRepository.js";
import { EvaluationService } from "../src/services/EvaluationService.js";
import { RuleBasedEvaluator } from "../src/evaluators/RuleBasedEvaluator.js";
import { RubricEvaluator } from "../src/evaluators/RubricEvaluator.js";
import { AttemptService } from "../src/services/AttemptService.js";
import { problems } from "../src/data/problems.js";

test("empty attempt cannot be submitted", () => {
  const a = new Attempt({ id:"1", learnerId:"u", problemId:"parking-lot", submission:{} });
  assert.throws(() => a.submit(), /cannot be empty/);
});

test("attempt follows submission lifecycle", () => {
  const a = new Attempt({ id:"1", learnerId:"u", problemId:"parking-lot", submission:{ classes:"ParkingLot manages spots." } });
  a.submit();
  assert.equal(a.status, AttemptStatus.SUBMITTED);
  a.startEvaluation();
  a.complete({ strengths:[] });
  assert.equal(a.status, AttemptStatus.COMPLETED);
});

test("hybrid evaluation returns combined feedback", async () => {
  const a = new Attempt({ id:"1", learnerId:"u", problemId:"parking-lot", submission:{
    understanding:"Need to support parking.",
    classes:"Vehicle, ParkingSpot and Ticket each have focused responsibilities.",
    relationships:"ParkingLot uses an allocation strategy and PricingStrategy interface."
  }});
  const service = new EvaluationService([new RuleBasedEvaluator(), new RubricEvaluator()]);
  const feedback = await service.evaluate(a, problems[0]);
  assert.ok(feedback.strengths.length > 0);
  assert.ok(feedback.overallScore > 0);
});

test("history returns previous attempts newest first", async () => {
  const repo = new InMemoryAttemptRepository();
  const service = new AttemptService({
    repository:repo,
    evaluationService:new EvaluationService([new RuleBasedEvaluator()]),
    problems
  });
  const first = await service.createDraft({learnerId:"u",problemId:"parking-lot",submission:{classes:"A"}});
  await new Promise(r=>setTimeout(r,5));
  const second = await service.createDraft({learnerId:"u",problemId:"library",submission:{classes:"B"}});
  const history = await service.listHistory("u");
  assert.equal(history[0].id, second.id);
  assert.equal(history[1].id, first.id);
});
