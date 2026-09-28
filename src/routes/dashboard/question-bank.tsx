import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookMarked,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleSlash,
  ExternalLink,
  FileCheck2,
  FilterX,
  Gavel,
  Layers3,
  LibraryBig,
  Loader2,
  Play,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-bank")({ component: QuestionBankPage });

type SourceKind = "official" | "curated" | "personal";
interface QBItem {
  id: string;
  contest_name: string;
  contest_year: string;
  career_name: string;
  exam_board: string;
  item_number: number;
  subject: string;
  subtopic: string | null;
  question_text: string;
  official_answer: string | null;
  candidate_answer: string | null;
  is_correct: boolean | null;
  is_anulada: boolean;
  explanation: string;
  difficulty: string | null;
  source_confidence: string;
  verified_at: string | null;
  law_version_checked_at: string | null;
  source_kind: SourceKind;
  source_page: number | null;
  legal_basis: Array<{ title?: string; lei?: string; artigo?: string; url?: string }>;
}

const PAGE_SIZE = 20;
const SOURCE_LABELS: Record<SourceKind, string> = {
  official: "Prova oficial",
  curated: "Autoral auditada",
  personal: "Questão pessoal",
};

function QuestionBankPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [items, setItems] = React.useState<QBItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [contest, setContest] = React.useState("all");
  const [board, setBoard] = React.useState("all");
  const [career, setCareer] = React.useState("all");
  const [year, setYear] = React.useState("all");
  const [subject, setSubject] = React.useState("all");
  const [source, setSource] = React.useState("all");
  const [performance, setPerformance] = React.useState("all");
  const [sort, setSort] = React.useState("recent");
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [revealed, setRevealed] = React.useState<Set<string>>(new Set());

  const load = React.useCallback(async () => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [personalResult, curatedResult, officialResult] = await Promise.all([
        supabase
          .from("question_bank")
          .select("*")
          .eq("user_id", user.id)
          .order("contest_year", { ascending: false })
          .order("item_number", { ascending: true }),
        supabase
          .from("curated_question_catalog")
          .select("*")
          .eq("content_status", "active")
          .order("contest_year", { ascending: false }),
        supabase
          .from("official_exam_questions")
          .select("*")
          .eq("content_status", "active")
          .neq("official_answer", "X")
          .order("exam_year", { ascending: false })
          .order("item_number", { ascending: true }),
      ]);
      if (personalResult.error) throw personalResult.error;
      if (curatedResult.error) throw curatedResult.error;
      if (officialResult.error) throw officialResult.error;
      const personal = ((personalResult.data || []) as Array<Record<string, unknown>>)
        .filter(
          (row) =>
            !["obsolete", "revoked", "archived"].includes(String(row.content_status || "active")),
        )
        .map((row): QBItem => normalizeQuestion(row, "personal"));
      const curated = ((curatedResult.data || []) as Array<Record<string, unknown>>).map(
        (row): QBItem => normalizeQuestion(row, "curated"),
      );
      const official = ((officialResult.data || []) as Array<Record<string, unknown>>).map(
        (row): QBItem => normalizeQuestion(row, "official"),
      );
      setItems([...official, ...curated, ...personal]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Não foi possível carregar o banco de questões.",
      );
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);

  React.useEffect(() => {
    void load();
  }, [load]);
  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setOpenId(null);
  }, [search, contest, board, career, year, subject, source, performance, sort]);

  const facets = React.useMemo(
    () => ({
      contests: unique(items.map((item) => item.contest_name)),
      boards: unique(
        items.map((item) => item.exam_board).filter((value) => value !== "Não informada"),
      ),
      careers: unique(items.map((item) => item.career_name)),
      years: unique(items.map((item) => item.contest_year).sort((a, b) => Number(b) - Number(a))),
      subjects: unique(items.map((item) => item.subject)),
    }),
    [items],
  );

  const filtered = React.useMemo(() => {
    const term = normalize(search);
    const rows = items.filter((item) => {
      if (
        term &&
        !normalize(
          [
            item.question_text,
            item.subject,
            item.subtopic,
            item.contest_name,
            item.career_name,
            item.exam_board,
          ]
            .filter(Boolean)
            .join(" "),
        ).includes(term)
      )
        return false;
      if (contest !== "all" && item.contest_name !== contest) return false;
      if (board !== "all" && item.exam_board !== board) return false;
      if (career !== "all" && item.career_name !== career) return false;
      if (year !== "all" && item.contest_year !== year) return false;
      if (subject !== "all" && item.subject !== subject) return false;
      if (source !== "all" && item.source_kind !== source) return false;
      if (performance === "correct" && item.is_correct !== true) return false;
      if (performance === "wrong" && item.is_correct !== false) return false;
      if (performance === "blank" && item.candidate_answer) return false;
      return true;
    });
    return rows.sort((a, b) =>
      sort === "oldest"
        ? Number(a.contest_year) - Number(b.contest_year)
        : sort === "subject"
          ? a.subject.localeCompare(b.subject)
          : sort === "contest"
            ? a.contest_name.localeCompare(b.contest_name)
            : Number(b.contest_year) - Number(a.contest_year),
    );
  }, [items, search, contest, board, career, year, subject, source, performance, sort]);

  const stats = React.useMemo(
    () => ({
      total: items.length,
      official: items.filter((item) => item.source_kind === "official").length,
      curated: items.filter((item) => item.source_kind === "curated").length,
      subjects: new Set(items.map((item) => item.subject)).size,
      legal: items.filter((item) => item.law_version_checked_at).length,
    }),
    [items],
  );
  const activeFilterCount =
    [contest, board, career, year, subject, source, performance].filter((value) => value !== "all")
      .length + (search ? 1 : 0);
  const clearFilters = () => {
    setSearch("");
    setContest("all");
    setBoard("all");
    setCareer("all");
    setYear("all");
    setSubject("all");
    setSource("all");
    setPerformance("all");
  };

  if (authLoading || loading) return <LoadingState />;
  if (!user || user.id === "demo-user") return <LoginState />;
  if (error) return <ErrorState message={error} retry={load} />;

  return (
    <div className="space-y-6 pb-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#061a30] via-[#0b3150] to-[#0c695f] p-6 text-white shadow-xl md:p-9">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-white/15 bg-white/10 text-emerald-100 hover:bg-white/10">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Acervo inteligente e auditado
            </Badge>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Banco de Questões</h1>
            <p className="mt-4 text-sm leading-6 text-slate-200 md:text-base">
              Encontre questões por banca, carreira, concurso, disciplina e origem. Conteúdos
              revogados, obsoletos ou sem aprovação editorial não aparecem nesta área.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 gap-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400"
          >
            <Link to="/dashboard/mock-exams">
              <Play className="h-4 w-4 fill-current" /> Treinar no simulador
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          <HeroStat label="questões ativas" value={stats.total} icon={LibraryBig} />
          <HeroStat label="provas oficiais" value={stats.official} icon={FileCheck2} />
          <HeroStat label="autorais auditadas" value={stats.curated} icon={BookOpenCheck} />
          <HeroStat label="disciplinas" value={stats.subjects} icon={Layers3} />
          <HeroStat label="revisões jurídicas" value={stats.legal} icon={Gavel} />
        </div>
      </section>

      <Card className="border-0 shadow-lg ring-1 ring-border/70">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-emerald-600" /> Localizar questões
              </CardTitle>
              <CardDescription>
                Combine os filtros para montar uma seleção específica.
              </CardDescription>
            </div>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2 text-red-600"
              >
                <FilterX className="h-4 w-4" /> Limpar {activeFilterCount} filtro
                {activeFilterCount !== 1 ? "s" : ""}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar no enunciado, assunto, órgão, cargo ou banca..."
              className="h-11 pl-10"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Filter
              label="Concurso"
              value={contest}
              change={setContest}
              options={facets.contests}
            />
            <Filter label="Banca" value={board} change={setBoard} options={facets.boards} />
            <Filter
              label="Carreira ou cargo"
              value={career}
              change={setCareer}
              options={facets.careers}
            />
            <Filter label="Ano" value={year} change={setYear} options={facets.years} />
            <Filter
              label="Disciplina"
              value={subject}
              change={setSubject}
              options={facets.subjects}
            />
            <Filter
              label="Origem"
              value={source}
              change={setSource}
              options={["official", "curated", "personal"]}
              labels={SOURCE_LABELS}
            />
            <Filter
              label="Meu desempenho"
              value={performance}
              change={setPerformance}
              options={["correct", "wrong", "blank"]}
              labels={{ correct: "Acertei", wrong: "Errei", blank: "Sem resposta" }}
            />
            <Filter
              label="Ordenar"
              value={sort}
              change={setSort}
              options={["recent", "oldest", "subject", "contest"]}
              labels={{
                recent: "Mais recentes",
                oldest: "Mais antigas",
                subject: "Por disciplina",
                contest: "Por concurso",
              }}
              all={false}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black">Questões encontradas</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} de {items.length} questões no acervo
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700"
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Somente conteúdo ativo
        </Badge>
      </div>

      {filtered.length ? (
        <div className="space-y-3">
          {filtered.slice(0, visibleCount).map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index + 1}
              open={openId === question.id}
              revealed={revealed.has(question.id)}
              toggle={() => setOpenId(openId === question.id ? null : question.id)}
              reveal={() => setRevealed((old) => new Set(old).add(question.id))}
            />
          ))}
        </div>
      ) : (
        <EmptyResults clear={clearFilters} />
      )}
      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
          >
            Carregar mais {Math.min(PAGE_SIZE, filtered.length - visibleCount)} questões
          </Button>
        </div>
      )}
      <footer className="rounded-2xl border bg-card px-5 py-4 text-center text-xs text-muted-foreground">
        Acervo educacional com governança editorial · Desenvolvido por{" "}
        <strong className="text-foreground">Franc D&apos;nis</strong> · Feijó-AC
      </footer>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  open,
  revealed,
  toggle,
  reveal,
}: {
  question: QBItem;
  index: number;
  open: boolean;
  revealed: boolean;
  toggle: () => void;
  reveal: () => void;
}) {
  const sourceTone =
    question.source_kind === "official"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : question.source_kind === "curated"
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : "border-amber-200 bg-amber-50 text-amber-700";
  return (
    <Card
      className={cn(
        "overflow-hidden border-l-4 transition-shadow hover:shadow-md",
        question.is_correct === true
          ? "border-l-emerald-500"
          : question.is_correct === false
            ? "border-l-red-500"
            : "border-l-slate-300",
      )}
    >
      <button onClick={toggle} className="flex w-full items-start gap-4 p-5 text-left">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={sourceTone}>
              {SOURCE_LABELS[question.source_kind]}
            </Badge>
            <Badge variant="outline">{question.exam_board}</Badge>
            <Badge variant="secondary">{question.subject}</Badge>
            <span className="text-xs text-muted-foreground">
              {question.contest_name} · {question.contest_year}
              {question.item_number ? ` · Item ${question.item_number}` : ""}
            </span>
            {question.verified_at && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
            <StatusIcon correct={question.is_correct} />
          </div>
          <p className={cn("text-sm font-medium leading-6 md:text-base", !open && "line-clamp-2")}>
            {question.question_text}
          </p>
        </div>
        {open ? (
          <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="border-t bg-muted/15 p-5 md:pl-[80px]">
          <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border bg-background px-3 py-1">
              Cargo: {question.career_name}
            </span>
            {question.subtopic && (
              <span className="rounded-full border bg-background px-3 py-1">
                Assunto: {question.subtopic}
              </span>
            )}
            {question.difficulty && (
              <span className="rounded-full border bg-background px-3 py-1">
                Dificuldade: {question.difficulty}
              </span>
            )}
            {question.source_page && (
              <span className="rounded-full border bg-background px-3 py-1">
                Página oficial: {question.source_page}
              </span>
            )}
          </div>
          {!revealed ? (
            <div className="rounded-xl border border-dashed bg-background p-5 text-center">
              <Target className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-2 font-bold">Tente resolver antes de consultar</p>
              <p className="mt-1 text-xs text-muted-foreground">
                O gabarito e a explicação continuam protegidos.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={(event) => {
                  event.stopPropagation();
                  reveal();
                }}
              >
                Revelar solução
              </Button>
            </div>
          ) : (
            <Solution question={question} />
          )}
        </div>
      )}
    </Card>
  );
}

function Solution({ question }: { question: QBItem }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
          Gabarito: {question.official_answer || "—"}
        </Badge>
        {question.candidate_answer && (
          <Badge variant="outline">Sua resposta: {question.candidate_answer}</Badge>
        )}
      </div>
      <div className="rounded-xl border bg-background p-4">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
          Explicação pedagógica
        </p>
        <p className="text-sm leading-6">{question.explanation}</p>
      </div>
      {question.legal_basis.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="mb-2 text-xs font-black uppercase text-indigo-800">Fontes oficiais</p>
          <div className="flex flex-col gap-2">
            {question.legal_basis
              .filter((source) => source.url)
              .map((source, index) => (
                <a
                  key={`${source.url}-${index}`}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:underline"
                >
                  {source.title || source.lei || "Fonte oficial"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
          </div>
        </div>
      )}
      {question.law_version_checked_at && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <Gavel className="h-3.5 w-3.5" />
          Vigência jurídica conferida em{" "}
          {new Date(question.law_version_checked_at).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  change,
  options,
  labels,
  all = true,
}: {
  label: string;
  value: string;
  change: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
  all?: boolean;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={change}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {all && <SelectItem value="all">Todos</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {labels?.[option] || option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
function HeroStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <Icon className="mb-3 h-5 w-5 text-emerald-300" />
      <p className="text-2xl font-black">{value}</p>
      <p className="text-[11px] text-slate-300">{label}</p>
    </div>
  );
}
function StatusIcon({ correct }: { correct: boolean | null }) {
  if (correct === true)
    return (
      <span title="Você acertou">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      </span>
    );
  if (correct === false)
    return (
      <span title="Você errou">
        <XCircle className="h-4 w-4 text-red-600" />
      </span>
    );
  return null;
}
function LoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
      <p className="mt-3 text-sm text-muted-foreground">Organizando o banco de questões...</p>
    </div>
  );
}
function LoginState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <BookMarked className="h-14 w-14 text-muted-foreground/30" />
      <h2 className="mt-4 text-xl font-black">Entre para acessar o acervo</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        O banco profissional é personalizado para cada candidato.
      </p>
    </div>
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
function EmptyResults({ clear }: { clear: () => void }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center py-14 text-center">
        <CircleSlash className="h-12 w-12 text-muted-foreground/30" />
        <h3 className="mt-4 text-lg font-black">Nenhuma questão corresponde aos filtros</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Remova alguns critérios ou faça uma busca mais ampla.
        </p>
        <Button variant="outline" className="mt-5 gap-2" onClick={clear}>
          <FilterX className="h-4 w-4" />
          Limpar filtros
        </Button>
      </CardContent>
    </Card>
  );
}

function normalizeQuestion(row: Record<string, unknown>, sourceKind: SourceKind): QBItem {
  const isOfficial = sourceKind === "official",
    isCurated = sourceKind === "curated";
  return {
    id: `${sourceKind}-${String(row.id)}`,
    contest_name: String(row.contest_name || "Não informado"),
    contest_year: String(isOfficial ? row.exam_year : row.contest_year || "—"),
    career_name: String(row.career_name || row.contest_name || "Não informada"),
    exam_board: String(row.exam_board || "Não informada"),
    item_number: Number(row.item_number || 0),
    subject: String(row.subject || "Sem disciplina"),
    subtopic: row.subtopic ? String(row.subtopic) : null,
    question_text: String(row.question_text || ""),
    official_answer: row.official_answer ? String(row.official_answer) : null,
    candidate_answer: row.candidate_answer ? String(row.candidate_answer) : null,
    is_correct: typeof row.is_correct === "boolean" ? row.is_correct : null,
    is_anulada: Boolean(row.is_anulada),
    explanation: String(
      row.explanation ||
        row.review_note ||
        (isOfficial
          ? "Gabarito conferido na publicação oficial definitiva. O comentário pedagógico detalhado será acrescentado na revisão editorial."
          : "Explicação em revisão editorial."),
    ),
    difficulty: row.difficulty ? String(row.difficulty) : null,
    source_confidence: String(row.source_confidence || "alta"),
    verified_at: row.verified_at ? String(row.verified_at) : null,
    law_version_checked_at: row.law_version_checked_at ? String(row.law_version_checked_at) : null,
    source_kind: sourceKind,
    source_page: row.source_page ? Number(row.source_page) : null,
    legal_basis: Array.isArray(row.legal_basis) ? (row.legal_basis as QBItem["legal_basis"]) : [],
  };
}
function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
