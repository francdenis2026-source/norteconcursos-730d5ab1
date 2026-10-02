-- Concursos de Professor da Prefeitura de Feijó (2017 e 2018) feitos por Franc Denis
-- (CPF 69598193268). As provas existem como fotos e gabarito na planilha pessoal, mas o
-- resultado (acertos/erros/brancos) ainda NÃO foi apurado. Estes registros colocam os dois
-- concursos na Linha do tempo geral SEM nota: contagens zeradas e extracted_data sem itens,
-- para que a tela mostre "sem resultado" em vez de um aproveitamento inventado.
-- Quando o resultado for apurado, atualizar estes registros (correct/wrong/blank/score_net e
-- extracted_data.items) em vez de inserir novos.
-- contest_name igual ao de official_exam_questions (2018: 'Prefeitura de Feijó', 43 itens).

insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Prefeitura de Feijó','2017',null,'resultado',
  'Feijo_2017_professor_sem_resultado.txt','manual-entry/feijo-2017-franc-denis',
  0,0,0,0,
  '{"method":"sem resultado apurado","items":{}}'::jsonb,
  'Concurso Professor Feijó 2017 (nível superior). Resultado ainda não apurado: fotos das provas e gabarito na planilha pessoal; faltam as respostas marcadas pelo candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Prefeitura de Feijó','2018',null,'resultado',
  'Feijo_2018_professor_sem_resultado.txt','manual-entry/feijo-2018-franc-denis',
  0,0,0,0,
  '{"method":"sem resultado apurado","items":{}}'::jsonb,
  'Concurso Professor Feijó 2018 (nível superior, pedagogo). Resultado ainda não apurado: fotos das provas e gabarito na planilha pessoal; faltam as respostas marcadas pelo candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
