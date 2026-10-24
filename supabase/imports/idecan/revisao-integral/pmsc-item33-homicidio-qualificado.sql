-- Revisão individual do item 33 PMSC, Tipo A.
-- Usa o Código Penal compilado vigente; preserva o gabarito definitivo B.

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
  explanation_text text := $explanation$A alternativa B é a única que reúne hipóteses qualificadoras do art. 121, § 2º, do Código Penal: traição, emboscada ou recurso que dificulte a defesa (inciso IV); emprego de arma de fogo de uso restrito ou proibido (inciso VIII); paga, promessa de recompensa ou motivo torpe (inciso I).

A) Incorreta como conjunto. Veneno, fogo, explosivo, asfixia, tortura e meio cruel correspondem ao inciso III. As referências a deficiência/vulnerabilidade e a milícia não são, sem os requisitos legais específicos, qualificadoras gerais do § 2º; a lei atual trata de causas específicas de aumento e também de hipótese autônoma no § 2º-D.
B) Correta. Os três grupos correspondem a incisos expressos do § 2º (IV, VIII e I).
C) Incorreta. Motivo fútil e finalidade de assegurar outro crime são qualificadoras (incisos II e V), mas a violenta emoção logo após provocação injusta é causa de diminuição do § 1º, não qualificadora.
D) Incorreta como conjunto. Homicídio nas dependências de instituição de ensino é qualificadora (inciso X), mas a inobservância de regra técnica se relaciona ao homicídio culposo e as relações de autoridade descritas geram aumento de pena apenas nas hipóteses legais específicas, não são qualificadoras gerais do § 2º.
E) Incorreta como conjunto. A qualificadora etária é contra menor de 14 anos (inciso IX), não qualquer menor de idade. O inciso VII protege agentes e membros de instituições ali indicadas quando presentes as condições funcionais ou o nexo descrito na lei.

Atualização normativa: o texto compilado vigente contém hipóteses adicionadas após a prova, inclusive homicídio nas dependências de instituição de ensino e regra específica no § 2º-D. Essas alterações não retiram a correspondência literal dos três elementos da alternativa B aos incisos IV, VIII e I. A faixa de 12 a 30 anos corresponde às qualificadoras do § 2º; o § 2º-D tem tratamento penal próprio.$explanation$;
  old_explanation text := 'Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.';
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
    where e.id=v_edition_id
      and s.url=syllabus_url and s.is_official and s.status='vigente'
  ) then raise exception 'A edição PMSC não está vinculada ao edital oficial conferido'; end if;

  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal'
    and st.topic_order=1 and st.topic_text=syllabus_text and st.content_status='current';
  if not found then raise exception 'Tópico de Legislação Penal do edital PMSC não foi conferido'; end if;
  if not exists (select 1 from public.content_sources where url=cp_url and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do Código Penal ausente ou divergente';
  end if;

  select * into question from public.board_exam_questions
  where id='edbc9ab4-9ced-418a-a0d9-cbf53006ce74'::uuid for update;
  if not found then raise exception 'Questão PMSC 33 ausente'; end if;
  before_row := to_jsonb(question);

  select * into prior_audit from public.idecan_pedagogical_review_audit
  where batch_key='idecan-pmsc-item33-homicidio-v1' and question_id=question.id;
  if found then
    if before_row is distinct from prior_audit.after_data then
      raise exception 'Questão 33 alterada após este lote; revisão posterior preservada';
    end if;
  else
    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>33
      or question.official_answer<>'B'
      or question.content_status<>'under_review'
      or question.stem<>'Homicídio qualificado é a morte intencional (dolosa) de alguém cometida sob circunstâncias que aumentam a gravidade do crime, resultando em pena mais severa (12 a 30 anos de reclusão no Brasil) do que o homicídio simples, por refletir maior reprovação social e perversidade, incluindo casos específicos contra autoridades e em locais que receberam proteção especial do legislador, de modo que, segundo o Código Penal (Decreto-Lei Federal nº 2.848/40), configuram homicídio qualificado as hipóteses reunidas apenas em:'
      or question.options<>'{"A":"com emprego de veneno, fogo, explosivo, asfixia, tortura ou outro meio insidioso ou cruel, ou de que possa resultar perigo comum; contra pessoa com deficiência ou com doença que acarrete condição limitante ou de vulnerabilidade física ou mental; praticado por milícia privada; dentre outros enumerados no art. 121, §2º do Código Penal.","B":"à traição, de emboscada, ou mediante dissimulação ou outro recurso que dificulte ou torne impossível a defesa do ofendido; com emprego de arma de fogo de uso restrito ou proibido; mediante paga ou promessa de recompensa, ou por outro motivo torpe; dentre outros enumerados no art. 121, §2º do Código Penal.","C":"por motivo fútil; para assegurar a execução, a ocultação, a impunidade ou vantagem de outro crime; sob o domínio de violenta emoção, logo em seguida a injusta provocação da vítima; dentre outros enumerados no art. 121, §2º do Código Penal.","D":"nas dependências de instituição de ensino; com inobservância de regra técnica de profissão, arte ou ofício; por autor que seja ascendente, padrasto ou madrasta, tio, irmão, cônjuge, companheiro, tutor, curador, preceptor ou empregador da vítima ou por qualquer outro título tem autoridade sobre ela ou, ainda, se é professor ou funcionário da instituição de ensino; dentre outros enumerados no art. 121, §2º do Código Penal.","E":"contra menor de idade; membro do Poder Judiciário, do Ministério Público, da Defensoria Pública ou da Advocacia Pública, de que tratam os arts. 131 e 132 da Constituição Federal, ou oficial de justiça, no exercício da função ou em decorrência dela, ou contra seu cônjuge, companheiro ou parente, inclusive por afinidade, até o terceiro grau, em razão dessa condição; dentre outros enumerados no art. 121, §2º do Código Penal."}'::jsonb
      or question.explanation<>old_explanation
    then raise exception 'Questão 33, gabarito ou texto mudou desde a revisão; nada será publicado'; end if;

    update public.board_exam_questions set
      explanation=explanation_text,
      legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal, art. 121, § 2º — texto compilado vigente conferido','url',cp_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic='Homicídio qualificado: hipóteses do art. 121, § 2º, do Código Penal.',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN B conferido. Alternativa B cotejada com art. 121, § 2º, incisos IV, VIII e I, no Código Penal compilado vigente pelo Planalto; alterações posteriores destacadas na explicação. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui art. 121. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    audit_evidence := jsonb_build_object(
      'official_law_url',cp_url,
      'law_html_sha256','b828b522212b7e242714097f5b0e55ce616162cbdbac52efbbffb4b934ebe2e2',
      'law_text_sha256','794730ca13c2beb58692ebf16332099038769096037fc7dc56f0c854f3334bd0',
      'law_checked_at','2026-10-23',
      'article','121, § 2º, incisos I, IV e VIII; § 1º; incisos IX e X; §§ 2º-B, 2º-C e 2º-D',
      'current_text_note','Conferido no texto compilado oficial; alterações posteriores à prova descritas separadamente na explicação.',
      'official_syllabus_url',syllabus_url,
      'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
      'syllabus_page','Anexo II, p. 52',
      'syllabus_excerpt',syllabus_text,
      'official_answer_key_url',question.answer_key_url,
      'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
      'answer_preserved','B',
      'pc_ac_forecast',false
    );
    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-item33-homicidio-v1',question.id,before_row,after_row,audit_evidence,auth.uid());
  end if;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,q.legal_basis,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-item33-homicidio-v1';
