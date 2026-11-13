import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Contagem pública de usuários cadastrados + o instante do último cadastro, para a
 * homepage (sem login) mostrar um selo ao vivo com uma animação discreta a cada
 * novo cadastro. A contagem vem de get_public_user_count() (só o número, sem
 * nenhum dado pessoal); o "pulso" vem da tabela public.signup_pulses, que só
 * guarda (id, created_at) por cadastro — ver a migração 20261113270000.
 */
export function usePlatformSignupPulse(enabled = true) {
  const { data, isLoading } = useQuery({
    queryKey: ["public-signup-count"],
    enabled,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_user_count");
      if (error) throw error;
      return typeof data === "number" ? data : Number(data ?? 0);
    },
  });

  const [count, setCount] = useState<number | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const seenInitial = useRef(false);

  useEffect(() => {
    if (typeof data === "number" && !seenInitial.current) {
      setCount(data);
      seenInitial.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (!enabled) return;
    const channel = supabase
      .channel("signup-pulse-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "signup_pulses" },
        () => {
          setCount((prev) => (prev === null ? prev : prev + 1));
          setPulseKey((key) => key + 1);
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled]);

  return {
    count: count ?? (typeof data === "number" ? data : null),
    isLoading: isLoading && count === null,
    /** Muda a cada novo cadastro; o componente usa isso para disparar a animação. */
    pulseKey,
  };
}
