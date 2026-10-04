import { useState, useEffect } from "react";
import { MockService } from "../services/mockService";
import { Contest, PerformanceStats, UserResponse } from "../types";
import { supabase } from "@/integrations/supabase/client";

export function useDashboardData() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const performance = await MockService.getPerformanceStats();
      const contest = await MockService.getFocusedContest();
      const allContests = await MockService.getContests();
      setStats(performance);
      setFocusedContest(contest);
      setContests(allContests);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshStats = async () => {
    setStats(await MockService.getPerformanceStats());
  };

  return { stats, focusedContest, contests, isLoading, refreshStats };
}

import { SubscriptionTier, UserProfile } from "../types";
import { TESTING_PHASE, TESTING_TIER, planEndsAt } from "@/lib/launch.config";

export function useAuthStatus() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const applySession = async (
      session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"],
    ) => {
      if (session) {
        // Buscando perfil e roles diretamente do banco
        const [profileRes, rolesRes] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", session.user.id).single(),
          supabase.from("user_roles").select("role").eq("user_id", session.user.id),
        ]);

        const profile = profileRes.data;
        const roleList = (rolesRes.data ?? []).map((r) => r.role);
        const topRole = roleList.includes("admin")
          ? "admin"
          : roleList.includes("moderator")
            ? "moderator"
            : "user";

        // Lógica de data efetiva: se o plano expirou, volta para free
        let currentTier = (profile?.subscription_tier as SubscriptionTier) || "free";
        let isActivated = !!profile?.is_activated;
        let expiredFrom: string | undefined;

        if (profile?.subscription_expires_at) {
          const expiryDate = new Date(profile.subscription_expires_at);
          if (expiryDate < new Date()) {
            if (currentTier !== "free") expiredFrom = currentTier;
            currentTier = "free";
            isActivated = false;
          }
        }

        // Fase de testes: free/essencial sem vencimento próprio usam o plano de testes por 30 dias.
        // Passado o prazo, voltam ao plano Gratuito e o app oferece a renovação.
        const hasOwnExpiry = !!profile?.subscription_expires_at;
        if (TESTING_PHASE && !hasOwnExpiry && (currentTier === "free" || currentTier === TESTING_TIER)) {
          const end = planEndsAt(profile?.created_at, currentTier, null);
          if (end && new Date(end) > new Date()) currentTier = TESTING_TIER;
          else {
            currentTier = "free";
            expiredFrom = TESTING_TIER;
          }
        }

        if (!active) return;
        setUser({
          id: session.user.id,
          avatar_url: profile?.avatar_url ?? undefined,
          full_name: profile?.full_name || session.user.user_metadata["full_name"] || "Usuário",
          name: profile?.full_name || session.user.user_metadata["full_name"] || "Usuário",
          email: session.user.email || "",
          subscription_tier: currentTier,
          subscription_expires_at: profile?.subscription_expires_at,
          plan_ends_at: expiredFrom ? null : planEndsAt(profile?.created_at, currentTier, profile?.subscription_expires_at),
          expired_plan: expiredFrom,
          onboarding_completed: !!profile?.onboarding_completed,
          onboarding_progress: profile?.onboarding_progress || {},
          is_activated: isActivated,
          role: topRole as "admin" | "moderator" | "user",
        });
      } else {
        // Fallback para modo demo/visitante
        if (!active) return;
        setUser({
          id: "demo-user",
          full_name: "João Silva (Demo)",
          name: "João Silva (Demo)",
          email: "joao.demo@norteconcurso.com.br",
          subscription_tier: "plus",
          onboarding_completed: false,
          onboarding_progress: {},
          is_activated: true,
          role: "user",
        });
      }
    };

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        await applySession(data.session);
      } catch (error) {
        console.error("Falha ao verificar autenticação", error);
        if (active) setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Do not call getSession from inside the auth callback. It can wait on
      // the same auth lock and leave every dashboard route loading forever.
      window.setTimeout(() => {
        void applySession(session).finally(() => {
          if (active) setIsLoading(false);
        });
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isAuthenticated: !!user && user.id !== "demo-user",
    isLoading,
    isAdmin: user?.role === "admin",
  };
}
