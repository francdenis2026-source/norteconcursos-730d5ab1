-- FASE 1 DA AUDITORIA — somente leitura, um único resultado.
-- Cole no SQL Editor do projeto Supabase (gkwphadbveiyjcwiiizw) e envie o resultado.
-- Não altera dados nem esquema.

with
sem_rls as (
  select 1 as ordem, 'Tabelas sem RLS' as secao, c.relname::text as detalhe, null::bigint as quantidade
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity
),
politicas_abertas as (
  select 2, 'Políticas abertas demais', tablename || '.' || policyname || ' (' || array_to_string(roles, ',') || ', ' || cmd || ')', null::bigint
  from pg_policies
  where schemaname = 'public'
    and (coalesce(qual,'') in ('true','(true)') or coalesce(with_check,'') in ('true','(true)'))
    and not ('service_role' = any(roles))
),
definer_sem_path as (
  select 3, 'Funções SECURITY DEFINER sem search_path fixo', p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')', null::bigint
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.prosecdef
    and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) cfg where cfg like 'search_path=%')
),
funcoes_anon as (
  select 4, 'Funções executáveis pelo anon', p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')', null::bigint
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and has_function_privilege('anon', p.oid, 'EXECUTE')
),
materiais as (
  select 5, 'Materiais por disciplina e estado', discipline || ' | ' || content_status, count(*)
  from public.study_materials
  group by discipline, content_status
),
motivos_questoes as (
  select 6, 'Questões: situação', situacao, count(*)
  from (
    select case
      when content_status <> 'active' then 'status: ' || content_status
      when official_answer = 'X' then 'gabarito X (anulada)'
      when coalesce(context_review_required,false) then 'contexto pendente de revisão'
      when coalesce(legal_review_required,false) and not coalesce(legal_audit_completed,false) then 'revisão jurídica pendente'
      when not public.has_verified_question_basis(subject, legal_basis, law_version_checked_at) then 'base legal sem fonte oficial verificada'
      else 'disponível'
    end as situacao
    from public.official_exam_questions
  ) q
  group by situacao
),
duplicados as (
  select 7, 'Enunciados repetidos (grupo: exemplo de id)', min(id::text), count(*)
  from public.official_exam_questions
  group by md5(lower(regexp_replace(coalesce(question_text,''), '\s+', ' ', 'g')))
  having count(*) > 1
),
disciplinas_zeradas as (
  select 8, 'Disciplinas sem questão ativa', subject, count(*)
  from public.official_exam_questions
  group by subject
  having count(*) filter (where content_status = 'active') = 0
)
select secao, detalhe, quantidade
from (
  select * from sem_rls
  union all select * from politicas_abertas
  union all select * from definer_sem_path
  union all select * from funcoes_anon
  union all select * from materiais
  union all select * from motivos_questoes
  union all select * from duplicados
  union all select * from disciplinas_zeradas
) r(ordem, secao, detalhe, quantidade)
order by ordem, quantidade desc nulls last, detalhe;
