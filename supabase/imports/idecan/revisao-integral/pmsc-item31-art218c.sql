-- Revisão individual do item 31 PMSC, Tipo A.
-- Confere o art. 218-C vigente, inclusive a alteração de pena da Lei 15.280/2025.
-- O edital PMSC nº 200/CCP/2025 inclui expressamente os arts. 213 a 218-C do CP.

begin;

do $review$
declare
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_cp_source_id uuid;
  v_edition_id uuid;
  v_topic_id uuid;
  cp_url text := 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Código Penal — Decreto-Lei nº 2.848/1940. Parte Geral: arts. 1º a 28; arts. 100 a 105. Parte Especial: arts. 121 a 180-A; arts. 213 a 218-C.';
  explanation_text text := $explanation$A alternativa A descreve o crime do art. 218-C do Código Penal: oferecer, trocar, disponibilizar, transmitir, vender, distribuir, publicar ou divulgar registro audiovisual que contenha cena de estupro ou estupro de vulnerável, faça apologia ou induza a prática, ou contenha, sem consentimento da vítima, cena de sexo, nudez ou pornografia. A divulgação íntima para vingança ou humilhação também pode atrair o aumento de pena do § 1º.

A) Correta. É a rubrica legal do art. 218-C e corresponde ao núcleo da conduta enunciada.
B) Incorreta. O registro não autorizado da intimidade sexual está no art. 216-B e trata de produzir, fotografar, filmar ou registrar a intimidade sem autorização; o enunciado trata da divulgação.
C) Incorreta. Estupro de vulnerável é tipo distinto, previsto no art. 217-A.
D) Incorreta. Mediação para servir à lascívia de outrem corresponde ao art. 227.
E) Incorreta. Violação sexual mediante fraude está no art. 215.

A Lei nº 15.280/2025 alterou a pena prevista no caput do art. 218-C, mas não substituiu a descrição da conduta cobrada nesta questão. A Lei nº 13.718/2018 introduziu o tipo e seu § 1º; o caput vigente no texto compilado do Planalto mantém os verbos e as hipóteses citados no enunciado.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa A é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  audit_evidence jsonb;
begin
  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('edital','Edital nº 200/CCP/2025 — Processo Seletivo Simplificado para Militares Temporários','Polícia Militar do Estado de Santa Catarina / IDECAN',syllabus_url,null,now(),'vigente',true,
    'Fonte oficial da página do concurso IDECAN ID 207. Anexo II, p. 52, inclui Código Penal, arts. 213 a 218-C. PDF SHA-256 0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3.')
  on conflict (url) do nothing;

  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('lei','Código Penal — Decreto-Lei nº 2.848/1940, texto compilado — art. 218-C','Presidência da República — Planalto',cp_url,'1940-12-07',now(),'vigente',true,
    'Conferência em 2026-10-23. O caput do art. 218-C conserva a descrição da conduta cobrada; a pena foi alterada pela Lei nº 15.280/2025. SHA-256 do HTML consultado: b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2.')
  on conflict (url) do update set
    title=excluded.title, issuer=excluded.issuer, checked_at=excluded.checked_at,
    status=excluded.status, is_official=excluded.is_official, notes=excluded.notes;

  select id into v_cp_source_id from public.content_sources where url=cp_url;
  if not found or not exists (select 1 from public.content_sources where id=v_cp_source_id and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do Código Penal ausente ou divergente';
  end if;

  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026
    and status='active';
  if not found then raise exception 'Edição PMSC ativa ausente; aplique primeiro o lote de vínculo ao edital'; end if;
  if not exists (
    select 1 from public.syllabus_editions e
    join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and e.exam_board='IDECAN'
      and s.url=syllabus_url and s.is_official and s.status='vigente'
  ) then raise exception 'A edição PMSC não está vinculada ao edital oficial conferido'; end if;

  insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
  values (v_edition_id,'Conhecimentos Específicos','Legislação Penal',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico de Legislação Penal da edição PMSC diverge do edital';
  end if;

  select * into question from public.board_exam_questions
  where id='e96037e7-0551-41a3-8fd9-91fc6781df08'::uuid for update;
  if not found then raise exception 'Questão PMSC 31 ausente'; end if;
  before_row := to_jsonb(question);

  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item31-art218c-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 31 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>31
      or question.official_answer<>'A'
      or question.content_status<>'under_review'
      or question.stem<>'Revenge porn ou pornografia de vingança é a expressão usada para denominar o ato de expor, na internet, fotos ou vídeos íntimos de terceiros, sem o consentimento dos envolvidos. Casos do tipo costumam acontecer, na maioria das vezes, quando um casal termina o relacionamento e uma das partes divulga as cenas íntimas na rede mundial de computadores, com o objetivo de vingar-se, ao submeter o ex-parceiro a humilhação pública. Penalmente (Código Penal – Decreto-Lei Federal nº 2.848/40), a conduta contra a dignidade sexual que tipifica “oferecer, trocar, disponibilizar, transmitir, vender ou expor à venda, distribuir, publicar ou divulgar, por qualquer meio – inclusive por meio de comunicação de massa ou sistema de informática ou telemática –, fotografia, vídeo ou outro registro audiovisual que contenha cena de estupro ou de estupro de vulnerável ou que faça apologia ou induza a sua prática, ou, sem o consentimento da vítima, cena de sexo, nudez ou pornografia” consiste no crime de:'
      or question.options<>'{"A":"Divulgação de cena de estupro ou de cena de estupro de vulnerável, de cena de sexo ou de pornografia.","B":"Registro não autorizado da intimidade sexual.","C":"Estupro de vulnerável.","D":"Mediação para servir a lascívia de outrem.","E":"Violação sexual mediante fraude."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 31, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal, art. 218-C — texto compilado vigente conferido; pena alterada pela Lei 15.280/2025','url',cp_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Divulgação não consentida de cena de estupro, nudez ou pornografia — Código Penal, art. 218-C.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN A conferido. Caput do art. 218-C conferido no Código Penal compilado pelo Planalto; anotada a alteração da pena pela Lei 15.280/2025, sem mudança da descrição cobrada. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui arts. 213 a 218-C. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_law_url',cp_url,
      'law_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'law_checked_at','2026-10-23',
      'article','218-C, caput e § 1º',
      'amendment','Lei nº 15.280/2025 alterou a pena do caput; descrição da conduta cobrada permanece no texto vigente',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','A',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item31-art218c-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item31-art218c-v1';
