-- Selo público "usuários cadastrados" + notificação ao vivo de novos cadastros na
-- homepage (visitantes não logados também veem). Dois pedaços, pensados para não
-- expor nenhum dado pessoal a um visitante anônimo:
--
--   1) get_public_user_count(): RPC security definer que devolve só a contagem
--      total de auth.users (nenhuma linha, nenhuma coluna de public.profiles).
--   2) public.signup_pulses: tabela só com (id, created_at) por cadastro,
--      alimentada por um trigger no mesmo "after insert on auth.users" já usado
--      por handle_new_user. Sem nome, email ou qualquer outro dado da pessoa.
--      Publicada no canal supabase_realtime para o navegador reagir ao INSERT
--      e disparar a animação, sem precisar expor a tabela de perfis.

create or replace function public.get_public_user_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select count(*) from auth.users;
$$;

revoke all on function public.get_public_user_count() from public;
grant execute on function public.get_public_user_count() to anon, authenticated;

create table if not exists public.signup_pulses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.signup_pulses enable row level security;

drop policy if exists "Anyone can read signup pulses" on public.signup_pulses;
create policy "Anyone can read signup pulses"
  on public.signup_pulses for select
  to anon, authenticated
  using (true);

-- Só a função de trigger (security definer) grava aqui; nenhum papel pode inserir direto.
revoke insert, update, delete on public.signup_pulses from anon, authenticated;

create or replace function public.handle_new_user_signup_pulse()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.signup_pulses (created_at) values (now());
  -- Mantém só os últimos pulsos: a UI só usa os mais recentes para animar.
  delete from public.signup_pulses
  where id in (
    select id from public.signup_pulses order by created_at desc offset 200
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_signup_pulse on auth.users;
create trigger on_auth_user_created_signup_pulse
  after insert on auth.users
  for each row execute function public.handle_new_user_signup_pulse();

do $$
begin
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime') then
    if not exists (select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'signup_pulses') then
      alter publication supabase_realtime add table public.signup_pulses;
    end if;
  end if;
end;
$$;
