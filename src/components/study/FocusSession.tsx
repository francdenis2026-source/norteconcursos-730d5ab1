import React from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BrainCircuit,
  Coffee,
  Layers,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Target,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { plannedPractice } from "@/lib/plannedStudy";
import { cn } from "@/lib/utils";
import { readFocusDay, recordFocusCycle, type FocusDay } from "@/lib/studyFocusDay";

// ───────────────────────── Cronômetro (persistente) ─────────────────────────

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

export function FocusSession({
  subject,
  topic,
  day,
  focusMode,
  onEnterFocus,
  onExitFocus,
  onFocusDone,
}: {
  subject: string;
  topic: string;
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
  const trainer = plannedPractice(subject, topic);

  return (
    <Card className={cn("focus-session-card overflow-hidden", focusMode && "focus-session-card--active")}>
      <div className="focus-session-layout">
        <div className="focus-session-context">
          <div className="focus-session-heading">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" /> Cronômetro de foco
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

          <CardDescription className="mt-1">
            {focusMode
              ? "Apenas o assunto e os atalhos de estudo ficam na tela. Use Esc ou o botão acima para sair."
              : "O cronômetro usa o assunto escolhido acima. Ao iniciar, ele abre o modo foco em tela cheia."}
          </CardDescription>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <SubjectIcon subject={subject} />
            <span className="font-semibold">{subject || "Escolha uma disciplina"}</span>
            {topic && <span className="text-muted-foreground">· {topic}</span>}
          </div>
          <div className="focus-session-links">
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

        <div className={cn("focus-session-clock focus-timer-panel", isBreak ? "focus-session-clock--break" : "")}>
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
              <circle cx="110" cy="110" r={R} fill="none" strokeWidth="10" className="stroke-muted" />
              <circle
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
                className={cn("transition-[stroke-dashoffset] duration-300", isBreak ? "stroke-emerald-500" : "stroke-amber-400")}
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
                isBreak ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-amber-400 text-slate-900 hover:bg-amber-300",
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
            Hoje: <b className="text-foreground">{day.cycles}</b> {day.cycles === 1 ? "ciclo" : "ciclos"} ·{" "}
            <b className="text-foreground">{day.minutes} min</b> de foco
          </p>
        </div>
      </div>
    </Card>
  );
}
