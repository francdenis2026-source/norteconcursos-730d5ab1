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

const metric = (value: number | null | undefined) => value ?? 0;

function StudentExamsPage() {
  const { career } = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const [groups, setGroups] = React.useState<GroupedExam[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [signedUrls, setSignedUrls] = React.useState<Record<string, string>>({});
  const [reloadKey, setReloadKey] = React.useState(0);

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
      for (const item of (auditData || []) as AuditItem[]) {
        for (const group of map.values())
          if (group.contest_year === item.contest_year) group.audit_items.push(item);
      }
      setGroups(
        Array.from(map.values()).map((group) => ({
          ...group,
          score:
            group.score ??
            (group.correct_count !== null && group.wrong_count !== null
              ? group.correct_count - group.wrong_count
              : null),
        })),
      );
      setIsLoading(false);
    };
    load();
  }, [user, authLoading, reloadKey]);

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

  const visibleGroups = career
    ? groups.filter((group) => group.contest_name.toLowerCase().includes(career.toLowerCase()))
    : groups;
  if (!visibleGroups.length)
    return (
      <EmptyState
        title={`Nenhuma prova de ${career}`}
        description="Ainda não há resultado vinculado a esta carreira na sua conta."
      />
    );

  const chartData = visibleGroups.map((group) => {
    const answered = metric(group.correct_count) + metric(group.wrong_count);
    return {
      year: group.contest_year,
      aproveitamento: answered ? Math.round((metric(group.correct_count) / answered) * 100) : 0,
      saldo: group.score ?? 0,
    };
  });
  const totalPages = visibleGroups.reduce((sum, group) => sum + group.pageCount, 0);
  const totalCorrect = visibleGroups.reduce((sum, group) => sum + metric(group.correct_count), 0);
  const totalWrong = visibleGroups.reduce((sum, group) => sum + metric(group.wrong_count), 0);
  const globalAccuracy =
    totalCorrect + totalWrong ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;
  const bestExam = [...visibleGroups].sort(
    (a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity),
  )[0];
  const evolution = (chartData.at(-1)?.aproveitamento ?? 0) - (chartData[0]?.aproveitamento ?? 0);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] bg-[#071a2f] px-6 py-7 text-white shadow-xl md:px-9 md:py-9">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-4 border-emerald-300/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Inteligência de desempenho
            </Badge>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              {career ? `Área ${career}` : "Central de Provas"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              {career
                ? `Resultados, análise por questão e materiais vinculados à carreira ${career}.`
                : "Seu histórico real de concursos transformado em indicadores para orientar a próxima etapa da preparação."}
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={FileStack}
          label="Provas analisadas"
          value={String(visibleGroups.length)}
          detail={`${totalPages} registro${totalPages === 1 ? "" : "s"} de resultado`}
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
          detail={`${bestExam.contest_name} ${bestExam.contest_year} · ${bestExam.exam_board || "banca"}`}
          tone="amber"
        />
        <MetricCard
          icon={TrendingUp}
          label="Evolução histórica"
          value={`${evolution >= 0 ? "+" : ""}${evolution} p.p.`}
          detail={`${visibleGroups[0].contest_year} → ${visibleGroups.at(-1)?.contest_year}`}
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
              Percentual de acertos considerando apenas itens respondidos.
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
                  labelFormatter={(label) => `PF ${label}`}
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
              value={`PF ${bestExam.contest_year}`}
              text={`${bestExam.score ?? 0} pontos líquidos e ${chartData.find((item) => item.year === bestExam.contest_year)?.aproveitamento ?? 0}% de aproveitamento.`}
            />
            <Insight
              label="Tendência"
              value={evolution >= 0 ? "Evolução positiva" : "Ponto de atenção"}
              text={`Variação de ${Math.abs(evolution)} ponto${Math.abs(evolution) === 1 ? "" : "s"} percentual entre a primeira e a última prova registrada.`}
            />
            <Insight
              label="Próximo foco"
              value="Revisar os itens errados"
              text="Use o detalhamento por questão para priorizar os assuntos com maior perda de pontos conforme a regra da banca."
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-primary">Histórico detalhado</h2>
          <p className="text-sm text-muted-foreground">
            Abra uma prova para consultar o boletim e todas as páginas digitalizadas.
          </p>
        </div>
        {visibleGroups.map((group) => {
          const answered = metric(group.correct_count) + metric(group.wrong_count);
          const accuracy = answered
            ? Math.round((metric(group.correct_count) / answered) * 100)
            : 0;
          const official = group.extracted_data?.resultado_oficial;
          const audit = group.extracted_data?.auditoria_gabarito_definitivo;
          const performance = group.extracted_data?.pontuacao_obtida;
          const itemResults = group.extracted_data?.items;
          const storedDocs = group.docs.filter(
            (doc) => !doc.storage_path.startsWith("manual-entry/"),
          );
          const auditCounts = countAudit(group.audit_items);
          const isOpen = openKey === group.key;
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
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {group.exam_board || "Banca não identificada"} · resultado individual
                          registrado
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
                  {performance && (
                    <section className="space-y-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm dark:border-violet-900 dark:from-violet-950/30 dark:to-card">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                          <p className="font-black text-primary">
                            Resultado oficial - Polícia Penal do Acre
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Prova IBFC 2023 corrigida conforme os pesos previstos no edital.
                          </p>
                        </div>
                        <Badge className="w-fit bg-emerald-600">
                          {group.extracted_data?.habilitado_prova_objetiva
                            ? "Habilitado"
                            : "Resultado registrado"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <ResultMetric
                          label="Objetiva"
                          value={`${performance.total ?? group.score ?? 0}/90`}
                        />
                        <ResultMetric
                          label="Conhecimentos gerais"
                          value={`${performance.gerais_total ?? 0}/30`}
                        />
                        <ResultMetric
                          label="Conhecimentos específicos"
                          value={`${performance.especificos?.pontos ?? 0}/60`}
                        />
                        <ResultMetric
                          label="Discursiva"
                          value={`${group.extracted_data?.confirmacao_diario_oficial?.nota_discursiva_deduzida ?? 0}/20`}
                        />
                      </div>
                      {itemResults && <ManualItemGrid items={itemResults} />}
                    </section>
                  )}
                  {audit && (
                    <section className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm dark:bg-card">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                          <p className="flex items-center gap-2 font-black text-primary">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                            Auditoria pelo gabarito definitivo
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Cada marcação legível foi comparada individualmente; dúvida de leitura
                            permanece indeterminada.
                          </p>
                        </div>
                        <Badge variant="outline">
                          {group.audit_items.length || 120} itens mapeados
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <AuditMetric
                          icon={CheckCircle2}
                          label="Confirmadas"
                          value={auditCounts.correct}
                          tone="text-emerald-600"
                        />
                        <AuditMetric
                          icon={XCircle}
                          label="Divergências"
                          value={auditCounts.wrong}
                          tone="text-rose-600"
                        />
                        <AuditMetric
                          icon={CircleSlash2}
                          label="Anuladas"
                          value={auditCounts.annulled}
                          tone="text-amber-600"
                        />
                        <AuditMetric
                          icon={HelpCircle}
                          label="A conferir"
                          value={auditCounts.indeterminate}
                          tone="text-slate-500"
                        />
                      </div>
                      {(audit.divergencia_corrigida || audit.observacao) && (
                        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{audit.divergencia_corrigida || audit.observacao}</span>
                        </div>
                      )}
                      <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                          Questão por questão
                        </p>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12">
                          {group.audit_items.map((item) => (
                            <AuditTile key={item.item_number} item={item} />
                          ))}
                        </div>
                        <p className="mt-3 text-[11px] text-muted-foreground">
                          C/E à esquerda: resposta lida na prova. C/E/X à direita: gabarito
                          definitivo. X no gabarito significa questão anulada.
                        </p>
                      </div>
                    </section>
                  )}
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                      <ImageIcon className="h-4 w-4" />
                      Materiais anexados
                    </p>
                    {storedDocs.length ? (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {storedDocs.map((doc, index) => (
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
                    ) : (
                      <div className="rounded-xl border border-dashed bg-white p-4 text-sm text-muted-foreground dark:bg-card">
                        <p className="font-bold text-foreground">
                          Resultado localizado, arquivos não localizados
                        </p>
                        <p className="mt-1 text-xs leading-relaxed">
                          A análise e as questões estão salvas, mas a prova realizada e os
                          documentos oficiais não foram enviados ao Storage deste projeto.
                        </p>
                      </div>
                    )}
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

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  tone: "navy" | "emerald" | "amber" | "rose";
}) {
  const tones = {
    navy: "bg-slate-100 text-slate-700 dark:bg-slate-800",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950",
  };
  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-primary">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <span className={cn("rounded-2xl p-3", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
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
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-lg font-black", className)}>{value}</p>
    </div>
  );
}
function Insight({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-card/70">
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
        {label}
      </p>
      <p className="mt-1 font-black text-primary">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
function countAudit(items: AuditItem[]) {
  return items.reduce(
    (counts, item) => {
      counts[item.comparison_status] += 1;
      return counts;
    },
    { correct: 0, wrong: 0, annulled: 0, blank: 0, indeterminate: 0 },
  );
}
function AuditMetric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-3 dark:bg-slate-900/40">
      <Icon className={cn("h-4 w-4", tone)} />
      <p className={cn("mt-2 text-xl font-black", tone)}>{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
function AuditTile({ item }: { item: AuditItem }) {
  const styles = {
    correct:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
    wrong:
      "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
    annulled:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
    blank: "border-slate-200 bg-slate-50 text-slate-500",
    indeterminate: "border-slate-200 bg-white text-slate-400 dark:bg-slate-900/40",
  };
  const labels = {
    correct: "Certa",
    wrong: "Divergente",
    annulled: "Anulada",
    blank: "Em branco",
    indeterminate: "Leitura incerta",
  };
  return (
    <div
      title={`Item ${item.item_number}: ${labels[item.comparison_status]}${item.evidence_note ? ` — ${item.evidence_note}` : ""}`}
      className={cn("rounded-lg border px-2 py-2 text-center", styles[item.comparison_status])}
    >
      <p className="text-[10px] font-black">{item.item_number}</p>
      <p className="mt-1 text-xs font-bold">
        {item.candidate_answer || "?"} / {item.official_answer}
      </p>
    </div>
  );
}
function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-violet-100 bg-white/80 p-3 dark:border-violet-900 dark:bg-card/70">
      <p className="text-[10px] font-black uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-black text-violet-700 dark:text-violet-300">{value}</p>
    </div>
  );
}
function ManualItemGrid({
  items,
}: {
  items: Record<string, "correta" | "errada" | "anulada" | "branco">;
}) {
  const styles = {
    correta: "border-emerald-200 bg-emerald-50 text-emerald-800",
    errada: "border-rose-200 bg-rose-50 text-rose-800",
    anulada: "border-amber-200 bg-amber-50 text-amber-800",
    branco: "border-slate-200 bg-slate-50 text-slate-500",
  };
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
        Resultado das 60 questões
      </p>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10 md:grid-cols-12">
        {Object.entries(items)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([number, status]) => (
            <div
              key={number}
              title={`Questão ${number}: ${status}`}
              className={cn("rounded-lg border px-2 py-2 text-center", styles[status])}
            >
              <p className="text-[10px] font-black">{number}</p>
              <p className="mt-1 text-[9px] font-bold uppercase">{status.slice(0, 3)}</p>
            </div>
          ))}
      </div>
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
