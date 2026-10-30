-- Legacy tier-check RPC should not be callable without a login.
-- Plan limits and feature access are NOT changed here; audit of this legacy implementation is pending.
begin;
revoke execute on function public.check_user_tier_limit(uuid, text) from public, anon;
grant execute on function public.check_user_tier_limit(uuid, text) to authenticated;
commit;
