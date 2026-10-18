import importlib.util,json,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('mc',Path(__file__).with_name('release-cespe-pa-pb-language.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
PACK=Path('/workspace/cespe7000-audit/portugues-review-04/release-pack.json')
@unittest.skipUnless(PACK.exists(),'Requires local official PDF evidence')
class PAAndPBOriginals(unittest.TestCase):
 def setUp(self):self.p=json.loads(PACK.read_text())
 def test_official_four(self):m.verify(self.p)
 def test_key_mismatch(self):
  self.p['items'][0]['row']['official_answer']='A'
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_following_block_rejected(self):
  self.p['items'][-1]['row']['options']['D']+=' Texto para as três questões seguintes. Brinkmanship'
  with self.assertRaisesRegex(ValueError,'boundaries'):m.verify(self.p)
 def test_missing_option(self):
  self.p['items'][0]['row']['options'].pop('D')
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_edital_year_is_not_application_year(self):
  self.p['groups'][1]['exam_year']=2008
  with self.assertRaisesRegex(ValueError,'year'):m.verify(self.p)
 def test_truncated_context(self):
  self.p['items'][0]['support_original']=self.p['items'][0]['support_original'][:100]
  with self.assertRaises(ValueError):m.verify(self.p)
if __name__=='__main__':unittest.main()
