import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { usePcprAvailability } from "@/hooks/usePcprAvailability";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";

/** Destaque da prova PC-PR 2026 no painel e no treinador; some sozinho se não houver questões ativas. */
export function PcprExamSpotlight({ compact = false }: { compact?: boolean }) {
  const { counts } = usePcprAvailability();
  if (!counts || !counts.some(Boolean)) return null;

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
          Questões disponíveis por cargo ({PCPR_EXAM.board}). O caderno original tem 100 itens por
          cargo; o acervo da plataforma pode estar parcial. Gabarito preliminar da banca.
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {PCPR_EXAM.roles.map((role, index) => (
            <li key={role}>
              <Link
                to="/dashboard/question-trainer"
                search={{ ...PCPR_TRAINER_SEARCH, career: role }}
                className="underline underline-offset-2"
              >
                {role}: <strong>{counts[index]} de 100 disponíveis</strong>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="pcpr-spot__actions">
        <Link
          to="/dashboard/question-trainer"
          search={PCPR_TRAINER_SEARCH}
          className="pcpr-spot__cta"
        >
          Resolver prova de Agente <ArrowRight />
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
