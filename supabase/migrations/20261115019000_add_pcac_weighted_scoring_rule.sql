-- Persist the PC-AC 2026 weighted scoring rule alongside existing simple/net rules.
alter table public.simulator_attempt_results
  drop constraint if exists simulator_attempt_results_scoring_rule_check;

alter table public.simulator_attempt_results
  add constraint simulator_attempt_results_scoring_rule_check
  check (scoring_rule = any (array[
    'simple'::text,
    'net_one_to_one'::text,
    'pcac_2026_weighted'::text
  ]));
