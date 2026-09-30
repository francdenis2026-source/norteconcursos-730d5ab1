import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FileStack,
  Flag,
  Landmark,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { CAREERS, careerByAgency, normalizeText } from "@/lib/careers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/performance")({
  component: PerformancePage,
});

interface ExamDoc {
  contest_name: string;
  contest_year: string;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score_net: number | null;
  score_raw: number | null;
  extracted_data: { items?: Record<string, "correta" | "errada" | "anulada" | "branco"> } | null;
}

interface ExamGroup {
  key: string;
  contest_name: string;
  contest_year: string;
  correct: number;
  wrong: number;
  blank: number;
  score: number | null;
  items: Record<string, "correta" | "errada" | "anulada" | "branco">;
}

interface SubjectStat {
  subject: string;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number;
}

const metric = (value: number | null | undefined) => value ?? 0;

// As carreiras já usam nomes ligeiramente diferentes entre `student_exam_documents`
// (contest_name digitado pelo candidato/importação) e `official_exam_questions`
// (career_name da matriz oficial) — ex.: "Polícia Rodoviária Federal" vs
// "Policial Rodoviário Federal" em anos diferentes do mesmo cargo. Comparar por
// igualdade exata faz o item silenciosamente sumir do raio-X; a normalização +
// contenção (um nome contém o outro) resolve isso sem precisar corrigir o dado
// legado em produção.
const namesMatch = (a: string, b: string) => {
  const na = normalizeText(a);
  const nb = normalizeText(b);
  return na === nb || na.includes(nb) || nb.includes(na);
};

// Só conta como "matéria a intensificar" quando já há volume mínimo de itens
// respondidos — com 1 questão, 0% ou 100% não diz nada sobre domínio real.
const MIN_ITEMS_FOR_SIGNAL = 3;
const WEAK_THRESHOLD = 60;

function buildSubjectStats(
  groups: ExamGroup[],
  subjectByCareer: Map<string, Record<string, string>>,
): SubjectStat[] {
  const bySubject = new Map<string, { correct: number; wrong: number }>();
  for (const group of groups) {
    const subjectMap = subjectByCareer.get(group.contest_name);
    if (!subjectMap) continue;
    for (const [itemNumber, verdict] of Object.entries(group.items)) {
      if (verdict === "anulada" || verdict === "branco") continue;
      const subject = subjectMap[itemNumber];
      if (!subject) continue;
      const entry = bySubject.get(subject) ?? { correct: 0, wrong: 0 };
      if (verdict === "correta") entry.correct += 1;
      else entry.wrong += 1;
      bySubject.set(subject, entry);
    }
  }
  const stats: SubjectStat[] = [];
  for (const [subject, { correct, wrong }] of bySubject) {
    const total = correct + wrong;
    stats.push({
      subject,
      correct,
      wrong,
      total,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    });
  }
  return stats.sort((a, b) => a.accuracy - b.accuracy);
}

function PerformancePage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [groups, setGroups] = React.useState<ExamGroup[]>([]);
  const [subjectByCareer, setSubjectByCareer] = React.useState<Map<string, Record<string, string>>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setIsLoading(false);
      return;
    }
    (async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const [{ data: docs, error: docsError }, { data: questions, error: questionsError }] =
          await Promise.all([
            supabase
              .from("student_exam_documents")
              .select(
                "contest_name,contest_year,correct_count,wrong_count,blank_count,score_net,score_raw,extracted_data",
              )
              .eq("user_id", user.id),
            supabase.from("official_exam_questions").select("career_name,item_number,subject"),
          ]);
        if (docsError) throw docsError;
        if (questionsError) throw questionsError;

        const map = new Map<string, ExamGroup>();
        for (const doc of (docs || []) as ExamDoc[]) {
          if (!doc.contest_name || !doc.contest_year) continue;
          const key = `${doc.contest_name}__${doc.contest_year}`;
          if (!map.has(key))
            map.set(key, {
              key,
              contest_name: doc.contest_name,
              contest_year: doc.contest_year,
              correct: 0,
              wrong: 0,
              blank: 0,
              score: null,
              items: {},
            });
          const group = map.get(key)!;
          if (doc.correct_count !== null) group.correct = doc.correct_count;
          if (doc.wrong_count !== null) group.wrong = doc.wrong_count;
          if (doc.blank_count !== null) group.blank = doc.blank_count;
          if (doc.score_net !== null) group.score = doc.score_net;
          else if (doc.score_raw !== null) group.score = doc.score_raw;
          if (doc.extracted_data?.items) Object.assign(group.items, doc.extracted_data.items);
        }
        setGroups(Array.from(map.values()));

        const careerNames = Array.from(
          new Set(Array.from(map.values()).map((g) => g.contest_name)),
        );
        const officialCareerNames = Array.from(
          new Set(
            ((questions || []) as { career_name: string }[])
              .map((q) => q.career_name)
              .filter(Boolean),
          ),
        );
        const nextSubjectByCareer = new Map<string, Record<string, string>>();
        for (const contestName of careerNames) {
          const matchedOfficialName = officialCareerNames.find((name) =>
            namesMatch(name, contestName),
          );
          if (!matchedOfficialName) continue;
          const rows = (
            (questions || []) as { career_name: string; item_number: number; subject: string }[]
          ).filter((q) => q.career_name === matchedOfficialName);
          nextSubjectByCareer.set(
            contestName,
            Object.fromEntries(rows.map((r) => [String(r.item_number), r.subject])),
          );
        }
        setSubjectByCareer(nextSubjectByCareer);
      } catch (error) {
        console.error("Falha ao montar o raio-X de desempenho", error);
        setErrorMessage(
          "Não foi possível carregar seus dados agora. Verifique sua conexão e tente novamente.",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, authLoading]);

  if (authLoading || isLoading)
    return (
      <div className="p-8 text-sm text-muted-foreground">Montando seu raio-X de desempenho...</div>
    );
  if (!user || user.id === "demo-user")
    return (
      <LockedState
        image="command-room"
        title={
          <>
            Raio-X <em>completo</em>
          </>
        }
        description="Seu diagnóstico completo fica protegido na conta vinculada ao CPF. Entre para ver precisão, ritmo e lacunas por matéria."
      />
    );
  if (errorMessage) return <EmptyState title="Falha ao carregar" description={errorMessage} />;
  if (!groups.length)
    return (
      <EmptyState
        title="Ainda não há provas suficientes"
        description="Envie ao menos uma prova em Minhas Provas para começar seu raio-X de desempenho."
      />
    );

  const totalCorrect = groups.reduce((sum, g) => sum + metric(g.correct), 0);
  const totalWrong = groups.reduce((sum, g) => sum + metric(g.wrong), 0);
  const globalAccuracy =
    totalCorrect + totalWrong ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;
  const globalSubjects = buildSubjectStats(groups, subjectByCareer);
  const weakSubjects = globalSubjects.filter(
    (s) => s.total >= MIN_ITEMS_FOR_SIGNAL && s.accuracy < WEAK_THRESHOLD,
  );
  const contestsWithSubjectData = groups.filter((g) => subjectByCareer.has(g.contest_name)).length;

  const federalGroups = groups.filter((g) => careerByAgency(g.contest_name)?.tier === "federal");
  const federalSubjects = buildSubjectStats(federalGroups, subjectByCareer);
  const federalWeak = federalSubjects.filter(
    (s) => s.total >= MIN_ITEMS_FOR_SIGNAL && s.accuracy < WEAK_THRESHOLD,
  );
  const federalByCareer = CAREERS.filter((c) => c.tier === "federal").map((career) => {
    const careerGroups = federalGroups.filter(
      (g) => careerByAgency(g.contest_name)?.id === career.id,
    );
    const correct = careerGroups.reduce((sum, g) => sum + metric(g.correct), 0);
    const wrong = careerGroups.reduce((sum, g) => sum + metric(g.wrong), 0);
    return {
      career,
      exams: careerGroups.length,
      accuracy: correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : null,
    };
  });

  return (
    <div className="space-y-7">
      <RaioXHero
        totalExams={groups.length}
        accuracy={globalAccuracy}
        weakestSubject={weakSubjects[0]?.subject ?? globalSubjects[0]?.subject ?? null}
      />

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="geral">Visão geral</TabsTrigger>
          <TabsTrigger value="materias">Raio-X por matéria</TabsTrigger>
          <TabsTrigger value="federal">Nível federal</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={FileStack}
              label="Provas analisadas"
              value={String(groups.length)}
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
              label="Matérias mapeadas"
              value={String(globalSubjects.length)}
              detail={`${contestsWithSubjectData} de ${groups.length} provas com banco de questões`}
              tone="amber"
            />
            <MetricCard
              icon={AlertTriangle}
              label="Matérias em alerta"
              value={String(weakSubjects.length)}
              detail="abaixo de 60% de aproveitamento"
              tone={weakSubjects.length ? "rose" : "emerald"}
            />
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Aproveitamento por prova
              </CardTitle>
              <CardDescription>Acertos líquidos de cada concurso já registrado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...groups]
                .sort(
                  (a, b) =>
                    a.contest_name.localeCompare(b.contest_name) ||
                    a.contest_year.localeCompare(b.contest_year),
                )
                .map((group) => {
                  const answered = metric(group.correct) + metric(group.wrong);
                  const accuracy = answered
                    ? Math.round((metric(group.correct) / answered) * 100)
                    : 0;
                  return (
                    <div key={group.key} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-56 shrink-0 truncate font-semibold"
                        title={group.contest_name}
                      >
                        {group.contest_name} — {group.contest_year}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            accuracy < 50
                              ? "bg-rose-500"
                              : accuracy < 75
                                ? "bg-amber-500"
                                : "bg-emerald-500",
                          )}
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      <span className="w-28 shrink-0 text-right text-muted-foreground">
                        {metric(group.correct)}/{answered} ({accuracy}%)
                      </span>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materias" className="space-y-6">
          {globalSubjects.length === 0 ? (
            <EmptyState
              title="Ainda sem matérias mapeadas"
              description="Suas provas ainda não têm banco de questões oficial vinculado para detalhar por matéria — o aproveitamento geral continua disponível na aba Visão geral."
            />
          ) : (
            <>
              {weakSubjects.length > 0 && (
                <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-black">Precisam de intensificação de estudo:</p>
                    <p className="mt-1">
                      {weakSubjects.map((s) => `${s.subject} (${s.accuracy}%)`).join(", ")}
                    </p>
                  </div>
                </div>
              )}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Aproveitamento por matéria (todas as provas)
                  </CardTitle>
                  <CardDescription>
                    Ordenado da matéria mais fraca para a mais forte, somando todos os concursos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[420px] pl-0">
                  <SubjectBarChart data={globalSubjects} />
                </CardContent>
              </Card>
              <SubjectTable subjects={globalSubjects} />
            </>
          )}
        </TabsContent>

        <TabsContent value="federal" className="space-y-6">
          {federalGroups.length === 0 ? (
            <EmptyState
              title="Nenhuma prova de nível federal ainda"
              description="Quando você tiver provas de PF, PRF ou DEPEN registradas, o comparativo federal aparece aqui."
            />
          ) : (
            <>
              <section className="grid gap-4 sm:grid-cols-3">
                {federalByCareer.map(({ career, exams, accuracy }) => (
                  <Card
                    key={career.id}
                    className="border-none shadow-sm"
                    style={{ background: `${career.color}14` }}
                  >
                    <CardContent className="flex items-start gap-3 p-4">
                      <Landmark
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: career.color }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
                          {career.fullName}
                        </p>
                        <p className="truncate text-xl font-black" style={{ color: career.color }}>
                          {accuracy === null ? "—" : `${accuracy}%`}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] opacity-70">
                          {exams} prova{exams === 1 ? "" : "s"} registrada{exams === 1 ? "" : "s"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>

              {federalWeak.length > 0 && (
                <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                  <Flag className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-black">Foco para carreiras federais:</p>
                    <p className="mt-1">
                      {federalWeak.map((s) => `${s.subject} (${s.accuracy}%)`).join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {federalSubjects.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Matérias — só concursos federais</CardTitle>
                    <CardDescription>
                      PF, PRF e DEPEN somados, da mais fraca para a mais forte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[380px] pl-0">
                    <SubjectBarChart data={federalSubjects} />
                  </CardContent>
                </Card>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma das provas federais registradas tem banco de questões vinculado ainda.
                </p>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RaioXHero({
  totalExams,
  accuracy,
  weakestSubject,
}: {
  totalExams: number;
  accuracy: number;
  weakestSubject: string | null;
}) {
  return (
    <section className="page-hero page-hero--lg" data-hero="command-room">
      <div className="page-hero__row">
        <div className="page-hero__text">
          <span className="hero-chip">
            <Activity /> Diagnóstico consolidado
          </span>
          <h1>
            Raio-X <em>completo</em>
          </h1>
          <p className="page-hero__desc">
            Todas as provas que você já fez, cruzadas por matéria, para mostrar exatamente onde
            intensificar o estudo.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <HeroStat label="Provas" value={String(totalExams)} />
          <HeroStat label="Aproveitamento" value={`${accuracy}%`} />
          <HeroStat label="Maior foco" value={weakestSubject ?? "—"} small />
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="hero-stat min-w-[104px] max-w-[170px]">
      <span>{label}</span>
      <strong className={cn("truncate tabular", small && "!text-base !leading-tight")}>
        {value}
      </strong>
    </div>
  );
}

const TONE_STYLES: Record<string, string> = {
  navy: "bg-ink text-white",
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

function SubjectBarChart({ data }: { data: SubjectStat[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#e2e8f0" />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="subject"
          type="category"
          width={200}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value, _name, item) => {
            const payload = item.payload as SubjectStat;
            return [`${value}% (${payload.correct}/${payload.total})`, "Aproveitamento"];
          }}
        />
        <Bar dataKey="accuracy" radius={[0, 6, 6, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.accuracy < 50 ? "#e11d48" : entry.accuracy < 75 ? "#f59e0b" : "#059669"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function SubjectTable({ subjects }: { subjects: SubjectStat[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalhamento por matéria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {subjects.map((s) => (
          <div key={s.subject} className="flex items-center gap-3 text-xs">
            <span className="w-48 shrink-0 truncate font-semibold" title={s.subject}>
              {s.subject}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={cn(
                  "h-full rounded-full",
                  s.accuracy < 50
                    ? "bg-rose-500"
                    : s.accuracy < 75
                      ? "bg-amber-500"
                      : "bg-emerald-500",
                )}
                style={{ width: `${s.accuracy}%` }}
              />
            </div>
            <span className="w-32 shrink-0 text-right text-muted-foreground">
              {s.correct}/{s.total} ({s.accuracy}%)
            </span>
            {s.total < MIN_ITEMS_FOR_SIGNAL && (
              <Badge variant="outline" className="shrink-0 text-[10px] text-muted-foreground">
                amostra pequena
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-muted-foreground/30" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="max-w-md text-muted-foreground">{description}</p>
    </div>
  );
}
