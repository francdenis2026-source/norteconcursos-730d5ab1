-- Visitantes anônimos (Desafio diário sem cadastro) não viram perfil nem papel de usuário.
-- A conta anônima continua existindo no sistema de autenticação, porque o desafio depende dela,
-- mas não aparece como aluno, cadastro ou atividade. Contas com e-mail seguem como antes.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(new.is_anonymous, false) then
    return new;
  end if;

  insert into public.profiles (id, full_name, email, cpf)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    nullif(regexp_replace(new.raw_user_meta_data->>'cpf', '\D', '', 'g'), '')
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;
