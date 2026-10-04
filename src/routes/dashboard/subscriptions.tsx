import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { getDailyLimit, getUsedToday } from "@/lib/aiSolverStore";
import { cn } from "@/lib/utils";
import { SoonBadge } from "@/components/SoonBadge";
import { PlanCountdown } from "@/components/dashboard/PlanCountdown";
import { AI_ENABLED, PAYMENTS_ENABLED, PAYMENTS_NOTICE, TESTING_NOTICE, TESTING_PHASE, isTestingTier } from "@/lib/launch.config";

export const Route = createFileRoute("/dashboard/subscriptions")({
  head: () => ({
    meta: [
      { title: "Planos e assinatura | Norte Concurso" },
      { name: "description", content: "Compare os planos do Norte Concurso e veja quantas resoluções com IA você pode usar por dia." },
      { property: "og:title", content: "Planos e assinatura | Norte Concurso" },
      { property: "og:description", content: "Planos com limites diários do Treinador com IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const { user, isAdmin } = useAuthStatus();
  const tier = user?.subscription_tier ?? "free";
  const limit = getDailyLimit(tier, isAdmin);
  const [used, setUsed] = useState(0);
  useEffect(() => setUsed(getUsedToday(user?.id ?? "demo-user")), [user?.id]);
  const pct = limit === "unlimited" ? 100 : Math.min(100, Math.round((used / Math.max(1, limit)) * 100));

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <header className="space-y-1">
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <Crown className="h-4 w-4" aria-hidden /> Assinatura
        </p>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Planos e uso</h1>
      </header>

      {((TESTING_PHASE && isTestingTier(tier)) || !PAYMENTS_ENABLED) && (
        <div role="status" className="space-y-1 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-foreground">
          {TESTING_PHASE && isTestingTier(tier) && <p><strong>Fase de testes.</strong> {TESTING_NOTICE}</p>}
          {!PAYMENTS_ENABLED && <p>{PAYMENTS_NOTICE}</p>}
        </div>
      )}

      {user?.plan_ends_at && (
        <PlanCountdown endsAt={user.plan_ends_at} planName={SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? "Gratuito"} />
      )}

      <Card>
        <CardContent className="space-y-2 pt-6">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-foreground">
              Plano atual: <strong>{SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? "Gratuito"}</strong>
              {isAdmin && " (administrador)"}
            </span>
            {AI_ENABLED ? (
              <span className="text-muted-foreground">
                Resoluções com IA hoje: {used} / {limit === "unlimited" ? "ilimitado" : limit}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground">Resoluções com IA <SoonBadge /></span>
            )}
          </div>
          {AI_ENABLED && (
            <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const current = plan.id === tier;
          return (
            <Card key={plan.id} className={cn("flex flex-col", current && "border-primary ring-1 ring-primary")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {current ? <Badge>Atual</Badge> : plan.isPopular && <Badge variant="secondary">Popular</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <p className="pt-2 text-2xl font-bold text-foreground">
                  {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/mês</span>}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="flex-1 space-y-2 text-sm">
                  {Object.entries(plan.features).map(([key, f]) => (
                    <li key={key} className={cn("flex gap-2", !f.included && "text-muted-foreground")}>
                      {f.included ? <Check className="h-4 w-4 shrink-0 text-primary" /> : <X className="h-4 w-4 shrink-0" />}
                      <span className="flex flex-wrap items-center gap-2">
                        {f.name}
                        {key === "aiSolver" && !AI_ENABLED ? <SoonBadge /> : typeof f.limit === "number" && `: ${f.limit}`}
                      </span>
                    </li>
                  ))}
                </ul>
                {current ? (
                  <Button variant="outline" disabled>Seu plano</Button>
                ) : plan.price > 0 ? (
                  PAYMENTS_ENABLED ? (
                    <Button asChild>
                      <Link to="/checkout/$planId" params={{ planId: plan.id }}>Assinar {plan.name}</Link>
                    </Button>
                  ) : (
                    <Button disabled aria-label={`Assinar ${plan.name} — em breve`}>Em breve</Button>
                  )
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
