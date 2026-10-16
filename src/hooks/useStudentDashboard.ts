import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows, isMissingQuestionTable } from "@/lib/catalog";
import { MockService } from "@/services/mockService";
import {
  recentReading,
  type TrainingRecord,
  type ReinforcementRecord,
  type ActivityRecord,
  type DashboardPlan,
} from "@/lib/studentDashboard";
import type { TopicProgress } from "@/lib/cronograma";

const settings = { staleTime: 15_000, refetchInterval: 60_000, retry: 1 } as const;
export function useStudentDashboard(userId: string, planId?: string) {
  const training = useQuery({
    queryKey: ["student-home", "training", userId],
    ...settings,
    queryFn: () =>
      fetchAllRows<TrainingRecord>((from, to) =>
        supabase
          .from("question_training_responses")
          .select("id,question_id,question_source,subject,is_correct,created_at")
          .eq("user_id", userId)
          .order("created_at")
          .order("id")
          .range(from, to),
      ),
  });
  const reinforcement = useQuery({
    queryKey: ["student-home", "reinforcement", userId],
    ...settings,
    queryFn: () =>
      fetchAllRows<ReinforcementRecord>((from, to) =>
        supabase
          .from("question_reinforcement_attempts")
          .select("id,question_id,question_source,is_correct,created_at")
          .eq("user_id", userId)
          .order("created_at")
          .order("id")
          .range(from, to),
      ).catch((error) => {
        if (isMissingQuestionTable(error)) return null;
        throw error;
      }),
  });
  const activity = useQuery({
    queryKey: ["student-home", "activity", userId],
    ...settings,
    queryFn: () =>
      fetchAllRows<ActivityRecord>((from, to) =>
        supabase
          .from("study_sessions")
          .select("study_date,active_seconds")
          .eq("user_id", userId)
          .order("id")
          .range(from, to),
      ),
  });
  const objective = useQuery({
    queryKey: ["student-home", "objective", userId],
    ...settings,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("focused_contest_id")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data?.focused_contest_id
        ? ((await MockService.getContestById(data.focused_contest_id)) ?? null)
        : null;
    },
  });
  const plans = useQuery({
    queryKey: ["student-home", "plans", userId],
    ...settings,
    queryFn: async () => {
      const data = await fetchAllRows((from, to) =>
        supabase
          .from("cronograma_plans")
          .select("id,name,config")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .order("id")
          .range(from, to),
      );
      return data as unknown as DashboardPlan[];
    },
  });
  const progress = useQuery({
    queryKey: ["student-home", "progress", userId, planId],
    enabled: !!planId,
    ...settings,
    queryFn: async () => {
      const data = await fetchAllRows((from, to) =>
        supabase
          .from("cronograma_progress")
          .select("topic_id,video,pdf,podcast,qtde,acertos,rev_pdf,rev_questoes")
          .eq("user_id", userId)
          .eq("plan_id", planId!)
          .order("topic_id")
          .range(from, to),
      );
      return Object.fromEntries(
        data.map((r) => [
          r.topic_id,
          {
            video: !!r.video,
            pdf: !!r.pdf,
            podcast: !!r.podcast,
            qtde: Math.max(0, r.qtde ?? 0),
            acertos: Math.max(0, r.acertos ?? 0),
            revPdf: !!r.rev_pdf,
            revQuestoes: !!r.rev_questoes,
          },
        ]),
      ) as Record<string, TopicProgress>;
    },
  });
  const strategy = useQuery({
    queryKey: ["student-home", "strategy", userId],
    ...settings,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_profiles")
        .select("id,name")
        .eq("user_id", userId)
        .limit(1);
      if (error) throw error;
      return data?.[0] ?? null;
    },
  });
  const reading = useQuery({
    queryKey: ["student-home", "reading", userId],
    ...settings,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_course_progress")
        .select("unit_id,read_at")
        .eq("user_id", userId)
        .not("read_at", "is", null)
        .order("read_at", { ascending: false })
        .order("unit_id")
        .limit(20);
      if (error) throw error;
      if (!data?.length) return null;
      const unitRes = await supabase
        .from("legal_course_units")
        .select("id,course_id,unit_key,label,content_status")
        .in(
          "id",
          data.map((p) => p.unit_id),
        );
      if (unitRes.error) throw unitRes.error;
      const units = unitRes.data ?? [];
      if (!units.length) return null;
      const courseRes = await supabase
        .from("legal_courses")
        .select("id,slug,title,status,syllabus_topic_id")
        .in("id", [...new Set(units.map((u) => u.course_id))]);
      if (courseRes.error) throw courseRes.error;
      return recentReading(data, units, courseRes.data ?? []);
    },
  });
  return { training, reinforcement, activity, objective, plans, progress, strategy, reading };
}
