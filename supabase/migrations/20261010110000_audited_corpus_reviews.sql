-- Reviews are private, preserve original extraction, and reject stale concurrent edits.
create table public.question_corpus_review_audit (
 id bigint generated always as identity primary key,
 candidate_id text not null references public.question_corpus_candidates(id),
 previous_status text not null,
 next_status text not null,
 previous_payload jsonb not null,
 next_payload jsonb not null,
 reviewer_id uuid,
 reviewed_at timestamptz not null default now()
);
alter table public.question_corpus_review_audit enable row level security;
revoke all on public.question_corpus_review_audit from anon,authenticated;
grant select on public.question_corpus_review_audit to authenticated;
create policy "Admins read private review history" on public.question_corpus_review_audit
 for select to authenticated using(public.has_role(auth.uid(),'admin'));

create function public.review_corpus_candidate(
 candidate text, expected_status text, expected_payload jsonb,
 next_status text, next_payload jsonb
) returns text language plpgsql security definer set search_path=public as $$
declare stored public.question_corpus_candidates;
begin
 if coalesce(auth.role(),'') <> 'service_role' and not coalesce(public.has_role(auth.uid(),'admin'),false) then
  raise exception 'Administrator required';
 end if;
 select * into stored from public.question_corpus_candidates where id=candidate for update;
 if not found then raise exception 'Unknown candidate'; end if;
 -- Retry of an identical decision does not create another audit record.
 if stored.payload=next_payload and stored.content_status=next_status then return 'unchanged'; end if;
 if stored.payload<>expected_payload or stored.content_status<>expected_status then
  raise exception 'Stale review; reload current candidate';
 end if;
 if stored.content_status<>'under_review' then raise exception 'Existing decision is protected'; end if;
 if next_status not in ('reviewed','obsolete','rejected','duplicate') then raise exception 'Invalid decision'; end if;
 if next_payload->'raw_text' is distinct from stored.payload->'raw_text'
  or next_payload->'key' is distinct from stored.payload->'key'
  or next_payload->'page' is distinct from stored.payload->'page'
  or next_payload->'number' is distinct from stored.payload->'number'
  or next_payload->'subject' is distinct from stored.payload->'subject'
  or next_payload->'answer' is distinct from stored.payload->'answer' then
  raise exception 'Original extraction is immutable';
 end if;
 if jsonb_typeof(next_payload->'individual_review') is distinct from 'object' then
  raise exception 'Individual review required';
 end if;
 if next_payload ? 'publication' and
  (next_status<>'reviewed' or next_payload#>>'{individual_review,publication_approved}' is distinct from 'true') then
  raise exception 'Publication requires approval';
 end if;
 insert into public.question_corpus_review_audit(candidate_id,previous_status,next_status,previous_payload,next_payload,reviewer_id)
 values(candidate,stored.content_status,next_status,stored.payload,next_payload,auth.uid());
 update public.question_corpus_candidates set payload=next_payload,content_status=next_status where id=candidate;
 return 'updated';
end $$;
revoke all on function public.review_corpus_candidate(text,text,jsonb,text,jsonb) from public,anon;
grant execute on function public.review_corpus_candidate(text,text,jsonb,text,jsonb) to authenticated,service_role;
