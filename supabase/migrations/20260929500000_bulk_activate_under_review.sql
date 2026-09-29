-- Bulk-activates all official_exam_questions still sitting in
-- content_status='under_review' (2954 items as of 2026-09-29), at the
-- user's explicit request: content audits (legal sources, current syllabus
-- linkage, wording review) will happen afterwards, item by item, instead of
-- gating visibility until every item is pre-audited.
--
-- 2503 of these items have no legal-subject restriction and activate
-- normally. The remaining 451 are in subjects covered by
-- official_exam_questions_active_legal_audit_check (Direito Administrativo,
-- Direito Constitucional, Direito Penal e Processual Penal, Direitos
-- Humanos, Legislação Especial), which blocks content_status='active'
-- unless legal_audit_completed, current_syllabus_topic_id,
-- law_version_checked_at and legal_basis are already filled in.
--
-- Per explicit user instruction, this migration temporarily drops that
-- guard, activates everything, then re-adds the same constraint as NOT
-- VALID: existing (now-active-but-unaudited) rows are grandfathered in and
-- not retroactively checked, but any future INSERT/UPDATE that tries to set
-- content_status='active' on a legal-subject row still must satisfy the
-- full audit requirement. This keeps the guard meaningful for new content
-- while unblocking today's bulk activation.

alter table public.official_exam_questions
  drop constraint if exists official_exam_questions_active_legal_audit_check;

update public.official_exam_questions
set content_status = 'active'
where content_status = 'under_review';

alter table public.official_exam_questions
  add constraint official_exam_questions_active_legal_audit_check check (
    content_status <> 'active'
    or subject not in ('Direito Administrativo','Noções de Direito Administrativo','Direito Constitucional','Noções de Direito Constitucional','Direito Penal e Processual Penal','Direitos Humanos','Legislação Especial')
    or (legal_audit_completed and current_syllabus_topic_id is not null and law_version_checked_at is not null and jsonb_array_length(legal_basis) > 0)
  ) not valid;
