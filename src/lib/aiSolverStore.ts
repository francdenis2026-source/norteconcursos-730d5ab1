/**
 * Armazenamento local (por aluno) do Treinador com IA:
 * - contagem diária de uso para aplicar o limite do plano;
 * - resoluções salvas no caderno do aluno.
 * Dados ficam no navegador enquanto o banco online não está ligado a este recurso.
 */
import type { SubscriptionTier } from "@/types";
import { checkFeatureAccess } from "@/lib/subscriptions.config";

export interface SavedResolution {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

const usageKey = (userId: string) => `nc_ai_usage_${userId}`;
const notebookKey = (userId: string) => `nc_ai_notebook_${userId}`;
const today = () => new Date().toISOString().slice(0, 10);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getDailyLimit(tier: SubscriptionTier, isAdmin = false): number | "unlimited" {
  if (isAdmin) return "unlimited";
  const f = checkFeatureAccess(tier, "aiSolver");
  return f.included ? (f.limit ?? 0) : 0;
}

export function getUsedToday(userId: string): number {
  const u = read<{ date: string; count: number }>(usageKey(userId), { date: today(), count: 0 });
  return u.date === today() ? u.count : 0;
}

export function registerUse(userId: string): void {
  window.localStorage.setItem(
    usageKey(userId),
    JSON.stringify({ date: today(), count: getUsedToday(userId) + 1 }),
  );
  // Registro online (best effort) para o painel do administrador.
  void import("@/integrations/supabase/client")
    .then(async ({ supabase }) => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user.id) {
        await supabase.from("ai_usage_logs").insert({ user_id: data.session.user.id });
      }
    })
    .catch(() => undefined);
}

export function listResolutions(userId: string): SavedResolution[] {
  return read<SavedResolution[]>(notebookKey(userId), []);
}

export function saveResolution(userId: string, question: string, answer: string): SavedResolution {
  const item: SavedResolution = {
    id: `ai-${Date.now()}`,
    question,
    answer,
    createdAt: new Date().toISOString(),
  };
  const list = [item, ...listResolutions(userId)].slice(0, 200);
  window.localStorage.setItem(notebookKey(userId), JSON.stringify(list));
  return item;
}

export function deleteResolution(userId: string, id: string): void {
  const list = listResolutions(userId).filter((r) => r.id !== id);
  window.localStorage.setItem(notebookKey(userId), JSON.stringify(list));
}
