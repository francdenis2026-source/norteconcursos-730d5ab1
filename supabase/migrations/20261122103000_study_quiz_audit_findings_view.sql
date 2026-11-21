-- Reproducible, read-only audit report for lesson-embedded quiz questions.
-- Do not delete duplicates automatically: shared questions across disciplines can be intentional.
CREATE OR REPLACE VIEW public.study_quiz_audit_findings AS
WITH items AS (
 SELECT sm.id material_id,sm.slug,sm.discipline,sm.title,
        e.ordinality::int position,e.value question,
        lower(regexp_replace(trim(coalesce(e.value->>'q','')),'\s+',' ','g')) normalized_prompt
 FROM public.study_materials sm
 CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)
 WHERE sm.content_status='active' AND jsonb_typeof(sm.quiz)='array'
), repeats AS (
 SELECT normalized_prompt,count(*) occurrences,count(distinct question->>'a') answer_variants
 FROM items WHERE normalized_prompt<>'' GROUP BY normalized_prompt HAVING count(*)>1
)
SELECT i.material_id,i.slug,i.discipline,i.title,i.position,
       CASE WHEN length(trim(coalesce(i.question->>'why','')))<25 THEN true ELSE false END short_explanation,
       CASE WHEN r.occurrences>1 THEN true ELSE false END repeated_prompt,
       coalesce(r.occurrences,1) prompt_occurrences,
       coalesce(r.answer_variants,1)>1 answer_conflict,
       CASE WHEN i.question ? 'q' AND jsonb_typeof(i.question->'a')='boolean' THEN true ELSE false END valid_question_schema
FROM items i LEFT JOIN repeats r USING(normalized_prompt);
COMMENT ON VIEW public.study_quiz_audit_findings IS 'Diagnostic view only: short explanations, repeated prompts, answer conflicts and schema; not substantive legal validation.';