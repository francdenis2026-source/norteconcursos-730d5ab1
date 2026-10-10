"""Catalog OP-100AG-21 locally. No network access, legal approval or publication.
Usage: python scripts/catalog-ppmg-pdf.py PDF_PATH PRIVATE_OUTPUT_DIRECTORY
Requires pdfplumber. Keep source PDFs and generated outputs outside Git.
"""
import collections
import hashlib
import io
import json
import pathlib
import re
import sys
import pdfplumber

SECTIONS = [
    ('Língua Portuguesa', 4, 51, 165),
    ('Raciocínio Lógico', 52, 70, 120),
    ('Informática', 72, 98, 100),
    ('Direito Constitucional', 100, 115, 80),
    ('Direito Penal', 116, 119, 22),
    ('Direitos Humanos', 120, 123, 15),
]

def catalog_pdf(source_path, output_dir):
    original = pathlib.Path(source_path).read_bytes()
    offset = original.find(b'%PDF-')
    if offset < 0 or offset > 1024:
        raise ValueError('Cabeçalho PDF ausente ou prefixo inesperado')
    pdf_bytes = original[offset:]
    output = pathlib.Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    pages = []
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        if len(pdf.pages) != 123:
            raise ValueError('Versão diferente do caderno OP-100AG-21; reveja os limites das seções')
        for i, page in enumerate(pdf.pages):
            if i < 3:
                columns = [page.extract_text() or '']
            else:
                w, h = page.width, page.height
                columns = [page.crop((25, 60, w/2, h-55)).extract_text() or '',
                           page.crop((w/2, 60, w-25, h-55)).extract_text() or '']
            pages.append({'page': i+1, 'columns': columns, 'text': '\n'.join(columns),
                          'images': len(page.images)})
    if 'OP-100AG-21' not in pages[1]['text']:
        raise ValueError('Identificação do caderno não confere')
    items, sections = [], []
    for subject, start, end, expected in SECTIONS:
        text, spans = '', []
        for page in pages[start-1:end]:
            spans.append((len(text), page['page']))
            text += re.sub(r'(?m)^\d{1,3}\s*$', '', page['text']) + '\n'
        cut = text.find('GABARITO')
        if cut < 0:
            raise ValueError('Gabarito ausente: '+subject)
        body, answers = text[:cut], text[cut:]
        answer_rows = re.findall(r'(?m)^\s*(\d+)\s+([ABCDE])\s*$', answers)
        keys = {int(n): answer for n, answer in answer_rows}
        if len(keys) != len(answer_rows):
            raise ValueError('Número repetido no gabarito: '+subject)
        matches = list(re.finditer(r'(?m)^\s*(\d+)\.\s*[.( ]*(?:SELECON\b|PREFEITURA\b)', body))
        occurrences = collections.Counter()
        for index, match in enumerate(matches):
            n = int(match.group(1)); occurrences[n] += 1
            raw = body[match.start():matches[index+1].start() if index+1<len(matches) else len(body)].strip()
            item_key = subject+':'+str(n)+(':'+str(occurrences[n]) if occurrences[n]>1 else '')
            items.append({'key': item_key, 'subject': subject, 'number': n,
                          'page': max(page for pos, page in spans if pos<=match.start()),
                          'raw_text': raw, 'answer_candidate': keys.get(n),
                          'options_labels': re.findall(r'(?m)^\(([ABCDE])\)\s*', raw),
                          'legal_review_required': subject.startswith('Direito'),
                          'content_status': 'under_review',
                          'publication_blockers': ['Enunciado, alternativas, contexto, gabarito e edital precisam de revisão individual.']})
        missing = sorted(set(range(1, expected+1))-set(occurrences))
        if missing or set(range(1, expected+1))-set(keys):
            raise ValueError('Questão ou resposta não extraída: '+subject+' '+str(missing))
        sections.append({'subject': subject, 'extracted': len(matches), 'answer_entries': len(keys),
                         'repeated_numbers': [n for n, count in occurrences.items() if count>1]})
    manifest = {'publisher': 'Apostilas Opção', 'code': 'OP-100AG-21', 'publication_year': 2021,
                'page_count': len(pages), 'pdf_sha256': hashlib.sha256(pdf_bytes).hexdigest(),
                'original_file_sha256': hashlib.sha256(original).hexdigest(),
                'removed_prefix_bytes': offset, 'catalogued': len(items), 'sections': sections,
                'legal_review_complete': False, 'answer_provenance': 'Gabarito da apostila, não validado como definitivo oficial da banca.'}
    for name, data in [('pages.json', pages), ('catalog.json', items), ('catalog-summary.json', manifest)]:
        (output/name).write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    (output/'apostila.txt').write_text('\n\n'.join('=== PAGINA '+str(p['page'])+' ===\n'+p['text'] for p in pages), encoding='utf-8')
    return manifest

if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    print(json.dumps(catalog_pdf(sys.argv[1], sys.argv[2]), ensure_ascii=False, indent=2))
