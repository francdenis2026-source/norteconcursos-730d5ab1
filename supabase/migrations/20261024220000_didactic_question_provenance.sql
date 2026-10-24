-- Distinguish didactic material from applied official examinations without changing scoring source enums.
begin;
alter table public.curated_question_catalog add column if not exists didactic_provenance jsonb;
comment on column public.curated_question_catalog.didactic_provenance is 'Document/item provenance of reviewed exercises catalogued from didactic material; does not assert an official examination origin.';
create table if not exists public.didactic_question_imports (
 id uuid primary key,
 document_sha256 text not null check(length(document_sha256)=64),
 document_name text not null,
 source_page integer,
 item_number integer not null,
 extracted_statement text not null,
 provided_answer text,
 current_answer text,
 review_status text not null check(review_status in ('published','duplicate_reused','needs_review','obsolete')),
 review_note text not null,
 question_table text check(question_table in ('curated_question_catalog','board_exam_questions','official_exam_questions')),
 question_id uuid,
 reviewed_at timestamptz,
 reviewed_by uuid references auth.users(id),
 unique(document_sha256,item_number)
);
alter table public.didactic_question_imports enable row level security;
drop policy if exists "Administrators audit didactic imports" on public.didactic_question_imports;
create policy "Administrators audit didactic imports" on public.didactic_question_imports for all to authenticated using(public.has_role(auth.uid(),'admin')) with check(public.has_role(auth.uid(),'admin'));
grant select,insert,update,delete on public.didactic_question_imports to authenticated;
commit;
