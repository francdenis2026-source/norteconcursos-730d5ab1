"""Build a scoped catalog from official PDF evidence and explicitly authored guides.

Usage: python scripts/review/build-contran-library.py EVIDENCE_FOLDER
Raw PDFs, snapshots and unreviewed catalog rows remain outside Git.
The published text assets are public official acts, clearly labelled as source editions.
"""
import datetime
import hashlib
import json
import re
import sys
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

def build(folder):
    selected = read(folder, 'selected.json')
    evidence = {e['number']:e for e in read(folder, 'pdf-evidence.json')}
    catalog = read(folder, 'catalog.json')
    supplementary = read(folder, 'supplementary-evidence.json')
    authored = read(ROOT, 'docs/library/contran-guides-authored-2026-10-12.json')
    assert len(selected) == len(authored) == 50
    assert {str(r['number']) for r in selected} == set(authored)
    guides = []
    assets = ROOT/'public/contran'
    assets.mkdir(exist_ok=True)
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
        issue, publication = date(row['date']), date(row['publication'])
        year = int(issue[:4])
        references = []
        related_dates = [publication]
        for other in catalog:
            # Older acts citing their own repeal by this act are not later amendments.
            if other['number'] <= number:
                continue
            if re.search(rf'\b{number}/(?:{year}|{str(year)[2:]})\b', other['situation']):
                references.append(dict(label=f"Resolução {other['number']}",url=official_url(other['url'])))
                related_dates.append(date(other['publication']))
        extra_ids = {1028:['del277'],1013:['del277'],1026:['ret1026','circular1026'],1021:['ret1021']}.get(number,[])
        for ev_extra in supplementary:
            if ev_extra['id'] in extra_ids:
                references.append(dict(label={'del277':'Deliberação 277/2026','ret1026':'Retificação da 1026',
                    'circular1026':'Circular 2/2026: implementação','ret1021':'Retificação da 1021'}[ev_extra['id']],
                    url=official_url(ev_extra['url'])))
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
        if not guide['historical']:
            name = f'{number}-{year}.json'
            (assets/name).write_text(json.dumps(dict(title=guide['title'],source_url=row['url'],
                edition='PDF oficial consultado; publicação original, não compilação integral de alterações',text=text),
                ensure_ascii=False)+'\n',encoding='utf-8')
            guide['textPath'] = '/contran/'+name
        guides.append(guide)
    target = ROOT/'src/data/contranGuides.ts'
    target.write_text('import type { ContranGuide } from "@/lib/contranStudy";\n\n'
        + 'export const CONTRAN_INDEX_URL = '+json.dumps(OFFICIAL)+';\n'
        + 'export const CONTRAN_CHECKED_AT = "2026-10-12";\n'
        + 'export const CONTRAN_GUIDES: ContranGuide[] = '+json.dumps(guides,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    report = dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),official_index=OFFICIAL,
        official_index_sha256=hashlib.sha256((folder/'official-index.html').read_bytes()).hexdigest(),
        catalog_rows=len(catalog),batch_resolutions=len(guides),current_guides=sum(not g['historical'] for g in guides),
        historical_guides_excluded=[g['number'] for g in guides if g['historical']],
        scope='Objetos e aplicações temáticas dos atos listados; não revisão integral de todas as fichas/anexos ou de todas as resoluções do catálogo.',
        evidence=list(evidence.values()),supplementary_evidence=supplementary,
        remaining_catalog_not_in_batch=len(catalog)-len(guides))
    (ROOT/'docs/library/contran-review-2026-10-12.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print({k:report[k] for k in ['batch_resolutions','current_guides','historical_guides_excluded']})

if __name__ == '__main__':
    build(Path(sys.argv[1]))
