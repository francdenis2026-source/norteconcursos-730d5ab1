import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('removal', Path(__file__).with_name('remove-obsolete-corpus.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class RemovalTests(unittest.TestCase):
    def test_backup_before_deletion_and_verified_removal(self):
        ident, corpus = 'a' * 64, 'b' * 64
        row = dict(id=ident, corpus_id=corpus, content_status='obsolete', payload={})
        history = [dict(id=7, candidate_id=ident, next_status='obsolete')]
        state = dict(candidate=[row], history=history)
        with tempfile.TemporaryDirectory() as directory:
            backup, report = Path(directory) / 'backup.json', Path(directory) / 'report.json'
            def request(path, method='GET', body=None):
                key = 'history' if path.startswith('question_corpus_review_audit') else 'candidate'
                if method == 'DELETE':
                    self.assertEqual(json.loads(backup.read_text()), [dict(candidate=row, history=history)])
                    previous = copy.deepcopy(state[key])
                    state[key] = []
                    return previous
                return copy.deepcopy(state[key])
            result = module.remove(dict(corpus_id=corpus, items=[dict(candidate_id=ident)]),
                                   request, backup, report, True)
            self.assertTrue(result['complete'])
            self.assertEqual(result['removed'], [ident])
            self.assertEqual(state, dict(candidate=[], history=[]))

    def test_preflight_rejects_other_status_before_any_write(self):
        def request(path, method='GET', body=None):
            self.assertEqual(method, 'GET')
            return [dict(id='a' * 64, corpus_id='b' * 64, content_status='reviewed', payload={})]
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(ValueError):
                module.remove(dict(corpus_id='b' * 64, items=[dict(candidate_id='a' * 64)]),
                              request, Path(directory) / 'backup', Path(directory) / 'report', True)
            self.assertFalse((Path(directory) / 'backup').exists())

    def test_history_restored_when_candidate_delete_fails(self):
        row = dict(id='a' * 64, corpus_id='b' * 64, content_status='obsolete', payload={})
        history = [dict(id=1, candidate_id=row['id'], next_status='obsolete')]
        state = dict(history=copy.deepcopy(history))
        def request(path, method='GET', body=None):
            is_history = path.startswith('question_corpus_review_audit')
            if method == 'POST':
                state['history'] = body
                return body
            if method == 'DELETE':
                if is_history:
                    state['history'] = []
                    return history
                raise RuntimeError('Simulated database failure')
            return copy.deepcopy(state['history'] if is_history else [row])
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(RuntimeError):
                module.remove(dict(corpus_id=row['corpus_id'], items=[dict(candidate_id=row['id'])]),
                              request, Path(directory) / 'backup', Path(directory) / 'report', True)
        self.assertEqual(state['history'], [{k: v for k, v in history[0].items() if k != 'id'}])


if __name__ == '__main__':
    unittest.main()
