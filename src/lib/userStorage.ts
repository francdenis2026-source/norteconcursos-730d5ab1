import { supabase } from "@/integrations/supabase/client";

let owner = "guest";
export function setStorageOwner(userId: string | null) {
  owner = userId || "guest";
}
export function userStorageKey(base: string) {
  return `${base}:${owner}`;
}
if (typeof window !== "undefined") {
  void supabase.auth
    .getSession()
    .then(({ data }) => setStorageOwner(data.session?.user.id ?? null));
  supabase.auth.onAuthStateChange((_event, session) => setStorageOwner(session?.user.id ?? null));
}
