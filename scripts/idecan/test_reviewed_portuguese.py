import unittest,importlib.util,json,pathlib,tempfile,copy,urllib.parse,hashlib
SPEC=importlib.util.spec_from_file_location('publisher',pathlib.Path(__file__).with_name('publish-reviewed-portuguese.py'));mod=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(mod)
PACK=pathlib.Path('supabase/imports/idecan/revisao-cuidadosa/publicacao-portugues-10.json')
class Fake:
 def __init__(self,pack):
  self.pack=copy.deepcopy(pack);self.candidates={c['candidate']:dict(id=c['candidate'],content_status='reviewed',payload=copy.deepcopy(c['expected_payload'])) for c in pack['changes']};self.public={};self.sources={};self.writes=0;self.audits=0;self.topic_current=True
 def request(self,url,method='GET',body=None,prefer=None):
  if method=='POST':
   self.writes+=1
   if url.startswith('rpc/'):
    old=self.candidates[body['candidate']]
    if old['payload']==body['next_payload']:return 'unchanged'
    if old['payload']!=body['expected_payload']:raise ValueError('Stale review')
    old['payload']=copy.deepcopy(body['next_payload']);self.audits+=1;return 'updated'
   table=url.split('?')[0];target=self.sources if table=='content_sources' else self.public;created=[]
   for row in body:
    if row['id'] not in target:target[row['id']]=copy.deepcopy(row);created.append(row)
   return created
  table=url.split('?')[0];params=urllib.parse.parse_qs(url.split('?',1)[1]);ident=params.get('id',['eq.'])[0][3:]
  if table=='question_corpus_candidates':return [copy.deepcopy(self.candidates[ident])]
  if table=='syllabus_topics':return [dict(id=ident,edition_id='a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff',discipline='Língua Portuguesa',content_status='current' if self.topic_current else 'archived')]
  if table=='syllabus_editions':return [dict(id=ident,status='active',source_id='edital-source')]
  if table=='content_sources':
   if ident=='edital-source':return [dict(is_official=True,status='vigente',url=self.pack['evidence']['pf-edital']['url'])]
   if 'url' in params:return [s for s in self.sources.values() if s['url']==params['url'][0][3:]]
   return [copy.deepcopy(self.sources[ident])] if ident in self.sources else []
  if table=='curated_question_catalog':
   if 'or' in params:ident=params['or'][0].split('id.eq.')[1].split(',')[0]
   return [copy.deepcopy(self.public[ident])] if ident in self.public else []
  if table=='board_exam_questions':return []
  raise AssertionError(url)
class Test(unittest.TestCase):
 def setUp(self):self.pack=json.loads(PACK.read_text());self.fake=Fake(self.pack);self.tmp=tempfile.TemporaryDirectory();self.report=pathlib.Path(self.tmp.name)/'report.json'
 def tearDown(self):self.tmp.cleanup()
 def test_preflight_has_no_mutations(self):
  mod.run(self.pack,self.fake.request,self.report);self.assertEqual(self.fake.writes,0)
 def test_apply_and_retry_preserve_audit_and_original(self):
  first=mod.run(self.pack,self.fake.request,self.report,True);second=mod.run(self.pack,self.fake.request,self.report,True)
  self.assertTrue(first['complete']);self.assertTrue(second['complete']);self.assertEqual(len(self.fake.public),10);self.assertEqual(self.fake.audits,10);self.assertEqual(second['published_ids'],[])
  for c in self.pack['changes']:self.assertEqual(self.fake.candidates[c['candidate']]['payload']['raw_text'],c['expected_payload']['raw_text'])
 def test_late_concurrent_review_blocks_all_writes(self):
  c=self.pack['changes'][-1];self.fake.candidates[c['candidate']]['payload']['review_note']='Outra revisão'
  with self.assertRaisesRegex(ValueError,'Stale'):mod.run(self.pack,self.fake.request,self.report,True)
  self.assertEqual(self.fake.writes,0)
 def test_archived_syllabus_blocks_publication(self):
  self.fake.topic_current=False
  with self.assertRaisesRegex(ValueError,'syllabus'):mod.run(self.pack,self.fake.request,self.report,True)
  self.assertEqual(self.fake.writes,0)
 def test_existing_published_opinion_is_protected(self):
  row=copy.deepcopy(self.pack['publications'][0]);row['explanation']='Outra explicação';self.fake.public[row['id']]=row
  with self.assertRaisesRegex(ValueError,'protected'):mod.run(self.pack,self.fake.request,self.report,True)
  self.assertEqual(self.fake.writes,0)
 def test_integrity_and_incomplete_context_rejected(self):
  for key in ['pcce-escrivao','pcce-key','pf-edital']:
   b=('%PDF-fixture-'+key).encode();(pathlib.Path(self.tmp.name)/(key+'.pdf')).write_bytes(b);self.pack['evidence'][key]['sha256']=hashlib.sha256(b).hexdigest()
  self.assertTrue(mod.validate(self.pack,self.tmp.name))
  self.pack['changes'][0]['next_payload']['individual_review']['context_complete']=False
  with self.assertRaisesRegex(ValueError,'Incomplete'):mod.validate(self.pack,self.tmp.name)
if __name__=='__main__':unittest.main()
