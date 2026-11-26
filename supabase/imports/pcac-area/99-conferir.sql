-- Resultado esperado: total = 640, sem_topico = 0 (todas ligadas à matriz do edital).
select count(*) as total, count(*) filter (where syllabus_topic_id is null) as sem_topico
from public.board_exam_questions where contest_name = $q$PC-AC 2026 — questão autoral$q$ and content_status = 'active';
