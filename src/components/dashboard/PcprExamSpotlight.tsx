import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { usePcprAvailability } from "@/hooks/usePcprAvailability";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";

/** Small study shortcut; availability and all roles remain accessible on demand. */
export function PcprExamSpotlight({ compact = false }: { compact?: boolean }) {
  const { counts } = usePcprAvailability();
  if (!counts || !counts.some(Boolean)) return null;
  return (
    <section
      className={`pcpr-spot pcpr-spot--notice no-print${compact ? " pcpr-spot--compact" : ""}`}
      aria-label="Prova da Polícia Civil do Paraná 2026"
    >
      <img
        className="pcpr-spot__art"
        src="/media/hero/pcpr-capa.webp"
        alt="Capa da Polícia Civil do Paraná"
        width={1672}
        height={941}
        loading="lazy"
        decoding="async"
      />
      <div className="pcpr-spot__summary">
        <div>
          <h2>PC-PR 2026 · Questões da prova</h2>
          <p>
            {PCPR_EXAM.board} · {PCPR_EXAM.appliedOn} · Gabarito preliminar
          </p>
        </div>
        <Link
          to="/dashboard/question-trainer"
          search={PCPR_TRAINER_SEARCH}
          className="pcpr-spot__cta"
        >
          Treinar Agente <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <details className="pcpr-spot__details">
        <summary>Ver cargos e disponibilidade</summary>
        <p>
          O caderno original tem 100 questões por cargo. A plataforma inclui apenas os itens
          elegíveis disponíveis para treino.
        </p>
        <ul>
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
        <a
          href={PCPR_EXAM.officialPage}
          target="_blank"
          rel="noopener noreferrer"
          className="pcpr-spot__link"
        >
          Página oficial da banca <ExternalLink aria-hidden="true" />
        </a>
      </details>
    </section>
  );
}
