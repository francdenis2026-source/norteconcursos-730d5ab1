import { canonicalSubject } from "./subjects";

// Descrições curtas das disciplinas, exibidas como dica discreta ao apontar o mouse.
// A ordem importa: o primeiro padrão que casar com o nome normalizado vence.
const SUBJECTS: [RegExp, string][] = [
  [/penal e processual penal|penal e processo penal/, "Crimes, penas e processo penal."],
  [/processual penal|processo penal/, "Inquérito, ação penal, provas, prisões e recursos."],
  [/penal especial|penal extravagante|extravagante|leis? especia/, "Leis penais fora do Código Penal."],
  [/medicina legal/, "Perícia médica aplicada à investigação."],
  [/criminalistic/, "Local de crime, vestígios e perícias."],
  [/criminolog/, "Crime, criminoso, vítima e controle social."],
  [/direito penal/, "Teoria do crime, penas e crimes em espécie."],
  [/constitucional/, "Direitos fundamentais e organização do Estado."],
  [/administrativ/, "Atos, agentes, licitações e responsabilidade."],
  [/direitos? humanos/, "Tratados e garantias da pessoa humana."],
  [/transito|ctb/, "Normas de circulação, infrações e crimes de trânsito."],
  [/direito civil/, "Pessoas, bens, obrigações e contratos."],
  [/portugues|lingua portuguesa|redacao/, "Interpretação, gramática e redação oficial."],
  [/raciocinio|logic/, "Proposições, argumentação e problemas lógicos."],
  [/matematica/, "Porcentagem, razão, proporção e problemas."],
  [/estatistic|probabilidad/, "Leitura de dados, medidas e probabilidade."],
  [/informatica|comput|office/, "Sistemas, aplicativos, internet e segurança."],
  [/contabil/, "Patrimônio, lançamentos e demonstrações."],
  [/ingles|estrangeira/, "Leitura e compreensão de textos em inglês."],
  [/arquivolog/, "Gestão de documentos e arquivos."],
  [/administracao publica/, "Modelos de gestão e governança pública."],
  [/administracao/, "Planejamento, organização, direção e controle."],
  [/realidade do acre|(historia|geografia) do acre/, "História, geografia, economia e atualidades."],
  [/\betica\b/, "Deveres e vedações do servidor público."],
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Descrição de uma disciplina, ou `undefined` quando não houver uma adequada. */
export function subjectDescription(name: string | null | undefined): string | undefined {
  if (!name) return undefined;
  const value = normalize(`${canonicalSubject(name)} ${name}`);
  return SUBJECTS.find(([pattern]) => pattern.test(value))?.[1];
}
