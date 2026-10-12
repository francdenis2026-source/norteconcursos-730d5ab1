import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "norte-active-session";

function sessionKey(userId: string) {
  const key = `${STORAGE_KEY}:${userId}`;
  let value = sessionStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    sessionStorage.setItem(key, value);
  }
  return value;
}

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
