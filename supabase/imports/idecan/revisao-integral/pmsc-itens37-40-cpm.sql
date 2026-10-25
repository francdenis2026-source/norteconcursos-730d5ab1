-- Revisão em lote delimitado dos itens PMSC Tipo A 37–40.
-- Fontes oficiais Planalto (CPM compilado após Lei 14.688/2023) e IDECAN (gabarito definitivo).
-- Cada registro é validado e auditado individualmente dentro de uma única transação.

begin;

do $review$
declare
  item_record jsonb;
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
  answer_key_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=M9HQWJK3ETPULWNR0MV39BJ9PDFKY8F9XC2P3T6XRU8IYOJECTQBA9T6I920N7ES9PYT13278U1LBSPB7045.pdf';
  question_batch jsonb := $questions$[{"id":"798fdb80-928d-41a0-9330-14a47c46e088","item":37,"answer":"E","stem":"Com base no que regula e prevê o Código Penal Militar (Decreto-Lei Federal nº 1001/69), especificamente dos conceitos relativos à Aplicação da Lei Penal Militar, podemos assinalar como correto e exclusivo dos crimes militares apenas o que se afirma em:","options":{"A":"Considera-se praticado o crime no momento do resultado, ainda que outro seja outro o da ação ou omissão.","B":"Ficam sujeitos à lei penal militar brasileira, embora cometidos no estrangeiro, contra a vida ou a liberdade do Presidente da República.","C":"A pena cumprida no estrangeiro atenua a pena imposta no Brasil pelo mesmo crime, quando diversas, ou nela é computada, quando idênticas.","D":"A lei excepcional ou temporária, embora decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, aplica-se ao fato praticado durante sua vigência.","E":"Nos crimes omissivos, o fato considera-se praticado no lugar em que deveria realizar-se a ação omitida."},"old_explanation":"Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"E é correta: o CPM, art. 6º, acrescenta regra expressa para o crime omissivo: considera-se praticado onde deveria ocorrer a ação omitida. O CP, art. 6º, adota o lugar da ação/omissão e do resultado, sem essa regra especial para a omissão. A) Incorreta: CP, art. 4º, e CPM, art. 5º, adotam o tempo da ação ou omissão. B) Incorreta: a extraterritorialidade do CPM (art. 7º) é ampla, mas a proteção citada também aparece no CP, art. 7º, I, a; não é exclusiva. C) Incorreta: corresponde ao CPM, art. 8º, e ao CP, art. 8º. D) Incorreta: a ultratividade da lei excepcional ou temporária consta no CPM, art. 4º, e no CP, art. 3º. O gabarito definitivo é E.","tested_topic":"Aplicação da lei penal militar: tempo e lugar do crime, extraterritorialidade e pena cumprida no estrangeiro — CPM, arts. 4º a 8º.","article":"CPM, arts. 4º a 8º; CP, arts. 3º, 4º, 6º, 7º e 8º"},{"id":"90901213-4b28-4d6b-a32d-0b6f5ec9ebc8","item":38,"answer":"B","stem":"Afirma o Código Penal Militar (Decreto-Lei Federal nº 1.001/69) que “deixar o militar de levar ao conhecimento do superior o motim ou a revolta de cuja preparação teve notícia ou, se presenciar o ato criminoso, não usar de todos os meios ao seu alcance para impedi-lo”, configura o crime de:","options":{"A":"Recusa de Obediência.","B":"Omissão de Lealdade Militar.","C":"Conspiração.","D":"Traição.","E":"Incitamento."},"old_explanation":"Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"B é correta. O enunciado reproduz o art. 151 do CPM: deixar de comunicar ao superior a preparação de motim/revolta ou, presenciando o crime, não empregar os meios disponíveis para impedi-lo é omissão de lealdade militar. A) Recusa de obediência é outro tipo, art. 163. C) Conspiração é concertação para praticar motim, art. 152. D) Traição integra outro capítulo e não descreve a conduta. E) Incitamento é estimular desobediência, indisciplina ou crime militar, art. 155. O texto do art. 151 foi conferido na compilação posterior à Lei 14.688/2023.","tested_topic":"Omissão de lealdade militar — CPM, art. 151.","article":"CPM, art. 151"},{"id":"17cda78f-3916-416f-8eb5-b718ea5ce17f","item":39,"answer":"A","stem":"Sabemos que o Código Penal Militar (Decreto-Lei Federal nº 1.001/69) divide os crimes militares em títulos específicos que reúnem os crimes em torno dos bens jurídicos tutelados. A partir desse raciocínio, configuram crimes contra o serviço e o dever militar (arts. 183 a 204, CPM) os enumerados apenas em:","options":{"A":"Omissão de Oficial; Descumprimento de Missão; e Retenção Indevida; dentre outros previstos no CPM.","B":"Evasão de Preso ou Internado; Resistência Mediante Ameaça ou Violência; e Desrespeito a Superior; dentre outros previstos no CPM.","C":"Uso Indevido por Militar de Uniforme, Distintivo ou Insígnia; Rigor Excessivo; e Genocídio; dentre outros previstos no CPM.","D":"Violência contra Inferior Hierárquico; Publicação ou Crítica Indevida; e Deserção Especial; dentre outros previstos no CPM.","E":"Revolta; Organização de Grupo para Prática de Violência; e Despojamento Desprezível; dentre outros previstos no CPM."},"old_explanation":"Explicação preliminar: a alternativa A é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"A é correta. Os três tipos estão no Título III do CPM, “Dos crimes contra o serviço militar e o dever militar”: omissão de oficial (art. 194), descumprimento de missão (art. 196) e retenção indevida (art. 197). B mistura delitos de outros títulos; C reúne tipos de autoridade/disciplina e um crime que não pertence ao título indicado; D mistura crimes de autoridade/disciplina, contra o serviço e deserção; E reúne tipos contra autoridade/disciplina e contra a pessoa, não apenas contra serviço e dever militar. O gabarito definitivo é A.","tested_topic":"Crimes contra o serviço militar e o dever militar — CPM, arts. 183 a 204.","article":"CPM, arts. 183 a 204; em especial 194, 196 e 197"},{"id":"df684e56-45ad-45a1-88b0-81179b776587","item":40,"answer":"D","stem":"O crime militar de “Inobservância de Lei, Regulamento ou Instrução” (art. 324, Decreto-Lei Federal nº 1.001/69) consiste especificamente na conduta de:","options":{"A":"Deixar de responsabilizar subordinado que comete infração no exercício do cargo, ou, quando lhe falte competência, não levar o fato ao conhecimento da autoridade competente.","B":"Deixar, no exercício de função, de incluir, por negligência, qualquer nome em relação ou lista para o efeito de alistamento ou de convocação militar.","C":"Abusar da confiança ou da boa-fé de militar ou de servidor público, em serviço ou em razão deste, apresentando-lhe ou remetendo-lhe, para aprovação, recebimento, anuência ou aposição de visto, relação, nota, empenho de despesa, ordem ou folha de pagamento, comunicação, ofício ou qualquer outro documento que sabe, ou deve saber, serem inexatos ou irregulares, desde que o fato atente contra a administração ou o serviço militar.","D":"Deixar, no exercício de função, de observar lei, regulamento ou instrução, dando causa direta à prática de ato prejudicial à administração militar.","E":"Retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra expressa disposição de lei, para satisfazer interesse ou sentimento pessoal."},"old_explanation":"Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"D é correta. O art. 324 do CPM descreve deixar, no exercício da função, de observar lei, regulamento ou instrução, causando diretamente ato prejudicial à administração militar. A) É condescendência criminosa (art. 322). B) É não inclusão de nome em lista (art. 323). C) É abuso de confiança ou boa-fé (art. 332). E) É prevaricação (art. 319). O texto atual do art. 324, inclusive a redação dada pela Lei 14.688/2023, foi conferido no Planalto.","tested_topic":"Inobservância de lei, regulamento ou instrução — CPM, art. 324.","article":"CPM, art. 324; alternativas: arts. 319, 322, 323 e 332"}]$questions$::jsonb;
begin
  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('lei','Código Penal Militar — Decreto-Lei nº 1.001/1969, texto compilado','Presidência da República — Planalto',cpm_url,'1969-10-21',now(),'vigente',true,
    'Conferido em 2026-10-23 após Lei 14.688/2023. Itens PMSC 37–40. HTML SHA-256 06b0bdfa1071e5cd919f8668f427aaf1259ca030eca6776d8cf52593eb900ef6.')
  on conflict (url) do update set title=excluded.title,issuer=excluded.issuer,checked_at=excluded.checked_at,status=excluded.status,is_official=excluded.is_official,notes=excluded.notes;
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
  if not exists (select 1 from public.syllabus_editions e join public.content_sources s on s.id=e.source_id
    where e.id=v_edition_id and s.url=syllabus_url and s.is_official and s.status='vigente') then
    raise exception 'A edição PMSC não está vinculada ao edital oficial conferido';
  end if;
  insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
  values (v_edition_id,'Conhecimentos Específicos','Legislação Penal Militar',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Legislação Penal Militar' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico de Legislação Penal Militar diverge do edital PMSC';
  end if;

  for item_record in select value from jsonb_array_elements(question_batch) loop
    select * into question from public.board_exam_questions where id=(item_record->>'id')::uuid for update;
    if not found then raise exception 'Questão PMSC % ausente',item_record->>'item'; end if;
    before_row := to_jsonb(question);
    select * into prior_audit from public.idecan_pedagogical_review_audit
    where batch_key='idecan-pmsc-items37-40-cpm-v1' and question_id=question.id;
    if found then
      if before_row is distinct from prior_audit.after_data then
        raise exception 'Questão % alterada após este lote; revisão posterior preservada',item_record->>'item';
      end if;
      continue;
    end if;

    if question.board<>'IDECAN'
      or question.contest_name<>'PMSC - Aluno-Soldado Temporário 2026'
      or question.exam_type<>'Tipo A'
      or question.item_number<>(item_record->>'item')::integer
      or question.official_answer<>(item_record->>'answer')
      or question.content_status<>'under_review'
      or question.stem is distinct from (item_record->>'stem')
      or question.options is distinct from (item_record->'options')
      or question.explanation is distinct from (item_record->>'old_explanation')
    then raise exception 'Identidade, texto, opções, gabarito ou estado divergente no item %; lote integral cancelado',item_record->>'item'; end if;

    update public.board_exam_questions set
      explanation=item_record->>'explanation',
      legal_basis=case when (item_record->>'item')::integer=37 then
        jsonb_build_array(
          jsonb_build_object('title','Código Penal Militar, texto compilado vigente após Lei 14.688/2023 — '||(item_record->>'article'),'url',cpm_url),
          jsonb_build_object('title','Código Penal compilado — dispositivos comparados no item 37','url',cp_url)
        )
        else jsonb_build_array(jsonb_build_object('title','Código Penal Militar, texto compilado vigente após Lei 14.688/2023 — '||(item_record->>'article'),'url',cpm_url)) end,
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic=item_record->>'tested_topic',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN conferido; texto vigente do CPM compilado pelo Planalto após Lei 14.688/2023 conferido. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, abrange o dispositivo. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-items37-40-cpm-v1',question.id,before_row,after_row,
      jsonb_build_object(
        'official_cpm_url',cpm_url,
        'official_cp_url',case when (item_record->>'item')::integer=37 then cp_url else null end,
        'cpm_html_sha256','06b0bdfa1071e5cd919f8668f427aaf1259ca030eca6776d8cf52593eb900ef6',
        'cpm_text_sha256','2b5c5352f70b9bb24d14c2b1882dd8710d9cd092b6db595b4ee563d19e596923',
        'law_checked_at','2026-10-23',
        'articles',item_record->>'article',
        'official_syllabus_url',syllabus_url,
        'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
        'syllabus_excerpt',syllabus_text,
        'official_answer_key_url',answer_key_url,
        'official_answer_key_sha256','f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd',
        'answer_preserved',item_record->>'answer',
        'pc_ac_forecast',false
      ),auth.uid());
  end loop;
end
$review$;

commit;

select q.item_number,q.content_status,q.official_answer,q.tested_topic,q.explanation,
       q.syllabus_topic_id,t.topic_text,a.evidence
from public.board_exam_questions q
join public.syllabus_topics t on t.id=q.syllabus_topic_id
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-pmsc-items37-40-cpm-v1'
order by q.item_number;
