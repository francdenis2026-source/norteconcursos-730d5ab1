import importlib.util
import json
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('priority', Path(__file__).with_name('extract-cespe2016-priority-subjects.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class PriorityTests(unittest.TestCase):
    def test_disagreeing_official_and_editorial_answers_are_held(self):
        result = m.editorial_answer(['Gabarito 1C, 2C / Gabarito nosso 2E'], '2', 2)
        self.assertIsNone(result['answer_candidate'])
        self.assertTrue(result['editorial_answer_conflict'])
        self.assertFalse(result['official_answer_verified'])

    def test_parallel_keys_preserve_both_versions(self):
        result = m.editorial_answer(['Gabarito Nosso 1E, 2C', 'Gabarito Oficial 1C, 2C'], '1', 2)
        self.assertEqual(result['answer_variants'], ['E', 'C'])
        self.assertIsNone(result['answer_candidate'])

    def test_annulled_variants_never_become_an_answer(self):
        for word in ['ANULADO', 'ANULADA', 'anulado']:
            result = m.editorial_answer(['Gabarito 1 '+word+', 2C'], '1', 2)
            self.assertIsNone(result['answer_candidate'])
            self.assertTrue(result['publisher_claim_annulled'])

    def test_single_quoted_key_is_not_assigned_to_many_items(self):
        self.assertEqual(m.editorial_answer(['Gabarito “B”'], 'single', 1)['answer_candidate'], 'B')
        self.assertIsNone(m.editorial_answer(['Gabarito “B”'], '1', 4)['answer_candidate'])

    def test_lots_never_exceed_100_or_drop_remainder(self):
        rows = list(range(357))
        lots = m.batches(rows)
        self.assertEqual([len(batch) for batch in lots], [100,100,100,57])
        self.assertEqual([item for batch in lots for item in batch], rows)
        with self.assertRaises(ValueError):
            m.batches(rows, 101)

    def test_no_correct_alternative_dispute_blocks_the_letter_key(self):
        result = m.editorial_answer(['Gabarito Oficial "A", Nosso Gabarito não há alternativa correta'], 'single', 1)
        self.assertIsNone(result['answer_candidate'])
        self.assertTrue(result['editorial_answer_conflict'])

    def test_review_manifest_keeps_excluded_history_out_of_all_batches(self):
        manifest = json.loads((Path(__file__).resolve().parents[2]/'docs/reviews/cespe2016-priority-extraction-2026-10-17.json').read_text())
        excluded = {r['candidate_id'] for r in manifest['excluded_historical_items']}
        ids = [ident for subject in manifest['subjects'] for batch in subject['batches'] for ident in batch['candidate_ids']]
        self.assertEqual(len(excluded), 3)
        self.assertEqual(len(ids), 1125)
        self.assertEqual(len(set(ids)), len(ids))
        self.assertFalse(excluded.intersection(ids))


if __name__ == '__main__':
    unittest.main()
