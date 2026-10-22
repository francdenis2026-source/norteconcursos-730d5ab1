import "./QuestionCountBadge.css";
import { BookOpenCheck, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function QuestionCountBadge() {
  const { data } = useQuery({
    queryKey: ["public-question-summary"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_question_summary");
      if (error) throw error;
      const summary = data as { registered?: unknown; available?: unknown } | null;
      if (
        !summary ||
        typeof summary.registered !== "number" ||
        typeof summary.available !== "number" ||
        !Number.isSafeInteger(summary.registered) ||
        summary.registered < 0 ||
        !Number.isSafeInteger(summary.available) ||
        summary.available < 0
      ) {
        throw new Error("Resumo de questões indisponível");
      }
      return summary as { registered: number; available: number };
    },
  });
  const format = (n: number) => n.toLocaleString("pt-BR");
  return (
    <a href="#plataforma" className="question-count-badge">
      <span className="question-count-icon" aria-hidden="true">
        <BookOpenCheck />
      </span>
      <span className="question-count-content">
        <span className="question-count-eyebrow">Banco de questões</span>
        <span className="question-count-main">
          <strong>{data ? format(data.available) : "Questões"}</strong>
          <span>
            {data
              ? data.available === 1
                ? "questão disponível para treinar"
                : "questões disponíveis para treinar"
              : "para sua preparação"}
          </span>
        </span>
        <span className="question-count-detail">
          {data ? (
            <>
              <span className="question-count-registered">
                <strong>{format(data.registered)}</strong>
                <span>{data.registered === 1 ? "cadastrada no total" : "cadastradas no total"}</span>
              </span>
              <span className="question-count-sources">Questões oficiais e autorais</span>
            </>
          ) : "Oficiais e autorais · liberação após revisão"}
        </span>
      </span>
      <ArrowUpRight className="question-count-arrow" aria-hidden="true" />
    </a>
  );
}
