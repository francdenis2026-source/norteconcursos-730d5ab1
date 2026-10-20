// Últimas provas e simulados dentro de Desempenho: nota, aproveitamento e ranking, separados.
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { fetchAttemptHistory } from "@/lib/attemptHistory";
import { useAuthStatus } from "@/hooks/useDashboard";
import { AttemptHistoryList } from "@/components/dashboard/AttemptHistoryList";

export function RecentAttempts({ limit = 5 }: { limit?: number }) {
  const { user } = useAuthStatus();
  const userId = user && user.id !== "demo-user" ? user.id : undefined;
  const attempts = useQuery({
    queryKey: ["recent-attempts", userId, limit],
    enabled: !!userId,
    staleTime: 30_000,
    retry: 1,
    queryFn: () => fetchAttemptHistory(userId!, limit),
  });
  if (!userId) return null;
  return (
    <section aria-labelledby="recent-attempts-title" className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="recent-attempts-title" className="text-lg font-semibold">
            Provas e simulados recentes
          </h2>
          <p className="text-xs text-muted-foreground">
            Nota pela regra de correção, aproveitamento e pontos de ranking são medidas diferentes.
            Questões já respondidas antes não geram novos pontos de ranking, mas contam na nota da
            tentativa.
          </p>
        </div>
        <Link className="text-sm font-semibold underline" to="/dashboard/history">
          Ver histórico completo
        </Link>
      </div>
      {attempts.isPending ? (
        <p role="status" className="text-sm text-muted-foreground">
          Carregando tentativas…
        </p>
      ) : attempts.isError ? (
        <p role="status" className="text-sm text-muted-foreground">
          Não foi possível carregar as tentativas agora.
        </p>
      ) : attempts.data.length ? (
        <AttemptHistoryList items={attempts.data} />
      ) : (
        <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
          Finalize uma prova ou simulado para ver o resultado de cada tentativa aqui.
        </p>
      )}
    </section>
  );
}
