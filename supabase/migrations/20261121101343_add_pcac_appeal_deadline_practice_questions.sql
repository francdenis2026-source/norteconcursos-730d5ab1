-- Complementa a revisão dos prazos recursais com quadro comparativo e questões autorais.
do $deadlines$
declare v_body text;
begin
  select body_md into v_body
  from public.study_materials
  where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025'
  for update;
  if v_body is null then
    raise exception 'Material PC-AC não encontrado';
  elsif position('### Quadro comparativo de prazos recursais' in v_body)=0 then
    update public.study_materials
    set body_md=body_md||E'\n\n### Quadro comparativo de prazos recursais — não misture os procedimentos\n\n- **LC nº 39/1993, art. 158:** prazo geral de 30 dias para pedido de reconsideração ou recurso, contado da publicação ou da ciência da decisão.\n- **LC nº 129/2004, art. 128, § 4º:** recurso ao Conselho Superior contra a decisão da sindicância: 15 dias, contados da publicação.\n- **LC nº 129/2004, art. 148-A, § 3º:** recurso do acusado contra o relatório no PAD: 10 dias, dirigido ao Delegado-Geral, que o submete ao Conselho Superior.\n- **LC nº 39/1993, art. 156, parágrafo único:** prazo interno para a Administração despachar o requerimento/pedido de reconsideração: 5 dias; para decidir: 30 dias.\n- **LC nº 129/2004, art. 128, § 1º:** defesa escrita na sindicância: 10 dias após a conclusão da produção de provas. Esse prazo não é recurso.\n\n**Como resolver na prova:** primeiro identifique o procedimento citado (regra geral, sindicância ou PAD); depois identifique o ato (defesa, recurso ou decisão administrativa). Só então escolha o prazo. A palavra “recurso” não significa que todos os procedimentos tenham o mesmo prazo.'
    where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';
  end if;
end
$deadlines$;

update public.curated_question_catalog
set explanation='O art. 128, § 1º, da LC nº 129/2004 assegura dez dias para defesa escrita após a conclusão da produção de provas na sindicância. Atenção: esse é prazo de defesa, não de recurso. Se a pergunta tratar do recurso contra a decisão da sindicância, o § 4º prevê quinze dias contados da publicação. Dica: defesa = 10 dias; recurso da sindicância = 15 dias.'
where external_item_key='pcac-lc129-art128-syndicance-30'
  and subject='Legislação Institucional';

with q as (
 select * from (values
 ('pcac-lc129-appeal-syndicance-15d-68','LC nº 129/2004 — recurso da sindicância','Após a decisão da sindicância da Polícia Civil do Acre, o recurso ao Conselho Superior da Polícia Civil deve ser interposto em qual prazo, contado da publicação?',E'(A) 5 dias.\n(B) 15 dias.\n(C) 10 dias.\n(D) 30 dias.\n(E) 60 dias.','B','O art. 128, § 4º, da LC nº 129/2004 prevê 15 dias, contados da publicação da decisão da sindicância, para recorrer ao Conselho Superior da Polícia Civil. Não confunda com os dez dias do § 1º, que são para defesa escrita depois da produção de provas. Dica: decisão da sindicância = recurso em 15 dias.','LC nº 129/2004 — art. 128, § 4º','https://legis.ac.gov.br/detalhar/674-0'),
 ('pcac-lc129-appeal-pad-10d-69','LC nº 129/2004 — recurso no PAD','No processo administrativo disciplinar da Polícia Civil do Acre, o recurso do acusado contra o teor do relatório da comissão deve ser interposto, conforme o art. 148-A, § 3º, em:',E'(A) 5 dias.\n(B) 10 dias.\n(C) 15 dias.\n(D) 30 dias.\n(E) 60 dias.','B','O art. 148-A, § 3º, da LC nº 129/2004 estabelece prazo de dez dias para o acusado recorrer do relatório. O recurso é dirigido ao Delegado-Geral da Polícia Civil, que o submete ao Conselho Superior. Não confunda com os quinze dias do recurso contra a decisão da sindicância (art. 128, § 4º). Dica: PAD contra relatório = 10 dias.','LC nº 129/2004 — art. 148-A, § 3º','https://legis.ac.gov.br/detalhar/674-0'),
 ('pcac-lc39-general-appeal-30d-59','LC nº 39/1993 — prazo geral de recurso','Segundo o art. 158 da LC nº 39/1993, o prazo geral para interpor pedido de reconsideração ou recurso é de:',E'(A) 5 dias.\n(B) 10 dias.\n(C) 15 dias.\n(D) 30 dias.\n(E) 60 dias.','D','O art. 158 da LC nº 39/1993 fixa 30 dias, contados da publicação ou da ciência da decisão recorrida. Esse é o prazo geral do Estatuto dos Servidores. Atenção: procedimentos disciplinares específicos da Polícia Civil têm prazos próprios — 15 dias para recurso da decisão da sindicância e 10 dias para recurso no PAD. Dica: confira sempre qual lei e qual procedimento o enunciado menciona.','LC nº 39/1993 — art. 158','https://legis.ac.gov.br/detalhar/110')
 ) as t(external_item_key,subtopic,stem,options_text,answer,explanation,article,url)
)
insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance,legal_basis,verified_at,law_version_checked_at)
select
 '43712f0d-aad2-48b5-a685-6937551f2d74',
 'd204d14f-8aa6-4c57-92ad-3fb3c3e901f1',
 external_item_key,'Norte Concursos — treino autoral PC-AC 2026',2026,
 'Oficial Investigador de Polícia','AUTORAL','Legislação Institucional',
 subtopic,stem||E'\n\n'||options_text,answer,explanation,'média','active',true,'AC',
 'Polícia Civil','Oficial Investigador de Polícia',subtopic,
 md5(external_item_key)||md5(external_item_key||'-content'),
 md5(external_item_key)||md5(external_item_key||'-unique'),
 jsonb_build_object('kind','didactic_original','authored',true,'target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'license_note','Questão autoral inédita; não é item oficial da IDECAN','linked_study_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','source_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','source_exam_reference','Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III'),
 jsonb_build_array(jsonb_build_object('lei',case when external_item_key='pcac-lc39-general-appeal-30d-59' then 'Lei Complementar Estadual nº 39/1993' else 'Lei Complementar Estadual nº 129/2004' end,'title',case when external_item_key='pcac-lc39-general-appeal-30d-59' then 'Estatuto dos Servidores Públicos Civis do Estado do Acre' else 'Lei Orgânica da Polícia Civil e Estatuto dos Policiais Civis do Estado do Acre' end,'artigo',article,'url',url)),
 now(),now()
from q
on conflict (source_id,external_item_key) do update
set question_text=excluded.question_text,official_answer=excluded.official_answer,
explanation=excluded.explanation,legal_basis=excluded.legal_basis,
law_version_checked_at=excluded.law_version_checked_at,verified_at=excluded.verified_at,
content_status='active',subtopic=excluded.subtopic;
