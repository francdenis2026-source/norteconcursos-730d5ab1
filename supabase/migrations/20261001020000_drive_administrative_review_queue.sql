-- Área de revisão administrativa. Este script não insere questões nas tabelas usadas pelos alunos.
begin;
create table if not exists public.drive_question_import_documents (
  drive_id text primary key,
  metadata jsonb not null,
  raw_text text not null,
  extracted_at timestamptz not null default now()
);
create table if not exists public.drive_question_import_candidates (
  id text primary key check (length(id)=64),
  drive_id text not null references public.drive_question_import_documents(drive_id),
  payload jsonb not null,
  content_status text not null default 'under_review'
    check (content_status in ('under_review','obsolete','rejected','duplicate')),
  created_at timestamptz not null default now(),
  check (coalesce(payload->'publishable' = 'false'::jsonb, false)),
  check (coalesce(payload->>'content_status' = content_status, false))
);
alter table public.drive_question_import_documents enable row level security;
alter table public.drive_question_import_candidates enable row level security;
revoke all on public.drive_question_import_documents from anon, authenticated;
revoke all on public.drive_question_import_candidates from anon, authenticated;
grant select, insert, update on public.drive_question_import_documents to authenticated;
grant select, insert, update on public.drive_question_import_candidates to authenticated;
grant all on public.drive_question_import_documents, public.drive_question_import_candidates to service_role;
drop policy if exists "Admins review Drive documents" on public.drive_question_import_documents;
create policy "Admins review Drive documents" on public.drive_question_import_documents
for all to authenticated using (public.has_role(auth.uid(),'admin'))
with check (public.has_role(auth.uid(),'admin'));
drop policy if exists "Admins review Drive candidates" on public.drive_question_import_candidates;
create policy "Admins review Drive candidates" on public.drive_question_import_candidates
for all to authenticated using (public.has_role(auth.uid(),'admin'))
with check (public.has_role(auth.uid(),'admin'));
comment on table public.drive_question_import_candidates is
  'Fragmentos candidatos do Drive; não são questões publicadas. Revisar PDF, gabarito, vigência, edital e duplicatas antes de criar registro no catálogo.';
commit;
