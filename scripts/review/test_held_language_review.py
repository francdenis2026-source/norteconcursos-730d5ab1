import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('held', Path(__file__).with_name('apply-held-language-review.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
PACK = Path(__file__).resolve().parents[2]/'docs/reviews/cespe2016-portugues-held-review-01-2026-10-17.json'


class HeldReviewTests(unittest.TestCase):
    def fixture(self):
        pack = json.loads(PACK.read_text())
        pack['items'] = pack['items'][:2]
        rows = []
        for item in pack['items']:
            payload = dict(raw_text='Original text', answer_candidate='E', has_publication=False)
            item['expected_raw_text_sha256'] = hashlib.sha256(payload['raw_text'].encode()).hexdigest()
            rows.append(dict(id=item['candidate_id'], corpus_id=m.SOURCE, source_page=item['source_page'],
                             discipline='Língua Portuguesa', content_status='under_review', payload=payload))
        return pack, rows

    def test_original_text_and_key_remain_unchanged_and_unapproved(self):
        pack, rows = self.fixture()
        original = copy.deepcopy(rows[0])
        result = m.next_payload(rows[0], pack['items'][0], pack)
        self.assertEqual(rows[0], original)
        self.assertEqual(result['raw_text'], original['payload']['raw_text'])
        self.assertEqual(result['answer_candidate'], original['payload']['answer_candidate'])
        self.assertFalse(result['individual_review']['publication_approved'])
        self.assertFalse(result['individual_review']['answer_verified'])
        self.assertNotIn('publication', result)

    def test_later_protected_review_prevents_all_writes(self):
        pack, rows = self.fixture()
        rows[1]['content_status'] = 'reviewed'
        calls = []
        def request(path, method='GET', body=None):
            calls.append(method)
            return rows
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaisesRegex(RuntimeError, 'protected'):
                m.apply(pack, request, Path(directory)/'report.json', True)
        self.assertEqual(calls, ['GET'])

    def test_apply_is_audited_and_retry_does_not_rewrite(self):
        pack, rows = self.fixture()
        calls = []
        def request(path, method='GET', body=None):
            if method == 'GET':
                return copy.deepcopy(rows)
            self.assertEqual(path, 'rpc/review_corpus_candidate')
            row = next(r for r in rows if r['id']==body['candidate'])
            self.assertEqual(row['payload'], body['expected_payload'])
            self.assertFalse(body['next_payload']['individual_review']['publication_approved'])
            row.update(content_status=body['next_status'], payload=copy.deepcopy(body['next_payload']))
            calls.append(row['id'])
            return 'updated'
        with tempfile.TemporaryDirectory() as directory:
            report = Path(directory)/'report.json'
            first = m.apply(pack, request, report, True)
            second = m.apply(pack, request, report, True)
        self.assertEqual(len(first['updated']), 2)
        self.assertEqual(len(second['preserved']), 2)
        self.assertEqual(len(calls), 2)
        self.assertEqual(first['publications'], 0)

    def test_publication_and_official_confirmation_are_out_of_scope(self):
        pack, rows = self.fixture()
        pack['publications'] = 1
        with self.assertRaises(ValueError):
            m.validate(pack)


if __name__ == '__main__':
    unittest.main()
