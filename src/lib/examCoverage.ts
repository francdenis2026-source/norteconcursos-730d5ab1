import { PCPR_EXAM } from "./pcprExam";
import { matchesQuestionCareer, matchesQuestionContest } from "./questionFilterIdentity";

/** Only a verified paper identity may supply an original total. Never infer it from a pool. */
export function examCoverage(
  exam: { contest: string; career: string; year: string | number },
  available: number,
  selection = false,
): string | null {
  if (
    !matchesQuestionContest(exam.contest, PCPR_EXAM.contest) ||
    String(exam.year) !== PCPR_EXAM.year ||
    exam.career === "all" ||
    !PCPR_EXAM.roles.some((role) =>
      matchesQuestionCareer(
        role,
        PCPR_EXAM.contest,
        PCPR_EXAM.year,
        exam.career,
        exam.contest,
        exam.year,
      ),
    )
  )
    return null;
  if (selection) return `${available} questões nesta seleção; a prova original tem 100 itens.`;
  return `${available} questões disponíveis de 100 itens da prova original${available < 100 ? ". Acervo parcial" : ""}.`;
}

export function sessionExamCoverage(
  questions: { contest: string; career: string; year: string | number }[],
) {
  const first = questions[0];
  if (
    !first ||
    !questions.every(
      (q) =>
        q.contest === first.contest &&
        q.career === first.career &&
        String(q.year) === String(first.year),
    )
  )
    return null;
  return examCoverage(first, questions.length, true);
}
