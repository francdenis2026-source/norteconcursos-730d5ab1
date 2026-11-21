-- Reconcile the original short-body flag with the currently expanded Linux lesson.
-- This is a structural check, not a claim of independent editorial approval.
UPDATE public.study_materials
SET practice_review=jsonb_set(
 coalesce(practice_review,'{}'::jsonb),'{full_material_audit}',
 jsonb_build_object('status','structural_gap_resolved_pending_editorial_review',
 'checked_at','2026-11-21',
 'method','recheck_current_body_and_quiz',
 'body_characters',length(coalesce(body_md,'')),
 'quiz_count',jsonb_array_length(quiz),
 'note','Lesson was expanded after initial screen; editorial and answer verification remain pending'),true),
 updated_at=now()
WHERE slug='informatica-03-02'
 AND content_status='active'
 AND length(coalesce(body_md,''))>=1500
 AND jsonb_typeof(quiz)='array' AND jsonb_array_length(quiz)>=2
 AND practice_review->'full_material_audit'->>'status'='requires_content_expansion';