export type ExplanationReview = { status?: string; reviewed_by?: string | null; reviewed_at?: string | null; updated_at?: string; content_sha256?: string };

/** A later edit cannot inherit a prior editorial approval. Allow transport millisecond rounding only. */
export function hasCurrentExplanationReview(e: ExplanationReview, currentHash?: string): boolean {
  const reviewed = Date.parse(e.reviewed_at ?? ""), updated = Date.parse(e.updated_at ?? "");
  return e.status === "published" && !!e.reviewed_by && Number.isFinite(reviewed) && Number.isFinite(updated)
    && reviewed + 1000 >= updated && (!currentHash || e.content_sha256 === currentHash);
}
