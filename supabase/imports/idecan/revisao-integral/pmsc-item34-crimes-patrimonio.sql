-- Revisão individual do item 34 PMSC, Tipo A.
-- Confere a posição dos tipos no Código Penal compilado e no edital específico.

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
  explanation_text text := $explanation$A alternativa C reúne apenas crimes do Título II do Código Penal, “Dos crimes contra o patrimônio”: apropriação indébita previdenciária (art. 168-A), esbulho possessório (art. 161, § 1º, II) e abuso de incapazes (art. 173).

A) Incorreta. Receptação de animal (art. 180-A) e supressão/alteração de marca em animais (art. 162) são patrimoniais, mas caça em período proibido é infração ambiental prevista na Lei nº 9.605/1998, não crime do Código Penal.
B) Incorreta. Emissão irregular de conhecimento de depósito ou warrant (art. 178) e fraude no comércio (art. 175) estão no Título II; violação de segredo profissional (art. 154) pertence aos crimes contra a inviolabilidade dos segredos.
C) Correta. Os três tipos citados estão no Título II do Código Penal.
D) Incorreta. Pesca com método destrutivo é matéria ambiental; paralisação de trabalho com violência (art. 200) está entre crimes contra a organização do trabalho; divulgação de segredo (art. 153) está entre crimes contra a inviolabilidade dos segredos.
E) Incorreta. Furto de uso não é tipo penal autônomo no Código Penal; violação de direito autoral pertence aos crimes contra a propriedade imaterial; uso indevido de armas, brasões e distintivos públicos (art. 296) está entre crimes contra a fé pública.

O recorte do edital PMSC inclui os arts. 121 a 180-A, que abrange os tipos patrimoniais examinados. A classificação deve ser feita pelo título e pela localização legal de cada tipo, e não apenas pelo nome ou pelo bem jurídico intuitivamente associado.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa C é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
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
  where id='35fa4fa0-e8c4-4479-8db1-66bfec8aa480'::uuid for update;
  if not found then raise exception 'Questão PMSC 34 ausente'; end if;
  before_row := to_jsonb(question);
  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item34-patrimonio-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 34 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>34
      or question.official_answer<>'C'
      or question.content_status<>'under_review'
      or question.stem<>'O Código Penal (Decreto-Lei Federal nº 2.848/40) divide os crimes em títulos específicos que reúnem os crimes em torno dos bens jurídicos tutelados. A partir desse raciocínio, configuram crimes contra o patrimônio (arts. 155 a 183, CP) os enumerados apenas em:'
      or question.options<>'{"A":"Receptação de animal; Caça em período proibido; e Supressão ou alteração de marca em animais; dentre outros previstos no CP.","B":"Emissão irregular de conhecimento de depósito ou “warrant”; Fraude no comércio; Violação do segredo profissional; dentre outros previstos no CP.","C":"Apropriação indébita previdenciária; Esbulho possessório; e Abuso de incapazes; dentre outros previstos no CP.","D":"Pesca com emprego de métodos ou instrumentos capazes de provocar destruição em massa; Paralisação de trabalho, seguida de violência ou perturbação da ordem; Divulgação de segredo; dentre outros previstos no CP.","E":"Furto de uso; Violação de direito autoral; e Uso indevido de armas, brasões e distintivos públicos; dentre outros previstos no CP."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 34, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal — Título II, arts. 155 a 183; texto compilado vigente conferido','url',cp_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Crimes contra o patrimônio — localização sistemática no Código Penal, arts. 155 a 183.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN C conferido. Tipos e títulos cotejados com o Código Penal compilado pelo Planalto; edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui arts. 121 a 180-A. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_law_url',cp_url,
      'law_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'law_text_sha256','794730ca13c2beb58692ebf16332099038769096037fc7dc56f0c854f3334bd0',
      'law_checked_at','2026-10-23',
      'statutory_scope','Código Penal, Título II, arts. 155 a 183, em comparação com os títulos dos tipos distratores',
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
    values ('idecan-pmsc-item34-patrimonio-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item34-patrimonio-v1';
