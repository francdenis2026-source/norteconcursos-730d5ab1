import copy,importlib.util,pathlib,unittest,urllib.parse
spec=importlib.util.spec_from_file_location('importer',pathlib.Path(__file__).with_name('import-answer-key-sources.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class PrivateSourceImport(unittest.TestCase):
 def setUp(self):
  self.rows={};self.mutations=[]
  self.source=dict(id='a'*64,title='Gabarito de teste',publisher='IDECAN',publication_year=2021,page_count=1,raw_text='GABARITO DEFINITIVO — exemplo sintético',metadata=dict(document_kind='answer_key',source_url='https://antigo-concurso.idecan.org.br/test.pdf',questions_extracted=0,question_candidates_created=0,publication_approved=False))
 def request(self,endpoint,method='GET',body=None):
  table,_,query=endpoint.partition('?');q=urllib.parse.parse_qs(query)
  if method=='POST':
   self.assertEqual(endpoint,'question_corpus_sources?on_conflict=id');self.mutations.append(endpoint)
   result=[]
   for row in body:
    if row['id'] not in self.rows:self.rows[row['id']]=copy.deepcopy(row);result.append(copy.deepcopy(row))
   return result
  if table=='content_sources':return []
  self.assertEqual(table,'question_corpus_sources')
  if 'id' in q:return [copy.deepcopy(self.rows[q['id'][0][3:]])] if q['id'][0][3:] in self.rows else []
  return list(copy.deepcopy(self.rows).values()) if int(q.get('offset',['0'])[0])==0 else []
 def test_dry_run_and_idempotent_source_only_application(self):
  dry=module.run([self.source],self.request);self.assertFalse(self.mutations)
  self.assertEqual(dry['plan'][0]['action'],'insert_private_reference')
  result=module.run([self.source],self.request,True);self.assertTrue(result['complete']);self.assertEqual(len(result['inserted']),1)
  repeated=module.run([self.source],self.request,True)
  self.assertEqual(len(repeated['preserved']),1);self.assertEqual(len(self.mutations),1)
  self.assertEqual(result['question_candidates_created'],0);self.assertEqual(result['student_questions_created'],0)
 def test_existing_embedded_key_is_preserved(self):
  self.rows['b'*64]=dict(id='b'*64,title='Caderno já cadastrado',publisher='IDECAN',metadata={'answer_key_sha256':self.source['id']})
  result=module.run([self.source],self.request,True)
  self.assertEqual(len(result['preserved']),1);self.assertFalse(self.mutations)
 def test_source_containing_question_publication_is_rejected(self):
  source=copy.deepcopy(self.source);source['metadata']['publication_approved']=True
  with self.assertRaises(ValueError):module.run([source],self.request,True)
  self.assertFalse(self.mutations)
 def test_repeated_document_inside_batch_is_rejected(self):
  with self.assertRaises(ValueError):module.run([self.source,self.source],self.request,True)
  self.assertFalse(self.mutations)
if __name__=='__main__':unittest.main()
