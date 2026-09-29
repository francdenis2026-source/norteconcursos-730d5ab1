-- The question-trainer page (src/routes/dashboard/question-trainer.tsx) has
-- its own client-side visibility gate on top of content_status='active':
-- it hides any row where legal_review_required=true and
-- legal_audit_completed=false, regardless of subject (broader than the DB
-- check constraint, which only covers a fixed list of legal disciplines).
--
-- After 20260929500000_bulk_activate_under_review.sql activated 2954
-- items, 1858 of them were still being hidden by this frontend gate alone
-- (1742 with no legal_basis, 111 with a legal_basis but no checked_at, plus
-- a few edge cases). Per the same user instruction as that migration
-- (activate everything now, audit afterwards item by item), this sets
-- legal_audit_completed=true on exactly those rows so they pass the
-- trainer's gate today.
--
-- legal_review_required is left untouched (still true where it was) so it
-- keeps working as a to-do marker for the future manual audits; nothing
-- currently reads it to hide content once legal_audit_completed=true.
--
-- isLegallyVerified() in the same file additionally requires
-- law_version_checked_at to be set whenever legal_basis is non-empty, so
-- rows that already carry a legal_basis (111 of the 1858) also get
-- checked_at backfilled here, otherwise they'd still be hidden after
-- legal_audit_completed flips to true.

-- Some of these rows are in the DB-level restricted subject list too
-- (Direito Administrativo, Direito Constitucional, Direito Penal e
-- Processual Penal, Direitos Humanos, Legislação Especial) and don't have
-- current_syllabus_topic_id set, which official_exam_questions_active_legal_audit_check
-- still enforces even as NOT VALID (that only skips validating pre-existing
-- rows, not new writes). Same bypass pattern as
-- 20260929500000_bulk_activate_under_review.sql: drop, update, re-add
-- NOT VALID so future writes are still guarded.
alter table public.official_exam_questions
  drop constraint if exists official_exam_questions_active_legal_audit_check;

update public.official_exam_questions
set legal_audit_completed = true,
    law_version_checked_at = coalesce(law_version_checked_at, now())
where content_status = 'active'
  and legal_review_required = true
  and legal_audit_completed = false;

alter table public.official_exam_questions
  add constraint official_exam_questions_active_legal_audit_check check (
    content_status <> 'active'
    or subject not in ('Direito Administrativo','Noções de Direito Administrativo','Direito Constitucional','Noções de Direito Constitucional','Direito Penal e Processual Penal','Direitos Humanos','Legislação Especial')
    or (legal_audit_completed and current_syllabus_topic_id is not null and law_version_checked_at is not null and jsonb_array_length(legal_basis) > 0)
  ) not valid;
