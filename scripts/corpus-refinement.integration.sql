do $$
declare c public.question_corpus_candidates; n jsonb; a bigint; result text;
begin
 select * into strict c from public.question_corpus_candidates where content_status='reviewed' and not(payload ? 'publication') and payload#>>'{individual_review,publication_approved}'='false' limit 1;
 n=c.payload || jsonb_build_object('individual_review',jsonb_build_object('publication_approved',false,'explanation','Synthetic rollback-only verification','refinement_reason','Primary source resolves the ambiguity','primary_evidence',jsonb_build_array(jsonb_build_object('url','https://example.org/official','title','Synthetic primary source','verified',true,'checked_at',now()))));
 begin
  perform set_config('request.jwt.claim.role','authenticated',true);
  perform set_config('request.jwt.claims','{"role":"authenticated"}',true);
  begin
   perform public.refine_held_corpus_candidate(c.id,c.content_status,c.payload,'rejected',n);
   raise exception 'Unauthorized call unexpectedly succeeded';
  exception when others then if sqlerrm<>'Administrator required' then raise; end if; end;
  perform set_config('request.jwt.claim.role','service_role',true);
  perform set_config('request.jwt.claims','{"role":"service_role"}',true);
  begin
   perform public.refine_held_corpus_candidate(c.id,c.content_status,'{}'::jsonb,'rejected',n);
   raise exception 'Stale call unexpectedly succeeded';
  exception when others then if sqlerrm<>'Stale review; reload current candidate' then raise; end if; end;
  begin
   perform public.refine_held_corpus_candidate(c.id,c.content_status,c.payload,'rejected',n || '{"raw_text":"changed"}'::jsonb);
   raise exception 'Immutable call unexpectedly succeeded';
  exception when others then if sqlerrm<>'Original extraction is immutable' then raise; end if; end;
  begin
   perform public.refine_held_corpus_candidate(c.id,c.content_status,c.payload,'rejected',jsonb_set(n,'{individual_review,primary_evidence}','[]'::jsonb));
   raise exception 'Missing evidence unexpectedly accepted';
  exception when others then if sqlerrm<>'Refinement requires reason and primary evidence' then raise; end if; end;
  begin
   perform public.refine_held_corpus_candidate(c.id,null,null,'rejected',n);
   raise exception 'Null expected state unexpectedly accepted';
  exception when others then if sqlerrm<>'Stale review; reload current candidate' then raise; end if; end;
  select count(*) into a from public.question_corpus_review_audit where candidate_id=c.id;
  result=public.refine_held_corpus_candidate(c.id,c.content_status,c.payload,'rejected',n);
  if result<>'updated' then raise exception 'Update failed'; end if;
  result=public.refine_held_corpus_candidate(c.id,c.content_status,c.payload,'rejected',n);
  if result<>'unchanged' then raise exception 'Idempotent retry failed'; end if;
  if (select count(*) from public.question_corpus_review_audit where candidate_id=c.id)<>a+1 then raise exception 'Duplicate audit'; end if;
  begin
   perform public.refine_held_corpus_candidate(c.id,'rejected',n,'rejected',n || '{"test_change":true}'::jsonb);
   raise exception 'Protected decision unexpectedly changed';
  exception when others then if sqlerrm<>'Only unpublished held decisions can be refined' then raise; end if; end;
  raise exception 'ROLLBACK_VERIFICATION_ONLY';
 exception when others then if sqlerrm<>'ROLLBACK_VERIFICATION_ONLY' then raise; end if; end;
 if not exists(select 1 from public.question_corpus_candidates where id=c.id and payload=c.payload and content_status=c.content_status) then raise exception 'Rollback did not preserve original'; end if;
 if (select count(*) from public.question_corpus_review_audit where candidate_id=c.id)<>a then raise exception 'Rollback retained synthetic audit'; end if;
 raise notice 'PASS authorization, stale-write rejection, immutable extraction, audited update, idempotent retry, protected decision, rollback preservation';
end $$;
