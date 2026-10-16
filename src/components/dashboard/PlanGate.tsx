import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS, checkFeatureAccess } from "@/lib/subscriptions.config";
import { TESTING_PHASE } from "@/lib/launch.config";

/** Menor plano que inclui o recurso, para dizer ao aluno onde ele passa a valer. */
function firstPlanWith(feature: string) {
  return SUBSCRIPTION_PLANS.find((plan) => plan.features[feature]?.included);
}

/**
 * Bloqueia uma área inteira quando o plano em vigor não inclui o recurso.
 * O plano vem de `effectiveTier` (useAuthStatus): quando o mês de testes termina, a conta já chega aqui
 * como Gratuita. Visitante e administrador não passam por esta regra.
 */
export function PlanGate({
  feature,
  title,
  image = "dashboard",
  children,
}: {
  feature: string;
  title: React.ReactNode;
  image?: React.ComponentProps<typeof PageHero>["image"];
  children: React.ReactNode;
}) {
  const { user, isAdmin, isLoading } = useAuthStatus();
  if (isLoading || isAdmin || !user || user.id === "demo-user") return <>{children}</>;
  if (checkFeatureAccess(user.subscription_tier, feature).included) return <>{children}</>;
  const plan = firstPlanWith(feature);
  const wasTesting = TESTING_PHASE && !!user.expired_plan;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHero
        image={image}
        size="lg"
        kicker="Disponível em planos pagos"
        icon={Lock}
        title={title}
        description={
          <>
            Este recurso não faz parte do plano Gratuito
            {plan ? ` e vale a partir do plano ${plan.name}` : ""}.{" "}
            {wasTesting
              ? "Seu período de testes terminou, mas você continua com as questões diárias do plano Gratuito."
              : "Você continua com as questões diárias e o que o plano Gratuito inclui."}
          </>
        }
        actions={
          <>
            <Link
              to="/dashboard/question-trainer"
              className="hero-btn-ghost inline-flex items-center px-4 text-sm"
            >
              Treinar questões
            </Link>
            <Link
              to="/dashboard/subscriptions"
              className="hero-btn-primary inline-flex items-center gap-2 px-4 text-sm"
            >
              Ver planos <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />
    </div>
  );
}
