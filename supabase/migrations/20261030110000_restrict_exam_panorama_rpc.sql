-- exam_panorama already checks auth.uid() internally; restrict direct anonymous calls.
-- Public guest question and leaderboard RPCs remain untouched.
begin;
revoke execute on function public.exam_panorama() from public, anon;
grant execute on function public.exam_panorama() to authenticated;
commit;
