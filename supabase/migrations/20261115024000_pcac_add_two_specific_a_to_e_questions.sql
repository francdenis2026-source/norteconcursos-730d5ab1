-- Add two original A–E Análise de Dados items to complete the 60-question
-- specific-knowledge pool for a full PC-AC 2026 practice paper.
insert into public.curated_question_catalog (
  source_id, syllabus_topic_id, external_item_key, contest_name, contest_year,
  career_name, exam_board, subject, subtopic, question_text, official_answer,
  explanation, legal_basis, difficulty, content_status, is_original, verified_at,
  state, career_category, role_type, tested_topic, didactic_provenance
)
select
  source.source_id,
  source.syllabus_topic_id,
  item.external_item_key,
  'Polícia Civil do Acre',
  2026,
  'Oficial Investigador de Polícia',
  'AUTORAL',
  'Análise de Dados',
  item.subtopic,
  item.question_text,
  item.official_answer,
  item.explanation,
  '[]'::jsonb,
  'média',
  'active',
  true,
  now(),
  'AC',
  'policial',
  'Oficial Investigador de Polícia',
  item.subtopic,
  jsonb_build_object(
    'authored', true,
    'not_official_exam', true,
    'source_board_style', 'IDECAN',
    'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia',
    'review_state', 'editorial_review_passed',
    'review_note', 'Questão autoral inédita, conferida contra o Anexo III, Análise de Dados e Informações, do edital PC-AC 2026.',
    'reference_materials', jsonb_build_array(
      jsonb_build_object(
        'title', 'Edital PC-AC 2026 — Anexo III, Análise de Dados e Informações',
        'url', 'https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
        'page', '50'
      )
    )
  )
from (
  select source_id, syllabus_topic_id
  from public.curated_question_catalog
  where external_item_key = 'pcac26-autoria-draft-38'
  limit 1
) source
cross join (
  values
  (
    'pcac26-autoral-analise-comunicacao-001',
    'Análise de registros de comunicação',
    $$Uma equipe precisa comparar o padrão de comunicação entre dois terminais durante um período de 30 dias. Qual conjunto de informações é mais adequado para organizar os eventos e analisar frequência, duração e sequência das comunicações?

A) Nome do titular, modelo do aparelho e cor do dispositivo.
B) Data e hora, identificadores de origem e destino e duração de cada comunicação.
C) Tamanho do arquivo exportado e nome do programa utilizado.
D) Endereço residencial dos titulares, sem registro temporal.
E) Marca do aparelho e operadora, sem identificação dos eventos.$$,
    'B',
    'A análise de registros de comunicação exige organizar os eventos em ordem temporal e comparar origem, destino, data, hora e duração. Esses campos permitem calcular frequência, duração e sequência; dados do aparelho ou do titular, isoladamente, não descrevem o padrão de comunicação.'
  ),
  (
    'pcac26-autoral-analise-geografica-001',
    'Análise geográfica básica',
    $$Uma base reúne coordenadas geográficas de ocorrências policiais. O objetivo é identificar áreas com maior concentração espacial de registros. Qual procedimento é mais adequado?

A) Ordenar os registros apenas pelo nome das pessoas envolvidas.
B) Remover todas as coordenadas e comparar somente os textos das ocorrências.
C) Representar as coordenadas em mapa e comparar a distribuição espacial dos eventos por região.
D) Somar os números dos endereços para estimar a concentração.
E) Agrupar os registros exclusivamente pela extensão dos arquivos.$$,
    'C',
    'A representação cartográfica das coordenadas permite observar a distribuição espacial e identificar concentrações por região. A análise deve preservar a localização e considerar a qualidade dos dados; ordenar nomes ou somar números de endereços não produz uma análise geográfica válida.'
  )
) as item(external_item_key,subtopic,question_text,official_answer,explanation)
where not exists (
  select 1 from public.curated_question_catalog existing
  where existing.external_item_key = item.external_item_key
);
