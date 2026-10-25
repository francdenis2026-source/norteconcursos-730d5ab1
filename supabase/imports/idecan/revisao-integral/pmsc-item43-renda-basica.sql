-- Revisão individual do item 43 PMSC, Tipo A.
-- Confere a redação vigente do art. 6º, parágrafo único, incluído pela EC 114/2021.

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
  explanation_text text := $explanation$A alternativa A reproduz o parágrafo único do art. 6º da Constituição, incluído pela Emenda Constitucional nº 114/2021: todo brasileiro em situação de vulnerabilidade social tem direito a uma renda básica familiar, garantida pelo poder público em programa permanente de transferência de renda, conforme normas e requisitos legais e observadas as regras fiscais e orçamentárias.

B) Incorreta. Descreve o salário mínimo nacional previsto no art. 7º, IV, não a renda básica familiar do art. 6º.
C) Incorreta. A Constituição estabelece salário mínimo nacionalmente unificado; não prevê, nesse dispositivo, piso regional variável.
D) Incorreta. Trata do benefício mensal de assistência social do art. 203, V, sujeito a requisitos próprios, e não da renda básica familiar do art. 6º.
E) Incorreta. O texto constitucional fala em renda básica familiar garantida pelo poder público em programa permanente, não em renda individual com essa redação.

A redação atual consultada no texto compilado mantém o parágrafo incluído pela EC 114/2021. A regulamentação posterior do programa de transferência não altera o texto constitucional cobrado. O gabarito definitivo IDECAN é A.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa A é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
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
  where id='27d92b4d-5214-4720-a113-66e51ae54731'::uuid for update;
  if not found then raise exception 'Questão PMSC 43 ausente'; end if;
  before_row := to_jsonb(question);
  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item43-renda-basica-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 43 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>43
      or question.official_answer<>'A'
      or question.content_status<>'under_review'
      or question.stem<>'No rol dos direitos sociais estabelecidos na Constituição Federal, a Emenda Constitucional nº 114, de 16 de dezembro de 2021, previu que todo brasileiro em situação de vulnerabilidade social terá direito a:'
      or question.options<>'{"A":"uma renda básica familiar, garantida pelo poder público em programa permanente de transferência de renda.","B":"um salário-mínimo, fixado em lei, nacionalmente unificado, capaz de atender a suas necessidades vitais básicas e às de sua família com moradia, alimentação, educação, saúde, lazer, vestuário, higiene, transporte e previdência social, com reajustes periódicos que lhe preservem o poder aquisitivo.","C":"um salário-mínimo, regionalmente variável, capaz de atender a suas necessidades vitais básicas com moradia, alimentação, educação, saúde, lazer, vestuário, higiene, transporte e previdência social.","D":"um salário-mínimo de benefício mensal se comprovar que não possui meios de prover à própria manutenção ou de tê-la provida por sua família.","E":"uma renda básica individual, garantida pelo Estado em política pública de transferência de renda."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 43, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 6º, parágrafo único — redação incluída pela EC 114/2021, vigente','url',cf_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Direito social à renda básica familiar — Constituição Federal, art. 6º, parágrafo único.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN A conferido. Art. 6º, parágrafo único, incluído pela EC 114/2021, cotejado no texto constitucional compilado pelo Planalto. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui art. 6º. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_constitution_url',cf_url,
      'cf_html_sha256','15d2ade2e9733e1bc122c439b8be0701668333a3f932ed5cec82c24b07a37389',
      'cf_text_sha256','7843af35ad7fd0a06f6b2cd4bec49cab499ff6de761dc620ac78212893d77079',
      'law_checked_at','2026-10-23',
      'article','6º, parágrafo único',
      'amendment','Emenda Constitucional nº 114/2021',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url','https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=M9HQWJK3ETPULWNR0MV39BJ9PDFKY8F9XC2P3T6XRU8IYOJECTQBA9T6I920N7ES9PYT13278U1LBSPB7045.pdf',
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','A',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item43-renda-basica-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item43-renda-basica-v1';
