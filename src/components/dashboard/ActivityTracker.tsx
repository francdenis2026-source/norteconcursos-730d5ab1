import { useEffect } from "react";
import { startActivityTracking } from "@/lib/activity";

/** Pause study accounting during inactivity without ending the authenticated session.
 * Supabase remains responsible for token refresh, expiry and server revocation.
 */
export function ActivityTracker() {
  useEffect(() => startActivityTracking(), []);
  return null;
}
