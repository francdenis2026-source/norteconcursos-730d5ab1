import type { TrackLesson } from "./types";

/**
 * Direito Administrativo: tópicos recorrentes em editais policiais.
 * Bases normativas: Constituição Federal (art. 37), Lei 9.784/1999, Lei 8.112/1990 e Lei 14.133/2021 (texto compilado do Planalto).
 */
export const ADMINISTRATIVO_1: TrackLesson[] = [
  {
    id: "adm-principios",
    group: "Fundamentos",
    title: "Princípios da Administração Pública",
    edital: "Princípios da administração pública (art. 37 da Constituição)",
    simples: "O art. 37 da Constituição manda a administração pública obedecer a cinco princípios: legalidade, impessoalidade, moralidade, publicidade e eficiência (a sigla é LIMPE). Legalidade, para o administrador, significa só poder fazer o que a lei permite; para o particular, pode-se fazer tudo o que a lei não proíbe. Impessoalidade exige tratar todos sem favorecimento. Moralidade exige honestidade e boa-fé. Publicidade garante a transparência dos atos. Eficiência exige bom resultado com uso adequado dos recursos.",
    pontos: ["Legalidade: administrador só age conforme a lei.", "Impessoalidade: sem favorecimento nem perseguição; o ato é do órgão, não da pessoa.", "Moralidade: probidade, lealdade e boa-fé.", "Publicidade: transparência, salvo sigilo previsto em lei.", "Eficiência: foi acrescentada ao art. 37 em 1998.", "Outros princípios: supremacia do interesse público, indisponibilidade, razoabilidade, proporcionalidade, motivação."],
    exemplo: "Uma prefeitura contratar uma empresa só por ser de um parente do prefeito viola a impessoalidade e a moralidade.",
    atencao: ["Para o particular vale a autonomia da vontade; para o administrador, a legalidade estrita.", "Sigilo só vale quando a lei o prevê ou quando é imprescindível à segurança da sociedade e do Estado."],
    quiz: [
      { q: "O princípio da eficiência consta expressamente do art. 37 da Constituição.", a: true, why: "Foi incluído pela Emenda Constitucional 19/1998." },
      { q: "A administração pública pode fazer tudo o que a lei não proíbe.", a: false, why: "Isso vale para o particular; o administrador só pode fazer o que a lei autoriza." },
    ],
  },
  {
    id: "adm-poderes",
    group: "Fundamentos",
    title: "Poderes administrativos",
    edital: "Poderes da administração: hierárquico, disciplinar, regulamentar e de polícia; uso e abuso do poder",
    simples: "Poderes administrativos são instrumentos que a lei dá ao administrador para atingir o interesse público. O poder hierárquico organiza a subordinação entre órgãos e agentes. O disciplinar permite punir servidores e quem tem vínculo com a administração. O regulamentar permite editar normas para fiel execução das leis. O poder de polícia limita direitos individuais em nome do interesse coletivo. Todo poder administrativo é também dever (poder-dever). O abuso de poder, por excesso ou desvio de finalidade, torna o ato ilegal.",
    pontos: ["Hierárquico: ordenar, fiscalizar, rever atos e delegar.", "Disciplinar: apura infrações e aplica sanções a quem tem vínculo com a administração.", "Regulamentar: decretos para fiel execução da lei, sem inovar.", "Polícia: restringe o uso de bens e liberdades em favor da coletividade, como fiscalização sanitária.", "Abuso de poder: excesso (agir além da competência) ou desvio de finalidade (agir por fim diverso do legal)."],
    exemplo: "Um agente que apreende mercadorias de um comerciante para prejudicá-lo, e não por infração real, pratica desvio de finalidade.",
    atencao: ["O poder regulamentar não pode criar direitos ou obrigações novos: só detalha a lei.", "Poder de polícia pode ser exercido pelo Estado; seus atos têm presunção de legitimidade."],
    quiz: [
      { q: "O desvio de finalidade é uma espécie de abuso de poder.", a: true, why: "O agente atua com fim diferente do previsto em lei." },
      { q: "O decreto regulamentar pode criar obrigações novas não previstas em lei.", a: false, why: "Ele só pode detalhar a lei, sem inovar." },
    ],
  },
  {
    id: "adm-atos",
    group: "Atos administrativos",
    title: "Atos administrativos: elementos e atributos",
    edital: "Ato administrativo: conceito, requisitos, atributos, extinção",
    simples: "Ato administrativo é a manifestação de vontade da administração que cria, modifica ou extingue direitos. Seus elementos são competência, finalidade, forma, motivo e objeto. Os atributos são presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade. Extingue-se o ato, entre outras formas, pela anulação (quando há ilegalidade) e pela revogação (por conveniência e oportunidade).",
    pontos: ["Elementos: competência, finalidade, forma, motivo e objeto.", "Presunção de legitimidade: o ato é presumido legal até prova em contrário.", "Imperatividade: o ato obriga o particular, independentemente de sua concordância.", "Autoexecutoriedade: a administração executa sem precisar de ordem judicial, nos casos previstos.", "Anulação: ilegalidade; feita pela administração ou pelo Judiciário; efeitos retroativos.", "Revogação: conveniência e oportunidade; só pela administração; efeitos para frente."],
    exemplo: "A prefeitura, ao perceber que alvará foi dado por servidor sem competência, pode anulá-lo por ilegalidade. Se o alvará era legal, mas deixou de ser conveniente, o caso é de revogação.",
    atencao: ["Judiciário anula atos ilegais, mas não revoga: não analisa conveniência e oportunidade.", "Competência e finalidade são sempre vinculadas; motivo e objeto podem ser discricionários."],
    quiz: [
      { q: "A revogação do ato administrativo decorre de ilegalidade e produz efeitos retroativos.", a: false, why: "A revogação decorre de conveniência e oportunidade e produz efeitos para frente. A anulação é que decorre de ilegalidade e retroage." },
      { q: "A competência é um dos elementos do ato administrativo.", a: true, why: "Os elementos são competência, finalidade, forma, motivo e objeto." },
    ],
  },
  {
    id: "adm-organizacao",
    group: "Organização",
    title: "Organização administrativa",
    edital: "Organização administrativa: administração direta e indireta",
    simples: "A administração direta é formada pelos órgãos da própria União, dos Estados, do Distrito Federal e dos Municípios. A indireta é formada por entidades com personalidade jurídica própria, criadas para executar atividades de forma descentralizada: autarquias, fundações públicas, empresas públicas e sociedades de economia mista. Centralização é a execução pelo próprio ente; descentralização, a transferência a outra pessoa jurídica; desconcentração, a distribuição interna de tarefas entre órgãos.",
    pontos: ["Autarquia: pessoa jurídica de direito público, criada por lei, para atividade típica de Estado.", "Fundação pública: patrimônio personalizado, para fins de interesse social.", "Empresa pública: capital integralmente público; qualquer forma jurídica.", "Sociedade de economia mista: capital público e privado, sob forma de sociedade anônima.", "Órgãos públicos não têm personalidade jurídica própria; fazem parte de uma pessoa jurídica.", "A criação de autarquia depende de lei; a das demais entidades, de autorização legal."],
    exemplo: "O INSS e o Banco Central são exemplos de autarquias federais: têm patrimônio e personalidade próprios, mas pertencem à administração indireta.",
    atencao: ["Desconcentração acontece dentro da mesma pessoa jurídica; descentralização cria ou usa outra pessoa jurídica.", "Empresa pública e sociedade de economia mista seguem, em regra, regime de direito privado."],
    quiz: [
      { q: "A criação de uma autarquia depende de lei.", a: true, why: "A Constituição exige lei específica para criar autarquia." },
      { q: "Desconcentração é a transferência de uma atividade a outra pessoa jurídica.", a: false, why: "Isso é descentralização; a desconcentração é a distribuição interna entre órgãos." },
    ],
  },
  {
    id: "adm-servidores",
    group: "Agentes públicos",
    title: "Agentes públicos e Lei 8.112/1990",
    edital: "Regime jurídico dos servidores públicos civis da União (Lei 8.112/1990)",
    simples: "A Lei 8.112/1990 é o estatuto dos servidores públicos civis da União. O cargo público é criado por lei, com denominação e vencimento próprios. A investidura em cargo efetivo depende de aprovação em concurso público. A estabilidade é adquirida após três anos de efetivo exercício, com avaliação especial de desempenho. Os deveres incluem assiduidade, lealdade, zelo e discrição; as penalidades disciplinares incluem advertência, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e destituição de função comissionada.",
    pontos: ["Concurso público: exigido para cargo efetivo; cargos em comissão são de livre nomeação e exoneração.", "Estágio probatório e estabilidade: três anos de efetivo exercício e avaliação especial.", "Penalidades: advertência, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e de função comissionada.", "Responsabilidade do servidor: civil, penal e administrativa, independentes entre si.", "Processo administrativo disciplinar: assegura contraditório e ampla defesa."],
    exemplo: "Um servidor que falta ao serviço sem justificativa pode responder a processo administrativo disciplinar, sem prejuízo de responder também nas esferas civil e penal, se houver.",
    atencao: ["O servidor estável só perde o cargo em casos como sentença judicial transitada em julgado, processo administrativo com ampla defesa e avaliação periódica de desempenho.", "As esferas de responsabilidade são, em regra, independentes: a absolvição penal por falta de provas não impede a punição administrativa."],
    quiz: [
      { q: "O servidor efetivo adquire estabilidade após três anos de efetivo exercício, desde que aprovado em avaliação especial de desempenho.", a: true, why: "É a regra do art. 41 da Constituição." },
      { q: "Para a investidura em cargo efetivo basta a indicação da autoridade competente.", a: false, why: "É exigida aprovação prévia em concurso público; a livre nomeação vale para cargos em comissão." },
    ],
  },
  {
    id: "adm-licitacoes",
    group: "Contratações",
    title: "Licitações e contratos (Lei 14.133/2021)",
    edital: "Licitações e contratos administrativos",
    simples: "Licitação é o procedimento pelo qual a administração escolhe a proposta mais vantajosa para contratar obras, serviços, compras e alienações. A regra é licitar. A lei atual é a Lei 14.133/2021 (nova Lei de Licitações). As modalidades são pregão, concorrência, concurso, leilão e diálogo competitivo. Há situações de dispensa de licitação (casos em que a competição é possível, mas a lei permite contratar diretamente) e de inexigibilidade (a competição é inviável, como na contratação de artista consagrado ou fornecedor exclusivo).",
    pontos: ["Modalidades da Lei 14.133/2021: pregão, concorrência, concurso, leilão e diálogo competitivo.", "Pregão: para bens e serviços comuns.", "Dispensa: a lei permite contratar sem licitação, mesmo havendo competição possível.", "Inexigibilidade: competição inviável.", "Princípios: legalidade, impessoalidade, moralidade, publicidade, eficiência, igualdade, julgamento objetivo e vinculação ao edital."],
    exemplo: "A compra de canetas, material comum disponível no mercado, costuma ser feita por pregão. A contratação de uma obra de grande porte exige concorrência, em regra.",
    atencao: ["A Lei 8.666/1993 foi substituída pela Lei 14.133/2021: confira a legislação em vigor ao estudar.", "Convite e tomada de preços eram modalidades da lei antiga e não existem na nova."],
    quiz: [
      { q: "A inexigibilidade ocorre quando a competição é inviável.", a: true, why: "É o caso de fornecedor exclusivo, por exemplo." },
      { q: "O convite e a tomada de preços são modalidades previstas na Lei 14.133/2021.", a: false, why: "Eram modalidades da Lei 8.666/1993; a nova lei prevê pregão, concorrência, concurso, leilão e diálogo competitivo." },
    ],
  },
  {
    id: "adm-responsabilidade",
    group: "Responsabilidade e controle",
    title: "Responsabilidade civil do Estado",
    edital: "Responsabilidade civil do Estado (art. 37, § 6º)",
    simples: "O art. 37, § 6º, da Constituição estabelece que as pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos respondem pelos danos que seus agentes, nessa qualidade, causarem a terceiros. A responsabilidade é objetiva: não é preciso provar culpa, basta mostrar a conduta, o dano e o nexo causal. O Estado tem direito de regresso contra o agente, mas só se houver dolo ou culpa deste.",
    pontos: ["Responsabilidade objetiva do Estado: dispensa prova de culpa.", "Elementos: conduta do agente, dano e nexo causal.", "Teoria do risco administrativo: admite excludentes (culpa exclusiva da vítima, força maior, fato de terceiro).", "Direito de regresso: contra o agente, se houve dolo ou culpa.", "Omissão: em regra a responsabilidade é subjetiva (exige culpa do serviço), segundo a corrente majoritária."],
    exemplo: "Uma viatura oficial colide com um carro particular por distração do motorista. O dono do carro cobra o Estado sem precisar provar a culpa; depois, o Estado pode cobrar do motorista, se ele agiu com culpa.",
    atencao: ["O particular prejudicado processa o Estado, e não diretamente o agente, em regra.", "A responsabilidade objetiva não significa que o Estado responde sempre: as excludentes afastam o dever de indenizar."],
    quiz: [
      { q: "A responsabilidade civil do Estado por ação de seus agentes é objetiva.", a: true, why: "Basta demonstrar conduta, dano e nexo causal." },
      { q: "O Estado, depois de indenizar, pode cobrar do agente mesmo que ele não tenha agido com dolo ou culpa.", a: false, why: "O direito de regresso exige dolo ou culpa do agente." },
    ],
  },
  {
    id: "adm-processo",
    group: "Responsabilidade e controle",
    title: "Controle da Administração e processo administrativo (Lei 9.784/1999)",
    edital: "Controle da administração pública; processo administrativo federal",
    simples: "Controle da administração é a fiscalização de sua atuação. Pode ser interno (da própria administração), externo (do Legislativo com auxílio do Tribunal de Contas, e do Judiciário) e social (da sociedade). A Lei 9.784/1999 regula o processo administrativo na administração federal e fixa princípios como legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público e eficiência.",
    pontos: ["Controle interno: a administração revê seus próprios atos (autotutela).", "Controle externo: Congresso Nacional com o Tribunal de Contas da União; Judiciário.", "Autotutela: a administração pode anular seus atos ilegais e revogar os inconvenientes.", "Prazo para a administração anular atos favoráveis aos destinatários: cinco anos, salvo má-fé.", "Princípios da Lei 9.784/1999: legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público e eficiência."],
    exemplo: "A Administração federal descobre que concedeu um benefício com erro e quer anulá-lo. Se o ato favoreceu o destinatário de boa-fé e já passaram cinco anos, o direito de anular decai.",
    atencao: ["O Judiciário controla a legalidade dos atos, e não sua conveniência e oportunidade.", "A Súmula 473 do STF consagra a autotutela, ressalvado o direito de terceiros de boa-fé e a apreciação judicial."],
    quiz: [
      { q: "A autotutela permite que a administração anule seus próprios atos ilegais.", a: true, why: "Também permite revogar atos por conveniência e oportunidade." },
      { q: "O Judiciário pode revogar atos administrativos por razões de conveniência e oportunidade.", a: false, why: "O controle judicial é de legalidade; a revogação por mérito é da própria administração." },
    ],
  },
];
