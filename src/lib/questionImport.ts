/** Conservative import comparison: preserve accents, punctuation, numbers and alternatives. */
export function normalizeImportText(value: string | null | undefined): string {
  return (value ?? "")
    .normalize("NFKC")
    .replace(/[\u200b\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export interface BoardImportQuestion {
  id?: string;
  board: string;
  contest_name: string;
  career_name: string;
  exam_year: number;
  exam_type: string;
  item_number: number;
  subject: string;
  stem: string;
  options: Record<string, string>;
  official_answer: string;
  source_url: string;
  answer_key_url: string;
  support_text?: string | null;
  figure_urls?: unknown;
  needs_visual?: boolean;
  [key: string]: unknown;
}

export function parseBoardImport(value: unknown): BoardImportQuestion[] {
  if (!Array.isArray(value) || !value.length || value.length > 5000)
    throw new Error("Envie um arquivo com 1 a 5.000 questões.");
  return value.map((raw, index) => {
    const q = raw as BoardImportQuestion;
    const fail = () => {
      throw new Error(
        `Questão ${index + 1}: confira prova, enunciado, alternativas, gabarito e fontes.`,
      );
    };
    if (
      !q ||
      typeof q !== "object" ||
      [
        "board",
        "contest_name",
        "career_name",
        "exam_type",
        "subject",
        "stem",
        "source_url",
        "answer_key_url",
      ].some((key) => typeof q[key] !== "string" || !normalizeImportText(q[key] as string)) ||
      !Number.isInteger(q.exam_year) ||
      !Number.isInteger(q.item_number) ||
      q.item_number < 1 ||
      (q.support_text != null && typeof q.support_text !== "string") ||
      !q.options ||
      Array.isArray(q.options) ||
      typeof q.options !== "object"
    )
      fail();
    const labels = Object.keys(q.options).sort().join("");
    if (
      (q.needs_visual !== undefined && typeof q.needs_visual !== "boolean") ||
      !["ABCD", "ABCDE"].includes(labels) ||
      Object.values(q.options).some(
        (v) => typeof v !== "string" || (!normalizeImportText(v) && q.needs_visual !== true),
      ) ||
      typeof q.official_answer !== "string" ||
      ![...labels, "X"].includes(q.official_answer)
    )
      fail();
    if (
      q.figure_urls != null &&
      (!Array.isArray(q.figure_urls) || q.figure_urls.some((v) => typeof v !== "string"))
    )
      fail();
    for (const field of ["source_url", "answer_key_url"]) {
      try {
        const url = new URL(q[field] as string);
        if (url.protocol !== "https:") fail();
      } catch {
        fail();
      }
    }
    // Never let a file choose identifiers, bypass fingerprints or publish unreviewed content.
    const { id: _id, import_content_key: _content, import_unique_key: _unique, ...safe } = q;
    return { ...safe, content_status: "under_review" } as BoardImportQuestion;
  });
}

const scope = (q: BoardImportQuestion) =>
  [q.board, q.contest_name, q.career_name, String(q.exam_year)].map(normalizeImportText);
export const boardImportContentKey = (q: BoardImportQuestion) =>
  JSON.stringify([
    ...scope(q),
    normalizeImportText(q.support_text),
    normalizeImportText(q.stem),
    Object.entries(q.options)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, text]) => [label, normalizeImportText(text)]),
    q.figure_urls ?? [],
    q.needs_visual === true && !(Array.isArray(q.figure_urls) && q.figure_urls.length)
      ? [normalizeImportText(q.exam_type), q.item_number]
      : [],
  ]);
const positionKey = (q: BoardImportQuestion) =>
  JSON.stringify([...scope(q), normalizeImportText(q.exam_type), q.item_number]);

export interface ImportIssue {
  index: number;
  item: number;
  reason: "duplicate" | "answer_conflict" | "position_conflict";
  origin: "file" | "catalog";
  existingId?: string;
}
export interface BoardImportPlan {
  ready: BoardImportQuestion[];
  issues: ImportIssue[];
  duplicates: number;
  conflicts: number;
}

/** Content and printed position are checked separately; a conflicting answer is never silently discarded. */
export function planBoardImport(
  incoming: BoardImportQuestion[],
  stored: BoardImportQuestion[],
): BoardImportPlan {
  const content = new Map<string, Array<{ q: BoardImportQuestion; origin: "file" | "catalog" }>>();
  const positions = new Map<
    string,
    Array<{ q: BoardImportQuestion; origin: "file" | "catalog" }>
  >();
  const remember = (q: BoardImportQuestion, origin: "file" | "catalog") => {
    for (const [map, key] of [
      [content, boardImportContentKey(q)],
      [positions, positionKey(q)],
    ] as const) {
      const group = map.get(key) ?? [];
      group.push({ q, origin });
      map.set(key, group);
    }
  };
  for (const q of stored) remember(q, "catalog");
  const ready: BoardImportQuestion[] = [],
    issues: ImportIssue[] = [];
  incoming.forEach((q, index) => {
    const key = boardImportContentKey(q);
    const sameContent = content.get(key) ?? [];
    const samePosition = positions.get(positionKey(q)) ?? [];
    const conflict = sameContent.find((other) => other.q.official_answer !== q.official_answer);
    const occupied = samePosition.find((other) => boardImportContentKey(other.q) !== key);
    const other = conflict ?? occupied ?? sameContent[0];
    if (other)
      issues.push({
        index: index + 1,
        item: q.item_number,
        reason: conflict ? "answer_conflict" : occupied ? "position_conflict" : "duplicate",
        origin: other.origin,
        ...(other.q.id ? { existingId: other.q.id } : {}),
      });
    else ready.push(q);
    remember(q, "file");
  });
  return {
    ready,
    issues,
    duplicates: issues.filter((i) => i.reason === "duplicate").length,
    conflicts: issues.filter((i) => i.reason !== "duplicate").length,
  };
}

const LEGAL_REVIEW_TITLES: Record<string, string> = {
  verificada: "Norma vigente conferida",
  sem_alteracao_localizada: "Sem alteração legislativa localizada",
  atemporal: "Conteúdo atemporal conferido",
};

export interface BoardExamReviewMeta {
  status?: unknown;
  checked_at?: unknown;
  basis?: unknown;
}

/**
 * Linha pronta para board_exam_questions: os metadados de revisão da IDECAN
 * (legal_review, answer_key_status) são preservados nas colunas de revisão da
 * tabela e chaves desconhecidas nunca chegam à API. Arquivos sem esses campos
 * (FGV) passam inalterados.
 */
export function toBoardExamRow(q: BoardImportQuestion): Record<string, unknown> {
  const row: Record<string, unknown> = { ...q };
  delete row.id;
  delete row.import_content_key;
  delete row.import_unique_key;
  const review =
    q.legal_review && typeof q.legal_review === "object"
      ? (q.legal_review as BoardExamReviewMeta)
      : null;
  delete row.legal_review;
  const answerKeyStatus = typeof q.answer_key_status === "string" ? q.answer_key_status : null;
  delete row.answer_key_status;
  if (review && typeof review.status === "string") {
    const title = LEGAL_REVIEW_TITLES[review.status];
    const basis =
      typeof review.basis === "string" && review.basis.startsWith("https://") ? review.basis : null;
    if (title) {
      row["legal_review_required"] = false;
      row["law_version_checked_at"] =
        typeof review.checked_at === "string" && /^\d{4}-\d{2}-\d{2}$/.test(review.checked_at)
          ? `${review.checked_at}T12:00:00Z`
          : null;
      row["legal_basis"] = basis ? [{ title, url: basis }] : [];
    } else {
      // Status de conferência desconhecido: a verificação legislativa precisa ser refeita.
      row["legal_review_required"] = true;
    }
  }
  if (answerKeyStatus && answerKeyStatus !== "definitivo")
    row["review_note"] = `Gabarito ${answerKeyStatus} publicado pela banca; confirme o gabarito definitivo antes de qualquer ativação.`;
  return row;
}
