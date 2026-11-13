-- Reconcilia o resumo público com a regra do repositório (CONTENT_GOVERNANCE.md):
-- questão só entra em "disponíveis" com base legal verificada, sem contexto pendente
-- e sem revisão jurídica pendente. A versão instalada no banco não verificava a base
-- legal e bloqueava revisões já concluídas. Esta migração reaplica a regra de
-- 20261022050000_unify_public_question_summary.sql, sem alterar dados.
create or replace function public.get_public_question_summary()
returns jsonb language sql stable security definer set search_path = '' as $$
  with all_questions as (
    select content_status, official_answer, subject, legal_basis, law_version_checked_at,
      coalesce(context_review_required, false) as blocked_context,
      coalesce(legal_review_required, false) and not coalesce(legal_audit_completed, false) as blocked_legal
    from public.official_exam_questions
    union all
    select content_status, official_answer, subject, legal_basis, law_version_checked_at, false, false
    from public.curated_question_catalog
    union all
    select content_status, official_answer, subject, legal_basis, law_version_checked_at,
      needs_visual, coalesce(legal_review_required, false) and law_version_checked_at is null
    from public.board_exam_questions
  )
  select jsonb_build_object(
    'registered', count(*),
    'available', count(*) filter (
      where content_status = 'active'
        and official_answer <> 'X'
        and not blocked_context
        and not blocked_legal
        and public.has_verified_question_basis(subject, legal_basis, law_version_checked_at)
    )
  )
  from all_questions
$$;
revoke all on function public.get_public_question_summary() from public;
grant execute on function public.get_public_question_summary() to anon, authenticated;
