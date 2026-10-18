-- Período de testes de 30 dias passa a valer como plano Plus (antes Essencial): tudo da plataforma liberado,
-- menos o que é só do Premium (análise das suas provas). Mesma regra do aplicativo (launch.config.ts).
-- Efeito nos limites do servidor: questões sem limite diário, simulados sem limite mensal, flashcards,
-- redação e cronograma liberados. Depois dos 30 dias a conta volta ao Gratuito.
create or replace function public.effective_plan_tier(p_user uuid)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  testing_phase constant boolean := true;
  testing_opened_at constant timestamptz := timestamptz '2026-10-03 00:00:00-05';
  testing_days constant integer := 30;
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
  if expires is not null and expires < now() then tier := 'free'; end if;
  if testing_phase and expires is null and tier in ('free', 'essential') then
    start_at := greatest(created, testing_opened_at);
    if start_at + make_interval(days => testing_days) > now() then
      tier := testing_tier;
    else
      tier := 'free';
    end if;
  end if;
  return tier;
end $$;
revoke all on function public.effective_plan_tier(uuid) from public, anon;
grant execute on function public.effective_plan_tier(uuid) to authenticated;
