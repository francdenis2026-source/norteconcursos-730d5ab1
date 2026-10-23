import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Database, RefreshCw, ShieldCheck } from "lucide-react";
import type { MouseEventHandler } from "react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { QUESTION_COUNT_LABELS } from "@/lib/platformQuestionSummary";
import "@/styles/platform-question-counts.css";

type Props = {
  enabled?: boolean;
  compact?: boolean;
  reviewed?: number;
  onExplore?: MouseEventHandler<HTMLButtonElement>;
};
export function PlatformQuestionCounts({
  enabled = true,
  compact = false,
  reviewed,
  onExplore,
}: Props) {
  const summary = usePlatformQuestionSummary(enabled);
  const metrics = [
    {
      kind: "registered",
      icon: Database,
      value: summary.data?.registered,
      hint: "Oficiais e autorais · Concursos + ENEM",
    },
    {
      kind: "available",
      icon: ShieldCheck,
      value: summary.data?.available,
      hint: "Publicadas e liberadas para estudo",
    },
    ...(reviewed === undefined
      ? []
      : [
          {
            kind: "reviewed" as const,
            icon: BadgeCheck,
            value: reviewed,
            hint: "Com explicação e exemplo · no catálogo de treino",
          },
        ]),
  ] as const;
  return (
    <section
      className={`platform-question-counts${compact ? " platform-question-counts--compact" : ""}`}
      aria-label="Resumo global de questões"
    >
      <header>
        <h2>Acervo da plataforma</h2>
        <span>Concursos públicos e ENEM</span>
        <button
          type="button"
          onClick={() => void summary.refetch()}
          disabled={summary.isFetching}
          aria-label="Atualizar totais de questões"
        >
          <RefreshCw aria-hidden="true" />
        </button>
      </header>
      <div className="platform-question-counts__grid" data-columns={metrics.length}>
        {metrics.map(({ kind, icon: Icon, value, hint }) => {
          const content = (
            <>
              <span>
                <Icon aria-hidden="true" />
                {QUESTION_COUNT_LABELS[kind]}
              </span>
              <strong aria-busy={value === undefined && summary.isPending}>
                {value === undefined ? "—" : value.toLocaleString("pt-BR")}
              </strong>
              <small>
                {hint}
                <ArrowUpRight aria-hidden="true" />
              </small>
            </>
          );
          const label = `${QUESTION_COUNT_LABELS[kind]}: ${value === undefined ? "indisponível" : value.toLocaleString("pt-BR")}. Ver acervo`;
          return onExplore ? (
            <button
              key={kind}
              type="button"
              data-count-kind={kind}
              aria-label={label}
              aria-haspopup="dialog"
              onClick={onExplore}
            >
              {content}
            </button>
          ) : (
            <Link
              key={kind}
              to="/dashboard/question-bank"
              data-count-kind={kind}
              aria-label={label}
            >
              {content}
            </Link>
          );
        })}
      </div>
      {summary.isError && (
        <p role="status">
          Não foi possível atualizar os totais.
          {summary.data
            ? " Exibindo a última contagem recebida."
            : " Use o botão atualizar para tentar novamente."}
        </p>
      )}
    </section>
  );
}
