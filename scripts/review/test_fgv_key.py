import unittest
import json
import pathlib
from fgv_key import answer_token, aligned_answers, section_answers


class FgvKeyTest(unittest.TestCase):
    def test_footnote_does_not_shift_answers(self):
        self.assertEqual(aligned_answers("27 28 29 30", "C B** E A"),
                         {27: "C", 28: "B", 29: "E", 30: "A"})
        self.assertEqual(answer_token("*"), "X")

    def test_invalid_columns_fail(self):
        for numbers, answers in [("1 2 3", "A B"), ("1 2", "A ?"),
                                 ("1 1", "A B"), ("1 2", "A **")]:
            with self.assertRaises(ValueError):
                aligned_answers(numbers, answers)

    def test_exact_role_and_type(self):
        lines = ["Contador - TIPO 1", "1 2", "A B**",
                 "Contador - Finanças Públicas - TIPO 1", "1 2", "D E",
                 "Contador - TIPO 2", "1 2", "C D"]
        self.assertEqual(section_answers(lines, "Contador"), {1: "A", 2: "B"})
        self.assertEqual(section_answers(lines, "Contador", 2), {1: "C", 2: "D"})

    def test_shift_is_required_for_repeated_sections(self):
        lines = ["Auditor do Estado - Direito - TIPO 1 - Manhã", "1 2", "A B",
                 "Auditor do Estado - Direito - TIPO 1 - Tarde", "1 2", "C D"]
        with self.assertRaises(ValueError):
            section_answers(lines, "Auditor do Estado - Direito")
        self.assertEqual(section_answers(lines, "Auditor do Estado - Direito", shift="Manhã"),
                         {1: "A", 2: "B"})

    def test_missing_exact_section_fails(self):
        with self.assertRaises(ValueError):
            section_answers(["Contador - Finanças - TIPO 1", "1 2", "A B"], "Contador")

    def test_registered_cgm_keys_match_verified_official_fixture(self):
        base = pathlib.Path(__file__).resolve().parent
        fixture = json.loads((base / "fixtures/cgmrj_tci_key.json").read_text(encoding="utf-8"))
        rows = json.loads((base.parents[1] / "supabase/imports/fgv/fgv_questions.json").read_text(encoding="utf-8"))
        stored = {str(r["item_number"]): r["official_answer"] for r in rows
                  if r["answer_key_url"] == fixture["source_url"] and r["career_name"] == fixture["role"]}
        self.assertEqual(len(fixture["answers"]), 100)
        self.assertEqual(len(stored), 99)
        self.assertEqual(set(fixture["answers"]) - set(stored), {"100"})
        self.assertEqual(stored, {n: fixture["answers"][n] for n in stored})


if __name__ == "__main__":
    unittest.main()
