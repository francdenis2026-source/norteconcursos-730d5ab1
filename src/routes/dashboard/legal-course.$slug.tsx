import { materialPracticeSearch } from "@/lib/materialPractice";
import { MaterialPractice } from "@/components/library/MaterialPractice";
import { LibraryDailyGate } from "@/components/dashboard/LibraryDailyGate";
import { acreDate } from "@/lib/acreTime";
import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Flame } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useFocusMode } from "@/hooks/useFocusMode";
import { CobrancaBadge, CobrancaCard, CargoSelect } from "@/components/library/Cobranca";
import { cobrancaOf, topArticles } from "@/lib/cobrancaData";
import { CARGO_GROUPS, CARGO_LABEL, countFor, heatOf, type CargoGroup } from "@/lib/cobrancas";
import { toolsAreaFor } from "@/components/study/StudyTools";
import { LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LegalCoursePractice } from "@/components/library/LegalCoursePractice";
import { WorkedExamples } from "@/components/library/WorkedExamples";
import { LawPracticeLink } from "@/components/library/LawPracticeLink";
import { LegalUpdateNotice } from "@/components/library/LegalUpdateNotice";
import { LegalStudyReading } from "@/components/library/LegalStudyReading";
import { SafeBoundary } from "@/components/library/SafeBoundary";
import { LibraryVideos } from "@/components/library/LibraryVideos";
import { useMediaCatalog } from "@/lib/mediaStore";
import { lawVideos } from "@/lib/relatedVideos";
import { UnitTrueFalse } from "@/components/library/UnitTrueFalse";
import { LegalCoverage } from "@/components/library/LegalCoverage";
import { useStudyMaterial } from "@/lib/studyMaterials";
import { UnitExplanation } from "@/components/library/UnitExplanation";
import { LegalRefProvider } from "@/components/library/LegalRefText";
import { rememberLegal } from "@/components/library/StartHere";
import {
  useLegalCourses,
  useLegalProgress,
  useLegalUnits,
  useLegalExplanationCoverage,
  useLegalRefIndex,
  useLegalExplanation,
  type LegalUnit,
  type LegalCourse,
} from "@/lib/legalCourses";
import {
  legalProgressSummary,
  selectNextLegalUnit,
  type LegalProgress,
  type ReviewRating,
} from "@/lib/legalLearning";
import { supabase } from "@/integrations/supabase/client";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { LibrarySearchMatch } from "@/components/library/LibrarySearchMatch";
import {
  legalSearchExcerpt,
  matchesLegalUnit,
  selectVisibleLegalUnit,
} from "@/lib/legalCourseSearch";
import { normalizeLibrarySearch } from "@/lib/librarySearch";
import { legalStudyCaveat } from "@/lib/legalStudyCaveats";

export const Route = createFileRoute("/dashboard/legal-course/$slug")({
  component: LegalCoursePageGated,
  head: () => ({ meta: [{ title: "Percurso de legislação | Norte Concursos" }] }),
  validateSearch: (
    s: Record<string, unknown>,
  ): { art?: string | undefined; par?: string | undefined; find?: string | undefined } => ({
    find: typeof s["find"] === "string" ? s["find"].slice(0, 300) : undefined,
    art: typeof s["art"] === "string" ? s["art"] : undefined,
    par:
      typeof s["par"] === "string" || typeof s["par"] === "number" ? String(s["par"]) : undefined,
  }),
});

function LegalCoursePageGated() {
  const { slug } = useParams({ from: "/dashboard/legal-course/$slug" });
  return (
    <LibraryDailyGate slug={slug}>
      <LegalCoursePage />
    </LibraryDailyGate>
  );
}

function LegalCoursePage() {
  const fm = useFocusMode();
  const { slug } = useParams({ from: "/dashboard/legal-course/$slug" });
  const { user, isLoading } = useAuthStatus();
  const userId = user?.id !== "demo-user" ? user?.id : undefined;
  const courses = useLegalCourses(userId);
  const course = courses.data?.find((row) => row.slug === slug);
  const units = useLegalUnits(course?.id, userId);
  const progress = useLegalProgress(userId);
  const coverage = useLegalExplanationCoverage(userId).data?.find(
    (row) => row.course_slug === slug,
  );
  const material = useStudyMaterial(course?.material_slug ?? "", !!course && !!userId);
  const { art, par, find } = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard/legal-course/$slug" });
  const refIndex = useLegalRefIndex(courses.data, userId).data ?? null;
  const [selectedId, setSelectedIdState] = useState<string>();
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState("all");
  const [dueOnly, setDueOnly] = useState(false);
  // destaque do que cai em provas, conforme o cargo do aluno (lembrado neste aparelho)
  const [cargo, setCargoState] = useState<CargoGroup | "all">(() => {
    try {
      const v = localStorage.getItem("norte_cargo_destaque");
      return (CARGO_GROUPS as readonly string[]).includes(v ?? "") ? (v as CargoGroup) : "all";
    } catch {
      return "all";
    }
  });
  const setCargo = (v: CargoGroup | "all") => {
    setCargoState(v);
    try {
      localStorage.setItem("norte_cargo_destaque", v);
    } catch {
      /* sem armazenamento */
    }
  };
  const [hotOnly, setHotOnly] = useState(false);
  const [showExcluded, setShowExcluded] = useState(false);
  const [tab, setTab] = useState<"learn" | "application" | "videos">("learn");
  const { catalog } = useMediaCatalog();
  const videos = useMemo(() => lawVideos(catalog, slug), [catalog, slug]);
  const rows = units.data ?? [];
  const states = progress.data ?? [];
  const current = rows.filter((row) => row.content_status === "current");
  const suggested = selectNextLegalUnit(rows, states);
  const fromUrl = art ? rows.find((row) => row.unit_key === art) : undefined;
  const preferred = rows.find((row) => row.id === selectedId) ?? fromUrl ?? suggested ?? current[0];
  const byId = useMemo(() => new Map(states.map((row) => [row.unit_id, row])), [states]);
  const hasSearch = !!normalizeLibrarySearch(search);
  const filtering = hasSearch || chapter !== "all" || dueOnly || hotOnly || showExcluded;
  const visible = rows.filter(
    (row) =>
      (showExcluded || row.content_status === "current") &&
      (chapter === "all" || row.chapter === chapter) &&
      matchesLegalUnit(row, search) &&
      (!dueOnly ||
        (byId.get(row.id)?.due_at && Date.parse(byId.get(row.id)!.due_at!) <= Date.now())) &&
      (!hotOnly || countFor(cobrancaOf(slug, row.unit_key), cargo) > 0),
  );
  const selected = filtering ? selectVisibleLegalUnit(visible, preferred) : preferred;
  const navigationRows = filtering ? visible : current;
  const clearFilters = () => {
    setSearch("");
    setChapter("all");
    setDueOnly(false);
    setHotOnly(false);
    setShowExcluded(false);
  };
  useEffect(() => {
    setSelectedIdState(undefined);
    clearFilters();
    setTab("learn");
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
  // escolher um dispositivo atualiza o endereço (compartilhável e com o botão Voltar funcionando)
  const setSelectedId = (id: string) => {
    setSelectedIdState(id);
    const unit = rows.find((row) => row.id === id);
    if (unit) void navigate({ search: { art: unit.unit_key }, replace: true });
  };
  // link novo (?art=…&par=…) enquanto a página já está aberta: troca o dispositivo escolhido
  useEffect(() => {
    if (art) setSelectedIdState(undefined);
  }, [art, par]);
  useEffect(() => {
    if (course && selected)
      rememberLegal({
        slug: course.slug,
        art: selected.unit_key,
        label: selected.label,
        title: course.title.replace(/ — leitura atualizada$/, ""),
      });
  }, [course?.slug, selected?.unit_key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!art || !selected) return;
    const t = setTimeout(
      () =>
        document
          .getElementById("dispositivo-aberto")
          ?.scrollIntoView({ block: "start", behavior: "smooth" }),
      250,
    );
    return () => clearTimeout(t);
  }, [art, par, selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const summary = legalProgressSummary(
    current.map((row) => row.id),
    states,
  );
  if (!isLoading && !userId)
    return (
      <LockedState
        image="study-desk"
        title="Percurso de legislação"
        description="Entre para estudar e guardar seu progresso e suas revisões."
      />
    );
  if (isLoading || courses.isPending || (course && units.isPending))
    return <Skeleton className="h-80 rounded-2xl" />;
  if (courses.isError || units.isError || !course)
    return (
      <div className="surface-card p-6">
        <p>Não foi possível abrir este percurso.</p>
        <Button
          onClick={() => {
            void courses.refetch();
            void units.refetch();
          }}
        >
          Tentar novamente
        </Button>
        <Link to="/dashboard/library" className="ml-4 underline">
          Biblioteca
        </Link>
      </div>
    );
  return (
    <LegalRefProvider value={{ slug: course.slug, index: refIndex }}>
      <div className={`space-y-5 pb-8 ${fm.containerClass}`}>
        {fm.bar({
          kicker: course.title,
          title: selected?.label ?? "Escolha um artigo",
          position: selected
            ? `${Math.max(1, navigationRows.findIndex((r) => r.id === selected.id) + 1)} de ${navigationRows.length}`
            : "",
          progress: current.length ? (summary.read / current.length) * 100 : 0,
          onPrev:
            selected && navigationRows.findIndex((r) => r.id === selected.id) > 0
              ? () => {
                  const i = navigationRows.findIndex((r) => r.id === selected.id);
                  setSelectedId(navigationRows[i - 1]!.id);
                }
              : undefined,
          onNext:
            selected &&
            navigationRows.findIndex((r) => r.id === selected.id) < navigationRows.length - 1
              ? () => {
                  const i = navigationRows.findIndex((r) => r.id === selected.id);
                  setSelectedId(navigationRows[i + 1]!.id);
                }
              : undefined,
          prevLabel: "Artigo anterior",
          nextLabel: "Próximo artigo",
          tools: toolsAreaFor(`${course.title} ${course.slug}`),
          notesKey: `lei:${course.slug}`,
          extra: (
            <Link
              to="/dashboard/question-trainer"
              search={materialPracticeSearch({
                law: course.slug,
                ...(selected ? { article: selected.label } : {}),
              })}
              className="flex items-center gap-1 rounded-lg bg-emerald-400 px-3 py-2 text-sm font-bold text-emerald-950 hover:bg-emerald-300"
            >
              Questões
            </Link>
          ),
        })}
        {!fm.focus && (
          <nav
            aria-label="Trilha"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/dashboard/library" className="hover:text-foreground hover:underline">
              Biblioteca
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">Legislação</span>
          </nav>
        )}
        {!fm.focus && (
          <header className="workspace-banner workspace-banner--reading surface-card overflow-hidden p-0">
            <div className="space-y-3 p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Percurso de legislação
              </p>
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{course.title}</h1>
              {coverage && (
                <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Explicações cadastradas: {coverage.explained} de {coverage.total_units}
                </p>
              )}
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                {course.overview.intro}
              </p>
            </div>
            <div
              className="grid grid-cols-2 gap-px border-t bg-border sm:grid-cols-4"
              aria-label="Seu progresso nesta lei"
            >
              {(
                [
                  ["Lidos", `${summary.read}/${current.length}`],
                  ["Fixados", summary.practiced],
                  ["Dificuldades", summary.difficult],
                  ["Revisões pendentes", summary.due],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="bg-card p-4">
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <progress
              className="block h-1.5 w-full accent-primary"
              max={Math.max(current.length, 1)}
              value={summary.read}
              aria-label="Dispositivos lidos"
            />
          </header>
        )}
        {!fm.focus && (
          <LegalUpdateNotice
            review={course.legal_review ? { ...course.legal_review, course_slug: undefined } : null}
            slug={course.material_slug}
          />
        )}
        <div
          className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-1.5"
          role="group"
          aria-label="Modo de estudo"
        >
          {!fm.focus && fm.button}
          <Button variant={tab === "learn" ? "default" : "ghost"} onClick={() => setTab("learn")}>
            Estudo por artigo
          </Button>
          <Button
            variant={tab === "application" ? "default" : "ghost"}
            onClick={() => setTab("application")}
          >
            Revisão geral da lei
          </Button>
          {videos.length > 0 && (
            <Button
              variant={tab === "videos" ? "default" : "ghost"}
              onClick={() => setTab("videos")}
            >
              Vídeo-aulas ({videos.length})
            </Button>
          )}
          {suggested && (
            <Button
              variant="ghost"
              className="ml-auto"
              onClick={() => {
                clearFilters();
                setSelectedId(suggested.id);
                setTab("learn");
              }}
            >
              Continuar de onde parei →
            </Button>
          )}
        </div>
        {tab === "learn" && !fm.focus && topArticles(course.slug, cargo, 8).length > 0 && (
          <section className="rounded-xl border bg-card p-3" aria-label="Artigos mais cobrados">
            <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <Flame className="h-4 w-4 text-rose-600" aria-hidden /> Mais cobrados em provas
              {cargo !== "all" && (
                <span className="font-normal text-muted-foreground">para {CARGO_LABEL[cargo]}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {topArticles(course.slug, cargo, 8).map(({ art, n }) => {
                const u = rows.find((r) => r.unit_key === art);
                return u ? (
                  <button
                    key={art}
                    type="button"
                    onClick={() => {
                      clearFilters();
                      setSelectedId(u.id);
                      setTab("learn");
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold hover:bg-muted ${heatOf(n) === "alta" ? "border-rose-300 bg-rose-50 dark:bg-rose-950/30" : "border-amber-300 bg-amber-50 dark:bg-amber-950/30"}`}
                  >
                    <Flame className="h-3.5 w-3.5" aria-hidden />
                    {u.label}
                    <span className="text-xs text-muted-foreground">{n}</span>
                  </button>
                ) : null;
              })}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Contagem de questões das provas da plataforma que citam o artigo ou cobram o seu
              conteúdo.
            </p>
          </section>
        )}
        {progress.isError && (
          <p role="alert" className="rounded-xl border p-3 text-sm">
            Não foi possível carregar o progresso.{" "}
            <button className="underline" onClick={() => void progress.refetch()}>
              Tentar novamente
            </button>
          </p>
        )}
        {tab === "videos" ? (
          <LibraryVideos
            videos={videos}
            law={{ slug: course.slug, materialSlug: course.material_slug }}
          />
        ) : tab === "application" ? (
          material.isPending ? (
            <Skeleton className="h-64" />
          ) : material.data ? (
            <>
              <p className="text-sm text-muted-foreground">
                Este conjunto testa os conceitos indicados no resumo de aplicação. A cobertura da
                leitura integral é acompanhada por dispositivo.
              </p>
              <WorkedExamples
                key={`${userId}:${course.material_slug}`}
                slug={course.material_slug}
                enabled={!!userId}
              />
              {userId && (
                <LegalCoursePractice
                  key={`${userId}:${material.data.slug}`}
                  courseId={course.id}
                  userId={userId}
                  material={material.data}
                />
              )}
              {userId && <LawPracticeLink law={course.slug} userId={userId} />}
              <Link
                to="/dashboard/library/$slug"
                params={{ slug: course.material_slug }}
                className="inline-block underline"
              >
                Abrir explicações e exemplos de aplicação
              </Link>
            </>
          ) : (
            <p>
              Não foi possível carregar os exercícios.{" "}
              <button onClick={() => void material.refetch()} className="underline">
                Tentar novamente
              </button>
            </p>
          )
        ) : (
          <div className={fm.focus ? "block" : "grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]"}>
            {!fm.focus && (
              <aside
                className="surface-card space-y-3 p-4 lg:sticky lg:top-4 lg:self-start"
                aria-label="Navegação da lei"
              >
                <p className="text-sm font-semibold">Artigos</p>
                <label className="block text-sm">
                  Buscar artigo ou expressão
                  <input
                    className="mt-1 w-full rounded-lg border bg-background p-2"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  Capítulo ou seção
                  <select
                    className="mt-1 w-full rounded-lg border bg-background p-2"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                  >
                    <option value="all">Todos os blocos</option>
                    {Array.from(new Set(rows.map((row) => row.chapter))).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <CargoSelect value={cargo} onChange={setCargo} />
                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hotOnly}
                    onChange={(e) => setHotOnly(e.target.checked)}
                  />
                  Só os artigos que caem em provas
                </label>
                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={dueOnly}
                    onChange={(e) => setDueOnly(e.target.checked)}
                  />
                  Somente revisões pendentes
                </label>
                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showExcluded}
                    onChange={(e) => setShowExcluded(e.target.checked)}
                  />
                  Mostrar dispositivos excluídos
                </label>
                <p className="text-xs text-muted-foreground">
                  {visible.length} dispositivos neste filtro
                </p>
                {filtering && (
                  <button type="button" onClick={clearFilters} className="text-sm underline">
                    Limpar busca e filtros
                  </button>
                )}
                <nav
                  className="max-h-[calc(100vh-22rem)] min-h-48 space-y-1 overflow-y-auto pr-1"
                  aria-label="Dispositivos da lei"
                >
                  {visible.map((row) => (
                    <button
                      type="button"
                      key={row.id}
                      aria-current={selected?.id === row.id ? "true" : undefined}
                      onClick={() => setSelectedId(row.id)}
                      className={`block w-full rounded-lg border p-2 text-left text-sm ${selected?.id === row.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted"}`}
                    >
                      <span className="flex items-center gap-2">
                        <strong>{row.label}</strong>
                        <CobrancaBadge stat={cobrancaOf(course.slug, row.unit_key)} group={cargo} />
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {row.content_status === "excluded"
                          ? "Fora da leitura ativa"
                          : byId.get(row.id)?.last_rating === "again"
                            ? "Retomar"
                            : byId.get(row.id)?.read_at
                              ? "Lido"
                              : "A estudar"}
                      </span>
                      {hasSearch && (
                        <span className="mt-1 block text-xs leading-5">
                          <LibrarySearchMatch
                            text={legalSearchExcerpt(row.body_text, search) || row.chapter}
                            query={search}
                          />
                        </span>
                      )}
                    </button>
                  ))}
                  {!visible.length && <p className="text-sm">Nenhum dispositivo neste filtro.</p>}
                </nav>
              </aside>
            )}
            {progress.isPending ? (
              <Skeleton className="h-80 rounded-xl" />
            ) : (
              selected &&
              userId &&
              !progress.isError && (
                <UnitLesson
                  cargo={cargo}
                  key={`${userId}:${selected.id}`}
                  unit={selected}
                  law={course.slug}
                  materialSlug={course.material_slug}
                  references={course.overview.jurisprudence.filter((ref) =>
                    ref.articles.includes(selected.label),
                  )}
                  progress={byId.get(selected.id)}
                  userId={userId}
                  highlightPar={selected.unit_key === art ? par : undefined}
                  searchQuery={hasSearch ? search : selected.unit_key === art ? find : undefined}
                  onPrev={() => {
                    const index = navigationRows.findIndex((row) => row.id === selected.id);
                    if (navigationRows[index - 1]) setSelectedId(navigationRows[index - 1]!.id);
                  }}
                  onNext={() => {
                    const index = navigationRows.findIndex((row) => row.id === selected.id);
                    if (navigationRows[index + 1]) setSelectedId(navigationRows[index + 1]!.id);
                  }}
                />
              )
            )}
            {!selected && !progress.isPending && (
              <div role="status" className="surface-card p-6">
                <p>Nenhum artigo corresponde à busca e aos filtros nesta matéria.</p>
                <button type="button" className="mt-3 underline" onClick={clearFilters}>
                  Limpar busca e filtros
                </button>
              </div>
            )}
          </div>
        )}
        {!fm.focus && (
          <section aria-label="Sobre esta lei" className="space-y-4 border-t pt-5">
            <h2 className="text-lg font-bold">Sobre esta lei</h2>
            <div className="surface-card p-5 text-sm">
              <p className="mt-2 text-xs text-muted-foreground">
                O progresso por artigo orienta suas revisões; ele não certifica aprovação.
              </p>
              <p className="mt-3 text-sm">
                <strong>Edital de referência:</strong> {course.overview.contest}. A leitura integral
                inclui disposições que podem exceder o programa do cargo; confira seu edital.
              </p>
              {isStudySourceUrl(course.source_url) && (
                <a
                  href={course.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm underline"
                >
                  Texto oficial no site do governo
                </a>
              )}
            </div>
            {userId && <LegalCoverage course={course} units={rows} userId={userId} />}
            <details className="surface-card p-5">
              <summary className="cursor-pointer font-semibold">
                Objetivos, atualizações e jurisprudência
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                {course.overview.objectives.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
              <p className="mt-4 whitespace-pre-line border-l-2 border-amber-500 pl-3 text-sm">
                {course.overview.alerts}
              </p>
              {course.overview.jurisprudence.map((ref) => (
                <div key={ref.url} className="mt-4 text-sm">
                  <strong>{ref.title}</strong>
                  <p className="mt-1">{ref.explanation}</p>
                  {isStudySourceUrl(ref.url) && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Conferir no tribunal
                    </a>
                  )}
                </div>
              ))}
              <p className="mt-4 text-xs text-muted-foreground">
                {course.overview.editorial_scope}
              </p>
            </details>
          </section>
        )}
      </div>
    </LegalRefProvider>
  );
}

function UnitLesson({
  cargo,
  unit,
  law,
  materialSlug,
  references,
  progress,
  userId,
  highlightPar,
  searchQuery,
  onNext,
  onPrev,
}: {
  searchQuery?: string | undefined;
  highlightPar?: string | undefined;
  unit: LegalUnit;
  law: string;
  materialSlug: string;
  references: LegalCourse["overview"]["jurisprudence"];
  progress: LegalProgress | undefined;
  userId: string;
  onNext: () => void;
  onPrev?: () => void;
  cargo: CargoGroup | "all";
}) {
  const caveat = legalStudyCaveat(law, unit.unit_key);
  const queryClient = useQueryClient();
  // o texto oficial vem primeiro: o aluno lê a norma, depois a explicação, depois pratica
  const [step, setStep] = useState<"entender" | "texto" | "fixar">("texto");
  const [practiceOpened, setPracticeOpened] = useState(false);
  useEffect(() => {
    if (step === "fixar") setPracticeOpened(true);
  }, [step]);
  const explanation = useLegalExplanation(unit.id, userId);
  const bodyMatch = !!searchQuery && matchesLegalUnit(unit, searchQuery);
  const bodyExcerpt = bodyMatch ? legalSearchExcerpt(unit.body_text, searchQuery!, 520) : "";
  const explanationExcerpt =
    searchQuery && !bodyExcerpt && explanation.data
      ? legalSearchExcerpt(
          [
            explanation.data.simples,
            ...explanation.data.pontos,
            ...explanation.data.atencao,
            explanation.data.exemplo,
            ...explanation.data.prova,
          ].join(" "),
          searchQuery,
          520,
        )
      : "";
  const mode = step === "fixar" ? "recall" : "read";
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState(progress?.notes ?? "");
  const [response, setResponse] = useState("");
  const [busy, setBusy] = useState(false);
  const pendingRequest = useRef<{
    rating: ReviewRating | "read";
    notes: string;
    id: string;
  } | null>(null);
  async function save(rating: ReviewRating | "read") {
    setBusy(true);
    try {
      if (pendingRequest.current?.rating !== rating || pendingRequest.current.notes !== notes)
        pendingRequest.current = { rating, notes, id: crypto.randomUUID() };
      const { error } = await supabase.rpc("record_legal_review_for_user", {
        p_unit_id: unit.id,
        p_rating: rating,
        p_notes: notes,
        p_request_id: pendingRequest.current.id,
        p_expected_user_id: userId,
      });
      if (error) throw error;
      pendingRequest.current = null;
      await queryClient.invalidateQueries({ queryKey: ["legal-progress", userId] });
      toast.success(
        rating === "read"
          ? "Leitura e anotações salvas."
          : "Revisão programada. Seu progresso foi salvo.",
      );
    } catch {
      toast.error("Não foi possível salvar. Suas anotações continuam nesta tela; tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <article id="dispositivo-aberto" className="surface-card scroll-mt-4 space-y-5 p-5 sm:p-7">
      <header className="border-b pb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {unit.chapter}
        </p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{unit.label}</h2>
      </header>
      {searchQuery && (
        <aside
          className="rounded-xl border border-sky-300 bg-sky-50 p-4 text-sm dark:bg-sky-950/30"
          aria-label="Trecho encontrado na busca"
        >
          <p className="font-semibold">Resultado nesta matéria · {unit.label}</p>
          <p className="mt-2 whitespace-pre-wrap leading-7">
            <LibrarySearchMatch
              text={bodyExcerpt || explanationExcerpt || `${unit.label} · ${unit.chapter}`}
              query={searchQuery}
            />
          </p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => setStep(bodyMatch ? "texto" : "entender")}
          >
            {bodyMatch ? "Ver no texto oficial" : "Ver a explicação"}
          </Button>
        </aside>
      )}
      {unit.content_status !== "excluded" && (
        <CobrancaCard stat={cobrancaOf(law, unit.unit_key)} group={cargo} />
      )}
      {unit.content_status === "excluded" ? (
        <p className="rounded-xl border border-amber-500 p-4 text-sm">
          Este dispositivo está vetado, revogado ou sem redação ativa no texto compilado. Não
          integra o progresso de estudo das regras vigentes. Consulte o ato modificador na fonte
          oficial.
        </p>
      ) : (
        <>
          <nav
            className="grid grid-cols-3 gap-1 rounded-xl border bg-card p-1"
            aria-label="Passos de estudo deste artigo"
          >
            {(
              [
                [
                  "texto",
                  "1",
                  "Texto oficial",
                  "Com grifos e dicas dos termos",
                  "from-emerald-500 to-teal-600",
                ],
                [
                  "entender",
                  "2",
                  "Explicação didática",
                  "Entenda a regra e os exemplos",
                  "from-sky-500 to-amber-600",
                ],
                [
                  "fixar",
                  "3",
                  "Praticar",
                  "Até 20 questões deste artigo",
                  "from-amber-500 to-orange-600",
                ],
              ] as const
            ).map(([id, n, title, sub, grad]) => (
              <button
                key={id}
                type="button"
                aria-current={step === id ? "step" : undefined}
                onClick={() => {
                  setStep(id);
                  if (id === "fixar") {
                    setRevealed(false);
                    setResponse("");
                  }
                }}
                className={`flex min-h-11 items-center gap-2 rounded-lg p-2 text-left text-xs sm:p-3 ${step === id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-card"}`}
              >
                <span
                  className={`hidden h-7 w-7 shrink-0 sm:grid place-items-center rounded-full text-xs font-bold ${step === id ? "bg-white/25" : "bg-muted"}`}
                >
                  {n}
                </span>
                <span>
                  <span className="block text-xs font-bold sm:text-sm">{title}</span>
                  <span
                    className={`hidden text-xs sm:block ${step === id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {sub}
                  </span>
                </span>
              </button>
            ))}
          </nav>
          {mode === "recall" && (
            <section className="space-y-3 rounded-xl border p-4">
              <h3 className="font-semibold">Revise de cabeça</h3>
              <p className="text-sm text-muted-foreground">
                Pense na resposta de cada pergunta, sem olhar o artigo. Depois confira com o texto e
                diga o quanto lembrou: isso define quando o artigo volta para revisão.
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {unit.recall.prompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ol>
              <Button variant="outline" onClick={() => setRevealed(true)}>
                Mostrar o texto e conferir
              </Button>
            </section>
          )}
          {step === "entender" && (
            <>
              {caveat && (
                <aside className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 text-sm">
                  <strong>{caveat.title}</strong>
                  <p className="mt-2 leading-7">{caveat.explanation}</p>
                  <a
                    href={caveat.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block underline"
                  >
                    Conferir a fonte oficial
                  </a>
                </aside>
              )}
              {references.map((ref) => (
                <aside key={ref.url} className="rounded-xl border border-amber-500/50 p-4 text-sm">
                  <strong>{ref.title}</strong>
                  <p className="mt-2">{ref.explanation}</p>
                  {isStudySourceUrl(ref.url) && (
                    <a
                      className="mt-2 inline-block underline"
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Fonte do tribunal
                    </a>
                  )}
                </aside>
              ))}
              <UnitExplanation unit={unit} userId={userId} />
              {explanation.isSuccess && !explanation.data && (
                <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  A explicação deste artigo ainda está em preparação. Releia o texto oficial no
                  passo 1.
                </p>
              )}
              <div className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => setStep("texto")}>
                  ← Texto oficial
                </Button>
                <Button
                  onClick={() => {
                    setStep("fixar");
                    setRevealed(false);
                    setResponse("");
                  }}
                >
                  Praticar →
                </Button>
              </div>
            </>
          )}
          {(step === "texto" || (step === "fixar" && revealed)) && (
            <>
              <div
                className={
                  unit.unit_key.startsWith("anexo-") ? "library-body overflow-x-auto" : undefined
                }
              >
                <LegalStudyReading
                  source={unit.body_text}
                  markdown={unit.unit_key.startsWith("anexo-")}
                  highlightPar={highlightPar}
                  searchQuery={searchQuery}
                />
              </div>

              {unit.recall.figures
                ?.filter((figure) => isStudySourceUrl(figure.url))
                .map((figure) => (
                  <figure key={figure.url} className="rounded-xl border p-3">
                    <img
                      src={figure.url}
                      alt={figure.title}
                      className="h-auto max-w-full"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                    <figcaption className="mt-2 text-xs">
                      <a
                        href={figure.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {figure.title}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              {step === "texto" && (
                <div className="flex justify-end">
                  <Button onClick={() => setStep("entender")}>Entender →</Button>
                </div>
              )}
            </>
          )}
          {(step === "fixar" || practiceOpened) && (
            <div hidden={step !== "fixar"} className="space-y-4">
              {caveat?.literalPractice !== false && (
                <SafeBoundary>
                  <UnitTrueFalse key={unit.id} unit={unit} userId={userId} />
                </SafeBoundary>
              )}
              <WorkedExamples slug={materialSlug} enabled={true} articleLabel={unit.label} />
              <MaterialPractice
                key={`${law}:${unit.unit_key}`}
                userId={userId}
                scope={{ law, article: unit.label }}
                label={unit.label}
              />
            </div>
          )}
          {mode === "recall" && revealed && (
            <section className="space-y-3">
              <p className="text-sm">
                Compare sua resposta com o dispositivo inteiro. Registre a regra ou exceção que
                confundiu. Esta avaliação é feita por você; não é correção automática de texto
                livre.
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["again", "Não lembrei · 10 min"],
                    ["hard", "Com dificuldade · 1 dia"],
                    ["good", "Lembrei"],
                    ["easy", "Lembrei com facilidade"],
                  ] as const
                ).map(([rating, label]) => (
                  <Button
                    disabled={busy}
                    key={rating}
                    variant="outline"
                    onClick={() => void save(rating)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </section>
          )}
          <details className="rounded-lg border px-3 py-2 text-sm" open={!!notes}>
            <summary className="cursor-pointer font-medium">Minhas anotações</summary>
            <textarea
              aria-label="Minhas anotações"
              maxLength={4000}
              className="mt-2 min-h-20 w-full rounded-lg border bg-background p-2 text-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </details>
          <div className="flex flex-wrap items-center gap-2 border-t pt-4">
            <Button disabled={busy} onClick={() => void save("read")}>
              Marcar como lido e salvar
            </Button>
            {onPrev && (
              <Button variant="outline" onClick={onPrev}>
                ← Artigo anterior
              </Button>
            )}
            <Button variant="outline" onClick={onNext}>
              Próximo artigo →
            </Button>
          </div>
          {progress?.due_at && (
            <p className="text-xs text-muted-foreground">
              Próxima revisão:{" "}
              {acreDate(progress.due_at).toLocaleString("pt-BR", {
                timeZone: "America/Rio_Branco",
              })}
            </p>
          )}
        </>
      )}
    </article>
  );
}
