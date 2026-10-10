-- Private source corpora preserve extraction and review evidence separately from student questions.
create table if not exists public.question_corpus_sources (
 id text primary key check(id ~ '^[a-f0-9]{64}$'),
 title text not null,
 publisher text not null,
 publication_year integer,
 page_count integer not null check(page_count>0),
 metadata jsonb not null default '{}'::jsonb,
 raw_text text not null,
 created_at timestamptz not null default now()
);
create table if not exists public.question_corpus_candidates (
 id text primary key check(id ~ '^[a-f0-9]{64}$'),
 corpus_id text not null references public.question_corpus_sources(id),
 source_key text not null,
 discipline text not null,
 source_page integer not null check(source_page>0),
 payload jsonb not null,
 content_status text not null default 'under_review' check(content_status in ('under_review','obsolete','rejected','duplicate','reviewed')),
 created_at timestamptz not null default now(),
 unique(corpus_id,source_key)
);
create index if not exists question_corpus_review_filter on public.question_corpus_candidates(corpus_id,content_status,discipline);
alter table public.question_corpus_sources enable row level security;
alter table public.question_corpus_candidates enable row level security;
revoke all on public.question_corpus_sources,public.question_corpus_candidates from anon,authenticated;
grant select,insert,update on public.question_corpus_sources,public.question_corpus_candidates to authenticated;
create policy "Admins manage private corpora" on public.question_corpus_sources for all to authenticated using(public.has_role(auth.uid(),'admin')) with check(public.has_role(auth.uid(),'admin'));
create policy "Admins review private candidates" on public.question_corpus_candidates for all to authenticated using(public.has_role(auth.uid(),'admin')) with check(public.has_role(auth.uid(),'admin'));