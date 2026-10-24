-- Revisão em lote dos itens PMSC Tipo A 44–45, Constituição Federal.
-- Compara caderno/gabarito IDECAN com o texto compilado oficial da Constituição.

begin;

do $review$
declare
  item_record jsonb;
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_edition_id uuid;
  v_topic_id uuid;
  cf_url text := 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Constituição Federal: arts. 5º e 6º; art. 42; arts. 142 e 144.';
  answer_key_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=M9HQWJK3ETPULWNR0MV39BJ9PDFKY8F9XC2P3T6XRU8IYOJECTQBA9T6I920N7ES9PYT13278U1LBSPB7045.pdf';
  question_batch jsonb := $questions$[{"id":"14e26087-a260-4c44-a0da-71686b877083","item":44,"answer":"C","stem":"Com o aumento da tensão geopolítica e a escalada armamentista em nível mundial, eventual situação de grave instabilidade institucional ou de necessidade de defesa do Estado brasileiro passa a exigir o urgente emprego das Forças Armadas, nos termos do art. 142 da Constituição Federal de 1988. Acerca do referido dispositivo constitucional, indique a opção correta.","options":{"A":"As Forças Armadas são compostas pela Marinha, pelo Exército e pelas Polícias Militares dos Estados, organizadas com base na hierarquia e na disciplina.","B":"Lei complementar estabelecerá as normas específicas a serem adotadas na organização, no preparo e no emprego das Forças Armadas em tempo de paz ou de guerra.","C":"Os membros das Forças Armadas são denominados militares, que não podem estar filiados a partidos políticos, enquanto em serviço ativo.","D":"As Forças Armadas constituem instituições nacionais permanentes, organizadas excepcionalmente em situações de crise e destinadas à defesa da Pátria, da lei e da ordem.","E":"O emprego das Forças Armadas para a garantia da lei e da ordem depende de provocação privativa do Presidente da República, sendo vedada a iniciativa dos demais Poderes constitucionais."},"old_explanation":"Explicação preliminar: a alternativa C é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"C é correta: a Constituição, art. 142, § 3º, V, veda filiação partidária ao militar enquanto em serviço ativo. A) A composição é Marinha, Exército e Aeronáutica; polícias militares não integram as Forças Armadas (caput). B) O § 1º fala em normas gerais, não específicas. D) As Forças Armadas são instituições permanentes e regulares, não organizadas excepcionalmente em crises; a missão constitucional tem redação própria no caput. E) A atuação para garantia da lei e da ordem pode decorrer de iniciativa de qualquer dos Poderes constitucionais, conforme lei complementar; não é provocação privativa do Presidente.","tested_topic":"Forças Armadas: composição, organização e restrições constitucionais aos militares — Constituição Federal, art. 142.","article":"Constituição Federal, art. 142, caput e §§ 1º e 3º, V"},{"id":"948cdeca-cf4e-4fac-abbd-8b38e63fc373","item":45,"answer":"E","stem":"Desde 1988, a Constituição Federal (CF) tem pautado a segurança pública como um tema relevante e sensível, não sendo apenas um dever do Estado para com os residentes no país. Trata-se a segurança pública, na verdade, de direito e responsabilidade de todos, incluída toda a sociedade civil, exigindo múltiplos esforços para que seja preservada a ordem pública e a incolumidade das pessoas e do patrimônio. Nesse contexto, pode-se afirmar que a Emenda à Constituição nº 104, em 2019, deu nova redação ao art. 144 da CF para:","options":{"A":"Atribuir competência investigatória penal ampla às polícias penais estaduais.","B":"Ampliar o patrulhamento ostensivo das funções de polícia marítima, aeroportuária e de fronteiras.","C":"Prevenir e reprimir o tráfico ilícito de entorpecentes e drogas afins, o contrabando e o descaminho.","D":"Estabelecer maiores poderes investigativos na apuração de infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União.","E":"Criar as polícias penais federal, estaduais e distrital, vinculadas ao órgão administrador do sistema penal da unidade federativa a que pertencem."},"old_explanation":"Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"E é correta. A EC 104/2019 incluiu no art. 144, § 5º-A, as polícias penais federal, estaduais e distrital, vinculadas ao órgão administrador do sistema penal da respectiva unidade federativa. A) A emenda não concedeu competência investigatória penal ampla. B), C) e D) descrevem atribuições da Polícia Federal previstas no § 1º, não a alteração promovida pela EC 104/2019. A redação vigente do art. 144 foi conferida no texto compilado do Planalto.","tested_topic":"Polícias penais — Constituição Federal, art. 144, § 5º-A, incluído pela EC 104/2019.","article":"Constituição Federal, art. 144, §§ 1º e 5º-A; Emenda Constitucional nº 104/2019"}]$questions$::jsonb;
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

  for item_record in select value from jsonb_array_elements(question_batch) loop
    select * into question from public.board_exam_questions where id=(item_record->>'id')::uuid for update;
    if not found then raise exception 'Questão PMSC % ausente',item_record->>'item'; end if;
    before_row := to_jsonb(question);
    select * into prior_audit from public.idecan_pedagogical_review_audit
    where batch_key='idecan-pmsc-items44-45-cf-v1' and question_id=question.id;
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
      legal_basis=jsonb_build_array(jsonb_build_object('title',(item_record->>'article')||' — texto constitucional compilado vigente','url',cf_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic=item_record->>'tested_topic',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN conferido. Dispositivo constitucional cotejado com texto compilado do Planalto; edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui o artigo. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-items44-45-cf-v1',question.id,before_row,after_row,
      jsonb_build_object(
        'official_constitution_url',cf_url,
        'cf_html_sha256','15d2ade2e9733e1bc122c439b8be0701668333a3f932ed5cec82c24b07a37389',
        'cf_text_sha256','7843af35ad7fd0a06f6b2cd4bec49cab499ff6de761dc620ac78212893d77079',
        'law_checked_at','2026-10-23',
        'article',item_record->>'article',
        'official_syllabus_url',syllabus_url,
        'syllabus_sha256','0935db2f3b15580627b4992be651ffbbbfd8dadf988aecc9670480b31a9060e3',
        'syllabus_page','Anexo II, p. 52',
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
where a.batch_key='idecan-pmsc-items44-45-cf-v1'
order by q.item_number;
