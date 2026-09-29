-- Curated (authored) questions, Direito lote 45: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Convênios administrativos',
  $q$Julgue o item a seguir.
O convênio administrativo, diferentemente do contrato administrativo, caracteriza-se pela convergência de interesses entre os partícipes, que colaboram mutuamente para a consecução de um objetivo comum, não havendo, em regra, partes com interesses contrapostos como ocorre tipicamente numa relação contratual.$q$,
  'C',
  $q$Certo. Essa é uma distinção doutrinária central entre convênio e contrato administrativo: no CONTRATO, as partes têm interesses opostos e contrapostos (uma parte quer o serviço/bem, a outra quer a remuneração por fornecê-lo), numa lógica de reciprocidade de prestações; já no CONVÊNIO, os partícipes convergem seus interesses e esforços para alcançar um objetivo comum de interesse mútuo, cooperando entre si, sem que exista essa contraposição típica das relações contratuais — por isso, tecnicamente, fala-se em "partícipes" do convênio, e não em "partes" contratantes em sentido estrito, refletindo essa lógica colaborativa e não sinalagmática.
Exemplo: um contrato de prestação de serviços entre a administração e uma empresa envolve interesses opostos (a empresa quer ser paga, a administração quer o serviço prestado); já um convênio entre dois órgãos públicos para desenvolver conjuntamente um projeto de interesse comum de ambos reflete uma cooperação mútua, sem essa lógica de reciprocidade de prestações opostas típica dos contratos.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Direitos e vantagens — diárias e ajuda de custo (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
Será concedida diária ao servidor que se afastar da sede em caráter eventual ou transitório para outro ponto do território nacional ou para o exterior, a título de indenização das parcelas de despesas extraordinárias com pousada, alimentação e locomoção urbana, sendo devida a diária mesmo quando o deslocamento não exigir pernoite fora da sede, hipótese em que será calculada proporcionalmente.$q$,
  'C',
  $q$Certo. O art. 58, caput, da Lei nº 8.112/1990 estabelece que será concedida diária ao servidor que se afastar da sede em caráter eventual ou transitório para outro ponto do território nacional ou para o exterior, a serviço, para indenizar as parcelas de despesas extraordinárias com pousada, alimentação e locomoção urbana. O § 3º do mesmo artigo prevê que, quando o afastamento não exigir pernoite fora da sede, a indenização de despesas será feita a título de diária, em valor correspondente a 50% (cinquenta por cento) da diária normal — reconhecendo que, mesmo sem pernoite, o servidor ainda incorre em despesas extraordinárias (como alimentação fora de sua rotina habitual) que justificam alguma forma de ressarcimento, ainda que proporcionalmente menor do que a diária completa devida em deslocamentos com pernoite.
Exemplo: um servidor que viaja a serviço para outra cidade, mas retorna à sua sede no mesmo dia, sem precisar pernoitar, ainda tem direito a receber uma diária reduzida (metade do valor normal), reconhecendo os gastos extras que teve durante esse deslocamento, mesmo sem a necessidade de hospedagem.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Tribunal de Contas',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Tribunal de Contas da União, órgão auxiliar do Congresso Nacional no exercício do controle externo, tem competência, entre outras, para julgar as contas dos administradores e demais responsáveis por dinheiros, bens e valores públicos, bem como para aplicar aos responsáveis, em caso de ilegalidade de despesa ou irregularidade de contas, as sanções previstas em lei.$q$,
  'C',
  $q$Certo. O art. 71 da CF/1988 estabelece as competências do Tribunal de Contas da União, incluindo, no inciso II, julgar as contas dos administradores e demais responsáveis por dinheiros, bens e valores públicos da administração direta e indireta, e no inciso VIII, aplicar aos responsáveis, em caso de ilegalidade de despesa ou irregularidade de contas, as sanções previstas em lei, que estabelecerá, entre outras cominações, multa proporcional ao dano causado ao erário. É importante notar que o TCU não é um órgão do Poder Judiciário, embora exerça função "julgadora" de natureza administrativa (não jurisdicional propriamente dita) sobre as contas públicas — suas decisões, quando imputam débito ou multa, têm eficácia de título executivo, mas não fazem coisa julgada no sentido jurisdicional estrito.
Exemplo: um gestor público que comprovadamente causou prejuízo ao erário por meio de despesa irregular pode ter suas contas julgadas irregulares pelo TCU, que pode determinar o ressarcimento do dano e aplicar multa, exercendo esse controle externo de natureza técnica e administrativa sobre a gestão dos recursos públicos, em auxílio à função fiscalizadora do Congresso Nacional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
