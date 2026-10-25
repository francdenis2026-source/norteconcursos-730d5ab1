export type GuestSelectionItem = {
  day: string;
  position: number;
  question_id: string;
  content_key: string;
};
export type GuestCandidate = {
  id: string;
  key: string;
  subject: string;
  career: string;
  year: number;
  answer: string;
};

/** Fill only missing/ineligible positions. Never rotate a still-valid item out of a published day. */
export function planDailyGuestRepairs(
  day: string,
  history: GuestSelectionItem[],
  candidates: GuestCandidate[],
  days = 14,
) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isSafeInteger(days) || days < 1 || days > 31)
    throw new Error("Invalid repair range");
  const approved = new Map(candidates.map((q) => [q.id, q]));
  const usedIds = new Set(history.map((q) => q.question_id));
  const usedKeys = new Set(history.map((q) => q.content_key));
  const changes: GuestSelectionItem[] = [];
  const summary: { day: string; kept: number; replaced: number }[] = [];
  for (let offset = 0; offset < days; offset++) {
    // This is a schedule offset from the server's Acre day, never an inference of today's UTC date.
    const date = new Date(day + "T12:00:00Z");
    date.setUTCDate(date.getUTCDate() + offset);
    const target = date.toISOString().slice(0, 10);
    const existing = history.filter((q) => q.day === target);
    const kept = existing.filter(
      (item) => approved.get(item.question_id)?.key === item.content_key,
    );
    const positions = new Set(kept.map((q) => q.position));
    if (positions.size !== kept.length || kept.some((q) => q.position < 1 || q.position > 10))
      throw new Error("Invalid stored positions");
    const selected = kept.map((item) => approved.get(item.question_id)!);
    const occurrences = (field: "subject" | "career" | "answer", value: string) =>
      selected.filter((q) => q[field] === value).length;
    for (let position = 1; position <= 10; position++) {
      if (positions.has(position)) continue;
      const stock = candidates.filter((q) => !usedIds.has(q.id) && !usedKeys.has(q.key));
      stock.sort(
        (a, b) =>
          Number(b.year >= Number(target.slice(0, 4)) - 2) -
            Number(a.year >= Number(target.slice(0, 4)) - 2) ||
          occurrences("subject", a.subject) - occurrences("subject", b.subject) ||
          occurrences("career", a.career) - occurrences("career", b.career) ||
          occurrences("answer", a.answer) - occurrences("answer", b.answer) ||
          b.year - a.year ||
          a.id.localeCompare(b.id),
      );
      const chosen = stock[0];
      if (!chosen)
        throw new Error(
          `Insufficient reviewed, unseen stock for ${target}; no repair should be applied`,
        );
      changes.push({ day: target, position, question_id: chosen.id, content_key: chosen.key });
      selected.push(chosen);
      usedIds.add(chosen.id);
      usedKeys.add(chosen.key);
    }
    summary.push({ day: target, kept: kept.length, replaced: 10 - kept.length });
  }
  return { changes, summary };
}
