import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleSlash2,
  ExternalLink,
  FileStack,
  HelpCircle,
  Image as ImageIcon,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student-exams")({
  validateSearch: (search: Record<string, unknown>) => ({
    career: typeof search.career === "string" ? search.career : undefined,
  }),
  component: StudentExamsPage,
});

interface ExamDoc {
  id: string;
  contest_name: string;
  contest_year: string;
  exam_board: string | null;
  file_name: string;
  storage_path: string;
  score_raw: number | null;
  score_net: number | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  extracted_data: ExamAnalysis | null;
  created_at: string;
}

interface ExamAnalysis {
  resultado_oficial?: {
    nota_total?: number;
    acertos_total?: number;
    erros_total?: number;
    classificacao_ampla_objetiva?: number;
  };
  auditoria_gabarito_definitivo?: {
    divergencia_corrigida?: string;
    observacao?: string;
  };
  items?: Record<string, "correta" | "errada" | "anulada" | "branco">;
  pontuacao_obtida?: {
    total?: number;
    gerais_total?: number;
    especificos?: { pontos?: number; corretas?: number; de?: number };
  };
  habilitado_prova_objetiva?: boolean;
  confirmacao_diario_oficial?: {
    nota_discursiva_deduzida?: number;
    nota_combinada_objetiva_mais_discursiva?: number;
  };
  [key: string]: unknown;
}

interface GroupedExam {
  key: string;
  contest_name: string;
  contest_year: string;
  exam_board: string | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score: number | null;
  pageCount: number;
  extracted_data: ExamAnalysis | null;
  docs: ExamDoc[];
  audit_items: AuditItem[];
}

interface AuditItem {
  contest_year: string;
  item_number: number;
  candidate_answer: "C" | "E" | null;
  official_answer: "C" | "E" | "X";
  comparison_status: "correct" | "wrong" | "annulled" | "blank" | "indeterminate";
  reading_confidence: "high" | "medium" | "low" | "indeterminate";
  evidence_note: string | null;
}

interface DisciplineBreakdown {
  subject: string;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number;
}

const metric = (value: number | null | undefined) => value ?? 0;

// Every exam group is tagged with the exact career/contest it belongs to
// (contest_name). Aggregate metrics (evolution chart, best score, etc.) are always
// computed within a single selected contest — different careers (PF, PRF, ...) are
// never averaged together, per project rule (each career keeps its own panel).
function StudentExamsPage() {
  const { career } = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const [groups, setGroups] = React.useState<GroupedExam[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [signedUrls, setSignedUrls] = React.useState<Record<string, string>>({});
  const [reloadKey, setReloadKey] = React.useState(0);
  const [contestFilter, setContestFilter] = React.useState<string | null>(null);
  const [subjectMaps, setSubjectMaps] = React.useState<Record<string, Record<string, string>>>({});
  const [cutoffs, setCutoffs] = React.useState<
    Record<string, { score: number | null; notes: string | null }>
  >({});

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setIsLoading(false);
      return;
    }
    const load = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      const [{ data, error }, { data: auditData }] = await Promise.all([
        supabase
          .from("student_exam_documents")
          .select("*")
          .eq("user_id", user.id)
          .order("contest_year", { ascending: true }),
        supabase
          .from("student_exam_item_audits")
          .select(
            "contest_year,item_number,candidate_answer,official_answer,comparison_status,reading_confidence,evidence_note",
          )
          .eq("user_id", user.id)
          .order("item_number", { ascending: true }),
      ]);
      if (error) {
        setErrorMessage("Não foi possível sincronizar suas provas. Tente novamente.");
        setIsLoading(false);
        return;
      }
      const map = new Map<string, GroupedExam>();
      for (const doc of (data || []) as ExamDoc[]) {
        const key = `${doc.contest_name}__${doc.contest_year}`;
        if (!map.has(key))
          map.set(key, {
            key,
            contest_name: doc.contest_name,
            contest_year: doc.contest_year,
            exam_board: doc.exam_board,
            correct_count: null,
            wrong_count: null,
            blank_count: null,
            score: null,
            pageCount: 0,
            extracted_data: null,
            docs: [],
            audit_items: [],
          });
        const group = map.get(key)!;
        group.docs.push(doc);
        group.pageCount += 1;
        if (doc.correct_count !== null) group.correct_count = doc.correct_count;
        if (doc.wrong_count !== null) group.wrong_count = doc.wrong_count;
        if (doc.blank_count !== null) group.blank_count = doc.blank_count;
        if (doc.score_net !== null) group.score = Number(doc.score_net);
        else if (doc.score_raw !== null) group.score = Number(doc.score_raw);
        if (doc.extracted_data && Object.keys(doc.extracted_data).length)
          group.extracted_data = doc.extracted_data;
      }
      const allGroups = Array.from(map.values()).map((group) => ({
        ...group,
        score:
          group.score ??
          (group.correct_count !== null && group.wrong_count !== null
            ? group.correct_count - group.wrong_count
            : null),
      }));
      setGroups(allGroups);
      const requestedCareer = career
        ? allGroups.find((group) => {
            const contestName = group.contest_name.toLocaleLowerCase("pt-BR");
            const careerName = career.toLocaleLowerCase("pt-BR");
            return contestName.includes(careerName) || careerName.includes(contestName);
          })?.contest_name
        : null;
      setContestFilter(
        (previous) =>
          requestedCareer ??
          (previous && allGroups.some((group) => group.contest_name === previous)
            ? previous
            : (allGroups[0]?.contest_name ?? null)),
      );
      setIsLoading(false);
    };
    load();
  }, [user, authLoading, reloadKey, career]);

  // Fetches item_number -> subject/discipline for each career present, so the
  // per-item correct/wrong data already stored in extracted_data.items can be
  // rolled up into a "pontos fracos por disciplina" breakdown without duplicating
  // the subject text inside student_exam_documents itself.
  React.useEffect(() => {
    const careers = Array.from(new Set(groups.map((g) => g.contest_name)));
    const missing = careers.filter((c) => !subjectMaps[c]);
    if (!missing.length) return;
    (async () => {
      const results = await Promise.all(
        missing.map((career) =>
          supabase
            .from("official_exam_questions")
            .select("item_number,subject")
            .eq("career_name", career),
        ),
      );
      setSubjectMaps((previous) => {
        const next = { ...previous };
        missing.forEach((career, index) => {
          const rows =
            (results[index].data as { item_number: number; subject: string }[] | null) || [];
          next[career] = Object.fromEntries(rows.map((r) => [String(r.item_number), r.subject]));
        });
        return next;
      });
    })();
  }, [groups, subjectMaps]);

  // Fetches nota de corte reference data for every contest/year already shown in
  // groups, keyed the same way as group.key, so each card can show "você passou"
  // or "faltaram X pontos" alongside the candidate's own score.
  React.useEffect(() => {
    if (!groups.length) return;
    (async () => {
      const { data } = await supabase
        .from("contest_reference_info")
        .select("contest_name,contest_year,cutoff_score,notes");
      const map: Record<string, { score: number | null; notes: string | null }> = {};
      (
        (data as
          | {
              contest_name: string;
              contest_year: string | null;
              cutoff_score: number | null;
              notes: string | null;
            }[]
          | null) || []
      ).forEach((row) => {
        map[`${row.contest_name}__${row.contest_year}`] = {
          score: row.cutoff_score,
          notes: row.notes,
        };
      });
      setCutoffs(map);
    })();
  }, [groups.length]);

  const openGroup = async (group: GroupedExam) => {
    if (openKey === group.key) {
      setOpenKey(null);
      return;
    }
    setOpenKey(group.key);
    const missing = group.docs.filter(
      (doc) => !doc.storage_path.startsWith("manual-entry/") && !signedUrls[doc.id],
    );
    if (!missing.length) return;
    const results = await Promise.all(
      missing.map((doc) =>
        supabase.storage.from("student-exams").createSignedUrl(doc.storage_path, 3600),
      ),
    );
    setSignedUrls((previous) => {
      const next = { ...previous };
      missing.forEach((doc, index) => {
        const url = results[index].data?.signedUrl;
        if (url) next[doc.id] = url;
      });
      return next;
    });
  };

  if (authLoading || isLoading)
    return (
      <div className="p-8 text-sm text-muted-foreground">Sincronizando histórico de provas...</div>
    );
  if (!user || user.id === "demo-user")
    return (
      <EmptyState
        title="Faça login para ver suas provas"
        description="Seu histórico e suas análises ficam protegidos na conta vinculada ao CPF."
      />
    );
  if (errorMessage)
    return (
      <EmptyState title="Falha na sincronização" description={errorMessage}>
        <Button onClick={() => setReloadKey((value) => value + 1)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
      </EmptyState>
    );
  if (!groups.length)
    return (
      <EmptyState
        title="Nenhuma prova encontrada"
        description="Quando uma prova for cadastrada, o diagnóstico completo aparecerá aqui."
      />
    );

  const careers = Array.from(new Set(groups.map((g) => g.contest_name)));
  const activeCareer = contestFilter ?? careers[0];
  const careerGroups = groups.filter((g) => g.contest_name === activeCareer);
  const careerLabel =
    activeCareer.length > 24
      ? activeCareer
          .split(" ")
          .map((w) => w[0])
          .join("")
      : activeCareer;

  const chartData = careerGroups.map((group) => {
    const answered = metric(group.correct_count) + metric(group.wrong_count);
    return {
      year: group.contest_year,
      aproveitamento: answered ? Math.round((metric(group.correct_count) / answered) * 100) : 0,
      saldo: group.score ?? 0,
    };
  });
  const totalPages = careerGroups.reduce((sum, group) => sum + group.pageCount, 0);
  const totalCorrect = careerGroups.reduce((sum, group) => sum + metric(group.correct_count), 0);
  const totalWrong = careerGroups.reduce((sum, group) => sum + metric(group.wrong_count), 0);
  const globalAccuracy =
    totalCorrect + totalWrong ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;
  const bestExam = [...careerGroups].sort(
    (a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity),
  )[0];
  const evolution = (chartData.at(-1)?.aproveitamento ?? 0) - (chartData[0]?.aproveitamento ?? 0);
  const hasMultipleAttempts = careerGroups.length > 1;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] bg-[#071a2f] px-6 py-7 text-white shadow-xl md:px-9 md:py-9">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-4 border-emerald-300/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Inteligência de desempenho
            </Badge>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">Central de Provas</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Seu histórico real transformado em indicadores para orientar a próxima etapa da
              preparação.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="text-xs font-bold">Dados sincronizados</p>
              <p className="text-[11px] text-slate-400">Acesso privado por CPF</p>
            </div>
          </div>
        </div>
      </section>

      {careers.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {careers.map((career) => (
            <button
              key={career}
              type="button"
              onClick={() => setContestFilter(career)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold transition-colors",
                career === activeCareer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                  : "border-slate-200 text-muted-foreground hover:border-emerald-300",
              )}
            >
              {career}
            </button>
          ))}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={FileStack}
          label="Provas analisadas"
          value={String(careerGroups.length)}
          detail={`${totalPages} páginas processadas`}
          tone="navy"
        />
        <MetricCard
          icon={Target}
          label="Aproveitamento geral"
          value={`${globalAccuracy}%`}
          detail={`${totalCorrect} acertos em ${totalCorrect + totalWrong} itens`}
          tone="emerald"
        />
        <MetricCard
          icon={BarChart3}
          label="Melhor saldo"
          value={`${bestExam.score ?? 0} pts`}
          detail={`${careerLabel} ${bestExam.contest_year} · padrão CEBRASPE`}
          tone="amber"
        />
        <MetricCard
          icon={TrendingUp}
          label="Evolução histórica"
          value={hasMultipleAttempts ? `${evolution >= 0 ? "+" : ""}${evolution} p.p.` : "1 prova"}
          detail={
            hasMultipleAttempts
              ? `${careerGroups[0].contest_year} → ${careerGroups.at(-1)?.contest_year}`
              : "Envie outra prova para comparar"
          }
          tone={evolution >= 0 ? "emerald" : "rose"}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <Card className="overflow-hidden border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Evolução entre provas
            </CardTitle>
            <CardDescription>
              {hasMultipleAttempts
                ? "Percentual de acertos considerando apenas itens respondidos."
                : `Só há uma prova de ${careerLabel} cadastrada até agora — a comparação aparece aqui assim que houver outra.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 18, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="accuracyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Aproveitamento"]}
                  labelFormatter={(label) => `${careerLabel} ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="aproveitamento"
                  stroke="#059669"
                  strokeWidth={3}
                  fill="url(#accuracyFill)"
                  dot={{ fill: "#059669", strokeWidth: 3, r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-white shadow-sm dark:from-emerald-950/30 dark:to-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-amber-500" />
              Leitura estratégica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Insight
              label="Melhor desempenho"
              value={`${careerLabel} ${bestExam.contest_year}`}
              text={`${bestExam.score ?? 0} pontos líquidos e ${chartData.find((item) => item.year === bestExam.contest_year)?.aproveitamento ?? 0}% de aproveitamento.`}
            />
            {hasMultipleAttempts && (
              <Insight
                label="Tendência"
                value={evolution >= 0 ? "Evolução positiva" : "Ponto de atenção"}
                text={`Variação de ${Math.abs(evolution)} ponto${Math.abs(evolution) === 1 ? "" : "s"} percentual entre a primeira e a última prova registrada.`}
              />
            )}
            <Insight
              label="Próximo foco"
              value="Reduzir erros líquidos"
              text="No modelo CEBRASPE, cada erro reduz o saldo. Priorize segurança de resposta antes de ampliar o volume."
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-primary">Histórico detalhado</h2>
          <p className="text-sm text-muted-foreground">
            Abra uma prova para ver o boletim, os pontos fracos por disciplina e as páginas
            digitalizadas.
          </p>
        </div>
        {careerGroups.map((group) => {
          const answered = metric(group.correct_count) + metric(group.wrong_count);
          const accuracy = answered
            ? Math.round((metric(group.correct_count) / answered) * 100)
            : 0;
          const official = group.extracted_data?.resultado_oficial;
          const isOpen = openKey === group.key;
          const subjectMap = subjectMaps[group.contest_name];
          const items: Record<string, string> | undefined = group.extracted_data?.items;
          const breakdown: DisciplineBreakdown[] = [];
          if (items && subjectMap) {
            const bySubject = new Map<string, { correct: number; wrong: number }>();
            for (const [itemNumber, verdict] of Object.entries(items)) {
              const subject = subjectMap[itemNumber];
              if (
                !subject ||
                verdict === "anulada" ||
                verdict === "branco" ||
                verdict === "pendente_conferencia"
              )
                continue;
              const entry = bySubject.get(subject) ?? { correct: 0, wrong: 0 };
              if (verdict === "correta") entry.correct += 1;
              else if (verdict === "errada") entry.wrong += 1;
              bySubject.set(subject, entry);
            }
            for (const [subject, { correct, wrong }] of bySubject) {
              const total = correct + wrong;
              breakdown.push({
                subject,
                correct,
                wrong,
                total,
                accuracy: total ? Math.round((correct / total) * 100) : 0,
              });
            }
            breakdown.sort((a, b) => a.accuracy - b.accuracy);
          }
          const weakSpots = breakdown.filter((b) => b.total >= 2 && b.accuracy < 50);
          const cutoff = cutoffs[group.key];
          const cutoffKnown = cutoff && cutoff.score !== null;
          const passedCutoff = cutoffKnown && group.score !== null && group.score >= cutoff.score!;
          return (
            <Card
              key={group.key}
              className={cn(
                "overflow-hidden transition-all",
                isOpen && "border-emerald-300 shadow-md",
              )}
            >
              <button type="button" onClick={() => openGroup(group)} className="w-full text-left">
                <CardHeader className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/30">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#071a2f] text-lg font-black text-emerald-300">
                        {group.contest_year.slice(-2)}
                      </div>
                      <div>
                        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
                          {group.contest_name} — {group.contest_year}
                          {official && <Badge className="bg-emerald-600">Oficial</Badge>}
                          {cutoffKnown && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px]",
                                passedCutoff
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                  : "border-rose-300 bg-rose-50 text-rose-700",
                              )}
                            >
                              {passedCutoff ? "Acima do corte" : "Abaixo do corte"}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {group.exam_board || "Banca não identificada"} · {group.pageCount} páginas
                          {cutoffKnown
                            ? ` · Nota de corte: ${cutoff!.score} pts`
                            : " · Nota de corte não localizada"}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3 text-center sm:gap-6">
                      <MiniMetric
                        label="Acertos"
                        value={metric(group.correct_count)}
                        className="text-emerald-600"
                      />
                      <MiniMetric
                        label="Erros"
                        value={metric(group.wrong_count)}
                        className="text-rose-600"
                      />
                      <MiniMetric label="Saldo" value={group.score ?? 0} className="text-primary" />
                      <div className="flex items-center gap-3">
                        <MiniMetric
                          label="Taxa"
                          value={`${accuracy}%`}
                          className="text-amber-600"
                        />
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </button>
              {isOpen && (
                <CardContent className="space-y-5 border-t bg-slate-50/50 pt-5 dark:bg-slate-950/20">
                  {official && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                      <p className="font-black">Boletim individual CEBRASPE confirmado</p>
                      <p className="mt-1">
                        Nota total: {official.nota_total ?? group.score} pontos ·{" "}
                        {official.acertos_total ?? group.correct_count} acertos ·{" "}
                        {official.erros_total ?? group.wrong_count} erros
                        {official.classificacao_ampla_objetiva &&
                          ` · ${official.classificacao_ampla_objetiva}ª colocação`}
                      </p>
                    </div>
                  )}
                  {cutoffKnown && group.score !== null && (
                    <div
                      className={cn(
                        "rounded-2xl border p-4 text-sm",
                        passedCutoff
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                          : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
                      )}
                    >
                      <p className="font-black">Nota de corte: {cutoff!.score} pontos</p>
                      <p className="mt-1">
                        {passedCutoff
                          ? `Sua nota (${group.score}) ficou acima do corte.`
                          : `Sua nota (${group.score}) ficou ${(cutoff!.score! - group.score).toFixed(2)} pontos abaixo do corte.`}
                      </p>
                      {cutoff!.notes && <p className="mt-1 text-xs opacity-75">{cutoff!.notes}</p>}
                    </div>
                  )}
                  {cutoff && cutoff.score === null && (
                    <p className="text-xs text-muted-foreground">
                      Nota de corte deste concurso ainda não foi localizada em fonte confiável.
                    </p>
                  )}
                  {breakdown.length > 0 && (
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                        <Target className="h-4 w-4" />
                        Pontos fracos por disciplina
                      </p>
                      {weakSpots.length > 0 && (
                        <p className="mb-3 text-xs text-rose-700 dark:text-rose-400">
                          Abaixo de 50% de aproveitamento:{" "}
                          {weakSpots.map((w) => w.subject).join(", ")}.
                        </p>
                      )}
                      <div className="space-y-2">
                        {breakdown.map((item) => (
                          <div key={item.subject} className="flex items-center gap-3 text-xs">
                            <span
                              className="w-40 shrink-0 truncate font-semibold"
                              title={item.subject}
                            >
                              {item.subject}
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  item.accuracy < 50
                                    ? "bg-rose-500"
                                    : item.accuracy < 75
                                      ? "bg-amber-500"
                                      : "bg-emerald-500",
                                )}
                                style={{ width: `${item.accuracy}%` }}
                              />
                            </div>
                            <span className="w-24 shrink-0 text-right text-muted-foreground">
                              {item.correct}/{item.total} ({item.accuracy}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                      <ImageIcon className="h-4 w-4" />
                      Caderno digitalizado
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                      {group.docs.map((doc, index) => (
                        <a
                          key={doc.id}
                          href={signedUrls[doc.id] || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted shadow-sm transition hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400"
                        >
                          {signedUrls[doc.id] ? (
                            <img
                              src={signedUrls[doc.id]}
                              alt={`Página ${index + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                              carregando…
                            </span>
                          )}
                          <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-5 text-[10px] font-bold text-white">
                            Pág. {index + 1}
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </section>
    </div>
  );
}
function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <FileStack className="h-16 w-16 text-muted-foreground/30" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="max-w-md text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
