-- Keep score_events()'s answered-response count grouped once per attempt.
-- The live project may already contain this change; this migration is idempotent.
-- Compare score output before and after and abort if ranking results change.
DO $migration$
DECLARE
  v_def text;
  v_before jsonb;
  v_after jsonb;
  v_old_count text := '(select count(*) from public.simulator_responses rr where rr.attempt_id = r.attempt_id and rr.selected_answer is not null) as answered';
  v_new_count text := 'coalesce(ab.answered, 0) as answered';
BEGIN
  SELECT coalesce(jsonb_agg(to_jsonb(s) ORDER BY s.user_id), '[]'::jsonb)
    INTO v_before
  FROM public.score_events() s;

  SELECT pg_get_functiondef('public.score_events(timestamptz)'::regprocedure)
    INTO v_def;

  IF position('answered_by_attempt as' IN v_def) > 0 THEN
    -- Already optimized; no change needed.
    RETURN;
  END IF;

  IF position(v_old_count IN v_def) = 0 THEN
    RAISE EXCEPTION 'score_events(): expected correlated answered count not found; refusing to rewrite';
  END IF;

  v_def := replace(
    v_def,
    '  sr as (',
    E'  answered_by_attempt as (\n    select attempt_id, count(*)::int as answered\n    from public.simulator_responses\n    where selected_answer is not null\n    group by attempt_id\n  ),\n  sr as ('
  );
  v_def := replace(v_def, v_old_count, v_new_count);
  v_def := replace(
    v_def,
    '    join public.simulator_attempts a on a.id = r.attempt_id',
    E'    join public.simulator_attempts a on a.id = r.attempt_id\n    left join answered_by_attempt ab on ab.attempt_id = r.attempt_id'
  );

  IF position('answered_by_attempt as' IN v_def) = 0
     OR position(v_new_count IN v_def) = 0
     OR position('left join answered_by_attempt ab on ab.attempt_id = r.attempt_id' IN v_def) = 0 THEN
    RAISE EXCEPTION 'score_events(): rewrite validation failed; refusing to apply';
  END IF;

  EXECUTE v_def;

  SELECT coalesce(jsonb_agg(to_jsonb(s) ORDER BY s.user_id), '[]'::jsonb)
    INTO v_after
  FROM public.score_events() s;

  IF v_before IS DISTINCT FROM v_after THEN
    RAISE EXCEPTION 'score_events(): output changed after optimization; transaction rolled back';
  END IF;
END
$migration$;
