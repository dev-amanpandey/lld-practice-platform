# Design Note

## MVP

LLD Mentor is a focused practice platform with four problems and one end-to-end loop:

```text
Choose → Design → Save/Submit → Evaluate → Review → Improve
```

## Domain model

```text
Problem
  └── requirements, concepts, evaluationCriteria

Attempt
  └── Submission
       ├── understanding
       ├── classes
       ├── relationships
       └── code

Attempt
  └── Feedback

EvaluationStrategy
  ├── RuleBasedEvaluator
  └── RubricEvaluator
```

## Important responsibilities

### Problem

Owns problem requirements and evaluation criteria.

### Submission

Represents learner-provided design evidence.

### Attempt

Owns lifecycle transitions:

```text
DRAFT → SUBMITTED → EVALUATING → COMPLETED
                         └────→ FAILED
```

### AttemptRepository

Abstracts persistence from domain behaviour.

### EvaluationStrategy

Defines one contract:

```js
evaluate(attempt, problem)
```

### EvaluationService

Coordinates multiple evaluators and combines their observations into one feedback object.

## Evaluation approach

### RuleBasedEvaluator

Checks deterministic concerns:

- required fields
- minimum meaningful content
- problem concept coverage

### RubricEvaluator

Produces criterion-oriented reasoning around:

- responsibility separation
- abstractions
- relationships
- extensibility
- trade-offs

In production this strategy can be replaced by an LLM implementation that returns structured JSON.

## Future submission formats

The core `Attempt` references a `Submission`. A future submission can include:

```text
TextSubmission
CodeSubmission
DiagramSubmission
MixedSubmission
```

The evaluator contract remains stable, allowing new evaluators to support different formats.

## Slow or failed evaluation

The attempt is persisted first. Evaluation happens after the status becomes `EVALUATING`. A failure changes evaluation status to `FAILED` but does not delete the attempt. A retry can re-run evaluation.

For a larger product, the same interface could be triggered by a background worker. The MVP intentionally avoids queues and distributed infrastructure.

## Trade-offs

### Chosen: focused monolith

The assignment is primarily about LLD. A monolith keeps the prototype demonstrable and lets the domain boundaries remain visible.

### Chosen: strategy-based evaluation

Slightly more abstraction than directly calling an AI API, but it protects the domain from vendor lock-in and supports deterministic checks.

### Not chosen: exact reference-solution comparison

LLD often has multiple valid designs. Exact matching would reward memorisation rather than reasoning.
