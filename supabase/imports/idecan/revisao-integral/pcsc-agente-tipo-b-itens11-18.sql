-- PC-SC Agente, Tipo B, Processo Penal itens 11–18.
-- Resultado vivo fornecido pelo usuário: todos active e syllabus_topic_id nulo.
-- Preserva active; registra explicações completas e vincula ao Anexo I do Edital nº 01/2025.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-processual-11-18-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_text text := $program$NOÇÕES DE DIREITO PROCESSUAL PENAL: 1. princípios gerais do processo penal; 2. sistemas processuais penais. 3. Funções de polícia administrativa e polícia Judiciária/investigativa 4. inquérito policial. 5. ação penal. 6. provas. (art. 155 a 239 do cpp) 6.1 meios de prova: perícias, interrogatório, confissão, testemunhas, reconhecimento de pessoas e coisas, acareação, documentos, indícios, meios processuais e operacionais de combate ao crime organizado, aos crimes de colarinho branco, aos crimes de lavagem de dinheiro; agente infiltrado tradicional e virtual; prova virtual; sigilos bancário, fiscal e telefônico; interceptações telefônicas; quebra de sigilo telemático; 6.2 busca e apreensão (art. 240 a 250 do cpp). 6.3 cadeia de custódia; cadeia de custódia virtual. 7. prisão. 7.1 conceito, espécies, mandado de prisão e cumprimento. 7.2 prisão em flagrante. 7.3 prisão temporária. 7.4 prisão preventiva. 7.5 medidas cautelares diversas da prisão. 7.6 fiança. 7.7 uso de algemas – Súmula Vinculante nº 11. 8. aspectos processuais penais dos seguintes textos normativos: 8.1 Lei nº 7.960/1989 (Lei da prisão temporária); 8.2 Lei nº 12.037/2009 (identificação criminal). 8.3 Lei nº 12.830/2013 (investigação criminal conduzida pelo delegado de polícia).$program$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial da PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then
   raise exception 'Edição de Agente PCSC ausente ou divergente do edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Noções de Direito Processual Penal',1,program_text,'current')
 on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Noções de Direito Processual Penal' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then
   raise exception 'Tópico de Processo Penal já cadastrado com conteúdo divergente'; end if;
 for r in (select * from (values
    ($id$b3359c7d-a2ab-4815-9372-ef0dbe324f59$id$::uuid, 11, $ans$D$ans$, $old$A alternativa D está correta. Isolamento é preservar o local e impedir alteração do estado das coisas, abrangendo os ambientes imediato, mediato e relacionado aos vestígios. As demais alternativas trocam as definições dos procedimentos.$old$, $new$D é correta. O art. 158-B, II, do CPP define isolamento como impedir que o estado das coisas se altere, preservando o ambiente imediato, mediato e relacionado aos vestígios e ao local do crime.
A) descreve descarte. B) descreve coleta. C) descreve recebimento, não armazenamento. E) descreve armazenamento. O art. 158-B diferencia cada etapa para documentar a cadeia de custódia.
Base: CPP, arts. 158-A e 158-B, II, IV, VII, IX e X.$new$, $topic$Cadeia de custódia da prova: isolamento e etapas do art. 158-B do CPP.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]$src$::jsonb),
    ($id$7a651cd9-4234-4506-bed4-166533994e1a$id$::uuid, 12, $ans$E$ans$, $old$A alternativa E está correta. Como somente a defesa recorreu, o tribunal não pode agravar a situação do réu. É vedada a reformatio in pejus, decorrência do art. 617 do CPP.$old$, $new$E é correta. Como somente a defesa apelou, o tribunal não pode aumentar a pena de cinco para seis anos. É vedada a reformatio in pejus, expressamente prevista no art. 617 do CPP. O tribunal pode examinar as questões devolvidas pelo recurso, mas não piorar a situação do réu quando não há recurso da acusação.
A), B) e C) invocam princípios que não afastam esse limite. D) bis in idem trata de dupla punição pelo mesmo fato e não é a regra específica aplicada.
Base: CPP, art. 617.$new$, $topic$Princípios do processo penal: vedação da reformatio in pejus; CPP, art. 617.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]$src$::jsonb),
    ($id$62a81c2f-f001-403d-87cb-8dd6e4cdedc9$id$::uuid, 13, $ans$A$ans$, $old$A alternativa A está correta. A representação pode ser retratada até o oferecimento da denúncia; depois desse marco torna-se irretratável, conforme art. 25 do CPP.$old$, $new$A está correta. A representação, nos crimes de ação pública condicionada, é irretratável depois de oferecida a denúncia (CPP, art. 25). Oferecimento é o ato do Ministério Público de apresentar a peça; recebimento é decisão judicial posterior.
B) usa o recebimento como marco e posterga a irretratabilidade. C) permite retratação além do marco legal. D) a representação é condição de procedibilidade, não condição de punibilidade. E) não é condição de recorribilidade.
A lei prevê regimes especiais, mas o enunciado pergunta a regra geral do CPP e não apresenta hipótese especial.
Base: CPP, arts. 24 e 25.$new$, $topic$Ação penal pública condicionada: representação e irretratabilidade após oferecimento da denúncia.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]$src$::jsonb),
    ($id$28f98e98-214b-4d42-a594-6bafe0e7a43c$id$::uuid, 14, $ans$C$ans$, $old$A alternativa C está correta. A lesão corporal leve praticada contra mulher no contexto doméstico é ação penal pública incondicionada, conforme entendimento do STF na ADI 4424.$old$, $new$C é correta. A lesão corporal leve praticada contra mulher em contexto de violência doméstica é ação penal pública incondicionada, conforme a interpretação do STF na ADI 4.424 e a Súmula 542 do STJ. A denúncia não depende de representação da vítima.
A) não é ação privada subsidiária; B) erra ao exigir representação; D) não é ação privada; E) requisição do Ministro da Justiça não se aplica.
Esse entendimento específico não deve ser generalizado para todos os crimes em contexto doméstico: o item trata de lesão corporal.
Base: Lei 11.340/2006, art. 41; STF, ADI 4.424; STJ, Súmula 542.$new$, $topic$Ação penal em lesão corporal leve no contexto doméstico contra a mulher; ADI 4.424 e Súmula 542/STJ.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm", "https://www.planalto.gov.br/ccivil_03/leis/l11340.htm", "https://portal.stf.jus.br/processos/detalhe.asp?incidente=3897992", "https://www.stj.jus.br/docs_internet/SumulasSTJ.pdf"]$src$::jsonb),
    ($id$bdaceb4b-fb6a-4769-8f66-6e39f27f5e80$id$::uuid, 15, $ans$D$ans$, $old$A alternativa D está correta. A interceptação é admitida quando o crime é punido com reclusão, desde que presentes os demais requisitos legais; pode ocorrer durante o processo.$old$, $new$D é correta nos fatos descritos. A Lei 9.296/1996 admite interceptação para investigação criminal e instrução processual penal, mediante ordem judicial e quando houver indícios razoáveis de autoria/participação, a prova não puder ser obtida por outros meios disponíveis e o fato investigado for punido com reclusão. O enunciado diz que a juíza reconheceu os requisitos e o estelionato é punido com reclusão.
A) erra: reclusão não impede a medida; é requisito de admissibilidade. B) a lei não fixa pena mínima de quatro anos. C) a interceptação também pode ocorrer durante o processo. E) erra ao restringi-la à fase processual.
Base: Lei 9.296/1996, arts. 1º e 2º.$new$, $topic$Provas e meios de obtenção: interceptação telefônica na investigação e na instrução processual; Lei 9.296/1996.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/leis/l9296.htm"]$src$::jsonb),
    ($id$ab9c3387-4fad-44a8-b5f8-77b840d14512$id$::uuid, 16, $ans$E$ans$, $old$A alternativa E está correta. A prisão preventiva exige hipótese legal e não cabe, em regra, para crime culposo. Gravidade social isolada não supre esse requisito.$old$, $new$E é a resposta para o caso concreto. A preventiva exige fundamentos do art. 312 e ao menos uma hipótese de admissibilidade do art. 313 do CPP. João é primário e responde por homicídio culposo no trânsito; o enunciado não aponta condenação anterior por crime doloso, violência doméstica com medida protetiva, identidade incerta ou outra hipótese legal aplicável. Gravidade do resultado e repercussão social, sozinhas, não bastam.
A), B) e D) apresentam motivos que não suprem os requisitos legais. C) erra porque a preventiva pode ser decretada também durante a investigação, quando cabível. A formulação de E não deve ser generalizada: há hipóteses específicas em que a preventiva pode caber embora o fato atual seja culposo, como o art. 313, II, se presentes seus requisitos. Elas não aparecem aqui.
Base: CPP, arts. 312 e 313, redação vigente.$new$, $topic$Prisão cautelar: fundamentos e hipóteses de admissibilidade da prisão preventiva; CPP, arts. 312–313.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]$src$::jsonb),
    ($id$8337ba09-070e-40e4-a7ff-274b30d26efc$id$::uuid, 17, $ans$B$ans$, $old$A alternativa B está correta. A prisão temporária não pode ser decretada de ofício; depende de representação da autoridade policial ou requerimento do Ministério Público.$old$, $new$B é correta. A prisão temporária exige representação da autoridade policial ou requerimento do Ministério Público; o juiz não pode decretá-la de ofício. A gravidade abstrata do estupro de vulnerável não supre essa exigência nem a necessidade de fundamentação concreta.
A) e D) autorizam iniciativa judicial que a lei não prevê. C) erra: a temporária é medida voltada à investigação. E) erra: primariedade, por si só, não impede a medida se os requisitos estiverem presentes.
Base: Lei 7.960/1989, arts. 1º e 2º.$new$, $topic$Prisão temporária: legitimidade para requerer/representar e vedação de decretação de ofício.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/leis/l7960.htm"]$src$::jsonb),
    ($id$04424404-8805-4d3a-b2d6-14ad660d1116$id$::uuid, 18, $ans$A$ans$, $old$A alternativa A está correta. Se os vestígios desaparecem, a prova testemunhal pode suprir a falta do exame de corpo de delito, conforme art. 167 do CPP.$old$, $new$A é correta. O art. 167 do CPP permite que a prova testemunhal supra a falta do exame de corpo de delito quando o exame não for possível porque os vestígios desapareceram. A regra do art. 158 torna o exame indispensável quando há vestígios, mas prevê essa exceção legal.
B) ignora o art. 167. C) não corresponde à exceção expressa. D) transforma a regra em absoluta, mesmo quando os vestígios desapareceram. E) erra: o art. 159 prevê, como regra, um perito oficial com diploma de curso superior, não dois.
Base: CPP, arts. 158, 159 e 167.$new$, $topic$Exame de corpo de delito; desaparecimento de vestígios e prova testemunhal supletiva, CPP, arts. 158 e 167.$topic$, $src$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"]$src$::jsonb)
 ) as v(id,item_number,answer,old_explanation,new_explanation,tested_topic,legal_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then
     if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após este lote; revisão posterior preservada',r.item_number; end if;
   else
     if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B'
       or q.item_number<>r.item_number or q.official_answer<>r.answer or q.content_status<>'active'
       or q.syllabus_topic_id is not null or q.explanation<>r.old_explanation
     then raise exception 'Item %, estado ou explicação diverge do resultado conferido; nada será alterado',r.item_number; end if;
     update public.board_exam_questions set
       explanation=r.new_explanation,
       syllabus_topic_id=v_topic,
       tested_topic=r.tested_topic,
       legal_basis=(select jsonb_agg(jsonb_build_object('title','Fonte jurídica oficial consultada','url',value)) from jsonb_array_elements_text(r.legal_sources))
          || jsonb_build_array(jsonb_build_object('title','Edital nº 01/2025 — Anexo I, conteúdo de Processo Penal, p. 53','url',edital_url)),
       legal_review_required=false,
       verified_at=now(),
       review_note='Gabarito definitivo IDECAN conferido; explicação revisada com fundamento legal e distinção das alternativas. Tema vinculado ao Anexo I do Edital PCSC nº 01/2025. Status active preservado.'
     where id=q.id returning to_jsonb(board_exam_questions) into after_row;
     insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
     values(batch,q.id,before_row,after_row,jsonb_build_object(
       'official_answer',r.answer,
       'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
       'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
       'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
       'program_page','Anexo I, p. 53','content_status_before','active','content_status_after','active'),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis
from public.board_exam_questions where id in ($qid$b3359c7d-a2ab-4815-9372-ef0dbe324f59$qid$::uuid,$qid$7a651cd9-4234-4506-bed4-166533994e1a$qid$::uuid,$qid$62a81c2f-f001-403d-87cb-8dd6e4cdedc9$qid$::uuid,$qid$28f98e98-214b-4d42-a594-6bafe0e7a43c$qid$::uuid,$qid$bdaceb4b-fb6a-4769-8f66-6e39f27f5e80$qid$::uuid,$qid$ab9c3387-4fad-44a8-b5f8-77b840d14512$qid$::uuid,$qid$8337ba09-070e-40e4-a7ff-274b30d26efc$qid$::uuid,$qid$04424404-8805-4d3a-b2d6-14ad660d1116$qid$::uuid) order by item_number;
