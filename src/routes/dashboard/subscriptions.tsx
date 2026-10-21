import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Volume2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { fetchUsedToday, getDailyLimit } from "@/lib/aiSolverStore";
import { fetchQuestionsAnsweredToday, getDailyQuestionLimit } from "@/lib/questionDailyLimit";
import { readOpened } from "@/components/dashboard/LibraryDailyGate";
import { FREE_DAILY_LIBRARY, checkFeatureAccess } from "@/lib/subscriptions.config";
import { cn } from "@/lib/utils";
import { SoonBadge } from "@/components/SoonBadge";
import { PlanCountdown } from "@/components/dashboard/PlanCountdown";
import {
  AI_ENABLED,
  PAYMENTS_ENABLED,
  PAYMENTS_NOTICE,
  TESTING_NOTICE,
  TESTING_PHASE,
} from "@/lib/launch.config";
import { PageHero } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/subscriptions")({
  head: () => ({
    meta: [
      { title: "Planos e assinatura | Norte Concurso" },
      {
        name: "description",
        content:
          "Compare os planos do Norte Concurso e veja quantas resoluções com IA você pode usar por dia.",
      },
      { property: "og:title", content: "Planos e assinatura | Norte Concurso" },
      { property: "og:description", content: "Planos com limites diários do Treinador com IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubscriptionsPage,
});

/** Barra de uso diário: usado / limite, ou só o total quando o plano não tem limite. */
function UsageMeter({
  label,
  used,
  limit,
  unit,
}: {
  label: string;
  used: number;
  limit: number | "unlimited";
  unit: string;
}) {
  const unlimited = limit === "unlimited";
  const pct = unlimited ? 100 : Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const full = !unlimited && used >= limit;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span
          className={cn(
            "tabular-nums",
            full ? "font-semibold text-amber-600" : "text-muted-foreground",
          )}
        >
          {unlimited ? `${used} hoje · ilimitado` : `${used} de ${limit} ${unit}`}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full transition-[width]", full ? "bg-amber-500" : "bg-primary")}
          style={{ width: unlimited ? "0%" : `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SubscriptionsPage() {
  const { user, isAdmin } = useAuthStatus();
  const tier = user?.subscription_tier ?? "free";
  const limit = getDailyLimit(tier, isAdmin);
  const [used, setUsed] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [libraryOpened, setLibraryOpened] = useState(0);
  const questionLimit = getDailyQuestionLimit(tier, isAdmin);
  const libraryLimited =
    !isAdmin && checkFeatureAccess(tier, "library").limit === FREE_DAILY_LIBRARY;
  useEffect(() => {
    if (user?.id && user.id !== "demo-user") {
      void fetchUsedToday().then(setUsed);
      void fetchQuestionsAnsweredToday(user.id).then(setAnswered);
      setLibraryOpened(readOpened(user.id).length);
    }
  }, [user?.id]);
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-4 md:px-6 md:pb-6">
      <PageHero
        image="dashboard"
        size="sm"
        kicker="Conta"
        icon={Crown}
        title={
          <>
            Planos e <em>uso</em>
          </>
        }
        description="Seu plano, o uso de recursos e o que cada plano oferece."
      />

      {!PAYMENTS_ENABLED && (
        <p role="status" className="text-sm text-muted-foreground">
          {TESTING_PHASE && user?.on_trial && user?.plan_ends_at
            ? "Fase de testes: o plano Plus é gratuito para todos, com tudo da plataforma exceto a análise das suas provas. Os planos pagos serão ativados em breve."
            : PAYMENTS_NOTICE}
        </p>
      )}

      {user?.plan_ends_at && (
        <PlanCountdown
          endsAt={user.plan_ends_at}
          planName={SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? "Gratuito"}
        />
      )}

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-primary/10 p-2 text-primary">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Estude também ouvindo</p>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                A leitura das questões usa a voz padrão do navegador e está disponível em todos os planos,
                quando o dispositivo oferece esse recurso.
              </p>
            </div>
          </div>
          <a
            href="/#planos"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Comparar planos
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            Seu plano: {SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? "Gratuito"}
            {isAdmin && " (administrador)"}
          </CardTitle>
          <CardDescription>
            Uso de hoje. Os limites renovam à meia-noite (horário do Acre).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageMeter
            label="Questões no Treinador"
            used={answered}
            limit={questionLimit}
            unit="questões"
          />
          {libraryLimited && (
            <UsageMeter
              label="Materiais da Biblioteca e das leis"
              used={libraryOpened}
              limit={FREE_DAILY_LIBRARY}
              unit="materiais"
            />
          )}
          {AI_ENABLED ? (
            <UsageMeter label="Resoluções com IA" used={used} limit={limit} unit="resoluções" />
          ) : (
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              Resoluções com IA <SoonBadge />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const current = plan.id === tier;
          return (
            <Card
              key={plan.id}
              className={cn("flex flex-col", current && "border-primary ring-1 ring-primary")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {current ? (
                    <Badge>Atual</Badge>
                  ) : (
                    plan.isPopular && <Badge variant="secondary">Popular</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <p className="pt-2 text-2xl font-bold text-foreground">
                  {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                  {plan.price > 0 && (
                    <span className="text-sm font-normal text-muted-foreground">/mês</span>
                  )}
                </p>
                {plan.annualPrice != null && (
                  <p className="text-sm text-muted-foreground">
                    Ou R$ {plan.annualPrice.toFixed(2).replace(".", ",")} por 12 meses
                    <span className="block text-xs">Economize 2 mensalidades no anual. Contratacao em breve.</span>
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="flex-1 space-y-2 text-sm">
                  {Object.entries(plan.features).map(([key, f]) => (
                    <li
                      key={key}
                      className={cn("flex gap-2", !f.included && "text-muted-foreground")}
                    >
                      {f.included ? (
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                      ) : (
                        <X className="h-4 w-4 shrink-0" />
                      )}
                      <span className="flex flex-wrap items-center gap-2">
                        {f.name}
                        {key === "aiSolver" && !AI_ENABLED ? (
                          <SoonBadge />
                        ) : (
                          typeof f.limit === "number" && `: ${f.limit}`
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                {current ? (
                  <Button variant="outline" disabled>
                    Seu plano
                  </Button>
                ) : plan.price > 0 ? (
                  PAYMENTS_ENABLED ? (
                    <Button asChild>
                      <Link to="/checkout/$planId" params={{ planId: plan.id }}>
                        Assinar {plan.name}
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled aria-label={`Assinar ${plan.name} — em breve`}>
                      Em breve
                    </Button>
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
