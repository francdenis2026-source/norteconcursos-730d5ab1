import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { parseStudyPresence, freshStudyPresence, studyPresenceLabel } from "@/lib/studyPresence";

/** Only an aggregate from recent study heartbeats is public. No individual sessions are fetched. */
export function StudyPresence() {
  const [now, setNow] = useState(() => performance.now());
  useEffect(() => {
    const refreshAge = () => setNow(performance.now());
    const interval = window.setInterval(refreshAge, 15_000);
    document.addEventListener("visibilitychange", refreshAge);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshAge);
    };
  }, []);
  const query = useQuery({
    queryKey: ["public-study-presence"],
    staleTime: 20_000,
    retry: 0,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("get_public_study_presence")
        .abortSignal(AbortSignal.timeout(8000));
      if (error) throw error;
      const presence = parseStudyPresence(data);
      if (!presence) throw new Error("Contagem de atividade indisponível");
      const receivedAt = performance.now();
      setNow(receivedAt);
      return { presence, receivedAt };
    },
  });
  const data = !query.isError ? freshStudyPresence(query.data, now) : null;
  const count = data?.studying_now ?? 0;
  const formatted = new Intl.NumberFormat("pt-BR", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
  return (
    <span
      className="home-presence"
      data-available={!!data}
      data-active={count > 0}
      data-state={data ? "ready" : query.isPending ? "loading" : "unavailable"}
      role="status"
      aria-label={
        data
          ? studyPresenceLabel(count)
          : query.isPending
            ? "Consultando presença"
            : "Presença indisponível"
      }
      title={
        data
          ? `${studyPresenceLabel(count)}. Contas com atividade de estudo nos últimos 90 segundos. Atualização a cada 30 segundos.`
          : "Não foi possível obter uma contagem atual. A consulta será refeita automaticamente."
      }
    >
      <i className="home-presence__dot" aria-hidden="true" />
      <span aria-hidden="true">
        {data ? (
          <>
            <strong>{formatted}</strong>
            <span className="home-presence__full"> estudando agora</span>
            <span className="home-presence__short"> em estudo</span>
          </>
        ) : (
          <span>{query.isPending ? "Consultando presença" : "Presença indisponível"}</span>
        )}
      </span>
    </span>
  );
}
