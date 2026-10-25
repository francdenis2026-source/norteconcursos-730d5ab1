-- SOMENTE LEITURA. Execute no SQL Editor como administrador.
-- Exporte o resultado em JSON. Não inclui contas, respostas ou dados de alunos.
-- A linha 'export_metadata' registra o papel: exportação por anon não comprova acervo completo.
with editions as (
 select e.* from public.syllabus_editions e
 where e.status='active' or upper(coalesce(to_jsonb(e)->>'exam_board','')) like '%IDECAN%'
), topics as (
 select t.* from public.syllabus_topics t join editions e on e.id=t.edition_id
), idecan_sources as (
 select s.* from public.question_corpus_sources s
 where upper(s.publisher || ' ' || s.title || ' ' || s.metadata::text) like '%IDECAN%'
), exported as (
 select 'export_metadata' as tabela,jsonb_build_object('exported_at',now(),'database_role',current_user,'scope','conteudo_educacional_sem_dados_de_alunos') as registro
 union all select 'board_exam_questions',to_jsonb(q) from public.board_exam_questions q where upper(trim(q.board))='IDECAN'
 union all select 'curated_question_catalog',to_jsonb(q) from public.curated_question_catalog q where upper(trim(q.exam_board))='IDECAN'
 union all select 'official_exam_questions',to_jsonb(q) from public.official_exam_questions q where upper(trim(q.exam_board))='IDECAN'
 union all select 'questions',to_jsonb(q) from public.questions q where upper(coalesce(to_jsonb(q)->>'exam_board',to_jsonb(q)->>'board',''))='IDECAN'
 union all select 'question_corpus_sources',to_jsonb(s) from idecan_sources s
 union all select 'question_corpus_candidates',to_jsonb(c) from public.question_corpus_candidates c join idecan_sources s on s.id=c.corpus_id
 union all select 'syllabus_editions',to_jsonb(e) from editions e
 union all select 'syllabus_topics',to_jsonb(t) from topics t
 union all select 'content_sources',to_jsonb(s) from public.content_sources s where s.is_official
)
select tabela,registro from exported order by tabela,coalesce(registro->>'id','');
