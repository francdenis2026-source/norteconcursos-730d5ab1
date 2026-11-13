import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ExternalLink,
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
import { AcreGeographyStudy } from "@/components/dashboard/AcreGeographyStudy";
import { AcreVideoPanel } from "@/components/dashboard/AcreVideoPanel";
import { AcreTimeline } from "@/components/dashboard/AcreTimeline";
import { AcreStrategicFacts } from "@/components/dashboard/AcreStrategicFacts";
import { pcAcVerticalTopicGroups, type PcAcTopicGroup } from "@/lib/pcAcreTopicStructure";
import { ACRE_CONTENT_CHECKED_ON, ACRE_CURRENT_AFFAIRS, ACRE_STUDY_CONTENT } from "@/data/acreStudyContent";
import "@/styles/student-area-kit.css";

export const ACRE_DISCIPLINE = "Realidade do Acre";

const AXES = [
  {
    id: "historia",
    title: "História do Acre",
    icon: Landmark,
    tone: "oklch(0.78 0.15 70)",
    image: "landing-pcac",
    match: /hist[óo]ric|seringueir|chico mendes/i,
    groupTitles: ["Formação histórica do Acre", "Movimento dos seringueiros, Chico Mendes e criação das reservas extrativistas"],
    description: "Da ocupação do território e dos ciclos da borracha à Revolução Acreana, ao Tratado de Petrópolis e à formação do estado.",
  },
  {
    id: "geografia",
    title: "Geografia do Acre",
    icon: Map,
    tone: "oklch(0.76 0.16 150)",
    image: "norte-atmosphere",
    match: /geografia/i,
    groupTitles: ["Geografia"],
    description: "Localização, fronteiras, municípios, regionalização, rios, relevo, clima, vegetação e unidades de conservação.",
  },
  {
    id: "economia",
    title: "Economia e sociedade",
    icon: TrendingUp,
    tone: "oklch(0.74 0.14 200)",
    image: "field-map",
    match: /econ[ôo]mic/i,
    groupTitles: ["Aspectos sociais e econômicos"],
    description: "População, indicadores sociais, atividades produtivas, sustentabilidade, transportes e integração regional.",
  },
  {
    id: "cultura",
    title: "Povos e cultura",
    icon: Users,
    tone: "oklch(0.74 0.16 300)",
    image: "careers-team",
    match: /[ée]tnic|cultur/i,
    groupTitles: ["Aspectos étnicos e culturais"],
    description: "Povos indígenas, povos isolados, populações tradicionais, extrativismo e manifestações culturais.",
  },
  {
    id: "politica",
    title: "Política e Constituição estadual",
    icon: Scale,
    tone: "oklch(0.8 0.14 82)",
    image: "exam-hall",
    match: /pol[íi]ticos/i,
    groupTitles: ["Aspectos políticos"],
    description: "Constituição do Estado do Acre, organização dos Poderes e símbolos estaduais.",
  },
  {
    id: "seguranca",
    title: "Segurança pública e fronteira",
    icon: Shield,
    tone: "oklch(0.72 0.15 255)",
    image: "pcac-capa",
    match: /seguran[çc]a p[úu]blica/i,
    groupTitles: ["Segurança pública no Acre"],
    description: "Estrutura do sistema estadual de segurança pública e particularidades das regiões de fronteira.",
  },
] as const;

type AcreAxis = (typeof AXES)[number];

function AcreAxisDetail({ axis, groups }: { axis: AcreAxis; groups: PcAcTopicGroup[] }) {
  const Icon = axis.icon;
  const subtopicCount = groups.reduce((total, group) => total + Math.max(group.subtopics.length, 1), 0);
  const practice = { area: ACRE_DISCIPLINE, subject: ACRE_DISCIPLINE, go: "1" } as never;

  return (
    <div className="ak-axis-detail space-y-3 pb-10" style={{ "--ak-tone": axis.tone } as React.CSSProperties} data-axis={axis.id}>
      <header className="ak-hero ak-axis-detail__hero">
        <img src={`/media/hero/${axis.image}.webp`} alt="" aria-hidden="true" decoding="async" />
        <Link to="/dashboard/disciplinas" search={{ d: ACRE_DISCIPLINE }} className="ak-hero__back">
          <ArrowLeft aria-hidden="true" size={14} /> Visão geral de Realidade do Acre
        </Link>
        <div className="ak-hero__copy">
          <small><Icon aria-hidden="true" size={14} /> Área de estudo · PC-AC 2026</small>
          <h1>{axis.title}</h1>
          <p>{axis.description}</p>
        </div>
        <nav className="ak-quick" aria-label={`Ações de ${axis.title}`}>
          <Link to="/dashboard/question-trainer" search={practice}>
            <Target aria-hidden="true" /> Praticar questões
          </Link>
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" } as never}>
            <Scale aria-hidden="true" /> Consultar edital
          </Link>
        </nav>
      </header>

      {axis.id === "historia" && <AcreTimeline initial="history" />}
      {axis.id === "historia" && <AcreStrategicFacts groups={["questao", "imprensa"]} />}
      {axis.id === "politica" && <AcreStrategicFacts groups={["poder"]} />}
      {axis.id === "geografia" && <AcreTimeline initial="geography" />}
      <AcreVideoPanel axisId={axis.id} />
      {axis.id === "geografia" ? (
        <AcreGeographyStudy />
      ) : (
        <>
        <nav className="ak-jump" aria-label="Seções desta área">
          {ACRE_STUDY_CONTENT[axis.id]?.length ? <a href="#acre-fresh-title">Fatos e dados</a> : null}
          <a href="#acre-axis-content-title">Conteúdo programático</a>
        </nav>
        {ACRE_STUDY_CONTENT[axis.id]?.length ? (
          <section className="ak-fresh" aria-labelledby="acre-fresh-title">
            <header className="ak-fresh__head">
              <div>
                <span>Conteúdo para estudar</span>
                <h2 id="acre-fresh-title">Fatos e dados atualizados</h2>
                <p>Cada bloco traz a fonte e o ano de referência. Conferido em {fmtChecked(ACRE_CONTENT_CHECKED_ON)}.</p>
              </div>
            </header>
            <div className="ak-fresh__grid">
              {ACRE_STUDY_CONTENT[axis.id]!.map((card) => (
                <article className="ak-fresh__card" key={card.title}>
                  <header>
                    <h3>{card.title}</h3>
                    <span>{card.reference}</span>
                  </header>
                  <ul>{card.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  {card.caution && <p className="ak-fresh__caution">{card.caution}</p>}
                  <a href={card.source.url} target="_blank" rel="noopener noreferrer">
                    Fonte: {card.source.label} <ExternalLink aria-hidden="true" size={12} />
                  </a>
                  {card.alternatives?.length ? (
                    <details className="ak-fresh__alt">
                      <summary>Outras fontes ({card.alternatives.length})</summary>
                      <p>
                        {card.alternatives.map((alt) => (
                          <a key={alt.url} href={alt.url} target="_blank" rel="noopener noreferrer">
                            {alt.label} <ExternalLink aria-hidden="true" size={11} />
                          </a>
                        ))}
                      </p>
                    </details>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <section className="ak-axis-detail__workspace" aria-labelledby="acre-axis-content-title">
          <header className="ak-axis-detail__section-head">
            <div>
              <span>Roteiro oficial de estudo</span>
              <h2 id="acre-axis-content-title">Conteúdo programático</h2>
              <p>Organizado a partir dos itens do Anexo III do edital, preservando o conteúdo previsto.</p>
            </div>
            <div className="ak-axis-detail__count" aria-label={`${groups.length} blocos e ${subtopicCount} tópicos`}>
              <strong>{subtopicCount}</strong>
              <span>{subtopicCount === 1 ? "tópico" : "tópicos"}</span>
            </div>
          </header>

          <div className="ak-axis-detail__groups">
            {groups.map((group, index) => (
              <article className="ak-axis-detail__group" key={group.title}>
                <header>
                  <span className="ak-axis-detail__index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.subtopics.length ? `${group.subtopics.length} pontos de estudo` : "Item do edital"}</p>
                  </div>
                  <BookOpen aria-hidden="true" size={18} />
                </header>
                {group.subtopics.length ? (
                  <ul>{group.subtopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                ) : (
                  <p className="ak-axis-detail__single-topic">{group.title}</p>
                )}
              </article>
            ))}
          </div>

          <div className="ak-axis-detail__source-note">
            <BookOpen aria-hidden="true" size={16} />
            <p>Este roteiro organiza os assuntos do edital para facilitar a navegação. Use “Consultar edital” para conferir o texto integral e o cargo selecionado.</p>
            <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" } as never}>
              Abrir edital <ExternalLink aria-hidden="true" size={13} />
            </Link>
          </div>
        </section>
        </>
      )}
    </div>
  );
}

const fmtChecked = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export function AcreRealityArea({ axisId }: { axisId?: string | undefined }) {
  const topics = React.useMemo(() => {
    for (const cargo of pcAcVerticalCargos)
      for (const block of cargo.blocks)
        for (const discipline of block.disciplines)
          if (discipline.id === "realidade-acre" && discipline.topics) return discipline.topics;
    return [] as string[];
  }, []);
  const groups = React.useMemo(() => pcAcVerticalTopicGroups({ id: "realidade-acre", topics }), [topics]);
  const selectedAxis = AXES.find((axis) => axis.id === axisId);

  if (selectedAxis) {
    const selectedGroups = groups.filter((group) => selectedAxis.groupTitles.some((title) => title === group.title));
    return <AcreAxisDetail axis={selectedAxis} groups={selectedGroups} />;
  }

  const practice = { area: ACRE_DISCIPLINE, subject: ACRE_DISCIPLINE, go: "1" } as never;
  return (
    <div className="space-y-3 pb-10">
      <header className="ak-hero" style={{ "--ak-gold": "oklch(0.8 0.16 140)" } as React.CSSProperties}>
        <img src="/media/hero/landing-pcac.webp" alt="" aria-hidden="true" decoding="async" />
        <Link to="/dashboard/disciplinas" className="ak-hero__back">
          <ArrowLeft aria-hidden="true" size={14} /> Todas as disciplinas
        </Link>
        <div className="ak-hero__copy">
          <small><Leaf aria-hidden="true" size={14} /> Disciplina · Edital PC-AC 2026</small>
          <h1>Realidade do Acre</h1>
          <p>História, geografia, economia, cultura, política e atualidades do estado, pelos tópicos do edital.</p>
        </div>
        <nav className="ak-quick" aria-label="Acesso rápido">
          <Link to="/dashboard/question-trainer" search={practice}>
            <Target aria-hidden="true" /> Praticar questões
          </Link>
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" } as never}>
            <Scale aria-hidden="true" /> Ver no edital
          </Link>
          <a href="#acre-atualidades" style={{ "--ak-tone": "oklch(0.74 0.17 15)" } as React.CSSProperties}>
            <Newspaper aria-hidden="true" /> Atualidades
          </a>
        </nav>
      </header>

      <section className="ak-axis-index" aria-labelledby="acre-axis-index-title">
        <header className="ak-axis-index__heading">
          <div>
            <span>Explore a disciplina</span>
            <h2 id="acre-axis-index-title">Escolha uma área para estudar</h2>
          </div>
          <span className="ak-axis-index__meta">6 áreas · PC-AC 2026</span>
        </header>
        <ul className="ak-axes">
          {AXES.map((axis) => {
            const Icon = axis.icon;
            const items = topics.filter((topic) => axis.match.test(topic));
            return (
              <li key={axis.id}>
                <Link
                  to="/dashboard/disciplinas"
                  search={{ d: ACRE_DISCIPLINE, eixo: axis.id }}
                  className="ak-axis ak-axis--interactive"
                  style={{ "--ak-tone": axis.tone } as React.CSSProperties}
                  aria-label={`Abrir área: ${axis.title}`}
                >
                  <div className="ak-axis__head">
                    <img src={`/media/hero/${axis.image}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    <span className="ak-tile__icon"><Icon aria-hidden="true" /></span>
                    <h3>{axis.title}</h3>
                    <span className="ak-axis__open" aria-hidden="true"><ChevronRight size={17} /></span>
                  </div>
                  <div className="ak-axis__body">
                    <p>{items.join(" ")}</p>
                    <span className="ak-axis__action">Explorar conteúdo <ChevronRight aria-hidden="true" size={13} /></span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <AcreStrategicFacts />
      <AcreVideoPanel axisId="atualidades" title="Vídeos e atualidades do Acre" />
      <section id="acre-atualidades" className="ak-fresh" aria-labelledby="acre-atualidades-title">
        <header className="ak-fresh__head">
          <div>
            <span>Atualidades</span>
            <h2 id="acre-atualidades-title"><Newspaper aria-hidden="true" size={18} /> Atualidades do Acre</h2>
            <p>Acontecimentos e dados recentes ligados aos temas do edital. Sempre observe a data de referência. Conferido em {fmtChecked(ACRE_CONTENT_CHECKED_ON)}.</p>
          </div>
        </header>
        <ul className="ak-fresh__news">
          {ACRE_CURRENT_AFFAIRS.map((item) => {
            const axis = AXES.find((candidate) => candidate.id === item.axis);
            return (
              <li key={item.title} style={{ "--ak-tone": axis?.tone } as React.CSSProperties}>
                <time>{item.date}</time>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                  <a href={item.source.url} target="_blank" rel="noopener noreferrer">
                    {item.source.label} <ExternalLink aria-hidden="true" size={12} />
                  </a>
                </div>
                {axis && (
                  <Link to="/dashboard/disciplinas" search={{ d: ACRE_DISCIPLINE, eixo: axis.id }} className="ak-fresh__axis">
                    {axis.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
