-- Revisão individual do item 41 PMSC, Tipo A.
-- Confere a exceção constitucional de prestação de socorro, inclusive à noite.

begin;

do $review$
declare
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_edition_id uuid;
  v_topic_id uuid;
  cf_url text := 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Constituição Federal: arts. 5º e 6º; art. 42; arts. 142 e 144.';
  explanation_text text := $explanation$A alternativa D está correta. O art. 5º, XI, da Constituição torna a casa asilo inviolável, mas permite ingresso sem consentimento do morador, a qualquer hora, em caso de flagrante delito, desastre ou para prestar socorro. A regra também admite, durante o dia, entrada por determinação judicial.

O fato de serem 18h não define, por si só, se ainda é dia ou noite; tampouco impede ingresso consentido ou entrada necessária para socorro. A busca do suspeito, por outro lado, não autoriza automaticamente a entrada: sem consentimento, é necessário enquadramento em uma das exceções constitucionais, como flagrante delito, ou mandado judicial cumprido durante o dia.

A) Incorreta. O relógio às 18h não é determinante para o direito de recusa; as exceções do inciso XI independem do horário nos casos de flagrante, desastre ou socorro.
B) Incorreta. Mesmo à noite pode haver ingresso sem consentimento nas hipóteses de flagrante, desastre ou prestação de socorro.
C) Incorreta. Havendo consentimento do morador, a Constituição não proíbe a entrada depois das 18h.
D) Correta. O socorro é exceção expressa e permite entrada a qualquer hora; a recusa não pode impedir socorro efetivamente necessário.
E) Incorreta. Não existe dever constitucional geral de consentir em busca domiciliar sem flagrante ou ordem judicial diurna. A inexistência de consequência penal automática não elimina a inviolabilidade do domicílio.

A resposta distingue a tentativa de localizar o suspeito da hipótese constitucional autônoma de prestar socorro ao morador. O gabarito definitivo IDECAN é D.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  audit_evidence jsonb;
begin
  if not exists (select 1 from public.content_sources where url=cf_url and is_official and status='vigente') then
    raise exception 'Fonte constitucional oficial ausente ou divergente';
  end if;
  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026
    and exam_board='IDECAN' and status='active';
  if not found then raise exception 'Edição ativa PMSC ausente'; end if;
  if not exists (select 1 from public.syllabus_editions e join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and s.url=syllabus_url and s.is_official and s.status='vigente') then
    raise exception 'A edição PMSC não está vinculada ao edital oficial conferido';
  end if;

  insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
  values (v_edition_id,'Conhecimentos Gerais','Constituição Federal de 1988',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Constituição Federal de 1988' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico constitucional da edição PMSC diverge do edital';
  end if;

  select * into question from public.board_exam_questions
  where id='f511027e-aa10-4dda-8736-cf7e0d0a6082'::uuid for update;
  if not found then raise exception 'Questão PMSC 41 ausente'; end if;
  before_row := to_jsonb(question);
  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item41-domicilio-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 41 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>41
      or question.official_answer<>'D'
      or question.content_status<>'under_review'
      or question.stem<>'Às 18h do dia 1º de janeiro do ano corrente, Josefa se recusou a abrir a porta da sua casa a policial militar que estava em busca de um morador de rua que supostamente acabara de furtar dois pedestres na calçada. À luz da Constituição Federal, assinale a alternativa correta.'
      or question.options<>'{"A":"O horário da abordagem policial em questão é determinante para justificar a recusa de Josefa na busca domiciliar.","B":"Caso às 18h já não houvesse mais luz solar, o policial militar não poderia ingressar no domicílio sem o consentimento de Josefa.","C":"Ainda que Josefa consentisse com a entrada do policial militar, este não poderia ingressar no domicílio após as 18h, exceto se em cumprimento de determinação judicial.","D":"A casa é asilo inviolável, porém Josefa, por exemplo, estaria obrigada a permitir o ingresso do policial militar, à noite, para prestar socorro ao morador de rua.","E":"Embora não haja situação de flagrante delito, Josefa deve colaborar com a atividade policial na medida em que a busca domiciliar não irá lhe trazer nenhuma consequência penal ou processual penal."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 41, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XI — texto compilado vigente','url',cf_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Inviolabilidade do domicílio e exceções de ingresso — Constituição Federal, art. 5º, XI.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN D conferido. Art. 5º, XI, da Constituição compilada pelo Planalto; edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui art. 5º. Explicação separa busca do suspeito da exceção autônoma de prestação de socorro. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_constitution_url',cf_url,
      'cf_html_sha256','15d2ade2e9733e1bc122c439b8be0701668333a3f932ed5cec82c24b07a37389',
      'cf_text_sha256','7843af35ad7fd0a06f6b2cd4bec49cab499ff6de761dc620ac78212893d77079',
      'law_checked_at','2026-10-23',
      'article','5º, XI',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url','https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=M9HQWJK3ETPULWNR0MV39BJ9PDFKY8F9XC2P3T6XRU8IYOJECTQBA9T6I920N7ES9PYT13278U1LBSPB7045.pdf',
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','D',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item41-domicilio-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item41-domicilio-v1';
