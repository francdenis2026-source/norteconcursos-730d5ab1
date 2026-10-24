-- Auditoria da expansão didática de Contabilidade Geral (24/10/2026).
-- As alterações de conteúdo foram aplicadas diretamente no Supabase.
-- Esta consulta é somente leitura e não altera dados existentes.
select slug,title,content_status,length(body_md) as body_length,
       jsonb_array_length(quiz) as question_count,
       (body_md like '%## Oficina aplicada%') as has_worked_exercises
from public.study_materials
where slug in (
  'contabilidade-regimes-caixa-competencia',
  'contabilidade-balancete-verificacao',
  'contabilidade-provisoes-passivo-contingente-epcld'
)
order by slug;
