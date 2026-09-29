-- O treinador só exibe questões com base legal cuja vigência foi conferida na fonte oficial.
-- Estas colunas registram a conferência; scripts/verify-legal-questions.mjs as preenche
-- depois de consultar o Planalto e marca como revoked o que estiver revogado.
alter table public.curated_question_catalog
  add column if not exists law_version_checked_at timestamptz;
alter table public.official_exam_questions
  add column if not exists legal_audit_completed boolean not null default false;
alter table public.question_bank
  add column if not exists law_version_checked_at timestamptz;
