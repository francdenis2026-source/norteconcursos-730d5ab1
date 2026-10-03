import { canonicalSubject } from "@/lib/subjects";
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpenCheck,
  Building2,
  FileCheck2,
  Layers3,
  LibraryBig,
  Loader2,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { QuestionTotals } from "@/components/dashboard/QuestionTotals";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllRows } from "@/lib/catalog";
import { isEligibleQuestion } from "@/lib/questionFormat";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-bank")({ component: QuestionBankPage });
type SourceKind = "official" | "curated" | "personal";
interface CatalogItem {
  id: string;
  contest: string;
  year: string;
  career: string;
  board: string;
  subject: string;
  source: SourceKind;
  state: string;
  category: string;
}
const SOURCE_LABELS: Record<SourceKind, string> = {
  official: "Provas oficiais",
  curated: "Questões autorais",
  personal: "Meu caderno",
};

function QuestionBankPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [items, setItems] = React.useState<CatalogItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [contest, setContest] = React.useState("all"),
    [board, setBoard] = React.useState("all"),
    [career, setCareer] = React.useState("all"),
    [year, setYear] = React.useState("all"),
    [subject, setSubject] = React.useState("all"),
    [source, setSource] = React.useState("all"),
    [state, setState] = React.useState("all"),
    [category, setCategory] = React.useState("all");
  const load = React.useCallback(async () => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const query = async (
        table: "question_bank" | "curated_question_catalog" | "official_exam_questions",
        fields: string,
        userId?: string,
      ) => ({
        data: await fetchAllRows((from, to) => {
          let q = supabase
            .from(table)
            .select(fields + ",content_status,official_answer,legal_basis,law_version_checked_at")
            .eq("content_status", "active")
            .order("id")
            .range(from, to);
          if (userId) q = q.eq("user_id", userId);
          return q.returns<Record<string, unknown>[]>();
        }),
        error: null,
      });
      const [personal, curated, official] = await Promise.all([
        query(
          "question_bank",
          "id,contest_name,contest_year,subject,state,career_category",
          user.id,
        ),
        query(
          "curated_question_catalog",
          "id,contest_name,contest_year,career_name,exam_board,subject,state,career_category",
        ),
        query(
          "official_exam_questions",
          "id,contest_name,exam_year,career_name,exam_board,subject,state,career_category,legal_review_required,legal_audit_completed,context_review_required",
        ),
      ]);
      if (personal.error) throw personal.error;
      if (curated.error) throw curated.error;
      if (official.error) throw official.error;
      const personalRows = ((personal.data || []) as Array<Record<string, unknown>>)
        .filter(isEligibleQuestion)
        .map((row) => normalize(row, "personal"));
      setItems([
        ...((official.data || []) as Array<Record<string, unknown>>)
          .filter(isEligibleQuestion)
          .map((row) => normalize(row, "official")),
        ...((curated.data || []) as Array<Record<string, unknown>>)
          .filter(isEligibleQuestion)
          .map((row) => normalize(row, "curated")),
        ...personalRows,
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível organizar o acervo.");
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);
  React.useEffect(() => {
    void load();
  }, [load]);
  const options = React.useMemo(
    () => ({
      contests: unique(items.map((i) => i.contest)),
      boards: unique(items.map((i) => i.board).filter((i) => i !== "Não informada")),
      careers: unique(items.map((i) => i.career)),
      years: unique(items.map((i) => i.year).sort((a, b) => Number(b) - Number(a))),
      subjects: unique(items.map((i) => i.subject)),
      states: unique(items.map((i) => i.state)),
      categories: unique(items.map((i) => i.category)),
    }),
    [items],
  );
  const filtered = React.useMemo(
    () =>
      items.filter(
        (i) =>
          (contest === "all" || i.contest === contest) &&
          (board === "all" || i.board === board) &&
          (career === "all" || i.career === career) &&
          (year === "all" || i.year === year) &&
          (subject === "all" || i.subject === subject) &&
          (source === "all" || i.source === source) &&
          (state === "all" || i.state === state) &&
          (category === "all" || i.category === category),
      ),
    [items, contest, board, career, year, subject, source, state, category],
  );
  const bySubject = React.useMemo(() => groupBy(filtered, "subject"), [filtered]);
  const byBoard = React.useMemo(() => groupBy(filtered, "board"), [filtered]);
  const reset = () => {
    setContest("all");
    setBoard("all");
    setCareer("all");
    setYear("all");
    setSubject("all");
    setSource("all");
    setState("all");
    setCategory("all");
  };
  if (authLoading || loading) return <Loading />;
  if (!user || user.id === "demo-user") return <Login />;
  if (error) return <ErrorState message={error} retry={load} />;
  const search = {
    contest: contest === "all" ? undefined : contest,
    board: board === "all" ? undefined : board,
    career: career === "all" ? undefined : career,
    year: year === "all" ? undefined : year,
    subject: subject === "all" ? undefined : subject,
    source: source === "all" ? undefined : source,
    state: state === "all" ? undefined : state,
    category: category === "all" ? undefined : category,
  };
  return (
    <div className="space-y-6 pb-8">
      <section className="page-hero page-hero--lg" data-hero="trainer">
        <Badge className="hero-chip">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Central de Treinamento
        </Badge>
        <h1 className="text-3xl font-black md:text-5xl">Escolha como deseja treinar</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-200 md:text-base">
          As questões não ficam expostas no catálogo. Defina banca, carreira, concurso e disciplina;
          os enunciados e opções aparecem somente depois que o treino começar.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric icon={LibraryBig} value={items.length} label="questões ativas" />
          <Metric icon={Building2} value={options.boards.length} label="bancas" />
          <Metric icon={UsersRound} value={options.careers.length} label="carreiras" />
          <Metric icon={Layers3} value={options.subjects.length} label="disciplinas" />
        </div>
      </section>
      <QuestionTotals enabled />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-emerald-600" />
              Configurar bateria
            </CardTitle>
            <CardDescription>
              Combine os critérios. Nenhum gabarito ou enunciado será mostrado nesta etapa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Filter label="Concurso" value={contest} set={setContest} values={options.contests} />
              <Filter label="Banca" value={board} set={setBoard} values={options.boards} />
              <Filter
                label="Carreira ou cargo"
                value={career}
                set={setCareer}
                values={options.careers}
              />
              <Filter label="Estado" value={state} set={setState} values={options.states} />
              <Filter
                label="Categoria"
                value={category}
                set={setCategory}
                values={options.categories}
              />
              <Filter label="Ano" value={year} set={setYear} values={options.years} />
              <Filter
                label="Disciplina"
                value={subject}
                set={setSubject}
                values={options.subjects}
              />
              <Filter
                label="Origem"
                value={source}
                set={setSource}
                values={["official", "curated", "personal"]}
                labels={SOURCE_LABELS}
              />
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-black">{filtered.length}</p>
                  <p className="text-sm text-muted-foreground">
                    questões disponíveis nesta seleção
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={reset}>
                    Limpar
                  </Button>
                  <Button
                    asChild
                    disabled={!filtered.length}
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link to="/dashboard/question-trainer" search={search}>
                      <BookOpenCheck className="h-4 w-4" />
                      Treinar com correção imediata
                    </Link>
                  </Button>
                  <Button asChild disabled={!filtered.length} variant="outline" className="gap-2">
                    <Link to="/dashboard/mock-exams" search={search}>
                      <Play className="h-4 w-4 fill-current" />
                      Fazer simulado
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Formato da questão
            </CardTitle>
            <CardDescription>
              O aplicativo identifica as alternativas e os itens de julgamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <StyleCard
              title="Certo ou Errado"
              description="Itens de julgamento com opções Certo ou Errado."
              options={["Certo", "Errado"]}
            />
            <StyleCard
              title="Múltipla escolha com quatro opções"
              description="Questões objetivas com alternativas A, B, C e D."
              options={["A", "B", "C", "D"]}
            />
            <StyleCard
              title="Múltipla escolha com cinco opções"
              description="Questões objetivas com alternativas A, B, C, D e E."
              options={["A", "B", "C", "D", "E"]}
            />
            <div className="flex gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                O gabarito permanece oculto durante o treino e só aparece na correção final.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <section className="collection-showcase">
        <div className="collection-showcase-heading">
          <span>Rotas rápidas de estudo</span>
          <h2>Entre diretamente no conteúdo que deseja treinar.</h2>
          <p>Selecione uma disciplina ou banca para abrir o treinador com o filtro já aplicado.</p>
        </div>
        <div className="relative z-10 grid gap-6 lg:grid-cols-2">
          <Collection
            title="Acervo por disciplina"
            icon={BookOpenCheck}
            rows={bySubject}
            filterKey="subject"
          />
          <Collection title="Acervo por banca" icon={FileCheck2} rows={byBoard} filterKey="board" />
        </div>
      </section>
      <footer className="rounded-2xl border bg-card px-5 py-4 text-center text-xs text-muted-foreground">
        Acervo educacional com governança editorial
      </footer>
    </div>
  );
}

function StyleCard({
  title,
  description,
  options,
}: {
  title: string;
  description: string;
  options: string[];
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-1">
          {options.map((option) => (
            <span
              key={option}
              className="flex h-7 min-w-7 items-center justify-center rounded-md border bg-muted px-1.5 text-[10px] font-black"
            >
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function Collection({
  title,
  icon: Icon,
  rows,
  filterKey,
}: {
  title: string;
  icon: React.ElementType;
  rows: Array<[string, number]>;
  filterKey: "subject" | "board";
}) {
  return (
    <Card className="catalog-collection-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2">
        {rows.slice(0, 12).map(([name, count]) => (
          <Link
            key={name}
            to="/dashboard/question-trainer"
            search={filterKey === "subject" ? { subject: name } : { board: name }}
            className="collection-study-link"
            aria-label={`Treinar ${filterKey === "subject" ? "a disciplina" : "questões da banca"} ${name}`}
          >
            <span className="truncate text-sm font-semibold">{name}</span>
            <span className="flex shrink-0 items-center gap-2">
              <Badge variant="secondary">{count}</Badge>
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
function Filter({
  label,
  value,
  set,
  values,
  labels,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  values: string[];
  labels?: Record<string, string>;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={set}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              {labels?.[value] || value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  return (
    <div className="hero-stat">
      <span>
        <Icon />
        {label}
      </span>
      <strong className="tabular">{value}</strong>
    </div>
  );
}
function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
      <p className="mt-3 text-sm text-muted-foreground">Organizando opções de treino...</p>
    </div>
  );
}
function Login() {
  return (
    <LockedState
      image="trainer"
      title={
        <>
          Banco de <em>questões</em>
        </>
      }
      description="Entre na sua conta para montar baterias por banca, carreira, concurso e disciplina."
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
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </CardContent>
    </Card>
  );
}
function normalize(row: Record<string, unknown>, source: SourceKind): CatalogItem {
  return {
    id: String(row["id"]),
    contest: String(row["contest_name"] || "Não informado"),
    year: String(source === "official" ? row["exam_year"] : row["contest_year"] || "—"),
    career: String(row["career_name"] || row["contest_name"] || "Não informada"),
    board: String(row["exam_board"] || "Não informada"),
    subject: canonicalSubject(String(row["subject"] || "Sem disciplina")),
    source,
    state: String(row["state"] || ""),
    category: String(row["career_category"] || ""),
  };
}
function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
function groupBy(items: CatalogItem[], key: "subject" | "board") {
  return Array.from(
    items.reduce(
      (map, item) => map.set(item[key], (map.get(item[key]) || 0) + 1),
      new Map<string, number>(),
    ),
  ).sort((a, b) => b[1] - a[1]);
}
