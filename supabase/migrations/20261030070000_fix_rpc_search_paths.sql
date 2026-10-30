-- Fix mutable search_path findings without changing plan access or limits.
begin;
alter function public.set_updated_at() set search_path = public, pg_temp;
alter function public.daily_question_limit(text) set search_path = public, pg_temp;
alter function public.check_user_tier_limit(uuid, text) set search_path = public, pg_temp;
alter function public.get_current_acre_date() set search_path = public, pg_temp;
alter function public.touch_study_materials_updated_at() set search_path = public, pg_temp;
alter function public.server_now() set search_path = public, pg_temp;
alter function public.normalize_pt_text(text) set search_path = public, pg_temp;
alter function public.level_of(integer) set search_path = public, pg_temp;
alter function public.monthly_mock_limit(text) set search_path = public, pg_temp;
commit;
