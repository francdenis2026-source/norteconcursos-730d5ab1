-- Somente leitura. Lista itens idênticos cadastrados mais de uma vez para a MESMA prova
-- (concurso + ano + banca + gabarito + texto completo), por exemplo os itens comuns a Agente e
-- Papiloscopista da PC-PR 2026. Mesma regra de public.question_canonical_map().
-- Itens diferentes que apenas dividem o texto de apoio NÃO aparecem aqui (o enunciado difere).
with fp as (
  select 'board_exam_questions'::text as tbl, b.id, b.contest_name, b.exam_year, b.board as exam_board,
         b.career_name, b.exam_type, b.item_number, b.content_status,
         md5(concat_ws('|', public._normalize_question_text(b.contest_name), b.exam_year::text,
             public._normalize_question_text(b.board), b.official_answer, public._normalize_question_text(b.support_text),
             public._normalize_question_text(b.stem), public._normalize_question_text(b.options::text))) as fingerprint
  from public.board_exam_questions b
  union all
  select 'official_exam_questions', o.id, o.contest_name, o.exam_year, o.exam_board,
         o.career_name, null, o.item_number, o.content_status,
         md5(concat_ws('|', public._normalize_question_text(o.contest_name), o.exam_year::text,
             public._normalize_question_text(o.exam_board), o.official_answer, coalesce(o.support_text_id::text, ''),
             public._normalize_question_text(o.question_text)))
  from public.official_exam_questions o
)
select fingerprint, tbl, contest_name, exam_year, exam_board, count(*) as cadastros,
       array_agg(career_name order by career_name) as cargos,
       array_agg(content_status order by career_name) as status,
       array_agg(id order by career_name) as ids
from fp
group by fingerprint, tbl, contest_name, exam_year, exam_board
having count(*) > 1
order by contest_name, exam_year, cadastros desc;
