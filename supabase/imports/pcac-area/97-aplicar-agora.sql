-- PARTE 1: correção dos pontos fortes do ranking (cole tudo e rode)
create or replace function public._ranking_strengths_of(_uid uuid, _limit integer default 3)
returns jsonb language sql stable security definer set search_path = public as $$
  with raw as (
    select t.question_id::text as qid, t.created_at as at, t.is_correct as ok,
           coalesce(nullif(trim(q.subject), ''), nullif(trim(t.subject), '')) as subj
    from public.question_training_responses t
    left join lateral (
      select z.subject from (
        select b.subject from public.board_exam_questions b where b.id = t.question_id
        union all select o.subject from public.official_exam_questions o where o.id = t.question_id
        union all select c.subject from public.curated_question_catalog c where c.id = t.question_id
      ) z limit 1
    ) q on true
    where t.user_id = _uid and t.question_source <> 'personal' and t.selected_answer is not null
    union all
    select r.question_id::text, a.finished_at, r.is_correct,
           coalesce(nullif(trim(q.subject), ''), nullif(trim(r.subject), ''))
    from public.simulator_responses r
    join public.simulator_attempts a on a.id = r.attempt_id
    left join lateral (
      select z.subject from (
        select b.subject from public.board_exam_questions b where b.id = r.question_id
        union all select o.subject from public.official_exam_questions o where o.id = r.question_id
        union all select c.subject from public.curated_question_catalog c where c.id = r.question_id
      ) z limit 1
    ) q on true
    where a.user_id = _uid and r.selected_answer is not null and r.is_correct is not null
    union all
    select 'k:' || p.question_key, p.answered_at, p.is_correct, nullif(trim(p.subject_name), '')
    from public.pcac_study_responses p
    where p.user_id = _uid
  ), first_ans as (
    select distinct on (qid) qid, ok, subj from raw order by qid, at
  ), agg as (
    select lower(subj) as k, mode() within group (order by subj) as s,
           count(*)::int as n, (count(*) filter (where ok))::int as c
    from first_ans
    where subj is not null and lower(subj) <> 'estudo pc-ac'
    group by lower(subj) having count(*) >= 3
  ), scored as (
    select s, n, c, round(100.0 * c / n)::int as pct,
           ((c::float8 / n) + 0.8192 / n - 1.28 * sqrt(((c::float8 / n) * (1 - c::float8 / n) + 0.4096 / n) / n)) / (1 + 1.6384 / n) as score
    from agg
  )
  select coalesce(jsonb_agg(jsonb_build_object('s', s, 'pct', pct, 'n', n, 'c', c) order by score desc, n desc), '[]'::jsonb)
  from (select * from scored order by score desc, n desc limit greatest(1, least(coalesce(_limit, 3), 6))) t;
$$;
revoke all on function public._ranking_strengths_of(uuid, integer) from public, anon, authenticated;
notify pgrst, 'reload schema';

-- PARTE 2: 10 questões novas dos testes rápidos (cole e rode)
with ed as (select t.id, t.discipline from public.syllabus_topics t join public.syllabus_editions e on e.id = t.edition_id where e.contest_name = 'Polícia Civil do Acre' and e.role_name = 'Oficial Investigador de Polícia' and e.contest_year = 2026)
insert into public.board_exam_questions (id, board, contest_name, career_name, exam_year, exam_date, exam_type, item_number, subject, support_text, stem, options, official_answer, needs_visual, legal_review_required, law_version_checked_at, legal_basis, state, career_category, source_url, answer_key_url, review_note, explanation, difficulty, content_status, tested_topic, syllabus_topic_id) values
('249db2b7-6055-394a-5e6b-0a9c61db2c56'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1003,$q$Análise de Dados e Informações$q$,null,$q$Em uma tabela bem estruturada para análise, cada linha deve representar:$q$,$q${"A": "vários registros misturados numa mesma célula.", "B": "um registro (por exemplo, uma ocorrência) e cada coluna, um atributo (como data, local e tipo).", "C": "apenas títulos, sem dados.", "D": "um parágrafo de texto livre.", "E": "imagens de documentos."}$q$::jsonb,'B',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Passo 1: Tabela organizada: uma linha por registro. Passo 2: Uma coluna por atributo. Passo 3: Isso facilita filtros e cruzamentos. Resposta: B.
('d70b8ab3-5cef-74b3-c955-72ebf8332823'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1021,$q$Estatística$q$,null,$q$Uma pesquisa tem 40 registros, e a classe 'roubo' tem frequência relativa 0,30. Quantos registros são roubos?$q$,$q${"A": "8", "B": "10", "C": "12", "D": "14", "E": "30"}$q$::jsonb,'C',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$A frequência relativa é a parte do total. Quantidade = 0,30 × 40 = 12.$q$,'média','active',$q$Distribuição de frequências, tabelas e gráficos$q$,(select id from ed where discipline = $q$Estatística$q$)),
('e81f3db6-d3a0-5ca7-9ef7-2daa055c06e5'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1022,$q$Estatística$q$,null,$q$A média de 4 valores é 10. Entra um quinto valor e a média passa a ser 12. Qual é o quinto valor?$q$,$q${"A": "16", "B": "18", "C": "20", "D": "22", "E": "24"}$q$::jsonb,'C',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Soma antes: 4 × 10 = 40. Soma depois: 5 × 12 = 60. Quinto valor: 60 − 40 = 20.$q$,'média','active',$q$Medidas de tendência central$q$,(select id from ed where discipline = $q$Estatística$q$)),
('9a655c1b-9b3b-bc40-ee70-7a7fe2a89fbf'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1023,$q$Estatística$q$,null,$q$Os dados 2, 4 e 6 formam uma amostra. Qual é o desvio-padrão amostral?$q$,$q${"A": "1", "B": "2", "C": "4", "D": "8", "E": "2√2"}$q$::jsonb,'B',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Média 4. Desvios ao quadrado: 4, 0, 4, soma 8. Variância amostral: 8 ÷ (3 − 1) = 4. Raiz de 4 = 2.$q$,'média','active',$q$Medidas de dispersão$q$,(select id from ed where discipline = $q$Estatística$q$)),
('a64d9519-d940-c5c9-e457-50a1b9d126fd'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1024,$q$Estatística$q$,null,$q$Q1 = 10 e Q3 = 30. Qual é o limite superior para outliers?$q$,$q${"A": "50", "B": "55", "C": "60", "D": "65", "E": "70"}$q$::jsonb,'C',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$IQR = 30 − 10 = 20. Limite superior = Q3 + 1,5 × IQR = 30 + 30 = 60. Um valor acima de 60, como 65, é outlier.$q$,'média','active',$q$Medidas de posição (quartis, decis, percentis)$q$,(select id from ed where discipline = $q$Estatística$q$)),
('f433a77c-2067-3763-455e-681a6536fa22'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1025,$q$Estatística$q$,null,$q$Na reta ŷ = 5 + 2x, quanto vale ŷ para x = 3?$q$,$q${"A": "6", "B": "8", "C": "11", "D": "13", "E": "16"}$q$::jsonb,'C',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$ŷ = 5 + 2 × 3 = 11. O 2 é a inclinação: a cada aumento de 1 em x, y sobe 2.$q$,'média','active',$q$Correlação e regressão linear simples$q$,(select id from ed where discipline = $q$Estatística$q$)),
('926d1533-0622-ce32-5c7b-db8724f9d7a6'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1026,$q$Estatística$q$,null,$q$Um índice foi de 80 para 100. Qual foi a variação percentual?$q$,$q${"A": "20%", "B": "25%", "C": "30%", "D": "80%", "E": "100%"}$q$::jsonb,'B',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Variação = (100 − 80) ÷ 80 = 25%. Voltar de 100 para 80 dá −20%, porque a base muda.$q$,'média','active',$q$Séries temporais e interpretação de dados$q$,(select id from ed where discipline = $q$Estatística$q$)),
('fe0e0d85-9921-dd11-9e86-9825f8a28ae4'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1027,$q$Raciocínio Lógico$q$,null,$q$Uma PA começa em 100, com razão 20 e 12 termos. Qual é a soma dos termos?$q$,$q${"A": "1.260", "B": "2.120", "C": "2.320", "D": "2.520", "E": "3.200"}$q$::jsonb,'D',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$a₁₂ = 100 + 11 × 20 = 320. Soma = (100 + 320) × 12 ÷ 2 = 2.520.$q$,'média','active',$q$Análise combinatória e progressões$q$,(select id from ed where discipline = $q$Raciocínio Lógico$q$)),
('c0776dfe-7984-14f4-ebb8-685962912701'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1028,$q$Estatística$q$,null,$q$Pesquisadores entrevistam 500 pessoas de todos os eleitores de uma cidade. O que é a amostra?$q$,$q${"A": "Todos os eleitores da cidade", "B": "As 500 pessoas entrevistadas", "C": "A cidade", "D": "Os eleitores que não responderam", "E": "A média calculada"}$q$::jsonb,'B',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Amostra é a parte da população efetivamente observada. Aqui, são as 500 pessoas entrevistadas.$q$,'média','active',$q$Conceitos fundamentais$q$,(select id from ed where discipline = $q$Estatística$q$)),
('70ad9586-b085-3eeb-088a-efaeb28d2273'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1029,$q$Estatística$q$,null,$q$Um número de 1 a 20 é sorteado. Qual a chance de ser múltiplo de 5?$q$,$q${"A": "5%", "B": "10%", "C": "20%", "D": "25%", "E": "40%"}$q$::jsonb,'C',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Múltiplos de 5 de 1 a 20: 5, 10, 15 e 20. São 4 casos em 20 possíveis: 4 ÷ 20 = 20%.$q$,'média','active',$q$Probabilidade$q$,(select id from ed where discipline = $q$Estatística$q$)),
('ca332713-e584-5408-784f-6eaeb521c6b1'::uuid,'IDECAN',$q$PC-AC 2026 — questão autoral$q$,'Oficial Investigador',2026,null,'Autoral',1030,$q$Estatística$q$,null,$q$Duas câmeras funcionam de forma independente, e cada uma falha com 10%. Qual a chance de pelo menos uma funcionar?$q$,$q${"A": "1%", "B": "80%", "C": "81%", "D": "90%", "E": "99%"}$q$::jsonb,'E',false,false,null,'[]'::jsonb,'AC','Polícia Civil','https://norteconcursos.xyz/dashboard/estudo-pc-acre','https://norteconcursos.xyz/dashboard/estudo-pc-acre',$q$Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.$q$,$q$Falham as duas: 0,1 × 0,1 = 0,01. 'Pelo menos uma funciona' é o contrário: 1 − 0,01 = 0,99.$q$,'média','active',$q$Probabilidade$q$,(select id from ed where discipline = $q$Estatística$q$))
on conflict do nothing;

-- PARTE 3: conferir (esperado: total = 1018 e sem_topico = 0)
select count(*) as total, count(*) filter (where syllabus_topic_id is null) as sem_topico
from public.board_exam_questions where contest_name = $q$PC-AC 2026 — questão autoral$q$ and content_status = 'active';
