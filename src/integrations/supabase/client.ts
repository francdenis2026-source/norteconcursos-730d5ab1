import { createClient } from "@supabase/supabase-js";
import { createEmailAuthCallbackFlow, readEmailAuthCallback } from "@/lib/authCallback";

// These fallback values are public client credentials. They keep Lovable previews
// operational when the local `.env.local` file is not available in the cloud build.
// Privileged credentials such as service_role must never be added here.
export const supabaseUrl =
  import.meta.env["VITE_SUPABASE_URL"] ?? "https://gkwphadbveiyjcwiiizw.supabase.co";
export const supabaseAnonKey =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
  "sb_publishable_hF4jXHTs4tapaOMX2KdqvA_N_A5Tyqf";

export const emailAuthCallback = typeof window !== "undefined"
  ? readEmailAuthCallback(window.location.href)
  : { present: false, recovery: false };
const authStorageKey = `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { storageKey: authStorageKey } });

/** Fallback for idle expiry when the auth request/lock is stalled. A hard navigation follows. */
export function clearPersistedAuthSession() {
  for (const key of [authStorageKey, `${authStorageKey}-user`, `${authStorageKey}-code-verifier`]) {
    try { localStorage.removeItem(key); } catch { /* unavailable storage */ }
  }
}

// Reuse verification across the root, auth page and StrictMode mounts: links are single-use.
const callbackFlow = createEmailAuthCallbackFlow(supabase.auth, emailAuthCallback);
export const hasPendingEmailAuthCallback = callbackFlow.hasPending;
export const isEmailRecoveryPending = callbackFlow.recoveryPending;
export const markEmailAuthCallbackHandled = callbackFlow.markHandled;
export const completeEmailAuthCallback = callbackFlow.complete;

/** Cliente isolado para fluxos de autenticação que não podem substituir a sessão atual. */
export function createIsolatedSupabaseClient(storageKey: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, storageKey },
  });
}

/** Public presence never receives account tokens or consumes an email callback URL. */
export function createPublicPresenceClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: "norte-public-presence",
    },
  });
}
