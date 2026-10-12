"""Reconcile the inspected 207 replacements against fresh official sources.
Retain the five expanded CTB summaries; recover authored variations and exercises.
Never run against an older database snapshot or publish from body hashes alone.
"""
import datetime,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
p=Path(sys.argv[1]); oldp=ROOT/'outputs/library-comprehensive-2026-10-11/after-idosa-guides'
read=lambda folder,t:json.loads((folder/(t+'.json')).read_text(encoding='utf-8'))
previous={e['unit_id']:e for e in read(oldp,'legal_unit_explanations')}
current={e['unit_id']:e for e in read(p/'before','legal_unit_explanations')}
units={u['id']:u for u in read(p/'before','legal_course_units')};courses={c['id']:c for c in read(p/'before','legal_courses')}
topics={t['id']:t for t in read(p/'before','syllabus_topics')}
ev={e['slug']:e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8'))}
audit={r['slug']:r for r in json.loads((p/'source-audit.json').read_text(encoding='utf-8'))['rows']}
fields=['simples','pontos','atencao','exemplo','prova','termos','remissoes']
selected=[id for id,e in previous.items() if id in current and e!=current[id]]
assert len(selected)==207
rows=[]
for id in selected:
 u=units[id];c=courses[u['course_id']];before=previous[id];now=current[id]
 assert u['content_status']=='current' and u['content_sha256']==before['content_sha256']==now['content_sha256']
 assert not audit[c['slug']]['missing_articles'] and not audit[c['slug']]['unexpected_current'] and not audit[c['slug']]['text_differences']
 data={f:before[f] for f in fields}
 if c['slug']=='transito':
  assert u['unit_key'] in ['art-108','art-147','art-148','art-159','art-282']
  # Expanded current rules were checked against the full compiled articles;
  # do not undo these corrections while recovering authored learning tasks.
  data={f:now[f] for f in fields}
  data['exemplo']=before['exemplo'];data['prova']=before['prova']
  data['atencao']=list(dict.fromkeys(now['atencao']+before['atencao']))
  data['termos']=before['termos'] or now['termos']
  data['remissoes']=list(dict.fromkeys(now['remissoes']+before['remissoes']))
  if u['unit_key']=='art-282':
   data['simples']=data['simples'].replace('As notificações das penalidades do art. 256 têm prazo de expedição de cento e oitenta dias.','O prazo de expedição é de 180 dias ou, se houver defesa prévia, de 360 dias. Para advertência e multa, conta-se do cometimento da infração, observada a hipótese do §6º-A; para as demais penalidades, da conclusão do processo administrativo que lhes dá causa. O descumprimento gera decadência.')
   data['pontos']=['Expedição: 180 dias ou 360 dias se houver defesa prévia.','Recurso: prazo não inferior a trinta dias, sem confundir com expedição.','Marcos de contagem variam conforme a penalidade; observe o §6º-A nas autuações sem flagrante.']
  if u['unit_key']=='art-148':
   data['atencao'].append('Lei 15.428/2026: os §§6º e 7º disciplinam os peritos autorizados pelo órgão máximo executivo da União e o preço público dos exames, com atualização anual pelo IPCA ou índice oficial substituto. A dispensa do §5º continua condicionada à decisão do Contran.')
  if u['unit_key']=='art-159':
   data['atencao'].append('Lei 15.428/2026: o caput e seus incisos preveem a opção física ou digital, CPF e fé pública; a dispensa do porte por consulta ao sistema decorre do §1º-A, incluído em 2020. São alterações distintas.')
 if (c['slug'],u['unit_key'])==('idosa','art-94'):
  data['atencao']=[t for t in data['atencao'] if '2022' not in t]+['Atualização: o caput e o parágrafo único vigentes decorrem da Lei 15.163/2025; a Lei 14.423/2022 atualizou a terminologia do Estatuto, não criou esta vedação.']
 assert 'Variação:' in data['exemplo'] and all('?' in q and q.split('?',1)[1].strip() for q in data['prova'])
 topic=topics[c['syllabus_topic_id']]
 rows.append({'course_slug':c['slug'],'course_id':c['id'],'syllabus_topic_id':topic['id'],'edition_id':topic['edition_id'],'unit_key':u['unit_key'],'unit_id':id,'content_sha256':u['content_sha256'],**data,'expected':now})
laws=[]
for slug in sorted({r['course_slug'] for r in rows}):
 c=next(c for c in courses.values() if c['slug']==slug);source=ev[slug];raw=(p/'sources'/f'{slug}.html').read_bytes();assert hashlib.sha256(raw).hexdigest()==source['sha256']
 laws.append({'slug':slug,'title':c['title'],'units':sum(r['course_slug']==slug for r in rows),'scope_type':'targeted_correction','course_current_units':audit[slug]['database_current'],'target_unit_keys':[r['unit_key'] for r in rows if r['course_slug']==slug],'source_url':c['source_url'],'source_sha256':source['sha256'],'source_checked_at':source['checked_at']})
output=ROOT/'docs/library/article-explanations-reconciled-2026-10-11.json'
output.write_text(json.dumps({'version':'2026-10-11-reconciled','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Reconciliação explícita de conteúdo substituído, com fonte novamente conferida e versão existente integral preservada. As demais explicações não são certificadas por este lote.','laws':laws,'units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'reconciled explanations; expanded CTB corrections retained')
