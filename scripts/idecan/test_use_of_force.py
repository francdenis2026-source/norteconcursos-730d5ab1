import unittest,importlib.util,pathlib,json,copy,datetime
sp=importlib.util.spec_from_file_location('force',pathlib.Path(__file__).with_name('publish-use-of-force.py'));mod=importlib.util.module_from_spec(sp);sp.loader.exec_module(mod)
class Test(unittest.TestCase):
 def setUp(self):self.pack=json.loads(pathlib.Path('supabase/imports/idecan/revisao-cuidadosa/publicacao-juridica-uso-forca-3.json').read_text())
 def check(self,pack):return mod.validate(pack,now=datetime.datetime.fromisoformat(self.pack['changes'][0]['patch']['law_version_checked_at'])+datetime.timedelta(minutes=1))
 def test_only_three_verified_questions(self):self.assertTrue(self.check(self.pack))
 def test_question_with_wrong_article_cannot_enter_batch(self):
  self.pack['changes'][0]['local_index']=206
  with self.assertRaises(ValueError):self.check(self.pack)
 def test_original_answer_is_immutable(self):
  self.pack['changes'][0]['patch']['official_answer']='E'
  with self.assertRaises(ValueError):self.check(self.pack)
 def test_unverified_or_unofficial_basis_rejected(self):
  p=copy.deepcopy(self.pack);p['changes'][0]['evidence']['legal_current']=False
  with self.assertRaises(ValueError):self.check(p)
  self.pack['changes'][0]['patch']['legal_basis'][0]['url']='https://example.com/lei'
  with self.assertRaises(ValueError):self.check(self.pack)
if __name__=='__main__':unittest.main()
