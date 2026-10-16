-- Cancelamento de assinatura pelo próprio aluno, com recibo, registro e histórico.
-- O plano continua valendo até o vencimento; o aluno não altera plano nem vencimento pela API:
-- só esta função (security definer) agenda o cancelamento e liga uma chave de sessão que o gatilho
-- protect_subscription_fields reconhece.

create sequence if not exists public.subscription_receipt_seq;

create table if not exists public.subscription_cancellations (
  id uuid primary key default gen_random_uuid(),
  receipt_number text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text,
  user_email text,
  plan_tier text not null,
  plan_name text not null,
  requested_at timestamptz not null default now(),
  effective_until timestamptz not null,
  reason text,
  email_status text not null default 'pendente'
    check (email_status in ('pendente', 'enviado', 'falhou', 'nao_configurado')),
  email_sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists subscription_cancellations_user_idx
  on public.subscription_cancellations (user_id, requested_at desc);

alter table public.subscription_cancellations enable row level security;

drop policy if exists "Users read own cancellations" on public.subscription_cancellations;
create policy "Users read own cancellations" on public.subscription_cancellations
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Admins read all cancellations" on public.subscription_cancellations;
create policy "Admins read all cancellations" on public.subscription_cancellations
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
-- Sem políticas de insert/update/delete: só as funções abaixo gravam.

-- O gatilho continua impedindo o aluno de mudar plano/vencimento pela API, exceto dentro das funções desta migration.
create or replace function public.protect_subscription_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and not public.has_role(auth.uid(), 'admin')
     and coalesce(current_setting('app.subscription_rpc', true), '') <> 'on' then
    new.subscription_tier := old.subscription_tier;
    new.is_activated := old.is_activated;
    new.subscription_expires_at := old.subscription_expires_at;
    new.activation_code := old.activation_code;
    new.activation_expires_at := old.activation_expires_at;
  end if;
  return new;
end $$;

create or replace function public.request_subscription_cancellation(
  p_phrase text,
  p_reason text default null
)
returns public.subscription_cancellations
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  prof public.profiles%rowtype;
  ends timestamptz;
  plan_label text;
  rec public.subscription_cancellations;
begin
  if uid is null then
    raise exception 'Entre na sua conta para cancelar.' using errcode = '28000';
  end if;
  if upper(regexp_replace(trim(coalesce(p_phrase, '')), '\s+', ' ', 'g')) <> 'CANCELAR MEU PLANO' then
    raise exception 'A frase de confirmação não confere.';
  end if;

  select * into prof from public.profiles where id = uid for update;
  if not found then raise exception 'Perfil não encontrado.'; end if;
  if coalesce(prof.subscription_tier, 'free') = 'free' then
    raise exception 'Sua conta está no plano Gratuito: não há assinatura a cancelar.';
  end if;
  if exists (
    select 1 from public.subscription_cancellations c
    where c.user_id = uid and c.effective_until > now()
  ) then
    raise exception 'O cancelamento já está agendado para esta assinatura.';
  end if;

  ends := coalesce(prof.subscription_expires_at, now() + interval '30 days');
  if ends <= now() then raise exception 'Sua assinatura já venceu.'; end if;
  plan_label := case prof.subscription_tier
    when 'essential' then 'Essencial' when 'plus' then 'Plus' when 'premium' then 'Premium'
    else prof.subscription_tier end;

  insert into public.subscription_cancellations
    (receipt_number, user_id, user_name, user_email, plan_tier, plan_name, effective_until, reason)
  values (
    'CANC-' || to_char(now() at time zone 'America/Rio_Branco', 'YYYY') || '-'
      || lpad(nextval('public.subscription_receipt_seq')::text, 6, '0'),
    uid, prof.full_name, (select email from auth.users where id = uid),
    prof.subscription_tier, plan_label, ends, nullif(trim(coalesce(p_reason, '')), '')
  ) returning * into rec;

  -- Mantém o plano até o vencimento, fixando a data caso ela ainda não existisse.
  perform set_config('app.subscription_rpc', 'on', true);
  update public.profiles set subscription_expires_at = ends where id = uid;
  perform set_config('app.subscription_rpc', 'off', true);

  insert into public.subscription_audit_logs (user_id, event_type, old_tier, new_tier, metadata)
  values (uid, 'cancellation', prof.subscription_tier, prof.subscription_tier,
    jsonb_build_object('source', 'student', 'receipt', rec.receipt_number,
      'effective_until', ends, 'reason', rec.reason, 'access_until_expiry', true));

  return rec;
end $$;
revoke all on function public.request_subscription_cancellation(text, text) from public, anon;
grant execute on function public.request_subscription_cancellation(text, text) to authenticated;

-- O envio do e-mail é feito pelo servidor com o token do aluno; ele só registra o resultado do próprio recibo.
create or replace function public.mark_cancellation_email(p_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_status not in ('enviado', 'falhou', 'nao_configurado') then
    raise exception 'Estado inválido.';
  end if;
  update public.subscription_cancellations
     set email_status = p_status,
         email_sent_at = case when p_status = 'enviado' then now() else email_sent_at end
   where id = p_id and user_id = auth.uid();
end $$;
revoke all on function public.mark_cancellation_email(uuid, text) from public, anon;
grant execute on function public.mark_cancellation_email(uuid, text) to authenticated;
