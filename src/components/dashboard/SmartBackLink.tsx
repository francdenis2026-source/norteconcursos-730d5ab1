import * as React from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { currentHistoryIndex, previousDashboardHref } from "@/lib/navHistory";

/** Volta para a tela anterior de verdade (histórico); sem tela anterior na plataforma, usa o destino indicado. */
export function useSmartBack(): () => boolean {
  const router = useRouter();
  return React.useCallback(() => {
    if (!previousDashboardHref(currentHistoryIndex())) return false;
    router.history.back();
    return true;
  }, [router]);
}

type BackProps = {
  to: string;
  params?: object | undefined;
  search?: object | undefined;
  className?: string | undefined;
  children: React.ReactNode;
};

/** Link "Voltar": preserva o destino como reserva (abrir em nova aba, sem histórico), mas ao clicar volta para onde o aluno estava. */
export function SmartBackLink({ to, params, search, className, children }: BackProps) {
  const goBack = useSmartBack();
  return (
    <Link
      to={to as never}
      params={params as never}
      search={search as never}
      className={className}
      onClick={(event) => {
        const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (!modified && !event.defaultPrevented && goBack()) event.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}
