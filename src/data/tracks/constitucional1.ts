import type { TrackLesson } from "./types";

/**
 * Direito Constitucional: tópicos recorrentes em editais policiais, com base na Constituição Federal de 1988.
 * Texto compilado oficial: Planalto (Constituição da República Federativa do Brasil). Confira sempre emendas recentes.
 */
export const CONSTITUCIONAL_1: TrackLesson[] = [
  {
    id: "cf-principios",
    group: "Princípios e direitos",
    title: "Princípios fundamentais (arts. 1º a 4º)",
    edital: "Princípios fundamentais da Constituição",
    simples: "O Brasil é uma República Federativa, formada pela união indissolúvel de Estados, Municípios e Distrito Federal, e é um Estado Democrático de Direito (art. 1º). Os fundamentos são a soberania, a cidadania, a dignidade da pessoa humana, os valores sociais do trabalho e da livre iniciativa e o pluralismo político. Os Poderes são Legislativo, Executivo e Judiciário, independentes e harmônicos (art. 2º).",
    pontos: ["Fundamentos (art. 1º): soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, pluralismo político.", "Objetivos (art. 3º): construir sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar a pobreza e reduzir desigualdades; promover o bem de todos.", "Todo o poder emana do povo (parágrafo único do art. 1º).", "Relações internacionais (art. 4º): independência nacional, prevalência dos direitos humanos, autodeterminação, não intervenção, igualdade entre os Estados, repúdio ao terrorismo e ao racismo, entre outros.", "A união dos entes federados é indissolúvel: não há direito de secessão."],
    exemplo: "Uma lei que pretendesse permitir a um Estado deixar a Federação seria incompatível com o art. 1º, que prevê a união indissolúvel.",
    atencao: ["Não confunda fundamentos (art. 1º) com objetivos (art. 3º): fundamentos são a base; objetivos são metas.", "O repúdio ao terrorismo e ao racismo é princípio das relações internacionais (art. 4º)."],
    quiz: [
      { q: "A dignidade da pessoa humana é um dos fundamentos da República Federativa do Brasil.", a: true, why: "Está no art. 1º, inciso III." },
      { q: "Construir uma sociedade livre, justa e solidária é um fundamento da República.", a: false, why: "É um objetivo fundamental, previsto no art. 3º, e não um fundamento do art. 1º." },
    ],
  },
  {
    id: "cf-direitos-individuais",
    group: "Princípios e direitos",
    title: "Direitos e garantias individuais (art. 5º)",
    edital: "Direitos e garantias fundamentais: direitos individuais e coletivos",
    simples: "O art. 5º garante a brasileiros e estrangeiros residentes a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade. Para a área policial, são centrais: a casa é asilo inviolável (só se entra por consentimento, em flagrante, desastre ou para prestar socorro, e, durante o dia, por determinação judicial); ninguém será preso senão em flagrante ou por ordem escrita e fundamentada de autoridade judiciária competente; e ninguém será considerado culpado antes do trânsito em julgado de sentença penal condenatória.",
    pontos: ["Presunção de inocência: até o trânsito em julgado (art. 5º, LVII).", "Prisão: em flagrante delito ou por ordem escrita e fundamentada da autoridade judiciária (art. 5º, LXI).", "Casa inviolável: consentimento, flagrante, desastre, socorro ou ordem judicial durante o dia (art. 5º, XI).", "Sigilo de comunicações: a violação telefônica só por ordem judicial, para investigação criminal ou instrução processual penal (art. 5º, XII).", "Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal (art. 5º, XXXIX).", "Tortura, tráfico, terrorismo e crimes hediondos: inafiançáveis e insuscetíveis de graça ou anistia (art. 5º, XLIII)."],
    exemplo: "Policiais podem entrar em uma casa à noite, sem ordem judicial, se houver flagrante de crime em andamento: a exceção constitucional vale para o dia e para a noite.",
    atencao: ["A ordem judicial para entrar em casa só vale durante o dia; flagrante, desastre e socorro valem a qualquer hora.", "A Constituição proíbe pena de morte (salvo em guerra declarada), de caráter perpétuo, de trabalhos forçados, de banimento e cruéis (art. 5º, XLVII)."],
    quiz: [
      { q: "A entrada na casa de alguém, sem consentimento, para cumprir mandado judicial pode ocorrer a qualquer hora do dia ou da noite.", a: false, why: "A determinação judicial só autoriza a entrada durante o dia; o flagrante, o desastre e o socorro valem a qualquer hora." },
      { q: "Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.", a: true, why: "É o princípio da presunção de inocência, previsto no art. 5º, LVII." },
    ],
  },
  {
    id: "cf-remedios",
    group: "Princípios e direitos",
    title: "Remédios constitucionais",
    edital: "Remédios constitucionais: habeas corpus, habeas data, mandado de segurança, mandado de injunção, ação popular",
    simples: "Remédios constitucionais são ações que protegem direitos fundamentais. O habeas corpus protege a liberdade de locomoção. O habeas data garante o acesso e a retificação de informações da própria pessoa em bancos de dados públicos. O mandado de segurança protege direito líquido e certo não amparado por habeas corpus nem habeas data. O mandado de injunção supre a falta de norma que inviabiliza o exercício de direitos. A ação popular anula ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural.",
    pontos: ["Habeas corpus: liberdade de locomoção, ameaçada ou violada por ilegalidade ou abuso de poder.", "Habeas data: conhecer, retificar ou anotar informações pessoais.", "Mandado de segurança: direito líquido e certo, individual ou coletivo.", "Mandado de injunção: falta de norma regulamentadora.", "Ação popular: qualquer cidadão pode propor; o autor fica isento de custas, salvo má-fé.", "Habeas corpus e habeas data são gratuitos."],
    exemplo: "Uma pessoa presa ilegalmente pode impetrar habeas corpus, e o pedido não depende de advogado nem de pagamento de custas.",
    atencao: ["Só o cidadão (quem está em dia com os direitos políticos) propõe ação popular.", "Mandado de segurança é residual: não cabe quando o caso é de habeas corpus ou habeas data."],
    quiz: [
      { q: "O habeas corpus protege a liberdade de locomoção.", a: true, why: "É a ação cabível quando alguém sofre ou está ameaçado de sofrer violência ou coação em sua liberdade de ir e vir." },
      { q: "O mandado de segurança protege a liberdade de locomoção.", a: false, why: "Para a liberdade de locomoção, o remédio é o habeas corpus." },
    ],
  },
  {
    id: "cf-sociais-nacionalidade",
    group: "Princípios e direitos",
    title: "Direitos sociais e nacionalidade",
    edital: "Direitos sociais; nacionalidade",
    simples: "Os direitos sociais estão no art. 6º: educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância e assistência aos desamparados. A nacionalidade define quem é brasileiro (art. 12). São brasileiros natos os nascidos no Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país, e os nascidos no estrangeiro de pai ou mãe brasileiros que estejam a serviço do Brasil, ou que sejam registrados em repartição brasileira competente, ou que venham residir no Brasil e optem pela nacionalidade a qualquer tempo depois da maioridade.",
    pontos: ["Direitos sociais (art. 6º): educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência, proteção à maternidade e infância, assistência aos desamparados.", "Brasileiro nato: nascido no Brasil (salvo pais estrangeiros a serviço de seu país) e filhos de brasileiros nas hipóteses do art. 12, I, b e c.", "Naturalizado: adquire a nacionalidade na forma da lei.", "Cargos privativos de brasileiro nato: Presidente e Vice, Presidentes da Câmara e do Senado, Ministro do STF, carreira diplomática, oficial das Forças Armadas e Ministro de Estado da Defesa (art. 12, § 3º).", "Brasileiro nato não pode ser extraditado; o naturalizado pode, nas hipóteses da Constituição (art. 5º, LI)."],
    exemplo: "Um filho de pais franceses, nascido no Brasil quando os pais trabalhavam em uma empresa privada, é brasileiro nato. Se os pais estivessem a serviço da França, ele não seria.",
    atencao: ["Não há distinção entre natos e naturalizados, salvo nas hipóteses da Constituição (art. 12, § 2º).", "O transporte e a alimentação foram incluídos no rol do art. 6º por emendas constitucionais."],
    quiz: [
      { q: "O cargo de Ministro do Supremo Tribunal Federal é privativo de brasileiro nato.", a: true, why: "Está no rol do art. 12, § 3º." },
      { q: "Todo nascido no Brasil é brasileiro nato, sem exceção.", a: false, why: "Não é nato o filho de estrangeiros que estejam a serviço de seu país." },
    ],
  },
  {
    id: "cf-politicos",
    group: "Princípios e direitos",
    title: "Direitos políticos",
    edital: "Direitos políticos",
    simples: "Direitos políticos são os que permitem participar do poder: votar e ser votado. O voto é obrigatório para os maiores de 18 anos e facultativo para os analfabetos, os maiores de 70 anos e os maiores de 16 e menores de 18 anos (art. 14). Para ser candidato, é preciso ter a idade mínima do cargo no momento da posse. Os estrangeiros não podem se alistar como eleitores, e os conscritos não podem alistar-se durante o serviço militar obrigatório.",
    pontos: ["Voto obrigatório: maiores de 18 anos.", "Voto facultativo: analfabetos, maiores de 70 e maiores de 16 e menores de 18.", "Idade mínima: 35 anos (Presidente, Vice e Senador), 30 (Governador e Vice), 21 (Deputado, Prefeito, Vice-Prefeito, juiz de paz) e 18 (Vereador).", "Reeleição: uma única vez para o mesmo cargo no período subsequente.", "Perda e suspensão dos direitos políticos: cassação é vedada; os casos incluem condenação criminal transitada em julgado, enquanto durarem os efeitos."],
    exemplo: "Uma pessoa de 17 anos pode votar se quiser, pois o voto é facultativo entre 16 e 18 anos, mas não pode ser candidata a Vereador, cuja idade mínima é 18.",
    atencao: ["Analfabetos podem votar, mas não são elegíveis.", "Perda ou suspensão dos direitos políticos é diferente de cassação, que é proibida."],
    quiz: [
      { q: "O voto é facultativo para os maiores de 70 anos.", a: true, why: "Está no art. 14, § 1º, II." },
      { q: "Os analfabetos são elegíveis.", a: false, why: "São inelegíveis (art. 14, § 4º), embora possam votar de forma facultativa." },
    ],
  },
  {
    id: "cf-organizacao",
    group: "Organização do Estado e dos Poderes",
    title: "Organização do Estado",
    edital: "Organização político-administrativa; União, Estados, Municípios e Distrito Federal",
    simples: "A organização político-administrativa compreende União, Estados, Distrito Federal e Municípios, todos autônomos (art. 18). Autonomia é a capacidade de se autogovernar, legislar e administrar dentro dos limites da Constituição. A capital federal é Brasília. A União, os Estados, o DF e os Municípios têm competências fixadas na Constituição: materiais (administrativas), que podem ser exclusivas (art. 21) ou comuns (art. 23), e legislativas, que podem ser privativas da União (art. 22) ou concorrentes (art. 24).",
    pontos: ["Entes federativos: União, Estados, DF e Municípios, todos autônomos.", "Competência exclusiva da União (art. 21): por exemplo, manter relações com Estados estrangeiros, declarar guerra, manter serviço postal e a polícia federal.", "Competência privativa de legislar da União (art. 22): direito penal, processual, civil, comercial, trânsito e transporte, entre outras.", "Competência comum (art. 23): todos os entes cuidam da saúde, da proteção ao meio ambiente, entre outros.", "Competência concorrente (art. 24): União edita normas gerais; Estados suplementam."],
    exemplo: "Quem pode criar crimes é a União, pois legislar sobre direito penal é competência privativa dela (art. 22, I). Um Estado não pode editar lei criando crime.",
    atencao: ["Município não faz parte da União: é ente autônomo.", "Normas gerais na competência concorrente são da União; os Estados suplementam."],
    quiz: [
      { q: "Legislar sobre direito penal é competência privativa da União.", a: true, why: "Está no art. 22, inciso I." },
      { q: "Os Municípios são entes autônomos da federação brasileira.", a: true, why: "O art. 18 os inclui na organização político-administrativa, com autonomia." },
    ],
  },
  {
    id: "cf-executivo-legislativo",
    group: "Organização do Estado e dos Poderes",
    title: "Poderes Executivo e Legislativo",
    edital: "Poder Executivo; Poder Legislativo",
    simples: "O Poder Executivo é exercido pelo Presidente da República, auxiliado pelos Ministros de Estado. O mandato é de quatro anos, com possibilidade de uma reeleição. O Presidente é julgado pelo Supremo Tribunal Federal nas infrações penais comuns e pelo Senado nos crimes de responsabilidade, depois que a Câmara dos Deputados admite a acusação por dois terços de seus membros. O Poder Legislativo federal é exercido pelo Congresso Nacional, formado pela Câmara dos Deputados e pelo Senado Federal.",
    pontos: ["Presidente e Vice são eleitos juntos; mandato de quatro anos.", "Infrações penais comuns: STF; crimes de responsabilidade: Senado.", "Admissão da acusação contra o Presidente: dois terços da Câmara.", "Senado: três senadores por Estado e pelo DF, mandato de oito anos, renovação de um e dois terços alternadamente.", "Deputados: mandato de quatro anos.", "Imunidade material: congressistas são invioláveis por opiniões, palavras e votos."],
    exemplo: "Um deputado que, em discurso na tribuna, ofende um adversário, não pode ser processado por isso: opiniões, palavras e votos são cobertos pela imunidade material.",
    atencao: ["O Presidente, na vigência do mandato, não pode ser responsabilizado por atos estranhos ao exercício das funções.", "Imunidade formal: parlamentares só podem ser presos em flagrante de crime inafiançável, e a Casa decide sobre a prisão por maioria."],
    quiz: [
      { q: "Os crimes de responsabilidade do Presidente da República são julgados pelo Senado Federal.", a: true, why: "A Câmara autoriza por dois terços e o Senado julga." },
      { q: "O mandato dos senadores é de quatro anos.", a: false, why: "É de oito anos." },
    ],
  },
  {
    id: "cf-judiciario-controle",
    group: "Organização do Estado e dos Poderes",
    title: "Poder Judiciário e controle de constitucionalidade",
    edital: "Poder Judiciário; controle de constitucionalidade",
    simples: "O Poder Judiciário é formado pelo STF, CNJ, STJ, tribunais regionais federais e juízes federais, tribunais e juízes do trabalho, eleitorais, militares e dos Estados. O STF é o guardião da Constituição. Controle de constitucionalidade é a verificação da compatibilidade das leis com a Constituição. Pode ser difuso (qualquer juiz, no caso concreto) ou concentrado (no STF, de forma abstrata, por ação direta de inconstitucionalidade, ação declaratória de constitucionalidade ou arguição de descumprimento de preceito fundamental).",
    pontos: ["STF: guardião da Constituição; composto por onze Ministros.", "Controle difuso: qualquer juiz ou tribunal, com efeitos entre as partes.", "Controle concentrado: STF, em tese, com efeitos para todos e vinculante.", "Instrumentos concentrados: ADI, ADC, ADPF.", "Declaração de inconstitucionalidade por tribunais exige maioria absoluta dos membros (cláusula de reserva de plenário).", "Súmula vinculante: aprovada por dois terços dos Ministros do STF."],
    exemplo: "Um juiz de primeira instância pode deixar de aplicar uma lei inconstitucional em um caso concreto, mas essa decisão só vale para as partes; já a decisão do STF em ADI vale para todos.",
    atencao: ["Os efeitos da decisão em controle concentrado são contra todos e vinculantes aos demais órgãos do Judiciário e da administração.", "Uma lei não é 'revogada' pelo juiz: ele apenas deixa de aplicá-la no caso concreto."],
    quiz: [
      { q: "O controle concentrado de constitucionalidade é exercido, em regra, pelo Supremo Tribunal Federal.", a: true, why: "Ele julga as ações diretas contra leis federais e estaduais em face da Constituição." },
      { q: "A súmula vinculante exige aprovação por maioria simples dos Ministros do STF.", a: false, why: "Exige dois terços dos Ministros." },
    ],
  },
  {
    id: "cf-seguranca-publica",
    group: "Segurança pública",
    title: "Segurança pública (art. 144)",
    edital: "Segurança pública: órgãos e competências",
    simples: "A segurança pública é dever do Estado, direito e responsabilidade de todos, exercida para a preservação da ordem pública e da incolumidade das pessoas e do patrimônio. Os órgãos são: polícia federal, polícia rodoviária federal, polícia ferroviária federal, polícias civis, polícias militares e corpos de bombeiros militares, polícias penais federal, estaduais e distrital. Os Municípios podem constituir guardas municipais para a proteção de seus bens, serviços e instalações.",
    pontos: ["Polícia Federal: apura infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União; previne e reprime tráfico de drogas, contrabando e descaminho; exerce polícia marítima, aeroportuária e de fronteiras; exerce, com exclusividade, as funções de polícia judiciária da União.", "Polícia Rodoviária Federal: patrulhamento ostensivo das rodovias federais.", "Polícias civis: polícia judiciária e apuração de infrações penais, exceto as militares, dirigidas por delegados de carreira.", "Polícias militares: polícia ostensiva e preservação da ordem pública; bombeiros militares: defesa civil, além das atribuições da lei.", "Polícias penais: segurança dos estabelecimentos penais.", "Guardas municipais: proteção de bens, serviços e instalações do Município."],
    exemplo: "O patrulhamento ostensivo de uma rodovia federal cabe à Polícia Rodoviária Federal; a investigação de crimes federais comuns, à Polícia Federal.",
    atencao: ["Polícia judiciária da União é exclusividade da Polícia Federal; nas esferas estaduais, é das polícias civis.", "A Polícia Rodoviária Federal realiza o patrulhamento ostensivo, não a polícia judiciária."],
    quiz: [
      { q: "A Polícia Rodoviária Federal exerce o patrulhamento ostensivo das rodovias federais.", a: true, why: "Está no art. 144, § 2º." },
      { q: "A polícia judiciária da União é exercida pela Polícia Rodoviária Federal.", a: false, why: "É exercida com exclusividade pela Polícia Federal." },
    ],
  },
];
