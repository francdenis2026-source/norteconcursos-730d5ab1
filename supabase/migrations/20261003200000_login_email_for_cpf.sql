-- Login por CPF: contas novas usam e-mail real, então o CPF precisa ser resolvido para o e-mail de login.
-- Contas antigas (@norteconcurso.local) continuam funcionando, pois o e-mail vem de auth.users.
create or replace function public.login_email_for_cpf(_cpf text)
returns text
language sql
security definer
stable
set search_path = public, auth
as $$
  select u.email::text
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.cpf = regexp_replace(coalesce(_cpf, ''), '\D', '', 'g')
  limit 1
$$;

revoke all on function public.login_email_for_cpf(text) from public;
grant execute on function public.login_email_for_cpf(text) to anon, authenticated;
