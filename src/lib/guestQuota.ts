// Controle de degustação para visitantes não cadastrados (Desafio diário).
//
// REGRA (não pular, em nenhum dispositivo): todo dia, à meia-noite do horário
// do Acre (America/Rio_Branco, UTC−5), as 10 questões grátis são renovadas
// para quem não quer se cadastrar.
//
// A "virada do dia" usa a data do fuso horário do Acre calculada pelo
// RELÓGIO DO SERVIDOR (função get_current_acre_date() no Postgres) — nunca
// o relógio do dispositivo do usuário. Assim, se o celular/computador de
// alguém estiver com a data errada, isso não muda quais questões aparecem
// nem deixa a pessoa "burlar" o limite diário mudando a hora do aparelho.
//
// Se o servidor não responder, a reserva é o horário do Acre calculado no
// aparelho (acreDateKey) — e NUNCA a data UTC, que viraria o dia às 19h do Acre.
//
// A data do servidor é reconferida a cada 60 s: quem deixa a aba aberta
// passando da meia-noite recebe a renovação sem precisar recarregar.
//
// Sem sessão Supabase não há user_id pra gravar no banco, então a CONTAGEM
// de quantas das 10 já foram respondidas fica no localStorage do navegador
// (limite "de boa-fé": limpar dados do navegador reseta a contagem; cada
// aparelho tem a sua própria cota) — mas a chave usada é a data do Acre, e
// as 10 questões em si vêm de public.get_daily_guest_questions(), que já
// garante as MESMAS questões pra todo mundo no mesmo dia.

import { supabase } from "@/integrations/supabase/client";
import { acreDateKey } from "@/lib/acreTime";

export const GUEST_DAILY_LIMIT = 10;

const STORAGE_PREFIX = "norteconcurso:guest-quota:";
const DATE_TTL_MS = 60_000;
const WATCH_INTERVAL_MS = 30_000;

let cached: { date: string; at: number } | null = null;
let inflight: Promise<string> | null = null;

/** Data do Acre (AAAA-MM-DD). `force` ignora o cache de 60 s. */
export async function getAcreDateKey(force = false): Promise<string> {
  if (!force && cached && Date.now() - cached.at < DATE_TTL_MS) return cached.date;
  if (!inflight) {
    inflight = Promise.resolve(supabase.rpc("get_current_acre_date"))
      .then(({ data, error }) => {
        if (error || !data) throw error ?? new Error("sem data do servidor");
        return String(data);
      })
      // Sem rede: horário do Acre calculado no aparelho (nunca UTC).
      .catch(() => acreDateKey())
      .then((date) => {
        cached = { date, at: Date.now() };
        return date;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/**
 * Avisa quando o dia do Acre muda (a cota renova). Confere ao abrir, a cada
 * 30 s e quando a aba volta a ficar visível. Retorna a função de cancelamento.
 */
export function onAcreDayChange(callback: () => void): () => void {
  let last: string | null = null;
  let stopped = false;
  const check = async () => {
    const date = await getAcreDateKey();
    if (stopped) return;
    if (last !== null && date !== last) callback();
    last = date;
  };
  void check();
  const timer = window.setInterval(() => void check(), WATCH_INTERVAL_MS);
  const onVisible = () => {
    if (document.visibilityState === "visible") void check();
  };
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    stopped = true;
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
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
