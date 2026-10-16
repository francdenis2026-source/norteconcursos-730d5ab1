-- Limite diário de questões aplicado no servidor (antes valia só na interface).
-- As regras abaixo espelham src/lib/launch.config.ts (effectiveTier) e src/lib/subscriptions.config.ts;
-- scripts/plan-tier.test.mjs confere que as constantes continuam iguais.

-- Plano em vigor agora: vencimento próprio vencido -> free; na fase de testes, free/essential sem vencimento
-- valem essential por 30 dias a partir do maior entre o cadastro e a abertura dos testes, e depois voltam a free.
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
      tier := 'essential';
    else
      tier := 'free';
    end if;
  end if;
  return tier;
end $$;
revoke all on function public.effective_plan_tier(uuid) from public, anon;
grant execute on function public.effective_plan_tier(uuid) to authenticated;

-- Questões por dia de cada plano; nulo = sem limite.
create or replace function public.daily_question_limit(p_tier text)
returns integer
language sql
immutable
as $$
  select case p_tier when 'free' then 20 when 'essential' then 100 else null end
$$;

create or replace function public.enforce_daily_question_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  tier text;
  lim integer;
  day_start timestamptz;
  used integer;
begin
  -- Reenvio da mesma resposta (upsert por id) não gasta outra questão.
  if exists (select 1 from public.question_training_responses where id = new.id) then
    return new;
  end if;
  -- Sem sessão de aluno (service role, importações) não há limite.
  if auth.uid() is null or new.user_id is distinct from auth.uid() then return new; end if;

  tier := public.effective_plan_tier(new.user_id);
  lim := public.daily_question_limit(tier);
  if lim is null then return new; end if;

  day_start := date_trunc('day', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco';
  select count(*) into used from public.question_training_responses
   where user_id = new.user_id and created_at >= day_start;
  if used >= lim then
    raise exception 'Limite diário de % questões do plano % atingido. Renova à meia-noite (horário do Acre).',
      lim, case tier when 'free' then 'Gratuito' when 'essential' then 'Essencial' else tier end
      using errcode = 'P0429';
  end if;
  return new;
end $$;

drop trigger if exists enforce_daily_question_limit on public.question_training_responses;
create trigger enforce_daily_question_limit
  before insert on public.question_training_responses
  for each row execute function public.enforce_daily_question_limit();
