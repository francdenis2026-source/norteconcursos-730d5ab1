-- Execute no SQL Editor como administrador para conferir o estado ATUAL.
-- Nenhuma alteração, conta ou resposta de aluno é acessada.
-- "Ativas" não equivale automaticamente à elegibilidade no treinador:
-- esta consulta não certifica edital, figuras, vigência nem deduplicação do catálogo.
with publicas as (
  select 'board_exam_questions'::text as tabela, to_jsonb(q) as registro
  from public.board_exam_questions q where upper(trim(q.board)) = 'IDECAN'
  union all
  select 'curated_question_catalog', to_jsonb(q)
  from public.curated_question_catalog q where upper(trim(q.exam_board)) = 'IDECAN'
  union all
  select 'official_exam_questions', to_jsonb(q)
  from public.official_exam_questions q where upper(trim(q.exam_board)) = 'IDECAN'
), campos as (
  select tabela,
    registro->>'content_status' as estado,
    coalesce(registro->>'explanation','') as explicacao
  from publicas
), flags as (
  select *,
    btrim(explicacao) <> '' and explicacao !~* 'aguardando revis[ãa]o de conte[úu]do|transcri[çc][ãa]o verbatim|importado do caderno oficial' as tem_explicacao,
    explicacao ~* 'Exemplo( pr[aá]tico)?:' as tem_exemplo
  from campos
), por_tabela as (
  select tabela,
    count(*) as registros,
    count(*) filter (where estado = 'active') as ativas,
    count(*) filter (where tem_explicacao) as com_explicacao_todos_estados,
    count(*) filter (where estado = 'active' and tem_explicacao) as ativas_com_explicacao,
    count(*) filter (where estado = 'active' and not tem_explicacao) as ativas_sem_explicacao,
    count(*) filter (where estado = 'active' and tem_explicacao and tem_exemplo) as ativas_com_explicacao_e_exemplo_textual
  from flags group by tabela
), privadas as (
  select c.content_status as estado, count(*) as quantidade
  from public.question_corpus_candidates c
  join public.question_corpus_sources s on s.id = c.corpus_id
  where upper(concat_ws(' ',s.publisher,s.title,s.metadata::text)) like '%IDECAN%'
  group by c.content_status
)
select jsonb_build_object(
  'consultado_em', now(),
  'papel_do_banco', current_user,
  'aviso', 'Execute como administrador. Linhas privadas não devem ser somadas a representações públicas da mesma questão. Exemplo textual não certifica revisão jurídica ou elegibilidade.',
  'catalogos_publicos', coalesce((select jsonb_agg(to_jsonb(p) order by p.tabela) from por_tabela p),'[]'::jsonb),
  'resumo_publico', (select jsonb_build_object(
    'registros',count(*),
    'ativas',count(*) filter (where estado='active'),
    'ativas_com_explicacao',count(*) filter (where estado='active' and tem_explicacao),
    'ativas_sem_explicacao',count(*) filter (where estado='active' and not tem_explicacao),
    'ativas_com_explicacao_e_exemplo_textual',count(*) filter (where estado='active' and tem_explicacao and tem_exemplo)
  ) from flags),
  'acervo_privado_por_estado',coalesce((select jsonb_agg(to_jsonb(p) order by p.estado) from privadas p),'[]'::jsonb)
) as diagnostico;
