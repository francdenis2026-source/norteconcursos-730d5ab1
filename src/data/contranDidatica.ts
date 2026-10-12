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
};
