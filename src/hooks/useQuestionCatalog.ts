// Carrega o acervo de questões ativas (provas oficiais, bancas, autorais e o
// caderno pessoal do aluno) exatamente como o Treinador de questões monta a
// sua pool — extraído pra um só lugar porque o Caderno de erros também
// precisa do texto completo das questões que o aluno errou.
import * as React from "react";
import { canonicalSubject } from "@/lib/subjects";
import { supabase } from "@/integrations/supabase/client";
import {
  type Answer,
  type Question,
  isEligibleQuestion,
  normalizeDifficulty,
  parseBasis,
  parseQuestion,
} from "@/lib/questionFormat";
import { fetchAllRows } from "@/lib/catalog";

export function useQuestionCatalog(userId: string | undefined, enabled: boolean) {
  const [catalog, setCatalog] = React.useState<Question[]>([]);
  const [hidden, setHidden] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!enabled) return;
    let active = true;
    void (async () => {
      try {
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
          data: await fetchAllRows((from, to) =>
            refine(supabase.from(table).select(base + ",content_status," + extra))
              .order("id")
              .range(from, to),
          ),
          error: null,
          gated: true,
        });
        const [officialResult, curatedResult, personalResult, boardResult] = await Promise.all([
          query(
            "official_exam_questions",
            "id,contest_name,exam_year,career_name,exam_board,subject,question_text,official_answer,review_note,legal_basis,state,career_category",
            "law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required,difficulty",
            (builder) => builder.eq("content_status", "active").neq("official_answer", "X"),
          ),
          query(
            "curated_question_catalog",
            "id,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,state,career_category",
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
            "id,board,contest_name,career_name,exam_year,subject,support_text,stem,options,official_answer,needs_visual,legal_review_required,law_version_checked_at,legal_basis,explanation,difficulty,state,career_category",
            "created_at",
            (builder) => builder.eq("content_status", "active").neq("official_answer", "X"),
          ).catch(() => ({ data: [], error: null, gated: true })), // tabela ainda não criada: segue sem elas
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
              legal_audit_completed:
                !row["legal_review_required"] || !!row["law_version_checked_at"],
            })),
            true,
          ).map((row) => {
            const opts = (row["options"] || {}) as Record<string, string>;
            const support = row["support_text"]
              ? `Texto-base:\n${String(row["support_text"])}\n\n`
              : "";
            return {
              id: String(row["id"]),
              source: "official" as const,
              table: "board_exam_questions" as const,
              contest: String(row["contest_name"]),
              year: String(row["exam_year"]),
              career: String(row["career_name"]),
              board: String(row["board"]),
              subject: canonicalSubject(String(row["subject"])),
              subtopic: null,
              text: `${support}${String(row["stem"])}\n${Object.entries(opts)
                .map(([letter, text]) => `(${letter}) ${text}`)
                .join("\n")}`,
              answer: String(row["official_answer"]) as Answer,
              explanation: String(
                row["explanation"] ||
                  "Gabarito definitivo da banca organizadora. Comentário pedagógico em preparação.",
              ),
              legalBasis: parseBasis(row["legal_basis"]),
              checkedAt: row["law_version_checked_at"]
                ? String(row["law_version_checked_at"])
                : null,
              difficulty: normalizeDifficulty(row["difficulty"]),
              state: String(row["state"] || ""),
              category: String(row["career_category"] || ""),
              kind: "multiple_choice" as const,
            };
          }),
          ...gate(
            (officialResult.data || []) as Array<Record<string, unknown>>,
            officialResult.gated,
            (row) => !(row["legal_review_required"] && !row["legal_audit_completed"]),
          ).map((row) => ({
            id: String(row["id"]),
            source: "official" as const,
            table: "official_exam_questions" as const,
            contest: String(row["contest_name"]),
            year: String(row["exam_year"]),
            career: String(row["career_name"] || "Carreira policial"),
            board: String(row["exam_board"] || "CEBRASPE"),
            subject: canonicalSubject(String(row["subject"])),
            subtopic: null,
            text: String(row["question_text"]),
            answer: String(row["official_answer"]) as Answer,
            explanation: String(
              row["review_note"] || "Item conferido com o gabarito definitivo da prova oficial.",
            ),
            legalBasis: parseBasis(row["legal_basis"]),
            checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
            difficulty: normalizeDifficulty(row["difficulty"]),
            state: String(row["state"] || ""),
            category: String(row["career_category"] || ""),
          })),
          ...gate(
            (curatedResult.data || []) as Array<Record<string, unknown>>,
            curatedResult.gated,
          ).map((row) => ({
            id: String(row["id"]),
            source: "curated" as const,
            table: "curated_question_catalog" as const,
            contest: String(row["contest_name"]),
            year: String(row["contest_year"]),
            career: String(row["career_name"] || "Carreira policial"),
            board: String(row["exam_board"] || "Banca"),
            subject: canonicalSubject(String(row["subject"])),
            subtopic: row["subtopic"] ? String(row["subtopic"]) : null,
            text: String(row["question_text"]),
            answer: String(row["official_answer"]) as Answer,
            explanation: String(row["explanation"] || "Explicação editorial em revisão."),
            legalBasis: parseBasis(row["legal_basis"]),
            checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
            difficulty: normalizeDifficulty(row["difficulty"]),
            state: String(row["state"] || ""),
            category: String(row["career_category"] || ""),
          })),
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
              subtopic: row["subtopic"] ? String(row["subtopic"]) : null,
              text: String(row["question_text"]),
              answer: String(row["official_answer"]) as Answer,
              explanation: String(row["explanation"] || "Explicação pedagógica em revisão."),
              legalBasis: parseBasis(row["legal_basis"]),
              checkedAt: row["law_version_checked_at"]
                ? String(row["law_version_checked_at"])
                : null,
              difficulty: normalizeDifficulty(row["difficulty"]),
              state: String(row["state"] || ""),
              category: String(row["career_category"] || ""),
            })),
        ];
        if (active) {
          setCatalog(built);
          setHidden(hiddenCount);
        }
      } catch (loadError) {
        if (active)
          setError(
            loadError instanceof Error ? loadError.message : "Não foi possível carregar o treino.",
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [enabled, userId]);

  return { catalog, hidden, loading, error };
}
