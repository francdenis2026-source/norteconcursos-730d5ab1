import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";

/** Destaque da prova PC-PR 2026 no painel e no treinador; some sozinho se não houver questões ativas. */
export function PcprExamSpotlight({ compact = false }: { compact?: boolean }) {
  const { data: count } = useQuery({
    queryKey: ["pcpr-2026-active-count"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("board_exam_questions")
        .select("id", { count: "exact", head: true })
        .eq("contest_name", PCPR_EXAM.contest)
        .eq("exam_year", Number(PCPR_EXAM.year))
        .eq("content_status", "active");
      if (error) throw error;
      return count ?? 0;
    },
  });
  if (!count) return null;

  return (
    <section
      className={`pcpr-spot pcpr-spot--cover no-print${compact ? " pcpr-spot--compact" : ""}`}
      aria-label="Prova da Polícia Civil do Paraná 2026"
    >
      <img
        className="pcpr-spot__hero"
        src="/media/hero/pcpr-capa.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width="1672"
        height="940"
      />
      <div className="pcpr-spot__body">
        <span className="pcpr-spot__kicker">Em destaque · prova de {PCPR_EXAM.appliedOn}</span>
        <h2>Prova da Polícia Civil do Paraná 2026</h2>
        <p>
          {count.toLocaleString("pt-BR")} questões de Direito e Legislação ({PCPR_EXAM.board})
          prontas para resolver. Gabarito preliminar da banca, atualizado quando o definitivo sair.
        </p>
      </div>
      <div className="pcpr-spot__actions">
        <Link
          to="/dashboard/question-trainer"
          search={PCPR_TRAINER_SEARCH}
          className="pcpr-spot__cta"
        >
          Resolver a prova <ArrowRight />
        </Link>
        {!compact && (
          <a
            href={PCPR_EXAM.officialPage}
            target="_blank"
            rel="noopener noreferrer"
            className="pcpr-spot__link"
          >
            Página oficial da banca <ExternalLink />
          </a>
        )}
      </div>
    </section>
  );
}
