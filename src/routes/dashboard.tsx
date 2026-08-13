import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEffect } from "react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
  loader: async () => {
    // In a real app, check auth here
    return {};
  },
});

function DashboardComponent() {
  const { isAuthenticated, isLoading } = useAuthStatus();

  useEffect(() => {
    if (isSupabaseConfigured && !isLoading && !isAuthenticated) {
      window.location.assign("/auth");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Validando acesso...
      </div>
    );
  }
  if (isSupabaseConfigured && !isAuthenticated) return null;

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
