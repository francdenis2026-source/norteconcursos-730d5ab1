-- Aumenta o teto diário de questões que pontuam no ranking de 100 para 200.
-- Idempotente: reescreve a função atual do banco trocando só "v.rn <= 100".
DO $migration$
DECLARE
  v_def text;
BEGIN
  SELECT pg_get_functiondef('public.score_events(timestamptz)'::regprocedure) INTO v_def;
  IF position('v.rn <= 200' IN v_def) > 0 THEN RETURN; END IF;
  IF position('v.rn <= 100' IN v_def) = 0 THEN
    RAISE EXCEPTION 'score_events(): trecho "v.rn <= 100" não encontrado; nada foi alterado';
  END IF;
  EXECUTE replace(v_def, 'v.rn <= 100', 'v.rn <= 200');
END
$migration$;
