import { createFileRoute } from "@tanstack/react-router";
import { handleSolveQuestion } from "@/lib/ai/solver.server";

export const Route = createFileRoute("/api/solve-question")({
  server: { handlers: { POST: ({ request }) => handleSolveQuestion(request) } },
});
