-- Evita que duas abas/navegadores passem simultaneamente pelo mesmo limite diário.
-- O lock é curto e por usuário/dia; não bloqueia alunos diferentes.
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
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text || ':' || day_start::text, 0));
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
