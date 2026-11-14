import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";
import type { IncidenceItem } from "@/lib/topicIncidence";

/** Assuntos do edital da PC-AC (todos os cargos, sem repetir) que podem receber a indicação de chance. */
export const PCAC_INCIDENCE_ITEMS: IncidenceItem[] = (() => {
  const byId = new Map<string, IncidenceItem>();
  for (const cargo of pcAcVerticalCargos)
    for (const block of cargo.blocks)
      for (const discipline of block.disciplines) {
        const subjects = pcAcDisciplineLink(discipline.id)?.subjects;
        if (!subjects?.length) continue;
        pcAcVerticalTopicGroups(discipline).forEach((group, index) => {
          const id = `${discipline.id}:${index}`;
          if (!byId.has(id)) byId.set(id, { id, subjects, text: [group.title, ...group.subtopics].join(" ") });
        });
      }
  return [...byId.values()];
})();
