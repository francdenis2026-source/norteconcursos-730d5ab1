import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Send, Undo2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import type { StudyEnrichment } from "@/lib/studyEnrichment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EnrichmentRow = StudyEnrichment & {
  id: string;
  version: string;
  status: "under_review" | "active" | "archived";
};

const STATUS_LABEL: Record<EnrichmentRow["status"], string> = {
  under_review: "Em revisão",
  active: "Publicado",
  archived: "Arquivado",
};

const STATUS_TONE: Record<EnrichmentRow["status"], string> = {
  under_review: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  archived: "border-border bg-muted text-muted-foreground",
};

export function EnrichmentAdmin() {
  const queryClient = useQueryClient();
  const { user } = useAuthStatus();
  const [preview, setPreview] = useState<EnrichmentRow | null>(null);
  const [filter, setFilter] = useState<"all" | EnrichmentRow["status"]>("all");

  const {
    data: rows,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["study-material-enrichments", "admin"],
    queryFn: async (): Promise<EnrichmentRow[]> => {
      const { data, error } = await supabase
        .from("study_material_enrichments")
        .select("id,material_slug,version,checked_at,content,sources,status")
        .order("material_slug")
        .order("checked_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as EnrichmentRow[];
    },
  });

  const { data: materials } = useQuery({
    queryKey: ["study-materials", "admin", "titles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("study_materials").select("slug,title");
      if (error) throw error;
      return new Map((data ?? []).map((m) => [m.slug as string, m.title as string]));
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["study-material-enrichments"] });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EnrichmentRow["status"] }) => {
      if (status === "active" && !user?.id)
        throw new Error("Sessão de administrador não encontrada.");
      const { error } = await supabase
        .from("study_material_enrichments")
        .update(
          status === "active"
            ? { status, reviewed_by: user?.id, reviewed_at: new Date().toISOString() }
            : { status, reviewed_by: null, reviewed_at: null },
        )
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_void, variables) => {
      toast.success(
        variables.status === "active" ? "Exemplo publicado para os alunos." : "Status atualizado.",
      );
      void refresh();
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : "Não foi possível atualizar."),
  });

  const items = (rows ?? []).filter((item) => filter === "all" || item.status === filter);
  const counts = (rows ?? []).reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold">Exemplos e ilustrações</h3>
        <p className="text-sm text-muted-foreground">
          Casos trabalhados e diagramas vinculados a cada material. O aluno só vê o que estiver{" "}
          <strong>Publicado</strong> — e só quando o material correspondente também estiver ativo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
        {(["all", "under_review", "active", "archived"] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "Todos" : STATUS_LABEL[status]}{" "}
            <span className="ml-1 tabular-nums opacity-70">
              {status === "all" ? (rows?.length ?? 0) : (counts[status] ?? 0)}
            </span>
          </Button>
        ))}
      </div>

      {isPending ? (
        <div className="space-y-2">
          {[0, 1, 2].map((n) => (
            <Skeleton key={n} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="surface-card p-6 text-sm text-muted-foreground">
          Não foi possível carregar. Se a política de admin ainda não existe, aplique as migrações
          da pasta <code>supabase/migrations</code>.
        </div>
      ) : items.length === 0 ? (
        <div className="surface-card p-6 text-sm text-muted-foreground">
          Nenhum exemplo neste filtro.
        </div>
      ) : (
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item.id} className="task-row">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {materials?.get(item.material_slug) ?? item.material_slug}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.content.cases.length} caso(s) · {item.content.illustrations.length}{" "}
                  ilustração(ões) · versão {item.version}
                </p>
              </div>
              <Badge variant="outline" className={STATUS_TONE[item.status]}>
                {STATUS_LABEL[item.status]}
              </Badge>
              <div className="flex shrink-0 gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setPreview(item)}
                >
                  <Eye className="h-3.5 w-3.5" /> Ver
                </Button>
                {item.status === "active" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Voltar para revisão"
                    title="Voltar para revisão"
                    onClick={() => setStatus.mutate({ id: item.id, status: "under_review" })}
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    disabled={setStatus.isPending}
                    onClick={() => setStatus.mutate({ id: item.id, status: "active" })}
                  >
                    <Send className="h-3.5 w-3.5" /> Publicar
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          {preview && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {materials?.get(preview.material_slug) ?? preview.material_slug}
                </DialogTitle>
                <DialogDescription>Prévia do conteúdo salvo nesta versão.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                {preview.content.illustrations.map((ill, i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      Ilustração · {ill.kind}
                    </p>
                    <p className="font-semibold">{ill.title}</p>
                    <p className="text-muted-foreground">{ill.caption}</p>
                  </div>
                ))}
                {preview.content.cases.map((c) => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Caso</p>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-muted-foreground">{c.scenario}</p>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setPreview(null)}>
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
