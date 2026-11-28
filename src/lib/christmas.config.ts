/**
 * Janela de exibição do tema de Natal na homepage: ativo de 1º de dezembro a 6 de janeiro
 * (horário local do visitante). Depois dessa data o banner e os enfeites somem por conta própria,
 * sem precisar de novo deploy.
 */
export function isChristmasSeason(now = new Date()): boolean {
  const month = now.getMonth(); // 0 = janeiro, 11 = dezembro
  const day = now.getDate();
  if (month === 11) return true; // dezembro inteiro
  if (month === 0 && day <= 6) return true; // até 6 de janeiro
  return false;
}
