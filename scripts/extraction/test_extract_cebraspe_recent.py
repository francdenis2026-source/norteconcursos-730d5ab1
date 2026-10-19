import importlib.util,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('extractor',Path(__file__).with_name('extract-cebraspe-recent.py'));m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)

def row(text,x=28,page=1,col=0,block=1,label=False):
 return {'text':text,'page':page,'column':col,'bbox':[x,60,290,72],'blocks':[block],'item_label':label}

class ExtractionTests(unittest.TestCase):
 def test_real_pdf_columns_are_read_without_interleaving(self):
  import pymupdf
  with pymupdf.open() as pdf:
   p=pdf.new_page(width=595,height=842)
   p.insert_text((28,70),'1',fontsize=9);p.insert_text((42,70),'Left first item.',fontsize=10)
   p.insert_text((28,110),'2',fontsize=9);p.insert_text((42,110),'Left second item.',fontsize=10)
   p.insert_text((303,70),'3',fontsize=9);p.insert_text((317,70),'Right third item.',fontsize=10)
   rows=m.page_rows(p,1);anchors=m.find_anchors(rows,False,1)
   self.assertEqual([n for _,n,_ in anchors],[1,2,3])
   self.assertIn('Right third',rows[anchors[2][0]]['text'])
 def test_fingerprint_preserves_accents_and_symbols(self):
  self.assertNotEqual(m.content_fingerprint('', 'Eles tem razão.', {}),m.content_fingerprint('', 'Eles têm razão.', {}))
  self.assertNotEqual(m.content_fingerprint('', 'x < 2', {}),m.content_fingerprint('', 'x ≤ 2', {}))
 def test_fingerprint_ignores_only_layout_whitespace(self):
  self.assertEqual(m.content_fingerprint('Texto de apoio.', 'Item em duas\nlinhas.', {'A':'Uma\nopção.'}),m.content_fingerprint('Texto de apoio.', 'Item em duas linhas.', {'A':'Uma opção.'}))
 def test_final_key_ignores_padding_and_keeps_annulment(self):
  self.assertEqual(m.parse_key('Item 1 2 3 0\nGabarito E X C 0\n'),{1:'E',2:'X',3:'C'})
 def test_key_does_not_shift_when_row_has_missing_cell(self):
  with self.assertRaises(ValueError):m.parse_key('Questão 1 2 3\nGabarito A B\n')
 def test_conflicting_versions_are_rejected(self):
  with self.assertRaises(ValueError):m.parse_key('Item 1 2\nGabarito C E\nItem 1 2\nGabarito E C\n')
 def test_key_gap_is_not_filled(self):
  with self.assertRaises(ValueError):m.parse_key('Item 1 3\nGabarito C E\n')
 def test_pairing_uses_block_and_cargo_not_just_event(self):
  self.assertEqual(m.signature('PROVA OBJETIVA (P2) E GABARITO PRELIMINAR COM JUSTIFICATIVAS'),m.signature('GABARITO DEFINITIVO – PROVA OBJETIVA (P2)'))
  self.assertNotEqual(m.signature('PROVA OBJETIVA – CONHECIMENTOS ESPECÍFICOS – CARGO 2'),m.signature('GABARITO DEFINITIVO – CONHECIMENTOS ESPECÍFICOS – CARGO 16'))
 def test_initial_portuguese_article_is_not_option_a(self):
  rs=[row('A criminologia'),row('A é uma ciência jurídica.'),row('B adota método empírico.'),row('C estuda o fenômeno criminal.'),row('D estuda o delito.'),row('E possui autonomia.')]
  stem,opts,_=m.parse_options(rs,'ABCDE');self.assertEqual(stem,'A criminologia');self.assertEqual(opts['A'],'é uma ciência jurídica.');self.assertEqual(len(opts),5)
 def test_option_continuation_does_not_start_another_letter(self):
  rs=[row('Assinale a correta.'),row('A primeira opção'),row('B continua dentro da primeira opção',x=42),row('B segunda opção'),row('C terceira opção'),row('D quarta opção')]
  _,opts,_=m.parse_options(rs,'ABCD');self.assertIn('B continua',opts['A']);self.assertEqual(len(opts),4)
 def test_number_in_table_is_not_a_question_anchor(self):
  rs=[row('1 Primeiro item.',label=True),row('2',label=False),row('2 Segundo item.',label=True)]
  self.assertEqual([a[0] for a in m.find_anchors(rs,False,1)],[0,2])
 def test_ce_preliminary_comment_is_separate_from_stem(self):
  stem,comment,following=m.separate_justification([row('A afirmação é esta.'),row('JUSTIFICATIVA - Errado.'),row('<FimJust>'),row('Julgue os itens seguintes.')])
  self.assertEqual(m.joined(stem),'A afirmação é esta.');self.assertIn('Errado',comment);self.assertEqual(len(following),1)
 def test_mc_comments_without_title_are_not_in_alternatives(self):
  stem,comment,following=m.separate_justification([row('E última opção.'),row('||A|| - Incorreta. */'),row('||E|| - Correta. */')])
  self.assertEqual(m.joined(stem),'E última opção.');self.assertIn('||E||',comment);self.assertEqual(following,[])
 def test_table_at_new_column_attaches_to_following_group(self):
  rs=[row('O direito deve ser apropriado mensalmente.',x=42,block=1),row('conta saldo (R$)',x=350,col=1,block=2),row('bancos 95.000',x=350,col=1,block=2),row('Com base nos dados precedentes, julgue.',x=303,col=1,block=3)]
  stem,support=m.split_ce(rs);self.assertEqual(len(stem),1);self.assertIn('95.000',m.joined(support))
 def test_text_for_next_mc_group_is_not_option_e(self):
  rs=[row('Assinale.'),row('A um'),row('B dois'),row('C três'),row('D quatro'),row('E cinco'),row('Texto CG1A2'),row('Outro texto de apoio.')]
  _,opts,following=m.parse_options(rs,'ABCDE');self.assertEqual(opts['E'],'cinco');self.assertEqual(following[0]['text'],'Texto CG1A2')

if __name__=='__main__':unittest.main()
