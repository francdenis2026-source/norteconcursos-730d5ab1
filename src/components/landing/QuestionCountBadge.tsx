import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpenCheck, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const numberFormat = new Intl.NumberFormat("pt-BR");

function AnimatedCount({ total }: { total: number }) {
  const [displayed, setDisplayed] = useState(total);
  const previous = useRef<number | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = previous.current ?? 0;
    previous.current = total;
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      setDisplayed(total);
    };
    if (preference.matches || from === total) {
      finish();
      return;
    }
    const started = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - started) / 1100, 1);
      setDisplayed(Math.round(from + (total - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    preference.addEventListener("change", finish);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", finish);
    };
  }, [total]);
  return (
    <>
      <span aria-hidden="true">{numberFormat.format(displayed)}</span>
      <span className="sr-only">{numberFormat.format(total)}</span>
    </>
  );
}

export function QuestionCountBadge() {
  const { data: total, isError } = useQuery({
    queryKey: ["public-question-catalog-count"],
    queryFn: async ({ signal }) => {
      const { data, error } = await supabase
        .rpc("get_public_question_count")
        .abortSignal(signal);
      if (error) throw error;
      const count = typeof data === "number" ? data : typeof data === "string" && /^\d+$/.test(data) ? Number(data) : NaN;
      if (!Number.isSafeInteger(count) || count < 0) throw new Error("Invalid catalog count");
      return count;
    },
    staleTime: 20_000,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });
  const confirmed = total !== undefined;
  return (
    <a href="#plataforma" className="question-count-badge" data-live={confirmed && !isError}>
      <span className="question-count-icon" aria-hidden="true"><BookOpenCheck /></span>
      <span className="question-count-content">
        <span className="question-count-eyebrow">Seu próximo nível começa aqui</span>
        <span className="question-count-main" role="status" aria-live="polite" aria-atomic="true">
          {confirmed ? <><strong><AnimatedCount total={total} /></strong><span>questões no acervo</span></> :
            <span>{isError ? "Conheça nosso banco de questões" : "Consultando nosso acervo…"}</span>}
        </span>
        <span className="question-count-detail">Oficiais e autorais • preparação direcionada</span>
        <span className="question-count-status">
          <i aria-hidden="true" />
          {isError ? confirmed ? "Última contagem confirmada" : "Contagem temporariamente indisponível" :
            confirmed ? "Atualizado automaticamente" : "Conectando à plataforma"}
        </span>
      </span>
      <ArrowUpRight className="question-count-arrow" aria-hidden="true" />
    </a>
  );
}
