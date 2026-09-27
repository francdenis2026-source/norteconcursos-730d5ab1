-- Correct Polícia Penal do Acre 2023 scoring to the official formula from Edital nº
-- 001/2023 - SEAD/IAPEN, item 7.1.1/7.1.3: the objective exam is NOT a simple
-- correct-count out of 60 (no negative marking, but also not flat 1pt/item) — it
-- is weighted: Conhecimentos Gerais (Língua Portuguesa, História e Geografia do
-- Acre, Informática Básica; itens 1-30) worth 1 point each (30 pts max, mínimo
-- exigido 15), and Conhecimentos Específicos (itens 31-60) worth 2 points each
-- (60 pts max, mínimo exigido 30), for a grand total of 90 points (mínimo exigido
-- 45 no total). The candidate must clear all three minimums cumulatively to be
-- HABILITADO in this stage.
--
-- Also uses the candidate's own retyped answer list (more reliable than the
-- earlier photo-based reading), replacing the previous grading (47/12/1/0)
-- with 47/11/1/1 (item 6 blank instead of errada) — same set of wrong items
-- minus one, since accuracy at the item level didn't change materially.
--
-- Recomputed by discipline:
--   Língua Portuguesa (1-10): 7 corretas = 7 pts
--   História e Geografia do Acre (11-20): 10 corretas = 10 pts
--   Informática Básica (21-30): 9 corretas = 9 pts
--   Conhecimentos Gerais total: 26 pts (mínimo exigido: 15) — OK
--   Conhecimentos Específicos (31-60): 22 corretas x 2 = 44 pts (mínimo exigido: 30) — OK
--   TOTAL: 70 de 90 pontos (mínimo exigido: 45) — OK
--   HABILITADO na Prova Objetiva pelos três critérios cumulativos do item 7.1.3.
update public.student_exam_documents
set correct_count = 47,
    wrong_count = 11,
    blank_count = 1,
    score_net = 70,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato, confrontadas item a item com o gabarito oficial pós recurso (IBFC) e pontuadas conforme a fórmula oficial do edital (item 7.1.1/7.1.3): Conhecimentos Gerais valem 1 ponto por questão, Conhecimentos Específicos valem 2 pontos por questão — não é contagem simples de acertos",
      "escala_oficial": "0 a 90 pontos (30 Gerais + 60 Específicos)",
      "minimo_exigido": {"gerais": 15, "especificos": 30, "total": 45},
      "pontuacao_obtida": {
        "lingua_portuguesa": {"corretas": 7, "de": 10, "pontos": 7},
        "historia_geografia_acre": {"corretas": 10, "de": 10, "pontos": 10},
        "informatica_basica": {"corretas": 9, "de": 10, "pontos": 9},
        "gerais_total": 26,
        "especificos": {"corretas": 22, "de": 30, "pontos": 44},
        "total": 70
      },
      "habilitado_prova_objetiva": true,
      "items": {
        "1":"correta","2":"correta","3":"anulada","4":"correta","5":"correta","6":"branco","7":"correta","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"correta","13":"correta","14":"correta","15":"correta","16":"correta",
        "17":"correta","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"correta","24":"correta",
        "25":"errada","26":"correta","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"correta","34":"correta","35":"correta","36":"errada","37":"correta","38":"correta","39":"errada","40":"errada",
        "41":"correta","42":"errada","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"errada","54":"errada","55":"correta","56":"correta",
        "57":"correta","58":"correta","59":"correta","60":"correta"
      }
    }'::jsonb,
    notes = 'Correção da nota conforme a fórmula oficial do edital (item 7.1.1/7.1.3): Conhecimentos Gerais 1pt/questão, Conhecimentos Específicos 2pt/questão, escala total 0-90 pontos. Resultado: Língua Portuguesa 7/10, História e Geografia do Acre 10/10, Informática 9/10 (Gerais: 26 pts, mínimo 15 — OK); Conhecimentos Específicos 22/30 corretas = 44 pts (mínimo 30 — OK); TOTAL 70/90 (mínimo 45 — OK). Candidato HABILITADO na Prova Objetiva pelos três critérios cumulativos. Erros nos itens 10, 25, 36, 39, 40, 42, 49, 51, 52, 53, 54; item 6 em branco; item 3 anulado.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';
