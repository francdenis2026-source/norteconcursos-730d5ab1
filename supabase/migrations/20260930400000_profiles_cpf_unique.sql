-- CPF validado no cadastro, guardado no perfil e único.
-- Contas antigas (login pelo CPF) têm o CPF no e-mail interno "<cpf>@norteconcurso.local".
alter table public.profiles add column if not exists cpf text;

update public.profiles p
set cpf = coalesce(
  nullif(regexp_replace(u.raw_user_meta_data->>'cpf', '\D', '', 'g'), ''),
  case when u.email like '%@norteconcurso.local' then split_part(u.email, '@', 1) end
)
from auth.users u
where u.id = p.id and p.cpf is null;

create unique index if not exists profiles_cpf_key on public.profiles (cpf) where cpf is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
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
