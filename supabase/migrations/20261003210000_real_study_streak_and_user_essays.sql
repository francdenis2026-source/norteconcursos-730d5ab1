-- Os valores antigos eram de teste/simulação: a contagem recomeça do zero, mas SÓ na primeira aplicação
-- (se a função já existe, esta migration já rodou e as ofensivas reais não podem ser apagadas).
do $$
begin
  if not exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'register_study_visit'
  ) then
    update public.user_streaks set current_streak = 0, longest_streak = 0, last_activity_date = null;
  end if;
end $$;

-- 1) Ofensiva real: conta apenas os dias (fuso do Acre) em que o aluno entrou na plataforma.
create or replace function public.register_study_visit()
returns table (current_streak integer, longest_streak integer, last_activity_date date)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  today date := public.get_current_acre_date();
  s public.user_streaks%rowtype;
  nxt integer;
begin
  if uid is null then return; end if;
  insert into public.user_streaks (user_id) values (uid) on conflict (user_id) do nothing;
  select * into s from public.user_streaks where user_id = uid for update;
  if s.last_activity_date is distinct from today then
    nxt := case when s.last_activity_date = today - 1 then s.current_streak + 1 else 1 end;
    update public.user_streaks
       set current_streak = nxt,
           longest_streak = greatest(s.longest_streak, nxt),
           last_activity_date = today,
           updated_at = now()
     where user_id = uid;
  end if;
  return query
    select u.current_streak, u.longest_streak, u.last_activity_date
    from public.user_streaks u where u.user_id = uid;
end $$;

revoke all on function public.register_study_visit() from public;
grant execute on function public.register_study_visit() to authenticated;

-- 2) Caderno de redação do aluno (salvar, editar, excluir).
create table if not exists public.user_essays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Sem título',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.user_essays enable row level security;
drop policy if exists "Users manage own written essays" on public.user_essays;
create policy "Users manage own written essays"
  on public.user_essays for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists set_user_essays_updated_at on public.user_essays;
create trigger set_user_essays_updated_at before update on public.user_essays
  for each row execute function public.set_updated_at();
