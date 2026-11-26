-- Liga as questões de "Realidade do Acre" ao tópico do edital (o nome da disciplina no edital é um pouco diferente).
update public.board_exam_questions q
set syllabus_topic_id = (
  select t.id from public.syllabus_topics t
  join public.syllabus_editions e on e.id = t.edition_id
  where e.contest_name = 'Polícia Civil do Acre' and e.role_name = 'Oficial Investigador de Polícia'
    and t.discipline ilike 'Realidade%'
  order by t.id limit 1)
where q.contest_name = $q$PC-AC 2026 — questão autoral$q$ and q.syllabus_topic_id is null;

select count(*) as total, count(*) filter (where syllabus_topic_id is null) as sem_topico
from public.board_exam_questions where contest_name = $q$PC-AC 2026 — questão autoral$q$ and content_status = 'active';
