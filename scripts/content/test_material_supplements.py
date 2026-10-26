import unittest,json,pathlib,math,importlib.util,urllib.parse,copy
ROOT=pathlib.Path(__file__).resolve().parents[2];FOLDER=ROOT/'supabase/imports/materials-content-2026-10-24'
spec=importlib.util.spec_from_file_location('publisher',ROOT/'scripts/content/publish-material-supplements.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class Supplements(unittest.TestCase):
 def test_content_and_distinctness(self):
  p=json.loads((FOLDER/'supplements.json').read_text());self.assertEqual(p['new_exercises'],480);self.assertEqual(len(p['materials']),40)
  seen=set()
  for row in p['materials']:
   self.assertEqual(len(row['quiz']),20);self.assertEqual(row['quiz'][:8],row['before_quiz']);self.assertTrue(row['syllabus_topic_id']);self.assertTrue(row['source_url'].startswith('https://'))
   for q in row['additional_quiz']:
    key=' '.join(q['q'].casefold().split());self.assertNotIn(key,seen);seen.add(key);self.assertIsInstance(q['a'],bool);self.assertIn('Exemplo:',q['why'])
 def test_calculations_and_logic(self):
  checks=json.loads((FOLDER/'calculation-checks.json').read_text());self.assertGreater(len(checks),90)
  for c in checks:
   if 'truth' in c:
    t=c['truth'];self.assertIn(t['p'],[True,False]);self.assertEqual(t['op'],'implies');continue
   result=eval(c['expression'],{'__builtins__':{}},{'sqrt':math.sqrt,'comb':math.comb,'factorial':math.factorial})
   self.assertAlmostEqual(result,c['expected'],places=8,msg=c['q'])
  package=json.loads((FOLDER/'supplements.json').read_text());byq={q['q']:q for row in package['materials'] for q in row['additional_quiz']}
  for c in checks:
   if 'truth' in c:
    t=c['truth'];truth=(not t['p']) or t['q'];self.assertEqual(byq[c['q']]['a'],truth==t['claim'])
   else:self.assertEqual(byq[c['q']]['a'],math.isclose(c['claim'],c['expected'],rel_tol=1e-9,abs_tol=1e-9),c['q'])
 def fake_request(self,package,after=False):
  rows=package['materials'];byid={r['id']:r for r in rows};topics={r['syllabus_topic_id']:r for r in rows};editions={r['edition_id']:r for r in rows};sources={r['source_id']:r for r in rows};calls=[]
  def request(path,method='GET',body=None):
   calls.append((path,method,body));table,query=path.split('?',1);q=urllib.parse.parse_qs(query);key=q['id'][0][3:]
   self.assertEqual(method,'GET','no write expected')
   if table=='study_materials':
    r=byid[key];return [dict(id=key,slug=r['slug'],discipline=r['discipline'],content_status='active',quiz=r['quiz'] if after else r['before_quiz'],updated_at='2026-10-24T12:00:00Z')]
   if table=='syllabus_topics':
    r=topics[key];return [dict(id=key,edition_id=r['edition_id'],content_status='current',topic_text=r['syllabus_topic_text'])]
   if table=='syllabus_editions':
    r=editions[key];return [dict(id=key,status='active',source_id=r['source_id'])]
   if table=='content_sources':
    r=sources[key];return [dict(id=key,is_official=True,url=r['source_url'])]
   self.fail(table)
  return request,calls
 def test_concurrent_change_fails_before_any_write(self):
  package=json.loads((FOLDER/'supplements.json').read_text());request,calls=self.fake_request(package)
  def changed(path,method='GET',body=None):
   result=request(path,method,body)
   if path.startswith('study_materials?'):result[0]['quiz']=[dict(q='Alteração recente',a=True,why='Preservar')]
   return result
  with self.assertRaisesRegex(AssertionError,'changed since authoring'):module.publish(package,changed,True)
  self.assertTrue(all(method=='GET' for _,method,_ in calls))
 def test_idempotent_replay_preserves_published_content(self):
  package=json.loads((FOLDER/'supplements.json').read_text());request,calls=self.fake_request(package,True)
  result=module.publish(package,request,True)
  self.assertTrue(result['complete']);self.assertEqual(len(result['confirmed']),40);self.assertEqual(sum(x['added'] for x in result['confirmed']),0)
  self.assertTrue(all(method=='GET' for _,method,_ in calls))
if __name__=='__main__':unittest.main()
