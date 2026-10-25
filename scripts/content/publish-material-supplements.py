"""Publish additive, non-normative material quizzes with optimistic concurrency.
Credential from stdin only. Never changes states, legal texts, approvals or the public question catalog.
"""
import json,sys,pathlib,urllib.request,urllib.parse,hashlib,datetime,re
BASE='https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def publish(package,request,apply=False,save=lambda r:None):
 rows=package['materials'];assert len(rows)==40 and package['new_exercises']==480
 plan=[];seen=set()
 for row in rows:
  assert row['id'] not in seen;seen.add(row['id'])
  assert not re.search(r'direito|legisla|contabilidade',row['discipline'],re.I)
  assert len(row['before_quiz'])==8 and len(row['additional_quiz'])==12 and len(row['quiz'])==20
  assert row['quiz']==row['before_quiz']+row['additional_quiz']
  assert row['before_sha256']==digest(row['before_quiz']) and row['after_sha256']==digest(row['quiz'])
  stored=request('study_materials?'+urllib.parse.urlencode(dict(id='eq.'+row['id'],select='id,slug,discipline,quiz,content_status,updated_at')))
  assert len(stored)==1;current=stored[0]
  assert current['slug']==row['slug'] and current['discipline']==row['discipline'] and current['content_status']=='active'
  topic=request('syllabus_topics?'+urllib.parse.urlencode(dict(id='eq.'+row['syllabus_topic_id'],select='id,edition_id,content_status,topic_text')))
  assert len(topic)==1 and topic[0]['content_status']=='current' and topic[0]['edition_id']==row['edition_id'] and topic[0]['topic_text']==row['syllabus_topic_text']
  edition=request('syllabus_editions?'+urllib.parse.urlencode(dict(id='eq.'+row['edition_id'],select='id,status,source_id')))
  assert len(edition)==1 and edition[0]['status']=='active' and edition[0]['source_id']==row['source_id']
  source=request('content_sources?'+urllib.parse.urlencode(dict(id='eq.'+row['source_id'],select='id,is_official,url')))
  assert len(source)==1 and source[0]['is_official'] and source[0]['url']==row['source_url']
  actual=digest(current['quiz'] or [])
  if actual==row['after_sha256']:plan.append(dict(row=row,current=current,skip=True));continue
  assert actual==row['before_sha256'],'Material changed since authoring; preserve and inspect: '+row['slug']
  plan.append(dict(row=row,current=current,skip=False))
 report=dict(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),applied=apply,expected=40,confirmed=[],complete=False,public_catalog_rows_added=0,legal_content_modified=False)
 save(report)
 if not apply:return report
 for p in plan:
  row=p['row'];current=p['current']
  if not p['skip']:
   query=urllib.parse.urlencode({'id':'eq.'+row['id'],'updated_at':'eq.'+current['updated_at']})
   changed=request('study_materials?'+query,'PATCH',{'quiz':row['quiz']})
   assert len(changed)==1,'Concurrent update; stop without overwrite: '+row['slug']
  verified=request('study_materials?'+urllib.parse.urlencode({'id':'eq.'+row['id'],'select':'id,slug,quiz,content_status'}))
  assert len(verified)==1 and verified[0]['content_status']=='active' and digest(verified[0]['quiz'])==row['after_sha256']
  report['confirmed'].append(dict(id=row['id'],slug=row['slug'],questions=20,added=0 if p['skip'] else 12,sha256=row['after_sha256']));save(report)
 report['complete']=len(report['confirmed'])==40;save(report);return report
if __name__=='__main__':
 package=json.loads(pathlib.Path(sys.argv[1]).read_text());output=pathlib.Path(sys.argv[2]);key=sys.stdin.readline().strip();assert key
 cache={}
 def request(path,method='GET',body=None):
  cacheable=method=='GET' and not path.startswith('study_materials?')
  if cacheable and path in cache:return cache[path]
  assert method=='GET' or (method=='PATCH' and path.startswith('study_materials?') and set(body)=={'quiz'})
  req=urllib.request.Request(BASE+path,headers={'apikey':key,'Content-Type':'application/json','Prefer':'return=representation'},method=method,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  try:
   with urllib.request.urlopen(req,timeout=40) as r:result=json.load(r)
   if cacheable:cache[path]=result
   return result
  except urllib.error.HTTPError as e:raise RuntimeError(str(e.code)+' '+e.read().decode()[:500])
 save=lambda r:output.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
 result=publish(package,request,'--apply' in sys.argv,save)
 print(json.dumps({k:v for k,v in result.items() if k!='confirmed'}));print('confirmed',len(result['confirmed']))
