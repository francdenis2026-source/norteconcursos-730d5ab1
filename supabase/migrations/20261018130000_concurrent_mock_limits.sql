-- Evita que duas abas/navegadores ultrapassem simultaneamente a cota mensal de simulados.
create or replace function public.enforce_monthly_mock_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  tier text;
  lim integer;
  month_start timestamptz;
  used integer;
begin
  if exists (select 1 from public.simulator_attempts where id = new.id) then return new; end if;
  if auth.uid() is null or new.user_id is distinct from auth.uid() then return new; end if;

  tier := public.effective_plan_tier(new.user_id);
  if tier = 'admin' then return new; end if;
  if tier = 'free' and new.total_questions > 20 then
    raise exception 'No plano Gratuito o simulado é curto: até 20 questões.' using errcode = 'P0403';
  end if;

  lim := public.monthly_mock_limit(tier);
  if lim is null then return new; end if;

  month_start := date_trunc('month', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco';
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text || ':' || month_start::text || ':mock', 0));
  select count(*) into used from public.simulator_attempts
   where user_id = new.user_id and created_at >= month_start;
  if used >= lim then
    raise exception 'Limite de % simulado(s) por mês do plano % atingido. Renova no dia 1º (horário do Acre).',
      lim, case tier when 'free' then 'Gratuito' when 'essential' then 'Essencial' else tier end
      using errcode = 'P0429';
  end if;
  return new;
end $$;

drop trigger if exists enforce_monthly_mock_limit on public.simulator_attempts;
create trigger enforce_monthly_mock_limit before insert on public.simulator_attempts
  for each row execute function public.enforce_monthly_mock_limit();
