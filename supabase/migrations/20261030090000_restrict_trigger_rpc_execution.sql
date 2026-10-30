-- Trigger functions are run by the database trigger mechanism, not REST RPC calls.
-- Do not allow visitors to execute them directly. Existing trigger bindings remain untouched.
begin;
revoke execute on function public.block_free_plan_insert() from public, anon;
revoke execute on function public.enforce_daily_question_limit() from public, anon;
revoke execute on function public.enforce_monthly_mock_limit() from public, anon;
revoke execute on function public.guard_question_import_duplicate() from public, anon;
revoke execute on function public.handle_new_user() from public, anon;
revoke execute on function public.protect_subscription_fields() from public, anon;
revoke execute on function public.refresh_support_question_import_keys() from public, anon;
revoke execute on function public.update_rank_after_simulator() from public, anon;
commit;
