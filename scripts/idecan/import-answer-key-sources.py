"""Read-only preflight by default. Credential from stdin; --apply inserts only private reference sources."""
import sys,json,pathlib,urllib.request,urllib.parse,datetime,re
BASE='https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'
def run(sources,request,apply=False):
 def rows(table,columns):
  result=[]
  for offset in range(0,20000,1000):
   data=request(table+'?'+urllib.parse.urlencode(dict(select=columns,limit=1000,offset=offset,order='id.asc')))
   result.extend(data)
   if len(data)<1000:return result
  raise ValueError('Inventory exceeds safe pagination bound; no writes permitted')
 existing=rows('question_corpus_sources','id,title,publisher,metadata')
 content=rows('content_sources','id,title,url')
 hashes={};urls={}
 def inspect(value,reference,key=''):
  if isinstance(value,dict):
   for k,v in value.items():inspect(v,reference,k)
  elif isinstance(value,list):
   for v in value:inspect(v,reference,key)
  elif isinstance(value,str):
   if (key=='id' or 'sha256' in key.lower()) and re.fullmatch('[a-f0-9]{64}',value):hashes.setdefault(value,reference)
   if key.lower().endswith('url') and value.startswith('https://'):urls.setdefault(value,reference)
 for x in existing:inspect(x,dict(table='question_corpus_sources',id=x['id'],title=x['title']))
 for x in content:inspect(x,dict(table='content_sources',id=x['id'],title=x['title']))
 if len({s['id'] for s in sources})!=len(sources):raise ValueError('Repeated document inside batch')
 plan=[]
 for source in sources:
  m=source['metadata']
  if source['publisher']!='IDECAN' or m.get('document_kind') not in ['answer_key','answer_key_correction'] or m.get('questions_extracted')!=0 or m.get('question_candidates_created')!=0 or m.get('publication_approved') is not False or not source['raw_text'].strip():raise ValueError('Non-reference document rejected')
  ref=hashes.get(source['id']) or urls.get(m['source_url'])
  plan.append(dict(id=source['id'],title=source['title'],action='preserve_existing_reference' if ref else 'insert_private_reference',existing_reference=ref))
 report=dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),applied=apply,plan=plan,inserted=[],preserved=[],confirmed=[],question_candidates_created=0,student_questions_created=0,complete=False)
 if not apply:return report
 for source,item in zip(sources,plan):
  if item['existing_reference']:
   report['preserved'].append(item);continue
  endpoint='question_corpus_sources?'+urllib.parse.urlencode({'select':'*','id':'eq.'+source['id']})
  current=request(endpoint)
  if current:
   if len(current)!=1 or current[0]['raw_text']!=source['raw_text']:raise ValueError('Concurrent source differs; preserved without overwrite')
   report['preserved'].append(dict(id=source['id'],title=source['title'],reason='concurrent_existing_source'));continue
  created=request('question_corpus_sources?on_conflict=id','POST',[source])
  confirmed=request(endpoint)
  if len(confirmed)!=1 or any(confirmed[0].get(k)!=source[k] for k in ['id','raw_text','page_count']):raise ValueError('Source readback mismatch; stop without overwriting')
  if created:report['inserted'].append(dict(id=source['id'],title=source['title']))
  else:report['preserved'].append(dict(id=source['id'],title=source['title'],reason='concurrent_existing_source'))
  report['confirmed'].append(dict(id=source['id'],title=source['title'],page_count=confirmed[0]['page_count'],document_kind=confirmed[0]['metadata'].get('document_kind')))
 report['complete']=len(report['inserted'])+len(report['preserved'])==len(sources)
 return report
if __name__=='__main__':
 sources=json.loads(pathlib.Path(sys.argv[1]).read_text());key=sys.stdin.readline().strip()
 if not key:raise SystemExit('Missing session credential')
 def request(endpoint,method='GET',body=None):
  if method!='GET' and (method!='POST' or endpoint!='question_corpus_sources?on_conflict=id'):raise ValueError('Only private source insertion is permitted')
  h={'apikey':key,'Content-Type':'application/json','Prefer':'resolution=ignore-duplicates,return=representation'}
  r=urllib.request.Request(BASE+endpoint,headers=h,method=method,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  with urllib.request.urlopen(r,timeout=40) as response:
   data=response.read();return json.loads(data) if data else None
 result=run(sources,request,'--apply' in sys.argv)
 pathlib.Path(sys.argv[2]).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(result,ensure_ascii=False))
