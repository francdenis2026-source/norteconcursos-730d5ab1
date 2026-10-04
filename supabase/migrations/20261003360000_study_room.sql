-- Sala de estudo: guarda o tempo realmente cronometrado (só foco, sem pausas) de cada bloco concluído.
alter table public.study_plan_checks add column if not exists actual_seconds integer not null default 0
  check (actual_seconds >= 0 and actual_seconds <= 86400);
