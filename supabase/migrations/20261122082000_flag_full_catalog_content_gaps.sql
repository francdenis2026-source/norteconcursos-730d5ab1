-- Full-catalog first-pass coverage audit: flag demonstrable lesson gaps, never certify unverified content.
-- Scope: active study materials, all disciplines. Preserves existing review metadata.
UPDATE public.study_materials
SET practice_review=jsonb_set(
 coalesce(practice_review,'{}'::jsonb),
 '{full_material_audit}',
 jsonb_build_object(
 'status','requires_content_expansion',
 'checked_at','2026-11-21',
 'method','catalog_wide_coverage_screen',
 'body_characters',length(coalesce(body_md,'')),
 'quiz_count',case when jsonb_typeof(quiz)='array' then jsonb_array_length(quiz) else 0 end,
 'findings',jsonb_build_array(
   case when length(coalesce(body_md,''))<1500 then 'lesson_body_under_1500_characters' else null end,
   case when quiz is null or jsonb_typeof(quiz)<>'array' or jsonb_array_length(quiz)=0 then 'no_quiz_items' else null end
 )
 ),true),
 updated_at=now()
WHERE content_status='active'
AND (length(coalesce(body_md,''))<1500 OR quiz is null OR jsonb_typeof(quiz)<>'array' OR jsonb_array_length(quiz)=0);
