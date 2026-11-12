import { MaterialStudyTabs } from "@/components/library/MaterialStudyTabs";
import { useQuery } from "@tanstack/react-query";
import { MaterialPractice } from "@/components/library/MaterialPractice";
import { materialTopic } from "@/lib/materialPractice";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Atom,
  BarChart3,
  BookOpen,
  Calculator,
  Check,
  Cpu,
  FlaskConical,
  GraduationCap,
  Languages,
  PenLine,
  PlayCircle,
  Search,
  Sigma,
  Target,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { PageHero, HeroStat, LockedState, type HeroImage } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { ACTIVE_STUDY_EDITION_EVENT, readActiveStudyEdition, type ActiveStudyEdition } from "@/lib/activeStudyEdition";
import { readSlugs, useStudyMaterial, useStudyMaterialList } from "@/lib/studyMaterials";
import { TRACKS } from "@/data/tracks";
import { PLAYLISTS, youtubePlaylistUrl } from "@/data/mediaCatalog";
import {
  disciplineCards,
  materialsOf,
  playlistsOf,
  tracksOf,
  type DisciplineCard,
} from "@/lib/disciplineHub";
import { disciplinePracticeSearch } from "@/lib/practiceLink";
import { normalizeLibrarySearch } from "@/lib/librarySearch";
import { canonicalSubject } from "@/lib/subjects";
import type { SubjectIcon } from "@/lib/materialHub";
import "@/styles/study-area-compact.css";
import { disciplineTheme } from "@/lib/disciplineTheme";
import { ACRE_DISCIPLINE, AcreRealityArea } from "@/components/dashboard/AcreRealityArea";
import "@/styles/discipline-experience.css";

export const Route = createFileRoute("/dashboard/disciplinas")({
  component: DisciplinesPage,
  validateSearch: (s: Record<string, unknown>): { d?: string | undefined } => ({
    d: typeof s["d"] === "string" && s["d"].trim() ? s["d"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Disciplinas | Norte Concurso" }] }),
});

const ICONS: Record<SubjectIcon, LucideIcon> = {
  portugues: PenLine,
  matematica: Calculator,
  logica: Sigma,
  informatica: Cpu,
  quimica: FlaskConical,
  fisica: Atom,
  estatistica: BarChart3,
  contabilidade: Wallet,
  ingles: Languages,
  geral: BookOpen,
};
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
type SyllabusTopic = { id: string; discipline: string; topic_text: string; topic_order: number | null };

function subjectKey(name: string) {
  const value = canonicalSubject(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (value.includes("portugues") || value.includes("redacao")) return "portugues";
  if (value.includes("matematica")) return "matematica";
  if (value.includes("raciocinio") || value.includes("logica")) return "logica";
  if (value.includes("informatica") || value.includes("comput")) return "informatica";
  if (value.includes("quimica")) return "quimica";
  if (value.includes("fisica")) return "fisica";
  if (value.includes("estatistica")) return "estatistica";
  if (value.includes("contabilidade")) return "contabilidade";
  if (value.includes("ingles")) return "ingles";
  return "geral";
}

function disciplinePresentation(name: string): { key: string; image: HeroImage; description: string } {
  const key = subjectKey(name);
  const images: Record<string, HeroImage> = {
    portugues: "study-desk",
    matematica: "toolkit",
    logica: "command-room",
    informatica: "dashboard",
    quimica: "field-map",
    fisica: "field-map",
    estatistica: "dashboard",
    contabilidade: "exam-hall",
    ingles: "careers-team",
    geral: "journey",
  };
  const descriptions: Record<string, string> = {
    portugues: "Interpretação, gramática e leitura estratégica para resolver questões com segurança.",
    matematica: "Conceitos, cálculos e resolução de problemas com prática progressiva.",
    logica: "Raciocínio estruturado, padrões e estratégias para ganhar precisão nas questões.",
    informatica: "Conceitos digitais, sistemas e tecnologia organizados para a prova.",
    quimica: "Fundamentos, relações e aplicações organizados por assunto.",
    fisica: "Princípios, fórmulas e interpretação de fenômenos com aplicação prática.",
    estatistica: "Leitura de dados, medidas e interpretação de resultados.",
    contabilidade: "Conceitos, demonstrações e lançamentos com foco na resolução de questões.",
    ingles: "Vocabulário, leitura e compreensão de textos voltados para concursos.",
    geral: "Materiais, trilhas e prática organizados para sua preparação.",
  };
  return { key, image: images[key] ?? "study-desk", description: descriptions[key] ?? descriptions["geral"]! };
}

const doneLessons = (slug: string) => {
  try {
    return (JSON.parse(localStorage.getItem(`trilha-feitas:${slug}`) ?? "[]") as unknown[]).length;
  } catch {
    return 0;
  }
};

function DisciplinesPage() {
  const { user, isLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { d } = Route.useSearch();
  const { data, isPending } = useStudyMaterialList(signedIn);
  const materials = data ?? [];
  const cards = React.useMemo(() => disciplineCards(materials, TRACKS, PLAYLISTS), [materials]);
  if (!isLoading && !signedIn)
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            <em>Disciplinas</em> para concursos
          </>
        }
        description="Entre na sua conta para estudar por disciplina."
      />
    );
  // Compara pelo nome canônico: a disciplina clicada sempre bate com seu cartão, mesmo que o
  // parâmetro "d" chegue com variação de acento, maiúscula ou nome alternativo da mesma matéria.
  const current = d
    ? (cards.find((card) => card.name === d) ??
      cards.find((card) => card.name === canonicalSubject(d)))
    : undefined;
  if (d === ACRE_DISCIPLINE) return <AcreRealityArea />;
  return current ? (
    <DisciplineDetail key={current.name} card={current} materials={materials} />
  ) : (
    <DisciplineIndex cards={cards} loading={isPending && signedIn} unknown={d} />
  );
}

function DisciplineIndex({
  cards,
  loading,
  unknown,
}: {
  cards: DisciplineCard[];
  loading: boolean;
  unknown: string | undefined;
}) {
  const [query, setQuery] = React.useState("");
  const normalized = normalizeLibrarySearch(query);
  const available = cards.filter((card) => card.hasContent);
  const shown = normalized
    ? available.filter((c) => normalizeLibrarySearch(c.name).includes(normalized))
    : available;
  return (
    <div className="discipline-workspace space-y-4 pb-8" data-view="index">
      <PageHero
        image="study-desk"
        size="md"
        kicker="Material didático"
        icon={GraduationCap}
        title={
          <>
            <em>Disciplinas</em> para concursos
          </>
        }
        description="Português, Matemática, Raciocínio Lógico, Química, Física, Estatística, Contabilidade e mais. Cada disciplina reúne seus materiais, a trilha de aulas e as videoaulas num só lugar. Legislação e leis ficam na área de leis."
      >
        <div className="page-hero__stats">
          <HeroStat icon={GraduationCap} label="Disciplinas" value={cards.length} />
          <HeroStat
            icon={PlayCircle}
            label="Videoaulas"
            value={cards.reduce((sum, c) => sum + c.videos, 0)}
          />
        </div>
      </PageHero>
      <section className="rounded-xl border border-emerald-600/30 bg-emerald-600/5 p-4" aria-labelledby="study-guides-title">
        <h2 id="study-guides-title" className="text-sm font-extrabold text-foreground">Guias revisados para a PC-AC e outras carreiras</h2>
        <p className="mt-1 text-xs text-muted-foreground">Aulas originais com fontes institucionais, exercícios de revisão e marcação de progresso. A aplicabilidade depende do edital de cada cargo.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            {id:"arquivologia",label:"Arquivologia · Investigador e Papiloscopista"},
            {id:"administracao-geral",label:"Noções de Administração · Investigador"},
            {id:"administracao-publica",label:"Evolução da Administração Pública · Complementar"},
          ].map(item=><Link key={item.id} to="/dashboard/library" search={{collection:"subjects",guia:item.id}} hash="materiais-atualizados-pcac" className="rounded-lg border border-emerald-600/35 bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:border-emerald-500 hover:bg-emerald-600/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">{item.label} →</Link>)}
        </div>
      </section>
      {unknown && (
        <p role="status" className="rounded-xl border p-3 text-sm">
          Não encontramos a disciplina “{unknown}”. Escolha uma abaixo.
        </p>
      )}
      <div className="discipline-search">
        <Search aria-hidden="true" size={20} />
        <label className="sr-only" htmlFor="discipline-search">
          Buscar disciplina
        </label>
        <input
          id="discipline-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar disciplina: português, química, estatística…"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Limpar a busca">
            <X aria-hidden="true" size={16} />
          </button>
        )}
      </div>
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} className="h-36 rounded-2xl" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Nenhuma disciplina com “{query}”.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {!normalized && (
            <li>
              <Link
                to="/dashboard/disciplinas"
                search={{ d: ACRE_DISCIPLINE }}
                className="ak-tile"
                style={{ "--ak-tone": "oklch(0.8 0.16 140)", height: "100%", minHeight: "7.5rem" } as React.CSSProperties}
              >
                <img src="/media/hero/landing-pcac.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <strong>Realidade do Acre</strong>
                <span>História, geografia, economia e atualidades</span>
              </Link>
            </li>
          )}
          {shown.map((card) => {
            const Icon = ICONS[card.icon];
            const body = (
              <>
                <span className="discipline-card__icon" data-subject={subjectKey(card.name)}>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{card.name}</strong>
                {card.hasContent ? (
                  <ul className="discipline-card__stats">
                    {card.materials > 0 && (
                      <li>{plural(card.materials, "material", "materiais")}</li>
                    )}
                    {card.lessons > 0 && (
                      <li>{plural(card.lessons, "aula na trilha", "aulas na trilha")}</li>
                    )}
                    {card.videos > 0 && <li>{plural(card.videos, "videoaula", "videoaulas")}</li>}
                  </ul>
                ) : (
                  <span className="discipline-card__soon">Em preparação</span>
                )}
              </>
            );
            return (
              <li key={card.name}>
                {card.hasContent ? (
                  <Link
                    to="/dashboard/disciplinas"
                    search={{ d: card.name }}
                    className="discipline-card"
                    data-subject={subjectKey(card.name)}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="discipline-card" data-subject={subjectKey(card.name)} data-empty="true" aria-disabled="true">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DisciplineDetail({
  card,
  materials,
}: {
  card: DisciplineCard;
  materials: Parameters<typeof materialsOf>[1];
}) {
  const { user } = useAuthStatus();
  const [practiceTopic, setPracticeTopic] = React.useState("");
  const Icon = ICONS[card.icon];
  const presentation = disciplinePresentation(card.name);
  const items = materialsOf(card.name, materials as never) as typeof materials;
  const tracks = tracksOf(card.name, TRACKS);
  const playlists = playlistsOf(card.name, PLAYLISTS);
  const [read, setRead] = React.useState<Set<string>>(new Set());
  const [activeEdition, setActiveEdition] = React.useState<ActiveStudyEdition | null>(null);
  const [completedTopics, setCompletedTopics] = React.useState<Record<string, boolean>>({});
  React.useEffect(() => setRead(readSlugs()), []);
  React.useEffect(() => {
    const sync = () => setActiveEdition(readActiveStudyEdition(user?.id));
    sync();
    window.addEventListener(ACTIVE_STUDY_EDITION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ACTIVE_STUDY_EDITION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [user?.id]);
  const activeEditionId = activeEdition?.id;
  const syllabusQuery = useQuery({
    queryKey: ["active-syllabus-topics", activeEditionId],
    enabled: !!activeEditionId,
    queryFn: () =>
      fetchAllRows<SyllabusTopic>((from, to) =>
        supabase
          .from("syllabus_topics")
          .select("id,discipline,topic_text,topic_order")
          .eq("edition_id", activeEditionId!)
          .eq("content_status", "current")
          .order("id")
          .range(from, to),
      ),
  });
  const syllabusTopics = (syllabusQuery.data ?? []).filter(
    (topic) => canonicalSubject(topic.discipline) === canonicalSubject(card.name),
  );
  React.useEffect(() => {
    if (!activeEditionId) {
      setCompletedTopics({});
      return;
    }
    try {
      setCompletedTopics(JSON.parse(localStorage.getItem("norte-edital-progress:" + activeEditionId) ?? "{}"));
    } catch {
      setCompletedTopics({});
    }
  }, [activeEditionId]);
  const toggleSyllabusTopic = (topicId: string) => {
    setCompletedTopics((current) => {
      const next = { ...current, [topicId]: !current[topicId] };
      if (activeEditionId) {
        try {
          localStorage.setItem("norte-edital-progress:" + activeEditionId, JSON.stringify(next));
        } catch {
          // O progresso continua atualizado nesta sessão se o armazenamento estiver indisponível.
        }
      }
      return next;
    });
  };
  return (
    <div
      className="discipline-workspace discipline-workspace--detail space-y-4 pb-8"
      data-subject={presentation.key}
      style={
        presentation.key === "geral"
          ? ({ "--discipline-accent": disciplineTheme(card.name).tone } as React.CSSProperties)
          : undefined
      }
    >
      <Link to="/dashboard/disciplinas" className="discipline-back">
        <ArrowLeft aria-hidden="true" size={16} /> Todas as disciplinas
      </Link>
      <PageHero
        image={presentation.image}
        size="sm"
        kicker="Sua área de estudo"
        icon={Icon}
        title={<>{card.name}</>}
        description={presentation.description}
        actions={
          <Link
            to="/dashboard/question-trainer"
            search={disciplinePracticeSearch(card.name) as never}
            className="discipline-practice"
          >
            <Target aria-hidden="true" size={18} /> Praticar com questões
          </Link>
        }
      >
        <div className="discipline-hero-meta" aria-label="Conteúdo disponível nesta disciplina">
          {card.materials > 0 && <span><BookOpen aria-hidden="true" /> {plural(card.materials, "material", "materiais")}</span>}
          {card.lessons > 0 && <span><GraduationCap aria-hidden="true" /> {plural(card.lessons, "aula na trilha", "aulas na trilha")}</span>}
          {card.videos > 0 && <span><PlayCircle aria-hidden="true" /> {plural(card.videos, "videoaula", "videoaulas")}</span>}
        </div>
      </PageHero>

      <DisciplineSyllabusPanel
        edition={activeEdition}
        loading={syllabusQuery.isLoading}
        topics={syllabusTopics}
        completed={completedTopics}
        onToggle={toggleSyllabusTopic}
      />

      <MaterialStudyTabs
        key={card.name}
        textLabel="Materiais"
        explanationLabel="Roteiro e vídeos"
        practiceLabel="Praticar"
        text={
          <>
            {" "}
            <section aria-labelledby="d-materials" className="space-y-3">
              <h2 id="d-materials" className="discipline-h">
                <BookOpen aria-hidden="true" size={20} /> Materiais de estudo
              </h2>
              {items.length === 0 ? (
                <p className="discipline-none">
                  Os materiais de texto desta disciplina estão em preparação.
                </p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((item) => {
                    const m = item as unknown as {
                      slug: string;
                      title: string;
                      topic_label: string;
                    };
                    return (
                      <li key={m.slug}>
                        <Link
                          to="/dashboard/library/$slug"
                          params={{ slug: m.slug }}
                          className="material-card"
                        >
                          <span className="material-card__icon" data-tone="subject" data-subject={presentation.key}>
                            {read.has(m.slug) ? (
                              <Check aria-hidden="true" />
                            ) : (
                              <BookOpen aria-hidden="true" />
                            )}
                          </span>
                          <span className="material-card__body">
                            <strong>{m.title}</strong>
                            <span>
                              {m.topic_label}
                              {read.has(m.slug) ? " · lido" : ""}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        }
        explanation={
          <>
            {" "}
            <section aria-labelledby="d-track" className="space-y-3">
              <h2 id="d-track" className="discipline-h">
                <GraduationCap aria-hidden="true" size={20} /> Roteiro de estudo
              </h2>
              {tracks.length === 0 ? (
                <p className="discipline-none">O roteiro desta disciplina está em preparação.</p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tracks.map((track) => {
                    const done = doneLessons(track.slug);
                    return (
                      <li key={track.slug}>
                        <Link
                          to="/dashboard/trilhas"
                          search={{ t: track.slug }}
                          className="material-card"
                        >
                          <span className="material-card__icon" data-tone="more" data-subject={presentation.key}>
                            <GraduationCap aria-hidden="true" />
                          </span>
                          <span className="material-card__body">
                            <strong>{track.title}</strong>
                            <span>
                              {plural(track.lessons.length, "aula", "aulas")}
                              {done > 0 ? ` · ${done} concluída${done === 1 ? "" : "s"}` : ""}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
            <section aria-labelledby="d-videos" className="space-y-3">
              <h2 id="d-videos" className="discipline-h">
                <PlayCircle aria-hidden="true" size={20} /> Videoaulas
              </h2>
              {playlists.length === 0 ? (
                <p className="discipline-none">
                  As videoaulas desta disciplina estão em preparação.
                </p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {playlists.map((list) => (
                    <li key={list.id}>
                      <Link to="/dashboard/media" className="material-card">
                        <span className="material-card__icon" data-tone="law" data-subject={presentation.key}>
                          <PlayCircle aria-hidden="true" />
                        </span>
                        <span className="material-card__body">
                          <strong>{list.title}</strong>
                          <span>Abrir na Central de mídia</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {playlists.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Playlists gratuitas e públicas de terceiros; os direitos são dos autores dos
                  canais.{" "}
                  <a
                    href={youtubePlaylistUrl(playlists[0]!.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Ver a primeira no YouTube
                  </a>
                  .
                </p>
              )}
            </section>
          </>
        }
        practice={
          <>
            <label className="block text-sm font-semibold">
              Assunto
              <select
                className="mt-2 min-h-11 w-full rounded-xl border bg-background px-3"
                value={practiceTopic}
                onChange={(e) => setPracticeTopic(e.target.value)}
              >
                <option value="">Toda a disciplina</option>
                {[
                  ...new Set([
                    ...items
                      .map((m) => (m as { topic_label?: string }).topic_label)
                      .filter((x): x is string => !!x),
                    ...tracks.flatMap((t) => t.lessons.map((l) => l.title)),
                  ]),
                ].map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {user && (
              <DisciplinePracticePanel
                key={`${card.name}:${practiceTopic}`}
                userId={user.id}
                subject={card.name}
                topic={practiceTopic}
                items={items}
              />
            )}
          </>
        }
      />
    </div>
  );
}


function DisciplineSyllabusPanel({
  edition,
  loading,
  topics,
  completed,
  onToggle,
}: {
  edition: ActiveStudyEdition | null;
  loading: boolean;
  topics: SyllabusTopic[];
  completed: Record<string, boolean>;
  onToggle: (topicId: string) => void;
}) {
  if (!edition) {
    return (
      <section className="discipline-edital-panel discipline-edital-panel--empty">
        <div>
          <span className="discipline-edital-panel__eyebrow">ESTUDO ORIENTADO</span>
          <strong>Organize esta disciplina pelo seu edital</strong>
          <p>Ative a edição do concurso que você vai prestar para acompanhar os assuntos e o progresso em cada matéria.</p>
        </div>
        <Link to="/dashboard/edital" className="discipline-edital-panel__action">
          Escolher edital <ChevronRight aria-hidden="true" size={16} />
        </Link>
      </section>
    );
  }

  const completedCount = topics.filter((topic) => completed[topic.id]).length;
  const percent = topics.length ? Math.round((completedCount / topics.length) * 100) : 0;
  const pending = topics.filter((topic) => !completed[topic.id]);
  const visibleTopics = (pending.length ? pending : topics).slice(0, 4);

  return (
    <section className="discipline-edital-panel" aria-label="Progresso desta disciplina no edital ativo">
      <header className="discipline-edital-panel__header">
        <div className="discipline-edital-panel__identity">
          <span className="discipline-edital-panel__eyebrow">EDITAL ATIVO</span>
          <strong>{edition.contestName} · {edition.year}</strong>
          <span>{edition.roleName} · {topics.length} {topics.length === 1 ? "assunto" : "assuntos"} nesta disciplina</span>
        </div>
        <div className="discipline-edital-panel__score">
          <strong>{percent}%</strong>
          <span>{completedCount} de {topics.length} concluídos</span>
        </div>
      </header>
      <div className="discipline-edital-panel__progress" role="progressbar" aria-label="Progresso dos assuntos desta disciplina" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-valuetext={percent + "% concluído"}>
        <span style={{ width: percent + "%" }} />
      </div>
      {loading ? (
        <p className="discipline-edital-panel__empty">Carregando os assuntos do edital…</p>
      ) : topics.length ? (
        <ul className="discipline-edital-panel__topics">
          {visibleTopics.map((topic) => (
            <li key={topic.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!completed[topic.id]}
                  onChange={() => onToggle(topic.id)}
                  aria-label={(completed[topic.id] ? "Marcar como pendente: " : "Marcar como concluído: ") + topic.topic_text}
                />
                <span>{topic.topic_text}</span>
              </label>
              <Link
                to="/dashboard/edital/$topicId"
                params={{ topicId: topic.id }}
                aria-label={"Abrir assunto: " + topic.topic_text}
              >
                <ChevronRight aria-hidden="true" size={17} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="discipline-edital-panel__empty">
          Esta disciplina não possui assuntos publicados nesta edição. Consulte o programa completo para conferir a estrutura do edital.
        </p>
      )}
      <footer className="discipline-edital-panel__footer">
        <Link to="/dashboard/edital" search={{ edition: edition.id }}>
          Ver edital completo <ChevronRight aria-hidden="true" size={15} />
        </Link>
        {topics.length > 0 && <span>{topics.length - completedCount} pendentes</span>}
      </footer>
    </section>
  );
}

function DisciplinePracticePanel({
  userId,
  subject,
  topic,
  items,
}: {
  userId: string;
  subject: string;
  topic: string;
  items: Parameters<typeof materialsOf>[1];
}) {
  const selected = topic
    ? items.find((item) => {
        const label = (item as { topic_label?: string }).topic_label;
        return (
          label &&
          (label === topic || materialTopic(subject, label) === materialTopic(subject, topic))
        );
      })
    : items[0];
  const material = useStudyMaterial(selected?.slug ?? "", !!selected);
  return (
    <MaterialPractice
      userId={userId}
      label={topic || subject}
      scope={{ subject, ...(topic ? { topic: materialTopic(subject, topic) } : {}) }}
      authoredKey={selected?.slug ?? subject}
      authoredQuiz={material.data?.quiz ?? []}
      authoredReview={material.data?.practice_review}
    />
  );
}
