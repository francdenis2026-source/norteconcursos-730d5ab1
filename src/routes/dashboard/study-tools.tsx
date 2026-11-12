import { plannedPractice } from "@/lib/plannedStudy";
import "@/styles/learning-workspace-refinement.css";
import "@/styles/study-tool-launcher.css";
import { ENEM_AREAS } from "@/data/enem";
import { platformDate } from "@/lib/platformClock";
import { libraryCollection } from "@/lib/libraryOrganization";
import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpenCheck,
  LibraryBig,
  BrainCircuit,
  ChevronDown,
  Coffee,
  Layers,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubjectIcon } from "@/components/ui/subject-icon";
import {
  CAREERS,
  buildPlan,
  type CareerId,
  type Experience,
  norm,
  type SubjectStat,
} from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { TRACKS } from "@/data/tracks";
import { acreDateKey } from "@/lib/acreTime";
import { cn } from "@/lib/utils";
import { useWorkspaceFullscreen } from "@/hooks/useWorkspaceFullscreen";
import { userStorageKey } from "@/lib/userStorage";
import "@/styles/study-tools-refinement.css";
import "@/styles/study-area-compact.css";

export const Route = createFileRoute("/dashboard/study-tools")({
  head: () => ({ meta: [{ title: "Central de Estudos | Norte Concurso" }] }),
  validateSearch: (search: Record<string, unknown>): { context?: "enem" | undefined } => ({ context: search["context"] === "enem" ? "enem" : undefined }),
  component: StudyToolsPage,
});

const ALL_SUBJECTS = [
  "Língua Portuguesa", "Raciocínio Lógico", "Matemática", "Estatística", "Informática",
  "Direito Constitucional", "Direito Administrativo", "Direito Penal", "Direito Processual Penal",
  "Legislação Especial", "Legislação de Trânsito", "Direitos Humanos", "Contabilidade",
  "Atualidades", "Ética", "Medicina Legal",
];

// ───────────────────────── Contexto do aluno ─────────────────────────

interface Profile {
  id: string;
  name: string | null;
  experience: Experience;
  career: CareerId;
  exam_date: string | null;
  hours_per_week: number;
  essay: boolean;
}
interface DueCard {
  id: string;
  subject: string;
  topic: string | null;
  front: string;
  back: string;
}

function useStudyContext() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [stats, setStats] = React.useState<SubjectStat[]>([]);
  const [hours, setHours] = React.useState(0);
  const [due, setDue] = React.useState<DueCard[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    void (async () => {
      const [p, s, h, d] = await Promise.all([
        supabase
          .from("study_profiles")
          .select("id,name,experience,career,exam_date,hours_per_week,essay")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1),
        supabase.rpc("my_subject_stats"),
        supabase.rpc("my_study_hours"),
        supabase
          .from("flashcards")
          .select("id,subject,topic,front,back")
          .eq("user_id", user.id)
          .lte("due_at", platformDate().toISOString())
          .order("due_at")
          .limit(300),
      ]);
      if (!alive) return;
      setProfile(((p.data as Profile[] | null) ?? [])[0] ?? null);
      setStats((s.data as SubjectStat[] | null) ?? []);
      setHours(Number(h.data ?? 0));
      setDue((d.data as DueCard[] | null) ?? []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [authLoading, real, user]);

  const career = CAREERS.find((c) => c.id === profile?.career) ?? CAREERS[CAREERS.length - 1]!;
  const plan = React.useMemo(
    () =>
      profile
        ? buildPlan({
            experience: profile.experience,
            career: profile.career,
            examDate: profile.exam_date,
            hoursPerWeek: profile.hours_per_week,
            stats,
            hoursStudied: hours,
          })
        : null,
    [profile, stats, hours],
  );
  // Disciplinas do plano primeiro; as demais da plataforma ficam disponíveis para estudo livre.
  const subjects = React.useMemo(() => {
    const own = plan ? plan.subjects.map((s) => s.name) : career.subjects.map((s) => s.name);
    const seen = new Set(own.map(norm));
    return [...own, ...ALL_SUBJECTS.filter((n) => !seen.has(norm(n)) && topicsFor(n).length)];
  }, [plan, career]);
  // Matéria mais urgente: pior aproveitamento (com amostra mínima); sem dados, a de maior peso no tempo.
  const suggested = React.useMemo(() => {
    if (!plan) return subjects[0] ?? "";
    const withData = plan.subjects
      .filter((s) => s.accuracy !== null && s.answered >= 10)
      .sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    return (
      (withData[0] ?? [...plan.subjects].sort((a, b) => b.share - a.share)[0])?.name ??
      subjects[0] ??
      ""
    );
  }, [plan, subjects]);
  const daysToExam = profile?.exam_date
    ? Math.ceil((new Date(`${profile.exam_date}T12:00:00-05:00`).getTime() - Date.now()) / 86_400_000)
    : null;
  return {
    real,
    loading: loading || authLoading,
    profile,
    career,
    plan,
    subjects,
    suggested,
    due,
    daysToExam,
  };
}

// ───────────────────────── Página ─────────────────────────

const DAY_KEY = "norte_focus_day";
function readDay(): { day: string; cycles: number; minutes: number } {
  const fresh = { day: acreDateKey(), cycles: 0, minutes: 0 };
  try {
    const v = JSON.parse(localStorage.getItem(userStorageKey(DAY_KEY)) ?? "null") as typeof fresh | null;
    return v && v.day === fresh.day ? v : fresh;
  } catch {
    return fresh;
  }
}

function StudyToolsPage() {
  const ctx = useStudyContext();
  const fullscreen = useWorkspaceFullscreen(true);
  const { context } = Route.useSearch();
  const enem = context === "enem";
  const enemSubjects = React.useMemo(() => ENEM_AREAS.flatMap(area => area.subjects), []);
  const subjects = enem ? enemSubjects.map(item => item.name) : ctx.subjects;
  const suggested = enem ? (subjects[0] ?? "") : ctx.suggested;
  const pickKey = enem ? "norte_focus_pick_enem" : "norte_focus_pick";
  const [pick, setPick] = React.useState<{ subject: string; topic: string }>({ subject: "", topic: "" });
  const [day, setDay] = React.useState({ day: "", cycles: 0, minutes: 0 });

  React.useEffect(() => {
    setDay(readDay());
    try {
      const saved = JSON.parse(localStorage.getItem(pickKey) ?? "null") as typeof pick | null;
      if (saved) setPick(saved);
    } catch {
      /* armazenamento indisponível */
    }
  }, [pickKey, ctx.real]);

  const subject = pick.subject && subjects.includes(pick.subject) ? pick.subject : suggested;
  const topics = React.useMemo(
    () => enem ? (enemSubjects.find(item => item.name === subject)?.topics ?? []) : topicsFor(subject),
    [subject, enem, enemSubjects],
  );
  const topic = topics.includes(pick.topic) ? pick.topic : (topics[0] ?? "");
  const choose = (next: { subject: string; topic: string }) => {
    setPick(next);
    try {
      localStorage.setItem(pickKey, JSON.stringify(next));
    } catch {
      /* armazenamento indisponível */
    }
  };
  const onFocusDone = (minutes: number) => {
    const current = readDay();
    const next = { ...current, cycles: current.cycles + 1, minutes: current.minutes + minutes };
    try {
      localStorage.setItem(userStorageKey(DAY_KEY), JSON.stringify(next));
    } catch {
      /* armazenamento indisponível */
    }
    setDay(next);
  };
  const trainer = { ...plannedPractice(subject, topic), ...(enem ? { contest: "ENEM" } : {}) };
  const track = TRACKS.find(item => norm(subject).includes(norm(item.discipline)));

  return (
    <div className="nc-learning-workspace study-tools-page space-y-5" data-focus-session={fullscreen.active ? "true" : undefined}>
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Seu ambiente de aprendizagem</p>
            <h1 className="text-2xl font-bold tracking-tight">Central de Estudos</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Um fluxo simples: escolha o assunto, estude o conteúdo e pratique com questões.
            </p>
          </div>
          {!enem && !ctx.profile && !ctx.loading && ctx.real && (
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard/study-coach"><Sparkles className="mr-2 h-4 w-4" />Configurar meu plano</Link>
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-sm">
          <span className="text-muted-foreground">Hoje: <strong className="text-foreground">{day.minutes} min</strong> de estudo</span>
          <span className="text-muted-foreground"><strong className="text-foreground">{day.cycles}</strong> {day.cycles === 1 ? "sessão concluída" : "sessões concluídas"}</span>
          {!enem && <span className="text-muted-foreground"><strong className="text-foreground">{ctx.due.length}</strong> cartões aguardando revisão</span>}
          {ctx.profile && !enem && ctx.daysToExam !== null && ctx.daysToExam >= 0 && (
            <span className="text-muted-foreground"><strong className="text-foreground">{ctx.daysToExam}</strong> dias até a prova</span>
          )}
        </div>
      </header>

      <section className="rounded-2xl border bg-card p-4 sm:p-5" aria-labelledby="study-selection-title">
        <div className="mb-4">
          <h2 id="study-selection-title" className="text-base font-semibold">1. O que você vai estudar?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {ctx.loading ? "Carregando suas disciplinas…" : suggested ? "Sua disciplina prioritária já vem selecionada. Você pode alterá-la quando quiser." : "Selecione a disciplina e o assunto para personalizar seus atalhos."}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Disciplina</span>
            <select className={selectCls} value={subject} onChange={event => choose({ subject: event.target.value, topic: "" })}>
              {subjects.map(name => <option key={name} value={name}>{name}{name === suggested && !enem ? " · prioridade" : ""}</option>)}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Assunto</span>
            <select className={selectCls} value={topic} onChange={event => choose({ subject, topic: event.target.value })}>
              {topics.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <SubjectIcon subject={subject} />
          <span className="font-medium text-foreground">{subject || "Disciplina não selecionada"}</span>
          {topic && <><span aria-hidden="true">·</span><span>{topic}</span></>}
        </div>
      </section>

      <section aria-labelledby="study-actions-title" className="space-y-3">
        <div>
          <h2 id="study-actions-title" className="text-base font-semibold">2. Continue seu estudo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Acesse diretamente a ferramenta certa para esta etapa.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {enem ? (
            <Link to="/dashboard/enem" search={{ tab: "materiais" }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
              <BookOpenCheck className="mb-3 h-5 w-5 text-primary" />
              <span className="block font-semibold">Estudar conteúdo</span>
              <span className="mt-1 block text-xs text-muted-foreground">Materiais e explicações do ENEM</span>
              <span className="mt-3 block text-xs font-semibold text-primary">Abrir materiais →</span>
            </Link>
          ) : (
            <Link to="/dashboard/study-room" search={{ subject, topic }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
              <BookOpenCheck className="mb-3 h-5 w-5 text-primary" />
              <span className="block font-semibold">Estudar conteúdo</span>
              <span className="mt-1 block text-xs text-muted-foreground">Sala de estudo, explicações e materiais</span>
              <span className="mt-3 block text-xs font-semibold text-primary">Abrir sala de estudo →</span>
            </Link>
          )}
          <Link to="/dashboard/question-trainer" search={trainer} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <BrainCircuit className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Praticar questões</span>
            <span className="mt-1 block text-xs text-muted-foreground">Treine com foco na disciplina selecionada</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Começar treino →</span>
          </Link>
          {!enem && <Link to="/dashboard/flashcards" search={{ subject, topic }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <Layers className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Revisar flashcards</span>
            <span className="mt-1 block text-xs text-muted-foreground">{ctx.due.length ? `${ctx.due.length} cartões aguardando revisão` : "Memorize conceitos e pontos-chave"}</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Abrir revisões →</span>
          </Link>}
          <Link to="/dashboard/library" search={{ q: topic || subject, back: undefined, collection: libraryCollection({ slug: "", discipline: subject }) === "subjects" ? "subjects" : "laws" }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <LibraryBig className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Consultar biblioteca</span>
            <span className="mt-1 block text-xs text-muted-foreground">Localize legislação e materiais de referência</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Pesquisar material →</span>
          </Link>
        </div>
        {!enem && track && <p className="text-xs text-muted-foreground">Trilha relacionada: <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/dashboard/trilhas" search={{ t: track.slug, l: undefined }}>{track.discipline}</Link></p>}
      </section>

      <details className="rounded-xl border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-sm font-semibold">Cronômetro de foco</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Opcional · ciclos de 25 ou 50 minutos e pausa</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </summary>
        <div className="border-t p-3 sm:p-4">
          <FocusCard
            enem={enem}
            subjects={subjects}
            suggested={suggested}
            subject={subject}
            topic={topic}
            topics={topics}
            onPick={choose}
            day={day}
            focusMode={fullscreen.active}
            onEnterFocus={fullscreen.enter}
            onExitFocus={fullscreen.exit}
            onFocusDone={onFocusDone}
          />
        </div>
      </details>
    </div>
  );
}


// ───────────────────────── Foco (Pomodoro persistente) ─────────────────────────

type Mode = 25 | 50 | 5;
interface Pomo {
  mode: Mode;
  endsAt: number | null;
  left: number;
}
const POMO_KEY = "norte_pomo_v2";
const FRESH: Pomo = { mode: 25, endsAt: null, left: 25 * 60 };

function usePomodoro(onDone: (mode: Mode) => void) {
  const [p, setP] = React.useState<Pomo>(FRESH);
  const [now, setNow] = React.useState(0);
  const done = React.useRef(onDone);
  done.current = onDone;
  const save = React.useCallback((next: Pomo) => {
    setP(next);
    try {
      localStorage.setItem(POMO_KEY, JSON.stringify(next));
    } catch {
      /* sem armazenamento */
    }
  }, []);

  React.useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(POMO_KEY) ?? "null") as Pomo | null;
      if (v) setP(v);
    } catch {
      /* sem armazenamento */
    }
    setNow(Date.now());
  }, []);

  React.useEffect(() => {
    if (!p.endsAt) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (p.endsAt && t >= p.endsAt) {
        save({ mode: p.mode, endsAt: null, left: p.mode * 60 });
        done.current(p.mode);
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [p, save]);

  const left = p.endsAt ? Math.max(0, Math.ceil((p.endsAt - now) / 1000)) : p.left;
  return {
    mode: p.mode,
    left,
    running: !!p.endsAt,
    setMode: (m: Mode) => save({ mode: m, endsAt: null, left: m * 60 }),
    toggle: () =>
      save(p.endsAt ? { ...p, endsAt: null, left } : { ...p, endsAt: Date.now() + left * 1000 }),
    reset: () => save({ mode: p.mode, endsAt: null, left: p.mode * 60 }),
  };
}

const selectCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium";

function FocusCard({
  enem = false,
  subjects,
  suggested,
  subject,
  topic,
  topics,
  onPick,
  day,
  focusMode,
  onEnterFocus,
  onExitFocus,
  onFocusDone,
}: {
  enem?: boolean;
  subjects: string[];
  suggested: string;
  subject: string;
  topic: string;
  topics: string[];
  onPick: (v: { subject: string; topic: string }) => void;
  day: { cycles: number; minutes: number };
  focusMode: boolean;
  onEnterFocus: () => void;
  onExitFocus: () => void;
  onFocusDone: (minutes: number) => void;
}) {
  const pomo = usePomodoro((mode) => {
    if (mode === 5) toast.success("Pausa concluída. Hora de voltar ao foco.");
    else {
      onFocusDone(mode);
      toast.success(`Ciclo de ${mode} min concluído. Faça uma pausa de 5 min.`);
    }
  });
  const startFocus = () => {
    onEnterFocus();
    if (!pomo.running) pomo.toggle();
  };
  const total = pomo.mode * 60;
  const pct = total ? (total - pomo.left) / total : 0;
  const R = 92;
  const C = 2 * Math.PI * R;
  const mm = String(Math.floor(pomo.left / 60)).padStart(2, "0");
  const ss = String(pomo.left % 60).padStart(2, "0");
  const isBreak = pomo.mode === 5;
  const trainer = { ...plannedPractice(subject, topic), ...(enem ? { contest: "ENEM" } : {}) };

  return (
    <Card className={cn("focus-session-card overflow-hidden", focusMode && "focus-session-card--active")}>
      <div className="focus-session-layout">
        <div className="focus-session-context">
          <div className="focus-session-heading">
            <div>
              <span className="focus-session-kicker">{focusMode ? "MODO FOCO ATIVO" : "PREPARE SUA SESSÃO"}</span>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" /> Sessão de foco
              </CardTitle>
            </div>
            {focusMode ? (
              <Button type="button" variant="outline" size="sm" onClick={onExitFocus} className="gap-2">
                <Minimize2 className="h-4 w-4" /> Sair da tela cheia
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={startFocus} className="gap-2">
                <Maximize2 className="h-4 w-4" /> Ativar modo foco
              </Button>
            )}
          </div>

          <div>
            <CardDescription className="mt-1">
              {focusMode
                ? "Apenas o assunto e os atalhos de estudo ficam na tela. Use Esc ou o botão acima para sair."
                : "Escolha o que vai estudar agora. Ao iniciar, o cronômetro abre o modo foco em tela cheia."}
            </CardDescription>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Disciplina</span>
            <select
              className={selectCls}
              value={subject}
              onChange={(e) => onPick({ subject: e.target.value, topic: "" })}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s === suggested ? `${s} — sugerida pelo seu plano` : s}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Assunto</span>
            <select
              className={selectCls}
              value={topic}
              onChange={(e) => onPick({ subject, topic: e.target.value })}
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <SubjectIcon subject={subject} />
            <span className="font-semibold">{subject}</span>
            <span className="text-muted-foreground">· {topic}</span>
          </div>
          <div className="focus-session-links">
            <Button asChild variant="outline" className="justify-start gap-2">
              {enem ? <Link to="/dashboard/enem" search={{ tab: "materiais" }}><BookOpenCheck className="h-4 w-4" /> Materiais ENEM</Link> : <Link to="/dashboard/study-room" search={{ subject, topic }}><BookOpenCheck className="h-4 w-4" /> Sala de estudo</Link>}
            </Button>
            <Button asChild variant="outline" className="justify-start gap-2">
              <Link to="/dashboard/question-trainer" search={trainer}>
                <BrainCircuit className="h-4 w-4" /> Questões
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start gap-2">
              <Link to="/dashboard/flashcards" search={{ subject, topic }}>
                <Layers className="h-4 w-4" /> Flashcards
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "focus-session-clock focus-timer-panel",
            isBreak ? "focus-session-clock--break" : "",

          )}
        >
          <div className="flex gap-2" role="tablist" aria-label="Tipo de bloco">
            {([25, 50, 5] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={pomo.mode === m}
                onClick={() => pomo.setMode(m)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-[color,background-color,box-shadow]",
                  pomo.mode === m
                    ? m === 5
                      ? "bg-emerald-500 text-white shadow"
                      : "bg-amber-400 text-slate-900 shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {m === 5 ? (
                  <>
                    <Coffee className="h-3.5 w-3.5" /> Pausa 5 min
                  </>
                ) : (
                  <>
                    <Timer className="h-3.5 w-3.5" /> Foco {m} min
                  </>
                )}
              </button>
            ))}
          </div>
          <div className="relative grid place-items-center">
            <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90" aria-hidden>
              <circle
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth="10"
                className="stroke-muted"
              />
              <circle
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
                className={cn(
                  "transition-[stroke-dashoffset] duration-300",
                  isBreak ? "stroke-emerald-500" : "stroke-amber-400",
                )}
              />
            </svg>
            <div className="absolute text-center" role="timer" aria-label="Tempo restante">
              <div className="text-5xl font-black tabular-nums">
                {mm}:{ss}
              </div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground">
                {isBreak ? "Descanse a mente" : pomo.running ? "Em foco" : "Pronto para começar"}
              </div>
            </div>
          </div>
          <div className="focus-progress" aria-label="Progresso do ciclo">
            <div className="focus-progress__label">
              <span>Progresso do ciclo</span>
              <strong>{Math.round(pct * 100)}%</strong>
            </div>
            <div
              className="focus-progress__track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct * 100)}
            >
              <span style={{ width: `${Math.round(pct * 100)}%` }} />
            </div>
            <div className="focus-progress__meta">
              <span>{Math.floor((total - pomo.left) / 60)} min concluídos</span>
              <span>{Math.ceil(pomo.left / 60)} min restantes</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={pomo.running ? pomo.toggle : startFocus}
              className={cn(
                "min-w-32 gap-2",
                isBreak
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-amber-400 text-slate-900 hover:bg-amber-300",
              )}
            >
              {pomo.running ? (
                <>
                  <Pause className="h-4 w-4" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> {focusMode ? "Iniciar" : "Iniciar em tela cheia"}
                </>
              )}
            </Button>
            <Button variant="outline" onClick={pomo.reset} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Zerar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Hoje: <b className="text-foreground">{day.cycles}</b>{" "}
            {day.cycles === 1 ? "ciclo" : "ciclos"} ·{" "}
            <b className="text-foreground">{day.minutes} min</b> de foco
          </p>
        </div>
      </div>
    </Card>
  );
}
