import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { canonicalSubject } from "@/lib/subjects";

export interface SubjectAccuracy {
  subject: string;
  correct: number;
  total: number;
  accuracy: number;
  avgSeconds: number;
}

export interface PerformanceOverview {
  trainer: {
    totalAnswered: number;
    totalCorrect: number;
    accuracy: number;
    avgSeconds: number;
    bySubject: SubjectAccuracy[];
  };
  simulators: {
    count: number;
    avgAccuracy: number;
    bestAccuracy: number;
    lastAccuracy: number | null;
    totalDurationSeconds: number;
  };
  errors: {
    pendente: number;
    revisado: number;
    dominado: number;
    total: number;
  };
  streak: {
    current: number;
    longest: number;
  };
  rank: {
    totalPoints: number;
    stars: number;
    levelName: string;
  } | null;
  cutoffGaps: CutoffGap[];
}

export interface CutoffGap {
  contestName: string;
  contestYear: string;
  cutoffScore: number;
  bestScore: number;
  gap: number;
  source: "prova enviada" | "simulado";
}

const MIN_ITEMS_FOR_SIGNAL = 3;

export function usePerformanceOverview(userId: string | undefined, enabled: boolean) {
  const [data, setData] = useState<PerformanceOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled || !userId) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    (async () => {
      const [responsesRes, attemptsRes, reviewsRes, streakRes, rankRes, examDocsRes] =
        await Promise.all([
          supabase
            .from("question_training_responses")
            .select("subject,is_correct,response_seconds")
            .eq("user_id", userId)
            .limit(5000),
          supabase
            .from("simulator_attempts")
            .select("accuracy,duration_seconds,finished_at,contest_filter")
            .eq("user_id", userId)
            .order("finished_at", { ascending: false })
            .limit(500),
          supabase.from("question_error_reviews").select("status").eq("user_id", userId),
          supabase
            .from("user_streaks")
            .select("current_streak,longest_streak")
            .eq("user_id", userId)
            .maybeSingle(),
          supabase
            .from("user_rank_profiles")
            .select("total_points,stars,level_name")
            .eq("user_id", userId)
            .maybeSingle(),
          supabase
            .from("student_exam_documents")
            .select("contest_name,contest_year,score_net,score_raw")
            .eq("user_id", userId),
        ]);
      if (!active) return;

      const responses = responsesRes.data ?? [];
      const bySubjectMap = new Map<string, { correct: number; total: number; seconds: number }>();
      let totalCorrect = 0;
      let totalSeconds = 0;
      for (const r of responses) {
        const key = canonicalSubject(r.subject);
        const entry = bySubjectMap.get(key) ?? { correct: 0, total: 0, seconds: 0 };
        entry.total += 1;
        if (r.is_correct) {
          entry.correct += 1;
          totalCorrect += 1;
        }
        entry.seconds += r.response_seconds ?? 0;
        totalSeconds += r.response_seconds ?? 0;
        bySubjectMap.set(key, entry);
      }
      const bySubject: SubjectAccuracy[] = Array.from(bySubjectMap.entries())
        .map(([subject, { correct, total, seconds }]) => ({
          subject,
          correct,
          total,
          accuracy: total ? Math.round((correct / total) * 100) : 0,
          avgSeconds: total ? Math.round(seconds / total) : 0,
        }))
        .sort((a, b) => a.accuracy - b.accuracy);

      const attempts = attemptsRes.data ?? [];
      const reviews = (reviewsRes.data ?? []) as { status: "pendente" | "revisado" | "dominado" }[];
      const errors = {
        pendente: reviews.filter((r) => r.status === "pendente").length,
        revisado: reviews.filter((r) => r.status === "revisado").length,
        dominado: reviews.filter((r) => r.status === "dominado").length,
        total: reviews.length,
      };

      const cutoffGaps: CutoffGap[] = [];
      const examDocs = examDocsRes.data ?? [];
      const bestExamScore = new Map<string, number>();
      for (const doc of examDocs) {
        if (!doc.contest_name || !doc.contest_year) continue;
        const key = `${doc.contest_name}__${doc.contest_year}`;
        const score = doc.score_net ?? doc.score_raw;
        if (score === null || score === undefined) continue;
        bestExamScore.set(key, Math.max(bestExamScore.get(key) ?? -Infinity, score));
      }
      if (bestExamScore.size > 0) {
        const { data: refRows } = await supabase
          .from("contest_reference_info")
          .select("contest_name,contest_year,cutoff_score")
          .not("cutoff_score", "is", null);
        for (const [key, bestScore] of bestExamScore) {
          const separatorIndex = key.indexOf("__");
          const contestName = key.slice(0, separatorIndex);
          const contestYear = key.slice(separatorIndex + 2);
          const ref = (refRows ?? []).find(
            (r) => r.contest_name === contestName && r.contest_year === contestYear,
          );
          if (ref?.cutoff_score == null) continue;
          cutoffGaps.push({
            contestName,
            contestYear,
            cutoffScore: ref.cutoff_score,
            bestScore,
            gap: bestScore - ref.cutoff_score,
            source: "prova enviada",
          });
        }
      }

      if (!active) return;
      setData({
        trainer: {
          totalAnswered: responses.length,
          totalCorrect,
          accuracy: responses.length ? Math.round((totalCorrect / responses.length) * 100) : 0,
          avgSeconds: responses.length ? Math.round(totalSeconds / responses.length) : 0,
          bySubject,
        },
        simulators: {
          count: attempts.length,
          avgAccuracy: attempts.length
            ? Math.round(attempts.reduce((s, a) => s + a.accuracy, 0) / attempts.length)
            : 0,
          bestAccuracy: attempts.length
            ? Math.round(Math.max(...attempts.map((a) => a.accuracy)))
            : 0,
          lastAccuracy: attempts.length ? Math.round(attempts[0]!.accuracy) : null,
          totalDurationSeconds: attempts.reduce((s, a) => s + (a.duration_seconds ?? 0), 0),
        },
        errors,
        streak: {
          current: streakRes.data?.current_streak ?? 0,
          longest: streakRes.data?.longest_streak ?? 0,
        },
        rank: rankRes.data
          ? {
              totalPoints: rankRes.data.total_points,
              stars: rankRes.data.stars,
              levelName: rankRes.data.level_name,
            }
          : null,
        cutoffGaps,
      });
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [userId, enabled]);

  return { data, loading };
}

export { MIN_ITEMS_FOR_SIGNAL };
