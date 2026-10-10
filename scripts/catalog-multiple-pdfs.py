"""Private, conservative pre-catalogue. No answer approval or database access.

Usage: python scripts/catalog-multiple-pdfs.py INVENTORY_JSON PRIVATE_OUTPUT
Requires PyMuPDF (PYTHONPATH can point to a local installation).
Every detected boundary requires manual confirmation; counts are NOT approvals.
"""
import bisect
import collections
import hashlib
import json
import pathlib
import re
import sys
import unicodedata
import pymupdf


def normalize(text):
    return ''.join(c for c in unicodedata.normalize('NFKD', text.casefold()) if not unicodedata.combining(c))


DISCIPLINES = [
    ('Direito Processual Penal', r'direito processual penal|processo penal'),
    ('Direito Processual Civil', r'direito processual civil|processo civil'),
    ('Direito Processual do Trabalho', r'direito processual do trabalho'),
    ('Direito Administrativo', r'direito administrativo'),
    ('Direito Constitucional', r'direito constitucional'),
    ('Direito Penal', r'direito penal'),
    ('Direito Civil', r'direito civil'),
    ('Direito do Trabalho', r'direito do trabalho'),
    ('Direito do Consumidor', r'direito do consumidor'),
    ('Direito Tributário', r'direito tributario'),
    ('Direito Empresarial', r'direito empresarial|direito comercial'),
    ('Direito Internacional', r'direito internacional'),
    ('Direitos Humanos', r'direitos humanos'),
    ('Legislação de Trânsito', r'codigo de transito|\bctb\b'),
    ('Legislação Especial', r'leis especiais|legislacoes especificas|^legislacao'),
    ('Língua Portuguesa', r'lingua portuguesa|^portugues$'),
    ('Redação Oficial', r'^redacao oficial'),
    ('Raciocínio Lógico', r'raciocinio logico'),
    ('Matemática', r'^matematica'),
    ('Estatística', r'^estatistica'),
    ('Informática', r'informatica'),
    ('Contabilidade', r'contabilidade(?: geral| publica| aplicada ao setor publico)?'),
    ('Administração Financeira e Orçamentária', r'administracao financeira|^afo$'),
    ('Lei de Responsabilidade Fiscal', r'lei de responsabilidade fiscal|^lrf$'),
    ('Arquivologia', r'arquivologia'),
    ('Administração Geral', r'^administracao'),
    ('Física', r'^fisica'),
    ('Conhecimentos Bancários', r'conhecimentos bancarios'),
    ('Geografia', r'^geografia'),
    ('História', r'^historia'),
]


def heading_subject(text):
    text = normalize(text.strip())
    text = re.sub(r'^nocoes (?:de|do)\s+','',text)
    if len(text) > 105 or re.search(r'\.{3}|\b(sumario|indice)\b', text) or len(text.split())>12:
        return None
    for subject, pattern in DISCIPLINES:
        if re.fullmatch(r'(?:\d+[.)]?\s*)?(?:'+pattern+r')(?:\s*[-–:]\s*[^.!?]+)?(?:\s+\d+)?', text):
            return subject
    return None


def normative_routes(subject, text):
    s = normalize(subject + ' ' + text)
    routes = []
    if re.search(r'direito|legislacao|\blei\b|constituicao|decreto|\bctb\b', s):
        routes.append('legislacao_oficial')
    if re.search(r'sumula|jurisprudencia|\bstf\b|\bstj\b|\btst\b', s):
        routes.append('tribunal_competente')
    if re.search(r'contabilidade|\bnbc\b|\bcpc\s*\d|\bifrs\b', s):
        routes.append('norma_contabil_oficial')
    if re.search(r'redacao oficial|manual de redacao|aviso oficial|expediente oficial', s):
        routes.append('redacao_oficial')
    if re.search(r'informatica|windows|office|linux|libreoffice|thunderbird|outlook', s):
        routes.append('documentacao_tecnica_da_versao')
    return routes


# Source-specific reading profiles. Every question still requires visual confirmation;
# PF/CESPE were rendered during intake, other profiles are provisional.
TWO_COLUMNS = {'500 Questoes PolíciaFederal.pdf', 'CESPE 7000 questoes comentadas.pdf',
               'Simulado do TJ 2019.pdf', 'Simulado.pdf', 'simulado_pf_-_agente_-_16-05-21.pdf',
               'Simulado2.pdf', 'Policua Penal Simulado.pdf','1.200 questões do BancodoBrasil.pdf'}
SINGLE_SUBJECT = {'1500 questões RLM.pdf':'Raciocínio Lógico',
                  'FGV simulado de português.pdf':'Língua Portuguesa',
                  'Portugues - Questoes Comentadas - Duda Nogueira.pdf':'Língua Portuguesa',
                  'TJ_SP50877090-texto-em-exercicios-vunesp.pdf':'Língua Portuguesa',
                  'Questões de informática.pdf':'Informática'}
PAGE_SECTIONS = {
    'CESPE 7000 questoes comentadas.pdf': [(5,'Língua Portuguesa'),(53,'Geografia'),(77,'História do Brasil'),(117,'História Mundial'),(167,'Política Internacional'),(227,'Ética Profissional'),(247,'Legislação da Pessoa Idosa'),(255,'Legislação da Pessoa com Deficiência'),(260,'Direito Processual Civil'),(371,'Língua Inglesa'),(390,'Língua Espanhola'),(393,'Economia'),(411,'Contabilidade'),(461,'Legislação de Trânsito'),(478,'Legislação Institucional')],
    'Concursos Públicos - 11 mil questões comentadas.pdf': [(59,'Direito Administrativo'),(452,'Direito Ambiental'),(670,'Direito Civil'),(1068,'Direito Constitucional'),(1508,'Direito do Consumidor'),(1658,'Direito Eleitoral'),(1817,'Direito Empresarial'),(2131,'Direito Financeiro e Econômico'),(2229,'Direito do Trabalho'),(2568,'Direito Internacional'),(2686,'Direito Penal'),(3336,'Direito Processual Civil'),(3747,'Direito Processual do Trabalho'),(4070,'Direito Processual Penal'),(4413,'Direito Tributário'),(4730,'Direitos Humanos'),(4965,'Ética e Legislação Profissional'),(5091,'Língua Portuguesa')],
    '1.000 QUESTÕES COMENTADAS - PF.pdf': [(9,'Direito Penal'),(73,'Direito Processual Penal'),(110,'Direito Administrativo'),(173,'Direito Constitucional'),(225,'Legislação Especial')],
    '1.200 questões do BancodoBrasil.pdf': [(8,'Vendas e Negociação'),(18,'Probabilidade e Estatística'),(27,'Matemática'),(44,'Informática'),(57,'Língua Inglesa'),(84,'Conhecimentos Bancários'),(109,'Matemática Financeira'),(128,'Tecnologia da Informação'),(145,'Língua Portuguesa')],
    '500 Questoes PolíciaFederal.pdf': [(4,'Língua Portuguesa'),(26,'Direito Administrativo'),(52,'Direito Constitucional'),(78,'Direito Penal'),(155,'Direito Processual Penal'),(189,'Legislação Especial'),(257,'Estatística'),(265,'Raciocínio Lógico'),(272,'Informática'),(312,'Contabilidade')],
    '900 questões Gran Concurso.pdf': [(4,'Língua Portuguesa'),(103,'Raciocínio Lógico'),(140,'Informática'),(161,'Direito Administrativo'),(168,'Direito Constitucional'),(226,'Direito Civil'),(250,'Direito Processual Civil'),(276,'Direito Penal'),(296,'Direito Processual Penal'),(326,'Direito do Trabalho'),(335,'Direito Processual do Trabalho'),(343,'Direito do Consumidor'),(349,'Legislação Especial'),(370,'Administração Financeira e Orçamentária'),(376,'Lei de Responsabilidade Fiscal'),(381,'Administração Geral'),(413,'Arquivologia')],
    'Carreiras policiais - Questões Gabaritadas - Agora eu passo.pdf': [(3,'Língua Portuguesa'),(172,'Matemática'),(192,'Raciocínio Lógico'),(254,'Informática'),(327,'Direito Constitucional'),(399,'Direito Administrativo'),(450,'Direito Penal'),(622,'Direito Processual Penal'),(679,'Legislação de Trânsito'),(728,'Legislação Especial'),(795,'Arquivologia'),(827,'Administração Geral'),(868,'Física'),(934,'Administração Financeira e Orçamentária'),(984,'Contabilidade')],
}
START = re.compile(r'(?m)^[ \t]*(?P<number>\d{1,4})[.)][ \t]+(?=\S)|^[ \t]*(?P<parenthesized>\(\d{1,3}\))[ \t]+(?=\S)|^[ \t]*(?P<standalone>\d{1,3})[ \t]*$|^[ \t]*(?P<dash>\d{1,3})[ \t]+-[ \t]+\(')
BOARD = re.compile(r'(?mi)^[ \t]*(?:CESPE|CEBRASPE|FGV|FCC|VUNESP|CESGRANRIO|ESAF)[ \t]*[–-][ \t]*\d{4}')


def catalogue(manifest_path, output_path):
    manifest = json.loads(pathlib.Path(manifest_path).read_text(encoding='utf-8'))
    output = pathlib.Path(output_path)
    output.mkdir(parents=True, exist_ok=True)
    summary=[]
    duplicates=collections.defaultdict(list)
    for source in manifest:
        if source.get('error') or not source.get('exists'):
            summary.append({'source':source['name'],'error':source.get('error','Arquivo ausente')})
            continue
        folder=output/source['sha256']; folder.mkdir(exist_ok=True)
        if hashlib.sha256(pathlib.Path(source['path']).read_bytes()).hexdigest()!=source['sha256']:
            raise ValueError('PDF alterado desde o inventário; refaça a extração antes de catalogar')
        cached=json.loads((pathlib.Path(manifest_path).parent/source['sha256']/'pages.json').read_text(encoding='utf-8'))
        column_cache=[]
        old_columns=json.loads((folder/'columns.json').read_text(encoding='utf-8')) if (folder/'columns.json').exists() else []
        old_index={(x['page'],x['column']):x['text'] for x in old_columns}
        expected_columns=2 if source['name'] in TWO_COLUMNS else 1
        if len(old_index)!=source['page_count']*expected_columns: old_index={}
        full=''; spans=[]; page_info=[]
        subject=SINGLE_SUBJECT.get(source['name'], 'Classificação pendente')
        with pymupdf.open(source['path']) as doc:
            for i,page in enumerate(doc):
                if source['name'] in PAGE_SECTIONS:
                    subject=next((s for start,s in reversed(PAGE_SECTIONS[source['name']]) if i+1>=start),'Classificação pendente')
                columns=2 if source['name'] in TWO_COLUMNS else 1
                for col in range(columns):
                    clip=pymupdf.Rect(page.rect.width*col/columns,0,page.rect.width*(col+1)/columns,page.rect.height)
                    text=old_index.get((i+1,col+1))
                    if text is None: text=page.get_text(clip=clip,sort=True) if columns==2 else cached[i]['text']
                    # Preserve headings and surrounding text for later shared-context verification.
                    spans.append((len(full),i+1,col+1,subject))
                    if source['name'] not in SINGLE_SUBJECT and source['name'] not in PAGE_SECTIONS:
                        for line in re.finditer(r'(?m)^.*$',text):
                            found=heading_subject(line.group())
                            if found:
                                subject=found
                                spans.append((len(full)+line.start(),i+1,col+1,subject))
                    column_cache.append({'page':i+1,'column':col+1,'text':text})
                    full+=text+'\n'
                page_info.append({'page':i+1,'columns':columns,'images':cached[i]['images'],'chars':len(cached[i]['text'])})
        (folder/'reading-order.txt').write_text(full,encoding='utf-8')
        (folder/'columns.json').write_text(json.dumps(column_cache,ensure_ascii=False),encoding='utf-8')
        boundaries=[]
        pf_modes=[(m.start(),'QUESTÕES DE PROVAS' in m.group()) for m in re.finditer(r'QUESTÕES DE PROVAS ANTERIORES[^\n]*|GABARITOS COMENTADOS[^\n]*',full)] if source['name']=='1.000 QUESTÕES COMENTADAS - PF.pdf' else []
        for match in START.finditer(full):
            tail=full[match.end():match.end()+180]
            if pf_modes and not next((enabled for pos,enabled in reversed(pf_modes) if pos<match.start()),False):
                continue
            if match.group('standalone') and source['name']!='Simulado2.pdf':
                continue
            if re.match(r'[.\s]*(?:COMENT[ÁA]RIO|GABARITO)\b',tail,re.I):
                continue
            if source['name'] in {'900 questões Gran Concurso.pdf','1500 questões RLM.pdf','Carreiras policiais - Questões Gabaritadas - Agora eu passo.pdf','Concursos Públicos - 11 mil questões comentadas.pdf'}:
                if not ((match.group('number') and tail.lstrip().startswith('(')) or (source['name']=='Concursos Públicos - 11 mil questões comentadas.pdf' and match.group('parenthesized')) or match.group('dash')):
                    continue
            # Reject table-of-contents/page counters and answer tables.
            if len(tail.strip())<25 or re.match(r'\s*(?:[ABCDECE]\s*\n|\d{1,4}\s*\n)',tail):
                continue
            boundaries.append((match.start(),match.group().strip(),'numbered'))
        if source['name']=='500 Questoes PolíciaFederal.pdf':
            boundaries=[(m.start(),m.group().strip(),'board_header') for m in BOARD.finditer(full)]
        if source['name']=='TJ_SP50877090-texto-em-exercicios-vunesp.pdf':
            boundaries=[(m.start(),m.group().strip(),'named_question') for m in re.finditer(r'(?m)^Quest[ãa]o\s+\d+',full)]
        boundaries.sort()
        positions=[s[0] for s in spans]
        items=[]
        for j,(offset,label,kind) in enumerate(boundaries):
            stop=boundaries[j+1][0] if j+1<len(boundaries) else len(full)
            raw=full[offset:stop].strip()
            if len(raw)<50: continue
            span=spans[bisect.bisect_right(positions,offset)-1]
            end_span=spans[bisect.bisect_right(positions,max(offset,stop-1))-1]
            key=f'p{span[1]}:c{span[2]}:o{offset}'
            ident=hashlib.sha256((source['sha256']+':'+key).encode()).hexdigest()
            routes=normative_routes(span[3],raw)
            stem=re.split(r'(?mi)^\s*(?:RESPOSTA\b|R:\s*(?:Certo|Errado)|COMENT[ÁA]RIO\b|GABARITOS COMENTADOS\b)',raw)[0]
            normalized=re.sub(r'\W+','',normalize(stem))
            digest=hashlib.sha256(normalized.encode()).hexdigest()
            item={'id':ident,'source_sha256':source['sha256'],'source_key':key,
                  'source_page':span[1],'source_end_page':end_span[1],'column':span[2],
                  'discipline_candidate':span[3],'boundary_label':label,'boundary_kind':kind,
                  'raw_text':raw,'stem_candidate':stem,'content_status':'under_review',
                  'official_review_routes':routes,'text_fingerprint':digest,
                  'publication_blockers':['Confirmar delimitação e disciplina','Recuperar contexto e imagens','Conferir gabarito individual','Conferir tópico de edital vigente']+(['Conferir fonte oficial e vigência'] if routes else []),
                  'individual_review_complete':False}
            items.append(item)
            if len(normalized)>100: duplicates[digest].append({'source':source['name'],'id':ident,'page':span[1]})
        (folder/'boundary-candidates.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
        (folder/'page-layout.json').write_text(json.dumps(page_info,ensure_ascii=False),encoding='utf-8')
        row={'source':source['name'],'sha256':source['sha256'],'pages':source['page_count'],
             'boundary_candidates':len(items),'individual_approvals':0,'published':0,
             'discipline_candidates':dict(collections.Counter(x['discipline_candidate'] for x in items)),
             'review_routes':dict(collections.Counter(r for x in items for r in x['official_review_routes'])),
             'coverage_complete':False,'low_text_pages':source.get('low_text_pages',[])}
        summary.append(row)
        (output/'catalogue-progress.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
        print(json.dumps(row,ensure_ascii=False),flush=True)
    (output/'exact-duplicate-candidates.json').write_text(json.dumps([v for v in duplicates.values() if len(v)>1],ensure_ascii=False,indent=2),encoding='utf-8')
    return summary


if __name__=='__main__':
    catalogue(*sys.argv[1:])
