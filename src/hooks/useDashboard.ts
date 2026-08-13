import { useState, useEffect } from "react";
import { DataService } from "../services/dataService";
import { isSupabaseConfigured, requireSupabase } from "../lib/supabase";
import type { Contest, PerformanceStats } from "../types";

export function useDashboardData() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [performance, contest] = await Promise.all([
          DataService.getPerformanceStats(),
          DataService.getFocusedContest(),
        ]);
        setStats(performance);
        setFocusedContest(contest);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // In a real app, we might listen to storage events or use a global state manager
  }, []);

  const refreshStats = async () => {
    setStats(await DataService.getPerformanceStats());
  };

  return { stats, focusedContest, isLoading, refreshStats };
}

export function useAuthStatus() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser({ name: "João Silva (Demo)", email: "joao.demo@norteconcurso.com.br", role: "Plus" });
      setIsLoading(false);
      return;
    }
    const client = requireSupabase();
    client.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setIsLoading(false);
        return;
      }
      const [{ data: profile }, { data: subscription }] = await Promise.all([
        client.from("profiles").select("full_name").eq("id", data.user.id).maybeSingle(),
        client
          .from("subscriptions")
          .select("plans(name)")
          .in("status", ["trialing", "active", "past_due"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      const plan = subscription?.plans as unknown as { name?: string } | null;
      setUser({
        name: profile?.full_name || data.user.email?.split("@")[0] || "Aluno",
        email: data.user.email || "",
        role: plan?.name || "Teste Gratuito",
      });
      setIsLoading(false);
    });
  }, []);

  return { user, isAuthenticated: !!user, isLoading };
}
