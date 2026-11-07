-- Liberação geral da plataforma (06/11/2026): licenças pagas revogadas. Durante a fase de testes,
-- toda conta — Gratuita, Essencial, Plus ou Premium gravada — vale como Plus por 6 meses (182 dias)
-- a partir do maior entre o cadastro e esta abertura, ignorando qualquer vencimento pago gravado.
-- Mesma regra do aplicativo (launch.config.ts: effectiveTier/isTestingTier/planEndsAt).
create or replace function public.effective_plan_tier(p_user uuid)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  testing_phase constant boolean := true;
  testing_opened_at constant timestamptz := timestamptz '2026-11-06 00:00:00-05';
  testing_days constant integer := 182;
  testing_tier constant text := 'plus';
  tier text;
  created timestamptz;
  expires timestamptz;
  start_at timestamptz;
begin
  if public.has_role(p_user, 'admin') then return 'admin'; end if;
  select coalesce(subscription_tier, 'free'), created_at, subscription_expires_at
    into tier, created, expires
    from public.profiles where id = p_user;
  if not found then return 'free'; end if;
  if testing_phase and created is not null then
    start_at := greatest(created, testing_opened_at);
    if start_at + make_interval(days => testing_days) > now() then
      return testing_tier;
    end if;
    return 'free';
  end if;
  if expires is not null and expires < now() then tier := 'free'; end if;
  return tier;
end $$;
revoke all on function public.effective_plan_tier(uuid) from public, anon;
grant execute on function public.effective_plan_tier(uuid) to authenticated;
