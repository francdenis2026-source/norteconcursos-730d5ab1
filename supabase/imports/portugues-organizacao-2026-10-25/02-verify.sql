-- Consulta de conferência; não modifica dados.
select m.slug,m.contest_name,jsonb_array_length(m.quiz) as exercicios_preservados,
       length(m.body_md) as caracteres,
       (select count(*) from public.study_material_enrichments e
        where e.material_slug=m.slug and e.status='active') as versoes_ativas_de_exemplos,
       (select jsonb_array_length(e.content->'cases') from public.study_material_enrichments e
        where e.material_slug=m.slug and e.status='active') as casos_comentados
from public.study_materials m
where m.discipline='Língua Portuguesa' and m.content_status='active'
order by m.sort_order,m.title;
