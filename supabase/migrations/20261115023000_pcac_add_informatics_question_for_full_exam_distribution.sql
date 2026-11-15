-- Add one original Noções de Informática item so the PC-AC authorial bank
-- can reproduce the edital's 8-question basic-computing allocation.
insert into public.curated_question_catalog (
  source_id,
  syllabus_topic_id,
  external_item_key,
  contest_name,
  contest_year,
  career_name,
  exam_board,
  subject,
  subtopic,
  question_text,
  official_answer,
  explanation,
  legal_basis,
  difficulty,
  content_status,
  is_original,
  verified_at,
  state,
  career_category,
  role_type,
  tested_topic,
  didactic_provenance
)
select
  source.source_id,
  source.syllabus_topic_id,
  'pcac26-autoral-informatica-validacao-001',
  'Polícia Civil do Acre',
  2026,
  'Oficial Investigador de Polícia',
  'AUTORAL',
  'Noções de Informática',
  'Validação de dados em planilhas eletrônicas',
  $$Em uma planilha de controle de diligências, o responsável precisa impedir a entrada de datas fora de um intervalo previamente definido, mantendo a possibilidade de filtrar os registros depois. Qual recurso deve ser utilizado?

A) Formatação condicional, que destaca visualmente valores que atendem a uma regra.
B) Validação de dados, configurada para aceitar apenas datas dentro do intervalo.
C) Tabela dinâmica, que resume os registros por período.
D) Congelar painéis, que mantém linhas e colunas visíveis durante a rolagem.
E) Filtro automático, que oculta temporariamente linhas que não atendem ao critério.$$,
  'B',
  'A validação de dados aplica regras de entrada à célula, como aceitar somente datas entre dois limites. A formatação condicional apenas altera a aparência; a tabela dinâmica resume informações; congelar painéis afeta a visualização; e o filtro oculta temporariamente linhas, sem impedir a digitação de valores inválidos.',
  '[]'::jsonb,
  'média',
  'active',
  true,
  now(),
  'AC',
  'policial',
  'Oficial Investigador de Polícia',
  'Validação de dados em planilhas eletrônicas',
  jsonb_build_object(
    'authored', true,
    'not_official_exam', true,
    'source_board_style', 'IDECAN',
    'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia',
    'review_state', 'editorial_review_passed',
    'review_note', 'Questão autoral inédita, conferida contra o Anexo III, Noções de Informática, item 4, do edital PC-AC 2026.',
    'reference_materials', jsonb_build_array(
      jsonb_build_object(
        'title', 'Edital PC-AC 2026 — Anexo III, Noções de Informática, item 4',
        'url', 'https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
        'page', '48'
      )
    )
  )
from (
  select source_id, syllabus_topic_id
  from public.curated_question_catalog
  where external_item_key = 'NC-PCAC-INF-001'
  limit 1
) source
where not exists (
  select 1
  from public.curated_question_catalog
  where external_item_key = 'pcac26-autoral-informatica-validacao-001'
);
