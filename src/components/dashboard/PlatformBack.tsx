import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { previousDashboardHref, recordVisit } from "@/lib/navHistory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Hint } from "@/components/ui/hint";

/** The dashboard layout persists between sections, so only known internal history is used. */
export function PlatformBack() {
  const location = useLocation();
  const router = useRouter();
  const [previous, setPrevious] = useState<string | null>(null);
  const index = location.state.__TSR_index;
  useEffect(() => {
    recordVisit(index, location.href);
    setPrevious(previousDashboardHref(index));
  }, [index, location.href]);
  if (!previous || previous === location.href) return (
    <Hint content={location.pathname === '/dashboard' ? 'Página inicial' : 'Área do aluno'} side="bottom">
      <Link to={location.pathname === '/dashboard' ? '/' : '/dashboard'} className="app-top-btn platform-back no-print" aria-label={location.pathname === '/dashboard' ? 'Ir para a página inicial' : 'Voltar à área do aluno'}><ArrowLeft aria-hidden="true" /></Link>
    </Hint>
  );
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => {
            if (previousDashboardHref(index)) router.history.back();
          }}
          className="app-top-btn platform-back no-print cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Voltar à seção anterior da plataforma"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Voltar à seção anterior</TooltipContent>
    </Tooltip>
  );
}
