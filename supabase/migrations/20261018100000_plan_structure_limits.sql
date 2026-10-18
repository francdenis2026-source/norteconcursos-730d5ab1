-- Estrutura de planos aprovada em 18/10/2026, aplicada também no servidor (antes valia só na interface):
--  * Simulados por mês (mês do Acre): Gratuito 1 e só curto (até 20 questões), Essencial 2, Plus e Premium sem limite.
--  * Criar cronograma por edital: do Essencial para cima (o que já foi criado continua do aluno).
-- Usa effective_plan_tier (migração 20261016160000): na fase de testes todas as contas valem como Essencial.
-- Só bloqueia CRIAR (insert). Sem sessão de aluno (service role, importações) não há limite.
begin;

create or replace function public.monthly_mock_limit(p_tier text)
returns integer language sql immutable as $$
  select case p_tier when 'free' then 1 when 'essential' then 2 else null end
$$;

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
  -- Reenvio da mesma tentativa (upsert por id) não gasta outro simulado.
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

-- Cronograma por edital: criar é do Essencial para cima.
drop trigger if exists block_free_plan_insert on public.cronograma_plans;
create trigger block_free_plan_insert before insert on public.cronograma_plans
  for each row execute function public.block_free_plan_insert();

commit;
