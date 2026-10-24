"""Generate unapproved private candidates from explicitly collected other-area PDFs.
Usage: python scripts/idecan/build-other-areas-corpus.py WORK_DIRECTORY LIVE_SNAPSHOT_DIRECTORY
No network or database writes. PDFs/gabarito text must be verified before staging.
"""
import pathlib,json,re,hashlib,unicodedata,html,datetime,fitz,collections,difflib,sys
ROOT=pathlib.Path(__file__).resolve().parents[2];W=pathlib.Path(sys.argv[1]);LIVE=pathlib.Path(sys.argv[2]);OUT=W/'batch';OUT.mkdir(exist_ok=True)
def sha(x):return hashlib.sha256(x.encode() if isinstance(x,str) else x).hexdigest()
def norm(x):return ' '.join(unicodedata.normalize('NFC',html.unescape(str(x))).casefold().translate(str.maketrans({'“':'"','”':'"','‘':"'",'’':"'",'–':'-','—':'-','\u00ad':'','\u200b':''})).split())
def parts(raw):
 raw=re.sub(r'^\s*\d{1,3}[.)]\s+','',raw);ms=list(re.finditer(r'(?:^|\n)\s*(?:\(([A-E])\)|([A-E])[).])\s*',raw));ls=[m.group(1) or m.group(2) for m in ms]
 if ls not in [list('ABCD'),list('ABCDE')]:return raw,{}
 return raw[:ms[0].start()].strip(),{k:raw[m.end():ms[i+1].start() if i+1<len(ms) else len(raw)].strip() for i,(k,m) in enumerate(zip(ls,ms))}
def canon(stem,options):return norm(stem)+'\n'+'\n'.join(sorted(norm(v) for v in options.values()))
index={};stems={};contents=[];tokens_index=collections.defaultdict(set)
def add(stem,options,ref):
 if not str(stem).strip():return
 c=canon(stem,options);index.setdefault(sha(c),ref)
 if len(norm(stem))>=100:stems.setdefault(norm(stem),ref)
 i=len(contents);tokens=set(re.findall(r'\w+',c));contents.append((c,tokens,ref))
 for token in tokens:tokens_index[token].add(i)
counts={}
for table in ['board_exam_questions','curated_question_catalog','official_exam_questions','question_corpus_candidates']:
 rows=json.loads((LIVE/(table+'.json')).read_text());counts[table]=len(rows)
 for q in rows:
  ref={'table':table,'id':q['id']}
  if table=='board_exam_questions':add(q['stem'],q.get('options') or {},ref)
  elif table!='question_corpus_candidates':a,b=parts(q.get('question_text',''));add(a,b,ref)
  else:
   p=q['payload'];a,b=parts(p.get('raw_text',''));add(a,b,ref)
   for text in [p.get('question_text_candidate'),p.get('stem'),(p.get('publication') or {}).get('question_text')]:
    if isinstance(text,str):a,b=parts(text);add(a,b,ref)
def duplicate(stem,options):
 c=canon(stem,options);found=index.get(sha(c)) or stems.get(norm(stem))
 if found:return 'duplicate',found
 tokens=set(re.findall(r'\w+',c));votes=collections.Counter()
 for token in tokens:
  if 0<len(tokens_index[token])<700:votes.update(tokens_index[token])
 for i,_ in votes.most_common(35):
  other,ot,ref=contents[i]
  if len(tokens&ot)/max(1,len(tokens|ot))>=.85 and difflib.SequenceMatcher(None,c,other,autojunk=False).ratio()>=.94:return 'possible_duplicate',ref
 return None,None

def parse(doc,n):
 current=None;items=[]
 for pi,page in enumerate(doc):
  if pi==0:continue
  lines=[]
  for block in page.get_text('dict')['blocks']:
   for line in block.get('lines',[]):
    text=''.join(s['text'] for s in line['spans']).strip();box=line['bbox']
    if not text or text.startswith(('pcimarkpci','CARGO:','01125','01103')) or box[1]<45 or box[3]>page.rect.height-22 or re.fullmatch(r'-?\s*\d+\s*-?',text):continue
    lines.append((box,text))
  anchors=[x for x in lines if re.match(r'^\d{1,3}\.\s',x[1])]
  two=any(x[0][0]>page.rect.width/2 for x in anchors) or bool(anchors and all(x[0][2]<page.rect.width/2+12 for x in anchors))
  if two:
   top=min((x[0][1] for x in anchors),default=45);wide=[x for x in lines if x[0][0]<page.rect.width/2 and x[0][2]>page.rect.width/2+20 and x[0][1]<top]
   leading=[x for x in lines if x[0][1]<top] if wide else [];remaining=[x for x in lines if x not in leading]
   ordered=sorted(leading,key=lambda x:(round(x[0][1],1),x[0][0]))
   for col in [False,True]:ordered+=sorted([x for x in remaining if (x[0][0]>=page.rect.width/2)==col],key=lambda x:(round(x[0][1],1),x[0][0]))
  else:ordered=sorted(lines,key=lambda x:(round(x[0][1],1),x[0][0]))
  for box,text in ordered:
   if text in ['LÍNGUA PORTUGUESA','Língua Portuguesa','LEGISLAÇÃO DO SERVIÇO / SERVIDOR PÚBLICO FEDERAL','CONHECIMENTOS ESPECÍFICOS','CONHECIMENTOS GERAIS','Noções de Informática','Legislação e Ética no Serviço Público','RASCUNHO','TEXTO I','TEXTO II']:
    current=None;continue
   m=re.match(r'^(\d{1,3})\.\s',text)
   if m and int(m[1])==len(items)+1:
    current={'number':int(m[1]),'page':pi+1,'pages':[],'lines':[]};items.append(current)
   if current:
    current['lines'].append(text)
    if pi+1 not in current['pages']:current['pages'].append(pi+1)
  if items and items[-1]['number']==n:break
 if [x['number'] for x in items]!=list(range(1,n+1)):raise ValueError('Incomplete question numbering '+str([x['number'] for x in items]))
 return items

def table_key(text,role,n):
 match=re.search(r'^\s*'+re.escape(role)+r'\s*$',text,re.M)
 if not match:raise ValueError('Role not found in key '+role)
 lines=text[match.end():].splitlines();answers={}
 for i,line in enumerate(lines[:-1]):
  numbers=line.split()
  if len(numbers)>=5 and all(re.fullmatch(r'\d{2}',x) for x in numbers):
   letters=lines[i+1].split()
   if len(letters)!=len(numbers) or any(x not in ['A','B','C','D','E','X','*'] for x in letters):raise ValueError('Malformed answer row')
   for number,answer in zip(numbers,letters):
    if int(number) in answers:raise ValueError('Repeated key number')
    answers[int(number)]='X' if answer=='*' else answer
   if len(answers)==n:break
 if set(answers)!=set(range(1,n+1)):raise ValueError('Incomplete key')
 return answers

def source_pack(name,title,career,year,examtype,pdf,keypdf,url,keyurl,n):
 doc=fitz.open(pdf);raw='\f'.join(re.sub(r'(?m)^pcimarkpci[^\n]*\n?','',p.get_text()) for p in doc);sid=sha(pathlib.Path(pdf).read_bytes())
 source=dict(id=sid,title=title,publisher='IDECAN',publication_year=year,page_count=len(doc),raw_text=raw,metadata=dict(board='IDECAN',document_kind='question_booklet',contest_name=title,career_name=career,exam_year=year,exam_type=examtype,booklet_url=url,booklet_sha256=sid,booklet_host_type='mirror',answer_key_url=keyurl,answer_key_sha256=sha(pathlib.Path(keypdf).read_bytes()),answer_key_host_type='mirror',answer_key_verified_at_primary_source=False,answer_key_document_heading='GABARITO OFICIAL DEFINITIVO',publication_approved=False,watermark_removed_from_text_only=True,scope_note='Acervo histórico privado, sem revisão pedagógica/jurídica atual ou vínculo a edital ativo. PDFs obtidos em espelho público.'))
 return doc,dict(source=source,candidates=[])
report=dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),inventory_rows=counts,packs=[],duplicates=[],possible_duplicates=[],held=[],annulled=[],staged=[])
# Two visually recovered items, reusing the existing private booklet sources.
previous=ROOT/'supabase/imports/idecan/lote02-itens-ausentes-2026-10-23'
visual=[('pmsc',13,'Raciocínio Lógico e Matemático','Uma política de segurança estabelece: “Se o policiamento preventivo for reforçado (P), então a taxa de furtos diminuirá (Q)”.\nA expressão lógica tautológica que representa a equivalência dessa política é dada por:',{'A':'(P ∧ Q) ↔ (¬P ∨ ¬Q)','B':'(P → Q) ↔ (P ∧ ¬Q)','C':'(P → Q) ↔ (¬P ∨ Q)','D':'(P → Q) ↔ (Q → P)','E':'(P → Q) ↔ ¬(¬P ∧ Q)'},5),('cbmmg',10,'Matemática e Raciocínio Lógico','Seja M a matriz a seguir:\nM = [[1, -2, 3], [2, -1, 4], [3, 1, 2]].\nO determinante da matriz M é igual a:',{'A':'−4.','B':'−5.','C':'−7.','D':'−6.'},4)]
for name,number,subject,stem,options,page in visual:
 old=json.loads((previous/(name+'-corpus.json')).read_text());source=old['source'];kind,ref=duplicate(stem,options)
 if kind:report['duplicates' if kind=='duplicate' else 'possible_duplicates'].append({'booklet':name,'item_number':number,'match':ref});continue
 sid=source['id'];key='tipo-a:q'+str(number).zfill(3);cid=sha(sid+':'+key);raw=str(number)+'. '+stem+'\n'+'\n'.join(f'({k}) {v}' for k,v in options.items())
 recovery=dict(pdf_sha256=sid,page=page,visual_inspection_completed=True,transcription_note='Transcrição acessível conferida na imagem original; ∼ representado por ¬.' if name=='pmsc' else 'Matriz recuperada visualmente: três linhas [1,-2,3], [2,-1,4], [3,1,2].')
 payload=dict(raw_text=raw,item_number=number,source_pages=[page],stem_extracted=stem,options_extracted=options,alternative_labels_extracted=list(options),answer_in_official_document='C',annulled_in_document=False,visual_review_required=False,context_review_required=False,legal_review_required=False,syllabus_mapping_required=True,publication_approved=False,content_fingerprint=sha(canon(stem,options)),identity={k:source['metadata'][k] for k in ['contest_name','career_name','exam_year','exam_type']},visual_recovery=recovery,dedup_checked_at=report['checked_at'],publication_blockers=['Confirmar tópico real de edital e revisão pedagógica antes de publicar.'])
 candidate=dict(id=cid,corpus_id=sid,source_key=key,discipline=subject,source_page=page,payload=payload,content_status='under_review');pack=dict(source=source,candidates=[candidate]);filename=name+'-visual-corpus.json';(OUT/filename).write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n');report['packs'].append({'booklet':name+'-visual','source_id':sid,'candidates':1});report['staged'].append({'booklet':name+'-visual','candidate_id':cid,'item_number':number,'subject':subject});add(stem,options,{'table':'current_batch','id':cid})
# Other professional areas with successfully downloaded, publicly linked PDFs.
finalkey=W/'idecan-2019-if-pb-assistente-em-administracao-answer_key.pdf';finaltext=finalkey.with_suffix('.txt').read_text();finalurl='https://arquivos.qconcursos.com/prova/arquivo_gabarito/62174/idecan-2019-if-pb-assistente-em-administracao-gabarito.pdf'
configs=[('administracao','IFPB 2019 — Assistente em Administração','Assistente em Administração',2019,'Caderno único',W/'idecan-2019-if-pb-assistente-em-administracao-booklet.pdf',finalkey,'https://arquivos.qconcursos.com/prova/arquivo_prova/62174/idecan-2019-if-pb-assistente-em-administracao-prova.pdf',finalurl,50,'ASSISTENTE EM ADMINISTRAÇÃO'),('nutricao','IFPB 2019 — Nutricionista','Nutricionista',2019,'Caderno único',W/'nutricionista-booklet.pdf',finalkey,'https://arquivos.qconcursos.com/prova/arquivo_prova/62187/idecan-2019-if-pb-nutricionista-prova.pdf',finalurl,50,'NUTRICIONISTA'),('historia','AL-CE 2026 — Pesquisa Histórica e Sociocultural','Analista Legislativo — Pesquisa Histórica e Sociocultural',2026,'Tipo A',W/'idecan-2026-al-ce-pesquisa-historica-e-sociocultural-booklet.pdf',W/'idecan-2026-al-ce-pesquisa-historica-e-sociocultural-answer_key.pdf','https://arquivos.qconcursos.com/prova/arquivo_prova/157633/idecan-2026-al-ce-pesquisa-historica-e-sociocultural-prova.pdf','https://arquivos.qconcursos.com/prova/arquivo_gabarito/157633/idecan-2026-al-ce-pesquisa-historica-e-sociocultural-gabarito.pdf',70,'01125')]
for name,title,career,year,examtype,pdf,kpdf,url,kurl,n,role in configs:
 doc,pack=source_pack(name,title,career,year,examtype,pdf,kpdf,url,kurl,n);keytext=kpdf.with_suffix('.txt').read_text()
 if 'GABARITO OFICIAL DEFINITIVO' not in keytext:raise ValueError('Non-final answer document')
 if role=='01125':
  segment=keytext.split(role,1)[1].split('PROVA TIPO A',1)[1].split('PROVA TIPO',1)[0];pairs=re.findall(r'\b(\d{2,3}):\s*([ABCDEX])',segment);answers={int(k):v for k,v in pairs}
  if len(pairs)!=n or set(answers)!=set(range(1,n+1)):raise ValueError('Wrong legislative key section')
 else:answers=table_key(keytext,role,n)
 items=parse(doc,n)
 for item in items:
  number=item['number'];base={'booklet':name,'item_number':number}
  if answers[number]=='X':report['annulled'].append(base);continue
  raw='\n'.join(item['lines']);stem,options=parts(raw)
  if len(options) not in [4,5] or any(not x.strip() for x in options.values()) or answers[number] not in options:report['held'].append(dict(base,reason='Alternativas/contexto textual incompletos; revisão visual necessária'));continue
  kind,ref=duplicate(stem,options)
  if kind:report['duplicates' if kind=='duplicate' else 'possible_duplicates'].append(dict(base,match=ref));continue
  subject=('Língua Portuguesa' if number<=20 else 'Legislação do Serviço Público Federal' if number<=30 else 'Administração' if name=='administracao' else 'Nutrição') if name!='historia' else ('Língua Portuguesa' if number<=10 else 'Informática' if number<=15 else 'Legislação e Ética no Serviço Público' if number<=20 else 'História e Patrimônio Cultural')
  source=pack['source'];sid=source['id'];key=('tipo-a' if year==2026 else 'unico')+':q'+str(number).zfill(3);cid=sha(sid+':'+key)
  legal=bool(re.search(r'legisla|direito|\blei\b|constitui|decreto|resolu[çc]|\bLDB\b|\bECA\b',subject+' '+stem,re.I))
  payload=dict(raw_text=raw,item_number=number,source_pages=item['pages'],stem_extracted=stem,options_extracted=options,alternative_labels_extracted=list(options),answer_in_reference_document=answers[number],answer_key_status='definitive_heading_in_mirror_pdf',answer_key_requires_clarification=True,annulled_in_document=False,visual_review_required=True,context_review_required=True,legal_review_required=legal,syllabus_mapping_required=True,publication_approved=False,content_fingerprint=sha(canon(stem,options)),dedup_checked_at=report['checked_at'],identity={'board':'IDECAN','contest_name':title,'career_name':career,'exam_year':year,'exam_type':examtype},publication_blockers=['Conferir gabarito no canal oficial primário e eventuais retificações.','Revisar contexto, imagens, texto de apoio e tópico de edital ativo.','Produzir/revisar explicação didática e exemplo.'])
  if legal:payload['publication_blockers'].append('Conferir vigência/aplicação temporal em fonte legislativa oficial.')
  if subject=='Nutrição':payload['clinical_review_required']=True;payload['publication_blockers'].append('Revisão clínica/nutricional atual com fontes oficiais de saúde/CFN antes de uso didático.')
  c=dict(id=cid,corpus_id=sid,source_key=key,discipline=subject,source_page=item['page'],payload=payload,content_status='under_review');pack['candidates'].append(c);report['staged'].append(dict(base,candidate_id=cid,subject=subject));add(stem,options,{'table':'current_batch','id':cid})
 if pack['candidates']:(OUT/(name+'-corpus.json')).write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n');report['packs'].append({'booklet':name,'source_id':pack['source']['id'],'candidates':len(pack['candidates'])})
report['summary']={k:len(report[k]) for k in ['staged','duplicates','possible_duplicates','held','annulled']};(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'summary':report['summary'],'packs':report['packs']},ensure_ascii=False))
