import React from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Pencil, Check, X, FileText, Crown, ArrowRight } from "lucide-react";
import { MockService } from "@/services/mockService";
import { toast } from "sonner";

type Goals = {
  questionsPerDay: number;
  minutesPerDay: number;
};

const STORAGE_KEY = "norte_study_goals";
const DEFAULT_GOALS: Goals = { questionsPerDay: 20, minutesPerDay: 60 };

function loadGoals(): Goals {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GOALS;
    const parsed = JSON.parse(raw) as Partial<Goals>;
    return {
      questionsPerDay:
        typeof parsed.questionsPerDay === "number" && parsed.questionsPerDay > 0
          ? parsed.questionsPerDay
          : DEFAULT_GOALS.questionsPerDay,
      minutesPerDay:
        typeof parsed.minutesPerDay === "number" && parsed.minutesPerDay > 0
          ? parsed.minutesPerDay
          : DEFAULT_GOALS.minutesPerDay,
    };
  } catch {
    return DEFAULT_GOALS;
  }
}

function GoalBar({
  label,
  used,
  total,
  unit,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
}) {
  const percent = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const done = used >= total;
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">
          {used}/{total} {unit}
          {done && <span className="ml-1 text-emerald-500">✓</span>}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${done ? "bg-emerald-500" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function StudyGoals({ planTier }: { planTier?: string }) {
  const [goals, setGoals] = React.useState<Goals>(DEFAULT_GOALS);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState<Goals>(DEFAULT_GOALS);
  const [today, setToday] = React.useState({ questions: 0, minutes: 0 });

  React.useEffect(() => {
    const loaded = loadGoals();
    setGoals(loaded);
    setDraft(loaded);

    const responses = MockService.getUserResponses();
    const todayStr = new Date().toISOString().split("T")[0];
    const todayResponses = responses.filter((r) => r.createdAt?.split("T")[0] === todayStr);
    const seconds = todayResponses.reduce((acc, r) => acc + (r.timeSpent || 0), 0);
    setToday({ questions: todayResponses.length, minutes: Math.floor(seconds / 60) });
  }, []);

  const save = () => {
    const next: Goals = {
      questionsPerDay: Math.max(1, Math.floor(draft.questionsPerDay) || DEFAULT_GOALS.questionsPerDay),
      minutesPerDay: Math.max(5, Math.floor(draft.minutesPerDay) || DEFAULT_GOALS.minutesPerDay),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setGoals(next);
    setEditing(false);
    toast.success("Metas atualizadas!");
  };

  const planLabel =
    planTier === "premium"
      ? "Premium"
      : planTier === "plus"
        ? "Plus"
        : planTier === "essential"
          ? "Essencial"
          : "Gratuito";

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.35fr_1fr]">
      <Card className="command-panel">
        <CardHeader className="pb-3">
          <div className="section-title">
            <div>
              <h2 className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Metas de hoje
              </h2>
              <p>Defina seu ritmo diário e acompanhe o progresso</p>
            </div>
            {editing ? (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={save} aria-label="Salvar metas">
                  <Check className="h-4 w-4 text-emerald-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDraft(goals);
                    setEditing(false);
                  }}
                  aria-label="Cancelar edição"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setDraft(goals);
                  setEditing(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editing ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Questões por dia</span>
                <Input
                  type="number"
                  min={1}
                  value={draft.questionsPerDay}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, questionsPerDay: Number(e.target.value) }))
                  }
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Minutos de estudo por dia</span>
                <Input
                  type="number"
                  min={5}
                  step={5}
                  value={draft.minutesPerDay}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, minutesPerDay: Number(e.target.value) }))
                  }
                />
              </label>
            </div>
          ) : (
            <>
              <GoalBar
                label="Questões resolvidas"
                used={today.questions}
                total={goals.questionsPerDay}
                unit="questões"
              />
              <GoalBar
                label="Tempo de estudo"
                used={today.minutes}
                total={goals.minutesPerDay}
                unit="min"
              />
            </>
          )}
        </CardContent>
      </Card>

      <Card className="command-panel no-print">
        <CardHeader className="pb-3">
          <div className="section-title">
            <div>
              <h2 className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" /> Seu plano
              </h2>
              <p>Plano atual e acesso direto às provas</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">Plano ativo</p>
              <p className="font-display text-lg font-bold">{planLabel}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/subscriptions">
                {planTier === "free" || !planTier ? "Ver planos" : "Gerenciar"}
              </Link>
            </Button>
          </div>
          <Button className="hero-btn-primary w-full gap-2" asChild>
            <Link to="/dashboard/student-exams">
              <FileText className="h-4 w-4" /> Acessar minhas provas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link to="/dashboard/mock-exams">
              <Target className="h-4 w-4" /> Fazer um simulado
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
