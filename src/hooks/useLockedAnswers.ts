// Respostas que o aluno já deu no Treinador, pra travar a questão quando ele
// voltar a vê-la: pode revisar, mas não responder de novo. Só a 1ª resposta
// de cada questão conta (mesmo critério do ranking/medalhas).
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Answer } from "@/lib/questionFormat";
import { fetchAllRows } from "@/lib/catalog";

export type LockedAnswer = { selected: Answer; isCorrect: boolean };
export const lockedKey = (source: string, id: string) => `${source}:${id}`;

type Row = {
  question_id: string;
  question_source: string;
  selected_answer: string;
  is_correct: boolean;
  created_at: string;
};

export function useLockedAnswers(userId: string | undefined, enabled: boolean) {
  const [locked, setLocked] = React.useState<Map<string, LockedAnswer>>(new Map());
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!enabled || !userId) {
      setLoading(false);
      return;
    }
    let active = true;
    void (async () => {
      try {
        const rows = await fetchAllRows<Row>((from, to) =>
          supabase
            .from("question_training_responses")
            .select("question_id,question_source,selected_answer,is_correct,created_at")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .range(from, to),
        );
        const map = new Map<string, LockedAnswer>();
        for (const row of rows) {
          const key = lockedKey(row.question_source, row.question_id);
          if (!map.has(key))
            map.set(key, { selected: row.selected_answer as Answer, isCorrect: row.is_correct });
        }
        if (active) setLocked(map);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [enabled, userId]);

  const markLocked = React.useCallback((source: string, id: string, answer: LockedAnswer) => {
    setLocked((prev) => {
      const copy = new Map(prev);
      copy.set(lockedKey(source, id), answer);
      return copy;
    });
  }, []);

  return { locked, loading, markLocked };
}
