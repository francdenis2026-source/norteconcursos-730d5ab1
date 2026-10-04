import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Loader2, PiggyBank, Plus, RefreshCw, Trash2, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { confirmDialog } from "@/lib/confirm";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { acreDateKey } from "@/lib/acreTime";
import { formatBRL, lastMonths, monthRange, parseBRLToCents } from "@/lib/money";
import { PAYMENTS_ENABLED } from "@/lib/launch.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/admin-finance")({
  head: () => ({
    meta: [
      { title: "Financeiro | Norte Concurso" },
      { name: "description", content: "Receitas, despesas e assinaturas da plataforma Norte Concurso." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminFinancePage,
});

type Kind = "receita" | "despesa";

interface Entry {
  id: string;
  entry_date: string;
  kind: Kind;
  category: string;
  description: string | null;
  amount_cents: number;
}

const CATEGORIES: Record<Kind, Array<[string, string]>> = {
  receita: [
    ["assinatura", "Assinatura de aluno"],
    ["outras_receitas", "Outras receitas"],
  ],
  despesa: [
    ["ia", "IA (créditos)"],
    ["hospedagem", "Hospedagem e banco de dados"],
    ["dominio", "Domínio"],
    ["email", "E-mail (envio)"],
    ["marketing", "Marketing"],
    ["ferramentas", "Ferramentas e assinaturas"],
    ["impostos", "Impostos e taxas"],
    ["outras_despesas", "Outras despesas"],
  ],
};
const categoryLabel = (kind: Kind, key: string) =>
  CATEGORIES[kind].find(([k]) => k === key)?.[1] ?? key;

const EVENT_LABELS: Record<string, string> = {
  admin_change: "Plano alterado pelo administrador",
  downgrade: "Redução de plano",
  cancellation: "Cancelamento",
  upgrade: "Mudança para plano superior",
};

const monthLabel = (month: string) => {
  const [y = 1970, m = 1] = month.split("-").map(Number);
  const label = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });
  return label.charAt(0).toUpperCase() + label.slice(1);
};
const dayLabel = (iso: string) => iso.split("-").reverse().join("/");

const isMissingTable = (err: { code?: string; message?: string } | null) =>
  !!err && (err.code === "42P01" || /finance_entries/.test(err.message ?? "") && /does not exist|schema cache/i.test(err.message ?? ""));

function AdminFinancePage() {
  const { user, isAdmin } = useAuthStatus();
  const today = acreDateKey();
  const [month, setMonth] = useState(today.slice(0, 7));
  const [entries, setEntries] = useState<Entry[]>([]);
  const [tierCounts, setTierCounts] = useState<Record<string, number>>({});
  const [events, setEvents] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [kind, setKind] = useState<Kind>("despesa");
  const [category, setCategory] = useState(CATEGORIES.despesa[0]![0]);
  const [entryDate, setEntryDate] = useState(today);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const months = useMemo(() => lastMonths(month, 6), [month]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMissing(false);
    const oldest = months[months.length - 1]!;
    const from = monthRange(oldest).first;
    const to = monthRange(month).last;
    const since = new Date(Date.now() - 30 * 86_400_000).toISOString();
    const [ent, prof, logs] = await Promise.all([
      supabase.from("finance_entries").select("id, entry_date, kind, category, description, amount_cents").gte("entry_date", from).lte("entry_date", to).order("entry_date", { ascending: false }).limit(3000),
      supabase.from("profiles").select("subscription_tier").limit(20000),
      supabase.from("subscription_audit_logs").select("event_type").gte("created_at", since).limit(5000),
    ]);
    if (isMissingTable(ent.error)) setMissing(true);
    else if (ent.error) setError("Não foi possível ler os lançamentos. Confirme que você entrou como administrador.");
    setEntries(((ent.data ?? []) as Entry[]).filter((e) => e.kind === "receita" || e.kind === "despesa"));
    const counts: Record<string, number> = {};
    for (const p of prof.data ?? []) counts[p.subscription_tier ?? "free"] = (counts[p.subscription_tier ?? "free"] ?? 0) + 1;
    setTierCounts(counts);
    const ev: Record<string, number> = {};
    for (const l of logs.data ?? []) ev[l.event_type] = (ev[l.event_type] ?? 0) + 1;
    setEvents(ev);
    setLoading(false);
  }, [month, months]);

  useEffect(() => {
    void load();
  }, [load]);

  const inMonth = useMemo(() => entries.filter((e) => e.entry_date.startsWith(month)), [entries, month]);
  const sum = (list: Entry[], k: Kind) => list.filter((e) => e.kind === k).reduce((t, e) => t + e.amount_cents, 0);
  const revenue = sum(inMonth, "receita");
  const expenses = sum(inMonth, "despesa");

  const paidPlans = SUBSCRIPTION_PLANS.filter((p) => p.price > 0);
  const mrrCents = paidPlans.reduce((t, p) => t + Math.round(p.price * 100) * (tierCounts[p.id] ?? 0), 0);
  const subscribers = paidPlans.reduce((t, p) => t + (tierCounts[p.id] ?? 0), 0);

  const perMonth = months.map((m) => {
    const list = entries.filter((e) => e.entry_date.startsWith(m));
    const r = sum(list, "receita");
    const d = sum(list, "despesa");
    return { month: m, revenue: r, expenses: d, result: r - d };
  });
  const maxBar = Math.max(1, ...perMonth.flatMap((m) => [m.revenue, m.expenses]));

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of inMonth.filter((x) => x.kind === "despesa")) map.set(e.category, (map.get(e.category) ?? 0) + e.amount_cents);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [inMonth]);

  async function addEntry(e: FormEvent) {
    e.preventDefault();
    const cents = parseBRLToCents(amount);
    if (cents === null || cents > 100_000_000) { toast.error("Informe um valor válido, por exemplo 49,90."); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) { toast.error("Informe a data."); return; }
    setSaving(true);
    const { error: err } = await supabase.from("finance_entries").insert({
      entry_date: entryDate,
      kind,
      category,
      description: description.trim().slice(0, 200) || null,
      amount_cents: cents,
      created_by: user?.id ?? null,
    });
    setSaving(false);
    if (err) { toast.error(isMissingTable(err) ? "A tabela financeira ainda não foi criada no banco." : "Não foi possível salvar o lançamento."); return; }
    toast.success("Lançamento salvo.");
    setDescription("");
    setAmount("");
    if (entryDate.slice(0, 7) !== month) setMonth(entryDate.slice(0, 7));
    else void load();
  }

  async function removeEntry(entry: Entry) {
    const label = `${categoryLabel(entry.kind, entry.category)} de ${formatBRL(entry.amount_cents)} em ${dayLabel(entry.entry_date)}`;
    if (!(await confirmDialog({ title: "Excluir lançamento?", message: `${label}. Isso não pode ser desfeito.`, confirmLabel: "Excluir" }))) return;
    const { error: err } = await supabase.from("finance_entries").delete().eq("id", entry.id);
    if (err) { toast.error("Não foi possível excluir."); return; }
    setEntries((list) => list.filter((x) => x.id !== entry.id));
    toast.success("Lançamento excluído.");
  }

  function exportCsv() {
    if (inMonth.length === 0) { toast.error("Não há lançamentos neste mês."); return; }
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = [["Data", "Tipo", "Categoria", "Descrição", "Valor (R$)"].join(";")];
    for (const e of [...inMonth].sort((a, b) => a.entry_date.localeCompare(b.entry_date))) {
      rows.push([dayLabel(e.entry_date), e.kind === "receita" ? "Receita" : "Despesa", esc(categoryLabel(e.kind, e.category)), esc(e.description ?? ""), (e.amount_cents / 100).toFixed(2).replace(".", ",")].join(";"));
    }
    const blob = new Blob(["﻿" + rows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financeiro_${month}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  const result = revenue - expenses;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Gestão da plataforma"
        icon={Wallet}
        title={<>Painel <em>financeiro</em></>}
        description="Receitas, despesas e assinaturas da plataforma em um só lugar. Só o administrador vê esta página."
        actions={<Button className="hero-btn-ghost gap-2" onClick={() => void load()} disabled={loading}><RefreshCw className="h-4 w-4" aria-hidden /> Atualizar</Button>}
      >
        <div className="page-hero__stats">
          <HeroStat icon={TrendingUp} label="Receitas do mês" value={formatBRL(revenue)} />
          <HeroStat icon={TrendingDown} label="Despesas do mês" value={formatBRL(expenses)} />
          <HeroStat icon={PiggyBank} label="Resultado do mês" value={formatBRL(result)} />
          <HeroStat icon={Users} label="Assinantes de planos pagos" value={subscribers} />
        </div>
      </PageHero>

      {!PAYMENTS_ENABLED && (
        <div role="status" className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-foreground">
          <strong>Pagamentos online desativados.</strong> Por enquanto não há cobrança automática: as receitas entram aqui como
          lançamentos manuais, e o quadro de assinantes é uma <em>estimativa</em> pelo plano gravado em cada aluno.
        </div>
      )}

      {missing && (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Falta criar a tabela financeira</CardTitle>
            <CardDescription>
              Rode no SQL Editor do Supabase o arquivo <code>supabase/migrations/20261003100000_admin_finance_entries.sql</code> (uma única vez) e clique em Atualizar.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          Mês
          <Input type="month" value={month} max={today.slice(0, 7)} onChange={(e) => e.target.value && setMonth(e.target.value)} className="h-9 w-44" />
        </label>
        <span className="text-sm text-muted-foreground">{monthLabel(month)}</span>
        <Button variant="outline" size="sm" className="ml-auto gap-2" onClick={exportCsv}><Download className="h-4 w-4" aria-hidden /> Exportar CSV do mês</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas (estimativa)</CardTitle>
                <CardDescription>Alunos por plano pago e receita mensal estimada. Não é dinheiro recebido: é o que os planos gravados renderiam.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>Plano</TableHead><TableHead className="text-right">Alunos</TableHead><TableHead className="text-right">Preço/mês</TableHead><TableHead className="text-right">Estimativa</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {paidPlans.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-right">{tierCounts[p.id] ?? 0}</TableCell>
                        <TableCell className="text-right">{formatBRL(Math.round(p.price * 100))}</TableCell>
                        <TableCell className="text-right">{formatBRL(Math.round(p.price * 100) * (tierCounts[p.id] ?? 0))}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold" colSpan={3}>Receita mensal estimada</TableCell>
                      <TableCell className="text-right font-bold">{formatBRL(mrrCents)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground">Contas gratuitas: {tierCounts["free"] ?? 0}. Planos dados em fase de testes contam aqui; só vira receita quando você lança o pagamento.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movimentação de planos (30 dias)</CardTitle>
                <CardDescription>Quantas vezes planos foram alterados, reduzidos ou cancelados.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.keys(events).length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">Nenhuma movimentação nos últimos 30 dias.</p>
                ) : (
                  Object.entries(events).sort((a, b) => b[1] - a[1]).map(([ev, n]) => (
                    <div key={ev} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
                      <span>{EVENT_LABELS[ev] ?? ev}</span>
                      <Badge variant="secondary">{n}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Últimos 6 meses</CardTitle>
                <CardDescription>Receitas (verde) e despesas (vermelho) lançadas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {perMonth.map((m) => (
                  <div key={m.month} className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{monthLabel(m.month)}</span>
                      <span className={m.result < 0 ? "font-semibold text-destructive" : "font-semibold text-foreground"}>{formatBRL(m.result)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted" role="img" aria-label={`Receitas ${formatBRL(m.revenue)}`}>
                      <div className="h-full bg-emerald-500" style={{ width: `${(m.revenue / maxBar) * 100}%` }} />
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted" role="img" aria-label={`Despesas ${formatBRL(m.expenses)}`}>
                      <div className="h-full bg-red-500" style={{ width: `${(m.expenses / maxBar) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Despesas por categoria</CardTitle>
                <CardDescription>{monthLabel(month)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {byCategory.length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">Nenhuma despesa lançada neste mês.</p>
                ) : (
                  byCategory.map(([cat, cents]) => (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-sm"><span>{categoryLabel("despesa", cat)}</span><span className="font-medium">{formatBRL(cents)}</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${expenses ? (cents / expenses) * 100 : 0}%` }} /></div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lançamentos</CardTitle>
              <CardDescription>Registre cada receita (ex.: assinatura recebida por Pix) e cada despesa (ex.: domínio, IA, hospedagem).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={addEntry} className="grid grid-cols-1 gap-3 md:grid-cols-6">
                <Input aria-label="Data" type="date" value={entryDate} max={today} onChange={(e) => setEntryDate(e.target.value)} required />
                <select aria-label="Tipo" value={kind} onChange={(e) => { const k = e.target.value as Kind; setKind(k); setCategory(CATEGORIES[k][0]![0]); }} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">
                  <option value="despesa">Despesa</option>
                  <option value="receita">Receita</option>
                </select>
                <select aria-label="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">
                  {CATEGORIES[kind].map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
                <Input aria-label="Descrição" placeholder="Descrição (opcional)" maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input aria-label="Valor em reais" inputMode="decimal" placeholder="Valor (ex.: 49,90)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <Button type="submit" disabled={saving || missing} className="gap-2">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" aria-hidden />} Lançar</Button>
              </form>

              {inMonth.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum lançamento neste mês.</p>
              ) : (
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Data</TableHead><TableHead>Tipo</TableHead><TableHead>Categoria</TableHead><TableHead>Descrição</TableHead><TableHead className="text-right">Valor</TableHead><TableHead className="w-12"><span className="sr-only">Excluir</span></TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {inMonth.map((e) => (
                        <TableRow key={e.id}>
                          <TableCell>{dayLabel(e.entry_date)}</TableCell>
                          <TableCell><Badge variant={e.kind === "receita" ? "default" : "secondary"}>{e.kind === "receita" ? "Receita" : "Despesa"}</Badge></TableCell>
                          <TableCell>{categoryLabel(e.kind, e.category)}</TableCell>
                          <TableCell className="max-w-[260px] truncate text-muted-foreground">{e.description ?? "—"}</TableCell>
                          <TableCell className={`text-right font-medium ${e.kind === "receita" ? "text-emerald-600" : "text-red-600"}`}>{e.kind === "receita" ? "+" : "−"} {formatBRL(e.amount_cents)}</TableCell>
                          <TableCell><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" aria-label={`Excluir lançamento de ${formatBRL(e.amount_cents)}`} onClick={() => void removeEntry(e)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
