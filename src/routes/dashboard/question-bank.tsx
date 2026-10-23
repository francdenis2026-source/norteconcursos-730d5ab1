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
  TextSearch,
} from "lucide-react";
import { PlatformQuestionCounts } from "@/components/dashboard/PlatformQuestionCounts";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import {
  availableQuestionBank,
  publishedQuestionBank,
  reviewedQuestionBank,
  searchQuestionCatalog,
  questionBankExams,
  questionBankSearch,
  type BankSource,
  type BankCollection,
} from "@/lib/questionBank";
import { trainerCollectionQuestions } from "@/lib/trainerFilters";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PageHero, LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { needsMissingSupportText } from "@/lib/questionText";
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
  const { catalog, loading, error, reload } = useQuestionCatalog(user?.id, canLoad);
  const summary = usePlatformQuestionSummary(canLoad);
  const reviewed = React.useMemo(() => reviewedQuestionBank(catalog).length, [catalog]);
  const [collection, setCollection] = React.useState<BankCollection>("contests");
  const [search, setSearch] = React.useState("");
  const [source, setSource] = React.useState<BankSource>("all");
  const [detail, setDetail] = React.useState<CatalogDetail | null>(null);
  const detailTrigger = React.useRef<HTMLButtonElement | null>(null);
  const publicCatalog = React.useMemo(() => publishedQuestionBank(catalog), [catalog]);
  const openDetail = (view: CatalogDetail, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setDetail(view);
  };
  const [examLimit, setExamLimit] = React.useState(15);
  const items = React.useMemo(
    () => availableQuestionBank(catalog, collection),
    [catalog, collection],
  );
  const missingText = React.useMemo(
    () => trainerCollectionQuestions(catalog, collection).filter(needsMissingSupportText).length,
    [catalog, collection],
  );
  const visible = React.useMemo(
    () =>
      searchQuestionCatalog(
        items.filter((q) => source === "all" || q.source === source),
        search,
      ),
    [items, source, search],
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
  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} retry={reload} />;

  const total = visible.length;
  const maxSubject = bySubject[0]?.[1] ?? 1;
  const maxBoard = byBoard[0]?.[1] ?? 1;
  return (
    <div className="question-workspace question-catalog">
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
        reviewed={reviewed}
        onExplore={(e) => openDetail("platform", e.currentTarget)}
      />
      <QuestionCatalogDetails
        view={detail}
        onClose={() => setDetail(null)}
        restoreFocus={() => detailTrigger.current?.focus()}
        publicCatalog={publicCatalog}
        platformSummary={summary.data}
        reviewedCount={reviewed}
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
                    setExamLimit(15);
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
            {total} questões nesta consulta.
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

      <div className="question-catalog__distributions grid gap-4 xl:grid-cols-2">
        <Distribution
          title="Por disciplina"
          description="Quantidade de questões em cada matéria."
          rows={bySubject}
          max={maxSubject}
          total={total}
          collection={collection}
          source={source}
          query={search}
          linkKey="subject"
        />
        <Distribution
          title="Por banca"
          description="Bancas organizadoras das provas."
          rows={byBoard}
          max={maxBoard}
          total={total}
          collection={collection}
          source={source}
          query={search}
          linkKey="board"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Provas e concursos</CardTitle>
          <CardDescription>
            Somente questões de provas oficiais. Cada seleção identifica concurso, cargo, banca e
            edição; questões autorais não entram nessa contagem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {exams.slice(0, examLimit).map((e) => (
            <div key={e.key} className="flex flex-wrap items-center gap-3 rounded-xl border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">
                  {e.question.contest}{" "}
                  <span className="font-normal text-muted-foreground">· {e.question.year}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {e.question.board} · {e.question.career} · {e.subjects.size} disciplinas
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-sm font-bold tabular-nums">
                {e.count} questões
              </span>
              <Button asChild size="sm" variant="outline">
                <Link
                  to="/dashboard/question-trainer"
                  search={questionBankSearch(collection, source, search, { exam: e.question })}
                >
                  Treinar esta prova <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
          {!exams.length && (
            <p className="text-sm text-muted-foreground">
              Nenhuma prova encontrada para esta consulta.
            </p>
          )}
          {exams.length > examLimit && (
            <Button variant="ghost" onClick={() => setExamLimit((n) => n + 20)}>
              Mostrar mais ({exams.length - examLimit} restantes)
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Por ano da prova</CardTitle>
            <CardDescription>Distribuição das questões ao longo dos anos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {byYear.map(([y, n]) => (
              <Link
                key={y}
                to="/dashboard/question-trainer"
                search={questionBankSearch(collection, source, search, { year: y })}
                aria-label={`Treinar questões de ${y}`}
                className="grid min-h-11 grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-lg px-2 text-sm hover:bg-muted"
              >
                <span className="font-mono">{y}</span>
                <span className="h-2 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-sky-500"
                    style={{ width: `${(n / Math.max(1, ...byYear.map((r) => r[1]))) * 100}%` }}
                  />
                </span>
                <span className="flex items-center gap-2 tabular-nums">
                  {n}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
            {!byYear.length && (
              <p className="text-sm text-muted-foreground">Sem dados de ano para esta consulta.</p>
            )}
          </CardContent>
        </Card>
        <details className="question-workspace__help question-catalog__quality">
          <summary>
            Qualidade do acervo{missingText ? ` · ${missingText} com apoio pendente` : ""}
          </summary>
          <div className="space-y-3 text-sm">
            <p className="flex gap-2">
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />{" "}
              Questões oficiais só entram após conferência com o gabarito definitivo; itens com
              revisão jurídica pendente ficam fora do acervo.
            </p>
            <p className="flex gap-2">
              <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden /> Formatos
              suportados: Certo ou Errado, múltipla escolha com quatro ou cinco alternativas.
            </p>
            {missingText !== null && (
              <p
                className={cn(
                  "flex gap-2 rounded-lg border p-2",
                  missingText
                    ? "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-100"
                    : "border-emerald-300 bg-emerald-50 text-emerald-950",
                )}
              >
                <TextSearch className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {missingText ? (
                  <span>
                    <strong>{missingText} questões de Língua Portuguesa</strong> aguardam o texto de
                    apoio e ficam fora do treino e dos simulados até o texto ser cadastrado.
                  </span>
                ) : (
                  <span>
                    As questões de Português disponíveis nesta área têm o apoio necessário.
                  </span>
                )}
              </p>
            )}
          </div>
        </details>
      </div>
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
            className="group grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 min-h-11 rounded-lg px-2 py-2 text-sm hover:bg-muted/60"
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
