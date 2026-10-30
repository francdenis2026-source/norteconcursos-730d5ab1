-- Personal study and AI quota RPCs require a signed-in account.
-- Guest questions, public leaderboard and support contact are not modified.
begin;
revoke execute on function public.ai_try_consume(integer) from public, anon;
revoke execute on function public.ai_used_today() from public, anon;
revoke execute on function public.my_study_hours() from public, anon;
revoke execute on function public.my_subject_stats() from public, anon;
revoke execute on function public.study_time_today() from public, anon;
revoke execute on function public.register_study_visit() from public, anon;
revoke execute on function public.study_heartbeat(uuid, integer) from public, anon;
grant execute on function public.ai_try_consume(integer) to authenticated;
grant execute on function public.ai_used_today() to authenticated;
grant execute on function public.my_study_hours() to authenticated;
grant execute on function public.my_subject_stats() to authenticated;
grant execute on function public.study_time_today() to authenticated;
grant execute on function public.register_study_visit() to authenticated;
grant execute on function public.study_heartbeat(uuid, integer) to authenticated;
commit;
