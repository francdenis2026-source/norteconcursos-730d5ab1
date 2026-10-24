-- Revisão individual do item 32 PMSC, Tipo A.
-- O enunciado reproduz o art. 101 do Código Penal; o edital inclui arts. 100 a 105.

begin;

do $review$
declare
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_edition_id uuid;
  v_topic_id uuid;
  cp_url text := 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Código Penal — Decreto-Lei nº 2.848/1940. Parte Geral: arts. 1º a 28; arts. 100 a 105. Parte Especial: arts. 121 a 180-A; arts. 213 a 218-C.';
  explanation_text text := $explanation$A alternativa D corresponde ao art. 101 do Código Penal, cujo título é “A ação penal no crime complexo”. O dispositivo prevê ação pública para o crime complexo quando, em relação a qualquer dos fatos que o compõem, a iniciativa deva ser do Ministério Público.

A) Incorreta. A irretratabilidade da representação é tratada pelo art. 102: a representação torna-se irretratável depois de oferecida a denúncia.
B) Incorreta. A ação de iniciativa privada é promovida por queixa do ofendido ou de quem possa representá-lo, conforme art. 100, § 2º.
C) Incorreta. A ação pública condicionada depende de representação do ofendido ou de requisição do Ministro da Justiça quando a lei exigir (art. 100, § 1º); não é a denominação do art. 101.
D) Correta. É a rubrica legal do art. 101 e corresponde ao enunciado.
E) Incorreta. O perdão do ofendido relaciona-se à ação privada e não nomeia a regra do crime complexo.

Exemplo: se o tipo complexo reúne fatos que isoladamente dependem de iniciativa do Ministério Público, aplica-se a regra específica do art. 101 para a ação pública em relação ao crime complexo.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  audit_evidence jsonb;
begin
  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026
    and exam_board='IDECAN' and status='active';
  if not found then raise exception 'Edição ativa PMSC ausente'; end if;
  if not exists (
    select 1 from public.syllabus_editions e
    join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and s.url=syllabus_url and s.is_official and s.status='vigente'
  ) then raise exception 'A edição PMSC não está vinculada ao edital oficial conferido'; end if;

  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal'
    and st.topic_order=1 and st.topic_text=syllabus_text and st.content_status='current';
  if not found then raise exception 'Tópico de Legislação Penal do edital PMSC não foi conferido'; end if;
  if not exists (select 1 from public.content_sources where url=cp_url and is_official and status='vigente') then
    raise exception 'Fonte oficial do Código Penal ausente ou divergente';
  end if;

  select * into question from public.board_exam_questions
  where id='dbc8e49f-7df2-4e66-8116-159093126076'::uuid for update;
  if not found then raise exception 'Questão PMSC 32 ausente'; end if;
  before_row := to_jsonb(question);

  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item32-crime-complexo-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 32 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>32
      or question.official_answer<>'D'
      or question.content_status<>'under_review'
      or question.stem<>'No Código Penal, chamamos de ação penal o instrumento jurídico usado para provocar o Estado a julgar um crime, buscando a punição do culpado ou absolvição do inocente. Quando a lei considera como elemento ou circunstâncias do tipo legal fatos que, por si mesmos, constituem crimes, cabe ação pública em relação àquele, desde que, em relação a qualquer destes, se deva proceder por iniciativa do Ministério Público. A isso chamamos corretamente de:'
      or question.options<>'{"A":"Ação de irretratabilidade da representação.","B":"Ação de iniciativa privada.","C":"Ação penal condicionada.","D":"Ação penal no crime complexo.","E":"Ação de perdão do ofendido."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 32, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal, art. 101 — texto compilado vigente conferido','url',cp_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Ação penal no crime complexo — Código Penal, art. 101.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN D conferido. Enunciado cotejado com o art. 101 do Código Penal compilado pelo Planalto; edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui arts. 100 a 105. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_law_url',cp_url,
      'law_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'law_text_sha256','794730ca13c2beb58692ebf16332099038769096037fc7dc56f0c854f3334bd0',
      'law_checked_at','2026-10-23',
      'article','101',
      'article_heading','A ação penal no crime complexo',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','D',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item32-crime-complexo-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item32-crime-complexo-v1';
