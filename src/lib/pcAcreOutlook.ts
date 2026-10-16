export const pcAcreRoles = ["investigador", "escrivao", "delegado"] as const;
export type PcAcreRole = (typeof pcAcreRoles)[number];
export function pcAcreRole(value: unknown): PcAcreRole {
  return pcAcreRoles.includes(value as PcAcreRole) ? (value as PcAcreRole) : "investigador";
}
export const pcAcrePriorities: Record<PcAcreRole, { title: string; task: string }[]> = {
  investigador: [
    {
      title: "Inquérito, prisões e provas",
      task: "Treine atuação policial, flagrante, cautelares, perícia e cadeia de custódia.",
    },
    {
      title: "Penal e leis especiais",
      task: "Priorize patrimônio, Administração Pública, violência doméstica, drogas e organizações criminosas, conforme edital.",
    },
    {
      title: "Português",
      task: "Pratique interpretação, reescrita, coesão, concordância, regência e pontuação.",
    },
    {
      title: "Constitucional e Administrativo",
      task: "Revise direitos e garantias, segurança pública, atos, poderes e responsabilidade do Estado.",
    },
    {
      title: "Informática e raciocínio lógico",
      task: "Mantenha treino regular; reserve Estatística e Contabilidade se o edital as exigir.",
    },
    {
      title: "Medicina Legal e Criminologia",
      task: "Estude identificação, vestígios, traumatologia, fenômenos cadavéricos, vitimologia e prevenção.",
    },
  ],
  escrivao: [
    {
      title: "Português e redação oficial",
      task: "Combine interpretação e gramática com clareza, precisão e estrutura de documentos oficiais.",
    },
    {
      title: "Arquivologia",
      task: "Treine classificação, gestão, avaliação e organização de documentos.",
    },
    {
      title: "Procedimentos policiais",
      task: "Reforce inquérito, ação penal, provas e documentação dos atos.",
    },
    {
      title: "Bases jurídicas",
      task: "Mantenha Penal, leis especiais, Constitucional e Administrativo na rotina.",
    },
    {
      title: "Informática e raciocínio lógico",
      task: "Pratique ferramentas de escritório, segurança e resolução de problemas, conforme edital.",
    },
  ],
  delegado: [
    {
      title: "Núcleo penal e processual",
      task: "Resolva casos de Penal, Processo Penal e legislação especial, justificando a alternativa escolhida.",
    },
    {
      title: "Constitucional e Administrativo",
      task: "Reforce fundamentos, direitos e garantias, controle e responsabilidade estatal.",
    },
    {
      title: "Civil e matérias complementares",
      task: "Ajuste Civil, Empresarial, Ambiental, Tributário e Processo Civil à lista efetiva do edital.",
    },
    {
      title: "Medicina Legal, DH e Criminologia",
      task: "Inclua as matérias exigidas e diferencie texto legal, interpretação judicial e conhecimento técnico.",
    },
    {
      title: "Legislação local e formato da banca",
      task: "Use as normas do Acre; não substitua por leis estaduais cobradas em outros concursos.",
    },
  ],
};
