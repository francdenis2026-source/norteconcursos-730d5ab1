import React, { useState, useEffect, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { userStorageKey } from "@/lib/userStorage";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  History,
  Timer as TimerIcon,
  CheckCircle2,
} from "lucide-react";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { MockService } from "@/services/mockService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/timer")({
  component: TimerPage,
});

type TimerMode = "study" | "short-break" | "long-break";

const MODES: Record<
  TimerMode,
  { label: string; minutes: number; icon: LucideIcon; color: string }
> = {
  study: { label: "Foco Total", minutes: 25, icon: Brain, color: "text-primary" },
  "short-break": { label: "Pausa Curta", minutes: 5, icon: Coffee, color: "text-emerald-500" },
  "long-break": { label: "Pausa Longa", minutes: 15, icon: Coffee, color: "text-secondary" },
};

function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("study");
  const [timeLeft, setTimeLeft] = useState(MODES.study.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const active = localStorage.getItem(userStorageKey("norte_timer_active"));
    if (active) {
      const parsed = JSON.parse(active);
      const elapsed = Math.floor((Date.now() - parsed.timestamp) / 1000);
      const remaining = parsed.timeLeft - elapsed;

      if (remaining > 0) {
        setMode(parsed.mode);
        setTimeLeft(remaining);
        setIsActive(true);
      } else {
        localStorage.removeItem(userStorageKey("norte_timer_active"));
      }
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      localStorage.setItem(
        userStorageKey("norte_timer_active"),
        JSON.stringify({
          mode,
          timeLeft,
          timestamp: Date.now(),
        }),
      );
    } else {
      localStorage.removeItem(userStorageKey("norte_timer_active"));
    }
  }, [isActive, timeLeft, mode]);

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audio.play().catch(() => {});

    if (mode === "study") {
      setSessionsCompleted((prev) => prev + 1);
      toast.success("Sessão de foco concluída! Hora de uma pausa.");
      // Tempo de permanência é registrado pelo studyClock, sem criar respostas fictícias.
      setMode("short-break");
      setTimeLeft(MODES["short-break"].minutes * 60);
    } else {
      toast.info("Pausa finalizada. Vamos voltar ao foco?");
      setMode("study");
      setTimeLeft(MODES.study.minutes * 60);
    }
  }, [mode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, handleTimerComplete]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const changeMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const format = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const progress = ((MODES[mode].minutes * 60 - timeLeft) / (MODES[mode].minutes * 60)) * 100;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="study-desk"
        kicker="Foco"
        icon={TimerIcon}
        title={
          <>
            Cronômetro <em>Pomodoro</em>
          </>
        }
        description="Maximize sua concentração com intervalos estratégicos."
        actions={<HeroStat icon={CheckCircle2} label="Sessões hoje" value={sessionsCompleted} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center p-12 gap-8 relative">
            <div className="flex gap-2 p-1 bg-muted rounded-lg mb-4">
              {(Object.keys(MODES) as TimerMode[]).map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => changeMode(m)}
                  className="text-xs h-8"
                >
                  {MODES[m].label}
                </Button>
              ))}
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={753.98}
                  strokeDashoffset={753.98 * (1 - progress / 100)}
                  className={cn(
                    "transition-all duration-1000",
                    MODES[mode].color.replace("text-", "stroke-"),
                  )}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-6xl font-mono font-black tracking-tighter text-primary z-10">
                {format(timeLeft)}
              </div>
            </div>

            <div className="flex gap-4 z-10">
              <Button
                onClick={toggle}
                size="lg"
                className={cn(
                  "w-32 h-14 text-lg font-bold shadow-lg transition-transform active:scale-95",
                  isActive
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                )}
              >
                {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isActive ? "Pausar" : "Iniciar"}
              </Button>
              <Button variant="outline" size="lg" onClick={reset} className="h-14 w-14 border-2">
                <RotateCcw className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute bottom-6 right-6 opacity-10">
              {React.createElement(MODES[mode].icon, { className: "h-24 w-24" })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TimerIcon className="h-4 w-4 text-secondary" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ciclo Pomodoro</span>
                  <span className="font-bold">25 min</span>
                </div>
                <Progress value={100} className="h-1" />
              </div>
              <div className="p-3 bg-secondary/5 border border-secondary/10 rounded-lg text-[11px] leading-relaxed italic">
                "A técnica Pomodoro ajuda a manter o cérebro fresco e focado, evitando a fadiga
                mental durante longas maratonas de estudo."
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Sessões Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sessionsCompleted > 0 ? (
                  [...Array(sessionsCompleted)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 px-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">Foco Total</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-emerald-600">+25m</span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    Nenhuma sessão concluída hoje.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
