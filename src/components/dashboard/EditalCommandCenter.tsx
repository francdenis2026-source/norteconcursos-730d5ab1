import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Database,
  FileText,
  ListChecks,
  ScanSearch,
  ShieldCheck,
  Target,
} from "lucide-react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { acreDateKey } from "@/lib/acreTime";
import { platformDate } from "@/lib/platformClock";
import { prefersReducedMotion } from "@/lib/dashboardTrends";
import "@/styles/edital-command-center.css";

const EXAM_DATE = "2027-01-24";

/** Número que sobe suavemente até o valor (sem animação para quem pede menos movimento). */
function useCountUp(target: number | undefined, duration = 900) {
  const [value, setValue] = React.useState(target ?? 0);
  React.useEffect(() => {
    if (target === undefined) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

const actions = [
  {
    to: "/dashboard/pc-acre-edital",
    title: "Checklist do edital",
    text: "Marque o que já estudou",
    icon: ListChecks,
    tone: "gold",
    primary: true,
  },
  {
    to: "/dashboard/pc-acre-edital",
    hash: "pcac-cronograma",
    title: "Cronograma pessoal",
    text: "Seu plano até a prova",
    icon: CalendarDays,
    tone: "teal",
  },
  { to: "/dashboard/mapa-idecan", title: "Mapa da prova", text: "Peso de cada disciplina", icon: Target, tone: "rose" },
  {
    to: "/dashboard/inteligencia-idecan",
    title: "Inteligência IDECAN",
    text: "Como a banca cobra",
    icon: ScanSearch,
    tone: "blue",
  },
  {
    to: "/dashboard/pc-acre-edital",
    search: { view: "digital" },
    title: "Conteúdo programático",
    text: "Leitura do edital",
    icon: BookOpen,
    tone: "violet",
  },
] as const;

/** Concurso ativo e acervo da plataforma num só bloco, com ações diretas. */
export function EditalCommandCenter() {
  const summary = usePlatformQuestionSummary(true);
  const registered = useCountUp(summary.data?.registered);
  const available = useCountUp(summary.data?.available);
  const today = acreDateKey(platformDate());
  const days = Math.round((Date.parse(`${EXAM_DATE}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`)) / 86_400_000);
  const share =
    summary.data?.registered && summary.data.available !== undefined
      ? Math.round((summary.data.available / summary.data.registered) * 100)
      : null;

  return (
    <div className="ecc no-print">
      <article className="ecc-contest" aria-labelledby="ecc-title">
        <img className="ecc-contest__bg" src="/media/hero/landing-pcac.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="ecc-contest__top">
          <img
            className="ecc-contest__cover"
            src="/media/editais/edital-pcac-001-2026-capa.jpg"
            alt="Capa do guia do concurso PC-AC 2026"
            width={72}
            height={102}
            loading="lazy"
            decoding="async"
          />
          <div className="ecc-contest__copy">
            <p className="ecc-eyebrow">
              <span className="ecc-live" aria-hidden="true" /> Edital aberto · IDECAN
            </p>
            <h3 id="ecc-title">Polícia Civil do Acre 2026</h3>
            <ul className="ecc-facts" aria-label="Dados do concurso">
              <li>
                <b>139</b> vagas
              </li>
              <li>
                <b>6</b> cargos
              </li>
              <li>
                Prova <b>24/01/2027</b>
              </li>
            </ul>
          </div>
          {days >= 0 && (
            <div className="ecc-countdown" aria-label={`Faltam ${days} dias para a prova`}>
              <b>{days}</b>
              <span>{days === 1 ? "dia" : "dias"} para a prova</span>
            </div>
          )}
        </div>
        <nav className="ecc-actions" aria-label="Acessos do concurso PC-AC 2026">
          {actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.title}
                to={a.to}
                {...("hash" in a ? { hash: a.hash } : {})}
                {...("search" in a ? { search: a.search as never } : {})}
                className="ecc-action"
                data-tone={a.tone}
                data-primary={"primary" in a || undefined}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="ecc-action__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="ecc-action__text">
                  <strong>{a.title}</strong>
                  <small>{a.text}</small>
                </span>
                <ArrowRight className="ecc-action__go" aria-hidden="true" />
              </Link>
            );
          })}
          <a
            href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
            target="_blank"
            rel="noreferrer"
            className="ecc-action"
            data-tone="amber"
            style={{ "--i": actions.length } as React.CSSProperties}
          >
            <span className="ecc-action__icon">
              <FileText aria-hidden="true" />
            </span>
            <span className="ecc-action__text">
              <strong>Guia explicativo</strong>
              <small>PDF para baixar</small>
            </span>
            <ArrowUpRight className="ecc-action__go" aria-hidden="true" />
          </a>
        </nav>
      </article>

      <aside className="ecc-bank" aria-labelledby="ecc-bank-title">
        <header>
          <p className="ecc-eyebrow">Concursos públicos e ENEM</p>
          <h3 id="ecc-bank-title">Acervo da plataforma</h3>
        </header>
        <dl className="ecc-bank__stats">
          <div>
            <dt>
              <Database aria-hidden="true" /> Total cadastrado
            </dt>
            <dd>{summary.data ? registered.toLocaleString("pt-BR") : summary.isError ? "—" : "…"}</dd>
            <small>Oficiais e autorais</small>
          </div>
          <div>
            <dt>
              <ShieldCheck aria-hidden="true" /> Disponíveis para treinar
            </dt>
            <dd>{summary.data ? available.toLocaleString("pt-BR") : summary.isError ? "—" : "…"}</dd>
            <small>Publicadas e liberadas</small>
          </div>
        </dl>
        {share !== null && (
          <div className="ecc-bank__meter">
            <div
              role="meter"
              aria-label="Parte do acervo disponível para treinar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={share}
            >
              <i style={{ width: `${share}%` }} />
            </div>
            <span>{share}% do acervo liberado para treino</span>
          </div>
        )}
        <Link to="/dashboard/question-trainer" className="ecc-bank__cta">
          Treinar agora <ArrowRight aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
