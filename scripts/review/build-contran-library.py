"""Build a scoped catalog from official PDF evidence and explicitly authored guides.

Usage: python scripts/review/build-contran-library.py EVIDENCE_FOLDER
For another batch: add --authoring FILE --report FILE --append.
Raw PDFs, snapshots and unreviewed catalog rows remain outside Git.
The published text assets are public official acts, clearly labelled as source editions.
"""
import datetime
import argparse
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
OFFICIAL = 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran'

def read(folder, name):
    return json.loads((folder/name).read_text(encoding='utf-8'))

def date(text):
    match = re.search(r'(\d{2})[./](\d{2})[./](\d{2,4})', text)
    if not match:
        raise ValueError('Data oficial não identificada')
    day, month, year = map(int, match.groups())
    if year < 100:
        year += 2000 if year < 70 else 1900
    return datetime.date(year, month, day).isoformat()

def wholly_revoked(situation):
    value = situation.lower()
    return bool(re.search(r'\brevogada\b', value)) and not re.search(
        r'parcialmente revogada|revogada (?:em parte|parcialmente)', value)

def official_url(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.hostname != 'www.gov.br' or not parsed.path.startswith('/transportes/'):
        raise ValueError('Fonte fora do portal oficial de Transportes')
    return url

def build(folder, authoring='docs/library/contran-guides-authored-2026-10-12.json',
          report_path='docs/library/contran-review-2026-10-12.json', append=False):
    selected = read(folder, 'selected.json')
    evidence = {e['number']:e for e in read(folder, 'pdf-evidence.json')}
    catalog = read(folder, 'catalog.json')
    supplementary = read(folder, 'supplementary-evidence.json')
    authored = read(ROOT, authoring)
    assert 50 <= len(selected) == len(authored) <= 100
    assert {str(r['number']) for r in selected} == set(authored)
    target = ROOT/'src/data/contranGuides.ts'
    previous = []
    if append:
        previous = json.loads(target.read_text().split('export const CONTRAN_GUIDES: ContranGuide[] = ', 1)[1].strip().removesuffix(';'))
        assert not ({g['number'] for g in previous} & {r['number'] for r in selected}), 'Lote duplicado'
    for extra in supplementary:
        raw = (folder/'pdfs'/f"{extra['id']}.pdf").read_bytes()
        assert raw.startswith(b'%PDF-') and hashlib.sha256(raw).hexdigest() == extra['sha256']
        official_url(extra['url'])
    guides = []
    assets = ROOT/'public/contran'
    text_assets = []
    for row in selected:
        number = row['number']
        author, ev = authored[str(number)], evidence[number]
        assert ev['ok'] and not wholly_revoked(row['situation'])
        raw = (folder/'pdfs'/f'{number}.pdf').read_bytes()
        assert raw.startswith(b'%PDF-') and hashlib.sha256(raw).hexdigest() == ev['sha256']
        text = (folder/'texts'/f'{number}.txt').read_text(encoding='utf-8')
        # PDFs may format resolution numbers with dots and thousands spacing.
        assert re.search(r'RESOLU[ÇC][ÃA]O\s+(?:CONTRAN\s+)?N[º°o]?\.?\s*'
                         + re.escape(f'{number:,}'.replace(',', '.')), text, re.I) or str(number) in re.sub(r'[.\s]', '', text[:4000])
        assert len(text.strip()) > 80
        issue, indexed_publication = date(row['date']), date(row['publication'])
        primary_date = re.search(r'Publicado em:\s*(\d{2}/\d{2}/\d{4})', text)
        publication = date(primary_date[1]) if primary_date else indexed_publication
        assert 1900 <= int(publication[:4]) <= 2100, 'Data de publicação inválida'
        year = int(issue[:4])
        references = []
        related_dates = [publication]
        for other in catalog:
            # Older acts citing their own repeal by this act are not later amendments.
            if other['number'] <= number:
                continue
            citation = other['situation']+' '+other['subject']
            if re.search(rf'\b{number}/(?:{year}|{str(year)[2:]})\b', citation) or re.search(
                rf'Resolução\s+(?:CONTRAN\s+)?(?:n[ºo°.]*\s*)?{number},\s*de\b', citation, re.I):
                references.append(dict(label=f"Resolução {other['number']}",url=official_url(other['url'])))
                related_dates.append(date(other['publication']))
        extra_ids = {1028:['del277'],1013:['del277'],1026:['ret1026','circular1026'],1021:['ret1021']}.get(number,[])
        for ev_extra in supplementary:
            if ev_extra['id'] in extra_ids or number in ev_extra.get('numbers', []):
                references.append(dict(label=ev_extra.get('label') or {'del277':'Deliberação 277/2026','ret1026':'Retificação da 1026',
                    'circular1026':'Circular 2/2026: implementação','ret1021':'Retificação da 1021'}[ev_extra['id']],
                    url=official_url(ev_extra['url'])))
                if ev_extra.get('publication_date'):
                    related_dates.append(ev_extra['publication_date'])
        if number == 1026:
            related_dates.append('2026-09-30')
        if number == 1021:
            related_dates.append('2026-06-09')
        # Require real authored application, not summaries guessed from titles.
        assert author['points'] and all(isinstance(p,str) and p.strip() for p in author['points'])
        case = author['example']
        assert all(isinstance(case[k],str) and case[k].strip() for k in
                   ['scenario','question','answer','variation','variationAnswer'])
        assert '?' in case['question']
        guide = dict(number=number,year=year,title=author['title'],subject=row['subject'],issueDate=issue,
            publicationDate=publication,lastRelatedActDate=max(related_dates),checkedAt='2026-10-12',
            officialSituation=row['situation'],sourceUrl=official_url(row['url']),relatedSources=references,
            sourceSha256=ev['sha256'],historical=author['historical'],points=author['points'],
            warning=author['warning'],example=case)
        if author.get('reviewedScope'):
            guide['reviewedScope'] = author['reviewedScope']
        if publication != indexed_publication:
            guide['publicationIndexDate'] = row['publication']
        if not guide['historical']:
            name = f'{number}-{year}.json'
            text_assets.append((name, json.dumps(dict(title=guide['title'],source_url=row['url'],
                edition='PDF oficial consultado; publicação original, não compilação integral de alterações',text=text),
                ensure_ascii=False)+'\n'))
            guide['textPath'] = '/contran/'+name
        guides.append(guide)
    batch_guides = guides
    if append:
        guides = previous + guides
    index_hash = hashlib.sha256((folder/'official-index.html').read_bytes()).hexdigest()
    assets.mkdir(exist_ok=True)
    for name, payload in text_assets:
        (assets/name).write_text(payload, encoding='utf-8')
    target.write_text('import type { ContranGuide } from "@/lib/contranStudy";\n\n'
        + 'export const CONTRAN_INDEX_URL = '+json.dumps(OFFICIAL)+';\n'
        + 'export const CONTRAN_CHECKED_AT = "2026-10-12";\n'
        + 'export const CONTRAN_GUIDES: ContranGuide[] = '+json.dumps(guides,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    report = dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),official_index=OFFICIAL,
        official_index_sha256=index_hash,
        catalog_rows=len(catalog),batch_resolutions=len(batch_guides),current_guides=sum(not g['historical'] for g in batch_guides),
        historical_guides_excluded=[g['number'] for g in batch_guides if g['historical']],
        cumulative_examined=len(guides),cumulative_current_guides=sum(not g['historical'] for g in guides),
        publication_date_discrepancies=[dict(number=g['number'],index=g['publicationIndexDate'],
            official_pdf=g['publicationDate']) for g in batch_guides if g.get('publicationIndexDate')],
        scope='Objetos e aplicações temáticas dos atos listados; não revisão integral de todas as fichas/anexos ou de todas as resoluções do catálogo.',
        evidence=list(evidence.values()),supplementary_evidence=supplementary,
        remaining_catalog_not_in_batch=len(catalog)-len(batch_guides))
    (ROOT/report_path).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print({k:report[k] for k in ['batch_resolutions','current_guides','historical_guides_excluded']})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('folder', type=Path)
    parser.add_argument('--authoring', default='docs/library/contran-guides-authored-2026-10-12.json')
    parser.add_argument('--report', default='docs/library/contran-review-2026-10-12.json')
    parser.add_argument('--append', action='store_true')
    args = parser.parse_args()
    build(args.folder, args.authoring, args.report, args.append)
