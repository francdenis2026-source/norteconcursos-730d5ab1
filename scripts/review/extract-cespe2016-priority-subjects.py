"""Extract the four requested subjects again into private batches of at most 100.

This exports original PDF wording and editorial evidence, not adapted questions.
It does not insert, update, approve or publish database rows.
"""
import argparse
import bisect
from collections import Counter, defaultdict
import hashlib
import importlib.util
import json
from pathlib import Path
import re

spec = importlib.util.spec_from_file_location('layout', Path(__file__).with_name('extract-cespe2016-supplement.py'))
layout = importlib.util.module_from_spec(spec)
spec.loader.exec_module(layout)
SUBJECTS = [('portugues', 'Língua Portuguesa'), ('contabilidade', 'Contabilidade'),
            ('ctb', 'Legislação de Trânsito'), ('institucional', 'Legislação Institucional')]
PAIR = re.compile(r'(?<!\d)(\d{1,3})\s*[:.)-]?\s*(ANULAD[AO]|[ABCDE])\b', re.I)


def editorial_answer(lines, label, item_count):
    values = []
    dissent = False
    for line in lines:
        pairs = PAIR.findall(line)
        own = [value.upper() for number, value in pairs if number == label]
        if not pairs and (label == 'single' or item_count == 1):
            match = re.search(r'^Gabarito\s*(?:Oficial\s*)?["“”\x27]?([ABCDE])\b', line, re.I)
            if match:
                own.append(match[1].upper())
            elif re.search('ANULAD[AO]', line, re.I):
                own.append('ANULADA')
        values.extend(own)
        dissent |= bool(re.search(r'não há alternativa|sem alternativa correta', line, re.I))
    annulled = any(v.startswith('ANULAD') for v in values)
    conflict = len(set(values)) > 1 or dissent
    answer = values[0] if values and not annulled and not conflict else None
    return dict(answer_candidate=answer, answer_variants=values,
                publisher_claim_annulled=annulled, editorial_answer_conflict=conflict,
                official_answer_verified=False)


def batches(rows, size=100):
    if not 1 <= size <= 100:
        raise ValueError('Batch size must be 1..100')
    return [rows[start:start+size] for start in range(0, len(rows), size)]


def extract(pdf, baseline, supplement, output, decisions=None):
    pdf, output = Path(pdf), Path(output)
    if hashlib.sha256(pdf.read_bytes()).hexdigest() != layout.SOURCE:
        raise ValueError('Unexpected source hash')
    if output.resolve().is_relative_to(layout.REPO):
        raise ValueError('Original PDF text must remain outside Git')
    output.mkdir(parents=True, exist_ok=True)
    rules_spec = importlib.util.spec_from_file_location('rules', layout.REPO/'scripts/catalog-multiple-pdfs.py')
    rules = importlib.util.module_from_spec(rules_spec)
    rules_spec.loader.exec_module(rules)
    inventory = json.loads(Path(baseline).read_text())['candidates'] + json.loads(Path(supplement).read_text())['candidates']
    old_by_id = {c['id']: c for c in inventory}
    excluded = {}
    for name in ['cespe2016-obsolete-removal-2026-10-17.json', 'cespe2016-obsolete-removal-04-2026-10-17.json']:
        for item in json.loads((layout.REPO/'docs/reviews'/name).read_text())['items']:
            excluded[item['candidate_id']] = 'obsolete_removed'
    if decisions:
        for candidate in json.loads(Path(decisions).read_text())['candidates']:
            if candidate['corpus_id'] != layout.SOURCE:
                raise ValueError('Decision snapshot source mismatch')
            if candidate['content_status'] in ['obsolete', 'rejected', 'duplicate']:
                excluded.setdefault(candidate['id'], candidate['content_status'])
    lines = layout.read_rows(pdf)
    starts, chunks, offset = [], [], 0
    for row in lines:
        starts.append(offset)
        chunks.append(row['text']+'\n')
        offset += len(chunks[-1])
    text = ''.join(chunks)
    def at(position):
        return lines[max(0, bisect.bisect_right(starts, position)-1)]
    headers = layout.find_headers(text)
    previous_stop = 0
    selected, issues = [], []
    for number, (begin, header_end, metadata) in enumerate(headers):
        end = headers[number+1][0] if number+1 < len(headers) else len(text)
        keys = list(re.finditer(r'(?m)^Gabarito[^\n]*', text[header_end:end]))
        body_end = header_end+keys[0].start() if keys else end
        stop = header_end+keys[-1].end() if keys else end
        context = text[min(previous_stop, begin):begin]
        context_start = min(previous_stop, begin)
        previous_stop = stop
        # Preserve context for every subject before filtering the requested four.
        row = at(begin)
        subject = next(s for page, s in reversed(rules.PAGE_SECTIONS[pdf.name]) if row['page'] >= page)
        if subject not in {s for slug, s in SUBJECTS}:
            continue
        pieces, commentary = layout.split_body(text[header_end:body_end], lambda pos: at(header_end+pos)['comment'])
        group = f"p{row['page']}:c{row['column']}:line{row['original_line']}"
        repeated = Counter(label for label, question, shared in pieces)
        key_lines = [key.group() for key in keys]
        for label, question, shared in pieces:
            if repeated[label] > 1 or not question:
                issues.append(dict(group=group, source_page=row['page'], subject=subject,
                                   issue='Repeated label or empty question', label=label))
                continue
            source_key = group+':item'+label
            ident = layout.sha(layout.SOURCE+':'+source_key)
            old = old_by_id.get(ident)
            answers = editorial_answer(key_lines, label, len(pieces))
            options = re.findall(r'(?m)^\(([ABCDE])\)\s*(.*?)(?=^\([ABCDE]\)|\Z)', question, re.S)
            selected.append(dict(candidate_id=ident, corpus_id=layout.SOURCE, source_key=source_key,
                discipline=subject, source_page=row['page'], source_end_page=at(max(begin,stop-1))['page'],
                question_text=question, shared_instruction=shared,
                preceding_context_unverified=context.strip(), context_start_page=at(context_start)['page'],
                publisher_commentary_unverified=commentary.strip(), raw_group_text=text[begin:stop],
                answer_key_lines=key_lines, **answers,
                alternatives=[dict(letter=letter,text=value.strip()) for letter,value in options],
                question_format='multiple_choice' if options else 'true_false' if label!='single' else 'undetermined',
                exam_metadata=metadata, exam_metadata_explicit=begin!=header_end,
                original_header_bbox=row['bbox'], original_item_label=label,
                prior_inventory_match=bool(old),
                text_differs_from_prior=bool(old and layout.normalized(question)!=layout.normalized(old['payload']['question_text_candidate'])),
                answer_differs_from_prior=bool(old and answers['answer_candidate']!=old['payload']['answer_candidate']),
                visual_review_required=subject=='Contabilidade' or bool(re.search(r'tabela|figura|gráfico|balancete', shared+' '+question, re.I)),
                manual_visual_review_complete=False, current_law_audit_complete=False,
                publication_approved=False, exported_state='under_review',
                comment_provenance='Original editorial commentary retained for verification; not authored by the assistant',
                official_review_required=['banca_prova_gabarito', 'edital_ativo'] +
                    (['Planalto_CONTRAN'] if subject=='Legislação de Trânsito' else
                     ['fontes_oficiais_da_carreira'] if subject=='Legislação Institucional' else
                     ['CFC_CPC_normas_contabeis_vigentes'] if subject=='Contabilidade' else [])))
    selected.sort(key=lambda r: (r['source_page'], int(r['source_key'].split(':line')[1].split(':')[0]),
        int(r['original_item_label']) if r['original_item_label'].isdigit() else 0))
    if len({r['candidate_id'] for r in selected}) != len(selected):
        raise ValueError('Ambiguous identity in extraction')
    excluded_rows = [dict(r, exported_state=excluded[r['candidate_id']]) for r in selected if r['candidate_id'] in excluded]
    eligible_rows = [r for r in selected if r['candidate_id'] not in excluded]
    (output/'excluded-historical-items.json').write_text(json.dumps(excluded_rows, ensure_ascii=False, indent=2)+'\n')
    manifest = dict(source_id=layout.SOURCE, profile='priority-subjects-original-text-v1',
        source_pages=510, identified_records=len(selected), record_count=len(eligible_rows), batch_limit=100,
        excluded_historical_items=[dict(candidate_id=r['candidate_id'], discipline=r['discipline'], reason=r['exported_state']) for r in excluded_rows],
        extraction_complete_certified=False, original_exam_items_published=0,
        database_writes=0, publications=0, issues=issues, subjects=[])
    for slug, subject in SUBJECTS:
        all_rows = [r for r in selected if r['discipline']==subject]
        rows = [r for r in eligible_rows if r['discipline']==subject]
        prior = {r['id'] for r in inventory if r['discipline']==subject}
        actual = {r['candidate_id'] for r in all_rows}
        packs = []
        for n, batch in enumerate(batches(rows), 1):
            filename = f'{slug}-lote-{n:02}.json'
            payload = dict(source_id=layout.SOURCE, discipline=subject, publication_approved=False, items=batch)
            serialized = json.dumps(payload, ensure_ascii=False, indent=2)+'\n'
            (output/filename).write_text(serialized)
            packs.append(dict(file=filename, count=len(batch), sha256=hashlib.sha256(serialized.encode()).hexdigest(),
                candidate_ids=[r['candidate_id'] for r in batch]))
        manifest['subjects'].append(dict(discipline=subject, identified_records=len(all_rows), records=len(rows),
            excluded_records=len(all_rows)-len(rows), batches=packs,
            prior_records_not_reidentified=sorted(prior-actual),
            new_identities_vs_prior_inventory=sorted(actual-prior),
            texts_changed=sum(r['text_differs_from_prior'] for r in rows),
            answer_diagnostics=sum(r['answer_differs_from_prior'] or r['editorial_answer_conflict'] or r['publisher_claim_annulled'] for r in rows),
            missing_or_conflicting_answers=sum(r['answer_candidate'] is None for r in rows)))
    (output/'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    print(json.dumps(dict(identified_records=len(selected),records=len(eligible_rows),subjects=[{k:v for k,v in s.items() if k!='batches'} for s in manifest['subjects']],batch_count=sum(len(s['batches']) for s in manifest['subjects']),issues=len(issues)),ensure_ascii=False,indent=2))
    return manifest


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ['pdf','baseline','supplement','output']:
        parser.add_argument(name)
    parser.add_argument('--decisions', help='Prior private staging pack; preserves existing obsolete/rejected/duplicate decisions')
    args=parser.parse_args()
    extract(args.pdf,args.baseline,args.supplement,args.output,args.decisions)
