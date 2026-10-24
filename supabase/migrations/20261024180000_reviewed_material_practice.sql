begin;
-- Review evidence belongs to the exact exercise snapshot, separate from a whole-law review.
alter table public.study_materials add column if not exists practice_review jsonb;
comment on column public.study_materials.practice_review is
  'Reviewed exercise snapshot, syllabus link and official-source evidence. Does not certify a whole-law or jurisprudence audit. A quiz edit invalidates the snapshot in the study UI.';
commit;
