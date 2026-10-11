import { useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { dashboardHref } from "@/lib/internalNavigation";

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
    <button
      type="button"
      onClick={() => {
        if (dashboardHref(visited.current.get(index - 1) ?? "")) router.history.back();
      }}
      className="no-print mb-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label="Voltar à seção anterior da plataforma"
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar à seção anterior
    </button>
  );
}
