-- Personal achievements need the user's auth.uid(); visitor routes remain untouched.
begin;
revoke execute on function public.award_achievements() from public, anon;
revoke execute on function public.medal_progress() from public, anon;
grant execute on function public.award_achievements() to authenticated;
grant execute on function public.medal_progress() to authenticated;
commit;
