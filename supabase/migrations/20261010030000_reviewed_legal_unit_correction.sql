-- Targeted, atomic corrections preserve unit identities and learner history.
create or replace function public.apply_reviewed_legal_unit_correction(p_unit uuid, p_expected_sha text, p_body text, p_source_sha text)
returns void language plpgsql security invoker set search_path=public as $$
declare u public.legal_course_units; c public.legal_courses;
begin
 perform pg_advisory_xact_lock(hashtextextended('library-law-review',0));
 select * into u from public.legal_course_units where id=p_unit for update;
 if not found or u.content_status<>'current' then raise exception 'Current unit unavailable'; end if;
 select * into c from public.legal_courses where id=u.course_id;
 if c.status<>'active' or c.source_sha256 is distinct from p_source_sha then raise exception 'Official source version changed'; end if;
 if p_body is null or length(trim(p_body))=0 then raise exception 'Empty correction'; end if;
 if u.body_text=p_body then return; end if;
 if u.content_sha256 is distinct from p_expected_sha
  or encode(sha256(convert_to(u.body_text,'UTF8')),'hex') is distinct from p_expected_sha then raise exception 'Concurrent unit change'; end if;
 update public.legal_course_units set body_text=p_body,
  content_sha256=encode(sha256(convert_to(p_body,'UTF8')),'hex') where id=p_unit;
end $$;
revoke all on function public.apply_reviewed_legal_unit_correction(uuid,text,text,text) from public, anon, authenticated;
grant execute on function public.apply_reviewed_legal_unit_correction(uuid,text,text,text) to service_role;
