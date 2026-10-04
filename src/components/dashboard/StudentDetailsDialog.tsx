import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { PAYMENTS_ENABLED } from "@/lib/launch.config";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Details {
  id: string;
  full_name: string | null;
  email: string | null;
  cpf: string | null;
  created_at: string;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  tier: string;
  is_activated: boolean;
  expires_at: string | null;
  is_admin: boolean;
  last_study_date: string | null;
  current_streak: number;
  longest_streak: number;
  answered: number;
  correct: number;
  essays: number;
  exams: number;
  medals: number;
  paid_total_cents: number;
  payments: { entry_date: string; category: string; description: string | null; amount_cents: number; plan_id: string | null }[];
  plan_history: { event_type: string; old_tier: string | null; new_tier: string; created_at: string; reason: string | null }[];
}

export const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";
const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("pt-BR") : "—";
const money = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const planName = (id?: string | null) => SUBSCRIPTION_PLANS.find((p) => p.id === id)?.name ?? id ?? "—";
const formatCpf = (c?: string | null) =>
  c && c.length === 11 ? c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : (c ?? "—");

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2 rounded-lg border border-border p-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

export function StudentDetailsDialog({ userId, onClose }: { userId: string | null; onClose: () => void }) {
  const [d, setD] = useState<Details | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setD(null);
    setError(false);
    if (!userId) return;
    let alive = true;
    void supabase.rpc("admin_student_details", { _user_id: userId }).then(({ data, error: e }) => {
      if (!alive) return;
      if (e || !data) setError(true);
      else setD(data as unknown as Details);
    });
    return () => {
      alive = false;
    };
  }, [userId]);

  const expired = !!d?.expires_at && new Date(d.expires_at) < new Date();
  const pending: string[] = [];
  if (d) {
    if (!d.email_confirmed_at) pending.push("E-mail ainda não confirmado.");
    if (expired) pending.push(`Plano vencido em ${fmtDate(d.expires_at)}.`);
    if (d.tier !== "free" && d.tier !== "essential" && !d.is_activated) pending.push("Plano pago sem ativação.");
    if (!d.last_sign_in_at) pending.push("Nunca fez login.");
  }
  const rate = d && d.answered > 0 ? Math.round((d.correct / d.answered) * 100) : null;

  return (
    <Dialog open={!!userId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{d?.full_name || "Detalhes do aluno"}</DialogTitle>
          <DialogDescription>{d?.email ?? "Ficha de cadastro, acesso, plano e pagamentos."}</DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">Não foi possível carregar. Rode a migration admin_student_details no banco.</p>
        )}
        {!d && !error && <Loader2 className="mx-auto my-8 h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />}

        {d && (
          <div className="space-y-3">
            <Section title="Pendências">
              {pending.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Nenhuma pendência.
                </p>
              ) : (
                <ul className="space-y-1">
                  {pending.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertTriangle className="h-4 w-4" /> {p}
                    </li>
                  ))}
                </ul>
              )}
              {!PAYMENTS_ENABLED && (
                <p className="text-xs text-muted-foreground">Cobranças desativadas na fase de testes: não há pagamentos pendentes.</p>
              )}
            </Section>

            <Section title="Cadastro e acesso">
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <Field label="CPF" value={formatCpf(d.cpf)} />
                <Field label="Cadastro em" value={fmtDateTime(d.created_at)} />
                <Field
                  label="E-mail confirmado"
                  value={d.email_confirmed_at ? fmtDateTime(d.email_confirmed_at) : <Badge variant="outline">Não</Badge>}
                />
                <Field label="Último login" value={fmtDateTime(d.last_sign_in_at)} />
                <Field label="Último dia de estudo" value={fmtDate(d.last_study_date)} />
                <Field label="Papel" value={d.is_admin ? "Administrador" : "Aluno"} />
              </dl>
            </Section>

            <Section title="Plano">
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <Field label="Plano vigente" value={<Badge>{planName(d.tier)}</Badge>} />
                <Field label="Ativado" value={d.is_activated ? "Sim" : "Não"} />
                <Field label="Vencimento" value={d.expires_at ? fmtDate(d.expires_at) : "Sem vencimento"} />
              </dl>
              {d.plan_history.length > 0 && (
                <ul className="space-y-1 border-t border-border pt-2 text-xs text-muted-foreground">
                  {d.plan_history.map((h) => (
                    <li key={h.created_at + h.new_tier}>
                      {fmtDateTime(h.created_at)} · {planName(h.old_tier)} →{" "}
                      <strong className="text-foreground">{planName(h.new_tier)}</strong>
                      {h.reason ? ` · ${h.reason}` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Pagamentos">
              <p className="text-sm">
                Total recebido: <strong>{money(d.paid_total_cents)}</strong>
              </p>
              {d.payments.length === 0 ? (
                <p className="text-xs text-muted-foreground">Nenhum pagamento lançado no Financeiro para este aluno.</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {d.payments.map((p, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span className="text-muted-foreground">
                        {fmtDate(p.entry_date)} · {p.description || p.category}
                        {p.plan_id ? ` · ${planName(p.plan_id)}` : ""}
                      </span>
                      <strong>{money(p.amount_cents)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Atividade">
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Field label="Questões" value={d.answered} />
                <Field label="Acertos" value={rate === null ? "—" : `${d.correct} (${rate}%)`} />
                <Field label="Ofensiva" value={`${d.current_streak} dias (recorde ${d.longest_streak})`} />
                <Field label="Medalhas" value={d.medals} />
                <Field label="Redações salvas" value={d.essays} />
                <Field label="Provas enviadas" value={d.exams} />
              </dl>
            </Section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
