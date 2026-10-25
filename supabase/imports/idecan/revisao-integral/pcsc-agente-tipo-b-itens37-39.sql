-- Inclusão revisada de itens 37–39 ausentes do banco PCSC, caderno Tipo B.
-- Fontes: edição oficial do edital PCSC, gabarito definitivo e textos consolidados oficiais da ALESC conferidos em 24/10/2026.
-- Chave Tipo B conferida: 37-B, 38-D, 39-C. Insere apenas se as questões estiverem ausentes.
begin;
do $review$
declare
 r record; q public.board_exam_questions; after_row jsonb; new_id uuid;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-institucional-37-39-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 exam_url text := $exam$https://arquivos.qconcursos.com/prova/arquivo_prova/148842/idecan-2026-pc-sc-agente-de-policia-civil-prova.pdf$exam$;
 key_url text := $key$https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf$key$;
 program_text text := $program$LEGISLAÇÃO INSTITUCIONAL: 1. Lei nº 14.735, de 23 de novembro de 2023 (Lei Orgânica Nacional das Polícias Civis). 2. Lei nº 6.843, de 28 de julho de 1986 (Estatuto da Polícia Civil do Estado de Santa Catarina). 3. Lei Complementar Estadual nº 453, de 5 de agosto de 2009. 4. Lei Complementar Estadual nº 491, de 20 de janeiro de 2010. 5. Lei Estadual nº 16.774, de 30 de novembro de 2015. 6. Lei Complementar Estadual nº 741, de 12 de junho de 2019.$program$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then raise exception 'Edição PCSC não corresponde ao edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Legislação Institucional',1,program_text,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Legislação Institucional' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then raise exception 'Tópico institucional PCSC ausente/divergente'; end if;
 insert into public.content_sources(source_type,title,issuer,url,checked_at,status,is_official,notes)
 select source_type,title,issuer,url,now(),'vigente',true,'Texto consolidado oficial da ALESC baixado e conferido em 24/10/2026. SHA-256: '||sha
 from (values
    ($url$https://leis.alesc.sc.gov.br/html/1986/6843_1986_Lei.html$url$, $title$Lei estadual nº 6.843/1986 — Estatuto da Polícia Civil de SC$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$317b4c924f1d55ad2f29e6e909fcafe7e4d51ba04302a8c9646e3dff5c06bb4e$sha$),
    ($url$https://leis.alesc.sc.gov.br/html/2009/453_2009_Lei_complementar.html$url$, $title$Lei Complementar estadual nº 453/2009 — Plano de Carreira da Polícia Civil$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$132c0a38433f3c46da6f441bc1200ef9998a98c57afda6b211b652a1fa422a77$sha$),
    ($url$https://leis.alesc.sc.gov.br/html/2015/16774_2015_Lei.html$url$, $title$Lei estadual nº 16.774/2015 — Jornada e banco de horas da Polícia Civil$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$6962b22880cfc6585b19a0d3ce6910485c719a8812030ec51d74b9df6b711588$sha$)
 ) s(url,title,issuer,source_type,sha) on conflict(url) do nothing;
 if exists(select 1 from (values
    ($url$https://leis.alesc.sc.gov.br/html/1986/6843_1986_Lei.html$url$, $title$Lei estadual nº 6.843/1986 — Estatuto da Polícia Civil de SC$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$317b4c924f1d55ad2f29e6e909fcafe7e4d51ba04302a8c9646e3dff5c06bb4e$sha$),
    ($url$https://leis.alesc.sc.gov.br/html/2009/453_2009_Lei_complementar.html$url$, $title$Lei Complementar estadual nº 453/2009 — Plano de Carreira da Polícia Civil$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$132c0a38433f3c46da6f441bc1200ef9998a98c57afda6b211b652a1fa422a77$sha$),
    ($url$https://leis.alesc.sc.gov.br/html/2015/16774_2015_Lei.html$url$, $title$Lei estadual nº 16.774/2015 — Jornada e banco de horas da Polícia Civil$title$, $issuer$Assembleia Legislativa do Estado de Santa Catarina$issuer$, $type$lei$type$, $sha$6962b22880cfc6585b19a0d3ce6910485c719a8812030ec51d74b9df6b711588$sha$)
 ) s(url,title,issuer,source_type,sha) where not exists(select 1 from public.content_sources cs where cs.url=s.url and cs.is_official and cs.status='vigente')) then raise exception 'Fonte oficial ALESC ausente/inativa'; end if;
 if to_regclass('public.idecan_pedagogical_review_audit') is null then raise exception 'Tabela de auditoria pedagógica ausente'; end if;
 for r in (select * from (values
    (37, $ans$B$ans$, $stem$À luz do disposto na Lei nº 6.843/1986, assinale a alternativa que indica corretamente um dos requisitos para ingresso nas carreiras da Polícia Civil.$stem$, '{"A": "Possuir Carteira Nacional de Habilitação (CNH), categoria “D”, no mínimo.", "B": "Estar em gozo dos direitos políticos.", "C": "Ter, no mínimo, 24 (vinte e quatro) anos.", "D": "Estar quite com as obrigações militares, sendo dispensadas as obrigações eleitorais.", "E": "Ter aptidão física parcial."}'::jsonb, $exp$B é correta. O art. 15, V, da Lei estadual 6.843/1986, em sua redação vigente, exige estar em gozo dos direitos políticos para ingresso nas carreiras da Polícia Civil.
A) a CNH mínima é categoria B, não D (art. 15, IX). C) a idade mínima é 18 anos (II). D) a lei exige quitação eleitoral e, se homem, também militar (III). E) exige aptidão física plena, além de capacidade física e aptidão psicológica compatíveis (VII e VIII).
Base: Lei estadual 6.843/1986, art. 15, redação dada pela Lei 18.281/2021.$exp$, $topic$Ingresso nas carreiras da Polícia Civil: requisitos do art. 15 da Lei estadual 6.843/1986, texto vigente após a Lei 18.281/2021.$topic$, $law$https://leis.alesc.sc.gov.br/html/1986/6843_1986_Lei.html$law$),
    (38, $ans$D$ans$, $stem$À luz da Lei Complementar nº 453/2009, que institui Plano de Carreira do Grupo Segurança Pública - Polícia Civil, e adota outras providências, marque a alternativa que indica corretamente ao menos uma das prerrogativas inerentes aos policiais civis.$stem$, '{"A": "Ter a sua prisão comunicada ao Delegado Geral de Polícia após 24 (vinte e quatro) horas.", "B": "Porte de arma com validade apenas na região onde atua.", "C": "Livre acesso, mesmo que fora de serviço, aos locais sujeitos à fiscalização policial.", "D": "Documento de identidade funcional com validade em todo território nacional e padronizado pelo Poder Executivo Federal.", "E": "Prioridade nos serviços de transporte, não se estendendo tal prerrogativa aos serviços de saúde e comunicação."}'::jsonb, $exp$D reproduz o art. 81, I, da Lei Complementar estadual 453/2009: identidade funcional com validade em todo o território nacional e padronizada pelo Poder Executivo Federal.
A) a comunicação da prisão ao Delegado-Geral deve ser imediata (art. 81, VII), não após 24 horas. B) o porte previsto no inciso II tem validade nacional. C) o livre acesso é em razão do serviço (III), não indistintamente fora de serviço. E) a prioridade inclui transporte, saúde e comunicação em missão emergencial (V).
Base: LC estadual 453/2009, art. 81, redação consolidada vigente.$exp$, $topic$Prerrogativas dos policiais civis: identidade funcional, validade nacional; LC estadual 453/2009, art. 81, I.$topic$, $law$https://leis.alesc.sc.gov.br/html/2009/453_2009_Lei_complementar.html$law$),
    (39, $ans$C$ans$, $stem$Nos termos da Lei Estadual nº 16.774/2015, que dispõe sobre as formas de cumprimento da jornada de trabalho e o banco de horas no âmbito da Polícia Civil do Estado de Santa Catarina, indique a alternativa correta.$stem$, '{"A": "Na lei não há previsão de regime de sobreaviso para contagem das horas de trabalho do policial civil.", "B": "A lei estabelece que a jornada de trabalho do policial civil deve ser cumprida exclusivamente em regime de sobreaviso, salvo autorização superior.", "C": "A jornada de trabalho do policial civil poderá ser cumprida sob a forma de escalas de plantão, expediente administrativo ou regime de sobreaviso.", "D": "É vedado o emprego de escalas de plantão para o cumprimento da jornada de trabalho do policial civil em quaisquer hipóteses.", "E": "A jornada de trabalho do policial civil deverá ser cumprida em expediente administrativo durante todos os finais de semana e feriados, independentemente de necessidade."}'::jsonb, $exp$C reproduz o art. 2º da Lei estadual 16.774/2015: a jornada do policial civil pode ser cumprida por escalas de plantão, expediente administrativo ou regime de sobreaviso.
A) a lei prevê expressamente sobreaviso (inciso III). B) sobreaviso é uma das formas, não a única. D) plantões estão previstos no inciso I e disciplinados no art. 3º. E) expediente em fins de semana e feriados não é obrigatório em todos os casos; a lei prevê diferentes escalas e organização conforme o serviço.
Base: Lei estadual 16.774/2015, arts. 2º–5º, texto consolidado vigente.$exp$, $topic$Jornada de trabalho na Polícia Civil de SC: escalas de plantão, expediente administrativo e sobreaviso; Lei estadual 16.774/2015, art. 2º.$topic$, $law$https://leis.alesc.sc.gov.br/html/2015/16774_2015_Lei.html$law$)
 ) as v(item_number,answer,stem,options,explanation,tested_topic,law_url)) loop
   select * into q from public.board_exam_questions where board='IDECAN' and contest_name='PC SC - Agente de Polícia Civil 2026' and career_name='Agente de Polícia Civil' and exam_year=2026 and exam_type='Tipo B' and item_number=r.item_number for update;
   if found then
     if exists(select 1 from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id and after_data=to_jsonb(q)) then continue; end if;
     raise exception 'Item % já existe ou foi alterado desde a inclusão; nada será duplicado/sobrescrito',r.item_number;
   end if;
   if exists(select 1 from public.board_exam_questions where board='IDECAN' and contest_name='PC SC - Agente de Polícia Civil 2026' and exam_type='Tipo B' and item_number=r.item_number) then raise exception 'Colisão de item % em carreira/edição divergente',r.item_number; end if;
   insert into public.board_exam_questions(board,contest_name,career_name,exam_year,exam_date,exam_type,item_number,subject,support_text,stem,options,official_answer,needs_visual,legal_review_required,law_version_checked_at,legal_basis,explanation,difficulty,state,career_category,source_url,answer_key_url,content_status,review_note,verified_at)
   values('IDECAN','PC SC - Agente de Polícia Civil 2026','Agente de Polícia Civil',2026,null,'Tipo B',r.item_number,'Legislação Institucional',null,r.stem,r.options,r.answer,false,false,now(),jsonb_build_array(jsonb_build_object('title','Fonte oficial ALESC consultada','url',r.law_url)),r.explanation,'média','SC','Polícia Civil',exam_url,key_url,'active','Questão ausente no acervo anterior; importada após conferência do caderno e gabarito definitivo Tipo B e revisão da legislação vigente em fonte oficial ALESC. Vinculada ao Edital PCSC nº 01/2025.',now()) returning id,to_jsonb(board_exam_questions) into new_id,after_row;
   insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
   values(batch,new_id,jsonb_build_object('state','absent_before_import','item_number',r.item_number),after_row,jsonb_build_object(
      'item_number',r.item_number,'official_answer',r.answer,'answer_key_url',key_url,'answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
      'exam_pdf_url',exam_url,'exam_pdf_sha256','4c1aeba37bfed6e8c00aa0d42b6dbcf7de0dcc67a406f5b5cbc7e9136be0e147','official_syllabus_url',edital_url,
      'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a','syllabus_page','Anexo I, p. 53',
      'official_law_url',r.law_url,'checked_at','2026-10-24','tested_topic',r.tested_topic),auth.uid());
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where contest_name='PC SC - Agente de Polícia Civil 2026' and exam_type='Tipo B' and item_number between 37 and 39 order by item_number;
