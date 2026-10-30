-- Private student entitlement and achievement metrics should not be directly callable by anon.
-- Internal checks in other RPCs and all plan entitlements remain unchanged.
begin;
revoke execute on function public.can_register_student_exams(uuid) from public, anon;
revoke execute on function public.medal_metrics(uuid) from public, anon;
grant execute on function public.can_register_student_exams(uuid) to authenticated;
grant execute on function public.medal_metrics(uuid) to authenticated;
commit;
