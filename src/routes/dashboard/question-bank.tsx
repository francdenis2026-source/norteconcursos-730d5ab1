import { canonicalSubject, canonicalBoard, canonicalCareerName } from "@/lib/subjects";
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, BookOpenCheck, Building2, FileCheck2, Layers3, LibraryBig, Loader2, RefreshCw, Search, TextSearch, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchAllRows, isMissingQuestionTable } from "@/lib/catalog";
import { isEligibleQuestion } from "@/lib/questionFormat";
import { needsMissingSupportText } from "@/lib/questionText";
import { cn } from "@/lib/utils";

/**
 * Acervo de questões: página só de consulta. Mostra o que existe na plataforma (por disciplina, banca, prova e origem)
 * e a qualidade do acervo. Resolver questões é no Treinador; aqui não há filtros de treino, para não duplicá-lo.
 */
export const Route = createFileRoute("/dashboard/question-bank")({
  component: QuestionBankPage,
  head: () => ({ meta: [{ title: "Acervo de questões | Norte Concurso" }] }),
});

type SourceKind = "official" | "curated" | "personal";
interface CatalogItem {
  id: string;
  contest: string;
  year: string;
  career: string;
  board: string;
  subject: string;
  source: SourceKind;
}
const SOURCE_LABELS: Record<SourceKind, string> = {
  official: "Provas oficiais",
  curated: "Questões autorais",
  personal: "Meu caderno",
};

function QuestionBankPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [items, setItems] = React.useState<CatalogItem[]>([]);
  const [missingText, setMissingText] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [source, setSource] = React.useState<"all" | SourceKind>("all");
  const [examLimit, setExamLimit] = React.useState(15);

  const load = React.useCallback(async () => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const query = async (table: "question_bank" | "curated_question_catalog" | "official_exam_questions" | "board_exam_questions", fields: string, userId?: string) => ({
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
      });
      const [personal, curated, official, boardQuestions] = await Promise.all([
        query("question_bank", "id,contest_name,contest_year,subject", user.id),
        query("curated_question_catalog", "id,contest_name,contest_year,career_name,exam_board,subject"),
        query("official_exam_questions", "id,contest_name,exam_year,career_name,exam_board,subject,legal_review_required,legal_audit_completed,context_review_required"),
        query("board_exam_questions", "id,contest_name,exam_year,career_name,board,subject,legal_review_required,needs_visual").catch((e: unknown) => {
          if (isMissingQuestionTable(e)) return { data: [] as Record<string, unknown>[] };
          throw e;
        }),
      ]);
      const rows = (list: Record<string, unknown>[], src: SourceKind) => list.filter(isEligibleQuestion).map((row) => normalize(row, src));
      setItems([
        ...rows((boardQuestions.data || []).map((r) => ({ ...r, context_review_required: r["needs_visual"] })), "official"),
        ...rows(official.data || [], "official"),
        ...rows(curated.data || [], "curated"),
        ...rows(personal.data || [], "personal"),
      ]);
      // quantas questões de Português dependem de um texto de apoio que ainda não está cadastrado
      try {
        const pt = await fetchAllRows((from, to) =>
          supabase.from("official_exam_questions").select("id,subject,question_text").ilike("subject", "%portugu%").eq("content_status", "active").order("id").range(from, to).returns<{ id: string; subject: string; question_text: string }[]>(),
        );
        setMissingText(pt.filter((q) => needsMissingSupportText({ subject: q.subject, text: q.question_text, source: "official" })).length);
      } catch {
        setMissingText(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível organizar o acervo.");
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);
  React.useEffect(() => { void load(); }, [load]);

  const visible = React.useMemo(() => {
    const q = search.trim().toLocaleLowerCase("pt-BR");
    return items.filter((i) => (source === "all" || i.source === source) && (!q || `${i.contest} ${i.board} ${i.subject} ${i.career} ${i.year}`.toLocaleLowerCase("pt-BR").includes(q)));
  }, [items, search, source]);

  const bySubject = React.useMemo(() => countBy(visible, (i) => i.subject), [visible]);
  const byBoard = React.useMemo(() => countBy(visible.filter((i) => i.board !== "Não informada" && i.board !== "Meu caderno"), (i) => i.board), [visible]);
  const byYear = React.useMemo(() => countBy(visible.filter((i) => /^\d{4}$/.test(i.year)), (i) => i.year).sort((a, b) => Number(b[0]) - Number(a[0])), [visible]);
  const exams = React.useMemo(() => {
    const map = new Map<string, { contest: string; year: string; board: string; career: string; count: number; subjects: Set<string> }>();
    for (const i of visible.filter((x) => x.source !== "personal")) {
      const key = `${i.contest}|${i.year}|${i.board}|${i.career}`;
      const cur = map.get(key) ?? { contest: i.contest, year: i.year, board: i.board, career: i.career, count: 0, subjects: new Set<string>() };
      cur.count += 1;
      cur.subjects.add(i.subject);
      map.set(key, cur);
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [visible]);
  const bySource = React.useMemo(() => countBy(items, (i) => i.source), [items]);

  if (authLoading || loading) return <Loading />;
  if (!user || user.id === "demo-user") return <Login />;
  if (error) return <ErrorState message={error} retry={load} />;

  const total = visible.length;
  const maxSubject = bySubject[0]?.[1] ?? 1;
  const maxBoard = byBoard[0]?.[1] ?? 1;
  return (
    <div className="space-y-6 pb-8">
      <section className="page-hero page-hero--lg" data-hero="trainer">
        <span className="hero-chip"><LibraryBig className="mr-1 h-3.5 w-3.5" /> Acervo de questões</span>
        <h1 className="text-3xl font-black md:text-5xl">O que existe na plataforma</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-200 md:text-base">
          Consulte a cobertura por disciplina, banca e prova. Esta página é só de consulta; para resolver questões, com correção imediata e cronômetro, use o Treinador.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-700"><Link to="/dashboard/question-trainer"><BookOpenCheck className="h-4 w-4" /> Ir para o Treinador</Link></Button>
          <Button asChild variant="outline" className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20"><Link to="/dashboard/mock-exams"><Trophy className="h-4 w-4" /> Fazer um simulado</Link></Button>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric icon={LibraryBig} value={items.length} label="questões ativas" />
          <Metric icon={FileCheck2} value={new Set(items.filter((i) => i.source !== "personal").map((i) => `${i.contest}|${i.year}`)).size} label="provas e concursos" />
          <Metric icon={Building2} value={new Set(items.map((i) => i.board).filter((b) => b !== "Não informada" && b !== "Meu caderno")).size} label="bancas" />
          <Metric icon={Layers3} value={new Set(items.map((i) => i.subject)).size} label="disciplinas" />
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-60 flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input className="pl-9" placeholder="Buscar concurso, banca, disciplina, cargo ou ano…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Buscar no acervo" />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Origem das questões">
            {([["all", "Todas"], ["official", SOURCE_LABELS.official], ["curated", SOURCE_LABELS.curated], ["personal", SOURCE_LABELS.personal]] as const).map(([id, label]) => (
              <button key={id} type="button" aria-pressed={source === id} onClick={() => setSource(id)} className={cn("rounded-full border px-3 py-1.5 text-sm font-semibold", source === id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted")}>
                {label}{id !== "all" && <span className="ml-1.5 text-xs opacity-80">{bySource.find(([k]) => k === id)?.[1] ?? 0}</span>}
              </button>
            ))}
          </div>
          <p className="w-full text-sm text-muted-foreground" aria-live="polite">{total} questões nesta consulta.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Distribution title="Por disciplina" description="Quantidade de questões em cada matéria." rows={bySubject.slice(0, 16)} max={maxSubject} total={total} linkKey="area" />
        <Distribution title="Por banca" description="Bancas organizadoras das provas." rows={byBoard.slice(0, 12)} max={maxBoard} total={total} linkKey="board" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Provas e concursos</CardTitle>
          <CardDescription>As provas com mais questões. O botão leva ao Treinador com a prova já selecionada.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {exams.slice(0, examLimit).map((e) => (
            <div key={`${e.contest}${e.year}${e.board}${e.career}`} className="flex flex-wrap items-center gap-3 rounded-xl border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{e.contest} <span className="font-normal text-muted-foreground">· {e.year}</span></p>
                <p className="truncate text-xs text-muted-foreground">{e.board} · {e.career} · {e.subjects.size} disciplinas</p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-sm font-bold tabular-nums">{e.count} questões</span>
              <Button asChild size="sm" variant="outline"><Link to="/dashboard/question-trainer" search={{ contest: e.contest, year: /^\d{4}$/.test(e.year) ? e.year : undefined, board: e.board !== "Não informada" ? e.board : undefined, career: e.career } as never}>Treinar esta prova <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
            </div>
          ))}
          {!exams.length && <p className="text-sm text-muted-foreground">Nenhuma prova encontrada para esta consulta.</p>}
          {exams.length > examLimit && <Button variant="ghost" onClick={() => setExamLimit((n) => n + 20)}>Mostrar mais ({exams.length - examLimit} restantes)</Button>}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader><CardTitle className="text-lg">Por ano da prova</CardTitle><CardDescription>Distribuição das questões ao longo dos anos.</CardDescription></CardHeader>
          <CardContent className="space-y-1.5">
            {byYear.slice(0, 14).map(([y, n]) => (
              <div key={y} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 text-sm"><span className="font-mono">{y}</span><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" style={{ width: `${(n / (byYear.reduce((m, r) => Math.max(m, r[1]), 1))) * 100}%` }} /></div><span className="text-right tabular-nums text-muted-foreground">{n}</span></div>
            ))}
            {!byYear.length && <p className="text-sm text-muted-foreground">Sem dados de ano para esta consulta.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Qualidade do acervo</CardTitle><CardDescription>O que a plataforma já garante e o que ainda está em construção.</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="flex gap-2"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> Questões oficiais só entram após conferência com o gabarito definitivo; itens com revisão jurídica pendente ficam fora do acervo.</p>
            <p className="flex gap-2"><Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden /> Formatos suportados: Certo ou Errado, múltipla escolha com quatro ou cinco alternativas.</p>
            {missingText !== null && (
              <p className={cn("flex gap-2 rounded-lg border p-2", missingText ? "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-100" : "border-emerald-300 bg-emerald-50 text-emerald-950")}>
                <TextSearch className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {missingText ? <span><strong>{missingText} questões de Língua Portuguesa</strong> aguardam o texto de apoio e ficam fora do treino e dos simulados até o texto ser cadastrado.</span> : <span>Todas as questões de Português têm o texto de apoio necessário.</span>}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Distribution({ title, description, rows, max, total, linkKey }: { title: string; description: string; rows: Array<[string, number]>; max: number; total: number; linkKey: "area" | "board" }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
      <CardContent className="space-y-1.5">
        {rows.map(([name, n]) => (
          <Link key={name} to="/dashboard/question-trainer" search={{ [linkKey]: name } as never} className="group grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/60" aria-label={`Treinar ${name}`}>
            <span className="truncate font-medium">{name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${Math.max(3, (n / max) * 100)}%` }} /></span>
            <span className="flex items-center gap-2 tabular-nums text-muted-foreground"><span className="font-semibold text-foreground">{n}</span> {total ? `${Math.round((n / total) * 100)}%` : ""} <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden /></span>
          </Link>
        ))}
        {!rows.length && <p className="text-sm text-muted-foreground">Nada encontrado para esta consulta.</p>}
      </CardContent>
    </Card>
  );
}

function Metric({ icon: Icon, value, label }: { icon: React.ElementType; value: number; label: string }) {
  return (
    <div className="hero-stat">
      <span><Icon />{label}</span>
      <strong className="tabular">{value}</strong>
    </div>
  );
}
function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
      <p className="mt-3 text-sm text-muted-foreground">Organizando o acervo…</p>
    </div>
  );
}
function Login() {
  return <LockedState image="trainer" title={<>Acervo de <em>questões</em></>} description="Entre na sua conta para consultar o acervo de questões." />;
}
function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <Card className="mx-auto mt-10 max-w-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h2 className="mt-4 text-xl font-black">Falha ao carregar o acervo</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-5 gap-2" onClick={retry}><RefreshCw className="h-4 w-4" /> Tentar novamente</Button>
      </CardContent>
    </Card>
  );
}
function normalize(row: Record<string, unknown>, source: SourceKind): CatalogItem {
  return {
    id: String(row["id"]),
    contest: String(row["contest_name"] || "Não informado"),
    year: String((source === "official" ? row["exam_year"] : row["contest_year"]) || "—"),
    career: source === "personal" ? "Meu caderno" : canonicalCareerName(String(row["career_name"] || "Carreira policial")),
    board: source === "personal" ? "Meu caderno" : canonicalBoard(String(row["board"] || row["exam_board"] || "Não informada")),
    subject: canonicalSubject(String(row["subject"] || "Sem disciplina")),
    source,
  };
}
function countBy<T>(items: T[], key: (i: T) => string): Array<[string, number]> {
  return Array.from(items.reduce((m, i) => m.set(key(i), (m.get(key(i)) || 0) + 1), new Map<string, number>())).sort((a, b) => b[1] - a[1]);
}
