"""Build an explicit reviewed batch from authored explanations and official evidence."""
import datetime, hashlib, json, sys, os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
folder=Path(sys.argv[1]); output=Path(sys.argv[2]); slugs=sys.argv[3:]
read=lambda name:json.loads((folder/os.environ.get('TASK_SNAPSHOT_STAGE','before')/f'{name}.json').read_text(encoding='utf-8'))
courses=read('legal_courses');units=read('legal_course_units');topics=read('syllabus_topics');editions=read('syllabus_editions');sources=read('content_sources')
existing={e['unit_id']:e for e in read('legal_unit_explanations')}
audit=json.loads((folder/'coverage-before.json').read_text(encoding='utf-8'))
evidence={r['course_slug']:r for r in audit['rows']}
checked=datetime.datetime.now(datetime.timezone.utc).isoformat(); rows=[]; laws=[]
references=json.loads((folder/'references-index.json').read_text(encoding='utf-8')) if (folder/'references-index.json').exists() else []
for slug in slugs:
    course=next(c for c in courses if c['slug']==slug and c['status']=='active')
    topic=next(t for t in topics if t['id']==course['syllabus_topic_id'] and t['content_status']=='current')
    edition=next(e for e in editions if e['id']==topic['edition_id'] and e['status']=='active')
    assert any(s['url']==course['source_url'] and s['is_official'] and s['status']=='vigente' for s in sources),slug
    ev=evidence[slug]
    assert hashlib.sha256((folder/'sources'/(slug+'.html')).read_bytes()).hexdigest()==ev['source_sha256']
    authored=json.loads((ROOT/'scripts/explicacoes'/(slug+'-aplicacao-2026-10-11.json')).read_text(encoding='utf-8'))
    current={u['unit_key']:u for u in units if u['course_id']==course['id'] and u['content_status']=='current'}
    assert set(authored['units'])==set(current),f'Incomplete article coverage: {slug}'
    for key,data in authored['units'].items():
        unit=current[key];assert key in ev['official_verified_keys']
        assert all(data.get(f) for f in ['simples','pontos','atencao','exemplo','prova'])
        assert 'Variação:' in data['exemplo'] or slug=='cin' and key=='art-17'
        assert all('?' in q and len(q.split('?',1)[1].strip())>0 for q in data['prova'])
        rows.append({'course_slug':slug,'course_id':course['id'],'syllabus_topic_id':topic['id'],'edition_id':edition['id'],'unit_key':key,'unit_id':unit['id'],'content_sha256':unit['content_sha256'],**data,**({'expected':existing[unit['id']]} if unit['id'] in existing else {})})
    extras=references if slug=='cin' else json.loads((folder/'tax-references-index.json').read_text(encoding='utf-8')) if slug=='seguranca-privada' else []
    for ref in extras:
        assert any(s['url']==ref['url'] and s['is_official'] and s['status']=='vigente' for s in sources)
        assert hashlib.sha256((folder/'sources'/('constituicao.html' if slug=='cin' else ref['name']+'.html')).read_bytes()).hexdigest()==ref['sha256']
    laws.append({'slug':slug,'title':course['title'],'units':len(current),'source_url':course['source_url'],'source_sha256':ev['source_sha256'],'source_checked_at':ev['source_checked_at'],'additional_sources':extras,'scope':'Explicação, caso com variação e recuperação ativa para cada dispositivo vigente; não certifica cobertura de toda jurisprudência.'})
output.write_text(json.dumps({'version':'2026-10-11','checked_at':checked,'laws':laws,'units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(laws),'complete article explanation paths;',len(rows),'new explanations')
