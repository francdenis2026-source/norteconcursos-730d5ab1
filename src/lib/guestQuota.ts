// Controle de degustação para visitantes não cadastrados no Treinador de Questões.
//
// A "virada do dia" usa a data do fuso horário do Acre calculada pelo
// RELÓGIO DO SERVIDOR (função get_current_acre_date() no Postgres) — nunca
// o relógio do dispositivo do usuário. Assim, se o celular/computador de
// alguém estiver com a data errada, isso não muda quais questões aparecem
// nem deixa a pessoa "burlar" o limite diário mudando a hora do aparelho.
//
// Sem sessão Supabase não há user_id pra gravar no banco, então a CONTAGEM
// de quantas das 10 já foram respondidas ainda fica no localStorage do
// navegador (limite "de boa-fé": limpar dados do navegador reseta a
// contagem) — mas a chave usada é a data do servidor, não a do aparelho,
// e as 10 questões em si vêm de public.get_daily_guest_questions(), que
// já garante as MESMAS questões pra todo mundo no mesmo dia.

import { supabase } from "@/integrations/supabase/client";

export const GUEST_DAILY_LIMIT = 10;

const STORAGE_PREFIX = "norteconcurso:guest-quota:";

let cachedAcreDate: string | null = null;
let acreDatePromise: Promise<string> | null = null;

function deviceDateFallback(): string {
  // Só usado se a chamada ao servidor falhar (ex.: sem rede). Nesse caso
  // caímos de volta pro relógio do dispositivo, o que é uma degradação
  // aceitável, não o comportamento normal.
  return new Date().toISOString().slice(0, 10);
}

export async function getAcreDateKey(): Promise<string> {
  if (cachedAcreDate) return cachedAcreDate;
  if (!acreDatePromise) {
    acreDatePromise = supabase
      .rpc("get_current_acre_date")
      .then(({ data, error }) => {
        if (error || !data) throw error ?? new Error("sem data do servidor");
        cachedAcreDate = String(data);
        return cachedAcreDate;
      })
      .catch(() => {
        const fallback = deviceDateFallback();
        cachedAcreDate = fallback;
        return fallback;
      });
  }
  return acreDatePromise;
}

async function storageKey(): Promise<string> {
  return `${STORAGE_PREFIX}${await getAcreDateKey()}`;
}

export async function getGuestUsedToday(): Promise<number> {
  try {
    const raw = window.localStorage.getItem(await storageKey());
    const value = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

export async function getGuestRemainingToday(): Promise<number> {
  return Math.max(0, GUEST_DAILY_LIMIT - (await getGuestUsedToday()));
}

export async function registerGuestAnswer(): Promise<number> {
  try {
    const used = (await getGuestUsedToday()) + 1;
    window.localStorage.setItem(await storageKey(), String(used));
    return used;
  } catch {
    return getGuestUsedToday();
  }
}
