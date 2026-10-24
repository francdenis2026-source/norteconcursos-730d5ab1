-- PC-SC Agente, caderno Tipo B, Direitos Humanos e Legislação Institucional, itens 31–36.
-- Estado vivo informado: 31 e 34 active, mas ligados indevidamente a tópico PF; demais under_review sem vínculo.
-- Corrige os dois vínculos, preserva active, revisa e libera os demais após conferir o gabarito definitivo.
-- Fontes oficiais consultadas em 23/10/2026: Planalto e ACNUDH/ONU; Anexo I do Edital PCSC nº 01/2025.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic_hr uuid; v_topic_inst uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-human-rights-31-36-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_hr text := $hr$NOÇÕES DE DIREITOS HUMANOS: 1. O conceito de direitos humanos. 2. Noções gerais sobre direitos humanos. 3. Os direitos humanos na Organização das Nações Unidas. 4. Os direitos humanos na Organização dos Estados Americanos. 5. A Declaração Universal dos Direitos Humanos. 6. A Corte Interamericana de Direitos Humanos. 7. A natureza jurídica da incorporação de normas internacionais sobre direitos humanos ao direito interno brasileiro. 8. Lei nº 13.060, de 22 de dezembro de 2014, e Decreto nº 12.341, de 23 de dezembro de 2024.$hr$;
 program_inst text := $inst$LEGISLAÇÃO INSTITUCIONAL: 1. Lei nº 14.735, de 23 de novembro de 2023 (Lei Orgânica Nacional das Polícias Civis). 2. Lei nº 6.843, de 28 de julho de 1986 (Estatuto da Polícia Civil do Estado de Santa Catarina). 3. Lei Complementar Estadual nº 453, de 5 de agosto de 2009. 4. Lei Complementar Estadual nº 491, de 20 de janeiro de 2010. 5. Lei Estadual nº 16.774, de 30 de novembro de 2015. 6. Lei Complementar Estadual nº 741, de 12 de junho de 2019.$inst$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then raise exception 'Edição PCSC não corresponde ao edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status) values(v_edition,'Prova Objetiva','Noções de Direitos Humanos',1,program_hr,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic_hr from public.syllabus_topics where edition_id=v_edition and discipline='Noções de Direitos Humanos' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic_hr and topic_text=program_hr and content_status='current') then raise exception 'Tópico de Direitos Humanos do edital ausente/divergente'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status) values(v_edition,'Prova Objetiva','Legislação Institucional',1,program_inst,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic_inst from public.syllabus_topics where edition_id=v_edition and discipline='Legislação Institucional' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic_inst and topic_text=program_inst and content_status='current') then raise exception 'Tópico de Legislação Institucional ausente/divergente'; end if;
 insert into public.content_sources(source_type,title,issuer,url,checked_at,status,is_official,notes)
 select source_type,title,issuer,url,checked::timestamptz,'vigente',true,'Fonte oficial cotejada em 23/10/2026 para revisão individual PCSC Tipo B.'
 from (values
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm$url$, $title$Lei nº 13.060/2014 — Instrumentos de menor potencial ofensivo$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:12+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm$url$, $title$Decreto nº 12.341/2024 — Uso da força em segurança pública$title$, $issuer$Presidência da República — Planalto$issuer$, $type$decreto$type$, $checked$2026-10-23 04:06:13+00$checked$),
    ($url$https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese$url$, $title$Declaração Universal dos Direitos Humanos — versão oficial em português$title$, $issuer$Alto Comissariado das Nações Unidas para os Direitos Humanos$issuer$, $type$outro$type$, $checked$2026-10-23 04:06:17+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm$url$, $title$Lei nº 14.735/2023 — Lei Orgânica Nacional das Polícias Civis$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:13+00$checked$)
 ) s(url,title,issuer,source_type,checked) on conflict(url) do nothing;
 if exists(select 1 from (values
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm$url$, $title$Lei nº 13.060/2014 — Instrumentos de menor potencial ofensivo$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:12+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm$url$, $title$Decreto nº 12.341/2024 — Uso da força em segurança pública$title$, $issuer$Presidência da República — Planalto$issuer$, $type$decreto$type$, $checked$2026-10-23 04:06:13+00$checked$),
    ($url$https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese$url$, $title$Declaração Universal dos Direitos Humanos — versão oficial em português$title$, $issuer$Alto Comissariado das Nações Unidas para os Direitos Humanos$issuer$, $type$outro$type$, $checked$2026-10-23 04:06:17+00$checked$),
    ($url$https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm$url$, $title$Lei nº 14.735/2023 — Lei Orgânica Nacional das Polícias Civis$title$, $issuer$Presidência da República — Planalto$issuer$, $type$lei$type$, $checked$2026-10-23 04:06:13+00$checked$)
 ) s(url,title,issuer,source_type,checked) where not exists(select 1 from public.content_sources cs where cs.url=s.url and cs.is_official and cs.status='vigente')) then raise exception 'Fonte oficial ausente/inativa'; end if;
 for r in (select * from (values
    ($id$b88e0433-aa12-4a06-8395-9dd4f6c0df9b$id$::uuid, 31, $ans$A$ans$, $state$active$state$, $old$A Lei 13.060/2014 prioriza instrumentos de menor potencial ofensivo, desde que isso não ponha em risco a integridade física ou psíquica dos policiais, e exige legalidade, necessidade, razoabilidade e proporcionalidade: A.<br><br>Erro comum: A preferência legal não cria obrigação cega de usar qualquer instrumento em qualquer situação.<br><br>Exemplo prático: A escolha do meio deve considerar a ameaça concreta, a proteção das pessoas e as condições de segurança previstas na lei.$old$, $new$A é correta. O art. 2º da Lei 13.060/2014 determina que os órgãos de segurança pública priorizem instrumentos de menor potencial ofensivo, desde que seu uso não coloque em risco a integridade física ou psíquica dos policiais, observados legalidade, necessidade, razoabilidade e proporcionalidade. O Decreto 12.341/2024 reforça que a arma de fogo é medida de último recurso (art. 3º, § 2º).
B) não existe liberdade irrestrita para preferir arma de fogo. C) a lei não impõe esgotar toda negociação em qualquer cenário. D) o uso não se limita a manifestações. E) não exige autorização superior individual para cada ocorrência.
Base: Lei 13.060/2014, art. 2º; Decreto 12.341/2024, art. 3º, § 2º.$new$, $topic$Uso da força: Lei nº 13.060/2014 e Decreto nº 12.341/2024; princípios e instrumentos de menor potencial ofensivo.$topic$, $prev$afaf633e-5b3a-4ed9-96ae-a1a9a352c339$prev$::uuid, '["https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm", "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm"]'::jsonb),
    ($id$dd330188-4dd5-4d12-8675-b060caf42025$id$::uuid, 32, $ans$D$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$D reproduz o art. 1º da Declaração Universal dos Direitos Humanos: todos nascem livres e iguais em dignidade e direitos e devem agir uns para com os outros em espírito de fraternidade.
A) a Declaração não dá discricionariedade total aos Estados para eliminar direitos. B) os direitos são da pessoa humana, não garantias exclusivas dos Estados. C) a proteção não se restringe a maiores ou plenamente capazes. E) a Declaração não autoriza retirada geral de direitos por segurança nacional.
Base: DUDH, art. 1º; texto oficial em português disponibilizado pelo ACNUDH/ONU.$new$, $topic$Declaração Universal dos Direitos Humanos: dignidade, liberdade, igualdade e fraternidade; art. 1º.$topic$, null::uuid, '["https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese"]'::jsonb),
    ($id$218d5fc2-2d15-4942-8152-e961eb307276$id$::uuid, 33, $ans$B$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$B corresponde ao art. 2º da DUDH: toda pessoa pode invocar os direitos e liberdades sem distinções, inclusive por raça, cor, sexo, língua, religião, opinião, origem, condição econômica ou qualquer outra situação. O dispositivo também veda distinções baseadas no estatuto político ou jurídico do país ou território.
A) a universalidade não se limita aos direitos civis e políticos. C) gênero e religião não justificam discriminação. D) o art. 7º assegura igual proteção da lei e proteção contra discriminação. E) os direitos não dependem de cidadania de Estado membro da ONU.
Base: DUDH, arts. 2º e 7º; texto oficial em português disponibilizado pelo ACNUDH/ONU.$new$, $topic$Declaração Universal dos Direitos Humanos: universalidade, não discriminação e igualdade perante a lei; arts. 2º e 7º.$topic$, null::uuid, '["https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese"]'::jsonb),
    ($id$3aa102d1-436e-4e61-b9ed-898f866da0f7$id$::uuid, 34, $ans$C$ans$, $state$active$state$, $old$O art. 2º enumera legalidade, precaução, necessidade, proporcionalidade, razoabilidade, responsabilização e não discriminação: C. A lista é específica para uso da força.<br><br>Erro comum: Princípios administrativos conhecidos não substituem a enumeração expressa do decreto.<br><br>Exemplo prático: Uma ação deve minimizar danos previsíveis e evitar tratamento discriminatório, além de perseguir um objetivo legal.$old$, $new$C reproduz a lista do art. 2º do Decreto 12.341/2024: legalidade, precaução, necessidade, proporcionalidade, razoabilidade, responsabilização e não discriminação. O parágrafo único também exige objetivo legal, planejamento para prevenir/minimizar força e compatibilidade com a ameaça.
A), B), D) e E) misturam princípios administrativos ou operacionais que não substituem a enumeração expressa do decreto.
Exemplo: o emprego da força deve ser planejado para reduzir danos e não pode discriminar pessoas.
Base: Decreto 12.341/2024, art. 2º e parágrafo único.$new$, $topic$Uso da força na segurança pública: princípios gerais e diretrizes do Decreto nº 12.341/2024, art. 2º.$topic$, $prev$afaf633e-5b3a-4ed9-96ae-a1a9a352c339$prev$::uuid, '["https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm"]'::jsonb),
    ($id$e8e8ba84-381a-45d8-96cd-2e70d46fea77$id$::uuid, 35, $ans$E$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$E é correta. O art. 17 da DUDH reconhece a toda pessoa o direito à propriedade, individualmente ou em sociedade com outras, e dispõe que ninguém será arbitrariamente privado de sua propriedade.
A) a declaração reconhece o direito como universal; B) não o restringe a nacionais nem o torna absoluto; C) interesse econômico genérico não autoriza privação arbitrária; D) o texto admite expressamente propriedade em comum.
Base: DUDH, art. 17; texto oficial em português disponibilizado pelo ACNUDH/ONU.$new$, $topic$Declaração Universal dos Direitos Humanos: direito à propriedade individual e em sociedade; art. 17.$topic$, null::uuid, '["https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese"]'::jsonb),
    ($id$345df1bd-e321-422c-965c-de4c17742bea$id$::uuid, 36, $ans$E$ans$, $state$under_review$state$, $old$Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.$old$, $new$E reúne os elementos legais. A Lei 14.735/2023 define as Polícias Civis como instituições permanentes, com funções exclusivas e típicas de Estado, essenciais à justiça criminal (art. 1º); atribui-lhes, ressalvadas a competência da União e as infrações militares, as funções de polícia judiciária civil e apuração de infrações penais (art. 6º).
A) a atuação não se restringe a infrações de menor potencial ofensivo. B) a instituição é permanente, não temporária. C) exerce polícia judiciária e investigação criminal. D) a lei não a subordina funcionalmente ao Judiciário.
Base: Lei 14.735/2023, arts. 1º e 6º.$new$, $topic$Lei Orgânica Nacional das Polícias Civis: natureza permanente, polícia judiciária civil e apuração de infrações penais; arts. 1º e 6º.$topic$, null::uuid, '["https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm"]'::jsonb)
 ) as v(id,item_number,answer,expected_status,old_explanation,new_explanation,tested_topic,expected_topic,legal_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após este lote; revisão posterior preservada',r.item_number; end if;
   else
    if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B' or q.item_number<>r.item_number
      or q.official_answer<>r.answer or q.content_status<>r.expected_status or q.syllabus_topic_id is distinct from r.expected_topic
      or regexp_replace(regexp_replace(coalesce(q.explanation,''),'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g')
         <> regexp_replace(regexp_replace(r.old_explanation,'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g') then
      raise exception 'Item %, estado/gabarito/vínculo/explicação diverge do resultado conferido; transação cancelada',r.item_number; end if;
    update public.board_exam_questions set explanation=r.new_explanation,content_status='active',
      syllabus_topic_id=case when q.subject='Legislação Institucional' then v_topic_inst else v_topic_hr end,
      tested_topic=r.tested_topic,
      legal_basis=(select jsonb_agg(jsonb_build_object('title','Fonte oficial consultada','url',value) order by value) from jsonb_array_elements_text(r.legal_sources)),
      law_version_checked_at='2026-10-23 04:06:18+00'::timestamptz,legal_review_required=false,verified_at=now(),
      review_note=case when r.expected_status='under_review' then 'Gabarito definitivo IDECAN conferido. Questão revisada em fonte oficial, vinculada ao conteúdo pertinente do Anexo I do Edital PCSC nº 01/2025 e liberada após revisão.' else 'Gabarito definitivo IDECAN conferido. Explicação e fontes oficiais revisadas; corrigido vínculo curricular que apontava para edição de outro concurso, agora associado ao Edital PCSC nº 01/2025. Status active preservado.' end
    where id=q.id returning to_jsonb(board_exam_questions) into after_row;
    insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values(batch,q.id,before_row,after_row,jsonb_build_object('official_answer',r.answer,
      'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
      'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
      'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
      'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
      'status_before',r.expected_status,'status_after','active','previous_topic_id',r.expected_topic,'reviewed_at','2026-10-24', 'legal_sources',r.legal_sources),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where id in ($qid$b88e0433-aa12-4a06-8395-9dd4f6c0df9b$qid$::uuid,$qid$dd330188-4dd5-4d12-8675-b060caf42025$qid$::uuid,$qid$218d5fc2-2d15-4942-8152-e961eb307276$qid$::uuid,$qid$3aa102d1-436e-4e61-b9ed-898f866da0f7$qid$::uuid,$qid$e8e8ba84-381a-45d8-96cd-2e70d46fea77$qid$::uuid,$qid$345df1bd-e321-422c-965c-de4c17742bea$qid$::uuid) order by item_number;
