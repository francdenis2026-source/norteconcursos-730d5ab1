import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('census', Path(__file__).with_name('audit-cespe2016-question-count.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class CountTests(unittest.TestCase):
    def test_parallel_editorial_answer_does_not_add_another_numbered_question(self):
        self.assertEqual(m.key_units('Gabarito 1C, 2C, 3E / Gabarito nosso: 2E'), (4, 3))

    def test_annulled_item_is_an_answer_reference_not_a_validated_answer(self):
        self.assertEqual(m.key_units('Gabarito 1 ANULADO, 2C, 3E'), (3, 3))
        self.assertEqual(m.key_units('Gabarito ANULADA'), (1, 1))

    def test_quoted_single_key_and_editorial_disagreement_are_one_reference(self):
        self.assertEqual(m.key_units('Gabarito “B”'), (1, 1))
        self.assertEqual(m.key_units('Gabarito Oficial "A", Nosso Gabarito não há alternativa correta'), (1, 1))

    def test_alternatives_are_not_counted_as_answer_keys(self):
        self.assertEqual(m.key_units('(A) Primeira opção (B) Segunda opção'), (0, 0))


if __name__ == '__main__':
    unittest.main()
