"""Bounded publication of exactly three individually verified use-of-force questions.
Uses the same guarded updates, private recovery report and before/after audit as retained corrections.
"""
import importlib.util,pathlib,json,sys,urllib.request,datetime
sp=importlib.util.spec_from_file_location('audited',pathlib.Path(__file__).with_name('apply-retained-legal-corrections.py'));audited=importlib.util.module_from_spec(sp);sp.loader.exec_module(audited)
TOPIC='afaf633e-5b3a-4ed9-96ae-a1a9a352c339'
URLS={'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm'}
def validate(pack,now=None):
 if pack['batch_id']!='idecan-use-of-force-3-v1' or len(pack['changes'])!=3 or {c['local_index'] for c in pack['changes']}!={30,33,207}:raise ValueError('Only approved three-item batch permitted')
 for c in pack['changes']:
  p,e=c['patch'],c['evidence']
  if c['expected']['content_status']!='under_review' or p['content_status']!='active' or p['syllabus_topic_id']!=TOPIC or p['legal_review_required'] is not False:raise ValueError('Scope differs')
  if set(p)-{'explanation','legal_basis','law_version_checked_at','legal_review_required','syllabus_topic_id','tested_topic','content_status','review_note'}:raise ValueError('Original wording or key protected')
  if any(e.get(k) is not True for k in ['publication_approved','context_complete','answer_verified','legal_current']):raise ValueError('Final review incomplete')
  if any(b['url'] not in URLS or not b['artigo'] for b in p['legal_basis']) or not p['legal_basis']:raise ValueError('Wrong legal basis')
  if any(s['url'] not in URLS or len(s['sha256'])!=64 for s in e['sources']):raise ValueError('Primary evidence missing')
  stamp=datetime.datetime.fromisoformat(p['law_version_checked_at']);now=now or datetime.datetime.now(datetime.timezone.utc)
  if stamp>now or (now-stamp).days>7:raise ValueError('Recheck current primary sources')
  if 'Exemplo prático:' not in p['explanation'] or 'Erro comum:' not in p['explanation']:raise ValueError('Teaching explanation incomplete')
 return True

def preflight(pack,request):
 topic=request('syllabus_topics?select=*&id=eq.'+TOPIC)
 if len(topic)!=1 or topic[0]['content_status']!='current' or '13.060' not in topic[0]['topic_text'] or '12.341' not in topic[0]['topic_text']:raise ValueError('Syllabus topic changed')
 edition=request('syllabus_editions?select=*&id=eq.'+topic[0]['edition_id'])
 if len(edition)!=1 or edition[0]['status']!='active':raise ValueError('Edition not active')
 source=request('content_sources?select=*&id=eq.'+edition[0]['source_id'])
 if len(source)!=1 or source[0]['status']!='vigente' or not source[0]['is_official'] or any(c['evidence']['syllabus_url']!=source[0]['url'] for c in pack['changes']):raise ValueError('Official syllabus source changed')
 import urllib.parse
 for url in URLS:
  rows=request('content_sources?select=id,is_official,status&url=eq.'+urllib.parse.quote(url,safe=''))
  if len(rows)!=1 or not rows[0]['is_official'] or rows[0]['status']!='vigente':raise ValueError('Legal source not registered as current')
if __name__=='__main__':
 pack=json.loads(pathlib.Path(sys.argv[1]).read_text());validate(pack);key=sys.stdin.readline().strip()
 def request(path,method='GET',body=None,prefer='return=representation'):
  headers={'apikey':key,'Content-Type':'application/json','Prefer':prefer}
  if key.count('.')==2:headers['Authorization']='Bearer '+key
  req=urllib.request.Request('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'+path,method=method,headers=headers,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  with urllib.request.urlopen(req,timeout=45) as r:
   b=r.read();return json.loads(b) if b else None
 preflight(pack,request);r=audited.run(pack,request,sys.argv[2],len(sys.argv)>3 and sys.argv[3]=='--apply',policy=validate);print(json.dumps(dict(complete=r['complete'],confirmed=len(r['rows']),applied=r['applied'])),flush=True)
