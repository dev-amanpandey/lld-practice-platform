import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { problems } from "./data/problems.js";
import { InMemoryAttemptRepository } from "./repositories/InMemoryAttemptRepository.js";
import { RuleBasedEvaluator } from "./evaluators/RuleBasedEvaluator.js";
import { RubricEvaluator } from "./evaluators/RubricEvaluator.js";
import { EvaluationService } from "./services/EvaluationService.js";
import { AttemptService } from "./services/AttemptService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const repository = new InMemoryAttemptRepository();
const evaluationService = new EvaluationService([new RuleBasedEvaluator(), new RubricEvaluator()]);
const attemptService = new AttemptService({ repository, evaluationService, problems });

app.get("/api/problems", (req, res) => res.json(problems));
app.get("/api/problems/:id", (req, res) => {
  const p = problems.find(x => x.id === req.params.id);
  p ? res.json(p) : res.status(404).json({ error: "Problem not found" });
});

app.post("/api/attempts", async (req, res) => {
  try {
    const attempt = await attemptService.createDraft({
      learnerId: "demo-learner",
      problemId: req.body.problemId,
      submission: req.body.submission || {}
    });
    res.status(201).json(attempt);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.post("/api/attempts/:id/submit", async (req, res) => {
  try { res.json(await attemptService.submit(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

app.get("/api/attempts", async (req, res) => {
  res.json(await attemptService.listHistory("demo-learner"));
});

app.listen(3000, () => console.log("LLD Mentor running at http://localhost:3000"));
