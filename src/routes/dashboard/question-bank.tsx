import "@/styles/question-workspace.css";
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Building2,
  FileCheck2,
  Layers3,
  LibraryBig,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
import { PlatformQuestionCounts } from "@/components/dashboard/PlatformQuestionCounts";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { useQuestionCatalogMetadata } from "@/hooks/useQuestionCatalogMetadata";
import {
  availableQuestionBank,
  publishedQuestionBank,
  searchQuestionCatalog,
  questionBankExams,
  questionBankSearch,
  type BankSource,
  type BankCollection,
} from "@/lib/questionBank";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PageHero, LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { catalogGroups } from "@/lib/questionCatalogSummary";
import { cn } from "@/lib/utils";
import {
  QuestionCatalogDetails,
  type CatalogDetail,
} from "@/components/questions/QuestionCatalogDetails";

/**
 * Acervo de questões: página só de consulta. Mostra o que existe na plataforma (por disciplina, banca, prova e origem)
 * e a qualidade do acervo. Resolver questões é no Treinador; aqui não há filtros de treino, para não duplicá-lo.
 */
export const Route = createFileRoute("/dashboard/question-bank")({
  component: QuestionBankPage,
  head: () => ({ meta: [{ title: "Acervo de questões | Norte Concurso" }] }),
});

type SourceKind = "official" | "curated" | "personal";
const SOURCE_LABELS: Record<SourceKind, string> = {
  official: "Provas oficiais",
  curated: "Questões autorais",
  personal: "Meu caderno",
};

function QuestionBankPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const canLoad = !authLoading && !!user && user.id !== "demo-user";
  const { catalog, loading, error, reload } = useQuestionCatalogMetadata(user?.id, canLoad);
  const summary = usePlatformQuestionSummary(canLoad);
  const [collection, setCollection] = React.useState<BankCollection>("contests");
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);
  const [source, setSource] = React.useState<BankSource>("all");
  const [detail, setDetail] = React.useState<CatalogDetail | null>(null);
  const detailTrigger = React.useRef<HTMLButtonElement | null>(null);
  const publicCatalog = React.useMemo(() => publishedQuestionBank(catalog), [catalog]);
  const openDetail = (view: CatalogDetail, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setDetail(view);
  };
  const [activeView, setActiveView] = React.useState<"subject" | "board" | "exams" | "year">("subject");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const items = React.useMemo(
    () => availableQuestionBank(catalog, collection),
    [catalog, collection],
  );
  const visible = React.useMemo(
    () =>
      searchQuestionCatalog(
        items.filter((q) => source === "all" || q.source === source),
        deferredSearch,
      ),
    [items, source, deferredSearch],
  );
  const bySubject = React.useMemo(
    () =>
      catalogGroups(visible, "subject").map((g): [string, number] => [g.name, g.questions.length]),
    [visible],
  );
  const byBoard = React.useMemo(
    () =>
      catalogGroups(visible, "board").map((g): [string, number] => [g.name, g.questions.length]),
    [visible],
  );
  const byYear = React.useMemo(
    () =>
      countBy(
        visible.filter((q) => /^\d{4}$/.test(q.year)),
        (q) => q.year,
      ).sort((a, b) => Number(b[0]) - Number(a[0])),
    [visible],
  );
  const exams = React.useMemo(() => questionBankExams(visible), [visible]);
  const bySource = React.useMemo(() => countBy(items, (i) => i.source), [items]);

  if (authLoading) return <Loading />;
  if (!user || user.id === "demo-user") return <Login />;
  // Do not hide the entire catalog workspace while thousands of question rows load.
  // Filters accept input immediately and the selected criteria apply when data arrives.
  if (loading)
    return (
      <div className="question-workspace question-catalog space-y-5">
        <PageHero
          image="trainer"
          size="sm"
          kicker="Questões"
          icon={LibraryBig}
          title={<>Explorar <em>questões</em></>}
          description="Prepare seus filtros enquanto o acervo é carregado."
        />
        <Card className="question-catalog__filters">
          <CardContent className="space-y-4 p-4">
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Área de preparação</legend>
              <div className="flex flex-wrap gap-2">
                <Button variant={collection === "contests" ? "default" : "outline"} onClick={() => setCollection("contests")}>Concursos públicos</Button>
                <Button variant={collection === "enem" ? "default" : "outline"} onClick={() => setCollection("enem")}>ENEM</Button>
              </div>
            </fieldset>
            <Input
              aria-label="Buscar no acervo"
              placeholder="Buscar concurso, banca, disciplina, cargo ou ano…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Origem das questões">
              {(["all", "official", "curated", "personal"] as const).map((value) => (
                <Button key={value} size="sm" variant={source === value ? "default" : "outline"} onClick={() => setSource(value)}>
                  {value === "all" ? "Todas" : SOURCE_LABELS[value]}
                </Button>
              ))}
            </div>
            <p role="status" className="text-sm text-muted-foreground">Carregando resultados para os filtros selecionados…</p>
          </CardContent>
        </Card>
      </div>
    );
  if (error) return <ErrorState message={error} retry={reload} />;

  const total = visible.length;
  const activeRows = activeView === "subject" ? bySubject : activeView === "board" ? byBoard : activeView === "year" ? byYear : [];
  const resultCount = activeView === "exams" ? exams.length : activeRows.length;
  const pages = Math.max(1, Math.ceil(resultCount / pageSize));
  const currentPage = Math.min(page, pages);
  const first = (currentPage - 1) * pageSize;
  const visibleRows = activeRows.slice(first, first + pageSize);
  const visibleExams = exams.slice(first, first + pageSize);
  const changeView = (next: typeof activeView) => { setActiveView(next); setPage(1); };
  return (
    <div className="question-workspace question-catalog question-catalog--compact">
      <PageHero
        image="trainer"
        size="sm"
        kicker="Questões"
        icon={LibraryBig}
        title={
          <>
            Explorar <em>questões</em>
          </>
        }
        description="Encontre uma disciplina, banca ou prova e abra sua seleção no treinador."
        actions={
          <Button asChild className="hero-btn-primary gap-2">
            <Link
              to="/dashboard/question-trainer"
              search={questionBankSearch(collection, source, search, {})}
            >
              <BookOpenCheck className="h-4 w-4" /> Ir para o Treinador
            </Link>
          </Button>
        }
      />
      <PlatformQuestionCounts
        enabled={canLoad}
        onExplore={(e) => openDetail("platform", e.currentTarget)}
      />
      <QuestionCatalogDetails
        view={detail}
        onClose={() => setDetail(null)}
        restoreFocus={() => detailTrigger.current?.focus()}
        publicCatalog={publicCatalog}
        platformSummary={summary.data}
        reviewedCount={undefined}
        items={visible}
        collection={collection}
        source={source}
        query={search}
      />

      <Card className="question-catalog__filters">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <fieldset className="w-full border-b pb-4">
            <legend className="mb-2 text-sm font-semibold">Área de preparação</legend>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["contests", "Concursos públicos"],
                  ["enem", "ENEM"],
                ] as const
              ).map(([value, label]) => (
                <Button
                  key={value}
                  variant={collection === value ? "default" : "outline"}
                  aria-pressed={collection === value}
                  onClick={() => {
                    if (value === collection) return;
                    setCollection(value);
                    setSource("all");
                    setSearch("");
                    setPage(1);
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </fieldset>
          <div className="relative min-w-0 w-full flex-1 sm:min-w-60">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              className="pl-9"
              placeholder="Buscar concurso, banca, disciplina, cargo ou ano…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar no acervo"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Origem das questões">
            {(
              [
                ["all", "Todas"],
                ["official", SOURCE_LABELS.official],
                ["curated", SOURCE_LABELS.curated],
                ["personal", SOURCE_LABELS.personal],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={source === id}
                onClick={() => setSource(id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold",
                  source === id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                {label}
                {id !== "all" && (
                  <span className="ml-1.5 text-xs opacity-80">
                    {bySource.find(([k]) => k === id)?.[1] ?? 0}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="w-full text-sm text-muted-foreground" aria-live="polite">
            {total} registros na prévia dos filtros. A contagem final remove itens duplicados ou sem apoio no Treinador.
          </p>
        </CardContent>
      </Card>

      <div>
        <p className="question-catalog__scope">
          Sua seleção de estudo · {collection === "enem" ? "ENEM" : "Concursos públicos"}
          <span>Os números abaixo respeitam a área, a origem e a busca selecionadas.</span>
        </p>
        <div
          className="catalog-metrics catalog-metrics--selection"
          aria-label="Indicadores da seleção de estudo"
        >
          <Metric
            icon={BookOpenCheck}
            value={visible.length}
            label="Questões da seleção"
            hint={collection === "enem" ? "ENEM · ver questões" : "Concursos · ver questões"}
            onClick={(e) => openDetail("questions", e.currentTarget)}
          />
          <Metric
            icon={FileCheck2}
            value={exams.length}
            label="Provas e concursos"
            hint="Explorar provas"
            onClick={(e) => openDetail("exams", e.currentTarget)}
          />
          <Metric
            icon={Building2}
            value={byBoard.length}
            label="Bancas"
            hint="Conhecer a distribuição"
            onClick={(e) => openDetail("boards", e.currentTarget)}
          />
          <Metric
            icon={Layers3}
            value={bySubject.length}
            label="Disciplinas"
            hint="Encontrar sua matéria"
            onClick={(e) => openDetail("subjects", e.currentTarget)}
          />
        </div>
      </div>

      <Card className="question-catalog__browser">
        <CardHeader className="question-catalog__browser-head">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Explorar o acervo</CardTitle>
              <CardDescription>Uma categoria por vez, com resultados paginados e acesso direto ao treino.</CardDescription>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Exibir
              <select aria-label="Resultados por página" className="rounded-lg border bg-background px-2 py-2 text-foreground" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value={6}>6</option><option value={8}>8</option><option value={10}>10</option>
              </select>
            </label>
          </div>
          <div className="question-catalog__view-tabs" role="tablist" aria-label="Organizar resultados por">
            {([["subject","Disciplinas",bySubject.length],["board","Bancas",byBoard.length],["exams","Provas",exams.length],["year","Anos",byYear.length]] as const).map(([key,label,count]) => (
              <button key={key} type="button" role="tab" aria-selected={activeView === key} onClick={() => changeView(key)} className={cn("rounded-lg px-3 py-2 text-sm font-semibold", activeView === key ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted")}>
                {label} <span className="ml-1 text-xs opacity-80">{count}</span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="question-catalog__browser-body">
          <div role="tabpanel" aria-label={activeView === "subject" ? "Disciplinas" : activeView === "board" ? "Bancas" : activeView === "exams" ? "Provas" : "Anos"} className="question-catalog__result-list">
            {activeView !== "exams" && visibleRows.map(([name, count]) => (
              <Link key={name} to="/dashboard/question-trainer" search={questionBankSearch(collection, source, search, { [activeView === "year" ? "year" : activeView]: name })} className="question-catalog__result-row group">
                <span className="min-w-0 truncate font-semibold">{name}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{width: `${Math.max(2, count / Math.max(1, activeRows[0]?.[1] ?? 1) * 100)}%`}} /></span>
                <span className="text-right text-xs tabular-nums text-muted-foreground">{count.toLocaleString("pt-BR")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              </Link>
            ))}
            {activeView === "exams" && visibleExams.map(e => (
              <Link key={e.key} to="/dashboard/question-trainer" search={questionBankSearch(collection, source, search, { exam: e.question })} className="question-catalog__result-row question-catalog__result-row--exam group">
                <span className="min-w-0"><strong className="block truncate">{e.question.contest} · {e.question.year}</strong><small className="block truncate text-muted-foreground">{e.question.board} · {e.question.career} · {e.subjects.size} disciplinas</small></span>
                <span className="text-right text-xs tabular-nums text-muted-foreground">{e.count} questões</span>
                <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
              </Link>
            ))}
            {resultCount === 0 && <p className="rounded-xl border p-5 text-sm text-muted-foreground">Nenhum resultado para os filtros selecionados. Experimente limpar a busca ou alterar a origem.</p>}
          </div>
          <footer className="question-catalog__pager">
            <span className="text-xs text-muted-foreground">{resultCount ? `${first + 1}–${Math.min(first + pageSize, resultCount)} de ${resultCount}` : "Nenhum registro"}</span>
            <div className="flex items-center gap-2">
              <Button type="button" size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</Button>
              <span className="min-w-14 text-center text-xs tabular-nums">{currentPage} / {pages}</span>
              <Button type="button" size="sm" variant="outline" disabled={currentPage >= pages} onClick={() => setPage(p => Math.min(pages, p + 1))}>Próxima</Button>
            </div>
          </footer>
          <p className="text-xs text-muted-foreground">Contagens da prévia do acervo. O Treinador verifica textos de apoio, disponibilidade e questões duplicadas antes da sessão.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Distribution({
  title,
  description,
  rows,
  max,
  total,
  linkKey,
  collection,
  source,
  query,
}: {
  title: string;
  description: string;
  rows: Array<[string, number]>;
  max: number;
  total: number;
  linkKey: "subject" | "board";
  collection: BankCollection;
  source: BankSource;
  query: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {rows.map(([name, n]) => (
          <Link
            key={name}
            to="/dashboard/question-trainer"
            search={questionBankSearch(collection, source, query, { [linkKey]: name })}
            className="group grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 min-h-11 rounded-lg px-2 py-2 text-sm transition-[background-color,transform] duration-150 hover:bg-muted/60 active:scale-[0.98] motion-reduce:active:scale-100"
            aria-label={`Treinar ${name}`}
          >
            <span className="truncate font-medium">{name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.max(3, (n / max) * 100)}%` }}
              />
            </span>
            <span className="flex items-center gap-2 tabular-nums text-muted-foreground">
              <span className="font-semibold text-foreground">{n}</span>{" "}
              {total ? `${Math.round((n / total) * 100)}%` : ""}{" "}
              <ArrowRight
                className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
            </span>
          </Link>
        ))}
        {!rows.length && (
          <p className="text-sm text-muted-foreground">Nada encontrado para esta consulta.</p>
        )}
      </CardContent>
    </Card>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
  hint,
  onClick,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  hint: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className="question-workspace__metric catalog-metric"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`${label}: ${value.toLocaleString("pt-BR")}. Ver detalhes`}
    >
      <span>
        <Icon aria-hidden="true" />
        {label}
      </span>
      <strong className="tabular">{value.toLocaleString("pt-BR")}</strong>
      <small>
        {hint}
        <ArrowRight aria-hidden="true" />
      </small>
    </button>
  );
}
function Loading() {
  return (
    <div aria-busy="true" className="space-y-5">
      <section className="page-hero page-hero--lg workspace-banner" data-hero="trainer">
        <h1>Explorar questões</h1>
        <p>Consulte e organize suas questões para estudar.</p>
      </section>
      <div role="status" className="flex items-center gap-3 rounded-2xl border bg-card p-5">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
        <p className="text-sm text-muted-foreground">Organizando o acervo…</p>
      </div>
    </div>
  );
}
function Login() {
  return (
    <LockedState
      image="trainer"
      title={
        <>
          Explorar <em>questões</em>
        </>
      }
      description="Entre na sua conta para consultar o acervo de questões."
    />
  );
}
function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <Card className="mx-auto mt-10 max-w-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h2 className="mt-4 text-xl font-black">Falha ao carregar o acervo</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-5 gap-2" onClick={retry}>
          <RefreshCw className="h-4 w-4" /> Tentar novamente
        </Button>
      </CardContent>
    </Card>
  );
}
function countBy<T>(items: T[], key: (i: T) => string): Array<[string, number]> {
  return Array.from(
    items.reduce((m, i) => m.set(key(i), (m.get(key(i)) || 0) + 1), new Map<string, number>()),
  ).sort((a, b) => b[1] - a[1]);
}
