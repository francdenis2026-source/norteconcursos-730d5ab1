/** Marcação de relevância/incidência por disciplina para o cargo de Oficial Investigador da
 * PC-AC, cruzando o Anexo III do edital com o comportamento real da banca IDECAN em concursos
 * policiais já analisados na plataforma (ver doc "Banca IDECAN para a PC-AC"). Extraído de
 * `src/routes/dashboard/pc-acre-edital.tsx` para poder ser reaproveitado pelo plano de estudos
 * completo (`src/lib/pcAcreMasterPlan.ts`) sem duplicar a marcação. */

export const INVESTIGATOR_FOCUS = [
  { subject: "Direito Penal", priority: "Muito alta", topics: "teoria do crime, consumação e tentativa, concurso de pessoas e crimes contra pessoa, patrimônio e administração pública", filter: "Direito Penal" },
  { subject: "Direito Processual Penal", priority: "Muito alta", topics: "inquérito policial, provas, cadeia de custódia, prisões, medidas cautelares e identificação criminal", filter: "Direito Processual Penal" },
  { subject: "Língua Portuguesa", priority: "Alta", topics: "interpretação, coesão e coerência, sintaxe, concordância, regência, crase, pontuação e reescrita", filter: "Língua Portuguesa" },
  { subject: "Raciocínio Lógico", priority: "Alta", topics: "proposições, equivalências, negações, argumentação, conjuntos, porcentagem, combinatória, probabilidade e gráficos", filter: "Raciocínio Lógico-Matemático" },
  { subject: "Contabilidade e Estatística", priority: "Alta", topics: "patrimônio, escrituração, demonstrações, juros, análise financeira; população, amostra, tabelas, medidas, probabilidade e correlação", filter: "Contabilidade" },
  { subject: "Análise de Dados e Informações", priority: "Alta", topics: "coleta, padronização, duplicidades, cruzamento de registros, linhas do tempo, vínculos, redes, mapas e relatórios analíticos", filter: "Análise de Dados e Informações" },
  { subject: "Tecnologia da Informação e Segurança", priority: "Média-alta", topics: "sistemas, arquivos, planilhas, bancos de dados, redes, autenticação, criptografia, backups, metadados e proteção de informações", filter: "Tecnologia da Informação" },
  { subject: "Arquivologia e Administração", priority: "Média", topics: "ciclo documental, classificação, avaliação, temporalidade, preservação, gestão de processos, atendimento, ética e sigilo", filter: "Arquivologia" },
] as const;

export const INVESTIGATOR_RADAR = [
  { subject: "Língua Portuguesa", priority: "Alta", topics: "interpretação e inferência, coesão e coerência, reescrita, sintaxe, concordância, regência, crase e pontuação", evidence: "Edital PC-AC + recorrência IDECAN em provas policiais" },
  { subject: "Raciocínio Lógico", priority: "Alta", topics: "proposições, conectivos, equivalências, negações, argumentação, conjuntos, porcentagem, probabilidade e gráficos", evidence: "Edital PC-AC + padrão de questões IDECAN" },
  { subject: "Direito Penal", priority: "Muito alta", topics: "teoria do crime, dolo e culpa, tentativa, concurso de pessoas, crimes contra pessoa, patrimônio e administração pública", evidence: "Bloco jurídico do edital + recorrência em polícia civil" },
  { subject: "Direito Processual Penal", priority: "Muito alta", topics: "inquérito, provas, exame de corpo de delito, cadeia de custódia, prisões, cautelares e identificação criminal", evidence: "Bloco jurídico do edital + padrão policial IDECAN" },
  { subject: "Tecnologia e Segurança da Informação", priority: "Alta", topics: "arquivos, planilhas, bancos, redes, autenticação, criptografia, backups, metadados e proteção de dados", evidence: "Específica do Investigador + tendência de investigação digital" },
  { subject: "Contabilidade e Análise Financeira", priority: "Alta", topics: "patrimônio, partidas dobradas, demonstrações, juros, extratos, PIX/TED, conciliação e movimentações atípicas", evidence: "Específica do Investigador + foco financeiro do cargo" },
  { subject: "Estatística e Análise de Dados", priority: "Alta", topics: "tabelas, gráficos, média, mediana, dispersão, probabilidade, correlação, outliers, cruzamentos e linhas do tempo", evidence: "Duas disciplinas específicas convergentes no edital" },
  { subject: "Arquivologia", priority: "Média-alta", topics: "teoria das três idades, classificação, temporalidade, preservação, documentos digitais, metadados e autenticidade", evidence: "Específica do Investigador + rotina documental policial" },
  { subject: "Noções de Administração", priority: "Média", topics: "planejamento, organização, processos, eficiência, gestão da informação, atendimento, ética e sigilo", evidence: "Específica do edital; revisar após o núcleo de maior peso" },
] as const;

export const PCAC_IDECAN_PRIORITY = [
  { subject: "Direito Penal", level: "Muito alta", reason: "teoria do crime, crimes contra a pessoa, patrimônio e administração pública", filter: "Direito Penal" },
  { subject: "Direito Processual Penal", level: "Muito alta", reason: "inquérito, ação penal, prisões, provas e cadeia de custódia", filter: "Direito Processual Penal" },
  { subject: "Tecnologia da Informação", level: "Alta", reason: "segurança da informação, redes, phishing, malware e crimes digitais", filter: "Tecnologia da Informação" },
  { subject: "Língua Portuguesa", level: "Alta", reason: "interpretação, sintaxe, concordância, regência, crase e pontuação", filter: "Língua Portuguesa" },
  { subject: "Raciocínio Lógico", level: "Alta", reason: "proposições, equivalências, negações, conjuntos e probabilidade", filter: "Raciocínio Lógico-Matemático" },
  { subject: "Direito Constitucional", level: "Média", reason: "direitos fundamentais, segurança pública e organização do Estado", filter: "Direito Constitucional" },
  { subject: "Direito Administrativo", level: "Média", reason: "atos, poderes, agentes, responsabilidade e improbidade", filter: "Direito Administrativo" },
  { subject: "Legislação Institucional", level: "Muito alta", reason: "Lei Orgânica Nacional, PC-AC e estatuto funcional", filter: "Legislação Institucional" },
];

/** Ordem de estudo recomendada (prioridade decrescente) para o plano de estudos completo do
 * Investigador: uma lista enxuta e definitiva, derivada do `INVESTIGATOR_FOCUS` acima (já é a
 * marcação mais granular, com um item por bloco de disciplinas do Anexo III). */
export const INVESTIGATOR_STUDY_ORDER = INVESTIGATOR_FOCUS.map((item) => ({
  subject: item.subject,
  priority: item.priority as "Muito alta" | "Alta" | "Média-alta" | "Média",
  filter: item.filter,
}));

export const PCAC_PRIORITY_WEIGHT: Record<string, number> = {
  "Muito alta": 4,
  Alta: 3,
  "Média-alta": 2,
  Média: 1,
};
