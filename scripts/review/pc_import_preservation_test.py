"""Regression: repeated imports stop before any metadata mutation, without credentials."""
import ast
from pathlib import Path
import unittest


class ImportPreservationTest(unittest.TestCase):
    def test_existing_exam_cannot_modify_sources_or_syllabus(self):
        path = Path(__file__).with_name('pc_import_lib.py')
        tree = ast.parse(path.read_text(encoding='utf-8'))
        function = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'run')
        calls = []

        def request(method, path, *args):
            calls.append((method, path))
            if method != 'GET':
                self.fail('Repeated import attempted a mutation')
            return [{'item_number': 1}]

        def source_probe(url):
            self.fail('Repeated import reached source processing')

        namespace = {'rest': request, 'url_ok': source_probe}
        exec(compile(ast.Module(body=[function], type_ignores=[]), str(path), 'exec'), namespace)
        with self.assertRaisesRegex(AssertionError, 'matrizes preservadas'):
            namespace['run']({'contest': 'PC-SE', 'role': 'Agente', 'year': 2021}, [{'n': 1}], {1: 'C'}, {})
        self.assertEqual(len(calls), 1)
        self.assertIn('contest_name=eq.PC-SE%20-%20Agente', calls[0][1])


if __name__ == '__main__':
    unittest.main()
