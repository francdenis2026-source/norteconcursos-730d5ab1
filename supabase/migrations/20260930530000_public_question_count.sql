-- Only aggregate catalog size is public. Existing question-content RLS stays intact.
create or replace function public.get_public_question_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select count(*) from public.official_exam_questions q
      where q.content_status = 'active'
        and q.official_answer <> 'X'
        and not (q.legal_review_required and not coalesce(q.legal_audit_completed, false)))
    +
    (select count(*) from public.curated_question_catalog q
      where q.content_status = 'active');
$$;

revoke all on function public.get_public_question_count() from public;
grant execute on function public.get_public_question_count() to anon, authenticated;
comment on function public.get_public_question_count() is
  'Homepage total: active shared official (non-cancelled, legally released) and authorial questions. Excludes private user questions. Returns no question content.';
