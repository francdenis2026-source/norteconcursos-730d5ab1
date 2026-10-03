-- Curated (authored) questions for Polícia Penal do Acre (edital 2023):
-- 30 questões cobrindo as 4 disciplinas do edital (Conhecimentos Específicos,
-- História e Geografia do Acre, Informática Básica e Língua Portuguesa).
-- Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-01',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — deveres do condenado (art. 39)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
São deveres do condenado, entre outros, o comportamento disciplinado e o cumprimento fiel da sentença, a execução do trabalho, a conduta oposta a movimentos de fuga ou subversão à ordem, e a higiene pessoal e o asseio da cela ou alojamento.$q$,
  'C',
  $q$Certo. O art. 39 da Lei de Execução Penal elenca os deveres do condenado, que abrangem tanto aspectos comportamentais (disciplina, obediência, respeito) quanto obrigações relacionadas à execução da pena (cumprimento da sentença, trabalho) e à convivência no estabelecimento prisional (higiene, conservação de objetos, conduta contrária a movimentos de subversão), cujo descumprimento pode configurar falta disciplinar. Exemplo: um preso que se recusa a manter a higiene mínima de sua cela pode ser responsabilizado disciplinarmente por descumprir esse dever legal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 39','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-02',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — direitos do preso (art. 41)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
Constituem direitos do preso, entre outros, a alimentação suficiente, a atribuição de trabalho remunerado, a assistência material, à saúde, jurídica, educacional, social e religiosa, e o contato com o mundo exterior por meio de correspondência escrita e outros meios de informação.$q$,
  'C',
  $q$Certo. O art. 41 da Lei de Execução Penal assegura ao preso um extenso rol de direitos, que buscam preservar sua dignidade e viabilizar sua reinserção social, abrangendo desde necessidades materiais básicas (alimentação, vestuário) até formas de assistência integral (saúde, jurídica, educacional, religiosa) e a manutenção do vínculo com o mundo exterior, ainda que sob restrições próprias do cumprimento da pena. Exemplo: o preso tem direito a receber assistência jurídica gratuita para acompanhar sua situação processual, mesmo estando privado de liberdade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 41','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-03',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — regime disciplinar diferenciado (art. 52)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
A prática de fato previsto como crime doloso constitui falta grave e sujeita o preso, sem prejuízo da sanção penal, ao regime disciplinar diferenciado, cabível também para quem apresente alto risco para a ordem e a segurança do estabelecimento penal, ou sobre quem recaiam fundadas suspeitas de envolvimento em organização criminosa.$q$,
  'C',
  $q$Certo. O art. 52 da Lei de Execução Penal, com as alterações da Lei nº 13.964/2019 (Pacote Anticrime), disciplina o regime disciplinar diferenciado (RDD) como sanção disciplinar de maior gravidade, aplicável não apenas em razão da prática de falta grave equiparada a crime doloso, mas também em hipóteses de periculosidade do preso ou de vínculo com organização criminosa, refletindo a preocupação legislativa com o controle de lideranças criminosas dentro do sistema prisional. Exemplo: um preso identificado como líder de uma facção criminosa atuante dentro e fora do presídio pode ser submetido ao RDD, ainda que não tenha cometido nova falta disciplinar recente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 52','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-04',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Código Penal — excesso punível (art. 23, parágrafo único)',
  $q$Julgue o item a seguir, com base no Código Penal.
O agente, em qualquer das hipóteses de exclusão de ilicitude, responderá pelo excesso doloso ou culposo praticado além do necessário para a defesa do bem jurídico ou repulsa da agressão.$q$,
  'C',
  $q$Certo. O art. 23, parágrafo único, do Código Penal estabelece que, mesmo diante de uma causa de exclusão da ilicitude (como legítima defesa, estado de necessidade ou estrito cumprimento do dever legal), o agente que atua além do estritamente necessário responde pelo excesso, seja ele doloso (quando o agente tem consciência de estar agindo além do necessário) ou culposo (quando o excesso decorre de negligência, imprudência ou imperícia na avaliação da situação). Exemplo: um agente penitenciário que, em legítima defesa contra uma agressão de um detento, continua desferindo golpes mesmo após o agressor já estar imobilizado, pode responder pelo excesso.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 23, parágrafo único','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-05',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — falta grave (art. 50)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
Comete falta grave o condenado à pena privativa de liberdade que fugir, possuir indevidamente instrumento capaz de ofender a integridade física de outrem, ou tiver em sua posse aparelho telefônico, de rádio ou similar que permita comunicação com outros presos ou com o ambiente externo.$q$,
  'C',
  $q$Certo. O art. 50 da Lei de Execução Penal elenca as hipóteses de falta grave, entre elas a fuga, a posse de instrumento apto a ofender a integridade física de terceiros, e a posse de aparelho de comunicação não autorizado, esta última incluída em razão do risco que a comunicação irrestrita de presos representa para a segurança do sistema prisional e para a continuidade de atividades criminosas de dentro do cárcere. Exemplo: a apreensão de um celular na cela de um detento configura, por si só, falta grave, independentemente de comprovação de seu uso efetivo para fins ilícitos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 50','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-06',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Direitos Humanos — Regras de Mandela (ONU)',
  $q$Julgue o item a seguir, com base nas Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Mandela).
As Regras de Mandela estabelecem padrões internacionais de tratamento digno aos presos, vedando a tortura e os tratamentos cruéis, desumanos ou degradantes, e assegurando condições mínimas de higiene, alimentação, assistência médica e contato com o mundo exterior.$q$,
  'C',
  $q$Certo. As Regras Mínimas das Nações Unidas para o Tratamento de Reclusos, revisadas em 2015 e renomeadas Regras de Mandela em homenagem a Nelson Mandela, constituem parâmetro internacional de referência para a atuação dos sistemas prisionais, orientando as práticas de agentes penitenciários no sentido de assegurar condições mínimas de dignidade, ainda que o indivíduo esteja privado de liberdade em razão de condenação criminal. Exemplo: a submissão de um preso a condições insalubres de confinamento, sem acesso a água potável ou assistência médica básica, viola diretamente os parâmetros estabelecidos pelas Regras de Mandela.$q$,
  jsonb_build_array(jsonb_build_object('title','Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Mandela)','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-07',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Código Penal — motim de presos (art. 354)',
  $q$Julgue o item a seguir, com base no Código Penal.
Configura o crime de motim de presos amotinar presos, sob comando ou não, subvertendo a disciplina da prisão ou fazendo, com evasão de um ou mais deles, uso de violência contra a pessoa.$q$,
  'C',
  $q$Certo. O art. 354 do Código Penal tipifica o motim de presos como crime praticado no interior de estabelecimentos prisionais, caracterizado pela subversão coletiva da disciplina carcerária, com ou sem liderança identificada, exigindo, para a modalidade mais grave, o emprego de violência contra pessoa em contexto de fuga de um ou mais detentos amotinados. Exemplo: um grupo de presos que, de forma coordenada, desobedece às ordens dos agentes penitenciários e danifica instalações do presídio em protesto configura motim, ainda que não haja fuga efetiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 354','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-08',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Código Penal — fuga de pessoa presa (art. 351)',
  $q$Julgue o item a seguir, com base no Código Penal.
Configura crime promover ou facilitar a fuga de pessoa legalmente presa ou submetida a medida de segurança detentiva, sendo a pena aumentada se o crime é praticado a mão armada, por mais de uma pessoa, ou mediante arrombamento, e se o evadido já possui sentença condenatória proferida.$q$,
  'C',
  $q$Certo. O art. 351 do Código Penal tipifica a fuga de pessoa presa, prevendo, em seus parágrafos, causas de aumento de pena relacionadas a circunstâncias que revelam maior gravidade da conduta, como o emprego de arma, o concurso de agentes, o arrombamento de obstáculos e a existência de sentença condenatória já proferida contra o evadido, refletindo maior reprovabilidade quando a fuga envolve pessoa já definitivamente condenada. Exemplo: um agente penitenciário que, mediante pagamento, facilita a fuga armada de um preso já condenado responde por essa modalidade agravada do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 351','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-09',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — direito à visita e regulamentação de visita íntima',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
A Lei de Execução Penal assegura ao preso o direito à visita, cabendo a regulamentação específica das visitas íntimas aos regimentos internos de cada unidade prisional, dentro dos parâmetros de dignidade da pessoa humana e observância das normas de segurança do estabelecimento.$q$,
  'C',
  $q$Certo. O art. 41, inciso X, da Lei de Execução Penal assegura ao preso o direito de receber visitas do cônjuge, companheira, parentes e amigos em dias determinados, e a jurisprudência e a prática administrativa reconhecem, dentro desse direito, a possibilidade de regulamentação específica da visita íntima por normas internas de cada estabelecimento, que devem observar o respeito à dignidade da pessoa humana e as exigências de segurança do sistema prisional. Exemplo: um estabelecimento penal pode estabelecer, em seu regimento interno, dias e procedimentos específicos para a realização de visita íntima, desde que respeitados os parâmetros legais de dignidade e segurança.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 41, X','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-10',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Porte de arma funcional dos agentes de polícia penal',
  $q$Julgue o item a seguir, com base na Constituição Federal e no Estatuto do Desarmamento.
Após a Emenda Constitucional nº 104/2019, as polícias penais passaram a integrar o rol dos órgãos de segurança pública previstos no art. 144 da Constituição Federal, o que fundamenta o direito de seus integrantes ao porte de arma de fogo funcional, nos termos e condições estabelecidos na regulamentação do órgão a que pertencem.$q$,
  'C',
  $q$Certo. A Emenda Constitucional nº 104/2019 incluiu expressamente as polícias penais federal e estaduais no rol de órgãos de segurança pública do art. 144 da Constituição Federal, reconhecimento institucional que, somado às disposições do Estatuto do Desarmamento sobre porte funcional para os integrantes dos órgãos ali listados, fundamenta o direito dos agentes de polícia penal ao porte de arma de fogo funcional, observadas a regulamentação específica do órgão. Exemplo: um agente de polícia penal do Acre, no exercício de suas atribuições, pode portar arma de fogo funcional nos termos estabelecidos pela regulamentação do IAPEN e da legislação federal.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 144, com a redação da EC nº 104/2019; Lei nº 10.826/2003, art. 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc104.htm')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-01',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Tratado de Petrópolis (1903)',
  $q$Julgue o item a seguir, com base na história do Acre.
O Tratado de Petrópolis, assinado em 1903 entre Brasil e Bolívia, pôs fim à Questão do Acre, mediante o qual o Brasil incorporou definitivamente o território acreano, em troca de indenização financeira e da cessão de outras áreas à Bolívia.$q$,
  'C',
  $q$Certo. O Tratado de Petrópolis, negociado pelo Barão do Rio Branco, encerrou o conflito diplomático e militar conhecido como Questão do Acre, formalizando a incorporação do território acreano ao Brasil mediante o pagamento de indenização à Bolívia e a cessão de terras em outras regiões de fronteira, consolidando a soberania brasileira sobre a região explorada, à época, majoritariamente por seringueiros brasileiros. Exemplo: a assinatura desse tratado é considerada um marco histórico fundamental para a formação do atual estado do Acre.$q$,
  jsonb_build_array(jsonb_build_object('title','História do Acre — Tratado de Petrópolis (1903)','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-02',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Plácido de Castro e a Revolução Acreana',
  $q$Julgue o item a seguir, com base na história do Acre.
Plácido de Castro foi um dos principais líderes da Revolução Acreana, movimento de seringueiros e brasileiros radicados na região que lutaram pela anexação do território ao Brasil, sendo posteriormente reconhecido como uma das figuras centrais da incorporação do Acre ao território nacional.$q$,
  'C',
  $q$Certo. Plácido de Castro liderou o movimento armado dos revolucionários acreanos contra a soberania boliviana sobre a região, sendo figura central na chamada Revolução Acreana, que antecedeu e influenciou diretamente a negociação diplomática que resultou no Tratado de Petrópolis e na consequente incorporação do Acre ao Brasil. Exemplo: diversas ruas, escolas e monumentos no Acre homenageiam Plácido de Castro em razão de seu papel histórico na anexação do território.$q$,
  jsonb_build_array(jsonb_build_object('title','História do Acre — Revolução Acreana','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-03',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Localização e fronteiras do Acre',
  $q$Julgue o item a seguir, com base na geografia do Acre.
O estado do Acre está localizado na região Norte do Brasil, fazendo fronteira internacional com o Peru e a Bolívia, além de fazer divisa, no território nacional, com os estados do Amazonas e de Rondônia.$q$,
  'C',
  $q$Certo. O Acre situa-se no extremo oeste da região Norte do Brasil, sendo um dos poucos estados brasileiros a fazer fronteira com dois países ao mesmo tempo (Peru e Bolívia), e tendo como limites internos os estados do Amazonas (ao norte) e de Rondônia (a leste), posição geográfica que lhe confere relevância estratégica nas relações do Brasil com países vizinhos da América do Sul. Exemplo: a cidade de Assis Brasil, no Acre, forma a chamada "tríplice fronteira" com o Peru e a Bolívia.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Localização e fronteiras','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-04',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Rio Branco — capital do Acre',
  $q$Julgue o item a seguir, com base na geografia do Acre.
Rio Branco é a capital do estado do Acre, cidade cortada pelo rio homônimo, e concentra a maior parte da população e das atividades administrativas, econômicas e culturais do estado.$q$,
  'C',
  $q$Certo. Rio Branco é a capital e o principal centro urbano, administrativo e econômico do Acre, sendo banhada pelo rio Acre, que corta a cidade e historicamente teve papel central no transporte fluvial e na ocupação da região durante o ciclo da borracha, permanecendo relevante para a identidade e a paisagem urbana da capital. Exemplo: importantes órgãos públicos estaduais, incluindo os relacionados ao sistema penitenciário, têm sede em Rio Branco.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Capital Rio Branco','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-05',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Fuso horário do Acre',
  $q$Julgue o item a seguir, com base na geografia do Acre.
Desde 2013, o estado do Acre adota o horário UTC-5, duas horas a menos em relação ao horário oficial de Brasília (UTC-3), mudança que buscou alinhar o horário do estado à posição do sol na região.$q$,
  'C',
  $q$Certo. Em 2013, por meio de lei estadual, o Acre (e parte do Amazonas) mudou seu fuso horário de UTC-4 para UTC-5, passando a ter uma diferença de duas horas em relação ao horário de Brasília (UTC-3), ajuste que buscou corrigir a discrepância entre o horário oficial e a posição geográfica do estado, situado mais a oeste, o que causava, por exemplo, o amanhecer muito tardio segundo o relógio anterior. Exemplo: quando são 12h em Brasília, são 10h no horário oficial do Acre.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Fuso horário','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-06',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Extrativismo e ciclo da borracha',
  $q$Julgue o item a seguir, com base na história do Acre.
A economia acreana teve forte base extrativista, sobretudo a exploração da borracha nativa por meio do trabalho dos seringueiros nos seringais, atividade que atraiu grande fluxo migratório, especialmente de nordestinos, para a região amazônica no final do século XIX e início do século XX.$q$,
  'C',
  $q$Certo. O ciclo da borracha foi determinante para a ocupação e o povoamento do território acreano, atraindo grande contingente de migrantes, sobretudo nordestinos fugindo de secas e da crise econômica em suas regiões de origem, que se tornaram seringueiros nos seringais da Amazônia, moldando a formação social, econômica e cultural do Acre até os dias atuais. Exemplo: muitas famílias acreanas descendem de migrantes nordestinos que vieram para a região durante o ciclo da borracha.$q$,
  jsonb_build_array(jsonb_build_object('title','História do Acre — Ciclo da borracha','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-07',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Chico Mendes e a luta socioambiental',
  $q$Julgue o item a seguir, com base na história do Acre.
Chico Mendes foi um seringueiro e líder sindical acreano que se destacou na defesa da floresta amazônica e dos direitos dos povos extrativistas, tendo sido assassinado em 1988, em Xapuri, em razão de sua atuação contra o desmatamento na região.$q$,
  'C',
  $q$Certo. Chico Mendes tornou-se símbolo internacional da luta pela preservação da floresta amazônica e pelos direitos das populações extrativistas, organizando os chamados "empates" para impedir o desmatamento de áreas de seringais, atuação que resultou em seu assassinato em dezembro de 1988, em Xapuri, no Acre, crime que teve grande repercussão nacional e internacional para a causa ambientalista. Exemplo: o legado de Chico Mendes influenciou a criação de reservas extrativistas no Acre e em outras regiões da Amazônia.$q$,
  jsonb_build_array(jsonb_build_object('title','História do Acre — Chico Mendes','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-08',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Bioma e hidrografia do Acre',
  $q$Julgue o item a seguir, com base na geografia do Acre.
O bioma predominante no estado do Acre é a Floresta Amazônica, caracterizada por grande biodiversidade, clima equatorial quente e úmido, e importantes bacias hidrográficas, como os rios Acre, Juruá e Purus.$q$,
  'C',
  $q$Certo. O território acreano está inserido quase integralmente no bioma Amazônia, apresentando clima equatorial, elevada pluviosidade e densa cobertura florestal, com destaque para a rede hidrográfica formada pelos rios Acre, Juruá e Purus, historicamente utilizados como vias de transporte e povoamento da região, além de sustentarem grande diversidade de fauna e flora. Exemplo: o rio Juruá, um dos principais rios do estado, é utilizado tanto para navegação quanto como fonte de subsistência para comunidades ribeirinhas.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Bioma e hidrografia','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-01',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Área de transferência (clipboard)',
  $q$Julgue o item a seguir, com base em noções de informática.
A área de transferência é um recurso do sistema operacional que armazena temporariamente dados copiados ou recortados, permitindo que sejam colados posteriormente em outro local do mesmo documento, em outro arquivo, ou em outro aplicativo.$q$,
  'C',
  $q$Certo. A área de transferência (clipboard) funciona como um espaço de memória temporária que retém o último conteúdo copiado ou recortado pelo usuário, viabilizando sua colagem em diferentes contextos, dentro do mesmo programa ou entre programas distintos, sendo esse recurso essencial para operações básicas de edição de textos, planilhas e outros documentos digitais. Exemplo: um texto copiado de um documento do Word pode ser colado diretamente em uma planilha do Excel, graças à área de transferência.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Área de transferência','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-02',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Diferença entre copiar e recortar',
  $q$Julgue o item a seguir, com base em noções de informática.
Ao copiar um item, o original permanece no local de origem e uma cópia é enviada à área de transferência; ao recortar, o item é removido do local de origem e enviado à área de transferência, sendo, em ambos os casos, possível colá-lo posteriormente em outro local.$q$,
  'C',
  $q$Certo. As operações de copiar e recortar diferem quanto ao destino do item original: copiar duplica o conteúdo, mantendo-o inalterado no local de origem, enquanto recortar remove o item de onde estava, deixando-o disponível apenas na área de transferência até que seja colado em outro lugar, encerrando, com a colagem, o ciclo de transferência do conteúdo. Exemplo: ao recortar um parágrafo de um documento, ele desaparece do texto original até ser colado em outro ponto; ao copiá-lo, ele permanece no texto original e também pode ser colado em outro local.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Copiar e recortar','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-03',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Navegadores — favoritos e marcadores',
  $q$Julgue o item a seguir, com base em noções de informática.
Os navegadores de internet permitem salvar endereços de páginas frequentemente acessadas na lista de favoritos (ou marcadores), possibilitando acesso rápido a esses sites sem a necessidade de digitar o endereço completo novamente.$q$,
  'C',
  $q$Certo. A funcionalidade de favoritos (ou marcadores), presente nos principais navegadores de internet, permite ao usuário salvar o endereço de páginas de interesse frequente, organizando-as, inclusive, em pastas temáticas, e acessando-as posteriormente com poucos cliques, sem a necessidade de digitar novamente o endereço completo (URL) da página. Exemplo: um servidor pode salvar como favorito o endereço do sistema interno de consulta processual, acessando-o rapidamente sempre que necessário.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Navegadores de internet','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-04',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Extensão de arquivo .docx',
  $q$Julgue o item a seguir, com base em noções de informática.
A extensão .docx é utilizada por documentos criados em processadores de texto compatíveis com o formato Office Open XML, como o Microsoft Word a partir da versão 2007, substituindo o formato binário .doc utilizado em versões anteriores do programa.$q$,
  'C',
  $q$Certo. A partir da versão 2007 do Microsoft Word, o formato padrão de salvamento passou a ser o .docx, baseado no padrão aberto Office Open XML, que oferece vantagens como menor tamanho de arquivo e maior interoperabilidade, em substituição ao formato binário proprietário .doc utilizado nas versões anteriores do programa. Exemplo: um documento salvo em .docx pode, em geral, ser aberto por diferentes programas compatíveis com esse padrão, não apenas pelo Microsoft Word.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Formatos de arquivo de texto','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-05',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Planilha eletrônica — função SOMA',
  $q$Julgue o item a seguir, com base em noções de informática.
Em planilhas eletrônicas, a função SOMA permite somar automaticamente os valores contidos em um intervalo de células selecionado, sendo uma das funções mais básicas e utilizadas para cálculos em planilhas.$q$,
  'C',
  $q$Certo. A função SOMA é uma das funções matemáticas mais elementares e amplamente utilizadas em planilhas eletrônicas, permitindo ao usuário calcular automaticamente o total de valores numéricos contidos em um intervalo de células especificado, evitando a necessidade de somar manualmente cada valor individualmente. Exemplo: a fórmula "=SOMA(A1:A10)" soma automaticamente todos os valores numéricos contidos nas células de A1 até A10.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Planilhas eletrônicas','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-06',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Antivírus — atualização de assinaturas',
  $q$Julgue o item a seguir, com base em noções de informática.
Os programas antivírus dependem da atualização periódica de seu banco de assinaturas (definições de vírus) para reconhecer e neutralizar ameaças recém-descobertas, sendo recomendável manter essa atualização sempre em dia.$q$,
  'C',
  $q$Certo. Os antivírus tradicionais identificam ameaças, em grande medida, comparando arquivos e comportamentos com um banco de dados de assinaturas conhecidas, de modo que a atualização frequente desse banco é essencial para que o programa consiga detectar malwares recém-criados, sendo um antivírus desatualizado significativamente menos eficaz na proteção do sistema. Exemplo: um computador com antivírus desatualizado pode não detectar um vírus criado recentemente, mesmo que o programa esteja instalado e em execução.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Antivírus','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-01',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Acentuação de proparoxítonas',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Todas as palavras proparoxítonas são acentuadas graficamente, independentemente da letra em que terminam, regra que não comporta exceção na língua portuguesa.$q$,
  'C',
  $q$Certo. A regra de acentuação das proparoxítonas é uma das mais simples e absolutas do sistema ortográfico da língua portuguesa: todas elas recebem acento gráfico, sem qualquer exceção relacionada à terminação da palavra, diferentemente das regras aplicáveis às oxítonas e paroxítonas, que variam conforme a terminação. Exemplo: palavras como "público", "árvore" e "última" são sempre acentuadas por serem proparoxítonas, independentemente de suas terminações distintas.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Acentuação gráfica','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-02',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Verbo impessoal "haver" no sentido de existir',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O verbo "haver", quando empregado no sentido de "existir", é impessoal e, por isso, permanece na terceira pessoa do singular, não devendo concordar com o termo que o segue.$q$,
  'C',
  $q$Certo. Na norma-padrão, o verbo "haver" no sentido de "existir" é impessoal, não possuindo sujeito e permanecendo invariável na terceira pessoa do singular, ainda que o termo que o segue esteja no plural, sendo considerada inadequada, por essa razão, sua flexão no plural nesse emprego específico. Exemplo: escreve-se corretamente "Havia muitos detentos no pátio" (verbo invariável), sendo inadequado, na norma-padrão, "Haviam muitos detentos no pátio".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Verbos impessoais','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-03',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Regência nominal — "obediente a"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O adjetivo "obediente" rege a preposição "a", como em "obediente às normas", devendo o complemento nominal ser introduzido por essa preposição na norma-padrão.$q$,
  'C',
  $q$Certo. Assim como diversos outros adjetivos, "obediente" exige complemento nominal introduzido pela preposição "a" na norma-padrão da língua, regência que deve ser observada especialmente em textos formais e técnicos, como relatórios e documentos oficiais. Exemplo: "O servidor mostrou-se obediente às determinações superiores" emprega corretamente a regência do adjetivo "obediente" com a preposição "a".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Regência nominal','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-04',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Ambiguidade textual',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A ambiguidade ocorre quando uma construção linguística permite mais de uma interpretação, podendo comprometer a clareza do texto, sendo, em geral, um recurso a ser evitado em textos técnicos e oficiais.$q$,
  'C',
  $q$Certo. A ambiguidade (ou anfibologia) surge quando a estrutura sintática ou o uso de determinadas palavras permite duas ou mais leituras possíveis para uma mesma frase, o que compromete a objetividade exigida em textos técnicos, jurídicos e administrativos, sendo, por isso, recomendável sua eliminação por meio de reformulação da frase, embora possa ser explorada intencionalmente em contextos literários ou publicitários. Exemplo: a frase "o policial viu o suspeito com o binóculo" é ambígua, pois não deixa claro se foi o policial ou o suspeito quem estava com o binóculo, exigindo reformulação em um relatório oficial.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Ambiguidade e clareza textual','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-05',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Sinônimos e antônimos',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Sinônimos são palavras de significados iguais ou muito semelhantes entre si, podendo ser empregadas em substituição uma à outra sem grande alteração de sentido, enquanto antônimos são palavras de significados opostos.$q$,
  'C',
  $q$Certo. Sinônimos são palavras que compartilham significados equivalentes ou muito próximos, permitindo sua substituição em um texto sem comprometer significativamente o sentido original, embora possam existir nuances de uso e registro entre eles, enquanto antônimos representam a relação semântica de oposição entre duas palavras. Exemplo: "custódia" e "guarda" podem funcionar como sinônimos em determinados contextos jurídicos, enquanto "liberdade" e "cárcere" constituem um par de antônimos.$q$,
  jsonb_build_array(jsonb_build_object('title','Semântica — Sinônimos e antônimos','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-06',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Paragrafação e organização textual',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Cada parágrafo deve, em regra, desenvolver uma única ideia central, articulada de forma coesa e coerente com os demais parágrafos do texto, contribuindo para a clareza e a progressão temática da argumentação.$q$,
  'C',
  $q$Certo. A boa organização textual recomenda que cada parágrafo seja estruturado em torno de uma ideia-núcleo, desenvolvida de forma clara e conectada logicamente aos parágrafos anteriores e posteriores, o que assegura a coesão (ligação formal entre as partes do texto) e a coerência (sentido lógico global), elementos fundamentais para a compreensão de textos técnicos, relatórios e comunicações oficiais. Exemplo: um relatório de ocorrência bem redigido organiza cada parágrafo em torno de uma etapa distinta dos fatos narrados, facilitando a compreensão cronológica do evento.$q$,
  jsonb_build_array(jsonb_build_object('title','Linguística textual — Paragrafação','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
);
