// Horário do Acre (America/Rio_Branco, UTC−5, sem horário de verão).
//
// Funções puras, sem rede: usadas como reserva quando o servidor não responde
// (a data "oficial" do desafio vem do relógio do banco — ver guestQuota.ts) e
// para a contagem regressiva exibida na página inicial. Nunca usar
// `toISOString()` para "o dia de hoje": isso é UTC e viraria o dia às 19h do Acre.

const ACRE_TZ = "America/Rio_Branco";

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
export function acreDateKey(now: Date = new Date()): string {
  return dateFmt.format(now);
}

/** Segundos que faltam para a próxima meia-noite do Acre (1…86400). */
export function secondsUntilAcreMidnight(now: Date = new Date()): number {
  const [h = 0, m = 0, s = 0] = timeFmt.format(now).split(":").map(Number);
  return 86400 - (((h % 24) * 60 + m) * 60 + s);
}

/** 3725 -> "01:02:05" */
export function formatCountdown(totalSeconds: number): string {
  const t = Math.min(86399, Math.max(0, Math.floor(totalSeconds)));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
}
