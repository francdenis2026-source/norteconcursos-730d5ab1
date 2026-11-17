import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { platformDate } from "@/lib/platformClock";
import { acreDateKey, acreMinuteOfDay } from "@/lib/acreTime";
import {
  buildWeek, canonicalDiscipline,
  type CronoConfig, type TopicProgress,
} from "@/lib/cronograma";
import { buildTodayTimeline, locateNow, type ScheduleStatus } from "@/lib/floatingSchedule";
import { validDashboardConfig, type DashboardPlan } from "@/lib/studentDashboard";

const settings = { staleTime: 30_000, refetchInterval: 120_000, retry: 1 } as const;

/** Mesma chave usada em /dashboard: o widget segue o plano que o aluno já escolheu lá. */
const planStorageKey = (userId: string) => `norte:dashboard-plan:${userId}`;

/**
 * Estado "agora" do cronograma por edital, para o widget flutuante: busca os mesmos
 * planos/progresso que a Área do aluno (mesmas chaves de query, cache compartilhado),
 * monta a linha do tempo de hoje e localiza o bloco atual a cada minuto.
 */
export function useFloatingSchedule(userId: string | undefined) {
  const [nowMin, setNowMin] = React.useState(() => acreMinuteOfDay(platformDate()));
  React.useEffect(() => {
    const tick = () => setNowMin(acreMinuteOfDay(platformDate()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const plansQuery = useQuery({
    queryKey: ["student-home", "plans", userId],
    ...settings,
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchAllRows((from, to) =>
        supabase
          .from("cronograma_plans")
          .select("id,name,config")
          .eq("user_id", userId!)
          .order("updated_at", { ascending: false })
          .order("id")
          .range(from, to),
      );
      return data as unknown as DashboardPlan[];
    },
  });

  const [selectedId, setSelectedId] = React.useState(() => {
    if (!userId) return "";
    try {
      return localStorage.getItem(planStorageKey(userId)) ?? "";
    } catch {
      return "";
    }
  });
  React.useEffect(() => {
    if (!userId) return;
    try {
      setSelectedId(localStorage.getItem(planStorageKey(userId)) ?? "");
    } catch {
      /* preferência opcional */
    }
  }, [userId]);

  const plan =
    plansQuery.data?.find((p) => p.id === selectedId) ?? plansQuery.data?.[0] ?? null;
  const planId = plan?.id;

  const progressQuery = useQuery({
    queryKey: ["student-home", "progress", userId, planId],
    ...settings,
    enabled: !!userId && !!planId,
    queryFn: async () => {
      const data = await fetchAllRows((from, to) =>
        supabase
          .from("cronograma_progress")
          .select("topic_id,video,pdf,podcast,qtde,acertos,rev_pdf,rev_questoes")
          .eq("user_id", userId!)
          .eq("plan_id", planId!)
          .order("topic_id")
          .range(from, to),
      );
      return Object.fromEntries(
        data.map((r) => [
          r.topic_id,
          {
            video: !!r.video, pdf: !!r.pdf, podcast: !!r.podcast,
            qtde: Math.max(0, r.qtde ?? 0), acertos: Math.max(0, r.acertos ?? 0),
            revPdf: !!r.rev_pdf, revQuestoes: !!r.rev_questoes,
          },
        ]),
      ) as Record<string, TopicProgress>;
    },
  });

  return React.useMemo(() => {
    const config = plan?.config;
    if (!plan || !validDashboardConfig(config) || !progressQuery.isSuccess) {
      return { ready: false as const, plan: null, status: null, nowMin } as const;
    }
    const cfg: CronoConfig = {
      ...config,
      discs: config.discs.map((d) => ({ ...d, nome: canonicalDiscipline(d.nome) })),
    };
    const today = acreDateKey(platformDate());
    const day = new Date(`${today}T12:00:00Z`).getUTCDay();
    const yesterday = (day + 6) % 7;
    const week = buildWeek(cfg, progressQuery.data);
    const timeline = buildTodayTimeline(week[day] ?? [], week[yesterday] ?? []);
    const status: ScheduleStatus = locateNow(timeline, nowMin);
    return { ready: true as const, plan: { id: plan.id, name: plan.name }, status, nowMin };
  }, [plan, progressQuery.isSuccess, progressQuery.data, nowMin]);
}
