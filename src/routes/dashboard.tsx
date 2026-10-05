import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuthStatus } from "@/hooks/useDashboard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { user, isLoading, isAuthenticated } = useAuthStatus();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname === "/dashboard/question-trainer")
      void navigate({ to: "/desafio-diario" });
  }, [isLoading, isAuthenticated, pathname, navigate]);
  if (isLoading)
    return (
      <main className="min-h-screen grid place-items-center">
        <p role="status">Verificando seu acesso…</p>
      </main>
    );
  if (!isAuthenticated || !user)
    return (
      <main className="min-h-dvh grid place-items-center px-6">
        <section className="max-w-xl text-center space-y-6">
          <span className="hero-chip">Sua preparação, seu histórico</span>
          <h1>Entre para acessar a plataforma.</h1>
          <p>Acompanhe suas questões, planos e resultados na sua própria conta.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link className="btn-brass" to="/auth">
              Entrar
            </Link>
            <Link className="btn-glass" to="/auth" search={{ mode: "register" }}>
              Criar conta grátis
            </Link>
          </div>
          <Link className="auth-link" to="/desafio-diario">
            Experimentar as 10 questões de hoje sem cadastro
          </Link>
        </section>
      </main>
    );
  return (
    <DashboardLayout key={user.id}>
      <Outlet />
    </DashboardLayout>
  );
}
