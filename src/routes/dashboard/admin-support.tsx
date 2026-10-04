import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin-support")({
  component: AdminSupport,
  head: () => ({ meta: [{ title: "Atendimento | Norte Concursos" }] }),
});
type Ticket = {
  id: string;
  reply_email: string;
  topic: string;
  description: string;
  status: string;
  created_at: string;
};
function AdminSupport() {
  const { isAdmin } = useAuthStatus();
  const client = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-support"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_requests")
        .select("id,reply_email,topic,description,status,created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as Ticket[];
    },
  });
  async function update(id: string, status: string) {
    const { error } = await supabase
      .from("support_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast.error("Não foi possível atualizar.");
    else await client.invalidateQueries({ queryKey: ["admin-support"] });
  }
  if (!isAdmin) return <p>Acesso restrito ao administrador.</p>;
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Central de atendimento</h1>
      <p>
        Últimos 100 pedidos enviados pelo suporte. Faça o retorno ao contato indicado e mantenha o
        andamento atualizado.
      </p>
      {isLoading && <p role="status">Carregando pedidos…</p>}
      {isError && <p role="alert">Não foi possível carregar os pedidos.</p>}
      {data?.length === 0 && <p>Nenhum pedido recebido.</p>}
      {data?.map((t) => (
        <article key={t.id} className="command-panel p-6 space-y-3">
          <h2 className="font-bold">{t.topic}</h2>
          <p>
            {t.reply_email} · {new Date(t.created_at).toLocaleString("pt-BR")}
          </p>
          <p className="whitespace-pre-wrap break-words">{t.description}</p>
          <p className="text-xs break-all">Protocolo: {t.id}</p>
          <label>
            Andamento{" "}
            <select value={t.status} onChange={(e) => void update(t.id, e.target.value)}>
              <option value="open">Recebido</option>
              <option value="in_progress">Em atendimento</option>
              <option value="resolved">Resolvido</option>
            </select>
          </label>
        </article>
      ))}
    </section>
  );
}
