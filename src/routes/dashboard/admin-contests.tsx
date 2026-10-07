import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Search, Target, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { confirmDialog } from "@/lib/confirm";
import { fmtDateTime } from "@/lib/displayFormat";
import type { Career, ContestStatus } from "@/types";

export const Route = createFileRoute("/dashboard/admin-contests")({
  head: () => ({
    meta: [
      { title: "Concursos — curadoria (admin) | Norte Concurso" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminContestsPage,
});

interface ContestRow {
  id: string;
  name: string;
  agency: string | null;
  career: Career | null;
  role: string | null;
  exam_board: string | null;
  education_level: string | null;
  location: string | null;
  status: ContestStatus | null;
  vacancies: number | null;
  salary: number | null;
  exam_date: string | null;
  start_date: string | null;
  end_date: string | null;
  registration_url: string | null;
  official_edital_url: string | null;
  study_tips: string | null;
  source_url: string | null;
  content_status: "em_revisao" | "publicado";
  researched_at: string;
  updated_at: string;
}

const CAREERS: Career[] = [
  "Policial",
  "Administrativa",
  "Tribunal",
  "Fiscal",
  "Bancária",
  "Saúde",
  "Educação",
];
const STATUSES: ContestStatus[] = [
  "Previsto",
  "Autorizado",
  "Edital Publicado",
  "Inscrições Abertas",
  "Encerrado",
];

const emptyForm = {
  id: "",
  name: "",
  agency: "",
  career: "Policial" as Career,
  role: "",
  exam_board: "",
  education_level: "Superior",
  location: "",
  status: "Previsto" as ContestStatus,
  vacancies: "",
  salary: "",
  exam_date: "",
  start_date: "",
  end_date: "",
  registration_url: "",
  official_edital_url: "",
  study_tips: "",
  source_url: "",
};
type FormState = typeof emptyForm;

function AdminContestsPage() {
  const { isAdmin } = useAuthStatus();
  const [rows, setRows] = useState<ContestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [fetchUrl, setFetchUrl] = useState("");
  const [fetching, setFetching] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contests")
      .select("*")
      .order("content_status", { ascending: true })
      .order("updated_at", { ascending: false });
    if (error) toast.error("Não foi possível carregar os concursos.");
    setRows((data as ContestRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function editRow(r: ContestRow) {
    setForm({
      id: r.id,
      name: r.name,
      agency: r.agency ?? "",
      career: (r.career as Career) ?? "Policial",
      role: r.role ?? "",
      exam_board: r.exam_board ?? "",
      education_level: r.education_level ?? "Superior",
      location: r.location ?? "",
      status: (r.status as ContestStatus) ?? "Previsto",
      vacancies: r.vacancies != null ? String(r.vacancies) : "",
      salary: r.salary != null ? String(r.salary) : "",
      exam_date: r.exam_date ?? "",
      start_date: r.start_date ?? "",
      end_date: r.end_date ?? "",
      registration_url: r.registration_url ?? "",
      official_edital_url: r.official_edital_url ?? "",
      study_tips: r.study_tips ?? "",
      source_url: r.source_url ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchFromUrl() {
    const url = fetchUrl.trim();
    if (!url) {
      toast.error("Cole a URL do edital oficial.");
      return;
    }
    setFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-contest-edital", {
        body: { url },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const e = (data?.extracted ?? {}) as Record<string, unknown>;
      setForm((f) => ({
        ...f,
        name: e["name"] ? String(e["name"]) : f.name,
        agency: e["agency"] ? String(e["agency"]) : f.agency,
        role: e["role"] ? String(e["role"]) : f.role,
        exam_board: e["exam_board"] ? String(e["exam_board"]) : f.exam_board,
        education_level: e["education_level"] ? String(e["education_level"]) : f.education_level,
        location: e["location"] ? String(e["location"]) : f.location,
        status: (e["status"] as ContestStatus) ?? f.status,
        vacancies: e["vacancies"] != null ? String(e["vacancies"]) : f.vacancies,
        salary: e["salary"] != null ? String(e["salary"]) : f.salary,
        exam_date: e["exam_date"] ? String(e["exam_date"]) : f.exam_date,
        start_date: e["start_date"] ? String(e["start_date"]) : f.start_date,
        end_date: e["end_date"] ? String(e["end_date"]) : f.end_date,
        official_edital_url: url,
        source_url: url,
      }));
      const confidence = e["confidence"] ? String(e["confidence"]) : "baixa";
      toast.success(
        `Dados extraídos (confiança ${confidence}). Confira cada campo antes de salvar — nada foi publicado ainda.`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível buscar o edital.");
    } finally {
      setFetching(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.source_url.trim()) {
      toast.error("Informe ao menos o nome do concurso e a fonte (URL oficial).");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      agency: form.agency.trim() || null,
      career: form.career,
      role: form.role.trim() || null,
      exam_board: form.exam_board.trim() || null,
      education_level: form.education_level || null,
      location: form.location.trim() || null,
      status: form.status,
      vacancies: form.vacancies ? Number(form.vacancies) : null,
      salary: form.salary ? Number(form.salary) : null,
      exam_date: form.exam_date || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      registration_url: form.registration_url.trim() || null,
      official_edital_url: form.official_edital_url.trim() || null,
      study_tips: form.study_tips.trim() || null,
      source_url: form.source_url.trim(),
      is_demo: false,
    };
    const result = form.id
      ? await supabase.from("contests").update(payload).eq("id", form.id)
      : await supabase.from("contests").insert({ ...payload, content_status: "em_revisao" });
    setSaving(false);
    if (result.error) {
      toast.error("Não foi possível salvar.");
      return;
    }
    toast.success(form.id ? "Concurso atualizado." : "Rascunho criado — publique quando revisar.");
    setForm(emptyForm);
    void load();
  }

  async function togglePublish(r: ContestRow) {
    if (r.content_status === "publicado") {
      const { error } = await supabase
        .from("contests")
        .update({ content_status: "em_revisao" })
        .eq("id", r.id);
      if (error) toast.error("Não foi possível voltar para revisão.");
      else {
        toast.success("Voltou para revisão — alunos não veem mais este concurso.");
        void load();
      }
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("contests")
      .update({
        content_status: "publicado",
        reviewed_by: user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", r.id);
    if (error) toast.error("Não foi possível publicar.");
    else {
      toast.success("Publicado! Já aparece em Concursos disponíveis.");
      void load();
    }
  }

  async function removeRow(r: ContestRow) {
    if (
      !(await confirmDialog({
        title: "Excluir concurso?",
        message: `"${r.name}" será removido definitivamente.`,
        confirmLabel: "Excluir",
        tone: "danger",
      }))
    )
      return;
    const { error } = await supabase.from("contests").delete().eq("id", r.id);
    if (error) toast.error("Não foi possível excluir.");
    else {
      toast.success("Concurso excluído.");
      void load();
    }
  }

  if (!isAdmin) {
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  }

  const pending = rows.filter((r) => r.content_status === "em_revisao").length;
  const published = rows.filter((r) => r.content_status === "publicado").length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Curadoria"
        icon={Target}
        title={
          <>
            Concursos <em>disponíveis</em>
          </>
        }
        description="Cadastre e revise os concursos que aparecem para os alunos. Nada é publicado automaticamente — cada registro precisa de uma fonte oficial e da sua revisão."
      >
        <div className="page-hero__stats">
          <HeroStat icon={Search} label="Em revisão" value={pending} />
          <HeroStat icon={CheckCircle2} label="Publicados" value={published} />
        </div>
      </PageHero>

      <Card>
        <CardHeader>
          <CardTitle>Buscar dados de um edital pela URL</CardTitle>
          <CardDescription>
            Cole o link da página oficial (gov.br, banca organizadora, órgão). O sistema baixa essa
            página de verdade e extrai os campos abaixo para você revisar — nada é inventado: campos
            que não aparecerem no texto ficam em branco.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="https://www.gov.br/.../edital-...pdf-ou-pagina"
            value={fetchUrl}
            onChange={(e) => setFetchUrl(e.target.value)}
          />
          <Button onClick={() => void fetchFromUrl()} disabled={fetching} className="gap-2">
            {fetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Buscar e preencher
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{form.id ? "Editar concurso" : "Novo concurso (rascunho)"}</CardTitle>
          <CardDescription>
            Confira cada campo preenchido automaticamente antes de salvar. Um novo cadastro nasce
            "em revisão"; publique na lista abaixo quando estiver pronto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field label="Nome do concurso/órgão *">
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </Field>
            <Field label="Órgão">
              <Input
                value={form.agency}
                onChange={(e) => setForm((f) => ({ ...f, agency: e.target.value }))}
              />
            </Field>
            <Field label="Carreira">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={form.career}
                onChange={(e) => setForm((f) => ({ ...f, career: e.target.value as Career }))}
              >
                {CAREERS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cargo">
              <Input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              />
            </Field>
            <Field label="Banca">
              <Input
                value={form.exam_board}
                onChange={(e) => setForm((f) => ({ ...f, exam_board: e.target.value }))}
              />
            </Field>
            <Field label="Escolaridade">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={form.education_level}
                onChange={(e) => setForm((f) => ({ ...f, education_level: e.target.value }))}
              >
                <option value="Médio">Médio</option>
                <option value="Superior">Superior</option>
              </select>
            </Field>
            <Field label="Local/UF">
              <Input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </Field>
            <Field label="Situação">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as ContestStatus }))
                }
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Vagas">
              <Input
                type="number"
                min={0}
                value={form.vacancies}
                onChange={(e) => setForm((f) => ({ ...f, vacancies: e.target.value }))}
              />
            </Field>
            <Field label="Remuneração inicial (R$)">
              <Input
                type="number"
                min={0}
                step="0.01"
                value={form.salary}
                onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
              />
            </Field>
            <Field label="Início das inscrições">
              <Input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
              />
            </Field>
            <Field label="Fim das inscrições">
              <Input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
              />
            </Field>
            <Field label="Data da prova">
              <Input
                type="date"
                value={form.exam_date}
                onChange={(e) => setForm((f) => ({ ...f, exam_date: e.target.value }))}
              />
            </Field>
            <Field label="Link de inscrição">
              <Input
                value={form.registration_url}
                onChange={(e) => setForm((f) => ({ ...f, registration_url: e.target.value }))}
              />
            </Field>
            <Field label="Edital oficial (link)">
              <Input
                value={form.official_edital_url}
                onChange={(e) => setForm((f) => ({ ...f, official_edital_url: e.target.value }))}
              />
            </Field>
            <Field label="Fonte oficial consultada (URL) *">
              <Input
                value={form.source_url}
                onChange={(e) => setForm((f) => ({ ...f, source_url: e.target.value }))}
                required
              />
            </Field>
            <Field label="Dicas de estudo para este concurso" full>
              <Textarea
                value={form.study_tips}
                onChange={(e) => setForm((f) => ({ ...f, study_tips: e.target.value }))}
                className="min-h-[90px]"
                placeholder="Ex.: foco em Direito Administrativo e Raciocínio Lógico, a banca costuma cobrar jurisprudência recente…"
              />
            </Field>
            <div className="flex gap-2 md:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : form.id ? (
                  "Salvar"
                ) : (
                  "Criar rascunho"
                )}
              </Button>
              {form.id && (
                <Button type="button" variant="outline" onClick={() => setForm(emptyForm)}>
                  Cancelar edição
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concursos cadastrados</CardTitle>
          <CardDescription>Em revisão ficam visíveis só para o administrador.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : rows.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhum concurso cadastrado ainda. Use a busca por URL ou o formulário acima.
            </p>
          ) : (
            rows.map((r) => (
              <div key={r.id} className="rounded-lg border border-border p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.role ?? "—"} · {r.exam_board ?? "banca a confirmar"} · atualizado{" "}
                      {fmtDateTime(r.updated_at)}
                    </p>
                  </div>
                  <Badge
                    className={
                      r.content_status === "publicado"
                        ? "bg-emerald-600"
                        : "bg-amber-500 text-amber-950"
                    }
                  >
                    {r.content_status === "publicado" ? "Publicado" : "Em revisão"}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => editRow(r)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => void togglePublish(r)}>
                    {r.content_status === "publicado" ? "Voltar p/ revisão" : "Publicar"}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    aria-label={`Excluir ${r.name}`}
                    onClick={() => void removeRow(r)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
