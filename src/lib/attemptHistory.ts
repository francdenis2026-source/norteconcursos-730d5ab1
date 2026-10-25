// Histórico de tentativas de provas e simulados.
//
// Três coisas diferentes, nunca misturadas:
//  - nota da tentativa      -> regra da edição (simulator_attempt_results), ou pontuação simples;
//  - aproveitamento         -> acertos sobre o total e sobre as respondidas (simulator_attempts);
//  - pontos de ranking      -> calculados no servidor só com a 1ª resposta de cada questão
//                              (simulator_attempt_ranking); repetidas não somam.
// O resultado essencial vive em simulator_attempts. As tabelas/funções extras são opcionais: quando
// ainda não existem no banco, a tentativa aparece com a pontuação simples e sem dados de ranking.
import { supabase } from "@/integrations/supabase/client";
import {
  attemptDetails,
  type AttemptRow,
  type AttemptWithDetails,
  type RankingRow,
  type ResultRow,
} from "./attemptDetails";
export type {
  AttemptRow,
  AttemptWithDetails,
  AttemptDetails,
  AttemptRanking,
} from "./attemptDetails";

const rest = (table: string) =>
  supabase.from(table as never) as unknown as {
    select(columns: string): {
      in(column: string, values: string[]): PromiseLike<{ data: unknown; error: unknown }>;
    };
  };

/** Últimas tentativas do usuário com nota, aproveitamento e dados de ranking (quando disponíveis). */
export async function fetchAttemptHistory(
  userId: string,
  limit = 10,
  contestFilter?: "ENEM",
): Promise<AttemptWithDetails[]> {
  let request = supabase
    .from("simulator_attempts")
    .select(
      "id,title,total_questions,correct_answers,wrong_answers,blank_answers,accuracy,duration_seconds,finished_at",
    )
    .eq("user_id", userId);
  if (contestFilter) request = request.eq("contest_filter", contestFilter);
  const { data, error } = await request.order("finished_at", { ascending: false }).limit(limit);
  if (error) throw error;
  const rows = (data ?? []) as AttemptRow[];
  if (!rows.length) return [];
  const ids = rows.map((row) => row.id);
  const [results, ranking] = await Promise.all([
    Promise.resolve(
      rest("simulator_attempt_results")
        .select("attempt_id,scoring_rule,rule_verified,score,max_score,skipped_count")
        .in("attempt_id", ids),
    ).then(
      (r) => (r.error ? [] : ((r.data as ResultRow[] | null) ?? [])),
      () => [] as ResultRow[],
    ),
    // Pontos de ranking elegíveis por tentativa (get_simulator_ranking_result): só o dono consulta; tentativas
    // anteriores à reserva da primeira resposta devolvem nulo e aparecem sem dados de ranking.
    Promise.all(
      ids.map((id) =>
        Promise.resolve(
          supabase.rpc("get_simulator_ranking_result" as never, { _attempt: id } as never),
        ).then(
          (r): RankingRow | null => {
            const response = r as unknown as {
              data: { eligible: number; repeated: number; points: number } | null;
              error: unknown;
            };
            if (response.error || !response.data) return null;
            return {
              attempt_id: id,
              answered: response.data.eligible + response.data.repeated,
              counted: response.data.eligible,
              repeated: response.data.repeated,
              points: response.data.points,
              attempt_valid: true,
            };
          },
          () => null,
        ),
      ),
    ).then((rows) => rows.filter((row): row is RankingRow => row !== null)),
  ]);
  const resultById = new Map(results.map((r) => [r.attempt_id, r]));
  const rankingById = new Map(ranking.map((r) => [r.attempt_id, r]));
  return rows.map((row) => ({
    ...row,
    details: attemptDetails(row, resultById.get(row.id), rankingById.get(row.id)),
  }));
}
