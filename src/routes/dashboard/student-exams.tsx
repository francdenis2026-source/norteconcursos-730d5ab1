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
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  PenLine,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  FileStack,
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
  errorComponent: StudentExamsErrorFallback,
});

interface ExamDoc {
  id: string;
  contest_name: string;
  contest_year: string;
  exam_board: string | null;
  file_name: string;
  storage_path: string;
  doc_type: string | null;
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

interface EssayTopico {
  descricao: string;
  valor_pontos: number | null;
  abordado: boolean | null;
  obs?: string;
}
interface EssayCorrecao {
  nota_estimada: number | null;
  pontos_fortes: string[];
  pontos_fracos: string[];
  comentario: string;
  confianca: string;
}
interface EssaySubmission {
  id: string;
  contest_name: string;
  contest_year: string | null;
  tema: string;
  topicos: EssayTopico[];
  nota_maxima: number | null;
  status: string;
  transcricao: string | null;
  correcao: EssayCorrecao;
  storage_paths: string[] | null;
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
  pages: ExamDoc[];
  resultDoc: ExamDoc | null;
  essays: EssaySubmission[];
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

const ESSAY_STATUS_LABEL: Record<string, { label: string; color: string }> = {
  texto_completo: { label: "Texto completo", color: "bg-emerald-500" },
  rascunho_incompleto: { label: "Rascunho incompleto", color: "bg-amber-500" },
  corrigida: { label: "Corrigida", color: "bg-secondary" },
};

const metric = (value: number | null | undefined) => value ?? 0;

const normalizeText = (value: string) => value.toLocaleLowerCase("pt-BR");

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

// Only the candidate's own scanned booklet pages belong in the gallery.
// Reference documents the admin may have stored for the same contest/year
// (doc_type 'prova', 'gabarito', 'edital', 'matriz', 'padrao_resposta',
// 'outro' — kept for transcription reference) are official material, not
// the candidate's booklet, and must never be shown here. Manually-entered
// results (no scanned image at all) are excluded the same way.
const isCandidatePage = (doc: ExamDoc) =>
  !doc.storage_path.startsWith("manual-entry/") &&
  (doc.doc_type === "prova_realizada" || doc.doc_type === "upload_candidato" || !doc.doc_type);

// CEBRASPE-style net score: correct minus wrong, with anuladas always
// counted as correct (matches how correct_count/score_net were computed for
// PF, PRF and DEPEN throughout this project). Contests with per-discipline
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

function computeScore(contestName: string, correctItems: number[], wrongItems: number[]): number {
  const weighted = WEIGHTED_SCORING[contestName];
  if (!weighted) return correctItems.length - wrongItems.length;
  const pointsFor = (item: number) =>
    weighted.ranges.find((r) => item >= r.from && item <= r.to)?.points ?? 1;
  return correctItems.reduce((sum, item) => sum + pointsFor(item), 0);
}

// Every exam group is tagged with the exact career/contest it belongs to
// (contest_name). Aggregate metrics (evolution chart, best score, etc.) are
// always computed within a single selected contest — different careers
// (PF, PRF, ...) are never averaged together, per project rule (each career
// keeps its own panel).
function StudentExamsPage() {
  const { career } = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const [groups, setGroups] = React.useState<GroupedExam[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [signedUrls, setSignedUrls] = React.useState<Record<string, string>>({});
  const [essayImageUrls, setEssayImageUrls] = React.useState<Record<string, string>>({});
  const [reloadKey, setReloadKey] = React.useState(0);
  const [contestFilter, setContestFilter] = React.useState<string | null>(null);
  const [subjectMaps, setSubjectMaps] = React.useState<Record<string, Record<string, string>>>({});
  const [cutoffs, setCutoffs] = React.useState<
    Record<string, { score: number | null; notes: string | null }>
  >({});
  const [viewer, setViewer] = React.useState<{ groupKey: string; index: number } | null>(null);

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
        const [docsResult, essaysResult] = await Promise.all([
          withTimeout(
            supabase
              .from("student_exam_documents")
              .select("*")
              .eq("user_id", user.id)
              .order("contest_year", { ascending: true }),
          ),
          withTimeout(
            supabase
              .from("essay_submissions")
              .select(
                "id,contest_name,contest_year,tema,topicos,nota_maxima,status,transcricao,correcao,storage_paths",
              )
              .eq("user_id", user.id)
              .order("contest_year", { ascending: true }),
          ).catch(() => ({ data: [] as EssaySubmission[], error: null })),
        ]);
        if (docsResult.error) throw docsResult.error;

        const map = new Map<string, GroupedExam>();
        for (const doc of (docsResult.data || []) as ExamDoc[]) {
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
              pages: [],
              resultDoc: null,
              essays: [],
              audit_items: [],
            });
          const group = map.get(key)!;
          group.docs.push(doc);
          if (isCandidatePage(doc)) {
            group.pages.push(doc);
            group.pageCount += 1;
          }
          if (doc.correct_count !== null) group.correct_count = doc.correct_count;
          if (doc.wrong_count !== null) group.wrong_count = doc.wrong_count;
          if (doc.blank_count !== null) group.blank_count = doc.blank_count;
          if (doc.score_net !== null) group.score = Number(doc.score_net);
          else if (doc.score_raw !== null) group.score = Number(doc.score_raw);
          if (doc.extracted_data && Object.keys(doc.extracted_data).length) {
            group.extracted_data = doc.extracted_data;
            if (doc.extracted_data.candidate_answers) group.resultDoc = doc;
          }
          if (!group.resultDoc && doc.correct_count !== null) group.resultDoc = doc;
        }

        // Redações não têm necessariamente uma linha em student_exam_documents
        // (o candidato pode ter registrado só a discursiva), então cada uma
        // entra no grupo do concurso/ano correspondente. O nome do concurso
        // salvo na redação às vezes é uma variação mais curta do mesmo cargo
        // (ex.: "Polícia Federal" vs. "Agente de Polícia Federal" nas provas)
        // — por isso o casamento é por ano + nome contido um no outro, não
        // por igualdade exata, senão a mesma prova vira dois cards diferentes.
        for (const essay of ((essaysResult as { data: EssaySubmission[] | null }).data ||
          []) as EssaySubmission[]) {
          const contestName = String(essay.contest_name || "Concurso");
          const contestYear = String(essay.contest_year || "—");
          const existingMatch = Array.from(map.values()).find((group) => {
            if (group.contest_year !== contestYear) return false;
            const a = normalizeText(group.contest_name);
            const b = normalizeText(contestName);
            return a === b || a.includes(b) || b.includes(a);
          });
          const key = existingMatch ? existingMatch.key : `${contestName}__${contestYear}`;
          if (!map.has(key))
            map.set(key, {
              key,
              contest_name: contestName,
              contest_year: contestYear,
              exam_board: null,
              correct_count: null,
              wrong_count: null,
              blank_count: null,
              score: null,
              pageCount: 0,
              extracted_data: null,
              docs: [],
              pages: [],
              resultDoc: null,
              essays: [],
              audit_items: [],
            });
          map.get(key)!.essays.push(essay);
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
              const contestName = normalizeText(group.contest_name);
              const careerName = normalizeText(career);
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
  // rolled up into a "pontos fracos por disciplina" breakdown without
  // duplicating the subject text inside student_exam_documents itself.
  React.useEffect(() => {
    const careersPresent = Array.from(new Set(groups.map((g) => g.contest_name)));
    const missing = careersPresent.filter((c) => !subjectMaps[c]);
    if (!missing.length) return;
    (async () => {
      const results = await Promise.all(
        missing.map((careerName) =>
          supabase
            .from("official_exam_questions")
            .select("item_number,subject")
            .eq("career_name", careerName),
        ),
      );
      setSubjectMaps((previous) => {
        const next = { ...previous };
        missing.forEach((careerName, index) => {
          const rows =
            (results[index]?.data as { item_number: number; subject: string }[] | null) || [];
          next[careerName] = Object.fromEntries(
            rows.map((r) => [String(r.item_number), r.subject]),
          );
        });
        return next;
      });
    })();
  }, [groups, subjectMaps]);

  // Fetches nota de corte reference data for every contest/year already
  // shown in groups, keyed the same way as group.key, so each card can show
  // "você passou" or "faltaram X pontos" alongside the candidate's own score.
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
    const missingPages = group.pages.filter((doc) => !signedUrls[doc.id]);
    const essayPaths = group.essays.flatMap((essay) => essay.storage_paths || []);
    const missingEssayPaths = essayPaths.filter((path) => !essayImageUrls[path]);

    if (missingEssayPaths.length) {
      void Promise.all(
        missingEssayPaths.map((path) =>
          supabase.storage.from("student-exams").createSignedUrl(path, 3600),
        ),
      ).then((results) => {
        setEssayImageUrls((current) => {
          const next = { ...current };
          missingEssayPaths.forEach((path, index) => {
            const url = results[index]?.data?.signedUrl;
            if (url) next[path] = url;
          });
          return next;
        });
      });
    }

    if (!missingPages.length) return;
    const results = await Promise.all(
      missingPages.map((doc) =>
        supabase.storage.from("student-exams").createSignedUrl(doc.storage_path, 3600),
      ),
    );
    setSignedUrls((previous) => {
      const next = { ...previous };
      missingPages.forEach((doc, index) => {
        const url = results[index]?.data?.signedUrl;
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
      <div className="space-y-7">
        {user.id && <ExamUploader userId={user.id} onUploaded={() => setReloadKey((v) => v + 1)} />}
        <EmptyState
          title="Nenhuma prova encontrada"
          description="Quando uma prova for cadastrada, o diagnóstico completo aparecerá aqui."
        />
      </div>
    );

  const careers = Array.from(new Set(groups.map((g) => g.contest_name).filter(Boolean)));
  const activeCareer =
    contestFilter && careers.includes(contestFilter) ? contestFilter : careers[0];
  const filteredCareerGroups = groups.filter((g) => g.contest_name === activeCareer);
  const careerGroups = (filteredCareerGroups.length ? filteredCareerGroups : groups).sort((a, b) =>
    a.contest_year.localeCompare(b.contest_year, "pt-BR", { numeric: true }),
  );
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

  const activeViewerGroup = viewer ? careerGroups.find((g) => g.key === viewer.groupKey) : null;
  const activeViewerPage =
    viewer && activeViewerGroup ? activeViewerGroup.pages[viewer.index] : null;

  return (
    <div className="space-y-7">
      <ExamsHero
        examCount={careerGroups.length}
        accuracy={globalAccuracy}
        bestScore={bestExam.score ?? 0}
      />

      {user.id && <ExamUploader userId={user.id} onUploaded={() => setReloadKey((v) => v + 1)} />}

      {careers.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {careers.map((careerName) => (
            <button
              key={careerName}
              type="button"
              onClick={() => setContestFilter(careerName)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold transition-colors",
                careerName === activeCareer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                  : "border-slate-200 text-muted-foreground hover:border-emerald-300",
              )}
            >
              {careerName}
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
              ? `${careerGroups[0]?.contest_year} → ${careerGroups.at(-1)?.contest_year}`
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
            Abra uma prova para ver o boletim, os pontos fracos por disciplina, a redação e as
            páginas digitalizadas.
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
              if (!subject || verdict === "anulada" || verdict === "branco") continue;
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
          const cutoffKnown = !!cutoff && cutoff.score !== null;
          const passedCutoff = cutoffKnown && group.score !== null && group.score >= cutoff!.score!;
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
                          {group.essays.length > 0 && (
                            <Badge
                              variant="outline"
                              className="gap-1 border-indigo-300 text-indigo-700 dark:text-indigo-300"
                            >
                              <PenLine className="h-3 w-3" /> Redação
                            </Badge>
                          )}
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
                        <div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span>
                            Abaixo de 50% de aproveitamento:{" "}
                            {weakSpots.map((w) => w.subject).join(", ")}.
                          </span>
                        </div>
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
                  {group.resultDoc && (
                    <GabaritoEditor
                      resultId={group.resultDoc.id}
                      contestName={group.contest_name}
                      contestYear={group.contest_year}
                      candidateAnswers={group.resultDoc.extracted_data?.candidate_answers}
                      onSaved={() => setReloadKey((v) => v + 1)}
                    />
                  )}
                  {group.essays.length > 0 && (
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                        <PenLine className="h-4 w-4" /> Redação (prova discursiva)
                      </p>
                      <div className="space-y-3">
                        {group.essays.map((essay) => (
                          <EssayInline key={essay.id} essay={essay} imageUrls={essayImageUrls} />
                        ))}
                      </div>
                    </div>
                  )}
                  {group.pages.length > 0 ? (
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                        <ImageIcon className="h-4 w-4" />
                        Caderno digitalizado
                      </p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {group.pages.map((doc, index) => (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => setViewer({ groupKey: group.key, index })}
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
                            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-5 text-[10px] font-bold text-white">
                              Pág. {index + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : group.essays.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      O resultado está salvo; não há imagens vinculadas para esta prova.
                    </p>
                  ) : null}
                </CardContent>
              )}
            </Card>
          );
        })}
      </section>

      {activeViewerGroup && activeViewerPage && viewer && (
        <PageSlideshow
          contestLabel={`${activeViewerGroup.contest_name} — ${activeViewerGroup.contest_year}`}
          imageUrl={signedUrls[activeViewerPage.id]}
          current={viewer.index + 1}
          total={activeViewerGroup.pages.length}
          onPrev={() =>
            setViewer({
              groupKey: activeViewerGroup.key,
              index:
                (viewer.index - 1 + activeViewerGroup.pages.length) %
                activeViewerGroup.pages.length,
            })
          }
          onNext={() =>
            setViewer({
              groupKey: activeViewerGroup.key,
              index: (viewer.index + 1) % activeViewerGroup.pages.length,
            })
          }
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  );
}

function ExamsHero({
  examCount,
  accuracy,
  bestScore,
}: {
  examCount: number;
  accuracy: number;
  bestScore: number;
}) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071a2f] px-6 py-8 text-white shadow-2xl md:px-10 md:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="border-emerald-300/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Inteligência de desempenho
            </Badge>
            <Badge variant="outline" className="border-white/15 bg-white/5 text-slate-300">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-300" /> Dados sincronizados
            </Badge>
          </div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight md:text-4xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <GraduationCap className="h-6 w-6 text-emerald-300" />
            </span>
            Central de Provas
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Seu histórico real, o gabarito conferido item a item e os pontos fracos por disciplina —
            tudo organizado por concurso, para orientar a próxima etapa da preparação.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <HeroStat label="Provas" value={String(examCount)} />
          <HeroStat label="Aproveitamento" value={`${accuracy}%`} />
          <HeroStat label="Melhor saldo" value={`${bestScore} pts`} />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[92px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur">
      <p className="text-xl font-black text-white">{value}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
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

        const { data: fnResult, error: fnError } = await supabase.functions.invoke(
          "analyze-exam-upload",
          { body: { documentId: inserted.id } },
        );
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
            idx === i
              ? {
                  ...s,
                  state: "erro",
                  detail: error instanceof Error ? error.message : String(error),
                }
              : s,
          ),
        );
      }
    }
    setBusy(false);
    onUploaded();
  };

  return (
    <Card className="border-2 border-dashed border-emerald-300/60 bg-emerald-50/40 dark:bg-emerald-950/10">
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
        <CardContent className="space-y-1.5 border-t pt-3">
          {statuses.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {s.state === "ok" && (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              )}
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

  const itemNumbers = official
    ? Object.keys(official)
        .map(Number)
        .sort((a, b) => a - b)
    : [];

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
        <p className="text-sm font-bold">
          Corrigindo o gabarito — {contestName} {contestYear}
        </p>
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
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [String(n)]: e.target.value }))}
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

function Insight({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="space-y-1 border-l-2 border-emerald-300/60 pl-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-black text-foreground">{value}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

// Full-screen page-by-page viewer for a digitized exam booklet — lets the
// candidate flip through their scanned answer sheet like slides instead of
// opening each photo in a new tab. Left/Right arrow keys and Esc work too.
function PageSlideshow({
  contestLabel,
  imageUrl,
  current,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  contestLabel: string;
  imageUrl: string | undefined;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-sm font-bold">{contestLabel}</p>
          <p className="text-xs text-white/70">
            Página {current} de {total}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onClose}
        >
          <XCircle className="h-6 w-6" />
        </Button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <button
          type="button"
          onClick={onPrev}
          disabled={total <= 1}
          className="absolute left-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-30"
          aria-label="Página anterior"
        >
          <ChevronDown className="h-6 w-6 rotate-90" />
        </button>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Página ${current}`}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        ) : (
          <p className="text-sm text-white/70">carregando…</p>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={total <= 1}
          className="absolute right-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-30"
          aria-label="Próxima página"
        >
          <ChevronDown className="h-6 w-6 -rotate-90" />
        </button>
      </div>
    </div>
  );
}

// Renders one essay inline inside a contest's own card — same content as the
// standalone "Treino de Redação" page, but scoped to the exam it belongs to
// instead of a separate, disconnected screen.
function EssayInline({
  essay,
  imageUrls,
}: {
  essay: EssaySubmission;
  imageUrls: Record<string, string>;
}) {
  const st = ESSAY_STATUS_LABEL[essay.status] || { label: essay.status, color: "bg-muted" };
  const abordados = essay.topicos?.filter((t) => t.abordado === true).length || 0;
  const totalTopicos = essay.topicos?.length || 0;
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold">"{essay.tema}"</p>
          {essay.nota_maxima ? (
            <p className="text-xs text-muted-foreground">Nota máxima: {essay.nota_maxima} pts</p>
          ) : null}
        </div>
        <Badge className={cn("text-white", st.color)}>{st.label}</Badge>
      </div>
      {essay.storage_paths && essay.storage_paths.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">
            Folha da redação do candidato
          </p>
          <div className="flex flex-wrap gap-3">
            {essay.storage_paths.map((path) => (
              <a
                key={path}
                href={imageUrls[path] || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-40 w-32 overflow-hidden rounded-xl border bg-muted shadow-sm transition hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400"
              >
                {imageUrls[path] ? (
                  <img
                    src={imageUrls[path]}
                    alt="Folha da redação"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                    carregando…
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
      {totalTopicos > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">
            Tópicos exigidos ({abordados}/{totalTopicos} abordados)
          </p>
          <div className="space-y-2">
            {essay.topicos.map((t, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-muted/50 p-2 text-sm">
                {t.abordado === true ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : t.abordado === false ? (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                ) : (
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <p>
                    {t.descricao}{" "}
                    {t.valor_pontos ? (
                      <span className="text-xs text-muted-foreground">({t.valor_pontos} pts)</span>
                    ) : null}
                  </p>
                  {t.obs && <p className="mt-0.5 text-xs text-muted-foreground">{t.obs}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {essay.correcao &&
        (essay.correcao.pontos_fortes?.length > 0 || essay.correcao.pontos_fracos?.length > 0) && (
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {essay.correcao.pontos_fortes?.length > 0 && (
              <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/20">
                <p className="mb-1.5 text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                  Pontos fortes
                </p>
                <ul className="list-inside list-disc space-y-1 text-xs text-emerald-900 dark:text-emerald-300">
                  {essay.correcao.pontos_fortes.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {essay.correcao.pontos_fracos?.length > 0 && (
              <div className="rounded-lg bg-rose-50 p-3 dark:bg-rose-950/20">
                <p className="mb-1.5 text-xs font-bold uppercase text-rose-700 dark:text-rose-400">
                  Pontos fracos
                </p>
                <ul className="list-inside list-disc space-y-1 text-xs text-rose-900 dark:text-rose-300">
                  {essay.correcao.pontos_fracos.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      {essay.correcao?.comentario && (
        <p className="mt-3 border-l-2 pl-3 text-xs italic text-muted-foreground">
          {essay.correcao.comentario}
        </p>
      )}
      {essay.transcricao && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-xs font-bold uppercase text-muted-foreground">
            Ver transcrição
          </summary>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">
            {essay.transcricao}
          </p>
        </details>
      )}
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
      <CircleSlash2 className="h-16 w-16 text-muted-foreground/30" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="max-w-md text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}

// Última barreira de proteção da rota: se algo além do que o próprio painel
// já trata (que tem seu próprio estado de erro/retry) lançar uma exceção
// durante a renderização, isso evita uma tela em branco.
function StudentExamsErrorFallback({ reset }: { error: Error; reset: () => void }) {
  return (
    <EmptyState
      title="Não foi possível carregar suas provas"
      description="Algo deu errado ao montar esta tela. Tente novamente — se persistir, atualize a página."
    >
      <div className="flex gap-2">
        <Button onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Recarregar página
        </Button>
      </div>
    </EmptyState>
  );
}
