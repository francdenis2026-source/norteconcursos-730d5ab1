"""Apply only bounded retained/obsolete legal corrections; never activate questions.
Stores per-row progress outside Git before the audit insert so interrupted audit writes can resume.
Credentials only in stdin/process memory. Usage: SCRIPT PACK PRIVATE_REPORT [--apply]
"""
import sys,json,pathlib,urllib.request,urllib.parse,datetime,importlib.util,uuid
spec=importlib.util.spec_from_file_location('guard',pathlib.Path(__file__).with_name('prepare-pedagogical-batch.py'));guard=importlib.util.module_from_spec(spec);spec.loader.exec_module(guard)
def validate(pack):
 if pack['batch_id']!='idecan-primary-critical-v1' or {c['local_index'] for c in pack['changes']}!={24,127,197,198,206}:raise ValueError('Wrong bounded scope')
 for c in pack['changes']:
  if c['expected']['content_status']!='under_review' or c['expected']['id']!=c['id'] or c['patch']['content_status'] not in ['under_review','obsolete'] or c['evidence']['publication_approved'] is not False:raise ValueError('No activation allowed')
  if set(c['patch'])-{'content_status','explanation','legal_basis','legal_review_required','law_version_checked_at','review_note'}:raise ValueError('Original extraction protected')
  if c['patch']['content_status']=='obsolete' and c['local_index']!=127:raise ValueError('Unreviewed exclusion')
  if any(not s['url'].startswith('https://www.planalto.gov.br/') or len(s['sha256'])!=64 for s in c['evidence']['sources']):raise ValueError('Official evidence required')
 return True

def run(pack,request,report_path,apply=False,policy=None):
 (policy or validate)(pack);p=pathlib.Path(report_path)
 result=json.loads(p.read_text()) if p.exists() else dict(batch_id=pack['batch_id'],applied=apply,rows={},complete=False)
 if result['batch_id']!=pack['batch_id']:raise ValueError('Wrong resume report')
 def save():p.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 # All current states are checked before changing any question.
 for c in pack['changes']:
  current=request('board_exam_questions?select=*&id=eq.'+c['id'])
  audit=request('idecan_pedagogical_review_audit?select=*&batch_key=eq.'+pack['batch_id']+'&question_id=eq.'+c['id'])
  if len(current)!=1:raise ValueError('Question missing')
  if audit:
   if len(audit)!=1 or current[0]!=audit[0]['after_data']:raise ValueError('Later review protected')
  elif c['id'] in result['rows']:
   if current[0]!=result['rows'][c['id']]['after_data']:raise ValueError('Resume conflict')
  elif current!=[c['expected']]:raise ValueError('Stale review; no writes performed')
 if not apply:return result
 result['applied']=True;save()
 for c in pack['changes']:
  existing=request('idecan_pedagogical_review_audit?select=*&batch_key=eq.'+pack['batch_id']+'&question_id=eq.'+c['id'])
  if existing:
   result['rows'][c['id']]=dict(before_data=existing[0]['before_data'],after_data=existing[0]['after_data'],audited=True);save();continue
  for s in c['evidence']['sources']:
   found=request('content_sources?select=id,is_official&url=eq.'+urllib.parse.quote(s['url'],safe=''))
   if found and not all(x['is_official'] for x in found):raise ValueError('Official source metadata differs')
   if not found:
    row=dict(id=str(uuid.uuid5(uuid.NAMESPACE_URL,s['url'])),source_type='lei',title='Fonte oficial dos dispositivos conferidos na revisão IDECAN',issuer='Presidência da República',url=s['url'],is_official=True,status='em_revisao',checked_at=s['checked_at'],notes='Conferência restrita aos dispositivos citados; não certifica integralmente toda a norma.')
    request('content_sources?on_conflict=url','POST',[row],'resolution=ignore-duplicates,return=representation')
  if c['id'] not in result['rows']:
   updated=request(guard.guarded_path(c['expected']),'PATCH',c['patch'])
   if len(updated)!=1:raise ValueError('Concurrent change protected')
   result['rows'][c['id']]=dict(before_data=c['expected'],after_data=updated[0]);save()
  row=result['rows'][c['id']]
  entry=dict(batch_key=pack['batch_id'],question_id=c['id'],before_data=row['before_data'],after_data=row['after_data'],evidence=c['evidence'],reviewer_id=None)
  request('idecan_pedagogical_review_audit?on_conflict=batch_key,question_id','POST',[entry],'resolution=ignore-duplicates,return=representation')
  actual=request('board_exam_questions?select=*&id=eq.'+c['id'])
  audit=request('idecan_pedagogical_review_audit?select=*&batch_key=eq.'+pack['batch_id']+'&question_id=eq.'+c['id'])
  if actual!=[row['after_data']] or len(audit)!=1 or audit[0]['after_data']!=row['after_data'] or audit[0]['before_data']!=row['before_data']:raise ValueError('Readback mismatch')
  row['audited']=True;save()
 result['complete']=True;save();return result
if __name__=='__main__':
 pack=json.loads(pathlib.Path(sys.argv[1]).read_text());validate(pack);key=sys.stdin.readline().strip()
 def request(endpoint,method='GET',body=None,prefer='return=representation'):
  headers={'apikey':key,'Content-Type':'application/json','Prefer':prefer}
  if key.count('.')==2:headers['Authorization']='Bearer '+key
  req=urllib.request.Request('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'+endpoint,method=method,headers=headers,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  with urllib.request.urlopen(req,timeout=45) as r:
   b=r.read();return json.loads(b) if b else None
 result=run(pack,request,sys.argv[2],len(sys.argv)>3 and sys.argv[3]=='--apply');print(json.dumps(dict(complete=result['complete'],applied=result['applied'],confirmed=len(result['rows']))),flush=True)
