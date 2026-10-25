-- PC-SC Agente, caderno Tipo B, itens 1–10 (Direito Penal).
-- Estado vivo conferido pelo usuário: active; gabaritos conferidos; syllabus_topic_id nulo.
-- Cria o tópico do Edital 01/2025, amplia explicações e corrige a imprecisão sobre afinidade no item 5.
-- Preserva content_status='active'. Pré-condições exatas impedem sobrescrever mudanças posteriores.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-penal-01-10-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_text text := $program$NOÇÕES DE DIREITO PENAL: 1 introdução ao direito penal. 1.1 conceito, características e função do direito penal. 1.2 princípios do direito penal. 2. conceito de crime e seus elementos. 2.1 classificações do crime. 2.2 ação e omissão. 2.3 sujeito ativo e sujeito passivo. 2.4 bem jurídico. 3. Tipicidade. ilicitude. culpabilidade. punibilidade. 4. Erro de tipo e erro de proibição. 5. crime consumado. Tentativa. desistência voluntária. arrependimento eficaz. arrependimento posterior. crime impossível. 6. concurso de pessoas. 7. concurso de crimes. 8. Extinção da punibilidade. 9 crimes. 9.1 crimes contra a pessoa. 9.2 crimes contra o patrimônio. 9.3 crimes contra a dignidade sexual. 9.4 crimes contra a fé pública. 9.5 crimes contra a administração pública. 9.6 crimes contra o Estado democrático de direito.$program$;
begin
 insert into public.content_sources(source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
 values('edital','Edital nº 01/2025 — Agente de Polícia Civil','Polícia Civil de Santa Catarina / IDECAN',edital_url,'2025-12-12',now(),'vigente',true,
 'Diário Oficial de SC nº 22.660. Anexo I, p. 53 contém Noções de Direito Penal. PDF SHA-256 d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a.')
 on conflict(url) do nothing;
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial ausente ou com metadados divergentes'; end if;
 insert into public.syllabus_editions(contest_name,role_name,contest_year,exam_board,source_id,status)
 values('PC SC - Agente de Polícia Civil 2026','Agente de Polícia Civil',2026,'IDECAN',v_source,'active')
 on conflict(contest_name,role_name,contest_year) do nothing;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and exam_board='IDECAN' and source_id=v_source and status='active') then
   raise exception 'Edição já cadastrada diverge do edital oficial; nada será vinculado';
 end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Noções de Direito Penal',1,program_text,'current')
 on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Noções de Direito Penal' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then
   raise exception 'Tópico de edital já existe com conteúdo divergente';
 end if;
 for r in (select * from (values
    ($id$e6f5dd71-ef71-4758-aebb-9bf40b6ae75d$id$::uuid, 1, $ans$B$ans$, $old$A alternativa B está correta. O princípio da insignificância afasta a tipicidade material quando a lesão ao bem jurídico é irrelevante, desde que presentes os vetores reconhecidos pela jurisprudência, como mínima ofensividade e reduzido grau de reprovabilidade. Ele não elimina a tipicidade formal nem a ilicitude.$old$, $new$B é o gabarito definitivo. A insignificância afasta a tipicidade material, não a formal nem a ilicitude. O valor de R$ 30 e a ausência de violência apontam para lesão inexpressiva; a conclusão deve considerar também os quatro vetores do STF: mínima ofensividade, nenhuma periculosidade social, reduzido grau de reprovabilidade e inexpressividade da lesão. O valor isolado não cria um limite automático nem resolve todos os casos.
A) e D) tratam dano/valor como decisivos sem avaliar o contexto. C) confunde tipicidade material com formal. E) confunde tipicidade com ilicitude.
Base: STF, HC 84.412/SP; CP, art. 155.$new$, $topic$Tipicidade material e princípio da insignificância em crime patrimonial.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://portal.stf.jus.br/processos/detalhe.asp?incidente=2226200"]$sources$::jsonb),
    ($id$3b1a3115-43e4-4147-9007-377fe77babe5$id$::uuid, 2, $ans$E$ans$, $old$A alternativa E está correta. Simone desconhecia a realidade do objeto recebido, o que caracteriza erro de tipo sobre elemento do fato, disciplinado pelo art. 20 do Código Penal. O erro inevitável exclui dolo e culpa; no caso narrado, a alternativa reproduz essa consequência.$old$, $new$E é correta. Simone acredita receber farinha e desconhece a natureza da substância: erro sobre elemento fático do tipo (erro de tipo essencial). Pelo art. 20 do CP, o erro inevitável exclui dolo e culpa; o evitável exclui dolo e só permite punição culposa se houver modalidade culposa prevista, inexistente para o tráfico.
A) cita art. 21, que trata de erro sobre a ilicitude. B) atribui ao art. 20 a redução do art. 21. C) troca erro de tipo por erro de proibição e inverte seus efeitos. D) erro de proibição inevitável isenta de pena; não exclui a ilicitude.
Base: CP, arts. 20 e 21; Lei 11.343/2006, art. 33.$new$, $topic$Erro de tipo essencial e distinção do erro de proibição.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://www.planalto.gov.br/ccivil_03/leis/l11343.htm"]$sources$::jsonb),
    ($id$82e22511-e91a-4b05-b998-d40719537e64$id$::uuid, 3, $ans$D$ans$, $old$A alternativa D está correta. Após efetuar todos os disparos, Mário esgotou os atos executórios e, por iniciativa própria, socorreu a vítima, impedindo o resultado morte. Trata-se de arrependimento eficaz; responde pelos atos já praticados, lesão corporal.$old$, $new$D é a correta. Os disparos esgotaram a execução; o agente depois impede voluntariamente a morte levando a vítima ao hospital. É arrependimento eficaz (CP, art. 15), respondendo pelos atos já praticados, como lesões. A hipótese pressupõe que o socorro foi eficaz para evitar o resultado.
A) e B) mantêm tentativa apesar de o resultado ter sido impedido. C) confunde com arrependimento posterior, que pressupõe crime consumado sem violência ou grave ameaça e reparação nos termos legais. E) descreve desistência voluntária, que interrompe uma execução ainda em curso.
Base: CP, art. 15.$new$, $topic$Arrependimento eficaz; desistência voluntária; art. 15 do CP.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"]$sources$::jsonb),
    ($id$28759241-3634-42dd-87df-5c03749897ed$id$::uuid, 4, $ans$A$ans$, $old$A alternativa A está correta. O estelionato contra pessoa idosa possui causa de aumento de um terço até o dobro, prevista no art. 171, § 4º, do Código Penal.$old$, $new$A é correta para o fato de maio de 2022. A Lei 14.155/2021 já previa, no art. 171, § 4º, aumento de um terço ao dobro se o estelionato fosse praticado contra idoso ou vulnerável, considerada a relevância do resultado gravoso. Luciana tinha 61 anos (idosa a partir de 60) e o enunciado afirma resultado gravoso relevante.
B), C) e E) dão frações diferentes da redação aplicável. D) nega a condição de idosa apesar de ela ter mais de 60 anos. Alterações penais posteriores não retroagem para prejudicar o agente.
Base: CP, art. 171, § 4º, redação da Lei 14.155/2021; Lei 10.741/2003, art. 1º.$new$, $topic$Estelionato contra pessoa idosa; aplicação temporal do art. 171, § 4º, do CP.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14155.htm", "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm"]$sources$::jsonb),
    ($id$c27c8438-1c64-4d6e-a307-f6b3c7bc3c39$id$::uuid, 5, $ans$D$ans$, $old$A alternativa D está correta. A qualificadora alcança parente consanguíneo ou por afinidade até o terceiro grau; filha adotiva é parente por vínculo civil, e a redação legal não autoriza ampliar o alcance para incluí-la nessa hipótese.$old$, $new$D é correta quanto à qualificadora funcional perguntada. Na redação aplicável aos fatos de 2024, o art. 121, § 2º, VII, do CP abrangia o homicídio contra agente dos arts. 142/144 da CF e seu cônjuge, companheiro ou parente consanguíneo até terceiro grau, em razão dessa condição. A filha adotiva tem filiação civil plena, mas o texto da qualificadora funcional aplicável ao agente policial exige parentesco consanguíneo até terceiro grau; não se pode ampliá-la por analogia contra o réu.
A), B), C) e E) erram o tipo de parentesco ou o grau. Limite da resposta: isso afasta somente a qualificadora funcional. A vítima tinha 8 anos, podendo incidir a qualificadora autônoma do art. 121, § 2º, IX (Lei 14.344/2022), além de outras conforme fatos provados.
Base: CP, art. 121, § 2º, VII e IX; Leis 13.142/2015 e 14.344/2022; CF, art. 227, § 6º.$new$, $topic$Qualificadora funcional do homicídio; parentesco consanguíneo; qualificadora autônoma por vítima menor de 14 anos.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13142.htm", "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14344.htm", "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"]$sources$::jsonb),
    ($id$d877c024-cbd7-43fe-82f3-7e37a732a156$id$::uuid, 6, $ans$B$ans$, $old$A alternativa B está correta. A condição de funcionário público é elementar do peculato e comunica-se ao particular que concorre para o crime, quando conhecida, conforme art. 30 do Código Penal.$old$, $new$B é correta. O computador estava na posse de Américo em razão do cargo e foi apropriado em proveito próprio/alheio: peculato-apropriação (CP, art. 312, caput). A condição de funcionário público é elementar e se comunica ao particular que concorre sabendo dela (art. 30); o enunciado liga Marcelo ao acesso funcional do irmão.
A) erra a fração da participação de menor importância: um sexto a um terço. C) separa artificialmente os delitos apesar da comunicabilidade. D) ignora a posse funcional e o peculato. E) chama de pluralista a teoria geral do art. 29, que é unitária/monista.
Base: CP, arts. 29, 30 e 312.$new$, $topic$Concurso de pessoas, comunicabilidade de elementar e peculato.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"]$sources$::jsonb),
    ($id$ff118a80-525c-484d-9f2c-c6d2da9315ae$id$::uuid, 7, $ans$A$ans$, $old$A alternativa A está correta. O furto se consuma com a inversão da posse, ainda que breve, segundo a teoria da amotio adotada pelo STJ. A captura logo depois não transforma o crime em tentativa.$old$, $new$A é correta. O furto se consuma com a inversão da posse, mesmo breve e seguida de perseguição ou captura; não se exige posse tranquila. Rafhael escondeu o colar e saiu da loja, portanto a captura na esquina não torna o fato tentado.
B) atribui o resultado à teoria da ablatio. C) e E) dizem tentativa apesar da inversão da posse. D) invoca contrectatio, que não é o critério fixado pelo STJ.
Base: STJ, Tema Repetitivo 934; CP, art. 155.$new$, $topic$Consumação do furto pela inversão da posse; STJ Tema Repetitivo 934.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?novaConsulta=true&tipo_pesquisa=T&cod_tema_inicial=934&cod_tema_final=934"]$sources$::jsonb),
    ($id$d5a0adcf-e3e1-4b5b-bcc7-19d091dd89d5$id$::uuid, 8, $ans$C$ans$, $old$A alternativa C está correta. Uma única ação culposa produziu dois homicídios, sem desígnios autônomos. Aplica-se concurso formal próprio, com a pena de um crime aumentada de um sexto até a metade.$old$, $new$C descreve concurso formal próprio: uma única conduta culposa causa duas mortes, sem desígnios autônomos; aplica-se uma das penas, ou a mais grave, aumentada de um sexto até metade (CP, art. 70, caput).
A) chama de concurso material e traz fração errada. B) é cúmulo material (art. 69), pressupõe mais de uma conduta. D) concurso formal impróprio envolve desígnios autônomos e cúmulo, não exasperação. E) crime continuado exige pluralidade de ações/omissões, não uma só conduta.
Base: CP, arts. 69–71.$new$, $topic$Concurso formal próprio e concurso de crimes culposos.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"]$sources$::jsonb),
    ($id$78232f2c-9698-4737-a3d9-52fa31b39e84$id$::uuid, 9, $ans$E$ans$, $old$A alternativa E está correta. O crime de corrupção passiva se consuma com a solicitação da vantagem indevida, ainda que o particular não pague. O policial praticou a modalidade consumada do art. 317 do Código Penal.$old$, $new$E é correta. Solicitar vantagem indevida em razão da função já consuma corrupção passiva (CP, art. 317); não é preciso que o motorista pague. A recusa não desfaz o pedido consumado.
A) erra ao tratar a solicitação como tentativa. B) atribui o crime ao particular. C) e D) confundem com corrupção ativa (art. 333), que exige oferecer ou prometer vantagem. O agente pediu, não exigiu; a figura descrita é corrupção passiva, não concussão.
Base: CP, arts. 317 e 333.$new$, $topic$Corrupção passiva: solicitação e consumação.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"]$sources$::jsonb),
    ($id$7dd46816-6ff3-4cda-acc6-bf134af37620$id$::uuid, 10, $ans$C$ans$, $old$A alternativa C está correta. O estupro praticado por duas ou mais pessoas recebe aumento de um terço a dois terços, conforme art. 226, IV, a, do Código Penal.$old$, $new$C é correta. O estupro praticado por dois ou mais agentes tem aumento de um terço a dois terços (CP, art. 226, IV, a, incluído pela Lei 13.718/2018). A vítima tem 21 anos e há constrangimento mediante violência: tipo base do art. 213, não estupro de vulnerável.
A) incorreta: idade adulta, sem dado de vulnerabilidade. B), D) e E) indicam frações distintas da prevista no inciso IV.
Base: CP, arts. 213 e 226, IV, a.$new$, $topic$Estupro coletivo; majorante do art. 226, IV, a, do CP.$topic$, $sources$["https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13718.htm"]$sources$::jsonb)
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
     then raise exception 'Item %, estado ou explicação diverge da consulta conferida; nenhuma alteração será aplicada',r.item_number; end if;
     update public.board_exam_questions set
       explanation=r.new_explanation,
       syllabus_topic_id=v_topic,
       tested_topic=r.tested_topic,
       legal_basis=(select jsonb_agg(jsonb_build_object('title','Fonte jurídica oficial consultada','url',value)) from jsonb_array_elements_text(r.legal_sources))
          || jsonb_build_array(jsonb_build_object('title','Edital nº 01/2025 — Anexo I, p. 53','url',edital_url)),
       legal_review_required=false,
       verified_at=now(),
       review_note='Gabarito definitivo IDECAN confrontado; explicação jurídica revisada, com fundamento e limites de aplicação. Tema vinculado ao Anexo I do Edital PCSC nº 01/2025, p. 53. Status active preservado.'
     where id=q.id returning to_jsonb(board_exam_questions) into after_row;
     insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
     values(batch,q.id,before_row,after_row,jsonb_build_object(
       'official_answer',r.answer,'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
       'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
       'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
       'syllabus_page','Anexo I, p. 53','content_status_before','active','content_status_after','active'),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis
from public.board_exam_questions where id in ($qid$e6f5dd71-ef71-4758-aebb-9bf40b6ae75d$qid$::uuid,$qid$3b1a3115-43e4-4147-9007-377fe77babe5$qid$::uuid,$qid$82e22511-e91a-4b05-b998-d40719537e64$qid$::uuid,$qid$28759241-3634-42dd-87df-5c03749897ed$qid$::uuid,$qid$c27c8438-1c64-4d6e-a307-f6b3c7bc3c39$qid$::uuid,$qid$d877c024-cbd7-43fe-82f3-7e37a732a156$qid$::uuid,$qid$ff118a80-525c-484d-9f2c-c6d2da9315ae$qid$::uuid,$qid$d5a0adcf-e3e1-4b5b-bcc7-19d091dd89d5$qid$::uuid,$qid$78232f2c-9698-4737-a3d9-52fa31b39e84$qid$::uuid,$qid$7dd46816-6ff3-4cda-acc6-bf134af37620$qid$::uuid) order by item_number;
