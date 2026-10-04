import datetime
import unittest
from audit_question_catalog import findings, valid_basis

NOW = datetime.datetime(2026, 10, 4, tzinfo=datetime.timezone.utc)
TOPICS = {"t": {"id": "t", "edition_id": "ed", "content_status": "current"}}
EDITIONS = {"ed": {"status": "active"}}


class CatalogAuditTest(unittest.TestCase):
    def row(self):
        return {"stem": "Assinale a alternativa correta neste exemplo.", "syllabus_topic_id": "t",
                "official_answer": "D", "subject": "Língua Portuguesa", "options": dict.fromkeys("ABCD", "Resposta"),
                "source_url": "https://conhecimento.fgv.br/prova", "answer_key_url": "https://conhecimento.fgv.br/gabarito"}

    def test_four_option_exam_is_complete(self):
        self.assertEqual(findings("board_exam_questions", self.row(), TOPICS, EDITIONS, NOW), [])

    def test_missing_option_or_answer(self):
        row = self.row()
        row["options"]["C"] = ""
        self.assertIn("incomplete_options", findings("board_exam_questions", row, TOPICS, EDITIONS, NOW))
        row = self.row()
        row["official_answer"] = "E"
        self.assertIn("answer_missing_in_options", findings("board_exam_questions", row, TOPICS, EDITIONS, NOW))

    def test_normative_item_cannot_use_empty_or_malformed_basis(self):
        row = self.row()
        row["legal_review_required"] = True
        row["legal_basis"] = {"url": "https://www.planalto.gov.br/lei"}
        row["law_version_checked_at"] = "2026-10-03T00:00:00+00:00"
        self.assertIn("official_legal_evidence_pending", findings("board_exam_questions", row, TOPICS, EDITIONS, NOW))
        row["legal_basis"] = []
        self.assertIn("official_legal_evidence_pending", findings("board_exam_questions", row, TOPICS, EDITIONS, NOW))

    def test_current_topic_and_context_are_independent_requirements(self):
        row = self.row()
        row["needs_visual"] = True
        topics = {"t": {**TOPICS["t"], "content_status": "under_review"}}
        self.assertEqual(set(findings("board_exam_questions", row, topics, EDITIONS, NOW)),
                         {"context_or_visual_pending", "current_syllabus_link_pending"})

    def test_official_domain_and_date(self):
        source = [{"url": "https://www.planalto.gov.br/lei"}]
        self.assertTrue(valid_basis(source, "2026-10-03T00:00:00+00:00", NOW))
        self.assertFalse(valid_basis(source, "2026-10-05T00:00:00+00:00", NOW))
        self.assertFalse(valid_basis([{"url": "https://planalto.gov.br.example.com/lei"}],
                                     "2026-10-03T00:00:00+00:00", NOW))


if __name__ == "__main__":
    unittest.main()
