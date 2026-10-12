import meta from "@/data/videoMeta.json";
import { LAW_CHRONOLOGY } from "@/lib/legalChronology";
import { CURATED_LEGAL_UPDATES, type CuratedLegalUpdate } from "@/lib/legalUpdates";

type Meta = Record<string, { d: string | null; e: boolean | null; s: string | null } | undefined>;
const META = meta as Meta;

/** Data de publicação (AAAA-MM-DD) lida do YouTube, quando conhecida. */
export const videoDate = (id: string): string | null => META[id]?.d ?? null;

/** "25/03/2026" → data exata; "2025" ou "Setembro de 2024" → só o ano (comparado por ano, sem alarme falso). */
function changeWhen(since: string): { date: Date; exact: boolean } | null {
  const full = since.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (full) return { date: new Date(Date.UTC(+full[3]!, +full[2]! - 1, +full[1]!)), exact: true };
  const year = since.match(/\b(20\d{2}|19\d{2})\b/);
  return year ? { date: new Date(Date.UTC(+year[1]!, 0, 1)), exact: false } : null;
}

export type VideoNotice = {
  published: string;
  /** Alterações da lei posteriores ao vídeo, com o que mudou. */
  changes: CuratedLegalUpdate[];
  /** Data do último ato oficial que alterou a lei, se for posterior ao vídeo. */
  lastAmendment: { date: string; url: string } | null;
  old: boolean;
};

/** Avisa quando a lei mudou depois da publicação do vídeo (ou quando o vídeo é muito antigo). */
export function videoNotice(id: string, law: { slug: string; materialSlug?: string | undefined }): VideoNotice | null {
  const published = videoDate(id);
  if (!published) return null;
  const pub = new Date(`${published}T00:00:00Z`);
  const changes = (CURATED_LEGAL_UPDATES[law.materialSlug ?? ""] ?? []).filter((u) => {
    const w = changeWhen(u.since);
    return w ? (w.exact ? w.date > pub : w.date.getUTCFullYear() > pub.getUTCFullYear()) : false;
  });
  const chron = LAW_CHRONOLOGY[law.slug];
  const lastAmendment = chron && chron.kind === "amendment" && new Date(`${chron.date}T00:00:00Z`) > pub ? { date: chron.date, url: chron.source_url } : null;
  const old = Date.now() - pub.getTime() > 4 * 365 * 24 * 3600 * 1000;
  return changes.length || lastAmendment || old ? { published, changes, lastAmendment, old } : null;
}

export const fmtMonthYear = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" }).replace(".", "");
export const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", { timeZone: "UTC" });
