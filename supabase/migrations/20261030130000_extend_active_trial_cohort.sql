-- One-time extension for the trial cohort still active at 2026-10-30 00:00 (Sao Paulo).
-- New registrations retain the usual 30 days; Premium/paid subscriptions unaffected.
do $migration$
declare fn text;
begin
  select pg_get_functiondef('public.effective_plan_tier(uuid)'::regprocedure) into fn;
  if position('start_at + make_interval(days => testing_days) > now()' in fn) = 0 then
    raise exception 'Effective plan function changed: refusing unsafe edit';
  end if;
  fn := replace(fn,
    'start_at + make_interval(days => testing_days) > now()',
    'start_at + make_interval(days => testing_days + case when created < timestamptz ''2026-10-30 00:00:00-03'' and start_at + interval ''30 days'' > timestamptz ''2026-10-30 00:00:00-03'' then 30 else 0 end) > now()'
  );
  execute fn;
end
$migration$;
