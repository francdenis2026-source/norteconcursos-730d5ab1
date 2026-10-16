import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CancellationRecord } from "@/lib/cancellation";

/** Cancelamentos do aluno logado (o banco só devolve os dele; o administrador vê todos em outra tela). */
export function useMyCancellations(userId: string | undefined) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ["my-cancellations", userId],
    enabled: !!userId && userId !== "demo-user",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_cancellations")
        .select("*")
        .eq("user_id", userId!)
        .order("requested_at", { ascending: false });
      // Tabela ainda não criada (migração pendente): trata como "nenhum cancelamento".
      if (error) return [] as CancellationRecord[];
      return (data ?? []) as CancellationRecord[];
    },
  });
  return {
    ...query,
    list: query.data ?? [],
    refresh: () => client.invalidateQueries({ queryKey: ["my-cancellations", userId] }),
  };
}
