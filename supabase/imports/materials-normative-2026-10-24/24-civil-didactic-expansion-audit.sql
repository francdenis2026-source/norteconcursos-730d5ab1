-- Read-only audit of didactic enhancements to the two final civil-law materials.
-- Existing text preserved; worked cases and study decision tables appended.
select slug,length(body_md) body_length,
case when slug='processo-civil-formacao-suspensao-extincao'
then position('## Oficina de aplicação: três decisões diferentes' in body_md)>0
else position('## Roteiro prático: identifique o pedido antes de calcular' in body_md)>0 end as has_didactic_extension,
jsonb_array_length(quiz) exercise_count,
practice_review->>'catalog_status' catalog_status
from public.study_materials
where slug in ('processo-civil-formacao-suspensao-extincao',
'processo-civil-pensao-alimenticia-atualizacoes');
