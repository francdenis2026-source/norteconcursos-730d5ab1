import { supabase, supabaseUrl, supabaseAnonKey } from '@/integrations/supabase/client';

// One claim request per real auth session, even through React StrictMode cleanup.
const claims = new Map<string, Promise<boolean>>();
let rpcAvailable = true;

async function verify(userId: string, sessionKey: string, claim: boolean, signal: AbortSignal, accessToken: string) {
  if (!/^norte_auth_activity:[0-9a-f-]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionKey))
    throw new Error('Authentication session identity is missing');
  if (rpcAvailable) {
    // Check with the already-issued token. The SDK's getSession/storage lock must
    // never be a prerequisite for deciding whether this session still owns access.
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/verify_account_session`, {
      method: 'POST', cache: 'no-store', signal,
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_claim: claim }),
    });
    const data = await response.json();
    if (response.ok) {
      if (typeof data !== 'boolean') throw new Error('Invalid session verification response');
      return data;
    }
    // Compatible with the already deployed table until the hardened migration is applied.
    if (data?.code !== 'PGRST202' && data?.code !== '42883') throw new Error(`Session verification failed (${response.status}, ${data?.code ?? 'unknown'})`);
    rpcAvailable = false;
  }
  const table = supabase.from('active_user_sessions');
  if (claim) {
    const { error } = await table.upsert({ user_id: userId, session_key: sessionKey }, { onConflict: 'user_id' }).abortSignal(signal);
    if (error) throw error;
  } else {
    const existing = await table.select('session_key').eq('user_id', userId).abortSignal(signal).maybeSingle();
    if (existing.error) throw existing.error;
    if (existing.data) return existing.data.session_key === sessionKey;
    // First deployment/adoption only: a resumed session may fill an empty row,
    // but must never overwrite a different session, including concurrent inserts.
    const { error } = await table.upsert({ user_id: userId, session_key: sessionKey }, { onConflict: 'user_id', ignoreDuplicates: true }).abortSignal(signal);
    if (error) throw error;
  }
  const result = await table.select('session_key').eq('user_id', userId).abortSignal(signal).single();
  if (result.error) throw result.error;
  return result.data?.session_key === sessionKey;
}

export function verifyAccountSession(userId: string, sessionKey: string, claim: boolean, signal: AbortSignal, accessToken: string) {
  if (!claim) return verify(userId, sessionKey, false, signal, accessToken);
  const key = `${userId}:${sessionKey}`;
  let pending = claims.get(key);
  if (!pending) {
    // The first component cleanup must not cancel a takeover halfway through.
    pending = verify(userId, sessionKey, true, AbortSignal.timeout(8000), accessToken);
    claims.set(key, pending);
    // Retain a consumed claim even after a network failure: retries must never steal it back.
    pending.catch(() => {});
  }
  // A consumed claim is never proof of continued ownership after a remount.
  return pending.then(owns => owns ? verify(userId, sessionKey, false, signal, accessToken) : false);
}
