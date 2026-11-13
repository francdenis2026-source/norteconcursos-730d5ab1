/**
 * Mapas de estudo das disciplinas jurídicas: o que mais cai e importa para Delegado e Investigador.
 * Penas e dispositivos foram extraídos do texto atualizado da Câmara dos Deputados (Legislação Informatizada),
 * consultado em 13/11/2026, com as alterações de 2025 e 2026 já incorporadas. Itens marcados com
 * `check: "secundaria"` foram conferidos só em fonte secundária. A prioridade é uma avaliação editorial de estudo,
 * não estatística oficial de prova. Sempre confira o texto vigente antes de citar.
 */
export type Career = "delegado" | "investigador";
export type Priority = 1 | 2 | 3;

export interface LegalNode {
  id: string;
  title: string;
  /** Dispositivo: "CP, art. 121". */
  ref: string;
  /** Pena verbatim do caput ou regra central (para nós que não são crimes). */
  rule: string;
  /** Faixa em anos, para o gráfico de penas (só crimes com pena privativa de liberdade). */
  min?: number;
  max?: number;
  example: string;
  watch?: string;
  careers: Career[];
  priority: Priority;
  hediondo?: boolean;
  /** Lei que alterou a pena em 2025/2026, quando houver. */
  changed?: string;
  check?: "camara" | "secundaria";
}

export interface LegalBranch {
  id: string;
  title: string;
  color: string;
  summary: string;
  nodes: LegalNode[];
}

export interface LegalMapData {
  id: string;
  /** Nome canônico da disciplina (ver canonicalSubject). */
  subject: string;
  title: string;
  intro: string;
  /** Rótulo do que a régua mede ("Pena em anos") ou null para mapas sem pena. */
  chart: string | null;
  sources: { label: string; url: string }[];
  checkedOn: string;
  branches: LegalBranch[];
}

const B = "https://www2.camara.leg.br/legin/fed";
const SRC = {
  cp: { label: "Código Penal — Câmara (texto atualizado)", url: `${B}/declei/1940-1949/decreto-lei-2848-7-dezembro-1940-412868-normaatualizada-pe.html` },
  cpp: { label: "Código de Processo Penal — Câmara (texto atualizado)", url: `${B}/declei/1940-1949/decreto-lei-3689-3-outubro-1941-322206-normaatualizada-pe.html` },
  cf: { label: "Constituição Federal — Câmara (texto atualizado)", url: `${B}/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html` },
  drogas: { label: "Lei 11.343/2006 — Câmara", url: `${B}/lei/2006/lei-11343-23-agosto-2006-545399-normaatualizada-pl.html` },
  orcrim: { label: "Lei 12.850/2013 — Câmara", url: `${B}/lei/2013/lei-12850-2-agosto-2013-776714-normaatualizada-pl.html` },
  lavagem: { label: "Lei 9.613/1998 — Câmara", url: `${B}/lei/1998/lei-9613-3-marco-1998-372359-normaatualizada-pl.html` },
  abuso: { label: "Lei 13.869/2019 — Câmara", url: `${B}/lei/2019/lei-13869-5-setembro-2019-789094-normaatualizada-pl.html` },
  tortura: { label: "Lei 9.455/1997 — Câmara", url: `${B}/lei/1997/lei-9455-7-abril-1997-349431-normaatualizada-pl.html` },
  hediondos: { label: "Lei 8.072/1990 — Câmara", url: `${B}/lei/1990/lei-8072-25-julho-1990-372192-normaatualizada-pl.html` },
  penha: { label: "Lei 11.340/2006 — Câmara", url: `${B}/lei/2006/lei-11340-7-agosto-2006-545133-normaatualizada-pl.html` },
  intercep: { label: "Lei 9.296/1996 — Câmara", url: `${B}/lei/1996/lei-9296-24-julho-1996-349049-normaatualizada-pl.html` },
  armas: { label: "Lei 10.826/2003 — Planalto (texto compilado)", url: "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm" },
};
const both: Career[] = ["delegado", "investigador"];
const del: Career[] = ["delegado"];
const inv: Career[] = ["investigador"];

export const PENAL_MAP: LegalMapData = {
  id: "penal",
  subject: "Direito Penal",
  title: "Mapa do Direito Penal: crimes que mais importam à Polícia Civil",
  intro:
    "Escolha um grupo de crimes, veja a pena de cada um na régua e abra o exemplo. Filtre por Delegado ou Investigador e destaque só o que tem prioridade alta.",
  chart: "Pena máxima do caput, em anos",
  sources: [SRC.cp],
  checkedOn: "2026-11-13",
  branches: [
    {
      id: "pessoa",
      title: "Contra a pessoa",
      color: "#DC2626",
      summary: "Vida, integridade e liberdade individual: a base do trabalho da Delegacia de Homicídios e de proteção à mulher.",
      nodes: [
        { id: "p121", title: "Homicídio", ref: "CP, art. 121", rule: "Reclusão, de 6 a 20 anos. Qualificado (§ 2º): reclusão, de 12 a 30 anos.", min: 6, max: 20, example: "A mata B a tiros em uma discussão de bar: homicídio simples. Se o motivo é torpe ou há emboscada, vira qualificado e hediondo.", watch: "Homicídio qualificado é hediondo. Homicídio simples só é hediondo quando praticado em atividade típica de grupo de extermínio.", careers: both, priority: 3, hediondo: true },
        { id: "p121a", title: "Feminicídio", ref: "CP, art. 121-A", rule: "Reclusão, de 20 a 40 anos.", min: 20, max: 40, example: "Homem mata a ex-companheira após ameaças reiteradas, em contexto de violência doméstica.", watch: "Crime autônomo desde a Lei 14.994/2024 (antes era qualificadora). Hediondo.", careers: both, priority: 3, hediondo: true },
        { id: "p121b", title: "Vicaricídio", ref: "CP, art. 121-B", rule: "Reclusão, de 20 a 40 anos.", min: 20, max: 40, example: "Pai mata o filho para punir e fazer sofrer a ex-companheira, no contexto de violência doméstica.", watch: "Tipo novo, acrescentado pela Lei 15.384/2026 e incluído entre os hediondos.", careers: both, priority: 2, hediondo: true, changed: "Lei 15.384/2026" },
        { id: "p129", title: "Lesão corporal", ref: "CP, art. 129", rule: "Detenção, de 3 meses a 1 ano. Grave (§ 1º): reclusão, de 1 a 5 anos. Gravíssima (§ 2º): de 2 a 8 anos. Seguida de morte (§ 3º): de 4 a 12 anos.", min: 0.25, max: 1, example: "Briga de trânsito com soco que quebra o nariz do outro motorista: lesão corporal; se resultar incapacidade por mais de 30 dias, é grave.", watch: "Lesão gravíssima e seguida de morte podem ser hediondas se praticadas contra agentes de segurança (Lei 8.072, art. 1º, I-A).", careers: both, priority: 3 },
        { id: "p147", title: "Ameaça", ref: "CP, art. 147", rule: "Detenção, de 1 a 6 meses, ou multa.", min: 0.08, max: 0.5, example: "Vizinho diz que vai matar o outro e mostra uma faca na discussão.", watch: "Depende de representação; é o crime mais comum nos registros de violência doméstica.", careers: both, priority: 2 },
        { id: "p147a", title: "Perseguição (stalking)", ref: "CP, art. 147-A", rule: "Reclusão, de 6 meses a 2 anos, e multa.", min: 0.5, max: 2, example: "Ex-namorado envia mensagens todos os dias e aparece no trabalho da vítima mesmo após o término.", watch: "Pena aumentada de metade se contra mulher por razões da condição de sexo feminino.", careers: both, priority: 2 },
        { id: "p147b", title: "Violência psicológica contra a mulher", ref: "CP, art. 147-B", rule: "Reclusão, de 6 meses a 2 anos, e multa, se a conduta não constitui crime mais grave.", min: 0.5, max: 2, example: "Companheiro humilha e isola a mulher de amigos e familiares para controlá-la.", watch: "Cláusula de subsidiariedade: só se não houver crime mais grave. Há aumento de metade se houver uso de inteligência artificial.", careers: both, priority: 2 },
        { id: "p148", title: "Sequestro e cárcere privado", ref: "CP, art. 148", rule: "Reclusão, de 1 a 3 anos.", min: 1, max: 3, example: "Pessoa mantida trancada em casa, contra sua vontade, por dois dias.", watch: "Não confundir com extorsão mediante sequestro (art. 159), em que há vantagem como preço do resgate.", careers: both, priority: 2 },
      ],
    },
    {
      id: "patrimonio",
      title: "Contra o patrimônio",
      color: "#D97706",
      summary: "O maior volume de ocorrências. Várias penas foram alteradas em 2026 (Lei 15.397): confira os valores atuais.",
      nodes: [
        { id: "p155", title: "Furto", ref: "CP, art. 155", rule: "Reclusão, de 1 a 6 anos, e multa. Qualificado (§ 4º): reclusão, de 2 a 8 anos, e multa.", min: 1, max: 6, example: "Ladrão entra no quintal à noite e leva a bicicleta sem ninguém perceber: furto, com aumento de metade por repouso noturno.", watch: "Subtração sem violência nem grave ameaça. Pena do caput e do § 4º redefinidas pela Lei 15.397/2026.", careers: both, priority: 3, changed: "Lei 15.397/2026" },
        { id: "p157", title: "Roubo", ref: "CP, art. 157", rule: "Reclusão, de 6 a 10 anos, e multa. Com lesão grave (§ 3º, I): de 7 a 18 anos. Latrocínio (§ 3º, II): de 24 a 30 anos, e multa.", min: 6, max: 10, example: "Dois homens abordam um pedestre com faca e levam o celular: roubo com concurso de pessoas e emprego de arma branca.", watch: "Violência ou grave ameaça. Latrocínio é hediondo; pena do caput e do latrocínio alteradas pela Lei 15.397/2026.", careers: both, priority: 3, hediondo: true, changed: "Lei 15.397/2026" },
        { id: "p158", title: "Extorsão", ref: "CP, art. 158", rule: "Reclusão, de 4 a 10 anos, e multa. Com restrição da liberdade da vítima (§ 3º): de 6 a 12 anos, além da multa.", min: 4, max: 10, example: "Grupo ameaça o dono de um comércio para que pague uma 'taxa de proteção' mensal.", watch: "O sequestro relâmpago é a extorsão do § 3º: a liberdade da vítima é restringida e é condição para obter a vantagem.", careers: both, priority: 3 },
        { id: "p159", title: "Extorsão mediante sequestro", ref: "CP, art. 159", rule: "Reclusão, de 8 a 15 anos.", min: 8, max: 15, example: "Criminosos mantêm um empresário em cativeiro e exigem dinheiro da família pelo resgate.", watch: "Hediondo. É crime permanente, o que permite a prisão em flagrante enquanto durar o cativeiro.", careers: both, priority: 3, hediondo: true },
        { id: "p168", title: "Apropriação indébita", ref: "CP, art. 168", rule: "Reclusão, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Locatário recebe um carro emprestado para viagem e vende o veículo.", watch: "A posse é lícita no início; o dolo de se apropriar surge depois.", careers: both, priority: 1 },
        { id: "p171", title: "Estelionato", ref: "CP, art. 171", rule: "Reclusão, de 1 a 5 anos, e multa. Fraude por meios eletrônicos (§ 2º-A): de 4 a 8 anos, e multa.", min: 1, max: 5, example: "Golpista se passa por banco por mensagem e leva a vítima a transferir dinheiro por Pix: estelionato com fraude eletrônica.", watch: "O § 5º, que exigia representação da vítima, foi revogado pela Lei 15.397/2026, que também redefiniu as penas do caput e do § 2º-A.", careers: both, priority: 3, changed: "Lei 15.397/2026" },
        { id: "p180", title: "Receptação", ref: "CP, art. 180", rule: "Reclusão, de 2 a 6 anos, e multa. Qualificada (§ 1º, atividade comercial): de 3 a 8 anos, e multa.", min: 2, max: 6, example: "Dono de oficina compra peças de carros roubados para revender.", watch: "Exige conhecimento da origem criminosa (dolo direto no caput). A forma qualificada atinge quem atua no comércio.", careers: both, priority: 3, changed: "Lei 15.397/2026" },
        { id: "p154a", title: "Invasão de dispositivo informático", ref: "CP, art. 154-A", rule: "Reclusão, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Hacker acessa o celular de uma vítima para copiar fotos e dados sem autorização.", watch: "Crime cibernético típico. A pena sobe se houver prejuízo econômico (§ 2º).", careers: inv, priority: 2 },
      ],
    },
    {
      id: "sexual",
      title: "Dignidade sexual",
      color: "#7C3AED",
      summary: "Crimes de alta gravidade e de prioridade nas delegacias especializadas.",
      nodes: [
        { id: "p213", title: "Estupro", ref: "CP, art. 213", rule: "Reclusão, de 6 a 10 anos. Lesão grave ou vítima de 14 a 18 anos (§ 1º): de 8 a 12 anos. Morte (§ 2º): de 12 a 30 anos.", min: 6, max: 10, example: "Agente constrange a vítima, mediante violência, a praticar ato libidinoso diverso da conjunção carnal.", watch: "Desde 2009 reúne estupro e o antigo atentado violento ao pudor. Hediondo.", careers: both, priority: 3, hediondo: true },
        { id: "p217a", title: "Estupro de vulnerável", ref: "CP, art. 217-A", rule: "Reclusão, de 10 a 18 anos, e multa. Lesão grave (§ 3º): de 12 a 24 anos. Morte (§ 4º): de 20 a 40 anos.", min: 10, max: 18, example: "Adulto pratica ato libidinoso com criança de 12 anos, mesmo que ela 'consinta'.", watch: "Vulnerabilidade é absoluta para menor de 14 anos. Pena do caput alterada pela Lei 15.280/2025. Hediondo.", careers: both, priority: 3, hediondo: true, changed: "Lei 15.280/2025" },
      ],
    },
    {
      id: "fe",
      title: "Fé pública",
      color: "#0891B2",
      summary: "Falsificações e uso de documentos falsos: muito comuns na rotina de investigação.",
      nodes: [
        { id: "p297", title: "Falsificação de documento público", ref: "CP, art. 297", rule: "Reclusão, de 2 a 6 anos, e multa.", min: 2, max: 6, example: "Falsificar uma CNH para dirigir ou vender.", watch: "Documento público equiparado inclui, entre outros, documentos de identidade e títulos ao portador.", careers: both, priority: 3 },
        { id: "p298", title: "Falsificação de documento particular", ref: "CP, art. 298", rule: "Reclusão, de 1 a 5 anos, e multa.", min: 1, max: 5, example: "Forjar um contrato particular com assinatura imitada.", careers: both, priority: 2 },
        { id: "p299", title: "Falsidade ideológica", ref: "CP, art. 299", rule: "Reclusão, de 1 a 5 anos, e multa, se o documento é público; de 1 a 3 anos, e multa, se particular.", min: 1, max: 5, example: "Funcionário insere declaração falsa em um documento autêntico para beneficiar alguém.", watch: "O documento é materialmente verdadeiro; o que é falso é o conteúdo. Na falsificação (art. 297) o documento em si é forjado.", careers: both, priority: 3 },
        { id: "p304", title: "Uso de documento falso", ref: "CP, art. 304", rule: "A mesma pena cominada à falsificação ou à alteração.", min: 2, max: 6, example: "Apresentar à Polícia uma carteira de identidade falsa em uma abordagem.", watch: "Quem falsifica e usa responde só pela falsificação (absorção); a pena do uso depende do documento usado.", careers: both, priority: 3 },
        { id: "p307", title: "Falsa identidade", ref: "CP, art. 307", rule: "Detenção, de 3 meses a 1 ano, ou multa, se o fato não constitui elemento de crime mais grave.", min: 0.25, max: 1, example: "Preso em flagrante informa nome de outra pessoa para escapar de um mandado.", watch: "Para o STF, mentir sobre a identidade para esconder antecedentes configura o crime; o direito ao silêncio não o autoriza.", careers: both, priority: 2 },
      ],
    },
    {
      id: "admin",
      title: "Administração pública",
      color: "#2563EB",
      summary: "Crimes de servidores e contra a função pública. Inclui os que o próprio policial pode cometer.",
      nodes: [
        { id: "p312", title: "Peculato", ref: "CP, art. 312", rule: "Reclusão, de 2 a 12 anos, e multa.", min: 2, max: 12, example: "Servidor com a guarda de veículos apreendidos vende as peças em proveito próprio.", watch: "Peculato-furto (§ 1º): o servidor subtrai, sem ter a posse, valendo-se da facilidade do cargo. Peculato culposo tem pena de detenção.", careers: both, priority: 3 },
        { id: "p316", title: "Concussão", ref: "CP, art. 316", rule: "Reclusão, de 2 a 12 anos, e multa.", min: 2, max: 12, example: "Agente público exige dinheiro para não lavrar uma multa ou um auto.", watch: "O funcionário exige; na corrupção passiva ele solicita ou recebe. Pena igual à da corrupção passiva desde a Lei 13.964/2019.", careers: both, priority: 3 },
        { id: "p317", title: "Corrupção passiva", ref: "CP, art. 317", rule: "Reclusão, de 2 a 12 anos, e multa.", min: 2, max: 12, example: "Policial recebe valor para não registrar uma ocorrência.", watch: "Consumada com a solicitação, mesmo que a vantagem não seja paga. Aumento de um terço se o funcionário retarda ou deixa de praticar ato.", careers: both, priority: 3 },
        { id: "p333", title: "Corrupção ativa", ref: "CP, art. 333", rule: "Reclusão, de 2 a 12 anos, e multa.", min: 2, max: 12, example: "Motorista oferece dinheiro ao policial para que ele não faça o teste do bafômetro.", watch: "Quem oferece ou promete. As duas corrupções são crimes autônomos, não bilaterais.", careers: both, priority: 3 },
        { id: "p319", title: "Prevaricação", ref: "CP, art. 319", rule: "Detenção, de 3 meses a 1 ano, e multa.", min: 0.25, max: 1, example: "Policial deixa de registrar um boletim para favorecer um amigo.", watch: "Exige interesse ou sentimento pessoal; sem isso é descumprimento de dever, não prevaricação.", careers: both, priority: 3 },
        { id: "p329", title: "Resistência", ref: "CP, art. 329", rule: "Detenção, de 2 meses a 2 anos. Se o ato não se executa: reclusão, de 1 a 3 anos.", min: 0.17, max: 2, example: "Pessoa agride o policial para impedir a própria prisão em flagrante.", watch: "Exige violência ou ameaça. Sem isso, a conduta de se opor passivamente é desobediência.", careers: both, priority: 3 },
        { id: "p330", title: "Desobediência", ref: "CP, art. 330", rule: "Detenção, de 15 dias a 6 meses, e multa.", min: 0.04, max: 0.5, example: "Cidadão se recusa a cumprir ordem legal de funcionário público, sem violência.", careers: both, priority: 2 },
        { id: "p331", title: "Desacato", ref: "CP, art. 331", rule: "Detenção, de 6 meses a 2 anos, ou multa.", min: 0.5, max: 2, example: "Pessoa xinga o delegado na delegacia, em razão da função.", watch: "Teve a constitucionalidade confirmada pelo STF; exige ofensa ao funcionário no exercício da função ou em razão dela.", careers: both, priority: 3 },
        { id: "p332", title: "Tráfico de influência", ref: "CP, art. 332", rule: "Reclusão, de 2 a 5 anos, e multa.", min: 2, max: 5, example: "Intermediário cobra para 'conversar' com um servidor e tirar a pessoa de um inquérito.", careers: both, priority: 1 },
      ],
    },
    {
      id: "justica",
      title: "Administração da justiça e ordem pública",
      color: "#059669",
      summary: "Crimes que atrapalham a investigação e o processo, além da associação criminosa.",
      nodes: [
        { id: "p339", title: "Denunciação caluniosa", ref: "CP, art. 339", rule: "Reclusão, de 2 a 8 anos, e multa.", min: 2, max: 8, example: "Pessoa registra boletim acusando um desafeto de roubo que sabe que ele não cometeu.", watch: "Exige imputar crime a quem se sabe inocente e dar causa à instauração de inquérito ou processo.", careers: both, priority: 3 },
        { id: "p340", title: "Comunicação falsa de crime", ref: "CP, art. 340", rule: "Detenção, de 1 a 6 meses, ou multa.", min: 0.08, max: 0.5, example: "Alguém liga para a polícia e relata um assalto que nunca ocorreu.", watch: "Não aponta culpado, o que a diferencia da denunciação caluniosa.", careers: both, priority: 3 },
        { id: "p342", title: "Falso testemunho", ref: "CP, art. 342", rule: "Reclusão, de 2 a 4 anos, e multa.", min: 2, max: 4, example: "Testemunha afirma em juízo ter visto algo que não viu.", watch: "O tipo alcança o falso em processo judicial, administrativo, inquérito policial ou juízo arbitral (art. 342, caput).", careers: both, priority: 2 },
        { id: "p347", title: "Fraude processual", ref: "CP, art. 347", rule: "Detenção, de 3 meses a 2 anos, e multa.", min: 0.25, max: 2, example: "Alterar a cena do crime antes da chegada da perícia para enganar o juiz ou o perito.", careers: both, priority: 2 },
        { id: "p348", title: "Favorecimento pessoal", ref: "CP, art. 348", rule: "Detenção, de 1 a 6 meses, e multa.", min: 0.08, max: 0.5, example: "Amigo esconde um foragido em casa para que escape da polícia.", careers: both, priority: 2 },
        { id: "p351", title: "Fuga de pessoa presa", ref: "CP, art. 351", rule: "Detenção, de 6 meses a 2 anos.", min: 0.5, max: 2, example: "Terceiro abre a cela e facilita a fuga de um preso.", watch: "A fuga do próprio preso, sem violência, não é crime (apenas falta disciplinar).", careers: both, priority: 1 },
        { id: "p288", title: "Associação criminosa", ref: "CP, art. 288", rule: "Reclusão, de 1 a 3 anos.", min: 1, max: 3, example: "Quatro pessoas se reúnem de forma estável para cometer furtos em lojas.", watch: "Mínimo de 3 pessoas, com fim específico de cometer crimes. A organização criminosa exige 4 ou mais, com divisão de tarefas.", careers: both, priority: 3 },
      ],
    },
  ],
};

export const EXTRAVAGANTE_MAP: LegalMapData = {
  id: "extravagante",
  subject: "Legislação Penal Extravagante",
  title: "Mapa da Legislação Penal Extravagante: as leis que mais caem",
  intro:
    "Cada ramo traz uma lei central da rotina policial. Veja a pena na régua, o exemplo e a pegadinha de prova de cada tipo.",
  chart: "Pena máxima do caput, em anos",
  sources: [SRC.drogas, SRC.orcrim, SRC.lavagem, SRC.abuso, SRC.tortura, SRC.hediondos, SRC.penha, SRC.intercep, SRC.armas],
  checkedOn: "2026-11-13",
  branches: [
    {
      id: "drogas",
      title: "Drogas (Lei 11.343/2006)",
      color: "#059669",
      summary: "O tráfico é o crime mais frequente nas delegacias e um dos mais cobrados.",
      nodes: [
        { id: "d28", title: "Posse para consumo pessoal", ref: "Lei 11.343, art. 28", rule: "Advertência, prestação de serviços à comunidade e medida educativa: sem pena de prisão.", example: "Pessoa é abordada com pequena quantidade de maconha para uso próprio.", watch: "Houve descriminalização no sentido de não haver prisão, mas a conduta segue como infração penal sui generis. O juiz considera natureza, quantidade e circunstâncias.", careers: both, priority: 3 },
        { id: "d33", title: "Tráfico de drogas", ref: "Lei 11.343, art. 33", rule: "Reclusão, de 5 a 15 anos, e 500 a 1.500 dias-multa.", min: 5, max: 15, example: "Suspeito é flagrado guardando porções de cocaína embaladas e balança de precisão.", watch: "Tipo de ação múltipla. Equiparado a hediondo: inafiançável e sem graça ou anistia.", careers: both, priority: 3, hediondo: true },
        { id: "d34", title: "Maquinário para o tráfico", ref: "Lei 11.343, art. 34", rule: "Reclusão, de 3 a 10 anos.", min: 3, max: 10, example: "Alguém mantém prensa e equipamentos para produzir drogas em um depósito.", careers: both, priority: 2 },
        { id: "d35", title: "Associação para o tráfico", ref: "Lei 11.343, art. 35", rule: "Reclusão, de 3 a 10 anos.", min: 3, max: 10, example: "Dois ou mais agentes se unem de forma estável para vender drogas em uma região.", watch: "Basta a associação de duas ou mais pessoas, ainda que sem reiteração; exige estabilidade e permanência.", careers: both, priority: 3 },
        { id: "d36", title: "Financiamento do tráfico", ref: "Lei 11.343, art. 36", rule: "Reclusão, de 8 a 20 anos.", min: 8, max: 20, example: "Empresário custeia a compra de um carregamento sem participar da venda.", careers: both, priority: 2 },
        { id: "d37", title: "Colaborador / informante", ref: "Lei 11.343, art. 37", rule: "Reclusão, de 2 a 6 anos.", min: 2, max: 6, example: "Pessoa avisa os traficantes sobre as operações da polícia (o 'olheiro').", careers: both, priority: 2 },
      ],
    },
    {
      id: "orcrim",
      title: "Organizações criminosas (Lei 12.850/2013)",
      color: "#DC2626",
      summary: "Meios de investigação especiais: colaboração premiada, ação controlada e infiltração.",
      nodes: [
        { id: "o2", title: "Organização criminosa", ref: "Lei 12.850, art. 2º", rule: "Reclusão, de 3 a 8 anos, e multa, sem prejuízo das penas dos demais crimes.", min: 3, max: 8, example: "Grupo estruturado de seis pessoas com chefe, 'gerente' e 'soldados' pratica roubos de carga de forma coordenada.", watch: "Conceito: 4 ou mais pessoas, estruturalmente ordenadas, com divisão de tarefas e infrações com pena máxima acima de 4 anos ou transnacionais.", careers: both, priority: 3 },
        { id: "o18", title: "Revelar identidade do colaborador", ref: "Lei 12.850, art. 18", rule: "Reclusão, de 1 a 3 anos, e multa.", min: 1, max: 3, example: "Agente divulga o nome do colaborador sem a autorização escrita dele.", careers: both, priority: 2 },
        { id: "o19", title: "Falsa colaboração", ref: "Lei 12.850, art. 19", rule: "Reclusão, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Investigado imputa crime a um inocente, sob pretexto de colaborar com a Justiça.", careers: both, priority: 2 },
        { id: "o20", title: "Violar sigilo de ação controlada ou infiltração", ref: "Lei 12.850, art. 20", rule: "Reclusão, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Servidor vaza que há um agente infiltrado em uma facção.", careers: both, priority: 2 },
      ],
    },
    {
      id: "lavagem",
      title: "Lavagem de dinheiro (Lei 9.613/1998)",
      color: "#2563EB",
      summary: "Qualquer infração penal pode ser antecedente. A atuação é financeira e patrimonial.",
      nodes: [
        { id: "l1", title: "Lavagem de dinheiro", ref: "Lei 9.613, art. 1º", rule: "Reclusão, de 3 a 10 anos, e multa.", min: 3, max: 10, example: "Traficante compra imóveis em nome de terceiros para ocultar a origem do dinheiro.", watch: "Desde a Lei 12.683/2012 qualquer infração penal pode ser a antecedente. Fases: colocação, ocultação e integração.", careers: both, priority: 3 },
      ],
    },
    {
      id: "abuso",
      title: "Abuso de autoridade (Lei 13.869/2019)",
      color: "#D97706",
      summary: "Crimes que o próprio agente público pode cometer. Peso especial para Delegado.",
      nodes: [
        { id: "a9", title: "Prisão ou privação de liberdade ilegal", ref: "Lei 13.869, art. 9º", rule: "Detenção, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Autoridade decreta a prisão de alguém em manifesta desconformidade com as hipóteses legais.", careers: del, priority: 3 },
        { id: "a10", title: "Condução coercitiva ilegal", ref: "Lei 13.869, art. 10", rule: "Detenção, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Conduzir testemunha ou investigado de forma coercitiva sem intimação prévia.", careers: both, priority: 2 },
        { id: "a12", title: "Não comunicar prisão em flagrante", ref: "Lei 13.869, art. 12", rule: "Detenção, de 6 meses a 2 anos, e multa.", min: 0.5, max: 2, example: "Delegado deixa de comunicar ao juiz uma prisão em flagrante no prazo legal.", careers: del, priority: 3 },
        { id: "a13", title: "Constranger o preso", ref: "Lei 13.869, art. 13", rule: "Detenção, de 1 a 4 anos, e multa, sem prejuízo da pena por violência.", min: 1, max: 4, example: "Agente obriga o preso a produzir prova contra si ou a ser exposto à curiosidade pública.", careers: both, priority: 3 },
        { id: "a22", title: "Invadir imóvel sem ordem", ref: "Lei 13.869, art. 22", rule: "Detenção, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Policiais entram em uma casa à noite, sem mandado e sem flagrante.", watch: "Respeita o art. 5º, XI, da CF: flagrante, desastre ou socorro a qualquer hora; mandado só de dia.", careers: both, priority: 3 },
        { id: "a25", title: "Prova manifestamente ilícita", ref: "Lei 13.869, art. 25", rule: "Detenção, de 1 a 4 anos, e multa.", min: 1, max: 4, example: "Obter confissão mediante tortura ou invadir celular sem ordem judicial.", careers: both, priority: 2 },
        { id: "a27", title: "Investigar sem justa causa", ref: "Lei 13.869, art. 27", rule: "Detenção, de 6 meses a 2 anos, e multa.", min: 0.5, max: 2, example: "Instaurar um inquérito contra alguém sem nenhum indício de crime, só por perseguição.", careers: del, priority: 2 },
      ],
    },
    {
      id: "tortura",
      title: "Tortura e hediondos",
      color: "#7C3AED",
      summary: "Crimes inafiançáveis, sem graça ou anistia, com regime inicial fechado.",
      nodes: [
        { id: "t1", title: "Tortura", ref: "Lei 9.455, art. 1º", rule: "Reclusão, de 2 a 8 anos. Lesão grave ou gravíssima: de 4 a 10 anos. Morte: de 8 a 16 anos.", min: 2, max: 8, example: "Policial agride um preso para obter confissão.", watch: "Aumento de 1/6 a 1/3 se cometido por agente público. Perda do cargo e regime inicial fechado. A omissão de quem devia evitar tem detenção de 1 a 4 anos.", careers: both, priority: 3, hediondo: true },
        { id: "h1", title: "Rol dos crimes hediondos", ref: "Lei 8.072, art. 1º", rule: "Inclui homicídio qualificado, feminicídio, vicaricídio, latrocínio, extorsão mediante sequestro, estupro e estupro de vulnerável, entre outros.", example: "Latrocínio e feminicídio constam do rol; furto qualificado, em regra, não.", watch: "O rol foi ampliado em 2025 e 2026 (vicaricídio, lesões contra agentes de segurança). Hediondos: sem anistia, graça, indulto e fiança.", careers: both, priority: 3, hediondo: true, changed: "Leis 15.159/2025 e 15.384/2026" },
      ],
    },
    {
      id: "armas",
      title: "Armas, violência doméstica e interceptação",
      color: "#0891B2",
      summary: "Estatuto do Desarmamento, medidas protetivas da Maria da Penha e sigilo das comunicações.",
      nodes: [
        { id: "ar12", title: "Posse irregular de arma de uso permitido", ref: "Lei 10.826, art. 12", rule: "Detenção, de 1 a 3 anos, e multa.", min: 1, max: 3, example: "Morador mantém um revólver registrado com o registro vencido dentro de casa.", watch: "Posse é em casa ou no trabalho; fora disso é porte (art. 14).", careers: both, priority: 3, check: "secundaria" },
        { id: "ar14", title: "Porte ilegal de arma de uso permitido", ref: "Lei 10.826, art. 14", rule: "Reclusão, de 2 a 4 anos, e multa.", min: 2, max: 4, example: "Pessoa é abordada na rua com pistola de calibre permitido sem autorização de porte.", careers: both, priority: 3, check: "secundaria" },
        { id: "ar16", title: "Arma de uso restrito ou proibido", ref: "Lei 10.826, art. 16", rule: "Reclusão, de 3 a 6 anos, e multa. Arma de uso proibido: de 4 a 12 anos.", min: 3, max: 6, example: "Suspeito é preso com fuzil de uso restrito em uma abordagem.", careers: both, priority: 3, check: "secundaria" },
        { id: "ar17", title: "Comércio ilegal de arma", ref: "Lei 10.826, art. 17", rule: "Reclusão, de 6 a 12 anos, e multa.", min: 6, max: 12, example: "Revendedor vende armas sem autorização, mesmo no âmbito de sua atividade comercial.", careers: both, priority: 2, check: "secundaria" },
        { id: "mp24a", title: "Descumprir medida protetiva", ref: "Lei 11.340, art. 24-A", rule: "Reclusão, de 2 a 5 anos, e multa.", min: 2, max: 5, example: "Agressor se aproxima da vítima, contrariando a decisão judicial que proibia o contato.", watch: "Pena atual de 2 a 5 anos; a competência é do juízo que deferiu a medida, e a pena prevista é de reclusão.", careers: both, priority: 3 },
        { id: "i10", title: "Interceptação ilegal", ref: "Lei 9.296, art. 10", rule: "Reclusão, de 2 a 4 anos, e multa.", min: 2, max: 4, example: "Grampear um telefone, sem ordem judicial, para fins pessoais.", watch: "A interceptação exige ordem judicial, para investigação criminal ou instrução processual penal (CF, art. 5º, XII).", careers: both, priority: 3 },
      ],
    },
  ],
};

const proc = (
  id: string, title: string, ref: string, rule: string, example: string,
  priority: Priority, careers: Career[] = both, watch?: string, changed?: string,
): LegalNode => ({ id, title, ref, rule, example, priority, careers, ...(watch ? { watch } : {}), ...(changed ? { changed } : {}) });

export const PROCESSUAL_MAP: LegalMapData = {
  id: "processual",
  subject: "Direito Processual Penal",
  title: "Mapa do Processo Penal: o que a Polícia Civil faz do flagrante à denúncia",
  intro:
    "Siga a linha do tempo da persecução: inquérito, prisão em flagrante, audiência de custódia, prisões cautelares e provas. Cada cartão traz o artigo, a regra e um exemplo.",
  chart: null,
  sources: [SRC.cpp],
  checkedOn: "2026-11-13",
  branches: [
    {
      id: "inquerito",
      title: "Inquérito policial",
      color: "#2563EB",
      summary: "A investigação da polícia judiciária: quem instaura, prazos e o que a autoridade pode ou não fazer.",
      nodes: [
        proc("c4", "Polícia judiciária", "CPP, art. 4º", "A polícia judiciária exercida pelas autoridades policiais tem por fim a apuração das infrações penais e da sua autoria.", "A Delegacia de Homicídios investiga a morte de uma pessoa e reúne provas para identificar o autor.", 3),
        proc("c5", "Como o inquérito começa", "CPP, art. 5º", "Nos crimes de ação pública, o inquérito começa de ofício, por requisição da autoridade judiciária ou do Ministério Público, ou a requerimento do ofendido ou de quem o represente.", "O delegado toma conhecimento de um roubo pela imprensa e instaura o inquérito de ofício.", 3, del, "A autoridade policial pode instaurar de ofício, mas nos crimes de ação penal pública condicionada depende de representação."),
        proc("c10", "Prazo do inquérito", "CPP, art. 10", "O inquérito terminará no prazo de 10 dias se o indiciado estiver preso, contado do dia da prisão, e no de 30 dias quando estiver solto.", "Preso em flagrante por roubo, o investigado tem inquérito concluído em até 10 dias.", 3, both, "Prazo de preso é improrrogável pelo CPP; para solto, a prorrogação é pedida ao juiz."),
        proc("c13", "O que incumbe à autoridade policial", "CPP, art. 13", "Fornecer informações, realizar diligências requisitadas, cumprir mandados de prisão e representar, se necessário, pela prisão preventiva.", "O delegado representa ao juiz pela prisão preventiva de um suspeito que ameaça testemunhas.", 2, del),
        proc("c17", "Arquivamento é com o juiz e o MP", "CPP, art. 17", "A autoridade policial não poderá mandar arquivar autos de inquérito.", "Sem provas suficientes, o delegado relata o inquérito e o remete ao Judiciário; só o MP pede o arquivamento.", 3, del),
        proc("c24", "Quem propõe a ação penal", "CPP, art. 24", "Nos crimes de ação pública, a ação penal será promovida por denúncia do Ministério Público.", "Após receber o relatório do inquérito, o promotor oferece denúncia por furto.", 2),
        proc("c46", "Prazo da denúncia", "CPP, art. 46", "O prazo para oferecer a denúncia, estando o réu preso, será de 5 dias, e de 15 dias se o réu estiver solto ou afiançado.", "Réu preso por tráfico: o MP tem 5 dias para denunciar após receber o inquérito.", 2, both),
      ],
    },
    {
      id: "flagrante",
      title: "Prisão em flagrante e custódia",
      color: "#DC2626",
      summary: "O ato que mais move o plantão da delegacia: hipóteses de flagrante, formalidades e a audiência de custódia.",
      nodes: [
        proc("c301", "Quem pode prender em flagrante", "CPP, art. 301", "Qualquer do povo poderá e as autoridades policiais e seus agentes deverão prender quem quer que seja encontrado em flagrante delito.", "Um cidadão detém o ladrão que acabou de furtar e o entrega à polícia.", 3, both, "Flagrante facultativo para qualquer do povo; obrigatório para a polícia."),
        proc("c302", "Hipóteses de flagrante", "CPP, art. 302", "Está em flagrante quem: I – está cometendo a infração; II – acaba de cometê-la; III – é perseguido logo após; IV – é encontrado logo depois com instrumentos ou objetos que façam presumir ser autor.", "Suspeito é perseguido pela viatura logo após assaltar uma loja e é encontrado com a arma e o dinheiro.", 3),
        proc("c304", "Auto de prisão em flagrante", "CPP, art. 304", "Apresentado o preso à autoridade competente, ouvirá esta o condutor e colherá sua assinatura, a das testemunhas e do acusado, lavrando-se o auto.", "No plantão, o delegado ouve o condutor, as testemunhas e o preso e lavra o auto.", 3, del),
        proc("c306", "Comunicação imediata", "CPP, art. 306", "A prisão e o local onde se encontre o preso serão comunicados imediatamente ao juiz, ao Ministério Público e à família ou pessoa indicada; em até 24 horas, o auto é encaminhado ao juiz.", "Após lavrar o auto às 22h, a delegacia comunica o juiz e envia cópia à Defensoria se o preso não tiver advogado.", 3, both),
        proc("c310", "Audiência de custódia", "CPP, art. 310", "Em até 24 horas após o recebimento do auto, o juiz realizará audiência de custódia, podendo ser por videoconferência, e decidirá se relaxa a prisão, converte em preventiva ou concede liberdade provisória.", "O preso é levado ao juiz no dia seguinte, que decide se mantém a prisão como preventiva.", 3, both, "Verifique a redação vigente: houve alteração recente (Lei 15.358/2026) sobre o uso de videoconferência.", "Lei 15.358/2026"),
      ],
    },
    {
      id: "cautelares",
      title: "Prisão preventiva e cautelares",
      color: "#D97706",
      summary: "Quando a prisão antes da sentença é possível e quais medidas substituem a prisão.",
      nodes: [
        proc("c311", "Quem decreta a preventiva", "CPP, art. 311", "A prisão preventiva pode ser decretada pelo juiz, a requerimento do MP, do querelante ou do assistente, ou por representação da autoridade policial.", "O delegado representa pela preventiva de um líder de organização criminosa que ameaça testemunhas.", 3, both, "O juiz não pode decretá-la de ofício."),
        proc("c312", "Requisitos da preventiva", "CPP, art. 312", "Garantia da ordem pública ou econômica, conveniência da instrução criminal ou garantia da aplicação da lei penal, com prova da existência do crime e indício suficiente de autoria.", "Reincidente em roubos, com risco concreto de continuar delinquindo, tem a preventiva decretada.", 3),
        proc("c313", "Quando cabe", "CPP, art. 313", "Cabe nos crimes dolosos punidos com pena privativa de liberdade máxima superior a 4 anos, entre outras hipóteses.", "Homicídio doloso admite preventiva; contravenção simples, não.", 3),
        proc("c319", "Medidas cautelares diversas", "CPP, art. 319", "Comparecimento periódico, proibição de frequentar lugares, proibição de contato, monitoração eletrônica e outras alternativas à prisão.", "Em vez de prender, o juiz proíbe o agressor de se aproximar da vítima e determina tornozeleira.", 2, both),
      ],
    },
    {
      id: "provas",
      title: "Provas",
      color: "#059669",
      summary: "Valor das provas do inquérito e a cadeia de custódia, tema recorrente das provas de polícia.",
      nodes: [
        proc("c155", "Livre apreciação da prova", "CPP, art. 155", "O juiz formará sua convicção pela livre apreciação da prova produzida em contraditório judicial, não podendo fundamentar a decisão exclusivamente nos elementos do inquérito.", "A condenação não pode se basear só no depoimento colhido na delegacia, sem repetição em juízo.", 3, both, "Exceção: provas cautelares, não repetíveis e antecipadas."),
        proc("c158a", "Cadeia de custódia", "CPP, art. 158-A", "Conjunto de procedimentos para documentar a história cronológica do vestígio, do reconhecimento até o descarte.", "Perito recolhe uma arma no local do crime, registra e lacra; a quebra da cadeia pode invalidar a prova.", 3, both),
      ],
    },
  ],
};

const cf = (
  id: string, title: string, ref: string, rule: string, example: string,
  priority: Priority, careers: Career[] = both, watch?: string,
): LegalNode => ({ id, title, ref, rule, example, priority, careers, ...(watch ? { watch } : {}) });

export const CONSTITUCIONAL_MAP: LegalMapData = {
  id: "constitucional",
  subject: "Direito Constitucional",
  title: "Mapa da Constituição: segurança pública e garantias que mais caem em prova policial",
  intro:
    "Dois blocos que mais aparecem nos concursos policiais: o art. 144 (quem faz o quê) e os direitos e garantias do art. 5º ligados à prisão e ao processo.",
  chart: null,
  sources: [SRC.cf],
  checkedOn: "2026-11-13",
  branches: [
    {
      id: "seguranca",
      title: "Segurança pública (art. 144)",
      color: "#2563EB",
      summary: "Os órgãos, suas atribuições e quem dirige a polícia civil.",
      nodes: [
        cf("f144", "Órgãos da segurança pública", "CF, art. 144", "A segurança pública é dever do Estado, direito e responsabilidade de todos, exercida para a preservação da ordem pública e da incolumidade das pessoas e do patrimônio, por meio dos órgãos que o artigo enumera, entre eles as polícias civis.", "A banca pergunta quais órgãos integram o sistema: polícias federal, rodoviária federal, ferroviária federal, civis, militares, corpos de bombeiros e polícias penais.", 3),
        cf("f144p4", "Polícia civil", "CF, art. 144, § 4º", "Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.", "Crime comum de roubo é apurado pela polícia civil; crime militar, não.", 3, both, "É o dispositivo central do seu cargo: polícia judiciária e apuração de infrações."),
        cf("f144p1", "Polícia Federal", "CF, art. 144, § 1º", "Destina-se, entre outras funções, a exercer, com exclusividade, as funções de polícia judiciária da União.", "Crime contra a União é investigado pela PF, não pela polícia civil.", 2, del, "Exclusividade é da polícia judiciária da União, não da apuração de infrações em geral."),
        cf("f144p5a", "Polícias penais", "CF, art. 144, § 5º-A", "Vinculadas ao órgão administrador do sistema penal da unidade federativa, cabe-lhes a segurança dos estabelecimentos penais.", "A segurança interna do presídio estadual é das polícias penais.", 1, both),
      ],
    },
    {
      id: "garantias",
      title: "Direitos e garantias (art. 5º)",
      color: "#DC2626",
      summary: "Prisão, devido processo, provas e os remédios constitucionais.",
      nodes: [
        cf("f5x", "Intimidade e vida privada", "CF, art. 5º, X", "São invioláveis a intimidade, a vida privada, a honra e a imagem das pessoas, assegurado o direito a indenização pelo dano material ou moral.", "Vazar foto íntima de um investigado em redes sociais fere esse direito.", 2),
        cf("f5xi", "Inviolabilidade do domicílio", "CF, art. 5º, XI", "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.", "A polícia só entra de madrugada sem mandado se houver flagrante, desastre ou socorro.", 3, both, "Ordem judicial só durante o dia."),
        cf("f5xii", "Sigilo de comunicações", "CF, art. 5º, XII", "É inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e telefônicas, salvo, no último caso, por ordem judicial, nas hipóteses e na forma que a lei estabelecer para fins de investigação criminal ou instrução processual penal.", "A interceptação telefônica exige ordem judicial.", 3),
        cf("f5xliii", "Crimes inafiançáveis", "CF, art. 5º, XLIII", "A lei considerará crimes inafiançáveis e insuscetíveis de graça ou anistia a prática da tortura, o tráfico ilícito de entorpecentes e drogas afins, o terrorismo e os definidos como crimes hediondos.", "Tráfico de drogas e tortura: sem fiança e sem anistia.", 3),
        cf("f5liv", "Devido processo legal", "CF, art. 5º, LIV", "Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.", "Prisão sem ordem escrita e fundamentada e fora das hipóteses constitucionais viola o devido processo legal.", 3),
        cf("f5lv", "Contraditório e ampla defesa", "CF, art. 5º, LV", "Aos litigantes, em processo judicial ou administrativo, e aos acusados em geral são assegurados o contraditório e ampla defesa, com os meios e recursos a ela inerentes.", "O acusado tem direito de ser ouvido e produzir provas antes de ser condenado.", 3),
        cf("f5lvi", "Provas ilícitas", "CF, art. 5º, LVI", "São inadmissíveis, no processo, as provas obtidas por meios ilícitos.", "Confissão obtida sob tortura não pode ser usada como prova.", 3),
        cf("f5lvii", "Presunção de inocência", "CF, art. 5º, LVII", "Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.", "Um preso preventivo continua sendo presumido inocente até a condenação definitiva.", 3),
        cf("f5lxi", "Prisão só por flagrante ou ordem escrita", "CF, art. 5º, LXI", "Ninguém será preso senão em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente, salvo nos casos de transgressão militar ou crime propriamente militar.", "A polícia civil não pode prender alguém por mera suspeita, sem flagrante nem mandado.", 3, both, "Prisão por ordem escrita é da autoridade judiciária."),
        cf("f5lxii", "Comunicação da prisão", "CF, art. 5º, LXII", "A prisão de qualquer pessoa e o local onde se encontre serão comunicados imediatamente ao juiz competente e à família do preso ou à pessoa por ele indicada.", "Preso em flagrante tem a família avisada logo.", 3),
        cf("f5lxiii", "Direito ao silêncio e assistência", "CF, art. 5º, LXIII", "O preso será informado de seus direitos, entre os quais o de permanecer calado, sendo-lhe assegurada a assistência da família e de advogado.", "O delegado informa ao preso do direito de ficar em silêncio.", 3),
        cf("f5lxiv", "Identificação dos responsáveis", "CF, art. 5º, LXIV", "O preso tem direito à identificação dos responsáveis por sua prisão ou por seu interrogatório policial.", "O preso pode saber o nome do policial que o interrogou.", 2),
        cf("f5lxv", "Relaxamento da prisão ilegal", "CF, art. 5º, LXV", "A prisão ilegal será imediatamente relaxada pela autoridade judiciária.", "Flagrante forjado ou fora das hipóteses legais deve ser relaxado.", 3),
        cf("f5lxvii", "Prisão civil", "CF, art. 5º, LXVII", "Não haverá prisão civil por dívida, salvo a do responsável pelo inadimplemento voluntário e inescusável de obrigação alimentícia.", "Devedor de pensão alimentícia pode ser preso; devedor de cartão, não.", 2),
        cf("f5lxviii", "Habeas corpus", "CF, art. 5º, LXVIII", "Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder.", "Advogado impetra HC contra prisão ilegal.", 3),
        cf("f5lxix", "Mandado de segurança", "CF, art. 5º, LXIX", "Protege direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública.", "Candidato impetra mandado de segurança contra ato ilegal em concurso.", 2),
        cf("f5lxxii", "Habeas data", "CF, art. 5º, LXXII", "Conceder-se-á habeas data para assegurar o conhecimento de informações relativas à pessoa do impetrante constantes de registros ou bancos de dados de entidades governamentais ou de caráter público, ou para retificação de dados.", "Cidadão pede acesso a dados seus em registro de órgão público.", 2),
        cf("f5lxxviii", "Duração razoável do processo", "CF, art. 5º, LXXVIII", "A todos, no âmbito judicial e administrativo, são assegurados a razoável duração do processo e os meios que garantam a celeridade de sua tramitação.", "Processo que se arrasta sem justificativa viola a garantia.", 2),
      ],
    },
    {
      id: "mp",
      title: "Ministério Público (art. 129)",
      color: "#059669",
      summary: "A titularidade da ação penal e o controle externo da atividade policial.",
      nodes: [
        cf("f129i", "Ação penal pública", "CF, art. 129, I", "É função institucional do MP promover, privativamente, a ação penal pública, na forma da lei.", "O promotor, e não o delegado, oferece a denúncia.", 3),
        cf("f129vii", "Controle externo da polícia", "CF, art. 129, VII", "Exercer o controle externo da atividade policial, na forma da lei complementar.", "O MP fiscaliza a atividade da polícia civil.", 3, both),
        cf("f129viii", "Requisição de diligências", "CF, art. 129, VIII", "Requisitar diligências investigatórias e a instauração de inquérito policial, indicados os fundamentos jurídicos de suas manifestações processuais.", "O promotor requisita ao delegado a instauração de inquérito sobre um crime noticiado.", 3, both),
      ],
    },
  ],
};

export const LEGAL_MAPS: LegalMapData[] = [PENAL_MAP, PROCESSUAL_MAP, EXTRAVAGANTE_MAP, CONSTITUCIONAL_MAP];

/** Mapa interativo da disciplina (nome canônico), ou undefined. */
export function legalMapFor(subject: string): LegalMapData | undefined {
  return LEGAL_MAPS.find((map) => map.subject === subject);
}
