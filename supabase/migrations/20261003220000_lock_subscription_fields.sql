-- Planos pagos desativados na fase de testes: o aluno não pode alterar o próprio plano pela API.
-- Só administrador ou service role (auth.uid() nulo) mudam estes campos.
create or replace function public.protect_subscription_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.has_role(auth.uid(), 'admin') then
    new.subscription_tier := old.subscription_tier;
    new.is_activated := old.is_activated;
    new.subscription_expires_at := old.subscription_expires_at;
    new.activation_code := old.activation_code;
    new.activation_expires_at := old.activation_expires_at;
  end if;
  return new;
end $$;

drop trigger if exists protect_subscription_fields on public.profiles;
create trigger protect_subscription_fields before update on public.profiles
  for each row execute function public.protect_subscription_fields();
