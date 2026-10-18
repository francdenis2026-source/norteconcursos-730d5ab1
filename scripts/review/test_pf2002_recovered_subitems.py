import json,unittest,importlib.util
from pathlib import Path
s=importlib.util.spec_from_file_location('pf',Path(__file__).with_name('release-pf2002-recovered-subitems.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
PACK=Path('/workspace/cespe7000-audit/pf2000-2002-recovery/release-pack.json')
@unittest.skipUnless(PACK.exists(),'Requires local official documents')
class PF2002Tests(unittest.TestCase):
 def setUp(self):self.p=json.loads(PACK.read_text())
 def test_correct_official_matrix(self):self.assertEqual([m.verify(self.p)[32,n]for n in range(1,6)],list('CCCEC'))
 def test_no_fictitious_integer_item(self):
  d=self.p['decisions'][1];d['row']['item_number']=162
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_ambiguous_subitem_not_released(self):
  self.p['decisions'][0]['publication_approved']=True
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_wrong_key(self):
  self.p['decisions'][2]['official_answer']='E'
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_next_command_not_appended(self):
  self.p['decisions'][-1]['official_statement']+=' Julgue os itens a seguir, a respeito do emprego das estruturas lingüísticas do texto V.'
  with self.assertRaisesRegex(ValueError,'boundary'):m.verify(self.p)
if __name__=='__main__':unittest.main()
