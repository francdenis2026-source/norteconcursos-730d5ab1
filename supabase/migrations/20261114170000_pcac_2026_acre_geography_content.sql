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
  }
]
$acre_seed$::jsonb) as seed(
 slug text, discipline text, topic_label text, sort_order integer, title text, summary text, body_md text,
 contest_name text, syllabus_topic_order integer, source_note text, legal_basis jsonb, law_version_checked_at timestamptz,
 legal_review jsonb, content_status text, flashcards jsonb, quiz jsonb
)
on conflict (slug) do nothing;
