import {
  activeSeconds,
  activityDuration,
  lastStudentAccess,
  sortStudents,
  type StudentActivity,
  type StudentSort,
  type ActivityPeriod,
} from "@/lib/adminStudentActivity";
import { visibleAdminStudentProfiles } from "@/lib/adminStudentList";
import { acreDateKey } from "@/lib/acreTime";
import { acreDate } from "@/lib/acreTime";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Pencil, RefreshCw, ShieldCheck, Trash2, UserPlus, Users } from "lucide-react";
import { createIsolatedSupabaseClient, supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { normalizeUppercase } from "@/lib/utils";
import { confirmDialog } from "@/lib/confirm";
import { StudentDetailsDialog } from "@/components/dashboard/StudentDetailsDialog";
import { fmtDateTime } from "@/lib/displayFormat";
import "@/styles/admin-students-professional.css";

export const Route = createFileRoute("/dashboard/admin-students")({
  head: () => ({
    meta: [
      { title: "Alunos e planos | Norte Concurso" },
      {
        name: "description",
        content: "Cadastre alunos, veja suas provas, uso de IA e altere o plano de cada um.",
      },
      { property: "og:title", content: "Alunos e planos | Norte Concurso" },
      { property: "og:description", content: "Administração de alunos, provas e planos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminStudentsPage,
});

interface StudentRow {
  id: string;
  full_name: string | null;
  email: string | null;
  subscription_tier: string;
  aiToday: number;
  aiTotal: number;
  exams: number;
  isAdmin: boolean;
  created_at: string | null;
  last_sign_in_at: string | null;
  online: boolean;
  activity: StudentActivity | null;
  lastAccess: string | null;
}
interface ExamRow {
  id: string;
  contest_name: string | null;
  contest_year: string | null;
  exam_board: string | null;
  file_name: string;
  score_net: number | null;
  created_at: string;
}

const todayIso = () => acreDateKey();

function AdminStudentsPage() {
  const { user, isAdmin } = useAuthStatus();
  const [planChange, setPlanChange] = useState<{
    id: string;
    name: string;
    tier: string;
    from: string;
  } | null>(null);
  const [planReason, setPlanReason] = useState("");
  const [planBusy, setPlanBusy] = useState(false);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<StudentSort | "created">("activity");
  const [period, setPeriod] = useState<ActivityPeriod>("today");
  const [filter, setFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [status, setStatus] = useState("all");
  const [byCreated, setByCreated] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const load = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!isAdmin) return;
      if (!opts?.silent) setLoading(true);
      setError(null);
      try {
        const profiles: {
          id: string;
          full_name: string | null;
          email: string | null;
          subscription_tier: string | null;
          created_at: string | null;
        }[] = [];
        for (let offset = 0; ; offset += 500) {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, email, subscription_tier, created_at")
            .order("id")
            .range(offset, offset + 499);
          if (error) throw error;
          profiles.push(...visibleAdminStudentProfiles(data ?? []));
          if (!data || data.length < 500) break;
        }
        const activity = new Map<string, StudentActivity>();
        let cursor = 0;
        // Existing administrator-only RPC; bounded concurrency avoids a request burst.
        const loadActivity = async () => {
          while (cursor < profiles.length) {
            const profile = profiles[cursor++];
            if (!profile) break;
            const { data, error } = await supabase.rpc("admin_student_time", {
              _user_id: profile.id,
            });
            if (!error && data) activity.set(profile.id, data as unknown as StudentActivity);
          }
        };
        const [usage, docs, roles, access, onlineRes] = await Promise.all([
          supabase.from("ai_usage_logs").select("user_id, used_on").limit(10000),
          supabase.from("student_exam_documents").select("user_id").limit(10000),
          supabase.from("user_roles").select("user_id").eq("role", "admin"),
          supabase.rpc("admin_students_access"),
          supabase.rpc("admin_students_online"),
        ]);
        await Promise.all(Array.from({ length: Math.min(6, profiles.length) }, loadActivity));
        const onlineIds = new Set(
          (onlineRes.data ?? []).map((o: { user_id: string }) => o.user_id),
        );
        const lastLogin = new Map<string, string | null>(
          (access.data ?? []).map(
            (a: { id: string; last_sign_in_at: string | null }) =>
              [a.id, a.last_sign_in_at] as [string, string | null],
          ),
        );
        const adminIds = new Set((roles.data ?? []).map((r) => r.user_id));
        const t = todayIso();
        setRows(
          (profiles ?? []).map((p) => {
            const u = (usage.data ?? []).filter((x) => x.user_id === p.id);
            return {
              ...p,
              subscription_tier: p.subscription_tier ?? "free",
              aiTotal: u.length,
              aiToday: u.filter((x) => x.used_on === t).length,
              exams: (docs.data ?? []).filter((d) => d.user_id === p.id).length,
              isAdmin: adminIds.has(p.id),
              last_sign_in_at: lastLogin.get(p.id) ?? null,
              online: onlineIds.has(p.id),
              activity: activity.get(p.id) ?? null,
              lastAccess: lastStudentAccess(
                lastLogin.get(p.id) ?? null,
                activity.get(p.id) ?? null,
              ),
            };
          }),
        );
        const warnings = [];
        if (activity.size !== profiles.length)
          warnings.push(
            "Atividade indisponível para alguns alunos; esses registros ficam no fim da ordenação por atividade.",
          );
        if (access.error)
          warnings.push("Datas de login indisponíveis; exibindo as atividades registradas.");
        if (onlineRes.error) warnings.push("Presença online indisponível.");
        if (usage.error || docs.error || roles.error)
          warnings.push("Alguns dados complementares não puderam ser carregados.");
        setError(warnings.join(" ") || null);
      } catch {
        setError(
          "Não foi possível ler os alunos do banco. Verifique a conexão e se você entrou como administrador.",
        );
      } finally {
        if (!opts?.silent) setLoading(false);
      }
    },
    [isAdmin],
  );

  useEffect(() => {
    void load();
    // A presença expira após 90 s; atualizar periodicamente mantém entrada e saída
    // refletidas no painel sem exigir que o administrador recarregue a página.
    // Silencioso: não troca a lista por um spinner a cada atualização em segundo plano.
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load({ silent: true });
    }, 15000);
    return () => window.clearInterval(timer);
  }, [load]);

  const visible = useMemo(() => {
    const q = filter.toLowerCase().trim();
    let list = planFilter === "all" ? rows : rows.filter((r) => r.subscription_tier === planFilter);
    if (status === "online") list = list.filter((r) => r.online);
    else if (status === "admin") list = list.filter((r) => r.isAdmin);
    else if (status === "never") list = list.filter((r) => !r.lastAccess);
    else if (status === "ai") list = list.filter((r) => r.aiTotal > 0);
    if (q) list = list.filter((r) => `${r.full_name} ${r.email}`.toLowerCase().includes(q));
    if (sort === "created")
      return [...list].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
    return sortStudents(list, sort, period);
  }, [rows, filter, sort, period, planFilter, status]);
  const PAGE_SIZE = pageSize;
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageRows = visible.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const leaders = useMemo(
    () =>
      sortStudents(
        rows.filter((r) => !r.isAdmin && (activeSeconds(r.activity, period) ?? 0) > 0),
        "activity",
        period,
      ).slice(0, 3),
    [rows, period],
  );

  function askPlanChange(s: StudentRow, tier: string) {
    if (tier === s.subscription_tier) return;
    setPlanReason("");
    setPlanChange({
      id: s.id,
      name: s.full_name || s.email || "aluno",
      tier,
      from: s.subscription_tier,
    });
  }

  async function confirmPlanChange() {
    if (!planChange || !planReason.trim()) return;
    setPlanBusy(true);
    const { id, tier, from } = planChange;
    // Plano definido pelo administrador não vence sozinho (limpa qualquer vencimento antigo).
    const { error: e } = await supabase
      .from("profiles")
      .update({
        subscription_tier: tier,
        is_activated: tier !== "free",
        subscription_expires_at: null,
      })
      .eq("id", id);
    if (e) {
      toast.error("Não foi possível alterar o plano.");
      setPlanBusy(false);
      return;
    }
    await supabase.from("subscription_audit_logs").insert({
      user_id: id,
      event_type: "admin_change",
      old_tier: from,
      new_tier: tier,
      metadata: { source: "admin_students", reason: planReason.trim() },
    });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, subscription_tier: tier } : x)));
    setPlanChange(null);
    setPlanBusy(false);
    toast.success("Plano atualizado e registrado no histórico.");
  }

  async function toggleAdmin(s: StudentRow) {
    const label = s.full_name || s.email || "este aluno";
    const promote = !s.isAdmin;
    const msg = promote
      ? `Tornar ${label} ADMINISTRADOR? Ele passará a ver e alterar os dados de todos os alunos.`
      : `Remover o acesso de administrador de ${label}?`;
    if (
      !(await confirmDialog({
        title: promote ? "Tornar administrador?" : "Remover administrador?",
        message: msg,
        confirmLabel: promote ? "Tornar administrador" : "Remover acesso",
        tone: promote ? "default" : "danger",
      }))
    )
      return;
    const { error: e } = promote
      ? await supabase
          .from("user_roles")
          .upsert({ user_id: s.id, role: "admin" }, { onConflict: "user_id,role" })
      : await supabase.from("user_roles").delete().eq("user_id", s.id).eq("role", "admin");
    if (e) {
      toast.error("Não foi possível alterar o papel.");
      return;
    }
    setRows((r) => r.map((x) => (x.id === s.id ? { ...x, isAdmin: promote } : x)));
    toast.success(promote ? "Agora é administrador." : "Acesso de administrador removido.");
  }

  async function saveName(id: string) {
    const name = normalizeUppercase(editName.trim());
    if (!name) {
      toast.error("Informe o nome.");
      return;
    }
    const { error: e } = await supabase.from("profiles").update({ full_name: name }).eq("id", id);
    if (e) {
      toast.error("Não foi possível salvar.");
      return;
    }
    setRows((r) => r.map((x) => (x.id === id ? { ...x, full_name: name } : x)));
    setEditId(null);
    toast.success("Aluno atualizado.");
  }

  async function removeStudent(s: StudentRow) {
    const label = s.full_name || s.email || "este aluno";
    if (
      !(await confirmDialog({
        title: "Excluir aluno?",
        message: `${label}: a conta, as provas e o histórico serão apagados de forma permanente.`,
        confirmLabel: "Excluir aluno",
      }))
    )
      return;
    const { error: e } = await supabase.rpc("admin_delete_user", { _user_id: s.id });
    if (e) {
      toast.error(e.message || "Não foi possível excluir.");
      return;
    }
    setRows((r) => r.filter((x) => x.id !== s.id));
    toast.success("Aluno excluído.");
  }

  async function toggleExams(id: string) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    setExams([]);
    const { data } = await supabase
      .from("student_exam_documents")
      .select("id, contest_name, contest_year, exam_board, file_name, score_net, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    setExams((data as ExamRow[]) ?? []);
  }

  if (!isAdmin) {
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  }

  return (
    <div className="admin-students-page space-y-3">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border bg-card px-4 py-3">
        <h1 className="m-0 flex items-center gap-2 text-lg font-bold font-sans!">
          <Users className="h-5 w-5 text-primary" aria-hidden /> Alunos
        </h1>
        <ul className="m-0 flex min-w-0 flex-1 flex-wrap gap-2 p-0 text-sm">
          {[
            ["Cadastrados", rows.length],
            ["Planos pagos", rows.filter((r) => r.subscription_tier !== "free").length],
            ["Online agora", rows.filter((r) => r.online).length],
            ["IA hoje", rows.reduce((t, r) => t + r.aiToday, 0)],
            ["Provas", rows.reduce((t, r) => t + r.exams, 0)],
          ].map(([l, v]) => (
            <li key={l} className="list-none rounded-md bg-muted px-2.5 py-1 text-foreground">
              <span className="text-muted-foreground">{l}: </span>
              <strong className="tabular-nums">{v}</strong>
            </li>
          ))}
        </ul>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={() => void load()}
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4" aria-hidden /> Atualizar
        </Button>
      </header>

      {!loading && leaders.length > 0 && (
        <section
          aria-label={`Alunos mais ativos ${period === "today" ? "hoje" : "no total"}`}
          className="flex flex-wrap items-center gap-2 text-sm"
        >
          <span className="font-semibold">
            Mais ativos {period === "today" ? "hoje" : "no total"}:
          </span>
          {leaders.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setDetailsId(s.id)}
              className="inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border bg-card px-3 py-1 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="font-bold text-primary">{i + 1}º</span>
              <span className="truncate">{s.full_name || s.email || "Sem nome"}</span>
              <span className="tabular-nums text-muted-foreground">
                {activityDuration(activeSeconds(s.activity, period))}
              </span>
            </button>
          ))}
        </section>
      )}
      <NewStudentForm onCreated={() => void load()} />

      <Card>
        <CardContent className="space-y-3 p-3 sm:p-4">
          <div className="flex flex-wrap items-end gap-2">
            <Input
              aria-label="Buscar aluno"
              placeholder="Buscar por nome ou e-mail"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(0);
              }}
              className="h-9 min-w-48 flex-1"
            />
            <select
              aria-label="Filtrar por plano"
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setPage(0);
              }}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              <option value="all">Todos os planos</option>
              {SUBSCRIPTION_PLANS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              aria-label="Filtrar por situação"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              <option value="all">Todas as situações</option>
              <option value="online">Online agora</option>
              <option value="admin">Administradores</option>
              <option value="ai">Já usaram IA</option>
              <option value="never">Nunca acessaram</option>
            </select>
            <select
              aria-label="Ordenar alunos"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as StudentSort | "created");
                setPage(0);
              }}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              <option value="activity">Mais ativos</option>
              <option value="created">Cadastro mais recente</option>
              <option value="access">Último acesso</option>
              <option value="name">Nome A–Z</option>
            </select>
            <select
              aria-label="Período de atividade (Acre)"
              value={period}
              onChange={(e) => setPeriod(e.target.value as ActivityPeriod)}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              <option value="today">Hoje</option>
              <option value="total">Total</option>
            </select>
            <select
              aria-label="Alunos por página"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              {[20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n} por página
                </option>
              ))}
            </select>
          </div>
          <p className="m-0 text-sm text-muted-foreground" role="status">
            Mostrando <strong className="text-foreground">{pageRows.length}</strong> de{" "}
            <strong className="text-foreground">{visible.length}</strong>
            {visible.length !== rows.length && ` (filtrado de ${rows.length} cadastrados)`}
          </p>
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2
                className="h-6 w-6 animate-spin text-muted-foreground"
                aria-label="Carregando"
              />
            </div>
          ) : visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum aluno encontrado.
            </p>
          ) : (
            pageRows.map((s, idx) => (
              <div key={s.id} className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1 basis-56">
                    {editId === s.id ? (
                      <form
                        className="flex gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          void saveName(s.id);
                        }}
                      >
                        <Input
                          aria-label="Nome do aluno"
                          value={editName}
                          onChange={(e) => setEditName(normalizeUppercase(e.target.value))}
                          className="h-8 uppercase"
                          autoFocus
                        />
                        <Button size="sm" type="submit">
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          type="button"
                          variant="ghost"
                          onClick={() => setEditId(null)}
                        >
                          Cancelar
                        </Button>
                      </form>
                    ) : (
                      <p className="truncate font-medium text-foreground" title={s.full_name ?? ""}>
                        <span className="mr-2 inline-block min-w-8 rounded bg-muted px-1.5 text-center text-xs font-bold tabular-nums">
                          {page * PAGE_SIZE + idx + 1}
                        </span>
                        {s.full_name || "Sem nome"}
                      </p>
                    )}
                    <p className="truncate text-xs text-muted-foreground" title={s.email ?? ""}>
                      {s.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cadastro {fmtDateTime(s.created_at)} · Acesso{" "}
                      {s.lastAccess ? fmtDateTime(s.lastAccess) : "sem registro"} · Ativo hoje{" "}
                      {activityDuration(activeSeconds(s.activity, "today"))} · Total{" "}
                      {activityDuration(activeSeconds(s.activity, "total"))}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                    {s.online && <Badge className="bg-emerald-600">Online</Badge>}
                    {s.isAdmin && (
                      <Badge className="gap-1">
                        <ShieldCheck className="h-3 w-3" aria-hidden /> Admin
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      IA {s.aiToday}/{s.aiTotal}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-border pt-2">
                  <Button size="sm" variant="outline" onClick={() => setDetailsId(s.id)}>
                    Detalhes
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => void toggleExams(s.id)}>
                    Provas ({s.exams})
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/dashboard/admin-student/$id" params={{ id: s.id }}>
                      Ver progresso
                    </Link>
                  </Button>
                  <select
                    aria-label={`Plano de ${s.full_name ?? s.email}`}
                    value={s.subscription_tier}
                    onChange={(e) => askPlanChange(s, e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"
                  >
                    {SUBSCRIPTION_PLANS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {s.id !== user?.id && (
                    <Button size="sm" variant="ghost" onClick={() => void toggleAdmin(s)}>
                      {s.isAdmin ? "Remover admin" : "Tornar admin"}
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Editar ${s.full_name ?? s.email}`}
                    onClick={() => {
                      setEditId(s.id);
                      setEditName(s.full_name ?? "");
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    aria-label={`Excluir ${s.full_name ?? s.email}`}
                    onClick={() => void removeStudent(s)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {openId === s.id && (
                  <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                    {exams.length === 0 ? (
                      <li className="text-muted-foreground">Nenhuma prova registrada.</li>
                    ) : (
                      exams.map((ex) => (
                        <li key={ex.id} className="flex flex-wrap justify-between gap-2">
                          <span className="text-foreground">
                            {ex.contest_name ?? ex.file_name}{" "}
                            {ex.contest_year ? `(${ex.contest_year})` : ""}{" "}
                            {ex.exam_board ? `· ${ex.exam_board}` : ""}
                          </span>
                          <span className="text-muted-foreground">
                            {ex.score_net != null
                              ? `Nota ${ex.score_net}`
                              : acreDate(ex.created_at).toLocaleDateString("pt-BR", {
                                  timeZone: "America/Rio_Branco",
                                })}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            ))
          )}
          {visible.length > PAGE_SIZE && (
            <nav
              aria-label="Páginas de alunos"
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="text-muted-foreground">
                {page * PAGE_SIZE + 1}–{Math.min(visible.length, (page + 1) * PAGE_SIZE)} de{" "}
                {visible.length}
              </span>
              <span className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= pageCount - 1}
                  onClick={() => setPage(page + 1)}
                >
                  Próxima
                </Button>
              </span>
            </nav>
          )}
        </CardContent>
      </Card>

      <StudentDetailsDialog userId={detailsId} onClose={() => setDetailsId(null)} />

      <Dialog
        open={!!planChange}
        onOpenChange={(open) => {
          if (!open && !planBusy) setPlanChange(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar plano</DialogTitle>
            <DialogDescription>
              {planChange &&
                `Alterar o plano de ${planChange.name} de ${SUBSCRIPTION_PLANS.find((p) => p.id === planChange.from)?.name ?? planChange.from} para ${SUBSCRIPTION_PLANS.find((p) => p.id === planChange.tier)?.name ?? planChange.tier}. A mudança vale agora e fica registrada no histórico.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="plan-reason">Motivo (obrigatório)</Label>
            <Textarea
              id="plan-reason"
              value={planReason}
              onChange={(e) => setPlanReason(e.target.value)}
              maxLength={300}
              placeholder="Ex.: período de testes, pedido do aluno, pagamento confirmado…"
              className="min-h-[90px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanChange(null)} disabled={planBusy}>
              Voltar
            </Button>
            <Button
              onClick={() => void confirmPlanChange()}
              disabled={planBusy || !planReason.trim()}
            >
              {planBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NewStudentForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tier, setTier] = useState("free");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const cleanName = normalizeUppercase(name.trim()).slice(0, 120);
    const cleanEmail = email.trim().toLowerCase();
    if (
      !cleanName ||
      !/^\S+@\S+\.\S+$/.test(cleanEmail) ||
      cleanEmail.length > 255 ||
      password.length < 6
    ) {
      toast.error("Preencha nome, e-mail válido e senha com 6+ caracteres.");
      return;
    }
    setBusy(true);
    try {
      // Cliente separado, sem guardar sessão: cria o aluno sem desconectar o administrador.
      const temp = createIsolatedSupabaseClient("nc-admin-create");
      const { data, error } = await temp.auth.signUp({
        email: cleanEmail,
        password,
        options: { data: { full_name: cleanName } },
      });
      if (error) throw error;
      const newId = data.user?.id;
      if (newId && tier !== "free") {
        // O perfil nasce junto com a conta; o admin aplica o plano escolhido.
        const { error: pErr } = await supabase
          .from("profiles")
          .update({ subscription_tier: tier, is_activated: true })
          .eq("id", newId);
        if (pErr) toast.warning("Aluno criado, mas o plano não foi aplicado. Ajuste na lista.");
        else
          await supabase.from("subscription_audit_logs").insert({
            user_id: newId,
            event_type: "admin_change",
            new_tier: tier,
            metadata: { source: "admin_create" },
          });
      }
      toast.success("Aluno cadastrado. Ele pode precisar confirmar o e-mail.");
      setName("");
      setEmail("");
      setPassword("");
      setTier("free");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao cadastrar aluno.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="group rounded-xl border bg-card">
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-semibold">
        <UserPlus className="h-4 w-4" aria-hidden /> Cadastrar aluno
      </summary>
      <div className="border-t p-3 sm:p-4">
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <Input
            aria-label="Nome"
            placeholder="Nome completo"
            maxLength={120}
            value={name}
            onChange={(e) => setName(normalizeUppercase(e.target.value))}
            className="uppercase"
          />
          <Input
            aria-label="E-mail"
            type="email"
            placeholder="E-mail"
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            aria-label="Senha inicial"
            type="password"
            placeholder="Senha inicial"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            aria-label="Plano do novo aluno"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"
          >
            {SUBSCRIPTION_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <Button type="submit" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </div>
    </details>
  );
}
