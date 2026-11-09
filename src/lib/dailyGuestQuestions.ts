import { canonicalSubject } from "./subjects";
import { needsMissingSupportText } from "./questionText";
import {
  isEligibleQuestion,
  normalizeDifficulty,
  parseBasis,
  parseQuestion,
  isPlaceholderExplanation,
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
export function isGuestSecurityCareer(contest: string, career: string, category: string) {
  const text = `${contest} ${career} ${category}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return /policia|policial|bombeir|penitenci|execucao penal|seguranca publica|guarda (civil|municipal)|perito criminal|medico legista|\b(pf|prf|depen|senappen|cbm)\b/.test(
    text,
  );
}
export function guestExplanation(note: string) {
  return note.replace(/\s*Conferência individual em fontes oficiais em [\s\S]*$/i, "").trim();
}
export function hasGuestExplanation(note: string) {
  return (
    guestExplanation(note).length >= 80 &&
    !isPlaceholderExplanation(note) &&
    !/transcri[çc][ãa]o verbatim|importad[ao] do caderno|aguardando revis|^\s*(Revisad[ao]|Arquivad[ao]|Retid[ao])/i.test(
      note,
    ) &&
    !/alternativ|op[çc][ãa]o [A-E]/i.test(note)
  );
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
      const answer = String(row["official_answer"]) as Answer;
      if (
        options.length ||
        /(?:^|[\s:;.])\(?[AB]\)/.test(parsed.stem) ||
        /assinale|alternativ|op[çc][ãa]o (correta|incorreta)/i.test(parsed.stem) ||
        !["C", "E"].includes(answer) ||
        !/CEBRASPE|CESPE/i.test(String(row["exam_board"])) ||
        !isGuestSecurityCareer(
          String(row["contest_name"] ?? ""),
          String(row["career_name"] ?? ""),
          String(row["career_category"] ?? ""),
        ) ||
        !hasGuestExplanation(String(row["review_note"] ?? ""))
      )
        return [];
      const kind = "true_false" as const;
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
        explanation: guestExplanation(String(row["review_note"])),
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
/**
 * Public preview rows are already filtered by the SECURITY DEFINER RPC.
 * The server deliberately sends no answer key or explanation before grading.
 * "C" is a UI placeholder only and must never be used to grade locally.
 */
export function dailyGuestQuestionPreviews(rows: Record<string, unknown>[]): Question[] {
  const seen = new Set<string>();
  return rows.flatMap((row) => {
    const text = String(row["question_text"] ?? "");
    const id = String(row["id"] ?? "");
    if (!id || !text || seen.has(id)) return [];
    seen.add(id);
    return [{
      id,
      source: "official" as const,
      table: "official_exam_questions" as const,
      contest: String(row["contest_name"] ?? ""),
      year: String(row["exam_year"] ?? ""),
      career: String(row["career_name"] || "Carreira não informada"),
      board: String(row["exam_board"] || "Banca não informada"),
      subject: canonicalSubject(String(row["subject"] ?? "")),
      subtopic: null,
      text,
      answer: "C" as Answer,
      kind: "true_false" as const,
      explanation: "",
      legalBasis: [],
      checkedAt: null,
      difficulty: normalizeDifficulty(row["difficulty"]),
      state: String(row["state"] || ""),
      category: String(row["career_category"] || ""),
    }];
  }).slice(0, 10);
}
export function pendingGuestQuestions(questions: Question[], progress: GuestProgress) {
  const ids = new Set(progress.answers.map((a) => a.id)),
    keys = new Set(progress.answers.map((a) => a.key));
  return questions
    .filter((q) => !ids.has(q.id) && !keys.has(guestContentKey(q.text)))
    .slice(progress.legacyUsed, progress.legacyUsed + Math.max(0, 10 - progress.used));
}
