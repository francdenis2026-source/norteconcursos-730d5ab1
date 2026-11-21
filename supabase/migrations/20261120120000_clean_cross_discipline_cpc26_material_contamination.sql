-- Remove a contaminação editorial de um bloco de Contabilidade (CPC 26)
-- que foi anexado ao final de materiais de outras disciplinas.
-- A operação é idempotente: só altera corpos que ainda contêm o marcador exato.
update public.study_materials
set body_md = left(
      body_md,
      strpos(body_md, E'\n\n## Classificação dos passivos financeiros — CPC 26\n') - 1
    ),
    updated_at = now()
where discipline in (
  'Noções de Informática',
  'Informática',
  'Tecnologia da Informação e Segurança da Informação',
  'Análise de Dados e Informações',
  'Matemática',
  'Matemática básica',
  'Raciocínio Lógico'
)
and strpos(body_md, E'\n\n## Classificação dos passivos financeiros — CPC 26\n') > 0;
