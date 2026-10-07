export type ReviewRating = "again" | "hard" | "good" | "easy";
export type LegalProgress = {
  unit_id: string;
  read_at: string | null;
  recall_attempts: number;
  review_step: number;
  last_rating: ReviewRating | null;
  notes: string;
  due_at: string | null;
};

/** Reading, self-assessed retrieval, and objective exam questions are distinct. */
export function legalProgressSummary(unitIds: string[], rows: LegalProgress[], now = Date.now()) {
  const selected = rows.filter(row => unitIds.includes(row.unit_id));
  return {
    read: selected.filter(row => row.read_at).length,
    practiced: selected.filter(row => row.recall_attempts > 0).length,
    difficult: selected.filter(row => row.last_rating === "again" || row.last_rating === "hard").length,
    due: selected.filter(row => row.due_at && Date.parse(row.due_at) <= now).length,
    // Opening a page and confidence alone are not proof of exam readiness.
    repeated: selected.filter(row => row.review_step >= 3).length,
  };
}

export function selectNextLegalUnit<T extends { id: string; content_status: string }>(units: T[], rows: LegalProgress[], now = Date.now()): T | undefined {
  const current = units.filter(unit => unit.content_status === "current");
  const byId = new Map(rows.map(row => [row.unit_id, row]));
  const due = current.filter(unit => {
    const row = byId.get(unit.id);
    return row?.due_at && Date.parse(row.due_at) <= now;
  }).sort((a, b) => Date.parse(byId.get(a.id)!.due_at!) - Date.parse(byId.get(b.id)!.due_at!));
  return due[0] ?? current.find(unit => !byId.get(unit.id)?.read_at) ?? current.find(unit => !byId.get(unit.id)?.recall_attempts);
}
