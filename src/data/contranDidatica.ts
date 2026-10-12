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
};
