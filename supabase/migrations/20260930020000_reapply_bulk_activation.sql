-- Re-applies the bulk activation from 20260929500000_bulk_activate_under_review.sql.
--
-- A separate migration earlier today (20260930000000_revert_unreviewed_active_flip.sql)
-- reverted ~2804 rows back to content_status='under_review', based on the
-- (at-the-time correct) assumption that an unscoped UPDATE had accidentally
-- bypassed the project's audit-first governance. The user has since confirmed
-- that 20260929500000_bulk_activate_under_review.sql was an intentional,
-- explicit decision made in a parallel session: publish now, audit
-- item-by-item afterwards (legal sources, syllabus linkage, wording) rather
-- than gating visibility on a full pre-audit. This migration restores that
-- state using the exact same guarded pattern as the original bulk
-- activation, so the intentional strategy is respected going forward.

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
