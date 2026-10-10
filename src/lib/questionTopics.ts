/**
 * Classificação AUTOMÁTICA das questões por assunto, por palavras-chave do enunciado.
 * É aproximada: serve para o aluno treinar um assunto do cronograma, não para estatística oficial.
 * Os nomes dos assuntos são os mesmos de `topicsFor` (studyTopics.ts), para o cronograma casar.
 */

const strip = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

type Rule = [topic: string, pattern: RegExp];
type AreaKey =
  | "portugues"
  | "raciocinio"
  | "estatistica"
  | "constitucional"
  | "administrativo"
  | "penal"
  | "processual"
  | "informatica"
  | "transito"
  | "fisica"
  | "contabilidade"
  | "humanos"
  | "atualidades"
  | "medicina";

const RULES: Record<AreaKey, Rule[]> = {
  portugues: [
    ["Crase", /\bcrase\b|\bas?\s+\d+\s*h|\ba\s+que\b.*crase/],
    ["Concordância verbal e nominal", /concordancia/],
    ["Regência verbal e nominal", /regencia|\bregente\b/],
    ["Pontuação", /virgula|ponto e virgula|dois[- ]pontos|pontuacao|travessao/],
    ["Colocação pronominal", /proclise|enclise|mesoclise|colocacao pronominal|pronome obliquo/],
    ["Ortografia e acentuação gráfica", /acentu|ortograf|hifen|grafia/],
    [
      "Coesão e coerência textual",
      /coesao|coerencia|conectivo|elemento coesivo|referencia anaforica/,
    ],
    [
      "Reescrita e substituição de trechos",
      /reescrit|substituicao|sem prejuizo|mantido o sentido|mantendo.*sentido/,
    ],
    [
      "Classes de palavras e emprego",
      /adverbio|adjetivo|substantivo|conjuncao|preposicao|pronome|verbo\b|locucao/,
    ],
    [
      "Significação das palavras",
      /sinonim|antonim|significado|sentido da palavra|expressao.*sentido/,
    ],
    ["Tipologia e gêneros textuais", /tipologia|genero textual|dissertativ|narrativ|argumentativ/],
    ["Interpretação e compreensão de texto", /texto|autor|trecho|paragrafo|linha|segundo o/],
  ],
  raciocinio: [
    ["Tabela-verdade e equivalências", /tabela[- ]verdade|equivalen|tautolog|contradicao/],
    ["Negação de proposições", /negacao|nega[cç]ao|negativa da proposicao|\bnegar\b/],
    [
      "Proposições e conectivos lógicos",
      /proposicao|proposicoes|conectivo|condicional|bicondicional|disjuncao|conjuncao/,
    ],
    ["Argumentação e diagramas lógicos", /argumento|premissa|silogismo|diagrama|valido|invalido/],
    ["Conjuntos", /conjunto|interseccao|uniao de|pertence|subconjunto/],
    ["Análise combinatória", /combinac|permuta|arranjo|anagrama|de quantas maneiras/],
    ["Probabilidade", /probabilidade|chance de|espaco amostral/],
    ["Porcentagem", /porcent|por cento|%/],
    ["Razão, proporção e regra de três", /razao|proporc|regra de tres|diretamente|inversamente/],
    ["Sequências e padrões", /sequencia|padrao|termo geral|progressao/],
  ],
  estatistica: [
    ["Medidas de posição", /media aritmetica|mediana|\bmoda\b|quartil|percentil/],
    ["Medidas de dispersão", /desvio padrao|variancia|coeficiente de variacao|amplitude/],
    ["Distribuição normal", /distribuicao normal|curva normal|escore z/],
    ["Correlação e regressão", /correlacao|regressao/],
    ["Probabilidade", /probabilidade|esperanca|variavel aleatoria/],
    ["Amostragem e inferência", /amostra|populacao|intervalo de confianca|teste de hipotese/],
    ["Distribuição de frequências", /frequencia|histograma|tabela de dados/],
  ],
  constitucional: [
    [
      "Segurança pública (art. 144)",
      /seguranca publica|art\.?\s*144|policia federal|policia rodoviaria|policia penal|guardas municipais/,
    ],
    [
      "Direitos e garantias individuais (art. 5º)",
      /art\.?\s*5|habeas corpus|mandado de seguranca|habeas data|direitos e garantias|inviolabilidade|liberdade de/,
    ],
    [
      "Controle de constitucionalidade",
      /controle de constitucionalidade|adi\b|adc\b|adpf|inconstitucional/,
    ],
    [
      "Direitos sociais e nacionalidade",
      /direitos sociais|nacionalidade|brasileiro nato|naturalizad/,
    ],
    ["Direitos políticos", /direitos politicos|elegibilidade|sufragio|plebiscito|referendo/],
    [
      "Poder Executivo",
      /presidente da republica|poder executivo|ministro de estado|medida provisoria/,
    ],
    [
      "Poder Legislativo",
      /congresso nacional|camara dos deputados|senado|poder legislativo|cpi|emenda constitucional/,
    ],
    ["Poder Judiciário", /poder judiciario|supremo tribunal|stf|stj|cnj|magistrat/],
    [
      "Organização do Estado",
      /uniao|estados-membros|municipios|competencia legislativa|federacao|intervencao/,
    ],
    [
      "Princípios fundamentais",
      /principios fundamentais|fundamentos da republica|dignidade da pessoa|art\.?\s*[1-4]\b/,
    ],
  ],
  administrativo: [
    [
      "Agentes públicos e Lei 8.112/1990",
      /8\.?112|servidor publico|estagio probatorio|vacancia|remocao|PAD\b|processo administrativo disciplinar/,
    ],
    ["Processo administrativo (Lei 9.784/1999)", /9\.?784|processo administrativo/],
    [
      "Licitações e contratos",
      /licitac|14\.?133|8\.?666|pregao|contrato administrativo|dispensa de licitacao/,
    ],
    ["Responsabilidade civil do Estado", /responsabilidade civil|teoria do risco|culpa anonima/],
    [
      "Atos administrativos",
      /ato administrativo|atributos|presuncao de legitimidade|motivo|finalidade|revogacao|anulacao/,
    ],
    [
      "Poderes administrativos",
      /poder de policia|poder disciplinar|poder hierarquico|poder regulamentar|abuso de poder/,
    ],
    [
      "Organização administrativa",
      /autarquia|empresa publica|sociedade de economia mista|fundacao|descentraliz|desconcentrac|administracao indireta/,
    ],
    [
      "Controle da Administração",
      /controle (interno|externo|judicial)|tribunal de contas|autotutela/,
    ],
    [
      "Princípios da Administração Pública",
      /principio|legalidade|impessoalidade|moralidade|publicidade|eficiencia/,
    ],
  ],
  penal: [
    [
      "Crimes contra a pessoa",
      /homicidio|lesao corporal|infanticidio|aborto|rixa|ameaca|constrangimento ilegal|injuria|calunia|difamacao/,
    ],
    [
      "Crimes contra o patrimônio",
      /furto|roubo|extorsao|estelionato|receptacao|dano\b|apropriacao indebita/,
    ],
    [
      "Crimes contra a administração pública",
      /peculato|corrupcao|concussao|prevaricacao|advocacia administrativa|desacato|abuso de autoridade|funcionario publico/,
    ],
    [
      "Excludentes de ilicitude",
      /legitima defesa|estado de necessidade|estrito cumprimento|exercicio regular|excludente de ilicitude/,
    ],
    [
      "Culpabilidade",
      /culpabilidade|inimputab|imputabilidade|erro de proibicao|coacao moral|obediencia hierarquica/,
    ],
    [
      "Concurso de crimes e penas",
      /concurso (material|formal)|crime continuado|dosimetria|pena privativa|regime (inicial|aberto|fechado|semiaberto)|sursis|reincidencia/,
    ],
    [
      "Extinção da punibilidade",
      /prescricao|decadencia|perdao|anistia|graca|indulto|extincao da punibilidade/,
    ],
    [
      "Teoria do crime: fato típico",
      /dolo|culpa\b|tipicidade|conduta|nexo causal|tentativa|consumacao|desistencia voluntaria|arrependimento eficaz|crime impossivel/,
    ],
    [
      "Princípios e aplicação da lei penal",
      /anterioridade|territorialidade|lei penal no tempo|extraterritorialidade|principio da legalidade|abolitio|novatio/,
    ],
  ],
  processual: [
    ["Inquérito policial", /inquerito|delegado de policia|indiciamento/],
    [
      "Prisões e medidas cautelares",
      /prisao|flagrante|preventiva|temporaria|medidas cautelares|liberdade provisoria|fianca/,
    ],
    [
      "Provas",
      /prova|pericia|interceptacao|busca e apreensao|testemunha|confissao|cadeia de custodia/,
    ],
    ["Competência", /competencia|conexao|continencia|foro por prerrogativa/],
    ["Nulidades", /nulidade|prejuizo|ilicita/],
    ["Recursos", /recurso|apelacao|embargos|agravo|habeas corpus|revisao criminal/],
    ["Ação penal", /acao penal|denuncia|queixa|ministerio publico|prescricao da acao/],
    ["Procedimentos e juizados", /procedimento|juizado|jurado|tribunal do juri|rito/],
  ],
  informatica: [
    [
      "Malwares e ataques",
      /virus|malware|ransomware|phishing|trojan|worm|spyware|ataque|ddos|engenharia social/,
    ],
    [
      "Segurança da informação",
      /criptograf|firewall|assinatura digital|certificado digital|confidencialidade|integridade|disponibilidade|autenticidade/,
    ],
    ["Backup e armazenamento", /backup|copia de seguranca|raid|armazenamento/],
    ["Computação em nuvem", /nuvem|cloud|saas|paas|iaas/],
    [
      "Editores de texto e planilhas",
      /word|excel|writer|calc\b|planilha|formula|celula|libreoffice|powerpoint/,
    ],
    [
      "Navegadores e correio eletrônico",
      /navegador|chrome|firefox|edge|e-mail|email|outlook|smtp|imap|pop3|cookies?/,
    ],
    [
      "Redes e internet",
      /rede|tcp|ip\b|protocolo|http|dns|lan\b|wan\b|wi-?fi|intranet|extranet|internet/,
    ],
    [
      "Sistemas operacionais (Windows e Linux)",
      /windows|linux|sistema operacional|pasta|arquivo|atalho|explorador|kernel|distribuicao/,
    ],
    [
      "Hardware e software",
      /hardware|software|memoria|processador|\bcpu\b|ram\b|disco|dispositivo/,
    ],
  ],
  transito: [
    [
      "Crimes de trânsito",
      /crime de transito|embriaguez ao volante|homicidio culposo.*veiculo|racha|dirigir sem habilitacao/,
    ],
    ["Infrações", /infracao|multa|pontuacao|gravissima|infrator/],
    [
      "Penalidades e medidas administrativas",
      /penalidade|suspensao do direito|cassacao|apreensao|remocao do veiculo|medida administrativa/,
    ],
    ["Habilitação", /habilitacao|cnh|permissao para dirigir|exame/],
    ["Veículos e equipamentos", /veiculo|equipamento|licenciamento|registro|placa|categoria/],
    ["Sinalização", /sinalizacao|semaforo|placa de|marca viaria|sinal/],
    [
      "Sistema Nacional de Trânsito",
      /sistema nacional de transito|detran|contran|denatran|renavam|competencia dos orgaos/,
    ],
    [
      "Normas gerais de circulação",
      /circulacao|preferencia|ultrapassagem|velocidade|conversao|estacionamento|parada/,
    ],
  ],
  fisica: [
    ["Cinemática", /velocidade|aceleracao|mru|mruv|queda livre|lancamento|movimento/],
    ["Dinâmica e leis de Newton", /newton|forca|atrito|massa|inercia/],
    ["Trabalho, energia e potência", /trabalho|energia|potencia|cinetica|potencial/],
    ["Estática e hidrostática", /pressao|empuxo|densidade|equilibrio|torque|alavanca/],
    ["Ondas e óptica", /onda|som|luz|espelho|lente|refracao|reflexao/],
    ["Termologia", /temperatura|calor|dilatacao|termodinamica|gas/],
    ["Eletricidade", /corrente eletrica|tensao|resistor|circuito|carga eletrica|ohm/],
  ],
  contabilidade: [
    ["Estrutura conceitual e NBC TSP", /nbc tsp|estrutura conceitual|cpc 00|setor publico/],
    [
      "DRE e demais demonstrações",
      /dre\b|demonstracao do resultado|dfc\b|dva\b|dmpl|dlpa|fluxo de caixa|6\.?404/,
    ],
    [
      "Balanço patrimonial",
      /balanco patrimonial|ativo circulante|passivo nao circulante|patrimonio liquido/,
    ],
    ["Operações com mercadorias", /mercadoria|cmv|estoque|compras|devolucao/],
    ["Balancete de verificação", /balancete/],
    ["Regimes de caixa e competência", /regime de (caixa|competencia)|competencia do exercicio/],
    [
      "Escrituração e partidas dobradas",
      /partidas dobradas|escrituracao|livro (diario|razao)|debito|credito|lancamento/,
    ],
    ["Contas e plano de contas", /conta|plano de contas|saldo (devedor|credor)|natureza/],
    [
      "Atos e fatos contábeis",
      /ato administrativo|fato contabil|fato (permutativo|modificativo|misto)/,
    ],
    [
      "Patrimônio e equação fundamental",
      /patrimonio|equacao fundamental|situacao liquida|ativo|passivo/,
    ],
    [
      "Conceitos e finalidades",
      /conceito|objeto da contabilidade|usuarios|finalidade|principios de contabilidade/,
    ],
  ],
  humanos: [
    ["Lei de Drogas (Lei 11.343/2006)", /11\.?343|drogas|trafico|entorpecente|usuario de drogas/],
    ["Abuso de autoridade (Lei 13.869/2019)", /13\.?869|abuso de autoridade/],
    [
      "Organizações criminosas (Lei 12.850/2013)",
      /12\.?850|organizacao criminosa|colaboracao premiada|infiltracao/,
    ],
    ["Estatuto da Criança e do Adolescente", /eca\b|8\.?069|crianca|adolescente|ato infracional/],
    [
      "Lei de Migração (Lei 13.445/2017)",
      /13\.?445|migracao|imigrante|refugiado|deportacao|expulsao/,
    ],
    [
      "Tratados e convenções internacionais",
      /tratado|convencao|pacto|corte interamericana|declaracao universal/,
    ],
    ["Teoria geral dos direitos humanos", /direitos humanos|geracao|dimensao|universalidade/],
  ],
  atualidades: [
    ["Segurança pública no Brasil", /seguranca publica|crime organizado|violencia|facc/],
    ["Economia e finanças públicas", /economia|inflacao|pib|juros|orcamento/],
    ["Meio ambiente e sustentabilidade", /meio ambiente|sustentab|clima|desmatamento/],
    ["Tecnologia e sociedade", /tecnologia|inteligencia artificial|internet|digital/],
    ["Política nacional e internacional", /politica|eleic|governo|relacoes internacionais|onu\b/],
  ],
  medicina: [
    ["Tanatologia", /tanatolog|morte|cadaver|putrefacao|rigidez/],
    ["Traumatologia forense", /lesao|ferimento|trauma|arma de fogo|contuso|perfurante/],
    ["Local de crime e preservação", /local de crime|isolamento|preservacao do local/],
    ["Cadeia de custódia", /cadeia de custodia|vestigio/],
    ["Identificação humana", /identificacao|papiloscop|impressao digital|dna/],
    ["Perícias criminais", /pericia|laudo|perito/],
  ],
};

/** Qual grande área a matéria do banco pertence (chave das regras acima). */
export function areaOfSubject(subject: string): AreaKey | null {
  const n = strip(subject);
  if (/portugues/.test(n)) return "portugues";
  if (/estatistica/.test(n)) return "estatistica";
  if (/raciocinio|logic|matematica/.test(n)) return "raciocinio";
  if (/constitucional/.test(n)) return "constitucional";
  if (/administrativ/.test(n)) return "administrativo";
  if (/processual penal|processo penal/.test(n)) return "processual";
  if (/legislacao especial|legislacao penal|direitos humanos|etica/.test(n)) return "humanos";
  if (/penal/.test(n)) return "penal";
  if (/informatica|tecnologia/.test(n)) return "informatica";
  if (/transito/.test(n)) return "transito";
  if (/fisica/.test(n)) return "fisica";
  if (/contabilidade/.test(n)) return "contabilidade";
  if (/atualidades|economia/.test(n)) return "atualidades";
  if (/medicina|criminalistica/.test(n)) return "medicina";
  return null;
}

/** Assunto provável da questão (ou null se nenhuma regra casar). */
export function classifyTopic(subject: string, text: string): string | null {
  const area = areaOfSubject(subject);
  if (!area) return null;
  const t = strip(text);
  for (const [topic, re] of RULES[area]) if (re.test(t)) return topic;
  return null;
}

/**
 * A matéria do cronograma ("Direito Penal e Processual Penal") cobre quais matérias do banco?
 * Nomes compostos juntam as áreas.
 */
export function subjectInArea(plannedArea: string, questionSubject: string): boolean {
  const p = strip(plannedArea);
  const q = areaOfSubject(questionSubject);
  if (!q) return strip(questionSubject).includes(p) || p.includes(strip(questionSubject));
  const wanted = new Set<AreaKey>();
  if (/portugues/.test(p)) wanted.add("portugues");
  if (/estatistica/.test(p)) wanted.add("estatistica");
  if (/raciocinio|logic/.test(p)) wanted.add("raciocinio");
  if (/constitucional/.test(p)) wanted.add("constitucional");
  if (/administrativ/.test(p)) wanted.add("administrativo");
  if (/processual/.test(p)) wanted.add("processual");
  if (/penal/.test(p) && !/^direito processual penal$/.test(p) && !/legislacao/.test(p))
    wanted.add("penal");
  if (/legislacao|direitos humanos|etica/.test(p)) wanted.add("humanos");
  if (/informatica|tecnologia/.test(p)) wanted.add("informatica");
  if (/transito/.test(p)) wanted.add("transito");
  if (/fisica/.test(p)) wanted.add("fisica");
  if (/contabilidade/.test(p)) wanted.add("contabilidade");
  if (/atualidades|economia/.test(p)) wanted.add("atualidades");
  if (/medicina|criminalistica/.test(p)) wanted.add("medicina");
  return wanted.has(q);
}

/** Verificação rápida: node --experimental-strip-types src/lib/questionTopics.ts */
export function selfCheck() {
  const cases: [string, string, string | null][] = [
    [
      "Língua Portuguesa",
      "Em “foi a Brasília”, o emprego do sinal indicativo de crase é facultativo.",
      "Crase",
    ],
    [
      "Direito Penal",
      "Configura legítima defesa a reação moderada contra agressão injusta.",
      "Excludentes de ilicitude",
    ],
    ["Informática", "O phishing é um ataque de engenharia social.", "Malwares e ataques"],
    [
      "Direito Processual Penal",
      "A prisão em flagrante deve ser comunicada ao juiz.",
      "Prisões e medidas cautelares",
    ],
  ];
  const bad = cases.filter(([s, t, want]) => classifyTopic(s, t) !== want);
  console.assert(bad.length === 0, "classificação falhou: " + JSON.stringify(bad));
  console.assert(
    subjectInArea("Direito Penal e Processual Penal", "Direito Processual Penal"),
    "composta cobre processual",
  );
  console.assert(
    !subjectInArea("Direito Penal", "Direito Processual Penal"),
    "penal não cobre processual",
  );
  return bad.length === 0;
}
