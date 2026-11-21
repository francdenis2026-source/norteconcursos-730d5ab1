with q as (
 select * from (values
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-law2250-art2-pccr-01','Lei nº 2.250/2009 — estrutura do PCCR','Quais elementos integram a organização do Plano de Cargos, Carreiras e Remuneração da Polícia Civil, conforme o art. 2º da Lei nº 2.250/2009?','(A) Apenas salários e gratificações.\n(B) Grupos ocupacionais, cargos, classes e referências; linhas de promoção; vencimentos; e quantificação de cargos.\n(C) Somente requisitos de ingresso e estágio probatório.\n(D) Apenas regras disciplinares e previdenciárias.\n(E) Exclusivamente critérios de aposentadoria.','B','O art. 2º organiza o PCCR em quatro eixos: estrutura e composição de grupos ocupacionais, cargos, classes e referências; linhas de promoção; tabelas de vencimentos; e quantificação dos cargos.'),
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-lc496-title-02','LC nº 496/2025 — unificação dos cargos','Após a LC nº 496/2025, qual é a nomenclatura resultante da unificação dos antigos cargos de Agente de Polícia e Escrivão de Polícia?','(A) Investigador Judiciário.\n(B) Oficial de Polícia Civil.\n(C) Oficial Investigador de Polícia.\n(D) Agente de Investigação Criminal.\n(E) Escrivão Investigador.','C','O art. 1º da LC nº 496/2025 unificou os cargos de Escrivão de Polícia e Agente de Polícia sob a nomenclatura Oficial Investigador de Polícia.')
 ) as t(material_slug,external_item_key,subtopic,question_text,options_text,answer,explanation)
)
insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance)
select '43712f0d-aad2-48b5-a685-6937551f2d74','d204d14f-8aa6-4c57-92ad-3fb3c3e901f1',
 external_item_key,'Norte Concursos — treino autoral PC-AC 2026',2026,'Oficial Investigador de Polícia','AUTORAL',
 'Legislação Institucional',subtopic,question_text||E'\n\n'||options_text,answer,explanation,
 'média','active',true,'AC','Polícia Civil','Oficial Investigador de Polícia',
 subtopic,external_item_key,'pcac-2026-'||external_item_key,
 jsonb_build_object('kind','didactic_original','authored',true,'target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'license_note','Questão autoral inédita; não é item oficial da IDECAN','linked_study_material_slug',material_slug,'source_material_slug',material_slug,'source_exam_reference','Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III')
from q
on conflict (source_id,external_item_key) do update set
 question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,
 didactic_provenance=excluded.didactic_provenance,content_status='active',subtopic=excluded.subtopic;
