import unittest,importlib.util,pathlib,json,tempfile,copy,urllib.parse
sp=importlib.util.spec_from_file_location('held',pathlib.Path(__file__).with_name('apply-retained-legal-corrections.py'));m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
class Test(unittest.TestCase):
 def setUp(self):
  self.pack=json.loads(pathlib.Path('supabase/imports/idecan/revisao-cuidadosa/correcoes-juridicas-retidas.json').read_text());self.rows={c['id']:copy.deepcopy(c['expected']) for c in self.pack['changes']};self.audits={};self.patches=0;self.fail_audit=False;self.tmp=tempfile.TemporaryDirectory();self.report=pathlib.Path(self.tmp.name)/'report.json'
 def tearDown(self):self.tmp.cleanup()
 def request(self,url,method='GET',body=None,prefer=None):
  table=url.split('?')[0];params=urllib.parse.parse_qs(url.split('?')[1])
  if table=='content_sources':return [dict(id='source',is_official=True)]
  if table=='idecan_pedagogical_review_audit':
   if method=='POST':
    if self.fail_audit:self.fail_audit=False;raise RuntimeError('interrupted')
    for a in body:self.audits.setdefault(a['question_id'],copy.deepcopy(a))
    return body
   ident=params['question_id'][0][3:];return [copy.deepcopy(self.audits[ident])] if ident in self.audits else []
  if method=='PATCH':
   c=next(c for c in self.pack['changes'] if m.guard.guarded_path(c['expected'])==url)
   if self.rows[c['id']]!=c['expected']:return []
   self.rows[c['id']].update(body);self.patches+=1;return [copy.deepcopy(self.rows[c['id']])]
  return [copy.deepcopy(self.rows[params['id'][0][3:]])]
 def test_no_activation_or_key_change(self):
  p=copy.deepcopy(self.pack);p['changes'][0]['patch']['content_status']='active'
  with self.assertRaises(ValueError):m.validate(p)
  p=copy.deepcopy(self.pack);p['changes'][0]['patch']['official_answer']='X'
  with self.assertRaises(ValueError):m.validate(p)
 def test_interrupted_audit_resumes_without_second_patch(self):
  self.fail_audit=True
  with self.assertRaisesRegex(RuntimeError,'interrupted'):m.run(self.pack,self.request,self.report,True)
  self.assertEqual(self.patches,1)
  self.assertTrue(m.run(self.pack,self.request,self.report,True)['complete']);self.assertEqual(self.patches,5);self.assertEqual(len(self.audits),5)
  m.run(self.pack,self.request,self.report,True);self.assertEqual(self.patches,5)
  for c in self.pack['changes']:self.assertEqual(self.rows[c['id']]['official_answer'],c['expected']['official_answer'])
 def test_stale_last_item_prevents_all_mutations(self):
  self.rows[self.pack['changes'][-1]['id']]['review_note']='Outra revisão'
  with self.assertRaisesRegex(ValueError,'Stale'):m.run(self.pack,self.request,self.report,True)
  self.assertEqual(self.patches,0)
if __name__=='__main__':unittest.main()
