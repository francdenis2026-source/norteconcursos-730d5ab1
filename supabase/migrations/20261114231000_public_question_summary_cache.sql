-- Resumo público de questões guardado pronto: a homepage lê uma linha em vez de varrer 10 mil questões
-- (a primeira consulta a frio estourava o tempo limite). A linha é refeita quando as tabelas de questões mudam.
create table if not exists public.public_question_summary_cache (
  id boolean primary key default true check (id),
  registered integer not null,
  available integer not null,
  updated_at timestamptz not null default now()
);
alter table public.public_question_summary_cache enable row level security;
revoke all on public.public_question_summary_cache from anon, authenticated;

-- Cálculo completo (regra de 20261114230000: itens de prova repetidos contam uma vez).
create or replace function public.compute_public_question_summary()
returns jsonb language sql stable security definer set search_path = '' as $$
  with all_questions as (
    select 'p:' || md5(concat_ws('|', lower(contest_name), exam_year::text, lower(coalesce(exam_board, '')),
             official_answer, lower(regexp_replace(question_text, '\s+', ' ', 'g')))) as k,
      content_status, official_answer, subject, legal_basis, law_version_checked_at,
      coalesce(context_review_required, false) as blocked_context,
      coalesce(legal_review_required, false) and not coalesce(legal_audit_completed, false) as blocked_legal
    from public.official_exam_questions
    union all
    select 'a:' || id::text, content_status, official_answer, subject, legal_basis, law_version_checked_at, false, false
    from public.curated_question_catalog
    union all
    select 'p:' || md5(concat_ws('|', lower(contest_name), exam_year::text, lower(coalesce(board, '')),
             official_answer, lower(regexp_replace(stem, '\s+', ' ', 'g')))),
      content_status, official_answer, subject, legal_basis, law_version_checked_at,
      needs_visual, coalesce(legal_review_required, false) and law_version_checked_at is null
    from public.board_exam_questions
  )
  select jsonb_build_object(
    'registered', count(distinct k),
    'available', count(distinct k) filter (
      where content_status = 'active'
        and official_answer <> 'X'
        and not blocked_context
        and not blocked_legal
        and public.has_verified_question_basis(subject, legal_basis, law_version_checked_at)
    )
  )
  from all_questions
$$;
revoke all on function public.compute_public_question_summary() from public, anon, authenticated;

create or replace function public.refresh_public_question_summary()
returns void language plpgsql security definer set search_path = '' as $$
declare s jsonb;
begin
  s := public.compute_public_question_summary();
  insert into public.public_question_summary_cache (id, registered, available, updated_at)
  values (true, (s->>'registered')::integer, (s->>'available')::integer, now())
  on conflict (id) do update
    set registered = excluded.registered, available = excluded.available, updated_at = excluded.updated_at;
end $$;
revoke all on function public.refresh_public_question_summary() from public, anon, authenticated;

create or replace function public.get_public_question_summary()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare r public.public_question_summary_cache%rowtype;
begin
  select * into r from public.public_question_summary_cache where id;
  if found then
    return jsonb_build_object('registered', r.registered, 'available', r.available);
  end if;
  return public.compute_public_question_summary();
end $$;
revoke all on function public.get_public_question_summary() from public;
grant execute on function public.get_public_question_summary() to anon, authenticated;

-- Refaz o resumo depois de qualquer mudança nas questões. Uma falha aqui nunca bloqueia o cadastro.
create or replace function public.touch_public_question_summary()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  begin
    perform public.refresh_public_question_summary();
  exception when others then
    null;
  end;
  return null;
end $$;
revoke all on function public.touch_public_question_summary() from public, anon, authenticated;

drop trigger if exists touch_question_summary on public.official_exam_questions;
create trigger touch_question_summary after insert or update or delete on public.official_exam_questions
  for each statement execute function public.touch_public_question_summary();
drop trigger if exists touch_question_summary on public.curated_question_catalog;
create trigger touch_question_summary after insert or update or delete on public.curated_question_catalog
  for each statement execute function public.touch_public_question_summary();
drop trigger if exists touch_question_summary on public.board_exam_questions;
create trigger touch_question_summary after insert or update or delete on public.board_exam_questions
  for each statement execute function public.touch_public_question_summary();

select public.refresh_public_question_summary();
