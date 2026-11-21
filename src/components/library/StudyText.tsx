/**
 * Texto de estudo sem grifos automáticos.
 *
 * Os realces lexicais anteriores transformavam números e expressões comuns
 * (por exemplo, "18 anos", "três anos" e "não é") em caixas coloridas,
 * inclusive dentro de exemplos cotidianos, sem que isso representasse
 * necessariamente uma regra ou ponto de prova. O conteúdo deve permanecer
 * visualmente neutro; a hierarquia didática é dada pelos títulos e blocos.
 */
export function useHighlightEnabled() {
  return false;
}

/** Mantido por compatibilidade com telas antigas; os grifos foram desativados globalmente. */
export function setHighlightEnabled(_value: boolean) {
  // Intencionalmente sem efeito: não voltar a aplicar grifos automáticos.
}

/** Renderiza o texto sem marcações ou retângulos sobre palavras. */
export function StudyText({ text }: { text: string }) {
  return <>{text}</>;
}

/** Compatibilidade com chamadas antigas: não exibe controle para um recurso desativado. */
export function HighlightToggle(_props: { legend?: boolean }) {
  return null;
}
