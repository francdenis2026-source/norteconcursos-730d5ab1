/** Only link subjects with genuine curricular overlap; never equate Direito Administrativo with Administração Geral. */
export type PcAcStudyResource = {courseId:"arquivologia"|"administracao-geral"|"administracao-publica";label:string;subject:string;contestNote:string};
const RESOURCES: PcAcStudyResource[] = [
 {courseId:"arquivologia",label:"Arquivologia · 16 aulas",subject:"Arquivologia",contestNote:"Oficial Investigador; Noções de Arquivologia para Papiloscopista"},
 {courseId:"administracao-geral",label:"Noções de Administração · 15 aulas",subject:"Noções de Administração",contestNote:"Oficial Investigador"},
 {courseId:"administracao-publica",label:"Administração Pública · 6 aulas",subject:"Administração Pública",contestNote:"Aprofundamento; verificar pertinência no edital"},
];
export const pcAcStudyResources = RESOURCES;
export const pcAcStudyResourceUrl=(courseId:PcAcStudyResource["courseId"])=>
  `/dashboard/library?collection=subjects&guia=${courseId}#materiais-atualizados-pcac`;
export function findPcAcStudyResource(subject:string|undefined|null):PcAcStudyResource|undefined {
 const norm=(subject??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
 if(!norm) return undefined;
 if(/arquivologia|gestao documental|protocolo documental|documentos arquivisticos/.test(norm)) return RESOURCES[0];
 if(/^(nocoes de )?administracao( geral)?$/.test(norm)||/gestao de materiais|administracao de materiais/.test(norm)) return RESOURCES[1];
 if(/^(evolucao da )?administracao publica$/.test(norm)) return RESOURCES[2];
 return undefined;
}
