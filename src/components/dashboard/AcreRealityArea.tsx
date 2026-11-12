import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Landmark,
  Leaf,
  Map,
  Newspaper,
  Scale,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import "@/styles/student-area-kit.css";

export const ACRE_DISCIPLINE = "Realidade do Acre";

/** Eixos da disciplina; os tópicos vêm do edital verticalizado PC-AC, sem conteúdo inventado. */
const AXES = [
  {
    id: "historia",
    title: "História do Acre",
    icon: Landmark,
    tone: "oklch(0.78 0.15 70)",
    image: "landing-pcac",
    match: /hist[óo]ric|seringueir|chico mendes/i,
  },
  {
    id: "geografia",
    title: "Geografia do Acre",
    icon: Map,
    tone: "oklch(0.76 0.16 150)",
    image: "norte-atmosphere",
    match: /geografia/i,
  },
  {
    id: "economia",
    title: "Economia e sociedade",
    icon: TrendingUp,
    tone: "oklch(0.74 0.14 200)",
    image: "field-map",
    match: /econ[ôo]mic/i,
  },
  {
    id: "cultura",
    title: "Povos e cultura",
    icon: Users,
    tone: "oklch(0.74 0.16 300)",
    image: "careers-team",
    match: /[ée]tnic|cultur/i,
  },
  {
    id: "politica",
    title: "Política e Constituição estadual",
    icon: Scale,
    tone: "oklch(0.8 0.14 82)",
    image: "exam-hall",
    match: /pol[íi]ticos/i,
  },
  {
    id: "seguranca",
    title: "Segurança pública e fronteira",
    icon: Shield,
    tone: "oklch(0.72 0.15 255)",
    image: "pcac-capa",
    match: /seguran[çc]a p[úu]blica/i,
  },
] as const;

export function AcreRealityArea() {
  const topics = React.useMemo(() => {
    for (const cargo of pcAcVerticalCargos)
      for (const block of cargo.blocks)
        for (const discipline of block.disciplines)
          if (discipline.id === "realidade-acre" && discipline.topics) return discipline.topics;
    return [] as string[];
  }, []);
  const practice = { area: ACRE_DISCIPLINE, subject: ACRE_DISCIPLINE, go: "1" } as never;
  return (
    <div className="space-y-3 pb-10">
      <header
        className="ak-hero"
        style={{ "--ak-gold": "oklch(0.8 0.16 140)" } as React.CSSProperties}
      >
        <img src="/media/hero/landing-pcac.webp" alt="" aria-hidden="true" decoding="async" />
        <Link to="/dashboard/disciplinas" className="ak-hero__back">
          <ArrowLeft aria-hidden="true" size={14} /> Todas as disciplinas
        </Link>
        <div className="ak-hero__copy">
          <small>
            <Leaf aria-hidden="true" size={14} /> Disciplina · Edital PC-AC 2026
          </small>
          <h1>Realidade do Acre</h1>
          <p>
            História, geografia, economia, cultura, política e atualidades do estado, pelos tópicos
            do edital.
          </p>
        </div>
        <nav className="ak-quick" aria-label="Acesso rápido">
          <Link to="/dashboard/question-trainer" search={practice}>
            <Target aria-hidden="true" /> Praticar questões
          </Link>
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" } as never}>
            <Scale aria-hidden="true" /> Ver no edital
          </Link>
          <a
            href="#acre-atualidades"
            style={{ "--ak-tone": "oklch(0.74 0.17 15)" } as React.CSSProperties}
          >
            <Newspaper aria-hidden="true" /> Atualidades
          </a>
        </nav>
      </header>

      <ul className="ak-axes">
        {AXES.map((axis) => {
          const Icon = axis.icon;
          const items = topics.filter((topic) => axis.match.test(topic));
          return (
            <li
              key={axis.id}
              className="ak-axis"
              style={{ "--ak-tone": axis.tone } as React.CSSProperties}
            >
              <div className="ak-axis__head">
                <img
                  src={`/media/hero/${axis.image}.webp`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <span className="ak-tile__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h2>{axis.title}</h2>
              </div>
              {items.length ? (
                <ul>
                  {items.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              ) : (
                <p>Tópico não listado no edital atual.</p>
              )}
            </li>
          );
        })}
      </ul>

      <section id="acre-atualidades" className="ak-note">
        <h2>
          <Newspaper aria-hidden="true" size={18} /> Atualidades do Acre
        </h2>
        <p>
          As aulas de teoria e o boletim de atualidades desta disciplina estão em preparação.
          Enquanto isso, use os tópicos acima como roteiro e pratique pelo treinador de questões.
        </p>
      </section>
    </div>
  );
}
