"""Curate current, previously reviewed article exercises for the matching material.
No network or database mutations. Source comparison artifacts are required.
"""
import pathlib,json,sys,re,hashlib
P=pathlib.Path(sys.argv[1]);OUT=pathlib.Path(sys.argv[2]);OUT.mkdir(parents=True,exist_ok=True)
read=lambda n:json.loads((P/(n+'.json')).read_text())
D=read('materials-courses-live')[0]['diagnostico'];M={m['slug']:m for m in D['materiais']};C={c['slug']:c for c in D['cursos']};REF=read('references');T={t['id']:t for t in REF['topics']};ED={e['id']:e for e in REF['editions']};COMP={r['slug']:r for r in read('course-comparison')};rows=[]
for plan in read('reuse-plan'):
 if plan['manual_needed']:continue
 c=C[plan['slug']];m=M[plan['material_slug']];t=T[c['syllabus_topic_id']];assert t['content_status']=='current' and ED[t['edition_id']]['status']=='active'
 compare=COMP[c['slug']];assert not compare['mismatches'];source=compare['official_source'];body=(P/'sources'/source['file']).read_bytes();assert hashlib.sha256(body).hexdigest()==source['sha256']
 before=m['quiz'] or [];quiz=list(before);items=[dict(**q,source_url=c['source_url'],origin='preserved_published') for q in before]
 for q in plan['reuse']:
  assert q['unit_id'] in compare['matched_ids'] and q['reviewed_by'] and q['reviewed_at']
  example=q['example'].split(' Variação:',1)[0].strip()
  why=q['why']+' Base: '+q['article']+'.'+(' Exemplo: '+example if example else '')
  item=dict(q=q['q'],a=q['a'],why=why);quiz.append(item)
  items.append(dict(**item,source_url=c['source_url'],article=q['article'],origin='reviewed_article_explanation',source_unit_id=q['unit_id'],source_reviewed_by=q['reviewed_by'],source_reviewed_at=q['reviewed_at']))
 assert len(quiz)==20 and len({q['q'].casefold().strip() for q in quiz})==20
 review=dict(version=1,status='reviewed',material_slug=m['slug'],subject=m['discipline'],topic_label=m['topic_label'],law=c['slug'],syllabus_topic_id=t['id'],checked_at=source['checked_at'],scope='Complementação da fixação do material com itens de explicações já revisadas e vinculadas ao mesmo texto oficial conferido nesta data. Itens publicados anteriormente preservados. Não certifica auditoria integral de jurisprudência nem altera a data de corte do edital.',sources=[dict(url=c['source_url'],sha256=source['sha256'],checked_at=source['checked_at'])],items=items)
 rows.append(dict(id=m['id'],slug=m['slug'],subject=m['discipline'],expected_updated_at=m['updated_at'],expected_quiz=before,quiz=quiz,review=review))
report=dict(version=1,materials=len(rows),additional_exercises=sum(len(r['quiz'])-len(r['expected_quiz']) for r in rows),rows=rows)
(OUT/'reuse-package.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('ready',len(rows),'additional',report['additional_exercises'])
