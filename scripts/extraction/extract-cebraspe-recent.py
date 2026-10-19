#!/usr/bin/env python3
"""Offline extraction of verified Cebraspe PDFs. Produces review artifacts, never SQL or DB writes."""
import argparse,collections,csv,datetime,hashlib,json,re,subprocess,unicodedata,urllib.request,zipfile
from pathlib import Path
import pymupdf


def norm(text):
    return re.sub(r'\s+',' ',''.join(c for c in unicodedata.normalize('NFKD',text) if not unicodedata.combining(c))).strip().upper()


def content_fingerprint(support, stem, options):
    # Only layout whitespace is normalized. Accents, case, punctuation and
    # symbols are significant; “tem” and “têm” must never become equal.
    clean=lambda text:re.sub(r'\s+',' ',unicodedata.normalize('NFC',text)).strip()
    content=[clean(support),clean(stem),{k:clean(v) for k,v in options.items()}]
    return hashlib.sha256(json.dumps(content,ensure_ascii=False,sort_keys=True).encode()).hexdigest()


def signature(title):
    t=norm(title).split(' E GABARITO PRELIMINAR')[0]
    t=re.sub(r'^(GABARITO DEFINITIVO|PROVAS? OBJETIVAS?)\s*[-–—]?\s*','',t)
    t=re.sub(r'^PROVAS? OBJETIVAS?\s*','',t)
    return re.sub(r'[^A-Z0-9]+',' ',t).strip()


def parse_key(text):
    answer={};numbers=None
    for line in text.splitlines():
        if re.match(r'^\s*(Item|Quest[aã]o)\s+\d',line,re.I):
            numbers=list(map(int,re.findall(r'\d+',line)))
        elif numbers is not None and re.match(r'^\s*Gabarito\b',line,re.I):
            values=re.sub(r'^\s*Gabarito\s*','',line,flags=re.I).split()
            if len(values)!=len(numbers):raise ValueError('Answer key has unaligned number/answer rows')
            for n,a in zip(numbers,values):
                if n==0:continue
                if a not in 'ABCDEX' or len(a)!=1:raise ValueError(f'Invalid official answer {n}: {a}')
                if n in answer and answer[n]!=a:raise ValueError('Conflicting key versions')
                answer[n]=a
            numbers=None
    if not answer:raise ValueError('No definitive answer extracted')
    if set(answer)!=set(range(min(answer),max(answer)+1)):raise ValueError('Noncontiguous key')
    return answer


def page_rows(page, page_number):
    """Reading order is page -> left column -> right column; do not interleave line baselines."""
    raw=page.get_text('dict')['blocks'];title_bottom=40
    for b in raw:
        for line in b.get('lines',[]):
            text=''.join(s['text'] for s in line['spans']).strip()
            if line['bbox'][1]<230 and re.search(r'PROVAS? OBJETIVAS?|--\s*(CONHECIMENTOS|EIXO)',norm(text)):
                if max((s['size'] for s in line['spans']),default=0)>=11:title_bottom=max(title_bottom,line['bbox'][3]+2)
    columns=[[],[]];mid=page.rect.width/2
    for bi,b in enumerate(raw):
        for li,line in enumerate(b.get('lines',[])):
            for span in line['spans']:
                text=span['text'].strip()
                if not text or span['size']<5.5 or span['bbox'][1]<title_bottom or span['bbox'][1]>810:continue
                if re.match(r'^(CEBRASPE\b|<[^>]+>)',text,re.I):continue
                col=0 if span['bbox'][0]<mid else 1
                columns[col].append({'text':text,'bbox':list(span['bbox']),'baseline':span['origin'][1],'size':span['size'],'block':bi,'original':span['text']})
    rows=[]
    for col,spans in enumerate(columns):
        groups=[]
        for sp in sorted(spans,key=lambda s:(s['baseline'],s['bbox'][0])):
            if groups and abs(groups[-1][0]['baseline']-sp['baseline'])<1.6:groups[-1].append(sp)
            else:groups.append([sp])
        for group in groups:
            ordered=sorted(group,key=lambda s:s['bbox'][0]);text='';last=None
            for sp in ordered:
                if last is not None and (sp['bbox'][0]-last['bbox'][2]>.5 or last['original'].endswith(' ') or sp['original'].startswith(' ')):text+=' '
                text+=sp['text'];last=sp
            bbox=[min(s['bbox'][0] for s in group),min(s['bbox'][1] for s in group),max(s['bbox'][2] for s in group),max(s['bbox'][3] for s in group)]
            text=re.sub(r'\s+',' ',text).strip()
            if not text or re.fullmatch(r'(Espaço livre|Rascunho)',text,re.I):continue
            rows.append({'text':text,'page':page_number,'column':col,'bbox':bbox,'blocks':sorted(set(s['block'] for s in group)),'item_label':bool(re.fullmatch(r'\d{1,3}',ordered[0]['text']) and ordered[0]['size']<9.6)})
    return rows


def find_anchors(rows, multiple_choice, start):
    expected=start;anchors=[]
    for idx,row in enumerate(rows):
        t=row['text'];match=re.match(r'^QUEST[AÃ]O\s+(\d{1,3})\b',t,re.I) if multiple_choice else re.match(r'^(\d{1,3})(?:\s|$)',t)
        if not match:continue
        if not multiple_choice:
            left=28 if row['column']==0 else 303
            if row['bbox'][0]>left+8 or not row.get('item_label',True):continue
        n=int(match.group(1))
        if n!=expected:continue
        anchors.append((idx,n,match.end()));expected+=1
    return anchors


def joined(rows):
    return '\n'.join(r['text'] for r in rows).strip()


def split_ce(segment):
    """New shared commands start at the column margin; item continuations are indented."""
    for k,row in enumerate(segment[1:],1):
        t=norm(row['text']);left=28 if row['column']==0 else 303
        if row['bbox'][0]<=left+8 and re.match(r'^(JULGUE|ACERCA|A RESPEITO|COM (BASE|RELACAO)|CONSIDERANDO|NO QUE|A LUZ|EM RELACAO|SOBRE |QUANTO |NO TOCANTE|NOS ITENS|TENDO |TEXTO\b)',t):
            start=k
            first=segment[0]
            # Some PDFs split the last line of an item into a separate block.
            # Consider every completed boundary, not only the first block change.
            for j,r in enumerate(segment[1:k],1):
                previous=segment[j-1]
                region_change=(r['page'],r['column'])!=(previous['page'],previous['column'])
                block_change=not set(r['blocks']).intersection(previous['blocks'])
                margin=28 if r['column']==0 else 303
                context_indent=r['bbox'][0]<=margin+8 or r['bbox'][0]>=margin+24
                if (region_change or (block_change and context_indent)) and re.search(r'[.!?]$',previous['text']):
                    start=j;break
            return segment[:start],segment[start:]
    return segment,[]


def separate_justification(rows):
    # The final key always comes from a separate verified PDF. Preliminary prose is never a published explanation.
    start=next((k for k,r in enumerate(rows) if re.search(r'JUSTIFICATIVA|^\|\|[A-E]\|\|',r['text'])),None)
    if start is None:return rows,'',[]
    before=rows[:start];after=rows[start:];finish=None
    for k,r in enumerate(after):
        if '<FimJust>' in r['text']:finish=k+1;break
    if finish is not None:return before,joined(after[:finish]),after[finish:]
    if '||JUSTIFICATIVAS||' in after[0]['text'] or re.match(r'^\|\|[A-E]\|\|',after[0]['text']):
        # Multiple-choice commented papers delimit each option comment with */.
        ends=[k for k,r in enumerate(after) if '*/' in r['text']]
        if ends:return before,joined(after[:ends[-1]+1]),after[ends[-1]+1:]
    return before,joined(after),[]


def parse_options(rows, expected_letters):
    # A stem can begin with the Portuguese article “A”. The actual option A
    # is the LAST margin-aligned A before the first B, not the first A in the stem.
    candidates=[]
    for idx,row in enumerate(rows):
        m=re.match(r'^([A-E])(?:\s+|$)(.*)',row['text']);left=28 if row['column']==0 else 303
        if m and row['bbox'][0]<=left+9:candidates.append((idx,m.group(1),m.group(2)))
    first_b=next((idx for idx,letter,_ in candidates if letter=='B'),None)
    starts=[c for c in candidates if c[1]=='A' and (first_b is None or c[0]<first_b)]
    if not starts:return joined(rows),{},[]
    current=starts[-1];markers=[current]
    for letter in expected_letters[1:]:
        nxt=next((c for c in candidates if c[0]>current[0] and c[1]==letter),None)
        if nxt is None:break
        markers.append(nxt);current=nxt
    stem=joined(rows[:markers[0][0]]);options={};context=[]
    for pos,(idx,letter,remainder) in enumerate(markers):
        end=markers[pos+1][0] if pos+1<len(markers) else len(rows)
        option_rows=rows[idx+1:end]
        split=next((j for j,r in enumerate(option_rows) if re.match(r'^Texto\s+[A-Z0-9]',r['text'],re.I)),None)
        if split is not None:context=option_rows[split:];option_rows=option_rows[:split]
        options[letter]='\n'.join([remainder,*[r['text'] for r in option_rows]]).strip()
    return stem,options,context


def source_regions(rows):
    grouped=collections.defaultdict(list)
    for row in rows:grouped[(row['page'],row['column'])].append(row['bbox'])
    return [{'page':p,'column':c,'bbox':[round(min(b[0] for b in boxes),2),round(min(b[1] for b in boxes),2),round(max(b[2] for b in boxes),2),round(max(b[3] for b in boxes),2)]} for (p,c),boxes in grouped.items()]


def extract_document(event, booklet, key_doc):
    path=Path(booklet['local_file']);sha=hashlib.sha256(path.read_bytes()).hexdigest()
    if sha!=booklet['sha256']:raise ValueError('Booklet SHA mismatch')
    key={};exam_date=None
    if key_doc:
        kp=Path(key_doc['local_file'])
        if hashlib.sha256(kp.read_bytes()).hexdigest()!=key_doc['sha256']:raise ValueError('Definitive key SHA mismatch')
        key_text=subprocess.check_output(['pdftotext','-layout',str(kp),'-'],timeout=30).decode('utf-8')
        key=parse_key(key_text)
        applied=re.search(r'Aplica[çc][aã]o:\s*(\d{1,2})/(\d{1,2})/(\d{4})',key_text,re.I)
        if applied:exam_date=datetime.date(int(applied[3]),int(applied[2]),int(applied[1])).isoformat()
    mc=event['event'] in ['PM_DF_25_CFO','PC_MG_25_TPAG','PC_CE_25_DELEGADO']
    rows=[]
    with pymupdf.open(path) as pdf:
        for pi,page in enumerate(pdf):rows+=page_rows(page,pi+1)
        page_count=len(pdf)
    start=min(key) if key else (51 if 'ESPECIFICOS' in norm(booklet['title']) else 1)
    anchors=find_anchors(rows,mc,start);items=[];support_rows=rows[:anchors[0][0]] if anchors else [];support=joined(support_rows)
    for ai,(begin,n,prefix_end) in enumerate(anchors):
        end=anchors[ai+1][0] if ai+1<len(anchors) else len(rows);segment=rows[begin:end];raw=joined(segment)
        if mc:body=segment[1:]
        else:
            body=[{**segment[0],'text':segment[0]['text'][prefix_end:].strip()}]+segment[1:]
            body=[r for r in body if r['text']]
        body,preliminary,following=separate_justification(body)
        if mc:
            stem,options,extra=parse_options(body,'ABCD' if event['event']=='PC_MG_25_TPAG' else 'ABCDE');following=extra+following
            # Shared text is attached only to items explicitly referring to it.
            uses_support=bool(re.search(r'\b(texto|figura|tabela|gr[aá]fico|precedente|anterior|CG\d|CE\d)',stem,re.I))
            attached_support=support if uses_support else ''
        else:
            body,extra=split_ce(body);following=extra+following;stem=joined(body);options={};attached_support=support
        answer=key.get(n);flags=['requires_individual_review','syllabus_mapping_pending','database_duplicate_check_pending'];annulled=answer=='X'
        if not answer:flags.append('definitive_answer_missing')
        if annulled:flags.append('officially_annulled')
        if not stem:flags.append('incomplete_stem')
        elif len(stem)<15:flags.append('short_stem_review')
        if mc and (set(options)!=set('ABCD' if event['event']=='PC_MG_25_TPAG' else 'ABCDE') or any(not v for v in options.values())):flags.append('incomplete_options')
        full='\n'.join([attached_support,stem,*options.values()])
        if re.search(r'\b(figura|imagem|gr[aá]fico|tabela|charge|mapa|ilustra[çc]|balancete)\b|dados precedentes',full,re.I):flags.append('visual_or_table_review')
        if re.search(r'[=≤≥∑∫√𝑥𝑦]|\b(equa[çc][aã]o|f[oó]rmula|proposi[çc][aã]o|matriz|fra[çc][aã]o)\b',full,re.I):flags.append('formula_or_symbol_review')
        if '\ufffd' in full or re.search(r'[\ue000-\uf8ff]',full):flags.append('glyph_review')
        if re.search(r'\b(texto|fragmento|par[aá]grafo)\b',stem,re.I) and not attached_support:flags.append('support_reference_review')
        if preliminary:flags.append('preliminary_justification_not_final')
        accounting=bool(re.search(r'cont[aá]b|contabil|balancete|balan[çc]o|\bIFRS\b|\bCPC\b|\bNBC\b',full,re.I))
        legal=event['event'] in ['PC_DF_26_DELEGADO','PC_CE_25_DELEGADO'] or bool(re.search(r'\b(lei|constitui[çc][aã]o|constitucional|jurisprud[eê]ncia|direito|penal|criminologia|c[oó]digo|STF|STJ|s[uú]mula|decreto|legisla[çc][aã]o)\b',full,re.I))
        if legal:flags.append('legal_currency_audit_pending')
        if accounting:flags.append('accounting_official_standard_audit_pending')
        item={'extraction_id':sha[:16]+':'+str(n),'event':event['event'],'booklet_title':booklet['title'],'item_number':n,'question_type':'multiple_choice' if mc else 'true_false','exam_board':'CEBRASPE','exam_date':exam_date,'subject':None,'support_text':attached_support,'stem':stem,'options':options,'official_answer':answer,'answer_key_type':'definitive' if key_doc else None,'answer_key_url':key_doc['url'] if key_doc else None,'answer_key_sha256':key_doc['sha256'] if key_doc else None,'source_url':booklet['url'],'source_pdf_file':booklet['local_file'],'source_sha256':sha,'source_page':rows[begin]['page'],'source_regions':source_regions(segment),'support_regions':source_regions(support_rows) if attached_support else [],'preliminary_justification':preliminary or None,'raw_extraction':raw,'content_status':'annulled' if annulled else 'under_review','legal_review_required':legal,'accounting_review_required':accounting,'currency_review_required':True,'review_flags':flags}
        item['content_fingerprint']=content_fingerprint(attached_support,stem,options)
        items.append(item)
        if following:support_rows=following;support=joined(following)
    observed={i['item_number'] for i in items};missing=sorted(set(key)-observed);extra=sorted(observed-set(key)) if key else []
    if key and (missing or extra):raise ValueError(f"{event['event']} {booklet['title']}: missing={missing}, extra={extra}, extracted={len(items)}")
    if not items:raise ValueError('No items extracted')
    return items,{'event':event['event'],'booklet_title':booklet['title'],'source_url':booklet['url'],'source_pdf_file':booklet['local_file'],'source_sha256':sha,'pages':page_count,'exam_date':exam_date,'question_count':len(items),'first_item':min(observed),'last_item':max(observed),'definitive_answer_count':len(key),'annulled_count':sum(i['content_status']=='annulled' for i in items),'answer_key_url':key_doc['url'] if key_doc else None,'missing_item_numbers':missing,'extra_item_numbers':extra}


def render_review_pages(items, output):
    """Original page previews preserve diagrams/tables/symbols; they are not reconstructed illustrations."""
    sources=collections.defaultdict(list)
    for item in items:
        if set(item['review_flags']) & {'visual_or_table_review','formula_or_symbol_review','glyph_review'}:
            sources[item['source_pdf_file']].append(item)
    rendered=0
    for path,questions in sources.items():
        pages={r['page'] for item in questions for r in item['source_regions']+item['support_regions']}
        sha=questions[0]['source_sha256'][:16];folder=output/'source-pages'/sha;folder.mkdir(parents=True,exist_ok=True)
        with pymupdf.open(path) as pdf:
            for page in sorted(pages):
                pdf[page-1].get_pixmap(matrix=pymupdf.Matrix(1.5,1.5),alpha=False).save(str(folder/f'{page:03d}.png'));rendered+=1
        for item in questions:
            own_pages=sorted({r['page'] for r in item['source_regions']+item['support_regions']})
            item['visual_reference_pages']=[{'page':page,'image_file':str(folder/f'{page:03d}.png')} for page in own_pages]
    return rendered


def run(manifest_path, output):
    manifest=json.loads(manifest_path.read_text());output.mkdir(parents=True,exist_ok=True);items=[];docs=[]
    for event in manifest['events']:
        keys=collections.defaultdict(list)
        for d in event['documents']:
            if d['document_type']=='definitive_answer_key':keys[signature(d['title'])].append(d)
        for booklet in event['documents']:
            if booklet['document_type']!='question_booklet':continue
            match=keys.get(signature(booklet['title']),[])
            if event['definitive_key_listed'] and len(match)!=1:raise ValueError('Key pairing not unique: '+booklet['title'])
            extracted,summary=extract_document(event,booklet,match[0] if match else None);items+=extracted;docs.append(summary)
            print(event['event'],summary['question_count'],booklet['title'],flush=True)
    groups=collections.defaultdict(list)
    for item in items:groups[item['content_fingerprint']].append(item['extraction_id'])
    duplicates=[{'fingerprint':fp,'extraction_ids':ids} for fp,ids in groups.items() if len(ids)>1]
    for item in items:
        if len(groups[item['content_fingerprint']])>1:item['review_flags'].append('duplicate_candidate_within_downloads')
    rendered=render_review_pages(items,output)
    for name,body in [('questions.json',items),('documents.json',docs),('duplicate-groups.json',duplicates)]:
        (output/name).write_text(json.dumps(body,ensure_ascii=False,indent=2)+'\n')
    batches=output/'batches';batches.mkdir(exist_ok=True)
    for old in batches.glob('batch-*.json'):old.unlink()
    for start in range(0,len(items),100):(batches/f'batch-{start//100+1:03d}.json').write_text(json.dumps(items[start:start+100],ensure_ascii=False,indent=2)+'\n')
    fields=['extraction_id','event','booklet_title','item_number','question_type','subject','support_text','stem','options','official_answer','content_status','source_url','source_page','answer_key_url','preliminary_justification','review_flags']
    with (output/'questions.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader()
        for item in items:w.writerow({k:json.dumps(item[k],ensure_ascii=False) if isinstance(item[k],(dict,list)) else item[k] for k in fields})
    summary={'generated_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'booklets':len(docs),'original_page_previews':rendered,'extracted_occurrences':len(items),'unique_content_fingerprints':len(groups),'local_duplicate_groups':len(duplicates),'by_event':dict(collections.Counter(i['event'] for i in items)),'statuses':dict(collections.Counter(i['content_status'] for i in items)),'definitive_answer_missing':sum(i['official_answer'] is None for i in items),'preliminary_justifications':sum(bool(i['preliminary_justification']) for i in items),'flags':dict(collections.Counter(f for i in items for f in i['review_flags'])),'batches':(len(items)+99)//100,'database_writes':0,'content_review_completed':False,'notes':['Counts represent booklet occurrences, including repeated questions in different versions. Text fingerprints identify duplicate candidates, not identical visual questions. No records are dropped and no novelty relative to platform database is claimed.','All non-annulled items remain under review; law, accounting, visual and support-text checks have not been replaced by extraction.','Source PDF and key SHA256 are verified before processing. Preliminary justifications are not final answers or original commentary.','Raw segments, page/column regions and original PDFs allow correction of ambiguous context and visual material. Flagged visual/symbol items also include original page PNG previews.']}
    (output/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
    lines=['# Extração Cebraspe recente','','Extração estruturada para revisão; não constitui publicação na plataforma.','', '| Seleção | Ocorrências extraídas |','|---|---:|']+[f'| {key} | {count} |' for key,count in summary['by_event'].items()]
    lines+=['',f"Total: {len(items)} ocorrências; {summary['unique_content_fingerprints']} assinaturas textuais distintas (candidatas a comparação; não atestam questões inéditas); {summary['batches']} lotes de até 100.",f"Anuladas no gabarito definitivo: {summary['statuses'].get('annulled',0)}. Sem gabarito definitivo: {summary['definitive_answer_missing']}.",'','Arquivos: questions.json, questions.csv, documents.json, summary.json, duplicate-groups.json e batches/.','As disciplinas não foram adivinhadas: subject permanece vazio até classificação auditada. Justificativas preliminares da banca ficam em campo separado. Figuras, fórmulas e tabelas devem ser conferidas no PDF original, usando source_page e source_regions. Nenhum item foi ativado ou gravado no banco.']
    (output/'README.md').write_text('\n'.join(lines)+'\n')
    with zipfile.ZipFile(output/'extracao-cebraspe.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in output.rglob('*'):
            if p.is_file() and p.suffix in ['.json','.csv','.md','.png']:z.write(p,p.relative_to(output))
    print(json.dumps(summary,ensure_ascii=False),flush=True)
    return summary

def download_inputs(manifest_path):
    """Explicit opt-in, exact public URLs and known SHA256; preserves the inherited HTTPS proxy."""
    manifest=json.loads(manifest_path.read_text())
    for event in manifest['events']:
        for document in event['documents']:
            path=Path(document['local_file'])
            if path.exists():data=path.read_bytes()
            else:
                with urllib.request.urlopen(document['url'],timeout=60) as response:data=response.read()
            if not data.startswith(b'%PDF') or hashlib.sha256(data).hexdigest()!=document['sha256']:
                raise ValueError('Source PDF differs from the verified manifest: '+document['url'])
            if not path.exists():path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--manifest',type=Path,default=Path('docs/extractions/cebraspe-recentes-source-manifest-2026-10-19.json'))
    parser.add_argument('--output',type=Path,default=Path('outputs/cebraspe-2026-10-19/extracted'))
    parser.add_argument('--download',action='store_true',help='Fetch missing original PDFs, verifying their SHA256 before writing')
    args=parser.parse_args()
    if args.download:download_inputs(args.manifest)
    run(args.manifest,args.output)
