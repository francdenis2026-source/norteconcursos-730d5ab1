import ast,copy,hashlib,html,importlib.util,json,pathlib,re,types,unicodedata,unittest,urllib.parse
ROOT=pathlib.Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('stage',pathlib.Path(__file__).with_name('stage-missing-private-items.py'))
stage=importlib.util.module_from_spec(spec);spec.loader.exec_module(stage)
# Exercise pure extraction/dedup helpers without loading live educational snapshots.
source=ast.parse(pathlib.Path(__file__).with_name('build-missing-item-corpus.py').read_text())
functions=ast.Module(body=[n for n in source.body if isinstance(n,ast.FunctionDef) and n.name in ['sha','norm','parts','canonical','parse_pdf']],type_ignores=[])
helpers=dict(hashlib=hashlib,html=html,re=re,unicodedata=unicodedata)
exec(compile(ast.fix_missing_locations(functions),'<extraction-helpers>','exec'),helpers)
class DedupAndExtraction(unittest.TestCase):
 def test_permuted_alternatives_and_whitespace_are_same_content(self):
  canonical=helpers['canonical']
  self.assertEqual(canonical('A questão? ',{'A':'Uma resposta','B':'Outra resposta'}),canonical('A\nquestão?',{'A':'Outra resposta','B':'Uma   resposta'}))
 def test_meaningful_numbers_accents_and_math_are_preserved(self):
  norm=helpers['norm']
  self.assertNotEqual(norm('Art. 3'),norm('Art. 4'))
  self.assertNotEqual(norm('avó'),norm('avô'))
  self.assertNotEqual(norm('x²'),norm('x2'))
 def test_next_section_passage_does_not_pollute_previous_item(self):
  class Page:
   rect=types.SimpleNamespace(width=595,height=842)
   def __init__(self,lines):self.lines=lines
   def get_text(self,kind):return {'blocks':[{'lines':[{'bbox':box,'spans':[{'text':text}]} for box,text in self.lines]}]}
  doc=[Page([]),Page([((36,70,540,85),'1. Primeira questão'),((36,100,300,115),'(A) alternativa'),((36,120,300,135),'(B) outra alternativa')]),Page([((36,70,100,85),'Inglês'),((36,100,550,115),'Passage belonging to the next section only.'),((36,200,290,215),'2. Segunda questão'),((36,230,290,245),'(A) terceira alternativa'),((36,250,290,265),'(B) quarta alternativa')])]
  items=helpers['parse_pdf'](doc,2)
  self.assertEqual(items[0]['pages'],[2]);self.assertFalse(any('Passage' in x for x in items[0]['lines']))
  self.assertEqual(items[1]['pages'],[3])
class PrivateStaging(unittest.TestCase):
 def setUp(self):
  directory=ROOT/'supabase/imports/idecan/lote02-itens-ausentes-2026-10-23';report=json.loads((directory/'relatorio-deduplicacao.json').read_text());self.packs=[json.loads((directory/(p['booklet']+'-corpus.json')).read_text()) for p in report['packs']]
  self.stores={'question_corpus_sources':{},'question_corpus_candidates':{}};self.writes=[];self.public=[]
 def request(self,endpoint,method='GET',body=None):
  table,_,query=endpoint.partition('?');q=urllib.parse.parse_qs(query)
  if method=='POST':
   self.assertIn(table,self.stores);self.assertEqual(endpoint,table+'?on_conflict=id');self.writes.append(table);created=[]
   for x in body:
    if x['id'] not in self.stores[table]:self.stores[table][x['id']]=copy.deepcopy(x);created.append(copy.deepcopy(x))
   return created
  if table=='board_exam_questions':return self.public
  rows=list(self.stores[table].values());value=q.get('id',[''])[0]
  if value.startswith('eq.'):rows=[x for x in rows if x['id']==value[3:]]
  if value.startswith('in.'):rows=[x for x in rows if x['id'] in value[4:-1].split(',')]
  return copy.deepcopy(rows)
 def test_source_only_preflight_then_idempotent_private_import(self):
  dry=stage.run(self.packs,self.request);self.assertEqual(dry['expected_candidates'],19);self.assertFalse(self.writes)
  result=stage.run(self.packs,self.request,True);self.assertEqual(len(result['inserted_candidates']),19);self.assertTrue(result['complete']);self.assertEqual(result['public_questions_created'],0)
  repeated=stage.run(self.packs,self.request,True);self.assertFalse(repeated['inserted_candidates']);self.assertEqual(len(repeated['preserved_candidates']),19)
 def test_new_public_question_blocks_before_any_write(self):
  self.public=[{'id':'new-public-row','item_number':37}]
  with self.assertRaises(ValueError):stage.run(self.packs,self.request,True)
  self.assertFalse(self.writes)
 def test_preserve_later_review_and_refuse_changed_original(self):
  stage.run(self.packs,self.request,True);cid=self.packs[0]['candidates'][0]['id'];stored=self.stores['question_corpus_candidates'][cid];stored['content_status']='reviewed'
  stage.run(self.packs,self.request,True);self.assertEqual(stored['content_status'],'reviewed')
  stored['payload']['raw_text']='Revisão concorrente alterou o texto';before=len(self.writes)
  with self.assertRaises(ValueError):stage.run(self.packs,self.request,True)
  self.assertEqual(len(self.writes),before)
if __name__=='__main__':unittest.main()
