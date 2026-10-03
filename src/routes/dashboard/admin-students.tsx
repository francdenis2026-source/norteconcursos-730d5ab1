import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Activity, FileStack, Loader2, Pencil, RefreshCw, Sparkles, Trash2, UserPlus, Users } from "lucide-react";
import { createIsolatedSupabaseClient, supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { normalizeUppercase } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/admin-students")({
  head: () => ({
    meta: [
      { title: "Alunos e planos | Norte Concurso" },
      { name: "description", content: "Cadastre alunos, veja suas provas, uso de IA e altere o plano de cada um." },
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

const todayIso = () => new Date().toISOString().slice(0, 10);

function AdminStudentsPage() {
  const { isAdmin } = useAuthStatus();
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: profiles, error: pErr } = await supabase
        .from("profiles")
        .select("id, full_name, email, subscription_tier")
        .order("created_at", { ascending: false })
        .limit(500);
      if (pErr) throw pErr;
      const [usage, docs] = await Promise.all([
        supabase.from("ai_usage_logs").select("user_id, used_on").limit(10000),
        supabase.from("student_exam_documents").select("user_id").limit(10000),
      ]);
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
          };
        }),
      );
      if (usage.error) setError("Uso de IA indisponível: rode o arquivo ADMIN_ALUNOS_USO_IA.sql no banco.");
    } catch {
      setError("Não foi possível ler os alunos do banco. Verifique a conexão e se você entrou como administrador.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    const q = filter.toLowerCase().trim();
    return q ? rows.filter((r) => `${r.full_name} ${r.email}`.toLowerCase().includes(q)) : rows;
  }, [rows, filter]);

  async function changePlan(id: string, tier: string) {
    const { error: e } = await supabase.from("profiles").update({ subscription_tier: tier, is_activated: tier !== "free" }).eq("id", id);
    if (e) { toast.error("Não foi possível alterar o plano."); return; }
    await supabase.from("subscription_audit_logs").insert({ user_id: id, event_type: "admin_change", new_tier: tier, metadata: { source: "admin_students" } });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, subscription_tier: tier } : x)));
    toast.success("Plano atualizado.");
  }

  async function saveName(id: string) {
    const name = normalizeUppercase(editName.trim());
    if (!name) { toast.error("Informe o nome."); return; }
    const { error: e } = await supabase.from("profiles").update({ full_name: name }).eq("id", id);
    if (e) { toast.error("Não foi possível salvar."); return; }
    setRows((r) => r.map((x) => (x.id === id ? { ...x, full_name: name } : x)));
    setEditId(null);
    toast.success("Aluno atualizado.");
  }

  async function removeStudent(s: StudentRow) {
    const label = s.full_name || s.email || "este aluno";
    if (!window.confirm(`Excluir ${label}? A conta, provas e histórico serão apagados de forma permanente.`)) return;
    const { error: e } = await supabase.rpc("admin_delete_user", { _user_id: s.id });
    if (e) { toast.error(e.message || "Não foi possível excluir."); return; }
    setRows((r) => r.filter((x) => x.id !== s.id));
    toast.success("Aluno excluído.");
  }

  async function toggleExams(id: string) {
    if (openId === id) { setOpenId(null); return; }
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
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Operações de alunos"
        icon={Users}
        title={<>Alunos, planos <em>e IA</em></>}
        description="Cadastre contas, acompanhe provas e consumo de IA e ajuste o acesso de cada aluno."
        actions={<Button className="hero-btn-ghost gap-2" onClick={() => void load()} disabled={loading}><RefreshCw className="h-4 w-4" aria-hidden /> Atualizar dados</Button>}
      >
        <div className="page-hero__stats">
          <HeroStat icon={Users} label="Alunos" value={rows.length} />
          <HeroStat icon={Sparkles} label="Uso de IA hoje" value={rows.reduce((total, row) => total + row.aiToday, 0)} />
          <HeroStat icon={Activity} label="Uso de IA total" value={rows.reduce((total, row) => total + row.aiTotal, 0)} />
          <HeroStat icon={FileStack} label="Provas registradas" value={rows.reduce((total, row) => total + row.exams, 0)} />
        </div>
      </PageHero>

      <NewStudentForm onCreated={() => void load()} />

      <Card>
        <CardHeader className="gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Alunos cadastrados</CardTitle>
            <CardDescription>Uso de IA hoje / total, provas enviadas e plano.</CardDescription>
          </div>
          <Input aria-label="Buscar aluno" placeholder="Buscar por nome ou e-mail" value={filter} onChange={(e) => setFilter(e.target.value)} className="md:max-w-xs" />
        </CardHeader>
        <CardContent className="space-y-3">
          {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
          ) : visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Nenhum aluno encontrado.</p>
          ) : (
            visible.map((s) => (
              <div key={s.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    {editId === s.id ? (
                      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); void saveName(s.id); }}>
                        <Input aria-label="Nome do aluno" value={editName} onChange={(e) => setEditName(normalizeUppercase(e.target.value))} className="h-8 uppercase" autoFocus />
                        <Button size="sm" type="submit">Salvar</Button>
                        <Button size="sm" type="button" variant="ghost" onClick={() => setEditId(null)}>Cancelar</Button>
                      </form>
                    ) : (
                      <p className="truncate font-medium text-foreground">{s.full_name || "Sem nome"}</p>
                    )}
                    <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                  </div>
                  <Badge variant="secondary">IA: {s.aiToday} hoje · {s.aiTotal} total</Badge>
                  <Button size="sm" variant="ghost" onClick={() => void toggleExams(s.id)}>Provas ({s.exams})</Button>
                  <select aria-label={`Plano de ${s.full_name ?? s.email}`} value={s.subscription_tier} onChange={(e) => void changePlan(s.id, e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">
                    {SUBSCRIPTION_PLANS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <Button size="icon" variant="ghost" aria-label={`Editar ${s.full_name ?? s.email}`} onClick={() => { setEditId(s.id); setEditName(s.full_name ?? ""); }}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" aria-label={`Excluir ${s.full_name ?? s.email}`} onClick={() => void removeStudent(s)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                {openId === s.id && (
                  <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                    {exams.length === 0 ? <li className="text-muted-foreground">Nenhuma prova registrada.</li> : exams.map((ex) => (
                      <li key={ex.id} className="flex flex-wrap justify-between gap-2">
                        <span className="text-foreground">{ex.contest_name ?? ex.file_name} {ex.contest_year ? `(${ex.contest_year})` : ""} {ex.exam_board ? `· ${ex.exam_board}` : ""}</span>
                        <span className="text-muted-foreground">{ex.score_net != null ? `Nota ${ex.score_net}` : new Date(ex.created_at).toLocaleDateString("pt-BR")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function NewStudentForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      toast.error("Preencha nome, e-mail válido e senha com 6+ caracteres.");
      return;
    }
    setBusy(true);
    try {
      // Cliente separado, sem guardar sessão: cria o aluno sem desconectar o administrador.
      const temp = createIsolatedSupabaseClient("nc-admin-create");
      const { error } = await temp.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { full_name: normalizeUppercase(name.trim()) } },
      });
      if (error) throw error;
      toast.success("Aluno cadastrado. Ele pode precisar confirmar o e-mail.");
      setName(""); setEmail(""); setPassword("");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao cadastrar aluno.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" aria-hidden /> Cadastrar aluno</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <Input aria-label="Nome" placeholder="Nome completo" value={name} onChange={(e) => setName(normalizeUppercase(e.target.value))} className="uppercase" />
          <Input aria-label="E-mail" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input aria-label="Senha inicial" type="password" placeholder="Senha inicial" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cadastrar"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
