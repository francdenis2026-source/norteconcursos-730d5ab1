import { canonicalSubject } from "./subjects";
import { libraryCollection } from "./libraryOrganization";
import type { StudyMaterialSummary } from "./studyMaterials";

/** Use actual published materials, keeping disciplines and ENEM contexts separate. */
export function reinforcementMaterials(subject: string, materials: StudyMaterialSummary[]) {
  const discipline = canonicalSubject(subject);
  const seen = new Set<string>();
  return materials
    .filter(
      (material) =>
        material.content_status === "active" &&
        !!material.slug &&
        canonicalSubject(material.discipline) === discipline &&
        libraryCollection(material) !== "enem",
    )
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title, "pt-BR"))
    .filter((material) => {
      if (seen.has(material.slug)) return false;
      seen.add(material.slug);
      return true;
    });
}
