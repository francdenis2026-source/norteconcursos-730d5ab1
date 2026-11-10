/** Specific, auditable official source allowlist for PC-AC study guides.
 * Prevents a permissive *.gov.br trust rule for every legal course on the platform.
 */
export const PCAC_OFFICIAL_EDITAL = "https://agencia.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf";
export const DASP_1938_CAMARA = "https://www2.camara.leg.br/legin/fed/declei/1930-1939/decreto-lei-579-30-julho-1938-350919-norma-pe.html";
export function isPcAcOfficialStudySource(value:string|undefined):boolean {
 if(!value)return false;
 try {
  const url=new URL(value);
  if(url.protocol!=="https:"||url.username||url.password||url.port)return false;
  if(url.hostname==="agencia.ac.gov.br")return url.pathname==="/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"&&!url.search;
  if(url.hostname==="www2.camara.leg.br")return url.pathname==="/legin/fed/declei/1930-1939/decreto-lei-579-30-julho-1938-350919-norma-pe.html"&&!url.search;
  if(url.hostname==="pc.ac.gov.br")return url.pathname==="/governo-do-acre-lanca-edital-de-concurso-da-policia-civil-com-139-vagas/"&&!url.search;
  if(url.hostname==="www.gov.br"){
    return [
      "/conarq/pt-br/legislacao-arquivistica/resolucoes-do-conarq/",
      "/conarq/pt-br/centrais-de-conteudo/publicacoes/",
      "/conarq/pt-br/legislacao-arquivistica/portarias-federais/",
      "/arquivonacional/pt-br/servicos/gestao-de-documentos/",
      "/arquivonacional/pt-br/servicos/publicacoes/",
      "/arquivonacional/pt-br/siga/politica-de-gestao-de-documentos-e-arquivos/legislacao/",
      "/gestao/pt-br/assuntos/"
    ].some(prefix=>url.pathname.startsWith(prefix))&&!url.search;
  }
  if(url.hostname==="www.planalto.gov.br"||url.hostname==="planalto.gov.br")return url.pathname.startsWith("/ccivil_03/")&&!url.search;
  return false;
 }catch{return false;}
}
