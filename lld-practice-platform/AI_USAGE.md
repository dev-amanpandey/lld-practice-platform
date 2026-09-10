# AI Usage

AI was used as an engineering assistant, not as an unquestioned solution generator.

## 1. Evaluation architecture

**AI suggestion:** Use a hybrid evaluator with deterministic rules and LLM reasoning.

**Accepted:** Yes.

**Why:** Objective checks are predictable, while responsibility boundaries and trade-offs are subjective. Separating them also makes failures easier to explain.

## 2. Strategy pattern for evaluators

**AI suggestion:** Put all evaluation logic into one service.

**Rejected / improved:** A single service would become tightly coupled to one evaluation method. Instead, the prototype uses `EvaluationStrategy` implementations coordinated by `EvaluationService`.

## 3. Submission format

**AI suggestion:** Require UML plus code for every attempt.

**Rejected:** This would increase friction and force one practice style. The MVP accepts structured text and optional code, leaving room for diagrams later.

## 4. Failure handling

**AI suggestion:** Return an error if AI evaluation fails.

**Rejected:** Losing the practice attempt would be poor learner experience. The attempt is persisted before evaluation and can remain available for retry.

## 5. Feedback language

**AI suggestion:** Give a single overall score.

**Improved:** A score alone is weak for learning. Feedback is structured into strengths, concerns, suggestions and criterion scores.
