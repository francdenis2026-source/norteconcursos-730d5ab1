\set ON_ERROR_STOP 1
insert into auth.users values ('00000000-0000-0000-0000-0000000000a1');
-- PC-PR: mesmo item em dois cargos; PC Acre: 3 linhas iguais no MESMO cargo (não é duplicata)
insert into public.board_exam_questions(id,board,contest_name,career_name,exam_year,item_number,support_text,stem,options,official_answer) values
 ('30000000-0000-0000-0000-00000000000a','FGV','PC-PR','Agente',2026,5,null,'Captura de data e hora da foto','{"A":"x","B":"y"}','B'),
 ('30000000-0000-0000-0000-00000000000b','FGV','PC-PR','Papiloscopista',2026,5,null,'Captura  de data e hora da foto','{"A":"x","B":"y"}','B');
insert into public.official_exam_questions(id,contest_name,exam_year,exam_board,career_name,item_number,question_text,official_answer) values
 ('40000000-0000-0000-0000-000000000001','Policia Civil do Acre',2017,'IBADE','Escrivao',1,'Texto repetido em varias linhas do mesmo cargo','C'),
 ('40000000-0000-0000-0000-000000000002','Policia Civil do Acre',2017,'IBADE','Escrivao',2,'Texto repetido em varias linhas do mesmo cargo','C'),
 ('50000000-0000-0000-0000-000000000001','Policia Federal',2021,'CEBRASPE','Agente',9,'Item comum de conhecimentos gerais da PF','E'),
 ('50000000-0000-0000-0000-000000000002','Policia Federal',2021,'CEBRASPE','Escrivao',9,'Item comum de conhecimentos gerais da PF','E');
do $$ begin
  assert public.question_equivalent_ids('board_exam_questions','30000000-0000-0000-0000-00000000000b') @> array['30000000-0000-0000-0000-00000000000a'::uuid];
  assert public.question_equivalent_ids('official_exam_questions','40000000-0000-0000-0000-000000000001') = array['40000000-0000-0000-0000-000000000001'::uuid], 'same-career group must be ignored';
  assert array_length(public.question_equivalent_ids('official_exam_questions','50000000-0000-0000-0000-000000000002'),1) = 2;
end $$;
set test.uid = '00000000-0000-0000-0000-0000000000a1';
-- treinador responde o cargo Agente; depois simulado responde o Papiloscopista (equivalente)
insert into public.question_training_responses(user_id,question_id,question_source,selected_answer,response_seconds) values ('00000000-0000-0000-0000-0000000000a1','30000000-0000-0000-0000-00000000000a','official','B',20);
insert into public.simulator_attempts(id,user_id,duration_seconds) values ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1',900);
insert into public.simulator_responses(attempt_id,user_id,question_id,question_source,question_order,selected_answer) values
 ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','30000000-0000-0000-0000-00000000000b','official',1,'B'),
 ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','50000000-0000-0000-0000-000000000001','official',2,'E'),
 ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','50000000-0000-0000-0000-000000000002','official',3,'E'),
 ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','40000000-0000-0000-0000-000000000001','official',4,'C'),
 ('60000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','40000000-0000-0000-0000-000000000002','official',5,'C');
do $$
declare r record;
begin
  select count(*) filter (where ranking_first) as firsts, count(*) as total into r from public.simulator_responses;
  -- b é equivalente ao treinador (a): repetida. PF agente conta; PF escrivão repetida. Acre: 2 linhas distintas contam as duas.
  assert r.firsts = 3, format('expected 3 first answers in simulator, got %s of %s', r.firsts, r.total);
  assert (select ranking_first from public.simulator_responses where question_order = 1) = false, 'cross-career duplicate must not score';
  assert (select ranking_first from public.simulator_responses where question_order = 3) = false;
  assert (select ranking_first from public.simulator_responses where question_order in (4)) = true;
  assert (select ranking_first from public.simulator_responses where question_order in (5)) = true;
end $$;
select 'ok: equivalent reservation scenarios passed' as result;
