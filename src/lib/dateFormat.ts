export const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
export const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];
export const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
export const parse = (v: string) => {
  const [y, m, d] = v.split("-").map(Number);
  return y && m && d ? { y, m: m - 1, d } : null;
};
export const todayIso = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Rio_Branco" }).format(new Date());

export function formatDateBR(v: string) {
  const p = parse(v);
  return p ? `${String(p.d).padStart(2, "0")} de ${MONTHS[p.m]} de ${p.y}` : "";
}
