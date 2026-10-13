"""Regression checks for exact additive concurrency evidence, without a live database."""
import copy,hashlib,json,subprocess,tempfile,unittest
from pathlib import Path

HELPER=Path(__file__).with_name('verify-course-with-concurrent-courses.py').resolve()
def digest(row):return hashlib.sha256(json.dumps(row,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()

class ReadbackGuards(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name)
  self.unit=dict(id='unit',course_id='course',unit_key='art-1',body_text='Texto',content_sha256=hashlib.sha256(b'Texto').hexdigest(),content_status='current')
  self.prior=dict(unit_id='unit',content_sha256=self.unit['content_sha256'],simples='Anterior',pontos=[],atencao=[],exemplo='Anterior',prova=[],termos=[],remissoes=[],status='published',reviewed_by=None,reviewed_at=None,updated_at='2026-10-13T08:00:00+00:00')
  self.row={k:self.prior[k] for k in ['unit_id','content_sha256','simples','pontos','atencao','exemplo','prova','termos','remissoes']};self.row['simples']='Revisado';self.row['course_slug']='transito';self.row['expected']=self.prior
  applied={**self.prior,**{k:v for k,v in self.row.items() if k not in ['expected','course_slug']},'reviewed_by':'admin','reviewed_at':'2026-10-13T09:00:00+00:00','updated_at':'2026-10-13T09:00:00+00:00'}
  self.before=dict(legal_courses=[dict(id='course',slug='transito',syllabus_topic_id='topic')],legal_course_units=[self.unit],legal_unit_explanations=[self.prior],study_materials=[],study_material_enrichments=[],syllabus_topics=[dict(id='topic',edition_id='edition')],syllabus_editions=[dict(id='edition',source_id='source')],content_sources=[dict(id='source',title='Edital')])
  self.after=copy.deepcopy(self.before);self.after['legal_unit_explanations']=[applied];self.after['syllabus_topics'].append(dict(id='foreign-topic',edition_id='other-edition'));self.after['content_sources'].append(dict(id='foreign-source',title='Fonte concorrente'))
  self.manifest=dict(kind='explicit_foreign_metadata_additions',target_course_id='course',target_edition_id='edition',tables={t:[dict(id=r['id'],sha256=digest(r)) for r in self.after[t] if r['id'].startswith('foreign-')] for t in ['syllabus_topics','content_sources']})
 def tearDown(self):self.temp.cleanup()
 def run_check(self,allow=True):
  for stage,rows in [('before',self.before),('after',self.after)]:
   (self.root/stage).mkdir(exist_ok=True)
   for table,data in rows.items():(self.root/stage/(table+'.json')).write_text(json.dumps(data))
  (self.root/'pack.json').write_text(json.dumps(dict(units=[self.row])));(self.root/'additions.json').write_text(json.dumps(self.manifest))
  args=[str(HELPER),str(self.root),'before','after',str(self.root/'pack.json'),str(self.root/'report.json'),'transito']
  if allow:args+=['-',str(self.root/'additions.json')]
  return subprocess.run(['python3',*args],capture_output=True,text=True)
 def test_explicit_additions_preserve_every_existing_row(self):
  result=self.run_check();self.assertEqual(result.returncode,0,result.stderr);report=json.loads((self.root/'report.json').read_text());self.assertEqual(len(report['protected_existing_rows_unchanged']),6);self.assertNotIn('syllabus_topics',report['protected_tables_unchanged'])
 def test_default_rejects_metadata_growth(self):self.assertNotEqual(self.run_check(False).returncode,0)
 def test_foreign_edition_requires_exact_additive_evidence(self):
  row=dict(id='foreign-edition',source_id='foreign-source');self.after['syllabus_editions'].append(row)
  self.assertNotEqual(self.run_check().returncode,0)
  self.manifest['tables']['syllabus_editions']=[dict(id=row['id'],sha256=digest(row))]
  self.assertEqual(self.run_check().returncode,0)
  self.after['syllabus_editions'][0]['source_id']='changed'
  self.assertNotEqual(self.run_check().returncode,0)
 def test_existing_protected_row_change_rejected(self):
  self.after['syllabus_topics'][0]['edition_id']='other';self.assertNotEqual(self.run_check().returncode,0)
 def test_unlisted_addition_rejected(self):
  self.after['content_sources'].append(dict(id='unlisted',title='Extra'));self.assertNotEqual(self.run_check().returncode,0)
 def test_changed_added_row_rejected(self):
  self.after['content_sources'][-1]['title']='Alterada';self.assertNotEqual(self.run_check().returncode,0)
 def test_addition_in_target_edition_rejected_even_with_matching_hash(self):
  row=self.after['syllabus_topics'][-1];row['edition_id']='edition';self.manifest['tables']['syllabus_topics'][0]['sha256']=digest(row);self.assertNotEqual(self.run_check().returncode,0)

if __name__=='__main__':unittest.main()
