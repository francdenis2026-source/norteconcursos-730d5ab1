-- Adds self-service exam upload with AI-assisted classification. Candidates
-- can upload a photo/PDF of a exam they took; an edge function calls the
-- Lovable AI Gateway to identify contest_name, contest_year, exam_board and
-- disciplines, and the result is stored for review before it's treated as a
-- confirmed "resultado" record (which still requires explicit grading, as
-- established by CONTENT_GOVERNANCE.md's honesty rule — the AI only
-- classifies the document, it never invents a score).
alter table public.student_exam_documents
  add column if not exists analysis_status text not null default 'concluido'
    check (analysis_status in ('pendente','processando','concluido','erro')),
  add column if not exists ai_extracted jsonb,
  add column if not exists uploaded_via text not null default 'admin_import'
    check (uploaded_via in ('admin_import','candidate_upload'));

comment on column public.student_exam_documents.analysis_status is
  'For candidate_upload rows: pendente (aguardando IA), processando, concluido (classificado), erro.';
comment on column public.student_exam_documents.ai_extracted is
  'Raw structured output from the AI Gateway classification (contest_name, contest_year, exam_board, disciplines, confidence, raw_notes) — always reviewable, never auto-trusted as an official grade.';

-- Candidates can insert their own pending upload rows directly (the existing
-- "Users can insert own exam documents" policy already covers this via
-- auth.uid() = user_id, so no new policy is needed for that).

-- Admin-facing view joining documents to the owning profile (CPF, name,
-- email), so misrouted uploads can be found and relinked safely from the
-- admin screen. Deliberately joins public.profiles only (not auth.users) —
-- profiles already carries email, and querying auth.users directly from a
-- security_invoker view would fail for any non-admin caller since the
-- authenticated role has no grant on that table.
create or replace view public.admin_student_exam_documents as
select
  d.id,
  d.user_id,
  p.cpf,
  p.full_name,
  p.email as auth_email,
  d.contest_name,
  d.contest_year,
  d.exam_board,
  d.doc_type,
  d.uploaded_via,
  d.analysis_status,
  d.ai_extracted,
  d.file_name,
  d.storage_path,
  d.score_raw,
  d.score_net,
  d.correct_count,
  d.wrong_count,
  d.blank_count,
  d.created_at
from public.student_exam_documents d
left join public.profiles p on p.id = d.user_id;

alter view public.admin_student_exam_documents set (security_invoker = true);

-- RLS on the underlying table already restricts non-admin selects to their
-- own rows; admins get every row via the existing
-- "Admins can manage all student exam documents" policy, so the view
-- inherits the right scoping automatically under security_invoker.
