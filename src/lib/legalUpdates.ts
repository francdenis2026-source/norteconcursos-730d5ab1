export type CuratedLegalUpdate = {
  title: string;
  what: string;
  where: string;
  since: string;
  url?: string;
};

const P = "https://www.planalto.gov.br/ccivil_03/";
const ANTIFACCAO: CuratedLegalUpdate = {
  title: "Lei 15.358/2026 (Marco Legal do Combate ao Crime Organizado)",
  what: "Criou os crimes de domínio social estruturado (art. 2º, reclusão de 20 a 40 anos) e de favorecimento (art. 3º, reclusão de 12 a 20 anos e multa), com prazos de inquérito e regras de bloqueio e perdimento de bens próprios.",
  where: "Arts. 1º a 44",
  since: "25/03/2026, sem prazo de espera (art. 44)",
  url: P + "_ato2023-2026/2026/lei/l15358.htm",
};
const ESTATUTO_15163: CuratedLegalUpdate = {
  title: "Lei 15.163/2025",
  what: "Aumentou as penas de exposição a perigo e maus-tratos contra pessoa idosa e de abandono de pessoa com deficiência.",
  where: "Estatuto da Pessoa Idosa, art. 99; Estatuto da Pessoa com Deficiência, art. 90",
  since: "2025",
  url: P + "_Ato2023-2026/2025/Lei/L15163.htm",
};

export const CURATED_LEGAL_UPDATES: Record<string, CuratedLegalUpdate[]> = {
  "legislacao-antifaccao-marco-legal": [ANTIFACCAO],
  "legislacao-drogas-revisao": [
    {
      title: "Lei 15.358/2026",
      what: "Criou o art. 40-A: as penas dos arts. 33 a 37 são aplicadas em dobro ao integrante de organização ultraviolenta, grupo paramilitar ou milícia, no contexto do art. 2º da nova lei. Com arma de fogo, aplica-se concurso material.",
      where: "Lei 11.343/2006, art. 40-A",
      since: "25/03/2026",
      url: P + "_ato2023-2026/2026/lei/l15358.htm",
    },
  ],
  "legislacao-armas-revisao": [
    {
      title: "Lei 15.358/2026",
      what: "Criou o art. 21-A: aumento de 2/3 nas penas dos arts. 12, 14 e 16 quando a arma tem ligação com o tráfico de drogas.",
      where: "Lei 10.826/2003, art. 21-A",
      since: "25/03/2026",
      url: P + "_ato2023-2026/2026/lei/l15358.htm",
    },
  ],
  "legislacao-eca-revisao": [
    {
      title: "Lei 15.487/2026",
      what: 'Reescreveu os crimes de abuso sexual infantil: "cena de sexo explícito ou pornográfica" virou "conteúdo de violência sexual". Os arts. 240, 241 e 241-A têm reclusão de 4 a 10 anos e multa. O art. 241-B passou para 3 a 6 anos (antes 1 a 4) e passou a punir também quem apenas acessa ou visualiza o material, sem baixar.',
      where: "Arts. 240, 241, 241-A, 241-B e 244-A",
      since: "2026 (redação atual na conferência de 08/10/2026)",
      url: P + "leis/l8069.htm",
    },
    {
      title: "Lei 14.811/2024",
      what: "Criou o art. 244-C: pai, mãe ou responsável que, de forma dolosa, não comunica à autoridade o desaparecimento de criança ou adolescente. Reclusão de 2 a 4 anos e multa.",
      where: "Art. 244-C",
      since: "2024",
      url: P + "leis/l8069.htm",
    },
  ],
  "legislacao-idosa-revisao": [
    {
      ...ESTATUTO_15163,
      what: "O art. 99 passou de detenção de 2 meses a 1 ano para reclusão de 2 a 5 anos. O novo parágrafo único do art. 95 afasta a Lei 9.099/1995 dos crimes do Estatuto e dos crimes cometidos com violência contra a pessoa idosa, qualquer que seja a pena.",
      where: "Arts. 95 (parágrafo único) e 99",
    },
    {
      title: "Lei 14.423/2022",
      what: 'O nome passou a ser Estatuto da Pessoa Idosa e a expressão "idoso" foi trocada por "pessoa idosa" no texto. Mudança de linguagem, sem alterar as regras na maior parte dos artigos.',
      where: "Toda a lei",
      since: "2022",
    },
  ],
  "legislacao-pcd-revisao": [
    {
      ...ESTATUTO_15163,
      what: "O art. 90 (abandono em hospital ou entidade) passou de reclusão de 6 meses a 3 anos para reclusão de 2 a 5 anos e multa. Com lesão grave: 3 a 7 anos. Com morte: 8 a 14 anos. O § 3º pune, com a pena do caput, quem não provê as necessidades básicas quando obrigado.",
      where: "Estatuto da Pessoa com Deficiência, art. 90",
    },
  ],
  "legislacao-racismo-revisao": [
    {
      title: "Lei 14.532/2023",
      what: "A injúria racial passou do Código Penal para a Lei do Racismo (art. 2º-A): reclusão de 2 a 5 anos e multa, com aumento de metade se for em concurso de duas ou mais pessoas. O art. 20 ganhou regras para o contexto esportivo, religioso, artístico ou cultural (proibição de frequentar esses locais por 3 anos) e para a internet.",
      where: "Arts. 2º-A e 20 (§§ 2º, 2º-A e 2º-B)",
      since: "2023",
      url: P + "leis/l7716.htm",
    },
  ],
  "legislacao-identificacao-criminal-revisao": [
    {
      title: "Lei 15.295/2025",
      what: "Criou o inciso VII do art. 3º: mesmo com identificação civil, cabe identificação criminal quando a denúncia é recebida por crime com grave violência contra pessoa, crime sexual, crime do ECA ou organização criminosa armada.",
      where: "Lei 12.037/2009, art. 3º, VII",
      since: "2025",
      url: P + "_ato2007-2010/2009/lei/l12037.htm",
    },
  ],
  "legislacao-lep-revisao": [
    {
      title: "Lei 14.994/2024",
      what: "O art. 41 passou a exigir ato motivado do juiz para suspender ou restringir visita, contato com o mundo exterior e chamamento nominal (incisos V, X e XV). O condenado por feminicídio não tem direito à visita íntima.",
      where: "Lei 7.210/1984, art. 41, §§ 1º e 2º",
      since: "2024",
      url: P + "leis/l7210.htm",
    },
  ],
  "legislacao-transito-revisao": [
    {
      title: "Lei 13.546/2017",
      what: "Homicídio culposo na direção sob influência de álcool ou substância psicoativa passou a ter pena própria: reclusão de 5 a 8 anos (art. 302, § 3º). O art. 308 passou a incluir também a exibição ou demonstração de perícia em manobra.",
      where: "Arts. 302, § 3º, e 308",
      since: "2017",
      url: P + "leis/l9503compilado.htm",
    },
    {
      title: "Lei 14.071/2020",
      what: "Criou o art. 312-B: nos casos do art. 302, § 3º, e do art. 303, § 2º, não se pode substituir a pena de prisão por restritiva de direitos.",
      where: "Art. 312-B",
      since: "2020",
    },
    {
      title: "Lei 14.599/2023",
      what: 'Trocou a palavra "acidente" por "sinistro" em todo o Código. Mudança de linguagem.',
      where: "Todo o Código",
      since: "2023",
    },
  ],
  "legislacao-pf-interestadual-revisao": [
    {
      title: "Lei 14.967/2024",
      what: "No art. 1º, o inciso IV passou a incluir cargas de produtos controlados (pólvora, explosivos e fogos), e o inciso VIII passou a incluir furto, roubo ou dano contra empresas de transporte de valores.",
      where: "Lei 10.446/2002, art. 1º, IV e VIII",
      since: "2024",
      url: P + "leis/2002/l10446.htm",
    },
  ],
  "legislacao-seguranca-privada-revisao": [
    {
      title: "Lei 14.967/2024 (Estatuto da Segurança Privada)",
      what: "Revogou a Lei 7.102/1983 e passou a regular a segurança privada. A prestação depende de autorização da Polícia Federal.",
      where: "Arts. 2º, 40, 60 e 70",
      since: "Setembro de 2024",
      url: P + "_ato2023-2026/2024/lei/l14967.htm",
    },
  ],
  "legislacao-cin-revisao": [
    {
      title: "Lei 14.534/2023",
      what: "O número do CPF passou a ser o número de registro geral da identidade. É a base da Carteira de Identidade Nacional.",
      where: "Lei 7.116/1983, art. 3º",
      since: "2023",
    },
  ],
  "legislacao-maria-penha-revisao": [
    {
      title: "Lei 15.384/2026",
      what: "Incluiu a violência vicária entre as formas de violência doméstica: violência contra filhos, parentes ou pessoas próximas da mulher com o objetivo de atingi-la.",
      where: "Art. 7º, VI",
      since: "2026",
    },
    {
      title: "Lei 15.383/2026",
      what: "Aumentou a pena do descumprimento de medida protetiva (art. 24-A) de 1/3 até a metade quando há adulteração da tornozeleira ou violação da área de exclusão monitorada.",
      where: "Art. 24-A, § 4º",
      since: "2026",
    },
    {
      title: "Lei 14.994/2024",
      what: "A pena do descumprimento de medida protetiva (art. 24-A) passou a ser reclusão de 2 a 5 anos e multa.",
      where: "Art. 24-A",
      since: "2024",
    },
    {
      title: "Lei 14.550/2023",
      what: "As medidas protetivas passaram a ser concedidas a partir do depoimento da vítima, sem exigir boletim de ocorrência, inquérito ou ação, e valem enquanto persistir o risco.",
      where: "Art. 19, §§ 4º a 6º",
      since: "2023",
    },
  ],
  "legislacao-lavagem-revisao": [
    {
      title: "Lei 14.478/2022",
      what: "A pena aumenta de 1/3 a 2/3 quando a lavagem usa ativo virtual (criptomoeda), além dos casos de reiteração e de organização criminosa.",
      where: "Lei 9.613/1998, art. 1º, § 4º",
      since: "2022",
    },
    {
      title: "Lei 12.683/2012",
      what: "Acabou a lista fechada de crimes antecedentes. Hoje qualquer infração penal pode ser a origem do dinheiro.",
      where: "Lei 9.613/1998, art. 1º",
      since: "2012",
    },
  ],
  "legislacao-juizados-revisao": [
    {
      title: "Lei 11.313/2006",
      what: "Infração de menor potencial ofensivo passou a ser a de pena máxima de até 2 anos (antes, 1 ano).",
      where: "Lei 9.099/1995, art. 61",
      since: "2006",
    },
    {
      title: "Lei 13.964/2019 (Pacote Anticrime)",
      what: "Criou o acordo de não persecução penal (art. 28-A do CPP), que cobre crimes sem violência e com pena mínima inferior a 4 anos. Não revogou a suspensão condicional do processo (art. 89).",
      where: "CPP, art. 28-A",
      since: "2019",
    },
  ],
};
