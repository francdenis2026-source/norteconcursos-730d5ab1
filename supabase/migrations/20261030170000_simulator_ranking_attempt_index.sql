-- Speeds up per-attempt answered-response counts used by score_events().
-- Partial index matches the selected_answer IS NOT NULL predicate in ranking queries.
CREATE INDEX IF NOT EXISTS idx_simulator_responses_attempt_answered
  ON public.simulator_responses (attempt_id)
  WHERE selected_answer IS NOT NULL;

ANALYZE public.simulator_responses;
