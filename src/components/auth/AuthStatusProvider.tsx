import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { SubscriptionTier, UserProfile } from "@/types";
import { setStorageOwner } from "@/lib/userStorage";
import { effectiveTier, planEndsAt } from "@/lib/launch.config";
import { platformDate } from "@/lib/platformClock";
import { createSessionProfileLoader } from "@/lib/sessionProfileLoader";

type AuthStatus = {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  retry: () => void;
};
const AuthContext = createContext<AuthStatus | null>(null);

async function loadProfile(session: Session): Promise<UserProfile> {
  const [profileRes, rolesRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .abortSignal(AbortSignal.timeout(10000))
      .single(),
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .abortSignal(AbortSignal.timeout(10000)),
  ]);
  const profile = profileRes.data;
  const roles = (rolesRes.data ?? []).map((row) => row.role);
  const topRole = roles.includes("admin")
    ? "admin"
    : roles.includes("moderator")
      ? "moderator"
      : "user";
  // Lógica de data efetiva: se o plano expirou, volta para free
  // Plano em vigor: vencimento próprio e fase de testes (regra única em launch.config).
  const eff = effectiveTier(
    profile?.subscription_tier,
    profile?.created_at,
    profile?.subscription_expires_at,
  );
  const currentTier = eff.tier as SubscriptionTier;
  const expiredFrom = eff.expiredFrom;
  const expiredByDate =
    !!profile?.subscription_expires_at &&
    new Date(profile.subscription_expires_at) < platformDate();
  const isActivated = expiredByDate ? false : !!profile?.is_activated;

  return {
    id: session.user.id,
    avatar_url: profile?.avatar_url ?? undefined,
    full_name: profile?.full_name || session.user.user_metadata["full_name"] || "Usuário",
    name: profile?.full_name || session.user.user_metadata["full_name"] || "Usuário",
    email: session.user.email || "",
    subscription_tier: currentTier,
    subscription_expires_at: profile?.subscription_expires_at,
    plan_ends_at: expiredFrom
      ? null
      : planEndsAt(
          profile?.created_at,
          profile?.subscription_tier ?? "free",
          profile?.subscription_expires_at,
        ),
    on_trial: eff.trial === true,
    expired_plan: expiredFrom,
    onboarding_completed: !!profile?.onboarding_completed,
    onboarding_progress: profile?.onboarding_progress || {},
    is_activated: isActivated,
    role: topRole as "admin" | "moderator" | "user",
  };
}

/** One verified profile for the whole application, never persisted between users. */
export function AuthStatusProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    let active = true;
    let settled = false;
    setError(null);
    setIsLoading(true);
    // getSession can wait for a stalled refresh before any auth event is emitted.
    // End the loading screen without discarding tokens or treating timeout as logout.
    const deadline = window.setTimeout(() => {
      if (!active || settled) return;
      setError("Não foi possível verificar seu acesso. Confira sua conexão e tente novamente.");
      setIsLoading(false);
    }, 15_000);
    let eventVersion = 0;
    let currentSession: Session | null = null;
    let lastRefresh = 0;
    const deferred = new Set<number>();
    const loader = createSessionProfileLoader<Session, UserProfile>({
      identify: (session) => session.user.id,
      load: loadProfile,
      publish: (profile) => {
        settled = true;
        window.clearTimeout(deadline);
        setError(null);
        setUser((previous) =>
          JSON.stringify(previous) === JSON.stringify(profile) ? previous : profile,
        );
        setIsLoading(false);
        lastRefresh = Date.now();
      },
      change: (session) => {
        if (session === null) {
          settled = true;
          window.clearTimeout(deadline);
        }
        setError(null);
        setStorageOwner(session?.user.id ?? null);
        setUser(null);
        setIsLoading(session !== null);
      },
      fail: (error) => {
        console.error("Falha ao verificar perfil", error);
        settled = true;
        window.clearTimeout(deadline);
        setError("Não foi possível carregar seu perfil. Confira sua conexão e tente novamente.");
        setIsLoading(false);
      },
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      eventVersion++;
      currentSession = session;
      // Clear previous-account access synchronously, but defer SDK reads out
      // of Supabase's auth lock. Identical pending reads share one promise.
      loader.select(session);
      const timer = window.setTimeout(() => {
        deferred.delete(timer);
        if (active && currentSession === session) void loader.run(session);
      }, 0);
      deferred.add(timer);
    });
    const initialVersion = eventVersion;
    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active || eventVersion !== initialVersion) return;
        if (error) throw error;
        currentSession = data.session;
        return loader.run(data.session);
      })
      .catch((error) => {
        if (!active || eventVersion !== initialVersion) return;
        console.error("Falha ao verificar autenticação", error);
        settled = true;
        window.clearTimeout(deadline);
        setError("Não foi possível verificar seu acesso. Confira sua conexão e tente novamente.");
        setIsLoading(false);
      });
    const refresh = () => {
      if (document.visibilityState !== "hidden" && Date.now() - lastRefresh > 30_000) {
        void loader.run(currentSession);
      }
    };
    const refreshProfile = () => {
      void loader.run(currentSession);
    };
    const interval = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("norte:profile-updated", refreshProfile);
    return () => {
      active = false;
      window.clearTimeout(deadline);
      loader.dispose();
      data.subscription.unsubscribe();
      deferred.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("norte:profile-updated", refreshProfile);
    };
  }, [attempt]);
  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user && user.id !== "demo-user",
      isAdmin: user?.role === "admin",
      error,
      retry,
    }),
    [user, isLoading, error, retry],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthStatus() {
  const status = useContext(AuthContext);
  if (!status) throw new Error("useAuthStatus requires AuthStatusProvider");
  return status;
}
