"""Preserve individually checked explanations; replace practice with explicit reviewed cases."""
import json,sys,copy,re
from pathlib import Path
folder=Path(sys.argv[1]);stage=sys.argv[2];destination=Path(sys.argv[3])
read=lambda t:json.loads((folder/stage/(t+'.json')).read_text())
c=next(c for c in read('legal_courses') if c['slug']=='codigo-penal')
us={u['unit_key']:u for u in read('legal_course_units') if u['course_id']==c['id'] and u['content_status']=='current'}
es={e['unit_id']:e for e in read('legal_unit_explanations')};rows={}
def add(key,case,variation,q1,q2):
 key='art-'+str(key);e=es[us[key]['id']]
 rows[key]={k:copy.deepcopy(e[k]) for k in ['simples','pontos','atencao','termos','remissoes']}
 rows[key].update(exemplo=case+' Variação: '+variation,prova=[q1,q2])
 return rows[key]
def patch(key,**fields):rows['art-'+str(key)].update(fields)
def note(key,text,url=None):
 r=rows['art-'+str(key)];r['atencao'].append(text)
 if url and url not in r['remissoes']:r['remissoes'].append(url)
def save(expected):
 def readable(v):
  if isinstance(v,str):return re.sub(r"(?<=[A-Za-zÀ-ú])(?=\d)"," ",v)
  if isinstance(v,list):return [readable(x) for x in v]
  if isinstance(v,dict):return {k:readable(x) for k,x in v.items()}
  return v
 for r in rows.values():
  for k in r:
   if k!="remissoes":r[k]=readable(r[k])
 assert len(rows)==expected
 for r in rows.values():assert 'Variação:' in r['exemplo'] and all('?' in q and q.split('?',1)[1].strip() for q in r['prova'])
 destination.write_text(json.dumps(dict(course_slug='codigo-penal',units=rows),ensure_ascii=False,indent=2)+'\n');print(expected,'explicit reviewed overlays')
