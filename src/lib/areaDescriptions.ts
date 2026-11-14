import { canonicalSubject } from "./subjects";

// Descrições curtas das disciplinas, exibidas como dica discreta ao apontar o mouse.
// A ordem importa: o primeiro padrão que casar com o nome normalizado vence.
const SUBJECTS: [RegExp, string][] = [
  [/penal e processual penal|penal e processo penal/, "Teoria do crime, crimes em espécie e o caminho do processo criminal."],
  [/processual penal|processo penal/, "Inquérito, ação penal, provas, prisões e recursos: o caminho do processo criminal."],
  [/penal especial|penal extravagante|extravagante|leis? especia/, "Leis penais fora do Código: drogas, armas, tortura, abuso de autoridade e outras."],
  [/medicina legal/, "Traumatologia, tanatologia, sexologia e identificação aplicadas à investigação."],
  [/criminalistic/, "Local de crime, vestígios, cadeia de custódia e perícias."],
  [/criminolog/, "Estudo do crime, do criminoso, da vítima e do controle social."],
  [/direito penal/, "Teoria do crime, da pena e crimes em espécie do Código Penal."],
  [/constitucional/, "Direitos fundamentais, organização do Estado e dos Poderes, controle de constitucionalidade."],
  [/administrativ/, "Princípios, atos, agentes, licitações e responsabilidade da Administração Pública."],
  [/direitos? humanos/, "Tratados, sistema interamericano e garantias da pessoa humana."],
  [/transito|ctb/, "Código de Trânsito Brasileiro: normas de circulação, infrações e crimes de trânsito."],
  [/direito civil/, "Pessoas, bens, fatos jurídicos, obrigações e contratos."],
  [/portugues|lingua portuguesa|redacao/, "Interpretação de textos, gramática e redação oficial."],
  [/raciocinio|logic/, "Proposições, tabelas-verdade, argumentação e problemas lógicos."],
  [/matematica/, "Aritmética, porcentagem, razão e proporção com resolução de problemas."],
  [/estatistic|probabilidad/, "Leitura de dados, medidas de posição e dispersão e probabilidade."],
  [/informatica|comput|office/, "Sistemas operacionais, aplicativos de escritório, internet e segurança da informação."],
  [/contabil/, "Patrimônio, lançamentos, demonstrações contábeis e regime de competência."],
  [/ingles|estrangeira/, "Leitura e compreensão de textos em inglês."],
  [/arquivolog/, "Gestão de documentos, protocolo e arquivos."],
  [/administracao publica/, "Modelos de gestão, governança e evolução da Administração Pública."],
  [/administracao/, "Planejamento, organização, direção e controle nas organizações."],
  [/realidade do acre|(historia|geografia) do acre/, "História, geografia, economia e atualidades do Acre."],
  [/\betica\b/, "Ética no serviço público, deveres e vedações do servidor."],
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Descrição de uma disciplina, ou `undefined` quando não houver uma adequada. */
export function subjectDescription(name: string | null | undefined): string | undefined {
  if (!name) return undefined;
  const value = normalize(`${canonicalSubject(name)} ${name}`);
  return SUBJECTS.find(([pattern]) => pattern.test(value))?.[1];
}
