"""Use synthetic fixtures only; no fixture question becomes a seed or publication."""
import importlib.util,json,pathlib,tempfile,unittest
from unittest.mock import patch
SPEC=importlib.util.spec_from_file_location('scan',pathlib.Path(__file__).with_name('scan-official-portal.py'))
scan=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(scan)
class PortalScan(unittest.TestCase):
 def test_url_scope_and_opaque_download_ids(self):
  for url in ['https://idecan.org.br.evil.test/q.pdf','https://idecan.org.br@evil.test/a','https://evil.test/a','file:///tmp/q','javascript:alert(1)','https://idecan.org.br:bad/a']:
   self.assertIsNone(scan.official_url(url))
  self.assertEqual(scan.official_url('ConcursoDownloadArquivo.aspx?ID2=1&ID=Ab%2Bcd+Ef%3D.pdf&_gl=tracking#x','https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=32'),'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=Ab%2Bcd+Ef%3D.pdf')
  self.assertEqual(scan.official_url('http://antigo-concurso.idecan.org.br/Concurso.aspx?ID=32'),'https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=32')
 def test_candidate_results_are_not_booklets(self):
  for text in ['RESULTADO DAS PROVAS OBJETIVAS','Convocação para provas objetivas','Inscrições homologadas','Resposta aos recursos de gabarito','Edital de aplicação das provas objetivas']:
   self.assertIsNone(scan.document_kind(text))
  self.assertEqual(scan.document_kind('Gabarito definitivo'),'answer_key_definitive_label')
  self.assertEqual(scan.document_kind('Caderno de questões - Agente Tipo A'),'question_booklet_label')
 def test_link_discovery_and_database_separation(self):
  html=b'<a href="/q.pdf"><span>Caderno de provas objetivas</span></a><a href="/g.pdf">Gabarito definitivo</a><a href="/r.pdf">Resultado das provas objetivas</a><a href="https://evil.test/x.pdf">Caderno</a>'
  with tempfile.TemporaryDirectory() as tmp,patch.object(scan,'fetch',return_value=(html,'utf-8',scan.SEEDS[0])):
   r=scan.scan(tmp,max_pages=1)
   self.assertEqual(len(r['documents']),2);self.assertEqual(r['questions_seeded'],0);self.assertEqual(r['questions_extracted'],0)
   self.assertTrue(all(not x['publication_approved'] for x in r['documents']))
 def test_network_failure_and_access_challenge_do_not_create_seeds(self):
  for result in [OSError('Tunnel connection failed: 403 Forbidden'),(b'<title>Just a moment</title><script src="/challenge-platform/a.js"></script>','utf-8',scan.SEEDS[0])]:
   kwargs={'side_effect':result} if isinstance(result,Exception) else {'return_value':result}
   with tempfile.TemporaryDirectory() as tmp,patch.object(scan,'fetch',**kwargs),patch.object(scan.time,'sleep'):
    r=scan.scan(tmp)
    self.assertEqual(r['summary']['pages_read'],0);self.assertEqual(r['summary']['coverage'],'incomplete');self.assertEqual(r['documents'],[])
    self.assertEqual(r['questions_seeded'],0)
 def test_download_rejects_html_masquerading_as_pdf(self):
  listing=b'<a href="/q.pdf">Caderno de provas objetivas</a>'
  with tempfile.TemporaryDirectory() as tmp,patch.object(scan,'fetch',side_effect=[(listing,'utf-8',scan.SEEDS[0]),(b'<html>login</html>','utf-8',scan.SEEDS[0])]),patch.object(scan.time,'sleep'):
   r=scan.scan(tmp,max_pages=1,download=True)
   self.assertEqual(r['documents'][0]['status'],'download_failed');self.assertFalse((pathlib.Path(tmp)/'pdfs').exists())
if __name__=='__main__':unittest.main()
