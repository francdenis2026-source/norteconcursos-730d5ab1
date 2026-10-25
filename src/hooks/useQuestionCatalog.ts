import { parseDidacticProvenance } from "@/lib/didacticQuestion";
// Carrega o acervo de questões ativas (provas oficiais, bancas, autorais e o
// caderno pessoal do aluno) exatamente como o Treinador de questões monta a
// sua pool — extraído pra um só lugar porque o Caderno de erros também
// precisa do texto completo das questões que o aluno errou.
import { useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import {
  canonicalBoard,
  canonicalSubject,
  canonicalTopic,
  canonicalCareerName,
} from "@/lib/subjects";
import { supabase } from "@/integrations/supabase/client";
import {
  type Answer,
  type Question,
  isEligibleQuestion,
  normalizeDifficulty,
  parseBasis,
  parseQuestion,
  PRELIMINARY_KEY_MARK,
} from "@/lib/questionFormat";
import { fetchAllRows, isMissingQuestionTable, isMissingQuestionSupport } from "@/lib/catalog";

/** Junta o texto de apoio ligado ao item (se houver) ao enunciado, no formato lido por parseQuestion. */
function withSupportText(support: unknown, text: string): string {
  const s = support as { label?: string; body?: string } | null | undefined;
  if (!s?.body) return text;
  return `Texto-base${s.label ? ` [${s.label}]` : ""}:\n${s.body}\n\n[[/texto-base]]\n${text}`;
}

const EMPTY_CATALOG: Question[] = [];

/** Linha de official_exam_questions -> questão do acervo (mesma regra no treinador e na contagem de provas). */
function officialRowToQuestion(row: Record<string, unknown>): Question {
  return {
    id: String(row["id"]),
    source: "official" as const,
    table: "official_exam_questions" as const,
    syllabusTopicId:
      (row["current_syllabus_topic_id"] ?? row["syllabus_topic_id"])
        ? String(row["current_syllabus_topic_id"] ?? row["syllabus_topic_id"])
        : null,
    contest: String(row["contest_name"]),
    year: String(row["exam_year"]),
    career: canonicalCareerName(String(row["career_name"] || "Carreira policial")),
    board: canonicalBoard(String(row["exam_board"] ?? "")) || "Não informada",
    subject: canonicalSubject(String(row["subject"])),
    subtopic: null,
    text: withSupportText(row["support"], String(row["question_text"])),
    answer: String(row["official_answer"]) as Answer,
    explanation: String(
      row["review_note"] || "Item conferido com o gabarito definitivo da prova oficial.",
    ),
    legalBasis: parseBasis(row["legal_basis"]),
    checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
    difficulty: normalizeDifficulty(row["difficulty"]),
    state: String(row["state"] || ""),
    category: String(row["career_category"] || ""),
    itemNumber: Number(row["item_number"]) || undefined,
    testedTopic: row["tested_topic"] ? String(row["tested_topic"]) : null,
  } as Question;
}

/** Linha elegível de prova oficial (mesmo filtro jurídico do acervo completo). */
const officialRowEligible = (row: Record<string, unknown>) =>
  !(row["legal_review_required"] && !row["legal_audit_completed"]) && isEligibleQuestion(row);

const OFFICIAL_COLUMNS =
  "id,syllabus_topic_id,current_syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,tested_topic,subject,question_text,official_answer,review_note,legal_basis,state,career_category,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required,difficulty";

/**
 * Itens oficiais de UM ano de prova, para contar disponibilidade sem baixar o acervo inteiro
 * (a tela inicial só precisa de poucos números; o acervo completo tem dezenas de milhares de linhas).
 */
export function useOfficialYearQuestions(year: string, enabled: boolean) {
  const result = useQuery({
    queryKey: ["official-year-questions", year],
    enabled,
    staleTime: 5 * 60_000,
    retry: 0,
    queryFn: async ({ signal }) => {
      const load = (withSupport: boolean) =>
        fetchAllRows<Record<string, unknown>>(
          (from, to) =>
            supabase
              .from("official_exam_questions")
              .select(
                OFFICIAL_COLUMNS +
                  (withSupport ? ",support:question_support_texts(label,body)" : ""),
              )
              .eq("content_status", "active")
              .neq("official_answer", "X")
              .eq("exam_year", Number(year))
              .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(20000)]))
              .order("id")
              .range(from, to) as unknown as PromiseLike<{
              data: Record<string, unknown>[] | null;
              error: unknown;
            }>,
          1000,
        );
      const rows = await load(true).catch((error: unknown) => {
        if (isMissingQuestionSupport(error)) return load(false);
        throw error;
      });
      return rows.filter(officialRowEligible).map(officialRowToQuestion);
    },
  });
  return {
    catalog: result.data ?? EMPTY_CATALOG,
    loading: result.isPending,
    error: result.error ? "Não foi possível carregar a disponibilidade da prova." : null,
  };
}

async function loadQuestionCatalog(queryClient: QueryClient, userId: string | undefined) {
  const query = async (
    table:
      | "official_exam_questions"
      | "curated_question_catalog"
      | "question_bank"
      | "board_exam_questions",
    base: string,
    extra: string,
    refine: (
      builder: ReturnType<ReturnType<typeof supabase.from>["select"]>,
    ) => ReturnType<ReturnType<typeof supabase.from>["select"]>,
  ) => ({
    data: await queryClient.fetchQuery({
      queryKey: ["question-catalog", userId, table, base, extra],
      staleTime: 60_000,
      retry: 0,
      queryFn: ({ signal }) =>
        fetchAllRows(
          (from, to) =>
            refine(supabase.from(table).select(base + ",content_status," + extra))
              .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(20000)]))
              .order("id")
              .range(from, to),
          1000,
        ),
    }),
    error: null,
    gated: true,
  });
  const currencyPromise = queryClient
    .fetchQuery({
      queryKey: ["question-currency", userId],
      staleTime: 300_000,
      retry: 0,
      queryFn: ({ signal }) =>
        fetchAllRows<Record<string, unknown>>(
          (from, to) =>
            supabase
              .from("question_currency" as never)
              .select("question_table,question_id,tags,note")
              .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(20000)]))
              .order("question_id")
              .range(from, to) as unknown as PromiseLike<{
              data: Record<string, unknown>[] | null;
              error: unknown;
            }>,
        ),
    })
    .catch(() => []);

  // Itens de prova podem ter um texto de apoio compartilhado (question_support_texts).
  const officialQuery = (withSupport: boolean) =>
    query(
      "official_exam_questions",
      "id,syllabus_topic_id,current_syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,tested_topic,subject,question_text,official_answer,review_note,legal_basis,state,career_category" +
        (withSupport ? ",support:question_support_texts(label,body)" : ""),
      "law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required,difficulty",
      (builder) => builder.eq("content_status", "active").neq("official_answer", "X"),
    );
  const [officialResult, curatedResult, personalResult, boardResult] = await Promise.all([
    officialQuery(true).catch((error: unknown) => {
      if (isMissingQuestionSupport(error)) return officialQuery(false);
      throw error;
    }), // sem a coluna de texto de apoio ainda: segue sem ela
    query(
      "curated_question_catalog",
      "id,syllabus_topic_id,contest_name,contest_year,career_name,exam_board,tested_topic,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,state,career_category,is_original,didactic_provenance",
      "law_version_checked_at",
      (builder) => builder.eq("content_status", "active"),
    ),
    !userId
      ? Promise.resolve({ data: [], error: null, gated: true })
      : query(
          "question_bank",
          "id,contest_name,contest_year,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,state,career_category",
          "law_version_checked_at",
          (builder) => builder.eq("user_id", userId).eq("content_status", "active"),
        ),
    // Provas de bancas com alternativas A–E (FGV etc.): só entram depois de revisadas e ativadas.
    query(
      "board_exam_questions",
      "id,syllabus_topic_id,board,contest_name,career_name,exam_year,item_number,tested_topic,figure_urls,subject,support_text,stem,options,official_answer,needs_visual,legal_review_required,law_version_checked_at,legal_basis,explanation,difficulty,state,career_category,review_note",
      "created_at",
      (builder) => builder.eq("content_status", "active").neq("official_answer", "X"),
    ).catch((error: unknown) => {
      if (isMissingQuestionTable(error)) return { data: [], error: null, gated: true };
      throw error;
    }), // tabela ainda não criada: segue sem elas
  ]);
  let hiddenCount = 0;
  const gate = (
    rows: Array<Record<string, unknown>>,
    gated: boolean,
    extraOk: (row: Record<string, unknown>) => boolean = () => true,
  ) =>
    rows.filter((row) => {
      const ok = extraOk(row) && isEligibleQuestion(row);
      if (!ok) hiddenCount += 1;
      return ok;
    });
  if (officialResult.error) throw officialResult.error;
  if (curatedResult.error) throw curatedResult.error;
  if (personalResult.error) throw personalResult.error;
  // tabela ainda não criada no banco: segue sem as questões de bancas
  const boardRows = boardResult.error
    ? []
    : ((boardResult.data || []) as Array<Record<string, unknown>>);
  const built: Question[] = [
    ...gate(
      boardRows.map((row) => ({
        ...row,
        context_review_required: row["needs_visual"],
        legal_audit_completed: !row["legal_review_required"] || !!row["law_version_checked_at"],
      })),
      true,
    ).map((row) => {
      const opts = (row["options"] || {}) as Record<string, string>;
      const support = row["support_text"] ? `Texto-base:\n${String(row["support_text"])}\n\n` : "";
      return {
        id: String(row["id"]),
        source: "official" as const,
        table: "board_exam_questions" as const,
        syllabusTopicId: row["syllabus_topic_id"] ? String(row["syllabus_topic_id"]) : null,
        contest: String(row["contest_name"]),
        year: String(row["exam_year"]),
        career: canonicalCareerName(String(row["career_name"])),
        board: canonicalBoard(String(row["board"] ?? "")) || "Não informada",
        subject: canonicalSubject(String(row["subject"])),
        subtopic: null,
        text: `${support}${String(row["stem"])}\n${Object.entries(opts)
          .map(([letter, text]) => `(${letter}) ${text}`)
          .join("\n")}`,
        answer: String(row["official_answer"]) as Answer,
        explanation: String(
          row["explanation"] ||
            `Gabarito ${String(row["review_note"] ?? "").includes(PRELIMINARY_KEY_MARK) ? "preliminar" : "definitivo"} da banca organizadora. Comentário pedagógico em preparação.`,
        ),
        legalBasis: parseBasis(row["legal_basis"]),
        checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
        difficulty: normalizeDifficulty(row["difficulty"]),
        state: String(row["state"] || ""),
        category: String(row["career_category"] || ""),
        kind: "multiple_choice" as const,
        preliminaryKey: String(row["review_note"] ?? "").includes(PRELIMINARY_KEY_MARK),
        itemNumber: Number(row["item_number"]) || undefined,
        testedTopic: row["tested_topic"] ? String(row["tested_topic"]) : null,
        figures: Array.isArray(row["figure_urls"]) ? (row["figure_urls"] as string[]) : undefined,
      };
    }),
    ...gate(
      (officialResult.data || []) as Array<Record<string, unknown>>,
      officialResult.gated,
      (row) => !(row["legal_review_required"] && !row["legal_audit_completed"]),
    ).map(officialRowToQuestion),
    ...gate((curatedResult.data || []) as Array<Record<string, unknown>>, curatedResult.gated).map(
      (row) => ({
        id: String(row["id"]),
        source: "curated" as const,
        table: "curated_question_catalog" as const,
        isOriginal: row["is_original"] === true,
        didacticProvenance: parseDidacticProvenance(row["didactic_provenance"]),
        syllabusTopicId: row["syllabus_topic_id"] ? String(row["syllabus_topic_id"]) : null,
        contest: String(row["contest_name"]),
        year: String(row["contest_year"]),
        career: canonicalCareerName(String(row["career_name"] || "Carreira policial")),
        board: canonicalBoard(String(row["exam_board"] ?? "")) || "Não informada",
        subject: canonicalSubject(String(row["subject"])),
        subtopic: canonicalTopic(row["subtopic"] ? String(row["subtopic"]) : null),
        text: String(row["question_text"]),
        answer: String(row["official_answer"]) as Answer,
        explanation: String(row["explanation"] || "Explicação editorial em revisão."),
        legalBasis: parseBasis(row["legal_basis"]),
        checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
        difficulty: normalizeDifficulty(row["difficulty"]),
        state: String(row["state"] || ""),
        category: String(row["career_category"] || ""),
        testedTopic: row["tested_topic"] ? String(row["tested_topic"]) : null,
      }),
    ),
    ...((personalResult.data || []) as Array<Record<string, unknown>>)
      .filter(isEligibleQuestion)
      .map((row) => ({
        id: String(row["id"]),
        source: "personal" as const,
        table: "question_bank" as const,
        contest: String(row["contest_name"]),
        year: String(row["contest_year"]),
        career: "Meu caderno",
        board: "Meu caderno",
        kind: parseQuestion(String(row["question_text"])).options.length
          ? ("multiple_choice" as const)
          : ("true_false" as const),
        subject: canonicalSubject(String(row["subject"])),
        subtopic: canonicalTopic(row["subtopic"] ? String(row["subtopic"]) : null),
        text: String(row["question_text"]),
        answer: String(row["official_answer"]) as Answer,
        explanation: String(row["explanation"] || "Explicação pedagógica em revisão."),
        legalBasis: parseBasis(row["legal_basis"]),
        checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
        difficulty: normalizeDifficulty(row["difficulty"]),
        state: String(row["state"] || ""),
        category: String(row["career_category"] || ""),
      })),
  ];
  // Etiquetas do filtro "Atual" (question_currency). Tabela ainda não criada ou sem permissão: segue sem elas.
  try {
    const rows = await currencyPromise;
    const marks = new Map<string, { tags: string[]; note?: string }>();
    for (const row of rows) {
      const tags = Array.isArray(row["tags"]) ? (row["tags"] as string[]) : [];
      if (!tags.length) continue;
      const note = row["note"] ? String(row["note"]) : undefined;
      marks.set(`${String(row["question_table"])}:${String(row["question_id"])}`, {
        tags,
        ...(note ? { note } : {}),
      });
    }
    for (const question of built) {
      const mark = question.table ? marks.get(`${question.table}:${question.id}`) : undefined;
      if (!mark) continue;
      question.currencyTags = mark.tags;
      if (mark.note) question.currencyNote = mark.note;
    }
  } catch {
    /* Marcação de atualidade é um recurso extra: nunca impede o treino. */
  }
  return { catalog: built, hidden: hiddenCount };
}

export function useQuestionCatalog(userId: string | undefined, enabled: boolean) {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["question-catalog-view", userId],
    enabled,
    staleTime: 60_000,
    retry: 0,
    queryFn: () => loadQuestionCatalog(queryClient, userId),
  });
  const reload = () => {
    queryClient.removeQueries({ queryKey: ["question-catalog", userId] });
    return queryClient.resetQueries({ queryKey: ["question-catalog-view", userId], exact: true });
  };
  return {
    catalog: result.data?.catalog ?? EMPTY_CATALOG,
    hidden: result.data?.hidden ?? 0,
    loading: result.isPending,
    error: result.error
      ? result.error instanceof Error
        ? result.error.message
        : "Não foi possível carregar o treino."
      : null,
    reload,
  };
}
