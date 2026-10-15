import { canonicalSubject } from "./subjects";
import { needsMissingSupportText } from "./questionText";
import {
  isEligibleQuestion,
  normalizeDifficulty,
  parseBasis,
  parseQuestion,
  type Answer,
  type Question,
} from "./questionFormat";
import type { GuestProgress } from "./guestProgress";
export function guestContentKey(text: string) {
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
  let a = 2166136261,
    b = 5381;
  for (const c of normalized) {
    a = Math.imul(a ^ c.charCodeAt(0), 16777619);
    b = Math.imul(b, 33) ^ c.charCodeAt(0);
  }
  return `${normalized.length}:${a >>> 0}:${b >>> 0}`;
}
export function dailyGuestQuestions(rows: Record<string, unknown>[]): Question[] {
  const ids = new Set<string>(),
    texts = new Set<string>();
  return rows
    .filter(isEligibleQuestion)
    .flatMap((row) => {
      const text = String(row["question_text"] ?? ""),
        parsed = parseQuestion(text),
        options = parsed.options;
      if (
        (options.length > 0 && options.length < 4) ||
        (!options.length &&
          /(?:^|[\s:;.])\(?A\)/.test(parsed.stem) &&
          /(?:^|[\s:;.])\(?B\)/.test(parsed.stem))
      )
        return [];
      const answer = String(row["official_answer"]) as Answer;
      const kind =
        options.length >= 4
          ? ("multiple_choice" as const)
          : /CEBRASPE|CESPE|julgue|certo ou errado/i.test(String(row["exam_board"]) + " " + text) &&
              ["C", "E"].includes(answer)
            ? ("true_false" as const)
            : null;
      if (!kind || (kind === "multiple_choice" && !options.some((o) => o.letter === answer)))
        return [];
      const question: Question = {
        id: String(row["id"]),
        source: "official",
        table: "official_exam_questions",
        contest: String(row["contest_name"]),
        year: String(row["exam_year"]),
        career: String(row["career_name"] || "Carreira não informada"),
        board: String(row["exam_board"] || "Banca não informada"),
        subject: canonicalSubject(String(row["subject"])),
        subtopic: null,
        text,
        answer,
        kind,
        explanation: String(
          row["review_note"] || "Gabarito oficial. Comentário didático ainda não disponível.",
        ),
        legalBasis: parseBasis(row["legal_basis"]),
        checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
        difficulty: normalizeDifficulty(row["difficulty"]),
        state: String(row["state"] || ""),
        category: String(row["career_category"] || ""),
      };
      const key = guestContentKey(text);
      if (needsMissingSupportText(question) || ids.has(question.id) || texts.has(key)) return [];
      ids.add(question.id);
      texts.add(key);
      return [question];
    })
    .slice(0, 10);
}
export function pendingGuestQuestions(questions: Question[], progress: GuestProgress) {
  const ids = new Set(progress.answers.map((a) => a.id)),
    keys = new Set(progress.answers.map((a) => a.key));
  return questions
    .filter((q) => !ids.has(q.id) && !keys.has(guestContentKey(q.text)))
    .slice(progress.legacyUsed, progress.legacyUsed + Math.max(0, 10 - progress.used));
}
