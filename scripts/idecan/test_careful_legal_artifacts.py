import json,pathlib,hashlib,unittest
ROOT=pathlib.Path('supabase/imports/idecan/revisao-cuidadosa')
class Test(unittest.TestCase):
 def test_individual_opinions_do_not_mass_approve(self):
  p=json.loads((ROOT/'pareceres-juridicos-legado.json').read_text());self.assertEqual(p['count'],101);self.assertEqual(len({x['local_index'] for x in p['items']}),101)
  for x in p['items']:self.assertFalse(x['publication_approved']);self.assertIn('Erro comum:',x['explanation']);self.assertIn('Exemplo prático:',x['explanation'])
 def test_archived_pinpoint_integrity_and_veto_discrepancy(self):
  excerpts=json.loads((ROOT/'excertos-juridicos.json').read_text())
  for x in excerpts.values():
   if x['text']:self.assertEqual(x['sha256'],hashlib.sha256(x['text'].encode()).hexdigest())
  cf=excerpts['cf:66']['text'];self.assertIn('de inciso',cf)
  lia=excerpts['lia:3']['text'].split('§ 1º')[0];self.assertIn('concorra',lia);self.assertIn('dolosamente',lia);self.assertNotIn('beneficie',lia)
 def test_revocation_and_commencement_are_both_proven(self):
  text=json.loads((ROOT/'vigencia-lei15428.json').read_text())['text'];flat=' '.join(text.split());self.assertIn('§§ 6º e 7º do art. 147',flat);self.assertIn('entra em vigor na data de sua publicação',flat);self.assertIn('5.6.2026',flat)
  applied=json.loads((ROOT/'correcoes-juridicas-aplicadas.json').read_text());self.assertTrue(applied['complete']);self.assertEqual(sum(x['content_status']=='obsolete' for x in applied['rows']),1);self.assertTrue(all(x['audited'] and x['historical_answer_preserved'] for x in applied['rows']))
if __name__=='__main__':unittest.main()
