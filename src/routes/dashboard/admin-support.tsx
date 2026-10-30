import { platformDate } from "@/lib/platformClock";
import { acreDate } from "@/lib/acreTime";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { toast } from "sonner";
import { Headset, Inbox, Loader2 } from "lucide-react";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      .update({ status, updated_at: platformDate().toISOString() })
      .eq("id", id);
    if (error) toast.error("Não foi possível atualizar.");
    else await client.invalidateQueries({ queryKey: ["admin-support"] });
  }
  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  const open = data?.filter((t) => t.status === "open").length ?? 0;
  const inProgress = data?.filter((t) => t.status === "in_progress").length ?? 0;
  const resolved = data?.filter((t) => t.status === "resolved").length ?? 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração · suporte"
        icon={Headset}
        title={
          <>
            Central de <em>atendimento</em>
          </>
        }
        description="Últimos 100 pedidos enviados pelo suporte. Faça o retorno ao contato indicado e mantenha o andamento atualizado."
      >
        <div className="page-hero__stats">
          <HeroStat icon={Inbox} label="Recebidos" value={open} />
          <HeroStat icon={Headset} label="Em atendimento" value={inProgress} />
          <HeroStat icon={Headset} label="Resolvidos" value={resolved} />
        </div>
      </PageHero>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      )}
      {isError && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar os pedidos.
        </p>
      )}
      {data?.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">Nenhum pedido recebido.</p>
      )}
      <div className="space-y-3">
        {data?.map((t) => (
          <Card key={t.id}>
            <CardContent className="space-y-3 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{t.topic}</h2>
                  <p className="text-xs text-muted-foreground">
                    {t.reply_email} ·{" "}
                    {acreDate(t.created_at).toLocaleString("pt-BR", { timeZone: "America/Rio_Branco" })}
                  </p>
                </div>
                <Badge
                  variant={
                    t.status === "resolved"
                      ? "secondary"
                      : t.status === "in_progress"
                        ? "default"
                        : "outline"
                  }
                >
                  {t.status === "open"
                    ? "Recebido"
                    : t.status === "in_progress"
                      ? "Em atendimento"
                      : "Resolvido"}
                </Badge>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm">{t.description}</p>
              <p className="text-[10px] text-muted-foreground break-all">Protocolo: {t.id}</p>
              <label className="flex items-center gap-2 text-sm font-medium">
                Andamento
                <select
                  value={t.status}
                  onChange={(e) => void update(t.id, e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"
                >
                  <option value="open">Recebido</option>
                  <option value="in_progress">Em atendimento</option>
                  <option value="resolved">Resolvido</option>
                </select>
              </label>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
