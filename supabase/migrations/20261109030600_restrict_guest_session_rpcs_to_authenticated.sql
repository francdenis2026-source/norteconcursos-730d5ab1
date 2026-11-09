-- Session RPCs require an anonymous-auth JWT (Postgres role: authenticated).
-- Do not expose these SECURITY DEFINER entry points to the public anon role.
revoke all on function public.start_daily_guest_session(uuid) from anon;
revoke all on function public.get_daily_guest_progress(uuid) from anon;
revoke all on function public.grade_daily_guest_answer(uuid,uuid,text) from anon;

grant execute on function public.start_daily_guest_session(uuid) to authenticated;
grant execute on function public.get_daily_guest_progress(uuid) to authenticated;
grant execute on function public.grade_daily_guest_answer(uuid,uuid,text) to authenticated;
