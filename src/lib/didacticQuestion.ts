import type { Question } from "./questionFormat";
export type DidacticProvenance = {
  origin: "didactic_material";
  documentName: string;
  documentTitle?: string;
  publisher: string;
  documentSha256: string;
  page: number | null;
  itemNumber: number;
  materialSlug: string;
  reviewedAt: string;
  adapted: boolean;
};
export function parseDidacticProvenance(value: unknown): DidacticProvenance | undefined {
  if (!value || typeof value !== "object") return undefined;
  const p = value as DidacticProvenance;
  return p.origin === "didactic_material" &&
    typeof p.documentName === "string" &&
    p.documentName.length > 0 &&
    typeof p.publisher === "string" &&
    /^[a-f0-9]{64}$/i.test(p.documentSha256 ?? "") &&
    Number.isInteger(p.itemNumber) &&
    p.itemNumber > 0 &&
    typeof p.materialSlug === "string" &&
    (p.documentTitle === undefined || typeof p.documentTitle === "string") &&
    (p.page === null || (Number.isInteger(p.page) && p.page > 0)) &&
    typeof p.adapted === "boolean" &&
    Number.isFinite(Date.parse(p.reviewedAt))
    ? p
    : undefined;
}
/** Display/filter origin is independent of the stable scoring source and physical table. */
export function questionDisplayOrigin(q: Pick<Question, "source" | "didacticProvenance">) {
  return q.source === "curated" && parseDidacticProvenance(q.didacticProvenance)
    ? "didactic"
    : q.source;
}
