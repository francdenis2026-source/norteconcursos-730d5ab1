import type { PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";

export const pcAcreRoles: PcAcVerticalCargoId[] = [
  "delegado",
  "investigador",
  "papiloscopista",
  "perito-criminal",
  "auxiliar-necropsia",
  "perito-medico-legista",
];
export type PcAcreRole = PcAcVerticalCargoId;
export function pcAcreRole(value: unknown): PcAcreRole {
  return pcAcreRoles.includes(value as PcAcreRole) ? (value as PcAcreRole) : "investigador";
}

/** Prioridades de estudo por cargo, com base no conteúdo programático real do Edital nº 001
 * SEAD/PCAC (05/11/2026, banca IDECAN) — ver blocos/disciplinas completos em
 * `@/data/pcAcreVerticalizado`. */
export const pcAcrePriorities: Record<PcAcreRole, { title: string; task: string }[]> = {
  delegado: [
    {
      title: "Penal e Processo Penal",
      task: "É o núcleo de 'Conhecimentos jurídicos' do cargo: inquérito, prisões, provas, legislação especial e entendimento dos tribunais superiores.",
    },
    {
      title: "Constitucional e Administrativo",
      task: "Base de Direitos e garantias, organização do Estado, atos administrativos e responsabilidade civil do Estado.",
    },
    {
      title: "Medicina Legal, Criminologia e Vitimologia",
      task: "Disciplina exclusiva de 'Conhecimentos específicos' do Delegado — identificação, traumatologia, fenômenos cadavéricos e prevenção.",
    },
    {
      title: "Gestão de Polícia Judiciária e Gestão Pública",
      task: "Disciplina específica do cargo: liderança, gestão de pessoas e de processos na atividade policial.",
    },
    {
      title: "Realidade do Acre e Legislação Institucional",
      task: "Geografia, história, aspectos sociais do Acre e as leis orgânicas da PC-AC — conteúdo específico do estado, não transferível de outras bancas.",
    },
  ],
  investigador: [
    {
      title: "Língua Portuguesa e Raciocínio Lógico",
      task: "Base de 'Conhecimentos básicos', junto com Informática — treine interpretação, gramática e resolução de problemas lógicos.",
    },
    {
      title: "Noções de Direito Penal, Processual Penal, Constitucional e Administrativo",
      task: "Bloco de 'Conhecimentos jurídicos (noções)' — nível introdutório, mas cobrado nas quatro disciplinas.",
    },
    {
      title: "Contabilidade, Estatística e Análise de Dados",
      task: "Disciplinas específicas do cargo, pouco comuns em outros cargos policiais — reserve tempo extra de estudo aqui.",
    },
    {
      title: "Arquivologia e Tecnologia da Informação",
      task: "Também específicas do Investigador: classificação documental e segurança da informação.",
    },
    {
      title: "Legislação Institucional e Realidade do Acre",
      task: "Leis orgânicas da PC-AC e conteúdo regional do Acre — confira sempre a norma estadual vigente.",
    },
  ],
  papiloscopista: [
    {
      title: "Biologia, Física e Química",
      task: "Disciplinas de 'Conhecimentos específicos' exclusivas do cargo — base científica para identificação papiloscópica.",
    },
    {
      title: "Noções de Identificação e Ciências Forenses",
      task: "Núcleo técnico do cargo: datiloscopia, identificação humana e fundamentos periciais.",
    },
    {
      title: "Noções de Medicina e Odontologia Legal",
      task: "Complementa as ciências forenses com os aspectos médico-legais usados na identificação.",
    },
    {
      title: "Língua Portuguesa e Raciocínio Lógico",
      task: "Base de 'Conhecimentos básicos', comum a quase todos os cargos do edital.",
    },
    {
      title: "Noções jurídicas e Legislação Institucional",
      task: "Penal, Processual Penal, Constitucional, Administrativo e as leis orgânicas da PC-AC em nível de noções.",
    },
  ],
  "perito-criminal": [
    {
      title: "Criminalística, Documentação Pericial e Balística",
      task: "Disciplina comum a todas as áreas de Perito Criminal — base técnica do cargo, cobrada de todo candidato.",
    },
    {
      title: "Área de atuação escolhida na inscrição",
      task: "Aprofunde a área específica (Ambiental, Biológicas, Engenharia Civil, Informática Forense, Medicina Veterinária ou Química) escolhida no ato da inscrição.",
    },
    {
      title: "Noções jurídicas (Penal, Processual Penal, Constitucional, Administrativo)",
      task: "Bloco de noções comum aos cargos de nível superior não-jurídico do edital.",
    },
    {
      title: "Língua Portuguesa e Raciocínio Lógico",
      task: "Base de 'Conhecimentos básicos' do cargo.",
    },
    {
      title: "Legislação Institucional e Realidade do Acre",
      task: "Leis orgânicas da PC-AC e conteúdo regional — confirme sempre a legislação estadual vigente.",
    },
  ],
  "auxiliar-necropsia": [
    {
      title: "Anatomia, Fisiologia, Tanatologia e Biossegurança",
      task: "Única disciplina de 'Conhecimentos específicos' do cargo, mas extensa — reserve a maior parte do tempo de estudo aqui.",
    },
    {
      title: "Cadeia de custódia",
      task: "Parte do conteúdo específico do cargo, essencial para o trabalho no Instituto Médico-Legal.",
    },
    {
      title: "Noções jurídicas (Penal, Processual Penal, Constitucional, Administrativo)",
      task: "Bloco de noções comum aos cargos de nível médio/superior não-jurídico do edital.",
    },
    {
      title: "Língua Portuguesa e Raciocínio Lógico",
      task: "Base de 'Conhecimentos básicos' do cargo.",
    },
    {
      title: "Legislação Institucional e Realidade do Acre",
      task: "Leis orgânicas da PC-AC e conteúdo regional — confirme sempre a legislação estadual vigente.",
    },
  ],
  "perito-medico-legista": [
    {
      title: "Medicina Legal (geral)",
      task: "Disciplina comum às duas especialidades — base do cargo, cobrada de todo candidato.",
    },
    {
      title: "Especialidade escolhida na inscrição (Medicina Legal Geral ou Psiquiatria)",
      task: "Aprofunde a especialidade escolhida no ato da inscrição — conteúdo técnico mais extenso da prova.",
    },
    {
      title: "Noções jurídicas (Penal, Processual Penal, Constitucional, Administrativo)",
      task: "Bloco de noções comum aos cargos de nível superior não-jurídico do edital.",
    },
    {
      title: "Língua Portuguesa e Raciocínio Lógico",
      task: "Base de 'Conhecimentos básicos' do cargo.",
    },
    {
      title: "Legislação Institucional e Realidade do Acre",
      task: "Leis orgânicas da PC-AC e conteúdo regional — confirme sempre a legislação estadual vigente.",
    },
  ],
};
