"""Build guarded publication refinements from explicitly authored, individually reviewed mathematics.
No credentials or network operations; live snapshot paths must remain outside Git.
"""
import json,hashlib,datetime,urllib.parse,pathlib
ROOT=pathlib.Path('supabase/imports/idecan')
DEST=ROOT/'revisao-integral'
LOCAL=pathlib.Path('/tmp/idecan-full-review')

def identity(q):return tuple(q[k] for k in ['board','contest_name','career_name','exam_year','exam_type','item_number'])
def eq(value,column=None):
 if value is None:return 'is.null'
 if isinstance(value,bool):return 'eq.'+str(value).lower()
 # PostgREST quoted literals protect commas, parentheses, quotes and backslashes.
 raw=('{' + ','.join(json.dumps(v,ensure_ascii=False) for v in value) + '}' if column=='figure_urls' else json.dumps(value,ensure_ascii=False,separators=(',',':'))) if isinstance(value,(list,dict)) else str(value)
 return 'eq.'+json.dumps(raw,ensure_ascii=False)
def guarded_path(row):
 return 'board_exam_questions?'+urllib.parse.urlencode({'and':'('+','.join(k+'.'+eq(v,k) for k,v in row.items())+')'})
def build():
 original=json.loads((ROOT/'idecan_questions.json').read_text())
 live=json.loads((LOCAL/'live/board_exam_questions.json').read_text())
 by={identity(q):q for q in live}
 notes=json.loads((DEST/'explicacoes-matematica-rascunho.json').read_text())
 proofs=json.loads((DEST/'cotejo-pdf-legado.json').read_text())
 topics={t['id']:t for t in json.loads((LOCAL/'live/syllabus_topics.json').read_text())}
 editions={e['id']:e for e in json.loads((LOCAL/'live/syllabus_editions.json').read_text())}
 sources={s['id']:s for s in json.loads((LOCAL/'live/content_sources.json').read_text())}
 now=datetime.datetime.now(datetime.timezone.utc).isoformat()
 pack=[];report=[]
 for note in notes:
  i=note['local_index'];q=original[i];old=by[identity(q)]
  if any((old[k].replace('\r\n','\n') if isinstance(old[k],str) else old[k])!=q[k] for k in ['stem','options','official_answer']):raise ValueError('Local file differs from live question '+str(i))
  label=proofs[i]['booklet'];answers=json.loads((LOCAL/(label+'-answers.json')).read_text())
  if answers[str(q['item_number'])]!=q['official_answer']:raise ValueError('Answer key mismatch')
  tid=('e6591ae9-0b4e-4829-95cd-2c270b23346f' if i==264 else 'a7ae3924-db95-4f19-9d59-67f2c3011458' if i in [91,97,100,266] else '3c989c30-37f2-41c5-84f0-65d9bf9e7a45')
  topic=topics[tid];edition=editions[topic['edition_id']];source=sources[edition['source_id']]
  if topic['content_status']!='current' or edition['status']!='active' or not source['is_official'] or source['status']!='vigente':raise ValueError('Invalid syllabus binding')
  explanation=note['solution']+'\n\nErro comum: '+note['common_error']+'\n\nExemplo prático: '+note['practical_example']
  if len(explanation)<200:raise ValueError('Explanation too short')
  hold=i==270
  patch=dict(explanation=explanation,syllabus_topic_id=tid,content_status='under_review' if hold else 'active',tested_topic=topic['topic_text'],review_note=old['review_note']+'; Revisão individual: cálculo e gabarito definitivo cotejados; explicação com erro comum e exemplo. Matriz de pertinência: PF 2025; não certifica previsão do edital PC-AC. '+('Retido: 7,5 jornadas versus conclusão no oitavo dia exige decisão editorial.' if hold else 'Apto no escopo não jurídico revisado.'),verified_at=now)
  if i==81:
   patch['stem']='Cinco delegacias foram avaliadas quanto à eficiência de resolução de crimes, apresentando os seguintes índices: Delegacia A: 0,85; Delegacia B: √0,64; Delegacia C: 0,805; Delegacia D: 8/9; e a Delegacia E: (√0,81)². Escrevendo todos os índices na forma decimal, temos que a delegacia com o menor índice de eficiência é a:'
  if not proofs[i]['fully_literal'] and i not in [81,267]:raise ValueError('PDF consistency not resolved')
  report.append(dict(id=old['id'],local_index=i,item_number=q['item_number'],contest=q['contest_name'],official_answer=q['official_answer'],syllabus_topic_id=tid,syllabus_edition_id=edition['id'],syllabus_url=source['url'],explanation=explanation,release_approved=not hold,hold_reason=note['editorial_issues'] if hold else [],booklet_sha256=proofs[i]['booklet_sha256'],visual_resolution=i in [81,267],new_content_status=patch['content_status']))
  pack.append(dict(path=guarded_path(old),expected=[old],patch=patch))
 (LOCAL/'math-apply.json').write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n')
 (DEST/'pareceres-matematica.json').write_text(json.dumps(dict(checked_at=now,remote_applied=False,items=report),ensure_ascii=False,indent=2)+'\n')
 return pack,report
if __name__=='__main__':
 p,r=build();print(json.dumps(dict(decisions=len(p),approved=sum(x['release_approved'] for x in r),held=sum(not x['release_approved'] for x in r),max_url_bytes=max(len(x['path'].encode()) for x in p))))
