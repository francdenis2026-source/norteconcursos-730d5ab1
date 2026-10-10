import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { acreDateKey } from "@/lib/acreTime";
import { fmtHuman, getStudyToday, subscribeStudyClock } from "@/lib/studyClock";

const DAYS = 14;

/** Tempo na plataforma: hoje, últimos dias, média e total, a partir das sessões registradas. */
export function StudyTimeCard({ userId }: { userId: string }) {
  const [rows, setRows] = useState<{ study_date: string; active_seconds: number }[] | null>(null);
  const live = useSyncExternalStore(subscribeStudyClock, getStudyToday, () => 0);

  useEffect(() => {
    void supabase
      .from("study_sessions")
      .select("study_date, active_seconds")
      .eq("user_id", userId)
      .order("study_date", { ascending: false })
      .limit(2000)
      .then(({ data }) => setRows(data ?? []));
  }, [userId]);

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
    };
  }, [rows, live]);

  return (
    <Card id="tempo">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" aria-hidden /> Tempo na plataforma
        </CardTitle>
        <CardDescription>
          Soma o tempo com a plataforma aberta e visível, mesmo ao trocar de seção. Dias contados
          pelo horário do Acre.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Hoje", fmtHuman(stats.today)],
            ["Média por dia de estudo", fmtHuman(stats.avg)],
            ["Dias com estudo", String(stats.active)],
            ["Total registrado", fmtHuman(stats.total)],
          ].map(([l, v]) => (
            <div key={l} className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">{l}</p>
              <p className="text-lg font-semibold text-foreground">{v}</p>
            </div>
          ))}
        </div>
        <div
          className="flex h-32 items-end gap-1.5"
          role="img"
          aria-label="Tempo por dia nos últimos 14 dias"
        >
          {stats.days.map((d) => (
            <div
              key={d.k}
              className="flex min-w-0 flex-1 flex-col items-center gap-1"
              title={`${d.label}: ${fmtHuman(d.s)}`}
            >
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t bg-primary/80"
                  style={{
                    height: `${Math.max(d.s ? 6 : 2, (d.s / stats.max) * 100)}%`,
                    opacity: d.s ? 1 : 0.25,
                  }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.label.slice(0, 2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
