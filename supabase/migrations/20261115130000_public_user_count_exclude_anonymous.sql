-- Selo "cadastrados" da homepage: só conta quem realmente se cadastrou.
-- As contas anônimas do Desafio diário (visitantes sem cadastro) não entram no total
-- e também não disparam o aviso ao vivo de "novo cadastro".

create or replace function public.get_public_user_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select count(*) from auth.users where not coalesce(is_anonymous, false);
$$;

revoke all on function public.get_public_user_count() from public;
grant execute on function public.get_public_user_count() to anon, authenticated;

create or replace function public.handle_new_user_signup_pulse()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Visitante anônimo do desafio não é um cadastro.
  if coalesce(new.is_anonymous, false) then
    return new;
  end if;
  insert into public.signup_pulses (created_at) values (now());
  -- Mantém só os últimos pulsos: a UI só usa os mais recentes para animar.
  delete from public.signup_pulses
  where id in (
    select id from public.signup_pulses order by created_at desc offset 200
  );
  return new;
end;
$$;
