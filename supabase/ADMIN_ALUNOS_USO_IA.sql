-- Norte Concurso — Registro de uso do Treinador com IA por aluno
-- Rode este arquivo UMA vez no SQL Editor do banco (antes ou depois do REGRAVAR_PROVAS_69598193268.sql).

create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  used_on date not null default current_date,
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_logs_user_idx on public.ai_usage_logs (user_id, used_on);

grant select, insert on public.ai_usage_logs to authenticated;
grant all on public.ai_usage_logs to service_role;

alter table public.ai_usage_logs enable row level security;

drop policy if exists "Users insert own ai usage" on public.ai_usage_logs;
create policy "Users insert own ai usage" on public.ai_usage_logs
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users view own ai usage" on public.ai_usage_logs;
create policy "Users view own ai usage" on public.ai_usage_logs
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Admins view all ai usage" on public.ai_usage_logs;
create policy "Admins view all ai usage" on public.ai_usage_logs
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Garante o papel de administrador para a conta do dono
insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'francdenisbr@gmail.com'
on conflict (user_id, role) do nothing;
