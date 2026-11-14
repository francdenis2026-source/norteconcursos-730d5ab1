/**
 * Identificação da prova exibida ao aluno: órgão e ano, sem o nome da banca organizadora.
 * A banca continua registrada nos dados (filtros, perfil das bancas e análises); só não aparece
 * como rótulo da questão na tela.
 */
export function examOriginLabel(q: { contest?: string | null; year?: number | string | null }): string {
  const contest = (q.contest ?? "").trim();
  const year = q.year === null || q.year === undefined ? "" : String(q.year).trim();
  if (!contest && !year) return "Prova";
  return [contest ? `Prova de ${contest}` : "Prova", year].filter(Boolean).join(" · ");
}
