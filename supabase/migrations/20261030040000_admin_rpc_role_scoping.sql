-- Role-level boundary for administrative student data.
-- Internal has_role checks remain necessary and are NOT replaced.
-- Visitor RPCs for public questions and rankings are intentionally unchanged.
begin;
revoke execute on function public.admin_student_details(uuid) from public, anon;
revoke execute on function public.admin_student_progress(uuid, integer) from public, anon;
revoke execute on function public.admin_student_time(uuid) from public, anon;
revoke execute on function public.admin_students_access() from public, anon;
revoke execute on function public.admin_students_online() from public, anon;
grant execute on function public.admin_student_details(uuid) to authenticated;
grant execute on function public.admin_student_progress(uuid, integer) to authenticated;
grant execute on function public.admin_student_time(uuid) to authenticated;
grant execute on function public.admin_students_access() to authenticated;
grant execute on function public.admin_students_online() to authenticated;
commit;
