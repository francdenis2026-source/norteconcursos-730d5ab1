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
  component: StudentExamsSafePage,
  errorComponent: StudentExamsRecovery,
});

function StudentExamsSafePage() {
  return (
    <StudentExamsRecovery
      error={new Error("Visualização segura ativa")}
      reset={() => window.location.reload()}
    />
  );
}

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
  candidate_answers?: Record<string, string>;
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

const withTimeout = async <T,>(promise: PromiseLike<T>, timeoutMs = 12000): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Tempo de sincronização excedido")), timeoutMs);
  });

  try {
    return await Promise.race([Promise.resolve(promise), timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

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
      try {
        // A lista de provas é a informação essencial da página. Consultas
        // complementares não podem impedir que esse histórico seja exibido.
        const { data, error } = await withTimeout(
          supabase
            .from("student_exam_documents")
            .select("*")
            .eq("user_id", user.id)
            .order("contest_year", { ascending: true }),
        );
        if (error) throw error;

        const map = new Map<string, GroupedExam>();
        for (const doc of (data || []) as ExamDoc[]) {
          // Alguns registros históricos foram importados antes das restrições
          // atuais do schema. Ignorá-los é mais seguro do que derrubar todo o
          // painel por causa de um nome/ano ausente.
          if (!doc?.contest_name || !doc?.contest_year) continue;
          const contestName = String(doc.contest_name);
          const contestYear = String(doc.contest_year);
          const key = `${contestName}__${contestYear}`;
          if (!map.has(key))
            map.set(key, {
              key,
              contest_name: contestName,
              contest_year: contestYear,
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

        // Enriquece os grupos depois que a tela principal já foi liberada.
        void supabase
          .from("student_exam_item_audits")
          .select(
            "contest_year,item_number,candidate_answer,official_answer,comparison_status,reading_confidence,evidence_note",
          )
          .eq("user_id", user.id)
          .order("item_number", { ascending: true })
          .then(({ data: auditData }) => {
            if (!auditData) return;
            setGroups((current) =>
              current.map((group) => ({
                ...group,
                audit_items: (auditData as AuditItem[]).filter(
                  (item) => String(item.contest_year) === String(group.contest_year),
                ),
              })),
            );
          });
      } catch (error) {
        console.error("Falha ao carregar histórico de provas", error);
        setErrorMessage(
          "Não foi possível sincronizar suas provas agora. Verifique sua conexão e tente novamente.",
        );
      } finally {
        setIsLoading(false);
      }
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

  const careers = Array.from(new Set(groups.map((g) => g.contest_name).filter(Boolean)));
  const activeCareer =
    contestFilter && careers.includes(contestFilter) ? contestFilter : careers[0];
  const filteredCareerGroups = groups.filter((g) => g.contest_name === activeCareer);
  const careerGroups = filteredCareerGroups.length ? filteredCareerGroups : groups;
  const safeActiveCareer = activeCareer || careerGroups[0]?.contest_name || "Concurso";
  const careerLabel =
    safeActiveCareer.length > 24
      ? safeActiveCareer
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0])
          .join("")
      : safeActiveCareer;

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
  )[0] ?? {
    contest_year: "—",
    score: 0,
  };
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
// Lets the candidate upload a photo/PDF of an exam they took. Each file
// becomes its own student_exam_documents row (doc_type "upload_candidato",
// analysis_status "pendente") and triggers the analyze-exam-upload edge
// function, which asks the AI Gateway to identify the contest/year/board —
// never a score. The candidate sees the classification result (or an error)
// per file so they know whether it landed correctly.
function ExamUploader({ userId, onUploaded }: { userId: string; onUploaded: () => void }) {
  const [busy, setBusy] = React.useState(false);
  const [statuses, setStatuses] = React.useState<
    { name: string; state: "enviando" | "classificando" | "ok" | "erro"; detail?: string }[]
  >([]);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    setBusy(true);
    const files = Array.from(fileList);
    setStatuses(files.map((f) => ({ name: f.name, state: "enviando" })));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      try {
        const path = `${userId}/uploads-candidato/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error: uploadError } = await supabase.storage
          .from("student-exams")
          .upload(path, file, file.type ? { contentType: file.type } : {});
        if (uploadError) throw uploadError;

        const { data: inserted, error: insertError } = await supabase
          .from("student_exam_documents")
          .insert({
            user_id: userId,
            contest_name: null,
            contest_year: null,
            doc_type: "upload_candidato",
            uploaded_via: "candidate_upload",
            analysis_status: "pendente",
            file_name: file.name,
            storage_path: path,
          })
          .select("id")
          .single();
        if (insertError || !inserted) throw insertError ?? new Error("Falha ao registrar o envio");

        setStatuses((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, state: "classificando" } : s)),
        );

        const { data: fnResult, error: fnError } = await supabase.functions.invoke("analyze-exam-upload", {
          body: { documentId: inserted.id },
        });
        if (fnError) throw fnError;
        const extracted = fnResult?.extracted;
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  state: "ok",
                  detail: extracted?.contest_name
                    ? `${extracted.contest_name}${extracted.contest_year ? " — " + extracted.contest_year : ""}`
                    : "Enviado; não foi possível identificar o concurso automaticamente.",
                }
              : s,
          ),
        );
      } catch (error) {
        console.error("Falha no upload/análise da prova", error);
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, state: "erro", detail: error instanceof Error ? error.message : String(error) } : s,
          ),
        );
      }
    }
    setBusy(false);
    onUploaded();
  };

  return (
    <Card className="border-dashed border-2 border-emerald-300/60 bg-emerald-50/40 dark:bg-emerald-950/10">
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold">
            <ImageIcon className="h-4 w-4 text-emerald-600" /> Enviar uma prova que você fez
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Envie fotos ou o PDF do caderno/gabarito. Uma IA identifica o concurso, o ano e a banca
            automaticamente — a nota continua sendo conferida item a item depois, nunca inventada.
          </p>
        </div>
        <div>
          <label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              disabled={busy}
              onChange={(e) => void handleFiles(e.target.files)}
            />
            <Button asChild disabled={busy} className="pointer-events-none">
              <span>{busy ? "Enviando…" : "Selecionar arquivos"}</span>
            </Button>
          </label>
        </div>
      </CardContent>
      {statuses.length > 0 && (
        <CardContent className="border-t pt-3 space-y-1.5">
          {statuses.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {s.state === "ok" && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
              {s.state === "erro" && <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />}
              {(s.state === "enviando" || s.state === "classificando") && (
                <RefreshCw className="h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />
              )}
              <span className="font-semibold">{s.name}</span>
              <span className="text-muted-foreground">
                {s.state === "enviando" && "enviando…"}
                {s.state === "classificando" && "identificando concurso…"}
                {s.state === "ok" && s.detail}
                {s.state === "erro" && `erro: ${s.detail}`}
              </span>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

// CEBRASPE-style net score: correct minus wrong, with anuladas always
// counted as correct (this matches how correct_count/score_net were computed
// for PF, PRF and DEPEN throughout this project). Contests with per-discipline
// point weights (PC-AC, PP-Acre) use their own official formula instead —
// hardcoded here to match the weights read off each exam's official cover
// page during that contest's import.
const WEIGHTED_SCORING: Record<
  string,
  { ranges: { from: number; to: number; points: number }[]; maxScore: number }
> = {
  "Polícia Civil do Acre": {
    ranges: [
      { from: 1, to: 40, points: 1 },
      { from: 41, to: 60, points: 2 },
      { from: 61, to: 80, points: 1 },
    ],
    maxScore: 100,
  },
  "Polícia Penal do Acre": {
    ranges: [
      { from: 1, to: 30, points: 1 },
      { from: 31, to: 60, points: 2 },
    ],
    maxScore: 90,
  },
};

function computeScore(
  contestName: string,
  correctItems: number[],
  wrongItems: number[],
): number {
  const weighted = WEIGHTED_SCORING[contestName];
  if (!weighted) return correctItems.length - wrongItems.length;
  const pointsFor = (item: number) =>
    weighted.ranges.find((r) => item >= r.from && item <= r.to)?.points ?? 1;
  return correctItems.reduce((sum, item) => sum + pointsFor(item), 0);
}

// Lets the candidate fix their own marked answers when they realize an item
// was sent wrong. Requires an explicit confirmation before entering edit
// mode (so a stray click never touches a saved result), recomputes
// acertos/erros/taxa/nota live as each answer changes, and only persists to
// the database when the candidate explicitly saves.
function GabaritoEditor({
  resultId,
  contestName,
  contestYear,
  candidateAnswers,
  onSaved,
}: {
  resultId: string;
  contestName: string;
  contestYear: string;
  candidateAnswers: Record<string, string> | undefined;
  onSaved: () => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [loadingOfficial, setLoadingOfficial] = React.useState(false);
  const [official, setOfficial] = React.useState<Record<string, string> | null>(null);
  const [answers, setAnswers] = React.useState<Record<string, string>>(candidateAnswers || {});
  const [saving, setSaving] = React.useState(false);

  const startEditing = async () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja corrigir o gabarito que você marcou para ${contestName} — ${contestYear}? ` +
        "Isso vai recalcular seus acertos, erros e nota nessa prova.",
    );
    if (!confirmed) return;
    setEditing(true);
    setAnswers(candidateAnswers || {});
    if (!official) {
      setLoadingOfficial(true);
      const { data } = await supabase
        .from("official_exam_questions")
        .select("item_number, official_answer")
        .eq("career_name", contestName)
        .eq("exam_year", Number(contestYear));
      const map: Record<string, string> = {};
      (data || []).forEach((row: { item_number: number; official_answer: string }) => {
        map[String(row.item_number)] = row.official_answer;
      });
      setOfficial(map);
      setLoadingOfficial(false);
    }
  };

  const itemNumbers = official ? Object.keys(official).map(Number).sort((a, b) => a - b) : [];

  const live = React.useMemo(() => {
    if (!official) return null;
    const correctItems: number[] = [];
    const wrongItems: number[] = [];
    let blank = 0;
    for (const n of itemNumbers) {
      const off = official[String(n)];
      const mine = (answers[String(n)] || "").toUpperCase();
      if (!mine) {
        blank += 1;
      } else if (off === "X" || mine === off) {
        correctItems.push(n);
      } else {
        wrongItems.push(n);
      }
    }
    return {
      correct: correctItems.length,
      wrong: wrongItems.length,
      blank,
      score: computeScore(contestName, correctItems, wrongItems),
      correctItems,
      wrongItems,
    };
  }, [official, answers, itemNumbers, contestName]);

  const handleSave = async () => {
    if (!live) return;
    const confirmed = window.confirm(
      "Confirma salvar este gabarito corrigido? Vai substituir os acertos/erros/nota anteriores desta prova.",
    );
    if (!confirmed) return;
    setSaving(true);
    try {
      const itemsVerdict: Record<string, string> = {};
      for (const n of itemNumbers) {
        const off = official![String(n)];
        const mine = (answers[String(n)] || "").toUpperCase();
        itemsVerdict[String(n)] = !mine
          ? "branco"
          : off === "X"
            ? "anulada"
            : mine === off
              ? "correta"
              : "errada";
      }
      const { data: current } = await supabase
        .from("student_exam_documents")
        .select("extracted_data")
        .eq("id", resultId)
        .single();
      const nextExtracted = {
        ...(current?.extracted_data || {}),
        items: itemsVerdict,
        candidate_answers: answers,
      };
      const { error } = await supabase
        .from("student_exam_documents")
        .update({
          correct_count: live.correct,
          wrong_count: live.wrong,
          blank_count: live.blank,
          score_net: live.score,
          score_raw: live.score,
          extracted_data: nextExtracted,
          notes: "Gabarito corrigido manualmente pelo candidato na tela Minhas Provas.",
        })
        .eq("id", resultId);
      if (error) throw error;
      setEditing(false);
      onSaved();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Erro ao salvar o gabarito corrigido.");
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => void startEditing()}>
          Corrigir meu gabarito
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4 dark:border-amber-800 dark:bg-amber-950/20">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold">Corrigindo o gabarito — {contestName} {contestYear}</p>
        <Button variant="ghost" size="sm" onClick={() => setEditing(false)} disabled={saving}>
          Cancelar
        </Button>
      </div>
      {loadingOfficial ? (
        <p className="text-xs text-muted-foreground">Carregando gabarito oficial...</p>
      ) : !itemNumbers.length ? (
        <p className="text-xs text-muted-foreground">
          Gabarito oficial desta prova ainda não está cadastrado na plataforma — não é possível
          recalcular automaticamente.
        </p>
      ) : (
        <>
          {live && (
            <div className="mb-4 grid grid-cols-4 gap-2 text-center">
              <MiniMetric label="Acertos" value={live.correct} className="text-emerald-600" />
              <MiniMetric label="Erros" value={live.wrong} className="text-rose-600" />
              <MiniMetric label="Em branco" value={live.blank} className="text-muted-foreground" />
              <MiniMetric label="Nota" value={live.score} className="text-primary" />
            </div>
          )}
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {itemNumbers.map((n) => (
              <label key={n} className="flex flex-col items-center gap-1 text-[10px]">
                <span className="font-semibold text-muted-foreground">{n}</span>
                <select
                  className="w-full rounded border bg-background px-1 py-1 text-center text-xs"
                  value={answers[String(n)] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [String(n)]: e.target.value }))
                  }
                >
                  <option value=""> </option>
                  {["A", "B", "C", "D", "E"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Salvando..." : "Salvar gabarito corrigido"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// MetricCard/MiniMetric were referenced throughout this file (including in
// the always-rendered StudentExamsRecovery view) but never defined anywhere
// — a pre-existing bug that crashed this page with a ReferenceError as soon
// as there was real exam data to render (examGroups.length > 0), which
// never surfaced in earlier testing because that only happened without a
// logged-in session (an empty/error state that never reaches this code).
const TONE_STYLES: Record<string, string> = {
  navy: "bg-[#071a2f] text-white",
  emerald: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  amber: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  rose: "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
};

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "navy",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail?: string;
  tone?: keyof typeof TONE_STYLES;
}) {
  return (
    <Card className={cn("border-none shadow-sm", TONE_STYLES[tone])}>
      <CardContent className="flex items-start gap-3 p-4">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 opacity-80" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
          <p className="truncate text-xl font-black">{value}</p>
          {detail && <p className="mt-0.5 truncate text-[11px] opacity-70">{detail}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className={cn("text-base font-black", className)}>{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
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

interface RecoveryExam {
  id: string;
  contest_name: string | null;
  contest_year: string | number | null;
  exam_board: string | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score_net: number | null;
  score_raw: number | null;
  file_name: string;
  storage_path: string;
  doc_type: string | null;
  extracted_data: ExamAnalysis | null;
}

interface RecoveryGroup {
  key: string;
  contest: string;
  year: string;
  board: string;
  correct: number;
  wrong: number;
  blank: number;
  score: number;
  result: RecoveryExam | null;
  pages: RecoveryExam[];
}

/**
 * Última barreira de proteção da rota. O painel principal contém gráficos e
 * análises enriquecidas; se algum dado legado inesperado provocar uma exceção,
 * esta visão independente ainda entrega ao candidato seu histórico real.
 */
function StudentExamsRecovery({ reset }: { error: Error; reset: () => void }) {
  const [exams, setExams] = React.useState<RecoveryExam[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState<string | null>(null);
  const [openExam, setOpenExam] = React.useState<string | null>(null);
  const [pageUrls, setPageUrls] = React.useState<Record<string, string>>({});
  const [userId, setUserId] = React.useState<string | null>(null);
  const [uploadTick, setUploadTick] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data: sessionData } = await withTimeout(supabase.auth.getSession());
        const session = sessionData.session;
        if (!session) {
          if (active) setMessage("Entre novamente para acessar suas provas.");
          return;
        }
        if (active) setUserId(session.user.id);
        const { data, error } = await withTimeout(
          supabase
            .from("student_exam_documents")
            .select(
              "id,contest_name,contest_year,exam_board,correct_count,wrong_count,blank_count,score_net,score_raw,file_name,storage_path,doc_type,extracted_data",
            )
            .eq("user_id", session.user.id)
            .order("contest_year", { ascending: false }),
        );
        if (error) throw error;
        if (active) setExams((data || []) as RecoveryExam[]);
      } catch (error) {
        console.error("Falha na visualização de recuperação das provas", error);
        if (active)
          setMessage("Não foi possível sincronizar suas provas agora. Verifique sua conexão e tente novamente.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [uploadTick]);

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Carregando suas provas…</div>;
  }

  const grouped = new Map<string, RecoveryGroup>();
  for (const exam of exams) {
    const contest = String(exam.contest_name || "Concurso");
    const year = String(exam.contest_year || "—");
    const key = `${contest}__${year}`;
    const current = grouped.get(key) || {
      key,
      contest,
      year,
      board: String(exam.exam_board || "Banca não informada"),
      correct: 0,
      wrong: 0,
      blank: 0,
      score: 0,
      result: null,
      pages: [],
    };
    if (exam.storage_path?.startsWith("manual-entry/")) {
      current.result = exam;
      current.correct = Number(exam.correct_count ?? 0);
      current.wrong = Number(exam.wrong_count ?? 0);
      current.blank = Number(exam.blank_count ?? 0);
      current.score = Number(exam.score_net ?? exam.score_raw ?? 0);
    } else if (exam.doc_type === "prova_realizada" || exam.doc_type === "upload_candidato") {
      // Only the candidate's own scanned booklet pages belong in the
      // gallery below. Reference documents the admin may have stored for
      // the same contest/year (doc_type 'prova', 'gabarito', 'edital',
      // 'matriz', 'padrao_resposta', 'outro' — e.g. an official exam PDF
      // kept for transcription reference) are official material, not the
      // candidate's booklet, and must never be shown here.
      current.pages.push(exam);
    }
    grouped.set(key, current);
  }
  const examGroups = Array.from(grouped.values()).sort((a, b) =>
    b.year.localeCompare(a.year, "pt-BR", { numeric: true }),
  );
  const totalPages = examGroups.reduce((sum, group) => sum + group.pages.length, 0);
  const averageAccuracy = examGroups.length
    ? Math.round(
        examGroups.reduce((sum, group) => {
          const answered = group.correct + group.wrong;
          return sum + (answered ? (group.correct / answered) * 100 : 0);
        }, 0) / examGroups.length,
      )
    : 0;

  const toggleExam = async (group: RecoveryGroup) => {
    if (openExam === group.key) {
      setOpenExam(null);
      return;
    }
    setOpenExam(group.key);
    const missing = group.pages.filter((page) => !pageUrls[page.id]);
    if (!missing.length) return;
    const results = await Promise.all(
      missing.map((page) =>
        supabase.storage.from("student-exams").createSignedUrl(page.storage_path, 3600),
      ),
    );
    setPageUrls((current) => {
      const next = { ...current };
      missing.forEach((page, index) => {
        const url = results[index].data?.signedUrl;
        if (url) next[page.id] = url;
      });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-[#071a2f] px-6 py-7 text-white shadow-xl md:px-9">
        <Badge className="mb-3 border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
          Dados sincronizados
        </Badge>
        <h1 className="text-3xl font-black">Minhas provas</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Resultados, indicadores de desempenho e cadernos digitalizados reunidos por concurso.
        </p>
      </section>

      {userId && <ExamUploader userId={userId} onUploaded={() => setUploadTick((v) => v + 1)} />}

      {message ? (
        <Card>
          <CardContent className="space-y-4 pt-6 text-center">
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button onClick={reset}>Tentar novamente</Button>
          </CardContent>
        </Card>
      ) : examGroups.length ? (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={FileStack}
              label="Provas analisadas"
              value={String(examGroups.length)}
              detail={`${totalPages} páginas originais`}
              tone="navy"
            />
            <MetricCard
              icon={Target}
              label="Aproveitamento médio"
              value={`${averageAccuracy}%`}
              detail="Somente itens respondidos"
              tone="emerald"
            />
            <MetricCard
              icon={ShieldCheck}
              label="Arquivos recuperados"
              value={String(totalPages)}
              detail="Imagens acessíveis no Supabase"
              tone="amber"
            />
          </section>
          <div className="space-y-4">
            {examGroups.map((group) => {
              const answered = group.correct + group.wrong;
              const accuracy = answered ? Math.round((group.correct / answered) * 100) : 0;
              const isOpen = openExam === group.key;
              return (
                <Card
                  key={group.key}
                  className={cn(
                    "overflow-hidden border-slate-200 shadow-sm",
                    isOpen && "border-emerald-300 shadow-md",
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => void toggleExam(group)}
                  >
                    <CardHeader className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        <div>
                          <CardTitle className="flex flex-wrap items-center gap-2 text-base md:text-lg">
                            {group.contest} — {group.year}
                            {group.result && <Badge className="bg-emerald-600">Analisada</Badge>}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {group.board} · {group.pages.length} páginas digitalizadas
                          </CardDescription>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 text-center">
                          <MiniMetric
                            label="Acertos"
                            value={group.correct}
                            className="text-emerald-600"
                          />
                          <MiniMetric label="Erros" value={group.wrong} className="text-rose-600" />
                          <MiniMetric label="Saldo" value={group.score} className="text-primary" />
                          <div className="flex items-center gap-2">
                            <MiniMetric
                              label="Taxa"
                              value={`${accuracy}%`}
                              className="text-amber-600"
                            />
                            <ChevronDown
                              className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </button>
                  {isOpen && (
                    <CardContent className="space-y-4 border-t bg-slate-50/50 pt-5 dark:bg-slate-950/20">
                      <div className="grid gap-3 sm:grid-cols-4">
                        <div className="rounded-xl border bg-background p-3 text-sm">
                          <strong>{group.correct}</strong>
                          <br />
                          <span className="text-xs text-muted-foreground">questões corretas</span>
                        </div>
                        <div className="rounded-xl border bg-background p-3 text-sm">
                          <strong>{group.wrong}</strong>
                          <br />
                          <span className="text-xs text-muted-foreground">questões erradas</span>
                        </div>
                        <div className="rounded-xl border bg-background p-3 text-sm">
                          <strong>{group.blank}</strong>
                          <br />
                          <span className="text-xs text-muted-foreground">em branco</span>
                        </div>
                        <div className="rounded-xl border bg-background p-3 text-sm">
                          <strong>{group.score}</strong>
                          <br />
                          <span className="text-xs text-muted-foreground">
                            pontuação registrada
                          </span>
                        </div>
                      </div>
                      {group.result && (
                        <GabaritoEditor
                          resultId={group.result.id}
                          contestName={group.contest}
                          contestYear={group.year}
                          candidateAnswers={group.result.extracted_data?.candidate_answers}
                          onSaved={() => setUploadTick((v) => v + 1)}
                        />
                      )}
                      {group.pages.length > 0 ? (
                        <div>
                          <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                            <ImageIcon className="h-4 w-4" /> Caderno digitalizado
                          </p>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                            {group.pages.map((page, index) => (
                              <a
                                key={page.id}
                                href={pageUrls[page.id]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted shadow-sm transition hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400"
                              >
                                {pageUrls[page.id] ? (
                                  <img
                                    src={pageUrls[page.id]}
                                    alt={`Página ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                                    carregando…
                                  </span>
                                )}
                                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-5 text-[10px] font-bold text-white">
                                  Página {index + 1}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          O resultado está salvo; não há imagens vinculadas para esta prova.
                        </p>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <EmptyState
          title="Nenhuma prova encontrada"
          description="Não há resultados vinculados à conta atualmente conectada."
        />
      )}

      <Button variant="outline" onClick={reset}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Atualizar dados
      </Button>
    </div>
  );
}
