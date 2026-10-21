begin;
create function pg_temp.must_reject_duplicate(statement text) returns void language plpgsql as $$
begin
  execute statement;
  raise exception 'A duplicata não foi bloqueada: %', statement;
exception when unique_violation then null;
end $$;

do $$
declare first_id uuid; second_id uuid; old_key text;
begin
  assert (select count(*) from public.board_exam_questions)=2, 'preserve legacy rows';
  assert (select count(import_unique_key) from public.board_exam_questions)=1;
  update public.board_exam_questions set review_note='Revisão preservada' where item_number=2;
  insert into public.board_exam_questions(item_number,stem) values(2,'Legado repetido que precisa manter suas referências.')
    on conflict(board,contest_name,career_name,exam_year,exam_type,item_number) do update set review_note='Reimportação idempotente';
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,stem) values(3,'LEGADO repetido que precisa manter suas referências.')$q$);
  delete from public.board_exam_questions where item_number=1;
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,stem) values(3,'Legado repetido que precisa manter suas referências.')$q$);

  insert into public.board_exam_questions(item_number,stem) values(10,E'Uma questão\n  com espaços e acentuação.') returning id into first_id;
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,stem) values(11,'UMA QUESTÃO com espaços e acentuação.')$q$);
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,exam_type,stem,official_answer) values(11,'Tipo 2','Uma questão com espaços e acentuação.','B')$q$);
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,stem,import_content_key,import_unique_key) values(12,'Uma questão com espaços e acentuação.',null,null)$q$);
  update public.board_exam_questions set import_content_key=null,import_unique_key=null where id=first_id;
  assert (select import_unique_key is not null from public.board_exam_questions where id=first_id), 'no column bypass';
  insert into public.board_exam_questions(item_number,stem) values(12,'Outra pergunta, mesmo texto de apoio.') returning id into second_id;
  perform pg_temp.must_reject_duplicate(format('update public.board_exam_questions set stem=%L where id=%L','Uma questão com espaços e acentuação.',second_id));
  insert into public.board_exam_questions(item_number,stem,options) values(13,'Uma questão com espaços e acentuação.','{"A":"Alternativa distinta","B":"Outra resposta"}');
  insert into public.board_exam_questions(item_number,stem,career_name) values(14,'Uma questão com espaços e acentuação.','Delegado');
  insert into public.board_exam_questions(item_number,stem,exam_year) values(15,'Uma questão com espaços e acentuação.',2025);
  insert into public.board_exam_questions(item_number,stem,support_text) values(16,'Uma questão com espaços e acentuação.','Outro contexto que muda a pergunta.');
  insert into public.board_exam_questions(item_number,stem,support_text) values(17,'Pergunta diferente sobre o mesmo contexto.','Outro contexto que muda a pergunta.');
  insert into public.board_exam_questions(item_number,stem,needs_visual) values(18,'Observe a figura.',true),(19,'Observe a figura.',true);
  insert into public.board_exam_questions(item_number,stem,needs_visual,figure_urls) values(20,'Observe a figura.',true,'["https://example.test/a.png"]'),(21,'Observe a figura.',true,'["https://example.test/b.png"]');
  perform pg_temp.must_reject_duplicate($q$insert into public.board_exam_questions(item_number,stem,needs_visual,figure_urls) values(22,'Observe a figura.',true,'["https://example.test/a.png"]')$q$);

  insert into public.question_support_texts(label,body) values('Texto I','Um texto compartilhado entre perguntas diferentes.') returning id into first_id;
  perform pg_temp.must_reject_duplicate($q$insert into public.question_support_texts(label,body) values('Outro título',E' UM TEXTO compartilhado\nentre perguntas diferentes. ')$q$);
  insert into public.official_exam_questions(item_number,question_text,support_text_id) values(1,'Qual é a tese principal?',first_id),(2,'Qual é o sentido da palavra?',first_id);
  perform pg_temp.must_reject_duplicate(format('insert into public.official_exam_questions(item_number,question_text,support_text_id) values(3,%L,%L)','Qual é a tese principal?',first_id));
  select import_content_key into old_key from public.official_exam_questions where item_number=1;
  update public.question_support_texts set body='Texto de apoio corrigido, com outro contexto.' where id=first_id;
  assert (select import_content_key<>old_key from public.official_exam_questions where item_number=1), 'linked text edit refreshes keys';
  perform pg_temp.must_reject_duplicate(format('insert into public.official_exam_questions(item_number,question_text,support_text_id) values(3,%L,%L)','Qual é a tese principal?',first_id));

  insert into public.curated_question_catalog(question_text,source_id) values('Conteúdo autoral sintético.',gen_random_uuid());
  perform pg_temp.must_reject_duplicate($q$insert into public.curated_question_catalog(question_text,source_id) values('CONTEÚDO autoral sintético.',gen_random_uuid())$q$);
  insert into public.question_bank(user_id,question_text) values('00000000-0000-4000-8000-000000000001','Pergunta da conta.'),('00000000-0000-4000-8000-000000000002','Pergunta da conta.');
  perform pg_temp.must_reject_duplicate($q$insert into public.question_bank(user_id,question_text) values('00000000-0000-4000-8000-000000000001','PERGUNTA da conta.')$q$);
  assert public.normalize_question_import_text('ano') <> public.normalize_question_import_text('anão');
  assert public.normalize_question_import_text('x > 10') <> public.normalize_question_import_text('x > 100');
  assert public.normalize_question_import_text('x < 10') <> public.normalize_question_import_text('x > 10');
end $$;
rollback;
