import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('publisher', Path(__file__).with_name('publish-corpus-adaptations.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
PACK = Path(__file__).resolve().parents[2] / 'docs/reviews/cespe2016-adapted-cpc-publication-01-2026-10-17.json'


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.pack = json.loads(PACK.read_text())

    def test_full_authored_pack_validates(self):
        self.assertEqual(len(m.validate(self.pack)), 10)

    def test_cannot_relabel_adaptations_as_official_exam(self):
        self.pack['items'][0]['row']['exam_board'] = 'CEBRASPE'
        with self.assertRaises(ValueError):
            m.validate(self.pack)

    def test_cannot_release_original_or_remove_example(self):
        self.pack['original_exam_items_published'] = 1
        with self.assertRaises(ValueError):
            m.validate(self.pack)
        self.pack['original_exam_items_published'] = 0
        self.pack['items'][0]['row']['explanation'] = 'Aprovada.'
        with self.assertRaises(ValueError):
            m.validate(self.pack)

    def test_readback_handles_timestamp_precision_but_rejects_answer_change(self):
        row = self.pack['items'][0]['row']
        stored = dict(row, verified_at=row['verified_at'].replace('+00:00', 'Z'))
        self.assertTrue(m.same_row(stored, row))
        stored['official_answer'] = 'C' if row['official_answer'] == 'E' else 'E'
        self.assertFalse(m.same_row(stored, row))

    def test_invalid_later_origin_prevents_all_writes(self):
        calls = []
        pack = copy.deepcopy(self.pack)
        pack['items'] = pack['items'][:2]
        first = pack['items'][0]
        def request(path, method='GET', body=None, prefer=None):
            calls.append(method)
            if path.startswith('question_corpus_candidates'):
                ident = path.split('id=eq.')[1]
                return [dict(id=ident, corpus_id=m.stage.SOURCE, content_status='under_review')] if ident == first['origin_candidate_id'] else []
            if path.startswith('syllabus_topics'):
                return [dict(edition_id='edition', discipline='Direito Processual Civil', content_status='current')]
            if path.startswith('syllabus_editions'):
                return [dict(source_id=first['row']['source_id'], status='active')]
            if path.startswith('content_sources'):
                return [dict(url=pack['primary_evidence']['edital']['url'], is_official=True, source_type='edital', status='vigente')]
            raise AssertionError(path)
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'evidence'
            path.write_bytes(b'official evidence fixture')
            for kind in ['cpc', 'edital']:
                pack['primary_evidence'][kind]['path'] = str(path)
                pack['primary_evidence'][kind]['sha256'] = hashlib.sha256(path.read_bytes()).hexdigest()
            with self.assertRaisesRegex(RuntimeError, 'Origin missing'):
                m.run_publication(pack, request, lambda *args: [], Path(directory) / 'report.json', apply=True)
        self.assertTrue(calls)
        self.assertEqual(set(calls), {'GET'})


if __name__ == '__main__':
    unittest.main()
