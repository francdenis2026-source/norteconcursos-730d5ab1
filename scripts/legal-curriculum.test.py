import importlib.util,pathlib,unittest
path=pathlib.Path(__file__).with_name('build-legal-curriculum.py')
spec=importlib.util.spec_from_file_location('legal_builder',path)
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)

class CurriculumTests(unittest.TestCase):
 def parse(self,text,slug='fixture'):
  return builder.parse_law(('<html><body>'+text+'</body></html>').encode('utf-8'),slug)
 def test_dash_and_article_suffix_are_distinct(self):
  rows=self.parse('<p>Art. 9º - A comissão tem competências.</p><p>Art. 9º-A. O perfil é identificado.</p>')
  self.assertEqual([r['label'] for r in rows],['Art. 9','Art. 9-A'])
 def test_replaced_and_struck_articles_are_not_active(self):
  rows=self.parse('<p><strike>Art. 1º A redação antiga.</strike></p><p>Art. 1º A redação atual.</p><p><strike>Art. 2º A redação suprimida.</strike></p>')
  self.assertEqual(len(rows),2)
  self.assertNotIn('antiga',rows[0]['text'])
  self.assertEqual(rows[1]['status'],'excluded')
 def test_amendments_remain_in_the_host_article(self):
  rows=self.parse('<p>Art. 1º Altera outra lei.</p><blockquote><p>“Art. 3º Texto inserido.”</p><p>Art. 1.783-A. Texto do código.</p></blockquote><p>Art. 2º Esta lei vigora.</p>')
  self.assertEqual([r['label'] for r in rows],['Art. 1','Art. 2'])
  self.assertIn('1.783-A',rows[0]['text'])
 def test_section_titles_keep_their_parent_chapter(self):
  rows=self.parse('<p>CAPÍTULO I</p><p>Primeiro</p><p>Seção I</p><p>Disposições gerais</p><p>Art. 1º Uma regra.</p><p>CAPÍTULO II</p><p>Segundo</p><p>Seção I</p><p>Disposições gerais</p><p>Art. 2º Outra regra.</p>')
  self.assertNotEqual(rows[0]['chapter'],rows[1]['chapter'])
  self.assertIn('Primeiro',rows[0]['chapter']);self.assertIn('Segundo',rows[1]['chapter'])
 def test_convention_annex_has_independent_article_labels(self):
  rows=self.parse('<p>Art. 1º Promulga convenção.</p><p>Art. 2º Regra final.</p><p>Brasília, assinatura.</p><p>ANEXO</p><p>Capítulo I - Terminologia</p><p>Artigo 1 - Definições</p><p>Definição da convenção.</p>', 'budapeste')
  self.assertEqual(rows[-1]['label'],'Convenção — Artigo 1')
  self.assertIn('Definição',rows[-1]['text'])
 def test_utf16_and_legacy_sources_preserve_portuguese(self):
  text='<html><body><p>Art. 1º A identificação é válida.</p></body></html>'
  for encoding in ['utf-16','cp1252']:
   rows=builder.parse_law(text.encode(encoding),'fixture')
   self.assertIn('identificação',rows[0]['text'])
 def test_annex_tables_and_figures_survive_the_signature_boundary(self):
  rows=self.parse('<p>Art. 1º Regra.</p><p>Brasília, assinatura.</p><p>ANEXO I</p><p>Definições.</p><table><tr><td>Termo</td><td>Definição</td></tr><tr><td>Veículo</td><td>Conceito oficial</td></tr></table><img src="/modelo.png">')
  self.assertEqual(rows[-1]['key'],'anexo-1')
  self.assertIn('| Veículo | Conceito oficial |',rows[-1]['text'])
  self.assertEqual(rows[-1]['figures'][0]['url'],'https://www.planalto.gov.br/modelo.png')

if __name__=='__main__':unittest.main()
