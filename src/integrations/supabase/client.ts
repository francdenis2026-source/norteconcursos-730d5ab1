import { createClient } from "@supabase/supabase-js";

// These fallback values are public client credentials. They keep Lovable previews
// operational when the local `.env.local` file is not available in the cloud build.
// Privileged credentials such as service_role must never be added here.
const supabaseUrl =
  import.meta.env["VITE_SUPABASE_URL"] ?? "https://gkwphadbveiyjcwiiizw.supabase.co";
const supabaseAnonKey =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
  "sb_publishable_hF4jXHTs4tapaOMX2KdqvA_N_A5Tyqf";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Cliente isolado para fluxos de autenticação que não podem substituir a sessão atual. */
export function createIsolatedSupabaseClient(storageKey: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, storageKey },
  });
}
