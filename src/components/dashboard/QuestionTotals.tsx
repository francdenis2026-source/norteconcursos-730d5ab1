import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Database, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useQuestionStats } from "@/hooks/useQuestionStats";

const fmt = (value: number) => value.toLocaleString("pt-BR");

type Props = {
  enabled: boolean;
  className?: string;
};

export function QuestionTotals({ enabled, className }: Props) {
  const { data, isPending, isError, refetch } = useQuestionStats(enabled);
  const loading = enabled && isPending;
  const raw = data?.raw ?? 0;
  const eligiblePct = raw ? Math.round(((data?.eligible ?? 0) / raw) * 100) : 0;
  const reviewedPct = raw ? Math.round(((data?.reviewed ?? 0) / raw) * 100) : 0;

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
          label="Total bruto"
          value={data ? fmt(data.raw) : undefined}
          loading={loading}
          text="Todas as questões cadastradas, oficiais e autorais, antes de qualquer filtro."
        />
        <Stat
          icon={ShieldCheck}
          label="Disponíveis no treino"
          value={data ? fmt(data.eligible) : undefined}
          loading={loading}
          tone="signal"
          text="Com gabarito conferido e vigência legal validada na fonte oficial."
        />
        <Stat
          icon={BadgeCheck}
          label="Revisadas"
          value={data ? fmt(data.reviewed) : undefined}
          loading={loading}
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
        {isError && (
          <>
            Não foi possível carregar os totais.{" "}
            <button type="button" onClick={() => refetch()}>
              Tentar novamente
            </button>
          </>
        )}
        {data && (
          <>
            <b>{reviewedPct}%</b> do acervo já está revisado · {fmt(data.official)} oficiais e{" "}
            {fmt(data.curated)} autorais
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
