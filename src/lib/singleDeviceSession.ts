import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "norte-active-session";

/** Identifica o aparelho/navegador (não a aba): abas do mesmo navegador compartilham a chave e não se derrubam. */
function sessionKey(userId: string) {
  const key = `${STORAGE_KEY}:${userId}`;
  try {
    let value = localStorage.getItem(key);
    if (!value) {
      value = crypto.randomUUID();
      localStorage.setItem(key, value);
    }
    return value;
  } catch {
    // sem armazenamento: chave estável só nesta aba
    return (memoryKeys[key] ??= crypto.randomUUID());
  }
}
const memoryKeys: Record<string, string> = {};

export async function claimSingleDeviceSession(userId: string) {
  if (typeof window === "undefined") return;
  const key = sessionKey(userId);
  const { error } = await supabase.from("active_user_sessions").upsert(
    { user_id: userId, session_key: key, last_seen_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );
  // A migration may still be pending; do not disrupt the local login then.
  return !error;
}

export async function ownsSingleDeviceSession(userId: string) {
  if (typeof window === "undefined") return true;
  const key = sessionKey(userId);
  const { data, error } = await supabase
    .from("active_user_sessions")
    .select("session_key")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return true;
  return !data || data.session_key === key;
}
