"""Extract absent items from four known booklets using current educational snapshots.
Usage: python scripts/idecan/build-missing-item-corpus.py WORK_DIRECTORY
Inputs: booklet/key PDFs, key-evidence.json, live/*.json outside Git. No network/database writes.
"""
import pathlib,json,hashlib,fitz,re,unicodedata,html,datetime,collections,difflib,sys
ROOT=pathlib.Path(__file__).resolve().parents[2];WORK=pathlib.Path(sys.argv[1]);LIVE=WORK/'live';OUT=WORK/'missing-items';OUT.mkdir(exist_ok=True)
legacy=json.loads((ROOT/'supabase/imports/idecan/idecan_questions.json').read_text());board=json.loads((LIVE/'board_exam_questions.json').read_text());curated=json.loads((LIVE/'curated_question_catalog.json').read_text());official=json.loads((LIVE/'official_exam_questions.json').read_text());private=json.loads((LIVE/'question_corpus_candidates.json').read_text());private_sources={s['id']:s for s in json.loads((LIVE/'question_corpus_sources.json').read_text())}
sources=json.loads((ROOT/'supabase/imports/idecan/revisao-integral/fontes-coletadas.json').read_text());keys={x['label']:x for x in json.loads((WORK/'key-evidence.json').read_text()) if 'error' not in x}

def sha(v):return hashlib.sha256(v.encode() if isinstance(v,str) else v).hexdigest()
def norm(text):
 t=unicodedata.normalize('NFC',html.unescape(str(text))).casefold().translate(str.maketrans({'“':'"','”':'"','‘':"'",'’':"'",'–':'-','—':'-','\u00ad':'','\u200b':''}))
 return ' '.join(t.split())
def parts(raw):
 raw=re.sub(r'^\s*\d{1,3}[.)]\s+','',raw)
 matches=list(re.finditer(r'(?:^|\n)\s*(?:\(([A-E])\)|([A-E])[).])\s*',raw))
 if len(matches) not in (4,5):return raw,{}
 labels=[m.group(1) or m.group(2) for m in matches]
 if labels!=list('ABCDE')[:len(labels)]:return raw,{}
 return raw[:matches[0].start()].strip(),{label:raw[m.end():matches[i+1].start() if i+1<len(matches) else len(raw)].strip() for i,(label,m) in enumerate(zip(labels,matches))}
def canonical(stem,options):return norm(stem)+'\n'+'\n'.join(sorted(norm(v) for v in options.values()))
exact=collections.defaultdict(list);stems=collections.defaultdict(list);all_content=[]
def index(stem,options,ref):
 if not stem.strip():return
 c=canonical(stem,options);exact[sha(c)].append(ref)
 if len(norm(stem))>=80:stems[norm(stem)].append(ref)
 all_content.append((c,ref,set(re.findall(r'\w+',c))))
for q in board:index(q['stem'],q.get('options') or {},dict(table='board_exam_questions',id=q['id']))
for table,rows in [('curated_question_catalog',curated),('official_exam_questions',official)]:
 for q in rows:
  stem,options=parts(q.get('question_text') or '');index(stem,options,dict(table=table,id=q['id']))
for q in private:
 payload=q['payload'];text=payload.get('raw_text') or '';stem,options=parts(text)
 index(stem,options,dict(table='question_corpus_candidates',id=q['id']))
 # Published/context-restored versions can have a different representation.
 for field in ['question_text_candidate','stem']:
  if isinstance(payload.get(field),str):
   st,op=parts(payload[field]);index(st,op,dict(table='question_corpus_candidates',id=q['id']))
 publication=payload.get('publication') or {}
 if publication.get('question_text'):
  stem,options=parts(publication['question_text']);index(stem,options,dict(table='question_corpus_candidates',id=q['id']))

def parse_pdf(doc,limit):
 items=[];current=None;prefix=[]
 for pi,page in enumerate(doc):
  if pi==0:continue
  lines=[]
  for block in page.get_text('dict')['blocks']:
   for line in block.get('lines',[]):
    text=''.join(s['text'] for s in line['spans']).strip();box=line['bbox']
    if text and box[1]>60 and box[3]<page.rect.height-18 and not re.fullmatch(r'\d+',text):lines.append((box,text))
  anchors=[x for x in lines if re.match(r'^\d{1,3}\.\s',x[1])]
  # Recover the booklet reading order: full-width passages first; then each column.
  two=any(x[0][0]>page.rect.width/2 for x in anchors) or (anchors and all(x[0][2]<page.rect.width/2+12 for x in anchors))
  if two:
   wide=[x for x in lines if x[0][0]<page.rect.width/2 and x[0][2]>page.rect.width/2+20]
   top=min((x[0][1] for x in anchors),default=60)
   leading=[x for x in lines if x[0][1]<top] if any(x[0][1]<top for x in wide) else []
   remaining=[x for x in lines if x not in leading]
   ordered=sorted(leading,key=lambda x:(round(x[0][1],1),x[0][0]))
   for col in [False,True]:ordered+=sorted([x for x in remaining if (x[0][0]>=page.rect.width/2)==col],key=lambda x:(round(x[0][1],1),x[0][0]))
  else:ordered=sorted(lines,key=lambda x:(round(x[0][1],1),x[0][0]))
  for box,text in ordered:
   if text in {'RASCUNHO','Legislação Institucional','Legislação Penal','Informática','Direitos Humanos e Legislação','Língua Portuguesa','Matemática e Raciocínio Lógico','Raciocínio Lógico e Matemático','Geografia de Santa Catarina','Inglês','Noções de Contabilidade','CONHECIMENTOS ESPECÍFICOS'} or text.startswith('Tecnologia da Informação,'):
    current=None;continue
   m=re.match(r'^(\d{1,3})\.\s',text)
   if m:
    n=int(m[1])
    if n>limit:continue
    current=dict(number=n,page=pi+1,pages=[],lines=[]);items.append(current)
   if current and current['number']<=limit:
    current['lines'].append(text)
    if pi+1 not in current['pages']:current['pages'].append(pi+1)
  if items and items[-1]['number']==limit:
   # Last question is not needed by this batch; do not ingest discursives/rough pages.
   break
 if [x['number'] for x in items]!=list(range(1,limit+1)):raise ValueError('Question numbering incomplete/out of order')
 return items

def read_key(label,kind,n):
 text=(WORK/(label+'-key.txt')).read_text();section=text.split('PROVA TIPO '+kind,1)[1].split('PROVA TIPO',1)[0]
 pairs=re.findall(r'\b(\d{2,3}):\s*([ABCDEX])',section);answers={int(a):b for a,b in pairs}
 if len(pairs)!=n or set(answers)!=set(range(1,n+1)):raise ValueError('Incomplete or duplicated answer key')
 return answers

configs=[('pcsc-agente','PC SC - Agente de Polícia Civil 2026','B',100),('pmsc','PMSC - Aluno-Soldado Temporário 2026','A',50),('cbmmg','CBMMG - CFO BM 2027 (Cadete BM) 2026','A',50),('pcsc-escrivao','PC SC - Escrivão de Polícia Civil 2026','A',100)]
report=dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),live_rows={t:len(r) for t,r in [('board',board),('curated',curated),('official',official),('private_candidates',private)]},already_registered=[],annulled_excluded=[],duplicate_content=[],possible_duplicates=[],incomplete_held=[],staged=[],packs=[])
for label,contest,kind,n in configs:
 doc=fitz.open(WORK/(label+'-booklet.pdf'));pdf=(WORK/(label+'-booklet.pdf')).read_bytes();sourceid=sha(pdf);expected=next(x['sha256'] for x in sources if x['label']==label and x['kind']=='source_url')
 if sourceid!=expected:raise ValueError('Booklet hash differs from validated source')
 answers=read_key(label,kind,n)
 model=next(q for q in legacy if q['contest_name']==contest);known={q['item_number'] for q in board if q['board'].upper()=='IDECAN' and q['contest_name']==contest and q['exam_type']==model['exam_type']}
 candidates=[];items=parse_pdf(doc,n)
 for item in items:
  number=item['number'];base=dict(booklet=label,item_number=number)
  if number in known:report['already_registered'].append(base);continue
  if answers[number]=='X':report['annulled_excluded'].append(base);continue
  raw='\n'.join(item['lines'])
  if (label=='pmsc' and number==13) or (label=='cbmmg' and number==10):
   report['incomplete_held'].append(dict(**base,reason='Fórmula/matriz exige recuperação visual antes de criar candidato',raw_text=raw));continue
  # Remove the next section/rough heading; do not remove content from options.
  raw=re.split(r'\n(?:RASCUNHO|Legislação Institucional|Legislação Penal|Informática|Direitos Humanos e Legislação|Língua Portuguesa|Matemática e Raciocínio Lógico|Raciocínio Lógico-Matemático)\s*$',raw)[0]
  stem,options=parts(raw)
  if len(options) not in (4,5) or any(not value.strip() for value in options.values()) or answers[number] not in options:
   report['incomplete_held'].append(dict(**base,reason='Alternativas textuais incompletas; exige revisão visual',raw_text=raw));continue
  content=canonical(stem,options);fingerprint=sha(content)
  matches=exact.get(fingerprint) or stems.get(norm(stem))
  if matches:report['duplicate_content'].append(dict(**base,matches=matches[:5]));continue
  tokens=set(re.findall(r'\w+',content));possible=[]
  for previous,ref,ptokens in all_content:
   jaccard=len(tokens&ptokens)/max(1,len(tokens|ptokens))
   if jaccard>=.85 and difflib.SequenceMatcher(None,content,previous,autojunk=False).ratio()>=.94:possible.append(ref)
  if possible:report['possible_duplicates'].append(dict(**base,matches=possible[:5]));continue
  if label=='pcsc-agente':subject='Legislação Institucional' if number in [37,38,39] else 'Contabilidade'
  elif label=='pmsc':subject='Língua Portuguesa' if number<5 else 'Raciocínio Lógico e Matemático' if number<=13 else 'Informática' if number<=23 else 'Legislação Institucional'
  else:subject='Matemática e Raciocínio Lógico' if number==10 else 'Direitos Humanos e Legislação'
  key='tipo-'+kind.lower()+':q'+str(number).zfill(3);cid=sha(sourceid+':'+key)
  payload=dict(raw_text=raw,item_number=number,source_pages=item['pages'],stem_extracted=stem,options_extracted=options,answer_in_official_document=answers[number],annulled_in_document=False,alternative_labels_extracted=list(options),context_review_required=True,visual_review_required=True,legal_review_required=bool(re.search(r'direito|legisla',subject,re.I)),local_legislation_review_required=subject in ['Legislação Institucional','Direitos Humanos e Legislação'],syllabus_mapping_required=True,publication_approved=False,content_fingerprint=fingerprint,dedup_checked_at=report['checked_at'],identity={k:model[k] for k in ['board','contest_name','career_name','exam_year','exam_type']},review_note='Extração para análise privada: não revisada nem autorizada para treino. Caderno e gabarito definitivo identificados por hash; legislação, imagens/contexto e tópico de edital permanecem pendentes.')
  if subject=='Contabilidade':payload['normative_review_required']=['accounting'];payload['normative_source_required']='Conselho Federal de Contabilidade — versão aplicável da NBC/ITG'
  candidates.append(dict(id=cid,corpus_id=sourceid,source_key=key,discipline=subject,source_page=item['page'],payload=payload,content_status='under_review'))
  report['staged'].append(dict(**base,candidate_id=cid,subject=subject,pages=item['pages'],answer=answers[number]))
  index(stem,options,dict(table='new_private_batch',id=cid))
 if candidates:
  sourceurl=next(x['url'] for x in sources if x['label']==label and x['kind']=='source_url');evidence=keys[label]
  source=dict(id=sourceid,title=contest+' — '+model['exam_type']+' — itens ausentes para análise',publisher='IDECAN',publication_year=2026,page_count=len(doc),raw_text='\f'.join(p.get_text() for p in doc),metadata=dict(board='IDECAN',document_kind='question_booklet',contest_name=contest,career_name=model['career_name'],exam_year=2026,exam_type=model['exam_type'],booklet_url=sourceurl,booklet_host_type='mirror',booklet_sha256=sourceid,answer_key_url=evidence['url'],answer_key_sha256=evidence['sha256'],contest_page_url=evidence['contest_page_url'],answer_key_raw_text=(WORK/(label+'-key.txt')).read_text(),publication_approved=False,local_legislation_not_transferable=True,extraction_scope='Somente posições ausentes no catálogo e sem correspondência exata/suspeita na leitura atual dos acervos públicos e privados.'))
  pack=dict(source=source,candidates=candidates);report['packs'].append(dict(booklet=label,source_id=sourceid,candidates=len(candidates)));(OUT/(label+'-corpus.json')).write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n')
 # Keep the extracted items outside Git for inspection; known items never become seeds.
 (OUT/(label+'-all-segments.json')).write_text(json.dumps(items,ensure_ascii=False,indent=2))
report['summary']={key:len(report[key]) for key in ['already_registered','annulled_excluded','duplicate_content','possible_duplicates','incomplete_held','staged']}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report['summary']));print(json.dumps(report['staged'],ensure_ascii=False))
