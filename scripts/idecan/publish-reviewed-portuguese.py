"""Publish a bounded, individually reviewed PC-CE Portuguese pack.
Credential is read from stdin only, never saved. Default is read-only preflight.
Usage: python SCRIPT PACK EVIDENCE_DIRECTORY PRIVATE_REPORT [--apply]
"""
import json,sys,pathlib,hashlib,urllib.request,urllib.parse,datetime,re

def validate(pack,evidence):
 if pack['batch_id']!='idecan-pcce-portugues-10-v1' or len(pack['changes'])!=10 or len(pack['publications'])!=10:raise ValueError('Unexpected bounded batch')
 for key in ['pcce-escrivao','pcce-key','pf-edital']:
  item=pack['evidence'][key];p=pathlib.Path(evidence)/(key+'.pdf')
  if item.get('status')!=200 or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:raise ValueError('Primary PDF integrity mismatch')
 seen=set()
 for change,row in zip(pack['changes'],pack['publications']):
  old,new=change['expected_payload'],change['next_payload'];r=new['individual_review'];n=old['item_number']
  if n in seen or not 1<=n<=10 or old['raw_text']!=new['raw_text'] or row!=new['publication'] or row['official_answer']!=old['answer_in_official_document'] or change['expected_status']!='reviewed' or change['next_status']!='reviewed':raise ValueError('Original or answer changed')
  if any(old.get(k)!=new.get(k) for k in ['source_pages','item_number','annulled_in_document','answer_in_official_document']):raise ValueError('Provenance changed')
  if row['exam_board']!='IDECAN' or row['subject']!='Língua Portuguesa' or row['content_status']!='active' or row['is_original'] is not False or row['legal_basis']!=[]:raise ValueError('Wrong scope')
  if r.get('publication_approved') is not True or r.get('context_complete') is not True or r.get('answer_verified') is not True or r.get('blockers') or not r.get('refinement_reason'):raise ValueError('Incomplete review')
  if ''.join(re.findall(r'^\(([ABCDE])\)',row['question_text'],re.M))!='ABCDE' or 'Exemplo prático:' not in row['explanation'] or 'Erro comum:' not in row['explanation']:raise ValueError('Incomplete teaching context')
  if '[26]' not in row['question_text'] or '[01]' not in row['question_text']:raise ValueError('Support passage missing')
  if n in [7,8,10] and 'Nota de acessibilidade:' not in row['question_text']:raise ValueError('Original underline missing')
  seen.add(n)
 return True

def same(actual,expected):
 for k,v in expected.items():
  a=actual.get(k)
  if k=='verified_at':
   if not a or datetime.datetime.fromisoformat(a.replace('Z','+00:00'))!=datetime.datetime.fromisoformat(v.replace('Z','+00:00')):return False
  elif a!=v:return False
 return True

def run(pack,request,report_path,apply=False):
 result=dict(batch_id=pack['batch_id'],applied=apply,private_reviews_updated=[],published_ids=[],confirmed_ids=[],complete=False)
 def save():pathlib.Path(report_path).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 # All current source/topic/candidate and catalog checks happen before any write.
 source=pack['source'];existing_source=request('content_sources?select=*&url=eq.'+urllib.parse.quote(source['url'],safe=''))
 if existing_source and (len(existing_source)!=1 or existing_source[0]['id']!=source['id'] or existing_source[0]['is_official'] is not False):raise ValueError('Existing source differs; preserve it')
 for c,row in zip(pack['changes'],pack['publications']):
  found=request('question_corpus_candidates?select=*&id=eq.'+c['candidate'])
  if len(found)!=1 or found[0]['content_status']!='reviewed' or found[0]['payload'] not in [c['expected_payload'],c['next_payload']]:raise ValueError('Stale private review')
  topic=request('syllabus_topics?select=*&id=eq.'+row['syllabus_topic_id'])
  if len(topic)!=1 or topic[0]['content_status']!='current' or topic[0]['discipline']!='Língua Portuguesa':raise ValueError('Current syllabus topic missing')
  edition=request('syllabus_editions?select=*&id=eq.'+topic[0]['edition_id'])
  if len(edition)!=1 or edition[0]['id']!='a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff' or edition[0]['status']!='active':raise ValueError('Official current edition differs')
  matrix=request('content_sources?select=*&id=eq.'+edition[0]['source_id'])
  if len(matrix)!=1 or matrix[0]['is_official'] is not True or matrix[0]['status']!='vigente' or matrix[0]['url']!=pack['evidence']['pf-edital']['url']:raise ValueError('Official syllabus source differs')
  existing=request('curated_question_catalog?select=*&or=(id.eq.'+row['id']+',external_item_key.eq.'+urllib.parse.quote(row['external_item_key'],safe='')+')')
  if existing and (len(existing)!=1 or not same(existing[0],row)):raise ValueError('Published question protected')
 other=request('board_exam_questions?select=id&source_url=eq.'+urllib.parse.quote(source['url'],safe=''))
 if other:raise ValueError('PC-CE already exists in board catalog; inspect duplicates first')
 save()
 if not apply:return result
 if not existing_source:request('content_sources?on_conflict=url','POST',[source],'resolution=ignore-duplicates,return=representation')
 actual_source=request('content_sources?select=*&id=eq.'+source['id'])
 if len(actual_source)!=1 or actual_source[0]['url']!=source['url'] or actual_source[0]['is_official'] is not False:raise ValueError('Source readback mismatch')
 for change,row in zip(pack['changes'],pack['publications']):
  state=request('rpc/refine_held_corpus_candidate','POST',change)
  if state not in ['updated','unchanged']:raise ValueError('Review RPC did not confirm')
  result['private_reviews_updated'].append(change['candidate']);save()
  created=request('curated_question_catalog?on_conflict=id','POST',[row],'resolution=ignore-duplicates,return=representation')
  result['published_ids'] += [r['id'] for r in created];save()
  actual=request('curated_question_catalog?select=*&id=eq.'+row['id'])
  retained=request('question_corpus_candidates?select=payload,content_status&id=eq.'+change['candidate'])
  if len(actual)!=1 or not same(actual[0],row) or len(retained)!=1 or retained[0]['payload']!=change['next_payload'] or retained[0]['content_status']!='reviewed':raise ValueError('Publication/readback mismatch')
  result['confirmed_ids'].append(row['id']);save()
 result['complete']=len(result['confirmed_ids'])==10;save();return result

if __name__=='__main__':
 pack=json.loads(pathlib.Path(sys.argv[1]).read_text());validate(pack,sys.argv[2]);key=sys.stdin.readline().strip()
 if not key:raise ValueError('Session credential missing')
 def request(endpoint,method='GET',body=None,prefer='return=representation'):
  headers={'apikey':key,'Content-Type':'application/json','Prefer':prefer}
  if key.count('.')==2:headers['Authorization']='Bearer '+key
  req=urllib.request.Request('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'+endpoint,method=method,headers=headers,data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None)
  with urllib.request.urlopen(req,timeout=60) as response:
   data=response.read();return json.loads(data) if data else None
 print(json.dumps(run(pack,request,sys.argv[3],len(sys.argv)>4 and sys.argv[4]=='--apply')),flush=True)
