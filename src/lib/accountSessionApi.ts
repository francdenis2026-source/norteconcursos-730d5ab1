import { supabase } from '@/integrations/supabase/client';

// One claim request per real auth session, even through React StrictMode cleanup.
const claims = new Map<string, Promise<boolean>>();
let rpcAvailable = true;

async function verify(userId: string, sessionKey: string, claim: boolean, signal: AbortSignal) {
  if (!/^norte_auth_activity:[0-9a-f-]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionKey))
    throw new Error('Authentication session identity is missing');
  if (rpcAvailable) {
    const { data, error } = await supabase.rpc('verify_account_session', { p_claim: claim }).abortSignal(signal);
    if (!error) {
      if (typeof data !== 'boolean') throw new Error('Invalid session verification response');
      return data;
    }
    // Compatible with the already deployed table until the hardened migration is applied.
    if (error.code !== 'PGRST202' && error.code !== '42883') throw error;
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

export function verifyAccountSession(userId: string, sessionKey: string, claim: boolean, signal: AbortSignal) {
  if (!claim) return verify(userId, sessionKey, false, signal);
  const key = `${userId}:${sessionKey}`;
  let pending = claims.get(key);
  if (!pending) {
    // The first component cleanup must not cancel a takeover halfway through.
    pending = verify(userId, sessionKey, true, AbortSignal.timeout(8000));
    claims.set(key, pending);
    // Retain a consumed claim even after a network failure: retries must never steal it back.
    pending.catch(() => {});
  }
  // A consumed claim is never proof of continued ownership after a remount.
  return pending.then(owns => owns ? verify(userId, sessionKey, false, signal) : false);
}
