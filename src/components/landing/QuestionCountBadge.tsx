import { BookOpenCheck, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Odometer } from "@/components/landing/fx";
import { supabase } from "@/integrations/supabase/client";

export function QuestionCountBadge() {
  const { data } = useQuery({
    queryKey: ["public-question-summary"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_question_summary");
      if (error) throw error;
      return data as { registered: number; available: number };
    },
  });
  const format = (n: number) => n.toLocaleString("pt-BR");
  return (
    <a href="#plataforma" className="question-count-badge">
      <span className="question-count-icon" aria-hidden="true">
        <BookOpenCheck />
      </span>
      <span className="question-count-content">
        <span className="question-count-eyebrow">Seu próximo nível começa aqui</span>
        <span className="question-count-main">
          <strong>{data ? <Odometer value={data.available} /> : "Questões"}</strong>
          <span>{data ? "questões disponíveis" : "para sua preparação"}</span>
        </span>
        <span className="question-count-detail">
          {data
            ? `${format(data.registered)} cadastradas · oficiais e autorais`
            : "Oficiais e autorais · liberação após revisão"}
        </span>
      </span>
      <ArrowUpRight className="question-count-arrow" aria-hidden="true" />
    </a>
  );
}
