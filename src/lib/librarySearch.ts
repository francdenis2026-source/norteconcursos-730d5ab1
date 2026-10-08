import { LEGAL_LIBRARY, materialLawSlug } from "./legalLibrary";
import type { StudyMaterialSummary } from "./studyMaterials";
export type LibrarySearchContent = {id:string;body_md:string;legal_basis?:{title?:string;url?:string}[]};
export const normalizeLibrarySearch = (text:string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bn[º°o.]?\s*(?=\d)/g,"").replace(/(\d)\.(?=\d)/g,"$1").replace(/[^a-z0-9]+/g," ").trim();
const aliases: Record<string,string> = {
 "codigo-penal":"CP", "codigo-processo-penal":"CPP código de processo penal", transito:"CTB código de trânsito brasileiro", eca:"ECA estatuto da criança e do adolescente", lep:"LEP", antifaccao:"15358 2026 lei Raul Jungmann antifaccao anti faccao", drogas:"lei de drogas", armas:"estatuto do desarmamento",
};
export function librarySearchText(item:StudyMaterialSummary,content?:LibrarySearchContent) {
 const law=materialLawSlug(item),entry=LEGAL_LIBRARY.find(e=>e.slug===law);
 const disciplineAliases=/raciocínio|raciocinio/i.test(item.discipline)?"RLM raciocínio lógico matemática":"";
 return normalizeLibrarySearch([item.title,item.discipline,disciplineAliases,item.topic_label,item.summary,item.contest_name,item.slug,entry?.title,entry?.group,law?aliases[law]:undefined,content?.body_md,...(content?.legal_basis??[]).map(s=>s.title)].filter(Boolean).join(" "));
}
export function matchesLibrarySearch(text:string,query:string) {
 const tokens=normalizeLibrarySearch(query).split(/\s+/).filter(Boolean);
 const words=text.split(/\s+/);
 return tokens.every(token=>token.length<=3?words.includes(token):text.includes(token));
}
