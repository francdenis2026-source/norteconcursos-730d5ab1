-- Revisão individual do item 35 PMSC, Tipo A.
-- Explicita a condição de incapacidade total exigida pelo art. 28, § 1º, CP.

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
  explanation_text text := $explanation$A alternativa E resume a hipótese do art. 28, § 1º, do Código Penal: embriaguez completa decorrente de caso fortuito ou força maior. Para excluir a culpabilidade, porém, a lei também exige que, no momento da ação ou omissão, o agente fosse inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se conforme esse entendimento. A embriaguez involuntária, isoladamente, não basta.

A) Incorreta. Embriaguez voluntária ou culposa não exclui a imputabilidade (art. 28, II).
B) Incorreta. Emoção e paixão não excluem a imputabilidade (art. 28, I).
C) Incorreta. Relevante valor moral pode ser causa de diminuição no homicídio privilegiado (art. 121, § 1º), não causa geral de inimputabilidade.
D) Incorreta. Perturbação da saúde mental pode fundamentar redução de pena se a capacidade não era plena, conforme art. 26, parágrafo único; não equivale, por si só, à incapacidade total do caput.
E) Correta como síntese da hipótese legal. Para aplicação concreta, deve vir acompanhada da prova de incapacidade total descrita no § 1º. Se a capacidade estiver apenas reduzida, o § 2º prevê redução de pena.

O edital PMSC inclui os arts. 1º a 28 do Código Penal. O gabarito definitivo IDECAN é preservado, e a explicação explicita a condição que a alternativa resumida não escreveu.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
  audit_evidence jsonb;
begin
  select id into v_edition_id from public.syllabus_editions
  where contest_name='PMSC - Aluno-Soldado Temporário 2026'
    and role_name='Aluno-Soldado Temporário (QPTPM)' and contest_year=2026
    and exam_board='IDECAN' and status='active';
  if not found then raise exception 'Edição ativa PMSC ausente'; end if;
  if not exists (
    select 1 from public.syllabus_editions e join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and s.url=syllabus_url and s.is_official and s.status='vigente'
  ) then raise exception 'A edição PMSC não está vinculada ao edital oficial conferido'; end if;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal'
    and st.topic_order=1 and st.topic_text=syllabus_text and st.content_status='current';
  if not found then raise exception 'Tópico de Legislação Penal do edital PMSC não foi conferido'; end if;
  if not exists (select 1 from public.content_sources where url=cp_url and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do Código Penal ausente ou divergente';
  end if;

  select * into question from public.board_exam_questions
  where id='1d4dcc62-77ad-4beb-9985-72e3eefdd03a'::uuid for update;
  if not found then raise exception 'Questão PMSC 35 ausente'; end if;
  before_row := to_jsonb(question);
  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item35-intoxication-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 35 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>35
      or question.official_answer<>'E'
      or question.content_status<>'under_review'
      or question.stem<>'Define o Código Penal (Decreto-Lei Federal nº 2.848/40) as regras para a inimputabilidade penal, dentre as quais podemos destacar corretamente a informada apenas em:'
      or question.options<>'{"A":"a embriaguez, voluntária ou culposa, pelo álcool ou substância de efeitos análogos.","B":"a emoção e a paixão.","C":"o relevante valor moral da conduta.","D":"em virtude de perturbação de saúde mental.","E":"embriaguez completa, proveniente de caso fortuito ou força maior."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 35, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal, arts. 26 e 28, §§ 1º e 2º — texto compilado vigente conferido','url',cp_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Imputabilidade penal: embriaguez acidental completa e incapacidade total — Código Penal, art. 28, §§ 1º e 2º.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN E conferido. Art. 28, §§ 1º e 2º, e art. 26, parágrafo único, cotejados com o Código Penal compilado pelo Planalto. A explicação explicita que embriaguez completa involuntária, sozinha, não basta: a isenção exige incapacidade total no momento do fato. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui arts. 1º a 28. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_law_url',cp_url,
      'law_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'law_text_sha256','794730ca13c2beb58692ebf16332099038769096037fc7dc56f0c854f3334bd0',
      'law_checked_at','2026-10-23',
      'articles','26, parágrafo único; 28, I, II, §§ 1º e 2º',
      'essential_condition','incapacidade total, no momento da ação ou omissão, de compreensão da ilicitude ou autodeterminação',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','E',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item35-intoxication-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item35-intoxication-v1';
