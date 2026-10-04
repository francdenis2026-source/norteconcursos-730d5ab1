"""Read-only structural/publication audit of local Supabase exports.

Usage: python audit_question_catalog.py EXPORT_DIRECTORY REPORT_JSON
The report contains IDs, statuses and findings, never question text or credentials.
This is a readiness audit, not a claim of individual legal/semantic approval.
"""
import collections
import datetime
import json
import pathlib
import re
import sys
import unicodedata
from urllib.parse import urlparse

OFFICIAL = re.compile(r"(?:^|\.)(?:planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br|"
                      r"tst\.jus\.br|tse\.jus\.br|ohchr\.org|unodc\.org|un\.org)$", re.I)
TABLES = ("official_exam_questions", "curated_question_catalog", "board_exam_questions")


def valid_basis(basis, checked, now):
    if not isinstance(basis, list) or not basis or not checked:
        return False
    try:
        date = datetime.datetime.fromisoformat(checked.replace("Z", "+00:00"))
        if date.tzinfo is None or date > now:
            return False
        return all(isinstance(b, dict) and urlparse(b.get("url", "")).scheme in ("http", "https")
                   and OFFICIAL.search(urlparse(b.get("url", "")).hostname or "")
                   for b in basis)
    except (ValueError, TypeError):
        return False


def findings(table, row, topics, editions, now):
    flags = []
    text = row.get("stem") if table == "board_exam_questions" else row.get("question_text")
    if not text or len(text.strip()) < 25:
        flags.append("incomplete_text")
    if text and "\ufffd" in text:
        flags.append("encoding_error")
    if text and re.search(r"TEXTO VERBATIM.*NÃO CONFIRMADO|enunciado não extraído", text, re.I):
        flags.append("unconfirmed_transcription")
    if row.get("context_review_required") or row.get("needs_visual"):
        flags.append("context_or_visual_pending")
    topic = topics.get(row.get("current_syllabus_topic_id") or row.get("syllabus_topic_id"))
    if not topic or topic.get("content_status") != "current" or editions.get(
            topic.get("edition_id"), {}).get("status") != "active":
        flags.append("current_syllabus_link_pending")
    answer = row.get("official_answer")
    if answer == "X":
        flags.append("annulled")
    elif answer not in ("A", "B", "C", "D", "E"):
        flags.append("invalid_answer")
    if table == "board_exam_questions":
        options = row.get("options")
        if not isinstance(options, dict) or sorted(options) not in [list("ABCD"), list("ABCDE")] or any(
                not isinstance(v, str) or not v.strip() for v in options.values()):
            flags.append("incomplete_options")
        elif answer != "X" and answer not in options:
            flags.append("answer_missing_in_options")
        if not row.get("source_url") or not row.get("answer_key_url"):
            flags.append("source_or_key_missing")
    else:
        if not (row.get("question_source_id") or row.get("source_id")):
            flags.append("source_missing")
    legal = row.get("legal_review_required") or re.search(r"direito|legisla", row.get("subject", ""), re.I)
    basis = row.get("legal_basis")
    if (legal or basis) and not valid_basis(basis, row.get("law_version_checked_at"), now):
        flags.append("official_legal_evidence_pending")
    if table == "official_exam_questions" and row.get("legal_review_required") and not row.get("legal_audit_completed"):
        flags.append("legal_audit_pending")
    return flags


def audit(directory, now=None):
    now = now or datetime.datetime.now(datetime.timezone.utc)
    directory = pathlib.Path(directory)
    read = lambda name: json.loads((directory / (name + ".json")).read_text(encoding="utf-8-sig"))
    topics = {r["id"]: r for r in read("syllabus_topics")}
    editions = {r["id"]: r for r in read("syllabus_editions")}
    items, duplicates = [], collections.defaultdict(list)
    for table in TABLES:
        for row in read(table):
            flags = findings(table, row, topics, editions, now)
            item = {"table": table, "id": row["id"], "status": row["content_status"], "findings": flags}
            items.append(item)
            text = ((row.get("support_text") or "") + " " + (row.get("stem") or "")) if table == "board_exam_questions" else row.get("question_text", "")
            normalized = re.sub(r"\W+", "", unicodedata.normalize("NFKC", text or "").lower())
            if len(normalized) > 40:
                duplicates[normalized].append((item, row.get("official_answer")))
    conflicts = 0
    for group in duplicates.values():
        if len(group) > 1 and len({answer for _, answer in group}) > 1:
            conflicts += 1
            for item, _ in group:
                item["findings"].append("duplicate_answer_conflict")
    return {"scope": "structural and publication readiness; individual legal/semantic approval is separate",
            "checked_at": now.isoformat(), "total": len(items), "conflict_groups": conflicts,
            "status_counts": dict(collections.Counter(r["status"] for r in items)),
            "finding_counts": dict(collections.Counter(f for r in items for f in r["findings"])), "items": items}


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python audit_question_catalog.py EXPORT_DIRECTORY REPORT_JSON")
    result = audit(sys.argv[1])
    pathlib.Path(sys.argv[2]).write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: v for k, v in result.items() if k != "items"}, ensure_ascii=False))
