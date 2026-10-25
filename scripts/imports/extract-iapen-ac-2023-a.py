import fitz,re,json,hashlib,uuid,argparse
from pathlib import Path
from datetime import datetime,timezone
parser=argparse.ArgumentParser(description='Extrai caderno A e gabarito final; requer PyMuPDF. Diretório com paper.pdf, key.pdf e sources.json.')
parser.add_argument('input_dir',type=Path)
root=parser.parse_args().input_dir;paper=fitz.open(root/'paper.pdf');keydoc=fitz.open(root/'key.pdf')
def clean(t):
 t=re.sub(r'(?<=\w)-\s*\n\s*(?=\w)','-',t)
 return re.sub(r'\s+',' ',t).strip()
# PDF physical pages 3..14 contain the 60 objective items. The essay starts on 15.
chunks=[];offset=0;positions=[];support=None
headings={'LÍNGUA PORTUGUESA','HISTÓRIA E GEOGRAFIA DO ACRE','INFORMÁTICA BÁSICA','CONHECIMENTOS ESPECÍFICOS'}
for pageindex in range(2,14):
 page=paper[pageindex];w=page.rect.width
 for col,rect in enumerate([fitz.Rect(0,30,w/2,805),fitz.Rect(w/2,30,w,805)]):
  text=page.get_text(clip=rect,sort=True)
  text='\n'.join(line for line in text.splitlines()if line.strip()not in headings)
  if pageindex==2 and col==0:support=clean(text);continue
  positions.append((offset,pageindex+1));chunks.append(text);offset+=len(text)+1
alltext='\n'.join(chunks);markers=list(re.finditer(r'(?m)^\s*(\d{1,2})\)\s+',alltext))
assert [int(m[1])for m in markers]==list(range(1,61))
# Sort=True keeps the header and answer cells of the 5-column final-key matrix aligned.
keytext=keydoc[0].get_text(sort=True);kt=[t for t in keytext.split()if re.fullmatch(r'\d+|[ABCD*]',t)]
answers={};cursor=0
for n in range(1,61,5):
 labels=list(map(str,range(n,n+5)));found=[j for j in range(cursor,len(kt)-5)if kt[j:j+5]==labels];assert len(found)==1
 j=found[0];a=kt[j+5:j+10];assert len(a)==5 and all(v in 'ABCD*'for v in a)
 answers.update(zip(range(n,n+5),['X'if v=='*'else v for v in a]));cursor=j+10
assert {n for n,v in answers.items()if v=='X'}=={3}
topics={1:'c665f894-1650-4c5c-a080-341ecd3910a1',11:'8a2a9188-be7b-4701-9656-b09d49f9d59b',21:'c68782fd-7a3e-4c32-86dc-cffa31000f57',31:'64465d5e-79da-4411-b83b-1532df64ace5'}
now=datetime.now(timezone.utc).isoformat();sources=json.loads((root/'sources.json').read_text());urls={s['kind']:s['url']for s in sources};items=[]
for i,m in enumerate(markers):
 n=int(m[1]);raw=alltext[m.end():markers[i+1].start()if i<59 else len(alltext)].strip()
 opts=list(re.finditer(r'(?m)^\s*([abcd])\)\s+',raw));assert [o[1]for o in opts]==list('abcd'),(n,[o[1]for o in opts])
 stem=clean(raw[:opts[0].start()]);options={o[1].upper():clean(raw[o.end():opts[k+1].start()if k<3 else len(raw)])for k,o in enumerate(opts)}
 assert all(options.values())and stem
 physical=max((p for off,p in positions if off<=m.start(1)),default=3)
 subject='Língua Portuguesa'if n<=10 else'História e Geografia do Acre'if n<=20 else'Informática Básica'if n<=30 else'Conhecimentos Específicos'
 start=1 if n<=10 else 11 if n<=20 else 21 if n<=30 else 31
 answer=answers[n];status='archived'if answer=='X'else'under_review'
 note=f'IBFC_02, versão A; gabarito pós-recurso IBFC conferido; página física {physical} (página impressa {physical-2}); origem do caderno: espelho PCI Concursos. '
 note+= 'Questão 3 anulada (*) no gabarito pós-recurso; fora do treino.'if answer=='X'else'Revisão individual de conteúdo, contexto e edital atual pendente; não publicar.'
 row=dict(id=str(uuid.uuid5(uuid.NAMESPACE_URL,f'official:IBFC:IAPEN2023:IBFC02:A:{n}')),board='IBFC',contest_name='Polícia Penal do Acre',career_name='Agente de Polícia Penal',exam_year=2023,exam_type='IBFC_02 — Versão A',item_number=n,subject=subject,syllabus_topic_id=topics[start],support_text=support if n<=10 else None,stem=stem,options=options,official_answer=answer,needs_visual=True,legal_review_required=n>=31,legal_basis=[],source_url=urls['paper'],answer_key_url=urls['key'],content_status=status,review_note=note,verified_at=now)
 items.append(dict(row=row,source_page=physical,raw_extraction=raw))
pack=dict(batch_id='iapen-ac-2023-ibfc02-a-import-fix-2026-10-18',checked_at=now,sources=sources,items=items,total=60,under_review=59,archived_annulled=[3],published=0)
(root/'pack.json').write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'items':len(items),'key3':answers[3],'physical_pages':sorted(set(i['source_page']for i in items)),'q60_ends':items[-1]['row']['options']['D']}))
