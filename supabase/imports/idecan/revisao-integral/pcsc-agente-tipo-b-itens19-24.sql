-- PC-SC Agente, caderno Tipo B, Direito Constitucional itens 19–24.
-- Estado vivo conferido pelo usuário: 19–22 active; 23–24 under_review; gabaritos E/A/C/D/B/E.
-- Preserva o status dos itens 19–22; promove 23–24 após cotejo legal e gabarito definitivo.
-- Registra fontes oficiais, edital, vínculo curricular e auditoria. Transação protegida contra alterações concorrentes.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-constitucional-19-24-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_text text := $program$NOÇÕES DE DIREITO CONSTITUCIONAL: 1. Direito Constitucional e Constituição: conceito e classificação. 2. Princípios fundamentais da Constituição da República Federativa do Brasil. 3. Direitos e garantias fundamentais. 4. Direitos individuais e coletivos. 5. Remédios constitucionais: habeas corpus, habeas data e mandado de segurança. 6. Organização político-administrativa do Estado. 7. Poder Executivo, Legislativo e Judiciário. 8. Funções essenciais à Justiça. 9. Defesa do Estado e das instituições democráticas. 10. Segurança pública e sua organização. 11. Constituição do Estado de Santa Catarina.$program$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial da PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then raise exception 'Edição não corresponde ao edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Noções de Direito Constitucional',1,program_text,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Noções de Direito Constitucional' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then raise exception 'Tópico constitucional do edital ausente ou divergente'; end if;
 insert into public.content_sources(source_type,title,issuer,url,checked_at,status,is_official,notes)
 select source_type,title,issuer,url,now(),'vigente',true,'Fonte oficial consultada para revisão PCSC Tipo B em 24/10/2026.'
 from (select source_type,title,issuer,url from (values
    ($url$https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2714$url$, $title$Supremo Tribunal Federal — Súmula 693$title$, $issuer$Supremo Tribunal Federal$issuer$, $type$sumula$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12016.htm$url$, $title$Lei nº 12.016/2009 — Mandado de Segurança$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm$url$, $title$Constituição da República Federativa do Brasil — texto compilado$title$, $issuer$Presidência da República — Planalto$issuer$, $type$constituicao$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm$url$, $title$Código de Processo Penal$title$, $issuer$Presidência da República — Planalto$issuer$, $type$decreto$type$)
 ) s(url,title,issuer,source_type)) src
 on conflict(url) do nothing;
 if exists(select 1 from (values
    ($url$https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2714$url$, $title$Supremo Tribunal Federal — Súmula 693$title$, $issuer$Supremo Tribunal Federal$issuer$, $type$sumula$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12016.htm$url$, $title$Lei nº 12.016/2009 — Mandado de Segurança$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm$url$, $title$Constituição da República Federativa do Brasil — texto compilado$title$, $issuer$Presidência da República — Planalto$issuer$, $type$constituicao$type$),
    ($url$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm$url$, $title$Código de Processo Penal$title$, $issuer$Presidência da República — Planalto$issuer$, $type$decreto$type$)
 ) s(url,title,issuer,source_type) where not exists(select 1 from public.content_sources cs where cs.url=s.url and cs.is_official and cs.status='vigente')) then raise exception 'Fonte jurídica oficial ausente/inativa'; end if;
 for r in (select * from (values
    ($id$c6a7f2ff-fc4a-4226-873d-5bd11105b6ed$id$::uuid, 19, $ans$E$ans$, $state$active$state$, $old$A alternativa E está correta. Habeas corpus protege a liberdade de locomoção. Se o crime só prevê multa, não há ameaça a esse direito que justifique o remédio constitucional.$old$, $new$E é correta. O habeas corpus protege a liberdade de locomoção contra coação ou ameaça ilegal, e não serve para corrigir qualquer ilegalidade processual. A Súmula 693 do STF diz que não cabe HC relativo a processo por infração cuja única pena cominada seja multa. O dado decisivo é a ausência de possibilidade legal de privação da liberdade nesse delito; estar solto, isoladamente, não impediria um HC preventivo se houvesse ameaça concreta à locomoção.
A) e D) presumem que qualquer ilegalidade autoriza HC. B) supõe ameaça à locomoção sem base no caso. C) erra porque a liberdade atual não exclui HC preventivo; o impedimento aqui decorre da pena exclusivamente pecuniária.
Base: CF, art. 5º, LXVIII; STF, Súmula 693.$new$, $topic$Habeas corpus e habeas data; cabimento do HC limitado à tutela da liberdade de locomoção; STF Súmula 693.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm","https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2714"]'::jsonb),
    ($id$12c3cacc-f118-4d6e-8807-9bae657bcfc8$id$::uuid, 20, $ans$A$ans$, $state$active$state$, $old$A alternativa A está correta. A PEC pode ser proposta por um terço, no mínimo, dos membros da Câmara ou do Senado, pelo Presidente da República ou por mais da metade das Assembleias Legislativas.$old$, $new$A está correta. O art. 60, I, da Constituição legitima um terço, no mínimo, dos membros da Câmara dos Deputados ou do Senado Federal a propor emenda constitucional. Também podem propor o Presidente da República e mais da metade das Assembleias Legislativas, cada qual pela maioria relativa de seus membros (art. 60, II e III).
B) exige metade de uma Casa, quórum maior que o texto constitucional. C) o Vice-Presidente não tem legitimidade própria; pode encaminhar proposta se estiver no exercício da Presidência. D) exige mais da metade das Assembleias, não mais de um terço. E) o Presidente do STF não é legitimado.
Não confundir iniciativa da PEC com aprovação: são necessários dois turnos em cada Casa e três quintos dos votos dos respectivos membros.
Base: CF, art. 60, I–III e § 2º.$new$, $topic$Poder constituinte derivado reformador: legitimados e procedimento de proposta de emenda constitucional; CF, art. 60.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"]'::jsonb),
    ($id$81c7ccf7-43be-4dbd-acde-fd94031af772$id$::uuid, 21, $ans$C$ans$, $state$active$state$, $old$A alternativa C está correta. O mandado de segurança protege direito líquido e certo não amparado por habeas corpus ou habeas data, como a permanência regular em concurso público.$old$, $new$C é correta. O mandado de segurança protege direito líquido e certo, comprovável de plano, quando não couber habeas corpus ou habeas data (CF, art. 5º, LXIX). A desclassificação de concurso é ato que pode ser impugnado por essa via se houver direito demonstrável por prova pré-constituída e observados prazo e demais requisitos.
A) e D) habeas data servem para conhecer ou retificar dados pessoais em registros públicos ou de caráter público, não para contestar diretamente a exclusão do concurso. B) e E) habeas corpus protegem locomoção, que não está ameaçada.
A escolha do remédio não antecipa o mérito: a legalidade da avaliação médica dependerá do edital, das provas e da justificativa administrativa.
Base: CF, art. 5º, LXVIII–LXIX; Lei 12.016/2009.$new$, $topic$Remédios constitucionais: mandado de segurança para direito líquido e certo e prova pré-constituída; CF, art. 5º, LXIX.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm","https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12016.htm"]'::jsonb),
    ($id$fdd8be65-660f-49c1-9276-22b7e656b07e$id$::uuid, 22, $ans$D$ans$, $state$active$state$, $old$A alternativa D está correta. A entrada forçada em domicílio à noite, sem consentimento, exige situação de flagrante delito. Mandado judicial, por si só, deve ser cumprido durante o dia.$old$, $new$D é correta nos fatos narrados. A casa é inviolável; ingresso por determinação judicial só pode ocorrer durante o dia. À noite, a entrada depende de consentimento do morador ou de uma das hipóteses constitucionais autônomas (flagrante delito, desastre ou prestação de socorro). Às 23h, o morador recusou a entrada e o enunciado não apresenta exceção; o mandado, sozinho, não autoriza arrombamento noturno.
A) a presença da delegada não substitui a exigência constitucional. B) a gravidade dos crimes não cria exceção. C) o juiz não precisa acompanhar a diligência. E) autorização judicial é necessária para busca diurna, mas não afasta a limitação horária.
Base: CF, art. 5º, XI; CPP, art. 245.$new$, $topic$Direitos e garantias individuais: inviolabilidade domiciliar e limites do cumprimento de mandado judicial à noite; CF, art. 5º, XI.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm","https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]'::jsonb),
    ($id$356415ac-4904-4270-aa3d-26cc2b932d6c$id$::uuid, 23, $ans$B$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$B reproduz o art. 136, § 4º, da Constituição: decretado o estado de defesa ou sua prorrogação, o Presidente submete o ato e a justificativa ao Congresso em 24 horas; o Congresso decide por maioria absoluta.
A) o prazo de apreciação é de dez dias, não quinze (art. 136, § 6º). C) a incomunicabilidade do preso é vedada (§ 3º, IV). D) a prisão não pode superar dez dias sem autorização judicial (§ 3º, III), não quinze. E) em recesso, o Congresso é convocado extraordinariamente em cinco dias, não dez (§ 5º).
Base: CF, art. 136, §§ 3º–6º.$new$, $topic$Estado de defesa: controle do Congresso, prazos e limites constitucionais; CF, art. 136.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"]'::jsonb),
    ($id$f8a8984a-91b1-42f1-8e8b-28fc31dbace7$id$::uuid, 24, $ans$E$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$E está correta. O art. 127, § 1º, da Constituição prevê como princípios institucionais do Ministério Público unidade, indivisibilidade e independência funcional.
A) troca unidade por inamovibilidade, garantia de membros da magistratura. B) mistura unidade e independência com irredutibilidade de subsídio, que é garantia remuneratória. C) vitaliciedade não é princípio institucional do MP. D) vitaliciedade e inamovibilidade são garantias dos membros, não princípios do art. 127, § 1º.
Base: CF, art. 127, § 1º.$new$, $topic$Ministério Público: princípios institucionais da unidade, indivisibilidade e independência funcional; CF, art. 127, § 1º.$topic$, '["https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"]'::jsonb)
 ) as v(id,item_number,answer,expected_status,old_explanation,new_explanation,tested_topic,legal_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then
     if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após este lote; revisão posterior preservada',r.item_number; end if;
   else
     if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B'
       or q.item_number<>r.item_number or q.official_answer<>r.answer or q.content_status<>r.expected_status
       or q.syllabus_topic_id is not null or q.explanation<>r.old_explanation then
       raise exception 'Item %, gabarito/estado/texto diverge do resultado conferido; transação cancelada',r.item_number; end if;
     update public.board_exam_questions set
       explanation=r.new_explanation,
       content_status='active',
       syllabus_topic_id=v_topic,
       tested_topic=r.tested_topic,
       legal_basis=(select jsonb_agg(jsonb_build_object('title','Fonte oficial consultada','url',value)) from jsonb_array_elements_text(r.legal_sources)),
       law_version_checked_at=now(), legal_review_required=false,
       verified_at=now(),
       review_note=case when r.expected_status='under_review' then 'Gabarito definitivo IDECAN conferido. Item liberado após revisão jurídica em fonte oficial vigente e vínculo ao Anexo I do Edital PCSC nº 01/2025.' else 'Gabarito definitivo IDECAN conferido. Explicação e base jurídica revisadas em fonte oficial vigente e vinculadas ao Anexo I do Edital PCSC nº 01/2025; status active preservado.' end
     where id=q.id returning to_jsonb(board_exam_questions) into after_row;
     insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
     values(batch,q.id,before_row,after_row,jsonb_build_object(
       'official_answer',r.answer,
       'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
       'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
       'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
       'syllabus_page','Anexo I, p. 53','status_before',r.expected_status,'status_after','active',
       'legal_sources',r.legal_sources,'reviewed_at','2026-10-24'),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where id in ($qid$c6a7f2ff-fc4a-4226-873d-5bd11105b6ed$qid$::uuid,$qid$12c3cacc-f118-4d6e-8807-9bae657bcfc8$qid$::uuid,$qid$81c7ccf7-43be-4dbd-acde-fd94031af772$qid$::uuid,$qid$fdd8be65-660f-49c1-9276-22b7e656b07e$qid$::uuid,$qid$356415ac-4904-4270-aa3d-26cc2b932d6c$qid$::uuid,$qid$f8a8984a-91b1-42f1-8e8b-28fc31dbace7$qid$::uuid) order by item_number;
