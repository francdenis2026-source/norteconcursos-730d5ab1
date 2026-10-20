\set ON_ERROR_STOP 1
insert into auth.users values ('00000000-0000-0000-0000-0000000000a1'),('00000000-0000-0000-0000-0000000000a2');
insert into public.question_support_texts(id, body) values ('99999999-0000-0000-0000-000000000001','texto base compartilhado');
-- Q1,Q2 distintos que compartilham apoio; Q3/Q3b idênticos (Agente x Papiloscopista) em board; Q4 oficial comum
insert into public.official_exam_questions(id,contest_name,exam_year,exam_board,question_text,official_answer,support_text_id) values
 ('10000000-0000-0000-0000-000000000001','Prova X',2026,'FGV','Item sobre alfa alfa alfa alfa','C','99999999-0000-0000-0000-000000000001'),
 ('10000000-0000-0000-0000-000000000002','Prova X',2026,'FGV','Item sobre beta beta beta beta','E','99999999-0000-0000-0000-000000000001'),
 ('10000000-0000-0000-0000-000000000004','Prova X',2026,'FGV','Item sobre delta delta delta delta','C',null);
insert into public.board_exam_questions(id,board,contest_name,career_name,exam_year,item_number,support_text,stem,options,official_answer) values
 ('30000000-0000-0000-0000-00000000000a','FGV','PC-PR','Agente',2026,5,null,'Captura de data e hora da foto','{"A":"x","B":"y"}','B'),
 ('30000000-0000-0000-0000-00000000000b','FGV','PC-PR','Papiloscopista',2026,5,null,'Captura  de data e hora da foto','{"A":"x","B":"y"}','B'),
 ('30000000-0000-0000-0000-00000000000c','FGV','PC-PR','Agente',2026,6,null,'Outra questão da foto','{"A":"x","B":"y"}','A');
-- u1: Q1 errada rápida (2s) e depois certa lenta -> consome, 0 ponto
insert into public.question_training_responses(user_id,question_id,question_source,selected_answer,response_seconds,created_at) values
 ('00000000-0000-0000-0000-0000000000a1','10000000-0000-0000-0000-000000000001','official','E',2, now()-interval '2 hours'),
 ('00000000-0000-0000-0000-0000000000a1','10000000-0000-0000-0000-000000000001','official','C',20, now()-interval '1 hour');
-- u1: Q4 certa no treinador (conta); depois no simulador (repetida)
insert into public.question_training_responses(user_id,question_id,question_source,selected_answer,response_seconds,created_at) values
 ('00000000-0000-0000-0000-0000000000a1','10000000-0000-0000-0000-000000000004','official','C',15, now()-interval '3 hours');
-- u1: Agente (a) no treinador e Papiloscopista (b) no simulador => mesma questão
insert into public.question_training_responses(user_id,question_id,question_source,selected_answer,response_seconds,created_at) values
 ('00000000-0000-0000-0000-0000000000a1','30000000-0000-0000-0000-00000000000a','official','B',30, now()-interval '4 hours');
-- duas abas: mesma questão Q2 gravada em dois instantes quase iguais
insert into public.question_training_responses(user_id,question_id,question_source,selected_answer,response_seconds,created_at) values
 ('00000000-0000-0000-0000-0000000000a2','10000000-0000-0000-0000-000000000002','official','E',30, now()-interval '1 hour'),
 ('00000000-0000-0000-0000-0000000000a2','10000000-0000-0000-0000-000000000002','official','E',30, now()-interval '1 hour');
-- simulador do u1: Q4(rep), Q2 (inédita p/ u1, errada), board b (rep via alias de conteúdo), board c (inédita)
insert into public.simulator_attempts(id,user_id,duration_seconds,finished_at) values ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1',600, now());
insert into public.simulator_responses(attempt_id,user_id,question_id,selected_answer) values
 ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','10000000-0000-0000-0000-000000000004','C'),
 ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','10000000-0000-0000-0000-000000000002','C'),
 ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','30000000-0000-0000-0000-00000000000b','B'),
 ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1','30000000-0000-0000-0000-00000000000c','A'),
 ('50000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000a1',null,null) ;

do $$
declare r record;
begin
  -- itens idênticos de dois cargos viram uma questão canônica; itens só com apoio comum continuam distintos
  assert (select canonical_id from public.question_canonical_map() where question_id = '30000000-0000-0000-0000-00000000000b')
       = '30000000-0000-0000-0000-00000000000a', 'duplicate not mapped to canonical';
  assert (select count(distinct canonical_id) from public.question_canonical_map()
          where question_id in ('10000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002')) = 2,
         'distinct items sharing a support text were merged';

  -- u1: resposta rápida errada consome a questão; repetir devagar e certo não vale; duplicata de cargo conta uma vez
  select * into r from public.score_events() where user_id = '00000000-0000-0000-0000-0000000000a1';
  assert r.qp = 6, format('u1 trainer points expected 6, got %s', r.qp);
  assert r.qn = 4 and r.qc = 3, format('u1 answers counted expected 4/3, got %s/%s', r.qn, r.qc);

  -- u2: duas abas gravaram a mesma questão; só uma pontua
  select * into r from public.score_events() where user_id = '00000000-0000-0000-0000-0000000000a2';
  assert r.qp = 3 and r.qn = 1, format('u2 expected one scored answer, got %s/%s', r.qp, r.qn);
end $$;

set test.uid = '00000000-0000-0000-0000-0000000000a1';
do $$
declare r record;
begin
  -- simulado do u1: 4 respostas, 2 já respondidas antes (Q4 e o cadastro duplicado) => 2 contam, 2 repetidas
  select * into r from public.simulator_attempt_ranking(array['50000000-0000-0000-0000-000000000001'::uuid]);
  assert r.answered = 4 and r.counted = 2 and r.repeated = 2 and r.attempt_valid,
         format('attempt ranking unexpected: %s', r);
  -- a resposta rápida errada ao Q1 consumiu a questão, sem pontuar
  assert exists (select 1 from public.my_answered_questions()
                 where question_id = '10000000-0000-0000-0000-000000000001' and not counts_for_ranking),
         'fast first answer should consume the question';
  assert public.question_public_code('board_exam_questions', '30000000-0000-0000-0000-00000000000a') = 'BD-3000-0000-0000';
end $$;
select 'ok: first-attempt scenarios passed' as result;
