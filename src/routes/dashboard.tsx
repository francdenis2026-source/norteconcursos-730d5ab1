import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuthStatus } from "@/hooks/useDashboard";

export const Route = createFileRoute("/dashboard")({ component: DashboardComponent });

function DashboardComponent() {
  const { user, isLoading, isAuthenticated, error, retry } = useAuthStatus();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hadSession = useRef(false);
  useEffect(() => {
    if (isAuthenticated && user) hadSession.current = true;
    if (
      !isLoading &&
      !error &&
      (!isAuthenticated || !user) &&
      (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
    ) {
      // Replace protected history entries, including sign-out from another tab.
      const to =
        !hadSession.current && pathname === "/dashboard/question-trainer" ? "/desafio-diario" : "/";
      void navigate({ to, replace: true });
    }
  }, [isLoading, isAuthenticated, user, pathname, navigate, error]);
  if (error && !user) return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-xl font-bold">Seu acesso ainda não foi confirmado</h1>
        <p role="alert">{error}</p>
        <button type="button" onClick={retry} className="rounded-lg border px-5 py-3 font-semibold">Tentar novamente</button>
      </div>
    </main>
  );
  if (isLoading || !isAuthenticated || !user)
    return (
      <main className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
        <p role="status">{isLoading ? "Verificando seu acesso…" : "Redirecionando…"}</p>
      </main>
    );
  return (
    <DashboardLayout key={user.id}>
      <Outlet />
    </DashboardLayout>
  );
}
