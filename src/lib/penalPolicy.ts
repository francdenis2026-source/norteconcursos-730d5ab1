import { CRIMES, crimeStudyTarget, penaParaDias } from "./penalCalc";

export type RuleState = "vedado" | "condicionado" | "nao-avaliado";
export type PenalRule = {
  title: string;
  state: RuleState;
  label: string;
  explanation: string;
  reference: string;
};
export type CrimePolicy = {
  crimeId: string;
  scope: string;
  classification: "hediondo" | "equiparado" | "comum" | "desconhecido";
  classificationLabel: string;
  classificationNote: string;
  rules: PenalRule[];
  needsJudicialReading: boolean;
};
const rule = (
  title: string,
  state: RuleState,
  label: string,
  explanation: string,
  reference: string,
): PenalRule => ({ title, state, label, explanation, reference });

/** Applies only to the selected, explicitly named statutory modality, not to every form of an offence. */
export function crimePolicy(crimeId: string, extermination = false): CrimePolicy {
  const crime = CRIMES.find((c) => c.id === crimeId);
  if (!crime)
    return {
      crimeId,
      scope: "Pena ou crime manual: não há enquadramento jurídico automático.",
      classification: "desconhecido",
      classificationLabel: "Natureza não avaliada",
      classificationNote: "O número de anos não identifica o delito nem suas vedações.",
      needsJudicialReading: true,
      rules: [
        "Progressão",
        "Livramento condicional",
        "Fiança",
        "Indulto",
        "Graça",
        "Anistia",
        "Substituição",
        "Sursis",
        "Saída temporária",
        "Monitoração eletrônica",
      ].map((title) =>
        rule(
          title,
          "nao-avaliado",
          "Exige enquadramento",
          "Identifique o diploma, a modalidade, a data do fato e os requisitos antes de simular este benefício.",
          "Fonte específica do delito e lei no tempo",
        ),
      ),
    };
  const hediondo =
    ["cp121q", "cp213", "cp217a"].includes(crimeId) || (crimeId === "cp121" && extermination);
  const equiparado = crimeId === "d33";
  const special = hediondo || equiparado;
  const classification = hediondo ? "hediondo" : equiparado ? "equiparado" : "comum";
  const target = crimeStudyTarget(crimeId)!;
  let scope = `${crime.label}. As qualificadoras e modalidades não selecionadas não são aplicadas.`;
  if (crimeId === "d33")
    scope +=
      " Este perfil é o caput sem reconhecimento do privilégio do §4º; uma fração de diminuição não reconhece o privilégio automaticamente.";
  if (crimeId === "a16")
    scope += " O perfil é arma de uso restrito, não arma de uso proibido do §2º.";
  if (crimeId === "cp121")
    scope += extermination
      ? " Informada atividade típica de grupo de extermínio."
      : " Não informada atividade típica de grupo de extermínio.";
  const classificationNote = special
    ? equiparado
      ? "Tráfico do caput sem privilégio: equiparado para as consequências legais indicadas. Tráfico privilegiado exige perfil próprio; a redução numérica isolada não muda a natureza."
      : "Enquadramento no rol da Lei 8.072, art. 1º, para a modalidade selecionada."
    : "A modalidade selecionada não consta como hedionda neste recorte. Formas qualificadas, circunstanciadas, contexto do fato ou leis anteriores podem alterar a conclusão.";
  const violent = [
    "cp121",
    "cp121q",
    "cp129",
    "cp147",
    "cp157",
    "cp158",
    "cp213",
    "cp217a",
    "cp329",
  ].includes(crimeId);
  const rules = [
    rule(
      "Progressão",
      "condicionado",
      "Possível com requisitos",
      "Hediondez não elimina progressão. A fração e os requisitos objetivos/subjetivos dependem da LEP e da lei no tempo; não se concede benefício automaticamente.",
      "LEP, art. 112",
    ),
    rule(
      "Livramento condicional",
      "condicionado",
      special ? "Regra especial e vedações" : "Requisitos do art. 83",
      special
        ? "Não use a regra comum de 1/3 ou 1/2. Confira resultado morte, reincidência específica e vedações da LEP antes de usar a fração especial."
        : "Conferir pena de ao menos dois anos, reincidência, antecedentes e requisitos subjetivos. Pena curta não basta.",
      equiparado
        ? "Lei 11.343, art. 44, parágrafo único; CP, art. 83"
        : "CP, art. 83; LEP, art. 112",
    ),
    special
      ? rule(
          "Fiança",
          "vedado",
          "Inafiançável",
          "A modalidade selecionada não admite fiança. Isso não determina prisão obrigatória nem impede automaticamente liberdade provisória sem fiança.",
          "CPP, art. 323, II; Lei 8.072, art. 2º, II",
        )
      : rule(
          "Fiança",
          "condicionado",
          penaParaDias(crime.max) <= 4 * 360
            ? "Autoridade policial: até 4 anos"
            : "Análise judicial",
          `Pela pena máxima deste perfil, ${penaParaDias(crime.max) <= 4 * 360 ? "a autoridade policial pode apreciar fiança" : "a apreciação cabe ao juiz"}, mas as vedações e requisitos dos arts. 323 e 324 continuam aplicáveis. Não é concessão automática.`,
          "CPP, arts. 322–324",
        ),
    ...["Indulto", "Graça", "Anistia"].map((title) =>
      special
        ? rule(
            title,
            "vedado",
            "Vedado neste perfil",
            "Vedação da modalidade hedionda/equiparada selecionada. Não extrapolar este perfil ao tráfico privilegiado nem a outras formas não selecionadas.",
            "Lei 8.072, art. 2º, I; CF, art. 5º, XLIII",
          )
        : rule(
            title,
            "condicionado",
            title === "Indulto" ? "Depende do decreto" : "Depende do ato competente",
            "A ausência desta vedação específica não concede o benefício. Conferir o ato aplicável, suas exclusões, a modalidade do delito e a situação concreta; nenhum decreto anual é presumido aqui.",
            title === "Anistia"
              ? "CF, art. 48, VIII; CP, art. 107, II"
              : "CF, art. 84, XII; LEP, arts. 188–193",
          ),
    ),
    rule(
      "Substituição",
      "condicionado",
      "Requisitos e jurisprudência",
      "Conferir quantidade de pena, violência/grave ameaça, reincidência e demais requisitos. Não tratar a vedação literal da Lei de Drogas como conclusão automática sem a jurisprudência pertinente.",
      "CP, art. 44; Súmula 588/STJ quando pertinente",
    ),
    equiparado
      ? rule(
          "Sursis",
          "vedado",
          "Vedado no caput sem privilégio",
          "Este perfil aplica o art. 44 da Lei de Drogas, sem presumir o reconhecimento do §4º ou de outra modalidade.",
          "Lei 11.343, art. 44",
        )
      : rule(
          "Sursis",
          "condicionado",
          "Requisitos próprios",
          "A pena e os demais requisitos precisam ser conferidos; a suspensão não decorre simplesmente do rótulo do crime.",
          "CP, art. 77",
        ),
  ];
  rules.push(
    hediondo || violent
      ? rule(
          "Saída temporária",
          "vedado",
          "Vedada no recorte atual",
          "No regime da Lei 14.843/2024, o art. 122, §2º, veda saída temporária e trabalho externo sem vigilância direta para hediondo ou violência/grave ameaça contra pessoa. Conferir lei no tempo e decisões aplicáveis. Não confundir com permissão de saída com escolta do art. 120.",
          "LEP, arts. 120 e 122, §2º",
        )
      : rule(
          "Saída temporária",
          "condicionado",
          equiparado ? "Exige análise da regra especial" : "Estudo no semiaberto, com requisitos",
          "O recorte atual mantém saída para frequência a curso, mediante requisitos e autorização; visitas familiares e outras hipóteses revogadas não são presumidas. No equiparado, conferir o alcance da vedação e a jurisprudência, sem inferir autorização. Permissão com escolta tem regras diferentes.",
          "LEP, arts. 120, 122 e 123; lei no tempo",
        ),
  );
  rules.push(
    rule(
      "Monitoração eletrônica",
      "condicionado",
      "Determinação judicial",
      "Não decorre automaticamente do nome do crime. A LEP prevê hipóteses como prisão domiciliar, regimes aberto/semiaberto, progressão, livramento e saída autorizada; a tornozeleira não afasta uma vedação de benefício. Deveres e consequências exigem análise própria.",
      "LEP, arts. 146-B e 146-C; art. 122, §1º",
    ),
  );
  return {
    crimeId,
    scope,
    classification,
    classificationLabel: hediondo
      ? "Hediondo"
      : equiparado
        ? "Equiparado a hediondo"
        : "Não hediondo nesta modalidade",
    classificationNote,
    rules,
    needsJudicialReading: target.slug === "armas" || target.slug === "drogas" || special,
  };
}

export function compatibleProgression(policy: CrimePolicy, categoryId: string): boolean {
  if (categoryId === "manual") return true;
  if (policy.classification === "desconhecido") return false;
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  if (special)
    return ["cp121", "cp121q"].includes(policy.crimeId)
      ? ["via", "viii"].includes(categoryId)
      : ["v", "vii"].includes(categoryId);
  const violent = ["cp121", "cp129", "cp147", "cp157", "cp158", "cp329"].includes(policy.crimeId);
  return violent ? ["i", "ii"].includes(categoryId) : ["base", "iii", "mae"].includes(categoryId);
}
export function compatibleParole(
  policy: CrimePolicy,
  profile: string,
  category: string,
  specificRecidivism: boolean,
): boolean {
  if (profile === "vedado") return true;
  if (policy.classification === "desconhecido") return false;
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  if (specificRecidivism && special) return false;
  if (["via", "vib", "vid", "viii"].includes(category)) return false;
  return special ? profile === "doistercos" : ["terco", "metade"].includes(profile);
}

export function policyForSentence(
  policy: CrimePolicy,
  days: number | null,
  violent: boolean,
  culpable: boolean,
): CrimePolicy {
  if (days === null || policy.classification === "desconhecido") return policy;
  return {
    ...policy,
    rules: policy.rules.map((r) => {
      if (r.title === "Livramento condicional" && days < 720)
        return rule(
          r.title,
          "vedado",
          "Requisito quantitativo não atendido",
          "A pena simulada é inferior a dois anos; o art. 83, caput, exige pena igual ou superior a dois anos.",
          "CP, art. 83, caput",
        );
      if (r.title === "Substituição" && !culpable && (days > 1440 || violent))
        return rule(
          r.title,
          "vedado",
          "Bloqueada neste exercício",
          violent
            ? "No perfil doloso com violência ou grave ameaça, o requisito objetivo do art. 44, I, não está atendido."
            : "A pena dolosa simulada supera quatro anos; o requisito objetivo do art. 44, I, não está atendido.",
          "CP, art. 44, I",
        );
      if (r.title === "Sursis" && r.state !== "vedado" && days > 1440)
        return rule(
          r.title,
          "vedado",
          "Limite de pena ultrapassado",
          "A pena simulada supera os limites de dois anos da regra e de quatro anos da hipótese etária/humanitária; não se indica sursis.",
          "CP, art. 77",
        );
      return r;
    }),
  };
}
