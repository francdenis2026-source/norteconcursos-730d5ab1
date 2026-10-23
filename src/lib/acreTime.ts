import { platformDate } from "./platformClock";
// Horário do Acre (America/Rio_Branco, UTC−5, sem horário de verão).
//
// Funções puras, sem rede: usadas como reserva quando o servidor não responde
// (a data "oficial" do desafio vem do relógio do banco — ver guestQuota.ts) e
// para a contagem regressiva exibida na página inicial. Nunca usar
// `toISOString()` para "o dia de hoje": isso é UTC e viraria o dia às 19h do Acre.

export const ACRE_TZ = "America/Rio_Branco";

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: ACRE_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: ACRE_TZ,
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Data do Acre no formato AAAA-MM-DD (mesmo formato de get_current_acre_date()). */
export function acreDateKey(now: Date = platformDate()): string {
  return dateFmt.format(now);
}

/** Segundos que faltam para a próxima meia-noite do Acre (1…86400). */
export function secondsUntilAcreMidnight(now: Date = platformDate()): number {
  const [h = 0, m = 0, s = 0] = timeFmt.format(now).split(":").map(Number);
  return 86400 - (((h % 24) * 60 + m) * 60 + s);
}

/** Instante UTC (ISO) em que começou o dia de hoje no Acre — para filtrar "desde hoje" no banco. */
export function acreDayStartISO(now: Date = platformDate()): string {
  return `${acreDateKey(now)}T05:00:00.000Z`;
}

/** Início e fim (exclusivo), em UTC ISO, de um dia civil do Acre (AAAA-MM-DD) — para filtrar "nesse dia" no banco. */
export function acreDayRangeISO(dayKey: string): [string, string] {
  const start = `${dayKey}T05:00:00.000Z`;
  const end = new Date(new Date(start).getTime() + 86_400_000).toISOString();
  return [start, end];
}

/** 3725 -> "01:02:05" */
export function formatCountdown(totalSeconds: number): string {
  const t = Math.min(86399, Math.max(0, Math.floor(totalSeconds)));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
}

/** Civil dates retain their calendar day; timestamps are rendered in Acre by callers. */
export function acreDate(value?: string | number | Date): Date {
  if (value === undefined) return platformDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T12:00:00-05:00`);
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/.test(value)) return new Date(`${value}-05:00`);
  }
  return new Date(value);
}
export function acreHour(now: Date = platformDate()): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: ACRE_TZ, hour: "2-digit", hourCycle: "h23" }).format(now));
}

export function acreDaysAgoKey(days: number, now: Date = platformDate()): string {
  return acreDateKey(new Date(now.getTime() - days * 86_400_000));
}
