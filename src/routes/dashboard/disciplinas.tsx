import { MaterialStudyTabs } from "@/components/library/MaterialStudyTabs";
import { MaterialPractice } from "@/components/library/MaterialPractice";
import { materialTopic } from "@/lib/materialPractice";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
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
import { PageHero, LockedState, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStatus } from "@/hooks/useDashboard";
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
  const shown = normalized
    ? cards.filter((c) => normalizeLibrarySearch(c.name).includes(normalized))
    : cards;
  return (
    <div className="space-y-6 pb-10">
      <PageHero
        image="study-desk"
        size="lg"
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
          {shown.map((card) => {
            const { user } = useAuthStatus();
            const [practiceTopic, setPracticeTopic] = React.useState("");
            const Icon = ICONS[card.icon];
            const body = (
              <>
                <span className="discipline-card__icon">
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
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="discipline-card" data-empty="true" aria-disabled="true">
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
  const items = materialsOf(card.name, materials as never) as typeof materials;
  const tracks = tracksOf(card.name, TRACKS);
  const playlists = playlistsOf(card.name, PLAYLISTS);
  const [read, setRead] = React.useState<Set<string>>(new Set());
  React.useEffect(() => setRead(readSlugs()), []);
  return (
    <div className="space-y-6 pb-10">
      <Link to="/dashboard/disciplinas" className="discipline-back">
        <ArrowLeft aria-hidden="true" size={16} /> Todas as disciplinas
      </Link>
      <PageHero
        image="study-desk"
        size="lg"
        kicker="Disciplina"
        icon={Icon}
        title={<>{card.name}</>}
        description="Materiais de estudo, trilha de aulas, videoaulas e prática desta disciplina."
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
        <div className="page-hero__stats">
          <HeroStat icon={BookOpen} label="Materiais" value={card.materials} />
          <HeroStat icon={PlayCircle} label="Videoaulas" value={card.videos} />
        </div>
      </PageHero>

      <MaterialStudyTabs
        key={card.name}
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
                          <span className="material-card__icon" data-tone="subject">
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
                <GraduationCap aria-hidden="true" size={20} /> Trilha de aulas
              </h2>
              {tracks.length === 0 ? (
                <p className="discipline-none">A trilha desta disciplina está em preparação.</p>
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
                          <span className="material-card__icon" data-tone="more">
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
                        <span className="material-card__icon" data-tone="law">
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
    />
  );
}
