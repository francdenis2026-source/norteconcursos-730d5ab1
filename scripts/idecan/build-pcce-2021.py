"""Build private review packs from the two downloaded PC-CE booklets (PyMuPDF required).
Usage: python scripts/idecan/build-pcce-2021.py DOWNLOAD_DIRECTORY OUTPUT_DIRECTORY
Never publishes questions; source PDFs, support context and final-key ambiguity remain traceable.
"""
import collections
import hashlib
import json
import pathlib
import re
import sys
import subprocess
import fitz

HEADINGS = {
    'LÍNGUA PORTUGUESA', 'INFORMÁTICA', 'NOÇÕES DE DIREITO PENAL',
    'LEGISLAÇÃO PENAL EXTRAVAGANTE', 'NOÇÕES DE DIREITO PROCESSUAL PENAL',
    'NOÇÕES DE DIREITO ADMINISTRATIVO', 'NOÇÕES DE DIREITO CONSTITUCIONAL', 'LEGISLAÇÃO ESPECÍFICA',
}
KEY_URL = 'https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID2=1&ID=X6BT90RYGNDO2S8DGORM9OO61FDNBPF2P0I6D2GESRJNOE4S4WCY4LGHA0TVQ1S1DDEP85BIAPGOEYBF1384.pdf'
PAGE_URL = 'https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=32'

def digest(value):
    return hashlib.sha256(value if isinstance(value, bytes) else value.encode()).hexdigest()

def extract_key(text, career):
    title = f'{career.upper()} DE POLÍCIA CIVIL - TIPO B'
    # Text immediately preceding this section includes the actual page heading.
    start = text.index(title)
    before = text[:start].split('\f')[-1]
    section = re.split(r'(?:ESCRIVÃO|INSPETOR) DE POLÍCIA CIVIL - TIPO [ABC]', text[start + len(title):])[0]
    lines = section.splitlines()
    answers = {}
    for i, line in enumerate(lines[:-1]):
        numbers = re.findall(r'\bQ(\d{2,3})\b', line)
        if not numbers:
            continue
        values = lines[i + 1].split()
        if len(numbers) != len(values) or any(x not in 'ABCDE*' or len(x) != 1 for x in values):
            raise ValueError('Linha inválida do gabarito')
        for number, answer in zip(numbers, values):
            if int(number) in answers:
                raise ValueError('Item duplicado no gabarito')
            answers[int(number)] = 'X' if answer == '*' else answer
    if sorted(answers) != list(range(1, 101)):
        raise ValueError('Gabarito não contém exatamente 100 posições')
    ambiguous = 'PRELIMINAR' in before
    return answers, ambiguous

def extract_items(doc):
    items = []
    current = None
    discipline = None
    for page_index, page in enumerate(doc):
        if page_index == 0:
            continue
        lines = []
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines', []):
                text = ''.join(span['text'] for span in line['spans']).strip()
                box = line['bbox']
                if 65 < box[1] < 735 and text and not re.fullmatch(r'-?\s*\d+\s*-?', text):
                    lines.append((box, text))
        if any(text == 'DISCURSIVAS' for _, text in lines):
            break
        questions = [box[1] for box, text in lines if re.match(r'^\d{1,3}\. ', text)]
        if not questions:
            continue
        # First support passage spans both columns; subsequent content reads left then right.
        top = min(questions) if any(text == 'LÍNGUA PORTUGUESA' for _, text in lines) else 65
        ordered = sorted([x for x in lines if x[0][1] < top], key=lambda x: (x[0][1], x[0][0]))
        for col in [False, True]:
            ordered += sorted([x for x in lines if x[0][1] >= top and (x[0][0] >= page.rect.width / 2) == col], key=lambda x: (x[0][1], x[0][0]))
        for box, text in ordered:
            if text in HEADINGS:
                discipline = text
                continue
            match = re.match(r'^(\d{1,3})\. ', text)
            if match:
                current = {'number': int(match[1]), 'page': page_index + 1, 'pages': [], 'discipline': discipline, 'lines': []}
                items.append(current)
            if current:
                current['lines'].append(text)
                if page_index + 1 not in current['pages']:
                    current['pages'].append(page_index + 1)
    if [x['number'] for x in items] != list(range(1, 101)) or any(not x['discipline'] for x in items):
        raise ValueError('Extração incompleta, fora de ordem ou sem disciplina')
    return items

def build(directory, output):
    output.mkdir(parents=True, exist_ok=True)
    key_file = directory / 'pcce-2021-definitivo.pdf'
    key_text = subprocess.run(['pdftotext', '-layout', str(key_file), '-'], check=True, capture_output=True, text=True).stdout
    results = []
    for slug, career, mirror_id in [('inspetor', 'Inspetor', 83735), ('escrivao', 'Escrivão', 83736)]:
        file = directory / f'pcce-{slug}-2021.pdf'
        doc = fitz.open(file)
        if f'{career.upper()} DE POLÍCIA CIVIL' not in doc[0].get_text() or 'TIPO B' not in doc[0].get_text():
            raise ValueError('Cargo/caderno divergente na capa')
        answers, ambiguous = extract_key(key_text, career)
        source_id = digest(file.read_bytes())
        source_url = f'https://arquivos.qconcursos.com/prova/arquivo_prova/{mirror_id}/idecan-2021-pc-ce-{slug}-de-policia-civil-prova.pdf'
        raw_text = '\f'.join(page.get_text() for page in doc)
        source = {
            'id': source_id, 'title': f'PC-CE 2021 — {career} de Polícia Civil — Tipo B',
            'publisher': 'IDECAN', 'publication_year': 2021, 'page_count': len(doc), 'raw_text': raw_text,
            'metadata': {
                'board': 'IDECAN', 'contest_page_url': PAGE_URL, 'booklet_url': source_url,
                'booklet_host_type': 'mirror', 'booklet_sha256': source_id,
                'answer_key_url': KEY_URL, 'answer_key_sha256': digest(key_file.read_bytes()),
                'answer_key_raw_text': key_text,
                'answer_key_listing_title': 'GABARITO DEFINITIVO',
                'answer_key_section_heading': 'preliminar_in_document_listed_as_final' if ambiguous else 'definitivo',
                'collection_date': '2026-10-22', 'objective_items_printed': 100,
                'exam_type': 'Tipo B', 'career': career + ' de Polícia Civil',
                'target_use': 'histórico para pesquisa de cobrança; não é edital PC-AC',
                'publication_approved': False,
            },
        }
        candidates = []
        for item in extract_items(doc):
            number = item['number']
            raw = '\n'.join(item['lines'])
            source_key = f'tipo-b:q{number:03d}'
            labels = re.findall(r'^([ABCDE])\)', raw, re.M)
            candidate = {
                'id': digest(source_id + ':' + source_key), 'corpus_id': source_id,
                'source_key': source_key, 'source_page': item['page'], 'discipline': item['discipline'],
                'content_status': 'under_review',
                'payload': {
                    'raw_text': raw, 'item_number': number, 'source_pages': item['pages'],
                    'answer_in_official_document': answers[number],
                    'answer_key_requires_clarification': ambiguous,
                    'annulled_in_document': answers[number] == 'X',
                    'alternative_labels_extracted': labels,
                    'context_review_required': True, 'visual_review_required': True,
                    'legal_review_required': bool(re.search('DIREITO|LEGISLAÇÃO', item['discipline'])),
                    'syllabus_mapping_required': True,
                    'local_legislation_review_required': item['discipline'] == 'LEGISLAÇÃO ESPECÍFICA',
                    'review_note': 'Extração bruta: conferir texto de apoio, destaques, figuras, alternativas e vigência no PDF. Não publicar automaticamente.',
                },
            }
            candidates.append(candidate)
        pack = {'source': source, 'candidates': candidates}
        (output / f'pcce_{slug}_2021_corpus.json').write_text(json.dumps(pack, ensure_ascii=False, indent=2) + '\n')
        results.append({
            'file': f'pcce_{slug}_2021_corpus.json', 'title': source['title'], 'sha256': source_id,
            'items': len(candidates), 'page_count': len(doc),
            'annulled_in_document': [c['payload']['item_number'] for c in candidates if c['payload']['annulled_in_document']],
            'key_requires_clarification': ambiguous,
            'disciplines': dict(collections.Counter(c['discipline'] for c in candidates)),
            'alternative_label_issues': [c['payload']['item_number'] for c in candidates if c['payload']['alternative_labels_extracted'] != list('ABCDE')],
            'publication_approved': False,
        })
    (output / 'pcce_2021_coleta.json').write_text(json.dumps({'packs': results, 'database_import_performed': False}, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(results, ensure_ascii=False))

if __name__ == '__main__':
    build(pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]))
