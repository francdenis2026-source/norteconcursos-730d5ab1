-- Revisão transacional dos itens PMSC Tipo A 46–50 (CTB).
-- Conferência com CTB compilado no Planalto e edital PMSC; cada item recebe auditoria própria.

begin;

do $review$
declare
  item_record jsonb;
  question public.board_exam_questions;
  before_row jsonb;
  after_row jsonb;
  prior_audit public.idecan_pedagogical_review_audit;
  v_ctb_source_id uuid;
  v_edition_id uuid;
  v_topic_id uuid;
  ctb_url text := 'https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm';
  syllabus_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=6777151006CAM2Q6591X6EC067JNMPNM2KSEMP7YP9L1WLR3CWCYWOYQ5MGJ4TLYM8SIQ2AEAWCK2UWY6453.pdf';
  syllabus_text text := 'Código de Trânsito Brasileiro — Lei nº 9.503/1997. Arts. 1º a 4º; arts. 26 a 67; arts. 80 a 90; arts. 96 a 102; arts. 114 a 160; arts. 256 a 279-A; arts. 291 a 312-B.';
  answer_key_url text := 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=M9HQWJK3ETPULWNR0MV39BJ9PDFKY8F9XC2P3T6XRU8IYOJECTQBA9T6I920N7ES9PYT13278U1LBSPB7045.pdf';
  question_batch jsonb := $questions$[{"id":"851f3873-e457-48bb-9185-cc3e2b4e48c4","item":46,"answer":"D","stem":"Conforme descrito nas disposições preliminares do Código de Trânsito Brasileiro, é correto afirmar que:","options":{"A":"Considera-se trânsito a utilização das vias por pessoas, veículos e animais, isolados ou em grupos, conduzidos ou não, para fins de circulação, interrupção de marcha, estacionamento e operação de carga ou descarga.","B":"Para os efeitos deste Código, são consideradas vias terrestres as praias abertas à circulação pública, as vias internas pertencentes aos condomínios constituídos por unidades autônomas e as vias e áreas de estacionamento de estabelecimentos privados.","C":"São vias terrestres urbanas e rurais as ruas, as avenidas, os logradouros, os caminhos, as passagens, as estradas e as rodovias, que terão seu uso regulamentado pelo departamento executivo de trânsito da união, de acordo com as peculiaridades locais e as circunstâncias especiais.","D":"Os órgãos e entidades componentes do Sistema Nacional de Trânsito respondem, no âmbito das respectivas competências, objetivamente, por danos causados aos cidadãos em virtude de ação, omissão ou erro na execução e manutenção de programas, projetos e serviços que garantam o exercício do direito do trânsito seguro.","E":"As disposições deste Código são aplicáveis a qualquer veículo automotor, bem como aos proprietários, condutores dos veículos nacionais ou estrangeiros e às pessoas nele expressamente mencionadas."},"old_explanation":"Explicação preliminar: a alternativa D é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"D é correta: reproduz o art. 1º, § 3º, do CTB, que prevê responsabilidade objetiva dos órgãos e entidades do Sistema Nacional de Trânsito, no âmbito de suas competências. A) O CTB usa “parada”, não “interrupção de marcha”. B) A lei inclui vias de estabelecimentos privados de uso coletivo, não todos os privados. C) O uso das vias é regulamentado pelo órgão/entidade com circunscrição sobre elas, não por um departamento federal único. E) O art. 3º se aplica a qualquer veículo, não apenas automotor.","tested_topic":"Responsabilidade objetiva dos órgãos do Sistema Nacional de Trânsito — CTB, art. 1º, § 3º.","article":"CTB, arts. 1º a 3º"},{"id":"df8836a2-f755-4c4e-ac44-4f331a6a0a71","item":47,"answer":"A","stem":"De acordo com as normas gerais de circulação e conduta, previstas no Código de Trânsito Brasileiro, é correto afirmar que:","options":{"A":"Nas vias não iluminadas, o condutor deve usar luz alta, exceto ao cruzar com outro veículo ou ao segui-lo.","B":"Os veículos que se deslocam sobre trilhos darão preferência de passagem sobre os demais, respeitadas as normas de circulação.","C":"O condutor deverá, a todo momento, ter domínio de seu veículo, dirigindo-o com atenção e cuidados dispensáveis à segurança do trânsito.","D":"Nas interseções e suas proximidades, o condutor poderá efetuar ultrapassagem.","E":"O condutor que for ingressar em uma via, procedente de um lote lindeiro a essa via, terá preferência sobre os veículos e pedestres que por ela estejam transitando."},"old_explanation":"Explicação preliminar: a alternativa A é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"A é correta e reproduz o art. 40, II: em vias não iluminadas, usa-se luz alta, exceto ao cruzar com outro veículo ou ao segui-lo. B) Inverte a regra: os veículos sobre trilhos terão preferência de passagem; não “darão” preferência aos demais (art. 29, XII). C) O CTB exige cuidados indispensáveis, não dispensáveis (art. 28). D) É proibido ultrapassar em interseções e proximidades (art. 33). E) Quem ingressa de lote lindeiro deve dar preferência aos veículos e pedestres que transitam na via (art. 36). Gabarito definitivo A.","tested_topic":"Luz alta em vias não iluminadas e normas gerais de circulação — CTB, arts. 29, 33, 36 e 40.","article":"CTB, arts. 28, 29, XII, 33, 36 e 40, II"},{"id":"54130e8b-9ef6-4755-9a53-db57d817f2a3","item":48,"answer":"B","stem":"De acordo com os critérios para a sinalização de trânsito, previstas no Código de Trânsito Brasileiro, é correto afirmar que:","options":{"A":"A sinalização será colocada em posição e condições que a tornem perfeitamente visível e legível durante o dia e a noite, em distância compatível com a segurança do trânsito, conforme normas e especificações da SENATRAN.","B":"O órgão ou entidade de trânsito com circunscrição sobre a via poderá retirar ou determinar a imediata retirada de qualquer elemento que prejudique a visibilidade da sinalização viária e a segurança do trânsito, com ônus para quem o tenha colocado.","C":"A responsabilidade pela instalação da sinalização nas vias internas pertencentes aos condomínios constituídos por unidades autônomas e nas vias e áreas de estacionamento de estabelecimentos privados de uso coletivo é do órgão com circunscrição pela via.","D":"É proibido afixar sobre a sinalização de trânsito e respectivos suportes, ou junto a ambos, qualquer tipo de publicidade, inscrições, legendas e símbolos que se relacionem com a mensagem da sinalização.","E":"Os locais destinados a postos de gasolina, oficinas, estacionamentos ou garagens de uso coletivo deverão ter suas entradas e saídas devidamente identificadas, na forma regulamentada pela SENATRAN."},"old_explanation":"Explicação preliminar: a alternativa B é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"B é correta: o art. 84 autoriza o órgão/entidade com circunscrição sobre a via a retirar ou mandar retirar imediatamente elemento que prejudique a visibilidade da sinalização ou a segurança, com ônus de quem o colocou. A) O art. 80, § 1º, remete às normas e especificações do CONTRAN, não SENATRAN. C) Nas vias privadas de uso coletivo e condomínios, a instalação cabe ao proprietário (art. 80, § 3º). D) O art. 82 proíbe inscrições e símbolos que não se relacionem à mensagem. E) Entradas e saídas de postos, oficinas e garagens são regulamentadas pelo CONTRAN (art. 86), não SENATRAN. Gabarito definitivo B.","tested_topic":"Retirada de elemento que prejudica a sinalização — CTB, arts. 80, 82, 84 e 86.","article":"CTB, arts. 80, §§ 1º e 3º, 82, 84 e 86"},{"id":"d060ae9a-0469-4996-8e25-ca862b5b93aa","item":49,"answer":"E","stem":"De acordo com o Código de Trânsito Brasileiro, é correto afirmar que:","options":{"A":"As repartições aduaneiras e os órgãos de controle de fronteira comunicarão diretamente ao RENACH a entrada e saída temporária ou definitiva de veículos.","B":"No caso de transferência de propriedade, o prazo para o proprietário adotar as providências necessárias à efetivação da expedição do novo Certificado de Registro de Veículo é de quinze dias, sendo que nos demais casos as providências deverão ser imediatas.","C":"O registro e o licenciamento dos veículos de propulsão humana e dos veículos de tração animal obedecerão à regulamentação estabelecida em legislação estadual do domicílio ou residência de seus proprietários.","D":"O proprietário de veículo irrecuperável, ou destinado à desmontagem, deverá requerer a baixa do registro, no prazo e forma estabelecidos pelo RENAVAM, vedada a remontagem do veículo sobre o mesmo chassi de forma a manter o registro anterior.","E":"O Conselho Nacional de Trânsito – CONTRAN poderá dispensar os tripulantes de aeronaves que apresentarem o cartão de saúde expedido pelas Forças Armadas ou pelo Departamento de Aeronáutica Civil, respectivamente, da prestação do exame de aptidão física e mental."},"old_explanation":"Explicação preliminar: a alternativa E é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"E é correta: o art. 148, § 5º, permite que o CONTRAN dispense tripulantes de aeronaves que apresentem cartão de saúde expedido pelas Forças Armadas ou pelo Departamento de Aeronáutica Civil do exame de aptidão física e mental. A) O art. 119 determina comunicação ao RENAVAM, não RENACH. B) O prazo para transferência é de 30 dias, não 15 (art. 123, § 1º). C) A regulamentação é municipal, não estadual (art. 129). D) O prazo e a forma da baixa são estabelecidos pelo CONTRAN, não RENAVAM (art. 126). Gabarito definitivo E.","tested_topic":"Habilitação e exames; registro, baixa e circulação de veículos — CTB, arts. 119, 123, 126, 129 e 148.","article":"CTB, arts. 119, 123, § 1º, 126, 129 e 148, § 5º"},{"id":"0810d2c8-0173-4c16-98a5-db887660036c","item":50,"answer":"C","stem":"De acordo com o Código de Trânsito Brasileiro, é correto afirmar que:","options":{"A":"As multas serão impostas e arrecadadas pelo órgão ou entidade de trânsito de registro do veículo, de acordo com a competência estabelecida neste Código.","B":"Quando ocorrer a suspensão do direito de dirigir, a Carteira Nacional de Habilitação será devolvida a seu titular imediatamente após cumprida a penalidade.","C":"O pagamento das despesas de remoção e estada será correspondente ao período integral, contado em dias, em que efetivamente o veículo permanecer em depósito, limitado ao prazo de 6 (seis) meses.","D":"A critério do agente, não se dará a remoção imediata, quando se tratar de veículo de transporte coletivo transportando passageiros ou veículo transportando produto perigoso ou perecível, desde que ofereça condições de segurança para circulação em via pública.","E":"A imposição da penalidade de suspensão do direito de dirigir não elimina a quantidade de pontos computados, para fins de contagem subsequente."},"old_explanation":"Explicação preliminar: a alternativa C é a resposta registrada no gabarito. A análise definitiva exige confronto com a norma vigente, fonte oficial e tópico do edital. Item mantido em revisão.","explanation":"C é correta: o art. 271, § 10, limita a cobrança de remoção e estada ao período efetivo em depósito, contado em dias, até seis meses. A) Penalidades são impostas pela autoridade segundo competência e circunscrição, não necessariamente pelo órgão de registro (arts. 256–257). B) A CNH é devolvida depois da penalidade e do curso de reciclagem (art. 268, § 2º). D) A exceção do art. 270, § 5º, trata de retenção imediata, não remoção. E) A suspensão elimina os pontos para contagem subsequente (art. 261, § 3º). Gabarito definitivo C.","tested_topic":"Penalidades, suspensão de habilitação e despesas de remoção/estada — CTB, arts. 256, 261, 268, 270 e 271.","article":"CTB, arts. 256, 261, § 3º, 268, § 2º, 270, § 5º, e 271, § 10"}]$questions$::jsonb;
begin
  insert into public.content_sources
    (source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
  values ('lei','Código de Trânsito Brasileiro — Lei nº 9.503/1997, texto compilado','Presidência da República — Planalto',ctb_url,'1997-09-23',now(),'vigente',true,
    'Texto compilado oficial conferido em 2026-10-23, incluindo alterações posteriores; itens PMSC 46–50. HTML SHA-256 25f21938684852614373ce24ce663e1ca5006931dd564a887926fb0f57dad058.')
  on conflict (url) do update set title=excluded.title,issuer=excluded.issuer,checked_at=excluded.checked_at,status=excluded.status,is_official=excluded.is_official,notes=excluded.notes;
  select id into v_ctb_source_id from public.content_sources where url=ctb_url;
  if not found or not exists (select 1 from public.content_sources where id=v_ctb_source_id and is_official and status='vigente') then
    raise exception 'Fonte oficial compilada do CTB ausente ou divergente';
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
  values (v_edition_id,'Conhecimentos Específicos','Código de Trânsito Brasileiro',1,syllabus_text,'current')
  on conflict (edition_id,discipline,topic_order) do nothing;
  select st.id into v_topic_id from public.syllabus_topics st
  where st.edition_id=v_edition_id and st.discipline='Código de Trânsito Brasileiro' and st.topic_order=1;
  if not found or not exists (select 1 from public.syllabus_topics where id=v_topic_id and topic_text=syllabus_text and content_status='current') then
    raise exception 'Tópico CTB da edição PMSC diverge do edital';
  end if;

  for item_record in select value from jsonb_array_elements(question_batch) loop
    select * into question from public.board_exam_questions where id=(item_record->>'id')::uuid for update;
    if not found then raise exception 'Questão PMSC % ausente',item_record->>'item'; end if;
    before_row := to_jsonb(question);
    select * into prior_audit from public.idecan_pedagogical_review_audit
    where batch_key='idecan-pmsc-items46-50-ctb-v1' and question_id=question.id;
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
      legal_basis=jsonb_build_array(jsonb_build_object('title',(item_record->>'article')||' — CTB compilado vigente','url',ctb_url)),
      legal_review_required=false,
      law_version_checked_at=now(),
      syllabus_topic_id=v_topic_id,
      tested_topic=item_record->>'tested_topic',
      content_status='active',
      verified_at=now(),
      review_note='Gabarito definitivo IDECAN conferido. Texto do CTB compilado pelo Planalto cotejado com as alternativas, incluindo alterações recentes relevantes. Edital PMSC nº 200/CCP/2025, Anexo II, p. 52, inclui o dispositivo. Liberação restrita à edição histórica PMSC 2026.'
    where id=question.id returning to_jsonb(board_exam_questions) into after_row;

    insert into public.idecan_pedagogical_review_audit
      (batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values ('idecan-pmsc-items46-50-ctb-v1',question.id,before_row,after_row,
      jsonb_build_object(
        'official_ctb_url',ctb_url,
        'ctb_html_sha256','25f21938684852614373ce24ce663e1ca5006931dd564a887926fb0f57dad058',
        'ctb_text_sha256','f7d68ef82f1785587f0f0a52f7c7ef81813c24455bd80f78585667ee33778f9e',
        'law_checked_at','2026-10-23',
        'articles',item_record->>'article',
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
where a.batch_key='idecan-pmsc-items46-50-ctb-v1'
order by q.item_number;
