import type { TrackLesson } from "./types";

/**
 * Direitos Humanos: teoria geral e principais tratados cobrados em editais policiais.
 * Confira, no edital, quais convenções e regras internacionais foram listadas para o seu cargo.
 */
export const HUMANOS_1: TrackLesson[] = [
  {
    id: "dh-teoria",
    group: "Teoria geral",
    title: "Teoria geral dos direitos humanos",
    edital: "Teoria geral dos direitos humanos: conceito, características e dimensões",
    simples: "Direitos humanos são os direitos de toda pessoa pelo simples fato de ser pessoa, ligados à dignidade humana. Suas principais características são universalidade (valem para todos), indivisibilidade e interdependência (não se pode proteger uns e esquecer outros), inalienabilidade (não se pode renunciar a eles nem vendê-los), imprescritibilidade e historicidade (surgem e evoluem com a história). A doutrina costuma classificá-los em dimensões: a primeira reúne direitos civis e políticos (liberdade); a segunda, direitos sociais, econômicos e culturais (igualdade); a terceira, direitos de solidariedade, como meio ambiente e paz.",
    pontos: ["Universalidade: valem para todos, em qualquer lugar.", "Indivisibilidade e interdependência: formam um conjunto.", "Inalienabilidade: não se transferem nem se vendem.", "Primeira dimensão: liberdades civis e políticas.", "Segunda dimensão: direitos sociais, econômicos e culturais.", "Terceira dimensão: solidariedade (meio ambiente, paz, desenvolvimento)."],
    exemplo: "O direito de votar (político) e o direito à saúde (social) são de dimensões diferentes, mas ambos fazem parte do mesmo conjunto de direitos humanos.",
    atencao: ["As 'gerações' vistas como sucessão podem induzir a erro: as dimensões se somam, não se substituem.", "Direitos humanos têm limites: não são absolutos, e podem ser restringidos de forma proporcional."],
    quiz: [
      { q: "A universalidade significa que os direitos humanos valem para todas as pessoas.", a: true, why: "Eles decorrem da dignidade de toda pessoa humana." },
      { q: "A segunda dimensão dos direitos humanos refere-se aos direitos civis e políticos.", a: false, why: "Civis e políticos são de primeira dimensão; a segunda trata dos direitos sociais, econômicos e culturais." },
    ],
  },
  {
    id: "dh-tratados-status",
    group: "Teoria geral",
    title: "Tratados internacionais de direitos humanos no Brasil",
    edital: "Incorporação e hierarquia dos tratados de direitos humanos",
    simples: "Para valer no Brasil, um tratado precisa ser assinado, aprovado pelo Congresso Nacional por decreto legislativo, ratificado e promulgado por decreto do Presidente. Os tratados de direitos humanos aprovados em cada Casa do Congresso, em dois turnos, por três quintos dos votos, equivalem a emendas constitucionais (art. 5º, § 3º). Os aprovados sem esse rito têm, segundo o Supremo Tribunal Federal, status supralegal: ficam abaixo da Constituição e acima das leis ordinárias.",
    pontos: ["Fases: assinatura, aprovação (decreto legislativo), ratificação e promulgação (decreto).", "Com o rito do art. 5º, § 3º (três quintos, dois turnos): equivalem a emenda constitucional.", "Sem esse rito: status supralegal, segundo o STF.", "A Convenção sobre os Direitos das Pessoas com Deficiência (2007, Nova York) foi incorporada com status de emenda.", "O Brasil reconhece a jurisdição do Tribunal Penal Internacional (art. 5º, § 4º)."],
    exemplo: "Uma lei ordinária que contrariasse a Convenção Americana sobre Direitos Humanos teria sua aplicação afastada, por esta ser supralegal.",
    atencao: ["Supralegal não é constitucional: o tratado não pode contrariar a Constituição.", "A promulgação por decreto presidencial é o que dá publicidade e vigência interna ao tratado."],
    quiz: [
      { q: "Tratado de direitos humanos aprovado por três quintos em dois turnos em cada Casa tem status de emenda constitucional.", a: true, why: "É a regra do art. 5º, § 3º, da Constituição." },
      { q: "Tratados de direitos humanos sem o rito especial têm status de lei ordinária.", a: false, why: "Segundo o STF, têm status supralegal." },
    ],
  },
  {
    id: "dh-sistemas",
    group: "Sistemas de proteção",
    title: "Declaração Universal, Pacto de São José e sistemas de proteção",
    edital: "Declaração Universal dos Direitos Humanos; Convenção Americana sobre Direitos Humanos",
    simples: "A Declaração Universal dos Direitos Humanos foi adotada pela Assembleia Geral da ONU em 1948. Ela estabelece direitos básicos de todas as pessoas, mas, por si só, é uma declaração e não um tratado. No sistema interamericano (da OEA), a Convenção Americana sobre Direitos Humanos, conhecida como Pacto de São José da Costa Rica (1969), criou a Comissão Interamericana e a Corte Interamericana de Direitos Humanos. O Brasil incorporou a Convenção em 1992 e reconheceu a jurisdição da Corte em 1998.",
    pontos: ["Declaração Universal: 1948, Assembleia Geral da ONU.", "Pacto de São José da Costa Rica: 1969; entrou em vigor em 1978; promulgado no Brasil em 1992.", "Órgãos do sistema interamericano: Comissão e Corte Interamericana.", "Só a Comissão e os Estados-partes podem submeter caso à Corte; indivíduos peticionam à Comissão.", "A prisão civil por dívida é vedada pela Convenção, salvo a de pensão alimentícia."],
    exemplo: "Uma vítima de violação de direitos humanos que esgotou os recursos internos pode peticionar à Comissão Interamericana, que poderá levar o caso à Corte.",
    atencao: ["O indivíduo não acessa diretamente a Corte Interamericana: o caminho é pela Comissão.", "A Declaração Universal não é tratado, mas é referência normativa internacional."],
    quiz: [
      { q: "O indivíduo pode demandar diretamente a Corte Interamericana de Direitos Humanos.", a: false, why: "Ele apresenta petição à Comissão Interamericana, que pode submeter o caso à Corte." },
      { q: "A Declaração Universal dos Direitos Humanos foi adotada em 1948.", a: true, why: "Foi aprovada pela Assembleia Geral da ONU em 10 de dezembro de 1948." },
    ],
  },
  {
    id: "dh-tortura-genocidio",
    group: "Convenções específicas",
    title: "Convenções contra a tortura e o genocídio",
    edital: "Convenção contra a Tortura; Convenção para a Prevenção e Repressão do Crime de Genocídio",
    simples: "A Convenção da ONU contra a Tortura (1984) define tortura como ato que causa dor ou sofrimento graves, físicos ou mentais, intencionalmente, por um agente público ou com a sua aquiescência, para obter informação, punir ou intimidar, entre outras finalidades. Veda a tortura em qualquer circunstância, mesmo em guerra ou emergência, e proíbe a devolução de pessoa a país onde possa ser torturada. A Convenção para a Prevenção e Repressão do Crime de Genocídio (1948) define genocídio como atos cometidos com a intenção de destruir, no todo ou em parte, um grupo nacional, étnico, racial ou religioso.",
    pontos: ["Tortura: ato praticado por agente público ou com sua aquiescência, com dor ou sofrimento graves e finalidade específica.", "Nenhuma circunstância excepcional justifica a tortura, nem ordem superior.", "Não-devolução (non-refoulement): é proibido enviar alguém a país onde corra risco de tortura.", "Genocídio: intenção de destruir, total ou parcialmente, grupo nacional, étnico, racial ou religioso.", "O Brasil tipificou a tortura na Lei 9.455/1997 e o genocídio na Lei 2.889/1956."],
    exemplo: "A autoridade não pode alegar emergência ou guerra para justificar tortura: a proibição é absoluta, segundo a Convenção.",
    atencao: ["Grupos políticos não estão entre os protegidos pela definição clássica de genocídio da Convenção.", "O conceito internacional de tortura exige agente público; a lei brasileira também pune a tortura praticada por particulares."],
    quiz: [
      { q: "Segundo a Convenção contra a Tortura, uma situação de guerra pode justificar a prática de tortura.", a: false, why: "A proibição é absoluta: nenhuma circunstância excepcional a justifica." },
      { q: "O genocídio exige a intenção de destruir, no todo ou em parte, um grupo nacional, étnico, racial ou religioso.", a: true, why: "A intenção específica é o elemento central da definição." },
    ],
  },
  {
    id: "dh-discriminacao-refugiados",
    group: "Convenções específicas",
    title: "Discriminação racial, discriminação contra a mulher e refugiados",
    edital: "Convenções sobre discriminação racial, discriminação contra a mulher e Estatuto dos Refugiados",
    simples: "A Convenção Internacional sobre a Eliminação de Todas as Formas de Discriminação Racial (1965) obriga os Estados a combater a discriminação baseada em raça, cor, descendência ou origem nacional ou étnica. A Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (1979), a CEDAW, busca igualdade de direitos entre homens e mulheres e permite medidas especiais temporárias a favor das mulheres. A Convenção de 1951 relativa ao Estatuto dos Refugiados protege quem tem fundado temor de perseguição por raça, religião, nacionalidade, grupo social ou opinião política. O princípio mais importante é o da não-devolução.",
    pontos: ["Discriminação racial: Convenção de 1965; medidas afirmativas temporárias são permitidas.", "CEDAW (1979): igualdade entre homens e mulheres; ações afirmativas temporárias não são discriminação.", "Refugiado: fundado temor de perseguição por raça, religião, nacionalidade, grupo social ou opinião política.", "Não-devolução: o refugiado não pode ser devolvido ao local onde sofra perseguição.", "No Brasil, a Lei 9.474/1997 define mecanismos de implementação do Estatuto dos Refugiados."],
    exemplo: "Uma política de cotas para mulheres em uma carreira, adotada por prazo determinado, é medida especial temporária compatível com a CEDAW.",
    atencao: ["Medidas afirmativas temporárias não são consideradas discriminação.", "Quem foge de desastre natural ou da pobreza, sem perseguição, em regra não se enquadra na definição clássica de refugiado."],
    quiz: [
      { q: "Medidas especiais temporárias a favor das mulheres, para alcançar a igualdade, são compatíveis com a CEDAW.", a: true, why: "A Convenção não considera discriminação as medidas temporárias para acelerar a igualdade de fato." },
      { q: "O princípio da não-devolução permite devolver o refugiado ao país onde ele sofre perseguição, se houver ordem judicial.", a: false, why: "O princípio proíbe a devolução a território onde a pessoa corra risco de perseguição." },
    ],
  },
  {
    id: "dh-seguranca-forca",
    group: "Segurança pública e direitos humanos",
    title: "Uso da força, privação de liberdade e regras da ONU",
    edital: "Regras e princípios internacionais sobre tratamento de presos e uso da força",
    simples: "Há instrumentos da ONU que orientam a atuação policial e o sistema prisional. O Código de Conduta para os Funcionários Responsáveis pela Aplicação da Lei (1979) manda respeitar e proteger a dignidade humana. Os Princípios Básicos sobre o Uso da Força e Armas de Fogo (1990) determinam que a força só pode ser usada quando necessária e na medida exigida pelo cumprimento do dever, observando legalidade, necessidade e proporcionalidade. As Regras Mínimas das Nações Unidas para o Tratamento de Reclusos, conhecidas como Regras de Mandela (2015), tratam das condições de privação de liberdade. As Regras de Bangkok cuidam das mulheres presas.",
    pontos: ["Uso da força: legalidade, necessidade e proporcionalidade.", "Armas de fogo: só em último caso, quando outros meios forem insuficientes.", "Regras de Mandela: tratamento digno de pessoas presas, proibição de tortura e isolamento prolongado.", "Regras de Bangkok: tratamento de mulheres presas e de medidas não privativas de liberdade para mulheres infratoras.", "Código de Conduta: agentes devem respeitar a dignidade humana e não podem tolerar nem cometer tortura."],
    exemplo: "O agente que usa força física além do necessário para conter alguém já dominado viola o princípio da proporcionalidade.",
    atencao: ["Esses instrumentos são soft law: orientam, e muitos têm força política, mas não têm força de tratado.", "O uso de armas de fogo contra pessoas é último recurso."],
    quiz: [
      { q: "O uso da força pelos agentes de segurança deve observar a legalidade, a necessidade e a proporcionalidade.", a: true, why: "São os princípios que orientam o uso da força segundo as normas internacionais." },
      { q: "As Regras de Mandela tratam do uso de armas de fogo pela polícia.", a: false, why: "Tratam do tratamento de pessoas privadas de liberdade; o uso de armas é objeto dos Princípios Básicos de 1990." },
    ],
  },
];
