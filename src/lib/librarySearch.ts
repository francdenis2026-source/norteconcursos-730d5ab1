import { LEGAL_LIBRARY, materialLawSlug, officialLawIdentity } from "./legalLibrary";
import type { StudyMaterialSummary } from "./studyMaterials";
export type LibrarySearchContent = {id:string;body_md:string;legal_basis?:{title?:string;url?:string}[]};
export const normalizeLibrarySearch = (text:string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bn[º°o.]?\s*(?=\d)/g,"").replace(/(\d)\.(?=\d)/g,"$1").replace(/[^a-z0-9]+/g," ").trim();
const aliases: Record<string,string> = {
 ric:"RIC registro de identidade civil", "menor-potencial-ofensivo":"instrumentos de menor potencial ofensivo uso da força", "uso-forca":"uso diferenciado da força",
 "codigo-penal":"CP", "codigo-processo-penal":"CPP código de processo penal", transito:"CTB código de trânsito brasileiro", eca:"ECA estatuto da criança e do adolescente", lep:"LEP", antifaccao:"15358 2026 lei Raul Jungmann antifaccao anti faccao", drogas:"lei de drogas", armas:"estatuto do desarmamento",
};
export function libraryLawResultTitle(slug:string): string {
 const entry=LEGAL_LIBRARY.find(law=>law.slug===slug);
 const named:Record<string,string>={
  'codigo-penal':'CP · Código Penal — Decreto-Lei 2.848',
  'codigo-processo-penal':'CPP · Código de Processo Penal — Decreto-Lei 3.689',
  antifaccao:'Lei 15.358/2026 — Lei Antifacção (Raul Jungmann)',
 };
 const prefix:Record<string,string>={transito:'CTB',eca:'ECA',lep:'LEP',cin:'CIN',icn:'ICN'};
 return named[slug]??(entry?`${prefix[slug]?prefix[slug]+' · ':''}${entry.title}`:slug);
}
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

/** Only a law's own identity, never a mention inside another guide. */
export function matchingLibraryLaws(query:string): string[] {
 const meaningful=normalizeLibrarySearch(query).split(/\s+/).filter(token=>token&&!['lei','leis','codigo','de','da','do','das','dos','n','no','numero','estatuto','brasileiro'].includes(token));
 if(!meaningful.length||meaningful.every(token=>/^\d{4}$/.test(token)&&Number(token)>=1900&&Number(token)<=2100))return [];
 return LEGAL_LIBRARY.filter(entry=>{
  const identity=officialLawIdentity(entry.source_url)?.split(':').pop()??'';
  const metadata=normalizeLibrarySearch(`${libraryLawResultTitle(entry.slug)} ${aliases[entry.slug]??''} ${identity}`);
  return meaningful.every(token=>/^\d+$/.test(token)
    ? metadata.split(' ').includes(token)||(token.length>=4&&identity.startsWith(token))
    : matchesLibrarySearch(metadata,token));
 }).map(entry=>entry.slug);
}

export function libraryMatchParts(text:string,query:string): {text:string;match:boolean}[] {
 const mapped:{start:number;end:number}[]=[];
 let normalized='',offset=0;
 for(const char of text){
  const start=offset;offset+=char.length;
  if(char==='.'&&/\d/.test(text[start-1]??'')&&/\d/.test(text[offset]??''))continue;
  const plain=char.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(!plain){if(mapped.length)mapped[mapped.length-1]!.end=offset;continue;}
  for(const value of plain){normalized+=/[a-z0-9]/.test(value)?value:' ';mapped.push({start,end:offset});}
 }
 const ranges:{start:number;end:number}[]=[];
 for(const token of new Set(normalizeLibrarySearch(query).split(/\s+/).filter(Boolean))){
  for(let from=0;;){
   const index=normalized.indexOf(token,from);if(index<0)break;from=index+token.length;
   if(token.length<=3&&(/[a-z0-9]/.test(normalized[index-1]??'')||/[a-z0-9]/.test(normalized[from]??'')))continue;
   ranges.push({start:mapped[index]!.start,end:mapped[from-1]!.end});
  }
 }
 ranges.sort((a,b)=>a.start-b.start||b.end-a.end);
 const merged:typeof ranges=[];
 for(const range of ranges){const previous=merged.at(-1);if(previous&&range.start<=previous.end)previous.end=Math.max(previous.end,range.end);else merged.push({...range});}
 const parts:{text:string;match:boolean}[]=[];let end=0;
 for(const range of merged){if(range.start>end)parts.push({text:text.slice(end,range.start),match:false});parts.push({text:text.slice(range.start,range.end),match:true});end=range.end;}
 if(end<text.length)parts.push({text:text.slice(end),match:false});
 return parts;
}
