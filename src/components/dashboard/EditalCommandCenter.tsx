import * as React from "react";
import { examDaysLeft } from "@/lib/examClock";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  ListChecks,
  ScanSearch,
  Target,
} from "lucide-react";
import "@/styles/edital-command-center.css";

const EXAM_DATE = "2027-01-24";

/** Número que sobe suavemente até o valor (sem animação para quem pede menos movimento). */
const actions = [
  {
    to: "/dashboard/estudo-pc-acre",
    title: "Área de estudo interativa",
    text: "Questões com explicação, teoria e treino",
    icon: GraduationCap,
    tone: "gold",
    primary: true,
    featured: true,
  },
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
  const days = examDaysLeft(EXAM_DATE) ?? 0;
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
                data-featured={"featured" in a || undefined}
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


    </div>
  );
}
