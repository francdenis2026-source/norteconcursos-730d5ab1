-- Materiais complementares de Realidade do Acre, com fonte oficial e seed idempotente.
insert into public.study_materials
(slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz)
select slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz
from jsonb_to_recordset($acre_seed$
[
  {
    "quiz": [
      {
        "a": true,
        "q": "O Acre integra o fuso UTC−5 e fica duas horas atrás de Brasília.",
        "why": "A Lei nº 12.876/2013 restabeleceu o quarto fuso, Greenwich menos cinco horas."
      },
      {
        "a": false,
        "q": "O Acre está no mesmo fuso horário de Brasília.",
        "why": "Brasília está em UTC−3 e o Acre em UTC−5."
      },
      {
        "a": true,
        "q": "As bacias do Juruá e do Purus integram a Bacia Amazônica.",
        "why": "Ambas drenam para o sistema amazônico e são afluentes da margem direita do Solimões."
      },
      {
        "a": false,
        "q": "A Serra do Divisor está no extremo leste do Acre, distante da fronteira peruana.",
        "why": "Fica no extremo oeste, junto à fronteira com o Peru."
      },
      {
        "a": true,
        "q": "O clima predominante do Acre é equatorial quente e úmido.",
        "why": "É a caracterização geral do Zoneamento Ecológico-Econômico."
      },
      {
        "a": true,
        "q": "O ZEE do Acre destaca Floresta Tropical Aberta e Floresta Tropical Densa.",
        "why": "São as duas formações florestais gerais descritas no documento."
      },
      {
        "a": false,
        "q": "Terra indígena e unidade de conservação são categorias jurídicas idênticas.",
        "why": "São categorias distintas de áreas protegidas."
      },
      {
        "a": true,
        "q": "A BR-364 conecta Rio Branco ao Vale do Juruá, enquanto a BR-317 integra o corredor até Assis Brasil e a fronteira peruana.",
        "why": "São os eixos rodoviários federais de integração regional e internacional."
      }
    ],
    "slug": "pcac-2026-realidade-acre-geografia-fuso-bacias-relevo",
    "title": "Geografia do Acre: fuso, bacias, relevo, clima, UCs e transportes",
    "body_md": "# Geografia do Acre — fuso, hidrografia, relevo, clima, vegetação e transportes\n\n## 1. Localização e fuso horário\nO Acre está no extremo sudoeste da Região Norte, na Amazônia brasileira, com fronteiras internacionais com Peru e Bolívia e fronteiras nacionais com Amazonas e Rondônia. O estado possui 22 municípios.\n\nO Acre integra o quarto fuso horário legal brasileiro, correspondente a Greenwich menos cinco horas (UTC−5). Em relação a Brasília (UTC−3), a diferença é de duas horas. A Lei Federal nº 12.876/2013 restabeleceu esse fuso e revogou a alteração de 2008.\n\n## 2. Hidrografia\nA drenagem estadual integra a Bacia Amazônica. No recorte hidrográfico regional, destacam-se as bacias do Juruá e do Purus, cujos rios são afluentes da margem direita do Solimões. Entre os principais cursos d'água estão Juruá, Purus, Acre, Iaco, Tarauacá, Envira, Muru e Moa.\n\nOs rios têm importância para abastecimento, pesca, transporte de pessoas e mercadorias e formação histórica de povoamentos ribeirinhos. As condições de navegação variam conforme o trecho e a estação do ano.\n\n## 3. Relevo\nPredominam formas de relevo baixas e suavemente onduladas, associadas a rochas e sedimentos da Bacia Amazônica. As altitudes tendem a diminuir em direção ao leste, enquanto no extremo oeste se destaca a Serra do Divisor, na fronteira com o Peru.\n\nO Zoneamento Ecológico-Econômico do Acre (SEMA, Fase II) registra a Serra do Divisor como setor de maior altitude do estado. Há divergência entre publicações quanto à cota máxima indicada; para questão que cobre valor numérico, confira a referência expressa no enunciado.\n\n## 4. Clima e vegetação\nPredomina o clima equatorial quente e úmido, com temperaturas elevadas, umidade alta e chuvas abundantes. Em termos gerais, há período mais chuvoso e período relativamente mais seco; a ocorrência de friagens pode provocar quedas temporárias de temperatura.\n\nA cobertura vegetal pertence ao domínio amazônico, com formações florestais classificadas no ZEE como Floresta Tropical Aberta e Floresta Tropical Densa. A composição varia conforme relevo, solos, drenagem e condições locais.\n\n## 5. Unidades de conservação e áreas protegidas\nO Acre possui unidades de conservação federais, estaduais e municipais, de Proteção Integral e de Uso Sustentável. Entre exemplos relevantes:\n- Proteção Integral: Parque Nacional da Serra do Divisor, Parque Estadual Chandless e Estação Ecológica Rio Acre.\n- Uso sustentável: Reservas Extrativistas Chico Mendes, Alto Juruá, Cazumbá-Iracema, Alto Tarauacá e Riozinho da Liberdade; florestas nacionais e estaduais; APAs e ARIEs.\n\nA SEMA mantém a relação estadual atualizada. Não confunda unidade de conservação com terra indígena: são categorias distintas, embora ambas componham áreas protegidas.\n\n## 6. Transportes e integração regional\nA BR-364 é o principal eixo rodoviário longitudinal, conectando Rio Branco ao Vale do Juruá e ao interior. A BR-317, conhecida como Estrada do Pacífico/Interoceânica, conecta a região de Rio Branco a Assis Brasil e à fronteira com o Peru, integrando-se a rotas internacionais.\n\nA rede hidroviária permanece importante para localidades ribeirinhas e municípios com acesso terrestre limitado. O transporte aéreo complementa a integração de municípios mais isolados. As condições das rodovias variam ao longo do ano e devem ser tratadas como dado mutável.\n\n## 7. Pegadinhas\n- Acre: UTC−5; Brasília: UTC−3; diferença de duas horas.\n- Ayacucho (1867) e Petrópolis (1903) são tratados diferentes.\n- Juruá e Purus são as duas grandes bacias de referência regional; ambas integram a Bacia Amazônica.\n- Serra do Divisor fica no extremo oeste, junto à fronteira peruana.\n- BR-364 é o eixo Rio Branco–Juruá; BR-317 é o corredor do Pacífico até Assis Brasil.\n- Unidades de conservação e terras indígenas não são a mesma categoria.\n",
    "summary": "Fuso horário UTC−5, bacias do Juruá e Purus, Serra do Divisor, clima equatorial, vegetação amazônica, unidades de conservação e integração rodoviária.",
    "discipline": "Realidade do Estado do Acre",
    "flashcards": [
      {
        "b": "UTC−5 (Greenwich menos cinco horas), duas horas atrás de Brasília (UTC−3).",
        "f": "Qual é o fuso horário legal do Acre?"
      },
      {
        "b": "Lei Federal nº 12.876/2013, que alterou o Decreto nº 2.784/1913 e revogou a Lei nº 11.662/2008.",
        "f": "Qual lei restabeleceu o fuso UTC−5 do Acre?"
      },
      {
        "b": "Juruá e Purus, integrantes da Bacia Amazônica.",
        "f": "Quais são as duas grandes bacias hidrográficas de referência regional do Acre?"
      },
      {
        "b": "No extremo oeste do Acre, junto à fronteira com o Peru.",
        "f": "Onde se localiza a Serra do Divisor?"
      },
      {
        "b": "Equatorial quente e úmido, com temperaturas elevadas, umidade alta e chuvas abundantes.",
        "f": "Qual é o tipo climático predominante no Acre?"
      },
      {
        "b": "Floresta Tropical Aberta e Floresta Tropical Densa.",
        "f": "Quais formações florestais o ZEE destaca?"
      },
      {
        "b": "Parque Nacional da Serra do Divisor, Parque Estadual Chandless e Estação Ecológica Rio Acre.",
        "f": "Cite três unidades de conservação de Proteção Integral no Acre."
      },
      {
        "b": "BR-364 (Rio Branco ao Vale do Juruá) e BR-317 (corredor do Pacífico até Assis Brasil).",
        "f": "Quais rodovias federais são importantes para a integração do Acre?"
      }
    ],
    "sort_order": 5,
    "legal_basis": [
      "Lei Federal nº 12.876/2013",
      "Decreto Federal nº 2.784/1913",
      "Lei Estadual nº 3.883/2021 (SEANP/AC)"
    ],
    "source_note": "SEMA/AC — Zoneamento Ecológico-Econômico Fase II; Lei Federal nº 12.876/2013; SEMA — Unidades de Conservação; SEPLAN — Diagnóstico socioeconômico do Acre.",
    "topic_label": "Geografia do Acre — fuso, hidrografia, relevo, clima, vegetação e transportes",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 2,
    "law_version_checked_at": "2026-11-14T19:55:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "O Tratado de Ayacucho foi firmado em 1867 entre Brasil e Bolívia.",
        "why": "O tratado foi assinado em 27 de março de 1867."
      },
      {
        "a": true,
        "q": "O art. 2º do Tratado de Ayacucho adotou o princípio do uti possidetis.",
        "why": "O princípio foi expressamente indicado como base para a determinação da fronteira."
      },
      {
        "a": false,
        "q": "O Tratado de Ayacucho reconheceu o atual Acre como território brasileiro.",
        "why": "Na delimitação de 1867, a região ficou do lado boliviano."
      },
      {
        "a": true,
        "q": "A expansão da borracha atraiu migrantes brasileiros para os vales do Purus e do Juruá.",
        "why": "A economia da borracha impulsionou a ocupação brasileira."
      },
      {
        "a": false,
        "q": "A Revolução Acreana começou em 1903, depois do Tratado de Petrópolis.",
        "why": "A revolução começou em 1902; o Tratado de Petrópolis foi assinado em 1903."
      },
      {
        "a": true,
        "q": "O Tratado de Petrópolis foi assinado em 17 de novembro de 1903.",
        "why": "É a data de assinatura do tratado que resolveu diplomaticamente a questão."
      }
    ],
    "slug": "pcac-2026-realidade-acre-tratado-ayacucho-formacao-historica",
    "title": "Formação histórica do Acre: Ayacucho, borracha e Petrópolis",
    "body_md": "# Formação histórica do Acre — Tratado de Ayacucho e questão acreana\n\n## 1. Tratado de Ayacucho (1867)\nO Tratado de Amizade, Limites, Navegação, Comércio e Extradição entre Brasil e Bolívia foi assinado em 27 de março de 1867, em La Paz de Ayacucho. O art. 2º adotou o princípio do uti possidetis como base para definir a fronteira. Na delimitação então negociada, a região do atual Acre ficou do lado boliviano.\n\nO acordo foi celebrado durante a Guerra do Paraguai e integrou a política diplomática do Império para organizar fronteiras e relações com a Bolívia. A demarcação da fronteira amazônica enfrentou dificuldades, inclusive pela incerteza sobre as nascentes do rio Javari.\n\n## 2. Ocupação e economia da borracha\nA partir da segunda metade do século XIX, migrantes brasileiros, especialmente nordestinos, avançaram pelos vales dos rios Purus e Juruá para trabalhar na extração da borracha. A expansão da atividade seringueira e o crescimento da população brasileira no território ampliaram a tensão com a soberania boliviana.\n\nO governo boliviano concedeu direitos de exploração e administração à empresa Bolivian Syndicate, o que agravou o conflito político e econômico. A resistência local culminou na Revolução Acreana, liderada por Plácido de Castro a partir de 1902.\n\n## 3. Tratado de Petrópolis (1903)\nO Tratado de Petrópolis, assinado em 17 de novembro de 1903, solucionou diplomaticamente a questão entre Brasil e Bolívia. O Brasil recebeu o território do Acre e assumiu compromissos de compensação financeira e de construção da Estrada de Ferro Madeira-Mamoré, além de ajustes territoriais.\n\n## 4. Sequência para memorizar\n- 1867: Tratado de Ayacucho — fronteira com base no uti possidetis; atual Acre situado na área boliviana.\n- Fim do século XIX: expansão dos seringais e migração brasileira pelos vales do Purus e Juruá.\n- 1902: início da Revolução Acreana.\n- 1903: Tratado de Petrópolis — incorporação do Acre ao Brasil.\n- 1904: organização do Território Federal do Acre.\n- 1962: elevação do Território a Estado pela Lei nº 4.070/1962.\n\n## 5. Pegadinhas\n- Ayacucho é de 1867; Petrópolis é de 1903.\n- Ayacucho adotou o uti possidetis para a definição dos limites.\n- A assinatura de Ayacucho não incorporou o Acre ao Brasil; na delimitação da época, a região ficou sob soberania boliviana.\n- A solução final da questão acreana ocorreu pelo Tratado de Petrópolis, não pelo Tratado de Ayacucho.\n",
    "summary": "Tratado de Ayacucho de 1867, uti possidetis, ocupação seringueira, Revolução Acreana e Tratado de Petrópolis.",
    "discipline": "Realidade do Estado do Acre",
    "flashcards": [
      {
        "b": "Em 27 de março de 1867, entre o Império do Brasil e a República da Bolívia.",
        "f": "Quando e entre quais países foi assinado o Tratado de Ayacucho?"
      },
      {
        "b": "Uti possidetis.",
        "f": "Qual princípio o art. 2º do Tratado de Ayacucho adotou para definir a fronteira?"
      },
      {
        "b": "Não. Na delimitação então estabelecida, o atual Acre ficou do lado boliviano.",
        "f": "O Tratado de Ayacucho incorporou o Acre ao Brasil?"
      },
      {
        "b": "A extração da borracha nos vales dos rios Purus e Juruá.",
        "f": "Qual atividade econômica atraiu migrantes brasileiros para o Acre no fim do século XIX?"
      },
      {
        "b": "Em 1902, liderada por Plácido de Castro.",
        "f": "Quando começou a Revolução Acreana?"
      },
      {
        "b": "O Tratado de Petrópolis, assinado em 17 de novembro de 1903.",
        "f": "Qual tratado resolveu diplomaticamente a questão acreana em 1903?"
      }
    ],
    "sort_order": 4,
    "legal_basis": [
      "Tratado de Amizade, Limites, Navegação, Comércio e Extradição Brasil–Bolívia (1867)",
      "Decreto Imperial nº 4.280/1868",
      "Tratado de Petrópolis (1903)"
    ],
    "source_note": "Câmara dos Deputados, Decreto nº 4.280/1868 (texto original do Tratado de Ayacucho); SEPLAN Acre — Rota de Integração, 1867.",
    "topic_label": "História do Acre — Tratado de Ayacucho e questão acreana",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T19:55:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "A Constituição do Acre estabelece os Poderes Legislativo, Executivo e Judiciário como independentes e harmônicos.",
        "why": "É o art. 6º da Constituição Estadual."
      },
      {
        "a": false,
        "q": "A capital do Estado do Acre é Cruzeiro do Sul.",
        "why": "A capital é Rio Branco, conforme art. 7º."
      },
      {
        "a": true,
        "q": "O art. 2º da Constituição Estadual menciona os Tratados de Petrópolis de 1903 e do Rio de Janeiro de 1909.",
        "why": "São referências expressas aos limites estaduais."
      },
      {
        "a": true,
        "q": "O Acre possui 22 municípios.",
        "why": "Informação constante do IBGE Cidades e Estados."
      },
      {
        "a": false,
        "q": "A população censitária de 2022 e a estimativa de 2026 são indicadores intercambiáveis.",
        "why": "Censo e estimativa são medidas diferentes e têm anos de referência próprios."
      },
      {
        "a": true,
        "q": "A FUNAI informou em novembro de 2026 que a FPE Envira acompanhava oito registros, seis confirmados e dois em estudo.",
        "why": "É o recorte informado na notícia oficial de 05/11/2026."
      },
      {
        "a": false,
        "q": "Povos de recente contato são necessariamente povos sem qualquer relação com a sociedade nacional.",
        "why": "A FUNAI os caracteriza por relações permanentes ou intermitentes com a sociedade nacional, mantendo autonomia."
      },
      {
        "a": true,
        "q": "A proteção dos povos isolados respeita a decisão de permanecer em isolamento e evita promover contato forçado.",
        "why": "É princípio da política de proteção da FUNAI."
      }
    ],
    "slug": "pcac-2026-realidade-acre-constituicao-indigenas-indicadores",
    "title": "Acre: Constituição Estadual, povos indígenas e indicadores sociais",
    "body_md": "# Acre: Constituição Estadual, povos indígenas e indicadores sociais\n\n## 1. Constituição do Estado do Acre\nO art. 1º define o Acre como parte integrante da República Federativa do Brasil, com autonomia e organização regidas pela Constituição Estadual e pelas leis que adotar. O art. 2º remete aos limites definidos pelo Tratado de Petrópolis (1903), pelo Tratado do Rio de Janeiro (1909) e pelo art. 12, § 5º, do ADCT da Constituição Federal.\n\nO art. 6º estabelece três Poderes estaduais — Legislativo, Executivo e Judiciário — independentes e harmônicos entre si. Em regra, é vedada a delegação de atribuições entre Poderes e quem exerce função de um Poder não pode exercer a de outro. O art. 7º estabelece Rio Branco como capital, admitindo transferência temporária nas condições constitucionais.\n\nO art. 45 trata de matérias sobre as quais a Assembleia Legislativa legisla com sanção do Governador, incluindo matérias de competência estadual, criação de cargos, tributos, orçamento e efetivos das forças de segurança, nos termos da redação vigente.\n\n## 2. Povos indígenas e proteção de grupos isolados\nO Acre abriga povos indígenas com diferentes histórias de contato, línguas, formas de organização e territórios tradicionais. A Fundação Nacional dos Povos Indígenas (FUNAI) atua no monitoramento e proteção territorial de povos isolados e de recente contato.\n\nA Frente de Proteção Etnoambiental Envira realiza ações de monitoramento no Acre, por meios terrestres, aéreos e sensoriamento remoto. Em notícia publicada em 05/11/2026, a FUNAI informou que a FPE Envira acompanhava oito registros: seis referências confirmadas e duas em estudo.\n\nA política de proteção respeita a decisão de permanecer em isolamento e evita promover contato forçado. Povos de recente contato são categoria distinta: mantêm relações permanentes ou intermitentes com a sociedade nacional, mas preservam formas próprias de organização e autonomia.\n\n## 3. Indicadores demográficos e sociais\nSegundo o IBGE Cidades e Estados, o Acre possui 22 municípios e área territorial de 164.064,761 km² (referência de 2025). No Censo 2022, registrou 830.018 habitantes e densidade demográfica de 5,06 hab./km². A estimativa populacional para 2026 é de 887.794 habitantes. O IDH informado na página estadual é 0,71 (2021).\n\n**Atenção à data:** população censitária, estimativa, área, renda e IDH são indicadores com anos de referência distintos. Sempre identifique o ano ao memorizar um número; não trate estimativa como resultado censitário.\n\n## 4. Pegadinhas\n- Os Poderes estaduais são Legislativo, Executivo e Judiciário; independentes e harmônicos.\n- Rio Branco é a capital do Acre.\n- Os limites estaduais remetem a Petrópolis (1903) e ao Tratado do Rio de Janeiro (1909).\n- Povos isolados e povos de recente contato não são categorias equivalentes.\n- A contagem de registros monitorados pela FUNAI é dinâmica; os oito registros da FPE Envira são o recorte publicado em novembro de 2026.\n- A população do Censo 2022 (830.018) não é a mesma coisa que a estimativa do IBGE para 2026 (887.794).\n",
    "summary": "Organização dos Poderes estaduais, povos isolados e de recente contato, indicadores demográficos e sociais com ano de referência.",
    "discipline": "Realidade do Estado do Acre",
    "flashcards": [
      {
        "b": "Legislativo, Executivo e Judiciário, independentes e harmônicos entre si.",
        "f": "Quais são os três Poderes do Estado do Acre segundo o art. 6º da Constituição Estadual?"
      },
      {
        "b": "Rio Branco, conforme art. 7º da Constituição Estadual.",
        "f": "Qual é a capital do Estado do Acre?"
      },
      {
        "b": "Tratado de Petrópolis de 1903 e Tratado do Rio de Janeiro de 1909, além do art. 12, § 5º, do ADCT da Constituição Federal.",
        "f": "Quais tratados são mencionados no art. 2º como referência dos limites do Acre?"
      },
      {
        "b": "22 municípios.",
        "f": "Quantos municípios possui o Acre?"
      },
      {
        "b": "830.018 habitantes; densidade de 5,06 hab./km².",
        "f": "Qual foi a população do Acre no Censo 2022?"
      },
      {
        "b": "887.794 habitantes, conforme IBGE Cidades e Estados consultado em 14/11/2026.",
        "f": "Qual estimativa populacional do IBGE para o Acre em 2026?"
      },
      {
        "b": "Oito registros: seis referências confirmadas e duas em estudo.",
        "f": "O que a FUNAI informou em novembro de 2026 sobre registros monitorados pela FPE Envira?"
      },
      {
        "b": "Isolados mantêm decisão de não estabelecer contato; os de recente contato mantêm relações permanentes ou intermitentes, preservando autonomia e formas próprias de organização.",
        "f": "Qual a diferença entre povos isolados e povos de recente contato?"
      }
    ],
    "sort_order": 6,
    "legal_basis": [
      "Constituição do Estado do Acre",
      "Lei Complementar nº 126/2003",
      "Lei Federal nº 12.876/2013"
    ],
    "source_note": "LEGIS — Constituição do Estado do Acre, texto compilado; FUNAI, notícia de monitoramento de povos isolados (05/11/2026); IBGE Cidades e Estados — Acre, consulta em 14/11/2026.",
    "topic_label": "Constituição estadual, povos indígenas e indicadores sociais",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 3,
    "law_version_checked_at": "2026-11-14T20:10:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "O Edital PC-AC 2026 define cinco regionais de desenvolvimento para fins de sua organização territorial.",
        "why": "O subitem 1.2.3 enumera Baixo Acre, Purus, Alto Acre, Envira e Juruá."
      },
      {
        "a": false,
        "q": "A regional do Baixo Acre possui cinco municípios.",
        "why": "São sete municípios."
      },
      {
        "a": true,
        "q": "Sena Madureira, Manoel Urbano e Santa Rosa do Purus integram a regional do Purus.",
        "why": "Essa é a composição expressa no subitem 1.2.3."
      },
      {
        "a": false,
        "q": "A regional do Juruá inclui Feijó e Jordão.",
        "why": "Feijó e Jordão pertencem à regional Envira; o Juruá inclui Cruzeiro do Sul, Rodrigues Alves, Mâncio Lima, Marechal Thaumaturgo e Porto Walter."
      },
      {
        "a": false,
        "q": "A divisão do edital em cinco regionais é idêntica às duas regiões intermediárias do IBGE.",
        "why": "São recortes diferentes: o edital lista cinco regionais; o IBGE 2017, duas intermediárias."
      },
      {
        "a": true,
        "q": "A BR-317 integra o corredor do Pacífico e alcança Assis Brasil, na fronteira com o Peru.",
        "why": "É a função da BR-317 no eixo de integração internacional."
      },
      {
        "a": true,
        "q": "O Acre possui 22 municípios distribuídos pelas cinco regionais do edital.",
        "why": "A soma das quantidades regionais é 7 + 3 + 4 + 3 + 5 = 22."
      }
    ],
    "slug": "pcac-2026-acre-municipios-fronteiras-integracao-regional",
    "title": "Acre: municípios, fronteiras e integração regional",
    "body_md": "# Acre: municípios, regionais, fronteiras e integração territorial\n\n## 1. Localização e limites\nO Acre está no extremo sudoeste da Região Norte, na Amazônia brasileira. Faz fronteira internacional com Peru e Bolívia e divisa estadual com Amazonas e Rondônia. A capital é Rio Branco. O estado possui 22 municípios.\n\nDiferencie:\n- **Fronteira internacional:** limite entre países, no caso Acre–Peru e Acre–Bolívia.\n- **Divisa estadual:** limite entre unidades da Federação, no caso Acre–Amazonas e Acre–Rondônia.\n- **Limite municipal:** separa territórios dos municípios acreanos.\n\n## 2. Regionais de desenvolvimento utilizadas no edital PC-AC 2026\nO subitem 1.2.3 do Edital nº 001 SEAD/PCAC, de 05/11/2026, define cinco regionais e seus municípios. Para questões sobre a regionalização do concurso, use esta divisão expressa no edital:\n\n| Regional | Municípios |\n|---|---|\n| **Baixo Acre** | Rio Branco, Plácido de Castro, Acrelândia, Senador Guiomard, Capixaba, Porto Acre e Bujari |\n| **Purus** | Sena Madureira, Manoel Urbano e Santa Rosa do Purus |\n| **Alto Acre** | Brasiléia, Epitaciolândia, Assis Brasil e Xapuri |\n| **Envira** | Tarauacá, Feijó e Jordão |\n| **Juruá** | Cruzeiro do Sul, Rodrigues Alves, Mâncio Lima, Marechal Thaumaturgo e Porto Walter |\n\nA distribuição totaliza 22 municípios: 7 + 3 + 4 + 3 + 5. O edital esclarece que, para vagas ofertadas por regional, a lotação poderá ocorrer em qualquer município integrante da respectiva regional.\n\n## 3. Não confunda regional do edital com divisão do IBGE\nHá diferentes recortes territoriais, com finalidades próprias:\n- **Regionais de desenvolvimento do edital:** cinco grupos (Baixo Acre, Purus, Alto Acre, Envira e Juruá), usados no contexto do concurso.\n- **Divisão regional vigente do IBGE (2017):** regiões geográficas intermediárias e imediatas. No Acre, as intermediárias são Rio Branco e Cruzeiro do Sul.\n- **Mesorregiões e microrregiões do IBGE (1989/1990):** divisão histórica, substituída pela regionalização de 2017.\n\nEm prova, identifique qual divisão o enunciado solicita. Não misture os nomes ou a quantidade de regiões de sistemas diferentes.\n\n## 4. Centros regionais e integração\nRio Branco concentra funções político-administrativas e serviços. Cruzeiro do Sul é polo importante do Vale do Juruá. A integração depende de rodovias, rios, aeroportos e redes de comunicação. Cheias, estiagens e condições sazonais podem alterar deslocamentos, custos logísticos e atendimento de comunidades isoladas.\n\nA BR-364 é o principal eixo rodoviário longitudinal, conectando Rio Branco ao Vale do Juruá. A BR-317, Estrada do Pacífico/Interoceânica, conecta a região de Rio Branco a Assis Brasil e à fronteira com o Peru. O transporte fluvial é essencial para localidades ribeirinhas e o transporte aéreo complementa a integração de áreas mais isoladas.\n\n## 5. Diversidade, economia e sustentabilidade\nO Acre abriga povos indígenas, populações tradicionais, seringueiros, ribeirinhos e habitantes urbanos. Evite generalizações. Terras indígenas e unidades de conservação são categorias territoriais distintas, ainda que ambas componham áreas protegidas.\n\nA economia articula extrativismo, produção agropecuária, comércio, serviços e administração pública. Desafios incluem logística, queimadas, desmatamento, regularização fundiária, conflitos pelo uso da terra e eventos climáticos extremos. Desenvolvimento sustentável procura compatibilizar atividade econômica, inclusão social e conservação ambiental.\n\n## 6. Pegadinhas de prova\n- O edital lista **cinco regionais** e seus **22 municípios**.\n- Baixo Acre tem 7 municípios; Purus, 3; Alto Acre, 4; Envira, 3; Juruá, 5.\n- A regionalização do edital não é a mesma coisa que as regiões intermediárias do IBGE (2017).\n- Rio Branco e Cruzeiro do Sul são as duas regiões intermediárias do IBGE no estado, não as cinco regionais do edital.\n- A BR-364 e a BR-317 têm funções de integração diferentes.\n- Fronteira internacional não é sinônimo de divisa estadual.\n",
    "summary": "Composição das cinco regionais do edital, 22 municípios, diferenças entre regionalizações do IBGE e integração fronteiriça.",
    "discipline": "Realidade do Estado do Acre",
    "flashcards": [
      {
        "b": "Cinco: Baixo Acre, Purus, Alto Acre, Envira e Juruá.",
        "f": "Quantas regionais de desenvolvimento o edital PC-AC 2026 define para o Acre?"
      },
      {
        "b": "Rio Branco, Plácido de Castro, Acrelândia, Senador Guiomard, Capixaba, Porto Acre e Bujari.",
        "f": "Quais municípios integram o Baixo Acre?"
      },
      {
        "b": "Sena Madureira, Manoel Urbano e Santa Rosa do Purus.",
        "f": "Quais municípios integram a regional do Purus?"
      },
      {
        "b": "Alto Acre: Brasiléia, Epitaciolândia, Assis Brasil e Xapuri. Envira: Tarauacá, Feijó e Jordão.",
        "f": "Quais municípios integram Alto Acre e Envira?"
      },
      {
        "b": "Cruzeiro do Sul, Rodrigues Alves, Mâncio Lima, Marechal Thaumaturgo e Porto Walter.",
        "f": "Quais municípios integram a regional do Juruá?"
      },
      {
        "b": "22 municípios: Baixo Acre 7, Purus 3, Alto Acre 4, Envira 3 e Juruá 5.",
        "f": "Quantos municípios existem no Acre e como se distribuem pelas regionais do edital?"
      },
      {
        "b": "Rio Branco e Cruzeiro do Sul.",
        "f": "Quais são as regiões geográficas intermediárias do IBGE no Acre desde 2017?"
      },
      {
        "b": "BR-364 conecta Rio Branco ao Vale do Juruá; BR-317 integra o corredor do Pacífico até Assis Brasil e a fronteira peruana.",
        "f": "Qual rodovia conecta Rio Branco ao Vale do Juruá e qual integra o corredor do Pacífico?"
      }
    ],
    "sort_order": 2,
    "legal_basis": [
      "IBGE — Cidades e Estados: Acre",
      "Governo do Estado do Acre — dados territoriais e regionais",
      "Constituição Federal, arts. 231 e 232"
    ],
    "source_note": "Edital nº 001 SEAD/PCAC, de 05/11/2026, subitem 1.2.3; IBGE, Divisão Regional do Brasil 2017; SEPLAN/AC, Diagnóstico socioeconômico.",
    "topic_label": "Municípios, fronteiras, infraestrutura e integração regional",
    "contest_name": "PC-AC 2026",
    "legal_review": null,
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": false,
        "q": "O Estado do Acre possui soberania própria, distinta da República Federativa do Brasil.",
        "why": "O Acre possui autonomia federativa, não soberania."
      },
      {
        "a": true,
        "q": "A EC estadual nº 63/2022 atualizou a redação do art. 131 da Constituição do Acre.",
        "why": "A emenda alterou a lista dos órgãos de segurança pública."
      },
      {
        "a": true,
        "q": "Na redação atual do art. 131, o Instituto Socioeducativo do Estado do Acre integra a lista de órgãos de segurança pública.",
        "why": "O inciso IV foi incluído pela EC nº 63/2022."
      },
      {
        "a": false,
        "q": "A Polícia Civil do Acre exerce, como regra constitucional, a apuração de infrações penais militares.",
        "why": "O art. 133 exclui as infrações militares e ressalva a competência da União."
      },
      {
        "a": true,
        "q": "O art. 134 prevê promoções na Polícia Civil pelo critério alternado de antiguidade e merecimento.",
        "why": "É a regra expressa do caput do art. 134."
      },
      {
        "a": true,
        "q": "O ingresso na classe inicial das carreiras policiais civis ocorre por concurso público de provas e títulos, com participação da OAB nas fases.",
        "why": "Regra prevista no art. 134, § 1º."
      },
      {
        "a": false,
        "q": "Qualquer pessoa aprovada em concurso pode exercer cargos policiais civis, mesmo sem integrar a respectiva carreira.",
        "why": "O art. 134, § 2º, reserva o exercício aos integrantes das respectivas carreiras."
      },
      {
        "a": false,
        "q": "A Constituição Estadual e a Lei Orgânica da Polícia Civil têm a mesma função normativa.",
        "why": "A Constituição estabelece normas constitucionais; a lei orgânica detalha estrutura e funcionamento institucional."
      }
    ],
    "slug": "pcac-2026-constitucional-constituicao-acre-policia-civil",
    "title": "Constituição do Estado do Acre: organização estadual e segurança pública",
    "body_md": "# Constituição do Estado do Acre: organização e segurança pública\n\n## 1. Autonomia e organização estadual\nO art. 1º estabelece que o Estado do Acre, com seus municípios, integra a República Federativa do Brasil e exerce os poderes decorrentes de sua autonomia. Autonomia não é soberania: o Estado deve respeitar a Constituição Federal e a repartição constitucional de competências.\n\nO art. 2º remete aos limites definidos pelo Tratado de Petrópolis (1903), pelo Tratado do Rio de Janeiro (1909) e pelo art. 12, § 5º, do ADCT da Constituição Federal.\n\nO art. 6º estabelece Legislativo, Executivo e Judiciário como Poderes estaduais independentes e harmônicos. O art. 7º define Rio Branco como capital do Estado.\n\n## 2. Segurança pública — art. 131\nA redação dada pela Emenda Constitucional estadual nº 63, de 22 de junho de 2022, dispõe que a segurança pública, voltada à preservação da ordem pública e da incolumidade das pessoas e do patrimônio, é exercida pelos seguintes órgãos:\n- Polícia Civil;\n- Polícia Militar e Corpo de Bombeiros Militar do Estado;\n- Polícia Penal;\n- Instituto Socioeducativo do Estado do Acre.\n\nAtenção à atualização: a EC nº 63/2022 alterou a lista do art. 131. Não reproduza como vigente a redação anterior que incluía agentes de trânsito ou apresentava o ISE em outro inciso.\n\n## 3. Polícia Civil — arts. 133 e 134\nO art. 133 caracteriza a Polícia Civil como instituição permanente do Poder Público, dirigida por Delegado de Polícia de carreira e organizada segundo hierarquia e disciplina. Ressalvada a competência da União, atribui-lhe as funções de polícia judiciária e a apuração das infrações penais em todo o território estadual, exceto as militares.\n\nO art. 134 estabelece estruturação em carreira e promoções pelo critério alternado de antiguidade e merecimento. O § 1º prevê ingresso na classe inicial mediante concurso público de provas e títulos, com participação da OAB em todas as fases; o § 2º reserva o exercício dos cargos policiais civis aos integrantes das respectivas carreiras. O § 3º disciplina o provimento dos cargos da carreira de Delegado, com os requisitos constitucionais ali indicados.\n\n## 4. Constituição Federal e legislação complementar\nO art. 144 da Constituição Federal é a referência nacional para a organização da segurança pública. A Constituição estadual deve ser lida em harmonia com esse dispositivo e com a Lei Federal nº 14.735/2023 (Lei Orgânica Nacional das Polícias Civis).\n\nNão confunda:\n- **Constituição Estadual:** organiza o Estado e fixa normas constitucionais estaduais.\n- **Lei Orgânica da Polícia Civil do Acre:** disciplina a estrutura, as funções institucionais e o regime jurídico da instituição, dentro dos limites constitucionais.\n- **Lei Orgânica Nacional das Polícias Civis:** estabelece normas gerais nacionais para as Polícias Civis.\n\n## 5. Pegadinhas\n- O Estado tem autonomia, não soberania.\n- O art. 131 foi atualizado pela EC estadual nº 63/2022.\n- O ISE integra a lista do art. 131 na redação atual.\n- A Polícia Civil não apura infrações penais militares como regra de sua competência constitucional.\n- Promoção na carreira da Polícia Civil: alternância entre antiguidade e merecimento.\n- Ingresso e exercício de cargos policiais civis devem observar as regras constitucionais e legais específicas.\n\n**Fonte de literalidade:** consulte o texto consolidado no Portal LEGIS do Acre e a Emenda Constitucional nº 63/2022. O portal é consultivo; para uso jurídico, prevalece a publicação oficial do ato.\n",
    "summary": "Texto atualizado dos arts. 1º, 2º, 6º, 7º, 131, 133 e 134 da Constituição do Acre, com destaque para a EC nº 63/2022 e a Polícia Civil.",
    "discipline": "Noções de Direito Constitucional",
    "flashcards": [
      {
        "b": "Não. Possui autonomia dentro da República Federativa do Brasil; a soberania pertence à República.",
        "f": "O Estado do Acre possui soberania?"
      },
      {
        "b": "Polícia Civil; Polícia Militar e Corpo de Bombeiros Militar; Polícia Penal; Instituto Socioeducativo do Estado do Acre.",
        "f": "Quais órgãos aparecem no art. 131 da Constituição do Acre após a EC nº 63/2022?"
      },
      {
        "b": "Emenda Constitucional estadual nº 63, de 22 de junho de 2022.",
        "f": "Qual emenda atualizou a lista de órgãos do art. 131?"
      },
      {
        "b": "Instituição permanente, dirigida por Delegado de Polícia de carreira; exerce polícia judiciária e apura infrações penais, exceto as militares, ressalvada a competência da União.",
        "f": "Como o art. 133 define a Polícia Civil do Acre e quais são suas funções?"
      },
      {
        "b": "Alternância entre antiguidade e merecimento.",
        "f": "Qual critério de promoção está previsto no art. 134?"
      },
      {
        "b": "Concurso público de provas e títulos, com participação da OAB em todas as fases.",
        "f": "Como ocorre o ingresso na classe inicial das carreiras policiais civis, segundo o art. 134, § 1º?"
      },
      {
        "b": "Os integrantes das respectivas carreiras.",
        "f": "Quem pode exercer cargos policiais civis, segundo o art. 134, § 2º?"
      },
      {
        "b": "A Constituição fixa normas constitucionais estaduais; a Lei Orgânica disciplina a estrutura, funções e regime da Polícia Civil dentro dos limites constitucionais.",
        "f": "Qual a diferença entre Constituição Estadual e Lei Orgânica da Polícia Civil?"
      }
    ],
    "sort_order": 3,
    "legal_basis": [
      "Constituição do Estado do Acre, arts. 1º, 2º, 6º, 7º, 131, 133 e 134",
      "Emenda Constitucional estadual nº 63/2022",
      "Constituição Federal, art. 144",
      "Lei Federal nº 14.735/2023"
    ],
    "source_note": "Constituição do Estado do Acre, texto consolidado no Portal LEGIS; Emenda Constitucional estadual nº 63/2022; Constituição Federal, art. 144; Lei Federal nº 14.735/2023.",
    "topic_label": "Constituição do Estado do Acre e organização da Polícia Civil",
    "contest_name": "PC-AC 2026",
    "legal_review": null,
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T23:30:00+00:00"
  }
]
$acre_seed$::jsonb) as seed(
 slug text, discipline text, topic_label text, sort_order integer, title text, summary text, body_md text,
 contest_name text, syllabus_topic_order integer, source_note text, legal_basis jsonb, law_version_checked_at timestamptz,
 legal_review jsonb, content_status text, flashcards jsonb, quiz jsonb
)
on conflict (slug) do update set body_md=excluded.body_md, summary=excluded.summary, source_note=excluded.source_note, legal_basis=excluded.legal_basis, law_version_checked_at=excluded.law_version_checked_at, flashcards=excluded.flashcards, quiz=excluded.quiz
where public.study_materials.slug in ('pcac-2026-acre-municipios-fronteiras-integracao-regional','pcac-2026-constitucional-constituicao-acre-policia-civil');
