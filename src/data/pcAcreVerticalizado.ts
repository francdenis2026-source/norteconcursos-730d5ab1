/** Edital verticalizado digital — PC-AC (Edital nº 001 SEAD/PCAC, de 05/11/2026, banca IDECAN).
 * Disciplinas e blocos conforme o ANEXO III do edital oficial, publicado no Diário Oficial do
 * Acre nº 14.388 (06/11/2026). O detalhamento de itens e subitens de cada disciplina está no
 * Anexo III; este checklist cobre os blocos de disciplina, mesma granularidade já publicada no
 * guia "Edital PC-AC 001/2026 explicado" (PR #431). */

export type PcAcVerticalCargoId =
  | "delegado"
  | "investigador"
  | "papiloscopista"
  | "perito-criminal"
  | "auxiliar-necropsia"
  | "perito-medico-legista";

export interface PcAcVerticalDiscipline {
  id: string;
  name: string;
  note?: string;
}

export interface PcAcVerticalCargo {
  id: PcAcVerticalCargoId;
  label: string;
  vagas: number;
  salario: string;
  blocks: { title: string; disciplines: PcAcVerticalDiscipline[] }[];
}

export const pcAcVerticalCargos: PcAcVerticalCargo[] = [
  {
    id: "delegado",
    label: "Delegado de Polícia Civil",
    vagas: 8,
    salario: "R$ 19.505,66",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos",
        disciplines: [
          { id: "direito-penal", name: "Direito Penal" },
          { id: "direito-processual-penal", name: "Direito Processual Penal" },
          { id: "legislacao-penal-especial", name: "Legislação Penal e Processual Penal Especial" },
          { id: "direito-constitucional", name: "Direito Constitucional" },
          { id: "direito-administrativo", name: "Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
    ],
  },
  {
    id: "investigador",
    label: "Oficial Investigador de Polícia",
    vagas: 74,
    salario: "R$ 6.342,07",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "portugues", name: "Língua Portuguesa" },
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos (noções)",
        disciplines: [
          { id: "nocoes-constitucional", name: "Noções de Direito Constitucional" },
          { id: "nocoes-penal-processual", name: "Noções de Direito Penal e Processual Penal" },
          { id: "nocoes-administrativo", name: "Noções de Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
      {
        title: "Conhecimentos específicos",
        disciplines: [
          { id: "analise-dados", name: "Análise de Dados e Informações" },
          { id: "nocoes-administracao", name: "Noções de Administração" },
        ],
      },
    ],
  },
  {
    id: "papiloscopista",
    label: "Papiloscopista Policial",
    vagas: 35,
    salario: "R$ 6.342,07",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "portugues", name: "Língua Portuguesa" },
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos (noções)",
        disciplines: [
          { id: "nocoes-constitucional", name: "Noções de Direito Constitucional" },
          { id: "nocoes-penal-processual", name: "Noções de Direito Penal e Processual Penal" },
          { id: "nocoes-administrativo", name: "Noções de Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
      {
        title: "Conhecimentos específicos",
        disciplines: [
          { id: "papiloscopia", name: "Papiloscopia e Datiloscopia" },
          { id: "identificacao", name: "Identificação Civil e Criminal" },
          { id: "biologia-aplicada", name: "Noções de Biologia Aplicada" },
        ],
      },
    ],
  },
  {
    id: "perito-criminal",
    label: "Perito Criminal",
    vagas: 11,
    salario: "R$ 14.629,25",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "portugues", name: "Língua Portuguesa" },
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos (noções)",
        disciplines: [
          { id: "nocoes-constitucional", name: "Noções de Direito Constitucional" },
          { id: "nocoes-penal-processual", name: "Noções de Direito Penal e Processual Penal" },
          { id: "nocoes-administrativo", name: "Noções de Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
      {
        title: "Conhecimentos específicos (comum a todas as áreas)",
        disciplines: [
          {
            id: "criminalistica",
            name: "Criminalística (conceitos, locais de crime, cadeia de custódia)",
          },
          { id: "pericia-transito-incendio", name: "Perícia em acidentes de trânsito e incêndio" },
          { id: "documentacao-pericial", name: "Documentação pericial e laudos" },
          { id: "nocoes-medicina-legal", name: "Noções de Medicina Legal" },
          { id: "balistica", name: "Balística Forense" },
          { id: "lei-12030", name: "Lei nº 12.030/2009 e ética do perito" },
          { id: "documentoscopia", name: "Documentoscopia e Grafoscopia" },
        ],
      },
      {
        title: "Conhecimentos específicos (da área escolhida no ato da inscrição)",
        disciplines: [
          {
            id: "area-escolhida",
            name: "Ambiental, Biológicas, Engenharia Civil, Informática Forense, Veterinária ou Química",
            note: "Estude apenas a área para a qual você se inscreveu; confira o Anexo III para o detalhamento de cada uma.",
          },
        ],
      },
    ],
  },
  {
    id: "auxiliar-necropsia",
    label: "Auxiliar de Necropsia",
    vagas: 7,
    salario: "R$ 6.342,07",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "portugues", name: "Língua Portuguesa" },
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos (noções)",
        disciplines: [
          { id: "nocoes-constitucional", name: "Noções de Direito Constitucional" },
          { id: "nocoes-penal-processual", name: "Noções de Direito Penal e Processual Penal" },
          { id: "nocoes-administrativo", name: "Noções de Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
      {
        title: "Conhecimentos específicos",
        disciplines: [
          { id: "anatomia", name: "Anatomia e Fisiologia Humanas" },
          { id: "quimica-fisica-aplicadas", name: "Noções de Química e Física aplicadas" },
          { id: "tanatologia", name: "Tanatologia e Técnicas de Necropsia" },
          { id: "nocoes-medicina-legal", name: "Noções de Medicina Legal" },
          { id: "biosseguranca", name: "Biossegurança" },
          { id: "cadeia-custodia", name: "Cadeia de Custódia" },
        ],
      },
    ],
  },
  {
    id: "perito-medico-legista",
    label: "Perito Médico-Legista",
    vagas: 4,
    salario: "R$ 14.629,25",
    blocks: [
      {
        title: "Conhecimentos básicos",
        disciplines: [
          { id: "portugues", name: "Língua Portuguesa" },
          { id: "raciocinio-logico", name: "Raciocínio Lógico" },
          { id: "informatica", name: "Noções de Informática" },
          {
            id: "realidade-acre",
            name: "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)",
          },
        ],
      },
      {
        title: "Conhecimentos jurídicos (noções)",
        disciplines: [
          { id: "nocoes-constitucional", name: "Noções de Direito Constitucional" },
          { id: "nocoes-penal-processual", name: "Noções de Direito Penal e Processual Penal" },
          { id: "nocoes-administrativo", name: "Noções de Direito Administrativo" },
          { id: "legislacao-institucional", name: "Legislação Institucional" },
        ],
      },
      {
        title: "Conhecimentos específicos",
        disciplines: [
          { id: "medicina-legal-forense", name: "Medicina Legal e Ciências Forenses" },
          {
            id: "gestao-policia-judiciaria",
            name: "Gestão de Polícia Judiciária e Gestão Pública",
          },
          { id: "criminologia-vitimologia", name: "Criminologia e Vitimologia" },
          {
            id: "psiquiatria",
            name: "Psiquiatria",
            note: "Exigida apenas para quem concorrer à vaga de especialidade em Psiquiatria (1 das 4 vagas do cargo).",
          },
        ],
      },
    ],
  },
];

export interface PcAcInstitutionalLaw {
  id: string;
  title: string;
  ementa: string;
  resumo: string[];
  pontosPrincipais: string[];
  /** Conteúdo confirmado por leitura direta da fonte oficial nesta revisão. */
  verified: boolean;
  nota?: string;
}

export const pcAcInstitutionalLaws: PcAcInstitutionalLaw[] = [
  {
    id: "lei-14735-2023",
    title: "Lei nº 14.735, de 23 de novembro de 2023 — Lei Orgânica Nacional das Polícias Civis",
    ementa:
      "Institui a Lei Orgânica Nacional das Polícias Civis, dispõe sobre suas normas gerais de funcionamento e dá outras providências. É a lei federal que todas as leis orgânicas estaduais (como a do Acre) devem seguir.",
    resumo: [
      "Art. 1º: as polícias civis são instituições permanentes, com funções exclusivas e típicas de Estado, essenciais à justiça criminal e imprescindíveis à segurança pública, dirigidas por delegado de polícia da classe mais elevada.",
      "Art. 6º: competência de polícia judiciária civil e apuração de infrações penais, ressalvadas a competência da União e as infrações penais militares — exercida exclusivamente por policiais civis em atividade.",
      "Art. 4º (princípios): livre convencimento técnico-jurídico do delegado (inc. VIII); natureza técnica e imparcial da polícia judiciária, sob presidência do delegado (inc. XVII); autonomia, imparcialidade, tecnicidade e cientificidade da investigação (inc. XV).",
      "Art. 19 a 24: cargos de delegado, oficial investigador e perito oficial criminal; requisitos de ingresso (delegado: bacharel em Direito + 3 anos de atividade jurídica ou policial, concurso com participação da OAB em todas as fases e prova oral obrigatória).",
      "Art. 26: o delegado preside o inquérito policial com isenção, autonomia funcional e análise técnico-jurídica assegurada.",
      "Art. 30: prerrogativas e garantias dos policiais civis (identidade funcional nacional, porte de arma, prisão especial, entre outras).",
      "Art. 30, § 15: estabilidade do policial civil após 3 anos de efetivo exercício no cargo.",
    ],
    pontosPrincipais: [
      "Funções de Estado exclusivas e típicas das polícias civis (art. 1º).",
      "Polícia judiciária civil exercida privativamente por policiais civis, ressalvada a União e crimes militares (art. 6º, caput e § 1º).",
      "Livre convencimento técnico-jurídico do delegado de polícia (art. 4º, VIII).",
      "Delegado preside o inquérito com autonomia funcional (art. 26, parágrafo único).",
      "Requisitos de ingresso por cargo e regras do concurso de delegado, incluindo participação da OAB e prova oral (art. 20 e 21).",
      "Estabilidade após 3 anos de efetivo exercício (art. 30, § 15).",
    ],
    verified: true,
  },
  {
    id: "lc-129-2004",
    title:
      "Lei Complementar nº 129, de 22 de janeiro de 2004 — Lei Orgânica da Polícia Civil do Acre",
    ementa:
      "Lei orgânica que organiza a Polícia Civil do Estado do Acre: estrutura, carreiras, hierarquia e funcionamento da instituição.",
    resumo: [
      "É a lei estadual que organiza a Polícia Civil do Acre (estrutura, cargos e carreira), equivalente estadual da Lei Orgânica Nacional das Polícias Civis.",
      "Foi substancialmente reformulada pela Lei Complementar nº 526, de 23 de julho de 2026, que atualizou as regras de ingresso, estágio probatório, curso de formação, movimentação funcional e critérios de concursos — adequando a legislação do Acre à Lei nº 14.735/2023.",
      "Após a reforma de 2026: todo concurso da PC-AC passou a exigir prova objetiva e subjetiva, avaliação de títulos, teste de aptidão física, exames médico e toxicológico, avaliação psicológica e investigação social (e, para delegado, também prova oral).",
      "Criação da Escola Superior da Polícia Civil, substituindo a antiga Academia de Polícia Civil, responsável pela formação e capacitação continuada.",
      "Aprovados dentro das vagas tomam posse antes do curso de formação, já em estágio probatório remunerado; a primeira lotação passa a ser definida pela classificação no curso de formação (não mais pela ordem de classificação no concurso), com prioridade para municípios do interior.",
      "Permanência mínima de 5 anos na lotação inicial antes de pedir remoção, permuta ou cessão, salvo exceções previstas em lei.",
    ],
    pontosPrincipais: [
      "Lei orgânica estadual que estrutura a PC-AC (cargos, carreira, hierarquia).",
      "Reformulada em 2026 pela LC nº 526/2026 para seguir a Lei Orgânica Nacional das Polícias Civis.",
      "Concursos da PC-AC passam a exigir objetiva + subjetiva, títulos, TAF, exames médico/toxicológico, psicológico e investigação social (delegado também tem prova oral).",
      "Escola Superior da Polícia Civil substitui a antiga Academia.",
      "Posse antes do curso de formação; lotação inicial definida pela classificação no curso, com prioridade ao interior.",
    ],
    verified: false,
    nota: "O texto integral oficial não foi localizado nas fontes públicas consultadas nesta revisão. O resumo acima baseia-se em cobertura jornalística da reforma de 2026 (LC 526/2026) e em referências legislativas que identificam a LC 129/2004 como a lei orgânica da PC-AC. Confirme os números de artigo no Diário Oficial do Acre antes de usar como fonte definitiva de prova.",
  },
  {
    id: "lei-2250-2009",
    title: "Lei nº 2.250, de 21 de dezembro de 2009 (Acre)",
    ementa:
      "Lei estadual do Acre de 2009 relacionada à estrutura/organização da Polícia Civil do Estado, citada no bloco de Legislação Institucional do Edital 001/2026 SEAD/PCAC.",
    resumo: [
      "Esta lei consta expressamente no conteúdo programático do edital, no bloco de Legislação Institucional.",
      "A busca por fontes oficiais abertas (portal da Assembleia Legislativa e TJAC) nesta revisão não permitiu confirmar o texto integral da lei — os sites oficiais bloquearam o acesso automatizado ou os links testados não abriram o documento.",
    ],
    pontosPrincipais: [],
    verified: false,
    nota: "Não foi possível confirmar o conteúdo desta lei em fonte oficial nesta revisão (acesso automatizado bloqueado). Assim que o texto for confirmado, esta seção será atualizada com o resumo e os pontos principais. Enquanto isso, consulte o Anexo III do edital e o Diário Oficial do Acre para o texto oficial.",
  },
  {
    id: "lc-39-1993",
    title:
      "Lei Complementar nº 39, de 29 de dezembro de 1993 — Estatuto dos Servidores Públicos Civis do Acre",
    ementa:
      "Dispõe sobre o Estatuto dos Servidores Públicos Civis do Estado do Acre, das Autarquias e das Fundações Públicas. É o regime jurídico geral do servidor estadual, aplicável também aos policiais civis como servidores públicos.",
    resumo: [
      "Art. 1º e 2º: institui o estatuto dos servidores civis da administração direta, autarquias e fundações estaduais; servidor é quem está legalmente investido em cargo público.",
      "Art. 6º: requisitos básicos de ingresso — nacionalidade brasileira, gozo dos direitos políticos, quitação eleitoral e militar, idade mínima de 18 anos, aptidão física e mental, aprovação em concurso público.",
      "Art. 11, §1º e §3º: validade do concurso de até 2 anos, prorrogável uma vez por igual período; não se abre novo concurso enquanto houver aprovado dentro do prazo de validade.",
      "Art. 12: reserva de até 10% das vagas a pessoas com deficiência.",
      "Art. 22 e 25: estágio probatório de 24 meses; estabilidade após 2 anos de efetivo exercício.",
      "Art. 26: hipóteses de perda do cargo do servidor estável (sentença judicial transitada em julgado, processo administrativo disciplinar com ampla defesa, ou pedido do próprio servidor).",
      "Arts. 166 a 193 (síntese): deveres, proibições, responsabilidades e penalidades disciplinares (advertência, suspensão, demissão, cassação de aposentadoria, destituição de cargo ou função).",
      "Art. 20: jornada de 40 horas semanais para cargo efetivo. Art. 100: férias de 30 dias consecutivos.",
    ],
    pontosPrincipais: [
      "Requisitos gerais de ingresso em cargo público estadual (art. 6º).",
      "Validade do concurso: até 2 anos, prorrogável por igual período (art. 11, §1º).",
      "Estágio probatório de 24 meses e estabilidade após 2 anos de efetivo exercício (arts. 22 e 25).",
      "Regime disciplinar: deveres, proibições e penalidades (arts. 166 a 193).",
      "Regra geral de servidor público estadual aplicável à Polícia Civil, mas não é específica da carreira policial — a organização da PC-AC está na lei orgânica (LC 129/2004).",
    ],
    verified: true,
    nota: "Confirmado por leitura direta do texto oficial (TJAC). É o estatuto geral dos servidores civis do Acre — não trata especificamente da Polícia Civil, mas o edital o inclui no bloco de Legislação Institucional por regular o vínculo funcional do servidor estadual, aplicável também aos policiais civis.",
  },
];
