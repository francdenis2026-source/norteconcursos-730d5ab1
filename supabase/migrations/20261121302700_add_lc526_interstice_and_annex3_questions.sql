with q as (
 select * from (values
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-lc526-79e-01','LC nº 526/2026 — início do interstício','Segundo o art. 79-E da LC nº 129/2004, incluído pela LC nº 526/2026, quando começa a contagem do interstício necessário à promoção do servidor recém-investido?','(A) Na data da publicação do resultado final do concurso.\n(B) No primeiro dia do curso de formação.\n(C) Na data em que entra em exercício na unidade de primeira lotação.\n(D) Na data da nomeação, ainda que não tenha iniciado exercício.\n(E) Após o estágio probatório.','C','O art. 79-E considera o curso de formação como efetivo exercício para os fins legais, mas o exclui da contagem do interstício promocional. A contagem começa quando o servidor entra em exercício na unidade de primeira lotação.'),
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-dec8912-annex3-02','Decreto nº 8.912/2018 — Anexo III','Qual é a finalidade expressamente atribuída ao Anexo III do Decreto nº 8.912/2018 pelo art. 20, § 2º?','(A) Listar todos os quesitos de avaliação.\n(B) Definir o quadro geral de pontuação.\n(C) Estabelecer pontuação adicional para recompensas previstas no art. 96, II e III, da LC nº 129/2004.\n(D) Definir o prazo de recurso.\n(E) Listar cursos obrigatórios de formação inicial.','C','O art. 20, § 2º, prevê pontuação adicional do Anexo III para servidores que recebam as recompensas indicadas no art. 96, II e III, da LC nº 129/2004, sem prejuízo da pontuação do Anexo II.')
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
