import { fetchAllRows } from "@/lib/catalog";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, CalendarClock, Clock, Hourglass, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";
import { acreDateKey } from "@/lib/acreTime";
import { cn } from "@/lib/utils";
import { fmtHuman, getStudyToday, subscribeStudyClock } from "@/lib/studyClock";

const DAYS = 14;

/** Tempo na plataforma: hoje, últimos dias, média e total, a partir das sessões registradas. */
export function StudyTimeCard({ userId }: { userId: string }) {
  const [rows, setRows] = useState<{ study_date: string; active_seconds: number }[] | null>(null);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const live = useSyncExternalStore(subscribeStudyClock, getStudyToday, () => 0);

  useEffect(() => {
    let active = true;
    setRows(null);
    setError(false);
    const load = () =>
      void fetchAllRows<{ study_date: string; active_seconds: number }>((from, to) =>
        supabase
          .from("study_sessions")
          .select("study_date, active_seconds")
          .eq("user_id", userId)
          .order("id")
          .range(from, to),
      )
        .then((data) => {
          if (active) {
            setRows(data);
            setError(false);
          }
        })
        .catch(() => {
          if (active) setError(true);
        });
    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [userId, revision]);

  const stats = useMemo(() => {
    const today = acreDateKey();
    const byDay = new Map<string, number>();
    for (const r of rows ?? [])
      byDay.set(r.study_date, (byDay.get(r.study_date) ?? 0) + r.active_seconds);
    byDay.set(today, Math.max(byDay.get(today) ?? 0, live)); // o relógio ao vivo já inclui o de hoje
    const days = Array.from({ length: DAYS }, (_, i) => {
      const d = new Date(`${today}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() - (DAYS - 1 - i));
      const k = d.toISOString().slice(0, 10);
      return { k, label: `${k.slice(8, 10)}/${k.slice(5, 7)}`, s: byDay.get(k) ?? 0 };
    });
    const total = [...byDay.values()].reduce((a, b) => a + b, 0);
    const active = [...byDay.values()].filter((v) => v >= 60).length;
    return {
      days,
      total,
      avg: active ? Math.round(total / active) : 0,
      active,
      max: Math.max(1, ...days.map((d) => d.s)),
      today: byDay.get(today) ?? 0,
      todayKey: today,
    };
  }, [rows, live]);

  if (error)
    return (
      <Card id="tempo">
        <CardHeader>
          <CardTitle>Tempo na plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <p role="alert">Não foi possível conferir o tempo registrado.</p>
          <button
            type="button"
            className="mt-3 min-h-11 rounded-lg border px-4"
            onClick={() => setRevision((n) => n + 1)}
          >
            Tentar novamente
          </button>
        </CardContent>
      </Card>
    );
  if (!rows)
    return (
      <Card id="tempo">
        <CardContent className="p-6" role="status">
          Carregando tempo ativo de estudo…
        </CardContent>
      </Card>
    );
  return (
    <Card id="tempo">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" aria-hidden /> Tempo na plataforma
        </CardTitle>
        <CardDescription>
          Soma o tempo ativo de todas as suas sessões, inclusive ao sair e entrar novamente. Pausas
          por inatividade e abas ocultas não contam. Dias contados pelo horário do Acre.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              { icon: CalendarClock, label: "Hoje", value: fmtHuman(stats.today) },
              { icon: TrendingUp, label: "Média por dia de estudo", value: fmtHuman(stats.avg) },
              { icon: CalendarCheck, label: "Dias com estudo", value: String(stats.active) },
              { icon: Hourglass, label: "Total registrado", value: fmtHuman(stats.total) },
            ] as const
          ).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/20 p-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Últimos 14 dias</span>
            {stats.avg > 0 && <span>Média diária: {fmtHuman(stats.avg)}</span>}
          </div>
          <div className="relative flex h-32 items-end gap-1.5">
            {stats.avg > 0 && (
              <div
                className="pointer-events-none absolute inset-x-0 border-t border-dashed border-sky-500/40"
                style={{ bottom: `${(stats.avg / stats.max) * 100}%` }}
              />
            )}
            {stats.days.map((d) => {
              const isToday = d.k === stats.todayKey;
              return (
                <Hint key={d.k} content={`${d.label}: ${fmtHuman(d.s)}${isToday ? " · hoje" : ""} — ver atividades`}>
                  <Link
                    to="/dashboard/history"
                    search={{ day: d.k }}
                    aria-label={`Ver atividades de ${d.label}${isToday ? " (hoje)" : ""}: ${fmtHuman(d.s)}`}
                    className="flex h-full min-w-0 flex-1 flex-col items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={cn(
                          "w-full rounded-t-md transition-colors",
                          d.s ? (isToday ? "bg-sky-500" : "bg-sky-500/65 hover:bg-sky-500/85") : "bg-muted hover:bg-sky-500/30",
                        )}
                        style={{ height: `${Math.max(d.s ? 6 : 3, (d.s / stats.max) * 100)}%` }}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs text-muted-foreground",
                        isToday && "font-bold text-sky-600 dark:text-sky-400",
                      )}
                    >
                      {d.label.slice(0, 2)}
                    </span>
                  </Link>
                </Hint>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
