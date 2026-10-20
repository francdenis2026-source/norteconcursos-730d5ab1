// Tamanho do texto de leitura (questões, simulados, materiais). Só aumenta: 100% é o tamanho padrão
// e nunca fica abaixo dele. Afeta o texto, não a estrutura (colunas, cartões e botões mantêm a largura).
export const READING_SCALE_KEY = "norte:reading-scale";
export const READING_SCALES = [1, 1.15, 1.3, 1.5, 1.75, 2] as const;
export const DEFAULT_READING_SCALE = 1;
export const READING_SCALE_EVENT = "norte:reading-scale-changed";

/** Aceita só os degraus oferecidos; qualquer outro valor (adulterado, antigo ou < 1) vira o padrão. */
export function normalizeReadingScale(value: unknown): number {
  const n = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  if (!Number.isFinite(n)) return DEFAULT_READING_SCALE;
  return READING_SCALES.find((step) => Math.abs(step - n) < 0.001) ?? DEFAULT_READING_SCALE;
}

/** Degrau vizinho (direction 1 = maior, -1 = menor), sem sair de [100%, 200%]. */
export function stepReadingScale(current: number, direction: 1 | -1): number {
  const index = READING_SCALES.findIndex((step) => step === normalizeReadingScale(current));
  const next = Math.min(READING_SCALES.length - 1, Math.max(0, index + direction));
  return READING_SCALES[next] ?? DEFAULT_READING_SCALE;
}

export const readingScalePercent = (scale: number) => `${Math.round(normalizeReadingScale(scale) * 100)}%`;

export function readStoredReadingScale(): number {
  try {
    return normalizeReadingScale(localStorage.getItem(READING_SCALE_KEY));
  } catch {
    return DEFAULT_READING_SCALE;
  }
}

/** Aplica no documento (variável CSS + marcador) e guarda a preferência neste aparelho. */
export function applyReadingScale(scale: number, persist = true) {
  const value = normalizeReadingScale(scale);
  const root = document.documentElement;
  if (value === DEFAULT_READING_SCALE) {
    root.removeAttribute("data-read-scale");
    root.style.removeProperty("--read-scale");
  } else {
    root.setAttribute("data-read-scale", String(value));
    root.style.setProperty("--read-scale", String(value));
  }
  if (persist) {
    try {
      if (value === DEFAULT_READING_SCALE) localStorage.removeItem(READING_SCALE_KEY);
      else localStorage.setItem(READING_SCALE_KEY, String(value));
    } catch {
      /* Sem armazenamento: vale só nesta sessão. */
    }
  }
  window.dispatchEvent(new CustomEvent(READING_SCALE_EVENT, { detail: value }));
  return value;
}

/** Roda no <head> antes da pintura, para o texto já nascer no tamanho escolhido (sem "pulo"). */
export const READING_SCALE_INIT_SCRIPT = `(function(){try{var v=parseFloat(localStorage.getItem('${READING_SCALE_KEY}'));var ok=[${READING_SCALES.join(",")}];if(ok.indexOf(v)>0){var r=document.documentElement;r.setAttribute('data-read-scale',String(v));r.style.setProperty('--read-scale',String(v));}}catch(e){}})();`;

/** Telas de leitura longa que usam o botão flutuante (questões e simulados têm o controle junto do enunciado). */
const READING_PREFIXES = [
  "/dashboard/library",
  "/dashboard/legal-course",
  "/dashboard/errors",
  "/dashboard/question-bank",
  "/dashboard/edital",
  "/dashboard/student-exams",
  "/dashboard/flashcards",
  "/dashboard/essays",
  "/dashboard/study-room",
  "/dashboard/trilhas",
  "/dashboard/dicionario",
  "/dashboard/ctb",
  "/dashboard/notebooks",
];
export const showsReadingControl = (pathname: string) =>
  READING_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
