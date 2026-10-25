-- Vincula os itens PMSC 20–22 a tópicos expressos do edital oficial PF 2025.
-- O lote só roda após pmsc-informatica-correcao.sql e não afirma previsão PC-AC.
-- Fonte oficial: Edital nº 1 – PF – Policial, atualizado até Retificação nº 4.

begin;

do $review$
declare
  item integer;
  qid uuid;
  q public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_fix public.idecan_pedagogical_review_audit;
  prior_link public.idecan_pedagogical_review_audit;
  topic uuid;
  syllabus_source text := 'https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf';
  edition uuid := 'a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff';
  batch text := 'idecan-pmsc-ti-syllabus-fit-v1';
  tested text;
  expected_answer text;
  source_excerpt text;
begin
  for item in 20..22 loop
    select id into qid
    from public.board_exam_questions
    where id = case item
      when 20 then '194bc2b3-22c2-4af4-8dd7-63992c1e8b71'::uuid
      when 21 then '1f3faaa3-ab7b-49aa-9183-8e6a5e32e72e'::uuid
      else '96007045-d3fb-45c9-acf0-68eae8af1c76'::uuid end
    for update;
    if not found then raise exception 'Questão % ausente; lote cancelado', item; end if;

    select * into q from public.board_exam_questions where id = qid;
    before_row := to_jsonb(q);
    select * into prior_fix from public.idecan_pedagogical_review_audit
    where batch_key = 'idecan-pmsc-ti-transcription-v1' and question_id = qid;
    if not found or before_row is distinct from prior_fix.after_data then
      raise exception 'Correção de transcrição ausente ou alterada para item %', item;
    end if;

    select * into prior_link from public.idecan_pedagogical_review_audit
    where batch_key = batch and question_id = qid;
    if found then
      if before_row is distinct from prior_link.after_data then
        raise exception 'Item % foi revisado depois deste lote; alterações posteriores preservadas', item;
      end if;
      continue;
    end if;

    if item = 20 then
      topic := '705afab1-ae16-46b8-8717-44d21d732faf';
      expected_answer := 'E';
      tested := 'Noções de sistema operacional: ambiente Linux e Windows (itens 2.2 e 17.1 do edital).';
      source_excerpt := '2.2 Noções de sistema operacional (ambiente Linux e Windows); 17.1 Noções de sistema operacional (ambiente Linux e Windows).';
    elsif item = 21 then
      topic := '705afab1-ae16-46b8-8717-44d21d732faf';
      expected_answer := 'D';
      tested := 'Edição de planilhas nos ambientes Microsoft Office e LibreOffice (item 2.4 do edital).';
      source_excerpt := '2.4 Edição de textos, planilhas e apresentações (ambientes Microsoft Office e LibreOffice).';
    else
      topic := 'bef7a8b5-d550-4309-9e95-a911ea8f1906';
      expected_answer := 'B';
      tested := 'Noções de vírus, worms e pragas virtuais; ferramentas anti-spyware (itens 4.1 e 4.2 do edital).';
      source_excerpt := '4.1 Noções de vírus, worms e pragas virtuais. 4.2 Aplicativos para segurança (antivírus, firewall, anti-spyware etc.).';
    end if;

    if q.board <> 'IDECAN'
      or q.contest_name <> 'PMSC - Aluno-Soldado Temporário 2026'
      or q.exam_type <> 'Tipo A'
      or q.item_number <> item
      or q.official_answer <> expected_answer
      or q.content_status <> 'under_review'
      or q.legal_review_required
      or q.needs_visual
      or q.explanation is null
      or q.explanation not ilike '%Exemplo:%'
      or q.syllabus_topic_id is not null
    then raise exception 'Estado, identidade ou gabarito diverge para item %', item; end if;

    perform 1
    from public.syllabus_topics t
    join public.syllabus_editions e on e.id = t.edition_id
    join public.content_sources s on s.id = e.source_id
    where t.id = topic
      and t.edition_id = edition
      and t.discipline = 'Informática'
      and t.content_status = 'current'
      and e.contest_name = 'Polícia Federal'
      and e.role_name = 'Agente de Polícia Federal'
      and e.contest_year = 2025
      and e.status = 'active'
      and s.url = syllabus_source
      and s.is_official
      and s.status = 'vigente'
    for share of t, e, s;
    if not found then raise exception 'Edital/tópico oficial não confere para item %', item; end if;

    update public.board_exam_questions set
      syllabus_topic_id = topic,
      tested_topic = tested,
      content_status = 'active',
      verified_at = now(),
      review_note = concat_ws('; ', review_note,
        'Vínculo confirmado com edital oficial PF Agente 2025, Retificação 4; fonte e tópico registrados. Elegível para estudo PF nesse conteúdo; não constitui previsão PC-AC.')
    where id = qid returning to_jsonb(board_exam_questions) into after_row;

    insert into public.idecan_pedagogical_review_audit
      (batch_key, question_id, before_data, after_data, evidence, reviewer_id)
    values (batch, qid, before_row, after_row,
      jsonb_build_object(
        'syllabus_url', syllabus_source,
        'syllabus_edition_id', edition,
        'syllabus_topic_id', topic,
        'syllabus_excerpt', source_excerpt,
        'tested_topic', tested,
        'pmsc_booklet_sha256', 'e60c319a40fb68f495555e7fad113bda8c9b109275000b0bd5c450fbd9ff24ec',
        'idecan_definitive_key_sha256', 'f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
        'historical_answer_preserved', true,
        'pc_ac_forecast', false
      ), auth.uid());
  end loop;
end
$review$;

commit;

select q.item_number, q.content_status, q.official_answer,
       q.tested_topic, q.syllabus_topic_id, t.topic_text, a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id = q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id = q.id
where a.batch_key = 'idecan-pmsc-ti-syllabus-fit-v1'
order by q.item_number;
