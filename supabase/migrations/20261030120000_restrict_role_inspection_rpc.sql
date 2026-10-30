-- Role lookup RPC is used by authenticated-user RLS policies.
-- Audit found 58 referencing policies, all scoped to authenticated.
-- Avoid exposing roles for arbitrary UUIDs through the anonymous Data API.
begin;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
commit;
