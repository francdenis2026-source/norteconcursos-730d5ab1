/**
 * Explicações didáticas das resoluções do CONTRAN, elaboradas a partir do texto oficial publicado no DOU
 * (public/contran/<número>-<ano>.json). Cada afirmação deve poder ser conferida no texto da resolução; números e
 * prazos que não estão no texto oficial não entram aqui (scripts/contran-didatica.test.mjs confere isso).
 * Os anexos técnicos não fazem parte do texto consultado: para eles, só se diz o que o artigo diz sobre eles.
 */
export type ContranDidatica = {
  /** Explicação em linguagem simples, um parágrafo por item. */
  simples: string[];
  /** Quadro de consulta rápida: rótulo → o que a resolução diz. */
  quadro?: { titulo: string; linhas: [string, string][] };
  /** Situações do dia a dia com a resposta correta. */
  exemplos: { situacao: string; resposta: string }[];
  /** Erros típicos de quem estuda de forma superficial. */
  pegadinhas: string[];
  /** O que mudou depois da publicação (atos alteradores), em frases curtas. */
  atualizacoes?: string[];
  /** Outras resoluções cujo texto oficial foi lido para estas explicações (ex.: as que alteraram a norma). */
  fontes?: string[];
};

export const CONTRAN_DIDATICA: Record<string, ContranDidatica> = {
  "993/2023": {
    simples: [
      "Esta resolução responde a uma pergunta prática: que equipamentos o veículo precisa ter para circular em via pública? Ela vale para a frota em circulação, de automóveis e caminhões a motocicletas, ônibus, tratores, reboques e quadriciclos (art. 2º).",
      "A lista dos equipamentos obrigatórios não está no corpo da resolução: fica no Anexo I, e o Anexo II traz os requisitos técnicos gerais de construção. O corpo da norma diz quem tem de cumprir, o que acontece com quem descumpre e quem confere.",
      "Quem fiscaliza constata se os equipamentos do Anexo I estão funcionando (art. 3º, § 2º). Circular sem os requisitos leva às penalidades do art. 230 do CTB, no que couber (art. 8º).",
    ],
    quadro: {
      titulo: "Resolução 993/2023 em uma olhada",
      linhas: [
        ["O que regula", "Equipamentos obrigatórios da frota em circulação"],
        ["Onde está a lista", "Anexo I (equipamentos) e Anexo II (requisitos técnicos gerais)"],
        ["Quem confere", "A fiscalização de trânsito, nas condições de funcionamento (art. 3º, § 2º)"],
        ["Quem descumpre", "Penalidades do art. 230 do CTB, no que couber (art. 8º)"],
        ["Veículo estrangeiro", "Também cumpre, salvo equipamentos dispensados por convenção ou acordo internacional ratificado (art. 6º)"],
        ["Não se aplica", "A veículos destinados à exportação (art. 7º)"],
        ["Vigência", "Desde 3 de julho de 2023; revogou a Resolução 912/2022 (arts. 10 e 11)"],
      ],
    },
    exemplos: [
      {
        situacao: "Um caminhão de outro país entra no Brasil e circula nas estradas. Ele precisa ter os equipamentos obrigatórios?",
        resposta: "Sim. O art. 6º manda aplicar a resolução aos veículos registrados em outros países, exceto os equipamentos dispensados por convenção ou acordo internacional que o Brasil ratificou.",
      },
      {
        situacao: "Uma montadora fabrica um lote de veículos para exportação. O lote é fiscalizado por esta resolução?",
        resposta: "Não. O art. 7º afasta a resolução dos veículos destinados à exportação.",
      },
      {
        situacao: "Um agente encontra o veículo com o equipamento instalado, mas sem funcionar. Basta ter o item?",
        resposta: "Não basta. A fiscalização constata as condições de funcionamento dos equipamentos do Anexo I (art. 3º, § 2º).",
      },
    ],
    pegadinhas: [
      "Dizer que a resolução lista os equipamentos em seu texto. Quem lista é o Anexo I; o corpo da resolução só organiza as regras.",
      "Achar que ela vale só para carros. O art. 2º inclui caminhões, ônibus, tratores, reboques, motocicletas e quadriciclos, entre outros.",
      "Confundir a penalidade: a referência é o art. 230 do CTB, no que couber, e não uma multa própria da resolução.",
    ],
  },

  "985/2022": {
    simples: [
      "A Resolução 985 é curta de propósito: ela aprova o Manual Brasileiro de Fiscalização de Trânsito (MBFT), mas o manual em si é o anexo, publicado no site do órgão máximo executivo de trânsito da União (art. 1º e parágrafo único).",
      "Por isso, na prova, a pergunta típica é sobre o que a resolução faz e não sobre o conteúdo do manual: ela aprova o MBFT, revoga a Resolução 925/2022 e começou a valer em 2 de janeiro de 2023 (arts. 2º e 3º).",
      "O MBFT é o manual que orienta como o agente deve fiscalizar e enquadrar as infrações. Esta resolução, porém, não cria infração nova nem multa: quem trata disso é o CTB. Para saber o que o manual diz sobre uma infração específica, é preciso consultar a versão do anexo em vigor.",
    ],
    quadro: {
      titulo: "Resolução 985/2022 em uma olhada",
      linhas: [
        ["O que faz", "Aprova o Manual Brasileiro de Fiscalização de Trânsito (MBFT)"],
        ["Onde está o manual", "No anexo, disponível no site do órgão máximo executivo de trânsito da União"],
        ["O que revoga", "Resolução 925/2022"],
        ["Vigência", "A partir de 2 de janeiro de 2023"],
      ],
    },
    exemplos: [
      {
        situacao: "A prova afirma: a Resolução 985 define o valor de cada multa de trânsito. Certo ou errado?",
        resposta: "Errado. Ela aprova o MBFT e revoga a Resolução 925/2022; não fixa valores de multa. O texto da resolução nem traz o conteúdo do manual, que está no anexo.",
      },
      {
        situacao: "Em que data a Resolução 985 passou a valer?",
        resposta: "Em 2 de janeiro de 2023 (art. 3º), mesmo tendo sido publicada em dezembro de 2022.",
      },
    ],
    pegadinhas: [
      "Atribuir à resolução o conteúdo detalhado do manual. O corpo da norma só o aprova; o manual é o anexo.",
      "Confundir publicação com início de vigência: foi publicada em dezembro de 2022 e passou a valer em 2 de janeiro de 2023.",
      "Esquecer a revogação: a 985 substituiu a Resolução 925/2022.",
    ],
  },

  "973/2022": {
    simples: [
      "A Resolução 973 institui o Regulamento de Sinalização Viária. Pense nele como o conjunto de regras técnicas que todo órgão de trânsito do país precisa seguir quando coloca uma placa, pinta o chão ou instala um semáforo (art. 1º).",
      "O regulamento é formado por nove volumes do Manual Brasileiro de Sinalização de Trânsito (MBST), cada um em um anexo: regulamentação, advertência, indicação, sinalização horizontal, semafórica, dispositivos auxiliares, sinalização temporária, cicloviária e de cruzamento rodoferroviário (art. 2º).",
      "Há também um caminho para quem quer testar uma sinalização que o CTB não prevê. O órgão interessado pede autorização ao órgão máximo executivo de trânsito da União, com requerimento, projeto, estatística de acidentes, local, período e termo de responsabilidade (art. 3º). A autorização é precária, dada por portaria, com local e prazo (art. 5º, § 1º). Antes dela, nada pode ser implantado (art. 6º).",
      "Terminado o teste, o resultado vai ao CONTRAN, que avalia se a sinalização pode virar permanente (art. 7º).",
    ],
    quadro: {
      titulo: "Os nove volumes do MBST (art. 2º)",
      linhas: [
        ["Volume I (Anexo I)", "Sinalização vertical de regulamentação"],
        ["Volume II (Anexo II)", "Sinalização vertical de advertência"],
        ["Volume III (Anexo III)", "Sinalização vertical de indicação"],
        ["Volume IV (Anexo IV)", "Sinalização horizontal"],
        ["Volume V (Anexo V)", "Sinalização semafórica"],
        ["Volume VI (Anexo VI)", "Dispositivos auxiliares"],
        ["Volume VII (Anexo VII)", "Sinalização temporária"],
        ["Volume VIII (Anexo VIII)", "Sinalização cicloviária"],
        ["Volume IX (Anexo IX)", "Cruzamento rodoferroviário"],
      ],
    },
    exemplos: [
      {
        situacao: "Uma prefeitura quer testar uma placa nova que o CTB não prevê. Pode instalar e depois pedir autorização?",
        resposta: "Não. O art. 6º proíbe implantar sinalização experimental antes da autorização de uso do órgão máximo executivo de trânsito da União.",
      },
      {
        situacao: "A autorização para o teste foi concedida. Ela vale para sempre e para qualquer lugar?",
        resposta: "Não. É precária e vem em portaria que indica o local e o prazo determinado (art. 5º, § 1º). Durante o teste, o requerente envia relatórios técnicos (art. 5º, § 2º).",
      },
      {
        situacao: "Uma solução de sinalização foi implantada até 31 de julho de 2022 e não cumpre o regulamento. O que deve acontecer?",
        resposta: "Deve ser substituída ou adequada até 31 de julho de 2025 (art. 8º, parágrafo único). O regulamento vale para as soluções implantadas a partir de 1º de agosto de 2022 (art. 8º, caput).",
      },
    ],
    pegadinhas: [
      "Dizer que os anexos estão no corpo da resolução. Eles ficam no site do órgão máximo executivo de trânsito da União (art. 9º).",
      "Achar que quem autoriza o teste é o CONTRAN. A autorização é do órgão máximo executivo de trânsito da União; o CONTRAN avalia o resultado depois (arts. 5º e 7º).",
      "Confundir a data da resolução (18 de julho de 2022) com a de vigência (1º de agosto de 2022).",
      "Esta resolução foi alterada por outras (como as Resoluções 986/2022, 1.012/2024 e 1.013/2024, segundo o catálogo oficial). Para uma regra específica de um volume, confira o ato que a alterou.",
    ],
  },

  "967/2022": {
    simples: [
      "A baixa do registro é o ato que tira o veículo do cadastro de forma definitiva. Ela é obrigatória sempre que o veículo é retirado de circulação por uma destas razões: é irrecuperável, foi definitivamente desmontado, teve perda total ou danos de grande monta, ou foi vendido ou leiloado como sucata (art. 2º).",
      "O pedido é feito, com motivo, ao órgão executivo de trânsito do Estado ou do Distrito Federal onde o veículo está registrado (art. 3º). Esse órgão recolhe os documentos, as placas e a parte do chassi com o número de identificação (VIN) e inutiliza as partes do chassi e as placas (art. 3º, § 1º). O recolhimento do pedaço do chassi pode ser trocado por laudo fotográfico que comprove a descaracterização no local (art. 3º, § 3º).",
      "O prazo é de trinta dias, contados da constatação da condição do veículo por laudo, para os casos dos incisos I a III e da alínea \"b\" do inciso IV do art. 2º. Passado o prazo, aplicam-se as sanções do art. 240 do CTB (art. 5º).",
      "Depois da baixa, o veículo não pode voltar a circular sob nenhuma hipótese (art. 6º).",
    ],
    quadro: {
      titulo: "Baixa de registro: o essencial",
      linhas: [
        ["Quando é obrigatória", "Veículo irrecuperável, desmontado, com perda total ou grande monta, ou vendido/leiloado como sucata (art. 2º)"],
        ["Onde pedir", "Órgão executivo de trânsito do Estado ou do DF do registro (art. 3º)"],
        ["Prazo", "Trinta dias após o laudo, nos casos dos incisos I a III e da alínea b do inciso IV do art. 2º (art. 5º)"],
        ["Se perder o prazo", "Sanções do art. 240 do CTB (art. 5º)"],
        ["Depois da baixa", "O veículo nunca mais volta a circular (art. 6º)"],
        ["Frota desativada", "Veículo sem licenciamento há dez anos ou mais e com vinte e cinco anos ou mais de fabricação recebe esse indicativo na BIN (art. 7º)"],
        ["Circular como frota desativada", "Penalidade e medida administrativa do art. 230, inciso V, do CTB (art. 10)"],
      ],
    },
    exemplos: [
      {
        situacao: "O proprietário de um carro com laudo de perda total deixa passar mais de um mês sem pedir a baixa. Qual é a consequência?",
        resposta: "O prazo é de trinta dias a partir do laudo; passado esse prazo, ele sofre as sanções do art. 240 do CTB (art. 5º).",
      },
      {
        situacao: "Um carro baixado é consertado. Pode voltar a circular?",
        resposta: "Não. Efetuada a baixa, sob nenhuma hipótese o veículo pode voltar à circulação (art. 6º).",
      },
      {
        situacao: "Um veículo sucateado em leilão tem multas e débitos fiscais. Isso impede a baixa?",
        resposta: "Não. Débitos fiscais e multas de trânsito ou ambientais não impedem a baixa como sucata, observado o disposto nos §§ 8º, 9º e 10 do art. 328 do CTB (art. 9º, § 2º).",
      },
    ],
    pegadinhas: [
      "Confundir baixa com transferência de propriedade: baixar é retirar o veículo de circulação para sempre.",
      "Aplicar o prazo de trinta dias a todos os casos. O art. 5º o prevê para os incisos I a III e para a alínea b do inciso IV do art. 2º.",
      "Achar que multas e débitos sempre impedem a baixa. Para sucata leiloada, o art. 9º, § 2º, diz que não impedem.",
      "Esquecer que a restrição judicial ou policial, em regra, impede a baixa, com exceção dos veículos leiloados como sucata (art. 9º).",
    ],
  },
  "960/2022": {
    simples: [
      "Esta resolução diz como devem ser os vidros do veículo e o que pode (ou não) ser colocado neles. Ela vale para ver bem a rua e para o agente conseguir ver quem está dentro.",
      "Vidro de segurança: o para-brisa tem de ser laminado. As demais partes envidraçadas podem ser de vidro temperado ou laminado (art. 3º). Os vidros trazem marcação indelével com a marca do fabricante e o símbolo do INMETRO (art. 5º).",
      "Transparência (transmitância luminosa): para-brisa e vidros indispensáveis à dirigibilidade (o para-brisa e os vidros laterais dianteiros) não podem deixar passar menos de 70% da luz (art. 4º, I). Isso vale para o conjunto vidro mais película.",
      "Película: só a não refletiva é permitida, e desde que o conjunto respeite a transmitância do art. 4º (art. 8º). Película refletiva é proibida (art. 10, I). Cada película deve ter chancela legível pelo lado de fora, com a marca do instalador e o índice de transmitância (art. 8º, §§ 1º e 2º).",
      "Trincas no para-brisa: o que importa é onde está o dano. Na área crítica de visão do condutor e numa faixa de 2,5 cm nas bordas do para-brisa não pode haver trincas ou fraturas circulares, e elas não podem ser recuperadas (art. 14). Fora dessas regiões há limites: ônibus, micro-ônibus e caminhões aceitam até três danos (trinca até 20 cm, fratura circular até 4 cm de diâmetro); os demais veículos, até dois danos (trinca até 10 cm, fratura circular até 4 cm) (arts. 15 e 16).",
      "Na fiscalização com o medidor (MTL), soma-se 7% à medição feita: valor considerado = medição + 7% (art. 19, § 1º). O auto de infração traz a medição, o valor considerado e o limite da área fiscalizada (art. 19).",
    ],
    quadro: {
      titulo: "Vidros: o que vale em cada lugar",
      linhas: [
        ["Para-brisa", "Vidro laminado; transmitância mínima de 70% (arts. 3º e 4º, I)"],
        ["Laterais dianteiras", "Também são indispensáveis à dirigibilidade: mínimo de 70% (art. 4º, § 1º, II e art. 4º, I)"],
        ["Demais vidros", "Desde 2 de janeiro de 2023, podem ter transmitância menor que 70% se o veículo tiver espelho retrovisor externo dos dois lados (Res. 989/2022)"],
        ["Película refletiva", "Proibida (art. 10, I)"],
        ["Película não refletiva", "Permitida, com chancela legível por fora e respeitando a transmitância (art. 8º)"],
        ["Adesivos, legendas e símbolos", "Proibidos nas áreas indispensáveis à dirigibilidade (art. 10, III)"],
        ["Cortinas e persianas fechadas", "Proibidas com o veículo em movimento, salvo em áreas não indispensáveis e com espelhos retrovisores nos dois lados (art. 10, IV)"],
        ["Teto", "Fica fora dos limites de transmitância (art. 4º, § 3º)"],
        ["Veículo blindado", "Isento do vidro de segurança do art. 2º e da transmitância do art. 4º, I; vale a NBR 16218 (art. 12)"],
      ],
    },
    exemplos: [
      {
        situacao: "O agente mede o para-brisa com o medidor e o aparelho marca 66%. O condutor é autuado?",
        resposta: "O valor considerado é 66% + 7% = 73%, acima do mínimo de 70%, então não há infração por transmitância (art. 19, § 1º).",
      },
      {
        situacao: "O medidor marca 60% no vidro lateral dianteiro. O que acontece?",
        resposta: "O valor considerado é 60% + 7% = 67%, abaixo do mínimo de 70% para vidro indispensável à dirigibilidade. Há infração do art. 230, inciso XVI, do CTB (art. 21, III, b).",
      },
      {
        situacao: "Um para-brisa de carro de passeio tem uma trinca de 8 cm longe da área do condutor. Pode circular?",
        resposta: "Pode, se for no máximo dois danos fora da área crítica e das bordas, e a trinca não passar de 10 cm (art. 16, parágrafo único).",
      },
      {
        situacao: "A trinca de 3 cm está bem na frente do motorista, na área crítica de visão. Pode ser reparada para continuar circulando?",
        resposta: "Não. Na área crítica de visão não pode haver trinca ou fratura circular, e elas não podem ser recuperadas (art. 14). Há infração do art. 230, inciso XVIII (art. 21, V, a).",
      },
    ],
    pegadinhas: [
      "Dizer que o mínimo de 28% ainda vale. Essa regra do texto original foi alterada pela Resolução 989/2022, em vigor desde 2 de janeiro de 2023.",
      "Esquecer que o 70% é do conjunto vidro mais película, e não só da película.",
      "Ignorar os 7% de margem: a medição é corrigida antes de comparar com o limite.",
      "Achar que película refletiva é permitida em alguma área. O art. 10, I, proíbe nas áreas envidraçadas do veículo.",
      "Confundir os limites de dano: ônibus, micro-ônibus e caminhão aceitam até três danos; os demais, até dois.",
    ],
    atualizacoes: [
      "Resolução 989/2022 (vigente desde 2 de janeiro de 2023): o inciso II do art. 4º deixou de fixar 28%. Os vidros fora das áreas indispensáveis à dirigibilidade podem ter transmitância inferior à do inciso I, desde que o veículo tenha espelhos retrovisores externos de ambos os lados.",
      "Também pela 989/2022, a isenção dos veículos blindados passou a se referir aos requisitos do inciso I do art. 4º.",
    ],
    fontes: ["989/2022"],
  },
  "957/2022": {
    simples: [
      "Veículo de coleção é o fabricado há mais de trinta anos, original ou modificado, que tenha valor histórico próprio (art. 2º). Ter trinta anos não basta: é preciso valor histórico e o certificado.",
      "Quem atesta isso é uma entidade credenciada pelo órgão máximo executivo de trânsito da União, que emite o Certificado de Veículo de Coleção (CVCOL) depois de uma vistoria presencial. A vistoria remota, por foto ou meio digital, é proibida (arts. 10 e 16, II).",
      "Original ou modificado? Original é o veículo que fez oitenta pontos ou mais, de um total de cem, na avaliação das características de fabricação. Modificado é o que sofreu modificações feitas de acordo com a regulamentação do CONTRAN (art. 2º, § 4º).",
      "O veículo original não pode ser modificado durante a validade do CVCOL sem autorização prévia do órgão de trânsito do Estado ou do DF onde está registrado. Autorizada a modificação, ele passa por inspeção para o Certificado de Segurança Veicular (CSV) e é reavaliado: pode continuar original (oitenta pontos ou mais) ou ser reclassificado como modificado (art. 2º, §§ 5º a 7º).",
      "Para registrar e licenciar como coleção, o proprietário apresenta o CVCOL, o CSV (quando o veículo é modificado) e o veículo deve estar em condições de circular. Os órgãos estaduais não podem exigir mais nada além disso (art. 4º, § 1º). O CRLV-e passa a indicar a espécie \"coleção\" (art. 6º).",
      "O CVCOL vale sessenta meses e pode ser renovado por igual período se o veículo continuar atendendo às exigências (art. 11, I). Na venda, o novo proprietário precisa de um novo CVCOL em seu nome; sem ele, o licenciamento na espécie coleção é negado e as placas voltam ao tipo e espécie de origem (art. 7º).",
    ],
    quadro: {
      titulo: "Veículo de coleção em números e prazos",
      linhas: [
        ["Idade", "Fabricado há mais de trinta anos, com valor histórico próprio (art. 2º)"],
        ["Original", "Oitenta pontos ou mais, de cem, nas características de fabricação (art. 2º, § 4º, I)"],
        ["Modificado", "Modificações feitas conforme o CONTRAN; exige CSV (art. 2º, § 4º, II e art. 4º, IV)"],
        ["Quem emite o CVCOL", "Entidade credenciada pelo órgão máximo executivo de trânsito da União (art. 10)"],
        ["Validade do CVCOL", "Sessenta meses, renovável por igual período (art. 11, I)"],
        ["Credenciamento da entidade", "Quatro anos, renovável por igual período (art. 13)"],
        ["Venda do veículo", "Exige novo CVCOL no nome do comprador (art. 7º)"],
        ["Importado que não atende", "Proibido de circular até a adequação ou restauração e a emissão do CVCOL (art. 9º)"],
      ],
    },
    exemplos: [
      {
        situacao: "Um carro tem mais de trinta anos de fabricação, mas nunca foi avaliado por entidade credenciada. Pode ser licenciado como veículo de coleção?",
        resposta: "Não. É requisito apresentar o CVCOL expedido por entidade credenciada (art. 4º, III). Só a idade não basta.",
      },
      {
        situacao: "O dono de um veículo de coleção original quer trocar o motor. Pode fazer a troca e seguir normalmente?",
        resposta: "Não. Precisa de autorização prévia do órgão de trânsito do Estado ou do DF, depois inspeção para o CSV e nova avaliação. Se perder pontos, o veículo passa a ser classificado como modificado (art. 2º, §§ 5º a 7º).",
      },
      {
        situacao: "O veículo foi vendido. O comprador pode usar o CVCOL do antigo dono?",
        resposta: "Não. O órgão de trânsito exige novo CVCOL em nome do novo proprietário (art. 7º). Sem ele, o licenciamento como coleção é indeferido e as placas voltam ao tipo e espécie de origem.",
      },
      {
        situacao: "A entidade credenciada quer emitir o CVCOL por fotos enviadas pelo dono. É permitido?",
        resposta: "Não. A vistoria remota por fotografia ou meio digital não presencial é vedada às entidades credenciadas (art. 16, II).",
      },
    ],
    pegadinhas: [
      "Achar que basta ter trinta anos de fabricação. Também são exigidos valor histórico próprio e o CVCOL.",
      "Confundir original com modificado: original é quem tem oitenta pontos ou mais de cem, e o modificado precisa de CSV.",
      "Dizer que o CVCOL é permanente. Vale sessenta meses; o credenciamento da entidade é que dura quatro anos.",
      "Esquecer que a venda exige novo CVCOL em nome do comprador.",
      "Achar que os órgãos estaduais podem pedir documentos extras. O art. 4º, § 1º, veda qualquer exigência adicional.",
    ],
  },
  "965/2022": {
    simples: [
      "Esta resolução diz quem pode ter vaga exclusiva na rua e como ela é marcada. Quem cria e regulamenta essas áreas é o órgão de trânsito com circunscrição sobre a via (art. 2º). As áreas específicas são nove: veículo de aluguel, pessoa com deficiência, pessoa idosa, carga e descarga, ambulância, estacionamento rotativo, curta duração (até trinta minutos, não pago, com pisca-alerta ligado), viaturas policiais e veículos elétricos durante a recarga (art. 3º).",
      "Área de segurança é outra coisa: é o trecho da via diante de edificações públicas ou especiais, do tamanho da testada do imóvel, onde parar e estacionar são proibidos. É definida pelas autoridades locais de segurança pública, mas projeto, sinalização e fiscalização são do órgão de trânsito (art. 6º). A sinalização é a placa R-6c \"Proibido Parar e Estacionar\" com a informação \"Área de Segurança\" (art. 6º, § 3º).",
      "Vagas de pessoa com deficiência (com comprometimento de mobilidade) e de pessoa idosa: ficam marcadas no chão, com o Símbolo Internacional de Acesso ou o símbolo \"Idoso\". Em estabelecimentos privados de uso coletivo, as vagas reservadas são numeradas em sequência, sem repetir número (arts. 7º e 9º). A sinalização é feita pelo órgão de trânsito ou, em área privada, pelo proprietário (arts. 8º e 10).",
      "Para usar essas vagas é obrigatória a credencial do beneficiário (art. 11). A credencial vale em todo o território nacional e a física é emitida pelo órgão de trânsito do município onde a pessoa mora (art. 12).",
      "A credencial só vale se for usada para transportar o beneficiário (art. 14, II). A credencial não isenta o pagamento em estacionamento rotativo pago nem em estabelecimentos privados de uso coletivo (art. 18). É proibido reservar parte da via para estacionamento privativo em situações que a resolução não prevê (art. 19).",
    ],
    atualizacoes: [
      "Resolução 1.012/2024 (em vigor desde a publicação): a credencial pode ser física ou digital. A digital é expedida pelo órgão máximo executivo de trânsito da União, pode ser mostrada no aplicativo oficial ou impressa em papel A4 comum, e deve ser vinculada a um único veículo, que pode ser trocado a qualquer tempo (art. 12-A).",
      "Se o beneficiário vincula a credencial digital ao veículo, não precisa imprimir nem colocar no painel (art. 12-A, § 4º). Sem a vinculação, usa a versão impressa no painel, com a frente voltada para cima, podendo ser em preto e branco (art. 12-A, § 5º). A fiscalização tem consulta on-line ao veículo vinculado e validação por QR Code.",
      "A prova pode cobrar o que foi tirado: a 1.012 revogou o parágrafo único do art. 14, o art. 16 (recolhimento da credencial) e o art. 21 (lista de penalidades). A credencial física temporária passou a ter prazo definido pelo município (art. 13, § 2º). Quando o beneficiário falece, a credencial digital é cancelada pela União (art. 13, § 3º).",
    ],
    quadro: {
      titulo: "Credencial de vaga reservada (idoso e pessoa com deficiência)",
      linhas: [
        ["Obrigatória", "Para usar as vagas reservadas (art. 11)"],
        ["Quem emite a física", "Órgão de trânsito do município de domicílio do beneficiário (art. 12)"],
        ["Quem emite a digital", "Órgão máximo executivo de trânsito da União (art. 12-A)"],
        ["Onde vale", "Em todo o território nacional (art. 11)"],
        ["Só vale se", "Usada para transportar o beneficiário; a física, no original e no painel com a frente para cima (art. 14)"],
        ["Digital", "Vinculada a um único veículo, que pode ser trocado; dispensa impressão e painel (art. 12-A)"],
        ["Isenta de pagar o rotativo pago?", "Não (art. 18)"],
        ["Irregularidade na emissão", "O órgão emissor pode suspender ou cassar, com devido processo legal (art. 17)"],
      ],
    },
    exemplos: [
      {
        situacao: "Um motorista estaciona na vaga de idoso com a credencial da avó, mas a avó não está no carro. Pode?",
        resposta: "Não. A credencial só vale quando usada para transportar o beneficiário (art. 14, II). Sem isso, a conduta se encaixa no art. 181, inciso XX, do CTB.",
      },
      {
        situacao: "Uma idosa usa o celular com a credencial digital já vinculada ao carro dela. Precisa imprimir e deixar no painel?",
        resposta: "Não. Com a credencial digital vinculada a um único veículo, fica dispensada a impressão e o uso no painel (art. 12-A, § 4º).",
      },
      {
        situacao: "A pessoa com deficiência estaciona em vaga reservada no rotativo pago do centro. Está isenta da tarifa?",
        resposta: "Não. A credencial não exime do pagamento em estacionamento rotativo pago (art. 18).",
      },
      {
        situacao: "Um prédio público quer proibir a parada na frente dele, com a extensão da testada. Que área é essa e qual é a placa?",
        resposta: "É a área de segurança (art. 6º), sinalizada com a placa R-6c \"Proibido Parar e Estacionar\" com a informação \"Área de Segurança\".",
      },
    ],
    pegadinhas: [
      "Dizer que a credencial só pode ser física. Desde a Resolução 1.012/2024 ela também pode ser digital, emitida pela União.",
      "Achar que a credencial vale só no município que a emitiu: vale em todo o território nacional.",
      "Confundir área de segurança (proibido parar e estacionar na frente de prédio especial) com vaga reservada.",
      "Esquecer que a credencial não isenta o pagamento do rotativo pago.",
      "Citar o art. 16 ou o art. 21 como vigentes: foram revogados pela 1.012/2024.",
    ],
    fontes: ["1012/2024"],
  },
  "927/2022": {
    simples: [
      "Para tirar ou renovar a CNH (ou a ACC), o candidato passa por dois exames: o de aptidão física e mental, feito por médico perito examinador de trânsito, e a avaliação psicológica, feita por psicólogo perito examinador de trânsito (art. 1º). Cada resultado é de exclusiva responsabilidade do profissional que o assina (art. 10).",
      "Exame médico: começa pela anamnese (questionário e interrogatório), segue com o exame físico geral e os exames específicos (visão, audição, coração e pulmão, neurológico, aparelho locomotor e, nas categorias C, D e E, distúrbios do sono na renovação, adição e mudança de categoria) e, se o médico quiser, exames complementares (art. 4º). O candidato com deficiência física é examinado por Junta Médica Especial (art. 4º, § 1º).",
      "Avaliação psicológica: mede tomada e processamento de informação, tomada de decisão, comportamento, autoavaliação do comportamento e traços de personalidade, usando entrevista, testes psicológicos, dinâmicas de grupo e escuta (arts. 5º e 6º).",
      "Os resultados do médico são quatro: apto; apto com restrições (a CNH registra a restrição ou adaptação do veículo); inapto temporário (o problema pode ser tratado ou corrigido); inapto (o motivo é irreversível) (art. 8º). Na avaliação psicológica são três: apto, inapto temporário (desempenho não condizente, mas passível de adequação) e inapto (art. 9º). O psicólogo deve liberar o resultado em até dois dias úteis (art. 9º, § 3º).",
      "Se discordar, o candidato pode pedir Junta Médica e/ou Psicológica, em até trinta dias do conhecimento do resultado, qualquer que seja ele (art. 12). Mantida a inaptidão permanente, cabe recurso ao CETRAN (ou ao CONTRANDIFE, no DF) em trinta dias do resultado da revisão (art. 13). O pedido e o recurso são feitos no órgão de trânsito do estado ou DF onde o interessado mora (art. 14).",
    ],
    quadro: {
      titulo: "Resultados e prazos que mais caem",
      linhas: [
        ["Exame médico: resultados", "Apto, apto com restrições, inapto temporário, inapto (art. 8º)"],
        ["Avaliação psicológica: resultados", "Apto, inapto temporário, inapto (art. 9º)"],
        ["Inapto temporário", "Problema passível de tratamento ou correção (médico) ou de adequação (psicólogo)"],
        ["Inapto", "Motivo irreversível, sem tratamento ou correção (médico)"],
        ["Resultado do psicólogo", "Disponibilizado em até dois dias úteis (art. 9º, § 3º)"],
        ["Pedir Junta Médica ou Psicológica", "Trinta dias do conhecimento do resultado (art. 12)"],
        ["Composição da junta", "Três médicos peritos ou especialistas em medicina de tráfego; ou três psicólogos peritos ou especialistas em psicologia de trânsito (art. 12, §§ 1º e 2º)"],
        ["Órgão designa a junta", "Em quinze dias úteis do requerimento; a junta decide em trinta dias da designação (art. 14, §§ 1º e 3º)"],
        ["Recurso ao CETRAN/CONTRANDIFE", "Trinta dias do resultado da revisão, se mantida inaptidão permanente (art. 13)"],
        ["Credenciamento da clínica", "Um ano, renovável; a cada dois anos comprova as instalações (art. 16, §§ 2º e 3º)"],
      ],
    },
    exemplos: [
      {
        situacao: "O médico considera o candidato inapto porque está com uma infecção que tem tratamento. Qual é o resultado correto?",
        resposta: "Inapto temporário: o motivo da reprovação é passível de tratamento ou correção (art. 8º, III). Inapto, sem ser temporário, seria para motivo irreversível.",
      },
      {
        situacao: "O candidato apto precisa usar óculos para dirigir. Como o resultado fica registrado?",
        resposta: "Como apto com restrições: há necessidade de registrar na CNH a restrição ou adaptação (art. 8º, II).",
      },
      {
        situacao: "Candidato reprovado na avaliação psicológica quer contestar. Em quanto tempo deve pedir a junta, e a quem?",
        resposta: "Em trinta dias, contados do seu conhecimento do resultado, ao órgão de trânsito do estado ou do DF onde mora, que instaura uma Junta Psicológica (arts. 12 e 14).",
      },
      {
        situacao: "A Junta Médica manteve a inaptidão permanente. Ainda dá para recorrer?",
        resposta: "Sim: recurso ao CETRAN (ou ao CONTRANDIFE, no DF) em trinta dias contados do conhecimento do resultado da revisão (art. 13).",
      },
    ],
    pegadinhas: [
      "Trocar os resultados: a avaliação psicológica não tem \"apto com restrições\"; essa categoria é do exame médico.",
      "Confundir inapto temporário (tem tratamento ou adequação) com inapto (irreversível).",
      "Achar que a junta só pode ser pedida se o resultado for inapto. O art. 12 diz \"independentemente do resultado\".",
      "Esquecer que o recurso ao CETRAN só cabe depois da junta, quando mantida a inaptidão permanente.",
      "Dizer que o médico não precisa de especialização. Desde 12 de abril de 2024, médicos e psicólogos credenciados devem ter título de especialista em medicina de tráfego e em psicologia do trânsito, respectivamente (art. 19, § 2º).",
    ],
  },
  "941/2022": {
    simples: [
      "A vistoria de identificação veicular é a conferência do veículo antes de mudar de dono ou de domicílio entre municípios ou estados. Ela é de responsabilidade dos órgãos executivos de trânsito dos Estados e do DF, que podem fazê-la com seus servidores ou habilitar uma pessoa jurídica pública ou privada (arts. 1º e 2º).",
      "O que se verifica (art. 2º, § 2º): se a identificação do veículo e a documentação são autênticas; se a propriedade é legítima; se os equipamentos obrigatórios existem e funcionam; e se as características originais foram modificadas e, havendo alteração, se ela foi autorizada, regularizada e consta do prontuário.",
      "O resultado é o laudo único, emitido só por meio eletrônico. Ele só tem validade no Sistema Nacional de Trânsito se for registrado no SISCSV, mantido pelo órgão máximo executivo de trânsito da União (art. 2º, § 1º).",
      "Há uma proibição importante: não se faz vistoria de identificação em veículo sinistrado com laudo pericial de perda total (art. 2º, § 4º).",
      "Vistoria móvel (fora da sede da vistoriadora) só em casos listados: veículo indenizado por seguradora, recuperado ou alienado por instituição financeira, adquirido ou vendido por empresa que comercializa veículos, apreendido em pátio público com liberação condicionada, em leilão ou leiloado, e veículo com peso bruto total acima de dez toneladas (art. 3º). Em regra, ela fica dentro da unidade da federação em que a empresa é habilitada, com exceções (art. 4º).",
    ],
    atualizacoes: [
      "Resolução 977/2022 (em vigor desde 1º de agosto de 2022): a vistoria pode ser dispensada, a critério do órgão de trânsito e após análise do caso concreto, em três hipóteses: fusão, cisão ou incorporação de empresas com transferência de veículos entre elas; transferência de veículos entre entes públicos; e transferência entre filiais da mesma empresa (art. 2º-A).",
      "Também pela 977/2022, a habilitação de empresas passa a ser opcional para o órgão: o art. 5º agora trata dos órgãos que optarem por habilitar empresas. A Resolução 22/1998 foi revogada.",
    ],
    quadro: {
      titulo: "Vistoria de identificação: o essencial",
      linhas: [
        ["Quando", "Transferência de propriedade ou de domicílio intermunicipal ou interestadual (art. 2º)"],
        ["Quem é responsável", "Órgãos executivos de trânsito dos Estados e do DF; podem habilitar pessoa jurídica (arts. 1º e 2º)"],
        ["Documento final", "Laudo único eletrônico, válido no SNT se registrado no SISCSV (art. 2º, § 1º)"],
        ["Proibida", "Em veículo sinistrado com laudo de perda total (art. 2º, § 4º)"],
        ["Pode ser dispensada", "Fusão, cisão ou incorporação; entre entes públicos; entre filiais da mesma empresa (art. 2º-A, Res. 977/2022)"],
        ["Vistoria móvel", "Só nas hipóteses do art. 3º, como seguradora, instituição financeira, leilão e PBT acima de dez toneladas"],
      ],
    },
    exemplos: [
      {
        situacao: "Um carro será vendido para uma pessoa de outro estado. A vistoria é necessária?",
        resposta: "Em regra, sim: a vistoria é feita na transferência de propriedade ou de domicílio intermunicipal ou interestadual (art. 2º).",
      },
      {
        situacao: "Uma empresa de transportes transfere veículos para uma filial da mesma empresa. A vistoria é obrigatória?",
        resposta: "Pode ser dispensada, a critério do órgão de trânsito, depois de analisar o caso concreto (art. 2º-A, III, incluído pela Resolução 977/2022).",
      },
      {
        situacao: "Uma seguradora pagou indenização integral por um sinistro e quer vender o veículo recuperado. Pode fazer vistoria de identificação nele?",
        resposta: "A vistoria móvel é permitida no pátio da seguradora para veículo indenizado integralmente (art. 3º, I). Mas é vedada a vistoria de identificação em veículo sinistrado com laudo pericial de perda total (art. 2º, § 4º).",
      },
    ],
    pegadinhas: [
      "Achar que a vistoria só verifica a numeração do chassi: ela também confere propriedade, equipamentos obrigatórios e modificações.",
      "Dizer que o laudo vale em qualquer lugar por si só. Para valer no SNT, precisa estar registrado no SISCSV.",
      "Esquecer a dispensa trazida pela Resolução 977/2022; ela é a atualização mais cobrada desta norma.",
      "Confundir vistoria móvel com vistoria sem regras: ela só cabe nas hipóteses listadas no art. 3º.",
    ],
    fontes: ["977/2022"],
  },
  "918/2022": {
    simples: [
      "Esta resolução conta o caminho de uma multa, do flagrante até a cobrança. Entenda as etapas na ordem: primeiro o AIT, depois a NA, depois a defesa e, por fim, a NP.",
      "AIT (Auto de Infração de Trânsito): é o documento que inicia o processo administrativo. Pode ser lavrado pelo agente em documento próprio, em talão eletrônico ou registrado em sistema, quando a infração é comprovada por equipamento com registrador de imagem (art. 3º, § 1º). O AIT vale como NA se o condutor o assinar e for o proprietário ou o principal condutor previamente identificado, e constar a data final da defesa (art. 3º, § 5º).",
      "NA (Notificação da Autuação): avisa o proprietário de que seu veículo cometeu uma infração. Deve ser expedida em até 30 dias contados da infração; se não sair nesse prazo, o AIT é arquivado (art. 4º e § 1º). A NA traz a data final para a defesa, que não pode ser inferior a 30 dias (art. 4º, § 2º).",
      "Quem dirigia? Se o condutor não é o proprietário e não foi identificado na hora, o proprietário (ou principal condutor) indica o real condutor em formulário, dentro do prazo da NA (art. 5º). O proprietário responde pela infração quando não identifica o condutor no prazo, identifica fora das regras do art. 5º ou não há registro de comunicação de venda na época da infração (art. 6º). Se for pessoa jurídica, a multa é do art. 257, § 8º, do CTB (art. 7º).",
      "Defesa da autuação: a autoridade a aprecia, inclusive no mérito. Acolhida, o AIT é cancelado e arquivado (art. 9º, § 1º). Indeferida ou não apresentada, aplica-se a penalidade e expede-se a NP em até 180 dias da infração; se a defesa foi apresentada no prazo, esse limite sobe para 360 dias (art. 9º, §§ 2º e 3º).",
      "Advertência por escrito: em infração leve ou média, a autoridade aplica advertência em vez de multa, nos termos do art. 267 do CTB; ela não gera pontuação (art. 10, § 4º). Se a multa foi aplicada quando o infrator se enquadrava nos requisitos do art. 267, ela é nula (art. 10, § 8º).",
    ],
    atualizacoes: [
      "Resolução 991/2023 (em vigor desde 2 de maio de 2023): os órgãos autuadores da União arrecadam multas pela GRU do tipo Cobrança ou pela plataforma PagTesouro (art. 25).",
      "Também pela 991/2023, os órgãos arrecadadores podem firmar acordos, sem ônus para si, para aceitar o pagamento de multas com cartão de débito ou crédito, à vista ou em parcelas mensais, com regularização imediata do veículo. Para isso devem pedir autorização ao órgão máximo executivo de trânsito da União (art. 27).",
    ],
    quadro: {
      titulo: "Multa de trânsito: etapas e prazos",
      linhas: [
        ["AIT", "Início do processo administrativo (art. 2º, I)"],
        ["NA", "Em até 30 dias da infração, senão o AIT é arquivado (art. 4º)"],
        ["Prazo de defesa", "Não inferior a 30 dias, contados da expedição da NA ou do edital (art. 4º, § 2º)"],
        ["NP", "Em até 180 dias da infração; 360 dias se houve defesa no prazo (art. 9º, §§ 2º e 3º)"],
        ["Defesa acolhida", "AIT cancelado e arquivado (art. 9º, § 1º)"],
        ["Advertência por escrito", "Infração leve ou média; sem pontos no prontuário (art. 10, § 4º)"],
        ["Repasse do FUNSET", "Cinco por cento do valor da multa, pelo órgão arrecadador (art. 2º, V)"],
        ["Quem autua x quem arrecada", "Autuador autua, julga a defesa e aplica a penalidade; arrecadador cobra e repassa (art. 2º, IV e V)"],
      ],
    },
    exemplos: [
      {
        situacao: "A infração foi em 1º de março e a notificação da autuação chegou ao proprietário só em maio. A multa vale?",
        resposta: "Não. A NA deve ser expedida em até 30 dias da infração. Passado esse prazo, o AIT é arquivado (art. 4º, § 1º).",
      },
      {
        situacao: "O proprietário apresentou defesa dentro do prazo e ela foi negada. Em quanto tempo a NP precisa ser expedida?",
        resposta: "Em até 360 dias contados da infração, porque houve defesa no prazo. Sem defesa, o limite é de 180 dias (art. 9º, §§ 2º e 3º).",
      },
      {
        situacao: "O proprietário vendeu o carro, mas não houve registro de comunicação de venda quando a infração ocorreu. De quem é a responsabilidade?",
        resposta: "Do proprietário que consta no cadastro: a ausência de registro da comunicação de venda na época da infração o torna responsável (art. 6º, III).",
      },
      {
        situacao: "Um motorista cometeu infração leve e o órgão aplicou advertência por escrito. Ele recebe pontos?",
        resposta: "Não. A advertência por escrito não gera registro de pontuação no prontuário (art. 10, § 4º).",
      },
    ],
    pegadinhas: [
      "Confundir NA (avisa da infração) com NP (avisa da penalidade e do valor da multa).",
      "Trocar os prazos: NA em até 30 dias da infração; NP em até 180 dias, ou 360 dias com defesa.",
      "Achar que a multa continua válida se a NA saiu fora do prazo: o AIT é arquivado.",
      "Dizer que o proprietário nunca responde por infração de outro condutor. Responde se não indicar o condutor no prazo ou indicar fora das regras.",
      "Atribuir à Resolução 918 a definição do valor da multa. Ela trata do procedimento, e os valores estão no CTB.",
    ],
    fontes: ["991/2023"],
  },
  "1031/2026": {
    simples: [
      "Esta é a resolução atual sobre fiscalização de álcool e outras substâncias ao volante. Ela revogou a Resolução 432/2013 (art. 15), então quem estudou pela norma antiga precisa atualizar. Fiscalizar o consumo deve ser rotina dos órgãos de trânsito e qualquer condutor abordado pode ser testado, mesmo sem sinais de embriaguez (art. 2º, § 1º).",
      "Como o agente constata a influência? Pelo menos um destes meios (art. 3º). Para álcool: etilômetro (teste do ar alveolar) ou sinais de alteração da capacidade psicomotora. Para outras substâncias: teste em aparelho que detecta a substância ou os sinais psicomotores. O etilômetro serve só para álcool (art. 3º, § 3º). Imagem e vídeo entram como prova suplementar, e deve-se priorizar os testes com aparelho (art. 3º, §§ 4º e 5º).",
      "O pré-teste (teste passivo) é só triagem: serve de indício, não caracteriza infração nem fundamenta autuação (art. 4º). O etilômetro precisa de modelo aprovado pelo Inmetro e verificação metrológica em dia (art. 5º), e do resultado se desconta a margem de erro máxima admissível, conforme a tabela do Anexo I. Reteste só se o resultado válido ficar prejudicado por motivo técnico ou operacional (art. 5º, § 2º).",
      "Sinais psicomotores: é preciso pelo menos dois sinais que, em conjunto, comprovem a situação, descritos no auto de infração ou em termo específico (art. 7º).",
      "Infração do art. 165 (administrativa): configura com etilômetro de 0,05 mg/L ou mais (descontado o erro máximo), teste positivo para outra substância, ou sinais psicomotores (art. 8º). Crime do art. 306: etilômetro de 0,34 mg/L ou mais (descontado o erro), teste positivo, sinais psicomotores, exame de sangue de 6 dg/L ou mais, exame clínico com laudo de médico perito ou exame laboratorial para outras substâncias (art. 9º). O crime não afasta a infração do art. 165 (art. 9º, § 1º).",
      "Recusa: quem se recusa a qualquer procedimento responde pelo art. 165-A, desde que não haja pelo menos dois sinais de alteração; havendo dois sinais, aplica-se o art. 165, sem prejuízo do crime do art. 306 (art. 8º, §§ 1º e 2º). Recusar é negar o procedimento oferecido; o condutor não escolhe qual deles será usado (art. 8º, § 3º).",
      "Depois da abordagem: o veículo fica retido até a apresentação de condutor habilitado, que também é fiscalizado; sem condutor apto, vai ao depósito (art. 11). O agente não recolhe a CNH por essas infrações (art. 12). Em caso de morte em sinistro de trânsito, é obrigatório exame de sangue ou laboratorial para a perícia oficial (art. 13).",
    ],
    atualizacoes: [
      "A Resolução 1.031/2026 revogou a Resolução 432/2013 e entrou em vigor na publicação; a alteração do Anexo da Resolução 985/2022 vale 60 dias depois da publicação (arts. 15 e 16).",
      "Novidades que costumam cair: dois sinais psicomotores em conjunto (art. 7º); pré-teste que não autua (art. 4º); o condutor não escolhe o meio de verificação (art. 8º, § 3º); e exames de sangue ou clínico como suplementares, a critério da autoridade policial (art. 9º, § 3º).",
    ],
    quadro: {
      titulo: "Álcool no trânsito: infração x crime",
      linhas: [
        ["Infração (art. 165 CTB)", "Etilômetro de 0,05 mg/L ou mais, descontado o erro máximo; ou teste positivo; ou sinais psicomotores (art. 8º)"],
        ["Crime (art. 306 CTB)", "Etilômetro de 0,34 mg/L ou mais, descontado o erro máximo; sangue de 6 dg/L ou mais; laudo clínico; ou os testes e sinais acima (art. 9º)"],
        ["Pré-teste", "Só triagem: não autua (art. 4º, § 2º)"],
        ["Sinais psicomotores", "Pelo menos dois, em conjunto (art. 7º, § 1º)"],
        ["Recusa", "Art. 165-A, se não houver dois sinais; com dois sinais, art. 165 e possível crime (art. 8º, §§ 1º e 2º)"],
        ["Veículo", "Retido até condutor habilitado; senão, depósito (art. 11)"],
        ["CNH", "O agente não a recolhe (art. 12)"],
      ],
    },
    exemplos: [
      {
        situacao: "O etilômetro marcou 0,10 mg/L. Qual é a consequência?",
        resposta: "Há infração administrativa do art. 165, pois a medição passou de 0,05 mg/L. Não é crime do art. 306, que exige 0,34 mg/L ou mais (arts. 8º e 9º).",
      },
      {
        situacao: "O condutor aceita fazer o pré-teste, que dá positivo, mas não quer soprar o etilômetro. Pode ser autuado só pelo pré-teste?",
        resposta: "Não. O pré-teste é só indicativo e não pode fundamentar a autuação (art. 4º, § 2º). Se ele recusar o procedimento adequado, aplica-se o art. 165-A, salvo se houver dois sinais psicomotores (art. 8º, § 1º).",
      },
      {
        situacao: "O condutor diz que prefere fazer exame de sangue em vez de soprar o etilômetro. Pode escolher?",
        resposta: "Não. A recusa se caracteriza pela negativa ao procedimento oferecido; o condutor não escolhe a modalidade (art. 8º, § 3º).",
      },
      {
        situacao: "O condutor é flagrado com 0,05 mg/L e o agente pergunta se pode levar a CNH. Pode?",
        resposta: "Não. O agente não recolhe o documento de habilitação por essas infrações (art. 12). A suspensão do direito de dirigir segue regulamentação específica.",
      },
    ],
    pegadinhas: [
      "Usar a Resolução 432/2013 como se ainda valesse. Ela foi revogada pela 1.031/2026.",
      "Dizer que o pré-teste basta para autuar. Ele é só triagem.",
      "Confundir os limites: 0,05 mg/L é infração; 0,34 mg/L é crime.",
      "Achar que o etilômetro serve para drogas. Ele só verifica álcool.",
      "Esquecer que o exame de sangue e o clínico são suplementares: não são necessários para a infração.",
      "Dizer que a recusa sempre dá o art. 165-A. Com dois sinais psicomotores, aplica-se o art. 165.",
    ],
  },
  "1009/2024": {
    simples: [
      "O exame toxicológico de larga janela de detecção usa amostra de cabelo ou pelo (amostra queratínica) e enxerga o consumo de substâncias psicoativas em uma janela retrospectiva mínima de noventa dias (Resolução 923/2022, art. 2º). Ele vale para motoristas profissionais das categorias C, D e E.",
      "Quando fazer: para obter ou renovar a CNH nessas categorias, inclusive nas mudanças de categoria, é preciso resultado negativo (art. 10, nova redação). Na habilitação, o exame vem antes dos exames feitos pelo órgão de trânsito (art. 10, parágrafo único).",
      "Periódico: quem já tem CNH C, D ou E e tem menos de setenta anos refaz o exame a cada dois anos e seis meses, a contar da obtenção ou renovação da CNH, independentemente da validade dos demais exames (art. 10-A). O calendário é calculado pelo órgão máximo executivo de trânsito da União com base na data de emissão da CNH no RENACH; segunda via não muda o calendário (art. 10-A, §§ 1º e 2º). Não se exige o periódico de quem tem CNH com validade inferior a três anos (art. 10-A, § 3º).",
      "Validade do exame: noventa dias, contados da coleta, e o resultado pode ser usado nesse período para todos os fins (art. 10-B). O laboratório entrega o laudo detalhado ao condutor e insere o resultado no RENACH em até trinta dias da coleta (arts. 9º e 15).",
      "Se o periódico der positivo para uma das substâncias do Anexo I em nível que configure uso, a penalidade é suspensão do direito de dirigir por três meses. O levantamento depende de novo exame negativo no RENACH ou do cumprimento da penalidade, e não se aplicam outras penalidades, nem acessórias (art. 16).",
      "Quem deixa de fazer o exame sofre as penalidades do CTB conforme o MBFT (art. 22). Se o condutor mudar para a categoria B ou AB, ou pedir o cancelamento da CNH, até o trigésimo dia depois do vencimento do prazo do periódico, afasta a penalidade do art. 165-D do CTB (art. 22, § 2º).",
    ],
    atualizacoes: [
      "A Resolução 1.009/2024 (em vigor desde a publicação) alterou a 923/2022 e a 789/2020. Entre as mudanças: laudo entregue ao condutor em até trinta dias, validade de noventa dias do exame, alerta de vencimento enviado trinta dias antes do prazo do periódico (art. 10-B, § 2º) e regras para o exame de periodicidade.",
      "O art. 2º da 1.009/2024, que incluía na Resolução 789/2020 o cancelamento da CNH a qualquer tempo e sem motivação, foi revogado pela Resolução 1.020/2025 (art. 139).",
    ],
    quadro: {
      titulo: "Exame toxicológico: prazos que mais caem",
      linhas: [
        ["Quem faz", "Condutores das categorias C, D e E (art. 10)"],
        ["Quando", "Obtenção e renovação da CNH, inclusive mudança para C, D ou E (art. 10)"],
        ["Periódico", "A cada dois anos e seis meses, para quem tem menos de setenta anos (art. 10-A)"],
        ["Validade do exame", "Noventa dias, a contar da coleta (art. 10-B)"],
        ["Laudo e RENACH", "Em até trinta dias da coleta (arts. 9º e 15)"],
        ["Alerta de vencimento", "Enviado com trinta dias de antecedência (art. 10-B, § 2º)"],
        ["Resultado positivo no periódico", "Suspensão de três meses; sem outras penalidades (art. 16)"],
        ["Fugir da penalidade do art. 165-D", "Mudar para B ou AB, ou cancelar a CNH, até o trigésimo dia após o vencimento (art. 22, § 2º)"],
      ],
    },
    exemplos: [
      {
        situacao: "Um motorista de caminhão (categoria E) com 45 anos renovou a CNH. Quando precisa fazer o próximo exame toxicológico?",
        resposta: "A cada dois anos e seis meses, a contar da renovação, mesmo que os demais exames ainda estejam válidos (art. 10-A).",
      },
      {
        situacao: "O exame foi coletado há quatro meses. Pode ser usado para renovar a CNH hoje?",
        resposta: "Não. O exame tem validade de noventa dias a partir da coleta (art. 10-B). Passado esse prazo, é preciso refazer.",
      },
      {
        situacao: "O periódico de um condutor deu positivo em nível de uso. Qual é a penalidade?",
        resposta: "Suspensão do direito de dirigir por três meses, com levantamento condicionado a novo exame negativo ou ao cumprimento da pena, sem outras penalidades (art. 16).",
      },
      {
        situacao: "Um motorista de 72 anos com CNH categoria D precisa fazer o toxicológico periódico?",
        resposta: "O periódico do art. 10-A vale para quem tem menos de setenta anos. Com 72, ele não está sujeito a esse periódico.",
      },
    ],
    pegadinhas: [
      "Trocar os prazos: periódico a cada dois anos e seis meses; validade do exame de noventa dias.",
      "Achar que o exame vale para todas as categorias. É para C, D e E.",
      "Esquecer a exceção de idade: o periódico se aplica a quem tem menos de setenta anos.",
      "Dizer que a segunda via da CNH reinicia o calendário. Não reinicia.",
      "Confundir a penalidade: no periódico positivo, a resolução prevê suspensão de três meses e veda outras penalidades.",
    ],
    fontes: ["923/2022", "1020/2025"],
  },
};
