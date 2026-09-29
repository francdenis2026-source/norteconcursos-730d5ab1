-- Curated (authored) questions, Direito lote 32: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Tribunal Penal Internacional',
  $q$Julgue o item a seguir.
O Estatuto de Roma, que criou o Tribunal Penal Internacional, ratificado pelo Brasil, estabelece a competência dessa corte para julgar, de forma complementar às jurisdições penais nacionais, os crimes de genocídio, crimes contra a humanidade, crimes de guerra e o crime de agressão.$q$,
  'C',
  $q$Certo. O Estatuto de Roma (1998), que criou o Tribunal Penal Internacional (TPI), com sede em Haia, foi ratificado pelo Brasil e internalizado pelo Decreto nº 4.388/2002. O art. 5º do Estatuto define a competência do TPI para julgar quatro categorias de crimes considerados os mais graves de repercussão internacional: genocídio, crimes contra a humanidade, crimes de guerra e o crime de agressão. Um traço fundamental do sistema é o princípio da complementaridade: o TPI não substitui as jurisdições penais nacionais, atuando apenas de forma subsidiária, quando o Estado competente não tiver vontade ou capacidade de investigar e julgar efetivamente esses crimes por conta própria.
Exemplo: se um Estado tem estrutura judicial funcional e efetivamente investiga e julga, de boa-fé, alegações de crimes de guerra cometidos em seu território, o TPI, em regra, não assume a jurisdição sobre o caso — sua atuação é reservada a situações em que a justiça nacional se mostre inexistente, inoperante ou manifestamente incapaz/relutante em processar esses crimes graves.$q$,
  jsonb_build_array(jsonb_build_object('title','Estatuto de Roma do Tribunal Penal Internacional (1998) – Decreto nº 4.388/2002','url','https://www.planalto.gov.br/ccivil_03/decreto/2002/d4388.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Combate ao tráfico de pessoas',
  $q$Julgue o item a seguir, com base no Código Penal.
O tráfico de pessoas, previsto no art. 149-A do Código Penal, consiste em agenciar, aliciar, recrutar, transportar, transferir, comprar, alojar ou acolher pessoa mediante grave ameaça, violência, coação, fraude ou abuso, com a finalidade, entre outras, de remoção de órgãos, tecidos ou partes do corpo, submissão a trabalho em condições análogas à de escravo ou exploração sexual.$q$,
  'C',
  $q$Certo. O art. 149-A, caput, do Código Penal (introduzido pela Lei nº 13.344/2016) tipifica o tráfico de pessoas como um crime de ação múltipla, descrevendo diversas condutas (agenciar, aliciar, recrutar, transportar, transferir, comprar, alojar ou acolher pessoa), praticadas mediante grave ameaça, violência, coação, fraude ou abuso, e com finalidades específicas listadas nos incisos do dispositivo, entre elas: remoção de órgãos, tecidos ou partes do corpo; submissão a trabalho em condições análogas à de escravo; e exploração sexual, entre outras finalidades igualmente graves previstas em lei. Trata-se de crime formal, que não exige a efetiva consumação da finalidade específica (a exploração já concretizada), bastando que a conduta de tráfico seja praticada com aquela finalidade específica em mente.
Exemplo: aliciar uma pessoa, mediante fraude sobre uma suposta oportunidade de emprego, para transportá-la a outro local com a real intenção de submetê-la a trabalho escravo, já configura o crime de tráfico de pessoas, mesmo que, por alguma circunstância, a exploração efetiva não chegue a se consumar por completo — o crime se aperfeiçoa com a conduta de tráfico praticada com aquela finalidade específica.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei do SUSP (Sistema Único de Segurança Pública)',
  $q$Julgue o item a seguir, com base na Lei nº 13.675/2018.
O Sistema Único de Segurança Pública (SUSP) tem como um de seus objetivos promover a integração e a cooperação entre os órgãos de segurança pública dos entes federativos, definindo princípios que orientam a atuação conjunta na prevenção e no combate à criminalidade, respeitadas as competências específicas de cada ente e órgão.$q$,
  'C',
  $q$Certo. A Lei nº 13.675/2018 instituiu o Sistema Único de Segurança Pública (SUSP), com o objetivo de preservar a ordem pública e a incolumidade das pessoas e do patrimônio, por meio da integração dos órgãos de segurança pública dos entes federativos (União, Estados, Distrito Federal e Municípios), estabelecendo princípios, diretrizes, objetivos e instrumentos comuns para a atuação coordenada desses órgãos na prevenção, controle e repressão da criminalidade. A lei busca fomentar a cooperação e o compartilhamento de informações e recursos entre as diferentes esferas de segurança pública, sem, contudo, suprimir a autonomia e as competências específicas de cada órgão, previstas em outros dispositivos legais e constitucionais, como o próprio art. 144 da Constituição Federal.
Exemplo: o SUSP busca, por exemplo, viabilizar o compartilhamento de bancos de dados criminais entre a Polícia Federal e as polícias civis estaduais, facilitando investigações que envolvam mais de um ente federativo, sem que isso implique a fusão ou a perda de autonomia institucional de cada órgão de segurança envolvido.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.675/2018 – Lei do Sistema Único de Segurança Pública','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm')),
  'média', now()
);
