-- Revisão individual do item 29 PMSC, Tipo A.
-- Fontes oficiais: Edital 200/CCP/2025, Anexo II, pp. 51–52; Lei 14.751/2023, art. 2º.
-- Compara o registro, registra fontes e tópico PMSC próprio e audita antes/depois.

begin;

do $review$
declare
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  existing_audit public.idecan_pedagogical_review_audit;
  v_syllabus_source_id uuid;
  v_law_source_id uuid;
  v_edition_id uuid;
  v_topic_id uuid;
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  law_url text := 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14751.htm';
  syllabus_text text := 'Lei nº 14.751, de 12 de dezembro de 2023 — Lei Orgânica Nacional das Polícias Militares e dos Corpos de Bombeiros Militares dos Estados e suas atualizações.';
  explanation_text text := $explanation$O art. 2º da Lei 14.751/2023 define as Polícias Militares e os Corpos de Bombeiros Militares como instituições militares permanentes, exclusivas e típicas de Estado. Isso corresponde à alternativa E e ao gabarito definitivo. A mesma frase diz que são essenciais à Justiça Militar e, em outra relação, forças auxiliares e reserva do Exército.

Análise das alternativas:
A) Incorreta. A lei fala em instituições permanentes e forças auxiliares/reserva do Exército, mas não em “indispensáveis à igualdade entre os Estados”; o art. 2º usa “indispensáveis à preservação da ordem pública”.
B) Incorreta. “Essenciais à Justiça Militar” não significa “auxiliares da Justiça Militar”. A lei chama as instituições de forças auxiliares e reserva do Exército.
C) Incorreta. O dispositivo não as define como essenciais ao Poder Judiciário nem como exclusivas de Governo.
D) Incorreta. A lei menciona preservação da ordem pública, segurança pública e incolumidade; “soberania nacional” não compõe a fórmula cobrada nessa alternativa.
E) Correta. Reproduz as três características expressas no caput do art. 2º.

Exemplo prático: ao resolver um item baseado no art. 2º, compare as expressões exatas da alternativa com a tríade legal “permanentes, exclusivas e típicas de Estado”. Não misture essa tríade com a referência separada a forças auxiliares e reserva do Exército.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  evidence jsonb;
begin
  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('edital','Edital nº 200/CCP/2025 — Processo Seletivo Simplificado para Militares Temporários','Polícia Militar do Estado de Santa Catarina / IDECAN',syllabus_url,null,now(),'vigente',true,
    'Fonte oficial da página do concurso IDECAN ID 207. Anexo II, pp. 51–52, inclui Lei 14.751/2023 em Legislação Institucional. PDF SHA-256 0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3.')
  on conflict (url) do nothing;
  select id into v_syllabus_source_id from public.content_sources where url=syllabus_url;
  if not found then raise exception 'Edital PMSC oficial ausente'; end if;
  if not exists (select 1 from public.content_sources where id=v_syllabus_source_id and is_official and status='vigente') then
    raise exception 'Metadados da fonte oficial do edital divergem';
  end if;

  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('lei','Lei nº 14.751/2023 — art. 2º conferido','Presidência da República — Planalto',law_url,'2023-12-12',now(),'vigente',true,
    'Conferência limitada ao art. 2º para o item 29; não certifica outros dispositivos. Texto oficial consultado em 2026-10-23; documento SHA-256 f9ae07dfc89b90e3d1369d8263b7815aa5c32f47c943887a4424f640646d4ceb.')
  on conflict (url) do nothing;
  select id into v_law_source_id from public.content_sources where url=law_url;
  if not found then raise exception 'Lei oficial do Planalto ausente'; end if;
  if not exists (select 1 from public.content_sources where id=v_law_source_id and is_official and status='vigente') then
    raise exception 'Metadados da fonte da lei divergem';
  end if;

  insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
  values ('PMSC - Aluno-Soldado Temporário 2026','Aluno-Soldado Temporário (QPTPM)',2026,'IDECAN',v_syllabus_source_id,'active')
  on conflict (contest_name,role_name,contest_year) do nothing;
  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026;
  if not found or not exists (select 1 from public.syllabus_editions where id=v_edition_id and source_id=v_syllabus_source_id and status='active') then
    raise exception 'Edição do edital PMSC inexistente ou divergente';
  end if;

  insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
  values (v_edition_id,'Conhecimentos Específicos','Legislação Institucional',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Institucional' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico PMSC de Legislação Institucional diverge do edital';
  end if;

  select * into question from public.board_exam_questions
  where id='441523b1-ea7e-40d4-8b3b-a1f427bc666f'::uuid for update;
  if not found then raise exception 'Questão PMSC 29 ausente'; end if;
  before_row := to_jsonb(question);

  select * into existing_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item29-lonpm-v1' and question_id=question.id;
  if found then
    if before_row is distinct from existing_audit.after_data then
      raise exception 'Questão 29 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>29
      or question.official_answer<>'E'
      or question.content_status<>'under_review'
      or question.stem<>'De acordo com a Lei Orgânica Nacional das Polícias Militares e dos Corpos de Bombeiros Militares dos Estados (Lei nº 14.751/2023), as polícias militares dos Estados, do Distrito Federal e dos Territórios são instituições militares:'
      or question.options<>'{"A":"permanentes, auxiliares e indispensáveis à igualdade entre os Estados.","B":"auxiliares da Justiça Militar e essenciais à independência dos Poderes Legislativo, Executivo e Judiciário.","C":"essenciais ao Poder Judiciário e exclusivas de Governo.","D":"permanentes e exclusivas na proteção da segurança pública e da soberania nacional.","E":"exclusivas, permanentes e típicas de Estado."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 29, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 14.751/2023, art. 2º — texto vigente conferido','url',law_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic=syllabus_text,
      content_status='active',
      verified_at=now(),
      review_note='Gabarito oficial definitivo E conferido; texto vigente do art. 2º da Lei 14.751/2023 conferido no Planalto; vínculo ao Anexo II do Edital PMSC nº 200/CCP/2025 confirmado. Compatibilidade com esta prova histórica, sem inferência sobre PC-AC.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    evidence := jsonb_build_object(
      'official_syllabus_url',syllabus_url,
      'official_syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'official_syllabus_pages','51-52',
      'syllabus_excerpt',syllabus_text,
      'official_law_url',law_url,
      'law_sha256','f9ae07dfc89b90e3d1369d8263b7815aa5c32f47c943887a4424f640646d4ceb',
      'law_article','2º',
      'law_excerpt','instituições militares permanentes, exclusivas e típicas de Estado',
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','E',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item29-lonpm-v1',question.id,before_row,after_row,evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item29-lonpm-v1';
