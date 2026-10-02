-- Concursos de Professor da Prefeitura de Feijó (2017 e 2018) feitos por Franc Denis
-- (CPF 69598193268). As provas existem como fotos e gabarito na planilha pessoal.
-- 2017: resultado ainda NÃO apurado; o registro entra na Linha do tempo geral SEM nota
-- (contagens zeradas e extracted_data sem itens), e a tela mostra "sem resultado" em vez
-- de um aproveitamento inventado.
-- 2017: sem resultado (faltam as questões 35-40 da prova). 2018: resultado real, bloco abaixo.
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
select u.id,'Prefeitura de Feijó','2018','FUNDAPE','resultado',
  'Feijo_2018_professor_resultado.txt','manual-entry/feijo-2018-franc-denis',
  33,14,0,74,
  '{"method": "leitura das marcações manuscritas nas fotos da prova (visto=acerto, X=erro), conferida com a nota escrita pelo candidato na capa (74 pontos) e com os pesos do edital 006/2018 (Quadro 05, 105 pontos; anuladas 32, 34 e 47 creditadas a todos)", "items": {"1": "correta", "2": "correta", "3": "correta", "4": "correta", "5": "correta", "6": "correta", "7": "correta", "8": "correta", "9": "correta", "10": "errada", "11": "correta", "12": "correta", "13": "correta", "14": "correta", "15": "correta", "16": "errada", "17": "correta", "18": "errada", "19": "errada", "20": "correta", "21": "correta", "22": "correta", "23": "correta", "24": "correta", "25": "correta", "26": "errada", "27": "correta", "28": "correta", "29": "errada", "30": "correta", "31": "errada", "32": "anulada", "33": "errada", "34": "anulada", "35": "errada", "36": "errada", "37": "correta", "38": "correta", "39": "errada", "40": "errada", "41": "correta", "42": "errada", "43": "correta", "44": "correta", "45": "correta", "46": "errada", "47": "anulada", "48": "correta", "49": "correta", "50": "correta"}}'::jsonb,
  'Concurso Professor Feijó 2018 (nível superior, pedagogo), edital 006/2018. 74 pontos de 105 (anotados pelo candidato na capa); 33 certas, 14 erradas, 3 anuladas (32, 34, 47). Aprovado.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- Caso o placeholder sem resultado já tenha sido gravado antes, atualiza para o resultado real.
update public.student_exam_documents d set
  exam_board='FUNDAPE', file_name='Feijo_2018_professor_resultado.txt',
  correct_count=33, wrong_count=14, blank_count=0, score_net=74,
  extracted_data='{"method": "leitura das marcações manuscritas nas fotos da prova (visto=acerto, X=erro), conferida com a nota escrita pelo candidato na capa (74 pontos) e com os pesos do edital 006/2018 (Quadro 05, 105 pontos; anuladas 32, 34 e 47 creditadas a todos)", "items": {"1": "correta", "2": "correta", "3": "correta", "4": "correta", "5": "correta", "6": "correta", "7": "correta", "8": "correta", "9": "correta", "10": "errada", "11": "correta", "12": "correta", "13": "correta", "14": "correta", "15": "correta", "16": "errada", "17": "correta", "18": "errada", "19": "errada", "20": "correta", "21": "correta", "22": "correta", "23": "correta", "24": "correta", "25": "correta", "26": "errada", "27": "correta", "28": "correta", "29": "errada", "30": "correta", "31": "errada", "32": "anulada", "33": "errada", "34": "anulada", "35": "errada", "36": "errada", "37": "correta", "38": "correta", "39": "errada", "40": "errada", "41": "correta", "42": "errada", "43": "correta", "44": "correta", "45": "correta", "46": "errada", "47": "anulada", "48": "correta", "49": "correta", "50": "correta"}}'::jsonb,
  notes='Concurso Professor Feijó 2018 (nível superior, pedagogo), edital 006/2018. 74 pontos de 105 (anotados pelo candidato na capa); 33 certas, 14 erradas, 3 anuladas (32, 34, 47). Aprovado.'
where d.storage_path='manual-entry/feijo-2018-franc-denis' and d.score_net=0;
