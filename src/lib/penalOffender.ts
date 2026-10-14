import type { CrimePolicy } from "./penalPolicy";

export type OffenderProfile = {
  kind: "primary" | "recurrent";
  previousIntent: "unknown" | "intentional" | "culpable";
  specificSpecial: boolean;
  record: "unknown" | "good" | "bad";
};
export const INITIAL_OFFENDER: OffenderProfile = {
  kind: "primary",
  previousIntent: "unknown",
  specificSpecial: false,
  record: "unknown",
};
export const offenderLabel = (p: OffenderProfile) =>
  p.kind === "primary"
    ? "Primário"
    : p.specificSpecial
      ? "Reincidente específico em hediondo/equiparado"
      : "Reincidente";

export function recommendedProgression(
  policy: CrimePolicy,
  profile: OffenderProfile,
): { id: string; note: string } {
  if (policy.classification === "desconhecido")
    return {
      id: "manual",
      note: "Identifique a modalidade e a lei aplicável para informar a fração.",
    };
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  if (special) {
    const death = ["cp121", "cp121q"].includes(policy.crimeId);
    if (profile.kind === "primary")
      return {
        id: death ? "via" : "v",
        note: "Perfil primário no recorte cadastrado. Confira a lei no tempo antes de confirmar o cálculo.",
      };
    if (profile.specificSpecial)
      return {
        id: death ? "viii" : "vii",
        note: "Reincidência específica informada para o perfil hediondo/equiparado; confira o enquadramento e a lei no tempo.",
      };
    return {
      id: "manual",
      note: "Reincidência genérica em hediondo/equiparado exige análise da hipótese, da lei no tempo e da jurisprudência. Não se atribui automaticamente a fração do primário nem a do reincidente específico.",
    };
  }
  const violent = ["cp121", "cp129", "cp147", "cp157", "cp158", "cp329"].includes(policy.crimeId);
  return {
    id: profile.kind === "primary" ? (violent ? "i" : "base") : violent ? "ii" : "iii",
    note: "Perfil comum conforme violência/grave ameaça e reincidência. A fração usa o catálogo revisado, sem dispensar a conferência temporal.",
  };
}

export function recommendedParole(
  policy: CrimePolicy,
  profile: OffenderProfile,
  category: string,
): { id: string; note: string } {
  if (policy.classification === "desconhecido")
    return { id: "vedado", note: "Sem enquadramento suficiente: livramento não calculado." };
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  if (special) {
    if (profile.specificSpecial || ["via", "viii"].includes(category))
      return {
        id: "vedado",
        note: "O perfil informado encontra vedação no recorte aplicável. Confira CP, art. 83, V, e LEP, art. 112.",
      };
    return {
      id: "doistercos",
      note: "Fração especial: não usar a regra comum. Permanecem os demais requisitos e eventuais vedações.",
    };
  }
  if (profile.kind === "recurrent" && profile.previousIntent === "intentional")
    return {
      id: "metade",
      note: "Reincidência em crime doloso informada: mais da metade (CP, art. 83, II).",
    };
  if (profile.kind === "recurrent" && profile.previousIntent === "unknown")
    return {
      id: "vedado",
      note: "Informe a natureza da condenação anterior antes de escolher a regra de livramento.",
    };
  if (profile.record === "good")
    return {
      id: "terco",
      note: "Não reincidente em crime doloso e bons antecedentes informados: mais de um terço (CP, art. 83, I).",
    };
  return {
    id: "vedado",
    note: "A primariedade sozinha não confirma bons antecedentes. Informe os dados; hipóteses residuais exigem análise jurídica própria.",
  };
}

export function offenderCategoryCompatible(
  policy: CrimePolicy,
  profile: OffenderProfile,
  id: string,
): boolean {
  if (id === "manual") return true;
  if (id === "mae")
    return (
      profile.kind === "primary" &&
      policy.classification === "comum" &&
      !["cp121", "cp129", "cp147", "cp157", "cp158", "cp329"].includes(policy.crimeId)
    );
  return recommendedProgression(policy, profile).id === id;
}

export function policyForOffender(policy: CrimePolicy, profile: OffenderProfile): CrimePolicy {
  const progression = recommendedProgression(policy, profile);
  const parole = recommendedParole(policy, profile, progression.id);
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  return {
    ...policy,
    rules: policy.rules.map((r) => {
      if (
        r.title === "Progressão" &&
        special &&
        profile.kind === "recurrent" &&
        !profile.specificSpecial
      )
        return {
          ...r,
          state: "nao-avaliado" as const,
          label: "Fração exige análise própria",
          explanation: progression.note,
        };
      if (r.title === "Livramento condicional" && r.state !== "vedado" && parole.id === "vedado") {
        const barred =
          special && (profile.specificSpecial || ["via", "viii"].includes(progression.id));
        return {
          ...r,
          state: barred ? ("vedado" as const) : ("nao-avaliado" as const),
          label: barred ? "Vedado no perfil selecionado" : "Dados insuficientes",
          explanation: parole.note,
        };
      }
      return r;
    }),
  };
}
