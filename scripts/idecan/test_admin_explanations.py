"""Protect historical originals and keep the unverified batch out of publication."""
import json,pathlib,unittest
ROOT=pathlib.Path(__file__).resolve().parents[2]
class AdminExplanations(unittest.TestCase):
 def test_five_originals_preserved_and_publication_blocked(self):
  original=json.loads((ROOT/'supabase/imports/idecan/idecan_questions.json').read_text())
  pack=json.loads((ROOT/'supabase/imports/idecan/explicacoes-administracao-2026-10-23/explicacoes.json').read_text())
  self.assertEqual([x['local_index'] for x in pack['items']],list(range(237,242)))
  for item in pack['items']:
   old=original[item['local_index']]
   self.assertEqual(item['original_stem'],old['stem'])
   self.assertEqual(item['original_options'],old['options'])
   self.assertEqual(item['historical_answer'],old['official_answer'])
   self.assertEqual(item['identity'],{k:old[k] for k in item['identity']})
   self.assertFalse(item['publication_approved']);self.assertFalse(item['remote_applied'])
   self.assertFalse(item['source_provenance']['fresh_download_confirmed'])
   self.assertGreaterEqual(len(item['blockers']),3)
   self.assertEqual(set(item['alternatives']),set(old['options']))
   self.assertIn('Correta:',item['alternatives'][old['official_answer']])
   self.assertFalse(item['legal_content']);self.assertIsNone(item['law_version_checked_at'])
   self.assertEqual(item['legal_basis'],[])
   self.assertTrue(item['explanation'].endswith('Exemplo prático: '+item['practical_example']))
if __name__=='__main__':unittest.main()
