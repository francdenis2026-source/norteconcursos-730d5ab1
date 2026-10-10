-- Visible source, amendment and vigency evidence for reviewed library content.
alter table public.study_materials add column if not exists legal_review jsonb;
alter table public.legal_courses add column if not exists legal_review jsonb;
comment on column public.study_materials.legal_review is 'Dated official-source comparison, editorial corrections and amendment/vigency notices; not an automatic legal monitor.';

-- One atomic publication: stale snapshots abort before any content is changed.
-- Existing course units, learner progress and personal records are never replaced.
create or replace function public.apply_library_law_review(p_package jsonb, p_reviewer uuid)
returns jsonb language plpgsql security invoker set search_path=public as $$
declare r jsonb; m public.study_materials; c public.legal_courses; e public.study_material_enrichments;
 patch jsonb; changed integer:=0; preserved integer:=0;
begin
 if p_reviewer is null
  or jsonb_typeof(p_package->'materials') is distinct from 'array'
  or jsonb_typeof(p_package->'courses') is distinct from 'array'
  or jsonb_typeof(p_package->'enrichments') is distinct from 'array'
  or coalesce(p_package->>'version','')='' then raise exception 'Invalid review package'; end if;
 perform pg_advisory_xact_lock(hashtextextended('library-law-review',0));
 for r in select value from jsonb_array_elements(p_package->'materials') loop
  select * into m from public.study_materials where slug=r->>'slug' for update;
  patch=r->'patch';
  if not found or m.content_status<>'active' then raise exception 'Material unavailable: %',r->>'slug'; end if;
  if to_jsonb(m) @> (patch-'law_version_checked_at') and m.law_version_checked_at=(patch->>'law_version_checked_at')::timestamptz then continue; end if;
  if not (to_jsonb(m) @> ((r->'expected')-'body_sha256'-'updated_at'))
   or m.updated_at is distinct from (r->'expected'->>'updated_at')::timestamptz
   or encode(sha256(convert_to(m.body_md,'UTF8')),'hex') is distinct from r->'expected'->>'body_sha256' then raise exception 'Concurrent material change: %',m.slug; end if;
  if exists(select 1 from jsonb_object_keys(patch) as keys(key) where key not in ('body_md','quiz','flashcards','legal_basis','source_note','title','summary','law_version_checked_at','legal_review'))
   or jsonb_typeof(patch->'legal_review') is distinct from 'object' or (patch->>'law_version_checked_at')::timestamptz>now()+interval '5 minutes'
   then raise exception 'Invalid material patch'; end if;
 end loop;
 for r in select value from jsonb_array_elements(p_package->'courses') loop
  select * into c from public.legal_courses where id=(r->>'id')::uuid for update;
  if not found or c.status<>'active' then raise exception 'Course unavailable'; end if;
  if to_jsonb(c) @> ((r->'patch')-'checked_at') and c.checked_at=(r->'patch'->>'checked_at')::timestamptz then continue; end if;
  if not (to_jsonb(c) @> ((r->'expected')-'checked_at')) or c.checked_at is distinct from (r->'expected'->>'checked_at')::timestamptz then raise exception 'Concurrent course change: %',c.slug; end if;
  if exists(select 1 from jsonb_object_keys(r->'patch') as keys(key) where key not in ('checked_at','source_sha256','legal_review')) then raise exception 'Invalid course patch'; end if;
 end loop;
 for r in select value from jsonb_array_elements(p_package->'enrichments') loop
  select * into e from public.study_material_enrichments where id=(r->>'id')::uuid for update;
  if not found or e.status<>'active' then raise exception 'Examples unavailable'; end if;
  if not to_jsonb(e) @> (r->'patch') and not to_jsonb(e) @> (r->'expected') then raise exception 'Concurrent examples change'; end if;
  if exists(select 1 from jsonb_object_keys(r->'patch') as keys(key) where key<>'source_body_sha256') then raise exception 'Invalid examples patch'; end if;
 end loop;
 for r in select value from jsonb_array_elements(p_package->'materials') loop
  select * into m from public.study_materials where slug=r->>'slug';patch=r->'patch';
  if to_jsonb(m) @> (patch-'law_version_checked_at') and m.law_version_checked_at=(patch->>'law_version_checked_at')::timestamptz then preserved=preserved+1;continue;end if;
  m=jsonb_populate_record(m,patch);
  update public.study_materials set body_md=m.body_md,quiz=m.quiz,flashcards=m.flashcards,legal_basis=m.legal_basis,
   source_note=m.source_note,title=m.title,summary=m.summary,law_version_checked_at=m.law_version_checked_at,
   legal_review=m.legal_review,reviewed_by=p_reviewer,reviewed_at=now() where id=m.id;
  changed=changed+1;
 end loop;
 for r in select value from jsonb_array_elements(p_package->'courses') loop
  update public.legal_courses set checked_at=(r->'patch'->>'checked_at')::timestamptz,
   source_sha256=r->'patch'->>'source_sha256',legal_review=r->'patch'->'legal_review',reviewed_by=p_reviewer,reviewed_at=now()
   where id=(r->>'id')::uuid and not (to_jsonb(legal_courses) @> ((r->'patch')-'checked_at') and checked_at=(r->'patch'->>'checked_at')::timestamptz);
 end loop;
 for r in select value from jsonb_array_elements(p_package->'enrichments') loop
  update public.study_material_enrichments set source_body_sha256=r->'patch'->>'source_body_sha256'
   where id=(r->>'id')::uuid and not to_jsonb(study_material_enrichments) @> (r->'patch');
 end loop;
 return jsonb_build_object('materials_updated',changed,'materials_preserved',preserved,'courses_checked',jsonb_array_length(p_package->'courses'));
end $$;
revoke all on function public.apply_library_law_review(jsonb,uuid) from public,anon,authenticated;
grant execute on function public.apply_library_law_review(jsonb,uuid) to service_role;
