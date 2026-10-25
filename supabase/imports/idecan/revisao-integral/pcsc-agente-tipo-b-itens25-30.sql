-- PC-SC Agente, caderno Tipo B, Direito Administrativo itens 25–30.
-- Estado vivo fornecido pelo usuário: todos under_review; item 25 já tem explicação parcial.
-- Gabarito definitivo cotejado: B-D-A-C-E-B. Fontes oficiais Planalto consultadas em 23/10/2026.
-- A comparação textual normaliza apenas quebras HTML/whitespace para tolerar a formatação da saída SQL.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-administrativo-25-30-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_text text := $program$NOÇÕES DE DIREITO ADMINISTRATIVO: 1. Direito Administrativo — conceito, fontes e princípios. 2. Estado, governo e administração pública. 3. Administração direta e indireta. 4. Agentes públicos. 5. Poderes administrativos. 6. Serviços públicos. 7. Atos administrativos. 8. Licitação. 9. Responsabilidade civil do Estado. 10. Lei nº 8.429, de 2 de junho de 1992 — Lei de Improbidade Administrativa. 11. Lei nº 12.527, de 18 de novembro de 2011 — Lei de Acesso à Informação. 12. Lei nº 13.709, de 14 de agosto de 2018 — Lei Geral de Proteção de Dados.$program$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then raise exception 'Edição não corresponde ao edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Noções de Direito Administrativo',1,program_text,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Noções de Direito Administrativo' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then raise exception 'Tópico de Direito Administrativo ausente ou divergente do edital'; end if;
 insert into public.content_sources(source_type,title,issuer,url,checked_at,status,is_official,notes)
 select 'lei',title,issuer,url,checked::timestamptz,'vigente',true,'Texto oficial consolidado consultado em 23/10/2026; evidência registrada no lote PCSC Tipo B.'
 from (values
    ($url$https://www.planalto.gov.br/ccivil_03/leis/l8429.htm$url$, $title$Lei nº 8.429/1992 — Improbidade Administrativa$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:14+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm$url$, $title$Lei nº 13.709/2018 — Lei Geral de Proteção de Dados$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:13+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm$url$, $title$Lei nº 12.527/2011 — Lei de Acesso à Informação$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:12+00$checked$)
 ) s(url,title,issuer,source_type,checked)
 on conflict(url) do nothing;
 if exists(select 1 from (values
    ($url$https://www.planalto.gov.br/ccivil_03/leis/l8429.htm$url$, $title$Lei nº 8.429/1992 — Improbidade Administrativa$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:14+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm$url$, $title$Lei nº 13.709/2018 — Lei Geral de Proteção de Dados$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:13+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm$url$, $title$Lei nº 12.527/2011 — Lei de Acesso à Informação$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:12+00$checked$)
 ) s(url,title,issuer,source_type,checked) where not exists(select 1 from public.content_sources cs where cs.url=s.url and cs.is_official and cs.status='vigente')) then raise exception 'Fonte oficial ausente/inativa'; end if;
 for r in (select * from (values
    ($id$93d09d86-cfc0-4b1d-b225-82819f0ade61$id$::uuid, 25, $ans$B$ans$, $state$under_review$state$, $old$A LIA atual define condutas dolosas nos arts. 9º, 10 e 11 e exige vontade livre e consciente de alcançar o resultado ilícito. O gabarito B acrescenta ressalva genérica de modalidade culposa que exige análise: o §1º ressalva tipos em leis especiais, sem restabelecer por si a antiga improbidade culposa.<br><br>Erro comum: Não dizer que todo erro administrativo é improbidade nem transformar uma ressalva abstrata em tipo culposo existente.<br><br>Exemplo prático: Uma gestão ineficiente exige apurar responsabilidade própria; não é automaticamente improbidade dolosa.$old$, $new$B é a resposta do gabarito, mas a ressalva precisa ser lida com precisão. O art. 1º, §§ 1º e 2º, da Lei 8.429/1992 define como improbidade as condutas dolosas tipificadas nos arts. 9º, 10 e 11 e exige vontade livre e consciente de alcançar o resultado ilícito; mera voluntariedade não basta. O § 1º ressalva tipos previstos em leis especiais: isso não restaura, por si só, a antiga improbidade culposa nem autoriza presumir uma modalidade culposa geral na LIA.
A) dispensa o dolo e a tipificação. C) admite culpa grave como regra, contrariando a exigência legal de dolo. D) ignora tipificação e finalidade ilícita. E) erro grosseiro, sozinho, não configura improbidade.
Exemplo: gestão ineficiente ou erro administrativo não é automaticamente improbidade; devem ser demonstrados os requisitos legais do tipo.
Base: Lei 8.429/1992, art. 1º, §§ 1º–3º, e arts. 9º–11.$new$, $topic$Improbidade administrativa: dolo e tipificação após a Lei 14.230/2021; ressalva de leis especiais.$topic$, '["https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"]'::jsonb),
    ($id$156edaf0-6334-4e53-9cc0-fd2da6c4f721$id$::uuid, 26, $ans$D$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$D é correta. O art. 10 da Lei 8.429/1992 exige ação ou omissão dolosa que cause, de modo efetivo e comprovado, perda patrimonial, desvio, apropriação, malbaratamento ou dilapidação dos bens ou haveres das entidades protegidas. O dolo segue a definição do art. 1º, § 2º: vontade livre e consciente de alcançar o resultado ilícito tipificado; mera voluntariedade não basta.
A) é incorreta porque a conduta precisa estar tipificada. B) não há presunção de dano. C) potencialidade lesiva não substitui a perda efetiva exigida pelo art. 10. E) culpa não basta para a modalidade geral do art. 10.
Base: Lei 8.429/1992, arts. 1º, §§ 1º–2º, e 10, texto vigente após a Lei 14.230/2021.$new$, $topic$Improbidade administrativa: dolo e prejuízo patrimonial efetivo e comprovado no art. 10 da Lei 8.429/1992.$topic$, '["https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"]'::jsonb),
    ($id$3385771d-4d0f-486d-8186-6909b775a2e4$id$::uuid, 27, $ans$A$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa A é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$A é correta. A LGPD considera sensíveis dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou organização religiosa, filosófica ou política, saúde, vida sexual, dado genético ou biométrico vinculado a pessoa natural (art. 5º, II).
B descreve dado pessoal em geral, categoria mais ampla. C não torna todo dado econômico sensível por si só. D não define dado sensível e pode envolver dado anonimizado conforme o caso. E o fato de estar em fonte pública não altera automaticamente a categoria nem afasta a LGPD.
Base: Lei 13.709/2018, arts. 5º, I–III, e 11.$new$, $topic$LGPD: conceito legal e categorias de dados pessoais sensíveis, art. 5º, II.$topic$, '["https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"]'::jsonb),
    ($id$8e34f6f2-faa3-4680-90b8-b21cf83d6cd9$id$::uuid, 28, $ans$C$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa C é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$C é correta. A LGPD inclui o consentimento do titular entre as bases legais para tratamento de dados pessoais (art. 7º, I) e o define como manifestação livre, informada e inequívoca para finalidade determinada (art. 5º, XII). Autorizações genéricas são nulas (art. 8º, § 4º).
A) prática reiterada não presume consentimento. B) conveniência administrativa, sozinha, não é base legal. D) interesse público deve se enquadrar nas hipóteses legais pertinentes; não basta invocação genérica. E) dado acessível ao público continua sujeito à finalidade, boa-fé e demais princípios da LGPD.
Atenção: consentimento é uma das bases legais, não a única; dados sensíveis têm regras próprias no art. 11.
Base: Lei 13.709/2018, arts. 5º, XII, 7º, 8º e 11.$new$, $topic$LGPD: consentimento e bases legais para tratamento de dados pessoais; arts. 5º, XII, 7º e 8º.$topic$, '["https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"]'::jsonb),
    ($id$2cd6cc42-94b7-4b6e-af46-dc892e64bce8$id$::uuid, 29, $ans$E$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$E é correta. A Lei de Acesso à Informação adota a publicidade como regra geral e o sigilo como exceção, nos limites e procedimentos previstos na própria lei (art. 3º, I). O pedido não precisa ser motivado, e a Administração não pode exigir que o interessado explique por que deseja a informação (art. 10, § 3º).
A) a lei não restringe o acesso a documentos produzidos após sua vigência, observadas existência, guarda e hipóteses legais de sigilo. B) motivação e interesse direto não são exigidos. C) o acesso não depende de autorização prévia da autoridade máxima. D) interesse institucional genérico não cria hipótese autônoma de sigilo.
Base: Lei 12.527/2011, arts. 3º, I, 7º e 10, § 3º.$new$, $topic$Lei de Acesso à Informação: publicidade como regra, sigilo como exceção e dispensa de motivação do pedido.$topic$, '["https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm"]'::jsonb),
    ($id$9f7eb546-7583-4571-a3db-2b6eb0ea3f57$id$::uuid, 30, $ans$B$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$B é correta. O art. 24, § 1º, da LAI fixa prazos máximos de restrição a partir da produção da informação: 25 anos para ultrassecreta, 15 para secreta e 5 para reservada. A lei também admite termo final vinculado a evento, desde que anterior ao prazo máximo (§ 3º).
A) a reavaliação não é simplesmente facultativa: o art. 29 prevê reavaliação de ofício ou mediante provocação. C) ultrassecreto não é sigilo indeterminado; o máximo é 25 anos. D) a lei fixa limites, sem renovação indefinida. E) reservado tem prazo máximo de cinco anos.
Base: Lei 12.527/2011, arts. 24, §§ 1º–4º, e 29.$new$, $topic$Lei de Acesso à Informação: graus e prazos máximos de classificação do sigilo, arts. 24 e 29.$topic$, '["https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm"]'::jsonb)
 ) as v(id,item_number,answer,expected_status,old_explanation,new_explanation,tested_topic,legal_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then
     if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após o lote; preservando revisão posterior',r.item_number; end if;
   else
     if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B'
       or q.item_number<>r.item_number or q.official_answer<>r.answer or q.content_status<>r.expected_status
       or q.syllabus_topic_id is not null
       or regexp_replace(regexp_replace(coalesce(q.explanation,''), '<br[[:space:]]*/?>', ' ', 'gi'), '[[:space:]]+', ' ', 'g')
          <> regexp_replace(regexp_replace(r.old_explanation, '<br[[:space:]]*/?>', ' ', 'gi'), '[[:space:]]+', ' ', 'g') then
       raise exception 'Item %, status/gabarito/explicação diverge do resultado conferido; transação cancelada',r.item_number; end if;
     update public.board_exam_questions set
       explanation=r.new_explanation,content_status='active',syllabus_topic_id=v_topic,tested_topic=r.tested_topic,
       legal_basis=(select jsonb_agg(jsonb_build_object('title','Fonte oficial — Planalto','url',value) order by value) from jsonb_array_elements_text(r.legal_sources)),
       law_version_checked_at='2026-10-23 04:06:15+00'::timestamptz,legal_review_required=false,verified_at=now(),
       review_note='Gabarito definitivo IDECAN conferido. Norma vigente cotejada no texto oficial consolidado do Planalto em 23/10/2026; explicação e tópico do Anexo I do Edital PCSC nº 01/2025 revisados. Status active liberado após revisão.'
     where id=q.id returning to_jsonb(board_exam_questions) into after_row;
     insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
     values(batch,q.id,before_row,after_row,jsonb_build_object('official_answer',r.answer,
       'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
       'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
       'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
       'official_syllabus_url',edital_url,'syllabus_page','Anexo I, p. 53','status_before',r.expected_status,'status_after','active',
       'checked_law_version_at','2026-10-23','legal_sources',r.legal_sources),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where id in ($qid$93d09d86-cfc0-4b1d-b225-82819f0ade61$qid$::uuid,$qid$156edaf0-6334-4e53-9cc0-fd2da6c4f721$qid$::uuid,$qid$3385771d-4d0f-486d-8186-6909b775a2e4$qid$::uuid,$qid$8e34f6f2-faa3-4680-90b8-b21cf83d6cd9$qid$::uuid,$qid$2cd6cc42-94b7-4b6e-af46-dc892e64bce8$qid$::uuid,$qid$9f7eb546-7583-4571-a3db-2b6eb0ea3f57$qid$::uuid) order by item_number;
