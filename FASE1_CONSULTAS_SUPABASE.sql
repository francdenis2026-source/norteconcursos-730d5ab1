-- FASE 1 DA AUDITORIA — somente leitura.
-- Rode no SQL Editor do projeto Supabase (gkwphadbveiyjcwiiizw) e envie o resultado de cada bloco.
-- Nenhuma consulta abaixo altera dados ou esquema.

-- 1) Tabelas do schema public sem RLS ativada
select c.relname as tabela
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity
order by 1;

-- 2) Políticas amplas demais (using true / with check true) fora de service_role
select tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and (coalesce(qual,'') in ('true','(true)') or coalesce(with_check,'') in ('true','(true)'))
  and not ('service_role' = any(roles::text[]))
order by tablename, policyname;

-- 3) Funções SECURITY DEFINER em public sem search_path fixo
select p.proname, pg_get_function_identity_arguments(p.oid) as argumentos
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.prosecdef
  and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) cfg where cfg like 'search_path=%')
order by 1;

-- 4) Funções executáveis por anon (esperado: só as públicas de catálogo/desafio)
select p.proname, pg_get_function_identity_arguments(p.oid) as argumentos
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and has_function_privilege('anon', p.oid, 'EXECUTE')
order by 1;

-- 5) Estado dos materiais por disciplina (inclui arquivados/obsoletos)
select discipline as disciplina, content_status as estado, count(*) as materiais
from public.study_materials
group by 1, 2
order by 1, 2;

-- 6) Motivos de questões indisponíveis (a regra é a mesma de get_public_question_summary)
select
  case
    when content_status <> 'active' then 'status: ' || content_status
    when official_answer = 'X' then 'gabarito X (anulada)'
    when coalesce(context_review_required,false) then 'contexto pendente de revisão'
    when coalesce(legal_review_required,false) and not coalesce(legal_audit_completed,false) then 'revisão jurídica pendente'
    when not public.has_verified_question_basis(subject, legal_basis, law_version_checked_at) then 'base legal sem fonte oficial verificada'
    else 'disponível'
  end as situacao,
  count(*) as questoes
from public.official_exam_questions
group by 1
order by 2 desc;

-- 7) Duplicidades prováveis de enunciado em official_exam_questions
select md5(lower(regexp_replace(coalesce(question_text,''), '\s+', ' ', 'g'))) as chave,
       count(*) as repeticoes,
       min(id::text) as exemplo_id
from public.official_exam_questions
group by 1
having count(*) > 1
order by 2 desc
limit 50;

-- 8) Disciplinas com zero questões ativas
select subject as disciplina, count(*) as cadastradas
from public.official_exam_questions
group by 1
having count(*) filter (where content_status = 'active') = 0
order by 2 desc;
