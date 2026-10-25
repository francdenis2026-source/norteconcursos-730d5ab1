import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, FlaskConical, Minus, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanCountdown } from "@/components/dashboard/PlanCountdown";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useMyCancellations } from "@/hooks/useCancellations";
import { scheduledCancellation } from "@/lib/cancellation";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";
import { PLAN_ROWS, planValue } from "@/lib/planPresentation";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";

const planOf = (id: string) => SUBSCRIPTION_PLANS.find((plan) => plan.id === id);

/** Plano em vigor, prazo do período de testes e o que a conta ganha ou perde quando ele acaba. */
export function PlanStatusCard() {
  const { user, isAdmin } = useAuthStatus();
  const cancellations = useMyCancellations(user?.id);
  if (!user || user.id === "demo-user") return null;
  const scheduled = scheduledCancellation(cancellations.list);
  const current = planOf(user.subscription_tier) ?? SUBSCRIPTION_PLANS[0]!;
  const free = planOf("free")!;
  const testing = TESTING_PHASE && !isAdmin && !!user.on_trial && !!user.plan_ends_at;
  const expired = !isAdmin && !!user.expired_plan;
  const paidEnds =
    !testing && !isAdmin && current.id !== "free" ? user.subscription_expires_at : null;
  const rows = PLAN_ROWS.map(([key, label]) => ({
    label,
    value: planValue(key, current.features[key]),
    next: planValue(key, free.features[key]),
  })).filter((row) => row.value !== null || row.next !== null);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-secondary" /> Seu plano
            </CardTitle>
            <CardDescription>
              {isAdmin
                ? "Conta de administração: sem limites de plano."
                : expired
                  ? "Seu período de testes terminou e a conta voltou ao plano Gratuito."
                  : testing
                    ? `Fase de testes: ${TESTING_DAYS} dias com os recursos do plano Plus, de graça.`
                    : current.description}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="px-3 py-1 text-sm">
              {isAdmin ? "Administrador" : `Plano ${current.name}`}
            </Badge>
            {testing && (
              <Badge variant="outline" className="gap-1 px-3 py-1 text-sm">
                <FlaskConical className="h-3.5 w-3.5" /> Período de testes
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduled && (
          <div className="rounded-lg border border-amber-500/40 bg-card p-3.5 text-sm text-foreground">
            <p className="font-bold">Cancelamento agendado</p>
            <p className="mt-1">
              Você continua no plano {scheduled.plan_name} até{" "}
              <strong>
                {new Date(scheduled.effective_until).toLocaleDateString("pt-BR", {
                  dateStyle: "long",
                  timeZone: "America/Rio_Branco",
                })}
              </strong>
              . Depois disso a conta volta ao plano Gratuito e a renovação é liberada. Recibo{" "}
              {scheduled.receipt_number}.
            </p>
          </div>
        )}
        {testing && user.plan_ends_at && (
          <PlanCountdown endsAt={user.plan_ends_at} planName="Plus (testes)" />
        )}
        {paidEnds && <PlanCountdown endsAt={paidEnds} planName={current.name} />}
        {!isAdmin && (testing || expired || current.id === "free") && (
          <div className="rounded-lg border border-border p-3.5">
            <p className="text-sm font-bold">
              {current.id === "free"
                ? "O que o plano Gratuito inclui"
                : "Depois dos testes, a conta segue no plano Gratuito"}
            </p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {rows.map((row) => {
                const shown = current.id === "free" ? row.value : row.next;
                return (
                  <li key={row.label} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      {shown ? (
                        <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground" aria-hidden />
                      )}
                      {row.label}
                    </span>
                    <span className={shown ? "font-semibold" : "text-muted-foreground"}>
                      {shown ?? "Planos pagos"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {!isAdmin && (
          <Link
            to="/dashboard/subscriptions"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            Comparar todos os planos <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
