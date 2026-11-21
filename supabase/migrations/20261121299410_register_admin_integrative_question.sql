insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance)
select source_id,syllabus_topic_id,'pcac-admin-challenge-16',
'Norte Concursos — treino autoral PC-AC 2026',2026,'Oficial Investigador de Polícia','AUTORAL',
'Noções de Administração','Revisão integradora: funções administrativas, processos, equipes e recursos',
'Uma unidade policial define metas, distribui tarefas, orienta servidores e compara resultados com os padrões estabelecidos. Qual alternativa associa corretamente as quatro funções administrativas?'||E'\n\n(A) Planejamento define metas; organização distribui recursos; direção orienta pessoas; controle compara resultados.\n(B) Planejamento fiscaliza; organização motiva; direção define orçamento; controle seleciona pessoal.\n(C) Planejamento executa; organização avalia; direção arquiva; controle contrata.\n(D) As quatro funções são sinônimas.\n(E) Controle ocorre apenas antes do planejamento.',
'A','Planejamento define objetivos e ações; organização distribui recursos e responsabilidades; direção conduz e orienta pessoas; controle compara resultados com metas e corrige desvios. A questão integra o ciclo PODC e diferencia as quatro funções.',
'média','active',true,'AC','Polícia Civil','Oficial Investigador de Polícia',
'Revisão integradora: funções administrativas, processos, equipes e recursos',
'pcac-admin-challenge-16','pcac-2026-admin-challenge-16',
jsonb_build_object('kind','didactic_original','authored',true,'target_exam','PC-AC 2026 — Oficial Investigador de Polícia','license_note','Questão autoral inédita; não é item oficial da IDECAN','not_official_exam',true,'source_board_style','IDECAN','reference_source_url','https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf','source_material_slug','pcac-2026-administracao-publica-funcoes-processos-equipes-recursos','linked_study_material_slug','pcac-2026-administracao-publica-funcoes-processos-equipes-recursos')
from public.curated_question_catalog
where external_item_key='pcac-2026-guia-administracao-geral-01-administracao-e-organizacao'
and contest_name='Norte Concursos — treino autoral PC-AC 2026'
on conflict (source_id,external_item_key) do update set
 question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,
 didactic_provenance=excluded.didactic_provenance,content_status='active';