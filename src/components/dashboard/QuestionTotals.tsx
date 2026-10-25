import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Database, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { QUESTION_COUNT_LABELS } from "@/lib/platformQuestionSummary";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { reviewedQuestionBank } from "@/lib/questionBank";

const fmt = (value: number) => value.toLocaleString("pt-BR");

type Props = {
  enabled: boolean;
  userId: string | undefined;
  className?: string;
};

export function QuestionTotals({ enabled, userId, className }: Props) {
  const { data, isPending, isError, refetch } = usePlatformQuestionSummary(enabled);
  const catalog = useQuestionCatalog(userId, enabled);
  const reviewed = useMemo(() => reviewedQuestionBank(catalog.catalog).length, [catalog.catalog]);
  const loading = enabled && isPending;
  const raw = data?.registered ?? 0;
  const eligiblePct = raw ? Math.min(100, Math.round(((data?.available ?? 0) / raw) * 100)) : 0;
  const reviewedPct = raw ? Math.min(100, Math.round((reviewed / raw) * 100)) : 0;

  return (
    <section className={`acervo ${className ?? ""}`} aria-label="Total de questões da plataforma">
      <header className="acervo__head">
        <div>
          <span className="mono-label">Acervo da plataforma</span>
          <h2>Questões na plataforma</h2>
        </div>
        <Link to="/dashboard/question-bank" className="acervo__link no-print">
          Explorar o banco <ArrowRight />
        </Link>
      </header>

      <div className="acervo__grid">
        <Stat
          icon={Database}
          label={QUESTION_COUNT_LABELS.registered}
          value={data ? fmt(data.registered) : undefined}
          loading={loading}
          text="Todas as questões cadastradas, oficiais e autorais, antes de qualquer filtro."
        />
        <Stat
          icon={ShieldCheck}
          label={QUESTION_COUNT_LABELS.available}
          value={data ? fmt(data.available) : undefined}
          loading={loading}
          tone="signal"
          text="Mesmo resumo global da homepage, antes dos filtros de estudo."
        />
        <Stat
          icon={BadgeCheck}
          label={QUESTION_COUNT_LABELS.reviewed}
          value={!catalog.loading && !catalog.error ? fmt(reviewed) : undefined}
          loading={enabled && catalog.loading}
          tone="brass"
          text="Explicação didática com exemplo do dia a dia e fonte oficial verificada."
        />
      </div>

      <div className="acervo__meter" aria-hidden="true">
        <i className="acervo__meter-raw" />
        <i className="acervo__meter-eligible" style={{ width: `${eligiblePct}%` }} />
        <i className="acervo__meter-reviewed" style={{ width: `${reviewedPct}%` }} />
      </div>
      <p className="acervo__legend">
        {!enabled && "Entre na sua conta para ver os totais do acervo."}
        {(isError || catalog.error) && (
          <>
            Não foi possível carregar os totais.{" "}
            <button
              type="button"
              onClick={() => {
                void refetch();
                void catalog.reload();
              }}
            >
              Tentar novamente
            </button>
          </>
        )}
        {data && !catalog.loading && !catalog.error && (
          <>
            Disponíveis e total cadastrado usam o mesmo resumo da homepage. {fmt(reviewed)} questões
            do catálogo têm revisão didática com exemplo ({reviewedPct}% do total cadastrado). Itens
            em conferência e registros compartilhados entre cargos podem ficar fora da seleção de
            treino.
          </>
        )}
      </p>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  text,
  loading,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string | undefined;
  text: string;
  loading: boolean;
  tone?: "signal" | "brass";
}) {
  return (
    <div className="acervo__stat" data-tone={tone}>
      <span className="acervo__label">
        <Icon /> {label}
      </span>
      {loading ? (
        <strong className="acervo__skeleton" aria-busy="true" />
      ) : (
        <strong className="tabular">{value ?? "—"}</strong>
      )}
      <small>{text}</small>
    </div>
  );
}
