-- Reconcile eligibility without changing imported questions or review statuses.
revoke all on function public.login_email_for_cpf(text) from public, anon, authenticated;

create or replace function public.has_verified_question_basis(p_subject text, p_basis jsonb, p_checked timestamptz)
returns boolean language sql stable set search_path = '' as $$
  select case
    when p_basis is null or jsonb_typeof(p_basis) <> 'array' then not (coalesce(p_subject, '') ~* '(direito|legisla)')
    when jsonb_array_length(p_basis) = 0 then not (coalesce(p_subject, '') ~* '(direito|legisla)')
    else p_checked is not null and p_checked <= now() and not exists (
      select 1 from jsonb_array_elements(p_basis) b
      where jsonb_typeof(b) <> 'object' or coalesce(b->>'url', '') !~* '^https?://([a-z0-9-]+\.)*(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br|tst\.jus\.br|tse\.jus\.br|ohchr\.org|unodc\.org|un\.org)(/|$)'
    )
  end
$$;

create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions language sql stable security definer set search_path = '' as $$
  select q.* from public.official_exam_questions q
  where q.content_status='active' and q.official_answer <> 'X'
    and not coalesce(q.context_review_required,false)
    and not (coalesce(q.legal_review_required,false) and not coalesce(q.legal_audit_completed,false))
    and public.has_verified_question_basis(q.subject,q.legal_basis,q.law_version_checked_at)
  order by md5(q.id::text || to_char(public.get_current_acre_date(),'YYYY-MM-DD'))
  limit least(greatest(coalesce(p_limit,10),0),10)
$$;
revoke all on function public.get_daily_guest_questions(integer) from public;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;

create or replace function public.get_public_question_summary()
returns jsonb language sql stable security definer set search_path = '' as $$
  with all_questions as (
    select content_status,official_answer,subject,legal_basis,law_version_checked_at,
      coalesce(context_review_required,false) as blocked_context,
      coalesce(legal_review_required,false) and not coalesce(legal_audit_completed,false) as blocked_legal
    from public.official_exam_questions
    union all select content_status,official_answer,subject,legal_basis,law_version_checked_at,false,false from public.curated_question_catalog
    union all select content_status,official_answer,subject,legal_basis,law_version_checked_at,needs_visual,
      legal_review_required and law_version_checked_at is null from public.board_exam_questions
  )
  select jsonb_build_object('registered',count(*),'available',count(*) filter (
    where content_status='active' and official_answer <> 'X' and not blocked_context and not blocked_legal
    and public.has_verified_question_basis(subject,legal_basis,law_version_checked_at))) from all_questions
$$;
revoke all on function public.get_public_question_summary() from public;
grant execute on function public.get_public_question_summary() to anon, authenticated;
create or replace function public.get_public_question_count()
returns bigint language sql stable security definer set search_path = '' as $$
  select (public.get_public_question_summary()->>'available')::bigint
$$;
revoke all on function public.get_public_question_count() from public;
grant execute on function public.get_public_question_count() to anon, authenticated;

alter table public.profiles add column if not exists focused_contest_id uuid references public.contests(id) on delete set null;

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  reply_email text not null check (length(reply_email) <= 254),
  topic text not null check (topic in ('Acesso à conta','Conteúdo ou gabarito','Plano e assinatura','Privacidade e dados','Sugestão de melhoria')),
  description text not null check (length(description) between 10 and 5000),
  status text not null default 'open' check (status in ('open','in_progress','resolved')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists support_requests_rate on public.support_requests(reply_email,created_at);
alter table public.support_requests enable row level security;
revoke all on table public.support_requests from anon;
grant select,update on public.support_requests to authenticated;
drop policy if exists "Admins handle support" on public.support_requests;
create policy "Admins handle support" on public.support_requests for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create or replace function public.submit_support_request(p_topic text,p_description text,p_reply_email text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare result uuid; email text := lower(trim(p_reply_email));
begin
  if email is null or length(email)>254 or email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or p_description is null or length(trim(p_description)) not between 10 and 5000
    or p_topic is null or p_topic not in ('Acesso à conta','Conteúdo ou gabarito','Plano e assinatura','Privacidade e dados','Sugestão de melhoria')
    then raise exception 'Confira o e-mail e o relato.' using errcode='22023'; end if;
  -- Serialize concurrent requests for the same contact and enforce the cap on the server.
  perform pg_advisory_xact_lock(hashtextextended(email,0));
  if (select count(*) from public.support_requests where reply_email=email and created_at>now()-interval '1 hour')>=3
    then raise exception 'Aguarde antes de enviar outro pedido.' using errcode='P0001'; end if;
  insert into public.support_requests(user_id,reply_email,topic,description)
    values(auth.uid(),email,p_topic,trim(p_description)) returning id into result;
  return result;
end $$;
revoke all on function public.submit_support_request(text,text,text) from public;
grant execute on function public.submit_support_request(text,text,text) to anon,authenticated;
