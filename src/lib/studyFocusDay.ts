// Registro diário de ciclos de foco (dia do horário do Acre), usado pela Sala de estudo.
import { acreDateKey } from "@/lib/acreTime";
import { userStorageKey } from "@/lib/userStorage";

export const DAY_KEY = "norte_focus_day";
export interface FocusDay {
  day: string;
  cycles: number;
  minutes: number;
}
export function readFocusDay(): FocusDay {
  const fresh = { day: acreDateKey(), cycles: 0, minutes: 0 };
  try {
    const v = JSON.parse(localStorage.getItem(userStorageKey(DAY_KEY)) ?? "null") as FocusDay | null;
    return v && v.day === fresh.day ? v : fresh;
  } catch {
    return fresh;
  }
}
/** Soma um ciclo concluído ao registro do dia (horário do Acre) e devolve o novo registro. */
export function recordFocusCycle(minutes: number): FocusDay {
  const current = readFocusDay();
  const next = { ...current, cycles: current.cycles + 1, minutes: current.minutes + minutes };
  try {
    localStorage.setItem(userStorageKey(DAY_KEY), JSON.stringify(next));
  } catch {
    /* armazenamento indisponível */
  }
  return next;
}
