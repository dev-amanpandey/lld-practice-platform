LLD Mentor — Practice Platform
A focused 2-day MVP that helps learners repeatedly practice Low-Level Design:

Choose problem → Design → Submit → Evaluate → Review feedback → Try again

Why this MVP?
LLD rarely has one universally correct answer. This prototype therefore does not compare a submission against one hard-coded reference solution. Instead, it uses a hybrid evaluation model:

Deterministic evaluation for objective checks such as completeness and coverage of important problem concepts.
AI-style rubric evaluation for subjective design reasoning such as responsibilities, abstractions, extensibility and trade-offs.
The prototype ships with a deterministic local rubric evaluator so it works without an API key. The AIEvaluator interface is intentionally replaceable by an OpenAI/Gemini/Claude implementation later.

Features
Four curated LLD problems
Structured practice workspace
Draft saving
Submission lifecycle: DRAFT → SUBMITTED → EVALUATING → COMPLETED
Hybrid evaluation architecture
Explainable strengths, concerns and suggestions
Retry-safe failure handling
Attempt history and improvement tracking
Important domain tests and edge cases
Run
npm install
npm start
Open:

http://localhost:3000
Run tests
npm test
Architecture
Browser UI
    ↓ HTTP
Express Controller
    ↓
AttemptService
    ├── AttemptRepository
    └── EvaluationService
            ├── RuleBasedEvaluator
            └── RubricEvaluator / future AIEvaluator
                    ↓
                 Feedback
Key LLD decisions
1. Attempt owns its lifecycle
Attempt is a domain object responsible for valid status transitions and submission validation.

2. Evaluation is strategy-based
Every evaluator implements:

evaluate(attempt, problem)
This allows future evaluators such as:

OpenAIEvaluator
DiagramEvaluator
CodeEvaluator
HumanEvaluator
without changing the Attempt domain.

3. Deterministic and subjective concerns are separated
Objective checks should be predictable. Design quality often has multiple valid answers, so subjective feedback belongs behind a separate evaluator strategy.

4. Failed evaluation does not lose the learner's work
The attempt is persisted before evaluation starts. If evaluation fails, the submission remains available and can be retried.

Limitations
Persistence uses an in-memory repository to keep the 2-day MVP easy to run.
The rubric evaluator simulates structured AI-style reasoning locally; a production implementation can inject an LLM client.
Authentication is intentionally out of scope; the MVP uses one demo learner.
UML editing and code compilation are future extensions.
See RESEARCH.md, DESIGN.md, and AI_USAGE.md for the assignment documentation.
