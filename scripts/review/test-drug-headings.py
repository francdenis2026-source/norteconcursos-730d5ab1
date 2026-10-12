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
 def test_contravention_parts_and_typo_preserve_penalties(self):
  raw='<h2>PARTE GERAL</h2><p>Art. 1. Regra geral.</p><p>Territorialidade</p><p>Art. 2. Território nacional.</p><h2>PARTE ESPECIAL</h2><p>CAPÍTULO I</p><p>DAS CONTRAVENÇÕES REFERENTES À PESSOA</p><p>Art. 23. Custódia.</p><p>Pena – prisão simples de quinze dias a três meses.</p><p>CAPÍLULO II</p><p>DAS CONTRAVENÇÕES REFERENTES AO PATRIMÔNIO</p><p>Instrumento de emprego usual na prática de furto</p><p>Art. 24. Fabricar gazua.</p><p>Pena – prisão simples de seis meses a dois anos e multa.</p>'
  us={u['key']:u for u in m.parse_law(raw.encode(),'contravencoes')}
  self.assertEqual(us['art-1']['text'],'Art. 1. Regra geral.')
  self.assertEqual(us['art-1']['chapter'],'PARTE GERAL')
  self.assertNotIn('PATRIMÔNIO',us['art-23']['text'])
  self.assertIn('quinze dias a três meses',us['art-23']['text'])
  self.assertEqual(us['art-24']['chapter'],'PARTE ESPECIAL / CAPÍTULO II — DAS CONTRAVENÇÕES REFERENTES AO PATRIMÔNIO')
  self.assertIn('seis meses a dois anos e multa',us['art-24']['text'])
 def test_contravention_revocation_does_not_hide_following_chapter(self):
  raw='<h2>PARTE ESPECIAL</h2><p>CAPÍTULO I</p><p>DAS CONTRAVENÇÕES REFERENTES À PESSOA</p><p>Art. 26. Regra atual.</p><p><strike>Art. 27. Revogado.</strike></p><p>CAPÍTULO III</p><p>DAS CONTRAVENÇÕES REFERENTES À INCOLUMIDADE PÚBLICA</p><p>Disparo de arma de fogo</p><p>Art. 28. Regra seguinte.</p>'
  us={u['key']:u for u in m.parse_law(raw.encode(),'contravencoes')}
  self.assertIn('CAPÍTULO III',us['art-28']['chapter'])
  self.assertEqual(us['art-26']['text'],'Art. 26. Regra atual.')
 def test_contravention_footer_keeps_vigency_and_excludes_signatures(self):
  raw='<p>Art. 72. Esta lei entrará em vigor no dia 1º de janeiro de 1942.</p><p>Rio de Janeiro, 3 de outubro de 1941; 120º da Independência.</p><p>GETULIO VARGAS</p><p>Francisco Campos</p>'
  us={u['key']:u for u in m.parse_law(raw.encode(),'contravencoes')}
  self.assertEqual(us['art-72']['text'],'Art. 72. Esta lei entrará em vigor no dia 1º de janeiro de 1942.')
 def test_environmental_split_caption_and_struck_mp_note_preserve_rules(self):
  raw='<p>Art. 24. Liquidação forçada.</p><p>CAPÍTULO III</p><p>DA APREENSÃO</p><p>ADMINISTRATIVA OU DE CRIME</p><p>Art. 25. Apreensão.</p><p>§ 1º Animais protegidos.</p><p><strike>§ 2º Regra de MP prejudicada.</strike> Prejudicada</p><p>Art. 26. Ação pública.</p>'
  us={u['key']:u for u in m.parse_law(raw.encode(),'ambientais')}
  self.assertEqual(us['art-24']['text'],'Art. 24. Liquidação forçada.')
  self.assertIn('Animais protegidos',us['art-25']['text']);self.assertNotIn('Prejudicada',us['art-25']['text'])
if __name__=='__main__':unittest.main()
