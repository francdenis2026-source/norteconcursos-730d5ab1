import { canonicalSubject } from "./subjects";
import type { TrainingActivity, DifficultyStat } from "@/hooks/usePerformanceOverview";

/** Optional analytics failures must never discard the student's recorded answers. */
export function performanceSourceResults(results: PromiseSettledResult<unknown>[]) {
  const names = [
    "Respostas do treinador",
    "Simulados",
    "Revisões de erros",
    "Sequência de estudo",
    "Ranking",
    "Análise por assunto",
  ];
  const ok = results.map(
    (result) =>
      result.status === "fulfilled" && !(result.value as { error?: unknown } | null)?.error,
  );
  const values = results.map((result, i) =>
    !ok[i]
      ? i === 3 || i === 4
        ? null
        : []
      : i < 3
        ? (result as PromiseFulfilledResult<unknown>).value
        : (result as PromiseFulfilledResult<{ data: unknown }>).value.data,
  );
  return {
    values,
    available: {
      training: !!ok[0],
      simulators: !!ok[1],
      reviews: !!ok[2],
      streak: !!ok[3],
      rank: !!ok[4],
    },
    difficultyAvailable: !!ok[5],
    warnings: names.flatMap((name, i) =>
      ok[i]
        ? []
        : [
            `${name}: indisponível nesta atualização.${i === 5 ? " Exibimos uma análise por disciplina calculada das respostas disponíveis." : " Os demais indicadores foram preservados."}`,
          ],
    ),
  };
}
export function fallbackDifficulty(responses: TrainingActivity[]): DifficultyStat[] {
  const seen = new Set<string>(),
    groups = new Map<string, { total: number; correct: number; times: number[] }>();
  for (const row of [...responses].sort(
    (a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id),
  )) {
    const key = `${row.question_source}:${row.question_id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const subject = canonicalSubject(row.subject),
      group = groups.get(subject) ?? { total: 0, correct: 0, times: [] };
    group.total++;
    group.correct += row.is_correct ? 1 : 0;
    group.times.push(Math.max(0, Math.min(Number(row.response_seconds) || 0, 900)));
    groups.set(subject, group);
  }
  return [...groups]
    .map(([subject, group]) => {
      const times = group.times.sort((a, b) => a - b),
        mid = Math.floor(times.length / 2);
      const median = times.length % 2 ? times[mid]! : (times[mid - 1]! + times[mid]!) / 2;
      const accuracy = Math.round((group.correct / group.total) * 100);
      return {
        subject,
        topic: "Visão por disciplina",
        answered: group.total,
        correct: group.correct,
        accuracy,
        avgSeconds: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
        medianSeconds: Math.round(median),
        difficultyScore: Math.round((100 - accuracy) * 0.7 + (Math.min(median, 180) / 180) * 30),
      };
    })
    .sort((a, b) => b.difficultyScore - a.difficultyScore || b.answered - a.answered);
}

/** Unclassified historical errors are pending; status rows are not the answer history. */
export function historicalErrorSummary(
  responses: TrainingActivity[],
  reviews: { question_id: string; question_source: string; status: string }[],
) {
  const statuses = new Map(reviews.map((r) => [`${r.question_source}:${r.question_id}`, r.status]));
  const seen = new Set<string>();
  const counts = { pendente: 0, revisado: 0, dominado: 0, total: 0 };
  for (const row of responses) {
    const key = `${row.question_source}:${row.question_id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (row.is_correct) continue;
    const status = statuses.get(key);
    counts[status === "revisado" || status === "dominado" ? status : "pendente"]++;
    counts.total++;
  }
  return counts;
}
