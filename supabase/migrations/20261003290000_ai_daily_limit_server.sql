-- Limite diário da IA aplicado no servidor (dia do Acre). O navegador não decide mais nada:
-- o servidor chama ai_try_consume() ANTES de gerar a resposta; se o limite acabou, recusa.

create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  used_on date not null default public.get_current_acre_date(),
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_logs_user_idx on public.ai_usage_logs (user_id, used_on);
alter table public.ai_usage_logs enable row level security;

-- O aluno só lê o próprio uso; quem grava é a função abaixo (não dá para forjar nem apagar).
drop policy if exists "Users insert own ai usage" on public.ai_usage_logs;
revoke insert, update, delete on public.ai_usage_logs from authenticated;
drop policy if exists "Users view own ai usage" on public.ai_usage_logs;
create policy "Users view own ai usage" on public.ai_usage_logs
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Admins view all ai usage" on public.ai_usage_logs;
create policy "Admins view all ai usage" on public.ai_usage_logs
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
grant select on public.ai_usage_logs to authenticated;

-- Reserva uma resolução. _limit nulo = ilimitado. Devolve false quando o limite do dia acabou.
create or replace function public.ai_try_consume(_limit integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  today date := public.get_current_acre_date();
  used integer;
begin
  if uid is null then return false; end if;
  perform pg_advisory_xact_lock(hashtext('ai:' || uid::text));  -- requisições simultâneas não furam o limite
  select count(*) into used from public.ai_usage_logs where user_id = uid and used_on = today;
  if _limit is not null and used >= _limit then return false; end if;
  insert into public.ai_usage_logs (user_id, used_on) values (uid, today);
  return true;
end $$;
revoke all on function public.ai_try_consume(integer) from public;
grant execute on function public.ai_try_consume(integer) to authenticated;

-- Quantas resoluções o usuário logado já usou hoje.
create or replace function public.ai_used_today()
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::int from public.ai_usage_logs
  where user_id = auth.uid() and used_on = public.get_current_acre_date()
$$;
revoke all on function public.ai_used_today() from public;
grant execute on function public.ai_used_today() to authenticated;
