import copy
import hashlib
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('stage', Path(__file__).with_name('stage-cespe2016-supplement.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class StagingTests(unittest.TestCase):
    def candidate(self):
        key = 'p22:c1:line12:item1'
        return dict(id=hashlib.sha256((m.SOURCE + ':' + key).encode()).hexdigest(),
                    corpus_id=m.SOURCE, source_key=key, source_page=22, discipline='Português',
                    content_status='under_review', payload=dict(raw_text='Texto bruto',
                        question_text_candidate='Uma questão completa.', answer_candidate='C',
                        has_publication=False, individual_review_complete=False))

    def snapshot(self, private=None):
        return {t: (private or []) if t == 'question_corpus_candidates' else [] for t in m.TABLES}

    def test_reviewed_candidate_is_preserved(self):
        row = self.candidate()
        prior = copy.deepcopy(row)
        prior['content_status'] = 'reviewed'
        prior['payload']['individual_review'] = {'publication_approved': False}
        pending, matches, preserved = m.plan([row], self.snapshot([prior]))
        self.assertEqual(pending, [])
        self.assertEqual(preserved, [row['id']])
        self.assertEqual(prior['content_status'], 'reviewed')

    def test_identity_collision_aborts(self):
        row = self.candidate()
        prior = copy.deepcopy(row)
        prior['payload']['raw_text'] = 'Outro texto'
        with self.assertRaises(RuntimeError):
            m.plan([row], self.snapshot([prior]))

    def test_exact_item_text_is_skipped(self):
        row = self.candidate()
        snapshot = self.snapshot()
        snapshot['official_exam_questions'] = [dict(id='official', content_status='active',
            question_text='Instrução\nItem: UMA QUESTÃO COMPLETA!')]
        pending, matches, _ = m.plan([row], snapshot)
        self.assertEqual(pending, [])
        self.assertEqual(matches[0]['matches'][0]['id'], 'official')

    def test_private_and_batch_limit_are_enforced(self):
        row = self.candidate()
        pack = dict(source=dict(id=m.SOURCE), candidates=[row])
        self.assertEqual(len(m.validate(pack)), 1)
        row['payload']['publication'] = {}
        with self.assertRaises(ValueError):
            m.validate(pack)
        del row['payload']['publication']
        pack['candidates'] = [row] * 101
        with self.assertRaises(ValueError):
            m.validate(pack)

    def test_keyset_pagination_does_not_truncate_at_server_limit(self):
        calls = []
        def request(path):
            calls.append(path)
            return [dict(id=f'{i:04}') for i in range(500)] if len(calls) == 1 else [dict(id='0500')]
        self.assertEqual(len(m.collect(request, 'table', 'id')), 501)
        self.assertIn('id=gt.0499', calls[1])


if __name__ == '__main__':
    unittest.main()
