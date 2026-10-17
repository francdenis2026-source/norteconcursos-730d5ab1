import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('extractor', Path(__file__).with_name('extract-cespe2016-supplement.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class SupplementTests(unittest.TestCase):
    def test_leading_whitespace_does_not_cut_first_letters(self):
        pieces, comment = m.split_body('\n(1) O primeiro texto completo.\n(2) A segunda frase completa.\n', lambda p: False)
        self.assertEqual(pieces[0][1], 'O primeiro texto completo.')
        self.assertEqual(pieces[1][1], 'A segunda frase completa.')

    def test_multiple_choice_questions_in_one_group(self):
        text = '\nTabela comum\n(1) Qual a primeira resposta?\n(A) Alfa\n(B) Beta\n(2) Qual a segunda resposta?\n(A) Gama\n(B) Delta\n'
        pieces, _ = m.split_body(text, lambda p: False)
        self.assertEqual(len(pieces), 2)
        self.assertEqual(pieces[0][2], 'Tabela comum')
        self.assertIn('(B) Beta', pieces[0][1])
        self.assertNotIn('(2)', pieces[0][1])

    def test_chart_numbers_are_not_question_labels(self):
        pieces, _ = m.split_body('Caixa\n(3)\n3.240\n(1) O ativo total está correto.\n', lambda p: False)
        self.assertEqual(len(pieces), 1)
        self.assertEqual(pieces[0][0], '1')
        self.assertIn('(3)', pieces[0][2])

    def test_column_band_precedes_full_width_paragraph(self):
        def row(text, y, column, wide=False):
            return dict(text=text, y=y, x=20 if column==1 else 240, column=column,
                        block_y0=100 if wide else y, block_y1=140 if wide else y+8, wide_block=wide)
        rows=[row('wide',100,1,True),row('left',40,1),row('right',40,2),row('short wide tail',130,1,True)]
        self.assertEqual([r['text']for r in m.order_page(rows)], ['left','right','wide','short wide tail'])

    def test_reject_commentary_and_citation_headers(self):
        text='(justificativa do CESPE)\n(art. 5º da Lei 10.259/2001)\n(Diplomacia – 2000) texto\n(Cargo (área) – 2012 – CESPE) texto'
        hs=m.find_headers(text)
        self.assertEqual([h[2]for h in hs],['Diplomacia – 2000','Cargo (área) – 2012 – CESPE'])

    def test_orphan_group_does_not_inherit_exam_identity(self):
        text='(Cargo – 2012 – CESPE)\n(1) A primeira questão completa.\nGabarito 1C\nTexto de apoio\n(1) A segunda questão completa.\nGabarito 1E\n'
        hs=m.find_headers(text)
        self.assertEqual(len(hs),2)
        self.assertEqual(hs[1][0],hs[1][1])
        self.assertIn('não repetido',hs[1][2])

    def test_parallel_answer_keys_are_not_new_questions(self):
        text='(Diplomacia – 2005 – CESPE)\n(1) O enunciado completo.\nGabarito Nosso: 1E\nGabarito Oficial 1C\n'
        self.assertEqual(len(m.find_headers(text)),1)

    def test_typographic_hyphenation_is_deduplicated(self):
        self.assertEqual(m.normalized('indepen-\ndência econômica'),m.normalized('independência econômica'))


if __name__ == '__main__':
    unittest.main()
