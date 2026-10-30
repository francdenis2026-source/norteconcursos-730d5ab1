import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/** Acre (UTC−5): the training counter resets at the platform's local midnight. */
function acreDayStart() {
  const acreNow = new Date(Date.now() - 5 * 60 * 60 * 1000);
  const midnightUtc = Date.UTC(acreNow.getUTCFullYear(), acreNow.getUTCMonth(), acreNow.getUTCDate(), 5);
  return new Date(midnightUtc).toISOString();
}

const SUGGESTED_GOAL = 30;

export function QuestionHeaderProgress({ userId }: { userId: string | undefined }) {
  const stats = useQuery({
    queryKey: ["question-header-progress", userId, acreDayStart().slice(0, 10)],
    enabled: !!userId && userId !== "demo-user",
    staleTime: 15_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    retry: 1,
    queryFn: async () => {
      const since = acreDayStart();
      const query = () => supabase.from("question_training_responses")
        .select("id", { head: true, count: "exact" })
        .eq("user_id", userId!)
        .gte("created_at", since);
      const [all, correct] = await Promise.all([query(), query().eq("is_correct", true)]);
      if (all.error) throw all.error;
      if (correct.error) throw correct.error;
      return { answered: all.count ?? 0, correct: correct.count ?? 0 };
    },
  });

  if (!userId || userId === "demo-user") return null;
  const answered = stats.data?.answered ?? 0;
  const accuracy = answered ? Math.round((100 * (stats.data?.correct ?? 0)) / answered) : 0;
  const percent = Math.min(100, Math.round((answered / SUGGESTED_GOAL) * 100));
  return (
    <Link
      to="/dashboard/errors"
      className="question-header-progress"
      aria-label={stats.isError ? "Indicadores indisponíveis. Abrir caderno de erros" : `Hoje: ${answered} questões respondidas, ${accuracy}% de acerto, ${percent}% da meta sugerida. Abrir caderno de erros`}
      title="Resumo do estudo de hoje. Meta sugerida de 30 questões; abrir caderno de erros"
    >
      <span className="question-header-progress__stat">
        <small>Hoje</small><strong>{stats.isError || stats.isPending ? "—" : answered}</strong>
      </span>
      <span className="question-header-progress__stat">
        <small>Acertos</small><strong>{stats.isError || stats.isPending ? "—" : `${accuracy}%`}</strong>
      </span>
      <span className="question-header-progress__goal">
        <small>Meta sugerida · {SUGGESTED_GOAL}</small>
        <span className="question-header-progress__track"><span style={{ width: `${stats.data ? percent : 0}%` }} /></span>
      </span>
    </Link>
  );
}
