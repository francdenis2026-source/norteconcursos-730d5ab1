"""Stage only new private question candidates; no public catalog mutations. Key from stdin."""
import sys,json,pathlib,urllib.request,urllib.parse,datetime,hashlib
BASE='https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'
def run(packs,request,apply=False,save=lambda result:None):
 def digest(s):return hashlib.sha256(s.encode()).hexdigest()
 expected=[]
 for p in packs:
  s=p['source']
  if s['publisher']!='IDECAN' or s['metadata'].get('publication_approved') is not False:raise ValueError('Source cannot authorize publication')
  for c in p['candidates']:
   if c['id']!=digest(s['id']+':'+c['source_key']) or c['corpus_id']!=s['id'] or c['content_status']!='under_review' or c['payload'].get('publication') or c['payload'].get('publication_approved') is not False or c['payload'].get('annulled_in_document') or not c['payload']['raw_text'].strip():raise ValueError('Invalid/unapproved private candidate')
   expected.append(c['id'])
 if len(expected)!=len(set(expected)):raise ValueError('Repeated candidate inside batch')
 # Preflight all source bodies and IDs before any insertion.
 preserved=[]
 for p in packs:
  s=p['source'];stored=request('question_corpus_sources?'+urllib.parse.urlencode({'select':'*','id':'eq.'+s['id']}))
  if stored and (len(stored)!=1 or stored[0]['raw_text']!=s['raw_text']):raise ValueError('Existing source differs; preserved without overwrite')
  ids=','.join(c['id'] for c in p['candidates'])
  found=request('question_corpus_candidates?'+urllib.parse.urlencode({'select':'*','id':'in.('+ids+')','limit':'1000'}))
  by={c['id']:c for c in p['candidates']}
  for c in found:
   if c['payload']['raw_text']!=by[c['id']]['payload']['raw_text']:raise ValueError('Existing candidate differs; preserved without overwrite')
   preserved.append(c['id'])
  # A final identity check catches questions inserted into the main catalog after extraction.
  identity=s['metadata'];nums=','.join(str(c['payload']['item_number']) for c in p['candidates'])
  matching=request('board_exam_questions?'+urllib.parse.urlencode({'select':'id,item_number','board':'eq.IDECAN','contest_name':'eq.'+identity['contest_name'],'exam_year':'eq.'+str(identity['exam_year']),'exam_type':'eq.'+identity['exam_type'],'item_number':'in.('+nums+')'}))
  if matching:raise ValueError('Public questions appeared after extraction; refresh deduplication before importing')
 result=dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),applied=apply,expected_candidates=len(expected),inserted_sources=[],inserted_candidates=[],preserved_candidates=preserved,confirmed=[],public_questions_created=0,complete=False)
 save(result)
 if not apply:return result
 for p in packs:
  s=p['source']
  created=request('question_corpus_sources?on_conflict=id','POST',[s])
  result['inserted_sources'].extend(x['id'] for x in created);save(result)
  fresh=request('question_corpus_candidates?on_conflict=id','POST',p['candidates'])
  result['inserted_candidates'].extend(x['id'] for x in fresh);save(result)
  ids=','.join(c['id'] for c in p['candidates'])
  stored=request('question_corpus_candidates?'+urllib.parse.urlencode({'select':'*','id':'in.('+ids+')','limit':'1000'}))
  by={c['id']:c for c in p['candidates']}
  if len(stored)!=len(by) or any(c['payload']['raw_text']!=by[c['id']]['payload']['raw_text'] for c in stored):raise ValueError('Readback failed; stop and inspect without overwriting')
  result['confirmed'].extend(dict(id=c['id'],corpus_id=c['corpus_id'],item_number=c['payload']['item_number'],status=c['content_status']) for c in stored);save(result)
 result['complete']=len(result['confirmed'])==len(expected);save(result);return result
if __name__=='__main__':
 directory=pathlib.Path(sys.argv[1]);report=json.loads((directory/'report.json').read_text());packs=[json.loads((directory/(x['booklet']+'-corpus.json')).read_text()) for x in report['packs']]
 assert {c['id'] for p in packs for c in p['candidates']}=={x['candidate_id'] for x in report['staged']}
 key=sys.stdin.readline().strip()
 if not key:raise SystemExit('Missing session credential')
 def request(path,method='GET',body=None):
  if method!='GET' and (method!='POST' or path not in ['question_corpus_sources?on_conflict=id','question_corpus_candidates?on_conflict=id']):raise ValueError('Mutation outside private staging is forbidden')
  req=urllib.request.Request(BASE+path,headers={'apikey':key,'Content-Type':'application/json','Prefer':'resolution=ignore-duplicates,return=representation'},method=method,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  with urllib.request.urlopen(req,timeout=45) as res:
   data=res.read();return json.loads(data) if data else []
 output=pathlib.Path(sys.argv[2]);save=lambda r:output.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(run(packs,request,'--apply' in sys.argv,save),ensure_ascii=False))
