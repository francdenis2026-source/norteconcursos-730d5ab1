import { fetchAllRows } from "@/lib/catalog";
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

export interface DifficultyStat {
  subject: string;
  topic: string;
  answered: number;
  correct: number;
  accuracy: number;
  avgSeconds: number;
  medianSeconds: number;
  difficultyScore: number;
}

export interface PerformanceOverview {
  trainer: {
    totalAnswered: number;
    totalCorrect: number;
    accuracy: number;
    avgSeconds: number;
    bySubject: SubjectAccuracy[];
  };
  difficulty: DifficultyStat[];
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
  responses: TrainingActivity[];
  attempts: SimulatorActivity[];
}

export interface TrainingActivity {
  id: string;
  question_id: string;
  question_source: string;
  subject: string;
  is_correct: boolean;
  response_seconds: number;
  selected_answer: string;
  official_answer: string;
  created_at: string;
}
export interface SimulatorActivity {
  id: string;
  title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  blank_answers: number;
  accuracy: number;
  duration_seconds: number;
  finished_at: string;
  contest_filter: string | null;
}

const MIN_ITEMS_FOR_SIGNAL = 5;

export function usePerformanceOverview(userId: string | undefined, enabled: boolean) {
  const [data, setData] = useState<PerformanceOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadedFor, setLoadedFor] = useState<string>();
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!enabled || !userId) {
      setData(null);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setData(null);
    setError(false);
    (async () => {
      try {
        const [responsesRes, attemptsRes, reviewsRes, streakRes, rankRes, difficultyRes] =
          await Promise.all([
            fetchAllRows<TrainingActivity>((from, to) =>
              supabase
                .from("question_training_responses")
                .select(
                  "id,question_id,question_source,subject,is_correct,response_seconds,selected_answer,official_answer,created_at",
                )
                .eq("user_id", userId)
                .order("created_at")
                .order("id")
                .range(from, to),
            ),
            fetchAllRows<SimulatorActivity>((from, to) =>
              supabase
                .from("simulator_attempts")
                .select(
                  "id,title,total_questions,correct_answers,wrong_answers,blank_answers,accuracy,duration_seconds,finished_at,contest_filter",
                )
                .eq("user_id", userId)
                .order("finished_at", { ascending: false })
                .order("id")
                .range(from, to),
            ),
            fetchAllRows<{ status: string }>((from, to) =>
              supabase
                .from("question_error_reviews")
                .select("status")
                .eq("user_id", userId)
                .order("question_id")
                .order("question_source")
                .range(from, to),
            ),
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
            supabase.rpc("my_difficulty_analysis"),
          ]);
        if (!active) return;

        for (const result of [streakRes, rankRes, difficultyRes])
          if (result.error) throw result.error;
        const seen = new Set<string>();
        const responses = responsesRes.filter((r) => {
          const key = JSON.stringify([r.question_source, r.question_id]);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
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
          // Respostas antigas, gravadas quando o cronômetro contava também o tempo parado, podem ter valores
          // absurdos; limitar a 15 minutos evita distorcer a média de tempo por questão.
          const secs = Math.max(0, Math.min(r.response_seconds ?? 0, 900));
          entry.seconds += secs;
          totalSeconds += secs;
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

        const attempts = attemptsRes;
        const reviews = reviewsRes as { status: "pendente" | "revisado" | "dominado" }[];
        const errors = {
          pendente: reviews.filter((r) => r.status === "pendente").length,
          revisado: reviews.filter((r) => r.status === "revisado").length,
          dominado: reviews.filter((r) => r.status === "dominado").length,
          total: reviews.length,
        };

        if (!active) return;
        setData({
          trainer: {
            totalAnswered: responses.length,
            totalCorrect,
            accuracy: responses.length ? Math.round((totalCorrect / responses.length) * 100) : 0,
            avgSeconds: responses.length ? Math.round(totalSeconds / responses.length) : 0,
            bySubject,
          },
          difficulty: (
            (difficultyRes.data ?? []) as {
              subject: string;
              topic: string;
              answered: number;
              correct: number;
              accuracy: number;
              avg_seconds: number;
              median_seconds: number;
              difficulty_score: number;
            }[]
          ).map((row) => ({
            subject: row.subject,
            topic: row.topic,
            answered: row.answered,
            correct: row.correct,
            accuracy: row.accuracy,
            avgSeconds: row.avg_seconds,
            medianSeconds: row.median_seconds,
            difficultyScore: row.difficulty_score,
          })),
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
          responses: responsesRes,
          attempts,
        });
      } catch (cause) {
        if (active) {
          setData(null);
          setError(true);
        }
      } finally {
        if (active) {
          setLoadedFor(userId);
          setLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [userId, enabled, revision]);

  return {
    data: loadedFor === userId ? data : null,
    loading: loading || (enabled && loadedFor !== userId),
    error: loadedFor === userId && error,
    retry: () => setRevision((n) => n + 1),
  };
}

export { MIN_ITEMS_FOR_SIGNAL };
