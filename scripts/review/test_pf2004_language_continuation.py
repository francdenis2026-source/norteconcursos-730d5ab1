import copy
import importlib.util
import json
from pathlib import Path
import unittest

ROOT=Path(__file__).parent
spec=importlib.util.spec_from_file_location('pf_release',ROOT/'release-pf2004-language-continuation.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
PACK=Path('/workspace/cespe7000-audit/portugues-review-03/release-pack.json')

@unittest.skipUnless(PACK.exists(),'Local official evidence pack is required')
class PFContinuationTests(unittest.TestCase):
 def setUp(self):self.p=json.loads(PACK.read_text())
 def test_official_correspondences(self):
  m.verify(self.p)
  self.assertEqual([d['original_item_number']for d in self.p['decisions']],[15,16,17,18,21,24])
  self.assertEqual([d['official_answer']for d in self.p['decisions']],list('CECEEE'))
 def test_different_final_key_rejected(self):
  self.p['decisions'][0]['official_answer']='E'
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_incomplete_support_rejected(self):
  self.p['supports'][0]['body']='trecho incompleto'
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_wrong_original_coordinates_rejected(self):
  self.p['decisions'][0]['original_item_number']=19
  with self.assertRaises(ValueError):m.verify(self.p)
 def test_unreviewed_legal_content_rejected(self):
  self.p['decisions'][0]['row']['legal_review_required']=True
  with self.assertRaises(ValueError):m.verify(self.p)

if __name__=='__main__':unittest.main()
