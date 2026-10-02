-- Feijó 2017 (Professor/Pedagogo, edital 005/2017, FUNDAPE): resultado final do candidato.
-- Substitui o placeholder 'sem resultado' de 20261002010000.
--
-- Fontes: nota 59,5 (sem os títulos) anotada na capa da prova; itens 1-34 lidos nas fotos
-- (visto = acerto, X = erro); itens 10 e 24 ANULADOS pela banca (conferência anterior contra o
-- gabarito oficial FUNDAPE, ver 20260928040000); itens 16 e 20 deixados em branco pelo candidato.
-- Pesos do edital (Quadro 07): Port 10x2, Mat 10x1,5, Conhec 5x1, Específicos 15x4 (100 pts).
-- Conta: Port 8 certas + 1 anulada = 9x2 = 18; Mat 7x1,5 = 10,5; Conhec 2 + 1 anulada = 3;
-- Específicos 6x4 = 24; total 55,5. Os 4 pontos restantes até 59,5 equivalem a um item de
-- 35-40, que não está nas fotos nem no gabarito pessoal e por isso não entra nas contagens.

update public.student_exam_documents set
  exam_board='FUNDAPE', file_name='Feijo_2017_professor_resultado.txt',
  correct_count=23, wrong_count=7, blank_count=2, score_net=59.5,
  extracted_data='{"method": "nota 59,5 anotada pelo candidato na capa (sem os títulos). Itens 1-34 lidos nas fotos; 10 e 24 anulados pela banca; 16 e 20 em branco. Itens 35-40 sem registro (a diferença de 4 pontos até 59,5 equivale a um item específico nessa faixa)", "items": {"1": "correta", "2": "correta", "3": "correta", "4": "correta", "5": "correta", "6": "errada", "7": "correta", "8": "correta", "9": "correta", "10": "anulada", "11": "correta", "12": "correta", "13": "correta", "14": "correta", "15": "correta", "16": "branco", "17": "correta", "18": "errada", "19": "correta", "20": "branco", "21": "errada", "22": "correta", "23": "errada", "24": "anulada", "25": "correta", "26": "errada", "27": "correta", "28": "correta", "29": "correta", "30": "errada", "31": "correta", "32": "correta", "33": "errada", "34": "correta"}}'::jsonb,
  notes='Concurso Professor Feijó 2017 (nível superior), edital 005/2017. Nota oficial 59,5 de 100 pontos, sem os títulos (anotada pelo candidato na capa). Aprovado, efetivo. Itens 10 e 24 anulados; 16 e 20 em branco; itens 35-40 sem registro.'
where storage_path='manual-entry/feijo-2017-franc-denis';
