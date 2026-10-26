"""Package individually authored, official-source-backed material exercises.
Requires fetched source manifests and the live before-state; does not mutate the DB.
"""
import pathlib,json,sys,hashlib,re
P=pathlib.Path(sys.argv[1]);OUT=pathlib.Path(sys.argv[2]);NAME=sys.argv[3]
read=lambda n:json.loads((P/(n+'.json')).read_text());D=read('materials-courses-live')[0]['diagnostico'];M={m['slug']:m for m in D['materiais']};R=read('references');E={e['id']:e for e in R['editions']};sources={}
all_sources=[]
for f in ['source-index','cpc-source-index','special-source-index','accounting-source-index','more-source-index']:
 all_sources+=read(f)
def url_source(fragment):
 matches=[s for s in all_sources if fragment.lower() in s.get('url','').lower() and s.get('status')==200 and s.get('bytes',0)>1000]
 assert matches,fragment
 return matches[0]
for alias,frag in {'framework':'573_CPC00','itg':'ITG2000','lei6404':'l6404compilada','lei11638':'l11638.htm','cf':'constituicaocompilado','cc':'l10406compilada','cpc':'l13105.htm','lei8112':'l8112cons','lei9784':'l9784.htm','lei8429':'l8429.htm','lei14133':'l14133.htm','lei9873':'l9873.htm','cp':'del2848compilado','migracao':'l13445.htm','lgpd':'l13709.htm','ec138':'emc138.htm','tema1194':'cod_tema_inicial=1194','sumulas':'VerbetesSTJ_asc.pdf'}.items():
 try:sources[alias]=url_source(frag)
 except AssertionError:pass
for alias,code in {'cpc16':'47','cpc01':'2','cpc27':'58','cpc04':'35','cpc03':'34','cpc09':'40','cpc12':'43','cpc25':'56','cpc48':'106','cpc26':'57','cpc23':'54','framework':'80'}.items():
 sources[alias]=next(s for s in read('cpc-source-index') if s['code']==code)
manual={};slug=None
for line in (OUT/f'authoring/{NAME}.txt').read_text().splitlines():
 if not line.strip():continue
 if line.startswith('['):slug=line[1:-1];assert slug not in manual;manual[slug]=[];continue
 a,alias,article,q,why=line.split('|',4);assert a in ['T','F'] and alias in sources and len(q)>25 and len(why)>55,(slug,line)
 manual[slug].append(dict(q=q,a=a=='T',why=why,source_alias=alias,article=article))
rows=[]
for slug,extra in manual.items():
 m=M[slug];before=m['quiz'] or [];quiz=list(before);assert len(before)+len(extra)==20,(slug,len(before),len(extra))
 topic_candidates=[t for t in R['topics'] if t['discipline']==m['discipline'] and t['topic_order']==m['syllabus_topic_order'] and t['content_status']=='current' and E[t['edition_id']]['status']=='active']
 preferred=[t for t in topic_candidates if E[t['edition_id']]['contest_name']=='Polícia Federal' and E[t['edition_id']]['contest_year']==2025 and 'Agente' in E[t['edition_id']]['role_name']]
 if not preferred:preferred=[t for t in topic_candidates if E[t['edition_id']]['contest_name'] in m['contest_name']]
 assert preferred,(slug,'no verified active syllabus mapping')
 t=preferred[0];selected={q['source_alias']:sources[q['source_alias']] for q in extra};ss=list({s['url']:s for s in selected.values()}.values())
 for s in ss:
  assert hashlib.sha256((P/'sources'/s['file']).read_bytes()).hexdigest()==s['sha256']
  assert s['bytes']>1000 and s.get('status')==200
 first=ss[0];items=[dict(**q,source_url=first['url'],origin='preserved_published') for q in before]
 for q in extra:
  s=sources[q['source_alias']];item=dict(q=q['q'],a=q['a'],why=q['why']+' Base: '+q['article']+'.');quiz.append(item);items.append(dict(**item,source_url=s['url'],article=q['article'],origin='authored_current_official_text'))
 assert len({re.sub(r'\s+',' ',q['q'].casefold()).strip() for q in quiz})==20,(slug,'duplicate statement')
 review=dict(version=1,status='reviewed',material_slug=slug,subject=m['discipline'],topic_label=m['topic_label'],syllabus_topic_id=t['id'],checked_at=max(s['checked_at'] for s in ss),scope='Fixação autoral complementar ao tema do edital cadastrado. Novos itens conferidos nas fontes oficiais indicadas; exercícios anteriormente publicados preservados. Não são questões de banca nem certificação integral da jurisprudência ou de regras setoriais de adoção contábil. A atualização não modifica o corte temporal do edital.',sources=[{k:s[k] for k in ['url','sha256','checked_at']} for s in ss],items=items)
 rows.append(dict(id=m['id'],slug=slug,subject=m['discipline'],expected_updated_at=m['updated_at'],expected_quiz=before,quiz=quiz,review=review,syllabus_topic_text=t['topic_text']))
report=dict(version=1,materials=len(rows),additional_exercises=sum(len(r['quiz'])-len(r['expected_quiz']) for r in rows),rows=rows)
(OUT/f'{NAME}-package.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(NAME,len(rows),'additional',report['additional_exercises'])
