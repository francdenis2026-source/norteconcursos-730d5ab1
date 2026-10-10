"""Build official legal reading paths offline from reviewed local HTML.
Usage: python scripts/build-legal-curriculum.py SOURCE_DIRECTORY OUTPUT_JSON
Requires lxml. No network, credentials or private source files in Git.
"""
import pathlib,json,re,hashlib,uuid,sys,urllib.parse
from lxml import html

clean=lambda value:' '.join(value.translate({i:bytes([i]).decode('cp1252',errors='replace') for i in range(128,160)}).split())
def number(value):
 value=re.sub(r'(?<=\d)[º°o]','',re.sub(r'\s+','',value)).upper().replace('–','-')
 return re.sub(r'^(\d+)([A-Z]+)$',r'\1-\2',value)

def parse_law(raw,slug,source_url='https://www.planalto.gov.br/'):
    if raw.startswith((b'\xff\xfe',b'\xfe\xff')) or re.search(rb'charset\s*=',raw,re.I):
        tree=html.fromstring(raw)
    else:
        try:raw.decode('utf-8');encoding='utf-8'
        except UnicodeDecodeError:encoding='windows-1252'
        tree=html.fromstring(raw,parser=html.HTMLParser(encoding=encoding))
    original=[clean(e.text_content()) for e in tree.xpath('//p')]
    for element in tree.xpath('//strike|//del|//s|//script|//style'):
     element.drop_tree()
    for element in tree.xpath('//*[@style]'):
     if 'line-through' in element.get('style',''):element.drop_tree()
    # Paragraph boundaries, not line-wrapped text, define article headings.
    blocks=[]
    for element in tree.xpath('//p'):
     value=clean(element.text_content())
     if value:blocks.append(value)
    article=re.compile(r'^(?:[“"\s]*Art\.?\s*(\d+(?:[º°o])?(?:[-–]\s*[A-Z]{1,2}|\s+[-–][A-Z]{1,2}|[A-Z]{1,2})?)(?!\.\d)(?=\s|[.\-–:]|$)\s*[.\-–:]?|Artigo\s+(\d+)\s*[-–:]?)',re.I)
    units=[];chapter='Disposições iniciais';pending=[];annex=False;hierarchy={};pending_level=0
    levels={'livro':0,'titulo':1,'capitulo':2,'secao':3,'seccao':3,'subsecao':4}
    if slug=='budapeste':levels={'capitulo':0,'secao':1,'seccao':1,'titulo':2,'subsecao':3,'livro':0}
    def finish_heading():
     for level in list(hierarchy):
      if level>=pending_level:del hierarchy[level]
     hierarchy[pending_level]=' — '.join(pending)
     return ' / '.join(hierarchy[k] for k in sorted(hierarchy))
    for value in blocks:
     if value.startswith('Este texto não substitui') or value.startswith('Brasília,'):
      if slug!='budapeste':break
      if value.startswith('Brasília,'):continue
     if re.match(r'^(?:ANEXO|CONVENÇÃO SOBRE)',value,re.I):annex=True
     if re.match(r'^(?:CAP[IÍ]TULO|T[IÍ]TULO|LIVRO|Seção|Secção|Subseção)\b',value,re.I):
      if pending:chapter=finish_heading()
      token=value.split()[0].lower().translate(str.maketrans('íãç','iac'))
      pending_level=levels.get(token,0);pending=[value];continue
     if pending and len(value)<190 and not article.match(value):
      pending.append(value);chapter=finish_heading();pending=[];continue
     if pending:chapter=finish_heading();pending=[]
     match=article.match(value)
     if match:
      label=('Convenção — Artigo ' if match.group(2) else 'Art. ')+(match.group(2) or number(match.group(1)))
      # Quoted amendments remain within the host law's article, not new curriculum articles.
      if value.startswith(('“','"')) and units:
       units[-1]['paragraphs'].append(value);continue
      key=re.sub(r'[^a-z0-9]+','-',label.lower()).strip('-')
      occurrence=1+sum(u['key'].startswith(key+'--') or u['key']==key for u in units)
      if occurrence>1:key+='--'+str(occurrence)
      status='revoked' if re.search(r'\b(?:revogad[oa]|vetad[oa])\b',value,re.I) and len(value)<200 else 'current'
      units.append({'key':key,'label':label,'chapter':chapter,'paragraphs':[value],'status':status})
     elif units:
      if value in ['*','ANEXO'] or (slug=='budapeste' and re.match(r'^(?:GERALDO|Maria Laura|Este texto)',value)):continue
      units[-1]['paragraphs'].append(value)
    for unit in units:
     unit['text']='\n\n'.join(unit.pop('paragraphs'))
     unit['sha256']=hashlib.sha256(unit['text'].encode()).hexdigest()
     if re.fullmatch(r'Art\.?\s*\d+[º°o]?(?:-[A-Z]+)?[.\s]*(?:\(?\s*(?:Revogad[oa]|Vetad[oa]).*)?',unit['text'],re.I):unit['status']='revoked'
    # Keep a coverage record for headings whose entire former wording was struck out.
    labels={u['label'] for u in units}
    for value in original:
     match=article.match(value)
     if not match or value.startswith(('“','"')):continue
     label=('Convenção — Artigo ' if match.group(2) else 'Art. ')+(match.group(2) or number(match.group(1)))
     if label in labels:continue
     labels.add(label)
     key=re.sub(r'[^a-z0-9]+','-',label.lower()).strip('-')
     text=label+' — redação anterior suprimida no texto compilado; não integra a leitura normativa ativa. Consulte a indicação do ato modificador na fonte oficial.'
     units.append({'key':key,'label':label,'chapter':'Dispositivos excluídos da leitura ativa','text':text,'sha256':hashlib.sha256(text.encode()).hexdigest(),'status':'excluded'})
    assert units,slug
    # Normative annexes follow the signature/publication block, outside the article loop.
    if slug!='budapeste':
        nodes=list(tree.iter());positions={node:index for index,node in enumerate(nodes)}
        headings=[node for node in tree.xpath('//p') if re.match(r'^ANEXO\b',clean(node.text_content()),re.I)]
        for index,heading in enumerate(headings):
            start=positions[heading];end=positions[headings[index+1]] if index+1<len(headings) else len(nodes)
            paragraphs=[];tables=[];figures=[]
            for node in nodes[start:end]:
                if node.tag=='p' and not any(a.tag=='table' and positions[a]>=start for a in node.iterancestors()):
                    text=clean(node.text_content())
                    if text and text!='*':paragraphs.append(text)
                if node.tag=='table' and not any(a.tag=='table' and positions[a]>=start for a in node.iterancestors()):
                    rows=[[clean(cell.text_content()).replace('|','¦') for cell in row.xpath('./th|./td')] for row in node.xpath('.//tr')]
                    rows=[row for row in rows if any(row)]
                    if rows:
                        width=max(len(row) for row in rows);rows=[row+['']*(width-len(row)) for row in rows]
                        tables.append('\n'.join(['| '+' | '.join(rows[0])+' |','| '+' | '.join(['---']*width)+' |']+['| '+' | '.join(row)+' |' for row in rows[1:]]))
                if node.tag=='img' or str(node.tag).endswith('imagedata'):
                    url=urllib.parse.urljoin(source_url,node.get('src',''))
                    if url.startswith('https://www.planalto.gov.br/') and not any(f['url']==url for f in figures):figures.append({'url':url,'title':clean(heading.text_content())+' — figura oficial'})
            label=clean(heading.text_content());text='\n\n'.join(paragraphs+tables)
            status='excluded' if re.search(r'VETADO|REVOGADO',text,re.I) and len(text)<150 else 'current'
            if not text:text=label+' — consulte o modelo na fonte oficial.'
            units.append({'key':'anexo-'+str(index+1),'label':label,'chapter':'Anexos / '+label,'text':text,'sha256':hashlib.sha256(text.encode()).hexdigest(),'status':status,'figures':figures})
    return units


def build(source_directory, courses):
    units=[]
    source_directory=pathlib.Path(source_directory).resolve()
    for course in courses:
        slug=course['slug']
        if not re.fullmatch(r'[a-z0-9-]+',slug):raise ValueError('Invalid source slug')
        raw=(source_directory/(slug+'.html')).read_bytes()
        if hashlib.sha256(raw).hexdigest()!=course['source_sha256']:raise ValueError('Source changed: review legislation before rebuilding '+slug)
        parsed=parse_law(raw,slug,course['source_url'])
        for index,unit in enumerate(parsed):
            uid=str(uuid.uuid5(uuid.NAMESPACE_URL,course['id']+'/'+unit['key']+'/'+unit['sha256']))
            prompts=['Sem consultar, explique a regra deste dispositivo e a quem ela se aplica.','Quais requisitos, limites ou exceções alteram sua aplicação? Se não houver, diga isso.','Construa um exemplo de aplicação e identifique no texto o elemento que sustenta sua resposta.']
            checklist=['A resposta conservou sujeito, conduta ou competência e os requisitos previstos?','Você separou a regra do caput das condições e exceções dos parágrafos e incisos?','Os números, prazos ou penas citados correspondem ao dispositivo, sem transferência de outra lei?','Seu exemplo respeita os limites do texto e os alertas jurisprudenciais apresentados no percurso?']
            if unit['key'].startswith('anexo-'):
                prompts=['Sem consultar, explique a organização e a finalidade deste anexo.','Escolha dois conceitos, itens ou modelos próximos e explique suas diferenças.','Como uma informação deste anexo se conecta a um dispositivo da lei? Identifique esse vínculo.']
                checklist=['A comparação preservou as definições, itens ou características dos modelos oficiais?','Você distinguiu os campos e as unidades da tabela, sem transportar números de outro item?','A relação com o corpo da lei é sustentada pelo texto, sem inventar uma hipótese de aplicação?']
            if re.search(r'pena\s*[-–:]|reclusão|detenção',unit['text'],re.I):prompts[1]='Se houver tipo penal ou sanção, indique conduta, sujeito, espécie de pena e circunstâncias modificadoras, sem confundir tipos próximos.'
            if re.search(r'passa[m]? a vigorar|passa[m]? a ter|fica[m]? acrescid',unit['text'],re.I):checklist.append('É uma norma modificadora: confira também o texto compilado atual do diploma alterado; a transcrição da alteração não substitui sua versão atual.')
            body=unit['text'] if unit['status']=='current' else unit['label']+' — dispositivo excluído da leitura normativa ativa; consulte a indicação de veto, revogação ou redação suprimida no texto oficial.'
            recall={'prompts':prompts,'checklist':checklist}
            if unit.get('figures'):recall['figures']=unit['figures']
            units.append({'id':uid,'course_id':course['id'],'unit_key':unit['key'],'label':unit['label'],'chapter':unit['chapter'],'position':index,'body_text':body,'content_sha256':hashlib.sha256(body.encode()).hexdigest(),'content_status':'current' if unit['status']=='current' else 'excluded','recall':recall})
        current=sum(u['status']=='current' for u in parsed)
        if current!=course['overview']['current_units'] or len(parsed)-current!=course['overview']['excluded_units']:raise ValueError('Coverage changed: '+slug)
    return {'courses':courses,'units':units}

if __name__=='__main__':
    if len(sys.argv)!=3:raise SystemExit('Usage: python scripts/build-legal-curriculum.py SOURCE_DIRECTORY OUTPUT_JSON')
    seed=pathlib.Path(__file__).resolve().parents[1]/'docs/library/legal-path-pedagogy-2026-10-04.json'
    package=build(sys.argv[1],json.loads(seed.read_text(encoding='utf-8')))
    pathlib.Path(sys.argv[2]).write_bytes((json.dumps(package,ensure_ascii=False,indent=2)+'\n').encode())
    print(json.dumps({'courses':len(package['courses']),'units':len(package['units'])}))
