# Research Note — LLD Practice Platform

## Learner problem

Low-Level Design practice is deceptively difficult to evaluate. A learner can complete a Parking Lot or Elevator design and still not know whether the class boundaries are appropriate, whether responsibilities are overloaded, or whether a suggested pattern genuinely improves the design.

The central learner need is therefore not simply **more questions**. It is a repeatable feedback loop:

> Attempt → receive specific feedback → understand why → improve → compare progress.

LLDCanvas demonstrates the value of purpose-built UML semantics, timed practice, curated problems and runnable code. LLD Arena combines practice problems with hidden tests, design rubrics and optional AI grading. These products validate that active practice is valuable, but the focused opportunity explored here is a lightweight improvement loop centered on explainable feedback rather than a broad interview-preparation suite.

Sources consulted:
- https://www.lldcanvas.in/
- https://github.com/mightbeanshuu/lld-arena
- https://www.educative.io/blog/how-to-prepare-for-low-level-design-questions-in-tech-interviews

## Existing approaches

### 1. Tutorial/course platforms

Structured learning platforms are useful for teaching OOP, SOLID and design patterns. Their weakness for practice is that learners can become consumers of reference solutions rather than receiving feedback on their own reasoning.

### 2. Generic diagramming tools

Whiteboards and UML tools make it easy to draw classes, but drawing a diagram is not the same as receiving feedback about responsibility boundaries, coupling or extensibility.

### 3. AI chat

General-purpose AI can review a design, but an unstructured prompt can produce inconsistent feedback or incorrectly imply that one solution is the only correct one.

## Key gaps

The MVP addresses four gaps:

1. **Structured evidence** — a learner should provide enough context for meaningful evaluation.
2. **Explainability** — feedback should connect observations to concrete design consequences.
3. **Multiple valid solutions** — evaluation should use criteria rather than exact-solution matching.
4. **Improvement over time** — previous attempts should remain visible.

## Product direction

The proposed product is intentionally narrow: a learner selects a problem, records their understanding and design, submits it, receives criterion-based feedback, and reviews previous attempts.

## What should a learner submit?

For this MVP:

- Problem understanding
- Classes and responsibilities
- Relationships / design decisions
- Optional code

This is enough evidence to evaluate reasoning without forcing every learner into a specific notation or programming language.

## What makes feedback useful?

Useful feedback is:

- specific rather than generic
- tied to a criterion
- explicit about strengths and concerns
- suggestive rather than prescriptive
- aware that alternative designs can be valid

For example, instead of saying **“Use Strategy pattern”**, the platform says:

> Fee calculation appears coupled to the central domain object. If pricing rules are expected to vary, isolating pricing behind a strategy can reduce future modification of the core object.

## Deterministic vs LLM evaluation

**Deterministic:**
- empty submission checks
- minimum completeness
- required concept coverage
- submission lifecycle

**LLM / reasoning-oriented:**
- responsibility quality
- abstraction boundaries
- coupling concerns
- extensibility
- trade-off explanations

The MVP models these as interchangeable strategies.

## Conclusion

The opportunity is not to build another LMS. It is to build a tight practice loop where learners repeatedly receive explainable feedback on their own design decisions.
