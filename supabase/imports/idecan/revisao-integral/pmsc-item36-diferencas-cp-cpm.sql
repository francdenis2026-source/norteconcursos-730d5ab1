-- Revisão individual do item 36 PMSC, Tipo A.
-- Compara CP e CPM vigentes e registra o tópico expresso do edital da PMSC.

begin;

do $review$
declare
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_cpm_source_id uuid;
  v_edition_id uuid;
  v_topic_id uuid;
  cpm_url text := 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del1001.htm';
  cp_url text := 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Código Penal Militar — Decreto-Lei nº 1.001/1969. Parte Geral: arts. 1º a 9º; arts. 29 a 47. Parte Especial: arts. 149 a 204; arts. 298 a 339.';
  explanation_text text := $explanation$A alternativa C reúne dois pontos em que os códigos apresentam tratamento diferente.

Estado de necessidade: no CP comum (art. 24), a justificante exige perigo atual e que o sacrifício do direito, nas circunstâncias, não fosse razoável exigir. O CPM separa a matéria: o art. 39 trata de estado de necessidade como excludente de culpabilidade, com requisitos próprios; o art. 43 trata da exclusão do crime e exige que o mal causado seja consideravelmente inferior ao mal evitado e que o agente não fosse legalmente obrigado a enfrentar o perigo.

Tentativa: o CP (art. 14, parágrafo único) prevê, em regra, diminuição de 1 a 2/3, salvo disposição em contrário. O CPM (art. 30, parágrafo único) também prevê diminuição de 1 a 2/3, mas expressamente permite, em caso de excepcional gravidade, aplicar a pena do crime consumado. Essa possibilidade expressa é a diferença cobrada.

A) Incorreta. Nexo causal (CP, art. 13; CPM, art. 29) e consumação (CP, art. 14, I; CPM, art. 30, I) têm formulações substancialmente correspondentes.
B) Incorreta como par. Estrito cumprimento do dever legal é excludente em ambos os códigos (CP, art. 23, III; CPM, art. 42, III), embora a coação tenha regras específicas distintas no CPM.
C) Correta. Estado de necessidade e consequência penal da tentativa apresentam as distinções expostas.
D) Incorreta. Exercício regular de direito e desistência voluntária aparecem nos dois códigos como institutos correspondentes (CP, arts. 23, III e 15; CPM, arts. 42, IV e 31).
E) Incorreta. Desistência voluntária e legítima defesa são previstas nos dois códigos com estruturas correspondentes (CP, arts. 15 e 25; CPM, arts. 31 e 44).

Conferi o texto compilado do CPM após a Lei nº 14.688/2023 e o texto compilado vigente do CP. A resposta histórica definitiva IDECAN permanece C.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa C é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  audit_evidence jsonb;
begin
  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('lei','Código Penal Militar — Decreto-Lei nº 1.001/1969, texto compilado','Presidência da República — Planalto',cpm_url,'1969-10-21',now(),'vigente',true,
    'Conferido em 2026-10-23 após a Lei nº 14.688/2023. Para o item 36, arts. 29–47. HTML SHA-256 06b0bdfa1071e5cd919f8668f427aaf1259ca030eca6776d8cf52593eb900ef6.')
  on conflict (url) do update set
    title=excluded.title, issuer=excluded.issuer, checked_at=excluded.checked_at,
    status=excluded.status, is_official=excluded.is_official, notes=excluded.notes;
  select id into v_cpm_source_id from public.content_sources where url=cpm_url;
  if not found or not exists (select 1 from public.content_sources where id=v_cpm_source_id and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do CPM ausente ou divergente';
  end if;
  if not exists (select 1 from public.content_sources where url=cp_url and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do Código Penal ausente ou divergente';
  end if;

  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026
    and exam_board='IDECAN' and status='active';
  if not found then raise exception 'Edição ativa PMSC ausente'; end if;
  if not exists (
    select 1 from public.syllabus_editions e join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and s.url=syllabus_url and s.is_official and s.status='vigente'
  ) then raise exception 'A edição PMSC não está vinculada ao edital oficial conferido'; end if;

  insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
  values (v_edition_id,'Conhecimentos Específicos','Legislação Penal Militar',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal Militar' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico de Legislação Penal Militar diverge do edital PMSC';
  end if;

  select * into question from public.board_exam_questions
  where id='0850f6c9-6c12-4837-a710-1fac9812c85b'::uuid for update;
  if not found then raise exception 'Questão PMSC 36 ausente'; end if;
  before_row := to_jsonb(question);
  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item36-cp-cpm-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 36 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>36
      or question.official_answer<>'C'
      or question.content_status<>'under_review'
      or question.stem<>'Atualmente, dada a reforma recente do CPM, sancionada em 20 de setembro de 2023 (Lei Federal nº 14.688), o Código Penal Militar (Decreto-Lei Federal nº 1.001/69) está estruturado de forma muito similar ao Código Penal (Decreto-Lei Federal nº 2.848/40). Contudo, quando estudamos especificamente o Título II – Do Crime, vemos que ainda permaneceram diferenças que ajudam a destacar as particularidades do crime militar. Assim, assinale o único item que reúne corretamente alguns dos conceitos que permaneceram diferentes, quando comparamos o CPM com o CP.'
      or question.options<>'{"A":"Nexo Causal e Crime Consumado.","B":"Estrito Cumprimento do Dever Legal e Coação Irresistível.","C":"Estado de Necessidade e Pena do Crime Tentado.","D":"Exercício Regular de Direito e Desistência Voluntária.","E":"Desistência Voluntária e Legítima Defesa."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 36, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(
        jsonb_build_object('title','Código Penal Militar, arts. 30, 39 e 43 — texto compilado vigente após Lei 14.688/2023','url',cpm_url),
        jsonb_build_object('title','Código Penal, arts. 14 e 24 — texto compilado vigente','url',cp_url)
      ),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Comparação entre estado de necessidade e pena da tentativa no CP e no CPM.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN C conferido. CP arts. 14 e 24 comparados com CPM arts. 30, 39 e 43 nos textos compilados oficiais; CPM conferido após Lei 14.688/2023. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui CPM arts. 29 a 47. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_cpm_url',cpm_url,
      'cpm_html_sha256','06b0bdfa1071e5cd919f8668f427aaf1259ca030eca6776d8cf52593eb900ef6',
      'cpm_text_sha256','2b5c5352f70b9bb24d14c2b1882dd8710d9cd092b6db595b4ee563d19e596923',
      'official_cp_url',cp_url,
      'cp_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'laws_checked_at','2026-10-23',
      'comparison_articles','CP arts. 14 and 24; CPM arts. 30, 39 and 43',
      'cpm_reform','Lei nº 14.688/2023 conferida no texto compilado',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','C',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item36-cp-cpm-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item36-cp-cpm-v1';
