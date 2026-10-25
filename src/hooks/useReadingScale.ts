import { useCallback, useEffect, useState } from "react";
import {
  READING_SCALE_EVENT,
  applyReadingScale,
  normalizeReadingScale,
  readStoredReadingScale,
} from "@/lib/readingScale";

/** Tamanho do texto de leitura compartilhado por todos os controles da tela (sempre >= 100%). */
export function useReadingScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    setScale(readStoredReadingScale());
    const sync = (event: Event) =>
      setScale(normalizeReadingScale((event as CustomEvent<number>).detail));
    window.addEventListener(READING_SCALE_EVENT, sync);
    return () => window.removeEventListener(READING_SCALE_EVENT, sync);
  }, []);
  const change = useCallback((next: number) => setScale(applyReadingScale(next)), []);
  return { scale, change };
}
