-- Resumo público sem contar duas vezes o mesmo item de prova.
-- Mesma regra do treinador (src/lib/questionDuplicates.ts): itens de prova oficial/banca que
-- coincidem em concurso + ano + banca + gabarito + texto são UM só. Questões autorais nunca são unidas.
-- Os critérios de "disponível" são os de 20261113230000_reconcile_public_question_summary.sql.
create or replace function public.get_public_question_summary()
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
revoke all on function public.get_public_question_summary() from public;
grant execute on function public.get_public_question_summary() to anon, authenticated;
