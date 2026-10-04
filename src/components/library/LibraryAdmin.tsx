import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Pencil, Plus, Send, Undo2, Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { isOfficialUrl } from "@/lib/questionFormat";
import {
  slugify,
  STATUS_LABEL,
  type StudyMaterial,
  type StudyMaterialSource,
  type StudyMaterialStatus,
} from "@/lib/studyMaterials";
import { Markdown } from "@/components/library/Markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Draft = {
  id: string | null;
  slug: string;
  discipline: string;
  topic_label: string;
  sort_order: string;
  title: string;
  summary: string;
  body_md: string;
  contest_name: string;
  syllabus_topic_order: string;
  source_note: string;
  sources: string;
  law_version_checked_at: string;
  content_status: StudyMaterialStatus;
};

const EMPTY: Draft = {
  id: null,
  slug: "",
  discipline: "",
  topic_label: "",
  sort_order: "0",
  title: "",
  summary: "",
  body_md: "",
  contest_name: "",
  syllabus_topic_order: "",
  source_note: "",
  sources: "",
  law_version_checked_at: "",
  content_status: "under_review",
};

const toDraft = (m: StudyMaterial): Draft => ({
  id: m.id,
  slug: m.slug,
  discipline: m.discipline,
  topic_label: m.topic_label,
  sort_order: String(m.sort_order),
  title: m.title,
  summary: m.summary ?? "",
  body_md: m.body_md,
  contest_name: m.contest_name ?? "",
  syllabus_topic_order: m.syllabus_topic_order == null ? "" : String(m.syllabus_topic_order),
  source_note: m.source_note,
  sources: (m.legal_basis ?? []).map((s) => `${s.title ?? ""} | ${s.url ?? ""}`).join("\n"),
  law_version_checked_at: m.law_version_checked_at ? m.law_version_checked_at.slice(0, 10) : "",
  content_status: m.content_status,
});

const parseSources = (text: string): StudyMaterialSource[] =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, url] = line.split("|").map((part) => part.trim());
      return { title: title ?? "", ...(url ? { url } : {}) };
    });

const STATUS_TONE: Record<StudyMaterialStatus, string> = {
  under_review: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  obsolete: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  archived: "border-border bg-muted text-muted-foreground",
};

export function LibraryAdmin() {
  const queryClient = useQueryClient();
  const { user } = useAuthStatus();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [filter, setFilter] = useState<"all" | StudyMaterialStatus>("all");

  const { data, isPending, isError } = useQuery({
    queryKey: ["study-materials", "admin"],
    queryFn: async (): Promise<StudyMaterial[]> => {
      const { data, error } = await supabase
        .from("study_materials")
        .select("*")
        .order("discipline")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as StudyMaterial[];
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["study-materials"] });

  const save = useMutation({
    mutationFn: async ({ draft: d, status }: { draft: Draft; status: StudyMaterialStatus }) => {
      const sources = parseSources(d.sources);
      const slug = d.slug.trim() || slugify(d.title);
      if (!d.title.trim() || !d.discipline.trim() || !d.topic_label.trim() || !d.body_md.trim())
        throw new Error("Preencha título, matéria, assunto e conteúdo.");
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
        throw new Error("O endereço (slug) deve ter só letras minúsculas, números e hífens.");
      if (!d.source_note.trim()) throw new Error("Informe a origem do material.");

      const publishing = status === "active";
      if (publishing) {
        if (!user?.id) throw new Error("Sessão de administrador não encontrada.");
        const checked = d.law_version_checked_at ? Date.parse(d.law_version_checked_at) : NaN;
        if (!Number.isFinite(checked) || checked > Date.now())
          throw new Error(
            "Informe a data em que as fontes foram conferidas (não pode ser futura).",
          );
        if (sources.some((s) => s.url && !isOfficialUrl(s.url)))
          throw new Error(
            "Há fonte com link que não é de órgão oficial. Corrija antes de publicar.",
          );
      }

      const payload = {
        slug,
        discipline: d.discipline.trim(),
        topic_label: d.topic_label.trim(),
        sort_order: Number.parseInt(d.sort_order, 10) || 0,
        title: d.title.trim(),
        summary: d.summary.trim() || null,
        body_md: d.body_md,
        contest_name: d.contest_name.trim() || null,
        syllabus_topic_order: d.syllabus_topic_order
          ? Number.parseInt(d.syllabus_topic_order, 10)
          : null,
        source_note: d.source_note.trim(),
        legal_basis: sources,
        law_version_checked_at: d.law_version_checked_at
          ? new Date(`${d.law_version_checked_at}T12:00:00Z`).toISOString()
          : null,
        content_status: status,
        reviewed_by: publishing ? user?.id : null,
        reviewed_at: publishing ? new Date().toISOString() : null,
      };
      const query = d.id
        ? supabase.from("study_materials").update(payload).eq("id", d.id)
        : supabase.from("study_materials").insert(payload);
      const { error } = await query;
      if (error) throw error;
      return status;
    },
    onSuccess: (status) => {
      toast.success(status === "active" ? "Material publicado para os alunos." : "Material salvo.");
      setDraft(null);
      void refresh();
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar o material."),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: StudyMaterialStatus }) => {
      const { error } = await supabase
        .from("study_materials")
        .update({ content_status: status, reviewed_by: null, reviewed_at: null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status atualizado.");
      void refresh();
    },
    onError: () => toast.error("Não foi possível atualizar o status."),
  });

  const items = (data ?? []).filter((item) => filter === "all" || item.content_status === filter);
  const counts = (data ?? []).reduce<Record<string, number>>((acc, item) => {
    acc[item.content_status] = (acc[item.content_status] ?? 0) + 1;
    return acc;
  }, {});

  const update = (patch: Partial<Draft>) =>
    setDraft((current) => (current ? { ...current, ...patch } : current));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Biblioteca de estudo</h2>
          <p className="text-sm text-muted-foreground">
            Crie e revise os materiais. O aluno só vê o que estiver <strong>Publicado</strong>.
          </p>
        </div>
        <Button onClick={() => setDraft({ ...EMPTY })} className="gap-2">
          <Plus className="h-4 w-4" /> Novo material
        </Button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
        {(["all", "under_review", "active", "obsolete", "archived"] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "Todos" : STATUS_LABEL[status]}{" "}
            <span className="ml-1 tabular-nums opacity-70">
              {status === "all" ? (data?.length ?? 0) : (counts[status] ?? 0)}
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
          Não foi possível carregar. Se a tabela <code>study_materials</code> ainda não existe,
          aplique as migrações da pasta <code>supabase/migrations</code>.
        </div>
      ) : items.length === 0 ? (
        <div className="surface-card p-6 text-sm text-muted-foreground">
          Nenhum material neste filtro.
        </div>
      ) : (
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item.id} className="task-row">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.discipline} · {item.topic_label}
                </p>
              </div>
              <Badge variant="outline" className={STATUS_TONE[item.content_status]}>
                {STATUS_LABEL[item.content_status]}
              </Badge>
              <div className="flex shrink-0 gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setDraft(toDraft(item))}
                >
                  {item.content_status === "under_review" ? (
                    <>
                      <Eye className="h-3.5 w-3.5" /> Revisar
                    </>
                  ) : (
                    <>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </>
                  )}
                </Button>
                {item.content_status === "active" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Voltar para revisão"
                    title="Voltar para revisão"
                    onClick={() => setStatus.mutate({ id: item.id, status: "under_review" })}
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                )}
                {item.content_status !== "archived" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Arquivar"
                    title="Arquivar"
                    onClick={() => setStatus.mutate({ id: item.id, status: "archived" })}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          {draft && (
            <>
              <DialogHeader>
                <DialogTitle>{draft.id ? "Revisar material" : "Novo material"}</DialogTitle>
                <DialogDescription>
                  Para publicar, informe a data em que as fontes foram conferidas. O seu usuário
                  fica registrado como revisor.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="edit">
                <TabsList>
                  <TabsTrigger value="edit">Editar</TabsTrigger>
                  <TabsTrigger value="preview">Prévia</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-4 grid gap-4 md:grid-cols-2">
                  <Field label="Título" className="md:col-span-2">
                    <Input
                      value={draft.title}
                      onChange={(e) => update({ title: e.target.value })}
                    />
                  </Field>
                  <Field label="Matéria (igual ao edital)">
                    <Input
                      value={draft.discipline}
                      placeholder="Contabilidade Geral"
                      onChange={(e) => update({ discipline: e.target.value })}
                    />
                  </Field>
                  <Field label="Assunto">
                    <Input
                      value={draft.topic_label}
                      onChange={(e) => update({ topic_label: e.target.value })}
                    />
                  </Field>
                  <Field label="Concurso">
                    <Input
                      value={draft.contest_name}
                      placeholder="Polícia Federal"
                      onChange={(e) => update({ contest_name: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Ordem">
                      <Input
                        type="number"
                        value={draft.sort_order}
                        onChange={(e) => update({ sort_order: e.target.value })}
                      />
                    </Field>
                    <Field label="Tópico do edital (nº)">
                      <Input
                        type="number"
                        value={draft.syllabus_topic_order}
                        onChange={(e) => update({ syllabus_topic_order: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field label="Endereço (slug)" className="md:col-span-2">
                    <Input
                      value={draft.slug}
                      placeholder={slugify(draft.title) || "gerado a partir do título"}
                      disabled={!!draft.id}
                      onChange={(e) => update({ slug: e.target.value })}
                    />
                  </Field>
                  <Field label="Resumo (aparece no cartão)" className="md:col-span-2">
                    <Input
                      value={draft.summary}
                      onChange={(e) => update({ summary: e.target.value })}
                    />
                  </Field>
                  <Field label="Conteúdo (Markdown)" className="md:col-span-2">
                    <Textarea
                      rows={16}
                      className="font-mono text-xs"
                      value={draft.body_md}
                      onChange={(e) => update({ body_md: e.target.value })}
                    />
                  </Field>
                  <Field label="Origem do material" className="md:col-span-2">
                    <Textarea
                      rows={2}
                      value={draft.source_note}
                      onChange={(e) => update({ source_note: e.target.value })}
                    />
                  </Field>
                  <Field
                    label="Fontes oficiais (uma por linha: Título | link)"
                    className="md:col-span-2"
                  >
                    <Textarea
                      rows={3}
                      className="font-mono text-xs"
                      value={draft.sources}
                      onChange={(e) => update({ sources: e.target.value })}
                    />
                  </Field>
                  <Field label="Fontes conferidas em">
                    <DatePicker
                      value={draft.law_version_checked_at}
                      max={new Date().toISOString().slice(0, 10)}
                      onChange={(v) => update({ law_version_checked_at: v })}
                    />
                  </Field>
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="surface-card p-6">
                    <h3 className="font-display mb-4 text-2xl font-extrabold">
                      {draft.title || "Sem título"}
                    </h3>
                    <Markdown source={draft.body_md || "_Sem conteúdo ainda._"} />
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="gap-2 sm:justify-between">
                <Button variant="ghost" onClick={() => setDraft(null)}>
                  Cancelar
                </Button>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    disabled={save.isPending}
                    onClick={() => save.mutate({ draft, status: "under_review" })}
                  >
                    Salvar em revisão
                  </Button>
                  <Button
                    className="gap-2"
                    disabled={save.isPending}
                    onClick={() => save.mutate({ draft, status: "active" })}
                  >
                    <Send className="h-4 w-4" /> Publicar
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
