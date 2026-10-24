"""Build the reviewed non-normative supplements; no network or publication.
Inputs: an immutable database snapshot and manually authored exercise files.
"""
import json,pathlib,sys,hashlib,re,collections
folder=pathlib.Path(sys.argv[1]);destination=pathlib.Path(sys.argv[2]);destination.mkdir(parents=True,exist_ok=True)
read=lambda name:json.loads((folder/(name+'.json')).read_text())
materials={m['slug']:m for m in read('study_materials')};topics={t['id']:t for t in read('syllabus_topics')};editions={e['id']:e for e in read('syllabus_editions')};sources={s['id']:s for s in read('content_sources')}
packs={};slug=None
for line in (folder/'new-exercises.txt').read_text().splitlines():
 if line.startswith('['):slug=line[1:-1];assert slug not in packs;packs[slug]=[]
 elif line.strip():
  truth,q,why=line.split('|',2);assert truth in ['T','F'];packs[slug].append(dict(q=q,a=truth=='T',why=why))
for slug,quiz in read('calculation-exercises').items():assert slug not in packs;packs[slug]=quiz
assert len(packs)==40 and sum(map(len,packs.values()))==480
# The mappings below point to existing current topics, never invented syllabus IDs.
portuguese={'portugues-coesao-reescrita-sentido':'2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f'}
network={'informatica-osi-tcp-ip-camadas','informatica-email-smtp-pop-imap','informatica-internet-intranet-vpn','informatica-protocolos-dns-dhcp-http'}
security={'informatica-backup-incremental-diferencial','informatica-malware-antivirus-firewall','informatica-seguranca-cid-controles'}
linux={'informatica-linux-permissoes-rwx','informatica-linux-comandos-diretorios'}
rows=[];keys=set();checks=[]
def normalize(s):return ' '.join(s.casefold().split())
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
for slug,addition in packs.items():
 m=materials[slug];assert m['content_status']=='active' and not re.search(r'direito|legisla|contabilidade',m['discipline'],re.I)
 if slug.startswith('enem-'):
  candidates=[t for t in topics.values() if t['content_status']=='current' and editions[t['edition_id']]['contest_name']=='ENEM' and t['discipline']==m['discipline'] and t['topic_order']==m['syllabus_topic_order']]
  assert len(candidates)==1,(slug,[t['id'] for t in candidates]);topic=candidates[0]
 else:
  if slug.startswith('portugues-'):tid=portuguese.get(slug,'5873244d-48e6-4241-a474-b5db3317d27f')
  elif slug.startswith('rlm-'):tid='a7ae3924-db95-4f19-9d59-67f2c3011458' if 'proposicoes' in slug else '3c989c30-37f2-41c5-84f0-65d9bf9e7a45'
  elif slug=='informatica-hardware-memorias-software':tid='d7de8327-3793-45a7-94ca-bb87b7a0a86a'
  elif slug=='informatica-backup-incremental-diferencial':tid='416e6d1d-62aa-4d1b-8808-acdf02b5ca1f'
  elif slug in network:tid='b2a1b459-a544-41c4-8ff8-db030d25841b'
  elif slug in security:tid='bef7a8b5-d550-4309-9e95-a911ea8f1906'
  elif slug in linux:tid='705afab1-ae16-46b8-8717-44d21d732faf'
  else:tid='07f9615d-857e-4b1f-bc95-ca5e6570bbf5'
  topic=topics[tid]
 edition=editions[topic['edition_id']];source=sources[edition['source_id']]
 assert topic['content_status']=='current' and edition['status']=='active' and source['is_official']
 quiz=list(m['quiz'] or []);assert len(quiz)==8,(slug,len(quiz))
 local={normalize(q['q']) for q in quiz};assert len(local)==len(quiz)
 cleaned=[]
 for q in addition:
  assert isinstance(q['a'],bool) and len(q['q'])>20 and len(q['why'])>60 and 'Exemplo:' in q['why'], (slug,q)
  k=normalize(q['q']);assert k not in local and k not in keys,('Repeated exercise',slug,q['q']);local.add(k);keys.add(k)
  if q.get('_check'):checks.append(dict(slug=slug,q=q['q'],**q['_check']))
  cleaned.append({k:q[k] for k in ['q','a','why']})
 final=quiz+cleaned;assert len(final)==20
 rows.append(dict(id=m['id'],slug=slug,discipline=m['discipline'],title=m['title'],topic_label=m['topic_label'],syllabus_topic_id=topic['id'],syllabus_topic_text=topic['topic_text'],edition_id=edition['id'],source_id=source['id'],source_url=source['url'],source_note='Vínculo a tópico real do edital/matriz cadastrado; exercícios autorais de fixação, sem atribuição à banca. Não certifica prazos atuais de edital histórico.',before_quiz=quiz,before_sha256=digest(quiz),additional_quiz=cleaned,quiz=final,after_sha256=digest(final)))
result=dict(version=1,authored_on='2026-10-24',scope='Conteúdo não jurídico e não contábil normativo',material_count=len(rows),new_exercises=sum(len(r['additional_quiz']) for r in rows),final_exercises=sum(len(r['quiz']) for r in rows),materials=sorted(rows,key=lambda r:r['slug']))
(destination/'supplements.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
(destination/'calculation-checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='materials'},ensure_ascii=False));print('Calculation checks',len(checks))
