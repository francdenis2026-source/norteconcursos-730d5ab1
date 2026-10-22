-- O selo público (QuestionCountBadge) contava "disponíveis" sem aplicar a mesma deduplicação de
-- itens compartilhados entre cargos (ex.: Agente e Papiloscopista na mesma prova) que o Treinador
-- e o Acervo já aplicam via dedupeSharedExamItems (PR #241). Isso fazia o selo da home mostrar um
-- número maior do que o aluno realmente encontra na área logada. Esta migração reaproveita o
-- normalizador já usado pela proteção de importação (question_import_duplicate_guard) para calcular
-- a mesma chave de "mesmo item" e excluir as duplicatas por cargo também no RPC público, para que
-- todas as telas usem a mesma definição de "disponível".
begin;

create or replace function public.question_shared_item_key(
  p_board text, p_contest text, p_year int, p_answer text, p_body text
) returns text language sql immutable parallel safe set search_path = pg_catalog, public as $$
  select case when length(public.normalize_question_import_text(p_body)) < 20 then null else
    public.normalize_question_import_text(
      coalesce(p_board, '') || '|' || coalesce(p_contest, '') || '|' || coalesce(p_year::text, '') ||
      '|' || coalesce(p_answer, '') || '|' || p_body
    )
  end
$$;

create or replace function public.board_options_text(p_options jsonb)
returns text language sql immutable parallel safe set search_path = pg_catalog, public as $$
  select coalesce((select string_agg(key || ':' || value, '|' order by key) from jsonb_each_text(coalesce(p_options, '{}'::jsonb))), '')
$$;

create or replace function public.get_public_question_summary()
returns jsonb language sql stable security definer set search_path = '' as $$
  with all_questions as (
    select content_status, official_answer, subject, legal_basis, law_version_checked_at,
      coalesce(context_review_required, false) as blocked_context,
      coalesce(legal_review_required, false) and not coalesce(legal_audit_completed, false) as blocked_legal,
      public.question_shared_item_key(exam_board, contest_name, exam_year, official_answer,
        coalesce((select body from public.question_support_texts t where t.id = q.support_text_id), '') || question_text) as dedupe_key,
      -- normalize_question_import_text() coalesces a null/empty career to '', nunca null: '' é o
      -- "cargo vazio" que, na dedupe em TypeScript, também invalida o grupo (careers.some(c => !c)).
      public.normalize_question_import_text(career_name) as career_key,
      id
    from public.official_exam_questions q
    union all
    select content_status, official_answer, subject, legal_basis, law_version_checked_at, false, false,
      null, null, id
    from public.curated_question_catalog
    union all
    select content_status, official_answer, subject, legal_basis, law_version_checked_at,
      needs_visual, legal_review_required and law_version_checked_at is null,
      public.question_shared_item_key(board, contest_name, exam_year, official_answer,
        coalesce(support_text, '') || stem || public.board_options_text(options)),
      public.normalize_question_import_text(career_name),
      id
    from public.board_exam_questions
  ),
  -- Postgres não aceita count(distinct ...) como window function: a contagem de cargos distintos
  -- por grupo é obtida contando quantas linhas repetem o MESMO cargo dentro do grupo (career_count)
  -- e, no nível seguinte, verificando se esse valor nunca passa de 1 (max_career_count = 1, ou seja,
  -- nenhum cargo se repete dentro do grupo) e se nenhum membro tem cargo vazio.
  keyed as (
    select *,
      count(*) over (partition by dedupe_key) as grp_count,
      count(*) over (partition by dedupe_key, career_key) as career_count,
      row_number() over (partition by dedupe_key order by id) as grp_rank
    from all_questions
  ),
  grouped as (
    select *,
      max(career_count) over (partition by dedupe_key) as max_career_count,
      bool_or(career_key = '') over (partition by dedupe_key) as has_empty_career
    from keyed
  )
  select jsonb_build_object('registered', count(*), 'available', count(*) filter (
    where content_status = 'active' and official_answer <> 'X' and not blocked_context and not blocked_legal
    and public.has_verified_question_basis(subject, legal_basis, law_version_checked_at)
    -- mesmo item cadastrado para mais de um cargo da mesma prova conta uma só vez (igual ao Treinador/Acervo)
    and not (
      dedupe_key is not null and grp_count >= 2 and max_career_count = 1 and not has_empty_career
      and grp_rank > 1
    )
  )) from grouped
$$;
revoke all on function public.get_public_question_summary() from public;
grant execute on function public.get_public_question_summary() to anon, authenticated;

revoke all on function public.question_shared_item_key(text, text, int, text, text) from public;
grant execute on function public.question_shared_item_key(text, text, int, text, text) to anon, authenticated;
revoke all on function public.board_options_text(jsonb) from public;
grant execute on function public.board_options_text(jsonb) to anon, authenticated;

commit;
