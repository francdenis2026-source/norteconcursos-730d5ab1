"""Recover missed CESPE items without changing the first-pass corpus or prior reviews.

Usage: python extract-cespe2016-supplement.py PDF BASELINE OUTPUT_DIRECTORY
Outputs contain source text and must remain outside the Git checkout.
"""
import argparse
import bisect
from collections import Counter, defaultdict
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import unicodedata

SOURCE = 'cd1bd6a9eb5e62e0cf6b5ae0be4d5f332b968432c419733878d30956d45ec705'
REPO = Path(__file__).resolve().parents[2]


def sha(value):
    return hashlib.sha256(value if isinstance(value, bytes) else value.encode()).hexdigest()


def normalized(text):
    text = re.sub(r'(\w)-\s+(\w)', r'\1\2', text)
    return re.sub(r'\W+', '', unicodedata.normalize('NFKD', text).casefold())


def order_page(rows):
    """Read columns independently within vertical bands; spanning blocks delimit bands."""
    intervals = sorted({(r['block_y0'], r['block_y1']) for r in rows if r['wide_block']})
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1] + 12:
            merged[-1][1] = max(end, merged[-1][1])
        else:
            merged.append([start, end])
    result, pending = [], list(rows)
    for start, end in merged:
        before = [r for r in pending if r['y'] < start - .5]
        result.extend(sorted(before, key=lambda r: (r['column'], round(r['y'], 1), r['x'])))
        band = [r for r in pending if start - .5 <= r['y'] <= end + .5]
        result.extend(sorted(band, key=lambda r: (round(r['y'], 1), r['x'])))
        pending = [r for r in pending if r['y'] > end + .5]
    result.extend(sorted(pending, key=lambda r: (r['column'], round(r['y'], 1), r['x'])))
    return result


def read_rows(pdf):
    import pymupdf
    old_order, pages = [], []
    with pymupdf.open(pdf) as document:
        if len(document) != 510:
            raise ValueError('Unexpected PDF page count')
        for number, page in enumerate(document, 1):
            if number < 5:
                continue
            gutter = 250 if number % 2 else 227
            rows = []
            for block in page.get_text('dict')['blocks']:
                bbox = block['bbox']
                wide = bbox[0] < gutter - 40 and bbox[2] > gutter + 40
                for line in block.get('lines', []):
                    text = ''.join(s['text'] for s in line['spans']).strip()
                    if not text or line['bbox'][1] < 35:
                        continue
                    fonts = {s['font'] for s in line['spans'] if s['text'].strip()}
                    rows.append(dict(text=text, page=number, x=line['bbox'][0], y=line['bbox'][1],
                        bbox=list(line['bbox']), column=1 + int(line['bbox'][0] >= gutter),
                        block_y0=bbox[1], block_y1=bbox[3], wide_block=wide,
                        comment=bool(fonts) and all('Helvetica-Condensed' in f for f in fonts),
                        rotated=line.get('dir', (1, 0))[0] < 0))
            original = sorted(rows, key=lambda r: (r['column'], round(r['y'], 1), r['x']))
            for row in original:
                row['original_line'] = len(old_order)
                old_order.append(row)
            pages.append(order_page(rows))
    return [r for page in pages for r in page]


def find_headers(text):
    headers = []
    for match in re.finditer(r'(?m)^\(', text):
        depth = 0
        for index in range(match.start(), min(match.start() + 400, len(text))):
            char = text[index]
            depth += (char == '(') - (char == ')')
            if depth == 0:
                meta = text[match.start()+1:index]
                if (re.search(r'\bCESPE\b', meta) or re.fullmatch(r'(?:Diplomacia|Bolsa-Prêmio/Itamaraty|Magistratura/DF)\s*[-–]?\s*(?:19|20)\d{2}', meta)) and not re.search(r'justificativa|gabarito', meta, re.I):
                    headers.append((match.start(), index + 1, meta))
                break
    # Some support-text blocks have no repeated exam heading. Recover their
    # item boundaries while explicitly withholding exam attribution.
    extra = []
    for number, (start, end, meta) in enumerate(headers):
        limit = headers[number+1][0] if number+1 < len(headers) else len(text)
        keys = list(re.finditer(r'(?m)^Gabarito[^\n]*', text[end:limit]))
        for previous, following in zip(keys, keys[1:]):
            begin, finish = end + previous.end(), end + following.start()
            body = text[begin:finish]
            if re.search(r'(?m)^\(\d{1,3}\)\s+[A-Za-zÀ-ÿ]', body):
                begin += len(body) - len(body.lstrip())
                extra.append((begin, begin, 'Cabeçalho da prova não repetido neste bloco'))
    return sorted(headers + extra)


def split_body(body, comment_flags):
    """Split numbered questions, including groups containing A–E alternatives."""
    labels = []
    for match in re.finditer(r'(?m)^\((\d{1,3})\)\s*', body):
        tail = body[match.end():].split('\n', 1)[0].strip()
        if len(re.findall(r'[A-Za-zÀ-ÿ]', tail)) >= 8 and not comment_flags(match.start()):
            labels.append(match)
    option_starts = [m.start() for m in re.finditer(r'(?m)^\([ABCDE]\)\s*', body)]
    anchor = max([m.start() for m in labels] + option_starts + [0])
    comment_start = next((m.start() for m in re.finditer(r'(?m)^.+', body)
                          if m.start() > anchor and comment_flags(m.start())), len(body))
    stem = body[:comment_start]
    labels = [m for m in labels if m.start() < comment_start]
    if not labels:
        return [('single', stem.strip(), '')], body[comment_start:]
    shared = stem[:labels[0].start()].strip()
    pieces = [(m.group(1), stem[m.end():labels[n+1].start() if n+1 < len(labels) else len(stem)].strip(), shared)
              for n, m in enumerate(labels)]
    return pieces, body[comment_start:]


def extract(pdf, baseline, output):
    pdf, output = Path(pdf), Path(output)
    if sha(pdf.read_bytes()) != SOURCE:
        raise ValueError('This layout profile is limited to the inspected PDF')
    if output.resolve().is_relative_to(REPO):
        raise ValueError('Source text must stay outside the repository')
    output.mkdir(parents=True, exist_ok=True)
    old = json.loads(Path(baseline).read_text())
    old_by_id = {c['id']: c for c in old['candidates']}
    old_by_text = defaultdict(list)
    for c in old['candidates']:
        old_by_text[normalized(c['payload']['question_text_candidate'])].append(c['id'])
    spec = importlib.util.spec_from_file_location('rules', REPO/'scripts/catalog-multiple-pdfs.py')
    rules = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(rules)
    rows = read_rows(pdf)
    starts, chunks, offset = [], [], 0
    for row in rows:
        starts.append(offset)
        chunks.append(row['text'] + '\n')
        offset += len(chunks[-1])
    text = ''.join(chunks)
    headers = find_headers(text)
    recovered, changed, matched, all_ids, groups = [], [], set(), set(), []
    answer_changes = []
    for n, (begin, header_end, meta) in enumerate(headers):
        end = headers[n+1][0] if n+1 < len(headers) else len(text)
        key = re.search(r'(?m)^Gabarito[^\n]*', text[header_end:end])
        stop = header_end + key.end() if key else end
        body_end = header_end + key.start() if key else end
        def row_at(position):
            return rows[bisect.bisect_right(starts, position)-1]
        pieces, commentary = split_body(text[header_end:body_end], lambda pos: row_at(header_end+pos)['comment'])
        row = row_at(begin)
        group = f"p{row['page']}:c{row['column']}:line{row['original_line']}"
        answer_line = key.group() if key else None
        answers = {label: value.upper() for label, value in re.findall(r'(\d+)\s*(ANULADA|[ABCDE])\b', answer_line or '', re.I)}
        single = re.search(r'Gabarito\s*[\"“”\']?([ABCDE])\b', answer_line or '')
        subject = next(s for page, s in reversed(rules.PAGE_SECTIONS[pdf.name]) if row['page'] >= page)
        label_counts = Counter(label for label, question, shared in pieces)
        groups.append(dict(group=group, page=row['page'], items=len(pieces), has_key=bool(key)))
        for label, question, shared in pieces:
            source_key = group + ':item' + label
            if label_counts[label] > 1:
                continue  # Never manufacture identities for repeated/ambiguous labels.
            ident = sha(SOURCE + ':' + source_key)
            all_ids.add(ident)
            fp = normalized(question)
            if ident in old_by_id:
                new_answer = answers.get(label)
                if new_answer is None and (label == 'single' or len(pieces) == 1) and single:
                    new_answer = single.group(1)
                annulment_claim = new_answer == 'ANULADA'
                if annulment_claim:
                    new_answer = None
                prior_answer = old_by_id[ident]['payload']['answer_candidate']
                if new_answer != prior_answer or annulment_claim:
                    answer_changes.append(dict(candidate_id=ident, source_page=row['page'], old_answer=prior_answer, new_answer=new_answer, publisher_claim_annulled=annulment_claim, new_key_line=answer_line))
                matched.add(ident)
                if fp != normalized(old_by_id[ident]['payload']['question_text_candidate']):
                    changed.append(dict(candidate_id=ident, source_page=row['page'], source_key=source_key,
                                        old_text=old_by_id[ident]['payload']['question_text_candidate'], new_text=question,
                                        new_context=shared, raw_text=text[begin:stop]))
                continue
            if fp in old_by_text:
                matched.update(old_by_text[fp])
                continue
            answer = answers.get(label)
            if answer is None and (label == 'single' or len(pieces) == 1) and single:
                answer = single.group(1)
            annulled = answer == 'ANULADA'
            if annulled:
                answer = None
            routes = rules.normative_routes(subject, question + '\n' + text[begin:stop])
            is_mc = bool(re.search(r'(?m)^\([ABCDE]\)', question))
            payload = dict(raw_text=text[begin:stop], question_text_candidate=question,
                shared_instruction_candidate=shared, preceding_context_candidate='',
                publisher_commentary_unverified=commentary.strip(), answer_candidate=answer,
                answer_provenance='Gabarito editorial da apostila, não certificado pela banca',
                answer_key_line=answer_line, publisher_claim_annulled=annulled,
                question_format_candidate='multiple_choice' if is_mc else 'true_false' if label != 'single' else 'undetermined',
                source_group_key=group, source_column=row['column'], group_item_label=label,
                source_end_page=row_at(max(begin, stop-1))['page'], exam_metadata=meta, exam_metadata_explicit=begin != header_end,
                extraction_profile='vertical-bands-and-columns-v2', extraction_is_not_audit=True,
                original_header_bbox=row['bbox'], legal_review_required='legislacao_oficial' in routes,
                normative_review_required=['accounting'] if 'norma_contabil_oficial' in routes else [],
                official_review_routes=routes, text_fingerprint=sha(fp),
                publication_blockers=['Confirmar visualmente enunciado, contexto, figuras e tabelas',
                    'Conferir correspondência de gabarito e eventuais anulações em fonte oficial',
                    'Comparar com o catálogo atual e com os fragmentos da primeira extração',
                    'Auditar normas, leis e precedentes nas fontes oficiais competentes',
                    'Vincular ao edital e redigir comentário e exemplo autorais antes de publicar'],
                individual_review_complete=False, has_publication=False)
            recovered.append(dict(id=ident, corpus_id=SOURCE, source_key=source_key, discipline=subject,
                                  source_page=row['page'], content_status='under_review', payload=payload))
    recovered_ids = [c['id'] for c in recovered]
    if len(recovered_ids) != len(set(recovered_ids)):
        raise ValueError('Duplicate recovered identity')
    summary = dict(source_id=SOURCE, pages=510, profile='vertical-bands-and-columns-v2',
        old_candidates=len(old_by_id), header_groups=len(headers), synthetic_groups=sum(begin == end for begin, end, meta in headers), segmented_identities=len(all_ids),
        recovered_candidates=len(recovered), existing_changed_text=len(changed),
        existing_not_matched=len(set(old_by_id)-matched), existing_answer_changes=len(answer_changes),
        recovered_by_subject=dict(Counter(c['discipline'] for c in recovered)),
        recovered_without_answer=sum(not c['payload']['answer_candidate'] for c in recovered),
        advertised_7000_count_verified=False, segmentation_coverage_complete=False,
        existing_rows_modified=0, inserted_in_database=0, publications=0)
    for name, value in [('supplement.json',dict(source=old['source'],candidates=recovered)),
                        ('existing-corrections.json',changed), ('answer-corrections.json',answer_changes), ('summary.json',summary), ('groups.json',groups)]:
        (output/name).write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
    (output/'reading-order-v2.txt').write_text(text)
    (output/'existing-not-matched.json').write_text(json.dumps(sorted(set(old_by_id)-matched),indent=2)+'\n')
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return summary


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pdf'); parser.add_argument('baseline'); parser.add_argument('output')
    args = parser.parse_args()
    extract(args.pdf, args.baseline, args.output)
