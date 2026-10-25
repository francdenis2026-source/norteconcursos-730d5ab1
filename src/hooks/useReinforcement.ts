// Tentativas de reforço (questões refeitas): servem para acompanhar a recuperação de erros,
// mas nunca contam para ranking, medalhas ou limite diário. A 1ª resposta é a oficial.
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { lockedKey } from "@/hooks/useLockedAnswers";

export type Reinforced = { lastCorrect: boolean; attempts: number };
type Row = { question_id: string; question_source: string; is_correct: boolean };

export function useReinforcement(userId: string | undefined, enabled: boolean) {
  const [map, setMap] = React.useState<Map<string, Reinforced>>(new Map());
  React.useEffect(() => {
    if (!enabled || !userId) return;
    let active = true;
    void (async () => {
      try {
        const rows = await fetchAllRows<Row>((from, to) =>
          supabase
            .from("question_reinforcement_attempts")
            .select("question_id,question_source,is_correct")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .range(from, to),
        );
        const next = new Map<string, Reinforced>();
        for (const r of rows) {
          const k = lockedKey(r.question_source, r.question_id);
          next.set(k, { lastCorrect: r.is_correct, attempts: (next.get(k)?.attempts ?? 0) + 1 });
        }
        if (active) setMap(next);
      } catch {
        /* tabela ainda não criada: o reforço funciona, mas sem histórico */
      }
    })();
    return () => { active = false; };
  }, [enabled, userId]);
  const mark = React.useCallback((source: string, id: string, correct: boolean) => {
    setMap((prev) => {
      const copy = new Map(prev);
      const k = lockedKey(source, id);
      copy.set(k, { lastCorrect: correct, attempts: (prev.get(k)?.attempts ?? 0) + 1 });
      return copy;
    });
  }, []);
  return { reinforced: map, markReinforced: mark };
}
