"""Release four individually verified historical PA/PB multiple-choice originals.

Official final keys, exact options, full historical support, active syllabus and
all-catalog duplicate checks are required before audited private approval.
"""
import copy
from datetime import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import urllib.parse
import uuid

spec=importlib.util.spec_from_file_location('originals',Path(__file__).with_name('release-verified-stf2008-originals.py'))
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
stage=base.stage
EXPECTED={96:('PCPA2006:cargo2:caderno1',1,'D'),97:('PCPA2006:cargo2:caderno1',7,'C'),98:('PCPB2008:agente-escrivao:modelo7.12',1,'D'),99:('PCPB2008:agente-escrivao:modelo7.12',4,'D')}
TOPIC='2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f'

def checked(e):
 data=Path(e['path']).read_bytes()
 if hashlib.sha256(data).hexdigest()!=e['sha256']:raise ValueError('Changed official capture')
 return data

def key_answers(text,width,total):
 tokens=re.findall(r'(?<!\w)(?:\d+|[A-EX])(?!\w)',text);answers={};cursor=0
 for first in range(1,total+1,width):
  numbers=list(map(str,range(first,first+width)))
  positions=[n for n in range(cursor,len(tokens)-2*width+1)if tokens[n:n+width]==numbers]
  if len(positions)!=1:raise ValueError('Ambiguous final-key matrix')
  pos=positions[0];row=tokens[pos+width:pos+2*width]
  if len(row)!=width or any(a not in list('ABCDEX')for a in row):raise ValueError('Invalid final-key row')
  answers.update(zip(map(int,numbers),row));cursor=pos+2*width
 return answers


def original_fields(group,number,page):
 with base.pymupdf.open(group['paper']['path'])as document:text=document[page-1].get_text()
 def clean(s):return re.sub(r'\s+',' ',re.sub(r'(?m)^\s*\d+\s*$','',s)).strip()
 if group['code'].startswith('PCPA'):
  prefix=''.join(chr(i)for i in range(1,9));start=text.index(prefix+chr(8+number)+'\n')+len(prefix)+2;end=text.index(prefix,start);block=text[start:end]
  command='Assinale a opção que não está de acordo'if number==1 else'Assinale a opção que está de acordo'
  split=block.index(command);support=clean(block[:split]);question=block[split:];pattern=r'(?m)^([A-D]) '
 else:
  anchor='As mudanças e transformações globais'if number==1 else'As mudanças na economia global'
  header='QUESTÃO '+str(number)+'\n';start=text.index(header)+len(header);end=text.index('QUESTÃO '+str(number+1)+'\n',start)
  question=text[start:end];support=clean(text[text.index(anchor):text.index(header)]);pattern=r'(?m)^([A-E])\n'
 markers=list(re.finditer(pattern,question));stem=clean(question[:markers[0].start()]);options={m[1]:clean(question[m.end():markers[k+1].start()if k+1<len(markers)else len(question)])for k,m in enumerate(markers)}
 return stem,options,support


def verify(pack):
 if pack['source_id']!=stage.SOURCE or len(pack['items'])!=4 or {i['source_item_index_zero_based']for i in pack['items']}!=set(EXPECTED):raise ValueError('Only four approved PA/PB originals allowed')
 groups={g['code']:g for g in pack['groups']};texts={};keys={}
 if set(groups)!={v[0]for v in EXPECTED.values()}:raise ValueError('Wrong exam group')
 for code,g in groups.items():
  catalog=checked(g['catalog']).decode('latin1')
  for kind in ['paper','key','changes']:
   e=g[kind];u=urllib.parse.urlsplit(e['url'])
   if u.scheme!='https'or u.hostname!='cdn.cebraspe.org.br'or not checked(e).startswith(b'%PDF')or urllib.parse.unquote(u.path.rsplit('/',1)[-1])not in catalog:raise ValueError('Official catalog/PDF provenance required')
  paper=base.pdf_text(g['paper']['path']);key=base.pdf_text(g['key']['path']);texts[code]=stage.normalize(re.sub(r'(?m)^\s*\d+\s*$','',paper))
  if 'DEFINITIVOS'not in key or 'ESCRIVÃO'not in key or not g['visually_verified']:raise ValueError('Final cargo key and visual check required')
  if code.startswith('PCPB'):
   if g['exam_year']!=2009 or g['exam_date']!='2009-03-29'or '29/3/2009'not in key or '01/2008'not in key:raise ValueError('Do not confuse edital year and application year')
  elif g['exam_year']!=2006 or g['exam_date']!='2006-04-02'or '2/4/2006'not in key:raise ValueError('Wrong PA application date')
  keys[code]=key_answers(key,g['key_width'],g['key_total'])
 for i in pack['items']:
  code,number,answer=EXPECTED[i['source_item_index_zero_based']];g=groups[code];r=i['row']
  if i['group_code']!=code or i['original_item_number']!=number or keys[code].get(number)!=answer or r['official_answer']!=answer:raise ValueError('Wrong original coordinates/key or annulled item')
  if (r['id']!=str(uuid.uuid5(uuid.NAMESPACE_URL,'official:'+code+':item:'+str(number)))or r['item_number']!=number or r['content_status']!='active'or r['subject']!='Língua Portuguesa'or r['board']!='CEBRASPE'or r['needs_visual']or r['legal_review_required']or r['syllabus_topic_id']!=TOPIC):raise ValueError('Invalid publication identity or review state')
  if any(r[k]!=g[k]for k in ['contest_name','career_name','exam_year','exam_date','exam_type']):raise ValueError('Wrong career, model or date')
  if r['source_url']!=g['paper']['url']or r['answer_key_url']!=g['key']['url']:raise ValueError('Wrong source URL')
  if list(r['options'])!=list('ABCD'if code.startswith('PCPA')else'ABCDE')or not all(r['options'].values()):raise ValueError('Incomplete alternatives')
  expected_stem,expected_options,expected_support=original_fields(g,number,i['source_page'])
  if (r['stem'],r['options'],i['support_original'])!=(expected_stem,expected_options,expected_support):raise ValueError('Original item boundaries/options/support changed')
  combined=r['stem']+' '+ ' '.join(k+' '+v for k,v in r['options'].items())
  if stage.normalize(combined)not in texts[code]or stage.normalize(i['support_original'])not in texts[code]:raise ValueError('Statement/options/support differ from original boundaries')
  if not r['support_text'].endswith(i['support_original'])or not r['support_text'].startswith('[Texto e contexto históricos de '+str(r['exam_year']))or len(i['support_original'])<300:raise ValueError('Complete dated support required')
  if len(i['explanation'])<200 or len(i['example'])<50 or r['explanation']!=i['explanation']+'\n\nExemplo: '+i['example']:raise ValueError('Individual commentary/example required')
 checked(pack['pf_syllabus_evidence'])
 if 'Compreensão e interpretação de textos'not in base.pdf_text(pack['pf_syllabus_evidence']['path']):raise ValueError('Active-topic documentary evidence missing')
 return keys

def private_payload(old,i,pack):
 p=copy.deepcopy(old['payload']);r=p['individual_review'];g=next(g for g in pack['groups']if g['code']==i['group_code']);row=i['row']
 evidence=[dict(url=g[k]['url'],title=g['code']+' — '+k,verified=True,checked_at=pack['checked_at'],sha256=g[k]['sha256'])for k in ['paper','key','changes']]
 r.update(refinement_reason='Original model, complete alternatives, final key and historical context individually confirmed',primary_evidence=evidence,answer_verified=True,original_exam_answer_not_verified=False,context_complete=True,publication_approved=True,current_syllabus_verified=True,remaining_blockers=[],reviewed_at=pack['checked_at'],official_exam_answer=row['official_answer'],technical_answer_candidate=row['official_answer'],original_item_number=row['item_number'],exam_code=i['group_code'],explanation=i['explanation'],example=i['example'])
 p.update(author_commentary=i['explanation'],author_example=i['example'],publication=dict(table='board_exam_questions',id=row['id'],original_exam=True,original_item_number=row['item_number'],current_syllabus_topic_id=TOPIC,checked_at=pack['checked_at']))
 return p

def release(pack,request,report_path,apply=False):
 keys=verify(pack);report_path=Path(report_path)
 if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):raise ValueError('Private backups outside Git required')
 ids=','.join(i['origin_candidate_id']for i in pack['items']);rows=request('question_corpus_candidates?select=*&id=in.('+ids+')');actual={r['id']:r for r in rows};desired={}
 if len(actual)!=4:raise RuntimeError('Missing private candidates')
 for i in pack['items']:
  r=actual[i['origin_candidate_id']]
  if r['corpus_id']!=pack['source_id']or r['content_status']!='reviewed':raise RuntimeError('Review state changed')
  desired[r['id']]=private_payload(r,i,pack)
  if r['payload']!=desired[r['id']]and(r['payload'].get('publication')or r['payload']['individual_review'].get('publication_approved')is not False):raise RuntimeError('Prior published decision protected')
 [topic]=request('syllabus_topics?select=*&id=eq.'+TOPIC);[edition]=request('syllabus_editions?select=*&id=eq.'+pack['current_edition_id']);[edital]=request('content_sources?select=*&id=eq.'+pack['current_edital_source_id'])
 if topic['edition_id']!=edition['id']or topic['discipline']!='Língua Portuguesa'or topic['content_status']!='current'or edition['status']!='active'or edition['source_id']!=edital['id']or not edital['is_official']or edital['status']!='vigente'or edital['url']!=pack['pf_syllabus_evidence']['url']:raise RuntimeError('Current syllabus linkage changed')
 exact={};counts={};own={i['row']['id']for i in pack['items']}
 for table,fields in stage.TABLES.items():
  if table=='question_corpus_candidates':fields='id,corpus_id,content_status,question_text:payload->>question_text_candidate,stem:payload->>stem'
  catalog=stage.collect(request,table,fields);counts[table]=len(catalog)
  for r in catalog:
   if (table=='question_corpus_candidates'and r['id']in actual)or(table=='board_exam_questions'and r['id']in own):continue
   variants=[r.get('question_text'),r.get('stem')]if table=='question_corpus_candidates'else stage.variants(table,r)
   for v in variants:
    if v:exact.setdefault(stage.normalize(v),[]).append((table,r['id']))
 for i in pack['items']:
  row=i['row'];variants=list(stage.variants('board_exam_questions',row))+[actual[i['origin_candidate_id']]['payload'].get('question_text_candidate','')]
  if any(stage.normalize(v)in exact for v in variants if v):raise RuntimeError('Exact duplicate requires canonical resolution')
 planned_sources=[]
 for s in pack['sources']:
  found=request('content_sources?'+urllib.parse.urlencode({'select':'*','url':'eq.'+s['row']['url']}))
  if found:
   if not found[0]['is_official']or found[0]['status']!='vigente':raise RuntimeError('Existing source needs review')
  else:planned_sources.append(s['row'])
 staged=[]
 for i in pack['items']:
  row=i['row'];found=request('board_exam_questions?select=*&id=eq.'+row['id']);hold=dict(row,content_status='under_review')
  if found and not(base.same(found[0],row)or base.same(found[0],hold)):raise RuntimeError('Existing public revision protected')
  staged.append((row,bool(found)))
 report=dict(batch_id=pack['batch_id'],apply=apply,complete=False,approved=4,compared_counts=counts,private_refined_ids=[],published_ids=[],annulled_by_group={k:[n for n,a in v.items()if a=='X']for k,v in keys.items()})
 backup=report_path.with_suffix('.preflight.json')
 if not backup.exists():backup.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
 def save():report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 save()
 if apply:
  for r in planned_sources:request('content_sources?on_conflict=url','POST',[r],'resolution=ignore-duplicates,return=representation')
  for row,exists in staged:
   if not exists:request('board_exam_questions?on_conflict=id','POST',[dict(row,content_status='under_review')],'resolution=ignore-duplicates,return=representation')
  for i in pack['items']:
   ident=i['origin_candidate_id'];old=actual[ident]
   if old['payload']!=desired[ident]:
    result=request('rpc/refine_held_corpus_candidate','POST',dict(candidate=ident,expected_status='reviewed',expected_payload=old['payload'],next_status='reviewed',next_payload=desired[ident]))
    if result not in ['updated','unchanged']:raise RuntimeError('Audited approval failed')
   report['private_refined_ids'].append(ident);save()
  for i in pack['items']:
   row=i['row'];[private]=request('question_corpus_candidates?select=*&id=eq.'+i['origin_candidate_id']);base.assert_publication_approval(private['payload'],desired[private['id']],row)
   [current]=request('board_exam_questions?select=*&id=eq.'+row['id'])
   if not base.same(current,row):
    if not base.same(current,dict(row,content_status='under_review')):raise RuntimeError('Staged revision changed')
    filters=urllib.parse.urlencode({k:'eq.'+str(current[k])for k in ['id','content_status','stem','official_answer','verified_at']})
    changed=request('board_exam_questions?'+filters,'PATCH',dict(content_status='active'))
    if len(changed)!=1 or not base.same(changed[0],row):raise RuntimeError('Concurrent activation conflict')
   report['published_ids'].append(row['id']);save()
  for i in pack['items']:
   [r]=request('board_exam_questions?select=*&id=eq.'+i['row']['id']);[private]=request('question_corpus_candidates?select=*&id=eq.'+i['origin_candidate_id'])
   if not base.same(r,i['row'])or private['payload']!=desired[private['id']]:raise RuntimeError('Final readback mismatch')
   for k,v in actual[private['id']]['payload'].items():
    if k not in ['individual_review','author_commentary','author_example','publication']and private['payload'].get(k)!=v:raise RuntimeError('Original extraction changed')
 report['complete']=True;save();return report
