import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { useAuthStatus } from "@/hooks/useDashboard";
import { acreDateKey } from "@/lib/acreTime";
import { FREE_DAILY_LIBRARY, checkFeatureAccess } from "@/lib/subscriptions.config";

const storageKey = (userId: string) => `norte_library_free:${userId}:${acreDateKey()}`;

function readOpened(userId: string): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey(userId)) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Plano Gratuito: abre até FREE_DAILY_LIBRARY materiais por dia (dia do Acre); reabrir um já aberto hoje
 * não gasta outro. O controle fica no aparelho: serve para orientar o aluno, não para impedir quem
 * apaga o armazenamento do navegador.
 */
export function LibraryDailyGate({ slug, children }: { slug: string; children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuthStatus();
  const limited =
    !isLoading &&
    !isAdmin &&
    !!user &&
    user.id !== "demo-user" &&
    checkFeatureAccess(user.subscription_tier, "library").limit === FREE_DAILY_LIBRARY;
  const [state, setState] = React.useState<"ok" | "blocked">("ok");

  React.useEffect(() => {
    if (!limited || !user) {
      setState("ok");
      return;
    }
    const opened = readOpened(user.id);
    if (opened.includes(slug)) return setState("ok");
    if (opened.length >= FREE_DAILY_LIBRARY) return setState("blocked");
    try {
      localStorage.setItem(storageKey(user.id), JSON.stringify([...opened, slug]));
    } catch {
      /* sem armazenamento: não bloqueia o aluno por falha do navegador */
    }
    setState("ok");
  }, [isLoading, limited, user, slug]);

  if (state === "ok") return <>{children}</>;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHero
        image="dashboard"
        size="lg"
        kicker="Limite diário do plano Gratuito"
        icon={Lock}
        title="Você abriu os materiais de hoje"
        description={`O plano Gratuito abre até ${FREE_DAILY_LIBRARY} materiais da Biblioteca e do percurso de leis por dia. O limite renova à meia-noite (horário do Acre), e os materiais que você já abriu hoje continuam disponíveis.`}
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
