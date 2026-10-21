import { useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { dashboardHref } from "@/lib/internalNavigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** The dashboard layout persists between sections, so only known internal history is used. */
export function PlatformBack() {
  const location = useLocation();
  const router = useRouter();
  const visited = useRef(new Map<number, string>());
  const [previous, setPrevious] = useState<string | null>(null);
  const index = location.state.__TSR_index;
  useEffect(() => {
    visited.current.set(index, location.href);
    setPrevious(dashboardHref(visited.current.get(index - 1) ?? ""));
  }, [index, location.href]);
  if (!previous || previous === location.href) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => {
            if (dashboardHref(visited.current.get(index - 1) ?? "")) router.history.back();
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
