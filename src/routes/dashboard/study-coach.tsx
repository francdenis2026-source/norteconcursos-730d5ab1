import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, ArrowUp, CalendarDays, Compass, Gauge, Loader2, Minus, PenLine, Pencil, Plus, Sparkles, Target, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { buildPlan, CAREERS, diffShares, type CareerId, type Experience, type SubjectStat } from "@/lib/studyEngine";
import { buildSchedule, DAY_NAMES } from "@/lib/studySchedule";
import { StudyRecord, WeekChecklist, type CheckRow } from "@/components/dashboard/StudyChecklist";
import { cn } from "@/lib/utils";
import { confirmDialog } from "@/lib/confirm";

export const Route = createFileRoute("/dashboard/study-coach")({ component: StudyCoachPage });

interface Profile {
  id: string;
  name: string | null;
  experience: Experience;
  career: CareerId;
  exam_date: string | null;
  hours_per_week: number;
  study_days: number[];
  essay: boolean;
  start_time: string;
  last_plan: { at: string; shares: Record<string, number> } | null;
}
type Draft = Omit<Profile, "id" | "last_plan">;

const EXPERIENCE: [Experience, string, string][] = [
  ["first", "Meu primeiro concurso", "Nunca estudei para concurso público. Quero começar do jeito certo."],
  ["some", "Já estudei um pouco", "Já fiz provas ou estudei por conta, mas ainda não fui aprovado."],
  ["veteran", "Concurseiro experiente", "Já tenho base sólida e quero afinar a estratégia."],
];
const HOURS = [5, 8, 10, 15, 20, 25, 30, 40];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // segunda → domingo
const START_TIMES = ["06:00", "07:00", "08:00", "12:00", "14:00", "16:00", "18:00", "19:00", "20:00", "21:00"];

/** Segunda-feira da semana atual (fuso do Acre) em yyyy-mm-dd. */
function acreWeekStart(now = new Date()): string {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Rio_Branco" }).format(now); // yyyy-mm-dd
  const d = new Date(`${today}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

function Wizard({ initial, onSave, onCancel }: { initial: Profile | null; onSave: (d: Draft) => Promise<void>; onCancel?: () => void }) {
  const [step, setStep] = React.useState(0);
  const [experience, setExperience] = React.useState<Experience | null>(initial?.experience ?? null);
  const [career, setCareer] = React.useState<CareerId>(initial?.career ?? "PF");
  const [name, setName] = React.useState(initial?.name ?? "");
  const [examDate, setExamDate] = React.useState(initial?.exam_date ?? "");
  const [hours, setHours] = React.useState(initial?.hours_per_week ?? 10);
  const [days, setDays] = React.useState<number[]>(initial?.study_days ?? [1, 2, 3, 4, 5, 6]);
  const [essay, setEssay] = React.useState<boolean | null>(initial ? initial.essay : null);
  const [startTime, setStartTime] = React.useState(initial?.start_time ?? "19:00");
  const [busy, setBusy] = React.useState(false);

  const steps = ["Experiência", "Objetivo", "Disponibilidade", "Redação"];
  const canNext = step === 0 ? !!experience : step === 2 ? days.length > 0 : true;
  const toggleDay = (d: number) => setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  async function finish() {
    if (!experience || essay === null) return;
    setBusy(true);
    await onSave({ name: name.trim() || null, experience, career, exam_date: examDate || null, hours_per_week: hours, study_days: days, essay, start_time: startTime });
    setBusy(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" /> {initial ? "Editar plano" : "Vamos montar o seu plano"}
        </CardTitle>
        <CardDescription>Quatro perguntas rápidas. Depois o plano se ajusta sozinho conforme você estuda.</CardDescription>
        <ol className="flex flex-wrap gap-2 pt-2 text-xs" aria-label="Etapas">
          {steps.map((s, i) => (
            <li key={s} className={cn("rounded-full px-3 py-1 font-semibold", i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </CardHeader>
      <CardContent className="space-y-5">
        {step === 0 && (
          <div className="grid gap-3 md:grid-cols-3" role="radiogroup" aria-label="Sua experiência com concursos">
            {EXPERIENCE.map(([id, title, text]) => (
              <button key={id} type="button" role="radio" aria-checked={experience === id} onClick={() => setExperience(id)}
                className={cn("rounded-xl border p-4 text-left transition-colors", experience === id ? "border-primary bg-primary/10" : "hover:border-primary/50")}>
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="plan-name">Nome do plano (opcional)</Label>
              <Input id="plan-name" value={name} maxLength={60} placeholder="Ex.: PF 2027, Polícia Penal AC…" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="career">Carreira que você quer</Label>
              <select id="career" value={career} onChange={(e) => setCareer(e.target.value as CareerId)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {CAREERS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam">Data da prova (se já souber)</Label>
              <Input id="exam" type="date" value={examDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setExamDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">Sem data? Deixe em branco: o plano assume 24 semanas e você ajusta depois.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-3">
              <Label>Quantas horas por semana você consegue estudar de verdade?</Label>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Horas por semana">
                {HOURS.map((h) => (
                  <button key={h} type="button" role="radio" aria-checked={hours === h} onClick={() => setHours(h)}
                    className={cn("rounded-full border px-4 py-2 text-sm font-semibold", hours === h ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
                    {h} h/semana
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Seja realista: é melhor cumprir 8 horas do que prometer 25 e desistir.</p>
            </div>
            <div className="space-y-3">
              <Label>A que horas você costuma começar a estudar?</Label>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Horário de início">
                {START_TIMES.map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={startTime === t} onClick={() => setStartTime(t)}
                    className={cn("rounded-full border px-4 py-2 text-sm font-semibold tabular-nums", startTime === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Nos fins de semana o cronograma começa pela manhã, se você escolher um horário à noite.</p>
            </div>
            <div className="space-y-3">
              <Label>Em quais dias da semana você estuda?</Label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Dias de estudo">
                {WEEK_ORDER.map((d) => (
                  <button key={d} type="button" aria-pressed={days.includes(d)} onClick={() => toggleDay(d)}
                    className={cn("rounded-full border px-4 py-2 text-sm font-semibold", days.includes(d) ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
                    {DAY_NAMES[d]?.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Label>A prova do seu concurso terá redação ou prova discursiva?</Label>
            <div className="grid gap-3 md:grid-cols-2" role="radiogroup" aria-label="Prova com redação">
              {([[true, "Sim, terá redação", "O cronograma inclui treino de redação e reescrita toda semana."], [false, "Não terá / ainda não sei", "Sem redação por enquanto. Você pode editar o plano depois."]] as const).map(([v, t, d]) => (
                <button key={String(v)} type="button" role="radio" aria-checked={essay === v} onClick={() => setEssay(v)}
                  className={cn("rounded-xl border p-4 text-left transition-colors", essay === v ? "border-primary bg-primary/10" : "hover:border-primary/50")}>
                  <p className="font-bold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex gap-2">
            {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Voltar</Button>}
            {onCancel && <Button variant="ghost" onClick={onCancel}>Cancelar</Button>}
          </div>
          {step < 3 ? (
            <Button disabled={!canNext} onClick={() => setStep(step + 1)}>Continuar <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button disabled={busy || !experience || essay === null} onClick={() => void finish()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Salvar alterações" : "Gerar meu plano"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TrendIcon({ t }: { t: "up" | "down" | "flat" | null }) {
  if (t === "up") return <ArrowUp className="h-3.5 w-3.5 text-emerald-600" aria-label="melhorando" />;
  if (t === "down") return <ArrowDown className="h-3.5 w-3.5 text-rose-600" aria-label="piorando" />;
  if (t === "flat") return <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-label="estável" />;
  return null;
}

type Mode = { kind: "view" } | { kind: "create" } | { kind: "edit"; id: string };

function StudyCoachPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [plans, setPlans] = React.useState<Profile[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState<SubjectStat[]>([]);
  const [hoursStudied, setHoursStudied] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<Mode>({ kind: "view" });
  const [checks, setChecks] = React.useState<CheckRow[]>([]);
  const real = !!user && user.id !== "demo-user";

  const load = React.useCallback(async () => {
    if (!user) return;
    const [p, s, h, c] = await Promise.all([
      supabase.from("study_profiles")
        .select("id,name,experience,career,exam_date,hours_per_week,study_days,essay,start_time,last_plan")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false }),
      supabase.rpc("my_subject_stats"),
      supabase.rpc("my_study_hours"),
      supabase.from("study_plan_checks")
        .select("plan_id,week_start,block_key,subject,kind,topics,minutes,done_at")
        .eq("user_id", user.id)
        .order("done_at", { ascending: false })
        .limit(2000),
    ]);
    setChecks((c.data as CheckRow[] | null) ?? []);
    const list = (p.data as Profile[] | null) ?? [];
    setPlans(list);
    setSelectedId((cur) => (cur && list.some((x) => x.id === cur) ? cur : (list[0]?.id ?? null)));
    setStats((s.data as SubjectStat[] | null) ?? []);
    setHoursStudied(Number(h.data ?? 0));
    setLoading(false);
  }, [user]);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real) { setLoading(false); return; }
    void load();
  }, [authLoading, real, load]);

  const profile = plans.find((p) => p.id === selectedId) ?? null;
  const plan = React.useMemo(
    () => profile ? buildPlan({ experience: profile.experience, career: profile.career, examDate: profile.exam_date, hoursPerWeek: profile.hours_per_week, stats, hoursStudied }) : null,
    [profile, stats, hoursStudied],
  );
  const weekStart = React.useMemo(() => acreWeekStart(), []);
  const weekIndex = Math.floor(new Date(`${weekStart}T00:00:00Z`).getTime() / (7 * 86_400_000));
  // Blocos de teoria concluídos em semanas anteriores: os assuntos seguem de onde o aluno parou.
  const doneBefore = React.useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of checks) {
      if (c.plan_id === profile?.id && c.kind === "Teoria" && c.week_start < weekStart) m[c.subject] = (m[c.subject] ?? 0) + 1;
    }
    return m;
  }, [checks, profile?.id, weekStart]);
  const schedule = React.useMemo(
    () => (plan && profile ? buildSchedule(plan, profile.study_days, profile.essay, { weekIndex, startTime: profile.start_time, doneBefore }) : []),
    [plan, profile, weekIndex, doneBefore],
  );
  const changes = React.useMemo(() => (plan ? diffShares(profile?.last_plan?.shares, plan.subjects) : []), [plan, profile]);

  // Guarda uma "foto" do plano a cada 7 dias para mostrar o que mudou desde então.
  React.useEffect(() => {
    if (!plan || !profile) return;
    const at = profile.last_plan?.at;
    if (at && Date.now() - new Date(at).getTime() < 7 * 86_400_000) return;
    const shares = Object.fromEntries(plan.subjects.map((s) => [s.name, s.share]));
    void supabase.from("study_profiles").update({ last_plan: { at: new Date().toISOString(), shares } }).eq("id", profile.id);
  }, [plan, profile]);

  async function save(d: Draft) {
    if (!user) return;
    const res =
      mode.kind === "edit"
        ? await supabase.from("study_profiles").update(d).eq("id", mode.id).select("id").single()
        : await supabase.from("study_profiles").insert({ ...d, user_id: user.id }).select("id").single();
    if (res.error || !res.data) { toast.error("Não foi possível salvar. Tente novamente."); return; }
    toast.success(mode.kind === "edit" ? "Plano atualizado." : "Plano criado.");
    setSelectedId(res.data.id);
    setMode({ kind: "view" });
    await load();
  }

  async function remove(p: Profile) {
    const label = p.name || CAREERS.find((c) => c.id === p.career)?.name || "este plano";
    if (!(await confirmDialog({ title: "Excluir plano?", message: `"${label}": o cronograma e os ajustes serão apagados. Seu histórico de questões e seu registro de estudos não são afetados.`, confirmLabel: "Excluir plano" }))) return;
    const { error } = await supabase.from("study_profiles").delete().eq("id", p.id);
    if (error) { toast.error("Não foi possível excluir."); return; }
    toast.success("Plano excluído.");
    setSelectedId(null);
    await load();
  }

  if (authLoading || loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) {
    return <LockedState image="study-desk" title={<>Assistente de <em>estudos</em></>} description="Entre na sua conta para montar um plano que se ajusta aos seus acertos, erros e tempo de estudo." />;
  }

  const careerName = CAREERS.find((c) => c.id === profile?.career)?.name ?? "";
  const planLabel = (p: Profile) => p.name || CAREERS.find((c) => c.id === p.career)?.name || "Plano";
  const showWizard = plans.length === 0 || mode.kind !== "view";
  const editing = mode.kind === "edit" ? (plans.find((p) => p.id === mode.id) ?? null) : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero image="study-desk" size="sm" kicker="Hoje" icon={Compass} title={<>Assistente de <em>estudos</em></>}
        description="Um plano que começa pelo seu perfil e se reajusta a cada questão, simulado e hora de estudo." />

      {plans.length > 0 && (
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Seus planos">
          {plans.map((p) => (
            <button key={p.id} type="button" role="tab" aria-selected={p.id === selectedId} onClick={() => { setSelectedId(p.id); setMode({ kind: "view" }); }}
              className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold", p.id === selectedId ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
              {planLabel(p)}
            </button>
          ))}
          {mode.kind === "view" && (
            <Button size="sm" variant="outline" onClick={() => setMode({ kind: "create" })}><Plus className="h-4 w-4" /> Novo plano</Button>
          )}
        </div>
      )}

      {showWizard && (
        <Wizard
          key={mode.kind === "edit" ? mode.id : mode.kind}
          initial={editing}
          onSave={save}
          {...(plans.length > 0 ? { onCancel: () => setMode({ kind: "view" }) } : {})}
        />
      )}

      {profile && plan && mode.kind === "view" && (
        <>
          <Card>
            <CardHeader className="gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{plan.phase.title}</Badge>
                  {profile.essay && <Badge variant="outline" className="gap-1"><PenLine className="h-3 w-3" /> Com redação</Badge>}
                </div>
                <CardTitle className="text-xl">{profile.name || careerName}</CardTitle>
                <CardDescription>{profile.name ? `${careerName} · ` : ""}{plan.phase.focus}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setMode({ kind: "edit", id: profile.id })}><Pencil className="h-4 w-4" /> Editar</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => void remove(profile)}><Trash2 className="h-4 w-4" /> Excluir</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-lg bg-muted/60 p-3"><p className="flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" /> Tempo até a prova</p><p className="text-xl font-black">{plan.weeksLeft !== null ? `${plan.weeksLeft} semanas` : `~${plan.assumedWeeks} sem. (estimado)`}</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground"><Gauge className="h-3.5 w-3.5" /> Ritmo estimado</p><p className="text-xl font-black">{plan.neededHoursPerWeek} h/sem</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">Sua disponibilidade</p><p className="text-xl font-black">{plan.hoursPerWeek} h/sem</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground"><Target className="h-3.5 w-3.5" /> Acerto geral</p><p className="text-xl font-black">{plan.overallAccuracy !== null ? `${plan.overallAccuracy}%` : "—"}</p></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span>Sua disponibilidade cobre o ritmo estimado</span>
                  <span className={plan.feasible ? "text-emerald-600" : "text-amber-600"}>{plan.coverage}%</span>
                </div>
                <Progress value={plan.coverage} className="h-2.5" />
              </div>
              <p className="text-xs text-muted-foreground">Estimativa baseada na sua experiência, na carreira e no seu desempenho real. Serve para orientar o estudo e não garante aprovação.</p>
            </CardContent>
          </Card>

          {user && (
            <WeekChecklist
              userId={user.id}
              planId={profile.id}
              weekStart={weekStart}
              schedule={schedule}
              checks={checks}
              onChange={() => void load()}
              hasEssay={profile.essay}
              restDays={WEEK_ORDER.filter((d) => !profile.study_days.includes(d)).map((d) => DAY_NAMES[d] ?? "")}
            />
          )}

          <StudyRecord checks={checks} planId={profile.id} />

          {changes.length > 0 && (
            <Card className="border-primary/40">
              <CardHeader><CardTitle className="text-base">O plano foi reajustado</CardTitle><CardDescription>Mudanças desde a última revisão, pelo seu desempenho.</CardDescription></CardHeader>
              <CardContent className="space-y-1 text-sm">
                {changes.map((c) => (
                  <p key={c.name}><strong>{c.name}</strong>: {c.delta > 0 ? "ganhou" : "perdeu"} {Math.abs(c.delta)} p.p. do seu tempo (agora {c.now}%).</p>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Sua semana por matéria</CardTitle>
              <CardDescription>Quem mais precisa recebe mais tempo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.subjects.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold">{s.name} <TrendIcon t={s.trend} /></span>
                    <span className="tabular-nums text-muted-foreground">{s.minutes} min · {s.questions} questões · {s.share}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full", s.accuracy === null ? "bg-primary/60" : s.accuracy < 60 ? "bg-rose-500" : s.accuracy < 75 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, s.share * 4)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{s.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {plan.tips.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Recomendações</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  {[...plan.tips, ...(profile.essay ? ["Redação: escreva à mão pelo menos uma vez por semana, no limite de 30 linhas, e reescreva depois de revisar com o guia."] : [])].map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm"><Link to="/dashboard/question-trainer">Resolver questões <ArrowRight className="h-4 w-4" /></Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to="/dashboard/mock-exams">Fazer um simulado</Link></Button>
                  {profile.essay && <Button asChild size="sm" variant="outline"><Link to="/dashboard/essays">Treinar redação</Link></Button>}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
