// Fila de revisão dos relatos de questão errada enviados pelos alunos
// (ReportQuestionButton, no Treinador). O admin vê a questão como estava no
// momento do relato, quem reportou e corrige direto na tabela física de
// origem (question_table) — cada tabela tem colunas um pouco diferentes.
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, Flag, Loader2, PencilLine, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { confirmDialog } from "@/lib/confirm";
import type { QuestionTable } from "@/lib/questionFormat";

export const Route = createFileRoute("/dashboard/admin-question-reports")({
  head: () => ({
    meta: [
      { title: "Questões reportadas (admin) | Norte Concurso" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminQuestionReportsPage,
});

type Status = "pendente" | "em_analise" | "corrigida" | "rejeitada";
type Snapshot = {
  contest?: string;
  board?: string;
  career?: string;
  year?: string;
  subject?: string;
  text?: string;
  answer?: string;
};
type Report = {
  id: string;
  question_id: string;
  question_source: string;
  question_table: QuestionTable;
  reported_by: string | null;
  reason: string;
  question_snapshot: Snapshot;
  status: Status;
  admin_note: string | null;
  created_at: string;
  reporter_name: string;
};

const STATUS_LABEL: Record<Status, string> = {
  pendente: "Pendente",
  em_analise: "Em análise",
  corrigida: "Corrigida",
  rejeitada: "Rejeitada",
};
const STATUS_STYLE: Record<Status, string> = {
  pendente: "border-amber-400/50 bg-amber-400/10 text-amber-700 dark:text-amber-300",
  em_analise: "border-sky-400/50 bg-sky-400/10 text-sky-700 dark:text-sky-300",
  corrigida: "border-emerald-400/50 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
  rejeitada: "border-rose-400/50 bg-rose-400/10 text-rose-700 dark:text-rose-300",
};

// Colunas de texto/gabarito/explicação variam por tabela física de origem —
// aqui mapeamos cada uma pra montar o editor "direto na fonte" certo.
const TABLE_FIELDS: Record<
  QuestionTable,
  { text: string; answer: string; explanation: string | null; hasAuthor: boolean }
> = {
  official_exam_questions: {
    text: "question_text",
    answer: "official_answer",
    explanation: "review_note",
    hasAuthor: false,
  },
  curated_question_catalog: {
    text: "question_text",
    answer: "official_answer",
    explanation: "explanation",
    hasAuthor: false,
  },
  question_bank: {
    text: "question_text",
    answer: "official_answer",
    explanation: "explanation",
    hasAuthor: true,
  },
  board_exam_questions: {
    text: "stem",
    answer: "official_answer",
    explanation: "explanation",
    hasAuthor: false,
  },
};
const TABLE_LABEL: Record<QuestionTable, string> = {
  official_exam_questions: "Prova oficial",
  curated_question_catalog: "Questão autoral",
  question_bank: "Caderno pessoal de aluno",
  board_exam_questions: "Prova de banca (FGV etc.)",
};

function AdminQuestionReportsPage() {
  const { isAdmin } = useAuthStatus();
  const [reports, setReports] = React.useState<Report[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<Status | "all">("pendente");
  const [editing, setEditing] = React.useState<Report | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("question_reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    const rows = (data ?? []) as Array<Record<string, unknown>>;
    const reporterIds = [...new Set(rows.map((r) => r["reported_by"]).filter(Boolean))] as string[];
    const profilesById = new Map<string, { full_name?: string; email?: string }>();
    if (reporterIds.length) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id,full_name,email")
        .in("id", reporterIds);
      for (const p of profiles ?? [])
        profilesById.set(String((p as Record<string, unknown>)["id"]), p as never);
    }
    setReports(
      rows.map((row) => {
        const reportedBy = row["reported_by"] ? String(row["reported_by"]) : null;
        const profile = reportedBy ? profilesById.get(reportedBy) : undefined;
        return {
          id: String(row["id"]),
          question_id: String(row["question_id"]),
          question_source: String(row["question_source"]),
          question_table: row["question_table"] as QuestionTable,
          reported_by: reportedBy,
          reason: String(row["reason"]),
          question_snapshot: (row["question_snapshot"] ?? {}) as Snapshot,
          status: row["status"] as Status,
          admin_note: row["admin_note"] ? String(row["admin_note"]) : null,
          created_at: String(row["created_at"]),
          reporter_name: profile?.full_name || profile?.email || "Aluno (perfil não encontrado)",
        };
      }),
    );
    setLoading(false);
  }, []);
  React.useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const setStatus = async (report: Report, status: Status) => {
    const { error } = await supabase
      .from("question_reports")
      .update({
        status,
        resolved_by: status === "corrigida" || status === "rejeitada" ? report.reported_by : null,
        resolved_at:
          status === "corrigida" || status === "rejeitada" ? new Date().toISOString() : null,
      })
      .eq("id", report.id);
    if (error) return void toast.error(error.message);
    setReports((items) => items.map((r) => (r.id === report.id ? { ...r, status } : r)));
  };

  const visible = reports.filter((r) => statusFilter === "all" || r.status === statusFilter);
  const counts = React.useMemo(() => {
    const m: Record<Status, number> = { pendente: 0, em_analise: 0, corrigida: 0, rejeitada: 0 };
    for (const r of reports) m[r.status]++;
    return m;
  }, [reports]);

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={Flag}
        title={
          <>
            Questões <em>reportadas</em>
          </>
        }
        description="Relatos enviados por alunos no Treinador — enunciado, gabarito ou alternativa com problema."
      >
        <div className="page-hero__stats">
          <HeroStat icon={Flag} label="Pendentes" value={counts.pendente} />
          <HeroStat icon={CheckCircle2} label="Corrigidas" value={counts.corrigida} />
          <HeroStat icon={XCircle} label="Rejeitadas" value={counts.rejeitada} />
        </div>
      </PageHero>

      <div className="flex items-center gap-3">
        <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          Filtrar por status
        </span>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Status | "all")}>
          <SelectTrigger className="h-9 w-48 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em_analise">Em análise</SelectItem>
            <SelectItem value="corrigida">Corrigida</SelectItem>
            <SelectItem value="rejeitada">Rejeitada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
      ) : !visible.length ? (
        <p className="rounded-lg border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Nenhum relato neste status.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((report) => (
            <Card key={report.id}>
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
                <div>
                  <CardTitle className="text-base">
                    {report.question_snapshot.contest || "Questão"} ·{" "}
                    {report.question_snapshot.subject || ""}
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Reportado por <b>{report.reporter_name}</b> em{" "}
                    {new Date(report.created_at).toLocaleString("pt-BR")} ·{" "}
                    {TABLE_LABEL[report.question_table]}
                  </p>
                </div>
                <Badge variant="outline" className={STATUS_STYLE[report.status]}>
                  {STATUS_LABEL[report.status]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Enunciado no momento do relato
                  </p>
                  <p className="whitespace-pre-line leading-6">
                    {report.question_snapshot.text || "—"}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Gabarito registrado: <b>{report.question_snapshot.answer || "—"}</b>
                  </p>
                </div>
                <div className="rounded-lg border border-rose-300/50 bg-rose-50 p-3 text-sm dark:bg-rose-950/20">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                    O que o aluno relatou
                  </p>
                  <p className="whitespace-pre-line leading-6">{report.reason}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(report)}>
                    <PencilLine className="mr-1.5 h-3.5 w-3.5" /> Corrigir na fonte
                  </Button>
                  {report.status !== "em_analise" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => void setStatus(report, "em_analise")}
                    >
                      Marcar em análise
                    </Button>
                  )}
                  {report.status !== "corrigida" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-700 dark:text-emerald-300"
                      onClick={() => void setStatus(report, "corrigida")}
                    >
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Marcar corrigida
                    </Button>
                  )}
                  {report.status !== "rejeitada" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-rose-700 dark:text-rose-300"
                      onClick={async () => {
                        if (
                          await confirmDialog({
                            title: "Rejeitar este relato?",
                            message: "O relato fica marcado como rejeitado, sem alterar a questão.",
                            confirmLabel: "Rejeitar",
                            tone: "danger",
                          })
                        )
                          void setStatus(report, "rejeitada");
                      }}
                    >
                      <XCircle className="mr-1.5 h-3.5 w-3.5" /> Rejeitar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <SourceEditorDialog
          report={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            void setStatus(editing, "corrigida");
          }}
        />
      )}
    </div>
  );
}

function SourceEditorDialog({
  report,
  onClose,
  onSaved,
}: {
  report: Report;
  onClose: () => void;
  onSaved: () => void;
}) {
  const fields = TABLE_FIELDS[report.question_table];
  const [loading, setLoading] = React.useState(true);
  const [text, setText] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [explanation, setExplanation] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [author, setAuthor] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      const columns = [fields.text, fields.answer, fields.explanation, "user_id"]
        .filter(Boolean)
        .join(",");
      const { data, error } = await supabase
        .from(report.question_table)
        .select(columns)
        .eq("id", report.question_id)
        .maybeSingle();
      if (error || !data) {
        toast.error("Não foi possível carregar a questão na fonte. Pode ter sido removida.");
        setLoading(false);
        return;
      }
      const row = data as unknown as Record<string, unknown>;
      setText(String(row[fields.text] ?? ""));
      setAnswer(String(row[fields.answer] ?? ""));
      if (fields.explanation) setExplanation(String(row[fields.explanation] ?? ""));
      if (fields.hasAuthor) setAuthor(row["user_id"] ? String(row["user_id"]) : null);
      setLoading(false);
    })();
  }, [report, fields]);

  const save = async () => {
    setSaving(true);
    try {
      const update: Record<string, string> = { [fields.text]: text, [fields.answer]: answer };
      if (fields.explanation) update[fields.explanation] = explanation;
      const { error } = await supabase
        .from(report.question_table)
        .update(update)
        .eq("id", report.question_id);
      if (error) throw error;
      toast.success("Questão corrigida direto na fonte.");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar a correção.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal
    >
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
        <CardHeader>
          <CardTitle>Corrigir questão na fonte ({TABLE_LABEL[report.question_table]})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <Loader2 className="mx-auto h-5 w-5 animate-spin" />
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                {fields.hasAuthor
                  ? author
                    ? "Questão do caderno pessoal de um aluno (autoria individual registrada)."
                    : "Questão do caderno pessoal; autor original não encontrado."
                  : "Conteúdo importado em lote — não há autoria individual registrada para este tipo de questão."}
              </p>
              <label className="block space-y-1 text-sm">
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Enunciado
                </span>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[140px]"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Gabarito
                </span>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[40px]"
                />
              </label>
              {fields.explanation && (
                <label className="block space-y-1 text-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Comentário / explicação
                  </span>
                  <Textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="min-h-[100px]"
                  />
                </label>
              )}
            </>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={() => void save()} disabled={loading || saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar e marcar corrigida"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
