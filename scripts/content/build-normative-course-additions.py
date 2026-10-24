"""Bind individually authored supplements to the current, matched official law text."""
import pathlib,json,sys,hashlib
P=pathlib.Path(sys.argv[1]);OUT=pathlib.Path(sys.argv[2]);read=lambda n:json.loads((P/(n+'.json')).read_text())
D=read('materials-courses-live')[0]['diagnostico'];M={m['slug']:m for m in D['materiais']};C={c['slug']:c for c in D['cursos']};REF=read('references');T={t['id']:t for t in REF['topics']};ED={e['id']:e for e in REF['editions']};COMP={r['slug']:r for r in read('course-comparison')}
authored={};slug=None
for line in (OUT/'authoring/course-additions.txt').read_text().splitlines():
 if not line.strip():continue
 if line.startswith('['):slug=line[1:-1];assert slug not in authored;authored[slug]=[];continue
 answer,article,q,why=line.split('|',3);assert answer in ['T','F'] and len(why)>70
 authored[slug].append(dict(q=q,a=answer=='T',why=why,article=article))
rows=[]
for plan in read('reuse-plan'):
 if not plan['manual_needed']:continue
 c=C[plan['slug']];m=M[plan['material_slug']];t=T[c['syllabus_topic_id']];assert t['content_status']=='current' and ED[t['edition_id']]['status']=='active'
 compare=COMP[c['slug']];assert not compare['mismatches'];source=compare['official_source'];assert hashlib.sha256((P/'sources'/source['file']).read_bytes()).hexdigest()==source['sha256']
 before=m['quiz'] or [];quiz=list(before);items=[dict(**q,source_url=c['source_url'],origin='preserved_published') for q in before]
 for q in plan['reuse']:
  assert q['unit_id'] in compare['matched_ids'] and q['reviewed_by'] and q['reviewed_at']
  example=q['example'].split(' Variação:',1)[0].strip();why=q['why']+' Base: '+q['article']+'.'+(' Exemplo: '+example if example else '')
  item=dict(q=q['q'],a=q['a'],why=why);quiz.append(item);items.append(dict(**item,source_url=c['source_url'],article=q['article'],origin='reviewed_article_explanation',source_unit_id=q['unit_id'],source_reviewed_by=q['reviewed_by'],source_reviewed_at=q['reviewed_at']))
 extra=authored[c['slug']];assert len(extra)==plan['manual_needed']
 for q in extra:
  article=q['article'];assert any(u['label']==article for u in compare['parsed']), (c['slug'],article)
  item=dict(q=q['q'],a=q['a'],why=q['why']+' Base oficial: '+article+'.');quiz.append(item);items.append(dict(**item,source_url=c['source_url'],article=article,origin='authored_current_official_text'))
 assert len(quiz)==20 and len({q['q'].casefold().strip() for q in quiz})==20
 review=dict(version=1,status='reviewed',material_slug=m['slug'],subject=m['discipline'],topic_label=m['topic_label'],law=c['slug'],syllabus_topic_id=t['id'],checked_at=source['checked_at'],scope='Fixação autoral literal e aplicada, conferida com o texto oficial consultado; inclui itens anteriormente publicados e exercícios de explicações previamente revisadas. Não é certificação integral de jurisprudência nem altera o corte temporal do edital.',sources=[dict(url=c['source_url'],sha256=source['sha256'],checked_at=source['checked_at'])],items=items)
 rows.append(dict(id=m['id'],slug=m['slug'],subject=m['discipline'],expected_updated_at=m['updated_at'],expected_quiz=before,quiz=quiz,review=review))
report=dict(version=1,materials=len(rows),additional_exercises=sum(len(r['quiz'])-len(r['expected_quiz']) for r in rows),rows=rows)
(OUT/'course-additions-package.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('ready',len(rows),'additional',report['additional_exercises'])
