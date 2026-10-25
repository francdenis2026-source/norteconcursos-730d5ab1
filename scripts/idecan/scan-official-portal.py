"""Read public IDECAN pages and inventory exam/key PDFs; never imports or activates questions.
Usage: python scripts/idecan/scan-official-portal.py --output /tmp/idecan-scan [--download]
Optional --html FILE --base-url URL processes a saved/rendered official page offline.
"""
import argparse,collections,datetime,hashlib,json,pathlib,re,time,urllib.error,urllib.parse,urllib.request
from html.parser import HTMLParser

ROOT=pathlib.Path(__file__).resolve().parents[2]
SEEDS=['https://concurso.idecan.org.br/editais?status=andamento','https://antigo-concurso.idecan.org.br/SITE/Concursos.aspx']
TRACKING={'_gl','_ga','_gcl_au','fbclid','gclid'}

def official_url(raw,base=''):
 try:
  url=urllib.parse.urljoin(base,raw.strip());p=urllib.parse.urlsplit(url);host=(p.hostname or '').lower();port=p.port
 except ValueError:return None
 if p.scheme not in ('http','https') or p.username or p.password or port not in (None,443) or not (host=='idecan.org.br' or host.endswith('.idecan.org.br')):return None
 # Preserve opaque download IDs byte-for-byte; strip only analytics parameters.
 query='&'.join(x for x in p.query.split('&') if x and urllib.parse.unquote(x.split('=',1)[0]).lower() not in TRACKING and not urllib.parse.unquote(x.split('=',1)[0]).lower().startswith('utm_'))
 return urllib.parse.urlunsplit(('https',p.netloc.lower(),p.path or '/',query,''))

class Links(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.links=[];self.current=None;self.scripts=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if tag=='a' and attrs.get('href'):
   self.current=[attrs['href'],[attrs.get('title',''),attrs.get('aria-label','')]]
  if tag=='script' and attrs.get('src'):self.scripts.append(attrs['src'])
 def handle_data(self,data):
  if self.current:self.current[1].append(data)
 def handle_endtag(self,tag):
  if tag=='a' and self.current:
   self.links.append((self.current[0],' '.join(' '.join(self.current[1]).split())));self.current=None

def document_kind(label):
 text=label.casefold()
 if re.search(r'resultado|classifica[çc]|rela[çc][ãa]o de candidat|convoca[çc]|local de prova|inscri[çc]',text):return None
 if 'gabarito' in text:
  if re.search(r'resposta|an[áa]lise.*recurso',text):return None
  return 'answer_key_definitive_label' if 'definitiv' in text else 'answer_key_preliminary_or_unspecified'
 if re.search(r'caderno|prova[s]? objetiva[s]?|prova[s]? escrita[s]?',text):
  if re.search(r'edital|data|recurso|instru[çc]|orienta[çc]|aplica[çc]|comunicado|retifica[çc]',text):return None
  return 'question_booklet_label'
 return None

def contest_page(url):
 p=urllib.parse.urlsplit(url)
 return bool(re.search(r'/(?:editais|concurso|concursos)(?:[/.?]|$)',p.path,re.I)) and not re.search(r'login|inscri|candidato|download',url,re.I)

class OfficialRedirects(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  target=official_url(newurl,req.full_url)
  if not target:raise ValueError('Redirect outside official HTTPS domain; manual validation required')
  return super().redirect_request(req,fp,code,msg,headers,target)

def fetch(url,max_bytes=12*1024*1024):
 if not official_url(url):raise ValueError('Not an official HTTPS URL')
 opener=urllib.request.build_opener(OfficialRedirects())
 req=urllib.request.Request(url,headers={'User-Agent':'NorteConcursos-PublicExamInventory/1.0','Accept':'text/html,application/pdf'})
 with opener.open(req,timeout=25) as r:
  data=r.read(max_bytes+1)
  if len(data)>max_bytes:raise ValueError('File exceeds collection limit')
  if r.status!=200:raise ValueError('Unexpected HTTP status '+str(r.status))
  return data,r.headers.get_content_charset() or 'utf-8',r.url

def local_index():
 directory=ROOT/'supabase/imports/idecan';urls=set();hashes=set();counts={}
 for filename in ['idecan_questions.json','pcce_inspetor_2021_corpus.json','pcce_escrivao_2021_corpus.json']:
  data=json.loads((directory/filename).read_text())
  counts[filename]=len(data) if isinstance(data,list) else len(data['candidates'])
  def walk(value):
   if isinstance(value,dict):
    for k,v in value.items():
     if isinstance(v,str):
      u=official_url(v)
      if u:urls.add(u)
      if 'sha256' in k and re.fullmatch('[a-f0-9]{64}',v):hashes.add(v)
     else:walk(v)
   elif isinstance(value,list):
    for v in value:walk(v)
  walk(data)
 return dict(scope='Local historical reference only; not a live database inventory or count of new/active questions',records_by_file=counts,official_urls=sorted(urls),sha256=sorted(hashes))

def scan(output,max_pages=30,download=False,saved_html=None,base_url=None):
 output=pathlib.Path(output);output.mkdir(parents=True,exist_ok=True)
 known=local_index();report=dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),scope='Official portal discovery, not publication',local_reference=known,pages=[],documents=[],failures=[],questions_extracted=0,questions_seeded=0)
 queue=collections.deque(SEEDS if saved_html is None else [official_url(base_url or SEEDS[0])]);seen=set();docs={};hashes=set(known['sha256'])
 while queue and len(seen)<max_pages:
  url=queue.popleft()
  if not url or url in seen:continue
  seen.add(url)
  try:
   data,encoding,final=(pathlib.Path(saved_html).read_bytes(),'utf-8',url) if saved_html is not None else fetch(url,4*1024*1024)
   if data.startswith(b'%PDF'):raise ValueError('Unexpected PDF in listing; no document identity inferred')
   text=data.decode(encoding,errors='replace')
   if re.search(r'<title>\s*(just a moment|access denied)|cf-chl-|challenge-platform',text,re.I):raise ValueError('Access challenge; no bypass attempted')
   parser=Links();parser.feed(text)
   report['pages'].append(dict(url=url,final_url=final,sha256=hashlib.sha256(data).hexdigest(),links=len(parser.links),external_scripts=len(parser.scripts),possible_client_rendering=bool(parser.scripts and not parser.links)))
   for href,label in parser.links:
    target=official_url(href,final)
    if not target:continue
    kind=document_kind(label)
    if kind and re.search(r'\.pdf(?:\?|$)|download|arquivo',target,re.I):
     docs.setdefault(target,dict(url=target,label=label,kind=kind,discovered_on=final,known_local_url=target in known['official_urls'],status='discovered_not_downloaded',publication_approved=False))
    elif contest_page(target) and saved_html is None and target not in seen:queue.append(target)
  except Exception as e:report['failures'].append(dict(url=url,error=str(e),stage='listing_read'))
  if saved_html is not None:break
  if queue:time.sleep(.25)
 for url,doc in docs.items():
  if download:
   try:
    data,_,final=fetch(url)
    if not data.startswith(b'%PDF-'):raise ValueError('Response is not a PDF; not accepted as evidence')
    digest=hashlib.sha256(data).hexdigest();is_known=digest in hashes
    folder=output/'pdfs';folder.mkdir(exist_ok=True)
    dest=folder/(digest+'.pdf');dest.write_bytes(data)
    doc.update(status='downloaded_pdf_unreviewed',final_url=final,sha256=digest,bytes=len(data),known_local_or_duplicate_hash=is_known,local_file=str(dest),answer_key_verified=False,syllabus_verified=False)
    hashes.add(digest)
   except Exception as e:
    doc.update(status='download_failed',error=str(e));report['failures'].append(dict(url=url,error=str(e),stage='pdf_read'))
   time.sleep(.25)
  report['documents'].append(doc)
 report['summary']=dict(pages_attempted=len(seen),pages_read=len(report['pages']),documents_discovered=len(docs),pdfs_downloaded=sum(x['status']=='downloaded_pdf_unreviewed' for x in report['documents']),failures=len(report['failures']),queue_remaining=len(queue),coverage='incomplete' if report['failures'] or queue or saved_html or any(p['possible_client_rendering'] for p in report['pages']) else 'bounded_link_discovery_only_not_exhaustive')
 (output/'manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 return report

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--output',required=True);p.add_argument('--max-pages',type=int,default=30);p.add_argument('--download',action='store_true');p.add_argument('--html');p.add_argument('--base-url')
 args=p.parse_args()
 if not 1<=args.max_pages<=100:raise SystemExit('--max-pages must be 1–100')
 report=scan(args.output,args.max_pages,args.download,args.html,args.base_url)
 print(json.dumps(report['summary'],ensure_ascii=False));print('No database writes; no automatic question seeds.')
