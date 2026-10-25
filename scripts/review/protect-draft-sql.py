"""Protect newly added draft migrations from overwriting reviewed explanations.
Usage: python scripts/review/protect-draft-sql.py SNAPSHOT_FOLDER
No database writes. Only the explicitly listed law batches 3/4 and CTB draft files are changed.
"""
import json,re,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];p=Path(sys.argv[1]);cs=json.loads((p/'legal_courses.json').read_text(encoding='utf-8'));us=json.loads((p/'legal_course_units.json').read_text(encoding='utf-8'));slugs={c['id']:c['slug'] for c in cs};bykey={(slugs[u['course_id']],u['unit_key']):u for u in us}
files=list((root/'supabase/migrations').glob('20261014003[3-9]00_explicacoes_*.sql'))+list((root/'sql-lotes').glob('leis3-*.sql'))+list((root/'sql-lotes').glob('leis4-*.sql'))+[root/'sql-lotes/correcao-ctb-01.sql'];assert len(files)==26
counts={'preserved_files':0,'guarded_statements':0,'excluded_statements_removed':0}
pattern=re.compile(r'insert into public\.legal_unit_explanations.*?on conflict \(unit_id\).*?;',re.S)
for file in files:
 text=file.read_text(encoding='utf-8')
 def protect(match):
  statement=match.group();m=re.search(r"where c\.slug = '([^']+)' and u\.unit_key = '([^']+)'",statement);assert m,file
  unit=bykey[m.group(1),m.group(2)]
  if unit['content_status']!='current':counts['excluded_statements_removed']+=1;return '-- Dispositivo excluído: rascunho não inserido na leitura ativa.'
  guards=" and u.content_status = 'current' and c.status = 'active' and u.content_sha256 = '"+unit['content_sha256']+"'\nand exists (select 1 from public.syllabus_topics t join public.syllabus_editions d on d.id=t.edition_id where t.id=c.syllabus_topic_id and t.content_status='current' and d.status='active')\nand exists (select 1 from public.content_sources s where s.url=c.source_url and s.is_official and s.status='vigente')"
  if (m.group(1),m.group(2))==('eca','art-232'):
   # This draft falsely asserted revocation. Rebuild its payload from the
   # explicitly reviewed explanation; leave it under_review on a fresh DB.
   e=json.loads((root/'scripts/explicacoes/eca-07.json').read_text(encoding='utf-8'))['units']['art-232']
   assert 'permanece vigente' in e['simples'] and 'art. 233' in ' '.join(e['atencao'])
   q=lambda v:"'"+v.replace("'","''")+"'"
   j=lambda v:q(json.dumps(v,ensure_ascii=False))+'::jsonb'
   prefix='insert into public.legal_unit_explanations (unit_id, content_sha256, simples, pontos, atencao, exemplo, prova, termos, remissoes, status, authored_by)\nselect u.id, u.content_sha256, '+q(e['simples'])+', '+j(e['pontos'])+', '+j(e['atencao'])+', '+q(e['exemplo'])+', '+j(e['prova'])+', '+j(e.get('termos',[]))+', '+j(e.get('remissoes',[]))+", 'under_review', 'reviewed-draft'\nfrom public.legal_course_units u join public.legal_courses c on c.id = u.course_id "
   statement=prefix+m.group()+guards+'\non conflict (unit_id) do nothing;'
  else:
   where_end=m.end();statement=statement[:where_end]+guards+'\non conflict (unit_id) do nothing;'
  counts['guarded_statements']+=1;return statement
 fixed=pattern.sub(protect,text).replace("-- Entram como 'under_review': só administradores veem até a publicação (update ... set status = 'published').","-- Rascunhos em revisão. Publicação exige revisão explícita; reexecução preserva qualquer registro existente.")
 file.write_text(fixed,encoding='utf-8');counts['preserved_files']+=1
print(counts)
