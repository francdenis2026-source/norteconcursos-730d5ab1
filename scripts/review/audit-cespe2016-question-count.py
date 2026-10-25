"""Read-only census of the inspected 510-page PDF, independent of exam headers.

Counts are observations, not a certification of unique questions or answer validity.
Outputs contain page-level metrics only, never source question text or credentials.
"""
import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import pymupdf

SOURCE = 'cd1bd6a9eb5e62e0cf6b5ae0be4d5f332b968432c419733878d30956d45ec705'
PAIR = re.compile(r'(?<!\d)(\d{1,3})\s*[:.)-]?\s*(ANULAD[AO]|[ABCDE])\b', re.I)
SINGLE = re.compile(r'^Gabarito\s*(?:Oficial\s*)?["“”\x27]?([ABCDE])\b', re.I)


def key_units(text):
    pairs = PAIR.findall(text)
    if pairs:
        return len(pairs), len({label for label, answer in pairs})
    if SINGLE.search(text) or re.search(r'ANULAD[AO]', text, re.I):
        return 1, 1
    return 0, 0


def census(pdf, baseline, supplement, v2_summary):
    if hashlib.sha256(Path(pdf).read_bytes()).hexdigest() != SOURCE:
        raise ValueError('Unexpected PDF hash')
    pages, key_lines = [], []
    with pymupdf.open(pdf) as document:
        if len(document) != 510:
            raise ValueError('Expected 510 pages')
        for number, page in enumerate(document, 1):
            counts = Counter()
            labels = []
            for block in page.get_text('dict')['blocks']:
                for line in block.get('lines', []):
                    text = ''.join(span['text'] for span in line['spans']).strip()
                    if line['bbox'][1] < 35 and re.fullmatch(r'\d{1,3}', text):
                        labels.append(int(text))
                    if number < 5 or line['bbox'][1] < 35:
                        continue
                    fonts = {s['font'] for s in line['spans'] if s['text'].strip()}
                    comment = bool(fonts) and all('Helvetica-Condensed' in font for font in fonts)
                    if re.match(r'^\(\d{1,3}\)', text):
                        counts['numeric_markers'] += 1
                        counts['numeric_markers_in_comment_font' if comment else 'numeric_markers_in_question_font'] += 1
                    option = re.match(r'^\(([ABCDE])\)', text)
                    if option:
                        counts['alternative_' + option[1]] += 1
                    if text.startswith('Gabarito'):
                        raw, distinct = key_units(text)
                        counts['answer_key_lines'] += 1
                        counts['raw_answer_references'] += raw
                        counts['answer_references_after_same_line_label_dedup'] += distinct
                        counts['unparsed_answer_key_lines'] += raw == 0
                        key_lines.append(dict(pdf_page=number, raw_units=raw, distinct_labels=distinct,
                            official_and_editorial_on_same_line=bool(re.search('nosso', text, re.I))))
            pages.append(dict(pdf_page=number, role='cover' if number == 1 else 'index' if number <= 4 else 'content',
                text_characters=len(page.get_text()), expected_printed_page=number-4 if number >= 5 else None,
                header_page_labels=labels, expected_page_label_found=number-4 in labels if number >= 5 else None,
                counts=dict(counts)))
    # Look for parallel complete keys using layout-aware rows, WITHOUT using the
    # question/header segmentation that produced the existing candidate records.
    spec = importlib.util.spec_from_file_location('layout', Path(__file__).with_name('extract-cespe2016-supplement.py'))
    layout = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(layout)
    rows = layout.read_rows(pdf)
    parallel_keys = []
    for previous, following in zip(rows, rows[1:]):
        if (previous['text'].startswith('Gabarito') and following['text'].startswith('Gabarito')
                and re.search('nosso', previous['text'], re.I)
                and re.search('oficial', following['text'], re.I)):
            a = {label for label, answer in PAIR.findall(previous['text'])}
            b = {label for label, answer in PAIR.findall(following['text'])}
            parallel_keys.append(dict(first_pdf_page=previous['page'], second_pdf_page=following['page'],
                                      shared_numbered_labels=len(a & b)))
    counts = Counter()
    for page in pages:
        counts.update(page['counts'])
    original = json.loads(Path(baseline).read_text())['candidates']
    extra = json.loads(Path(supplement).read_text())['candidates']
    inventory = Counter(c['source_page'] for c in original + extra)
    for page in pages:
        page['extraction_records_starting_here'] = inventory[page['pdf_page']]
    summary = json.loads(Path(v2_summary).read_text())
    rules_spec = importlib.util.spec_from_file_location('rules', layout.REPO / 'scripts/catalog-multiple-pdfs.py')
    rules = importlib.util.module_from_spec(rules_spec)
    rules_spec.loader.exec_module(rules)
    sections = rules.PAGE_SECTIONS[Path(pdf).name]
    by_subject = []
    for index, (start, subject) in enumerate(sections):
        end = sections[index+1][0]-1 if index+1 < len(sections) else 510
        subject_pages = [p for p in pages if start <= p['pdf_page'] <= end]
        by_subject.append(dict(subject=subject, first_pdf_page=start, last_pdf_page=end,
            recorded_candidates=sum(p['extraction_records_starting_here'] for p in subject_pages),
            raw_answer_references=sum(p['counts'].get('raw_answer_references', 0) for p in subject_pages)))
    return dict(source_id=SOURCE, checked_at=datetime.now(timezone.utc).isoformat(),
        advertised_count=7000, pdf_pages=510, content_pages=506,
        content_pages_with_expected_header_label=sum(p['expected_page_label_found'] is True for p in pages),
        content_pages_with_other_header_number=[p['pdf_page'] for p in pages if p['role']=='content' and p['header_page_labels'] and not p['expected_page_label_found']],
        content_pages_without_expected_header_label=[p['pdf_page'] for p in pages if p['role']=='content' and not p['expected_page_label_found']],
        header_labels_absent_only_at_chapter_starts={p['pdf_page'] for p in pages if p['role']=='content' and not p['expected_page_label_found']} == {n for n, subject in sections},
        observed_counts=dict(counts), parallel_answer_keys=parallel_keys, by_subject=by_subject,
        answer_reference_estimate_after_observed_repetitions=counts['answer_references_after_same_line_label_dedup']-sum(k['shared_numbered_labels'] for k in parallel_keys),
        original_extraction_records=len(original), supplemental_extraction_records=len(extra),
        cumulative_extraction_records=len(original)+len(extra),
        v2_segmented_identities=summary['segmented_identities'], legacy_records_not_reidentified=summary['existing_not_matched'],
        advertised_count_verified=False, unique_question_total_verified=False,
        missing_question_count=None, manual_visual_review_of_every_page_complete=False,
        findings=['All 510 PDF pages scanned for page-level metrics; 506 contain the book content.',
            'Cover advertises 7000; census does not substantiate 7000 individually identified questions.',
            'Answer references, numbered assertions, alternatives and extraction records are different counting units.',
            'A-E alternatives are not counted as separate questions.',
            'Parallel official/editorial keys and same-line repeated labels are observations, not new questions.',
            'No supported conclusion that 3703 questions were lost, nor that the PDF omits specific pages.',
            'Page-level metrics and header continuity do not prove the uploaded document is the full original edition.'],
        publications=0, database_writes=0, pages=pages)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pdf'); parser.add_argument('baseline'); parser.add_argument('supplement'); parser.add_argument('v2_summary'); parser.add_argument('output')
    args = parser.parse_args()
    result = census(args.pdf, args.baseline, args.supplement, args.v2_summary)
    Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['pages','findings']}, ensure_ascii=False, indent=2))
