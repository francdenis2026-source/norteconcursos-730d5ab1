import copy
import importlib.util
import pathlib
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('audit_batch', pathlib.Path(__file__).with_name('apply-corpus-audit-batch.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class BatchTests(unittest.TestCase):
    def fixture(self):
        payload = {'raw_text': 'Synthetic original statement', 'answer_candidate': 'E'}
        row = dict(id='a' * 64, corpus_id='b' * 64, source_page=1,
                   content_status='under_review', payload=payload)
        item = dict(candidate_id=row['id'], corpus_id=row['corpus_id'], source_page=1,
                    expected_status='under_review', next_status='reviewed',
                    expected_payload_sha256=module.fingerprint(payload),
                    raw_text_sha256=module.hashlib.sha256(payload['raw_text'].encode()).hexdigest(),
                    explanation='Individual synthetic legal explanation. ' * 8,
                    example='Synthetic example that does not purport to verify an official historical key.',
                    reason='Current statutory rule checked; original key pending.',
                    evidence=[dict(url='https://www.planalto.gov.br/ccivil_03/test.htm', sha256='c' * 64,
                                   checked_at='2026-01-01T00:00:00+00:00', reference='Synthetic statutory article')])
        return row, {'batch_id': 'synthetic-private-batch', 'items': [item]}

    def test_compare_and_set_readback_idempotence_and_original_preservation(self):
        row, pack = self.fixture()
        calls = []
        def request(path, method='GET', body=None):
            if method == 'GET':
                return [copy.deepcopy(row)]
            calls.append(path)
            self.assertEqual(path, 'rpc/review_corpus_candidate')
            self.assertEqual(body['expected_payload'], row['payload'])
            row.update(content_status=body['next_status'], payload=body['next_payload'])
            return 'updated'
        with tempfile.TemporaryDirectory() as folder:
            report = pathlib.Path(folder) / 'report.json'
            preview = module.apply_batch(pack, request, report, dry_run=True)
            self.assertEqual(calls, [])
            self.assertEqual(preview['pending'], 1)
            result = module.apply_batch(pack, request, report)
            self.assertEqual(len(result['updated']), 1)
            self.assertEqual(row['payload']['raw_text'], 'Synthetic original statement')
            self.assertEqual(row['payload']['answer_candidate'], 'E')
            self.assertFalse(row['payload']['individual_review']['publication_approved'])
            self.assertFalse(row['payload']['individual_review']['answer_verified'])
            second = module.apply_batch(pack, request, report)
            self.assertEqual(len(calls), 1)
            self.assertEqual(second['unchanged'], [row['id']])

    def test_entire_batch_preflight_prevents_partial_stale_overwrite(self):
        row, pack = self.fixture()
        other = copy.deepcopy(row); other['id'] = 'd' * 64
        item = copy.deepcopy(pack['items'][0]); item['candidate_id'] = other['id']
        pack['items'].append(item)
        other['payload']['manual_note'] = 'Concurrent reviewer work'
        writes = []
        def request(path, method='GET', body=None):
            if method != 'GET':
                writes.append(path)
            return [copy.deepcopy(other if other['id'] in path else row)]
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaisesRegex(ValueError, 'Concurrent review'):
                module.apply_batch(pack, request, pathlib.Path(folder) / 'report.json')
        self.assertEqual(writes, [])

    def test_spoofed_official_domain_and_publication_are_rejected(self):
        row, pack = self.fixture()
        pack['items'][0]['evidence'][0]['url'] = 'https://www.planalto.gov.br.example.com/law'
        with self.assertRaisesRegex(ValueError, 'official'):
            module.validate(pack)
        row, pack = self.fixture()
        row['payload']['publication'] = {'content_status': 'active'}
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaisesRegex(ValueError, 'Publication'):
                module.apply_batch(pack, lambda *a: [row], pathlib.Path(folder) / 'report.json')


if __name__ == '__main__':
    unittest.main()
