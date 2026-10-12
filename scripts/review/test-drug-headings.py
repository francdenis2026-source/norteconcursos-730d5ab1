"""Regression coverage for mixed official headings and revoked boundaries."""
import importlib.util,unittest
from pathlib import Path
s=importlib.util.spec_from_file_location('parser',Path(__file__).parents[1]/'build-legal-curriculum.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class DrugHeadings(unittest.TestCase):
 def parse(self,text):return {u['key']:u for u in m.parse_law(text.encode(),'drogas')}
 def test_mixed_heading_levels_do_not_pollute_articles(self):
  us=self.parse('<h4>TÍTULO IV</h4><h5>DA REPRESSÃO</h5><h4>CAPÍTULO II</h4><h5>DOS CRIMES</h5><p>Art. 33. Regra criminal.</p><h4>CAPÍTULO III</h4><h5>DO PROCEDIMENTO PENAL</h5><p>Art. 48. Regra processual.</p>')
  self.assertEqual(us['art-33']['text'],'Art. 33. Regra criminal.')
  self.assertIn('DOS CRIMES',us['art-33']['chapter']);self.assertNotIn('DOS CRIMES',us['art-48']['chapter']);self.assertIn('DO PROCEDIMENTO PENAL',us['art-48']['chapter'])
 def test_amendment_annotation_is_not_chapter_caption(self):
  us=self.parse('<p>Art. 19. Prevenção.</p><p>CAPÍTULO II</p><p>(Redação dada pela Lei nº 13.840, de 2019)</p><p>DO TRATAMENTO</p><p>Art. 20. Atenção.</p>')
  self.assertEqual(us['art-19']['text'],'Art. 19. Prevenção.');self.assertEqual(us['art-20']['chapter'],'CAPÍTULO II — DO TRATAMENTO')
 def test_new_heading_after_removed_article_is_not_skipped(self):
  us=self.parse('<p>Art. 1. Atual.</p><p><strike>Art. 2. Revogado.</strike></p><p>Pena antiga.</p><p>TÍTULO II</p><p>OUTRAS DISPOSIÇÕES</p><p>Art. 3. Atual seguinte.</p>')
  self.assertEqual(us['art-1']['text'],'Art. 1. Atual.');self.assertEqual(us['art-3']['chapter'],'TÍTULO II — OUTRAS DISPOSIÇÕES');self.assertEqual(us['art-3']['text'],'Art. 3. Atual seguinte.')
 def test_arms_crime_caption_does_not_become_previous_penalty(self):
  raw='<p>Art. 11-A. Honorários.</p><p>Posse irregular de arma de fogo de uso permitido</p><p>Art. 12. Possuir arma irregular.</p><p>Pena – detenção de um a três anos.</p><p>Omissão de cautela</p><p>Art. 13. Deixar de observar cautelas.</p><p>Pena – detenção de um a dois anos.</p>'
  us={u['key']:u for u in m.parse_law(raw.encode(),'armas')}
  self.assertEqual(us['art-11-a']['text'],'Art. 11-A. Honorários.')
  self.assertNotIn('Omissão de cautela',us['art-12']['text'])
  self.assertIn('um a três anos',us['art-12']['text']);self.assertIn('um a dois anos',us['art-13']['text'])
if __name__=='__main__':unittest.main()
