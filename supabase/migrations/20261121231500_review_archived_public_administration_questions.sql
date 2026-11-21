-- Editorial review of 24 archived Public Administration items.
-- This does not certify legal currency or change publication status.
BEGIN;
UPDATE public.study_materials AS s
SET practice_review = jsonb_build_object(
 'version',1,
 'review_type','didactic_manual',
 'status','reviewed',
 'subject','Administração Pública',
 'material_slug',s.slug,
 'topic_label',s.topic_label,
 'checked_at',to_char(now() at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS"Z"'),
 'method','Conferência editorial dos enunciados, gabaritos e justificativas dos quatro itens por aula. Sem certificação jurídica de vigência e sem autorização de publicação.',
 'source_note','Questões autorais de treino. Material permanece arquivado até validação jurídica e decisão editorial de publicação.',
 'items',(SELECT jsonb_agg(jsonb_build_object('q',item->>'q','a',item->'a','why',item->>'why') ORDER BY ord)
          FROM jsonb_array_elements(s.quiz) WITH ORDINALITY AS t(item,ord))
), updated_at=now()
WHERE s.discipline='Administração Pública'
 AND s.content_status='archived'
 AND s.practice_review IS NULL
 AND jsonb_typeof(s.quiz)='array'
 AND jsonb_array_length(s.quiz)=4
 AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(s.quiz) AS e(item)
                 WHERE jsonb_typeof(e.item->'a') IS DISTINCT FROM 'boolean'
                    OR coalesce(length(trim(e.item->>'q')),0)=0
                    OR coalesce(length(trim(e.item->>'why')),0)=0);
COMMIT;